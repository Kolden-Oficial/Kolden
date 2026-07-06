---
id: proposta-reorganizacao-drive
titulo: "Proposta de Reorganização do Drive Compartilhado"
resumo: "Lista de→para para reorganizar o Drive da Kolden: migrar o acervo comercial-ouro para a estrutura oficial, deduplicar blueprints e consolidar dispersões. AGUARDA APROVAÇÃO antes de qualquer movimentação."
categoria: operacao
status: executada-parcial-2026-06-25
atualizado-em: 2026-06-25
relacionados: [dossie-mae]
---

# Proposta de Reorganização do Drive Compartilhado

> **NADA foi movido.** Esta é a lista de→para levantada na dissecação arquivo-por-arquivo
> (áreas 02 e 06). Movimentação em Drive de equipe é **visível para todos** e precisa da
> **aprovação do Ronan** item a item (ou em bloco). Após aprovar, executo via MCP (`moveItem`/
> `renameItem`/`deleteItem`) em lote, com log e re-listagem de confirmação.

## Resumo do problema
1. A pasta **"02 | Comercial"** real está **vazia** (7 subpastas oficiais criadas em 08/06/2026, 0 arquivos).
2. Todo o **acervo comercial-ouro** vive fisicamente em **"06 | Templates & Ferramentas"** — fora do lugar.
3. A pasta **"Estrutura de Pastas"** (no 06) **duplica a árvore organizacional inteira** (pastas vazias).
4. Dispersões pontuais em Clientes (Margherita em 3 locais; check-ins cruzados).

---

## Bloco A — Migrar acervo comercial-ouro: 06 → "02 | Comercial"
Destino raiz: `1ZNU2u5ZVzCn9wRKh2NQTPbYHrfCG4wKf`. (fileIds parciais — confirmo os completos na execução.)

| Mover (hoje no 06) | Para subpasta oficial do Comercial |
|---|---|
| [K] Central de Oportunidades | `01 \| Leads` (pipeline-mestre) |
| PROSPECÇÃO ATIVA/ (ICP, Cold Call, Cold Mail, Cadência) + Script Clínicas | `02 \| Prospecção & Outreach` |
| Modelo Proposta Comercial + "Serviços que prestamos" | `03 \| Apresentações & Pitches` |
| QNP 360° + Kick-Off QNP + Sessão Estratégica | `03 \| Apresentações & Pitches` |
| Copy Proposta Comercial + propostas-modelo | `04 \| Propostas` (Modelos) |
| Contrato Tristar (modelo) | `05 \| Contratos Comerciais` (Modelos) |
| Debriefing/ (3 templates) + Central de Daily | `06 \| Pós-venda & CS` |
| Projeção Funil de Vendas + Calculadora de Ganhos + [COMPANY] Planilha Suprema | `07 \| Métricas & Performance` |

## Bloco B — Deduplicar blueprint
- **"Estrutura de Pastas"** (`1vYMT-pkdwLVv2A0SQslGXD5lDZwRcB8Z`, no 06) duplica a árvore inteira (vazia).
  **Ação:** mover para uma pasta clara `06/_blueprints/` **ou** excluir (é só esqueleto de template).
  → Excluir é destrutivo; **confirmar** antes.

## Bloco C — Reclassificar não-comercial que está no 06/02
- **BLACK BOOK + guias OKR + metodologias** → mover para uma pasta de Inteligência/Knowledge (sugiro `06/Inteligência Interna/`, já existe) — sair de "Templates" genérico.
- **Recrutamento & Seleção** (templates) → `04 | RH & Cultura/02 | Recrutamento & Seleção`.
- **Contratos de colaborador PJ** → `00 | Gestão/01 | Jurídico/02 | Contratos`.
- **Meet Recordings** (atas/vídeos de cliente) → pasta do cliente correspondente em `03 | Clientes`.

## Bloco D — Consolidar dispersões em Clientes
- **Pizzaria Margherita** — hoje em 3 locais (2 docs soltos na raiz de Inativos + pasta em Assessoria + pasta aninhada em "Marco Daniel"). **Ação:** consolidar numa única pasta `02 Inativos/.../Pizzaria Margherita`.
- **Check-ins cruzados** — "2º CHECK-IN - Revolution PRO.pptx" está na pasta do **Brayan's Finish**; o check-in do Revolution Pro aparenta estar lá também. **Ação:** mover cada check-in para a pasta do cliente correto.
- **Pasta aninhada "02 | Inativos" dentro de Inativos** — achatar (subir Dr. Leandro Rubim/Elaine Custodio/Marco Aurélio um nível e remover o aninhamento redundante).

