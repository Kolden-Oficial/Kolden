---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Configurar as Settings do Claude Code

**Task ID:** CCM-CONFIG-001
**Version:** 1.0.0
**Command:** `*configure`
**Orchestrator:** Sigil (config-engineer)
**Purpose:** Configurar as settings do Claude Code para um projeto analisando as necessidades do projeto e gerando um `.claude/settings.json` sob medida com permissões, regras de deny e configuração de servidor MCP apropriadas.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Analisar      | --> | 2. Gerar         | --> | 3. Definir o     |
  |    Necessidades  |     |    settings.json |     |    Modo de       |
  |    do Projeto    |     |                  |     |    Permissão     |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Configurar    | --> | 5. Configurar    | --> |    VALIDAR       |
  |    Servidores MCP|     |    Variáveis Env |     |    & EMITIR      |
  +------------------+     +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Diretório válido com arquivos de projeto |
| security_level | string | Parâmetro do usuário | Não | `standard` (padrão), `strict`, `enterprise` |
| existing_settings | object | .claude/settings.json | Não | Configuração existente para fazer merge |

---

## Pré-condições

- Acesso de escrita ao diretório .claude/
- Compreensão da stack tecnológica do projeto (detectada ou informada pelo usuário)
- Se houver settings.json existente: o usuário confirma a estratégia de merge ou sobrescrita

---

## Fases de Execução

### Fase 1: Analisar Necessidades do Projeto

1. Escaneie o projeto em busca de marcadores de tecnologia:
   - Gerenciador de pacotes: npm, yarn, pnpm, bun (verifique os lock files)
   - Framework: Next.js, Vite, Express, Fastify, Django, etc.
   - Testes: Jest, Vitest, Playwright, Cypress
   - Banco de dados: migrações Supabase, Prisma, Drizzle
   - AIOS: Verifique a presença do diretório .aios-core/
2. Identifique padrões de arquivos sensíveis:
   - `.env`, `.env.*`, `.env.local`
   - `secrets/`, `credentials/`, `private/`
   - `*.pem`, `*.key`, `*.p12`
3. Identifique operações de desenvolvimento seguras:
   - Scripts de pacote do package.json
   - Operações de git somente leitura
   - Test runners, linters, formatadores
4. Documente as constatações para o usuário

### Fase 2: Gerar settings.json

Construa o arquivo de settings seguindo a metodologia deny-first:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*.pem)",
      "Read(./**/*.key)",
      "Bash(rm -rf *)",
      "Bash(curl * | bash)",
      "Bash(wget * | bash)"
    ],
    "allow": [],
    "defaultMode": "acceptEdits"
  }
}
```

Preencha `allow` com base nas necessidades detectadas do projeto:
- **Sempre:** `Bash(git status)`, `Bash(git diff *)`, `Bash(git log *)`
- **Node.js:** `Bash(npm run *)`, `Bash(npx *)`, `Bash(node *)`
- **Python:** `Bash(python *)`, `Bash(pip *)`, `Bash(pytest *)`
- **Testes:** `Bash({test-runner} *)` com base no framework detectado
- **Build:** Permita os comandos de build detectados
- **Lint:** Permita os comandos de lint/format detectados

### Fase 3: Definir o Modo de Permissão

Selecione o modo de permissão apropriado:

| Nível de Segurança | Modo Padrão | Justificativa |
|---------------|--------------|-----------|
| standard | acceptEdits | Aprova automaticamente edições de arquivo, pergunta para bash/rede |
| strict | askAlways | Pergunta para toda operação, incluindo edições |
| enterprise | askAlways | Mais as restrições de managed-settings.json |

Apresente o modo selecionado com explicação. Permita a substituição pelo usuário.

**Referência da Hierarquia de Settings (para conhecimento do usuário):**

```
managed-settings.json  (mais alta -- não pode ser sobrescrita)
  > argumentos de CLI   (apenas na sessão)
  > settings.local.json (pessoal, gitignored)
  > settings.json       (compartilhado, commitado)
  > ~/.claude/settings.json (nível de usuário, mais baixa)
