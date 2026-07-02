# Kolden — Manifesto para Agentes de IA

> **Você é um agente de IA operando dentro da Kolden.** Responda em **português (BR)**.
> Este arquivo é o **índice/entrypoint** do workspace. Ele aponta os caminhos — **abra os arquivos citados** com suas ferramentas (`read_file`, `search_files`, `terminal`) **antes de responder**. Não invente; consulte a fonte. Carregue só o que precisar (progressive disclosure).
>
> **Política de busca (soberania de dados):** antes de qualquer pesquisa web — direta ou via subagente — declare a ferramenta e o nível (padrão = máximo) e aguarde confirmação. Firecrawl é a ferramenta padrão; nativa só como último recurso. Subagentes de pesquisa rodam no poder máximo. Regra e trava `gate-busca.cjs` em `~/.claude/CLAUDE.md`.

## O que é a Kolden
Operação do **Ronan**. A descrição oficial (modelo de negócio, mercado, marca) está em construção em `sobre-a-empresa/` — **um squad de pesquisa vai definir e preencher**. Enquanto estiver `status: rascunho`, **não afirme** detalhes de negócio: diga que está em definição.

## Números do workspace (estado atual)
- **23 squads** de agentes (nomes da mitologia grega) — **240 agentes** nas pastas `agents/` (inclui os 6 squads-semente novos: +30; consolidação Caliope×copy-master: +10; **campanha 2026-07-02: Themis +1 (analista-de-compliance-regulatorio) + Emporos +4 (gestor-de-contas-estrategicas, coach-de-discovery, engenheiro-de-pre-vendas, analista-de-pipeline)**).
- **Prometeu**: framework de engenharia AIOX com **12 agentes** em `Prometeu/.aiox-core/development/agents/`.
- **Caos**: fábrica de agentes com **9 especialistas internos** + **26 skills**.
- **Total**: **261 agentes** (240 em 23 squads + 12 Prometeu + 9 Caos) — contagem verificada arquivo-a-arquivo em 2026-07-02 (pós-campanha F6 exaustiva). A **Dike** (verificador da subida) é um papel **sem arquivo de agente próprio** (`Dike/` tem PRD/CLAUDE/memória, mas não `agents/*.md`), por isso **não entra na contagem**.
- **Skills (contagem real por `ls`, 2026-07-02, working tree pré-commit)**: **314 habilidades** em 23 squads — **Prometeu 56**, **Pheme 33**, **Égide 33**, **Caos 26**, **Ariadne 22**, **Emporos 18**, **Olimpo 15**, **Dédalo 13**, **Aletheia 11**, **Aglaia 11**, **Caliope 10**, **Peitho 8**, **Pactolo 8**, **Cairós 7**, **Argos 7**, **Metis 6**, **Harmonia 6**, **Nomos 5**, **Héstia 5**, **Ananke 5**, **Themis 3**, **Pluto 3**, **Liceu 3**. Fontes: lote 2026-06-26/27 + absorção `msitarzewski/agency-agents` (B01/B02/B03/B04/B05/B06/B08/B09/B10/B11/B15 aplicados; B07/B12/B13/B14 pendentes). Todos os squads com skills têm `catalogo.md`. Detalhes: `Caos/registros/absorcao/_campanha-2026-07-02/RELATORIO-DA-CAMPANHA.md` + `_lote-2026-06-26/RELATORIO-DO-LOTE.md`.
- **6 squads-semente novos (2026-06-28)**: **Nomos** (compliance/jurídico), **Pactolo** (finanças/FP&A), **Êmporos** (vendas/comercial), **Héstia** (RH/pessoas), **Ananke** (operações/BizOps), **Cairós** (PMO/projetos) — +30 agentes (chief + 4 especialistas cada). **Status `semente`**: estrutura inicial (README + squad.yaml + agentes + 5 skills + catálogo + MEMORY); refino completo (PRD, Ritual de 9 fases, herança histórica) pendente do Caos. Fronteiras de camada cravadas vs Olimpo (Plutos/Afrodite/Poseidon) e Prometeu/Caos.
- **Ferramentas**: ~35 tools/APIs catalogadas (inclui 5 vendors novos: Repomix, MarkItDown, MoneyPrinterTurbo, PlaywrightMCP, n8n-MCP); **14 MCPs conectados**, 8 aguardando OAuth.
- **Projetos** em desenvolvimento: `omiron`, `CataLogo` (Tracker Flow).
- **Infra do Kolden OS** (stack LobeHub) roda no WSL2 — ver `CLAUDE.md` (não é parte deste workspace de agentes Windows).

