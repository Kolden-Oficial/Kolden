# Task: Status do Projeto — Panorama Completo

> **Command:** `*status`
> **Agent:** @aiox-master, @po, @sm
> **Propósito:** Exibir um panorama preciso e em tempo real de todos os epics e stories
> **Created:** 2026-03-05

---

## Propósito

Exibir um panorama abrangente e **100% preciso** de todos os epics e stories no projeto. O status de cada story é lido diretamente da sua **fonte da verdade** — o campo `## Status` em cada arquivo de story — nunca inferido de metadados de epic, histórico do git ou dados em cache.

---

## Uso

```bash
# Full panorama (all epics, all stories)
*status

# Single epic
*status epic-7

# Summary only (no story details)
*status --summary
```

### Argumentos

| Argumento | Obrigatório | Descrição                              |
| --------- | ----------- | -------------------------------------- |
| epic-id   | Não         | Mostrar apenas o epic específico (e.g. epic-7) |
| --summary | Não         | Mostrar apenas contagens a nível de epic |

---

## REGRAS CRÍTICAS

### Regra 1: Fonte da Verdade

A **ÚNICA** fonte da verdade para o status da story é o campo `## Status` em cada arquivo de story (`docs/stories/{N}.{M}.*.md`). **NUNCA** use:

- ❌ Metadados do arquivo de epic (`status: "In Progress (1/2 done)"`)
- ❌ Git log ou snapshot do gitStatus do system prompt
- ❌ Dados em cache de leituras anteriores na conversa
- ❌ Resumos de subagentes que não leem todos os arquivos de story
- ❌ Suposições baseadas em quais stories têm arquivos ou não

### Regra 2: Ler Cada Arquivo

Toda execução de `*status` DEVE ler o campo `## Status` de **cada** arquivo de story que existe. Sem atalhos, sem amostragem, sem confiar em resumos de epic.

### Regra 3: Detecção de Divergência

Se a contagem de progresso de um arquivo de epic (e.g., "1/2 done") não corresponder ao status real de suas stories, **sinalize a divergência** visualmente com ⚠️ e sugira atualizar o arquivo de epic.

---

## Workflow

```yaml
steps:
  - name: Discover Epics
    action: |
      Glob: docs/stories/epic-*.md
      Read each epic file to extract:
        - epic_id, title, status (from metadata block)
        - Story references (from ## Stories section)

  - name: Discover Stories
    action: |
      Glob: docs/stories/[0-9]*.md
      This finds ALL story files (e.g., 7.1.*.md, 8.3.*.md, 9.1.*.md)

  - name: Read Story Status (MANDATORY)
    action: |
      For EACH story file found in Step 2:
        Read the file and extract:
          - Story title: first line starting with "# "
          - Status: the line immediately after "## Status" heading,
            trimmed of "**" markers and whitespace.
            Do NOT rely on fixed line numbers — the Status section
            position may vary across story templates.
        Map story to its epic (first number = epic_id)
    critical: true
    note: |
      This step CANNOT be skipped or delegated to a subagent
      that might use cached data. Each file MUST be read fresh.

  - name: Cross-Reference & Detect Divergence
    action: |
      Normalize status values before counting:
        - "Ready" | "Ready for Dev" | "Ready to Start" → Ready
        - "InProgress" | "In Progress" → InProgress
        - "InReview" | "In Review" | "Ready for Review" → InReview
        - "Done" | "Complete" | "Completed" → Done
        - "Draft" → Draft
        - Anything else → Unknown (flag with ⚠️)
      For each epic:
        - Count stories by normalized status (Done, Ready, Draft, InProgress, etc.)
        - Compare with epic file's stated progress
        - If mismatch: mark with ⚠️ DIVERGENCE flag
      For stories referenced in epics but without story files:
        - Mark as "📄 No story file"

  - name: Format Output
    action: |
      Display formatted panorama with:
        - Epic-level summary table (all epics)
        - Story-level detail per epic (status from source of truth)
        - Divergence warnings (if any)
        - Quality metrics (test count, lint, typecheck — from last known)
        - Next steps recommendation
```

---

## Formato de Saída

### Panorama Completo

