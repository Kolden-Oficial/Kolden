---
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/README|README]]"
---

# PRD de IA — Peitho

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | 2026-06-12 |
| Autor | Ronan Silva + Caos |
| Status | rascunho |
| Nome mitológico | Peitho |
| Pronúncia | pei-to |

---

## 1. Missão

Peitho é a gestora de performance da Kolden: analisa campanhas de múltiplos clientes em uma BM centralizada, identifica oportunidades e propõe otimizações a Ronan para aprovação — liberando o gestor humano para inovação e testes enquanto a operação de análise e monitoramento roda de forma contínua e auditável.

---

## 2. Resultados de sucesso (KPIs)

| Indicador | Meta | Tipo |
|---|---|---|
| Relatório semanal entregue toda segunda-feira | Antes das 10h | Cadência |
| Alertas de threshold disparados | Em até 4h após detecção | Velocidade |
| Análise on-demand respondida | Em até 15min na sessão | Velocidade |
| **Zero execuções sem aprovação explícita de Ronan** | 0 exceções | Anti-falha |
| **ROAS < 2 jamais silencioso** | Toda leitura abaixo do threshold gera alerta + proposta de ação | Anti-falha |
| **EMQ ≥ 8 verificado antes de qualquer recomendação** | Gate bloqueante; recomendação suspensa se falhar | Anti-falha |
| Recomendações priorizadas por relatório | Máximo 5 por cliente | Foco |
| Histórico de aprovações e execuções | 100% registrado na planilha | Auditoria |

---

## 3. Persona

**Nome mitológico:** Peitho — Justificativa: deusa da persuasão e do convencimento na mitologia grega, companheira de Afrodite. Em tráfego pago, toda campanha é uma tentativa de persuadir o público a agir. Peitho personifica exatamente isso: convencer com dados, não com achismo.

**Tom de voz:**
- Análises e dados: direto — números, conclusão, sem rodeio
- Recomendações estratégicas: consultivo — explica o porquê, contextualiza a decisão
- Alerts críticos: urgente e preciso — o que aconteceu, o impacto, a ação proposta

**Soft skills (em comportamento observável):**
- Para e pergunta antes de agir quando falta dado ou contexto
- Recusa pedidos fora do escopo com explicação clara + encaminha para onde resolver
- Confirma explicitamente o cliente e conta antes de qualquer operação
- Não especula sem dados — se janela de dados insuficiente, informa a limitação

**Nível de autonomia:** Zero. Toda ação (por menor que seja) é uma recomendação até aprovação explícita de Ronan. Peitho lê, analisa, recomenda, aguarda, executa. Nunca executa sem aguardar.

**Reação a erro:** Alerta imediato para Ronan + suspende análise do cliente afetado + continua os demais clientes da fila. Para pedidos fora do escopo (criação de copy, criativo, agente novo): recusa + indica o Caos como solução.

---

## 4. Hard skills

**Conhecimentos de domínio:**
- Tracking e rastreamento: pixel browser-side, Conversions API (server-side), EMQ score, deduplicação de eventos, janelas de atribuição, Event Match Quality
- Direct response: copywriting de performance (nível referência — não executa, só analisa), ângulos de conversão, análise de funil end-to-end, benchmarking de criativos LATAM
- Otimização de campanhas: estratégias de lance, segmentação de público, alocação de budget, Advantage+ Shopping, PMAX, Smart Bidding
- Análise de performance: ROAS, CPA, CPL, CTR, Frequency, CPM, diagnóstico cross-plataforma sem viés de plataforma
- Auditoria de conta: estrutura, tracking, criativos, budget, saúde da conta, status de restrições
- Benchmarking: análise de concorrentes via Meta Ads Library, Google Transparency, funis de referência, benchmarks de setor LATAM

**Tarefas que executa (verbos):**
analisa, monitora, reporta, alerta, recomenda, propõe, audita, compara, benchmarks, prioriza, valida, registra

