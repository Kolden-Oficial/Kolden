---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/README|README]]"
---

# Landing Page Fixes — Vilela Construction (`vilela-bright-space`)

> **Origem:** consolidação dos 9 gaps críticos identificados em `dossie-site-vilela-construction.md` (2026-07-09) + requisitos da Onda 1 (instrumentação Google/Meta) e Onda 2 (LP profissional) do roadmap Google Ads.
> **Squad responsável:** **Harmonia** (dev), com handoffs para Caliope (copy), Aglaia (visual) e Peitho (tracking).
> **Repo alvo:** `Koldenoficial/vilela-bright-space` (GitHub) — deploy via Lovable.
> **Prazo:** D+7 (paralelo com Onda 1 instrumentação).

---

## Checklist mestre — priorização por severidade

### 🔴 Crítico (bloqueia lançamento das campanhas)

- [ ] **F1. Telefone placeholder → real** (`/thank-you` + Sitelinks + Call extension Google Ads)
  - Localização: componente do bloco pós-lead, atualmente `tel:+17705551234`
  - Ação: substituir pelo telefone real de Thiago Araujo (⏳ bloqueio B2 do roadmap)
  - Se B2 travar: comentar o botão inteiro e o "Need to reach us sooner?" da tela `/thank-you`

- [ ] **F2. Testimonials placeholder → reais** (risco FTC/Better Business Bureau nos EUA)
  - Localização: seção testimonials da home, 3 cards com texto `"Enter a powerful testimonial here..."`
  - Ação: Aletheia + Caliope entregam 3 depoimentos reais coletados de Thiago (⏳ bloqueio B3 do roadmap)
  - Se B3 travar: **remover a seção inteira** — melhor sem testimonials do que com placeholders falsos

- [ ] **F3. Google Ads conversion tag `AW-` ausente**
  - Localização: GTM container `GTM-NG8LP66S`, atualmente sem tag Google Ads
  - Ação: instalar tag `AW-XXXXXXXXXX/<label>` com trigger form submit (Onda 1.2 do roadmap, executada por Peitho/pixel-specialist)
  - Referência técnica: `google-ads/conversion-actions.md` (a ser criado pelo pixel-specialist)

- [ ] **F4. gclid não persistido**
  - Localização: form GHL iframe `NPkCo9JhSx7016RFCJd0` — atualmente sem hidden field nem snippet JS de captura
  - Ação: injetar `<script>` na LP que:
    1. Lê `URLSearchParams` da URL de entrada
    2. Se houver `?gclid=...`, persiste em cookie first-party `_kolden_gclid` (30d)
    3. Ao renderizar o form GHL, injeta hidden field com o valor do cookie via `postMessage`
  - Referência técnica: `google-ads/ghl-shadow-integration.md` (a ser criado pelo pixel-specialist)

- [ ] **F5. Meta Pixel + CAPI ausente**
  - Localização: LP sem tag `<script>` do Meta Pixel; Meta Ads rodando cego há 4 semanas
  - Ação: instalar Pixel client-side + configurar Conversions API server-side (Onda 1.10 do roadmap)
  - Referência técnica: `meta-ads/conversion-events.md` (a ser criado pelo pixel-specialist)

### 🟠 Alto (impacta conversão + qualidade da campanha, mas não bloqueia lançamento)

- [ ] **F6. `og:image` Lovable → branded Vilela**
  - Localização: `<meta property="og:image">` no `<head>` da LP — aponta para R2 do Lovable
  - Ação: Aglaia produz uma imagem branded 1200×630 (com marca Vilela + tagline + trust markers) e Harmonia sobe para asset do repo + atualiza meta tag
  - Impacto: quando alguém compartilha a URL no WhatsApp/FB/LinkedIn, aparece a marca Lovable em vez de Vilela

- [ ] **F7. `og:title`, `og:description`, `<title>` — auditar**
  - Localização: `<head>` da LP
  - Ação: verificar se todos os meta tags estão preenchidos com copy Vilela e não com defaults Lovable
  - Alvo esperado: `<title>Vilela Construction — Premium Home Remodeling in Kennesaw, GA</title>`

- [ ] **F8. Hidden field `service_selected` no form GHL**
  - Localização: form GHL iframe
  - Ação: adicionar hidden field `service_selected` que preenche automaticamente com a seção da LP onde o usuário estava quando clicou no CTA (kitchen, bathroom, basement, flooring, painting, generic)
  - Motivo: permite valor de conversão dinâmico no Google Ads (basement $4.800 vs. painting $400) — ver `conversion-actions.md`

- [ ] **F9. Gallery before/after incompleta**
  - Localização: seção gallery da home, hoje só com 2 pares (Kitchen + Bathroom)
  - Ação: adicionar 2 pares before/after de Flooring + Painting (imagens vêm de Thiago; Aglaia edita se necessário; Harmonia integra no componente)
  - Motivo: gallery de 2 categorias em cima de 4 serviços vendidos = descompasso com anúncios

### 🟡 Médio (melhoria de CVR + trust)

- [ ] **F10. FAQ vazio ou genérico**
  - Localização: seção FAQ da home (se existir) ou nova seção antes do form final
  - Ação: Caliope escreve 5–7 perguntas populares:
    1. How long does a typical kitchen remodel take?
    2. Do you cover permits and inspections?
    3. What's your process if we run into unexpected issues during demolition?
    4. Are you licensed and insured in Georgia?
    5. Do we need to move out during the project?
    6. What's included in the free estimate?
    7. Do you offer a warranty?
  - Fonte de perguntas: dores identificadas no dossiê (stress, mess, disappearing contractor, hidden costs)

- [ ] **F11. Credenciais visíveis (License #, Insurance, anos de mercado)**
  - Localização: hoje aparece só no footer de `/thank-you` como texto solto — deveria estar na home, próximo ao hero
  - Ação: Aglaia + Harmonia adicionam badge trust ("Licensed & Insured GA · 25+ Years Experience · Kennesaw, GA") logo abaixo do hero ou no bloco "Why Us"
  - Se Thiago não fornecer License #: usar apenas "Licensed & Insured in GA" (sem número)

- [ ] **F12. Consent Mode v2 banner**
  - Localização: LP sem banner de consentimento
  - Ação: Harmonia adiciona banner discreto opt-in (checkbox `Analytics + Ads` marcado por default) que:
    1. Se aceito: dispara `gtag('consent', 'update', {analytics_storage: 'granted', ad_storage: 'granted'})`
    2. Se recusado: mantém `denied` (default)
  - Copy do banner (voice Vilela + aviso GHL sombra):
    > *"We use cookies to make our website work and improve your experience. Your information may be temporarily stored on our agency's infrastructure while your CRM is being set up. Your data remains your property. [Accept] [Manage]"*
  - Motivo: Google Consent Mode v2 é requisito global do Ads a partir de 2024

### 🟢 Baixo (nice-to-have, D+14 pós-launch)

- [ ] **F13. Página `/portfolio` dedicada** (link do Sitelink)
  - Ação: se ainda não existe, criar página `/portfolio` com galeria expandida (~10–20 projetos Vilela reais)
  - Se Thiago não tiver imagens: usar apenas os 4 pares before/after da home + link "More projects coming soon"

- [ ] **F14. Página `/free-estimate` dedicada** (link do Sitelink + Call extension)
  - Ação: página com CTA direto (form no topo, sem scroll), copy focada no lead magnet "Get your free estimate in 24 hours"
  - Motivo: melhora Quality Score porque o landing tem scent match perfeito com o Sitelink "Free Estimate"

- [ ] **F15. Scent match anúncio ↔ LP**
  - Ação: Bernardo/media-buyer valida em D+7 se copy do anúncio (kitchen, bathroom) leva pra seção correta da LP (deep linking com âncora `#kitchen`, `#bathroom`)
  - Motivo: reduz bounce rate + aumenta Quality Score

---

## Fluxo de trabalho Harmonia

**Repo:** `git@github.com:Koldenoficial/vilela-bright-space.git`

**Branch:** `fixes/2026-07-onda-2`

**Ordem de execução recomendada:**

1. **Kickoff (D+3):** Harmonia faz clone + audit inicial do estado atual dos 15 itens acima
2. **Dia 1 (D+4):** F3 + F4 + F5 (tracking crítico — junto com Peitho/pixel-specialist)
3. **Dia 2 (D+5):** F1 + F8 (dependem de dados do Thiago — se travar, avança pros próximos)
4. **Dia 3 (D+6):** F6 + F7 + F11 + F12 (meta tags + trust markers + consent)
5. **Dia 4 (D+7):** F2 (testimonials do Aletheia/Caliope) + F9 (gallery expansion do Aglaia)
6. **Dia 5 (D+8):** F10 (FAQ do Caliope) + QA final
7. **Deploy (D+8):** Lovable deploy + Peitho pixel-specialist faz o QA end-to-end (Onda 1.8 e 1.12)

**Handoffs bloqueantes:**
- F2 depende de Aletheia (roteiro) + Caliope (edição) — se atrasar, remover seção
- F6 depende de Aglaia (imagem branded 1200×630)
- F9 depende de Thiago (imagens before/after) + Aglaia (edição se necessário)
- F10 depende de Caliope (copy do FAQ)
- F1 depende de Thiago (telefone real)

**QA final (D+8):**
- [ ] Chrome anônimo + `?gclid=TEST123` → cookie `_kolden_gclid` presente
- [ ] Submit form → hidden field `gclid=TEST123` chegou no GHL
- [ ] Conversion no Google Ads em <3h
- [ ] Meta Pixel `Lead` event no Events Manager em <3h
- [ ] Enhanced Conversions match rate ≥ 40%
- [ ] og:image branded aparece em WhatsApp preview
- [ ] Todos placeholders (telefone, testimonials, meta) substituídos
- [ ] Consent banner funcional (accept + manage + persist decisão em cookie)
- [ ] Site rankeia OK no PageSpeed Insights (mobile ≥ 70)

---

## Referências

- Origem dos gaps: `dossie-site-vilela-construction.md` §9-gaps
- Roadmap Google Ads: `google-ads/ROADMAP.md` §4 (Ondas 1 e 2)
- Spec tracking: `google-ads/conversion-actions.md` (a ser criado)
- Spec GHL integração: `google-ads/ghl-shadow-integration.md` (a ser criado)
- Spec Meta: `meta-ads/conversion-events.md` (a ser criado)
