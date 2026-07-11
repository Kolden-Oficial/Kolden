---
name: protocolo-de-absorcao-sem-perda
description: >
  Protocolo canônico e obrigatório para absorver qualquer repositório externo na Kolden
  sem perda silenciosa. Toda absorção (habilidade ingestao-de-repositorio e qualquer agente
  que absorva código/agentes) DEVE conformar a esta sequência fechada. Aciona em /absorver e
  em qualquer ingestão de fonte externa. Invariante:
  count(ABSORVIDO)+count(DESCARTADO)+count(PERDIDO) == count(inventário F3), com PERDIDO=0.
enforce: true   # esta habilidade é pré-requisito de saída do pipeline, não sugestão
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Protocolo de absorção sem perda

Fecha o laço anti-perda do pipeline de absorção por **aritmética determinística**, não por
confiança no modelo. Os Pilares 2 (Inventariar), 4 (Diff/disposição) e 5 (Verificar/Reconciliar)
deixam de ser `[IMPLÍCITO]` (opcionais = falham sob pressão) e viram portas com **trava (BLOCK)**,
no mesmo padrão do reflexo `bloqueio-de-quarentena.sh` que já funciona.

**Princípio inviolável:** nenhuma capacidade inventariada pode terminar a absorção **sem disposição
explícita**. A perda silenciosa deixa de ser possível por *construção aritmética*, não por o modelo
"lembrar de checar" (Constituição, Art. VIII).

## A sequência fechada (cada `→` é uma porta; portas BLOCK são reflexos, não prompt)

```
Preservar → Inventariar(BLOCK) → Diff(disposição total) → Integrar → Reconciliar(BLOCK) → Registrar(por-ID)
   F1            F3                    F4/F5                  F6           F6.5 [NOVA]          F7
 (já OK)      (vira gate)          (REUSE com prova)      (já desenh.)   (o coração)        (IDs, não prosa)
```

Esta habilidade governa o pipeline da `ingestao-de-repositorio`; as fases F1–F7 vivem lá. Aqui está
o **contrato de não-perda** que cada absorção deve satisfazer.

## A etapa que não existia — F6.5 RECONCILIAÇÃO

Após a integração (F6) e **antes** de gravar o ledger (F7), o pipeline gera
`registros/absorcao/<repo>/relatorio-de-perda.md`. Para **cada ID** do inventário da F3,
exatamente **uma** disposição:

| Disposição  | Exige | Efeito no gate |
|-------------|-------|----------------|
| `ABSORVIDO`  | onde foi parar (squad/habilidade/arquivo de destino) | passa |
| `DESCARTADO` | **motivo registrado** (ex.: "REUSE: técnica X já existe em Caliope, verificada item-a-item"; ou "fora de escopo, decisão Ronan dd/mm") | passa |
| `PERDIDO`    | — | **BLOCK** |

**Invariante de saída (o que mata a perda silenciosa):**

```
count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(inventário F3)
```

Se a soma ≠ total, existe item **sem disposição** = perda silenciosa = **BLOCK**. Não é juízo do
modelo; é contagem. Adicionalmente, `PERDIDO` > 0 = **BLOCK** e `DESCARTADO` sem motivo = **BLOCK**.

## Schema dos dois artefatos (máquina-validáveis)

`registros/absorcao/<repo>/inventario-de-capacidades.md` (F3) — uma linha por capacidade, ID `G\d+`:

```
| ID  | capacidade               | tipo        | keywords            | dominio | fonte(arquivo:linha)  |
| G1  | 45 Agent Skills          | conjunto    | skills,marketing    | multi   | skills/*/SKILL.md     |
| G13 | injeção dinâmica !`cmd`  | truque-prompt | claude-code,contexto | infra   | AGENTS.md:223-254     |
```

`registros/absorcao/<repo>/relatorio-de-perda.md` (F6.5) — uma linha por ID do inventário:

```
| ID  | disposicao  | destino_ou_motivo                                                        |
| G1  | ABSORVIDO   | squad-seo/skill-seo-onpage                                               |
| G13 | DESCARTADO  | fora de escopo: técnica Claude-Code-only, decisão Ronan 2026-06-24       |
| G21 | ABSORVIDO   | caliope/skill-copywriting (frameworks adicionados — ver diff técnico)    |
```

## A trava determinística (o reflexo — sem isto, é só prompt)

O reflexo `Caos/.claude/reflexos/gate-reconciliacao.py` (wrapper `.sh` registrado no `settings.json`
como `Stop`) faz a contagem e dá `exit 2` (BLOCK) se houver perda não-disposta. Espelha o padrão do
`bloqueio-de-quarentena.sh`. O `.sh` só age quando a env `CAOS_REPO_SLUG` está setada (na F1) — fora
de uma absorção, sai com `exit 0` e não interfere.

**Sem este registro, o protocolo continua `[IMPLÍCITO]` — exatamente a falha auditada. O registro é
o que o torna `[EXPLÍCITO]`.**

## Os reforços que tornam o contrato honesto

- **F3 é BLOCK, não WARN.** Sem `inventario-de-capacidades.md` gravado e com schema válido, o
  pipeline não passa da F3 (o gate já implementa "artefato ausente → BLOCK").
- **Ledger por ID, não prosa.** No `dados/repositorios-absorvidos.yaml`, o campo de capacidades
  referencia IDs do inventário: `capacidades_absorvidas: [G2, G21]`,
  `capacidades_descartadas: [G13]`. Acaba com os "3 bullets" que a corrida real produziu.
- **REUSE só com diff técnica-a-técnica (vetor G21).** Em F4, "copy = REUSE Caliope" exige que
  **cada** técnica do inventário tenha match citado por ID numa capacidade existente equivalente.
  Sem match citado, não é REUSE — vira ADAPT ou CREATE. "Já temos esse domínio" deixa de ser carimbo.
- **Preservação durável.** Enquanto o `relatorio-de-perda.md` tiver qualquer `DESCARTADO`, é proibido
  limpar a quarentena — OU versionar o `inventario-de-capacidades.md` + snapshot dos arquivos-fonte
  citados. Rebaixa "perda silenciosa" para, no pior caso, "latente-recuperável a um `ls` de distância".

## Métrica de aceite (como provar que fechou)

Não confie que consertou — **conte**. Critério de aprovação de uma absorção:
`relatorio-de-perda.md` presente, **cada ID** do inventário disposto, `PERDIDO=0`, e cada `DESCARTADO`
com motivo. O gate determinístico é o juiz, não o modelo.
