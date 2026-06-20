# Task de Verificação de Saúde do Registry IDS

## Propósito

Executar uma verificação de saúde com auto-cura (self-healing) no registry de entidades do IDS para detectar e corrigir automaticamente problemas de integridade de dados.

---

## Pré-Condições

- O registry de entidades existe em `.aiox-core/data/entity-registry.yaml`
- Os módulos do IDS estão instalados (IDS-1, IDS-3, IDS-4a)

---

## Execução

### Passo 1: Executar a Verificação de Saúde

```bash
node bin/aiox-ids.js ids:health
```

Revise a saída em busca de quaisquer problemas detectados.

### Passo 2: Auto-Cura (Opcional)

Se forem detectados problemas auto-corrigíveis, execute com `--fix`:

```bash
node bin/aiox-ids.js ids:health --fix
```

Isso irá:
- Criar um backup do registry antes das mudanças
- Auto-corrigir problemas: incompatibilidades de checksum, referências órfãs, palavras-chave ausentes, timestamps obsoletos
- Pular problemas não auto-curáveis (arquivos ausentes) e emitir avisos
- Registrar todas as ações de cura em `.aiox-core/data/registry-healing-log.jsonl`

### Passo 3: Saída em JSON (Legível por Máquina)

```bash
node bin/aiox-ids.js ids:health --json
node bin/aiox-ids.js ids:health --fix --json
```

### Passo 4: Revisar os Avisos

Se forem encontrados problemas críticos (arquivos ausentes), o comando termina com o código 1.
Revise os avisos e tome ação manual conforme sugerido.

---

## Pós-Condições

- Problemas de integridade do registry são detectados e reportados
- Problemas auto-curáveis são corrigidos (com --fix)
- Problemas não auto-curáveis geram avisos com ações sugeridas
- As ações de cura são registradas para a trilha de auditoria
- Um backup do registry é criado antes de quaisquer modificações

---

## Códigos de Saída

| Código | Significado |
|------|---------|
| 0 | Nenhum problema crítico |
| 1 | Problemas críticos encontrados (ex.: arquivos ausentes) |

---

## Uso Programático

```javascript
const { RegistryHealer } = require('.aiox-core/core/ids/registry-healer');

const healer = new RegistryHealer();
const healthResult = healer.runHealthCheck();

if (healthResult.summary.total > 0) {
  const healResult = healer.heal(healthResult.issues, { autoOnly: true });
  console.log(`Healed: ${healResult.healed.length}, Skipped: ${healResult.skipped.length}`);
}
```

---

*Story IDS-4a | Self-Healing Data Integrity*
