---
task: buildAudience()
responsavel: "@wes-kao"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: expertise
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target_audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: audience_strategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Spiky POV identificado e validado"
  - "[ ] Plataforma selecionada com análise de aderência de formato"
  - "[ ] Pacote inicial de conteúdo de 30 dias esboçado"
---

# Task: Construir Audiência

**Task ID:** DATA-005
**Versão:** 1.0.0
**Comando:** `*build-audience`
**Agente:** Wes Kao (wes-kao)
**Propósito:** Construir uma audiência engajada por meio de um Spiky Point of View, seleção estratégica de plataforma, cadência de conteúdo e design de cohort

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `expertise` | Prompt do usuário | Sim | Expertise de domínio ou área de conhecimento |
| `target_audience` | Prompt do usuário | Sim | Quem a audiência deve ser |
| `current_presence` | Usuário | Não | Tamanho de audiência existente, plataformas, conteúdo |
| `goal` | Usuário | Não | Objetivo da audiência: autoridade, leads, comunidade, lançamento de curso |
| `time_commitment` | Usuário | Não | Horas por semana disponíveis para criação de conteúdo |

## Pré-condições

- A expertise de domínio existe e é demonstrável
- A audiência-alvo é identificável
- Os frameworks de métricas estão carregados (`data/metrics-frameworks.yaml`)

## Fases de Execução

### Fase 1: Encontrar o Spiky Point of View

1. Identifique sua **interseção única** -- a combinação de expertise que só você possui
2. Aplique o **Framework de Spiky POV**:
   - **Específico:** Não "marketing é importante", mas "empresas de SaaS B2B desperdiçam 60% do seu orçamento de marketing em brand awareness antes de atingir o PMF"
   - **Comprovável:** Pode ser respaldado por dados, experiência ou resultados
   - **Interessante:** Faz as pessoas pararem de rolar a tela
   - **Contrário:** Desafia o senso comum
   - **Seu terreno:** Você tem mais credibilidade nisso do que a maioria
3. Gere **5 a 10 spiky POVs candidatos**
4. Teste cada um contra o filtro **"Alguém discordaria disto? (Would someone argue with this?)"**:
   - Se ninguém discordaria, não é spiky o suficiente
   - Se todos discordariam, não é crível o suficiente
5. Selecione o **1 spiky POV primário** e **2 a 3 POVs de apoio**
6. Valide: você consegue criar mais de 50 peças de conteúdo a partir deste POV?

### Fase 2: Escolher Plataforma

1. Avalie as plataformas em relação à sua audiência e estilo de conteúdo:
   - **LinkedIn:** B2B, profissional, texto longo, orientado a carreira
   - **Twitter/X:** Tech, mídia, opiniões rápidas, cultura de threads
   - **Newsletter:** Audiência própria, aprofundamentos, alta confiança
   - **YouTube:** Perene, orientado a busca, aprendizes visuais
   - **Podcast:** Formato longo, construção de relacionamento, audiência de deslocamento
   - **TikTok/Reels:** Alcance amplo, entretenimento em primeiro lugar, públicos mais jovens
2. Aplique a **Platform Selection Matrix**:
   - Presença da audiência (onde sua audiência já passa o tempo)
   - Aderência do formato de conteúdo (combina com seu estilo natural de criação)
   - Mecânica de distribuição (potencial de alcance orgânico)
   - Caminho de monetização (leads, cursos, consultoria)
3. Selecione **1 plataforma primária** e **1 plataforma secundária**
4. Defina o **formato nativo de conteúdo** para cada plataforma
5. Configure os perfis com o spiky POV na bio/descrição

### Fase 3: Projetar a Cadência de Conteúdo

1. Crie o **Content Pillar System** (3 a 5 pilares):
   - Cada pilar se conecta ao spiky POV
   - Cada pilar tem mais de 10 subtópicos
   - Os pilares cobrem: educação, opinião, história, tático, inspiração
2. Projete a **cadência semanal de conteúdo**:
   - Frequência de publicação por plataforma
   - Rotação de tipo de conteúdo (pilar 1 seg, pilar 2 qua, etc.)
   - Blocos de tempo de engajamento (responder a comentários, DMs)
