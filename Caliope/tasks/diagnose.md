---
task: diagnose()
responsavel: "@copy-chief"
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
  - "[ ] Solicitação analisada e palavras-chave extraídas"
  - "[ ] Catálogo de roteamento consultado com resultados pontuados"
  - "[ ] Resposta rápida fornecida com roteamento para especialista"
---

# Tarefa: Diagnosticar Solicitação de Copywriting

**ID da Tarefa:** COPY-CHIEF-001
**Versão:** 1.0.0
**Comando:** `*diagnose`
**Orquestrador:** Copy Chief (copy-chief)
**Objetivo:** Triar solicitações de copywriting, fornecer resposta rápida e rotear para o especialista.

---

## Visão Geral

```
Solicitação do Usuário → Analisar Palavras-chave → Cruzar Catálogo de Roteamento → Responder/Rotear → Saída
     │              │                    │                     │
     ▼              ▼                    ▼                     ▼
  Entrada bruta  Extrair intenção   Pontuar domínios      Resposta rápida +
              + nível de       contra 17 domínios    rota de especialista
              consciência + meio
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| request | string | Prompt do usuário | Sim | Descrição não vazia relacionada a copywriting |
| context | object | Estado da sessão | Não | Contexto do projeto, público-alvo, nível de consciência |
| medium | string | Prompt do usuário | Não | headline, email, VSL, sales letter, ad, funnel, etc. |

---

## Pré-condições

- O Copy Squad está ativo com o Copy Chief como agente de entrada
- Catálogo de roteamento carregado de data/routing-catalog.yaml
- Todos os 22 agentes especialistas registrados em config.yaml

---

## Fases de Execução

### Fase 1: Analisar a Solicitação

1. Analise a solicitação do usuário em busca da intenção de copywriting
2. Extraia as palavras-chave e a intenção primárias
3. Identifique o meio da copy (headline, sales letter, email, VSL, ad, funnel, etc.)
4. Identifique o nível de consciência, se mencionado (inconsciente, consciente do problema, consciente da solução, consciente do produto, totalmente consciente)
5. Anote os domínios secundários (ex.: "sequência de e-mail para um produto de saúde" = email_sequence + financial_health_copy)

### Fase 2: Cruzar com o Catálogo de Roteamento

| Domínio | Palavras-chave | Rotear Para |
|--------|----------|---------|
| Título | headline, linha de assunto, gancho, atenção, níveis de consciência | eugene-schwartz / gary-halbert |
| Carta de Vendas | sales letter, formato longo, mala direta, copy longa | gary-halbert / john-carlton |
| Sequência de E-mail | sequência de e-mail, autoresponder, soap opera, nutrição | andre-chaperon / ben-settle |
| VSL | VSL, video sales letter, roteiro de vídeo, RMBC | stefan-georgi / jon-benson |
| Roteiro de Webinar | webinar, roteiro de webinar, perfect webinar, apresentação | russell-brunson / todd-brown |
| Criação de Oferta | oferta, oferta irresistível, garantia, bônus, stack | dan-kennedy / joe-sugarman |
| Copy de Funil | funil, landing page, opt-in, tripwire, upsell | russell-brunson / frank-kern |
| Grande Ideia | big idea, conceito de campanha, mecanismo único, E5 | todd-brown / eugene-schwartz |
| Bullet Points | bullets, fascinações, teasers, curiosidade | gary-bencivenga / clayton-makepeace |
| E-mails Diários | e-mail diário, engajamento, newsletter, anti-guru | ben-settle / dan-koe |
| Mala Clássica | carta clássica, mala direta, carta de empatia, magalog | robert-collier / jim-rutz |
| Financeiro/Saúde | copy financeira, copy de saúde, suplemento, investimento | clayton-makepeace / parris-lampropoulos |
| Copy de Marca | copy de marca, premium, elegante, sofisticada | david-ogilvy / david-deutsch |
| Copy de Anúncio | copy de anúncio, anúncios pagos, anúncio de Facebook, PPC, copy curta | dan-kennedy / frank-kern |
| Copy de Lançamento | lançamento, lançamento de produto, sequência de lançamento, abertura de carrinho | frank-kern / russell-brunson |
| Marca Pessoal | marca pessoal, negócio de uma pessoa, criador, autoridade | dan-koe / ry-schwartz |
| Revisão de Copy | revisão de copy, crítica, feedback, analisar, reescrever | copy-chief / eugene-schwartz |

**Regras de pontuação:**
- Conte as correspondências de palavras-chave por domínio
- 2+ correspondências acima das demais --> rotear para o especialista primário daquele domínio
- Empate ou cruzamento de domínios --> Copy Chief responde diretamente, sugere 2 especialistas
- Nenhuma correspondência clara --> faça uma pergunta de esclarecimento sobre o meio e o nível de consciência

### Fase 3a: Resposta Transversal

Se a solicitação for geral ou interdomínios:
- Sintetize uma resposta extraindo de múltiplas tradições do copywriting
- Referencie quais especialistas poderiam adicionar profundidade
- Forneça conselho acionável de copywriting imediatamente

### Fase 3b: Rota Específica de Domínio

Se a solicitação mapear claramente para um domínio:
1. **Resposta rápida primeiro** (no mínimo 3-5 linhas + exemplo concreto ou referência a framework)
2. **Rotear:** Nomeie o especialista, explique seu valor único, forneça o comando de ativação
   - Exemplo: "Para roteiros de VSL, o método RMBC de Stefan Georgi é o padrão-ouro. Ative com `@copy-squad:stefan-georgi`"

### Fase 4: Avaliação de Confiança

| Confiança | Critérios | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave em um domínio | Rotear com confiança para o especialista primário |
| MÉDIA | 1-2 correspondências ou dividido entre 2 domínios | Responder + sugerir 2 especialistas |
| BAIXA | Nenhuma correspondência clara ou meio ambíguo | Responder diretamente, fazer pergunta de esclarecimento |

---

## Formato de Saída

```markdown
## Diagnóstico
**Categoria:** {domínio | transversal}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Especialista:** {Nome} ({agent-id}) | Resposta Direta

### Resposta Rápida
{Resposta de 3-10 linhas com conselho concreto de copywriting}

### Próximo Passo Recomendado
{Instrução de rota com comando de ativação, ou pergunta de acompanhamento}
```

---

## Condições de Veto

- NUNCA roteie sem antes fornecer uma resposta rápida
- NUNCA roteie quando a confiança for BAIXA — responda diretamente e faça perguntas de esclarecimento
- NUNCA carregue o arquivo de um agente especialista durante o diagnóstico
- NUNCA adivinhe quando o meio da copy for ambíguo — pergunte ao usuário
- NUNCA atribua o nível de consciência sem sinais explícitos da solicitação

---

## Critérios de Conclusão

- [ ] Solicitação analisada e palavras-chave extraídas
- [ ] Meio da copy identificado (ou esclarecimento solicitado)
- [ ] Catálogo de roteamento consultado com resultados pontuados
- [ ] Resposta rápida fornecida com conselho acionável
- [ ] Roteamento para especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado
