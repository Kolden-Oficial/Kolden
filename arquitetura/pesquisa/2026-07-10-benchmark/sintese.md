# Síntese — Fase 2 do Benchmarking de Arquitetura de Agents

> 2026-07-10 · Base: 12 fontes verificadas (matriz-comparativa.md; evidência em `fichas/`)
> Juízo feito no contexto principal da missão, não delegado.

## 1. Padrões CONVERGENTES (3+ fontes de peso fazem igual — consolidado da indústria)

**C1 — Agent declarativo = Markdown + frontmatter YAML mínimo.**
`name` + `description` obrigatórios; `tools` (allowlist), `model` opcionais; corpo = system prompt.
Fontes: Claude Code (formato oficial), wshobson (87 plugins, 37,8k★), VoltAgent (100+ agents, 23,2k★), spec agentskills.io (padrão aberto). CrewAI é o análogo YAML (`role/goal/backstory`). Onde a frota é declarativa, este formato é unânime.

**C2 — `description` é funcional, não documentação: é o critério de roteamento.**
ADK: "The model uses this to determine whether to delegate control to the agent" (docstring do campo). Claude Code: "Claude uses each subagent's description to decide when to delegate". smolagents: `assert all(agent.name and agent.description ...)` — sem description, sub-agent nem registra. OpenAI: `handoff_description`/`tool_description`. Consequência para o KoldenOS: `description` com gatilho ("Use quando…") é campo de ENGENHARIA, com regra de qualidade e limite de tamanho (spec skills: 1-1024 chars).

**C3 — Hierarquia estável = agent-as-tool (orquestrador permanece no topo); handoff = transferência par-a-par.**
OpenAI (`sub.as_tool()`), AutoGen MS (`AgentTool`/`TeamTool`), smolagents (`managed_agents` viram tools), LangGraph (direção oficial atual: handoff implementado como tool call), Claude Code (Agent tool). Para uma árvore de 5 camadas, o consolidado é orchestrator-worker com sub-agents como tools — o padrão validado em produção pela Anthropic (+90,2% vs single-agent no eval interno; custo ~15× tokens).

**C4 — Nome de agent/skill é validado por CÓDIGO, não por convenção de boa vontade.**
ADK: `isidentifier()` + `user` reservado + unicidade na árvore. CrewAI: regex de sanitização + rejeição de keywords Python. Spec skills: `a-z0-9-`, 1-64 chars, sem `--`, **igual ao nome do diretório**. Claude Code: lowercase+hífen. Lição direta: a regra de nomenclatura do KoldenOS precisa de regex documentado E validador mecânico.

**C5 — Máximo ~2 níveis de diretório para coleções declarativas; agrupamento por domínio/categoria.**
wshobson: `plugins/<domínio>/agents/<papel>.md`, "nunca mais de 2 níveis". VoltAgent: `categories/NN-<categoria>/<papel>.md`. anthropics/skills: `skills/<skill>/`. BMAD: `src/<módulo>/<fase>/<skill>/`. Árvores profundas não aparecem em nenhuma coleção de alta adoção.

**C6 — Skill = pasta com SKILL.md + progressive disclosure (3 níveis), agora padrão aberto.**
Anthropic (spec agentskills.io, dez/2025), BMAD v6 (SKILL.md é a unidade), wshobson (skills com `references/` e `assets/`, corpo ≤8 KB), CrewAI 1.x (adicionou `skills/` ao scaffold), ADK (pacote `skills/`). Metadata ~100 tokens sempre em contexto; corpo só ao ativar; auxiliares só quando necessários.

**C7 — Separação identidade (declarativa) × comportamento (código) × conhecimento (dados) × segredos (.env) × memória (infra).**
CrewAI (YAML / crew.py / knowledge/ / .env / memory=True), ADK (agent.py / prompt.py separado / .env), LangGraph (graph/state/tools/prompts/context + checkpoint/store), MetaGPT (roles/actions/prompts/tools/memory/environment). Nenhuma fonte mistura segredo com definição de agent.

**C8 — Catálogo central machine-readable com verificação mecânica em CI.**
LangGraph (`langgraph.json` — manifesto por path+símbolo), Claude Code (`plugin.json`/`marketplace.json`), BMAD (`bmad-modules.yaml` com canais stable|next, deprecated e aliases de migração), wshobson (3 gates em CI: validate/garden/test, 386 testes), VoltAgent (regra de tripla atualização de índice). **Aos ~250 agents, catálogo sem verificação mecânica não se sustenta — todas as coleções grandes automatizaram.**

