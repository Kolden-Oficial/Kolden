# ROADMAP — Estrutura Robusta da Kolden (pós-lote de absorção)

> **Origem:** lote de absorção 2026-06-26/27 (31 repos). **Estado:** 44 skills-âncora aplicadas; absorção
> exaustiva em curso (Fase 3 desta sessão) + o que segue. **Dono da decisão:** Ronan. **Modo:** sem web
> (herança histórica deferida), sem squad novo sem validação, tudo reversível por git.

## Onde estamos (concreto)
- 31 repos clonados, **SAFE**, inventariados, decididos, no ledger `repositorios-absorvidos.yaml`.
- **44 habilidades** aplicadas em 11 squads (ver `RELATORIO-DO-LOTE.md` + `aplicacao-f6-resultado.md`).
- **5 vendors** + **5 referências inertes** registrados.
- **Dimensionamento da exaustão total:** ~300-500 skills, ~13 squads, semanas (exploração 2026-06-27).

---

## R1 — Exaustão das skills diferidas (a maior frente)
Completar os clusters `DIFERIDO-INCREMENTAL` dos `relatorio-de-perda-*.md`. Ordem por **alavancagem**:

| Prioridade | Bucket / fonte | Diferido | Esforço | Squad-alvo |
|---|---|---|---|---|
| **1** | **Cyber full-spectrum** (`mukul975`, 817 skills) | 27 clusters | 100-150 skills | Égide |
| **2** | **SEO profundo** (`claude-seo`, 49 cap) | 39 IDs | 40-60 skills | Ariadne (+Argos/Égide/Aglaia handoff) |
| **3** | **ECC meta-fábrica** (`everything-claude-code`, 271) | 37 clusters | 60-100 skills | Caos·Dédalo·Prometeu (+6 squads) |
| **4** | **Coletânea marketing** (`alirezarezvani`, 346) | clusters de mkt | 40-60 skills | Pheme·Ariadne·Caliope |
| **5** | **Eng/spec** (`spec-kit`/`gsd`/`superpowers` resto) | ~20 clusters | 30-50 skills | Prometeu·Dédalo |
| **6** | Design/analytics/pesquisa restantes | — | 40-60 skills | Harmonia·Metis·Argos |

**Regras invioláveis na exaustão:** dual-use no cyber (só método, scripts ofensivos barrados); fusão de
sobreposições; reconciliação PERDIDO=0 por bucket; licenças (copyleft/proprietário = princípio em PT-BR +
atribuição). **Mecânica:** `GUIA-APLICACAO.md` + fan-out de subagentes por squad, commit incremental.

> **Parte do R1 é executada NESTA sessão** (Fase 3 do plano aprovado, "maximizar até o limite"). O que não
> couber permanece aqui como fila priorizada para sessões dedicadas.

## R2 — 6 squads novos (domínios sem dono) — ✅ SEMENTE CRIADA (2026-06-28)
> **Status:** o Ronan aprovou; os 6 squads foram criados como **estrutura-semente** (chief + 4 especialistas +
> 5 skills-âncora + squad.yaml + catálogo + MEMORY) — Nomos, Pactolo, Êmporos (`Emporos/`), Héstia (`Hestia/`),
> Ananke, Cairós (`Cairos/`). **Pendente:** Ritual completo do Caos por squad (diagnóstico 7 faculdades → PRD →
> herança histórica → maturity ≥7) + expansão das skills (cada domínio tem dezenas de capacidades no dossiê).

A coletânea `alirezarezvani` + `knowledge-work-plugins` trazem 6 domínios sem squad. Criar squad é **Ritual
do Caos** (interativo, decisão de arquitetura de negócio). Proposta de nomes mitológicos (a refinar no Ritual):

