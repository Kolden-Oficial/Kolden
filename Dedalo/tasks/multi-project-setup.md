---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Setup de Claude Code para Múltiplos Projetos

**Task ID:** CCM-PI-004
**Version:** 1.0.0
**Command:** `*multi-project-setup`
**Agent:** Conduit (project-integrator)
**Purpose:** Configurar o Claude Code para múltiplos projetos relacionados, configurando settings de usuário compartilhados, overrides específicos por projeto, servidores MCP compartilhados e regras cross-project.

---

## Visão Geral

```
  Múltiplos Projetos
       |
       v
  +-----------------------+
  | 1. Analisar           |
  |    Relações entre Projetos |
  +-----------------------+
       |
       v
  +-----------------------+
  | 2. Configurar Settings|
  |    de Usuário Compartilhados |
  +-----------------------+
       |
       v
  +-----------------------+
  | 3. Criar Settings     |
  |    por Projeto        |
  +-----------------------+
       |
       v
  +-----------------------+
  | 4. Configurar         |
  |    Servidores MCP Compartilhados |
  +-----------------------+
       |
       v
  +-----------------------+
  | 5. Configurar Regras  |
  |    Compartilhadas     |
  +-----------------------+
       |
       v
  +-----------------------+
  | 6. Verificar Coerência|
  |    Cross-Project      |
  +-----------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| projects | object[] | Usuário | Sim | Array de {path, name, type} para cada projeto |
| relationship | enum | Usuário | Sim | `monorepo`, `polyrepo-shared-stack`, `polyrepo-independent`, `workspace` |
| shared_tools | string[] | Usuário | Não | Ferramentas usadas em todos os projetos (ex.: "eslint", "jest", "docker") |

---

## Pré-condições

- Todos os diretórios de projeto listados existem e estão acessíveis
- O usuário tem acesso de escrita a `~/.claude/` (configuração em nível de usuário)
- Cada projeto foi inicializado com git

---

## Fases de Execução

### Fase 1: Analisar as Relações entre Projetos

Para cada projeto, determine:

1. **Linguagem e framework**: detectar a partir de package.json, Cargo.toml, pyproject.toml, etc.
2. **Dependências compartilhadas**: quais pacotes aparecem em vários projetos
3. **Padrões compartilhados**: convenções de nomenclatura, semelhanças na estrutura de diretórios
4. **Padrões de comunicação**: os projetos importam uns dos outros (monorepo), compartilham APIs (microservices) ou operam de forma independente
5. **Topologia git**: repositório único com múltiplos pacotes versus repositórios separados

Construa um mapa de relações:
```
Projeto A (frontend Next.js) --importa--> shared-lib
Projeto B (API Node.js)      --importa--> shared-lib
Projeto C (ML em Python)     --independente--
shared-lib (TypeScript)      --consumido-por--> A, B
```

### Fase 2: Configurar Settings de Usuário Compartilhados

Crie ou atualize `~/.claude/settings.json`:

1. **Permissões globais**: comandos seguros em todos os projetos
   - `git status`, `git diff`, `git log`
   - Linters e formatadores agnósticos de linguagem
2. **Denies globais**: comandos perigosos independentemente do projeto
   - `rm -rf /`, `sudo`, `DROP DATABASE`, `git push --force`
3. **Preferências globais**: settings que se aplicam em todos os lugares
   - Preferências de formato de saída
   - Configuração de modelo padrão

Crie ou atualize `~/.claude/CLAUDE.md` (nível de usuário):
- Identidade e preferências do desenvolvedor
- Convenções cross-project (estilo de commit, formato de PR)
- Mantenha com menos de 50 linhas -- conteúdo específico do projeto vai no CLAUDE.md do projeto

### Fase 3: Criar Settings por Projeto

Para cada projeto, gere `.claude/settings.json`:

1. **Allows específicos do projeto**: comandos de build/test/lint para aquela stack
   - Frontend: `npm run dev`, `npm run build`, `npx next`
   - Backend: `npm run start:dev`, `npm run migrate`
   - Python: `python -m pytest`, `pip install`
2. **Denies específicos do projeto**: proteja os caminhos críticos daquele projeto
3. **additionalDirectories**: se os projetos referenciam uns aos outros
   ```json
   {
     "additionalDirectories": ["../shared-lib"]
   }
   ```
4. **CLAUDE.md do projeto**: contexto específico do projeto, comandos de build, estrutura

Garanta que não haja conflitos entre os settings em nível de usuário e em nível de projeto.

### Fase 4: Configurar Servidores MCP Compartilhados

Configure servidores MCP que atendem múltiplos projetos:

1. **Identificar necessidades compartilhadas**: quais MCPs beneficiam todos os projetos
   - Context7: consulta de documentação (universal)
   - EXA: busca web (universal)
   - Banco de dados: compartilhado se os projetos usam o mesmo BD
2. **Configurar em nível de usuário**: adicionar MCPs compartilhados a `~/.claude/settings.json`
3. **Configurar MCPs específicos do projeto**: nos settings de cada projeto
4. **Evitar duplicação**: o mesmo MCP não deve ser configurado em ambos os níveis

### Fase 5: Configurar Regras Compartilhadas

Crie regras que se aplicam a todos os projetos:

1. **Regras em nível de usuário** (`~/.claude/rules/`): convenções do time
   - Formato de mensagem de commit
   - Checklist de revisão de código
   - Padrões de documentação
2. **Regras em nível de projeto** (`.claude/rules/`): específicas do projeto
   - Padrões de codificação para aquela linguagem/framework
   - Requisitos de teste para aquele projeto
   - Restrições de arquitetura
3. **Templates de regras compartilhadas**: para consistência entre novos projetos

### Fase 6: Verificar a Coerência Cross-Project

Execute a verificação em todos os projetos:

1. **Sem conflitos**: settings em nível de usuário e de projeto não se contradizem
2. **Cobertura completa**: todo projeto tem CLAUDE.md + settings.json
3. **Consistência de MCP**: MCPs compartilhados acessíveis a partir de todos os projetos
4. **Consistência de regras**: nenhuma regra contraditória entre projetos
5. **Precisão de caminhos**: additionalDirectories apontam para caminhos válidos

---

## Formato de Saída

```markdown
## Relatório de Setup de Múltiplos Projetos