## Sistema hierárquico de agentes (5 camadas)
Um input do Ronan atravessa 5 camadas, enriquecido e assinado a cada degrau num **Contrato de Missão** (o chassi, em `Olimpo/contratos/`):
1. **Humano (Ronan)** — dá o input, aprova no portão.
2. **Hermes** (camada 2) — traduz a intenção, aplica o **DoR** e a **matriz de risco** (verde/amarelo/vermelho → autonomia progressiva), **lacra a intenção** (sha256) e cria o Contrato. Dono do `USER.md`. Ver `Hermes/camada-2-contrato.md`.
3. **Zeus** (Olimpo) — decompõe a missão e roteia ao(s) executivo(s) pelos `routing_triggers`.
4. **Executivos do Olimpo** (8 deuses) — Zeus/CEO, Poseidon/COO, Apolo/CMO, Hefesto/CTO, Hades/CIO, Atena/CAIO, Plutos/CFO, Afrodite/CRO. Cada um especifica na língua técnica da sua disciplina e faz handoff ao operacional.
5. **Operacional** — os squads de execução (Peitho, Caliope, Pheme, Ariadne, GHL…).

Na **subida**, a **`Dike/`** (verificador) reconcilia a entrega contra o lacre e localiza o degrau de qualquer quebra (TPND=0) antes de o Hermes devolver ao Ronan. O **RH dos agentes** (cartão de identidade `Caos/modelos/cartao-de-identidade.md` + roster `Caos/dados/elenco-de-agentes.yaml`) e o **tool registry** consultável (`sobre-a-empresa/Ferramentas/registro-de-ferramentas.yaml`) são governados pelo Caos/curador.

---

## Mapa do workspace (`C:\Kolden\`)

### 🧠 sobre-a-empresa/ — o "cérebro" da empresa (em construção)
Índice da pasta: `sobre-a-empresa/leia-me.md` · registro: `sobre-a-empresa/indice.yaml`. **30 docs, ~28 em `status: rascunho`** — o squad de pesquisa vai preencher; não afirme detalhes de negócio.
- `identidade/` — visão-geral, missão-visão-valores, história, organograma + **`arquitetura/`** (5 diagramas Excalidraw+Draw.io: visão macro das 5 camadas, mapa de 26 squads, infra Kolden OS, runtime Hermes, fluxo do Contrato de Missão)
- `areas/` — organização por departamento (visão lógica): cada área tem carta, funções, **elenco** (agentes/pessoas) e KPIs. Agentes não são movidos — ver `areas/leia-me.md`.
- `mercado-e-posicionamento/` — ICP e personas, ofertas, posicionamento, concorrência
- `marca/` — voz e tom, mensagens-chave, identidade visual
- `operacao/` — processos/SOPs, métricas e OKRs, e a **Central de Tarefas** (`operacao/tarefas/`): radar YAML único de tarefas multi-cliente com classificação por **5 buckets de capacidade Kolden** (`agente-faz-sozinho` / `agente-faz-com-input` / `agente-instrumenta-humano-decide` / `humano-puro` / `bloqueado-por-capacidade-faltante`). SSoT é `tarefas/radar.yaml`; arquivo append-only em `tarefas/arquivo.yaml`; playbooks em `tarefas/playbooks/`. Comando `/tarefa` (a criar via Caos) é o único writer. Detalhes: `operacao/tarefas/README.md`.
- `glossario.md` · `faq.md`