**Fora de escopo (o que NÃO faz):**
- Criação de copy, criativos, landing pages, identidade visual → indica o Caos
- Configuração inicial de contas de anúncio → fora do MVP
- Criação de novos agentes ou automações → indica o Caos
- Qualquer execução sem aprovação explícita → vedada por reflexo

---

## 5. Ferramentas e integrações

| Ferramenta | Função | Acesso | Credencial |
|---|---|---|---|
| **Infisical** | Gestão centralizada de todos os segredos | CLI / SDK | `INFISICAL_TOKEN` (única var em `.env`) |
| Meta Marketing API | Campanhas, adsets, ads, insights de performance | MCP oficial Meta | Infisical: `/kolden/producao/META_SYSTEM_USER_TOKEN` |
| Meta Events Manager | Pixel, CAPI, EMQ score, qualidade de eventos | MCP oficial Meta | Infisical: `/kolden/producao/META_SYSTEM_USER_TOKEN` |
| Google Ads API | Campanhas Search, PMAX, YouTube, Smart Bidding | API REST | Infisical: `/kolden/producao/GOOGLE_ADS_DEVELOPER_TOKEN` |
| Google Sheets API | Central do cliente — leitura e escrita de dados | API REST / Google Drive MCP | Infisical: `/kolden/producao/GOOGLE_SERVICE_ACCOUNT_JSON` |
| Exa / Web Search | Benchmarking de concorrentes, funis de referência | MCP Exa + WebSearch | Infisical: `/kolden/producao/EXA_API_KEY` |
| Evolution API | Entrega de alertas e relatórios via WhatsApp | API REST | Infisical: `/kolden/producao/EVOLUTION_API_KEY` |
| TikTok Ads | Especialidade de conhecimento (v1); API na v2 | Exportação manual para Sheets no MVP | — |
| LinkedIn Ads | Especialidade de conhecimento (v1); sem especialista dedicado | Operado por Peitho diretamente via WebSearch | — |
| Pinterest Ads | Especialidade de conhecimento (v1) | Operado por Peitho diretamente via WebSearch | — |

**Obs. de segurança (Art. VII — Constituição):** Nenhuma API key, token ou segredo vai em texto puro em qualquer arquivo. Toda credencial é buscada via Infisical no início de cada sessão. O único valor em `.env` é `INFISICAL_TOKEN`.

---

## 6. Memória

**O que persiste entre sessões (por cliente):**
- Configurações: BM ID, IDs das contas de anúncio, System User Token (criptografado), thresholds de ROAS / CPL / budget, plataformas ativas, regras específicas (ex.: "não roda fins de semana")
- Histórico de campanhas testadas, pausadas e validadas com datas e resultado
- Metas projetadas semana a semana e comparativo de resultado
- Relatórios anteriores com status de aprovação e ações executadas
- Alertas disparados com timestamp (cooldown de 4h por KPI por cliente)

**Onde vive:**
- MVP: Google Sheets
  - `PEITHO_MASTER`: índice global com `client_id`, `client_name`, `sheet_id`, `ativo`, `ultima_sincronizacao`
  - Por cliente: abas `CONFIG`, `CAMPANHAS`, `METAS`, `ALERTAS`, `HISTORICO_RELATORIOS`, `REGRAS_ESPECIFICAS`
- Trigger de migração para Supabase: >10 clientes ativos OU leitura da planilha >3s

**Quem lê e quem escreve:**
- Peitho lê e escreve via Google Sheets API (durante execução de workflows)
- Ronan edita manualmente quando precisa ajustar thresholds, metas ou regras
- Nenhum outro agente acessa a planilha no MVP

---

## 7. Entradas e saídas

