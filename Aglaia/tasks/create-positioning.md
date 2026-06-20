---
task: createPositioning()
responsavel: "@al-ries"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: category
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Estratégia de Posicionamento
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Escada da categoria mapeada com posições dos concorrentes"
  - "[ ] Declaração formal de posicionamento escrita com alternativas"
  - "[ ] Diretrizes de mensagens e pontos de prova fornecidos"
---

# Tarefa: Criar Posicionamento

**Task ID:** BRAND-002
**Version:** 1.0.0
**Comando:** `*create-positioning`
**Agente:** Al Ries (al-ries)
**Propósito:** Criar uma declaração de posicionamento que domine um espaço distinto na mente do prospect.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| brand | string | Prompt do usuário | Sim | Nome da marca e descrição atual |
| category | string | Prompt do usuário | Sim | Categoria de mercado em que a marca compete |
| audience | string | Prompt do usuário | Sim | Público-alvo |
| competitors | list | Prompt do usuário | Sim | Principais concorrentes com seu posicionamento |
| differentiator | string | Prompt do usuário | Não | Ponto de diferença conhecido ou suspeito |
| brand_values | list | Prompt do usuário | Não | Valores e crenças centrais |

---

## Pré-condições

- Cenário competitivo compreendido (quem mais compete pelo mesmo espaço mental)
- Público-alvo definido com suas percepções atuais

---

## Fases de Execução

### Fase 1: Análise de Categoria
1. Definir a escada da categoria — como os prospects organizam mentalmente as opções
2. Identificar quem domina a posição #1 na categoria
3. Mapear todos os concorrentes em suas posições reivindicadas
4. Identificar as posições abertas (espaço em branco / white space) na mente do prospect
5. Avaliar se deve competir na categoria existente ou criar uma nova:
   - Se o #1 é vulnerável: Desafiar o líder
   - Se o #1 é dominante: Encontrar uma posição aberta (nicho, atributo ou caso de uso)
   - Se não há categoria clara: Criar a categoria e dominá-la

### Fase 2: Estratégia de Posicionamento
1. Aplicar os princípios de posicionamento de Ries:
   - **Estreitar o foco:** Melhor dominar um pequeno nicho do que competir de forma ampla
   - **Dominar uma palavra:** Qual palavra única a marca deve dominar na mente do prospect?
   - **Ser o oposto:** Se o líder é X, posicione-se como o oposto de X
   - **Ser o primeiro:** Se não puder ser o primeiro na categoria, crie uma categoria em que você seja o primeiro
2. Definir o triângulo de posicionamento:
   - Alvo: Para quem especificamente isto é destinado?
   - Quadro de Referência: Em qual categoria isto compete?
   - Ponto de Diferença: O que o torna unicamente melhor para o alvo?
   - Razão para Acreditar: Que prova sustenta a alegação?
3. Testar o posicionamento contra 3 critérios:
   - É relevante para o público-alvo?
   - É diferenciado dos concorrentes?
   - É crível e entregável?

### Fase 3: Declaração de Posicionamento
1. Escrever a declaração formal de posicionamento:
   "Para {público-alvo} que {necessita/deseja}, {marca} é o {categoria} que {ponto de diferença} porque {razão para acreditar}."
2. Escrever 3 variações com ênfases diferentes:
   - Liderada pelo alvo: Enfatiza para quem é destinado
   - Liderada pelo benefício: Enfatiza o que entrega
   - Liderada pela categoria: Enfatiza a nova categoria ou nicho dominado
3. Escrever o slogan de posicionamento (máximo de 5-8 palavras)
4. Definir os pontos de prova do posicionamento (3-5 itens de evidência)

### Fase 4: Ativação do Posicionamento
1. Traduzir o posicionamento em diretrizes de mensagens:
   - Mensagens-chave por segmento de público
   - Pitch de elevador (30 segundos)
   - Narrativa longa de posicionamento (1-2 parágrafos)
2. Definir o que o posicionamento significa para:
   - Desenvolvimento de produto (o que construir e o que não construir)
   - Marketing (o que dizer e o que não dizer)
   - Vendas (como apresentar o pitch e diferenciar)
3. Identificar riscos do posicionamento:
   - Cenários de resposta dos concorrentes
   - Mudanças de categoria que poderiam invalidar a posição
4. Definir a cadência de revisão do posicionamento

---

## Formato de Saída

```markdown
## Estratégia de Posicionamento: {Nome da Marca}

**Categoria:** {categoria}
**Alvo:** {público}
**Palavra Dominada:** {a palavra que esta marca vai dominar}
**Tipo de Estratégia:** {desafiar-líder / encontrar-nicho / criar-categoria}

---

### Mapa da Categoria

| Posição | Marca | Alegação |
|----------|-------|-------|
| #1 | {marca} | {posição deles} |
| #2 | {marca} | {posição deles} |
| Aberta | — | {espaço em branco} |
| **Nossa** | **{marca}** | **{nossa posição}** |

### Declaração de Posicionamento
"Para {alvo} que {necessita}, {marca} é o {categoria} que {diferença} porque {prova}."

### Versões Alternativas
1. **Liderada pelo alvo:** {versão}
2. **Liderada pelo benefício:** {versão}
3. **Liderada pela categoria:** {versão}

### Slogan
{slogan de 5-8 palavras}

### Pontos de Prova
1. {evidência}
2. {evidência}
3. {evidência}

### Diretrizes de Mensagens
**Pitch de Elevador:** {versão de 30 segundos}
**Mensagens-chave:**
- Para {segmento 1}: {mensagem}
- Para {segmento 2}: {mensagem}

### Narrativa de Posicionamento
{história de 1-2 parágrafos do posicionamento}

### Riscos e Mitigações
| Risco | Probabilidade | Mitigação |
|------|-----------|------------|
```

---

## Condições de Veto

- NUNCA posicionar sem analisar o cenário competitivo — o posicionamento é relativo
- NUNCA reivindicar uma posição que a marca não possa dominar de forma crível
- NUNCA tentar ser tudo para todos — o foco estreito vence
- NUNCA posicionar apenas pelo preço — é a estratégia de posicionamento mais fraca
- NUNCA mudar o posicionamento sem entender o que a marca atualmente domina nas mentes

---

## Critérios de Conclusão

- [ ] Escada da categoria mapeada com posições dos concorrentes
- [ ] Espaço em branco identificado
- [ ] Estratégia de posicionamento selecionada (desafiar, nicho ou criar)
- [ ] Declaração formal de posicionamento escrita com alternativas
- [ ] Slogan criado
- [ ] Pontos de prova definidos
- [ ] Diretrizes de mensagens fornecidas
- [ ] Riscos identificados com mitigações
