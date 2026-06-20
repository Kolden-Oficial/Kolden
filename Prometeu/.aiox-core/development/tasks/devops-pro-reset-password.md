# Task: DevOps Pro Reset Password

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Redefinir administrativamente uma senha do AIOX Pro e, em seguida, validar o login com a nova senha.

## Entradas

- `target_email`
- `new_password`

## Execução

1. Garanta que o usuário de autenticação exista para o e-mail alvo.
2. Atualize a senha no Supabase Auth.
3. Garanta que o e-mail permaneça confirmado.
4. Valide a nova senha com `login`.

## Critérios de Aprovação

- senha do usuário de autenticação atualizada com sucesso
- `POST /api/v1/auth/login` retorna `200` e `accessToken`

## Acompanhamento Recomendado

- se a solicitação foi realmente um fluxo de recuperação para o usuário, ofereça também `*pro-request-reset {email}`

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
- `.aiox-core/development/tasks/devops-pro-access-grant.md`
