---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Create Service

## Propósito

Criar um novo serviço usando templates Handlebars padronizados do WIS-10. Gera estruturas de serviço TypeScript consistentes, com configuração, testes e documentação adequados.

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createService()
agent: "@dev"
responsável: Dex (Developer)
responsavel_type: Agente
atomic_layer: Config

elicit: true

inputs:
  - name: service_name
    type: string
    required: true
    pattern: "^[a-z][a-z0-9-]*$"
    validation: Deve ser kebab-case, começar com letra

  - name: service_type
    type: enum
    options: ["api-integration", "utility", "agent-tool"]
    required: true
    default: "utility"

  - name: has_auth
    type: boolean
    required: false
    default: false

  - name: description
    type: string
    required: true
    validation: Não vazio, máximo de 200 caracteres

  - name: env_vars
    type: array
    required: false
    default: []

outputs:
  - name: service_directory
    type: directory
    location: ".aiox-core/infrastructure/services/{service_name}/"
    persistido: true

  - name: files_created
    type: array
    destino: Memory
    persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Templates do WIS-10 existem em .aiox-core/development/templates/service-template/
    tipo: pre-condition
    blocker: true
    validação: Verificar se o diretório de templates existe com os arquivos .hbs necessários
    error_message: "Templates não encontrados. Rode o WIS-10 primeiro."

  - [ ] Nome do serviço é único (nenhum serviço existente com o mesmo nome)
    tipo: pre-condition
    blocker: true
    validação: Verificar se .aiox-core/infrastructure/services/{name}/ não existe
    error_message: "Serviço '{name}' já existe. Escolha um nome diferente."

  - [ ] Nome do serviço segue o padrão kebab-case
    tipo: pre-condition
    blocker: true
    validação: Correspondência regex ^[a-z][a-z0-9-]*$
    error_message: "Nome inválido. Use kebab-case (ex.: my-api-service)"
```

---

## Processo de Elicitação Interativa

### Passo 1: Nome do Serviço
```
ELICIT: Nome do Serviço

Qual é o nome do serviço?
(Use kebab-case, ex.: "github-api", "file-processor", "auth-helper")

→ Validação: ^[a-z][a-z0-9-]*$
→ Verificação: Único (não existente)
→ Se inválido: Reapresentar prompt com mensagem de erro
```

### Passo 2: Tipo de Serviço
```
ELICIT: Tipo de Serviço

Que tipo de serviço é este?

1. api-integration - Cliente de API externa com rate limiting e autenticação
2. utility - Serviço auxiliar/utilitário interno
3. agent-tool - Ferramenta para agentes AIOX

→ Padrão: utility
→ Se api-integration: Habilitar a geração de client.ts
```

### Passo 3: Autenticação
```
ELICIT: Autenticação Necessária

Este serviço requer autenticação?

1. Sim - Incluir configuração de autenticação e cabeçalhos seguros
2. Não - Nenhuma autenticação necessária

→ Padrão: Não
→ Se Sim: Adicionar placeholders de autenticação à config
```

### Passo 4: Descrição
```
ELICIT: Descrição do Serviço

Breve descrição do serviço:
(Máximo de 200 caracteres, aparecerá no README e no JSDoc)

→ Validação: Não vazio, <= 200 caracteres
```

### Passo 5: Variáveis de Ambiente
```
ELICIT: Variáveis de Ambiente

Quais variáveis de ambiente este serviço precisa?
(Insira uma lista separada por vírgula, ou 'none')

Exemplos: API_KEY, BASE_URL, TIMEOUT_MS

→ Padrão: none
→ Parse: Dividir por vírgula, remover espaços em branco
→ Gerar: Entradas no .env.example
```

---

## Passos de Implementação

### Passo 0: Verificação de Duplicata por Code Intelligence (Pré-Scaffold)

Antes de fazer o scaffold do serviço, verifique se um serviço similar já existe usando code intelligence:

```javascript
// Verificação pré-scaffold de Code Intelligence (graciosa — nunca bloqueia)
const { isCodeIntelAvailable } = require('.aiox-core/core/code-intel');
const { checkBeforeWriting } = require('.aiox-core/core/code-intel/helpers/dev-helper');

if (isCodeIntelAvailable()) {
  const result = await checkBeforeWriting(serviceName, description);
  if (result) {
    // Exibir como aviso consultivo — NÃO bloqueia o scaffold
    console.log('⚠️  Code Intelligence Suggestion:');
    console.log(`   ${result.suggestion}`);
    console.log('   Consider REUSE or ADAPT before creating a new service.');
    // No modo interativo: solicitar ao usuário a confirmação para prosseguir
    // No modo YOLO: registrar em log e continuar
  }
}
// Se o code intelligence não estiver disponível: prosseguir normalmente (sem impacto)
```

### Passo 1: Validar Entradas
```javascript
// Validar service_name
const namePattern = /^[a-z][a-z0-9-]*$/;
if (!namePattern.test(serviceName)) {
  throw new Error(`Invalid service name: ${serviceName}. Use kebab-case.`);
}

