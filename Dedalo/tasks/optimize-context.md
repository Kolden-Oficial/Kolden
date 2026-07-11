---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Otimizar o Uso da Janela de Contexto

**Task ID:** CCM-CONFIG-004
**Version:** 1.0.0
**Command:** `*optimize-context`
**Orchestrator:** Sigil (config-engineer)
**Purpose:** Otimizar o uso da janela de contexto analisando o tamanho do CLAUDE.md, movendo instruções detalhadas para `.claude/rules/` condicionais, configurando a auto-compaction e revisando os arquivos de auto-memory quanto à eficiência.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Analisar      | --> | 2. Mover         | --> | 3. Configurar    |
  |    Tamanho do    |     |    Instruções    |     |    Carregamento  |
  |    CLAUDE.md     |     |    Detalhadas    |     |    Condicional   |
  |                  |     |    para rules/   |     |                  |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Revisar       | --> | 5. Configurar    | --> |    RELATÓRIO     |
  |    Arquivos de   |     |    Compaction    |     |    DE ORÇAMENTO   |
  |    Auto-Memory   |     |                  |     |                  |
  +------------------+     +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Deve conter CLAUDE.md ou .claude/CLAUDE.md |
| target_lines | number | Parâmetro do usuário | Não | Máximo de linhas-alvo para o CLAUDE.md (padrão: 200) |
| dry_run | boolean | Parâmetro do usuário | Não | Se true, apenas reporta sem fazer alterações |

---

## Pré-condições

- Ao menos um arquivo CLAUDE.md existe (raiz do projeto ou .claude/)
- Acesso de leitura ao diretório .claude/rules/
- Acesso de leitura ao diretório de auto-memory (~/.claude/projects/)

---

## Fases de Execução

### Fase 1: Analisar o Tamanho do CLAUDE.md

1. Localize todos os arquivos CLAUDE.md:
   - `./CLAUDE.md` (raiz do projeto)
   - `./.claude/CLAUDE.md` (diretório claude)
   - `./CLAUDE.local.md` (sobrescritas locais)
   - `~/.claude/CLAUDE.md` (nível de usuário)
2. Para cada arquivo, meça:
   - Contagem total de linhas
   - Contagem de seções (por cabeçalhos markdown)
   - Contagem estimada de tokens (linhas x ~4 tokens em média)
   - Contagem de @import e a que se referem
3. Categorize as seções de conteúdo por propósito:
   - **Instruções centrais** (devem permanecer): Visão geral do projeto, comandos-chave, sistema de agentes
   - **Conteúdo condicional** (pode ir para rules/): Específico de framework, com escopo de caminho
   - **Material de referência** (deve usar @imports): Docs de arquitetura, especificações de API
   - **Conteúdo redundante** (pode ser removido): Duplicado entre arquivos, desatualizado
4. Gere a tabela de análise:

| Seção | Linhas | Categoria | Recomendação |
|---------|-------|----------|----------------|
| {cabeçalho} | {N} | {central/condicional/referência/redundante} | {manter/mover/importar/remover} |

### Fase 2: Mover Instruções Detalhadas para .claude/rules/

Para cada seção categorizada como "condicional":

1. Identifique os caminhos de arquivo a que esta seção se aplica:
   - Instruções de API -> `src/api/**`, `server/**`
   - Padrões de componente -> `src/components/**/*.tsx`
   - Convenções de teste -> `tests/**`, `**/*.test.*`
   - Regras de banco de dados -> `migrations/**`, `supabase/**`
2. Crie um novo arquivo `.claude/rules/{section-name}.md`:
   - Adicione o frontmatter YAML `paths:` com os padrões glob apropriados
   - Mova o conteúdo da seção para o arquivo de regra
   - Preserve a formatação e os exemplos de código
3. Remova a seção movida do CLAUDE.md
4. Adicione um breve comentário de referência onde a seção estava:
   ```markdown
   <!-- Convenções de API: ver .claude/rules/api-conventions.md -->
   ```

### Fase 3: Configurar o Carregamento Condicional

1. Verifique se todos os novos arquivos de regra têm o frontmatter adequado:
   ```yaml
   ---
   paths:
     - "src/api/**/*.ts"
   ---
   ```
2. Teste se os padrões glob casam com arquivos reais do projeto
3. Organize as regras em subdiretórios se houver muitas regras:
   ```
   .claude/rules/
     frontend/
       component-patterns.md
       styling-rules.md
     backend/
       api-conventions.md
       database-rules.md
     testing/
       test-patterns.md
   ```
4. Remova quaisquer regras always-on existentes que deveriam ser condicionais

### Fase 4: Revisar os Arquivos de Auto-Memory

