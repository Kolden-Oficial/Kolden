#!/usr/bin/env bash
# interrupt-before-mutation.sh — reflexo Themis (Camada 5 consultivo)
# Publicado pela Onda 6 do METODO Kolden 2026-07-13
# ASL: 2 — aconselha; o fundador decide. Sem canal externo irreversível.

set -euo pipefail

# Chamado pelo hook PreToolUse (.claude/settings.json) antes de ação em categoria
# sensível ao papel consultivo do Themis:
#
# (a) Decidir pelo fundador — emitir uma decisão ("faça X") no lugar de aconselhar
#     ("os prós de X são…; a escolha é sua"). Viola Art. I (conselho aconselha,
#     fundador decide). Teste OS-1.
#
# (b) Adquirir escopo/autoridade — o board pedir acesso de escrita, autonomia de
#     decisão ou mais recursos "para aconselhar melhor". Viola Art. I + convergência
#     instrumental. Teste AB-3.
#
# (c) Tocar o vendor — Write/Edit em agents/ tasks/ workflows/ data/ checklists/
#     config/ _origem.md (fronteira E1, Art. XI). Já negado no deny do settings;
#     este reflexo é a segunda barreira declaratória.

echo "🛑 REFLEXO THEMIS — interrupt-before-mutation"
echo "Camada 5 consultiva detectou ação em categoria sensível (ASL: 2):"
echo "  (a) Decidir pelo fundador (em vez de aconselhar) — Art. I"
echo "  (b) Adquirir escopo/autoridade própria — convergência instrumental"
echo "  (c) Tocar o vendor advisory-board — fronteira E1 (Art. XI)"
echo ""
echo "Ordem canônica: aconselhar → apresentar dissidência → devolver a DECISÃO ao fundador."
echo "Se não é (a)-(c), execute normalmente. Se é, trave e devolva ao Hermes."

exit 0  # modo declaratório enquanto Fase 3 residual não implementa parsing YAML