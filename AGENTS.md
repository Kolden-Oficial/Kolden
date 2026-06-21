# Kolden — Manifesto para Agentes de IA

> **Você é um agente de IA operando dentro da Kolden.** Responda em **português (BR)**.
> Este arquivo é o **índice/entrypoint** do workspace. Ele aponta os caminhos — **abra os arquivos citados** com suas ferramentas (`read_file`, `search_files`, `terminal`) **antes de responder**. Não invente; consulte a fonte. Carregue só o que precisar (progressive disclosure).

## O que é a Kolden
Operação do **Ronan**. A descrição oficial (modelo de negócio, mercado, marca) está em construção em `sobre-a-empresa/` — **um squad de pesquisa vai definir e preencher**. Enquanto estiver `status: rascunho`, **não afirme** detalhes de negócio: diga que está em definição.

## Números do workspace (estado atual)
- **16 squads** de agentes (nomes da mitologia grega) — **176 agentes** nas pastas `agents/`.
- **Prometeu**: framework de engenharia AIOX com **12 agentes** em `Prometeu/.aiox-core/development/agents/`.
- **Caos**: fábrica de agentes com **10 especialistas internos** + **13 skills**.
- **Total**: **198 agentes** mapeados arquivo-a-arquivo.
- **Ferramentas**: ~30 tools/APIs catalogadas; **14 MCPs conectados**, 8 aguardando OAuth.
- **Projetos** em desenvolvimento: `omiron`, `Catalogoos` (Tracker Flow).
- **Infra do Kolden OS** (stack LobeHub) roda no WSL2 — ver `CLAUDE.md` (não é parte deste workspace de agentes Windows).

---

## Mapa do workspace (`C:\Kolden\`)

### 🧠 sobre-a-empresa/ — o "cérebro" da empresa (em construção)
Índice da pasta: `sobre-a-empresa/leia-me.md` · registro: `sobre-a-empresa/indice.yaml`. **30 docs, ~28 em `status: rascunho`** — o squad de pesquisa vai preencher; não afirme detalhes de negócio.
- `identidade/` — visão-geral, missão-visão-valores, história, organograma
- `areas/` — organização por departamento (visão lógica): cada área tem carta, funções, **elenco** (agentes/pessoas) e KPIs. Agentes não são movidos — ver `areas/leia-me.md`.
- `mercado-e-posicionamento/` — ICP e personas, ofertas, posicionamento, concorrência
- `marca/` — voz e tom, mensagens-chave, identidade visual
- `operacao/` — processos/SOPs, métricas e OKRs
- `glossario.md` · `faq.md`

### 📁 Projetos/ — produtos e iniciativas
Novos projetos seguem o template `Projetos/_modelo-projeto/` (leia-me, prd, arquitetura, decisoes, status).
- `Projetos/omiron/` — app de monitoramento terapêutico (Next.js 15, TypeScript, Prisma, Supabase). Tem `CLAUDE.md` e `AGENTS.md` próprios.
- `Projetos/Catalogoos/` — plataforma **Tracker Flow** de rastreamento de conversões e integrações S2S (Meta CAPI, TikTok, GHL, GA4) (React 18 + Vite, Supabase, shadcn/ui, Tailwind).
- `Projetos/sprints/` — registro de sprints.

### 🤖 Agentes e infraestrutura (pastas que existem)
- `Caos/` — fábrica de agentes de IA (ritual de criação). Leia `Caos/CLAUDE.md`, `Caos/constituicao.md`, `Caos/glossario.md`.
- `Hermes/` — runtime que executa os assistentes (gateway WhatsApp, OpenRouter, Infisical). **Projeto vendorizado da Nous Research** (`hermes-agent`, docs em inglês) — **não é um squad nativo Kolden**.
- `Ferramentas/` — catálogo de tools/APIs/MCPs: `Ferramentas/ferramentas.md`, `Ferramentas/mcp-status.md`. Credenciais só no **Infisical**.

