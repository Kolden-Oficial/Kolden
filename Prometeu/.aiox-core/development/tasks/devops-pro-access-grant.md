# Task: DevOps Pro Access Grant

> **Versão:** 1.0.0
> **Criado:** 2026-04-20
> **Tipo:** SUPPORT-OPS
> **Agente:** `@devops`

## Propósito

Conceder, restaurar ou validar o acesso AIOX Pro de um cliente usando o servidor de licenças ao vivo, o Supabase Auth e a validação guiada do instalador.

## Entradas

Obrigatórias:

- `target_email`
- `target_password`

Opcionais:

- `reset_password` (`true|false`, padrão: `false`)
- `run_guided_validation` (`true|false`, padrão: `true` após mudanças de código, `false` para suporte puramente de entitlement)
- `source` (padrão: `manual_support`)

## Fonte da Verdade

- `docs/guides/pro/access-grant-ops-playbook.md`
- `docs/aiox-workflows/pro-access-grant-workflow.md`

## Ordem de Execução

1. Execute `POST /api/v1/auth/check-email` para `target_email`.
2. Se o comprador estiver ausente, faça upsert em `public.buyers` com `source=manual_support` e `is_active=true`.
3. Se a conta estiver ausente, crie ou atualize o usuário do Supabase Auth com `target_password` e e-mail confirmado.
4. Se a validação do comprador estiver instável ou desatualizada, faça upsert em `public.buyer_validations` com `is_valid=true` para o `user_id` alvo.
5. Valide o `login`.
6. Valide o `verify-status`.
7. Valide o `activate-pro`.
8. Se `run_guided_validation=true`, valide:
   - o caminho do instalador a partir do checkout do código-fonte
   - o caminho do instalador a partir do tarball empacotado
9. Anexe as evidências e feche a solicitação de suporte.

## Verificações Obrigatórias

- `check-email` deve terminar com `isBuyer=true` e `hasAccount=true`
- `login` deve retornar `accessToken`
- `verify-status` deve retornar `emailVerified=true`
- `activate-pro` deve retornar sucesso

## Checklist de Validação Guiada

- o caminho do instalador a partir do checkout do código-fonte passa
- o caminho do instalador a partir do `.tgz` empacotado passa
- o relatório final diz que todas as verificações passaram
- o projeto gerado contém `.claude/skills`
- o projeto gerado contém `.claude/commands`
- o projeto gerado contém `.codex/skills`

## Ramos de Falha

### Comprador ausente após a concessão

- confirme o e-mail em minúsculas em `public.buyers`
- confirme `is_active=true`
- faça o seed de `public.buyer_validations`

### `activate-pro` retorna entrada inválida para o token

- o chamador está desatualizado
- reenvie usando `{ accessToken }` no corpo JSON

### E-mail não verificado

- confirme manualmente o e-mail do usuário do Auth
- execute novamente o `verify-status`

### A validação do instalador não encontra os assets do Claude ou do Codex

- reconstrua usando o pacote atualizado
- execute novamente a validação do código-fonte e do tarball

## Pacote de Evidências

Capture:

- a resposta de `check-email`
- o status de `login`
- a resposta de `verify-status`
- o status de `activate-pro`
- o resultado da instalação guiada

Não armazene o `accessToken` completo nem a `licenseKey` completa em tickets, handoffs ou chat.
