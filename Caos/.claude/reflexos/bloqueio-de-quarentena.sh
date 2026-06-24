#!/bin/bash
# Reflexo PreToolUse — quarentena de absorção de repositório (Constituição, Art. VIII)
# Bloqueia EXECUÇÃO de código de terceiro sob _staging/quarentena/.
# Leitura e análise estática (cat, ls, rg, grep, git, semgrep, gitleaks) são PERMITIDAS.
# Execução dinâmica isolada em Docker só é permitida com o sentinela .docker-aprovado
# (criado por ação humana explícita após o veredito QUARENTENA).
# exit 0 = permite | exit 2 = bloqueia

entrada=$(cat)

# Extrai o campo "command" do JSON do hook; se não achar, usa a entrada inteira.
cmd=$(echo "$entrada" | grep -oE '"command"[[:space:]]*:[[:space:]]*"([^"\\]|\\.)*"' | head -1)
[ -z "$cmd" ] && cmd="$entrada"

Q='_staging/quarentena'

# 1) curl|bash e wget|sh são execução remota não verificada — sempre proibido (supply-chain).
if echo "$cmd" | grep -qE '(curl|wget)[[:space:]][^|]*\|[[:space:]]*(sudo[[:space:]]+)?(bash|sh|zsh)'; then
  echo "BLOQUEADO pelo Kolden (Art. VIII): 'curl|bash'/'wget|sh' executa código remoto não verificado." >&2
  exit 2
fi

# A partir daqui, só interessa o que toca a quarentena.
if ! echo "$cmd" | grep -q "$Q"; then
  exit 0
fi

# 2) Docker é o ÚNICO caminho de execução dinâmica permitido — e só com o sentinela.
if echo "$cmd" | grep -qE '(^|[[:space:];|&])docker[[:space:]]+(run|compose|build)'; then
  qdir=$(echo "$cmd" | grep -oE "[^\"' ]*${Q}/[^\"' ]+" | head -1)
  repo_root=$(echo "$qdir" | sed -E "s#(.*${Q}/[^/]+).*#\1#")
  if [ -n "$repo_root" ] && { [ -f "$repo_root/.docker-aprovado" ] || [ -f "$CLAUDE_PROJECT_DIR/$repo_root/.docker-aprovado" ]; }; then
    # Exige isolamento mínimo: sem rede.
    if echo "$cmd" | grep -qE -- '--network[[:space:]=]+none'; then
      exit 0
    fi
    echo "BLOQUEADO pelo Kolden (Art. VIII): execução em Docker sobre a quarentena exige '--network none'." >&2
    exit 2
  fi
  echo "BLOQUEADO pelo Kolden (Art. VIII): execução dinâmica da quarentena exige autorização nominal." >&2
  echo "  Crie o sentinela '$repo_root/.docker-aprovado' (ação humana) após o veredito QUARENTENA." >&2
  exit 2
fi

# 3) Qualquer interpretador / instalador / script tocando a quarentena = execução de terceiro = bloqueado.
if echo "$cmd" | grep -qE '(node|deno|bun|ts-node|python3?|ruby|php|perl|bash|sh|zsh|npm|npx|pnpm|yarn|pip3?|pipx|poetry|cargo|gem|composer|gradle|mvn|make|chmod[[:space:]]+\+x|source[[:space:]]|\./)'; then
  echo "BLOQUEADO pelo Kolden (Art. VIII): execução de código sob _staging/quarentena/ é proibida." >&2
  echo "  A absorção é ESTÁTICA por padrão. Para checagem dinâmica, use Docker isolado com .docker-aprovado." >&2
  exit 2
fi

exit 0
