# Protocolo de Handoff de Agentes — Compactação de Contexto

## Propósito

Evitar o acúmulo da janela de contexto ao alternar entre agentes AIOX (comandos `@agent`). Cada troca de agente compacta a persona completa do agente anterior em um artefato de handoff estruturado (~379 tokens) em vez de reter a definição completa (~3-5K tokens).

## Quando Isto se Aplica

Este protocolo é ativado sempre que:
1. Um usuário invoca um novo agente via `@agent-name` ou `/AIOX:agents:agent-name`
2. A sessão atual já tem um agente diferente ativo

## Protocolo de Handoff

### Na Troca de Agente (agente que sai)

Antes de carregar o novo agente, gere mentalmente um artefato de handoff com:

```yaml
handoff:
  from_agent: "{current_agent_id}"
  to_agent: "{new_agent_id}"
  story_context:
    story_id: "{active story ID}"
    story_path: "{active story path}"
    story_status: "{current status}"
    current_task: "{last task being worked on}"
    branch: "{current git branch}"
  decisions:
    - "{key decision 1}"
    - "{key decision 2}"
  files_modified:
    - "{file 1}"
    - "{file 2}"
  blockers:
    - "{any active blockers}"
  next_action: "{what the incoming agent should do}"
```

### Na Troca de Agente (agente que entra)

O agente que entra recebe:
1. Seu próprio **perfil de agente completo** (persona, comandos, dependências)
2. O **artefato de handoff** do agente anterior (resumo compacto)
3. **NÃO** a persona/instruções/definições de ferramentas completas do agente anterior

### Limites de Compactação

| Limite | Valor |
|-------|-------|
| Tamanho máximo do artefato de handoff | 500 tokens |
| Máximo de resumos de agente retidos | 3 (o mais antigo é descartado na 4ª troca) |
| Máximo de decisões no artefato | 5 |
| Máximo de entradas em files_modified | 10 |
| Máximo de blockers | 3 |

### O que Preservar (SEMPRE incluir)

- ID e caminho da story ativa
- Task atual em andamento
- Nome da branch git
- Decisões arquiteturais importantes tomadas
- Arquivos criados ou modificados
- Blockers ativos

### O que Descartar (NUNCA carregar adiante)

- Definição completa da persona do agente anterior
- Lista de comandos do agente anterior
- Lista de dependências do agente anterior
- Configurações de ferramentas do agente anterior
- Detalhes da integração com CodeRabbit do agente anterior
- Templates de saudação do agente anterior

## Armazenamento

Os artefatos de handoff são armazenados em `.aiox/handoffs/` (runtime, no gitignore). Formato: `handoff-{from}-to-{to}-{timestamp}.yaml`.

## Referência de Template

Template completo: `.aiox-core/development/templates/agent-handoff-tmpl.yaml`

## Exemplo

Fluxo de sessão: `@sm` cria a story → `@dev` implementa → `@qa` revisa

Após a troca `@sm` → `@dev`:
- A persona completa do `@sm` (~3K tokens) é **descartada**
- O artefato de handoff (~379 tokens) é **retido**: ID da story, decisões, arquivos, próxima ação
- A persona completa do `@dev` (~5K tokens) é **carregada**
- **Contexto total: ~5.4K** em vez de ~8K (redução de 33% por troca)

Após a troca `@dev` → `@qa`:
- A persona completa do `@dev` é **descartada**
- O artefato de handoff do `@dev` é **retido** junto com o handoff do `@sm`
- A persona completa do `@qa` é **carregada**
- **Contexto total: ~5.2K** em vez de ~12K (redução de 57% após 2 trocas)
