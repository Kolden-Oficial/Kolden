---
# ─────────────────────────────────────────────────────────────────────────────
# MODELO DE DOSSIÊ DE MENTE — Liceu (Biblioteca de Mentes da Kolden)
# Copie este arquivo para mentes/<id>/dossie.md e preencha. id em kebab-case.
# Schema expandido a partir do padrão real_person (ver Aletheia/agents/steve-blank.md),
# com as adições do Liceu: linhagem bidirecional, fato×folclore separados, "o que rejeitaria",
# gancho de operacionalização, e ano obrigatório em toda obra-fonte.
# ─────────────────────────────────────────────────────────────────────────────
id: <kebab-case>                      # ex.: ernest-dichter
nome: "<Nome Completo>"
titulo: "<epíteto / o que a mente é>"  # ex.: "Pai da Pesquisa Motivacional"
dominio: [<dominio-1>, <dominio-2>]    # ex.: [marketing, psicanalise, comportamento-do-consumidor]
status: em-disseccao                   # em-disseccao | rascunho | vigente | arquivado
atualizado-em: AAAA-MM-DD
real_person: true
nascimento: "<ano — local>"            # ex.: "1907 — Viena, Áustria"
morte: "<ano — local | null>"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [<id-mente>, ...]           # de quem herdou ideias (ou [] / "isolado")
influenciou: [<id-mente>, ...]         # a quem influenciou
contemporaneos: [<id-mente>, ...]
linhagens: [<slug-linhagem>]           # FK para linhagens/<slug>.md
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [<slug-framework>]  # FK para frameworks/<slug>/
squads_que_usam: [<squad>, ...]        # ex.: [caliope, aglaia, peitho]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: <../Squad/agents/<id>.md | null>  # se a mente JÁ é agente num squad, aponte aqui (não duplicar)
confianca_da_fonte: <alta | media | baixa>          # média ponderada das afirmações do corpo
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/mentes/_modelo-dossie-disciplina|_modelo-dossie-disciplina]]"
---

# <Nome Completo> — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
<A ideia-mãe da mente, em uma frase. Preenchido por biografo + cartografo-de-modelos.>

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:** <mente(s)> — <o quê herdou e por qual via (leu / foi aluno / citou), com fonte ou rótulo "inferida">.
- **Transmitiu a:** <mente(s)> — <o quê influenciou>.
- **Posição na linhagem `<slug>`:** elo <n> de <N>.
- *(Se não há linhagem clara: "Isolado — <justificativa honesta>".)*

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  <nome_do_modelo>:
    descricao: "<o que é>"
    estrutura: [<passos/elementos>]
    fonte: "<obra primária>"
    ano: <ano>
obras_fonte:
  - titulo: "<Título da Obra>"
    ano: <ano>            # ANO OBRIGATÓRIO
    tipo: primaria        # primaria (do próprio autor) | secundaria
    o_que_traz: "<o que esta obra estabelece>"
principios_verificados:
  - texto: "<princípio/lei que guia a mente>"
    fonte: "<obra — ano>"
    rotulo: DOCUMENTADO   # DOCUMENTADO | PLAUSÍVEL (ver §4 se não for documentado)
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| <anedota célebre> | FOLCLORE | <citada à exaustão, evidência primária fraca/ausente> |
| <"fato" desmentido> | REFUTADO | <fonte confiável que contradiz> |
| <atribuição duvidosa> | DISPUTADO | <fontes em conflito> |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- <premissa/prática que a mente combateria, com base no que defendeu>
- ...

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "<termo>" | <onde aparece / o que significa na boca da mente> |

**Padrões linguísticos:** <como argumenta, repete, provoca — ou "estilo inferido" se sem fonte>.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `<slug-framework>` (passo <n>: "<o que injeta>").
- **Squads que consomem:** <Caliope / Aglaia / Peitho / Pluto…> — <para quê>.
- **Pergunta operacional que injeta no fluxo:** "<a pergunta que esta mente força a equipe a fazer>".

## 8. Como <Nome> Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. ...
2. ...
<até 8-10>

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
