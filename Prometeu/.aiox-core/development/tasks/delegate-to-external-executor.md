---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# delegate-to-external-executor.md

**Task**: Delegar Implementação para Executor Externo

**Propósito**: Padronizar a separação orquestrador/executor para os workflows do AIOX. O runtime AIOX ativo mantém autoridade sobre a interpretação da story, validação dos critérios de aceite, gates constitucionais, revisão e atualizações da story, enquanto um runtime de CLI separado realiza apenas a tentativa de implementação.

**Quando Usar**: Use somente para trabalho de implementação do `@dev` em que o escopo da story seja claro o suficiente para ser entregue a outro runtime. Não use para PO, QA, SM, DevOps, aprovação de arquitetura ou autoridade de release.

## Definição da Task

```yaml
task: delegateToExternalExecutor()
responsavel: Orchestrating agent
responsavel_type: Agente
atomic_layer: Organism

inputs:
  - campo: prompt
    tipo: string
    obrigatorio: true
    validacao: Deve citar critérios de aceite, caminho da story, escopo de arquivos e não-objetivos explícitos
  - campo: slug
    tipo: string
    obrigatorio: true
    validacao: Slug de execução estável e seguro para o sistema de arquivos
  - campo: story_id
    tipo: string
    obrigatorio: false
  - campo: story_path
    tipo: string
    obrigatorio: false
  - campo: workdir
    tipo: string
    obrigatorio: false
    default: Raiz atual do projeto
  - campo: provider
    tipo: string
    obrigatorio: false
    default: codex

outputs:
  - campo: run_dir
    tipo: string
    destino: Orchestrator
  - campo: output
    tipo: file
    destino: <run_dir>/output.md
  - campo: log
    tipo: file
    destino: <run_dir>/<provider>.log
  - campo: diff
    tipo: git-diff
    destino: Orchestrator review
```

## Configuração

A delegação está desabilitada por padrão.

```yaml
dev:
  execution_mode: native       # native | delegate
  delegate_to: codex
  auto_review: true

external_executors:
  enabled: false
  default_sandbox: workspace-write   # read-only | workspace-write | full-auto | danger-full-access
  run_dir: .aiox/external-runs
```

## Pré-Condições

```yaml
pre_conditions:
  - [ ] O provider do executor externo está instalado e disponível no PATH.
  - [ ] A árvore de trabalho está limpa, ou as mudanças intencionais existentes já foram commitadas.
  - [ ] O prompt cita o caminho da story e os critérios de aceite.
  - [ ] O prompt lista o escopo de arquivos permitido e os não-objetivos explícitos.
  - [ ] O trabalho delegado é trabalho de implementação de responsabilidade do @dev.
  - [ ] O orquestrador tem contexto suficiente para revisar o diff resultante.
```

## Execução

### 1. Construir o Prompt

O orquestrador escreve um prompt que contém:

- ID e caminho da story
- Critérios de aceite copiados ou resumidos a partir da story
- Caminhos de arquivos ou módulos permitidos
- Expectativas de teste
- Restrições da Constitution e das regras do projeto
- Instrução explícita de que o executor não deve atualizar status da story, checkboxes, File List, PRs ou releases

### 2. Iniciar a Execução Delegada

Use o wrapper:

```bash
aiox-delegate codex -t <slug> -f <prompt_file> -d <workdir>
```

O wrapper imprime:

```text
STATUS=started
RUN_DIR=.aiox/external-runs/<timestamp>-<slug>
PID=<pid>
LOG=<run_dir>/codex.log
OUTPUT=<run_dir>/output.md
PROMPT=<run_dir>/prompt.md
COMMAND=<provider command>
```

### 3. Monitorar a Conclusão

O orquestrador pode acompanhar o log (tail) ou aguardar o PID. Não marque progresso da story enquanto o executor externo ainda estiver em execução.

### 4. Revisar a Saída e o Diff

O orquestrador deve ler:

- `<run_dir>/output.md`
- `<run_dir>/<provider>.log`
- `git diff`

Em seguida, valide:

```yaml
review_checklist:
  - [ ] Todos os critérios de aceite estão satisfeitos.
  - [ ] O escopo do diff corresponde à story e ao prompt.
  - [ ] Artigo IV Sem Invenção: toda mudança rastreia a um requisito.
  - [ ] Testes foram adicionados ou atualizados quando o comportamento mudou.
  - [ ] Lint, typecheck e os testes relevantes passam.
  - [ ] Nenhum estado da story foi modificado antes da aprovação da revisão.
```

### 5. Aceitar ou Iterar

- **Aprovado**: o orquestrador atualiza os checkboxes da story, a File List, o status e as evidências finais de validação.
- **Rejeitado**: o orquestrador escreve feedback específico e pode iniciar uma nova execução com um novo slug ou sufixo de iteração.

## Anti-padrões

- Marcar uma story como concluída confiando no resumo do executor sem ler o diff.
- Delegar autoridade de PO/QA/SM/DevOps a um runtime externo.
- Permitir que o executor crie PRs, faça push, release ou modifique o estado da story.
- Delegar trabalho vago sem critérios de aceite e escopo de arquivos.
- Executar com `danger-full-access` a menos que o ambiente circundante esteja externamente isolado (sandboxed).
