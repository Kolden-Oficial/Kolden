---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Assistente de Setup

**Task ID:** CCM-CHIEF-003
**Version:** 1.0.0
**Command:** `*setup-wizard`
**Orchestrator:** Orion (claude-mastery-chief)
**Purpose:** Assistente interativo para configurar o Claude Code em um projeto novo ou existente, gerando todos os arquivos de configuração necessários sob medida para o tipo de projeto detectado.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Detectar      | --> | 2. Gerar         | --> | 3. Configurar    |
  |    Tipo de Projeto|    |    CLAUDE.md     |     |    settings.json |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Criar         | --> | 5. Configurar    | --> | 6. Configurar    |
  |    .claude/rules |     |    Hooks         |     |    Servidores MCP|
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+
  | 7. Criar         | --> |    COMPLETO      |
  |    Agentes (opc.)|     |    Resumo        |
  +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Deve ser um diretório válido |
| mode | string | Parâmetro do usuário | Não | `guided` (padrão, interativo) ou `express` (defaults inteligentes) |
| preset | string | Parâmetro do usuário | Não | Override do tipo de projeto (monorepo, fullstack, library, api, cli) |

---

## Pré-condições

- O diretório de trabalho é a raiz de um projeto
- Acesso de escrita ao diretório do projeto
- Nenhum diretório .claude/ existente (ou o usuário confirma a sobrescrita)

---

## Fases de Execução

### Fase 1: Detectar o Tipo de Projeto

Analise o projeto para determinar seu tipo:

1. Verifique marcadores de projeto:
   - `package.json` -> projeto Node.js; verifique o campo `workspaces` (monorepo)
   - `next.config.*` -> Next.js fullstack
   - `vite.config.*` -> frontend Vite
   - `tsconfig.json` -> projeto TypeScript
   - `pyproject.toml` / `setup.py` -> projeto Python
   - `Cargo.toml` -> projeto Rust
   - `go.mod` -> projeto Go
   - `.aios-core/` -> projeto gerenciado por AIOS
2. Detecte a estrutura do projeto:
   - `src/app/` ou `app/` -> App Router (Next.js)
   - `src/pages/` -> Pages Router
   - `packages/` ou `apps/` -> Monorepo
   - `src/lib/` ou `lib/` -> Biblioteca
   - `src/api/` ou `server/` -> Backend de API
3. Apresente o resultado da detecção e peça ao usuário para confirmar ou sobrescrever

**Matriz de Tipos de Projeto:**

| Tipo | Marcadores | Modo de Permissão Padrão |
|------|---------|------------------------|
| monorepo | workspaces, packages/ | acceptEdits |
| fullstack | next.config, app/ + api/ | acceptEdits |
| frontend | vite.config, src/components | acceptEdits |
| api | server/, dependência express/fastify | acceptEdits |
| library | main/module no package.json | askAlways |
| cli | campo bin/ no package.json | askAlways |
| python | pyproject.toml, src/ | acceptEdits |
| aios | diretório .aios-core/ | acceptEdits |

### Fase 2: Gerar o CLAUDE.md

1. Crie `.claude/CLAUDE.md` (ou `./CLAUDE.md` conforme a preferência do usuário)
2. Inclua seções com base no tipo de projeto:
   - **Visão geral do projeto**: Nome, descrição, stack tecnológica
   - **Comandos de desenvolvimento**: Build, test, lint, dev server
   - **Padrões de código**: Convenções de nomenclatura, padrões, organização de arquivos
   - **Testes**: Framework de teste, requisitos de cobertura, como executar
   - **Notas de arquitetura**: Diretórios-chave e seu propósito
3. Use @imports para documentos de referência grandes
4. Meta: menos de 200 linhas
5. Se for projeto AIOS: inclua seções específicas do AIOS (sistema de agentes, workflows)

### Fase 3: Configurar o settings.json

1. Crie `.claude/settings.json` com:
   - **permissions.deny**: Arquivos sensíveis (.env, secrets/, credentials)
   - **permissions.allow**: Operações de desenvolvimento seguras com base no tipo de projeto
   - **permissions.defaultMode**: Com base na matriz de tipos de projeto
2. Adicione regras específicas do projeto:
   - Monorepo: permitir Read/Edit em todos os pacotes
   - Frontend: permitir Bash(npm run dev), Bash(npm run build)
   - API: negar chamadas de rede externas por padrão
   - Library: permissões mais rígidas (askAlways)
3. Se for projeto AIOS: adicione regras de deny de proteção de fronteiras L1-L4

### Fase 4: Configurar o .claude/rules/

