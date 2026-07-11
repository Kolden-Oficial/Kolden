---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/diagnostico_caos/_indice|_indice]]"
---

# 03 — Matriz de capacidades (5 pilares da absorção sem perda)

> Para cada pilar: veredito + evidência `arquivo:linha` + **Aplicado à força** (trava determinística/gate BLOCK) vs **apenas Possível** (depende do modelo seguir o prompt) + risco se PARCIAL/AUSENTE.
> Princípio do auditor: **uma salvaguarda opcional é uma salvaguarda que falha.**

## Pilar 1 — PRESERVAR

**Pergunta:** o original é clonado intacto e mantido read-only antes de qualquer transformação? Existe fonte da verdade imutável?

- **Veredito: PRESENTE.**
- **Evidência:** `constituicao.md:122-126` (Art. VIII: clone read-only em quarentena, `.git` removido, hostil até prova); `ingestao/SKILL.md:27-34`; `bloqueio-de-quarentena.sh:45-50` (bloqueia qualquer interpretador/instalador tocando a quarentena, `exit 2`).
- **Aplicado à força? SIM** — único pilar com reforço determinístico (reflexo PreToolUse BLOCK).
- **Risco residual:** a quarentena é **"gitignored; limpável após a absorção"** (`ingestao/SKILL.md:84`). A "fonte da verdade imutável" é **descartável e não-versionada** — assim que limpa, o original some. Preservação é real **durante** a absorção, **temporária** depois. `[VERIFICADO]`

## Pilar 2 — INVENTARIAR

**Pergunta:** antes de transformar, gera-se um **inventário estruturado** das capacidades (comandos, features, truques, edge-cases) — **não um resumo em prosa**?

- **Veredito: PARCIAL.**
- **Evidência (a favor):** `ingestao/SKILL.md:45-49` — F3 manda produzir `inventario-de-capacidades.md` com schema estruturado *(capacidade → tipo → keywords → domínio → arquivos-fonte)*. O **desenho** é estruturado, não prosa. Bom.
- **Evidência (contra):** o gate é **"WARN se <100%"** (`ingestao/SKILL.md:45`), não BLOCK — inventário incompleto **não para o pipeline**. Nenhum reflexo verifica que o arquivo foi gravado. **Na única corrida real, o arquivo NUNCA foi produzido** (`registros/absorcao/` inexistente — `01_censo.md §1.6`); o único registro durável virou **3 bullets de prosa** no ledger (`repositorios-absorvidos.yaml:43`) — exatamente o formato que este pilar proíbe.
- **Aplicado à força? NÃO** — Possível. Depende do modelo escrever (e não pular) o inventário.
- **Risco:** inventário degradado a prosa apaga sub-capacidades (truques, edge-cases, CLIs nomeados). Garbage-in para os Pilares 3-5. `[VERIFICADO]`

## Pilar 3 — DIFF (delta)

**Pergunta:** compara o repo novo contra o que o usuário já tem e isola só a novidade real?

- **Veredito: PRESENTE (no desenho) / dependente do Pilar 2.**
- **Evidência:** `ingestao/SKILL.md:51-62` (F4 mapeia cada capacidade ao registro; F5 roda `auditoria-de-squad` com benchmark=repo); `auditoria-de-squad/SKILL.md:30-40` (diff por capacidade: tem-igual/tem-inferior(ADAPT)/não-tem(absorver)). Conceitualmente correto e até elegante (uma máquina de diff, dois benchmarks).
- **Aplicado à força? PARCIAL** — a F5 é BLOCK na parada de aprovação (`ingestao/SKILL.md:57-62`), então o plano de diff **é** produzido antes de escrever. Mas a **qualidade** do diff herda o lixo do Pilar 2, e o plano é **"ranqueado por valor"** (`auditoria-de-squad/SKILL.md:48-51`).
- **Risco:** ranquear por valor **descarta silenciosamente a cauda** — nenhuma regra exige que *todo* item do inventário apareça no plano com uma disposição (absorver/descartar-com-motivo). O delta vira "o que vale a pena", não "o que é novo". `[VERIFICADO]`

## Pilar 4 — INTEGRAR SÓ O DELTA

**Pergunta:** a integração acopla apenas o delta no padrão do usuário, sem recopiar a estrutura alheia inteira?

- **Veredito: PARCIAL (não-testado).**
- **Evidência:** `ingestao/SKILL.md:64-68` (F6 aplica via `criacao-de-*`); `auditoria-de-squad/SKILL.md:63-69` (ADAPT ≤30%, não tocar o que já é válido, sem cópia literal — reescrever em pt-BR). Desenho correto.
- **Aplicado à força? NÃO** — Possível, e **nunca executado**: a única absorção real **parou na F5** (`repositorios-absorvidos.yaml:44` `decisao: PARCIAL`, `entidades: []`, `status: parcial`); nenhum squad SEO foi criado, nenhum `evals/` foi absorvido (`04_teste_perda.md`). F6 tem **0 execuções completas**.
- **Risco:** a etapa que materializa o conteúdo na Kolden é a mais lossy (reescrita generativa) e **não tem prova de campo** nem reconciliação a jusante. `[VERIFICADO]`

## Pilar 5 — VERIFICAR

**Pergunta:** após integrar, o agente confere o resultado contra o inventário (F3) e **reporta o que ficou de fora**?

- **Veredito: AUSENTE.** ← o achado central.
- **Evidência:** os dois únicos verificadores da F6 são `revisor` e `testador`:
  - `revisor.md:13-31` audita contra `modelos/checklist-de-qualidade.md` **e o PRD** — rastreabilidade é "PRD→arquivos", **nunca inventário→arquivos**.
  - `testador.md:12-42` valida **comportamento contra o PRD** + maturity ≥7.0 — não menciona o inventário da absorção em momento algum.
  - `ingestao/SKILL.md:64-68` (F6) e `:70-77` (F7) **não contêm nenhuma etapa** "confronte o absorvido contra o inventário e liste o não-absorvido".
- **Aplicado à força? NÃO — inexistente.** Não há gate, reflexo, skill ou subagente que emita um **relatório de perda**.
- **Risco:** **qualquer** capacidade descartada na F5 (ranking) ou perdida na reescrita da F6 é **permanentemente silenciosa** — nada no sistema a procura ou a reporta. É a causa-raiz de TPND > 0. `[VERIFICADO]`

## Placar da matriz

| # | Pilar | Veredito | Aplicado à força? |
|---|---|---|---|
| 1 | Preservar | **PRESENTE** | **SIM** (reflexo BLOCK) |
| 2 | Inventariar | **PARCIAL** | Não (Possível) |
| 3 | Diff | **PRESENTE** (desenho) | Parcial (BLOCK na parada; descarte por ranking livre) |
| 4 | Integrar só o delta | **PARCIAL** (não-testado) | Não (Possível) |
| 5 | Verificar | **AUSENTE** | **Não — inexistente** |

- **PRESENTE: 2/5 | PARCIAL: 2/5 | AUSENTE: 1/5.**
- **Aplicados à força: 1/5** (só Preservar). Os pilares 2, 4 e 5 dependem inteiramente de o modelo seguir o prompt — **salvaguardas opcionais = salvaguardas que falham.**
- **O laço anti-perda nunca fecha:** sem Pilar 5, os Pilares 1-4, mesmo perfeitos, não têm quem detecte o que escapou.
