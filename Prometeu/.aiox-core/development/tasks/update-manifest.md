---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: updateManifest()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve existir no sistema

- campo: changes
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Objeto de modificação válido

- campo: backup
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Padrão: true

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

**Purpose:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo existe; backup criado; parâmetros de modificação válidos
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o alvo existe; backup criado; parâmetros de modificação válidos
    error_message: "Pré-condição falhou: Alvo existe; backup criado; parâmetros de modificação válidos"
```

---

## Pós-Condições

**Purpose:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Modificação aplicada; backup preservado; integridade verificada
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a modificação foi aplicada; backup preservado; integridade verificada
    error_message: "Pós-condição falhou: Modificação aplicada; backup preservado; integridade verificada"
```

---

## Critérios de Aceite

**Purpose:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Mudanças aplicadas corretamente; original com backup; rollback possível
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que as mudanças foram aplicadas corretamente; original com backup; rollback possível
    error_message: "Critério de aceite não atendido: Mudanças aplicadas corretamente; original com backup; rollback possível"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** file-system
  - **Purpose:** Leitura, modificação e backup de arquivos
  - **Source:** Módulo fs do Node.js

- **Tool:** ast-parser
  - **Purpose:** Fazer parse e modificar código com segurança
  - **Source:** .aiox-core/utils/ast-parser.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** modify-file.js
  - **Purpose:** Modificação segura de arquivo com backup
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/modify-file.js

---

## Tratamento de Erros

**Strategy:** retry

**Erros Comuns:**

1. **Error:** Alvo Não Encontrado
   - **Cause:** O recurso especificado não existe
   - **Resolution:** Verificar se o alvo existe antes da modificação
   - **Recovery:** Sugerir recursos similares ou criar novo

2. **Error:** Backup Falhou
   - **Cause:** Não foi possível criar o backup antes da modificação
   - **Resolution:** Verificar espaço em disco e permissões
   - **Recovery:** Abortar a modificação, preservar o estado original

3. **Error:** Modificação Concorrente
   - **Cause:** Recurso modificado por outro processo
   - **Resolution:** Implementar bloqueio de arquivo ou lógica de retry
   - **Recovery:** Tentar novamente com backoff exponencial ou mesclar as mudanças

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Optimization Notes:**
- Paralelizar operações independentes; reutilizar resultados de átomos; implementar saídas antecipadas (early exits)

---

## Metadata

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

checklists:
  - change-checklist.md
---

# Update Manifest

## Propósito
Atualizar com segurança os arquivos de manifesto de equipe (team manifest) com novas entradas de agente, mantendo a integridade do YAML e prevenindo corrupção.

## Pré-requisitos
- Autorização do usuário verificada
- Arquivo do agente já criado
- Capacidade de backup disponível
- Parser de YAML carregado

## Processo de Elicitação Interativa

### Passo 1: Seleção do Manifesto
```
ELICIT: Manifesto Alvo
1. Qual manifesto de equipe atualizar?
   - team-all.yaml (todos os agentes)
   - team-fullstack.yaml (desenvolvimento full stack)
   - team-no-ui.yaml (apenas backend)
   - team-ide-minimal.yaml (configuração mínima de IDE)
2. Este é o manifesto correto para o propósito do agente?
```

### Passo 2: Categorização do Agente
```
ELICIT: Classificação do Agente
1. A qual categoria este agente pertence?
   - development (codificação, implementação)
   - planning (PM, PO, arquitetura)
   - quality (QA, testes, validação)
   - specialty (UX, dados, segurança)
   - meta (framework, ferramental)
2. Quais tags devem ser aplicadas? (separadas por vírgula)
3. Alguma nota ou restrição especial?
```

### Passo 3: Composição da Equipe
```
ELICIT: Integração da Equipe
1. Este agente deve ser incluído por padrão? (yes/no)
2. Existem dependências de agente?
3. Isto deve substituir um agente existente?
4. Algum agente incompatível?
```

## Passos de Implementação

1. **Backup do Manifesto Atual**
   ```javascript
   const backupPath = `${manifestPath}.backup-${Date.now()}`;
   await fs.copy(manifestPath, backupPath);
   console.log(`✅ Backup criado: ${backupPath}`);
   ```

2. **Carregar e Fazer Parse do Manifesto**
   ```javascript
   const manifestContent = await fs.readFile(manifestPath, 'utf8');
   const manifest = yaml.load(manifestContent);
   
   // Validar estrutura
   if (!manifest.team || !manifest.agents) {
     throw new Error('Estrutura de manifesto inválida');
   }
   ```

