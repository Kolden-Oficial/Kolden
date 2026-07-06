---
cliente: "Vilela Construction"
slug: "vilela-construction"
tipo: "diagnostico"
frente: "rastreamento-google-ads"
squad_emissor: "peitho"
agentes_envolvidos: ["traffic-chief", "pixel-specialist", "kasim-aslam"]
autor: "Claude Code (encarnando Peitho)"
data: "2026-07-01"
status: "laudo-diagnostico v2 (revisado pós-Dike)"
revisao: "2026-07-01 — 6 gaps corrigidos após análise adversarial: valor de conversão recalculado, custo do gap quantificado, risco jurídico CP1-b sinalizado, gap Meta adicionado, reflexo OCI sugerido, 6 perguntas consolidadas em 4"
proxima_acao: "aprovação Ronan → execução em rodada seguinte"
---

# Laudo Peitho — Rastreamento Google Ads no formulário da Vilela Construction

> **Escopo desta entrega:** diagnóstico. O que **existe** hoje, o que **falta** para as 3 camadas (client-side + OCI via gclid + Enhanced Conversions for Leads) e o **roteiro** para executar em rodada seguinte. Nenhuma configuração foi feita nesta sessão. Peitho opera com autonomia zero — toda execução depende de aprovação explícita do Ronan.

---

## 1. Resumo executivo

Vilela Construction está rodando Meta Ads há ~1 semana (12/06/2026: 5 leads, 2 potenciais) e Google Ads foi ativado em teste A/B (site institucional vs. LP nova criada pela Kolden). **Não há rastreamento de conversão instrumentado** — nem tag client-side no submit da LP, nem gclid persistido, nem Enhanced Conversions. **Isto é uma violação do veto `sem_pixel_e_rastreio` do Peitho** (§`squad.yaml`) e deveria ter disparado HALT em 12/06 antes de qualquer investimento em Google Ads.

**Custo do gap (aritmética):** contrato USD 1.000/mês de mídia ÷ 4 semanas ≈ **USD 250/semana queimados em otimização cega** (ML do Google chuta sem sinal de conversão real). Se a decisão de destravar a Camada 1 levar 3 semanas, são ~USD 750 desperdiçados numa janela sazonal de ~4 meses até novembro. Não é catástrofe — é fricção material que compõe.

O plano do Ronan de "usar formulário GHL nativo" **não se aplica ao estado atual do contrato Vilela**: CRM/GHL foi explicitamente rejeitado na negociação inicial (§Contrato do dossiê), com reavaliação prevista após 3 meses. O sistema de registro provisório é uma planilha Google Sheets que Julio Kolden começaria a implementar naquela semana. Recomendação: destravar a Camada 1 (tag client-side) em rodada seguinte para eliminar o cegueiro de atribuição — as Camadas 2 e 3 dependem de decisões que precisam ser feitas antes (ver §7).

---

## 2. Estado atual por checkpoint

### CP1 — Estado do formulário

**Achado: LP externa da Kolden com destino Google Sheets. Não é formulário GHL nativo.**

Evidências:
- Contrato (§3 do dossiê `vilela-construction.md`): *"Implementação de CRM **não** está inclusa neste momento (rejeitada pelo cliente na negociação inicial); será reavaliada após 3 meses de contrato, podendo gerar aditivo contratual."*
- Ata check-in 12/06 (00:21:42): Julio Kolden — *"como nós não temos ainda um CRM, né, porque tendo CRM, a pessoa preenche o formulário e a informação cai no CRM. Como não tem esse formulário ainda, nós vamos fazer o seguinte, nós vamos pegar essas informações que tão no preenchido no formulário [...] vamos mandar numa planilha que fica mais fácil vocês acompanharem."*
- Ata check-in 12/06, próximas etapas: *"[Julio da Kolden] Configurar Planilha: Conectar o formulário da landing page ao Google Sheets para centralizar leads."*

Existem **duas URLs** no teste A/B (ambas mencionadas na ata, nenhuma trava de link no repo):
- (a) site institucional anterior — muitos botões, comportamento de site multipurpose
- (b) LP nova criada pela Kolden — foco em conversão, quebra de objeções (bagunça, prazos), formulário como CTA principal

**Interpretação da resposta do Ronan ("formulário nativo do GHL"):** foi por intenção, não estado atual. Duas leituras possíveis, ambas exigem decisão explícita:
- (i) preparar a arquitetura para o aditivo do mês 3 (out/2026), antecipando o CRM
- (ii) usar o **GHL sombra da Kolden** (location `1Jo7tMynqRtbpB3GHuOd`) como registro paralelo, sem cobrar do cliente — captura o gclid enquanto ele não paga pelo CRM

Esta decisão está listada nas perguntas em aberto (§7).

### CP2 — Rastreamento vivo do site/LP

**Achado: rastreamento não instrumentado. Sem evidência de GTM, gtag, AW-, hidden field gclid ou UTM strategy.**

O que sabemos:
- Ata 12/06 não menciona pixel, tag, GTM em nenhum momento
- Bernardo Kolden é o responsável pela otimização diária de keywords no Google Ads (ata 00:20:43), mas otimização sem conversão instrumentada é chute
- Bernardo já anexou "o link" no grupo mas nunca foi confirmado se a LP tem GTM injetado
- Repositório Kolden **não** contém código HTML/JS da LP Vilela nem screenshots do <head>

O que **não sabemos** (a auditar em rodada seguinte, se aprovada):
- URL definitiva das duas variantes A/B
- Presença de container GTM
- Auto-tagging na conta Ads (ligado por padrão, mas depende de confirmação)
- gclid persistindo em query param → hidden field
- Deduplicação client-side vs server-side (irrelevante hoje porque não há server-side)

### CP3 — Conta Google Ads da Vilela

**Achado: conta operacional (acesso enviado por WhatsApp em 29/05), mas ID não documentado no repo. Nenhuma conversion action `AW-` registrada em nenhum arquivo Kolden.**

O que sabemos:
- Ata 21/05 e 29/05 (existentes em `_conhecimento-institucional/meetings/`): acesso foi solicitado e enviado
- Ata 12/06 (00:20:43): Bernardo faz otimização diária de keywords
- Ata 12/06 (00:10:36): Julio quer ligar a campanha de Google apontando para a LP nova
- Google Ads MCP: **bloqueado** aguardando developer token (`Ferramentas/GoogleAds/ferramentas.md`) — impacto: auditoria da conta via API está fora agora; auditoria via UI/painel funciona

Pendências:
- ID da conta Google Ads da Vilela (formato `XXX-XXX-XXXX`)
- Existe conversion action criada? Nome? Categoria? Primária?
- Auto-tagging habilitado?
- Enhanced Conversions habilitado no nível da conta?

### CP4 — Camada 1 (client-side gtag/GTM)

**Achado: ausente. Requisito fundacional para qualquer camada seguinte.**

O que precisa existir para funcionar:
- Container GTM instalado na LP (`GTM-XXXXXXX`)
- Tag Google Ads Conversion Tracking configurada com Conversion ID (`AW-XXXXXXXXXX`) + Conversion Label
- Trigger: `Form Submit` na LP, com filtro de sucesso (form enviado ≠ botão clicado)
- Data Layer push no envio para carregar valores dinâmicos se houver (categoria: `lead`, valor estimado se aplicável)

Considerações para Vilela especificamente:
- Ticket alto (basements USD 50k–70k) → valor de conversão estimado faz diferença para PMax/Smart Bidding. **Correção pós-revisão v2**: `USD 55.000` é o **ticket bruto do serviço**, NÃO o valor esperado por lead. Para Smart Bidding otimizar sem inflar CAC, o valor a colocar na Conversion Action é `ticket_médio × margem_bruta × taxa_fechamento_histórica`.
  - **Fórmula aplicada:** assumindo `USD 60.000 × 40% margem × 20% fechamento = USD 4.800/lead` `[BENCHMARK — margem construção residencial premium 30–45% + taxa fechamento reformas high-ticket 15–25%; recalibrar assim que Vilela informar números reais]`.
  - **Dinâmico via `hidden field service_selected`** ainda vale para diferenciar basement (`USD 4.800`) vs. reforma banheiro (`USD 800`) vs. limpeza (`USD 60`).
  - **Ação bloqueante:** kasim-aslam pede a Thiago Araujo (decisor Vilela) taxa histórica de fechamento e margem bruta antes de configurar a Conversion Action. Sem esses números, valor entra como `[BENCHMARK]` no painel Ads + reavaliar em D+30.
