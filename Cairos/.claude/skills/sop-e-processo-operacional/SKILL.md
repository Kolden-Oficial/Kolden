---
name: sop-e-processo-operacional
description: |
  Use quando precisar criar/documentar/auditar SOP (Standard Operating Procedure) ou processo
  recorrente. Estrutura canônica: Objetivo+Escopo, Atores+RACI, Pré-requisitos (sempre Infisical para
  credencial), Passos com gate por passo (verificação binária antes de avançar), Saídas+Critério de
  feito, Versionamento. **Fronteira:** SOP define O PASSO; métrica operacional contínua é Metis.
  Recrutamento/cultura é Hestia.
domain: project-management
subdomain: processo-operacional
agente_primario: [gerente-de-projeto]
tags: [sop, processo, padronizacao, raci, gate-de-qualidade, recorrente]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G5, G15)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
tipo: skill
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

<!--
Atribuição upstream:
- Padrões e inspiração: msitarzewski/agency-agents @ commit a597cb6 (project-management/),
  licença MIT. Adaptação PT-BR, sem cópia literal — reescrita conforme padrão Kolden.
- Cópia da licença MIT: Caos/registros/absorcao/msitarzewski--agency-agents/LICENSE.upstream
-->

# SOP e processo operacional

## O que é SOP

**SOP (Standard Operating Procedure)** é uma operação repetível documentada em **uma forma canônica**, com **gate por passo**. "Gate" significa que cada passo tem uma verificação binária (sim/não) — o executante só avança quando o passo atual está confirmado feito.

A combinação canônica + gate é o que separa SOP de "lista de coisas para fazer". Uma lista permite pular passos, executar fora de ordem e declarar feito sem evidência. Um SOP, não.

## Quando NÃO usar SOP

Nem todo trabalho cabe em SOP. Evite quando:

- **Trabalho criativo único** (campanha conceitual, design original, redação editorial). O processo importa, mas a forma do output é única — não cabe em template.
- **Decisão estratégica.** Decisão não é passo-a-passo; é deliberação. Cabe em ata + Contrato de Missão, não em SOP.
- **Operação que rodou < 3 vezes.** Sem repetição, não há base empírica para canonizar. Documenta-se como checklist provisório; vira SOP depois do 3º ciclo bem-sucedido.
- **Operação que muda de forma a cada execução.** Se cada caso exige adaptação significativa, o que precisa ser documentado é o **princípio**, não o passo.

## Estrutura canônica do SOP

Todo SOP da Kolden segue esta estrutura, nesta ordem. Faltar seção = SOP inválido.

### 1. Objetivo + Escopo

- **Objetivo** — 1 frase declarando o **outcome** que este SOP entrega. Frase imperativa, sem qualificadores. Ex: "Provisionar ambiente de staging para um novo projeto Omiron."
- **Escopo IN** — lista do que este SOP **cobre**.
- **Escopo OUT** — lista do que este SOP **NÃO cobre** e onde fica (handoff). Sempre pareado com o IN.

O par IN/OUT evita o problema clássico de SOP que vira buraco-negro ("já que estamos aqui, também faço Y") ou que termina antes do necessário ("achei que esse passo era de outro SOP").

### 2. Atores + Responsabilidades

- **Atores** — lista de papéis envolvidos (não pessoas — papéis. "Gerente de projeto", não "Maria").
- **RACI** — obrigatório quando ≥3 atores. Tabela com colunas:
  - **R**esponsible (faz)
  - **A**ccountable (responde — **1 por passo**, regra clássica RACI)
  - **C**onsulted (é consultado antes)
  - **I**nformed (é informado depois)
- Quando 2 atores ou menos, basta lista nominal de responsabilidade por passo (RACI vira overhead).

### 3. Pré-requisitos

O que o executante precisa **antes** de começar o passo 1. Se faltar, ele para aqui.

- **Insumos** — documentos, dados, decisões prévias, artefatos de outro SOP.
- **Ferramentas** — software, contas, ambientes. Cada uma com link ou path.
- **Credenciais** — **sempre via Infisical, nunca texto puro no SOP**. Padrão Kolden (CLAUDE.md §5): segredos viram referência `infisical://<path>`. SOP que carrega credencial em claro é violação imediata.
- **Conhecimento prévio** — habilidades/treinamentos exigidos do executante. Se o SOP exige conhecimento que o executante não tem, o handoff é treinamento, não execução.

### 4. Passos sequenciados — cada passo com gate

Cada passo do SOP tem **5 campos** obrigatórios:

- **Ação** — verbo imperativo. Ex: "Criar branch a partir de `main`."
- **Verificação binária (gate)** — pergunta de sim/não que **só responde sim quando o passo está feito**. Ex: "A branch existe no remote e está acessível pelo executante? (sim/não)". **Não avança para o passo seguinte enquanto a verificação não retornar sim.**
- **Quem executa** — papel (da seção 2) responsável pela ação.
- **Tempo médio** — minutos esperados. Sinal de saúde do processo: passo que sistematicamente ultrapassa o tempo médio é candidato a refatoração.
- **O que registrar** — log do passo (link gerado, ID criado, captura de tela, ticket aberto). Sem log, o passo não conta como feito.

**Tabela de exceções** — para cada passo, listar exceções previsíveis e o que fazer:

| Se acontecer X | Faça Y | Se não der, escale para Z |
|---|---|---|

