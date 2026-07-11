---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Auditar Codebase por Redundância de Padrões de UI

> Task ID: brad-audit-codebase
> Agente: Brad (Design System Architect)
> Versão: 1.0.0

## Modos de Execução

**Escolha o modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Completo Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: auditCodebase()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho ou identificador válido

- campo: options
  tipo: object
  origem: config
  obrigatório: false
  validação: Configuração de análise

- campo: depth
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Padrão: 1 (0-3)

**Saída:**
- campo: analysis_report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true

- campo: findings
  tipo: array
  destino: Memory
  persistido: false

- campo: metrics
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O alvo existe e está acessível; ferramentas de análise disponíveis
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que o alvo existe e está acessível; ferramentas de análise disponíveis
    error_message: "Pré-condição falhou: O alvo existe e está acessível; ferramentas de análise disponíveis"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise concluída; relatório gerado; sem problemas críticos
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que a análise está concluída; relatório gerado; sem problemas críticos
    error_message: "Pós-condição falhou: Análise concluída; relatório gerado; sem problemas críticos"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Análise precisa; todos os alvos cobertos; relatório completo
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que a análise é precisa; todos os alvos cobertos; relatório completo
    error_message: "Critério de aceite não atendido: Análise precisa; todos os alvos cobertos; relatório completo"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** code-analyzer
  - **Propósito:** Análise estática de código e métricas
  - **Origem:** .aiox-core/utils/code-analyzer.js

- **Ferramenta:** file-system
  - **Propósito:** Travessia recursiva de diretórios
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** analyze-codebase.js
  - **Propósito:** Análise de codebase e geração de relatórios
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/analyze-codebase.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Alvo Não Acessível
   - **Causa:** O caminho não existe ou permissões negadas
   - **Resolução:** Verificar o caminho e checar as permissões
   - **Recuperação:** Pular caminhos inacessíveis, continuar com os acessíveis

2. **Erro:** Timeout da Análise
   - **Causa:** A análise excede o limite de tempo para codebases grandes
   - **Resolução:** Reduzir a profundidade ou o escopo da análise
   - **Recuperação:** Retornar resultados parciais com aviso de timeout

3. **Erro:** Limite de Memória Excedido
   - **Causa:** Codebase grande excede a alocação de memória
   - **Resolução:** Processar em lotes ou aumentar o limite de memória
   - **Recuperação:** Degradação graciosa para análise em resumo

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

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

Varre o codebase para detectar redundâncias de padrões de UI (botões, cores, espaçamento, tipografia, formulários) e quantificar a dívida técnica com métricas concretas. A especialidade do Brad: mostrar o show de horrores que você criou.

## Pré-requisitos

- Codebase com código de UI (React, Vue, HTML ou CSS puro)
- Acesso ao shell Bash
- Utilitários grep, find, awk disponíveis

## Workflow

### Elicitação Interativa

Esta task usa elicitação interativa para coletar os parâmetros de varredura.

1. **Coletar Parâmetros de Varredura**
   - Perguntar pelo caminho de varredura (ex.: ./src, ./app, ./components)
   - Detectar frameworks automaticamente ou pedir confirmação
   - Confirmar o diretório de saída (padrão: outputs/design-system/{project}/audit/)

2. **Validar o Caminho de Varredura**
   - Verificar se o caminho existe e é legível
   - Contar o total de arquivos a varrer
   - Estimar o tempo de varredura (100k LOC ~2 min)

3. **Confirmar e Executar**
   - Exibir o resumo do plano de varredura
   - Pedir confirmação antes de iniciar
   - Iniciar a detecção de padrões

### Passos

1. **Validar o Ambiente**
   - Verificar se o caminho de varredura existe
   - Verificar as permissões de leitura
   - Criar a estrutura do diretório de saída
   - Validação: O caminho existe e é legível

2. **Detectar Frameworks**
   - Contar arquivos React/JSX (*.jsx, *.tsx)
   - Contar arquivos Vue (*.vue)
   - Contar arquivos HTML (*.html)
   - Contar arquivos CSS (*.css, *.scss, *.sass)
   - Validação: Ao menos 1 tipo de arquivo de UI encontrado

3. **Varrer Padrões de Botão**
   - Detectar elementos de botão (<button, <Button, className="btn")
   - Contar o total de instâncias de botão em todos os arquivos
   - Extrair nomes de classe e padrões de botão únicos
   - Calcular o fator de redundância (instâncias / padrões únicos)
   - Validação: Padrões detectados ou zero se nenhum existir