- Moeda: `USD`

### CP5 — Camada 2 (OCI via gclid)

**Achado: bloqueada por decisão de arquitetura pendente (CP1). Sem CRM, o gclid precisa persistir em algum lugar — hoje o único candidato é a planilha Google Sheets.**

Fluxo alvo (assumindo Google Sheets como sistema de registro provisório):
1. LP captura `?gclid=...` da URL de entrada e persiste em cookie first-party (30d)
2. Ao submeter form, envia `gclid + timestamp + email + phone + nome + fonte_utm` para a planilha
3. Aba "OCI Upload" na planilha compila CSV compatível com formato Google Ads Offline Conversion (colunas: `Google Click ID, Conversion Name, Conversion Time, Conversion Value, Conversion Currency`)
4. Upload manual semanal em Ads → Tools → Conversions → Uploads (até o developer token liberar OCI API)
5. Janela: OCI aceita até 90 dias após o clique — folga confortável mesmo com upload semanal

Se decisão CP1 for usar GHL sombra da Kolden:
- Custom field `gclid` no contato GHL (via endpoint `POST /custom-fields` — ver `Ferramentas/GoHighLevel/docs/02-endpoints-mapeados.md` §Op. 1)
- Workflow GHL "form submitted" com HTTP action que ecoa lead pra planilha (redundância) + persiste gclid no contato
- Handoff pra Ads OCI por API quando developer token liberar (script em `Ferramentas/GoHighLevel/src/scripts/upload-oci-vilela.ts` — spec no §5)

### CP6 — Camada 3 (Enhanced Conversions for Leads)

**Achado: viável independente das outras camadas, mas precisa da Camada 1 rodando antes (Enhanced Conversions "veste" a tag client-side existente com user-provided data).**

Requisitos:
- Tag Google Ads Conversion Tracking já instalada e disparando (Camada 1)
- Configuração explícita em Ads → Conversion Action → Enhanced Conversions → *Turn on enhanced conversions for leads* → método: **Google tag** (mais simples) ou **Google Tag Manager** (melhor controle)
- Selecionar campos user-provided: `email` (obrigatório), `phone_number` (recomendado), `first_name` + `last_name` + `address` (opcionais — aumentam match rate)
- Hashing SHA-256 automático se via gtag/GTM; obrigatório manual se via API

Considerações Vilela:
- **Consentimento**: cliente US-based (Boston, MA). Massachusetts não tem lei de privacidade abrangente equivalente ao CCPA da Califórnia — não há requisito estadual duro para consent banner específico. **Recomendação Peitho**: implementar consent conservador mesmo assim (banner discreto + opt-in claro) para robustez futura e compliance com Google Consent Mode v2, que é regra global do Ads a partir de 2024.
- **Não requer GA4 ativo** — Enhanced Conversions for Leads roda direto na tag do Ads, ao contrário do que meu plano preliminar (revisão de rascunho) sugeria.

---

## 3. Gap consolidado por camada

| Camada | Estado | Gap | Pré-requisito bloqueador |
|---|---|---|---|
| **0 — Fundação** | ❌ | Rastreamento inexistente. Violação do veto Peitho `sem_pixel_e_rastreio`. | Decisão CP1 (onde persistir gclid) |
| **1 — Client-side (gtag/GTM)** | ❌ | Sem container GTM, sem tag `AW-` na LP, sem trigger form submit | CP1 + ID da conta Ads + Conversion Action criada |
| **2 — OCI via gclid** | ❌ | Sem persistência de gclid, sem pipeline pra Ads upload | CP1 (arquitetura) + Google Sheets ou GHL configurado |
| **3 — Enhanced Conversions** | ❌ | Sem tag base rodando, sem user-provided data mapping | Camada 1 operacional + consentimento LGPD/CCPA definido |

---

## 4. Roteiro de execução manual por camada (rodada seguinte)

**Ordem obrigatória: 1 → 2 → 3.** Sem a Camada 1, as outras duas não têm base.

