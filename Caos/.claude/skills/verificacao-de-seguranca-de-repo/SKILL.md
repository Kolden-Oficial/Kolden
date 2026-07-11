---
name: verificacao-de-seguranca-de-repo
description: Faz a verificação de segurança ESTÁTICA de um repositório de terceiro em quarentena, antes de qualquer leitura profunda ou absorção (Fase 2 do pipeline de ingestão). Use quando um repo do GitHub foi clonado em _staging/quarentena e precisa de veredito SAFE/QUARENTENA/REJEITAR. Reusa as tasks de SAST do Prometeu e o squad Egide; nunca executa o código. Segurança é a prioridade #1.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Verificação de segurança de repositório (Fase 2 — gate BLOCK)

## Quando usar
Logo após a Fase 1 (quarentena), antes da compreensão profunda (Fase 3). É um **gate BLOCK**: sem
veredito SAFE, o pipeline de absorção não avança. Executada pelo subagente `auditor-de-seguranca`
(contexto isolado, tools restritas).

## Regra de ouro
**Análise 100% estática por padrão. Nunca executar o código do repo** — sem `install`, build, testes
ou scripts. O reflexo `bloqueio-de-quarentena.sh` reforça isso. Execução dinâmica só em Docker
isolado, opt-in nominal (ver fim).

## Ativos reusados (não duplicar)
- `Prometeu/.aiox-core/development/tasks/security-scan.md` — SAST (secretlint, ESLint security,
  Semgrep, audit). **Rodar em modo leitura; DESLIGAR a etapa "Setup Security Tools" que faz
  `npm install` de devDeps** (instalar = executar package scripts = proibido na quarentena).
- `Prometeu/.aiox-core/development/tasks/qa-security-checklist.md` — 8 padrões OWASP + secrets (regex).
- Squad `Egide` (`C:\Kolden\Egide\`) — arsenal de conhecimento, acionado via Task (consultivo):
  `omar-santos` (CVE/SBOM/VEX/supply-chain), `jim-manico` (OWASP/AppSec), `cartographer` (superfície
  de ataque), `cyber-chief` (síntese). **Reuso por referência — não modificar o Egide** (importado-cru).

## Sequência (estática)
1. **Inventário de risco** — manifestos (`package.json`, `requirements.txt`, `pyproject.toml`,
   `go.mod`, `Cargo.toml`), `*.sh`, `Dockerfile`, `Makefile`, workflows de CI.
2. **Segredos** — `gitleaks detect --no-git` / `rg` com os padrões do `qa-security-checklist.md`.
   Qualquer segredo real → tende a REJEITAR.
3. **Dependências / CVE (sem instalar)** — parse dos manifestos; versões vs CVEs. Delegar a
   `omar-santos`.
4. **Padrões perigosos (grep)** — `eval(`, `Function(`, `exec(`, `os.system`, `subprocess`,
   `child_process`, `vm.runIn*`, desserialização insegura; **CRÍTICO:** scripts `preinstall`/
   `postinstall`/`prepare`. Delegar OWASP a `jim-manico`.
5. **Supply-chain** — typosquatting, deps em git/URLs não-oficiais, binários commitados, ofuscação.
   `omar-santos` + `cartographer`.
6. **Síntese** — consolidar num veredito único.

## Veredito (gate BLOCK)
| Veredito | Critério | Ação |
|---|---|---|
| **SAFE** | 0 segredo, 0 CVE crítica explorável, 0 execução injustificada, supply-chain limpo | avança p/ F3 |
| **QUARENTENA** | achados médios/altos isoláveis; dúvida que a estática não resolve | PARA; apresenta ao Ronan; opt-in Docker disponível |
| **REJEITAR** | segredo real, CVE crítica explorável, backdoor, ofuscação, postinstall hostil | ABORTA; repo não entra |

Saída gravada pelo orquestrador em `Caos/registros/absorcao/<repo>/seguranca.md` (formato no
subagente `auditor-de-seguranca`).

## Opt-in Docker (só no veredito QUARENTENA, nunca por padrão)
Quando a estática não basta e o Ronan quer checagem dinâmica:
1. O auditor **propõe** o que o teste dinâmico confirmaria.
2. O Ronan **autoriza nominalmente** (padrão "módulo cinza" do Argos).
3. A autorização cria o sentinela `Caos/_staging/quarentena/<repo>/.docker-aprovado` (ação humana).
4. Só então o reflexo permite `docker run --network none`, mount **read-only**, sem volume de
   credencial. Container descartável; nada da quarentena toca o host.

## Restrições
- Nunca aprovar repo com segredo real ou CVE crítica explorável.
- Nunca instalar dependências nem rodar scripts/build/testes do repo.
- Nunca modificar o Egide nem as tasks do Prometeu (reuso por referência).
- Declarar explicitamente quando faltar ferramenta de SAST: faça a análise por `rg`/leitura e
  registre a limitação no relatório (não invente cobertura).
