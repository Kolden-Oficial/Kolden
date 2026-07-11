---
id: projeto-nutrios-pro-brandbook-manual-operacional
titulo: "NutriOS Pro — Manual Operacional da Marca (v3)"
resumo: "Governança da marca NutriOS Pro: quem aprova o quê, checklist de 12 itens antes de publicar, padrões de acessibilidade obrigatórios, do/don't consolidados, fluxo Aglaia→Ronan para pedir novo asset e protocolo para reportar uso indevido."
categoria: projeto
status: oficial
atualizado-em: 2026-07-05
relacionados: [00-indice, 01-posicionamento, 02-voz-da-marca, 03-identidade-visual, 04-aplicacoes]
tipo: projeto
projeto: nutrios-pro
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/nutrios-pro/brandbook/00-indice|00-indice]]"
---

# Manual Operacional da Marca

> Capítulo 5 de 5. Como fazer a marca **funcionar no dia a dia** sem drift. Este documento é o único que assume que a peça já foi produzida — foca em **aprovar, checar, entregar e proteger**. Se você está criando algo do zero, comece por [`04-aplicacoes.md`](04-aplicacoes.md).

## 1. Governança — quem aprova o quê

A cadeia de aprovação da marca NutriOS Pro tem **3 níveis**, com escalonamento por tipo de peça e risco de erro.

### 1.1 Nível 1 — Autonomia de execução (sem escalonamento)

Quem opera diretamente com os ativos oficiais, sem precisar de aprovação nova:

| Papel | Autoriza |
|---|---|
| Nutricionista/profissional interno | Uso dos lockups oficiais (§04) em documento clínico próprio, ficha de avaliação, apresentação a paciente. |
| Time de conteúdo | Post de rede social usando templates existentes com wordmark + mascote em variantes já aprovadas. |
| Time de produto | Uso da paleta e tipografia no app dentro do design system Harmonia (`../design-system/`). |
| Cliente/parceiro externo | Uso da marca do NutriOS Pro para citar/referenciar em conteúdo próprio, seguindo `../leia-me.md` sobre uso externo. |

**Regra de ouro do Nível 1:** se você está usando um ativo **como ele foi entregue** (SVG, PNG, cor hex canônica, fonte já contratada), você **não precisa aprovar de novo**. Só respeitar as regras do capítulo 3.

### 1.2 Nível 2 — Aprovação da Aglaia (squad de branding)

Qualquer peça que **combine, adapte ou crie** algo novo dentro do sistema visual:

| Caso | Fluxo |
|---|---|
| Novo lockup (variante inédita, composição diferente das 6 oficiais) | Aglaia aprova via ticket → gera SVG + PNG + entrega no `ativos/logo/` com nome próprio. |
| Ilustração usando a paleta canônica | Aglaia revisa e libera para produção. |
| Peça de marketing com peso institucional (landing page, campanha) | Aglaia revisa a arte-final antes do publish. |
| Aplicação inédita em suporte não coberto pelo §04 (letreiro físico, sinalização, embalagem) | Aglaia + Ronan aprovam em conjunto. |
| Adaptação de tom de voz para novo idioma (inglês para expansão) | Aglaia + Caliope (copy) revisam antes do primeiro lote. |

**SLA da Aglaia:** peça revisada em **até 48h** após ticket completo (sem correria). Peça urgente (< 24h): declarar urgência no ticket + Ronan cientificado.

### 1.3 Nível 3 — Decisão do Ronan (sócio)

Escalonamentos que **redefinem a marca** ou têm custo/risco significativo:

- Adicionar cor à paleta canônica (extensão dos 8 hex).
- Adicionar família tipográfica (extensão das 3 famílias).
- Alterar significado do símbolo (mudar o manifesto de §1 do capítulo 3).
- Contratar licença webfont Quip para produção pública.
- Contratar licença de fonte substituta (caso Quip não seja viável).
- Recall de uso indevido em canal com repercussão pública.
- Rebrand ou revisão maior (v4).

**Ronan aprova por escrito.** Nunca por conversa informal — a marca é ativo e precisa de rastro.

### 1.4 Ledger de decisões

Toda decisão de Nível 2 e 3 fica registrada em `../decisoes.md` do projeto NutriOS Pro (mesmo diretório do brandbook, um nível acima). Formato canônico:

```
### YYYY-MM-DD — [Título curto]
- Contexto: [1 parágrafo]
- Decisão: [1 parágrafo]
- Aprovou: [Aglaia | Ronan | ambos]
- Impacto: [assets afetados, versão do brandbook, se aplica]
```

## 2. Checklist antes de publicar

**12 itens.** Aplicar a qualquer peça — site, post, e-mail, deck, impresso, ativo de produto — antes do publish. Se qualquer item retornar `NÃO`, corrigir antes.

- [ ] **1. Símbolo correto:** peça usa uma das 6 variantes oficiais (§04) e nomeia o símbolo como "n + O + ponto" ou apenas "símbolo", **nunca "nö"** em texto vivo.
- [ ] **2. Variante adequada ao contexto:** mascote em contexto amigável, wordmark em institucional, selo em decorativo — nunca trocado.
- [ ] **3. Clearance preservado:** margem ao redor do logo ≥ altura da x-height do "n" (§1.3 do capítulo 3).
- [ ] **4. Tamanho mínimo respeitado:** símbolo isolado ≥ 16 px favicon, ≥ 8 mm impresso; lockup ≥ 24 px UI / 12 mm impresso; selo ≥ 40 mm / 200 px.
- [ ] **5. Paleta canônica exclusiva:** todos os hex vêm dos 8 aprovados. **Zero preto puro `#000000`**, **zero branco puro `#FFFFFF`** em peça própria.
- [ ] **6. Terracotta não é CTA:** verificar cada botão/link primário — se estiver em Terracotta, corrigir para Espresso sobre Neon Mint.
- [ ] **7. Par CTA canônico presente:** ação primária da peça usa Espresso `#2C2416` sobre Neon Mint `#00E87A`.
- [ ] **8. Tipografia respeita papel:** Geometr415 apenas em wordmark estático; Quip em display/hero; Inter em UI/body/tabela. Tabelas com números têm `tabular-nums` ativado.
- [ ] **9. Contraste WCAG:** todo par texto/fundo tem ≥ 4.5:1 (AA) para texto normal, ≥ 3:1 para texto grande. Par CTA canônico atende AAA (10.3:1).
- [ ] **10. Voz alinhada:** copy da peça está no eixo Cuidador + Mago (§01/§02). Sem hype vazio, sem infantilização, sem frieza clínica.
- [ ] **11. Wordmark não reconstruído:** onde aparece `NUTRIOS PRO`, é o SVG/PNG oficial — nunca reconstruído com fonte viva.
- [ ] **12. Sem filtros / distorção:** símbolo, wordmark, mascote não têm drop-shadow, glow, blur, rotação, espelhamento ou proporção alterada.

**Regra prática:** se a peça é uma "primeira vez" (novo suporte, novo formato), fazer também um "olho no todo" — comparar com o `ativos/logo/nutrios-pro-6-variantes.png` lado a lado. Se destoar visualmente, escalar para Aglaia (Nível 2).

## 3. Padrões de acessibilidade obrigatórios

Não são recomendação — são **obrigatórios**. Peças que falham nestes padrões não podem ser publicadas.

### 3.1 Contraste — WCAG 2.1

- **Texto normal (< 18pt regular / < 14pt bold):** contraste ≥ **4.5:1** (AA).
- **Texto grande (≥ 18pt regular / ≥ 14pt bold):** contraste ≥ **3:1** (AA-large).
- **Elementos não-textuais essenciais** (ícones de UI, gráficos que carregam significado): ≥ **3:1**.
- **CTA primário:** deve atingir **AAA (7:1)** — o par canônico Espresso sobre Neon Mint (10.3:1) cobre isso com folga.

Matriz completa em §5 do capítulo 3 (`03-identidade-visual.md`).

### 3.2 Alt text em imagens

Toda imagem em site, e-mail, post, deck exportado para PDF/apresentação online deve ter **alt text descritivo** — não decorativo, não redundante com legenda. Regras:

- Logo: `alt="NutriOS Pro"` (nunca `alt="logo"` ou `alt="nö"`).
- Mascote em contexto ilustrativo: `alt="Ilustração da mascote do NutriOS Pro segurando um livro."` (descrever o que a mascote está fazendo, não repetir "mascote NutriOS Pro" em 20 imagens).
- Gráfico de dado: `alt="Gráfico da evolução do peso do paciente entre janeiro e junho, com queda de 8kg."` (descrever o dado, não o gráfico).
- Foto decorativa sem função semântica: `alt=""` (vazio, marca a imagem como decorativa para screen reader).

### 3.3 Foco visível e toque

- Todo elemento interativo (botão, link, campo) tem **estado de foco visível** — outline ou mudança de cor perceptível (Neon Mint sobre Deep Forest, Espresso sobre Neon Mint).
- Touch target no produto/app: **mínimo 44 × 44 px** (mobile) ou 32 × 32 px (desktop com hover), sem exceção.

### 3.4 Movimento e animação

- Nenhuma animação pisca acima de **3 Hz** (risco de convulsão fotossensitiva).
- Animações não-essenciais respeitam `prefers-reduced-motion: reduce` — se o usuário pediu menos movimento, não animar.
- Autoplay de vídeo/carrossel com movimento contínuo por mais de 5s exige controle de pausa acessível.

## 4. Do/don't visuais consolidados

Referência rápida cruzada com §6 do capítulo 3. Aqui, versão operacional para colar no ticket de revisão.

### ✅ Do

1. Chamar o símbolo pelo nome correto ("símbolo", "n + O + ponto").
2. Escolher a variante certa para o contexto (§04).
3. Preservar clearance da altura da x-height do "n" ao redor do logo.
4. Manter o par CTA canônico Espresso sobre Neon Mint.
5. Trocar preto puro por Espresso e branco puro por Linen Cream.
6. Reproduzir o wordmark a partir do SVG/PNG oficial.
7. Ativar `tabular-nums` do Inter em tabelas clínicas.

### ❌ Don't

1. Chamar o símbolo de "nö" em texto vivo.
2. Usar Terracotta como CTA.
3. Usar preto puro `#000000`.
4. Usar branco puro `#FFFFFF`.
5. Embutir Geometr415 Blk BT como webfont.
6. Embutir Quip como webfont em produção pública sem licença específica (pendente).
7. Usar o selo circular como assinatura principal.
8. Usar mascote em contexto clínico sensível ou institucional formal.
9. Usar wordmark isolado sem o símbolo.
10. Misturar variantes num mesmo lockup.
11. Aplicar filtros (drop-shadow, glow, blur, gradient) no símbolo/wordmark.
12. Rotacionar, espelhar ou distorcer símbolo/wordmark/mascote.

## 5. Como pedir novo asset (fluxo Aglaia → Ronan)

Fluxo travado em **4 passos**. Vale para qualquer pedido de ativo novo: SVG faltante, lockup para suporte inédito, ilustração para campanha, template de post.

### Passo 1 — Abrir ticket

Ticket entra em `sobre-a-empresa/operacao/tarefas/` como card `KLD-{ano}-{contador}` (padrão da Central de Tarefas). Campos obrigatórios:

- **Título:** curto, imperativo ("Gerar SVG da variante wordmark preto", "Criar template de post educativo").
- **Contexto:** para que serve, onde vai ser usado, prazo real.
- **Referência:** link ou path para peça similar existente, se houver.
- **Suporte final:** onde a peça vai viver (produto, site, PDF, impresso, canal específico).
- **Formato entregável:** SVG, PNG (com dimensões), PDF, arquivo aberto de edição (Figma/Illustrator).
- **Urgência:** normal (SLA 48h) ou urgente (< 24h, com justificativa).

### Passo 2 — Aglaia triagem

Aglaia lê o ticket e classifica:

- **Reutiliza ativo existente:** aponta o caminho no ledger — sem produção nova.
- **Ajuste dentro do sistema (Nível 2):** produz e entrega dentro do SLA.
- **Requer decisão do Ronan (Nível 3):** escalona com nota curta ("precisa nova cor / nova fonte / licença nova").
- **Fora do escopo do brandbook:** encaminha para squad correto (Harmonia = tokens/CSS/componentes; Hefesto = código; etc.).

### Passo 3 — Produção e entrega

Aglaia:

- Produz o ativo respeitando os 12 itens do checklist (§2).
- Nomeia o arquivo em kebab-case: `nutrios-pro-{variante}-{formato}-{contexto}.{ext}`. Exemplo: `nutrios-pro-wordmark-mint-svg-app-header.svg`.
- Coloca em `ativos/logo/` (se for variante de logo) ou em pasta contextual (`ativos/campanhas/{nome}/`).
- Registra em `../decisoes.md` se houve decisão de arte relevante.
- Fecha o ticket com link para o arquivo e comentário curto sobre uso.

### Passo 4 — Consumo e feedback

Quem pediu:

