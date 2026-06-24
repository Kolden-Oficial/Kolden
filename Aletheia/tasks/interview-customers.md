---
task: interview-customers()
responsavel: "@rob-fitzpatrick"
responsavel_type: Agent
atomic_layer: Task
elicit: true
---

# Tarefa: Descoberta da Dor (Entrevistas) — Aletheia

| Campo        | Valor                                        |
|--------------|----------------------------------------------|
| Task ID      | `aletheia:interview-customers`              |
| Primário     | `rob-fitzpatrick` · Secundário: `steve-blank` |
| Propósito    | Produzir um roteiro de entrevista sem viés e sintetizar a descoberta para validar (ou refutar) a dor |

## Fases

### Fase 1: Roteiro (rob-fitzpatrick)
1. Aplique The Mom Test: perguntas sobre a VIDA e o PASSADO do cliente, nunca sobre a ideia ou o futuro hipotético.
2. Gere as 3 perguntas mais importantes (e mais temidas) para esta ideia.
3. Defina o segmento específico (who-where) e como encontrá-lo.

### Fase 2: Sair do Prédio (steve-blank)
1. Caracterize os earlyvangelists (têm o problema, sabem que têm, já improvisaram solução, têm orçamento).
2. Oriente a coleta de fatos fora do prédio — não validar no escritório.

### Fase 3: Síntese
1. Filtre os dados ruins: elogios, fluff (genérico/hipotético) e pedidos de feature não são evidência.
2. Busque sinais de compromisso e avanço (tempo, reputação, dinheiro).
3. Conclua: a dor é real, frequente e cara? Para quem?

## Formato de Saída
```yaml
discovery:
  segment: "{who-where específico}"
  interview_script: ["{perguntas Mom Test}"]
  earlyvangelists: "{perfil}"
  evidence: ["{fatos de comportamento observados}"]
  pain_validated: {true|false|inconclusivo}
  notes: "{dados ruins descartados e por quê}"
```

## Regras de Veto
- NUNCA inclua pergunta hipotética/sugestiva ("você compraria...?").
- NUNCA trate elogio/fluff/ideia como validação.
- Declare o tamanho da amostra; amostra pequena → inconclusivo, nunca "validado".

## Critérios de Conclusão
- [ ] Roteiro segue o Mom Test (auditado contra perguntas enviesadas)
- [ ] Segmento específico e encontrável
- [ ] Síntese separa fato de opinião
- [ ] Veredito de dor: validada / refutada / inconclusivo
