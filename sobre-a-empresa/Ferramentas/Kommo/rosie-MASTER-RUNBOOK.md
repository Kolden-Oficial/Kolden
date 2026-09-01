---
tipo: master-runbook
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# 🎯 Master Runbook — Chatbot Rosie na Kommo (go-live)

> **Este arquivo é o único que o Ronan precisa abrir.** Linkado a todos os
> outros. Ordem de execução linear até o go-live.
>
> Plano-mãe: `C:\Users\Ronan Silva\.claude\plans\maravilha-eu-recebi-a-twinkling-cat.md`
> Estado atual: Ondas 0-1-3(backend) EXECUTADAS. Ondas 2, 3(UI), 5, 6 pendentes.

## O que já está pronto na conta Rosie

Rodei em produção contra `rosie.kommo.com` hoje (2026-07-23):

- ✅ **12 custom fields** em leads (`#2053238-#2053260`)
- ✅ **9 tags** em leads (`#149802-#149818`)
- ✅ **7 pipelines** (4 produção + 3 sombra `[TESTE]`)
- ✅ **7 templates de mensagem** criados (`rosie_*`, `#42758-#42770`)
- ✅ **Pipeline "Carrinho Abandonado"** novo (`id=14171967`)
- ✅ **"Recuperação"** renomeado para "Recuperação / Logística"

E no repo Kolden:

- ✅ Hermes middleware v0.2 completo (17 testes verdes, Dockerfile + railway.toml prontos)
- ✅ Spec executável do Salesbot (30+ nós, clique-a-clique)
- ✅ Spec das 12 automações Digital Pipeline
- ✅ Runbooks (rotação token, ambiente teste, provisionamento)
- ✅ CSV dos 187 leads em Incoming + script de migração em batch

## Ações do Ronan até o go-live

Ordem sugerida. Cada passo tem tempo estimado + link para runbook detalhado.

### 🔐 Passo 1 — Rotacionar Long-Lived Token (10 min)

**Por quê:** o JWT atual foi transmitido em texto puro no chat.

**Como:** `sobre-a-empresa/Ferramentas/Kommo/rosie-provisionamento.md`

Resumo:
1. `rosie.kommo.com/settings/integrations/` → integração `a0364bed…` → revogar token
2. Gerar novo → colar em `$env:TEMP/kt.txt`
3. Cadastrar 6 secrets no Infisical:
   ```bash
   infisical secrets set --projectId=43d90b85-… --env=prod \
     KOMMO_ROSIE_SUBDOMAIN=rosie \
     KOMMO_ROSIE_ACCOUNT_ID=36679659 \
     KOMMO_ROSIE_INTEGRATION_ID=a0364bed-7ea7-4c56-8cf2-e147b3a90d59 \
     KOMMO_ROSIE_AMOJO_ID=141890a7-286c-4bf2-af0f-49f317014fba \
     KOMMO_ROSIE_ACCESS_TOKEN=@$env:TEMP/kt.txt \
     KOMMO_ROSIE_CLIENT_SECRET=@$env:TEMP/ks.txt
   ```
4. Deletar arquivos temporários

### 🚀 Passo 2 — Deploy do Hermes middleware no Railway (20 min)

**Por quê:** o Salesbot precisa chamar `/kommo/horario` para decidir handoff A/B.

**O que já está pronto no repo:**
- `infra/hermes-middleware/Dockerfile` (multi-stage, health check)
- `infra/hermes-middleware/railway.toml` (config as code)
- `infra/hermes-middleware/.dockerignore`
- Build produção `npm run build` gera `dist/index.js` — testado ✅

**Passos:**
```bash
cd C:/Kolden/infra/hermes-middleware

# Gerar KOLDEN_TOKEN novo
openssl rand -hex 32 > $env:TEMP/mw.txt

# Login Railway (se ainda não)
railway login

# Criar/vincular projeto Railway
railway link
# (escolha "Create new project" → nome "hermes-mw-rosie")

# Set env vars mínimas (features v0.2 opcionais)
railway variables --set "KOLDEN_TOKEN=$(cat $env:TEMP/mw.txt)"
railway variables --set "ROSIE_TZ=America/Sao_Paulo"
railway variables --set "NODE_ENV=production"

# Deploy
railway up

# Pega a URL pública
railway domain
# (ex.: hermes-mw-rosie.up.railway.app)

# Smoke live
curl https://hermes-mw-rosie.up.railway.app/health
# Esperado: {"status":"ok","service":"hermes-middleware-kommo","version":"0.2.0",...}

curl -X POST https://hermes-mw-rosie.up.railway.app/kommo/horario \
  -H "X-Kolden-Token: $(cat $env:TEMP/mw.txt)" \
  -H "Content-Type: application/json" -d '{}'
# Esperado: {"in_hours": true|false, "texto": "...", ...}

# Cadastrar URL no Infisical
infisical secrets set --projectId=43d90b85-… --env=prod \
  HERMES_MW_URL=https://hermes-mw-rosie.up.railway.app \
  KOLDEN_TOKEN_HERMES_MW=@$env:TEMP/mw.txt

# Limpar
del $env:TEMP/mw.txt
```

