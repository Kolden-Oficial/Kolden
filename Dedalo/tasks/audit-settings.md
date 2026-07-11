---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Auditar Configurações do Claude Code

**Task ID:** CCM-CONFIG-002
**Version:** 1.0.0
**Command:** `*audit-settings`
**Orchestrator:** Sigil (config-engineer)
**Purpose:** Auditar todas as camadas ativas de configuração do Claude Code em busca de conflitos, redundâncias, lacunas de segurança e oportunidades de otimização, lendo os arquivos de configuração managed, project, local e user.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Ler Todos os  | --> | 2. Verificar     | --> | 3. Validar       |
  |    Arquivos de   |     |    Conflitos     |     |    Regras de Deny|
  |    Settings      |     |                  |     |                  |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Verificar     | --> | 5. Verificar     | --> | 6. Gerar         |
  |    Modo de       |     |    Configs MCP   |     |    Relatório de  |
  |    Permissão     |     |                  |     |    Auditoria     |
  +------------------+     +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Deve conter .claude/ ou ser a raiz de um projeto |
| check_managed | boolean | Parâmetro do usuário | Não | Se deve verificar managed-settings.json (padrão: true) |

---

## Pré-condições

- Acesso de leitura a todos os locais de arquivos de configuração
- Claude Code instalado no sistema
- Ao menos um arquivo de configuração deve existir (no mínimo .claude/settings.json)

---

## Fases de Execução

### Fase 1: Ler Todos os Arquivos de Settings

Localize e leia cada camada de configuração na ordem de precedência:

| Camada | Prioridade | Caminho | Escopo |
|-------|----------|------|-------|
| 1 (Mais alta) | Managed | managed-settings.json específico da plataforma | Organização |
| 2 | Argumentos de CLI | (Apenas em runtime -- não pode ser auditado a partir de arquivos) | Sessão |
| 3 | Local | .claude/settings.local.json | Pessoal/projeto |
| 4 | Shared | .claude/settings.json | Equipe/projeto |
| 5 (Mais baixa) | User | ~/.claude/settings.json | Pessoal/global |

**Locais das managed settings:**
- macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
- Linux/WSL: `/etc/claude-code/managed-settings.json`
- Windows: `C:\Program Files\ClaudeCode\managed-settings.json`

Para cada arquivo encontrado:
1. Faça o parse do JSON e valide a estrutura
2. Extraia as regras de permissão (arrays deny, ask, allow)
3. Extraia as configurações de servidor MCP
4. Extraia as configurações de hook
5. Extraia as configurações de sandbox
6. Registre o timestamp de modificação do arquivo

### Fase 2: Verificar Conflitos Entre Escopos

1. **Conflitos de regra**: o mesmo padrão Tool(specifier) aparecendo em tipos diferentes de regra entre camadas
   - Exemplo: `Bash(npm run *)` no allow local mas no deny shared
   - Resolução: Deny sempre vence (comportamento de merge + dedup)
   - Sinalize como WARNING se o usuário provavelmente pretendia allow
2. **Conflitos de modo**: defaultMode diferente entre camadas
   - A camada de maior precedência vence
   - Sinalize se o local sobrescreve o shared (pode confundir a equipe)
3. **Análise de merge de arrays**: os arrays de permissão fazem merge entre escopos
   - Identifique regras duplicadas (mesmo padrão em várias camadas)
   - Identifique contradições (padrão em allow e deny ao mesmo tempo)
4. **Conflitos de hook**: o mesmo evento com configurações diferentes entre camadas
   - Hooks managed não podem ser sobrescritos

### Fase 3: Validar que as Regras de Deny Cobrem Caminhos Sensíveis

Verifique se os arquivos sensíveis críticos estão protegidos:

**Regras de deny obrigatórias (sinalize se faltarem):**

| Padrão | Protege | Severidade se Faltar |
|---------|----------|---------------------|
| `Read(./.env)` | Variáveis de ambiente | CRÍTICA |
| `Read(./.env.*)` | Variantes de ambiente | CRÍTICA |
| `Read(./secrets/**)` | Diretório de secrets | ALTA |
| `Read(./**/*.pem)` | Certificados SSL/TLS | ALTA |
| `Read(./**/*.key)` | Chaves privadas | ALTA |
| `Bash(rm -rf *)` | Exclusão destrutiva | CRÍTICA |
| `Bash(curl * \| bash)` | Ataques de pipe-to-shell | ALTA |

