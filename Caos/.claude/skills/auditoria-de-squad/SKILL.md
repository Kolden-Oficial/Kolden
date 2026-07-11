---
name: auditoria-de-squad
description: Compara um squad-alvo, arquivo por arquivo, contra um benchmark e gera um plano de aprimoramento — o que falta e como absorver ao nível máximo. Use na Fase 5 da absorção de repositório (benchmark = o repo em quarentena) OU isoladamente para conformar um squad antigo ao padrão-ouro (benchmark = Aletheia/Argos). Máquina de diff única, dois benchmarks. Produz um relatório que PARA para aprovação humana antes de qualquer escrita.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Auditoria de squad — máquina de diff (do macro ao micro)

## O que faz
Recebe um **squad-alvo** e um **benchmark** e produz um **plano de aprimoramento**: tudo que o
benchmark tem (capacidade, técnica, arquivo, estrutura) e o squad-alvo NÃO tem, ranqueado por valor,
com proposta de como absorver "ao nível máximo, com o máximo de critério". **Não escreve nada** — só
diagnostica e propõe. A aplicação é outra etapa, após aprovação humana (Art. III).

## Parâmetro `benchmark` (a unificação)
A mesma máquina serve dois usos:
- **benchmark = repo** (`_staging/quarentena/<repo>/`) → usada na **Fase 5 do pipeline de absorção**.
  Ex.: repo de copy vs squad `Caliope`.
- **benchmark = padrão-ouro** (`Aletheia/` ou `Argos/`) → usada **standalone** para conformar squads
  antigos importados (a antiga "auditoria-de-squad" pendente). Ex.: `Caliope` vs `Aletheia`.

Declare o benchmark no início e siga o mesmo processo nos dois casos.

## Processo
1. **Mapear o squad-alvo (inventário micro→macro).** Liste, arquivo por arquivo: orquestrador
   (`agents/<chief>.md`), especialistas (`agents/*.md`), habilidades (`.claude/skills/`), reflexos,
   tasks, workflows, checklists, `squad.yaml`, `CLAUDE.md`, `MEMORY.md`, `prd-de-ia.md`. Registre o
   que existe e o que **falta** vs a anatomia-ouro.
2. **Mapear o benchmark.** Mesmo inventário. Se o benchmark é um repo, classifique cada capacidade no
   vocabulário do registro (agente / habilidade / método-prompt / código / reflexo).
3. **Diff por capacidade.** Para cada item do benchmark, pergunte: o squad-alvo já tem equivalente?
   - **Tem e é igual/melhor** → nada a fazer.
   - **Tem, porém inferior** → ADAPT: aprimorar ao nível do benchmark (mais critério, mais
     profundidade, frameworks que faltam).
   - **Não tem** → absorver: criar a capacidade no squad-alvo.
4. **Cobrir a lacuna estrutural.** Squads importados (Caliope, Peitho, etc.) costumam faltar
   `.claude/skills/`, `.claude/reflexos/`, `CLAUDE.md`, `prd-de-ia.md`, `MEMORY.md` — aponte cada
   ausência (espelha as 10 inconsistências do padrão-ouro).
5. **Ranquear e propor.** Ordene por valor para o negócio; para cada item, proponha COMO absorver e
   qual habilidade de criação aplica (`criacao-de-skill`, `criacao-de-subagent`,
   `heranca-de-especialista` para o bloco histórico, etc.).

## Saída — relatório de aprimoramento (PARA para aprovação)
```
AUDITORIA DE SQUAD — alvo: <squad> | benchmark: <repo@sha | padrão-ouro>

Inventário do alvo: <o que tem / o que falta vs anatomia-ouro>
Lacunas estruturais: <CLAUDE.md? skills/? reflexos/? prd? MEMORY?>

Plano de aprimoramento (ranqueado):
| # | Capacidade do benchmark | Estado no alvo | Ação | Como absorver (ao máximo) | Habilidade |
|---|---|---|---|---|---|
| 1 | <ex.: técnica de VSL X> | ausente | absorver | <especialista/skill nova + herança histórica> | criacao-de-skill |
| 2 | <ex.: framework do Ogilvy> | inferior | ADAPT | <aprofundar core_frameworks> | heranca-de-especialista |

Procedência: <repo@sha / benchmark>  |  Decisão por item: REUSE/ADAPT/CREATE
```

**PARADA OBRIGATÓRIA (Art. III):** apresente este relatório e **não escreva nada** sem aprovação
explícita do Ronan. Após aprovar, a aplicação usa as habilidades de criação + passa pelos gates de
qualidade N0→N6 (`revisor`) e maturity ≥7.0 (`testador`).

## Restrições
- **Nunca tocar o conteúdo dos especialistas existentes sem necessidade** — conformar estrutura/
  envelope e absorver o que falta; não reescrever o que já é válido.
- Em ADAPT, respeitar o limite de mudança ≤30% (Constituição, Art. VI) — mudança maior vira CREATE
  com justificativa.
- Quando o benchmark é um repo, **nunca copiar trecho literal** de material proprietário — extrair o
  padrão/método e reescrever em pt-BR (igual à `busca-de-referencias`).
- Não aplicar nada antes da aprovação humana.