### 📁 Projetos/ — produtos e iniciativas
Novos projetos seguem o template `Projetos/_modelo-projeto/` (leia-me, prd, arquitetura, decisoes, status).
**Cliente × projeto:** o dossiê do cliente (em `sobre-a-empresa/clientes/`) é a **inteligência de negócio** (contrato, ICP, metas); o projeto aqui é a **execução** (brandbook, pesquisa, código). Os dois se cruzam por frontmatter: `workspace_projeto` (no dossiê) ↔ `dossie_cliente` (no `leia-me.md` do projeto). Ao trabalhar num projeto de cliente, comece pelo dossiê para o contexto de negócio. Índice de quem tem projeto: `sobre-a-empresa/clientes/README.md`.
- `Projetos/omiron/` — app de monitoramento terapêutico (Next.js 15, TypeScript, Prisma, Supabase). Tem `CLAUDE.md` e `AGENTS.md` próprios.
- `Projetos/CataLogo/` — plataforma **Tracker Flow** de rastreamento de conversões e integrações S2S (Meta CAPI, TikTok, GHL, GA4) (React 18 + Vite, Supabase, shadcn/ui, Tailwind).
- `Projetos/sprints/` — registro de sprints.

### 🤖 Agentes e infraestrutura (pastas que existem)
- `Caos/` — fábrica de agentes de IA (ritual de criação). Leia `Caos/CLAUDE.md`, `Caos/constituicao.md`, `Caos/glossario.md`.
- `Hermes/` — runtime que executa os assistentes (gateway WhatsApp, OpenRouter, Infisical). **Projeto vendorizado da Nous Research** (`hermes-agent`, docs em inglês) — **não é um squad nativo Kolden**.
- `sobre-a-empresa/Ferramentas/` — catálogo de tools/APIs/MCPs: `sobre-a-empresa/Ferramentas/ferramentas.md`, `sobre-a-empresa/Ferramentas/mcp-status.md`. Credenciais só no **Infisical**.

### ⚙️ Infraestrutura de sistema (em `.claude/`)
- `.claude/agent-memory/` — memória persistente do workspace (`workspace-kolden.md`): padrões ativos e aprendizados que sobrevivem entre sessões (Ritual de Encerramento).
- `.claude/registros/` — logs de auditoria: `aprendizado.log` (sessões de aprendizado) e `auditoria.log` (operações críticas).
- `.claude/_staging/` — **temporário**: clones de import (`aiox/`, `xquads/`) + `MANIFESTO-IMPORTACAO.md`. Limpável após a dívida de Ritual/PRD por squad ser endereçada.

---

## 🧩 Skills absorvidas — histórico das campanhas

### Campanha F6 EXAUSTIVA (2026-07-02) — quarentena fechada
**98 skills novas + 45 SKILL.md estendidas + 10 catálogos + 1 agente novo (Themis) + 4 agent-extensions Pheme + Peitho esqueleto criado**. 7 ondas × 3 subagentes, PERDIDO=0. Working tree (pré-commit). Migração no ledger `Caos/dados/repositorios-absorvidos.yaml`: 13 buckets do lote 2026-06-26 passaram de `analisado` → `absorvido`; 4 buckets do agency-agents fechados: **B02 marketing** (107 IDs), **B03 engineering** (117 IDs), **B06 sales** (33 IDs), **B10 support** (15/23 IDs aplicados + 8 ROADMAP). Detalhes: `Caos/registros/absorcao/_campanha-2026-07-02/RELATORIO-DA-CAMPANHA.md`.

