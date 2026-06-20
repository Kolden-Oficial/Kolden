---
tools:
  - github-cli
# TODO: Create test-suite-checklist.md for validation (follow-up story needed)
# checklists:
#   - test-suite-checklist.md
---

# Task: Create Component Suite

**Agente:** aiox-developer  
**Versão:** 1.0  
**Comando:** *create-suite

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
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
task: createSuite()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: name
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser não-vazio, minúsculas, kebab-case

- campo: options
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Objeto JSON válido com chaves permitidas

- campo: force
  tipo: boolean
  origem: Entrada do Usuário
  obrigatório: false
  validação: Padrão: false

**Saída:**
- campo: created_file
  tipo: string
  destino: Sistema de arquivos
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memória
  persistido: false

- campo: success
  tipo: boolean
  destino: Valor de retorno
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    error_message: "Pré-condição falhou: Alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validação aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que recurso criado com sucesso; validação aprovada; nenhum erro registrado
    error_message: "Pós-condição falhou: Recurso criado com sucesso; validação aprovada; nenhum erro registrado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Recurso existe e é válido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que recurso existe e é válido; nenhum recurso duplicado criado
    error_message: "Critério de aceite não atendido: Recurso existe e é válido; nenhum recurso duplicado criado"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Fonte:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Fonte:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** Arquivo/recurso alvo já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** Nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro, notificar o usuário, sugerir correção de permissão

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
  - creation
  - setup
updated_at: 2025-11-17
```

---


## Descrição
Cria múltiplos componentes relacionados em uma única operação em lote com resolução de dependências e suporte a transações.

## Contexto Necessário
- Entendimento da estrutura do projeto
- Relacionamentos entre componentes
- Componentes existentes para resolução de dependências

## Pré-requisitos
- O agente aiox-developer está ativo
- O sistema de templates está configurado
- team-manifest.yaml existe

## Elicitação Interativa
1. Seleção do tipo de suíte (pacote de agente, suíte de workflow, coleção de tasks, customizado)
2. Configuração de componentes com base no tipo de suíte
3. Validação de dependências
4. Prévia de todos os componentes a serem criados
5. Confirmação antes da criação em lote

## Passos do Workflow

### 1. Seleção do Tipo de Suíte
- **Ação:** Escolher entre tipos de suíte predefinidos ou customizado
- **Validação:** Garantir que o tipo de suíte é suportado

### 2. Configurar Componentes
- **Ação:** Coletar a configuração para cada componente da suíte
- **Validação:** Validar convenções de nomenclatura e dependências

### 3. Analisar Dependências
- **Ação:** Construir o grafo de dependências entre os componentes
- **Validação:** Verificar dependências circulares

### 4. Prévia da Suíte
- **Ação:** Exibir a prévia de todos os componentes a serem criados
- **Validação:** Confirmação do usuário obrigatória

### 5. Criar Componentes
- **Ação:** Criar os componentes na ordem de dependência
- **Validação:** Cada componente deve ser criado com sucesso

### 6. Atualizar Manifesto
- **Ação:** Atualizar o team-manifest.yaml com todos os novos componentes
- **Validação:** O manifesto deve permanecer um YAML válido

## Tratamento de Erros
- **Dependências Ausentes:** Solicitar a criação ou a seleção de uma existente
- **Conflitos de Nome:** Exibir componentes existentes e sugerir alternativas
- **Falhas de Criação:** Oferecer rollback da transação inteira
- **Erros de Manifesto:** Exibir o diff e permitir correção manual

## Saída
- Status de sucesso/falha para cada componente
- ID da transação para potencial rollback
- Manifesto atualizado com todos os novos componentes
- Resumo dos arquivos criados e suas localizações

## Considerações de Segurança
- Todo código gerado é validado pelo SecurityChecker
- Os caminhos de arquivo são sanitizados para prevenir traversal
- O log de transação é protegido contra escrita

## Notas
- Suporta criação atômica (tudo ou nada)
- O log de transação habilita a funcionalidade de rollback
- A resolução de dependências garante a ordem correta de criação

## Handoff
next_agent: @dev
next_command: *run-tests
condition: Suíte de testes criada, pronta para execução
alternatives:
  - agent: @qa, command: *review {story-id}, condition: Testes escritos como parte da revisão
- A funcionalidade de prévia ajuda a evitar erros 