# Infisical — Gestão de Segredos do Kolden

Ferramenta obrigatória para todos os agentes e ferramentas do Kolden.
Nenhuma credencial vive em texto puro em nenhum arquivo — só o caminho no Infisical.

---

## Convenção de caminhos

```
/<projeto>/<ambiente>/<NOME_DA_CHAVE>
```

| Campo | Valores aceitos | Exemplo |
|-------|----------------|---------|
| `<projeto>` | nome do agente ou squad | `kolden`, `trafego-pago` |
| `<ambiente>` | `prod`, `dev`, `staging` | `prod` |
| `<NOME_DA_CHAVE>` | SCREAMING_SNAKE_CASE | `GHL_PIT_KEY` |

### Credenciais cadastradas

| Ferramenta | Credencial (Infisical) |
|------------|------------------------|
| GoHighLevel | `/kolden/prod/GHL_PIT_KEY` |
| GoHighLevel | `/kolden/prod/GHL_AGENCY_KEY` |
| GoHighLevel | `/kolden/prod/GHL_LOCATION_ID` |

---

## Como usar

### Via CLI (scripts e automações)

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>
```

Injeta os segredos do caminho como variáveis de ambiente antes de executar o comando.

### Via MCP (agentes Claude Code)

```
Ferramenta: infisical_get_secret
Parâmetros:
  path: /kolden/prod/NOME_DA_CHAVE
  environment: prod
```

O MCP retorna o valor — nunca imprimir ou logar o valor retornado.

### Via API REST (fallback para scripts shell)

```bash
SECRET=$(curl -s \
  -H "Authorization: Bearer $INFISICAL_TOKEN" \
  "https://app.infisical.com/api/v3/secrets/raw/NOME_DA_CHAVE?workspaceId=$WORKSPACE_ID&environment=prod" \
  | jq -r '.secret.secretValue')
```

`INFISICAL_TOKEN` é o único segredo que pode estar como variável de ambiente do sistema
(configurado uma vez pelo humano) — todos os outros são buscados a partir dele.

---

## Regras invioláveis

- **NUNCA** colocar chave, token ou senha em texto puro em prompt, doc ou `.env` versionado.
- **SEMPRE** referenciar credenciais pelo caminho Infisical.
- Se o Infisical falhar: não usar fallback em texto puro — escalar para o humano.

---

## Como adicionar nova credencial

1. Identificar o caminho: `/kolden/<ambiente>/<NOME_EM_MAIÚSCULAS_UNDERLINE>`
2. Cadastrar no painel Infisical (ver `instalacao.md`)
3. Adicionar linha na tabela "Credenciais cadastradas" acima com o path (nunca o valor)
