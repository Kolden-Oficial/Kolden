---
task: seekInvestmentCounsel()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: opportunity_description
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: financial_data
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: false

Saida:
  - campo: investment_counsel
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] As três análises (Dalio, Munger, Thiel) concluídas"
  - "[ ] Recomendação clara com termos ou condições"
  - "[ ] Critérios de abandono (kill criteria) e framework de monitoramento definidos"
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
relacionado:
  - "[[Themis/tasks/_indice|_indice]]"
---

# Task: Sessão do Comitê de Investimentos

**Task ID:** BOARD-002
**Versão:** 1.0.0
**Comando:** `*seek-investment-counsel`
**Agente:** O Presidente do Conselho roteia para Ray Dalio + Charlie Munger + Peter Thiel
**Propósito:** Avaliar um investimento ou uma grande decisão financeira através de múltiplas lentes analíticas.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `opportunity_description` | Prompt do usuário | SIM |
| `financial_data` | Receita, custos, projeções | PREFERÍVEL |
| `investment_amount` | Capital necessário | PREFERÍVEL |
| `market_context` | Setor, concorrência, timing | PREFERÍVEL |
| `risk_appetite` | Conservador, moderado, agressivo | NÃO |
| `time_horizon` | Curto prazo, médio, longo prazo | NÃO |

## Pré-condições

1. A oportunidade de investimento ou decisão financeira está descrita
2. Pelo menos um contexto financeiro básico está disponível
3. As restrições e os valores do tomador de decisão são compreendidos

## Fases de Execução

### Fase 1: Apresentar a Oportunidade (board-chair)

1. Enquadre a oportunidade em termos claros — o que está sendo considerado?
2. Resuma os dados financeiros e as projeções disponíveis
3. Identifique a decisão: investir/passar, montante, termos, timing
4. Mapeie os riscos conhecidos e as incógnitas
5. Roteie para o comitê de investimentos: Dalio, Munger, Thiel

### Fase 2: Análise de Risco

**Ray Dalio — Análise Baseada em Princípios:**
1. Aplique a transparência radical — quais são as verdades incômodas?
2. Submeta as suposições a teste de estresse — e se as projeções estiverem 50% erradas?
3. Avalie o risco sistemático — isto está correlacionado com fatores macro?
4. Aplique dor + reflexão = progresso — o que a experiência passada ensina?
5. Calcule o valor esperado — resultados ponderados por probabilidade
6. Verifique: Isto se alinha com princípios de investimento estabelecidos?

**Charlie Munger — Análise por Modelos Mentais:**
1. Aplique a inversão — o que faria isto falhar? Trabalhe de trás para frente a partir do desastre
2. Verifique vieses cognitivos — viés de confirmação, FOMO, custo afundado, ancoragem
3. Avalie o círculo de competência — você realmente entende este domínio?
4. Aplique o efeito Lollapalooza — múltiplas forças estão se combinando (a favor ou contra)?
5. Verifique o fosso (moat) — qual é a vantagem competitiva durável?
6. Aplique o "teste do jornal" — você teria orgulho desta decisão na primeira página?

**Peter Thiel — Análise Zero-to-One:**
1. Isto é uma oportunidade 0-para-1 (criar algo novo) ou 1-para-n (copiar)?
2. Qual é o segredo — no que você acredita que a maioria das pessoas não acredita?
3. Isto pode se tornar um monopólio em um mercado pequeno antes de expandir?
4. Aplique o otimismo definido — existe um plano específico, não apenas esperança?
5. Avalie a lei de potência — isto poderia ser um retorno de 100x, ou é incremental?
6. Verifique a vantagem de último a mover-se — isto será a solução definitiva?

### Fase 3: Aplicação de Modelos Mentais

1. Compile as três análises lado a lado
2. Identifique onde as três concordam (sinal de alta confiança)
3. Identifique onde discordam (requer análise mais profunda)
4. Aplique o pensamento de segunda ordem — o que acontece DEPOIS do primeiro movimento?
5. Calcule a assimetria — o potencial de ganho é muito maior do que o de perda?
6. Execute o pre-mortem — imagine que falhou, qual foi a causa?

### Fase 4: Recomendação

1. Sintetize em uma recomendação clara de investir/passar/condicional
2. Se investir: termos recomendados, montante e condições
3. Se passar: o que precisaria mudar para reconsiderar
4. Se condicional: marcos específicos ou informações necessárias
5. Defina critérios de abandono (kill criteria) — o que dispara a saída do investimento
6. Forneça um framework de monitoramento — quais métricas acompanhar

## Formato de Saída

```yaml
investment_counsel:
  opportunity: "{descrição}"
  committee: [ray-dalio, charlie-munger, peter-thiel]
  analyses:
    dalio:
      principles_assessment: "{análise}"
      expected_value: "{cálculo}"
      stress_test: "{pior cenário}"
      verdict: "INVEST | PASS | CONDITIONAL"
    munger:
      mental_models_applied: ["{modelos usados}"]
      inversion_result: "{cenários de falha}"
      bias_check: ["{vieses identificados}"]
      verdict: "INVEST | PASS | CONDITIONAL"
    thiel:
      zero_to_one: "{isto está criando algo novo?}"
      monopoly_potential: "{avaliação}"
      power_law_fit: "{isto poderia ser um 100x?}"
      verdict: "INVEST | PASS | CONDITIONAL"
  synthesis:
    agreement: ["{convergência}"]
    disagreement: ["{divergência}"]
    asymmetry: "{ganho vs perda}"
  recommendation:
    verdict: "INVEST | PASS | CONDITIONAL"
    terms: "{se investir}"
    conditions: "{se condicional}"
    kill_criteria: ["{gatilhos de saída}"]
    monitoring: ["{métricas-chave}"]
```

## Condições de Veto

- **NUNCA** recomende investir sem submeter as suposições a teste de estresse
- **NUNCA** pule o exercício de inversão — sempre considere como isto poderia falhar
- **NUNCA** ignore vieses cognitivos na análise
- **NUNCA** recomende com base apenas em FOMO ou prova social
- **NUNCA** apresente uma recomendação sem definir critérios de abandono (kill criteria)

## Critérios de Conclusão

- [ ] Oportunidade enquadrada com os dados financeiros disponíveis
- [ ] Análise baseada em princípios de Dalio concluída com teste de estresse
- [ ] Modelos mentais de Munger aplicados com inversão e verificação de vieses
- [ ] Análise zero-to-one de Thiel concluída com avaliação de monopólio
- [ ] Análises sintetizadas com concordância e discordância mapeadas
- [ ] Recomendação clara com termos ou condições
- [ ] Critérios de abandono (kill criteria) e framework de monitoramento definidos
