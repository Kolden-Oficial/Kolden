---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
---

# Hermes Agent — Dissecação técnica + Blueprint de replicação

> **O que é este documento.** Uma dissecação arquivo-a-arquivo do **Hermes Agent** (Nous Research), o runtime de agente vendorizado em `C:\Kolden\Hermes`, e a destilação dos princípios que o tornam único num **padrão de replicação** aplicável aos agentes da Kolden (Caos, squads, Olimpo, Hermes-chief).
>
> **Método.** Toda afirmação técnica está ancorada em código lido diretamente (`arquivo:linha`). Onde a fonte é a documentação interna do projeto, está marcado. Análise 100% local — nenhuma pesquisa web.
>
> **Data:** 2026-06-27 · **Versão do Hermes inspecionada:** 0.16.x · **Licença:** MIT (Nous Research).

---

## Sumário executivo — por que o Hermes é único

O Hermes não é "um wrapper de LLM com ferramentas". Três decisões de engenharia o separam de um chatbot comum, e elas se reforçam mutuamente:

1. **O core é uma "cintura estreita" (narrow waist); a capacidade vive nas bordas.** O laço do agente é minúsculo e estável; toda capacidade nova entra como *skill, plugin, MCP ou comando CLP* — quase nunca como código do core. Isso mantém o agente barato (cada tool do core é enviada em **toda** chamada de API) e auditável.
2. **O cache de prompt por conversa é sagrado.** O system prompt é montado **uma vez por sessão** e reproduzido byte-a-byte em todo turno. Nada muta o contexto passado no meio da conversa (única exceção: compressão). Isso corta o custo de tokens em ordens de grandeza em conversas longas — e força uma disciplina arquitetural que permeia o código inteiro.
3. **Há um laço de aprendizado fechado (closed learning loop) em três camadas.** O agente cria skills a partir da experiência, corrige-as durante o uso e mantém a coleção quando ocioso — sem intervenção humana. É o único diferencial que o próprio README declara como exclusivo ("the only agent with a built-in learning loop").

Tudo o mais (multi-provider sem lock-in, ~20 plataformas de mensageria, delegação, cron, segurança) é **consequência** desses três princípios aplicados com rigor de produção. A reputação no GitHub vem menos de qualquer feature isolada e mais da **densidade de invariantes** que o projeto sustenta: alternância de papéis, estabilidade do cache, contratos de comportamento, validação E2E real.

---

# PARTE I — Dossiê técnico (como funciona por dentro)

## 1. Identidade e proposta de valor

O Hermes se descreve no `README.md:18` como **"The self-improving AI agent built by Nous Research... the only agent with a built-in learning loop"**. A proposta declarada (tabela em `README.md:22-30`):

- **Roda onde você está**: CLI + TUI + gateway de mensageria (Telegram, Discord, Slack, WhatsApp, Signal...) de um único processo.
- **Laço de aprendizado fechado**: memória curada pelo agente, criação autônoma de skills, skills que se auto-melhoram, busca de sessões via FTS5 com sumarização por LLM, modelagem do usuário via Honcho.
- **Roda em qualquer lugar**: seis backends de terminal (local, Docker, SSH, Singularity, Modal, Daytona) — Modal/Daytona hibernam quando ociosos.
- **Model-agnostic**: qualquer modelo (Nous Portal 300+, OpenRouter 200+, NVIDIA NIM, MiniMax, Kimi, OpenAI, endpoint próprio) — troca com `hermes model`, "no code changes, no lock-in".

A "alma" padrão do agente é uma única string declarativa (`agent/prompt_builder.py:123`, `DEFAULT_AGENT_IDENTITY`):

```
You are Hermes Agent, an intelligent AI assistant created by Nous Research.
You are helpful, knowledgeable, and direct... prioritize being genuinely
useful over being verbose... Be targeted and efficient in your exploration
and investigations.
```

