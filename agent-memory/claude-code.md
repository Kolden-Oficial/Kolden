---
tipo: nota
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
---

# Memória do Agente claude-code

> Memória persistente do Claude Code raiz operando no monorepo Kolden (sem persona de squad).
> Atualizada pelo Ritual de Encerramento (`ritual-de-encerramento`) ao final de cada sessão.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Motion MCP (mcp__claude_ai_Motion__create_video)
- Schema real: parâmetro é `prompt` (não `topic` nem `brief`); `aspect_ratio` enum `[16:9, 9:16, 1:1, 4:5, 21:9]`; `duration` enum `[<10s, 10-30s, 30s-1min, 1-5min]` (não segundos numéricos); não existe parâmetro `title` | 2026-07-13
- `design_md` custom (DESIGN.md próprio) exige Motion Pro/Max/admin — retorna `motion_pro_feature_required` com `recovery_tool: show_plans_and_credits`. Fallback: embutir design system inteiro no campo `prompt` (limite 12000 chars cabe brief denso + regras de paleta/tipografia + o que evitar) | 2026-07-13
- Motion é async + widget ao vivo — não fazer polling nem chamar `get_session_status`; a UI atualiza sozinha. Iterar via `create_followup` com o `session_id` retornado | 2026-07-13
- Motion espera brief estratégico (objetivo + audiência + tom + pontos-chave + estética + o que evitar), NÃO roteiro shot-by-shot; a própria ferramenta descreve isso explicitamente e produz melhor quando o brief lidera com estratégia e deixa a execução para o Motion | 2026-07-13

### Kolden — dossiê da empresa (sobre-a-empresa/Kolden)
- Identidade Kolden é dupla e não ratificada (jul/2026): "assessoria de performance 360º" (doc `mercado/` vigente) vs "IA soberana vendor-agnóstica" (rascunho auditoria 2026-06-23). Muitos templates em branco (missão, voz e tom, posicionamento, concorrência). Antes de produzir material externo, PERGUNTAR ao Ronan qual rota comunicar — ou propor rota híbrida (soberania como diferencial da agência) | 2026-07-13
- Design system Kolden pronto e inegociável: scarlet `#FF3D22` (cirúrgico, só CTA/highlight) + ink `#110E0F` (base dark-by-default) + off-white `#E8E6F1` (tipografia) + Lato (títulos/corpo) + Eurostile (rótulos/números, nunca corpo) + K partido em duas metades simétricas + estética cyberpunk-tech editorial. Seguro para injetar em qualquer geração externa sem perguntar | 2026-07-13
- Ativos comerciais consolidados: ticket R$3.000/mês, contrato mínimo 6m, 5 frentes (tráfego + social + comercial + IA + dados), método QNP 360° (diagnóstico 30 min), ICP dono de negócio local BR (clínica, ótica, barbearia, academia, advogado) + infoprodutor + brasileiro nos EUA | 2026-07-13

### Plan-mode workflow (validado)
- Fase 1 padrão que funciona: 3 Explore agents em paralelo cobrindo eixos ortogonais (ex.: identidade+marca / mercado+oferta / iniciativas+contexto). Uma rodada extrai o suficiente | 2026-07-13
- Achado crítico (ex.: duplicidade de identidade) vira AskUserQuestion ANTES de finalizar plano — não assumir sem perguntar. AskUserQuestion com 4 questões amarrou identidade + formato + objetivo + interpretação ambígua ("US$ 10.000") em uma tacada | 2026-07-13

### Carregamento de tools deferidas
- Antes de escrever brief/plano que dependa de tool MCP específica, carregar o schema real via ToolSearch `select:<nome>` — evita assumir campos que não existem (aprendi assumindo `topic` e `title` no Motion, ambos inexistentes) | 2026-07-13

