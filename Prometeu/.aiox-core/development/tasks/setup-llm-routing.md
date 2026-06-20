# setup-llm-routing

**Task ID:** setup-llm-routing
**Version:** 1.1.0
**Created:** 2025-12-12
**Updated:** 2025-12-14
**Agent:** @dev (Dex)
**Location:** .aiox-core/development/tasks/setup-llm-routing.md

---

## Propósito

Configurar o roteamento de LLM do Claude Code para usar provedores alternativos (DeepSeek, OpenRouter) em vez de, ou junto com, a API direta da Anthropic. Isso permite uma redução de custo de até 100x mantendo a funcionalidade completa do Claude Code, incluindo tool calling.

**Comandos principais instalados:**
- `claude-max`: Usa a assinatura Claude Max (OAuth/claude.ai)
- `claude-free`: Usa a API DeepSeek (~$0.14/M tokens)

---

## Instalação Rápida

Para a maioria dos usuários, basta rodar o instalador:

```bash
node .aiox-core/infrastructure/scripts/llm-routing/install-llm-routing.js
```

Isso irá:
1. Detectar seu SO (Windows/Unix)
2. Instalar os comandos `claude-max` e `claude-free`
3. Configurar os caminhos automaticamente

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo
- Usa padrões sensatos
- **Melhor para:** Usuários experientes, testes rápidos

### 2. Modo Interativo **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Configuração na primeira vez

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Operating system is Windows, macOS, or Linux
    blocker: true
    error_message: "Unsupported operating system"

  - [ ] Network connectivity available (for DeepSeek mode)
    blocker: false
    error_message: "Internet required for cloud LLM routing"
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Commands installed in PATH
    blocker: true
    validação: |
      Windows: where claude-free.cmd
      Unix: which claude-free

  - [ ] DEEPSEEK_API_KEY available (for claude-free)
    blocker: false
    validação: |
      Check .env file or environment variable
```

---

## Critérios de Aceite

```yaml
acceptance-criteria:
  - [ ] claude-max command works
    blocker: true
    validação: claude-max --version

  - [ ] claude-free command works (with API key)
    blocker: true
    validação: claude-free --version

  - [ ] Tool calling works with DeepSeek
    blocker: true
    validação: Test function call succeeds
```

---

## Processo

### Passo 1: Rodar o Instalador

```bash
# A partir da raiz do aiox-core
node .aiox-core/infrastructure/scripts/llm-routing/install-llm-routing.js
```

### Passo 2: Configurar a Chave de API do DeepSeek (para claude-free)

#### Opção A: Arquivo .env do projeto

```bash
# Crie o .env na raiz do seu projeto
DEEPSEEK_API_KEY=sk-your-key-here
```

#### Opção B: Variável de ambiente global

```bash
# Windows
setx DEEPSEEK_API_KEY "sk-your-key-here"

# Unix
export DEEPSEEK_API_KEY="sk-your-key-here"
# Adicione ao ~/.bashrc ou ~/.zshrc para persistência
```

### Passo 3: Verificar a Instalação

```bash
# Testar claude-max (usa OAuth)
claude-max --version

# Testar claude-free (usa DeepSeek)
claude-free --version
```

---

## Uso

### claude-max
Usa sua assinatura Claude Max via OAuth (login claude.ai).
- Não requer chave de API
- Capacidades completas do Claude
- ~$15/M tokens se usar cobrança via API

```bash
claude-max
```

### claude-free
Usa a API DeepSeek com endpoint compatível com Anthropic.
- Requer DEEPSEEK_API_KEY
- Suporta tool calling
- ~$0.14/M tokens

```bash
claude-free
```

---

## Comparação de Custos

| Provedor | Entrada | Saída | Notas |
|----------|-------|--------|-------|
| Claude (API) | $15/M | $75/M | API direta da Anthropic |
| Claude (Max) | Incluído | Incluído | Baseado em assinatura |
| DeepSeek | $0.07/M | $0.14/M | Endpoint nativo Anthropic |

**Economia com DeepSeek:** ~99% de redução de custo

---

## Solução de Problemas

### Comando não encontrado
- **Windows:** Garanta que `%APPDATA%\npm` esteja no PATH
- **Unix:** Garanta que `/usr/local/bin` ou `~/bin` esteja no PATH

### Erro de chave de API
1. Crie o `.env` na raiz do projeto
2. Adicione: `DEEPSEEK_API_KEY=sk-your-key`
3. Obtenha a chave em: <https://platform.deepseek.com/api_keys>

### Tool calling falha
- Verifique se o endpoint da API DeepSeek está acessível
- Confira se a chave de API é válida
- O endpoint `/anthropic` do DeepSeek suporta tools

---

## Referências

- [DeepSeek API](<https://platform.deepseek.com/api_keys>)
- [Documentação do Claude Code](<https://docs.anthropic.com/claude-code>)
- Definição da Ferramenta: `.aiox-core/infrastructure/tools/cli/llm-routing.yaml`
- Script de Instalação: `.aiox-core/infrastructure/scripts/llm-routing/install-llm-routing.js`

---

## Metadados

```yaml
story: "6.7"
version: 1.1.0
migrated_from: aiox-core
dependencies:
  - install-llm-routing.js
  - llm-routing.yaml
tags:
  - llm-routing
  - cost-optimization
  - deepseek
  - claude-max
  - claude-free
updated_at: 2025-12-14
```

---

**Status:** Pronto para Produção
**Testado em:** Windows 11, macOS, Linux
