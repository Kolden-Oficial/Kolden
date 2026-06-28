---
name: devsecops-sast-dast-em-ci
description: >-
  Use quando for embutir segurança no pipeline de CI/CD — escolher e ordenar os
  scanners (SAST, DAST, SCA, secret-scan, IaC), definir gates de build por
  severidade, calibrar falso-positivo, e desenhar o fluxo shift-left sem travar a
  entrega. É o eixo DevSecOps da Égide e cruza com o Prometeu (eng/spec-driven).
  Defensivo e de processo: ensina a montar o pipeline e os gates, não a atacar.
domain: ciberseguranca
subdomain: devsecops
tags: [devsecops, sast, dast, sca, secret-scan, iac, cicd, shift-left, gate]
---

# DevSecOps — SAST/DAST em CI

> A meta é **shift-left**: achar a falha o mais cedo e barato possível, sem
> transformar o pipeline num portão que ninguém consegue passar. O risco
> recorrente é afogar o time em ruído (falso-positivo) até desligarem o gate.
> Calibrar é parte do trabalho.

## Os scanners e onde cada um entra

Cada classe de scanner vê uma coisa; defesa em profundidade usa vários em
camadas, do mais barato/cedo ao mais caro/tarde:

- **Secret scanning** — segredo commitado (chave, token, senha). Roda em
  pre-commit **e** em CI sobre o diff, com histórico. O mais barato e o de maior
  retorno. Na Kolden, segredo vai sempre ao Infisical (ver `infisical-padrao`);
  achado bloqueia e dispara rotação.
- **SCA / dependências + SBOM** — vulnerabilidade em biblioteca de terceiro
  (cruza OWASP A06 e supply-chain). Gera SBOM e cruza com bases de CVE. Roda em
  cada build; alimenta a triagem de `gestao-de-vulnerabilidades-priorizacao`.
- **SAST (estático)** — analisa o código-fonte sem rodar; pega injeção, cripto
  fraca, deserialização. Cedo no pipeline. Tende a falso-positivo — calibrar
  regras por linguagem/projeto.
- **IaC scanning** — má configuração em Terraform/K8s/Docker/cloud (bucket
  aberto, sem cifragem, privilégio excessivo) antes do deploy.
- **DAST (dinâmico)** — testa a app rodando em ambiente de teste; pega o que só
  aparece em runtime (config, auth, headers). Mais tarde no pipeline, em ambiente
  efêmero.
- **Container/imagem** — scan da imagem (CVE de OS + libs) antes do push ao
  registry.

## Desenho do pipeline (ordem e gates)

1. **Pre-commit / IDE** — secret-scan + lint de segurança rápido (feedback em
   segundos).
2. **CI no PR** — secret-scan (diff+histórico) + SCA + SAST + IaC. *Gate de PR.*
3. **Build** — scan de imagem de container; gerar e arquivar SBOM.
4. **Staging** — DAST em ambiente efêmero contra a app de pé.
5. **Pós-deploy** — monitoria/observabilidade contínua.

**Gate por severidade, não tudo-ou-nada**: quebrar o build em achado
**novo** de severidade alta/crítica (e qualquer segredo); registrar e enfileirar
os de menor severidade sem travar. Diferenciar **achado novo** (introduzido no
diff) de dívida pré-existente evita parar a esteira por backlog herdado.

## Calibração de falso-positivo (faz ou quebra)

- Baseline inicial: suprimir a dívida existente, gate só sobre o **delta**.
- Regras afinadas por linguagem/framework; desligar checagem irrelevante ao stack.
- Triagem com supressão **rastreável** (com justificativa e validade), nunca
  ignore cego.
- Medir taxa de falso-positivo por scanner; scanner ruidoso demais perde a
  confiança do time e é desligado — pior que não ter.

## Critérios de validação
- Secret-scan roda em pre-commit e em CI; achado bloqueia e dispara rotação.
- O gate quebra em achado novo alto/crítico, sem travar por dívida pré-existente.
- SBOM gerado e versionado a cada build.
- Falso-positivo é medido e a supressão é rastreável.
- DAST roda contra ambiente efêmero, não produção.

## Sobreposição resolvida
A **triagem** dos achados (CVSS/EPSS/SLA) é de `gestao-de-vulnerabilidades-
priorizacao`; aqui está só **como rodar os scanners no pipeline e gatear**. O
secret-scan resiliente a injeção em conteúdo de agente é de
`scanner-anti-injecao-resiliente` (vetor diferente: prompt, não credencial). Cruza
com o eixo de engenharia do Prometeu (que já opera coderabbit/SAST).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G17 (DevSecOps — CI/CD security, SAST/DAST, IaC scanning, pipeline hardening,
~18 skills) com aporte de G26 (SBOM/supply-chain). Método extraído e reescrito em
PT-BR; nenhuma cópia literal.*
