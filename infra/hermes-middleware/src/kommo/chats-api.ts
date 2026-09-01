import { createHash, createHmac } from "node:crypto";
import type { KommoConfig } from "./config.js";

/**
 * Cliente Chats API amojo Kommo.
 *
 * Base URL: https://amojo.kommo.com/v2/origin/custom/{scope_id}/...
 *
 * Autenticação:
 *   - Header Date: <RFC2822 date>
 *   - Header Content-Type: application/json
 *   - Header Content-MD5: MD5(body)
 *   - Header X-Signature: HMAC-SHA1(request-string, channel_secret)
 *   - request-string = method\n content-md5\n content-type\n date\n path
 *
 * Doc oficial: developers.kommo.com/recipes/calculate-headers-for-chats-api-requests
 */

export interface SendMessageBody {
  event_type: "new_message";
  payload: {
    timestamp: number;
    msec_timestamp: number;
    msgid: string;
    conversation_id: string;
    sender: {
      id: string; // internal user id (nossa consultora) OU external (cliente)
      name?: string;
      avatar?: string;
      phone?: string;
      email?: string;
    };
    receiver?: {
      id?: string;
      name?: string;
      phone?: string;
      email?: string;
    };
    message: {
      type: "text" | "picture" | "video" | "file" | "voice";
      text?: string;
      media?: string;
      file_name?: string;
      template?: {
        id?: number;
        name?: string;
        params?: Array<{ key: string; value: string }>;
      };
    };
    silent?: boolean; // se true, não notifica a conversa (útil pra bot)
    source?: {
      external_id: string;
    };
  };
}

function md5(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

function hmacSha1Hex(input: string, secret: string): string {
  return createHmac("sha1", secret).update(input, "utf8").digest("hex");
}

function rfc2822Date(d = new Date()): string {
  return d.toUTCString();
}

export class ChatsApiClient {
  constructor(private cfg: KommoConfig) {}

  private baseUrl(path: string): string {
    return `https://amojo.kommo.com/v2/origin/custom/${this.cfg.channelScopeId}${path}`;
  }

  /**
   * Envia uma mensagem para uma conversa existente.
   *
   * @param conversationId ID da conversa na Kommo (do lead)
   * @param text Texto puro OU template quando o canal for WhatsApp fora da janela 24h
   */
  async sendText(
    conversationId: string,
    text: string,
    opts: { senderName?: string; templateName?: string; templateParams?: Record<string, string> } = {},
  ): Promise<{ status: number; body: string }> {
    if (!this.cfg.channelScopeId || !this.cfg.channelSecret) {
      throw new Error("chats-api: KOMMO_ROSIE_CHANNEL_SCOPE_ID/SECRET não configurados");
    }
    const method = "POST";
    const contentType = "application/json";
    const date = rfc2822Date();
    const path = `/chats/${conversationId}`;

    const bodyObj: SendMessageBody = {
      event_type: "new_message",
      payload: {
        timestamp: Math.floor(Date.now() / 1000),
        msec_timestamp: Date.now(),
        msgid: `hermes-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        conversation_id: conversationId,
        sender: {
          id: `hermes-bot-${this.cfg.accountId}`,
          name: opts.senderName ?? "Rosie",
        },
        message: {
          type: "text",
          text,
        },
      },
    };

    if (opts.templateName) {
      bodyObj.payload.message.template = {
        name: opts.templateName,
        params: Object.entries(opts.templateParams ?? {}).map(([key, value]) => ({
          key,
          value,
        })),
      };
    }

    const body = JSON.stringify(bodyObj);
    const contentMd5 = md5(body);
    const requestString = [method, contentMd5, contentType, date, path].join("\n");
    const signature = hmacSha1Hex(requestString, this.cfg.channelSecret);

    const res = await fetch(this.baseUrl(path), {
      method,
      headers: {
        Date: date,
        "Content-Type": contentType,
        "Content-MD5": contentMd5,
        "X-Signature": signature,
      },
      body,
    });
    return { status: res.status, body: await res.text() };
  }
}

/**
 * Move um lead entre stages/pipelines usando a API REST v4 (não amojo).
 * Útil para AUT-05 (P3 → P1) e AUT-06/AUT-08 (move para Perdido).
 */
export async function moveLead(
  cfg: KommoConfig,
  leadId: number,
  targetPipelineId: number,
  targetStatusId: number,
): Promise<{ status: number; body: string }> {
  const url = `https://${cfg.subdomain}.kommo.com/api/v4/leads/${leadId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cfg.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pipeline_id: targetPipelineId,
      status_id: targetStatusId,
    }),
  });
  return { status: res.status, body: await res.text() };
}

/**
 * Adiciona uma tag a um lead.
 */
export async function addLeadTag(
  cfg: KommoConfig,
  leadId: number,
  tagName: string,
): Promise<{ status: number; body: string }> {
  const url = `https://${cfg.subdomain}.kommo.com/api/v4/leads/${leadId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cfg.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _embedded: {
        tags: [{ name: tagName }],
      },
    }),
  });
  return { status: res.status, body: await res.text() };
}
