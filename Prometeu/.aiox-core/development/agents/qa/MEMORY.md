---
tipo: memoria
squad: Prometeu
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/agents/qa|qa]]"
---

# Memória do Agente QA (Quinn)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Padrões de Revisão
- Atualizar APENAS a seção "QA Results" nos arquivos de story
- Decisões de gate: PASS / CONCERNS / FAIL / WAIVED
- Auto-cura do CodeRabbit: máximo de 3 iterações, auto-correção de CRITICAL+HIGH

### Infraestrutura de Testes
- `npm test` — Jest 30.2.0
- `npm run lint` — ESLint
- Localização dos testes: diretório `tests/`, espelha a estrutura do código-fonte
- Cobertura: `npm run test:coverage`

### Verificações de Qualidade (7 pontos)
1. Revisão de código (padrões, legibilidade)
2. Testes unitários (cobertura, passando)
3. Acceptance criteria atendidos
4. Sem regressões
5. Performance aceitável
6. Segurança (fundamentos do OWASP)
7. Documentação atualizada

### Problemas Comuns
- Separadores de caminho do Windows em asserções de teste
- Execução do CodeRabbit no WSL: `wsl bash -c 'cd /mnt/c/... && ~/.local/bin/coderabbit ...'`
- Métricas do SYNAPSE em `.synapse/metrics/`
- Benchmarks do pipeline em `tests/synapse/benchmarks/`

### Regras de Git
- Somente leitura: `git status`, `git log`, `git diff`
- NUNCA fazer commit ou push

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
