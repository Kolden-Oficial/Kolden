---
name: moscow-kano-mcda
description: |
  Use quando precisar priorizar backlog/escopo de release (não validação). MoSCoW classifica
  Must/Should/Could/Won't; Kano categoriza por tipo de satisfação (Basic/Performance/Delighter); MCDA
  pondera múltiplos critérios em empates. Use combinado. Para priorização de hipóteses em validação,
  cross-link Aletheia priorizacao-rice (RICE).
domain: aiox-development
subdomain: priorizacao-de-release
agente_dono: [po-pax]
aiox_layer: L3 (.claude project config — mutable)
aiox_workflow_integration: spec-pipeline/po-validate-next-story
heranca_historica: [dai-clegg-moscow, noriaki-kano, mcda-pesquisa-operacional]
tags: [priorizacao, moscow, kano, mcda, release-scope]
cross_links:
  - aletheia/priorizacao-rice (bidirecional)
  - prometeu/matriz-valor-esforco-quick-wins
  - prometeu/aiox-core/development/tasks/po-validate-next-story
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G15)
---

# moscow-kano-mcda — priorização de release (MoSCoW + Kano + MCDA)

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G15, MIT)._

Skill do **po Pax** (Product Owner AIOX) para priorizar **escopo de release** com três frameworks complementares: **MoSCoW** (classificatório), **Kano** (satisfação) e **MCDA** (quantitativo ponderado). Use combinado — nunca isoladamente.

Para **priorização de hipóteses em validação**, NÃO é esta skill — use `aletheia/priorizacao-rice` (RICE). Cross-link bidirecional.

---

## Os 3 frameworks — quando usar cada

| Framework | Tipo | Quando usar |
|---|---|---|
| **MoSCoW** | Classificatório | Escopo de release/sprint (deve/deveria/poderia/não-agora) |
| **Kano** | Satisfação | Mix de features básicas/performance/encantamento |
| **MCDA** | Quantitativo ponderado | Decisão entre opções com múltiplos critérios desiguais |

**NÃO usar isoladamente — combine.**

---

## 1. MoSCoW — Must / Should / Could / Won't

### Definições

- **Must have:** sem isso, o release não vai (corta release).
- **Should have:** importante, mas o release pode ir sem.
- **Could have:** desejável, fica se sobrar tempo.
- **Won't have (this time):** explícito fora do escopo (importante — gerencia expectativa).

### Regras operacionais

- **Must = 60% do effort** (não mais; se passar, escopo está inchado).
- **Should + Could = 30-35%** do effort.
- **Won't = explícito** (não "talvez").
- **Re-avaliar Must a cada sprint;** "Should" sobe se houver capacidade.

### Anti-padrões

- **Tudo Must** — significa que nada é Must.
- **Won't ausente** — cliente acha que talvez vem.
- **Sem critério para classificar** — vira preferência pessoal.

---

## 2. Kano — 5 categorias de satisfação

| Categoria | Definição | Exemplo |
|---|---|---|
| **Must-be (Basic)** | Cliente espera por default; ausência = insatisfação grave; presença = neutro | Login funciona, dados salvos |
| **Performance (One-dimensional)** | Mais é melhor linearmente | Velocidade, preço, capacidade |
| **Delighter (Excitement)** | Não esperado; presença = encantamento; ausência = neutro | Easter egg, integração inesperada |
| **Indifferent** | Cliente não se importa | Configuração técnica interna |
| **Reverse** | Presença = problema para alguns | Notificação por padrão |

### Operacional

- **Pesquisa Kano:** questionário com forma **funcional** + **disfuncional** por feature.
- **Categorias migram ao longo do tempo:** Delighter de hoje vira Must-be de amanhã (**Kano evolution**).
- **Distribuição saudável:** 30% Basic / 50% Performance / 15% Delighter / 5% Indifferent.

### Anti-padrões

- **Roadmap = só Delighters** — produto faltoso no basic.
- **Ignorar Reverse** — notificação default mal-recebida.
- **Não medir migração** — Wi-Fi grátis no hotel era Delighter, virou Must.

---

## 3. MCDA — Multi-Criteria Decision Analysis

Quando MoSCoW empata e Kano não decide, use **scoring ponderado**.

### 1. Critérios (escolha 4-7)

| Critério | Peso sugerido |
|---|---|
| Impacto no cliente | 30% |
| Esforço | 25% |
| Risco técnico | 15% |
| Alinhamento estratégico | 15% |
| Dependências bloqueantes | 10% |
| Timing competitivo | 5% |

### 2. Score por critério

Use escala **1-5 ou 1-10** (mantenha a mesma escala em todos os critérios da rodada).

### 3. Score ponderado

```
Score final = Σ (score_critério × peso_critério)
```

### 4. Ordenar por score

Itens com maior score ponderado vão primeiro.

### Anti-padrões

- **Mais de 7 critérios** — perde foco.
- **Pesos iguais** — nivela em ruído.
- **Pesos sem justificativa** — vira maquiagem.
- **Score sem evidência** — subjetivo, não auditável.

---

## Método combinado — MoSCoW + Kano + MCDA

**Passo 1.** Classifique o backlog em **MoSCoW**. **Must vai primeiro**.

**Passo 2.** Para itens **Should/Could**, classifique em **Kano**:
- **Must-be não-cobertos** → sobem para **Must** (são pré-requisito invisível).
- **Performance** → priorize por **impacto marginal**.
- **Delighter** → última prioridade até Must completo.

**Passo 3.** Quando **Should/Could empata**, use **MCDA** com critérios explícitos.

---

## Cross-link com Aletheia `priorizacao-rice`

| Quando | Use |
|---|---|
| Validação (Aletheia) — qual hipótese testar primeiro | **RICE** |
| Release de produto (Prometeu) — escopo do release | **MoSCoW + Kano** |
| Decisão complexa entre N opções | **MCDA** |
| Mix Kano (saturação Must, escolha entre Delighters) | **Kano + MCDA** |

Cross-link bidirecional em frontmatter — confira que a skill correspondente da Aletheia também aponta para esta.

---

## Anti-padrões combinados

- **MoSCoW sem Kano** — corta Should sem ver que é Performance de alto impacto.
- **Kano sem MoSCoW** — não decide escopo do release.
- **MCDA em tudo** — overhead; reserve para empate real.
- **3 frameworks em paralelo** — escolha 1 primário por contexto e combine os outros como reforço.

---

## Saída padrão

1. **Backlog classificado em MoSCoW** (Must/Should/Could/Won't).
2. **Mix Kano-balanced** (30/50/15/5 alvo).
3. **MCDA com 4-7 critérios ponderados** para empates.
4. **Decisão registrada** com justificativa (auditável).

---

## Cross-links

- **Aletheia `priorizacao-rice`** — bidirecional (validação ↔ release).
- **Prometeu `matriz-valor-esforco-quick-wins`** — complementa MCDA quando MoSCoW empata.
- **AIOX `po-validate-next-story`** — MoSCoW aplica na seleção da próxima story.

---

## Herança histórica

- **Dai Clegg / Oracle** (~1994) — MoSCoW.
- **Noriaki Kano** (Tokyo Riko University, 1984) — Kano Model.
- **Multi-Criteria Decision Analysis** — método clássico de pesquisa operacional, anos 1960s.
- **Roger Burlton** (BPM) — combinação MoSCoW+Kano.