**C9 — AGENTS.md na raiz como interface universal de instruções de repo.**
Presente nos repos da OpenAI, LangGraph, CrewAI (copiado para TODO projeto gerado), smolagents, ADK, wshobson (que faz `CLAUDE.md` = symlink → `AGENTS.md`). Spec com 60k+ repos, governança Linux Foundation. É a camada de interoperabilidade — não define frota, define o "manual de bordo" que qualquer runtime lê.

**C10 — Precedência por proximidade + escopo em cascata.**
AGENTS.md ("the closest wins"), Claude Code (managed → project → user → plugin, com tabelas de precedência documentadas), BMAD (config em cascata default → team → user com merge definido). Resolver conflito por REGRA ESCRITA, não por acaso.

## 2. Padrões DIVERGENTES (e qual lado ganha para ~250 agents hierárquicos)

**D1 — Agents como código vs agents declarativos.**
Código: OpenAI, LangGraph, AutoGen, smolagents, MetaGPT (são SDKs para construir produtos). Declarativo: Claude Code, CrewAI, wshobson, VoltAgent, BMAD (são frotas/coleções).
**Veredito: declarativo.** Nosso problema é o segundo (frota de ~250 personas operada por um harness), não o primeiro. Evidência adicional: a única tentativa de YAML declarativo num framework-código (ADK Agent Config) está simultaneamente experimental e deprecated — o mundo código ainda não estabilizou declaração; o mundo Markdown+frontmatter sim (C1). E o P4 do Método (Software 2.0: PRD é fonte-da-verdade) já aponta para cá.

**D2 — Agent como unidade central vs skill como unidade central.**
BMAD v6 (linhagem do nosso vendor AIOX) **abandonou agents**: persona embutida na skill, fase do SOP como diretório. wshobson, VoltAgent e Claude Code mantêm agents como cidadãos de 1ª classe, com skills como conhecimento procedural.
**Veredito: agent como unidade central, skills como conhecimento.** Motivos: (a) os gates G1-G8 do Método (constituição, ASL, uncertainty, off-switch) são atributos de UMA IDENTIDADE responsabilizável — dissolvê-la em skills quebra a governança; (b) a hierarquia executiva de 5 camadas pressupõe QUEM delega e QUEM responde; (c) o Claude Code roteia por agent (`description`). Mas a virada do BMAD é um aviso: skills precisam ser 1ª classe TAMBÉM (workflow completo pode ser uma skill), e a fronteira agent×skill deve ser escrita na spec.

**D3 — Hierarquia na árvore de diretórios vs hierarquia no registro.**
Na árvore: ADK (sub_agents/ aninhados espelham a árvore de agents), BMAD (fases numeradas), VoltAgent (categorias numeradas). No registro/metadados: wshobson (plugins flat por domínio; tiers no frontmatter), Claude Code (descoberta flat; identidade vem do `name`, "the subdirectory path doesn't affect how a subagent is identified").
**Veredito: híbrido com viés de árvore.** O requisito inviolável do KoldenOS ("quem abre o repo entende o organograma sem docs") pede camadas visíveis; a evidência de escala (wshobson: 87 domínios flat + registro) pede pouca profundidade e um catálogo mecânico. Solução: camadas = diretórios de topo (poucos e estáveis), squads flat dentro da camada operacional, hierarquia fina (tiers, rotas) no `squad.yaml` + registro central. Nunca aninhar squad dentro de squad.

**D4 — 1 agent = 1 arquivo .md vs N agents = 1 YAML.**
CrewAI concentra os agents do crew num `agents.yaml`; o ecossistema Claude Code faz 1 arquivo por agent.
**Veredito: 1 agent = 1 arquivo .md.** Personas Kolden são longas (herança histórica, frameworks, guardrails em PT-BR) — YAML multi-agent vira arquivo-monstro (o anti-exemplo interno já existe: `conversable_agent.py` de 219 KB no AG2 mostra o custo de concentrar; nossos `agents/*.md` de 33 agents da Caliope funcionam bem como arquivos). Frontmatter carrega o que é máquina; corpo carrega a persona.

