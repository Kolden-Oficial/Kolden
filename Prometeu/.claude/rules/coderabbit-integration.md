---
paths:
  - ".aiox-core/**"
  - "tests/**"
  - "packages/**"
  - "bin/**"
---

# Integração com CodeRabbit — Regras Detalhadas

## Configuração de Auto-Correção (Self-Healing)

### Fase de Dev (@dev — Story Development Cycle Fase 3)

```yaml
mode: light
max_iterations: 2
timeout_minutes: 30
severity_filter: [CRITICAL, HIGH]
behavior:
  CRITICAL: auto_fix
  HIGH: auto_fix (iteration < 2) else document_as_debt
  MEDIUM: document_as_debt
  LOW: ignore
```

**Fluxo:**
```
RODAR CodeRabbit → CRITICAL encontrado?
  SIM → auto-correção (iteration < 2) → Rodar novamente
  NÃO → Documentar HIGH como débito, prosseguir
Após 2 iterações com CRITICAL → PARAR, intervenção manual
```

### Fase de QA (@qa — Pré-Revisão do QA Loop)

```yaml
mode: full
max_iterations: 3
timeout_minutes: 30
severity_filter: [CRITICAL, HIGH]
behavior:
  CRITICAL: auto_fix
  HIGH: auto_fix
  MEDIUM: document_as_debt
  LOW: ignore
```

**Fluxo:**
1. Varredura de revisão pré-commit
2. Loop de auto-correção (máximo de 3 iterações)
3. Análise manual de QA (arquitetural, rastreabilidade, NFR)
4. Decisão de gate (veredito)

## Resumo do Tratamento por Severidade

| Severidade | Fase de Dev | Fase de QA |
|----------|-----------|----------|
| CRITICAL | auto_fix, bloquear se persistir | auto_fix, bloquear se persistir |
| HIGH | auto_fix, documentar se falhar | auto_fix, documentar se falhar |
| MEDIUM | document_as_tech_debt | document_as_tech_debt |
| LOW | ignore | ignore |

## Execução em WSL (Windows)

```bash
# Modo de auto-correção (automático em tasks de dev)
wsl bash -c 'cd /mnt/c/.../aiox-core && ~/.local/bin/coderabbit --severity CRITICAL,HIGH --auto-fix'

# Revisão manual
wsl bash -c 'cd /mnt/c/.../aiox-core && ~/.local/bin/coderabbit -t uncommitted'

# Modo somente-prompt
wsl bash -c 'cd /mnt/c/.../aiox-core && ~/.local/bin/coderabbit --prompt-only -t uncommitted'
```

## Pontos de Integração

| Workflow | Fase | Gatilho | Agente |
|----------|-------|---------|-------|
| Story Development Cycle | 3 (Implementar) | Após conclusão da task | @dev |
| QA Loop | 1 (Revisão) | No início da revisão | @qa |
| Standalone | Qualquer | Comando `*coderabbit-review` | Qualquer |

## Áreas de Foco por Tipo de Story

| Tipo de Story | Foco Principal |
|-----------|--------------|
| Feature | Padrões de código, cobertura de testes, design de API |
| Bug Fix | Risco de regressão, cobertura da causa raiz |
| Refactor | Breaking changes, estabilidade de interface |
| Documentation | Qualidade do Markdown, validade de referências |
| Database | SQL injection, cobertura de RLS, segurança de migration |

## Local dos Relatórios

Os relatórios do CodeRabbit são salvos em: `docs/qa/coderabbit-reports/`

## Referência de Configuração

Configuração completa em `.aiox-core/core-config.yaml`, na seção `coderabbit_integration`.
