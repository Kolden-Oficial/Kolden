---
task: designArchitecture()
responsavel: "@david-aaker"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: parent_brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: products
    tipo: list
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Mapa de Arquitetura de Marca
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Modelo de arquitetura selecionado com justificativa pontuada"
  - "[ ] Todos os produtos/serviços mapeados na arquitetura"
  - "[ ] Framework de governança estabelecido"
---

# Task: Desenhar Arquitetura de Marca

**Task ID:** BRAND-005
**Version:** 1.0.0
**Comando:** `*design-architecture`
**Agente:** David Aaker (david-aaker)
**Propósito:** Desenhar a estratégia de arquitetura de marca para organizações com múltiplos produtos ou múltiplas marcas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| parent_brand | string | Prompt do usuário | Sim | Nome da marca-mãe ou marca mestre |
| products | list | Prompt do usuário | Sim | Todos os produtos, serviços ou submarcas |
| market_context | string | Prompt do usuário | Sim | Setor e cenário competitivo |
| audience_segments | list | Prompt do usuário | Não | Diferentes grupos de público atendidos |
| growth_plans | string | Prompt do usuário | Não | Novos produtos planejados ou expansões de mercado |
| current_architecture | string | Prompt do usuário | Não | Estrutura de marca existente, se houver |

---

## Pré-condições

- Existem (ou estão planejados) múltiplos produtos, serviços ou marcas
- Necessidade de organizá-los em uma estrutura coerente

---

## Fases de Execução

### Fase 1: Seleção do Modelo de Arquitetura
1. Avalie os 4 modelos de arquitetura de marca:
   - **Branded House (Casa de Marca):** Uma marca mestre, todos os produtos vivem sob ela
     - Exemplo: Google (Google Maps, Google Drive, Google Photos)
     - Melhor quando: Marca-mãe forte, produtos relacionados, público compartilhado
   - **House of Brands (Casa de Marcas):** Marcas independentes, a marca-mãe é invisível
     - Exemplo: P&G (Tide, Pampers, Gillette — todas separadas)
     - Melhor quando: Produtos atendem públicos diferentes ou poderiam entrar em conflito
   - **Endorsed Brands (Marcas Endossadas):** Submarcas endossadas pela marca-mãe
     - Exemplo: Marriott (Courtyard by Marriott, Residence Inn by Marriott)
     - Melhor quando: Submarcas precisam de independência, mas se beneficiam da credibilidade da marca-mãe
   - **Hybrid (Híbrido):** Mistura de modelos ao longo do portfólio
     - Exemplo: Amazon (Amazon Prime = branded house, Ring = endossada, Whole Foods = house of brands)
     - Melhor quando: Portfólio é diverso, com necessidades estratégicas variadas
2. Pontue cada modelo em relação ao contexto específico da marca
3. Recomende o modelo primário com justificativa

### Fase 2: Desenho da Arquitetura
1. Mapeie cada produto/serviço/submarca na arquitetura escolhida
2. Defina a estratégia de nomenclatura:
   - Nomes descritivos (Google Maps) — claros, mas menos distintivos
   - Nomes sugestivos (Amazon Prime) — implicam um benefício
   - Nomes abstratos (Alexa) — distintivos, mas exigem investimento
   - Alfanuméricos (iPhone 15) — versionamento e hierarquia
3. Defina a relação visual entre marca-mãe e submarcas:
   - Regras de lockup de logotipo (como os logotipos aparecem juntos)
   - Estratégia de cores (paleta compartilhada vs. distinta por submarca)
   - Relação tipográfica
4. Defina a relação verbal:
   - Como as submarcas referenciam a marca-mãe na copy
   - Estratégia de tagline (compartilhada vs. individual)
   - Regras de consistência de voz