Customizável por usuário via `SOUL.md` (carregado como identidade primária quando presente — `agent/system_prompt.py:104-112`).

> **Nota Kolden:** o `README.md:225-231` do checkout local já foi customizado com o bloco **"Ritual de Encerramento"** — auto-aprendizado obrigatório por agente. Ver Parte II §3.

## 2. Anatomia do core — a classe `AIAgent` e o laço

**A fachada.** `AIAgent` (`run_agent.py`) é a classe central, com `__init__` de ~60 parâmetros (credenciais, roteamento, callbacks, contexto de sessão, budget, pool de credenciais — documentado em `AGENTS.md:305-329`). Dois pontos de entrada:

- `AIAgent.chat(message) -> str` — interface simples.
- `AIAgent.run_conversation(...)` (`run_agent.py:5227`) — interface completa, **um thin forwarder** que delega à implementação real.

**A implementação.** O laço de verdade é uma função extraída de ~3.900 linhas em `agent/conversation_loop.py:469` (`run_conversation`). O docstring é explícito (`agent/conversation_loop.py:1-10`): *"This is the biggest single chunk pulled out of run_agent.py... `run_agent.AIAgent.run_conversation` is now a thin forwarder."* Reconciliação importante: ambas as localizações existem — a classe expõe a fachada, a lógica vive no módulo.

**Estrutura do laço** (`agent/conversation_loop.py`):

```
run_conversation(agent, user_message, ...):
  # PRÓLOGO — build_turn_context() faz todo o setup once-per-turn:
  #   sanitização da mensagem, restore-or-build do system prompt,
  #   compressão preflight, hook pre_llm_call, prefetch de memória externa.
  _ctx = build_turn_context(...)            # linha 508

  while (api_call_count < agent.max_iterations
         and agent.iteration_budget.remaining > 0)
         or agent._budget_grace_call:        # linha 563
      if agent._interrupt_requested: break    # 568 — usuário mandou nova msg
      agent.iteration_budget.consume()        # 584 — budget de iterações
      # ... drena /steer pendente, monta api_messages ...
      # CHAMADA AO MODELO (streaming-preferido, com retry/fallback)  # ~1119
      response = run_llm_execution_middleware(api_kwargs, _perform_api_call, ...)
      # ... parsing de finish_reason, retries de truncamento ...
      if assistant_message.tool_calls:        # 3712
          # valida nomes (repara hallucinations), valida JSON dos args,
          # cap delegate_task, deduplica
          agent._execute_tool_calls(...)      # 3944 — executa e anexa resultados
          continue
      else:
          final_response = ...                # resposta final → sai do laço
  return finalize_turn(...)                   # 4440 — EPÍLOGO (ver §5)
```

Detalhes que revelam o nível de robustez de produção:

- **Limites duros**: `max_iterations=90` por turno (`AGENTS.md:317`), mais um `iteration_budget` consumível com uma "grace call" final (`agent/conversation_loop.py:563,582`).
- **Reparo de hallucination de tool**: nomes de tool inválidos são auto-reparados; após 3 falhas, devolve erro ao modelo para auto-correção em vez de quebrar (`3722-3769`).
- **Reparo de JSON dos argumentos**: args truncados são detectados (não terminam em `}`/`]`) e a execução é recusada; JSON malformado vira tool-result de erro para o modelo se recuperar, preservando a alternância de papéis (`3773-3861`).
- **Refund de iteração para `execute_code`**: quando o único tool chamado é `execute_code` (chamada RPC programática), a iteração é reembolsada — chamadas de "custo-zero de contexto" não consomem budget (`3982-3987`). Esta é a base do "collapsing multi-step pipelines into zero-context-cost turns" do README.
- **Steering ao vivo**: um `/steer` que chega enquanto o modelo pensa é injetado no próximo tool-result (nunca numa mensagem de usuário, que quebraria a alternância) — `624-673`.

