#!/usr/bin/env tsx
/**
 * Gerador do Salesbot Rosie COMPLETO no formato NATIVO da UI Kommo (v3).
 *
 * Objetivo: 1 JSON pronto para import via UI Kommo, com TODAS as ações
 * embutidas (mover lead, tag, campo, condição, widget, close, botões).
 *
 * Estratégia de schema (2026-07-24):
 * - Wrapper externo nativo: {type_functionality, model:{text, name, positions, type}}
 *   com text/positions stringificados (confirmado nos exports "Salesbot #3")
 * - Handler `send_message` (nativo confirmado) para mensagem + botões inline via
 *   `params.buttons: [{text, type:"inline", step:N}]` + irmão `answer: [{handler:"buttons"}]`
 * - Handler `goto` explícito (confirmado): `{params: {step:N, type:"question"}, handler:"goto"}`
 * - Handler `add_tag` isolado (chute aceito pela UI em sonda-1): `{params: {value}}`
 * - Demais handlers (action/set_tag/set_field/move_lead/create_note/conditions/
 *   widget_request/stop) usam o formato oficial da doc pública Salesbot
 *   (developers.kommo.com/docs/salesbot-dp) — que é o mesmo do
 *   salesbot-rosie-prod.json e provavelmente é aceito no import
 *
 * Uso:
 *   npx tsx scripts/build-salesbot-full-kommo.ts > salesbot-full-prod-v3.json
 *   npx tsx scripts/build-salesbot-full-kommo.ts --sombra > salesbot-full-teste-v3.json
 */

import { randomUUID } from "node:crypto";

const SOMBRA = process.argv.includes("--sombra");

// -------------------- IDs canônicos --------------------

const PROD = {
  P_VENDAS: 14033351,
  P_POSVENDA: 14171615,
  P_CARRINHO: 14171967,
  S_VENDAS_NOVO_LEAD: 108316683,
  S_VENDAS_QUALIFICADO: 108316687,
  S_VENDAS_CARRINHO_ENVIADO: 108316691,
  S_POSVENDA_NOVO_CHAMADO: 109409503,
  S_POSVENDA_COM_A_GENTE: 109409507,
  S_POSVENDA_AGUARDANDO: 109409511,
};

const TEST = {
  P_VENDAS: 14171979,
  P_POSVENDA: 14171991,
  P_CARRINHO: 14171987,
  S_VENDAS_NOVO_LEAD: 109412523,
  S_VENDAS_QUALIFICADO: 109412527,
  S_VENDAS_CARRINHO_ENVIADO: 109412531,
  S_POSVENDA_NOVO_CHAMADO: 109412575,
  S_POSVENDA_COM_A_GENTE: 109412579,
  S_POSVENDA_AGUARDANDO: 109412583,
};

const IDS = SOMBRA ? TEST : PROD;
const PIPELINE_LABEL = SOMBRA
  ? "[TESTE] Vendas / Pós-venda / Carrinho"
  : "Vendas / Pós-Venda / Carrinho Abandonado";

const CF = {
  NR_PEDIDO: 2053238,
  CPF: 2053240,
  EMAIL_COMPRA: 2053242,
  DATA_COMPRA: 2053244,
  EMAIL_LEAD: 2053246,
  COMO_CONHECEU: 2053248,
  PECA_INTERESSE: 2053250,
  TAMANHO: 2053252,
  COR: 2053254,
  MOTIVO_CONTATO: 2053256,
  TITULAR: 2053258,
  VALOR_CARRINHO: 2053260,
};

const TAGS = {
  VENDA: "venda",
  POS_VENDA: "pos-venda",
  TROCA: "troca",
  DEFEITO: "defeito",
  DEVOLUCAO: "devolucao",
  CANCELAMENTO: "cancelamento",
};

const HERMES_URL = "{{env.HERMES_MW_URL}}/kommo/horario";
const KOLDEN_TOKEN = "{{env.KOLDEN_TOKEN}}";

