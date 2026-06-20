# Guia de Avaliação de Servidores MCP

## Visão Geral

Este documento fornece orientação sobre como criar avaliações abrangentes para servidores MCP. Avaliações testam se LLMs conseguem usar efetivamente seu servidor MCP para responder a perguntas realistas e complexas usando apenas as tools fornecidas.

---

## Referência Rápida

### Requisitos de Avaliação
- Crie 10 perguntas legíveis por humanos
- As perguntas devem ser SOMENTE LEITURA, INDEPENDENTES, NÃO DESTRUTIVAS
- Cada pergunta exige múltiplas chamadas de tool (potencialmente dezenas)
- As respostas devem ser valores únicos e verificáveis
- As respostas devem ser ESTÁVEIS (não mudam ao longo do tempo)

### Formato de Saída
```xml
<evaluation>
   <qa_pair>
      <question>Your question here</question>
      <answer>Single verifiable answer</answer>
   </qa_pair>
</evaluation>
```

---

## Propósito das Avaliações

A medida de qualidade de um servidor MCP NÃO é quão bem ou abrangentemente o servidor implementa tools, mas quão bem essas implementações (schemas de entrada/saída, docstrings/descrições, funcionalidade) permitem que LLMs sem nenhum outro contexto e com acesso APENAS aos servidores MCP respondam a perguntas realistas e difíceis.

## Visão Geral da Avaliação

Crie 10 perguntas legíveis por humanos que exijam APENAS operações SOMENTE LEITURA, INDEPENDENTES, NÃO DESTRUTIVAS e IDEMPOTENTES para responder. Cada pergunta deve ser:
- Realista
- Clara e concisa
- Sem ambiguidade
- Complexa, exigindo potencialmente dezenas de chamadas de tool ou passos
- Respondível com um único valor verificável que você identifica de antemão

## Diretrizes para Perguntas

### Requisitos Centrais

1. **As perguntas DEVEM ser independentes**
   - Cada pergunta NÃO deve depender da resposta de qualquer outra pergunta
   - Não deve presumir operações de escrita prévias decorrentes do processamento de outra pergunta

2. **As perguntas DEVEM exigir APENAS uso de tools NÃO DESTRUTIVO E IDEMPOTENTE**
   - Não devem instruir ou exigir modificação de estado para chegar à resposta correta

3. **As perguntas devem ser REALISTAS, CLARAS, CONCISAS e COMPLEXAS**
   - Devem exigir que outro LLM use múltiplas (potencialmente dezenas de) tools ou passos para responder

### Complexidade e Profundidade

4. **As perguntas devem exigir exploração profunda**
   - Considere perguntas multi-hop que exijam múltiplas subperguntas e chamadas de tool sequenciais
   - Cada passo deve se beneficiar de informações encontradas em perguntas anteriores

5. **As perguntas podem exigir paginação extensa**
   - Podem precisar paginar por múltiplas páginas de resultados
   - Podem exigir consultar dados antigos (1-2 anos desatualizados) para encontrar informação de nicho
   - As perguntas devem ser DIFÍCEIS

6. **As perguntas devem exigir entendimento profundo**
   - Em vez de conhecimento superficial
   - Podem apresentar ideias complexas como perguntas Verdadeiro/Falso que exijam evidência
   - Podem usar formato de múltipla escolha em que o LLM deve buscar diferentes hipóteses

7. **As perguntas não devem ser resolvíveis com busca simples por palavra-chave**
   - Não inclua palavras-chave específicas do conteúdo-alvo
   - Use sinônimos, conceitos relacionados ou paráfrases
   - Exija múltiplas buscas, análise de múltiplos itens relacionados, extração de contexto e, então, dedução da resposta

### Teste de Tools

8. **As perguntas devem submeter os valores de retorno das tools a teste de estresse**
   - Podem provocar tools que retornam grandes objetos ou listas JSON, sobrecarregando o LLM
   - Devem exigir entendimento de múltiplas modalidades de dados:
     - IDs e nomes
     - Timestamps e datetimes (meses, dias, anos, segundos)
     - IDs de arquivo, nomes, extensões e mimetypes
     - URLs, GIDs, etc.
   - Devem sondar a capacidade da tool de retornar todas as formas úteis de dados