```

### Fase 4: Configurar Servidores MCP

1. Pergunte de quais servidores MCP o projeto precisa
2. Para cada servidor selecionado, adicione ao settings.json ou ao .claude/mcp.json:
   ```json
   {
     "mcpServers": {
       "context7": {
         "command": "npx",
         "args": ["-y", "@context7/mcp-server"]
       }
     }
   }
   ```
3. Configurações de servidor comuns:
   - **context7**: Consulta de documentação de bibliotecas (não precisa de API key)
   - **playwright**: Automação de navegador (não precisa de API key)
   - **exa**: Busca na web (requer EXA_API_KEY)
   - **supabase**: Banco de dados (requer SUPABASE_ACCESS_TOKEN)
4. Para servidores que requerem API keys: adicione um placeholder com comentário, nunca faça hardcode de chaves reais
5. Adicione regras de permissão específicas de MCP:
   - `MCP({server-name})` à lista de allow para servidores aprovados
   - `MCP(filesystem)` à lista de deny se não for necessário

### Fase 5: Configurar Variáveis de Ambiente

1. Documente as variáveis de ambiente recomendadas para as settings:
   - `ANTHROPIC_MODEL`: Substituição de modelo se necessário
   - `CLAUDE_CODE_EFFORT_LEVEL`: high/medium/low
   - `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`: Gerenciamento de contexto
   - `BASH_DEFAULT_TIMEOUT_MS`: Timeout de comando
2. Se enterprise: adicione env vars organizacionais à configuração managed
3. Crie um bloco de comentário de referência no topo do settings.json:
   ```json
   // Variáveis de ambiente podem ser definidas no .env ou no profile do shell:
   // CLAUDE_CODE_EFFORT_LEVEL=high
   // CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50
   ```
   (Nota: JSON não suporta comentários -- forneça como documentação separada)

---

## Formato de Saída

```markdown
## Configuração Concluída

**Nível de Segurança:** {standard | strict | enterprise}
**Modo de Permissão:** {defaultMode}

### Gerado: .claude/settings.json

| Seção | Contagem | Detalhes |
|---------|-------|---------|
| regras de deny | {N} | Bloqueia: {resumo} |
| regras de allow | {N} | Permite: {resumo} |
| servidores MCP | {N} | {nomes dos servidores} |

### Regras de Permissão

**Deny (avaliadas primeiro):**
{lista numerada de regras de deny com explicações}

**Allow:**
{lista numerada de regras de allow com explicações}

### Variáveis de Ambiente

| Variável | Valor Recomendado | Propósito |
|----------|-------------------|---------|
| {nome} | {valor} | {propósito} |

### Verificação

Execute `*audit-settings` para validar a configuração.
```

---

## Condições de Veto

- **NUNCA** gere um settings.json sem regras de deny. Toda configuração deve, no mínimo, bloquear arquivos sensíveis.
- **NUNCA** faça hardcode de API keys, tokens ou credenciais em arquivos de settings. Use variáveis de ambiente ou placeholders.
- **NUNCA** defina `bypassPermissions` como modo padrão, a menos que o usuário solicite explicitamente e reconheça as implicações de segurança.
- **NUNCA** permita `Bash(rm -rf *)` ou outras operações destrutivas na lista de allow.
- **NUNCA** faça merge de settings sem mostrar ao usuário o diff entre a configuração antiga e a nova.

---

## Critérios de Conclusão

- [ ] Necessidades do projeto analisadas (tecnologia, arquivos sensíveis, operações seguras)
- [ ] settings.json gerado com regras de permissão deny-first
- [ ] Modo de permissão selecionado e justificado
- [ ] Servidores MCP configurados com credenciais placeholder
- [ ] Recomendações de variáveis de ambiente documentadas
- [ ] Resumo da configuração exibido ao usuário
