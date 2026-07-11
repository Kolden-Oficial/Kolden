---
name: negociacao-e-fechamento
description: >
  Use para conduzir a NEGOCIAÇÃO de um deal e levá-lo ao FECHAMENTO — tratar objeções, montar concessões
  dentro da política do Afrodite, criar urgência legítima e marcar ganho/perda com motivo. Cobre o mapa de
  objeções comuns, a faixa de concessão permitida, técnicas de fechamento e a regra de escalonamento
  (preço/prazo/escopo fora da política vira exceção a escalar, nunca decisão local). Gatilhos: "negociar",
  "objeção", "desconto", "fechar", "closing", "o cliente travou", "está caro", "concessão". Donos:
  redator-de-propostas + emporos-chief.
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Negociação e Fechamento

Conduz o deal do "quase" ao "sim" sem queimar margem nem prometer fora da política. Concessão fora da
faixa do Afrodite é **escalonamento**, não decisão do squad — é veto.

## 1. Mapa de objeções comuns
| Objeção | O que costuma significar | Resposta (ângulo) |
|---|---|---|
| "Está caro" | Valor não ficou claro vs preço | Reancore no ROI/dor; quebre o custo de não-agir |
| "Preciso pensar" | Falta urgência ou um decisor ausente | Descubra o bloqueio real; mapeie o decision process |
| "Vou ver com a equipe" | Champion sem munição | Arme o champion com material 1-pager |
| "Concorrente X é mais barato" | Comparação por preço, não por valor | Diferencie por critério de decisão, não por desconto |
| "Agora não é a hora" | Timeline frouxa / sem evento gatilho | Crie urgência legítima (janela, capacidade, custo crescente) |

## AECR — objection handling estruturado

### AECR — Acknowledge → Empathize → Clarify → Reframe

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G17, MIT)._

Toda objeção segue padrão emocional + racional. Tratar só o racional perde — tratar só o emocional não fecha. AECR cobre ambos.

**Sequência:**

1. **Acknowledge:** "Entendi, [resumo da objeção em 1 frase]"
   - NUNCA: "Mas..." (invalida)
   - Reconhece sem concordar

2. **Empathize:** "Faz sentido você pensar assim porque [contexto]"
   - Mostra que entende ANGÚSTIA (não só o argumento)
   - Conecta com experiência similar

3. **Clarify:** "Pode me dizer mais sobre [aspecto específico]?"
   - Descobre objeção REAL (frequentemente diferente da objeção declarada)
   - Pergunta socrática (não disfarçada de venda)

4. **Reframe:** "[Nova perspectiva que mantém valor + resolve a preocupação]"
   - NÃO é "mas pense assim" — é abertura de novo ângulo
   - Baseado no que descobriu no Clarify

**Distribuição típica de objeções (benchmark B2B SaaS):**
- 48% budget ("muito caro" / "sem verba")
- 32% timing ("não é o momento" / "Q4")
- 20% competition (incluindo "fazer nada")

**Mapeamento por categoria:**
- Budget → Reframe ROI/payback/oportunidade
- Timing → Reframe custo de espera + janela competitiva
- Competition → Reframe diferenciação por outcome (não feature)

**Anti-padrões:**
- Pular Empathize (vira robô)
- Saltar Clarify e ir direto a Reframe (assume objeção errada)
- Reframe agressivo ("você não está vendo claramente")
- Tratar objeção de budget com mais features (desencontro)

## 2. Faixa de concessão (dentro da política do Afrodite)
- Conceda **com contrapartida** (prazo maior, volume, case, antecipação), nunca desconto gratuito.
- Conheça a **faixa permitida** pela política; opere dentro dela.
- Fora da faixa (desconto/prazo/escopo) → **EXCEÇÃO**: documenta e escala ao `emporos-chief` → Afrodite.

## 3. Técnicas de fechamento (legítimas)
- **Fechamento por resumo** — recapitule valor acordado + próximos passos e peça o sim.
- **Fechamento por próximo passo** — agende a etapa seguinte concreta (assinatura, kickoff).
- **Urgência real** — janela de capacidade/preço verdadeira; nunca urgência falsa.
Evite pressão manipulativa — fechamento sustentável > deal forçado que cancela.

## 4. Registro
Ganho ou perda **sempre com motivo** no GHL (alimenta forecast e aprendizado). Deal ganho → handoff de
expansão/retenção (sinaliza ao Afrodite). Deal perdido → motivo + eventual retomada futura.

## Saída
Bloco de negociação no formato do `redator-de-propostas` (objeção → resposta · concessão proposta dentro
da faixa · exceção a escalar) + atualização de estágio pelo `gestor-de-crm`. Próximo passo + dono + data.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (MIT) —
cluster comercial G19 (deal-desk, commercial-policy, channel-economics); anthropics/knowledge-work-plugins@78d74d5
(Apache-2.0) — plugin `sales` (competitive-intelligence, call-prep).*

*Bloco AECR (Acknowledge → Empathize → Clarify → Reframe) adaptado de
github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales, ID G17. Reescrito sem cópia
literal. Herança histórica: Chris Voss ("Never Split the Difference", 2016 — lente FBI/tactical
empathy), Anthony Iannarino ("The Lost Art of Closing"), princípios de negociação Harvard (Fisher &
Ury) integrados ao ciclo Acknowledge→Empathize→Clarify→Reframe.*
