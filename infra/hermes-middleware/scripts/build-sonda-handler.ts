#!/usr/bin/env tsx
/**
 * Gerador de bots-sonda para engenharia reversa do schema de handlers da Kommo.
 *
 * Cada sonda = 1 bot mínimo (2 blocos) que exercita 1 handler.
 * Chute de schema baseado no formato "linguagem Salesbot" da doc pública
 * adaptado ao formato nativo descoberto nos exports do Ronan.
 *
 * Uso: tsx scripts/build-sonda-handler.ts <handler> > out.json
 */

import { randomUUID } from "node:crypto";

const HANDLER = process.argv[2] ?? "add_tag";

// ------ schema-chute por handler ------
// Cada entrada define: params que vão no text[].question[] E em positions[].actions[]
const SCHEMAS: Record<string, { name: string; msg: string; params: unknown }> = {
  add_tag: {
    name: "Sonda 1 add_tag",
    msg: "Sonda add_tag — próximo bloco tenta aplicar tag 'sonda-kolden'",
    params: { value: "sonda-kolden" },
  },
  change_status: {
    // move para [TESTE] Vendas > Qualificado (109412527)
    name: "Sonda 2 change_status",
    msg: "Sonda change_status — próximo bloco tenta mover para [TESTE] Vendas>Qualificado",
    params: { status_id: 109412527, pipeline_id: 14171979 },
  },
  save_data: {
    // salva string em custom field 2053246 (E-mail lead)
    name: "Sonda 3 save_data",
    msg: "Sonda save_data — próximo bloco tenta salvar 'valor-teste' em custom field E-mail lead",
    params: {
      field_id: 2053246,
      entity_type: "lead",
      value: "valor-teste",
    },
  },
  talk_close: {
    name: "Sonda 4 talk_close",
    msg: "Sonda talk_close — próximo bloco tenta encerrar bot e passar pra humano",
    params: {},
  },
  widget_request: {
    name: "Sonda 5 widget_request",
    msg: "Sonda widget_request — próximo bloco tenta GET https://httpbin.org/get?foo=bar",
    params: {
      url: "https://httpbin.org/get?foo=bar",
      method: "GET",
      headers: {},
      body: null,
      target: "sonda",
    },
  },
  condition: {
    name: "Sonda 6 condition",
    msg: "Sonda condition — próximo bloco tenta ramificar por variável",
    params: {
      logic: "and",
      conditions: [
        { term1: "{{lead.tags}}", term2: "sonda-kolden", operator: "==" },
      ],
    },
  },
  ask: {
    // pergunta livre + salva a resposta em custom field 2053246 (E-mail lead)
    name: "Sonda 7 ask",
    msg: "Sonda ask — próximo bloco pergunta e salva resposta em custom field E-mail lead",
    params: {
      field_id: 2053246,
      type: "text",
      field_type: "lead_custom",
    },
  },
  create_note: {
    name: "Sonda 8 create_note",
    msg: "Sonda create_note — próximo bloco cria nota interna no card",
    params: {
      text: "Nota criada pelo bot-sonda em 2026-07-24.",
    },
  },
};

const S = SCHEMAS[HANDLER];
if (!S) {
  console.error(`Handler desconhecido: ${HANDLER}. Válidos: ${Object.keys(SCHEMAS).join(", ")}`);
  process.exit(1);
}

// ------ blocos ------

const uuid1 = randomUUID();
const uuid2 = randomUUID();

const sendMessageParams = {
  tag: "",
  text: S.msg,
  type: "external",
  on_error: null,
  recipient: { type: "all_contacts", way_of_communication: "over_all" },
  is_in_starting_block: true,
  send_to_all_chat_sources: true,
};

const text: Record<string, unknown> = {
  "0": {
    question: [
      { params: sendMessageParams, handler: "send_message" },
      { params: { step: 1, type: "question" }, handler: "goto" },
    ],
    block_uuid: uuid1,
  },
  "1": {
    question: [{ params: S.params, handler: HANDLER }],
    block_uuid: uuid2,
  },
  conversation: false,
};

const positions = [
  {
    x: 0, y: 0, z: 2, id: 0,
    goto: { block: 1 },
    step: -1, type: "start", width: 170, height: 38,
    actions: [{ id: -3, sort: 0, links: [], params: { params: [], handler: "_start" } }],
    deletable: true,
  },
  {
    x: -350, y: 0, z: 4, id: -1,
    code: "trigger", step: -1, type: "static", width: 260, height: 0,
    actions: [], deletable: true,
  },
  {
    x: 235, y: 65, z: 10, id: 1,
    goto: { block: 2 },
    name: "Enviar mensagem", step: 0, type: "question", width: 400, height: 150,
    actions: [{
      id: 60, sort: 0, links: [],
      params: { params: {
        tag: "",
        text: S.msg,
        type: "external",
        recipient: { type: "all_contacts", way_of_communication: "over_all" },
        is_in_starting_block: true,
        send_to_all_chat_sources: true,
      }, handler: "send_message" },
    }],
    deletable: true,
  },
  {
    x: 735, y: 65, z: 11, id: 2,
    goto: null,
    name: HANDLER, step: 1, type: "question", width: 400, height: 150,
    actions: [{
      id: 61, sort: 0, links: [],
      params: { params: S.params, handler: HANDLER },
    }],
    deletable: true,
  },
];

const bot = {
  type_functionality: 0,
  model: {
    text: JSON.stringify(text),
    name: S.name,
    positions: JSON.stringify(positions),
    type: 2,
  },
};

process.stdout.write(JSON.stringify(bot, null, 2));
process.stdout.write("\n");
