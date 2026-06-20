# Gerenciador SYNAPSE

Roteador de comandos CRUD para gerenciar domains, rules e star-commands do SYNAPSE.

---

## O Que Este Comando Faz

Quando o usuário solicita uma operação de gerenciamento do SYNAPSE (criar domain, adicionar rule, editar rule, alternar domain, criar comando ou sugerir domain), este gerenciador identifica o sub-comando e o despacha para o task file apropriado.

---

## Detecção de Sub-Comando

Analise a solicitação do usuário e faça a correspondência com uma destas operações:

| Palavras-Chave de Intenção | Sub-Comando | Task File |
|-----------------|-------------|-----------|
| "criar domain", "novo domain", "adicionar domain" | **create** | `.claude/commands/synapse/tasks/create-domain.md` |
| "adicionar rule", "nova rule", "anexar rule" | **add** | `.claude/commands/synapse/tasks/add-rule.md` |
| "editar rule", "alterar rule", "remover rule", "excluir rule", "atualizar rule" | **edit** | `.claude/commands/synapse/tasks/edit-rule.md` |
| "alternar domain", "habilitar domain", "desabilitar domain", "ativar", "desativar" | **toggle** | `.claude/commands/synapse/tasks/toggle-domain.md` |
| "criar comando", "adicionar comando", "novo comando", "novo star-command" | **add-command** | `.claude/commands/synapse/tasks/create-command.md` |
| "sugerir domain", "qual domain", "onde deveria", "melhor domain para" | **suggest** | `.claude/commands/synapse/tasks/suggest-domain.md` |

---

## Execução

1. **Analise a solicitação do usuário** para identificar o sub-comando a partir da tabela acima.
2. **Extraia os parâmetros** da solicitação (nome do domain, texto da rule, índice, palavras-chave, etc.).
3. **Leia e siga** o task file correspondente em `.claude/commands/synapse/tasks/`.
4. **Se nenhum sub-comando estiver claro**, exiba a saída de ajuda abaixo.

---

## Saída de Ajuda

Se a intenção do usuário não estiver clara ou ele pedir ajuda, exiba:

```
Gerenciador SYNAPSE - Gerenciamento de Domain e Rule

Operações disponíveis:

  create <domain-name>           Cria um novo domain + entrada no manifest
  add <domain-name> "<rule>"     Adiciona uma rule a um domain existente
  edit <domain-name> <index>     Edita ou remove uma rule pelo índice
  toggle <domain-name>           Alterna o domain entre ativo/inativo
  add-command <command-name>     Cria um novo star-command
  suggest "<rule text>"          Sugere o melhor domain para uma rule

Exemplos:
  *synapse create my-custom-rules
  *synapse add agent-dev "Always write tests first"
  *synapse edit agent-dev 3
  *synapse toggle agent-dev
  *synapse add-command review
  *synapse suggest "Use kebab-case for files"

Referência: .claude/commands/synapse/utils/manifest-parser-reference.md
```

---

## Tratamento de Erros

- **Nenhum diretório `.synapse/` encontrado:** Informe ao usuário que o SYNAPSE não está inicializado. Os arquivos de conteúdo de domain devem ser criados primeiro (SYN-8).
- **Nenhum `.synapse/manifest` encontrado:** Mesmo que acima — o manifest é obrigatório para todas as operações.
- **Sub-comando desconhecido:** Exiba a saída de ajuda acima.

---

*Gerenciador SYNAPSE — Roteador para operações CRUD em conteúdo de `.synapse/`.*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3 (C1)*
