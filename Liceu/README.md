# Liceu — Biblioteca de Mentes da Kolden

> *Λύκειον / Lýkeion: a escola peripatética de Aristóteles — o maior sistematizador e enciclopedista*
> *da história, que dissecou metodicamente todos os campos do saber.*
> A **memória-mãe** da Kolden: disseca o cérebro de grandes especialistas, separa **fato de folclore**,
> mapeia **linhagens intelectuais** e destila **frameworks operacionais** para os squads.

## O que é

Um squad de **gestão de conhecimento** que pega o cérebro de grandes especialistas mundiais — em
qualquer aspecto de uma empresa — e o **disseca ao máximo**. Para cada mente ou linhagem, produz um
**dossiê 100% citado** que separa **engenharia documentada** (fonte primária + ano) de **mito/folclore**
(rotulado com confiança), mapeia de quem a mente **herdou** e a quem **influenciou**, e expõe o gancho
de operacionalização — qual framework alimenta e quais squads consomem. Quando o valor justifica,
**sintetiza a linhagem num framework operacional Kolden** com procedência rastreável a cada mente.

O Liceu **não escreve copy, não sobe tráfego, não cria oferta, não pesquisa mercado** (isso é o Argos).
Ele **disseca e sistematiza pensadores** — e faz handoff: os frameworks vão para os squads de execução,
e quando uma mente deve virar **agente conversável**, o handoff é para o **Caos** (com aprovação humana).
O Liceu produz conhecimento; nunca instancia agentes sozinho.

## Roster

9 agentes: 1 orquestrador (tier 0) + 4 dissecadores (tier 1) + 2 de estrutura (tier 2) +
2 de operacionalização (tier 3).

| Ícone | ID | Tier | Papel |
|---|---|---|---|
| 🏛️ | `liceu-chief` | 0 | Orquestração: escopo (nome vs tema), roteamento, síntese e **gate de candura** (fato×folclore) |
| 📜 | `biografo` | 1 | Biografia, carreira, **obras-fonte datadas**, contexto histórico — datação resolve atribuição |
| 🗺️ | `cartografo-de-modelos` | 1 | Extrai `mental_models`, `core_frameworks` e `core_principles` da obra primária |
| 🔬 | `ceptico-verificador` | 1 | Separa engenharia-documentada × mito/folclore; verificação adversarial; **dono do gate de candura** |
| ✒️ | `lexicografo` | 1 | `signature_vocabulary`, padrões linguísticos e a seção "Como X Opera" |
| 🌳 | `genealogista` | 2 | Grafo de linhagens (`herdou_de`/`influenciou`); mantém `linhagens/` |
| 📚 | `bibliotecario` | 2 | Índice federado (`indice-mestre.md` + `indice.yaml`) e registro de entidades — indexa por referência |
| ⚗️ | `sintetizador` | 3 | Destila mente/linhagem em framework operacional (N passos) + `procedencia.md` |
| 🌉 | `ponte-de-encarnacao` | 3 | Prepara o brief e faz **handoff ao Caos** quando uma mente deve virar agente. Nunca cria o agente |

## Como usar

```
@liceu dissect "<mente ou tema>"   # diagnostica o escopo (nome único vs tema/linhagem) e roteia
*journey                            # roda o pipeline completo de dissecação (9 fases)
@liceu:ceptico-verificador          # fala direto com um especialista (roteamento direto)
@liceu:genealogista                 # idem — qualquer especialista por id
```

- **Nome único** ("disseca a mente do Eugene Schwartz") → Fase 0 checa se já é agente num squad; se
  sim, **enriquece por referência** (não recria).
- **Tema/linhagem** ("encontrei essa linhagem: Freud → Bernays → Dichter → Lacan → Jung") → `*journey`
  com **fan-out** dos dissecadores em paralelo pelas mentes.

## O pipeline de dissecação (habilidade `dissecacao-de-mente`, 9 fases)

```
0. Registro & consulta     → liceu-chief  (consulta indice.yaml + registro: já é agente? já dissecada?)
1. Escopo                  → liceu-chief  (nome único vs tema → lista de mentes + a linhagem que as une)
2. Pesquisa citada         → biografo + cartografo-de-modelos (bio, obras datadas, modelos da obra primária)
3. Fato × folclore         → ceptico-verificador (verificação adversarial; rebaixa anedota sem fonte)
4. Extração                → cartografo-de-modelos + lexicografo (modelos, "o que rejeitaria", vocabulário)
5. Linhagem                → genealogista (herdou_de/influenciou; aresta com natureza + fonte)
6. Redação                 → dissecadores (dossiê no schema de mentes/_modelo-dossie.md)
7. Indexação               → bibliotecario (indice-mestre.md + indice.yaml + registro; por referência)
8. Gancho operacional      → sintetizador (framework + procedencia.md) → handoff aos squads / Caos
```

Cada fase tem um checkpoint que pode dar **HALT** por falta de fonte, de linhagem ou de procedência.

## Acervo federado (nunca duplicar)

A mente **vive no seu arquivo canônico**; o índice (`indice-mestre.md` + `indice.yaml`) apenas **aponta**:

- **Mente nova** → dossiê em `mentes/<id>/dossie.md` (caminho canônico = o dossiê).
- **Mente que já é agente** num squad → vive no `.md` do squad; o Liceu indexa e enriquece por
  referência (`persona_canonica`), **sem mover, renomear ou recriar** a persona.

