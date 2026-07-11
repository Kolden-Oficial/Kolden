---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Auditoria de Context Rot

**Task ID:** context-rot-audit
**Version:** 1.0
**Purpose:** Auditar CLAUDE.md, rules e auto-memory em busca de contexto obsoleto, incorreto ou inchado que degrada o desempenho do Claude Code
**Orchestrator:** @project-integrator (Conduit)
**Mode:** Autônomo (elicit: false)
**Quality Standard:** Pontuação de rot calculada, todas as referências obsoletas identificadas, plano de remediação gerado

---

## Visão Geral

O context rot ocorre quando CLAUDE.md, arquivos de rules e auto-memory acumulam instruções desatualizadas, referências a arquivos deletados, padrões depreciados e conteúdo inchado. Esta auditoria detecta o rot sistematicamente e produz um plano de remediação.

```
ENTRADA (project_root)
    |
[FASE 1: AUDITORIA DE TAMANHO DO CLAUDE.MD]
    -> Medir contagem de linhas e tamanhos das seções
    -> Sinalizar se ultrapassar 500 linhas
    -> Identificar as maiores seções
    |
[FASE 2: VALIDAÇÃO DE REFERÊNCIAS]
    -> Verificar todo caminho de arquivo referenciado no CLAUDE.md
    -> Verificar todo caminho de arquivo referenciado nas rules
    -> Reportar arquivos ausentes/movidos
    |
[FASE 3: OBSOLESCÊNCIA DE INSTRUÇÕES]
    -> Verificar referências a API desatualizadas
    -> Verificar menções a pacotes depreciados
    -> Verificar padrões que conflitam com o código atual
    |
[FASE 4: AUDITORIA DE ESTRUTURA DAS RULES]
    -> Verificar se as rules correspondem à estrutura de diretórios atual
    -> Verificar rules órfãs (caminhos que não existem mais)
    -> Validar os padrões de caminho do frontmatter
    |
[FASE 5: AUDITORIA DE AUTO-MEMORY]
    -> Verificar .claude/agent-memory/ em busca de entradas obsoletas
    -> Verificar se os arquivos referenciados ainda existem
    -> Verificar entradas contraditórias
    |
[FASE 6: PONTUAÇÃO DE ROT E REMEDIAÇÃO]
    -> Calcular a pontuação geral de rot
    -> Gerar lista de correções priorizada
    -> Produzir plano de remediação
    |
SAÍDA: Pontuação de rot + relatório de achados + plano de remediação
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Detecção automática | sim | Diretório válido com .claude/ ou CLAUDE.md |
| fix_automatically | boolean | Usuário | não | Se deve corrigir automaticamente problemas simples (padrão: false) |
| verbose | boolean | Usuário | não | Exibir todas as verificações, incluindo as aprovadas (padrão: false) |

---

## Pré-condições

1. O projeto tem o Claude Code configurado (CLAUDE.md ou .claude/ existe)
2. Repositório Git para análise do histórico de mudanças
3. Acesso de leitura a todos os arquivos do projeto

---

## Fase 1: Auditoria de Tamanho do CLAUDE.md

**Objetivo:** Verificar se o CLAUDE.md cresceu além do tamanho efetivo.

### Limiares de Tamanho

| Linhas | Status | Impacto |
|-------|--------|--------|
| < 100 | Enxuto | Ideal para auto-memory |
| 100-200 | Normal | Bom para a maioria dos projetos |
| 200-500 | Crescendo | Considere dividir em rules |
| 500+ | Inchado | Degrada ativamente o desempenho |

### Passos

1.1. Contar o total de linhas no CLAUDE.md.
1.2. Medir a contagem de linhas de cada seção.
1.3. Identificar as 3 maiores seções.
1.4. Sinalizar qualquer seção com mais de 50 linhas como candidata à extração para um arquivo de rules.
1.5. Verificar informações duplicadas entre as seções.

### Formato dos Achados

```yaml
size_audit:
  total_lines: 347
  status: "growing"
  largest_sections:
    - name: "Code Standards"
      lines: 89
      recommendation: "Extrair para .claude/rules/code-standards.md"
    - name: "API Reference"
      lines: 67
      recommendation: "Extrair para .claude/rules/api.md"
  duplicates_found: 2
