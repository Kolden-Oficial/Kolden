---
id: paradigma-autogen
nome: "AutoGen — Multi-Agent Conversation Framework"
titulo: "Framework Microsoft Research que popularizou multi-agent como *conversas* entre 'conversable agents' com programação em linguagem natural + code — modelo alternativo à orquestração explícita"
tipo: paradigma
dominio: [foundation-models, multi-agent, conversation-based, microsoft-research, group-chat]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2023
autores_seminais: ["Qingyun Wu", "Gagan Bansal", "Jieyu Zhang", "Yiran Wu", "Beibin Li", "Erkang Zhu", "Li Jiang", "Xiaoyun Zhang", "Shaokun Zhang", "Jiale Liu", "Ahmed Awadallah", "Ryen W. White", "Doug Burger", "Chi Wang"]
obra_seminal:
  titulo: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation Framework"
  ano: 2023
  arxiv: "2308.08155"
  data_release: "16 de agosto de 2023"
  conferencia: "ICLR 2024 workshop"
  repo_referencia: "github.com/microsoft/autogen"
  empresa: "Microsoft Research (AI Frontiers)"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paradigma-react, paradigma-autogpt, paradigma-langchain, marvin-minsky]
influenciou: [paradigma-crewai, magentic-one-microsoft-2024, autogen-studio]
paradigmas_relacionados: [paradigma-crewai, paradigma-langgraph]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
---

# AutoGen — Paradigma "Multi-Agent Conversation" — Dossiê

## 1. Tese central (uma frase)
Multi-agent orchestration não precisa ser modelada como grafo dirigido (LangGraph) nem como crew role-based (CrewAI) — pode ser modelada como *conversa entre agents com papéis distintos* (Assistant, UserProxy, GroupChatManager) que trocam mensagens em linguagem natural + código executável, tomando decisões por resposta à mensagem anterior + prompt engineering + código gerado em tempo real; a "conversation programming" torna orquestração inspecionável (é diálogo) mas exige LLMs capazes de manter coerência em turnos longos e falha silenciosamente quando um agent perde thread — proposta acadêmica Microsoft Research (agosto 2023) que se tornou framework industrial (v0.4 em outubro 2024, redesign completo para produção).

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **ReAct (Yao 2022)** — direta: cada agent AutoGen é ReAct-loop internamente.
  - **AutoGPT (Torantulino mar/2023)** — direta paralela: autonomia é herdada.
  - **LangChain (Chase out/2022)** — direta: paralelismo competitivo; AutoGen surge ~10 meses depois com foco em conversation vs chains.
  - **Marvin Minsky (Onda 2 — Society of Mind 1986)** — direta (linhagem conceitual): agents cognitivos em sociedade que negociam é raiz teórica declarada em várias palestras dos autores.
  - **Chat-based UI paradigm (ChatGPT nov/2022)** — indireta: conversa como interface universal informa que agent também deve conversar.
- **Autores seminais (Microsoft Research + Penn State + UW, 2023):**
  - **Qingyun Wu** — primeiro autor; Penn State Assistant Professor; ex-Microsoft Research intern.
  - **Chi Wang** — Microsoft Research (Redmond); principal researcher; primeiro maintainer OSS.
  - **Ahmed Awadallah** — Microsoft Research Manager (Cognitive Services).
  - **Gagan Bansal, Jieyu Zhang, Yiran Wu, Beibin Li, Erkang Zhu, Li Jiang, Xiaoyun Zhang, Shaokun Zhang, Jiale Liu** — co-authors researchers Microsoft + universidades parceiras.
- **Transmitiu a:**
  - **Magentic-One (Microsoft outubro 2024)** — direta: multi-agent orchestrator para tasks complexas end-to-end (web navigation, file manipulation, coding). Sucessor arquitetural.
  - **AutoGen Studio** — direta: IDE visual para editar agents + conversation.
  - **CrewAI (2023-2024)** — direta paralela: absorveu vocabulário de conversation.
  - **LangGraph multi-agent patterns (2024)** — direta: supervisor + swarm patterns têm origem em AutoGen designs.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 8 (framework acadêmico-industrial de multi-agent); irmão de CrewAI (competitivo) e LangGraph (alternativa).

## 3. Engenharia documentada

