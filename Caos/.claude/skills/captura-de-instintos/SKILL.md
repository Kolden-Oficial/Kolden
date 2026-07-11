---
name: captura-de-instintos
description: Use quando quiser que o aprendizado entre sessões deixe de ser anotação solta e vire conhecimento reusável e versionado — capturar padrões observados como "instintos" atômicos com confiança, evoluí-los para habilidade/reflexo/especialista quando maduros, e evitar contaminação entre projetos. Complementa o `ritual-de-encerramento` (reflexão manual de fim de sessão) com o modelo sistemático de captura e promoção. NÃO use para a reflexão pontual de uma sessão (essa é o ritual-de-encerramento).
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Captura de instintos (aprendizado contínuo)

O `ritual-de-encerramento` faz a reflexão **manual** de uma sessão e grava no `MEMORY.md`. Esta
habilidade é a camada **sistemática** por cima: transforma observações repetidas em **instintos
atômicos** com confiança, e dá o pipeline de **promoção** instinto → habilidade/reflexo/especialista
quando um padrão prova seu valor. É o que impede o `MEMORY.md` de virar um depósito de fragmentos
que ninguém reusa.

## O modelo de instinto
Um instinto é um comportamento aprendido **mínimo e verificável**:

```yaml
id: prefere-grep-antes-de-relatorio
gatilho: "ao verificar o resultado de um fan-out de subagentes"
acao: "verificar por GREP sobre o artefato real, não pelo relatório do agente"
confianca: 0.7          # 0.3 tentativo · 0.6 provável · 0.9 quase-certo
dominio: verificacao    # code-style | testing | git | verificacao | workflow | seguranca ...
escopo: projeto         # projeto (padrão) | global
evidencia:
  - "observado 4x nesta sessão; correção do Ronan em 2026-06-26"
```

Propriedades inegociáveis:
- **Atômico** — um gatilho, uma ação. Instinto que faz duas coisas vira dois.
- **Confiança-ponderada** — começa baixo; sobe com repetição/confirmação, cai com contraexemplo.
- **Marcado por domínio** — para filtrar e agrupar depois.
- **Lastreado em evidência** — registra **o que** o gerou (observações, correções do usuário).
  Sem evidência, não é instinto — é palpite.
- **Ciente de escopo** — `projeto` por padrão (convenção de React fica no projeto React); só vira
  `global` quando o mesmo padrão aparece em **2+ projetos**. Isso evita **contaminação cruzada**.

## Como capturar (sem inventar runtime que não existe)
O Kolden não roda um daemon de hooks proprietário. A captura é disciplina + reflexo simples:
1. **Sinal de trabalho** — o reflexo `marca-trabalho.sh` (PostToolUse) já sinaliza que houve escrita
   na sessão. Use isso como gatilho do ritual.
2. **Observação** — ao longo da sessão, marque candidatos a instinto quando perceber: uma correção
   explícita do usuário, um padrão repetido 3+ vezes, uma racionalização que levou a erro.
3. **Extração no encerramento** — no `ritual-de-encerramento`, em vez de só escrever prosa, destile
   cada lição num instinto no esquema acima e grave na seção **Candidatos a Promoção** do `MEMORY.md`.
4. **Análise barata** — quando o volume crescer, delegue a triagem a um subagente barato (Haiku):
   ler os candidatos, deduplicar, somar confiança aos que reaparecem.

## Evolução: instinto → cluster → entidade
Instintos não viram skills um a um. Eles **amadurecem em cluster**:
1. **Cluster** — agrupe instintos do mesmo domínio/gatilho. 3+ instintos coerentes = candidato.
2. **Gate de promoção** — promova só quando: confiança média ≥0.7, visto em ≥2 sessões (ou ≥2
   projetos, para global), e a evidência é durável (não um acidente de uma sessão).
3. **Destino** — escolha pela natureza:
   - padrão de *comportamento sob julgamento* → **habilidade** (`criacao-de-skill`);
   - regra *determinística que nunca pode ser violada* → **reflexo** (`criacao-de-hooks`);
   - *voz especializada recorrente* → **especialista** (`criacao-de-subagent`).
4. **Registro** — entidade promovida entra no registro via `registro-de-entidade` (Fase 8). O
   instinto promovido sai de "Candidatos" e o cluster é arquivado com ponteiro para a entidade.

Esquema das seções do `MEMORY.md` (Padrões Ativos / Candidatos a Promoção / Arquivado) e a
mecânica do **ledger append-only** (decisão recursiva com trilha de evidência) em
`references/ledger-e-promocao.md`.

## Disciplina anti-falha (o que NÃO fazer)
- **Confiança não é aprovação.** Um instinto de confiança 0.9 ainda é heurística. Para ação
  destrutiva/sensível (deploy, migração, push, dado de cliente), o instinto **sugere**; a decisão
  passa pelo gate humano e pelas regras da Constituição. Repetição não prova certeza.
- **Não promova overfitting.** Correção estreita de uma sessão = instinto local, não regra global.
  Generalize só quando o padrão se repetir em contextos diferentes.
- **Escopo primeiro.** Na dúvida entre projeto e global, fique em projeto. Promover cedo demais
  contamina todos os agentes com a idiossincrasia de um.
- **Evidência verbatim.** Guarde a correção/observação como ela aconteceu — não a sua paráfrase
  otimista dela.

## Habilidades relacionadas
- Reflexão e gravação de fim de sessão (fonte única do ritual): `ritual-de-encerramento`.
- Promover um instinto maduro: `criacao-de-skill`, `criacao-de-hooks`, `criacao-de-subagent`.
- Registrar a entidade promovida e capturar o padrão: `registro-de-entidade`.
- Auditar o portfólio de habilidades que esses instintos geram: `governanca-de-habilidades`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR, sem cópia literal):
`affaan-m/everything-claude-code@2bc924f` — `skills/continuous-learning-v2/` (modelo de instinto,
confiança, escopo projeto/global, evolução instinto→cluster→entidade),
`skills/recursive-decision-ledger/` (ledger append-only, gate de promoção, confiança≠aprovação),
`hooks/memory-persistence/`, `commands/learn.md` (MIT). Uso interno Kolden.*
