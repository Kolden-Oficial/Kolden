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

**Contrato de não-perda (obrigatório):** este pipeline conforma à habilidade
`protocolo-de-absorcao-sem-perda`. Nenhuma absorção termina sem que **toda** capacidade do
inventário (F3) tenha disposição explícita no `relatorio-de-perda.md` (F6.5), com `PERDIDO=0`,
verificado pelo reflexo determinístico `gate-reconciliacao` — não por instrução.

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
5. **Exporte o slug da absorção:** `export CAOS_REPO_SLUG=<owner>--<repo>@<sha-curto>` (mesmo valor
   da pasta de quarentena). É a chave que o reflexo `gate-reconciliacao` (F6.5/Stop) usa para achar
   os artefatos; sem ela, o gate não trava e o contrato de não-perda fica `[IMPLÍCITO]`.
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

## F3 — Compreensão 100% (BLOCK se < 100%)
Inventarie estrutura, propósito e **capacidades** do repo SAFE. Classifique cada capacidade no
vocabulário do registro: agente / subagent / skill / método-prompt / código-MCP / reflexo. Saída
**obrigatória e máquina-validável**: `registros/absorcao/<repo>/inventario-de-capacidades.md`, uma
linha por capacidade com **ID `G\d+`** e o schema fixo:
`| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |`. Os IDs são a chave de
disposição na F6.5 e no ledger (F7). Delegue leitura pesada a um subagente de leitura se o repo for
grande. **Gate BLOCK:** sem o `inventario-de-capacidades.md` gravado com schema válido, não passa da
F3 (o reflexo `gate-reconciliacao` trata "artefato ausente → BLOCK").

## F4 — Mapeamento ao registro (INFO)
Para CADA capacidade do inventário, use `consulta-ao-registro` (+ `curador`) contra
`dados/registro-de-entidades.yaml`: relevância ≥0.90 → REUSE; 0.60–0.89 + adaptabilidade ≥0.6 →
ADAPT (caminho E1); sem match → CREATE (caminho E2). Saída:
`registros/absorcao/<repo>/mapa-de-decisao.md`. Ex.: repo de copy → bate com `caliope` → ADAPT.

**REUSE só com diff técnica-a-técnica (mata o "carimbo de domínio"):** `REUSE` de um domínio inteiro
("copy = REUSE Caliope") só é válido se **cada** técnica do inventário (ex.: voice-of-customer
mirroring, fórmulas de headline, natural-transitions) tiver um match citado por ID numa capacidade
existente equivalente. Sem match citado por ID, **não é REUSE** — vira ADAPT ou CREATE. "Já temos
esse domínio" deixa de ser carimbo; é prova item-a-item ou não é REUSE.

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

## F6.5 — Reconciliação (BLOCK — o coração do anti-perda)
Antes de gravar o ledger (F7), gere `registros/absorcao/<repo>/relatorio-de-perda.md` com **uma linha
por ID** do inventário da F3, schema fixo `| ID | disposicao | destino_ou_motivo |`. Disposições:
- `ABSORVIDO` → exige o destino (squad/habilidade/arquivo onde foi parar).
- `DESCARTADO` → exige **motivo registrado** (ex.: "REUSE: técnica X já existe em Caliope, verificada
  item-a-item"; ou "fora de escopo, decisão Ronan dd/mm").
- `PERDIDO` → **BLOCK**.

**Invariante de saída:** `count(ABSORVIDO)+count(DESCARTADO)+count(PERDIDO) == count(inventário F3)`,
com `PERDIDO=0` e todo `DESCARTADO` com motivo. Rode o gate antes de avançar:
`python3 .claude/reflexos/gate-reconciliacao.py "$CAOS_REPO_SLUG"`. Ele bloqueia (`exit 2`) qualquer
item sem disposição = perda silenciosa. Não é juízo do modelo; é contagem (Constituição, Art. VIII).
O reflexo `Stop` `gate-reconciliacao.sh` é a rede de segurança caso a F7 seja tentada sem fechar.

## F7 — Registro + procedência + aprendizado (INFO)
Delegue ao `curador` (`registro-de-entidade`):
1. **Grave no ledger `dados/repositorios-absorvidos.yaml`** — entrada por repo (SHA, data, veredito
   de segurança, decisão, squad-alvo, **`capacidades_absorvidas`/`capacidades_descartadas` por ID do
   inventário — nunca prosa**, entidades). É o que torna a F0 instantânea depois.
2. Atualize `registro-de-entidades.yaml` (`origem: <owner>/<repo>@<SHA>`, `usadoPor` em ADAPT, ≤30%).
3. Crie/atualize `_origem.md` do squad-alvo; append em `registros/historico.md`; capture em
   `padroes-aprendidos.yaml`.
4. Acione `ritual-de-encerramento` (MEMORY do squad-alvo).

## Manutenção de vendors — check-updates 1×/sessão (G12)
Para todo repo absorvido, o ledger guarda `url` + `sha`. **Uma vez por sessão**, ao tocar uma
capacidade derivada de um vendor, é possível comparar o SHA registrado com o `defaultBranchRef` atual
(`gh repo view <url>` — sem clonar) e **notificar de forma não-bloqueante** apenas se houver delta
relevante (release nova / major bump). Atualizar = nova passagem incremental do pipeline (F0 detecta
"SHA mais novo"), nunca `git pull` cego sobre código de terceiro. Conceito absorvido de
`marketingskills` (protocolo "check for updates"), adaptado à soberania/quarentena da Kolden.

## Restrições (invioláveis)
- **Nunca executar o código do repo** (Art. VIII). Estática por padrão; Docker isolado só opt-in.
- **Segurança antes de tudo:** sem veredito SAFE, não há F3+.
- **Sem escrita sem aprovação** (Art. III) na F5.
- **Sem cópia literal** de material proprietário — extrair padrão, reescrever em pt-BR.
- **Preservação durável (não descartável):** enquanto o `relatorio-de-perda.md` tiver qualquer
  `DESCARTADO`, é **proibido limpar a quarentena** — OU versione o `inventario-de-capacidades.md` +
  um snapshot dos arquivos-fonte citados. Rebaixa "perda silenciosa" para, no pior caso,
  "latente-recuperável a um `ls` de distância". Sem nenhum `DESCARTADO` pendente, a quarentena
  (`_staging/quarentena/`, gitignored) é limpável após a absorção.

## Saída ao Ronan (por fase)
Reporte o veredito de cada gate com 1-3 linhas e PARE nos gates BLOCK. No fim: resumo do que foi
absorvido/aprimorado, em qual squad, e a entrada gravada no ledger.