## 3. O system prompt em 3 tiers (a disciplina do cache)

O arquivo `agent/system_prompt.py:1-20` documenta a regra que governa quase todo o design: *"The agent's system prompt is built once per session and reused across all turns — only context compression triggers a rebuild. This keeps the upstream prefix cache warm."* O prompt é montado em três camadas, unidas por `\n\n` (`build_system_prompt_parts`, `agent/system_prompt.py:63`):

| Tier | Conteúdo | Cadência |
|------|----------|----------|
| **STABLE** | identidade (SOUL.md ou `DEFAULT_AGENT_IDENTITY`), guidance de tools, computer-use, enforcement de uso de tool + guidance por família de modelo, prompt de skills, hints de ambiente e de plataforma | montado 1×/sessão, **cacheado** |
| **CONTEXT** | `system_message` do chamador + arquivos de contexto (AGENTS.md, .cursorrules) descobertos sob `TERMINAL_CWD` | 1×/sessão |
| **VOLATILE** | snapshot de memória, perfil USER.md, bloco de memória externa, linha de timestamp/sessão/modelo | reconstruído por turno, mas **só a data** (não o minuto) para estabilidade de cache |

O ponto crucial: o tier VOLATILE **não** entra no prefixo cacheado. Contexto efêmero (prefetch de memória, hints de plugin) é injetado na **mensagem de usuário** do turno, nunca no system prompt — comentário explícito em `agent/conversation_loop.py:757-771`: *"the system prompt is built ONCE per session... and replayed verbatim on every turn. We send it as a single content string so the bytes are byte-stable across turns and upstream prompt caches stay warm."*

As **guidances são injetadas condicionalmente** conforme a tool está carregada (`agent/system_prompt.py:127-130`): `MEMORY_GUIDANCE` só entra se `"memory" in agent.valid_tool_names`, etc. Isso evita instruir o modelo sobre capacidades que ele não tem — e mantém o prompt enxuto.

Essas guidances são o "comportamento" do agente codificado como texto. A mais reveladora, `MEMORY_GUIDANCE` (`agent/prompt_builder.py:144-165`), instrui o modelo a:
- Salvar **fatos declarativos, não imperativos**: *"'User prefers concise responses' ✓ — 'Always respond concisely' ✗"*. Phrasing imperativo é relido como diretiva em sessões futuras e causa retrabalho.
- **Não** salvar artefatos voláteis: *"do not record PR numbers, issue numbers, commit SHAs... If a fact will be stale in a week, it does not belong in memory."*
- Separar memória (fatos) de skills (procedimentos).

## 4. Tools e toolsets — a "cintura estreita" concretizada

**Registry auto-descoberto.** Cada arquivo `tools/*.py` chama `registry.register()` no nível de módulo (`tools/registry.py:1-15`). A descoberta usa **parsing AST** (`discover_builtin_tools`, `tools/registry.py:57`): só importa módulos que têm uma chamada `registry.register(...)` no corpo de nível superior (`_module_registers_tools`, `tools/registry.py:42-54`) — não há lista de imports para manter. Um `ToolEntry` (`tools/registry.py:77`) carrega `schema`, `handler`, `check_fn` (gating de disponibilidade) e `requires_env`.

**A lista curada.** `_HERMES_CORE_TOOLS` em `toolsets.py:31` é o "narrow waist" tornado concreto — a lista (~40 tools) que todo bundle de plataforma herda: `web_search`, `terminal`, `read_file`/`write_file`/`patch`/`search_files`, `skills_list`/`skill_view`/`skill_manage`, browser (~12 tools), `memory`, `todo`, `session_search`, `execute_code`, `delegate_task`, `cronjob`. Tools **service-gated** (kanban, Home Assistant) estão na lista mas só aparecem no schema quando o `check_fn` passa (env var presente) — `toolsets.py:62-70`.