### Camada 1 — Client-side (2h de trabalho)

1. Verificar/criar container GTM na LP Vilela — publicar snippet `<head>` e `<body noscript>` no template Kolden da LP
2. Criar Conversion Action em Ads → Goals → Summary → Create Conversion Action → *Website* → categoria *Submit lead form* → contagem *One* (por click) → valor *Use the same value for each conversion* (**valor esperado por lead** — ver §2 CP4 acima; provisório `USD 4.800` `[BENCHMARK]` até Vilela informar taxa real; NÃO usar `USD 55.000` bruto) → clique tracking: **90 dias post-click, 1 dia post-view** (basement é high-consideration, ciclo de decisão longo — 30d default corta demais)
3. Copiar `AW-XXXXXXXXXX / label` gerado
4. No GTM, criar Tag → *Google Ads Conversion Tracking* → colar Conversion ID e Label → Trigger: *Form Submission* → filtro por seletor do form da LP → publicar
5. Teste com Google Tag Assistant + `?gtm_debug=1` → confirmar disparo no submit real

### Camada 2 — OCI via gclid (3–4h dependendo da decisão CP1)

**Se decisão = Google Sheets (mais rápido, MVP):**
1. Adicionar campo hidden `gclid` no form da LP + snippet JS que lê `URLSearchParams` e persiste em cookie 30d
2. Adicionar coluna `gclid` na planilha "[VIELA CONSTRUCTION] leads" (planilha do Julio a criar)
3. Criar aba "OCI Upload" com fórmulas que geram CSV nas colunas obrigatórias do Ads
4. Upload semanal manual em Ads → Tools → Conversions → Uploads

**Se decisão = GHL sombra da Kolden:**
1. Criar custom field `gclid` (tipo TEXT) no location `1Jo7tMynqRtbpB3GHuOd` via `POST /custom-fields` (ver `src/scripts/create-custom-field.ts` como molde)
2. Configurar webhook do form da LP → endpoint GHL para criação de Contact com `gclid` no custom field
3. Workflow GHL "Contact Created" com HTTP action → ecoa lead pra planilha Vilela (para o Thiago não perder acesso)
4. Upload semanal manual em Ads (idem MVP) até destravar API OCI

### Camada 3 — Enhanced Conversions (1h)

1. Em Ads → Conversion Action da Camada 1 → editar → aba *Enhanced conversions* → *Turn on*
2. Método: *Google tag* → mapear:
   - `Email` ← seletor do input email do form
   - `Phone` ← seletor do input phone
   - (opcional) `First name`, `Last name`
3. Publicar mudanças no GTM
4. Diagnóstico → *Enhanced conversions status* → confirmar match rate ≥ 70% após 7 dias
5. **Red flag operacional:** se match rate ficar **< 40%** em D+14, escalar como alerta — indica seletores de campo errados (form field `email` sendo lido como campo diferente) OU e-mails hasheados com formato quebrado (whitespace, uppercase). Auditoria via *Enhanced conversions diagnostics* → *Sample events*.

---

## 5. Preparação de scripts (spec, não código nesta sessão)

Para o dia em que o developer token do Google Ads for aprovado:

- `Ferramentas/GoHighLevel/src/scripts/persist-gclid-vilela.ts` — dado um `contactId`, atualiza custom field `gclid` (usa `ghlPut` do `ghl-client.ts` existente)
- `Ferramentas/GoHighLevel/src/scripts/upload-oci-vilela.ts` — dado um range de datas, lê contatos GHL com `gclid ≠ null`, gera payload `uploadClickConversions` (Google Ads API v18+) e envia. Requer `GOOGLEADS_DEVELOPER_TOKEN` do Infisical (ver `Ferramentas/GoogleAds/ferramentas.md`)
- `Ferramentas/GoHighLevel/docs/04-integracao-google-ads.md` — documentar o padrão para reuso em Brayan's Finish e futuros clientes

Nada disso é feito nesta rodada. Fica sinalizado para depois da aprovação e da execução manual das camadas.

---

## 6. Handoffs necessários

