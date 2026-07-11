---
task: buildNarrative()
responsavel: "@story-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: story_concept
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: genre_or_context
    tipo: string
    origem: User Input
    obrigatorio: false

Saida:
  - campo: narrative_structure
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Framework selecionado com justificativa"
  - "[ ] Todos os beats estruturais definidos e preenchidos"
  - "[ ] Arco emocional mapeado do início ao fim"
tipo: nota
area: Orfeu
up: "[[Orfeu/_MOC-orfeu]]"
relacionado:
  - "[[Orfeu/tasks/_indice|_indice]]"
---

# Task: Criação de Estrutura de História

**Task ID:** STORY-001
**Version:** 1.0.0
**Command:** `*build-narrative`
**Agent:** Story Chief (story-chief) roteia para Campbell, Snyder ou Harmon
**Purpose:** Construir uma estrutura narrativa completa usando o framework de narrativa mais apropriado.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `story_concept` | Prompt do usuário | SIM |
| `genre_or_context` | Descrição do usuário | PREFERENCIAL |
| `target_audience` | Especificação do usuário | PREFERENCIAL |
| `format` | Filme, TV, livro, apresentação, marca | NÃO |
| `existing_material` | Rascunho, esboço, notas | NÃO |
| `preferred_framework` | Hero's Journey, Beat Sheet, Story Circle | NÃO |

## Pré-condições

1. Conceito ou ideia da história é fornecido (mesmo bruto/incompleto está ok)
2. Existe ao menos uma noção geral do público pretendido ou propósito
3. O catálogo de frameworks narrativos está acessível

## Fases de Execução

### Fase 1: Identificar o Framework (story-chief)

1. Analisar o conceito da história — tema, gênero, escala, núcleo emocional
2. Determinar a melhor correspondência de framework:
   - **Hero's Journey (Campbell)** — Transformações épicas, escala mítica, personagens arquetípicos
   - **Beat Sheet (Snyder)** — Roteiros comerciais, enredo apertado, estrutura amigável ao público
   - **Story Circle (Harmon)** — Episódios de TV, arcos centrados em personagem, jornadas relacionáveis
3. Se o usuário especificou um framework, honre a preferência
4. Se não houver preferência, recomende com justificativa e confirme antes de prosseguir
5. Roteie para o agente especialista apropriado

### Fase 2: Construir a Estrutura

**Se Hero's Journey (joseph-campbell):**
1. Definir o Ordinary World — estabelecer o normal antes da ruptura
2. Identificar o Call to Adventure — o que rompe o status quo
3. Mapear o Threshold Crossing — compromisso com a jornada
4. Projetar Tests, Allies, and Enemies — a aventura se desenrola
5. Elaborar o Ordeal — a crise central e a transformação
6. Definir o Reward, Road Back e Resurrection
7. Fechar com Return with the Elixir — transformação completa

**Se Beat Sheet (blake-snyder):**
1. Opening Image — tese visual do mundo antes
2. Theme Stated — a lição que a história vai ensinar
3. Set-Up, Catalyst, Debate — introdução até o compromisso
4. Break into Two — o herói entra no mundo de cabeça para baixo
5. B Story, Fun and Games — a promessa da premissa
6. Midpoint, Bad Guys Close In — as apostas escalam
7. All Is Lost, Dark Night of the Soul — o ponto mais baixo
8. Break into Three, Finale — a solução e o clímax
9. Final Image — antítese visual mostrando a transformação

**Se Story Circle (dan-harmon):**
1. YOU — Estabelecer o personagem em sua zona de conforto
2. NEED — Algo está faltando ou é desejado
3. GO — Ele entra em uma situação desconhecida
4. SEARCH — Ele se adapta e luta
5. FIND — Ele consegue o que queria
6. TAKE — Mas paga um preço alto
7. RETURN — Ele volta ao familiar
8. CHANGE — Ele é transformado pela experiência

### Fase 3: Desenvolver os Beats

1. Para cada beat estrutural, definir:
   - A cena ou momento (o que acontece)
   - O estado emocional do protagonista
   - O conflito ou tensão presente
   - Como se conecta ao tema
2. Identificar o arco emocional — mapear a progressão de sentimento do início ao fim
3. Garantir apostas crescentes — cada beat aumenta a tensão
4. Verificar a integração do tema — cada beat reforça a mensagem central

### Fase 4: Revisar o Arco

1. Verificar a completude — sem lacunas estruturais ou beats ausentes
2. Verificar a coerência emocional — o arco parece natural e conquistado
3. Testar a transformação — o final parece satisfatório e inevitável?
4. Avaliar o ritmo — nenhum beat se demora demais ou apressa demais
5. Confirmar o alinhamento com o público — isto vai ressoar com o público-alvo?
6. Fornecer notas de revisão para quaisquer pontos fracos

## Formato de Saída

```yaml
narrative_structure:
  concept: "{story concept}"
  framework: "Hero's Journey | Beat Sheet | Story Circle"
  specialist: "joseph-campbell | blake-snyder | dan-harmon"
  genre: "{identified genre}"
  theme: "{central theme}"
  protagonist:
    name: "{character}"
    starting_state: "{before transformation}"
    ending_state: "{after transformation}"
  beats:
    - beat_number: 1
      name: "{beat name}"
      description: "{what happens}"
      emotional_state: "{feeling}"
      conflict: "{tension}"
      theme_connection: "{how it ties to theme}"
  emotional_arc: "{description of emotional journey}"
  pacing_notes: "{rhythm and tempo observations}"
  revision_suggestions: ["{areas to strengthen}"]
```

## Condições de Veto

- **NUNCA** force um framework que não se encaixa na natureza da história
- **NUNCA** pule beats ou elementos estruturais — todo framework exige completude
- **NUNCA** ignore o arco emocional em favor da mecânica de enredo
- **NUNCA** construa estrutura sem conectar cada beat ao tema
- **NUNCA** presuma o formato — confirme com o usuário quando ambíguo

## Critérios de Conclusão

- [ ] Framework selecionado com justificativa (ou preferência do usuário honrada)
- [ ] Todos os beats estruturais definidos e preenchidos
- [ ] Arco emocional mapeado do início ao fim
- [ ] Tema integrado em cada beat
- [ ] Ritmo avaliado e equilibrado
- [ ] Arco revisado quanto à completude e coerência
- [ ] Sugestões de revisão fornecidas para áreas fracas
