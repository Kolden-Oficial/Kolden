---
task: sintetizar-relatorio()
responsavel: "@research-synthesizer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: dossies
    tipo: array
    origem: competitor-mapper
    obrigatorio: false
  - campo: sizing
    tipo: object
    origem: market-sizer
    obrigatorio: false
  - campo: outras_saidas_de_fase
    tipo: array
    origem: serp-seo-cartografo | ads-intel | social-* | web-harvester
    obrigatorio: false
  - campo: nicho
    tipo: string
    origem: argos-chief
    obrigatorio: true

Saida:
  - campo: relatorio
    tipo: string
    destino: Console
    persistido: false
  - campo: metadados
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Cada número-chave triangulado (≥2 fontes independentes) ou marcado 'fonte única — não confirmado'"
  - "[ ] Verificação adversarial aplicada a cada afirmação (tentativa de refutação registrada)"
  - "[ ] Rótulo de confiança atribuído a cada dado (VERIFICADO / FONTE ÚNICA / NÃO CONFIRMADO / OBSOLETO)"
  - "[ ] Checklist ARGOS-CL-001 rodado; nenhum CRÍTICO desmarcado (senão HALT)"
  - "[ ] Relatório montado macro→micro com citação inline em cada dado"
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/tasks/_indice|_indice]]"
---

# Tarefa: Sintetizar Relatório — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:sintetizar-relatorio`                                |
| Comando       | `@argos report "{nicho}"`                                   |
| Orquestrador  | `argos-chief`                                                |
| Responsável   | `research-synthesizer` (dono operacional do gate)           |
| Propósito     | Cruzar todas as fontes (verificação adversarial), aplicar o checklist de confiabilidade ARGOS-CL-001 e montar o RELATÓRIO final macro→micro 100% citado, com rótulo de confiança por dado |

## Entradas

| Entrada               | Origem              | Obrigatório | Descrição                                              |
|-----------------------|---------------------|-------------|--------------------------------------------------------|
| `dossies`             | competitor-mapper   | Não         | Dossiês por concorrente (presença, ângulos, evidências) |
| `sizing`              | market-sizer        | Não         | TAM/SAM/SOM com método (top-down/bottom-up) declarado  |
| `outras_saidas_de_fase`| serp-seo / ads / social-* / web-harvester | Não | Coletas de SEO/links, pago, orgânico por rede |
| `nicho`               | argos-chief         | Sim         | Nicho/concorrentes alvo da pesquisa                    |

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Checklist de confiabilidade disponível (`checklists/output-quality.md` — ARGOS-CL-001)
- Pelo menos uma saída de fase de coleta recebida (sizing, dossiê, SEO, pago ou orgânico) OU autorização do `argos-chief` para pesquisar o tema do zero
- Credenciais de retriever/LLM disponíveis via Infisical (nunca em texto puro)
- Coleta de zona cinza, se houver, já autorizada pelo `compliance-sentinela` e sinalizada nas entradas

## Fases

### Fase 1: Triangulação (research-synthesizer)

1. Para CADA número-chave recebido, rastreie a origem real (primária vs. secundária) e monte a cadeia até a fonte.
2. Exija **≥2 fontes INDEPENDENTES** (origem distinta, não republicação do mesmo estudo) antes de tratar como confiável.
3. Se houver só uma origem rastreável → marque **"fonte única — não confirmado"**.
4. Duas páginas que citam a mesma origem contam como UMA fonte — não infle a contagem.

### Fase 2: Verificação Adversarial

1. Default cético: tente **REFUTAR** cada afirmação antes de aceitá-la — busque ativamente uma fonte que a **contradiga**, não outra que confirme.
2. Use as ferramentas de zona verde para corroboração/refutação:
   - `web_search` (Hermes), `web_search_exa` / `web_fetch_exa`, `firecrawl_search` / `firecrawl_research`
   - skill `deep-research` (harness)
   - `motor/argos-engine.py` (GPT-Researcher) — loop multi-retriever com citação; LLM via OpenRouter, chave via Infisical
3. Verifique se método, amostra, recorte e data sustentam o que se afirma.
4. Registre o resultado da tentativa de refutação para cada afirmação (sobreviveu / caiu).
5. **NÃO** colete zona cinza aqui — qualquer coisa que exija login/scraping autenticado volta ao `compliance-sentinela`.

### Fase 3: Rótulos de Confiança

1. Carimbe cada dado com um rótulo:
   - **VERIFICADO** — ≥2 fontes independentes concordam, com data recente
   - **FONTE ÚNICA** — só uma origem; plausível mas não confirmado
   - **NÃO CONFIRMADO** — sem fonte rastreável, ou refutado por outra fonte; entra só como hipótese rotulada
   - **OBSOLETO** — fonte válida porém antiga; declarar a idade e rebaixar o peso
2. Em conflito entre fontes, **EXPONHA** as duas leituras, a data de cada e o tamanho da divergência — nunca escolha em silêncio.
3. Mantenha **ORGÂNICO** e **PAGO** separados — nunca funda métrica de ads com alcance orgânico.

### Fase 4: Rodar o Gate ARGOS-CL-001

