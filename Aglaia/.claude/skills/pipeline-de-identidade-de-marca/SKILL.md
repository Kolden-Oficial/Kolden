---
name: pipeline-de-identidade-de-marca
description: Use quando o pedido for construir uma identidade de marca do zero ou refundar uma existente — "criar identidade de marca", "purpose-values-visual-voice", "brand build do zero", "do zero ao manual de marca". Pipeline operacional em 4 fases com gates intransponíveis (Purpose → Values → Visual → Voice). Cada fase só fecha quando documentada e aprovada. A estética serve o valor — sem visual antes de values, sem voice sem fundação. NÃO use para refresh visual pontual (só logo/cor) nem para campanha de uma única peça.
domain: design
subdomain: brand-identity
agente_primario: [aglaia-chief]
tags: [branding, identidade, purpose-values, visual-system, brand-voice]
fonte_upstream: msitarzewski/agency-agents@a597cb6 (design/, MIT)
status: semente
---

> **Atribuição:** semente adaptada de `msitarzewski/agency-agents@a597cb6` (MIT, divisão `design/`). Reescrita em PT-BR, sem cópia literal. Aaker e Wheeler são os pensadores históricos de referência dentro do squad Aglaia.

# Pipeline de Identidade de Marca

Identidade de marca não é "começar pelo logo". É um pipeline com ordem causal: o **porquê** define o **como**, o **como** define a **aparência**, a aparência sustenta a **voz**. Inverter a ordem produz marcas bonitas que não significam nada — ou marcas com discurso forte e visual incoerente.

## As 4 fases (ordem obrigatória)

### Fase 1 — Purpose (por que existimos)
Antes de qualquer escolha estética, responda:
- **Missão:** o que fazemos hoje, para quem, em que problema concreto entramos.
- **Visão:** o estado de mundo que queremos provocar (horizonte de 3-10 anos).
- **Valores fundamentais:** 3-5 crenças não-negociáveis. Cada uma com **comportamento observável** — "Honestidade radical" sem "publicamos relatórios com os números ruins" é frase de parede.

**Gate de saída da Fase 1:** documento `purpose.md` aprovado. Sem isso, não passa.

### Fase 2 — Values (como nos comportamos)
Traduzir os valores em **princípios operacionais** que orientam decisões reais:
- Como decidimos prioridade quando dois valores entram em conflito?
- O que dispensamos um cliente por? O que recusamos contratar?
- Que erro a marca prefere cometer — pecar pelo silêncio ou pela ousadia?

Sem comportamento observável, valor vira frase de motivação. Anti-padrão clássico.

**Gate de saída da Fase 2:** `values-operacionais.md` aprovado, com 3-5 valores × comportamento concreto cada.

### Fase 3 — Visual (como aparecemos)
**Só agora** o sistema visual entra. Cada decisão se justifica pelo Purpose/Values:
- **Cores:** primária + secundárias + neutras + semânticas (sucesso/erro/aviso). Por que essas? Que valor cada cor carrega?
- **Tipografia:** display + texto + (opcional) mono. Hierarquia clara.
- **Iconografia:** estilo único — line, solid, duotone. Grid e tamanhos.
- **Direção de fotografia:** o tipo de imagem que vive no universo da marca (estilo, paleta, composição, emoção).

**Gate de saída da Fase 3:** `sistema-visual.md` + arquivos-fonte. Validação cruzada com Fase 1/2 — cada escolha amarrada a um valor.

### Fase 4 — Voice (como falamos)
Como a marca soa em texto, fala, atendimento, erro de sistema, e-mail de cobrança:
- **Tom:** as 4-6 dimensões (formal↔informal, sério↔bem-humorado, respeitoso↔irreverente, etc.).
- **Vocabulário:** palavras que usamos / palavras que nunca usamos / palavras que **só** nós usamos.
- **Cadência:** ritmo de frase, uso de listas, parágrafos curtos vs ensaísticos.

**Handoff obrigatório:** esta fase chama `Caliope/fundacao-de-voz` para a produção dos artefatos canônicos `sobre-mim.md` e `voz.md` que todos os redatores leem.

**Gate de saída da Fase 4:** `brand-voice.md` + handoff Caliope concluído.

## Anti-padrões (red flags imediatas)
- **Começar pelo logo.** Logo é resultado, não ponto de partida.
- **Valores sem comportamento observável.** "Excelência" não é valor — é placa.
- **Visual antes de values.** A paleta serve a crença, não o oposto.
- **Voice sem fundação.** Tom de voz sem `Caliope/fundacao-de-voz` vira gosto pessoal do redator do dia.
- **Pular gates.** Cada fase entrega um documento. Sem documento, próxima fase não começa.

## Cross-links
- **Caliope/fundacao-de-voz** — destino obrigatório da Fase 4.
- **Harmonia/sistema-de-design** — destino da Fase 3 quando a marca vai para produto digital (componentes, tokens).
- **Pensadores históricos da Aglaia** — Aaker (brand equity), Wheeler (Designing Brand Identity) como referência teórica do pipeline.

## Saída padrão
Ao final do pipeline: 4 documentos (`purpose.md`, `values-operacionais.md`, `sistema-visual.md`, `brand-voice.md`) + handoffs concluídos. Esse é o manual de marca mínimo viável.