**Projetos:** {N} projetos configurados
**Relação:** {relationship}
**Data:** {YYYY-MM-DD}

### Mapa de Projetos

| Projeto | Tipo | Stack | Servidores MCP | Regras |
|---------|------|-------|-------------|-------|
| {name} | {type} | {stack} | {N} | {N} |

### Configuração Compartilhada

- Settings de usuário: ~/.claude/settings.json ({N} allows, {N} denies)
- CLAUDE.md de usuário: ~/.claude/CLAUDE.md ({N} linhas)
- MCPs compartilhados: {lista}
- Regras compartilhadas: {lista}

### Configuração por Projeto

**{project_name}:**
- .claude/CLAUDE.md: {N} linhas
- .claude/settings.json: {N} allows, {N} denies
- .claude/rules/: {N} arquivos
- additionalDirectories: {lista ou "nenhum"}

### Verificação Cross-Project

| Verificação | Status |
|-------|--------|
| Sem conflitos de settings | PASS/FAIL |
| Todos os projetos configurados | PASS/FAIL |
| Consistência de MCP | PASS/FAIL |
| Consistência de regras | PASS/FAIL |
| Precisão de caminhos | PASS/FAIL |
```

---

## Condições de Veto

- **NUNCA** sobrescreva settings de usuário existentes sem confirmação
- **NUNCA** adicione caminhos de projeto a additionalDirectories sem verificar que existem
- **NUNCA** configure servidores MCP que exijam credenciais sem o usuário fornecê-las
- **NUNCA** modifique os settings de projetos não listados na entrada

---

## Critérios de Conclusão

- [ ] Relações entre projetos analisadas e mapeadas
- [ ] Settings de usuário compartilhados configurados em ~/.claude/
- [ ] Settings por projeto criados para cada projeto
- [ ] Servidores MCP compartilhados configurados sem duplicação
- [ ] Regras cross-project estabelecidas
- [ ] Verificação de coerência aprovada
- [ ] Relatório de setup entregue