3. Construa o **Content Repurposing Engine**:
   - Formato longo (newsletter/blog) > Formato curto (posts sociais)
   - Threads > Carrossel > Roteiro de vídeo
   - Cada 1 peça de formato longo = 5 a 10 peças derivadas
4. Crie um **pacote inicial de conteúdo de 30 dias**:
   - 12 esboços de post/artigo
   - 4 peças "hero" (aprofundamentos)
   - 4 ganchos de engajamento (perguntas, enquetes, debates)
5. Defina a **cadência mínima viável** -- o que publicar mesmo na pior semana

### Fase 4: Construir Cohort e Medir

1. Projete o **Audience-to-Cohort Pipeline**:
   - Conteúdo gratuito > Captura de e-mail > Nutrição > Cohort paga
   - Defina o **lead magnet** alinhado ao spiky POV
   - Projete a **sequência de nutrição** (5 a 7 e-mails)
2. Aplique os **princípios de Cohort-Based Course (CBC)** se aplicável:
   - Orientado a resultado (alunos atingem X em Y semanas)
   - Responsabilização por meio de prazos e interação entre pares
   - Transformação > Informação
3. Defina as **métricas de crescimento da audiência**:
   - Taxa de crescimento de seguidores/inscritos
   - Taxa de engajamento (interações / impressões)
   - Crescimento da lista de e-mails e taxa de abertura
   - Taxa de conversão de conteúdo em lead
   - Taxa de conversão de audiência em cliente
4. Defina **metas de marco**:
   - 30 dias: Cadência estabelecida, primeiros 100 seguidores engajados
   - 90 dias: Spiky POV reconhecido, primeiros 500 engajados
   - 6 meses: Autoridade estabelecida, caminho de monetização claro
5. Crie o **ritual de revisão semanal** -- 15 min para checar métricas e ajustar

## Formato de Saída

```yaml
audience_strategy:
  expertise: "{domain}"
  target_audience: "{description}"
  spiky_pov:
    primary: "{main spiky POV}"
    supporting: ["{pov1}", "{pov2}"]
  platform:
    primary: "{platform}"
    secondary: "{platform}"
    format: "{native content format}"
  content_cadence:
    pillars: ["{pillar1}", "{pillar2}", "{pillar3}"]
    frequency: "{X posts per week}"
    repurposing_ratio: "1 long-form = {X} derivatives"
  cohort_pipeline:
    lead_magnet: "{description}"
    nurture_length: "{X emails}"
    cohort_ready: "{yes|no|future}"
  milestones:
    30_day: "{target}"
    90_day: "{target}"
    6_month: "{target}"
  deliverables:
    - spiky-pov-analysis.md
    - content-strategy.md
    - content-calendar-30day.md
    - audience-metrics.md
```

## Condições de Veto

1. **NUNCA comece a criar conteúdo sem um spiky POV** -- conteúdo genérico se afoga no ruído
2. **NUNCA esteja em mais de 2 plataformas simultaneamente** -- espalhar-se demais significa não ganhar tração em lugar nenhum
3. **NUNCA publique sem um plano de repurposing** -- toda peça deve gerar múltiplas derivadas
4. **NUNCA meça apenas a contagem de seguidores** -- a taxa de engajamento importa mais do que métricas de vaidade
5. **NUNCA pule o teste "Alguém discordaria? (Would someone argue?)"** -- um POV com o qual ninguém discorda é invisível

## Critérios de Conclusão

- [ ] Spiky POV identificado e validado (1 primário, 2 a 3 de apoio)
- [ ] Plataforma selecionada com análise de aderência de formato
- [ ] Pilares de conteúdo definidos (3 a 5) com subtópicos
- [ ] Cadência semanal de conteúdo projetada
- [ ] Pacote inicial de conteúdo de 30 dias esboçado
- [ ] Audience-to-cohort pipeline mapeado
- [ ] Métricas de crescimento e marcos definidos (30/90/180 dias)
- [ ] Saída corresponde ao schema acima
