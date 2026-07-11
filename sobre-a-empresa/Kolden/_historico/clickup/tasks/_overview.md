---
fonte: clickup
workspace_id: 9007134163
extraido_em: 2026-06-30
extraido_por: claude-code (Onda C do plano _arquivo-clickup)
spaces_total: 8
escopo: "Inventário de tasks por space — names, status e listas. Custom fields, descrições e comments NÃO foram extraídos (próxima rodada se justificar)."
tipo: historico
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/clickup/INDEX|INDEX]]"
---

# Tasks por Space — Inventário Onda C

> Varredura 2026-06-30 via `clickup_filter_tasks` (include_closed=true, subtasks=true). Mind tem 300+ tasks (foi parcialmente paginado, 200 capturadas). Demais spaces totalmente inventariados.

## Totais por space

| Space ID | Space | Tasks (vistas) | Listas-chave | Destino |
|---|---|--:|---|---|
| `90130184241` | **Mind** (Ronan) | 200+ | Tarefas, Cursos & Mentorias, Ferramentas de Desenvolvimento | `sobre-o-ronan/` |
| `901312274180` | **Kolden** | 145 | Visão Geral · Gestão Empresarial · Processos | `sobre-a-empresa/` |
| `901313282464` | **Gestão** | 62 | **Central de Ferramentas e Acessos** (60 tools) + Contas a Pagar + Batalhão Op. Esp. | `sobre-a-empresa/` |
| `901313282468` | **Pessoas & Cultura** | 6 | Batalhão de Operações Especiais (equipe atual) | `sobre-a-empresa/` |
| `901313282469` | **Produtos** | 8 | Painel de produtos (entregáveis) | `sobre-a-empresa/` |
| `901313282466` | **Projetos** | 11 | Projetos Externos + Internos + Reuniões | `sobre-a-empresa/` |
| `901313282453` | **Marketing** | 21 | Bravy School (cliente) + listas operacionais tráfego | `sobre-a-empresa/` |
| `901313282444` | **Comercial** | 1 | Gestão de Clientes (só uma task "TESTE") | `sobre-a-empresa/` |

**Subtotal capturado: ~454 tasks** (Kolden+Gestão+P&C+Produtos+Projetos+Marketing+Comercial = 254 do "lado empresa" + Mind ~200 do "lado Ronan").

---

## Achados-chave por space

### 🔴 Gestão / Central de Ferramentas e Acessos (~60 tools ativas)

Essa lista é um **catálogo completo do stack Kolden v2026** — toda ferramenta usada pela operação, com status (`ativo` / `em teste` / `para pagar`).

**Stack canônico (status `ativo` em 2026-06):**

- **AI / produtividade:** ChatGPT · Cloud Code (Claude Code) · Gamma IA · Predis.Ai · Krisp · Loom
- **Design:** Canva · Coolors · Lovable · Whimsical · Miro · MindMeister · Lucidchart · Genially · Freepik (em teste) · Claude Cowork (em teste)
- **Tráfego pago:** Meta Ads · Google Ads · UTMFY · Funnelytics · InLead
- **Landing/funil:** GreatPages · Vturb 1 + Vturb 2 · Zyro
- **Pagamentos:** Stripe · PayPal · Asaas · Wise · PerfectPay · Hotmart (+ Hotmart Cursos)
- **CRM/automação:** GoHighLevel · HubSpot · Kommo · Make · N8N · BotConversa · Respondi App · Instantly
- **Hospedagem/domínio:** Hostinger · Cloudflare · Registro Br (Antigo + Novo)
- **Vídeo/sound:** YouTube · Loom · Krisp
- **Reuniões/assinatura:** Calendly · Docusign · Hellosign
- **Comunicação:** Discord · Gmail Reserva · Gmail Cursos · Instagram 1 + Secundário · Facebook Pessoal + Backup
- **Prospecção:** Lusha · Econodata · PhantomBuster · Snov.IO
- **Gestão:** ClickUp (a própria ferramenta)
- **Pendentes:** Registro da Marca Kolden (em "para pagar")

> **Cross-ref ao catálogo Kolden** (`sobre-a-empresa/Ferramentas/`): muitas dessas ferramentas já têm manuais, mas o catálogo do ClickUp documenta o STATUS operacional. Boa matéria-prima para sincronizar `Ferramentas/mcp-status.md` com a realidade da operação.

### 🟢 Pessoas & Cultura / Batalhão de Operações Especiais (equipe atual, todos em "integração")

Equipe operacional Kolden 2026:
- **Alexander Max** (id 86afpbgqk)
- **Bernardo Vicenzo** (id 86afpbhjt)
- **Mateus Felipe** (id 86afpbrtd)
- **Lucas Garrido** (id 86afqtwub)
- **Luiza Santos** (id 86aft7xh4)
- **Fernanda Rafaela** (id 86aft7xm7)

Casa com os 5 membros do ClickUp original (Ronan + Alexander Max + Bernardo + Lucas Garrido + Mateus Felipe) + 2 novos (Luiza + Fernanda).

### 🟣 Produtos / Painel de Produtos (entregáveis Kolden em desenvolvimento)

Todos em status `em desenvolvimento`:
- **Tráfego Pago** (86afqur1n)
- **Audiovisual** (86afqutv9)
- **Copy** (86afqutwk)
- **Design** (86afqutye)
- **ChatBot** (86afquv8p)
- **Treinamento Comercial** (86afquv9v)
- **Estrategista** (86afquvrx)
- **Automação** (86afquvuh)

> Esse é o **catálogo oficial de entregáveis Kolden v2026** — os 8 "produtos" que a operação está montando. Cada item pode virar um SOP ou ofertização separada.

