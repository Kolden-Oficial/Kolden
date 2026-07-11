---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Projetar Estratégia de Permissões

**Task ID:** CCM-CONFIG-005
**Version:** 1.0.0
**Command:** `*permission-strategy`
**Orchestrator:** Sigil (config-engineer)
**Purpose:** Projetar uma estratégia abrangente de permissões para um projeto avaliando as necessidades de segurança, selecionando o modo de permissão apropriado e elaborando regras precisas de allow/ask/deny usando a sintaxe `Tool(specifier)` do Claude Code.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Avaliar       | --> | 2. Escolher      | --> | 3. Configurar    |
  |    Necessidades  |     |    Modo de       |     |    Regras de     |
  |    de Segurança  |     |    Permissão     |     |    Allow         |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Configurar    | --> | 5. Definir       | --> |    DOCUMENTO     |
  |    Regras de     |     |    Permissões    |     |    DE            |
  |    Deny          |     |    de Tools MCP  |     |    ESTRATÉGIA    |
  +------------------+     +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Fonte | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Diretório de projeto válido |
| team_size | string | Parâmetro do usuário | Não | `solo`, `small` (2-5), `team` (6+), `enterprise` |
| sensitivity | string | Parâmetro do usuário | Não | `low`, `standard` (padrão), `high`, `regulated` |

---

## Pré-condições

- Compreensão da stack tecnológica do projeto
- Conhecimento da composição da equipe e dos padrões de acesso
- Ciência de quaisquer requisitos de conformidade (SOC2, HIPAA, etc.)

---

## Fases de Execução

### Fase 1: Avaliar as Necessidades de Segurança do Projeto

1. Determinar o perfil de sensibilidade:

| Fator | Peso | Avaliação |
|--------|--------|------------|
| Manipula dados PII/PHI | ALTO | Verificar dados de usuários, prontuários de saúde |
| Possui credenciais de produção | ALTO | arquivos .env, gerenciadores de segredos |
| Integrações com APIs externas | MÉDIO | Serviços de terceiros, webhooks |
| Transações financeiras | ALTO | Processamento de pagamentos, cobrança |
| Projeto de código aberto | BAIXO | Código público, sem segredos |
| Ferramenta interna | MÉDIO | Dados da empresa, APIs internas |

2. Escanear padrões de arquivos sensíveis:
   - `.env`, `.env.*` -- variáveis de ambiente
   - `*.pem`, `*.key`, `*.p12` -- certificados e chaves
   - `secrets/`, `credentials/`, `private/` -- diretórios de segredos
   - `*.tfvars`, `*.tfstate` -- estado do Terraform com segredos
   - `docker-compose.*.yml` -- pode conter credenciais
3. Identificar padrões de operações seguras:
   - Operações somente leitura (git diff, git log, cat)
   - Operações de build/teste (npm run, pytest)
   - Servidores de desenvolvimento (npm run dev, next dev)

### Fase 2: Escolher o Modo de Permissão

Selecionar o modo base com base na avaliação:

| Modo | Usar Quando | Nível de Atrito | Nível de Segurança |
|------|----------|----------------|----------------|
| askAlways | Ambientes regulados, onboarding, alta sensibilidade | Alto | Máximo |
| acceptEdits | Desenvolvimento padrão, base de código confiável, sensibilidade média | Médio | Equilibrado |
| autoApprove | Desenvolvedor solo, baixa sensibilidade, projetos pessoais | Baixo | Mínimo |
| plan | Fluxos de trabalho complexos que exigem aprovação prévia (somente gerenciado) | Médio | Alto |

**Árvore de decisão:**

```
Isto é regulado (SOC2, HIPAA)?
  SIM -> askAlways + regras de deny estritas
  NÃO -> É um projeto de equipe?
    SIM -> acceptEdits + deny/allow abrangentes
    NÃO -> É de alta sensibilidade?
      SIM -> acceptEdits + regras de deny estritas
      NÃO -> autoApprove + regras de deny básicas (ainda negar segredos)
```

Apresentar a recomendação com justificativa. Permitir override do usuário.

### Fase 3: Configurar Regras de Allow

Construir a lista de allow usando a sintaxe `Tool(specifier)`:

**Lembrete da ordem de avaliação:** deny -> ask -> allow (a primeira correspondência vence).

**Padrões comuns de allow por tool:**

| Tool | Padrão | Propósito |
|------|---------|---------|
| `Bash(npm run *)` | Permitir todos os scripts npm | Fluxo de desenvolvimento |
| `Bash(npx *)` | Permitir execução de npx | Execução de ferramentas |
| `Bash(git status)` | Verificação de status do git | Controle de versão |
| `Bash(git diff *)` | Visualização de git diff | Revisão de código |
| `Bash(git log *)` | Histórico do git | Controle de versão |
| `Bash(git add *)` | Staging do git | Controle de versão |
| `Bash(git commit *)` | Commits do git | Controle de versão |
| `Bash(node *)` | Execução de Node.js | Desenvolvimento |
| `Bash(python *)` | Execução de Python | Desenvolvimento |
| `Bash(pytest *)` | Testes em Python | Testes |
| `Read(src/**)` | Ler código-fonte | Desenvolvimento |
| `Read(docs/**)` | Ler documentação | Referência |
| `Read(tests/**)` | Ler arquivos de teste | Testes |
| `Edit(src/**)` | Editar código-fonte | Desenvolvimento |
| `Edit(tests/**)` | Editar arquivos de teste | Testes |
| `WebFetch(domain:*.npmjs.org)` | Registro do NPM | Informações de pacotes |
| `WebFetch(domain:api.github.com)` | API do GitHub | Informações de repositório |
| `MCP(context7)` | Documentação de bibliotecas | Documentação |
| `Agent(Explore)` | Subagente de exploração | Análise |

