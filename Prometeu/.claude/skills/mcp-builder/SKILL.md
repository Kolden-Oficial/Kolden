---
name: mcp-builder
description: Guia para criar servidores MCP (Model Context Protocol) de alta qualidade que permitem que LLMs interajam com serviços externos por meio de tools bem projetadas. Use ao construir servidores MCP para integrar APIs ou serviços externos, seja em Python (FastMCP) ou Node/TypeScript (MCP SDK).
license: Termos completos em LICENSE.txt
---

# Guia de Desenvolvimento de Servidores MCP

## Visão Geral

Para criar servidores MCP (Model Context Protocol) de alta qualidade que permitam que LLMs interajam efetivamente com serviços externos, use esta skill. Um servidor MCP fornece tools que permitem que LLMs acessem serviços e APIs externos. A qualidade de um servidor MCP é medida por quão bem ele permite que LLMs realizem tarefas do mundo real usando as tools fornecidas.

---

# Processo

## 🚀 Fluxo de Trabalho de Alto Nível

Criar um servidor MCP de alta qualidade envolve quatro fases principais:

### Fase 1: Pesquisa Profunda e Planejamento

#### 1.1 Entenda os Princípios de Design Centrado em Agentes

Antes de mergulhar na implementação, entenda como projetar tools para agentes de IA revisando estes princípios:

**Construa para Fluxos de Trabalho, Não Apenas Endpoints de API:**
- Não se limite a empacotar endpoints de API existentes — construa tools de fluxo de trabalho pensadas e de alto impacto
- Consolide operações relacionadas (ex: `schedule_event` que tanto verifica disponibilidade quanto cria o evento)
- Foque em tools que permitam tarefas completas, não apenas chamadas de API individuais
- Considere quais fluxos de trabalho os agentes realmente precisam realizar

**Otimize para Contexto Limitado:**
- Agentes têm janelas de contexto restritas — faça cada token contar
- Retorne informação de alto sinal, não despejos exaustivos de dados
- Forneça opções de formato de resposta "concise" vs "detailed"
- Prefira identificadores legíveis por humanos a códigos técnicos (nomes em vez de IDs)
- Considere o orçamento de contexto do agente como um recurso escasso

**Projete Mensagens de Erro Acionáveis:**
- Mensagens de erro devem guiar os agentes em direção a padrões de uso corretos
- Sugira próximos passos específicos: "Try using filter='active_only' to reduce results"
- Faça os erros serem educativos, não apenas diagnósticos
- Ajude os agentes a aprender o uso correto das tools por meio de feedback claro

**Siga as Subdivisões Naturais de Tarefas:**
- Nomes de tools devem refletir como humanos pensam sobre tarefas
- Agrupe tools relacionadas com prefixos consistentes para facilitar a descoberta
- Projete tools em torno de fluxos de trabalho naturais, não apenas da estrutura da API

**Use Desenvolvimento Orientado por Avaliação:**
- Crie cenários de avaliação realistas cedo
- Deixe o feedback do agente direcionar as melhorias das tools
- Prototipe rapidamente e itere com base no desempenho real do agente

#### 1.3 Estude a Documentação do Protocolo MCP

**Busque a documentação mais recente do protocolo MCP:**

Use WebFetch para carregar: `https://modelcontextprotocol.io/llms-full.txt`

Este documento abrangente contém a especificação completa do MCP e as diretrizes.

#### 1.4 Estude a Documentação dos Frameworks

**Carregue e leia os seguintes arquivos de referência:**

- **Boas Práticas de MCP**: [📋 Ver Boas Práticas](./reference/mcp_best_practices.md) - Diretrizes centrais para todos os servidores MCP

**Para implementações em Python, carregue também:**
- **Documentação do Python SDK**: Use WebFetch para carregar `https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`
- [🐍 Guia de Implementação em Python](./reference/python_mcp_server.md) - Boas práticas e exemplos específicos de Python

