---
name: infisical-padrao
description: Ensina como buscar credenciais e segredos via Infisical (MCP ou API REST). Use sempre que um agente precisar acessar qualquer API key, token ou senha — nunca busque credenciais diretamente de variáveis de ambiente em texto puro. Infisical é a ferramenta padrão de segredos de todos os agentes do Kolden.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Infisical — Ferramenta Padrão de Segredos

Todo agente do Kolden acessa credenciais EXCLUSIVAMENTE pelo Infisical.
Nenhuma API key, token ou senha vive em texto puro em qualquer arquivo do repositório
(Constituição, Artigo VII — NÃO-NEGOCIÁVEL).

## Convenção de paths no Infisical

```
/kolden/<ambiente>/<NOME_DA_CHAVE>

Exemplos:
/kolden/prod/GHL_PIT_KEY
/kolden/prod/SUPABASE_KEY
/kolden/dev/OPENROUTER_KEY
/kolden/prod/META_ADS_TOKEN
```

Ambientes padrão: `prod`, `dev`, `staging`

---

## Como buscar um segredo via MCP

Se o MCP do Infisical estiver configurado:

```
Ferramenta: infisical_get_secret
Parâmetros:
  path: /kolden/prod/NOME_DA_CHAVE
  environment: prod
```

O MCP retorna o valor do segredo. Use diretamente na chamada da ferramenta — nunca
imprima o valor em logs, never mostre no output ao usuário.

---

## Como buscar via API REST (fallback — scripts shell)

```bash
SECRET=$(curl -s \
  -H "Authorization: Bearer $INFISICAL_TOKEN" \
  "https://app.infisical.com/api/v3/secrets/raw/NOME_DA_CHAVE?workspaceId=$WORKSPACE_ID&environment=prod" \
  | jq -r '.secret.secretValue')
```

O `INFISICAL_TOKEN` é o único segredo que pode estar em variável de ambiente do sistema
(configurado uma vez pelo humano na máquina/servidor) — todos os outros são buscados a partir dele.

---

## Como documentar em ferramentas.md

Toda entrada em `ferramentas.md` que use credencial deve ter:

```markdown
- **Autenticação:** credencial via Infisical: `/kolden/prod/NOME_DA_CHAVE`
```

Nunca:
```markdown
- **Autenticação:** API_KEY=sk-abc123...   ← PROIBIDO (Art. VII)
```

---

## Comportamento quando o Infisical falha

1. **Não continuar** — nunca usar fallback em texto puro.
2. **Logar o erro** com timestamp em `registros/erros-infisical.md`.
3. **Escalar para humano** com a mensagem: "Não foi possível buscar [NOME_DA_CHAVE] no Infisical.
   Verifique conectividade e permissões antes de continuar."
4. **Nunca sugerir** ao usuário que adicione a credencial diretamente no arquivo.

---

## Adicionando uma nova credencial (checklist)

Quando o agente precisa de uma nova credencial não cadastrada ainda:
1. Identifique o caminho padrão: `/kolden/<ambiente>/<NOME_EM_MAIÚSCULAS_UNDERLINE>`
2. Documente em `ferramentas.md` do agente com o path (nunca o valor)
3. Instrua o humano (em `instalacao.md`): "Cadastre este segredo no Infisical com o path X"
4. No script/hook, sempre buscar via MCP ou API — nunca hardcoded
