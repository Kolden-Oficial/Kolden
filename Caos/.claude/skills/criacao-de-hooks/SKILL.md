---
name: criacao-de-hooks
description: Cria reflexos determinísticos (scripts shell + configuração em settings.json) para agentes do Kolden. Use quando o PRD do agente exigir guardrails rígidos como bloquear ações perigosas, registrar logs de auditoria, validar saídas ou notificar eventos. Reflexos são regras absolutas — não dependem do julgamento do modelo.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Criação de reflexo

## Princípio
Reflexo é **determinístico**: roda sempre, sem depender do julgamento do
modelo. Instruções no CLAUDE.md são seguidas na maioria das vezes; reflexos são
seguidos 100% das vezes. Todo guardrail crítico do PRD vira reflexo, não
parágrafo de texto.

## Onde ficam
- Configuração: `C:\Kolden\<NomeMitológico>\.claude\settings.json`
- Scripts: `C:\Kolden\<NomeMitológico>\.claude\reflexos\*.sh` (sempre com `chmod +x`)
- Use `$CLAUDE_PROJECT_DIR` nos caminhos do settings.json para o reflexo
  funcionar de qualquer diretório de trabalho.

## Eventos mais usados
| Evento | Quando dispara | Uso típico |
|---|---|---|
| PreToolUse | antes de qualquer ferramenta rodar | bloquear ação perigosa (exit 2 = bloqueia) |
| PostToolUse | depois da ferramenta rodar | auditoria, log |
| SessionStart | ao abrir a sessão | verificação de alinhamento, contexto |
| Stop | quando o agente termina o turno | notificação, resumo |
| UserPromptSubmit | quando o usuário envia prompt | validar/enriquecer o pedido |

## Estrutura no settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/reflexos/pre-ferramenta.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/reflexos/auditoria.sh" }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [{ "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/reflexos/inicio-sessao.sh" }]
      },
      {
        "hooks": [{ "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/reflexos/verificacao-diaria.sh" }]
      }
    ]
  }
}
```

## Convenções de saída do script
- `exit 0` → permite e segue.
- `exit 2` → **bloqueia** a ação (use em PreToolUse para guardrails).
- `echo` em PreToolUse/SessionStart → injeta contexto para o modelo ler.

## Credenciais em scripts
Scripts shell NUNCA têm credenciais em texto puro. Toda credencial é buscada
via Infisical antes de ser usada (ver habilidade `infisical-padrao`).

## Exemplo: bloquear gasto sem aprovação (gestor de tráfego)
```bash
#!/bin/bash
entrada=$(cat)
if echo "$entrada" | grep -qiE "budget|orcamento|update_campaign|set_budget"; then
  echo "BLOQUEADO: alteração de orçamento exige aprovação humana." >&2
  exit 2
fi
exit 0
```

## Regra do Kolden
Todo agente criado recebe no mínimo 3 reflexos:
1. **PreToolUse de segurança** — derivado dos guardrails do PRD
2. **PostToolUse de auditoria** — registra ações em `registros/auditoria.log`
3. **SessionStart de verificação** — inclui `verificacao-diaria.sh`
