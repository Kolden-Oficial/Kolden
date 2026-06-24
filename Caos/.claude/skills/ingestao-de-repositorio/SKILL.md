---
name: ingestao-de-repositorio
description: Orquestra a absorção de um repositório do GitHub para dentro do Kolden — da quarentena segura ao aprimoramento de um squad existente. Use quando o Ronan mandar uma URL de repo (comando /absorver) para visualizar tudo, verificar segurança (prioridade #1), entender 100%, checar se já temos squad/agente/skill equivalente, e então aprimorar o existente ou avisar e criar. Conduz 8 fases (F0–F7) com gates; nunca executa o código de terceiro; para para aprovação humana antes de aplicar.
---

# Ingestão de repositório — pipeline de absorção (maestro)

Você conduz a absorção de um repo de terceiro em **8 fases com gates** (espelha o Ritual de 9
fases). Segurança é prioridade #1 e é um gate BLOCK antes de qualquer leitura profunda. Nada é
escrito no Kolden sem aprovação humana (Constituição, Art. III e Art. VIII).

**Entrada:** uma URL de repositório do GitHub. **Princípio:** REUSE > ADAPT > CREATE; análise
ESTÁTICA por padrão (nunca executar o código).

## F0 — Consulta ao histórico de repositórios (INFO)
Antes de tudo, normalize a URL para `<host>/<owner>/<repo>` (minúsculas, sem `.git`) e leia o ledger
`dados/repositorios-absorvidos.yaml`. Resolva o SHA atual com `gh repo view <url> --json
defaultBranchRef` (sem clonar). Veredito:
- **NOVO** (ausente do ledger) → segue para F1.
- **JÁ-ABSORVIDO (mesmo SHA)** → **pare** e avise: "já replicado em `<data>`, SHA `<x>`, absorvido em
  `<squad>` (capacidades: …). Nada novo." Não reprocessa.
- **JÁ-ABSORVIDO (SHA mais novo)** → modo **incremental**: segue, mas o diff da F5 cobre só o delta
  desde o SHA registrado.
- **Status `rejeitado`** no ledger → avise o bloqueio anterior e o motivo; só reavalie se o Ronan
  insistir explicitamente.

## F1 — Quarentena + clone read-only (BLOCK)
Clone achatado e inerte. Passos (padrão Argos):
1. `git clone --depth 1 <url> Caos/_staging/quarentena/<owner>--<repo>@<sha-curto>/`
2. Capture o SHA completo (`git -C <dir> rev-parse HEAD`) **antes** de remover `.git`.
3. **Remova `.git`** (sem repo aninhado, sem hooks git herdados).
4. Grave `_procedencia.md` na pasta: url, SHA, licença, branch, data.
Gate BLOCK: clone falhou, `.git` ainda presente, ou repo acima do limite de tamanho sem confirmação.
**Nada é executado** — o reflexo `bloqueio-de-quarentena.sh` reforça.

## F2 — Gate de segurança (BLOCK — prioridade #1)
Delegue ao subagente **`auditor-de-seguranca`** (habilidade `verificacao-de-seguranca-de-repo`).
Análise 100% estática (segredos, CVE sem instalar, padrões perigosos, supply-chain), delegando o
conhecimento ao Egide (`omar-santos`, `jim-manico`, `cartographer`, `cyber-chief`). Grave o relatório
em `registros/absorcao/<repo>/seguranca.md`. Veredito:
- **SAFE** → avança para F3.
- **QUARENTENA** → pare, apresente ao Ronan; opt-in Docker isolado (sentinela `.docker-aprovado`).
- **REJEITAR** → aborte; registre no ledger como `rejeitado` (F7 mínima) e pare.

## F3 — Compreensão 100% (WARN se < 100%)
Inventarie estrutura, propósito e **capacidades** do repo SAFE. Classifique cada capacidade no
vocabulário do registro: agente / subagent / skill / método-prompt / código-MCP / reflexo. Saída:
`registros/absorcao/<repo>/inventario-de-capacidades.md` (capacidade → tipo → keywords → domínio →
arquivos-fonte). Delegue leitura pesada a um subagente de leitura se o repo for grande.

## F4 — Mapeamento ao registro (INFO)
Para CADA capacidade do inventário, use `consulta-ao-registro` (+ `curador`) contra
`dados/registro-de-entidades.yaml`: relevância ≥0.90 → REUSE; 0.60–0.89 + adaptabilidade ≥0.6 →
ADAPT (caminho E1); sem match → CREATE (caminho E2). Saída:
`registros/absorcao/<repo>/mapa-de-decisao.md`. Ex.: repo de copy → bate com `caliope` → ADAPT.

## F5 — Plano de aprimoramento (BLOCK na aprovação)
- **E1 — TEMOS (REUSE/ADAPT):** use a habilidade **`auditoria-de-squad`** com `benchmark = o repo`.
  Ela compara o squad-alvo arquivo-por-arquivo e gera o plano de absorver o que falta ao nível máximo.
- **E2 — NÃO TEMOS (CREATE):** **avise** o Ronan e proponha criar no squad mais próximo (nova
  habilidade/especialista) ou um squad novo via Ritual (`/squad`).
- **Ambos:** apresente o plano e **PARE para aprovação explícita** (Art. III). Nada é escrito antes.

## F6 — Aplicação + gates de qualidade (BLOCK)
Após aprovação, aplique via `criacao-de-skill` / `criacao-de-subagent` / `criacao-de-squad` /
`criacao-de-hooks` + `heranca-de-especialista` (herança histórica por camada, Fase 5.6 da cascata).
A absorção também preenche lacunas estruturais do squad-alvo (CLAUDE.md, skills/, reflexos/, prd,
MEMORY). Depois: `revisor` roda a cascata N0→N6 (`checklist-runner`); `testador` exige maturity ≥7.0.

## F7 — Registro + procedência + aprendizado (INFO)
Delegue ao `curador` (`registro-de-entidade`):
1. **Grave no ledger `dados/repositorios-absorvidos.yaml`** — entrada por repo (SHA, data, veredito
   de segurança, decisão, squad-alvo, capacidades, entidades). É o que torna a F0 instantânea depois.
2. Atualize `registro-de-entidades.yaml` (`origem: <owner>/<repo>@<SHA>`, `usadoPor` em ADAPT, ≤30%).
3. Crie/atualize `_origem.md` do squad-alvo; append em `registros/historico.md`; capture em
   `padroes-aprendidos.yaml`.
4. Acione `ritual-de-encerramento` (MEMORY do squad-alvo).

## Restrições (invioláveis)
- **Nunca executar o código do repo** (Art. VIII). Estática por padrão; Docker isolado só opt-in.
- **Segurança antes de tudo:** sem veredito SAFE, não há F3+.
- **Sem escrita sem aprovação** (Art. III) na F5.
- **Sem cópia literal** de material proprietário — extrair padrão, reescrever em pt-BR.
- Quarentena fica em `_staging/quarentena/` (gitignored); limpável após a absorção.

## Saída ao Ronan (por fase)
Reporte o veredito de cada gate com 1-3 linhas e PARE nos gates BLOCK. No fim: resumo do que foi
absorvido/aprimorado, em qual squad, e a entrada gravada no ledger.
