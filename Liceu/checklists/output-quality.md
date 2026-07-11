---
tipo: checklist
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Checklist de Candura de Saída — Liceu (Biblioteca de Mentes)

**ID do Checklist:** LICEU-CL-001
**Referenciado por:** .claude/skills/dissecacao-de-mente/SKILL.md, agents/liceu-chief.md (gate de candura), agents/ceptico-verificador.md (dono operacional)
**Propósito:** Validar todo dossiê, linhagem ou framework antes da entrega — e, acima de tudo, impedir
que folclore seja apresentado como fato, que uma mente saia sem linhagem, ou que um framework seja
sintetizado sem procedência rastreável.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida saídas de dissecação de mentes e síntese de frameworks.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não-críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL). Qualquer CRITICAL desmarcado = REPROVADO.]]

---

## 1. Candura factual (fato × folclore)

- [ ] Toda afirmação na §3 "Engenharia documentada" tem FONTE PRIMÁRIA + ANO (CRITICAL)
- [ ] Fato (§3) e folclore (§4) estão em SEÇÕES SEPARADAS — nunca misturados no mesmo bloco (CRITICAL)
- [ ] Toda atribuição célebre sem fonte primária foi rebaixada para §4 com rótulo (FOLCLORE / DISPUTADO / REFUTADO) (CRITICAL)
- [ ] Nenhuma fonte/obra/ano foi inventada ou "arredondada" — lacunas foram admitidas como "não confirmado" (CRITICAL)
- [ ] Cada afirmação carrega rótulo de confiança (DOCUMENTADO / PLAUSÍVEL / DISPUTADO / FOLCLORE / REFUTADO)
- [ ] Anedotas de marketing célebres foram explicitamente avaliadas, não copiadas como fato

### Rótulo 4-graus de candura (G8, absorvido de msitarzewski/agency-agents@a597cb6, MIT)

Toda afirmação histórica/disciplinar carrega rótulo explícito:
- **Bem-documentado:** fonte primária + ano + ≥2 consensos secundários
- **Consenso acadêmico:** majoritário entre fontes secundárias, mas debate periférico
- **Em debate:** divergência ativa entre escolas/pesquisadores
- **Especulativo:** sem suporte robusto; sinalizar como hipótese ou folclore

Tipo de fonte (cite explicitamente quando aplicável): primária > secundária > popular > ficcional/Hollywood.

Mapeamento entre o rótulo 4-graus (acima) e o rótulo 5-graus da §1 do checklist:
- **Bem-documentado** ⇄ **DOCUMENTADO**
- **Consenso acadêmico** ⇄ **CONSENSO_ACADEMICO** (rótulo novo para disciplinas, distinto de PLAUSÍVEL)
- **Em debate** ⇄ **DISPUTADO** / **EM_DEBATE**
- **Especulativo** ⇄ **FOLCLORE** (popular) ou **PLAUSÍVEL** (inferência sustentada mas não documentada)

Disciplinas usam preferencialmente o 4-graus; mentes individuais mantêm o 5-graus existente. Ambos convivem.

### Anti-eurocentrismo como norma transversal (G10, absorvida de msitarzewski/agency-agents@a597cb6, MIT)

Em dossiês de disciplina (historiografia, antropologia, geografia, narratologia), incluir referências não-ocidentais (Song, Mali, dinastias asiáticas, narrativas indígenas, etc.) **como referência primária**, não apêndice/curiosidade. Disciplinas formadas só com cânone ocidental falham o gate.

Critério operacional para o ceptico-verificador:
- [ ] Dossiê de disciplina inclui ≥1 escola/obra/sub-mente fora do cânone ocidental — ou justifica explicitamente por que a disciplina é estritamente ocidental no recorte (raríssimo: ex.: estudos sobre literatura medieval francesa).
- [ ] Caricaturas etnocêntricas ("antropólogo estuda tribo", "história universal = história europeia") foram explicitamente rebaixadas a §5/folclore.

## 2. Datação e atribuição

- [ ] Toda obra-fonte está DATADA (ano) (CRITICAL)
- [ ] A datação foi cruzada com a biografia para flagrar anacronismo / atribuição errada
- [ ] Obra primária (do próprio autor) está distinguida de obra secundária

## 3. Linhagem

- [ ] O dossiê tem LINHAGEM (herdou_de / influenciou) OU rótulo "isolado" justificado (CRITICAL)
- [ ] Cada aresta de influência tem fonte (leu/foi aluno/citou) ou rótulo "influência inferida"
- [ ] Influência direta está distinguida de zeitgeist (mesma época, sem contato comprovado)
- [ ] O grafo em linhagens/indice-de-linhagens.yaml é consistente com os campos herdou_de/influenciou do dossiê

## 4. Operacionalização (quando há framework)

- [ ] Todo passo do framework tem PROCEDÊNCIA rastreada à mente + obra de origem (procedencia.md) (CRITICAL quando há framework)
- [ ] O framework só consome dossiês VERIFICADOS (não folclore)
- [ ] Cada passo é ACIONÁVEL (um operador da Kolden consegue executá-lo), não apenas teórico
- [ ] O handoff nomeia o squad de destino (Caliope / Aglaia / Peitho / Pluto)

## 5. Federação do acervo (não-duplicação)

- [ ] Mente que já é agente num squad foi indexada por REFERÊNCIA (persona_canonica), nunca movida nem duplicada (CRITICAL)
- [ ] O caminho-canonico em indice.yaml aponta para um arquivo que EXISTE (verificado)
- [ ] A entrada no índice mestre é consistente com o dossiê e a linhagem

## 6. Encarnação (quando aplicável)

- [ ] Nenhum agente conversável foi criado dentro do Liceu — só preparado o brief de encarnação (CRITICAL quando há pedido de encarnar)
- [ ] O handoff ao Caos está explícito e marcado como dependente de aprovação humana do PRD

## 7. Segurança

- [ ] Nenhum segredo/credencial em texto puro — tudo via Infisical (CRITICAL)

---

## O GATE INVIOLÁVEL (veto de candura)

> **REPROVADO automático — HALT** se QUALQUER um ocorrer:
> **(a)** alguma afirmação na §3 "Engenharia documentada" sem fonte primária + ano;
> **(b)** fato e folclore misturados no mesmo bloco, ou folclore apresentado como fato;
> **(c)** dossiê entregue sem linhagem (nem rótulo "isolado" justificado);
> **(d)** framework sintetizado sem procedencia.md citando as mentes de origem;
> **(e)** persona de squad movida/duplicada em vez de indexada por referência;
> **(f)** agente conversável criado dentro do Liceu (em vez de handoff ao Caos);
> **(g)** fonte/obra/ano inventada, ou credencial em texto puro.
> Neste caso, devolva à fase de origem (ceptico-verificador / genealogista / sintetizador) para corrigir.

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 reprovações não-críticas.
**REVISAR:** Todos os itens CRÍTICOS [x] mas 3+ reprovações não-críticas.
**REPROVADO:** Qualquer item CRÍTICO desmarcado, ou o GATE INVIOLÁVEL acionado.
