---
tipo: memoria
squad: Prometeu
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Prometeu/agent-memory/backups/prometeu-2026-07-07-pre-3.2-ritual|prometeu-2026-07-07-pre-3.2-ritual]]"
  - "[[Prometeu/agent-memory/backups/prometeu-2026-07-09-pos-3.3-ritual|prometeu-2026-07-09-pos-3.3-ritual]]"
  - "[[Prometeu/agent-memory/backups/prometeu-2026-07-09-pre-3.3-ritual|prometeu-2026-07-09-pre-3.3-ritual]]"
  - "[[Prometeu/agent-memory/backups/prometeu-2026-07-07-2|prometeu-2026-07-07-2]]"
---

# Memória do Agente prometeu-chief

> **Distinção canônica:** este arquivo guarda padrões técnicos de execução do agent-chief (prometeu-chief). Padrões estruturais do SQUAD ficam em `Prometeu/MEMORY.md`. MEMORY canônico AIOX interno fica em `.aiox-core/development/agents/<id>/MEMORY.md` (regra da skill `ritual-de-encerramento` § "Regra de resolução da memória" item 1 — NUNCA duplicar).
> **Ratificado:** 2026-07-07 (Sub-onda 3.1 do Contrato-mãe `m-20260706-metodo-kolden`).

## Padrões Ativos

### Lições verificadas da Sub-onda 3.3 (auto-reflexão ritual 2026-07-09)

- **Subagente Explore isolado tem confusão de contexto pré-existente vs sessão** — sem contexto temporal, ele vê `git status` do repo raiz e classifica tudo como "desta sessão". Solução: incluir `git log --oneline -5` no prompt + demarcação data-linha "antes X = pré-existente; a partir de X = sessão". Aprendizado para Onda 4+ (Dike delta). | 2026-07-09
- **Script Python idempotente para APPEND frontmatter em N skills** — padrão canônico: (a) `grep <marker>` antes de append (idempotência); (b) regex `^---\n(.*?)\n---\n` com `re.DOTALL` para pegar frontmatter YAML variável; (c) inject antes do segundo `---`; (d) reportar modified/skipped/errors. Validado 50/50 zero-erros em Prometeu 3.3. | 2026-07-09
- **Confirmar contagens do briefing no filesystem antes de aceitar** — briefings de sub-ondas herdam contagens de sub-ondas anteriores que podem estar desatualizadas. Prometeu 3.3: briefing dizia 57 skills + 6 públicas; filesystem confirmou 67 (55+12) + 5 (briefing-padrao é global Kolden). Sempre `find | wc -l` + verificação de existência dos itens específicos. | 2026-07-09
- **`git check-ignore -v` semântica confusa** — retorna exit 0 quando arquivo TEM regra correspondente, incluindo `!padrao` (não-ignorar). Para verificar se está ignorado, interpretar a linha: `!padrao` = visível; `padrao` sem `!` = ignorado. Não confiar só no exit code. | 2026-07-09
- **Precedente cirúrgico em vendor legitima escalonamento** — Sub-onda 3.1 editou `.gitignore` vendor com 12 linhas (bloco Kolden canonical). Sub-onda 3.3 aplicou Q2 Opção 2 (+2 linhas no mesmo bloco) sem violar princípio "vendor intocado" — é continuação de exceção já aprovada, não nova exceção. Regra: se vendor foi tocado 1x com aprovação humana, tocar de novo com escopo similar é continuação. | 2026-07-09
- **Papel Dike temporário com 3 salvaguardas — 9ª ocorrência consecutiva canônica transitória** — quando Dike delta INDEPENDENTE via subagente Explore falha (por confusão de contexto ou outro motivo), fallback aceito com salvaguardas declaradas honestamente: (a) ordem serial 3.1→3.2→3.3; (b) evidência textual verbatim por checkbox; (c) divergência declarada. Padrão até Dike agent-funcional nascer (Onda 5 Grupo B). | 2026-07-09

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
- **Fan-out N/3 por independência estrutural quando A1/A2/A3 são catálogos disjuntos** | Origem: prometeu-chief (Sub-onda 3.3) | Detectado: 2026-07-09 | Divergência positiva legítima vs 0/3; regra "N ≤ teto" respeitada
- **Papel Dike temporário pelo executor com 3 salvaguardas — fallback canônico transitório** | Origem: caos-chief (1.1-1.5) + hermes-chief (Onda 2) + prometeu-chief (3.1+3.2+3.3) | Detectado: 2026-07-09 | 9ª ocorrência; padrão até Dike agent-funcional nascer (Onda 5 Grupo B)

## Arquivado

<!-- Padrões não mais relevantes — mantidos para histórico -->

- ~~Padrões Sub-onda 3.1 (INVÓLUCRO / Constituição dupla / @ duplo / Gitignore cirúrgico / 57 skills / skills-como-tools / Dike delta subagente / baseline Dike / Fan-out 0/3 8x / escala Sub-ondas)~~ | Arquivado: 2026-07-09 | Motivo: canonizados em METODO v1.1 (E1/E3/E5/E6) OU substituídos por padrões 3.3 amplificados
- ~~Padrões Sub-onda 3.2 (posição APPEND Art. X / Distinção 3-way MEMORY / Refactor por arquivamento / Personas AIOX canônico / ASL-3 crítico 4 agentes / aiox-squad-creator FORA DE ESCOPO / Fan-out 9x / SSoT mapeamento_cross_camada / Score 5→6 / Q1-Q4 gate humano)~~ | Arquivado: 2026-07-09 | Motivo: consolidados em "Fechamento consolidado Onda 3" desta memória + METODO v1.1
- ~~Decisões consolidadas Sub-ondas 3.1/3.2 (públicas READ-ONLY / MEMORY AIOX NUNCA duplicado / emenda METODO após 8/8 / Q1-Q4 Recomendadas) + Handoffs Sub-ondas 3.2/3.3 concluídas~~ | Arquivado: 2026-07-09 | Motivo: histórico executado; Onda 3 CONCLUÍDA 8/8 VERDE, próxima Olimpo Grupo B

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
