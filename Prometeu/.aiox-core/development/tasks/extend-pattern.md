---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Estender Padrão Existente

> Task ID: atlas-extend-pattern
> Agent: Atlas (Design System Builder)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: extendPattern()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must exist in system

- campo: changes
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Valid modification object

- campo: backup
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: true

**Saída:**
- campo: modified_file
  tipo: string
  destino: File system
  persistido: true

- campo: backup_path
  tipo: string
  destino: File system
  persistido: true

- campo: changes_applied
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target exists; backup created; valid modification parameters
    tipo: pre-condition
    blocker: true
    validação: |
      Check target exists; backup created; valid modification parameters
    error_message: "Pre-condition failed: Target exists; backup created; valid modification parameters"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Modification applied; backup preserved; integrity verified
    tipo: post-condition
    blocker: true
    validação: |
      Verify modification applied; backup preserved; integrity verified
    error_message: "Post-condition failed: Modification applied; backup preserved; integrity verified"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Changes applied correctly; original backed up; rollback possible
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert changes applied correctly; original backed up; rollback possible
    error_message: "Acceptance criterion not met: Changes applied correctly; original backed up; rollback possible"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** file-system
  - **Propósito:** Leitura, modificação e backup de arquivos
  - **Origem:** Módulo fs do Node.js

- **Tool:** ast-parser
  - **Propósito:** Analisar e modificar código com segurança
  - **Origem:** .aiox-core/utils/ast-parser.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** modify-file.js
  - **Propósito:** Modificação segura de arquivos com backup
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/modify-file.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Target Não Encontrado
   - **Causa:** O recurso especificado não existe
   - **Resolução:** Verifique se o target existe antes da modificação
   - **Recuperação:** Sugira recursos similares ou crie um novo

2. **Erro:** Backup Falhou
   - **Causa:** Não foi possível criar backup antes da modificação
   - **Resolução:** Verifique o espaço em disco e as permissões
   - **Recuperação:** Aborte a modificação, preserve o estado original

3. **Erro:** Modificação Concorrente
   - **Causa:** Recurso modificado por outro processo
   - **Resolução:** Implemente bloqueio de arquivo ou lógica de retry
   - **Recuperação:** Tente novamente com backoff exponencial ou mescle as mudanças

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de atoms; implemente saídas antecipadas

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Descrição

Adiciona nova variante, tamanho ou funcionalidade a um componente existente sem quebrar a compatibilidade. Mantém a consistência com os padrões do design system.

## Pré-requisitos

- O componente existe
- A configuração do design system está completa
- Tokens disponíveis para a nova variante

## Workflow

### Passos

1. **Carregar Componente Existente** - Ler o arquivo e a estrutura do componente
2. **Validar Solicitação de Extensão** - Verificar a compatibilidade com a API existente
3. **Adicionar Nova Variante/Tamanho** - Estender as props e a implementação
4. **Atualizar Estilos** - Adicionar estilos da nova variante usando tokens
5. **Atualizar Testes** - Adicionar testes para a nova variante
6. **Atualizar Stories** - Adicionar story para a nova variante
7. **Atualizar Documentação** - Documentar a nova variante
8. **Validar Compatibilidade Retroativa** - Garantir que o uso existente continue funcionando

## Saída

- Arquivo de componente atualizado
- Estilos atualizados
- Testes atualizados
- Documentação atualizada

## Critérios de Sucesso

- [ ] Nova variante implementada corretamente
- [ ] Retrocompatível (o código existente funciona)
- [ ] Testes atualizados e passando
- [ ] Documentação reflete as mudanças
- [ ] Sem breaking changes

## Exemplo

```bash
*extend button --variant warning

Atlas: "Adicionando a variante 'warning' ao Button..."
✓ Button.tsx atualizado (nova prop de variante)
✓ Button.module.css atualizado (estilos de warning)
✓ Button.test.tsx atualizado (testes de warning)
✓ Button.stories.tsx atualizado (story de warning)
✓ Compatibilidade retroativa: ✓

A variante warning usa:
  - color: var(--color-warning)
  - color (hover): var(--color-warning-dark)
```

## Notas

- Mantenha a compatibilidade da interface de props
- Adicione, não substitua
- Teste se as variantes existentes ainda funcionam
- Documente a migração se a API mudar
