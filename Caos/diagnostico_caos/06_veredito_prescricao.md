---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/diagnostico_caos/_indice|_indice]]"
---

# 06 — Veredito e Prescrição

## Veredito (uma frase + número)

> **O CAOS opera hoje com TPND = 1.0: ele não possui nenhuma etapa que emita um relatório de perda, então toda capacidade descartada na priorização ou na reescrita some de forma 100% silenciosa — quem hoje evita a perda é o Ronan lendo o plano na F5, não o sistema.** A perda é **silenciosa**, não detectável. **O Hermes não participa da absorção** (`01_censo.md §2`) — não preserva nem reconstrói nada; a "reconstrução por resumo" existe, mas mora no campo `capacidades` do ledger do **Caos** (prosa de 3 bullets, `04`), não no Hermes.

## Placar

| Métrica | Resultado |
|---|---|
| Pilares **PRESENTE** | 2/5 (Preservar, Diff) |
| Pilares **PARCIAL** | 2/5 (Inventariar, Integrar-delta) |
| Pilares **AUSENTE** | 1/5 (**Verificar**) |
| Pilares **aplicados à força** | **1/5** (só Preservar tem reflexo determinístico) |
| Etapas **[IMPLÍCITO]** (pontos de falha) | **7** (F0, F3-completude, F4-limiares, F5-descarte, F6-verificação, F7-granularidade, reconciliação-inexistente) |
| **TPND medida** (n=1, caso real) | **1.0** (auto-detecção de perda = 0%) |
| Cobertura de registro | 4/22 capacidades (todas agregadas); 18/22 sem rastro |

### Veredito final: **REPROVADO**

Critério de aprovação era **TPND=0 e ≥4 pilares aplicados à força**. Resultado: **TPND=1.0** e **1 pilar** aplicado à força. Falha nos dois eixos.
- A generalização da *taxa* é `[INCONCLUSIVO]` (n=1), mas a **existência** de perda silenciosa num caso real é `[VERIFICADO]`, e a **causa estrutural** (Pilar 5 ausente) é `[VERIFICADO]` — suficiente para reprovar, porque o alvo é TPND=0, e qualquer perda silenciosa > 0 reprova.

---

## Prescrição (separada do diagnóstico)

Objetivo: transformar os pilares AUSENTE/PARCIAL em etapas **[EXPLÍCITO]** e fazer a Fase Verificar **sempre emitir um relatório de perda**. Priorizado.

### P1 — (CRÍTICO) Criar a etapa "Reconciliação de Perda" (Pilar 5) como gate BLOCK
Nova fase **F6.5** em `ingestao-de-repositorio`: confrontar **cada item** do `inventario-de-capacidades.md` (F3) contra o que foi absorvido (F6) e emitir um `relatorio-de-perda.md` com 3 baldes obrigatórios por item: **ABSORVIDO** (onde) / **DESCARTADO-COM-MOTIVO** (justificativa registrada) / **PERDIDO** (→ BLOCK). Regra: **nenhum item do inventário pode ficar sem disposição**. Gate: BLOCK se a soma das disposições ≠ total do inventário. Isto força, por aritmética, `perdas_silenciosas = 0`.

### P2 — (CRÍTICO) Tornar o inventário F3 um gate BLOCK + artefato obrigatório
Mudar `ingestao/SKILL.md:45` de "WARN se <100%" para **BLOCK**: sem `registros/absorcao/<repo>/inventario-de-capacidades.md` **gravado e estruturado** (schema validável), o pipeline não passa da F3. Adicionar reflexo `PostToolUse`/gate que **verifica a existência e o schema** do arquivo. Proibir o ledger `capacidades` em prosa: deve **referenciar IDs do inventário**, não resumir.

### P3 — (ALTO) Proibir REUSE/ADAPT em granularidade de domínio
Em F4, "copy = REUSE (Caliope)" só é válido com **diff técnica-a-técnica**: cada técnica do inventário precisa de um match explícito (capacidade-alvo equivalente) ou vira ADAPT/CREATE. Sem match citado, não é REUSE. Mata o vetor G21 ("já temos" sem verificar).

### P4 — (ALTO) Preservação durável, não descartável
Enquanto houver itens `DESCARTADO`/`PERDIDO` no relatório de perda, **proibir a limpeza da quarentena** (ou versionar o `inventario-de-capacidades.md` + um snapshot dos arquivos-fonte citados). Hoje a fonte da verdade é "limpável" (`ingestao/SKILL.md:84`) — rebaixar perda silenciosa a, no mínimo, latente-recuperável.

### P5 — (MÉDIO) Reforço determinístico dos passos [IMPLÍCITO]
Para F0/F4/F5/F7: trocar juízo livre por checagens verificáveis (limiares calculados e registrados; ranking que **lista o que ficou abaixo da linha**, não o omite).

### P6 — Empacotar como **uma skill-padrão única e obrigatória**
Criar `protocolo-de-absorcao-sem-perda` (mesmo molde de `SKILL.md`) que **todo agente** que absorva algo é obrigado a seguir — encapsulando P1-P4 como uma sequência fechada **Preservar → Inventariar(BLOCK) → Diff(disposição total) → Integrar → Reconciliar(BLOCK) → Registrar(por-ID)**. Assim os "100 repositórios" passam pelo **mesmo crivo aritmético**, não por improviso repo-a-repo. O Pilar 5 deixa de ser texto e vira a condição de saída do pipeline.

### Métrica de aceite da prescrição
Após P1-P3, re-rodar o teste de `04` sobre ≥3 repos com o pipeline completo: **aprovação exige `relatorio-de-perda.md` presente em 100% das absorções e `PERDIDO=0`** (ou cada perda justificada e registrada). Só então TPND→0 deixa de depender de o Ronan ler o plano.
