# Tarefa: Análise de CRO de Página

**ID:** ARIADNE-007 · **Versão:** 1.0.0 · **Comando:** `*cro` · **Agente:** analista-de-cro
**Objetivo:** analisar a página nas 7 dimensões e devolver HIPÓTESES testáveis + experimentos.

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| url | Sim | Página a otimizar |
| ação-objetivo | Sim | Assinar / demo / comprar / contato |
| fonte de tráfego | Sim | Frio (ads) / quente (email) / pesquisa (orgânico) |
| dado | Não | Taxa atual, heatmap, gravação — sem dado, gargalo é hipótese |

## Pré-condições
- Renderizar a página (mobile e desktop). Pedir dado comportamental antes de afirmar o gargalo.

## Fases
1. **Ler em 5s** (proposta de valor clara?). 2. **Descer as 7 dimensões na ordem:** proposta de valor → título → CTA → hierarquia visual → prova → objeções → fricção.
3. **Montar hipóteses** (cartão: o que muda / por quê / como medir / critério / variável isolada), puxando da `data/biblioteca-de-experimentos-cro.md` conforme o gargalo.
4. **Priorizar:** Quick Wins / Alto Impacto / Hipóteses de Teste.
5. **Handoffs:** copy final → Caliope; formulário → otimizador-de-formulario; instrumentação/leitura → Metis.

## Saída (exemplo)
```
H1 [ALTO]: Se destacar o plano recomendado, então +conversão, porque remove ansiedade de escolha.
  Métrica: conversão /planos | Critério: +15% rel. | A/B → medir @metis
Quick win: CTA "Enviar" → texto de valor (briefing → @caliope)
```

## Vetos
- Toda mudança de impacto é hipótese testável (nunca "confie, converte"); pedir dado antes de afirmar gargalo; sem dark pattern; copy final → Caliope; medição → Metis; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] 7 dimensões analisadas · [ ] Hipóteses no formato correto · [ ] Priorizado · [ ] Handoffs identificados