```yaml
mental_models:
  conversable_agents:
    descricao: "Abstração central: agent é objeto que *envia e recebe mensagens*. Classes principais: (1) *ConversableAgent* — base; (2) *AssistantAgent* — LLM que responde queries; (3) *UserProxyAgent* — simula usuário humano (pode executar código, aprovar/rejeitar); (4) *GroupChatManager* — orquestra rodadas de fala entre múltiplos agents. Cada agent tem método `send`, `receive`, `generate_reply`, `initiate_chat`."
    estrutura: [send-receive-generate_reply, ConversableAgent-base, AssistantAgent, UserProxyAgent, GroupChatManager]
    fonte: "AutoGen paper §3 (arXiv 2308.08155); microsoft.github.io/autogen"
    ano: 2023
  user_proxy_agent_como_executor:
    descricao: "UserProxyAgent é abstração distintiva do AutoGen: representa *usuário humano* dentro da conversa, mas pode: (a) *auto-reply* (não pede humano real); (b) *human input mode* (ALWAYS / TERMINATE / NEVER — controla quando pede humano); (c) *execute code* (roda Python/shell gerado por Assistant). Torna 'humano-em-loop' e 'code execution' facetas do mesmo objeto — pattern controverso mas influente."
    estrutura: [auto-reply, human-input-mode, code-execution-integrada, humano-e-code-exec-no-mesmo-objeto]
    fonte: "AutoGen paper §3.2"
    ano: 2023
  group_chat_com_manager:
    descricao: "GroupChat: lista de agents + max_rounds + speaker_selection_method ('auto' via LLM, 'round_robin', 'random', 'manual'). GroupChatManager escolhe quem fala próximo. 'auto' usa LLM para decidir — natural mas caro + suscetível a decisões erráticas. Round-robin robusto para tarefas simples."
    estrutura: [GroupChat-lista-de-agents, max-rounds, speaker-selection-methods, auto-cara-mas-flexivel]
    fonte: "AutoGen paper §4 + docs"
    ano: 2023
  conversation_programming:
    descricao: "Termo dos autores (paper §3.1): 'combining computation with conversation'. Programa AutoGen consiste de: (a) *definição de agents* (roles, system prompts, tools); (b) *conversation patterns* (initiate_chat, nested chats, sequential chats). Programa se escreve mais como configuração declarativa + prompt engineering que como código imperativo tradicional."
    estrutura: [computation-com-conversation, agent-definitions, conversation-patterns, declarativo-plus-prompts]
    fonte: "AutoGen paper §3.1"
    ano: 2023
  code_execution_em_sandbox:
    descricao: "UserProxyAgent pode executar código Python/shell gerado por Assistant em sandbox (Docker preferencial, local fallback). Padrão: Assistant escreve código → UserProxy executa → resultado volta para Assistant → itera. Habilita tasks complexas (data analysis, code debugging) sem external tool orchestration. Risco: Docker recomendado por safety."
    estrutura: [Docker-sandbox, Python-shell-code-execution, Assistant-escreve-UserProxy-executa, iteracao-code-refinement]
    fonte: "AutoGen paper §5 + docs § Code Execution"
    ano: 2023
  autogen_v0_4_redesign_2024:
    descricao: "Outubro 2024: AutoGen v0.4 rewrite completo. Nova arquitetura layer-by-layer (Core, AgentChat, Extensions). Core: primitives para runtime de agent + message passing async. AgentChat: reimplementação das classes conversable. Extensions: LangChain integration, tools, model clients. Adota patterns modernos (async native, type-safe, distributed). Nem toda API v0.2 migra automaticamente."
    estrutura: [v0.4-outubro-2024, Core-AgentChat-Extensions, async-nativo, type-safe, distributed, breaking-changes]
    fonte: "AutoGen v0.4 announcement blog + microsoft.github.io/autogen"
    ano: 2024
  magentic_one_como_evolucao:
    descricao: "Magentic-One (Microsoft outubro 2024): 'generalist agent' que combina AutoGen v0.4 com 5 agents especializados (Orchestrator, WebSurfer, FileSurfer, Coder, ComputerTerminal). Foco em tasks end-to-end complex (autonomous computer use). Marca virada para 'agentic' produto além de framework."
    estrutura: [Orchestrator, WebSurfer, FileSurfer, Coder, ComputerTerminal, generalist-agent, end-to-end-complex]
    fonte: "Microsoft Blog 'Magentic-One' announcement outubro 2024"
    ano: 2024
```