1. Crie o diretório `.claude/rules/`
2. Gere regras condicionais com base na estrutura do projeto:
   - **api-rules.md**: convenções de API (se existir src/api/ ou server/)
     - `paths: ["src/api/**", "server/**"]`
   - **test-rules.md**: convenções de teste (se existir tests/ ou __tests__/)
     - `paths: ["tests/**", "**/*.test.*", "**/*.spec.*"]`
   - **component-rules.md**: padrões de componentes (se existir src/components/)
     - `paths: ["src/components/**", "**/*.tsx"]`
   - **database-rules.md**: padrões de migração (se existir migrations/ ou supabase/)
     - `paths: ["migrations/**", "supabase/**"]`
3. Crie uma regra incondicional para convenções de todo o projeto

### Fase 5: Configurar Hooks

1. Pergunte ao usuário sobre suas necessidades de automação:
   - Validação de pre-commit? (lint, format, type check)
   - Segurança de comandos? (bloquear comandos bash perigosos)
   - Logging de sessão? (rastrear uso de ferramentas)
   - Preservação na compactação? (salvar contexto antes da auto-compactação)
2. Gere a configuração de hooks com base nas respostas:
   ```json
   {
     "hooks": {
       "PreToolUse": [{
         "matcher": "Bash",
         "hooks": [{ "type": "command", "command": "...", "timeout": 10 }]
       }],
       "PreCompact": [{
         "hooks": [{ "type": "command", "command": "...", "timeout": 5 }]
       }]
     }
   }
   ```
3. Para o modo express: aplique defaults sensatos (guarda de bash no PreToolUse + PreCompact)

### Fase 6: Configurar Servidores MCP

1. Pergunte ao usuário quais capacidades ele precisa:
   - Busca web (Exa)
   - Documentação de bibliotecas (Context7)
   - Automação de navegador (Playwright)
   - Acesso a banco de dados (Supabase, Postgres)
   - Acesso estendido ao sistema de arquivos
2. Gere `.claude/mcp.json` com os servidores selecionados
3. Forneça instruções de setup para cada servidor (comandos de instalação, API keys necessárias)
4. Para o modo express: configure o Context7 (o mais universalmente útil)

### Fase 7: Criar Agentes (Opcional)

1. Pergunte se o usuário precisa de subagents customizados
2. Em caso afirmativo, crie o diretório `.claude/agents/` com agentes iniciais:
   - **reviewer.md**: agente de revisão de código com ferramentas somente leitura
   - **planner.md**: agente de planejamento com escopo limitado
3. Cada agente recebe um frontmatter YAML adequado:
   ```yaml
   ---
   name: Reviewer
   description: Especialista em revisão de código
   tools: [Read, Grep, Glob]
   ---
   ```
4. Para o modo express: pule, a menos que o usuário solicite explicitamente

---

## Formato de Saída

```markdown
## Setup Concluído

**Projeto:** {project-name}
**Tipo:** {detected-type}
**Modo:** {guided | express}

### Arquivos Criados

| Arquivo | Propósito | Linhas |
|------|---------|-------|
| .claude/CLAUDE.md | Instruções do projeto | {N} |
| .claude/settings.json | Permissões e configuração | {N} |
| .claude/rules/{name}.md | Regra condicional | {N} |
| ... | ... | ... |

### Resumo da Configuração

- **Modo de permissão:** {defaultMode}
- **Regras de deny:** {count} regras protegendo arquivos sensíveis
- **Regras de allow:** {count} regras para operações de desenvolvimento
- **Hooks:** {count} hooks configurados ({nomes dos eventos})
- **Servidores MCP:** {count} servidores ({nomes})
- **Agentes customizados:** {count} agentes ({nomes})

### Próximos Passos

1. Revise o .claude/settings.json e ajuste as permissões
2. Customize o CLAUDE.md com instruções específicas do projeto
3. Execute `*audit` para verificar se o setup obteve boa pontuação
4. {Passos adicionais com base no tipo de projeto}
```

---

## Condições de Veto

- **NUNCA** sobrescreva a configuração .claude/ existente sem confirmação explícita do usuário. Sempre pergunte primeiro.
- **NUNCA** inclua API keys, tokens ou segredos reais nos arquivos de configuração gerados. Use valores placeholder com comentários.
- **NUNCA** defina `bypassPermissions` como modo padrão. Comece com `acceptEdits` ou `askAlways`.
- **NUNCA** crie um CLAUDE.md com mais de 200 linhas. Divida em @imports e .claude/rules/ se o conteúdo exceder o limite.
- **NUNCA** pule a etapa de confirmação da detecção do tipo de projeto, mesmo no modo express.

---

## Critérios de Conclusão

- [ ] Tipo de projeto detectado e confirmado
- [ ] CLAUDE.md gerado com menos de 200 linhas
- [ ] settings.json criado com regras de permissão deny-first
- [ ] Pelo menos um arquivo .claude/rules/ criado com frontmatter paths:
- [ ] Hooks configurados (no mínimo no modo guided)
- [ ] Seção de servidores MCP tratada (configurada ou explicitamente pulada)
- [ ] Resumo do setup exibido com lista de arquivos e próximos passos