**D5 — Adapters geram artefatos (build) vs runtime lê a fonte direto.**
wshobson: fonte única, artefatos por harness GERADOS e gitignorados (invariante formal). Claude Code puro: lê `.claude/` direto, sem build.
**Veredito: depende do custo de fricção — é exatamente a escolha entre as Propostas A e B (ver propostas.md).** O único repo de produção com spec neutra formalizada (wshobson) escolheu build; mas ele serve 6 harnesses hoje, e nós servimos 1 hoje e N amanhã.

## 3. Hype vs consolidado

**Consolidado (sobrevive):** Markdown+frontmatter como formato de agent declarativo (C1); progressive disclosure (C6); orchestrator-worker/agent-as-tool (C3); MCP como camada de tools (P12 do Método, confirmado em todas as fontes vivas); AGENTS.md (C9, Linux Foundation); kebab-case + validação mecânica (C4); catálogo verificado em CI (C8); segredos em .env (C7).

**Em transição (não ancorar spec nisso):** slash commands como formato próprio — **fundidos em skills no Claude Code; `.claude/commands/` é legado compatível** (impacto direto: nossa spec deve tratar command como caso particular de skill); lib langgraph-supervisor; ADK Agent Config YAML; crews declarativos em JSONC do CrewAI (novo demais, 1 release).

**Hype / morto:** Swarm (morto, aviso oficial); AutoGen 0.4 e AG2 clássico (manutenção — TUDO da linhagem GroupChat/ConversableAgent/OAI_CONFIG_LIST está em fim de linha; relevante porque nosso vendor AIOX descende do BMAD, não do AutoGen — mas a lição vale: linhagens morrem rápido); frameworks de orquestração pesados como diferencial — a fonte-mãe da Anthropic é explícita: "the most successful implementations weren't using complex frameworks (...) simple, composable patterns"; multi-agent como default — custa ~15× tokens e "most coding tasks involve fewer truly parallelizable tasks than research" (usar onde paraleliza de verdade).

## 4. O que NENHUM framework resolve bem (o espaço do diferencial Kolden)

**L1 — Governança de segurança POR AGENT.** Nenhuma das 12 fontes tem o equivalente aos gates G1-G8 (constituição por-agent, ASL declarado, uncertainty statement, off-switch testável). O máximo encontrado: allowlist de tools por perfil (VoltAgent), model tiers (wshobson), budget guard (MetaGPT `invest()`/`NoMoneyException` — único controle econômico de 1ª classe achado). Uma spec neutra COM campos de governança obrigatórios não existe no mercado.

**L2 — Verificação independente da entrega (papel Dike).** BMAD tem `checklist.md` por skill e review adversarial como skill; wshobson tem gates de CI sobre os ARTEFATOS. Ninguém tem verificador independente da MISSÃO (reconciliação contra intenção lacrada, TPND). O contrato de missão de 5 camadas assinadas do KoldenOS não tem análogo em nenhuma fonte.

**L3 — Memória organizacional em camadas com ritual.** Claude Code dá o mecanismo (`agent-memory/` por agent + CLAUDE.md hierárquico); nenhum framework define POLÍTICA de memória (o 3-way squad/chief/especialista + ritual de encerramento é nosso).

**L4 — Identidade organizacional real.** Todos os frameworks modelam papéis técnicos (developer, reviewer); nenhum modela uma EMPRESA (executivos com mandato, squads com fronteira, RH de agents). O MetaGPT chegou perto ("software company" SOP-driven) e é código, não spec.

**Implicação:** o diferencial da spec Kolden não é inventar formato — é adotar o formato consolidado (C1-C10) e ACRESCENTAR o plano de governança (G1-G8 + Dike + contrato + memória) como campos de 1ª classe da spec neutra. Nenhum framework mainstream tem isso; é o que um engenheiro sênior reconheceria como novo.

## 5. Riscos herdados a neutralizar (do nosso chão, à luz do benchmark)

1. Nosso `.claude/commands/` (Caos) já é formato legado no Claude Code → na spec, command = skill invocável (`/nome`), como o merge oficial fez.
2. Nosso vendor AIOX descende do BMAD v5 (agents .md); o BMAD v6 abandonou esse desenho → a Regra E1 (invólucro sobre mutação) fica ainda mais certa: vendor congelado é vendor congelado; a spec Kolden não deve herdar estrutura de vendor.
3. Os 3 layouts de agents + 4 esquemas de nome da vistoria v3 violam TODAS as convergências C1/C4/C5 — a spec resolve por definição, com validador mecânico (C8) para não regredir.
