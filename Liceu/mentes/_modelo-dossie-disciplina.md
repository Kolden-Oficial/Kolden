---
# ─────────────────────────────────────────────────────────────────────────────
# MODELO DE DOSSIÊ DE DISCIPLINA — Liceu (Biblioteca de Mentes da Kolden)
# Variante do _modelo-dossie.md para mentes COLETIVAS (campos do saber, não pessoas).
# Copie este arquivo para mentes/disciplina-<slug>/dossie.md e preencha.
# Diferença essencial: o dossiê descreve a LINHAGEM DA DISCIPLINA (escolas, fronteiras, evolução),
# os PRINCÍPIOS DISCIPLINARES (citando escola, não autor único) e as SUB-MENTES-ÂNCORA pendentes
# de dissecação individual — que viram dossiês `mente-individual` em uma fase posterior.
# ─────────────────────────────────────────────────────────────────────────────
id: <kebab-case>                          # ex.: disciplina-antropologia-cultural
nome: "<Nome da Disciplina>"
titulo: "<epíteto / o que a disciplina é>"  # ex.: "Estudo dos sistemas simbólicos e práticas humanas"
tipo: disciplina                          # NOVO em 2026-06-29 — distingue de tipo: mente-individual
dominio: [<dominio-1>, <dominio-2>]        # ex.: [ciencias-sociais, antropologia, estudos-culturais]
status: em-disseccao                       # em-disseccao | rascunho | vigente | arquivado
atualizado-em: AAAA-MM-DD
real_person: false                         # disciplina não é pessoa
anos_relevantes: "<século/períodos>"      # ex.: "século XIX–XXI"
escolas:                                   # escolas/correntes principais
  - "<escola 1>"                           # ex.: "Estruturalismo (Lévi-Strauss)"
  - "<escola 2>"
obras_fundadoras:                          # obras-marco DATADAS
  - titulo: "<Título da Obra>"
    autor: "<Autor>"
    ano: <ano>                             # ANO OBRIGATÓRIO
    o_que_estabelece: "<o que a obra fundou na disciplina>"
sub_mentes_ancora:                         # mentes individuais a dissecar em fase posterior
  - id: <kebab-case>
    nome: "<Nome>"
    status: pendente-dissecacao
# --- linhagem (preenchido pelo genealogista) ---
disciplinas_vizinhas: [<disciplina>, ...]  # campos com fronteira/intersecção
linhagens: [<slug-linhagem>]               # FK para linhagens/<slug>.md
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [<slug-framework>]      # FK para frameworks/<slug>/
squads_que_usam: [<squad>, ...]            # ex.: [aletheia, caliope, aglaia]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: <alta | media | baixa>
---

# <Nome da Disciplina> — Dossiê de Disciplina

> _Schema-variante criado em 2026-06-29 durante absorção B11 de github.com/msitarzewski/agency-agents@a597cb6 (MIT)._

## 1. Identificação

- **Nome da disciplina:** <Nome>
- **Anos relevantes:** <século/períodos> — quando a disciplina se consolida e ganha cânone
- **Escolas principais:** lista breve (detalhe em §2)
- **Definição-tese:** uma frase do que a disciplina estuda (não opinião — o consenso operacional do campo)
- **Não é:** o que a disciplina **explicitamente não é** (fronteiras com campos vizinhos — detalhe em §2)

## 2. Linhagem da disciplina
*(genealogista — NÃO biografia individual; é a evolução do campo como projeto coletivo)*

- **Formação histórica:** quando, onde e contra o quê a disciplina se constituiu (rótulo de confiança: DOCUMENTADO/PLAUSÍVEL).
- **Escolas principais e suas teses centrais:**
  - **<Escola 1>:** o que defende, autor(es) de referência, obra-âncora + ano.
  - **<Escola 2>:** idem.
  - *(...)*
- **Fronteiras com disciplinas vizinhas:** o que **fica de fora** explicitamente, para evitar overlap. Ex.: antropologia × sociologia × psicologia social.
- **Rupturas internas conhecidas:** debates fundadores que ainda estruturam o campo (ex.: estruturalismo × interpretativismo).