### ⚙️ Infraestrutura de sistema (raiz)
- `agent-memory/` — memória persistente do workspace (`workspace-kolden.md`): padrões ativos e aprendizados que sobrevivem entre sessões (Ritual de Encerramento).
- `registros/` — logs de auditoria: `aprendizado.log` (sessões de aprendizado) e `auditoria.log` (operações críticas).
- `_staging/` — **temporário**: clones de import (`aiox/`, `xquads/`) + `MANIFESTO-IMPORTACAO.md`. Limpável após a dívida de Ritual/PRD por squad ser endereçada.
- `Bloco` — **arquivo órfão vazio (0 bytes)**. Propósito desconhecido; candidato a remoção (confirmar com o Ronan).

---

## 🏛️ Squads (equipes de agentes) — nomes da mitologia grega
Cada squad é uma pasta top-level com `README.md` (o que faz + tabela de agentes), `agents/`, `tasks/`, `workflows/`, `checklists/` e `squad.yaml`. Importados e traduzidos (PT-BR) dos arsenais validados `xquads-squads` e `aiox-core`. Status: `importado-cru`/`nascido-no-caos` (refino pelo Ritual do Caos é dívida da fase 2). Padrão: **1 orquestrador (tier 0)** + especialistas (tier 1+). **Abra o `README.md` de cada squad para o detalhe completo.**

### 📣 Marketing & Criação

