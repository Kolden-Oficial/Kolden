---
task: auditAdAccount()
responsavel: "@ads-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: account_data
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: adAccountAudit
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Scorecard de saúde de 8 dimensões concluído"
  - "[ ] Todas as campanhas categorizadas por nível de performance"
  - "[ ] 5 recomendações priorizadas com impacto projetado"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Auditar Conta de Anúncios

**Task ID:** TRAFFIC-002
**Versão:** 1.0.0
**Comando:** `*audit-ad-account`
**Agente:** Ads Analyst (ads-analyst) ou Performance Analyst (performance-analyst)
**Propósito:** Auditoria abrangente de uma conta de anúncios para identificar desperdício, oportunidades e prioridades de otimização.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| platform | enum | Prompt do usuário | Sim | facebook, google, tiktok, linkedin, youtube |
| account_data | object | Prompt do usuário | Sim | Métricas-chave: investimento, CPA, ROAS, CTR, CVR, impressões |
| time_period | string | Prompt do usuário | Sim | Janela de auditoria (últimos 30, 60 ou 90 dias) |
| business_type | string | Prompt do usuário | Não | Contexto de setor para benchmarking |
| goals | string | Prompt do usuário | Não | Objetivos e metas de negócio |
| num_campaigns | number | Prompt do usuário | Não | Número de campanhas ativas |

---

## Pré-condições

- Dados da conta disponíveis com ao menos 30 dias de histórico
- Acesso a métricas em nível de campanha (não apenas em nível de conta)
- Metas de negócio definidas para contexto

---

## Fases de Execução

### Fase 1: Verificação de Saúde da Conta
1. Pontue a conta em 8 dimensões (1-10 cada):
   - Estrutura: Organização e convenções de nomenclatura de campanha/conjunto de anúncios/anúncio
   - Segmentação: Qualidade, sobreposição e níveis de exaustão de público
   - Criativo: Variedade, frescor e distribuição de performance dos anúncios
   - Orçamento: Eficiência de alocação entre campanhas
   - Lances: Adequação da estratégia e otimização
   - Rastreamento: Precisão da configuração de pixel/conversão
   - Alinhamento de Funil: Campanhas casadas com etapas do funil
   - Performance: Métricas vs benchmarks de plataforma
2. Calcule as métricas agregadas em nível de conta
3. Compare contra os benchmarks de plataforma para o setor

### Fase 2: Análise em Nível de Campanha
1. Categorize as campanhas por nível de performance:
   - Vencedoras: ROAS/CPA acima da meta (escalar estas)
   - Performáticas: Métricas na meta (otimizar estas)
   - De baixa performance: Abaixo da meta, em queda (corrigir ou matar)
   - Zumbis: Baixo investimento, baixo volume, sem propósito claro (matar estas)
2. Para cada campanha de baixa performance, diagnostique a causa raiz:
   - CTR baixo: Fadiga de criativo ou descasamento de segmentação
   - CTR alto mas CVR baixo: Problema de landing page ou oferta
   - CVR alto mas CPA alto: Problema de lance ou orçamento
   - Alcance baixo: Público muito estreito ou orçamento muito baixo
3. Calcule o investimento desperdiçado em campanhas de baixa performance e zumbis
4. Identifique as 3 principais oportunidades de receita na conta

### Fase 3: Análise de Criativo e Público
1. Ranqueie todos os anúncios ativos por ROAS e volume
2. Identifique padrões de criativo nos de melhor performance:
   - Formato (imagem, vídeo, carrossel)
   - Tipo de hook (pergunta, afirmação, choque, história)
   - Tamanho (copy curta vs longa)
   - Estilo visual
3. Identifique sinais de fadiga de público:
   - Frequência acima de 3 em campanhas de prospecção
   - CTR em queda ao longo do tempo nos mesmos públicos
   - Tendência de CPA crescente em retargeting
4. Avalie a sobreposição de público entre conjuntos de anúncios

### Fase 4: Recomendações
1. Priorize os achados por impacto na receita (alto, médio, baixo)
2. Forneça 5 recomendações específicas e acionáveis:
   - Lista de Matar: O que desligar imediatamente
   - Lista de Escalar: O que aumentar o orçamento
   - Lista de Corrigir: O que otimizar (e como)
   - Lista de Testar: Quais novos testes rodar
   - Lista de Construir: O que está faltando na conta
3. Calcule o impacto projetado de implementar as recomendações
4. Crie um roteiro de otimização de 2 semanas

---

## Formato de Saída

```markdown
## Auditoria de Conta de Anúncios: {Plataforma}

**Período:** {time_period}
**Investimento Total:** ${X}
**ROAS Geral:** {X}:1
**Pontuação de Saúde da Conta:** {X}/80
**Investimento Desperdiçado:** ${X} ({Y}%)

---

### Scorecard de Saúde da Conta

| Dimensão | Pontuação | Status | Problema-Chave |
|-----------|-------|--------|-----------|
| Estrutura | X/10 | {OK/Corrigir} | {nota} |
| Segmentação | X/10 | {OK/Corrigir} | {nota} |
| Criativo | X/10 | {OK/Corrigir} | {nota} |
| Orçamento | X/10 | {OK/Corrigir} | {nota} |
| Lances | X/10 | {OK/Corrigir} | {nota} |
| Rastreamento | X/10 | {OK/Corrigir} | {nota} |
| Alinhamento de Funil | X/10 | {OK/Corrigir} | {nota} |
| Performance | X/10 | {OK/Corrigir} | {nota} |

### Níveis de Performance de Campanha

| Nível | Campanhas | Investimento | ROAS | Ação |
|------|-----------|-------|------|--------|
| Vencedoras | {N} | ${X} | {X}:1 | Escalar |
| Performáticas | {N} | ${X} | {X}:1 | Otimizar |
| De baixa performance | {N} | ${X} | {X}:1 | Corrigir/Matar |
| Zumbis | {N} | ${X} | — | Matar |

### Top 5 Recomendações

| # | Ação | Tipo | Impacto Projetado |
|---|--------|------|-----------------|
| 1 | {recomendação} | {matar/escalar/corrigir/testar/construir} | +${X}/mês |

### Lista de Matar
{Campanhas/conjuntos de anúncios para desligar agora}

### Lista de Escalar
{Campanhas para aumentar o orçamento}

### Roteiro de Otimização de 2 Semanas
| Semana | Dia | Ação | Impacto Esperado |
|------|-----|--------|----------------|
```

---

## Condições de Veto

- NUNCA audite com menos de 30 dias de dados — janelas curtas produzem conclusões não confiáveis
- NUNCA recomende escalar sem confirmar que o rastreamento está preciso
- NUNCA mate campanhas em fase de aprendizado — espere a significância estatística
- NUNCA ignore campanhas zumbis — elas drenam orçamento silenciosamente
- NUNCA forneça recomendações sem impacto de receita estimado

---

## Critérios de Conclusão

- [ ] Scorecard de saúde de 8 dimensões concluído
- [ ] Todas as campanhas categorizadas por nível de performance
- [ ] Investimento desperdiçado calculado
- [ ] Causas raiz diagnosticadas para campanhas de baixa performance
- [ ] 5 recomendações priorizadas com impacto projetado
- [ ] Listas de matar e escalar fornecidas
- [ ] Roteiro de otimização de 2 semanas criado
