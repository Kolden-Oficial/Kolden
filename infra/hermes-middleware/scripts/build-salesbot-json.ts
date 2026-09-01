#!/usr/bin/env tsx
/**
 * Gerador do JSON do Salesbot Rosie (formato canônico Kommo).
 *
 * Formato: array de "questions" (estados do bot), cada uma com sequência de
 * handlers (`show`, `action`, `goto`, `conditions`, `widget_request`, `stop`).
 *
 * Doc oficial: developers.kommo.com/docs/salesbot-dp
 *
 * Uso:
 *   tsx scripts/build-salesbot-json.ts > salesbot-rosie.json
 *   OR
 *   tsx scripts/build-salesbot-json.ts --pretty --sombra > salesbot-rosie-teste.json
 *
 * Flags:
 *   --pretty  : JSON indentado (2 espaços)
 *   --sombra  : usa pipelines [TESTE] (14171979 etc.) em vez de produção
 */

const PRETTY = process.argv.includes("--pretty");
const SOMBRA = process.argv.includes("--sombra");

// -------------------- IDs canônicos (levantados na Onda 1) --------------------

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
  LISTA_REPOSICAO: "lista-reposicao",
  CARRINHO_ABANDONADO: "carrinho-abandonado",
};

// URL do Hermes middleware (Ronan substitui depois do deploy Railway)
const HERMES_URL = "{{env.HERMES_MW_URL}}/kommo/horario";
const KOLDEN_TOKEN = "{{env.KOLDEN_TOKEN}}";

// -------------------- Textos das mensagens (aba 7 da planilha) --------------------

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
  MA2_2: `Boa notícia: temos a {{lead.cf.${CF.PECA_INTERESSE}}} em {{lead.cf.${CF.COR}}}, tamanho {{lead.cf.${CF.TAMANHO}}} ✨ Quer que eu monte seu carrinho?`,
  MA2_3: `Essa peça esgotou no tamanho {{lead.cf.${CF.TAMANHO}}} 💛
Mas ela entra na lista de reposição. Me confirma seu e-mail que eu te aviso na hora que voltar — quem está na lista é avisada primeiro.`,
  MA2_4: "Prontinho! Você vai ser das primeiras a saber quando a peça voltar 💛 Enquanto isso, quer ver peças parecidas que estão disponíveis agora?",
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

// -------------------- Handlers auxiliares --------------------

function show(text: string) {
  return { handler: "show", params: { type: "text", value: text } };
}

function buttons(bs: Array<{ text: string; step: number }>) {
  return {
    handler: "show",
    params: {
      type: "buttons",
      buttons: bs,
    },
  };
}

function saveField(fieldId: number, from: "message.last_text" | string) {
  return {
    handler: "action",
    params: {
      name: "set_field",
      params: {
        field_id: fieldId,
        value: `{{${from}}}`,
      },
    },
  };
}

function saveFieldEnum(fieldId: number, enumValue: string) {
  return {
    handler: "action",
    params: {
      name: "set_field",
      params: {
        field_id: fieldId,
        value: enumValue,
      },
    },
  };
}

function addTag(tag: string) {
  return {
    handler: "action",
    params: {
      name: "set_tag",
      params: { type: 2, value: tag },
    },
  };
}

function moveTo(pipelineId: number, statusId: number) {
  return {
    handler: "action",
    params: {
      name: "move_lead",
      params: {
        pipeline_id: pipelineId,
        status_id: statusId,
      },
    },
  };
}

function widgetHorario() {
  return {
    handler: "widget_request",
    params: {
      url: HERMES_URL,
      method: "POST",
      headers: { "X-Kolden-Token": KOLDEN_TOKEN },
      data: {},
      response_var: "horario",
    },
  };
}

function goto(step: number) {
  return { handler: "goto", params: { type: "question", step } };
}

function condition(term1: string, term2: string, thenSteps: unknown[]) {
  return {
    handler: "conditions",
    params: {
      logic: "and",
      conditions: [{ term1, term2, operation: "=" }],
      result: thenSteps,
    },
  };
}

function stopBot(action: "talk-close" | "salesbot-start") {
  return { handler: "stop", params: { action } };
}

// -------------------- Definição dos steps do bot --------------------
// Cada índice do array é uma "question" (step). Bot começa no step 0.

interface Step {
  question: unknown[];
  _id?: string; // metadata só para referência humana
}

