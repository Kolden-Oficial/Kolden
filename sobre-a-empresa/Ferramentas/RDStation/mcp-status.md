---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/RDStation/ferramentas]]"
---

# RD Station — MCP Status

Estado do Model Context Protocol da RD Station na Kolden.

Verificado em **2026-08-18**.

---

## Status atual

| Item | Valor |
|------|-------|
| MCP oficial existe? | ✅ **Sim** — lançado por RD Station em **2026-06** |
| Tipo de transporte | **Remote HTTP (Streamable HTTP)** |
| Portal do catálogo | https://mcp.rdstationmentor.com/ |
| Landing marketing | https://rdstation.com/mcp-rd-station/ |
| Arquitetura | **3 servidores separados**, um por produto (não é MCP monolítico) |
| Autenticação | OAuth 2.0 nativo (login com credenciais RD Station — igual a "entrar com Google") |
| Custo adicional | **Zero** (RD não cobra pelo tráfego MCP; só consumo do LLM cliente) |
| Idioma | 100% PT-BR nativo |
| Governança | Confirmação in-chat obrigatória antes de qualquer write; revogação em 1 clique via UI RD |
| **Status na Kolden** | 🟡 **Pendente** — nenhuma conta conectada ainda; primeiro cliente candidato é a Rosie (após confirmação de plano Pro+) |

---

## Endpoints oficiais

| Endpoint | Produto | Requisito de plano |
|----------|---------|-------------------|
| `https://mcp.rdstationmentor.com/marketing` | RD Station Marketing | **Pro e Advanced** (Basic e Light não têm) |
| `https://mcp.rdstationmentor.com/crm` | RD Station CRM | Todos os planos (Free, Basic, Pro, Advanced) |
| `https://mcp.rdstationmentor.com/conversas` | RD Station Conversas | Todos (Basic, Pro, Advanced) |

**Uso cross-produto**: para usar Marketing + CRM + Conversas cruzados, adicionar os 3 conectores separadamente no mesmo cliente MCP; o LLM orquestra as chamadas dentro da conversa.

---

## Fluxo de conexão — 3 passos (<2 minutos)

### Passo 1 — Gerar link único de conexão (por usuário)
1. Abrir https://mcp.rdstationmentor.com/#choose-connector
2. Clicar em **Gerar link de conexão** no conector desejado (Marketing / CRM / Conversas)
3. Fazer login OAuth com credenciais RD Station Kolden e autorizar escopos
4. Copiar a URL personalizada gerada (a URL base é a mesma para todos, mas o OAuth vincula à conta do usuário logado)

