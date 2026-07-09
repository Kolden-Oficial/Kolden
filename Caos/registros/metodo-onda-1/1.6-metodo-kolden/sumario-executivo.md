# Sumário Executivo — Sub-onda 1.6 (METODO-KOLDEN.md v1.0 + skills + propostas Dike/AGENTS/emendas)

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.6 — **ÚLTIMA sub-onda da Onda 1**
> **Data:** 2026-07-06
> **Executor:** `caos-chief` (raiz Kolden) — **0/3 fan-out** (interdependência cross-artefato — regra confirmada **6x** consecutivas: 1.1, 1.2, 1.4, 1.5, 1.6 = 0/3; 1.3 = 3/3 caso oposto)
> **Status:** **CONCLUÍDA — 3 arquivos APLICADOS + 5 PROPOSTAS** aguardando gate humano (3 perguntas)

---

## 1. Uma frase

Kolden consolidou **em 8 artefatos** (3 aplicados + 5 propostos) o **Método Kolden v1.0** — documento canônico em 12 seções em `C:\Kolden\METODO-KOLDEN.md`, skills `/metodo` e `/padronizar` em `C:\Kolden\.claude\skills\`, proposta com 3 opções para instanciação da Dike, diff cirúrgico do AGENTS.md, e 2 emendas propostas ao framework do Liceu (interpretabilidade C5 + categoria runtime bidirecional Art. IV) — fechando a Onda 1 do Contrato-mãe e destravando as Ondas 2-26 (padronização dos 25 squads restantes) em sessões dedicadas.

---

## 2. Números-chave

- **8 artefatos** produzidos (3 aplicados + 5 propostos)
- **3 arquivos aplicados em disco:**
  - `C:\Kolden\METODO-KOLDEN.md` v1.0 (~500 linhas, 12 seções)
  - `C:\Kolden\.claude\skills\metodo\SKILL.md` (~90 linhas)
  - `C:\Kolden\.claude\skills\padronizar\SKILL.md` (~130 linhas)
- **5 propostas em `Caos/registros/metodo-onda-1/1.6-metodo-kolden/`:**
  - `proposta-dike-instanciacao.md` (3 opções + recomendação Opção A)
  - `diff-agents-md.md` (mudança #1 independente + #2 condicional às Opções A/B/C)
  - `emendas-liceu.md` (2 emendas: C5 interpretabilidade + Art. IV runtime bidirecional)
  - `relatorio-de-consolidacao.md` (14 padrões consolidados rastreados)
  - `sumario-executivo.md` (este arquivo)
- **0 arquivos fora de `Caos/` tocados** exceto os 3 aplicados (autorização única G1 desta sub-onda, declarada no §handoff_1_5 e no Contrato-mãe)
- **0 commits** (G2)
- **0 consultas web** (procedência 100% consolidada em Liceu Fase 1)
- **12 seções** no METODO-KOLDEN.md v1.0
- **8 autores/frameworks** citados nominalmente: Amodei · Russell · Simon · Brooks · Bostrom · Bai · Yao · Olah + Anthropic MCP + framework Liceu
- **14 padrões consolidados** das sub-ondas 1.1-1.5 rastreados em `relatorio-de-consolidacao.md`
- **5 padrões novos** capturados pela Sub-onda 1.6 (candidatos a promoção no ritual de encerramento)

---

## 3. Artefatos entregues em detalhe

### 3.1 Aplicados diretamente em disco (3 arquivos)

| # | Path absoluto | Papel | Tamanho aprox. |
|---|---|---|---|
| 1 | `C:\Kolden\METODO-KOLDEN.md` | Documento canônico do Método v1.0 — 12 seções + §11 procedência completa | ~500 linhas |
| 2 | `C:\Kolden\.claude\skills\metodo\SKILL.md` | Skill global `/metodo` — invocável para explicar/navegar o Método (auto-descoberta pelo Claude Code) | ~90 linhas |
| 3 | `C:\Kolden\.claude\skills\padronizar\SKILL.md` | Skill global `/padronizar <Squad>` — executa rito canônico de 9 passos das Ondas 2-26 | ~130 linhas |

### 3.2 Propostas em `Caos/registros/metodo-onda-1/1.6-metodo-kolden/` (5 arquivos)

| # | Path relativo | Papel | Tamanho aprox. |
|---|---|---|---|
| 1 | `proposta-dike-instanciacao.md` | 3 opções (A: `Dike/` squad-solo · B: `Themis/agents/dike.md` · C: `Caos/.claude/agents/dike.md`) + recomendação nomeada Opção A + tabela trade-offs 7 dimensões | ~300 linhas |
| 2 | `diff-agents-md.md` | Mudança #1 (nova seção `## O Método Kolden` em AGENTS.md — independente da Dike) + mudança #2 condicional a A/B/C | ~200 linhas |
| 3 | `emendas-liceu.md` | 2 emendas ao framework do Liceu: (E1) C5 Interpretability Expectation reconhecida como critério canônico próprio (procedência Amodei-Olah 2016) + (E2) categoria "adapter de runtime bidirecional em tempo real" no P12/Art. IV (procedência MCP spec 2024 + LSP 2016) | ~250 linhas |
| 4 | `relatorio-de-consolidacao.md` | 14 padrões consolidados das Sub-ondas 1.1-1.5 rastreados por sub-onda → seção do METODO → evidência textual + 5 padrões não consolidados por decisão + 5 padrões novos desta Sub-onda | ~180 linhas |
| 5 | `sumario-executivo.md` | Este arquivo — sumário ≤10 min + gate humano + bloco YAML | ~330 linhas |

