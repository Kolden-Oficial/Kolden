---
name: seo-programatico-profundo
description: >
  Use para PLANEJAR ou AUDITAR páginas geradas em escala a partir de fontes de dado
  (location, comparison, integration, glossary, diretório) com os portões de qualidade
  executáveis que evitam thin content e index bloat. Cobre avaliação da fonte de dado,
  engine de template, padrões de URL, automação de links internos, cálculo de unicidade,
  thresholds de quality gate (WARNING/HARD STOP), rollout progressivo, canonical e
  prevenção de index bloat. É a camada operacional (limiares + scorecard) sob o framework
  `seo-programatico-com-guarda-de-qualidade` do estrategista-de-conteudo-seo. Gatilhos:
  "SEO programático", "páginas em escala", "páginas por template", "páginas dinâmicas",
  "SEO orientado a dado", "auditar programmatic". Copy final → Caliope; medição → Metis.
---

# SEO Programático Profundo

Constrói e audita páginas geradas em escala por dados, com **portões de qualidade que param a
geração** antes de virar thin content (gatilho do "scaled content abuse" do Google) ou index bloat.
Opera sob a guarda do `estrategista-de-conteudo-seo` — aqui estão os **limiares numéricos** que
decidem se a página nasce.

## 1. Avaliação da fonte de dado
- **CSV/JSON:** nº de linhas, unicidade de colunas, valores faltantes.
- **API:** estrutura de resposta, frescor, rate limit.
- **Banco:** nº de registros, completude de campo, frequência de update.
- Checks: cada registro precisa de atributos únicos suficientes para gerar conteúdo distinto;
  sinalize registros duplicados/quase-duplicados (>80% de overlap de campo); dado velho = página velha.

## 2. Engine de template
- **Pontos de injeção:** title, H1, seções do corpo, meta, schema.
- **Blocos:** estáticos (compartilhados) vs. dinâmicos (únicos por página).
- **Lógica condicional:** mostrar/ocultar seção pela disponibilidade do dado.
- **Conteúdo suplementar:** itens relacionados, dicas contextuais, UGC.
- Checklist: cada página lê como recurso autônomo e valioso; **zero "mad-libs"** (só trocar
  cidade/produto em texto idêntico); seções dinâmicas adicionam informação real, não variação de keyword.

## 3. Padrões de URL
Comuns: `/ferramentas/[nome]`, `/[cidade]/[serviço]`, `/integracoes/[plataforma]`, `/glossario/[termo]`,
`/modelos/[nome]`. Regras: slug minúsculo e hifenizado derivado do dado; hierarquia lógica; unicidade
forçada na geração; <100 caracteres; sem query param em URL de conteúdo primário; trailing slash
consistente com o site. **Subpasta consolida autoridade — nunca subdomínio.**

## 4. Automação de links internos
Modelo hub/spoke (hub de categoria → páginas individuais); 3-5 relacionadas auto-linkadas por atributo;
BreadcrumbList gerado da hierarquia da URL; cross-link entre páginas que compartilham atributo (mesma
categoria/cidade/feature); âncora descritiva e variada (sem exact-match repetido); densidade 3-5 links
internos por 1.000 palavras.

## 5. Portões de qualidade contra thin content (o coração)

| Métrica | Limiar | Ação |
|---|---|---|
| Páginas sem revisão de conteúdo | 100+ | WARNING: exigir auditoria antes de publicar |
| Páginas sem justificativa | 500+ | HARD STOP: exigir aprovação humana explícita + auditoria de thin content |
| Conteúdo único por página | <40% | Sinalizar thin content (risco de penalização) |
| <30% único | — | HARD STOP recomendado (risco de scaled content abuse) |
| Palavras por página | <300 | Sinalizar para revisão (pode faltar valor) |

**Cálculo de unicidade:** `% único = palavras exclusivas da página / total de palavras × 100`. Medir
contra TODAS as outras páginas do conjunto. Header/footer/nav compartilhados são EXCLUÍDOS; texto
boilerplate de template É incluído.

**Enforcement scaled content abuse (2025-2026):** política de mar/2024, com escalada de ações manuais
em jun/2025 e detecção reforçada de padrão pelo SpamBrain em ago/2025 (Google reportou -45% de conteúdo
de baixa qualidade). Regras reforçadas: diferenciação ≥30-40% de conteúdo genuinamente único entre
quaisquer duas páginas; revisão humana de 5-10% de amostra; **rollout progressivo** em lotes de 50-100
páginas, monitorando indexação/ranking por 2-4 semanas antes de expandir (nunca 500+ de uma vez);
**teste de valor autônomo:** "esta página valeria a pena mesmo se nenhuma outra similar existisse?".
**Site reputation abuse:** publicar programmatic sob domínio de alta autoridade de terceiro (não o seu)
pode acionar penalização — Google passou a aplicar agressivamente desde nov/2024.

## 6. Páginas seguras vs. risco
**OK em escala:** integrações (com docs/API/screenshots reais), templates/ferramentas (com download e
instruções), glossário (definições 200+ palavras com exemplos), produto (specs/reviews/comparação
únicos), dado (estatística/gráfico/análise únicos por registro).
**Risco:** localização só com cidade trocada; "melhor [X] para [setor]" sem valor de setor;
"[concorrente] alternativa" sem comparação real; páginas IA sem revisão humana e valor; >60% boilerplate.

## 7. Canonical e index bloat
Canonical: toda página com self-referencing; variações de parâmetro (sort/filter/paginação) canonical à
base; série paginada → canonical à página 1 ou rel=next/prev; se overlap com página manual, a manual é
canônica. Index bloat: noindex em páginas abaixo do gate; noindex em paginação >página 1; noindex em
navegação facetada (canonical à categoria base); para >10k páginas, monitorar crawl stats no GSC;
consolidar registros com dado insuficiente em páginas agregadas; auditoria mensal de indexadas vs. previstas.

## 8. Sitemap
Auto-gerar entradas; split a 50.000 URLs por arquivo (limite do protocolo); sitemap index se múltiplos
arquivos; `<lastmod>` = timestamp real do dado (não da geração); excluir páginas noindex; registrar no
robots.txt; atualizar dinamicamente conforme novos registros entram.

## Saída
```
SEO PROGRAMÁTICO: XX/100
| Categoria | Status | Nota |  (Qualidade do dado · Unicidade do template · URL · Links internos · Risco thin · Gestão de índice)
Veredito do gate: [quantas páginas nascem / quantas barradas/noindex + limiar acionado]
Issues: Crítico → Alto → Médio → Baixo
Recomendações: [dado / template / URL / conformidade do gate]
```

## Handoffs e regras Kolden
- **Argos** (entrada): demanda agregada/volume por combinação. Sem ferramenta → hipótese.
- **Caliope** (saída): copy persuasiva das páginas que passam no gate.
- **Metis** (saída): monitorar indexação/ranking no rollout — medição não é desta skill.
- **engenheiro-de-schema** / **arquiteto-de-site** (internos): schema e arquitetura hub/spoke.
- **estrategista-de-conteudo-seo** (dono): esta skill operacionaliza o framework de guarda dele.
- **VETO:** páginas sem valor único por página NÃO nascem (ou recebem noindex). Melhor 100 boas que 10.000 ocas.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-programmatic`, autor AgriciDaniel;
licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