**Para implementações em Node/TypeScript, carregue também:**
- **Documentação do TypeScript SDK**: Use WebFetch para carregar `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`
- [⚡ Guia de Implementação em TypeScript](./reference/node_mcp_server.md) - Boas práticas e exemplos específicos de Node/TypeScript

#### 1.5 Estude Exaustivamente a Documentação da API

Para integrar um serviço, leia **TODA** a documentação de API disponível:
- Documentação de referência oficial da API
- Requisitos de autenticação e autorização
- Padrões de rate limiting e paginação
- Respostas de erro e códigos de status
- Endpoints disponíveis e seus parâmetros
- Modelos de dados e schemas

**Para reunir informação abrangente, use busca na web e a tool WebFetch conforme necessário.**

#### 1.6 Crie um Plano de Implementação Abrangente

Com base em sua pesquisa, crie um plano detalhado que inclua:

**Seleção de Tools:**
- Liste os endpoints/operações mais valiosos a implementar
- Priorize tools que permitam os casos de uso mais comuns e importantes
- Considere quais tools funcionam em conjunto para permitir fluxos de trabalho complexos

**Utilitários e Helpers Compartilhados:**
- Identifique padrões comuns de requisição de API
- Planeje helpers de paginação
- Projete utilitários de filtragem e formatação
- Planeje estratégias de tratamento de erros

**Design de Entrada/Saída:**
- Defina modelos de validação de entrada (Pydantic para Python, Zod para TypeScript)
- Projete formatos de resposta consistentes (ex: JSON ou Markdown) e níveis configuráveis de detalhe (ex: Detailed ou Concise)
- Planeje para uso em larga escala (milhares de usuários/recursos)
- Implemente limites de caracteres e estratégias de truncamento (ex: 25.000 tokens)

**Estratégia de Tratamento de Erros:**
- Planeje modos de falha graciosos
- Projete mensagens de erro claras, acionáveis, amigáveis para LLM e em linguagem natural que estimulem ação adicional
- Considere cenários de rate limiting e timeout
- Trate erros de autenticação e autorização

---

### Fase 2: Implementação

Agora que você tem um plano abrangente, comece a implementação seguindo as boas práticas específicas de cada linguagem.

#### 2.1 Configure a Estrutura do Projeto

**Para Python:**
- Crie um único arquivo `.py` ou organize em módulos se for complexo (veja o [🐍 Guia Python](./reference/python_mcp_server.md))
- Use o MCP Python SDK para registro de tools
- Defina modelos Pydantic para validação de entrada

**Para Node/TypeScript:**
- Crie uma estrutura de projeto adequada (veja o [⚡ Guia TypeScript](./reference/node_mcp_server.md))
- Configure `package.json` e `tsconfig.json`
- Use o MCP TypeScript SDK
- Defina schemas Zod para validação de entrada

#### 2.2 Implemente a Infraestrutura Central Primeiro

**Para começar a implementação, crie utilitários compartilhados antes de implementar tools:**
- Funções helper de requisição de API
- Utilitários de tratamento de erros
- Funções de formatação de resposta (JSON e Markdown)
- Helpers de paginação
- Gerenciamento de autenticação/token

#### 2.3 Implemente as Tools Sistematicamente

Para cada tool no plano:

**Defina o Schema de Entrada:**
- Use Pydantic (Python) ou Zod (TypeScript) para validação
- Inclua restrições apropriadas (comprimento mín/máx, padrões regex, valores mín/máx, faixas)
- Forneça descrições de campo claras e descritivas
- Inclua exemplos diversos nas descrições dos campos

**Escreva Docstrings/Descrições Abrangentes:**
- Resumo de uma linha do que a tool faz
- Explicação detalhada do propósito e da funcionalidade
- Tipos de parâmetros explícitos com exemplos
- Schema completo do tipo de retorno
- Exemplos de uso (quando usar, quando não usar)
- Documentação de tratamento de erros, que descreva como proceder diante de erros específicos

