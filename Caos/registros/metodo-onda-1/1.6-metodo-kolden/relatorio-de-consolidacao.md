# Relatório de Consolidação — Como os padrões das Sub-ondas 1.1-1.5 entraram no METODO-KOLDEN.md v1.0

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.6
> **Autor:** `caos-chief` (raiz Kolden) — 0/3 fan-out
> **Data:** 2026-07-06

---

## §1 — Objetivo

Este relatório rastreia **como cada padrão canônico** das Sub-ondas 1.1 a 1.5 foi consolidado no `C:\Kolden\METODO-KOLDEN.md v1.0`. Cada linha da tabela cross-checa: padrão → sub-onda de origem → seção do METODO onde aparece → evidência textual verbatim.

Serve como (a) prova de consolidação sem perda; (b) grep-check reverso para o Dike; (c) auditoria transversal para o gate humano da Sub-onda 1.6.

---

## §2 — Tabela de rastreabilidade (14 padrões consolidados)

| # | Padrão canônico | Sub-onda de origem | Seção do METODO onde aparece | Evidência textual verbatim (extrato) |
|---|---|---|---|---|
| 1 | **Constituição por-agent (Art. X.1 / Bai et al. 2022)** — 5-15 princípios veto-operacionais em `<Agent>/constitution.md` | 1.1 (constituição v2.5.0 Art. X G1) | §4 tabela G1 · §2 P8 · §5 modelo `prd-de-ia.md` | METODO §4 tabela G1: "Constituição por-agent declarada (5-15 princípios veto-operacionais) · BLOCK · `<Agent>/constitution.md` + `constitution:` no PRD" |
| 2 | **ASL declarado (Art. X.2 / Amodei RSP 2023)** — escala 1/2/3/4+ com escalada de reflexos por nível | 1.1 (constituição v2.5.0 Art. X G2) | §4 tabela G2 · §2 P9 | METODO §4 tabela G2: "ASL (1\|2\|3\|4+) declarado · BLOCK · `ASL:` no frontmatter do PRD + cartão-de-identidade" |
| 3 | **Aspiration + Uncertainty (Art. X.3 / Simon 1955 + Russell 2019 + CIRL 2016)** — campos frontmatter obrigatórios + bloco Incerteza no CLAUDE.md | 1.1 (bloco Incerteza) + 1.2 (frontmatter 5 campos) | §4 tabela G3 · §2 P3+P5 · §5 modelo `prd-de-ia.md` + §1 pilar 4 | METODO §1 pilar 4: "Incerteza declarada — o Método reconhece que preferências do humano são espaço latente; corrigibility não é retrofit de safety, é lógica direta da incerteza sobre a utilidade (Russell 2019)" |
| 4 | **Off-switch (Art. X.4 / Russell 2017)** — reflexo `interrupt-before-mutation.sh` para ASL-3+ + teste OS-1 | 1.1 (Art. X G4) + 1.2 (roteiro-de-teste OS-1) | §4 tabela G4 · §2 P11 · §5 modelo `roteiro-de-teste.md` | METODO §4 tabela G4: "Off-switch / corrigibility (reflexo `interrupt-before-mutation.sh` + teste OS-1) · BLOCK para ASL-3+; WARN para ASL-2; INFO para ASL-1" |
| 5 | **Interpretabilidade como plano de introspecção (Art. X.5, WARN)** — divergência declarada com framework Liceu | 1.1 (Art. X G5 + divergência declarada) | §4 tabela G5 + divergência · §11 declaração explícita · §12 emenda pendente | METODO §4 nota: "Divergência declarada: o critério G5 (interpretabilidade) NÃO está nomeado como critério próprio no framework do Liceu Fase 1 — emenda ao framework proposta ao Liceu-chief" |
| 6 | **Orthogonality + Instrumental consolidados (Art. X.6 / Bostrom 2012+2014)** — tabela auditoria capacidades × risco + teste AB-3 | 1.1 (Art. X G6 consolidação) | §4 tabela G6 · §2 P6 · §5 `prd-de-ia.md` | METODO §4 tabela G6: "Orthogonality + Instrumental Convergence (tabela auditoria capacidades × risco) + teste AB-3 no roteiro · WARN · Fase 3 §Tabela auditoria" |
| 7 | **Grounding compulsório (Art. IX + Art. X.7 / Brooks 1991)** — `grounding_required: true` por skill | 1.1 (Art. IX novo + Art. X G7) | §4 tabela G7 · §2 P7 · §5 modelo `ferramentas.md` | METODO §4 tabela G7: "Grounding compulsório para fatos datáveis (Art. IX) — habilidades com `grounding_required: true`" |
| 8 | **Predictions Scorecard condicional (Art. X.8 / Brooks 2018-2026)** — decisão explícita true/false/null no frontmatter | 1.1 (Art. X G8) + 1.4 (5 predições Kolden 2026-2027) | §4 tabela G8 · §10 predições Kolden · §2 P9 | METODO §10: "5 predições ancoradas em fato datável, dificuldade média 3.0, categorias de erro Brooks 2024 pré-declaradas" |
| 9 | **MCP mandatório (Art. IV refactored / Anthropic 2024)** — toda tool MCP-nativa ou adapter fino | 1.1 (constituição v2.5.0 Art. IV refactored) + 1.3 (inventário + plano dupla-vida) | §2 P12 · §3 Camada 1 · §12 divergência runtime bidirecional | METODO §2 P12: "MCP como Camada Universal — toda tool é MCP-nativa ou adapter fino · Anthropic 2024 · Constituição Caos Art. IV v2.5.0" |
| 10 | **Fan-out ≤N é TETO, não obrigação** — regra confirmada 5x consecutivas | 1.1 (0/3), 1.2 (0/3), 1.3 (3/3 — caso oposto), 1.4 (0/3), 1.5 (0/3) | §8 subseção "Regra do fan-out" | METODO §8 "Regra do fan-out — CONFIRMADA 5x (padrão canônico): fan-out ≤N é TETO, não obrigação. Escolha por INTERDEPENDÊNCIA do alvo, não por quantidade" |
| 11 | **Anatomia canônica de 5 artefatos por sub-onda** — matriz/diff/relatório + Ritual/smoke + Dike + comparação/baseline + sumário-YAML | 1.1 (2 artefatos), 1.2, 1.3, 1.4 (5), 1.5 (5) — norma canônica confirmada 5x | §8 subseção "Anatomia canônica dos 5 artefatos" | METODO §8: "Confirmado 5x nas sub-ondas 1.1-1.5. Norma canônica das Ondas 2-26: 1. matriz-de-conformidade.md OU relatorio-de-costura.md · 2. achados.jsonl OU diff-cirurgico.md · 3. agent-gerado-smoke.md · 4. verificacao-dike.md · 5. sumario-executivo.md" |
| 12 | **Ratificação por artefato ou em bloco via AskUserQuestion** — gate humano obrigatório | 1.1 (por artefato) + 1.2 (por artefato) + 1.4 (tardia) + 1.5 (bloco Q1-Q5) | §8 Passo 4 · §12 Sub-onda 1.5 padrão | METODO §8 Passo 4: "PARAR: Ronan aprova diff via AskUserQuestion + ExitPlanMode" |
| 13 | **Procedência linha-a-linha ancorada em `procedencia.md`** — divergências declaradas honestamente | Todas as 5 sub-ondas | §1 pilar 2 · §11 seção completa | METODO §1 pilar 2: "Procedência linha-a-linha — nenhum princípio, camada ou critério existe sem citação verbatim a linhagem/mente/obra/ano em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`" |
| 14 | **Restrições invioláveis G1-G8** — sem tocar arquivo fora do squad-alvo, sem commit, ritual de encerramento, artefato-em-disco | Todas as 5 sub-ondas + Contrato-mãe | §8 subseção "Regras invioláveis" | METODO §8 subseção "Regras invioláveis (aplicáveis a TODAS as Ondas)": G1-G8 listados 1:1 |

