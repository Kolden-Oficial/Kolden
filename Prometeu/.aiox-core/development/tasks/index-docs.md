---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: indexDocs()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: source
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Valid path or URL

- campo: format
  tipo: string
  origem: User Input
  obrigatório: false
  validação: markdown|html|json

- campo: template
  tipo: string
  origem: config
  obrigatório: false
  validação: Template name

**Saída:**
- campo: generated_doc
  tipo: string
  destino: File (docs/*)
  persistido: true

- campo: metadata
  tipo: object
  destino: File (frontmatter)
  persistido: true

- campo: toc
  tipo: array
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Template exists; source data available
    tipo: pre-condition
    blocker: true
    validação: |
      Check template exists; source data available
    error_message: "Pre-condition failed: Template exists; source data available"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Documentation generated; format valid; links working
    tipo: post-condition
    blocker: true
    validação: |
      Verify documentation generated; format valid; links working
    error_message: "Post-condition failed: Documentation generated; format valid; links working"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Documentation readable; examples work; links valid
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert documentation readable; examples work; links valid
    error_message: "Acceptance criterion not met: Documentation readable; examples work; links valid"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** markdown-renderer
  - **Propósito:** Parsing e renderização de Markdown
  - **Origem:** npm: marked ou similar

- **Ferramenta:** template-engine
  - **Propósito:** Processamento de templates de documento
  - **Origem:** .aiox-core/product/templates/

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** generate-docs.js
  - **Propósito:** Geração de documentação a partir de templates
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/generate-docs.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Template Not Found
   - **Causa:** O template especificado não existe
   - **Resolução:** Verifique o caminho do template na config
   - **Recuperação:** Use o template padrão, registre um warning

2. **Erro:** Invalid Markdown
   - **Causa:** A origem contém sintaxe markdown inválida
   - **Resolução:** Valide o markdown antes de processar
   - **Recuperação:** Sanitize o markdown, continue o processamento

3. **Erro:** Generation Failed
   - **Causa:** Erro de renderização do template ou dados ausentes
   - **Resolução:** Verifique a sintaxe do template e a disponibilidade dos dados
   - **Recuperação:** Fallback para um template simples, registre o erro

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de átomos; implemente saídas antecipadas

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

# Nenhum checklist necessário - esta task mantém o índice de documentação, a validação é feita por verificações no sistema de arquivos
tools:
  - github-cli
---

# Index Documentation Task

## Propósito

Esta task mantém a integridade e a completude do arquivo `docs/index.md` ao varrer todos os arquivos de documentação e garantir que estejam devidamente indexados com descrições. Ela trata tanto os documentos de nível raiz quanto os documentos dentro de subpastas, organizando-os hierarquicamente.

## Instruções da Task

Você agora opera como um Indexador de Documentação. Seu objetivo é garantir que todos os arquivos de documentação estejam devidamente catalogados no índice central, com a organização adequada para as subpastas.

### Passos Obrigatórios

1. Primeiro, localize e varra:

   - O diretório `docs/` e todos os subdiretórios
   - O arquivo `docs/index.md` existente (crie se ausente)
   - Todos os arquivos markdown (`.md`) e de texto (`.txt`) na estrutura de documentação
   - Anote a estrutura de pastas para a organização hierárquica

2. Para o `docs/index.md` existente:

   - Parseie as entradas atuais
   - Anote as referências de arquivos e descrições existentes
   - Identifique quaisquer links quebrados ou arquivos ausentes
   - Mantenha o controle do conteúdo já indexado
   - Preserve as seções de pasta existentes

3. Para cada arquivo de documentação encontrado:

   - Extraia o título (do primeiro heading ou do nome do arquivo)
   - Gere uma breve descrição analisando o conteúdo
   - Crie um link markdown relativo para o arquivo
   - Verifique se ele já está no índice
   - Anote a qual pasta ele pertence (se estiver em uma subpasta)
   - Se ausente ou desatualizado, prepare uma atualização

4. Para quaisquer arquivos ausentes ou inexistentes encontrados no índice:

   - Apresente uma lista de todas as entradas que referenciam arquivos inexistentes
   - Para cada entrada:
     - Mostre os detalhes completos da entrada (título, caminho, descrição)
     - Peça confirmação explícita antes da remoção
     - Forneça a opção de atualizar o caminho se o arquivo foi movido
     - Registre a decisão (remover/atualizar/manter) para o relatório final

5. Atualize o `docs/index.md`:
   - Mantenha a estrutura e a organização existentes
   - Crie seções de nível 2 (`##`) para cada subpasta
   - Liste os documentos de nível raiz primeiro
   - Adicione as entradas ausentes com descrições
   - Atualize as entradas desatualizadas
   - Remova apenas as entradas que foram confirmadas para remoção
   - Garanta formatação consistente em todo o arquivo

### Formato da Estrutura do Índice

O índice deve ser organizado da seguinte forma:

```markdown
# Documentation Index

## Root Documents

### [Document Title](./document.md)

Brief description of the document's purpose and contents.

### [Another Document](./another.md)

Description here.

## Folder Name

Documents within the `folder-name/` directory:

### [Document in Folder](./folder-name/document.md)

Description of this document.

### [Another in Folder](./folder-name/another.md)

Description here.

## Another Folder

Documents within the `another-folder/` directory:

### [Nested Document](./another-folder/document.md)

Description of nested document.

```

### Formato de Entrada do Índice

Cada entrada deve seguir este formato:

```markdown
### [Document Title](relative/path/to/file.md)

Brief description of the document's purpose and contents.
```

### Regras de Operação

1. NUNCA modifique o conteúdo dos arquivos indexados
2. Preserve as descrições existentes no index.md quando forem adequadas
3. Mantenha qualquer categorização ou agrupamento existente no índice
4. Use caminhos relativos para todos os links (começando com `./`)
5. Garanta que as descrições sejam concisas mas informativas
6. NUNCA remova entradas sem confirmação explícita
7. Reporte quaisquer links quebrados ou inconsistências encontradas
8. Permita atualizações de caminho para arquivos movidos antes de considerar a remoção
9. Crie seções de pasta usando headings de nível 2 (`##`)
10. Ordene as pastas alfabeticamente, com os documentos raiz listados primeiro
11. Dentro de cada seção, ordene os documentos alfabeticamente por título

### Saída do Processo

A task fornecerá:

1. Um resumo das mudanças feitas no index.md
2. Lista de arquivos recém-indexados (organizados por pasta)
3. Lista de entradas atualizadas
4. Lista de entradas apresentadas para remoção e seu status:
   - Remoções confirmadas
   - Caminhos atualizados
   - Mantidas apesar do arquivo ausente
5. Quaisquer novas pastas descobertas
6. Quaisquer outros problemas ou inconsistências encontradas

### Tratamento de Arquivos Ausentes

Para cada arquivo referenciado no índice mas não encontrado no sistema de arquivos:

1. Apresente a entrada:

   ```markdown
   Arquivo ausente detectado:
   Título: [Document Title]
   Caminho: relative/path/to/file.md
   Descrição: Descrição existente
   Seção: [Documentos Raiz | Nome da Pasta]

   Opções:

   1. Remover esta entrada
   2. Atualizar o caminho do arquivo
   3. Manter a entrada (marcar como temporariamente indisponível)

   Por favor, escolha uma opção (1/2/3):
   ```

2. Aguarde a confirmação do usuário antes de tomar qualquer ação
3. Registre a decisão para o relatório final

### Casos Especiais

1. **Documentos Shardeados**: Se uma pasta contém um arquivo `index.md`, trate-a como um documento shardeado:

   - Use o título do `index.md` da pasta como o título da seção
   - Liste os documentos da pasta como subseções
   - Anote na descrição que este é um documento de múltiplas partes

2. **Arquivos README**: Converta `README.md` para títulos mais descritivos com base no conteúdo

3. **Subpastas Aninhadas**: Para pastas profundamente aninhadas, mantenha a hierarquia mas limite a 2 níveis no índice principal. Estruturas mais profundas devem ter seus próprios arquivos de índice.

## Entrada Necessária

Por favor, forneça:

1. Localização do diretório `docs/` (default: `./docs`)
2. Confirmação de acesso de escrita ao `docs/index.md`
3. Quaisquer preferências específicas de categorização
4. Quaisquer arquivos ou diretórios a excluir da indexação (ex.: `.git`, `node_modules`)
5. Se deve incluir arquivos/pastas ocultos (começando com `.`)

Deseja prosseguir com a indexação da documentação? Por favor, forneça a entrada necessária acima.
 