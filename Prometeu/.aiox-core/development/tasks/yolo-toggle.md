# yolo-toggle

**Task ID:** yolo-toggle
**Version:** 1.0.0
**Created:** 2026-02-06
**Agent:** Qualquer agente (comando universal)

---

## Propósito

Alterna o modo de permissão através do ciclo: `ask` -> `auto` -> `explore` -> `ask`.
Esta task é invocada pelo comando `*yolo` disponível em todos os 12 agentes.

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: yoloToggle()
responsável: Any Agent
responsavel_type: Agente
atomic_layer: Atom

**Entrada:**
- campo: projectRoot
  tipo: string
  origem: Context (process.cwd())
  obrigatório: false
  validação: Valid directory path

**Saída:**
- campo: newMode
  tipo: object
  destino: .aiox/config.yaml
  persistido: true
```

---

## Processo

### Passo 1: Carregar o Modo Atual

Leia o modo de permissão atual de `.aiox/config.yaml` em `permissions.mode`.
Se o arquivo ou o campo não existir, use `ask` como padrão.

### Passo 2: Avançar para o Próximo Modo

Siga a ordem do ciclo definida em `PermissionMode.MODE_CYCLE`:

```
ask  ->  auto  ->  explore  ->  ask  (repete)
```

### Passo 3: Salvar o Novo Modo

Atualize `.aiox/config.yaml` com o novo valor de `permissions.mode`.
O método `PermissionMode._saveToConfig()` cuida disso, inclusive criando o diretório `.aiox/` se necessário.

### Passo 4: Exibir Confirmação

Mostre ao usuário o novo modo com seu selo:

```
Permission mode changed: [icon ModeName]

  explore: Read-only mode - safe exploration (writes blocked)
  ask:     Confirm before changes - balanced approach (default)
  auto:    Full autonomy - trust mode (all operations allowed)

Current: [icon ModeName]
```

---

## Implementação

```javascript
const { cycleMode } = require('./.aiox-core/core/permissions');

async function yoloToggle() {
  const result = await cycleMode();
  console.log(result.message);
  return result;
}
```

---

## Tratamento de Erros

**Estratégia:** graceful-fallback

- Se `.aiox/config.yaml` não puder ser lido, inicie a partir do modo padrão `ask`
- Se a escrita falhar, exiba o erro e mantenha o modo apenas em memória

---

## Metadata

```yaml
story: ACT-4
version: 1.0.0
dependencies:
  - .aiox-core/core/permissions/permission-mode.js
  - .aiox-core/core/permissions/index.js
tags:
  - permissions
  - mode-toggle
  - universal-command
updated_at: 2026-02-06
```
