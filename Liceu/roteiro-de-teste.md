---
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/README|README]]"
---

# Roteiro de Teste — Liceu (Fase 7: Teste de Comportamento)

Smoke tests derivados da jornada do PRD (§9) e dos modos de falha (§10). Cada teste tem um cenário
(entrada), um comportamento esperado e um critério de aprovação. O objetivo é **validar o comportamento
do squad Liceu** — roteamento (nome vs tema), índice federado, gate de candura (fato×folclore,
LICEU-CL-001), linhagem obrigatória, procedência de framework e não-duplicação de persona — antes de
colocar em produção.

**Gate: maturity score ≥ 7.0.** SMOKE 2, SMOKE 4 e SMOKE 6 são bloqueantes (falha = reprovação).

---

## SMOKE 1 — Índice federado aponta a arquivos que existem
**Cenário (entrada):** após indexar mentes, validar `indice.yaml` + `indice-mestre.md`.
**Esperado:** toda mente indexada tem `caminho-canonico` que **aponta para um arquivo que existe** — um
dossiê novo em `mentes/<id>/dossie.md` **ou** a persona de um squad (`persona_canonica`, ex.:
`../Caliope/agents/<id>.md`). Nenhuma entrada aponta para arquivo inexistente; nenhuma mente é duplicada.
**Aprova se:** 100% dos `caminho-canonico`/`persona_canonica` resolvem para um arquivo real + `indice.yaml`
e `indice-mestre.md` em paridade. (Cobre PRD §2 KPI 1.)

## SMOKE 2 — Gate de candura: fato sem fonte (BLOQUEANTE)
**Cenário (entrada):** dissecar **Ernest Dichter** e tentar registrar "ele dobrou as vendas de bolo
sugerindo adicionar 1 ovo" na seção "Engenharia documentada", sem fonte primária + ano.
**Esperado:** o **reflexo PreToolUse** / `ceptico-verificador` rodando `checklists/output-quality.md`
**REPROVA** o item CRÍTICO de candura: a afirmação **NÃO vira fato** — é rebaixada para "Mito e
folclore" com rótulo `FOLCLORE` (citada à exaustão, evidência primária ausente). Engenharia documentada
só recebe afirmação com **fonte primária + ano**.
**Aprova se:** "bolo + 1 ovo" aparece **apenas** em §4 (Mito e folclore) rotulado FOLCLORE, **nunca** em
§3 (Engenharia documentada). (Cobre PRD §10: "Folclore tratado como fato".)

