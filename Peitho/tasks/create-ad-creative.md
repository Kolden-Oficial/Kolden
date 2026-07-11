---
task: createAdCreative()
responsavel: "@ad-midas"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: adCreativePackage
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Conceitos desenvolvidos com ângulos distintos"
  - "[ ] Cada conceito inclui hook, copy, direção visual e CTA"
  - "[ ] Framework de teste definido com pares e métricas"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Criar Criativo de Anúncio

**Task ID:** TRAFFIC-004
**Versão:** 1.0.0
**Comando:** `*create-ad-creative`
**Agente:** Ad Midas (ad-midas) ou Creative Analyst (creative-analyst)
**Propósito:** Desenvolver conceitos de criativo de anúncio com hooks, copy, direção visual e plano de teste.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo anunciado |
| platform | enum | Prompt do usuário | Sim | facebook, instagram, youtube, tiktok, google, linkedin |
| audience | string | Prompt do usuário | Sim | Público-alvo do criativo |
| funnel_stage | enum | Prompt do usuário | Sim | frio, morno, quente |
| format | enum | Prompt do usuário | Não | imagem, vídeo, carrossel, UGC — padrão é a melhor prática da plataforma |
| num_concepts | number | Prompt do usuário | Não | Padrão de 5 conceitos |
| brand_guidelines | string | Prompt do usuário | Não | Cores, fontes, restrições de tom |

---

## Pré-condições

- Plataforma selecionada com restrições de formato compreendidas
- Público definido com gatilhos emocionais identificados
- A etapa do funil determina o ângulo da mensagem

---

## Fases de Execução

### Fase 1: Pesquisa de Criativo
1. Analise os padrões de criativo vencedores para a plataforma:
   - Qual formato domina (estático, vídeo, UGC)?
   - Quais estilos de hook performam (pergunta, choque, resultado, história)?
   - Quais estilos visuais atraem (limpo, cru, carregado de texto, cinematográfico)?
2. Estude os hábitos de consumo de conteúdo do público na plataforma
3. Identifique padrões de criativo dos concorrentes (do que se diferenciar)
4. Mapeie o criativo para a mensagem da etapa do funil:
   - Frio: Curiosidade, consciência do problema, valor de entretenimento
   - Morno: Prova, educação, diferenciação, construção de confiança
   - Quente: Oferta, urgência, depoimentos, CTA direto

### Fase 2: Desenvolvimento de Conceitos
1. Desenvolva conceitos de criativo usando ângulos distintos:
   - **Problema-Agitação:** Mostre a dor que eles vivenciam
   - **Antes/Depois:** Transformação visual ou narrativa
   - **Prova Social:** Baseado em depoimento ou resultado
   - **Educacional:** Ensine algo valioso, o CTA é o próximo passo
   - **Quebra de Padrão:** Visual ou afirmação inesperada que interrompe o scroll
2. Para cada conceito forneça:
   - Hook (primeiros 2-3 segundos para vídeo, headline para imagem)
   - Mensagem central (o único aprendizado)
   - Direção visual (lista de cenas, layout, cor, estilo)
   - Copy (texto principal, headline, descrição por especificações da plataforma)
   - CTA (texto do botão e ação)
3. Varie os formatos dentro do lote de conceitos
4. Garanta ao menos um conceito estilo UGC (para plataformas sociais)

### Fase 3: Briefings de Produção
1. Escreva briefings prontos para produção de cada conceito:
   - Para vídeo: Lista de cenas, roteiro, duração, direção de música
   - Para imagem: Descrição de layout, sobreposição de texto, direção de imagem
   - Para carrossel: Detalhamento card a card com progressão de hook
2. Especifique dimensões e requisitos de formato por plataforma
3. Anote quaisquer limites de sobreposição de texto (legado da regra dos 20% do Facebook, etc.)
4. Forneça exemplos de referência ou mood boards quando útil

### Fase 4: Framework de Teste
1. Defina o que está sendo testado por conceito:
   - Teste de hook: Mesmo corpo, hooks diferentes
   - Teste de formato: Mesma mensagem, formatos diferentes
   - Teste de ângulo: Mesmo público, abordagens diferentes
2. Recomende pares de teste (quais 2 conceitos testar primeiro)
3. Defina métricas de sucesso por conceito
4. Defina o orçamento mínimo e a duração para significância estatística

---

## Formato de Saída

```markdown
## Pacote de Criativo de Anúncio: {Produto}

**Plataforma:** {platform}
**Público:** {audience}
**Etapa do Funil:** {stage}
**Conceitos:** {count}

---

### Conceito 1: {Nome} — {Ângulo}
**Formato:** {format}
**Hook:** {primeiros 2-3 segundos ou headline}
**Mensagem Central:** {único aprendizado}

**Copy:**
- Texto Principal: {copy do corpo}
- Headline: {headline}
- Descrição: {descrição}
- CTA: {texto do botão}

**Direção Visual:**
{Lista de cenas, layout ou descrição de imagem}

**Notas de Produção:**
{Especificações, dimensões, duração, requisitos especiais}

---

### Conceito 2-N: ...

---

### Plano de Teste

| Teste | Conceito A | Conceito B | Variável | Orçamento | Duração |
|------|-----------|-----------|----------|--------|----------|

### Checklist de Especificações da Plataforma
| Especificação | Requisito | Status |
|------|------------|--------|
```

---

## Condições de Veto

- NUNCA crie anúncios sem especificar a plataforma — as restrições moldam o criativo
- NUNCA use o mesmo ângulo para todos os conceitos — variedade é o ponto do teste
- NUNCA escreva roteiros de vídeo sem um hook nos primeiros 3 segundos
- NUNCA ignore os requisitos de formato específicos da plataforma
- NUNCA pule o plano de teste — criativo sem teste é adivinhação

---

## Critérios de Conclusão

- [ ] Padrões de criativo da plataforma pesquisados
- [ ] Conceitos desenvolvidos com ângulos distintos
- [ ] Cada conceito inclui hook, copy, direção visual e CTA
- [ ] Briefings de produção escritos para todos os conceitos
- [ ] Framework de teste definido com pares e métricas
- [ ] Especificações da plataforma verificadas para todos os formatos
