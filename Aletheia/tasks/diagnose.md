---
task: diagnose()
responsavel: "@aletheia-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: query
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Query analisada com classificação de estágio e assunção mais arriscada"
  - "[ ] Resposta rápida fornecida"
  - "[ ] Rota executada ou resposta direta dada"
---

# Tarefa: Diagnosticar — Aletheia

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `aletheia:diagnose`                                          |
| Comando       | `@aletheia validate "{query}"`                              |
| Orquestrador  | `aletheia-chief`                                             |
| Propósito     | Analisar a ideia/pergunta, identificar o estágio e a assunção mais arriscada, dar uma resposta rápida e rotear para o melhor especialista de validação |

## Entradas

| Entrada       | Origem            | Obrigatório | Descrição                                |
|---------------|-------------------|-------------|------------------------------------------|
| `query`       | Prompt do usuário | Sim         | A ideia ou a pergunta de validação       |
| `context`     | Sessão            | Não         | Contexto da conversa anterior            |
| `stage_hint`  | Usuário/Auto      | Não         | Estágio sugerido (problema, solução, mercado) |

## Pré-condições

- Configuração do squad carregada (`config/config.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Pelo menos uma definição de especialista existe em `agents/`

## Fases

### Fase 1: Analisar (aletheia-chief)

1. Leia a query e extraia:
   - **Intenção**: o que o usuário quer validar/aprender
   - **Estágio**: problema/descoberta, solução/experimento, mercado/demanda
   - **Assunção mais arriscada**: o que está sendo assumido como verdade e ainda não foi testado
   - **Palavras-chave de domínio**: corresponda com o catálogo de roteamento
   - **Complexidade**: simples (resposta direta) vs jornada (precisa de especialista/sequência)

2. Classifique o tipo da query:
   - `discovery` — precisa descobrir/validar a dor (entrevistas, JTBD)
   - `experiment` — precisa desenhar experimento/MVP ou mapear assunções
   - `market` — precisa testar demanda ou dimensionar mercado
   - `decision` — precisa de veredito perseverar/pivotar/parar (gate)
   - `framework` — precisa que o framework de um especialista específico seja aplicado

### Fase 2: Corresponder Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Pontue cada domínio em relação às palavras-chave extraídas
3. Identifique:
   - **Agente primário**: melhor correspondência
   - **Agente secundário**: prepara o próximo estágio ou traz perspectiva complementar
   - **Nível de confiança**: HIGH (≥3 keywords), MEDIUM (2), LOW (0-1)

4. Guia de seleção por estágio:
   | Estágio / Objetivo               | Primário        | Secundário      |
   |----------------------------------|-----------------|-----------------|
   | Entrevistar / dor                | rob-fitzpatrick | steve-blank     |
   | Hipóteses do negócio / mercado-tipo | steve-blank  | eric-ries       |
   | Job / outcomes                   | tony-ulwick     | rob-fitzpatrick |
   | Assunções / experimento          | david-bland     | eric-ries       |
   | MVP / Build-Measure-Learn        | eric-ries       | david-bland     |
   | Lean Canvas / problem-solution   | ash-maurya      | steve-blank     |
   | Demanda / pretotype / sizing     | alberto-savoia  | david-bland     |

### Fase 3: Responder

1. **Sempre forneça uma resposta rápida primeiro** — 2-4 frases que abordam a query e nomeiam a assunção mais arriscada.
2. Inclua: resposta direta + qual framework de especialista é mais relevante + o próximo passo de validação.

### Fase 4: Rotear (se necessário)

1. Se a confiança for HIGH ou MEDIUM:
   - Anuncie: "Roteando para @{agent} — estágio {stage}, para testar {assunção}"
   - Passe o contexto: ideia + estágio + assunção arriscada + evidência já existente
2. Se a confiança for LOW: NÃO roteie — responda diretamente e ofereça escolhas.

## Formato de Saída

```yaml
diagnosis:
  query_summary: "{resumo de 1 linha}"
  stage: "{problema|solucao|mercado|decisao}"
  riskiest_assumption: "{a coisa assumida e ainda não testada}"
  intent: "{discovery|experiment|market|decision|framework}"
  quick_answer: |
    {resposta direta de 2-4 frases, nomeando a assunção mais arriscada}
  routing:
    confidence: "{HIGH|MEDIUM|LOW}"
    primary_agent: "{agent-id}"
    secondary_agent: "{agent-id}"
    reason: "{por que este especialista é a melhor correspondência}"
  routed: {true|false}
```

## Regras de Veto

1. **NUNCA roteie sem dar uma resposta rápida primeiro** — o usuário sempre recebe valor imediato.
2. **NUNCA roteie com confiança LOW** — responda direto e ofereça escolhas.
3. **SEMPRE nomeie a assunção mais arriscada** — é o que organiza toda a validação.
4. **NUNCA pule estágio** — não roteie para experimento/MVP se a dor ainda não foi validada.
5. **NUNCA recomende construir aqui** — diagnóstico roteia; a decisão de build passa pelo gate (decide.md).

## Critérios de Conclusão

- [ ] Query analisada com estágio e assunção mais arriscada identificados
- [ ] Catálogo de roteamento consultado e confiança pontuada
- [ ] Resposta rápida fornecida (obrigatória)
- [ ] Rota executada se confiança ≥ MEDIUM, ou resposta direta se LOW
- [ ] Formato de saída corresponde ao schema acima
