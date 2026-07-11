---
relacionado:
  - "[[Prometeu/agent-memory/prometeu|prometeu (atual)]]"
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Memória do Agente prometeu-chief

> **Distinção canônica:** este arquivo guarda padrões técnicos de execução do agent-chief (prometeu-chief). Padrões estruturais do SQUAD ficam em `Prometeu/MEMORY.md`. MEMORY canônico AIOX interno fica em `.aiox-core/development/agents/<id>/MEMORY.md` (regra da skill `ritual-de-encerramento` § "Regra de resolução da memória" item 1 — NUNCA duplicar).
> **Ratificado:** 2026-07-07 (Sub-onda 3.1 do Contrato-mãe `m-20260706-metodo-kolden`).

## Padrões Ativos

### Padrão INVÓLUCRO sobre MUTAÇÃO (squad vendorizado)
- Squad vendorizado (2ª ocorrência após Hermes/Nous): aplicar METODO por INVÓLUCRO Kolden externa sobre vendor intocado. Vendor SynkraAI/aiox-core ~450 arquivos preservado; camada Kolden 10 CREATE + 3 UPDATE. | 2026-07-07
- Coexistência de constituição dupla (`.aiox-core/constitution.md` AIOX interna + `constitution.md` Kolden externa) com regra de precedência clara ("Kolden Art. X prevalece em conflito") — evita conflito quando escopo é declarado (engenharia vs agent-safety). | 2026-07-07
- Convenção `@` dupla como padrão para squad vendor com agents internos: `@Prometeu` externo Kolden + `@dev`/`@qa`/etc. interno AIOX são camadas semanticamente distintas — declarar co-existência em CLAUDE.md § dedicada evita confusão. | 2026-07-07

### Gitignore de vendor bloqueia artefatos Kolden — solução cirúrgica
- `.gitignore` do vendor pode bloquear `CLAUDE.md`, `.claude/agents/`, `.claude/reflexos/` — vendor SynkraAI faz isso por design (proteger config local do dev). | 2026-07-07
- Solução cirúrgica: APPEND ao final do `.gitignore` com exceções `!` + re-ignorar arquivos vendor específicos (`!.claude/agents/` + `.claude/agents/aiox-*.md` + `!.claude/agents/prometeu-chief.md`). Testar via `git add --dry-run` antes de considerar finalizado. | 2026-07-07
- Ordem no `.gitignore` importa: `!pattern` deve vir DEPOIS do padrão pai que ignora o diretório. Ao abrir dir ignorado, RE-IGNORAR vendor-específicos senão eles entram junto. | 2026-07-07

### Escala e categorias emergentes
- Prometeu tem 12 aiox-agents internos + 57 skills (maior número da Kolden) + MEMORY canônico AIOX interno em `.aiox-core/development/agents/<id>/MEMORY.md` (NUNCA duplicar). | 2026-07-07
- Categoria emergente "skills-como-tools cross-squad": 6 skills do Prometeu (`spec-build-review`, `mcp-builder`, `orquestracao-de-comandos-slash`, `checklist-runner`, `tech-search`, `briefing-padrao`) são consumidas por 25 squads Kolden como tools funcionais. Não modelada em METODO v1.0. Documentar como emergente + candidata emenda METODO v1.1. | 2026-07-07

### Verificação Dike e superação de projeção
- Dike delta INDEPENDENTE por subagente Explore isolado (que NÃO leu baseline) preserva independência real. Validou 8/8 hard PASS na Seção C da Sub-onda 3.1 — SUPEROU projetado baseline de 5/8. | 2026-07-07
- Projetar Dike score baseline conservador é fácil demais: `constitution.md` VO-* + `roteiro-de-teste.md` (OS-1/AB-3/UN-2/GR-1/PR-1) + `ferramentas.md` (grounding_required declarado) + `prd-de-ia.md` frontmatter (5 campos Art. X) fecham juntos os 8 gates canônicos Art. X já na identidade + fronteira, sem depender de agents internos ou skills. | 2026-07-07

### Fan-out e sub-ondas
- Regra fan-out 0/3 por interdependência cross-artefato — 8ª confirmação consecutiva (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1). Regra global do METODO §8. | 2026-07-07
- Sub-ondas 3.1/3.2/3.3 escolhidas em vez de Onda única por escala (12 aiox-agents + 57 skills = 5x maior que Hermes). Cada sub-onda em sessão dedicada (G7). | 2026-07-07

