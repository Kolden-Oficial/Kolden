---
task: planFundraise()
responsavel: "@zeus"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: company
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: round_target
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: fundraise_plan
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Avaliação de prontidão concluída (10 dimensões)"
  - "[ ] Tese de investimento e arco narrativo elaborados"
  - "[ ] Lista de investidores-alvo construída e classificada por tiers"
tipo: nota
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
relacionado:
  - "[[Olimpo/tasks/_indice|_indice]]"
---

# Tarefa: Planejar Captação

**ID da Tarefa:** CLEVEL-005
**Versão:** 1.0.0
**Comando:** `*plan-fundraise`
**Agente:** Zeus (zeus) + Apolo (apolo)
**Propósito:** Desenhar uma estratégia completa de captação, da avaliação de prontidão à preparação do pitch

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `company` | Prompt do usuário | Sim | Nome da empresa, estágio e descrição |
| `financials` | Usuário | Sim | Receita atual, taxa de queima, runway, unit economics |
| `round_target` | Usuário | Sim | Valor da captação-alvo e tipo de rodada (pre-seed, seed, A, B) |
| `traction` | Usuário | Sim | Métricas-chave de tração (usuários, receita, taxa de crescimento) |
| `existing_investors` | Usuário | Não | Cap table atual e relacionamentos com investidores |
| `use_of_funds` | Usuário | Não | Como os recursos serão aplicados |

## Pré-condições

- A empresa existe com tração demonstrável (ou plano claro para pre-seed)
- Dados financeiros disponíveis (mesmo que básicos)
- Frameworks executivos carregados (`data/executive-frameworks.yaml`)

## Fases de Execução

### Fase 1: Avaliar Prontidão (zeus)

1. Aplique a **Avaliação de Prontidão para Captação** (10 dimensões):
   - **Produto:** Existe um produto funcional? MVP? Receita?
   - **Mercado:** TAM/SAM/SOM definidos? Timing de mercado claro?
   - **Tração:** Taxa de crescimento? Retenção? Trajetória de receita?
   - **Time:** Fundadores complementares? Contratações-chave feitas?
   - **Unit Economics:** CAC, LTV, margens compreendidas?
   - **Posição Competitiva:** Defensabilidade? Fosso?
   - **Visão:** Visão clara de 5 anos? Caminho crível?
   - **Finanças:** Contas em ordem? Projeções realistas?
   - **Jurídico:** Cap table limpo? PI protegida? Sem passivos?
   - **Narrativa:** História convincente? Dados sustentam as afirmações?
2. Pontue cada dimensão de 1-5 e calcule a **pontuação de prontidão** (de 50)
   - 40+: Pronto para captar
   - 30-39: Quase pronto, enderece as lacunas primeiro
   - 20-29: Preparação significativa necessária
   - <20: Não está pronto, foque nos fundamentos do negócio
3. Identifique as **lacunas críticas** que causariam a rejeição do investidor
4. Crie um **plano de fechamento de lacunas** com cronograma
5. Determine o **timing ótimo** para a captação

### Fase 2: Definir Narrativa (zeus)

1. Elabore a **Tese de Investimento** -- por que este é um ótimo investimento:
   - O problema (grande, crescente, doloroso)
   - A solução (única, defensável, escalável)
   - O mercado (grande, o timing é certo)
   - A tração (prova de que funciona)
   - O time (por que estes fundadores vão vencer)
   - O pedido (quanto, para quê, o que acontece a seguir)
2. Defina o **arco narrativo** para o pitch:
   - Gancho: Uma frase que captura a atenção
   - Problema: Torne a dor visceral e identificável
   - Solução: Mostre o momento "aha"
   - Tração: Deixe os números falarem
   - Mercado: Pinte a oportunidade
   - Modelo de negócio: Mostre como o dinheiro flui
   - Time: Prove o founder-market fit
   - Pedido: Valor claro, uso claro, marcos claros
3. Desenvolva **pontos de prova-chave** para cada afirmação:
   - Depoimentos de clientes
   - Gráficos de crescimento
   - Detalhamento de unit economics
   - Comparações competitivas
4. Prepare o **tratamento de objeções** para as 10 principais preocupações dos investidores
5. Crie o **one-liner** que explica a empresa em 10 segundos

### Fase 3: Construir o Deck (apolo)

1. Desenhe o **pitch deck** (12-15 slides):
   - Slide 1: Título + one-liner
   - Slide 2: Problema
   - Slide 3: Solução
   - Slide 4: Demo/screenshots do produto
   - Slide 5: Tração e marcos
   - Slide 6: Tamanho do mercado (TAM/SAM/SOM)
   - Slide 7: Modelo de negócio
   - Slide 8: Estratégia de go-to-market
   - Slide 9: Cenário competitivo
   - Slide 10: Time
   - Slide 11: Projeções financeiras (3 anos)
   - Slide 12: O pedido e o uso dos recursos
   - Slide 13: Visão / declaração de encerramento
2. Crie os materiais de apoio:
   - **Checklist do data room** (financeiro, jurídico, métricas, contratos)
   - **Sumário executivo** (PDF de 2 páginas)
   - **Modelo financeiro** (projeções de 3 anos com premissas)
3. Aplique os princípios de design do deck:
   - Uma mensagem-chave por slide
   - Visualizações de dados em vez de texto
   - Linguagem visual consistente
   - Máximo de 20 palavras por slide (excluindo dados)

### Fase 4: Mapear Investidores e Preparar o Pitch (zeus + apolo)

1. Construa a **lista de investidores-alvo** (30-50 investidores):
   - Tier 1 (sonho): 10 investidores (melhor fit, mais difíceis de conseguir)
   - Tier 2 (forte): 15 investidores (bom fit, realistas)
   - Tier 3 (backup): 15-25 investidores (aceitáveis, acessíveis)
2. Para cada investidor, pesquise:
   - Tese de investimento e preferência de estágio
   - Investimentos recentes (empresas do portfólio)
   - Sócio a ser abordado (quem foca no seu setor)
   - Caminho de apresentação quente (quem pode te conectar)
3. Crie a **sequência de abordagem**:
   - Semana 1-2: Tier 3 (pitches de prática)
   - Semana 3-4: Tier 2 (construir momentum, coletar term sheets)
   - Semana 5-6: Tier 1 (alavancar o interesse existente)
4. Prepare-se para a **execução do pitch**:
   - Pitch de 3 minutos (versão rápida para apresentações)
   - Pitch de 15 minutos (reunião padrão de VC)
   - Pitch de 45 minutos (mergulho profundo com Q&A)
   - Sessões de pitch simulado (ao menos 3 antes dos pitches reais)
5. Defina os **parâmetros de negociação**:
   - Faixa de valuation (piso e teto)
   - Termos a aceitar, negociar ou rejeitar
   - Pontos de pressão de cronograma
   - Condições de desistência

## Formato de Saída

```yaml
fundraise_plan:
  company: "{name}"
  round: "{pre-seed|seed|series-a|series-b}"
  target_raise: "{amount}"
  readiness:
    score: "{X/50}"
    status: "{ready|near-ready|prep-needed|not-ready}"
    critical_gaps: ["{gap1}", "{gap2}"]
  narrative:
    one_liner: "{pitch de 10 segundos}"
    investment_thesis: "{resumo de 2 frases}"
    hook: "{frase de abertura}"
  deck:
    slides: {number}
    status: "{draft|review|final}"
  investor_pipeline:
    tier_1: {count: 0, warm_intros: 0}
    tier_2: {count: 0, warm_intros: 0}
    tier_3: {count: 0, warm_intros: 0}
  timeline:
    prep_weeks: {number}
    pitch_weeks: {number}
    close_target: "{date}"
  deliverables:
    - readiness-assessment.md
    - investment-narrative.md
    - pitch-deck.md
    - investor-target-list.md
    - data-room-checklist.md
    - financial-model-outline.md
```

## Condições de Veto

1. **NUNCA faça o pitch antes de avaliar a prontidão** -- captar cedo demais prejudica a reputação com investidores
2. **NUNCA comece pelos investidores Tier 1** -- pratique primeiro em reuniões de menor risco
3. **NUNCA faça o pitch sem um uso claro dos recursos** -- "crescimento" não é um uso de recursos
4. **NUNCA infle métricas ou projeções** -- a due diligence do investidor vai descobrir a verdade
5. **NUNCA capte sem entender a diluição** -- saiba exatamente o que você está abrindo mão

## Critérios de Conclusão

- [ ] Avaliação de prontidão concluída (10 dimensões pontuadas)
- [ ] Lacunas críticas identificadas com plano de fechamento
- [ ] Tese de investimento e arco narrativo elaborados
- [ ] Pitches de one-liner, 3 minutos e 15 minutos preparados
- [ ] Pitch deck esboçado (12-15 slides)
- [ ] Lista de investidores-alvo construída (30-50, por tiers)
- [ ] Sequência de abordagem planejada
- [ ] Parâmetros de negociação definidos
- [ ] Checklist do data room criado
- [ ] A saída corresponde ao schema acima
