# Memória do olimpo-chief (agent-chief Zeus como orquestrador)

> Memória persistente do agent-chief. Padrões técnicos de execução — decompor + rotear + arbitrar + consolidar.
> Distinção 3-way MEMORY (E4 canonizada METODO v1.1 pela 2ª confirmação empírica na Onda 4):
> - squad-level: `Olimpo/MEMORY.md` (padrões estruturais)
> - agent-chief-level: este arquivo (padrões técnicos de execução Zeus)
> - agent-especialista-level: `Olimpo/agent-memory/{afrodite,plutos,+6 outros}.md` (padrões por-executivo)
> Datas absolutas (AAAA-MM-DD). Trim ≤150 linhas por regra de higiene.

## Padrões Ativos

### Decomposição (Camada 3)

- **Decompose sempre com premissa explícita.** Art. I constitution (Kolden Art. X) veta decisao_sem_premissa. Antes de rotear, escreva: "premissa = X porque Y (fonte)". Sem premissa, devolve ao Hermes. | Onda 4 2026-07-09

- **Routing via routing_triggers, não via chute.** 11 domínios em `agents/zeus.md` L122-166 + delegates_to_seed em L127/143/153/159. Se keyword ambígua (bate com 2+ domínios), pergunta ao Ronan via Hermes (teste Roteamento-1). | Onda 4 2026-07-09

- **Contrato de Missão sempre.** Art. V constitution veta bypass_de_contrato_de_missao. Missão sem `intencao_original.hash` sha256 não desce. Pressa é razão para acelerar Hermes-DoR-Zeus, não para pular. | Onda 4 2026-07-09

### Arbitragem (Camada 3 na subida)

- **Nunca decida cross-executivo em conflito material.** Art. II constitution veta arbitragem_sem_escalada. Registre `zeus.arbitragem[]` com tabela de trade-off (posição × evidência × custo × retorno × horizonte) + recomendação técnica em negrito (opcional) + escala ao Ronan. | Onda 4 2026-07-09

- **Reflexo interrupt-before-mutation.sh dispara em arbitragem sem escalada.** ASL: 3 — quatro categorias sensíveis: (a) arbitragem cross-executivo sem consenso; (b) escalada board/investidor sem gate humano; (c) mutação em Contrato lacrado; (d) publicação M&A/pivot sem gate humano. | Onda 4 2026-07-09

### Consolidação (subida via SCQA)

- **SCQA + Pyramid + rubrica 0-10 antes de fechar.** Art. XIV constitution obriga rubrica. Consolidação passa por (1) `sumario-executivo-scqa` estrutura → (2) `comunicacao-executiva` formata 1-página + decisão pedida em destaque → (3) `rubrica-dimensional-0-10` avalia 4 dimensões (clareza/evidência/trade-off/rastreabilidade) — corrige até 8+ em todas. | Onda 4 2026-07-09

- **Se >10min de leitura estimada, comprima antes de subir para Dike.** KPI aspiration_criteria `entrega_scqa_10min` = 95%. Passar 10min = quebra do limite (teste SCQA-1). | Onda 4 2026-07-09

### Handoffs cross-squad

- **Peitho + Caliope + Aglaia via Apolo (CMO):** Apolo é a boca de saída Kolden para marketing. Peitho executa tráfego/social; Caliope escreve copy; Aglaia cuida da marca; Orfeu produz áudio; Ariadne desenha jornada; Pheme faz social. | Onda 4 2026-07-09

- **Prometeu + Dedalo via Hefesto (CTO) OU Atena (CAIO):** Hefesto para engenharia de produto; Atena para stack de IA + agentes + prompt engineering; Dedalo para MCPs. | Onda 4 2026-07-09

- **Themis + Pluto colaboração (não descida):** Zeus consulta Themis (conselho consultivo) para decisões estratégicas nível board; consulta Pluto para frameworks Hormozi de growth/monetização. Não são executores sob decomposição. | Onda 4 2026-07-09

### Ritual de encerramento

- **Ao fim de cada sessão, invocar `/ritual-de-encerramento`** — reflita sobre a sessão, extraia lições verificadas, grave em `Olimpo/agent-memory/olimpo.md` (este arquivo) + `Olimpo/MEMORY.md` (squad-level). Nunca fechar sem aprender. | Onda 4 2026-07-09

### Meta-execução de Onda do METODO (padronização)

- **Onda pode chegar MID-FLIGHT — verificar estado ao vivo ANTES de agir.** A Onda 4 já tinha Passos 1-3 commitados (`f7660232`) + 2 dos 9 CREATEs aplicados, parada no gate humano — mas o briefing a descrevia como começo do zero. `git log -5` + `git status` + reconciliação aplicado-vs-pendente (por-arquivo) evitou refazer/sobrescrever trabalho já lavrado. Sinal > doc/briefing stale. | Onda 4 2026-07-10

- **Dike delta independente pós-aplicação vale mesmo com baseline VERDE.** O subagente Explore isolado pegou off-by-one REAL (numeral "14 skills" em 8 arquivos vs 15 em disco) que o baseline do produtor não viu. Verificação independente ≠ redundância — produtor é cego ao próprio erro de contagem. Incluir `git log -5` no prompt do subagente separa commitado de sessão. | Onda 4 2026-07-10

- **Contagem canônica: confirmar por `find`/`ls` autoritativo, nunca herdar numeral do briefing.** O "14" veio errado do PROMPT-DE-ABERTURA e propagou. Ao corrigir, recontar também sub-totais dependentes (grounding: 8 `true` + 7 `false` = 15, não 6 false). | Onda 4 2026-07-10

## Candidatos a Promoção

- **`@Olimpo:apolo` dispatch direto:** hoje o dispatcher hermes-chief invoca só o chief (Zeus). Expandir para invocar executivo específico direto se demanda cross-cutting via Camada 5 exigir (gatilho: 3+ pedidos consecutivos de dispatch direto sem passar por Zeus). Estado: TODO PRD §7. | Onda 4 2026-07-09

- **Skill nova `m-e-a-operacional` para Plutos:** M&A operacional (accretion/dilution + sinergia + pro forma + earn-out + integração pós-aquisição). Gatilho: 1ª aquisição real da Kolden. Registrado em `MEMORY.md` Candidatos a Promoção (B08 do agency-agents). | 2026-06-29

- **Skill nova `due-diligence-financeira` para Plutos:** Checklist DD financeira. Mesma janela de M&A (G21 B08). DD cross-squad: financeira=Plutos; legal=Egide; mercado=Argos. | 2026-06-29

## Arquivado

<!-- Padrões não mais relevantes — mantidos para histórico -->
