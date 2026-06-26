---
task: planGoToMarket()
responsavel: "@apolo"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target_market
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: gtm_strategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] TAM/SAM/SOM definidos com timing de mercado"
  - "[ ] Declaração de posicionamento elaborada com hierarquia de mensagens"
  - "[ ] Os 3 principais canais selecionados com estratégia e orçamento"
---

# Tarefa: Planejar Go-to-Market

**ID da Tarefa:** CLEVEL-003
**Versão:** 1.0.0
**Comando:** `*plan-gtm`
**Agente:** Apolo (apolo)
**Propósito:** Desenhar uma estratégia abrangente de go-to-market cobrindo análise de mercado, posicionamento, estratégia de canais, plano de lançamento e métricas de sucesso

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `product` | Prompt do usuário | Sim | Produto ou serviço a ser levado ao mercado |
| `target_market` | Prompt do usuário | Sim | Mercado-alvo e perfil de cliente ideal |
| `competitive_landscape` | Usuário | Não | Concorrentes conhecidos e seu posicionamento |
| `budget` | Usuário | Não | Orçamento de marketing disponível |
| `timeline` | Usuário | Não | Data de lançamento ou restrição de tempo |

## Pré-condições

- O produto ou serviço está definido (ao menos escopo de MVP)
- Existe uma hipótese de mercado-alvo
- Frameworks executivos carregados (`data/executive-frameworks.yaml`)

## Fases de Execução

### Fase 1: Análise de Mercado

1. Defina o **Mercado Total Endereçável (TAM)**:
   - TAM: Demanda total de mercado
   - SAM: Mercado endereçável que pode ser atendido
   - SOM: Mercado obtível que pode ser atendido (meta realista do primeiro ano)
2. Conduza a **análise competitiva**:
   - Concorrentes diretos (mesma solução, mesmo público)
   - Concorrentes indiretos (solução diferente, mesmo problema)
   - Soluções alternativas (o que os clientes fazem hoje sem o seu produto)
3. Aplique a avaliação da **Estratégia do Oceano Azul**:
   - Que fatores podemos eliminar (que o setor toma como certos)?
   - Que fatores podemos reduzir (super-atendidos pelo setor)?
   - Que fatores podemos elevar (sub-atendidos pelo setor)?
   - Que fatores podemos criar (que o setor nunca ofereceu)?
4. Identifique a **lacuna de mercado** -- necessidade não atendida ou segmento sub-atendido
5. Avalie o **timing de mercado** -- por que agora? O que mudou?

### Fase 2: Posicionamento

1. Crie a **Declaração de Posicionamento**:
   - Para [cliente-alvo] que [necessidade/problema], [produto] é um [categoria] que [benefício-chave]. Diferente de [alternativa], nós [diferenciador].
2. Defina o **Value Proposition Canvas**:
   - Tarefas do cliente (o que ele está tentando fazer)
   - Dores do cliente (frustrações e riscos)
   - Ganhos do cliente (resultados desejados)
   - Aliviadores de dor (como abordamos as dores)
   - Criadores de ganho (como criamos ganhos)
3. Desenvolva a **hierarquia de mensagens**:
   - Nível 1: Pitch de uma linha (10 segundos)
   - Nível 2: Elevator pitch (30 segundos)
   - Nível 3: História de valor (2 minutos)
   - Nível 4: Narrativa completa (5 minutos, apresentação)
4. Defina os **pontos de prova** -- evidências que sustentam cada afirmação
5. Crie o **mapa de posicionamento competitivo** (matriz 2x2 com eixos escolhidos)

### Fase 3: Estratégia de Canais

1. Mapeie a **Jornada de Aquisição de Clientes**:
   - Conscientização: Como eles ouvem falar de nós pela primeira vez
   - Consideração: Como eles nos avaliam
   - Decisão: Como eles escolhem comprar
   - Onboarding: Como eles começam a usar
   - Expansão: Como eles compram mais
2. Avalie os canais usando o **Framework Bullseye**:
   - Anel externo: Todos os canais possíveis (brainstorm de 19+ canais)
   - Anel do meio: Canais promissores (6-8 com base no fit do público)
   - Anel interno: Canais centrais (top 3 para testar primeiro)