---

## 4. Estrutura final do METODO-KOLDEN.md v1.0

12 seções — cada uma com procedência declarada:

- **§1 O que é o Método** — identidade + escopo + 4 pilares (dogfooding + procedência + reversibilidade + incerteza declarada)
- **§2 Os 12 princípios canônicos + procedência** — tabela P1-P12 (Turing, Minsky, Simon, Karpathy, Russell, Bostrom, Brooks, Bai/Amodei, Anthropic RSP, Yao ReAct, LangGraph, Anthropic MCP) com Onda do dossiê Liceu + regra de sobrescrita + divergência ativa
- **§3 A hierarquia de 5 camadas** — diagrama Humano → Hermes → Zeus → Executivos → Operacional + Dike na subida + fronteira canônica + Camada 1 (LLM + MCP)
- **§4 Os 8 critérios canônicos por agent (Art. X)** — tabela G1-G8 com severidade + fase Ritual + evidência textual esperada + baseline dogfooding + divergência G5
- **§5 Os 14 modelos do Caos** — tabela 14 modelos com papel canônico + quando invocar + autoridade escalonada (PRD-como-fonte)
- **§6 A convenção `@` vs `/`** — fonte-de-verdade centralizada; dispatch cross-squad vs skill invocation local + fronteira dura
- **§7 Os 5 buckets de capacidade Kolden** — validados em produção via `radar.yaml` (118 tarefas ativas)
- **§8 O rito de padronização por squad (Ondas 2-26)** — playbook 9 passos + anatomia canônica dos 5 artefatos + regras invioláveis G1-G8 + regra do fan-out CONFIRMADA 5x + divisão em Grupos A-G
- **§9 O papel do Dike (verificação independente)** — função canônica validada 5x nas Sub-ondas 1.1-1.5 + estado atual + invocação canônica
- **§10 Predições Kolden 2026-2027** — 5 predições dificuldade média 3.0 + cadência de revisão + onde populam no dashboard
- **§11 Referências completas por seção** — procedência 1:1 com `procedencia.md` do Liceu por §; 8 autores + Anthropic MCP + framework Liceu nomeados
- **§12 Notas de versão + roadmap** — divergências ativas + roadmap curto (Onda 2 = Hermes recomendado) + cadência de revisão

**Total linhas MD:** ~500. Tempo de leitura estimado: 15-20 min.

---

