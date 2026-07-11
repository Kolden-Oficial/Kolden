---
titulo: Matriz de reconciliação de gaps abertos
missao: m-20260706-193013-omiron-brandbook-completo
autor: Dike (verificação de completude)
data: 2026-07-06
resumo: >
  Gaps NOMEADOS que a sessão de trabalho do brandbook não fechou — por decisão
  explícita, por dependência externa ou por escopo de próxima rodada. A regra
  Dike é: gap nomeado ≠ falha estrutural. Gap escondido = falha estrutural.
  Este documento cumpre o critério 8 do `criterio_de_sucesso` do Contrato.
principio: >
  Nada aqui bloqueia a reunião 08/07/2026 com Dr. Ariosto SE for tratado como
  proposta viva a discutir na mesa — não como omissão a esconder. A coluna
  "Bloqueio para 08/07" separa o que precisa aparecer no deck de decisão do
  que fica para próxima rodada operacional.
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/brandbook/00-indice|00-indice]]"
---

# Matriz de reconciliação de gaps abertos

## §1. Contexto

Esta matriz é o depósito único de tudo que a missão do brandbook completo do Omiron **não fechou nesta sessão** — por escolha, por dependência externa ou por escopo de próxima rodada. É a resposta ao critério 8 do Contrato: *"Matriz de reconciliação de gaps abertos — nomeada, não escondida."*

A verificação Dike é sobre **completude estrutural**, não sobre mérito. Se um gap está nomeado aqui e uma ação sugerida foi documentada, ele **não bloqueia a subida da entrega**. Se aparecesse escondido, seria degrau de quebra na camada Hermes.

Referência cruzada: cada linha desta tabela corresponde a uma tensão viva também documentada em `brandbook.html §07 Tensões abertas`, `01-posicionamento.md §Gaps declarados`, e/ou `compliance-checklist.md §9 Emendas`.

---

## §2. Matriz