9. **As perguntas devem refletir, em sua MAIORIA, casos de uso humanos reais**
   - Os tipos de tarefas de recuperação de informação com os quais HUMANOS assistidos por um LLM se importariam

10. **As perguntas podem exigir dezenas de chamadas de tool**
    - Isso desafia LLMs com contexto limitado
    - Incentiva as tools do servidor MCP a reduzir a informação retornada

11. **Inclua perguntas ambíguas**
    - Podem ser ambíguas OU exigir decisões difíceis sobre quais tools chamar
    - Forçam o LLM a potencialmente cometer erros ou interpretar mal
    - Garanta que, apesar da AMBIGUIDADE, AINDA HAJA UMA ÚNICA RESPOSTA VERIFICÁVEL

### Estabilidade

12. **As perguntas devem ser projetadas de modo que a resposta NÃO MUDE**
    - Não faça perguntas que dependam de "estado atual" que seja dinâmico
    - Por exemplo, não conte:
      - Número de reações a um post
      - Número de respostas a um thread
      - Número de membros em um canal

13. **NÃO deixe o servidor MCP RESTRINGIR os tipos de perguntas que você cria**
    - Crie perguntas desafiadoras e complexas
    - Algumas podem não ser resolvíveis com as tools disponíveis do servidor MCP
    - As perguntas podem exigir formatos de saída específicos (datetime vs. epoch time, JSON vs. MARKDOWN)
    - As perguntas podem exigir dezenas de chamadas de tool para serem concluídas

## Diretrizes para Respostas

### Verificação

1. **As respostas devem ser VERIFICÁVEIS por comparação direta de strings**
   - Se a resposta puder ser reescrita em vários formatos, especifique claramente o formato de saída na PERGUNTA
   - Exemplos: "Use YYYY/MM/DD.", "Respond True or False.", "Answer A, B, C, or D and nothing else."
   - A resposta deve ser um único valor VERIFICÁVEL, como:
     - ID de usuário, nome de usuário, nome de exibição, primeiro nome, sobrenome
     - ID de canal, nome de canal
     - ID de mensagem, string
     - URL, título
     - Quantidade numérica
     - Timestamp, datetime
     - Booleano (para perguntas Verdadeiro/Falso)
     - Endereço de e-mail, número de telefone
     - ID de arquivo, nome de arquivo, extensão de arquivo
     - Resposta de múltipla escolha
   - As respostas não devem exigir formatação especial ou saída complexa e estruturada
   - A resposta será verificada usando COMPARAÇÃO DIRETA DE STRINGS

### Legibilidade

2. **As respostas devem, em geral, preferir formatos LEGÍVEIS POR HUMANOS**
   - Exemplos: nomes, primeiro nome, sobrenome, datetime, nome de arquivo, string de mensagem, URL, yes/no, true/false, a/b/c/d
   - Em vez de IDs opacos (embora IDs sejam aceitáveis)
   - A VASTA MAIORIA das respostas deve ser legível por humanos

### Estabilidade

3. **As respostas devem ser ESTÁVEIS/ESTACIONÁRIAS**
   - Olhe para conteúdo antigo (ex: conversas que terminaram, projetos que foram lançados, perguntas respondidas)
   - Crie PERGUNTAS baseadas em conceitos "fechados" que sempre retornarão a mesma resposta
   - As perguntas podem pedir para considerar uma janela de tempo fixa para se isolar de respostas não estacionárias
   - Confie em contexto QUE É IMPROVÁVEL MUDAR
   - Exemplo: se for encontrar o nome de um paper, seja ESPECÍFICO o suficiente para que a resposta não seja confundida com papers publicados depois

4. **As respostas devem ser CLARAS e SEM AMBIGUIDADE**
   - As perguntas devem ser projetadas de modo que haja uma única resposta clara
   - A resposta pode ser derivada do uso das tools do servidor MCP

### Diversidade

