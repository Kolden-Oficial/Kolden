---
name: seguranca-de-cadeia-de-suprimentos
description: >-
  Use quando precisar defender a cadeia de suprimentos de software — gerar e analisar
  SBOM (syft/grype), detectar dependency confusion, varrer imagens de container por
  CVE, e garantir integridade de pipeline com atestações assinadas (in-toto/SLSA).
  Atende requisitos de SBOM (CISA, EO 14028). Eixo supply-chain da Égide — inventário,
  detecção e atestação; cruza DevSecOps.
domain: ciberseguranca
subdomain: supply-chain-security
tags: [supply-chain, sbom, syft, grype, dependency-confusion, in-toto, slsa, container, cve, sca]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Segurança de Cadeia de Suprimentos de Software

> Você não pode defender o que não consegue inventariar. A maior parte de uma aplicação moderna é
> código de terceiro — a defesa começa por **saber o que você embarca** (SBOM) e termina por
> **provar como foi construído** (atestação). Bloquear build por CVE sem política de severidade/exceção
> trava a entrega; calibre o gate.

## O que é

A cadeia de suprimentos de software vai do pacote npm/PyPI à imagem de container até o artefato
implantado. Cada elo é superfície de ataque (dependência vulnerável, confusão de nome, build
adulterado). Esta habilidade dá o método para inventariar, detectar e atestar.

## Método

### 1. SBOM — inventário de componentes
- Gere o **SBOM** de aplicações e imagens com **syft** (formato CycloneDX/SPDX).
- Cruze o SBOM contra bases de vulnerabilidade com **grype** continuamente — assim um CVE novo é
  detectado contra artefato que já existe, sem rescanear o código.
- Mantenha o inventário vivo; ele satisfaz requisitos regulatórios/de procurement (CISA, EO 14028).

### 2. Detecção de dependency confusion
- Baseline: quais pacotes **internos** são "reivindicáveis" num registro público (mesmo nome, ninguém
  registrou). Esse é o vetor de confusão.
- Audite `package.json`, `requirements.txt`, `pom.xml`, `composer.json`, `Gemfile.lock` em busca de
  nomes confundíveis; atenção a pipelines com feeds **mistos** (privado + público).
- Defesa: registre defensivamente os nomes internos no público; fixe o registro/scope; rode como
  controle recorrente para pegar pacotes internos novos ainda não protegidos.

### 3. Varredura de imagem de container
- Varra imagens com **grype** por CVE em pacotes do SO e dependências de app; integre no CI/CD com
  política de severidade (ex.: bloquear `critical`/`high` sem exceção aprovada).
- Reduza superfície: imagem base mínima, sem ferramenta desnecessária.

### 4. Integridade de pipeline (in-toto / SLSA)
- Gere chaves de assinatura e defina o **layout** da cadeia (quais passos, quem assina cada um).
- Registre cada passo do pipeline e **verifique antes do deploy** que o artefato passou por todos os
  passos esperados, sem etapa pulada ou adulterada.
- Aplique **admission control** (ex.: Kubernetes) que só admite artefato com atestação válida.

## Entrega
Pacote de supply-chain: SBOM assinado + relatório de CVE priorizado (app + container) + achados de
dependency confusion com plano de registro defensivo + política de atestação in-toto/SLSA. Handoff:
remediação de CVE → gestão de vulnerabilidade; gate de CI/CD → DevSecOps/Prometeu.

## Incremental (não nesta leva)
Análise de malware em artefato de dependência, simulação de ataque de cadeia e SCA específico de
fornecedor (Snyk) ficam adiados — ver relatório de perda.

## Herança histórica

**Kim Lewandowski, Dan Lorenc e equipe Google Open Source Security** — cocriadores do **SLSA (Supply-chain Levels for Software Artifacts, v0.1 2021, v1.0 abril 2023)**, o framework de 4 níveis de garantia de proveniência que a seção 4 aplica; também da **Sigstore** (Cosign, Fulcio, Rekor, 2021) que operacionaliza assinatura sem chave de longa vida.

**Justin Cappos et al. (NYU Secure Systems Lab)** — arquitetos do **in-toto (2018+)** e do **TUF (The Update Framework)**, base do modelo "layout + verificação de cadeia de passos" da seção 4.

**Anchore team (Dan Nurmi, Alfredo Deza)** — mantenedores de **syft** (gerador de SBOM) e **grype** (scanner de CVE) desde 2020, as ferramentas de referência das seções 1 e 3.

**Ken Thompson** — cunhou em *Reflections on Trusting Trust* (1984, Turing Award Lecture) a intuição fundadora do campo: "você não pode confiar em código que não escreveu inteiramente" — a doutrina raiz por trás da SBOM+atestação.

**Frameworks canônicos herdados**:
- **SLSA v1.0** — 4 níveis de proveniência (Source, Build, Provenance, Common).
- **in-toto** — layout de cadeia de passos com assinatura por elo.
- **CycloneDX (OWASP)** e **SPDX (Linux Foundation)** — os dois formatos canônicos de SBOM.
- **Sigstore** — assinatura sem chave persistente (OIDC + transparency log Rekor).
- **CISA Executive Order 14028 (2021)** — exigência regulatória americana de SBOM que fundamenta a seção 1.
- **NIST SP 800-161 rev.1 (2022)** — *Cybersecurity Supply Chain Risk Management Practices*.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G26 — supply-chain-security
(`generating-and-analyzing-sboms`, `detecting-dependency-confusion`, `scanning-container-images-with-grype`,
`implementing-supply-chain-security-with-in-toto`). Método reescrito em PT-BR; defensivo; sem cópia literal.*