1. Aplique o checklist `checklists/output-quality.md` sobre o entregável, item a item.
2. Marque cada item: `[x]` Aprovado / `[ ]` Reprovado / `[N/A]` Não Aplicável.
3. **Se QUALQUER item CRÍTICO falhar** (ou o GATE INVIOLÁVEL for acionado):
   - **PARE (HALT)** — não entregue.
   - **Devolva à fase de origem** responsável pela proveniência/autorização que falhou.
   - Registre o motivo do HALT na seção de lacunas.
4. Só prossiga para a Fase 5 com todos os CRÍTICOS `[x]`.

### Fase 5: Montar o Relatório (macro → micro)

1. Monte na ordem: sumário executivo → mercado/sizing → panorama competitivo → dossiês por concorrente → orgânico por rede → pago → SEO/links → lacunas e recomendações → anexo de fontes.
2. Toda afirmação leva **citação inline** com fonte + data + timestamp + rótulo: `[Fonte: <origem/URL> — <data do dado> — coletado <timestamp> — <rótulo>]`.
3. Sumário executivo só com o que está **VERIFICADO**.
4. Dados FONTE ÚNICA / NÃO CONFIRMADO / OBSOLETO vão para a seção de lacunas.
5. Regra de ouro: **se uma linha não tem citação inline e rótulo, ela não existe** — volta à origem ou é rebaixada.

## Formato de Saída

```markdown
# Relatório de Inteligência — {nicho/concorrentes} — {data} (Argos)

## 0. Sumário executivo
- 3–7 bullets só com o que está VERIFICADO (cross-check ≥2 fontes), cada um citado e rotulado.

## 1. Mercado / Sizing (MACRO)
- TAM/SAM/SOM do market-sizer, com MÉTODO declarado (top-down / bottom-up).
- Tendências macro e demanda de busca, cada uma citada e rotulada.

## 2. Panorama competitivo (MESO)
- Concorrentes, posicionamento, share de voz. Orgânico e pago em colunas separadas.

## 3. Dossiês por concorrente (MICRO)
- Por concorrente: presença por canal, ângulos, evidências. Cada métrica com [fonte + data + rótulo].

## 4. Orgânico por rede
- Instagram / TikTok / YouTube / LinkedIn / X / Facebook / Reddit (social-*), com timestamp. Marcado ORGÂNICO.

## 5. Pago (anúncios ativos)
- Ad libraries (Meta/Google/TikTok/LinkedIn) via ads-intel. Marcado PAGO.

## 6. SEO / SERP / Links
- Rankings, keywords, backlinks, propriedades digitais (serp-seo-cartografo + web-harvester).

## 7. Lacunas e recomendações
- O que NÃO foi possível verificar (e por quê). Dados FONTE ÚNICA / NÃO CONFIRMADO / OBSOLETO listados aqui.
- Recomendações acionáveis, cada uma amarrada à evidência que a sustenta.

## Anexo A — Cards de fonte
- Para cada dado: [origem/URL | data do dado | timestamp de coleta | método | rótulo de confiança].
- Conflitos entre fontes registrados com as duas leituras e o tamanho da divergência.
```

```yaml
metadados:
  nicho: "{nicho}"
  data: "{YYYY-MM-DD}"
  n_fontes: {total de fontes distintas consultadas}
  n_dados_verificados: {dados com rótulo VERIFICADO}
  n_fonte_unica: {dados com rótulo FONTE ÚNICA}
  n_descartados: {dados removidos por falta de proveniência ou refutados}
  checklist_resultado: "{APROVADO | REVISAR | REPROVADO}"
```

## Regras de Veto

> O `research-synthesizer` é o **dono operacional do gate** — portão final antes da entrega.

1. **NUNCA deixe entrar dado-fato SEM fonte + timestamp** — descarte ou rebaixe a "não confirmado".
2. **NUNCA promova número de FONTE ÚNICA a "verificado"** sem segunda fonte independente.
3. **SEMPRE exponha conflito entre fontes** — as duas leituras + tamanho da divergência; nunca resolva em silêncio.
4. **NUNCA conte duas republicações da mesma origem como duas fontes** independentes.
5. **NUNCA funda métrica de PAGO com alcance ORGÂNICO** na síntese.
6. **Zona cinza não autorizada BLOQUEIA a entrega** — coleta autenticada vai antes ao `compliance-sentinela`; sem autorização registrada, reporte a lacuna e não entregue dado dela.
7. **NUNCA grave segredo em texto puro** — toda credencial via Infisical.
8. **Qualquer CRÍTICO do ARGOS-CL-001 desmarcado = HALT** — devolva à fase de origem; não entregue.

## Critérios de Conclusão

- [ ] Cada número-chave triangulado em ≥2 fontes independentes, ou marcado "fonte única — não confirmado"
- [ ] Verificação adversarial (tentativa de refutação) aplicada e registrada por afirmação
- [ ] Rótulo de confiança (VERIFICADO / FONTE ÚNICA / NÃO CONFIRMADO / OBSOLETO + idade) em cada dado
- [ ] Conflitos entre fontes expostos, não resolvidos silenciosamente
- [ ] Orgânico e pago mantidos em seções separadas
- [ ] Checklist ARGOS-CL-001 rodado; todos os CRÍTICOS `[x]` (senão HALT e devolução à origem)
- [ ] Relatório montado macro→micro com citação inline em cada dado
- [ ] Bloco de metadados preenchido (n_fontes, n_dados_verificados, n_fonte_unica, n_descartados, checklist_resultado)
- [ ] Formato de saída corresponde ao schema acima
