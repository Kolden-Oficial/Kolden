# Índice Mestre — Biblioteca de Mentes do Liceu

Tabela mestra, legível por humano, de **todas as mentes** catalogadas pelo Liceu. É a contraparte em
prosa do `indice.yaml` (machine-readable) — os dois espelham o mesmo acervo e são curados pelo
`bibliotecario` (tier 2).

## Princípio: índice federado (nunca duplicar)

O Liceu é a **memória-mãe** da Kolden, não um cofre que centraliza cópias. A mente **vive no seu
arquivo canônico** e este índice apenas **aponta** para ele:

- **Mente nova** (dissecada aqui): vive em `mentes/<id>/dossie.md` — o caminho canônico é esse dossiê.
- **Mente que já é agente num squad**: vive no `.md` do squad (ex.: `../Caliope/agents/<id>.md`). O
  Liceu a **indexa e enriquece por referência** (linhagem, fato×folclore, `persona_canonica`) —
  **nunca move, renomeia ou recria** a persona (veto `nao_mover_persona`).

Assim, ~100 mentes já espalhadas pelos squads entram no acervo **sem sair de onde estão**, e as novas
ganham um dossiê próprio. O `caminho-canonico` é sempre a fonte única de verdade de cada mente.

## Squads-fonte (de onde vêm as mentes existentes)

As mentes-referência já encarnadas como agentes vivem espalhadas pelos squads de execução e estratégia.
O `bibliotecario` cataloga, **por referência**, as personas destes squads (entre outros):

- **Caliope** (copy/VSL) — os grandes copywriters (Schwartz, Halbert, Ogilvy, Sugarman…).
- **Themis** (estratégia/decisão) — investidores e pensadores de modelos mentais (Dalio, Munger, Naval…).
- **Aletheia** (discovery & validation) — os metodologistas de validação (Blank, Fitzpatrick, Ries,
  Ulwick, Bland, Maurya, Savoia).
- **Orfeu** (narrativa/storytelling) — os mestres de história e estrutura dramática.
- **Aglaia** (marca/identidade) — os teóricos de arquétipo e posicionamento (Jung, Aaker, Sharp…).
- **Peitho** (tráfego/persuasão paga) — os engenheiros da persuasão (Bernays, Cialdini…).
- **Metis** (growth/métricas) — os pensadores de North Star e crescimento.
- **Pluto** (oferta/precificação) — os mestres de valor percebido e desejo.
- **Egide** (segurança) — as mentes de defesa e modelagem de ameaça.

> A lista de mentes por squad é levantada na indexação (Fase 8 do pipeline de dissecação); este índice
> é populado conforme cada mente é catalogada — não se assume nenhuma mente que ainda não foi dissecada
> ou indexada por referência.

## Tabela mestra

| Mente | Domínio | Squad-origem | Linhagens | Caminho canônico | Status |
|---|---|---|---|---|---|
| Edward Bernays | relações públicas, propaganda, psicanálise aplicada | (novo no Liceu) | psicanalise-do-desejo | `mentes/edward-bernays/dossie.md` | vigente |
| Ernest Dichter | marketing, psicanálise | (novo no Liceu) | psicanalise-do-desejo | `mentes/ernest-dichter/dossie.md` | vigente |
| Jacques Lacan | psicanálise, filosofia, semiótica | (novo no Liceu) | psicanalise-do-desejo | `mentes/jacques-lacan/dossie.md` | vigente |
| <!-- Eugene Schwartz | copywriting | Caliope | resposta-direta | `../Caliope/agents/eugene-schwartz.md` | vigente (por referência) --> |

> A linha entre `<!-- ... -->` é **exemplo comentado** (não é mente real). A tabela é populada pelo
> `bibliotecario` a cada dissecação ou indexação por referência. Mantém-se em paridade com `indice.yaml`.

## Disciplinas (B11 — 2026-06-29)