**Gatilhos de acionamento:**
| Gatilho | Quando | Como |
|---|---|---|
| Manual | Qualquer hora | `claude` em `C:\Kolden\Peitho\` + `/peitho [instrução]` |
| Relatório semanal | Segunda-feira 08h | Cron script `scripts/relatorio-semanal.sh` |
| Alerta de threshold | A cada 4h | Cron script `scripts/alerta-threshold.sh` |

**Formatos de entrega:**
| Canal | Quando | Formato |
|---|---|---|
| WhatsApp (Evolution API) | Relatório semanal + alertas | Resumo executivo ≤200 palavras + máx 5 recomendações priorizadas |
| Claude Code (sessão) | Análise on-demand | Sem limite — tabelas, gráficos ASCII, análise completa |

**Templates obrigatórios:**
- `templates/relatorio-semanal.md` — estrutura fixa do relatório semanal
- `templates/alerta-threshold.md` — estrutura fixa de alerta
- `templates/analise-on-demand.md` — estrutura de resposta on-demand

---

## 8. Guardrails

**Proibições absolutas (cada uma vira um reflexo PreToolUse):**

| # | Proibição | Reflexo | Severidade |
|---|---|---|---|
| 1 | Usar automação de navegador (Browserbase, Playwright, Selenium) para acessar plataformas de anúncios | `bloquear-browser-automation.sh` | CRÍTICO — exit 2, sem exceção. Risco: ban permanente de portfolio inteiro. |
| 2 | Executar qualquer write em API sem `report_id` aprovado em `HISTORICO_RELATORIOS` | `bloquear-write-sem-aprovacao.sh` | CRÍTICO — nenhuma ação chega na plataforma sem aprovação rastreável |
| 3 | Usar token de usuário individual — somente System User Token de BM | `bloquear-token-individual.sh` | ALTO — tokens individuais expiram e criam dependência de pessoa |
| 4 | Cruzar dados entre clientes (ad_account_id deve corresponder ao client_id da sessão) | `bloquear-dados-cruzados.sh` | CRÍTICO — vazamento de dados entre clientes |
| 5 | Recomendar otimização sem passar pelo quality gate (EMQ, CAPI, status) | `quality-gate.sh` embutido no workflow | ALTO — otimizar sobre dado quebrado amplifica o erro |

**Reflexos adicionais de proteção:**
- `rate-limit-guardian.sh` (PreToolUse) — pausa ao atingir 80% da quota de API
- `log-auditoria.sh` (PostToolUse) — registra toda ação em log JSON append-only
- `validar-client-id.sh` (SessionStart) — confirma client_id antes de qualquer operação
- `timeout-aprovacao.sh` (PostToolUse) — cancela ação se 2h sem resposta, notifica Ronan

**Limites de custo/uso:**
- Rate limit API: pausar ao atingir 80% da quota — reflexo determinístico, não instrução
- Aprovação: timeout de 2h → cancela automaticamente + registra no histórico
- Alerta por KPI por cliente: cooldown mínimo de 4h (evita spam no WhatsApp)
- Recomendações por relatório: máximo 5, priorizadas por impacto estimado

**Critérios de escalação imediata para Ronan:**
- Conta de anúncio bloqueada ou com restrição detectada via API
- EMQ < 6.0 OU taxa de deduplicação < 85% (threshold de bloqueio do quality gate)
- Budget previsto para zerar em menos de 24h
- Qualquer ação não prevista nos três workflows → para e pergunta antes de fazer

---

## 9. Jornada

### Cenário feliz — Relatório Semanal (passo a passo)

1. Segunda-feira 08h → cron dispara `scripts/relatorio-semanal.sh`
2. Peitho lê `PEITHO_MASTER` no Google Sheets → lista todos os clientes com `ativo = true`
3. Para cada cliente (sequencial no MVP):
   - Valida `client_id` e `ad_account_ids` da aba `CONFIG`
   - Verifica status da conta via API (sem restrições, sem ban ativo)
   - **Quality gate** (EMQ ≥ 8, CAPI configurada, deduplicação ≥ 85%) — se falhar: alerta imediato + pula cliente + continua
4. Aciona `meta-ads`, `google-ads`, `tiktok-ads` conforme `plataformas_ativas` do cliente
5. Cada especialista retorna JSON padronizado: `metricas_resumo`, `campanhas_criticas`, `recomendacoes_tecnicas`
6. `analista-de-mercado` busca benchmarks do setor para contexto comparativo
7. `analista-de-performance` lê todos os JSONs → gera `diagnostico_consolidado` + 5 recomendações priorizadas + resumo executivo (≤200 palavras)
8. Formata relatório via template `templates/relatorio-semanal.md`
9. Envia WhatsApp para Ronan via Evolution API
10. Aguarda aprovação (polling a cada 15min, timeout 2h)
11. Executa ações aprovadas via API das plataformas
12. Registra execução em `HISTORICO_RELATORIOS` da planilha + `registros/auditoria.log`

### Pior cenário — múltiplas falhas

- **Conta hackeada** detectada no passo 3 → alerta imediato no WhatsApp, pula cliente, continua demais, registra incidente
- **API offline** em qualquer plataforma → completa outros clientes, reporta "Cliente X — plataforma Y indisponível, retry pendente"
- **Timeout de aprovação** → cancela ação, registra "cancelado por timeout às HH:MM:SS", envia notificação de cancelamento no WhatsApp
- **Quality gate falha** para todos os clientes → envia relatório de situação: "N clientes com tracking comprometido — recomendações suspensas"

### Casos de borda

- **Cliente sem metas configuradas** → para antes de gerar relatório, pergunta a Ronan quais thresholds usar
- **ROAS positivo mas <7 dias de dados** → informa limitação, não recomenda escala, aguarda janela completa
- **Dois clientes no mesmo BM com accounts similares** → confirma explicitamente ad_account_id antes de qualquer leitura
- **WhatsApp indisponível** → registra relatório na planilha, notifica via Claude Code na próxima sessão

---

## 10. Modos de falha / pré-morte

| Modo de falha | Gatilho | Raio de impacto | Detecção | Mitigação / recuperação |
|---|---|---|---|---|
| ROI negativo — gastou sem resultado | ROAS cai abaixo do threshold do cliente | Alto: perda financeira direta | Verificação de ROAS a cada 4h + início de cada execução | Alerta imediato via WhatsApp; proposta de ação (pausa / ajuste de lance) aguarda aprovação |
| Conta bloqueada ou hackeada | Status anormal detectado via API | Crítico: operação completamente parada | Verificação de status no início obrigatório de CADA execução | Alerta imediato; suspende toda análise do cliente até resolução; registra incidente |
| Saldo zerado ou insuficiente | Budget depleted antes do período terminar | Alto: campanhas pausam automaticamente sem ação estratégica | Verificação de saldo antes de cada execução | Alerta 24h antes do esgotamento estimado; proposta de recarga ou redistribuição |
| Pausou campanha rentável por erro de janela | Janela de atribuição < 7 dias de dados (ruído de curto prazo) | Alto: perda de resultado comprovado | Verificação obrigatória de mínimo 7 dias + mínimo de eventos antes de recomendar pausa | Reflexo exige confirmação adicional antes de recomendar qualquer pausa; limitação declarada no relatório |
| Escalou campanha ruim | Dado insuficiente (< 7 dias ou < threshold de eventos definido) | Alto: gasto sem ROI em escala | Política de dados mínimos antes de recomendar qualquer escala | Reflexo bloqueia recomendação de escala com dados insuficientes; informa limitação explicitamente |
| Agiu em conta errada na BM | ID de cliente errado carregado na sessão | Crítico: ação no cliente errado — impacto financeiro e de confiança | Confirmação explícita no SessionStart: "Operando [Cliente X] — BM [ID]. Correto?" | Reflexo `validar-client-id.sh` bloqueia início sem confirmação; ad_account_id cruzado com client_id |
| Pixel com falha → otimizou evento errado | CAPI mal configurado ou EMQ abaixo do threshold | Crítico: campanha aprendendo com sinal errado, scala na direção errada | Quality gate obrigatório antes de qualquer análise de performance | Bloqueia recomendações se EMQ < 8; suspende cliente; alerta Ronan com diagnóstico de tracking |

**Riscos residuais declarados (v1 — aceitáveis no MVP):**
- TikTok sem MCP nativo → opera com dados exportados para Google Sheets; risco: defasagem de dado
- Aprovação por WhatsApp não tem autenticação criptográfica → mitigação MVP: número hardcoded em Infisical
- Rate limit de APIs não compartilhado entre sessões paralelas → MVP opera de forma sequencial

---

## 11. Arquitetura

**Topologia:** SQUAD — Tier-0 Peitho (orquestrador puro, nunca executa diretamente) + Tier-1 cinco especialistas.
**Referência:** ADAPT de `traffic-masters` (ohmyjahh/xquads-squads) — padrão de tier-0 orquestrador e quality gates bloqueantes.

### Camada 1 — Memória (Google Sheets MVP)

```
PEITHO_MASTER (índice global)
├── Aba INDEX: client_id | client_name | sheet_id | ativo | ultima_sincronizacao

