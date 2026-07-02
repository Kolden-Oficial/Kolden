---
name: poc-com-gate-binario
description: |
  Desenha Proof of Concept (POC) com GATE BINÁRIO — sucesso/fracasso escrito ANTES da POC
  começar, com métrica objetiva, timebox e critério de aceite. Blinda contra scope creep
  ("ah, só mais essa coisinha") e contra a POC que "quase deu certo" (que na verdade
  fracassou, mas o rep entrega assim mesmo). Regra dura: se falhar no gate, DEAL FICA SEM
  POC-recuperador — não vira contra-POC infinita nem virou "projeto pago disfarçado".
  Use quando um deal enterprise entra em fase de prova técnica. Handoff a Prometeu se a POC
  exigir código-cliente (harness).
domain: sales-enterprise
subdomain: sales-engineering
tier: 1
agente_dono: engenheiro-de-pre-vendas
heranca_historica:
  - simon-kaplan
  - presales-collective
  - saas-pre-sales-patterns
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G20)
status: semente
---

# POC com Gate Binário

> A POC (Proof of Concept) sem gate binário é a maior armadilha de tempo em vendas
> enterprise. Sem critério de sucesso definido antes, toda POC termina em zona cinza —
> "funcionou parcialmente" — e o deal desliza indefinidamente. Com gate binário, você
> tem exatamente 2 resultados possíveis: **PASS** (deal avança para contrato) ou
> **FAIL** (deal encerra ou renegocia escopo, sem POC-recuperador). Sem meio-termo.

## Herança histórica

- **Simon Kaplan — SaaS Pre-Sales Patterns (Sales Engineering Guild, 2017+)**. Um dos
  primeiros a codificar o padrão "binary success criteria" em SaaS enterprise. Argumento
  central: POC de SaaS que "quase deu certo" tem probabilidade > 70% de nunca virar
  contrato — porque "quase" significa que o valor não foi provado, e o comprador não
  aprova orçamento sem valor provado. A ambiguidade destrói o deal, não protege.
- **Presales Collective (2020+)**. Comunidade global de SEs. Codificou o "POC Charter"
  como documento padrão: success criteria + scope + timebox + go/no-go. Presales
  Collective também empurrou a norma "POC ≠ pilot" — POC prova hipótese; pilot é uso
  operacional. Confundir os dois é fonte de scope creep.
- **Contexto raiz**: a lógica de gate binário vem do stage-gate model de gestão de
  projetos (Robert Cooper, "Winning at New Products", 1986) e do binary outcome de
  clinical trials (FDA phase-gate). A adaptação para SaaS pre-sales foi natural — mesma
  filosofia: se não passou o critério pré-definido, não é sucesso.
- **Divergência com "extended trial"**: modelo de trial estendido (Salesforce clássico
  15/30 dias) NÃO é POC — é conversão SaaS self-serve. POC enterprise exige critério
  definido, dado do cliente, ambiente controlado e gate.

## Anatomia do POC Charter — 8 blocos

Documento assinado pelas duas partes ANTES da POC começar. Se a contraparte se recusa
a assinar, é sinal claro: ela não está comprometida, e a POC vai virar projeto pago
disfarçado.

### 1. Contexto do deal
- Prospect / valor estimado do deal / ciclo / stakeholder-champion / stakeholder-decisor.
- Por que POC (o que ficou por provar após demo).

### 2. Success Criteria BINÁRIOS (3 é o número ideal)
Cada critério tem 4 partes: **métrica** + **limiar** + **como medir** + **quem valida**.

**Exemplo bom**:
- Critério 1: Latência de sync entre [sistema A] e [sistema B] < 500ms em 95% das
  operações. Medido via logs do próprio produto durante 5 dias úteis. Validado por
  [Head de Eng do prospect].
- Critério 2: Integração processa 100% dos [tipo de registro] do subset de 10k
  registros de produção reais fornecidos. Medido por match de count e checksum.
  Validado por [Data Lead do prospect].
- Critério 3: 3 usuários-alvo completam o fluxo [X] sem intervenção do time
  Kolden em < 10 min. Medido por sessão gravada. Validado por [Champion + Head de
  Ops do prospect].

**Exemplo ruim (rejeitar)**:
- "O produto funciona bem no nosso ambiente." [subjetivo, não mensurável]
- "O time gosta." [não binário]
- "Se resolver nossos problemas." [nomear quais]

### 3. Escopo — o que ENTRA
- Integrações específicas.
- Volume de dado (subset, não produção inteira).
- Ambiente (sandbox do prospect, staging, produção limitada).
- Usuários envolvidos (nome + papel).
- Features do produto disponíveis na POC.

### 4. Fora de escopo — o que NÃO entra
**Bloco crítico anti-scope-creep.** Lista explícita.
- "POC não cobre integração com [sistema Z] — se necessário, vira nova fase pós-contrato."
- "POC não cobre treinamento do time de [time X] — nova fase pós-contrato."
- "POC não cobre customização de [feature Y] — nova fase pós-contrato."

Sem esta lista, cada "ah, será que dá pra ver…" vira 3 semanas a mais.

### 5. Timebox
Data de início + data de fim + reviews intermediárias.
- Semana 0: kickoff + setup.
- Semana 1: acesso e primeiros testes.
- Semana 2: coleta de dado dos 3 critérios.
- Semana 3: review final + veredito PASS/FAIL.

**Timebox máximo recomendado**: 30 dias corridos. POC > 30 dias vira projeto disfarçado,
independentemente de bons argumentos. Se a natureza técnica exige > 30 dias, é pilot pago,
não POC.

### 6. Review de segurança (Egide)
POC que toca dado real do prospect, infraestrutura do prospect, ou envolve credenciais
DEVE passar por review do squad Egide antes de começar.
- Necessário: sim/não.
- Pontos a validar: <lista>.
- Bloqueio se: <critério>.

### 7. Veredito e consequências — BINÁRIO
Este é o coração do gate:
- **PASS** (todos os critérios atendidos): → contrato, escopo, prazo, dono.
- **FAIL** (qualquer critério não atendido): → deal encerra, ou renegocia escopo
  reduzindo o produto. **Sem POC-recuperador.** Sem "quase deu certo, vamos tentar de
  novo". Sem "e se a gente ajustar o critério retroativamente?".

Regra do sem-POC-recuperador: se o time do prospect vira e diz "quase deu, dá pra
gente rodar mais 2 semanas?", a resposta padrão é NÃO. Renegocia contrato reduzindo
escopo ao que funcionou, ou encerra. Contra-POC infinita é o padrão que queima 6 meses
de ciclo de venda.

### 8. Próximo passo (se PASS)
- Contrato assinado até: <data>.
- Onboarding começa: <data>.
- Rollout completo: <data>.
- Escopo do contrato: <espelha o que passou na POC + expansão negociada>.

## Fluxo operacional em 4 fases

### Fase A — Antes da POC (semana -2 a 0)
1. Rascunhar o POC Charter (8 blocos).
2. Revisão interna com AE + SE + Chief.
3. Revisão de segurança (Egide) se aplicável.
4. Apresentar ao champion do prospect — negociar critérios.
5. **Assinar as duas partes (email formal ou documento).** Sem assinatura, não começa.
6. Marcar kickoff.

### Fase B — Durante a POC (semana 1 a 3)
1. Kickoff com todos os envolvidos + revisão do Charter em voz alta.
2. Setup + acesso.
3. Reviews intermediárias semanais — 30 min.
4. **Log de scope creep**: toda solicitação "ah, será que dá pra…" vai para lista.
   Nada aceito silenciosamente. Cada item avaliado: (a) entra no escopo (raro), (b) vira
   fase pós-contrato, (c) rejeitado.
5. Coleta objetiva dos dados dos 3 critérios — não estimativa; medida real.

### Fase C — Veredito (semana 3 fim)
1. Reunião de review — champion + decisor do prospect + AE + SE.
2. Ler cada critério em voz alta + apresentar o dado.
3. **Veredito binário** — PASS ou FAIL — declarado na reunião, sem "vou olhar depois".
4. Se PASS: próximo passo com data (contrato).
5. Se FAIL: agradecer + renegociar escopo reduzido OU encerrar deal.

