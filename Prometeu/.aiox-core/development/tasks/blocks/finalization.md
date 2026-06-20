# Bloco: Finalização

> **Block ID:** `finalization`
> **Version:** 1.0.0
> **Type:** Reusable Include Block

## Propósito

Encerrar um workflow multi-agente apresentando o resumo ao usuário, liberando os recursos da equipe e fornecendo os próximos passos. Usado ao final das skills orquestradoras após a conclusão de todas as fases.

## Entrada

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|----------|---------|-------------|
| `workflow_name` | string | Sim | - | Nome de exibição do workflow (ex.: "Enhance Workflow", "Deep Strategic Planning") |
| `slug` | string | Sim | - | Slug do projeto/decisão em snake_case |
| `artifacts_list` | object[] | Sim | - | Array de `{ path, description }` para os arquivos gerados |
| `summary_data` | object | Não | `{}` | Resumo específico do workflow (ex.: `{ epic_title, stories_count }`) |
| `next_steps` | string[] | Sim | - | Array de próximas ações recomendadas |
| `team_name` | string | Sim | - | Nome da equipe para liberação (ex.: "enhance-{slug}") |

## Saída

| Campo | Tipo | Descrição |
|-------|------|-------------|
| `summary_presented` | boolean | O resumo final foi exibido ao usuário |
| `agents_shutdown` | boolean | Todos os agentes receberam shutdown_request |
| `team_deleted` | boolean | TeamDelete executado com sucesso |

## Conteúdo Central

### Passo 1: Apresentar o Resumo ao Usuário

Exiba um resumo formatado contendo:
- Todos os caminhos dos artefatos gerados com descrições
- Destaques específicos do workflow (a partir de `summary_data`)
- Próximos passos como lista numerada

### Passo 2: Liberar os Agentes

```
# Para cada agente restante na equipe:
SendMessage(
  type: "shutdown_request",
  recipient: "{agent_name}",
  content: "Workflow concluído. Encerrando."
)
```

### Passo 3: Excluir a Equipe

```
# Depois que todos os agentes confirmarem o encerramento:
TeamDelete(team_name: "{team_name}")
```

### Template de Resumo

```markdown
## {workflow_name} Concluído: {slug}

### Artefatos Gerados
{foreach artifact in artifacts_list}
- `{artifact.path}` - {artifact.description}
{/foreach}

### Resumo
{resumo específico do workflow a partir de summary_data}

### Próximos Passos
{foreach step, index in next_steps}
{index + 1}. {step}
{/foreach}
```

## Uso

### Incluir em Arquivo de Skill

```markdown
<!-- Include: blocks/finalization.md -->
<!-- Parameters:
  workflow_name=Enhance Workflow
  slug={project_slug}
  team_name=enhance-{slug}
-->
```

### Uso Programático

```javascript
const finalize = async ({ workflow_name, slug, artifacts_list, summary_data, next_steps, team_name }) => {
  // 1. Apresentar o resumo
  presentSummary({ workflow_name, slug, artifacts_list, summary_data, next_steps });

  // 2. Encerrar os agentes
  const agents = await getTeamAgents(team_name);
  for (const agent of agents) {
    await sendShutdownRequest(agent);
  }

  // 3. Excluir a equipe
  await teamDelete(team_name);

  return { summary_presented: true, agents_shutdown: true, team_deleted: true };
};
```

## Tratamento de Erros

| Erro | Comportamento |
|-------|----------|
| Timeout no encerramento do agente | Registra aviso, continua com TeamDelete |
| TeamDelete falha | Registra erro, reporta ao usuário |
| Artefatos ausentes | Lista como "não gerado" no resumo |

## Notas

- O bloco executa após TODAS as fases concluírem
- Os agentes devem salvar seu trabalho antes de receber o shutdown_request
- TeamDelete é o passo final de liberação
- Encontrado em mais de 2 skills orquestradoras com 95%+ de similaridade
- Total de linhas economizadas: ~40 linhas × N skills