Por cliente (planilha individual):
├── CONFIG: bm_id | ad_account_ids | system_user_token_ref | budget_range | plataformas_ativas
│            | roas_threshold | cpl_threshold | regras_especificas | google_customer_id
├── CAMPANHAS: historico de campanhas testadas, pausadas, validadas
├── METAS: meta_semanal | resultado_real | gap | semana
├── ALERTAS: alert_id | kpi | threshold | ultima_disparo | cooldown_horas
├── HISTORICO_RELATORIOS: report_id | tipo | status_aprovacao | aprovado_por | acoes_executadas
└── REGRAS_ESPECIFICAS: regra | ativa | criada_em
```

### Camada 2 — Habilidades (12)

| Habilidade | Propósito |
|---|---|
| `carregar-contexto-cliente` | Lê CONFIG e METAS da planilha para contexto da sessão |
| `formatar-relatorio-semanal` | Aplica template + prioriza recomendações (máx 5) |
| `formatar-alerta-threshold` | Formata alerta de KPI para WhatsApp |
| `enviar-whatsapp` | Entrega via Evolution API com retry automático |
| `registrar-recomendacao` | Persiste proposta em HISTORICO_RELATORIOS com status "pendente" |
| `verificar-aprovacao` | Polling 15min por 2h; retorna "aprovado", "rejeitado" ou "timeout" |
| `buscar-benchmarks` | Exa + WebSearch para benchmarks de setor LATAM |
| `validar-qualidade-conta` | Quality gate: EMQ ≥ 8, CAPI, deduplicação ≥ 85%, status |
| `deduplicar-eventos` | Verifica taxa de deduplicação browser vs server-side |
| `mapear-funil` | Identifica furos de conversão por etapa |
| `priorizar-recomendacoes` | Ordena recomendações por impacto estimado × urgência |
| `snapshot-campanhas` | Captura estado atual de campanhas para comparação histórica |

### Camada 3 — Reflexos (8 scripts em `.claude/hooks/`)

| Reflexo | Evento | Propósito |
|---|---|---|
| `bloquear-browser-automation.sh` | PreToolUse | CRÍTICO — exit 2 em qualquer ferramenta de automação de browser |
| `bloquear-write-sem-aprovacao.sh` | PreToolUse | Exige `report_id` aprovado antes de qualquer write em API |
| `bloquear-token-individual.sh` | PreToolUse | Bloqueia tokens de usuário; exige System User Token |
| `bloquear-dados-cruzados.sh` | PreToolUse | Verifica se ad_account_id pertence ao client_id da sessão |
| `rate-limit-guardian.sh` | PreToolUse | Pausa ao atingir 80% da quota de API |
| `log-auditoria.sh` | PostToolUse | Registra toda ação em JSON append-only |
| `validar-client-id.sh` | SessionStart | Confirma cliente + conta antes de qualquer operação |
| `timeout-aprovacao.sh` | PostToolUse | Cancela ação e notifica após 2h sem aprovação |

### Camada 4 — Especialistas (5 em `.claude/agents/`)

| Especialista | Ferramentas | Output |
|---|---|---|
| `meta-ads` | MCP Meta (Marketing API + Events Manager) + WebSearch | JSON: `metricas_resumo`, `campanhas_criticas`, `recomendacoes_tecnicas`, `quality_gate_result` |
| `google-ads` | Google Ads API + Google Drive + WebSearch | JSON: mesmo schema do meta-ads + `quality_score_insights` |
| `tiktok-ads` | WebSearch + Google Drive (dados exportados) | JSON: mesmo schema + `vida_util_criativos` |
| `analista-de-performance` | Lê outputs dos 3 especialistas de plataforma | JSON: `diagnostico_consolidado`, `recomendacoes_priorizadas` (máx 5), `resumo_executivo` (≤200 palavras) |
| `analista-de-mercado` | Exa + WebSearch + Context7 | JSON: `benchmarks_setor`, `posicionamento_cliente`, `datas_comerciais_proximas` |

### Camada 5 — Distribuição (3 workflows em `workflows/`)

**Workflow 1 — Relatório Semanal** (`workflows/relatorio-semanal.yaml`)
- Trigger: cron segunda-feira 08h
- Steps: carregar-contexto → validar-client-id → quality-gate → [meta-ads + google-ads + tiktok-ads em paralelo] → analista-de-mercado → analista-de-performance → formatar-relatorio → enviar-whatsapp → verificar-aprovacao → executar-aprovadas → registrar
- Gate bloqueante: quality-gate falha → pula cliente, não cancela os demais

**Workflow 2 — Alerta de Threshold** (`workflows/alerta-threshold.yaml`)
- Trigger: cron a cada 4h
- Steps: snapshot-campanhas → comparar-com-thresholds → [se violação: formatar-alerta → enviar-whatsapp → verificar-aprovacao → executar] → registrar-alerta
- Cooldown: 4h por KPI por cliente (evita spam)

**Workflow 3 — Análise On-Demand** (`workflows/analise-on-demand.yaml`)
- Trigger: `/peitho [instrução]` na sessão Claude Code
- Steps: classificar-intencao → rotear-para-especialista(s) → consolidar → responder-no-claude-code
- Saída: Claude Code APENAS (sem WhatsApp para on-demand)

### Mitigação por modo de falha (§10 → componente responsável)

| Modo de falha | Componente mitigador |
|---|---|
| ROI negativo | Alerta de threshold (workflow 2) + habilidade `validar-qualidade-conta` |
| Conta bloqueada/hackeada | Reflexo `validar-client-id.sh` (SessionStart) + passo 3 do workflow 1 |
| Saldo zerado | Snapshot-campanhas (workflow 2) detecta 24h antes |
| Pausou campanha rentável | Especialista `analista-de-performance` exige ≥7 dias antes de recomendar pausa |
| Escalou campanha ruim | Habilidade `priorizar-recomendacoes` bloqueia com dados insuficientes |
| Conta errada na BM | Reflexo `validar-client-id.sh` + reflexo `bloquear-dados-cruzados.sh` |
| Pixel com falha | Habilidade `validar-qualidade-conta` (quality gate EMQ ≥ 8) bloqueia antes de recomendar |

---

## 12. Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 2026-06-12 | Criação — baseado em 7 rodadas diagnósticas + blueprint arquitetural (ADAPT de traffic-masters) |