3. **Verificar Duplicatas**
   ```javascript
   const agentExists = manifest.agents.some(a => 
     a.id === agentId || a.file === agentFile
   );
   
   if (agentExists) {
     // Perguntar: Atualizar existente ou criar nova entrada?
   }
   ```

4. **Adicionar Entrada do Agente**
   ```yaml
   agents:
     - id: {agent-id}
       file: agents/{agent-name}.md
       name: {Nome de Exibição do Agente}
       category: {category}
       tags:
         - {tag1}
         - {tag2}
       whenToUse: {descrição}
       defaultIncluded: {true|false}
   ```

5. **Validar o Manifesto Atualizado**
   ```javascript
   // Validar sintaxe YAML
   try {
     yaml.load(yaml.dump(manifest));
   } catch (error) {
     console.error('❌ YAML inválido gerado');
     // Restaurar a partir do backup
   }
   
   // Validar referências de agente
   for (const agent of manifest.agents) {
     const agentPath = path.join(root, agent.file);
     if (!await fs.exists(agentPath)) {
       console.warn(`⚠️ Arquivo de agente não encontrado: ${agent.file}`);
     }
   }
   ```

6. **Gravar o Manifesto Atualizado**
   ```javascript
   const updatedYaml = yaml.dump(manifest, {
     indent: 2,
     lineWidth: -1,
     noRefs: true,
     sortKeys: false
   });
   
   await fs.writeFile(manifestPath, updatedYaml, 'utf8');
   ```

7. **Atualizar a Camada de Memória**
   ```javascript
   await memoryClient.addMemory({
     type: 'manifest_updated',
     manifest: manifestName,
     action: 'agent_added',
     agent: agentId,
     backup: backupPath,
     timestamp: new Date().toISOString(),
     user: currentUser
   });
   ```

8. **Verificar a Integridade do Manifesto**
   - Tentar carregar o manifesto atualizado
   - Verificar se todas as referências de agente são válidas
   - Garantir que nenhuma corrupção ocorreu
   - Testar com a ativação real do agente

## Checklist de Validação
- [ ] Backup criado com sucesso
- [ ] Estrutura do manifesto preservada
- [ ] Nenhuma entrada duplicada
- [ ] Sintaxe YAML válida
- [ ] Todos os arquivos de agente existem
- [ ] Camada de memória atualizada
- [ ] Manifesto carrega corretamente

## Tratamento de Erros
- Se o backup falhar: Abortar a operação
- Se o parse falhar: Exibir erro, não prosseguir
- Se for encontrada duplicata: Oferecer opções
- Se a gravação falhar: Restaurar a partir do backup
- Se a validação falhar: Restaurar e reportar

## Procedimento de Rollback
```javascript
if (errorOccurred) {
  console.log('🔄 Revertendo as mudanças...');
  try {
    await fs.copy(backupPath, manifestPath);
    
    // Verificar sucesso do rollback
    const rolledBackContent = await fs.readFile(manifestPath, 'utf8');
    const rolledBackManifest = yaml.load(rolledBackContent);
    
    if (rolledBackManifest && rolledBackManifest.agents) {
      console.log('✅ Rollback concluído - manifesto restaurado');
    } else {
      console.error('❌ Verificação do rollback falhou - intervenção manual necessária');
      console.error(`Local do backup: ${backupPath}`);
    }
  } catch (rollbackError) {
    console.error('❌ CRÍTICO: Rollback falhou!', rollbackError);
    console.error(`Restauração manual necessária a partir de: ${backupPath}`);
  }
}
```

## Saída de Sucesso
```
✅ Manifesto atualizado com sucesso!
📁 Manifesto: {manifest-name}
🤖 Agente adicionado: {agent-name}
📂 Backup salvo: {backup-path}
🔍 Verificação:
   - Sintaxe YAML: ✓
   - Arquivos de agente: ✓
   - Sem duplicatas: ✓
📝 Próximos passos:
   1. Testar a ativação do agente
   2. Verificar a composição da equipe
   3. Commitar as mudanças
```

## Notas de Segurança
- Sempre criar backup antes da modificação
- Validar todos os caminhos para prevenir traversal
- Registrar em log todas as mudanças no manifesto
- Exigir autorização para atualizações do manifesto
- Manter trilha de auditoria de todas as modificações 