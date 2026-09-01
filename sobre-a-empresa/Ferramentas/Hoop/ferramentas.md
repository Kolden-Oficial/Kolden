---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Hoop/docs-oficiais|docs-oficiais]]"
  - "[[sobre-a-empresa/Ferramentas/Hoop/api|api]]"
  - "[[sobre-a-empresa/Ferramentas/Hoop/mcp-status|mcp-status]]"
---

# Hoop (HoopDecor / HoopCRM) — Referência de Uso

CRM vertical brasileiro para lojas de decoração/móveis com foco em atendimento a
arquitetos ("especificadores"). Combina **orçamentos multi-ambiente com catálogo
privado**, **gestão de RTs** (Reserva Técnica = comissão do arquiteto), funil de
vendas configurável, integração ativa com ERPs (Bling v3.0, Tiny, Lift, Olist) e
plataformas de e-commerce (WooCommerce, VTEX, VNDA, Nuvemshop, Tray), WhatsApp em
3 superfícies distintas (Meta Cloud API, Extensão Chrome, Plugin widget) e — desde
2026 — **MCP oficial remoto para Claude Desktop**.

Fantasia "Hoop Company", produto "HoopDecor" / "HoopCRM" (mesma aplicação, 3 domínios).
Concorrente vertical dos CRMs horizontais (Kommo/RD/GHL) no nicho de móveis/decoração
com relacionamento arquiteto-loja.

---

## Identidade jurídica

| Campo | Valor |
|-------|-------|
| Razão social | HOOP TECNOLOGIA DA INFORMACAO LTDA |
| Nome anterior (matriz PP) | HOOP COMPANY - DESENVOLVIMENTO E LICENCIAMENTO DE SOFTWARE LTDA - ME |
| Fantasia | HOOP COMPANY |
| CNPJ | 29.920.190/0001-47 |
| Fundação | 13/03/2018 |
| Situação | Ativa desde a fundação |
| Sede | Rua Indianópolis, 20 / Rua Nilo Peçanha, 1221 · Três Figueiras · Porto Alegre/RS · CEP 91330-060/000 |
| Sócios | Eric Maltz Turkienicz, Matheus Leite Serpa da Ros, Rafael Freitas D'Arrigo, Reck Gambim (Administrador) |
| Contato geral | contato@hoopcompany.com |
| DPO (LGPD) | contato@hoopcompany.com |
| Empresa antecessora | HOOP NETWORKS (CNPJ 10.787.546/0001-98 — mesma sede, baixada em 2018) |

---

## Domínios ativos (verificado 2026-08-13)

| Domínio | Papel |
|---------|-------|
| `hoopcompany.com` | Site institucional / landing de captação |
| `hoopdecor.com` | Aplicação de produto (canonical) |
| `hoopcrm.com` | Alias/rebrand da aplicação (mesmo conteúdo do hoopdecor.com) |
| `dev.hoopdecor.com` | Ambiente dev/staging da aplicação + hospedagem dos termos legais |
| `hoopdecor.crisp.help/pt-br/` | Central de Ajuda oficial (hospedada no Crisp) — todas as docs de usuário e integração |
| `hoopdecor.com/<store-id>/catalogo/...` | Catálogos digitais públicos das lojas clientes |

---

## Contas provisionadas — Kolden

> Provisionamento **ativo e confirmado ao vivo em 2026-08-13**.

| Atributo | Valor |
|----------|-------|
| **MCP oficial** | ✅ **Conectado** — `claude.ai HoopCRM: https://mcp.hoopcompany.com/mcp` |
| **API Key (REST)** | ✅ **Cadastrada** — `HOOP_API_KEY` no Infisical `dev` (1384 chars, provável JWT com scopes embutidos) |
| **Base URL API REST** | `https://api.hoopdecor.com` (endpoint HTTP ativo confirmado; paths exigem inspeção via DevTools após login) |
| Subdomínio da loja (app) | *(preencher — extrair após login em `hoopdecor.com` ou `hoopcrm.com`)* |
| Loja ID (numérico) | *(preencher após login)* |
| Nome do token API criado | *(preencher — nome dado ao criar em Loja > Tokens e Integrações)* |
| Scopes marcados no token | *(preencher — presume-se all-checked para "edição máxima")* |
| Webhooks ativos | *(preencher se houver — Callbacks cadastrados)* |
| Integrações ERP conectadas | *(preencher — Bling / Tiny / Lift / Olist / nenhuma)* |
| Integrações E-commerce conectadas | *(preencher — WooCommerce / VTEX / VNDA / Nuvemshop / Tray / nenhuma)* |
| Extensão Chrome "HoopCRM for WhatsApp" instalada? | *(sim/não)* |
| Números WhatsApp integrados (via Meta) | *(preencher — DDI+DDD+número)* |
| Plugin de WhatsApp ativado no e-commerce? | *(sim/não)* |
| Script GTM inserido no site? | *(sim/não)* |

