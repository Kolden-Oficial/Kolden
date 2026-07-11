---
name: cadencia-de-outbound
description: >
  Use para abrir ou manter conversa comercial por OUTBOUND — desenhar cadências multi-toque (dias,
  canais, mensagens), escrever cold email/abordagem 1:1 personalizada, e levantar/enriquecer listas de
  prospecção no ICP. Cobre estrutura de sequência, regra de saída e opt-out, gancho de personalização e
  follow-up de retomada — sempre respeitando o destinatário (sem blast). Gatilhos: "cadência", "outbound",
  "cold email", "sequência de outreach", "prospecção", "prospectar", "follow-up", "abrir conversa",
  "lista de prospects", "Apollo". Dono: executivo-de-cadencia. Apollo/Common Room/GHL via Infisical.
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Cadência de Outbound

Faz o contato comercial acontecer de forma sistemática e personalizada. Outbound respeita o destinatário
(opt-out, frequência, personalização real) ou não sai — é veto do squad.

## 1. Anatomia de uma cadência
- **Objetivo** — abrir conversa / agendar reunião / reativar lead parado.
- **Toques** — 5 a 9 toques típicos, distribuídos em ~2-3 semanas.
- **Canais** — alterne e-mail, ligação, social (LinkedIn) e nota/vídeo; não repita o mesmo canal seguido.
- **Intervalo** — espace os toques (ex.: D0, D2, D5, D9, D14); aperto demais vira perseguição.
- **Regra de saída** — quando parar (respondeu, opt-out, N toques sem reação → volta a nutrir).

## 2. Estrutura do cold email / abordagem 1:1
1. **Gancho** — referência real e específica ao prospect (não "vi que você é CEO").
2. **Ponte** — conecta o gancho à dor que a oferta resolve.
3. **Valor** — uma frase de proposta de valor concreta (sem inventar feature).
4. **CTA de baixo atrito** — pergunta simples ou convite curto, não "fecha agora".
5. **PS opcional** — prova social ou reforço leve.

Mantenha curto, escaneável, 1 ideia por toque. Variáveis `{nome}`, `{empresa}`, `{gancho}` preenchidas
por dados reais.

## 3. Prospecção e enriquecimento
- Construa a lista dentro do ICP (segmento, porte, cargo) — qualidade > volume.
- Enriqueça contato/empresa por **Apollo** e sinais GTM por **Common Room** antes de personalizar.
- Priorize a fila por fit + sinal de intenção; descarte fora do ICP.

## 4. Follow-up de retomada
Para leads parados (não recusados): sequência curta de 2-3 toques com novo ângulo (caso, novidade,
pergunta diferente). Nunca reabrir lead já recusado pelo qualificador.

### Signal-based selling (G26)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G26, MIT)._

Outbound moderno opera por SINAIS, não listas. Speed-to-signal < 30min separa winner de loser.

**3 tiers de sinais:**

**Tier 1 — Sinais ativos (alta intenção):**
- Visita ao pricing page (G2/6sense/Demandbase)
- Download de whitepaper sem cold email
- Inscrição em webinar concorrente
- Job posting com palavra-chave do produto
- Funding round + uso de orçamento

**Tier 2 — Sinais organizacionais:**
- Hiring de role-chave (VP Sales contratado = 90d depois = compra ferramenta)
- Mudança de C-level
- Aquisição/fusão
- Mudança de stack tecnológica

**Tier 3 — Sinais technographic:**
- Tecnologia A presente + tecnologia complementar B ausente = compra B em 6-12m
- Stack outdated (sinal de upgrade pending)
- Sites: BuiltWith, Wappalyzer, similar

**Speed-to-signal:**
- Tier 1: < 30min response
- Tier 2: < 4h response
- Tier 3: incluir em sequência semanal

### Anatomia de cold email de alta conversão (G28)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G28, MIT)._

**Estrutura canônica:**
- **Subject (3-5 palavras lowercase):** específico, sem CAPS, sem emoji
  - Bom: "ideia rápida pro novo lançamento"
  - Ruim: "OFERTA ESPECIAL HOJE!!!"
- **Opening (1 frase baseada em sinal):** evidência que você fez homework
  - "Vi que vocês contrataram VP Sales mês passado e..."
- **Valor (2-3 frases):** problema → outcome → prova social
- **CTA único de baixa fricção:** "Faz sentido 15min na terça às 14h?" (não "agendar reunião")

**Benchmarks por personalização:**
- Sem personalização: 1-3% reply rate
- Personalização por sinal (Tier 2/3): 8-12%
- Hiper-personalização (Tier 1 + research): 18-25%

**Comprimento:** 75-125 palavras. > 150 = ignorada.

### Sequência multi-canal 8-12 toques em 3-4 semanas (G29)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G29, MIT)._

**Cadência canônica:**

| Toque | Canal | Conteúdo | Dia |
|---|---|---|---|
| 1 | Email | Initial outreach baseado em sinal | D0 |
| 2 | LinkedIn | Connection request com nota | D2 |
| 3 | Email | Valor + caso de uso similar | D5 |
| 4 | Telefone | "Vi que vc abriu meu email semana passada..." | D7 |
| 5 | LinkedIn | Voice message ou comment em post | D10 |
| 6 | Email | Mudança de ângulo (outro outcome) | D14 |
| 7 | Telefone | Tentativa em outro horário | D17 |
| 8 | Email | Recurso útil sem pitch (give-give-ask) | D21 |
| 9 | LinkedIn | InMail (se conexão recusada) | D24 |
| 10 | Telefone | Última tentativa | D28 |
| 11 | Email | Breakup email | D30 |
| 12 | Reativação | 90d depois | D120 |

**Regra "cada toque novo ângulo de valor":** sem repetir o mesmo pitch
**Breakup email:** "vou pausar contato — me avise se algo mudar". Surpreendentemente: 12-15% replyam.

**Anti-padrões:**
- 12 toques com mesma mensagem (vira spam)
- Só email (multi-canal é 3x melhor)
- Cadência sem breakup (perde respond rate de "última chance")

## Saída
Use o formato do agente `executivo-de-cadencia` (ALVO / OBJETIVO / SEQUÊNCIA por toque / PEÇA /
PERSONALIZAÇÃO / PRÓXIMO PASSO + DONO + DATA). Toques registrados no GHL; credenciais via Infisical.

---
*Princípios reescritos (sem cópia literal) a partir de: anthropics/knowledge-work-plugins@78d74d5
(Apache-2.0) — plugin `sales` (draft-outreach, account-research) + conectores `apollo` e `common-room`;
alirezarezvani/claude-skills@4a3c05b (MIT) — cluster comercial G19 + cold-email (G4).*

*Blocos Signal-based (G26) + Anatomia de cold email (G28) + Sequência 8-12 toques em 3-4 semanas
(G29) adaptados de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
Reescrito sem cópia literal. Herança histórica: Kyle Coleman (Clari — signal-based selling
moderno); time Common Room (community-led signal); Aaron Ross ("Predictable Revenue", 2011 —
cadência multi-toque); Jason Bay (Blissful Prospecting — anatomia de cold email de alta
conversão); Josh Braun (breakup email).*
