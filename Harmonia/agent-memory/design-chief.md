# Memória do Agente design-chief (Harmonia)

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Identidade visual da Kolden (fatos verificados)
- Paleta oficial: scarlet `#FF3D22` (primária), ink `#110E0F` (base/fundo), off-white `#E8E6F1` (apoio), branco `#FFFFFF` | 2026-06-22
- Fontes: Lato (principal, tudo que se lê) + Eurostile (apoio/detalhe, NUNCA corpo). Eurostile é comercial → fallback web: Saira/Rajdhani | 2026-06-22
- Símbolo: "K" partido em duas metades = simetria + ecossistema. Logo padrão = horizontal "KOLDEN" | 2026-06-22
- Tom: escuro por padrão, contraste alto, acento scarlet cirúrgico, estética tech/cyberpunk (moodboard Y-3/ghost) | 2026-06-22
- Origem: apresentação de identidade de guilherme asla, ago/2023 (Ronan Sérgio cliente) | 2026-06-22
- Design System mora em `sobre-a-empresa/marca/design-system/` (não em Harmonia/); kit = fundamentos+tokens+componentes+aplicações+assets | 2026-06-22

### Decisões de acessibilidade (WCAG, calculadas sobre os hex reais)
- Botão primário = scarlet + texto INK (5.43:1, AA). Texto branco sobre scarlet só dá 3.53:1 (AA-large) → proibido em rótulo pequeno | 2026-06-22
- Scarlet sobre off-white = 2.86:1 → REPROVA para texto; só logo/grafismo grande | 2026-06-22
- Texto de leitura: off-white/branco sobre ink (15–19:1, AAA) | 2026-06-22