## 4. Mito e folclore

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "AutoGen é a mesma coisa que Copilot." | REFUTADO | AutoGen é framework de pesquisa/produção para multi-agent; Copilot é produto assistente. Ambos Microsoft mas escopos distintos. |
| "AutoGen substituiu AutoGPT." | DISPUTADO | AutoGen ofereceu framework robusto onde AutoGPT era hack. Não "substituiu" porque coexistem; AutoGPT continua evoluindo (Significant Gravitas). |
| "GroupChat 'auto' speaker selection funciona magicamente." | REFUTADO | Speaker selection por LLM é frequentemente errática (repete o mesmo agent, ignora contexto). Requer prompt engineering cuidadoso ou uso de round_robin. |
| "AutoGen v0.4 é retrocompatível com v0.2." | REFUTADO | Rewrite completo; migração exige refactoring. Docs oficiais alertam. |
| "AutoGen usa apenas OpenAI." | REFUTADO | Suporta OpenAI, Anthropic, Google, Ollama, HuggingFace, Azure OpenAI. Model-agnostic. |
| "Magentic-One é AGI." | REFUTADO | É agent generalist para tasks específicas; longe de AGI. Marketing exagera; papers técnicos são cuidados. |
| "AutoGen tem 100k+ stars." | DISPUTADO | ~30k-50k stars em 2026 (verificar exato). Não maior que LangChain principal. |
| "Conversation programming substitui programação tradicional." | REFUTADO | Complementa; nunca substitui. Debate ativo sobre trade-offs. |

## 5. O que este paradigma REJEITARIA
- **Multi-agent modelado como grafo explícito.** Prefere conversation-first.
- **UserProxy sem code execution capability.** Integração é veto arquitetural.
- **Ausência de human input mode.** HITL controlado é primeiro-classe.
- **Speaker selection sem opção manual.** Flexibility em orquestração.
- **Sandbox opcional para code execution.** Docker recomendado por safety.
- **Prompts como strings soltas sem system messages.** Estrutura declarativa.

## 6. Vocabulário-assinatura
| Termo | Contexto / Obra |
|---|---|
| "ConversableAgent" | AutoGen classe base. |
| "AssistantAgent" | LLM-based. |
| "UserProxyAgent" | proxy humano + code exec. |
| "GroupChatManager" | orquestrador. |
| "conversation programming" | paper §3.1 termo. |
| "initiate_chat" | método principal. |
| "human_input_mode" (ALWAYS/TERMINATE/NEVER) | UserProxy config. |
| "speaker_selection_method" | GroupChat config. |
| "Magentic-One" | produto derivado 2024. |
| "Core / AgentChat / Extensions" | v0.4 layers. |

## 7. Gancho de operacionalização Kolden
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "conversation como interface universal" — agents Kolden podem se comunicar por mensagens em linguagem natural; passo "UserProxy padrão para HITL + code exec" — Ronan como proxy quando aprovação; passo "GroupChat para squads deliberativos" — múltiplos agents Kolden votam; passo "sandbox Docker obrigatório para code exec" — safety veto; passo "async native primitives" — v0.4 pattern para escala).
- **Squads que consomem:** Caos (Ritual pode montar GroupChat para decisões de fabricação), Prometeu (arquitetura de inferência com AssistantAgents), Dedalo (multi-agent com GroupChat), Olimpo (governança executiva com HITL UserProxy).
- **Pergunta operacional:** "Este agent Kolden pode participar de GroupChat com outros agents Kolden E ser interrompido por UserProxy do Ronan em ponto crítico? Se não, é agent isolado — não crew member conversacional."

## 8. Como o paradigma AutoGen opera
1. **Definir Assistants** com system_message + LLM config.
2. **Definir UserProxyAgent** com human_input_mode + code_execution_config.
3. **Se multi-agent, montar GroupChat** com lista + max_rounds + speaker_selection.
4. **Se avançado, GroupChatManager** com LLM próprio.
5. **initiate_chat** com mensagem inicial.
6. **Cada agent responde** conforme role + estado da conversa.
7. **UserProxy executa código** gerado em Docker sandbox.
8. **Human input** solicitado conforme mode.
9. **Loop continua** até TERMINATE ou max_rounds.
10. **Trajetória de mensagens** persistida para audit + eval.

---
*Dossiê de PARADIGMA. Indexado com `tipo: paradigma`.*
