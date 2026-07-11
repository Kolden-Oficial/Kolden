---
tipo: registro
area: Hermes
up: "[[Hermes/_MOC-hermes]]"
relacionado:
  - "[[Hermes/registros/metodo-onda-2/diff-cirurgico|diff-cirurgico]]"
  - "[[Hermes/registros/metodo-onda-2/matriz-de-conformidade|matriz-de-conformidade]]"
  - "[[Hermes/registros/metodo-onda-2/verificacao-dike|verificacao-dike]]"
  - "[[Hermes/registros/metodo-onda-2/verificacao-dike-delta|verificacao-dike-delta]]"
---

# Sumário Executivo — Onda 2 do METODO Kolden (Hermes)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 2, Grupo A, squad-alvo Hermes).
> **Sessão:** dedicada em `C:\Kolden\Hermes\` (G7 satisfeito).
> **Executor:** hermes-chief (Tier-0, 0/3 fan-out por interdependência cross-artefato — regra 7x confirmada).
> **Data:** 2026-07-06.
> **Leitura estimada:** ≤10 min.

---

## §1 — Números-chave

| Métrica | Valor |
|---|---|
| Achados totais registrados | 24 (`achados.jsonl`) |
| Achados P0 (crítico) | 7 (constitution / ASL / uncertainty / aspiration / PRD / squad.yaml / MEMORY.md) |
| Achados P1 (alto) | 7 (G4 reflexo / G5 introspecção / G6 orthogonality / G7 grounding / G12 wrappers / SOUL.md path / AGENTS.md fronteira) |
| Achados P2 (médio) | 5 (skill path / trim MEMORY / ReAct não nomeado / catálogo cita METODO §6 / predictions_scorecard) |
| Achados P3 (baixo) | 2 (.claude/settings.json / roteiro-de-teste) |
| Achados INFO/divergência | 3 (pasta criada / CAOS-CL-002 metadata DRAFT / candidato emenda METODO) |
| **Mudanças propostas no diff** | **15** (10 CREATE + 3 UPDATE + 1 MOVE condicional + 1 TRIM Passo 7) |
| **Score G1-G8 baseline** | **~1/8** (só G8 legítimo N/A) |
| **Score G1-G8 projetado pós-diff** | **8/8** |
| **Delta absoluto projetado** | **+7 pontos** (2º maior delta do Método, atrás só de Salgueiro +8) |
| Fan-out interno | 0/3 (0 subagentes disparados até o Passo 3; interdependência cross-artefato confirmada 7x) |
| Arquivos tocados nesta Onda até agora | 5 (todos em `Hermes/registros/metodo-onda-2/`) |
| Arquivos vendor Nous **PRESERVADOS INTACTOS** | ~150 (agent/, hermes_cli/, providers/, plugins/, Dockerfile, pyproject.toml, README.md, AGENTS.md interno, 19 skills EN, etc.) |

---

## §2 — Achado arquitetural central

**Hermes é o primeiro squad Kolden padronizado que herda estrutura vendorizada (fork Nous Research).** Isso cria uma condição de nascimento singular:
- Ele TEM camada Kolden PT-BR (mais densa que a média): `squads-catalog.yaml` 556 linhas + `camada-2-contrato.md` 97 linhas + `integracao-squads.md` 46 linhas + `hermes-chief.SOUL.md` 86 linhas + skill `roteamento-de-squad`.
- Ele NÃO tem os arquivos-âncora canônicos: `CLAUDE.md`, `PRD`, `constituion`, `squad.yaml`, `MEMORY.md`, `.claude/`.
- Ele TEM `AGENTS.md` interno de 27502 tokens EN (dev guide Nous) que convive sem fronteira declarada com a camada Kolden.

**Conclusão canônica:** a Onda 2 aplica o Método por **INVÓLUCRO**, não por **MUTAÇÃO DE CÓDIGO**. Vendor Nous continua intocado (todo `agent/*.py`, `hermes_cli/`, `providers/`, `plugins/`, 19 skills EN, `Dockerfile`, `pyproject.toml`, `flake.nix`, `README.md`, `LICENSE`). Camada Kolden ganha os 8 arquivos-âncora novos + 3 UPDATEs cirúrgicos + 1 MOVE condicional + 1 TRIM (Passo 7). Fronteira declarada explicitamente em `CLAUDE.md §Fronteira` + `squad.yaml.fronteira_vendor_nous`.

**Padrão canônico a promover:** "squad vendorizado" como caso canônico do METODO — candidato à emenda §5 ou §8 na v1.1 (Passo 9 opcional).

---

## §3 — 5 artefatos padronizados desta Onda

Todos em `C:\Kolden\Hermes\registros\metodo-onda-2\`:

1. **`matriz-de-conformidade.md`** (~285 linhas) — matriz 12 princípios × 8 critérios × 14 modelos × 5 camadas × convenção @// contra o Hermes real, com evidência textual verbatim por célula.
2. **`achados.jsonl`** (24 achados, 1 JSON por linha) — cada achado com id, severidade (P0-P3+INFO), gate afetado, evidência, mudança proposta, procedência, rastro-gates, status.
3. **`diff-cirurgico.md`** (~1200 linhas) — 15 mudanças com CONTEÚDO COMPLETO dos 10 arquivos CREATE + 3 UPDATE em diff-format + 1 MOVE condicional + 1 TRIM Passo 7. Tabela mestra §3 + gate humano §4 + fora do escopo §5 + verificação G1-G8 §6.
4. **`verificacao-dike.md`** (~250 linhas) — 8/8 checkboxes CAOS-CL-002 seções A-G com evidência textual verbatim por checkbox + bloco YAML canônico do veredito. Papel Dike temporariamente pelo hermes-chief com 3 salvaguardas declaradas (Passo 6 vai delta INDEPENDENTE por subagente Explore).
5. **`sumario-executivo.md`** (este arquivo) — resumo ≤10 min + 4 perguntas gate humano + bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_2` do Contrato-mãe.

Padrão canônico dos 5 artefatos por onda **confirmado 7x consecutivas** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 aqui).

---

## §4 — 4 gates humanos (via AskUserQuestion no Passo 4)

Padrão herdado das Sub-ondas 1.1-1.6. Recomendação técnica em negrito.

### Q1 — Aplicação do diff cirúrgico

Como você quer aplicar as 15 mudanças?
- **A (Recomendada):** em bloco por ordem hierárquica G1 → G2 → G3 (autoridade → primários → secundários), com pausas curtas entre grupos para permitir cancelamento.
- **B:** por artefato — Ronan aprova 1 a 1 (maior controle, custo cognitivo alto — 15 aprovações consecutivas).

### Q2 — Skill `roteamento-de-squad` — path

A única skill Kolden PT-BR pura vive hoje em `Hermes/skills/roteamento-de-squad/` (path vendor Nous). METODO §6 pressupõe `.claude/skills/` para skills Kolden locais.
- **A (Recomendada):** MOVER para `Hermes/.claude/skills/roteamento-de-squad/` (canônico).
- **B:** MANTER em `Hermes/skills/` e declarar divergência aceita como "convenção dupla vendor" no CLAUDE.md §Fronteira.

### Q3 — `AGENTS.md` interno + `C:\Kolden\AGENTS.md` raiz

Duas decisões conexas de fronteira/índice:
- **`Hermes/AGENTS.md`** (vendor Nous EN, 27502 tokens) — **A (Recomendada):** APPEND 1 parágrafo no topo declarando fronteira Kolden (preserva o vendor intocado, só adiciona nota). **B:** deixar sem nota (fronteira só vive em CLAUDE.md).
- **`C:\Kolden\AGENTS.md` raiz** (índice de 26 squads) — Passo 8 do rito. **A (Recomendada):** appendar nota canônica "Hermes padronizado pela Onda 2 do METODO v1.0 em 2026-07-06 — ver `Hermes/CLAUDE.md`". **B:** adiar para Onda 26 (costura final).

### Q4 — Schema onda_2 no Contrato-mãe (confirmação)

O Contrato-mãe `m-20260706` usa `resultado_onda_1.sub_ondas["X.Y"]` para as 6 sub-ondas da Onda 1 (herança do sub-contrato `m-20260705`). Para Ondas 2-26 o schema natural é `resultado_ondas_2_a_26.onda_N`. O bloco YAML deste sumário (§7 abaixo) usa `onda_2` — vale confirmar padrão.
- **A (Recomendada):** confirmar `resultado_ondas_2_a_26.onda_2` como schema canônico para Ondas 2-26.
- **B:** usar outro schema (definir).

---

## §5 — Escopo declarado (o que NÃO foi tocado, o que ficou fora)

**Fronteira vendor Nous — INTOCADO:**
- Runtime Python: `agent/` (~100 módulos), `hermes_cli/*.py`, `providers/`, `plugins/`, `acp_adapter/`, `codex_runtime/`.
- Docs vendor: `README.md`, `README.zh-CN.md`, `README.ur-pk.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `MANIFEST.in`.
- Deploy vendor: `Dockerfile`, `docker-compose*.yml`, `flake.nix`, `flake.lock`, `pyproject.toml`, `setup.py`, `constraints-termux.txt`, `uv.lock`.
- 19 skills EN em `skills/` (apple, autonomous-ai-agents, creative, data-science, devops, dogfood, email, github, index-cache, media, mlops, note-taking, productivity, research, smart-home, social-media, software-development, yuanbao).
- Único APPEND cirúrgico em vendor: 1 parágrafo no topo do `AGENTS.md` interno declarando fronteira Kolden (condicional a Q3.A).

**Wrappers proprietários de "runtime bidirecional" (exceção Art. IV pendente Onda 6) — PRESERVADOS:**
- `scripts/whatsapp-bridge/bridge.js` (Baileys)
- `scripts/discord-voice-doctor.py`
- `scripts/hermes-gateway/`

Documentados em `ferramentas.md` §2 (a criar) como categoria constitucional própria. Migração real é Fase 3 residual.

**Fora do squad-alvo — NÃO TOCADO:** `Caos/`, `Liceu/`, `Olimpo/`, `Dike/`, `Prometeu/`, `sobre-a-empresa/` (G1 respeitado). Exceção autorizada condicional: `C:\Kolden\AGENTS.md` raiz (Passo 8 se Q3 = A).

---

## §6 — Verificação G1-G8 auto-aplicada (baseline até Passo 3)

- **G1** (escopo cirúrgico) — ✅ PASS · todos os 5 artefatos gravados em `Hermes/registros/metodo-onda-2/`.
- **G2** (sem commit sem ordem) — ✅ PASS · working tree preservado.
- **G3** (sem push sem ordem) — ✅ PASS.
- **G4** (ritual de encerramento) — ⏳ Passo 7 pós-aplicação.
- **G5** (fan-out ≤3) — ✅ PASS · 0/3 (interdependência cross-artefato confirmada 7x consecutivas).
- **G6** (artefato-em-disco entre passos) — ✅ PASS · 5 artefatos gravados sequencialmente.
- **G7** (sessão dedicada) — ✅ PASS · Onda 2 executada em `C:\Kolden\Hermes\`.
- **G8** (procedência rastreável) — ✅ PASS · grep reverso em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` confirma cada citação.

---

## §7 — Bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_2`

Copiar-colar direto no Contrato-mãe `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml` (§Q4 confirma schema).

```yaml
      resultado_ondas_2_a_26:
        em: "2026-07-06T22:00:00-03:00"
        status: "onda-2-em-andamento-aguardando-gate-humano-passo-4"
        onda_2:
          em: "2026-07-06"
          status: "aguardando-gate-humano-passo-4"
          grupo: "A"
          squad_alvo: "Hermes"
          executor: "hermes-chief (raiz Kolden, sessao dedicada C:\\Kolden\\Hermes\\) — 0/3 fan-out por interdependencia cross-artefato (regra 7x confirmada)"
          artefatos_produzidos:
            - "Hermes/registros/metodo-onda-2/matriz-de-conformidade.md (~285 linhas — matriz 12 principios x 8 criterios x 14 modelos x 5 camadas x convencao @/, evidencia textual verbatim por celula)"
            - "Hermes/registros/metodo-onda-2/achados.jsonl (24 achados em JSONL, severidade P0-P3+INFO, rastro-gates + procedencia por achado)"
            - "Hermes/registros/metodo-onda-2/diff-cirurgico.md (~1200 linhas — 15 mudancas com CONTEUDO COMPLETO dos 10 CREATEs + 3 UPDATEs + 1 MOVE condicional + 1 TRIM Passo 7; tabela mestra + gate humano + fora do escopo + verificacao G1-G8)"
            - "Hermes/registros/metodo-onda-2/verificacao-dike.md (~250 linhas — baseline 8/8 sob 3 salvaguardas; Passo 6 delta INDEPENDENTE por subagente Explore)"
            - "Hermes/registros/metodo-onda-2/sumario-executivo.md (este arquivo — sumario <=10min + 4 perguntas gate humano + bloco YAML)"
          achado_arquitetural_central: |
            Hermes e o primeiro squad Kolden padronizado que herda estrutura vendorizada
            (fork Nous Research). Camada Kolden PT-BR EXISTE e e densa (squads-catalog.yaml
            556 linhas + camada-2-contrato.md 97 linhas + integracao-squads.md 46 linhas
            + hermes-chief.SOUL.md 86 linhas + skill roteamento-de-squad) mas SEM os
            arquivos-ancora canonicos (CLAUDE.md, PRD, constitution, squad.yaml, MEMORY.md,
            .claude/). AGENTS.md interno (27502 tokens EN, dev guide Nous) convive sem
            fronteira declarada com camada Kolden. Ondas 2 aplica o Metodo por INVOLUCRO,
            nao por MUTACAO DE CODIGO. Vendor Nous permanece intocado (~150 arquivos).
          diff_proposto:
            total_mudancas: 15
            breakdown:
              CREATE: 10
              UPDATE: 3
              MOVE_condicional: 1
              TRIM_Passo_7: 1
            ordem_hierarquica: "G1 autoridade -> G2 primarios -> G3 secundarios"
            arquivos_vendor_preservados: "~150 (agent/*.py, hermes_cli/, providers/, plugins/, Dockerfile, pyproject.toml, flake.nix, README*.md, AGENTS.md interno intocado exceto 1 APPEND cirurgico no topo condicional a Q3.A, 19 skills EN em skills/)"
          gate_humano_pendente:
            - Q1: "Aplicar diff em bloco (recomendado) ou por artefato"
            - Q2: "Skill roteamento-de-squad — mover para .claude/skills/ (recomendado) ou manter em skills/ com divergencia declarada"
            - Q3: "AGENTS.md interno vendor Nous — APPEND 1 paragrafo topo (recomendado) ou deixar sem nota; e AGENTS.md raiz Kolden — Passo 8 append nota canonica (recomendado) ou adiar para Onda 26"
            - Q4: "Schema resultado_ondas_2_a_26.onda_N como canonico para Ondas 2-26 (recomendado)"
          score_canonico:
            baseline_G1_G8: "~1/8 hard PASS + 2 PARCIAL (G4 G7) + 1 N/A (G8)"
            projetado_pos_diff: "8/8 VERDE"
            delta_absoluto: "+7 pontos (2o maior delta do Metodo apos Salgueiro +8)"
          divergencias_declaradas:
            - "CAOS-CL-002 cabecalho DRAFT vs METODO canonico (rename fisico pendente do passo 2 do ciclo Hermes-raiz 2026-07-06)"
            - "Verificacao Dike temporariamente pelo hermes-chief com 3 salvaguardas — Passo 6 fara delta INDEPENDENTE"
            - "G5 interpretabilidade continua divergencia herdada do framework Liceu (emenda pendente Onda 6 do METODO)"
            - "Fronteira vendor Nous como caso NOVO — candidato emenda METODO v1.1 (Passo 9 opcional)"
            - "sub_ondas (schema Onda 1 herdado m-20260705) x onda_N (schema natural Ondas 2-26) — confirmar em Q4"
          padroes_novos_a_registrar:
            - "Squad vendorizado como caso canonico do METODO — camada Kolden + fronteira vendor + AGENTS.md interno intocavel com nota-topo declaratoria. Padrao replicavel para todo squad que nasceu como fork"
            - "Camada 2 do sistema tem tier_1 vazio por design (squad.yaml.tier_1.agents=[]) — Hermes coordena 23 SQUADS, nao especialistas internos. Padrao exclusivo Camada 2"
            - "Padronizar squad vendorizado = aplicar Metodo por INVOLUCRO, nao por MUTACAO DE CODIGO. Regra invariante: zero mudanca em codigo Python vendor sem Contrato de Missao proprio (Fase 3 residual)"
            - "5 artefatos padronizados por Onda confirmado 7x consecutivas (regra promovida global no METODO §8)"
            - "Papel Dike temporario pelo executor da onda + 3 salvaguardas (ordem serial + verbatim + divergencia) e aceitavel como transicao ate Dike agent-funcional nascer. Nao e padrao sustentavel"
          verificacao_auto:
            G1: "PASS - todos os 5 artefatos em Hermes/registros/metodo-onda-2/; nenhum outro arquivo tocado ate Passo 3"
            G2: "PASS - working tree preservado"
            G3: "PASS - sem push"
            G4: "PENDENTE Passo 7 (ritual encerramento em agent-memory/hermes.md com backup -8 e trim 150 linhas)"
            G5: "PASS - 0/3 fan-out (regra 7x confirmada)"
            G6: "PASS - 5 artefatos em disco entre passos"
            G7: "PASS - sessao dedicada em C:\\Kolden\\Hermes\\"
            G8: "PASS - procedencia grep reverso em Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md bate 1:1"
          handoff_para_passo_5:
            escopo: "Aplicar diff aprovado pelo gate humano em ordem hierarquica G1 (CLAUDE.md + PRD + squad.yaml + constitution.md + MEMORY.md) -> G2 (ferramentas.md + settings.json + reflexos/interrupt.sh + agents/hermes-chief.md) -> G3 (roteiro-de-teste.md + UPDATE AGENTS.md + UPDATE SOUL.md + UPDATE squads-catalog.yaml + MOVE skill)"
            excecoes_G1_autorizadas: "C:\\Kolden\\AGENTS.md raiz (Passo 8) condicional a Q3.A"
          handoff_para_passo_6:
            escopo: "Dike delta INDEPENDENTE por subagente Explore isolado apos aplicacao do diff; verificacao contra CAOS-CL-002 com 3 salvaguardas (ordem serial pos-aplicacao + evidencia verbatim + divergencia)"
          handoff_para_passo_7:
            escopo: "Ritual de encerramento em Hermes/agent-memory/hermes.md — backup em hermes-2026-07-06-8.md + trim <=150 linhas + APPEND bloco de padroes Onda 2"
          handoff_para_passo_8:
            escopo: "Atualizar C:\\Kolden\\AGENTS.md com nota canonica de Hermes padronizado (condicional a Q3.A)"
          handoff_para_passo_9:
            escopo: "Opcional — atualizar METODO-KOLDEN.md v1.0 -> v1.1 acrescentando caso canonico 'squad vendorizado' em §5 ou §8 (candidato via gate humano Passo 9)"
          handoff_para_onda_3:
            recomendacao: "Prometeu (Grupo A) — outro meta-squad; framework AIOX; complementa Grupo A. Aletiheia como alternativa (Grupo C)"
            onde_registra: "C:\\Kolden\\Prometeu\\registros\\metodo-onda-3\\"
            sessao: "dedicada em C:\\Kolden\\Prometeu\\ (G7 - nunca duas Ondas na mesma sub-sessao)"
```

---

## §8 — Próxima Onda recomendada

**Onda 3 = Prometeu (Grupo A, meta-squad).** Razões:
1. Grupo A do METODO §8 lista Hermes + Prometeu como meta-squads. Fechar Grupo A é ordem hierárquica.
2. Prometeu é framework de engenharia (AIOX), complemento natural do runtime Hermes.
3. Prometeu tem estrutura própria (`.aiox-core/` — não `agents/`), como o `squads-catalog.yaml` já nota. Caso à parte que herda aprendizado desta Onda 2 (squad vendorizado como caso canônico).

**Alternativa técnica:** **Aletheia** (Grupo C, discovery + validação) se Prometeu tiver escopo residual de refactor grande. Aletheia foi um dos squads mais bem estruturados na auditoria de 2026-06-28 (referência: `_conhecimento-institucional/auditoria/2026-06-28-vistoria-v2/`).

---

## §9 — Estado final desta Onda (pré-gate)

- **Trabalho aplicado:** 0 (nenhum arquivo tocado fora de `Hermes/registros/metodo-onda-2/`).
- **Working tree:** limpo (exceto os 5 artefatos desta onda + tarefas do sistema pré-existentes).
- **Commit:** nenhum (G2 respeitado).
- **Fan-out:** 0/3 (regra 7x confirmada).
- **Passos concluídos:** 1 (leitura das 3 fontes canônicas) + 2 (diagnóstico read-only) + 3 (5 artefatos escritos).
- **Passos pendentes:** 4 (gate humano — próximo) + 5 (aplicação do diff) + 6 (Dike delta INDEPENDENTE) + 7 (ritual encerramento) + 8 (AGENTS.md raiz) + 9 (METODO emenda opcional).

---

*Sumário executivo Onda 2 produzido por `hermes-chief` (raiz Kolden) em 2026-07-06 no Contrato-mãe `m-20260706-metodo-kolden`. 5 artefatos canônicos gravados. Trabalho não aplicado até gate humano (Passo 4 via AskUserQuestion). Sem commit até ordem explícita.*
