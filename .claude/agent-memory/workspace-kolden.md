# Memória do Agente workspace-kolden (operador-base da raiz C:\Kolden)

> Memória persistente do operador do workspace raiz. Atualizada pelo Ritual de Encerramento.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Ambiente Windows / shells
- O console do PowerShell desta máquina renderiza UTF-8 como cp1252 (mojibake visual, ex.: "Ã‰"=É); os arquivos estão íntegros — confira integridade de UTF-8 com a ferramenta Read, não com a saída de `Get-Content`. | 2026-06-20
- `node` invocado dentro do git-bash NÃO entende paths de mount `/c/...` (vira `C:\c\...` e dá ENOENT); use paths Windows (`C:\...`) para node, ou valide JSON via PowerShell `ConvertFrom-Json`. | 2026-06-20
- O `node` já está disponível na máquina (v24+); scripts mecânicos em lote são confiáveis com `.cjs` + `fs`. | 2026-06-20

### Estrutura dos agentes da Kolden
- Arquivos de agente vivem em pastas cujo basename é `agents/` (e especialistas em `especialistas/`); frontmatter usa YAML aninhado `agent: { id: ... }`. Total ~560 personas. | 2026-06-20
- Dois modelos: clássico (frontmatter YAML, sem MEMORY.md) e AIOX/Prometeu (MEMORY.md canônico em `.aiox-core/development/agents/<id>/MEMORY.md` + reflexos). | 2026-06-20
- Convenções PT-BR do Caos: "habilidades"=skills, "especialistas"=subagents, "reflexos"=hooks (pastas técnicas mantêm nome em inglês). | 2026-06-20

### Reflexos (hooks) do Claude Code
- Padrão anti-loop de Stop hook: guarda `stop_hook_active=true` + marcador por sessão (`.claude/.estado/reflexao-<sessionId>`) garante disparo único sem loop. Verificado nos 4 cenários. | 2026-06-20
- Um Stop hook recém-criado na raiz PODE disparar já na mesma sessão (aconteceu nesta) — em geral, porém, hooks só valem a partir da próxima sessão. | 2026-06-20
- Para edições em massa idempotentes, usar marcador-comentário (`<!-- ritual-de-encerramento -->`) e modo dry-run antes de `--apply`. | 2026-06-20

### Índice AGENTS.md e inventário de agentes
- Contagem OPERACIONAL para o índice = 183 agentes: 161 nos 15 squads (`<Squad>/agents/*.md`) + 12 Prometeu + 10 Caos. Distinto das "~560 personas" do repo inteiro (que incluem arsenais crus em `.claude/_staging/`, xquads, espelhos). Não confundir os dois números. | 2026-06-20
- GOTCHA Prometeu: os 12 agentes do framework AIOX vivem em `Prometeu/.aiox-core/development/agents/` (nomes funcionais: analyst/architect/dev/devops/pm/po/qa/sm/ux-design-expert/data-engineer/aiox-master/squad-creator), NÃO em `Prometeu/agents/`. O índice antigo listava nomes inventados (Orion/Atlas/Aria/Dex...) que não existem — sempre conferir no disco. | 2026-06-20
- Caos tem 10 especialistas internos em `Caos/.claude/agents/` (não 12). Hermes (Nous Research) e Prometeu (`@aiox-squads/core`) são vendorizados — não são squads nativos. `Bloco` na raiz é arquivo órfão vazio (0 bytes). | 2026-06-20

### Verificação de alinhamento doc↔disco ("sem falha de vírgula")
- Método que funcionou: para cada `agents/*.md` real, `grep -qE "^- \`<nome>\` —"` no índice (cobertura 0-faltando); depois contar bullets, achar duplicatas (`sort|uniq -d`) e órfãos (bullet sem arquivo). | 2026-06-20
- GOTCHA do regex de contagem: bullets de NÃO-agentes (ex.: a menção `- \`Bloco\` — ...`) também casam `^- \`nome\` —`. Logo total bruto de bullets (184) ≠ nº de agentes (183). Investigar o "extra" antes de declarar erro — pode ser legítimo. | 2026-06-20
- Não "corrigir" classificação interna defensável quando o total bate (ex.: Aglaia "10 pensadores+4" vs "9+5" — ambos = 15, alinhado ao índice). Mexer seria refatorar de carona. | 2026-06-20