### Passo 2 — Configurar no cliente MCP

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "rdstation-marketing": {
      "url": "https://mcp.rdstationmentor.com/marketing"
    },
    "rdstation-crm": {
      "url": "https://mcp.rdstationmentor.com/crm"
    },
    "rdstation-conversas": {
      "url": "https://mcp.rdstationmentor.com/conversas"
    }
  }
}
```

**Claude Code (CLI)**:
```bash
claude mcp add --transport http rdstation-marketing https://mcp.rdstationmentor.com/marketing
claude mcp add --transport http rdstation-crm       https://mcp.rdstationmentor.com/crm
claude mcp add --transport http rdstation-conversas https://mcp.rdstationmentor.com/conversas
```

**Cursor / Gemini CLI / ChatGPT (custom connectors)**: mesmo padrão de URL.
FAQ oficial cita compatibilidade com Claude Desktop, Cursor, ChatGPT e Gemini CLI.
Atenção: Gemini padrão (não CLI) ainda não suporta MCP nativo para integrações externas.

### Passo 3 — Ativar na conversa
- No chat, clicar no "+" próximo do campo e verificar se o conector RD aparece ativo
- Fazer perguntas em PT-BR
- **Toda ação de escrita** (criar, atualizar, deletar) exige **confirmação explícita no chat** antes de executar

---

## Tools expostas (por conector)

A RD não publica um `tools.json` navegável — descoberta é feita na primeira sessão via `list_tools`. Capacidades declaradas oficialmente:

### Marketing (`/marketing`) — plano Pro+ obrigatório
| Capacidade | Escopo |
|-----------|--------|
| Leitura de perfis de Leads | Read |
| Estatísticas de Landing Pages | Read |
| Métricas de Campanhas de E-mail | Read |
| Análise de Funil de Vendas | Read |
| Consulta de Segmentações | Read |
| Automações (via prompts) | Write limitado (**a confirmar in-app** — copy oficial fala em leitura, mas use-cases sugerem disparos) |

### CRM (`/crm`) — todos os planos
| Capacidade | Escopo |
|-----------|--------|
| Leitura E Edição de Oportunidades (deals) | Read + Write |
| Gestão completa de Tarefas | Create/Update/Delete |
| Consulta de Contatos | Read |
| Análises de Follow-ups e Motivos de Perda | Read |
| Cadastro de empresas | Write |
| Mover deals entre estágios | Write |

### Conversas (`/conversas`) — todos os planos
| Capacidade | Escopo |
|-----------|--------|
| Resumo de Conversas Ativas | Read |
| Métricas TME/TMA (Tempo Médio de Resposta/Atendimento) | Read |
| Atribuição de Atendentes | Read |
| CSAT (Customer Satisfaction) | Read |
| Consulta de filas por setor | Read |
| Leitura de histórico de contato | Read |

**Cross-produto** (verificado nos use-cases oficiais): o LLM cruza contatos por e-mail entre Marketing/CRM/Conversas numa mesma sessão.

---

## Análise sob soberania Kolden

| Dimensão | Estado |
|----------|--------|
| **Onde os dados vivem** | Na conta RD Station do cliente (nada exportado). Bucket por usuário, sob demanda, sem cópia persistente. |
| **Chave usada** | OAuth 2.0 do próprio Claude cliente (o operador loga com credencial RD Station). Nenhum client_id/client_secret exposto para o Claude — a RD gerencia. |
| **Custo LLM** | Modelo do cliente (Anthropic/OpenAI/etc.) paga o token normal. RD não cobra tráfego MCP. |
| **Modelo LLM controlado** | Sim — a Kolden escolhe (Claude Opus/Sonnet/Haiku, GPT, Gemini). RD não impõe modelo. |
| **Auditoria** | Toda ação de write pede confirmação in-chat visível ao operador. Revogação em 1 clique na UI RD. |
| **Alternativas** | Se não bastar, ver §Alternativas abaixo. |
| **Isolamento** | Por sessão OAuth de usuário. Não há multi-tenant compartilhado por conta. |

**Compatibilidade com política Kolden de soberania de dados**: ✅ **Alta**. Dados não saem da RD, credencial não é armazenada em plaintext, LLM é da escolha da Kolden, revogação disponível.

**Ressalva**: o MCP oficial roda em infra da RD (`mcp.rdstationmentor.com`), então há **tráfego passando pelos servidores RD** com auth OAuth do operador Kolden. Se soberania total ao ponto de "nada em infra alheia" for exigida, ver §Alternativas.

---

## MCPs de comunidade (3rd party)

Além do oficial, existem alternativas open-source:

| Repo | Autor | Status | Escopo | Nota |
|------|-------|--------|--------|------|
| [`fernandoludvig/rdstation-crm-mcp`](https://github.com/fernandoludvig/rdstation-crm-mcp) | Fernando Ludvig | Ativo (2026) | CRM: contacts, deals, tasks, notes, pipeline health | MIT, alternativa se preferir stdio/self-host do CRM |
| [`mcp-dir/rdstation-mcp`](https://github.com/mcp-dir/rdstation-mcp) | mcp-dir (Douglac) | v0.1.0, jun/2026 | Marketing: contatos, leads, funil, eventos, webhooks | Registro em diretório MCP; URL aponta `api.mcp.ai/p_rdstation` (proxy comunitário, não é oficial) |
| [`deco-cx/apps`](https://github.com/deco-cx/apps) | deco.cx | Ativo | App `rd-station-marketing` como MCP via plataforma deco | Requer conta deco.cx |

**Wrappers-como-serviço** (não são MCPs "puros" para RD, mas expõem RD via MCP próprio):

| Serviço | URL MCP | Nota |
|---------|---------|------|
| **Reportei** | `https://app.reportei.com/mcp` | Expõe RD Marketing + CRM + ~40 outras plataformas via um MCP unificado; OAuth 2.1; requer conta Reportei paga |
| **Kondado** | `https://mcp.kondado.io/mcp` | Replica 18 tabelas RD Marketing em Via Kondado (destino KSQL); consultas SQL em NL; requer conta Kondado paga |

---

## Alternativas se MCP oficial não bastar

1. **n8n com nodes oficiais RDSM/RDSC/RD** — orquestração determinística fora do LLM. Bom quando precisar de idempotência, retry, versionamento de workflow.
2. **Make (Integromat)** — nodes RD Station nativos, no-code, boa para não-devs.
3. **Wrapper Node/Python próprio sobre `api.rd.services`** — necessário para bulk operations que o MCP oficial não cobre (upsert em massa, escrita de custom fields em batch).
4. **Reportei/Kondado** — se o gargalo for análise cross-plataforma (RD + Google Ads + Meta), estes wrappers já resolvem o cruzamento.
5. **Fork de `fernandoludvig/rdstation-crm-mcp`** — para stdio/self-host do CRM, soberania de dados total (roda no Hermes/local Kolden, sem depender de `mcp.rdstationmentor.com`), mas perde-se UX oficial (revogação em 1 clique, confirmação in-chat).

---

## Registro para índice mãe (`Ferramentas/mcp-status.md`)

Entrada canônica para adicionar quando conectar:

**Conectores claude.ai — RD Station (3 conectores):**

```markdown
**RD Station Marketing ⚠** (`https://mcp.rdstationmentor.com/marketing` — pendente de conexão; exige plano Pro+; OAuth com login RD Station do operador; Rosie candidata a piloto)
**RD Station CRM ⚠** (`https://mcp.rdstationmentor.com/crm` — pendente; disponível em todos os planos)
**RD Station Conversas ⚠** (`https://mcp.rdstationmentor.com/conversas` — pendente; disponível em todos os planos)
```

Trocar ⚠ por ✔ quando conectado.

---

## Comparação com outros MCPs Kolden

| Critério | RD Station | HoopCRM | Supabase |
|----------|-----------|---------|----------|
| Endpoint | `mcp.rdstationmentor.com/{produto}` × 3 | `https://mcp.hoopcompany.com/mcp` × 1 | Remote HTTP × 1 por projeto |
| Auth | OAuth 2.0 (conta RD, login por usuário) | OAuth 2.0 (conta Hoop) | Token/OAuth |
| Custo extra | Zero | Zero | Zero |
| Escopo por plano | Marketing só Pro+; CRM/Conversas todos | Cliente-scoped nativo | Por projeto RLS |
| Isolamento | Bucket por usuário; nunca copia base | Cliente-scoped nativo | Por projeto |
| Confirmação de write | ✅ Sim, in-chat | Não documentada | Não |
| Multiproduto num só MCP | ❌ 3 conectores | ✅ 1 conector | ✅ 1 por projeto |
| Idioma | 100% PT-BR | Bilíngue | EN |

**Posicionamento RD Station**: mais conservador em segurança do trio (confirmação in-chat + OAuth). Trade-off: fragmentação em 3 conectores separados para cobrir o ecossistema.

---

## Se decidirmos publicar nosso MCP custom (fork Kolden)

Se a Kolden quiser rodar 100% em infra própria (Hermes local, sem depender de `mcp.rdstationmentor.com`):

**Checklist de tools mínimas**:
- `list_contacts` (query por email, uuid, phone, segmentação)
- `upsert_contact` (PATCH `/platform/contacts/{id}/{val}`)
- `add_tag`, `remove_tag`
- `send_conversion_event` (via `POST /platform/events`)
- `send_ecommerce_event` (para eventos `ECOMMERCE_*`)
- `insert_lead_in_workflow` (POST `/platform/workflows/{id}/leads`)
- `list_workflows`, `get_workflow`
- `list_analytics_emails`
- `list_analytics_funnel`

**Padrão de publicação**:
1. Base: fork de `fernandoludvig/rdstation-crm-mcp` (mais próximo do escopo Kolden)
2. Adicionar suporte a RDSM (`/marketing` endpoints)
3. Deploy em Hermes (`mcp-rdstation.kolden.internal`)
4. Auth: refresh_token do Infisical do cliente
5. Publicar em `Ferramentas/RDStation/mcp-status.md` como MCP Kolden autoral

**Custo**: dev + manutenção contínua conforme RD evoluir a API. Só se justifica se soberania total for exigência inegociável.

---

## Fontes verificadas (2026-08-18)

- https://rdstation.com/mcp-rd-station/ — landing oficial
- https://mcp.rdstationmentor.com/ — portal do catálogo MCP
- https://mcp.rdstationmentor.com/marketing (200 OK, requer OAuth)
- https://mcp.rdstationmentor.com/crm (200 OK, requer OAuth)
- https://mcp.rdstationmentor.com/conversas
- https://mcp.rdstationmentor.com/use-cases — biblioteca oficial de prompts (~25 prompts)
- https://mcp.rdstationmentor.com/how-to-use — 404 (rota anunciada, ainda não publicada)
- https://www.rdstation.com/blog/marketing/mcp-model-context-protocol/ — artigo conceitual (19/06/2026)
- https://www.rdstation.com/blog/marketing/mcp-server/ — artigo arquitetura (01/07/2026)
- https://github.com/fernandoludvig/rdstation-crm-mcp — MCP comunidade CRM
- https://github.com/mcp-dir/rdstation-mcp — registro diretório MCP

---

## Notas / ambiguidades

- **URL única por usuário vs. endpoint base**: RD comunica "link único por usuário" mas os endpoints `/marketing`, `/crm`, `/conversas` são estáveis. Provável: OAuth autentica na conexão inicial e vincula à conta — URL base é a mesma; a personalização é a sessão OAuth. **A confirmar** ao rodar "Gerar link de conexão".
- **Rate limits específicos do MCP**: não documentados. FAQ diz que consumo é gerenciado pelo LLM (Anthropic/OpenAI), mas os rate limits da API RD Station por trás continuam valendo. A confirmar via suporte se houver throttling MCP-específico.
- **Ajuda oficial ausente em `ajuda.rdstation.com`**: busca `site:ajuda.rdstation.com MCP` retorna só artigo geral da API. Feature nova, ainda migrando para base de conhecimento.
- **Página `/how-to-use` retorna 404** apesar de ser CTA no site — provável rota planejada, não entregue.
- **Ambiguidade de writes no Marketing**: copy oficial fala em "análise" (leitura), mas use-cases oficiais incluem "Cadastre empresas e mova deals com um simples comando de texto" (write no CRM). No Marketing os writes disponíveis (criar/pausar campanha? disparar automação?) precisam ser confirmados in-app na primeira sessão.
- **Compatibilidade Gemini**: FAQ diz explicitamente que "Gemini padrão ainda não suporta MCP de forma nativa para integrações externas" — cair no Gemini CLI ou aguardar suporte nativo.
- **`rdstationmentor.com` ≠ `rdstation.com`**: subdomínio distinto, provavelmente reflete o rebranding "RD Mentor AI" como marca-guarda-chuva da IA da RD Station.
