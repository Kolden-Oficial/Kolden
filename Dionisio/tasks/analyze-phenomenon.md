---
task: analyzePhenomenon()
responsavel: "@fenomenologo"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: subject
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: phenomenological_analysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Experiência vivida identificada com estruturas essenciais"
  - "[ ] Tensão coletiva mapeada com classificação de intensidade"
  - "[ ] Potencial de movimento avaliado com justificativa"
tipo: nota
area: Dionisio
up: "[[Dionisio/_MOC-dionisio]]"
relacionado:
  - "[[Dionisio/tasks/_indice|_indice]]"
---

# Tarefa: Analisar Fenômeno

**ID da Tarefa:** MOVEMENT-002
**Versão:** 1.0.0
**Comando:** `*analyze-phenomenon`
**Agente:** Fenomenologo (fenomenologo)
**Propósito:** Conduzir análise fenomenológica para identificar experiências vividas compartilhadas que possam acender um movimento

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `subject` | Prompt do usuário | Sim | O fenômeno, experiência ou tensão a analisar |
| `audience` | Prompt do usuário | Sim | O grupo cuja experiência está sendo analisada |
| `context` | Sessão | Não | Contexto cultural, de mercado ou social |
| `data_sources` | Usuário | Não | Entrevistas, pesquisas, threads de redes sociais, fóruns |

## Pré-condições

- Frameworks de movimento carregados (`data/movement-frameworks.yaml`)
- O sujeito é uma experiência humana, não uma funcionalidade de produto
- O público-alvo é identificável e alcançável

## Fases de Execução

### Fase 1: Identificar a Experiência Vivida

1. Defina o **fenômeno** -- qual experiência está sendo examinada
2. Coloque as suposições entre parênteses -- suspenda preconcepções sobre a experiência (epoché)
3. Colete **relatos em primeira pessoa** -- como as pessoas descrevem essa experiência com suas próprias palavras
4. Identifique as **estruturas essenciais** -- quais elementos estão sempre presentes na experiência
5. Mapeie a **paisagem emocional** -- quais sentimentos acompanham a experiência
6. Documente os achados brutos de forma não filtrada

### Fase 2: Mapear a Tensão Coletiva

1. Identifique a **lacuna** entre como as coisas são e como as pessoas querem que sejam
2. Nomeie a **frustração** -- qual dor ou atrito específico as pessoas sentem
3. Detecte **padrões sistêmicos** -- essa tensão é pessoal ou estrutural
4. Avalie a **intensidade da tensão** em uma escala de 5 pontos:
   - 1: Leve incômodo (potencial de faísca fraco)
   - 2: Frustração recorrente (potencial moderado)
   - 3: Ponto de dor ativo (bom potencial)
   - 4: Conflito em nível de identidade (forte potencial)
   - 5: Tensão existencial (potencial de grau-movimento)
5. Mapeie quem mais sente essa tensão -- alcance e escala

### Fase 3: Encontrar a Narrativa Compartilhada

1. Extraia a **história comum** que as pessoas contam a si mesmas sobre essa experiência
2. Identifique o **vilão** -- o que ou quem é culpado pela tensão
3. Identifique o **arquétipo de herói** -- quem as pessoas aspiram a se tornar
4. Encontre o **ponto de virada** -- o que mudaria tudo
5. Teste a ressonância da narrativa -- essa história parece universalmente verdadeira para o público
6. Destile em um **núcleo narrativo** -- um parágrafo que captura a história compartilhada

### Fase 4: Articular a Aspiração

1. Defina o **estado futuro desejado** -- como o mundo se parece quando a tensão é resolvida
2. Nomeie a **transformação** -- o que muda para o indivíduo
3. Nomeie o **impacto** -- o que muda para o coletivo
4. Forje a **declaração de aspiração** -- uma frase que captura o sonho
5. Valide: essa aspiração parece ao mesmo tempo ambiciosa e alcançável
6. Avalie o potencial de movimento: BAIXO / MÉDIO / ALTO / CRÍTICO

## Formato de Saída

```yaml
phenomenological_analysis:
  phenomenon: "{nome}"
  audience: "{grupo-alvo}"
  lived_experience:
    essential_structures: ["{elemento1}", "{elemento2}", "{elemento3}"]
    emotional_landscape: ["{emoção1}", "{emoção2}", "{emoção3}"]
  collective_tension:
    gap: "{estado atual vs estado desejado}"
    frustration: "{frustração nomeada}"
    intensity: {1-5}
    scope: "{pessoal|comunidade|estrutural|sistêmico}"
  shared_narrative:
    villain: "{o que/quem é culpado}"
    hero_archetype: "{quem as pessoas aspiram ser}"
    turning_point: "{o que mudaria tudo}"
    narrative_kernel: |
      {um parágrafo de história compartilhada}
  aspiration:
    desired_future: "{estado futuro}"
    transformation: "{mudança individual}"
    impact: "{mudança coletiva}"
    aspiration_statement: "{uma frase}"
  movement_potential: "{BAIXO|MÉDIO|ALTO|CRÍTICO}"
```

## Condições de Veto

1. **NUNCA analise uma funcionalidade de produto como um fenômeno** -- a fenomenologia estuda a experiência humana, não produtos
2. **NUNCA fabrique experiências vividas** -- todos os achados precisam remeter a relatos humanos reais
3. **NUNCA pule a etapa de colocar entre parênteses** -- suposições contaminam a análise
4. **NUNCA avalie o potencial de movimento acima de MÉDIO sem intensidade >= 3** -- tensão fraca não sustenta um movimento
5. **NUNCA produza um núcleo narrativo sem validar a ressonância** -- uma história que não ressoa é ficção

## Critérios de Conclusão

- [ ] Experiência vivida identificada com estruturas essenciais documentadas
- [ ] Tensão coletiva mapeada com classificação de intensidade (1-5)
- [ ] Narrativa compartilhada destilada com vilão, herói e ponto de virada
- [ ] Aspiração articulada com transformação e impacto
- [ ] Potencial de movimento avaliado com justificativa
- [ ] Núcleo narrativo escrito e testado quanto à ressonância
- [ ] Saída corresponde ao esquema acima