4. **Varrer Uso de Cores**
   - Extrair cores hexadecimais (#RGB, #RRGGBB)
   - Extrair cores rgb/rgba
   - Contar valores de cor únicos
   - Contar o total de instâncias de uso de cor
   - Identificar as 10 cores mais usadas
   - Calcular o fator de redundância
   - Validação: Lista de cores gerada

5. **Varrer Padrões de Espaçamento**
   - Extrair valores de padding (padding: Npx)
   - Extrair valores de margin (margin: Npx)
   - Contar valores de espaçamento únicos
   - Identificar os padrões mais comuns
   - Validação: Inventário de espaçamento completo

6. **Varrer Tipografia**
   - Extrair declarações de font-family
   - Extrair valores de font-size
   - Extrair valores de font-weight
   - Contar padrões de tipografia únicos
   - Validação: Catálogo de tipografia criado

7. **Varrer Padrões de Formulário**
   - Contar elementos input
   - Extrair padrões de classe de input únicos
   - Contar elementos form
   - Extrair padrões de form únicos
   - Validação: Padrões de formulário documentados

8. **Gerar Relatório de Inventário**
   - Criar pattern-inventory.json com todas as métricas
   - Incluir metadados da varredura (timestamp, caminho, contagens de arquivos)
   - Calcular os fatores de redundância para cada tipo de padrão
   - Validação: Saída JSON válida gerada

9. **Criar Arquivo de Estado**
   - Gerar .state.yaml para o handoff do Atlas
   - Registrar todas as contagens de padrões e métricas
   - Registrar o histórico do agente em log
   - Definir a fase como "audit_complete"
   - Validação: Arquivo de estado criado e YAML válido

## Saída

- **pattern-inventory.json**: Dados estruturados com todas as contagens de padrões, fatores de redundância e estatísticas de uso
- **.state.yaml**: Arquivo de estado do Brad para handoff ao Atlas ou ao próximo comando
- **Resumo no console**: Métricas-chave exibidas para revisão imediata

### Formato de Saída

```json
{
  "scan_metadata": {
    "timestamp": "2025-10-27T12:00:00Z",
    "scan_path": "./src",
    "total_files": 487,
    "frameworks_detected": {
      "react": true,
      "vue": false,
      "html": false
    }
  },
  "patterns": {
    "buttons": {
      "unique_patterns": 47,
      "total_instances": 327,
      "redundancy_factor": 6.96
    },
    "colors": {
      "unique_hex": 82,
      "unique_rgb": 7,
      "total_unique": 89,
      "total_instances": 1247,
      "redundancy_factor": 14.01
    },
    "spacing": {
      "unique_padding": 19,
      "unique_margin": 15
    },
    "typography": {
      "unique_font_families": 4,
      "unique_font_sizes": 15,
      "unique_font_weights": 6
    },
    "forms": {
      "input_instances": 189,
      "unique_input_patterns": 23,
      "form_instances": 45,
      "unique_form_patterns": 12
    }
  }
}
```

## Critérios de Sucesso

- [ ] A varredura é concluída em <2 minutos para 100k LOC
- [ ] Todos os tipos de padrão detectados (botões, cores, espaçamento, tipografia, formulários)
- [ ] Fatores de redundância calculados para os padrões mensuráveis
- [ ] Saída JSON válida gerada com dados completos
- [ ] Arquivo de estado criado para o próximo comando (consolidate/tokenize)
- [ ] Sem erros de varredura ou permissões faltantes

## Tratamento de Erros

- **Caminho de varredura não existe**: Encerrar com mensagem de erro clara, sugerir caminhos válidos
- **Nenhum arquivo de UI encontrado**: Avisar o usuário, verificar se o caminho está correto ou se os arquivos existem
- **Permissão negada**: Explicar qual diretório precisa de acesso de leitura
- **Falha parcial na varredura**: Registrar quais arquivos falharam, continuar com os arquivos restantes, reportar dados incompletos

## Considerações de Segurança

- Acesso somente-leitura ao codebase (sem escritas durante a varredura)
- Sem execução de código durante a detecção de padrões
- Validar os caminhos de arquivo para prevenir directory traversal
- Tratar arquivos malformados de forma graciosa (CSS/JSX inválido)
- Pular arquivos binários e arquivos não-texto grandes

## Exemplos

### Exemplo 1: Varredura de Codebase React

```bash
*audit ./src
```

Saída:
```
🔍 Brad: Scanning ./src for UI chaos...

📊 Files found:
  - React/JSX: 234
  - CSS/SCSS: 89
  - TOTAL: 323

🔍 Scanning BUTTONS...
📊 BUTTONS:
  - Total instances: 327
  - Unique patterns: 47
  - Redundancy factor: 7.0x

🎨 Scanning COLORS...
📊 COLORS:
  - Unique hex values: 82
  - Total usage instances: 1247
  - Redundancy factor: 15.2x

✅ Inventory saved: outputs/design-system/my-app/audit/pattern-inventory.json
✅ State saved: outputs/design-system/my-app/.state.yaml
```

### Exemplo 2: Varredura de Codebase Vue

```bash
*audit ./components
```

A saída mostra padrões específicos de Vue (v-btn, el-button, etc.)

## Notas

- Fator de redundância >3x indica dívida técnica significativa
- Cores >50 valores únicos = grande oportunidade de consolidação
- Botões >20 variações = explosão séria de padrões
- Rode esta auditoria periodicamente para prevenir a regressão de padrões
- Brad recomenda: Se os fatores de redundância estiverem altos, rode *consolidate em seguida
- Para a análise de custo desse desperdício, rode *calculate-roi após a auditoria
