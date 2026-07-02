---
name: baidu-seo
description: >
  Estratégia de SEO para o Baidu — o buscador que ainda domina descoberta em Mandarim
  na China continental. Use quando a marca precisar aparecer no Baidu (site próprio,
  landing page, e-commerce ou campanha B2B na China) e o pedido envolver "ranquear no
  Baidu", "SEO na China", "baiduspider", "ICP filing", "mobile-first China" ou o
  ecossistema 百科/知道/贴吧/文库/经验. Cobre pré-requisitos legais (ICP), diferenças
  técnicas vs. Google, otimização mobile-first e mapa de presença no ecossistema Baidu
  (Baike, Zhidao, Tieba, Wenku, Jingyan). NÃO substitui a Ariadne para SEO ocidental —
  esta habilidade cobre o mercado China, que tem regras próprias.
metadata:
  type: reference
---

# Baidu SEO — descoberta orgânica no maior buscador em Mandarim

O Baidu detém a maior fatia de busca orgânica na China continental. Ranquear nele exige
tratar 4 coisas que não existem no Google: **filing legal (ICP)**, **hospedagem/CDN
dentro da China**, **crawler próprio (Baiduspider)** e **um ecossistema paralelo** de
propriedades do próprio Baidu (Baike, Zhidao, Tieba, Wenku, Jingyan) que capturam a
maior parte das SERPs informacionais.

## Passo 1 — Pré-requisitos legais e de infraestrutura (gates)

Sem estes 4 itens, ranquear no Baidu é praticamente impossível — o buscador prioriza
sites com ICP válido e latência baixa a partir da China.

1. **ICP Filing (备案)** — obrigatório para hospedar site com público na China. Dois
   níveis: **ICP备案** (site institucional) e **ICP许可证** (site comercial/e-commerce).
   Sem ICP, hosts chineses (Aliyun, Tencent Cloud) não hospedam; e Baidu penaliza.
2. **Hospedagem/CDN local** — servidor em Pequim/Xangai/Guangzhou/Hong Kong, ou CDN
   com PoPs na China (Alibaba Cloud CDN, Tencent Cloud CDN, ChinaNetCenter). Latência
   > 500ms mata ranking.
3. **HTTPS + HTTP/2** — Baidu premia HTTPS desde 2015; HTTP/2 acelera mobile.
4. **Sitemap XML + Baidu Ziyuan (百度搜索资源平台)** — o "Search Console" do Baidu.
   Submeter sitemap, requisitar indexação, monitorar erros de crawl.

## Passo 2 — Otimização mobile-first (regra dura)

Baidu é mobile-first desde 2017 (antes do Google). Mais de 90% das buscas vêm de mobile.

- **AMP / MIP (Mobile Instant Pages)** — MIP é o "AMP do Baidu"; páginas MIP têm
  ranking-boost em SERP mobile.
- **Peso da página < 500KB above-the-fold**; LCP < 2.5s em rede 4G chinesa.
- **Fontes**: não use fontes ocidentais (Google Fonts é bloqueado). Use fontes chinesas
  hospedadas localmente ou webfont via Alibaba Fonts.
- **Viewport correto** (`<meta name="viewport" content="width=device-width">`) e tap
  targets ≥ 44px.

## Passo 3 — On-page e técnica (diferenças vs. Google)

| Elemento | Google | Baidu |
|---|---|---|
| Title | 60 chars | 32 chars (SERP corta) |
| Meta description | 150 chars | 78 chars |
| H1 | Um por página | Um por página (Baidu penaliza mais múltiplos H1) |
| Keyword density | 1-2% ok | 2-8% aceito (Baidu ainda pesa densidade) |
| Anchor text | Descritivo | Descritivo em Mandarim; evite pinyin puro |
| Backlink authority | Muito peso | Peso menor; peso do ecossistema Baidu é maior |
| Structured data | Schema.org | Baidu Open Data (formato próprio) — opcional |
| Alt image | Peso médio | Peso alto (Baidu é fraco em OCR de imagem) |

**Regras de Mandarim:** títulos em Simplified Chinese (não Traditional, salvo TW/HK).
Segmentação de palavras (分词) é feita pelo Baidu; escreva frases naturais, não force
delimitadores.

## Passo 4 — Mapa de presença no ecossistema Baidu (百科/知道/贴吧/文库/经验)

Cerca de 40-60% dos primeiros 10 resultados de queries informacionais em Mandarim são
propriedades do próprio Baidu. Ranquear "pelo site" sem estar presente no ecossistema é
desperdiçar SERP.

| Propriedade | O que é | Uso estratégico |
|---|---|---|
| **Baidu Baike (百科)** | "Wikipedia do Baidu" | Verbete institucional da marca — precisa fonte oficial e citações neutras; edições parciais são rejeitadas |
| **Baidu Zhidao (知道)** | Yahoo Answers do Baidu | Fazer + responder perguntas do nicho; conta pessoal com histórico (não spam) |
| **Baidu Tieba (贴吧)** | Fóruns por tópico | Criar/moderar tieba da marca; engajamento em tiebas afins |
| **Baidu Wenku (文库)** | Repositório de documentos | Whitepapers, guias, PDFs institucionais — vira SERP para queries longas |
| **Baidu Jingyan (经验)** | "How-to guides" | Tutoriais passo-a-passo com print — ótima captura de query "como fazer X" |