Alterações por squad na campanha 2026-07-02:
- **Prometeu (+32)**: B03-A (10 skills eng — MLOps, contratos-API, migrações zero-downtime, onboarding-de-codebase, pipeline-invariantes, Postgres-tuning), B03-B (10 skills — deploy strategies, MIME, virtualização, git-branching, SLO/error-budget, diff-mínimo, mobile cross-platform, offline-first, prompts-versionados, MVP 3-dias), B03-C (8 skills qa — threejs, seleção-padrão-arquitetural, WCAG 2.2 AA, API testing, qa-anti-fantasia, k6-benchmarking, cross-validation, spec-gap, ML-mutation), + 4 diferidos O3 (depuracao-sistematica, orquestracao-comandos-slash, debugging-por-council).
- **Pheme (+22 + 5 ADAPT + 3 agent-ext)**: eixo China (12: baidu/bilibili/douyin/kuaishou/wechat/weibo/xiaohongshu/zhihu/wecom/podcast-china/china-ecommerce-ops/china-localizacao-gtm), eixo Global/AEO (10: aeo-foundations, agentic-search-webmcp, geo-citacoes-ia, motor-carrossel-autonomo, cross-border-ecommerce, podcast-global, linkedin-comment-to-pipeline, livestream-commerce, reddit-comunidade, edicao-shortvideo).
- **Emporos (+13 CREATE + 4 ADAPT)**: B06 sales fechado — batch A (qbr-forward-looking, mapa-de-stakeholders, saude-de-conta, estrategia-deal-complexo), batch B (spin, sandler, upfront-contract, demo-invertida, poc-gate-binario), batch C (battlecard-fia, abm-tiering, pipeline-velocity, forecast-3-faixas). ADAPTs em BANT+MEDDPICC, negociacao+AECR, cadencia+signal-based, proposta+3-atos-win-themes.
- **Olimpo (+10)**: B15 (Zeus: entrada-posicionamento, chief-of-staff, ESG, PMI; Plutos: alocacao-capital, investor-relations, pricing-wtp; Poseidon: lean-six-sigma, supply-chain) + skill compartilhada B10 `sumario-executivo-scqa`.
- **Peitho (esqueleto + 8 + 3 ADAPT)**: `.claude/skills/` criado do zero — auditoria-forense-200-checkpoints, RSA/PMax criativo-como-hipótese, paid-social-cross-platform, incrementalidade-cross-channel, arquitetura-enterprise-PPC, programatica-e-display, search-query-analise, amazon-ppc. ADAPTs em ads-analyst, ad-midas e setup-tracking.
- **Caliope (+5)**: aso-app-store, ghostwriting-de-livro, script-de-livestream, pr-comunicacoes-institucionais, escrita-tecnica-docs-as-code (B03 compartilhada).
- **Ariadne (+4 + 1 ext)**: engenharia-de-schema-executavel, geo-ai-overviews-aprofundado, arquitetura-de-site-hub-spoke, planejamento-por-industria-seo + core-web-vitals-e-performance estendida com metas absolutas + capacity planning.
- **Dédalo (+4)**: comandos-de-compreensao-contextual, gestao-de-memoria-cli-ergonomica, arquitetura-multi-agente-canonica (B03), avaliacao-de-ferramentas-mcda (B03).
- **Metis (+3)**: rfm-e-segmentacao, atribuicao-multi-touch, clv-e-segmentacao (B10).
- **Aglaia (+2)**: direcao-de-brand-kit-visual, direcao-visual-de-referencia.
- **Themis (+1 agente + 3 skills)**: agente novo `analista-de-compliance-regulatorio` + framework-gdpr-lgpd + gerador-de-politica-de-privacidade + revisao-de-contratos-com-risco (B10).
- **Pactolo (+1 + 3 ADAPT)**: npv-irr-e-analise-de-investimento + ADAPTs em unit-economics-operacional (+ROI/scenario/probabilística), gestao-de-fluxo-de-caixa (+STL/anomaly), analise-fpa-e-variancia (+waterfall/corretivas) (B10).
- **Aletheia (+1)**: otimizacao-de-workflow-lean (B03 compartilhada).
- **Égide (consolidação massiva — 32 SKILL.md enriquecidas + 5 incrementals + 1 nova)**: herança histórica em massa (Bruce Schneier, Sarah Edwards, John Kindervag, MITRE ATT&CK, Florian Roth, Chris Sanders, Kevin Mitnick, Trail of Bits, Jim Manico, Adam Shostack, etc.) + incrementais (Macie/DLP, Falco+Tetragon, browser isolation, SOC 2 mapping, OIDC federation) + skill nova `solidity-evm-foundry-seguro` (B03).