5. **As respostas devem ser DIVERSAS**
   - A resposta deve ser um único valor VERIFICÁVEL em modalidades e formatos diversos
   - Conceito de usuário: ID de usuário, nome de usuário, nome de exibição, primeiro nome, sobrenome, endereço de e-mail, número de telefone
   - Conceito de canal: ID de canal, nome de canal, tópico do canal
   - Conceito de mensagem: ID de mensagem, string de mensagem, timestamp, mês, dia, ano

6. **As respostas NÃO devem ser estruturas complexas**
   - Não uma lista de valores
   - Não um objeto complexo
   - Não uma lista de IDs ou strings
   - Não texto em linguagem natural
   - A MENOS QUE a resposta possa ser verificada de forma direta usando COMPARAÇÃO DIRETA DE STRINGS
   - E possa ser reproduzida de forma realista
   - Deve ser improvável que um LLM retorne a mesma lista em qualquer outra ordem ou formato

## Processo de Avaliação

### Passo 1: Inspeção da Documentação

Leia a documentação da API-alvo para entender:
- Endpoints e funcionalidades disponíveis
- Se houver ambiguidade, busque informação adicional na web
- Paralelize este passo TANTO QUANTO POSSÍVEL
- Garanta que cada subagente esteja examinando APENAS documentação do sistema de arquivos ou da web

### Passo 2: Inspeção de Tools

Liste as tools disponíveis no servidor MCP:
- Inspecione o servidor MCP diretamente
- Entenda schemas de entrada/saída, docstrings e descrições
- SEM chamar as tools em si nesta etapa

### Passo 3: Desenvolvendo Entendimento

Repita os passos 1 e 2 até ter um bom entendimento:
- Itere múltiplas vezes
- Pense nos tipos de tarefas que você quer criar
- Refine seu entendimento
- Em NENHUMA etapa você deve LER o código da implementação do servidor MCP em si
- Use sua intuição e entendimento para criar tarefas razoáveis, realistas, mas MUITO desafiadoras

### Passo 4: Inspeção de Conteúdo Somente Leitura

Após entender a API e as tools, USE as tools do servidor MCP:
- Inspecione conteúdo usando APENAS operações SOMENTE LEITURA e NÃO DESTRUTIVAS
- Objetivo: identificar conteúdo específico (ex: usuários, canais, mensagens, projetos, tasks) para criar perguntas realistas
- NÃO deve chamar nenhuma tool que modifique estado
- NÃO lerá o código da implementação do servidor MCP em si
- Paralelize este passo com subagentes individuais buscando explorações independentes
- Garanta que cada subagente realize apenas operações SOMENTE LEITURA, NÃO DESTRUTIVAS e IDEMPOTENTES
- CUIDADO: ALGUMAS TOOLS podem retornar MUITOS DADOS, o que faria você ficar sem CONTEXTO
- Faça chamadas de tool INCREMENTAIS, PEQUENAS E DIRECIONADAS para exploração
- Em todas as requisições de chamada de tool, use o parâmetro `limit` para limitar resultados (<10)
- Use paginação

### Passo 5: Geração de Tarefas

Após inspecionar o conteúdo, crie 10 perguntas legíveis por humanos:
- Um LLM deve ser capaz de respondê-las com o servidor MCP
- Siga todas as diretrizes de perguntas e respostas acima

## Formato de Saída

Cada par QA consiste em uma pergunta e uma resposta. A saída deve ser um arquivo XML com esta estrutura:

```xml
<evaluation>
   <qa_pair>
      <question>Find the project created in Q2 2024 with the highest number of completed tasks. What is the project name?</question>
      <answer>Website Redesign</answer>
   </qa_pair>
   <qa_pair>
      <question>Search for issues labeled as "bug" that were closed in March 2024. Which user closed the most issues? Provide their username.</question>
      <answer>sarah_dev</answer>
   </qa_pair>
   <qa_pair>
      <question>Look for pull requests that modified files in the /api directory and were merged between January 1 and January 31, 2024. How many different contributors worked on these PRs?</question>
      <answer>7</answer>
   </qa_pair>
   <qa_pair>
      <question>Find the repository with the most stars that was created before 2023. What is the repository name?</question>
      <answer>data-pipeline</answer>
   </qa_pair>
</evaluation>
```

