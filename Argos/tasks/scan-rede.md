---
task: scan_rede()
responsavel: "@social-*"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: rede
    tipo: enum
    origem: User Input
    obrigatorio: true
  - campo: alvo
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: profundidade
    tipo: enum
    origem: User Input
    obrigatorio: false

Saida:
  - campo: scan
    tipo: yaml
    destino: Console
    persistido: false

Checklist:
  - "[ ] Rede e alvo validados; profundidade definida"
  - "[ ] Perfil(is) descoberto(s) na via legítima da rede"
  - "[ ] Métricas observáveis coletadas; estimativas rotuladas; privadas declaradas inacessíveis"
  - "[ ] Decisão de zona cinza tomada (escalado ao compliance-sentinela se aplicável)"
  - "[ ] Parte paga marcada para o ads-intel (não coletada aqui)"
  - "[ ] Cada dado-fato com FONTE + TIMESTAMP"
---

# Tarefa: Escanear Rede — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:scan-rede`                                           |
| Comando       | `@social-{rede} scan "{alvo}" --profundidade {profundidade}` |
| Orquestrador  | qualquer `@social-*` (parametrizada pela rede)              |
| Propósito     | Escanear a presença ORGÂNICA de um alvo (concorrente/nicho) numa rede social específica — perfil, frequência, engajamento, top posts, tendências — com FONTE + TIMESTAMP por dado, na ZONA VERDE por padrão |

## Entradas

| Entrada        | Origem            | Obrigatório | Descrição                                                       |
|----------------|-------------------|-------------|-----------------------------------------------------------------|
| `rede`         | Prompt do usuário | Sim         | `instagram \| tiktok \| youtube \| linkedin \| x \| facebook \| reddit` |
| `alvo`         | Prompt do usuário | Sim         | Perfil/empresa/nicho a escanear                                 |
| `profundidade` | Usuário/Auto      | Não         | `perfil \| perfil+posts \| tendências` (default: `perfil+posts`) |
| `geografia`    | Usuário/Auto      | Não         | Recorte geográfico (país/região/idioma)                         |

## Pré-condições

- A `rede` corresponde a um especialista `social-{rede}` existente em `agents/`
- O especialista conhece a via legítima da SUA rede (API oficial quando existe; senão página pública)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Segredos (quando a API exigir) buscáveis via Infisical (`/kolden/argos`)

## Fases

### Fase 1: Descobrir o(s) perfil(is) (social-{rede})

1. Receba `rede` + `alvo` + `profundidade`.
2. Use `web_search` para localizar o(s) `@perfil(is)`/canal(is)/página(s) oficiais do alvo na `rede`.
3. Quando o alvo é um NICHO (não um perfil único): semeie por hashtag/tema e colha os perfis recorrentes.
4. Confirme que o perfil é o correto (handle, nome, verificação, coerência da bio/conteúdo) antes de coletar.

### Fase 2: Coletar na via legítima da rede (social-{rede})

Cada `social-*` conhece a via legítima da SUA rede. Aplique REUSE primeiro (API oficial > página pública):

| Rede       | Via legítima preferida                                                        |
|------------|------------------------------------------------------------------------------|
| youtube    | YouTube Data API (oficial)                                                    |
| reddit     | Reddit JSON público (`.json` de subreddit/post)                              |
| x          | `x_search` (busca de posts públicos)                                          |
| instagram  | página pública via `browser_*` / `web_extract` / `firecrawl_scrape`           |
| tiktok     | página pública via `browser_*` / `web_extract` / `firecrawl_scrape`           |
| linkedin   | página pública via `browser_*` / `web_extract` / `firecrawl_scrape`           |
| facebook   | página pública via `browser_*` / `web_extract` / `firecrawl_scrape`           |

- Quando existe API oficial → use-a. Senão, leia a PÁGINA PÚBLICA (sem login).
- Use `vision_analyze` para ler texto em criativos/thumbnails quando útil.

### Fase 3: Medir o que é observável (social-{rede})

