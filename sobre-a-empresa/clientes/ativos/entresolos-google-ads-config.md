---
cliente: "EntreSolos"
slug: "entresolos"
squad: "Peitho"
agente: "kasim-aslam"
documento: "Configuração técnica viva + runbook de execução (Google Ads/GA4/GTM/GSC)"
referencia: "entresolos.md · entresolos-google-ads-blueprint.md · entresolos-google-ads-rsas.md"
status: "config-viva"
validado_em: "2026-06-25"
fonte: "leitura first-party das contas conectadas (ADC adm@kolden.com.br) via REST das APIs Google"
---

# Configuração técnica viva — EntreSolos (Google Ads / GA4 / GTM / Search Console)

> Mapa **verificado ao vivo** das contas Google do EntreSolos e runbook de execução do blueprint.
> Tudo abaixo foi lido em **2026-06-25** direto das APIs (Search Console, Tag Manager, Analytics
> Admin/Data), com o ADC da conta `adm@kolden.com.br` (projeto `gen-lang-client-0988823565`).
> **Nada foi escrito nas contas** — só leitura. Execução **só sob ordem explícita do Ronan**
> (KPI inviolável do Peitho: zero publicação sem ordem).

---

## 1. Mapa de IDs (verificado ao vivo)

| Recurso | ID / valor | Observação |
|---|---|---|
| **Cloudflare — zona** | `b836853c979af5bcc5b25b7e7c2dd3a0` (`entresolo.com.br`) | conta **EntreSolos** `f83b7b78ea514d9bb695f41cc05b4911` (separada da Kolden); NS `ines/skip.ns.cloudflare.com`; plano Free; token escopado em Infisical **dev** `CLOUDFLARE_API_TOKEN_KOLDEN` |
| **Search Console** | `sc-domain:entresolo.com.br` | permissão `siteFullUser` (Kolden tem acesso de leitura/escrita) |
| **GTM — conta** | `6329796007` ("Entre Solos") | distinta da conta GTM "Kolden" (`6327657811`) |
| **GTM — container** | `240549231` · **`GTM-WWVXD9SF`** · contexto `web` | workspace ativo: `3` (Default Workspace) |
| **GA4 — conta** | `378278405` ("EntreSolos") | — |
| **GA4 — property** | **`517179541`** | moeda BRL, fuso America/Sao_Paulo |
| **GA4 — data stream** | `13173223932` (web, "Entre Solos") | criado 2025-12-22 |
| **GA4 — Measurement ID** | **`G-X9B7XNQXZT`** | `defaultUri` = `https://entresolo.com.br` (apex — ver §3, problema crítico) |
| **Google Ads — conta OPERACIONAL** | **`5070518419`** (507-051-8419) | confirmada pelo Ronan (2026-06-25) como a conta do EntreSolos onde roda a campanha → será o `GOOGLEADS_CUSTOMER_ID`. **Ainda NÃO vinculada ao GA4** (ver B5). |
| Google Ads — vínculo GA4 (A) | `5690616260` | vinculado ao GA4; `adsPersonalizationEnabled: false`; criado por `contato.entresolos@gmail.com` em 2026-01-11 — papel a esclarecer |
| Google Ads — vínculo GA4 (B) | `4780377619` | vinculado ao GA4; `adsPersonalizationEnabled: true`; mesma origem/data — papel a esclarecer |

> ⚠️ A conta **operacional `5070518419`** (confirmada pelo Ronan) **não** aparece entre as vinculadas
> ao GA4 hoje (`5690616260`/`4780377619`) → **vincular** (B5). A **MCC** e o `GOOGLEADS_LOGIN_CUSTOMER_ID`
> ainda **não estão documentados** — Ronan informa ao aplicar o developer token (§5).

---

## 2. Estado real do tracking (GTM + GA4) — verificado ao vivo

### 2.1 GTM container `GTM-WWVXD9SF` (workspace 3)
- **Tags (1):** `Google Ads Conversion` (tipo `awct` — Google Ads Conversion Tracking), dispara no
  trigger `6`.
- **Triggers (2):** `Trigger - Form Submit` (customEvent, id `6`) · `enhanced_conversion`
  (customEvent, id `8`).
- **Ausências (confirmadas):** **não há tag de configuração do GA4** no container; **não há** tracking
  de **clique no WhatsApp** nem **clique-para-ligar**. (`/calculadora` = calculadora de precificação
  **interna/de teste** — fora do radar por decisão do Ronan; não rastrear.)

### 2.2 GA4 property `517179541` — **NÃO ESTÁ COLETANDO**
- **Zero dados** desde a criação do stream (2025-12-22 → 2026-06-25): 0 sessões, 0 eventos, 0 usuários.
- **Realtime:** 0 usuários ativos.
- **Diagnóstico:** a tag `G-X9B7XNQXZT` não está disparando no site ao vivo. Causas prováveis (a
  confirmar): tag ausente do `www` (o que de fato serve conteúdo) e/ou amarrada ao **apex** (que
  retorna 421 — §3) e/ou container GTM sem GA4 config publicado.