### Campanha lote 2026-06-26/27 — 91 skills-âncora iniciais
91 habilidades da absorção de 31 repos GitHub (REUSE>ADAPT>CREATE, PERDIDO=0, sem cópia literal). **44 âncoras iniciais** + **absorção exaustiva 2026-06-27** somou +47: **Égide +24** (cyber full-spectrum), **Ariadne +11** (SEO técnico), **ECC +12** (Caos/Dédalo/Prometeu). Diferido no `ROADMAP-ESTRUTURA-ROBUSTA.md`.
Estado inicial por squad (pré-campanha 2026-07-02):
- **Ariadne** (+18): `analise-de-gap-de-conteudo`, `apis-google-e-indexacao`, `auditoria-tecnica-em-escala`, `brief-de-conteudo-data-driven`, `core-web-vitals-e-performance`, `framework-flow`, `monitoramento-de-drift-seo`, `otimizacao-on-page-por-intencao`, `qualidade-de-conteudo-eeat`, `relatorios-de-seo`, `render-js-e-spa`, `seo-de-imagens`, `seo-ecommerce`, `seo-internacional-hreflang`, `seo-local-e-mapas`, `seo-programatico-profundo`, `seo-tecnico-profundo`, `sxo-search-experience`.
- **Égide** (+5): `auditoria-de-seguranca-de-ia-e-mcp` (flagship), `inteligencia-de-ameacas-cti`, `forense-digital-e-resposta-a-incidente`, `scanner-anti-injecao-resiliente`, `escrita-segura-e-dlp`.
- **Harmonia** (+4): `sistema-de-design`, `tokens-de-design`, `implementacao-ui`, `julgamento-estetico-anti-slop`.
- **Prometeu** (+5): `clarificacao-de-ambiguidade`, `fatiamento-mvp-por-historia`, `analise-cross-artefato`, `checklist-de-requisitos`, `ciclo-de-fase-goal-backward`.
- **Caos** (+4): `descoberta-de-skill` (SDO), `validacao-de-skill`, `topologias-de-time`, `qa-de-integracao-de-time`.
- **Dédalo** (+5): `brevidade-de-saida`, `compreensao-de-codebase`, `orquestracao-de-subagentes-paralelos`, `git-worktrees-e-finalizacao`, `reflexos-resilientes-e-bootstrap`.
- **Pheme** (+6): `fundacao-de-voz`, `arquetipos-de-newsletter`, `matriz-de-conteudo`, `score-de-post`, `roteiro-de-reels`, `comentario-fixado`.
- **Argos** (+3): `retriever-sonar`, `extracao-defuddle`, `busca-semantica-no-acervo`.
- **Olimpo** (+3): `reframe-produto-10-estrelas`, `rubrica-dimensional-0-10`, `painel-executivo-autoplan`.
- **Metis** (+1): `telemetria-de-tokens-e-custo`.
- **Caliope** (+1): `de-slop` (fusão humanizer+stop-slop).

## 🏛️ Squads (equipes de agentes) — nomes da mitologia grega
Cada squad é uma pasta top-level com `README.md` (o que faz + tabela de agentes), `agents/`, `tasks/`, `workflows/`, `checklists/` e `squad.yaml`. Importados e traduzidos (PT-BR) dos arsenais validados `xquads-squads` e `aiox-core`. Status: `importado-cru`/`nascido-no-caos` (refino pelo Ritual do Caos é dívida da fase 2). Padrão: **1 orquestrador (tier 0)** + especialistas (tier 1+). **Abra o `README.md` de cada squad para o detalhe completo.**

