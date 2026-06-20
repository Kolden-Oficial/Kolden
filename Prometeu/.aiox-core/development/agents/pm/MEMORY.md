# Memória do Agente PM (Morgan)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Responsabilidades
- Criação de PRD (greenfield + brownfield)
- Criação e gestão de epics
- Estratégia de produto e roadmap
- Levantamento de requisitos (spec pipeline)

### Orquestração de Epic
- `*execute-epic` com `EPIC-{ID}-EXECUTION.yaml`
- Estado rastreado em `.aiox/epic-{epicId}-state.yaml`
- Execução paralela baseada em waves

### Delegação
- Criação de story → @sm (`*draft`)
- Correção de curso → @aiox-master (`*correct-course`)
- Pesquisa aprofundada → @analyst (`*research`)

### Modo Bob (user_profile=bob)
- O PM atua como orquestrador quando `user_profile: bob`
- Inicia (spawn) outros agentes via TerminalSpawner
- Persistência do estado de sessão em `.aiox/bob-session/`

### Localizações-Chave
- PRD: `docs/prd/` (fragmentado)
- Epics: `docs/stories/epics/`
- Templates: `.aiox-core/development/templates/`

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{padrão}** | Origem: {agente} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {motivo} -->