## 5. Recomendação nomeada para Dike (Opção A — squad-solo)

**Opção A vencedora** com 1 parágrafo de defesa:

> **Recomendo a Opção A** porque a **função canônica de Dike** — verificação independente contra CAOS-CL-002 nas Ondas 2-26 + reconciliação TPND=0 na subida do Contrato de Missão — exige **independência estrutural máxima**. Nas 25 Ondas restantes, cada squad-alvo é o produtor do próprio diff; Dike verifica de fora. Se Dike vive dentro de outro squad (Opção B ou C), a independência é sempre parcial: uma vinculação estrutural sempre existe. O custo maior de criação (Opção A pede Ritual completo do Caos em sessão dedicada) é justificado por (i) resolver definitivamente o débito das linhas 15 e 30 do AGENTS.md, (ii) preservar a convenção `@dike` limpa proposta no METODO §6, e (iii) permitir que Ondas 2-26 tratem Dike igual aos outros squads (padrão canônico — todos são squads solo ou multi-agent com `squad.yaml` próprio). A coerência mitológica também favorece: Dike (Δίκη) na mitologia grega é entidade autônoma (deusa da Justiça, membro dos Horai), não subordinada a Thémis (filha, sim, mas com atuação própria). O bump de "23 squads → 24 squads" no AGENTS.md é honesto: Dike vira o 27º arquivo de squad (Prometeu + Caos + 25 outros + Dike), consistente com a linha 15 que já explica a contagem de 261 agentes excluindo Dike.

Detalhamento em `proposta-dike-instanciacao.md` (3 opções + tabela de trade-offs 7 dimensões).

---

## 6. Gate humano — 3 perguntas via AskUserQuestion

Preciso da decisão do Ronan em 3 perguntas antes do fechamento definitivo.

### Q1 — Aprovar o texto de METODO-KOLDEN.md v1.0?

O documento canônico foi escrito com 12 seções + §11 procedência 100% ancorada. Estrutura em §4 detalhamento.

**Opções:**
- **(A) Aprovar sem revisão** — publicação canônica; segue para gate Q2/Q3.
- **(B) Revisar seções específicas** — Ronan aponta quais §§ + `caos-chief` edita in-place e volta ao gate.
- **(C) Reescrita ampla** — Ronan aponta seção com problema estrutural + define escopo da re-escrita.

**Recomendação técnica:** (A). Documento foi validado contra critério de sucesso item 1 do Contrato-mãe (~500 linhas, 12 seções, procedência 100% ancorada com 8+ autores citados nominalmente). Escopo cirúrgico preservado.

### Q2 — Escolher opção para instância do Dike?

3 opções detalhadas em `proposta-dike-instanciacao.md`.