| Squad / Agente | Envolvimento | Momento |
|---|---|---|
| **Peitho / pixel-specialist** | Executa Camadas 1, 2 e 3 | Próxima rodada (após respostas §7) |
| **Peitho / kasim-aslam** | Revisa arquitetura de Conversion Action (categoria correta, valor correto, secondary conversions se aplicável) | Antes da Camada 1 |
| **Peitho / traffic-chief** | Aprovação final da arquitetura antes da execução | Antes da Camada 1 |
| **Emporos / gestor-de-crm** | **NÃO envolvido nesta rodada.** CRM está fora do contrato Vilela. Envolver só se CP1 apontar "GHL sombra Kolden" e o Ronan quiser padronizar. | Reavaliar mês 3 do contrato (out/2026) |
| **Ariadne / otimizador-de-formulario** | **Condicional (não opcional).** CRO do form — separado do problema de tag, mas complementar: Camada 1 mede quantas conversões acontecem; Ariadne aumenta quantas acontecem. Gatilho para envolver: **em D+15 pós-Camada 1**, se **taxa de submit da LP < 15%** dos que iniciam preenchimento → Ariadne entra ANTES das Camadas 2 e 3 (não faz sentido otimizar OCI/Enhanced Conversions se ninguém completa o form). Se taxa ≥ 15%, Ariadne fica na fila normal pós-Camada 3. | Gatilho D+15 |
| **Caos** | **Não é necessário criar agente novo.** Peitho tem cobertura completa via pixel-specialist + kasim-aslam. | — |

---

## 7. Perguntas em aberto para o Ronan (4 blocos consolidados, cabem em AskUserQuestion)

**Q1 — Decisão de arquitetura CP1** (o que faz com "formulário GHL nativo" dado que CRM está fora do contrato):
- (a) Preparar arquitetura para o aditivo do mês 3 (planejar agora, ativar em out/2026)
- (b) **Usar GHL sombra da Kolden** (location `1Jo7tMynqRtbpB3GHuOd`) como registro paralelo — ⚠ ver risco jurídico em §8 abaixo antes de escolher
- (c) Reabrir com o cliente a inclusão do CRM antes do mês 3
- (d) Equívoco na resposta — seguir com Google Sheets como sistema de registro provisório

**Q2 — Dados brutos que travam a execução** (multiseleção; Ronan indica quais ele já tem à mão, os outros ficam PENDENTES para Bernardo/Julio puxarem):
- [ ] ID da conta Google Ads da Vilela (`XXX-XXX-XXXX`)
- [ ] URL da variante A do teste (site institucional)
- [ ] URL da variante B do teste (LP nova Kolden)
- [ ] Container GTM já criado? Se sim, `GTM-XXXXXXX`; se não, autorizo criar em nome de qual entidade (Kolden vs Vilela)?
- [ ] Taxa histórica de fechamento Vilela + margem bruta (bloqueia definição de valor de conversão — ver §2 CP4)

**Q3 — Consent Mode v2** — Vilela é Massachusetts (sem lei estadual dura), mas Google Consent Mode v2 é requisito global do Ads a partir de 2024. Autorização para implementar banner discreto de consentimento na LP nesta rodada?
- (a) Sim, banner discreto opt-in
- (b) Só o mínimo técnico para não quebrar Ads (Consent Mode v2 default `denied`)
- (c) Adiar — discutir com Thiago (decisor Vilela) em check-in

**Q4 — HALT retroativo + formalização de aprendizado**:
- Peitho reconhece o gap operacional (Ads ativo em 12/06 sem tag instrumentada = violação do veto `sem_pixel_e_rastreio`). Aprendizado já foi gravado nas memórias `traffic-chief.md` e `kasim-aslam.md`.
- (a) Aprendizado gravado nas memórias basta — seguir
- (b) Adicionar **hook/reflexo Peitho** — "toda vez que um agente Peitho entra em conta ativa, primeira query é auditoria de tag; se negativa, dispara HALT retroativo antes de qualquer análise de estratégia"
- (c) Ambos (a) + (b) — formalizar hook para não depender de memória por agente

---

## 8. Achados adjacentes (para o Ronan considerar)

