---
name: visuais-inclusivos-anti-vies
description: Use sempre que houver geração de imagem com sujeitos humanos OU representação de papéis sociais (profissionais, famílias, cenários comunitários) — "imagem com pessoas", "viés em imagem IA", "counter-stereotype", "representação inclusiva", "modelo de IA está gerando só X", "review da imagem antes de publicar", "checklist de inclusão". Combina counter-stereotype prompting (contra defaults enviesados do modelo) + physical reality mandates (anatomia correta) + negative prompting (lista de exclusões) + checklist sociological audit pós-geração. Skill-IRMÃ obrigatória da engenharia-de-prompt-de-imagem quando o subject for humano. NÃO é só "diversidade visual" — é responsabilidade editorial sobre o que a marca coloca no mundo.
domain: design
subdomain: ethical-ai-imagery
agente_primario: [aglaia-chief]
tags: [bias-mitigation, inclusive-imagery, counter-stereotype, sociological-audit, negative-prompting]
fonte_upstream: msitarzewski/agency-agents@a597cb6 (design/, MIT)
status: semente
---

> **Atribuição:** semente adaptada de `msitarzewski/agency-agents@a597cb6` (MIT, divisão `design/`). Reescrita em PT-BR, sem cópia literal.

# Visuais Inclusivos — Anti-Viés em IA Generativa

Modelos generativos têm viés de treino. Quando você pede "CEO", a maioria devolve homem branco de meia-idade. Quando pede "enfermeira", mulher jovem. Quando pede "engenheiro", homem com óculos. Não publicar isso por descuido é trabalho.

Esta habilidade é a skill-irmã da `engenharia-de-prompt-de-imagem` — invoque as duas juntas sempre que o sujeito for humano.

## Três frentes operacionais

---

## Frente 1 — Counter-stereotype + physical reality mandates

### Counter-stereotype prompting
O modelo tem um **default oculto** para cada papel. O prompt precisa ser **explícito** contra ele:

| Pedido genérico | Default oculto provável | Prompt explícito |
|---|---|---|
| "CEO" | homem branco 50+ | "CEO mulher negra, 40 anos" |
| "engenheira de software" | homem branco/asiático jovem | "engenheira de software mulher latina, 35 anos" |
| "médico de família" | homem branco meia-idade | "médica de família, mulher indígena, 45 anos" |
| "casal" | hetero, branco, jovem | "casal de mulheres, uma negra, uma latina, 30s" |
| "família" | mãe + pai + 2 filhos brancos | "família — duas mães, um filho adolescente, etnicamente diversa" |

**Regra:** se você não declarar, o modelo declara por você — e ele sempre declara o default.

### Physical reality mandates
Modelos erram anatomia. Sempre instruir:
- Mãos com 5 dedos cada (não 6, não 4).
- Olhos simétricos.
- Membros proporcionais.
- Sem fusão de objetos no fundo com o sujeito.

**Sintaxe (Midjourney/Flux):** incluir no prompt positivo "anatomia humana correta, mãos com cinco dedos cada, olhos simétricos".

---

## Frente 2 — Negative prompting

Lista de **exclusões obrigatórias** que vai para o negative prompt do modelo:

```
--no clone-face        # previne faces idênticas em grupos
--no gibberish-text    # previne texto borrado/falso em placas, livros, telas
--no extra fingers     # anatomia das mãos
--no extra limbs       # membros extras
--no fused bodies      # corpos sobrepostos/fundidos
--no impossible perspective  # espaço inconsistente (escadas Escher acidentais)
--no warped face       # rostos distorcidos no plano de fundo
--no plastic skin      # pele com aparência de boneco (over-smoothing)
--no uncanny valley    # expressões "quase humanas" desconfortáveis
```

**Para SD/Flux** (que aceitam negative prompt completo):
```
negative_prompt: "deformed hands, six fingers, extra limbs, fused fingers, asymmetric eyes, plastic skin, blurred text, clone faces, identical faces, distorted perspective, uncanny valley"
```

**Para Midjourney:** usar `--no` com termos separados por vírgula.

---

## Frente 3 — Review pós-geração (checklist sociological audit)

**Toda imagem gerada com pessoas passa por este checklist antes de publicar.** Não opcional.

### Representação
- [ ] **Étnica** adequada ao contexto e ao público real da marca?
- [ ] **Gênero** representado em papéis que historicamente foram atribuídos só a um gênero?
- [ ] **Idade** diversificada — não só 25-35? (idosos, crianças quando contexto pede)
- [ ] **Habilidade física** — corpos não-normativos representados? (cadeira de rodas, próteses, neurodivergência visível)
- [ ] **Tipo corporal** — variedade real? (não só padrão fitness/magro)

### Cultural
- [ ] **Geografia/cultura** respeitada — não exoticização nem caricatura?
- [ ] **Roupa tradicional** usada em contexto adequado (não como fantasia decorativa)?
- [ ] **Símbolos religiosos/culturais** com permissão de uso pelo contexto?

### Editorial
- [ ] A pessoa é **sujeito** ou **acessório decorativo**? (se só decorativa, refazer)
- [ ] Há **estereótipo profissional** sendo reforçado mesmo sem intenção?
- [ ] A imagem **resiste a leitura adversarial** (alguém mal-intencionado tira screenshot — ainda passa)?

### Validação comunitária (quando representação é sensível)
- [ ] Representação de comunidade indígena, quilombola, LGBTQIA+, pessoa com deficiência? **Handoff stakeholder** — alguém da comunidade revisa antes de publicar.
- [ ] Marca tem programa de embaixadores/conselho? Acionar antes da publicação.

---

## Anti-padrões

- **Usar imagem gerada sem revisão.** Publicação de viés latente. Inegociável.
- **Counter-stereotype como tokenismo.** 1 imagem com pessoa negra entre 20 com defaults brancos = pior que assumir o viés.
- **Ignorar feedback da comunidade representada.** Se a comunidade aponta erro, é erro — não importa a intenção.
- **Anatomia errada que "ninguém percebe".** Você percebe. Refaz.
- **Negative prompt esquecido.** Modelo sem negative prompt = roleta-russa de mãos com 6 dedos.

## Cross-links
- **engenharia-de-prompt-de-imagem** — skill-irmã. Invocar as duas juntas para sujeitos humanos.
- **Harmonia/julgamento-estetico-anti-slop** — anti-slop ESTÉTICO (qualidade visual) é complementar ao anti-viés SOCIOLÓGICO (representação). Uma imagem pode ser linda e enviesada; pode ser correta e slop. Os dois filtros rodam.
- **pipeline-de-identidade-de-marca** Fase 1/2 — valores da marca informam o nível de rigor desta checklist.

## Saída padrão
Para cada imagem gerada de pessoas: prompt revisado (com counter-stereotype) + negative prompt completo + checklist preenchido (formato sim/não/N/A) + flag de "precisa validação comunitária" quando aplicável.
