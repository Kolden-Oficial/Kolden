---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/copy/rsa-bathroom|rsa-bathroom]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/copy/rsa-brand|rsa-brand]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/copy/rsa-kitchen|rsa-kitchen]]"
---

# Sitelinks, Callouts, Structured Snippets & FAQ

> **Contrato:** `Olimpo/contratos/missoes/m-20260709-google-ads-vilela.yaml`
> **Roadmap §3.6:** `../ROADMAP.md`
> **Skills:** Caliope/estrutura-de-pagina-de-vendas (FAQ)
> **Idioma:** English (US market)

---

## 1. Sitelinks (6 ativos)

Google Ads: **título ≤ 25 chars**, **cada linha descritiva ≤ 35 chars**. Recomenda-se mínimo 4 sitelinks visíveis; entregamos 6 para cobertura ampla e permitir teste.

| # | Título | URL | Linha 1 | Linha 2 |
|---|---|---|---|---|
| 1 | `Free Estimate` | `/free-estimate` ⚠️ (âncora `/#contact` até rota `/free-estimate` existir) | `Free in-home consultation.` | `No obligation. Written scope.` |
| 2 | `Kitchen Remodeling` | `/#kitchen` | `Cabinets, quartz, hardwood.` | `Full kitchen renovations in MA.` |
| 3 | `Bathroom Renovations` | `/#bathroom` | `Tile, showers, vanities, tubs.` | `Custom bathroom remodels.` |
| 4 | `Portfolio` | `/portfolio` ⚠️ (rota não existe hoje — ver B5 no ROADMAP; enquanto isso, apontar para `/#gallery`) | `Before & after real projects.` | `See our kitchen and bath work.` |
| 5 | `About Vilela` | `/about` ⚠️ (rota não existe hoje — remover se Bernardo confirmar que não vai criar) | `Family-owned, Boston, MA.` | `Licensed & insured contractor.` |
| 6 | `Free Consultation` | `/#contact` | `In-home visit. Clear scope.` | `No hidden costs. No surprises.` |

**Chars validados:** todos os títulos ≤ 25, todas as linhas ≤ 35 ✅.

**Dependência de LP (bloqueio B5):**
- Sitelink `Portfolio` — se `/portfolio` não existir, pausar sitelink ou redirecionar para `/#gallery`. Recomendação: pedir para Harmonia criar rota `/portfolio` na Onda 2 (aponta para versão expandida da gallery).
- Sitelink `About Vilela` — se `/about` não existir, remover este sitelink e substituir por `Serving Boston Metro` → `/#contact` como sitelink extra.
- Sitelink `Free Estimate` — âncora `/#contact` funciona; rota `/free-estimate` é upgrade (Onda 2).

---

## 2. Callouts (10 ativos)

Google Ads: **cada callout ≤ 25 chars**. Mínimo 8 recomendado; entregamos 10.

| # | Callout | Chars | Dependência | Marcação |
|---|---|---|---|---|
| 1 | `Licensed & Insured` | 18 | — | **SEGURO** — publicar imediatamente |
| 2 | `Free In-Home Consultation` | 25 | — | **SEGURO** |
| 3 | `Boston Metro & NH` | 17 | — | **SEGURO** (retificado rodada 2 — praça real MA+NH conforme dossiê 09/07) |
| 4 | `25+ Years Experience` | 20 | ⚠️ **B1** (Thiago validar histórico) | **RETIDO** — NÃO publicar até Thiago confirmar |
| 5 | `Satisfaction Guaranteed` | 23 | — | **SEGURO** (já aparece na LP: "100% Customer Satisfaction Guaranteed" §4.8) |
| 6 | `Clean Job Sites Daily` | 21 | — | **SEGURO** (diferencial canônico do cliente) |
| 7 | `Transparent Pricing` | 19 | — | **SEGURO** (diferencial canônico) |
| 8 | `Family-Owned Business` | 21 | ⚠️ **B1 leve** — Thiago confirmar se é family-owned de fato | **RETIDO leve** — provável seguro; confirmar |
| 9 | `No Hidden Costs` | 15 | — | **SEGURO** (voz literal do cliente) |
| 10 | `Free Written Estimates` | 22 | — | **SEGURO** |

