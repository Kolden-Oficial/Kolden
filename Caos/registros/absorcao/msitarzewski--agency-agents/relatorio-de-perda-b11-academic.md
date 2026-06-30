# F6.5 — Relatório de Reconciliação · B11 Academic

**Repo upstream:** `msitarzewski/agency-agents@a597cb6`
**Bucket:** B11 = Liceu (divisão `academic/` upstream — 100% Liceu, sem dispersão)
**Inventário F3:** 18 IDs (G1-G18) — `inventario-academic.md`
**Data:** 2026-06-29

## Invariante anti-perda (Caos Art. VIII)

`count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 18`
- ABSORVIDO = 18 (5 dossiês + 9 frameworks + 2 ADAPTs no checklist + 2 anexos em frameworks)
- DESCARTADO = 0
- PERDIDO = **0** ✓

`18 + 0 + 0 = 18` ✓

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|---|---|---|
| G1 | ABSORVIDO | Liceu/mentes/disciplina-antropologia-cultural/dossie.md (CREATE — schema `tipo: disciplina`) |
| G2 | ABSORVIDO | Liceu/frameworks/funcao-antes-da-estetica/framework.md (CREATE — Durkheim/Malinowski) |
| G3 | ABSORVIDO | Liceu/frameworks/rito-de-passagem-3-estagios/framework.md (CREATE — van Gennep/Turner) |
| G4 | ABSORVIDO | Liceu/mentes/disciplina-geografia-fisico-humana/dossie.md (CREATE) |
| G5 | ABSORVIDO | Liceu/frameworks/worldbuilding-fisico-bottom-up/framework.md (CREATE) |
| G6 | ABSORVIDO | Liceu/frameworks/worldbuilding-fisico-bottom-up/framework.md §"Regras invioláveis" (anexo embutido no F5) |
| G7 | ABSORVIDO | Liceu/mentes/disciplina-historiografia/dossie.md (CREATE — junto com G10 como norma transversal embebida) |
| G8 | ABSORVIDO | Liceu/checklists/output-quality.md (ADAPT — Rótulo 4-graus de candura + tipo de fonte) |
| G9 | ABSORVIDO | Liceu/frameworks/longue-duree-3-camadas/framework.md (CREATE — Braudel) |
| G10 | ABSORVIDO | Liceu/checklists/output-quality.md (ADAPT — anti-eurocentrismo como norma transversal) + embebido na disciplina-historiografia |
| G11 | ABSORVIDO | Liceu/mentes/disciplina-narratologia/dossie.md (CREATE — Campbell/Snyder por referência ao Orfeu; Propp/Todorov/Genette/Barthes/McKee/Truby/Field pendentes) |
| G12 | ABSORVIDO | Liceu/frameworks/diagnostico-narrativo-fabula-sjuzhet/framework.md (CREATE — Tomashevsky/Genette) |
| G13 | ABSORVIDO | Liceu/frameworks/arco-personagem-5-pontos/framework.md (CREATE — Truby/Vogler/Campbell) |
| G14 | ABSORVIDO | Liceu/frameworks/narratologia-comparada-3-tradicoes/framework.md (CREATE — 3 atos + kishōtenketsu + rasa) |
| G15 | ABSORVIDO | Liceu/mentes/disciplina-psicologia-clinica/dossie.md (CREATE — fronteira com psicanalise-do-desejo documentada) |
| G16 | ABSORVIDO | Liceu/frameworks/perfil-psicologico-multi-lente/framework.md (CREATE — Big Five + apego + Vaillant + Beck + Karpman + Erikson) |
| G17 | ABSORVIDO | Liceu/frameworks/perfil-psicologico-multi-lente/framework.md §"Respostas diversas a trauma" (anexo embutido) |
| G18 | ABSORVIDO | Liceu/frameworks/dinamica-relacional/framework.md (CREATE — Karpman/Berne/Bowlby/Bateson) |

## Sumário por disposição

| Disposição | Quantidade | Percentual |
|---|---:|---:|
| ABSORVIDO (dossiê de disciplina CREATE) | 5 (G1, G4, G7, G11, G15) | 27.8% |
| ABSORVIDO (framework CREATE) | 9 (G2, G3, G5, G9, G12, G13, G14, G16, G18) | 50.0% |
| ABSORVIDO (anexo embutido em framework) | 2 (G6 em worldbuilding, G17 em perfil-multi-lente) | 11.1% |
| ABSORVIDO (ADAPT no checklist) | 2 (G8 4-graus, G10 anti-eurocentrismo) | 11.1% |
| DESCARTADO | 0 | 0.0% |
| PERDIDO | **0** | **0.0%** ✓ |
| **Total** | **18** | **100%** |

## Escritas aplicadas em F6

### Schema-variante NOVO (1)

- `Liceu/mentes/_modelo-dossie-disciplina.md` — variante para disciplinas inteiras (8 seções paralelas ao schema de mente individual)

