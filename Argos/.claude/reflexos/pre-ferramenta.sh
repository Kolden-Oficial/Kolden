#!/bin/bash
# Reflexo PreToolUse — guardrail de segurança do Argos (padrão Kolden + guardrail ToS-cinza)
# exit 0 = permite | exit 2 = bloqueia
#
# NOTA: os VETOS semânticos do Argos ("nada sem proveniência"; "zona cinza sem autorização")
# são gates de RACIOCÍNIO — vivem no orquestrador (agents/argos-chief.md > veto_rules), no
# sentinela (agents/compliance-sentinela.md), no checklist (checklists/output-quality.md >
# GATE INVIOLÁVEL) e nos checkpoints do workflow. Este reflexo cobre os guardrails MECÂNICOS.

entrada=$(cat)

# Bloqueia comandos destrutivos
if echo "$entrada" | grep -qE 'rm[[:space:]]+-rf[[:space:]]+(/|~|\$HOME)([[:space:]]|"|$)'; then
  echo "BLOQUEADO pelo Kolden: rm -rf em diretório raiz/home é proibido." >&2
  exit 2
fi

if echo "$entrada" | grep -qE 'git[[:space:]]+push[[:space:]]+.*(--force|-f)([[:space:]]|"|$)'; then
  echo "BLOQUEADO pelo Kolden: git push --force exige aprovação humana explícita." >&2
  exit 2
fi

# Protege segredos: nada de ler .env diretamente (use Infisical — Art. VII da Constituição)
if echo "$entrada" | grep -qE '(cat|less|head|tail)[[:space:]]+[^ ]*\.env'; then
  echo "BLOQUEADO pelo Kolden: leitura direta de .env proibida. Segredos vivem no Infisical." >&2
  exit 2
fi

# Bloqueia escrita de credenciais em texto puro em qualquer arquivo
if echo "$entrada" | grep -qiE '(api_key|secret_key|access_token|password|senha)[[:space:]]*=[[:space:]]*[a-zA-Z0-9_-]{20,}'; then
  echo "BLOQUEADO pelo Kolden: credencial em texto puro detectada. Use Infisical (Art. VII)." >&2
  exit 2
fi

# ───────────────────────────────────────────────────────────────────────────
# GUARDRAIL ZONA ToS-CINZA (específico do Argos)
# Qualquer invocação do modulo-cinza/ ou de scrapers sociais autenticados (twscrape,
# instaloader, TikTokApi, Douyin) só pode ocorrer COM autorização humana registrada na
# sessão. A autorização é um marcador criado pelo compliance-sentinela:
#   .claude/.estado/cinza-autorizado-<session_id>
# Sem o marcador, BLOQUEIA e instrui a passar pelo sentinela.
# ───────────────────────────────────────────────────────────────────────────
if echo "$entrada" | grep -qiE 'modulo-cinza|twscrape|instaloader|tiktokapi|douyin_tiktok'; then
  session_id=$(echo "$entrada" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')
  [ -z "$session_id" ] && session_id="sem-sessao"
  marcador_cinza="$CLAUDE_PROJECT_DIR/.claude/.estado/cinza-autorizado-${session_id}"
  if [ ! -f "$marcador_cinza" ]; then
    echo "ZONA ToS-CINZA detectada (scraping autenticado / modulo-cinza). BLOQUEADO pelo Kolden:" >&2
    echo "esta operação viola Termos de Serviço de plataforma e exige autorização humana." >&2
    echo "Roteie para @compliance-sentinela: ele classifica VERDE/CINZA, pede sua confirmação" >&2
    echo "explícita, provisiona conta/proxy descartável via Infisical (/kolden/argos/cinza/*) e" >&2
    echo "cria o marcador de autorização da sessão antes de qualquer coleta cinza." >&2
    exit 2
  fi
fi

exit 0