**Implemente a Lógica da Tool:**
- Use utilitários compartilhados para evitar duplicação de código
- Siga padrões async/await para toda E/S
- Implemente tratamento de erros adequado
- Suporte múltiplos formatos de resposta (JSON e Markdown)
- Respeite parâmetros de paginação
- Verifique limites de caracteres e trunque apropriadamente

**Adicione Annotations à Tool:**
- `readOnlyHint`: true (para operações somente leitura)
- `destructiveHint`: false (para operações não destrutivas)
- `idempotentHint`: true (se chamadas repetidas têm o mesmo efeito)
- `openWorldHint`: true (se interage com sistemas externos)

#### 2.4 Siga as Boas Práticas Específicas da Linguagem

**Neste ponto, carregue o guia da linguagem apropriada:**

**Para Python: Carregue o [🐍 Guia de Implementação em Python](./reference/python_mcp_server.md) e garanta o seguinte:**
- Usar o MCP Python SDK com registro de tools adequado
- Modelos Pydantic v2 com `model_config`
- Type hints por toda parte
- Async/await para todas as operações de E/S
- Organização adequada de imports
- Constantes em nível de módulo (CHARACTER_LIMIT, API_BASE_URL)

**Para Node/TypeScript: Carregue o [⚡ Guia de Implementação em TypeScript](./reference/node_mcp_server.md) e garanta o seguinte:**
- Usar `server.registerTool` adequadamente
- Schemas Zod com `.strict()`
- Modo strict do TypeScript habilitado
- Sem tipos `any` - use tipos apropriados
- Tipos de retorno Promise<T> explícitos
- Processo de build configurado (`npm run build`)

---

### Fase 3: Revisão e Refinamento

Após a implementação inicial:

#### 3.1 Revisão de Qualidade de Código

Para garantir qualidade, revise o código quanto a:
- **Princípio DRY**: Sem código duplicado entre tools
- **Composabilidade**: Lógica compartilhada extraída em funções
- **Consistência**: Operações similares retornam formatos similares
- **Tratamento de Erros**: Todas as chamadas externas têm tratamento de erros
- **Segurança de Tipos**: Cobertura completa de tipos (type hints em Python, tipos em TypeScript)
- **Documentação**: Toda tool tem docstrings/descrições abrangentes

#### 3.2 Teste e Build

**Importante:** Servidores MCP são processos de longa duração que aguardam requisições via stdio/stdin ou sse/http. Executá-los diretamente no seu processo principal (ex: `python server.py` ou `node dist/index.js`) fará seu processo travar indefinidamente.

**Maneiras seguras de testar o servidor:**
- Use o harness de avaliação (veja a Fase 4) - abordagem recomendada
- Execute o servidor no tmux para mantê-lo fora do seu processo principal
- Use um timeout ao testar: `timeout 5s python server.py`

**Para Python:**
- Verifique a sintaxe Python: `python -m py_compile your_server.py`
- Verifique se os imports funcionam corretamente revisando o arquivo
- Para testar manualmente: Execute o servidor no tmux, depois teste com o harness de avaliação no processo principal
- Ou use o harness de avaliação diretamente (ele gerencia o servidor para o transporte stdio)

**Para Node/TypeScript:**
- Execute `npm run build` e garanta que conclui sem erros
- Verifique se dist/index.js é criado
- Para testar manualmente: Execute o servidor no tmux, depois teste com o harness de avaliação no processo principal
- Ou use o harness de avaliação diretamente (ele gerencia o servidor para o transporte stdio)

#### 3.3 Use o Checklist de Qualidade

Para verificar a qualidade da implementação, carregue o checklist apropriado do guia específico da linguagem:
- Python: veja "Checklist de Qualidade" no [🐍 Guia Python](./reference/python_mcp_server.md)
- Node/TypeScript: veja "Checklist de Qualidade" no [⚡ Guia TypeScript](./reference/node_mcp_server.md)

