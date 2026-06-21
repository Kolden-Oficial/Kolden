# Memória do Agente Caos

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Criação de Squad (Ritual)
- Convenção VIVA dos squads diverge dos `modelos/` do Caos: usam `agents/` (não `especialistas/`), `data/routing-catalog.yaml` (não `catalogo-de-roteamento.yaml`), `tasks/`, `config/config.yaml`, `_origem.md`, e o orquestrador é um arquivo dentro de `agents/` (ex.: `data-chief.md`). Ler um squad existente (Metis/Pluto) ANTES de construir para casar a convenção real | 2026-06-20
- Especialistas-pessoa-real saem consistentes e profundos (~250 linhas) quando paralelizados: 1 subagente por especialista, cada prompt mandando LER um arquivo de referência (`Metis/agents/sean-ellis.md`) + os frameworks-chave da pessoa. 7 especialistas do Aletheia escritos assim em um lote | 2026-06-20
- Veto SEMÂNTICO (gate de raciocínio, ex.: "não recomende build sem evidência") precisa ser multicamada: regra no orquestrador + item CRITICAL no checklist + checkpoint `veto` no workflow + reflexo PreToolUse só para a parte mecânica. Hook não julga semântica | 2026-06-20
- Squad de "entrada de funil" (descoberta/validação) entrega mais valor SEM executar: definir `external_handoffs` nomeados no `squad.yaml` para os squads de execução existentes (ADAPT vira handoff, não cópia) — aplicado no Aletheia → Aglaia/Pluto/Harmonia/Caliope/Prometeu/Metis | 2026-06-20
- Gates humanos do Ritual que funcionaram bem via AskUserQuestion: Rodada 0 (escolha de nome) e Fase 4 (aprovação do PRD, Art. III). Manter esses dois como paradas explícitas | 2026-06-20
- `squad.yaml` VIVO (Aletheia/Pheme) usa chaves estruturais em INGLÊS (`squad/name/display_name/tiers/agents/handoffs/external_handoffs/cross_cutting/settings`), divergindo do `modelos/squad-base.yaml` (PT: `nome/dominio/agentes`). Para nova squad seguir a convenção VIVA: chaves em inglês, só prosa/descrições em PT | 2026-06-20
- Fan-out de 3 Explore agents em paralelo abre bem uma criação de squad de domínio novo: (1) fábrica Caos + critérios/scorecard, (2) anatomia de squad viva + runtime Hermes, (3) garimpo externo (GitHub). Reúne todo o contexto antes do Plan agent | 2026-06-20

### Pesquisa de Mercado / Scraping (Argos)
- REUSE existe na camada de RUNTIME, não só no registro de entidades: ANTES de vendorizar repo externo para um agente, checar `Hermes/toolsets.py` (web_search/web_extract/browser_*/x_search/vision_analyze) + MCPs da sessão (Firecrawl/Tavily/Exa/Apollo/Browserbase). Muito do "precisa clonar repo" já é tool nativa. No Argos: base = tools Hermes; vendorizar só anti-bot/stealth (Scrapling), crawl-escala (Scrapy), JS pesado (Crawlee), visão (Skyvern), pesquisa-LLM (GPT-Researcher) | 2026-06-20
- Domínio com risco de compliance/ToS (scraping social): separar FISICAMENTE um `modulo-cinza/` opt-in (`settings.activation.modulo_cinza: false`) com guardrail PreToolUse (HALT sem confirmação) + um especialista-sentinela dedicado como único portão + credenciais em path Infisical segregado (`/kolden/<agente>/cinza/*`). Não descartar a capacidade nem embuti-la no fluxo principal. O apetite de risco é decisão do usuário (AskUserQuestion) | 2026-06-20
- Scorecard `busca-de-referencias`: a dimensão "adoção ≥1000 stars" é trivial para repos de scraping populares — o discriminador real vira ATUALIDADE (último commit/release via `list_releases`) + RISCO (ToS/segurança/typosquatting), não estrelas. Avaliar risco baixo/médio/alto explicitamente por repo | 2026-06-20

### Versionamento / Git
- Workspace `C:\Kolden` é versionado como monorepo no repo privado `Koldenoficial/Kolden` (branch `main`) | 2026-06-20
- Antes de achatar repos `.git` aninhados num monorepo, fazer `git bundle create <nome>.bundle --all` de cada um (backup do histórico) e só então remover o `.git` | 2026-06-20
- Backups dos históricos dos 4 sub-repos antigos (Hermes, Catalogoos, aiox, xquads) ficam em `C:\Users\Ronan Silva\kolden-git-backups\` | 2026-06-20
- Validar ausência de segredos com `git ls-files | grep -iE '\.env|\.pem|\.key|linked-project'` ANTES do primeiro commit — barato e impede vazamento | 2026-06-20

### Armadilhas / gotchas
- Repo remoto dito "vazio" pode não estar — inspecionar com `gh api repos/<o>/<r>/git/trees/main` antes de `--force`; preferir `git merge --allow-unrelated-histories` para não destruir arquivos (ex.: `CLAUDE.md` institucional só existia no remoto) | 2026-06-20
- O reflexo Stop `encerramento-aprendizado` modifica a working tree DURANTE a sessão (apêndice "Ritual de Encerramento" em ~560 agentes) → `git status` mostra centenas de arquivos `M` inesperados; capturar num commit separado | 2026-06-20

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->
- **REUSE inclui a camada de runtime (tools nativas Hermes + MCPs), não só o registro de entidades — checar antes de vendorizar/criar capacidade** | Origem: Caos (Argos), Aletheia, Peitho | Detectado: 2026-06-20

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
