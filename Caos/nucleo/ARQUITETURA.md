# KOLDEN — Runtime model-agnostic (via OpenRouter)

> **Status:** esboço de arquitetura (sem código ainda)
> **Data:** 2026-06-12
> **Stack escolhida:** Python 3.11+
> **Objetivo:** desamarrar o Caos do Claude Code, mantendo 100% do conteúdo
> (constituição, modelos, dados, skills, subagents) intacto e reimplementando
> apenas o *runtime* que os executa, sobre qualquer modelo via OpenRouter.

---

## 1. Princípio do desenho

O Caos tem duas metades:

- **Conteúdo** (já agnóstico de modelo): `constituicao.md`, `CLAUDE.md`,
  `modelos/`, `dados/`, e o *texto* das skills e subagents. Nada disso muda.
- **Runtime** (amarrado ao Claude Code): hooks, auto-invocação de skills,
  isolamento de subagents, slash commands, implementação das tools.

Esta arquitetura reescreve **só o runtime**. Regra de ouro: **nenhum arquivo de
conteúdo é modificado** — o núcleo apenas os *lê*. Se um dia o Caos voltar para o
Claude Code, o conteúdo continua valendo; só se troca quem o executa.

Alinhamento constitucional: o **Artigo V — "prompts agnósticos de modelo"** deixa
de ser aspiração e passa a ser executado de fato, com modelo diferente por fase.

---

## 2. Mapeamento: primitivo do Claude Code → equivalente portável

| Hoje (Claude Code)                                   | Versão model-agnostic                                            | O que "some" |
|------------------------------------------------------|------------------------------------------------------------------|--------------|
| `CLAUDE.md` auto-carregado como system prompt        | `nucleo/` injeta `CLAUDE.md` + `constituicao.md` como system base | nada — vira leitura |
| `.claude/skills/*` (auto-invoca por `description`)   | **Skill Router**: lê os `description`, o LLM decide qual injetar | a auto-invocação implícita |
| `.claude/agents/*` (contexto isolado, `tools:` restritas) | **sub-call** ao OpenRouter com message array novo + toolset filtrado | o isolamento nativo (recriado) |
| `.claude/commands/*` (`/caos`, `/vigia`, `/squad`)   | comandos de CLI (`kolden caos "..."`)                            | a UI de slash |
| `.claude/hooks/*.sh` (Pre/PostToolUse, SessionStart) | **middleware** no loop (`antes_da_tool` / `depois_da_tool` / `inicio_sessao`) | o gatilho automático |
| tools nativas `Read/Write/Grep/Glob/Bash/WebSearch`  | **registro de ferramentas** Python expostas via function-calling | a implementação nativa |
| MCPs (Exa, Hugging Face, Context7)                   | cliente MCP genérico **ou** chamada direta às APIs               | — |
| `/compact` (compactação de contexto)                 | `nucleo` resume o histórico quando passa de N tokens             | automático → explícito |

---

## 3. Estrutura de pastas

```
Kolden/
├── nucleo/                       ← NOVO: o runtime portável
│   ├── ARQUITETURA.md            ← este documento
│   ├── orquestrador.py           ← o loop agêntico (ReAct)
│   ├── openrouter.py             ← cliente da API (compat. OpenAI)
│   ├── ferramentas.py            ← registro de tools + schemas JSON
│   ├── skill_router.py           ← seleção de skills por description
│   ├── subagente.py              ← executa um subagent em contexto isolado
│   ├── middleware.py             ← hooks portados (guardrails + sessão + auditoria)
│   ├── ritual.py                 ← orquestra as 9 fases do Ritual de Criação
│   ├── contexto.py               ← carrega CLAUDE.md/constituicao + compactação
│   ├── roteamento_modelos.yaml   ← NOVO: fase → modelo OpenRouter
│   ├── config.yaml               ← chaves, defaults, limites
│   └── cli.py                    ← `kolden caos|vigia|squad ...`
│
├── constituicao.md   ┐
├── CLAUDE.md         │
├── modelos/          │  INTACTOS — lidos pelo runtime, nunca editados por ele
├── dados/            │
├── agentes/          │  (continuam sendo a saída do Ritual)
├── squads/           │
├── registros/        ┘
│
└── .claude/          ← permanece (compatibilidade dupla durante a migração)
```

---

## 4. O núcleo: loop agêntico (ReAct)

Todo recurso do Claude Code é açúcar sobre este loop. Pseudocódigo de referência
para `orquestrador.py`:

