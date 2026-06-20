---
task: unblockCreative()
responsavel: "@keith-johnstone"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: block_description
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: project_context
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: false

Saida:
  - campo: creative_unblock
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Tipo de bloqueio diagnosticado com a raiz emocional identificada"
  - "[ ] Pelo menos 3 exercícios prescritos e explicados"
  - "[ ] Micro-meta definida para ação imediata"
---

# Tarefa: Desbloqueio Criativo

**ID da Tarefa:** STORY-006
**Versão:** 1.0.0
**Comando:** `*unblock-creative`
**Agente:** Keith Johnstone (keith-johnstone)
**Propósito:** Diagnosticar e superar bloqueios criativos usando técnicas de improvisação e jogos de história.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `block_description` | O usuário descreve seu ponto de travamento | SIM |
| `project_context` | No que ele está trabalhando | PREFERENCIAL |
| `what_theyve_tried` | Tentativas anteriores de desbloqueio | NÃO |
| `deadline_pressure` | Restrições de tempo | NÃO |
| `creative_history` | Sucessos e padrões passados | NÃO |

## Pré-condições

1. O usuário reconhece que está criativamente travado
2. Existe algum contexto sobre o projeto ou empreitada criativa
3. Disposição para tentar abordagens não convencionais

## Fases de Execução

### Fase 1: Diagnosticar o Bloqueio

1. Identificar o tipo de bloqueio criativo:
   - **Medo de fracassar** — O crítico interno está alto demais (o mais comum)
   - **Perfeccionismo** — Recusa-se a produzir qualquer coisa menos que perfeita
   - **Ansiedade de status** — Medo de parecer tolo ou incompetente
   - **Paralisia decisória** — Opções demais, incapaz de se comprometer
   - **Esgotamento (burnout)** — Exaustão criativa por excesso de trabalho
   - **Fio perdido** — Começou forte, perdeu o fio da narrativa
   - **Página em branco** — Não consegue encontrar ponto de partida algum
2. Avaliar a severidade — ele consegue produzir alguma coisa ou é um congelamento total?
3. Identificar a raiz emocional — que sentimento está impulsionando o bloqueio?
4. Procurar padrões — isso já aconteceu antes? O que o quebrou naquela vez?

### Fase 2: Exercícios de Improviso

1. **"Sim, E"** ("Yes, And") — Aceitar toda ideia sem julgamento e construir sobre ela
   - Escreva 10 ideias terríveis. Depois, faça "sim, e" em cada uma para transformá-la em algo surpreendente
   - O objetivo é volume, não qualidade — abaixe completamente a régua
2. **Mudança de Status** (Status Shift) — Alterar as dinâmicas de poder na história
   - Faça o personagem poderoso ficar fraco, e o personagem fraco ficar poderoso
   - Muitas vezes uma história travada é, na verdade, uma relação de status travada
3. **Oferta Cega** (Blind Offer) — Começar com uma ação e descobrir o significado depois
   - Escreva a próxima cena sem saber para onde ela vai
   - Deixe o subconsciente conduzir; a mente consciente segue
4. **Inclinação** (Tilt) — Introduzir um elemento inesperado que muda tudo
   - E se o oposto fosse verdade?
   - O que aconteceria se a pior coisa possível ocorresse agora mesmo?
5. **Associação Livre** (Free Association) — Escrever sem parar por 10 minutos
   - Sem edição, sem julgamento, sem apagar
   - Siga o que vier, mesmo que pareça irrelevante

### Fase 3: Jogos de História

1. **A Versão Chata** (The Boring Version) — Escrever a versão mais óbvia e chata da cena
   - Contraintuitivamente, isso muitas vezes revela qual é a versão interessante
   - Remove a pressão da originalidade
2. **Roubar da Vida** (Steal from Life) — Garimpar a experiência pessoal em busca de material
   - O que aconteceu com você hoje? Ontem? Num sonho?
   - Detalhes reais fazem a ficção parecer autêntica
3. **A Pior Versão** (The Worst Version) — Escrever deliberadamente a pior versão possível
   - Isso derrota o perfeccionismo ao tornar o "ruim" o objetivo
   - Muitas vezes produz material surpreendentemente útil
4. **Entrevista com o Personagem** (Character Interview) — Deixar o personagem falar por si mesmo
   - Pergunte: O que você quer? Do que você tem medo? O que você nunca faria?
   - O personagem muitas vezes conhece a história melhor que o autor
5. **Caixa de Restrições** (Constraint Box) — Adicionar restrições arbitrárias para forçar a criatividade
   - Escreva em exatamente 100 palavras. Não use adjetivos. Apenas diálogo.
   - As restrições, paradoxalmente, libertam

### Fase 4: Ressignificar e Reconectar

1. Ressignificar o bloqueio como informação — o que a resistência está tentando lhe dizer?
2. Identificar o que ESTÁ funcionando — construir a partir da força, não da fraqueza
3. Reconectar com o impulso original — por que este projeto te entusiasmou no início?
4. Definir uma micro-meta — não "terminar o capítulo", mas "escrever um parágrafo"
5. Criar um ritual — uma ação específica que sinalize "o modo criativo está começando"
6. Agendar a próxima sessão criativa — o impulso exige continuidade
7. Fornecer uma prescrição de desbloqueio personalizada com base no tipo específico de bloqueio

## Formato de Saída

```yaml
creative_unblock:
  specialist: "keith-johnstone"
  block_type: "{tipo diagnosticado}"
  severity: "mild | moderate | severe"
  emotional_root: "{sentimento subjacente}"
  diagnosis: |
    {Por que o bloqueio está acontecendo e o que ele sinaliza}
  exercises_prescribed:
    - exercise: "{nome}"
      instructions: "{passo a passo}"
      purpose: "{por que isso ajuda neste bloqueio específico}"
      time_required: "{duração}"
  reframe: |
    {Como enxergar o bloqueio de forma diferente}
  micro_goal: "{pequena ação imediata}"
  ongoing_practice: "{hábito para prevenir recorrência}"
```

## Condições de Veto

- **NUNCA** dizer a alguém para "simplesmente forçar" — bloqueios têm causas emocionais
- **NUNCA** criticar o trabalho existente do usuário durante uma sessão de desbloqueio
- **NUNCA** adicionar pressão — prazos e riscos pioram os bloqueios
- **NUNCA** prescrever uma única abordagem — sempre ofereça múltiplos exercícios para escolher
- **NUNCA** descartar o bloqueio como preguiça ou falta de talento

## Critérios de Conclusão

- [ ] Tipo de bloqueio diagnosticado com a raiz emocional identificada
- [ ] Pelo menos 3 exercícios prescritos, ajustados ao bloqueio específico
- [ ] Cada exercício explicado com instruções claras e propósito
- [ ] Bloqueio ressignificado como informação, e não como fracasso
- [ ] Micro-meta definida para ação imediata
- [ ] Prática contínua recomendada para prevenir recorrência
