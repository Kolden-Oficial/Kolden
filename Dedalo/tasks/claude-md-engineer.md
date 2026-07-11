---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Engenheirar CLAUDE.md Ótimo

**Task ID:** claude-md-engineer
**Version:** 1.0
**Purpose:** Engenheirar um arquivo CLAUDE.md conciso e de alta qualidade, otimizado para o carregamento de contexto e a auto-memory do Claude Code
**Orchestrator:** @project-integrator (Conduit)
**Mode:** Interativo (elicit: true)
**Quality Standard:** Menos de 200 linhas, todas as seções acionáveis, sem conteúdo de preenchimento, passa na auto-revisão

---

## Visão Geral

O CLAUDE.md é o arquivo mais importante para a produtividade do Claude Code. Um CLAUDE.md bem engenheirado ensina o Claude a trabalhar no projeto com o mínimo de tokens. Esta tarefa cria um do zero ou reescreve um existente usando princípios de engenharia de contexto.

```
ENTRADA (project_root + [existing_claude_md])
    |
[FASE 1: ANÁLISE DO PROJETO]
    -> Analisar a stack tecnológica e a estrutura do projeto
    -> Identificar padrões e convenções críticos
    -> Determinar o que o Claude precisa saber
    |
[FASE 2: SEÇÃO DE PADRÕES DE CÓDIGO]
    -> Extrair o estilo de código do código existente
    -> Definir convenções de nomenclatura
    -> Estabelecer padrões de import e export
    |
[FASE 3: REQUISITOS DE TESTE]
    -> Identificar o framework e os padrões de teste
    -> Definir os comandos de teste
    -> Estabelecer expectativas de cobertura
    |
[FASE 4: CONVENÇÕES DE GIT E PR]
    -> Extrair o formato de mensagem de commit do histórico
    -> Documentar convenções de nomenclatura de branch
    -> Anotar requisitos de PR
    |
[FASE 5: ORIENTAÇÃO ESPECÍFICA DO PROJETO]
    -> Documentar decisões-chave de arquitetura
    -> Listar arquivos críticos e seus propósitos
    -> Adicionar orientação específica de ferramentas
    |
[FASE 6: OTIMIZAÇÃO]
    -> Reduzir para menos de 200 linhas
    -> Remover conteúdo redundante
    -> Verificar que toda linha é acionável
    |
[FASE 7: SEÇÕES GERENCIADAS]
    -> Adicionar marcadores de seção gerenciada para auto-atualizações
    -> Separar conteúdo estável de conteúdo dinâmico
    -> Documentar a estratégia de atualização
    |
[FASE 8: VALIDAÇÃO]
    -> Verificação da contagem de linhas
    -> Revisão de conteúdo quanto à acionabilidade
    -> Teste com uma interação de exemplo do Claude
    |
SAÍDA: Arquivo CLAUDE.md otimizado
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_root | string | Detecção automática | yes | Diretório de projeto válido |
| existing_claude_md | string | Detecção automática | no | Caminho para o CLAUDE.md existente, se houver |
| project_name | string | Usuário ou automático | no | Nome legível do projeto |
| team_notes | string | Usuário | no | Quaisquer convenções de equipe não capturadas no código |
| style | enum | Usuário | no | minimal / standard / comprehensive (default: standard) |

---

## Pré-condições

1. O diretório do projeto existe com código-fonte
2. Entendimento do que o Claude Code precisa do CLAUDE.md
3. Acesso ao código existente do projeto para extração de padrões

---

## Fase 1: Análise do Projeto

**Goal:** Determinar o que o Claude precisa saber para ser produtivo neste projeto.

### Hierarquia da Informação (mais importante primeiro)

1. **O que executar** -- Comandos de build, teste, lint
2. **Como escrever código** -- Padrões, convenções, estilo
3. **Onde as coisas estão** -- Diretórios-chave, pontos de entrada
4. **O que não fazer** -- Antipadrões, operações proibidas
5. **Como integrar** -- Fluxo de trabalho do Git, processo de PR

### Passos

1.1. Detectar a stack tecnológica (package.json, tsconfig.json, etc.).
1.2. Identificar os 5-10 padrões mais importantes analisando:
   - Os padrões usados com mais frequência entre os arquivos
   - Padrões que são específicos do projeto (não defaults do framework)
   - Padrões que o Claude comumente erra
1.3. Listar o que o Claude precisa saber versus o que ele já sabe:
   - O Claude já sabe React, TypeScript, frameworks comuns
   - O Claude NÃO sabe os padrões, aliases e convenções customizados do seu projeto

---

## Fase 2: Seção de Padrões de Código

**Goal:** Definir como o código deve ser escrito neste projeto.

### Passos

2.1. Analisar 5-10 arquivos-fonte representativos em busca de padrões.
2.2. Documentar apenas os padrões que se desviam dos defaults:

```markdown
## Code Standards
- Use named exports (not default exports)
- Import with @ alias: `import { Button } from '@/components/Button'`
- Error handling: always use custom AppError class
- State: Zustand stores in src/stores/, one file per domain
```

2.3. Manter esta seção com menos de 20 linhas.
2.4. Se os padrões forem complexos, crie `.claude/rules/code-standards.md` e referencie-o.

---

## Fase 3: Requisitos de Teste

**Goal:** Dizer ao Claude exatamente como testar neste projeto.

### Passos

3.1. Extrair a configuração de testes dos arquivos do projeto.
3.2. Documentar os comandos de teste essenciais:

```markdown
## Testing
- Run all tests: `npm test`
- Run specific: `npm test -- --testPathPattern=auth`
- Coverage: `npm test -- --coverage`
- Watch mode: `npm test -- --watch`
- E2E: `npx playwright test`
```

3.3. Documentar os padrões de teste:
   - Onde os arquivos de teste ficam (co-localizados vs. diretório separado)
   - Convenção de nomenclatura (*.test.ts vs. *.spec.ts)
   - Padrões de mock específicos deste projeto

3.4. Manter esta seção com menos de 15 linhas.

---

## Fase 4: Convenções de Git e PR

**Goal:** Ensinar ao Claude o fluxo de trabalho de git do projeto.

### Passos

4.1. Analisar as mensagens de commit recentes em busca do formato:

```bash
git log --oneline -20
```

4.2. Documentar as convenções:

```markdown
## Git Conventions
- Commits: `type(scope): description` (conventional commits)
- Branch naming: `feature/`, `fix/`, `chore/`
- PR: squash merge, reference issue number
```

4.3. Manter esta seção com menos de 10 linhas.

---

## Fase 5: Orientação Específica do Projeto

**Goal:** Documentar o que torna este projeto único.

### Passos

5.1. Identificar as decisões-chave de arquitetura:

```markdown
## Architecture
- Monorepo with packages/ directory
- API routes in src/app/api/ (Next.js App Router)
- Database: Supabase with RLS policies
- Auth: Supabase Auth with JWT
```

5.2. Listar os arquivos críticos que o Claude deve conhecer:

```markdown
## Key Files
- `src/lib/supabase.ts` -- Supabase client singleton
- `src/middleware.ts` -- Auth middleware for all routes
- `src/types/database.ts` -- Auto-generated DB types
```

5.3. Adicionar orientação específica de ferramentas se estiver usando ferramentas não padronizadas.
5.4. Manter a seção combinada com menos de 30 linhas.

---

## Fase 6: Otimização

**Goal:** Reduzir para o máximo de impacto por token.

### Regras de Otimização

1. **Toda linha deve ser acionável** -- remova "este projeto usa..." em favor de "use..."
2. **Sem tutoriais** -- o Claude sabe como o React funciona, não explique isso
3. **Sem preenchimento** -- remova "por favor garanta", "certifique-se de", apenas declare a regra
4. **Comandos em vez de descrições** -- `npm test` em vez de "execute a suíte de testes usando npm"
5. **Tabelas em vez de parágrafos** -- dados estruturados são mais rápidos de processar
6. **Delegue para regras** -- mova padrões detalhados para arquivos `.claude/rules/`

### Passos

6.1. Revise cada linha e pergunte: "Remover isto faria o Claude cometer um erro?"
   - Se não, remova
   - Se sim, mantenha
6.2. Converta parágrafos em tópicos (bullet points) ou tabelas.
6.3. Mova qualquer seção com mais de 30 linhas para um arquivo de regras.
6.4. Comprimento final alvo:
   - Estilo minimal: 50-80 linhas
   - Estilo standard: 100-150 linhas
   - Estilo comprehensive: 150-200 linhas

---

## Fase 7: Seções Gerenciadas

**Goal:** Habilitar a auto-atualização de conteúdo dinâmico.

### Padrão de Seção Gerenciada

```markdown
<!-- MANAGED-START: tech-stack -->
## Tech Stack
- Next.js 14, React 18, TypeScript 5
- Tailwind CSS, shadcn/ui
- Supabase (auth + database)
<!-- MANAGED-END: tech-stack -->
```

### Passos

7.1. Identificar as seções que mudam com frequência (versões da stack tecnológica, comandos).
7.2. Envolvê-las em marcadores de seção gerenciada.
7.3. Identificar as seções que são estáveis (arquitetura, convenções).
7.4. Deixar as seções estáveis como markdown simples.

---

## Fase 8: Validação

**Goal:** Verificar se o CLAUDE.md é eficaz.

### Checklist de Validação

- [ ] Contagem total de linhas abaixo de 200
- [ ] Toda seção tem ao menos uma instrução acionável
- [ ] Nenhuma seção excede 30 linhas
- [ ] Todos os caminhos de arquivo referenciados existem
- [ ] Todos os comandos referenciados existem no package.json
- [ ] Nenhuma informação duplicada entre seções
- [ ] Nenhuma explicação em estilo de tutorial
- [ ] Seções gerenciadas devidamente formatadas

### Passos

8.1. Execute o checklist de validação.
8.2. Teste com uma interação de exemplo do Claude:
   - Peça ao Claude para criar um novo componente -- ele segue os padrões?
   - Peça ao Claude para adicionar um teste -- ele usa o framework correto?
   - Peça ao Claude para fazer um commit -- ele usa o formato correto?
8.3. Se algum teste falhar, identifique a instrução faltante e adicione-a.

---

## Formato de Saída

```yaml
claude_md_engineer_result:
  file: "CLAUDE.md"
  total_lines: 142
  style: "standard"
  sections:
    - name: "Project Overview"
      lines: 5
    - name: "Code Standards"
      lines: 18
    - name: "Testing"
      lines: 12
    - name: "Git Conventions"
      lines: 8
    - name: "Architecture"
      lines: 15
    - name: "Key Files"
      lines: 10
    - name: "Commands"
      lines: 8
  managed_sections: 2
  rules_extracted_to:
    - ".claude/rules/code-standards.md"
    - ".claude/rules/architecture.md"
  validation:
    line_count: "pass"
    actionability: "pass"
    references: "pass"
    sample_test: "pass"
  overall_status: "PASS"
```

---

## Condições de Veto

| Condition | Action |
|-----------|--------|
| CLAUDE.md excede 200 linhas após a otimização | PARAR -- continue reduzindo ou extraia para regras |
| Sem código-fonte no projeto (nada para analisar) | PARAR -- nenhum padrão para documentar |
| O CLAUDE.md existente tem seções gerenciadas customizadas de outra ferramenta | AVISAR -- preserve os marcadores existentes |
| O projeto usa linguagem/framework sem convenções detectadas | AVISAR -- gere um CLAUDE.md mínimo |
| Toda linha removida na otimização estava marcada como necessária | AVISAR -- o projeto pode genuinamente precisar de 200+ linhas, use arquivos de regras |
