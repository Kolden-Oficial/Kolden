---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Configurar um Repositório com Integração ao Claude Code

**Task ID:** CCM-PI-001
**Version:** 1.0.0
**Command:** `*setup-repository`
**Agent:** Conduit (project-integrator)
**Purpose:** Configurar um novo repositório com integração completa ao Claude Code do zero, criando a estrutura de diretórios .claude/, o CLAUDE.md, os settings, as regras e os hooks.

---

## Visão Geral

```
  Diretório do Projeto
       |
       v
  +------------------+
  | 1. Inicializar Git|
  |    (se necessário)|
  +------------------+
       |
       v
  +------------------+
  | 2. Criar a Árvore |
  |    .claude/       |
  +------------------+
       |
       v
  +------------------+
  | 3. Gerar          |
  |    CLAUDE.md      |
  +------------------+
       |
       v
  +------------------+
  | 4. Configurar     |
  |    settings.json  |
  +------------------+
       |
       v
  +------------------+
  | 5. Configurar Regras |
  |    (.claude/rules)|
  +------------------+
       |
       v
  +------------------+
  | 6. Configurar Hooks|
  |    (opcional)     |
  +------------------+
       |
       v
  +------------------+
  | 7. Verificar Setup|
  +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_path | string | Usuário | Sim | Deve ser um caminho de diretório válido |
| project_type | enum | Usuário | Sim | `monorepo`, `fullstack`, `frontend`, `backend`, `library`, `mobile` |
| team_size | enum | Usuário | Não | `solo`, `small` (2-5), `medium` (6-15), `enterprise` (15+) |
| existing_git | boolean | Detecção | Não | Detectado automaticamente pela presença de .git/ |

---

## Pré-condições

- O diretório de destino existe e é gravável
- Node.js 18+ disponível no PATH
- Git instalado e configurado com user.name e user.email

---

## Fases de Execução

### Fase 1: Inicializar o Repositório Git

1. Verifique se o diretório `.git/` existe no caminho de destino
2. Se ausente, execute `git init` e crie um `.gitignore` inicial
3. Se presente, anote a branch atual e o histórico recente para contexto
4. Valide se o git config tem user.name e user.email definidos

**Condição de pular:** Git já inicializado.

### Fase 2: Criar a Estrutura de Diretórios .claude/

Crie a árvore de diretórios completa:

```
.claude/
  CLAUDE.md
  settings.json
  settings.local.json    # template gitignored
  rules/                 # regras contextuais
  commands/              # comandos slash (opcional)
  skills/                # definições de skills (opcional)
  agent-memory/          # memória persistente (opcional)
```

Para cada diretório:
1. Crie o diretório se não estiver presente
2. Adicione `.gitkeep` para diretórios opcionais vazios
3. Registre a criação no log de saída

### Fase 3: Gerar o CLAUDE.md

Gere um CLAUDE.md específico do projeto seguindo as melhores práticas:

1. **Contexto do projeto** (1-2 linhas): o que é o projeto, linguagem/framework principal
2. **Comandos de Build & Test**: comandos exatos para `dev`, `build`, `test`, `lint`, `typecheck`
3. **Padrões de Código**: convenções de nomenclatura, estilo de import, padrão de tratamento de erros
4. **Estrutura de Arquivos**: diretórios-chave e seu propósito (5-10 entradas)
5. **Arquivos Protegidos**: arquivos que nunca devem ser modificados pela IA
6. **Padrões Comuns**: 2-3 trechos de código mostrando as convenções do projeto

**Restrições:**
- Mantenha com menos de 150 linhas no total
- Apenas conteúdo universalmente aplicável
- Conhecimento específico de domínio vai em rules/ ou skills/

### Fase 4: Configurar o settings.json

Crie `.claude/settings.json` com:

1. **permissions.allow**: operações seguras para o tipo de projeto
   - Comandos de build, de teste, de lint
   - Leitura/escrita de arquivos dentro do escopo do projeto
2. **permissions.deny**: operações perigosas
   - `rm -rf /`, `git push --force`, acesso ao banco de dados de produção
   - Caminhos protegidos pelo framework se estiver usando AIOS
3. **rules**: configuração de carregamento de regras baseada em caminho

Adapte as permissões com base em `project_type`:
- `monorepo`: inclua comandos cientes de workspace
- `fullstack`: inclua ferramentas de build de frontend e de backend
- `library`: inclua regras de deny relacionadas a publicação

### Fase 5: Configurar as Regras Iniciais

Crie arquivos de regras em `.claude/rules/`:

1. **coding-standards.md**: convenções específicas da linguagem detectadas no projeto
2. **testing.md**: padrões e requisitos de teste (específicos do framework)
3. **git-workflow.md**: nomenclatura de branches, convenções de commit, orientação de template de PR

Cada arquivo de regra inclui frontmatter `paths:` para carregamento contextual:
```yaml
---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---
```

### Fase 6: Configurar Hooks (Opcional)

Se o usuário quiser hooks de automação:

1. Detecte a infraestrutura de hooks disponível (pre-commit, husky, lefthook)
2. Crie o diretório `.claude/hooks/` se for usar hooks do Claude Code
3. Sugira configurações de hook para:
   - `PreToolUse`: validação de comando (bloquear padrões perigosos)
   - `PostToolUse`: logging e métricas
   - `Stop`: geração de resumo da sessão
4. Forneça templates de hook, não force a instalação

### Fase 7: Verificar o Setup

Execute verificações:

1. Confirme que `.claude/CLAUDE.md` existe e tem menos de 150 linhas
2. Confirme que `.claude/settings.json` é um JSON válido
3. Confirme que o diretório rules/ tem pelo menos um arquivo de regra
4. Teste se o git status reconhece os novos arquivos
5. Gere o relatório de setup com pass/fail por componente

---

## Formato de Saída

```markdown
## Relatório de Setup do Repositório

**Projeto:** {project_path}
**Tipo:** {project_type}
**Data:** {YYYY-MM-DD}

### Componentes Criados

| Componente | Status | Caminho |
|-----------|--------|------|
| .claude/CLAUDE.md | PASS | .claude/CLAUDE.md |
| settings.json | PASS | .claude/settings.json |
| Regras | PASS | .claude/rules/ (N arquivos) |
| Hooks | SKIP/PASS | .claude/hooks/ |

### Resumo do CLAUDE.md
- Linhas: {N}/150
- Seções: {lista}

### Próximos Passos
1. Revise o CLAUDE.md e ajuste o contexto do projeto
2. Execute `claude` para testar a integração
3. Considere adicionar skills com `*create-skill`
```

---

## Condições de Veto

- **NUNCA** sobrescreva um CLAUDE.md existente sem confirmação do usuário
- **NUNCA** adicione regras de allow para comandos destrutivos (rm -rf, drop database)
- **NUNCA** configure hooks que bloqueiem o fluxo de trabalho sem opt-in explícito
- **NUNCA** faça commit automático dos arquivos gerados -- deixe o usuário revisar primeiro

---

## Critérios de Conclusão

- [ ] Estrutura de diretórios .claude/ criada
- [ ] CLAUDE.md gerado com menos de 150 linhas e conteúdo específico do projeto
- [ ] settings.json configurado com permissões apropriadas
- [ ] Pelo menos um arquivo de regra criado em .claude/rules/
- [ ] Todas as verificações aprovadas
- [ ] Relatório de setup apresentado ao usuário