```

---

## Fase 2: Validação de Referências

**Objetivo:** Verificar se todo arquivo/diretório referenciado nos arquivos de contexto realmente existe.

### Passos

2.1. Extrair todos os caminhos de arquivo do CLAUDE.md (procurar caminhos entre crases, blocos de código).
2.2. Extrair todos os caminhos de arquivo de `.claude/rules/*.md`.
2.3. Para cada caminho, verificar se ele existe no projeto:

```
Referência: `src/components/Button.tsx`
Status: EXISTS / MISSING / MOVED

Referência: `npm run test:e2e`
Status: VALID (nos scripts do package.json) / INVALID
```

2.4. Verificar as referências de comandos contra os scripts do package.json.
2.5. Reportar todas as referências ausentes com sugestões de correção.

### Formato dos Achados

```yaml
reference_audit:
  total_references: 45
  valid: 38
  missing: 5
  likely_moved: 2
  missing_details:
    - path: "src/lib/api-client.ts"
      referenced_in: "CLAUDE.md:42"
      suggestion: "O arquivo foi renomeado para src/lib/http-client.ts"
```

---

## Fase 3: Obsolescência de Instruções

**Objetivo:** Detectar instruções desatualizadas que possam levar o Claude a fazer a coisa errada.

### Indicadores de Obsolescência

| Sinal | Método de Detecção |
|--------|-----------------|
| Pacote depreciado | Verificar se a versão nas instruções difere do package.json |
| Padrões de API antigos | Instruções mencionam padrões não encontrados no código atual |
| Scripts removidos | Scripts npm referenciados não estão mais no package.json |
| Estrutura de diretórios antiga | Instruções referenciam caminhos que foram reestruturados |
| Instruções específicas de versão | Instruções atreladas a uma versão antiga de framework |

### Passos

3.1. Cruzar as instruções do CLAUDE.md com o package.json atual:
   - As dependências referenciadas ainda estão instaladas?
   - Os números de versão correspondem?
3.2. Verificar se os padrões de código descritos no CLAUDE.md existem na base de código:
   - Fazer grep do padrão nos arquivos de origem
   - Se não encontrado, a instrução está obsoleta
3.3. Verificar obsolescência específica de tecnologia:
   - Componentes de classe React mencionados, mas nenhum existe
   - Caminhos de import antigos referenciados
   - Métodos de API depreciados mencionados

### Formato dos Achados

```yaml
staleness_audit:
  total_instructions_checked: 23
  current: 18
  stale: 4
  uncertain: 1
  stale_details:
    - instruction: "Use getServerSideProps for data fetching"
      location: "CLAUDE.md:78"
      issue: "O projeto usa App Router com server components"
      fix: "Atualizar para descrever padrões de server components"
```

---

## Fase 4: Auditoria de Estrutura das Rules

**Objetivo:** Verificar se os arquivos de rules correspondem à estrutura atual do projeto.

### Passos

4.1. Listar todos os arquivos `.claude/rules/*.md`.
4.2. Para cada rule com frontmatter baseado em caminho:
   - Extrair os padrões de `paths:`
   - Verificar se pelo menos um arquivo corresponde ao padrão glob
   - Se nenhum arquivo corresponder, a rule está órfã

4.3. Verificar rules ausentes:
   - Há diretórios importantes sem uma rule correspondente?
   - Comparar a cobertura das rules com a estrutura do projeto

4.4. Verificar rules conflitantes:
   - Alguma rule dá instruções contraditórias para os mesmos caminhos?

### Formato dos Achados

```yaml
rules_audit:
  total_rules: 6
  active: 4
  orphaned: 1
  missing_coverage: 2
  orphaned_details:
    - file: ".claude/rules/graphql.md"
      paths_pattern: "src/graphql/**"
      issue: "Nenhum diretório graphql existe (removido na migração v2)"
  missing_coverage:
    - directory: "src/middleware/"
      suggestion: "Criar rule middleware.md para padrões de auth e validação"
```

---

## Fase 5: Auditoria de Auto-Memory

**Objetivo:** Verificar os arquivos de memória do agente em busca de entradas obsoletas.

### Passos

5.1. Escanear `.claude/agent-memory/` em busca de todos os arquivos de memória.
5.2. Para cada arquivo de memória:
   - Verificar se os arquivos referenciados ainda existem
   - Verificar se os padrões referenciados ainda são válidos
   - Verificar contradições com o CLAUDE.md atual
5.3. Verificar a contagem de linhas do MEMORY.md (deve ser inferior a 200 para carregamento automático).
5.4. Identificar entradas que são específicas de sessão (não deveriam estar na memória persistente).

---

## Fase 6: Pontuação de Rot e Remediação

**Objetivo:** Calcular a saúde geral e produzir um plano de correção.

### Cálculo da Pontuação de Rot

```
Pontuação de Rot = (missing_refs * 3) + (stale_instructions * 5) + (orphaned_rules * 2) +
            (size_penalty) + (memory_issues * 2)

Penalidade de Tamanho:
  < 200 linhas: 0 pontos
  200-500 linhas: 5 pontos
  500+ linhas: 15 pontos

Interpretação da Pontuação:
  0-5:   Saudável (verde)
  6-15:  Rot leve (amarelo) -- agendar limpeza
  16-30: Rot significativo (laranja) -- limpar em breve
  31+:   Rot crítico (vermelho) -- limpar agora
```

### Plano de Remediação

6.1. Gerar lista de correções priorizada:

| Prioridade | Correção | Esforço | Impacto |
|----------|-----|--------|--------|
| P0 | Remover referências a arquivos deletados | Baixo | Alto |
| P1 | Atualizar instruções obsoletas | Médio | Alto |
| P2 | Remover rules órfãs | Baixo | Médio |
| P3 | Extrair seções grandes do CLAUDE.md para rules | Médio | Médio |
| P4 | Limpar entradas de memória obsoletas | Baixo | Baixo |

6.2. Se `fix_automatically` for true, aplicar as correções P0 automaticamente.
6.3. Gerar um relatório-resumo.

---

## Formato de Saída

```yaml
context_rot_audit_result:
  rot_score: 12
  severity: "yellow"
  summary:
    total_checks: 89
    passed: 76
    warnings: 8
    failures: 5
  phases:
    size_audit:
      lines: 234
      status: "growing"
    reference_validation:
      total: 45
      missing: 3
    instruction_staleness:
      total: 23
      stale: 2
    rules_structure:
      total: 6
      orphaned: 1
    auto_memory:
      total: 3
      stale_entries: 1
  remediation:
    auto_fixed: 0
    manual_fixes_needed: 7
    priority_list: [...]
  overall_status: "NEEDS_ATTENTION"
```

---

## Condições de Veto

| Condição | Ação |
|-----------|--------|
| Sem CLAUDE.md e sem diretório .claude/ | PARAR -- nada a auditar |
| O projeto não tem histórico git (não é possível determinar obsolescência) | AVISAR -- pular verificações de obsolescência |
| A pontuação de rot ultrapassa 50 | PARAR -- rot crítico, requer atenção humana imediata |
| A correção automática modificaria mais de 10 arquivos | PARAR -- mudanças demais, exigir revisão manual |
| O CLAUDE.md tem seções gerenciadas pelo AIOS | AVISAR -- não modificar seções gerenciadas |