// -------------------- Textos --------------------

const M = {
  M0_1: `Oi, {{contact.first_name}}! Aqui é a Rosie 💛
Me diz o que você precisa que eu te ajudo rapidinho:
1 — Quero comprar / tenho dúvida sobre uma peça
2 — Já comprei e preciso de ajuda com meu pedido
3 — Outro assunto`,
  M0_3: "Claro! Me conta rapidinho o que você precisa 💛",
  MA_0: `Perfeito! Antes, me passa seu e-mail? É por ele que eu te mando o carrinho e aviso das novidades ✨
E me conta: como você conheceu a Rosie?`,
  MA_1: `Show. Sobre o que é a sua dúvida?
1 — Tamanho e caimento
2 — Disponibilidade, cor ou reposição de uma peça
3 — Pagamento, parcelamento ou cupom
4 — Não sei o que levar, quero uma indicação`,
  MA1_1: `A gente tem provador virtual no site 👉
Você escolhe a peça, coloca suas medidas e vê o caimento antes de comprar — sem chute.
👉 https://rosieiadoreyou.com/provador
Dá uma olhada e me diz se resolveu!`,
  MA1_2: "Que ótimo ✨ Quer que eu já monte seu carrinho?",
  MA2_1: `Me manda o link ou o print da peça que você quer 👉
E me diz: qual tamanho e qual cor?`,
  MA3_1: "Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar? Me diz qual é a sua dúvida que já te passo pra uma consultora resolver 💛",
  MA4_1: `Adoro essa missão 💛 Me conta:
• Qual a ocasião?
• Que estilo você curte?
• Qual sua faixa de preço?
• Qual seu tamanho?`,
  MA5_1: `Montei seu carrinho 👉
É só finalizar por aqui:
👉 {link_carrinho}
Qualquer dúvida, me chama.`,
  MB_0: `Poxa, vamos resolver isso 💛
Me manda o número do seu pedido? Ele está no e-mail de confirmação, no formato #1234.`,
  MB_1: `Sem problema! Então me manda:
• o e-mail ou o CPF que você usou na compra
• e mais ou menos a data em que você comprou
Com isso eu acho aqui 👉`,
  MB_2: `Achei! Pedido {{lead.cf.${CF.NR_PEDIDO}}}, feito em {{lead.cf.${CF.DATA_COMPRA}}}.
Me conta o que aconteceu:
1 — Quero saber onde está meu pedido
2 — Meu pedido está atrasado
3 — Veio item errado ou faltando
4 — Produto com defeito
5 — Quero trocar
6 — Quero devolver
7 — Quero cancelar`,
  B3_COL: `Que chato, {{contact.first_name}}. Vamos resolver 👉
Pra agilizar, me manda:
• uma foto do que chegou
• uma foto da etiqueta ou da nota que veio na embalagem`,
  B4_COL: `Poxa, sinto muito 💛 Vamos resolver isso.
Me manda uma foto ou um vídeo mostrando o defeito e me conta rapidinho o que aconteceu.`,
  B5_COL: `Claro 💛 Me diz:
• Qual peça você quer trocar?
• Por qual tamanho ou modelo?
• A peça está sem uso e com a etiqueta?
(depois) Só mais uma coisinha: a compra foi feita no seu nome ou no nome de outra pessoa?`,
  B6_COL: `Sem problema, {{contact.first_name}}. Você tem 7 dias corridos depois de receber pra desistir da compra — é seu direito.
Me conta:
• Qual o motivo?
• Em que dia você recebeu o pedido?
(depois) E a compra foi feita no seu nome ou no nome de outra pessoa?`,
  H1A: "Uma consultora assume seu atendimento agora 💛",
  H1B: "Já deixei tudo registrado aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te responde por aqui — pode ficar tranquila.",
  H2A: "Sem problema. Vou te passar agora pra uma consultora que vai te ajudar a escolher o tamanho certo. Um minutinho 💛",
  H2B: "Sem problema! Anotei tudo aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te ajuda a escolher o tamanho certo.",
  H3A: "Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar? Me diz qual é a sua dúvida que já te passo pra uma consultora resolver 💛",
  H3B: "Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar? Me conta aqui que já deixo registrado 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te responde.",
  H4A: "Perfeito, já tenho tudo ✨ Vou te passar pra uma consultora que vai montar um look pensado só pra você. Um minutinho.",
  H4B: "Perfeito, já tenho tudo ✨ A gente não está em atendimento agora, mas assim que abrir uma consultora monta um look pensado só pra você 💛",
  H5A: "Uma consultora assume agora e já te responde 💛",
  H5B: "Está tudo registrado aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora assume seu caso e te responde.",
  H6A: "Uma consultora já vai puxar essa informação pra você e te manda por aqui. Um minutinho 💛",
  H6B: "Anotei aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora puxa essa informação e te manda por aqui.",
};

