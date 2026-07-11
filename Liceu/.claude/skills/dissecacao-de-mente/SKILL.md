---
name: dissecacao-de-mente
description: Disseca o cérebro de um especialista/pensador (por NOME) ou de uma linhagem inteira (por TEMA/descoberta) e produz o dossiê estruturado do Liceu — separando engenharia documentada de mito/folclore, mapeando linhagens (herdou_de/influenciou) e expondo o gancho de operacionalização. Use quando o pedido for "disseca a mente de X", "estuda o cérebro de Y", "encontrei essa linhagem nos estudos: Z", "quem influenciou W". Aplica pesquisa citada (deep-research/tech-search; escala ao motor do Argos) e o veto de candura: nada vira fato sem fonte primária + ano.
tipo: skill
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Dissecação de Mente

Especialista responsável: orquestra `liceu-chief`; executam `biografo`, `cartografo-de-modelos`,
`ceptico-verificador`, `lexicografo`, `genealogista`, `bibliotecario` (e `sintetizador` no gancho).

O pipeline transforma **um nome** OU **um tema/descoberta** em um dossiê 100% citado no schema de
`mentes/_modelo-dossie.md`, com fato e folclore separados e a linhagem mapeada. Para uma linhagem,
roda em **fan-out** (uma passada por mente) e fecha com um arquivo de linhagem.

## Quando usar
- "Disseca a mente do Ernest Dichter." → escopo NOME.
- "Encontrei essa linhagem: Freud → Bernays → Dichter → Lacan → Jung → Gruen → Barthes." → escopo TEMA/LINHAGEM (fan-out).
- "Quem influenciou o Eugene Schwartz e o que ele realmente provou?" → NOME + linhagem.
- NÃO use para pesquisa de mercado/concorrente (→ Argos) nem para criar agente conversável (→ ponte-de-encarnacao + Caos).

## Pipeline (9 fases)

| Fase | Nome | Ação | Dono | Reuso |
|------|------|------|------|-------|
| **0** | Registro | A mente já existe (agente num squad ou dossiê em `mentes/`)? Aplica REUSE > ADAPT > CREATE. Se existe, vai para ENRIQUECIMENTO por referência — não recria. | bibliotecario | `indice.yaml` + `consulta-ao-registro` |
| **1** | Escopo | Nome único ou tema? Se tema, decompõe em mentes-candidatas + a linhagem que as une. Define o objetivo (dissecar / genealogia / framework). | liceu-chief | — |
| **2** | Pesquisa citada | Levanta biografia, obras-fonte (com ANO) e frameworks. Cada afirmação com fonte. Fan-out por mente numa linhagem. | biografo + cartografo-de-modelos | `deep-research` / `tech-search`; escala ao motor do Argos p/ fontes hostis |
| **3** | Fato × folclore | Verificação adversarial: classifica cada afirmação como DOCUMENTADO (fonte primária + ano) vs. FOLCLORE/DISPUTADO/REFUTADO. **Veto: nada vira fato sem fonte.** | ceptico-verificador | gate LICEU-CL-001 |
| **4** | Extração | Destila mental_models, princípios, vocabulário-assinatura, "o que rejeitaria" e "Como X Opera". | cartografo-de-modelos + lexicografo | — |
| **5** | Linhagem | Mapeia herdou_de / influenciou; cria/atualiza `linhagens/<slug>.md` + `linhagens/indice-de-linhagens.yaml`. **Veto: nenhum dossiê sem linhagem.** | genealogista | skill `mapeamento-de-linhagem` |
| **6** | Redação | Preenche `mentes/<id>/dossie.md` no schema de `_modelo-dossie.md`. | liceu-chief (consolida) | template |
| **7** | Indexação | Adiciona linha em `indice-mestre.md` + entrada em `indice.yaml`; registra em `registro-de-entidades.yaml`. | bibliotecario | padrão `sobre-a-empresa/Ferramentas/` |
| **8** | Gancho | Sinaliza se a mente (ou a linhagem) deve disparar `sintese-de-framework`. Prepara handoff. | liceu-chief | skill `sintese-de-framework` |

## Saída
- `mentes/<id>/dossie.md` por mente (schema de `_modelo-dossie.md`).
- Para tema/linhagem: vários dossiês + `linhagens/<slug>.md` + arestas no índice de linhagens.
- Entrada em `indice-mestre.md` e `indice.yaml`.
- (Se o gancho disparar) handoff à `sintese-de-framework`.

## Vetos (HALT)
- `VETO_FATO_SEM_FONTE` — afirmação factual em §3 sem fonte primária + ano → rebaixa para §4 (folclore) ou descarta.
- `VETO_SEM_LINHAGEM` — dossiê sem tentativa de herdou_de/influenciou (ou "isolado" justificado) → HALT.
- `VETO_DUPLICACAO` — mente já dissecada/agente → enriquece por referência (`persona_canonica`), nunca recria nem move.
- `VETO_FONTE_INVENTADA` — fabricar obra/ano/autor → proibido; admitir a lacuna é a saída correta.

## Anti-padrão
- Copiar a Wikipédia como verdade: toda afirmação passa pelo `ceptico-verificador` antes de virar §3.
- Forçar uma linhagem onde não há: zeitgeist (mesma época) não é discipulado — rotule "isolado" se for o caso.
- Dissecar uma mente que já é agente recriando-a: na Fase 0, enriqueça por referência.
- Misturar a anedota bonita com o fato: §3 e §4 são mundos separados.
