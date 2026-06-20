---

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

## Task Definition (AIOX Task Format V1.0)

```yaml
task: generateAiFrontendPrompt()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be non-empty, lowercase, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid JSON object with allowed keys

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false

**Saída:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target does not already exist; required inputs provided; permissions granted
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Resource created successfully; validation passed; no errors logged
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Resource exists and is valid; no duplicate resources created
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Tool:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicite ao usuário um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Valide a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verifique as permissões do sistema de arquivos, execute com privilégios elevados se necessário
   - **Recuperação:** Registre o erro, notifique o usuário, sugira a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cache da compilação de templates; minimize transformações de dados; carregue recursos sob demanda

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

# Nenhum checklist necessário - esta tarefa gera prompts, a validação está embutida na metodologia de geração de prompts
tools:
  - github-cli
  - context7
---

# Tarefa Criar Prompt de Frontend com IA

## Propósito

Gerar um prompt magistral, abrangente e otimizado que possa ser usado com qualquer ferramenta de desenvolvimento frontend orientada por IA (ex.: Vercel v0, Lovable.ai ou similar) para fazer o scaffold ou gerar partes significativas de uma aplicação frontend.

## Entradas

- Especificação de UI/UX concluída (`front-end-spec.md`)
- Documento de Arquitetura de Frontend concluído (`front-end-architecture`) ou uma arquitetura combinada full stack, como `architecture.md`
- Documento de Arquitetura Principal do Sistema (`architecture` - para contratos de API e tech stack para dar mais contexto)

## Atividades e Instruções Principais

### 1. Princípios Centrais de Prompting

Antes de gerar o prompt, você deve entender estes princípios centrais para interagir com uma IA generativa de código.

- **Seja Explícito e Detalhado**: A IA não consegue ler sua mente. Forneça o máximo de detalhe e contexto possível. Solicitações vagas levam a saídas genéricas ou incorretas.
- **Itere, Não Espere Perfeição**: Gerar uma aplicação complexa inteira de uma só vez é raro. O método mais eficaz é solicitar um componente ou uma seção por vez e, então, construir sobre os resultados.
- **Forneça Contexto Primeiro**: Sempre comece fornecendo à IA o contexto necessário, como o tech stack, trechos de código existentes e os objetivos gerais do projeto.
- **Abordagem Mobile-First**: Enquadre todas as solicitações de geração de UI com uma mentalidade de design mobile-first. Descreva primeiro o layout mobile e, então, forneça instruções separadas sobre como ele deve se adaptar para tablet e desktop.

### 2. O Framework de Prompting Estruturado

Para garantir a saída da mais alta qualidade, você DEVE estruturar todo prompt usando o seguinte framework de quatro partes.

1. **Objetivo de Alto Nível**: Comece com um resumo claro e conciso do objetivo geral. Isto orienta a IA quanto à tarefa principal.
   - _Exemplo: "Crie um formulário de cadastro de usuário responsivo com validação no lado do cliente e integração com API."_
2. **Instruções Detalhadas, Passo a Passo**: Forneça uma lista numerada e granular das ações que a IA deve tomar. Decomponha tarefas complexas em passos menores e sequenciais. Esta é a parte mais crítica do prompt.
   - _Exemplo: "1. Crie um novo arquivo chamado `RegistrationForm.js`. 2. Use React hooks para o gerenciamento de estado. 3. Adicione campos de input estilizados para 'Nome', 'Email' e 'Senha'. 4. Para o campo de email, garanta que seja um formato de email válido. 5. No envio, chame o endpoint da API definido abaixo."_
3. **Exemplos de Código, Estruturas de Dados e Restrições**: Inclua quaisquer trechos relevantes de código existente, estruturas de dados ou contratos de API. Isto dá à IA exemplos concretos para trabalhar. Crucialmente, você também deve declarar o que _não_ fazer.
   - _Exemplo: "Use este endpoint de API: `POST /api/register`. O payload JSON esperado é `{ "name": "string", "email": "string", "password": "string" }`. NÃO inclua um campo de 'confirmar senha'. Use Tailwind CSS para toda a estilização."_
4. **Defina um Escopo Estrito**: Defina explicitamente os limites da tarefa. Diga à IA quais arquivos ela pode modificar e, mais importante, quais arquivos deixar intocados para evitar mudanças não intencionais em toda a base de código.
   - _Exemplo: "Você deve criar apenas o componente `RegistrationForm.js` e adicioná-lo ao arquivo `pages/register.js`. NÃO altere o componente `Navbar.js` nem qualquer outra página ou componente existente."_

### 3. Montando o Prompt Mestre

Agora você vai sintetizar as entradas e os princípios acima em um prompt final e abrangente.

1. **Reunir Contexto Fundamental**:
   - Inicie o prompt com um preâmbulo descrevendo o propósito geral do projeto, o tech stack completo (ex.: Next.js, TypeScript, Tailwind CSS) e a principal biblioteca de componentes de UI em uso.
2. **Descrever os Visuais**:
   - Se o usuário tiver arquivos de design (Figma, etc.), instrua-o a fornecer links ou screenshots.
   - Se não, descreva o estilo visual: paleta de cores, tipografia, espaçamento e a estética geral (ex.: "minimalista", "corporativo", "lúdico").
3. **Construir o Prompt usando o Framework Estruturado**:
   - Siga o framework de quatro partes da Seção 2 para elaborar a solicitação principal, seja para um único componente ou para uma página completa.
4. **Apresentar e Refinar**:
   - Produza o prompt completo e gerado em um formato claro e pronto para copiar e colar (ex.: um grande bloco de código).
   - Explique a estrutura do prompt e por que certas informações foram incluídas, referenciando os princípios acima.
   - <important_note>Conclua lembrando o usuário de que todo código gerado por IA exigirá revisão humana cuidadosa, testes e refinamento para ser considerado pronto para produção.</important_note>
