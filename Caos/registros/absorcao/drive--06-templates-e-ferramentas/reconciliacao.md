---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/drive--06-templates-e-ferramentas/inventario|inventario]]"
  - "[[Caos/registros/absorcao/drive--06-templates-e-ferramentas/mapa-de-decisao|mapa-de-decisao]]"
---

# Reconciliação — Área "06 | Templates & Ferramentas" (Drive)

> F6.5. 2026-06-25. Protocolo de absorção sem perda.
> Invariante: `count(ABSORVIDO) + count(DESCARTADO) + count(DEFER) == count(inventário F3)`, com **PERDIDO = 0**.

## Contexto
A área 06 **contém fisicamente** todo o acervo comercial-ouro da Kolden. A passada-02
("02 | Comercial") já o inventariou (142 D-ids) e dispôs cada arquivo, porque a pasta 02 real
estava quase vazia. Esta passada-06 **reconfirmou a estrutura física** (listFolder direto em todas
as subpastas-chave) e **herdou** as disposições da 02 para o bloco comercial, re-decidindo apenas a
inteligência estratégica reutilizável que a 02 havia deixado em DEFER/DESCARTADO.

## Aritmética
| Categoria | Qtd | Observação |
|---|---|---|
| Total inventário F3 | **142** | D1–D142 (conjunto da passada-02, reconfirmado) |
| ABSORVIDO (passada-02, comercial) | 13 grupos | intocados — não re-sintetizados |
| ABSORVIDO **novo (passada-06)** | 8 itens | inteligência/referência — `inteligencia-e-referencias.md` |
| DESCARTADO | ~118 | segredo / cliente-PII / instâncias / mídia / fora de escopo |
| DEFER | 5 grupos | scripts cold call/mail, templates ICP, contrato PJ, QNP original, Estrutura de Pastas |
| **PERDIDO** | **0** | nenhum arquivo sem disposição |

> A contagem fina por D-id é a da `drive--02-comercial/reconciliacao.md` (mesma população). Os 8 itens
> novos desta passada **migraram** de DEFER/DESCARTADO → ABSORVIDO; a soma total e o PERDIDO=0 se mantêm.

## Produtos desta passada (escritas no cérebro)
1. **`sobre-a-empresa/operacao/inteligencia-e-referencias.md`** (NOVO) — catálogo de inteligência interna:
   §1 síntese do ecossistema de APIs da Meta (Doc `1nzYjxJF…`); §2 metodologias/referências por fileId
   (BLACK BOOK, OKR ×2, Metodologia Cursos, Operação Kolden, Rotina liderança, Ebook Cora, Campos FB Ads).
2. **`sobre-a-empresa/Ferramentas/Meta/ferramentas.md`** — nota de cruzamento p/ o mapeamento amplo (§1).
3. **`sobre-a-empresa/operacao/metricas-e-okrs.md`** — ponteiro para o material de OKR catalogado.

> `processos.md §4` (comercial, escrito pela passada-02) **não foi tocado** — regra de não-sobrescrita respeitada.

## Verificações
- Estrutura física da 06 confirmada por listFolder direto (raiz + Inteligência Interna + Novos Produtos +
  Templates & Processos + BLACK BOOK + Metodologia + Kolden Flow).
- Correção factual: BLACK BOOK tem **8 PDFs** (a 02 contou 7).
- Correção de disposição: "Mapeamento API Meta" **não** é material de cliente — é referência técnica
  institucional; reabsorvido.
- Achado: "[🔱 Kolden Flow] O Sistema Operacional Completo…" é **pasta-container com 1 briefing de
  cliente** — não há "sistema operacional" textual. Registrado para evitar expectativa falsa.
- Nenhum segredo absorvido ([Cliente] Central de Acessos descartado → Infisical). Regra de ouro respeitada.

## Candidatos a reorg (dentro da 06)
- **`Estrutura de Pastas` (`1vYMT-pkdwLVv2A0SQslGXD5lDZwRcB8Z`)** — duplica a árvore organizacional inteira
  (Gestão/RH/Produtos/Comercial/Projetos/Operacional, pastas vazias). **Dedup na reorg.**
- Acervo comercial-ouro deveria **migrar fisicamente** para a "02 | Comercial" real
  (`1ZNU2u5ZVzCn9wRKh2NQTPbYHrfCG4wKf`, hoje com subpastas 01–07 vazias). A 06 ficaria só com
  templates/ferramentas/inteligência genuínos.
- `Públicos & Audiências`, `Scripts & POPs`, `Templates Make` — vazias; remover ou popular.
- `Meet Recordings` (atas/vídeos de cliente) — mover p/ pasta de cliente; não pertence a Templates.