```python
def rodar_agente(system, mensagens, tools, fase):
    modelo = roteamento[fase]                       # fase → modelo certo
    while True:
        resp = openrouter.chat(
            model=modelo,
            messages=[{"role": "system", "content": system}] + mensagens,
            tools=[t.schema for t in tools],
        )
        msg = resp.choices[0].message
        mensagens.append(msg)
        if not msg.tool_calls:
            return msg.content                      # agente terminou
        for chamada in msg.tool_calls:
            middleware.antes(chamada)               # ← hook PreToolUse (pode vetar)
            resultado = tools[chamada.name](**chamada.args)
            middleware.depois(chamada, resultado)   # ← hook PostToolUse
            mensagens.append(tool_result(chamada, resultado))
```

Conceitos derivados deste único loop:

- **Subagent** = `rodar_agente()` chamado de novo, com `system` = o `.md` do
  subagent, `mensagens` zeradas e `tools` filtradas pela linha `tools:` do
  frontmatter. Isolamento de contexto sai de graça.
- **Skill** = bloco de texto injetado em `mensagens` quando o Skill Router decide
  que é relevante (não muda o loop, só o conteúdo).
- **Hook** = `middleware.antes/depois`, código Python rodando exatamente o que os
  `.sh` fazem hoje.

---

## 5. Os componentes, um a um

### 5.1 `openrouter.py` — cliente
- Usa a SDK da OpenAI apontada para `https://openrouter.ai/api/v1` (OpenRouter é
  drop-in compatível). Troca de modelo = trocar a string `model`.
- Trata: retries, timeout, fallback de modelo (se o primário falhar, cai no
  secundário definido no YAML), contagem de tokens e custo por chamada.
- Segredos (chave OpenRouter) **só via Infisical** (Constituição, Art. VII) —
  nunca em `config.yaml` em texto puro.

### 5.2 `ferramentas.py` — registro de tools
Cada tool = função Python + schema JSON (function-calling). Paridade mínima com o
Claude Code:

| Tool      | Implementação | Observação |
|-----------|---------------|------------|
| `Read`    | `open().read()` com offset/limit | idem |
| `Write`   | escrita de arquivo | passa pelo middleware pós-escrita |
| `Edit`    | replace exato | valida unicidade como o nativo |
| `Grep`    | wrapper de `ripgrep` | mesma saída |
| `Glob`    | `pathlib.glob` | |
| `Bash`    | `subprocess` | **sempre** passa pelo `middleware.antes` |
| `WebSearch`/`WebFetch` | API de busca (Exa/Perplexity/Tavily) | configurável |
| MCPs      | cliente MCP genérico ou REST direto | Exa, HF, Context7 |

### 5.3 `skill_router.py` — seleção de skills
Substitui a auto-invocação por `description`. Duas estratégias (do simples ao
robusto):
1. **Heurística (MVP):** carrega todos os `description` num índice; antes de cada
   fase, pede ao modelo "quais destas skills se aplicam?" e injeta as escolhidas.
2. **Embeddings (v2):** vetoriza os `description` (Supabase/Neon pgvector, já na
   stack) e seleciona por similaridade com a tarefa atual.

O *conteúdo* das skills (`SKILL.md`) é lido sem modificação.

### 5.4 `subagente.py` — contexto isolado
- Lê o `.md` do subagent em `.claude/agents/` (ou `agentes/<x>/subagents/`).
- Faz o parse do frontmatter: `name`, `description`, `tools:`.
- Monta um toolset **restrito** ao que a linha `tools:` permite e chama
  `rodar_agente()` com histórico limpo. Retorna só o resultado ao orquestrador
  pai — exatamente a semântica de subagent do Claude Code.

### 5.5 `middleware.py` — hooks portados (1:1)
Os 3 hooks atuais viram funções. Lógica idêntica à dos `.sh`:

| Hook hoje              | Vira | Guardrails portados |
|------------------------|------|---------------------|
| `pre-ferramenta.sh` (PreToolUse/Bash) | `antes(chamada)` | bloqueia `rm -rf /|~|$HOME`; `git push --force`; leitura direta de `.env` → exceção que veta a tool |
| `pos-escrita.sh` (PostToolUse/Write\|Edit) | `depois(chamada, res)` | auditoria/registro do que foi escrito |
| `inicio-sessao.sh` (SessionStart) | `inicio_sessao()` | banner "KOLDEN ATIVO — Caos pronto" + checagens |

`antes()` levanta exceção para vetar (equivalente ao `exit 2`); retorno normal
libera (equivalente ao `exit 0`).

