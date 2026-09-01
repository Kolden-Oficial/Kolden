---
tipo: runbook
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Runbook — Provisionamento da conta Rosie (Kommo)

> **Situação de origem:** O Long-Lived Token da conta `rosie.kommo.com` foi transmitido
> em texto puro no chat do Claude Code em 2026-07-23. Isso viola o Art. VII da
> Constituição Kolden — precisa **rotação obrigatória** antes de qualquer uso em
> produção. Este runbook é o roteiro para o Ronan executar (~10 minutos).

Referência arquitetural: plano `maravilha-eu-recebi-a-twinkling-cat.md` (Onda 0).

---

## Passo 1 — Revogar o token atual (Kommo UI, ~2 min)

1. Acessar `https://rosie.kommo.com/settings/integrations/`
2. Localizar integração privada com ID `a0364bed-7ea7-4c56-8cf2-e147b3a90d59`
3. Menu do card → **"Excluir token de longa duração"** (mantém a integração, só invalida o token exposto)
4. Confirmar. Token antigo passa a retornar `401 Bearer token verification failed` em toda API.

## Passo 2 — Gerar novo token (Kommo UI, ~1 min)

1. Na mesma integração, clicar **"Criar token de longa duração"**
2. Copiar o novo JWT (começa com `eyJ0eXAiOiJKV1QiLCJhbGc…`)
3. **Colar imediatamente num arquivo local temporário** — não no chat, não no Notion:
   ```bash
   # PowerShell / Git Bash local (só na sua máquina)
   echo 'NOVO_JWT_AQUI' > "$env:TEMP/kt.txt"
   ```

## Passo 3 — Salvar Client Secret (só uma vez, se ainda não fez)

O `Client Secret` `2mWi2ypGcSWkeNozNBPdDnK0mhtqeDLLJQkWIwQRar08HP2hIvrPyzwh7Zy5f9vd`
também foi exposto no chat, mas ele **NÃO precisa de rotação por si só** — é usado
para HMAC de Chats API (só faz sentido se um dia registrarmos canal externo custom).
Guardar como está no Infisical + rotacionar em D+90 junto com o token.

```bash
echo '2mWi2ypGcSWkeNozNBPdDnK0mhtqeDLLJQkWIwQRar08HP2hIvrPyzwh7Zy5f9vd' > "$env:TEMP/ks.txt"
```

## Passo 4 — Cadastrar no Infisical (CLI, ~2 min)

Padrão cliente-scoped, análogo ao Solomon (`SOLOMON_COMPANY_ID_ROSIE`). Path raiz do
env `prod` — não `/kolden/prod/`, seguindo a estrutura atual do projeto Kolden na
Infisical (confirmado em memórias 2026-06 do Ronan).

```bash
# Autenticar CLI se necessário
infisical login

# Cadastrar os 6 secrets
infisical secrets set \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod \
  KOMMO_ROSIE_SUBDOMAIN=rosie \
  KOMMO_ROSIE_ACCOUNT_ID=36679659 \
  KOMMO_ROSIE_INTEGRATION_ID=a0364bed-7ea7-4c56-8cf2-e147b3a90d59 \
  KOMMO_ROSIE_AMOJO_ID=141890a7-286c-4bf2-af0f-49f317014fba \
  KOMMO_ROSIE_ACCESS_TOKEN=@$env:TEMP/kt.txt \
  KOMMO_ROSIE_CLIENT_SECRET=@$env:TEMP/ks.txt
```

A sintaxe `@/caminho/arquivo.txt` faz o Infisical CLI ler o valor do arquivo em vez
de expor no histórico do shell (padrão canônico já documentado na memória do Hermes:
"Sintaxe secretName=@/path/to/file no infisical secrets set").

## Passo 5 — Verificar cadastro

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  bash -c 'echo "SUBDOMAIN=$KOMMO_ROSIE_SUBDOMAIN"; echo "ACCOUNT_ID=$KOMMO_ROSIE_ACCOUNT_ID"; echo "TOKEN_LEN=${#KOMMO_ROSIE_ACCESS_TOKEN}"'
```

Esperado:
```
SUBDOMAIN=rosie
ACCOUNT_ID=36679659
TOKEN_LEN=1350   (aproximado — JWT tem ~1300-1400 chars)
```

## Passo 6 — Smoke test com o NOVO token

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -sS "https://$KOMMO_ROSIE_SUBDOMAIN.kommo.com/api/v4/account" \
       -H "Authorization: Bearer $KOMMO_ROSIE_ACCESS_TOKEN" | python -m json.tool
```

Esperado: JSON com `"id": 36679659, "name": "Rosie", "subdomain": "rosie", "currency": "BRL"`.

## Passo 7 — Limpar arquivos temporários

```bash
del "$env:TEMP\kt.txt"
del "$env:TEMP\ks.txt"
```

## Passo 8 — Gerar KOLDEN_TOKEN do Hermes middleware

Este é um secret DIFERENTE do Kommo Access Token — é o token compartilhado entre o
Salesbot (widget_request) e o middleware Hermes. Rotação a cada 90d (Egide).

```bash
# Gerar secret aleatório
openssl rand -hex 32 > "$env:TEMP/mw.txt"

# Cadastrar no Infisical
infisical secrets set \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod \
  KOLDEN_TOKEN_HERMES_MW=@$env:TEMP/mw.txt

# Limpar
del "$env:TEMP\mw.txt"
```

Este mesmo valor vai:
1. Como env `KOLDEN_TOKEN` no Railway (setting do Hermes middleware).
2. Como header estático nos `widget_request` do Salesbot Kommo (na UI, dentro da
   config do handler, campo "Headers").

---

## Checklist de conclusão

- [ ] Passo 1: token antigo revogado
- [ ] Passo 2: novo JWT gerado e salvo em `$env:TEMP/kt.txt`
- [ ] Passo 3: client_secret salvo em `$env:TEMP/ks.txt`
- [ ] Passo 4: 6 secrets cadastrados no Infisical
- [ ] Passo 5: verificação lê os 3 primeiros OK
- [ ] Passo 6: `curl` para `/api/v4/account` retorna 200 com dados da Rosie
- [ ] Passo 7: arquivos temporários apagados
- [ ] Passo 8: `KOLDEN_TOKEN_HERMES_MW` cadastrado
- [ ] Atualizar `sobre-a-empresa/Ferramentas/Kommo/ferramentas.md` marcando o token como rotacionado (data)
- [ ] Atualizar `sobre-a-empresa/Ferramentas/mcp-status.md` (secção Kommo)

---

## Observações Kolden

- Nunca commitar `.env` deste projeto. O `.gitignore` do middleware já cobre.
- O `Passo 3` (client_secret) só é necessário se um dia registrarmos canal externo
  na Chats API (ex.: WhatsApp custom via Evolution API). Para o escopo do plano atual
  ele fica cadastrado mas ocioso.
- Depois da rotação, todas as chamadas subsequentes do Kolden devem passar por
  `infisical run --projectId=… --env=prod -- <comando>` — nunca ler o token com `cat`
  ou expor via `echo`.
