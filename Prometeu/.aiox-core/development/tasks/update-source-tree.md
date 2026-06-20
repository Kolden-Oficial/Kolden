# Task Atualizar a Árvore de Código-Fonte

## Propósito

Validar a governança de documentos para todos os arquivos de dados referenciados pelos agentes. Garante que todo arquivo em `agent-config-requirements.yaml` exista em disco, esteja documentado em `source-tree.md` e tenha um dono e uma regra de preenchimento documentados.

---

## Definição da Task

```yaml
task: updateSourceTree()
responsavel: Orion (Master)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: mode
  tipo: string
  origem: User Input
  obrigatorio: false
  validacao: audit|fix

**Saida:**
- campo: governance_report
  tipo: object
  destino: Console
  persistido: false
```

---

## Passos de Execução

### Passo 1: Carregar agent-config-requirements.yaml

Ler `.aiox-core/data/agent-config-requirements.yaml` e extrair todas as entradas `files_loaded[].path` de todos os agentes.

### Passo 2: Verificar a existência dos arquivos

Para cada caminho de arquivo referenciado:
1. Verificar se o arquivo existe em disco em relação à raiz do projeto
2. Registrar os resultados como OK ou MISSING

### Passo 3: Carregar source-tree.md

Ler `docs/framework/source-tree.md` e extrair todos os arquivos listados nas tabelas da seção "Data File Governance".

### Passo 4: Referência cruzada

Comparar os arquivos do passo 1 com os arquivos do passo 3:
- Arquivos na config mas NÃO no source-tree = **Não documentado** (lacuna de governança)
- Arquivos no source-tree mas NÃO na config = **Não utilizado** (pode estar obsoleto)

### Passo 5: Verificar a titularidade (ownership)

Para cada arquivo nas tabelas de governança:
- Verificar se possui um **Owner** documentado (agente @nome)
- Verificar se possui uma **Fill Rule** documentada (quando/como é atualizado)
- Verificar se possui um **Update Trigger** documentado (o que dispara a atualização)

### Passo 6: Reportar

Apresentar os achados:

```
Source Tree Governance Report
=============================

Files referenced in agent-config-requirements.yaml: {count}
Files documented in source-tree.md: {count}

File Existence:
  OK: {count}
  MISSING: {count} [LIST]

Governance Coverage:
  Documented: {count}
  Undocumented: {count} [LIST]

Ownership:
  With owner: {count}
  Without owner: {count} [LIST]

Fill Rules:
  With fill rule: {count}
  Without fill rule: {count} [LIST]
```

### Passo 7: Corrigir (se mode=fix)

Se `mode=fix`:
1. Adicionar os arquivos ausentes às tabelas de governança do source-tree.md
2. Usar o diretório do arquivo para inferir o dono provável
3. Sinalizar as entradas que precisam de revisão humana para a regra de preenchimento

---

## Critérios de Aceite

```yaml
acceptance-criteria:
  - [ ] All files in agent-config-requirements.yaml verified to exist on disk
    tipo: acceptance-criterion
    blocker: true
  - [ ] All files in agent-config-requirements.yaml documented in source-tree.md
    tipo: acceptance-criterion
    blocker: true
  - [ ] All documented files have owner and fill rule
    tipo: acceptance-criterion
    blocker: true
```

---

## Tratamento de Erros

**Estratégia:** report-and-continue

1. **Arquivo ausente**: Reportar como MISSING mas continuar a validação
2. **Erro de parse no YAML**: Abortar com uma mensagem de erro clara
3. **Erro de parse no source-tree.md**: Avisar e tentar o parse de melhor esforço

---

## Metadata

```yaml
story: ACT-8
version: 1.0.0
dependencies: []
tags:
  - governance
  - documentation
  - validation
updated_at: 2026-02-06
```
