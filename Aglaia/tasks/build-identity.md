---
task: buildIdentity()
responsavel: "@alina-wheeler"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: positioning
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Sistema de Identidade de Marca
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Sistema de identidade visual definido (cores, tipografia, logotipo)"
  - "[ ] Sistema de identidade verbal definido (voz, mensagens, história)"
  - "[ ] Resumo das diretrizes de marca compilado com exemplos de aplicação"
tipo: nota
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
relacionado:
  - "[[Aglaia/tasks/_indice|_indice]]"
---

# Task: Construir Identidade de Marca

**Task ID:** BRAND-003
**Version:** 1.0.0
**Comando:** `*build-identity`
**Agente:** Alina Wheeler (alina-wheeler) ou Jean-Noel Kapferer (jean-noel-kapferer)
**Propósito:** Desenhar um sistema abrangente de identidade visual e verbal para a marca.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| brand | string | Prompt do usuário | Sim | Nome da marca |
| positioning | string | Prompt do usuário | Sim | Declaração de posicionamento (idealmente de create-positioning.md) |
| audience | string | Prompt do usuário | Sim | Público-alvo com detalhe psicográfico |
| industry | string | Prompt do usuário | Sim | Contexto do setor |
| brand_personality | list | Prompt do usuário | Não | Traços de personalidade desejados (3-5) |
| existing_assets | list | Prompt do usuário | Não | Logotipo, cores e fontes atuais a preservar ou substituir |
| archetype | string | Prompt do usuário | Não | Arquétipo de marca, se já determinado |

---

## Pré-condições

- Posicionamento definido (o que a marca representa)
- Público-alvo identificado com contexto emocional e aspiracional

---

## Fases de Execução

### Fase 1: Definição da Personalidade da Marca
1. Defina 5 traços de personalidade usando o espectro de personalidade de marca:
   - Sinceridade: honesta, saudável, alegre, pé no chão
   - Empolgação: ousada, vibrante, imaginativa, atual
   - Competência: confiável, inteligente, bem-sucedida, líder
   - Sofisticação: elegante, charmosa, refinada, premium
   - Robustez: ligada à natureza, resistente, autêntica, sem rodeios
2. Para cada traço, defina como ele se manifesta na prática:
   - Como a marca fala (tom de voz)
   - Como a marca se apresenta (estilo visual)
   - Como a marca se comporta (experiência do cliente)
3. Defina a antipersonalidade — o que a marca NÃO é
4. Escreva uma descrição de "marca como pessoa" (se a marca fosse uma pessoa em um jantar)

### Fase 2: Sistema de Identidade Visual
1. Defina o sistema de cores:
   - Cor primária: A cor dominante da marca (com valores hex, RGB, CMYK)
   - Cores secundárias: 2-3 cores complementares
   - Cores neutras: Cores de fundo, texto e UI
   - Justificativa de psicologia das cores para cada escolha
2. Defina o sistema de tipografia:
   - Tipografia primária: Para títulos e momentos de marca
   - Tipografia secundária: Para corpo de texto e textos longos
   - Alternativas web-safe (fontes seguras para web)
   - Regras de uso (hierarquia de tamanhos, uso de pesos)
3. Defina a direção do logotipo:
   - Descrição do conceito do logotipo (o que ele representa)
   - Variações de logotipo necessárias (primária, secundária, apenas ícone, monocromática)
   - Regras de área de respiro e tamanho mínimo
   - Fundos em que o logotipo funciona (e em quais não)
4. Defina o estilo visual:
   - Estilo de fotografia (luminoso, atmosférico, lifestyle, produto, espontâneo)
   - Estilo de ilustração (se aplicável)
   - Estilo de iconografia
   - Princípios de layout e preferências de grid

### Fase 3: Sistema de Identidade Verbal
1. Defina a voz da marca:
   - Dimensões de tom (formal/casual, sério/divertido, respeitoso/irreverente, entusiasmado/objetivo)
   - O que fazer e o que não fazer na voz, com exemplos
   - Preferências de vocabulário (palavras a usar, palavras a evitar)
2. Escreva os frameworks-chave de mensagem:
   - Tagline / slogan
   - Promessa da marca (uma frase)
   - História da marca (narrativa de origem, 2-3 parágrafos)
   - Declaração de missão
   - Declaração de visão
   - Propostas de valor por segmento de público
3. Crie uma hierarquia de mensagens:
   - Nível 1: O que sempre dizemos (mensagens centrais)
   - Nível 2: O que dizemos quando relevante (mensagens de apoio)
   - Nível 3: O que nunca dizemos (tópicos proibidos)

### Fase 4: Resumo das Diretrizes de Marca
1. Compile o sistema de identidade em um documento de diretrizes estruturado
2. Forneça exemplos de uso para aplicações comuns:
   - Cartão de visita
   - Perfil de rede social
   - Assinatura de e-mail
   - Cabeçalho do site
   - Template de anúncio
3. Defina as regras de governança:
   - Quem pode modificar os ativos de marca
   - Processo de aprovação para novas aplicações
   - Cadência de revisão anual

---

## Formato de Saída

```markdown
## Sistema de Identidade de Marca: {Nome da Marca}

**Posicionamento:** {declaração}
**Personalidade:** {5 traços}
**Arquétipo:** {arquétipo}

---

### Personalidade da Marca

| Traço | Expressão | Anti-Traço |
|-------|-----------|-----------|

**Marca como Pessoa:** {descrição}

### Identidade Visual

#### Cores
| Função | Cor | Hex | Psicologia |
|------|-------|-----|-----------|
| Primária | {cor} | #{hex} | {justificativa} |

#### Tipografia
| Função | Tipografia | Peso | Uso |
|------|---------|--------|-------|

#### Direção do Logotipo
{Descrição do conceito com requisitos de variação}

#### Estilo Visual
{Direção de fotografia, ilustração e layout}

### Identidade Verbal

#### Voz da Marca
| Dimensão | Posição | Exemplo |
|-----------|----------|---------|

#### Mensagens-Chave
- **Tagline:** {tagline}
- **Promessa da Marca:** {promessa}
- **Missão:** {missão}
- **Visão:** {visão}

#### História da Marca
{Narrativa de origem de 2-3 parágrafos}

### Exemplos de Aplicação
{Descrição de como a identidade se aplica aos principais pontos de contato}

### Governança
{Quem, o quê, quando para a gestão da marca}
```

---

## Condições de Veto

- NUNCA desenhe a identidade sem uma base de posicionamento — a identidade expressa o posicionamento
- NUNCA escolha cores ou fontes baseando-se apenas em preferência pessoal — justifique com estratégia
- NUNCA defina a voz sem exemplos — descrições abstratas são inutilizáveis
- NUNCA crie um sistema de identidade complexo demais para ser aplicado de forma consistente
- NUNCA pule a "antipersonalidade" — saber o que você NÃO é é tão importante quanto saber o que você é

---

## Critérios de Conclusão

- [ ] Personalidade da marca definida com 5 traços e anti-traços
- [ ] Sistema de cores definido com justificativa
- [ ] Sistema de tipografia definido com regras de uso
- [ ] Direção do logotipo documentada com necessidades de variação
- [ ] Estilo visual definido (fotografia, ilustração, layout)
- [ ] Voz da marca definida com o que fazer, o que não fazer e exemplos
- [ ] Mensagens-chave escritas (tagline, promessa, história, missão, visão)
- [ ] Exemplos de aplicação fornecidos
- [ ] Regras de governança definidas