### 5.6 `ritual.py` — as 9 fases
Orquestra o fluxo obrigatório do `CLAUDE.md`/`constituicao.md`, com os **gates**:
0. Consulta ao registro (REUSE>ADAPT>CREATE) → subagent `curador`
1. Diagnóstico (9 blocos, inclui pré-morte) → skill + `diagnosticador`
2. Pesquisa (estado da arte ao vivo) → `pesquisador`
3. Arquitetura (solo vs squad) → `arquiteto`
4. PRD de IA → skill `geracao-de-prd` → **gate: aprovação humana explícita**
5. Construção → skills de criação + `redator-de-prompts`
6. Revisão → `revisor` (de propósito num modelo ≠ do autor)
7. Teste de comportamento → `testador` → **gate: maturity score ≥ 7.0**
8. Entrega + registro → `curador`

Os gates 4 e 7 são pontos de parada obrigatórios (Constituição, Art. III).

### 5.7 `contexto.py`
- Carrega `CLAUDE.md` + `constituicao.md` como system base.
- Compactação: quando o histórico passa de N tokens, resume as fases já
  concluídas (substitui o `/compact`). O estado real vive nos arquivos, não na
  conversa — então resumir é seguro.

---

## 6. Roteamento por fase (o ganho central)

`nucleo/roteamento_modelos.yaml` (valores ilustrativos — ajustar por custo/qualidade):

```yaml
consulta_registro:  deepseek/deepseek-chat        # leitura barata
diagnostico:        anthropic/claude-sonnet-4-6    # boa conversa
pesquisa:           perplexity/sonar-reasoning     # web nativa
arquitetura:        anthropic/claude-opus-4-8      # decisão pesada
geracao_prd:        anthropic/claude-opus-4-8
construcao:         deepseek/deepseek-chat         # gerar arquivos, barato
revisao:            openai/gpt-5                   # 2ª opinião, viés diferente
teste:              google/gemini-2.5-pro
vigia:              perplexity/sonar-reasoning

# fallback global se o modelo da fase falhar
fallback:           anthropic/claude-sonnet-4-6
```

Dois ganhos que o Claude Code não dá hoje:
1. **Custo/qualidade por fase** — não paga modelo topo para gerar boilerplate.
2. **Revisão com viés diferente** — Fase 6 audita num modelo distinto do que
   construiu (Fase 5), reduzindo ponto cego.

---

## 7. UX

- Antes: abrir `claude` na pasta → `/caos gestor de tráfego`.
- Depois: `kolden caos "gestor de tráfego"` no terminal.
- `inicio-sessao.sh` → banner da CLI.
- Futuro opcional: o núcleo expõe HTTP e ganha UI web (LobeHub/Lovable da stack),
  sem reescrever o runtime.

---

## 8. Plano de migração incremental (sem big bang)

| Fase | Entrega | Critério de pronto |
|------|---------|--------------------|
| 1 | `orquestrador.py` + `openrouter.py` + `ferramentas.py` + `roteamento_modelos.yaml` | "hello agente" lê e escreve um arquivo |
| 2 | `middleware.py` com os 3 hooks portados | guardrails bloqueiam os mesmos casos dos `.sh` |
| 3 | `skill_router.py` + `subagente.py` | um subagent roda isolado com tools restritas |
| 4 | `cli.py` (`caos`/`vigia`/`squad`) + `ritual.py` | Ritual completo roda fim a fim |
| 5 | roteamento por fase + compactação | cada fase usa o modelo do YAML |

Durante toda a migração o `.claude/` continua funcional → roda-se as duas versões
em paralelo no mesmo pedido e compara-se a saída até confiar na portável.

---

## 9. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Function-calling varia entre modelos | normalizar no `openrouter.py`; testar a tool-loop com cada modelo do YAML antes de promovê-lo |
| Skill router pior que auto-invocação nativa | começar heurístico, medir; subir para embeddings se errar seleção |
| Perda dos guardrails de hook | portar 1:1 e cobrir com testes que reproduzem os casos dos `.sh` |
| Modelos sem `tools` confiável | manter `fallback` e marcar no YAML quais fases exigem modelo com tool-use forte |
| Custo descontrolado | `openrouter.py` soma custo por chamada e por Ritual; teto configurável em `config.yaml` |

---

## 10. O que NÃO muda

- `constituicao.md`, `CLAUDE.md`, todo `modelos/`, todo `dados/`.
- O *texto* de cada skill (`SKILL.md`) e de cada subagent (`.md`).
- A anatomia de um agente/squad gerado.
- O fluxo de 9 fases e seus gates.

Só muda **quem lê e executa** esse conteúdo.
```
