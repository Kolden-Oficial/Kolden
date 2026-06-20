---
name: consulta-ao-registro
description: Consulta o registro de entidades antes de criar qualquer agente, squad, skill, hook ou subagent, aplicando REUSE > ADAPT > CREATE. Use na Fase 0 do Ritual, antes do diagnóstico, e sempre que for criar uma entidade nova para evitar duplicação.
---

# Consulta ao Registro (Fase 0)

Executa a Constituição, Artigo VI (REUSE > ADAPT > CREATE). Delegue ao subagent `curador`.

## Processo

1. Leia `dados/registro-de-entidades.yaml`.
2. Extraia as keywords e o domínio do pedido do usuário (ex.: "agente de suporte no
   WhatsApp" → domínio `conversacional`, keywords `[suporte, atendimento, whatsapp]`).
3. Para cada entidade do registry, calcule a **relevância** = sobreposição de keywords
   ponderada por domínio igual (domínio diferente derruba a relevância).
4. Aplique a decisão:
   - **relevância ≥ 0.90** → **REUSE**: proponha usar a entidade existente como está.
   - **0.60 ≤ relevância < 0.90** e `adaptabilidade.score ≥ 0.6` → **ADAPT**: proponha
     partir da entidade-base e mudar ≤ 30%, respeitando suas `restricoes`.
   - **sem correspondência** → **CREATE**: segue para o diagnóstico do zero; a entidade
     será registrada na Fase 8 com justificativa.
5. Consulte também `dados/padroes-aprendidos.yaml` e traga os padrões do domínio que
   devem guiar o diagnóstico e a arquitetura.

## Saída

Um veredito curto que pré-alimenta a Fase 1:

```
DECISÃO: REUSE | ADAPT | CREATE
Entidade-base: <id ou "nenhuma">
Relevância: <0-1>
Pré-preenchido para o diagnóstico: <campos que já dá para herdar>
Padrões aplicáveis: <ids de padroes-aprendidos>
```

## Regras

- A Fase 0 é **consultiva (INFO)**: não bloqueia, mas a decisão precisa ser registrada.
- Na primeira execução (registry vazio) o resultado é sempre CREATE — isso é esperado.
- Não invente entidades: só proponha REUSE/ADAPT sobre o que realmente existe no registry.
