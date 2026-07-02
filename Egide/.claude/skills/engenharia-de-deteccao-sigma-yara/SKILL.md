---
name: engenharia-de-deteccao-sigma-yara
description: >-
  Use quando precisar TRANSFORMAR uma ameaça (relatório de TTP, técnica ATT&CK,
  IOC, capability de malware) em lógica de detecção durável — escrever uma regra
  Sigma portável entre SIEMs (Splunk/Elastic/Sentinel), uma regra YARA para
  classificar arquivos/memória, e ajustar a fidelidade do alerta (reduzir falso
  positivo, mapear cobertura, versionar como detection-as-code). É o eixo de
  engenharia de detecção da Égide: a fábrica de regras que alimenta o SOC, a caça
  e o EDR. Foco em AUTORIA e qualidade da regra, não na operação do alerta (isso é
  o SOC) nem na caça interativa (isso é threat hunting).
domain: ciberseguranca
subdomain: engenharia-de-deteccao
tags: [deteccao, sigma, yara, regras, fidelidade, falso-positivo, detection-as-code, attack, siem]
---

# Engenharia de Detecção (Sigma + YARA)

> Defensiva e versionável. Detecção é **código**: passa por revisão, teste e versionamento. Uma regra
> sem teste de falso positivo é um gerador de ruído — e ruído mata SOC. Toda regra nasce ligada a uma
> técnica ATT&CK e a uma fonte de log declarada.

## Dois artefatos, um eixo

- **Sigma** = detecção sobre **logs/eventos** (processo, rede, autenticação), portável entre SIEMs via
  backend (pySigma). Para comportamento.
- **YARA** = classificação sobre **conteúdo de arquivo/memória** (strings, bytes, estrutura PE). Para
  artefato. Alimenta a `analise-estatica-de-malware` e o EDR.

A regra certa depende do que você tem: telemetria de evento → Sigma; amostra/dump → YARA. Campanhas
sérias pedem as duas, correlacionadas pela mesma técnica.

## Workflow de autoria (5 passos)

### 1. Derivar a hipótese de detecção
Parta de um insumo concreto: técnica ATT&CK (ex.: T1003.001 — dump de LSASS), TTP de relatório de CTI,
ou capability extraída de uma amostra. Defina **o que observável** prova a técnica (qual evento, qual
campo, qual string), não a ferramenta específica (detectar a técnica > detectar o binário do dia).

### 2. Mapear a fonte de log / superfície
- Sigma: `logsource` exato (categoria/produto/serviço) e os campos reais do seu SIEM. Sem Sysmon/EVTX
  bem configurado, a regra não dispara — declare o pré-requisito de telemetria.
- YARA: decida o alvo (arquivo em disco, dump de memória, tráfego) e a âncora (strings raras + condição
  estrutural, ex.: `uint16(0) == 0x5A4D` para PE).

### 3. Escrever a regra com âncora específica + condição
- **Sigma**: `detection` com `selection` (o que casa) e, quando preciso, `filter` (o que exclui legítimo);
  `condition: selection and not filter`. Defina `level` honesto e `falsepositives` explícitos.
- **YARA**: combine strings de baixa frequência com `condition` que exija contexto (N de M strings +
  tamanho + magic). Evite strings genéricas que casam software legítimo.

### 4. Testar fidelidade (o passo que separa engenheiro de gerador de ruído)
- **Verdadeiro positivo**: roda contra a amostra/evento de origem? Contra variantes?
- **Falso positivo**: roda contra um corpus de tráfego/binários **legítimos** (goodware, baseline do
  ambiente). Toda regra que acende em goodware volta para a bancada.
- Pontue: precisão, abrangência, custo de triagem. Uma regra `high` ruidosa vira `medium` com filtro,
  ou morre.

### 5. Empacotar como detection-as-code
- Metadados completos: id estável, autor, data, `tags` ATT&CK, referências, status (`experimental` →
  `test` → `stable`). Versionar em repositório, revisar por par, mapear cobertura (ATT&CK Navigator).
- Converter para o backend do SIEM-alvo (pySigma) e registrar a equivalência.

## Princípios de fidelidade
- **Específico vence genérico**: ancore em comportamento raro, não em ferramenta comum.
- **Filtro explícito > regra frouxa**: exclua o legítimo conhecido por allowlist, não baixando o nível.
- **ATT&CK é o índice, não a regra**: mapear a técnica organiza cobertura; a detecção é o observável.
- **Sem teste de FP, sem deploy.**

Ver `references/anatomia-de-regras.md` para esqueletos de regra Sigma e YARA e a checklist de fidelidade.

## Handoffs
Insumo vem da `analise-estatica-de-malware` (capabilities/IOCs) e da `inteligencia-de-ameacas-cti` (TTPs).
A regra entregue alimenta `operacoes-de-soc-blue-team` (alerta) e `caca-a-ameacas-orientada-a-hipotese`.

## Herança histórica

**Florian Roth** — criador do **Sigma** (2016), o formato aberto de regra de detecção que virou padrão do mercado; hoje CTO da Nextron Systems. Publicou também YARA-forge e a filosofia de "detection engineering as code" que estrutura a seção 5. Repositório canônico: `github.com/SigmaHQ/sigma`.

**Victor Manuel Alvarez** — autor original do **YARA** ("Yet Another Recursive Acronym"), publicado em 2007 na VirusTotal (adquirida pela Google/Chronicle). *YARA: The pattern matching swiss knife for malware researchers* é a documentação primária.

**MITRE ATT&CK team (Blake Strom, Otis Alexander e equipe)** — a base de conhecimento pública desde 2013 é o "índice" que a seção "Princípios de fidelidade" usa como ancoragem obrigatória: mapear técnica antes de escrever a regra.

**Julio Merino, Palantir team, David J. Bianco** — a **Pyramid of Pain** (Bianco, 2013) é o modelo mental por trás da regra "detectar a técnica > detectar o binário do dia"; regras acima da linha (TTP) sobrevivem à variação de amostra.

**Frameworks canônicos herdados**:
- **Sigma** (Roth, 2016) — schema YAML portável entre SIEMs via `pySigma`.
- **YARA** (Alvarez, 2007) — motor de assinatura por strings+condição estrutural para arquivo/memória.
- **MITRE ATT&CK Navigator** — camada de cobertura de detecção; base do detection-as-code moderno.
- **Pyramid of Pain** (Bianco, 2013) — ordem crescente de custo para o atacante (hash → IP → domain → artifact → tool → TTP); regras sobem a pirâmide.
- **Detection Engineering Maturity Matrix** (Palantir, 2021) — 5 níveis de maturidade que orientam o versionamento `experimental` → `test` → `stable`.

---
*Fonte adaptada (princípio, sem cópia literal): `mukul975/Anthropic-Cybersecurity-Skills@673da1f`
(skills `building-detection-rules-with-sigma`, `building-detection-rule-with-splunk-spl`,
cluster threat-detection) · Licença Apache-2.0. Reescrita em PT-BR para a Égide.*