**A regra de ouro.** `AGENTS.md:24-27` e a *Footprint Ladder* (`AGENTS.md:171-200`): *"Every model tool we add is sent on every API call, so the bar for a new core tool is high."* Adicionar uma core tool requer mudança em 2 arquivos (`tools/your_tool.py` + entrada em `toolsets.py`) e é o **último recurso** numa escada de 6 degraus (ver Parte II §1).

## 5. O closed learning loop — três camadas de auto-melhoria

Este é o coração do diferencial. Funciona em três cadências:

**Camada 1 — durante o turno (nudge no prompt).** A `SKILLS_GUIDANCE` (`agent/prompt_builder.py:173-180`) instrui: *"After completing a complex task (5+ tool calls)... save the approach as a skill with skill_manage... When using a skill and finding it outdated... patch it immediately — don't wait to be asked."* Reforçado por um contador: `_skill_nudge_interval = 10` (`agent/agent_init.py:1207`) — a cada 10 iterações de tool sem usar `skill_manage`, o agente é cutucado (`agent/conversation_loop.py:618-622`).

**Camada 2 — pós-turno (background review forkado).** Após o turno, `run_conversation` pode disparar `spawn_background_review` (`agent/background_review.py:1-16`): uma **thread daemon** replica um snapshot da conversa num `AIAgent` forkado e pergunta a si mesmo *"alguma skill/memória deveria ser salva ou atualizada?"*. Pontos de design notáveis:
- O fork **herda o runtime do pai** (provider, modelo, prompt cacheado) → bate no mesmo prefix cache e usa a mesma auth.
- Roda com **whitelist de tools limitada a memory + skill**; todo o resto é negado em runtime.
- A conversa principal e o cache **nunca são tocados**.

O `_SKILL_REVIEW_PROMPT` (`agent/background_review.py:45-120`) não é trivial — é uma filosofia inteira de curadoria de biblioteca de skills: prefira skills **class-level** (umbrellas ricas com `references/`, não uma lista plana de skills-de-uma-sessão); **embuta preferências do usuário na skill, não só na memória**; ao corrigir, **faça patch na skill que estava carregada primeiro**; skills bundled/hub são protegidas. O `_MEMORY_REVIEW_PROMPT` (`background_review.py:34-43`) foca em persona/preferências do usuário.

**Camada 3 — ociosidade (curator).** `agent/curator.py:1-20` é um orquestrador de manutenção acionado por **inatividade** (sem daemon de cron): quando o agente está ocioso e a última execução foi há mais de `interval_hours` (default 7 dias), um `AIAgent` forkado revisa as skills criadas-pelo-agente — pin/archive/consolidate. Invariantes estritas: *"Only touches agent-created skills... Never auto-deletes — only archives... Pinned skills bypass all auto-transitions... never touches the main session's prompt cache."*

Em resumo: **o agente aprende durante o trabalho, reflete depois do trabalho, e faz faxina quando descansa** — sem humano no laço.

## 6. Memória e persistência

- **SessionDB** (`hermes_state.py`, ~4.800 linhas): store de sessões em SQLite com **busca full-text FTS5** (`AGENTS.md:226`). É o que alimenta o `session_search` (recall cross-sessão com sumarização por LLM — `SESSION_SEARCH_GUIDANCE`, `agent/prompt_builder.py:167-171`).
- **MEMORY.md / USER.md**: memória declarativa persistente + perfil do usuário, injetados no tier VOLATILE.
- **Memory providers plugáveis** (`AGENTS.md:750-784`): ABC `MemoryProvider` (`agent/memory_provider.py`) orquestrada por `agent/memory_manager.py`; backends built-in (honcho, mem0, supermemory, byterover...). Política de maio/2026: o conjunto in-tree está **fechado** — novos backends são plugins standalone.
- **Checkpoints**: snapshots de rollback por turno (`agent/conversation_loop.py:565`, `_checkpoint_mgr.new_turn()`).
- **Profiles**: múltiplas instâncias isoladas, cada uma com seu `HERMES_HOME` (`AGENTS.md:1128-1183`). `get_hermes_home()` resolve o caminho do perfil ativo — hardcodar `~/.hermes` quebra perfis.