### Preferências do usuário (Ronan)
- Em tarefas de documentação/índice, prefere exaustividade máxima ("1 linha por agente") e alinhamento cruzado entre os 3 níveis: AGENTS.md (índice) ↔ READMEs de squad ↔ CLAUDE.md (memória institucional). | 2026-06-20
- Ao editar CLAUDE.md, preservar §5 (segurança) e §6 (commit policy) intactas; só adicionar/cruzar. Não commitar sem ordem explícita. | 2026-06-20
- **Memória SEMPRE dentro de `C:\Kolden`** (versionável, soberania de dados); NUNCA em `~/.claude/projects/...`. Por projeto, gravar em `Projetos/<Proj>/memoria.md` na raiz; nível-workspace fica em `.claude/agent-memory/`. Regra permanente desde 2026-06-24. | 2026-06-24

### Projetos de cliente / Brandbook (ex.: Rosie em Projetos/)
- O **manual de marca oficial é fonte de verdade** e pode CONTRADIZER o que está no ar no site. Caso Rosie: site usa preto #000/Zen Kaku, mas o manual oficial manda Rose #E6D2DC + DM Sans. Se montar brandbook do site antes do manual, marcar como v1 provisório e refazer quando o PDF chegar. Documentar o gap site×manual como achado (a loja pode não seguir a própria marca). | 2026-06-23
- Estrutura que funcionou para projeto de cliente: `Projetos/<Cliente>/` com `brandbook/` (subpasta por pilar do manual, à risca), `assets/` (páginas renderizadas + curados por tipo), `pesquisa/` (dossiês multi-squad). Frontmatter Kolden + PT-BR em tudo. | 2026-06-23
- Ao receber fonte oficial DEPOIS de inferências: não apagar o raciocínio — anotar bloco "🔄 Reconciliação" no topo com ✔ confirmado / ✗ ajustado: manual diz X; e corrigir links `relacionados` quebrados quando arquivos do brandbook são movidos/renomeados. | 2026-06-23

### Extração/leitura de PDF no Windows (Kolden)
- Read/`pdftoppm` NÃO funcionam aqui ("unsafe location"). Funcionam: `pdftotext -layout` (texto/estrutura) e **PyMuPDF/`fitz`** (`pip` já instalado). Receita: `fitz.open()` → `page.get_pixmap(Matrix(zoom))` salva PNG por página; `doc.extract_image(xref)` extrai imagens embutidas; depois **Read nos PNGs** renderizados para ver páginas só-imagem (logo, mockups). Complementa [[reference_md_para_pdf_windows]]. | 2026-06-23

### Reorganização de pastas e auditoria de caminhos (workspace)
- Movimentações aplicadas 2026-06-23: `Ferramentas/` → `sobre-a-empresa/Ferramentas/`; `agent-memory/`+`registros/`+`_staging/` (da RAIZ) → dentro de `.claude/`; `Projetos/Catalogoos` → `Projetos/CataLogo`. | 2026-06-23
- REGRA DE OURO ao corrigir paths após mover pastas: distinguir **nível-workspace** de **nível-squad**. Cada squad tem seu PRÓPRIO `agent-memory/`, `registros/` e (Caos) `_staging/` na raiz dele → `<projeto>/agent-memory/<id>.md` e `$CLAUDE_PROJECT_DIR/registros` são CORRETOS; só os da raiz do workspace migraram para `.claude/`. Nunca fazer find-replace cego. | 2026-06-23
- Só o hook da RAIZ (`.claude/reflexos/marca-trabalho.sh`) passou a gravar em `$CLAUDE_PROJECT_DIR/.claude/registros`; os `pos-escrita.sh`/`verificacao-diaria.sh` dos squads ficam com `$CLAUDE_PROJECT_DIR/registros` (resolvem para `<squad>/registros/`). | 2026-06-23
- GOTCHA: relatório de Explore agent SUPERDIMENSIONA severidade — classificou ~10 scripts de squad e 16 READMEs como "quebrados" sendo que eram corretos (relativos ao squad). Confirmar por leitura+disco (`find`/`ls`) antes de agir sobre achado de subagente. | 2026-06-23
- Verificar o DESTINO real no disco antes de corrigir um caminho: `C:\Kolden\Backup` não existia e o `.env`/projeto do GHL está DIRETO em `sobre-a-empresa/Ferramentas/GoHighLevel/` (não em subpasta "GHL Automação"). Corrigir para a realidade do disco, não para o que a doc afirmava. | 2026-06-23
- "Exaustivo" ≠ cego: preservar referências HISTÓRICAS (nome de backup "Catalogoos" do sub-repo achatado, clones em `_staging`) que descrevem eventos passados; corrigir só ponteiros ATIVOS. | 2026-06-23
- Testar reflexo isoladamente: rodar o `.sh` com `CLAUDE_PROJECT_DIR` apontando para um dir temp + input JSON simulado por stdin confirma o destino de gravação sem sujar o repo. | 2026-06-23

