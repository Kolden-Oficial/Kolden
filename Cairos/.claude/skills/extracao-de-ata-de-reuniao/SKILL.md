---
name: extracao-de-ata-de-reuniao
description: |
  Use quando precisar extrair ata estruturada de uma transcrição/gravação de reunião (planejamento,
  alinhamento, comitê de mudança, retrospectiva). Destila sem inventar: 4 seções obrigatórias
  (Data+Presentes, Decisões, Action Items, Perguntas em aberto). Sem comentário editorial. Marcar
  "[sem registro]" se uma seção não tem dado na transcrição. NÃO substitui meeting-summary de reuniões
  estratégicas C-level (handoff Olimpo).
domain: project-management
subdomain: meeting-notes
agente_primario: [gestor-de-stakeholders]
agente_secundario: [gerente-de-projeto]
tags: [ata, reuniao, transcricao, action-items, decisoes, governanca]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G3, G12)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

<!--
Atribuição upstream:
- Padrões e inspiração: msitarzewski/agency-agents @ commit a597cb6 (project-management/),
  licença MIT. Adaptação PT-BR, sem cópia literal — reescrita conforme padrão Kolden.
- Cópia da licença MIT: Caos/registros/absorcao/msitarzewski--agency-agents/LICENSE.upstream
-->

# Extração de ata de reunião

## Por que essa skill existe

Ata sem método vira interpretação editorial: cada redator destila um pedaço diferente da mesma conversa, adiciona inferências, e seis meses depois ninguém confia que aquela ata bate com o que foi dito. O resultado prático é decisão revivida em reunião nova ("achei que tinha ficado decidido outra coisa") e action item esquecido porque ficou enterrado num parágrafo de prosa.

A estrutura padronizada abaixo elimina a interpretação. Quem lê a ata sabe o que procurar e onde — e confia que, se não está ali, não foi dito. A skill destila; **não** interpreta. Quando o registro não dá base para uma seção, marca-se `[sem registro]` literalmente — vazio é um dado.

## Quando usar

- Reunião com transcrição automática (Otter, Zoom, Granola, gravação manual).
- Comitê de mudança / change advisory board.
- Reunião de alinhamento entre squads ou com cliente.
- Retrospectiva (sprint, projeto, trimestre).
- Comitê de risco ou de escopo.

## Quando NÃO usar

- Reunião estratégica C-level com patrocinador externo — handoff para `painel-executivo-autoplan` (Olimpo): a ata executiva tem outro padrão (insights + posicionamento, não decisões operacionais).
- Conversa 1-a-1 informal sem decisão registrável — vira nota, não ata.
- Brainstorm divergente sem fechamento — vira lista de ideias, não ata; ata só nasce após convergência.

## Template canônico — 4 seções obrigatórias

A ata é **sempre** composta destas 4 seções, nesta ordem, mesmo que alguma seja `[sem registro]`. Seção omitida quebra o contrato de leitura.

### 1. Data + Presentes

- **Data ISO-8601** (ex: `2026-06-29`)
- **Hora de início** e **hora de fim** (formato `HH:MM` 24h, fuso explícito quando houver participante remoto fora do BR)
- **Duração** em minutos
- **Presentes** — lista com `Nome · Papel`. Papel = função na reunião (não cargo): facilitador, decisor, especialista, observador, redator da ata
- **Ausentes notáveis** — quem foi convidado e não veio, **quando a ausência afeta a validade da decisão** (ex: decisor que não estava → decisão fica "pendente de homologação")

### 2. Decisões tomadas

Lista numerada. Cada item tem:

- **Decisão** em 1 frase imperativa (ex: "Migrar autenticação para Clerk até 2026-07-15")
- **Quem decidiu** — dono da decisão (1 pessoa, não "o time")
- **Data de vigência** — quando passa a valer; se imediata, escrever `imediato`
- **Reversibilidade** — uma destas etiquetas:
  - `reversível` — pode ser desfeita sem custo significativo
  - `irreversível com gatilho de revisão em <data>` — não dá para desfazer barato; agenda checkpoint para confirmar que segue válida

Se a decisão foi falada de forma ambígua, **citar a fala literal entre aspas** logo abaixo da decisão destilada, prefixada por `> fala literal:`. Isso preserva a evidência sem inflar a destilação.

### 3. Action Items

Lista. Cada item tem 4 campos, sempre nessa ordem:

- **Tarefa** — verbo imperativo + objeto (ex: "Provisionar database staging no Supabase")
- **Dono** — pessoa única (nunca "time", "squad", "alguém"). Se realmente é coletivo, escolher o accountable; o resto entra como suporte.
- **Prazo** — **data absoluta** ISO-8601 (`2026-07-05`). Nunca "próxima semana", "em breve", "ASAP".
- **Status** — `aberto` no momento da ata. Status vivos (em andamento, concluído, bloqueado) são responsabilidade do tracker (Jira/Linear/ClickUp), não da ata.