Personalizar com base nas necessidades detectadas do projeto.

### Fase 4: Configurar Regras de Deny

Construir a lista de deny (avaliada primeiro, maior prioridade):

**Regras de deny obrigatórias (sempre incluir):**

```json
{
  "deny": [
    "Read(./.env)",
    "Read(./.env.*)",
    "Read(./.env.local)",
    "Read(./secrets/**)",
    "Read(./**/*.pem)",
    "Read(./**/*.key)",
    "Read(./**/*.p12)",
    "Bash(rm -rf /)",
    "Bash(rm -rf ~)",
    "Bash(curl * | bash)",
    "Bash(wget * | bash)",
    "Bash(> /dev/sda)"
  ]
}
```

**Regras de deny específicas do projeto:**

| Tipo de Projeto | Regras de Deny Adicionais |
|-------------|----------------------|
| AIOS | `Edit(.aios-core/core/**)`, `Edit(.aios-core/constitution.md)`, `Edit(bin/aios.js)` |
| Infraestrutura | `Bash(terraform apply *)`, `Bash(terraform destroy *)` |
| Banco de Dados | `Bash(psql * DROP *)`, `Bash(mysql * DROP *)` |
| Docker | `Bash(docker rm -f *)`, `Bash(docker system prune *)` |

**Regras de ask (perguntar antes de executar):**

```json
{
  "ask": [
    "Bash(git push *)",
    "Bash(git checkout -- *)",
    "Bash(git reset --hard *)",
    "Edit(./package.json)",
    "Edit(./tsconfig.json)",
    "Bash(npm install *)",
    "Bash(npm uninstall *)"
  ]
}
```

### Fase 5: Definir Permissões de Tools MCP

1. Para cada servidor MCP configurado, adicionar regras de permissão apropriadas:
   - Servidores confiáveis: adicionar à lista de allow (ex.: `MCP(context7)`)
   - Semi-confiáveis: adicionar à lista de ask (ex.: `MCP(filesystem)`)
   - Bloqueados: adicionar à lista de deny (ex.: `MCP(untrusted-server)`)
2. Se enterprise: verificar as listas gerenciadas `allowedMcpServers` / `deniedMcpServers`
3. Para permissões de Agent:
   - Permitir subagents conhecidos e seguros: `Agent(Explore)`, `Agent(Plan)`
   - Agents customizados: adicionar a allow se confiáveis, ask se novos

---

## Formato de Saída

```markdown
## Estratégia de Permissões

**Project:** {project-name}
**Sensitivity:** {level}
**Team:** {size}
**Mode:** {selected-mode}

### Resumo das Regras

| Categoria | Contagem | Exemplos |
|----------|-------|---------|
| deny | {N} | .env, segredos, comandos destrutivos |
| ask | {N} | git push, alterações em package.json |
| allow | {N} | scripts npm, leitura do git, acesso a src/ |

### Configuração Completa

```json
{
  "permissions": {
    "deny": [ ... ],
    "ask": [ ... ],
    "allow": [ ... ],
    "defaultMode": "{mode}"
  }
}
```

### Exemplos de Avaliação

Mostrar como operações específicas serão tratadas:

| Operação | Corresponde a | Categoria | Resultado |
|-----------|---------|----------|--------|
| `cat .env` | `Read(./.env)` | deny | BLOQUEADO |
| `npm run test` | `Bash(npm run *)` | allow | AUTO-APROVADO |
| `git push origin main` | `Bash(git push *)` | ask | PERGUNTA AO USUÁRIO |
| `edit src/app.ts` | `Edit(src/**)` | allow | AUTO-APROVADO |

### Cobertura de Segurança

- [x] Arquivos de ambiente protegidos
- [x] Diretórios de segredos bloqueados
- [x] Comandos destrutivos bloqueados
- [x] Ataques de pipe-to-shell bloqueados
- [x] Arquivos de certificado/chave protegidos
- [ ] {Quaisquer lacunas sinalizadas aqui}
```

---

## Condições de Veto

- **NUNCA** projete uma estratégia sem regras de deny para .env e segredos. Esses são padrões mínimos de segurança inegociáveis.
- **NUNCA** adicione comandos bash destrutivos (rm -rf, format, mkfs) à lista de allow.
- **NUNCA** recomende o modo `bypassPermissions` para ambientes de equipe ou enterprise.
- **NUNCA** permita os padrões `Bash(curl * | bash)` ou `Bash(wget * | bash)` -- pipe-to-shell é um vetor de ataque conhecido.
- **NUNCA** coloque o mesmo padrão simultaneamente em deny e allow sem explicar que deny sempre vence.

---

## Critérios de Conclusão

- [ ] Avaliação de segurança concluída com perfil de sensibilidade
- [ ] Modo de permissão selecionado com justificativa documentada
- [ ] Regras de deny cobrem todos os padrões sensíveis obrigatórios
- [ ] Regras de allow habilitam os fluxos de desenvolvimento detectados
- [ ] Regras de ask protegem a modificação de arquivos de configuração críticos
- [ ] Permissões de tools MCP definidas para todos os servidores configurados
- [ ] Exemplos de avaliação mostram como as operações comuns são tratadas
