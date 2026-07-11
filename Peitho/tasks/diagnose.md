---
task: diagnoseTrafficChallenge()
responsavel: "@traffic-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: request
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: false

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Requisição interpretada e palavras-chave extraídas"
  - "[ ] Catálogo de roteamento consultado com resultados pontuados"
  - "[ ] Resposta rápida fornecida com referência de métrica"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar Desafio de Tráfego

**Task ID:** TRAFFIC-CHIEF-001
**Versão:** 1.0.0
**Comando:** `*diagnose`
**Orquestrador:** Traffic Chief (traffic-chief)
**Propósito:** Triar desafios de tráfego pago, fornecer resposta rápida, rotear para especialista de plataforma ou especialista funcional.

---

## Visão Geral

```
Requisição do Usuário → Interpretar Palavras-chave → Casar com Catálogo de Roteamento → Responder/Rotear → Saída
     │              │                    │                     │
     ▼              ▼                    ▼                     ▼
  Entrada bruta  Extrair plataforma  Pontuar domínios     Resposta rápida +
              + função +          contra 17 domínios     rota de especialista
              contexto de métricas + roteamento de plataforma  (consciente de plataforma)
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| request | string | Prompt do usuário | Sim | Descrição não vazia relacionada a tráfego/anúncios |
| context | object | Estado da sessão | Não | Detalhes da conta de anúncios, métricas atuais, orçamento |
| platform | string | Prompt do usuário | Não | Facebook, Google, YouTube, TikTok, LinkedIn, multiplataforma |

---

## Pré-condições

- O Traffic Masters está ativo com o Traffic Chief como agente de entrada
- Catálogo de roteamento carregado de data/routing-catalog.yaml
- Todos os 15 agentes especialistas registrados em config.yaml
- Mapa de roteamento de plataforma disponível para triagem específica de plataforma

---

## Fases de Execução

### Fase 1: Analisar Requisição

1. Interprete o desafio de tráfego do usuário
2. Extraia as palavras-chave primárias e a intenção
3. Identifique a plataforma (Facebook/Meta, Google, YouTube, TikTok, LinkedIn ou multiplataforma)
4. Identifique a função (criativo, escala, rastreamento, auditoria, orçamentação, mídia paga)
5. Anote as métricas-chave mencionadas (ROAS, CPA, CTR, CPM, nível de investimento)

### Fase 2: Casar Contra o Catálogo de Roteamento

| Domínio | Palavras-chave | Rotear Para |
|--------|----------|----------|
| Estratégia Facebook/Meta | Facebook ads, Meta ads, Instagram ads | molly-pittman / depesh-mandalia |
| Escala no Facebook | escalar Facebook, aumentar investimento, método BPM | depesh-mandalia / ralph-burns |
| YouTube Ads | YouTube ads, anúncios em vídeo, pre-roll, TrueView | tom-breeze / ad-midas |
| Google Ads | Google Ads, PPC, Performance Max, anúncios de pesquisa | kasim-aslam / performance-analyst |
| Facebook de Alto ROI | alto ROI, Give-Give-Give-Ask, anúncios de relacionamento | nicholas-kusmich / molly-pittman |
| Tráfego Brasil/LATAM | Brasil, LATAM, método Sobral, anúncios em português | pedro-sobral / depesh-mandalia |
| Criativo de Anúncio | criativo, criativo de anúncio, UGC, criativo em vídeo | ad-midas / creative-analyst |
| Mídia Paga | mídia paga, configuração de campanha, lances, posicionamento | media-buyer / ralph-burns |
| Análise de Performance | analytics, relatórios, métricas, ROAS, dados | performance-analyst / ads-analyst |
| Teste de Criativo | teste A/B, split test, fadiga de criativo, iteração | creative-analyst / ad-midas |
| Escala de Campanha | escalar campanhas, aumentar orçamento, lookalike | scale-optimizer / depesh-mandalia |
| Rastreamento/Atribuição | rastreamento, pixel, CAPI, atribuição, iOS 14 | pixel-specialist / performance-analyst |
| Auditoria de Conta de Anúncios | auditoria, saúde da conta, desperdício, otimização | ads-analyst / performance-analyst |
| Gestão de Orçamento | orçamento, investimento em anúncios, controle de custo, alocação | fiscal / scale-optimizer |
| Estratégia de Funil Completo | funil completo, TOFU, MOFU, BOFU, jornada do cliente | ralph-burns / molly-pittman |
| Tráfego Perpétuo | tráfego perpétuo, evergreen, always-on, sustentável | ralph-burns / molly-pittman |

**Roteamento por atalho de plataforma:**
- Facebook/Meta mencionado --> molly-pittman, depesh-mandalia, ralph-burns (refinar por função)
- YouTube mencionado --> tom-breeze
- Google mencionado --> kasim-aslam
- TikTok mencionado --> media-buyer, ad-midas
- LinkedIn mencionado --> media-buyer, nicholas-kusmich
- Multiplataforma / não claro --> traffic-chief responde, sugere especialistas de plataforma

**Regras de pontuação:**
- Conte as correspondências de palavras-chave por domínio
- 2+ correspondências acima dos outros --> rotear para o especialista primário daquele domínio
- Correspondência de plataforma + função --> rotear primeiro para o especialista de plataforma
- Empate ou multiplataforma --> Traffic Chief responde diretamente
- Sem correspondência clara --> pergunte sobre plataforma, orçamento e métricas atuais

### Fase 3a: Resposta Transversal

Se a requisição for geral ou multiplataforma:
- Forneça conselho de tráfego agnóstico de plataforma
- Referencie as métricas-chave a avaliar (ROAS, CPA, CTR)
- Sugira especialistas específicos de plataforma para análise mais profunda

### Fase 3b: Rota Específica de Domínio

Se a requisição mapear claramente para um domínio:
1. **Resposta rápida primeiro** (mínimo de 3-5 linhas + benchmark de métrica concreto ou tática)
2. **Rota:** Nomeie o especialista, explique sua metodologia, forneça o comando de ativação
   - Exemplo: "Para escalar investimento no Facebook, o método BPM de Depesh Mandalia é comprovado em escala. Ative com `@traffic-masters:depesh-mandalia`"

### Fase 4: Avaliação de Confiança

| Confiança | Critério | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave + plataforma clara | Rotear com confiança para o especialista primário |
| MÉDIA | 1-2 correspondências ou plataforma não clara | Responder + sugerir 2 especialistas |
| BAIXA | Sem correspondência clara ou muito vago | Responder diretamente, perguntar sobre plataforma e orçamento |

---

## Formato de Saída

```markdown
## Diagnóstico
**Categoria:** {domínio | multiplataforma}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Plataforma:** {Facebook | Google | YouTube | TikTok | LinkedIn | Multiplataforma}
**Especialista:** {Nome} ({agent-id}) | Resposta Direta

### Resposta Rápida
{resposta de 3-10 linhas com conselho de tráfego concreto}

### Próximo Passo Recomendado
{instrução de rota com comando de ativação, ou pergunta de acompanhamento}
```

---

## Condições de Veto

- NUNCA roteie sem fornecer uma resposta rápida primeiro
- NUNCA roteie quando a confiança for BAIXA — responda diretamente e pergunte sobre plataforma + métricas
- NUNCA carregue um arquivo de agente especialista durante o diagnóstico
- NUNCA presuma uma plataforma quando ela não for explicitamente mencionada
- NUNCA dê conselho sem referenciar métricas ou benchmarks específicos

---

## Critérios de Conclusão

- [ ] Requisição interpretada e palavras-chave extraídas
- [ ] Plataforma identificada (ou esclarecimento solicitado)
- [ ] Catálogo de roteamento consultado com resultados pontuados
- [ ] Resposta rápida fornecida com referência de métrica
- [ ] Roteamento de especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado
