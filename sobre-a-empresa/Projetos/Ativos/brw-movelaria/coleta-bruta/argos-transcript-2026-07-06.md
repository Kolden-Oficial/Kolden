---
tipo: projeto
projeto: brw-movelaria
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/coleta-bruta/drive-2026-07-06|drive-2026-07-06]]"
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/coleta-bruta/facebook-page-2026-07-06|facebook-page-2026-07-06]]"
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/coleta-bruta/instagram-top-20-posts-2026-07-06|instagram-top-20-posts-2026-07-06]]"
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/coleta-bruta/tiktok-perfil-2026-07-06|tiktok-perfil-2026-07-06]]"
---

# Transcript bruto — Argos (dossiê BRW Movelaria)

**Data:** 2026-07-06
**Agente:** Argos Chief (subagente general-purpose)
**Bloqueios do harness:** Write, Bash-redirect, PowerShell, Apify (call-actor, search-actors, rag-web-browser) — todos negados na sessão do subagente.
**Trabalho executado:** blocos 1-9 do dossiê via Firecrawl (search + scrape). ~28 créditos consumidos.

---

## Reporte estruturado do Argos

### 1. Path do dossie.md
BLOQUEADO no subagente — dossiê consolidado no chat, salvo pelo Hermes em `C:/Kolden/Projetos/brw-movelaria/dossie.md`.

### 2. Coleta bruta
Zero arquivos gravados pelo subagente por bloqueio de permissão.

### 3. Custo Apify estimado
US$ 0,00 (bloqueado).

### 4. Números-âncora
- CNPJ 65.898.142/0001-63 aberto em 25/03/2026 (3 meses e 11 dias em 2026-07-06).
- Instagram: 541 followers · 1.274 following · ~174 posts.
- Facebook: 26 curtidas · 4 falando sobre.
- Google Reviews: 1 avaliação · 5,0★.
- 5 sócios (Bruno + Joyce + Janinne + Catarina + David + LLC americana).
- Capital social: R$ 100.000,00.
- Endereços: matriz Camaçari (Polo Industrial) + showroom Graça/Salvador.
- Telefones: 3 distintos (fiscal 3506-7924 / WhatsApp GMB 99902-7171 / FB 98195-0611).
- Concorrente local mais forte: Alfa Planejados (17,6 K IG, "desde 1978").
- Cliente hoteleiro confirmado: Iberostar Praia do Forte (Star Prestige, 2022).
- Cliente corporativo confirmado: Faculdade Baiana de Direito (2022).

### 5. Top 3 achados surpreendentes
1. CNPJ tem 3 meses, marca alega 30 anos — bio IG, posts FB (2022 e 2026) e assinatura interna "Desde 1998" se contradizem.
2. Sócia americana (Strategy Business & Solutions LLC) + família Maltez de Almeida — arranjo societário atípico.
3. Site próprio brwmovelaria.com.br está morto (DNS não resolve) — bug operacional referenciado ao vivo por IG/YouTube/FB.

### 6. Top 3 lacunas
1. Comentários e engajamento por post no Instagram — Apify bloqueado.
2. Reviews qualitativas do Google — apenas 1 review, base pobre (n=1).
3. Registro INPI da marca — INPI exige login.

### 7. Sinal para Aletheia
VERDE COM RESSALVAS. 3 avisos prévios:
1. Onboarding factual do cliente é obrigatório antes de Aletheia validar hipóteses.
2. Priorize site + reputação Google (baixo custo, alto ROI) antes de discovery pesado.
3. Portfolio real (residencial autoral) diverge do posicionamento verbal (corporativo/hoteleiro/institucional).

---

## Fontes usadas pelo Argos (Firecrawl)

- https://cnpja.com/office/65898142000163
- https://empresas.serasaexperian.com.br/consulta-gratis/BRW-MOVELARIA-LTDA-65898142000163
- https://www.escavador.com/sobre/10855036/bruno-felice-vilas-boas
- https://cnpj.biz/45091606000118 (Catarina)
- https://www.consultasocio.com/q/sa/janinne-maltez-de-almeida-tourinho
- Boletim JUCEB 04/2026 (ba.gov.br/juceb)
- Edital SEFAZ-BA 09/2026 (ref. 244.559.894-NO)
- Snippets Google Search em pt-BR (visão IA + resultados) para IG @brwmovelaria, FB @BRWmovelaria, GMB
- Google Maps Place page (Place ID 0xea42e44d7c929b23)
- Firecrawl DNS lookup em www.brwmovelaria.com.br (não resolve)

---

## Padrões operacionais aprendidos pelo Argos (para próximo subagente)

- Antes de aceitar missão de coleta, testar em turno 1 se Write/Bash-redirect/Apify estão disponíveis. Se bloqueados, negociar entrega em chat com o orquestrador antes de gastar créditos Firecrawl.
- Firecrawl não escraveia Instagram/Facebook/TikTok/cnpj.biz mesmo com stealth proxy — para social scraping é Apify ou nada.
- Cross-check de "história de marca" via arqueologia de posts sociais: quando o CNPJ é novo mas a marca alega décadas, buscar posts do próprio perfil de anos anteriores é o cross-check mais barato e definitivo.
- DNS lookup como último passo de auditoria digital: um site referenciado publicamente pelo cliente pode estar morto sem que ele saiba.
- JUCEB/SEFAZ como fonte fiscal aberta: boletins JUCEB e editais SEFAZ triangulam idade real de CNPJ, existência de pendências e legitimidade societária.
- CNAE vs. auto-descrição: comerciante varejista alegando "preço de fábrica" merece flag.
- "3 telefones = reformulação": 3 números distintos (fiscal, WhatsApp GMB, telefone Facebook) é forte indício de operação em transição/reestruturação.
