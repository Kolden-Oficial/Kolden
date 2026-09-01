---
tipo: registro
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Onda 3 EXEC — Aplicado na conta (2026-07-23 23:10 BRT)

Script: `infra/hermes-middleware/scripts/bootstrap-onda3.ts --live`.
Log: `infra/hermes-middleware/logs/rosie-onda3.log`.

## ✅ Aplicado na conta rosie.kommo.com

### 7 templates de mensagem criados

| ID Kommo | Nome | Categoria | Uso |
|---|---|---|---|
| 42758 | `rosie_carrinho_followup_2h` | MARKETING | MA5.2 (+2h após envio de carrinho) |
| 42760 | `rosie_carrinho_followup_24h` | MARKETING | MA5.3 (+24h) |
| 42762 | `rosie_carrinho_followup_72h` | MARKETING | MA5.4 (+72h, última tentativa) |
| 42764 | `rosie_recuperacao_1h` | MARKETING | MC.1 (+1h após carrinho abandonado Nuvemshop) |
| 42766 | `rosie_recuperacao_24h` | MARKETING | MC.2 (+24h, com incentivo) |
| 42768 | `rosie_reativacao_24h` | UTILITY | MR.1 (+24h após card entrar em Aguardando Cliente) |
| 42770 | `rosie_reativacao_72h_encerrar` | UTILITY | MR.2 (+72h, encerra pausa) |

**Nota importante:** todos criados como `type=amocrm` (templates internos Kommo).
Podem ser enviados como texto livre dentro da janela de 24h do WhatsApp Business.
Para envio **fora da janela** (todos os follow-ups temporais >24h que precisamos),
precisam ser **submetidos à moderação Meta via UI Kommo** — API pública NÃO permite
setar `waba_template_type`/`waba_language` (`403 Forbidden — This is a private API`).

## ⚠️ Não aplicado via API (limitações confirmadas)

| Item | Motivo | Como resolver |
|------|--------|---------------|
| `waba_*` fields nos templates | API pública 403 | UI Kommo → Chats → WhatsApp → Templates → clicar em cada template → habilitar "Submit for approval" |
| Salesbot construção | `/salesbots` 404 no plano | UI Kommo → Automation → Salesbot → seguir spec `rosie-onda2-salesbot-spec.md` |
| Digital Pipeline rules | Sem endpoint público de config | UI Kommo → Automation → Digital Pipeline → seguir spec `rosie-onda3-automacoes-spec.md` |
| Webhook Kommo → Hermes | Aguarda `HERMES_MW_URL` (deploy Railway) | Rerodar `bootstrap-onda3.ts` com env `HERMES_MW_URL=https://<url-railway>` + `KOMMO_WEBHOOK_SECRET=…` |
| Chat channel custom (amojo) | Precisa credencial `KOLDEN_INTEGRATION` da Kommo Marketplace | Só via aplicativo público — não necessário para este escopo (WhatsApp da Rosie já está conectado pela integração oficial Kommo) |

## Estado do endpoint dispatch (Hermes middleware)

O código atual em `src/routes/kommo/dispatch.ts` usa `chats.sendText(conversationId, "", { templateName, templateParams })`. Isso pressupõe canal custom registrado.

**Como o WhatsApp da Rosie está conectado pela integração oficial Kommo (não custom),
o envio proativo real depende de:**

**Opção A (recomendada, sem código extra):**
- Ronan submete os 7 templates à moderação Meta via UI Kommo
- Quando aprovados, o **Digital Pipeline UI** dispara envio nativo (Kommo cuida do resto)
- Hermes middleware fica só com `/kommo/horario` (widget para Salesbot) + `/kommo/webhook` (cancelar follow-ups do lado nosso)

**Opção B (mais controle, mais código):**
- Rosie registra app privado na Kommo Marketplace + configura canal custom
- Hermes usa Chats API amojo com `KOMMO_ROSIE_CHANNEL_SCOPE_ID` + HMAC
- Dispatch envia templates programaticamente

**Decisão:** ficar com Opção A. É o padrão e evita reinvenção. O código do
scheduler/dispatch já pronto no Hermes serve para o cenário futuro se algum dia
migrarmos para canal custom.

## Recomendação de ajuste no plano

O Digital Pipeline UI Kommo tem capacidade nativa de:
- "quando lead está em stage X há N horas → dispara template Y"
- "quando webhook Z chega → move card para stage W"

**AUT-02, AUT-03, AUT-05 (fallback), AUT-06, AUT-07, AUT-08, AUT-10** ficam **100% na UI Digital Pipeline** — sem dependência do Hermes.

**Hermes middleware fica focado em:**
- `/kommo/horario` — decisão A/B do handoff no Salesbot (não substituível)
- `/kommo/webhook` (opcional) — se precisarmos lógica custom não expressável na UI

Isso simplifica muito o escopo:
- Sem cron Railway
- Sem Upstash Redis obrigatório
- Sem canal Chats API custom
- Hermes v0.1 (só `/kommo/horario`) é suficiente para produção
- Toda a orquestração de follow-ups fica dentro do Kommo

## Consequências práticas

**Simplificação do deploy Ronan:**
1. Railway com Hermes middleware v0.1 (só `/kommo/horario`)
2. Env: só `KOLDEN_TOKEN`
3. Sem Upstash Redis
4. Sem cron
5. Sem canal Chats API

**Consequência do time Rosie:**
- Gabrielas conseguem editar mensagens dos follow-ups **direto na UI Kommo** (Digital Pipeline → editar automação → mudar texto do template)
- Zero dependência do Ronan para ajustar texto

**Isso ATENDE ao entregável 8 do briefing** ("Documentação simples de como alterar
as mensagens sem depender de vocês") de forma nativa — Kommo é a doc.

## Ainda depende do Ronan (Onda 0 humana pendente)

1. **Rotacionar token Kommo** (o JWT ainda é o original exposto no chat)
2. **Deploy Hermes middleware v0.1 no Railway** (só `/kommo/horario`)
3. **Cadastrar `KOLDEN_TOKEN` no Railway + `HERMES_MW_URL` no Infisical**
4. **Submeter os 7 templates à moderação Meta via UI Kommo** (24-48h)
5. **Construir Salesbot na UI Kommo** seguindo `rosie-onda2-salesbot-spec.md` (14h)
6. **Configurar Digital Pipeline** com AUT-02/03/06/07/08/10 na UI (2-3h)
7. **Migrar os 187 leads** de "Incoming leads" no Vendas (CSV entregue)
