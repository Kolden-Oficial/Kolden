---
name: pr-comunicacoes-institucionais
description: |
  Comunicação institucional e imprensa — press release na estrutura jornalística clássica
  (headline / lead 50 palavras / quotes / boilerplate), byline article (artigo assinado),
  protocolo de crise por janelas (30min / 2h / 24h+ ongoing) e mensagens-âncora por stakeholder.
  Use quando o pedido for "press release", "PR", "comunicado", "release para imprensa", "artigo
  para publicar em revista/portal", "byline", "opinion piece", "comunicação de crise", "protocolo
  de crise", "carta ao mercado" ou "posicionamento oficial". NÃO é copy de campanha comercial
  (aí use `estrutura-de-pagina-de-vendas` ou `anuncio-por-estagio-de-consciencia`). NÃO é
  monitoramento de menções (handoff Argos/Pheme).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
---

# PR e comunicações institucionais (PT-BR)

Comunicação institucional obedece regras de jornalismo, não de marketing. Um press release
que soa como anúncio vai direto pro lixo do editor. Um artigo assinado que soa como manual
técnico não vira citação. Uma resposta de crise mal calibrada vira o problema real. Esta
habilidade opera nas três frentes com moldes duros e protocolos por janela de tempo.

## Herança histórica

- **Ivy Lee** (1906, "Declaration of Principles") — inventou o press release moderno e a
  regra do "só fatos verificáveis, nomes e datas".
- **Edward Bernays** ("Propaganda", 1928) — codificou a diferença entre PR e publicidade;
  a régua ética moderna ainda parte daqui.
- **Timothy Coombs — Situational Crisis Communication Theory (SCCT, 2007)** — o framework
  operacional de resposta à crise: tipo de crise → estratégia de resposta → responsabilidade
  atribuída. Manual de referência global.
- **Michael Regester & Judy Larkin — "Risk Issues and Crisis Management" (1997 → 5ª ed.)** —
  as janelas de tempo (30 minutos, 2 horas, 24 horas) que hoje são padrão em C-suite.

## Press release — estrutura jornalística clássica

Um editor lê release por 8-15 segundos. Se a estrutura não entrega os 5W nesses segundos, o
release não sobrevive.

### Anatomia obrigatória

| Elemento | Regra dura |
|---|---|
| **Headline** | ≤ 80 caracteres; verbo forte no presente; sem adjetivo de marketing |
| **Sub-headline** (opcional) | 1 linha; complementa, não repete |
| **Lead** (1º parágrafo) | ≤ 50 palavras; responde os 5W: **Quem, O quê, Onde, Quando, Por quê** |
| **Corpo** | pirâmide invertida — mais importante no topo, contexto no meio, detalhe no fim |
| **Quote 1** | executivo interno com nome, cargo e empresa; ≤ 40 palavras; diz algo que só ele poderia dizer |
| **Quote 2** (opcional) | terceiro (cliente / parceiro / especialista); adiciona validação externa |
| **Dados / prova** | 1-3 números verificáveis com fonte |
| **Contexto** | 1 parágrafo situando no setor (o "por que agora") |
| **Boilerplate** | "Sobre {Empresa}" — 40-60 palavras padrão da empresa |
| **Contato** | nome + e-mail + telefone do relações-com-imprensa |
| **-30-** ou `###` | marcação clássica de fim do release |

### Molde da headline

Verbo forte no presente + o quê + para quem/onde + com qual dado.

- Ruim: "Empresa X anuncia nova versão de produto revolucionário."
- Boa: "Empresa X passa a operar em 3 estados após rodada de R$ 40 milhões."

### Molde do lead (50 palavras)

> A **{Empresa}**, {descritor de 1 linha}, {ação — verbo forte} {objeto} para {público}
> nesta {quando}. A iniciativa {por que agora / impacto quantificado}, segundo dados de
> {fonte}. {Detalhe único adicional se sobrar palavra}.

### Quote-tipo (o que o executivo pode dizer que ninguém mais poderia)

- Bom: "Passamos 18 meses testando esta arquitetura com {N} clientes antes de anunciar —
  o dado que virou a chave foi {métrica específica}." — CEO de {Empresa}.
- Ruim: "Estamos muito animados com esse lançamento inovador que vai transformar o setor." —
  qualquer CEO.

## Protocolo de crise por janelas

Crise não tem "hora de responder" — tem janelas. Cada janela tem obrigação diferente. Perder
a janela é criar o segundo problema (a percepção de descaso).

### Janela 1 — 0 a 30 minutos (**contenção**)

**Único objetivo:** parar o dano e reconhecer publicamente que há uma situação.

- Verificar internamente: aconteceu mesmo? Escala? Vítimas / afetados?
- Suspender qualquer publicação em redes agendada.
- Publicar **um único post** curto reconhecendo a situação e prometendo update. Molde:
  > "Estamos cientes de {descrever o fato de forma verificável, sem especular sobre causa}.
  > Nossa prioridade agora é {ação concreta em curso}. Divulgaremos atualização nas próximas
  > {tempo específico}."
