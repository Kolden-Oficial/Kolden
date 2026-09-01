---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Hoop/ferramentas]]"
---

# Hoop — Status MCP

Estado da integração via **Model Context Protocol** para o HoopCRM, com análise
sob a ótica de soberania de dados da Kolden.

---

## 1. Status atual

✅ **CONECTADO** (Kolden, 2026-08-13) — MCP oficial da Hoop ativo no Claude Code.

```
claude.ai HoopCRM: https://mcp.hoopcompany.com/mcp - ✓ Connected
```

- **Endpoint canônico:** `https://mcp.hoopcompany.com/mcp`
- **Tipo:** MCP **remote HTTP** (conector claude.ai — funciona no Claude Desktop e
  Claude Code)
- **Mantido por:** Hoop Company (oficial, não comunitário)
- **Escopo:** dados da loja do usuário conectado (autenticado via chave Anthropic
  vinculada no HoopCRM)
- **Fonte oficial:** [Como Conectar o HoopCRM ao Claude via MCP](https://hoopdecor.crisp.help/pt-br/article/como-conectar-o-hoopcrm-ao-claude-via-mcp-1r6zsqi/)

Isso posiciona a Hoop **à frente da Kommo** em termos de estratégia AI-first
(a Kommo ainda não tem MCP oficial — só comunidade `Miguelgbastos/Kommo-MCP`).

### ⭐ Vinculação MCP + API REST (edição máxima)

Complementado por API REST autenticada via `HOOP_API_KEY` (Infisical `dev`) em
`https://api.hoopdecor.com`. Padrão canônico de uso combinado documentado em
[`api.md` §16-B](api.md).

Resumo:
- **MCP** = interação humana com Claude no loop (consulta ad-hoc, criação 1-por-vez,
  descoberta)
- **REST direta** = automação sem humano (batch, webhook, cron, Hermes wrapper)

Ambos usam a mesma conta Hoop — sem conflito de estado.

---

## 2. Fluxo de conexão

### 2.1 Gerar Token no HoopCRM

1. HoopCRM > passar mouse no ícone de perfil > **Loja**
2. **Loja > Tokens e Integrações**
3. **Novo Token** → nome (ex.: `Claude MCP`)

### 2.2 Criar chave da API Anthropic

1. Acessar https://platform.claude.com/ (login com conta Anthropic)
2. Página de **API Keys** > **Criar nova chave**
3. Nomear (ex.: `HoopCRM MCP`), Adicionar
4. **Copiar a chave** (mostrada uma única vez)

### 2.3 Vincular no HoopCRM

1. Voltar ao HoopCRM (aba de criação do Token MCP)
2. Colar a chave Anthropic no campo correspondente
3. Clique **Criar**
4. Sistema exibe **URL do conector MCP** — copiar (será usada no Claude Desktop)

### 2.4 Adicionar em Claude Desktop

1. Claude Desktop > **Personalizar** > **Conectores** > **Adicionar Conector
   Personalizado**
2. Preencher:
   - **Nome**: `Hoop` (ou identificador da conta)
   - **URL**: cole a URL do conector MCP copiada
3. Adicionar → conector aparece na lista

### 2.5 Configurar permissões

1. Clique no conector Hoop > **Permissões de Ferramenta**
2. Trocar todas as opções para **"Sempre Permitir"** (evita aprovação manual em
   cada ação)
3. Nesta tela também é possível **revisar quais ferramentas e dados** o conector
   tem acesso

### 2.6 Usar em conversas

- Nova conversa Claude → conector Hoop ativo automaticamente
- Perguntas exploratórias: `"O que eu consigo fazer com o MCP do Hoop?"` → Claude
  lista as capabilities
- Desligar por conversa (sem remover a integração): botão no header da conversa

⚠️ **Para gerar dashboards no Claude, é necessário possuir créditos Anthropic:**
https://platform.claude.com/settings/billing

---

## 3. Tools expostas

**Não documentadas explicitamente** no artigo oficial — o Claude descobre a lista
dinamicamente via listing do MCP server. Estratégia recomendada:

1. Conectar em ambiente de teste
2. Perguntar: `"Liste todas as tools do MCP Hoop com uma linha cada"`
3. Documentar aqui após a resposta

Capacidades esperadas (por inferência das superfícies do produto):

- Consultar orçamentos por filtros (vendedor, especificador, período, valor)
- Detalhes de orçamento (produtos, versões, formas de pagamento)
- Consultar pedidos
- Consultar clientes (por CPF/CNPJ/telefone/nome)
- Consultar especificadores (arquitetos) + RTs
- Consultar produtos + estoque (múltiplas lojas)
- Consultar funil (por etapa)
- Ações possíveis: criar orçamento, criar contato, criar atividade,
  movimentar card entre etapas do funil, gerar dashboard

Refinar após primeira conexão real.

---

## 4. Análise sob soberania Kolden

| Dimensão | Nota | Comentário |
|----------|------|------------|
| Onde os dados vivem | 🟡 Amarelo | Dados **passam por API Anthropic** durante o uso (Claude Desktop). Não passam por servidor de terceiro além disso. |
| Chave usada | 🟢 Nossa | Chave é `ANTHROPIC_API_KEY` da conta Kolden — controle nosso |
| Custo | 🟡 Ambos | Créditos Anthropic (por token) + plano Hoop (fixo mensal) |
| Modelo LLM | 🟢 Escolhido por nós | Claude Desktop → escolhemos qual modelo Claude usar |
| Auditoria de tools chamadas | 🟢 Sim | Claude Desktop mostra cada tool call |
| Alternativa se Anthropic cair | 🔴 Não | MCP hospedado pelo Hoop **só funciona com Claude** (não com GPT/Gemini) |
| Isolamento por conversa | 🟢 Sim | Botão de desligar por conversa |

**Comparado ao AI Agent do Kommo:**
- Kommo AI: sistema fechado, LLM não escolhido, cobra em créditos próprios
- Hoop MCP: LLM escolhido (Claude), cobra créditos Anthropic (que já pagamos)
- **Vantagem Hoop:** integra com nosso stack Anthropic nativamente. Sem
  "duplicação de créditos".

---

## 5. MCPs de comunidade (3rd party)

Verificado 2026-08-13:

- **GitHub**: buscas por `hoop-mcp`, `hoopcrm-mcp`, `hoopdecor-mcp`, `hoopcompany-mcp` — **nenhum resultado relevante**
- **LobeHub**: sem entrada para HoopCRM (só há entradas para o **outro** produto `hoop.dev` — dev tool não relacionada)
- **MCP Market**: sem entrada
- **Composio**: sem entrada

⚠️ **Cuidado com homônimos**: existem outras marcas usando "Hoop":
- `hoop.dev` — gateway de acesso seguro para databases (dev tool)
- `hoopai.com` — outro CRM com IA
- `hoopinteractive.com` — agência de dev

Nenhum é a Hoop Company brasileira que estamos documentando.

---

## 6. Alternativas se o MCP oficial não bastar

### 6.1 Wrapper próprio Kolden

Se o MCP oficial expuser conjunto limitado de tools ou não permitir determinada
ação, construir wrapper próprio em `sobre-a-empresa/Ferramentas/Hoop/src/`
(padrão MCP Íris — nosso primeiro MCP custom, Ritual do Caos 2026-07-01,
maturity 10.0/10):

- TypeScript + Docker
- Env via Infisical (`HOOP_KOLDEN_API_TOKEN` + `HOOP_KOLDEN_APP_URL`)
- Consome endpoints REST inferidos (ver `api.md` §14)
- Suporte a **todas as tools ausentes** do MCP oficial

Vantagem: usa **API cliente-scoped** direto, sem passar pelo servidor MCP Hoop.

### 6.2 Webhook-first (não-MCP)

Para automação passiva (não conversacional), plugar webhooks Hoop no Hermes:

- Loja > APIs > Novo Webhook → `https://hermes.kolden.com.br/webhooks/hoop`
- Hermes reage a eventos (orçamento criado, pedido gerado, estoque alterado)
- Sem MCP, sem consumir créditos Anthropic
- Ideal para logging/sync unidirecional

### 6.3 n8n bridge

HTTP Request node do n8n com Bearer token → endpoints Hoop descobertos. Bom
quando o cliente já opera n8n e não quer complicar com MCP.

---

## 7. Se decidirmos publicar nosso MCP Hoop custom

Checklist mínimo de tools que faríamos:

**Leitura:**
- `get_negocios(filtro?, page?, limit?)` — listar orçamentos com filtros
- `get_negocio(id)` — detalhes de um orçamento
- `get_pedidos(filtro?)` — listar pedidos
- `get_produtos(filtro?)` — listar produtos + estoque
- `get_clientes(filtro?)` — buscar por CPF/CNPJ/telefone
- `get_especificadores(filtro?)` — buscar arquitetos
- `get_relatorio_rts(periodo?)` — RTs consolidadas
- `get_funis()` — listar funis com etapas
- `get_webhooks()` — listar webhooks cadastrados
- `get_tokens()` — listar tokens ativos

**Escrita:**
- `create_negocio(payload)` — criar orçamento
- `update_negocio(id, patch)` — atualizar orçamento
- `add_produto_orcamento(id, produto)` — adicionar produto
- `gerar_pedido(orcamento_id, payload)` — converter em pedido
- `create_cliente(payload)`
- `create_especificador(payload)`
- `create_atividade(negocio_id, payload)` — follow-up
- `mover_card_funil(negocio_id, etapa_destino)`
- `enviar_pedido_erp(pedido_id)` — dispara callback Lift/Bling
- `add_webhook(nome, callback_url)`

Publicação: `Kolden-Oficial/kolden-hoop-mcp` (privado, MIT-style).

---

## 8. Registro (a atualizar em `mcp-status.md` raiz)

Adicionar entrada na tabela de Marketing/CRM do `sobre-a-empresa/Ferramentas/mcp-status.md`:

- **HoopCRM (Kolden ativa):** ✅ **MCP oficial disponível** (remote HTTP,
  Claude Desktop conector personalizado). Requer `HOOP_KOLDEN_MCP_URL` +
  `ANTHROPIC_API_KEY` no Infisical. Ativação sob demanda pelo usuário no Claude
  Desktop de cada operador. Ver `Hoop/ferramentas.md` §Contas provisionadas.

E na tabela principal do `sobre-a-empresa/Ferramentas/ferramentas.md`, seção
Marketing/CRM.

---

## 9. Comparação com outros MCPs Kolden

| MCP | Tipo | Escopo | Custo | Status |
|-----|------|--------|-------|--------|
| Solomon oficial | Remote HTTP (Cloud Run) | Read-only analytics | Créditos Anthropic + plano Solomon | ✔ conectado |
| MCP Íris (Solomon custom) | stdio local (npx) via Infisical | Write API Solomon (Rosie) | Créditos Anthropic + plano Solomon | ✔ conectado (custom Kolden) |
| Kommo (Miguelgbastos comunidade) | Docker TS | 25 tools CRUD | Créditos Anthropic + plano Kommo | 🟡 disponível, não instalado |
| **Hoop oficial** | **Remote HTTP** | **Dados da loja + ações** | **Créditos Anthropic + plano Hoop** | **⭐ disponível para ativar** |

Hoop se aproxima do padrão Solomon oficial (remote HTTP) — modelo mais moderno,
sem stdio local, sem Docker. Trade-off: dependemos de conectividade contínua
com o servidor Hoop, mas ganhamos zero-config de infraestrutura.

---

## 10. Fontes verificadas (2026-08-13)

| URL | O que confirma |
|-----|----------------|
| https://hoopdecor.crisp.help/pt-br/article/como-conectar-o-hoopcrm-ao-claude-via-mcp-1r6zsqi/ | MCP oficial existe, fluxo completo, requer chave Anthropic |
| https://hoopdecor.crisp.help/pt-br/article/api-como-criar-um-token-kw83o4/ | Fluxo canônico de token (usado no setup MCP) |
| Busca semântica `"hoop" mcp claude` | Confirma MCP como feature real e distingue de outros produtos "Hoop" homônimos |
| Busca `hoopcrm-mcp OR hoopdecor-mcp github` | Zero resultados de comunidade → MCP oficial é o único caminho |