## Bloco E — Limpeza de pastas vazias (06)
- `Públicos & Audiências`, `Scripts & POPs`, `Templates Make` (esta deu "not found"/inacessível) — **popular ou remover**.

---

## Como quero executar (após sua aprovação)
1. Você aprova **por bloco** (A–E) ou marca itens específicos.
2. Eu confirmo os **fileIds completos** de cada item (re-listo antes de mover).
3. Movo via MCP em lote; **exclusões só com seu "ok" explícito** (Bloco B/E).
4. Re-listo as pastas de destino e gero um **log de reorg** + confirmação de zero arquivo órfão.

> Recomendação: aprovar **A, C, D** (movimentações seguras, sem exclusão) primeiro; tratar **B, E**
> (que envolvem exclusão) num segundo momento, com revisão item a item.

---

## ✅ Execução — 2026-06-25 (blocos A/C/D aprovados)
**27 moves OK · 0 erros · 0 exclusões/renomeações.** Log completo: `Caos/registros/absorcao/reorg-drive-2026-06-25.md`.
- **Bloco A (22 moves):** acervo comercial-ouro migrado do 06 → subpastas oficiais 01–07 de "02 | Comercial" (confirmado por re-listagem). A pasta "02 | Comercial" deixou de ser esqueleto.
- **Bloco C (3 moves):** templates de Recrutamento → 04 RH; contrato PJ → 00 Jurídico. BLACK BOOK/OKR já estavam em Inteligência Interna (no-op).
- **Bloco D (2 moves):** Margherita consolidado (o "3º local" não existia); check-ins cruzados já estavam corretos (no-op).

### Pendências sinalizadas (precisam de decisão do Ronan)
1. **Meet Recordings (~90 arquivos):** codinomes auto-gerados do Meet, não mapeáveis a cliente — pulados. Precisa de um mapa codinome→cliente (tarefa dedicada).
2. **Duplicatas de clientes inativos:** Dr. Leandro Rubim e Marco Aurélio têm pastas homônimas em dois locais (com fileIds diferentes) — achatar exige **merge + delete** (Blocos B/E, não aprovados).
3. **Propostas cliente-específicas na 06** (Flaviana, Insulation, Kommo, Kaylon, Parceria Squad): são *deals*, não modelos — ficaram na 06 aguardando destino definido.

## ✅ Blocos B e E — 2026-06-25 (aprovados pelo Ronan)
Exclusões via `deleteItem` (→ **Lixeira do Drive**, recuperável). Verificado vazio antes de excluir.
- **B — "Estrutura de Pastas"** (`1vYMT-pkdwLVv2A0SQslGXD5lDZwRcB8Z`, blueprint duplicado da árvore inteira): ✅ na Lixeira.
- **E — "Templates Make"** (`1LViAOtr-y-D7ZSvhCyOshIG8RY9Y1KV9`, vazia): ✅ na Lixeira.
- **E — "Públicos & Audiências"** (`1d4cRq0Ojovt5GzLvEZ4salkOe9KkWNa8`, vazia) e **"Scripts & POPs"** (`1tiVCOFpG66fegT8LBDjfpcPjQeAjziLQ`, vazia): o Ronan decidiu **MANTER** (não excluir). Encerrado.

## 🔐 Credenciais — consolidadas, Infisical CANCELADO (2026-06-26)
Decisão do Ronan: **não** migrar senhas ao Infisical (sem caminho de escrita; leitura exporia valores). Em vez disso, os 4 docs de credenciais foram **consolidados numa pasta restrita** (via `moveItem`, sem abrir conteúdo), todos sob `00 Gestão Empresarial / 02 Financeiro / 05 Credenciais Financeiras`:
- `01 | Senha dos Cartões`: "Senha dos Cartões" (já estava lá).
- `02 | Senha das Ferramentas`: "[K] Central de Ferramentas e Acessos", "Perfil Kolden - 9 Anos", "[Cliente] Central de Acessos" (movidos).
Nenhum valor foi lido/absorvido. **Pendência aberta:** continuam em texto plano no Drive — avaliar gerenciador de senhas no futuro.
