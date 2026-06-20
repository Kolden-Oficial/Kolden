---
task: createPresentation()
responsavel: "@nancy-duarte"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: presentation_topic
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: presentation
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Público perfilado com crenças atuais e resistência mapeadas"
  - "[ ] Estrutura Sparkline criada com contrastes alternados"
  - "[ ] Star moment projetado e call to action definido"
---

# Task: Arco Narrativo de Apresentação

**Task ID:** STORY-005
**Version:** 1.0.0
**Command:** `*create-presentation`
**Agent:** Nancy Duarte (nancy-duarte)
**Purpose:** Projetar uma narrativa de apresentação usando a metodologia Sparkline (What Is / What Could Be).

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `presentation_topic` | Prompt do usuário | SIM |
| `audience` | Quem vai participar | SIM |
| `desired_action` | O que o público deve fazer depois | SIM |
| `key_data` | Fatos, métricas, pesquisas de apoio | PREFERENCIAL |
| `duration` | Tempo disponível | NÃO (padrão: 20 min) |
| `existing_content` | Slides ou notas atuais | NÃO |

## Pré-condições

1. Tópico e mensagem-chave estão definidos
2. Público está identificado com seu contexto e preocupações
3. A ação desejada do público após a apresentação está clara

## Fases de Execução

### Fase 1: Análise do Público

1. Perfilar o público — papel, nível de conhecimento, preocupações, motivações
2. Identificar a crença atual deles — o que acham que é verdade agora?
3. Mapear a resistência deles — o que faria com que rejeitassem sua mensagem?
4. Definir a lacuna — a distância entre a crença atual deles e a crença que você deseja
5. Determinar a jornada emocional — onde eles começam e onde precisam terminar?
6. Identificar o único ponto-chave a reter — se lembrarem de apenas uma coisa, qual é?

### Fase 2: Estrutura Sparkline

1. **Abertura (What Is)** — Descreva a realidade atual de forma vívida
   - Ancore o público em uma experiência compartilhada
   - Reconheça a dor ou limitação que eles sentem
   - Use uma história relacionável ou uma estatística marcante
2. **Primeiro Contraste (What Could Be)** — Revele a possibilidade
   - Pinte o futuro melhor em termos concretos
   - Crie desejo — faça com que queiram esse futuro
3. **Alterne para Frente e para Trás** — Alterne entre a dor atual e a promessa do futuro
   - Cada alternância eleva as apostas
   - Sobreponha evidências: dados, histórias, exemplos, analogias
   - Construa impulso — cada rodada é mais convincente
4. **O Star Moment** — Um único momento memorável que o público nunca esquecerá
   - Uma demonstração dramática, estatística surpreendente ou história poderosa
   - Este é o pico emocional da apresentação
5. **Call to Action** — O passo específico para sair do "what is" para o "what could be"
   - Torne-o concreto, alcançável e imediato
   - Conecte-o aos valores e motivações do público

### Fase 3: Conteúdo What-Is / What-Could-Be

1. Para cada seção "What Is":
   - Use exemplos concretos e específicos da dor atual
   - Referencie dados que validam o problema
   - Mantenha a honestidade — não exagere, mas não suavize
2. Para cada seção "What Could Be":
   - Use imagens vívidas do futuro transformado
   - Mostre provas de que o futuro é alcançável (estudos de caso, precedentes)
   - Conecte-se emocionalmente — mostre o impacto humano
3. Projetar transições — cada alternância deve fluir naturalmente
4. Planejar o apoio visual — quais slides/visuais amplificam cada momento?
5. Equilibrar dados e história — nenhum domina, ambos se reforçam

### Fase 4: New Bliss

1. Pintar o "New Bliss" — o mundo depois que o público age
2. Torná-lo específico e tangível — não promessas abstratas
3. Conectar de volta à abertura — feche o laço narrativo
4. Encerrar com uma imagem ou afirmação final ressonante
5. Projetar o eco — a frase ou ideia que fica com eles por dias
6. Preparar para o Q&A — antecipe as principais perguntas e prepare respostas concisas

## Formato de Saída

```yaml
presentation:
  topic: "{presentation topic}"
  specialist: "nancy-duarte"
  methodology: "Sparkline"
  audience: "{target audience}"
  desired_action: "{what audience should do}"
  duration: "{time}"
  key_takeaway: "{one thing to remember}"
  sparkline:
    - section: "Opening — What Is"
      content: "{current reality}"
      visual_support: "{slide concept}"
      duration: "{time}"
    - section: "Contrast 1 — What Could Be"
      content: "{the possibility}"
      visual_support: "{slide concept}"
      duration: "{time}"
    # ... alternâncias adicionais
    - section: "Star Moment"
      content: "{memorable peak}"
      visual_support: "{dramatic visual}"
      duration: "{time}"
    - section: "Call to Action"
      content: "{specific ask}"
      duration: "{time}"
    - section: "New Bliss"
      content: "{transformed future}"
      duration: "{time}"
  star_moment: "{description of the memorable moment}"
  closing_statement: "{resonant ending}"
  qa_prep:
    - question: "{anticipated question}"
      answer: "{prepared response}"
```

## Condições de Veto

- **NUNCA** comece com um slide de agenda entediante — abra com história ou dados marcantes
- **NUNCA** apresente todo o "what is" seguido de todo o "what could be" — alterne-os
- **NUNCA** pule o star moment — toda grande apresentação precisa de um momento inesquecível
- **NUNCA** termine sem um call to action claro — o público precisa saber o que fazer a seguir
- **NUNCA** deixe os dados substituírem a história — dados provam, a história persuade; use ambos

## Critérios de Conclusão

- [ ] Público perfilado com crenças atuais e resistência mapeadas
- [ ] Estrutura Sparkline criada com contrastes alternados
- [ ] Star moment projetado para impacto máximo
- [ ] Cada seção tem conteúdo e conceitos de apoio visual
- [ ] Call to action é concreto e alcançável
- [ ] New Bliss pinta um futuro transformado convincente
- [ ] Tempo se encaixa na duração alocada