---

## Credenciais (Infisical) — estado real

Padrão da Kolden: **nenhuma credencial em texto puro** (Art. VII). Apenas o
**caminho no Infisical**. Resolver em runtime — e nesta ferramenta especificamente,
**via shim** (`node ~/.claude/infisical-shim.cjs`), porque o binário `infisical` direto
está bloqueado pelo SAC (ver `reference_mcp_infisical_sac_shim.md`).

### O que já está cadastrado

| Credencial | Chave Infisical | Env | Comprovado |
|------------|-----------------|-----|-----------|
| Token API (REST + write) | `HOOP_API_KEY` | **`dev`** | ✔ 2026-08-13 (`len=1384`) |
| MCP conector | — não é secret; é o endpoint público `https://mcp.hoopcompany.com/mcp` autenticado via chave Anthropic no Claude Desktop/Code | — | ✔ conectado (ver `claude mcp list`) |
| Anthropic API Key (link MCP) | `ANTHROPIC_API_KEY` (já cadastrada Kolden) | prod | ✔ pré-existente |

### ⚠️ Decisão pendente — env do HOOP_API_KEY

O padrão Kolden para credenciais de produto em uso pela empresa é `prod`
(ver `guia-infisical.md` + convenções em `KOMMO_ROSIE_*` e `SOLOMON_*`). A
`HOOP_API_KEY` foi cadastrada em `dev`. Duas opções:

1. **Migrar para `prod`**: `infisical run` copia entre envs; rotacionar rota
   downstream para `--env=prod`
2. **Manter em `dev` e documentar**: reinterpretar como "token de exploração",
   criar novo `HOOP_API_KEY_PROD` quando entrar em rotina automatizada

Recomendação Kolden: **manter em `dev`** enquanto for uso exploratório/Ronan-driven;
migrar para `prod` quando alguma automação (Hermes / n8n / worker) começar a chamá-la
de forma agendada.

### Cadastrar chaves complementares (opcional)

Se quiser expor o subdomínio da loja como env também:

```bash
node ~/.claude/infisical-shim.cjs secrets set \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev \
  HOOP_APP_URL=@/tmp/hoop-app-url.txt \
  HOOP_LOJA_ID=@/tmp/hoop-loja-id.txt \
  HOOP_WEBHOOK_BASE=https://hermes.kolden.com.br/webhooks/hoop
```

(Prefixo `HOOP_` sem `_KOLDEN_` para casar com o padrão já adotado do `HOOP_API_KEY`.)

---

## Superfícies do produto — 6 pilares

| Pilar | O que faz | Uso principal |
|-------|-----------|---------------|
| **CRM / Funil** | Múltiplos funis, etapas configuráveis, filtros avançados (17+ dimensões), versionamento de orçamento, relatórios PDF/Excel | Operação comercial diária, gestão do pipeline |
| **Orçamentos** | Multi-ambiente, multi-imagem, catálogo privado (oculta fornecedor/produto do cliente), frete/pagamento, compartilhamento por link público, versões paralelas, revalidação automática por tabela de preços | Padrão de venda vertical decoração |
| **Catálogo digital** | Album público em `hoopdecor.com/<store>/catalogo/...`, favoritos/ordenação, ocultação seletiva de produtos, geração de link para cliente auto-orçar | Ponto de captura pré-conversa |
| **Arquitetos + RTs** | Cadastro de especificadores, tabelas de preço específicas por arquiteto, cálculo automático de Reserva Técnica (RT) por venda, relatório de faturamento por arquiteto | Diferencial vertical — pouco/nenhum concorrente horizontal cobre |
| **ERP + E-commerce** | Bling v3.0 (OAuth), Tiny (integrator+token), Lift (bidirecional), Olist (nativo); WooCommerce, VTEX, VNDA, Nuvemshop, Tray | Sync produtos/estoque/preços/pedidos |
| **WhatsApp (3 vias)** | (a) Meta Cloud API via BM+QR (número aprovado); (b) Extensão Chrome "HoopCRM for WhatsApp" (WhatsApp Web); (c) Plugin Widget no e-commerce com distribuição geolocalizada | Captura + atendimento — 3 caminhos que **coexistem** |

Deep-dive de cada superfície em [`api.md`](api.md).

---

## Módulos por categoria (Central de Ajuda oficial)

10 categorias canônicas no `hoopdecor.crisp.help/pt-br/`:

| # | Categoria | Slug | Foco |
|---|-----------|------|------|
| 1 | Gestão de Projetos | *(a mapear)* | Projetos + oportunidades + atividades vinculadas |
| 2 | Negócios | `negocios-1qkx5x4` | Funil, orçamentos, pedidos, agenda, pagamentos, RTs |
| 3 | Contatos | `contatos-1dq09cr` | Clientes, fornecedores, especificadores (arquitetos), construtoras |
| 4 | Relatórios | *(a mapear)* | Vendas, funil, produtos, RTs, vendedores |
| 5 | Produtos | `produtos-13b2n9y` | Cadastros, álbuns, catálogo, apresentações, markup, tabelas de preço |
| 6 | Importação De Dados | *(a mapear)* | Especificadores, produtos (com múltiplos estoques), clientes |
| 7 | Loja | *(a mapear)* | Configurações do sistema, perfil, permissões, usuários |
| 8 | **Integrações** | `integracoes-18coje3` | ERPs, E-commerce, IA (MCP Claude), WhatsApp, tokens |
| 9 | Domínios e Configuração de E-mail | *(a mapear)* | DNS (LocaWeb, Hostinger), CNAME, SPF, envio próprio |
| 10 | Tutorial Bling | *(a mapear)* | Fluxo detalhado Bling — categoria dedicada |
| **+** | Tutoriais Tiny (adicional) | `tutoriais-tiny-b3329c` | Fluxo detalhado Tiny — categoria dedicada |

Mapa completo com URLs de artigos em [`docs-oficiais.md`](docs-oficiais.md).

---

## Camada de IA (nativa + MCP)

### IA embutida no produto

O site institucional afirma "sistema de Inteligência Artificial que transforma dados
em visão clara para decisão", com os seguintes recursos:

- **Dashboards inteligentes** — configuráveis por necessidade da loja
- **Análise inteligente das conversas de WhatsApp** — sumarização/insights
- **Relatórios personalizados** — sem planilhas ou config complexa
- **Leitura de vendas, arquitetos e performance**

**Motor subjacente não divulgado publicamente.** Não há doc dev do usuário para
configurar prompts/persona/actions como no Kommo AI Agent — parece ser sistema
fechado no back-end da Hoop.

### MCP oficial — HoopCRM ↔ Claude (Model Context Protocol)

⭐ **Hoop tem MCP oficial** (verificado 2026-08-13):

- **Tipo:** conector remoto HTTP (Claude Desktop → URL exposta pelo Hoop)
- **Fluxo de setup:** Loja > Tokens e Integrações > Novo Token → Cria chave Anthropic
  API (platform.claude.com) → cola no HoopCRM → sistema gera URL do conector MCP →
  adicionar em Claude Desktop como "Conector Personalizado" com essa URL
- **Escopo:** dados da loja acessíveis diretamente por conversa Claude (fazer perguntas,
  gerar dashboards, executar ações)
- **Requer créditos Anthropic** para gerar dashboards (endpoint da Anthropic é chamado)
- **Fonte oficial:** [Como Conectar o HoopCRM ao Claude via MCP](https://hoopdecor.crisp.help/pt-br/article/como-conectar-o-hoopcrm-ao-claude-via-mcp-1r6zsqi/)

Detalhamento completo em [`mcp-status.md`](mcp-status.md).

---

## Fontes confiáveis (verificado 2026-08-13)

| Tipo | URL | Verificado |
|------|-----|------------|
| Site marketing | https://www.hoopcompany.com/ | 2026-08-13 |
| Aplicação (produto) | https://hoopdecor.com/ | 2026-08-13 |
| Aplicação (alias) | https://hoopcrm.com/ | 2026-08-13 |
| Ambiente dev | https://dev.hoopdecor.com/ | 2026-08-13 |
| Central de Ajuda | https://hoopdecor.crisp.help/pt-br/ | 2026-08-13 |
| Política de Privacidade LGPD | https://dev.hoopdecor.com/suporte/privacidade | 2026-08-13 |
| Chrome Web Store (extensão) | Buscar "HoopCRM for WhatsApp" | 2026-08-13 (nome verificado; URL específica a validar) |
| App store — Nuvemshop | https://www.nuvemshop.com.br/loja-aplicativos-nuvem/hoop | 2026-08-13 |
| Portal parceiro — Olist Hub | https://olist.com/hub-de-integracao/hoop/ | 2026-08-13 |
| Doc parceira — Olist | https://ajuda.olist.com/pt_BR/hubs-e-plataformas-via-api/integracao-erp-com-a-hoop | 2026-08-13 |
| CNPJ (consulta) | https://guiapj.com.br/consulta-cnpj/29920190000147 | 2026-08-13 |

Mapa exaustivo por categoria/artigo em [`docs-oficiais.md`](docs-oficiais.md).

---

## Notas Kolden

- **Sem dev-portal público.** Não existe `developers.hoopdecor.com` / `docs.hoopcompany.com`.
  Documentação é **inteiramente hospedada em artigos de suporte** (Crisp Help), sem
  OpenAPI/Swagger/Postman machine-readable. Consequência: extrair endpoints exige leitura
  humana + engenharia reversa via inspeção do app.
- **Token API é cliente-scoped, sem OAuth público.** Cada loja gera seu próprio token
  em `Meu Perfil > Loja > Tokens e Integrações`. **Não escalável entre múltiplas contas**
  sem um app multi-tenant (que a Hoop não oferece). Para operar N clientes, N tokens.
- **Bling v3.0 usa OAuth interno** (Hoop redireciona → Bling autoriza → volta). Cliente
  não vê o token final — vive dentro da Hoop.
- **WhatsApp tem 3 caminhos distintos e coexistentes.** Não é um "escolha um" — o cliente
  pode ter os três ativos simultaneamente (Meta Cloud para número principal + Extensão
  Chrome para operadores humanos + Plugin no site para captura de leads). Decisão de
  arquitetura precisa mapear qual caminho serve qual objetivo. Ver [`api.md`](api.md) §10.
- **⭐ MCP oficial disponível** (novidade 2026). Muda a estratégia de automação:
  antes do MCP, a única forma de "consultar Hoop via Claude" era construir wrapper
  próprio. Agora é `Adicionar Conector Personalizado` no Claude Desktop + URL do Hoop.
  Custo: créditos Anthropic (não créditos Hoop). Perfil ideal para uso interno de
  gestão. Ver `mcp-status.md`.
- **Nuvemshop** (Tiendanube) já tem app oficial na loja de apps da Nuvemshop — instalação
  em 1 clique. Kolden pode capitalizar isso se cliente já for Nuvemshop.
- **Olist Hub** lista integração Hoop no plano Construa (não gratuita). Integração é
  nativa (não via API cliente).
- **"HoopXTiny" ≠ "Integração com Tiny"** — dois artigos distintos. Ambos válidos, coexistem.
- **Sub-domínios de produto duplos** (`hoopdecor.com` e `hoopcrm.com`) sugerem rebrand
  em andamento. `hoopcompany.com` é a marca institucional; produto está migrando para
  identidade "HoopCRM" (mais horizontal, menos "decoração").
- **Ambiente `dev.hoopdecor.com`** aparenta ser staging da UI (mesmo HTML da produção),
  não sandbox de API. Não usar para testes de API pública.

---

## Instalação (quando/se provisionar novo cliente)

1. Contratar plano da Hoop (via demonstração — não há trial self-service público
   visível no site institucional).
2. Receber acesso: obter subdomínio/URL da loja + credenciais admin.
3. Configurar loja: perfil, permissões, primeiros usuários. Ver categoria "Loja" da
   Central de Ajuda.
4. **Gerar token API principal**: Meu Perfil > Loja > Tokens e Integrações > Criar
   novo Token → nome (`Token Kolden Hermes`) → **marcar todos os checkboxes** para
   full access → Copy imediato (mostrado uma vez).
5. **Cadastrar credenciais no Infisical** (comando na §Credenciais acima).
6. Smoke test:
   ```bash
   infisical run --projectId=... --env=prod -- \
     curl -sS "$HOOP_KOLDEN_APP_URL/api/..." \
          -H "Authorization: Bearer $HOOP_KOLDEN_API_TOKEN"
   ```
   (Endpoint exato pendente — cliente-scoped, sem doc pública. Descobrir por inspeção
   de rede no browser após login. Ver [`api.md`](api.md) §Limitações.)
7. **Se quiser MCP Claude**: seguir [Como Conectar o HoopCRM ao Claude via MCP](https://hoopdecor.crisp.help/pt-br/article/como-conectar-o-hoopcrm-ao-claude-via-mcp-1r6zsqi/).
   Gerar chave Anthropic em platform.claude.com, colar no HoopCRM, copiar URL do conector,
   adicionar em Claude Desktop.
8. **Se ERP**: escolher fluxo (Bling OAuth / Tiny app / Lift bidirecional / Olist plano
   Construa). Ver `api.md` §5-8.
9. **Se e-commerce**: gerar credenciais na plataforma, colar em Loja > Integrações >
   plataforma escolhida. Ver `api.md` §9.
10. **Se WhatsApp**: escolher entre Meta Cloud (número oficial), Extensão Chrome
    (WhatsApp Web para vendedores) e/ou Plugin Widget (captura no site). Ver `api.md` §10.