## 7. Multi-provider sem lock-in

`providers/base.py:38` define `ProviderProfile`, um dataclass **declarativo**: *"A ProviderProfile declares everything about an inference provider in one place: auth, endpoints, client quirks... The transport reads this instead of receiving 20+ boolean flags. Profiles are DECLARATIVE — they do NOT own client construction, credential rotation, or streaming."* Campos: `name`, `api_mode` (`chat_completions` | `anthropic_messages` | `codex_responses`...), `aliases`, `env_vars`, `base_url`, `auth_type` (`api_key` | `oauth_device_code` | `copilot` | `aws_sdk`).

Cada provider é um **plugin** (`plugins/model-providers/<nome>/__init__.py`) que chama `register_provider(ProviderProfile(...))` no load (`AGENTS.md:786-809`). A descoberta é lazy e **last-writer-wins**: um plugin de usuário com o mesmo nome sobrescreve o built-in sem patch no repo. Trocar de provider/modelo é `hermes model <provider:model>` — sem mudança de código. O laço suporta **fallback chains** e rotação de pool de credenciais em tempo de execução (`agent/conversation_loop.py:942`, `_try_activate_fallback`).

## 8. Multi-plataforma (gateway)

`gateway/platforms/base.py:1-20` define `BasePlatformAdapter`, uma **ABC** com `@abstractmethod`. Todos os adaptadores (Telegram, Discord, WhatsApp, Weixin, Slack, Signal, Matrix, Email, SMS, Feishu, WeCom, QQ...) herdam dela e implementam a interface comum (`connect`, `send`, `send_typing`, `send_image`, `get_chat_info`). O gateway roda **o mesmo core de agente** em todas as plataformas, de um único processo (`AGENTS.md:9-14`).

Adicionar uma plataforma é, preferencialmente, um **plugin** (`~/.hermes/plugins/platforms/<nome>/`), não código do core (`AGENTS.md:234-237` + `gateway/platforms/ADDING_A_PLATFORM.md`). O cron entrega resultados a qualquer plataforma (`cron/`, `AGENTS.md:1021-1053`), com interrupção dura de 3 minutos para impedir que loops monopolizem o scheduler.

## 9. Segurança (hardening de produção)

`tools/approval.py:1-9` é a **fonte única de verdade** para comandos perigosos: detecção por padrão (`DANGEROUS_PATTERNS`), estado de aprovação por sessão (thread-safe), prompting (CLI interativo + gateway assíncrono), **smart approval via LLM auxiliar** (auto-aprova comandos de baixo risco) e allowlist permanente.

Detalhe de hardening que ilustra o rigor: o **YOLO mode é congelado no import** (`tools/approval.py:26-29`): *"Reading os.environ on every call would allow any skill running inside the process to set this variable and instantly bypass all approval checks — a prompt-injection escalation path."* A identidade de sessão usa `contextvars` por turno/tool-call (`tools/approval.py:35-46`) porque o gateway roda turnos concorrentes em threads executoras — ler env global seria racy.

Camadas adicionais: `tools/threat_patterns.py` (detecção de injeção de prompt em arquivos de contexto e tool-results), guardrails de tool (`agent/tool_guardrails.py` → halt controlado, `agent/conversation_loop.py:3946`), e a **política de pinning de dependências** (`AGENTS.md:548-567`): todo pacote tem teto de versão, Git URLs por SHA — estabelecida após o comprometimento do litellm e reforçada após o worm Shai-Hulud.

## 10. Delegação e paralelismo