### 📱 Passo 3 — Submeter os 7 templates à moderação Meta (5 min + 24-48h espera)

**Por quê:** para enviar templates fora da janela de 24h do WhatsApp Business.

Os 7 templates JÁ existem na conta (criados via API — IDs 42758-42770). Falta submeter à Meta.

**Passos na UI Kommo:**
1. `rosie.kommo.com` → menu esquerdo → **Templates** (ou **Chats** → **WhatsApp** → **Templates**)
2. Para cada um dos 7 templates:
   - Clicar → **"Enviar para moderação"** ou **"Submit for approval"**
   - Selecionar categoria: **MARKETING** (5) ou **UTILITY** (2), conforme:

| Template | Categoria |
|---|---|
| `rosie_carrinho_followup_2h` | MARKETING |
| `rosie_carrinho_followup_24h` | MARKETING |
| `rosie_carrinho_followup_72h` | MARKETING |
| `rosie_recuperacao_1h` | MARKETING |
| `rosie_recuperacao_24h` | MARKETING |
| `rosie_reativacao_24h` | UTILITY |
| `rosie_reativacao_72h_encerrar` | UTILITY |

3. Selecionar idioma: **pt_BR**
4. Aguardar aprovação da Meta (24-48h)

Meta rejeita se: emojis excessivos, ameaça de escassez ("última chance"), links encurtados,
placeholders mal formatados. Os 7 textos já foram construídos evitando isso.

Se algum for rejeitado, ajustar e resubmeter (Meta explica o motivo).

### 🎨 Passo 4 — Construir o Salesbot na UI Kommo (~14h, 3-4 sessões)

**Por quê:** API `/salesbots` está bloqueada nessa conta — construção via UI.

**Spec canônica clique-a-clique:** `sobre-a-empresa/Ferramentas/Kommo/rosie-onda2-salesbot-spec.md`

**Ordem sugerida:**
- **Sessão 1 (3h):** Nó ENTRADA + 3 botões + OUTRO + HANDOFF_GENERICO + A.QUAL + A.MENU + A1/A1.OK + A.CART
- **Sessão 2 (3h):** A2 + A3 + A4 + HANDOFF_A2/A3/A4
- **Sessão 3 (4h):** B.ID1 + B.ID2 + B.LOC + B.MENU + B1-B7 + HANDOFF_B_GENERICO + HANDOFF_B_RASTREIO
- **Sessão 4 (4h):** widget_requests (`/kommo/horario`) em todos os handoffs + testes end-to-end no ambiente `[TESTE]`

**Ambiente:** construir primeiro no bot sombreado (Pipelines `[TESTE]` já criados na Onda 1).
Duplicar para produção depois de aprovado pelo teste.

### ⚙️ Passo 5 — Configurar as 6 automações Digital Pipeline UI (~2h)

**Por quê:** Kommo Digital Pipeline nativo faz melhor o que o Hermes scheduler faria.

**Spec:** `sobre-a-empresa/Ferramentas/Kommo/rosie-onda3-automacoes-spec.md`

**AUT-02** — Bot esperando resposta → Aguardando Cliente
- Pipeline Pós-Venda → Automation → Digital Pipeline
- Trigger: lead em stage `Com a Gente` (109409507) há **1 hora** sem resposta
- Action: mover para stage `Aguardando Cliente` (109409511)

**AUT-03** — Cliente responde → Com a Gente
- Trigger: message received quando lead está em `Aguardando Cliente`
- Action: mover para stage `Com a Gente`

**AUT-05** — Cliente responde MC → migra P3→P1
- Pipeline Carrinho Abandonado → Digital Pipeline
- Trigger: message received quando lead está em `Abordado` (109412475) ou `Reengajou` (109412479)
- Action 1: mover para stage `Reengajou`
- Action 2: mover para Pipeline Vendas > Novo lead (108316683) — se Kommo suportar
  - Fallback: `POST /kommo/webhook` do Hermes (código já pronto)

