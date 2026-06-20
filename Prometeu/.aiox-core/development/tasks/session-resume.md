# Session Resume Task

**Story:** 11.5 - Session State Persistence
**Version:** 1.0.0

---

## Propósito

Tratar a retomada de sessão quando o Bob detecta um arquivo `.session-state.yaml` existente.
Apresenta opções ao usuário e executa a ação selecionada.

---

## Definição da Task

```yaml
task: sessionResume
responsible: Bob (pm.md)
atomic_layer: Organism

inputs:
  - field: projectRoot
    type: string
    required: true
    description: Diretório raiz do projeto

outputs:
  - field: action
    type: string
    description: Ação selecionada (continue|review|restart|discard)
  - field: storyPath
    type: string
    description: Caminho para a story a continuar (se aplicável)
```

---

## Passos de Execução

### Passo 1: Carregar Estado da Sessão

```javascript
const { loadSessionState } = require('.aiox-core/core/orchestration');
const sessionState = await loadSessionState(projectRoot);

if (!sessionState) {
  return { action: 'no_session', message: 'No session state found' };
}
```

### Passo 2: Verificar Crash

```javascript
const { SessionState } = require('.aiox-core/core/orchestration');
const manager = new SessionState(projectRoot);
await manager.loadSessionState();

const crashResult = await manager.detectCrash();

if (crashResult.isCrash) {
  console.log(`⚠️ Possível crash detectado!`);
  console.log(`   Última atualização: ${crashResult.minutesSinceUpdate} minutos atrás`);
  console.log(`   Última ação: ${crashResult.lastActionType}`);
  console.log(`   Fase: ${crashResult.lastPhase}`);
}
```

### Passo 3: Apresentar Resumo de Retomada

```javascript
const summary = manager.getResumeSummary();
console.log(summary);
```

**Saída Esperada:**

```
🔄 Sessão anterior detectada!

Epic: Projeto Bob — Interface Única e Orquestração
Progresso: 2 de 6 stories completas
Último story: 11.3 (Development Cycle Workflow)
Fase quando pausou: Implementação

O que você quer fazer?

[1] Continuar de onde parou
[2] Revisar o que foi feito
[3] Recomeçar story 11.3 do zero
[4] Iniciar novo épico (descarta sessão)
```

### Passo 4: Elicitar Escolha do Usuário

```yaml
elicit: true
type: select
options:
  - value: continue
    label: "[1] Continuar de onde parou"
  - value: review
    label: "[2] Revisar o que foi feito"
  - value: restart
    label: "[3] Recomeçar story do zero"
  - value: discard
    label: "[4] Iniciar novo épico"
```

### Passo 5: Executar Ação Selecionada

```javascript
const { ResumeOption } = require('.aiox-core/core/orchestration');

const result = await manager.handleResumeOption(selectedOption);

switch (result.action) {
  case 'continue':
    // Resume from last state
    return {
      action: 'continue',
      storyPath: result.story,
      phase: result.phase,
      message: `Continuando story ${result.story} da fase ${result.phase}`,
    };

  case 'review':
    // Show progress summary
    const summary = result.summary;
    console.log('\n📊 Resumo do Progresso:\n');
    console.log(`Epic: ${summary.epic.title}`);
    console.log(`Progresso: ${summary.progress.percentage}%`);
    console.log(`Stories completas: ${summary.progress.storiesDone.join(', ')}`);
    console.log(`Stories pendentes: ${summary.progress.storiesPending.join(', ')}`);
    // Re-prompt after review
    break;

  case 'restart':
    return {
      action: 'restart',
      storyPath: result.story,
      message: `Recomeçando story ${result.story} do início`,
    };

  case 'discard':
    return {
      action: 'discard',
      message: 'Sessão descartada. Pronto para novo épico.',
    };
}
```

---

## Integração com pm.md

Esta task deve ser chamada a partir de `pm.md` durante a saudação quando o estado da sessão é detectado:

```yaml
# In pm.md greeting-builder integration
on_activation:
  - check: sessionStateExists(projectRoot)
    if_true:
      - execute: session-resume.md
      - use_result: to determine workflow continuation
```

---

## Tratamento de Erros

| Erro | Recuperação |
|-------|----------|
| Arquivo de estado corrompido | Oferecer descartar e começar do zero |
| YAML inválido | Erro de parse com o caminho do arquivo, oferecer descarte |
| Campos obrigatórios ausentes | Avisar e oferecer recuperação parcial |

---

## Metadata

```yaml
story: 11.5
version: 1.0.0
dependencies:
  - session-state.js
tags:
  - session
  - resume
  - orchestration
updated_at: 2026-02-05
```
