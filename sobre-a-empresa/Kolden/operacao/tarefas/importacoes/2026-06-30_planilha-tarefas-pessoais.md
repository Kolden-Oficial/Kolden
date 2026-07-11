---
id: import-planilha-tarefas-pessoais-2026-06-30
titulo: "Import inicial — planilha Google 'Tarefas Pessoais'"
resumo: "Primeira população do radar de tarefas a partir da planilha Google 'Tarefas Pessoais' (134 itens na aba Visão Geral)."
categoria: operacao
palavras-chave: [import, radar, planilha-google, tarefas]
status: oficial
atualizado-em: 2026-06-30
tipo: nota
area: operacao
up: "[[sobre-a-empresa/Kolden/operacao/_MOC-operacao]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/operacao/tarefas/README|README]]"
---

# Import — Planilha "Tarefas Pessoais" → radar.yaml + arquivo.yaml

## Fonte

| Campo | Valor |
|---|---|
| Tipo | Google Sheets |
| ID | `1TNtxopvAkj9JFWRQNVYsbHD_43CRBWc_JpRhh8sjypY` |
| Título | "Tarefas Pessoais" |
| URL | https://docs.google.com/spreadsheets/d/1TNtxopvAkj9JFWRQNVYsbHD_43CRBWc_JpRhh8sjypY/edit |
| Abas totais | 7 (1 visível + 6 ocultas) |
| Abas lidas nesta passada | 1 — apenas "Visão Geral" |
| MCP usado | `mcp__google-drive__getGoogleSheetContent` |
| Operador | Claude Code (sessão `effervescent-eagle`) |
| Data | 2026-06-30 |

## O que entrou

| Destino | Quantidade |
|---|---|
| `radar.yaml` (tarefas ativas) | **118** |
| `arquivo.yaml` (concluídas) | **17** |
| **Total importado** | **135** |
| Linhas lidas na Visão Geral | 134 (linhas 5-138) |
| Deduplicadas no import | 0 (planilha já estava limpa) |

> A discrepância 135 vs 134 vem da meta-tarefa **KLD-2026-044** ("Criar agente especialista em tarefas") que estava na planilha (Visão Geral!B49) e foi marcada como `em-andamento` — ela representa esta própria sessão.

## Contextos (slugs) usados

| Slug | Tipo | Tarefas (radar + arquivo) | Dossiê |
|---|---|---:|---|
| affordable-insulation | cliente-externo | 1 + 1 | ✅ existe |
| ariosto-ribeiro | cliente-externo | 3 + 2 | ⚠️ **a criar (F3)** |
| brayans-finish | cliente-externo | 7 + 1 | ✅ existe |
| catalogo | cliente-interno | 3 + 0 | ✅ existe |
| entresolos | cliente-externo | 5 + 1 | ✅ existe |
| freitas-servicos | cliente-externo | 1 + 0 | ✅ existe |
| instituto-saulo-mendes | cliente-externo | 1 + 1 | ✅ existe |
| kolden | cliente-interno | 9 + 0 | ❌ não tem (é a empresa) |
| kolden-os | cliente-interno | 11 + 0 | ❌ não tem (é a infra) |
| mat3vic | cliente-externo | 2 + 1 | ✅ existe |
| nutrios-pro | cliente-externo | 1 + 1 | ✅ existe + projeto |
| pessoal | pessoal | 27 + 0 | — (não há dossiê de pessoal) |
| revolution-pro | cliente-externo | 1 + 1 | ✅ existe |
| rosie | cliente-externo | 40 + 5 | ✅ existe + projeto |
| stass | cliente-externo | 2 + 1 | ✅ existe |
| vibracoes-celestiais | cliente-externo | 2 + 1 | ✅ existe |
| vilela-construction | cliente-externo | 1 + 1 | ✅ existe |
| **Total** | | **117 + 17 = 134** | |

Discrepância 117+17=134 vs 118+17=135: a KLD-2026-044 (meta-tarefa) também conta no radar e foi contada acima como Kolden-OS (já incluída nos 11).

## Classificação por bucket de capacidade

| Bucket | Contagem | % |
|---|---:|---:|
| `humano-puro` | 38 | 32% |
| `agente-faz-com-input` | 40 | 34% |
| `agente-faz-sozinho` | 28 | 24% |
| `agente-instrumenta-humano-decide` | 10 | 8% |
| `bloqueado-por-capacidade-faltante` | 2 | 2% |
| **Total radar** | **118** | 100% |

**Os 2 itens bloqueados** (input direto para o Caos):
1. **KLD-2026-021** — Ativar Google Ads do Entre Solos. Bloqueio: developer token do Google Ads não aprovado (Ronan aplicou no API Center; aguardando aprovação dias/semanas). Já documentado na memória.
2. **KLD-2026-032** — Fazer DRE atualizada da Kolden. Bloqueio: Pactolo é squad-semente, sem Ritual completo do Caos; skill 'modelagem-financeira' inexistente.

## Mapeamento "contexto da planilha" → slug Kolden