- **Implicação direta:** sem GA4 coletando, **não há** público de remarketing (blueprint §4.4),
  **não há** import de conversões GA4→Ads (§2.2) e **não há** Enhanced Conversions reais. Isto é
  pré-requisito de fundação, não detalhe.

---

## 3. Bloqueante crítico de infra — apex indexado e quebrado → ✅ **RESOLVIDO (2026-06-26)**

**Diagnóstico original (2026-06-25):**
- `https://entresolo.com.br/` (apex) → **HTTP 421** ("Project not found" do Lovable).
- `https://www.entresolo.com.br/` (www) → **HTTP 200** (conteúdo real).
- O Google indexou **o apex, não o www**: as 8 URLs com impressão no Search Console eram todas apex →
  **100% dos cliques orgânicos caíam em página de erro 421.** Problema nº 1 da conta.

**Causa raiz:** o apex (A → `185.158.133.1`, infra Lovable atrás da Cloudflare) criava um cenário
**orange-to-orange** (Cloudflare proxiando para origin que também é Cloudflare/Lovable-SaaS). O
Lovable só tinha o `www` configurado como custom hostname → respondia 421 para o Host apex, **antes**
de qualquer Redirect Rule da zona surtir efeito.

**Correção aplicada (Cloudflare, zona `entresolo.com.br` = `b836853c979af5bcc5b25b7e7c2dd3a0`):**
1. **Redirect Rule** (phase `http_request_dynamic_redirect`): `http.host eq "entresolo.com.br"` →
   **301** `concat("https://www.entresolo.com.br", http.request.uri.path)`, preservando query string.
2. **Repontado o registro A do apex** de `185.158.133.1` → **`192.0.2.1`** (IP dummy TEST-NET, proxied)
   — remove o orange-to-orange e faz a Cloudflare tratar o apex como hostname próprio, deixando a
   Redirect Rule disparar. O IP dummy nunca é contatado (o 301 ocorre no edge antes do origin).
   *(Rollback: A → `185.158.133.1`.)*

**Validado ao vivo (2026-06-26):** apex raiz, com path+query e porta 80 → **301**; cadeia `-L`
termina em **200** no www; www direto segue 200. Acesso via API token Cloudflare escopado
(`CLOUDFLARE_API_TOKEN_KOLDEN`, Infisical env **dev** — DNS/Redirect/Page Rules/Zone Settings Edit).
**Próximo passo de SEO:** pedir reindexação no Search Console para o Google consolidar no www (§6 B6).

---

## 4. Performance orgânica real (Search Console, 90 dias: 2026-03-27 → 2026-06-25)

- **Totais:** 16 cliques · 721 impressões · CTR 2,22% · posição média 5,9.
- **Top queries:** `empresa de sondagem` (31 imp, pos 7,8) · `empresa de sondagens` (11, pos 2,4) ·
  `perfuracao de solo` (8, pos 2,9) · `sondagem de solo` (apenas **2 imp**, pos 7,5).
- **Top páginas (apex):** home (274 imp / 9 clk) · `/mg/perfuracao-de-solo/tipos` (259 / 4) ·
  `/mg/sondagem-de-solo` (109 / 3) · `/mg/perfuracao-de-solo/custos` (38 / 0).
- **Leitura:** os silos **começam a aparecer**, mas a demanda de **alto volume** do dossiê (§5.1:
  "sondagem de solo" 2.900/mês, "sondagem spt" 2.400/mês) **ainda não ranqueia** — núcleo quase sem
  impressão. A tese de SEO é válida, mas **ainda não materializada** (agravada pelo apex 421).

---

## 5. Google Ads ao vivo — **bloqueado nesta sessão**

| Caminho | Estado |
|---|---|
| **MCP oficial `google-ads-mcp`** | ❌ não exposto na sessão — depende de **developer token aprovado** (pendente) + reconexão do servidor + reload. É o caminho escolhido pelo Ronan; ainda indisponível. |
| **Synter (ponte)** | ⚠️ conectado, mas executa **assíncrono** e **não devolve o payload** pelo MCP (só o envelope do job + "check status at /jobs/<id>"). Não dá para ler os números inline. |
| **REST da Google Ads API** | ❌ exige developer token (mesmo bloqueio do MCP oficial). |
| **Windsor.ai (ETL)** | ↪ alternativa não testada (chave `WINDSOR_API_KEY`, env dev). |

**Consequência:** os números de Ads do dossiê **§9.2** (parcela de impressões 12,77%, QS 2–3)
permanecem **como vieram do doc de Drive "Análise de Métricas"** — **não validados ao vivo nesta
sessão**. Ficam rotulados como tal no dossiê. Para validar: aprovar o developer token (Ronan, em
`ads.google.com/aw/apicenter` na MCC) e reconectar o MCP oficial — então puxar QS por keyword e
impression-share-lost-by-rank via GAQL.

