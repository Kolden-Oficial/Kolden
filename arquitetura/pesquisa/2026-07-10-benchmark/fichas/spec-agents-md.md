---
tipo: nota
area: arquitetura
up: "[[arquitetura/_MOC-arquitetura]]"
relacionado:
  - "[[arquitetura/pesquisa/2026-07-10-benchmark/fichas/_indice|_indice]]"
---

# Ficha — Spec aberta AGENTS.md

> Coletada em 2026-07-10 · Versão/commit da fonte: site https://agents.md (live) + repo `agentsmd/agents.md` @ commit `d1ac7f0` (2026-03-12, branch `main`) · Status: ativo

## 1. Estrutura de pastas real

A spec **não define estrutura de pastas** — define **um único arquivo**: `AGENTS.md` na raiz do repositório, opcionalmente replicado em subdiretórios de monorepos.

Texto oficial do site (https://agents.md):

> "Create an AGENTS.md file at the root of the repository."

> "Large monorepo? Use nested AGENTS.md files for subprojects — Place another AGENTS.md inside each package. Agents automatically read the nearest file in the directory tree, so the closest one takes precedence and every subproject can ship tailored instructions. For example, at time of writing the main OpenAI repo has 88 AGENTS.md files."

Árvore real do repo oficial (https://github.com/agentsmd/agents.md, commit `d1ac7f0`) — note que o repo é só o **site** da spec (Next.js) + o próprio AGENTS.md de dogfooding; não há schema, parser ou diretório de spec formal:

```
agents.md/
├── AGENTS.md            ← dogfooding (instruções para agents que editam o site)
├── README.md            ← exemplo mínimo + instruções do site
├── LICENSE              ← MIT
├── components/          ← site Next.js (ex.: CompatibilitySection.tsx)
├── pages/
├── public/              ← logos dos runtimes compatíveis
├── styles/
├── next.config.ts / tsconfig.json / package.json / pnpm-lock.yaml
```

**Adoção**: o site declara — "A simple, open format for guiding coding agents, used by over **60k open-source projects**" (link para a busca `path:AGENTS.md NOT is:fork NOT is:archived` no GitHub: https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code). Exemplos destacados na página: `openai/codex`, `apache/airflow`, `temporalio/sdk-java`, `PlutoLang/Pluto`.

## 2. Formato de definição de agent

**A spec não define agents — define instruções de repo para agents.** É Markdown livre, sem schema, sem frontmatter, sem campos obrigatórios. FAQ oficial (https://agents.md):

> "**Are there required fields?** No. AGENTS.md is just standard Markdown. Use any headings you like; the agent simply parses the text you provide."

Seções sugeridas (não obrigatórias), do site: "Project overview / Build and test commands / Code style guidelines / Testing instructions / Security considerations", mais "Commit messages or pull request guidelines, security gotchas, large datasets, deployment steps: anything you'd tell a new teammate belongs here too."

Exemplo canônico do README oficial (https://github.com/agentsmd/agents.md/blob/main/README.md) usa apenas headings Markdown comuns:

```markdown
# Sample AGENTS.md file
## Dev environment tips
## Testing instructions
## PR instructions
```

Efeito executável: FAQ — "**Will the agent run testing commands found in AGENTS.md automatically?** Yes—if you list them. The agent will attempt to execute relevant programmatic checks and fix failures before finishing the task."

## 3. Separação agent / tool-skill / orquestração / memória / config

**Fora do escopo da spec.** O texto oficial define o propósito como instruções de contexto para agents de codificação trabalharem *no projeto* — nada além disso:

> "Think of AGENTS.md as a **README for agents**: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project." (https://agents.md)

Não existe, em nenhuma parte do site ou do README do repo, definição de: registro de agents, tools/skills, orquestração entre agents, memória persistente ou arquivos de config estruturados. A única separação que a spec formaliza é **humano vs agent**:

> "README.md files are for humans: quick starts, project descriptions, and contribution guidelines. AGENTS.md complements this by containing the extra, sometimes detailed context coding agents need: build steps, tests, and conventions that might clutter a README or aren't relevant to human contributors." (https://agents.md)

**Mapeamento para runtimes proprietários** — o que as fontes oficiais documentam literalmente:

- Migração de nomes legados (FAQ): `mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md` — "Rename existing files to AGENTS.md and create symbolic links for backward compatibility."
- Aider (FAQ): "Configure Aider to use AGENTS.md in `.aider.conf.yml`: `read: AGENTS.md`".
- Gemini CLI (FAQ): "Configure Gemini CLI to use AGENTS.md in `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`".
- **CLAUDE.md e `.cursor/rules` NÃO são citados** nem no site nem no README do repo (verificado no texto integral de ambos em 2026-07-10). A compatibilidade com Cursor aparece apenas como logo/endosso na seção "One AGENTS.md works across many agents", com link para https://cursor.com/ — o mecanismo de mapeamento fica na documentação de cada runtime, fora da spec.

## 4. Convenções de nomenclatura

- Nome de arquivo fixo: `AGENTS.md` (plural, maiúsculas), na raiz e/ou por subprojeto. Fonte: https://agents.md ("Create an AGENTS.md file at the root of the repository").
- Predecessor reconhecido: `AGENT.md` (singular) — tratado como legado via symlink (FAQ de migração citado na §3).
- Dentro do arquivo, **nenhuma convenção de nomes é imposta**: "Use any headings you like" (FAQ, https://agents.md).
- Justificativa do nome neutro: "Rather than introducing another proprietary file, we chose a name and format that could work for anyone." (https://agents.md)

## 5. Hierarquia e delegação

A spec só define **hierarquia de precedência de instruções em monorepo** — não delegação entre agents:

> "**What if instructions conflict?** The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything." (FAQ, https://agents.md)

Ordem resultante: (1) prompt explícito do usuário no chat > (2) `AGENTS.md` mais próximo do arquivo editado > (3) `AGENTS.md` mais acima na árvore. Escala comprovada citada pela própria página: "the main OpenAI repo has 88 AGENTS.md files."

**Delegação/hierarquia multi-agente: fora do escopo da spec.** Nenhum trecho do site ou do README trata de agents chamando agents, squads, papéis ou camadas. **Ponto crítico para o KoldenOS**: AGENTS.md padroniza *instruções de repositório para agents de codificação* ("the context and instructions to help AI coding agents work on your project" — https://agents.md); ele não é, e não pretende ser, uma spec de arquitetura de sistemas multi-agente. Para o nosso desenho (5 camadas, ~250 agents), AGENTS.md serve como **camada de entrada/interoperabilidade** (o arquivo que qualquer runtime lê ao abrir o repo), não como formato de definição da frota.

## 6. Observações datadas

- **2025-08-19** — criação do repo `agentsmd/agents.md` (campo `created_at` da API do GitHub: `2025-08-19T17:22:54Z`).
- **2025-12-08 a 2025-12-11** — onda de commits: Windsurf adicionado à lista de compatíveis (`6f89c7e`), bump Next.js por CVE-2025-55182 (`13156b6`), atualização do contador/filtro de projetos GitHub (`eff6818`), e nota sobre a AAIF no About + footer (`40de070`, `975cfba`). Fonte: https://github.com/agentsmd/agents.md/commits/main
- **Governança (anunciada dez/2025 no site)**: "AGENTS.md is now stewarded by the **Agentic AI Foundation** (https://aaif.io/) under the Linux Foundation." Rodapé: "Copyright © AGENTS.md a Series of LF Projects, LLC". Origem declarada: "AGENTS.md emerged from collaborative efforts across the AI software development ecosystem, including **OpenAI Codex, Amp, Jules from Google, Cursor, and Factory**." (https://agents.md)
- **2026-03-10 a 2026-03-12** — últimos commits: Junie/JetBrains adicionado (`37f86ac`), Augment Code CLI adicionado (`906511e`), sintaxe nova do Gemini CLI (`342016e`), merge em `CompatibilitySection.tsx` (`d1ac7f0`). Repo segue vivo, mas o ritmo é de manutenção da lista de compatíveis — a spec em si está estável (o texto normativo cabe em 1 página).
- **Endossos listados na página em 2026-07-10** (seção "One AGENTS.md works across many agents"): Aider, RooCode, Augment Code, Devin (Cognition), Warp, Ona, Gemini CLI (Google), Jules (Google), Windsurf (Cognition), opencode, UiPath Autopilot & Coded Agents, goose (Block), GitHub Copilot coding agent, Codex (OpenAI), Cursor, Kilo Code, Amp, Junie (JetBrains), Phoenix, VS Code, Semgrep, Factory, Zed.
- **Tração em 2026-07-10** (API GitHub): 22.930 stars, 1.699 forks, 158 issues abertas, licença MIT, linguagem TypeScript (site), `pushed_at: 2026-03-12`.
- **Adoção**: "used by over 60k open-source projects" (https://agents.md, verificado em 2026-07-10; o número é atualizado pelo próprio site — commit `eff6818` de 2025-12-09, "Update count and filtering for projects on GitHub").

## 7. Fontes

1. Site oficial da spec — https://agents.md (texto integral coletado em 2026-07-10: pitch, "Why AGENTS.md?", lista de compatíveis, "How to use", About/AAIF, FAQ completa).
2. Repo oficial — https://github.com/agentsmd/agents.md (árvore da raiz @ `d1ac7f063d20e70015ed6732664049ae4ba9d74e`).
3. README do repo — https://github.com/agentsmd/agents.md/blob/main/README.md (SHA `8ce701e`; exemplo canônico de AGENTS.md).
4. AGENTS.md de dogfooding do repo — https://github.com/agentsmd/agents.md/blob/main/AGENTS.md (SHA `3cf929b`; exemplo real: regras de dev server/HMR, convenções, tabela de comandos).
5. Histórico de commits — https://github.com/agentsmd/agents.md/commits/main (commits citados na §6, de 2025-12-08 a 2026-03-12).
6. Metadados do repo via API GitHub (created_at, stars, forks, pushed_at) — https://api.github.com/repos/agentsmd/agents.md (consultado em 2026-07-10).
7. Busca de adoção referenciada pelo site — https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code
8. Agentic AI Foundation (steward, Linux Foundation) — https://aaif.io/ e anúncio https://openai.com/index/agentic-ai-foundation/
