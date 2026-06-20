# Kolden — Manifesto para Agentes de IA

> **Você é um agente de IA operando dentro da Kolden.** Responda em **português (BR)**.
> Este arquivo é o **índice/entrypoint** do workspace. Ele aponta os caminhos — **abra os arquivos citados** com suas ferramentas (`read_file`, `search_files`, `terminal`) **antes de responder**. Não invente; consulte a fonte. Carregue só o que precisar (progressive disclosure).

## O que é a Kolden
Operação do **Ronan**. A descrição oficial (modelo de negócio, mercado, marca) está em construção em `sobre-a-empresa/` — **um squad de pesquisa vai definir e preencher**. Enquanto estiver `status: rascunho`, **não afirme** detalhes de negócio: diga que está em definição.

## Mapa do workspace (`C:\Kolden\`)

### 🧠 sobre-a-empresa/ — o "cérebro" da empresa (em construção)
Índice da pasta: `sobre-a-empresa/leia-me.md` · registro: `sobre-a-empresa/indice.yaml`
- `identidade/` — visão-geral, missão-visão-valores, história, organograma
- `areas/` — organização por departamento (visão lógica): cada área tem carta, funções, **elenco** (agentes/pessoas) e KPIs. Agentes não são movidos — ver `areas/leia-me.md`.
- `mercado-e-posicionamento/` — ICP e personas, ofertas, posicionamento, concorrência
- `marca/` — voz e tom, mensagens-chave, identidade visual
- `operacao/` — processos/SOPs, métricas e OKRs
- `glossario.md` · `faq.md`

### 📁 Projetos/ — produtos e iniciativas
Novos projetos seguem o template `Projetos/_modelo-projeto/` (leia-me, prd, arquitetura, decisoes, status).

### 🤖 Agentes e infraestrutura (pastas que existem)
- `Caos/` — fábrica de agentes de IA (ritual de criação). Leia `Caos/CLAUDE.md`, `Caos/constituicao.md`, `Caos/glossario.md`.
- `Hermes/` — runtime que executa os assistentes (gateway WhatsApp, OpenRouter, Infisical).
- `Ferramentas/` — catálogo de tools/APIs/MCPs: `Ferramentas/ferramentas.md`, `Ferramentas/mcp-status.md`. Credenciais só no **Infisical**.

### 🏛️ Squads (equipes de agentes) — nomes da mitologia grega
Cada squad é uma pasta top-level com `README.md` (o que faz + tabela de agentes), `agents/`, `tasks/`, `workflows/`, `checklists/`. Importados e traduzidos (PT-BR) dos arsenais validados `xquads-squads` e `aiox-core`. Status: `importado-cru` (refino pelo Ritual do Caos é dívida da fase 2). **Abra o `README.md` de cada um para ver o que cada agente faz.**

**📣 Marketing**
- `Peitho/` — **Tráfego Pago** (16 agentes: Pedro Sobral, Kasim Aslam, Ralph Burns, Molly Pittman... + pixel/CAPI, escala, criativos). Unifica o PRD preexistente do Peitho.
- `Caliope/` — **Copywriting** (copy-chief + lendas: Halbert, Ogilvy, Schwartz, Hopkins...) + módulo avançado `copy-master/` (33 copywriters: Kennedy, Kern, Sabri Suby, Chris Voss...).
- `Aglaia/` — **Branding / Brandbook** (15: David Aaker, Marty Neumeier, Al Ries, Byron Sharp, Donald Miller/StoryBrand...).
- `Harmonia/` — **UX/UI e Web** (8: Brad Frost/Atomic Design, Dan Mall, DesignOps, UI engineer, gerador visual).
- `Orfeu/` — **Storytelling / Narrativa** (12: Joseph Campbell, Blake Snyder, Oren Klaff, Nancy Duarte...).

**🧭 Estratégia & Negócios**
- `Olimpo/` — **C-Level / Executivos** (6: CEO/visão, COO, CMO, CTO, CIO, CAIO).
- `Themis/` — **Conselho Estratégico** (11: Ray Dalio, Charlie Munger, Naval, Peter Thiel, Simon Sinek...).
- `Metis/` — **Analytics & Growth** (7: Avinash Kaushik, Sean Ellis, Peter Fader, customer success/comunidade).
- `Pluto/` — **Negócios & Escala** (16: framework Alex Hormozi — ofertas, leads, preço, fechamento, escala).
- `Dionisio/` — **Movimentos & Comunidade** (7: arquitetura de movimento, identidade, manifesto, impacto).

**🛠️ Engenharia & Segurança**
- `Prometeu/` — **Engenharia de Software** (framework aiox-core: 12 agentes — Orion, Atlas, Aria, Dex, Gage, Morgan, Pax, Quinn, River, Uma... ciclo PRD→story→dev→QA→deploy). *Tradução em andamento.*
- `Dedalo/` — **Domínio do Claude Code** (8: hooks, MCP, skills, subagents, config, CI/CD).
- `Egide/` — **Cybersecurity / Segurança** (15: pentest, AppSec, blue team, OSINT, resposta a incidente).

## Regras de ouro
1. **Consulte a fonte.** Pergunta sobre a empresa/projeto → abra o arquivo correspondente e responda com base nele. Se o doc estiver em branco/`rascunho`, diga que ainda não foi definido.
2. **PT-BR + kebab-case** em qualquer arquivo novo (convenção do Caos / Constituição Art. II).
3. **Nunca exponha segredos** (.env, chaves). Credenciais vivem no Infisical.
4. **Confirme antes de alterar/criar** arquivos ou rodar comandos que mudam algo.
5. **Seja direto** (muitas respostas saem por WhatsApp).
