---
task: getFounderCounsel()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: crossroads_description
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: founder_context
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: founder_counsel
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] As três perspectivas dos conselheiros entregues (Sivers, Chouinard, Naval)"
  - "[ ] Verificação contrária concluída com minimização de arrependimento"
  - "[ ] Framework de decisão oferecido com prompt de diário"
---

# Task: Aconselhamento de Encruzilhada do Fundador

**Task ID:** BOARD-005
**Versão:** 1.0.0
**Comando:** `*get-founder-counsel`
**Agente:** O Presidente do Conselho roteia para Derek Sivers + Yvon Chouinard + Naval Ravikant
**Propósito:** Fornecer sabedoria e perspectiva para fundadores em pontos críticos de decisão de vida/negócio.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `crossroads_description` | A decisão ou dilema | SIM |
| `founder_context` | Estágio, valores, situação pessoal | SIM |
| `options_considered` | Caminhos sendo ponderados | PREFERÍVEL |
| `fears_and_hopes` | Do que têm medo e o que desejam | PREFERÍVEL |
| `constraints` | Inegociáveis, compromissos | NÃO |

## Pré-condições

1. O fundador está enfrentando uma encruzilhada genuína (não uma decisão trivial)
2. Há contexto disponível sobre a situação e os valores do fundador
3. Abertura a perspectivas não convencionais ou contrárias

## Fases de Execução

### Fase 1: Enquadrar a Encruzilhada (board-chair)

1. Esclareça a decisão em termos precisos — o que exatamente precisa ser decidido?
2. Identifique o tipo de encruzilhada:
   - **Começar vs Permanecer** — Deixar a segurança pelo empreendedorismo
   - **Crescer vs Manter Pequeno** — Escalar ou manter um negócio de estilo de vida
   - **Vender vs Manter** — Oferta de saída na mesa
   - **Pivotar vs Persistir** — O caminho atual não está funcionando
   - **Sozinho vs Sócio** — Seguir sozinho ou trazer cofundadores/investidores
   - **Encruzilhada do Burnout** — Continuar ou recuar pela saúde
3. Mapeie a paisagem emocional — quais medos e esperanças estão impulsionando a decisão?
4. Identifique suposições ocultas — o que está sendo tomado como certo?
5. Roteie para os três conselheiros fundadores-filósofos

### Fase 2: Múltiplas Perspectivas

**Derek Sivers — Simplicidade Contrária:**
1. Aplique o teste "Hell Yeah or No" — essa opção faz você dizer "HELL YEAH!"?
2. Verifique o pensamento convencional — você está fazendo isso porque "todo mundo diz que você deveria"?
3. Aplique o princípio "o oposto também é verdadeiro" — e se o caminho oposto for o certo?
4. Avalie a simplicidade — qual opção é mais simples? Complexidade costuma ser um sinal de alerta
5. Considere o cenário "feliz de estar errado" — sobre qual escolha você ficaria mais feliz de estar errado?
6. Pergunta-chave: "O que você faria se soubesse que ninguém o julgaria?"

**Yvon Chouinard — Sabedoria Movida por Missão:**
1. Isso se alinha com seus valores mais profundos? (Não seus valores declarados — seus valores REAIS)
2. Qual é o impacto ambiental e social de cada caminho?
3. Aplique a lente de 100 anos — de qual decisão você terá orgulho no longuíssimo prazo?
4. Isso é sobre crescimento ou sobre qualidade? (Chouinard sempre escolheu qualidade)
5. Você consegue "let my people go surfing" — esse caminho permite uma vida plena e equilibrada?
6. Pergunta-chave: "O que o planeta (e sua comunidade) precisa que você faça?"

