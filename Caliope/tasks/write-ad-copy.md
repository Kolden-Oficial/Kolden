---
task: writeAdCopy()
responsavel: "@dan-kennedy"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: ad_copy_package
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Restrições da plataforma identificadas e respeitadas"
  - "[ ] 5 variações de anúncio escritas com ângulos distintos"
  - "[ ] Plano de testes com pares priorizados fornecido"
---

# Tarefa: Escrever Copy de Anúncio

**ID da Tarefa:** COPY-005
**Versão:** 1.0.0
**Comando:** `*write-ad-copy`
**Agente:** Dan Kennedy (dan-kennedy)
**Objetivo:** Escrever copy de anúncio de resposta direta para qualquer plataforma de mídia paga.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com o benefício principal |
| audience | string | Prompt do usuário | Sim | Público-alvo com comportamento na plataforma |
| platform | enum | Prompt do usuário | Sim | facebook, instagram, google-search, google-display, youtube, tiktok, linkedin |
| objective | enum | Prompt do usuário | Sim | awareness, traffic, leads, sales, retargeting |
| offer | string | Prompt do usuário | Não | Para onde o anúncio está direcionando (lead magnet, venda, webinar, etc.) |
| budget_context | string | Prompt do usuário | Não | Nível de investimento — afeta o volume de variações |
| competitors | list | Prompt do usuário | Não | Concorrentes conhecidos para diferenciação |

---

## Pré-condições

- Plataforma selecionada com entendimento claro das restrições de formato
- Objetivo da campanha definido
- Landing page ou destino existe (ou está sendo construído em paralelo)

---

## Fases de Execução

### Fase 1: Estratégia Específica de Plataforma
1. Defina as restrições de formato por plataforma:
   - Facebook/Instagram: Texto principal (125 caracteres acima da dobra), título (40 caracteres), descrição (30 caracteres), imagem/vídeo
   - Google Search: 3 títulos (30 caracteres cada), 2 descrições (90 caracteres cada)
   - YouTube: Gancho em 5 segundos (pulável), 15-30s para não pulável
   - TikTok: Tom nativo, gancho em 2 segundos, roteiro de vídeo de 15-60s
   - LinkedIn: Tom profissional, introdução de 150 caracteres, título
2. Identifique o estilo de comunicação nativo da plataforma
3. Mapeie o estágio do funil para a abordagem de mensagem:
   - Tráfego frio: Comece com o problema ou a curiosidade
   - Tráfego morno: Comece com a prova ou o mecanismo
   - Tráfego quente/retargeting: Comece com a oferta e a urgência

### Fase 2: Criação da Copy de Anúncio
1. Escreva 5 variações de anúncio por formato usando ângulos distintos:
   - Ângulo de problema-agitação
   - Ângulo de benefício primeiro
   - Ângulo de prova social
   - Ângulo de curiosidade/notícia
   - Ângulo de oferta direta
2. Para cada variação, forneça:
   - Texto principal / corpo da copy
   - Título
   - Descrição / subtítulo
   - Recomendação de texto para o botão de CTA
3. Escreva uma copy que combine com o tom nativo da plataforma
4. Garanta que cada anúncio funcione sozinho (sem dependência do criativo)

### Fase 3: Framework de Testes
1. Organize os anúncios em um plano de testes estruturado
2. Recomende quais 2 anúncios testar primeiro e por quê
3. Defina as métricas de sucesso por plataforma e objetivo
4. Sugira notas de direção criativa para cada anúncio (orientação de imagem/vídeo)
5. Forneça variantes de anúncio de retargeting para os não convertidos

---

## Formato de Saída

```markdown
## Pacote de Copy de Anúncio: {Product}

**Plataforma:** {platform}
**Objetivo:** {objective}
**Público:** {audience}
**Estágio do Funil:** {frio / morno / quente}

---

### Variação de Anúncio 1: {Angle Name}
**Texto Principal:** {corpo da copy}
**Título:** {headline}
**Descrição:** {description}
**CTA:** {texto do botão}
**Direção Criativa:** {orientação de imagem/vídeo}

---

### Variação de Anúncio 2-5: ...

---

### Plano de Testes

| Prioridade | Anúncio nº | Ângulo | Testar Contra | Métrica de Sucesso |
|----------|------|-------|-------------|----------------|

### Variantes de Retargeting
{2-3 variações de anúncio de retargeting para os não convertidos}

### Notas Específicas de Plataforma
{Limites de caracteres respeitados, conformidade de formato, considerações de política}
```

---

## Condições de Veto

- NUNCA exceda os limites de caracteres da plataforma
- NUNCA escreva anúncios sem especificar a plataforma — as restrições de formato importam
- NUNCA use o mesmo ângulo para todas as 5 variações
- NUNCA ignore as políticas de publicidade da plataforma (sem alegações exageradas, sem categorias proibidas)
- NUNCA escreva um anúncio sem um CTA claro

---

## Critérios de Conclusão

- [ ] Restrições da plataforma identificadas e respeitadas
- [ ] 5 variações de anúncio escritas com ângulos distintos
- [ ] Cada anúncio inclui todos os elementos de formato exigidos
- [ ] Plano de testes com pares priorizados
- [ ] Variantes de retargeting incluídas
- [ ] Notas de direção criativa fornecidas
- [ ] Conformidade com a política da plataforma verificada
