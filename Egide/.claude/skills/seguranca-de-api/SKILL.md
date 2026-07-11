---
name: seguranca-de-api
description: >-
  Use quando for avaliar ou endurecer uma API (REST, GraphQL ou gateway) —
  revisar autenticação/autorização de endpoints, caçar BOLA/BFLA, desenhar
  rate-limiting e cotas, analisar logs de gateway, ou aplicar o OWASP API
  Security Top 10. É o eixo de segurança de API da Égide, complementar ao
  AppSec-web. Defensiva e metodológica: descreve COMO testar autorização e
  abuso e COMO corrigir, nunca payload ofensivo.
domain: ciberseguranca
subdomain: appsec-api
tags: [api, owasp-api, bola, bfla, oauth, jwt, rate-limit, graphql, gateway]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Segurança de API

> Defensiva e de uso autorizado. Avalie só APIs próprias ou com permissão
> escrita. Entrega o **método de verificação de autorização e abuso** e o
> **controle corretivo** — não fornece scripts de fuzzing ofensivo nem payloads.

## Por que existe

APIs falham diferente de webapps clássicas: não há HTML para escapar, mas há
**autorização por objeto e por função** que o cliente tenta burlar, e **abuso de
recurso** (sem rate-limit) que derruba o serviço. O OWASP API Security Top 10
nomeia essas classes. Auditar por classe garante cobertura; muitas falham no
servidor por confiar em ID/escopo vindo do cliente.

## Mapa de classes (OWASP API Top 10) — verificação e defesa

- **API1 BOLA (Broken Object Level Authorization)** — o endpoint aceita um ID de
  objeto e não confere se o chamador é dono. Teste: com duas contas, confirmar
  que cada acesso a objeto reautoriza no servidor pelo dono real. Controle:
  checagem de propriedade por objeto, deny-by-default, IDs opacos.
- **API2 Broken Authentication** — login/token frágil, JWT mal validado, falta de
  expiração. Teste: validar assinatura, `exp`, `aud`, `iss`, algoritmo fixado
  (rejeitar `alg:none`); revogação; rotação. Controle: validação completa de
  token, segredos via cofre (Infisical), MFA onde couber.
- **API3 Broken Object Property Level Authorization (mass assignment / excessive
  data exposure)** — endpoint aceita ou devolve campos que o papel não deveria.
  Teste: diferença entre campos aceitos/retornados e os permitidos por papel.
  Controle: schema de entrada/saída explícito (allowlist de campos), sem refletir
  o objeto inteiro.
- **API4 Unrestricted Resource Consumption** — sem rate-limit, sem paginação,
  consultas caras. Teste: confirmar limites por cliente/endpoint e custo de
  consulta. Controle: rate-limit + cotas + timeouts + tamanho máximo de payload;
  em GraphQL, limite de profundidade/complexidade de consulta.
- **API5 Broken Function Level Authorization (BFLA)** — função administrativa
  acessível a papel comum. Teste: matriz papel × função; tentar acessar rota
  privilegiada com conta comum. Controle: autorização por função no servidor,
  deny-by-default por rota.
- **API6 Unrestricted Access to Sensitive Business Flows** — automação abusa de
  fluxo de negócio (compra, convite, voto). Controle: detecção de bot, limites de
  negócio, prova de trabalho/humano onde fizer sentido.
- **API7 SSRF** — endpoint busca URL fornecida. Ver controle em
  `seguranca-de-aplicacoes-web-owasp` (allowlist de destino, bloqueio de
  IP interno/metadata).
- **API8 Security Misconfiguration** — CORS permissivo, verbos abertos, headers
  ausentes. Controle: CORS restrito, superfície mínima, headers de segurança.
- **API9 Improper Inventory Management** — endpoints/versões fantasma (shadow,
  v1 antiga, ambiente de debug exposto). Teste: inventário de todas as versões e
  hosts. Controle: catálogo de API vivo, despublicar o que é legado.
- **API10 Unsafe Consumption of 3rd-party APIs** — confiar cegamente em resposta
  de API externa. Controle: validar/sanitizar dado de terceiro como não confiável.

## Fluxo de auditoria

1. **Inventariar** toda a superfície (rotas, versões, métodos, hosts, esquema
   GraphQL) — incluindo endpoints não documentados.
2. **Mapear autorização esperada** — matriz papel × objeto × função.
3. **Verificar autorização** com contas de papéis distintos (BOLA/BFLA/BOPLA) —
   o teste-chave de API.
4. **Verificar abuso de recurso** — rate-limit, paginação, complexidade.
5. **Triar e remediar** na raiz (ver `gestao-de-vulnerabilidades-priorizacao`),
   com regressão em CI.

Análise de **logs de gateway** alimenta a detecção: picos por cliente, erros de
autorização em série e enumeração de IDs são sinais de abuso em produção.

## Critérios de validação
- Cada endpoint reautoriza no servidor por objeto e por função (não confia no
  cliente).
- Todo token é validado por completo (assinatura, claims, expiração, algoritmo).
- Existe rate-limit/cota por cliente e limite de complexidade em GraphQL.
- Inventário de API cobre versões/hosts legados; nada fantasma exposto.

## Sobreposição resolvida
A camada HTML/navegador (XSS, CSP) fica em `seguranca-de-aplicacoes-web-owasp`;
SSRF e misconfig são tratados lá e referenciados aqui. Validação de JWT/cripto de
token aprofunda em `criptografia-aplicada`.

## Herança histórica

**Philippe De Ryck** — fundador da Pragmatic Web Security; autoridade em segurança de OAuth2/OIDC/JWT desde ~2015 e autor de currículo formal em `pragmaticwebsecurity.com`. Base doutrinal da seção API2 (validação completa de token, rejeição de `alg:none`).

**Isabelle Mauny e Erez Yalon** — cofundadores da 42Crunch; corresponsáveis pelo **OWASP API Security Top 10** (v1 2019, v2 2023) e evangelistas da distinção BOLA vs BFLA como categorias distintas — origem do mapeamento de classes desta skill.

**OWASP API Security Project** — projeto comunitário que mantém a taxonomia canônica API1-API10; o Top 10 de 2023 foi a atualização que introduziu API3 (BOPLA — Object Property Level) e API6 (Business Flow).

**Frameworks canônicos herdados**:
- **OWASP API Security Top 10 (2023)** — 10 classes cobertas na seção "Mapa de classes".
- **RFC 7519 (JWT)**, **RFC 6749 (OAuth 2.0)**, **RFC 8252 (OAuth para Native Apps)** e **OAuth 2.1 draft** — base regulatória do token e do fluxo.
- **OWASP API Security Cheat Sheet** — checklists operacionais por API.
- **OpenAPI Specification (OAS 3.1)** — o contrato que sustenta a matriz "papel × objeto × função" e o schema de entrada/saída (API3).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G13 (API security, ~28 skills) com aporte de G5 (api gateway access logs).
Método extraído e reescrito em PT-BR; nenhuma cópia literal, nenhum script de
abuso importado.*
