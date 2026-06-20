---
task: auditDesign()
responsavel: "@dave-malouf"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: organization_context
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: current_design_practice
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: designAudit
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todas as três lentes avaliadas com notas e achados específicos"
  - "[ ] Top 3-5 melhorias de maior alavancagem identificadas"
  - "[ ] Roadmap em fases criado com marcos"
---

# Tarefa: Auditoria de Design & Avaliação de Maturidade

**ID da Tarefa:** DESIGN-002
**Versão:** 1.0.0
**Comando:** `*audit-design`
**Agente:** Dave Malouf (dave-malouf) + Chefe de Design (design-chief)
**Propósito:** Avaliar a maturidade de design através de três lentes e identificar lacunas com um roadmap de melhoria.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `organization_context` | Tamanho, estágio e setor da empresa | SIM |
| `current_design_practice` | Time, ferramentas, processos | SIM |
| `design_artifacts` | Designs, sistemas e docs existentes | PREFERENCIAL |
| `stakeholder_concerns` | Dores apontadas pela liderança | NÃO |
| `product_portfolio` | Produtos/serviços que usam design | NÃO |

## Pré-condições

1. Acesso às informações da prática de design atual
2. Entendimento da estrutura organizacional e do posicionamento do time de design
3. Disposição para avaliar com honestidade (não apenas validar a abordagem atual)

## Fases de Execução

### Fase 1: Avaliar a Maturidade (3 Lentes)

**Lente 1: Como Trabalhamos Juntos (Pessoas & Cultura)**
1. Estrutura do time — centralizada, embutida, híbrida?
2. Clareza de papéis — os papéis de design estão bem definidos?
3. Trilhas de carreira — os designers têm trajetórias de crescimento?
4. Práticas de contratação — como o talento de design é avaliado?
5. Colaboração interfuncional — como design, engenharia e produto interagem?
6. Cultura de design — o design é valorizado no nível da liderança?
7. Classifique: Ad Hoc (1) → Emergente (2) → Definido (3) → Gerenciado (4) → Otimizado (5)

**Lente 2: Como Trabalhamos (Processo & Fluxo de Trabalho)**
1. Processo de design — existe uma metodologia consistente?
2. Prática de pesquisa — como os insights de usuário são coletados e usados?
3. Processo de handoff — como os designs chegam aos engenheiros?
4. Garantia de qualidade — como a qualidade de design é verificada?
5. Loops de feedback — como os times aprendem com produtos lançados?
6. Ferramental — a stack de ferramentas é consistente e eficiente?
7. Classifique: Ad Hoc (1) → Emergente (2) → Definido (3) → Gerenciado (4) → Otimizado (5)

**Lente 3: No Que Trabalhamos (Ofício & Entrega)**
1. Design system — existe um? É usado de forma consistente?
2. Acessibilidade — a conformidade com WCAG é prática padrão?
3. Consistência visual — os produtos são visualmente coerentes?
4. Qualidade de UX — os produtos são usáveis e intuitivos?
5. Inovação — o time está empurrando os limites do design?
6. Documentação — as decisões de design são registradas e compartilhadas?
7. Classifique: Ad Hoc (1) → Emergente (2) → Definido (3) → Gerenciado (4) → Otimizado (5)

### Fase 2: Identificar Lacunas

1. Mapeie as notas de maturidade atuais em todas as três lentes
2. Identifique a lente com menor pontuação — esse é o gargalo principal
3. Dentro de cada lente, identifique lacunas específicas:
   - O que existe mas está quebrado ou inconsistente?
   - O que está totalmente ausente?
   - O que funciona bem e deve ser preservado?
4. Faça referência cruzada das lacunas — lacunas de pessoas causam lacunas de processo que causam lacunas de ofício?
5. Faça benchmark contra padrões do setor para o estágio e o tamanho da empresa
6. Identifique as 3-5 melhorias de maior alavancagem

### Fase 3: Recomendar Melhorias

1. Para cada lacuna identificada, recomende uma intervenção específica:
   - **Vitórias rápidas** (1-2 semanas) — Baixo esforço, impacto imediato
   - **Curto prazo** (1-3 meses) — Esforço moderado, melhoria significativa
   - **Longo prazo** (3-12 meses) — Investimento estratégico para mudança duradoura
2. Priorize por impacto e viabilidade
3. Identifique dependências — o que precisa acontecer primeiro?
4. Estime requisitos de recursos — pessoas, ferramentas, orçamento
5. Defina métricas de sucesso para cada melhoria

### Fase 4: Construir o Roadmap

1. Crie um roadmap de melhoria em fases:
   - **Fase 1 (Mês 1-2):** Fundação — Vitórias rápidas + correções críticas
   - **Fase 2 (Mês 3-6):** Construção — Padronização de processo + ferramental
   - **Fase 3 (Mês 6-12):** Escala — Mudança de cultura + práticas avançadas
2. Defina marcos e checkpoints
3. Atribua a responsabilidade (ownership) de cada iniciativa
4. Crie um plano de medição — como o progresso será acompanhado?
5. Planeje a comunicação — como a organização será informada e engajada?
6. Defina o modelo de governança para a melhoria contínua da maturidade de design

## Formato de Saída

```yaml
design_audit:
  auditors: [dave-malouf, design-chief]
  organization: "{empresa}"
  maturity_scores:
    people_culture:
      score: 0
      level: "Ad Hoc | Emergente | Definido | Gerenciado | Otimizado"
      strengths: ["{o que funciona}"]
      gaps: ["{o que está faltando}"]
    process_workflow:
      score: 0
      level: "Ad Hoc | Emergente | Definido | Gerenciado | Otimizado"
      strengths: ["{o que funciona}"]
      gaps: ["{o que está faltando}"]
    craft_output:
      score: 0
      level: "Ad Hoc | Emergente | Definido | Gerenciado | Otimizado"
      strengths: ["{o que funciona}"]
      gaps: ["{o que está faltando}"]
  overall_maturity: 0
  primary_bottleneck: "{lente com menor pontuação}"
  top_improvements:
    - improvement: "{descrição}"
      impact: "ALTO | MÉDIO | BAIXO"
      effort: "ALTO | MÉDIO | BAIXO"
      timeline: "quick_win | short_term | long_term"
  roadmap:
    phase_1: ["{itens de fundação}"]
    phase_2: ["{itens de construção}"]
    phase_3: ["{itens de escala}"]
  measurement_plan: ["{métricas a acompanhar}"]
```

## Condições de Veto

- **NUNCA** avalie a maturidade sem considerar todas as três lentes — elas são interconectadas
- **NUNCA** recomende práticas avançadas para uma organização em maturidade Ad Hoc — encontre-a onde ela está
- **NUNCA** ignore pessoas e cultura — processo e ferramentas falham sem a cultura certa
- **NUNCA** crie um roadmap sem ownership e marcos claros
- **NUNCA** pule a avaliação de pontos fortes — construa sobre o que funciona, não foque apenas nas lacunas

## Critérios de Conclusão

- [ ] Todas as três lentes avaliadas com notas e achados específicos
- [ ] Lacunas identificadas e cruzadas entre as lentes
- [ ] Top 3-5 melhorias de maior alavancagem identificadas
- [ ] Melhorias priorizadas por impacto e viabilidade
- [ ] Roadmap em fases criado com marcos
- [ ] Plano de medição definido para acompanhar o progresso
- [ ] Ownership atribuído a cada iniciativa
