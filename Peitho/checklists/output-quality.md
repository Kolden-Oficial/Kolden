---
tipo: checklist
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Checklist de Qualidade de Saída de Tráfego Pago

**Checklist ID:** TRAFFIC-CL-001
**Referenciado por:** tasks/review.md
**Propósito:** Validar entregáveis de tráfego pago quanto à qualidade antes da entrega ao usuário.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida especificamente a saída de tráfego pago.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL).]]

---

## 1. Segmentação & Público

- [ ] O público-alvo está definido com especificidade: demografia, interesses, comportamentos (CRITICAL)
- [ ] Públicos custom/lookalike são considerados quando apropriado
- [ ] Públicos de exclusão definidos para evitar gasto desperdiçado
- [ ] O tamanho do público é apropriado para o orçamento e o objetivo
- [ ] A geossegmentação é especificada e justificada

## 2. Estrutura de Campanha

- [ ] O objetivo da campanha corresponde à meta de negócio (CRITICAL)
- [ ] A hierarquia Campanha > Conjunto de Anúncios > Anúncio está logicamente organizada
- [ ] Variações de teste A/B são incorporadas quando apropriado
- [ ] Alinhamento de estágio de funil: awareness, consideração, conversão
- [ ] Estratégia de retargeting definida para cada estágio do funil

## 3. Criativo & Texto do Anúncio

- [ ] O criativo segue as melhores práticas específicas da plataforma (proporção de tela, limites de texto, formato) (CRITICAL)
- [ ] O gancho está presente nos primeiros 3 segundos (vídeo) ou na primeira linha (texto)
- [ ] O CTA é claro, específico e corresponde à landing page
- [ ] O texto do anúncio está em conformidade com as políticas de publicidade da plataforma (sem alegações proibidas)
- [ ] Múltiplas variações de criativo fornecidas para teste

## 4. Orçamento & Lances

- [ ] A alocação de orçamento é justificada com fundamentação (CRITICAL)
- [ ] A escolha entre orçamento diário vs vitalício é explicada
- [ ] A estratégia de lance corresponde ao objetivo da campanha
- [ ] O orçamento é suficiente para o tamanho do público e a fase de aprendizado
- [ ] Plano de escala definido: quando e como aumentar o gasto

## 5. KPIs & Mensuração

- [ ] O KPI primário está definido e é mensurável: CPA, ROAS, CPL, CTR (CRITICAL)
- [ ] Pixels de rastreamento/conversões são especificados para implementação
- [ ] O modelo de atribuição é declarado (last-click, first-click, multi-touch)
- [ ] Valores de benchmark fornecidos para comparação
- [ ] Cadência de relatórios e checkpoints de otimização definidos

## 6. Alinhamento com a Landing Page

- [ ] A mensagem do anúncio corresponde à mensagem da landing page (continuidade de scent)
- [ ] A velocidade de carregamento da landing page é considerada
- [ ] O mecanismo de conversão na landing page está definido
- [ ] A experiência mobile foi verificada ou sinalizada para verificação

---

## Critérios de PASS/FAIL

**PASS:** Todos os itens CRÍTICOS [x] e menos de 3 falhas não críticas.
**REVISE:** Todos os itens CRÍTICOS [x], mas 3+ falhas não críticas.
**FAIL:** Qualquer item CRÍTICO desmarcado.
