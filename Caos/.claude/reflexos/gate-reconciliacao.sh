#!/bin/bash
# Reflexo Stop — Gate de RECONCILIAÇÃO da absorção (Constituição, Art. VIII).
# Rede de segurança de fim de absorção: bloqueia o encerramento se a reconciliação
# (relatorio-de-perda.md) não fechar a aritmética de não-perda. exit 2 = bloqueia.
#
# Recebe o slug do repo via env CAOS_REPO_SLUG (setada na F1 da ingestao-de-repositorio).
# Fora de uma absorção (sem o slug), sai com exit 0 e NÃO interfere na sessão.

# Não é absorção -> não interfere.
[ -z "$CAOS_REPO_SLUG" ] && exit 0

# Resolve um interpretador Python que REALMENTE funcione. No Git Bash do Windows o alias
# `python3` cai no stub da Microsoft Store (sai != 0); o probe `-c "import sys"` o filtra.
PY=""
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    PY="$c"; break
  fi
done
[ -z "$PY" ] && { echo "BLOCK: nenhum interpretador Python encontrado para o gate-reconciliacao" >&2; exit 2; }

"$PY" "$(dirname "$0")/gate-reconciliacao.py" "$CAOS_REPO_SLUG" || exit 2
exit 0
