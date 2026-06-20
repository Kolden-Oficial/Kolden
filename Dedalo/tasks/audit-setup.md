# Tarefa: Auditar a Configuração do Claude Code

**Task ID:** CCM-CHIEF-002
**Version:** 1.0.0
**Command:** `*audit`
**Orchestrator:** Orion (claude-mastery-chief)
**Purpose:** Realizar uma auditoria abrangente da configuração do Claude Code no projeto atual, gerando um relatório pontuado com recomendações acionáveis.

---

## Visão Geral

```
  +-------------------+     +-------------------+     +-------------------+
  | 1. Estrutura de   | --> | 2. Validação de   | --> | 3. Análise do     |
  |    Diretórios     |     |    Settings       |     |    CLAUDE.md      |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 4. Inventário     | --> | 5. Inventário de  | --> | 6. Cobertura de   |
  |    de Hooks       |     |    Servidores MCP |     |    Regras          |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 7. Definições     | --> | 8. Pontuação &    | --> |    RELATÓRIO      |
  |    de Agentes     |     |    Recomendações  |     |                   |
  +-------------------+     +-------------------+     +-------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Deve conter um diretório .claude/ ou ser uma raiz de projeto válida |
| depth | string | Parâmetro do usuário | Não | `quick` (verifica apenas 1-3) ou `full` (padrão, todas as 8 verificações) |

---

## Pré-condições

- O diretório de trabalho é uma raiz de projeto (tem package.json, .git/ ou marcadores de projeto similares)
- Acesso de leitura ao diretório .claude/ e seus subdiretórios
- Acesso de leitura aos arquivos de configuração do projeto

---

## Fases de Execução

### Fase 1: Verificar a Estrutura do Diretório .claude/

Verifique a presença e a estrutura do diretório .claude/:

```
.claude/
  settings.json          # [OBRIGATÓRIO] Settings compartilhadas do projeto
  settings.local.json    # [OPCIONAL] Settings locais pessoais (gitignored)
  CLAUDE.md              # [OPCIONAL] Instruções do projeto (alt: ./CLAUDE.md)
  rules/                 # [RECOMENDADO] Diretório de regras condicionais
  agents/                # [OPCIONAL] Definições de subagent customizadas
  commands/              # [OPCIONAL] Slash commands customizados
  skills/                # [OPCIONAL] Definições de skill com SKILL.md
  mcp.json               # [OPCIONAL] Configuração de servidor MCP
```

Pontue cada item:
- OBRIGATÓRIO ausente = -20 pontos
- RECOMENDADO ausente = -10 pontos
- OPCIONAL ausente = apenas informativo

### Fase 2: Validar o Schema do settings.json

1. Leia `.claude/settings.json` e faça o parse como JSON
2. Valide a estrutura do schema:
   - O objeto `permissions` existe com arrays `allow`, `deny` e/ou `ask`
   - `permissions.defaultMode` é um modo válido (askAlways, acceptEdits, autoApprove)
   - As regras de permissão usam a sintaxe Tool(specifier) válida
   - Sem regras contraditórias (mesmo padrão em allow e deny)
3. Verifique `.claude/settings.local.json` se presente (mesma validação)
4. Verifique `~/.claude/settings.json` para settings de nível de usuário
5. Sinalize quaisquer conflitos entre as camadas de settings

### Fase 3: Verificar a Qualidade do CLAUDE.md

1. Localize o CLAUDE.md (verifique: `./CLAUDE.md`, `./.claude/CLAUDE.md`)
2. Meça a contagem de linhas (alvo: abaixo de 200 linhas)
3. Verifique a estrutura:
   - Tem cabeçalhos markdown para organização
   - Usa bullet points para instruções
   - Contém instruções concretas e verificáveis (não vagas)
4. Verifique o uso de @imports
5. Verifique as seções gerenciadas pelo AIOS (se for um projeto AIOS)
6. Sinalize se ultrapassar 200 linhas sem uso de @imports ou .claude/rules/

### Fase 4: Listar os Hooks Configurados

1. Leia a configuração de hooks do settings.json (chave `hooks`)
2. Para cada evento de hook, documente:
   - Nome do evento (PreToolUse, PostToolUse, etc.)
   - Tipo de hook (command, http, prompt, agent)
   - Padrão de matcher (se aplicável)
   - Valor de timeout
3. Verifique os hooks recomendados comuns:
   - PreToolUse para validação de comandos Bash
   - PreCompact para preservação de contexto
   - Stop para limpeza de sessão
4. Se for um projeto AIOS: verifique os hooks Python em `.aios-core/monitor/hooks/`

### Fase 5: Listar os Servidores MCP

1. Leia a configuração MCP de `.claude/mcp.json` ou do `mcpServers` do settings.json
2. Para cada servidor, documente:
   - Nome do servidor
   - Tipo de transporte (stdio, http, sse)
   - Command ou URL
   - Variáveis de ambiente (apenas nomes, não valores)
3. Verifique os servidores recomendados comuns (context7, exa, browser)
4. Verifique se nenhum secret está hardcoded em arquivos de configuração commitados

### Fase 6: Verificar a Cobertura de .claude/rules/

1. Liste todos os arquivos em `.claude/rules/`
2. Para cada arquivo de regra:
   - Verifique a presença do frontmatter `paths:` (carregamento condicional)
   - Documente os padrões glob se presentes
   - Meça a contagem de linhas
3. Avalie a cobertura:
   - Há regras para os diretórios principais (src/, tests/, docs/)?
   - As regras usam carregamento condicional onde apropriado?
   - Há regras incondicionais que deveriam ser condicionais?

### Fase 7: Verificar as Definições em .claude/agents/

1. Liste todos os arquivos em `.claude/agents/`
2. Para cada arquivo de agente:
   - Verifique se o frontmatter YAML está presente e válido
   - Verifique os campos obrigatórios (name, description, tools)
   - Meça o tamanho da definição
3. Verifique possíveis problemas:
   - Agentes sem restrições de ferramentas (permissivos demais)
   - Agentes com responsabilidades sobrepostas
   - Definições de agente ausentes referenciadas em outro lugar

### Fase 8: Gerar Relatório de Auditoria

Calcule a pontuação final e gere recomendações.

**Sistema de Pontuação (máximo de 100 pontos):**

| Verificação | Pontos Máx. | Critérios |
|-------|-----------|----------|
| Estrutura de diretórios | 15 | Arquivos obrigatórios presentes, diretórios recomendados existem |
| Validação de settings | 20 | Schema válido, regras deny-first, sem conflitos |
| Qualidade do CLAUDE.md | 20 | Abaixo de 200 linhas, bem estruturado, usa imports |
| Cobertura de hooks | 15 | Ao menos PreToolUse configurado, timeouts adequados |
| Servidores MCP | 10 | Configurados e sem secrets hardcoded |
| Cobertura de regras | 10 | Carregamento condicional usado, diretórios principais cobertos |
| Definições de agente | 10 | Frontmatter válido, ferramentas com escopo |

---

## Formato de Saída

```markdown
## Relatório de Auditoria da Configuração do Claude Code

