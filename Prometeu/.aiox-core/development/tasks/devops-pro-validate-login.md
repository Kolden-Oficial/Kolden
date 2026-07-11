---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: DevOps Pro Validate Login

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Validar se o login do AIOX Pro funciona para um determinado par de e-mail e senha.

## Entradas

- `target_email`
- `target_password`

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/login`

## Execução

1. Chame `login` com as credenciais fornecidas.
2. Reporte:
   - o status HTTP
   - se um `accessToken` foi emitido
   - se `emailVerified=true`
3. Não exponha o access token bruto em logs ou handoffs.

## Critérios de Aprovação

- resposta `200` com `accessToken`

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
