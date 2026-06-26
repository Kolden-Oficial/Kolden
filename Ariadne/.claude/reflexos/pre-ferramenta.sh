#!/bin/bash
# Reflexo PreToolUse — guardrail de segurança da Ariadne (padrão Kolden)
# exit 0 = permite | exit 2 = bloqueia
#
# NOTA: os VETOS semânticos da Ariadne ("sem black-hat/cloaking"; "CRO só por hipótese testável";
# "copy é handoff ao Caliope") são gates de RACIOCÍNIO — vivem no orquestrador
# (agents/ariadne-chief.md > veto_rules), nos especialistas e no checklist
# (checklists/output-quality.md). Este reflexo cobre os guardrails MECÂNICOS.

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

exit 0
