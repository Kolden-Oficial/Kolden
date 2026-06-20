# Export Design Tokens to W3C DTCG

> Task ID: brad-export-design-tokens-dtcg  
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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: exportDesignTokensDtcg()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: Entrada do Usuário
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memória
  persistido: false

- campo: logs
  tipo: array
  destino: Arquivo (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: Gestão de estado
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; exit code 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; exit code 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; exit code 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme o esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que a task foi concluída conforme o esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme o esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de átomos; implementar saídas antecipadas

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


## Descrição

Produzir exportações de Design Tokens W3C (DTCG v2025.10) a partir do arquivo canônico de tokens em YAML. Valida a conformidade com o schema, o uso de cores OKLCH e publica os artefatos para as plataformas downstream (web, iOS, Android, Flutter).

## Pré-requisitos

- tokens.yaml gerado via *tokenize (camadas core/semantic/component presentes)
- Node.js ≥ 18 / Python ≥ 3.10 (para as ferramentas de validação)
- DTCG CLI ou validador de schema instalado (`npm install -g @designtokens/cli` recomendado)

## Workflow

1. **Carregar os Tokens de Origem**
   - Ler `tokens.yaml` e confirmar os metadados (dtcg_spec, color_space)
   - Garantir que as camadas existam: `core`, `semantic`, `component`
   - Verificar cobertura >95% armazenada em `.state.yaml`

2. **Gerar o JSON DTCG**
   - Transformar o YAML na estrutura JSON DTCG
   - Garantir que cada token inclua `$type`, `$value`, e opcionalmente `$description`
   - Mapear as referências usando o estilo `{layers.semantic.color.primary}`
   - Salvar como `tokens.dtcg.json`

3. **Produzir Bundles por Plataforma (Opcional)**
   - Rodar o Style Dictionary / scripts customizados para saídas específicas de plataforma
   - Alvos: web (CSS), Android (XML), iOS (Swift), Flutter (Dart)
   - Armazenar em `tokens/exports/{platform}/`

4. **Validar**
   - `dtcg validate tokens.dtcg.json`
   - Fazer lint dos valores OKLCH (garantir o formato `oklch()`, sinalizar fallback para hex)
   - Confirmar que as referências resolvem (sem caminhos ausentes)

5. **Documentar e Publicar**
   - Atualizar `docs/tokens/README.md` com detalhes da exportação, versão, changelog
   - Anexar a saída do validador e as métricas de cobertura
   - Atualizar `.state.yaml` (caminho de tokens.dtcg, status do validador, timestamp)

## Saída

- `tokens.dtcg.json` (compatível com W3C)
- Bundles de plataforma opcionais (CSS, Android XML, Swift, Flutter)
- Relatório de validação (`tokens/validation/dtcg-report.json`)
- Seção de tokens atualizada em `.state.yaml`

## Critérios de Sucesso

- [ ] tokens.dtcg.json passa no validador W3C com zero erros
- [ ] Espaço de cor OKLCH utilizado; fallbacks documentados
- [ ] Referências (`$value`) resolvem entre as camadas
- [ ] Exportações de plataforma atualizadas (se habilitadas) e testadas com smoke test
- [ ] Documentação + changelog atualizados com versão/data
- [ ] `.state.yaml` reflete o caminho e o status da exportação dtcg

## Tratamento de Erros

- **Schema inválido**: Capturar a saída do validador, corrigir os tokens problemáticos, reexecutar a exportação
- **Referência ausente**: Rastrear a origem no YAML, garantir que o token existe ou ajustar o alias
- **Formato de cor não suportado**: Converter para OKLCH ou usar fallback com explicação
- **Falha na exportação de plataforma**: Reverter a etapa específica da plataforma, sinalizar ação de follow-up

## Notas

- Manter as versões dos tokens com versionamento semântico (ex.: 1.1.0 para novos tokens)
- Coordenar com as equipes de plataforma antes de breaking changes (ex.: renomear tokens)
- Armazenar os relatórios de validação junto aos artefatos para auditoria/conformidade
