# Memória do Agente PO (Pax)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Responsabilidades
- Validação de story (`*validate-story-draft`) — checklist de 10 pontos
- Gestão e priorização do backlog
- Ciclo de vida da story: transição Draft → Ready (DEVE atualizar o status)
- Rastreamento do contexto do epic

### Checklist de Validação (10 Pontos)
1. Título claro
2. Descrição completa
3. AC testável (Given/When/Then)
4. Escopo definido (IN/OUT)
5. Dependências mapeadas
6. Estimativa de complexidade
7. Valor de negócio
8. Riscos documentados
9. Critérios de Done
10. Alinhamento com PRD/Epic

### Permissões do Arquivo de Story
- PODE editar: seção QA Results (ao revisar)
- DEVE atualizar: campo Status (Draft → Ready no GO)
- NÃO PODE modificar: AC, Scope, Title, Dev Notes, Testing

### Delegação
- Criação de story → @sm (`*draft`)
- Criação de epic → @pm (`*create-epic`)
- Correção de curso → @aiox-master

### Localizações-Chave
- Stories: `docs/stories/`
- Backlog: `docs/stories/backlog/`
- Templates: `.aiox-core/development/templates/story-tmpl.yaml`

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{padrão}** | Origem: {agente} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {motivo} -->