**Chars validados:** todos ≤ 25 ✅.

### Filtro de publicação

**Publicar já (Onda 3):** #1, #2, #3, #5, #6, #7, #9, #10 = **8 callouts** (mínimo atingido).

**Publicar após confirmação B1 do Thiago:** #4 (25+ anos), #8 (Family-Owned).

**Se B1 responder negativo em qualquer:** trocar por:
- Substituto para #4: `Home Remodel Specialists` (24)
- Substituto para #8: `Locally Owned in Boston` (23) — retificado de "Locally Owned in Kennesaw" (25) na rodada 2

---

## 3. Structured Snippets

Google Ads: **valores ≤ 25 chars**. Header vem de lista fechada do Google.

### Snippet A — Services (obrigatório)

Header: **Services**

| # | Valor | Chars |
|---|---|---|
| 1 | `Kitchen Remodel` | 15 |
| 2 | `Bathroom Renovation` | 19 |
| 3 | `Basement Finishing` | 18 |
| 4 | `Flooring` | 8 |
| 5 | `Interior Painting` | 17 |

### Snippet B — Types (opcional, recomendado)

Header: **Types**

| # | Valor | Chars |
|---|---|---|
| 1 | `Full Remodel` | 12 |
| 2 | `Custom Design` | 13 |
| 3 | `Small Renovation` | 16 |

### Snippet C — Neighborhood (opcional, testar em Onda 4)

Header: **Neighborhoods**

| # | Valor | Chars |
|---|---|---|
| 1 | `Boston MA` | 9 |
| 2 | `Cambridge MA` | 12 |
| 3 | `Somerville MA` | 13 |
| 4 | `Newton MA` | 9 |
| 5 | `Nashua NH` | 9 |
| 6 | `Manchester NH` | 13 |

**Recomendação:** publicar A e B na Onda 3. Testar C na Onda 4 (D+10) para ver impacto no CTR em queries geo-específicas.

---

## 4. FAQ para adicionar à LP

Seção nova na landing page — vai virar bloco antes do FinalCTA (ordem: WhyUs → Testimonials → **FAQ** → FinalCTA). Endereça as 7 objeções mais recorrentes de homeowner considerando reforma high-ticket.

**Skill aplicada:** `estrutura-de-pagina-de-vendas` (bloco 6 — Tratamento de Objeções: FAQ + garantia). Estrutura de cada FAQ: **Dor articulada → Resposta honest e específica → (quando cabe) Prova ou ação clara**.

**Ver também:** `landing-page-fixes-2026-07.md` §F10 (bloco FAQ na LP).

### Bloco FAQ — copy pronta

**Eyebrow:** *Common Questions*
**H2:** *Everything you're wondering — answered.*
**Sub:** *We've done this hundreds of times, and every homeowner asks the same first questions. Here's the honest answer to each.*

---

**Q1: How long does a full kitchen or bathroom remodel take?**

*It typically takes 4–6 weeks for a full kitchen remodel and 2–4 weeks for a full bathroom, depending on scope and materials. We'll give you a firm timeline in your written estimate and stick to it. If something on our end causes a delay, you hear it from us first — not the next Monday.*

---

**Q2: Are you licensed and insured?**

*Yes. Vilela Construction is a licensed and insured general contractor in Massachusetts. We carry general liability and workers' compensation coverage on every crew that steps into your home. You can request a copy of both certificates before we start — it's a normal ask.*

---

**Q3: Will there be hidden costs?**

