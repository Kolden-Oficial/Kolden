---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Configuração Empresarial

**ID da Tarefa:** CCM-CONFIG-007
**Versão:** 1.0.0
**Comando:** `*enterprise-config`
**Orquestrador:** Sigil (config-engineer)
**Propósito:** Gerar e implantar configuração de nível empresarial do Claude Code usando managed-settings.json para imposição de políticas organizacionais, integração com MDM, regras de conformidade e implantação padronizada de servidores MCP entre equipes.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Configurar    | --> | 2. Configurar    | --> | 3. Configurar    |
  |    managed-      |     |    Políticas de  |     |    managed-      |
  |    settings.json |     |    MDM/Nível-SO  |     |    mcp.json      |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+
  | 4. Configurar    | --> | 5. Implantar     |
  |    Regras de     |     |    em Toda a      |
  |    Conformidade  |     |    Organização   |
  +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| org_name | string | Parâmetro do usuário | Sim | Identificador da organização |
| compliance | array | Parâmetro do usuário | Não | Frameworks de conformidade: `soc2`, `hipaa`, `gdpr`, `pci`, `iso27001` |
| platform_targets | array | Parâmetro do usuário | Não | `macos`, `linux`, `windows`, `wsl2` (padrão: todos) |
| team_count | number | Parâmetro do usuário | Não | Número de desenvolvedores/equipes usando o Claude Code |

---

## Pré-condições

- Acesso administrativo para implantar arquivos de managed settings
- Compreensão das políticas de segurança organizacionais
- Acesso ao sistema MDM (para implantação de plist no macOS ou registro no Windows)
- Conhecimento das ferramentas e servidores MCP aprovados para a organização

---

## Fases de Execução

### Fase 1: Configurar managed-settings.json

Crie o arquivo de managed settings que não pode ser sobrescrito por configurações de usuário ou de projeto:

**Locais de implantação (um por plataforma):**

| Plataforma | Caminho |
|------------|---------|
| macOS | `/Library/Application Support/ClaudeCode/managed-settings.json` |
| Linux/WSL | `/etc/claude-code/managed-settings.json` |
| Windows | `C:\Program Files\ClaudeCode\managed-settings.json` |

**Template base:**

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./**/*.pem)",
      "Read(./**/*.key)",
      "Bash(rm -rf /)",
      "Bash(curl * | bash)",
      "Bash(wget * | bash)"
    ],
    "defaultMode": "acceptEdits"
  },
  "disableBypassPermissionsMode": "disable",
  "allowManagedPermissionRulesOnly": false,
  "env": {
    "CLAUDE_CODE_EFFORT_LEVEL": "high",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "80"
  },
  "companyAnnouncements": [
    "{org_name}: Use o Claude Code de forma responsável. Reporte problemas em #ai-tools."
  ]
}
```

**Chaves de política exclusivas de managed:**

| Chave | Tipo | Propósito | Recomendação |
|-------|------|-----------|--------------|
| `disableBypassPermissionsMode` | `"disable"` | Impedir que usuários ignorem permissões | Sempre defina em ambiente empresarial |
| `allowManagedPermissionRulesOnly` | boolean | Apenas regras de deny/allow gerenciadas se aplicam | `true` para ambientes regulados |
| `allowManagedHooksOnly` | boolean | Apenas hooks gerenciados podem executar | `true` para alta segurança |
| `allowManagedMcpServersOnly` | boolean | Apenas servidores MCP gerenciados permitidos | `true` para conformidade |
| `companyAnnouncements` | string[] | Mensagens exibidas a todos os usuários | Use para políticas e lembretes |

### Fase 2: Configurar Políticas de MDM/Nível-SO

Para organizações que usam Mobile Device Management:

**macOS (plist):**
```xml
<!-- com.anthropic.claudecode.plist -->
<dict>
  <key>disableBypassPermissionsMode</key>
  <string>disable</string>
  <key>permissions</key>
  <dict>
    <key>defaultMode</key>
    <string>acceptEdits</string>
    <key>deny</key>
    <array>
      <string>Read(./.env)</string>
      <string>Read(./.env.*)</string>
      <string>Read(./secrets/**)</string>
    </array>
  </dict>
</dict>
```

**Windows (Registro):**
```
HKLM\SOFTWARE\Policies\ClaudeCode\
  disableBypassPermissionsMode = "disable" (REG_SZ)
  permissions\defaultMode = "acceptEdits" (REG_SZ)
```

**Linux (baseado em arquivo):**
Implante `/etc/claude-code/managed-settings.json` via gerenciamento de configuração (Ansible, Chef, Puppet).

Forneça scripts de implantação específicos por plataforma ou trechos de configuração.

### Fase 3: Configurar managed-mcp.json

Crie a configuração MCP gerenciada para ferramentas organizacionais padrão:

**Locais de implantação:**

| Plataforma | Caminho |
|------------|---------|
| macOS | `/Library/Application Support/ClaudeCode/managed-mcp.json` |
| Linux/WSL | `/etc/claude-code/managed-mcp.json` |
| Windows | `C:\Program Files\ClaudeCode\managed-mcp.json` |

**Template:**

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"],
      "env": {}
    }
  },
  "allowedMcpServers": [
    { "serverName": "context7" },
    { "serverName": "playwright" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" }
  ]
}
```

**Estratégia de allowlisting de servidores:**

| Estratégia | Configuração | Caso de Uso |
|------------|--------------|-------------|
| Aberta (padrão) | Sem restrições | Equipes confiáveis, experimental |
| Allowlist | array `allowedMcpServers` | Equipes padrão, controle moderado |
| Apenas gerenciados | `allowManagedMcpServersOnly: true` | Ambientes regulados |
| Blocklist | array `deniedMcpServers` | Bloquear servidores específicos conhecidamente arriscados |

### Fase 4: Configurar Regras de Conformidade

Para cada framework de conformidade, adicione regras específicas:

**SOC2:**
```json
{
  "permissions": {
    "deny": [
      "Read(./**/*.pem)", "Read(./**/*.key)",
      "Bash(curl * | bash)", "Bash(wget * | bash)"
    ]
  },
  "disableBypassPermissionsMode": "disable",
  "sandbox": {
    "network": { "allowManagedDomainsOnly": true }
  }
}
```

**HIPAA (dados de saúde):**
```json
{
  "permissions": {
    "deny": [
      "Read(./patient-data/**)", "Read(./phi/**)",
      "WebFetch"
    ],
    "defaultMode": "askAlways"
  },
  "allowManagedPermissionRulesOnly": true,
  "allowManagedMcpServersOnly": true
}
```

**GDPR (dados pessoais):**
```json
{
  "permissions": {
    "deny": [
      "Read(./user-data/**)", "Read(./pii/**)",
      "Read(./**/personal/**)"
    ]
  },
  "companyAnnouncements": [
    "GDPR: Não cole dados pessoais em prompts do Claude Code."
  ]
}
```

**PCI-DSS (dados de pagamento):**
```json
{
  "permissions": {
    "deny": [
      "Read(./payment/**)", "Read(./**/*card*)",
      "Read(./**/*billing*)"
    ],
    "defaultMode": "askAlways"
  },
  "disableBypassPermissionsMode": "disable"
}
```

Mescle as regras de conformidade com o managed-settings.json base.

### Fase 5: Implantar em Toda a Organização

1. Gere os artefatos de implantação:
   - `managed-settings.json` para cada plataforma
   - `managed-mcp.json` para cada plataforma
   - Perfis MDM (plist para macOS, registro para Windows)
   - CLAUDE.md gerenciado (opcional, para instruções de toda a organização)
2. Crie a documentação de implantação:
   - Instruções de instalação por plataforma
   - Comandos de verificação para confirmar a implantação
   - Procedimento de rollback
3. Forneça um checklist de verificação:

```bash
# Verificar se os managed settings foram carregados (executar como usuário)
# O Claude Code exibirá indicadores de política gerenciada na UI

# Verificar se o arquivo gerenciado existe
# macOS:
ls -la "/Library/Application Support/ClaudeCode/managed-settings.json"
# Linux:
ls -la /etc/claude-code/managed-settings.json
# Windows:
dir "C:\Program Files\ClaudeCode\managed-settings.json"
```

---

## Formato de Saída

```markdown
## Pacote de Configuração Empresarial

**Organização:** {org_name}
**Conformidade:** {frameworks}
**Plataformas:** {targets}
**Equipes:** {team_count}

### Arquivos Gerados

| Arquivo | Plataforma | Propósito | Implantar Em |
|---------|------------|-----------|--------------|
| managed-settings.json | {platform} | Imposição de política | {path} |
| managed-mcp.json | {platform} | Servidores MCP padrão | {path} |
| CLAUDE.md | Todas | Instruções de toda a organização | {path} |
| {mcp-profile} | macOS | Implantação via MDM | Jamf/Intune |

### Resumo das Políticas

| Política | Configuração | Efeito |
|----------|--------------|--------|
| Bypass desativado | disableBypassPermissionsMode: disable | Usuários não podem pular permissões |
| Apenas regras gerenciadas | allowManagedPermissionRulesOnly: {val} | {effect} |
| Apenas MCP gerenciado | allowManagedMcpServersOnly: {val} | {effect} |
| Restrição de rede | allowManagedDomainsOnly: {val} | {effect} |

### Regras de Deny (total: {count})

{Lista numerada de todas as regras de deny com categorias}

### Servidores MCP Aprovados

| Servidor | Propósito | Status |
|----------|-----------|--------|
| {name} | {purpose} | Permitido/Gerenciado |

### Instruções de Implantação

{Passos de implantação específicos por plataforma}

### Verificação

{Comandos para verificar a implantação em cada plataforma}

### Rollback

{Passos para remover os managed settings se necessário}
```

---

## Condições de Veto

- **NUNCA** gere configuração empresarial sem `disableBypassPermissionsMode: "disable"`. Este é o controle de segurança empresarial fundamental.
- **NUNCA** inclua chaves de API, tokens ou credenciais reais em arquivos de configuração gerenciada. Use referências a variáveis de ambiente.
- **NUNCA** defina `allowManagedPermissionRulesOnly: true` sem também incluir regras de deny abrangentes. Isso deixaria o sistema desprotegido.
- **NUNCA** implante o managed-settings.json sem fornecer um procedimento de rollback. Erros de configuração no nível gerenciado afetam todos os usuários.
- **NUNCA** omita regras específicas de conformidade quando um framework de conformidade for especificado. Conformidade parcial é pior que não conformidade documentada.

---

## Critérios de Conclusão

- [ ] managed-settings.json gerado com regras deny-first e chaves de política empresarial
- [ ] Método de implantação MDM/nível-SO documentado para as plataformas-alvo
- [ ] managed-mcp.json gerado com lista de servidores aprovados
- [ ] Regras de conformidade integradas para todos os frameworks especificados
- [ ] Instruções de implantação criadas por plataforma
- [ ] Comandos de verificação fornecidos
- [ ] Procedimento de rollback documentado
