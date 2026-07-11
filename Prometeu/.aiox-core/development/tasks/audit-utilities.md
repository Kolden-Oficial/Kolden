---

# audit-utilities

## Modos de Execução

**Escolha o modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Completo Antecipado
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
task: auditUtilities()
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
  - [ ] Target existe e está acessível; ferramentas de análise disponíveis
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o target existe e está acessível; ferramentas de análise disponíveis
    error_message: "Pré-condição falhou: Target existe e está acessível; ferramentas de análise disponíveis"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise completa; relatório gerado; nenhum problema crítico
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a análise está completa; relatório gerado; nenhum problema crítico
    error_message: "Pós-condição falhou: Análise completa; relatório gerado; nenhum problema crítico"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Análise precisa; todos os targets cobertos; relatório completo
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que a análise está precisa; todos os targets cobertos; relatório completo
    error_message: "Critério de aceite não atendido: Análise precisa; todos os targets cobertos; relatório completo"
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
  - **Propósito:** Análise e geração de relatórios da codebase
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/analyze-codebase.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Target Não Acessível
   - **Causa:** O caminho não existe ou as permissões foram negadas
   - **Resolução:** Verificar o caminho e checar as permissões
   - **Recuperação:** Pular caminhos inacessíveis, continuar com os acessíveis

2. **Erro:** Timeout da Análise
   - **Causa:** A análise excede o limite de tempo para codebases grandes
   - **Resolução:** Reduzir a profundidade ou o escopo da análise
   - **Recuperação:** Retornar resultados parciais com aviso de timeout

3. **Erro:** Limite de Memória Excedido
   - **Causa:** A codebase grande excede a alocação de memória
   - **Resolução:** Processar em lotes ou aumentar o limite de memória
   - **Recuperação:** Degradação graciosa para análise de resumo

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

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

## Dependências de Configuração

Esta task requer as seguintes chaves de configuração do `core-config.yaml`:

- **`devStoryLocation`**: Localização dos arquivos de story (tipicamente docs/stories)

- **`qaLocation`**: Diretório de saída de QA (tipicamente docs/qa) - Necessário para escrever relatórios de qualidade e arquivos de gate

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const dev_story_location = config.devStoryLocation;
const qaLocation = config.qaLocation || 'docs/qa'; // qaLocation
```

## Propósito

Auditar sistematicamente todos os utilitários em `.aiox-core/scripts/` para determinar seu status funcional, classificá-los como WORKING/FIXABLE/DEPRECATED e gerar recomendações acionáveis para manutenção e limpeza.

## Critérios de Classificação

### ✅ WORKING
- Executa sem erros
- Dependências instaladas
- Integrado com pelo menos um agente/task
- Documentação existe (inline ou externa)

### 🔧 FIXABLE
- Executa com erros menores (dependências faltantes, correções de sintaxe)
- Lógica central sólida, precisa de integração
- Esforço de correção estimado em <4 horas
- Conceito valioso o suficiente para justificar a correção

### 🗑️ DEPRECATED
- Não funcional, necessita de reescritas profundas
- Conceito obsoleto (substituído por uma abordagem melhor)
- Esforço de correção >8 horas
- Baixo valor em relação ao esforço

## Passos de Execução

### Passo 1: Rodar Testes Automatizados

Execute o script test-utilities.js para testar todos os utilitários:

```bash
node .aiox-core/scripts/test-utilities.js
```

Isto irá:
- Tentar fazer require() de cada utilitário
- Verificar dependências faltantes
- Testar funções exportadas
- Classificar como WORKING/FIXABLE/DEPRECATED com base nos erros

### Passo 2: Verificar o Status de Integração

Rode a varredura de integração para encontrar o uso dos utilitários:

```bash
# For each utility, count references in agents and tasks
for util in .aiox-core/scripts/*.js; do
  name=$(basename $util .js)
  count=$(grep -r "$name" .aiox-core/agents .aiox-core/tasks Squads 2>/dev/null | wc -l)
  echo "$name: $count references"
done
```

### Passo 3: Revisão Manual de Classificação

Para utilitários com status ambíguo:
- Revisar a qualidade do código-fonte
- Estimar o percentual de conclusão
- Avaliar o valor do conceito
- Calcular a estimativa de esforço de correção

### Passo 4: Gerar Pontuação de Prioridade

Para utilitários FIXABLE, calcule a pontuação de prioridade:

```
Priority Score = (Integration Count × 10) + (Completion % × 5) - (Fix Hours)
```

Pontuações mais altas = maior prioridade para correção

### Passo 5: Tomar a Decisão da Story 3.19

Determinar se existem capacidades de camada de memória:
- Buscar utilitários relacionados a memória
- SE encontrado E classificado como FIXABLE:
  - Estimar o esforço de correção vs o limiar de 20h
  - Avaliar a conclusão da funcionalidade central (>60%?)
  - Recomendar GO/NO-GO/DEFER

### Passo 6: Gerar o Relatório de Auditoria

Criar um relatório abrangente com:
- Estatísticas de resumo (X WORKING, Y FIXABLE, Z DEPRECATED)
- Detalhes por utilitário (status, erros, contagem de integração, recomendação)
- Lista de prioridade de correção (utilitários FIXABLE ranqueados)
- Lista de limpeza (utilitários DEPRECATED a remover)
- Recomendação de ativação da Story 3.19

## Saída

**Principal**: `UTILITIES-AUDIT-REPORT.md` na raiz do projeto ou em docs/

**Formato**:
```markdown
# Relatório de Auditoria de Utilitários do Framework

## Resumo Executivo
- Total de Utilitários: X
- ✅ WORKING: Y (Z%)
- 🔧 FIXABLE: A (B%)
- 🗑️ DEPRECATED: C (D%)

## Achados Detalhados

### Utilitários WORKING
...

### Utilitários FIXABLE (Ranqueados por Prioridade)
...

### Utilitários DEPRECATED (Candidatos a Limpeza)
...

## Decisão da Story 3.19
...
```

## Critérios de Sucesso

- Todos os 81 utilitários auditados sem crashes
- A classificação é consistente e reproduzível
- Contagens de integração precisas
- O relatório é acionável para a Story 3.18 (limpeza)
- A decisão da Story 3.19 tem justificativa clara

## Notas

- Rodar a partir do diretório raiz do projeto
- Requer ambiente Node.js
- Pode levar de 5 a 10 minutos para a auditoria completa
- Alguns utilitários podem ter dependências circulares - trate com elegância
