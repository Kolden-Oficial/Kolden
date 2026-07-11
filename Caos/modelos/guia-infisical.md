---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/modelos/_indice|_indice]]"
---

# Guia Infisical — gestão de segredos do Kolden

Como estruturar e referenciar segredos no Infisical para qualquer agente nascido no Kolden.
**Constituição, Artigo VII (NÃO-NEGOCIÁVEL):** nenhuma credencial vive em texto puro em
nenhum arquivo do repositório — só a referência ao caminho no Infisical.

---

## Por que Infisical

Segredos centralizados, versionados e injetados em runtime. O agente nunca carrega a chave
no prompt nem no `.env` versionado; carrega só o **caminho** e resolve em execução.

## Convenção de caminhos

```
/<projeto>/<ambiente>/<NOME_DA_CHAVE>
```

- `<projeto>`: o agente ou squad (ex.: `kolden`, `trafego-pago`).
- `<ambiente>`: `dev`, `staging` ou `prod`.
- `<NOME_DA_CHAVE>`: SCREAMING_SNAKE_CASE (ex.: `GHL_PIT_KEY`, `SUPABASE_SERVICE_KEY`).

Exemplos:
```
/kolden/prod/GHL_PIT_KEY
/trafego-pago/prod/META_ADS_TOKEN
```

## Como referenciar em `ferramentas.md`

Na coluna "Credencial (Infisical)", coloque apenas o caminho — nunca o valor:

| Ferramenta | Credencial (Infisical) |
|------------|------------------------|
| GoHighLevel | `/kolden/prod/GHL_PIT_KEY` |

## Como o agente resolve em runtime

- **CLI:** `infisical run --path=/kolden/prod -- <comando>` injeta os segredos como variáveis de ambiente.
- **SDK:** o agente lê a variável de ambiente já injetada (ex.: `process.env.GHL_PIT_KEY`),
  nunca a chave literal.

## Regras (gates)

- NÃO DEVE: aparecer chave, token ou senha em texto puro em prompt, skill, doc ou `.env` versionado.
- DEVE: todo segredo citado ter um caminho Infisical correspondente.
- O hook `pre-ferramenta.sh` bloqueia `cat`/`less`/`head`/`tail` em `.env` para reforçar esta regra.
- O `revisor` (Fase 6) reprova qualquer credencial em texto puro encontrada.
