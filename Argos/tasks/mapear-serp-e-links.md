---
task: mapear-serp-e-links()
responsavel: "@serp-seo-cartografo"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: concorrentes
    tipo: array<string>
    origem: User Input
    obrigatorio: true
  - campo: dominios
    tipo: array<string>
    origem: User Input
    obrigatorio: true
  - campo: nicho
    tipo: string
    origem: User Input
    obrigatorio: false
  - campo: keywords_alvo
    tipo: array<string>
    origem: User Input
    obrigatorio: false

Saida:
  - campo: mapa_serp_e_links
    tipo: yaml
    destino: research-synthesizer
    persistido: false

Checklist:
  - "[ ] SERP coletada por keyword-alvo do nicho com query+geo+idioma+timestamp"
  - "[ ] Footprint digital descoberto (URLs/subdomínios) com cobertura declarada"
  - "[ ] Links deduplicados, normalizados e classificados (interno/externo/social/asset)"
  - "[ ] Sinais de SEO técnico observável lidos sem login (sitemap/robots/URL/meta)"
  - "[ ] Keyword gap e share of search calculados e rotulados como proxy/estimativa quando aplicável"
  - "[ ] Cada dado com FONTE + TIMESTAMP; dado direto separado de dedução"
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/tasks/_indice|_indice]]"
---

# Tarefa: Mapear SERP e Links — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:mapear-serp-e-links`                                  |
| Comando       | `@serp-seo-cartografo map "{concorrentes\|dominios}"`        |
| Responsável   | `serp-seo-cartografo` (secundário: `web-harvester`)          |
| Propósito     | Mapear a presença digital de SEO/SERP dos concorrentes e extrair EXAUSTIVAMENTE os links e propriedades digitais de cada um — cada dado com FONTE + TIMESTAMP, dado direto separado de dedução |

## Entradas

| Entrada         | Origem            | Obrigatório | Descrição                                                  |
|-----------------|-------------------|-------------|------------------------------------------------------------|
| `concorrentes`  | Prompt do usuário | Sim*        | Lista de marcas/concorrentes a mapear                      |
| `dominios`      | Prompt do usuário | Sim*        | Lista de domínios-alvo a mapear                            |
| `nicho`         | Usuário/Sessão    | Não         | Nicho/mercado para ancorar as keywords da SERP             |
| `keywords_alvo` | Usuário/Auto      | Não         | Keywords do nicho para SERP, share of search e keyword gap |
| `geografia`     | Usuário/Auto      | Não         | Recorte geográfico/idioma da SERP (país/região/idioma)     |

\* Pelo menos um entre `concorrentes` e `dominios` é obrigatório. Sem `keywords_alvo`/`nicho`, share of search e keyword gap não têm base — declare a lacuna em vez de inventar.

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Motor vendorizado disponível (`motor/argos-engine.py` — Scrapy para crawl/dedup em escala)
- Credenciais de backend acessíveis via Infisical (`/kolden/argos`) — nunca segredo em texto puro
- Zona da coleta verificada: tudo o que esta task faz é zona VERDE (público, sem login). Qualquer necessidade de autenticação/conta/proxy → PARE e escale ao `compliance-sentinela`

## Fases

### Fase 1: SERP por keyword-alvo (serp-seo-cartografo)

1. Para cada keyword-alvo do nicho, rode `web_search` registrando **query + geografia + idioma + instante**.
2. Para cada SERP, conte presença e posição de cada domínio/concorrente no top N.
3. Rankings são posicionais e voláteis — nunca apresente como permanentes. Registre o timestamp por linha.
4. Se não houver keywords definidas, reporte a lacuna honestamente; não fabrique queries fora do nicho.

### Fase 2: Footprint digital (serp-seo-cartografo + web-harvester)

1. Descoberta rápida de URLs por domínio: `firecrawl_map` e/ou `tavily_map`.
2. Extração exaustiva e deduplicada: crawl estruturado via `motor/argos-engine.py` (Scrapy) a partir de sitemap/links.
3. Descoberta fora do domínio raiz (subdomínios, perfis, LPs em outros TLDs): `web_search_exa` (Exa) / `firecrawl_search`.
4. Declare a **cobertura do crawl**: parcial (amostra) vs exaustivo (sitemap completo deduplicado).
5. Cada propriedade carrega URL + onde-foi-descoberta + timestamp.

### Fase 3: Extração de links (web-harvester)

1. Semente: `sitemap.xml` (+ índices) e `robots.txt` para a lista declarada de URLs.
2. Crawl na profundidade pedida (página / seção / domínio inteiro) seguindo links internos.
3. Normalizar: relativos→absolutos, remover fragmentos/UTM ruidosos, canonicalizar host.
4. Deduplicar após normalização (Scrapy faz dedup de URL nativa em escala).
5. Classificar: **interno** (mesmo eTLD+1) / **externo** / **social** (perfis de rede) / **asset** (img/pdf/js/css/media).
6. Cada link anotado com fonte (página onde apareceu) + timestamp. Respeite robots.txt e rate-limit; em 403/429 aplique backoff.

