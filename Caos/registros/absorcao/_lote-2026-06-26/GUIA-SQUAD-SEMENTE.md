---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# GUIA — Criação de squad-semente (estrutura inicial, não Ritual completo)

Você cria a **estrutura-semente** de UM squad novo da Kolden — utilizável e reversível, a ser refinada depois
pelo Ritual completo do Caos. Sem web, sem executar código, sem commit.

## Molde (leia primeiro para o padrão)
- `C:/Kolden/Ariadne/README.md` — formato do README (o que faz + tabela de agentes).
- `C:/Kolden/Ariadne/squad.yaml` — manifesto (tiers, orquestrador, especialistas, keywords/routing).
- `C:/Kolden/Ariadne/.claude/skills/catalogo.md` — formato do catálogo.
- Um agente-chief existente (ex.: `C:/Kolden/Ariadne/agents/ariadne-chief.md`) — formato de orquestrador.

## Fontes de capacidade (dossiês já analisados)
- `C:/Kolden/Caos/registros/absorcao/alirezarezvani--claude-skills/` (mapa-de-decisao aponta os clusters do seu domínio).
- `C:/Kolden/Caos/registros/absorcao/anthropics--knowledge-work-plugins/` (plugins oficiais do seu domínio).

## Estrutura a criar em `C:/Kolden/<Nome>/`
1. `README.md` — identidade (nome mitológico + papel), o que faz, vetos, tabela de agentes, handoffs a outros squads.
2. `squad.yaml` — manifesto: tier 0 (orquestrador) + tier 1 (3-5 especialistas), keywords de routing, qualidade.
3. `agents/<nome>-chief.md` — orquestrador (triagem, roteamento, gate). + **3-5 especialistas** `agents/<esp>.md` (cada um com escopo, ferramentas, formato de saída — pode ser conciso).
4. `.claude/skills/` — **3-5 skills-âncora** (SKILL.md PT-BR, frontmatter SDO) dos clusters do domínio + `catalogo.md`.
5. `MEMORY.md` — esqueleto (Padrões Ativos / Candidatos / Arquivado).

## Regras
- **PT-BR, kebab-case.** Nome mitológico já definido (vem no prompt). Personas agnósticas de modelo (Art. V).
- **Sem cópia literal** — princípio reescrito; atribuição (alirezarezvani/claude-skills@4a3c05b MIT; knowledge-work-plugins@78d74d5 Apache-2.0) no rodapé das skills.
- **Credenciais via Infisical** (nunca texto puro). **Sem web, sem código executado, sem commit.**
- É SEMENTE: marque no README `status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)`.

## Retorno (PT-BR)
```
squad: <Nome>
dominio: <domínio>
agentes: <n> (chief + especialistas — nomes)
skills: <n> (nomes)
arquivos_criados: <n>
nota: <1 linha>
```
