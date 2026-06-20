---
task: createBrandStory()
responsavel: "@donald-miller"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: problem
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: BrandScript StoryBrand
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os 7 elementos do SB7 definidos"
  - "[ ] One-liner e elevator pitch criados"
  - "[ ] Copy do wireframe do site fornecida"
---

# Task: Criar História da Marca

**Task ID:** BRAND-004
**Version:** 1.0.0
**Comando:** `*create-brand-story`
**Agente:** Donald Miller (donald-miller)
**Propósito:** Construir uma narrativa de marca usando o Framework StoryBrand SB7.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| brand | string | Prompt do usuário | Sim | Nome da marca e o que ela faz |
| audience | string | Prompt do usuário | Sim | Cliente-alvo e o mundo dele |
| problem | string | Prompt do usuário | Sim | O problema que a marca resolve |
| solution | string | Prompt do usuário | Sim | Como a marca o resolve |
| brand_values | list | Prompt do usuário | Não | Valores e crenças centrais |
| founder_story | string | Prompt do usuário | Não | História de origem do fundador/empresa |
| proof_elements | list | Prompt do usuário | Não | Depoimentos, resultados, credenciais |

---

## Pré-condições

- Posicionamento de marca definido (o que a marca representa)
- Desejos e medos do público-alvo compreendidos

---

## Fases de Execução

### Fase 1: BrandScript StoryBrand (SB7)
1. Defina cada um dos 7 elementos:
   - **Um Personagem:** O cliente é o herói, não a marca. Defina quem ele é e o que ele quer.
   - **Tem um Problema:** Defina o vilão (a causa raiz) e 3 níveis de problema:
     - Externo: O problema tangível, de superfície
     - Interno: Como o problema o faz sentir
     - Filosófico: Por que isso é simplesmente errado
   - **Encontra um Guia:** Posicione a marca como o guia sábio que já passou por isso. Expresse:
     - Empatia: "Entendemos o que você está passando"
     - Autoridade: "Temos a expertise para ajudar"
   - **Que Lhe Dá um Plano:** Forneça um plano simples de 3 passos:
     - Passo 1: {ação} — O que o cliente faz primeiro
     - Passo 2: {ação} — O que acontece em seguida
     - Passo 3: {ação} — O passo final até o resultado
   - **E o Chama à Ação:** Defina o CTA direto e o CTA transicional:
     - Direto: "Compre agora", "Agende uma ligação", "Cadastre-se"
     - Transicional: "Baixe o guia", "Assista ao vídeo", "Faça o quiz"
   - **Que o Ajuda a Evitar o Fracasso:** Como é a vida se ele NÃO agir? Pinte os riscos negativos.
   - **E Termina em Sucesso:** Como é a vida quando ele tem sucesso? Pinte a transformação positiva.

### Fase 2: Execução da História
1. Escreva o one-liner (logline da marca):
   - Problema + Solução + Resultado em uma frase
   - Deve ser memorável o suficiente para ser repetido em um jantar
2. Escreva a narrativa da história da marca (2-3 parágrafos):
   - Comece com a luta do cliente
   - Introduza a marca como o guia
   - Revele o plano e a transformação
3. Escreva a copy do wireframe do site usando StoryBrand:
   - Cabeçalho: Promessa de transformação
   - Riscos: O que ele tem a perder
   - Proposta de Valor: O que ele ganha
   - Guia: Por que ele deve confiar em você
   - Plano: O caminho de 3 passos
   - CTA: O que fazer em seguida
4. Escreva o elevator pitch (60 segundos)

### Fase 3: Aplicações da História
1. Crie copy baseada em história para os principais pontos de contato:
   - Página Sobre: A marca como guia (não como herói)
   - E-mail de boas-vindas: Empatia + autoridade + primeiro passo
   - Bio de rede social: One-liner + CTA
   - Abertura do pitch de vendas: Problema do cliente + empatia
2. Escreva a "história ao redor da fogueira" — uma versão de 2 minutos contada em voz alta
3. Crie o FAQ como resolução da história (perguntas mapeadas para os elementos do SB7)
4. Desenvolva o framework de depoimentos (que perguntas fazer aos clientes para que suas histórias sigam o arco do SB7)

---

## Formato de Saída

```markdown
## História da Marca: {Nome da Marca}

**Framework:** StoryBrand SB7

---

### BrandScript

#### 1. Personagem (Herói = Cliente)
**Quem ele é:** {descrição}
**O que ele quer:** {desejo}

#### 2. Problema
**Vilão:** {causa raiz}
**Externo:** {problema tangível}
**Interno:** {como ele se sente}
**Filosófico:** {por que está errado}

#### 3. Guia (Marca)
**Empatia:** {declaração de "nós entendemos"}
**Autoridade:** {prova de expertise}

#### 4. Plano
1. {Passo 1}
2. {Passo 2}
3. {Passo 3}

#### 5. Chamada à Ação
**CTA Direto:** {ação primária}
**CTA Transicional:** {ponto de entrada mais suave}

#### 6. Fracasso (Riscos)
{O que acontece se ele não agir}

#### 7. Sucesso (Transformação)
{Como a vida fica depois}

---

### One-Liner
{Problema + Solução + Resultado em uma frase}

### Narrativa da Marca
{História de 2-3 parágrafos}

### Elevator Pitch
{Versão falada de 60 segundos}

### Copy do Wireframe do Site
{Seções de cabeçalho, riscos, proposta de valor, guia, plano, CTA}

### Aplicações nos Pontos de Contato
| Ponto de Contato | Abordagem de Copy | Elemento-Chave do SB7 |
|-----------|--------------|-----------------|

### Framework de Depoimentos
{Perguntas a fazer aos clientes para depoimentos alinhados à história}
```

---

## Condições de Veto

- NUNCA faça da marca o herói — o cliente é sempre o herói
- NUNCA pule o problema interno — a maioria das compras é movida por sentimentos internos, não por questões externas
- NUNCA apresente um plano com mais de 3 passos — simplicidade é confiança
- NUNCA escreva uma história de marca sem riscos (fracasso) — sem riscos, não há urgência
- NUNCA esqueça o CTA transicional — nem todo mundo está pronto para o pedido direto

---

## Critérios de Conclusão

- [ ] Todos os 7 elementos do SB7 definidos
- [ ] One-liner escrito e memorável
- [ ] Narrativa da marca escrita (2-3 parágrafos)
- [ ] Elevator pitch criado (60 segundos)
- [ ] Copy do wireframe do site fornecida
- [ ] História aplicada aos principais pontos de contato
- [ ] Framework de depoimentos incluído
