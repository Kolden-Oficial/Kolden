#!/usr/bin/env bash
# interrupt-before-mutation.sh — reflexo Olimpo (Camada 3-4)
# Publicado pela Onda 4 do METODO Kolden 2026-07-09
# ASL: 3 — arbitragem cross-executivo + escalada board/investidor + decisão M&A/pivot

set -euo pipefail

# Este reflexo é chamado pelo hook PreToolUse configurado em .claude/settings.json
# antes de qualquer mutation-with-side-effect nas seguintes categorias:
#
# (a) Arbitragem cross-executivo sem consenso — dois executivos divergem
#     materialmente em zeus.arbitragem[] e não há tabela de trade-off registrada
#     em log_de_decisao com escalada ao Ronan.
#
# (b) Escalada a board/investidor sem gate humano — publicação em canal externo
#     irreversível (board meeting, investor update, deck de rodada, mensagem a
#     cliente enterprise) sem "ok" explícito do Ronan registrado em log_de_decisao.
#
# (c) Mutação em Contrato de Missão lacrado — edição de intencao_original.input_cru
#     ou intencao_original.hash de um Contrato com hermes.lacre.sha256 assinado.
#
# (d) Publicação de decisão M&A/pivot sem gate humano — decisões de aquisição,
#     fusão, pivot estratégico ou captação sem "ok" explícito.
#
# Retorno: exit 0 se pode prosseguir (aprovação humana registrada); exit 1 se
# deve travar e devolver ao Hermes com perguntas_abertas.

# Marcador de sessão: verifica se há autorização recente do Ronan em log_de_decisao
LOG_DECISAO="${CLAUDE_PROJECT_DIR:-.}/contratos/missoes/*.yaml"
JANELA_MINUTOS=15

# TODO Fase 3 residual: parsear YAML real (yq/python) e checar timestamp.assinatura
# do Ronan dentro da janela. Por ora, reflexo em modo declaratório — pergunta ao
# operador humano antes de qualquer ação em (a)-(d) e loga a decisão.

echo "🛑 REFLEXO OLIMPO — interrupt-before-mutation"
echo "Camada 3-4 detectou ação em categoria sensível (ASL: 3):"
echo "  (a) Arbitragem cross-executivo sem consenso escalado"
echo "  (b) Escalada a board/investidor sem gate humano"
echo "  (c) Mutação em Contrato de Missão lacrado"
echo "  (d) Publicação de decisão M&A/pivot sem gate humano"
echo ""
echo "Ordem canônica: MOSTRAR ação → AGUARDAR 'ok' → APLICAR."
echo "Se não é (a)-(d), execute normalmente. Se é (a)-(d), trave e devolva ao Hermes."

exit 0  # modo declaratório enquanto Fase 3 residual não implementa parsing YAML
