<!--
Atribuição: derivado de msitarzewski/agency-agents@a597cb6 (G27) — licença MIT.
Esta skill é uma reescritura PT-BR original, sem cópia literal do upstream.
-->
---
name: gamificacao-como-sistema-de-marca
description: |
  Use quando precisar DESENHAR sistema de gamificação como expressão de marca (não como tática
  isolada). Cobre motivation mechanics (Self-Determination Theory), reward architecture (unlocks
  /streaks/badges), Easter eggs como identidade, social sharing triggers. NÃO substitui Harmonia
  (UI) nem Pheme (loop social). Esta skill DECIDE; outros squads EXECUTAM.
domain: design
subdomain: gamification
agente_primario: [aglaia-chief]
tags: [gamificacao, motivation-mechanics, reward-architecture, easter-eggs, sdt]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G27)
---

# Gamificação como sistema de marca

## Fronteira

Esta skill **DECIDE** o desenho do sistema de gamificação como **expressão de marca** —
mecânicas, arquitetura de recompensa, easter eggs, triggers de compartilhamento.

Quem **EXECUTA**:

- `Harmonia/implementacao-ui` — implementa motion + a11y dos feedbacks de progresso.
- `Pheme` — opera o loop social (matriz-de-conteudo, viral sharing).
- `Caliope` — escreve o copy persuasivo dos triggers.

Esta skill NÃO é gamification genérica de produto. É gamification **como sistema de
marca** — significa que a mecânica carrega a identidade, não só engajamento.

## 1. Motivation mechanics — Self-Determination Theory

Base teórica: Deci & Ryan, SDT. Três motivadores intrínsecos:

- **Autonomia** — usuário tem agência real (escolhas que importam, não falsas).
- **Mestria** — desafio crescente, progressão visível, sensação de evolução.
- **Propósito** — ação tem significado (não pontos sem sentido).

Sistema sem 1 das 3 = **gamification tóxica**. Engagement vazio, churn alto, percepção
de manipulação. Sintoma clássico: usuário diz "isso é só pra me viciar".

## 2. Reward architecture

### Unlocks

- Conteúdo, feature ou status desbloqueia conforme uso.
- **Premium opcional > obrigatório** — paywall coberto por unlock natural é melhor que
  bloqueio frontal.
- Anti-padrão: tudo bloqueado no início (frustração antes de valor percebido).

### Streaks

- Continuidade premiada (Duolingo como referência).
- **Cuidado com punição** por quebrar — gera ansiedade, vira gatilho de churn.
- Permitir **freeze / pausa** — usuário em viagem, doente, em luto não deve perder
  semanas de streak.
- Streak como aliado, não como cobrador.

### Badges

- Conquistas concretas, não troféu vazio.
- **Hierarquia clara** — bronze/prata/ouro/lendária. Cada nível ganha por mérito real.
- **Raras = valor.** Badge que todos têm = não-badge.
- Visual carregado de identidade da marca — não SVG genérico.

### Levels / progressão

- **Curva exponencial** — cada nível ~30-50% mais difícil que o anterior.
- Recompensa visível por nível (não só número).
- Curva linear demais = tédio. Curva íngreme demais = abandono.

## 3. Easter eggs como identidade

- Detalhes ocultos que **recompensam exploração**.
- **Conexão com marca** — easter egg genérico (konami code padrão) não conta. Easter egg
  que cita memória interna da marca = identidade.
- **Compartilhabilidade orgânica** — usuário quer mostrar para amigos. Vira folclore de
  comunidade.

Easter eggs bem-feitos são o item de gamification que mais constrói marca a longo prazo.

## 4. Social sharing triggers

- **Conquista compartilhável** — visual pronto + frase pronta. Reduzir atrito de
  compartilhar.
- **Convite com benefício mútuo** — ambos ganham (referrer + referee). Convite só pro
  referrer = sentimento de spam.
- **Streak compartilhado** — accountability entre amigos. Streak social > streak solo.

## 5. Anti-padrões

- **Gamification pesada em contexto sério** — banking com pontos = perda de confiança.
  O contexto rejeita o lúdico.
- **Sistema sem autonomia** — manipulação. Usuário percebe e migra.
- **Pontos sem significado** — extrinsic over intrinsic. Funciona no curto prazo, mata
  intrínseca no longo.
- **Streak punitivo** — gera ansiedade, perde usuário em momento ruim da vida.
- **Easter egg sem identidade** — genérico, sem conexão com marca. Vira novelty
  descartável.
- **Aglaia implementando** — quebra de fronteira. Handoff é Harmonia (UI) + Pheme
  (loop social).

## 6. Output

Documento de sistema de gamification:

1. **Diagnóstico SDT** — onde a marca/produto está hoje em autonomia/mestria/propósito.
2. **Arquitetura de recompensa escolhida** — unlocks, streaks, badges, levels (quais
   entram, quais não).
3. **Easter eggs catalogados** — 3-5 ideias com conexão de marca.
4. **Triggers de social sharing** — desenho de loop, benefício mútuo.
5. **Handoff Harmonia + Pheme + Caliope** — o que cada um executa.

## 7. Cross-links

- **Harmonia/implementacao-ui** — motion + a11y para feedback de progressão.
- **Pheme/matriz-de-conteudo** — loop social, viral sharing, contexto de comunidade.
- **Caliope/fundacao-de-voz** — copy persuasivo dos triggers.
- **Aglaia/micro-interacoes-de-marca** — delightful feedback é canal natural de
  gamification (badge unlock = micro-interação carregada).
- **Aglaia/pipeline-de-identidade-de-marca** — gamification só faz sentido amarrada à
  identidade. Sem core de marca, vira mecânica vazia.