3. Para cada canal central, defina:
   - **Estratégia:** Como usaremos este canal
   - **Táticas:** Campanhas e conteúdo específicos
   - **Orçamento:** Alocação e CAC esperado
   - **Cronograma:** Quando lançar e escalar
   - **Métricas de sucesso:** KPIs específicos do canal
4. Desenhe o **motor de marketing de conteúdo**:
   - Pilares de conteúdo (3-5 temas)
   - Tipos de conteúdo por etapa do funil
   - Plano de distribuição
5. Defina a **transferência marketing-vendas** (critérios de MQL para SQL)

### Fase 4: Plano de Lançamento e Métricas de Sucesso

1. Crie a **Sequência de Lançamento** (cronograma em contagem regressiva):
   - T-60 dias: Construção de público pré-lançamento, lista de espera, beta
   - T-30 dias: Semeadura de conteúdo, abordagem de PR, alinhamento de parceiros
   - T-14 dias: Campanha teaser, acesso antecipado
   - T-7 dias: Preparação final, alinhamento de time, verificação de sistemas
   - Dia do lançamento: Empurrão coordenado em todos os canais
   - T+7 dias: Manutenção de momentum, feedback de usuários
   - T+30 dias: Revisão pós-lançamento e otimização
2. Defina as **métricas de lançamento** (primeiros 30 dias):
   - Conscientização: Alcance, impressões, menções de PR
   - Aquisição: Cadastros, trials, demos
   - Ativação: Primeiro valor entregue
   - Receita: Primeiros clientes pagantes
3. Defina as **métricas de estado estável** (contínuas):
   - CAC (Custo de Aquisição de Cliente)
   - Razão LTV/CAC (meta > 3:1)
   - Período de payback
   - % de pipeline originado por marketing
   - ROAS específico do canal
4. Crie o **plano de otimização pós-lançamento de 90 dias**
5. Defina os **gatilhos de pivot** -- sinais que exigem mudança de estratégia

## Formato de Saída

```yaml
gtm_strategy:
  product: "{name}"
  market:
    tam: "{size}"
    sam: "{size}"
    som: "{size}"
    timing: "{por que agora}"
  positioning:
    statement: "{declaração de posicionamento}"
    one_line_pitch: "{pitch de 10 segundos}"
    differentiator: "{diferenciador-chave}"
  channels:
    core: ["{channel1}", "{channel2}", "{channel3}"]
    total_budget: "{amount}"
    target_cac: "{amount}"
  launch:
    date: "{data ou a definir}"
    sequence_duration: "90 dias (60 pré + 30 pós)"
    key_milestones: ["{milestone1}", "{milestone2}"]
  success_metrics:
    30_day: {signups: "", revenue: "", activation: ""}
    ltv_cac_target: "> 3:1"
  deliverables:
    - market-analysis.md
    - positioning-document.md
    - channel-strategy.md
    - launch-plan.md
    - metrics-dashboard.md
```

## Condições de Veto

1. **NUNCA lance sem uma declaração de posicionamento** -- produtos indiferenciados morrem no mercado
2. **NUNCA espalhe o orçamento por mais de 3 canais centrais inicialmente** -- foco vence amplitude no lançamento
3. **NUNCA pule a avaliação do Oceano Azul** -- competir de frente com incumbentes nos termos deles é suicídio
4. **NUNCA defina métricas de sucesso depois do lançamento** -- se você não sabe como o sucesso se parece, não pode medi-lo
5. **NUNCA ignore a transferência marketing-vendas** -- o desalinhamento de MQL para SQL desperdiça o tempo de ambos os times

## Critérios de Conclusão

- [ ] TAM/SAM/SOM definidos com justificativa de timing de mercado
- [ ] Análise competitiva concluída (direta, indireta, alternativas)
- [ ] Declaração de posicionamento elaborada com hierarquia de mensagens
- [ ] Os 3 principais canais selecionados com estratégia e orçamento
- [ ] Sequência de lançamento planejada (T-60 a T+30)
- [ ] Métricas de sucesso definidas para 30 dias e estado estável
- [ ] Meta de LTV/CAC e período de payback projetados
- [ ] A saída corresponde ao schema acima
