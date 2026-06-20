# Task: DevOps Pro Resend Verification

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Reenviar o link de verificação de e-mail para uma conta de usuário AIOX Pro.

## Entrada

- `target_email`

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/resend-verification`

## Execução

1. Chame `resend-verification` com o e-mail alvo.
2. Reporte o status e a mensagem genérica de entrega.
3. Se `429`, reporte o limite de taxa (rate limit) de reenvio e a orientação de retry.

## Critérios de Aprovação

- o endpoint retorna uma resposta no estilo de sucesso sem vazar a existência da conta

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