### 🟠 Projetos / Projetos Externos e Internos

**Projetos Externos (em execução):**
- Super Benefícios
- ORA108
- Let's Go Burguer
- Vits App
- MF Transportes
- Affordable Insulation
- Pizzaria Margherita
- Nutri Coach Hub (interno)

**Reuniões Externas (open):**
- Apresentação – Marcos Storion
- Apresentação – Injepel
- Nova Reunião

> Cruzar com `projetos/` em `sobre-a-empresa/` para confirmar quais já têm dossiê. Affordable Insulation aparece no `radar.yaml` como cliente operacional — confirma alinhamento.

### 🔵 Kolden / Visão Geral (concluídas recentes — alta atividade dez/2024)

Tasks com `date_closed` em 2024-12-08 / 2024-12-09 / 2024-12-10:
- Configurar BM com meio de pagamento (urgent, concluído)
- Alterar copy do checkout (em inglês) (concluído)
- Configuração + Trackamento Funil VSL (urgent, concluído)
- Configuração + Trackamento Funil Quiz (urgent, concluído)
- Estrutura + Design Funil VSL (assignee: Bernardo)
- Estrutura + Design Funil Quiz (assignee: Bernardo)
- Copy para o Funil de Quiz

**Sinal:** Bernardo Vicenzo trabalhou em dez/2024 com 2 funis (VSL + Quiz) com produto **em inglês** — provavelmente o lançamento da Kolden v2026 para mercado US.

### 🟡 Kolden / Gestão Empresarial (backlog estratégico)

Estrutura de **15 departamentos do framework Kolden v2026** (tags em cada task):
- Strategy & Planning · Creative & Content · Performance · Social Media & Community · Intelligence & Data · CRM & Lifecycle · Product & Growth · Web Development & Experience

Sub-tasks por departamento (todos em backlog):
- Strategy: Market & Competitive Intelligence · Marketing Strategy · Brand Strategy · Growth Strategy
- Creative: Copywriting · Content Production · Creative Direction · Brand Storytelling · UX Writing
- Performance: Paid Media · Acquisition & Optimization · CRO · Analytics for Performance
- Social: Social Media Management · Community Management · Social Content Creation · Influencer & Partnerships
- Intelligence: Tracking & Implementation · Marketing Analytics · Data Engineering · Martech Operations · Data Governance
- CRM: Email & Automation · Customer Segmentation · Retention & Loyalty · CRM Operations
- Product: 7 fases (Market Intel · Offer Design · Funnel Architecture · Asset Production · Tech Setup · Launch & Optim · Scale & Portfolio)
- Web: Frontend Dev · UX/UI · Web Performance · Conversion Experience

> **Esse é o organograma operacional Kolden v2026 em forma de backlog.** Cada item pode virar um SOP, agente, ou skill. Boa matéria para mapear contra os squads existentes (Caliope cobre Copywriting+UX Writing; Peitho cobre Paid Media; etc.) e identificar gaps de cobertura.

### 🟡 Kolden / Processos (playbook de funis em 7 fases)

Backlog estruturado com **7 fases do playbook de lançamento de funil**:
1. Market & Competitive Intelligence
2. Offer & Value Proposition Design
3. Funnel Architecture (VSL + Quiz + Lead Magnet)
4. Asset Production (copy, criativos, páginas, sequências)
5. Tech & Tracking Setup
6. Launch & Optimization
7. Scale & Portfolio (Múltiplos Funis)

Cada fase tem ~10 sub-tasks. **Playbook completo de lançamento** — vale documentar como SOP em `sobre-a-empresa/operacao/playbooks/`.

### 🧠 Mind (pessoal Ronan)

200 tasks capturadas (de provavelmente 300+). Mistura de:
- **Tarefas operacionais 2024** (HISET, TriStar, COMUNIDADE — cobertura sobreposta com as Atas Daily já extraídas)
- **Banco de ideias pessoais** (Plano de Saúde, Plano de Educação, Plano de Carreira, Contrato SCP, Contrato cliff invest, Plano de Academia)
- **Cursos & Mentorias** (G4 Skills — A Mente Empreendedora, livros Mindset/Jobs/Walt/Coco, podcasts)
- **HISET/TriStar/Comunidade** — todo o cronograma operacional jan/2024 (espelha o já extraído nas Atas)

> Sobreposição alta com Atas Daily 2023/2024. A novidade vs Atas: **banco de ideias pessoais** (Plano de Saúde, Carreira, Educação, SCP, cliff invest) — material para a Camada C do `sobre-o-ronan/`.

---

## Próximos passos sugeridos

1. **Sync com `sobre-a-empresa/Ferramentas/`**: usar a lista do "Central de Ferramentas e Acessos" como fonte da verdade do stack ativo.
2. **Sync com `sobre-a-empresa/projetos/`**: confirmar quais dos 7 projetos externos têm dossiê (Affordable já tem; verificar os outros 6).
3. **Documentar `playbook-funis-7-fases`** em `sobre-a-empresa/operacao/playbooks/` a partir do backlog do Processos.
4. **Mapear `Gestão Empresarial` (organograma 15 departamentos)** contra squads existentes para identificar gaps de cobertura — input para o Caos.
5. **Adicionar 6 membros do "Batalhão"** ao mapa de equipe da Kolden (se ainda não estiverem em `sobre-a-empresa/operacao/equipe/`).
6. **Camada C — bloco Mind/Ronan**: extrair os "Planos pessoais" (Carreira, Saúde, Educação) para `sobre-o-ronan/` quando ele autorizar.