---

## 6. Runbook de execução (staged — **nada publicado**)

> Escopo "preparar execução" autorizado pelo Ronan, **respeitando o KPI Peitho**: tudo abaixo é
> montagem pronta; **a publicação exige OK explícito**. A ordem reflete os achados ao vivo: a
> **fundação cresceu** — não dá para subir mídia sobre tracking morto e apex quebrado.

### Etapa 0 — Fundação (pré-requisito ampliado, bloqueia o resto)
1. **Corrigir o apex** (§3): decidir apex→www (301) ou apex servir; recanonicalizar para o domínio
   que responde 200. **Sem isso, SEO e parte do Ads landing degradam.**
2. **Fazer o GA4 coletar** (§2.2): publicar tag de config GA4 (`G-X9B7XNQXZT`) via GTM no domínio que
   serve (`www`); validar em realtime que sessões aparecem.
3. **Eventos de conversão no GTM** (blueprint §2.1): clique WhatsApp (`wa.me/5531992238963`), envio de
   formulário (já há trigger `6`), clique-para-ligar. (Calculadora = teste interno — não rastrear.)
4. **Marcar key events no GA4** e (quando o Ads abrir) importá-las; ligar Enhanced Conversions.

### Etapa 1 — Campanhas (Onda 1, R$ 1.000/mês) — payloads em `entresolos-google-ads-rsas.md`
Montagem das 4 campanhas (Search-Núcleo 60% · Smart GBP 20% · Branded 8% · Remarketing 12%).
**Pré-condições antes de criar:** Etapa 0 concluída + conta de Ads operacional confirmada (§1) +
developer token (para o MCP oficial) **ou** decisão de usar Synter/painel.

> ⚠️ **Mismatch de moeda a resolver antes de qualquer disparo:** o Synter cria campanha com
> **orçamento em USD**; o blueprint é **R$ 1.000/mês**. Se a execução for por Synter, fixar a conversão
> BRL→USD com o Ronan. O MCP oficial / painel operam em BRL nativamente — preferível.

### Etapa 2 — Aprendizado e otimização
Conforme blueprint §6 (deixar aprender 7 dias, podar termos, subir QS antes de verba).

---

## 7. Como reproduzir esta leitura (auditável)

```bash
# Token ADC (após: gcloud auth application-default login --client-id-file=... --scopes=...)
TOK=$(gcloud auth application-default print-access-token)

# Search Console — sites e dados
curl -H "Authorization: Bearer $TOK" https://www.googleapis.com/webmasters/v3/sites
# POST .../sites/sc-domain%3Aentresolo.com.br/searchAnalytics/query  {dateRange, dimensions:[query|page]}

# GTM — conta/container/tags
curl -H "Authorization: Bearer $TOK" https://www.googleapis.com/tagmanager/v2/accounts
# .../accounts/6329796007/containers/240549231/workspaces/3/tags

# GA4 Admin — property, stream, googleAdsLinks
curl -H "Authorization: Bearer $TOK" https://analyticsadmin.googleapis.com/v1beta/accountSummaries
# .../properties/517179541/dataStreams · /googleAdsLinks

# GA4 Data — runReport / runRealtimeReport (POST)
# https://analyticsdata.googleapis.com/v1beta/properties/517179541:runReport
```

> O MCP `google-analytics` cacheia o token ADC em memória ao subir; após reautenticar o ADC, ele
> continua usando o token velho até **reconectar** (`/mcp`) ou reabrir o Claude Code. A REST (acima)
> lê o token fresco a cada chamada — caminho usado nesta auditoria.

---

## 8. Pendências (ordenadas por prioridade)

1. ✅ ~~**Apex 421 indexado**~~ — **RESOLVIDO 2026-06-26** (§3): redirect 301 apex→www ativo e validado.
   Resta pedir reindexação no Search Console (B6) para o Google migrar o índice para o www.
2. 🔴 **GA4 não coleta** (§2.2) — instalar/publicar tag de config GA4 via GTM no `www` e validar em
   realtime. **Crítico** (bloqueia remarketing e conversões). *Depende do ADC com escopo de escrita.*
3. **Vincular a conta operacional `5070518419` ao GA4** (B5) + documentar MCC e o papel das contas
   `5690616260`/`4780377619`.
4. **Developer token do Google Ads** (Ronan, §5) — destrava o MCP oficial, a validação ao vivo do §9.2
   e a montagem das campanhas (Fase C).
5. **Eventos de conversão** ausentes no GTM (WhatsApp / clique-para-ligar). *Depende do ADC de escrita.*
6. **Migrar credenciais** (`contato.entresolos@gmail.com` é o criador dos vínculos) para o fluxo de
   acesso da Kolden / Infisical, conforme §5 do CLAUDE.md.