- **Gap Meta espelhado — precisa diagnóstico separado.** Este laudo cobre Google Ads. Mas a ata 12/06 registra Meta Ads rodando 1 semana (5 leads em Facebook+Instagram, 49+12 visitas à página, Julio "educando o algoritmo") **sem nenhuma menção a Meta Pixel/CAPI**. Provável que o gap seja idêntico do lado Meta — só que lá o custo é maior (algoritmo Meta é agressivo em early learning). **Sugestão:** próxima rodada Peitho abre frente 2 "diagnóstico Meta Pixel/CAPI Vilela" antes de subir Meta budget. Duração estimada equivalente à Camada 1 Google (~2h de spec + auditoria).
- **Reflexo/reminder OCI upload semanal.** Camada 2 (OCI via gclid) tem upload manual semanal em Ads → Tools → Conversions → Uploads. Janela de 90 dias é confortável, mas se ninguém do time Kolden fizer o upload por 3 semanas seguidas, o loop de otimização quebra silenciosamente. **Sugestão:** criar um agendamento (Hermes cron / Google Calendar recorrente / hook shell) "toda sexta 15h Boston: gerar CSV OCI Vilela + notificar Bernardo". Sem esse gatilho automatizado, Camada 2 vira dívida silenciosa. Se Q1 responder (b) GHL sombra, o workflow GHL já resolve; se responder (d) Google Sheets, precisa do agendamento externo.
- **Risco jurídico da opção Q1-b (GHL sombra Kolden).** Hospedar dados de leads Vilela em location Kolden sem consentimento contratual pode: (i) ferir termos de serviço do GHL sobre multi-tenancy (dados de clientes distintos em location única), (ii) ambiguar propriedade dos dados (Kolden vs Vilela) num eventual encerramento de contrato, (iii) criar exposição LGPD/CCPA se leads não são informados de onde seus dados vivem. Mitigação mínima antes de escolher (b): cláusula em check-in escrito "leads Vilela hospedados temporariamente na infra Kolden, propriedade do cliente, transferível a qualquer momento, sem custo adicional". Se essa cláusula não for palatável, opção (b) sai do menu.
- **Documentação GHL não cobre Google Ads.** A pasta `Ferramentas/GoHighLevel` tem manual completo de REST v2, webhooks, workflows, custom fields, mas zero menção a Ads integration. Padrão descoberto aqui deve virar `docs/04-integracao-google-ads.md` em rodada seguinte — reutilizável para Brayan's Finish e próximos clientes.
- **Sazonalidade Vilela:** janela até novembro (público idoso migra pra Flórida no inverno) `[VALIDADO — dossiê §5 e §11]`. Qualquer atraso na instrumentação come budget cego em janela curta. Prioridade alta.
- **Tarefa radar `KLD-2026-129`** ("Fazer checklist do contrato da Vilela Construction") não é bloqueador para este diagnóstico, mas o cross-check do que foi assinado × entregue seria útil para não ativar coisa fora de escopo.

---

## 9. Referências

- Dossiê: `C:\Kolden\sobre-a-empresa\clientes\ativos\vilela-construction.md`
- Ata check-in 12/06: `C:\Kolden\sobre-a-empresa\_conhecimento-institucional\meetings\check-in-kolden-vilela-construction-20260612-0900-gmt-0300-anotações-do-gemini.md`
- Peitho traffic-chief: `C:\Kolden\Peitho\agents\traffic-chief.md`
- Peitho pixel-specialist: `C:\Kolden\Peitho\agents\pixel-specialist.md`
- Peitho kasim-aslam: `C:\Kolden\Peitho\agents\kasim-aslam.md`
- Peitho squad manifesto (vetos): `C:\Kolden\Peitho\squad.yaml`
- GHL manual: `C:\Kolden\sobre-a-empresa\Ferramentas\GoHighLevel\gohighlevel.md`
- GHL endpoints custom fields: `C:\Kolden\sobre-a-empresa\Ferramentas\GoHighLevel\docs\02-endpoints-mapeados.md`
- Google Ads status/token: `C:\Kolden\sobre-a-empresa\Ferramentas\GoogleAds\ferramentas.md`
- Tarefa radar: `C:\Kolden\sobre-a-empresa\operacao\tarefas\radar.yaml` (KLD-2026-129)