| # | Gap | Estado atual | Responsável | Prazo | Bloqueio 08/07 | Ação sugerida |
|---|-----|--------------|-------------|-------|----------------|---------------|
| G01 | **Iconografia Marco Aurélio (pilar Pensamento)** — sem pins reais no Pinterest do cliente. Orfeu propôs 3 alternativas em `narrativa/alternativa-marco-aurelio.md`. | 3 alternativas escritas, decisão pendente | Dr. Ariosto | 08/07 (na reunião) | **NÃO** — o próprio deck apresenta as 3 alternativas como slide de decisão | Levar as 3 alternativas em slide dedicado do deck. Decisão do Ariosto vira canonização em `01-posicionamento.md` na rodada pós-reunião. |
| G02 | **Maximalismo do brandbook × UX simples do app** — tensão viva declarada por Harmonia. Cliente aspira Montblanc; paciente em episódio agudo precisa de contraste alto e passo curto. | Proposta Harmonia registrada em `03-identidade-visual.md §Tensões` e `brandbook.html §07` | Dr. Ariosto | 08/07 (na reunião) | **NÃO** — apresentar como escolha estratégica, não como falha | Regra proposta a canonizar: *"Marketing e brandbook são maximalistas — clínica erudita. App em uso terapêutico é sóbrio — instrumento de leitura em momento de baixa energia."* Fechar na reunião. |
| G03 | **Textura papiro binária (WebP/PNG 3 densidades)** — hoje o brandbook.html e o deck usam `linear-gradient` como fallback funcional. | Fallback CSS ativo em produção do brandbook e do deck; textura documentada em `design-system/01-fundamentos/grafismos.md` | Harmonia | Próxima rodada operacional (pós-08/07) | **NÃO** — o fallback é aceitável para reunião de decisão de marca | Rodada Harmonia dedicada: gerar textura 1024/2048/4096 px WebP+PNG, sem AI-slop óbvio, com direção de arte de "papiro Alexandria envelhecido, não papel craft moderno". |
| G04 | **Ícones autorais dos 4 pilares em SVG** — hoje o brandbook e o deck usam glifos/badges tipográficos. | Espec de contrato em `design-system/03-componentes/leia-me.md`; sem SVG produzido | Harmonia + direção de arte | Próxima rodada operacional (pós-08/07) | **NÃO** — o glifo tipográfico é aceitável para reunião de decisão | Rodada Harmonia + direção de arte (possível handoff Aglaia): produzir 4 SVGs monolineares, coerentes entre si, aplicáveis em 24/48/96 px. Cada pilar com uma figura icônica (Sansão, Marco Aurélio ou substituto, Psiquê, Hécate). |
| G05 | **Símbolo Omiron em SVG** — brandbook trata "logotipo" em Great Vibes; símbolo/monograma ainda não desenhado. | Regras de uso descritas em `03-identidade-visual.md §Símbolo`; sem arquivo SVG | Harmonia + direção de arte | Próxima rodada operacional (pós-08/07) | **NÃO** — o logotipo Great Vibes basta para reunião | Rodada dedicada: monograma "O" ou lâmina/coluna estilizada. Testar contra "wellness Instagram" (veto) e contra "hospital-cold" (veto). |
| G06 | **Ritual do Quíron no Caos** — mentor solo on-demand com contrato lavrado em 01/07 (`~/.claude/plans/caos-caos-qu-ron-proud-hedgehog.md`), execução pendente. | Contrato lavrado 2026-07-01, sessão dedicada não aberta | Caos (sessão dedicada em `C:\Kolden\Caos\`) | Antes do primeiro paciente-piloto (jul/2026) | **NÃO** — o brandbook define voz e tom canonicamente em `mentor-quiron.md`; o ritual formaliza o agente no Liceu | Abrir sessão `/caos` dedicada. Executar rito de nascimento. Registrar em `Liceu/mentes/quiron.md`. |
| G07 | **NDA formal Kolden ↔ Dr. Ariosto** — reunião 08/07 será conversa erudita sobre PII sensível (perfil dos pacientes-piloto). | Sem documento formal assinado | Ronan + Dr. Ariosto | **Antes de 08/07** — trazer NDA impresso para assinar na mesa | **SIM se não for tratado antes** — sem NDA, informação clínica sensível fica em zona cinzenta | Ronan providencia versão base do NDA Kolden até 07/07 EOD; assinatura em 08/07 no início da reunião, antes de abrir tela. Rota alternativa: NDA leve por e-mail 07/07 + versão formal em 15 dias. |
| G08 | **Revisão jurídica final dos 5 textos canonizados** — termos de consentimento (Tela 1), aviso de IA (Tela 8), disclaimer do resumo mensal, disclaimer do estoicismo/TCC, disclaimer geral em cabeçalho de Instagram. | Textos redigidos por Nomos em `compliance-checklist.md §9` (emendas C8, C9) | Advogado externo (LGPD/CFM) | Antes do primeiro paciente-piloto (jul/2026) | **NÃO** — brandbook e deck não abrem o app na reunião; textos ainda são propostas Nomos | Contratar advogado especializado em saúde digital + LGPD Art. 11. Revisão dos 5 textos + termo de uso do app + política de privacidade. |
| G09 | **Gap ANVISA / classificação SaMD** — o Omiron hoje é engajamento terapêutico (não SaaS Classe II), mas o resumo mensal com "sinais de atenção clínica" (achado C4 do Nomos) pode configurar decision support. | Nomeado em `compliance-checklist.md §8`; risco baixo Fase 1 (5-10 pacientes), risco alto Fase 2 (SaaS B2B 2027) | Nomos + parecer regulatório externo | Antes de Fase 2 (SaaS B2B 2027) | **NÃO** — piloto Fase 1 (5-10 pacientes na Clínica) opera dentro da isenção clínica; ANVISA só entra quando o Omiron sair da clínica-mãe | Emenda C4 do Nomos: reformular §4.4 (resumo mensal) como *visualização de dados autoreportados*, sem correlação clínica automatizada. Antes de 2027, mapear formalmente ANVISA RDC 657/2022 (dispositivo médico software). |
| G10 | **Fontes locais Great Vibes + EB Garamond** — brandbook.html hoje usa Google Fonts como fallback funcional. | Google Fonts embed ativo no HTML | Harmonia | Próxima rodada operacional (pós-08/07) | **NÃO** — Google Fonts renderiza corretamente para reunião | Baixar `.woff2` de Great Vibes + EB Garamond, hospedar em `design-system/04-fontes/`, ajustar `@font-face` no brandbook.html e no deck. Preferido para SEO e offline. |
| G11 | **16 imagens dos pilares que Ariosto enviaria** — combinado na reunião 01/07. | Pendente do próprio Dr. Ariosto | Dr. Ariosto | **Antes de 08/07 (preferível)** ou na reunião | **NÃO** — a ausência das 16 imagens não bloqueia a decisão de marca; bloqueia apenas o refinamento visual do deck | Ronan lembra Ariosto por WhatsApp/Hermes 07/07. Se chegar antes: cabe atualizar 3-4 slides do deck. Se chegar na reunião: pauta próxima rodada. |
| G12 | **Tipografia dos slides 1-17 do deck comercial** — ainda em sans-serif genérica na versão antiga; deck novo em Great Vibes + Garamond está em `apresentacao/index.html`. | Deck novo pronto e no padrão canonizado | Deck já entregue nesta sessão | Nenhum | **NÃO** — resolvido pela Onda 4 | Verificado: o deck do brandbook (14 slides) usa Great Vibes + EB Garamond. Slides antigos do deck comercial (fora desta missão) precisam ser rerenderizados em rodada separada — não é escopo do brandbook. |
| G13 | **Frases históricas 31 por transtorno (Epic E5)** — mencionado no PRD do app, não fecha nesta rodada. | Fora de escopo do brandbook | Orfeu + Nomos (rodada Epic E5) | Rodada Epic E5 do app (fora do brandbook) | **NÃO** — não é entregável do brandbook | Registrar como pendência de conteúdo curatorial na rodada de conteúdo do app. Depende de curadoria de fontes primárias com Nomos revisando. |
| G14 | **Escalas diagnósticas em PDF (Epic E5)** — HAM-A, HAM-D, YMRS, Madres, etc. | Fora de escopo do brandbook | Nomos + Dr. Ariosto (rodada Epic E5) | Rodada Epic E5 do app | **NÃO** — não é entregável do brandbook | Depende de decisão clínica do Dr. Ariosto sobre quais escalas ficam no app do paciente e quais só no dashboard do médico. |
| G15 | **Gravações de meditação (Epic E5)** — trilha sonora orientada para os 4 pilares. | Fora de escopo do brandbook | Rodada Epic E5 do app + direção de áudio | Rodada Epic E5 do app | **NÃO** — não é entregável do brandbook | Depende de direção de tom de voz coerente com o mentor Quíron (não voz "guru", não voz "app fofo"). Handoff futuro para Caliope (tom) + parceiro de áudio. |

---

## §3. Regra de leitura da matriz

- **Coluna "Bloqueio 08/07 = SIM"** — o item precisa ser resolvido antes de a reunião abrir, ou precisa aparecer no deck como decisão a tomar na mesa.
- **Coluna "Bloqueio 08/07 = NÃO"** — o item foi mitigado (por fallback, por escopo declarado, por dependência externa nomeada) e não impede a decisão de marca na reunião.

Nesta rodada, **apenas G07 (NDA)** tem risco de virar bloqueador operacional se não for tratado antes da reunião — e é tratável em 24h.

Todos os demais são **próximas rodadas nomeadas**. Nenhum é omissão.

---

## §4. Log de decisão desta matriz

- **2026-07-06 — Dike:** matriz criada como parte do gate de subida. Consolidou 15 gaps a partir de: `01-posicionamento.md §Gaps declarados`, `03-identidade-visual.md §Tensões`, `compliance-checklist.md §8 Gap ANVISA` e §9 Emendas, `brandbook.html §07 Tensões abertas`, memória Kolden e Contrato de Missão.
- **Próxima atualização:** após 08/07/2026, com as decisões que o Dr. Ariosto tomar na reunião (Marco Aurélio → alternativa escolhida; Maximalismo × UX → regra canonizada; NDA → assinado).
