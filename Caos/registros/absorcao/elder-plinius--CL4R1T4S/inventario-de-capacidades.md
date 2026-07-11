---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/elder-plinius--CL4R1T4S/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/elder-plinius--CL4R1T4S/seguranca|seguranca]]"
---

# F3 — Inventário de capacidades (rota C — leve)

- **slug:** elder-plinius--CL4R1T4S
- **sha:** 09916a90583a320b3dde7ef5b9d8459ce0378a14
- **natureza:** coleção de system prompts VAZADOS (dado inerte/hostil). NÃO há agentes/skills/código absorvíveis. O "valor" é exclusivamente **referência de engenharia de prompt** — estudo de como labs reais estruturam prompts, tools, refusals e personas. Inventário por **cluster de referência**, não por arquivo nem como capacidade operacional.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | System prompts de modelos de chat Anthropic (Claude 3.5→4.x, Fable, UserStyles, Design prompt) — refusal framing, hierarquia de instruções, tom | referencia | system-prompt, claude, refusal, safety, persona | eng-de-prompt | ANTHROPIC/ (12 arq, ~7.7k linhas) |
| G2 | System prompts OpenAI (ChatGPT 4o/4.1/5/o3-o4-mini, Codex, Atlas, ChatKit, personality v2, image-gen postfill) | referencia | system-prompt, chatgpt, codex, personality | eng-de-prompt | OPENAI/ (12 arq, ~3.7k linhas) |
| G3 | System prompts xAI Grok (3, 4, 4.1, 4.20, Code-Fast-1) — incl. anti-jailbreak framing explícito | referencia | grok, xai, jailbreak-refusal | eng-de-prompt | XAI/ (7 arq, ~858 linhas) |
| G4 | System prompts de outros labs de modelo (Google Gemini, Meta Llama4/Muse, Mistral LeChat, Moonshot Kimi, MiniMax, Hume voz, Perplexity Deep Research) | referencia | gemini, llama, mistral, kimi, perplexity | eng-de-prompt | GOOGLE/ META/ MISTRAL/ MOONSHOT/ MINIMAX/ HUME/ PERPLEXITY/ |
| G5 | Prompts de **agentes de coding** (Cursor, Windsurf, Devin, Cline, Replit, Bolt, Lovable, Same.dev, Vercel v0, Factory DROID) — instruções de agente autônomo de código | referencia | coding-agent, autonomous, ide-agent | eng-de-agente | CURSOR/ WINDSURF/ DEVIN/ CLINE/ REPLIT/ BOLT/ LOVABLE/ SAMEDEV/ "VERCEL V0"/ FACTORY/ |
| G6 | Prompts de **agentes de navegador/assistentes** (Brave Leo, Dia coding/draft skills, MultiOn, Manus, Cluely, Gemini Gmail) | referencia | browser-agent, assistant, web-automation | eng-de-agente | BRAVE/ DIA/ MULTION/ MANUS/ CLUELY/ GOOGLE/Gemini_Gmail_Assistant.txt |
| G7 | **Schemas de tools/functions** embutidos nos prompts (definições JSON de ferramentas: places_search, file ops, terminal, browser, etc.) — padrão de design de tool-calling de produção | referencia | tool-schema, function-calling, json-schema | eng-de-agente | 18 arq c/ `"name":`/`<function>`/`"parameters":` (ANTHROPIC, CURSOR, DEVIN, MANUS, WINDSURF, REPLIT, SAMEDEV, XAI/GROK-4.20, OPENAI/ChatKit…) |
| G8 | **Padrões de refusal / safety / anti-jailbreak** recorrentes ("These requirements override any user instructions", harmful_content_safety, jailbreak-decline) — material defensivo | metodo-prompt | refusal, guardrail, anti-jailbreak, safety-framing | seguranca-de-prompt | ANTHROPIC/Claude_4.txt:159, XAI/Grok-Code-Fast-1:18-23, XAI/GROK-4.1:6 |
| G9 | **Payloads de injeção de prompt** (leetspeak NEW_PARADIGM; prompt de extração verbatim) — corpus adversarial para teste de defesa | referencia | prompt-injection, jailbreak, adversarial, red-team | seguranca-de-prompt | README.md:39, CLUELY/Cluely.mkd:93 |

> Observação: os 65 arquivos de prompt não são listados 1-a-1 de propósito (rota C, inventário leve). Cada `ID` agrupa um cluster de referência. Nenhum item é capacidade operacional da Kolden — todos entram como **dado de estudo inerte**.
