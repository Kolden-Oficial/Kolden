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

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G26 — supply-chain-security
(`generating-and-analyzing-sboms`, `detecting-dependency-confusion`, `scanning-container-images-with-grype`,
`implementing-supply-chain-security-with-in-toto`). Método reescrito em PT-BR; defensivo; sem cópia literal.*