**AUT-06** — Sem resposta após MC.2 → Perdido
- Pipeline Carrinho Abandonado → Digital Pipeline
- Trigger: lead em `Abordado` há **48 horas**
- Action: mover para status 143 (Perdido)

**AUT-07** — Follow-ups temporais de carrinho enviado
- Pipeline Vendas → Digital Pipeline
- Trigger: lead em stage `Carrinho enviado / aguardando pagamento` (108316691) há **2 horas**
- Action: enviar template `rosie_carrinho_followup_2h`
- Repetir para +24h (`rosie_carrinho_followup_24h`) e +72h (`rosie_carrinho_followup_72h`)

**AUT-10** — Reativação em Aguardando Cliente
- Pipeline Pós-Venda → Digital Pipeline
- Trigger 1: lead em `Aguardando Cliente` há **24 horas** → envia `rosie_reativacao_24h`
- Trigger 2: lead em `Aguardando Cliente` há **72 horas** → envia `rosie_reativacao_72h_encerrar` + move para `Resolvido`

**Pré-requisito:** templates precisam estar APROVADOS pela Meta (Passo 3).

### 📌 Passo 6 — Registrar webhook Kommo → Hermes (2 min)

**Por quê:** para AUT-05 fallback + cancelamento automático de follow-ups quando cliente responde.

Só executar depois de deploy Railway concluído (Passo 2).

```bash
cd C:/Kolden/infra/hermes-middleware

# Pega KOMMO_WEBHOOK_SECRET (gerar novo se não existir)
openssl rand -hex 32 > $env:TEMP/wh.txt
infisical secrets set --projectId=… --env=prod \
  KOMMO_WEBHOOK_SECRET=@$env:TEMP/wh.txt

# Roda bootstrap-onda3 novamente com HERMES_MW_URL setado
CONFIRM_KOMMO_WRITE=yes-i-know infisical run --projectId=… --env=prod -- \
  tsx scripts/bootstrap-onda3.ts --live
```

Isso registra webhook Kommo apontando para `<HERMES_MW_URL>/kommo/webhook?secret=…`.

### 👥 Passo 7 — Migrar os 187 leads legados em Incoming (Gabrielas + Ronan)

**Por quê:** eles empilharam antes do bot; precisam ser processados uma vez.