const steps: Step[] = [
  // step 0 — ENTRADA
  {
    _id: "ENTRADA",
    question: [
      show(M.M0_1),
      buttons([
        { text: "1 — Quero comprar", step: 1 }, // → A.QUAL
        { text: "2 — Preciso ajuda pedido", step: 10 }, // → B.ID1
        { text: "3 — Outro assunto", step: 30 }, // → OUTRO
      ]),
    ],
  },

  // step 1 — A.QUAL
  {
    _id: "A.QUAL",
    question: [
      moveTo(IDS.P_VENDAS, IDS.S_VENDAS_QUALIFICADO),
      addTag(TAGS.VENDA),
      show(M.MA_0),
      // resposta livre é armazenada em custom field após a próxima mensagem do cliente
      saveField(CF.EMAIL_LEAD, "message.last_text"),
      goto(2),
    ],
  },

  // step 2 — A.MENU
  {
    _id: "A.MENU",
    question: [
      show(M.MA_1),
      buttons([
        { text: "1 — Tamanho", step: 3 }, // → A1
        { text: "2 — Disponibilidade", step: 5 }, // → A2
        { text: "3 — Pagamento", step: 7 }, // → A3
        { text: "4 — Indicação de look", step: 8 }, // → A4
      ]),
    ],
  },

  // step 3 — A1
  {
    _id: "A1",
    question: [
      show(M.MA1_1),
      buttons([
        { text: "Resolveu!", step: 4 },
        { text: "Ainda tô na dúvida", step: 20 }, // → HANDOFF_A1 (H.2)
      ]),
    ],
  },

  // step 4 — A1.OK
  {
    _id: "A1.OK",
    question: [
      show(M.MA1_2),
      buttons([
        { text: "Sim, monta pra mim", step: 9 }, // → A.CART
        { text: "Ainda não", step: 21 }, // → HANDOFF_GENERICO
      ]),
    ],
  },

  // step 5 — A2
  {
    _id: "A2",
    question: [
      show(M.MA2_1),
      saveField(CF.PECA_INTERESSE, "message.last_text"),
      saveField(CF.TAMANHO, "message.last_text"),
      saveField(CF.COR, "message.last_text"),
      // Sem consulta de estoque (Fase 3 removeu widget Nuvemshop)
      // Escala direto para humano — humano checa e responde
      goto(21), // → HANDOFF_GENERICO
    ],
  },

  // step 6 — RESERVADO (A2 esgotado — se um dia voltar consulta estoque)

  // step 7 — A3
  {
    _id: "A3",
    question: [show(M.MA3_1), goto(23)], // → HANDOFF_A3 (H.3)
  },

  // step 8 — A4
  {
    _id: "A4",
    question: [show(M.MA4_1), saveField(CF.TAMANHO, "message.last_text"), goto(24)], // → HANDOFF_A4 (H.4)
  },

  // step 9 — A.CART
  {
    _id: "A.CART",
    question: [
      moveTo(IDS.P_VENDAS, IDS.S_VENDAS_CARRINHO_ENVIADO),
      show(M.MA5_1),
      stopBot("talk-close"),
    ],
  },

  // step 10 — B.ID1 (portão de identificação)
  {
    _id: "B.ID1",
    question: [
      moveTo(IDS.P_POSVENDA, IDS.S_POSVENDA_NOVO_CHAMADO),
      addTag(TAGS.POS_VENDA),
      show(M.MB_0),
      buttons([
        { text: "Aqui está", step: 11 }, // → B.ID1b (aguarda cliente digitar nº)
        { text: "Não achei o número", step: 12 }, // → B.ID2
      ]),
    ],
  },

  // step 11 — B.ID1b (aguarda nº do pedido)
  {
    _id: "B.ID1b",
    question: [
      saveField(CF.NR_PEDIDO, "message.last_text"),
      goto(13), // → B.LOC
    ],
  },

  // step 12 — B.ID2
  {
    _id: "B.ID2",
    question: [
      show(M.MB_1),
      saveField(CF.EMAIL_COMPRA, "message.last_text"),
      saveField(CF.DATA_COMPRA, "message.last_text"),
      goto(13),
    ],
  },

  // step 13 — B.LOC (nota + segue para menu — sem consulta Nuvemshop nativa)
  {
    _id: "B.LOC",
    question: [
      {
        handler: "action",
        params: {
          name: "create_note",
          params: {
            text: "Bot coletou identificação. Consultora, verificar Nuvemshop no card.",
          },
        },
      },
      goto(14),
    ],
  },

  // step 14 — B.MENU
  {
    _id: "B.MENU",
    question: [
      show(M.MB_2),
      buttons([
        { text: "1 — Rastreio", step: 15 }, // B1
        { text: "2 — Atraso", step: 16 }, // B2
        { text: "3 — Item errado", step: 17 }, // B3
        { text: "4 — Defeito", step: 40 }, // B4
        { text: "5 — Troca", step: 41 }, // B5
        { text: "6 — Devolução", step: 42 }, // B6
        { text: "7 — Cancelamento", step: 43 }, // B7
      ]),
    ],
  },

  // step 15 — B1
  {
    _id: "B1",
    question: [saveFieldEnum(CF.MOTIVO_CONTATO, "Rastreio"), goto(25)], // → H.6
  },

  // step 16 — B2
  {
    _id: "B2",
    question: [saveFieldEnum(CF.MOTIVO_CONTATO, "Atraso"), goto(25)],
  },

  // step 17 — B3
  {
    _id: "B3",
    question: [
      saveFieldEnum(CF.MOTIVO_CONTATO, "Item errado ou faltando"),
      addTag(TAGS.TROCA),
      show(M.B3_COL),
      goto(22), // → H.5
    ],
  },

  // steps 18-19 — RESERVADOS

  // step 20 — HANDOFF_A1 (H.2)
  {
    _id: "HANDOFF_A1",
    question: [
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H2A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H2B)]),
      stopBot("talk-close"),
    ],
  },

  // step 21 — HANDOFF_GENERICO (H.1)
  {
    _id: "HANDOFF_GENERICO",
    question: [
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H1A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H1B)]),
      stopBot("talk-close"),
    ],
  },

  // step 22 — HANDOFF_B_GENERICO (H.5)
  {
    _id: "HANDOFF_B_GENERICO",
    question: [
      moveTo(IDS.P_POSVENDA, IDS.S_POSVENDA_COM_A_GENTE),
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H5A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H5B)]),
      stopBot("talk-close"),
    ],
  },

  // step 23 — HANDOFF_A3 (H.3)
  {
    _id: "HANDOFF_A3",
    question: [
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H3A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H3B)]),
      stopBot("talk-close"),
    ],
  },

  // step 24 — HANDOFF_A4 (H.4)
  {
    _id: "HANDOFF_A4",
    question: [
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H4A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H4B)]),
      stopBot("talk-close"),
    ],
  },

  // step 25 — HANDOFF_B_RASTREIO (H.6)
  {
    _id: "HANDOFF_B_RASTREIO",
    question: [
      moveTo(IDS.P_POSVENDA, IDS.S_POSVENDA_COM_A_GENTE),
      widgetHorario(),
      condition("{{json.horario.in_hours}}", "true", [show(M.H6A)]),
      condition("{{json.horario.in_hours}}", "false", [show(M.H6B)]),
      stopBot("talk-close"),
    ],
  },

  // steps 26-29 — RESERVADOS

  // step 30 — OUTRO
  {
    _id: "OUTRO",
    question: [
      show(M.M0_3),
      saveField(CF.MOTIVO_CONTATO, "message.last_text"),
      moveTo(IDS.P_VENDAS, IDS.S_VENDAS_NOVO_LEAD),
      goto(21),
    ],
  },

  // steps 31-39 — RESERVADOS

  // step 40 — B4 (defeito)
  {
    _id: "B4",
    question: [
      saveFieldEnum(CF.MOTIVO_CONTATO, "Defeito"),
      addTag(TAGS.DEFEITO),
      show(M.B4_COL),
      goto(22),
    ],
  },

  // step 41 — B5 (troca)
  {
    _id: "B5",
    question: [
      saveFieldEnum(CF.MOTIVO_CONTATO, "Troca"),
      addTag(TAGS.TROCA),
      show(M.B5_COL),
      goto(22),
    ],
  },

  // step 42 — B6 (devolução)
  {
    _id: "B6",
    question: [
      saveFieldEnum(CF.MOTIVO_CONTATO, "Devolução"),
      addTag(TAGS.DEVOLUCAO),
      show(M.B6_COL),
      goto(22),
    ],
  },

  // step 43 — B7 (cancelamento)
  {
    _id: "B7",
    question: [
      saveFieldEnum(CF.MOTIVO_CONTATO, "Cancelamento"),
      addTag(TAGS.CANCELAMENTO),
      goto(22),
    ],
  },
];

// -------------------- Emit --------------------

const payload = steps.map(({ _id, question }) => ({
  ...(_id ? { _id } : {}),
  question,
}));

process.stdout.write(JSON.stringify(payload, null, PRETTY ? 2 : 0));
process.stdout.write("\n");
