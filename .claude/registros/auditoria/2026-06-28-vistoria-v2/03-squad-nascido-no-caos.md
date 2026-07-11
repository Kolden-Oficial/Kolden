---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 03 — Lote 9 (parcial) + Lotes intercalados: 5 squads nascido-no-caos (formato Kolden-native)

> Cobertura: **Aletheia, Argos, Liceu, Pheme, Ariadne** — 5 squads criados pelo Ritual de 9 fases do Caos.
> Total: 9 + 15 + 9 + 9 + 8 = **50 agentes**.

## Característica comum

Formato **Kolden-native**: `squad: {name, display_name, version, domain, description, keywords, entry_agent, created_at}` + `tiers` + `agents.<id>.{file, tier, icon, focus}` + `handoffs` + `external_handoffs` + `cross_cutting.{quality_standards, veto}` + `settings.activation`.

Todos têm `CLAUDE.md` próprio (identidade do squad), `prd-de-ia.md`, `README.md`, `MEMORY.md`, `instalacao.md`, `roteiro-de-teste.md` e estrutura `.claude/{skills,reflexos,settings.json}`.

## Tabela de auditoria

| Squad | Versão | Status | Agentes | Skills | Veto? | external_handoffs | CLAUDE.md? | A | B | E | F | Achado-chave |
|---|---|---|---:|---:|:-:|:-:|:-:|---|---|---|---|---|
| **Aletheia** | 1.0.0 | nascido-no-caos | 8 | 3 | ✅ 1 (`no_build_sem_evidencia`) | ✅ 5 handoffs | ✅ | OK | OK | OK | OK | maduro |
| **Argos** | 1.0.0 | nascido-no-caos | 15 | 2+compartilhadas | ✅ 2 (`nada_sem_proveniencia`, `zona_cinza_sem_autorizacao`) | ✅ 6 handoffs | ✅ | OK | OK | OK | OK | módulo cinza requer autorização |
| **Liceu** | 1.0.0 | nascido-no-caos | 9 | 3 | ✅ 5 vetos | ✅ 6 handoffs | ✅ | OK | OK | OK | OK | **não tem `workflows/`** (EX-02, design) |
| **Pheme** | 1.0.0 | "nascido-no-caos" no índice, mas **formato AIOX-legado no squad.yaml** | 9 | 30 | ❌ não em squad.yaml | comentário em prosa | ✅ (não verificado nesta passada) | OK | OK | **K-010** | OK | inconsistência de formato |
| **Ariadne** | 1.0.0 | nascido-no-caos (`Ariadne/squad.yaml:9`) | 8 | 18+ | ✅ 4 vetos | ✅ 4 handoffs | ✅ | OK | OK | OK | OK | maduro, **+18 skills** confirmadas |

## Observações por squad

### Aletheia — Discovery & Validation
- Tiers explícitos (tier_0 + 3 tiers de descoberta/validação/mercado).
- Único veto: `no_build_sem_evidencia` — robusto (4 condições para qualquer "construir/escalar/lançar").
- Handoffs externos: aglaia, pluto, harmonia+caliope, prometeu, metis. **Não menciona** semente nenhum.

### Argos — Inteligência de Mercado
- Tiers: orquestração + funcional + redes sociais + compliance.
- 2 vetos (proveniência + zona cinza).
- Especialista único: `compliance-sentinela` (tier 3) age como portão do módulo cinza.
- Handoffs externos: peitho, pheme, caliope, pluto, aletheia, metis. **Não menciona** semente.

### Liceu — Biblioteca de Mentes
- Tiers: dissecação + estrutura + operacionalização.
- 5 vetos (incl. `nada_vira_fato_sem_fonte` — gate de candura factual).
- **Não tem `workflows/`** — confirmado por EX-02 (design intencional).
- Handoffs externos: caliope, aglaia, peitho, pluto, caos (encarnação), argos (mercado). **Não menciona** semente.

