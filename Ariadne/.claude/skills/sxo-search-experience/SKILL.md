---
name: sxo-search-experience
description: >
  Use quando uma página "bem otimizada" não ranqueia e a hipótese é desalinhamento
  com o que o Google premia naquela SERP — Search Experience Optimization. Lê a
  SERP "de trás pra frente" para detectar mismatch de tipo de página, deriva user
  stories da intenção de busca e pontua a página por persona. Ponte entre SEO (o
  que o Google premia) e CRO (o que o usuário precisa). Gatilhos: "SXO",
  "search experience", "tipo de página errado", "análise de SERP", "user story",
  "score por persona", "por que minha página não ranqueia", "intent mismatch",
  "wireframe". É uma frente NOVA da Ariadne, que conecta SEO e CRO.
---

# SXO — Search Experience Optimization

Frente nova da Ariadne, e a **ponte natural entre suas duas frentes** (SEO de execução e CRO de página). A auditoria técnica pergunta "a página está saudável?". O SXO pergunta: **"esta página *merece* ranquear para esta keyword, dado o que o Google está de fato premiando na SERP?"**

## Insight central
Uma página pode tirar 95/100 em SEO técnico e ainda assim nunca ranquear porque é o **tipo errado de página** para a keyword. Se a SERP mostra 8 páginas de produto e 2 comparativos, um blog post não rompe — por mais otimizado que esteja. Tipo de página vence otimização.

## Pipeline
1. **Aquisição do alvo:** fetch SPA-aware da URL; extrai title, H1, meta, hierarquia de headings, contagem de palavras, schema, CTAs, mídia. Sem keyword informada, deriva do overlap title∩H1.
2. **SERP de trás pra frente:** para os ~10 primeiros orgânicos, registra tipo de página, formato de conteúdo, profundidade, schema e mídia; registra features da SERP (featured snippet, PAA, anúncios, buscas relacionadas, AI Overview). Calcula o **consenso**: tipo dominante (>60% = consenso forte, 40-60% = misto, <40% = fragmentado), profundidade esperada, schema esperado.
3. **Detecção de mismatch (o núcleo):** classifica a página-alvo na mesma taxonomia da SERP e sinaliza divergência. Ex.: alvo Blog vs SERP espera Produto = CRÍTICO; alvo Produto vs SERP espera Informacional = ALTO. SERP fragmentada = oportunidade de diferenciação.
4. **User stories da SERP:** PAA revela lacunas e medos; copy de anúncio revela gatilhos comerciais; relacionadas revelam a jornada; formato do snippet revela a estrutura de resposta esperada. Gera 3-5 stories citando o sinal de origem.
5. **Gap analysis (7 dimensões):** tipo de página, profundidade, sinais de UX, schema, riqueza de mídia, autoridade (E-E-A-T), frescor → **SXO Gap Score 0-100** (maior = melhor alinhamento).
6. **Score por persona:** deriva 4-7 personas dos sinais da SERP e pontua a página em Relevância, Clareza, Confiança, Ação (25 pts cada). Ordena recomendações pela persona mais fraca (maior oportunidade).
7. **Wireframe (opcional):** gera estado atual (IST) e alvo (SOLL) com placeholders ultra-concretos (não "adicione um CTA", e sim "CTA de preço com selo de economia anual abaixo do hero, link para /precos").

## SXO Score ≠ SEO Health Score
São **separados**: SEO Health = conformidade técnica; SXO Gap = alinhamento página↔SERP. Uma página pode ter 95 de SEO e 30 de SXO (tecnicamente perfeita, estrategicamente desalinhada). Reporte os dois juntos e rotule cada um.

## Saída
SERP landscape (tipo dominante + consenso% + features) → alinhamento de tipo (veredito ALINHADO/MISMATCH+severidade+impacto) → 3-5 user stories → gap analysis 7-dim (SXO Score) → cards de persona → ações priorizadas (corrigir mismatch primeiro) → limitações.

## Handoffs e regras Kolden
- **Argos** (entrada): dados precisos de SERP/posição/volume quando disponíveis. A Ariadne consome.
- **analista-de-cro** (interno): o score por persona alimenta as hipóteses de CRO da página.
- **Caliope** (saída): a reescrita persuasiva conforme o tipo de página correto.
- Roteamento por achado: gap de E-E-A-T → `estrategista-de-conteudo-seo`; schema faltando → `engenheiro-de-schema`; intenção local na SERP → `seo-local-e-mapas`; gap de mídia → `seo-de-imagens`.
- **CRO sem hipótese é veto:** toda recomendação de SXO vira mudança testável (o que muda, por quê, como medir).

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-sxo`, original_author Florian Schmitz — Pro Hub Challenge; + references de taxonomia/persona/user-story/wireframe, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