## Exemplos de Avaliação

### Boas Perguntas

**Exemplo 1: Pergunta multi-hop exigindo exploração profunda (GitHub MCP)**
```xml
<qa_pair>
   <question>Find the repository that was archived in Q3 2023 and had previously been the most forked project in the organization. What was the primary programming language used in that repository?</question>
   <answer>Python</answer>
</qa_pair>
```

Esta pergunta é boa porque:
- Exige múltiplas buscas para encontrar repositórios arquivados
- Precisa identificar qual teve mais forks antes do arquivamento
- Exige examinar detalhes do repositório quanto à linguagem
- A resposta é um valor simples e verificável
- Baseada em dados históricos (fechados) que não mudarão

**Exemplo 2: Exige entendimento de contexto sem correspondência de palavra-chave (Project Management MCP)**
```xml
<qa_pair>
   <question>Locate the initiative focused on improving customer onboarding that was completed in late 2023. The project lead created a retrospective document after completion. What was the lead's role title at that time?</question>
   <answer>Product Manager</answer>
</qa_pair>
```

Esta pergunta é boa porque:
- Não usa o nome específico do projeto ("initiative focused on improving customer onboarding")
- Exige encontrar projetos concluídos de um período específico
- Precisa identificar o líder do projeto e seu cargo
- Exige entender o contexto de documentos de retrospectiva
- A resposta é legível por humanos e estável
- Baseada em trabalho concluído (não mudará)

**Exemplo 3: Agregação complexa exigindo múltiplos passos (Issue Tracker MCP)**
```xml
<qa_pair>
   <question>Among all bugs reported in January 2024 that were marked as critical priority, which assignee resolved the highest percentage of their assigned bugs within 48 hours? Provide the assignee's username.</question>
   <answer>alex_eng</answer>
</qa_pair>
```

Esta pergunta é boa porque:
- Exige filtrar bugs por data, prioridade e status
- Precisa agrupar por responsável e calcular taxas de resolução
- Exige entender timestamps para determinar janelas de 48 horas
- Testa paginação (potencialmente muitos bugs a processar)
- A resposta é um único nome de usuário
- Baseada em dados históricos de um período específico

**Exemplo 4: Exige síntese entre múltiplos tipos de dados (CRM MCP)**
```xml
<qa_pair>
   <question>Find the account that upgraded from the Starter to Enterprise plan in Q4 2023 and had the highest annual contract value. What industry does this account operate in?</question>
   <answer>Healthcare</answer>
</qa_pair>
```

Esta pergunta é boa porque:
- Exige entender mudanças de tier de assinatura
- Precisa identificar eventos de upgrade em um período específico
- Exige comparar valores de contrato
- Deve acessar informação de setor da conta
- A resposta é simples e verificável
- Baseada em transações históricas concluídas

### Perguntas Ruins

**Exemplo 1: A resposta muda ao longo do tempo**
```xml
<qa_pair>
   <question>How many open issues are currently assigned to the engineering team?</question>
   <answer>47</answer>
</qa_pair>
```

Esta pergunta é ruim porque:
- A resposta mudará conforme issues são criadas, fechadas ou reatribuídas
- Não baseada em dados estáveis/estacionários
- Depende de "estado atual" que é dinâmico

**Exemplo 2: Fácil demais com busca por palavra-chave**
```xml
<qa_pair>
   <question>Find the pull request with title "Add authentication feature" and tell me who created it.</question>
   <answer>developer123</answer>
</qa_pair>
```

Esta pergunta é ruim porque:
- Pode ser resolvida com uma busca simples por palavra-chave do título exato
- Não exige exploração ou entendimento profundo
- Nenhuma síntese ou análise necessária

**Exemplo 3: Formato de resposta ambíguo**
```xml
<qa_pair>
   <question>List all the repositories that have Python as their primary language.</question>
   <answer>repo1, repo2, repo3, data-pipeline, ml-tools</answer>
</qa_pair>
```