// Verificar unicidade
const targetDir = `.aiox-core/infrastructure/services/${serviceName}/`;
if (fs.existsSync(targetDir)) {
  throw new Error(`Service '${serviceName}' already exists.`);
}
```

### Passo 2: Carregar Templates
```javascript
const templateDir = '.aiox-core/development/templates/service-template/';
const templates = [
  'README.md.hbs',
  'index.ts.hbs',
  'types.ts.hbs',
  'errors.ts.hbs',
  'package.json.hbs',
  'tsconfig.json',      // Estático (sem .hbs)
  'jest.config.js',     // Estático (sem .hbs)
  '__tests__/index.test.ts.hbs'
];

// Condicional: client.ts.hbs apenas para api-integration
if (serviceType === 'api-integration') {
  templates.push('client.ts.hbs');
}
```

### Passo 3: Preparar o Contexto do Template
```javascript
const context = {
  serviceName: serviceName,                    // kebab-case
  pascalCase: toPascalCase(serviceName),       // PascalCase
  camelCase: toCamelCase(serviceName),         // camelCase
  description: description,
  isApiIntegration: serviceType === 'api-integration',
  hasAuth: hasAuth,
  envVars: envVars.map(v => ({
    name: v,
    description: `${v} environment variable`
  })),
  storyId: 'WIS-11',
  createdAt: new Date().toISOString().split('T')[0]
};
```

### Passo 4: Gerar Arquivos
```javascript
// Criar o diretório alvo
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(`${targetDir}__tests__/`, { recursive: true });

// Processar cada template
for (const templateFile of templates) {
  const templatePath = `${templateDir}${templateFile}`;
  const isHandlebars = templateFile.endsWith('.hbs');

  // Determinar o nome do arquivo de saída
  const outputFile = isHandlebars
    ? templateFile.replace('.hbs', '')
    : templateFile;
  const outputPath = `${targetDir}${outputFile}`;

  if (isHandlebars) {
    // Renderizar o template Handlebars
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiled = Handlebars.compile(template);
    const content = compiled(context);
    fs.writeFileSync(outputPath, content);
  } else {
    // Copiar o arquivo estático
    fs.copyFileSync(templatePath, outputPath);
  }
}
```

### Passo 5: Pós-Geração
```bash
# Navegar até o diretório do serviço
cd .aiox-core/infrastructure/services/{service_name}/

# Instalar dependências
npm install

# Compilar o TypeScript
npm run build

# Rodar os testes
npm test
```

---

## Helpers Handlebars Necessários

Os seguintes helpers devem estar disponíveis:

```javascript
Handlebars.registerHelper('pascalCase', (str) => {
  return str.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
});

Handlebars.registerHelper('camelCase', (str) => {
  const pascal = str.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
});

Handlebars.registerHelper('kebabCase', (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
});

Handlebars.registerHelper('upperCase', (str) => {
  return str.toUpperCase().replace(/-/g, '_');
});
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Todos os arquivos de template gerados com sucesso
    tipo: post-condition
    blocker: true
    validação: Verificar se todos os arquivos esperados existem no diretório alvo

  - [ ] TypeScript compila sem erros
    tipo: post-condition
    blocker: false
    validação: Rodar npm run build, verificar o exit code

  - [ ] Testes passam
    tipo: post-condition
    blocker: false
    validação: Rodar npm test, verificar o exit code
```

---

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| Nome do serviço já existe | Diretório já presente | Solicitar um nome diferente |
| Template não encontrado | WIS-10 não instalado | Erro: "Rode o WIS-10 primeiro" |
| Falha no npm install | Problemas de rede/pacotes | Aviso, continuar sem dependências |
| Falha no build | Erros de TypeScript | Aviso, exibir erros, continuar |
| Formato de nome inválido | Nome não está em kebab-case | Reapresentar prompt com erro de validação |

**Estratégia de Recuperação de Erros:**
```javascript
// Geração atômica - rollback em caso de falha
try {
  generateAllFiles(targetDir, templates, context);
} catch (error) {
  // Limpar arquivos parciais
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  throw error;
}
```

---

## Performance

```yaml
duration_expected: 5-30s (excluindo npm install)
cost_estimated: $0.002-0.005
token_usage: ~1.000-2.000 tokens
```

---

## Saída de Sucesso

```
============================================
 SERVIÇO CRIADO COM SUCESSO
============================================

 Serviço: {service_name}
 Tipo: {service_type}
 Localização: .aiox-core/infrastructure/services/{service_name}/

 Arquivos Criados:
   README.md
   index.ts
   types.ts
   errors.ts
   client.ts (se api-integration)
   package.json
   tsconfig.json
   jest.config.js
   __tests__/index.test.ts

 Próximos Passos:
   1. cd .aiox-core/infrastructure/services/{service_name}
   2. Revisar o código gerado
   3. Implementar os métodos do serviço em index.ts
   4. Adicionar testes em __tests__/
   5. Atualizar as variáveis de ambiente conforme necessário

============================================
```

---

## Metadata

```yaml
story: WIS-11
version: 1.0.0
created: 2025-12-24
author: "@dev (Dex)"
dependencies:
  templates:
    - service-template/ (from WIS-10)
  tasks: []
tags:
  - service-generation
  - scaffolding
  - handlebars
  - typescript
```