**Como:**
1. Gabrielas abrem CSV `sobre-a-empresa/Projetos/Ativos/rosie/kommo-build-2026-07/leads-incoming-vendas-2026-07-23.csv`
2. Adicionam coluna `destino` em cada linha, com um destes valores:
   - `novo-lead` — pedidos Nuvemshop reais para processamento normal
   - `qualificado` — leads já quentes que só faltavam ser categorizados
   - `perdido` — legado morto (Lead #XXX genéricos, sem conversão)
   - `pular` — não processar (fica onde está)
3. Salvar como `decisao-incoming-leads.csv` na mesma pasta
4. Ronan roda:
   ```bash
   cd C:/Kolden/infra/hermes-middleware
   CONFIRM_KOMMO_WRITE=yes-i-know infisical run --projectId=… --env=prod -- \
     tsx scripts/migrate-incoming-leads.ts \
     --csv "C:/Kolden/sobre-a-empresa/Projetos/Ativos/rosie/kommo-build-2026-07/decisao-incoming-leads.csv" \
     --live
   ```

Template CSV com header pronto: `decisao-incoming-leads.template.csv` na mesma pasta.

### 🧪 Passo 8 — Onda 5: Teste no ambiente [TESTE] (~14h, 3 dias)

**Cenários smoke Kolden** (Emporos + Peitho + Dike, ~6h):
1. Entrada + 3 botões roteiam corretamente
2. Trilha A feliz: coleta peça+tamanho+cor+CEP + tag `venda` + card completo escalado
3. Trilha B feliz: portão UMA vez + roteamento B1-B7 correto
4. OUTRO → handoff imediato
5. Handoff fora do horário (mensagem versão B)
6. Handoff dentro do horário (mensagem versão A)
7. Follow-up 2h de venda dispara via Chats API
8. Portão B anti-duplicidade (não repete Nº Pedido)
9. AUT-05: cliente responde em P3 → migra para P1

**Cenários aceite Gabrielas** (~8h):
- A.1 peça em estoque + A.2 esgotada
- B.1 rastreio (Gabriela lê do card) + B.2 troca + B.3 cancelamento
- C.1 carrinho abandonado + AUT 1h + C.2 reengajamento
- D.1 handoff 23h (fora) + D.2 handoff 10h dia útil (dentro)
- E.1 Gabriela altera M0.1 sozinha via doc

**Passe:** 8/8 smoke + 100% cenários + 13/13 checklist da aba 8 da planilha.

### 🎉 Passo 9 — Onda 6: Go-live + doc + treino (~5h)

1. Duplicar Salesbot `[TESTE]` para bot de produção (UI Kommo)
2. Ajustar referências (pipeline_id `[TESTE]` → produção)
3. Ativar Salesbot em produção
4. Dike audita nó-por-nó vs. spec (~2h)
5. Doc "como alterar mensagens sem depender do Ronan" — 1 pager com screenshots do UI Kommo
6. Treino de 1h com Gabrielas (ao vivo por videochamada)
7. Solomon verifica se está consumindo os eventos novos

## Estimativa consolidada (revisada pós-execução)

| Passo | Kolden (Ronan) | Rosie | Calendário |
|-------|---------------|-------|------------|
| 1 Rotação token | 10 min | — | dia 1 |
| 2 Deploy Railway | 20 min | — | dia 1 |
| 3 Submeter templates | 5 min + espera | — | dia 1 (+2 dias moderação Meta) |
| 4 Salesbot UI | ~14h em 3-4 sessões | 2h (Gabrielas revisando texto) | dias 2-4 |
| 5 Digital Pipeline UI | ~2h | 30 min | dia 5 |
| 6 Webhook Kommo→Hermes | 2 min | — | dia 5 |
| 7 Migrar 187 leads | ~30 min execução | ~3-4h Gabrielas classificando | dia 5-6 |
| 8 Teste `[TESTE]` | 6h | 8h | dias 6-8 |
| 9 Go-live + doc + treino | 5h | 1h | dia 9 |

**Total realista:** 10-12 dias corridos após aprovação. **Go-live seguro: 05-08/agosto/2026.**

## Documentos linkados

Todos em `sobre-a-empresa/Ferramentas/Kommo/`:

- `ferramentas.md` — ficha catálogo da ferramenta
- `docs-oficiais.md` — mapa de URLs oficiais Kommo
- `api.md` — referência prática da API
- `mcp-ai.md` — MCP + IA nativa
- `rosie-provisionamento.md` — Passo 1 detalhado
- `rosie-ambiente-teste.md` — como funciona o `[TESTE]`
- `rosie-templates-whatsapp.md` — os 7 templates (Passo 3)
- `rosie-conta-atual.md` — estado da conta pré-Onda 1
- `rosie-onda1-resultado.md` — o que foi criado na Onda 1
- `rosie-onda2-salesbot-spec.md` — Passo 4 detalhado
- `rosie-onda3-automacoes-spec.md` — Passo 5 detalhado
- `rosie-onda3-exec-resultado.md` — descoberta que simplificou v0.2 → v0.1
- `rosie-onda2-3-resultado.md` — resumo das Ondas 2 e 3

E:
- `C:\Users\Ronan Silva\.claude\plans\maravilha-eu-recebi-a-twinkling-cat.md` — plano-mãe
- `sobre-a-empresa/Projetos/Ativos/rosie/kommo-build-2026-07/leads-incoming-vendas-2026-07-23.csv` — os 187 leads
- `infra/hermes-middleware/` — Hermes middleware v0.2 (Node/Fastify + Redis Upstash + Railway ready)

## Escopo removido / decisões travadas

- **Q3 (rastreio ao vivo):** REMOVIDO — humano lê do card
- **Q3b (estoque ao vivo):** REMOVIDO — humano checa
- **Onda 4 (Nuvemshop widget_request):** REMOVIDA integralmente
- **Q4 (Pipeline 3 recorte 60-70%):** aceito (Nuvemshop não expõe pré-checkout)
- **Q7 (comercial):** dentro da assessoria mensal, sem cobrança extra
- **Salesbot API:** não disponível no plano — construção via UI
- **`waba_*` API pública:** 403 — submissão via UI
- **Chats API canal custom:** não necessário (WhatsApp da Rosie já conectado nativamente)
- **Scheduler Hermes + Upstash Redis:** ficou no código como opção futura, Digital Pipeline UI resolve nativamente

## Nada foi commitado

Sugestão de commits atômicos (só se você autorizar):
1. `sobre-a-empresa: dossie kommo + runbooks rosie completos`
2. `infra: hermes-middleware v0.2 (horario + scheduler + webhook + dispatch)`
3. `hermes-agent-memory: aprendizados sessao rosie/kommo 2026-07-23`
