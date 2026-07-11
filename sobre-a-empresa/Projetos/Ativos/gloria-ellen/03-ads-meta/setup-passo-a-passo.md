---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/precisso-do-passo-a-passo-desde-o-inicio-tanto-p|precisso-do-passo-a-passo-desde-o-inicio-tanto-p]]"
---

# Setup Meta Ads — passo a passo (litoral catarinense)

Guia prático pra colocar o ad no ar em 60-90 min. Assume conhecimento zero.

---

## Pré-requisitos (fazer antes de criar ad)

### 1. Conta Meta Business Suite
- URL: https://business.facebook.com
- Se a Glória não tiver, criar com o e-mail principal dela.
- Vincular a Página do Instagram (@gloria.ellen) e Facebook (se tiver).

### 2. Instagram profissional
- No IG dela, ir em Settings → Account → Switch to Professional Account → Business.
- Categoria: **Photographer**.
- Isso libera os ads e o botão de contato.

### 3. Configurar botão de contato no IG
- IG > Edit Profile > Contact Options.
- Adicionar: WhatsApp Business Number = (47) 9251-0159.
- Isso põe botão de WhatsApp direto no perfil dela.

### 4. Pixel do Meta (opcional mas útil)
- Não é obrigatório pra rodar ad de WhatsApp. Pode pular na primeira campanha.
- Se quiser instalar no site Alboom: pedir ao suporte Alboom pra colar código no header. (Alboompro pode não permitir — checar.)

### 5. Método de pagamento
- Adicionar cartão de crédito no Meta Ads.
- Configurar limite diário de gasto = R$50 (pra segurança).

---

## Configuração da campanha principal

### Objetivo
**Engagement → Messages → WhatsApp**

*Por que:* Quer conversa direta, não visita ao site. WhatsApp = conversão real.

### Nome da campanha
`Estreia no Vale 2026-07 | WhatsApp`

### Estrutura em 3 conjuntos de anúncio (ad sets)

Um por segmento. Cada um recebe 1 criativo dos 3 do arquivo `criativos-meta-ads.md`.

---

### Ad Set 1 — Ensaio praia (público principal)

**Público:**
- **Localização:** Balneário Camboriú + Camboriú + Itajaí + Navegantes + Itapema + Porto Belo + Bombinhas + Balneário Piçarras + Penha + Barra Velha (raio cidade + 20km cada). **Excluir:** Blumenau, Brusque, Pomerode.
- **Idade:** 28-45.
- **Gênero:** Mulheres.
- **Interesses (empilhados, Meta escolhe combinação):**
  - Photography (fotografia)
  - Wedding photography
  - Portrait photography
  - Pilates ou Ballet (público estético e disciplinado)
  - Fashion (moda)
  - Yoga
  - Wine tasting
  - Interior design
- **Comportamentos:**
  - Engaged shoppers (compradores engajados)
  - Travel (viagens internas)
- **Exclusões:** — (nenhuma na primeira rodada)

**Orçamento:**
- R$45/dia
- Duração inicial: 3 dias
- Após teste: se ganhar, escala pra R$90-135/dia.

**Criativo a usar:** Criativo 1 (emocional) ou Criativo 3 (vídeo).

---

### Ad Set 2 — Pré-wedding

**Público:**
- **Localização:** Florianópolis + São José + Palhoça + Biguaçu + Tijucas + Balneário Camboriú + Itapema + Itajaí + Navegantes + Penha (cidade + 20km cada). **Excluir:** Blumenau, Brusque.
- **Idade:** 25-40.
- **Gênero:** Mulheres.
- **Interesses:**
  - Engagement (noivado)
  - Wedding planning
  - Bride
  - Newlywed
  - Fine art wedding
  - Wedding photography
- **Comportamentos:**
  - Recently engaged (recém-noivas) — se aparecer, é ouro
  - Life events → Newly engaged
- **Exclusão:** já casados (excluir "Married")

**Orçamento:**
- R$45/dia
- Duração: 3 dias.

**Criativo:** Criativo 1 (versão emocional) mas trocar copy pra falar de pré-wedding.

---

### Ad Set 3 — Retorno emocional (voz autoral)

**Público:**
- **Localização:** litoral catarinense — Florianópolis + Balneário Camboriú + Itapema + Itajaí + Navegantes + Penha + Balneário Piçarras + Barra Velha (cidade + 25km cada). **Excluir:** Blumenau.
- **Idade:** 30-50.
- **Gênero:** Mulheres.
- **Interesses:**
  - Motherhood
  - Family
  - Personal growth
  - Meditation
  - Philosophy
  - Poetry
  - Literary
  - Coaching
- **Comportamentos:** —

**Orçamento:**
- R$45/dia.

**Criativo:** Criativo 3 (vídeo).

**Racional:** captura público reflexivo alinhado ao YT dela + a voz autoral.

