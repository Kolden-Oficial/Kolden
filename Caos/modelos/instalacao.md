# Instalação — <Nome do Agente>

Template do `instalacao.md`. Passo a passo para colocar o agente em produção do zero.
Quem nunca viu o agente deve conseguir ativá-lo seguindo este arquivo. Apague estas
instruções no arquivo final. Substitua os blocos entre <>.

---

## Pré-requisitos

- <runtime/host: Claude Code, OpenRouter, LobeHub, etc.>
- <contas/serviços necessários>
- Acesso ao Infisical com as credenciais listadas em `ferramentas.md`.

## Passo 1 — Provisionar segredos

Cadastre no Infisical os segredos referenciados em `ferramentas.md`:

| Segredo | Caminho no Infisical | Origem |
|---------|----------------------|--------|
| <NOME_DA_CHAVE> | <`/kolden/<ambiente>/CHAVE`> | <onde obter> |

## Passo 2 — Abrir o agente no Claude Code

O agente vive em `C:\Kolden\<NomeMitológico>\`. Abra esta pasta diretamente no Claude Code:

```bash
cd C:\Kolden\<NomeMitológico>
claude
```

O arquivo `CLAUDE.md` nesta pasta é a identidade do agente — o Claude Code o lê automaticamente.

## Passo 3 — Ativar os reflexos

```bash
chmod +x C:\Kolden\<NomeMitológico>\.claude\reflexos\*.sh
```

Verifique que o `settings.json` aponta para os caminhos corretos em `.claude/reflexos/`.

## Passo 4 — Configurar ferramentas e integrações

- <como conectar cada API/MCP de `ferramentas.md`>
- <webhooks, agendamentos ou filas, se houver>

## Passo 5 — Teste de fumaça

Antes de liberar, rode o roteiro de `roteiro-de-teste.md` e confirme:

- [ ] O agente responde ao cenário feliz conforme o PRD.
- [ ] Os guardrails bloqueiam o pior cenário.
- [ ] Cada ferramenta responde (ou falha como esperado).

## Passo 6 — Ativação

<comando ou ação que coloca o agente no ar>

## Reversão

<como desativar/reverter caso algo dê errado>