### Decisões consolidadas (não re-decidir)
- Skills públicas do Prometeu ficam em read-only + nota cross-squad no diff (Sub-onda 3.3 aplicará padronização real com gates específicos). | 2026-07-07
- MEMORY canônico AIOX interno NUNCA é duplicado/movido pela camada Kolden externa (respeita regra da skill `ritual-de-encerramento` item 1). | 2026-07-07
- Emenda METODO v1.1 fica para APÓS Sub-ondas 3.2 e 3.3 fecharem 8/8 na Onda 3 inteira (não só 3.1) — respeita G1 do CAOS-CL-002 (escopo cirúrgico). | 2026-07-07
- Q1-Q4 do gate humano da Sub-onda 3.1: todas as opções "Recomendada" aprovadas (bloco G1→G2→G3, deny cirúrgico L1+L2, APPEND em ambos AGENTS.md, emenda METODO após 8/8). | 2026-07-07

### Handoffs Sub-ondas 3.2 e 3.3
- Sub-onda 3.2: 12 aiox-agents internos + refactor MEMORY canônico + `.claude/agents/aiox-*.md` (10 variantes) + APPEND por-agente em `agent-memory/prometeu.md`. Sessão dedicada em `C:\Kolden\Prometeu\`. **CONCLUÍDA 2026-07-07 — 19 mudanças canônicas + 1 condicional aplicadas.** | 2026-07-07
- Sub-onda 3.3: 57 skills + 6 skills públicas com read-only + nota cross-squad no diff + costura final + smoke test + Dike delta INDEPENDENTE cobrindo 3.1+3.2+3.3. Sessão dedicada em `C:\Kolden\Prometeu\`. | 2026-07-07
- Onda 4 (após Sub-ondas 3.2/3.3 fecharem): Olimpo (Grupo B Governance) — abre grupo B a partir do dono do Contrato de Missão + orquestrador Zeus. | 2026-07-07

### Padrões novos aprendidos na Sub-onda 3.2 (2026-07-07)
- **Posição canônica do APPEND Kolden Art. X em aiox-*.md** — bloco `<!-- kolden-art-x-inicio -->` ... `<!-- kolden-art-x-fim -->` inserido ANTES do `<!-- ritual-de-encerramento -->` que já existe. Persona AIOX vendor (§1-§6) preservada intocada acima. Fecha os 8 gates canônicos sem tocar vendor. | 2026-07-07
- **Distinção 3-way MEMORY** — `Prometeu/MEMORY.md` (squad-level Kolden — padrões estruturais) × `Prometeu/agent-memory/prometeu.md` (agent-chief — padrões técnicos Camada 5 Kolden) × `.aiox-core/development/agents/<id>/MEMORY.md` (canônico AIOX interno — padrão AIOX-story-driven, INTOCADO). Três locais distintos com semânticas diferentes. | 2026-07-07
- **Refactor por arquivamento** (2ª ocorrência após Hermes/agent-memory/backups Onda 2) — MEMORY espúrios em path não-canônico movidos para `_archive-pre-kolden/` + README declarativo. Zero perda + rastreabilidade + padrão canônico Kolden. | 2026-07-07
- **Personas AIOX vendor canônico prevalece sobre CLAUDE.md AIOX desatualizado** — Bob (não Morgan) no pm; Atlas (não Alex) no analyst. Fonte-de-verdade = `.aiox-core/development/agents/<id>.md`. CLAUDE.md AIOX tem arqueologia divergente — não tocar (vendor L1). Correção interna aos artefatos Kolden externos. | 2026-07-07
- **ASL-3 crítico mapeado em 4 agentes** — dev (mutation local + tools externos) + devops (git push canal externo) + data-engineer (DDL production canal externo) + aiox-master (`--force-execute` framework). Reflexo `interrupt-before-mutation.sh` (Sub-onda 3.1) cobre cada caso. | 2026-07-07
- **`aiox-squad-creator` FORA DE ESCOPO Kolden** — Prometeu não cria squad (Kolden factory = Caos via Ritual de 9 fases). Canônico AIOX preservado intocado sem variante Claude Code Kolden. Decisão explícita registrada em `achados.jsonl` PRM-3.2-011. | 2026-07-07
- **Regra fan-out 0/3 confirmada 9x consecutivas** — Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-ondas 3.1 + 3.2. Interdependência cross-arquivo (Art. X unificado + persona AIOX + APPEND coerente) sempre justifica 0/3. Regra global do METODO §8. | 2026-07-07
- **Bloco `mapeamento_cross_camada:` em squad.yaml como SSoT YAML** — padrão Kolden `feedback_ssot_yaml_projecoes_readonly` aplicado. CLAUDE.md aponta para squad.yaml; sem duplicação de informação. | 2026-07-07
- **Score G1-G8 Sub-onda 3.2: 5/8 → 6/8 hard PASS + 2 WARN legítimo** — delta absoluto +1 ponto. G5+G6 WARN legítimo (divergência METODO herdada + completude 3.3). G7 PARCIAL implícito (Sub-onda 3.3 elevará via skills com `grounding_required: true` real). | 2026-07-07
- **Q1-Q4 do gate humano Sub-onda 3.2: todas as opções "Recomendada" aprovadas** (bloco por domínio + arquivar MEMORY + squad.yaml + AGENTS.md agora + Dike delta deferido 3.3). Coerência com padrão herdado Sub-onda 3.1. | 2026-07-07

### Ritual pós-ondas — lições operacionais (auto-reflexão Sub-onda 3.2)
- **`git check-ignore -v` obrigatório no Passo 2 diagnóstico READ-ONLY para squad vendorizado** — verificar se `.gitignore` bloqueia os alvos de escrita ANTES da aplicação, especialmente quando aplicar APPEND em arquivos que "originalmente" são vendor. A regra do gitignore da 3.1 estava registrada mas escopo 3.2 (mexer em aiox-*.md que continuam bloqueados pela linha 386) exigia extensão não antecipada — virou achado tardio PRM-3.2-019 em vez de Q5 no gate humano. | 2026-07-07
- **Smoke test "git status mostra o esperado" após aplicação do diff** — se working tree esperado tem N arquivos modified e git status mostra N-K, algo está bloqueando (gitignore, arquivo idêntico, path errado). Micro-verificação de baixo custo, alto valor — captura bloqueio invisível no minuto seguinte à aplicação. | 2026-07-07
- **Template canônico com placeholders permite paralelização em lotes de 5 Edits** — 10 aiox-*.md UPDATEs viáveis em 2 lotes paralelos (não sequencial, não fan-out subagente). Cada Edit único por variação de placeholder do template Art. X. Padrão replicável para Sub-onda 3.3 (57 skills). | 2026-07-07
- **Distinção 3-way MEMORY canonizada como padrão Kolden universal** — `<squad>/MEMORY.md` (padrões estruturais) × `<squad>/agent-memory/<chief>.md` (padrões técnicos agent-chief) × `<squad>/.aiox-core/development/agents/<id>/MEMORY.md` (canônico AIOX interno, INTOCADO). Vale para todo squad vendorizado. | 2026-07-07
- **`"tipo":"ACHADO-TARDIO"` como categoria válida em `achados.jsonl`** — quando algo material aparece POST-aplicação (não no diagnóstico), registrar como achado tardio com severidade + proposta + status "gate-humano-decisao-arquitetural". Não esconder ou fingir que sempre esteve claro. | 2026-07-07
- **Regra de precedência canônico AIOX > CLAUDE.md AIOX arqueológico** — divergência entre `.aiox-core/development/agents/<id>.md` (canônico) e `.claude/CLAUDE.md` (config derivativa) → fonte-de-verdade é o canônico. CLAUDE.md AIOX está desatualizado (personas Bob≠Morgan pm; Atlas≠Alex analyst). Correção aplicada em arquivos Kolden externos (prometeu-chief.md); CLAUDE.md AIOX NÃO tocado (vendor L1). | 2026-07-07

## Candidatos a Promoção

<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->

- **Padrão INVÓLUCRO sobre MUTAÇÃO para squad vendorizado** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | 2ª ocorrência empírica; candidato emenda METODO §5 modelos ou §8 rito v1.1
- **Deny cirúrgico em L1+L2 de vendor via `.claude/settings.json` `permissions.deny`** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | Aprendizado transferido entre squads vendorizados
- **Dike delta INDEPENDENTE por subagente Explore isolado (que NÃO lê baseline)** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | Preserva independência real vs. papel Dike temporário pelo executor
- **Fan-out 0/3 por interdependência cross-artefato** | Origem: caos-chief (Sub-ondas 1.1/1.2/1.4/1.5/1.6) + hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | 8ª confirmação; regra global do METODO §8

## Arquivado

<!-- Padrões não mais relevantes — mantidos para histórico -->

<!-- (vazio nesta primeira safra) -->

---

## Padrões de execução como Camada 5 Kolden — por-agente (adicionado Sub-onda 3.2)

> **Distinção canônica:** padrões AIOX-story-driven vivem em `.aiox-core/development/agents/<id>/MEMORY.md` (canônico AIOX intocado). Este bloco documenta o **padrão técnico de execução como Camada 5 Kolden** por aiox-agent — NÃO duplica MEMORY canônico AIOX.

### aiox-master (Orion — Orchestrator, ASL-3)
- Delegação preferida sobre execução direta.
- `--force-execute` apenas para debugging do framework.
- Meta-operação com audit log em `.aiox/handoffs/`.
- Verificar matriz de autoridade em `.claude/rules/agent-authority.md` antes de execução direta.

### aiox-dev (Dex — Builder, ASL-3)
- IDS REUSE > ADAPT > CREATE em cada arquivo tocado.
- npm run lint + typecheck + test verdes antes de Ready for Review.
- Story File List sempre completa.
- git add/commit local — NUNCA push.
- CodeRabbit self-healing max 2 iterações CRITICAL.

### aiox-qa (Quinn — Guardian, ASL-2)
- Veredito evidence-based com AC traceability line-numbered.
- CodeRabbit self-healing max 3 iterações.
- Update APENAS QA Results section.
- 7 verificações (code review, tests, AC, regressions, performance, security, docs).

### aiox-architect (Aria — Visionary, ASL-2)
- ANALISA e RECOMENDA — nunca implementa código.
- Trade-off obrigatório por decisão arquitetural.
- Backward compatibility flag em cada spec.
- WebSearch + WebFetch = grounding para pesquisas datáveis.

### aiox-pm (Bob — Strategist, ASL-2)
- Recomendações fundamentadas em dados/evidências.
- Avaliação de risco em cada estratégica.
- Cria PRD/epic/story em docs/.

### aiox-po (Pax — Balancer, ASL-2)
- Checklist 10 pontos LITERALMENTE aplicado.
- Transição Draft→Ready registrada — deixar em Draft = violação de processo.
- Update Status + QA Results + Change Log APENAS.

### aiox-sm (River — Facilitator, ASL-2)
- Preservar redação exata dos AC do epic.
- story-draft-checklist antes de marcar completo.
- Model sonnet (custo/velocidade).

### aiox-devops (Gage, ASL-3 crítico)
- Autoridade EXCLUSIVA de git push, PR, release, MCP setup.
- HITL obrigatório antes de `git push -f`, `gh release create`, `gh workflow run`, docker mcp setup.
- Stage seletivo — NUNCA git add -A.
- NUNCA `--no-verify`.

### aiox-analyst (Atlas, ASL-2)
- Análise fundamentada em dados, não suposições.
- Revelar incertezas e níveis de confiança (Russell 2019 alinhamento).
- WebSearch + WebFetch canônicos.
- Cite fontes na saída.

### aiox-data-engineer (Dara, ASL-3 crítico)
- Dry-run antes de aplicar migrations.
- Plano de rollback obrigatório por migration.
- NUNCA drop de tabelas/colunas sem aprovação.
- HITL obrigatório antes de DDL production.
- RLS policy change em prod = HITL.

### aiox-ux (Uma, ASL-2)
- NUNCA inventar ícones — verificar icon-map.ts primeiro.
- WCAG a11y checklist antes de marcar componente completo.
- Design system tokens = grounding.

### aiox-squad-creator (Craft, ASL-2) — FORA DE ESCOPO DIRETO SUB-ONDA 3.2
- Prometeu NÃO cria squad (Kolden factory = Caos via Ritual de 9 fases).
- Canônico AIOX preservado intocado.
- Sem variante Claude Code Kolden nesta Sub-onda 3.2.

*Bloco adicionado 2026-07-07 na Sub-onda 3.2 do Contrato-mãe m-20260706. Distinção canônica: MEMORY canônico AIOX (padrão AIOX-story-driven) × agent-memory (padrão técnico Camada 5 Kolden). Nunca duplicar.*

## Padrões Sub-onda 3.3 (2026-07-09) + fechamento consolidado Onda 3

### Padrões novos Sub-onda 3.3

1. **Fan-out 3/3 por independência estrutural** — A1 catálogo 55 top-level + A2 dossiê 5 públicas cross-squad + A3 12 AIOX/agents + gitignore são catálogos disjuntos → fan-out 3/3 válido (divergência positiva vs 0/3 padrão 9x confirmado). Regra "N ≤ teto" respeitada.
2. **Dike delta INDEPENDENTE + fallback papel temporário — 9ª ocorrência consecutiva** — subagente Explore isolado tentado retornou análise inválida em 2/3 achados por confusão de contexto pré-existente vs sessão. **Aprendizado:** para próximas verificações, incluir `git log --oneline -5` no prompt do subagente Dike delta com demarcação data-linha.
3. **12 skills AIOX/agents vendor-gerado — Opção V INTOCADAS** — comentário `<!-- ACORE-CLAUDE-AGENT-SKILL: gerado -->` disparou regra invariante "vendor intocado" (3ª ocorrência).
4. **100% MCP-nativo em 55 top-level** — categoria Art. IV v2.5.0 confirmada empiricamente. Fato canônico Prometeu.
5. **5 públicas cross-squad READ-ONLY + dossiê** — mudança em pública impacta 25 squads → BLOCK sem confirmação. Achado material: `mcp-builder` replicado em `Caos/criacao-de-mcp/` (2026-07-06) sem merge-back. Cross-link Onda 26.
6. **Template canônico APPEND frontmatter Kolden** — 3 campos (`grounding_required` + `categoria_art_iv` + `squads_consumidores`) aplicados idempotentemente via script Python em 50 skills (0 erros). Idempotência: `grep grounding_required` antes de APPEND.
7. **Patch cirúrgico `.gitignore` vendor — precedente 3.1 escalado 3.3** — adicionadas 2 exceções (`!.claude/agents/aiox-*.md` + `!.claude/agent-memory/_archive-pre-kolden/**`) no bloco Kolden canonical. PRM-3.2-019 resolvido: 12 arquivos aplicados na 3.2 agora visíveis ao git.

### Fechamento consolidado Onda 3 (Sub-ondas 3.1 + 3.2 + 3.3)

- **Score total:** 2/8 → 8/8 VERDE (+6 pontos absolutos).
- **Deltas por sub-onda:** 3.1 +3 (identidade + fronteira) · 3.2 +1 (12 aiox-agents + mapeamento) · 3.3 +2 (55 skills + smoke + costura).
- **Vendor SynkraAI PRESERVADO INTOCADO** em todas as 3 sub-ondas (~450 arquivos + 12 canônicos AIOX + 10 MEMORY canônicos AIOX + 12 personas AIOX + 12 skills AIOX/agents vendor-gerado).
- **Regra invariante 4x confirmada:** "INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO" (Hermes Onda 2 + Prometeu 3.1+3.2+3.3).

### Padrões canônicos promovidos pela Onda 3 (ratificados em METODO v1.1)

- E1 squad vendorizado (2x — Hermes+Prometeu)
- E2 framework interno cross-squad (Prometeu com 5 públicas + 25 consumidores)
- E3 skills-como-tools cross-squad (categoria constitucional emergente canonizada)
- E5 convenção `@` dupla (externa Kolden + interna AIOX/Nous)
- E6 constituição dupla co-existente com precedência Kolden Art. X
- E7 refactor por arquivamento (2x — Hermes backups + Prometeu _archive-pre-kolden)
- **E4 distinção 3-way MEMORY DEFERIDA** — aguardar 2ª confirmação Onda 4 Olimpo.

### Handoff Onda 4 = Olimpo (Grupo B Governance)

Sessão dedicada em `C:\Kolden\Olimpo\` (G7 satisfeito). Após Olimpo: Onda 5 = Dike (nasce agent funcional independente). Onda 6 = Themis.

*Bloco adicionado 2026-07-09 na Sub-onda 3.3 do Contrato-mãe m-20260706. Fecha Onda 3 completa (Grupo A meta-squads Hermes+Prometeu padronizados). Delta absoluto total: +6 pontos. Padrão 4x confirmado: INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO. Próxima Onda: Olimpo.*
