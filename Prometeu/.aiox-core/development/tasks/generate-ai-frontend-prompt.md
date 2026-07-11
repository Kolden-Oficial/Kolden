---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento PrÃ©-Voo - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da tarefa (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: generateAiFrontendPrompt()
responsÃ¡vel: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatÃ³rio: true
  validaÃ§Ã£o: Must be non-empty, lowercase, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Valid JSON object with allowed keys

- campo: force
  tipo: boolean
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Default: false

**SaÃ­da:**
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

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target does not already exist; required inputs provided; permissions granted
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a conclusÃ£o da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Resource created successfully; validation passed; no errors logged
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para conclusÃ£o da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Resource exists and is valid; no duplicate resources created
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** component-generator
  - **PropÃ³sito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Tool:** file-system
  - **PropÃ³sito:** CriaÃ§Ã£o e validaÃ§Ã£o de arquivos
  - **Origem:** MÃ³dulo fs do Node.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta tarefa:**

- **Script:** create-component.js
  - **PropÃ³sito:** Workflow de criaÃ§Ã£o de componentes
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Recurso JÃ¡ Existe
   - **Causa:** O arquivo/recurso de destino jÃ¡ existe no sistema
   - **ResoluÃ§Ã£o:** Use a flag force ou escolha um nome diferente
   - **RecuperaÃ§Ã£o:** Solicite ao usuÃ¡rio um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada InvÃ¡lida
   - **Causa:** O nome de entrada contÃ©m caracteres ou formato invÃ¡lidos
   - **ResoluÃ§Ã£o:** Valide a entrada contra as regras de nomenclatura (kebab-case, minÃºsculas, sem caracteres especiais)
   - **RecuperaÃ§Ã£o:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** PermissÃ£o Negada
   - **Causa:** PermissÃµes insuficientes para criar o recurso
   - **ResoluÃ§Ã£o:** Verifique as permissÃµes do sistema de arquivos, execute com privilÃ©gios elevados se necessÃ¡rio
   - **RecuperaÃ§Ã£o:** Registre o erro, notifique o usuÃ¡rio, sugira a correÃ§Ã£o de permissÃ£o

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Cache da compilaÃ§Ã£o de templates; minimize transformaÃ§Ãµes de dados; carregue recursos sob demanda

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

# Nenhum checklist necessÃ¡rio - esta tarefa gera prompts, a validaÃ§Ã£o estÃ¡ embutida na metodologia de geraÃ§Ã£o de prompts
tools:
  - github-cli
  - context7
---

# Tarefa Criar Prompt de Frontend com IA

## PropÃ³sito

Gerar um prompt magistral, abrangente e otimizado que possa ser usado com qualquer ferramenta de desenvolvimento frontend orientada por IA (ex.: Vercel v0, Lovable.ai ou similar) para fazer o scaffold ou gerar partes significativas de uma aplicaÃ§Ã£o frontend.

## Entradas

- EspecificaÃ§Ã£o de UI/UX concluÃ­da (`front-end-spec.md`)
- Documento de Arquitetura de Frontend concluÃ­do (`front-end-architecture`) ou uma arquitetura combinada full stack, como `architecture.md`
- Documento de Arquitetura Principal do Sistema (`architecture` - para contratos de API e tech stack para dar mais contexto)

## Atividades e InstruÃ§Ãµes Principais

### 1. PrincÃ­pios Centrais de Prompting

Antes de gerar o prompt, vocÃª deve entender estes princÃ­pios centrais para interagir com uma IA generativa de cÃ³digo.

- **Seja ExplÃ­cito e Detalhado**: A IA nÃ£o consegue ler sua mente. ForneÃ§a o mÃ¡ximo de detalhe e contexto possÃ­vel. SolicitaÃ§Ãµes vagas levam a saÃ­das genÃ©ricas ou incorretas.
- **Itere, NÃ£o Espere PerfeiÃ§Ã£o**: Gerar uma aplicaÃ§Ã£o complexa inteira de uma sÃ³ vez Ã© raro. O mÃ©todo mais eficaz Ã© solicitar um componente ou uma seÃ§Ã£o por vez e, entÃ£o, construir sobre os resultados.
- **ForneÃ§a Contexto Primeiro**: Sempre comece fornecendo Ã  IA o contexto necessÃ¡rio, como o tech stack, trechos de cÃ³digo existentes e os objetivos gerais do projeto.
- **Abordagem Mobile-First**: Enquadre todas as solicitaÃ§Ãµes de geraÃ§Ã£o de UI com uma mentalidade de design mobile-first. Descreva primeiro o layout mobile e, entÃ£o, forneÃ§a instruÃ§Ãµes separadas sobre como ele deve se adaptar para tablet e desktop.

### 2. O Framework de Prompting Estruturado

Para garantir a saÃ­da da mais alta qualidade, vocÃª DEVE estruturar todo prompt usando o seguinte framework de quatro partes.

1. **Objetivo de Alto NÃ­vel**: Comece com um resumo claro e conciso do objetivo geral. Isto orienta a IA quanto Ã  tarefa principal.
   - _Exemplo: "Crie um formulÃ¡rio de cadastro de usuÃ¡rio responsivo com validaÃ§Ã£o no lado do cliente e integraÃ§Ã£o com API."_
2. **InstruÃ§Ãµes Detalhadas, Passo a Passo**: ForneÃ§a uma lista numerada e granular das aÃ§Ãµes que a IA deve tomar. Decomponha tarefas complexas em passos menores e sequenciais. Esta Ã© a parte mais crÃ­tica do prompt.
   - _Exemplo: "1. Crie um novo arquivo chamado `RegistrationForm.js`. 2. Use React hooks para o gerenciamento de estado. 3. Adicione campos de input estilizados para 'Nome', 'Email' e 'Senha'. 4. Para o campo de email, garanta que seja um formato de email vÃ¡lido. 5. No envio, chame o endpoint da API definido abaixo."_
3. **Exemplos de CÃ³digo, Estruturas de Dados e RestriÃ§Ãµes**: Inclua quaisquer trechos relevantes de cÃ³digo existente, estruturas de dados ou contratos de API. Isto dÃ¡ Ã  IA exemplos concretos para trabalhar. Crucialmente, vocÃª tambÃ©m deve declarar o que _nÃ£o_ fazer.
   - _Exemplo: "Use este endpoint de API: `POST /api/register`. O payload JSON esperado Ã© `{ "name": "string", "email": "string", "password": "string" }`. NÃƒO inclua um campo de 'confirmar senha'. Use Tailwind CSS para toda a estilizaÃ§Ã£o."_
4. **Defina um Escopo Estrito**: Defina explicitamente os limites da tarefa. Diga Ã  IA quais arquivos ela pode modificar e, mais importante, quais arquivos deixar intocados para evitar mudanÃ§as nÃ£o intencionais em toda a base de cÃ³digo.
   - _Exemplo: "VocÃª deve criar apenas o componente `RegistrationForm.js` e adicionÃ¡-lo ao arquivo `pages/register.js`. NÃƒO altere o componente `Navbar.js` nem qualquer outra pÃ¡gina ou componente existente."_

### 3. Montando o Prompt Mestre

Agora vocÃª vai sintetizar as entradas e os princÃ­pios acima em um prompt final e abrangente.

1. **Reunir Contexto Fundamental**:
   - Inicie o prompt com um preÃ¢mbulo descrevendo o propÃ³sito geral do projeto, o tech stack completo (ex.: Next.js, TypeScript, Tailwind CSS) e a principal biblioteca de componentes de UI em uso.
2. **Descrever os Visuais**:
   - Se o usuÃ¡rio tiver arquivos de design (Figma, etc.), instrua-o a fornecer links ou screenshots.
   - Se nÃ£o, descreva o estilo visual: paleta de cores, tipografia, espaÃ§amento e a estÃ©tica geral (ex.: "minimalista", "corporativo", "lÃºdico").
3. **Construir o Prompt usando o Framework Estruturado**:
   - Siga o framework de quatro partes da SeÃ§Ã£o 2 para elaborar a solicitaÃ§Ã£o principal, seja para um Ãºnico componente ou para uma pÃ¡gina completa.
4. **Apresentar e Refinar**:
   - Produza o prompt completo e gerado em um formato claro e pronto para copiar e colar (ex.: um grande bloco de cÃ³digo).
   - Explique a estrutura do prompt e por que certas informaÃ§Ãµes foram incluÃ­das, referenciando os princÃ­pios acima.
   - <important_note>Conclua lembrando o usuÃ¡rio de que todo cÃ³digo gerado por IA exigirÃ¡ revisÃ£o humana cuidadosa, testes e refinamento para ser considerado pronto para produÃ§Ã£o.</important_note>