**Regras de deny específicas de AIOS (se .aios-core/ existir):**

| Padrão | Protege | Severidade se Faltar |
|---------|----------|---------------------|
| `Edit(.aios-core/core/**)` | L1 Framework Core | ALTA |
| `Edit(.aios-core/constitution.md)` | Constitution | ALTA |
| `Edit(bin/aios.js)` | Ponto de entrada da CLI | MÉDIA |

### Fase 4: Verificar Adequação do Modo de Permissão

1. Determine o modo de permissão efetivo (a camada de maior precedência vence)
2. Avalie a adequação para o projeto:
   - `bypassPermissions` em um projeto de equipe -> aviso CRÍTICO
   - `autoApprove` sem regras de deny -> aviso ALTO
   - `askAlways` com regras de allow extensas -> INFO (poderia ser elevado para acceptEdits)
   - `acceptEdits` com regras de deny adequadas -> BOM (configuração recomendada)
3. Verifique o bloqueio empresarial (enterprise lockdown):
   - `disableBypassPermissionsMode` nas managed settings
   - flag `allowManagedPermissionRulesOnly`

### Fase 5: Verificar Configurações de Servidor MCP

1. Colete as configurações MCP de todas as camadas
2. Para cada servidor:
   - Verifique se o command/URL está especificado
   - Verifique se as variáveis de ambiente referenciam env vars (e não valores hardcoded)
   - Verifique se o servidor possui uma regra de permissão MCP correspondente (allow ou ask)
3. Verifique as restrições empresariais:
   - flag `allowManagedMcpServersOnly`
   - listas `allowedMcpServers` / `deniedMcpServers`
4. Sinalize qualquer servidor MCP que não esteja na lista de allow

### Fase 6: Gerar Relatório de Auditoria

Compile todas as constatações em um relatório estruturado.

---

## Formato de Saída

```markdown
## Relatório de Auditoria de Settings

**Projeto:** {project-name}
**Data:** {YYYY-MM-DD}
**Camadas Encontradas:** {count}/5

### Resumo das Camadas

| Camada | Arquivo | Existe | Regras | Modo |
|-------|------|--------|-------|------|
| Managed | {path} | {Sim/Não} | {N deny, N allow} | {modo ou --} |
| Local | .claude/settings.local.json | {Sim/Não} | {N deny, N allow} | {modo ou --} |
| Shared | .claude/settings.json | {Sim/Não} | {N deny, N allow} | {modo ou --} |
| User | ~/.claude/settings.json | {Sim/Não} | {N deny, N allow} | {modo ou --} |

### Configuração Efetiva

- **Modo de permissão:** {modo efetivo} (de {camada})
- **Total de regras de deny:** {N} (após merge + dedup)
- **Total de regras de allow:** {N} (após merge + dedup)
- **Servidores MCP:** {N}
- **Hooks:** {N} eventos configurados

### Constatações

| # | Severidade | Constatação | Camada(s) | Recomendação |
|---|----------|---------|----------|----------------|
| 1 | {CRÍTICA/ALTA/MÉDIA/BAIXA/INFO} | {descrição} | {camada} | {correção} |

### Lacunas de Segurança

{Lista de regras de deny ausentes que deveriam estar presentes}

### Conflitos

{Lista de conflitos de regra entre camadas}

### Oportunidades de Otimização

{Lista de redundâncias e melhorias}
```

---

## Condições de Veto

- **NUNCA** modifique qualquer arquivo de configuração durante a auditoria. Este é um diagnóstico somente leitura.
- **NUNCA** exiba os valores reais de API keys, tokens ou secrets encontrados nas configurações. Reporte apenas a presença.
- **NUNCA** reporte uma auditoria limpa se regras de deny críticas (para .env, secrets) estiverem ausentes. Sempre sinalize-as.
- **NUNCA** recomende o modo `bypassPermissions` como correção para qualquer problema.
- **NUNCA** pule a verificação do managed-settings.json em ambientes empresariais -- é a camada de maior autoridade.

---

## Critérios de Conclusão

- [ ] Todas as camadas de configuração acessíveis lidas e processadas
- [ ] Conflitos entre camadas identificados e documentados
- [ ] Regras de deny para caminhos sensíveis validadas (regras ausentes sinalizadas)
- [ ] Modo de permissão avaliado quanto à adequação
- [ ] Configurações de servidor MCP verificadas
- [ ] Relatório de auditoria gerado com constatações classificadas por severidade
