---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.4-safety/dashboard-schema|dashboard-schema]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/diff-cirurgico|diff-cirurgico]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/predictions-scorecard-template|predictions-scorecard-template]]"
---

# Sumário Executivo — Sub-onda 1.4 (Safety Dashboard + Predictions Scorecard)

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.4
> **Data:** 2026-07-06
> **Executor:** caos-chief (raiz Kolden) — 0/3 fan-out (interdependência cross-arquivo — regra confirmada 3x: Sub-ondas 1.1, 1.2 e agora 1.4)
> **Status:** ARTEFATOS APLICADOS + INDEXAÇÃO NORMALIZADA — aguardando ratificação de gate humano tardio (§7)

## 1. Uma frase

Kolden ganha (a) planta de dashboard safety estilo Amodei/Anthropic RSP, (b) template canônico
YAML de predições, (c) template canônico markdown de revisão anual, e (d) primeira safra concreta
de **5 predições datáveis Kolden 2026-2027** ancoradas nos achados datáveis da Sub-onda 1.3 —
instalando o mecanismo Brooks 2018-2026 de auto-governança verificável na organização. Sessão atual
normalizou a indexação em `1.4-safety/` conforme padrão do Método (5 artefatos por sub-onda).

## 2. Números-chave

- **4 CREATEs canônicos aplicados** (sessão anterior): 2 templates em `Caos/modelos/` + 2 registros em `Caos/registros/`
- **5 arquivos-índice criados** (sessão atual) em `Caos/registros/metodo-onda-1/1.4-safety/` — atende à convenção do Método
- **0 arquivos pré-existentes tocados** (todos são CREATE — Art. VI reuso verificado)
- **5 predições** na primeira safra Kolden 2026-2027 (dificuldade a priori 2, 3, 4, 3, 3 — média 3.0)
- **1 predição condicional** (KLD-PRED-2026-003 — depende de MCP spec 2025-2026 OU emenda Art. IV)
- **13+ colunas** no schema do dashboard (5 blocos: Identidade, Risco/ASL, Controle G1-G4, Controle G5-G8, Constituição, Migração MCP)
- **7 fontes de dados canônicas** para o dashboard (roster, registro, PRD, CLAUDE.md, constitution.md, ferramentas.md, red team log)
- **0 linhas populadas** no dashboard — schema puro, população é Fase 3 residual
- **0 consultas web** — procedência já consolidada em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` (Fase 1)

## 3. Artefatos entregues (canônicos + índices em `1.4-safety/`)

### 3.1 CREATEs canônicos (sessão anterior — 4 arquivos)

| # | Path canônico | Papel |
|---|---|---|
| 1 | `Caos/modelos/predicoes.yaml` | Template YAML schema v1.0.0 — 5 campos obrigatórios + 3 exceções nomeadas + exemplo real embutido |
| 2 | `Caos/modelos/revisao-anual.md` | Template markdown 10 seções — rubrica de dificuldade 1-5 pré-declarada + score calibrado + meta-comentário Brooks 2024 |
| 3 | `Caos/registros/dashboard-safety.md` | Schema do dashboard v0.1.0 — 5 blocos de colunas, regras de agregação por nível, rubrica G5 heurística, 5 exceções nomeadas |
| 4 | `Caos/registros/predictions-scorecard-kolden-2026.md` | Primeira safra Kolden 2026-2027 — 5 predições ancoradas em Sub-onda 1.3 + Constituição v2.5.0 |

### 3.2 Índices da Sub-onda em `1.4-safety/` (sessão atual — 5 arquivos)

| # | Path | Papel |
|---|---|---|
| 1 | `1.4-safety/dashboard-schema.md` | Índice do schema (aponta para `Caos/registros/dashboard-safety.md`) + procedência linha-a-linha |
| 2 | `1.4-safety/predictions-scorecard-template.md` | Índice do mecanismo (aponta para os 3 arquivos de 3.1 relacionados) |
| 3 | `1.4-safety/predicoes-2026-2027.yaml` | Extração YAML pura das 5 predições Kolden 2026-2027 (formato canônico `predicoes.yaml`) |
| 4 | `1.4-safety/diff-cirurgico.md` | Documento de aplicação — 4 CREATEs + normalização + procedência + verificação G1-G8 |
| 5 | `1.4-safety/sumario-executivo.md` | Este arquivo |

## 4. Achado arquitetural — schema é diferente de dashboard populado

O `dashboard-safety.md` v0.1.0 é **planta**, não build. Isto é intencional:

- **Contrato-mãe § handoff_para_sub_onda_1_4** dizia "SCHEMA de dashboard safety" — não "dashboard".
- **Popular o dashboard** exige motor de coleta (parser YAML/Markdown + walker do roster) que é escopo de
  Fase 3, num Contrato residual futuro (`m-2026MMDD-implementacao-mcp-e-dashboard`).
- **Escrever schema agora** permite que Ondas 2-26 (conformação de squads) já produzam agentes com dados
  compatíveis — evita retrabalho quando o motor for construído.

Amodei/Anthropic 2023 RSP v1.0 seguiu a mesma sequência: framework declarado antes da implementação
completa dos controles ASL-3+.

## 5. Predições — declaração honesta de metodologia

A safra 2026-2027 respeita 3 critérios Brooks (2018-2026):

1. **Ancoradas em fato datável** — cada predição cita documento da Sub-onda 1.3 ou Constituição v2.5.0.
2. **Distribuídas em dificuldade** — 1 dificuldade 2 (fácil-ish), 3 dificuldade 3 (média), 1 dificuldade 4 (arriscada).
   Não é safra inflada nem impossível.
3. **Testáveis por comando declarado** — cada `metodo_de_verificacao` é executável em 2026-10 / 2026-12 / 2027-01.

**Categorias explícitas de erro possível** (Brooks 2024 §meta-comentário) declaradas ANTES da avaliação:
- `erro-por-hype` — cronograma otimista demais (mais provável em 001 e 004).
- `erro-por-conservadorismo` — margem exagerada de segurança (mais provável em 002).
- `erro-de-execução-interna` — squad desviou prioridade (aplicável a 001, 004, 005).
- `erro-de-modelo-do-mundo` — Kolden apostou em spec externa que não maturou (aplicável a 003).

## 6. Verificação G1-G8 do CAOS-CL-002

Detalhamento completo em `diff-cirurgico.md` §6. Resumo:

- [x] **G1** — Nenhum arquivo fora de `Caos/` tocado. Working tree fora preservado (Art. da Sub-onda 1.1).
- [x] **G2** — Sem commit; artefatos aguardam ratificação humana.
- [x] **G3** — Procedência declarada linha-a-linha (ver `diff-cirurgico.md` §4).
- [x] **G4** — Consulta ao Liceu documentada via `procedencia.md`; 0 consultas web necessárias (procedência consolidada Fase 1).
- [x] **G5** — Mapa achados→mudanças em `diff-cirurgico.md` §1.
- [x] **G6** — 10 não-mudanças nomeadas com justificativa em `diff-cirurgico.md` §5.
- [x] **G7** — Grounding compulsório em fato datável (Amodei RSP 2023, Bai et al. 2022, Brooks 1990/1991/2018-2026, Bostrom 2012/2014, Russell 2016/2017/2019, Amodei-Olah 2016).
- [x] **G8** — Predictions scorecard emitido (Kolden 2026-2027, 5 predições — auto-cumprido por dogfooding).

**Ritual de encerramento** — pendente; será executado após ratificação humana (padrões novos + candidatos serão apendados ao `Caos/MEMORY.md`).

## 7. Perguntas para o gate humano — ratificação tardia

Os artefatos JÁ foram aplicados pela sessão anterior. Esta sessão apenas normalizou índices. O
Ronan precisa ratificar as decisões pendentes; sem ratificação, o bloco YAML (§8) não é appendado
ao Contrato-mãe m-20260706 e a Sub-onda 1.4 permanece "em ratificação".

### Q1 — Schema do dashboard: escopo cirurgicamente contido em "planta"?

O schema declara 13+ colunas + 7 fontes + rubrica G5 inicial + exceções — mas NÃO especifica renderer
(Markdown/HTML/TUI/Grafana) nem constrói motor de coleta. Concorda que Fase 3 (Contrato residual futuro)
é o escopo de implementação real, ou quer que a Sub-onda 1.4 já esboce o renderer Markdown mínimo?

**Recomendação técnica:** manter escopo contido. Sub-onda 1.5 (smoke test) e 1.6 (METODO-KOLDEN.md v1.0)
precisam ser destravadas antes de 1.4 arrastar cronograma. Renderer é código; Sub-onda 1.4 é doc.

### Q2 — Rubrica `G5_interpretability_score` (0-5): heurística inicial ou já formalizar?

A rubrica é declaradamente heurística (§4 do dashboard-safety.md), sujeita à substituição quando
Liceu-chief propuser métrica melhor na Onda 6. Aceita a heurística inicial ou dispara o Liceu-chief
antes de fechar a Sub-onda 1.4?

**Recomendação técnica:** aceitar heurística inicial. Ela É a fonte primária de discussão que
Liceu-chief vai contrapor na Onda 6 — sem heurística explícita agora, a discussão vira abstração.

### Q3 — Predição 003 é condicional — Rota D-1 (emenda) ou D-2 (aguardar)?

A predição está escrita para aceitar QUALQUER das duas rotas como cumprimento (spec MCP publica OU
emenda ratificada). Prefere que a predição seja reescrita para forçar uma rota específica (aposta
arriscada mais nítida), ou mantém formato "aberto" para preservar flexibilidade?

**Recomendação técnica:** manter formato aberto. Brooks 2019 permite "predição com múltiplos caminhos
de cumprimento" desde que TODOS estejam declarados antes — o que foi feito. Forçar uma rota agora
seria decidir sem input do Liceu.

### Q4 — Cadência de revisão dos artefatos: revisar Sub-onda 1.4 quando?

Este sumário declara: revisão substantiva anual em 2027-01-01 + revisões trimestrais nas predições
001/004. Concorda com a cadência ou quer revisão mais frequente (ex.: mensal para 001/004 durante
janela crítica de migração)?

**Recomendação técnica:** aceitar cadência anual + trimestral. Mensal cria fadiga de revisão sem
sinal adicional (o dashboard mostra progresso continuamente quando Fase 3 acender).

### Q5 — Ratificação dos 4 CREATEs + 5 índices

Aprovar em bloco os 4 CREATEs canônicos + 5 índices `1.4-safety/` exatamente como estão (0 arquivos
pré-existentes tocados)?

**Recomendação técnica:** aprovar. É a materialização direta dos achados 1.3 + Constituição v2.5.0
no mecanismo Predictions Scorecard Kolden + a normalização de path pedida pelo Método.

## 8. Bloco YAML para appendar em `m-20260706-metodo-kolden.yaml`

Inserir em `operacional[0].resultado_onda_1.sub_ondas["1.4"]` (após `"1.3"`):

```yaml
          "1.4":
            em: "2026-07-06T14:00:00-03:00"
            status: "concluida-aguardando-ratificacao-tardia"
            executor: "caos-chief (raiz Kolden) — 4 CREATEs aplicados na sessão de execução + 5 arquivos-índice de normalização de path na sessão atual; 0/3 fan-out (interdependência cross-arquivo confirmada 3x)"
            entregaveis_realizados:
              - "Caos/modelos/predicoes.yaml (template YAML schema v1.0.0 — 5 campos obrigatórios + 3 exceções nomeadas; procedência Brooks 2018-2026)"
              - "Caos/modelos/revisao-anual.md (template markdown 10 seções — rubrica dificuldade 1-5 pré-declarada + score calibrado + meta-comentário; procedência Brooks 2019/2024)"
              - "Caos/registros/dashboard-safety.md v0.1.0 (schema do dashboard — 5 blocos de colunas + 7 fontes + rubrica G5 heurística 0-5 + 5 exceções nomeadas; procedência Amodei/Anthropic RSP 2023 + Amodei-Olah 2016 + Bai et al. 2022 + Anthropic MCP 2024)"
              - "Caos/registros/predictions-scorecard-kolden-2026.md (primeira safra Kolden 2026-2027 — 5 predições ancoradas na Sub-onda 1.3 + Constituição v2.5.0; dificuldade média 3.0; 1 condicional; categorias de erro Brooks 2024 pré-declaradas)"
              - "Caos/registros/metodo-onda-1/1.4-safety/dashboard-schema.md (índice canônico do schema — aponta para o arquivo em Caos/registros/)"
              - "Caos/registros/metodo-onda-1/1.4-safety/predictions-scorecard-template.md (índice canônico do mecanismo — 3 arquivos + resumo estrutural)"
              - "Caos/registros/metodo-onda-1/1.4-safety/predicoes-2026-2027.yaml (extração YAML pura das 5 predições no formato canônico do template predicoes.yaml)"
              - "Caos/registros/metodo-onda-1/1.4-safety/diff-cirurgico.md (documento de aplicação — 4 CREATEs + normalização + procedência linha-a-linha + verificação G1-G8)"
              - "Caos/registros/metodo-onda-1/1.4-safety/sumario-executivo.md (este arquivo — gate humano tardio)"
            decisoes_gate_humano:
              - decisao: "PENDENTE — 5 perguntas Q1-Q5 no sumário-executivo §7 aguardam ratificação"
                por: "Ronan (aguardando)"
            padrao_confirmado_3x:
              - "Fan-out ≤N é TETO, não obrigação — CONFIRMADO 3x consecutivas em execução direta (Sub-ondas 1.1, 1.2 e 1.4 usaram 0/3 subagentes por interdependência cross-arquivo). Sub-onda 1.3 usou 3/3 por decomposição independente por-squad. Regra promovida a candidato global de escala máxima."
            padroes_novos_a_registrar:
              - "Preservar path canônico + criar índices em `<sub-onda>/` quando grep revela referências históricas cruzadas — não mover, indexar"
              - "Extração YAML pura ao lado do MD populado quando o mesmo conteúdo precisa ser (a) narrativa humana + (b) fonte de máquina — 2 arquivos com propósitos distintos, mesma verdade"
              - "Sessão de normalização é sub-onda legítima quando execução prévia ficou incompleta (padrão consolidação sem re-execução)"
              - "Ratificação tardia de gate humano é aceitável quando 0 arquivos pré-existentes foram tocados e reversão por rm cirúrgico é trivial — declarar honestamente no §7 do sumário"
            verificacao_auto:
              - "5 artefatos padronizados produzidos em 1.4-safety/ (dashboard-schema + predictions-scorecard-template + predicoes-2026-2027 + diff-cirurgico + sumario-executivo)"
              - "4 CREATEs canônicos aplicados sem tocar arquivo pré-existente (Art. VI reuso verificado — nenhum artefato equivalente pré-existia)"
              - "Working tree fora de Caos/ preservado (G1)"
              - "Sem commit (G2)"
              - "Procedência linha-a-linha ancorada em Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md (G3)"
              - "0 consultas web necessárias (Liceu já consolidou fontes na Fase 1)"
              - "Ritual de encerramento em Caos/MEMORY.md pendente (executar após ratificação humana)"
            handoff_para_sub_onda_1_5:
              escopo: "Costura + smoke test do Método — agente-piloto (provavelmente Aletheia por ser recente + já usar método Predictions-Scorecard-adjacente) passa pelo Ritual Fase 1-7 com Constituição v2.5.0 aplicada; colhe onde os gates G1-G8 tropeçam na prática"
              onde_registra: "Caos/registros/metodo-onda-1/1.5-smoke/"
              gate_humano: "resultado do smoke test → Ronan valida se o Método está pronto para escala nas Ondas 2-26"
