---
name: qualidade-de-conteudo-eeat
description: >
  Use para AUDITAR a qualidade de uma página/artigo e medir E-E-A-T de forma
  operacional — scorecard por pilar, teste Quem/Como/Por quê do Google, sinais de
  conteúdo IA de baixo valor, densidade de informação e GAP DE CITAÇÃO (claims sem
  fonte). É a camada executável (rubrica + sinais mensuráveis) sob o framework
  `e-e-a-t` do estrategista-de-conteudo-seo. Gatilhos: "qualidade de conteúdo",
  "auditar E-E-A-T", "thin content", "conteúdo merece ranquear?", "isso parece IA?",
  "claim sem fonte", "citation gap", "content audit", "readability". NÃO escreve a
  copy (handoff Caliope); NÃO mede tráfego/posição pós-publicação (handoff Metis).
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# Qualidade de Conteúdo & E-E-A-T (auditoria operacional)

Operacionaliza o pilar E-E-A-T do `estrategista-de-conteudo-seo`: em vez de um
diagnóstico em prosa, produz um **scorecard com rubrica** + sinais mensuráveis. Não
afirma "isto é IA" (modelos modernos passam em qualquer heurística) — surfaceia
**red flags** para decidir reescrever/reforçar. Toda recomendação alimenta o briefing;
a copy final é do **Caliope**.

## 1. Porta de entrada — teste Quem / Como / Por quê

Heurística canônica do Google (guia de conteúdo útil), aplicada ANTES de pontuar pilares:

| Pergunta | O que procurar | Quando é inegociável |
|---|---|---|
| **Quem** criou? | Byline visível, página de autor, credenciais | Sempre que o leitor espera; obrigatório em YMYL |
| **Como** foi criado? | Disclosure de processo (inclusive uso de IA), pesquisa original, vivência de primeira mão | Conteúdo assistido por IA, alegações de experiência |
| **Por quê** existe? | "Ajudar pessoas" vs. "pegar clique"; alerta para entrada em nicho sem expertise, churn por frescor, escrita por meta de palavras | Sempre |

As três respostas fracas = página em risco sob os sinais de "helpful content" (fundidos
no core do Google desde mar/2024; não há mais classificador isolado — a punição é contínua).

## 2. Scorecard E-E-A-T (0-100, 25 por pilar)

| Pilar | Sinais que pontuam |
|---|---|
| **Experiência (0-25)** | Pesquisa original, estudo de caso, antes/depois, dado proprietário, foto/vídeo de uso direto, anedota/processo de primeira mão |
| **Expertise (0-25)** | Credencial/bio do autor relevante, profundidade técnica adequada ao público, claims precisos e com fonte |
| **Autoridade (0-25)** | Citações/links de fontes reconhecidas, menção de marca, reconhecimento no tema, citado por outros especialistas |
| **Confiança (0-25)** | Contato/endereço, política de privacidade/termos, depoimentos/reviews, data + correções transparentes, HTTPS |

Saída: `XX/25` por pilar + "o que falta em cada um" (ex.: sem autor, claim sem fonte,
sem prova de experiência). YMYL (saúde, finanças, jurídico, segurança) eleva o peso de
Expertise e Confiança.

## 3. Cobertura tópica (piso, não meta)

Word count NÃO é fator de ranqueamento direto (confirmado pelo Google). Use os pisos como
**cobertura mínima**, não alvo — 500 palavras que respondem a query batem 2.000 que não:

| Tipo de página | Piso de cobertura |
|---|---|
| Homepage | 500 |
| Página de serviço | 800 |
| Post de blog | 1.500 |
| Página de produto | 300+ (400+ se complexo) |
| Página de localização | 500-600 |

Readability (Flesch 60-70, frase 15-20 palavras, parágrafo 2-4 frases) é **indicador de
acessibilidade**, NÃO fator de ranqueamento (confirmado por Mueller; Yoast despriorizou em v19.3).

## 4. Sinais de conteúdo IA de baixo valor (advisory, QRG jan/2025)

Surfaceie — não veredite. Gatilhos das §4.6 (filler), §4.6.5 (scaled content abuse) e §4.6.6
(MC quase todo copiado/parafraseado/IA) do QRG:

- **Filler:** frases de enchimento, transições genéricas, zero insight original.
- **Padrão IA:** fraseado genérico, estrutura repetida entre páginas, sem atribuição de autor, imprecisão factual. (Catálogo de frases-padrão IA do projeto "AI Cleanup" da Wikipedia, CC BY-SA 4.0.)
- **Baixa densidade de informação:** poucos entidades + números por token. Densidade alta = conteúdo factual ancorado.
- **Repetição:** alto reuso de n-gramas entre seções/páginas.

IA aceitável demonstra E-E-A-T genuíno, valor único, supervisão humana e insight original.

## 5. Gap de citação (claims sem fonte) — fact-check pré-publicação

Extraia **claims verificáveis** e marque os que NÃO têm marcador de citação a ≤200 caracteres.
Tipos de claim a caçar:

| Tipo | Exemplo |
|---|---|
| Estatístico | "47% dos profissionais relatam…" |
| Quantitativo | "200 milhões de usuários", "R$ 3,2 bi de receita" |
| Autoridade | "segundo um estudo de Stanford" |
| Temporal | "em 2025…", "até 2030…" |
| Comparativo | "duas vezes mais eficaz", "3x mais rápido" |

Marcador de citação válido: link próximo `[Fonte](url)`, nota `[^1]`/`[1]`, atribuição inline
("segundo a Gartner"), bloco schema.org `Citation`. Saída: `uncited_ratio` = claims sem fonte /
total. Razão alta em long-form é o mesmo red flag que os raters do QRG usam. É **advisory**: sinaliza
se o autor ancorou cada claim, não se a fonte de fato existe.

## 6. Prontidão para citação em IA (sinais GEO)

Para ser citado por ChatGPT/Perplexity/AI Overviews/AI Mode: afirmações claras e citáveis com
estatística/fato, formatação resposta-primeiro, hierarquia H1→H2→H3 forte, tabelas/listas para dado
comparativo, dado de primeira mão (original), entidades claras (Organization/Person schema).
Detalhe de workflow GEO → especialista `otimizador-ai-seo`.

## Saída

```
QUALIDADE DE CONTEÚDO: XX/100
Quem/Como/Por quê: [forte/fraco por pergunta]
E-E-A-T:  Experiência XX/25 · Expertise XX/25 · Autoridade XX/25 · Confiança XX/25
Sinais IA/filler: [flags + trechos]   Densidade de informação: 0..1
Gap de citação: N claims, M sem fonte (uncited_ratio Y%)
Cobertura: [piso atingido?]  Frescor: [data visível? >12m sem update em tema volátil?]
O QUE FALTA (vai ao briefing → Caliope): [lista priorizada]
```

## Handoffs e regras Kolden
- **Caliope** (saída): materializa os reforços de E-E-A-T na copy final. Aqui só briefing.
- **Metis** (saída): medição de impacto pós-publicação (tráfego/posição) — não é desta skill.
- **otimizador-ai-seo** (interno): workflow GEO/AI Mode aprofundado.
- **estrategista-de-conteudo-seo** (dono): esta skill é a camada executável do framework `e-e-a-t` dele.
- **Sem ferramenta de volume/dificuldade provisionada** → número é hipótese rotulada.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-content`, autor AgriciDaniel;
scripts `content_quality.py`/`content_verify.py`; licença MIT). Catálogo de padrões IA do projeto
"AI Cleanup" da Wikipedia (CC BY-SA 4.0). Reescrito em PT-BR para a Kolden, sem cópia literal.
