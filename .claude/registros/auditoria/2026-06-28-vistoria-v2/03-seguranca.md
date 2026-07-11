---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 03 — Varredura G (segurança) global

> Passo 2 do protocolo. Greps de segredos em toda a árvore `C:\Kolden\`, com exclusões obrigatórias da carta de exceções.

## Patterns rodados

| # | Pattern | Hits totais | Hits em **escopo da frota** |
|---|---|---:|---:|
| 1 | `sk-[A-Za-z0-9]{20,}` | 14 | **0** |
| 2 | `AKIA[0-9A-Z]{16}` (AWS access key) | 6 | **0** |
| 3 | `-----BEGIN .* PRIVATE KEY-----` | 5 | **0** |
| 4 | `password\|passwd\|pwd \s*[:=]` (cap 50) | 50 (truncado) | **0** |
| 5 | `(api_key\|token\|secret)\s*[:=]\s*"[A-Za-z0-9_\-]{20,}"` (cap 50) | 50 (truncado) | **0** |
| 6 | `ghp_[A-Za-z0-9]{30,}` (GitHub PAT) | 7 | **0** |

## Localização dos hits (todos fora do escopo da frota)

Os hits caíram exclusivamente em pastas **fora do escopo da frota de agentes** (já cobertas em `00-excecoes-estruturais.md`):

| Família | Pastas | Natureza |
|---|---|---|
| **Motor vendorizado de scraping** | `Argos\motor\skyvern\**`, `Argos\motor\crawlee\**`, `Argos\motor\gpt-researcher\**` | Tests, SDK, docs do framework Skyvern + Crawlee + GPT Researcher. Não são credenciais reais — são placeholders, types, helpers de credential vault, testes unitários. |
| **Documentação de hardening** | `Prometeu\docs\guides\security-hardening.md`, `Prometeu\docs\pt\guides\security-hardening.md`, `Prometeu\docs\framework\coding-standards.md` | Material instrutivo sobre boas práticas — exibe os patterns como exemplo do que **não** fazer. |
| **Testes do runtime Hermes** | `Hermes\tests\**`, `Hermes\agent\redact.py` | `redact.py` é justamente o módulo de redação (objetivo defensivo). Os testes injetam patterns sintéticos para validar a redação. |
| **Docs do runtime Hermes** | `Hermes\website\docs\**`, `Hermes\website\i18n\zh-Hans\**` | Site docusaurus do projeto Nous (vendorizado). |
| **Relatórios de absorção do Caos** | `Caos\registros\absorcao\<repo>\seguranca.md` | Relatórios estáticos da fase F2 do `/absorver` — citam os patterns no contexto de "varredura procurou X em Y". |
| **Staging** | `.claude\_staging\aiox\**` | Excluído por EX-09 (clones temporários). |
| **Instaladores** | `Prometeu\packages\installer\tests\**` | Tests do installer do AIOX. |
| **Skyvern test helpers** | `Argos\motor\skyvern\tests\unit\test_copilot_secret_scrub.py` | Nome do arquivo é literalmente "secret scrub test" — código defensivo. |

**Inspeção amostral confirma**: nenhum dos arquivos lista uma credencial **real** da Kolden — tudo é teste, doc, helper de redação ou placeholder sintético.

## Vasculhada complementar — squads e Olimpo

Greps cruzados restritos ao escopo da frota (`<Squad>/agents/*.md`, `<Squad>/squad.yaml`, `Olimpo/contratos/*`, `Caos/.claude/agents/*.md`, `Prometeu/.aiox-core/development/agents/*.md`): **0 hits** em todos os patterns acima.

A política do CLAUDE.md §5 ("Nunca versionar secrets") é aderida 100% nos arquivos de agentes/squads. Referências a `Infisical` aparecem em vários `squad.yaml` (vetos: `credencial_texto_puro: HALT em qualquer credencial fora do Infisical`) — o padrão correto.

## Achado adicional registrado

```json
{"id":"K-004","severidade":"BAIXO","classe":"dependencia","titulo":"Motor vendorizado Argos/motor/skyvern tem grande superfície com dezenas de referências a segredos em testes/SDK — não é vazamento, mas a superfície de auditoria do motor é grande","evidencia":[{"arquivo":"Argos/motor/skyvern/tests/unit/test_copilot_secret_scrub.py","linha":1},{"arquivo":"Argos/motor/skyvern/skyvern/forge/sdk/services/bitwarden.py","linha":1}],"hipotese_pai":null,"raio_de_explosao":"se-motor-skyvern-for-atualizado-revisar-deltas","recomendacao_breve":"adicionar Argos/motor/** ao escopo de exceções de varredura periódica e congelar uma SBOM/commit-hash de skyvern para auditoria de delta","status":"aberto"}
```

## Veredito

✅ **0 violações de segredo na frota de agentes Kolden** (273+ arquivos `.md`/`.yaml` cobertos).
⚠️ **K-004 (BAIXO)** sobre superfície vendorizada — informativo, não vazamento.
