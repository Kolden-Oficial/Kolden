---
name: orquestracao-de-subagentes-paralelos
description: Use ao decompor um trabalho grande em subagentes — quando despachar vários agentes em paralelo (um por domínio independente), rodar um implementador fresco por tarefa com revisão, ou poupar o contexto do orquestrador passando artefatos como arquivos. Aciona em "roda isso em paralelo", "fan-out de agentes", "um agente por área", "divide entre subagentes". Traz os CONTRATOS de saída estritos (locator/builder/revisor) e o critério de QUANDO (não) paralelizar. NÃO use para uma tarefa única e sequencial que cabe num só contexto.
tipo: skill
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Orquestração de Subagentes Paralelos

Como dividir trabalho entre subagentes **sem poluir o contexto do orquestrador** e **sem perder
rastreabilidade**. Dois eixos: *fan-out paralelo* (vários domínios ao mesmo tempo) e *cascata fresca*
(um agente novo por tarefa, com revisão). Acopla os **contratos de saída estritos** que tornam o
output de subagente confiável e barato.

## Quando paralelizar (e quando NÃO)

Despache **um agente por domínio independente, na mesma resposta** (assim correm concorrentes)
quando:
- os pedaços **não dependem** um do outro (não compartilham estado nem ordem);
- cada pedaço cabe no contexto de um agente fresco;
- o custo de coordenar < ganho de paralelizar.

**NÃO** paralelize quando: há dependência sequencial (saída de A alimenta B), o trabalho é pequeno
demais (overhead vence), ou exige um estado compartilhado mutável. Nesse caso, cascata sequencial.

## Padrão file-handoff (anti-poluição de contexto)

Passe artefatos como **ARQUIVOS**, nunca texto colado no chat do orquestrador:
- **brief** (entrada da tarefa) → arquivo; **report** (saída) → arquivo; **diff** → arquivo.
- O orquestrador lê só o **report** curto, não a transcrição inteira do subagente.
- Mantém o controlador leve por cascatas longas; a memória do trabalho vive em disco, não no contexto.

## Cascata fresca (subagent-driven)

- **Um implementador fresco por tarefa** — contexto limpo, só o brief da tarefa (bloco `Consome`/
  `Produz`); ele não vê a história da sessão.
- **Revisão em duas frentes**: spec (fez o que o brief pediu?) + qualidade (como fez?).
- **Seleção de modelo por custo** — tarefa simples/locator num modelo barato (ex.: Haiku); síntese/
  revisão crítica num modelo forte. Casa com a stack multi-LLM da Kolden (OpenRouter).
- **Ledger durável** — registre tarefa → status → artefato num arquivo persistente; a cascata é
  retomável e auditável, não some se a sessão cair.

## Contratos de saída estritos (o que torna o subagente confiável)

Cada papel devolve um **formato fixo e nada além** — sem elogio, sem escopo extra, sem narrativa:

- **Locator (read-only)** — investiga e localiza, **não corrige**. Saída: `path:line — símbolo — nota`.
  Modelo barato. Recusa qualquer pedido de edição.
- **Builder (cirúrgico)** — edita **1-2 arquivos**, recusa 3+ (sinal de tarefa mal fatiada). Devolve
  um **recibo de diff verificado**: o que mudou, onde, por quê.
- **Revisor (diff)** — achados de **uma linha com severidade** (`🔴`/`🟡`/`🔵`), sem reescrever a
  história nem ampliar escopo. Modelo barato.

Esses contratos são também a forma comprimida de subagente — combinam com a habilidade
`brevidade-de-saida`. Subagente com contrato estrito gasta ~60% menos output que um vanilla.

## Contrato de reporte (toda síntese de subagente)

Subagente de pesquisa/investigação devolve: **fontes + achados + snippets + confiança** (alta/
média/baixa). Confiança explícita evita que o orquestrador trate palpite como fato — mesma
disciplina da trilha de honestidade do grafo de codebase.

---
*Fontes: obra/superpowers@896224c4 (`subagent-driven-development`, `file-handoff`, `dispatching-parallel-agents`; MIT, Jesse Vincent) + JuliusBrussee/caveman@25d22f864 (`cavecrew` + subagentes `cavecrew-investigator`/`builder`/`reviewer` — contratos de saída estritos; MIT, Julius Brussee). O Contrato de Reporte (fontes+achados+confiança) é padrão que o Caos aplica a todo especialista criado. Princípios extraídos e reescritos em PT-BR; sem cópia literal.*