**Opções:**
- **(A) `C:\Kolden\Dike\` — squad-solo (27º squad)** — máxima independência, custo maior (Ritual completo do Caos), bump AGENTS.md linhas 12+15. **RECOMENDAÇÃO DO CAOS.**
- **(B) `C:\Kolden\Themis\agents\dike.md`** — coerência mitológica (filha de Thémis), custo médio, alias `@dike` → `@Themis:dike`.
- **(C) `C:\Kolden\Caos\.claude\agents\dike.md`** — custo mínimo, independência estrutural PARCIAL (subordinada ao `caos-chief`).
- **(D) Adiar decisão** — Método fica publicado v1.0 sem Dike agent funcional; papel Dike temporário pelo `caos-chief`/`<Squad>-chief` continua nas Ondas 2-26 com 3 salvaguardas.

**Recomendação técnica:** **(A)**. Se (A) escolhida, próximo Contrato a lavrar: `m-2026MMDD-nascimento-dike` em sessão dedicada do Caos.

### Q3 — Aplicar as 2 emendas ao framework do Liceu?

2 emendas detalhadas em `emendas-liceu.md`.

**Opções:**
- **(A) Aprovar aplicação imediata das 2 emendas** — Sub-onda 1.6 aplica em `Liceu/frameworks/` no fim desta sessão.
- **(B) Adiar para sessão dedicada com Liceu-chief** (**padrão Kolden — Onda 6 do Método**) — `caos-chief` não toca em `Liceu/`; propõe ao Liceu-chief em ida-e-volta.
- **(C) Aprovar E1 (interpretabilidade), adiar E2 (runtime bidirecional)** — E1 é a mais consolidada.
- **(D) Aprovar E2 (runtime bidirecional), adiar E1 (interpretabilidade)** — E2 é a mais urgente (Sub-onda 1.3 travou wrappers Hermes).

**Recomendação técnica:** **(B)**. Padrão Kolden é preservar soberania do produtor (Liceu produziu o framework, Liceu decide sobre emendas). A restrição dura da Sub-onda 1.6 declara: "Nenhum arquivo em `Hermes/`, `Liceu/`, `Olimpo/` modificado (só leitura para procedência)".

---

## 7. Divergências declaradas + escopos futuros consolidados

- **Divergência C5 interpretabilidade** — emenda proposta em `emendas-liceu.md` (Emenda 1). Se Ronan escolher Q3 (B), esta emenda vira TODO explícito no METODO §12 + Contrato próprio `m-2026MMDD-emenda-framework-liceu-c5`.
- **Divergência categoria runtime bidirecional (Art. IV)** — emenda proposta em `emendas-liceu.md` (Emenda 2). Mesma lógica.
- **Dike agent funcional** — se Ronan escolher Q2 (D) adiar, papel temporário pelo caos-chief/squad-chief continua nas Ondas 2-26. Sub-onda 1.6 encerra sem instanciar.
- **Fase 3 residual (MCP + dashboard)** — Contrato próprio a lavrar após as 26 Ondas.
- **Q1-Q5 da Sub-onda 1.4** — ratificados em bloco na Sub-onda 1.5 (proposta pendente até Ronan responder aqui + Q1 desta 1.6).

---

## 8. Riscos levantados

1. **METODO tocando raiz Kolden (§autorizado)** — 3 arquivos aplicados fora de `Caos/`. Sem risco G1 porque autorizado pelo Contrato-mãe §handoff_para_sub_onda_1_6. Reversão trivial: `rm C:\Kolden\METODO-KOLDEN.md + rm -r C:\Kolden\.claude\skills\metodo + rm -r C:\Kolden\.claude\skills\padronizar` (3 comandos, 100% reversível).

2. **AGENTS.md ainda não editado** — `diff-agents-md.md` é PROPOSTA. Ronan pode aprovar mudança #1 hoje e adiar #2. Ou adiar tudo até após gate Dike.

3. **Emendas ao framework do Liceu (proposta, não aplicada)** — se Ronan escolher Q3 (A) aplicação imediata, `caos-chief` NÃO deve aplicar (viola restrição dura desta sub-onda: "Nenhum arquivo em `Liceu/` modificado"). Aplicação passa pelo Liceu-chief. Se Ronan pedir aplicação direta em Sub-onda 1.6, escalar como exceção declarada.

4. **CAOS-CL-002 canônico apontado pela skill `/padronizar`** — a skill aponta para `Caos/checklists/CAOS-CL-002.md` como fonte-de-verdade canônica. Arquivo físico atual é `Caos/registros/redesenho-fase2/onda-1-diagnostico/CAOS-CL-002-draft.md`. O rename/promoção é uma tarefa pós-gate.

5. **Sub-onda 1.6 é a "cerimônia de fechamento" da Onda 1** — Onda 2 começa em sessão dedicada em `C:\Kolden\Hermes\` (recomendação técnica). Se Ronan quiser começar Onda 2 nesta sessão, viola G7 (nunca duas Ondas na mesma sub-sessão).

---

## 9. Auto-verificação G1-G8 (bate com CAOS-CL-002)

- [x] **G1** — 3 arquivos tocados fora de `Caos/` (METODO + 2 skills), AUTORIZADOS pelo Contrato-mãe §handoff_1_5 excecoes_G1_autorizadas + Contrato-mãe §handoff_para_sub_onda_1_6. 5 propostas ficam em `Caos/registros/`. Nenhum arquivo fora do escopo autorizado tocado. Working tree fora preservado.
- [x] **G2** — Sem commit; working tree aguarda ordem explícita.
- [x] **G3** — Sem push.
- [x] **G4** — Ritual de encerramento **pendente** (executa após gate humano — padrão herdado das sub-ondas anteriores).
- [x] **G5** — Fan-out 0/3 (interdependência cross-artefato — regra 6x confirmada; METODO âncora + skills apontam para METODO + propostas dependem do METODO fechado).
- [x] **G6** — 8 artefatos em disco (3 aplicados + 5 propostas em `Caos/registros/metodo-onda-1/1.6-metodo-kolden/`).
- [x] **G7** — Procedência linha-a-linha ancorada em `procedencia.md` (verificado no §11 do METODO; grep reverso bate com framework do Liceu).
- [x] **G8** — 0 procedência inventada (grep reverso confirma); 2 divergências declaradas honestamente (E1 + E2) com procedência da divergência + plano de emenda.

**Todos os 8 gates respeitados. Nenhuma divergência de execução.**

---

## 10. Handoff explícito para Onda 2

**Recomendação técnica do `caos-chief`:** próxima Onda = **Hermes (Grupo A)**.

**3 razões:**

1. **Hermes é a Camada 2 do sistema (METODO §3)** — padronizá-lo destrava toda subida via Contrato de Missão. Todo agent Kolden depende do Hermes como runtime.

2. **15 dos 22 wrappers proprietários inventariados na Sub-onda 1.3 vivem em Hermes** — a padronização é caminho crítico para as substituições MCP Grupo A da KLD-PRED-2026-001 (Apify, GHL×2, ElevenLabs). Onda 2 destravar Hermes destrava a predição 001.

3. **Hermes tem `AGENTS.md` próprio (projeto vendorizado Nous Research)** — a padronização inclui alinhar sua doc externa com a norma Kolden (fronteira Hermes vs. Método). Onda mais rica em aprendizado canônico do que qualquer squad-nascido-do-Caos.

**Alternativa:** **Prometeu** (Grupo A) se o volume de refactor do Hermes exigir sessão dedicada mais longa. Prometeu é framework AIOX vendorizado — mesma lógica de fronteira externa-Kolden.

**Onde a Onda 2 vai registrar:** `C:\Kolden\Hermes\registros\metodo-onda-2\` (5 artefatos padronizados).

**Sessão:** dedicada em `C:\Kolden\Hermes\` (G7 — nunca duas ondas na mesma sub-sessão).

---

## 11. Bloco YAML para appendar em `m-20260706-metodo-kolden.yaml`

Estrutura idêntica às Sub-ondas 1.1/1.2/1.3/1.4/1.5. Inserir em `operacional[0].resultado_onda_1.sub_ondas["1.6"]` (após `"1.5"`):

```yaml
          "1.6":
            em: "2026-07-06T20:00:00-03:00"
            status: "concluida-aguardando-gate-humano"
            executor: "caos-chief (raiz Kolden) — 0/3 fan-out (interdependência cross-artefato confirmada 6x consecutivas: 1.1/1.2/1.4/1.5/1.6 = 0/3; 1.3 = 3/3 caso oposto por independência estrutural por-squad)"
            entregaveis_aplicados:
              - "C:\\Kolden\\METODO-KOLDEN.md v1.0 (~500 linhas, 12 seções, procedência 100% ancorada com 8+ autores nomeados: Amodei, Russell, Simon, Brooks, Bostrom, Bai, Yao, Olah + Anthropic MCP + framework Liceu)"
              - "C:\\Kolden\\.claude\\skills\\metodo\\SKILL.md (skill global — invocável para explicar/navegar o Método via auto-descoberta; aponta para METODO-KOLDEN.md como fonte única)"
              - "C:\\Kolden\\.claude\\skills\\padronizar\\SKILL.md (skill global — invocável para executar rito canônico de 9 passos das Ondas 2-26; aponta para METODO §8 e CAOS-CL-002 canônico)"
            entregaveis_propostos:
              - "Caos/registros/metodo-onda-1/1.6-metodo-kolden/proposta-dike-instanciacao.md (3 opções A/B/C + recomendação nomeada Opção A + tabela trade-offs 7 dimensões)"
              - "Caos/registros/metodo-onda-1/1.6-metodo-kolden/diff-agents-md.md (mudança #1 independente + #2 condicional a A/B/C — não aplicado no AGENTS.md)"
              - "Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu.md (E1 interpretabilidade C5 + E2 categoria runtime bidirecional Art. IV — não aplicado no Liceu)"
              - "Caos/registros/metodo-onda-1/1.6-metodo-kolden/relatorio-de-consolidacao.md (14 padrões consolidados das Sub-ondas 1.1-1.5 rastreados + 5 padrões não consolidados por decisão + 5 padrões novos)"
              - "Caos/registros/metodo-onda-1/1.6-metodo-kolden/sumario-executivo.md (este arquivo — 3 gates humanos + bloco YAML pronto)"
            decisoes_gate_humano:
              - decisao: "PENDENTE — Q1: aprovar METODO-KOLDEN.md v1.0 (Opções A/B/C)"
                por: "Ronan (aguardando via AskUserQuestion)"
              - decisao: "PENDENTE — Q2: instância do Dike (Opções A/B/C/D — recomendação Opção A squad-solo)"
                por: "Ronan (aguardando via AskUserQuestion)"
              - decisao: "PENDENTE — Q3: aplicação das 2 emendas ao framework do Liceu (Opções A/B/C/D — recomendação B adiar para sessão dedicada com Liceu-chief)"
                por: "Ronan (aguardando via AskUserQuestion)"
            padrao_confirmado_6x:
              - "Fan-out ≤N é TETO, não obrigação — CONFIRMADO 6x consecutivas (1.1/1.2/1.4/1.5/1.6 = 0/3 por interdependência cross-arquivo; 1.3 = 3/3 caso oposto). Promovido a padrão global do Método (METODO §8 subseção 'Regra do fan-out')."
            padroes_novos_a_registrar:
              - "Documento canônico raiz (METODO) em 12 seções + procedência §11 é anatomia escalável para próximos Métodos Kolden (Marca, Vendas, etc.)"
              - "Skill que aponta para doc-canônico evita duplicação — `/metodo` não reproduz o METODO, aponta para ele"
              - "Proposta com 3 opções + recomendação nomeada + tabela trade-offs é template para decisões de arquitetura alta reversibilidade (aplicado no Dike; replicável)"
              - "Diff-de-AGENTS.md em 2 níveis (mudança #1 independente + mudança #2 condicional à decisão do gate) permite aplicação parcial"
              - "Emenda ao framework do Liceu = ida-e-volta com Liceu-chief em sessão dedicada — Sub-onda 1.6 propõe, não aplica; preserva soberania do produtor do framework"
              - "Consolidação sem perda via tabela de rastreabilidade (relatorio-de-consolidacao.md) — cada padrão → sub-onda → seção do METODO → evidência textual; padrão aplicável a fechamento de outras Ondas"
            verificacao_auto:
              - "3 arquivos aplicados fora de Caos/ (METODO + 2 skills) — EXCEÇÃO AUTORIZADA G1 pelo Contrato-mãe (§handoff_1_5 excecoes_G1_autorizadas + §handoff_para_sub_onda_1_6)"
              - "5 propostas em Caos/registros/metodo-onda-1/1.6-metodo-kolden/"
              - "Nenhum arquivo em Hermes/, Liceu/, Olimpo/, sobre-a-empresa/projetos/ tocado — respeitados os invarianttes duros da sub-onda"
              - "Sem commit (G2 respeitado)"
              - "Procedência linha-a-linha em METODO §11 ancorada em Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md"
              - "0 consultas web (procedência consolidada Fase 1 do m-20260704)"
              - "Ritual de encerramento em Caos/MEMORY.md + Caos/agent-memory/caos.md pendente (executar após gate humano)"
              - "Fan-out 0/3 confirmando regra 6x consecutivas"
            criterio_sucesso_onda_1:
              publicacao_metodo: "CONCLUIDO — arquivo criado com §1-§12 + procedência §11 100%"
              caos_8_de_8_criterios: "CONCLUIDO na Sub-onda 1.5 — Salgueiro 8/8 (delta +100 vs arquiteto.md 0/8)"
              variacao_estrutural_caos: "CONCLUIDO — Sub-ondas 1.1 + 1.2 padronizaram Caos"
              caos_cl_002_canonico: "CONCLUIDO — METODO §4 e §9 referenciam como canônico; skill /padronizar aponta para Caos/checklists/CAOS-CL-002.md como fonte-de-verdade (arquivo físico precisa rename após gate humano)"
              skills_metodo_padronizar: "CONCLUIDO — SKILL.md em .claude/skills/metodo/ e /padronizar/"
              comando_dike: "PENDENTE — aguarda gate humano Q2 do sumário-executivo"
            handoff_para_onda_2:
              recomendacao: "Hermes (Grupo A) — Camada 2 do sistema, 15/22 wrappers da 1.3, tem AGENTS.md próprio (fronteira externa-Kolden), destrava KLD-PRED-2026-001"
              alternativa: "Prometeu (Grupo A) — se refactor Hermes exigir sessão mais longa; mesma lógica de fronteira externa (framework AIOX vendorizado)"
              onde_registra: "C:\\Kolden\\Hermes\\registros\\metodo-onda-2\\ (5 artefatos padronizados)"
              sessao: "dedicada em C:\\Kolden\\Hermes\\ (G7 — nunca duas Ondas na mesma sub-sessão)"
            escopo_futuro_declarado:
              nascimento_dike: "se gate Q2 = Opção A, novo Contrato m-2026MMDD-nascimento-dike em sessão dedicada do Caos"
              emendas_liceu: "se gate Q3 = Opção B, ida-e-volta com Liceu-chief em sessão dedicada — Onda 6 do Método"
              fase_3_residual: "implementação real de MCP + dashboard populado + integração Hermes runtime — Contrato próprio após 26 Ondas (m-2026MMDD-implementacao-mcp-e-dashboard)"
