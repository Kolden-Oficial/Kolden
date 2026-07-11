---
task: diagnose()
responsavel: "@brand-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: request
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Relatório de Diagnóstico
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Requisição interpretada e domínio de marca identificado"
  - "[ ] Catálogo de roteamento consultado com resultados pontuados"
  - "[ ] Resposta rápida fornecida com roteamento para especialista"
tipo: nota
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
relacionado:
  - "[[Aglaia/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar Desafio de Marca

**Task ID:** BRAND-CHIEF-001
**Version:** 1.0.0
**Comando:** `*diagnose`
**Orquestrador:** Brand Chief (brand-chief)
**Propósito:** Triar desafios de marca, fornecer resposta rápida, rotear para o especialista.

---

## Visão Geral

```
Requisição do Usuário → Extrair Palavras-chave → Casar com Catálogo de Roteamento → Responder/Rotear → Saída
     │              │                    │                     │
     ▼              ▼                    ▼                     ▼
  Entrada bruta   Extrair tipo de        Pontuar domínios         Resposta rápida +
              desafio de marca     contra 13 domínios     rota para especialista
              + estágio de maturidade   + roteamento por maturidade     (ciente da maturidade)
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| request | string | Prompt do usuário | Sim | Descrição não vazia relacionada a marca |
| context | object | Estado da sessão | Não | Estágio da empresa, setor, ativos de marca existentes |
| maturity | string | Prompt do usuário | Não | pré-lançamento, startup, crescimento, enterprise, luxo |

---

## Pré-condições

- O Brand Squad está ativo com o Brand Chief como agente de entrada
- Catálogo de roteamento carregado de data/routing-catalog.yaml
- Todos os 14 agentes especialistas registrados em config.yaml
- Roteamento por maturidade de marca disponível para triagem ciente do estágio

---

## Fases de Execução

### Fase 1: Analisar a Requisição

1. Interpretar o desafio de marca do usuário
2. Extrair palavras-chave primárias e intenção
3. Identificar o domínio de marca (valor de marca/equity, identidade, posicionamento, mensagens, arquitetura, naming, etc.)
4. Identificar o estágio de maturidade da marca, se mencionado (pré-lançamento, startup, crescimento, enterprise, luxo)
5. Observar se a requisição envolve uma tensão conhecida (diferenciação vs distintividade, emocional vs evidência)

### Fase 2: Casar com o Catálogo de Roteamento

| Domínio | Palavras-chave | Rotear Para |
|--------|----------|----------|
| Valor de Marca (Brand Equity) | valor de marca, brand equity, brand value, lealdade, lembrança, associações | david-aaker / kevin-keller |
| Identidade de Marca | identidade de marca, identity prism, DNA, personalidade, cultura | jean-noel-kapferer / alina-wheeler |
| Posicionamento | posicionamento, categoria, foco, diferenciação, dominar uma palavra | al-ries / marty-neumeier |
| Baseado em Evidência | how brands grow, disponibilidade mental, ativos distintivos, alcance | byron-sharp / kevin-keller |
| Mensagens | StoryBrand, mensagens, one-liner, brand script, clarificar mensagem | donald-miller / miller-sticky-brand |
| Identidade Visual | logo, identidade visual, manual de marca, design system, pontos de contato | alina-wheeler / archetype-consultant |
| Cultura de Marca | cultura de marca, marca empregadora, marca interna, fusão | denise-yohn / donald-miller |
| Marca de Startup | marca de startup, DTC, lançar marca, marca desde o dia um, marca nova | emily-heyward / marty-neumeier |
| Marca de Luxo | luxo, premium, prestígio, estratégia de luxo, anti-leis | jean-noel-kapferer / david-aaker |
| Naming | naming, nome de marca, renomear, geração de nomes, domínio | naming-strategist / domain-scout |
| Arquétipo | arquétipo, personalidade de marca, caráter, Jung, herói, rebelde | archetype-consultant / jean-noel-kapferer |
| Arquitetura de Marca | arquitetura de marca, submarcas, branded house, house of brands, portfólio | david-aaker / kevin-keller |
| Debate de Diferenciação | diferenciação vs distintividade, zag, diferenciação radical | marty-neumeier / byron-sharp |

**Roteamento atalho por maturidade de marca:**
- Pré-lançamento --> emily-heyward, naming-strategist, domain-scout
- Startup --> emily-heyward, marty-neumeier, donald-miller
- Crescimento --> david-aaker, al-ries, kevin-keller
- Enterprise --> jean-noel-kapferer, denise-yohn, david-aaker
- Luxo --> jean-noel-kapferer, david-aaker, alina-wheeler

**Regras de pontuação:**
- Contar correspondências de palavras-chave por domínio
- 2+ correspondências acima dos demais --> rotear para o especialista primário daquele domínio
- Estágio de maturidade + correspondência de domínio --> refinar o roteamento usando o atalho por maturidade
- Empate ou cross-domain --> Brand Chief responde com síntese multiframework
- Sem correspondência clara --> perguntar sobre o estágio de maturidade da marca e o desafio principal

### Fase 3a: Resposta Transversal

Se a requisição for geral ou cross-domain:
- Sintetizar resposta extraindo de múltiplos frameworks de marca
- Observar tensões relevantes (diferenciação vs distintividade, emocional vs evidência)
- Referenciar quais especialistas poderiam aprofundar

### Fase 3b: Rota Específica de Domínio

Se a requisição mapear claramente para um domínio:
1. **Resposta rápida primeiro** (mínimo de 3-5 linhas + referência de framework)
2. **Rotear:** Nomear o especialista, explicar seu framework único, fornecer o comando de ativação
   - Exemplo: "Para posicionamento de marca, Al Ries literalmente escreveu o livro. Ative com `@brand-squad:al-ries`"

### Fase 4: Avaliação de Confiança

| Confiança | Critério | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave em um domínio | Rotear com confiança para o especialista primário |
| MÉDIA | 1-2 correspondências ou dividida entre 2 domínios | Responder + sugerir 2 especialistas |
| BAIXA | Sem correspondência clara ou muito vaga | Responder diretamente, perguntar sobre estágio de maturidade e desafio |

---

## Formato de Saída

```markdown
## Diagnóstico
**Categoria:** {domínio | transversal}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Maturidade de Marca:** {pré-lançamento | startup | crescimento | enterprise | luxo | desconhecida}
**Especialista:** {Nome} ({agent-id}) | Resposta Direta

### Resposta Rápida
{resposta de 3-10 linhas com referência a framework de marca}

### Próximo Passo Recomendado
{instrução de rota com comando de ativação, ou pergunta de acompanhamento}
```

---

## Condições de Veto

- NUNCA rotear sem fornecer antes uma resposta rápida
- NUNCA rotear quando a confiança for BAIXA — responda diretamente e faça perguntas de esclarecimento
- NUNCA carregar o arquivo de um agente especialista durante o diagnóstico
- NUNCA ignorar a tensão diferenciação vs distintividade quando ambos os domínios casam
- NUNCA presumir o estágio de maturidade da marca sem sinais explícitos

---

## Critérios de Conclusão

- [ ] Requisição interpretada e palavras-chave extraídas
- [ ] Domínio de marca identificado (ou esclarecimento solicitado)
- [ ] Catálogo de roteamento consultado com resultados pontuados
- [ ] Resposta rápida fornecida com referência de framework
- [ ] Roteamento para especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado
