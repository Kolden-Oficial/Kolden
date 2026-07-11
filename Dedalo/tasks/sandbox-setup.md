---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Configurar Ambiente Sandbox

**ID da Tarefa:** CCM-CONFIG-006
**Versão:** 1.0.0
**Comando:** `*sandbox-setup`
**Orquestrador:** Sigil (config-engineer)
**Propósito:** Configurar o ambiente sandbox do Claude Code para isolamento de filesystem, restrições de rede e fronteiras de processo, garantindo a execução segura de comandos com o mínimo de atrito.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Avaliar       | --> | 2. Configurar    | --> | 3. Configurar    |
  |    Necessidades  |     |    Modo Sandbox  |     |    Restrições    |
  |    de Isolamento |     |    nas Settings  |     |    de Rede       |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+
  | 4. Configurar    | --> | 5. Testar        |
  |    Fronteiras do |     |    Isolamento do |
  |    File System   |     |    Sandbox       |
  +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Diretório de trabalho | Sim | Diretório de projeto válido |
| platform | string | Detectado automaticamente | Não | `macos`, `linux`, `wsl2`, `windows` |
| isolation_level | string | Parâmetro do usuário | Não | `standard` (padrão), `strict`, `airgapped` |

---

## Pré-condições

- Claude Code instalado e operacional
- Compreensão do acesso ao filesystem e das necessidades de rede exigidos pelo projeto
- A plataforma suporta sandboxing (macOS, Linux, WSL2 -- Windows tem suporte limitado)

---

## Fases de Execução

### Fase 1: Avaliar Necessidades de Isolamento

1. Determine a plataforma e os recursos de sandbox disponíveis:

| Plataforma | Tecnologia de Sandbox | Filesystem | Rede | Status |
|----------|--------------------|------------|---------|--------|
| macOS | Apple Sandbox (Seatbelt) | Suporte completo | Suporte completo | Produção |
| Linux | Landlock + Seccomp | Suporte completo | Suporte completo | Produção |
| WSL2 | Sandbox Linux no WSL | Suporte completo | Suporte completo | Produção |
| Windows (nativo) | Limitado | Parcial | Limitado | Limitado |

2. Levante os requisitos do projeto:
   - Quais diretórios precisam de acesso de escrita? (src/, tests/, docs/, node_modules/)
   - Quais diretórios devem ser somente leitura? (.aios-core/, arquivos de configuração)
   - Quais diretórios devem ser invisíveis? (secrets/, arquivos .env)
   - Que acesso de rede externa é necessário? (registro npm, servidores de API, CDN)
   - É necessário algum comando de sistema fora do sandbox? (git, docker)

3. Escolha o nível de isolamento:

| Nível | Filesystem | Rede | Caso de Uso |
|-------|-----------|---------|----------|
| standard | Escrita no projeto, leitura do home | Permitir domínios conhecidos | Desenvolvimento geral |
| strict | Escrita apenas em src/ | Permitir apenas o essencial | Projetos sensíveis |
| airgapped | Escrita apenas em src/ | Sem rede externa | Regulado/offline |

### Fase 2: Configurar Modo Sandbox nas Settings

Gere a configuração do sandbox em settings.json:

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git", "docker"],
    "allowUnsandboxedCommands": false
  }
}
```

**Configurações-chave explicadas:**

| Configuração | Propósito | Recomendação |
|---------|---------|----------------|
| `enabled` | Habilitar sandbox para comandos bash | `true` para todos os projetos compartilhados |
| `autoAllowBashIfSandboxed` | Pular prompts de permissão para bash em sandbox | `true` -- o sandbox fornece segurança |
| `excludedCommands` | Comandos que ignoram o sandbox | Apenas git, docker se necessário |
| `allowUnsandboxedCommands` | Permitir `dangerouslyDisableSandbox` | `false` salvo necessidade explícita |

### Fase 3: Configurar Restrições de Rede

Configure o acesso de rede usando a seção `network`:

```json
{
  "sandbox": {
    "network": {
      "allowedDomains": [
        "registry.npmjs.org",
        "api.github.com",
        "raw.githubusercontent.com"
      ],
      "allowUnixSockets": [],
      "allowAllUnixSockets": false,
      "allowLocalBinding": false,
      "httpProxyPort": 0,
      "socksProxyPort": 0
    }
  }
}
```

**Listas de domínios permitidos comuns por tipo de projeto:**

| Tipo de Projeto | Domínios a Permitir |
|-------------|-----------------|
| Node.js | registry.npmjs.org, nodejs.org |
| Python | pypi.org, files.pythonhosted.org |
| Frontend | unpkg.com, cdn.jsdelivr.net, fonts.googleapis.com |
| Supabase | *.supabase.co, *.supabase.in |
| GitHub | api.github.com, raw.githubusercontent.com |
| Docker | registry.docker.io, auth.docker.io |
| API Geral | (domínios de API específicos do projeto) |

**Níveis de isolamento:**
- **standard**: Permitir registros de pacotes + APIs do projeto
- **strict**: Permitir apenas registros de pacotes
- **airgapped**: allowedDomains vazio (sem rede externa)

### Fase 4: Configurar Fronteiras do File System

Defina os controles de acesso do filesystem:

```json
{
  "sandbox": {
    "filesystem": {
      "allowWrite": [
        "/src",
        "/tests",
        "/docs",
        "//tmp"
      ],
      "denyWrite": [
        "/.aios-core/core",
        "/node_modules",
        "/.git"
      ],
      "denyRead": [
        "/.env",
        "/.env.*",
        "/secrets"
      ]
    }
  }
}
```

**Referência de prefixos de caminho:**

| Prefixo | Significado | Exemplo |
|--------|---------|---------|
| `//` | Raiz do filesystem | `//tmp/build` |
| `~/` | Diretório home | `~/.ssh`, `~/.kube` |
| `/` | Relativo ao diretório do arquivo de settings | `/src`, `/tests` |
| `./` | Caminho relativo resolvido em tempo de execução | `./output` |