**Pheme/** — Social Media & Conteúdo orgânico de alta performance (9 agentes). **Publica de verdade** via Postiz/GHL. Meta: marca Kolden a +100k seguidores. Nascido no Caos. → `Pheme/README.md`
- `social-chief` — Orquestra conteúdo por rede e formato, monta calendário e garante a marca.
- `content-strategist` — Desenha pilares, big idea, ganchos e calendário editorial.
- `growth-analyst` — Analisa métricas, testes A/B de gancho e roadmap de crescimento.
- `short-video-architect` — Cria Reels, TikTok e Shorts com gancho de 3s e retenção.
- `carousel-architect` — Desenha carrosséis salváveis para Instagram e LinkedIn.
- `youtube-strategist` — Otimiza título, thumbnail, retenção e SEO de YouTube.
- `linkedin-x-authority` — Constrói autoridade B2B com posts e threads de valor.
- `pinterest-strategist` — SEO visual, descoberta e tráfego de longo prazo via pins.
- `publisher` — Publica e agenda conteúdo via Postiz ou GoHighLevel.

**Peitho/** — Tráfego Pago em Meta, Google, YouTube, TikTok e LinkedIn (16 agentes). → `Peitho/README.md`
- `traffic-chief` — Orquestra diagnóstico e roteamento de problemas de tráfego pago.
- `molly-pittman` — Facebook/Meta com Customer Value Journey e Traffic Engine.
- `ralph-burns` — Facebook/Meta de funil completo (Tier 11, Perpetual Traffic).
- `depesh-mandalia` — Escala Meta com método BPM, AC-4 scoring e CBO Cookbook.
- `nicholas-kusmich` — Facebook de alto ROI com Give-Give-Give-Ask e congruência contextual.
- `tom-breeze` — YouTube Ads com fórmula ADUCATE e funis por intenção.
- `kasim-aslam` — Google Ads (Solutions 8) e framework "Você vs. Google".
- `pedro-sobral` — Facebook/Instagram Brasil com o Método Sobral.
- `ad-midas` — Estratégia e produção de criativos: conceitos, roteiros e matrizes de teste.
- `media-buyer` — Execução multiplataforma: estrutura, lances, públicos e otimização diária.
- `performance-analyst` — Dashboards, atribuição e recomendações orientadas por dados.
- `creative-analyst` — Decomposição de performance de criativos, fadiga e briefings.
- `scale-optimizer` — Escala vertical/horizontal protegendo eficiência.
- `pixel-specialist` — Rastreamento browser-side, CAPI server-side e conformidade iOS.
- `ads-analyst` — Auditoria forense de contas: gasto desperdiçado e estrutura.
- `fiscal` — CFO de tráfego: orçamento, fluxo de caixa, lucratividade e metas ROAS.

**Caliope/** — Copywriting de elite: resposta direta, VSL, e-mail e marca (23 agentes). → `Caliope/README.md`
- `copy-chief` — Orquestra demandas de copy e roteia aos 22 especialistas certos.
- `gary-halbert` — Narrativa emocional crua e marketing de rua em resposta direta.
- `eugene-schwartz` — Mestre dos 5 níveis de consciência de mercado.
- `claude-hopkins` — Pai da publicidade científica: copy orientada a dados e reason-why.
- `gary-bencivenga` — Mestre da prova: bullets, fascinações e a equação da persuasão.
- `robert-collier` — Empatia e filme mental; cartas clássicas e psicologia do leitor.
- `john-carlton` — Formato longo informal e o ângulo escondido de venda.
- `jim-rutz` — Pioneiro do magalog: formatos inovadores e copy anti-tédio.
- `dan-kennedy` — Direct response sem B.S.: ofertas, precificação e info-marketing.
- `frank-kern` — Intent-based branding e sequências comportamentais.
- `russell-brunson` — Arquiteto de funis: Value Ladder, Hook-Story-Offer, Epiphany Bridge.
- `todd-brown` — Grandes ideias e mecanismos únicos (E5 Method).
- `stefan-georgi` — Arquiteto do RMBC: VSLs e copy sistemática de alto volume.
- `jon-benson` — Inventor da VSL: cartas de venda em vídeo.
- `ry-schwartz` — Conversão por transformação de crenças e e-mail de lançamento.
- `ben-settle` — E-mail diário com personalidade (anti-guru).
- `andre-chaperon` — Narrativa por e-mail e Soap Opera Sequence.
- `dan-koe` — Marca pessoal e economia de criadores (negócio de uma pessoa).
- `joe-sugarman` — O escorregador: gatilhos psicológicos e publicidade impressa.
- `david-ogilvy` — Pai da publicidade moderna: copy de marca premium e Big Idea.
- `clayton-makepeace` — Venda emocional e o Four-Legged Stool.
- `parris-lampropoulos` — Fascinações e formato em finanças e saúde.
- `david-deutsch` — CopyTHINKING: grandes ideias e fascinações.

**Aglaia/** — Branding e identidade visual de marca (15 agentes). → `Aglaia/README.md`
- `brand-chief` — Orquestrador: diagnostica o desafio de marca e roteia ao especialista.
- `david-aaker` — Brand equity, identidade, arquitetura de marca e portfólio.
- `kevin-keller` — Pirâmide CBBE, ressonância e medição de brand equity.
- `jean-noel-kapferer` — Brand Identity Prism, DNA de marca e estratégia de luxo.
- `al-ries` — Positioning, 22 Leis e criação de categorias.
- `byron-sharp` — Crescimento por evidência, disponibilidade e ativos distintivos.
- `marty-neumeier` — Brand Gap, Zag (diferenciação radical) e Onlyness.
- `donald-miller` — StoryBrand SB7, BrandScript e one-liner.
- `denise-yohn` — Fusão marca-cultura e branding interno/empregador.
- `emily-heyward` — Branding de startup/DTC e comunidade desde o dia um.
- `alina-wheeler` — Sistemas de identidade visual e brand guidelines.
- `archetype-consultant` — 12 arquétipos junguianos, personalidade e tom de voz.
- `naming-strategist` — Geração/avaliação de nomes e estratégia de domínio.
- `domain-scout` — Disponibilidade de domínio, TLD e handles sociais.
- `miller-sticky-brand` — StoryBrand na prática: do BrandScript ao site e funil.

**Harmonia/** — Design systems, UX/UI e DesignOps (8 agentes). → `Harmonia/README.md`
- `design-chief` — Orquestrador: triagem, roteamento e QA das entregas de design.
- `brad-frost` — Atomic Design, design systems e governança de padrões.
- `dan-mall` — Design systems em escala e adoção organizacional.
- `dave-malouf` — DesignOps, processos, métricas e cultura de design.
- `ux-designer` — Pesquisa, IA, wireframes, fluxos, testes e acessibilidade.
- `design-system-architect` — Bibliotecas de componentes e design tokens prontos para produção.
- `visual-generator` — Assets visuais, ícones, ilustrações e identidade via IA.
- `ui-engineer` — Frontend responsivo, acessível e pixel-perfect (React, CSS, Tailwind).

**Orfeu/** — Storytelling e frameworks de narrativa (12 agentes). → `Orfeu/README.md`
- `story-chief` — Orquestrador: triagem, roteamento e síntese de frameworks narrativos.
- `joseph-campbell` — Jornada do Herói, monomito e arquétipos.
- `dan-harmon` — Story Circle e estrutura para conteúdo episódico.
- `blake-snyder` — Save the Cat! e beat sheet de 15 batidas.
- `shawn-coyne` — Story Grid: diagnóstico editorial por gênero.
- `matthew-dicks` — Narrativa pessoal (Storyworthy, tradição do Moth).
- `kindra-hall` — Histórias de vendas e marketing que grudam.
- `nancy-duarte` — Apresentações persuasivas e storytelling com dados.
- `park-howell` — Storytelling de marca e framework ABT.
- `keith-johnstone` — Improvisação, status e desbloqueio criativo.
- `oren-klaff` — Pitching de alto risco e controle de frame.
- `marshall-ganz` — Narrativa pública para movimentos sociais.

### 🧭 Estratégia & Negócios

**Aletheia/** — Discovery & Lean Validation (8 agentes). **Entrada do funil de criação**: leva ideia crua → MVP validado e faz handoff aos squads de execução. Veto: nada de build sem dor validada. Nascido no Caos. → `Aletheia/README.md`
- `aletheia-chief` — Orquestrador: roteamento, síntese de evidência e gate de build.
- `steve-blank` — Customer Development e validação de mercado.
- `rob-fitzpatrick` — The Mom Test: entrevista sem viés sobre o problema.
- `tony-ulwick` — Jobs-to-Be-Done e inovação orientada por outcomes.
- `eric-ries` — Lean Startup, Build-Measure-Learn e tipologia de MVP.
- `david-bland` — Testing Business Ideas e assumptions mapping.
- `ash-maurya` — Running Lean, Lean Canvas e iteração rápida.
- `alberto-savoia` — Pretotyping, teste de demanda e sizing de mercado.

**Argos/** — Inteligência de Mercado & Scraping (15 agentes). **O deus das pesquisas**: pesquisa do macro ao micro (TAM/SAM/SOM, tendências), mapeia concorrentes orgânico+pago em todas as redes, extrai links/SEO, com dados ultra-confiáveis (fonte+timestamp+cross-check). Compliance híbrido: base verde + módulo cinza isolado opt-in via sentinela. Motor de scraping vendorizado (Scrapling/Scrapy/GPT-Researcher/Crawlee/Skyvern). Nascido no Caos. → `Argos/README.md`
- `argos-chief` — Orquestrador: escopo macro→micro, roteamento e gate de confiabilidade.
- `web-harvester` — Scraping geral, anti-bot/stealth e extração exaustiva de links.
- `serp-seo-cartografo` — SERP, rankings, keywords, backlinks e footprint digital.
- `ads-intel` — Inteligência de pago via ad libraries públicas (Meta/Google/TikTok/LinkedIn).
- `market-sizer` — TAM/SAM/SOM (top-down + bottom-up) e tendências macro.
- `competitor-mapper` — Dossiê por concorrente cruzando orgânico + pago + SEO.
- `research-synthesizer` — Cross-check adversarial, citação e relatório macro→micro.
- `social-instagram`, `social-tiktok`, `social-youtube`, `social-linkedin`, `social-x`, `social-facebook`, `social-reddit` — inteligência orgânica por rede social.
- `compliance-sentinela` — Guardião de ToS: classifica verde/cinza, portão único da zona cinza.

**Olimpo/** — C-Level / Executivos (6 agentes). → `Olimpo/README.md`
- `vision-chief` — CEO/Orquestrador: define a visão e roteia ao executivo certo.
- `coo-orchestrator` — COO: excelência operacional, processos, escala, KPIs/OKRs.
- `cmo-architect` — CMO: marca, posicionamento, demanda e go-to-market.
- `cto-architect` — CTO: arquitetura de tecnologia, build vs buy e engenharia.
- `cio-engineer` — CIO: sistemas de informação, infraestrutura e governança de TI.
- `caio-architect` — CAIO: estratégia de IA, pipelines de ML e automação.

**Themis/** — Conselho consultivo com 11 mentes estratégicas (11 agentes). → `Themis/README.md`
- `board-chair` — Orquestrador: diagnostica, roteia e sintetiza recomendações.
- `ray-dalio` — Princípios, ciclos econômicos e gestão de risco.
- `charlie-munger` — Modelos mentais, vieses cognitivos e inversão.
- `naval-ravikant` — Riqueza por alavancagem, conhecimento específico e julgamento.
- `peter-thiel` — Pensamento contrário, monopólio e zero-a-um.
- `reid-hoffman` — Efeitos de rede, blitzscaling e planejamento ABZ.
- `simon-sinek` — Propósito, Golden Circle e jogo infinito.
- `brene-brown` — Vulnerabilidade, resiliência e liderança ousada.
- `patrick-lencioni` — Saúde organizacional e as cinco disfunções de equipe.
- `derek-sivers` — Minimalismo empreendedor e o filtro "Hell Yeah or No".
- `yvon-chouinard` — Negócio orientado por missão e ativismo ambiental.

**Metis/** — Analytics & Growth orientado por dados (7 agentes). → `Metis/README.md`
- `data-chief` — Orquestrador: triagem, roteamento e QA em analytics e growth.
- `avinash-kaushik` — Web analytics; mata métricas de vaidade.
- `peter-fader` — Customer lifetime value e customer-centricity (BG/NBD, CBCV).
- `sean-ellis` — Growth hacking, product-market fit e North Star Metric.
- `wes-kao` — Construção de audiência e cohort-based courses.
- `nick-mehta` — Customer success, NRR e prevenção de churn.
- `david-spinks` — Community-led growth e o modelo SPACES.

**Pluto/** — Negócios & Escala via framework Alex Hormozi (16 agentes). → `Pluto/README.md`
- `hormozi-chief` — Orquestrador: diagnostica o problema central e revisa o alinhamento.
- `hormozi-offers` — Grand Slam Offers via Value Equation e bônus.
- `hormozi-leads` — Geração de leads pelo Core 4 (warm, cold, content, paid).
- `hormozi-pricing` — Precificação por valor e posicionamento premium.
- `hormozi-closer` — Vendas pelo framework CLOSER e tratamento de objeções.
- `hormozi-ads` — Estrutura e escala de anúncios pagos (ROAS, CPA).
- `hormozi-content` — Content machine e estratégia orgânica.
- `hormozi-hooks` — Hooks, headlines e aberturas que prendem atenção.
- `hormozi-launch` — Lançamentos, pré-vendas e entrada de mercado.
- `hormozi-retention` — Redução de churn e maximização de LTV.
- `hormozi-scale` — Escala de $1M a $100M+ via sistemas e delegação.
- `hormozi-models` — Modelo de negócio e arquitetura de receita.
- `hormozi-audit` — Avaliação do negócio e melhorias priorizadas.
- `hormozi-copy` — Copy de alta conversão no estilo Hormozi.
- `hormozi-workshop` — Workshops e eventos premium.
- `hormozi-advisor` — Aconselhamento estratégico na voz de Alex Hormozi.

**Dionisio/** — Movimentos & Comunidade (7 agentes). → `Dionisio/README.md`
- `movement-chief` — Orquestrador: diagnostica fase e coordena o ciclo do movimento.
- `movement-architect` — Arquitetura de movimento e design de comunidade tribal.
- `fenomenologo` — Escava a tensão vivida que acende o movimento.
- `identitario` — Arquitetura de identidade tribal ("nós, em quê acreditamos").
- `estrategista-de-ciclo` — Ciclo Atrair → Ativar → Sustentar → Multiplicar.
- `manifestador` — Manifestos e propagação narrativa.
- `analista-de-impacto` — Medição de impacto e saúde do movimento.

### 🛠️ Engenharia & Segurança

**Prometeu/** — Engenharia de Software assistida por IA, framework **AIOX** (12 agentes). Os agentes vivem em `Prometeu/.aiox-core/development/agents/` (não em `agents/`). README e `AGENTS.md` próprios; é base vendorizada/importada (`@aiox-squads/core`). → `Prometeu/README.md`
- `aiox-master` — Orquestrador central e governador do framework AIOX.
- `analyst` — Pesquisa e investigação de requisitos com análise sistêmica.
- `architect` — Arquitetura de sistema com modelagem de falhas.
- `data-engineer` — Design de schema e otimização de banco de dados.
- `dev` — Implementação de código (modos YOLO, interativo, pre-flight).
- `devops` — Autoridade exclusiva em git push, PRs e infraestrutura MCP.
- `pm` — Autoridade exclusiva em criação e execução de epics.
- `po` — Product owner: validação de stories com checklist de 10 pontos.
- `qa` — Quality gate com 7 verificações e QA loop.
- `sm` — Autoridade exclusiva em rascunho e criação de stories.
- `ux-design-expert` — Design de experiência e interface.
- `squad-creator` — Criação de squads multi-agente com orquestração.

**Dedalo/** — Domínio do Claude Code (8 agentes: hooks, MCP, skills, subagents, config, CI/CD). → `Dedalo/README.md`
- `claude-mastery-chief` — Orquestrador: roteia os 7 domínios do Claude Code.
- `hooks-architect` — Automação determinística nos eventos de lifecycle.
- `mcp-integrator` — Composição de ferramentas com consciência de contexto.
- `swarm-orchestrator` — Topologias multi-agente e execução paralela.
- `config-engineer` — Hierarquias de settings e fronteiras de framework.
- `skill-craftsman` — Skills, commands e plugins (extensibilidade).
- `project-integrator` — Integração de repositórios inspirada em PAI.
- `roadmap-sentinel` — Monitor do ecossistema Claude Code e plan-first.

**Egide/** — Cybersecurity ofensiva e defensiva (15 agentes). → `Egide/README.md`
- `cyber-chief` — Orquestrador ético com verificação de autorização obrigatória.
- `peter-kim` — Pentest e red team (metodologia PTES/OWASP).
- `georgia-weidman` — Segurança mobile e desenvolvimento de exploits.
- `jim-manico` — AppSec (OWASP, ASVS, STRIDE).
- `chris-sanders` — Blue team e monitoramento de segurança.
- `omar-santos` — Gestão de vulnerabilidades e resposta a incidentes.
- `marcus-carey` — Inteligência de ameaças e liderança em infosec.
- `command-generator` — Sintaxe precisa de ferramentas ofensivas/defensivas.
- `cartographer` — Reconhecimento de superfície de ataque e topologia de rede.
- `busterer` — Enumeração de conteúdo web e descoberta de endpoints.
- `dirber` — Enumeração de serviços (SMB, LDAP, SNMP, RPC, NFS, AD).
- `fuzzer` — Fuzzing de entradas, injeção e manipulação de parâmetros.
- `ripper` — Quebra de hashes e avaliação de políticas de senha.
- `rogue` — Exploração, pós-exploração e movimento lateral.
- `shannon-runner` — OSINT (inteligência de fontes abertas).

---

## 🏭 Infraestrutura de agentes

### Caos/ — fábrica de agentes (10 especialistas internos + 13 skills)
Ritual de criação em 9 fases, sob a `Caos/constituicao.md` (versionada). Aplica **REUSE > ADAPT > CREATE** via registro de entidades. Leia `Caos/CLAUDE.md` e `Caos/leia-me.md`. Especialistas em `Caos/.claude/agents/`:
- `arquiteto` — Topologia solo/squad com análise de anti-padrões.
- `curador` — Consulta o registro de entidades (REUSE > ADAPT > CREATE).
- `diagnosticador` — Diagnóstico das 7 faculdades ("O Ser") com detecção de pré-morte.
- `pesquisador` — Estado da arte e benchmarking de mercado (score ≥8).
- `redator-de-prompts` — Redação de prompts agnósticos de modelo.
- `revisor` — Revisão contra checklist de qualidade e conformidade constitucional.
- `testador` — Teste de comportamento com maturity score (0–10).
- `vigia` — Vigia de ecossistema: digest datado e estado-da-arte vivo.
- `gohighlevel` — Integração de GoHighLevel (CRM e automação de vendas).
- `LobeHub` — Integração de LobeHub (interface de chat conversacional).

Skills do Caos (`Caos/.claude/skills/`): `busca-de-referencias`, `consulta-ao-registro`, `criacao-de-hooks`, `criacao-de-skill`, `criacao-de-squad`, `criacao-de-subagent`, `diagnostico-de-agente`, `geracao-de-prd`, `infisical-padrao`, `registro-de-entidade`, `verificacao-de-alinhamento`, `vigia-de-ecossistema` (+ catálogo).

### Hermes/ — runtime de execução (vendorizado)
Projeto **Nous Research** (`hermes-agent`) integrado ao workspace; docs em inglês. Executa os assistentes em CLI/TUI e gateways (WhatsApp, Telegram, Discord, Slack, Signal…), com OpenRouter como provider e segredos via Infisical. **Não é um squad nativo Kolden** e não tem agentes Kolden próprios — é a camada que *roda* assistentes. Ver `Hermes/README.md` e `Hermes/AGENTS.md` (guia de contribuição).

### Ferramentas/ — catálogo de tools, APIs e MCPs
Índice mestre `Ferramentas/ferramentas.md`; estado dos MCPs em `Ferramentas/mcp-status.md`; validação de APIs em `Ferramentas/api-validation.md`. ~30 ferramentas catalogadas; **14 MCPs conectados**, 8 aguardando OAuth, 3 follow-ups de credencial. **Credenciais SEMPRE via Infisical — nunca em texto puro.**

---

## Regras de ouro
1. **Consulte a fonte.** Pergunta sobre a empresa/projeto → abra o arquivo correspondente e responda com base nele. Se o doc estiver em branco/`rascunho`, diga que ainda não foi definido.
2. **PT-BR + kebab-case** em qualquer arquivo novo (convenção do Caos / Constituição Art. II).
3. **Nunca exponha segredos** (.env, chaves). Credenciais vivem no Infisical.
4. **Confirme antes de alterar/criar** arquivos ou rodar comandos que mudam algo.
5. **Seja direto** (muitas respostas saem por WhatsApp).
6. **Encerre sempre aprendendo.** Ao final de toda sessão com trabalho, rode o Ritual de Encerramento (abaixo).

## Ritual de Encerramento (auto-aprendizado obrigatório)
**Todo agente da Kolden, sempre que for acionado, ao final da sessão precisa aprender algo.**
Antes de encerrar uma sessão em que houve trabalho (qualquer escrita, decisão ou descoberta):
acione a habilidade **`ritual-de-encerramento`** — reflita sobre a sessão, extraia as lições
verificadas e grave-as na sua memória própria (`MEMORY.md`). Nunca encerre sem ter aprendido
e salvo algo. O reflexo `Stop` (`encerramento-aprendizado`) dispara isso automaticamente, mas
a obrigação é do agente. A habilidade é a fonte única do processo: `.claude/skills/ritual-de-encerramento/SKILL.md`.