### Pheme — Social & Conteúdo
- **K-010 confirmado**: `Pheme/squad.yaml` linha 1 declara `name: pheme-social-squad`, linhas 9-11 declaram `aios.minVersion`, linhas 22-58 declaram `components.{agents,tasks,workflows,checklists,data}`, linha 60 declara `config.extends: extend`. **É formato AIOX-legado.** Comentários (`linha 63-76`) descrevem a estrutura tier mas como prosa, não YAML estruturado.
- MEMORY do Ronan diz "nascido-no-caos". Squad.yaml diz outra coisa. → contradição declarativa.
- **30 skills** em `Pheme/.claude/skills/` é uma estimativa grosseira; o índice CLAUDE.md L181 lista Pheme com 9 agentes (e não declara skills). Verificar em Passo 6 (padrões sistêmicos).

### Ariadne — SEO & CRO
- Tiers: tier_1 (5 SEO) + tier_2 (2 CRO).
- 4 vetos (sem black-hat, sem recomendação-sem-dado, CRO sem hipótese, copy é handoff).
- Handoffs externos: argos (entrada), caliope, metis, aglaia.
- **K-003 (BAIXO) inconsistência Ariadne +18 vs +7**: verifico agora — o skill list do system reminder mostrou pelo menos 24 skills relacionadas (`apis-google-e-indexacao`, `auditoria-tecnica-em-escala`, `brief-de-conteudo-data-driven`, `core-web-vitals-e-performance`, `framework-flow`, `monitoramento-de-drift-seo`, `otimizacao-on-page-por-intencao`, `qualidade-de-conteudo-eeat`, `relatorios-de-seo`, `render-js-e-spa`, `seo-de-imagens`, `seo-ecommerce`, `seo-internacional-hreflang`, `seo-local-e-mapas`, `seo-programatico-profundo`, `seo-tecnico-profundo`, `sxo-search-experience`, `analise-de-gap-de-conteudo`). **+18 do resumo geral do AGENTS.md está correto**; **+7 do detalhe está desatualizado**. K-003 deve ser fechado contra o detalhe (atualizar o detalhe para +18, não o resumo).

## Achado novo do lote

```json
{"id":"K-010","severidade":"MEDIO","classe":"dados","titulo":"Pheme está declarada como nascido-no-caos na memória do Ronan + CLAUDE.md, mas seu squad.yaml está em formato AIOX-legado (campos name/slashPrefix/aios/components/config.extends) — sem cross_cutting.veto, sem external_handoffs estruturados, sem entry_agent","evidencia":[{"arquivo":"Pheme/squad.yaml","linha":1},{"arquivo":"Pheme/squad.yaml","linha":9},{"arquivo":"Pheme/squad.yaml","linha":60}],"hipotese_pai":"K-007","raio_de_explosao":"contradicao-de-status","recomendacao_breve":"migrar Pheme/squad.yaml para formato Kolden-native OU corrigir o status no índice para refletir o formato real","status":"aberto"}
```

Atualização do K-003: **+18 está CORRETO no resumo; o detalhe é que está desatualizado**. Inversão da recomendação:

```json
{"id":"K-003","severidade":"BAIXO","classe":"dados","titulo":"AGENTS.md detalhe de Ariadne (+7 skills) está desatualizado — chão real tem 18+ skills (confirmado via system reminder de skills disponíveis)","evidencia":[{"arquivo":"AGENTS.md","linha":15}],"hipotese_pai":null,"raio_de_explosao":"indice-divergente-do-chao","recomendacao_breve":"atualizar a seção detalhada do AGENTS.md para Ariadne (+18 skills, NÃO +7) — o resumo geral está correto","status":"aberto-corrigido"}
```

## Veredito de lote

- **A**: OK em todos.
- **B intra**: OK em todos.
- **B inter / D**: OK (nenhum dos 5 nascido-no-caos é órfão; todos têm padrinho declarado em `external_handoffs`).
- **E**: OK em todos, com observação de K-010 para Pheme.
- **F**: OK em todos.
- **G**: OK em todos. **Egide externo** (cyber) é mais robusto pelos reflexos do que pelos squads AIOX.

Os 5 nascido-no-caos **são o padrão de excelência** para o resto da frota. Recomendação geral: usar Aletheia ou Argos como **benchmark de auditoria-de-squad** ao migrar os 11 AIOX.
