---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

﻿# F2 — Segurança estática · msitarzewski/agency-agents@a597cb6

| Campo | Valor |
|---|---|
| Repo | github.com/msitarzewski/agency-agents |
| SHA | a597cb6d9e41b3c117ca791538764c8ccbe52119 |
| Slug | msitarzewski--agency-agents@a597cb6 |
| Licença | MIT |
| Auditor | Égide (via subagente uditor-de-seguranca) |
| Data | 2026-06-29 |
| Veredito | **SAFE** |

## 1. Inventário de risco

**Manifestos de dependência:** Não detectados (0 arquivos)
- package.json — não existe
- equirements.txt — não existe
- pyproject.toml — não existe
- go.mod — não existe
- Cargo.toml — não existe

**Scripts shell detectados (7 arquivos principais):**
- scripts/install.sh — Instalador interativo (Fase 5.0)
- scripts/convert.sh — Conversor de agentes para múltiplas plataformas (2.3 KB)
- scripts/lib.sh — Biblioteca compartilhada (3.7 KB, helpers de frontmatter/TUI/ANSI)
- scripts/lint-agents.sh — Linter de validação de estrutura
- scripts/check-divisions.sh — Validador de consistência de divisões
- scripts/check-tools.sh — Validador de consistência de ferramentas
- scripts/check-agent-originality.sh — Detector de duplicação (com Python3 inline)
- integrations/mcp-memory/setup.sh — Setup de integração MCP (informativo)
- scripts/build-hermes-plugin.py — Script Python puro (geração de plugin Hermes, 483 linhas)

**Dockerfiles:** Não encontrados  
**Makefiles:** Não encontrados  
**Workflows CI (.github/workflows/):** 3 arquivos
- .github/workflows/lint-agents.yml — CI: linting em PR
- .github/workflows/check-divisions.yml — CI: validação de divisões
- .github/workflows/check-tools.yml — CI: validação de ferramentas

**Outros:** 
- .gitignore — Bem configurado (exclui integrations/* geradas, node_modules/, venv/)
- divisions.json — Manifesto de divisões (2.3 KB)
- 	ools.json — Manifesto de ferramentas (7.5 KB)

## 2. Segredos

**0 segredos reais detectados.**

**Matches encontrados (documentação/exemplos):**
1. engineering/engineering-feishu-integration-developer.md:145 — private token: string = ''; (string vazia, documentação)
2. engineering/engineering-feishu-integration-developer.md:160 — pp_secret: process.env.FEISHU_APP_SECRET, (referência a env var, não hardcoded)
3. security/security-senior-secops.md:46-47 — Blocos BEGIN RSA PRIVATE KEY (exemplo de padrão a evitar, não chave real)
4. security/security-senior-secops.md:60, 67 — Valores default "secret", "admin" (ANTI-PADRÃO sendo documentado)
5. 	esting/testing-api-tester.md:77 — password: process.env.TEST_USER_PASSWORD (env var, não hardcoded)

**Conclusão:** Os matches são **documentação de padrões de segurança**. Nenhum segredo real ou chave privada legítima foi encontrada.

## 3. Dependências / CVE (sem instalar)

**Resultado:** 0 manifestos de dependência encontrados → nenhuma dependência externa.

**Interpretação:** Repositório é uma coleção de definições de agentes em Markdown + scripts de conversão. Dependências indiretas:
- Bash 3.2+ (padrão)
- Python3 (para check-agent-originality.sh e build-hermes-plugin.py)
- Git, coreutils (padrão em Unix)

**CVE:** Não aplicável — zero dependências versionadas.

## 4. Padrões perigosos

**Análise:** 0 padrões perigosos detectados no código executável.

| Padrão | Ocorrências | Status |
|---|---|---|
| eval() | 3 | Documentação (anti-padrão ensinado) |
| subprocess. | 6 | Exemplos em blocos .md, esperados |
| yaml.load( | 1 | Comentário educacional |
| Function(), exec(), os.system, child_process, m.runIn, pickle.loads, marshal.loads | 0 | — |
| preinstall/postinstall/prepare | 0 | Não há package.json |

**Veredito:** Todos os matches estão em documentação .md, exemplificando boas práticas.

## 5. Supply-chain

**Typosquatting:** Não aplicável (zero dependencies)  
**URLs não-oficiais:** Nenhuma  
**Binários:** 0 arquivos .exe, .dll, .so commitados  
**Ofuscação:** Nenhuma  
**Procedência:** Arquivo _procedencia.md presente, rastreabilidade clara

**Conclusão:** Limpo.

## 6. Análise dos scripts scripts/

| Script | Propósito | Riscos |
|---|---|---|
| install.sh | Instalador interativo TUI | Nenhum — sem downloads dinâmicos, sem eval de input |
| convert.sh | Conversor de agentes para múltiplos formatos | Nenhum — lê locais, transforma, escreve em integrations/ |
| lib.sh | Helpers bash compartilhados | Nenhum — puro bash, zero calls externas |
| lint-agents.sh | Validação de YAML frontmatter | Nenhum — apenas lê e valida |
| check-divisions.sh | Validador de consistência | Nenhum — análise estática |
| check-tools.sh | Validador de ferramentas | Nenhum — análise estática de JSON |
| check-agent-originality.sh | Detector de duplicação (Jaccard) | Nenhum — requer Python3, sem downloads |
| setup.sh (mcp-memory) | Informativo | Nenhum — imprime instruções |

## 7. Análise dos workflows CI

| Workflow | Passos | Riscos |
|---|---|---|
| lint-agents.yml | checkout v4 → git diff → lint agents → check originality | Nenhum |
| check-divisions.yml | checkout v4 → check-divisions.sh | Nenhum |
| check-tools.yml | checkout v4 → check-tools.sh | Nenhum |

Nenhum segredo expostos, scripts com sudo, artifacts suspeitos ou callbacks externos.

## Síntese e veredito

**VEREDITO: SAFE** ✓

Passou em **todas as 7 verificações estáticas** sem achados críticos:
- 0 segredos reais
- 0 dependências vulneráveis
- 0 padrões perigosos em código ativo
- 0 binários suspeitos
- 0 URLs malformadas
- 0 scripts ofuscados
- Documentação exemplar de segurança

Repositório está **liberado para F3 (Compreensão 100%)**.

## Limitações

Ferramentas de SAST não rodadas (não disponíveis):
- secretlint, semgrep, gitleaks, 	rivy, 
pm audit, pip audit

Análise realizada com **grep manual + PowerShell read-only** apenas. 100% estática, zero execução dinâmica.
