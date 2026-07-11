---
task: auditar-seo-tecnico()
responsavel: "@auditor-tecnico-seo"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: url
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: auditoria_tecnica
    tipo: markdown
    destino: Console
    persistido: false

Checklist:
  - "[ ] Crawlabilidade & indexação auditadas PRIMEIRO (bloqueadores antes de tudo)"
  - "[ ] Cada achado no formato Issue → Impacto → Evidência → Fix → Prioridade"
  - "[ ] Core Web Vitals com limiar oficial e fonte (PageSpeed campo vs lab) + timestamp"
  - "[ ] Schema checado por browser/Rich Results, nunca 'sem schema' por web_fetch"
  - "[ ] Plano priorizado por impacto × esforço (bloqueadores → alto → quick wins → longo prazo)"
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/tasks/_indice|_indice]]"
---

# Tarefa: Auditar SEO Técnico — Ariadne

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `ARIADNE-002`                                                |
| Versão        | `1.0.0`                                                      |
| Comando       | `*audit`                                                     |
| Orquestrador  | `ariadne-chief`                                              |
| Responsável   | `auditor-tecnico-seo`                                        |
| Propósito     | Auditar o SEO técnico por camadas (crawlabilidade → indexação → CWV → canonical/hreflang → URL/redirects) e entregar um plano priorizado com evidência por achado |

## Entradas

| Entrada           | Origem            | Obrigatório | Descrição                                       |
|-------------------|-------------------|-------------|-------------------------------------------------|
| `url`             | Prompt do usuário | Sim         | URL/site a auditar                              |
| `tipo_site`       | Usuário/Auto      | Não         | SaaS / e-commerce / blog                        |
| `paginas_chave`   | Usuário           | Não         | Páginas/keywords prioritárias                   |
| `acesso_gsc`      | Usuário           | Não         | Acesso ao Search Console (cobertura/CWV)        |

## Pré-condições

- Frente confirmada como SEO técnico pela `ariadne-chief`
- Sem keywords-alvo definidas → pedir handoff de ENTRADA do Argos
- Ferramentas: web_extract, browser_* (Hermes), PageSpeed Insights, Search Console (ADC), MCP Firecrawl/Browserbase
- Credenciais **sempre via Infisical** (`/kolden/ariadne`) — nunca chave em texto puro

## Fases de Execução

### Fase 0: Contexto

1. Confirme tipo de site, objetivo de SEO, páginas/keywords prioritárias, e se há acesso ao GSC e a um PageSpeed.
2. Sem keywords-alvo, peça à chief o handoff de entrada do **Argos**. Respeite robots.txt e rate-limits (auditoria dirigida, não varredura).

### Fase 1: Crawlabilidade & indexação (PRIMEIRO — maior impacto)

1. Leia `/robots.txt` (bloqueios não-intencionais? referência ao sitemap?) e valide `/sitemap.xml` (acessível, só URLs canônicas e indexáveis).
2. Cheque status de indexação (`site:dominio`, cobertura no GSC).
3. Cace bloqueadores: `noindex` em páginas importantes, canonical apontando errado, redirect chain/loop, soft 404, duplicação sem canonical. **Se o Google não acha/indexa, nada mais importa.**

### Fase 2: Fundações técnicas

1. Rode PageSpeed Insights para Core Web Vitals das páginas-chave: **LCP < 2,5s, INP < 200ms, CLS < 0,1** (campo + lab, com fonte e timestamp).
2. Cheque HTTPS (cert válido, sem mixed content, redirect HTTP→HTTPS) e mobile (viewport, tap targets, mesmo conteúdo do desktop).
3. Renderize com browser quando precisar ver conteúdo/recursos client-side.

### Fase 3: Canonical/hreflang + URL/redirects

1. Canonical auto-referente em páginas únicas; consistência www/não-www, http/https, trailing slash.
2. Multi-idioma: hreflang com auto-referência + reciprocidade, códigos válidos (`en-GB`, não `en-UK`), `x-default`, alvos 200/indexáveis; canonical nunca cross-locale.
3. URLs legíveis/minúsculas/hifenizadas; redirects 301 sem chain/loop; status codes corretos.

### Fase 4: Priorizar e rotular

1. Ordene por impacto × esforço: **bloqueadores → alto impacto → quick wins → longo prazo**.
2. Rotule **dado direto** (robots/sitemap/header/CWV) separado de **dedução**.
3. Itens de arquitetura → handoff `@arquiteto-de-site`; schema → `@engenheiro-de-schema`. Entregue ao gate (`ariadne-chief`).

## Formato de Saída

```
ALVO: {url} | tipo: {site} | coletado {AAAA-MM-DD HH:MM BRT}

== RESUMO EXECUTIVO ==
Saúde geral: {ALTA|MÉDIA|BAIXA}. Top 3 bloqueadores: (1) ... (2) ... (3) ...

== TÉCNICO — CRAWLABILIDADE & INDEXAÇÃO ==
[ALTO] {issue}
  Evidência: {como detectei + fonte + timestamp}
  Fix: {ação}. Prioridade {n} (bloqueia indexação).

== FUNDAÇÕES — CORE WEB VITALS ==
{página} {mobile|desktop}: LCP {x}s ({limiar}) | INP {x}ms | CLS {x} | fonte: PageSpeed {campo|lab}, {data}
  Fix: {ação}. [{IMPACTO}] Prioridade {n}.

== CANONICAL/HREFLANG + URL/REDIRECTS ==
[{IMPACTO}] {issue} — Evidência: {...} — Fix: {...}

== PLANO PRIORIZADO ==
1. {bloqueador} | 2. {bloqueador} | 3. {alto impacto} | 4. {quick win}
Itens de arquitetura → handoff @arquiteto-de-site | schema → @engenheiro-de-schema.
```

## Condições de Veto

1. **NUNCA recomende black-hat** (cloaking, doorway, link spam, conteúdo enganoso) para subir ranking.
2. **NUNCA afirme 'sem schema/structured data' baseado em web_fetch/curl** — eles não enxergam JSON-LD por JS; validar por browser/Rich Results.
3. **NUNCA invente volume/dificuldade/tráfego** de ferramenta paga não provisionada — rotule "não disponível — hipótese"; keywords são handoff do Argos.
4. **NUNCA apresente CWV/ranking sem a fonte e o instante da medição.**
5. **NUNCA apresente recomendação como fato sem a fonte do dado** — sem dado, é hipótese rotulada.
6. **NUNCA grave credencial em texto puro** — só via Infisical (`/kolden/ariadne`).

## Critérios de Conclusão

- [ ] Crawlabilidade & indexação auditadas primeiro, com bloqueadores no topo
- [ ] Cada achado no formato Issue → Impacto → Evidência → Fix → Prioridade
- [ ] CWV com limiar oficial + fonte (campo/lab) + timestamp
- [ ] Schema (se citado) checado por browser/Rich Results, nunca por web_fetch
- [ ] Dado direto separado de dedução (dedução rotulada)
- [ ] Plano priorizado por impacto × esforço
- [ ] Formato de saída corresponde ao exemplo acima
