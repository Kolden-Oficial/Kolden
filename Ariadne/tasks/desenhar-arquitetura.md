---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/tasks/_indice|_indice]]"
---

# Tarefa: Desenhar Arquitetura de Site

**ID:** ARIADNE-003 · **Versão:** 1.0.0 · **Comando:** `*architecture` · **Agente:** arquiteto-de-site
**Objetivo:** desenhar a arquitetura de informação (siloing, clusters, links internos) baseada em crawl real.

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| dominio | Sim | Site a estruturar |
| objetivo | Sim | Ranquear cluster X / corrigir órfãs / replanejar URLs |
| keywords/clusters | Não | Via handoff de entrada do **Argos** (não inventar) |

## Pré-condições
- Crawl/mapa real do site disponível (firecrawl_map / Scrapy via auditor) — sem crawl, arquitetura é hipótese.

## Fases
1. **Mapear o território** (firecrawl_map, Exa) — URLs, subdomínios, profundidade de clique atual.
2. **Definir silos/clusters** por tópico (hub-and-spoke), ancorados nos clusters de keyword do Argos.
3. **Plano de links internos** — distribuir autoridade aos pilares; resolver páginas órfãs; âncoras descritivas.
4. **Estrutura de URL** — padrão plano, slugs descritivos; toda mudança de URL com **plano de 301** (handoff auditor-tecnico-seo).
5. **Priorizar** por impacto × esforço.

## Saída (exemplo)
```
ARQUITETURA: site.com.br | 2026-06-26
Silos: /guias/* (hub) → 12 spokes | órfãs encontradas: 7 (lista) | profundidade: home→produto = 4 cliques (reduzir p/ ≤3)
Plano de links internos: hub /guias linka 12 spokes; spokes cruzam 2-3 irmãos | 301: /antigo→/novo (3 URLs)
```

## Vetos
- Sem link spam interno artificial; arquitetura com base em crawl real (sem dado = hipótese); keywords vêm do Argos; mudança de URL sempre com 301; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] Silos/clusters definidos · [ ] Links internos planejados · [ ] Órfãs resolvidas · [ ] 301 para mudanças de URL · [ ] Priorizado
