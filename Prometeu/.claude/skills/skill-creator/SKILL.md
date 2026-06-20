---
name: skill-creator
description: Guia para criar skills eficazes. Esta skill deve ser usada quando os usuários quiserem criar uma nova skill (ou atualizar uma skill existente) que estenda as capacidades do Claude com conhecimento especializado, fluxos de trabalho ou integrações de ferramentas.
license: Termos completos em LICENSE.txt
---

# Skill Creator

Esta skill fornece orientação para criar skills eficazes.

## Sobre Skills

Skills são pacotes modulares e autocontidos que estendem as capacidades do Claude ao fornecer
conhecimento especializado, fluxos de trabalho e ferramentas. Pense nelas como "guias de onboarding" para domínios
ou tarefas específicas — elas transformam o Claude de um agente de propósito geral em um agente especializado
equipado com conhecimento procedural que nenhum modelo pode possuir por completo.

### O Que as Skills Fornecem

1. Fluxos de trabalho especializados - Procedimentos multi-etapa para domínios específicos
2. Integrações de ferramentas - Instruções para trabalhar com formatos de arquivo ou APIs específicos
3. Expertise de domínio - Conhecimento específico da empresa, schemas, lógica de negócio
4. Recursos empacotados - Scripts, referências e assets para tarefas complexas e repetitivas

### Anatomia de uma Skill

Toda skill consiste em um arquivo SKILL.md obrigatório e recursos empacotados opcionais:

```
skill-name/
├── SKILL.md (obrigatório)
│   ├── Metadados em frontmatter YAML (obrigatório)
│   │   ├── name: (obrigatório)
│   │   └── description: (obrigatório)
│   └── Instruções em Markdown (obrigatório)
└── Recursos Empacotados (opcional)
    ├── scripts/          - Código executável (Python/Bash/etc.)
    ├── references/       - Documentação destinada a ser carregada no contexto conforme necessário
    └── assets/           - Arquivos usados na saída (templates, ícones, fontes, etc.)
```

#### SKILL.md (obrigatório)

**Qualidade dos Metadados:** O `name` e a `description` no frontmatter YAML determinam quando o Claude usará a skill. Seja específico sobre o que a skill faz e quando usá-la. Use a terceira pessoa (ex.: "Esta skill deve ser usada quando..." em vez de "Use esta skill quando...").

#### Recursos Empacotados (opcional)

##### Scripts (`scripts/`)

Código executável (Python/Bash/etc.) para tarefas que exigem confiabilidade determinística ou que são reescritas repetidamente.

- **Quando incluir**: Quando o mesmo código está sendo reescrito repetidamente ou quando é necessária confiabilidade determinística
- **Exemplo**: `scripts/rotate_pdf.py` para tarefas de rotação de PDF
- **Benefícios**: Eficiente em tokens, determinístico, pode ser executado sem ser carregado no contexto
- **Nota**: Os scripts ainda podem precisar ser lidos pelo Claude para correções (patching) ou ajustes específicos do ambiente

##### References (`references/`)

Documentação e material de referência destinados a ser carregados no contexto conforme necessário, para informar o processo e o raciocínio do Claude.

- **Quando incluir**: Para documentação que o Claude deve consultar enquanto trabalha
- **Exemplos**: `references/finance.md` para schemas financeiros, `references/mnda.md` para o template de NDA da empresa, `references/policies.md` para políticas da empresa, `references/api_docs.md` para especificações de API
- **Casos de uso**: Schemas de banco de dados, documentação de API, conhecimento de domínio, políticas da empresa, guias detalhados de fluxo de trabalho
- **Benefícios**: Mantém o SKILL.md enxuto, carregado apenas quando o Claude determina que é necessário
- **Boa prática**: Se os arquivos forem grandes (>10k palavras), inclua padrões de busca grep no SKILL.md
- **Evite duplicação**: A informação deve viver no SKILL.md OU nos arquivos de references, não em ambos. Prefira os arquivos de references para informações detalhadas, a menos que sejam realmente essenciais à skill — isso mantém o SKILL.md enxuto e ao mesmo tempo torna a informação descobrível sem ocupar a janela de contexto. Mantenha no SKILL.md apenas instruções procedurais essenciais e orientação de fluxo de trabalho; mova material de referência detalhado, schemas e exemplos para os arquivos de references.

##### Assets (`assets/`)

Arquivos não destinados a ser carregados no contexto, mas sim usados dentro da saída que o Claude produz.

- **Quando incluir**: Quando a skill precisa de arquivos que serão usados na saída final
- **Exemplos**: `assets/logo.png` para assets de marca, `assets/slides.pptx` para templates de PowerPoint, `assets/frontend-template/` para boilerplate de HTML/React, `assets/font.ttf` para tipografia
- **Casos de uso**: Templates, imagens, ícones, código boilerplate, fontes, documentos de exemplo que são copiados ou modificados
- **Benefícios**: Separa os recursos de saída da documentação, permite que o Claude use arquivos sem carregá-los no contexto

### Princípio de Design: Divulgação Progressiva (Progressive Disclosure)

Skills usam um sistema de carregamento em três níveis para gerenciar o contexto de forma eficiente:

1. **Metadados (name + description)** - Sempre no contexto (~100 palavras)
2. **Corpo do SKILL.md** - Quando a skill é acionada (<5k palavras)
3. **Recursos empacotados** - Conforme necessário ao Claude (Ilimitado*)

*Ilimitado porque os scripts podem ser executados sem serem lidos para a janela de contexto.

## Processo de Criação de Skill

Para criar uma skill, siga o "Processo de Criação de Skill" em ordem, pulando etapas apenas se houver um motivo claro pelo qual não são aplicáveis.

### Passo 1: Entender a Skill com Exemplos Concretos

Pule este passo apenas quando os padrões de uso da skill já estiverem claramente compreendidos. Ele permanece valioso mesmo ao trabalhar com uma skill existente.

Para criar uma skill eficaz, entenda claramente exemplos concretos de como a skill será usada. Esse entendimento pode vir tanto de exemplos diretos do usuário quanto de exemplos gerados que são validados com o feedback do usuário.

Por exemplo, ao construir uma skill image-editor, perguntas relevantes incluem:

- "Quais funcionalidades a skill image-editor deve suportar? Edição, rotação, mais alguma coisa?"
- "Você pode dar alguns exemplos de como esta skill seria usada?"
- "Posso imaginar usuários pedindo coisas como 'Remova o olho vermelho desta imagem' ou 'Gire esta imagem'. Há outras formas como você imagina que esta skill seria usada?"
- "O que um usuário diria que deveria acionar esta skill?"

Para não sobrecarregar os usuários, evite fazer muitas perguntas em uma única mensagem. Comece com as perguntas mais importantes e faça acompanhamentos conforme necessário para maior eficácia.

Conclua este passo quando houver um sentido claro da funcionalidade que a skill deve suportar.

### Passo 2: Planejar o Conteúdo Reutilizável da Skill

Para transformar exemplos concretos em uma skill eficaz, analise cada exemplo:

1. Considerando como executar o exemplo do zero
2. Identificando quais scripts, references e assets seriam úteis ao executar esses fluxos de trabalho repetidamente

Exemplo: Ao construir uma skill `pdf-editor` para lidar com pedidos como "Me ajude a girar este PDF", a análise mostra:

1. Girar um PDF exige reescrever o mesmo código toda vez
2. Um script `scripts/rotate_pdf.py` seria útil armazenar na skill

Exemplo: Ao projetar uma skill `frontend-webapp-builder` para pedidos como "Construa um app de tarefas" ou "Construa um dashboard para acompanhar meus passos", a análise mostra:

1. Escrever uma webapp de frontend exige o mesmo boilerplate de HTML/React toda vez
2. Um template `assets/hello-world/` contendo os arquivos boilerplate do projeto HTML/React seria útil armazenar na skill

Exemplo: Ao construir uma skill `big-query` para lidar com pedidos como "Quantos usuários fizeram login hoje?", a análise mostra:

1. Consultar o BigQuery exige redescobrir os schemas e relacionamentos das tabelas toda vez
2. Um arquivo `references/schema.md` documentando os schemas das tabelas seria útil armazenar na skill

Para estabelecer o conteúdo da skill, analise cada exemplo concreto para criar uma lista dos recursos reutilizáveis a incluir: scripts, references e assets.

### Passo 3: Inicializar a Skill

Neste ponto, é hora de realmente criar a skill.

