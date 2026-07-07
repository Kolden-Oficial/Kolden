#!/usr/bin/env bash
# interrupt-before-mutation.sh — Reflexo Kolden G4 (Art. X) para Prometeu ASL-3
# Pausa antes de mutation-with-side-effect ate resposta humana explicita.
# Justificativa: Prometeu = ASL-3 (git push canal externo + deploy CI/CD + MCP setup + migration producao).
# NOTA: git push ja e coberto pelo hook enforce-git-push-authority.cjs; este reflexo cobre o restante.
# Ratificado: 2026-07-07 (Sub-onda 3.1 do Contrato-mae m-20260706-metodo-kolden).

set -euo pipefail

CMD="${TOOL_INPUT_command:-}"

# Padroes de mutation-with-side-effect ASL-3 (alem do git push, ja coberto)
declare -a ASL3_PATTERNS=(
  "docker mcp"                    # MCP infra setup
  "npx aiox-core install"         # Aplicar migracao de producao AIOX
  "npm publish"                   # Publicacao em registry publico
  "gh release create"             # Release publico GitHub
  "gh workflow run"               # Trigger CI/CD real
  "aws s3 sync"                   # Sync S3 (canal externo)
  "gcloud "                       # Deploy GCP
  "supabase db push"              # Aplicar migration em Supabase
  "supabase deploy"               # Deploy edge function em Supabase
)

for pattern in "${ASL3_PATTERNS[@]}"; do
  if [[ "$CMD" =~ $pattern ]]; then
    echo "[interrupt-before-mutation] BLOCK ASL-3: comando '${pattern}' detectado." >&2
    echo "[interrupt-before-mutation] Comando completo: ${CMD}" >&2
    echo "[interrupt-before-mutation] Prometeu opera sob ASL-3 (mutations irreversiveis em canal externo/producao)." >&2
    echo "[interrupt-before-mutation] G4 (off-switch/corrigibility) exige HITL antes de execucao." >&2
    echo "[interrupt-before-mutation] Confirme humanamente ANTES de prosseguir. Autorizacao deve ser reautorizada por linha (nao por sessao)." >&2
    exit 2  # Exit 2 = deny (Claude Code hook convention)
  fi
done

exit 0
