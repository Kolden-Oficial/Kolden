---
name: retriever-sonar
description: Usar o Perplexity Sonar como retriever de busca/pesquisa web do Argos, ao lado dos backends já existentes (Exa, Tavily, Firecrawl, GPT-Researcher). Use quando precisar de busca web com citações nativas, Q&A web-grounded, pesquisa profunda multi-fonte (deep research) ou raciocínio web-grounded — e quando o ganho de qualidade de citação justificar usar um vendor EXTERNO não soberano. NÃO use como retriever padrão: o default continua sendo as fontes soberanas (Firecrawl self-host) e nativas do Hermes. Sempre tente REUSE delas primeiro.
---

# Habilidade: retriever-sonar (Perplexity Sonar como backend de busca)

O motor do Argos já prevê **retrievers plugáveis** (`research --fontes exa,firecrawl,tavily`).
Esta habilidade adiciona o **Perplexity Sonar** como mais um backend/retriever — útil quando o
diferencial é **citação nativa de fontes** e **pesquisa web-grounded** de alta qualidade.

> ⚠️ **RESSALVA DE SOBERANIA (ler antes de usar).** O Perplexity Sonar é um **vendor externo
> hospedado** (`api.perplexity.ai`). Diferente do Firecrawl self-host e do motor vendorizado
> (`motor/`), **a query e o conteúdo trafegam pela infra da Perplexity** — fere o princípio de
> *soberania de dados* da Kolden. Logo, Sonar é um retriever **opt-in e deliberado**, não o default:
> - Default de busca = fontes soberanas/nativas (Firecrawl self-host, `web_search` do Hermes, motor).
> - Use Sonar quando o ganho de **citação/recência/qualidade** justificar o trade-off de soberania.
> - **Nunca** envie a Sonar termos de busca sensíveis (nomes de clientes, dados internos, estratégia
>   proprietária). Pesquise o mercado, não a Kolden.

## As 4 capacidades (tools do Sonar)

| Capacidade | Modelo Sonar | Quando usar | Saída |
|---|---|---|---|
| **busca** (`search`) | Search API | resultados rankeados crus (título/URL/snippet/data) para uma query | lista de fontes |
| **perguntar** (`ask`) | `sonar-pro` | Q&A conversacional web-grounded com citações | resposta + citações |
| **pesquisar** (`research`) | `sonar-deep-research` | pesquisa profunda multi-fonte, literatura, relatório (streaming SSE) | relatório + citações |
| **raciocinar** (`reason`) | `sonar-reasoning-pro` | comparação/análise passo-a-passo web-grounded | raciocínio + citações |

Detalhe de filtros, parâmetros e modelos: ver `references/sonar.md`.

## Como invocar

Dois caminhos, **nesta ordem de preferência**:

1. **MCP `perplexity`** (quando provisionado no workspace) — chame as tools `perplexity_search`,
   `perplexity_ask`, `perplexity_research`, `perplexity_reason` diretamente.
2. **Como retriever do motor** — quando a chave estiver provisionada, o GPT-Researcher do motor
   aceita Sonar na lista de fontes:

```bash
# pesquisa multi-fonte incluindo Sonar como retriever (opt-in)
python motor/argos-engine.py research --query "<pergunta>" --fontes firecrawl,exa,sonar
```

A credencial (`PERPLEXITY_API_KEY`) é resolvida em runtime via Infisical (`/kolden/argos`),
**nunca** em texto puro — ver `ferramentas.md` e a habilidade `infisical-padrao`.

## Filtros de busca dirigida (compartilhados pelas 4 tools)

- **recência** (`search_recency_filter`): `hour | day | week | month | year` — corta resultados velhos.
- **domínio** (`search_domain_filter`): inclui domínios (`["nytimes.com"]`) ou exclui com prefixo `-`
  (`["-pinterest.com"]`) — foca em fontes citáveis, exclui ruído.
- **tamanho de contexto** (`search_context_size`): `low | medium | high` — quanto de web puxar.

## Técnica: `strip_thinking` (economia de contexto)

Os modelos de raciocínio (`sonar-reasoning-pro`) devolvem blocos `<think>...</think>` antes da
resposta. Para economizar tokens de contexto downstream, **remova-os** antes de repassar a resposta
ao orquestrador ou ao relatório:

```
saida_limpa = regex_remove(resposta, /<think>[\s\S]*?<\/think>/g).trim()
```

## Regras (herdadas do Argos)

1. **REUSE primeiro.** Tente `web_search` (Hermes) e os retrievers soberanos antes de Sonar.
2. **Proveniência obrigatória.** Toda fonte que o Sonar citar entra no relatório **com URL + a data
   da observação** (gate de confiabilidade ARGOS-CL-001). Citação do Sonar não dispensa o
   **cross-check** de ≥2 fontes para número-chave.
3. **Zona verde apenas.** Sonar é busca web pública/legítima — nunca o use para contornar login/ToS;
   isso continua sendo da alçada do `compliance-sentinela`.
4. **Soberania.** Respeite a ressalva acima: opt-in, sem dados sensíveis, default soberano.

---
*Fonte: `perplexityai/modelcontextprotocol@7c89934` (MCP Sonar) — IDs G1–G6 do inventário de absorção;
licença MIT. Reescrito em PT-BR; sem cópia literal. Vendor externo não soberano — uso deliberado.*
