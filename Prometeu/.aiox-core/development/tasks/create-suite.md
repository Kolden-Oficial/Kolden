---
tools:
  - github-cli
# TODO: Create test-suite-checklist.md for validation (follow-up story needed)
# checklists:
#   - test-suite-checklist.md
---

# Task: Criar SuÃ­te de Componentes

**Agente:** aiox-developer  
**VersÃ£o:** 1.0  
**Comando:** *create-suite

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com logging
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createSuite()
responsÃ¡vel: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: name
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser nÃ£o-vazio, minÃºsculas, kebab-case

- campo: options
  tipo: object
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: Objeto JSON vÃ¡lido com chaves permitidas

- campo: force
  tipo: boolean
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: PadrÃ£o: false

**SaÃ­da:**
- campo: created_file
  tipo: string
  destino: Sistema de arquivos
  persistido: true

- campo: validation_report
  tipo: object
  destino: MemÃ³ria
  persistido: false

- campo: success
  tipo: boolean
  destino: Valor de retorno
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas
    error_message: "PrÃ©-condiÃ§Ã£o falhou: Alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a task ser concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de pass/fail para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirmar que recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado
    error_message: "CritÃ©rio de aceite nÃ£o atendido: Recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **PropÃ³sito:** Gerar novos componentes a partir de templates
  - **Fonte:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **PropÃ³sito:** CriaÃ§Ã£o e validaÃ§Ã£o de arquivos
  - **Fonte:** MÃ³dulo fs do Node.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** create-component.js
  - **PropÃ³sito:** Workflow de criaÃ§Ã£o de componentes
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Recurso JÃ¡ Existe
   - **Causa:** Arquivo/recurso alvo jÃ¡ existe no sistema
   - **ResoluÃ§Ã£o:** Use a flag force ou escolha um nome diferente
   - **RecuperaÃ§Ã£o:** Solicitar ao usuÃ¡rio um nome alternativo ou forÃ§ar sobrescrita

2. **Erro:** Entrada InvÃ¡lida
   - **Causa:** Nome de entrada contÃ©m caracteres ou formato invÃ¡lidos
   - **ResoluÃ§Ã£o:** Validar a entrada contra as regras de nomenclatura (kebab-case, minÃºsculas, sem caracteres especiais)
   - **RecuperaÃ§Ã£o:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** PermissÃ£o Negada
   - **Causa:** PermissÃµes insuficientes para criar o recurso
   - **ResoluÃ§Ã£o:** Verificar permissÃµes do sistema de arquivos, executar com privilÃ©gios elevados se necessÃ¡rio
   - **RecuperaÃ§Ã£o:** Registrar o erro, notificar o usuÃ¡rio, sugerir correÃ§Ã£o de permissÃ£o

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Paralelizar operaÃ§Ãµes independentes; reutilizar resultados de Ã¡tomos; implementar saÃ­das antecipadas

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


## DescriÃ§Ã£o
Cria mÃºltiplos componentes relacionados em uma Ãºnica operaÃ§Ã£o em lote com resoluÃ§Ã£o de dependÃªncias e suporte a transaÃ§Ãµes.

## Contexto NecessÃ¡rio
- Entendimento da estrutura do projeto
- Relacionamentos entre componentes
- Componentes existentes para resoluÃ§Ã£o de dependÃªncias

## PrÃ©-requisitos
- O agente aiox-developer estÃ¡ ativo
- O sistema de templates estÃ¡ configurado
- team-manifest.yaml existe

## ElicitaÃ§Ã£o Interativa
1. SeleÃ§Ã£o do tipo de suÃ­te (pacote de agente, suÃ­te de workflow, coleÃ§Ã£o de tasks, customizado)
2. ConfiguraÃ§Ã£o de componentes com base no tipo de suÃ­te
3. ValidaÃ§Ã£o de dependÃªncias
4. PrÃ©via de todos os componentes a serem criados
5. ConfirmaÃ§Ã£o antes da criaÃ§Ã£o em lote

## Passos do Workflow

### 1. SeleÃ§Ã£o do Tipo de SuÃ­te
- **AÃ§Ã£o:** Escolher entre tipos de suÃ­te predefinidos ou customizado
- **ValidaÃ§Ã£o:** Garantir que o tipo de suÃ­te Ã© suportado

### 2. Configurar Componentes
- **AÃ§Ã£o:** Coletar a configuraÃ§Ã£o para cada componente da suÃ­te
- **ValidaÃ§Ã£o:** Validar convenÃ§Ãµes de nomenclatura e dependÃªncias

### 3. Analisar DependÃªncias
- **AÃ§Ã£o:** Construir o grafo de dependÃªncias entre os componentes
- **ValidaÃ§Ã£o:** Verificar dependÃªncias circulares

### 4. PrÃ©via da SuÃ­te
- **AÃ§Ã£o:** Exibir a prÃ©via de todos os componentes a serem criados
- **ValidaÃ§Ã£o:** ConfirmaÃ§Ã£o do usuÃ¡rio obrigatÃ³ria

### 5. Criar Componentes
- **AÃ§Ã£o:** Criar os componentes na ordem de dependÃªncia
- **ValidaÃ§Ã£o:** Cada componente deve ser criado com sucesso

### 6. Atualizar Manifesto
- **AÃ§Ã£o:** Atualizar o team-manifest.yaml com todos os novos componentes
- **ValidaÃ§Ã£o:** O manifesto deve permanecer um YAML vÃ¡lido

## Tratamento de Erros
- **DependÃªncias Ausentes:** Solicitar a criaÃ§Ã£o ou a seleÃ§Ã£o de uma existente
- **Conflitos de Nome:** Exibir componentes existentes e sugerir alternativas
- **Falhas de CriaÃ§Ã£o:** Oferecer rollback da transaÃ§Ã£o inteira
- **Erros de Manifesto:** Exibir o diff e permitir correÃ§Ã£o manual

## SaÃ­da
- Status de sucesso/falha para cada componente
- ID da transaÃ§Ã£o para potencial rollback
- Manifesto atualizado com todos os novos componentes
- Resumo dos arquivos criados e suas localizaÃ§Ãµes

## ConsideraÃ§Ãµes de SeguranÃ§a
- Todo cÃ³digo gerado Ã© validado pelo SecurityChecker
- Os caminhos de arquivo sÃ£o sanitizados para prevenir traversal
- O log de transaÃ§Ã£o Ã© protegido contra escrita

## Notas
- Suporta criaÃ§Ã£o atÃ´mica (tudo ou nada)
- O log de transaÃ§Ã£o habilita a funcionalidade de rollback
- A resoluÃ§Ã£o de dependÃªncias garante a ordem correta de criaÃ§Ã£o

## Handoff
next_agent: @dev
next_command: *run-tests
condition: SuÃ­te de testes criada, pronta para execuÃ§Ã£o
alternatives:
  - agent: @qa, command: *review {story-id}, condition: Testes escritos como parte da revisÃ£o
- A funcionalidade de prÃ©via ajuda a evitar erros 