---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Auditar Integração Existente do Claude Code

**Task ID:** CCM-PI-002
**Version:** 1.0.0
**Command:** `*audit-integration`
**Agent:** Conduit (project-integrator)
**Purpose:** Auditar uma integração existente do Claude Code em um projeto, verificando completude, consistência, saúde e gerando uma pontuação acionável com recomendações.

---

## Visão Geral

```
  Projeto Alvo
       |
       v
  +--------------------+
  | 1. Verificar       |
  |    Completude do    |
  |    .claude/         |
  +--------------------+
       |
       v
  +--------------------+
  | 2. Validar          |
  |    Consistência das |
  |    Settings         |
  +--------------------+
       |
       v
  +--------------------+
  | 3. Verificar        |
  |    Cobertura de     |
  |    Regras           |
  +--------------------+
       |
       v
  +--------------------+
  | 4. Verificar        |
  |    Saúde dos Hooks  |
  +--------------------+
       |
       v
  +--------------------+
  | 5. Testar           |
  |    Conectividade MCP|
  +--------------------+
       |
       v
  +--------------------+
  | 6. Gerar Pontuação  |
  |    & Recomendações  |
  +--------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_path | string | Usuário ou cwd | Sim | Deve conter o diretório .claude/ |
| deep_scan | boolean | Usuário | Não | Padrão false; true escaneia todos os arquivos-fonte em busca de consistência |

---

## Pré-condições

- O diretório `.claude/` existe no projeto alvo
- Acesso de leitura a todos os arquivos do projeto

---

## Fases de Execução

### Fase 1: Verificar a Completude do .claude/

Escaneie o diretório `.claude/` e verifique os componentes esperados:

| Componente | Obrigatório | Caminho | Peso |
|-----------|----------|------|--------|
| CLAUDE.md | Sim | `.claude/CLAUDE.md` | 25 |
| settings.json | Sim | `.claude/settings.json` | 20 |
| settings.local.json | Recomendado | `.claude/settings.local.json` | 5 |
| diretório rules/ | Recomendado | `.claude/rules/` | 15 |
| Ao menos 1 arquivo de regra | Recomendado | `.claude/rules/*.md` | 10 |
| diretório commands/ | Opcional | `.claude/commands/` | 5 |
| diretório skills/ | Opcional | `.claude/skills/` | 5 |

Para cada componente, registre: presente/ausente, tamanho do arquivo, data da última modificação.

### Fase 2: Validar a Consistência das Settings

Faça o parse do `.claude/settings.json` e verifique:

1. **Validade do JSON**: parseável sem erros
2. **Coerência de permissões**: sem contradições entre regras de allow e deny
3. **Precisão de caminhos**: todos os caminhos referenciados em deny/allow realmente existem
4. **Lacunas perigosas**: comandos perigosos comuns não explicitamente negados
   - `rm -rf /`, `git push --force`, `DROP TABLE`, `sudo`
5. **Permissivo demais**: verifique a presença de `bash("*")` ou allows com curinga
6. **Compatibilidade com AIOS**: se for um projeto AIOS, verifique se as regras de proteção L1/L2 estão presentes

Sinalize cada constatação como: PASS, WARN, FAIL.

### Fase 3: Verificar a Cobertura de Regras

Para cada arquivo de regra em `.claude/rules/`:

1. Valide o formato do frontmatter (array paths: presente se contextual)
2. Verifique se o conteúdo da regra é não vazio e acionável
3. Verifique se os globs de caminho no frontmatter casam com arquivos reais do projeto
4. Identifique lacunas de cobertura:
   - Código-fonte editado mas sem regra de coding-standards
   - Testes presentes mas sem regra de testing
   - Arquivos de CI/CD presentes mas sem regra de workflow
   - Arquivos de banco de dados presentes mas sem regra de database

### Fase 4: Verificar a Saúde dos Hooks

Verifique a configuração e a saúde dos hooks:

1. **Registro**: Os hooks estão registrados em settings.json ou ~/.claude/settings.json?
2. **Existência de arquivo**: Os scripts de hook referenciados existem?
3. **Sintaxe**: Os scripts de hook podem ser parseados sem erros?
4. **Permissões**: Os scripts de hook são executáveis?
5. **Risco de timeout**: Os hooks têm operações que poderiam travar (chamadas de rede sem timeout)?

Para cada hook, classifique como: HEALTHY, DEGRADED, BROKEN, MISSING.

### Fase 5: Testar a Conectividade MCP

Se houver servidores MCP configurados:

1. Liste todos os servidores MCP configurados nas settings
2. Para cada servidor, verifique:
   - A configuração está completa (command, args, env presentes)
   - O binário/comando existe no PATH
   - Sem problemas óbvios de credenciais (env vars vazias)
3. Categorize: CONNECTED, CONFIGURED, MISCONFIGURED, MISSING

Se nenhum MCP estiver configurado, anote como N/A com recomendação.

### Fase 6: Gerar Pontuação e Recomendações

Calcule a pontuação de saúde da integração (0-100):

```
Score = soma(component_weight * component_score) / max_possible_score * 100

Onde component_score:
  PASS = 1.0
  WARN = 0.5
  FAIL = 0.0
  N/A  = excluído do cálculo
```

**Limiares de nota:**
| Pontuação | Nota | Rótulo |
|-------|-------|-------|
| 90-100 | A | Integração excelente |
| 75-89 | B | Boa, melhorias menores possíveis |
| 60-74 | C | Funcional, lacunas notáveis |
| 40-59 | D | Problemas significativos, recomenda-se remediação |
| 0-39 | F | Lacunas críticas, integração não efetiva |

---

## Formato de Saída

```markdown
## Auditoria de Integração do Claude Code

**Projeto:** {project_path}
**Data:** {YYYY-MM-DD}
**Pontuação:** {score}/100 (Nota: {grade})

### Status dos Componentes

| Componente | Status | Detalhes |
|-----------|--------|---------|
| CLAUDE.md | PASS/WARN/FAIL | {detalhe} |
| settings.json | PASS/WARN/FAIL | {detalhe} |
| Regras | PASS/WARN/FAIL | {N} arquivos, {coverage}% de cobertura |
| Hooks | PASS/WARN/FAIL/N/A | {N} saudáveis, {N} quebrados |
| MCP | PASS/WARN/FAIL/N/A | {N} conectados |

### Constatações

#### Críticas (Devem Ser Corrigidas)
1. {constatação} -- {recomendação}

#### Avisos (Deveriam Ser Corrigidos)
1. {constatação} -- {recomendação}

#### Info (Bom Ter)
1. {constatação} -- {recomendação}

### Correções Rápidas

{Lista numerada de comandos ou ações para corrigir os principais problemas}
```

---

## Condições de Veto

- **NUNCA** modifique qualquer arquivo do projeto durante a auditoria -- esta é uma análise somente leitura
- **NUNCA** execute scripts de hook para testá-los -- apenas análise estática
- **NUNCA** tente conexões MCP que poderiam disparar efeitos colaterais
- **NUNCA** reporte credenciais ou secrets encontrados em arquivos de configuração

---

## Critérios de Conclusão

- [ ] Todas as 6 fases executadas
- [ ] Pontuação calculada com componentes ponderados
- [ ] Nota atribuída a partir da tabela de limiares
- [ ] Constatações críticas listadas com recomendações específicas
- [ ] Correções rápidas fornecidas para os principais problemas
- [ ] Relatório de auditoria apresentado no formato padrão
