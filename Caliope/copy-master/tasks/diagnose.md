---
task: diagnose()
responsavel: "@copy-master-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: request
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Requisição interpretada e palavras-chave extraídas"
  - "[ ] Catálogo de roteamento consultado com resultados pontuados (27 domínios, 32 agentes)"
  - "[ ] Resposta rápida fornecida com roteamento para especialista"
---

# Tarefa: Diagnosticar Requisição de Copywriting

**ID da Tarefa:** COPY-M-CHIEF-001
**Versão:** 2.0.0
**Comando:** `*diagnose`
**Orquestrador:** Copy Master Chief (copy-master-chief)
**Propósito:** Triar requisições de copywriting, fornecer uma resposta rápida e rotear para o melhor entre 32 agentes especialistas distribuídos em 27 domínios.

---

## Visão Geral

```
Requisição do Usuário -> Interpretar Palavras-chave -> Cruzar com Catálogo de Roteamento -> Responder/Rotear -> Saída
     |              |                    |                     |
     v              v                    v                     v
  Entrada bruta   Extrair intenção     Pontuar domínios         Resposta rápida +
              + nível de consciência   contra 27 domínios     rota de especialista
              + meio                   (32 agentes)
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| request | string | Prompt do usuário | Sim | Descrição não vazia relacionada a copywriting |
| context | object | Estado da sessão | Não | Contexto do projeto, público-alvo, nível de consciência |
| medium | string | Prompt do usuário | Não | headline, e-mail, VSL, carta de vendas, anúncio, funil, etc. |

---

## Pré-condições

- Copy Master Squad está ativo com o Copy Master Chief como agente de entrada
- Catálogo de roteamento carregado com todos os 27 domínios
- Todos os 32 agentes especialistas registrados

---

## Fases de Execução

### Fase 1: Analisar a Requisição

1. Interprete a requisição do usuário buscando a intenção de copywriting
2. Extraia as palavras-chave primárias e a intenção
3. Identifique o meio do copy (headline, carta de vendas, e-mail, VSL, anúncio, funil, webinar, pitch, etc.)
4. Identifique o nível de consciência se mencionado (inconsciente, consciente do problema, consciente da solução, consciente do produto, mais consciente)
5. Anote domínios secundários (ex.: "sequência de e-mails para um produto de saúde" = email_sequence + financial_health_copy)

### Fase 2: Cruzar com o Catálogo de Roteamento (27 Domínios, 32 Agentes)

| Domínio | Palavras-chave | Rotear Para |
|--------|----------|---------|
| Headline | headline, linha de assunto, hook, atenção, níveis de consciência | eugene-schwartz / gary-bencivenga |
| Carta de Vendas | carta de vendas, long-form, mala direta, copy longo | gary-halbert / john-carlton |
| Sequência de E-mails | sequência de e-mails, autoresponder, soap opera, nutrição | andre-chaperon / ben-settle |
| VSL | VSL, video sales letter, roteiro de vídeo, RMBC | stefan-georgi / jon-benson |
| Roteiro de Webinar | webinar, roteiro de webinar, perfect webinar, apresentação | russell-brunson / todd-brown |
| Pitch Deck | pitch, pitch deck, investidor, método STRONG, controle de frame | oren-klaff |
| Criação de Oferta | oferta, oferta irresistível, garantia, bônus, stack | dan-kennedy / alex-hormozi |
| Copy de Funil | funil, landing page, opt-in, tripwire, upsell | russell-brunson / frank-kern |
| Big Idea | big idea, conceito de campanha, mecanismo único, E5 | todd-brown / eugene-schwartz |
| Bullet Points | bullets, fascinations, teasers, curiosidade | gary-bencivenga / clayton-makepeace |
| E-mails Diários | e-mail diário, engajamento, newsletter, anti-guru | ben-settle / dan-koe |
| Mala Direta Clássica | carta clássica, mala direta, carta de empatia, magalog | robert-collier / jim-rutz |
| Copy Financeiro | copy financeiro, investimento, portfólio, trading | clayton-makepeace / parris-lampropoulos |
| Copy de Saúde | copy de saúde, suplemento, bem-estar, fitness | parris-lampropoulos / evaldo-albuquerque |
| Copy de Marca | copy de marca, premium, elegante, sofisticado | david-ogilvy / david-deutsch |
| Copy de Anúncio | copy de anúncio, anúncios pagos, anúncio no Facebook, PPC, copy curto | dan-kennedy / frank-kern |
| Copy de Lançamento | lançamento, lançamento de produto, sequência de lançamento, abertura de carrinho | frank-kern / russell-brunson |
| Marca Pessoal | marca pessoal, negócio de uma pessoa só, criador, autoridade | dan-koe / ry-schwartz |
| Revisão de Copy | revisão de copy, crítica, feedback, analisar, reescrever | copy-master-chief / eugene-schwartz |
| Psicologia da Persuasão | persuasão, influência, psicologia, gatilhos, conformidade | robert-cialdini / blair-warren |
| Copy de Negociação | negociação, tratamento de objeções, fechamento, empatia tática | chris-voss |
| Copy de SaaS | SaaS, software, trial, onboarding, product-led | joanna-wiebe |
| Otimização de Conversão | CRO, taxa de conversão, teste A/B, otimização de página | joanna-wiebe / joe-sugarman |
| Mudança de Crença | crença, paradigma, visão de mundo, ponte da epifania | evaldo-albuquerque / todd-brown |
| Vendas Guiadas por História | história, narrativa, história de origem, epifania | gary-halbert / russell-brunson |
| Arquitetura de Oferta | value equation, Grand Slam offer, precificação, value stack | alex-hormozi / dan-kennedy |
| Publicidade Científica | testes, split test, métricas, copy orientado a dados | claude-hopkins / john-caples |

**Regras de pontuação:**
- Conte as correspondências de palavras-chave por domínio
- 2+ correspondências acima dos demais -> roteie para o especialista primário daquele domínio
- Empate ou cruzamento de domínios -> o Copy Master Chief responde diretamente, sugere 2 especialistas
- Sem correspondência clara -> faça uma pergunta esclarecedora sobre o meio e o nível de consciência

### Fase 3a: Resposta Transversal

Se a requisição for genérica ou multidomínio:
- Sintetize uma resposta a partir de múltiplas tradições do copywriting
- Mencione quais especialistas poderiam acrescentar profundidade
- Forneça conselho de copywriting acionável imediatamente

### Fase 3b: Rota Específica de Domínio

Se a requisição mapeia claramente para um domínio:
1. **Resposta rápida primeiro** (no mínimo 3-5 linhas + exemplo concreto ou referência a framework)
2. **Rota:** Nomeie o especialista, explique seu valor único, forneça o comando de ativação
   - Exemplo: "Para roteiros de VSL, o método RMBC do Stefan Georgi é o padrão-ouro. Ative com `@copy-master:stefan-georgi`"

### Fase 4: Avaliação de Confiança

| Confiança | Critério | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave em um domínio | Roteie com confiança para o especialista primário |
| MÉDIA | 1-2 correspondências ou dividido entre 2 domínios | Responda + sugira 2 especialistas |
| BAIXA | Sem correspondência clara ou meio ambíguo | Responda diretamente, faça uma pergunta esclarecedora |

---

## Formato de Saída

```markdown
## Diagnóstico
**Categoria:** {domínio | transversal}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Especialista:** {Nome} ({agent-id}) | Resposta Direta

### Resposta Rápida
{resposta de 3-10 linhas com conselho concreto de copywriting}

### Próximo Passo Recomendado
{instrução de rota com comando de ativação, ou pergunta de acompanhamento}
```

---

## Condições de Veto

- NUNCA roteie sem fornecer uma resposta rápida primeiro
- NUNCA roteie quando a confiança for BAIXA — responda diretamente e faça perguntas esclarecedoras
- NUNCA carregue o arquivo de um agente especialista durante o diagnóstico
- NUNCA adivinhe quando o meio do copy for ambíguo — pergunte ao usuário
- NUNCA atribua nível de consciência sem sinais explícitos da requisição

---

## Critérios de Conclusão

- [ ] Requisição interpretada e palavras-chave extraídas
- [ ] Meio do copy identificado (ou esclarecimento solicitado)
- [ ] Catálogo de roteamento consultado com resultados pontuados (27 domínios, 32 agentes)
- [ ] Resposta rápida fornecida com conselho acionável
- [ ] Roteamento para especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado
