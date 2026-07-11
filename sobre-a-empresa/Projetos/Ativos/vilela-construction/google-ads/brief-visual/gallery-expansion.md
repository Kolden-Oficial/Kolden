---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/_INDEX|_INDEX]]"
---

# Briefing — Gallery Expansion (Flooring + Painting)

> **Origem:** F9 do `landing-page-fixes-2026-07.md` (severidade 🟠 Alta) + Onda 2.4 do `google-ads/ROADMAP.md`.
> **Squad executor:** Aglaia (direção visual + edição se necessário), com apoio de Julio (canal com Thiago) e Harmonia (integração no componente `BeforeAfter.tsx` da LP).
> **Prazo:** D+7 do roadmap.
> **Tokens visuais:** `design-tokens-vilela.md`. Ler antes de produzir.

---

## 1. Problema que a peça resolve

A LP atual vende **4 serviços** (Kitchen · Bathroom · Flooring · Painting) mas só mostra **2 pares before/after** na gallery (Kitchen + Bathroom). Isso cria:

1. **Descompasso perceptível** entre promessa (4 serviços) e prova (2 provas).
2. **Erosão de trust** em quem vem de anúncio de Flooring ou Painting — chega na LP e não vê seu serviço demonstrado.
3. **Perda de scent match** anúncio→LP nos temas Flooring e Painting (relevante para Google Ads Quality Score, mesmo que essa faixa não seja o TOFU principal da Onda 3).

Objetivo desta peça: **cobrir os 2 buracos** com pares before/after de qualidade equivalente aos existentes (Kitchen + Bathroom).

---

## 2. Estrutura de entrega — 2 pares before/after

Cada par vira 2 imagens (`{tema}-before.jpg` e `{tema}-after.jpg`) integradas no slider custom `BeforeAfter.tsx` da LP.

| Par | Arquivo before | Arquivo after | Caminho no repo |
|---|---|---|---|
| Flooring | `flooring-before.jpg` | `flooring-after.jpg` | `vilela-bright-space/src/assets/` |
| Painting | `painting-before.jpg` | `painting-after.jpg` | `vilela-bright-space/src/assets/` |

**Formato:** JPEG q90, sRGB, resolução mínima 1920×1080 (o slider da LP renderiza até ~1200 px de largura em desktop, mas assets de qualidade permitem reuso em banner/PMax).

**Peso alvo:** ≤ 400 KB por imagem (~1.6 MB total para os 4 arquivos).

**Enquadramento:** obrigatoriamente **mesmo enquadramento em before e after**. O slider funciona por sobreposição — ângulo diferente quebra a ilusão. Mesma posição de câmera, mesma distância focal, se possível mesma luz do dia.

---

## 3. Par 1 — Flooring

### 3.1 Projeto ideal para foto

**Tipo de trabalho:** instalação de piso de madeira sólida (solid hardwood) ou LVP (luxury vinyl plank) substituindo:
- Carpete velho (o cenário mais comum em MA + NH) — o contraste visual é máximo.
- Ou piso laminado desgastado / rachado.
- Ou linóleo antigo em kitchen/hall.

**Ideal:** transição de living room ou hallway com carpete manchado/gasto → hardwood claro (oak, maple) com finish acetinado. É o cenário que rende maior impacto visual e que mais gera busca em Greater Boston (público sênior renovando casa dos anos 60–80).

### 3.2 Composição do before

- **Foco no problema:**
  - Carpete velho — mostrar desgaste real (áreas achatadas onde móveis ficaram, manchas, cor apagada, fibras puxadas).
  - Iluminação natural (janela lateral) — sem flash, sem filtro. A cor real do carpete gasto é o argumento.
  - Se possível, mostrar borda entre carpete e outro cômodo (transição visível) — reforça "vamos consertar isso".
- **Enquadramento:** wide shot mostrando cômodo inteiro (≥ 60% do frame é chão). Ângulo levemente plongée (câmera na altura do peito, apontada 30° para baixo).
- **Sem pessoas.** Sem objetos pessoais na área (retirar antes da foto).

### 3.3 Composição do after

- **Foco no resultado:**
  - Piso novo instalado, **canteiro limpo** (o "Unmatched Cleanliness" da voz Vilela), rodapé recolocado, transição finalizada.
  - Mesma iluminação natural — de preferência foto tirada no mesmo horário do dia que o before.
  - Se possível, um único elemento decorativo mínimo (um tapete pequeno no canto, uma cadeira) para dar escala. Nada de "staged home" com múltiplos objetos.
- **Enquadramento IDÊNTICO ao before.** Mesma posição de câmera, mesma altura, mesma lente.
- **Cor natural** — sem edit color grading que sature o wood tone.

### 3.4 Ângulo + luz sugeridos

- **Ângulo:** medium-wide, altura de peito, ligeiramente plongée (~20–30°).
- **Luz:** natural, soft light de janela lateral (idealmente lado esquerdo do frame — leitura natural W→E foca no quadrante mais claro).
- **Hora:** entre 10h e 14h com sol indireto (dias nublados são OK — sol direto dá sombra dura).
- **ISO/aperture (se fotógrafo profissional):** ISO 200–400, f/5.6–f/8 para profundidade de campo suficiente (piso inteiro nítido do primeiro ao último ponto).

---

## 4. Par 2 — Painting

### 4.1 Projeto ideal para foto

**Tipo de trabalho:** interior painting de living room ou dining room. Cenários com maior impacto visual:
- **Antes:** parede em cor datada (amarelo mostarda anos 90, verde-menta, off-white sujo/manchado) OU parede com marcas óbvias (buracos de prego, manchas de umidade, papel de parede descascando).
- **Depois:** cor moderna neutra (warm white, greige, soft sage) OU um accent wall em cor sofisticada (deep navy, forest green, terracotta em um único painel).

**Ideal:** transição de sala com parede off-white sujo/manchado → repintura em cor neutra moderna com trim branco recém-pintado. É o job mais frequente em MA + NH e o mais tangível para o público.

### 4.2 Composição do before

- **Foco no problema:**
  - Parede com defeito visível (marca de móvel removido, mancha, imperfeição).
  - Se possível, mostrar o trim (rodapé, moldura de porta/janela) descascando ou amarelado — o painting de trim é diferencial de acabamento.
  - Iluminação natural, mostra as marcas reais.
- **Enquadramento:** medium-wide, foca em uma parede específica (60–70% do frame é a parede em questão), 20–30% do frame mostra contexto do cômodo (canto de sofá, borda de janela).
- **Ângulo:** frontal, altura de olho — a parede precisa aparecer plana e sem distorção.

### 4.3 Composição do after

- **Foco no resultado:**
  - Mesma parede, mesma iluminação, agora repintada. Trim branco impecável.
  - **Canteiro limpo:** sem plastic drop cloth, sem tinta seca no chão, sem fita crepe pendurada. O trabalho está entregue.
  - Se cor neutra: mostra a textura da tinta (matte / eggshell — não brilho). Se accent wall: destacar a cor com um único item decorativo simples (um quadro, um vaso) para dar escala.
- **Enquadramento IDÊNTICO ao before.**

### 4.4 Ângulo + luz sugeridos

- **Ângulo:** frontal, altura de olho (~1.55 m), câmera paralela à parede.
- **Luz:** natural, difusa (dia nublado é bom para pintura porque revela textura sem hotspots). Se sol direto, tirar em ângulo que evite reflexo brilhante na tinta fresca.
- **ISO/aperture:** ISO 100–200, f/8–f/11 (paredes exigem foco máximo em toda superfície).

---

## 5. O que Julio precisa pedir para Thiago

**Texto padrão para Julio enviar a Thiago (via WhatsApp / e-mail):**

> Hi Thiago — Kolden's design team is putting together the expanded gallery on your landing page. We already have Kitchen and Bathroom before/after, and we want to add Flooring and Painting to cover all 4 services.
>
> Could you send us **2 pairs of before/after photos** from recent projects:
>
> 1. **One Flooring project** — ideally a hardwood or LVP install replacing carpet or old flooring. Both photos taken from the same angle/distance.
> 2. **One Painting project** — ideally an interior repaint of a living room or bedroom. Same angle before and after.
>
> **Technical requirements:**
> - Resolution: **at least 1920×1080** (larger is better — we may reuse in ads).
> - Format: JPEG, PNG, or HEIC (iPhone default is fine).
> - Same camera angle and framing on before and after (so the slider works).
> - Clean workspace on the "after" photo (no drop cloths, no debris — matches your "Unmatched Cleanliness" promise).
> - Natural daylight preferred. Avoid flash.
> - No watermarks. No people's faces (unless it's you and you approve).
>
> If you don't have "official" before/after pairs, even phone photos taken at both stages of a recent project work — we can polish them on our end.
>
> Deadline: **as soon as possible** — this feeds the launch of your Google Ads campaigns and helps your landing convert better.

---

## 6. Alternativas se Thiago não fornecer a tempo

Ordem de preferência, do menor risco para o maior:

### 6.1 Plano B — foto do fotógrafo local em MA (1 dia de shoot)

- Vilela contrata fotógrafo residencial em Boston / Metro West por 1 dia (~USD 600–1.200 pelo pacote diurno de 3–4 projetos).
- Cronograma sugerido: 4h em um projeto ativo de Flooring + 3h em um de Painting.
- **ROI da sessão:** cobre gallery da LP + banners Remarketing + PMax asset library futura + og:image de exterior (Variação C do `og-image-briefing.md`). Uma sessão paga múltiplos artefatos por meses.
- **Recomendação Aglaia:** este é o melhor investimento visual que a Vilela pode fazer no ciclo 2026-07. Não depende de Thiago achar tempo entre projetos.

### 6.2 Plano C — usar assets órfãos do repo

O repo tem `basement-before.jpg` e `basement-after.jpg` não usados (ver dossie §3). **NÃO SUBSTITUEM Flooring/Painting** — categorias diferentes.

Poderiam servir para **expandir a gallery com Basement** (5º par), mas isso muda o escopo (Basement não está no ROADMAP §3.4 como foco de campanha). **Descartar** para esta entrega.

### 6.3 Plano D — stock premium licenciado (último recurso)

- Comprar 2 pares de before/after em Getty / Adobe Stock (~USD 20–40 por par) com licença comercial.
- **Risco alto:** viola o princípio de foto real Vilela (`design-tokens-vilela.md` §7). Se Thiago descobrir stock passando por trabalho dele, é ruído.
- **Se usado:** marcar explicitamente no `_INDEX.md` como "temporário — substituir por foto real Vilela em D+30".
- **Melhor evitar.** Preferível remover Flooring + Painting da gallery até haver foto real (e ajustar a copy de "4 serviços" na LP para não gerar descompasso).

### 6.4 Plano E — remover Flooring + Painting da promessa da LP até haver prova real

- Editar `Services` §4.5 da LP para mostrar apenas Kitchen + Bathroom + (opcional) Basement enquanto não há gallery.
- **Contrapartida:** perde 2 categorias de captura. Mas alinha promessa e prova.
- **Recomendação Aglaia:** **NÃO** ir por aqui. Perde volume de anúncio e cria fricção de comunicação — o cliente quer ver Flooring/Painting. Correr atrás da foto real (Plano B).

---

## 7. Edição pós-shoot (se Aglaia recebe as fotos)

Se as fotos vierem em qualidade "phone snap" e precisarem de tratamento antes de subir:

**Aglaia entrega:**
- Correção de white balance (padronizar temperatura ~5200K para dar coerência entre par).
- Correção de exposição sutil (nunca > +/- 1 stop).
- Straighten (endireitar linhas verticais e horizontais).
- Crop leve para alinhar enquadramento before/after se ângulos divergirem <5°.
- Compressão para peso alvo (~400 KB).

