---
name: seguranca-de-aplicacoes-web-owasp
description: >-
  Use quando for avaliar ou endurecer a segurança de uma aplicação web —
  revisar uma feature contra o OWASP Top 10, modelar ameaças de um endpoint,
  triar um achado de webapp (XSS, SQLi, SSRF, IDOR, desserialização), ou
  desenhar os controles de defesa de uma camada HTTP. É o eixo AppSec-web da
  Égide. Defensiva e metodológica: descreve COMO testar e COMO corrigir cada
  classe, nunca payload de ataque pronto.
domain: ciberseguranca
subdomain: appsec-web
tags: [owasp, appsec, xss, sqli, ssrf, idor, threat-modeling, web]
---

# Segurança de Aplicações Web (OWASP)

> Defensiva e de uso autorizado. Teste só aplicações que você possui ou tem
> permissão escrita para avaliar. Esta habilidade entrega o **método de
> verificação e o controle corretivo** de cada classe — não fornece exploits,
> payloads ofensivos nem comandos de ataque.

## Por que existe

A superfície de uma webapp não é um bug isolado: é um conjunto de classes de
falha recorrentes que o OWASP Top 10 e o OWASP ASVS já catalogaram. Auditar por
classe (e não por sintoma) garante cobertura. Para cada classe abaixo há três
perguntas: **onde ela mora**, **como confirmar sem dano**, **como corrigir na
raiz**.

## Mapa de classes (OWASP Top 10) — verificação e defesa

Para cada item: vetor (onde olhar) → teste seguro (confirmar) → controle (corrigir).

- **A01 Broken Access Control / IDOR** — Identificadores de objeto em rotas e
  payloads. Teste: com duas contas de papéis diferentes, confirme que o servidor
  reautoriza cada acesso a recurso (não confiar no ID vindo do cliente). Controle:
  autorização no servidor por objeto (deny-by-default), checagem de propriedade,
  IDs não-adivinháveis quando aplicável.
- **A02 Cryptographic Failures** — Dados sensíveis em trânsito/repouso. Teste:
  inventário de dado sensível e de onde trafega em claro. Controle: TLS forte,
  cifragem em repouso, hashing de senha com algoritmo de custo (ver
  `criptografia-aplicada`).
- **A03 Injection (SQLi, comando, LDAP, NoSQL)** — Toda concatenação de input em
  interpretador. Teste: revisão de código + DAST procurando construção dinâmica
  de query. Controle: **consultas parametrizadas / prepared statements**,
  validação por allowlist, ORM com binding, escape contextual.
- **A03/A07 XSS** — Reflexo de input em HTML/JS/atributo. Teste: mapear cada
  ponto onde input do usuário sai na resposta e o contexto de saída. Controle:
  **codificação de saída por contexto** (HTML/atributo/JS/URL), Content-Security-
  Policy, framework com auto-escape, sanitização de HTML rico com biblioteca
  reconhecida.
- **A04 Insecure Design** — Falta de modelagem de ameaça. Teste: threat modeling
  (STRIDE) por fluxo. Controle: requisitos de segurança no design, limites de
  taxa, padrões seguros por default.
- **A05 Security Misconfiguration** — Headers, verbos, listagem de diretório,
  mensagens de erro verbosas. Teste: varredura de configuração. Controle: headers
  de segurança (HSTS, X-Content-Type-Options, CSP), superfície mínima, erros
  genéricos.
- **A06 Vulnerable Components** — Dependências desatualizadas. Teste: SCA/SBOM
  (ver `devsecops-sast-dast-em-ci` e supply-chain). Controle: atualização e
  pinning.
- **A07 Identification & Auth Failures** — Login, sessão, recuperação de senha.
  Teste: política de senha, rotação de sessão pós-login, expiração, MFA. Controle:
  sessão segura (HttpOnly, Secure, SameSite), MFA, anti-força-bruta.
- **A08 Software & Data Integrity / Desserialização** — Desserialização de dado
  não confiável, update sem assinatura. Teste: mapear pontos de desserialização.
  Controle: evitar desserialização de input bruto, validar integridade/assinatura.
- **A09 Logging & Monitoring Failures** — Ausência de trilha. Controle: log de
  eventos de segurança, alerta, sem dado sensível no log.
- **A10 SSRF** — Endpoints que buscam URL fornecida pelo usuário. Teste: mapear
  toda saída de rede server-side derivada de input. Controle: allowlist de
  destinos, bloqueio de IP interno/metadata, sem seguir redirect cego.

## Fluxo de auditoria

1. **Mapear a superfície** — rotas, parâmetros, pontos de autenticação, saídas de
   rede server-side, pontos de upload, fronteiras de confiança.
2. **Modelar ameaça** (STRIDE) por fluxo crítico antes de testar.
3. **Verificar por classe** usando o teste seguro acima; correlacionar com
   ASVS para profundidade do nível exigido.
4. **Triar** cada achado (impacto × explorabilidade — ver
   `gestao-de-vulnerabilidades-priorizacao`).
5. **Remediar na raiz** com o controle correspondente e adicionar regressão
   (caso de teste) para a classe.

## Critérios de validação
- Cobertura: cada classe do Top 10 foi explicitamente checada ou marcada como
  não-aplicável com justificativa.
- Cada achado tem o controle corretivo na raiz, não só o sintoma.
- Toda query dinâmica revisada usa parametrização; toda saída revisada usa
  codificação por contexto.
- Achados viram caso de regressão em CI.

## Sobreposição resolvida
A camada de API (auth/abuso/rate-limit/BOLA) fica em `seguranca-de-api`; aqui
trata-se da camada HTML/HTTP de navegador. A varredura automatizada (SAST/DAST)
em pipeline fica em `devsecops-sast-dast-em-ci`; aqui está o método de revisão
por classe.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G5 (web application security / OWASP Top 10, ~42 skills) com aporte de G30
(threat modeling / secure SDLC). Método extraído e reescrito em PT-BR; nenhuma
cópia literal, nenhum payload ou script ofensivo importado.*