// -------------------- Modelo de blocos --------------------

// HandlerDef discriminado. Referencias a outros blocos são por NOME (string).
// O emitter resolve nome → step index no fim.
type HandlerDef =
  | { kind: "send"; text: string; buttons?: { text: string; next: string }[] }
  | { kind: "set_tag"; value: string }
  | { kind: "move_lead"; pipeline_id: number; status_id: number }
  | { kind: "set_field"; field_id: number; value: string }
  | { kind: "create_note"; text: string }
  | { kind: "widget_horario" }
  | { kind: "condition_show"; term1: string; term2: string; then_text: string }
  | { kind: "stop_close" }
  | { kind: "goto"; next: string };

interface BlockDef {
  name: string;
  handlers: HandlerDef[];
}

// -------------------- Definição dos 28 blocos (indexação linear 0-27) --------------------

const BLOCKS: BlockDef[] = [
  // 0
  {
    name: "ENTRADA",
    handlers: [
      {
        kind: "send",
        text: M.M0_1,
        buttons: [
          { text: "1 — Quero comprar", next: "A.QUAL" },
          { text: "2 — Preciso ajuda pedido", next: "B.ID1" },
          { text: "3 — Outro assunto", next: "OUTRO" },
        ],
      },
    ],
  },
  // 1
  {
    name: "A.QUAL",
    handlers: [
      { kind: "move_lead", pipeline_id: IDS.P_VENDAS, status_id: IDS.S_VENDAS_QUALIFICADO },
      { kind: "set_tag", value: TAGS.VENDA },
      { kind: "send", text: M.MA_0 },
      { kind: "set_field", field_id: CF.EMAIL_LEAD, value: "{{message.last_text}}" },
      { kind: "goto", next: "A.MENU" },
    ],
  },
  // 2
  {
    name: "A.MENU",
    handlers: [
      {
        kind: "send",
        text: M.MA_1,
        buttons: [
          { text: "1 — Tamanho", next: "A1" },
          { text: "2 — Disponibilidade", next: "A2" },
          { text: "3 — Pagamento", next: "A3" },
          { text: "4 — Indicação de look", next: "A4" },
        ],
      },
    ],
  },
  // 3
  {
    name: "A1",
    handlers: [
      {
        kind: "send",
        text: M.MA1_1,
        buttons: [
          { text: "Resolveu!", next: "A1.OK" },
          { text: "Ainda tô na dúvida", next: "HANDOFF_A1" },
        ],
      },
    ],
  },
  // 4
  {
    name: "A1.OK",
    handlers: [
      {
        kind: "send",
        text: M.MA1_2,
        buttons: [
          { text: "Sim, monta pra mim", next: "A.CART" },
          { text: "Ainda não", next: "HANDOFF_GENERICO" },
        ],
      },
    ],
  },
  // 5
  {
    name: "A2",
    handlers: [
      { kind: "send", text: M.MA2_1 },
      { kind: "set_field", field_id: CF.PECA_INTERESSE, value: "{{message.last_text}}" },
      { kind: "set_field", field_id: CF.TAMANHO, value: "{{message.last_text}}" },
      { kind: "set_field", field_id: CF.COR, value: "{{message.last_text}}" },
      { kind: "goto", next: "HANDOFF_GENERICO" },
    ],
  },
  // 6
  {
    name: "A3",
    handlers: [
      { kind: "send", text: M.MA3_1 },
      { kind: "goto", next: "HANDOFF_A3" },
    ],
  },
  // 7
  {
    name: "A4",
    handlers: [
      { kind: "send", text: M.MA4_1 },
      { kind: "set_field", field_id: CF.TAMANHO, value: "{{message.last_text}}" },
      { kind: "goto", next: "HANDOFF_A4" },
    ],
  },
  // 8
  {
    name: "A.CART",
    handlers: [
      { kind: "move_lead", pipeline_id: IDS.P_VENDAS, status_id: IDS.S_VENDAS_CARRINHO_ENVIADO },
      { kind: "send", text: M.MA5_1 },
      { kind: "stop_close" },
    ],
  },
  // 9
  {
    name: "B.ID1",
    handlers: [
      { kind: "move_lead", pipeline_id: IDS.P_POSVENDA, status_id: IDS.S_POSVENDA_NOVO_CHAMADO },
      { kind: "set_tag", value: TAGS.POS_VENDA },
      {
        kind: "send",
        text: M.MB_0,
        buttons: [
          { text: "Aqui está", next: "B.ID1b" },
          { text: "Não achei o número", next: "B.ID2" },
        ],
      },
    ],
  },
  // 10
  {
    name: "B.ID1b",
    handlers: [
      { kind: "set_field", field_id: CF.NR_PEDIDO, value: "{{message.last_text}}" },
      { kind: "goto", next: "B.LOC" },
    ],
  },
  // 11
  {
    name: "B.ID2",
    handlers: [
      { kind: "send", text: M.MB_1 },
      { kind: "set_field", field_id: CF.EMAIL_COMPRA, value: "{{message.last_text}}" },
      { kind: "set_field", field_id: CF.DATA_COMPRA, value: "{{message.last_text}}" },
      { kind: "goto", next: "B.LOC" },
    ],
  },
  // 12
  {
    name: "B.LOC",
    handlers: [
      { kind: "create_note", text: "Bot coletou identificação. Consultora, verificar Nuvemshop no card." },
      { kind: "goto", next: "B.MENU" },
    ],
  },
  // 13
  {
    name: "B.MENU",
    handlers: [
      {
        kind: "send",
        text: M.MB_2,
        buttons: [
          { text: "1 — Rastreio", next: "B1" },
          { text: "2 — Atraso", next: "B2" },
          { text: "3 — Item errado", next: "B3" },
          { text: "4 — Defeito", next: "B4" },
          { text: "5 — Troca", next: "B5" },
          { text: "6 — Devolução", next: "B6" },
          { text: "7 — Cancelamento", next: "B7" },
        ],
      },
    ],
  },
  // 14
  {
    name: "B1",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Rastreio" },
      { kind: "goto", next: "HANDOFF_B_RASTREIO" },
    ],
  },
  // 15
  {
    name: "B2",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Atraso" },
      { kind: "goto", next: "HANDOFF_B_RASTREIO" },
    ],
  },
  // 16
  {
    name: "B3",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Item errado ou faltando" },
      { kind: "set_tag", value: TAGS.TROCA },
      { kind: "send", text: M.B3_COL },
      { kind: "goto", next: "HANDOFF_B_GENERICO" },
    ],
  },
  // 17
  {
    name: "HANDOFF_A1",
    handlers: [
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H2A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H2B },
      { kind: "stop_close" },
    ],
  },
  // 18
  {
    name: "HANDOFF_GENERICO",
    handlers: [
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H1A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H1B },
      { kind: "stop_close" },
    ],
  },
  // 19
  {
    name: "HANDOFF_B_GENERICO",
    handlers: [
      { kind: "move_lead", pipeline_id: IDS.P_POSVENDA, status_id: IDS.S_POSVENDA_COM_A_GENTE },
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H5A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H5B },
      { kind: "stop_close" },
    ],
  },
  // 20
  {
    name: "HANDOFF_A3",
    handlers: [
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H3A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H3B },
      { kind: "stop_close" },
    ],
  },
  // 21
  {
    name: "HANDOFF_A4",
    handlers: [
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H4A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H4B },
      { kind: "stop_close" },
    ],
  },
  // 22
  {
    name: "HANDOFF_B_RASTREIO",
    handlers: [
      { kind: "move_lead", pipeline_id: IDS.P_POSVENDA, status_id: IDS.S_POSVENDA_COM_A_GENTE },
      { kind: "widget_horario" },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "true", then_text: M.H6A },
      { kind: "condition_show", term1: "{{json.horario.in_hours}}", term2: "false", then_text: M.H6B },
      { kind: "stop_close" },
    ],
  },
  // 23
  {
    name: "OUTRO",
    handlers: [
      { kind: "send", text: M.M0_3 },
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "{{message.last_text}}" },
      { kind: "move_lead", pipeline_id: IDS.P_VENDAS, status_id: IDS.S_VENDAS_NOVO_LEAD },
      { kind: "goto", next: "HANDOFF_GENERICO" },
    ],
  },
  // 24
  {
    name: "B4",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Defeito" },
      { kind: "set_tag", value: TAGS.DEFEITO },
      { kind: "send", text: M.B4_COL },
      { kind: "goto", next: "HANDOFF_B_GENERICO" },
    ],
  },
  // 25
  {
    name: "B5",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Troca" },
      { kind: "set_tag", value: TAGS.TROCA },
      { kind: "send", text: M.B5_COL },
      { kind: "goto", next: "HANDOFF_B_GENERICO" },
    ],
  },
  // 26
  {
    name: "B6",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Devolução" },
      { kind: "set_tag", value: TAGS.DEVOLUCAO },
      { kind: "send", text: M.B6_COL },
      { kind: "goto", next: "HANDOFF_B_GENERICO" },
    ],
  },
  // 27
  {
    name: "B7",
    handlers: [
      { kind: "set_field", field_id: CF.MOTIVO_CONTATO, value: "Cancelamento" },
      { kind: "set_tag", value: TAGS.CANCELAMENTO },
      { kind: "goto", next: "HANDOFF_B_GENERICO" },
    ],
  },
];

