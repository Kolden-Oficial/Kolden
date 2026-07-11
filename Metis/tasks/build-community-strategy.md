---
task: buildCommunityStrategy()
responsavel: "@david-spinks"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: community_goal
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: community_strategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Modelo SPACES avaliado com dimensão primária selecionada"
  - "[ ] Escada de engajamento projetada com 7 degraus"
  - "[ ] Community Health Score definido com 5 componentes"
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/tasks/_indice|_indice]]"
---

# Tarefa: Construir Estratégia de Comunidade

**Task ID:** DATA-003
**Versão:** 1.0.0
**Comando:** `*build-community-strategy`
**Agente:** David Spinks (david-spinks)
**Propósito:** Projetar uma estratégia de crescimento liderado pela comunidade usando o modelo SPACES e a escada de engajamento

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|-------|--------|----------|-------------|
| `business` | Prompt do usuário | Sim | Descrição do negócio ou produto |
| `community_goal` | Prompt do usuário | Sim | Objetivo principal para a comunidade |
| `existing_community` | Usuário | Não | Status atual da comunidade (nenhuma, inicial, em crescimento, madura) |
| `platform_preference` | Usuário | Não | Plataforma preferida (Discord, Slack, Circle, fórum, etc.) |
| `resources` | Usuário | Não | Equipe e orçamento disponíveis para gestão da comunidade |

## Pré-condições

- Negócio ou produto existe com usuários identificáveis
- Objetivo da comunidade está articulado (mesmo que amplo)
- Frameworks de métricas carregados (`data/metrics-frameworks.yaml`)

## Fases de Execução

### Fase 1: Definir Objetivos do Modelo SPACES

1. Avalie quais dimensões SPACES são mais relevantes:
   - **S — Support (Suporte):** Membros ajudam uns aos outros (reduz custos de suporte)
   - **P — Product (Produto):** Membros fornecem feedback e ideias (melhora o produto)
   - **A — Acquisition (Aquisição):** A comunidade atrai novos clientes (reduz o CAC)
   - **C — Contribution (Contribuição):** Membros criam conteúdo ou código (aumenta o valor)
   - **E — Engagement (Engajamento):** Membros se conectam uns com os outros (aumenta a retenção)
   - **S — Success (Sucesso):** Membros alcançam resultados (reduz o churn)
2. Classifique as dimensões SPACES por impacto no negócio
3. Selecione a **dimensão primária** (1) e as **dimensões secundárias** (1-2)
4. Defina métricas de sucesso para cada dimensão selecionada
5. Estabeleça metas de 90 dias para cada métrica

### Fase 2: Projetar a Escada de Engajamento

1. Mapeie a **Community Engagement Ladder** (7 degraus):
   - **Lurker/Observador (Lurker):** Observa mas não participa
   - **Seguidor (Follower):** Consome conteúdo, reage ocasionalmente
   - **Contribuidor (Contributor):** Posta, comenta, compartilha experiências
   - **Colaborador (Collaborator):** Ajuda outros, responde perguntas
   - **Defensor (Champion):** Advoga publicamente, cria conteúdo
   - **Líder (Leader):** Modera, mentora, organiza eventos
   - **Parceiro (Partner):** Co-cria com a marca, papel consultivo
2. Para cada degrau, defina:
   - **Ação gatilho** -- o que move alguém para cima
   - **Reconhecimento** -- como a progressão é reconhecida
   - **Permissões** -- o que é desbloqueado neste nível
3. Projete **sequências de incentivo (nudge)** para mover as pessoas para cima na escada
4. Identifique a **transição crítica** -- qual salto de degrau tem o maior impacto
5. Crie programas de engajamento para cada degrau

### Fase 3: Planejar o Lançamento

1. Defina a **Minimum Viable Community (MVC)**:
   - Número-alvo de membros fundadores (tipicamente 20-50)
   - Plano de conteúdo semente (10-20 posts/discussões iniciais)
   - Design da experiência de boas-vindas
2. Escolha a plataforma e configure:
   - Estrutura de canais/categorias
   - Regras e diretrizes
   - Fluxo de onboarding
3. Recrute **membros fundadores**:
   - Identifique superusuários da base de clientes existente
   - Estratégia de convite pessoal
   - Benefícios para membros fundadores
4. Crie um **calendário de conteúdo** para os primeiros 30 dias:
   - Tipos de conteúdo diário
   - Estímulos de discussão
   - Eventos (AMAs, workshops, desafios)
5. Defina **rituais de comunidade** -- eventos recorrentes que criam hábito

### Fase 4: Medir

1. Implemente o **Community Health Score** com 5 componentes:
   - **Taxa de atividade:** % de membros ativos nos últimos 30 dias
   - **Taxa de resposta:** % de posts que recebem respostas
   - **Taxa de crescimento:** Novos membros líquidos por período
   - **Pontuação de profundidade:** Média de interações por membro ativo
   - **Sentimento:** Razão positivo/negativo nas discussões da comunidade
2. Projete o **painel de relatórios**:
   - Pulso semanal: top 3 métricas + momentos notáveis
   - Revisão mensal: pontuação de saúde completa + distribuição da escada de engajamento
   - Estratégia trimestral: progresso SPACES + ajuste de objetivos
3. Defina **gatilhos de intervenção**:
   - Taxa de atividade < 20% = crise de engajamento
   - Taxa de resposta < 50% = revisão da estratégia de conteúdo
   - Pico de sentimento negativo = investigação imediata
4. Crie **loops de feedback** -- como os dados da comunidade informam o produto e o negócio

## Formato de Saída

```yaml
community_strategy:
  business: "{name}"
  spaces_primary: "{S|P|A|C|E|S}"
  spaces_secondary: ["{dimension1}", "{dimension2}"]
  engagement_ladder:
    rungs: 7
    critical_transition: "{rung X to rung Y}"
  launch_plan:
    platform: "{platform}"
    founding_members_target: {number}
    launch_date: "{date or 'TBD'}"
    content_seed: {number of initial posts}
  health_score:
    activity_rate: {target: "", current: ""}
    response_rate: {target: "", current: ""}
    growth_rate: {target: "", current: ""}
    depth_score: {target: "", current: ""}
    sentiment: {target: "", current: ""}
  deliverables:
    - community-strategy.md
    - engagement-ladder.md
    - launch-plan.md
    - content-calendar.md
```

## Condições de Veto

1. **NUNCA lance uma comunidade sem membros fundadores** -- comunidades vazias morrem imediatamente
2. **NUNCA pule a avaliação SPACES** -- uma comunidade sem propósito de negócio se torna um centro de custo
3. **NUNCA automatize toda a interação da comunidade** -- a presença humana autêntica é inegociável
4. **NUNCA ignore picos de sentimento negativo** -- a toxicidade não tratada mata comunidades rapidamente
5. **NUNCA meça apenas o número de membros** -- métricas de vaidade escondem comunidades agonizantes

## Critérios de Conclusão

- [ ] Modelo SPACES avaliado com dimensões primária e secundárias selecionadas
- [ ] Escada de engajamento projetada com 7 degraus e ações gatilho
- [ ] Plano de lançamento criado com estratégia de membros fundadores
- [ ] Calendário de conteúdo rascunhado para os primeiros 30 dias
- [ ] Community Health Score definido com 5 componentes
- [ ] Gatilhos de intervenção estabelecidos
- [ ] Metas de 90 dias estabelecidas para cada métrica-chave
- [ ] Saída corresponde ao schema acima