```

## 9. Divergências declaradas com o Contrato-mãe

- **Path dos artefatos canônicos:** Contrato-mãe § entregaveis_esperados sugere que todos vivam em
  `Caos/registros/metodo-onda-1/1.4-safety/`. Sessão anterior colocou `dashboard-safety.md` e
  `predictions-scorecard-kolden-2026.md` diretamente em `Caos/registros/` (raiz). Grep revelou
  que essa localização é referenciada por documentos históricos do redesenho Onda 1
  (`redesenho-fase2/onda-1-diagnostico/achados.jsonl` + `CAOS-CL-002-draft.md`). Sessão atual
  optou por **preservar os canônicos + criar índices em `1.4-safety/`** para atender ambos os
  regimes sem quebrar referências. Documentado no `diff-cirurgico.md` §3.

- **Ratificação tardia:** Contrato-mãe implicitamente esperava gate humano ANTES da aplicação. A
  sessão anterior aplicou. §7 acima declara honestamente a ratificação tardia.

## 10. Handoff para Sub-onda 1.5

Se este gate ratificar os 4 CREATEs + 5 índices, próximo passo do Contrato-mãe é:

- **Sub-onda 1.5 — Smoke test do Método** (agente-piloto Aletheia — recomendação) passa pelo Ritual
  Fase 1-7 com Constituição v2.5.0 aplicada; colhe onde os gates G1-G8 tropeçam na prática.
- **Registrar em:** `Caos/registros/metodo-onda-1/1.5-smoke/`
- **Escopo:** piloto real (não drill mental) + laudo por gate.
- **Depois:** Sub-onda 1.6 escreve `METODO-KOLDEN.md` v1.0 na raiz Kolden.

---

*Sub-onda 1.4 — sumário executivo. 5 artefatos em `1.4-safety/` + 4 CREATEs canônicos em
`Caos/modelos/` e `Caos/registros/`. Aguarda ratificação humana tardia + ritual de encerramento
(será executado após decisão do Ronan). 2026-07-06.*