Exceção não prevista → para o SOP e abre exceção rastreada (ticket de exceção). Nunca improvisar dentro do passo.

### 5. Saídas + Critério de feito

- **Output do SOP** — o artefato, dado ou decisão produzido ao fim. Ex: "Ambiente staging acessível na URL `https://staging-<projeto>.kolden.com.br` com credencial registrada em `infisical://omiron/staging`."
- **Critério binário de feito** — pergunta de sim/não que **só responde sim quando o SOP está 100% completo**. Ex: "O dono do projeto consegue logar no staging usando a credencial registrada? (sim/não)."

Critério de feito **nunca** é subjetivo ("ficou bom", "está pronto"). É sempre verificável.

### 6. Versionamento

- **Versão semântica** — `1.0`, `1.1`, `2.0`. Patch para correção de typo; minor para passo adicionado/removido; major para mudança de objetivo ou escopo.
- **Data + responsável** pela mudança.
- **Changelog** — o que mudou e **por quê**. "Adicionei verificação no passo 4 porque caímos 2x por DNS não propagar" é changelog útil; "Ajustes" não é.
- **Ciclo de vida** — SOPs nascem em `status: draft`; viram `status: vigente` após teste em **3 ciclos** completos sem exceção não prevista. SOP que junta 3 exceções em 1 ciclo volta para `draft`.

## Anti-padrões

- **SOP sem gate por passo.** Vira "lista de coisas" — executante pula, pula, pula, e termina declarando feito sem rastro. Gate por passo é o que diferencia SOP de checklist.
- **SOP para coisa única.** Se rodou só 1x, é evento — cabe em ata + checklist provisório. SOP só nasce após ≥3 ciclos.
- **RACI com 2 Accountable.** Regra clássica é **1**. Dois accountables = zero accountable (cada um espera o outro).
- **Credencial em texto puro no SOP.** Violação imediata do padrão Kolden (CLAUDE.md §5). Credencial sempre via Infisical, referenciada por path.
- **SOP que nunca é versionado.** Decompõe sem ser percebido: campo migrou, ferramenta mudou, ninguém atualizou. Em 6 meses, o SOP descreve a Kolden de antes — pior que SOP nenhum (porque dá falsa sensação de canonicidade).
- **Métrica de SOP dentro do próprio SOP.** Taxa de sucesso, tempo médio, erro mais comum — isso é Metis (skill `metricas-operacionais-continuas`). Misturar quebra a fronteira e duplica responsabilidade.
- **SOP cobrindo mais de um outcome.** Um SOP, um outcome. Se dois outcomes diferentes compartilham passos, extrai-se o tronco comum como SOP autônomo e os dois SOPs filhos chamam o tronco.
- **SOP escrito por quem nunca executou.** Vira teoria. Quem documenta é quem executa pela 3ª vez — antes não há base; depois esquece a fricção.

## Fronteira (importante para anti-overlap entre squads)

- **SOP define o PASSO** — o "como fazer".
- **Métrica de processo** (taxa de sucesso, tempo médio, taxa de erro, gargalo recorrente) → **Metis**, skill `metricas-operacionais-continuas`.
- **Recrutamento, cultura, performance individual** → **Hestia**.
- **SOP de incident response / segurança** → handoff para **Egide** (a estrutura é a mesma; o conteúdo é específico).

Manter essa fronteira evita que o Cairos invada a medição (Metis) ou a gestão de pessoas (Hestia).

## Saída

- **Formato:** Markdown na estrutura das 6 seções, nesta ordem.
- **Arquivo:** 1 SOP por outcome em `docs/sops/<dominio>/<nome-do-sop>.md` (kebab-case).
- **Status visível no topo do arquivo:** `status: draft` ou `status: vigente`, com versão e data da última mudança.
- **Imutabilidade do registro de mudança:** alterações vivem no changelog. Não reescrever o histórico.

## Cross-links

- **Metis `metricas-operacionais-continuas`** — handoff para medir como o SOP se comporta (taxa de sucesso por passo, tempo médio real vs. esperado, gargalo).
- **Hestia** — handoff para treinamento, performance individual e cultura ao redor do SOP.
- **Prometeu `checklist-de-requisitos`** — para gate de qualidade similar aplicado a especificação de produto (mesmo padrão de verificação binária por item).
- **Cairos `gestao-de-riscos-de-projeto`** — quando o SOP cobre operação com risco material, a tabela de exceções da seção 4 alimenta o registro de riscos.

## Checklist final antes de publicar o SOP

- [ ] Objetivo em 1 frase imperativa, sem qualificadores
- [ ] Escopo IN e Escopo OUT pareados
- [ ] RACI com 1 Accountable por passo (se ≥3 atores)
- [ ] Toda credencial referenciada via `infisical://<path>` (zero texto puro)
- [ ] Cada passo tem ação, gate binário, executor, tempo médio e o que registrar
- [ ] Tabela de exceções preenchida para passos com falha previsível
- [ ] Critério de feito é binário e verificável
- [ ] Versão, data e responsável pela mudança no topo
- [ ] Changelog explica **por quê** mudou, não só o quê
- [ ] Status (`draft` / `vigente`) coerente com nº de ciclos completos
- [ ] Sem métrica de processo dentro do SOP (handoff Metis)
- [ ] Sem responsabilidade de pessoas (handoff Hestia)