Assim as ~100 mentes já espalhadas pelos squads (Caliope, Themis, Aletheia, Orfeu, Aglaia, Peitho,
Metis, Pluto, Egide) entram no acervo sem sair de onde estão. Detalhe em `indice-mestre.md`.

## Os vetos de candura (o que para a entrega)

Nenhum entregável passa sem cumprir os vetos invioláveis (`checklists/output-quality.md` / LICEU-CL-001):

1. **Nada vira fato sem fonte.** Toda afirmação em "Engenharia documentada" exige **fonte primária + ano**.
   Anedótico/disputado vai para "Mito e folclore" com rótulo de confiança. (Reflexo + checklist + workflow.)
2. **Nenhum dossiê sem linhagem.** Toda mente sai com `herdou_de`/`influenciou` — ou "isolado" justificado.
3. **Nenhum framework sem procedência.** Todo framework tem `procedencia.md` citando de qual mente veio
   cada passo.
4. **Não mover nem duplicar persona** que já é agente num squad — só indexar/enriquecer por referência.
5. **Não encarnar sozinho** — transformar mente em agente conversável é **handoff ao Caos** com aprovação
   humana, nunca dentro do Liceu.

## Handoffs (Liceu estrutura conhecimento; outros aplicam)

| Quando | Destino | Artefato |
|---|---|---|
| Framework de ângulos/dores/gatilhos | **Caliope** | Framework operacional + dossiês das mentes-fonte (copywriters) → copy/VSL |
| Framework de arquétipo/posicionamento | **Aglaia** | Framework + dossiês (Jung, Aaker, Sharp…) → marca |
| Framework de ângulos persuasivos | **Peitho** | Framework + procedência (Bernays, Dichter…) → tráfego pago |
| Framework de desejo/valor percebido | **Pluto** | Framework + procedência → oferta e precificação |
| Mente deve virar agente conversável | **Caos** | Brief de encarnação (o dossiê = ~80% do diagnóstico) → Ritual de 9 fases (exige aprovação humana) |
| Fonte hostil/profunda (escalada de pesquisa) | **Argos** | Handoff ao motor do Argos (`research-synthesizer` / GPT-Researcher) — **sem motor próprio** |
| Pedido de **mercado/concorrente** (fora de escopo) | **Argos** | Liceu disseca *pensadores*; mercado é o Argos. Fronteira explícita |
| `funcao-antes-da-estetica` (B11) | **Aglaia**, **Caliope** | Toda prática cultural tem função social — analisar a função antes da estética; antídoto contra pastiche |
| `rito-de-passagem-3-estagios` (B11) | **Caliope**, **Aglaia**, **Pluto** | Separação → liminaridade → incorporação como chassi de jornada de cliente, ritual de marca e funil de oferta |
| `worldbuilding-fisico-bottom-up` (B11) | **Orfeu** | Mundo coerente bottom-up (tectônica → clima → hidrologia → biomas → assentamento), com regras invioláveis de hidrologia/clima |
| `longue-duree-3-camadas` (B11) | **Argos**, **Themis**, **Metis** | Decompor mudança em estrutura/conjuntura/evento (Braudel/Annales) — calibrar horizonte de decisão à camada certa |
| `diagnostico-narrativo-fabula-sjuzhet` (B11) | **Caliope**, **Orfeu** | Diagnosticar problema narrativo na camada certa (90% mora no sjuzhet) antes de reescrever |
| `arco-personagem-5-pontos` (B11) | **Caliope**, **Orfeu**, **Aglaia** | Arco real com want/need/lie/ghost — para jornada de cliente, personagem narrativo e brand persona com profundidade |
| `narratologia-comparada-3-tradicoes` (B11) | **Caliope**, **Orfeu** | Escolher consciente entre 3 atos / kishōtenketsu / rasa — fugir do default ocidental quando a mensagem pede |
| `perfil-psicologico-multi-lente` (B11) | **Aletheia**, **Caliope**, **Aglaia**, **Pluto** | Persona/personagem multi-lente (Big Five + apego + defesa + cognitiva + Karpman + Erikson), com anexo de respostas a trauma |
| `dinamica-relacional` (B11) | **Caliope**, **Pluto**, **Hestia** | Mapear relação em 6 dimensões — diálogo crível, oferta que honra o contrato não-dito, diagnóstico de dinâmica de time |

## Mapa do projeto

```
Liceu/
├── CLAUDE.md                 ← identidade do squad
├── prd-de-ia.md              ← PRD aprovado
├── squad.yaml                ← manifesto (tiers, agentes, handoffs, vetos)
├── README.md                 ← este arquivo (visão geral e uso)
├── MEMORY.md                 ← memória do squad (padrões de dissecação aprendidos)
├── ferramentas.md            ← tools nativas, habilidades de pesquisa, handoff ao motor Argos, Infisical
├── instalacao.md             ← como colocar em produção
├── roteiro-de-teste.md       ← smoke tests (maturity score)
├── indice-mestre.md          ← TABELA mestra de TODAS as mentes (federado)
├── indice.yaml               ← índice machine-readable (id, nome, dominio, caminho-canonico, linhagens)
├── agents/                   ← orquestrador + 8 especialistas (9 arquivos)
├── mentes/                   ← dossiê por mente nova (+ complementos das existentes) + _modelo-dossie.md
├── linhagens/                ← genealogias: indice-de-linhagens.yaml + um .md por linhagem
├── frameworks/               ← frameworks operacionais (indice-de-frameworks.yaml + <slug>/framework.md + procedencia.md)
├── checklists/               ← output-quality.md (gate de candura LICEU-CL-001)
└── .claude/                  ← skills, reflexos e settings.json
```
