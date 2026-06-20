# Extrair Design Tokens de Padrões Consolidados

> Task ID: brad-extract-tokens
> Agent: Brad (Design System Architect)
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
task: extractTokens()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tarefas
  - **Origem:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tarefas
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A tarefa especificada não está registrada no sistema
   - **Resolução:** Verifique o nome e o registro da tarefa
   - **Recuperação:** Liste as tarefas disponíveis, sugira similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da tarefa não correspondem ao schema esperado
   - **Resolução:** Valide os parâmetros em relação à definição da tarefa
   - **Recuperação:** Forneça um template de parâmetros, rejeite a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A tarefa excede o tempo máximo de execução
   - **Resolução:** Otimize a tarefa ou aumente o timeout
   - **Recuperação:** Encerre a tarefa, limpe os recursos, registre o estado

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

Gera um sistema de design tokens a partir de padrões consolidados. Produz uma arquitetura de tokens em 3 camadas (core → semantic → component) com valores OKLCH, JSON em conformidade com o W3C DTCG e exportações complementares (YAML, JSON, CSS custom properties, configuração do Tailwind, SCSS).

## Pré-requisitos

- Consolidação concluída (comando *consolidate executado com sucesso)
- O .state.yaml contém os dados de consolidação
- Os arquivos de padrões consolidados existem (color-clusters.txt, spacing-consolidation.txt, etc)

## Workflow

### Elicitação Interativa

Esta tarefa usa elicitação interativa para configurar a geração de tokens.

1. **Revisar Resultados da Consolidação**
   - Exibir o resumo da consolidação (cores, botões, espaçamento, tipografia)
   - Confirmar a geração de tokens a partir desses padrões
   - Perguntar pelas preferências de nomenclatura (kebab-case por padrão)

2. **Selecionar Formatos de Exportação**
   - Perguntar quais formatos exportar (YAML, JSON, CSS, Tailwind, SCSS, DTCG JSON, todos)
   - Confirmar o diretório de saída
   - Verificar a existência de arquivos de tokens (aviso de sobrescrita)

3. **Validar Cobertura de Tokens**
   - Mostrar a porcentagem de cobertura (os tokens cobrem X% do uso original)
   - Meta: >95% de cobertura
   - Pedir aprovação antes de gerar

### Passos

1. **Carregar Dados de Consolidação**
   - Ler a seção de consolidação do .state.yaml
   - Carregar os arquivos de padrões consolidados
   - Validar que a fase de consolidação foi concluída
   - Validação: Dados de consolidação existem e estão completos

2. **Extrair Tokens de Cor**
   - Ler color-clusters.txt
   - Gerar nomes semânticos (primary, primary-dark, error, success, etc)
   - Detectar relacionamentos (estados de hover, variantes light/dark)
   - Criar a estrutura de tokens de cor
   - Validação: Todas as cores consolidadas têm nomes de token

3. **Extrair Tokens de Espaçamento**
   - Ler spacing-consolidation.txt
   - Mapear os valores de espaçamento para uma escala semântica (xs, sm, md, lg, xl, 2xl, 3xl)
   - Gerar tokens tanto de padding quanto de margin
   - Validação: Escala de espaçamento completa criada

4. **Extrair Tokens de Tipografia**
   - Ler typography-consolidation.txt
   - Criar tokens de font-family
   - Criar tokens de font-size com nomes semânticos
   - Criar tokens de font-weight
   - Criar tokens de line-height (calculados a partir dos tamanhos)
   - Validação: Sistema de tipografia completo

5. **Extrair Tokens de Botão**
   - Ler button-consolidation.txt
   - Gerar tokens de variantes de botão (primary, secondary, destructive)
   - Gerar tokens de tamanhos de botão (sm, md, lg)
   - Mapear cores e espaçamento para os tokens de botão
   - Validação: Os tokens de botão referenciam tokens de cor/espaçamento

6. **Gerar tokens.yaml (Fonte da Verdade)**
   - Criar o YAML com metadados (dtcg_spec, espaço de cor, métricas de cobertura)
   - Organizar as camadas: primitivos `core`, aliases `semantic`, mapeamentos `component`
   - Garantir valores de cor OKLCH (fallback para hex apenas com justificativa)
   - Validação: O schema está alinhado com o template e as referências resolvem

7. **Produzir o JSON W3C DTCG**
   - Converter as camadas YAML para tokens.dtcg.json
   - Injetar referências `$type`, `$value`, `$description`, `{}`
   - Validar com o CLI/validador oficial do DTCG
   - Validação: Sem violações de schema

8. **Exportar para JSON**
   - Converter tokens.yaml para tokens.json
   - Fornecer um mapa achatado para imports diretos em JS/TS
   - Validação: JSON válido, importável por JS/TS

9. **Exportar para CSS Custom Properties**
   - Gerar tokens.css com escopos `:root` + `[data-theme="dark"]`
   - Mapear tokens semânticos para variáveis CSS (`--color-primary`)
   - Validação: O CSS é parseado, o contraste é verificado

10. **Exportar para Configuração do Tailwind (pronta para @theme)**
    - Gerar tokens.tailwind.js com estrutura amigável ao Oxide
    - Mapear tokens para variáveis `@theme` e helpers de container query
    - Validação: O build do Tailwind v4 passa com a configuração

11. **Exportar para Variáveis SCSS**
    - Gerar tokens.scss com variáveis `$token-name`
    - Preservar comentários para uso em componentes
    - Validação: Sintaxe SCSS válida