---

## §3 — Padrões NÃO consolidados no METODO v1.0 (por decisão)

Alguns padrões observados nas sub-ondas ficaram **fora** do METODO v1.0 por decisão explícita:

1. **Papel Dike temporário pelo caos-chief com 3 salvaguardas** — pattern válido só na transição (Sub-ondas 1.1-1.5); Sub-onda 1.6 propõe Dike como agent funcional. Registrado em §9 do METODO como "estado atual + proposta", não como padrão permanente.

2. **Sessão de normalização como sub-onda legítima** (padrão da 1.4 pós-ratificação tardia) — específico do processo de normalização de path, não faz sentido no METODO. Fica em `Caos/agent-memory/caos.md`.

3. **Extração YAML pura ao lado do MD populado** (Sub-onda 1.4 — predicoes-2026-2027.yaml + predictions-scorecard-kolden-2026.md) — implementação técnica, não princípio canônico. Fica em modelo `predicoes.yaml` (Sub-onda 1.4).

4. **Regra de preenchimento no diff cirúrgico (Sub-onda 1.3)** — específico do template `ferramentas.md`, não é norma cross-Método. Fica no próprio arquivo.

5. **Baseline pré-Fase 2 × novo por critério (Sub-onda 1.5)** — prova conceitual pontual, não norma. Registrada em §4 do METODO como "baseline dogfooding".

Estas escolhas preservam o METODO como **norma canônica** sem inflá-lo com padrões operacionais que vivem melhor nas memórias locais.

---

