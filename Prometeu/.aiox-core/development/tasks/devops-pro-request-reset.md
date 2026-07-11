---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: DevOps Pro Request Reset

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Disparar o fluxo de e-mail de redefinição de senha voltado ao usuário para uma conta AIOX Pro.

## Entrada

- `target_email`

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/request-reset`

## Execução

1. Chame `request-reset` com o e-mail alvo.
2. Reporte o status HTTP.
3. Trate a mensagem genérica de sucesso como o comportamento anti-enumeração esperado.
4. Se o endpoint retornar `429`, reporte a janela de limite de taxa (rate limit).

## Critérios de Aprovação

- a requisição retorna `200` com a mensagem genérica
- ou um `429` claro com orientação de retry

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
