# Checklist de Auditoria de Memória

Checklist periódico para manter a higiene do MEMORY.md dos agentes em todos os 10 agentes.

**Frequência:** Uma vez por sprint ou após concluir um epic.
**Executor:** Qualquer agente (`@po *execute-checklist memory-audit-checklist`)

---

## Passos

### Passo 1: Ler Todos os Arquivos MEMORY.md
- [ ] Ler todos os 10 arquivos MEMORY.md dos agentes em `.aiox-core/development/agents/*/MEMORY.md`
- [ ] Confirmar que cada arquivo tem a estrutura de 3 seções: `## Active Patterns`, `## Promotion Candidates`, `## Archived`

### Passo 2: Identificar Padrões Entre Agentes
- [ ] Cruzar referências dos Active Patterns em todos os 10 arquivos
- [ ] Sinalizar padrões que aparecem em **3 ou mais arquivos MEMORY.md de agentes** como candidatos a promoção
- [ ] Documentar cada candidato com: texto do padrão, quais agentes o contêm, contagem

### Passo 3: Registrar Candidatos a Promoção
- [ ] Para cada padrão entre agentes encontrado no Passo 2, adicionar em `## Promotion Candidates` no MEMORY.md do agente de origem
- [ ] Usar o formato: `- **{pattern}** | Source: {agent} | Detected: {YYYY-MM-DD}`
- [ ] Se o padrão já existir em Promotion Candidates, pular (sem duplicatas)

### Passo 4: Identificar Entradas Obsoletas
- [ ] Revisar os Active Patterns em busca de entradas contraditas pelo codebase atual
- [ ] Revisar os Active Patterns em busca de entradas substituídas por padrões mais recentes ou mudanças de código
- [ ] Revisar os Active Patterns em busca de entradas que não são mais relevantes ao estado atual do projeto

### Passo 5: Arquivar Entradas Obsoletas
- [ ] Mover entradas obsoletas de `## Active Patterns` para `## Archived`
- [ ] Usar o formato: `- ~~{pattern}~~ | Archived: {YYYY-MM-DD} | Reason: {reason}`
- [ ] Razões válidas: "superseded by {X}", "contradicted by {Y}", "no longer relevant"

### Passo 6: Reportar Resumo
- [ ] Total de padrões ativos em todos os agentes
- [ ] Novos candidatos a promoção identificados nesta auditoria
- [ ] Entradas recém-arquivadas nesta auditoria
- [ ] Ações recomendadas (ex.: "elevar o padrão X para `.claude/rules/`")

---

## Padrões Esperados Entre Agentes

Padrões comuns que tipicamente aparecem em múltiplos agentes:

| Padrão | Agentes Esperados | Ação |
|---------|----------------|--------|
| "NEVER push — delegate to @devops" | dev, qa, analyst, sm, data-engineer, ux | Promover para `.claude/rules/` |
| Sistema de módulos CommonJS | dev, analyst, sm, data-engineer, ux, architect | Já está no CLAUDE.md |
| Formato Conventional commits | dev, qa, devops, analyst, sm, data-engineer, ux | Já está no CLAUDE.md |
| kebab-case para arquivos | dev, analyst, sm, data-engineer, ux | Já está no CLAUDE.md |