### Método de extração de identidade a partir de PDF/Drive
- WebFetch só lê NOMES de pastas do Drive, não pixels/valores → exigir download local antes de extrair | 2026-06-22
- Read tool não renderiza PDF aqui (falta poppler/pdftoppm). Solução: `pip install PyMuPDF` → renderizar páginas para PNG → Read visual + `get_text()` | 2026-06-22
- Cores exatas: amostrar pixel do pixmap (PyMuPDF) em vez de confiar só no texto. Fills dos SVGs via grep `fill="#..."` rotulam variações por cor | 2026-06-22
- Verificação visual de UI: Chrome headless (`chrome.exe --headless=new --screenshot`) existe na máquina do Ronan → renderizar HTML e Read o PNG. `--window-size=1200,9500` captura página longa inteira | 2026-06-22
- GOTCHA logo: nomes dos arquivos em `originais/03-logo/SEM FUNDO` são inconsistentes (HORIZONTAL vs símbolo trocados entre cores). Sinal CONFIÁVEL: nº de `fill="#"` no SVG → 7 = logotipo "KOLDEN", 2 = símbolo "K". Sempre Read o PNG antes de rotular, não confiar no nome | 2026-06-22
- Logo curado correto: `kolden-logotipo-{cor}` (palavra) e `kolden-simbolo-{cor}` (K), 3 cores cada (offwhite/ink/scarlet), SVG+PNG | 2026-06-22
- HTML com asset de nome com espaço → usar `%20` no src (ex.: `SL%2024.png`) | 2026-06-22
- Brandbook navegável: `marca/design-system/brandbook.html`, single-page, consome `02-tokens/tokens.css`, JS vanilla (copiar-hex + scrollspy IntersectionObserver), zero hex hardcoded no conteúdo | 2026-06-22
- Landing showcase: `marca/design-system/showcase/index.html` — copy oficial do site antigo (kolden-growth.lovable.app) extraída via `chrome --headless --dump-dom` (SPA, WebFetch só pega o title) | 2026-06-22
- GOTCHA render headless: `min-height:100vh` infla quando a janela de captura é gigante (100vh = altura da janela) → empurra a página. Para verificar full-page, gerar CÓPIA no scratchpad com vh fixado (ex.: 760px) e ajustar caminhos relativos | 2026-06-22
- GOTCHA: hack de `margin-top` negativo p/ capturar seção de baixo QUEBRA elementos `position:fixed` (grão/overlay viram blocos brancos). Melhor isolar a seção (remover as anteriores do HTML) e renderizar limpo | 2026-06-22
- BUG/gotcha CSS: `<button class="qa">` estilizado com seletor `.qa button{}` NÃO casa (procura button DENTRO de .qa) → botão fica com estilo nativo (bg #f0f0f0, texto preto, cantos) = "retângulos claros". Correto: `.qa{}` ou `button.qa{}`. Sempre conferir descendente vs elemento. Diagnóstico via getComputedStyle no `<title>` + `--dump-dom` | 2026-06-22
- Diagnóstico headless preciso: injetar `window.onerror`/`getComputedStyle` reportando no `document.title` e ler via `chrome --dump-dom | grep title`. Cuidado: ao isolar seção p/ teste, não deixar JS órfão (ex.: `cookie.querySelectorAll` com elemento removido = TypeError que mascara o resto) | 2026-06-22
- Copy do Ronan/Kolden: posicionamento = Sistema de Crescimento Inteligente (6 pilares: Estratégia, Tráfego, Dados, Automação, IA, Psicologia de Conversão); ICP fatura >R$50k/mês; método 90 dias (Fundação/Tração/Escala) | 2026-06-22

### Convenções de sobre-a-empresa (cérebro da Kolden)
- Todo .md tem frontmatter: id, titulo, resumo, categoria, palavras-chave, status(rascunho|vigente|arquivado), atualizado-em, relacionados | 2026-06-22
- Índice duplo: `indice.yaml` (máquina) + `leia-me.md` (humano) — atualizar AMBOS ao adicionar docs | 2026-06-22
- Tokens com fonte única de verdade (tokens.json DTCG) → propagar p/ tokens.css + tailwind; verificar sincronia por script | 2026-06-22

### Auditoria de marca conjunta Aglaia×Harmonia (2026-06-23)
- Health score da marca = 4.5/10 ASSIMÉTRICO: visual ~7.8 (maduro) vs. verbal/estratégico ~2.6 (vazio) vs. governança ~3.7. Diagnóstico-síntese: "carroceria de marca sem motor de significado" | 2026-06-23
- CONFLITO detectado: a narrativa "Sistema de Crescimento/impulsionadora-de-LTV" (registrada acima, linha do site antigo) CONTRADIZ a identidade "IA soberana/vendor-agnóstico" do CLAUDE.md §1. Os dois coexistem; `tom-visual.md` (vigente) carrega a de crescimento. Decisão de foco é do Ronan (item 0.1 do roadmap), pendente | 2026-06-23
- Maturidade pelas 3 lentes de Malouf: Ofício=Definido(3), Processo=Emergente(2), Pessoas=Emergente(2). GARGALO é Processo/Pessoas, não Ofício → recomendar MAIS componentes antes de governança é anti-padrão | 2026-06-23
- Sinal de NÃO-adoção do design system: projetos reais (omiron, CataLogo) usam shadcn/ui, não os tokens Kolden → DS existe como artefato mas sem prova de uso. Validar adoção com piloto, não presumir | 2026-06-23
- Tokens: starter HTML é funcional real (não vazio), mas falta camada `component.*`, CI Style Dictionary (sync é manual → drift de line-height/letter-spacing no Tailwind), estado loading e tema claro tokenizado (dark-only hoje) | 2026-06-23

### Método de auditoria/orquestração (verificado nesta sessão)
- Padrão que funcionou: escrever GUIA COMPARTILHADO (rubrica 0-10 + classificação preservar/corrigir/reconstruir + template de achado com evidência por caminho) ANTES do fan-out → saídas de subagentes comparáveis e agregáveis | 2026-06-23
- Fan-out cruzado: 1 subagente por frente, cada um encarnando agentes dos DOIS squads (lente Aglaia + lente Harmonia) lendo a definição como molde → diagnóstico mais rico que lente única | 2026-06-23
- Verificar por GREP sobre o resultado (frentes presentes, ambas lentes, IDs de achado rastreados ao roadmap), não por relatório de subagente | 2026-06-23
- GOTCHA não-regressão: subagentes general-purpose têm Write e podem tocar arquivos fora do escopo → instruir "só escreva em <pasta>" E conferir `git status` no fim. Distinguir alteração pré-existente por TIMESTAMP (`stat`/`git diff`) antes de assumir que um subagente alterou um vigente | 2026-06-23

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Renderizar PDF/HTML via PyMuPDF + Chrome headless para "enxergar" artefatos visuais e verificar render** | Origem: design-chief, (potencial) visual-generator, ui-engineer | Detectado: 2026-06-22
- **Guia compartilhado (rubrica+template) antes do fan-out + verificação por GREP sobre o resultado** | Origem: design-chief, brand-chief, (workspace) tradução-em-lote, construção-de-squad | Detectado: 2026-06-23

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