*No. Your written estimate lists every line item — labor, materials, permits, disposal. If something genuinely unexpected comes up mid-project (a rotted subfloor we couldn't see until demo), we stop, show you the finding, quote the change in writing, and only proceed after you approve. No surprise invoices at the end.*

---

**Q4: Do I need to move out of my home during the remodel?**

*Almost never. For a full kitchen or single bathroom, most homeowners stay in the house. If you have only one bathroom and we're renovating it, we plan the schedule so you're without it for the shortest possible window, and we talk through your options before demo day. For a full-home remodel, we'll be straight with you about which weeks are livable and which aren't.*

---

**Q5: How do you keep the mess under control?**

*Plastic barriers seal off the work zone from the rest of the house. Floor protection runs from the front door to the job site. At the end of every workday, our crew sweeps, wipes down, and hauls the day's debris out. Your home is a home, not a jobsite — that's the standard, every single day.*

---

**Q6: What's included in the free estimate?**

*An in-home visit (usually 45–60 minutes), a walkthrough of your space and your vision, measurements, and a written scope with a real number — not a range. You'll know what's included, what's excluded, what the timeline looks like, and how payment is structured before you decide anything.*

---

**Q7: What if I'm not happy with the finished work?**

*We don't sign off until you do. Every project ends with a punch-list walkthrough — you point out anything that isn't right, we fix it before final payment. We stand behind our craftsmanship after that too; if something we installed fails from a workmanship issue, we come back and make it right.*

---

**CTA final da seção FAQ:** `Get Your Free Estimate` → `#contact`

---

## 5. Skills anti-slop — checklist

- ✅ Zero "elevate", "unleash", "seamless", "revolutionize", "transform your life"
- ✅ Zero superlativos vagos ("world-class", "cutting-edge", "premier")
- ✅ Voz honest and grounded — respostas explicam o que Vilela FAZ, não o que promete abstratamente
- ✅ Números reais quando existem (4–6 semanas, 2–4 semanas, 45–60 min)
- ✅ Frase-âncora do cliente preservada: *"Your home is a home, not a jobsite"* (paráfrase natural do diferencial "we treat every project like our own home")
- ✅ FAQ Q1 usa exemplo dado no brief: *"It typically takes 4-6 weeks for a full kitchen remodel — we'll give you a firm timeline in your estimate and stick to it"* — implementado literalmente

---

## 6. Confiança da entrega

**Forte** para sitelinks 1-3 e 6 (rotas existentes/âncoras funcionando). **Testar** sitelinks 4 e 5 (dependem de rota nova).

**Forte** para callouts marcados SEGURO (8 unidades). **RETIDO** para #4 e #8 até B1.

**Forte** para Snippets A e B. **Testar** Snippet C após 30 dias.

**Forte** para o bloco FAQ — todas as 7 respostas são falsificáveis (Thiago pode olhar cada uma e dizer "isso é verdade / isso não é", diferente de fluff genérico). Se Q1 (prazo) ou Q4 (mudar de casa) precisar de ajuste específico Vilela, editar antes de subir para a LP.

---

## 7. Geografia retificada (rodada 2 — 09/07/2026)

Todas as menções a Kennesaw/Atlanta/GA/Georgia foram substituídas por Boston/Southern NH/MA/Massachusetts conforme dossiê unificado de 09/07 (Argos rodada 3 com Ronan). Praça real de operação = **Greater Boston + Southern NH**.

**Cidades típicas de operação (MA):** Boston, Cambridge, Somerville, Newton, Waltham, Woburn, Medford, Everett, Lowell, Lawrence.
**Cidades típicas de operação (NH):** Nashua, Manchester, Salem, Derry.

**Callout #3 reescrito:** `Kennesaw & Atlanta Metro` (24 chars) → `Boston Metro & NH` (17 chars) — encurtou em 7 chars, dentro do limite.
**Substituto do callout #8 reescrito:** `Locally Owned in Kennesaw` (25) → `Locally Owned in Boston` (23) — a versão "Locally Owned in Boston, MA" (27) estourava o limite.
**Snippet C ampliado:** de 4 valores para 6 (agora cobre MA + NH; mix Boston/Cambridge/Somerville/Newton MA + Nashua/Manchester NH).
**FAQ Q2:** "licensed in Georgia" → "licensed in Massachusetts".
