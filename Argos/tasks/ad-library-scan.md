---
task: ad-library-scan()
responsavel: "@ads-intel"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: concorrentes
    tipo: array
    origem: User Input
    obrigatorio: true

Saida:
  - campo: ad_library_scan
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Anunciante localizado em cada ad library com a página correta confirmada"
  - "[ ] Cards de anúncio extraídos (copy, formato, CTA, data de início)"
  - "[ ] Criativos lidos via vision_analyze (descrição + gancho)"
  - "[ ] Longevidade calculada e rotulada como inferência"
  - "[ ] Ângulos/ganchos mapeados por criativo"
  - "[ ] Cada anúncio com plataforma + fonte (URL) + timestamp"
---

# Tarefa: Varrer Ad Libraries — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:ad-library-scan`                                     |
| Comando       | `@ads-intel scan-ads "{concorrentes}"`                     |
| Orquestrador  | `argos-chief`                                                |
| Propósito     | Coletar os anúncios PAGOS ATIVOS de um concorrente nas ad libraries públicas (Meta Ad Library, Google Ads Transparency Center, TikTok Creative Center, LinkedIn Ad Library) — criativos, datas, ângulos — com FONTE (URL da library) + TIMESTAMP em cada peça |

## Entradas

| Entrada         | Origem            | Obrigatório | Descrição                                          |
|-----------------|-------------------|-------------|----------------------------------------------------|
| `concorrentes`  | Prompt do usuário | Sim         | Lista de concorrentes ou marcas a varrer (`concorrentes[]` / `marcas[]`) |
| `plataformas`   | Usuário/Auto      | Não         | Ad libraries a cobrir; default: todas as 4 (Meta, Google, TikTok, LinkedIn) |
| `nicho`         | Usuário/Auto      | Não         | Nicho/segmento — ajuda a desambiguar homônimos e a interpretar ângulos |
| `geografia`     | Usuário/Auto      | Não         | Recorte geográfico (país/região/idioma)            |

## Pré-condições

- Definição do `ads-intel` carregada (`agents/ads-intel.md`)
- Acesso de navegação às ad libraries públicas (zona verde, sem login)
- `motor/argos-engine.py` disponível para fallback Skyvern quando o DOM da library for hostil
- Segredos de backend (Firecrawl/LLM do Skyvern), se exigidos, disponíveis via Infisical

## Fases

### Fase 1: Localizar o anunciante (ads-intel)

1. Para cada concorrente/marca e cada ad library da lista de plataformas:
   - `browser_navigate` até a ad library oficial
   - Buscar pelo nome da marca
   - **Confirmar a página correta do anunciante** — homônimos são comuns; usar `nicho`/`geografia` para desambiguar
2. Se o anunciante não existir na library, registrar **ausência** (sinal de canal não usado), não inventar dados.

### Fase 2: Extrair os cards de anúncio

1. `browser_scroll` para disparar o lazy-load / scroll infinito; `browser_snapshot` para fixar o estado.
2. Extrair os cards renderizados via `web_extract` ou `firecrawl_scrape`:
   - copy/texto, formato (imagem/vídeo/carrossel), CTA, página de destino (URL), data de início observada, status (ativo/inativo)

### Fase 3: Ler os criativos (vision_analyze)

1. `vision_analyze` em cada imagem / thumbnail de vídeo do anúncio.
2. Descrever: cena, oferta visível, texto sobreposto, tom — e o **gancho** que a peça ataca.

### Fase 4: Fallback Skyvern (DOM hostil)

1. Se a library mudou de layout e o seletor quebrou (`web_extract`/`firecrawl_scrape` falham),
   cair para **Skyvern** via `motor/argos-engine.py` — automação por visão, robusta a mudança de DOM.
2. Registrar que a coleta usou Skyvern (proveniência da técnica).

### Fase 5: Inferir longevidade (proxy de performance)

1. Para cada anúncio: calcular da **data de início observada** até a **data da coleta**.
2. Ordenar por duração — os mais longevos no topo.
3. **Rotular como inferência**: longevidade é proxy público de performance; ad libraries NÃO dão spend/alcance/conversão.

### Fase 6: Mapear ângulos/ganchos

1. Classificar, por criativo, qual dor/promessa/gancho ataca (preço, prova social, medo, status, urgência, novidade...).
2. Agregar em tabela ângulo × frequência — revela a tese de copy/oferta paga do concorrente.

## Formato de Saída

```yaml
ad_library_scan:
  coleta_timestamp: "{YYYY-MM-DD HH:MM TZ}"
  geografia: "{país/região/idioma ou 'não especificado'}"
  trilha: "PAGO"
  aviso: "longevidade = inferência (sem dado de spend/alcance/conversão); nada aqui é orgânico"
  por_concorrente:
    - concorrente: "{marca}"
      plataforma: "{Meta|Google|TikTok|LinkedIn}"
      anuncios_ativos_n: {inteiro}
      criativos:
        - copy: "{texto do anúncio}"
          formato: "{imagem|vídeo|carrossel|search/texto}"
          cta: "{CTA ou '—'}"
          data_inicio: "{YYYY-MM-DD observada na library}"
          longevidade_dias: {inteiro}  # inferência — proxy de performance
          angulo: "{prova social|preço|urgência|status|medo|novidade|...}"
          fonte_url: "{URL da library para esta peça}"
          timestamp: "{YYYY-MM-DD HH:MM TZ da coleta}"
  mapa_de_angulos: { "{ângulo}": {frequência} }
  cobertura_multiplataforma:
    presente_em: ["{plataformas}"]
    ausente_em: ["{plataformas}"]
```

## Regras de Veto

1. **'Anúncio ativo' sem URL/print da library é REJEITADO** — toda peça carrega fonte (URL da library) + timestamp da coleta.
2. **Longevidade/performance é INFERÊNCIA** — ad libraries não dão spend/alcance/resultado; sempre rotular e datar, nunca apresentar como métrica.
3. **NUNCA misture pago com orgânico** — orgânico é dos `social-*`; devolva ao Argos Chief se pedirem orgânico.
4. **NUNCA faça scraping autenticado / login** — só ad libraries públicas (zona verde); zona cinza só via `compliance-sentinela`.
5. **NUNCA invente ferramenta ou fonte** fora das listadas; segredos só via Infisical, nunca em texto puro.
6. **NUNCA execute trabalho de execução** (subir campanha, escrever copy, criar oferta) — isso é handoff para Peitho/Caliope/Pluto via Argos Chief.

## Critérios de Conclusão

- [ ] Anunciante localizado em cada ad library, com a página correta confirmada (ou ausência registrada)
- [ ] Cards de anúncio extraídos (copy, formato, CTA, página de destino, data de início, status)
- [ ] Criativos lidos via `vision_analyze` (descrição + gancho), não apenas listados por ID/URL
- [ ] Longevidade calculada da data de início à coleta e rotulada como inferência
- [ ] Ângulos/ganchos mapeados e agregados em tabela ângulo × frequência
- [ ] Cobertura multi-plataforma cruzada (presente / ausente)
- [ ] Cada anúncio com plataforma + fonte (URL) + timestamp; formato de saída corresponde ao schema acima
