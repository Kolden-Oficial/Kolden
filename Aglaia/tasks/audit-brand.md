---
task: auditBrand()
responsavel: "@brand-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: industry
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Relatório de Saúde da Marca
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Valor de marca pontuado nos 5 pilares de Aaker"
  - "[ ] Identidade avaliada nas 6 facetas de Kapferer"
  - "[ ] Recomendações priorizadas com roteamento para especialista"
tipo: nota
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
relacionado:
  - "[[Aglaia/tasks/_indice|_indice]]"
---

# Tarefa: Auditar Marca

**Task ID:** BRAND-001
**Version:** 1.0.0
**Comando:** `*audit-brand`
**Agente:** Brand Chief (brand-chief) ou David Aaker (david-aaker)
**Propósito:** Auditoria abrangente de saúde de marca avaliando valor de marca, posicionamento, identidade e percepção de mercado.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| brand | string | Prompt do usuário | Sim | Nome da marca e breve descrição |
| industry | string | Prompt do usuário | Sim | Setor e contexto de mercado |
| brand_assets | list | Prompt do usuário | Não | Logo, site, perfis sociais, materiais de marketing |
| competitors | list | Prompt do usuário | Não | Principais concorrentes para contexto de posicionamento |
| audience | string | Prompt do usuário | Não | Descrição do público-alvo |
| brand_age | string | Prompt do usuário | Não | Há quanto tempo a marca existe |
| known_issues | string | Prompt do usuário | Não | Desafios de marca autoidentificados |

---

## Pré-condições

- A marca existe com alguma presença de mercado (mesmo que mínima)
- Pelo menos ativos de marca básicos disponíveis para revisão

---

## Fases de Execução

### Fase 1: Avaliação de Valor de Marca (Modelo Aaker)
1. Avaliar os 5 pilares do valor de marca:
   - **Brand Awareness (Lembrança de Marca):** Nível de reconhecimento e recall no mercado-alvo
   - **Qualidade Percebida:** Como o público avalia a qualidade vs concorrentes
   - **Associações de Marca:** O que vem à mente quando as pessoas ouvem o nome da marca
   - **Lealdade à Marca:** Taxa de recompra, advocacia, resistência à troca
   - **Ativos Proprietários:** Marcas registradas, patentes, canais de distribuição
2. Pontuar cada pilar (1-10)
3. Identificar os pilares mais fortes e mais fracos
4. Comparar com concorrentes onde houver dados disponíveis

### Fase 2: Avaliação de Identidade (Prisma de Kapferer)
1. Avaliar as 6 facetas da identidade de marca:
   - **Físico:** Elementos visuais, logo, cores, embalagem, design do produto
   - **Personalidade:** Traços de caráter, voz, tom, qualidades humanas
   - **Cultura:** Valores, história de origem, sistema de crenças
   - **Relacionamento:** Como a marca se relaciona com seus clientes
   - **Reflexo:** Como os clientes se enxergam através da marca
   - **Autoimagem:** Como os clientes se sentem internamente ao usar a marca
2. Identificar inconsistências entre as facetas
3. Avaliar o alinhamento entre identidade interna e percepção externa
4. Anotar quaisquer facetas indefinidas ou contraditórias

### Fase 3: Análise de Posicionamento
1. Avaliar o posicionamento atual:
   - Em qual categoria a marca compete?
   - Qual é o principal ponto de diferenciação?
   - O posicionamento é claro, crível e convincente?
2. Mapear o cenário competitivo:
   - Onde cada concorrente se posiciona?
   - Onde estão as posições abertas (espaço em branco / white space)?
   - A marca está em uma posição lotada ou pouco disputada?
3. Testar a clareza do posicionamento: Alguém consegue descrever o que torna esta marca diferente em uma única frase?

### Fase 4: Auditoria de Pontos de Contato e Consistência
1. Revisar a consistência da marca entre pontos de contato:
   - Identidade visual: uso do logo, cores, tipografia
   - Identidade verbal: mensagens, tom, frases-chave
   - Presença digital: site, redes sociais, e-mail
   - Experiência do cliente: suporte, onboarding, embalagem
2. Identificar inconsistências e lacunas
3. Pontuar a coerência geral da marca (1-10)
4. Fornecer uma lista priorizada de correções

---

## Formato de Saída

```markdown
## Auditoria de Marca: {Nome da Marca}

**Setor:** {setor}
**Idade da Marca:** {idade}
**Pontuação Geral de Saúde da Marca:** {X}/100
**Veredito:** {Crítico / Precisa de Trabalho / Saudável / Forte / Premium}

---

### Scorecard de Valor de Marca (Aaker)

| Pilar | Pontuação | Pontos Fortes | Lacunas |
|--------|-------|-----------|------|
| Awareness | X/10 | {nota} | {nota} |
| Qualidade Percebida | X/10 | {nota} | {nota} |
| Associações | X/10 | {nota} | {nota} |
| Lealdade | X/10 | {nota} | {nota} |
| Ativos Proprietários | X/10 | {nota} | {nota} |

### Prisma de Identidade (Kapferer)

| Faceta | Estado Atual | Consistência | Problema |
|-------|--------------|-------------|-------|
| Físico | {descrição} | {alinhado/desalinhado} | {nota} |
| Personalidade | {descrição} | {alinhado/desalinhado} | {nota} |
| Cultura | {descrição} | {alinhado/desalinhado} | {nota} |
| Relacionamento | {descrição} | {alinhado/desalinhado} | {nota} |
| Reflexo | {descrição} | {alinhado/desalinhado} | {nota} |
| Autoimagem | {descrição} | {alinhado/desalinhado} | {nota} |

### Mapa de Posicionamento
**Posição Atual:** {descrição}
**Diferenciação:** {clara/imprecisa}
**Oportunidades de Espaço em Branco:** {lacunas identificadas}
**Sobreposição Competitiva:** {onde você colide com concorrentes}

### Pontuação de Consistência
**Coerência Geral:** {X}/10
**Ponto de Contato Mais Forte:** {ponto de contato}
**Ponto de Contato Mais Fraco:** {ponto de contato}

### Recomendações Priorizadas
| Prioridade | Área | Problema | Correção Recomendada | Agente |
|----------|------|-------|-----------------|-------|
| 1 | {área} | {problema} | {correção} | {especialista} |

### O Que Proteger
{Elementos que estão funcionando bem e devem ser preservados}
```

---

## Condições de Veto

- NUNCA auditar sem revisar os ativos de marca reais — teoria sem observação é adivinhação
- NUNCA pontuar sem fornecer evidência específica para cada avaliação
- NUNCA ignorar o contexto dos concorrentes — a força da marca é sempre relativa
- NUNCA fornecer apenas crítica — identifique e proteja o que funciona
- NUNCA recomendar mudar tudo de uma vez — priorize impiedosamente

---

## Critérios de Conclusão

- [ ] Valor de marca pontuado nos 5 pilares de Aaker
- [ ] Identidade avaliada nas 6 facetas de Kapferer
- [ ] Posicionamento analisado com contexto competitivo
- [ ] Consistência dos pontos de contato auditada
- [ ] Pontuação geral de saúde calculada
- [ ] Recomendações priorizadas com roteamento para especialista
- [ ] Pontos fortes identificados e sinalizados para proteção
