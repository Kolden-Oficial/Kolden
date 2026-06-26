# Tarefa: SEO Programático (em escala, com guarda de qualidade)

**ID:** ARIADNE-005 · **Versão:** 1.0.0 · **Comando:** `*content` (modo escala) · **Agente:** estrategista-de-conteudo-seo
**Objetivo:** gerar páginas em escala por template + dados, com VALOR ÚNICO real por página (sem thin content).

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| padrão de página | Sim | Ex.: "{serviço} em {cidade}" |
| dataset | Sim | Dados reais que dão valor único a cada página |
| intenção de busca | Sim | A intenção que cada página satisfaz |
| keywords/volume | Não | Via handoff **Argos** (não inventar) |

## Pré-condições
- Existe dado real suficiente para tornar CADA página genuinamente útil. Se não há, NÃO criar a página.

## Fases
1. **Validar a intenção** e o valor único possível por página (o que muda de verdade entre elas).
2. **Definir o template** (estrutura on-page: title/H1/meta/conteúdo) parametrizado pelo dataset.
3. **Guarda de qualidade** (gate "página oca não nasce"): cada página tem conteúdo único suficiente, não é duplicata, satisfaz a intenção. E-E-A-T respeitado.
4. **Mapear keyword→página** (sem canibalização).
5. **Briefing de copy** → handoff **Caliope** (a copy persuasiva final não é escrita aqui).

## Saída
- Template + regras de geração + **gate de qualidade** + mapa keyword→página + estimativa de quantas páginas têm valor real (não só quantas o dataset permite).

## Vetos
- NUNCA gerar páginas ocas/thin (dispara scaled content abuse — penalização Google 2025); sem keyword-stuffing/doorway; volume só com ferramenta provisionada (senão hipótese); copy final = handoff Caliope; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] Valor único por página garantido · [ ] Template definido · [ ] Guarda de qualidade aplicada · [ ] Sem canibalização · [ ] Briefing → Caliope
