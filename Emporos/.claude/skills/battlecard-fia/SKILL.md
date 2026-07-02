---
name: battlecard-fia
description: >
  Use para MONTAR ou ATUALIZAR o battlecard de um concorrente no formato FIA (Feature / Impact /
  Answer) — a arma do engenheiro-de-pré-vendas para responder objeção "mas eles têm X" sem descer
  para guerra de features. Cobre a matriz por concorrente com 15-20 features-chave, a coluna Impact
  (por que essa feature importa para o outcome do cliente, não recitar spec), a coluna Answer
  (jujitsu — não ataca o concorrente, redireciona para força própria), versionamento trimestral e
  regras de sanitização (nada de fake claim, nada de bash gratuito). Gatilhos: "battlecard",
  "concorrente X tem", "diferencial vs", "como responder objeção de concorrência", "matriz
  competitiva", "vs CompanyA", "comparativo de features". Dono: engenheiro-de-pre-vendas.
---

# Battlecard FIA (Feature / Impact / Answer)

Transforma inteligência competitiva em munição de call. Battlecard sem FIA é lista de features que
o vendedor lê no meio da reunião — perde credibilidade e o deal. Com FIA, o vendedor tem a resposta
pronta para "mas eles têm X" antes da pergunta acontecer.

## 1. Princípio jujitsu — nunca atacar o concorrente

Battlecard de qualidade **não desqualifica** o concorrente. Ataque direto ("eles são ruins em Y")
tem 3 problemas: (a) parece defensivo; (b) queima credibilidade se o comprador já usa; (c) escala
guerra que o comprador não quer participar.

**Jujitsu FIA:** reconhecer a feature do concorrente e redirecionar para uma dimensão em que a nossa
proposta é assimetricamente mais forte. "Eles têm X, e faz sentido para quem prioriza [contexto A].
Se o que importa é [outcome do cliente], o caminho é [nosso diferencial]".

## 2. Anatomia da linha FIA

Cada feature-chave vira uma linha com 3 colunas obrigatórias:

| Coluna | O que vai | Anti-padrão |
|---|---|---|
| **Feature** | Nome curto da capacidade (própria ou do concorrente) | "Módulo X v3.2 com 47 subfunções" (verboso) |
| **Impact** | Por que essa feature importa para o outcome do comprador — em 1 frase de negócio | "Suporta OAuth" (recita spec, não impacto) |
| **Answer** | Como responder objeção "mas eles têm X" — reconhece + redireciona | "Eles não têm de verdade" (mentira ou bash) |

**Regra do Impact:** se a frase de Impact usar a palavra "nossa" ou nome de produto, refazer. Impact
é sobre o cliente, não sobre nós. Ex.: em vez de "nossa integração com Salesforce é nativa", escrever
"reduz em 40% o tempo de setup para times que já vivem no Salesforce (validado com 12 clientes)".

**Regra do Answer:** 2 movimentos — (1) reconhecer o ponto do concorrente sem endossar; (2) trazer
o critério de decisão em que o nosso lado ganha. Nunca uma linha de Answer bate direto na reputação
do concorrente.

## 3. Estrutura do battlecard por concorrente

Um battlecard cobre 1 concorrente. Formato canônico:

1. **Sumário executivo (3 linhas)** — quando ganhamos, quando perdemos, como posicionar.
2. **Perfil do concorrente** — modelo de negócio, foco de ICP, preço-âncora, escala.
3. **Matriz FIA (15-20 linhas)** — features-chave organizadas por categoria (produto, integração,
   pricing, suporte, segurança/compliance, ecossistema).
4. **3 armadilhas comuns** — traps que o concorrente arma na demo (ex.: "eles vão te mostrar
   dashboard bonito, pergunte como fica sob carga real").
5. **3 landmines** — perguntas a plantar cedo no deal que expõem fraqueza estrutural do concorrente
   sem atacá-lo (ex.: "vocês precisam de suporte em fuso BR?" — se o concorrente não tem, aparece
   sozinho depois).
6. **Casos de churn documentados** — clientes que saíram de lá para nós, com razão validada.
7. **Preço-âncora** — faixa observada em deals reais (fonte: Gong/Chorus/G2/relato de rep).

## 4. Versionamento trimestral obrigatório

Battlecard velho é pior que sem battlecard — o vendedor cita coisa desatualizada e perde. Regras:

- **Cabeçalho versionado**: `Battlecard [Concorrente] · vQ3-2026 · fresh até YYYY-MM-DD`
- **Cadência**: refresh completo a cada trimestre; hotfix quando o concorrente anuncia release
  material (novo módulo, mudança de pricing pública, aquisição).
- **Dono nomeado**: 1 engenheiro-de-pré-vendas responsável por concorrente (não comitê).
- **Sunset**: battlecard sem update há 2 trimestres é arquivado até refresh; vendedor não pode citar.

## 5. Fontes de inteligência (sem tornar-se stalker)

- **Loss/won interviews** (Kalungi/Klue playbook): 5-10 min com comprador que optou pelo concorrente
  ou saiu de lá para nós — pergunta focada em critério de decisão real, não em atributo.
- **G2, Gartner Peer Insights, TrustRadius** — reviews públicas com filtro por role e ICP.
- **Job postings** do concorrente — revela roadmap (contratando X = construindo Y).
- **Analyst reports** (quando cobrem a categoria) — para posicionamento vs terceiros.
- **Signal ambient** — release notes públicas, changelog, docs, keynotes.
- **PROIBIDO**: fingir ser cliente para receber demo, scraping de área logada, engenharia social.

## 6. Uso operacional na call

- **Antes**: engenheiro-de-pré-vendas orienta AE em ~5min sobre linhas 1-3 do FIA relevantes ao ICP
  do deal.
- **Durante**: AE tem acesso silencioso ao battlecard (segundo monitor / Gong Assist / doc aberto);
  procura pela palavra que o comprador citou.
- **Depois**: registra no CRM (linha "objecoes-concorrenciais") qual linha FIA foi usada e se
  funcionou — feedback para refresh do próximo trimestre.

## 7. Handoffs

- Deal onde o concorrente entra sem FIA cobrindo → escalar ao `emporos-chief` para hotfix ou nota.
- Sinal de release material do concorrente → notificar `analista-de-pipeline` (impacto no forecast).
- Mudança estrutural que exige repricing / mudança de posicionamento → escalar ao Afrodite (CRO).

## Saída

Formato do `engenheiro-de-pre-vendas`: CONCORRENTE / VERSÃO / SUMÁRIO / MATRIZ-FIA / ARMADILHAS /
LANDMINES / CASOS-CHURN / PREÇO-ÂNCORA / DONO / PRÓXIMA REVISÃO. Anexado à conta e ao deal no GHL;
credenciais de fontes via Infisical.

## Herança histórica

- **Klue** (klue.com) — plataforma de battlecards competitivos SaaS; formatos F/I/A modernizados
  para uso em call em tempo real.
- **Crayon** (crayon.co) — inteligência competitiva contínua e sinal ambiente.
- **Corporate Visions** (Tim Riesterer) — pesquisa acadêmica sobre "why change / why now / why us"
  aplicada a discurso competitivo; princípio jujitsu (não atacar diretamente) tem raízes aqui e em
  Chris Orlob (Gong).

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales, ID G21.
Reescrito sem cópia literal.*