// -------------------- Resolução de nomes para step index --------------------

// Bloco N do array vira step_index N no formato nativo (0-based).
// Kommo UI usa block_id 1-based nas positions; text[stepIdx] usa 0-based.
const nameToStepIdx = new Map<string, number>();
BLOCKS.forEach((b, idx) => nameToStepIdx.set(b.name, idx));

function resolveStep(name: string): number {
  const idx = nameToStepIdx.get(name);
  if (idx === undefined) {
    throw new Error(`Referência a bloco inexistente: "${name}"`);
  }
  return idx;
}

// -------------------- Emitter: HandlerDef -> entries no formato nativo --------------------

// Retorna:
// - question_entries: entries do array question[] no text[N]
// - action_entries: entries do array actions[] no positions[N] (mesmo conteúdo em geral)
// - answer_entries: quando há botões, o marcador answer:[{handler:"buttons"}]
// - synonyms: array de arrays vazios (1 por botão) — precisa ir no positions[N].actions[send_message].synonyms
// - block_goto: quando o último handler é goto, extrai step_index para positions[N].goto

interface EmitResult {
  question_entries: unknown[];
  action_entries: unknown[];
  answer_entries?: unknown[];
  buttons_synonyms?: unknown[][]; // uma sub-lista vazia por botão
  positions_goto?: { block: number } | null;
  block_height: number;
}