| Nome na planilha | Slug do radar | Observação |
|---|---|---|
| Affordable Insulation | `affordable-insulation` | direto |
| Ariosto Ribeiro | `ariosto-ribeiro` | direto (dossiê a criar) |
| Brayan's Finish | `brayans-finish` | direto |
| CataLogo | `catalogo` | tipo cliente-interno (é projeto interno da Kolden) |
| Entre Solos | `entresolos` | direto (já casa com `entresolos.md`) |
| Freitas Serviços | `freitas-servicos` | direto |
| Henrique | — | não apareceu na Visão Geral (apareceu na aba operacional como Revolution Pro) |
| Kolden | `kolden` | tipo cliente-interno (a empresa) |
| KoldenOS | `kolden-os` | tipo cliente-interno (a infra/agentes) |
| Mat3vic | `mat3vic` | direto |
| NutriOS Pro | `nutrios-pro` | direto |
| Pessoal | `pessoal` | tipo pessoal |
| Revolution Pro | `revolution-pro` | direto |
| Rosie | `rosie` | direto |
| Saulo Mendes | `instituto-saulo-mendes` | renomeado (dossiê chama assim) |
| Seminar Stass | `stass` | renomeado (dossiê chama assim) |
| Vibrações Celestiais | `vibracoes-celestiais` | direto |
| Vilela Construction | `vilela-construction` | direto |

## O que NÃO foi importado (decisão consciente)

- **5 abas operacionais ocultas** (Affordable, Brayan's, Henrique, Mat3vic, Vilela) com **~73 itens contratuais** (Status / Responsável / Categoria / Descrição / Tipo). São **checklists de contrato**, não tarefas individuais — inundariam o radar.
  - **Plano**: cada uma vira playbook `contrato-<slug>` numa segunda passada. As 5 tarefas correspondentes "Fazer checklist do contrato" (KLD-2026-002, 009, 046, 078, 129) já estão no radar com `playbook: checklist-de-contrato` apontando para o template genérico.
- **Aba "Página5"** — oculta e sem nome significativo; ignorada.
- **Documento Google `[R] Alinhamento`** (Rosie, ID `1Ligf0WT-Mjo5IcZ9-pltAjyJB0j48wj_XjBIKEW8zPo`) — API Docs desabilitada no projeto GCP `1098911614973`. Ronan deve habilitar manualmente; release agendado como F8.

## IDs gerados

- **Faixa usada**: `KLD-2026-001` até `KLD-2026-133` (134 IDs, alguns gaps por intercalação).
- **Próximo ID disponível**: `KLD-2026-134`.
- **Política de IDs**: documentada em `schema.yaml` § "ID — esquema de geração".

## Heurística de classificação aplicada

Padrões usados nesta passada (a serem refinados pela skill `/tarefa` em F5):

| Padrão de tarefa | Bucket |
|---|---|
| "Criar cérebro NotebookLM" | `agente-faz-com-input` (Argos coleta os 4 inputs; Ronan faz upload) |
| "Fazer checklist do contrato" | `agente-faz-com-input` (precisa skill `audit-contrato` que ainda não existe) |
| "Ativar anúncios" Meta/TikTok | `agente-faz-com-input` (Peitho + criativo/verba aprovados) |
| "Ativar anúncios" Google Ads | `bloqueado-por-capacidade-faltante` (sem dev token) |
| "Comprar domínio" / "Cobrar pagamento" / "Marcar reunião" | `humano-puro` |
| "Configurar GA4/GTM/Analytics" | `agente-faz-com-input` (Metis) |
| Tarefas KoldenOS de criar agente/MCP/skill | `agente-faz-sozinho` (Caos) |
| Tarefas pessoais (livros, cursos, exames, viagem) | `humano-puro` |
| "Fazer DRE" / "Modelagem financeira" | `bloqueado-por-capacidade-faltante` (Pactolo é semente) |
| "Criar copy/email" | `agente-faz-sozinho` (Caliope) |
| "SEO técnico" / "LP" / "CRO" | `agente-faz-sozinho` (Ariadne) |
| "Registro de marca / INPI" | `agente-instrumenta-humano-decide` (Nomos prepara, humano assina) |

## Idempotência

O `origem.fonte_id` de cada tarefa identifica a célula de origem na planilha (formato `"Visão Geral!B<linha>"`). Re-importar a mesma fonte:
- **Não duplica** — atualiza a tarefa existente.
- **Reconcilia** mudanças de estado (Pendente → Concluído etc).
- **Acrescenta** apenas linhas novas (que não tinham `fonte_id` ainda).

A skill `/tarefa import` (F5) implementa essa lógica.

## Próximos passos (do plano)

1. **F3** — criar dossiê `projetos/ariosto-ribeiro/leia-me.md` (a partir de `_modelo-dossie.md`).
2. **F4** — criar playbooks `cerebro-notebooklm.md` e `checklist-de-contrato.md`.
3. **F6** — registrar `/tarefa` no `Hermes/squads-catalog.yaml` + atualizar `AGENTS.md`.
4. **F5** (sessão Caos) — construir a skill `/tarefa` propriamente.
5. **F8** — habilitar API Docs no GCP e ler o doc `[R] Alinhamento` da Rosie.

## Congelamento da planilha

Recomendação ao Ronan: depois de validar este radar:
1. Renomear a planilha Google para `[ARQUIVADA — agora em Kolden/operacao/tarefas]`.
2. Não editar mais nada lá — a partir de agora o radar é o SSoT.
3. Se quiser registrar tarefa nova, falar comigo (`/tarefa <texto>`) — a skill cuida do resto.
