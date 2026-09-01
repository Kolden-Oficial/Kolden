---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/RDStation/docs-oficiais|docs-oficiais]]"
  - "[[sobre-a-empresa/Ferramentas/RDStation/api|api]]"
  - "[[sobre-a-empresa/Ferramentas/RDStation/mcp-status|mcp-status]]"
---

# RD Station — Referência de Uso

Plataforma brasileira de automação de marketing e vendas, líder na América Latina
(≥50 mil empresas clientes declaradas). Ecossistema modular com quatro produtos
principais — **RD Station Marketing**, **RD Station CRM**, **RD Station Conversas**
e **RD Station Mentor IA** — mais uma vertical **RD Station para Ecommerce**.
Subsidiária da **TOTVS** desde 2021 (aquisição de R$ 1,86 bi); comunicação atual
usa "TOTVS RD Station" como assinatura.

Diferencial declarado: 100% em português, suporte BR, IA nativa ("LYNN" no
Marketing, "Copiloto" no CRM), MCP oficial (2026) para plugar Claude/ChatGPT
direto na base do cliente sem exportação de dados. Verticalizações prontas para
e-commerce, indústria, educação, saúde e software.

---

## Identidade jurídica

| Campo | Valor |
|-------|-------|
| Razão social atual | **RD Gestão e Sistemas S.A.** |
| Nome anterior | Resultados Digitais S.A. |
| Fantasia comercial | RD Station / TOTVS RD Station |
| CNPJ | 22.799.684/0001-76 |
| Grupo econômico | TOTVS (controlador desde 2021) |
| Sede administrativa | Florianópolis/SC — Rodovia Virgílio Várzea, nº 587, 3º piso, sala 302, Saco Grande |
| Sede jurídica / outro endereço declarado | Rua José Szczepanski, 300 — São José dos Pinhais/PR (declaração em auditoria de terceiro) |
| DPO / Encarregado (LGPD) | **Fernanda Nones** — dpo@rdstation.com |
| Data centers principais | Google Cloud Platform (GCP) + Amazon Web Services (AWS) — Califórnia e Iowa (EUA) |
| Compliance declarado | ISO 27001 + NIST (framework); LGPD conforme |
| Contato institucional | Central de Ajuda → "Fale Conosco" (ajuda.rdstation.com/s/faleconosco) |

---

## Domínios ativos (verificado 2026-08-18)

| Domínio | Papel |
|---------|-------|
| `rdstation.com` | Site institucional / landing global — SSoT da marca |
| `app.rdstation.com.br` | Aplicação RD Station Marketing (login do cliente) |
| `crm.rdstation.com` | Aplicação RD Station CRM |
| `ajuda.rdstation.com` | Central de Ajuda oficial (Salesforce Experience Cloud) |
| `developers.rdstation.com` | Portal de API (ReadMe.com) — reference + guides + rate limits |
| `api.rd.services` | Base URL da API 2.0 (Marketing + eventos) |
| `legal.rdstation.com` | Termos, aviso de privacidade, adendo LGPD |
| `appstore.rdstation.com/pt-BR/publisher` | App Store — criação de apps OAuth2 (dev portal) |
| `mcp.rdstationmentor.com` | Portal MCP oficial (3 conectores: `/marketing`, `/crm`, `/conversas`) |
| `docs.rdstationmentoria.com.br` | Docs específicas do RD Mentor IA |
| `rdstation.com/mcp-rd-station/` | Landing MCP oficial |

---

## Contas provisionadas — Kolden

> **Status: parcialmente provisionada** (2026-08-18). App OAuth2 criado e
> API Key validada contra a conta Rosie. `refresh_token` pendente — bloqueia
> operações que exigem OAuth2 completo (leitura de contatos, insert em fluxo,
> eventos `ECOMMERCE_*`, webhooks, analytics).

