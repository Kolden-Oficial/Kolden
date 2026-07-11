---
task: Download Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
status: active
sprint: 8
story: SQS-6
Entrada: |
  - squad_name: Nome do squad para baixar (obrigatório)
  - version: Versão específica (opcional, default: latest)
  - list: Flag para listar squads disponíveis (--list)
  - overwrite: Flag para sobrescrever squad existente (--overwrite)
Saida: |
  - squad_path: Caminho do squad baixado
  - manifest: Manifest do squad
  - validation_result: Resultado da validação
Checklist:
  - "[ ] Verificar se já existe localmente"
  - "[ ] Buscar no registry.json"
  - "[ ] Baixar arquivos do GitHub"
  - "[ ] Extrair para ./squads/{name}/"
  - "[ ] Validar squad baixado"
  - "[ ] Exibir próximos passos"
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# *download-squad

Baixa squads públicos do repositório GitHub aiox-squads para usar no seu projeto.

## Uso

```bash
@squad-creator

# Listar squads disponíveis
*download-squad --list

# Baixar um squad
*download-squad etl-squad

# Baixar versão específica
*download-squad etl-squad@2.0.0

# Sobrescrever existente
*download-squad etl-squad --overwrite
```

## Exemplos

### Listar Squads Disponíveis

```
*download-squad --list

Available Squads (from aiox-squads):

Official:
  ├── etl-squad@1.0.0 - ETL pipeline automation
  ├── api-squad@1.2.0 - REST API development
  └── devops-squad@1.0.0 - CI/CD automation

Community:
  ├── data-viz-squad@0.5.0 - Data visualization
  └── ml-squad@0.3.0 - Machine learning pipelines
```

### Baixar Squad

```
*download-squad etl-squad

Downloading: etl-squad@1.0.0
  Source: github.com/SynkraAI/aiox-squads/packages/etl-squad
  Target: ./squads/etl-squad/

✓ Downloaded 12 files
✓ Validated successfully

Squad installed! Next steps:
  1. Review: cat squads/etl-squad/squad.yaml
  2. Activate: @squad-creator *activate etl-squad
```

## Opções

| Opção | Descrição |
|--------|-------------|
| `--list` | Lista todos os squads disponíveis no registry |
| `--version` | Baixa versão específica (ex.: @2.0.0) |
| `--overwrite` | Sobrescreve se o squad já existir localmente |
| `--verbose` | Mostra o progresso detalhado do download |

## Como Funciona

```
1. Buscar registry.json em aiox-squads
   ├── Contém squads oficiais e da comunidade
   └── Inclui versão e metadados

2. Encontrar o squad solicitado
   ├── Buscar primeiro nos squads oficiais
   └── Depois nos da comunidade

3. Baixar via GitHub API
   ├── Obter a listagem do diretório
   └── Baixar cada arquivo recursivamente

4. Validar o squad baixado
   ├── Rodar SquadValidator
   └── Reportar warnings/errors

5. Carregar o manifest
   └── Confirmar a instalação
```

## Estrutura do Registry

O registry.json em aiox-squads contém:

```json
{
  "version": "1.0.0",
  "squads": {
    "official": [
      {
        "name": "etl-squad",
        "version": "1.0.0",
        "description": "ETL pipeline automation",
        "author": "SynkraAI"
      }
    ],
    "community": [
      {
        "name": "data-viz-squad",
        "version": "0.5.0",
        "description": "Data visualization",
        "author": "community-member"
      }
    ]
  }
}
```

## Tratamento de Erros

| Erro | Causa | Solução |
|-------|-------|----------|
| `SQUAD_NOT_FOUND` | Squad ausente no registry | Verifique os squads disponíveis com --list |
| `SQUAD_EXISTS` | Já foi baixado | Use a flag --overwrite |
| `REGISTRY_FETCH_ERROR` | Problema de rede | Verifique a conexão |
| `RATE_LIMIT` | Limite da GitHub API | Defina a variável de ambiente GITHUB_TOKEN |

## Implementação

Usa a classe `SquadDownloader` de:
- `.aiox-core/development/scripts/squad/squad-downloader.js`

## Tasks Relacionadas

- `*validate-squad` - Validar squad baixado
- `*publish-squad` - Publicar seu squad no registry
- `*create-squad` - Criar novo squad local

## Story Relacionada

- **SQS-6:** Download & Publish Tasks (Sprint 8)
