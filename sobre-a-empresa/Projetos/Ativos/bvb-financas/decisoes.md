---
id: projeto-bvb-financas-decisoes
titulo: "BVB Finanças — Log de Decisões (ADRs)"
resumo: "Registro cronológico das decisões que moldaram a marca. Foco: o pivô v1→v2 de junho/2026."
categoria: projeto
palavras-chave: [decisoes, adr, log, historico, pivot]
status: rascunho
atualizado-em: 2026-07-06
relacionados: [posicionamento, personas, marca, fundamentos-marca-v1]
tipo: projeto
projeto: bvb-financas
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/bvb-financas/dossie|dossie]]"
---

# Log de Decisões — BVB Finanças

> Uma entrada por decisão relevante (ADR enxuto). Inferido dos documentos originais do cliente + datas de criação.

## 2026-03 — Início: primeiros conteúdos e formação da tese

- **Contexto:** Bruno começa a produzir roteiros para YouTube. Primeiro registro datado é o roteiro "90 dias cartão de crédito" (28/03/2026, .docx, autor Bruno).
- **Decisão:** produzir conteúdo educativo em finanças com viés analítico (números, planilhas, TIR, tabelas de sensibilidade) — não hype, não motivacional.
- **Consequência:** o padrão editorial dos 24 roteiros posteriores herda essa DNA (ver `conteudo.md`).

## 2026-04 — v1 da marca: navy + dourado + persona "Pedro"

- **Contexto:** primeira formalização de identidade. Documentos criados: **Fundamentos da Marca — Fase 1** + **Manual de Marca MVP** + **Briefing Visual para Designer**.
- **Decisão:**
  - **Posicionamento:** "Para o investidor de 25 a 34 anos que já começou mas se sente perdido entre tantos influenciadores... a escola de finanças pessoais que ensina a construir patrimônio de longo prazo com método, clareza e honestidade — sem fórmulas mágicas."
  - **Persona única:** "Pedro, o investidor cansado do ruído" — 28-32 anos, CLT/liberal, R$ 7-15k/mês, já com corretora
  - **Tagline:** "Educação financeira sem fórmulas mágicas"
  - **Paleta:** navy-marinho profundo `#0B2545` + azul médio `#13315C` + dourado sóbrio `#B8860B` + off-white + grafite
  - **Tipografia:** Cormorant Garamond (serifada, títulos) + Inter (corpo)
  - **Logo:** só letra, sem símbolo — "BVB FINANÇAS" tracking amplo, estilo editorial (Suno, The Economist)
  - **Referência família visual:** Goldman Sachs, JP Morgan, The Economist, McKinsey, Empiricus, Suno
  - **Arquétipo:** O Sábio + O Cara Comum
  - **6 adjetivos do tom:** claro, honesto, direto, calmo, confiante, analítico
- **Alternativas consideradas:** (não documentadas)
- **Consequência:** conjunto completo de PDFs de referência produzidos (Fundamentos, Manual MVP, Briefing Visual). Base ficou registrada e permanece em `assets/pdfs/`.

## 2026-04-21 — Aulas do Método Raiz da Riqueza gravadas

- **Contexto:** Luciano grava 4 aulas do curso principal (Cdp e Cdf, Dívidas, Farol, Fluxo 360 — todas MOV/MP4 em 21/04/2026). Bem-vindo ao Método (662 MB) e Estágios também.
- **Decisão:** o Método Raiz da Riqueza é o **produto principal** — arquitetura em 8 passos (P.G.A. — Planejamento → Gestão → Acompanhamento) com frameworks proprietários (RPN/RPP, PEP níveis 1-3, Fluxo360, Farol Financeiro, Círculo da Prosperidade, Radar da Rentabilidade).
- **Consequência:** planilha Excel de 18 abas se firma como o backbone técnico do curso e, possivelmente, do futuro Sistema BVB (ver `sistema.md`).

## 2026-06 — **PIVÔ ESTRATÉGICO v1→v2** (decisão mais importante)

- **Contexto:** Bruno reconhece que o posicionamento v1 (educação financeira para investidor CLT jovem) está no **oceano vermelho** — competir com Me Poupe!, Primo Rico/Finclass e Cerbasi de frente é caro e exaustivo. Todos falam para PF genérica.
- **Decisão:** reescreve toda a estratégia de marca em quatro documentos densos (Doc Estratégico 01 Posicionamento, 02 Personas, 03 Concorrência, e Tom de Voz). Mudanças-chave:

  | Aspecto | v1 (abr/2026) | v2 (jun/2026) |
  |---|---|---|
  | **Público** | Investidor PF, CLT jovem "Pedro" | Dono de MEI + pequeno empresário |
  | **Categoria** | Educação financeira | Empresa como veículo do patrimônio (categoria nova) |
  | **Persona única** | "Pedro, o investidor cansado do ruído" | **DUAS**: "MEI sufocado" + "Empresário em transição" |
  | **Slogan** | "Educação financeira sem fórmulas mágicas" | "A empresa é o meio. Você é o fim." (+ reserva "Não é sobre faturar mais. É sobre sobrar mais.") |
  | **Diferencial central** | Método + clareza + longo prazo (vs hype) | + **PJ como veículo da PF** (nenhum concorrente liga isso) |
  | **Traços do tom** | 6 adjetivos (claro, honesto, direto, calmo, confiante, analítico) | 6 traços expandidos: sereno, honesto, claro, racional, **generoso**, **leve** |

