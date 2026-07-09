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

**Passo 3.1 (v2.5 — condicional para ASL-3+):**

Se o agente tem `ASL: 3` ou `ASL: 4+` no PRD frontmatter:

```bash
# Confirma que o reflexo interrupt-before-mutation.sh está presente e executável
test -x C:\Kolden\<NomeMitológico>\.claude\reflexos\interrupt-before-mutation.sh && echo OK
# Verifica que settings.json referencia o reflexo como PreToolUse para tools destrutivas
grep -q "interrupt-before-mutation" C:\Kolden\<NomeMitológico>\.claude\settings.json && echo OK
```

Se qualquer verificação falhar = agente ASL-3+ **não pode ir a produção** (Art. X G4 — BLOCK).

**Passo 3.2 (v2.5 — condicional se alguma skill/MCP tem `grounding_required: true`):**

```bash
# Confirma que verificacao-de-fato-datavel.sh está presente
test -x C:\Kolden\<NomeMitológico>\.claude\reflexos\verificacao-de-fato-datavel.sh && echo OK
```

Fonte: Constituição Art. IX + Art. X G4 (v2.5.0).

## Passo 4 — Configurar ferramentas e integrações

- <como conectar cada API/MCP de `ferramentas.md`>
- <webhooks, agendamentos ou filas, se houver>
- **v2.5 Art. IV:** para cada ferramenta em `ferramentas.md`, verificar coluna "MCP-nativo?":
  - **sim (MCP-nativo)** — configurar cliente MCP padrão do Kolden;
  - **adapter** — configurar adapter (interface MCP wrapping API existente);
  - **wrapper proprietário** — **VERIFICAR data limite de dupla-vida** em `ferramentas.md § Plano de dupla-vida`; se data limite passou, agente está **BLOQUEADO** de ir a produção até migração para MCP-nativo (Art. IV refactored v2.5.0).

## Passo 5 — Teste de fumaça

Antes de liberar, rode o roteiro de `roteiro-de-teste.md` e confirme:

- [ ] O agente responde ao cenário feliz conforme o PRD.
- [ ] Os guardrails bloqueiam o pior cenário.
- [ ] Cada ferramenta responde (ou falha como esperado).

**Verificação canônica Art. X (v2.5.0):**

- [ ] **G1** — `<Agent>/constitution.md` existe com 5-15 princípios veto-operacionais
- [ ] **G2** — PRD tem `ASL:` declarado e bate com tools
- [ ] **G3** — PRD tem `aspiration_criteria` (3-5) + `uncertainty_statement` preenchidos
- [ ] **G4** — para ASL-3+: teste OS-1 do roteiro-de-teste passou
- [ ] **G5** — pasta `registros/traces/` existe e é populada em runtime
- [ ] **G6** — PRD §11.6 tem tabela auditoria capacidades × risco preenchida
- [ ] **G7** — para skills/MCPs com fato datável: teste GR-2 passou
- [ ] **G8** — se `predictions_scorecard: true`: arquivo `Caos/registros/predictions-scorecard-<agente>.md` existe

## Passo 6 — Ativação

<comando ou ação que coloca o agente no ar>

## Reversão

<como desativar/reverter caso algo dê errado>
