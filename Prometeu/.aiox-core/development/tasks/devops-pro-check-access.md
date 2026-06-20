# Task: DevOps Pro Check Access

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Verificar se um e-mail já possui o entitlement de comprador AIOX Pro e se existe uma conta de autenticação.

## Entrada

- `target_email`

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/check-email`

## Execução

1. Chame `check-email` com o e-mail alvo.
2. Reporte `isBuyer`, `hasAccount` e o `email` normalizado.
3. Se `isBuyer=false`, recomende `*pro-access-grant`.
4. Se `isBuyer=true` e `hasAccount=false`, recomende a criação de conta ou `*pro-access-grant`.

## Critérios de Aprovação

- a requisição retorna `200`
- a resposta identifica claramente o estado de comprador/conta

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
