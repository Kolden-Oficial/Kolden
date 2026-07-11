# Propostas de Arquitetura — Fase 2 (para decisão do Ronan)

> 2026-07-10 · Derivadas da matriz-comparativa.md e da sintese.md.
> As duas propostas compartilham as mesmas convenções e a mesma anatomia de squad; divergem em UM eixo: **como o Claude Code consome o core** (D5 da síntese — build vs espelho).

## 0. Invariantes comuns às duas propostas

1. **Spec neutra em `core/`** — todo artefato canônico é Markdown+frontmatter YAML ou YAML puro (C1 da síntese), LLM-agnóstico. Repo é o único master; Notion só documenta depois.
2. **Hierarquia visível na árvore de topo, squads planos dentro da camada** (veredito D3): camadas = diretórios numerados (evidência: VoltAgent `01-`–`10-`, BMAD `1-analysis`–`4-implementation`); squad nunca aninha squad; profundidade máx. dentro do squad = 2 níveis (C5, wshobson).
3. **1 artefato = 1 lugar**: agent mora em `agents/`, skill em `skills/<nome>/SKILL.md`, command É uma skill invocável (merge oficial do Claude Code — matriz D6), squad.yaml na raiz do squad. Zero duplicação no core.
4. **Nomenclatura com regex + validador mecânico** (C4/C8): kebab-case ASCII sem diacríticos; regex documentado; script de validação em CI/hook. Regra dura: nome no disco = nome no índice (mata a inconsistência #4 da vistoria: `Egide/`דÉgide").
5. **Governança como campos de 1ª classe da spec** (L1-L2): frontmatter do agent carrega os campos do Art. X (`asl`, `constituicao`, `incerteza`, `aspiracoes`, `scorecard`); Dike e o registro central verificam mecanicamente. É o diferencial que nenhum framework tem.
6. **Regra E1 preservada**: vendors (AIOX/xquads/Nous) ficam INTOCADOS onde estão; o core referencia o vendor, nunca o absorve. A migração dos 262 agents é fase 2 — fora deste escopo.
7. **Registro central da frota** (`core/registro.yaml`, análogo a `bmad-modules.yaml`/`marketplace.json`): camada, squad, chief, rotas do Hermes, contagens — gerado/verificado por script; o `Hermes/squads-catalog.yaml` passa a ser PROJEÇÃO dele (SSoT YAML + projeções, regra já validada na casa).
8. **AGENTS.md continua na raiz** como interface universal (C9), enxuto, apontando para o core (cap de tamanho — o wshobson usa ~150 linhas; a linha 33 de 1.900 palavras da vistoria V3-07 vira anti-padrão formal).

## Esqueleto comum do core (as duas propostas)

```
C:\Kolden\
├── AGENTS.md                          # interface universal, enxuta (C9)
├── METODO-KOLDEN.md                   # norma (inalterado)
├── arquitetura/                       # esta spec + pesquisa
├── core/                              # ← FONTE ÚNICA DA FROTA (spec neutra)
│   ├── registro.yaml                  # catálogo mecânico da frota (C8)
│   ├── 0-fundacao/                    # constituições globais, templates, regex de nomes
│   │   ├── templates/                 # gabaritos: agent.md, SKILL.md, squad.yaml
│   │   └── nomenclatura.md            # regex + regras (normativo)
│   ├── 1-hermes/                      # camada 2 — porteiro/dispatch
│   ├── 2-olimpo/                      # camadas 3-4 — Zeus + executivos
│   ├── 3-squads/                      # camada 5 — operacional, FLAT
│   │   └── <squad>/                   # anatomia padrão (abaixo)
│   └── 4-governanca/                  # dike, checklists, contratos (schema)
└── adapters/
    └── claude-code/                   # única parte que o Claude Code exige nativa
```

Anatomia padrão de squad (igual nas duas propostas):

```
core/3-squads/<squad>/
├── squad.yaml                 # manifesto: identidade, camada, tier_0, tier_1, rotas, vetos
├── agents/
│   ├── <squad>-chief.md       # tier 0 (sempre existe, sempre este nome)
│   └── <papel-ou-persona>.md  # tier 1+ — 1 agent = 1 arquivo (D4)
├── skills/
│   └── <nome-skill>/SKILL.md  # commands são skills invocáveis (D6)
├── conhecimento/              # dados/knowledge do squad (C7)
├── memoria/                   # MEMORY.md + agent-memory/ (Regra E4, 3-way)
└── verificacao/               # roteiro-de-teste, checklists Dike
```

---

## PROPOSTA A — "Compilador" (spec neutra estrita + artefatos gerados)

Modelo do único repo de produção com spec neutra formalizada: **wshobson/agents** (37,8k★) — "SOURCE OF TRUTH (87 local plugins)" + "Adapters own per-harness mechanics; source content stays portable" + artefatos por harness **gerados e não editáveis**.

**Mecânica:** `adapters/claude-code/` contém um gerador (script Python/Node) que lê `core/` e MATERIALIZA os artefatos nativos (`.claude/agents/*.md`, `.claude/skills/*/SKILL.md`, `settings.json`, `squads-catalog.yaml` do Hermes) nos paths que o runtime espera. Gerado é marcado (`# GERADO — NÃO EDITAR`) e idealmente gitignored. Editar só no core; regenerar via `make adaptar` + hook de verificação.

```
adapters/claude-code/
├── gerador/                   # transforma core → artefatos nativos
├── mapa.yaml                  # core-path → runtime-path (declarativo)
└── verificar.ps1|sh           # CI/hook: gerado está em sincronia com o core?
```

**Prós**
- Pureza máxima: core 100% portável; teste de portabilidade trivial (novo runtime = novo gerador, zero toque no core).
- Transformações reais possíveis (ex.: um futuro `adapters/crewai/` emitindo `agents.yaml`; frontmatter Kolden filtrado por runtime).
- Gerado nunca diverge silenciosamente: verificação mecânica na CI (C8).

**Contras / custos**
- Exige construir e manter um toolchain (gerador + mapa + verificador) ANTES de qualquer squad usar o padrão.
- Fricção diária: toda edição pede regeneração; esquecer = rodar com artefato velho (mitigável com hook, mas é uma peça a mais que pode falhar).
- Distância do chão atual: as sessões de squad hoje abrem em `C:\Kolden\<Squad>\` com `.claude/` local — o gerador precisa materializar POR SQUAD, não só na raiz, senão quebra o modo de operação vigente.

## PROPOSTA B — "Espelho fino" (o formato consolidado É a spec; adapter = projeção estrutural)

Fundamento: a convergência C1 mostra que **Markdown+frontmatter já é o formato neutro da indústria** (spec aberta agentskills.io; mesmo formato lido por Claude Code, wshobson serve 6 harnesses com ele, VoltAgent, BMAD). Então o core JÁ escreve nesse formato — e o adapter Claude Code não transforma conteúdo, apenas **projeta estrutura**: copia/espelha os arquivos do core para os paths `.claude/` esperados (ou cria stubs de 3 linhas que apontam para o core). Campos extras Kolden (asl, constituicao, procedencia) vivem no mesmo frontmatter — runtimes que não os entendem os ignoram (comportamento padrão de frontmatter).

**Mecânica:** um script de sincronização simples (sem transformação) + o mesmo `mapa.yaml` declarativo. Runtimes futuros que aceitem Markdown+frontmatter (a maioria: Cursor rules, opencode, Copilot...) ganham adapter igualmente fino; um runtime que exija formato radicalmente outro (CrewAI YAML) ganha um gerador de verdade — **só quando existir a demanda**, e a interface (mapa.yaml) já está pronta para isso.

**Prós**
- Fricção mínima e adoção imediata: dá para padronizar o primeiro squad no dia 1, sem toolchain.
- Migração incremental segura: squad a squad, sem big-bang; o chão atual continua operando.
- A neutralidade vem de padrão ABERTO (agentskills.io + frontmatter), não de tooling proprietário nosso — menos código para manter.

**Contras / custos**
- Pureza menor: o core "coincide" com o formato do runtime dominante; a prova de neutralidade é o formato aberto + o mapa, não uma transformação demonstrada.
- Risco de acomodação: sem a disciplina do gerador, alguém edita o espelho em vez do core (mitigação: espelho read-only por hook — a casa já tem reflexos PreToolUse para isso).
- Se um dia precisarmos de transformação pesada, pagamos o custo da Proposta A naquele momento (mas nunca antes).

## Trade-offs lado a lado

| Critério | A — Compilador | B — Espelho fino |
|---|---|---|
| Pureza/portabilidade demonstrada | Máxima (transformação real) | Alta (formato aberto + mapa) |
| Custo de implantação | Alto (toolchain primeiro) | Baixo (script de sync + hook) |
| Fricção diária | Média (regenerar sempre) | Mínima |
| Risco de divergência core×runtime | Baixo (CI trava) | Médio (mitigado por hook read-only) |
| Compatível com operação atual (sessões por squad) | Exige gerador por-squad | Natural |
| Evolução para N runtimes | Nativa | Sob demanda (upgrade p/ A por adapter) |
| Precedente de produção | wshobson/agents (único com spec neutra formal) | Claude Code + spec agentskills.io (padrão aberto) |

## Recomendação

**Proposta B agora, com a interface da A reservada.** Justificativa: (1) servimos 1 runtime hoje; o custo do compilador não se paga antes do segundo runtime real (princípio da fonte-mãe Anthropic: "start simple, add complexity only when it demonstrably improves outcomes"); (2) o `mapa.yaml` e a anatomia do core são IDÊNTICOS nas duas — B é um subconjunto executável de A, e a promoção B→A não refatora o core (o critério de aceite de portabilidade continua passando); (3) B permite começar a Fase 3 e o primeiro squad-exemplo imediatamente.

O que a decisão NÃO muda: esqueleto do core, anatomia de squad, regex de nomes, registro central, campos de governança, tratamento de vendors (E1), memória (E4). Tudo isso é comum e já está fundamentado na matriz.
