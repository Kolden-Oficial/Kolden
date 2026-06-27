# Recomendações de melhoria pontual — skills de criação do Caos

> Saída da aplicação F6 (bucket **Caos-fábrica**). Estas são **anotações cirúrgicas**, não
> reescritas. O guia manda NÃO reescrever skills existentes sem necessidade; o valor desta leva
> são as 4 âncoras novas (`descoberta-de-skill`, `validacao-de-skill`, `topologias-de-time`,
> `qa-de-integracao-de-time`). Aqui ficam registrados os ajustes finos que o dono do Caos pode
> aplicar depois, sem bloquear nada.

## 1. SDO nas `description` das skills existentes (de `descoberta-de-skill`)
A nova âncora `descoberta-de-skill` estabelece a lei de ferro: **a `description` diz SÓ quando
usar, nunca resume o workflow**. Várias skills atuais do Caos misturam "o que faz" + "quando usar"
na description — funciona, mas é o anti-pattern que a fonte (superpowers) provou causar o agente a
seguir a description e pular o corpo. Candidatas a um ajuste cirúrgico **futuro** (mover o resumo
de processo para o corpo, deixar só o gatilho na description):
- `criacao-de-skill` — description hoje descreve frontmatter+corpo enxuto (processo). Sugerido:
  "Use durante a construção de um agente, ao transformar cada conhecimento modular do PRD numa
  habilidade em `.claude/skills/`."
- `criacao-de-subagent`, `criacao-de-hooks`, `criacao-de-mcp` — mesmo padrão; manter o gatilho de
  fase, tirar a descrição de mecânica interna.
- **Não aplicado nesta leva** por decisão de risco: a coluna "gatilho" do `catalogo.md` e o
  roteamento dependem dessas strings; mexer exige re-testar invocação (trigger eval da
  `validacao-de-skill`). Fica como tarefa de manutenção, não de absorção.

## 2. `criacao-de-skill` ← plugin-dev `skill-development` (anthropics G7)
Material oficial da Anthropic reforça o que `criacao-de-skill` já faz. Absorver como reforço:
- **Progressive disclosure** explícito (core enxuto + `references/` + `examples/` + `scripts/`) —
  já há o bloco G3; a referência oficial valida e pode virar exemplo canônico.
- Gatilhos fortes na description — agora coberto pela âncora `descoberta-de-skill` (cross-ref).
- Agente `skill-reviewer` (G16) proativo pós-criação → na Kolden é papel do especialista
  `revisor` (Fase 6); anotar que o checklist do revisor deve incluir o gate de SDO + trigger eval.

## 3. `criacao-de-hooks` ← plugin-dev `hook-development` (anthropics G8)
Enriquecer com a **matriz completa de eventos** da referência oficial: `PreToolUse`,
`PostToolUse`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`,
`PreCompact`, `Notification` + **hooks prompt-based** + variável `${CLAUDE_PLUGIN_ROOT}`. O
`criacao-de-hooks` atual cobre os principais; a matriz fecha lacunas (SessionEnd, PreCompact,
Notification). Recomendado: adicionar uma tabela de eventos no SKILL.md de `criacao-de-hooks`.

## 4. `criacao-de-subagent` ← plugin-dev `agent-development` (anthropics G11)
Absorver o padrão **description com exemplos de trigger** (vários `<example>` de quando o agente
deve disparar) e a distinção explícita **agente × comando**. Reforça a seleção de tipo+tools que o
`criacao-de-subagent` já trata. Cross-ref com a tabela de tipos (`general-purpose`/`Explore`/`Plan`/
custom) que entrou em `topologias-de-time/references/catalogo-de-topologias.md`.

## 5. `criacao-de-mcp` ← plugin-dev `mcp-integration` (anthropics G9)
Enriquecer com **tipos de servidor** (stdio/SSE/HTTP/WebSocket), `.mcp.json`, OAuth/auth e
**bundling em plugin**. O `criacao-de-mcp` atual encapsula o `mcp-builder` do Prometeu — a
referência oficial complementa com o empacotamento; manter Infisical como camada obrigatória.

## 6. Itens roteados a OUTROS squads (não Caos-fábrica) — só ponteiro
Vários IDs dos 4 dossiês têm alvo ≠ caos-fabrica e pertencem a outras ondas (não a esta leva):
- **superpowers** → prometeu (G1–G18: brainstorming, planos, TDD, debugging, code-review),
  dedalo (G5–G7, G17, G18, G23, G24).
- **harness** → dedalo (G32–G35: QA — **parcialmente absorvido aqui** como `qa-de-integracao-de-time`,
  por ser meta-QA de times que o Caos constrói), criacao-de-subagent (G14, G15).
- **gstack** → olimpo/prometeu/harmonia/egide/dedalo/aletheia/metis/argos (G1–G28, G31, etc.) +
  vendor inerte (browse/gbrain/bin) — ondas A2/A3.
- **anthropics** → harmonia (G1–G6: frontend-design), dedalo (G10, G12, G13, G17–G22:
  commands/packaging/settings/hookify).

Esses **não são perda** — estão no `relatorio-de-perda-caos.md` como ROTEADO-OUTRO-SQUAD.

## 7. Nota sobre o runtime de "time vivo" (harness G4/G23/G25)
`topologias-de-time` documenta o modo Agent Team (`TeamCreate`/`SendMessage`/`TaskCreate`) **com
gate de viabilidade**: o ambiente precisa expor essas ferramentas. Hoje o Caos opera em modo
Sub-agent (`Agent`/`run_in_background`). Mapear se o harness do Claude Code/Fleet expõe as
ferramentas de time **antes** de qualquer squad prometer coordenação lateral. Até lá, o default
permanece Sub-agent.