- Usa o ativo respeitando o checklist §2.
- Se detectar problema em produção (contraste ruim em suporte real, ilegível em tamanho pequeno, etc.), reabre ticket com evidência (screenshot) — não faz correção por conta.

## 6. Como reportar uso indevido

Uso indevido = uso da marca NutriOS Pro por terceiros que quebra as regras deste manual — ou uso interno que passou pela revisão mas gera dano à marca.

### 6.1 Detecção

Fontes de detecção contínua:

- **Google Alert** e **Firecrawl Monitor** para menções a "NutriOS Pro" na web.
- **Trademark watch** (via serviço externo) para registro similar de marca.
- **Report interno:** qualquer pessoa do time pode reportar via ticket com tag `uso-indevido`.

### 6.2 Classificação do uso

Ao receber report, Aglaia classifica:

| Tipo | Exemplo | Ação |
|---|---|---|
| **A — Erro honesto de citação** | Blog cita `NutriOS Pro` com wordmark mal reproduzido | Cortês: pedir correção com link para brandbook público (ativo positivo). |
| **B — Confusão de marca** | Concorrente usa "NutriOSPro" ou variante similar em produto próprio | Formal: notificação legal via Ronan, com prazo de correção. |
| **C — Uso indevido malicioso** | Fraude, phishing, produto falso usando marca | Grave: escalar para Ronan em < 24h; ação legal + Malwarebytes report + reporte à plataforma hospedeira. |
| **D — Erro interno** | Peça própria publicada com problema de identidade | Interno: recall silencioso, corrigir e republicar; registrar em `../decisoes.md` como lição. |

### 6.3 Fluxo de crise (janelas)

Uso indevido que gera dano público (viraliza, causa confusão de mercado, associa marca a algo negativo):

- **≤ 30 min:** Ronan cientificado. Aglaia trava peças em andamento no canal afetado.
- **≤ 2h:** primeira resposta pública (se apropriado) + plano de ação.
- **≤ 24h:** resolução formal (correção, remoção, comunicado).

Ver skill `protecao-de-marca-monitoramento-crise` da Aglaia para protocolo completo.

### 6.4 Registro forense

Todo caso B, C ou D fica registrado em `../decisoes.md` do NutriOS Pro **e** no ledger de proteção de marca em `sobre-a-empresa/marca/protecao/` (Kolden compartilhado). Registro inclui:

- Data e canal.
- Evidência (screenshot, URL, arquivo).
- Ação tomada.
- Aprendizado (o que mudar no manual para evitar recorrência).

## 7. Métricas e revisão do brandbook

O brandbook não é estático — é revisado a cada quarter.

### 7.1 Métricas de saúde da marca

Trackeadas trimestralmente (via skill `paineis-de-equidade-de-marca` da Aglaia):

- **Salience:** menções orgânicas / share of search.
- **Performance + Imagery:** aderência ao arquétipo Cuidador + Mago em pesquisa qualitativa (n ≥ 30).
- **Judgments + Feelings:** NPS por segmento (nutricionista, estudante, público metódico).
- **Resonance:** retenção mensal do produto (proxy da adesão que a marca promete).

### 7.2 Auditoria interna

A cada quarter, Aglaia:

- Roda o checklist §2 em amostra de 20 peças publicadas no período.
- Registra taxa de aderência (esperado ≥ 95%).
- Identifica itens do checklist que mais falham → vira treinamento no time.

### 7.3 Revisão maior (versão do brandbook)

Nova versão do brandbook (v4, v5...) só é lavrada em:

- Mudança do posicionamento (arquétipo, público, brand idea).
- Mudança do sistema visual (paleta, tipografia, símbolo).
- Correção de erro documentado da versão anterior (como esta v3 corrigiu a v2 sobre "nö").

Cada versão preserva a anterior em `../decisoes.md` como registro. Nunca sobrescrever a história — a marca é ativo com genealogia.

## 8. Referências cruzadas

- Fonte de verdade do sistema visual: [`03-identidade-visual.md`](03-identidade-visual.md).
- Aplicações práticas por suporte: [`04-aplicacoes.md`](04-aplicacoes.md).
- Voz e mensagem: [`02-voz-da-marca.md`](02-voz-da-marca.md).
- Posicionamento e arquétipo: [`01-posicionamento.md`](01-posicionamento.md).
- Central de tarefas onde ticket entra: `sobre-a-empresa/operacao/tarefas/`.
- Ledger de decisões do projeto: `../decisoes.md`.
- Design system técnico (tokens, componentes): `../design-system/`.