### 4. Perguntas em aberto

O que ficou sem resposta. Esta seção evita o pior padrão de reunião recorrente — a mesma dúvida ressurgir reunião após reunião sem nunca ser endereçada. Cada pergunta tem:

- **Pergunta** — formulada como pergunta direta
- **Contexto** — 1 linha sobre por que apareceu / o que destrava
- **Quem deve responder** — pessoa única
- **Prazo para responder** — data absoluta ISO-8601

Se a pergunta for grande demais para ser respondida por uma pessoa, ela vira tópico de uma nova reunião — registrar como action item ("Agendar sessão de decisão sobre X — Dono · Prazo") e fechar a pergunta como `escalada para reunião dedicada`.

## Regras de fidelidade

São as regras que separam destilação de invenção. **Inegociáveis.**

1. **Sem comentário editorial.** A skill **não** opina ("foi uma decisão acertada", "o time pareceu engajado"). Destila o que foi dito.
2. **Seção sem dado → `[sem registro]`.** Não preencher por inferência. Vazio é dado: significa que aquela reunião não produziu material para a seção.
3. **Decisão ambígua → fala literal entre aspas.** Preserva evidência. Se o redator não consegue destilar com clareza, a fala crua entra junto.
4. **NÃO inferir decisões implícitas.** "Ninguém discordou" não é decisão. "Vamos seguir com X" dito pelo decisor é decisão. Sem cristalização explícita, registra-se em "perguntas em aberto" ou em "ações" (ex: "Cristalizar decisão sobre X com <decisor> — Prazo").
5. **Sigla / jargão expandido na 1ª ocorrência.** "CAB (Change Advisory Board)" na primeira menção, "CAB" depois. Ata precisa fazer sentido para quem não estava na reunião.
6. **Nomes próprios.** Sempre como foram ditos; se a transcrição estragou ("João" virou "joao") — preservar o erro entre colchetes só se afetar identificação (`[provavelmente João Silva]`).

## Anti-padrões

- **Ata como "minutos" verbatim.** Transcrever a reunião palavra por palavra anula o valor da destilação. Quem queria a transcrição já tem; o que precisa da ata quer a destilação.
- **Inferir decisão a partir de "concordo".** Concordância passiva sem cristalização explícita pelo decisor não é decisão — vira pergunta em aberto.
- **Misturar decisão com action item.** Uma decisão pode gerar 0, 1 ou N action items separados. Decisão = "vamos fazer X". Action item = "Fulano executa passo Y do X até data Z". Não cabem na mesma linha.
- **Action item sem dono.** "Alguém vai checar" vira vapor. Se ninguém assumiu na reunião, virar pergunta em aberto: "Quem vai checar X? — Decisor · Prazo".
- **Esquecer perguntas em aberto.** É a seção mais negligenciada — e a que mais quebra reuniões recorrentes. Sem ela, a mesma dúvida volta toda reunião, ad infinitum.
- **Destilar editorialmente.** "A decisão foi sábia porque o time precisava de direção." A ata não opina sobre qualidade da decisão; registra que foi tomada.

## Saída

- **Formato:** Markdown estruturado nas 4 seções, nesta ordem.
- **Arquivo:** 1 ata por reunião em `docs/atas/AAAA-MM-DD-nome-reuniao.md` (kebab-case no nome).
- **Cross-link com tracker:** os action items da seção 3 viram tarefas no tracker (Jira/Linear/ClickUp) imediatamente após a ata ser publicada. A ata mantém os action items para histórico; o tracker assume o ciclo de vida (em andamento, concluído).
- **Imutabilidade:** ata publicada não se reescreve. Correção factual entra como anexo `## Errata <data>` no fim do arquivo, preservando o conteúdo original.

## Handoffs

- **Cairos `comunicacao-com-stakeholders`** — quando a ata vai para patrocinador, board ou cliente externo e precisa ser convertida em formato executivo (resumo + insights + próximos passos).
- **Olimpo `painel-executivo-autoplan`** — reuniões C-level com decisão estratégica de alto impacto seguem outro padrão (Contrato de Missão), não ata operacional.
- **Cairos `gestao-de-cronograma-e-escopo`** — quando um action item afeta cronograma/escopo declarado do projeto, o handoff é imediato (sem esperar próxima cerimônia).

## Checklist final antes de publicar a ata

- [ ] Data ISO-8601, início, fim, duração preenchidos
- [ ] Presentes com papel da reunião (não cargo)
- [ ] Ausentes notáveis listados quando afetam validade
- [ ] Toda decisão tem dono, vigência e etiqueta de reversibilidade
- [ ] Decisões ambíguas citam fala literal
- [ ] Todo action item tem dono único e data absoluta
- [ ] Perguntas em aberto têm responsável e prazo
- [ ] Seções vazias marcadas `[sem registro]` (não omitidas)
- [ ] Siglas expandidas na 1ª ocorrência
- [ ] Sem comentário editorial em nenhuma seção
