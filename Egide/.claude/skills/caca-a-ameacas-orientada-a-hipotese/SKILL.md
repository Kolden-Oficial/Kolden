---
name: caca-a-ameacas-orientada-a-hipotese
description: >-
  Use quando a postura for PROATIVA, não reativa: procurar comprometimento que
  ainda não acendeu nenhum alerta. Formular hipótese a partir de CTI/ATT&CK/gap de
  cobertura, definir as fontes de dado para testá-la, executar a caça (baseline +
  analítica comportamental, ex.: análise de frequência para beaconing, caça a
  PowerShell anômalo, varredura de EVTX com Chainsaw, coleta de artefatos em frota
  com Velociraptor) e refutar/confirmar com julgamento. É o eixo de threat hunting
  da Égide. Diferente do SOC (que reage a alerta) e da engenharia de detecção (que
  escreve a regra): a caça acha o que escapou e DEVOLVE detecção nova.
domain: ciberseguranca
subdomain: threat-hunting
tags: [threat-hunting, hipotese, proativo, baseline, beaconing, frequencia, chainsaw, velociraptor, attack]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Caça a Ameaças Orientada a Hipótese

> Defensiva e proativa. Caçar é assumir que o adversário **já está dentro** e ainda não disparou alerta.
> Não é varredura cega: é método — hipótese testável, dado certo, refutação honesta. A caça que não
> produz nem achado nem detecção nova foi desperdício; sempre fecha o loop com a fábrica de regras.

## A diferença dos eixos vizinhos
- **SOC** reage a alerta existente. **Engenharia de detecção** escreve a regra. **Caça** procura o que
  *nenhuma* regra pegou — e cada caça boa vira regra nova (handoff para `engenharia-de-deteccao-sigma-yara`).
- Insumo principal: CTI (`inteligencia-de-ameacas-cti`) e lacunas de cobertura ATT&CK.

## Loop de caça (7 passos)
1. **Formular a hipótese** — testável e específica. "Adversário X usa beaconing HTTP com jitter; se
   estiver aqui, haverá conexões periódicas a domínio raro a partir de host de usuário." Hipótese vem de
   relatório de CTI, gap de detecção no Navigator, ou anomalia observada.
2. **Identificar fontes de dado** — quais logs/telemetria validam ou refutam (Sysmon, EVTX, proxy/DNS,
   NetFlow, EDR). Se o dado não existe, a saída é instrumentar (handoff endpoint/rede), não chutar.
3. **Estabelecer baseline** — o que é normal *neste* ambiente? Sem baseline não há anomalia, só ruído.
4. **Executar a analítica** — rodar a query/técnica contra os dados (ver técnicas abaixo).
5. **Analisar e correlacionar** — desvio em múltiplas fontes pesa mais que sinal isolado; ligue ao TTP.
6. **Validar (refutar de verdade)** — separar verdadeiro positivo de administração legítima. A hipótese
   pode ser **refutada** — refutar com evidência também é resultado válido.
7. **Documentar + devolver detecção** — registrar achado/ausência, atualizar regra/cobertura, recomendar
   resposta. Loop fechado.

## Técnicas de caça (catálogo de partida)
| Hipótese típica | Analítica |
|---|---|
| C2 escondido em tráfego "normal" | **análise de frequência / beaconing**: agrupar conexões por par origem→destino, medir periodicidade e jitter; sinal periódico a destino raro = candidato |
| Execução ofensiva via PowerShell | caça a **PowerShell anômalo**: encoded command, IEX, download em memória, entropia alta no script block |
| Atividade em logs de evento Windows | varredura de **EVTX com Chainsaw/Sigma** sobre eventos coletados |
| Comprometimento em escala | coleta de **artefatos em frota (Velociraptor/osquery)** + caça por hipótese em todos os hosts |
| Movimento lateral / persistência | baseline de autenticação e autoruns + desvio (cruza com endpoint/EDR) |
| APT conhecido | mapear TTPs do ator no **ATT&CK Navigator** e caçar técnica a técnica |

## Maturidade da caça
Evolua de **ad hoc** (uma hipótese solta) para **estruturada** (biblioteca de hipóteses por técnica
ATT&CK, repetível) para **automatizada** (a caça boa vira detecção contínua e libera o caçador para a
próxima fronteira). A meta de longo prazo: toda caça bem-sucedida se aposenta virando regra.

## Anti-falha
- Caça sem hipótese vira "olhar dados até cansar" — defina o que confirmaria/refutaria **antes**.
- Sem baseline, todo desvio parece ameaça (FP) ou nada parece (cegueira).
- Beaconing legítimo existe (telemetria, update, NTP) — periodicidade sozinha não condena; pese destino,
  raridade e contexto.
- Caça que não vira detecção nova é trabalho perdido: sempre feche o loop.

## Herança histórica

**Sqrrl Data team (David J. Bianco, Ryan Nolette, Chris Sanders)** — cocriaram o **Threat Hunting Loop** e o *Hunting Maturity Model (HMM)* em 2015-2016 (`www.threathunting.net/files/hunt-evil-practical-guide-threat-hunting.pdf`); a Sqrrl foi adquirida pela AWS em 2018 e os frameworks viraram doutrina do campo. Base do Loop de 7 passos e da seção "Maturidade".

**David J. Bianco** — cunhou também a **Pyramid of Pain** (2013), que estrutura por que caçar TTPs vale mais do que caçar hashes; hoje na Splunk. Referência: `detect-respond.blogspot.com`.

**Chris Sanders** — autor de *Applied Network Security Monitoring* (2013, Syngress, com Jason Smith) e *Investigation Theory* (2018); formalizou a metodologia de investigação e o uso de baseline+desvio comportamental.

**Roberto Rodriguez (Cyb3rWard0g)** — criador do **OSSEM (Open Source Security Events Metadata)**, do **HELK (Hunting ELK)** e do projeto **Threat Hunter Playbook** (`threathunterplaybook.com`, 2018+); operacionalizou "hipótese ↔ técnica ATT&CK ↔ dado" como padrão reprodutível.

**Frameworks canônicos herdados**:
- **Threat Hunting Loop** (Sqrrl, 2015) — Create Hypothesis → Investigate → Uncover Patterns → Inform & Enrich.
- **Hunting Maturity Model (HMM 0-4)** — ad hoc → estruturada → automatizada.
- **Pyramid of Pain** (Bianco, 2013) — ordem TTPs > Tools > Artifacts > Domain > IP > Hash.
- **MITRE ATT&CK Navigator** — camada de cobertura + gap analysis por técnica.
- **Diamond Model + Kill Chain** — modelos herdados do CTI para estruturar hipótese.

---
*Fonte adaptada (princípio, sem cópia literal): `mukul975/Anthropic-Cybersecurity-Skills@673da1f`
(skills `building-threat-hunt-hypothesis-framework`, `hunting-for-beaconing-with-frequency-analysis`,
`hunting-for-anomalous-powershell-execution`, `hunting-evtx-with-chainsaw`,
`fleet-hunting-with-velociraptor`, `analyzing-apt-group-with-mitre-navigator`) · Licença Apache-2.0.
Reescrita em PT-BR para a Égide.*
