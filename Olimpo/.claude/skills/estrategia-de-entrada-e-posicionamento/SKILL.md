---
name: estrategia-de-entrada-e-posicionamento
description: Use quando o Zeus precisar decidir ONDE competir e COMO vencer — abertura de vertical/geografia nova, escolha de nicho inicial ("beach-head"), reposicionamento contra concorrente entrincheirado, ou avaliação de janela de mercado. Combina 3Cs (Customer/Company/Competitor de Ohmae) para diagnosticar o campo, Cinco Forças (Porter) para medir atratividade estrutural e Wardley Mapping para expor a evolução de cada componente (genesis→custom→product→commodity) e escolher a jogada. NÃO use para posicionamento de MENSAGEM (isso é Apolo/marca) nem para prioritização de features (Prometeu/moscow-kano). Aqui é onde-competir + como-vencer no nível de EMPRESA.
invocavel_por: zeus
tags: [estrategia, posicionamento, entrada, 3cs, porter, wardley, olimpo]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Estratégia de Entrada e Posicionamento

Zeus abre uma nova frente (mercado, vertical, geografia) ou reposiciona a empresa contra um concorrente entrincheirado. A pergunta mestre é dupla: **onde competir** (recorte de mercado onde a Kolden pode vencer) e **como vencer** (vantagem estrutural que sustenta a posição).

Método em três camadas ancoradas em frameworks históricos, todas obrigatórias antes de assinar a `decomposicao` do Contrato de Missão.

## Herança histórica

- **Kenichi Ohmae** (McKinsey Japão, "The Mind of the Strategist", 1982) — codificou os **3Cs** (Customer, Company, Competitor) como o triângulo estratégico irredutível. Insight: se um dos três vértices está fora de foco, a estratégia colapsa; foco no cliente vem primeiro, sempre.
- **Michael Porter** (HBS, "Competitive Strategy", 1980) — introduziu as **Cinco Forças** (rivalidade, novos entrantes, substitutos, poder do comprador, poder do fornecedor) e as três estratégias genéricas (custo, diferenciação, foco). Insight: a rentabilidade média da indústria é fixada pela estrutura das forças, não pela sorte do operador.
- **Simon Wardley** ("Wardley Maps", ex-Fotango/Canonical, 2005+) — mapa evolucionário: cada componente da cadeia de valor é plotado no eixo evolutivo (genesis → custom-built → product/rental → commodity/utility). Insight: a mesma capacidade exige tática oposta em pontos diferentes do eixo — pioneiros em genesis, settlers em product, town-planners em commodity.

## Método em três camadas

### Camada 1 — Diagnóstico 3Cs (Ohmae)

Preencha os três vértices ANTES de qualquer análise competitiva. Vago em qualquer vértice = pare e busque dado.

- **Customer** — segmentos-alvo com dor comprovada, jobs-to-be-done, willingness-to-pay real (não vibes), tamanho endereçável (TAM/SAM/SOM). Vetor de compra (quem decide, quem paga, quem usa).
- **Company** — capacidades reais da Kolden hoje (não aspiracionais): squads ativos, dados proprietários, moats existentes (marca, contratos, dados, distribuição), custo de servir, restrição de caixa.
- **Competitor** — top 3 concorrentes diretos + top 2 substitutos indiretos. Para cada: proposta, preço, share estimado, taxa de crescimento, ponto forte e fraqueza estrutural (não cosmética).

Regra de saída: se você não consegue explicar o cliente, a empresa e o concorrente em 3 frases cada com dado ao lado, não há diagnóstico — há palpite.

### Camada 2 — Atratividade estrutural (Porter)

Para o recorte de mercado escolhido no 3Cs, pontue 1-5 cada uma das cinco forças (5 = força alta contra o operador; 1 = benigno):

1. **Rivalidade entre existentes** — n° de players, concentração, taxa de crescimento, custos fixos, diferenciação percebida.
2. **Ameaça de novos entrantes** — barreiras de entrada (capital, regulação, marca, economia de escala, curva de aprendizado).
3. **Ameaça de substitutos** — soluções fora da indústria que resolvem o mesmo job (planilha vs SaaS, freelancer vs agência).
4. **Poder de barganha do comprador** — concentração de compradores, custo de troca, informação do comprador, produto commoditizado.
5. **Poder de barganha do fornecedor** — concentração de fornecedores, insumos críticos, custo de troca.

Soma > 20 = indústria estruturalmente ruim, evite salvo se você tem vantagem inescapável. Soma 12-20 = média, foco em nicho. Soma < 12 = atrativa, mas cuidado com a atenção de novos entrantes.

Escolha a **estratégia genérica**: liderança em custo, diferenciação ou foco. Misturar é ficar preso no meio (Porter, 1980, p. 40).

### Camada 3 — Mapa de Wardley (evolução + jogada)

Plote a cadeia de valor da proposta (do usuário no topo aos componentes de infra na base) contra o eixo evolutivo:

```
Genesis  →  Custom-Built  →  Product/Rental  →  Commodity/Utility
(novo)      (feito sob medida)  (SaaS/produto)   (utility, quase-grátis)
```

Para cada componente marque:
- **Posição atual** no eixo.
- **Direção do movimento** (tudo desliza para a direita com o tempo).
- **Tática correta** para a fase: pioneiros/pesquisa em genesis, engenharia de produto em custom→product, otimização/consolidação em product→commodity.

Perguntas de saída:
- Estamos usando pioneiros onde precisávamos de town-planners (queima de talento sênior em coisa comoditizada)?
- Estamos empacotando como produto algo que ainda é genesis (matando iteração)?
- Onde o adversário está exposto (ex: preso em custom-built enquanto a peça já virou commodity)?

## Aplicação ao contexto Kolden

- **Recorte inicial ("beach-head")**: escolha vertical onde os 3Cs sejam nítidos, Porter dê nota ≤ 15 e o mapa Wardley mostre uma **peça em transição** que a Kolden pode capturar (ex: automação de operação de mídia paga que ainda é custom mas virando produto).
- **Vantagem sustentável**: nomeie 1-2 moats reais (dado proprietário do LobeHub, squad especializado, contrato longo). Sem moat = estratégia é apenas plano de vendas.
- **Trade-off explícito**: cada onde-competir vem com um NÃO-fazer. Zeus registra o que a Kolden decidiu NÃO perseguir para segurar foco.

## Entregável

Anexar à seção `zeus.diagnostico` do Contrato de Missão:

```yaml
zeus:
  diagnostico:
    onde_competir:
      segmento: "<recorte de mercado com 3Cs preenchidos>"
      tam_sam_som: "<números com fonte>"
      janela_de_mercado: "<por que agora>"
    como_vencer:
      estrategia_generica: "<custo | diferenciacao | foco>"
      moats: ["<moat 1>", "<moat 2>"]
      nao_perseguir: ["<escopo cortado 1>", "<escopo cortado 2>"]
    porter_score: "<1-5 por força + soma>"
    wardley_movimento: "<peça capturada e por quê>"
```

## Guardrails

- Não desenhar mensagem/copy de marca — isso é Apolo (`branding` / Caliope).
- Não fazer priorização de features do produto — isso é Prometeu (`moscow-kano-mcda`).
- Não emitir preço final por SKU — cross com Plutos (`analise-de-pricing-wtp`).
- Se o 3Cs tem vago em qualquer vértice, pare e peça dado ANTES de assinar.
- Toda escolha registra o trade-off (o que a Kolden NÃO vai fazer).

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — IDs G10+G11 do bucket B15.*
