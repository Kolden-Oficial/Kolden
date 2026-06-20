---
task: createHooks()
responsavel: "@hormozi-hooks"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: topic
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: hookPackage
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Hooks escritos em pelo menos 4 categorias"
  - "[ ] Restrições da plataforma respeitadas"
  - "[ ] Todos os hooks pontuados em 3 dimensões"
---

# Tarefa: Criar Hooks

**Task ID:** HORMOZI-005
**Versão:** 1.0.0
**Comando:** `*create-hooks`
**Agente:** Hormozi Hooks (hormozi-hooks)
**Propósito:** Criar ganchos (hooks) que prendem a atenção para conteúdo, anúncios e material de vendas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| topic | string | Prompt do usuário | Sim | Assunto dos hooks |
| platform | enum | Prompt do usuário | Sim | youtube, tiktok, instagram, facebook, linkedin, email, ad |
| audience | string | Prompt do usuário | Sim | Quem os hooks precisam parar |
| content_goal | enum | Prompt do usuário | Sim | educate, sell, entertain, build-authority, generate-leads |
| quantity | number | Prompt do usuário | Não | Padrão de 20 hooks |

---

## Pré-condições

- Plataforma selecionada com entendimento das restrições de formato
- Audiência definida com especificidade suficiente para escrever para ela

---

## Fases de Execução

### Fase 1: Mapeamento de Categorias de Hook
1. Selecione entre as 7 categorias de hook (framework Hormozi):
   - **Contrarian (Contraintuitivo):** Desafie uma crença comumente aceita
   - **Curiosity Gap (Lacuna de Curiosidade):** Crie uma lacuna de informação que eles precisam fechar
   - **Result/Proof (Resultado/Prova):** Comece com um resultado específico e impressionante
   - **Story (História):** Abra com um momento dramático de uma história real
   - **Question (Pergunta):** Faça uma pergunta que force a autorreflexão
   - **Bold Claim (Afirmação Ousada):** Faça uma declaração específica e provocativa
   - **Pattern Interrupt (Interrupção de Padrão):** Quebre o padrão esperado de scroll com algo inesperado
2. Distribua os hooks entre as categorias (pelo menos 3 de cada categoria usada)
3. Combine a categoria com as normas da plataforma:
   - YouTube: Hooks de Curiosity Gap e Result dominam
   - TikTok: Pattern Interrupt e Contrarian têm melhor desempenho
   - LinkedIn: Hooks de Bold Claim e Result geram engajamento
   - Assuntos de e-mail: Hooks de Curiosity Gap e Question ganham aberturas
   - Anúncios: Hooks de Result e Bold Claim param o scroll

### Fase 2: Escrita dos Hooks
1. Escreva cada hook seguindo as restrições da plataforma:
   - YouTube: Menos de 10 palavras para a thumbnail, menos de 15 segundos falado
   - TikTok/Reels: Menos de 3 segundos (8-12 palavras no máximo)
   - LinkedIn: Primeira linha antes do "ver mais" (menos de 150 caracteres)
   - E-mail: Menos de 50 caracteres para a linha de assunto
   - Anúncios: Menos de 125 caracteres para o hook do texto principal
2. Aplique a regra da especificidade: substitua palavras vagas por números, nomes ou detalhes
3. Aplique o teste "eu pararia de fazer scroll?" a cada hook
4. Crie 2-3 variações por ideia central de hook (ângulos reformulados)

### Fase 3: Pontuação e Empacotamento
1. Pontue cada hook em 3 dimensões (1-5):
   - Stop Power (Poder de Parar): Alguém pararia de fazer scroll?
   - Relevance (Relevância): É relevante para a audiência-alvo?
   - Payoff Potential (Potencial de Recompensa): O conteúdo consegue cumprir a promessa deste hook?
2. Ranqueie pela pontuação total
3. Agrupe em "pronto para usar" e "precisa de conteúdo construído ao redor"
4. Sugira ideias de conteúdo para os 5 melhores hooks
5. Forneça pares de teste A/B

---

## Formato de Saída

```markdown
## Pacote de Hooks: {Tópico}

**Plataforma:** {platform}
**Audiência:** {audience}
**Total de Hooks:** {count}

---

### Top 10 Hooks (Ranqueados)

| Posição | Hook | Categoria | Parada | Relevância | Recompensa | Total |
|------|------|----------|------|-----------|--------|-------|

### Todos os Hooks por Categoria

#### Contrarian
1. {hook}
2. {hook}

#### Curiosity Gap
1. {hook}
2. {hook}

#### Result/Proof
...

### Ideias de Conteúdo para os Top 5
| Hook | Ideia de Conteúdo | Formato |
|------|-------------|--------|

### Pares de Teste A/B
| Par | Hook A | Hook B | O Que Estamos Testando |
|------|--------|--------|-------------------|
```

---

## Condições de Veto

- NUNCA escreva hooks que o conteúdo não consiga cumprir — clickbait destrói a confiança
- NUNCA escreva hooks vagos ("Isso mudou tudo") — a especificidade é obrigatória
- NUNCA ignore as restrições da plataforma — um hook de YouTube difere de um hook de TikTok
- NUNCA entregue hooks sem pontuação — hooks sem ranqueamento são inutilizáveis
- NUNCA use a mesma fórmula para mais de 3 hooks consecutivos

---

## Critérios de Conclusão

- [ ] Hooks escritos em pelo menos 4 categorias
- [ ] Restrições da plataforma respeitadas
- [ ] Todos os hooks pontuados em 3 dimensões
- [ ] Top 10 ranqueado com justificativa
- [ ] Ideias de conteúdo fornecidas para os top 5
- [ ] Pares de teste A/B sugeridos
- [ ] Regra de especificidade aplicada a cada hook
