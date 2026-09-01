---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Hoop/ferramentas]]"
---

# Hoop — Referência prática da API

Guia operacional das superfícies de integração do HoopCRM. Cobre autenticação por
token, webhooks bidirecionais, integrações ERP (Bling / Tiny / Lift / Olist),
integrações E-commerce (WooCommerce / VTEX / VNDA / Nuvemshop / Tray), WhatsApp em
3 vias (Meta Cloud / Extensão Chrome / Plugin Widget), MCP oficial e limitações.

Fonte-mãe: **`hoopdecor.crisp.help/pt-br/`** — Hoop **não tem dev-portal público
nem OpenAPI/Swagger**; toda a doc é hospedada em artigos de suporte. Este arquivo
consolida os fluxos oficiais descobertos.

---

## 1. O que existe (e o que não existe)

| Superfície | Existe? | Formato |
|-----------|---------|---------|
| API REST cliente-scoped | ✅ | Bearer token, tokens gerados por usuário em Loja > Tokens e Integrações |
| Webhooks bidirecionais | ✅ | Callback URLs configuráveis via UI; tipos: estoque, pedidos, produtos/preços, custom |
| MCP oficial (para Claude) | ✅ | Remote HTTP, conector personalizado |
| OpenAPI / Swagger públicos | ❌ | Não há spec machine-readable |
| Postman Collection oficial | ❌ | Não há workspace público |
| SDK oficial (JS/Python/PHP) | ❌ | Nenhuma biblioteca vendor |
| Dev-portal público | ❌ | Só artigos de suporte (Crisp Help) |
| Sandbox de API | ❌ | `dev.hoopdecor.com` é staging da UI, não da API |
| Rate limits documentados | ❌ | Sem menção pública |
| Changelog público de API | ❌ | Artigos são atualizados sem histórico |
| Versionamento de API | ❌ | Sem prefixo `/v1/`, `/v4/` visível |
| OAuth 2.0 público | ❌ | Só interno para Bling (Hoop→Bling) |

---

## 2. Autenticação — Tokens API

### Estado real Kolden (2026-08-13)

- **Base URL da API REST**: `https://api.hoopdecor.com` (confirmado ao vivo — servidor
  responde; paths exigem descoberta via inspeção de rede após login)
- **Token principal**: `HOOP_API_KEY` no Infisical (env `dev`, 1384 caracteres — provável
  JWT com scopes embutidos)
- **Chamar em runtime** via shim (SAC bloqueia `infisical` direto):
  ```bash
  node ~/.claude/infisical-shim.cjs run \
    --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
    curl -H "Authorization: Bearer $HOOP_API_KEY" https://api.hoopdecor.com/...
  ```

### Fluxo canônico (para criar novos tokens)

Fonte: [API: Como criar um token](https://hoopdecor.crisp.help/pt-br/article/api-como-criar-um-token-kw83o4/) (atualizado 09/07/2026).

### Fluxo de criação

1. Login em `hoopdecor.com` (ou domínio da loja)
2. **Meu Perfil > Loja > Tokens e Integrações**
3. Clique em "Criar novo Token"
4. Insira o **nome** (ex.: `Token Kolden Hermes`, `Token Lift`, `Claude MCP`) —
   nome identifica o token no log/auditoria
5. **Marque os checkboxes** das informações que deseja integrar (funciona como
   scopes — recomendação Kolden: marcar todos para full access, exceto se for
   integração de terceiro com escopo restrito)
6. Clique em **Create**
7. **Copie o token imediatamente** — exibido uma única vez, tipo "personal access
   token" do GitHub

### Uso

Bearer token no header `Authorization`:

```http
GET /api/... HTTP/1.1
Host: <sua-loja>.hoopdecor.com
Authorization: Bearer <HOOP_KOLDEN_API_TOKEN>
Content-Type: application/json
```

Endpoints exatos **não são documentados publicamente**. Descobrir via inspeção
de rede (DevTools > Network) no browser após login — o próprio front-end da Hoop
consome a API com o mesmo token.

### Notas Kolden

- **Convenção de nomenclatura interna:** `Token <Sistema><Ambiente>` — ex.:
  `Token Hermes Prod`, `Token n8n Sync`, `Token Claude MCP`.
- **Revogação:** ao remover um token na UI, chamadas subsequentes retornam 401.
- **Não há refresh** — tokens são estáticos até revogação manual.
- **Não há expiração automática documentada** — trate como long-lived.
- Guardar sempre no Infisical (`HOOP_KOLDEN_API_TOKEN`).

---

## 3. Onde ficam os tokens de webhook / Loja > APIs

Alguns artigos citam caminho alternativo: **Configurações da Loja > APIs** (não
"Meu Perfil > Loja"). Trata-se do painel administrativo geral da loja, acessível
apenas para admins. É onde vivem:

- Lista de tokens já criados (com nome + data + revogação)
- Lista de webhooks cadastrados (nome + Callback URL)
- Botão **"Criar novo token"**
- Botão **"Novo Webhook"**

Interseção com "Meu Perfil > Loja > Tokens e Integrações": ambos apontam para o
mesmo painel — o primeiro é atalho do usuário, o segundo é vista administrativa.

---

## 4. Webhooks

O Hoop opera com **múltiplos tipos de webhook**, todos configurados via UI em
Loja > APIs > Novo Webhook. Cada webhook = **nome + Callback URL** (o Hoop faz
POST para essa URL quando o evento ocorre).

### Tipos identificados

| Tipo | Direção | O que o Hoop envia | Descoberto em |
|------|---------|--------------------|---------------|
| **Webhook de Estoque** | Hoop ↔ ERP | URL para receber atualizações de estoque (ERP → Hoop) e URL para enviar (Hoop → ERP) | Bling / Tiny / Lift |
| **Webhook de Pedidos** | E-commerce → Hoop | Pedidos finalizados no e-commerce viram leads/pedidos no Hoop | Tiny (WebHooks extensão) / Nuvemshop / Olist |
| **Webhook de Produtos/Preços** | Hoop → E-commerce | Hoop envia catálogo + preços para a loja virtual | Olist (via docs olist.com) |
| **Webhook Callback custom (Lift-style)** | Hoop → Sistema externo | URL genérica para responder a eventos do Hoop no sistema do parceiro | Lift |

### Padrão de configuração

```
Loja > APIs > Novo Webhook
  Nome: <descritivo> (ex: "Callback Lift", "Estoque Bling")
  Callback URL: https://sistema-parceiro.com/webhook/hoop
```

⚠️ **Detalhe operacional Lift**: "lembre-se de adicionar .br ao final da URL se
caso não houver" — sugere validação/normalização de URL rasa. Rodar sempre com
`https://` e domínio canonical completo.

### Sem doc pública de payloads

O formato dos payloads (JSON schema, headers, HMAC signature) **não está
documentado publicamente**. Estratégia Kolden: cadastrar webhook apontando para
`https://hermes.kolden.com.br/webhooks/hoop/inspect` que faz log-and-echo,
capturar 1 evento de cada tipo, engenhar reverso.

---

## 5. Integração ERP — Bling v3.0

Fonte: [Integração com Bling](https://hoopdecor.crisp.help/pt-br/article/integracao-com-bling-8olt5c/) (atualizado 22/06/2026).

**Fluxo: OAuth interno (Hoop redireciona para Bling)**

1. HoopCRM > ícone da loja > **Configurações Gerais** > seção ERP
2. Selecionar **"Bling (Api v3.0)"** > Integrar com ERP
3. Redirecionamento para tela de **autorização OAuth do Bling**
4. Autorizar a integração
5. Volta para o painel Hoop → aparecem campos com **URLs de Estoque** e **URLs de
   Pedidos** (geradas pelo Hoop)
6. Copiar as duas URLs
7. **No painel Bling:** Central de Extensões > buscar "API" > selecionar
8. Configurar Canal de Venda + Callbacks tipo **JSON**
9. Habilitar "Chave Callback de estoque" → colar URL de Estoque copiada da Hoop → salvar
10. Repetir para "Chave Callback de pedidos"

### Diferencial

- Kolden **não vê o access_token do Bling** — vive dentro da Hoop.
- Autorização é do usuário (não da Hoop como app OAuth público).
- Refresh é gerenciado pela Hoop.

### Doc parceira (Olist/Bling — via ajuda.olist.com)

Fluxo alternativo (ERP Bling nativo via Olist Hub): plano Construa exigido. Ver
[Integração ERP com a Hoop — Olist](https://ajuda.olist.com/pt_BR/hubs-e-plataformas-via-api/integracao-erp-com-a-hoop):

- Receber pedidos: ✔ (Hoop desenvolvida)
- Receber produtos: ✘
- Enviar produtos: ✔
- Enviar estoque: ✔
- Enviar preços: ✔
- Sincronizar situação: ✘

---

## 6. Integração ERP — Tiny

Fonte: [Integração com Tiny](https://hoopdecor.crisp.help/pt-br/article/integracao-com-tiny-1dz1x6i/) + [INTEGRAÇÃO HOOPXTINY](https://hoopdecor.crisp.help/pt-br/article/integracao-hoopxtiny-4lolt9/) + [Sincronização de produtos - TINY X HOOP](https://hoopdecor.crisp.help/pt-br/article/sincronizacao-de-produtos-tiny-x-hoop-pc1480/).

**Fluxo: instalar app "Hoop" no Tiny + Integrator ID + Token**

1. HoopCRM > ícone da loja > Configurações Gerais
2. Selecionar integração **Tiny** > salvar (gera URLs)
3. **No Tiny:** Configurações > Integração → **Incluir integração**
4. Selecionar "integração da Hoop"
5. Cadastrar as URLs geradas pela Hoop
6. Tiny gera **Identificador do Integrador** + **Token** (equivalente a API Key)
7. Voltar à Hoop → colar Identificador do Integrador + Token nos campos assinalados
8. Salvar → aparecem 2 links (callbacks)
9. Colar os links de callback no Tiny (aba **Notificações**)
10. Para receber pedidos: **Configurações > Geral > Webhooks > "Receber notificações
    de vendas"** → colar link da Hoop
11. Habilitar chave "Loja possui integração com E-commerce" na Hoop

### Diferença HoopXTiny × Integração com Tiny

- **Integração com Tiny** = fluxo padrão descrito acima
- **HoopXTiny** = variante customizada (o artigo é mais curto e cita "Loja de
  Extensões > WebHooks" no Tiny). Provavelmente um fluxo mais recente/otimizado
  usando a extensão oficial de webhooks do Tiny.

Existe também categoria dedicada **"Tutoriais Tiny"** (`tutoriais-tiny-b3329c`) com
mais artigos operacionais.

---

## 7. Integração ERP — Lift (bidirecional)

Fonte: [Integração Lift Hoop: Guia Completo](https://hoopdecor.crisp.help/pt-br/article/integracao-lift-hoop-guia-completo-1m4fc81/).

**Lift** = software de gestão exclusivo para lojas de móveis. Integração
bidirecional completa — o único ERP documentado com fluxo simétrico.

### Setup

1. Gerar token na Hoop (**Loja > APIs > Criar novo token**, nome `Token Lift`,
   marcar todos os checkboxes)
2. No Lift: **Configurações > Integração HoopDecor** → colar token → selecionar
   estoque padrão → Aplicar
3. Sincronização em massa: **Sincroniza dados** → marcar cadastros → Sincronizar

### Fluxo Lift → Hoop (envio inicial de bases)

| Item Lift | Vira no Hoop | Dados sincronizados |
|-----------|--------------|---------------------|
| Fornecedor | Fábrica | Nome, E-mail, CNPJ (único obrigatório) |
| Arquiteto | Especificador | Nome, E-mail (único), CPF/CNPJ, aniversário, Celular, ID Lift (oculto) |
| Cliente | Cliente | Nome, E-mail (único), CPF/CNPJ, Celular, Endereço, ID Lift (oculto) |
| Produto | Produto | Nome (nome+referência), Configurações, Sub Config, Medida, Preço venda, Linha (=categoria), SKU/Referência |
| Funcionário | Representante | Nome, E-mail (único), ID Lift (oculto). **Só marcados como Vendedores** |

Emails devem ser únicos e preenchidos. CNPJ único para Fornecedores.

### Fluxo Hoop → Lift (pedidos)

- Setup webhook: Lift > Integração HoopDecor > Webhooks → copiar link Callback
- Hoop > Loja > APIs > Novo Webhook: nome `Callback Lift`, colar Callback
- Envio: no pedido do Hoop > **"Enviar para o ERP"**
- Pré-requisitos: Representante da Lift + Cliente com CPF/CNPJ + Fornecedores dos
  produtos serem da Lift (ou ter CNPJ)

| Item Hoop | Vira no Lift | Comportamento |
|-----------|--------------|---------------|
| Pedido | Orçamento | Cria novo ou atualiza existente |
| Representante | Funcionário Vendedor | Match por nome/e-mail; senão cria |
| Cliente | Cliente | Match por origem Lift ou CPF/CNPJ; senão cria |
| Especificador | Arquiteto | Match por origem Lift ou CPF/CNPJ; senão cria |
| Fábrica | Fornecedor | Match por origem Lift ou CNPJ; **senão erro** |
| Produto | Produto | Match por SKU; senão cria com nome+categoria |
| Item do pedido | Item do Orçamento | Cria (1º envio) ou deleta+recria (reenvio) — usa Descrição→"Especial", Preço, Quantidade, Desconto, Medida |

---

## 8. Integração ERP — Olist (nativo)

Fonte parceira: [Integração HOOP | Sistema ERP da Olist](https://olist.com/hub-de-integracao/hoop/) + [Ajuda Olist](https://ajuda.olist.com/pt_BR/hubs-e-plataformas-via-api/integracao-erp-com-a-hoop).

**Sem passos de API** — integração é nativa via Hub de Integração do Olist.
Cliente Kolden que já for Olist habilita HOOP como conector.

Cobre: importação automática de pedidos + dados de cliente, sincronização de
estoque/produtos/preços, emissão de NF-e, atualização de status e rastreamento
(Hoop ↔ Olist).

⚠️ **Requer plano Olist Construa ou superior** (integrações via API só a partir
desse plano).

---

## 9. Integração E-commerce

### 9.1 WooCommerce

Fonte: [Integração com WooCommerce](https://hoopdecor.crisp.help/pt-br/article/integracao-com-woocommerce-wn30o1/).

1. WordPress > WooCommerce > Configurações > Avançado > API REST > Adicionar chave
2. Descrição = "Hoop", usuário = admin, permissão = **Ler/Escrever** > Gerar chave
3. WooCommerce gera **Consumer Key** + **Consumer Secret**
4. Na Hoop: perfil > Loja > menu Integrações > WooCommerce > Integrar
5. Colar: URL da loja + Consumer Key + Consumer Secret → Salvar

### 9.2 VTEX

Fonte: [Integração com VTEX](https://hoopdecor.crisp.help/pt-br/article/integracao-com-vtex-1qz1kys/).

1. VTEX > Configurações da conta > Gerenciamento da conta > **Chaves de aplicativo
   (API Keys)** > **⊕ Gerar novo**
2. VTEX exibe **App Key** + **App Token** (token exibido uma única vez — copiar!)
3. Na Hoop: Loja > Integrações > VTEX > Integrar
4. Colar: nome da conta VTEX + App Key + App Token → Salvar

Headers usados pela integração:
- `X-VTEX-API-AppKey`: App Key
- `X-VTEX-API-AppToken`: App Token

### 9.3 VNDA

Fonte: [Integração com VNDA](https://hoopdecor.crisp.help/pt-br/article/integracao-com-vnda-ka17o0/).

1. VNDA admin > Configurações ⚙️ > Integrações > API > **+** para novo token
2. Preencher: Nome (ex. "Hoop") + E-mail responsável + Escopos
3. Salvar → **token enviado por e-mail** ("Token de acesso para API da Vnda")
4. Na Hoop: Loja > Integrações > VNDA > Integrar
5. Colar: URL da loja + AppToken (do e-mail) → Salvar

### 9.4 Tray

Fonte: [Integração com Tray](https://hoopdecor.crisp.help/pt-br/article/integracao-com-tray-fz53cs/).

1. Tray admin > Aplicativos > pesquisar "Hoop" > Acessar
2. Fluxo OAuth-style: redireciona para Hoop → Conectar → login (se necessário)
3. Credenciais ficam na integração (não visíveis diretamente pelo usuário)

### 9.5 Nuvemshop (Tiendanube)

Fonte: [App HoopCRM na Loja Nuvemshop](https://www.nuvemshop.com.br/loja-aplicativos-nuvem/hoop) + [Integração com a Nuvemshop](https://hoopdecor.crisp.help/pt-br/article/integracao-com-a-nuvemshop-1n3zs9v/) (URL descoberta, mas fetch retornou CRAWL_NOT_FOUND — provavelmente reformulada; buscar via UI da loja).

- App oficial **"HoopCRM"** na Loja de Aplicativos Nuvemshop (categoria Marketing)
- Instalação em 1 clique + OAuth
- Recursos declarados: captura de dados, rastreio de comportamento, segmentação,
  gestão comercial multi-funil, automação de mensagens
- Avaliação atual: **5/5** (2 reviews)

### 9.6 "Integrar sua plataforma" — genérico

Fonte: [Integrar sua plataforma com a Hoop](https://hoopdecor.crisp.help/pt-br/article/integrar-sua-plataforma-com-a-hoop-13k5ptl/).

Fluxo comum a todas as plataformas: 1) obter API key da plataforma, 2) Loja >
menu Integrações > escolher plataforma > Integrar, 3) preencher campos
específicos, 4) salvar.

### 9.7 Como pegar a API do E-commerce (índice)

Fonte: [Como pegar a API do E-commerce](https://hoopdecor.crisp.help/pt-br/article/como-pegar-a-api-do-e-commerce-751mzq/) — índice consolidado com links para os 4 guias (WooCommerce, VNDA, Nuvemshop, Tray).

---

## 10. WhatsApp — 3 superfícies

### 10.1 Meta Cloud API (número oficial)

Fonte: [Como Integrar Número de WhatsApp no HoopCRM](https://hoopdecor.crisp.help/pt-br/article/como-integrar-numero-de-whatsapp-no-hoopcrm-1xlb2ys/).

1. HoopCRM > perfil > Loja > **"Números WhatsApp"** > Conectar números
2. Popup Meta (Facebook Business): selecionar **Gerenciador de Negócios (BM)** >
   "Conectar um app de WhatsApp Business"
3. Selecionar código do país (+55) + número completo com DDD (lembrar do **9** na
   frente)
4. Sistema gera **QR Code** → escanear no celular
5. Fuso "America/São Paulo" → revisar dados compartilhados → Avançar > Concluir
6. Voltar à HoopCRM: se número não pertence a usuário existente, tela de "Vincular
   número ao usuário"
7. Rastreamento total automático (enviadas + recebidas)

**Onde as mensagens aparecem no CRM:**
- Dentro dos orçamentos criados
- Na página de perfil do cliente

**Exclusão:** ícone de lixeira na aba Números WhatsApp remove o vínculo.

### 10.2 Extensão Chrome "HoopCRM for WhatsApp"

Fonte: [Extensão HoopCRM para WhatsApp](https://hoopdecor.crisp.help/pt-br/article/extensao-hoopcrm-para-whatsapp-8u7a0g/) + [Como Criar Atividades via Extensão WhatsApp no HoopCRM](https://hoopdecor.crisp.help/pt-br/article/como-criar-atividades-via-extensao-whatsapp-no-hoopcrm-p3vhbc/).

1. Chrome Web Store > buscar "HoopCRM for WhatsApp" > Adicionar
2. Abrir/atualizar WhatsApp Web → painel lateral da extensão aparece
3. Login com e-mail+senha do HoopCRM
4. Selecionar loja

**Configurações de automação disponíveis:**
- Salvar mensagens automaticamente (todas → histórico do cliente no CRM)
- Criar contato automaticamente (novo número = novo cliente no CRM)
- Criar negócio para novo contato automaticamente (abre lead no funil)
- Registrar contato automaticamente 1x/dia por cliente ativo
- Menu destaque (Negócios / Lista Quente / Conversas)

**Seções do painel lateral:**
- **Lista Quente** — Abandono de Visita/Produto/Carrinho/Checkout + ações do Marketing
- **Negócios** — funil de vendas em andamento
- **Agenda** — compromissos e follow-ups
- **Cliente** — perfil do cliente aberto na conversa
- **Contatos** — base completa
- **Conversas** — abre WhatsApp direto no contato

Fluxo de atendimento: Lista Quente → clicar no WhatsApp do card → mensagem
pré-configurada abre → após envio, registrar resultado (estrelas + comentário).

### 10.3 Plugin Widget no e-commerce (botão flutuante)

Fonte: [Como adicionar o botão do Whatsapp](https://hoopdecor.crisp.help/pt-br/article/como-adicionar-o-botao-do-whatsapp-1kgctnv/).

1. HoopCRM > Marketing > **"Plugin de WhatsApp"**
2. Configurar:
   - Tipo de exibição: Instantâneo / Próxima navegação / Abandono
   - Páginas de exibição: Todas / Específicas (com include/exclude por palavra)
   - Gatilhos opcionais (ações do usuário)
   - Posição (canto sup/inf esq/dir), tamanho (recomendado 100%), cor fonte/botão

**Diferencial:** **distribuição geolocalizada de leads** — o widget captura
localização do usuário e roteia para vendedor mais próximo. Ver checklist de
boas-vindas.

---

## 11. Google Tag Manager

O HoopCRM inclui script GTM próprio para tracking dentro do e-commerce (captura
de comportamento). Fontes:

- [Remoção do Script - Google Tag Manager](https://hoopdecor.crisp.help/pt-br/article/) — em artigos em destaque na home
- Checklist onboarding: "Adicionar script no seu e-commerce"

Fluxo: gerado na Hoop → copiar snippet → colar no `<head>` do e-commerce.

---

## 12. Configuração DNS / E-mail próprio

Necessário para envio de e-mails com domínio da loja (não do Hoop).

Fontes:
- [Configuração por DNS através do LocaWeb](https://hoopdecor.crisp.help/pt-br/article/configuracao-por-dns-atraves-do-locaweb-1f5vg4h/)
- [Como criar um novo apontamento CNAME via Hostinger](https://hoopdecor.crisp.help/pt-br/article/) — nos artigos em destaque

Registros DNS típicos (do artigo LocaWeb):

| Tipo | Nome | Valor |
|------|------|-------|
| TXT | @ | `"v=spf1 include:_spf.localservices.com.br -all"` |
| CNAME | (subdomínios específicos) | (valores fornecidos pela Hoop) |

Cliente precisa acesso ao painel de hospedagem para editar zonas DNS.

---

## 13. Catálogos públicos

URL pattern: `hoopdecor.com/<store-id>/catalogo/<categoria>/<produto-id>`

Exemplo real capturado: `hoopdecor.com/65cd1d9e7ffc2/catalogo/puff/1837972` (STUDIO
AMBIENTES).

Uso: cliente da loja recebe link e navega catálogo público (produtos + imagens),
podendo solicitar orçamento sem se cadastrar. O catálogo **preserva a privacidade
da loja** — não expõe fornecedor nem SKU real ao cliente final.

---

## 14. Endpoints inferidos (por engenharia reversa)

⚠️ **Nenhum endpoint abaixo é oficialmente documentado.** Todos foram inferidos
por leitura dos artigos ou serão descobertos por inspeção de rede após login.
Validar cada um em ambiente de teste antes de assumir estabilidade.

| Recurso | Método provável | Nota |
|---------|-----------------|------|
| Autenticar | `Authorization: Bearer <token>` em todas | header padrão |
| Listar orçamentos (Negócios) | `GET /api/negocios?...` | filtros: vendedor, especificador, período, valor |
| Criar orçamento | `POST /api/negocios` | body: cliente, especificador, produtos[], frete, pagamento |
| Detalhes de orçamento | `GET /api/negocios/{id}` | inclui versões, produtos, formas de pagamento |
| Versões de orçamento | `GET /api/negocios/{id}/versoes` | criar nova versão / restaurar |
| Gerar pedido | `POST /api/pedidos` (de orçamento) | body: forma pagamento, dados entrega, transportadora |
| Enviar pedido para ERP | `POST /api/pedidos/{id}/erp` | dispara callback Lift/Bling |
| Listar produtos | `GET /api/produtos` | catálogo interno |
| Criar produto | `POST /api/produtos` | via importação em massa: `POST /api/produtos/importar` |
| Múltiplos estoques | campo `estoque_por_loja` no produto | matriz loja→qtd |
| Tabela de preços | `GET|POST /api/tabelas-precos` | grupos: Arquiteto, Cliente, Ponto de Venda, Escritório |
| Listar clientes | `GET /api/clientes` | filtros por CPF/CNPJ/telefone/nome |
| Listar arquitetos (especificadores) | `GET /api/especificadores` | + relatório RTs |
| Importar especificadores | `POST /api/importacao/especificadores` | colunas obrigatórias: Nome, Email, Tipo (PF/PJ), CPF/CNPJ |
| Relatório RTs | `GET /api/relatorios/rts?data_inicio&data_fim` | Faturamento + RT total + % RT |
| Números WhatsApp | `GET|POST /api/whatsapp/numeros` | via integração Meta BM |
| Webhooks (list/create/delete) | `/api/webhooks` | provável — padrão CRM |
| Tokens (list/revoke) | `/api/tokens` | provável — via UI Loja > APIs |

**Recomendação de descoberta:** rodar `curl -sS -H "Authorization: Bearer $TOKEN"
"$BASE_URL/api/..."` variando o path OU inspecionar as requisições XHR do
front-end da Hoop no DevTools do browser durante uso normal.

---

## 15. MCP oficial (Claude Desktop)

Ver [`mcp-status.md`](mcp-status.md) para detalhes. Resumo:

- **Existe MCP oficial**, tipo remote HTTP
- **Setup**: token Hoop + chave Anthropic → sistema gera URL do conector MCP →
  adicionar em Claude Desktop como Conector Personalizado
- **Requer créditos Anthropic** (não créditos Hoop)
- **Escopo**: acesso completo aos dados da loja durante conversa Claude
- **Tools expostas**: não documentadas explicitamente — Claude descobre via listing
  do MCP server (perguntar "O que eu consigo fazer com o MCP do Hoop?")

---

## 16. Limitações e riscos operacionais

| Item | Estado | Mitigação Kolden |
|------|--------|------------------|
| Sem OpenAPI/Swagger | Documentação humana só | Escrever contrato próprio Kolden após descoberta |
| Sem changelog público de API | Mudanças silenciosas possíveis | Monitorar `hoopdecor.crisp.help` como RSS/scraper |
| Sem versionamento (`/v1/`) | Breaking changes silenciosas | Assinar contrato de estabilidade se cliente-key |
| Sem rate limits documentados | Risco de throttle sem aviso | Implementar backoff exponencial no cliente Kolden |
| Sem sandbox de API | Testes precisam ir na produção | Cadastrar loja de teste separada / usar dry-run interno |
| Sem SDK oficial | Cada linguagem reinventa | Wrapper axios/fetch em TS no Hermes |
| Bling v3.0 token invisível | Não podemos rotacionar/revogar direto | Rotação = desintegrar+reintegrar via UI |
| Nuvemshop artigo Crisp 404 | Doc pode estar em migração | Cross-reference com app da Nuvemshop |
| MCP sem lista de tools pública | Cada versão pode mudar | Perguntar no Claude a lista atual antes de automatizar |

---

## 16-B. ⭐ Vinculação MCP + API REST — "Edição Máxima" (padrão canônico Kolden)

**Setup ativo (2026-08-13):** MCP oficial Hoop conectado em `claude.ai HoopCRM`
(`https://mcp.hoopcompany.com/mcp`) **+** API REST autenticada via `HOOP_API_KEY`
(Infisical `dev`) em `https://api.hoopdecor.com`. As duas superfícies **se
complementam** — usar em conjunto dá a maior superfície de escrita/leitura possível.

### Divisão de responsabilidades (quando usar cada uma)

| Situação | Preferir MCP | Preferir API REST direta |
|----------|-------------|--------------------------|
| Consulta ad-hoc conversacional ("quantos orçamentos abertos?") | ✔ | |
| Análise/dashboard on-the-fly no Claude | ✔ | |
| Descoberta de tools/dados disponíveis | ✔ (`"o que consigo fazer?"`) | |
| Ação única simples (criar 1 orçamento por instrução) | ✔ | |
| Batch: 500 pedidos a criar | | ✔ (loop em script) |
| Backfill/importação em massa | | ✔ |
| Webhooks ↔ Hermes reagindo a eventos | | ✔ (headless) |
| Sync agendado (cron n8n) | | ✔ |
| Operação sem UI/humano no meio | | ✔ |
| Descobrir endpoint que o MCP não expõe | | ✔ (fuzz via UI DevTools, depois curl) |
| Rate limit alto por operação | | ✔ (controle explícito) |
| Auditoria fine-grained (cada ação logada) | | ✔ (log do próprio código) |

**Regra prática:** MCP para *interação humana com Claude no loop*, API REST para
*automação sem humano no loop*. As duas usam a mesma conta e o mesmo modelo de
permissão — não há conflito de estado.

### Chaves usadas por cada superfície

| Superfície | Segredo Kolden | Como resolver em runtime |
|------------|----------------|-------------------------|
| MCP (Claude → Hoop) | `ANTHROPIC_API_KEY` (já cadastrada, prod) | Claude Code/Desktop consome; nada a fazer |
| API REST (Kolden/Hermes → Hoop) | `HOOP_API_KEY` (dev, 1384 chars, JWT) | `node ~/.claude/infisical-shim.cjs run --env=dev -- <cmd>` |

Não misturar: a chave Anthropic **não** autentica a REST; a `HOOP_API_KEY` **não**
autentica o MCP.

### Padrão de código — chamando a REST com o shim

```bash
node ~/.claude/infisical-shim.cjs run \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl -sS -H "Authorization: Bearer $HOOP_API_KEY" \
       -H "Content-Type: application/json" \
       -H "Accept: application/json" \
       https://api.hoopdecor.com/<PATH>
```

Para POST/PATCH/DELETE, adicionar `-X POST` + `-d '{...}'`. Payloads exatos =
inspecionar via DevTools > Network durante o uso do próprio front-end da Hoop
(a Hoop consome a mesma REST com um token similar — o request body serve de contrato).

### Padrão de código — chamando via Hermes (Python/Node)

```python
import os, requests
from subprocess import check_output

# Injetar HOOP_API_KEY via shim
token = check_output([
    "node", os.path.expanduser("~/.claude/infisical-shim.cjs"),
    "run", "--projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093", "--env=dev",
    "--", "bash", "-c", "echo -n $HOOP_API_KEY"
]).decode().strip()

BASE = "https://api.hoopdecor.com"
HEADERS = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

r = requests.get(f"{BASE}/<endpoint>", headers=HEADERS, timeout=15)
r.raise_for_status()
data = r.json()
```

Para produção, o Hermes já carrega envs via Infisical — usar `os.environ["HOOP_API_KEY"]`
direto se rodar sob `hermes` MCP wrapper.

### Padrão de tools MCP — descoberta em nova sessão

O MCP `claude.ai HoopCRM` **só expõe tools** para sessões iniciadas **depois** de o
MCP ser conectado. Se você conectou o MCP durante uma sessão em andamento, as tools
não aparecem — reiniciar Claude Code (ou nova conversa) para carregar.

Nome de namespace esperado: `mcp__claude_ai_HoopCRM__*` ou `mcp__hoopcrm__*` — descobrir
com `ToolSearch` na nova sessão.

Perguntas para o MCP na primeira conversa:
1. `"Liste todas as tools disponíveis do MCP Hoop com uma linha cada"`
2. `"Qual é o schema completo dos payloads das tools de escrita (create/update)?"`
3. `"Qual o rate limit exposto pelo MCP?"`

Documentar as respostas de volta em `mcp-status.md` §3.

### Ganho de "edição máxima" com as duas juntas

- **Escrita conversacional via MCP**: criar 1 orçamento por comando natural
- **Escrita batch via REST**: importar 10 mil produtos
- **Escrita reativa via webhook**: pedido novo no Hoop → Hermes reprocessa → API REST
  atualiza status
- **Escrita auditável via wrapper**: código Kolden loga cada request/response

Nenhum modo depende do outro. Se o MCP cair, a REST continua. Se a REST tiver
rate-limit, o MCP absorve o pico interativo. Redundância operacional grátis.

### Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Token JWT expira sem aviso | Monitorar 401s nas chamadas REST; ao detectar, notificar Ronan para regenerar em Loja > Tokens e Integrações |
| MCP protocol muda (Anthropic side) | Anthropic garante compat; monitorar `claude mcp list` no CI |
| Descoberta de endpoint errada | Sempre validar payload da UI (DevTools) antes de escrever wrapper |
| Chave `dev` acidentalmente usada em rotina prod | Migrar para `prod` quando entrar em automação agendada (ver `ferramentas.md` §Decisão pendente) |
| Race conditions MCP↔REST simultâneos | Não escrever no mesmo lead pelos dois canais ao mesmo tempo; assumir eventual consistency |

---

## 17. Estratégia Kolden (padrões recomendados)

### Padrão A — Uso interno via MCP Claude
Instalar conector Hoop no Claude Desktop de cada operador. Usar para consultas
ad-hoc ("quantos orçamentos abertos no funil de recuperação?"), análises,
dashboards on-demand. **Zero código.** Custo: créditos Anthropic. Ideal para
gestão comercial e diretoria.

### Padrão B — Sync passivo via webhooks
Cadastrar webhook Hoop → `https://hermes.kolden.com.br/webhooks/hoop/{cliente}`
→ Hermes recebe eventos (orçamento criado, pedido gerado, estoque alterado) e
grava no ledger interno + Notion. Kolden observa sem intervir. Ideal para
relatórios cross-clientes.

### Padrão C — Automação com wrapper próprio
Se precisar sync bidirecional programático (ex.: criar orçamento a partir de
webhook externo, sincronizar produtos de sistema Kolden para Hoop), construir
wrapper TypeScript em `sobre-a-empresa/Ferramentas/Hoop/src/` (não existe ainda)
consumindo os endpoints inferidos §14 via `axios` + `HOOP_KOLDEN_API_TOKEN`.
Padrão do MCP Íris (Solomon Rosie) serve de molde.

### Padrão D — n8n / Make bridge
HTTP Request node com Header Auth (Bearer) apontando para endpoints Hoop
descobertos. Bom para clientes que já operam n8n/Make. Sem código, sem
dependência da Kolden.

### Padrão E — WhatsApp por Meta Cloud + Hermes
Se cliente já tem número via Meta Business, plugar direto na Hoop (§10.1) — ganha
todas as automações nativas de captura/atribuição do funil de recuperação. Se
precisar controle mais fino (LLM próprio no meio da conversa), NÃO usar Extensão
Chrome — usar Meta Cloud direto + Hermes intercepta antes de responder.

---

## 18. Fontes verificadas (2026-08-13, Exa/WebFetch)

| URL | O que confirma |
|-----|----------------|
| https://hoopdecor.crisp.help/pt-br/article/api-como-criar-um-token-kw83o4/ | Fluxo canônico de criação de token (Meu Perfil > Loja > Tokens e Integrações) |
| https://hoopdecor.crisp.help/pt-br/article/como-conectar-o-hoopcrm-ao-claude-via-mcp-1r6zsqi/ | MCP oficial — fluxo completo, requer chave Anthropic + créditos |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-bling-8olt5c/ | OAuth interno Bling v3.0 + Callback estoque/pedidos |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-tiny-1dz1x6i/ | Fluxo Integrator ID + Token + WebHooks |
| https://hoopdecor.crisp.help/pt-br/article/integracao-hoopxtiny-4lolt9/ | Variante HoopXTiny (extensão WebHooks) |
| https://hoopdecor.crisp.help/pt-br/article/integracao-lift-hoop-guia-completo-1m4fc81/ | Fluxo bidirecional Lift (Fornecedor↔Fábrica, Arquiteto↔Especificador, etc.) |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-woocommerce-wn30o1/ | Consumer Key + Consumer Secret |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-vtex-1qz1kys/ | App Key + App Token (headers X-VTEX-API-*) |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-vnda-ka17o0/ | Token enviado por e-mail |
| https://hoopdecor.crisp.help/pt-br/article/integracao-com-tray-fz53cs/ | Instalar app "Hoop" no Tiny/Tray + Conectar |
| https://hoopdecor.crisp.help/pt-br/article/como-pegar-a-api-do-e-commerce-751mzq/ | Índice consolidado dos 4 guias e-commerce |
| https://hoopdecor.crisp.help/pt-br/article/como-pegar-a-chave-de-api-do-erp-sgj00j/ | Índice consolidado dos 2 guias ERP (Bling + Tiny) |
| https://hoopdecor.crisp.help/pt-br/article/integrar-sua-plataforma-com-a-hoop-13k5ptl/ | Fluxo genérico Loja > Integrações |
| https://hoopdecor.crisp.help/pt-br/article/como-integrar-numero-de-whatsapp-no-hoopcrm-1xlb2ys/ | WhatsApp via Meta Cloud + QR Code |
| https://hoopdecor.crisp.help/pt-br/article/extensao-hoopcrm-para-whatsapp-8u7a0g/ | Extensão Chrome "HoopCRM for WhatsApp" |
| https://hoopdecor.crisp.help/pt-br/article/como-adicionar-o-botao-do-whatsapp-1kgctnv/ | Plugin Widget com geolocalização |
| https://olist.com/hub-de-integracao/hoop/ | Integração nativa Olist (plano Construa+) |
| https://ajuda.olist.com/pt_BR/hubs-e-plataformas-via-api/integracao-erp-com-a-hoop | Matriz de recursos Olist↔Hoop |
| https://www.nuvemshop.com.br/loja-aplicativos-nuvem/hoop | App oficial Nuvemshop HoopCRM (rating 5/5) |
| https://dev.hoopdecor.com/suporte/privacidade | Política LGPD com dados jurídicos completos |
