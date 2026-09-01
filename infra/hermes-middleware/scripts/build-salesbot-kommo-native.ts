#!/usr/bin/env tsx
/**
 * Gerador do Salesbot no formato NATIVO da Kommo (descoberto via engenharia
 * reversa do export "Salesbot #3.json" do Ronan em 2026-07-24).
 *
 * Diferenças críticas vs. o formato da doc pública:
 * - Wrapper duplo: `{ type_functionality, model: { text, name, positions, type } }`
 * - `model.text` e `model.positions` são strings (JSON stringified)
 * - Handler é `send_message` (não `show`)
 * - Blocos são dict por key string ("0", "1", ...) — não array
 * - `goto` é propriedade do bloco no `positions`, não handler
 * - Cada bloco tem UUID + posição visual (x, y, width, height)
 *
 * Este gerador começa MÍNIMO: só o handler `send_message`. Handlers restantes
 * (botões, ação, condição, widget_request) serão adicionados quando o Ronan
 * enviar exports de bots com esses blocos.
 *
 * Uso:
 *   tsx scripts/build-salesbot-kommo-native.ts > salesbot-kommo-native.json
 */

import { randomUUID } from "node:crypto";

// -------------------- tipos --------------------

interface QuestionParams {
  tag?: string;
  text: string;
  type: "external";
  on_error?: null;
  recipient: {
    type: "all_contacts";
    way_of_communication: "over_all";
  };
  is_in_starting_block?: boolean;
  send_to_all_chat_sources?: boolean;
}

interface QuestionHandler {
  params: QuestionParams;
  handler: "send_message";
}

interface TextBlock {
  question: QuestionHandler[];
  block_uuid: string;
}

interface Position {
  x: number;
  y: number;
  z: number;
  id: number;
  goto?: { block: number } | null;
  step: number;
  type: "start" | "static" | "question";
  width: number;
  height: number;
  actions: Array<{
    id: number;
    sort: number;
    links: unknown[];
    params: {
      params: unknown;
      handler: string;
    };
  }>;
  deletable: boolean;
  code?: string;
  name?: string;
}

// -------------------- input: definição do bot --------------------

interface BotSpec {
  name: string;
  steps: Array<{
    text: string;
    next?: number; // id do próximo bloco (default: null = último)
  }>;
}

const BOT: BotSpec = {
  name: "Teste Rosie import v1",
  steps: [
    { text: "Oi, esse é um teste de import do Salesbot Rosie 💛", next: 2 },
    { text: "Se você tá vendo essa segunda mensagem, o import funcionou!" },
  ],
};

// -------------------- gerador --------------------

function buildBot(spec: BotSpec) {
  const text: Record<string, TextBlock | boolean> = {};
  const positions: Position[] = [];

  // Bloco start (id=0)
  positions.push({
    x: 0,
    y: 0,
    z: 2,
    id: 0,
    goto: { block: 1 }, // aponta para primeiro question
    step: -1,
    type: "start",
    width: 170,
    height: 38,
    actions: [
      {
        id: -3,
        sort: 0,
        links: [],
        params: { params: [], handler: "_start" },
      },
    ],
    deletable: true,
  });

  // Bloco trigger (id=-1, sempre estático)
  positions.push({
    x: -350,
    y: 0,
    z: 4,
    id: -1,
    code: "trigger",
    step: -1,
    type: "static",
    width: 260,
    height: 0,
    actions: [],
    deletable: true,
  });

  // Blocos de mensagem (id=1, 2, 3, ...)
  const baseY = 65;
  const xStep = 500;
  const startX = 235;

  spec.steps.forEach((step, idx) => {
    const blockId = idx + 1;
    const stepIdx = idx; // step começa em 0 no text
    const blockUuid = randomUUID();

    const params: QuestionParams = {
      tag: "",
      text: step.text,
      type: "external",
      on_error: null,
      recipient: {
        type: "all_contacts",
        way_of_communication: "over_all",
      },
      is_in_starting_block: idx === 0,
      send_to_all_chat_sources: true,
    };

    // text[stepIdx] tem a definição funcional
    text[String(stepIdx)] = {
      question: [
        {
          params,
          handler: "send_message",
        },
      ],
      block_uuid: blockUuid,
    };

    // positions tem o mesmo bloco com metadados visuais
    const nextBlockId = step.next ?? (idx < spec.steps.length - 1 ? blockId + 1 : null);
    positions.push({
      x: startX + idx * xStep,
      y: baseY,
      z: 10,
      id: blockId,
      goto: nextBlockId ? { block: nextBlockId } : null,
      name: "Enviar mensagem",
      step: stepIdx,
      type: "question",
      width: 400,
      height: 150,
      actions: [
        {
          id: 60 + idx, // ids sequenciais
          sort: 0,
          links: [],
          params: {
            params,
            handler: "send_message",
          },
        },
      ],
      deletable: true,
    });
  });

  // Flag final do text
  text.conversation = false;

  return {
    type_functionality: 0,
    model: {
      text: JSON.stringify(text),
      name: spec.name,
      positions: JSON.stringify(positions),
      type: 2,
    },
  };
}

// -------------------- main --------------------

const out = buildBot(BOT);
process.stdout.write(JSON.stringify(out, null, 2));
process.stdout.write("\n");