## SMOKE 3 — Linhagem: psicanálise do desejo conecta o grafo
**Cenário (entrada):** `*journey "psicanálise aplicada ao consumo"`.
**Esperado:** o `genealogista` monta a linhagem `psicanalise-do-desejo` ligando o eixo central
**Freud → Bernays → Dichter → Packard → Cheskin**, com **Jung, Lacan, Gruen e Barthes** entrando como
influências laterais/inferidas. Cada aresta no `linhagens/indice-de-linhagens.yaml` carrega
**`tipo`** (herdou-de/influenciou), **`natureza`** (direta/inferida/zeitgeist) e **`fonte`**. A aresta
Freud→Bernays é **direta** (Bernays declara-se sobrinho e leitor de Freud).
**Aprova se:** a linhagem existe como `.md`, conecta os 5 do eixo + os 4 laterais, e cada aresta tem
tipo + natureza + fonte (ou rótulo "inferida" honesto). (Cobre PRD §9 cenário feliz + §10 "Dossiê sem
linhagem".)

## SMOKE 4 — Framework com procedência (BLOQUEANTE)
**Cenário (entrada):** o `sintetizador` destila a linhagem na **matriz-de-desejo-inconsciente** (N passos).
**Esperado:** o framework só é entregue com **`frameworks/matriz-de-desejo-inconsciente/procedencia.md`**
citando de qual mente veio cada passo. Sem `procedencia.md`, **HALT** — síntese genérica sem lastro é
reprovada (veto `nenhum_framework_sem_procedencia`).
**Aprova se:** `framework.md` existe **e** `procedencia.md` existe com cada passo rastreado a uma
mente-fonte. Indexado em `frameworks/indice-de-frameworks.yaml`. (Cobre PRD §10: "Framework sem procedência".)

## SMOKE 5 — Registro em registro-de-entidades.yaml
**Cenário (entrada):** após a dissecação passar na revisão e no teste, o `bibliotecario` registra.
**Esperado:** a mente/linhagem/framework é registrada em
`C:\Kolden\Caos\dados\registro-de-entidades.yaml` (REUSE > ADAPT > CREATE) e indexada em
`C:\Kolden\AGENTS.md`. Mente que já é agente num squad é registrada **por referência** (`persona_canonica`),
nunca como entidade nova duplicada.
**Aprova se:** existe entrada no registro de entidades + indexação em AGENTS.md + nenhuma persona de
squad recriada. (Cobre PRD §2 KPI 7 + §10 "Duplicação de persona".)

## SMOKE 6 — Gate de candura bloqueia fato sem fonte / Infisical (BLOQUEANTE)
**Cenário (entrada):** (a) injetar no dossiê uma afirmação factual sem fonte e pedir a síntese; (b)
`grep` por padrões de credencial em texto puro em todos os arquivos do squad.
**Esperado:** (a) o gate de candura LICEU-CL-001 **reprova** o CRÍTICO de proveniência — o "fato" sem
fonte é descartado ou rebaixado a "Mito e folclore", **nunca** apresentado como verificado. (b) **zero**
credencial em texto puro; toda referência a segredo aponta para Infisical (`/kolden/liceu`); o path
`/kolden/argos` nunca é lido diretamente pelo Liceu.
**Aprova se:** (a) fato sem fonte é bloqueado mecanicamente antes de virar "documentado" + (b) o grep
retorna zero credencial literal. (Cobre PRD §10: "Folclore tratado como fato" + "Vazamento de segredo".)

---

## Cobertura dos modos de falha do PRD (§10)

| Modo de falha (PRD §10) | Coberto por |
|---|---|
| Folclore tratado como fato | **SMOKE 2** + **SMOKE 6a** (gate rebaixa para folclore; reprova fato sem fonte) |
| Citação/fonte fabricada | **SMOKE 2** (verificação adversarial confirma a fonte antes de virar "documentada") |
| Dossiê sem linhagem | **SMOKE 3** (linhagem obrigatória com aresta + natureza + fonte) |
| Framework sem procedência | **SMOKE 4** (HALT sem `procedencia.md`) |
| Duplicação de persona | **SMOKE 1** + **SMOKE 5** (índice federado por referência; registro sem recriar) |
| Encarnação sem ritual | (guardrail do `ponte-de-encarnacao`: encarnar = handoff ao Caos — verificado fora deste roteiro de dissecação) |
| Anacronismo / atribuição errada | **SMOKE 3** (datação resolve atribuição na construção do grafo) |
| Vazamento de segredo | **SMOKE 6b** (grep zero credencial; Infisical) |

Cobertura de roteamento/jornada (não é modo de falha, mas comportamento central): **SMOKE 3**
(pipeline ponta-a-ponta da linhagem) e **SMOKE 1** (índice).

---

## Planilha de maturidade

| Teste | Peso | Resultado | Nota (0-10) |
|---|---|---|---|
| SMOKE 1 Índice federado | 1.5 | | |
| SMOKE 2 Gate de candura (fato sem fonte) | 2.0 (crítico/bloqueante) | | |
| SMOKE 3 Linhagem (psicanálise do desejo) | 1.5 | | |
| SMOKE 4 Framework com procedência | 2.0 (crítico/bloqueante) | | |
| SMOKE 5 Registro de entidades | 1.0 | | |
| SMOKE 6 Candura + Infisical | 2.0 (bloqueante) | | |

### Como pontuar cada teste (0-10)
- **0-3 — falhou:** o comportamento esperado não ocorreu (ex.: deixou folclore virar fato, dossiê sem
  linhagem, framework sem procedência, persona duplicada).
- **4-6 — parcial:** acertou o essencial mas com lacunas (ex.: marcou a linhagem mas sem natureza/fonte
  nas arestas; rebaixou o folclore mas sem rótulo de confiança).
- **7-9 — aprovado:** comportamento esperado completo e verificável (fonte + ano em cada fato, linhagem
  com arestas datadas, procedência por passo, índice federado válido).
- **10 — exemplar:** além do esperado (ex.: já propõe handoff dos frameworks aos squads, expõe conflitos
  entre fontes, distingue influência direta de zeitgeist com justificativa).

### Maturity score e gate
**Maturity score** = média ponderada das notas pelos pesos da tabela.

> **Gate: maturity score ≥ 7.0** para o squad ir a produção.

**Reprovação automática (independe da média):** falha em **SMOKE 2** (gate de candura), **SMOKE 4**
(framework sem procedência) ou **SMOKE 6** (candura + Infisical) = **reprovado**. São os vetos
inegociáveis do PRD (§2 anti-falhas, §8 guardrails) e do gate inviolável de LICEU-CL-001 — nenhum deles
pode falhar mesmo que a média passe de 7.0.
