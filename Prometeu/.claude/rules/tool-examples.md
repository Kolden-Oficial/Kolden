---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/rules/_indice|_indice]]"
---

# Exemplos de Entrada de Ferramentas — Orientação de Seleção

## Propósito

Melhorar a precisão na seleção de ferramentas fornecendo exemplos concretos de entrada para as ferramentas mais usadas. Ao escolher qual ferramenta usar, consulte estes exemplos para combinar a tarefa atual com a ferramenta correta.

## Conformidade com ADR-5

Estes exemplos se aplicam SOMENTE a ferramentas sempre carregadas (Tier 1/2) e a ferramentas Tier 3 essenciais. Ferramentas Tier 3 não essenciais são descobertas via busca de ferramentas — NÃO consulte exemplos para elas.

## Exemplos de Ferramentas

### context7 — Consulta de Documentação de Bibliotecas
Use quando precisar de documentação atualizada de uma biblioteca ou framework.
- **Documentação do React:** `resolve-library-id("react")` e depois `get-library-docs` com o tópico "server components"
- **RLS do Supabase:** `resolve-library-id("supabase")` e depois `get-library-docs` com o tópico "row level security"
- **Mocks do Jest:** `resolve-library-id("jest")` e depois `get-library-docs` com o tópico "mock functions"

### git — Controle de Versão
Use para estado do repositório, histórico e gerenciamento de branches.
- **Verificar mudanças:** `git diff --stat` — resumo das mudanças não commitadas a nível de arquivo
- **Histórico recente:** `git log --oneline -10` — últimos 10 commits com mensagens convencionais
- **Comparação de branches:** `git diff main...HEAD --stat` — todas as mudanças desde o branch a partir da main

### coderabbit — Revisão Automatizada de Código
Use antes de commits e PRs para validação de qualidade. Roda no WSL.
- **Pré-commit:** `wsl bash -c 'cd /mnt/c/.../aiox-core && ~/.local/bin/coderabbit --prompt-only -t uncommitted'`
- **Pré-PR:** `wsl bash -c 'cd /mnt/c/.../aiox-core && ~/.local/bin/coderabbit --prompt-only --base main'`

### browser — Testes Web
Use para validação de UI, verificações de console e interação web.
- **Navegar:** Abrir `http://localhost:3000` para inspecionar a aplicação em execução
- **Verificação de console:** Navegar até uma página e verificar erros/avisos de JavaScript

### supabase — Operações de Banco de Dados
Use para migrations e gerenciamento de banco de dados.
- **Aplicar migrations:** `supabase db push`
- **Verificar status:** `supabase migration list`

### github-cli — Operações do GitHub
Use para PRs, issues e gerenciamento de repositório. `@devops` exclusivo para push/PR.
- **Criar PR:** `gh pr create --title 'feat: ...' --body '## Summary...'`
- **Listar issues:** `gh issue list --state open --label bug`
- **Status de PR:** `gh pr view 123 --json reviews,statusCheckRollup`

### nogic — Inteligência de Código (Essencial)
Use para análise de código, rastreamento de dependências e padrões de uso.
- **Dependências:** Analisar a cadeia de imports de um módulo específico
- **Usos:** Encontrar todos os locais onde uma função é chamada

### code-graph — Análise de Dependências (Essencial)
Use para grafos de dependências e detecção de dependências circulares.
- **Árvore de dependências:** Gerar grafo para um pacote com profundidade configurável
- **Verificação de ciclos:** Detectar cadeias de dependências circulares no projeto

### docker-gateway — Infraestrutura MCP
Use para gerenciar servidores MCP baseados em Docker. `@devops` gerencia a infraestrutura.
- **Verificação de saúde:** `curl http://localhost:8080/health`
- **Listar servidores:** `docker mcp server ls`

## Referência

Registro completo de exemplos: `.aiox-core/data/mcp-tool-examples.yaml`
Registro de ferramentas: `.aiox-core/data/tool-registry.yaml`