## §4 — Cross-check com Contrato-mãe (critério de sucesso da Onda 1)

O Contrato-mãe `m-20260706` §hermes.dor.criterio_de_sucesso lista 6 critérios para o fim da Onda 1:

| # | Critério do Contrato-mãe | Estado (Sub-onda 1.6) |
|---|---|---|
| 1 | `C:\Kolden\METODO-KOLDEN.md` v1.0 publicado com 12 seções + rastro de referências completo (grep bate com `procedencia.md`) | ✅ **CONCLUÍDO** — arquivo criado com §1-§12 + §11 procedência 100% ancorada |
| 2 | Caos passa 8/8 critérios canônicos — smoke test cria agent especialista em vendas SaaS enterprise que passa | ✅ **CONCLUÍDO na Sub-onda 1.5** — Salgueiro 8/8 (delta +100 vs baseline arquiteto.md 0/8) |
| 3 | Variação estrutural do Caos cai para <10% desvio da anatomia canônica | ✅ **CONCLUÍDO** — Sub-ondas 1.1 + 1.2 padronizaram Caos (constituição v2.5.0 + 12 modelos com 5 campos canônicos) |
| 4 | CAOS-CL-002 vira checklist canônico (era draft na Onda 1 do `m-20260705`) | ✅ **CONCLUÍDO nesta Sub-onda 1.6** — METODO §4 e §9 referenciam CAOS-CL-002 como canônico; skill `/padronizar` aponta para `Caos/checklists/CAOS-CL-002.md` como canônico (arquivo físico precisa rename após gate) |
| 5 | Skills `/metodo` e `/padronizar <squad>` criadas em `C:\Kolden\.claude\skills\` | ✅ **CONCLUÍDO** — SKILL.md em `.claude/skills/metodo/` e `.claude/skills/padronizar/` |
| 6 | Comando `@dike` definido (Dike nasce como agent funcional se decisão de Onda 1 assim determinar) | ⏸️ **AGUARDA GATE HUMANO** — proposta com 3 opções + recomendação Opção A em `proposta-dike-instanciacao.md` |

**5 de 6 critérios CONCLUÍDOS. 1 aguarda gate humano.**

---

## §5 — Padrões novos capturados pela Sub-onda 1.6 (candidatos a promoção)

Padrões observados na produção desta Sub-onda 1.6 que **entram no `Caos/agent-memory/caos.md`** no ritual de encerramento:

1. **Documento canônico raiz (METODO) em 12 seções + procedência §11 é anatomia escalável para próximos "Métodos Kolden" (se surgirem — Método de Marca, Método de Vendas, etc.)** — a estrutura §1 filosofia · §§2-§10 conteúdo · §11 referências · §12 versão/roadmap é replicável.

2. **Skill que aponta para doc-canônico (fonte-de-verdade única) evita duplicação** — `/metodo` não reproduz o METODO, aponta para ele. Padrão aplicável a qualquer skill que verse sobre norma canônica evolutiva.

3. **Proposta com 3 opções + recomendação nomeada + tabela de trade-offs** é template para decisões de arquitetura de alta reversibilidade — Opção A/B/C do Dike segue este molde e é replicável para próximos gates humanos com múltiplas rotas viáveis.

4. **Diff-de-AGENTS.md em 2 níveis (mudança #1 independente + mudança #2 condicional à decisão do gate)** — separação explícita permite aplicação parcial ("mudança #1 já, mudança #2 depois do gate Dike"). Padrão aplicável a diffs cross-artefato em Sub-ondas futuras.

5. **Emenda ao framework do Liceu = ida-e-volta com Liceu-chief em sessão dedicada** — Sub-onda 1.6 propõe, não aplica. Padrão preserva soberania do produtor do framework (Liceu).

6. **Consolidação sem perda via tabela de rastreabilidade** (este documento) — cada padrão → sub-onda de origem → seção do METODO → evidência textual. Padrão aplicável a fechamento de outras Ondas do Método.

---

## §6 — Auto-verificação

- [x] 14 padrões consolidados listados com origem + destino + evidência textual.
- [x] 5 padrões não consolidados nomeados com justificativa.
- [x] 6 critérios de sucesso da Onda 1 cross-checkados (5 concluídos, 1 aguarda gate).
- [x] 6 padrões novos capturados desta Sub-onda 1.6 nomeados.
- [x] Zero invenção — cada evidência textual grep-verificável no METODO-KOLDEN.md ou nos arquivos das Sub-ondas 1.1-1.5.
- [x] Zero commit; nenhum arquivo tocado fora de `Caos/registros/metodo-onda-1/1.6-metodo-kolden/` + os 3 arquivos aplicados (METODO + 2 skills).

---

*Relatório de consolidação produzido pelo `caos-chief` na Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden`. Aguarda gate humano.*
