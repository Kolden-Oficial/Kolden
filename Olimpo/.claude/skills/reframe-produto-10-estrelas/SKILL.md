---
name: reframe-produto-10-estrelas
description: >-
  Use ANTES de decompor ou rotear uma missão no Olimpo, quando houver risco de
  o time pensar pequeno — tratar o pedido literalmente em vez de enxergar o
  produto que ele realmente quer ser. Reenquadra o desafio pela VISÃO (o
  "produto 10 estrelas"), não por melhoria incremental. Acione quando o Ronan
  pedir para "pensar maior", "ser mais ambicioso", "repensar o escopo", quando
  o pedido parecer um remendo de algo maior, ou no início da descida do Zeus
  sobre o Contrato de Missão. NÃO use para execução já decidida nem quando a
  missão é explicitamente um hotfix/correção pontual (aí o modo é MANTER ESCOPO).
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Reframe "produto 10 estrelas"

O reflexo de um CEO de classe mundial diante de um pedido não é "como entrego
isto?" — é **"qual é o produto 10 estrelas escondido neste pedido?"**. A maioria
das missões chega descrita como um incremento ("adiciona um botão", "melhora a
página"). O Zeus reenquadra pelo resultado que o pedido persegue, não pela forma
em que ele veio. Você reimagina partindo da experiência ideal, depois recua para
o que cabe — nunca o contrário.

> Onde encaixa: roda na **descida**, no momento em que o Contrato de Missão chega
> ao Zeus, **antes** de decompor e rotear para os 8 deuses. Toda expansão de
> escopo aprovada vira escopo do contrato (seção `zeus`); toda recusada vira
> "FORA de escopo" registrado. Você **propõe** com entusiasmo; o Ronan **decide**
> (portão de aprovação Kolden). Nenhum escopo entra sem aprovação explícita.

## 0. Desafio de premissa (sempre primeiro)

Antes de qualquer plano, ataque a premissa do pedido:

1. **É o problema certo?** Outro enquadramento entregaria solução muito mais
   simples ou de muito mais impacto?
2. **Qual é o resultado real** (de negócio / do usuário)? O pedido é o caminho
   mais direto até ele, ou está resolvendo um problema-proxy?
3. **E se não fizéssemos nada?** A dor é real ou hipotética?

## 1. Mapa do estado dos sonhos

Descreva o estado ideal do sistema/negócio daqui a 12 meses. Este plano move em
direção a esse estado ou para longe dele?

```
  ESTADO ATUAL            ESTE PEDIDO              IDEAL EM 12 MESES
  [descreva]      --->    [descreva o delta]  --->  [descreva o alvo]
```

## 2. Alternativas de implementação (obrigatório, 2-3)

Antes de escolher o modo, produza 2 a 3 abordagens distintas. Uma deve ser a
**mínima viável** (menor diff, menos partes móveis) e uma deve ser a
**arquitetura ideal** (melhor trajetória de longo prazo). **As duas têm peso
igual** — não escolha a mínima só por ser menor. Recomende a que melhor serve ao
objetivo do Ronan; se a resposta certa for reconstruir, diga isso. Para cada uma:
resumo (1-2 linhas), esforço (P/M/G/GG), risco (baixo/médio/alto), prós, contras,
o que reaproveita.

## 3. Os quatro modos (escolha 1 e comprometa-se)

| Modo | Postura | Quando (default) |
|------|---------|------------------|
| **EXPANSÃO DE ESCOPO** | Sonhe grande: proponha a versão ambiciosa, cada expansão aprovada individualmente | Funcionalidade nova / greenfield |
| **EXPANSÃO SELETIVA** | Escopo atual é a base; mostra o possível, o Ronan escolhe a dedo | Iteração sobre algo existente |
| **MANTER ESCOPO** | Escopo está certo; revisa com rigor máximo, sem expandir | Bug fix, hotfix, refatoração |
| **REDUÇÃO DE ESCOPO** | Plano superdimensionado; corta para o mínimo que entrega valor | Missão tocando muitas frentes |

### Análise por modo (expansão)
- **Check 10x:** qual é a versão 10x mais ambiciosa que entrega 10x mais valor
  por ~2x o esforço? Descreva concretamente.
- **Ideal platônico:** se o melhor do mundo tivesse tempo ilimitado e gosto
  perfeito, como seria? O que o usuário sentiria? Comece pela experiência, não
  pela arquitetura.
- **Oportunidades de encanto:** liste ≥5 melhorias adjacentes baratas onde o
  usuário pensaria "ah, que bom que pensaram nisso".

### Cerimônia de opt-in
Descreva a visão primeiro (felt experience — lidere pela experiência sentida,
feche com esforço e impacto concretos). Depois destile cada proposta de escopo e
**apresente uma a uma ao Ronan**: (A) entra no escopo desta missão, (B) adia para
backlog, (C) descarta. Evocativo, não promocional: "faz o produto parecer 10x
mais vivo" é vívido; "isto 10x sua receita" é venda exagerada — evite.

## Regra de ouro
Em todos os modos você está 100% sob controle do Ronan. Nenhum escopo é
adicionado sem aprovação explícita. Uma vez escolhido o modo, comprometa-se — não
deslize silenciosamente.

---
*Técnica absorvida de `garrytan/gstack@11de390` (skills `plan-ceo-review` + `autoplan`, modos e check 10x), licença MIT. Reescrita em PT-BR e adaptada ao Contrato de Missão do Olimpo — sem cópia literal; o tooling/telemetria do gstack não foi absorvido.*
