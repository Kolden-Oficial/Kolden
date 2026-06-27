# Templates de brief por tipo de página

Escolha o template que casa com o tipo de página. Adapte as seções ao negócio e ao cenário
competitivo — nem toda seção se aplica a toda página.

## Página de serviço
**Objetivo:** converter visitante em contato/agendamento.

| Seção | Propósito | Formato |
|---|---|---|
| O que é [serviço] | Definir com clareza | Box de definição, 80-120 palavras |
| Quem precisa | Qualificar o leitor | Lista de cenários |
| Como funciona | Reduzir fricção | Passos numerados |
| Custos/preço | Responder a #1 dúvida | Tabela ou faixa (não exato se variável) |
| Resultados | Provar valor | Stats, trechos de caso, antes/depois |
| Por que [marca] | Diferenciar | 3-5 bullets específicos |
| FAQ | Captar PAA | 5-8 perguntas, 40-60 palavras, FS target |
| CTA | Converter | Ação clara, reduzir risco (consulta grátis) |

**Schema:** Service + FAQPage + LocalBusiness (se local). **Primária:** H1, primeiros 100 palavras, um H2, slug, title.

## Post de blog
**Objetivo:** ranquear query informacional, levar à página de serviço.

| Seção | Propósito | Formato |
|---|---|---|
| Resposta direta | Ganhar Featured Snippet | Resposta-primeiro, 40-60 palavras, FS target |
| Contexto | Situar | 1-2 parágrafos |
| [3-5 subtemas H2] | Profundidade de PAA/gaps | Parágrafos, listas, tabelas |
| Erros comuns | Valor único | Lista numerada explicada |
| FAQ | Cauda longa | 5 perguntas dos gaps |
| CTA ao serviço | Converter intenção | Link contextual, sem hard sell |

**Schema:** Article + FAQPage. **Primária:** H1, primeiros 100 palavras, slug, title, um alt de imagem.

## Estudo de caso
**Objetivo:** confiança, provar resultado real.

| Seção | Propósito | Formato |
|---|---|---|
| Resumo do resultado | Liderar com o ganho | Stat/resultado em negrito na 1ª linha |
| Situação do cliente | Contexto | 1-2 parágrafos (anonimizar se preciso) |
| O desafio | Enquadrar problema | O que estava em jogo |
| Nossa abordagem | Mostrar expertise | Passo a passo ou narrativa |
| O resultado | Provar valor | Números, percentuais, prazos |
| Lições | Insight reusável | 3-5 bullets |
| CTA serviços | Cross-sell | Link à página de serviço |

**Schema:** Article. **Primária:** o resultado/tipo de caso, no H1 e title.

## Página de categoria
**Objetivo:** ranquear termo amplo, funilar para sub-páginas.

| Seção | Propósito | Formato |
|---|---|---|
| O que esta área cobre | Definir escopo | Parágrafo de visão geral |
| Sub-serviços/produtos (linkados) | Hub linking | Um H2/H3 por sub-página com descrição + link |
| Quem atendemos | Qualificar | Lista de personas |
| Visão do processo | Expectativa | Passos numerados |
| FAQ | Variações | 5-8 perguntas |
| CTA | Converter | Próximo passo claro |

**Schema:** Service + BreadcrumbList + FAQPage. **Primária:** nome da categoria, no H1/title/slug/1º parágrafo.
**Regra de estrutura:** DEVE incluir toda sub-página relevante do sitemap.

## Landing page
**Objetivo:** uma ação de conversão, distração mínima.

| Seção | Propósito | Formato |
|---|---|---|
| Hero (oferta + CTA) | Converter acima da dobra | Headline + subheadline + botão |
| Problema | Agitar dor | 2-3 frases |
| Solução/benefícios | Apresentar o fix | 3-5 bullets de benefício |
| Prova social | Confiança | Depoimentos, logos, stats |
| Como funciona | Reduzir fricção | Processo em 3 passos |
| Objeções/FAQ | Remover dúvida | 4-6 objeções respondidas |
| CTA final | Converter | Repetir a oferta |

**Schema:** WebPage + FAQPage. **Primária:** oferta/resultado, no H1/title/subheading do hero.

## Página de FAQ
**Objetivo:** captar PAA e Featured Snippet.

| Seção | Propósito | Formato |
|---|---|---|
| 8-15 perguntas | Agrupadas por subtema | Cada uma 40-60 palavras, FS target |
| CTA após a última | Converter | Próximo passo contextual |

**Schema:** FAQPage (cada Q&A como mainEntity). Nota: o Google aposentou os rich results de FAQ para
todos em 7/mai/2026 — não gera mais rich result na SERP, mas a marcação ainda ajuda resolução de
entidade em AI Mode/AI Overviews (trate como sinal de apoio). Para Q&A genuíno de usuário, use QAPage.
**Primária:** no H1 como "[Tópico]: Perguntas Frequentes" e na 1ª resposta.

## Página de localização
**Objetivo:** ranquear [serviço] + [cidade].

| Seção | Propósito | Formato |
|---|---|---|
| O que fazemos em [cidade] | Relevância local | Visão com cidade natural no texto |
| Áreas/landmarks locais | Sinal hiper-local | Lista de bairros/jurisdições/pontos |
| Áreas de atendimento | Escopo geográfico | Lista ou mapa |
| Por que o local importa | Justificar a página | 1-2 parágrafos de expertise local |
| Time em [cidade] | E-E-A-T | Bios curtas do staff local |
| Reviews locais | Confiança | 2-3 reviews citando o local |
| FAQ | Variações locais | 5 perguntas locais |
| CTA | Converter | Telefone/endereço/agendamento local |

**Schema:** Service + LocalBusiness (endereço, telefone, geo). **Primária:** [Serviço] [Cidade], no
H1/title/slug/1º parágrafo/schema. (Detalhe local → skill `seo-local-e-mapas`.)

## Página "Sobre"
**Objetivo:** confiança, sustentar E-E-A-T do site.

| Seção | Propósito | Formato |
|---|---|---|
| Quem somos | Posicionamento | 2-3 parágrafos |
| História/fundação | Humanizar | Narrativa com data |
| Nosso time | E-E-A-T | Bios com credenciais e foto |
| Valores | Diferenciar | 3-5 valores explicados |
| Prêmios | Autoridade | Lista com datas |
| Menções na mídia | Autoridade | Links de imprensa |
| CTA | Converter | Contato ou serviços |

**Schema:** Organization + Person (por membro). **Primária:** marca ou "[Marca] [setor]", no H1/title.

## Homepage
**Objetivo:** autoridade de marca, funil para serviço e localização.

| Seção | Propósito | Formato |
|---|---|---|
| Hero (proposta + CTA) | Primeira impressão | Headline + subheadline + botão |
| Visão dos serviços | Mostrar escopo | Grade de cards/links às páginas |
| Por que nós | Destacar | 3-5 USPs |
| Prova social | Confiança | Depoimentos, logos, estrelas |
| Localização/área | Relevância local | Mapa ou lista |
| FAQ (para GEO) | Visibilidade em IA | 4-6 perguntas amplas |
| CTA | Converter | Repetir ação primária |

**Schema:** Organization + WebSite + Service. **Primária:** serviço primário + cidade, no H1/title/1º parágrafo.

---
Fonte: `AgriciDaniel/claude-seo@d830cdb` (seo-content-brief/references, MIT). Reescrito em PT-BR, sem cópia literal.
