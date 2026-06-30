---
name: mapeamento-de-jornada-com-pain-points
description: |
  Use quando precisar visualizar a jornada cliente do gatilho ao advocacy (não só fluxo de produto),
  identificar pain points por etapa, marcar moments of truth, e gerar oportunidades para validação.
  Distinto de user flow (Harmonia UX, dentro do produto), sales funnel (Pluto/Emporos, lado empresa)
  e service blueprint (adiciona backstage). Exige dados — não inventar etapas.
domain: discovery-and-validation
subdomain: journey-mapping
agente_primario: [tony-ulwick]
heranca_historica: [don-norman, kim-goodwin, jan-carlzon-moments-of-truth]
tags: [journey-mapping, jtbd, pain-points, moments-of-truth, jornada]
cross_links:
  - aletheia/roteiro-de-entrevista
  - aletheia/sintese-de-feedback-multi-canal
  - aletheia/priorizacao-rice
  - harmonia (UX flow handoff)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G9)
---

# Mapeamento de Jornada com Pain Points

Especialista primário: `tony-ulwick` (JTBD / ODI — Outcome-Driven Innovation).
Herança histórica: Don Norman, Kim Goodwin, Jan Carlzon (Moments of Truth).

## O que é

Visualização das **etapas que um cliente percorre para atingir um outcome** — do gatilho
(consciência do problema) até a evidência de sucesso pós-uso. Cada etapa carrega: **ação, ponto
de contato, emoção, dor, oportunidade**. A jornada é a perspectiva DO CLIENTE no tempo, antes,
durante e depois do produto.

## Não confundir com

- **User flow / fluxo de produto** (Harmonia/UX) — esse vive DENTRO do produto. Jornada INCLUI
  antes (gatilho, descoberta) e depois (uso recorrente, advocacy).
- **Sales funnel** (Pluto/Emporos) — esse é a perspectiva da EMPRESA convertendo lead em receita.
  Jornada é a perspectiva do CLIENTE atingindo um outcome.
- **Service blueprint** — esse adiciona o **backstage** (processos internos, handoffs entre times).
  Jornada foca no **frontstage** (o que o cliente vê e sente).

## Estrutura padrão (5 colunas, 8 etapas)

| Etapa | Ação do cliente | Ponto de contato | Emoção | Dor / Oportunidade |
|---|---|---|---|---|
| Descoberta do problema | Reconhece dor | Conteúdo orgânico, conversa | Frustração, curiosidade | Vocabulário próprio sem solução |
| Busca de solução | Pesquisa | Google, comunidade, recomendação | Esperança, ceticismo | Excesso de opções |
| Avaliação | Testa alternativas | Trial, demo, review | Confusão, comparação fadigante | Falta de critério claro |
| Decisão | Compra / adota | Sales, checkout | Ansiedade, alívio | Atrito de pagamento |
| Onboarding | Configura | Setup, primeira sessão | Esforço, aha-moment | Time-to-value alto |
| Uso recorrente | Integra na rotina | Produto core | Familiaridade, ou frustração latente | Limites do produto |
| Expansão | Aprofunda uso | Features avançadas | Confiança, dependência | Descoberta limitada |
| Advocacy | Recomenda | Social, indicação | Orgulho | Falta de mecanismo |

## Método (5 passos)

**1. Definir o personagem e o outcome**
- **1 jornada = 1 persona + 1 outcome.** Não tente cobrir tudo num mapa só.
- Outcome em **linguagem do cliente** (JTBD): *"quando [situação], eu quero [motivação], para que
  [resultado esperado]"*.

**2. Coletar dados, não imaginar**
- Entrevistas (skill `roteiro-de-entrevista`) — pelo menos **5 em profundidade**.
- Observação direta quando possível.
- Análise de logs / heatmap quando o produto já existe.
- **Não invente etapas.** Ausência de dado = lacuna explícita para validar, não para preencher
  com palpite.

**3. Plotar etapas em forma cronológica**
- Ferramenta visual (Miro, FigJam) ou markdown estruturado.
- Cada etapa carrega: ação, ponto de contato, **tempo médio**, emoção, dor.

**4. Identificar pain points e oportunidades**
- **Pain point:** atrito específico **verbalizado** pelo cliente ou observado.
- **Oportunidade:** lacuna entre o que o cliente quer e o que existe (handoff para
  `mapa-de-assuncoes` ou `desenho-de-experimento`).
- **Severidade:** alta (abandona) / média (reclama) / baixa (tolera com queixa).

**5. Priorizar pelo "moment of truth"**
- Etapas críticas onde **uma única falha quebra a jornada inteira** (moments of truth — Jan
  Carlzon).
- Esforço de melhoria **concentrado em poucos pontos** > diluído em muitos.

## Variações úteis

- **As-is vs. To-be** — jornada atual vs. ideal.
- **Multi-persona** — mesma jornada vista por usuário, comprador e decisor.
- **Multi-channel** — omnichannel mapping (web, mobile, físico, suporte).
- **Service blueprint** — adicionar backstage para handoff a operações.

## Anti-padrões

- Jornada inventada sem entrevista (workshop de "achismo").
- 1 jornada para todos (perda de especificidade).
- Etapas como *"ele clica no botão X"* (isso é granularidade de fluxo, não de jornada).
- Emoção genérica (*"feliz / triste"*) — use **vocabulário rico do cliente**.
- Mapa sem decisão (vira pôster de parede, não input para roadmap).
- Ignorar pré e pós-produto (jornada só dentro = perde alavancas reais — descoberta e advocacy).

## Herança histórica

- **Don Norman** (*The Design of Everyday Things*) — experiência como sistema.
- **Kim Goodwin** (*Designing for the Digital Age*) — journey mapping operacional.
- **Tony Ulwick** (Jobs-to-Be-Done / ODI) — outcome-driven; jornada como **sequência de jobs**.
- **Jan Carlzon** (*Moments of Truth*) — momentos críticos como alavanca de experiência.

## Cross-links

- **Aletheia:** `roteiro-de-entrevista` (coleta de dados), `sintese-de-feedback-multi-canal`
  (input cross-canal), `priorizacao-rice` (priorização das oportunidades).
- **Harmonia (UX):** flow dentro do produto — handoff downstream.
- **Pheme (social):** etapa de descoberta e advocacy.
- **Pluto / Emporos (sales):** etapa de decisão e onboarding.
- **Hestia (CS):** etapa de uso recorrente e expansão.

## Handoff para o squad

`aletheia-chief` → `tony-ulwick` (JTBD/ODI lidera) → produz:
1. **Matriz de jornada** (5 colunas × 8 etapas, ou variante adequada).
2. **Lista de pain points priorizados** por severidade × frequência.
3. **3-5 oportunidades** carimbadas para `mapa-de-assuncoes` (virar hipóteses falsificáveis).

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G9, MIT)._
