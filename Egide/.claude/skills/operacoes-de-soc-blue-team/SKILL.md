---
name: operacoes-de-soc-blue-team
description: >-
  Use quando o trabalho for OPERAR o centro de defesa, não escrever a regra nem
  reversar a amostra: triar e priorizar alertas de SIEM, montar a matriz de
  escalonamento por severidade/SLA, estruturar tiers de SOC (T1/T2/T3), escrever
  runbook/playbook de resposta para uma classe de incidente, definir métricas e
  KPIs (MTTD/MTTR, taxa de falso positivo), e analisar logs de auditoria
  (Linux/O365/K8s) em busca de intrusão. É o eixo de operações de SOC/blue-team da
  Égide — a sala de operações que consome detecção e produz resposta priorizada.
  Para autoria de regra use engenharia-de-deteccao; para caça proativa use
  caca-a-ameacas; para conduzir o incidente em si use forense-e-resposta.
domain: ciberseguranca
subdomain: operacoes-de-soc
tags: [soc, blue-team, siem, triagem, escalonamento, sla, runbook, kpi, mttr, audit-log]
---

# Operações de SOC / Blue-Team

> Defensiva e operacional. O SOC vive ou morre por **priorização**: alerta tratado fora de ordem é
> incidente perdido. A meta não é "ver tudo", é decidir o que merece atenção humana agora, com SLA, e
> não queimar o analista em falso positivo.

## O que é (e não é) este eixo

Operar o SOC = receber sinal (alerta da regra, anomalia de UEBA, log de auditoria) e convertê-lo em
**ação priorizada**: triar → classificar → escalar → responder/registrar. Autoria de regra é a fábrica
(`engenharia-de-deteccao-sigma-yara`); caça proativa é `caca-a-ameacas-orientada-a-hipotese`; condução
forense do incidente é `forense-digital-e-resposta-a-incidente`. Aqui é a **sala de operações**.

## Estrutura de tiers (referência)
- **T1 — Triagem**: monitora fila/dashboards, classifica verdadeiro/falso positivo, resolve P3/P4, escala
  o que excede o runbook.
- **T2 — Investigação**: aprofunda P1/P2, correlaciona múltiplas fontes, conduz contenção inicial.
- **T3 — Caça/forense/engenharia**: hunting, forense profunda, melhoria de detecção, fecha o loop com a
  fábrica de regras.

## Matriz de escalonamento (como montar)
Severidade moderna é **dirigida por contexto**, não só pelo nível do alerta: combine criticidade do
ativo + sensibilidade do dado + risco de negócio + estágio da kill chain.

| Severidade | Critério | SLA de resposta | Caminho |
|---|---|---|---|
| P1 (crítico) | ativo crítico + comprometimento ativo / impacto em produção | minutos | T2/T3 + on-call + liderança |
| P2 (alto) | técnica de alto risco confirmada, sem impacto pleno ainda | < 1h | T2 |
| P3 (médio) | suspeita que pede investigação, baixo blast radius | horas | T1 → T2 se confirmar |
| P4 (baixo) | informativo / provável FP | turno | T1 resolve/documenta |

Defina por linha: quem é acionado, por qual canal, e o gatilho de subir um nível. Sem caminho de
notificação explícito, a matriz é decorativa.

## Workflow de triagem (por alerta)
1. **Contextualizar**: ativo, usuário, horário, baseline. O comportamento é anômalo *para este host*?
2. **Classificar**: verdadeiro positivo / falso positivo / benigno-suspeito. FP recorrente vira feedback
   para a fábrica de regras (filtro/allowlist), não tarefa repetida eternamente.
3. **Priorizar**: aplicar a matriz (severidade x contexto), não o nível cru da regra.
4. **Agir**: seguir o runbook da classe de incidente; conter quando autorizado; escalar quando excede.
5. **Registrar**: timeline, decisão, IOCs. Alimenta métrica e CTI.

## Runbook/playbook (anatomia)
Por classe de incidente (ransomware, phishing, conta comprometida, exfil): **gatilho de ativação →
passos de validação → contenção → erradicação → recuperação → critério de fechamento → lições**. O
runbook é determinístico no que dá, e marca claramente onde exige julgamento humano.

## Métricas que importam
- **MTTD / MTTR** (detecção / resposta) — meta de redução contínua; automação e bons runbooks cortam o
  ciclo drasticamente.
- **Taxa de falso positivo por regra** — driver direto de fadiga; FP alto = regra volta para a bancada.
- **Cobertura ATT&CK** — onde há detecção e onde há cego.
- **Taxa de escalonamento correto** — T1 escalando certo (nem reter P1, nem inundar T2).

## Análise de log de auditoria (intrusão)
Linux auditd, O365/Entra, Kubernetes audit: procure desvio de baseline — autenticação anômala, criação de
privilégio, acesso a recurso sensível fora de padrão, sequência que forma kill chain. Correlacione fontes;
um evento isolado raramente decide.

## Anti-falha
- Triar por ordem de chegada em vez de severidade = P1 perdido na fila.
- Tratar FP recorrente como trabalho novo a cada vez, em vez de devolver para a regra.
- Matriz sem caminho de notificação e SLA = teatro de processo.

## Herança histórica

**Eric M. Hutchins, Michael J. Cloppert e Rohan M. Amin** — autores de *Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains* (Lockheed Martin, 2011), o paper que formalizou a **Cyber Kill Chain** de 7 fases. Cloppert é referência viva em resposta a intrusão e blue-team maduro.

**Chris Sanders** — autor de *Applied Network Security Monitoring* (2013, Syngress) e *Investigation Theory* (2018); estabeleceu a metodologia de investigação por analista de SOC (contextualizar → classificar → priorizar) que estrutura o workflow desta skill.

**Rob Lee** — Fellow do SANS Institute, autor do currículo SANS FOR508 (*Advanced Incident Response, Threat Hunting, and Digital Forensics*); formalizou a estrutura T1/T2/T3 e a matriz de escalonamento por criticidade × kill chain adotadas por SOCs modernos.

**Anton Chuvakin** — autor de *Logging and Log Management* (2013, com Kevin Schmidt) e ex-Gartner Research VP; codificou a doutrina "MTTD/MTTR são as métricas que importam, taxa de FP é o inimigo" que estrutura a seção "Métricas que importam".

**Frameworks canônicos herdados**:
- **Cyber Kill Chain** (Lockheed Martin, 2011) — base do "estágio da kill chain" na matriz de severidade.
- **MITRE ATT&CK + D3FEND (2021)** — vocabulário de ataque/defesa; cobertura por técnica é métrica.
- **NIST SP 800-61 rev.2 (Computer Security Incident Handling Guide)** — 4 fases (Prep → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident) que estruturam o playbook.
- **SANS SOC Survey (anual desde 2017)** — benchmark de métricas MTTD/MTTR/FP-rate por setor.
- **NIST SP 800-92 (Guide to Computer Security Log Management)** — base de análise de log de auditoria (Linux auditd, O365, K8s).

---
*Fonte adaptada (princípio, sem cópia literal): `mukul975/Anthropic-Cybersecurity-Skills@673da1f`
(skills `building-soc-escalation-matrix`, `building-soc-metrics-and-kpi-tracking`,
`building-soc-playbook-for-ransomware`, `analyzing-linux-audit-logs-for-intrusion`,
`analyzing-office365-audit-logs-for-compromise`) · Licença Apache-2.0. Reescrita em PT-BR para a Égide.*
