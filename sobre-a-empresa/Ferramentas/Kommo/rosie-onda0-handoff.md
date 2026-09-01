---
tipo: handoff
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Handoff — Onda 0 completa, Onda 1 preparada (dry-run OK)

Data: 2026-07-23, ~22:15 BRT
Executor: Hermes (Claude Code sessão)
Estado: Onda 0 = **ferramentas prontas** (aguarda Ronan executar 4 ações); Onda 1 = **script prontd em dry-run**.

## O que foi feito nesta sessão

### Fase de planejamento (aprovada via ExitPlanMode)

- Plan mãe: `C:\Users\Ronan Silva\.claude\plans\maravilha-eu-recebi-a-twinkling-cat.md`
- 3 Explores paralelos + 1 Plan agent + 4 AskUserQuestion consolidados
- Decisões travadas: escopo simplificado (sem widget_request Nuvemshop), dentro do contrato de assessoria, ambiente teste sombreado
- Consolidado: **48h Kolden + 13h Rosie + 10-12 dias corridos, go-live seguro 08/08/2026**

### Onda 0 — Preparação (100% do lado Kolden, aguarda Ronan)

| Item | Estado | Onde |
|------|--------|------|
| Hermes middleware v0.1 (endpoint `/kommo/horario`) | ✅ código + testes 10/10 + smoke live | `C:\Kolden\infra\hermes-middleware\` |
| Runbook rotação de token + cadastro Infisical | ✅ pronto | `Ferramentas/Kommo/rosie-provisionamento.md` |
| 7 templates WhatsApp catalogados (para moderação Meta) | ✅ pronto | `Ferramentas/Kommo/rosie-templates-whatsapp.md` |
| Documentação ambiente `[TESTE]` sombreado | ✅ pronto | `Ferramentas/Kommo/rosie-ambiente-teste.md` |
| Levantamento do estado atual da conta | ✅ pronto | `Ferramentas/Kommo/rosie-conta-atual.md` |
| Script bootstrap Onda 1 (DRY-RUN validado) | ✅ pronto | `infra/hermes-middleware/scripts/bootstrap-onda1.ts` |

## O que o Ronan precisa fazer (Onda 0 humana)

Ordem sugerida (~40 min total):

### 1. Enviar e-mail ao Bruno (usando rascunho do plan file)

Copiar de `maravilha-eu-recebi-a-twinkling-cat.md` seção "Rascunho de resposta ao Bruno".
Pontos-chave:
- Prazo 10-12 dias corridos, go-live seguro 08/08
- Orçamento dentro da assessoria mensal (não separado)
- Confirmações técnicas 1 e 2 já respondidas (escopo simplificado)
- 3 perguntas de retorno (Recuperação atual, escopo aceito, disponibilidade Gabrielas)

### 2. Rotacionar Long-Lived Token da Kommo

Seguir `Ferramentas/Kommo/rosie-provisionamento.md` passo a passo:
1. Revogar token exposto no chat (integração `a0364bed…`)
2. Gerar novo token
3. Cadastrar 6 secrets `KOMMO_ROSIE_*` no Infisical
4. Gerar `KOLDEN_TOKEN_HERMES_MW` (`openssl rand -hex 32`)
5. Smoke test com o novo token

### 3. Deploy do Hermes middleware no Railway

```bash
cd C:/Kolden/infra/hermes-middleware
# Login se necessário
railway login
railway link  # associar a novo/existente projeto Kolden
railway up    # build + deploy

# Depois do deploy, configurar env vars:
railway variables set \
  KOLDEN_TOKEN=<valor do KOLDEN_TOKEN_HERMES_MW gerado no passo 2> \
  ROSIE_TZ=America/Sao_Paulo
```

Depois do deploy, salvar a URL Railway (ex.: `https://hermes-mw-rosie.up.railway.app`)
em `/kolden/prod/HERMES_MW_URL` no Infisical.

Smoke live:
```bash
curl https://<url-railway>/health
```

### 4. Submeter os 7 templates WhatsApp à Meta

Via UI Kommo → Settings → Chats → WhatsApp Business API → Templates.
Cada um dos 7 templates listados em `Ferramentas/Kommo/rosie-templates-whatsapp.md`.
Meta demora 24-48h para moderar — melhor começar antes das Gabrielas testarem.

## Após Onda 0 concluída, executar Onda 1 (script + ações manuais)

### 1. Rodar bootstrap script em LIVE

Depois de Infisical cadastrado:

```bash
cd C:/Kolden/infra/hermes-middleware
CONFIRM_KOMMO_WRITE=yes-i-know infisical run \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  npx tsx scripts/bootstrap-onda1.ts --live
```

O script vai:
- Criar 12 custom fields novos em leads
- Criar 9 tags em leads
- Renomear "Carrinho Enviado" → "Carrinho enviado / aguardando pagamento" no Pipeline Vendas
- **PULAR** delete de "Incoming leads" no Pipeline Vendas (tem 91 leads)
- Deletar "Incoming leads" no Pipeline Pós-Venda (vazio)
- Renomear "Recuperação" → "Recuperação / Logística"
- Criar novo Pipeline "Carrinho Abandonado" (3 stages + 142 e 143 auto)

