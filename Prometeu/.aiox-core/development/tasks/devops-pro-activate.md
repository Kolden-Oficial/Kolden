---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: DevOps Pro Activate

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Chamar diretamente o endpoint `activate-pro` ao vivo para validar ou restaurar a ativação do AIOX Pro para uma sessão.

## Entradas

- `access_token`
- `machine_id` (opcional, padrão: `ops-validation-machine`)
- `version` (opcional, padrão: versão atual do instalador)

## Endpoint

- `POST https://aiox-license-server.vercel.app/api/v1/auth/activate-pro`

## Execução

1. Monte o corpo da requisição com:
   - `accessToken`
   - `machineId`
   - `version`
   - `aioxCoreVersion`
2. Chame o `activate-pro`.
3. Reporte:
   - o status HTTP
   - `activated`
   - se a ativação foi nova ou restaurada
4. Nunca cole a `licenseKey` completa em logs ou tickets.

## Critérios de Aprovação

- `201` na primeira ativação ou `200` na restauração idempotente

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
