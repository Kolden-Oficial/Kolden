---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/tasks/_indice|_indice]]"
---

# Tarefa: Prospecção por Stargazers (GitHub → enriquecer → validar)

**ID:** ARGOS-008
**Versão:** 1.0.0
**Comando:** `*prospeccao-por-stargazers`
**Agentes:** `web-harvester` (descoberta) → `market-sizer`/`competitor-mapper` (enriquecimento Apollo) →
`compliance-sentinela` (validação de e-mail + checagem de ToS)
**Origem:** absorção `coreyhaines31/marketingskills@8bfcdff` (G18 método github-prospects + G19 estados Truelist).
Procedência: `Caos/registros/absorcao/coreyhaines31--marketingskills@8bfcdff/`.

> **Objetivo:** transformar a base de admiradores (stargazers/forks/watchers) de repositórios âncora em
> uma lista de prospects B2B **enriquecida e com e-mail validado**, mantendo a proveniência
> (fonte+timestamp) e a separação verde×cinza do Argos. Canal ideal para SaaS dev-tool.

## Posição no Argos
É **camada de inteligência → handoff**: o Argos descobre e qualifica o universo de prospects; o
disparo de outreach (e-mail frio/sequência) é dos squads de execução (Pluto/handoff), não do Argos.
Zona **verde** — usa API pública do GitHub + APIs legítimas (Apollo/Hunter/Truelist). Nada de scraping
autenticado; se algum passo exigir login/conta, sobe ao `compliance-sentinela` (não improvisar).

## Entradas
| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| repos_ancora | lista | Sim | 3-5 repositórios âncora (concorrentes, líderes de categoria, ferramentas complementares) |
| icp | objeto | Sim | Perfil de cliente ideal (setor, porte, geografia) para o filtro |
| sinal | enum | Não | `stargazers` (padrão) / `forks` / `watchers` |
| limite | número | Não | Teto de prospects a processar (custo de enrich/validação) |

## Fases de execução

### Fase 1 — Descoberta (`web-harvester`, GitHub API pública)
1. Para cada repo âncora, puxar a lista de `sinal` (stargazers por padrão) via API pública do GitHub
   (padrão `github-prospects`). Datar a coleta (timestamp) e citar o repo-fonte por prospect.
2. Deduplicar usuários entre os repos âncora; manter contagem de "quantos âncoras cada usuário estrelou"
   (mais âncoras = sinal de intenção mais forte).

### Fase 2 — Filtro de intenção B2B (`web-harvester`)
1. Manter só usuários com o campo `company` preenchido no perfil (proxy de comprador B2B).
2. Normalizar o nome da empresa (remover `@`, sufixos) para casar com firmográficos.

### Fase 3 — Enriquecimento firmográfico (`market-sizer` / `competitor-mapper`, MCP Apollo)
1. `apollo_organizations_enrich` / `apollo_mixed_companies_search` — porte, headcount, setor, domínio.
   Datar o enrich (timestamp do Apollo).
2. Aplicar o filtro de **ICP** (setor/porte/geo). Descartar quem não casa, registrando o motivo.
3. Achar e-mail profissional faltante via **Apollo** ou **Hunter** (quando provisionado). Marcar a fonte
   de cada e-mail.

### Fase 4 — Validação de deliverability (`compliance-sentinela`, Truelist) — G19
1. Validar **todo** e-mail antes do handoff via Truelist. Registrar por prospect:
   - `email_state`: `ok` | `email_invalid` | `risky` | `unknown` | `accept_all`
   - `email_sub_state` (detalhe do estado)
2. Regra de qualidade (precisão de Apollo/Hunter ~60-80% → validar é inegociável p/ reputação de envio):
   - `ok` → entra na lista de outreach.
   - `accept_all` / `risky` / `unknown` → lista secundária (rotular o risco; decisão do squad de execução).
   - `email_invalid` → descartar do outreach (mantém no dossiê como "sem e-mail válido").

### Fase 5 — Handoff
Entregar a lista qualificada aos squads de execução (Pluto/outreach) — o Argos **não** dispara e-mail.

## Formato de saída
```markdown
## Prospecção por Stargazers — {data}

**Repos âncora:** {lista}  ·  **ICP:** {setor/porte/geo}  ·  **Sinal:** {stargazers/forks}

| Prospect | Empresa | Âncoras | Firmográfico (Apollo, {ts}) | E-mail | Fonte e-mail | email_state | Decisão |
|---|---|---|---|---|---|---|---|
| {user} | {empresa} | {n} | {setor/porte} | {email} | apollo/hunter | ok | outreach |

**Resumo:** descobertos {X} → com company {Y} → no ICP {Z} → e-mail `ok` {W}.
**Proveniência:** cada linha tem repo-fonte + timestamp de coleta e de enrich.
```

## Condições de veto (idioma Argos)
- NUNCA entregar prospect sem proveniência (repo-fonte + timestamp de coleta e de enrich).
- NUNCA disparar outreach a partir do Argos — é handoff (separação inteligência × execução).
- NUNCA mandar para outreach e-mail `email_invalid`; `risky/unknown/accept_all` só com o risco rotulado.
- NUNCA usar scraping autenticado/login para coletar stargazers — API pública do GitHub é suficiente;
  qualquer necessidade de conta/proxy sobe ao `compliance-sentinela`.
- NUNCA citar Apollo/Hunter/Truelist se não estiverem na tabela `ferramentas.md` provisionados (Art. IV).

## Critérios de conclusão
- [ ] Stargazers/forks coletados dos 3-5 âncoras, deduplicados e datados
- [ ] Filtrados por `company` + ICP
- [ ] Firmográficos enriquecidos via Apollo (datados)
- [ ] E-mails achados (Apollo/Hunter) e **validados via Truelist** com `email_state`
- [ ] Lista entregue por handoff, com proveniência por linha
