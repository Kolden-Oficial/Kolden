---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · bucket **B11 = `academic/`** → **Liceu** (com handoff narratológico ao Orfeu)

> Inventário-fonte: `inventario-academic.md` (18 IDs, G1–G18).
> Squad-alvo principal: **Liceu** (`C:\Kolden\Liceu\`) — biblioteca de mentes, 9 agentes, 3 dossiês existentes (Bernays, Dichter, Lacan), 1 framework (`matriz-de-desejo-inconsciente`), 1 linhagem (`psicanalise-do-desejo`).
> Squad-alvo secundário (dispersão controlada): **Orfeu** (`C:\Kolden\Orfeu\agents\`) — narrativa/storytelling, 12 agentes (Campbell, Snyder, Coyne, Harmon, Klaff, Duarte, Ganz, Hall, Howell, Johnstone, Dicks, story-chief).

## Análise estrutural — leitura cruzada

### Peculiaridade do upstream `academic/`
Diferente de `business/`, `creative/`, `engineering/`, etc., o `academic/` é **simulação de disciplina**, não persona individual nomeada. Cada um dos 5 agentes upstream encarna **uma disciplina inteira ancorada em escolas**:
- `anthropologist` → ancora em Lévi-Strauss, Geertz, Bourdieu, Mauss, Polanyi, Turner, van Gennep.
- `geographer` → Köppen, Christaller, Mackinder, Diamond.
- `historian` → Braudel + escola dos Annales, anti-eurocentrismo.
- `narratologist` → Propp, Campbell/Vogler, Todorov, Genette, McKee, Snyder.
- `psychologist` → Big Five, Bowlby (apego), Vaillant, Beck, Karpman, Erikson.

### Casamento com Liceu — alto, com gaps
Liceu **já é** uma biblioteca de mentes, mas hoje só tem 3 dossiês (Bernays/Dichter/Lacan, todos da linhagem `psicanalise-do-desejo` que alimenta a matriz-de-desejo-inconsciente). O Liceu **declara explicitamente** (`README.md`, "Acervo federado") que indexa por referência ~100 mentes espalhadas pelos squads, mas **não dissecou ainda nenhuma disciplina inteira** — só pensadores pontuais já mapeados.

O upstream `academic/` aparece como um **eixo novo no Liceu**: dossiês de **disciplina-mãe** (cada um ancorando uma escola e listando pensadores-âncora), distintos dos dossiês de mente individual já existentes. Esta absorção **expande o acervo do Liceu por 5 disciplinas** (antropologia cultural, geografia físico-humana, história/historiografia, narratologia, psicologia clínica/pesquisadora) e adiciona **frameworks operacionais novos** que os squads de execução consomem.

### Casamento parcial com Orfeu — narratologia (G11–G14)
Orfeu já tem operacionais de storytelling (Campbell, Snyder/SAVE THE CAT, Coyne, Klaff, Duarte, Harmon). Faltam-lhe os **estruturalistas/formalistas acadêmicos**: Propp (morfologia do conto), Todorov (estrutura narrativa), Genette (fabula × sjuzhet), McKee (Story). G11-G14 enriquecem Orfeu, mas a regra REUSE > ADAPT > CREATE força **um caminho único**: o conhecimento mora no Liceu (dossiês citados), Orfeu **consome o framework** (handoff Liceu → Orfeu) e, se virar persona conversável, o Caos encarna (com aprovação humana) sob o Orfeu. **Não há absorção dupla.**

### Casamento nulo com Aletheia/Pluto/Caliope/Argos
- **Aletheia** (discovery): psicologia *de validação* (Fitzpatrick/Bland/Maurya) — não é o clínico/Big Five do G15-G18.
- **Pluto** (oferta): Hormozi-only — não casa com psicologia clínica.
- **Caliope** (copy): mentes pontuais (Schwartz, Halbert, Cialdini…) — Caliope não absorve disciplina inteira; consome via framework.
- **Argos** (pesquisa de mercado): historiografia técnica (G9 longue durée, G10 anti-eurocentrismo) é metodologia de pesquisa, não método de coleta de mercado — fica em Liceu, e Argos pode consumir o framework quando houver pesquisa histórica/longitudinal.

**Veredito de roteamento:** **Liceu absorve 100% (5 dossiês de disciplina + 7 frameworks)**. Orfeu recebe **handoff**, não absorção: o framework `narratologia-comparada-fabula-sjuzhet-arco` mora em Liceu, e Orfeu o consome (já é parte do contrato de handoff documentado no `README.md` do Liceu).

## Decisão por ID (18 itens)

Convenções: **REUSE** = entidade equivalente existente, só linkar; **ADAPT** = entidade próxima, evoluir/enriquecer; **CREATE** = entidade nova; **HANDOFF** = capacidade entregue por outro squad via contrato.

### G1–G3 · academic-anthropologist (antropologia cultural)

| ID | capacidade | decisão | destino | justificativa |
|---|---|---|---|---|
| G1 | Antropólogo cultural ancorado em escolas (Lévi-Strauss/Geertz/Bourdieu/Mauss/Polanyi/Turner/van Gennep) | **CREATE** | `Liceu/mentes/disciplina-antropologia-cultural/dossie.md` (dossiê de disciplina) + 7 sub-mentes-âncora (Lévi-Strauss, Geertz, Bourdieu, Mauss, Polanyi, Turner, van Gennep) catalogadas em `indice-mestre.md` por referência | Liceu não tem disciplina catalogada; padrão hoje é mente individual. Cria-se o **eixo "disciplina"** com schema próprio derivado de `_modelo-dossie.md`. As 7 sub-mentes-âncora entram no índice como "pendentes de dissecação plena" — populadas conforme demanda. |
| G2 | Função-antes-da-estética (Durkheim/Malinowski) | **CREATE** | Framework `Liceu/frameworks/funcao-antes-da-estetica/framework.md` + `procedencia.md` | Princípio operacional de auditoria cultural; vira gate reutilizável por Aglaia (marca/cultura) e Caliope (copy culturalmente coerente) via handoff. |
| G3 | Rito de passagem em 3 estágios (van Gennep → Turner: separação→liminaridade→incorporação) | **CREATE** | Framework `Liceu/frameworks/rito-de-passagem-3-estagios/framework.md` + `procedencia.md` | Esqueleto operacional reusável; especialmente útil para Caliope (jornada do cliente em sequência de e-mail / VSL), Aglaia (marca como rito de passagem) e Pluto (onboarding como liminaridade). Handoff via framework. |

### G4–G6 · academic-geographer (geografia físico-humana)

| ID | capacidade | decisão | destino | justificativa |
|---|---|---|---|---|
| G4 | Geógrafo físico-humano ancorado em Köppen/Christaller/Mackinder/Diamond | **CREATE** | `Liceu/mentes/disciplina-geografia-fisico-humana/dossie.md` + 4 sub-mentes-âncora catalogadas | Idem antropologia. Domínio com aplicação nicho (estratégia de expansão geográfica, validação de TAM regional) — handoff a **Argos** quando houver pesquisa de mercado geográfica. |
| G5 | Construção bottom-up: tectônica → clima → hidrologia → biomas → assentamento | **CREATE** | Framework `Liceu/frameworks/worldbuilding-fisico-bottom-up/framework.md` + `procedencia.md` | Framework de "validação de coerência física"; uso fora-do-eixo, mas registrado por completude. Aplicação: prosa/narrativa/fiction quando houver demanda (alimenta Orfeu via handoff). |
| G6 | Regras invioláveis de hidrologia/clima (sombra de chuva, etc.) | **CREATE** | Anexo dentro de `worldbuilding-fisico-bottom-up/framework.md` (seção "Regras invioláveis") | Conteúdo profundamente acoplado a G5 — não merece arquivo próprio. Anexo. |

### G7–G10 · academic-historian (história/historiografia)

| ID | capacidade | decisão | destino | justificativa |
|---|---|---|---|---|
| G7 | Historiador-pesquisador (Annales, anti-eurocentrismo, cultura material com nível de confiança) | **CREATE** | `Liceu/mentes/disciplina-historiografia/dossie.md` + 1 sub-mente-âncora Braudel + escola Annales catalogada | Eixo de "disciplina" coerente; Annales (Braudel/Bloch/Febvre) entra como sub-mentes-âncora pendentes. |
| G8 | Etiqueta de confiança (Bem-documentado / Consenso / Em debate / Especulativo) + tipo de fonte | **ADAPT** | **Reforça** o gate de candura `LICEU-CL-001` (`Liceu/checklists/output-quality.md`) — anexar rótulos explícitos como **norma**, não só "fato × folclore" | O Liceu já tem o gate fato-vs-folclore, mas o quarteto explícito do upstream é **mais granular** que o binário atual. Evolui o checklist sem criar arquivo paralelo. |
| G9 | Longue durée (Braudel): estruturas longas → conjunturas → eventos | **CREATE** | Framework `Liceu/frameworks/longue-duree-3-camadas/framework.md` + `procedencia.md` | Framework operacional de **análise temporal**; útil para Argos (análise histórica de mercado), Themis (decisão estratégica de longo prazo), Metis (interpretação de métricas em camadas de tempo). Handoff via framework. |
| G10 | Anti-eurocentrismo proativo (Song, Mali como referência primária) | **ADAPT** | Princípio integrado em `LICEU-CL-001` + bloco dedicado em `disciplina-historiografia/dossie.md` (seção "Princípios invioláveis") | Diretriz transversal, não framework isolado. Vira norma cruzada nos dossiês de disciplina. |

### G11–G14 · academic-narratologist (narratologia)

| ID | capacidade | decisão | destino | justificativa |
|---|---|---|---|---|
| G11 | Narratólogo (Propp, Campbell/Vogler, Todorov, Genette, McKee, Snyder) | **CREATE** + **HANDOFF** | `Liceu/mentes/disciplina-narratologia/dossie.md` com 6 sub-mentes-âncora — 3 já-são-agentes em Orfeu (Campbell, Snyder em `blake-snyder.md` + indiretamente Vogler via Campbell) catalogados **por referência**, 3 novas pendentes (Propp, Todorov, Genette, McKee) | REUSE máximo: Campbell e Snyder já são personas em Orfeu — Liceu só indexa por referência (`persona_canonica: ../Orfeu/agents/joseph-campbell.md`, etc.). Propp/Todorov/Genette/McKee ficam pendentes de dissecação em Liceu (não viram personas em Orfeu até o Ronan pedir; aí vai pelo Caos). |
| G12 | Fabula × sjuzhet como gate diagnóstico (Genette) | **CREATE** | Framework `Liceu/frameworks/diagnostico-narrativo-fabula-sjuzhet/framework.md` + `procedencia.md` | Framework operacional de **diagnóstico** de história quebrada (eventos × como são contados). Consumido por Orfeu via handoff. |
| G13 | Arco de personagem em 5 pontos com want/need/lie/ghost (Vogler/Truby) | **CREATE** | Framework `Liceu/frameworks/arco-personagem-5-pontos/framework.md` + `procedencia.md` | Framework operacional acionável. Consumido por Orfeu (storytelling) e Caliope (arco do "cliente protagonista" em copy longa). Handoff. |
| G14 | Narratologia comparada (3 atos × kishōtenketsu × rasa) | **CREATE** | Framework `Liceu/frameworks/narratologia-comparada-3-tradicoes/framework.md` + `procedencia.md` | Framework de **anti-default ocidental**; força Orfeu/Caliope a confrontar 3 tradições antes de escolher. Consumido por handoff. |

### G15–G18 · academic-psychologist (psicologia clínica/pesquisadora)

| ID | capacidade | decisão | destino | justificativa |
|---|---|---|---|---|
| G15 | Psicólogo clínico/pesquisador (Big Five, apego/Bowlby, Vaillant, Beck, Karpman, Erikson) | **CREATE** | `Liceu/mentes/disciplina-psicologia-clinica/dossie.md` + 6 sub-mentes-âncora catalogadas (Bowlby, Vaillant, Beck, Karpman, Erikson + Costa & McCrae para Big Five) | Eixo "disciplina" com 6 sub-mentes pendentes. Distinta da `psicanalise-do-desejo` (Freud→Bernays→Dichter→Lacan) — esta é **psicologia clínica empírica**, não psicanálise aplicada ao consumo. As duas linhagens **co-existem** no Liceu. |
| G16 | Perfil psicológico multi-lente (Big Five + apego + defesa + ferida + coping + ponto cego) | **CREATE** | Framework `Liceu/frameworks/perfil-psicologico-multi-lente/framework.md` + `procedencia.md` | Framework de **construção de persona psicologicamente crível**. Consumido por: Aletheia (personas de discovery), Caliope (persona-leitor em copy), Aglaia (arquétipo de marca com camada psicológica), Pluto (segmentação por dor psicológica). Handoff. |
| G17 | Diversidade de respostas a trauma (hipervigilância / agradar / compartimentalizar / retração) | **ADAPT** | Seção dentro de `perfil-psicologico-multi-lente/framework.md` ("Respostas diversas a trauma") | Conteúdo profundamente acoplado ao framework G16 (é a quebra de clichê dentro do perfil); não merece arquivo próprio. |
| G18 | Dinâmica relacional (Karpman + análise transacional + contrato não-dito) | **CREATE** | Framework `Liceu/frameworks/dinamica-relacional/framework.md` + `procedencia.md` | Framework de **dinâmica de duas mentes** (cliente × marca, cliente × atendimento, líder × time). Consumido por Caliope (copy "conversa"), Pluto (oferta como pacto), Hestia (atendimento como dinâmica). Handoff. |

## Resumo numérico

| Destino | Decisão | Count | IDs |
|---|---|---|---|
| Liceu (dossiês de disciplina) | CREATE | 5 | G1, G4, G7, G11, G15 |
| Liceu (frameworks operacionais) | CREATE | 7 | G2, G3, G5, G9, G12, G13, G14, G16, G18 (G6 e G17 são anexos, não novos arquivos) |
| Liceu (anexo embutido em framework existente desta absorção) | CREATE (anexo) | 2 | G6 (anexo de G5), G17 (anexo de G16) |
| Liceu (evolução de gate/checklist existente) | ADAPT | 2 | G8, G10 |
| **Total** | — | **18** | G1–G18 |

> **PERDIDO = 0.** Conferido contra a regra do `protocolo-de-absorcao-sem-perda`: `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(inventário)` → `18 + 0 + 0 == 18` ✓.

## Dispersão e handoff (sem absorção dupla)

A dispersão (Caliope/Orfeu/Aletheia/Pluto/Argos/Themis/Metis/Aglaia/Hestia) acontece **por handoff via framework**, não por absorção de skill em squad terceiro. O conhecimento mora no Liceu (regra federada: `indice-mestre.md` aponta para o canônico). Os squads consomem:

| Framework Liceu | Squads que consomem (via handoff documentado) |
|---|---|
| `funcao-antes-da-estetica` | Aglaia (marca/cultura), Caliope (copy culturalmente coerente) |
| `rito-de-passagem-3-estagios` | Caliope (sequência de e-mail/VSL como jornada), Aglaia (marca como rito), Pluto (onboarding como liminaridade) |
| `worldbuilding-fisico-bottom-up` (+ anexo G6) | Orfeu (fiction/prosa) |
| `longue-duree-3-camadas` | Argos (análise histórica de mercado), Themis (estratégia longo prazo), Metis (métricas em camadas) |
| `diagnostico-narrativo-fabula-sjuzhet` | Orfeu (diagnóstico de história quebrada) |
| `arco-personagem-5-pontos` | Orfeu, Caliope (cliente-protagonista em copy longa) |
| `narratologia-comparada-3-tradicoes` | Orfeu, Caliope |
| `perfil-psicologico-multi-lente` (+ anexo G17) | Aletheia (personas discovery), Caliope (persona-leitor), Aglaia (arquétipo+psicológico), Pluto (segmentação por dor) |
| `dinamica-relacional` | Caliope ("copy conversa"), Pluto (oferta como pacto), Hestia (atendimento) |

Os squads-consumidores **não absorvem** o framework como skill — eles **chamam o Liceu** quando o gatilho aparece (gate documentado na seção "Handoffs" do `Liceu/README.md`).

## Aplicação concreta (referência para F5)

Estrutura final no Liceu após F5 (ainda não escrever, só plano):

```
Liceu/
├── mentes/
│   ├── _modelo-dossie.md             ← (existente; pode precisar de variante para disciplina)
│   ├── edward-bernays/               ← (existente)
│   ├── ernest-dichter/               ← (existente)
│   ├── jacques-lacan/                ← (existente)
│   ├── disciplina-antropologia-cultural/dossie.md            ← G1 (CREATE)
│   ├── disciplina-geografia-fisico-humana/dossie.md         ← G4 (CREATE)
│   ├── disciplina-historiografia/dossie.md                  ← G7 (CREATE; bloco G10 embutido)
│   ├── disciplina-narratologia/dossie.md                    ← G11 (CREATE; sub-mentes 3 por referência ao Orfeu)
│   └── disciplina-psicologia-clinica/dossie.md              ← G15 (CREATE)
├── frameworks/
│   ├── matriz-de-desejo-inconsciente/                       ← (existente)
│   ├── funcao-antes-da-estetica/                            ← G2 (CREATE)
│   ├── rito-de-passagem-3-estagios/                         ← G3 (CREATE)
│   ├── worldbuilding-fisico-bottom-up/                      ← G5 (CREATE; G6 = anexo interno)
│   ├── longue-duree-3-camadas/                              ← G9 (CREATE)
│   ├── diagnostico-narrativo-fabula-sjuzhet/                ← G12 (CREATE)
│   ├── arco-personagem-5-pontos/                            ← G13 (CREATE)
│   ├── narratologia-comparada-3-tradicoes/                  ← G14 (CREATE)
│   ├── perfil-psicologico-multi-lente/                      ← G16 (CREATE; G17 = anexo interno)
│   └── dinamica-relacional/                                 ← G18 (CREATE)
├── checklists/
│   └── output-quality.md             ← ADAPT G8 (rótulos 4-graus) + ADAPT G10 (anti-eurocentrismo como norma)
├── indice-mestre.md                  ← atualizar com as 5 disciplinas + sub-mentes-âncora pendentes
└── indice.yaml                       ← idem (machine-readable)
```

## Risco e gotchas

1. **Risco de explosão do registro** — 5 disciplinas × ~6 sub-mentes-âncora = ~30 mentes pendentes no `indice.yaml`. Mitigação: catalogar como `status: pendente-dissecacao` e popular sob demanda (não dissecar todas agora).
2. **Risco de overlap com `psicanalise-do-desejo`** — a linhagem existente (Freud/Bernays/Dichter/Lacan) é **distinta** de `disciplina-psicologia-clinica` (Bowlby/Vaillant/Beck/Karpman/Erikson). Liceu precisa documentar a fronteira no `linhagens/indice-de-linhagens.yaml`.
3. **Risco de invasão de jurisdição** — frameworks de psicologia (G16, G18) podem soar como skill de Aletheia/Caliope. Mitigação: contrato de handoff explícito (Liceu produz, squad-X consome via gatilho documentado).
4. **Dossiê de disciplina vs dossiê de mente** — Liceu hoje só tem schema de mente individual (`_modelo-dossie.md`). A absorção exige um **schema-variante** para disciplina (ou um adendo ao schema existente). F5 propõe variante explícita.

## Estado atual e próximo passo

- Esta F4 está completa: 18/18 IDs decididos, PERDIDO=0, handoffs mapeados.
- **F5** (próximo arquivo) escreve a **decisão executável** com checklist N0→N6, gates aplicáveis, e ordem de criação por dependência.
- A aplicação (F6) **não** está no escopo deste arquivo — fica para sessão Caos dedicada por causa do volume (5 dossiês + 7 frameworks + 2 ADAPTs + 2 anexos = ~14 arquivos novos + 2 evoluídos).
