---
task: analyzeStory()
responsavel: "@shawn-coyne"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: story_text
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: intended_genre
    tipo: string
    origem: User Input
    obrigatorio: false

Saida:
  - campo: story_analysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Gênero identificado com valor central e cenas obrigatórias"
  - "[ ] Todas as cenas mapeadas com pontos de virada e mudanças de valor"
  - "[ ] Problemas diagnosticados e priorizados com prescrições"
tipo: nota
area: Orfeu
up: "[[Orfeu/_MOC-orfeu]]"
relacionado:
  - "[[Orfeu/tasks/_indice|_indice]]"
---

# Task: Análise de História (Story Grid)

**Task ID:** STORY-004
**Version:** 1.0.0
**Command:** `*analyze-story`
**Agent:** Shawn Coyne (shawn-coyne)
**Purpose:** Analisar uma história usando a metodologia Story Grid para diagnosticar problemas estruturais e emocionais.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `story_text` | Usuário fornece rascunho, esboço ou descrição | SIM |
| `intended_genre` | Especificação do usuário | PREFERENCIAL |
| `target_audience` | Descrição do usuário | NÃO |
| `specific_concerns` | O que o autor acha que está errado | NÃO |
| `story_format` | Romance, roteiro, conto, episódio | NÃO |

## Pré-condições

1. Material da história existe (rascunho completo, rascunho parcial ou esboço detalhado)
2. Conteúdo suficiente para identificar convenções de gênero e padrões estruturais
3. Os dados do framework Story Grid estão acessíveis

## Fases de Execução

### Fase 1: Identificar o Gênero

1. Determinar o gênero de conteúdo — Action, Horror, Love, Performance, Society, Status, Worldview
2. Identificar o subgênero — cada gênero tem convenções específicas
3. Mapear o valor central em jogo:
   - Action: Vida/Morte
   - Horror: Vida/Danação
   - Love: Amor/Ódio
   - Performance: Respeito/Vergonha
   - Society: Poder/Impotência
   - Status: Sucesso/Fracasso
   - Worldview: Sentido/Falta de sentido
4. Listar as cenas obrigatórias para este gênero (o que TEM que acontecer)
5. Listar as convenções para este gênero (o que o público espera)
6. Verificar: O gênero pretendido pelo autor corresponde ao que a história realmente entrega?

### Fase 2: Mapear as Cenas

1. Dividir a história em cenas (unidades de ação com uma mudança de valor)
2. Para cada cena, identificar:
   - **Ponto de virada (Turning point)** — O que muda dentro da cena?
   - **Mudança de valor (Value shift)** — Qual valor se move do positivo para o negativo ou vice-versa?
   - **Mudança de polaridade (Polarity shift)** — ex.: Vida (+) para Inconsciência (-)
   - **Tipo de evento da história (Story event type)** — Ponto de virada ativo ou revelatório
3. Criar a planilha Story Grid — análise cena por cena
4. Mapear o arco de valor global — ele se move do negativo para o positivo (prescritivo) ou do positivo para o negativo (cautelar)?
5. Identificar os cinco mandamentos-chave por cena: Inciting Incident, Progressive Complication, Crisis, Climax, Resolution

### Fase 3: Avaliar os Pontos de Virada

1. **Beginning Hook** — O incidente incitante fisga o leitor? O primeiro ponto de virada é cativante?
2. **Middle Build** — As complicações escalam progressivamente? Há uma virada no ponto médio? As apostas sobem continuamente?
3. **Ending Payoff** — O clímax é satisfatório? A resolução cumpre a promessa da história? A transformação é conquistada?
4. Avaliar a crise global — o dilema do protagonista é uma escolha genuína entre o melhor dos males (best-bad-choice) ou entre bens inconciliáveis (irreconcilable-goods)?
5. Verificar as cenas obrigatórias — todas as cenas exigidas pelo gênero estão presentes e funcionais?
6. Verificar as convenções — a história entrega o que o público do gênero espera?

### Fase 4: Diagnosticar Problemas

1. Identificar lacunas estruturais — beats ausentes, escalada pulada, viradas não conquistadas
2. Identificar falhas de gênero — cenas obrigatórias ausentes, convenções quebradas
3. Identificar falhas emocionais — mudanças de valor que não acontecem, pontos de virada sem força
4. Identificar problemas de ritmo — meio arrastado, final apressado, abertura lenta
5. Priorizar os problemas: Crítico (a história não funciona sem corrigir) > Grave (enfraquece significativamente) > Menor (nível de polimento)
6. Fornecer prescrições específicas — o que mudar, adicionar, remover ou reestruturar
7. Referenciar os mestres do gênero — exemplos de como histórias semelhantes resolveram esses problemas

## Formato de Saída

```yaml
story_analysis:
  analyst: "shawn-coyne"
  methodology: "Story Grid"
  genre:
    content_genre: "{genre}"
    sub_genre: "{sub-genre}"
    core_value: "{value at stake}"
    obligatory_scenes_present: ["{scenes found}"]
    obligatory_scenes_missing: ["{scenes missing}"]
    conventions_met: ["{conventions found}"]
    conventions_violated: ["{conventions broken}"]
  scene_map:
    total_scenes: 0
    value_arc: "prescriptive | cautionary"
    key_scenes:
      - scene: "{scene name}"
        turning_point: "{what changes}"
        value_shift: "{from → to}"
        commandments: "{5 commandments assessment}"
  structure_assessment:
    beginning_hook: "{assessment}"
    middle_build: "{assessment}"
    ending_payoff: "{assessment}"
    global_crisis: "{assessment}"
  diagnosis:
    critical_issues: ["{must fix}"]
    major_issues: ["{should fix}"]
    minor_issues: ["{nice to fix}"]
  prescriptions: ["{specific recommendations}"]
```

## Condições de Veto

- **NUNCA** analise sem identificar o gênero primeiro — o gênero determina as expectativas
- **NUNCA** dê feedback vago como "precisa de mais tensão" — seja específico e prescritivo
- **NUNCA** ignore o arco emocional em favor apenas da mecânica de enredo
- **NUNCA** julgue uma história por um framework que não corresponde ao seu gênero
- **NUNCA** esqueça que toda cena deve ter uma mudança de valor — cenas sem mudança não são cenas

## Critérios de Conclusão

- [ ] Gênero identificado com valor central e cenas obrigatórias
- [ ] Todas as cenas mapeadas com pontos de virada e mudanças de valor
- [ ] Cinco mandamentos avaliados para as cenas-chave
- [ ] Beginning Hook, Middle Build e Ending Payoff avaliados
- [ ] Problemas estruturais, de gênero, emocionais e de ritmo diagnosticados
- [ ] Problemas priorizados (Crítico > Grave > Menor)
- [ ] Prescrições específicas fornecidas para cada problema