**Aglaia NÃO faz:**
- Color grading estético (moody, teal & orange, film emulation).
- Retoque de superfície (esticar teto, apagar objeto).
- Composição fake (juntar 2 momentos em 1 foto).
- Adicionar / remover pessoas.
- Editar cor real da tinta ou do piso.

**Regra:** o after tem que ser reconhecível como fotografia do trabalho real. Se a foto original for fraca demais para servir, voltar ao Plano B (contratar fotógrafo) — não maquiar.

---

## 8. Integração no componente `BeforeAfter.tsx` — instrução para Harmonia

Aglaia entrega os 4 arquivos em `src/assets/`. Harmonia adiciona 2 novos cards no array de projetos da seção `#gallery` de `routes/index.tsx`, seguindo o padrão dos 2 existentes.

**Copy sugerida (Caliope valida):**

| Card | Título | Sub |
|---|---|---|
| **Card 3 — Flooring** | `Premium Hardwood Flooring` | `Solid hardwood install replacing worn carpet, seamless transitions, dust-controlled workspace.` |
| **Card 4 — Painting** | `Interior Repaint & Finishing` | `Fresh color, crisp trim, spotless finish — furniture protected, walls back better than new.` |

Ordem sugerida do slider: **Kitchen → Bathroom → Flooring → Painting** (mesma ordem dos cards de Services §4.5 da LP — reforça o scent match para quem chega de anúncio de qualquer um dos 4 temas).

---

## 9. QA visual antes de subir para o repo

- [ ] Ambos before/after de cada par foram tirados do **mesmo ângulo** (o slider revela crop desalinhado imediatamente).
- [ ] Resolução ≥ 1920×1080 nas 4 imagens.
- [ ] Peso ≤ 400 KB por arquivo (soma ≤ 1.6 MB).
- [ ] White balance coerente entre par (before e after do mesmo card).
- [ ] Canteiro limpo no after — nenhum resíduo, plastic drop cloth ou fita crepe visível.
- [ ] Nenhuma pessoa não autorizada no frame.
- [ ] Nenhum watermark visível.
- [ ] Nenhum móvel ou objeto pessoal identificável do cliente (privacidade).
- [ ] Preview no slider `BeforeAfter.tsx` local (Harmonia executa em dev) — deslizamento revela transição limpa, sem "salto".

---

## 10. Gaps conhecidos (dependências para destravar)

| # | Gap | Impacto | Quem resolve | Prazo |
|---|---|---|---|---|
| G1 | Thiago não confirmou disponibilidade de fotos before/after de Flooring/Painting | Bloqueia entrega — sem foto, sem card | Julio → Thiago | D+3 |
| G2 | Se G1 falha, Vilela precisa aprovar orçamento de fotógrafo local (~USD 600–1.200) | Bloqueia Plano B | Julio → Thiago (com endosso Bernardo) | D+4 |
| G3 | Direitos de uso das fotos (property release do cliente Vilela se foto identifica casa/interior) | Risco jurídico se cliente reconhece sua propriedade sem consent | Julio orienta Thiago a coletar release por escrito | D+5 |
| G4 | Se nenhum plano viabilizar em D+7: acionar Plano E (remover Flooring/Painting da LP) | Alto — quebra do scent match anúncio→LP | Aglaia + Caliope + Harmonia coordenam edit conjunto da seção Services | D+8 |

---

## 11. Aderência ao checklist Aglaia (`design-tokens-vilela.md` §11)

- [x] Não há paleta gráfica na peça (é foto). Não aplicável.
- [x] Não há escarlate na peça (é foto). Não aplicável.
- [x] Nenhum edit adiciona gradient, glow ou drop shadow.
- [x] Não há tipografia sobre a foto (título e sub do card ficam FORA da imagem, no componente).
- [x] Foto real Vilela (nunca stock — Plano D é último recurso e sinalizado como temp).
- [x] Não há trust badge sobre foto (fica no bloco Services da LP, não na foto).
- [x] Não aplicável.
- [x] Nenhum item "não é" (§1 dos tokens) presente.
- [x] Passa "teste do grounded" — foto sozinha comunica "esse contractor entrega e limpa o canteiro".
