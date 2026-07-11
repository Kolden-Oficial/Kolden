---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: DevOps Pro Verify Status

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Verificar o status de verificação de e-mail para uma sessão AIOX Pro autenticada.

## Entrada

- `access_token`

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/verify-status`

## Execução

1. Chame `verify-status` com `{ accessToken }`.
2. Reporte `email` e `emailVerified`.
3. Se `emailVerified=false`, encaminhe para `*pro-resend-verification`.

## Critérios de Aprovação

- resposta `200`
- estado claro de verificado/não verificado

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