12. **Validar Cobertura de Tokens**
    - Calcular quantos padrões originais são cobertos
    - Meta: >95% de cobertura + paridade no modo dark
    - Reportar quaisquer lacunas com plano de remediação
    - Validação: A cobertura atinge o limiar

13. **Atualizar o Arquivo de Estado**
    - Adicionar a seção de tokens ao .state.yaml
    - Registrar as contagens de tokens, formatos, resultados do validador
    - Atualizar a fase para "tokenize_complete"
    - Validação: Estado atualizado, pronto para o Atlas ou migração

## Saída

- **tokens.yaml**: Fonte da verdade em camadas (core / semantic / component)
- **tokens.dtcg.json**: Exportação W3C Design Tokens (v2025.10)
- **tokens.json**: Formato de import para JavaScript/TypeScript
- **tokens.css**: CSS custom properties (light + dark)
- **tokens.tailwind.js**: Helper `@theme` do Tailwind v4
- **tokens.scss**: Formato de variáveis SCSS
- **token-coverage-report.txt**: Análise de cobertura
- **.state.yaml**: Atualizado com os metadados de tokens

### Formato de Saída

```yaml
# tokens.yaml (excerpt)
metadata:
  version: "1.0.0"
  generated_by: "Brad (Design System Architect)"
  generated_at: "2025-10-27T13:00:00Z"
  dtcg_spec: "2025.10"
  color_space: "oklch"

layers:
  core:
    color:
      "$type": "color"
      neutral-50:
        "$value": "oklch(0.97 0.01 235)"
      accent-primary:
        "$value": "oklch(0.59 0.19 238)"
    spacing:
      "$type": "dimension"
      base-unit:
        "$value": "4px"
      md:
        "$value": "16px"
  semantic:
    color:
      "$type": "color"
      background:
        "$value": "{layers.core.color.neutral-50}"
      foreground:
        "$value": "oklch(0.15 0.01 260)"
      primary:
        "$value": "{layers.core.color.accent-primary}"
      primary-hover:
        "$value": "oklch(0.52 0.19 238)"
  component:
    button:
      "$type": "object"
      primary:
        background:
          "$value": "{layers.semantic.color.primary}"
        text:
          "$value": "{layers.semantic.color.background}"
        padding-inline:
          "$value": "{layers.core.spacing.lg}"
```

## Critérios de Sucesso

- [ ] Todos os padrões consolidados convertidos em tokens em camadas
- [ ] A nomenclatura semântica segue as convenções (kebab-case & aliases)
- [ ] Estados de hover/disabled detectados automaticamente
- [ ] Todos os 6 formatos de exportação gerados com sucesso (YAML/JSON/CSS/Tailwind/SCSS/DTCG)
- [ ] Cobertura de tokens >95% dos padrões originais e paridade do modo dark registrada
- [ ] Cores expressas em OKLCH com fallbacks documentados
- [ ] A validação DTCG passa com zero avisos
- [ ] Arquivo de estado atualizado com localizações, status do validador, métricas de cobertura

## Tratamento de Erros

- **Sem dados de consolidação**: Sair com mensagem para rodar *consolidate primeiro
- **Padrões consolidados inválidos**: Registrar quais padrões falharam, continuar com os válidos
- **Erro de formato de exportação**: Validar a sintaxe, reportar erros, corrigir ou pular o formato
- **Cobertura baixa (<95%)**: Avisar o usuário, sugerir consolidação adicional
- **Validação DTCG falhou**: Fornecer a saída do validador, regenerar com referências corrigidas
- **Falta de suporte a OKLCH**: Documentar navegadores/restrições e capturar a justificativa do fallback

## Considerações de Segurança

- Validar valores de cor (apenas formatos hex, rgb, hsl)
- Sanitizar nomes de token (apenas alfanuméricos, hífens, underscores)
- Prevenir injeção de código nos arquivos exportados
- Validar a sintaxe YAML/JSON antes de gravar

## Exemplos

### Exemplo 1: Geração Completa de Tokens

```bash
*tokenize
```

Saída:
```
🔍 Brad: Extraindo tokens dos padrões consolidados...

🎨 Tokens de cor: 12 criados
📏 Tokens de espaçamento: 7 criados
📝 Tokens de tipografia: 10 criados
🔘 Tokens de variante de botão: 3 criados

📊 Cobertura de Tokens: 96.3% dos padrões originais

✅ Exportado para 5 formatos:
  - tokens.yaml (fonte da verdade)
  - tokens.json (JavaScript)
  - tokens.css (CSS custom properties)
  - tokens.tailwind.js (configuração do Tailwind)
  - tokens.scss (variáveis SCSS)

✅ Estado atualizado: outputs/design-system/my-app/.state.yaml

Pronto para o Atlas construir componentes ou gerar a estratégia de migração.
```

### Exemplo 2: Pré-visualização da Saída CSS

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #0066CC;
  --color-primary-dark: #0052A3;
  --color-error: #DC2626;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;

  /* Typography */
  --font-base: Inter, system-ui, sans-serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
}
```

## Notas

- tokens.yaml é a única fonte da verdade - todas as exportações são geradas a partir dele
- Nomenclatura semântica > nomenclatura descritiva (use "primary" e não "blue-500")
- Estados de hover são auto-detectados pelo sufixo "-dark"
- Cobertura <95% significa que alguns padrões não foram consolidados
- Os formatos de exportação permanecem sincronizados - atualize tokens.yaml e regenere todos
- Brad recomenda: Rode *migrate em seguida para criar a estratégia de migração
- Para geração de componentes, faça o handoff para o Atlas: *agent atlas