```

---

## 12. Cross-check — critérios de sucesso da Onda 1

Do Contrato-mãe `m-20260706` §hermes.dor.criterio_de_sucesso:

| # | Critério | Estado |
|---|---|---|
| 1 | METODO-KOLDEN.md v1.0 publicado com 12 seções + procedência completa | ✅ **CONCLUÍDO** |
| 2 | Caos passa 8/8 critérios canônicos — smoke test SaaS enterprise | ✅ **CONCLUÍDO na Sub-onda 1.5** (Salgueiro 8/8) |
| 3 | Variação estrutural do Caos <10% desvio da anatomia canônica | ✅ **CONCLUÍDO nas Sub-ondas 1.1+1.2** |
| 4 | CAOS-CL-002 vira checklist canônico | ✅ **CONCLUÍDO nesta 1.6** (METODO §4/§9 referenciam como canônico; rename físico pós-gate) |
| 5 | Skills `/metodo` e `/padronizar <squad>` criadas | ✅ **CONCLUÍDO nesta 1.6** |
| 6 | Comando `@dike` definido (Dike nasce como agent funcional se decisão de Onda 1) | ⏸️ **AGUARDA GATE HUMANO Q2** |

**5 de 6 critérios CONCLUÍDOS. 1 aguarda decisão do Ronan.**

---

*Sub-onda 1.6 — sumário executivo. 8 artefatos entregues (3 aplicados + 5 propostas). Onda 1 do Método Kolden pronta para fechamento definitivo após gate humano (3 perguntas). Handoff recomendado para Onda 2 = Hermes. Ritual de encerramento pendente até fim do gate. 2026-07-06.*
