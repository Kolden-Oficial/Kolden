#!/bin/bash
# Reflexo SessionStart — carrega o estado do Kolden no início de cada sessão

# Conta agentes irmãos do Caos (subpastas de Kolden/ que não são o Caos)
total=$(find "$CLAUDE_PROJECT_DIR/.." -mindepth 1 -maxdepth 1 -type d 2>/dev/null \
  | grep -v "Caos$" | wc -l | tr -d ' ')

echo "KOLDEN ATIVO — Caos pronto."
echo "Agentes já criados: $total"

if [ -f "$CLAUDE_PROJECT_DIR/registros/historico.md" ]; then
  echo "Últimas criações:"
  tail -3 "$CLAUDE_PROJECT_DIR/registros/historico.md" 2>/dev/null
fi

# Frescura do retrato vivo do ecossistema (vigia)
ultimo_digest=$(ls -1 "$CLAUDE_PROJECT_DIR/registros/vigia"/*.md 2>/dev/null | sort | tail -1)
if [ -n "$ultimo_digest" ]; then
  echo "Última varredura do vigia: $(basename "$ultimo_digest" .md)"
else
  echo "Estado da arte ainda não varrido — rode /vigia para atualizar dados/estado-da-arte.md"
fi

echo "Para criar um novo agente: 'Caos, quero criar um agente de ...' ou /caos"

exit 0