Esta pergunta é ruim porque:
- A resposta é uma lista que poderia ser retornada em qualquer ordem
- Difícil de verificar por comparação direta de strings
- O LLM pode formatar de modo diferente (array JSON, separado por vírgulas, separado por quebras de linha)
- Melhor pedir um agregado específico (contagem) ou superlativo (mais stars)

## Processo de Verificação

Após criar as avaliações:

1. **Examine o arquivo XML** para entender o schema
2. **Carregue cada instrução de tarefa** e, em paralelo usando o servidor MCP e as tools, identifique a resposta correta tentando resolver a tarefa VOCÊ MESMO
3. **Sinalize quaisquer operações** que exijam operações de ESCRITA ou DESTRUTIVAS
4. **Acumule todas as respostas CORRETAS** e substitua quaisquer respostas incorretas no documento
5. **Remova qualquer `<qa_pair>`** que exija operações de ESCRITA ou DESTRUTIVAS

Lembre-se de paralelizar a resolução de tarefas para evitar ficar sem contexto, depois acumule todas as respostas e faça as alterações no arquivo ao final.

## Dicas para Criar Avaliações de Qualidade

1. **Pense Bastante e Planeje com Antecedência** antes de gerar tarefas
2. **Paralelize Onde Houver Oportunidade** para acelerar o processo e gerenciar contexto
3. **Foque em Casos de Uso Realistas** que humanos realmente queiram realizar
4. **Crie Perguntas Desafiadoras** que testem os limites das capacidades do servidor MCP
5. **Garanta Estabilidade** usando dados históricos e conceitos fechados
6. **Verifique as Respostas** resolvendo as perguntas você mesmo usando as tools do servidor MCP
7. **Itere e Refine** com base no que você aprende durante o processo

---

# Executando Avaliações

Após criar seu arquivo de avaliação, você pode usar o harness de avaliação fornecido para testar seu servidor MCP.

## Configuração

1. **Instale as Dependências**

   ```bash
   pip install -r scripts/requirements.txt
   ```

   Ou instale manualmente:
   ```bash
   pip install anthropic mcp
   ```

2. **Defina a API Key**

   ```bash
   export ANTHROPIC_API_KEY=your_api_key_here
   ```

## Formato do Arquivo de Avaliação

Arquivos de avaliação usam formato XML com elementos `<qa_pair>`:

```xml
<evaluation>
   <qa_pair>
      <question>Find the project created in Q2 2024 with the highest number of completed tasks. What is the project name?</question>
      <answer>Website Redesign</answer>
   </qa_pair>
   <qa_pair>
      <question>Search for issues labeled as "bug" that were closed in March 2024. Which user closed the most issues? Provide their username.</question>
      <answer>sarah_dev</answer>
   </qa_pair>
</evaluation>
```

## Executando Avaliações

O script de avaliação (`scripts/evaluation.py`) suporta três tipos de transporte:

**Importante:**
- **transporte stdio**: O script de avaliação lança e gerencia automaticamente o processo do servidor MCP para você. Não execute o servidor manualmente.
- **transportes sse/http**: Você deve iniciar o servidor MCP separadamente antes de executar a avaliação. O script se conecta ao servidor já em execução na URL especificada.

### 1. Servidor STDIO Local

Para servidores MCP executados localmente (o script lança o servidor automaticamente):

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_mcp_server.py \
  evaluation.xml
```

Com variáveis de ambiente:
```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_mcp_server.py \
  -e API_KEY=abc123 \
  -e DEBUG=true \
  evaluation.xml
```

### 2. Server-Sent Events (SSE)

Para servidores MCP baseados em SSE (você deve iniciar o servidor primeiro):

```bash
python scripts/evaluation.py \
  -t sse \
  -u https://example.com/mcp \
  -H "Authorization: Bearer token123" \
  -H "X-Custom-Header: value" \
  evaluation.xml
```

### 3. HTTP (Streamable HTTP)

Para servidores MCP baseados em HTTP (você deve iniciar o servidor primeiro):

```bash
python scripts/evaluation.py \
  -t http \
  -u https://example.com/mcp \
  -H "Authorization: Bearer token123" \
  evaluation.xml