Bucket B11 do Ritual de Absorção do Caos: absorção do material `academic/` do upstream
[`msitarzewski/agency-agents@a597cb6`](https://github.com/msitarzewski/agency-agents) (MIT). Este
bucket trouxe **5 disciplinas-âncora** (a serem dissecadas em dossiês `tipo: disciplina` no modelo
[`_modelo-dossie-disciplina.md`](mentes/_modelo-dossie-disciplina.md)) e **9 frameworks operacionais
de status `semente`** prontos para consumo pelos squads. Os dossiês de disciplina vivem em
`mentes/disciplina-<slug>/dossie.md`; os frameworks em `frameworks/<slug>/framework.md` com
seção "Procedência" no fim do mesmo arquivo.

### Dossiês de disciplina (a dissecar)

| Disciplina | Sub-mentes-âncora | Linhagem Kolden | Dossiê (a escrever) |
|---|---|---|---|
| Antropologia funcional | Durkheim, Malinowski | `antropologia-funcional` | `mentes/disciplina-antropologia-funcional/dossie.md` |
| Antropologia ritual | van Gennep, Turner | `antropologia-ritual` | `mentes/disciplina-antropologia-ritual/dossie.md` |
| Geografia físico-humana | Humboldt, Köppen, Christaller | `geografia-fisico-humana` | `mentes/disciplina-geografia-fisico-humana/dossie.md` |
| Historiografia da Escola dos Annales | Bloch, Febvre, Braudel | `historiografia-annales` | `mentes/disciplina-historiografia-annales/dossie.md` |
| Estudos literários / narratologia | Tomashevsky, Genette, Aristóteles, Bharata Muni, Vogler, Truby | `formalismo-narratologico` + `estrutura-narrativa-contemporanea` | `mentes/disciplina-estudos-literarios-narratologia/dossie.md` |

> Observação: psicologia científica também entra com 2 frameworks (perfil multi-lente + dinâmica
> relacional) — a dissecação como disciplina sai num bucket dedicado, porque o escopo de
> sub-mentes-âncora é maior (Costa Jr., McCrae, Bowlby, Ainsworth, Vaillant, Beck, Karpman, Berne,
> Erikson, Bateson, Walker).

### Frameworks operacionais (`status: semente`)

| Slug | Título | Linhagem | Squads consumidores |
|---|---|---|---|
| `funcao-antes-da-estetica` | Função antes da estética | `antropologia-funcional` | Aglaia, Caliope |
| `rito-de-passagem-3-estagios` | Rito de passagem em 3 estágios | `antropologia-ritual` | Caliope, Aglaia, Pluto |
| `worldbuilding-fisico-bottom-up` | Worldbuilding físico bottom-up (com anexo de regras invioláveis) | `geografia-fisico-humana` | Orfeu |
| `longue-duree-3-camadas` | Longue durée em 3 camadas | `historiografia-annales` | Argos, Themis, Metis |
| `diagnostico-narrativo-fabula-sjuzhet` | Diagnóstico narrativo: fabula vs. sjuzhet | `formalismo-narratologico` | Caliope, Orfeu |
| `arco-personagem-5-pontos` | Arco de personagem em 5 pontos (want / need / lie / ghost) | `estrutura-narrativa-contemporanea` | Caliope, Orfeu, Aglaia |
| `narratologia-comparada-3-tradicoes` | Narratologia comparada em 3 tradições | `formalismo-narratologico` (ramos comparativos) | Caliope, Orfeu |
| `perfil-psicologico-multi-lente` | Perfil psicológico multi-lente (com anexo de respostas a trauma) | `psicologia-cientifica` | Aletheia, Caliope, Aglaia, Pluto |
| `dinamica-relacional` | Dinâmica relacional em 6 dimensões | `psicologia-cientifica` | Caliope, Pluto, Hestia |

> Cada framework traz `procedência` rastreada à disciplina-mãe e atribuição MIT ao upstream no
> próprio arquivo. Reescritos em PT-BR, sem cópia literal. Promoção `semente → vigente` ao concluir
> o dossiê da disciplina-mãe.
