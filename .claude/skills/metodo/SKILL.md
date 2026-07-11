---
name: metodo
description: Use SEMPRE quando o Ronan (ou qualquer agente Kolden) perguntar sobre o Método Kolden, sobre a padronização de agents, sobre a hierarquia de 5 camadas, sobre a convenção `@` vs `/`, sobre os 8 critérios canônicos, sobre os 12 princípios, sobre os 5 buckets de capacidade, sobre o rito de padronização das Ondas 2-26, ou sobre o papel do Dike. Use TAMBÉM quando alguém disser "aplique o Método", "está seguindo o Método?", "isso está no METODO-KOLDEN?", "o que diz o Método sobre X?", "por que temos essa convenção?", "de quem herdamos X?" (Amodei/Russell/Simon/Brooks/Bostrom/Bai/Yao/Olah/Anthropic MCP/framework do Liceu), ou "quais são os artigos da Constituição do Caos v2.5?". Fonte-de-verdade única: `C:\Kolden\METODO-KOLDEN.md v1.0`.
tipo: skill
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
---

# /metodo — Método Kolden v1.0

**Fonte-de-verdade única:** `C:\Kolden\METODO-KOLDEN.md` (v1.0, ratificado 2026-07-06).

Esta skill NÃO reproduz o Método — aponta para ele e ajuda a navegá-lo.

## O que o Método consolida

- **12 princípios canônicos** — herdados 1:1 do framework `arquitetura-de-agents-kolden` do Liceu (Fase 1 do Contrato `m-20260704`). Turing, Minsky, Simon, Karpathy, Russell, Bostrom, Brooks, Bai/Amodei, Anthropic RSP, Yao (ReAct), LangGraph, Anthropic MCP.
- **5 camadas hierárquicas** — Humano → Hermes → Zeus → Executivos (8 deuses) → Operacional (26 squads + 6 sementes). Dike verifica na subida.
- **8 critérios canônicos por agent (Art. X)** — G1 constituição · G2 ASL · G3 uncertainty/aspiration · G4 off-switch · G5 interpretabilidade · G6 orthogonality+instrumental · G7 grounding · G8 predictions.
- **14 modelos do Caos** — PRD como fonte da verdade; demais espelham por campo.
- **Convenção `@` (dispatch cross-squad) vs `/` (skill invocation local)** — centralizada aqui.
- **5 buckets de capacidade Kolden** — agente-faz-sozinho / com-input / instrumenta-humano-decide / humano-puro / bloqueado-por-capacidade-faltante.
- **Rito de padronização de squad em 9 passos** (Ondas 2-26).
- **Predições Kolden 2026-2027** — 5 previsões datáveis com scorecard.

## Quando invocar esta skill

- Ronan pergunta "o que é o Método Kolden?" → responder + apontar para METODO-KOLDEN.md.
- Ronan pergunta "de quem herdamos X?" → grep no §11 Referências + apontar linhagem.
- Ronan pergunta "essa decisão viola o Método?" → checar os 8 gates canônicos §4 + severidade.
- Qualquer agent Kolden precisa saber a convenção `@` vs `/` → apontar §6.
- Qualquer agent precisa saber a hierarquia de 5 camadas → apontar §3.
- Qualquer agent precisa saber os 8 critérios canônicos → apontar §4.
- Qualquer agent quer entender por que existe um squad ou princípio → apontar §2 + §11.

## Quando NÃO invocar esta skill

- Para EXECUTAR o rito de padronização de um squad → invoca `/padronizar <Squad>`.
- Para criar um agent novo → invoca `@Caos`.
- Para verificar independentemente uma entrega → invoca `@dike` (após instanciação — ver §9 do METODO).

## Como responder quando invocada

1. Ler `C:\Kolden\METODO-KOLDEN.md` (~600 linhas — usar Read com offset/limit se a pergunta for específica).
2. Localizar a seção relevante (§1-§12).
3. Responder citando a seção + linha aproximada + procedência se aplicável.
4. Se a pergunta expor gap ou divergência não coberta pelo Método atual → escalar como candidato a versão minor bump (Passo 9 do rito §8).

## Cheat-sheet das seções (para dispatch rápido)

| Se a pergunta é sobre... | Aponte para... |
|---|---|
| O que é o Método | §1 |
| Princípios (Turing/Minsky/Simon/etc.) | §2 |
| Hierarquia de 5 camadas | §3 |
| 8 critérios canônicos por agent | §4 |
| 14 modelos do Caos | §5 |
| Convenção `@` vs `/` | §6 |
| 5 buckets de capacidade | §7 |
| Como padronizar um squad | §8 |
| Papel do Dike | §9 |
| Predições Kolden 2026-2027 | §10 |
| Referências / procedência de X | §11 |
| Versão / roadmap / próxima Onda | §12 |

## Divergências ativas (declarar quando relevante)

- **G5 interpretabilidade** — framework do Liceu não nomeia; Método eleva a critério próprio. Emenda proposta ao Liceu-chief (Onda 6 do Método).
- **Categoria "runtime bidirecional" no Art. IV** — MCP spec 2024 não modela event streams; 5 adapters do Hermes formam categoria constitucional própria. Emenda proposta.

## Procedência desta skill

Extraída do próprio METODO-KOLDEN.md v1.0. Sem citação externa nova. Escrita na Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden` pelo `caos-chief` (dogfooding).