| Domínio | Nome sugerido | Fonte de skills | Escopo |
|---|---|---|---|
| Compliance/Jurídico | **Nomos** (a lei) | alirezarezvani (27: GDPR/ISO/SOC2/EU-AI-Act), knowledge-work legal | conformidade regulatória, contratos, risco |
| Finanças (operacional) | **Pactolo** (rio dourado) | alirezarezvani finance, knowledge-work finance | FP&A, modelagem, fechamento — distinto do Plutos/CFO (estratégico) |
| Vendas/Comercial | **Êmporos** (comerciante) | alirezarezvani comercial (13), knowledge-work sales | pipeline, qualificação, propostas, CRM — distinto do Afrodite/CRO |
| RH/Cultura | **Héstia** (o lar) | alirezarezvani ops/RH | recrutamento, onboarding, cultura, performance |
| Operações/BizOps | **Ananke** (ordem/necessidade) | alirezarezvani ops (7) | processos, SOPs, eficiência operacional |
| PMO/Projetos | **Cairós** (o momento certo) | alirezarezvani PMO (17) | gestão de projetos, cronograma, riscos, stakeholders |

**Ação:** Ronan valida nomes/escopo → Caos roda o Ritual (diagnóstico → PRD → construção) por squad.

## R3 — Infraestrutura
- **claude-mem core** — memória automática (daemon + SQLite + Chroma + reinjeção semântica). É **infra do
  Kolden OS** (não squad). Avaliar integração à stack LobeHub/WSL. Remover telemetria PostHog. Alta alavancagem
  (todo agente fica mais inteligente entre sessões).
- **Provisionamento de credenciais (via Infisical):** `PERPLEXITY_API_KEY` (retriever Sonar/Argos); chaves dos
  vendors quando ativados (n8n `N8N_API_*`, backends Azure do MarkItDown, LLM/TTS do MoneyPrinterTurbo).
- **MCPs locais:** `markitdown-mcp` (arquivos→MD), `playwright-mcp` (browser soberano vs Browserbase, com
  `browser_run_code_unsafe` desabilitado), `repomix --mcp`. Registrar em `mcp-status.md` quando conectados.

## R4 — Conformação dos squads (qualidade estrutural)
- **Catálogos ausentes:** criar `catalogo.md` em Égide, Prometeu, Dédalo, Pheme, Olimpo, Metis, Caliope
  (Fase 4 desta sessão cobre isto).
- **`MEMORY.md`** nos squads que não têm (ritual de encerramento por squad).
- **Herança histórica via web** — biografias/frameworks dos especialistas (Liceu/`heranca-de-especialista`):
  **precisa autorização de busca** do Ronan. Enriquece as skills novas (hoje são extração local pura).
- **Ritual completo** dos squads `importado-cru` (xquads/aiox) — dívida da fase 2 de import.

## R5 — Qualidade (gate antes de declarar "robusto")
- **Revisor + testador** (cascata N0→N6, maturity ≥7.0) sobre as 44+ skills novas — hoje não passaram pelo gate de qualidade do Caos.
- **`auditoria-de-squad`** com benchmark = repo-fonte (ex.: claude-seo sobre Ariadne) para medir cobertura real.
- **Smoke-test de invocação:** confirmar que as `description` das skills disparam nos gatilhos certos (princípio SDO).

---

## Sequenciamento recomendado
1. **Agora (esta sessão):** R1 parcial (maximizar) + R4 catálogos + commit/PR.
2. **Curto prazo:** terminar R1 cyber/SEO; R3 provisionamento (rápido, destrava Sonar).
3. **Médio:** R2 (validar e criar squads novos); R3 claude-mem; R5 qualidade.
4. **Contínuo:** R4 herança via web (quando busca for autorizada); Ritual dos importado-cru.

## Métrica de "robusto"
- Todos os squads com `catalogo.md` + `MEMORY.md` + skills passando maturity ≥7.
- Cobertura dos buckets gigantes ≥80% das capacidades de alto valor (não 100% — caudas longas viram referência).
- Retrievers/MCPs provisionados e testados; credenciais 100% via Infisical.
- Domínios de negócio com squad dono (R2 resolvido).