### Fase 4: SEO técnico observável (serp-seo-cartografo)

1. Leia `/robots.txt` e `/sitemap.xml` diretamente (presença/ausência + regras).
2. Infira a arquitetura de informação pela **estrutura de URL** (padrão de slug/caminho).
3. Extraia **meta tags** das páginas-chave (title/description/canonical/og) via `firecrawl_search` ou Scrapy.
4. Tudo isso é dado direto — registre timestamp. Nada que exija login.

### Fase 5: Keyword gap e share of search (serp-seo-cartografo)

1. **Share of search**: das keywords do nicho, conte em quantas cada domínio aparece no top N → fatia relativa. É **proxy de demanda capturada**, NÃO volume absoluto — rotule assim.
2. **Keyword gap**: cruze as keywords onde o concorrente ranqueia com onde o alvo ranqueia; o delta é o gap. Declare as DUAS listas e a base de comparação.
3. **Volume de busca**: só aparece COM fonte externa citada. Sem fonte, marque `estimativa qualitativa — não confirmada`. NUNCA invente número de ferramenta paga que o squad não possui.
4. Separe visualmente dado direto (SERP vista agora, sitemap real, URL que respondeu) de dedução (volume, autoridade, intenção).

## Formato de Saída

```yaml
mapa_serp_e_links:
  nicho: "{nicho ou 'não especificado'}"
  geografia: "{país/região/idioma ou 'não especificado'}"
  coletado_em: "{timestamp ISO da consolidação}"
  por_concorrente:
    - dominio: "{dominio}"
      propriedades:
        - url: "{url}"
          tipo: "{raiz|subdominio|blog|lp|loja|social|externo}"
          descoberto_via: "{firecrawl_map|tavily_map|scrapy|web_search_exa}"
          timestamp: "{ISO}"
      cobertura_crawl: "{parcial|exaustivo}"
      links_total: {n}
      links_por_tipo:
        interno: {n}
        externo: {n}
        social: {n}
        asset: {n}
      keywords_rankeadas:
        - keyword: "{termo}"
          posicao: {n}
          query: "{query}"
          geo: "{país/idioma}"
          fonte: "web_search"
          timestamp: "{ISO}"
      seo_tecnico:
        sitemap: "{presente|ausente}"
        robots: "{regras observadas}"
        padrao_url: "{descrição}"
      keyword_gap:
        base_comparacao: "{ex.: top 10, N keywords do nicho}"
        termos:
          - keyword: "{termo}"
            concorrente_posicao: {n}
            alvo: "{ausente|posição}"
            volume_busca: "{valor + fonte externa | 'estimativa qualitativa — não confirmada'}"
            fonte: "web_search"
            timestamp: "{ISO}"
      fonte: "{ferramentas usadas}"
      timestamp: "{ISO}"
  share_of_search:
    base: "{N keywords do nicho, top N, data}"
    por_dominio:
      - dominio: "{dominio}"
        keywords_no_top: {n}
        share_proxy_pct: {n}
    nota: "proxy posicional de demanda capturada — NÃO volume absoluto"
    timestamp: "{ISO}"
```

## Regras de Veto

1. **NUNCA entregue link ou propriedade sem deduplicação e sem proveniência** — link sem dedup/fonte é rejeitado.
2. **NUNCA invente volume de busca exato** — número de volume/dificuldade/tráfego só COM fonte externa citada; sem fonte, é `estimativa qualitativa — não confirmada`.
3. **SEMPRE separe dado direto de dedução** — SERP/sitemap/URL que respondeu (direto) versus volume/autoridade/intenção (dedução), visualmente separados.
4. **NUNCA apresente ranking de SERP sem query + geografia + timestamp**, nem como posição permanente.
5. **NUNCA acesse ferramenta de SEO logada / área autenticada / zona ToS-cinza** — HALT e escale ao `compliance-sentinela`.
6. **NUNCA grave chave de backend em texto puro** — só via Infisical (`/kolden/argos`).
7. **NUNCA invente capacidade fora das tools dos agentes** (sem APIs pagas de SEO não listadas).

## Critérios de Conclusão

- [ ] SERP coletada por keyword-alvo com query + geografia + idioma + timestamp por linha
- [ ] Footprint digital descoberto por domínio com cobertura do crawl declarada (parcial/exaustivo)
- [ ] Links extraídos, deduplicados, normalizados e classificados (interno/externo/social/asset) com fonte + timestamp
- [ ] Sinais de SEO técnico observável lidos sem login (sitemap.xml, robots.txt, estrutura de URL, meta tags)
- [ ] Keyword gap (com as duas listas + base) e share of search (rotulado como proxy) calculados
- [ ] Volume de busca só com fonte externa; sem fonte, rotulado como estimativa não confirmada
- [ ] Dado direto separado de dedução em toda a saída
- [ ] Formato de saída corresponde ao schema acima