`tools/delegate_tool.py` (`delegate_task`, `AGENTS.md:954-983`) gera subagentes com contexto + sessão de terminal isolados. Dois formatos: **single** (`goal`) e **batch paralelo** (`tasks: [...]`, concorrência limitada por `delegation.max_concurrent_children`, default 3). Dois papéis:
- `role="leaf"` (default) — worker focado; **não** pode chamar `delegate_task`, `clarify`, `memory`, `send_message`, `execute_code`.
- `role="orchestrator"` — retém `delegate_task` para gerar seus próprios workers (profundidade limitada por `delegation.max_spawn_depth`, default 2).

É **síncrono** (o pai espera o resumo do filho; interromper o pai cancela o filho). Para trabalho durável que ultrapassa o turno, usa-se `cronjob` ou `terminal(background=True)`. Em escala, o **Kanban** (`AGENTS.md:1057-1094`) é um quadro durável em SQLite onde múltiplos perfis/workers colaboram, com um dispatcher que reclama tarefas travadas e auto-bloqueia após N falhas.

---

# PARTE II — Blueprint de replicação (o padrão, aplicável à Kolden)

Cada eixo abaixo segue o formato: **(a) o princípio do Hermes → (b) por que torna o agente único/robusto → (c) como aplicar na Kolden.**

## 1. Narrow waist + Footprint Ladder

**(a)** O core do agente é mínimo e estável. Capacidade nova entra pela borda, na **menor pegada possível**, seguindo uma escada de 6 degraus (`AGENTS.md:171-200`): 1. estender código existente → 2. comando CLI + skill → 3. tool service-gated (`check_fn`) → 4. plugin → 5. MCP server no catálogo → 6. nova core tool (último recurso).

**(b)** Cada tool do core é paga em **toda** chamada de API e dilui a atenção do modelo. Manter o core estreito mantém o agente barato, rápido de raciocinar e auditável. "Expansivos na borda, conservadores na cintura."

**(c) Kolden:** o Caos já tem o análogo exato — **REUSE > ADAPT > CREATE** via registro de entidades. Tornar isso uma *Footprint Ladder* explícita para o Caos: antes de criar um agente/skill novo, percorrer os degraus (existe agente que cobre? dá para estender uma skill? precisa mesmo de entidade nova?). Aplicar a mesma régua ao catálogo de ferramentas (`sobre-a-empresa/Ferramentas/`): MCP/skill antes de novo agente; novo squad é o último recurso.

## 2. Prompt caching como invariante sagrada

**(a)** O system prompt é montado 1×/sessão e reproduzido byte-a-byte. Nada muta contexto passado no meio da conversa. Contexto efêmero vai na mensagem de usuário, não no system prompt. Tier VOLATILE usa só a data (não o minuto).

**(b)** Em conversas longas, isso corta custo de tokens drasticamente e dá **determinismo**: o mesmo prefixo todo turno significa comportamento estável e KV-cache reaproveitado até em inferência local.

**(c) Kolden:** ao montar system prompts de squad/agente, separar **estável** (papel, ferramentas, convenções — cacheável) de **volátil** (estado da missão, contrato, timestamp). O Contrato de Missão (`Olimpo/contratos/`) deve ser injetado como **mensagem**, não embutido num system prompt reconstruído a cada passo. Regra operacional: *se um agente reescreve seu próprio prompt-base no meio da execução, está quebrando o cache e o determinismo — refatore para injetar como contexto de turno.*

## 3. Closed learning loop (o diferencial central)

**(a)** Três camadas: nudge no prompt durante o turno (salvar skill após 5+ tool calls) → review forkado pós-turno (thread daemon, whitelist memory+skill, herda o cache) → curator ocioso (mantém a coleção, nunca deleta). Memória = fatos declarativos; skills = procedimentos class-level.

**(b)** É o que faz o agente **melhorar com o uso** sem humano no laço. A distinção declarativo-vs-imperativo evita que memória vire diretiva tóxica; a curadoria class-level evita uma biblioteca de skills inutilizável.