- Nunca especular causa. Nunca minimizar. Nunca culpar terceiros na janela 1.

### Janela 2 — 30 minutos a 2 horas (**contexto**)

**Objetivo:** dar o contexto verificável, o que já foi feito, o que ainda está sendo feito.

- Statement mais longo (200-400 palavras) publicado no site e enviado à imprensa.
- Se há vítimas / afetados: nomear a preocupação com eles antes de qualquer coisa técnica.
- Não prometer o que não pode cumprir. Prometer só o **próximo passo** e a **próxima janela
  de update**.
- Aplicar a matriz SCCT (Coombs): qual o tipo de crise? (víctima / acidente / preveníveis)
  → qual estratégia? (deny / diminish / rebuild / bolster).

### Janela 3 — 2h a 24h (**posicionamento**)

**Objetivo:** consolidar a versão oficial, alinhar todos os porta-vozes, começar a virar a
página.

- Q&A interno para todos os porta-vozes (mesmas 15-25 perguntas + respostas alinhadas).
- Se apropriado: entrevista com um veículo de referência (não 5 — um).
- Comunicado interno para funcionários **antes** do público (regra dura).

### Janela 4 — 24h a ongoing (**recuperação**)

**Objetivo:** ações verificáveis que mostram mudança + medição pública do progresso.

- Publicar plano de correção com marcos e datas.
- Update semanal enquanto o assunto estiver ativo na imprensa.
- Retrospectiva interna após 30 dias — o que falhou no protocolo, o que ajustar.

## Byline article — artigo assinado

O byline (opinion piece assinado por executivo) é a peça mais alta de leverage de PR: coloca
o executivo como voz de autoridade sem parecer promoção. Regras:

- **Uma tese, clara.** Não 3 mensagens. Uma.
- **Estrutura:** hook (cena / dado surpreendente) → tese → 3 argumentos → contra-argumento
  respondido → conclusão que aponta ação ou implicação.
- **Voz do autor de verdade.** Se o ghostwriter escreveu, aplicar o filtro da habilidade
  `ghostwriting-de-livro` (léxico + leitura em voz alta).
- **Nenhuma menção à empresa no corpo além da bio.** Se o veículo permite 1-2 menções, use
  no meio, nunca no primeiro nem no último parágrafo.
- **Comprimento:** 800-1200 palavras para op-ed digital; 600-800 para print.

## Mensagens-âncora por stakeholder

Toda crise (e todo lançamento) tem 4-6 stakeholders com prioridades diferentes. Uma mensagem
não serve para todos — mas a **verdade** subjacente precisa ser uma só.

| Stakeholder | O que ele quer ouvir primeiro | O que evitar |
|---|---|---|
| **Imprensa** | fato verificável + próximo passo + porta-voz nomeado | jargão corporativo, "sem comentários" |
| **Clientes** | como isso os afeta + o que a empresa vai fazer | culpar terceiros |
| **Funcionários** | segurança do emprego + o que dizer se perguntarem | soube pela imprensa |
| **Investidores** | impacto financeiro + risco de longo prazo + governança | otimismo sem plano |
| **Reguladores** | conformidade demonstrada + cooperação proativa | postura defensiva |
| **Comunidade / público geral** | responsabilidade humana + ação concreta | tom técnico distante |

## Anti-padrões

- **Headline com "anuncia"** — 90% dos releases começam assim; editor descarta.
- **Lead com adjetivo antes de número** — "solução revolucionária" antes de "R$ 40 milhões".
- **Quote genérica ("estamos muito animados")** — vale zero; editor corta.
- **"Sem comentários" em crise** — vira o headline do dia seguinte.
- **Statement que fecha com "não faremos mais declarações sobre o tema"** — declarar que não
  vai declarar é a pior declaração possível.

## Fronteiras inter-squad

- **Copy do release / byline / crisis statement** — Caliope faz (esta habilidade).
- **Distribuição a listas de imprensa + relacionamento com editores** — handoff a
  **Pheme** (quando existir camada de PR distribution).
- **Monitoramento de menções, sentiment, spread da crise em redes** — handoff a
  **Argos** (social listening).
- **Estratégia jurídica em crise** — handoff a **Themis**.

## Formato de saída

1. **Release**: headline + lead 50 palavras + corpo + 1-2 quotes + boilerplate + contato.
2. **Byline**: 1 tese + hook + 3 argumentos + contra-argumento respondido + conclusão.
3. **Crisis playbook**: statement por janela (0-30min / 30min-2h / 2-24h / ongoing).
4. **Mensagens-âncora** por stakeholder (uma verdade, seis registros).

## Referências

- `references/release-molde.md` — molde completo com contagens.
- `references/crisis-por-janela.md` — statements pré-aprovados por janela.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing
(IDs MKT-G54, G55, G56). Herança histórica: Ivy Lee (1906), Edward Bernays (1928),
Timothy Coombs (SCCT, 2007), Regester & Larkin (janelas de crise). Sem cópia literal.
