---
name: analise-de-gap-de-conteudo
description: >
  Use para mapear o GAP DE CONTEÚDO contra quem ranqueia e desenhar páginas que capturam
  intenção competitiva — "X vs Y", "alternativas a X", roundup "melhores [categoria]" e
  tabelas comparativas. Cobre os três tipos de gap (tópico/profundidade/qualidade) com
  scoring de prioridade, matriz de features, padrões de keyword competitiva, fórmulas de
  title, schema (Product/SoftwareApplication/ItemList) e diretrizes de justiça/precisão.
  É uma FRENTE NOVA da Ariadne (não estava no esqueleto). Gatilhos: "gap de conteúdo",
  "content gap", "página de comparação", "X vs Y", "versus", "alternativas a", "página de
  alternativas", "melhores ferramentas de", "comparar concorrentes". Copy → Caliope.
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# Análise de Gap de Conteúdo & Páginas de Comparação

Duas frentes acopladas: (1) **achar o gap** entre o que o site cobre e o que quem ranqueia oferece;
(2) **desenhar páginas de intenção competitiva** que preenchem esse gap com conteúdo preciso e
estruturado. Insumos de SERP/concorrência vêm do **Argos**; a copy final é do **Caliope**.

## 1. Os três tipos de gap (e a prioridade)
- **Gap de tópico:** subtemas que os concorrentes não cobrem.
- **Gap de profundidade:** tópicos cobertos, mas rasos.
- **Gap de qualidade:** info desatualizada, sem perspectiva de especialista, formatação ruim.

Pontue cada concorrente real (após filtrar não-concorrentes — ver
`brief-de-conteudo-data-driven/references/dominios-excluidos.md`): Profundidade, Formatação, SEO,
UX (1-10 cada → /40). Prioridade do gap: **`Impacto × Vantagem competitiva / Esforço`**.

## 2. Tipos de página de intenção competitiva
1. **"X vs Y"** — head-to-head; análise feature a feature equilibrada; veredito justificado. Keyword `[A] vs [B]`.
2. **"Alternativas a X"** — lista com resumo + prós/contras + melhor caso de uso por alternativa. Keyword `alternativas a [Produto]`.
3. **Roundup "melhores [categoria]"** — lista curada com critério de ranking explícito. Keyword `melhores ferramentas de [categoria] [ano]`.
4. **Tabela comparativa** — matriz de features com vários produtos em colunas. Keyword `comparação de [categoria]`.

## 3. Matriz de features
```
| Feature        | Seu produto | Concorrente A | Concorrente B |
|----------------|:-----------:|:-------------:|:-------------:|
| Feature 1      | ✅          | ✅            | ❌            |
| Feature 2      | ✅          | ⚠️ Parcial    | ✅            |
| Preço (a partir)| R$ X/mês   | R$ Y/mês      | R$ Z/mês      |
| Plano grátis   | ✅          | ❌            | ✅            |
```
**Precisão do dado:** toda afirmação de feature verificável em fonte pública; preço com "em [data]";
revisar trimestralmente ou quando o concorrente muda; linkar a fonte de cada dado quando possível.

## 4. Keywords de intenção competitiva
| Padrão | Exemplo | Sinal de volume |
|---|---|---|
| `[A] vs [B]` | "Slack vs Teams" | Alto |
| `[A] alternativa` | "alternativas ao Figma" | Alto |
| `melhores ferramentas de [categoria]` | "melhores ferramentas de gestão" | Alto |
| `[A] vs [B] para [caso]` | "AWS vs Azure para startups" | Médio |
| `[A] review [ano]` | "review Monday.com 2026" | Médio |
| `[A] é melhor que [B]` | "Notion é melhor que Confluence" | Médio |

**Fórmulas de title:** X vs Y → `[A] vs [B]: [Diferencial] ([Ano])`; Alternativas → `[N] Melhores
Alternativas ao [A] em [Ano] (Grátis e Pagas)`; Roundup → `[N] Melhores [Categoria] em [Ano],
Comparadas`. **H1:** casa a intenção do title, primária natural, <70 caracteres.

## 5. Schema
- **Product + AggregateRating** (comparações de produto): `name`, `brand`, `aggregateRating`
  (`ratingValue` + `reviewCount`, com `bestRating`/`worstRating`).
- **SoftwareApplication** (software): `applicationCategory`, `operatingSystem`, `offers` (`price`/`priceCurrency`).
- **ItemList** (roundup): `itemListOrder`, `numberOfItems`, `itemListElement` (`ListItem` com `position`/`name`/`url`).
Geração/validação fina → `engenheiro-de-schema`.

## 6. Conversão e confiança (estrutura, não copy)
CTA: resumo + CTA acima da dobra, "Experimente [seu produto]" após a tabela, recomendação final no
rodapé. **Evitar CTA agressivo na seção que descreve o concorrente** (reduz confiança). Prova social:
depoimentos relevantes ao critério, ratings G2/Capterra/Trustpilot com link, casos de migração
("trocou de [concorrente]"). Sinais de confiança: "atualizado em [data]", autor com expertise,
disclosure de metodologia, disclosure da própria afiliação.

## 7. Diretrizes de justiça (inegociáveis)
Precisão (tudo verificável em fonte pública); **sem difamação** (nunca claim falso/enganoso sobre
concorrente); citar fontes; updates oportunos; **declarar qual produto é o seu**; apresentação
equilibrada (reconhecer força do concorrente honestamente); preço com "em [data]"; testar feature do
concorrente quando possível, senão citar a documentação. (Coerente com o VETO anti-black-hat da Ariadne.)

## 8. Links internos
Linkar às próprias páginas de produto/feature a partir das seções; cross-link entre comparações
relacionadas ("A vs B" → "A vs C"); breadcrumb Home > Comparações > [Página]; seção de comparações
relacionadas no rodapé.

## Saída
```
GAP DE CONTEÚDO vs CONCORRENTE
| # | URL concorrente | Nota /40 | Gap (tópico/profundidade/qualidade) | Prioridade (Impacto×Vant./Esforço) |
Página recomendada: [tipo] | keyword primária + secundárias + cauda longa
Estrutura: H1 + outline (mín. 1.500 palavras) + matriz de features + colocação de CTA
Schema: [Product/SoftwareApplication/ItemList] pronto → validar com engenheiro-de-schema
Recomendações: [melhorar comparações existentes / novas oportunidades / schema / conversão]
```

## Handoffs e regras Kolden
- **Argos** (entrada): SERP, volume, concorrência, dados de feature/preço dos concorrentes.
- **Caliope** (saída): a copy persuasiva da comparação (aqui só estrutura/matriz/ângulo).
- **engenheiro-de-schema** (interno): JSON-LD das comparações.
- **Metis** (saída): medir conversão/posição da página — não é desta skill.
- Dado de feature/preço ausente → "não disponível publicamente" na tabela; nunca chutar.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-competitor-pages`, autor
AgriciDaniel; licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
