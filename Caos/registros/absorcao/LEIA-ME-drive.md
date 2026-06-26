# Ramo-Drive da absorção — registros

Este diretório guarda os artefatos da absorção do **Drive compartilhado da Kolden** para o cérebro
(`sobre-a-empresa/`), em paralelo aos registros de absorção de repositórios GitHub.

## Estrutura
Um subdiretório por área do Drive: `drive--<area>/` (ex.: `drive--00-gestao-empresarial/`), cada um com:
- `inventario.md` — F3: tabela `D-id | fileId | caminho | mime` de TODO arquivo da área.
- `mapa-de-decisao.md` — F4: disposição por `D-id` (ABSORVER/DESCARTAR/DEFER) + destino/motivo.
- `reconciliacao.md` — F6.5: fechamento aritmético da área (absorvido+descartado+defer == inventário).

## Fonte de verdade
- **Ledger:** `Caos/dados/drive-absorvido.yaml` (estado consolidado por arquivo).
- **Protocolo:** `Caos/.claude/skills/protocolo-de-absorcao-sem-perda/SKILL.md` (seção "Fonte = Drive").
- **Cérebro (destino):** `sobre-a-empresa/` + Dossiê-Mãe (índice mestre).

## Invariante (pente-fino)
Por área e no total: `ABSORVIDO + DESCARTADO + DEFER == inventário`, com `PENDENTE = PERDIDO = 0`.
Enquanto não fechar, a área não está completa. Nenhum arquivo do Drive pode terminar sem disposição.