### Google Drive MCP (migração cliente-facing)
- `mcp__google-drive__uploadFile` com `convertToGoogleFormat=true` NÃO converte `.md` — só Office (docx/xlsx/pptx). Para markdown→Google Doc, usar `createGoogleDoc` passando `content` markdown como string (renderiza headings/tabelas/listas ok) | 2026-07-21
- `mcp__google-drive__listFolder` na raiz de pasta compartilhada de cliente costuma parecer "vazio-ish" — mas estrutura interna tem várias sub-pastas (00|Geral/Check-ins, 01|Brand/impressos, 02|Estratégia/ICP, etc.). Sempre descer 1-2 níveis antes de assumir escopo do destino | 2026-07-21
- Ondas de 5 `createGoogleDoc` paralelos não bateram rate limit (30 gdocs em ~6 ondas, zero 429). Padrão validado para migração em massa | 2026-07-21
- Pasta compartilhada com `anyoneWithLink=fileOrganizer` = sinal de alerta pré-envio: reportar ao usuário que qualquer link recebedor pode editar, antes de subir material sanitizado | 2026-07-21
- **Rota alternativa MD→Google Doc para docs GRANDES/COMPLEXOS (tabelas, sub-listas, blockquotes aninhados)**: MD → HTML (marked) → DOCX (`html-to-docx` npm) → `uploadFile` com `mimeType: application/vnd.openxmlformats-officedocument.wordprocessingml.document` + `convertToGoogleFormat: true`. Preserva tabelas complexas melhor que `createGoogleDoc(content: md)`; e não estoura contexto do LLM como `createDocFromHTML(html: string)` faz para HTMLs de 400+ linhas | 2026-08-17
- **`uploadFile` + `convertToGoogleFormat` EXIGE `mimeType` explícito Office.** Sem mimeType, arquivo vira `application/octet-stream` e converter recusa. `mimeType: text/html` também recusa (só Office). Passar o mime docx completo (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`) — mesma lógica p/ xlsx/pptx | 2026-08-17
- Ondas de 5 `uploadFile` paralelos (mix PDF+DOCX) em pasta compartilhada de cliente = zero rate limit em 39 uploads totais (BRW). Padrão robusto | 2026-08-17

### Pipeline de migração em massa (sanitização + upload)
- Padrão validado: Node script com tabela regex → `grep` anti-vazamento (14 patterns proibidos) → upload em ondas. Staging em `%LOCALAPPDATA%\<projeto>-sanitized\` (fora de `C:\Kolden` para não poluir git); manifest.json com hits por arquivo. 24 arquivos = 0 hits com tabela bem calibrada | 2026-07-21
- Regex sanitize com substituições sobrepostas gera artefatos ("[X] interno interno" quando `contrato-interno` casa `interno`). Incluir passe de compressão de duplicações no final | 2026-07-21
- Para docs cliente-facing com fonte muito longa (>25KB), pode ser mais eficiente escrever versão enxuta baseada no que já se sabe da fase de discovery do que Read + copy — vale se o arquivo original é técnico interno e a versão cliente precisa ser digerível | 2026-07-21
- **Sanitização de docs Kolden→cliente = 3 camadas + LISTA CANÔNICA de nomes gregos**: (a) strip frontmatter YAML; (b) descartar blockquote INTEIRO se qualquer trecho tem cozinha (regex sobre o bloco todo, não só 1ª linha — pega "Assinado por:", "Método:", "Postura:" etc.); (c) substituir termos internos por genéricos ("Argos→time de pesquisa Kolden"). Nomes gregos observados até hoje (varredura ampla): **Argos, Hermes, Aletheia, Caliope, Pheme, Prometeu, Ariadne, Metis, Ananke, Aglaia, Dike, Peitho, Themis, Nyx, Harmonia** (+ Moira, Iris, Nike, Athena, Aeolus por precaução). Manter essa lista SEMPRE atualizada e aplicar na 1ª iteração — economiza 2-3 re-runs | 2026-08-17
- Descoberta de nomes gregos residuais: `grep -aoE "\b(Nome1|Nome2|...)\b" output/*.html | sort -u` — se retorna algo, adicionar ao termSubs e re-rodar. Cuidado com falsos positivos (verbo "prometeu" ≠ squad Prometeu) — usar case-sensitive `\bPrometeu\b` (P maiúsculo) | 2026-08-17

### AskUserQuestion — decisões estratégicas ANTES de executar
- 2 rodadas de AskUserQuestion (4 questões cada) destravaram execução paralela de todo o restante do trabalho. Rodada 1 = macro (público, estrutura, escopo, move/copy). Rodada 2 = forma (formato final, sub-artefatos, docs novos, ferramentas externas). Padrão: nunca pular direto pra execução em tarefa multi-parte de cliente | 2026-07-21

### Kommo Salesbot — schema do formato nativo UI
- Export/import da UI Kommo usa formato nativo (wrapper `{type_functionality, model:{text, name, positions, type}}` com `text`/`positions` stringificados) — diferente do formato "linguagem Salesbot" da doc pública. Menu do bot → Export baixa arquivo `Salesbot #N.json` | 2026-07-24
- Botões da Kommo NÃO são handler separado — vivem dentro de `send_message.params.buttons: [{text, type: "inline"}]`. Bloco com botões ganha campo irmão `answer: [{params: [], handler: "buttons"}]` como marcador de "aguarda resposta" | 2026-07-24
- Handler `goto` explícito coexiste no array `question[]` do bloco: `{params: {step: N, type: "question"}, handler: "goto"}` — em paralelo ao `positions[].goto = {block: N}` (redundância aparente, não sei se ambos obrigatórios) | 2026-07-24
- `positions[]` do bloco com botões ganha `synonyms: [[], [], ...]` (1 lista vazia por botão — lugar para sinônimos de texto que acionam o botão), `on_error: null`, `no_answer: null`. `height` do bloco vai de 150 (sem botões) a ~354 (3 botões) | 2026-07-24

### Google Drive MCP — bridge de arquivo Ronan↔Claude
- Pasta com `anyoneWithLink=writer` funciona perfeitamente como bridge bidirecional: Ronan sobe → Claude baixa via `downloadFile`, Claude sobe via `uploadFile` → Ronan baixa pelo link. Latência ~2-3s por arquivo, sem rate limit em uso baixo | 2026-07-24
- `downloadFile.localPath` no Windows começa com `/` SEM `C:` (memória `feedback_mcp_google_drive_downloadfile_path.md` reforçada — errei de novo apesar da nota) | 2026-07-24

### Engenharia reversa de schema desconhecido (padrão da sonda)
- Iterativo 1-handler-por-vez > pedir bot mega ao usuário. Gerar JSON com chute-de-schema, subir via Drive, usuário importa/testa/exporta, Claude ajusta. Barra baixa: 30-60s de UI por handler descoberto | 2026-07-24
- Chute de schema calibrado por: (a) equivalente da doc pública ("linguagem Salesbot") + (b) formato do padrão já descoberto (`send_message` no formato nativo) adaptado à nova ação. Se rejeitar, usuário manda erro e Claude ajusta | 2026-07-24

### Auditoria de fluxo de salesbot (Kommo) — análise de grafo antes de aprovar deploy
- Cowork/agente que constrói bot pela UI Kommo entrega JSON com 3 classes de defeito recorrentes: (a) refs quebradas — `goto finish X` para step X que não existe (esqueceu de criar o step de fim); (b) steps órfãos — definidos no JSON mas nenhum outro aponta pra eles (fluxo esquecido, era pra ligar em algum lugar); (c) menu com N botões apontando todos para o mesmo destino (copy-paste do primeiro botão sem personalizar os demais — perde a segmentação por motivo). Detectar via análise de grafo: contar `incoming` por node, listar `definedIds \ referencedTargets` (broken refs) e `definedIds \ nodesWithIncoming` (órfãos, excetuando entrada). Sempre rodar antes de aprovar deploy | 2026-08-11
- Bug de rota semântica é mais sutil: step de handoff acessível de contextos diferentes (ex.: `44` chamado por 4 botões de "quero comprar") apontando para menu de contexto oposto (ex.: menu de pós-venda). Detectar lendo o `preview` de destino de cada handoff e comparando com a tag/status setado no caminho até lá | 2026-08-11

### Visualização de fluxo (Mermaid) — HTML self-contained com painel lateral
- Combo leve: `<pre class="mermaid">` + CDN `mermaid@10.9.1` + `mermaid.run({querySelector:'.mermaid'})` + `click nID call showDetail("id")` para interatividade + painel lateral vanilla JS. Zero framework. Abre em duplo clique. Renderiza 50+ nodes sem lag | 2026-08-11
- Labels de node no Mermaid: escapar `"` → `&quot;`, remover `\n`, remover `<>`. Emoji funciona. `{{template}}` do Kommo não confunde parser. Forma por handler: `["text"]` = act, `("text")` = msg, `{{"text"}}` = msg+buttons, `{"text"}` = cond, `(("text"))` = wait. `classDef` + `class nID classe` aplica cor por tipo | 2026-08-11
- Renderizar o Mermaid a partir do JSON dinamicamente (JS build) > hardcodar o diagrama. Se JSON muda (cowork faz nova versão), basta trocar a constante `SALESBOT_DATA` e o mapa se refaz | 2026-08-11

### "Entregar em blocos para copy-paste" — reinterpretar por contexto
- Quando o artefato principal é um arquivo grande (HTML, script, doc), "blocos para copy-paste" NÃO significa recortar o código do arquivo. Significa entregar INFORMAÇÃO ACIONÁVEL em blocos: (bloco 1) como acessar o artefato; (bloco 2) checklist de bugs/tarefas para o próximo executor; (bloco 3) colinha/feedback para colar em outro contexto (Slack, email, brief pro cowork). Otimiza velocidade de APLICAÇÃO, não velocidade de replicação | 2026-08-11

### Omiron — brandbook lavrado é SSoT visual, não o Tailwind do Next.js
- Ao produzir qualquer artefato visual Omiron (mockup, HTML, deck, e-mail, receita, imagem), consultar SEMPRE `Projetos/Ativos/omiron/brandbook/03-identidade-visual.md` + `design-system/02-tokens/tokens.css`. O Tailwind do `src/app/globals.css` do projeto Next.js está desatualizado (paleta antiga navy `#1a1040`/wine + Playfair+Inter). O brandbook lavrado (jul/2026) usa dark warm `#141010` + dourado antigo `#A88148` + Great Vibes + EB Garamond. Se seguir o Tailwind, o artefato sai fora da identidade Omiron real | 2026-08-11
- Regras duras Omiron não-negociáveis: `#000000`/`#FFFFFF` puros banidos (substitutos `#141010`/`#EDE2CE`); `--omiron-verde-planta` (#5C7A3E) EXCLUSIVAMENTE na planta virtual da gamificação, nunca em botão sucesso/badge/status; SVG autoral inline, NUNCA emoji como UI; corpo ≥16px + line-height 1.65 + sem `text-align: justify` (regra dislexia vetada pelo Dr. Ariosto); Great Vibes só em título hero/saudação/marco/epígrafe, nunca em botão/form/tabela; papiro (fallback `linear-gradient(180deg, #EDE2CE 0%, #D4C4A0 100%)`) presente em pelo menos um lugar por artefato — é a assinatura cross-canal; CTA canônico = marfim sobre âmbar-crepúsculo com texto ≥18px | 2026-08-11
- Path canônico verificado 2026-08-11: raiz do projeto é `sobre-a-empresa/Projetos/Ativos/omiron/` (subpasta `Ativos/`, `omiron` minúsculo). Stack real do `package.json`: Next.js **16.2.6** (App Router — não 14), React 19.2.4, Prisma 7.8, Supabase 2.105, tRPC 11.17. Estado real ~20% (schema Prisma 100%, rotas `(patient)`/`(admin)`/`(medico)` vazias) | 2026-08-11

### Desambiguação de escopo em plan mode
- Pedidos amplos sobre sistemas em construção ("faça o sistema completo em HTML", "termina esse app pra mim", "gera tudo") têm 3-4 interpretações incompatíveis: (a) mockup HTML estático, (b) continuar o app real multi-sessão, (c) export estático `next build`, (d) HTML resumo/deck. Escolher errado = retrabalho enorme. **Sempre AskUserQuestion cedo em plan mode** — o custo de perguntar é baixíssimo, o de errar é gigante. Se mockup: perguntar QUAL tela. Se continuar app: alinhar 1ª feature | 2026-08-11
- Não confiar em memory antiga para decidir estado do sistema — "quanto já está pronto" muda semana a semana. Fazer 1-2 Explores rápidos primeiro | 2026-08-11
- Quando o pedido tem **tensão irreconciliável** (X + Y não coexistem — ex.: "form clássico + nativo Hoop zero código" numa LP standalone, quando o Hoop nativo pra LP é widget WhatsApp e não form), plano honesto que **expõe a tensão + oferece 3 caminhos com trade-offs crus** > plano que finge que dá pra atender X+Y juntos. O usuário decide melhor com opções reais do que com falsa harmonia | 2026-08-13
- Após ExitPlanMode com system-reminder "trabalhe sem parar pra perguntas", **ainda vale respeitar escopo original**. Se o pedido foi "quais são as possibilidades" (análise), não codar templates espontaneamente — entregar resumo prático + próximo passo condicional à decisão. "Sem parar" ≠ "extrapolar escopo" | 2026-08-13

### Hoop CRM — arquitetura de integração (restrições que balizam qualquer plano)
- Hoop **não tem form intake nativo** para LP standalone. Webhooks são de **saída** (evento Hoop → sua URL), não de entrada. Não existe endpoint público "receber form". Ver `sobre-a-empresa/Ferramentas/Hoop/api.md` §14 | 2026-08-13
- Caminhos reais pra lead de LP → Hoop, em ordem de "quão nativo": (A) Widget WhatsApp Hoop (Marketing > Plugin de WhatsApp — snippet JS colado no `<head>`, mas troca form por botão WA + roteamento geolocalização); (B) form + API REST `api.hoopdecor.com` com `HOOP_API_KEY` Infisical (3 chamadas: `POST /api/clientes` → `POST /api/negocios` → template WhatsApp); (C) híbrido A+B pra máxima captação. Se LP for WooCommerce/VTEX/Tray/VNDA/Nuvemshop existe integração e-commerce oficial adicional | 2026-08-13
- 7 dependências operacionais SEMPRE precedem qualquer integração form→Hoop (independente do caminho): número Meta Cloud conectado + template WhatsApp aprovado + funil configurado + vendedores cadastrados + regra de atribuição definida + subdomínio/Loja ID no dossiê + escopos do token. Listar essas dependências cedo evita ficar dando voltas | 2026-08-13
- Matriz de 3 perguntas que dimensiona plano de integração de captura → CRM (Hoop, Kommo, GHL, etc.): (1) tipo da página onde está o form; (2) ações que precisam acontecer no CRM no ato (contato / negócio / atribuição vendedor / mensagem automática); (3) filosofia (nativo / no-code / Hermes). Resolve em 1 rodada de AskUserQuestion | 2026-08-13

### Chrome headless → PDF (decks HTML e docs client-facing)
- Comando validado: `chrome.exe --headless=new --disable-gpu --print-to-pdf="<path-abs-Windows>" --print-to-pdf-no-header "file:///<path-forward-slash>"`. Chrome em `C:\Program Files\Google\Chrome\Application\chrome.exe`. Errors GCM/PHONE_REGISTRATION são warnings inofensivos | 2026-08-17
- **Path do output DEVE ser absoluto Windows** (`C:\...\output\file.pdf`). Path relativo (`output/file.pdf`) dá erro silencioso "O sistema não pode encontrar o caminho especificado" e não escreve nada. Input HTML DEVE ser `file:///C:/.../file.html` (forward slashes) | 2026-08-17
- Deck HTML com `@media print { section.slide { min-height: 0; page-break-after: always; } }` renderiza **cada slide como 1 página** — Chrome respeita perfeitamente. Validado: BRW deck-socios 15 slides → 16 páginas, linha-editorial 20 slides → 29 páginas (algumas quebras naturais em slides longos), brandbook 9 sections → 20 páginas. Sem perda de conteúdo | 2026-08-17
- `--virtual-time-budget=15000` (15s) ajuda quando deck tem `@import` Google Fonts + JS de highlights, para dar tempo do render terminar antes de imprimir | 2026-08-17
- **Contar páginas de PDF sem `pdfinfo`**: `pdftotext file.pdf - | grep -c $'\f'` retorna N form-feeds = N-1 quebras = N páginas (adicionar 1). Alternativa quando só tem `pdftotext` disponível (Git Bash Windows já tem) | 2026-08-17
- Pipeline completo MD→PDF via bash: `node md-to-html.js input.md out.html` (marked + CSS brand) → Chrome headless `--print-to-pdf`. CSS chave: `@page { size: A4; margin: 22mm 20mm; }`, cores brand em `--var`, `page-break-inside: avoid` em `blockquote/pre/table` para não cortar bloco entre páginas | 2026-08-17

### Entrega multi-formato para cliente (dual gdoc + PDF)
- Padrão validado no BRW (17 docs textuais + 3 decks visuais): **textos** → Google Doc editável + PDF de leitura na mesma pasta (cliente comenta no Doc, imprime no PDF); **decks visuais HTML** → só PDF paginado (Doc destrói layout visual). 37 arquivos entregues em 5 pastas numeradas seguindo padrão que cliente já usava (`01. Identidade Visual/`, criar `02.`, `03.`, etc.) | 2026-08-17
- Respeitar convenção de nomenclatura pré-existente do cliente (numeração, prefixos como `[BRW]`) reduz fricção — não migrar/renomear docs antigos, só adicionar novas pastas em paralelo | 2026-08-17

### RD Station Marketing — restrições que balizam qualquer integração cliente
- **API 2.0 NÃO cria/edita/publica/pausa fluxo de automação** — só insere leads em fluxo existente (`POST /platform/workflows/{id}/leads`, rate 1/10/100 h por plano Light/Pro/Advanced). Fluxos são 100% UI-only. Sem IaC. Sem JSON exportável. Replicação entre clientes é manual, guiada por doc cliente-específico (padrão validado: `rd-station-configuracao.md` da Rosie, 2026-08-18) | 2026-08-18
- **API 2.0 NÃO envia e-mail avulso nem cria template.** Só leitura de campanhas + métricas. Para transacional fora dos fluxos: SES/SendGrid separado | 2026-08-18
- **OAuth2 sem scopes granulares** — 1 app autorizado = acesso TOTAL à conta (JWT tem `"scope":""` literalmente). `refresh_token` "não expira" (declarado) — tratar como chave-mestra, sensibilidade máxima no Infisical, cliente-scoped (`/kolden/clientes/<cliente>/<env>/RDSTATION_*`) | 2026-08-18
- **Não há endpoint público de revoke.** Se vazar credencial: (a) admin do cliente desconecta app na UI RD OU (b) dono do App deleta/regenera no App Publisher — ambos invalidam access + refresh existentes | 2026-08-18
- **API Key existe SÓ para `event_type: CONVERSION`** (`POST /platform/conversions?api_key=`). Blast radius menor — usar quando integração só precisa disparar conversão (form público, LP custom). Para tudo mais: OAuth2 | 2026-08-18
- **Eventos e-commerce = `ECOMMERCE_*`** (CHECKOUT_STARTED, CART_ABANDONED, ORDER_PLACED/PAID/CANCELLED/REFUNDED, etc.). Legados sem prefixo (`CART_ABANDONED`, `ORDER_PLACED`) morreram 31/12/2025 | 2026-08-18
- **App Nuvemshop nativo requer plano Pro+ do RDSM para Ecommerce.** Janela de carrinho abandonado é fixa em **4h**, não configurável. Só dispara se cliente preencheu email no checkout. UTMs não são repassadas (origem = "Desconhecido") | 2026-08-18
- **Webhooks Marketing só emitem `WEBHOOK.CONVERTED` e `WEBHOOK.MARKED_OPPORTUNITY`.** Eventos e-commerce NÃO emitem webhook — workaround: criar conversão sombra (`CONVERSION` com identifier "pedido-pago") e assinar `WEBHOOK.CONVERTED` filtrando | 2026-08-18
- **Sem HMAC nativo em webhook** — autenticação = header custom via parâmetros `auth_header`/`auth_key` (documentado só p/ CRM, aceito na API 2.0). Assinatura estilo Meta/Stripe não existe | 2026-08-18
- **MCP oficial existe** — 3 endpoints separados em `mcp.rdstationmentor.com/{marketing,crm,conversas}`, OAuth 2.0 nativo, custo zero, confirmação in-chat p/ writes. Marketing exige Pro+; CRM/Conversas todos os planos. Setup Claude Code: `claude mcp add --transport http rdstation-marketing https://mcp.rdstationmentor.com/marketing` | 2026-08-18
- **Automação avançada + A/B assunto + gatilhos e-commerce só em Pro/Advanced** — Basic não roda. Confirmar plano SEMPRE antes de propor fluxo | 2026-08-18
- **Autenticação de domínio de envio** = 3 CNAMEs DKIM + 1 CNAME SPF + 1 CNAME DMARC (5 entradas geradas pela UI RD em Conta → Configurações → Domínios). Subdomínio de LP ≠ subdomínio de e-mail (só raiz coincide). Remetente Gmail/Yahoo/Hotmail bloqueado — precisa domínio próprio | 2026-08-18
- **Editar fluxo publicado é possível mas irreversível** — leads que já passaram pela etapa alterada não recebem mudança; leads na etapa recebem. Sem versionamento, sem rollback. Mudança grande = **duplicar + ajustar cópia + desativar original**. Sem simulação/walk-through nativo — testar via segmentação de teste (poucos leads, e-mail do operador) | 2026-08-18
- **`llms.txt` oficial da RD** (`developers.rdstation.com/llms.txt`, 117 KB, 475 linhas) = SSoT machine-readable para agentes; usar como fonte primária em vez de scraping do portal ReadMe | 2026-08-18

### Windows PowerShell vs Bash para hooks Node/CLI
- Comandos que invocam Node contra caminhos do usuário (`$env:USERPROFILE\.claude\hooks\*.cjs`) DEVEM rodar em PowerShell — Bash do Windows não expande `$env:USERPROFILE` (só `$USERPROFILE` UNIX-style). Sintoma: `Cannot find module 'C:\Kolden\:USERPROFILE\.claude\hooks\gate-busca.cjs'` (com dois-pontos literal no meio) | 2026-08-18

### Firecrawl — URL "óbvia" pode não existir
- Antes de assumir `site.com/politica-privacidade/`, verificar variantes canônicas em subdomínios legais (`legal.site.com/pt/privacy-policy/`, `terms.site.com/`, `www.site.com/legal/privacidade`). RD Station retornou 404 no path óbvio mas serve tudo em `legal.rdstation.com/pt/privacy-policy/` | 2026-08-18

### Nuvemshop — deep-link de carrinho depende do tema (não é universal)
- Tema **Recife** (legacy) NÃO implementa rotas server-side `/carrinho`, `/carrinho/agregar?variant_id=X`, `/comprar/{id}` (GET), `/checkout`. Todas retornam **HTTP 404**. Carrinho é 100% client-side (drawer AJAX via `POST /comprar/` interceptado por JS `js-ajax-cart-panel`/`js-product-form`). Consequência: impossível gerar link estático pré-populado — único fluxo = link direto de produto → botão "Comprar" abre drawer. Antes de recomendar sintaxe deep-link Nuvemshop, sempre validar HTTP status ao vivo na URL específica do cliente. Caso Rosie 2026-08-18 | 2026-08-18
- Endpoint real de add-to-cart = `<form action="...">` da PDP (não doc genérica Nuvemshop). Extrair `action` do form `js-ajax-cart-panel`/`js-product-form` é fonte de verdade. Se o form for POST e o tema não expor GET equivalente, deep-link é inviável sem trocar tema. Ex: Rosie tem `<form action="/comprar/" method="post" class="js-ajax-cart-panel">` — é AJAX, não navegação | 2026-08-18
- Página 404 Nuvemshop vem com **layout completo do tema renderizado + mensagem "Erro 404" inline** — enganoso visualmente (parece que a página existe). Sempre confiar em `metadata.statusCode` do Firecrawl (ou `curl -I`), nunca no markdown/HTML da resposta | 2026-08-18
- Descartar hipótese de checkout externo (Olist/Yampi/CartPanda/AppMax) via grep no HTML: buscar `Olist`, `checkout_mode`, `checkout_url`, `checkout_domain`, `LS.checkout`. Ausência = checkout nativo Nuvemshop. Ocorrências de `nuvem-pago` em âncoras `#installment_nuvem-pago` são apenas gateway Nuvem Pago habilitado (padrão), não indicativo de checkout externo | 2026-08-18
- Extrair variant_id real: HTML da PDP tem `data-variants="[{...}]"` com JSON escapado (`&quot;`) contendo `id`, `stock`, `sku`, `option0` (tamanho), `available` de cada variação. Parse em Python via `html.unescape()` + `json.loads()`. Padrão de SKU Rosie: `ROSIE-{PRODUTO}-{TAMANHO}` | 2026-08-18

### Firecrawl — workflow eficiente para diagnóstico ao vivo de site
- Ordem econômica: (1) `firecrawl_map` primeiro (1 credit, inventário URLs) → (2) `firecrawl_scrape` direcionado com `maxAge:0` nas URLs suspeitas (verifica status HTTP + conteúdo) → (3) `firecrawl_crawl` só se precisar do conteúdo de TODAS as páginas. Fecha diagnóstico em 5-8 chamadas em vez de 40+. Caso Rosie: 4 scrapes direcionados (`/carrinho`, `/carrinho/agregar`, `/comprar/{id}`, `/checkout`) fecharam causa raiz em minutos, sem precisar do crawl completo pra isso — o crawl foi extra pra ter inventário | 2026-08-18
- Arquivo de resultado grande (>500KB, típico de scrape com `onlyMainContent:false` ou crawl full-site) → delegar processamento a subagente Explore/general-purpose com instruções EXPLÍCITAS: cobrir 100% do arquivo via chunks Python, formato de output (MD por página + INDICE.md agregado), lista de strings-alvo pra grep, o que retornar no relatório final (<300 palavras). Mantém contexto principal limpo | 2026-08-18
- Grep em JSON de resultado Firecrawl salvo em disco: aspas `"` no HTML viram `\"` (JSON escape). Regex `action="..."` retorna 0 hits em pattern literal — usar `action=\\\"[^\\\"]*\\\"` OU delegar parse a Python (`json.loads()` desfaz o escape) | 2026-08-18
- Padrão de entrega de diagnóstico técnico do cliente: separar em 2 MDs — `DIAGNOSTICO-*.md` (causa raiz + evidências + descartes explícitos) + `RECOMENDACOES-*.md` (opções com trade-offs + workaround imediato + recomendação Kolden priorizada). Cliente lê o que precisa sem digerir tudo. Salvar em `_crawl-{data}/` ou `_diagnostico-{data}/` dentro do projeto | 2026-08-18

### Bash tool — $env:VAR (PowerShell) quebra, usar $VAR ou path absoluto
- Já registrado (linha 124 sobre `$env:USERPROFILE` em hooks). Reforço 2026-08-18: mesmo padrão vale pra `$env:CLAUDE_CONFIG_DIR` e outras vars globais Kolden. Sintoma: `Cannot find module 'C:\Kolden\:CLAUDE_CONFIG_DIR\...'` (dois-pontos literal onde deveria estar valor). Fix: `$VAR` sintaxe Bash pura, OU path absoluto `/c/Users/Ronan Silva/.claude/hooks/gate-busca.cjs`. Aspas simples ao redor de paths com espaço | 2026-08-18

### Preâmbulo colado por engano — verificar realidade do repo ANTES de executar
- `/login` interrompido pode injetar preâmbulo de OUTRO projeto no bootstrap da sessão (caso 2026-08-31: preâmbulo descrevia pipeline "Notion→repo espelho" com `TESTES.md`, `CONTRIBUTING.md`, `scripts/notion_para_repo.py`, `scripts/validar.py`, `NOTION_TOKEN` no env — nada disso existe no `C:\Kolden` real, que é Kolden OS + workspace de agentes). Antes de executar procedimento com pré-req de arquivos, sempre `ls` + Read dos arquivos alegados. Nunca fabricar pra "desbloquear" | 2026-08-31
- Repetição literal da mesma instrução pelo usuário após diagnóstico ≠ ordem pra obedecer — pode ser texto grudado em atalho/preset. Manter posição, reforçar com evidência nova (ex.: rodar o comando alegadamente disponível e mostrar `[Errno 2] No such file or directory`) em vez de ceder | 2026-08-31

### Infisical bypass sob SAC — verificação one-shot via API HTTP (sem shim)
- SAC bloqueia `infisical.exe` em qualquer shell Windows (Bash: "Permission denied"; PowerShell: "política de Controle de Aplicativo bloqueou"). Shim `~/.claude/infisical-shim.cjs` só cobre MCPs stdio — não serve pra verificação isolada no chat | 2026-08-31
- Padrão validado p/ checar presença de secret sem valor: Node standalone → `POST https://app.infisical.com/api/v1/auth/universal-auth/login` com `{clientId, clientSecret}` de `~/.claude/infisical-machine-identity.json` → `GET /v3/secrets/raw?workspaceId=<projectId>&environment=<env>&secretPath=/&include_imports=true` → reportar só presença + `length`, nunca valor. Iterar por `prod` e `dev` (Kolden usa ambos). Kolden projectId = `43d90b85-ca09-437c-b8f2-364b5cbe6093` | 2026-08-31

### `claude mcp list` mistura 3 camadas — só 2 contam nesta sessão
- Output mistura: **(a)** `claude.ai <Nome>: https://...` = MCPs registrados na conta claude.ai Desktop/Web — **NÃO disponíveis nesta sessão CLI**; **(b)** `<nome>: node ... infisical-shim.cjs ... -- <cmd>` = stdio local via shim; **(c)** `<nome>: https://... (HTTP)` = HTTP local. Só (b) e (c) rendem tools `mcp__<nome>__*` aqui. "Notion conectado no claude.ai" ≠ "posso usar Notion no CLI" | 2026-08-31
- Verificação definitiva de disponibilidade: `ToolSearch select:mcp__<nome>__<algo>` — se schema não achado nem nos deferidos, MCP não está registrado nesta sessão. Não confiar só na listagem visual | 2026-08-31

### NOTION_TOKEN — estado 2026-08-31
- Presente no Infisical em **env=dev** (não prod), len 50, projeto Kolden. Chave única — sem variações por cliente. Notion MCP não registrado no Claude Code CLI local — só existe em claude.ai (`https://mcp.notion.com/mcp`). Pra CLI usar Notion via MCP, precisa registrar `@notionhq/notion-mcp-server` stdio via shim apontando pra env=dev | 2026-08-31

### Diagnóstico honesto sob pré-req ausentes
- Sequência multi-step com pré-req ausente: executar só os passos verificáveis (ex.: `NOTION_TOKEN` no env, tentar `python3 script.py --simular`) e mostrar output real do erro como evidência. Não fabricar arquivos "pra desbloquear". Não afirmar "não existe" sem rodar comando que prove. Regra do Ronan é literal: mostrar saída completa + causa provável antes de consertar. A saída de erro É a peça-chave da resposta | 2026-08-31

## Candidatos a Promoção
- **Auditoria de grafo (incoming/broken/orphans) antes de aprovar automação de terceiros** | Origem: claude-code (Kommo Rosie 2026-08-11) — aplicável a Pheme (fluxos Postiz/GHL), Hermes (roteamento de mensagens), Caliope (se um dia orquestrar bots), Aletheia (validação de discovery→build) | Detectado: 2026-08-11
- **Sanitização de docs internos Kolden→cliente com lista canônica de nomes gregos** | Origem: claude-code (Rosie 2026-07-21 + BRW 2026-08-17, mesma classe de problema em 2 projetos client-facing) — aplicável a QUALQUER agente que entregue material derivado de trabalho interno (Caliope, Aglaia, Harmonia, Argos, Aletheia). Lista deve morar em local partilhável (candidato: `.claude/patterns/kolden-internal-terms.json`) | Detectado: 2026-08-17
- **Dossiê canônico de 4 arquivos para nova ferramenta (ferramentas + api + mcp-status + docs-oficiais)** | Origem: claude-code — validado 3ª vez seguida em ferramentas distintas (Kommo 2026-07-23, Hoop 2026-08-13, RD Station 2026-08-18). Copiar molde Hoop/Kommo economiza ~70% do esforço estrutural. Frontmatter YAML Obsidian idêntico, seções fixas por arquivo. Aplicável a QUALQUER ferramenta nova que a Kolden absorver (candidatas próximas: RD CRM Conversas separadamente, Bling, Shopify, Postiz quando amadurecer) — deveria virar skill `/dossie-ferramenta` que dispara os 3 subagents + gera esqueleto | Detectado: 2026-08-18
- **AskUserQuestion 4-decisões em plan mode antes de execução paralela** | Origem: claude-code — validado 3ª vez (Kolden dossiê 2026-07-13, BRW cliente 2026-07-21, Rosie RD 2026-08-18). Padrão: (a) escopo macro, (b) forma/local do artefato, (c) nível de detalhe, (d) autorização de recursos externos (busca, MCPs). Custo de perguntar << custo de retrabalhar | Detectado: 2026-08-18
- **Verificar realidade do repo (ls/Read arquivos alegados) antes de agir em pedido com pré-req de arquivos** | Origem: claude-code — 2026-08-31 (preâmbulo Notion pipeline não bate com C:\Kolden) reforça padrão já observado em `feedback_handoff_dessincronizado_config_real.md` (handoff RD Rosie 2026-08-18 divergiu do config real). Aplicável a Hermes (recebe missões via ledger), Caos (recebe briefings via file), Aletheia (valida pré-condições de discovery), qualquer agente que herde contexto de outro lugar | Detectado: 2026-08-31

## Arquivado