### Fase 3: Atribuição de Papéis
1. Atribua um papel estratégico a cada marca do portfólio:
   - **Master Brand (Marca Mestre):** A principal fonte de equity e confiança
   - **Cash Cow (Vaca Leiteira):** Marca consolidada que financia o crescimento
   - **Star (Estrela):** Marca de alto crescimento que impulsiona o futuro
   - **Fighter (Marca de Combate):** Marca que compete em preço para proteger as marcas premium
   - **Flanker (Marca de Flanqueio):** Marca que se estende a um mercado adjacente
   - **Silver Bullet (Bala de Prata):** Marca que valoriza a imagem da marca-mãe
2. Defina a prioridade de investimento para cada papel de marca
3. Identifique marcas a descontinuar, fundir ou desinvestir
4. Mapeie a cobertura do portfólio sobre os segmentos de público

### Fase 4: Migração e Governança
1. Se houver mudança em relação à arquitetura atual, defina o plano de migração:
   - Fase 1: O que muda imediatamente
   - Fase 2: O que transiciona ao longo de 6-12 meses
   - Fase 3: Qual é o estado estável final
2. Defina o framework de governança:
   - Quem aprova novas submarcas
   - Critérios para adicionar uma nova marca vs. estender uma existente
   - Regras de convenção de nomenclatura para futuras adições
   - Árvore de decisão de hierarquia de marca
3. Documente as regras antidiluição:
   - Número máximo de submarcas antes de gerar confusão
   - Diferenciação mínima exigida entre submarcas
   - Quando fundir marcas sobrepostas

---

## Formato de Saída

```markdown
## Arquitetura de Marca: {Marca-Mãe}

**Modelo:** {branded-house / house-of-brands / endorsed / hybrid}
**Total de Marcas:** {contagem}
**Pontuação de Clareza da Arquitetura:** {X}/10

---

### Mapa de Arquitetura

{Representação visual em texto da hierarquia de marca}

### Portfólio de Marcas

| Marca | Papel | Relação com a Marca-Mãe | Público | Status |
|-------|------|----------------------|----------|--------|
| {marca} | {papel} | {mestre/endossada/independente} | {segmento} | {ativa/planejada/descontinuada} |

### Estratégia de Nomenclatura
**Convenção:** {descritiva / sugestiva / abstrata}
**Regras:** {diretrizes de nomenclatura para novas adições}

### Relação Visual
| Elemento | Marca-Mãe | Submarca A | Submarca B |
|---------|--------|------------|------------|
| Logotipo | {regra} | {regra} | {regra} |
| Cores | {regra} | {regra} | {regra} |
| Tipografia | {regra} | {regra} | {regra} |

### Plano de Migração (se aplicável)
| Fase | Cronograma | Mudanças |
|-------|----------|---------|

### Regras de Governança
- Aprovação de nova marca: {processo}
- Decisão entre estender vs. criar: {critérios}
- Tamanho máximo do portfólio: {N}
- Cadência de revisão: {frequência}

### Lacunas do Portfólio
{Segmentos de público ou mercados não cobertos atualmente}
```

---

## Condições de Veto

- NUNCA desenhe a arquitetura sem entender o portfólio completo de produtos
- NUNCA escolha um modelo com base na estética — ele deve servir à estratégia de negócio
- NUNCA crie mais submarcas do que o mercado consegue diferenciar
- NUNCA migre todas as marcas de uma vez — faça a transição por fases
- NUNCA pule a governança — sem regras, a arquitetura vai se deteriorar

---

## Critérios de Conclusão

- [ ] Modelo de arquitetura selecionado com justificativa pontuada
- [ ] Todos os produtos/serviços mapeados na arquitetura
- [ ] Estratégia de nomenclatura definida com convenções
- [ ] Relações visuais e verbais documentadas
- [ ] Papéis estratégicos atribuídos a cada marca
- [ ] Plano de migração criado (se houver mudança de arquitetura)
- [ ] Framework de governança estabelecido
- [ ] Lacunas do portfólio identificadas