---

## Configurações comuns aos 3 ad sets

### Optimization
- **For:** Conversations (WhatsApp).
- **Attribution setting:** 7-day click.
- **Bid strategy:** Highest volume (deixar Meta otimizar sem cap).

### Placements
- **Advantage+ Placements:** ON.
- Isso deixa Meta rodar em Feed + Stories + Reels + Explore.

### Schedule
- **Start date:** 2026-07-03 (dia 1 da campanha).
- **End date:** 2026-07-14 23h59 (dia 12).
- **Delivery type:** Standard.

### Ad-level

Em cada ad, campo `WhatsApp message pre-fill` (aparece quando escolhe Messages/WhatsApp como objetivo):
> "Olá Glória, vim pela Estreia no Vale — [anúncio X]"

Isso ajuda a rastrear qual criativo trouxe a conversa.

---

## Métricas a monitorar (diário)

Abrir Ads Manager 1×/dia. Anotar na planilha do arquivo `07-instrumentacao/planilha-acompanhamento.md`:

| Métrica | Alvo | Ação se ruim |
|---|---|---|
| Impressões (impressions) | 3.000-8.000/dia por ad set | Aumentar orçamento se < 2.000 |
| Alcance (reach) | 60-70% das impressões | Se < 40%, público pequeno demais |
| CTR (click-through rate) | > 1% | Trocar imagem se < 0.7% |
| CPM (custo por 1000 impressões) | R$15-40 | Aceitável até R$60 |
| Custo por resultado (WhatsApp conversation) | R$15-30 | Pausar ad se > R$50 sustentado |
| Frequência (frequency) | < 3 nos primeiros 5 dias | Pausar / trocar criativo se > 3.5 |

---

## Dia 4 — decisão do vencedor

**Regra:**
1. Se um ad set tem CPL 30%+ menor que os outros → alocar 60% do orçamento nele.
2. Se dois estão empatados → dividir 50/50 entre eles.
3. Se todos estão com CPL > R$40 → pausar e refazer criativos.

**Escala:**
- Dia 4: dobrar orçamento do vencedor (R$45 → R$90/dia).
- Dia 6: se mantendo CPL bom, subir pra R$120/dia.
- Dia 8-12: se CPL cair pra R$8-15, subir agressivo (R$180-250/dia).

**⚠️ Regra de escala:** NUNCA aumentar mais de 100% do orçamento em 24h (reseta o algoritmo). Ex: R$45 → R$90 OK. R$45 → R$180 quebra.

---

## Retargeting a partir do dia 5

### Custom Audience 1 — Video viewers
- Source: Instagram account @gloria.ellen.
- People who watched at least 25% of ANY video ad.
- Últimos 30 dias.

### Custom Audience 2 — Engagement IG
- Anyone who interacted with your account.
- Últimos 30 dias.

### Ad de retargeting
- Criar novo Ad Set com essas 2 audiences (União).
- Orçamento: R$30/dia dias 5-12 = R$240.
- Criativo: usar Criativo 2 (direto) modificado com "Você deu uma olhada, mas ainda não conversamos..." (ver arquivo criativos).

---

## Emergency stop

**Pausar tudo se:**
- Gasto ultrapassar R$150 em 24h sem gerar nenhuma conversa (algo tá errado).
- CPM > R$100 sustentado (público errado).
- Comentário público problemático (ex: reclamação séria) → pausar até responder.

---

## Backup: se ela não quiser rodar Meta Ads

Alternativa 100% orgânica pra bater a meta (mais difícil):
- Postar 3× por dia no IG (feed + stories + Reels).
- Enviar reels diariamente pros grupos de WhatsApp de mulheres/mães/noivas do Vale.
- Postar 1 Reel por dia comentando em posts de outros fotógrafos locais (roubar audiência).
- Fazer parcerias barter com 3-4 microinfluencers locais (dar ensaio grátis em troca de post).

**Risco:** volume não escala em 12 dias. Meta pago é o multiplicador.

---

## Passo a passo visual (checklist final)

- [ ] Meta Business Suite criado
- [ ] IG convertido para Professional/Business
- [ ] WhatsApp linked no perfil IG
- [ ] Cartão de crédito adicionado no Ads
- [ ] Limite diário R$50 configurado (segurança)
- [ ] Campanha "Estreia no Vale 2026-07" criada com objetivo Messages/WhatsApp
- [ ] Ad Set 1 (ensaio praia) montado
- [ ] Ad Set 2 (pré-wedding) montado
- [ ] Ad Set 3 (retorno emocional) montado
- [ ] 3 criativos uploadados
- [ ] WhatsApp pre-fill message configurado em cada ad
- [ ] Start date 2026-07-03 configurado
- [ ] Publicar (Publish)
- [ ] Anotar link/ID das campanhas na planilha
