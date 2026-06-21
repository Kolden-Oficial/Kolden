---
task: dimensionar-mercado()
responsavel: "@market-sizer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: nicho
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: market_sizing
    tipo: yaml
    destino: Console
    persistido: false

Checklist:
  - "[ ] Mercado recortado (nicho + geografia + segmento de cliente-alvo) antes de qualquer número"
  - "[ ] TAM/SAM/SOM estimados por DOIS métodos (top-down E bottom-up), cada um com fonte + data + método"
  - "[ ] Top-down e bottom-up triangulados e a divergência explicada"
  - "[ ] Tendências/demanda lidas com proxies datados (data + janela)"
  - "[ ] Cada número entregue como FAIXA com rótulo de confiança; saída no schema"
---

# Tarefa: Dimensionar Mercado — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:dimensionar-mercado`                                  |
| Comando       | `@market-sizer "dimensione {nicho}"`                        |
| Orquestrador  | `argos-chief`                                                |
| Responsável   | `market-sizer`                                               |
| Propósito     | Produzir TAM/SAM/SOM com método declarado (top-down E bottom-up), triangulados, e ler tendências macro — cada número com FONTE + DATA + MÉTODO |

## Entradas

| Entrada            | Origem            | Obrigatório | Descrição                                            |
|--------------------|-------------------|-------------|------------------------------------------------------|
| `nicho`            | Prompt do usuário | Sim         | O mercado/nicho a dimensionar                         |
| `geografia`        | Usuário/Auto      | Não         | Recorte geográfico (país/região)                     |
| `ticket_medio`     | Usuário           | Não         | Ticket médio conhecido (alimenta o bottom-up)         |
| `fontes_conhecidas`| Usuário           | Não         | Relatórios/dados já em mãos para acelerar o top-down  |

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Backends de busca disponíveis (`web_search`, `firecrawl_search`, `firecrawl_research`, `web_search_exa`)
- Apollo acessível para a contagem bottom-up (`apollo_mixed_companies_search`, `apollo_organizations_enrich`, `apollo_organizations_job_postings`)
- Credenciais (Apollo, backends) **sempre via Infisical** — nunca chave em texto puro
- Mercado recortável: nicho + geografia + segmento de cliente-alvo definíveis

## Fases

### Fase 0: Recortar o mercado (market-sizer)

1. Antes de qualquer número, fixe o recorte explícito: geografia (país/região), segmento de cliente-alvo, definição do produto/serviço.
2. Sem recorte, "tamanho de mercado" não significa nada — e top-down e bottom-up acabam medindo coisas diferentes. Se `geografia` não veio, assuma um default e **declare a suposição**.

### Fase 1: Top-down (teto)

1. Busque relatórios setoriais e dados oficiais via `web_search`, `firecrawl_search`, `firecrawl_research`, `web_search_exa` — Statista, Gartner, IBGE, associações setoriais.
2. Parta do mercado global/nacional e aplique os recortes (geográfico, de segmento) para chegar ao TAM/SAM.
3. **Cada número herda a FONTE (URL) e a DATA do relatório.** O relatório é uma estimativa de teto, não verdade.
4. Registre `dado-origem` (ano do dado) separado de `coleta` (data da busca) quando diferirem.

### Fase 2: Bottom-up (base)

1. Estime de baixo pra cima: **nº de clientes potenciais × ticket médio × frequência de compra**.
2. Dimensione o universo de empresas-alvo com `apollo_mixed_companies_search` (contagem por filtro setor/porte/geo) e enriqueça com `apollo_organizations_enrich` (headcount/setor).
3. Use `apollo_organizations_job_postings` como proxy datado de crescimento/demanda.
4. Ticket e frequência: use `ticket_medio` quando fornecido ou fonte citada; se for estimativa, **rotule como premissa a validar**.

### Fase 3: Triangular