| Atributo | Valor |
|----------|-------|
| Conta RD Marketing (cliente Rosie) | *(confirmar plano ativo: Light/Basic/Pro/Advanced; automação avançada exige Pro+)* |
| Conta RD Marketing (Kolden própria) | *(a criar se necessário para testes internos)* |
| **App OAuth2 no App Store** | ✅ **Criado** em `https://appstore.rdstation.com/pt-BR/publisher` (aplicativo privado) |
| **`client_id`** | ✅ `03b72f6d-ce7d-4111-b7be-45933b0e3c10` (público por design em OAuth2; salvo em `RD_CLIENT_ID`) |
| **`client_secret`** | ✅ Cadastrado em Infisical dev raiz como `RD_CLIENT_SECRET` (não validável isoladamente sem `code`; presume-se válido — veio junto com `client_id` na tela do App Publisher) |
| **`refresh_token`** | ⚠️ **PENDENTE** — bloqueia operações OAuth2 completas. Requer Passo 2.3 (autorização manual no browser → troca do `code`) |
| **Callback URL registrada** | `http://localhost:8000/rdstation/callback` (setup local; adicionar `https://hermes.kolden.com.br/oauth/rdstation/callback` quando Hermes tiver rota) |
| **API Key para eventos de conversão** | ✅ **Validada 2026-08-18** — cadastrada em Infisical dev raiz como `RD_API_KEY`; teste sacrificial `POST /platform/conversions` retornou HTTP 200 + `event_uuid: 4b725b16-8b7d-445f-b7dc-29c3ec93e31e` (contato de teste `qa-kolden-20260818-105717@yopmail.com`, tags `qa-kolden`/`smoke-test`/`deletar-apos-teste` — **purgar da base Rosie antes de campanhas reais**) |
| MCP oficial (`/marketing`) conectado no Claude Desktop/Code Kolden | *(pendente — só habilita em Pro+)* |
| App Nuvemshop instalado na conta Rosie | *(pendente — pré-requisito p/ eventos e-commerce nativos; exige plano Pro+)* |
| Autenticação de domínio Rosie (SPF/DKIM/DMARC) | *(pendente — 5 entradas DNS geradas pela RD)* |

---

## Credenciais no Infisical — convenção real (2026-08-18)

> **Convenção adotada pelo Ronan:** prefixo curto `RD_*` em **path raiz** do
> env `dev` (não `RDSTATION_*` em sub-path `/kolden/clientes/rosie/*` como
> proposto originalmente). Mais enxuto; contrapartida = mistura Kolden própria
> com cliente-scoped se houver mais de uma conta RD no futuro (nesse momento
> só existe a conta Rosie, então não há conflito).

| Chave (real) | Path Infisical | Env | Status | Fonte |
|--------------|----------------|-----|--------|-------|
| `RD_CLIENT_ID` | `/` (raiz) | **dev** | ✅ cadastrada | App Publisher da RD |
| `RD_CLIENT_SECRET` | `/` (raiz) | **dev** | ✅ cadastrada | App Publisher da RD |
| `RD_API_KEY` | `/` (raiz) | **dev** | ✅ cadastrada + **validada 2026-08-18** | UI RD → Configurações → API Key |
| `RD_REFRESH_TOKEN` | — | — | ❌ **NÃO EXISTE** | Bloqueia OAuth2 completo — requer Passo 2.3 manual |

**Uso via CLI Infisical:**
```powershell
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>
```
Injeta os 3 secrets `RD_*` como env vars no processo filho. Sem `--path`
porque estão na raiz.

**Rotação:**
- `RD_CLIENT_ID` / `RD_CLIENT_SECRET`: só via delete+recria App no App Publisher (invalida tudo).
- `RD_API_KEY`: rotacionar via UI RD → Configurações → API Key → gerar nova → substituir no Infisical.
- `RD_REFRESH_TOKEN` (quando existir): pode voltar rotacionado no refresh — sempre reatribuir ao valor de resposta.

**Sensibilidade crítica:** `client_id` é público por design em OAuth2 (aparece
na URL do browser durante autorização) — pode ser registrado em docs sem risco.
Já `client_secret`, `refresh_token` e `api_key` são secrets reais: **nunca em
log, nunca em `.env` versionado, nunca em prompt de LLM que possa ser logado**.
`refresh_token` especificamente = chave-mestra (opera 100% da conta, não há
scopes granulares no OAuth2 da RD).

---

## Superfícies do produto

| Superfície | O que é | Público | Plano |
|-----------|---------|---------|-------|
| **RD Station Marketing** | Automação de marketing tudo-em-um: e-mail, LP, formulários, pop-ups, fluxos, WhatsApp, SMS, redes sociais, SEO, lead scoring, lead tracking, IA | SMB e mid-market BR/LatAm | Light / Basic / Pro / Advanced |
| **RD Station CRM** | Funil de vendas + WhatsApp nativo + IA (Priorização Inteligente, Copiloto) | Times comerciais SMB — 20 mil times ativos | Free / Basic / Pro / Advanced |
| **RD Station Conversas** | Omnichannel (WhatsApp, IG, FB, Telegram, Chat) com IA. Ex-Tallos. RD é **BSP oficial da Meta** — onboarding em 48h | Gestores de atendimento com volume; saúde, educação, e-commerce | Basic / Pro / Advanced |
| **RD Station Mentor IA** | Camada IA — Gerador de Conteúdo (20+ ferramentas grátis) + Meu Assistente (treinado com dados do cliente) | Todos os clientes RD | Incluída |
| **RD Station para Ecommerce** | RDSM verticalizado (RFV, carrinho abandonado, catálogo produto) | Lojas virtuais Nuvemshop/Shopify/VTEX/etc. | Requer Pro+ do RDSM |
| **Suri (Suri Shop by TOTVS)** | Chat commerce IA — WhatsApp vira loja completa. Adquirido 03/2026 | Varejo | (integrada ao portfólio TOTVS) |

---

## Módulos de RD Station Marketing (Navbar 360, 2026)

| Módulo | Nome UI (pt-BR) | Planos onde funciona |
|--------|-----------------|----------------------|
| Landing Pages | Landing Pages | Todos |
| Formulários | Formulários | Todos |
| Formulários inteligentes | Formulários inteligentes | **Pro, Advanced** |
| Pop-ups | Pop-ups | Todos |
| Botão de WhatsApp (site) | Botão de WhatsApp | Todos |
| Web Push | Web Push (crédito escalonado) | Todos |
| E-mail Marketing | Email | Todos |
| Sequência de E-mails (linear) | Automação inicial | Todos |
| **Automação de Marketing completa (fluxos com todas as ações)** | Automação de Marketing | **Pro, Advanced** |
| WhatsApp (dentro do fluxo) | Enviar WhatsApp | Todos (add-on pago a partir de R$305/mês) |
| SMS | Enviar SMS | Todos |
| Publicações redes sociais | Publicações | Todos (FB/IG/LinkedIn) |
| Link da Bio | Link da Bio | Todos |
| Meta Lead Ads | Meta Lead Ads | Todos |
| SEO on-page | Otimização de páginas | Basic, Pro, Advanced |
| Públicos p/ Anúncios | Públicos p/ Google/Meta Ads | Pro, Advanced |
| Base de Leads (Contatos) | Contatos > Base de Leads | Todos |
| Segmentação | Segmentação | Todos |
| Campos personalizados | Campos personalizados | Todos |
| Tags | Tags | Todos |
| LGPD (double opt-in, bases legais) | Adequações à LGPD | Todos |
| Lead Scoring | Lead Scoring | **Pro, Advanced** |
| Lead Tracking | Lead Tracking | **Pro, Advanced** |
| Lista Inteligente (IA) | Lista Inteligente | **Pro, Advanced** |
| Relatórios / Análises | Análise de Canais, Funil de Marketing, Dashboards personalizados | Automáticos: todos. Funil + dashboards: Pro/Adv |
| Gerenciador de Campanha | Gerenciador de Campanha | Pro (agrupamento), Advanced (análise completa) |
| Integrações / App Store | +125 integrações — App Store | Todos |
| Integração nativa RD CRM | RD Station CRM | Todos |
| Copiloto de IA (LYNN) | Copiloto de IA | Todos |
| MCP | MCP RD Station | **Pro, Advanced** |
| Configurações | Domínios, Usuários, Remetentes, Integrações, API Key | Todos |

---

## Camada de IA

**RD Station Mentor IA** (produto declarado):
- Gerador de Conteúdo — 20+ ferramentas gratuitas para gerar título, CTA, e-mail, post
- Meu Assistente — assistente treinado com dados do cliente para qualificar leads e responder
- Página oficial: https://www.rdstation.com/produtos/mentor-ia/
- Docs API: https://docs.rdstationmentoria.com.br/ (subdomínio próprio)

**IA embarcada nos produtos**:
- Marketing → **LYNN** (títulos, CTAs, assuntos de e-mail, envio inteligente, lista inteligente)
- CRM → **Copiloto de IA** (Priorização Inteligente, Próxima Ação, Preenchimento automático)
- Conversas → **Agentes de IA** (qualificação, categorização, transcrição)

**MCP oficial** (2026-06) — três servidores separados, um por produto (ver `mcp-status.md`).
Zero custo adicional além do plano. Marketing exige **Pro+**; CRM e Conversas
disponíveis em todos os planos.

---

## Fontes confiáveis

Todas verificadas via Firecrawl em **2026-08-18**:

| URL | Confirma |
|-----|----------|
| https://www.rdstation.com/ | Marca, portfólio, positioning |
| https://www.rdstation.com/produtos/marketing/ | Planos + features Marketing |
| https://www.rdstation.com/produtos/crm/ | CRM |
| https://www.rdstation.com/produtos/conversas/ | Conversas (ex-Tallos) |
| https://www.rdstation.com/produtos/mentor-ia/ | Mentor IA + Assistente |
| https://www.rdstation.com/produtos/marketing-para-ecommerce/ | Vertical e-commerce |
| https://www.rdstation.com/integracoes/ | App Store (+125 integrações) |
| https://legal.rdstation.com/pt/privacy-policy/ | Razão social, DPO, data centers |
| https://ajuda.rdstation.com/ | Central de Ajuda (auto-serviço) |
| https://developers.rdstation.com/ | Portal API (ReadMe) |
| https://developers.rdstation.com/llms.txt | Índice AI de todo o portal (117 KB) |
| https://appstore.rdstation.com/pt-BR/publisher | Criação de App OAuth2 |
| https://rdstation.com/mcp-rd-station/ | Landing MCP oficial |
| https://mcp.rdstationmentor.com/ | Portal MCP + 3 endpoints |
| https://github.com/ResultadosDigitais | Org GitHub oficial (SDK Ruby + n8n nodes) |

---

## Notas Kolden

**Padrão de plano por caso de uso Kolden:**
- Cliente que só coleta leads via form e faz e-mails simples: **Basic**.
- Cliente com fluxos multi-etapa (nurture, boas-vindas, winback): **Pro** obrigatório.
- Cliente com A/B de assunto, público de anúncios, lead scoring/tracking: **Pro** (todos) ou **Advanced** (A/B de fluxo).
- Cliente e-commerce com carrinho abandonado / pedido pago via app nativo: **Pro+**.
- Cliente que quer MCP conectado no Claude Kolden: **Pro+** para Marketing (CRM e Conversas liberam em todos).

**Gotchas confirmados (evitar retrabalho):**
1. **Fluxos são UI-only.** API 2.0 não cria, edita ou publica fluxo — só insere leads em fluxo existente (`POST /platform/workflows/{id}/leads`) e lê estados (`GET .../leads/started|left|action/{id}`). Consequência: cada cliente exige reconstrução manual do fluxo na UI; não há IaC/JSON exportável.
2. **Não há sistema de scopes no OAuth2.** 1 app autorizado = acesso total à conta. Tratar `refresh_token` como credencial mestra.
3. **`refresh_token` "não expira"** (declarado), mas pode ser revogado silenciosamente se: usuário desconectar app na UI, `client_secret` for rotacionado, ou app deletado. Sempre ter fallback de re-autorização.
4. **Remetente não aceita provedores gratuitos** (Gmail, Yahoo, Hotmail). Precisa domínio próprio configurado com **3 CNAMEs DKIM + 1 SPF + 1 DMARC**.
5. **Subdomínio de LP ≠ subdomínio de e-mail.** Se cliente quer ambos, precisa configurar duas coisas separadas (só o domínio-raiz pode coincidir).
6. **Eventos de e-commerce novos são `ECOMMERCE_*`.** Os antigos (`CART_ABANDONED`, `ORDER_PLACED`) foram descontinuados em 31/12/2025 — não usar mesmo se aparecerem em tutoriais antigos.
7. **Cart abandonment via app Nuvemshop tem janela fixa de 4h** — não configurável. E só dispara se o cliente preencheu e-mail no checkout.
8. **Webhooks Marketing só emitem `WEBHOOK.CONVERTED` e `WEBHOOK.MARKED_OPPORTUNITY`.** Eventos e-commerce NÃO emitem webhook — para propagar para fora, criar conversão sombra e assinar `WEBHOOK.CONVERTED` filtrando por `event_identifier`.
9. **Sem HMAC nativo em webhook.** Autenticação suportada = header custom (`auth_header` + `auth_key`, documentado só para CRM mas aceito na API 2.0). Assinatura estilo Meta/Stripe não existe.
10. **Envio Inteligente é incompatível com A/B de assunto.** Escolher um dos dois — combinar bloqueado.
11. **Editar fluxo ao vivo é possível mas irreversível.** Leads que já passaram pela etapa alterada não recebem a mudança; leads na etapa recebem. Sem versionamento, sem rollback. Mudança grande = **duplicar fluxo + ajustar cópia + desativar original**.
12. **Não existe simulação/walk-through de fluxo.** Testar via segmentação de teste (poucos leads, e-mail do operador) antes de trocar pela entrada real.
13. **Não existe endpoint público para enviar e-mail transacional avulso nem criar template.** Só leitura via API. Transacional fora da RD exige provedor separado (SES, SendGrid).
14. **URL > 8 KB = 414.** Cuidado com queries GET gigantes; usar paginação.

**Padrão Kolden para novo cliente RD Station** (checklist):
1. Confirmar plano (Pro+ se houver fluxo multi-etapa).
2. Criar App OAuth2 no App Publisher da RD com nome "Kolden — Integração <cliente>".
3. Autorizar App uma vez (Ronan clica o link OAuth manualmente).
4. Guardar `refresh_token` no Infisical.
5. Autenticar domínio do cliente (5 entradas DNS).
6. Instalar app Nuvemshop/Shopify se cliente for e-commerce.
7. Criar tags-base e segmentações-base.
8. Construir fluxos na UI (sem IaC — replicar manualmente do doc de configuração).
9. Conectar MCP oficial no Claude Code Kolden (se plano permitir).
10. Configurar webhook `WEBHOOK.CONVERTED` para propagar para Hermes/Kommo/Meta CAPI se necessário.

---

## Instalação — provisionar novo cliente

Passos gerais (detalhamento clique-a-clique em `api.md` §OAuth2 e no doc de
configuração de fluxos por cliente):

1. **Cliente contrata plano RD Station Marketing** (Pro+ se houver fluxos avançados).
2. **Admin do cliente cria conta / dá acesso a operador Kolden** em `app.rdstation.com.br`.
3. **Criar App OAuth2** no App Publisher (`https://appstore.rdstation.com/pt-BR/publisher`) com callback do Kolden.
4. **Rodar fluxo OAuth2 uma vez** (browser) para obter `code` → trocar por `access_token` + `refresh_token`.
5. **Salvar tokens no Infisical** (path `/kolden/clientes/<cliente>/prod/RDSTATION_*`).
6. **Autenticar domínio de envio** do cliente (SPF/DKIM/DMARC — 5 entradas DNS geradas pela UI da RD).
7. **Instalar apps de integração** (Nuvemshop, Shopify, Meta Lead Ads etc.) conforme stack do cliente.
8. **Criar tags e segmentações base** conforme padrão do cliente.
9. **Construir fluxos de automação** manualmente na UI seguindo doc de configuração cliente-específico.
10. **Conectar MCP oficial** no Claude Code Kolden (`claude mcp add --transport http rdstation-<cliente> https://mcp.rdstationmentor.com/marketing`) se plano Pro+.
11. **Registrar cliente** em `sobre-a-empresa/Ferramentas/RDStation/ferramentas.md` §Contas provisionadas.
12. **Testar** envio de teste (5–100 destinatários por plano, janela 2h) antes de publicar campanhas reais.