### Dossiês de disciplina NOVOS (5)

| Dossiê | ID | Sub-mentes-âncora pendentes |
|---|---|---|
| `disciplina-antropologia-cultural` | G1 | Lévi-Strauss, Geertz, Bourdieu, Mauss, Polanyi, Turner, van Gennep |
| `disciplina-geografia-fisico-humana` | G4 | Köppen, Mackinder, Christaller, Diamond |
| `disciplina-historiografia` | G7+G10 | Braudel, Ginzburg, Said, Chakrabarty |
| `disciplina-narratologia` | G11 | Propp, Todorov, Genette, Barthes, McKee, Truby, Field (Campbell+Snyder por referência ao Orfeu) |
| `disciplina-psicologia-clinica` | G15 | Costa & McCrae, Bowlby, Erikson, Vaillant, Beck, Karpman |

### Frameworks NOVOS (9)

| Framework | ID | Consumidores |
|---|---|---|
| `funcao-antes-da-estetica` | G2 | Aglaia, Caliope |
| `rito-de-passagem-3-estagios` | G3 | Caliope, Aglaia, Pluto |
| `worldbuilding-fisico-bottom-up` (+G6 anexo) | G5+G6 | Orfeu |
| `longue-duree-3-camadas` | G9 | Argos, Themis, Metis |
| `diagnostico-narrativo-fabula-sjuzhet` | G12 | Caliope, Orfeu |
| `arco-personagem-5-pontos` | G13 | Caliope, Orfeu, Aglaia |
| `narratologia-comparada-3-tradicoes` | G14 | Caliope, Orfeu |
| `perfil-psicologico-multi-lente` (+G17 anexo) | G16+G17 | Aletheia, Caliope, Aglaia, Pluto |
| `dinamica-relacional` | G18 | Caliope, Pluto, Hestia |

### ADAPTs (2)

| Arquivo | IDs | Mudança |
|---|---|---|
| `Liceu/checklists/output-quality.md` | G8 | Bloco "Rótulo 4-graus de candura" + tipo de fonte |
| `Liceu/checklists/output-quality.md` | G10 | Bloco "Anti-eurocentrismo como norma transversal" |
| `Liceu/agents/bibliotecario.md` | — | Bloco "Tipos no acervo" (reconhece `tipo: disciplina` × `tipo: mente-individual`) |

### Índices atualizados (5)

- `Liceu/indice-mestre.md` — nova seção "Disciplinas (B11 — 2026-06-29)" com 5 dossiês + 9 frameworks
- `Liceu/indice.yaml` — entradas YAML correspondentes
- `Liceu/frameworks/indice-de-frameworks.yaml` — versão 2 com 9 entradas novas
- `Liceu/linhagens/indice-de-linhagens.yaml` — 7 linhagens-disciplina novas (campo `tipo` adicionado); fronteiras explícitas com `psicanalise-do-desejo` e `estrutura-narrativa-contemporanea`
- `Liceu/README.md` — 9 linhas novas na tabela de Handoffs (framework → squad consumidor)

### Memória do Squad atualizada

- `Liceu/MEMORY.md` (Padrões Ativos):
  - Padrão: "Disciplina como tipo no acervo" (schema-variante criado)
  - Padrão: "Fronteira psicologia clínica × psicanálise-do-desejo" (coexistem)
  - Padrão: "Cross-link Orfeu para sub-mentes já encarnadas" (Campbell/Snyder por referência)
  - Gotcha: "Rótulo 4-graus de candura para disciplinas" (G8)
  - Gotcha: "Anti-eurocentrismo como norma transversal" (G10)

### Invariantes preservadas

- **PT-BR estrito** (Art. II).
- **Sem cópia literal** do upstream.
- **Atribuição MIT** em cada artefato novo / seção ADAPT.
- **Vetos do Liceu preservados:**
  - Veto 3 (procedência): cada framework tem seção "Procedência" com fonte+ano+rótulo de candura.
  - Veto 4 (não-duplicação): Campbell e Snyder indexados por referência ao Orfeu, não recriados.
  - Veto 1 (candura factual): 4-graus aplicados em dossiês de disciplina.
- **Fronteira anti-eurocentrismo** embebida como norma transversal nos dossiês de historiografia + checklist global.
- **Sub-mentes-âncora pendentes** catalogadas como `pendente-dissecacao` — roadmap explícito, não dívida técnica oculta.

## Verificação do gate determinístico

```bash
export CAOS_REPO_SLUG="msitarzewski--agency-agents@a597cb6"
python3 C:/Kolden/Caos/.claude/reflexos/gate-reconciliacao.py "$CAOS_REPO_SLUG/b11"
# Esperado: exit 0 (PERDIDO=0, soma bate)
```

Bucket B11 = APROVADO para F7 (atualização parcial do ledger).