**Regra:** para cada keyword-alvo, mapeie os 10 primeiros resultados. Se 4+ são propriedades
Baidu, sua estratégia tem que incluir presença nelas — não apenas o site próprio.

## Passo 5 — Crawler, indexação e Baidu Ziyuan

- **Baiduspider** é o crawler oficial. Verifique acesso via `robots.txt` (permitir
  `Baiduspider`) e logs (User-Agent `Baiduspider/2.0`).
- **Baidu Ziyuan** (`ziyuan.baidu.com`): submeter sitemap; usar API de submissão de URL
  em tempo real (equivalente ao Indexing API do Google) para conteúdo novo.
- **URL push automático** — Baidu recomenda embutir `push.js` da própria plataforma para
  submissão automática a cada page-view.
- **Data de publicação** em `<meta name="publishdate">` — sinal de freshness que Baidu lê.

## Passo 6 — Backlinks e autoridade

- Prefira backlinks de domínios `.cn`, `.com.cn`, `.gov.cn`, `.edu.cn`.
- Portais autoritativos: Sina, Sohu, Netease, People's Daily (人民网), Xinhua (新华网).
- Baidu penaliza fazendas de link agressivamente; PBN estilo Google é morte certa.
- Guest posts em portais verticais chineses (36Kr, Huxiu, TMTPost) — alto peso B2B/tech.

## Compliance & risco

- **ICP filing** é obrigatório para site hospedado na China; para site fora, Baidu
  ainda indexa mas sem boost. Sem ICP, e-commerce transacional é bloqueado.
- **VPN não é canal legítimo** — publicar via ferramentas oficiais e conta de PJ chinesa
  ou parceiro local; não gerenciar Baidu Ziyuan de IP fora sem consentimento do titular.
- **Censura ativa** — evite conteúdo tocando política, saúde não regulamentada (medicamentos
  sem registro CFDA), jogos de azar, "conteúdo sensível". Baidu remove por análise
  automatizada + denúncia; recuperar ranking pós-remoção é lento.
- **Segredos** (API key do Baidu Ziyuan, credenciais de push) via Infisical — nunca
  hardcoded (skill `infisical-padrao`).

## Fluxo padrão da skill (resumo)

1. **Gate**: cliente tem ICP? Hosting/CDN na China? Se não, primeiro item do plano é
   resolver isso.
2. **Auditoria mobile-first** da página-alvo (MIP, LCP, tap targets, fontes locais).
3. **On-page em Mandarim** (title 32ch, meta 78ch, H1 único, alt em Mandarim).
4. **Mapa de SERP** (top 10 por query — quantos são Baike/Zhidao/Tieba/Wenku/Jingyan).
5. **Plano de presença** no ecossistema Baidu (verbete Baike, resposta Zhidao, tieba,
   Wenku, Jingyan) alinhado ao gap de SERP.
6. **Configurar Baidu Ziyuan** — sitemap, push.js, monitoramento.
7. **Plano de backlinks** (portais verticais chineses).
8. **Report + KPIs**: cobertura de SERP, cliques Baidu Ziyuan, posições por query,
   presença no ecossistema.

## Checklist da skill
- [ ] ICP filing confirmado (ou plano de aquisição)
- [ ] Hosting/CDN em PoP chinês, LCP < 2.5s em 4G
- [ ] MIP ou versão mobile ultra-leve implementada
- [ ] Title ≤ 32ch, meta ≤ 78ch, H1 único, alt em Mandarim
- [ ] Baidu Ziyuan cadastrado + sitemap submetido + push.js instalado
- [ ] Mapa de SERP com % de propriedades Baidu identificado
- [ ] Plano de presença no ecossistema (Baike/Zhidao/Tieba/Wenku/Jingyan)
- [ ] Credenciais no Infisical

## Handoffs
- **Caliope** para copy em Mandarim de alta persuasão.
- **`publicacao-social`** (Pheme) para publicação em WeChat OA / Weibo linkando ao artigo.
- **`china-localizacao-gtm`** para gates GTM P0-P5 quando é entrada nova de mercado.
- **Ariadne** — SEO ocidental (Google/Bing) permanece com Ariadne; interface documentada
  para casos globais que precisem também de Baidu.

## Fontes
- Baidu Ziyuan (Search Console): https://ziyuan.baidu.com
- Baidu Webmaster Guidelines: https://ziyuan.baidu.com/college/
- MIP (Mobile Instant Pages): https://www.mipengine.org
- ICP filing (Ministry of Industry and Information Technology): https://beian.miit.gov.cn

---

**Absorção:** cobre MKT-G13 (Baidu SEO Specialist) + MKT-G14 (mapa de presença no ecossistema Baidu 百科/知道/贴吧/文库/经验).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