- **Alternativas consideradas:** (não documentadas explicitamente, mas o Doc de Concorrência mostra que Bruno mapeou todas as categorias antes de escolher — "os grandes influenciadores" seriam a v1 continuada; "instituições" seriam Sebrae; a decisão foi criar um quadrante próprio)
- **Consequência:**
  - Persona "Pedro" e tagline "sem fórmulas mágicas" ficam obsoletos
  - Todo o conteúdo dos 24 roteiros existentes (100% para investidor PF) fica **desalinhado com a nova tese** — precisa produzir novos roteiros focados em PJ, pró-labore, separação PF/PJ (ver `conteudo.md` seção "Gap crítico")
  - Identidade visual v1 (navy + dourado) precisa ser refeita (ver decisão 2026-06-28)

## 2026-06-26 — Luciano cria a Central de Senhas

- **Contexto:** operação começa a formalizar contas (Gmail bvbfinancas@, TikTok, X).
- **Decisão:** documentar credenciais numa Sheet compartilhada.
- **Consequência:** ficou frágil (sem gerenciador, sem 2FA, texto claro). Ver `operacoes.md` para riscos.

## 2026-06-28 — v2 da identidade visual: verde + cobre + anéis de crescimento

- **Contexto:** com a v2 do posicionamento definida, a estética v1 (navy + dourado + estilo editorial dos bancos) contradiz o novo lugar. "Quando todo mundo é sóbrio do mesmo jeito, a sobriedade deixa de comunicar 'sério' e passa a comunicar 'mais um'."
- **Decisão:** direção **"Tempo & Método"**:
  - **Paleta primária:** Verde Patrimônio `#1C3A30` + Cobre Queimado `#B5683C`
  - **Cores de apoio:** Verde Sálvia `#335848`, Areia Quente `#F2EEE6`, Grafite Quente `#44423D`
  - **Proporção 60-30-10** (Areia / Verde Patrimônio / Cobre)
  - **Tipografia:** Spectral (serifada, substituindo a Cormorant Garamond) + Inter (mantida)
  - **Logo:** símbolo + nome — símbolo são **anéis de crescimento** com semente central em cobre (juros compostos virando imagem); "BVB" em Spectral bold, "FINANÇAS" em Inter tracking amplo
  - **2 versões do símbolo:** anéis abertos (uso geral) + medalhão fechado (usos formais)
- **Alternativas consideradas:** manter navy + dourado (rejeitada por não diferenciar); usar seta de crescimento (rejeitada por dizer só "sobe" — anéis dizem "leva tempo, e o tempo é o ativo"); usar Cormorant (rejeitada por ser default demais); opções decorativas (rejeitadas por brigarem com a serenidade)
- **Consequência:**
  - **Brand board HTML** finalizado (`assets/identidade-visual/BVB_brand_board_tempo_e_metodo.html`)
  - Manual v1 (PDF) fica em `assets/pdfs/` como registro histórico — não canônico
  - Refinamento profissional dos vetores fica como **pendência** (Manual v2 explicitamente pede designer para entrega final em SVG/PNG/PDF)

## 2026-07-06 — Onboarding Kolden

- **Contexto:** Ronan (Kolden) inicia consolidação do dossiê para tomar posse do conhecimento do cliente. Cria este workspace em `Projetos/bvb-financas/` a partir do Drive compartilhado.
- **Decisão:** reescrever tudo em Markdown estruturado (dossier + docs derivados) para independência do Drive e clareza para futuros agents/subagents.
- **Consequência:** este workspace passa a ser a **fonte de verdade da Kolden** sobre o cliente. Escopo Kolden ainda por definir (ver `status.md`).

---

## Decisões em aberto (aguardando entrada do cliente ou da Kolden)

1. **Escopo Kolden** — o que a Kolden vai entregar (branding? conteúdo? sistema? tudo?)
2. **Refinamento vetorial do logo v2** — quando contratar designer sênior (v2 diz "quando tiver receita/audiência validada, 6 meses ou primeiro curso vendido")
3. **Plano de funil e jornada de conteúdo** — listado como pendente no Doc do Luciano
4. **Calendário editorial formal** — 24 roteiros + roteiros da nova tese, sequenciados
5. **Métricas e KPIs** — CAC, LTV, conversão
6. **Instagram** — decidir se ativa
7. **Sistema BVB** — ler a Proposta e decidir se a Kolden entra no desenvolvimento (ver `sistema.md`)
