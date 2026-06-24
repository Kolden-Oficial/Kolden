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