### Fase D — Pós-POC
1. Registrar veredito no CRM (higiene-de-pipeline-crm).
2. Se PASS: proposta comercial imediata (redacao-de-proposta-comercial).
3. Se FAIL: análise post-mortem interna — qual critério falhou, por quê, o que aprendemos.

## Prevenção de scope creep — protocolo

Toda vez que um novo requisito aparecer durante a POC:

```
REQUISITO NOVO: <descrição>
VEIO DE: <pessoa + role>
IMPACTO NO CHARTER: <afeta critério X / escopo Y / prazo>
DECISÃO:
  [ ] Entra no escopo — justificar: <por quê é essencial pro critério>
  [ ] Vira fase pós-contrato — registrar como ADD-ON
  [ ] Rejeitado — comunicar ao champion
DATA: <...> · DONO: <SE ou AE>
```

Nada é engolido silenciosamente. Toda decisão registrada.

## Handoff a Prometeu — quando a POC exige código

Se a POC exigir código-cliente (harness de teste, script de integração, dashboard
customizado), o SE NÃO escreve o código sozinho — handoff a Prometeu:
- SE lava contrato do que precisa ser construído (specs).
- Prometeu constrói o harness (spec-build-review).
- SE opera a POC com o harness pronto.

Escrever código de POC ad-hoc queima tempo do SE e produz artefato descartável sem
qualidade. Prometeu monta harness reutilizável.

## Fronteiras

- **POC vs pilot** — POC prova hipótese binária em subset controlado (≤30 dias). Pilot
  é uso operacional em produção parcial pago (60–90 dias). Confundir gera scope creep.
- **POC vs demo** — demo mostra o wow (`demo-invertida-por-impacto`). POC prova com
  dado real. POC sem demo prévia é raro; se acontece, é sinal de ceticismo forte.
- **POC vs trial self-serve** — trial é conversão SaaS (login → uso → paywall). POC é
  processo enterprise com champion, critérios, review.
- **POC sem gate binário = projeto pago disfarçado.** Veto absoluto.

## Vetos

- **Nunca começar POC sem POC Charter assinado pelas duas partes.** Sem assinatura,
  o prospect não está comprometido, e a POC vai desandar.
- **Nunca aceitar critério subjetivo** ("se o time gostar"). Se o prospect insiste,
  reescreva com métrica proxy ("3 usuários completam fluxo X sem ajuda").
- **Nunca conceder POC-recuperador após FAIL.** Contra-POC infinita queima 6 meses.
  Se FAIL, renegocia escopo ou encerra — não "mais 2 semanas".
- **Nunca aceitar scope creep silenciosamente.** Toda solicitação nova passa pelo
  protocolo de decisão.
- **POC com dado real / segurança envolvida sem review do Egide = HALT.**
- **Timebox > 30 dias sem justificativa técnica escrita = HALT.**
- **SE não escreve código-cliente sozinho** — handoff a Prometeu.

## Handoffs

- **PASS + próximo passo contrato** → `redacao-de-proposta-comercial` +
  `negociacao-e-fechamento`.
- **FAIL + escopo renegociável** → `estrategia-de-deal-complexo` para redesenhar deal.
- **FAIL + encerramento** → `higiene-de-pipeline-crm` para fechar oportunidade com
  motivo.
- **POC exige código-cliente** → Prometeu (squad de engenharia) via `spec-build-review`.
- **POC exige review de segurança** → squad Egide.
- **Champion sumiu durante POC** → aplicar `upfront-contract` para forçar decisão de
  cenário.

## Atribuição

Princípios reescritos de SaaS Pre-Sales Patterns (Simon Kaplan, Sales Engineering Guild
2017+), do Presales Collective (2020+), do stage-gate model (Robert Cooper, "Winning at
New Products", 1986) e do padrão binary success criteria em SaaS enterprise. Síntese
própria em PT-BR — sem cópia literal.

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