```

## Opções de Linha de Comando

```
usage: evaluation.py [-h] [-t {stdio,sse,http}] [-m MODEL] [-c COMMAND]
                     [-a ARGS [ARGS ...]] [-e ENV [ENV ...]] [-u URL]
                     [-H HEADERS [HEADERS ...]] [-o OUTPUT]
                     eval_file

positional arguments:
  eval_file             Path to evaluation XML file

optional arguments:
  -h, --help            Show help message
  -t, --transport       Transport type: stdio, sse, or http (default: stdio)
  -m, --model           Claude model to use (default: claude-3-7-sonnet-20250219)
  -o, --output          Output file for report (default: print to stdout)

stdio options:
  -c, --command         Command to run MCP server (e.g., python, node)
  -a, --args            Arguments for the command (e.g., server.py)
  -e, --env             Environment variables in KEY=VALUE format

sse/http options:
  -u, --url             MCP server URL
  -H, --header          HTTP headers in 'Key: Value' format
```

## Saída

O script de avaliação gera um relatório detalhado incluindo:

- **Estatísticas de Resumo**:
  - Acurácia (corretas/total)
  - Duração média por tarefa
  - Média de chamadas de tool por tarefa
  - Total de chamadas de tool

- **Resultados por Tarefa**:
  - Prompt e resposta esperada
  - Resposta real do agente
  - Se a resposta estava correta (✅/❌)
  - Duração e detalhes das chamadas de tool
  - Resumo do agente sobre sua abordagem
  - Feedback do agente sobre as tools

### Salvar Relatório em Arquivo

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a my_server.py \
  -o evaluation_report.md \
  evaluation.xml
```

## Fluxo de Trabalho de Exemplo Completo

Aqui está um exemplo completo de criação e execução de uma avaliação:

1. **Crie seu arquivo de avaliação** (`my_evaluation.xml`):

```xml
<evaluation>
   <qa_pair>
      <question>Find the user who created the most issues in January 2024. What is their username?</question>
      <answer>alice_developer</answer>
   </qa_pair>
   <qa_pair>
      <question>Among all pull requests merged in Q1 2024, which repository had the highest number? Provide the repository name.</question>
      <answer>backend-api</answer>
   </qa_pair>
   <qa_pair>
      <question>Find the project that was completed in December 2023 and had the longest duration from start to finish. How many days did it take?</question>
      <answer>127</answer>
   </qa_pair>
</evaluation>
```

2. **Instale as dependências**:

```bash
pip install -r scripts/requirements.txt
export ANTHROPIC_API_KEY=your_api_key
```

3. **Execute a avaliação**:

```bash
python scripts/evaluation.py \
  -t stdio \
  -c python \
  -a github_mcp_server.py \
  -e GITHUB_TOKEN=ghp_xxx \
  -o github_eval_report.md \
  my_evaluation.xml
```

4. **Revise o relatório** em `github_eval_report.md` para:
   - Ver quais perguntas passaram/falharam
   - Ler o feedback do agente sobre suas tools
   - Identificar áreas de melhoria
   - Iterar no design do seu servidor MCP

## Solução de Problemas

### Erros de Conexão

Se você receber erros de conexão:
- **STDIO**: Verifique se o comando e os argumentos estão corretos
- **SSE/HTTP**: Verifique se a URL está acessível e os headers estão corretos
- Garanta que quaisquer API keys necessárias estejam definidas em variáveis de ambiente ou headers

### Baixa Acurácia

Se muitas avaliações falharem:
- Revise o feedback do agente para cada tarefa
- Verifique se as descrições das tools são claras e abrangentes
- Verifique se os parâmetros de entrada estão bem documentados
- Considere se as tools retornam dados demais ou de menos
- Garanta que as mensagens de erro sejam acionáveis

### Problemas de Timeout

Se as tarefas estiverem expirando por timeout:
- Use um modelo mais capaz (ex: `claude-3-7-sonnet-20250219`)
- Verifique se as tools estão retornando dados demais
- Verifique se a paginação está funcionando corretamente
- Considere simplificar perguntas complexas