---

### Fase 4: Crie Avaliações

Após implementar seu servidor MCP, crie avaliações abrangentes para testar sua eficácia.

**Carregue o [✅ Guia de Avaliação](./reference/evaluation.md) para diretrizes completas de avaliação.**

#### 4.1 Entenda o Propósito da Avaliação

Avaliações testam se LLMs conseguem usar efetivamente seu servidor MCP para responder a perguntas realistas e complexas.

#### 4.2 Crie 10 Perguntas de Avaliação

Para criar avaliações eficazes, siga o processo descrito no guia de avaliação:

1. **Inspeção de Tools**: Liste as tools disponíveis e entenda suas capacidades
2. **Exploração de Conteúdo**: Use operações SOMENTE LEITURA para explorar os dados disponíveis
3. **Geração de Perguntas**: Crie 10 perguntas complexas e realistas
4. **Verificação de Respostas**: Resolva cada pergunta você mesmo para verificar as respostas

#### 4.3 Requisitos de Avaliação

Cada pergunta deve ser:
- **Independente**: Não dependente de outras perguntas
- **Somente leitura**: Apenas operações não destrutivas necessárias
- **Complexa**: Exigindo múltiplas chamadas de tool e exploração profunda
- **Realista**: Baseada em casos de uso reais com os quais humanos se importariam
- **Verificável**: Resposta única e clara que pode ser verificada por comparação de strings
- **Estável**: A resposta não muda ao longo do tempo

#### 4.4 Formato de Saída

Crie um arquivo XML com esta estrutura:

```xml
<evaluation>
  <qa_pair>
    <question>Find discussions about AI model launches with animal codenames. One model needed a specific safety designation that uses the format ASL-X. What number X was being determined for the model named after a spotted wild cat?</question>
    <answer>3</answer>
  </qa_pair>
<!-- More qa_pairs... -->
</evaluation>
```

---

# Arquivos de Referência

## 📚 Biblioteca de Documentação

Carregue estes recursos conforme necessário durante o desenvolvimento:

### Documentação Central do MCP (Carregue Primeiro)
- **Protocolo MCP**: Busque em `https://modelcontextprotocol.io/llms-full.txt` - Especificação completa do MCP
- [📋 Boas Práticas de MCP](./reference/mcp_best_practices.md) - Diretrizes universais de MCP, incluindo:
  - Convenções de nomenclatura de servidores e tools
  - Diretrizes de formato de resposta (JSON vs Markdown)
  - Boas práticas de paginação
  - Limites de caracteres e estratégias de truncamento
  - Diretrizes de desenvolvimento de tools
  - Padrões de segurança e tratamento de erros

### Documentação dos SDKs (Carregue Durante a Fase 1/2)
- **Python SDK**: Busque em `https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`
- **TypeScript SDK**: Busque em `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`

### Guias de Implementação Específicos por Linguagem (Carregue Durante a Fase 2)
- [🐍 Guia de Implementação em Python](./reference/python_mcp_server.md) - Guia completo de Python/FastMCP com:
  - Padrões de inicialização de servidor
  - Exemplos de modelos Pydantic
  - Registro de tools com `@mcp.tool`
  - Exemplos completos e funcionais
  - Checklist de qualidade

- [⚡ Guia de Implementação em TypeScript](./reference/node_mcp_server.md) - Guia completo de TypeScript com:
  - Estrutura de projeto
  - Padrões de schema Zod
  - Registro de tools com `server.registerTool`
  - Exemplos completos e funcionais
  - Checklist de qualidade

### Guia de Avaliação (Carregue Durante a Fase 4)
- [✅ Guia de Avaliação](./reference/evaluation.md) - Guia completo de criação de avaliações com:
  - Diretrizes de criação de perguntas
  - Estratégias de verificação de respostas
  - Especificações do formato XML
  - Perguntas e respostas de exemplo
  - Execução de uma avaliação com os scripts fornecidos