**(c) Kolden:** o **Ritual de Encerramento** já é a *camada 2 em versão manual/hook* — todo agente reflete e grava lições no `MEMORY.md` ao fim da sessão. Portar o que falta:
- **Camada 1 (nudge ativo):** instruir agentes a salvar uma skill/lição após tarefas complexas, não só no encerramento.
- **Camada 3 (curator):** um agente Kolden ocioso (candidato natural: o **Caos/curador**, que já governa o "RH dos agentes") que consolida memórias duplicadas, arquiva o obsoleto e promove lições recorrentes a skills — **nunca deletando**, só arquivando.
- Adotar a regra do `MEMORY_GUIDANCE` ao pé da letra: *fatos declarativos, sem artefatos que expiram em 7 dias* — é exatamente a política que o sistema de memória da Kolden já tenta seguir; tornar explícita nos prompts dos agentes.

## 4. Separação core/edges via plugins + skills + MCP

**(a)** Plugins (model-providers, platforms, memory) e skills são descobertos em runtime; plugins **não podem tocar arquivos do core** (`AGENTS.md:768-773`). Skills têm padrão rígido de autoria (frontmatter, `description` ≤60 chars, seções na ordem moderna, scripts em `scripts/`, testes — `AGENTS.md:853-931`).

**(b)** A capacidade cresce sem inchar nem desestabilizar o core. O padrão rígido de skills mantém a biblioteca legível e o modelo focado.

**(c) Kolden:** formalizar o contrato de skill/plugin no Caos (já há 13 skills internas). Adotar o limite de `description` e a estrutura de seções padronizada para as skills da Kolden. O catálogo de ferramentas (`mcp-status.md`) é o análogo do "MCP catalog" — manter como o degrau preferido antes de codar capacidade nova no agente.

## 5. Multi-provider / multi-plataforma agnóstico

**(a)** `ProviderProfile` declarativo + descoberta last-writer-wins; `BasePlatformAdapter` ABC. Troca de modelo sem código; mesmo core em ~20 plataformas; fallback chains + rotação de credenciais.

**(b)** Zero lock-in de vendor e resiliência: se um provider cai ou estoura rate limit, o laço migra para o próximo automaticamente.

**(c) Kolden:** **alinhamento direto com o princípio fundador** — soberania de dados e vendor-agnóstico (CLAUDE.md). O padrão `ProviderProfile` é o molde para abstrair os LLMs que a Kolden testa lado a lado (LobeHub já faz isso na infra). Os gateways do Hermes (WhatsApp/Telegram via Infisical) já são a camada de mensageria da Kolden — manter a abstração de adaptador ao adicionar canais.

## 6. Contratos de comportamento > snapshots; E2E real; hardening

**(a)** Testes asseguram **invariantes** (como dois dados se relacionam), não snapshots de valores que mudam (`AGENTS.md:1322-1369`: "Don't write change-detector tests"). Validação E2E com imports reais contra `HERMES_HOME` temporário, não mocks verdes. Hardening: YOLO congelado no import, pinning de dependências por SHA, threat patterns.

**(b)** É isto — mais que qualquer feature — que sustenta a confiabilidade e a nota alta no GitHub: o projeto **muda muito** (providers/modelos/plataformas entram toda semana) sem quebrar, porque os testes capturam contratos, não fotos.

**(c) Kolden:** ao construir/verificar agentes, a **Dike** (verificador solo) deve reconciliar contra o **contrato** (o lacre do Contrato de Missão), não contra um snapshot da saída — exatamente o espírito "behavior contracts over snapshots". Adotar a régua: *toda mudança que toca cadeia de resolução, propagação de config ou fronteira de segurança precisa de prova E2E real, não relatório de subagente* (que ecoa o feedback Kolden "verificar por GREP, não por relatório de agente").

## 7. Checklist do "padrão de replicação"