## 3. Princípios disciplinares
*(cartografo-de-modelos — citar ESCOLA, não autor único; toda afirmação rotulada)*

```yaml
principios_disciplinares:
  - texto: "<princípio canônico da disciplina>"
    escola_de_origem: "<escola>"
    obra_de_referencia: "<obra — ano>"
    rotulo: DOCUMENTADO   # DOCUMENTADO | CONSENSO_ACADEMICO | EM_DEBATE | ESPECULATIVO
  - texto: "<outro princípio>"
    escola_de_origem: "<escola>"
    obra_de_referencia: "<obra — ano>"
    rotulo: EM_DEBATE
```

> ⚠️ **Princípio sem escola identificada = NÃO ENTRA.** Se o conceito está flutuando como senso comum, vai para §5 (engenharia × mito) com rótulo apropriado.

## 4. Métodos canônicos
*(cartografo-de-modelos — as ferramentas e práticas que o campo reconhece como SEUS)*

- **<Método 1>** (ex.: etnografia, descrição densa, observação participante): o que é, qual escola o consolidou, obra + ano de referência.
- **<Método 2>**: idem.
- **<Método 3>**: idem.

Cada método inclui:
- **Quando se aplica** (perguntas de pesquisa que o método responde).
- **Limites conhecidos** (o que o método **não** consegue ver).

## 5. Engenharia documentada × Mito
*(ceptico-verificador — o gate de candura para disciplinas, incluindo caricaturas pop)*

> ⚠️ Disciplinas inteiras geram caricaturas no senso comum ("antropólogo = aquele que estuda tribos", "historiador = quem decora datas"). Aqui se separa o que a disciplina **realmente faz** do **mito popular** sobre ela.

| Afirmação popular sobre a disciplina | Rótulo | Por quê |
|---|---|---|
| "<caricatura pop>" | FOLCLORE | <o que a disciplina realmente faz, com fonte> |
| "<simplificação errada>" | REFUTADO | <fonte canônica que corrige> |
| "<atribuição duvidosa a uma escola>" | DISPUTADO | <fontes em conflito> |

## 6. Aplicações Kolden
*(sintetizador — como os squads CONSOMEM esta disciplina)*

- **Squad <Nome>:** para que usa esta disciplina, em qual fase do trabalho, qual pergunta operacional ela responde.
- **Squad <Nome>:** idem.
- **Handoff típico:** o que o Liceu entrega (frameworks/dossiês de sub-mentes) e o que o squad consumidor opera com isso.

## 7. Gancho de operacionalização
*(sintetizador — bridge entre disciplina e a engrenagem da Kolden)*

- **Frameworks Kolden derivados:**
  - `<slug-framework-1>` — passo(s) alimentado(s) por esta disciplina.
  - `<slug-framework-2>` — idem.
- **Squads consumidores:** lista (espelhada em §6, mas aqui em formato de FK).
- **Pergunta operacional que a disciplina injeta no fluxo:** "<a pergunta que esta disciplina força a equipe a fazer>".

## 8. Sub-mentes-âncora pendentes
*(genealogista + bibliotecario — lista das mentes individuais a dissecar em fase posterior)*

Cada sub-mente entra como **`pendente-dissecacao`** até virar um dossiê próprio (`mentes/<id>/dossie.md`, schema `mente-individual`). O Liceu **não cria todas de uma vez** — disseca por demanda dos squads.

```yaml
sub_mentes_ancora:
  - id: <kebab-case>
    nome: "<Nome>"
    relevancia: "<escola/papel na disciplina>"
    status: pendente-dissecacao
  - id: <kebab-case>
    nome: "<Nome>"
    relevancia: "<escola/papel na disciplina>"
    status: pendente-dissecacao
```

> Quando uma sub-mente ganha dossiê próprio, mudar status para `dossie-vigente` e cruzar com `caminho-canonico` no `indice.yaml`.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu), variante de disciplina. Toda afirmação em §3 e §4 tem escola + obra + ano; caricaturas e simplificações vivem em §5. Indexado por `bibliotecario` em `indice.yaml` com `tipo: disciplina`.*
