---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/_origem|_origem]]"
  - "[[Ariadne/CLAUDE|CLAUDE]]"
  - "[[Ariadne/ferramentas|ferramentas]]"
  - "[[Ariadne/instalacao|instalacao]]"
  - "[[Ariadne/prd-de-ia|prd-de-ia]]"
  - "[[Ariadne/roteiro-de-teste|roteiro-de-teste]]"
---

# Ariadne — Squad de Execução de SEO & CRO de Página

Ariadne é o squad de **execução** de SEO e otimização de conversão da Kolden — 8 agentes (1 orquestradora
+ 7 especialistas). Onde o **Argos descobre** (SERP, keywords, concorrência) e o **Caliope escreve** a
copy, a Ariadne **estrutura, otimiza e converte**: o fio que guia o crawler e o usuário pelo labirinto da
página, da busca à conversão.

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `ariadne-chief` | 0 | Orquestradora — tria (SEO técnico/conteúdo/CRO), roteia, QA e handoffs |
| `auditor-tecnico-seo` | 1 | SEO técnico: crawlabilidade, indexação, Core Web Vitals, canonical/hreflang, robots/sitemap |
| `arquiteto-de-site` | 1 | Arquitetura de informação: siloing, clusters tópicos, links internos, estrutura de URL |
| `engenheiro-de-schema` | 1 | Dados estruturados JSON-LD: tipo por página, geração, validação (Rich Results) |
| `estrategista-de-conteudo-seo` | 1 | On-page + SEO programático (em escala, com guarda de qualidade) + E-E-A-T |
| `otimizador-ai-seo` | 1 | AEO/GEO/LLMO: ser citado por LLMs e AI Overviews |
| `analista-de-cro` | 2 | CRO de página: 7 dimensões + biblioteca de experimentos, por hipótese testável |
| `otimizador-de-formulario` | 2 | CRO de formulário: campos, multi-step, erro, abandono |

## Como ativar

```
@ariadne-chief        # Ativa a orquestradora
*diagnose             # Tria a demanda (SEO técnico / conteúdo / CRO) e roteia
*journey              # Jornada completa SEO+CRO (auditar → arquitetar → schema → conteúdo → AI-SEO → CRO)
```

Você também pode ativar um especialista direto: `@ariadne:auditor-tecnico-seo`. A chief é o ponto de
entrada recomendado.

## Matriz de roteamento (resumo)

| Demanda | Primário | Secundário |
|---|---|---|
| Por que não ranqueio / CWV / indexação | auditor-tecnico-seo | arquiteto-de-site |
| Estrutura / links internos / siloing | arquiteto-de-site | estrategista-de-conteudo-seo |
| Schema / dados estruturados | engenheiro-de-schema | auditor-tecnico-seo |
| Conteúdo on-page / em escala | estrategista-de-conteudo-seo | otimizador-ai-seo |
| Aparecer no ChatGPT / AI Overviews | otimizador-ai-seo | estrategista-de-conteudo-seo |
| Página não converte | analista-de-cro | otimizador-de-formulario |
| Formulário não completa | otimizador-de-formulario | analista-de-cro |

(catálogo completo em `data/routing-catalog.yaml`)

## Fronteiras (o que a Ariadne NÃO faz)
- **Não coleta** keywords/SERP/concorrência → consome do **Argos** (handoff de entrada).
- **Não escreve** a copy de venda final → handoff ao **Caliope** (entrega estrutura/briefing).
- **Não instrumenta/lê** estatística de teste → handoff ao **Metis**.
- **Não faz** ASO (App Store Optimization) — fora do escopo da Kolden nesta versão.

## Vetos invioláveis
1. Sem black-hat (cloaking, PBN, keyword-stuffing, conteúdo enganoso, link spam).
2. Recomendação de SEO sempre com a fonte do dado — sem dado, é hipótese rotulada.
3. Toda mudança de CRO de impacto é hipótese testável (o que muda / por quê / como medir).
4. Copy final é handoff ao Caliope.

## Componentes
- **8 agentes** — 1 orquestradora + 7 especialistas
- **8 tarefas** — diagnose, auditar-seo-tecnico, desenhar-arquitetura, implementar-schema, seo-programatico, otimizar-para-ai-search, analise-de-cro, otimizar-formulario
- **1 workflow** — wf-seo-cro (jornada completa)
- **1 checklist** — output-quality (gate ARIADNE-CL-001, maturity ≥7.0)
- **2 arquivos de dados** — routing-catalog, biblioteca-de-experimentos-cro

## Origem
Criado pelo Ritual do Caos (9 fases) a partir da absorção `coreyhaines31/marketingskills@8bfcdff`
(lacuna SEO de execução + CRO de página). Procedência detalhada em `_origem.md`.

## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, ao final de uma sessão com trabalho, aciona a habilidade `ritual-de-encerramento`
— reflete, extrai lições verificadas e grava na memória do squad (`MEMORY.md`). Fonte única:
`C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara automaticamente.