1. **Fatos observáveis**: seguidores/inscritos, nº de posts, frequência (derivada das datas), mix de formatos, interações públicas (curtidas/comentários/views quando exibidos).
2. **Estimativas** (sempre rotuladas): taxa de engajamento ESTIMADA = (interações / seguidores) com base só no público; performance relativa entre posts.
3. **Top posts**: os de maior tração visível, cada um com fonte + interações.
4. **Inacessíveis**: alcance, impressões, salvamentos ocultos, métricas privadas → declarar como inacessíveis, NUNCA preencher com chute.

### Fase 4: Decidir sobre Zona Cinza (compliance)

1. Se toda a coleta foi feita por API oficial ou dado público sem login → modo **VERDE**, prossiga.
2. Se a coleta exigir **login/scraping autenticado / contorno de anti-bot / coleta em massa** →
   **PARE**: escale ANTES ao `compliance-sentinela` para autorização humana explícita + conta/proxy descartável.
   Sem autorização registrada, reporte a lacuna honestamente — não contorne.

### Fase 5: Marcar o pago para o ads-intel (handoff)

1. Se detectar conteúdo patrocinado/anúncio durante o scan, NÃO o trate como métrica orgânica.
2. Registre o sinal e faça **handoff ao `ads-intel`** (ad library da plataforma). A parte PAGA não se coleta aqui.

## Formato de Saída

```yaml
scan:
  rede: "{instagram|tiktok|youtube|linkedin|x|facebook|reddit}"
  alvo: "{perfil/empresa/nicho}"
  profundidade: "{perfil|perfil+posts|tendências}"
  perfil:
    seguidores: "{nº público ou 'não exibido'}"
    frequencia: "{posts por semana — derivada das datas}"
    bio: "{proposta/CTA/posicionamento observado}"
    link: "{link na bio/sobre ou 'não exibido'}"
  engajamento_estimado: "{% — ESTIMATIVA com base só no público}"
  top_posts:
    - url: "{fonte do post}"
      formato: "{Reels|vídeo|carrossel|texto|...}"
      interacoes: "{curtidas/comentários/views públicos}"
      timestamp_post: "{data do post quando visível}"
  tendencias:
    - "{padrão/gancho/hashtag/tema recorrente ancorado em evidência}"
  fonte: "{URL(s) da via legítima usada}"
  timestamp: "{ISO 8601 da coleta}"
  modo: "{verde|cinza}"
  zona_cinza_autorizada: {true|false}
```

## Regras de Veto

1. **NUNCA entregue dado-fato sem FONTE ao vivo + TIMESTAMP** — sem isso, o dado é rejeitado.
2. **NUNCA invente métricas privadas** (alcance/impressões) — se não são acessíveis de fora, declare inacessível.
3. **NUNCA apresente engajamento como número fechado** — sempre rotule como ESTIMATIVA a partir do público.
4. **NUNCA entre na zona cinza sem autorização** do `compliance-sentinela` (login/scraping autenticado faz HALT).
5. **NUNCA misture pago com orgânico** — anúncio detectado vira handoff ao `ads-intel`, nunca métrica orgânica.
6. **NUNCA use ferramenta fora da lista do especialista** nem invente API/recurso — reporte o limite ao argos-chief.

## Critérios de Conclusão

- [ ] `rede` validada contra um especialista `social-{rede}` existente; `alvo` e `profundidade` definidos
- [ ] Perfil(is) descoberto(s) e confirmado(s) via `web_search`
- [ ] Coleta feita na via legítima da rede (API oficial quando existe; senão página pública)
- [ ] Fatos observáveis coletados; estimativas rotuladas; métricas privadas declaradas inacessíveis
- [ ] Top posts e tendências ancorados em evidência, cada item com fonte
- [ ] Decisão de zona cinza tomada ANTES de coletar (escalado ao compliance-sentinela se aplicável)
- [ ] Parte paga marcada como handoff ao ads-intel (não coletada aqui)
- [ ] Formato de saída corresponde ao schema acima (com `modo` e `zona_cinza_autorizada`)
```