Para construir/avaliar um agente production-grade no molde Hermes, garanta:

| # | Invariante | Pergunta de verificação |
|---|-----------|-------------------------|
| 1 | **Core estreito** | Toda capacidade nova entra pelo degrau mais alto da Footprint Ladder? Uma core tool nova é mesmo inevitável? |
| 2 | **Cache sagrado** | O prompt-base é estável por sessão? Contexto volátil é injetado como mensagem, não no system prompt? |
| 3 | **Alternância de papéis** | Nunca há duas mensagens do mesmo papel em sequência? Steers/contexto efêmero entram em tool-results, não em mensagens de usuário sintéticas? |
| 4 | **Learning loop** | O agente salva skills/lições durante E depois do trabalho? Há um curador ocioso que mantém a coleção sem deletar? |
| 5 | **Memória declarativa** | Fatos, não imperativos? Nada que expira em 7 dias (PRs, SHAs, "fase N done")? |
| 6 | **Tool gating** | Tools que exigem credencial/contexto só aparecem quando disponíveis (`check_fn`)? |
| 7 | **Segurança** | Comandos perigosos passam por aprovação? Vias de escalonamento por injeção (env vars lidas em runtime) estão congeladas no import? |
| 8 | **Agnosticismo** | Trocar de provider/modelo é config, não código? Há fallback quando um provider cai? |
| 9 | **Delegação limitada** | Subagentes têm papel (leaf/orchestrator), profundidade e concorrência limitadas? Trabalho durável usa cron/background, não delegação síncrona? |
| 10 | **Contratos > snapshots** | A verificação checa invariantes contra o contrato, com prova E2E real — não um relatório de agente nem um snapshot frágil? |

---

## Apêndice — mapa de arquivos-âncora (para releitura)

| Tema | Arquivo:linha | O que contém |
|------|---------------|--------------|
| Filosofia do projeto | `Hermes/AGENTS.md:16-27`, `171-200` | Narrow waist, cache sagrado, Footprint Ladder |
| Proposta de valor | `Hermes/README.md:18-30` | Diferenciais declarados |
| Laço do agente | `Hermes/agent/conversation_loop.py:469`, `563`, `3712`, `3944`, `4440` | Setup, while, tool dispatch, execução, epílogo |
| Fachada | `Hermes/run_agent.py:5227` | `AIAgent.run_conversation` (thin forwarder) |
| Persona | `Hermes/agent/prompt_builder.py:123` | `DEFAULT_AGENT_IDENTITY` |
| 3 tiers de prompt | `Hermes/agent/system_prompt.py:1-20`, `63` | STABLE/CONTEXT/VOLATILE + invariante |
| Guidances | `Hermes/agent/prompt_builder.py:144-180` | MEMORY/SESSION_SEARCH/SKILLS guidance |
| Registry de tools | `Hermes/tools/registry.py:42-74` | Auto-descoberta por AST + `ToolEntry` |
| Tools do core | `Hermes/toolsets.py:31-70` | `_HERMES_CORE_TOOLS` (a cintura) |
| Learning loop ↓ | | |
| · review pós-turno | `Hermes/agent/background_review.py:1-120` | Fork daemon + `_SKILL_REVIEW_PROMPT` |
| · curator ocioso | `Hermes/agent/curator.py:1-20` | Manutenção da coleção, invariantes |
| · nudge | `Hermes/agent/agent_init.py:1207` | `_skill_nudge_interval=10` |
| Providers | `Hermes/providers/base.py:38` | `ProviderProfile` declarativo |
| Plataformas | `Hermes/gateway/platforms/base.py:1-20` | `BasePlatformAdapter` (ABC) |
| Segurança | `Hermes/tools/approval.py:1-46` | Aprovação + YOLO congelado no import |
| Delegação | `Hermes/AGENTS.md:954-983` | `delegate_task` leaf/orchestrator |