### Delegação a subagentes (Agent/Workflow)
- GOTCHA: subagente em background pode "travar" achando que está em plan mode e NÃO gravar o arquivo pedido (coletou os dados mas não escreveu). Sempre VERIFICAR com Glob se o arquivo saiu; se faltou, retomar via SendMessage para o `agentId` dizendo "não estamos mais em plan mode, grave agora". | 2026-06-23
- Padrão "usar todos os agents possíveis" = spawnar subagentes em paralelo, cada um incorporando a persona do squad (lendo o `.md`) + ferramentas web reais (firecrawl/exa). Squads de marca: Argos (mercado), Aglaia (posicionamento), Aletheia (persona), Caliope (tom de voz). | 2026-06-23

### Drive compartilhado da Kolden (base de conhecimento de clientes)
- Shared drive da Kolden = ID `0AFk2wbfbKBIMUk9PVA`. Raiz com 7 áreas numeradas: `00 Gestão`, `01 Produtos`, `02 Comercial`, `03 Clientes`, `04 RH & Cultura`, `05 Fundação`, `06 Templates & Ferramentas`. Acesso via MCP google-drive (OAuth ok, scopes completos). | 2026-06-25
- `03 | Clientes` → `01 | Ativos` / `02 | Inativos`. Ativos por modelo de negócio: `01 Assessoria` (12 clientes: Affordable Insulation, Brayan's Finish, Revolution Pro, Mat3vic, Vilela Construction, Rosie, Instituto Saulo Mendes, Clínica Omiron, Vibrações Celestiais, EntreSolos, Freitas Serviços, CataLogo), `02 SaaS` (NutriOS Pro), `03 Infoproduto` (Perpétuo/Lançamento — confirmar se são clientes ou categorias). | 2026-06-25
- Taxonomia interna por cliente (~7 pastas, conteúdo real): `00 Geral` (Contrato/Onboarding/Check-ins c/ transcrições), `01 Brand Assets`, `02 Planejamento Estratégico` (ICP & Posicionamento, Pesquisa de Mercado, Metas & OKRs, Plano de 90 Dias), `03 Conteúdo`, `04 Automações`, `05 Performance & Growth`, `06 Dev Web`, `07 Infra`. Há um template `98 | MODELO — Nome do Cliente`. | 2026-06-25
- Inativos têm aninhamento estranho (`02 | Inativos` DENTRO de Inativos) + arquivos soltos (Pizzaria Margherita, Therafit) e pastas (Paris Store, Sereno, Soul, The Hybrid Growth Factory). Ronan quer triagem caso-a-caso antes de virar base — projetos mortos não devem poluir. | 2026-06-25
- Compilado de clientes mora em `sobre-a-empresa/clientes/` (MD versionado, soberano): `_modelo-dossie.md` (12 seções) + `ativos/<slug>.md` + `inativos/<slug>.md` + `README.md` índice mestre. Guardrail: campo sem fonte = literal "sem registro no Drive" (não inventar contrato/número/métrica — dado de cliente é sensível). | 2026-06-25
- Hermes é runtime de gateways (WhatsApp/Telegram via Baileys), NÃO leitor de Drive em massa. Para varrer/sintetizar Drive: fan-out de subagentes general-purpose (lotes não-sobrepostos → arquivos distintos, sem conflito) + MCP google-drive. Hermes entra só como camada de ENTREGA/notificação. | 2026-06-25
- Leitura do Drive próprio via MCP da empresa é busca INTERNA — não dispara a política de busca web (`gate-busca`); nenhuma WebSearch/Firecrawl envolvida. | 2026-06-25
- ARQUITETURA cliente: duas camadas SEPARADAS e propositais — `sobre-a-empresa/clientes/<slug>.md` = inteligência de negócio (leve, hub, fonte de verdade) e `Projetos/<Nome>/` = execução (pesada: código, brandbook, `node_modules`, git próprio). NÃO unificar: dossiê é o "lugar único" que aponta para o projeto. Ronan confirmou manter as duas. | 2026-06-25
- PONTE cliente↔projeto (convenção criada 2026-06-25): frontmatter `workspace_projeto: "Projetos/<Nome>"` no dossiê ↔ `dossie_cliente: "sobre-a-empresa/clientes/ativos/<slug>.md"` no `leia-me.md` do projeto. Campos OPCIONAIS (6 dossiês-esqueleto sem projeto; projetos internos sem cliente). Caminho relativo: dossiê→projeto `../../../Projetos/...`; projeto→dossiê `../../sobre-a-empresa/...`. Espaço no nome vira `%20` no link MD (`NutriOS%20Pro`). Padrão replicado nos 2 templates (`_modelo-dossie.md`, `_modelo-projeto/leia-me.md`) + coluna "Projeto" 🛠 no `clientes/README.md` + nota no `AGENTS.md`. | 2026-06-25
- Vínculos confirmados pelo Ronan (antes eram "homônimo não confirmado" nos dossiês): Clínica Omiron↔Projetos/Omiron, CataLogo(Tracker Flow)↔Projetos/CataLogo, NutriOS Pro↔Projetos/NutriOS Pro, Rosie↔Projetos/Rosie. Quando o Drive não confirma um vínculo, PERGUNTAR ao Ronan (só ele sabe) — não inferir nem gravar vínculo de cabeça. | 2026-06-25
- GOTCHA Write de arquivo novo com frontmatter+corpo: fácil pôr a info no CORPO e ESQUECER o campo no frontmatter (aconteceu com `dossie_cliente` em Omiron/CataLogo). O GREP do campo após criar pegou a falha — confirma a regra de verificar por GREP, não por "Write deu sucesso". | 2026-06-25
- Projetos de código (Omiron Next.js, CataLogo React) só têm `README/AGENTS/CLAUDE` em inglês do app, sem `leia-me.md` Kolden. Padrão: CRIAR um `leia-me.md` Kolden enxuto (PT-BR, frontmatter Kolden) com a ponte, SEM tocar nos docs em inglês do app; `git status` confirma só arquivos novos. | 2026-06-25

### Ecossistema Google ao vivo (GA4/GSC/GTM/Ads) — validação de dossiês de cliente
- MCP **oficial do Google Ads NÃO fica exposto** só por "adicionar a conta" — exige developer token aprovado + reconexão do servidor `google-ads-mcp` + reload (`/mcp`). Numa sessão dada, varrer a lista de ferramentas (ToolSearch "google ads") ANTES de assumir disponibilidade: hoje só `mcp__synter__*` e `list_google_ads_links` do GA4 aparecem. | 2026-06-25
- **ADC application-default EXPIRA** apesar do consent Internal ("tokens não expiram" vale para os tokens OAuth do MCP, não para o ADC): o ADC de 24/06 16:54 deu `Reauthentication is needed` em 25/06. Reauth verificado (GA4/ferramentas.md:18): `gcloud auth application-default login --client-id-file="C:\Users\Ronan Silva\.config\google-drive-mcp\gcp-oauth.keys.json" --scopes="...cloud-platform,analytics.readonly,webmasters.readonly,tagmanager.readonly"`. É interativo (browser) → só o Ronan roda via `!`. | 2026-06-25
- **GA4** tem MCP dedicado (`google-analytics`); **GTM e Search Console NÃO** — acesso por REST + `gcloud auth application-default print-access-token` (tagmanager/v2, webmasters/v3), como validado em 24/06. | 2026-06-25
- **Synter** (`list_ad_accounts` etc.) responde de forma **assíncrona**: 1ª chamada retorna `job_id` + `status:queued`; reinvocar a mesma tool dá idempotency hit (`reused:true`, `status:succeeded`). É ponte de Ads em USD — mismatch com orçamento BRL do cliente, travar conversão antes de qualquer disparo. | 2026-06-25
- Reforço do gate de busca: leitura first-party de GA4/GSC/GTM/Ads (MCP ou REST/ADC) é dado próprio da empresa → **NÃO dispara `gate-busca`** (só Firecrawl/Exa/Tavily/WebSearch dispara). curl `-I` de health-check no site do cliente também não. Complementa a regra do Drive interno. | 2026-06-25
- Dossiês de cliente montados de Drive+Firecrawl ANTES de conectar as contas têm números "vivos" que na verdade são estáticos (ex.: EntreSolos §9.2 Ads — impression share 12,77%, QS 2–3 — vem do doc Drive "Análise de Métricas", não da API). Ao reconciliar, **rotular fonte+data** e não apagar o histórico sem ter o vivo no lugar. | 2026-06-25
- Verificar RSAs de Google Ads por **script de contagem de char** (não inspeção visual): parser de tabelas MD + listas numeradas; sempre imprimir TOTAIS analisados (não só violações) para provar que parseou — caso EntreSolos: 90 títulos (máx 27/30), 26 descrições (máx 86/90), 12 caminhos (≤15), 0 violações. Reforça [[feedback_traducao_em_lote]]. | 2026-06-25

### Diagnóstico de conexão MCP / checkup pós-troca-de-conta
- **`claude mcp list` dá FALSO NEGATIVO** ("✘ Failed to connect") por **cold-start em massa**: 30+ servers `npx`/`uvx` subindo em paralelo estouram o timeout do healthcheck do `list`. Validar cada suspeito com `claude mcp get <name>` ISOLADO antes de declarar falha. Confirmado 2026-06-26: supabase/v0/github/upstash/apify/railway/google-analytics apareceram ✘ no `list` mas TODOS ✔ no `get` individual. Não "consertar" o que é só contenção de boot. | 2026-06-26
- **Mapa de impacto de troca de conta** (Claude/Workspace): quebra a **ADC do Google** (reauth) e os **conectores claude.ai que dependem de novo OAuth** (Microsoft 365, Slack pediram login em 2026-06-26). NÃO quebra: conectores claude.ai já consentidos (Drive/Gmail/Calendar via OAuth próprio) nem o `google-drive` local (OAuth desktop em `~/.config/google-drive-mcp/tokens.json`, refresh automático). ADC só afeta GA4(uvx)/GTM/Search Console. | 2026-06-26
- **ADC reauth recorreu 2026-06-26** (mesma troca de conta) — fix idêntico ao da linha do Ecossistema Google; o `--client-id-file` correto é `~/.config/google-drive-mcp/gcp-oauth.keys.json` (client_id `1098911614973-7sjl4eq6...` bate com o do ADC; tipo `installed`/desktop). Inspecionar metadados do ADC sem vazar segredo: `python -c "json.load... client_id[:25]"`. | 2026-06-26
- **Duplicatas de catálogo MCP** (conector claude.ai × Infisical/local): maioria IDÊNTICA em tools (Context7 2=2, Exa 2=2, Tavily 5=5, Supabase 29=29 mas Infisical é `--read-only`). Exceções que importam: **Cloudflare** claude.ai 23 tools >> Infisical 3 (`docs/execute/search`); **Google Drive** local ~140 (Drive+Docs+Sheets+Slides+Calendar) >> claude.ai 8. Decisão Ronan 2026-06-26: manter ambos (custo = lista de tools inflada + boot mais lento, mas sem quebra). | 2026-06-26

### Cloudflare via API (zonas de cliente, ex.: EntreSolos)
- O OAuth do **MCP Cloudflare** (conectado como adm@kolden.com.br) lista as zonas do cliente mas pode dar **só leitura** (perms todas `:read`, ex.: `dns_records:read`, sem `:edit`) → escrita exige **API Token escopado** criado no painel (Zone: DNS Edit + Dynamic Redirect Edit + Page Rules Edit + Zone Settings Edit + Zone Read), guardado no Infisical. O do EntreSolos ficou em **env `dev`** como `CLOUDFLARE_API_TOKEN_KOLDEN` (zona `entresolo.com.br` = `b836853c979af5bcc5b25b7e7c2dd3a0`, conta EntreSolos separada da Kolden). | 2026-06-26
- **Redirect apex→www no Cloudflare** = Single Redirect na phase `http_request_dynamic_redirect` (PUT no entrypoint; o body aceita só `{rules:[...]}`, NÃO `kind/name/phase`). Regra: `(http.host eq "apex")` → 301 `concat("https://www.dominio", http.request.uri.path)` + `preserve_query_string`. Endpoint via REST com o token (o MCP cloudflare só tinha leitura). | 2026-06-26
- GOTCHA orange-to-orange (Lovable/Vercel atrás de Cloudflare): se o apex aponta (A, proxied) p/ um origin que **também é Cloudflare** e só tem o `www` como custom hostname, o origin devolve **421 "Project not found"** ANTES da Redirect Rule surtir efeito. Fix = **repontar o A do apex para IP dummy** (`192.0.2.1` TEST-NET, proxied) → remove o orange-to-orange, a Cloudflare passa a tratar o apex como hostname próprio e o 301 dispara no edge (IP dummy nunca é contatado). Diagnóstico decisivo: olhar o CORPO do 421 (página do Lovable = veio do origin) e testar porta 80 (se www dá 301 e apex 421, o apex não está sendo processado pela zona). | 2026-06-26
- Mudança de origin em registro **proxiado** propaga no edge em **~2-3 min** (não é instantâneo nem segue TTL do DNS) — testei como 421 e só depois virou 301. Não concluir "não funcionou" sem esperar a propagação do cache de origin. | 2026-06-26
- Comentário de DNS record no Cloudflare tem limite de **100 chars** (erro 9313). | 2026-06-26
- Mexer no A do apex de cliente em produção dispara o **classificador de segurança** (Modify Shared Resources) mesmo com autonomia ampla — pedir OK específico via AskUserQuestion e registrar o valor de rollback ANTES. Após aprovação, `dangerouslyDisableSandbox:true` no Bash passa a trava. | 2026-06-26

### Auth Google / ADC no Windows (gcloud)
- `ERR_CONNECTION_REFUSED` no callback `localhost` do `gcloud auth ... login` = **proxy automático do Windows** interceptando o loopback. Tanto o ADC quanto o `gcloud auth login` usam o mesmo callback → ambos quebram. Fix: desligar "Detectar configurações automaticamente" no proxy (ou exceção `localhost;127.0.0.1`), rodar em terminal próprio (não via `!`). | 2026-06-26
- Service Account como blindagem (token que não expira, sem browser) esbarra na **org**: API de IAM vinha **desabilitada** no projeto `gen-lang-client-0988823565` e a org pode bloquear chave de SA → não é o caminho rápido. | 2026-06-26
- O **shim do Infisical** lê segredos do **path raiz de cada env**; resolver o nome EXATO no env certo (`--env=dev` vs `prod`). Varrer vários nomes de segredo de uma vez dispara o classificador (Credential Exploration) — pedir ao Ronan o nome+env exatos em vez de adivinhar. | 2026-06-26

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Verificar UTF-8 com Read, não com saída de console PowerShell** | Origem: workspace-kolden | Detectado: 2026-06-20
- **Verificação cruzada doc↔disco por grep (cobertura + duplicatas + órfãos) antes de declarar um índice alinhado** | Origem: workspace-kolden | Detectado: 2026-06-20
- **Ao corrigir paths após mover pastas, distinguir nível-workspace de nível-squad — não corrigir o que é relativo ao projeto ativo** | Origem: workspace-kolden | Detectado: 2026-06-23
- **Confirmar achado de subagente por leitura+disco antes de agir (relatórios superdimensionam severidade)** | Origem: workspace-kolden | Detectado: 2026-06-23
- **Memória de agente SEMPRE dentro de `C:\Kolden` (nunca em `~/.claude/projects`); por projeto em `Projetos/<Proj>/memoria.md`** | Origem: workspace-kolden | Detectado: 2026-06-24

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
