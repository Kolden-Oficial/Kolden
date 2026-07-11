---
name: protecao-de-marca-monitoramento-crise
description: Use quando o pedido envolver monitorar uso da marca no mundo, detectar uso indevido ou responder a uma crise de imagem em andamento — "monitoramento de marca", "uso indevido do logo", "alguém registrou marca parecida", "crise de imagem", "trademark watch", "responder ataque público". Três frentes operam em paralelo (trademark watch contínuo + monitoramento de uso indevido + protocolo de crise com janelas 30min/2h/24h). NÃO use para pedido de campanha positiva nem para auditoria interna de aderência ao manual de marca.
domain: design
subdomain: brand-protection
agente_primario: [aglaia-chief]
tags: [brand-protection, trademark, crisis-management, monitoramento]
fonte_upstream: msitarzewski/agency-agents@a597cb6 (design/, MIT)
status: semente
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

> **Atribuição:** semente adaptada de `msitarzewski/agency-agents@a597cb6` (MIT, divisão `design/`). Reescrita em PT-BR, sem cópia literal.

# Proteção de Marca — Monitoramento e Crise

Marca é ativo. Ativo não-monitorado é ativo em risco. Esta habilidade opera em **3 frentes simultâneas**: registro (trademark), uso (no mundo) e resposta (quando algo dá errado).

---

## Frente 1 — Trademark watch (contínuo)

Vigia de registros novos que possam conflitar com a sua marca.

**O que monitorar:**
- Registros no INPI (Brasil) com classificação Nice próxima das nossas classes.
- Registros na USPTO (EUA) se houver projeção internacional.
- Grafias similares — variações com 1-2 letras, anagramas, plural/singular, traduções literais.
- Domínios recém-registrados com a base do nome da marca.

**Ferramentas:**
- INPI (busca pública gratuita) + Justia (base internacional).
- Markify, Compumark, Corsearch — watch services pagos, alertas semanais.
- DNTwist, dnstwister — variações tipográficas de domínio.

**Cadência:** semanal automatizada + revisão humana mensal.

**Acionar:** quando classe Nice colide **e** grafia similar **e** segmento próximo — escalar para Égide (IP/legal).

---

## Frente 2 — Uso indevido no mundo

Vigia onde a marca aparece sem autorização (logo, nome, identidade visual copiada).

**O que monitorar:**
- **Reverse image search** do logo: Google Images, TinEye, Yandex (melhor para imagens) — varredura mensal.
- **Brand mention** em redes/blog/podcast: Mention, Brand24, Talkwalker — alertas em tempo real com filtros de sentimento.
- **Marketplaces** (e-commerce): busca recorrente por nome da marca em Mercado Livre, Shopee, Amazon BR para detectar revenda não-autorizada ou contrafação.
- **App stores** (se aplicável): apps que se passam pelo produto oficial.

**Cadência:** alertas em tempo real para menções; sweep mensal para reverse image search e marketplaces.

**Acionar:** classificar gravidade (paródia legítima vs imitação vs contrafação) e escalar para Égide quando for caso de notificação extrajudicial.

---

## Frente 3 — Protocolo de crise (janelas de tempo)

Quando o evento já estalou, a janela de tempo manda mais que o conteúdo da resposta. Resposta perfeita em 48h vale menos que resposta razoável em 2h.

### Janela 1 — Primeiros 30 minutos
**Objetivo:** identificar o fato e classificar severidade.
- **Fato:** o que aconteceu, onde, quando, quem viu, com que alcance estimado.
- **Severidade:**
  - **Verde:** ruído isolado, sem viralização, sem dano real à marca → monitorar.
  - **Amarelo:** alcance crescente OU acusação verificável OU influenciador relevante envolvido → resposta pública necessária.
  - **Vermelho:** dano regulatório/financeiro/de segurança OU viralização rápida OU mídia profissional cobrindo → modo crise total.

**Decisão de quem responde** sai aqui (CEO, porta-voz designado, marca institucional).

### Janela 2 — Até 2 horas
**Objetivo:** primeira resposta pública, mesmo que incompleta.
- "Estamos apurando" **é** uma resposta — silêncio nesta janela é admissão.
- Se severidade verde: pode-se postergar.
- Se amarela/vermelha: declaração curta reconhecendo o fato + compromisso com prazo de update.

**Canal:** mesmo canal onde a crise estalou + canais próprios (site, redes oficiais).

### Janela 3 — Até 24 horas
**Objetivo:** comunicação completa.
- **Fatos:** o que aconteceu, confirmado.
- **Ação:** o que estamos fazendo agora (com nomes/áreas, não abstrato).
- **Próximo update:** quando volta o próximo comunicado (dia, hora se possível).

### Janela 4 — Pós-crise (24h+)
**Objetivo:** pós-mortem interno e ações de prevenção.
- O que falhou no sistema (não nas pessoas)?
- Que sinal antecedente existia e foi ignorado?
- Que processo nasce para que o mesmo erro não se repita?
- Comunicação interna obrigatória — equipe precisa saber o que mudou.

---

## Cross-links
- **Égide** — parte legal/IP. Acionada nas Frentes 1 e 2 quando houver violação acionável.
- **Themis** — compliance regulatório quando a crise tem dimensão regulatória.
- **Pheme** — canal de comunicação de crise nas redes; coordena execução da resposta nas Janelas 2-3.
- **Caliope** — redação da declaração na Janela 2-3 quando a marca tem voz forte e o tom importa.

## Anti-padrões
- **Esperar perfeição na Janela 2.** Silêncio de 4h é admissão de culpa.
- **Resposta jurídica sem voz humana.** Comunicado jurídico em crise vira gasolina.
- **Pós-mortem que vira caça às bruxas.** Falha em sistema, não em pessoas.
- **Trademark watch só quando lembra.** Monitoramento é processo, não tarefa.