Pule este passo apenas se a skill em desenvolvimento já existir e for necessário iterar ou empacotar. Nesse caso, continue para o próximo passo.

Ao criar uma nova skill do zero, sempre rode o script `init_skill.py`. O script gera convenientemente um novo diretório de skill a partir de um template que inclui automaticamente tudo o que uma skill requer, tornando o processo de criação de skill muito mais eficiente e confiável.

Uso:

```bash
scripts/init_skill.py <skill-name> --path <output-directory>
```

O script:

- Cria o diretório da skill no caminho especificado
- Gera um template de SKILL.md com o frontmatter adequado e placeholders de TODO
- Cria diretórios de recursos de exemplo: `scripts/`, `references/` e `assets/`
- Adiciona arquivos de exemplo em cada diretório que podem ser personalizados ou excluídos

Após a inicialização, personalize ou remova o SKILL.md gerado e os arquivos de exemplo conforme necessário.

### Passo 4: Editar a Skill

Ao editar a skill (recém-gerada ou existente), lembre-se de que a skill está sendo criada para outra instância do Claude usar. Foque em incluir informações que seriam benéficas e não óbvias para o Claude. Considere qual conhecimento procedural, detalhes específicos de domínio ou assets reutilizáveis ajudariam outra instância do Claude a executar essas tarefas com mais eficácia.

#### Comece pelo Conteúdo Reutilizável da Skill

Para iniciar a implementação, comece pelos recursos reutilizáveis identificados acima: arquivos de `scripts/`, `references/` e `assets/`. Note que este passo pode exigir input do usuário. Por exemplo, ao implementar uma skill `brand-guidelines`, o usuário pode precisar fornecer assets de marca ou templates para armazenar em `assets/`, ou documentação para armazenar em `references/`.

Além disso, exclua quaisquer arquivos e diretórios de exemplo desnecessários para a skill. O script de inicialização cria arquivos de exemplo em `scripts/`, `references/` e `assets/` para demonstrar a estrutura, mas a maioria das skills não precisará de todos eles.

#### Atualizar o SKILL.md

**Estilo de Escrita:** Escreva toda a skill usando a **forma imperativa/infinitiva** (instruções começando pelo verbo), e não a segunda pessoa. Use linguagem objetiva e instrucional (ex.: "Para realizar X, faça Y" em vez de "Você deve fazer X" ou "Se você precisar fazer X"). Isso mantém a consistência e a clareza para consumo por IA.

Para completar o SKILL.md, responda às seguintes perguntas:

1. Qual é o propósito da skill, em algumas frases?
2. Quando a skill deve ser usada?
3. Na prática, como o Claude deve usar a skill? Todo o conteúdo reutilizável da skill desenvolvido acima deve ser referenciado para que o Claude saiba como usá-lo.

### Passo 5: Empacotar uma Skill

Uma vez que a skill esteja pronta, ela deve ser empacotada em um arquivo zip distribuível que é compartilhado com o usuário. O processo de empacotamento valida automaticamente a skill primeiro, para garantir que ela atenda a todos os requisitos:

```bash
scripts/package_skill.py <path/to/skill-folder>
```

Especificação opcional do diretório de saída:

```bash
scripts/package_skill.py <path/to/skill-folder> ./dist
```

O script de empacotamento irá:

1. **Validar** a skill automaticamente, verificando:
   - Formato do frontmatter YAML e campos obrigatórios
   - Convenções de nomenclatura da skill e estrutura de diretórios
   - Completude e qualidade da description
   - Organização de arquivos e referências de recursos

2. **Empacotar** a skill se a validação passar, criando um arquivo zip nomeado conforme a skill (ex.: `my-skill.zip`) que inclui todos os arquivos e mantém a estrutura de diretórios adequada para distribuição.

Se a validação falhar, o script reportará os erros e sairá sem criar um pacote. Corrija quaisquer erros de validação e rode o comando de empacotamento novamente.

### Passo 6: Iterar

Após testar a skill, os usuários podem solicitar melhorias. Muitas vezes isso acontece logo após usar a skill, com o contexto fresco de como a skill se comportou.

**Fluxo de trabalho de iteração:**
1. Use a skill em tarefas reais
2. Perceba dificuldades ou ineficiências
3. Identifique como o SKILL.md ou os recursos empacotados devem ser atualizados
4. Implemente as mudanças e teste novamente