**Projeto:** {project-name}
**Data:** {YYYY-MM-DD}
**Profundidade:** {quick | full}

### Pontuação: {N}/100 ({NOTA})

| Nota | Faixa | Significado |
|-------|-------|-------|
| A | 90-100 | Excelente -- configuração pronta para produção |
| B | 75-89 | Boa -- melhorias menores recomendadas |
| C | 60-74 | Razoável -- várias lacunas a resolver |
| D | 40-59 | Ruim -- trabalho significativo de configuração necessário |
| F | 0-39 | Crítica -- configuração mínima ou quebrada |

### Resultados das Verificações

| # | Verificação | Status | Pontuação | Notas |
|---|-------|--------|-------|-------|
| 1 | Estrutura de Diretórios | {PASS/WARN/FAIL} | {N}/15 | {notas} |
| 2 | Validação de Settings | {PASS/WARN/FAIL} | {N}/20 | {notas} |
| 3 | Qualidade do CLAUDE.md | {PASS/WARN/FAIL} | {N}/20 | {notas} |
| 4 | Cobertura de Hooks | {PASS/WARN/FAIL} | {N}/15 | {notas} |
| 5 | Servidores MCP | {PASS/WARN/FAIL} | {N}/10 | {notas} |
| 6 | Cobertura de Regras | {PASS/WARN/FAIL} | {N}/10 | {notas} |
| 7 | Definições de Agente | {PASS/WARN/FAIL} | {N}/10 | {notas} |

### Recomendações (Em Ordem de Prioridade)

1. **[{severidade}]** {recomendação} -- {especialista a consultar}
2. ...

### Vitórias Rápidas

- {Melhoria fácil que pode ser feita imediatamente}
- ...
```

---

## Condições de Veto

- **NUNCA** modifique qualquer arquivo durante a auditoria. Esta é uma tarefa de diagnóstico somente leitura.
- **NUNCA** exponha valores de secret (API keys, tokens) encontrados em arquivos de configuração. Reporte a presença deles mas mascare os valores.
- **NUNCA** pontue acima de 50 se o settings.json estiver ausente ou inválido -- ele é a base da configuração do Claude Code.
- **NUNCA** pule a Fase 2 (validação de settings) mesmo no modo quick -- é a verificação mais crítica.

---

## Critérios de Conclusão

- [ ] Todas as fases aplicáveis executadas (quick: 1-3, full: 1-8)
- [ ] Pontuação numérica calculada com detalhamento
- [ ] Letra de nota atribuída
- [ ] Recomendações listadas em ordem de prioridade
- [ ] Nenhum arquivo de configuração modificado durante a auditoria
- [ ] Relatório gerado no formato markdown especificado
