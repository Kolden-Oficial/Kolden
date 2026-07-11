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
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Tarefa: Escrever Copy de Anúncio

**ID da Tarefa:** COPY-M-005
**Versão:** 2.0.0
**Comando:** `*write-ad-copy`
**Agente:** Dan Kennedy (dan-kennedy)
**Propósito:** Escrever copy de anúncio de resposta direta para qualquer plataforma de mídia paga, com psicologia da persuasão em camadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com o benefício-chave |
| audience | string | Prompt do usuário | Sim | Público-alvo com comportamento na plataforma |
| platform | enum | Prompt do usuário | Sim | facebook, instagram, google-search, google-display, youtube, tiktok, linkedin |
| objective | enum | Prompt do usuário | Sim | awareness, traffic, leads, sales, retargeting |
| offer | string | Prompt do usuário | Não | Para onde o anúncio direciona (lead magnet, venda, webinar, etc.) |
| budget_context | string | Prompt do usuário | Não | Nível de investimento — afeta o volume de variações |
| competitors | list | Prompt do usuário | Não | Concorrentes conhecidos para diferenciação |

---

## Pré-condições

- Plataforma selecionada com entendimento claro das restrições de formato
- Objetivo de campanha definido
- Landing page ou destino existe (ou está sendo construído em paralelo)

---

## Referência de Campeões

Estude estes anúncios campeões do mundo real antes de escrever:

1. **"The Man in the Hathaway Shirt"** (David Ogilvy) — Dispositivo de curiosidade do tapa-olho, storytelling de marca em uma única imagem + copy
2. **Anúncios do Dollar Shave Club no Facebook** — Tom irreverente, agitação do problema, CTA direto, escalado até uma aquisição de US$ 1 bilhão
3. **"Raw Egg Test" da Purple Mattress** (Harmon Brothers) — Prova guiada por demonstração com humor, mais de 185 milhões de visualizações
4. **Anúncios da Agora Financial no Facebook** — Hooks de medo + curiosidade, linguagem de "brecha" (loophole), resposta direta encontra as redes sociais
5. **Anúncios "4 Minute Video" do Frank Kern** — Hooks que entregam valor primeiro, retargeting de tráfego morno, resposta direta conversacional

---

## Fases de Execução

### Fase 1: Estratégia Específica de Plataforma
1. Defina as restrições de formato por plataforma:
   - Facebook/Instagram: Texto principal (125 caracteres acima da dobra), headline (40 caracteres), descrição (30 caracteres), imagem/vídeo
   - Google Search: 3 headlines (30 caracteres cada), 2 descrições (90 caracteres cada)
   - YouTube: Hook em 5 segundos (pulável), 15-30s para não-pulável
   - TikTok: Tom nativo, hook em 2 segundos, roteiro de vídeo de 15-60s
   - LinkedIn: Tom profissional, introdução de 150 caracteres, headline
2. Identifique o estilo de comunicação nativo da plataforma
3. Mapeie a etapa do funil para a abordagem de mensagem:
   - Tráfego frio: Comece com o problema ou curiosidade
   - Tráfego morno: Comece com prova ou mecanismo
   - Tráfego quente/retarget: Comece com a oferta e urgência

### Fase 2: Camada Psicológica
1. Selecione o princípio primário de Cialdini por variação de anúncio:
   - Anúncio de Prova Social: "Junte-se a mais de 10.000 que já..."
   - Anúncio de Autoridade: "Recomendado pelo Dr. X..."
   - Anúncio de Escassez: "Apenas 47 vagas restantes..."
   - Anúncio de Reciprocidade: Hook de valor gratuito levando à oferta
   - Anúncio de Unidade: "Caro [identidade]..." mirando um grupo compartilhado
2. Aplique as alavancas de Blair Warren aos ângulos de anúncio:
   - Ângulo de encorajar sonhos: "Finalmente alcance X sem Y"
   - Ângulo de justificar fracassos: "A culpa não é sua — eis por que X não funcionou"
   - Ângulo de confirmar suspeitas: "Você sempre soube que X era verdade"
3. Garanta que cada uma das 5 variações use um direcionador psicológico primário diferente

### Fase 3: Criação do Copy de Anúncio
1. Escreva 5 variações de anúncio por formato usando ângulos distintos:
   - Ângulo de agitação do problema
   - Ângulo de benefício primeiro
   - Ângulo de prova social
   - Ângulo de curiosidade/notícia
   - Ângulo de oferta direta
2. Para cada variação forneça:
   - Texto principal / corpo do copy
   - Headline
   - Descrição / sub-headline
   - Recomendação de texto do botão de CTA
   - Princípio primário de Cialdini
   - Alavanca primária de Warren
3. Escreva o copy que combine com o tom nativo da plataforma
4. Garanta que cada anúncio se sustente sozinho (sem dependência do criativo)

### Fase 4: Framework de Testes
1. Organize os anúncios em um plano de testes estruturado
2. Recomende quais 2 anúncios testar primeiro e por quê
3. Defina métricas de sucesso por plataforma e objetivo
4. Sugira notas de direção criativa para cada anúncio (orientação de imagem/vídeo)
5. Forneça variantes de anúncio de retargeting para não-convertedores

---

## Formato de Saída

```markdown
## Pacote de Copy de Anúncio: {Produto}

**Plataforma:** {platform}
**Objetivo:** {objective}
**Público:** {audience}
**Etapa do Funil:** {frio / morno / quente}

---

### Variação de Anúncio 1: {Nome do Ângulo}
**Texto Principal:** {corpo do copy}
**Headline:** {headline}
**Descrição:** {descrição}
**CTA:** {texto do botão}
**Direção Criativa:** {orientação de imagem/vídeo}
**Princípio de Cialdini:** {princípio}
**Alavanca de Warren:** {alavanca}

---

### Variação de Anúncio 2-5: ...

---

### Plano de Testes

| Prioridade | Anúncio nº | Ângulo | Direcionador Psicológico | Testar Contra | Métrica de Sucesso |
|----------|------|-------|-------------|-------------|----------------|

### Variantes de Retargeting
{2-3 variações de anúncio de retargeting para não-convertedores}

### Notas Específicas de Plataforma
{Limites de caracteres respeitados, conformidade de formato, considerações de política}
```

---

## Condições de Veto

- NUNCA exceda os limites de caracteres da plataforma
- NUNCA escreva anúncios sem especificar a plataforma — as restrições de formato importam
- NUNCA use o mesmo ângulo para todas as 5 variações
- NUNCA ignore as políticas de publicidade da plataforma (sem afirmações exageradas, sem categorias proibidas)
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
- [ ] Camada Psicológica aplicada — princípios de Cialdini marcados por anúncio
- [ ] Alavancas de Blair Warren identificadas por variação de anúncio
