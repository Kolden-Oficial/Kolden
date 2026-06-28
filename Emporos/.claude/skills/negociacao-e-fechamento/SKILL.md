---
name: negociacao-e-fechamento
description: >
  Use para conduzir a NEGOCIAÇÃO de um deal e levá-lo ao FECHAMENTO — tratar objeções, montar concessões
  dentro da política do Afrodite, criar urgência legítima e marcar ganho/perda com motivo. Cobre o mapa de
  objeções comuns, a faixa de concessão permitida, técnicas de fechamento e a regra de escalonamento
  (preço/prazo/escopo fora da política vira exceção a escalar, nunca decisão local). Gatilhos: "negociar",
  "objeção", "desconto", "fechar", "closing", "o cliente travou", "está caro", "concessão". Donos:
  redator-de-propostas + emporos-chief.
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