function emitBlock(block: BlockDef, isFirst: boolean): EmitResult {
  const question_entries: unknown[] = [];
  const action_entries: unknown[] = [];
  let answer_entries: unknown[] | undefined;
  let buttons_synonyms: unknown[][] | undefined;
  let positions_goto: { block: number } | null | undefined = undefined;
  let block_height = 150;

  for (const h of block.handlers) {
    switch (h.kind) {
      case "send": {
        const buttons = h.buttons?.map((b) => ({
          text: b.text,
          type: "inline",
          step: resolveStep(b.next),
        }));
        const params: Record<string, unknown> = {
          tag: "",
          text: h.text,
          type: "external",
          on_error: null,
          recipient: { type: "all_contacts", way_of_communication: "over_all" },
          is_in_starting_block: isFirst,
          send_to_all_chat_sources: true,
        };
        if (buttons) {
          params.buttons = buttons;
          buttons_synonyms = buttons.map(() => []);
          answer_entries = [{ params: [], handler: "buttons" }];
          block_height = 100 + buttons.length * 88;
        }
        const entry = { params, handler: "send_message" };
        // params sem `on_error` na versão positions (formato do export do Ronan)
        const paramsForPosition = { ...params };
        delete (paramsForPosition as { on_error?: unknown }).on_error;
        const entryForPosition = { params: paramsForPosition, handler: "send_message" };
        question_entries.push(entry);
        action_entries.push(entryForPosition);
        break;
      }
      case "set_tag": {
        const entry = {
          handler: "action",
          params: { name: "set_tag", params: { type: 2, value: h.value } },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "move_lead": {
        const entry = {
          handler: "action",
          params: {
            name: "move_lead",
            params: { pipeline_id: h.pipeline_id, status_id: h.status_id },
          },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "set_field": {
        const entry = {
          handler: "action",
          params: {
            name: "set_field",
            params: { field_id: h.field_id, value: h.value },
          },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "create_note": {
        const entry = {
          handler: "action",
          params: { name: "create_note", params: { text: h.text } },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "widget_horario": {
        const entry = {
          handler: "widget_request",
          params: {
            url: HERMES_URL,
            method: "POST",
            headers: { "X-Kolden-Token": KOLDEN_TOKEN },
            data: {},
            response_var: "horario",
          },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "condition_show": {
        const entry = {
          handler: "conditions",
          params: {
            logic: "and",
            conditions: [{ term1: h.term1, term2: h.term2, operation: "=" }],
            result: [
              {
                handler: "show",
                params: { type: "text", value: h.then_text },
              },
            ],
          },
        };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "stop_close": {
        const entry = { handler: "stop", params: { action: "talk-close" } };
        question_entries.push(entry);
        action_entries.push(entry);
        break;
      }
      case "goto": {
        const targetIdx = resolveStep(h.next);
        const entry = {
          handler: "goto",
          params: { step: targetIdx, type: "question" },
        };
        question_entries.push(entry);
        // No positions, goto vira propriedade do bloco (não action).
        // block_id na UI Kommo é 1-based (0 = start, -1 = trigger)
        positions_goto = { block: targetIdx + 1 };
        break;
      }
    }
  }

  // Se não teve goto explícito e não é bloco terminal (stop_close), goto = null
  if (positions_goto === undefined) {
    positions_goto = null;
  }

  return {
    question_entries,
    action_entries,
    answer_entries,
    buttons_synonyms,
    positions_goto,
    block_height,
  };
}

// -------------------- Layout visual (grade) --------------------

const LAYOUT: Record<string, { col: number; row: number }> = {
  ENTRADA: { col: 1, row: 0 },
  "A.QUAL": { col: 2, row: 0 },
  "A.MENU": { col: 3, row: 0 },
  A1: { col: 4, row: 0 },
  "A1.OK": { col: 5, row: 0 },
  A2: { col: 4, row: 1 },
  A3: { col: 4, row: 2 },
  A4: { col: 4, row: 3 },
  "A.CART": { col: 6, row: 0 },
  "B.ID1": { col: 2, row: 4 },
  "B.ID1b": { col: 3, row: 4 },
  "B.ID2": { col: 3, row: 5 },
  "B.LOC": { col: 4, row: 4 },
  "B.MENU": { col: 5, row: 4 },
  B1: { col: 6, row: 4 },
  B2: { col: 6, row: 5 },
  B3: { col: 6, row: 6 },
  B4: { col: 6, row: 7 },
  B5: { col: 6, row: 8 },
  B6: { col: 6, row: 9 },
  B7: { col: 6, row: 10 },
  OUTRO: { col: 2, row: 8 },
  HANDOFF_A1: { col: 7, row: 0 },
  HANDOFF_GENERICO: { col: 7, row: 1 },
  HANDOFF_A3: { col: 7, row: 2 },
  HANDOFF_A4: { col: 7, row: 3 },
  HANDOFF_B_GENERICO: { col: 7, row: 4 },
  HANDOFF_B_RASTREIO: { col: 7, row: 5 },
};

const COL_WIDTH = 500;
const ROW_HEIGHT = 220;

// -------------------- Build --------------------

function buildBot() {
  const text: Record<string, unknown> = {};
  const positions: unknown[] = [];

  // Bloco start (id=0) — aponta pro primeiro bloco de bot (id=1 = ENTRADA)
  positions.push({
    x: 0,
    y: 0,
    z: 2,
    id: 0,
    goto: { block: 1 },
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

  // Bloco trigger (id=-1)
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

  BLOCKS.forEach((block, idx) => {
    const emitted = emitBlock(block, idx === 0);
    const uuid = randomUUID();
    const stepIdx = idx;
    const blockId = idx + 1;

    // text[stepIdx]
    const textEntry: Record<string, unknown> = {
      question: emitted.question_entries,
      block_uuid: uuid,
    };
    if (emitted.answer_entries) {
      textEntry.answer = emitted.answer_entries;
    }
    text[String(stepIdx)] = textEntry;

    // positions[blockId]
    const layoutPos = LAYOUT[block.name] ?? { col: 8, row: idx };
    const posEntry: Record<string, unknown> = {
      x: 100 + layoutPos.col * COL_WIDTH,
      y: 65 + layoutPos.row * ROW_HEIGHT,
      z: 10 + idx,
      id: blockId,
      goto: emitted.positions_goto,
      name: block.name,
      step: stepIdx,
      type: "question",
      width: 400,
      height: emitted.block_height,
      actions: emitted.action_entries.map((entry, actionIdx) => {
        const action: Record<string, unknown> = {
          id: 60 + idx * 10 + actionIdx,
          sort: actionIdx,
          links: [],
          params: entry,
        };
        // Se essa action é o send_message com botões, adiciona synonyms
        if (emitted.buttons_synonyms) {
          const asEntry = entry as { handler?: string; params?: { buttons?: unknown[] } };
          if (asEntry.handler === "send_message" && asEntry.params?.buttons) {
            action.synonyms = emitted.buttons_synonyms;
          }
        }
        return action;
      }),
      deletable: true,
    };
    if (emitted.answer_entries) {
      posEntry.on_error = null;
      posEntry.no_answer = null;
    }
    positions.push(posEntry);
  });

  text.conversation = false;

  return {
    type_functionality: 0,
    model: {
      text: JSON.stringify(text),
      name: SOMBRA
        ? `Rosie — Salesbot [TESTE] v3 (${BLOCKS.length} blocos)`
        : `Rosie — Salesbot v3 (${BLOCKS.length} blocos)`,
      positions: JSON.stringify(positions),
      type: 2,
    },
  };
}

// -------------------- Output --------------------

const bot = buildBot();
process.stdout.write(JSON.stringify(bot, null, 2));
process.stdout.write("\n");
process.stderr.write(
  `\n✓ Gerado bot para pipelines: ${PIPELINE_LABEL}\n` +
    `✓ ${BLOCKS.length} blocos + start + trigger = ${BLOCKS.length + 2} elementos no positions\n`,
);