```text
📊 Status Completo — {Project Name}

Panorama Geral: {done}/{total} stories done ({percentage}%)

═══════════════════════════════════════════════════════

Epic 1 — Foundation & Shell                    3/3 ✅
  ✅ 1.1 Project Scaffold & Database Setup     Done
  ✅ 1.2 Filesystem Scanner Core               Done
  ✅ 1.3 App Shell & Layout                    Done

Epic 7 — Critical Fixes & Data Config         2/2 ✅
  ✅ 7.1 Fix Critical Bugs                     Done
  ✅ 7.2 Squad Origin Corrections              Done
  ⚠️  DIVERGÊNCIA: Epic diz "1/2 done" mas stories indicam 2/2 Done

Epic 9 — Functional Enhancements              0/2
  📄 9.1 (no story file found)
  📄 9.2 (no story file found)

═══════════════════════════════════════════════════════

Qualidade: {test_count} testes | Lint: {status} | TypeCheck: {status}

Próximo: {next story recommendation}
```

### Ícones de Status

| Ícone | Status      | Descrição                      |
| ----- | ----------- | ------------------------------ |
| ✅    | Done        | Story concluída e QA aprovado  |
| 🔄    | InProgress  | Story sendo implementada       |
| ⏳    | Ready       | Story validada, pronta para dev |
| 📝    | Draft       | Story criada, não validada     |
| 🔍    | InReview    | Story em revisão de QA         |
| 📄    | —           | Nenhum arquivo de story existe |
| ⚠️    | DIVERGENCE  | Metadados do epic não correspondem |

---

## Resolução de Divergência

Quando uma divergência é detectada, sugira a correção:

```text
⚠️  DIVERGÊNCIA detectada em Epic 7:
    Epic file diz: "In Progress (1/2 stories done)"
    Stories reais: 2/2 Done

    Sugestão: Atualizar epic-7-critical-fixes-data-config.md
      status: "Done (2/2 stories done)"
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Directory docs/stories/ exists
    tipo: pre-condition
    blocker: true
    error_message: "No docs/stories/ directory found"
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Every story file in docs/stories/ was read for status
    tipo: post-condition
    blocker: true
    validação: |
      Count of story files read == count of story files found by Glob
    error_message: "Not all story files were read — status may be inaccurate"
```

---

## Anti-Padrões (NUNCA FAÇA)

1. **NUNCA** confie em arquivos de epic para o status da story — epics são resumos que podem estar desatualizados
2. **NUNCA** use o snapshot do gitStatus — ele fica congelado no início da conversa
3. **NUNCA** delegue a um subagente sem instrução explícita para "ler a seção ## Status de CADA arquivo de story"
4. **NUNCA** assuma que uma story não existe sem rodar o Glob primeiro
5. **NUNCA** reporte o status sem ter lido o campo `## Status` real do arquivo
6. **NUNCA** use o git log para inferir a conclusão da story

---

## Tratamento de Erros

**Estratégia:** graceful-fallback

**Erros Comuns:**

1. **Erro:** O arquivo de story não tem campo Status
   - **Resolução:** Reportar como "⚠️ Status field missing"
   - **Recuperação:** Sinalizar para revisão manual

2. **Erro:** O epic referencia uma story que não tem arquivo
   - **Resolução:** Reportar como "📄 No story file"
   - **Recuperação:** Anotar na saída, continuar com as outras stories

3. **Erro:** O arquivo de story existe mas não é referenciado em nenhum epic
   - **Resolução:** Reportar como story órfã
   - **Recuperação:** Listar na seção "Orphan Stories"

---

## Performance

```yaml
duration_expected: 10-30 seconds
cost_estimated: $0.001-0.005
token_usage: ~1,000-5,000 tokens
optimization: |
  Read each story file and search for the ## Status section heading.
  Use parallel Read calls for multiple story files.
  Cache nothing — always read fresh.
```

---

## Metadados

```yaml
version: 1.0.0
tags:
  - project-management
  - status
  - panorama
updated_at: 2026-03-05
agents: [aiox-master, po, sm]
```

---

## Comandos Relacionados

- `*orchestrate-status {story-id}` — Status de uma story específica em orquestração
- `*build-status {story-id}` — Status de build autônomo
- `*stories-index` — Regenerar índice de stories

---

## Preferências do Usuário

- **Panorama completo por padrão:** Sempre mostre TODOS os epics e TODAS as stories, não apenas o epic atual
- **Inclua contagens de progresso, status das stories e próximos passos**

---

_Task criada para resolver o problema de status reporting impreciso — garantindo que `*status` sempre leia a fonte da verdade (story files) ao invés de dados derivados (epic metadata, git log)._