### 📣 Marketing & Criação

**Pheme/** — Social Media & Conteúdo orgânico de alta performance (9 agentes). **Publica de verdade** via Postiz/GHL. Meta: marca Kolden a +100k seguidores. **Status: nascido-no-caos em transição** — agentes e skills já no padrão Kolden-native, mas `squad.yaml` ainda em formato AIOX-legado (sem `cross_cutting.veto` / `external_handoffs` / `entry_agent`); migração canônica pendente do Caos (achado K-010 da vistoria v2). → `Pheme/README.md`
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

**Caliope/** — Copywriting de elite: direct response, VSL, e-mail, ofertas, marca e a nova **camada de persuasão & psicologia** (33 agentes, 5 tiers). Consolidação do antigo `copy-master/` em 2026-06-28 (K-002+K-012). → `Caliope/README.md`
- `copy-chief` (Cyrus) — Orquestra demandas, designa primário+secundário+revisor de psicologia e aplica gate de qualidade de 8 pontos sobre os 32 especialistas.
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

**Ariadne/** — Execução de SEO (técnico, on-page, programático, schema, arquitetura, AI-SEO) & CRO de página (8 agentes). **Nascido no Caos** (Ritual completo) a partir da absorção `coreyhaines31/marketingskills@8bfcdff`. Consome inteligência do Argos, faz handoff de copy ao Caliope, de medição ao Metis e de marca ao Aglaia. → `Ariadne/README.md`
- `ariadne-chief` — Orquestra triagem SEO técnico/conteúdo/CRO, roteamento e gate de qualidade.
- `auditor-tecnico-seo` — Crawlabilidade, indexação, Core Web Vitals, canonical/hreflang.
- `arquiteto-de-site` — Arquitetura de informação: siloing, clusters tópicos, links internos.
- `engenheiro-de-schema` — Dados estruturados JSON-LD, rich results, validação.
- `estrategista-de-conteudo-seo` — On-page + programmatic-seo por intenção e template, E-E-A-T.
- `otimizador-ai-seo` — AEO/GEO/LLMO: ser citado por LLMs e AI Overviews.
- `analista-de-cro` — CRO de página (framework de 8 dimensões + biblioteca de experimentos) por hipótese.
- `otimizador-de-formulario` — CRO de formulário: campos, multi-step, erro, abandono.

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

**Ariadne/** — Execução de SEO & CRO de Página (8 agentes). **O fio do labirinto**: onde o Argos descobre e o Caliope escreve, a Ariadne estrutura, otimiza e converte — auditoria de SEO técnico (crawl/indexação/Core Web Vitals), arquitetura de informação (siloing/links internos), schema JSON-LD, conteúdo on-page/programático, AI-SEO (AEO/GEO/LLMO) e CRO de página/formulário por hipótese testável. Vetos: sem black-hat; recomendação com dado; CRO só por hipótese; copy é handoff ao Caliope. Nascida no Caos a partir da absorção `coreyhaines31/marketingskills`. → `Ariadne/README.md`
- `ariadne-chief` — Orquestradora: triagem SEO técnico/conteúdo/CRO, roteamento e gate de qualidade.
- `auditor-tecnico-seo` · `arquiteto-de-site` · `engenheiro-de-schema` · `estrategista-de-conteudo-seo` · `otimizador-ai-seo` — execução de SEO.
- `analista-de-cro` · `otimizador-de-formulario` — CRO de página e de formulário.

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

**Liceu/** — Biblioteca de Mentes (9 agentes). **A escola de Aristóteles**: disseca o cérebro de grandes especialistas mundiais separando engenharia documentada de mito/folclore, mapeia linhagens intelectuais (herdou_de/influenciou) e destila frameworks operacionais para os squads. Cataloga por referência as ~100 mentes já existentes nos squads (sem mover). Não executa nem instancia agentes — handoff aos squads de execução e ao Caos. Sem motor próprio (REUSE do Argos). Nascido no Caos. → `Liceu/README.md`
- `liceu-chief` — Orquestrador: escopo (nome vs linhagem), roteamento e gate de candura (fato×folclore).
- `biografo` — Biografia, carreira, obras-fonte datadas e contexto histórico.
- `cartografo-de-modelos` — Extrai mental_models, frameworks e princípios da obra primária.
- `ceptico-verificador` — Separa engenharia documentada de mito/folclore; dono do gate de candura.
- `lexicografo` — Vocabulário-assinatura, padrões linguísticos e "Como X Opera".
- `genealogista` — Grafo de linhagens (herdou_de/influenciou); mantém o índice de linhagens.
- `bibliotecario` — Índice federado + registro de entidades; indexa por referência.
- `sintetizador` — Destila mente/linhagem em framework operacional + procedência.
- `ponte-de-encarnacao` — Handoff ao Caos quando a mente deve virar agente conversável.

**Olimpo/** — C-Level / Executivos (8 agentes). Cada deus carrega nome + cargo + `routing_triggers`; opera sobre o Contrato de Missão (`Olimpo/contratos/`). → `Olimpo/README.md`
- `zeus` — CEO/Orquestrador: define a visão e roteia ao executivo certo.
- `poseidon` — COO: excelência operacional, processos, escala, KPIs/OKRs.
- `apolo` — CMO: marca, posicionamento, demanda e go-to-market.
- `hefesto` — CTO: arquitetura de tecnologia, build vs buy e engenharia.
- `hades` — CIO: sistemas de informação, infraestrutura e governança de TI.
- `atena` — CAIO: estratégia de IA, pipelines de ML e automação.
- `plutos` — CFO: finanças, budget de mídia, margem, precificação, unit economics e caixa.
- `afrodite` — CRO: receita, pipeline de vendas, qualificação, conversão e CRM/GHL.

**Themis/** — Conselho consultivo com 11 mentes estratégicas + 1 operacional transversal de compliance (12 agentes). → `Themis/README.md`
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
- `analista-de-compliance-regulatorio` — **[novo 2026-07-02]** Operacional transversal sob a chancela do conselho: LGPD/GDPR/CCPA, DPO, revisão de contratos com risco, resposta a incidentes de privacidade. Não é conselheiro — é executor de governança/compliance.

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

### 🌱 Negócios (squads-semente — novos em 2026-06-28, refino pelo Ritual pendente)
Criados para os domínios sem dono (roadmap R2). Cada um: orquestrador + 4 especialistas + 5 skills-âncora + `squad.yaml` + `catalogo.md` + `MEMORY.md`. `status: semente` (estrutura inicial; PRD/Ritual de 9 fases/herança histórica pendentes). Fontes: `alirezarezvani/claude-skills` (MIT) + `knowledge-work-plugins` (Apache-2.0).
- **Nomos/** — Compliance & Jurídico/Regulatório (LGPD/GDPR, ISO 27001, SOC 2, EU AI Act, contratos, risco). Veto: sem parecer vinculante (revisão humana). Handoffs: Themis (risco), Égide (DLP), Pactolo (finanças). → `Nomos/README.md`
- **Pactolo/** — Finanças Operacionais / FP&A (modelagem, orçamento/forecast, fechamento, fluxo de caixa, unit economics). Decisão estratégica → handoff ao Plutos (Olimpo/CFO). → `Pactolo/README.md`
- **Emporos/** — Vendas & Comercial (pipeline, qualificação BANT/MEDDIC/MEDDPICC, propostas, cadências, CRM/GHL). **Semente → 9 agentes / 18 skills-âncora** (campanha 2026-07-02, B06 sales fechado). +4 especialistas: `gestor-de-contas-estrategicas` (account expansion + QBR + saúde-de-conta), `coach-de-discovery` (SPIN + Sandler + Upfront Contract), `engenheiro-de-pre-vendas` (demo-invertida + POC-gate-binário + battlecard-FIA), `analista-de-pipeline` (pipeline-velocity + forecast-probabilístico-3-faixas). Execução sob a política do Afrodite (Olimpo/CRO); consome leads de Pheme/Ariadne. → `Emporos/README.md`
- **Hestia/** — RH, Pessoas & Cultura (recrutamento, onboarding, performance, cultura, cargos). RH dos *agentes* de IA → handoff ao Caos/curador. → `Hestia/README.md`
- **Ananke/** — Operações & BizOps (SOPs, eficiência, automação, fornecedores). Build técnico de automação (n8n) → handoff ao Dédalo; estratégia → Poseidon. → `Ananke/README.md`
- **Cairos/** — PMO & Gestão de Projetos de negócio (cronograma, escopo, risco, stakeholders, roadmap de produto). Build de software → handoff ao Prometeu. → `Cairos/README.md`

---

## 🏭 Infraestrutura de agentes

### Caos/ — fábrica de agentes (9 especialistas internos + 13 skills)
Ritual de criação em 9 fases, sob a `Caos/constituicao.md` (versionada). Aplica **REUSE > ADAPT > CREATE** via registro de entidades. Leia `Caos/CLAUDE.md` e `Caos/leia-me.md`. Especialistas em `Caos/.claude/agents/`:
- `arquiteto` — Topologia solo/squad com análise de anti-padrões.
- `auditor-de-seguranca` — Auditoria de segurança de agentes/entidades (SAST, segredos, conformidade constitucional).
- `curador` — Consulta o registro de entidades (REUSE > ADAPT > CREATE).
- `diagnosticador` — Diagnóstico das 7 faculdades ("O Ser") com detecção de pré-morte.
- `pesquisador` — Estado da arte e benchmarking de mercado (score ≥8).
- `redator-de-prompts` — Redação de prompts agnósticos de modelo.
- `revisor` — Revisão contra checklist de qualidade e conformidade constitucional.
- `testador` — Teste de comportamento com maturity score (0–10).
- `vigia` — Vigia de ecossistema: digest datado e estado-da-arte vivo.

Skills do Caos (`Caos/.claude/skills/`): `busca-de-referencias`, `consulta-ao-registro`, `criacao-de-hooks`, `criacao-de-skill`, `criacao-de-squad`, `criacao-de-subagent`, `diagnostico-de-agente`, `geracao-de-prd`, `infisical-padrao`, `registro-de-entidade`, `verificacao-de-alinhamento`, `vigia-de-ecossistema` (+ catálogo).

### Hermes/ — runtime de execução (vendorizado)
Projeto **Nous Research** (`hermes-agent`) integrado ao workspace; docs em inglês. Executa os assistentes em CLI/TUI e gateways (WhatsApp, Telegram, Discord, Slack, Signal…), com OpenRouter como provider e segredos via Infisical. **Não é um squad nativo Kolden** e não tem agentes Kolden próprios — é a camada que *roda* assistentes. Ver `Hermes/README.md` e `Hermes/AGENTS.md` (guia de contribuição).

### sobre-a-empresa/Ferramentas/ — catálogo de tools, APIs e MCPs
Índice mestre `sobre-a-empresa/Ferramentas/ferramentas.md`; estado dos MCPs em `sobre-a-empresa/Ferramentas/mcp-status.md`; validação de APIs em `sobre-a-empresa/Ferramentas/api-validation.md`. ~30 ferramentas catalogadas; **14 MCPs conectados**, 8 aguardando OAuth, 3 follow-ups de credencial. **Credenciais SEMPRE via Infisical — nunca em texto puro.**

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