**Naval Ravikant — Sabedoria de Primeiros Princípios:**
1. Aplique conhecimento específico — para o que você é singularmente apto?
2. Avalie a alavancagem — qual caminho cria mais alavancagem (código > mídia > capital > trabalho)?
3. Verifique se está jogando jogos de status — você está perseguindo status ou criando riqueza?
4. Aplique o "teste dos 40 anos" — qual caminho leva à liberdade e à paz aos 40, 50, 60?
5. Considere a capitalização composta — qual escolha melhor se compõe ao longo de décadas?
6. Pergunta-chave: "Qual caminho faz de você a versão mais interessante e realizada de si mesmo?"

### Fase 3: Verificação Contrária

1. Para cada caminho, encontre o argumento mais forte CONTRA ele
2. Identifique quais medos são legítimos e quais são movidos pelo ego
3. Verifique as "algemas de ouro" — o conforto está se disfarçando de sabedoria?
4. Aplique o "framework de minimização de arrependimento" — aos 80, de qual escolha NÃO feita você se arrependerá?
5. Teste a reversibilidade — isso é uma porta de mão única ou de mão dupla? (Portas de mão dupla exigem menos deliberação)
6. Pergunte: "O que você aconselharia seu melhor amigo a fazer nessa situação?"

### Fase 4: Framework de Decisão

1. Sintetize todas as três perspectivas em um quadro coerente
2. Identifique a tensão central — qual é o verdadeiro trade-off?
3. Apresente a decisão não como certo/errado, mas como caminhos-de-vida diferentes
4. Ofereça um framework de decisão:
   - Se movido por valores → apoie-se na lente de Chouinard
   - Se movido por liberdade → apoie-se na lente de Naval
   - Se movido por felicidade → apoie-se na lente de Sivers
5. Sugira um pequeno experimento antes de se comprometer (se possível)
6. Forneça um prompt de diário para o fundador processar antes de decidir
7. Lembre: A decisão em si importa menos do que o compromisso de fazê-la dar certo

## Formato de Saída

```yaml
founder_counsel:
  advisors: [derek-sivers, yvon-chouinard, naval-ravikant]
  crossroads: "{descrição}"
  type: "{tipo de encruzilhada}"
  perspectives:
    sivers:
      hell_yeah_test: "{resultado}"
      contrarian_view: "{e se o oposto for verdadeiro}"
      key_insight: "{sabedoria central}"
    chouinard:
      values_alignment: "{avaliação}"
      long_term_lens: "{perspectiva de 100 anos}"
      key_insight: "{sabedoria central}"
    naval:
      leverage_analysis: "{qual caminho tem mais alavancagem}"
      specific_knowledge: "{para o que você é singularmente apto}"
      key_insight: "{sabedoria central}"
  contrarian_check:
    strongest_argument_against: "{para cada caminho}"
    regret_minimization: "{aos 80, do que você se arrependeria}"
    reversibility: "one-way | two-way"
  synthesis:
    core_tension: "{o verdadeiro trade-off}"
    framework: "{recomendação de lente de decisão}"
    experiment: "{pequeno teste antes de se comprometer}"
    journaling_prompt: "{para reflexão pessoal}"
  closing_wisdom: |
    {Uma mensagem sintetizada e pessoal do conselho}
```

## Condições de Veto

- **NUNCA** tome a decisão pelo fundador — forneça sabedoria, não diretrizes
- **NUNCA** descarte preocupações emocionais como irracionais — sentimentos são dados
- **NUNCA** empurre rumo ao sucesso convencional se o fundador valoriza um modo de vida não convencional
- **NUNCA** apresse a decisão — encruzilhadas merecem deliberação
- **NUNCA** ignore o ser humano por trás do negócio — saúde, relacionamentos e alegria importam

## Critérios de Conclusão

- [ ] Encruzilhada claramente enquadrada com o tipo identificado
- [ ] As três perspectivas dos conselheiros entregues através de suas lentes singulares
- [ ] Verificação contrária concluída para cada caminho
- [ ] Minimização de arrependimento e reversibilidade avaliadas
- [ ] Tensão central identificada e nomeada
- [ ] Framework de decisão oferecido (não uma diretriz)
- [ ] Prompt de diário ou experimento sugerido para reflexão