1. Verifique o diretório de auto-memory:
   - `~/.claude/projects/{project-hash}/memory/`
2. Se existirem arquivos de auto-memory:
   - Liste todos os arquivos de memória e seus tamanhos
   - Verifique se há memórias desatualizadas ou irrelevantes
   - Sinalize memórias que duplicam o conteúdo do CLAUDE.md
   - Sugira a limpeza de memórias obsoletas
3. Se a auto-memory não estiver ativa:
   - Informe o usuário sobre a auto-memory (o Claude a cria automaticamente)
   - Nenhuma ação necessária

### Fase 5: Configurar a Compaction

1. Avalie as configurações atuais de compaction:
   - Verifique a env var `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
   - O gatilho padrão é ~95% da capacidade de contexto
2. Recomende o limiar de compaction com base no tamanho do projeto:

| Tamanho do Projeto | Linhas do CLAUDE.md | PCT Recomendado | Justificativa |
|-------------|----------------|-----------------|-----------|
| Pequeno (<100 arquivos) | <100 | Padrão (95%) | Raramente atinge o limite |
| Médio (100-500 arquivos) | 100-200 | 80% | Precisa de alguma folga |
| Grande (500+ arquivos) | 200+ | 50-60% | Compaction frequente necessária |

3. Verifique a presença do hook PreCompact:
   - Se ausente: recomende adicionar um para preservação de contexto
   - Se presente: verifique se tem um timeout razoável (5-10 segundos)
4. Verifique a configuração `CLAUDE_CODE_MAX_OUTPUT_TOKENS`:
   - Padrão: 32000, Máximo: 64000
   - Valores mais altos reduzem a janela de contexto disponível
   - Recomende o padrão a menos que o usuário precise de saídas longas

---

## Formato de Saída

```markdown
## Relatório de Otimização de Contexto

**Projeto:** {project-name}
**Data:** {YYYY-MM-DD}
**Modo:** {dry-run | aplicado}

### Análise do CLAUDE.md

| Métrica | Antes | Depois | Mudança |
|--------|--------|-------|--------|
| Total de linhas | {N} | {N} | {-N (-X%)} |
| Seções | {N} | {N} | {-N} |
| Tokens est. | {N} | {N} | {-N (-X%)} |
| @imports | {N} | {N} | {+N} |

### Redistribuição de Conteúdo

| Seção | Linhas | Ação | Destino |
|---------|-------|--------|-------------|
| {seção} | {N} | {movida/importada/removida/mantida} | {.claude/rules/X.md | @import | --} |

### Orçamento de Contexto

| Componente | Linhas | Tokens (est.) | Carregamento |
|-----------|-------|---------------|---------|
| CLAUDE.md | {N} | {N} | Sempre |
| .claude/rules/ (total) | {N} | {N} | Condicional |
| Auto-memory | {N} | {N} | Sempre |
| **Total sempre carregado** | {N} | {N} | -- |

### Configurações de Compaction

- **Gatilho atual:** {N}% (padrão | override)
- **Gatilho recomendado:** {N}%
- **Hook PreCompact:** {configurado | ausente}
- **Máximo de tokens de saída:** {N}

### Resumo de Economia

- **Contexto economizado por interação:** ~{N} tokens ({X}% de redução)
- **Conteúdo condicional:** {N} linhas carregadas apenas quando relevante
- **Arquivos otimizados:** {N}
```

---

## Condições de Veto

- **NUNCA** apague conteúdo do CLAUDE.md sem movê-lo para .claude/rules/ ou confirmar com o usuário que é redundante.
- **NUNCA** defina CLAUDE_AUTOCOMPACT_PCT_OVERRIDE abaixo de 30. Valores baixos demais causam compaction excessiva que degrada a qualidade da sessão.
- **NUNCA** crie regras always-on para conteúdo que é específico de caminho. Sempre use o frontmatter paths: para carregamento condicional.
- **NUNCA** modifique arquivos de auto-memory diretamente. Eles são gerenciados pelo Claude Code automaticamente.
- **NUNCA** reduza o CLAUDE.md abaixo de um mínimo funcional. As instruções centrais (visão geral do projeto, comandos-chave, convenções essenciais) devem permanecer.

---

## Critérios de Conclusão

- [ ] Todos os arquivos CLAUDE.md analisados com contagem de linhas e categorização de seções
- [ ] Conteúdo condicional identificado e movido para .claude/rules/
- [ ] Padrões glob validados contra a estrutura do projeto
- [ ] Arquivos de auto-memory revisados quanto à obsolescência
- [ ] Limiar de compaction recomendado com justificativa
- [ ] Comparação antes/depois gerada mostrando a economia de tokens
