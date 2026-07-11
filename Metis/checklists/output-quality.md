---
tipo: checklist
area: Metis
up: "[[Metis/_MOC-metis]]"
---

# Checklist de Qualidade de Saída de Crescimento Orientado por Dados

**ID do Checklist:** DATA-CL-001
**Referenciado por:** tasks/review.md
**Propósito:** Validar entregáveis de análise de dados e de crescimento orientado por dados quanto à qualidade antes da entrega ao usuário.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida especificamente saídas de crescimento orientado por dados.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não-críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL).]]

---

## 1. Fontes de Dados & Integridade

- [ ] Todas as fontes de dados são explicitamente citadas com datas de recência (CRITICAL)
- [ ] A metodologia de coleta de dados é descrita ou referenciada
- [ ] O tamanho da amostra é adequado para as conclusões tiradas (CRITICAL)
- [ ] As limitações dos dados e vieses conhecidos são divulgados
- [ ] Os dados são relevantes para a pergunta feita, não tangenciais

## 2. Validade Estatística

- [ ] Métodos estatísticos corretos são aplicados para o tipo de dado e a pergunta (CRITICAL)
- [ ] Correlação não é apresentada como causalidade sem justificativa
- [ ] Intervalos de confiança ou margens de erro são declarados quando aplicável
- [ ] Outliers são identificados e seu tratamento é explicado
- [ ] As comparações usam baselines e períodos de tempo apropriados

## 3. Insights Acionáveis

- [ ] Os insights são específicos e acionáveis — não "os dados são interessantes" (CRITICAL)
- [ ] Cada insight se conecta a uma decisão ou ação de negócio
- [ ] As prioridades são claras: em qual insight agir primeiro e por quê
- [ ] Estimativas de impacto são fornecidas: o que acontece se você agir vs não agir
- [ ] Quick wins vs jogadas de longo prazo são distinguidos

## 4. Visualização & Apresentação

- [ ] As visualizações são claras, rotuladas e não enganosas (CRITICAL)
- [ ] Os tipos de gráfico são apropriados para os dados (sem gráficos de pizza para 15 categorias)
- [ ] Os eixos começam em zero ou o desvio é justificado e anotado
- [ ] O uso de cores é acessível e significativo
- [ ] As principais conclusões são destacadas, não enterradas nos dados

## 5. Métricas & KPIs

- [ ] As métricas são definidas com fórmulas/cálculos claros
- [ ] Indicadores antecedentes são distinguidos de indicadores defasados
- [ ] Benchmarks ou targets são fornecidos para contexto
- [ ] As relações entre métricas são mapeadas (como X afeta Y?)
- [ ] As métricas de vaidade são sinalizadas ou excluídas

## 6. Recomendações & Próximos Passos

- [ ] As recomendações são fundamentadas nos dados, não em suposições (CRITICAL)
- [ ] Sugestões de teste A/B são incluídas quando apropriado
- [ ] Plano de monitoramento: o que acompanhar após implementar as mudanças
- [ ] Lacunas de dados são identificadas com recomendações de coleta
- [ ] O prazo para o impacto esperado é estimado

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 reprovações não-críticas.
**REVISAR:** Todos os itens CRÍTICOS [x] mas 3+ reprovações não-críticas.
**REPROVADO:** Qualquer item CRÍTICO desmarcado.