Log em `logs/rosie-onda1.log`.

### 2. Ações manuais Onda 1 (não automatizadas — exigem julgamento humano)

**a) Migrar os 91 leads da stage "Incoming leads" (Vendas):**
- Via UI Kommo, filtrar leads em `Vendas > Incoming leads`
- Revisar cada um (ou lote): manter em "Novo lead" ou marcar como perdido
- Depois de zerar, deletar a stage via UI

**b) Renomear as stages terminais do novo Pipeline "Carrinho Abandonado":**
- Kommo cria 142 e 143 automáticos com nomes genéricos
- Renomear 142 → "Recuperado" e 143 → "Perdido" via UI (mais fácil que via API)

**c) Criar os pipelines `[TESTE]` sombreados:**
- 3 pipelines: `[TESTE] Vendas`, `[TESTE] Pós-venda`, `[TESTE] Carrinho abandonado`
- Mesmas etapas dos reais
- Podem ser criados por script (adicionar ao bootstrap-onda1.ts numa v2) ou UI

**d) Criar a lista Kommo "whitelist_teste_salesbot":**
- Via UI → Listas → Nova lista
- Popular com 4-6 números de teste (Ronan, Gabrielas, Catarinas)

## Ondas seguintes (2-6)

Todas dependem de Onda 0 + Onda 1 completas:

- **Onda 2:** Salesbot esqueleto via UI (14h Kolden, ~3 dias)
- **Onda 3:** Automações + Chats API follow-ups (12h Kolden, ~2 dias)
- **~~Onda 4~~:** REMOVIDA (widget_request Nuvemshop)
- **Onda 5:** Teste (6h Kolden + 8h Rosie, ~3 dias)
- **Onda 6:** Go-live + doc (5h Kolden, ~1-2 dias)

## Riscos monitorados

- **Nuvemshop pré-login**: comunicado ao Bruno (recorte 60-70%)
- **Moderação Meta**: submeter cedo na Onda 0
- **Drift planilha↔UI**: par Emporos + Ronan + Dike na Onda 6
- **Scope creep**: cláusula "planilha versão 2026-07-24 = âncora"
- **91 leads da stage Incoming leads**: migração humana antes do delete

## Verificação end-to-end (Onda 5)

- 8 smoke tests Kolden (Emporos + Peitho + Dike)
- 10 cenários aceite Gabrielas
- 13 critérios formais aba 8 da planilha
- Passe = 100% em todos os 3 conjuntos

## Fontes canônicas desta sessão

- Plan mãe: `C:\Users\Ronan Silva\.claude\plans\maravilha-eu-recebi-a-twinkling-cat.md`
- Planilha spec: Google Drive `1DCbIzBKJ-q2Q5rFio4Q3kSVwE6ItrE1p` (`Rosie_Kommo_Build_Spec.xlsx`, v.2026-07-24)
- Contrato de Missão: `Caos/contratos-de-missao/m-20260701-112935-rosie-90d.yaml` (build entra como anexo D+30)
- Dossiê Kommo: `sobre-a-empresa/Ferramentas/Kommo/` (11 arquivos)

---

## Commits pendentes (aguardando ordem explícita do Ronan)

**Não commitei nada.** Novos/modificados:

- Novo: `infra/hermes-middleware/` (10 arquivos)
- Novo: `sobre-a-empresa/Ferramentas/Kommo/rosie-provisionamento.md`
- Novo: `sobre-a-empresa/Ferramentas/Kommo/rosie-templates-whatsapp.md`
- Novo: `sobre-a-empresa/Ferramentas/Kommo/rosie-ambiente-teste.md`
- Novo: `sobre-a-empresa/Ferramentas/Kommo/rosie-conta-atual.md`
- Novo: `sobre-a-empresa/Ferramentas/Kommo/rosie-onda0-handoff.md` (este)
- Novo: `sobre-a-empresa/Ferramentas/Kommo/ferramentas.md`, `api.md`, `docs-oficiais.md`, `mcp-ai.md` (da sessão anterior)
- Modificado: `sobre-a-empresa/Ferramentas/ferramentas.md`, `mcp-status.md` (linha Kommo)
- Memória Hermes atualizada: `Hermes/agent-memory/hermes.md`
- Memórias do projeto: `.claude/projects/C--Kolden/memory/project_kommo_ferramenta_dossie.md`

Sugestão de commit atômico depois que Ronan validar:
```
1. sobre-a-empresa: dossie completo da ferramenta Kommo + runbooks Rosie
2. infra: hermes-middleware v0.1 (endpoint /kommo/horario para Salesbot)
3. hermes-agent-memory: aprendizados da sessão Rosie/Kommo 2026-07-23
```