1. Coloque top-down e bottom-up lado a lado e calcule a divergência (ex.: top-down 1,4× o bottom-up).
2. **Explique de onde vem a divergência** — definição de mercado diferente, fonte velha, premissa de frequência otimista, mercado adjacente contado junto.
3. A estimativa final é a **FAIXA que os dois sustentam** — nunca a média cega nem o número conveniente.

### Fase 4: Ler tendência / demanda

1. Levante sinais **sempre datados**: crescimento/queda de volume de busca (Google Trends), novos entrantes, rodadas de investimento/movimento de capital.
2. Cada sinal carrega data + janela de observação. São **sinal de demanda**, não número de mercado.

### Fase 5: Montar TAM/SAM/SOM e empacotar

1. **TAM** e **SAM**: a faixa triangulada das Fases 1–3, com método declarado.
2. **SOM**: fatia capturável a curto/médio prazo, derivada do SAM com premissa explícita de penetração (canal, capacidade, concorrência) — rotulada como projeção.
3. Cada número vira um card de fonte: valor + faixa + método + fonte (URL) + timestamp + confiança.
4. Handoff: `research-synthesizer` (relatório final) e `competitor-mapper` (camada meso).

## Formato de Saída

```yaml
market_sizing:
  nicho: "{nicho}"
  geografia: "{país/região ou 'assumido: {valor}'}"
  segmento: "{segmento de cliente-alvo}"
  coleta: "{AAAA-MM-DD}"
  tam:
    valor: "{valor com faixa mínimo–máximo}"
    metodo: "{top-down | bottom-up | triangulado}"
    fontes: ["{URL/origem + dado-origem + coleta}"]
    data: "{AAAA-MM-DD}"
    confianca: "{alta | média | baixa | fonte única — não confirmado}"
  sam:
    valor: "{valor com faixa}"
    metodo: "{top-down | bottom-up | triangulado}"
    fontes: ["{URL/origem + data}"]
    data: "{AAAA-MM-DD}"
    confianca: "{alta | média | baixa}"
  som:
    valor: "{valor com faixa}"
    metodo: "bottom-up — SAM × penetração (projeção)"
    fontes: ["{base do SAM + premissa de penetração}"]
    data: "{AAAA-MM-DD}"
    confianca: "{média | baixa — projeção}"
  triangulacao: |
    {top-down vs bottom-up: razão da divergência + explicação + faixa final sustentada pelos dois}
  tendencias:
    - "{sinal datado + data + janela de observação}"
  premissas:
    - "{premissa explícita rotulada — ex.: ticket/frequência a validar}"
```

## Regras de Veto

1. **NUNCA entregue número sem FONTE + TIMESTAMP + MÉTODO** — número sem os três é rejeitado, não rebaixado.
2. **NUNCA apresente TAM top-down como verdade absoluta** — é estimativa de teto, datada e a triangular.
3. **SEMPRE estime por DOIS métodos** (top-down e bottom-up); quando houver dados de base, **prefira o bottom-up**.
4. **NUNCA esconda a divergência** entre top-down e bottom-up nem escolha o número conveniente — explique-a.
5. **NUNCA promova número de fonte única a 'verificado'** sem segunda fonte independente — marque 'não confirmado'.
6. **SEMPRE marque a incerteza** — faixa, não ponto único; rótulo de confiança em cada número; premissa rotulada como premissa.
7. **NUNCA grave credencial em texto puro** — toda chave vem do Infisical; coleta autenticada / zona ToS-cinza só via `compliance-sentinela`.

## Critérios de Conclusão

- [ ] Mercado recortado (nicho + geografia + segmento) antes de qualquer número
- [ ] TAM/SAM/SOM estimados por top-down E bottom-up, cada número com fonte + data + método
- [ ] Top-down e bottom-up triangulados e a divergência explicada
- [ ] Tendências/demanda lidas com proxies datados (data + janela)
- [ ] Cada número entregue como FAIXA com rótulo de confiança
- [ ] Números de fonte única marcados 'não confirmado'
- [ ] Formato de saída corresponde ao schema acima