**Acesso de escrita padrão:**

| Nível | Escrita Permitida | Escrita Negada |
|-------|---------------|--------------|
| standard | src/, tests/, docs/, tmp/ | node_modules/, .git/, .aios-core/core/ |
| strict | apenas src/ | Todo o resto |
| airgapped | src/ com revisão | Todo o resto |

**Restrições de leitura (sempre negar):**
- `.env`, `.env.*` -- variáveis de ambiente
- `secrets/`, `private/` -- diretórios de segredos
- `~/.ssh/` -- chaves SSH
- `~/.aws/` -- credenciais AWS
- `~/.kube/` -- configurações do Kubernetes

### Fase 5: Testar Isolamento do Sandbox

1. Verifique se o sandbox está ativo:
   - Execute um comando bash e verifique os indicadores de sandbox
   - Tente ler um caminho negado (deve falhar de forma controlada)
   - Tente escrever em um caminho negado (deve falhar de forma controlada)

2. Teste as restrições de rede:
   - Tente buscar de um domínio permitido (deve ter sucesso)
   - Tente buscar de um domínio não permitido (deve ser bloqueado)

3. Teste as fronteiras do filesystem:
   - Escreva em um caminho permitido (deve ter sucesso)
   - Escreva em um caminho negado (deve ser bloqueado)
   - Leia de um caminho negado (deve ser bloqueado)

4. Documente os resultados dos testes:

| Teste | Esperado | Real | Status |
|------|----------|--------|--------|
| Ler .env | BLOQUEADO | {result} | {PASS/FAIL} |
| Escrever em src/ | PERMITIDO | {result} | {PASS/FAIL} |
| Buscar registro npm | PERMITIDO | {result} | {PASS/FAIL} |
| Buscar domínio aleatório | BLOQUEADO | {result} | {PASS/FAIL} |

---

## Formato de Saída

```markdown
## Configuração do Sandbox

**Plataforma:** {platform}
**Nível de Isolamento:** {standard | strict | airgapped}

### Configurações Aplicadas

```json
{seção sandbox completa do settings.json}
```

### Política de Filesystem

| Caminho | Leitura | Escrita | Justificativa |
|------|------|-------|-----------|
| src/ | Sim | Sim | Desenvolvimento de código-fonte |
| .env | Não | Não | Variáveis de ambiente sensíveis |
| node_modules/ | Sim | Não | Dependências (gerenciadas pelo npm) |
| ... | ... | ... | ... |

### Política de Rede

| Domínio | Permitido | Justificativa |
|--------|---------|-----------|
| registry.npmjs.org | Sim | Instalação de pacotes |
| *.supabase.co | Sim | Acesso ao banco de dados |
| * (todos os outros) | Não | Negação padrão |

### Resultados dos Testes

{Tabela de testes da Fase 5}

### Comandos Excluídos

{Lista de comandos que ignoram o sandbox com justificativa}
```

---

## Condições de Veto

- **NUNCA** desabilite o sandbox sem confirmação explícita do usuário e justificativa documentada.
- **NUNCA** adicione `allowAllUnixSockets: true` em ambientes de produção ou de equipe -- isso ignora as restrições de rede.
- **NUNCA** adicione o diretório home (`~/`) aos caminhos com escrita permitida. Apenas subdiretórios específicos, se for absolutamente necessário.
- **NUNCA** defina `allowUnsandboxedCommands: true` em settings corporativas ou de equipe -- isso permite ignorar todas as proteções do sandbox.
- **NUNCA** adicione domínios curinga (`*`) à lista allowedDomains. Seja específico sobre quais domínios precisam de acesso.

---

## Critérios de Conclusão

- [ ] Plataforma detectada e suporte a sandbox verificado
- [ ] Nível de isolamento selecionado com base na avaliação de segurança
- [ ] Sandbox habilitado nas settings com as flags apropriadas
- [ ] Restrições de rede configuradas com lista de domínios permitidos específica
- [ ] Fronteiras do filesystem definidas com controles de escrita/leitura
- [ ] Isolamento do sandbox testado com resultados documentados
