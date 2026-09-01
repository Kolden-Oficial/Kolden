---
id: rosie-dossie-tecnico-rd-station-configuracao
titulo: "Rosie — Configuração RD Station Marketing (4 fluxos, 15 e-mails)"
resumo: "Doc operacional pronto para execução na conta RD Station Marketing da Rosie. Cada fluxo tem metadados, sequência clique-a-clique na UI e payload de API quando aplicável. Escopo desta rodada: Boas-vindas, Carrinho abandonado, Pós-compra, Winback. Fluxo 2 (Nutrição) adiado até HTMLs semanas 5-12 estarem prontos."
categoria: projeto
palavras-chave: [rosie, rd-station, configuracao, fluxos-automacao, boas-vindas, carrinho, pos-compra, winback]
status: pronto-para-executar
atualizado-em: 2026-08-18
autor: "Kolden — orquestrado por Claude Code"
relacionados:
  - ./fluxos-email-v3-voz-marca.md
  - ./emails-html/_index.md
  - ../../../../Ferramentas/RDStation/ferramentas.md
  - ../../../../Ferramentas/RDStation/api.md
  - ../../../../Ferramentas/RDStation/mcp-status.md
  - ../../../../Ferramentas/RDStation/docs-oficiais.md
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
---

# Configuração RD Station Marketing — Fluxos Rosie

**Fonte editorial dos conteúdos:** `fluxos-email-v3-voz-marca.md` (voz Rosie v3, 2026-07-14).
**Fonte técnica RD Station:** `sobre-a-empresa/Ferramentas/RDStation/*` (dossiê 4 arquivos, 2026-08-18).

**Escopo desta rodada:** 4 fluxos, 15 e-mails.
- ✅ Fluxo 1 — Boas-vindas (5)
- ⏸️ Fluxo 2 — Nutrição semanal (**adiado**: 8 HTMLs semanas 5-12 pendentes)
- ✅ Fluxo 3 — Carrinho abandonado (3)
- ✅ Fluxo 4 — Pós-compra (4)
- ✅ Fluxo 5 — Winback (3)

**Total de e-mails ativos nesta rodada:** 15 (5 + 3 + 4 + 3).

**Pré-requisitos de plano:**
- **RD Station Marketing Pro ou Advanced** — obrigatório. Automação completa (todas as ações), gatilhos e-commerce, teste A/B de assunto, Lead Scoring e app Nuvemshop para eventos automáticos exigem Pro+. O plano Basic **não roda** os fluxos 3 e 4 pelo caminho automático.

---

## 0. Pré-requisitos (fazer 1x antes de qualquer fluxo)

### 0.1 Autenticar domínio de envio da Rosie (SPF/DKIM/DMARC)

**Onde:** RD Station Marketing → **Conta → Configurações → Domínios**.

**Passos:**
1. Botão **Vamos lá** (primeira configuração) ou **Editar** (se já existir domínio).
2. Definir **domínio + subdomínio** que aparecerá no campo "Enviado por" (sugestão: `email.rosie.com.br`).
3. RD gera **5 entradas DNS obrigatórias** automaticamente:
   - **3 CNAMEs para DKIM**
   - **1 CNAME para SPF**
   - **1 CNAME para DMARC**
4. Colar as 5 entradas no provedor de DNS do domínio `rosie.com.br` (Registro.br / CloudFlare / etc.).
5. Se já houver SPF configurado no servidor, **adicionar `include:_spf.rdstation.com.br`** ao registro TXT `v=spf1` existente. **Não substituir.**
6. Aguardar propagação (até 48h).
7. Clicar em **Verificar alterações** para re-checar.
8. Se der conflito com registros pré-existentes (ex.: SendGrid), botão **Gerar entradas alternativas**.

**Regra crítica:** subdomínio de LP (Landing Pages) deve ser **diferente** do subdomínio de e-mail. Só o domínio-raiz pode coincidir.

**Não usar remetente `@gmail.com`, `@yahoo.com`, `@hotmail.com`** — a RD bloqueia providers gratuitos. Precisa domínio próprio autenticado.

**Obrigatoriedade Gmail/Yahoo:** desde fev/2024, autenticação de domínio é exigência para envios ≥ 5.000 e-mails/mês para Gmail/Yahoo.

### 0.2 Instalar app Nuvemshop na conta RD Station Marketing

**Pré-requisito:** conta RD Station **Marketing para Ecommerce Pro ou Advanced**.

**Onde:** UI da RD Station → **Dashboard → Conectar minha loja → Conectar com minha Nuvemshop**.

**Passos:**
1. Clicar em "Conectar com minha Nuvemshop".
2. Fluxo OAuth Nuvemshop → login com credenciais da conta Rosie Nuvemshop.
3. Aceitar permissões (RD recebe eventos; sem escrita na Nuvemshop).
4. Confirmar sincronização inicial (pode levar minutos).

**Eventos que a Nuvemshop passa a disparar automaticamente:**
- **Carrinho abandonado** — após 4h sem update de carrinho **e** com e-mail preenchido no checkout (janela fixa, não configurável)
- **Pedido realizado** — pedido criado
- **Pedido pago** — pagamento confirmado
- **Pedido cancelado** — cancelamento
- **Pedido enviado** — envio com código de rastreio

**Limitações confirmadas** (ver `Ferramentas/RDStation/api.md` §8):
- Origem do lead sempre "Desconhecido" — UTMs não são repassadas
- Campos personalizados da Nuvemshop **não** são enviados
- Sem envio se cliente não preencheu email no checkout
- Janela de 4h é fixa

### 0.3 Criar tags-base na Base de Leads

**Onde:** Menu **Contatos** (Navbar 360) → **Tags** → **Nova Tag**.

Criar as tags:
- `origem-newsletter` — aplicada pelo Fluxo 1 (novos leads via formulário)
- `onboarded` — aplicada ao fim do Fluxo 1
- `comprou` — aplicada ao entrar no Fluxo 4
- `ativo-30d` — aplicada por segmentação dinâmica (ver 0.4)
- `cold-45d` — aplicada por segmentação dinâmica
- `winback-reengajada` — aplicada por click nos e-mails 5.1 ou 5.3
- `winback-suprimida` — aplicada ao final do Fluxo 5 se não reengajar
- `cliente-d21` — aplicada 21 dias após compra (via delay no Fluxo 4)

Limite: até **15 tags por ação "Adicionar tag"** em fluxo.

### 0.4 Criar segmentações base

**Onde:** Menu **Contatos** → **Segmentações** → **Nova Segmentação**.

**Segmentação 1 — "Assinante ativa (30d)"** (gatilho do Fluxo 2 quando ele voltar)
- Critério: abriu ≥ 1 e-mail nos últimos 30 dias
- Tipo: dinâmica

**Segmentação 2 — "Cold 45d"** (gatilho do Fluxo 5)
- Critério: sem abertura de e-mail há 45+ dias E na base há mais de 45 dias
- Tipo: dinâmica

**Segmentação 3 — "Compradora D+21"** (gatilho do Fluxo 4.4 se separado do Fluxo 4)
- Critério: tem tag `comprou` E última compra há 21 dias
- Tipo: dinâmica

**Segmentação 4 — "Reengajadas"** (para promover de volta à lista ativa)
- Critério: tem tag `winback-reengajada`
- Tipo: dinâmica

### 0.5 Criar cupons na Nuvemshop

**Onde:** UI Nuvemshop → **Marketing → Cupons de desconto → Novo cupom**.

**Cupom 1 — `PRIMEIRA`** (Fluxo 1, e-mail 1.5)
- Tipo: frete grátis
- Valor mínimo: sem mínimo
- Uso: único por cliente
- Validade: 7 dias após emissão (configurar por lead ou datas rolantes)

**Cupom 2 — `SEUFRETE`** (Fluxo 3, e-mail 3.3)
- Tipo: frete grátis
- Valor mínimo: sem mínimo
- Uso: único por cliente
- Validade: 48h após emissão

### 0.6 Subir os 15 templates HTML no E-mail Marketing

**Onde:** Menu **Relacionar → E-mail** → **Criar e-mail**.

Para **cada um dos 15 HTMLs** (paths em `./emails-html/`):

1. Botão **Criar e-mail** (canto superior direito).
2. Escolher **Importar com HTML** (botão exato — nome confirmado na doc RD).
3. Colar o **link** do HTML (deploy Vercel: `https://rosie-emails.vercel.app/{arquivo}.html`) — RD baixa e importa.
4. Nomear o template com o mesmo nome do arquivo (ex.: `rosie-01-boasvindas-01-hello`).
5. **Objetivo do e-mail:** selecionar **Automação** (dropdown com 3 opções: Campanha / Teste A/B / Automação — sempre Automação para uso em fluxo).
6. Preencher **Assunto** (usar Assunto A do master doc; se plano Advanced, configurar A/B com Assunto B).
7. Preencher **Pré-cabeçalho** (preview text — usar campo "Preview" do master doc).
8. Preencher **Remetente**: `Rosie <email.rosie.com.br>` (ou o subdomínio autenticado no 0.1).
9. Conteúdo já vem do HTML importado — revisar tokens (ver 0.6.1 abaixo).
10. **Enviar teste** para o e-mail do Ronan antes de salvar (botão "Enviar e-mail para teste" — limite 50/2h no Pro, 100/2h no Advanced).
11. **Salvar**. E-mail fica listado em `Relacionar → E-mail`.

**Nomenclatura padronizada** (segue master doc):
`rosie-{NN-fluxo}-{NN-posicao}-{tema-curto}` — kebab-case.

### 0.6.1 Mapear tokens dinâmicos no HTML → RD Station

Os 15 HTMLs contêm placeholders. Substituir por **variáveis nativas do RD Station** (inseridas via botão "Adicionar variável" dentro de cada componente de Texto do editor):

| Token no HTML | Substituto RD Station | Notas |
|---------------|----------------------|-------|
| `{{NOME}}` | Variável **Nome** (padrão) | Preencher via formulário/API |
| `{NOME_DA_PEÇA}` | Custom field **`cf_nome_da_peca`** — criado via app Nuvemshop | Vem do payload de carrinho abandonado |
| `{TAMANHO}` | Custom field **`cf_tamanho`** | Vem do payload Nuvemshop |
| `{PREÇO}` | Custom field **`cf_preco`** | Vem do payload Nuvemshop |
| `{ESTOQUE}` | Custom field **`cf_estoque_disponivel`** | Requer sync manual ou webhook Nuvemshop; se não sincronizar, **remover parágrafo** que menciona estoque no e-mail 3.2 |
| `{RESUMO_DO_PEDIDO}` | Bloco dinâmico de produtos (via catálogo sincronizado) | Requer catálogo RD sincronizado com Nuvemshop |
| `{VALOR}` | `cf_valor_pedido` | Nuvemshop popula |
| `{ENDEREÇO_CURTO}` | `cf_endereco` (custom) | Confirmar mapping no Nuvemshop app |
| `{CIDADE}` | Variável **Cidade** (padrão) | |
| `{X}`, `{Y}` (prazo entrega) | Texto fixo | Substituir por range fixo (ex.: "3 a 7 dias úteis") |
| `{PEÇA_COMPRADA}` | Bloco dinâmico ou segmentação por categoria | Se difícil, substituir por texto genérico no cross-sell |
| `{{URL_HOME_LOJA}}` | URL fixa `https://rosie.com.br/` | |
| `[link retomar checkout]` | `cf_cart_url` | Nuvemshop popula |
| `[link WhatsApp]` | URL fixa do WhatsApp Rosie | Definir número + copiar link `wa.me/55XXXX` |
| `[link perfil]` (@rosieiadoreyou) | `https://instagram.com/rosieiadoreyou` | Fixo |
| `[reply-to este e-mail]` | Botão CTA que abre `mailto:` do remetente | Configurar como link `mailto:contato@rosie.com.br?subject=Foto+da+peca` |

**⚠️ Custom fields no RD:** criar antes de importar HTMLs em **Contatos → Campos personalizados** ou via API `POST /platform/contacts/fields`. Palavras reservadas (não aceitas): `cf_cart_*`, `cf_order_*`, `email`, `phone`, `tags`, etc. — se conflitar, prefixar diferente (`cf_rosie_cart_*`).

### 0.7 (Opcional) Criar App OAuth2 para integração Hermes

Se quiser propagar eventos RD → Kommo/Meta CAPI via Hermes:

**Onde:** https://appstore.rdstation.com/pt-BR/publisher

**Passos:**
1. Login com conta Rosie/Kolden na RD.
2. Botão **Quero criar um app** → nome `Kolden — Integração Rosie` → tipo **Aplicativo privado** → **Criar app**.
3. Idioma: Português. Callback URL: `https://hermes.kolden.com.br/oauth/rdstation/callback` (definir com equipe Hermes).
4. Salvar → capturar `client_id` e `client_secret`.
5. Rodar o fluxo OAuth uma vez manualmente para trocar `code` por `refresh_token`.
6. Guardar credenciais no Infisical: `/kolden/clientes/rosie/prod/RDSTATION_{CLIENT_ID,CLIENT_SECRET,REFRESH_TOKEN}`.

**Detalhes completos:** `Ferramentas/RDStation/api.md` §2.1.

---

## Fluxo 1 — Boas-vindas

### Bloco 1: Metadados

- **Nome do fluxo (na UI):** `Rosie · Boas-vindas · v3`
- **Gatilho de entrada:** Conversão em formulário — **"Newsletter Rosie"** (ID a confirmar após criar o formulário no site da Rosie)
- **Modo de entrada:** "Leads que vão atender aos critérios" (**prospectivo** — só novos leads a partir da ativação)
- **Objetivo:** levar novo lead à primeira compra em 5 dias
- **Métricas alvo:** taxa de abertura E1 ≥ 45%; CTR médio ≥ 12%; 1ª compra em 7 dias ≥ 8% dos leads
- **Duração total:** D+0 → D+4 (5 dias)
- **Nº de e-mails:** 5
- **Tags aplicadas:** entrada → nenhuma; saída → `onboarded`
- **Reentrada:** apenas uma vez (configuração no bloco Configurações do fluxo)
- **Especialista líder:** Andre Chaperon (Soap Opera Sequence)

### Bloco 2: Configuração clique-a-clique (RD Station Marketing)

1. Menu **Relacionar → Automação de Marketing**.
2. Botão **Criar fluxo** (canto superior direito).
3. No modal, preencher **Nome do fluxo**: `Rosie · Boas-vindas · v3` → **Continuar**.
4. Abre o editor (canvas visual). Aba **Entrada** ativa por padrão.
5. Clicar em **+ Selecionar uma entrada**.
6. Primeiro dropdown **Selecione os leads**: escolher **"Leads que vão atender aos critérios"**.
7. Segundo dropdown **Selecione a entrada**: escolher **"Converteram no evento"**.
8. Sub-dropdown de fonte: **Formulário** → escolher formulário `Newsletter Rosie` (criado antes no site).
9. Salvar entrada.
10. Botão **Ações** (canto superior direito) → painel lateral abre com 7 categorias.

**Sequência de ações a arrastar do painel para o `+` no canvas (na ordem):**

| # | Categoria | Ação | Config |
|---|-----------|------|--------|
| A1 | Espera | **Esperar** | 15 minutos |
| A2 | Comunicação | **Enviar e-mail** | Selecionar `rosie-01-boasvindas-01-hello` |
| A3 | Espera | **Esperar e agendar hora** | 24 horas, agendar entre 09h-11h (horário do lead) |
| A4 | Comunicação | **Enviar e-mail** | Selecionar `rosie-01-boasvindas-02-canelada` |
| A5 | Espera | **Esperar e agendar hora** | 24 horas, entre 09h-11h |
| A6 | Comunicação | **Enviar e-mail** | Selecionar `rosie-01-boasvindas-03-jeans` |
| A7 | Espera | **Esperar e agendar hora** | 24 horas, entre 09h-11h |
| A8 | Comunicação | **Enviar e-mail** | Selecionar `rosie-01-boasvindas-04-troca` |
| A9 | Espera | **Esperar e agendar hora** | 24 horas, entre 09h-11h |
| A10 | Comunicação | **Enviar e-mail** | Selecionar `rosie-01-boasvindas-05-mimo` |
| A11 | Gerenciar lead | **Adicionar tag** | `onboarded` |

11. Aba **Saída** (canto superior esquerdo): marcar apenas **"Ao chegar ao final do fluxo"** (obrigatório e imutável).
12. Aba **Configurações**:
    - Toggle **Considerar finais de semana nas ações de espera** = **desligado** (Rosie envia só em dia útil)
    - **Regra de reentrada no fluxo** = **"apenas uma vez"**
13. Botão **Salvar e ativar** (canto superior direito).
14. Pop-up de confirmação: **Ativar fluxo**.

### Bloco 3: Payload de API (se aplicável)

**⚠️ API RD Station NÃO cria fluxos.** Só é possível **inserir leads em fluxo existente**:

```http
POST https://api.rd.services/platform/workflows/{workflow_id}/leads
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "leads": [
    {"email": "cliente-1@exemplo.com"},
    {"email": "cliente-2@exemplo.com"}
  ]
}
```

**Rate limit para POST leads em fluxo:** Light/Basic 1/h · **Pro 10/h** · Advanced 100/h.

Uso previsto para o Fluxo 1: **nenhum via API** — o gatilho automático é conversão em formulário. Só cair no POST manual se precisar re-enfileirar lead que ficou de fora (ex.: importação retroativa).

### Bloco 4: E-mails do fluxo (metadados por e-mail)

#### 1.1 · `rosie-01-boasvindas-01-hello`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-01-boasvindas-01-hello.html` |
| URL deploy | `https://rosie-emails.vercel.app/rosie-01-boasvindas-01-hello.html` |
| Objetivo | Automação |
| Assunto A | `Oi. Aqui é a Rosie.` |
| Assunto B (Advanced only) | `Bem-vinda ao meu armário` |
| Pré-cabeçalho | `Nice to meet you. Uma promessa em uma peça.` |
| Remetente (nome) | `Rosie` |
| Remetente (e-mail) | `contato@email.rosie.com.br` (ou subdomínio autenticado) |
| Delay antes | 15 minutos |
| Tags antes/depois | — / — |

#### 1.2 · `rosie-01-boasvindas-02-canelada`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-01-boasvindas-02-canelada.html` |
| Assunto A | `A peça que quase ficou de fora` |
| Assunto B | `Quase joguei essa fora` |
| Pré-cabeçalho | `história curta, moral no final` |
| Remetente | `Rosie <contato@email.rosie.com.br>` |
| Delay antes | 24h (agendar 10h horário do lead) |

#### 1.3 · `rosie-01-boasvindas-03-jeans`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-01-boasvindas-03-jeans.html` |
| Assunto A | `Um ano só nesse jeans` |
| Assunto B | `Por que o jeans é a peça mais cara` |
| Pré-cabeçalho | `e por que ele resolve o resto do armário` |
| Delay antes | 24h (10h) |

#### 1.4 · `rosie-01-boasvindas-04-troca`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-01-boasvindas-04-troca.html` |
| Assunto A | `Se não servir, a gente resolve` |
| Assunto B | `Como funciona a troca aqui` |
| Pré-cabeçalho | `sem stress, sem julgamento` |
| Delay antes | 24h (10h) |

#### 1.5 · `rosie-01-boasvindas-05-mimo`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-01-boasvindas-05-mimo.html` |
| Assunto A | `Um mimo pra você` |
| Assunto B | `Frete grátis na sua primeira` |
| Pré-cabeçalho | `por ter lido até aqui` |
| Delay antes | 24h (10h) |
| Notas | Contém cupom `PRIMEIRA` — confirmar cupom criado na Nuvemshop no §0.5 |

---

## Fluxo 3 — Carrinho abandonado

### Bloco 1: Metadados

- **Nome do fluxo (na UI):** `Rosie · Carrinho abandonado · v3`
- **Gatilho de entrada:** **eCommerce → Nuvemshop → Carrinho abandonado** (evento nativo do app Nuvemshop)
- **Modo de entrada:** "Leads que vão atender aos critérios" (só novos abandonos)
- **Objetivo:** recuperar venda em 3 dias sem canibalizar margem
- **Métricas alvo:** taxa de recuperação por fluxo ≥ 15%; valor médio recuperado
- **Duração total:** D+0 → D+3
- **Nº de e-mails:** 3
- **Tags aplicadas:** entrada → `carrinho-abandonado-em-curso`; saída → `carrinho-recuperado` OU `carrinho-nao-recuperado`
- **Reentrada:** sempre que atender aos critérios (cada abandono novo dispara)
- **Especialista líder:** Ry Schwartz + Cialdini

**⚠️ Bloqueio conhecido:** e-mail 3.2 contém placeholder `[PERSONA_VALIDAR]` na linha "Se você estava esperando um sinal…" — deixar o parágrafo genérico ou remover antes de ativar em produção. Aletheia/Emporos precisa validar via Mom Test antes de dar o texto final.

**⚠️ Janela Nuvemshop:** carrinho abandonado dispara **4h após o abandono e só se e-mail preenchido no checkout**. Isso já cobre o gatilho de "D+0, 1h" pedido pelo master doc — o próprio evento já chega da Nuvemshop após ~4h. O bloco `Esperar 1h` do e-mail 3.1 deve ser **omitido** ou trocado por delay curto adicional se quiser esperar além das 4h já fixas.

### Bloco 2: Configuração clique-a-clique

1. Menu **Relacionar → Automação de Marketing** → **Criar fluxo**.
2. Nome: `Rosie · Carrinho abandonado · v3` → **Continuar**.
3. **Aba Entrada** → **+ Selecionar uma entrada**.
4. **Selecione os leads**: "Leads que vão atender aos critérios".
5. **Selecione a entrada**: **"eCommerce"**.
6. **Plataforma**: Nuvemshop.
7. **Evento**: **Carrinho abandonado**.
8. Salvar entrada.

**Sequência de ações:**

| # | Categoria | Ação | Config |
|---|-----------|------|--------|
| A1 | Gerenciar lead | **Adicionar tag** | `carrinho-abandonado-em-curso` |
| A2 | Comunicação | **Enviar e-mail** | `rosie-03-carrinho-01-lembrete` |
| A3 | Caminho do lead | **Dividir caminho por segmentação** | Segmentação dinâmica: "converteu = pedido pago pra este carrinho" (via custom field `cf_cart_id`). Se **Sim** → sair do fluxo (Marcar venda). Se **Não** → continuar. |
| A4 | Espera | **Esperar** | 24 horas |
| A5 | Comunicação | **Enviar e-mail** | `rosie-03-carrinho-02-provasocial` |
| A6 | Caminho do lead | **Dividir caminho por segmentação** | Mesma segmentação. Sim → sair. Não → continuar. |
| A7 | Espera | **Esperar** | 48 horas |
| A8 | Comunicação | **Enviar e-mail** | `rosie-03-carrinho-03-fretegratis` |
| A9 | Espera | **Esperar** | 48 horas |
| A10 | Gerenciar lead | **Adicionar tag** | `carrinho-nao-recuperado` (se chegou até aqui, não converteu) |

**Alternativa mais simples (sem split por segmentação):** usar critério de saída do fluxo "Ao registrar em um dos eventos de e-Commerce = Pedido pago" (aba Saída). Isso faz o fluxo terminar automaticamente quando o carrinho vira pedido. Menos preciso mas dispensa a segmentação por `cart_id`.

9. **Aba Saída**:
   - ✅ "Ao chegar ao final do fluxo" (obrigatório)
   - ✅ **"Ao registrar em um dos eventos de e-Commerce"** → escolher **Pedido pago** e **Pedido realizado**
   - ✅ **"Ao converter em uma das opções definidas como critério de entrada"** (evita re-loop no mesmo abandono)
10. **Aba Configurações**:
    - Finais de semana: **ligado** (carrinho abandonado é urgente — dispara qualquer dia)
    - Regra de reentrada: **sempre que atender aos critérios**
11. **Salvar e ativar** → **Ativar fluxo**.

### Bloco 3: Payload de API (alternativa manual)

Se quiser disparar carrinho abandonado via API (fora do app Nuvemshop):

```http
POST https://api.rd.services/platform/events?event_type=ECOMMERCE_CART_ABANDONED
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "event_type": "ECOMMERCE_CART_ABANDONED",
  "event_family": "CDP",
  "payload": {
    "email": "cliente@exemplo.com",
    "currency": "BRL",
    "total_items": 2,
    "cart_id": "cart-abc-123",
    "cart_total": 349.90,
    "cart_url": "https://rosie.com.br/carrinho/cart-abc-123",
    "products": [
      {"product_id":"sku-canelada-P","name":"Canelada","sku":"CAN-P","price":179.90,"quantity":1},
      {"product_id":"sku-jeans-M","name":"Jeans reto","sku":"JN-M","price":170.00,"quantity":1}
    ]
  }
}
```

Rate limit: 120 req/min conta (Pro) · 120 req/24h por lead.
Auth: OAuth2 obrigatório (API Key só serve para `CONVERSION`).

### Bloco 4: E-mails do fluxo

#### 3.1 · `rosie-03-carrinho-01-lembrete`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-03-carrinho-01-lembrete.html` |
| Assunto A | `Você deixou uma coisa aqui` |
| Assunto B | `Isso ainda é seu` |
| Pré-cabeçalho | `não some, mas o estoque é limitado` |
| Delay antes | 1h após entrada (janela Nuvemshop já é 4h — este delay pode ser 0 ou omitido) |
| Tokens críticos | `cf_nome_da_peca`, `cf_tamanho`, `cf_preco`, `cf_cart_url` |

#### 3.2 · `rosie-03-carrinho-02-provasocial` ⚠️

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-03-carrinho-02-provasocial.html` |
| Assunto A | `Deixa eu te contar quem já tem essa peça` |
| Assunto B | `O que a Renata falou dessa peça` |
| Pré-cabeçalho | `e o que eu queria te falar antes de você decidir` |
| Delay antes | 24h |
| Tokens críticos | `cf_nome_da_peca`, `cf_tamanho`, `cf_estoque_disponivel`, `cf_cart_url` |
| **Bloqueio** | Placeholder `[PERSONA_VALIDAR]` na linha "Se você estava esperando um sinal…" — resolver antes de publicar |
| **Se `cf_estoque_disponivel` não sincronizar** | Remover parágrafo sobre estoque para não vazar `{ESTOQUE}` cru no e-mail |

#### 3.3 · `rosie-03-carrinho-03-fretegratis`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-03-carrinho-03-fretegratis.html` |
| Assunto A | `Última coisa que eu queria te dizer` |
| Assunto B | `Frete grátis nessa aqui, por minha conta` |
| Pré-cabeçalho | `um empurrão pequeno, sem drama` |
| Delay antes | 48h após 3.2 |
| Cupom | `SEUFRETE` (confirmar criação no §0.5) |
| Validade cupom | 48h após envio |

---

## Fluxo 4 — Pós-compra

### Bloco 1: Metadados

- **Nome do fluxo:** `Rosie · Pós-compra · v3`
- **Gatilho de entrada:** **eCommerce → Nuvemshop → Pedido pago** (evento nativo do app)
- **Modo de entrada:** "Leads que vão atender aos critérios"
- **Objetivo:** aumentar LTV — transformar compradora em recompradora e criadora de UGC
- **Métricas alvo:** taxa de UGC (respostas + tags @rosieiadoreyou) ≥ 5%; taxa de recompra em 30d ≥ 12%
- **Duração total:** D+0 → D+21
- **Nº de e-mails:** 4
- **Tags aplicadas:** entrada → `comprou`; após E4 → `cliente-d21`
- **Reentrada:** sempre que atender aos critérios (cada compra nova dispara)
- **Especialista líder:** Russell Brunson

**⚠️ Sobre gatilho "Pedido pago" vs "Pedido realizado":**
- Escolher **Pedido pago** para garantir que só clientes que efetivamente pagaram entrem no fluxo (não pending/aguardando).
- Se cliente cancela após pagamento, RD não remove do fluxo — considerar critério de saída "Pedido cancelado".

### Bloco 2: Configuração clique-a-clique

1. **Relacionar → Automação de Marketing** → **Criar fluxo**.
2. Nome: `Rosie · Pós-compra · v3` → **Continuar**.
3. **Entrada** → **eCommerce** → Nuvemshop → **Pedido pago**.
4. Salvar entrada.

**Ações:**

| # | Categoria | Ação | Config |
|---|-----------|------|--------|
| A1 | Gerenciar lead | **Adicionar tag** | `comprou` |
| A2 | Espera | **Esperar** | 5 minutos |
| A3 | Comunicação | **Enviar e-mail** | `rosie-04-poscompra-01-confirmacao` |
| A4 | Espera | **Esperar** | 72 horas |
| A5 | Comunicação | **Enviar e-mail** | `rosie-04-poscompra-02-cuidados` |
| A6 | Espera | **Esperar** | 4 dias (para completar 7 dias desde a compra) |
| A7 | Comunicação | **Enviar e-mail** | `rosie-04-poscompra-03-ugc` |
| A8 | Espera | **Esperar** | 14 dias (para completar 21 dias desde a compra) |
| A9 | Gerenciar lead | **Adicionar tag** | `cliente-d21` |
| A10 | Comunicação | **Enviar e-mail** | `rosie-04-poscompra-04-crosssell` |

5. **Aba Saída**:
   - ✅ "Ao chegar ao final do fluxo"
   - ✅ **"Ao registrar em um dos eventos de e-Commerce"** → escolher **Pedido cancelado** e **Pedido reembolsado** (para não continuar mandando pós-compra a quem cancelou)
6. **Aba Configurações**:
   - Finais de semana: ligado
   - Reentrada: sempre que atender aos critérios (cada nova compra)
7. **Salvar e ativar** → **Ativar fluxo**.

### Bloco 3: Payload de API (alternativa)

```http
POST https://api.rd.services/platform/events?event_type=ECOMMERCE_ORDER_PAID
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "event_type": "ECOMMERCE_ORDER_PAID",
  "event_family": "CDP",
  "payload": {
    "email": "cliente@exemplo.com",
    "currency": "BRL",
    "order_id": "10234",
    "total": 549.90,
    "products": [
      {"product_id":"sku-canelada-P","name":"Canelada","sku":"CAN-P","price":179.90,"quantity":1},
      {"product_id":"sku-jeans-M","name":"Jeans reto","sku":"JN-M","price":370.00,"quantity":1}
    ]
  }
}
```

### Bloco 4: E-mails do fluxo

#### 4.1 · `rosie-04-poscompra-01-confirmacao`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-04-poscompra-01-confirmacao.html` |
| Assunto A | `Recebi o seu pedido` |
| Assunto B | `Seu pedido tá comigo` |
| Pré-cabeçalho | `e uma coisa que eu queria te dizer` |
| Delay antes | 5 minutos |
| Tokens críticos | `cf_resumo_pedido`, `cf_valor_pedido`, `cf_endereco`, `Cidade`, prazo entrega fixo |

#### 4.2 · `rosie-04-poscompra-02-cuidados`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-04-poscompra-02-cuidados.html` |
| Assunto A | `Antes de você abrir o pacote` |
| Assunto B | `Como fazer a peça durar` |
| Pré-cabeçalho | `duas coisas simples, e a segunda importa mais` |
| Delay antes | 72h |
| Notas | Sem tokens dinâmicos — conteúdo institucional; link fixo `[link guia de cuidados]` |

#### 4.3 · `rosie-04-poscompra-03-ugc`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-04-poscompra-03-ugc.html` |
| Assunto A | `Me manda uma foto?` |
| Assunto B | `Isso é o que eu peço em troca` |
| Pré-cabeçalho | `e o que eu faço com ela` |
| Delay antes | 4 dias (após 4.2, total 7d desde compra) |
| Notas | CTA principal = reply-to (mailto). CTA secundário = Instagram `@rosieiadoreyou` fixo |

#### 4.4 · `rosie-04-poscompra-04-crosssell`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-04-poscompra-04-crosssell.html` |
| Assunto A | `Uma peça que combina com o que você já pegou` |
| Assunto B | `Uma sugestão pra fechar o look` |
| Pré-cabeçalho | `escolhida a dedo, não é lista aleatória` |
| Delay antes | 14 dias (após 4.3, total 21d desde compra) |
| Tokens críticos | `cf_peca_comprada` OU texto genérico com 3 opções pré-escritas (canelada+jeans / jeans+camiseta / statement+canelada) |

---

## Fluxo 5 — Winback

### Bloco 1: Metadados

- **Nome do fluxo:** `Rosie · Winback · v3`
- **Gatilho de entrada:** **Entraram na lista de segmentação → "Cold 45d"** (criada em §0.4)
- **Modo de entrada:** "Leads que vão atender aos critérios" (novos leads Cold, não os que já estão frios há mais tempo)
- **Objetivo:** recuperar assinante OU limpar a base (mover para lista suprimida)
- **Métricas alvo:** ≥ 15% clicam em "quero ficar" nos e-mails 5.1 ou 5.3; ≥ 60% saem da lista após E3
- **Duração total:** D+45 → D+59 (14 dias após entrada no segmento)
- **Nº de e-mails:** 3
- **Tags aplicadas:** clique nos CTAs de reengajamento → `winback-reengajada`; fim do fluxo sem clique → `winback-suprimida`
- **Reentrada:** apenas uma vez (não re-enfileirar quem já passou)
- **Especialista líder:** Todd Brown (E5) + Ben Settle (voz direta)

### Bloco 2: Configuração clique-a-clique

**Pré-requisito:** ter criado tag `winback-reengajada` (§0.3) e segmentação "Cold 45d" (§0.4).

**Setup de link tracker para reengajamento** (fazer antes de subir os HTMLs):
- No RD Station Marketing, os cliques em CTAs de e-mail são rastreados automaticamente.
- O CTA "Continuo na lista da Rosie" (E5.1 e E5.3) deve apontar para uma **Landing Page interna simples** com título "Obrigada, você continua na lista da Rosie" que **também dispara** uma automação secundária: `Adicionar tag: winback-reengajada`.
- **Alternativa mais simples** (sem LP): usar **"Dividir caminho por e-mail do fluxo"** dentro do próprio fluxo winback e ramificar para "Adicionar tag: winback-reengajada" se clicou em qualquer link.

**Setup do fluxo:**

1. **Relacionar → Automação de Marketing** → **Criar fluxo**.
2. Nome: `Rosie · Winback · v3` → **Continuar**.
3. **Entrada** → **"Entraram na lista de segmentação"** → escolher **"Cold 45d"**.
4. Salvar entrada.

**Ações:**

| # | Categoria | Ação | Config |
|---|-----------|------|--------|
| A1 | Comunicação | **Enviar e-mail** | `rosie-05-winback-01-sumiu` |
| A2 | Espera | **Esperar** | 7 dias |
| A3 | Caminho do lead | **Dividir caminho por e-mail do fluxo** | Escolher `rosie-05-winback-01-sumiu` → **clicou** = Sim/Não |
| A3-Sim | Gerenciar lead | **Adicionar tag** | `winback-reengajada` (sai do fluxo pelo critério de saída) |
| A3-Não | Comunicação | **Enviar e-mail** | `rosie-05-winback-02-o-que-mudou` |
| A4 | Espera | **Esperar** | 7 dias |
| A5 | Caminho do lead | **Dividir caminho por e-mail do fluxo** | Escolher `rosie-05-winback-02-o-que-mudou` → clicou/abriu = Sim/Não |
| A5-Sim | Gerenciar lead | **Adicionar tag** | `winback-reengajada` (sai) |
| A5-Não | Comunicação | **Enviar e-mail** | `rosie-05-winback-03-ultima-chamada` |
| A6 | Espera | **Esperar** | 7 dias |
| A7 | Caminho do lead | **Dividir caminho por e-mail do fluxo** | Escolher `rosie-05-winback-03-ultima-chamada` → clicou = Sim/Não |
| A7-Sim | Gerenciar lead | **Adicionar tag** | `winback-reengajada` |
| A7-Não | Gerenciar lead | **Adicionar tag** | `winback-suprimida` (marca para remover da lista principal) |

**Precaução crítica:** entre um envio de e-mail e o split "Dividir caminho por e-mail do fluxo" **sempre inserir uma ação Esperar ≥ 1 dia**. Sem isso, todos os leads caem no ramo "Não" por falta de tempo de leitura. (Aqui já está com 7 dias — ok.)

5. **Aba Saída**:
   - ✅ "Ao chegar ao final do fluxo"
   - ✅ "Ao registrar em um dos eventos de integração" — se relevante (opcional; sair se lead voltar a comprar)
6. **Aba Configurações**:
   - Finais de semana: **desligado**
   - Reentrada: **apenas uma vez**
7. **Salvar e ativar** → **Ativar fluxo**.

**Pós-fluxo:** criar uma segmentação "Winback suprimida" com critério tag = `winback-suprimida` e usá-la para **excluir** dos disparos de campanhas gerais e do Fluxo 2 (Nutrição quando voltar).

### Bloco 3: Payload de API

Sem uso previsto — gatilho é segmentação dinâmica, criada e mantida pela UI.

Para consultar leads no fluxo (útil para debug):
```http
GET https://api.rd.services/platform/workflows/{workflow_id}/leads/started
Authorization: Bearer <access_token>
```
Rate: 1/3/12 req/h por plano.

### Bloco 4: E-mails do fluxo

#### 5.1 · `rosie-05-winback-01-sumiu`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-05-winback-01-sumiu.html` |
| Assunto A | `Sumiu ou eu que estou chata?` |
| Assunto B | `Faz um tempo` |
| Pré-cabeçalho | `pergunta honesta, uma resposta simples` |
| Delay antes | 0 (entra no D+45 do segmento) |
| CTA principal | `[link tracker de reengajamento — tag winback-reengajada]` — configurar como link para LP interna que dispara tag OU usar split "Dividir por clique" nas ações seguintes |

#### 5.2 · `rosie-05-winback-02-o-que-mudou`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-05-winback-02-o-que-mudou.html` |
| Assunto A | `O que aconteceu na Rosie desde que você sumiu` |
| Assunto B | `Vou te atualizar rápido` |
| Pré-cabeçalho | `três coisas concretas, e uma delas te interessa` |
| Delay antes | 7 dias após 5.1 |
| CTA principal | Link home da loja `https://rosie.com.br/` |

#### 5.3 · `rosie-05-winback-03-ultima-chamada`

| Campo | Valor |
|-------|-------|
| Path HTML | `./emails-html/rosie-05-winback-03-ultima-chamada.html` |
| Assunto A | `Último e-mail meu` |
| Assunto B | `Vou parar de aparecer aqui` |
| Pré-cabeçalho | `sem culpa, sem drama, só honestidade` |
| Delay antes | 7 dias após 5.2 |
| CTA principal | `[link reengajamento — tag Reengajada]` — mesmo mecanismo do 5.1 |

---

## Anexo A — Mapa completo de tokens dinâmicos (HTML → RD Station)

Ver §0.6.1 para tabela primária. Tokens críticos por fluxo:

| Fluxo | Token no HTML | Fonte de dado |
|-------|---------------|---------------|
| 1 (todos) | `{{URL_HOME_LOJA}}` | URL fixa `https://rosie.com.br/` |
| 1.5 | Cupom `PRIMEIRA` | Fixo no corpo do e-mail (Nuvemshop valida no checkout) |
| 3 (todos) | `{NOME_DA_PEÇA}`, `{TAMANHO}`, `{PREÇO}` | Custom fields populados pelo app Nuvemshop no evento carrinho abandonado |
| 3 (todos) | `[link retomar checkout]` | `cf_cart_url` |
| 3.2 | `{ESTOQUE}` | `cf_estoque_disponivel` — **sem garantia de sincronização** pelo app nativo Nuvemshop. Ou (a) sincronizar via webhook custom, ou (b) remover parágrafo |
| 3.3 | Cupom `SEUFRETE` | Fixo no corpo (validar cupom criado na Nuvemshop) |
| 4.1 | `{RESUMO_DO_PEDIDO}`, `{VALOR}`, `{ENDEREÇO_CURTO}`, `{CIDADE}` | Custom fields Nuvemshop |
| 4.1 | `{X}` a `{Y}` (prazo) | Substituir por range fixo (ex.: "3 a 7 dias úteis" — pode variar por região; se quiser dinâmico, criar 4 versões do e-mail por região) |
| 4.4 | `{PEÇA_COMPRADA}` | (a) `cf_peca_comprada` populada pelo Nuvemshop OU (b) texto genérico "a peça que você levou" |
| Todos | Nome do lead | Variável **Nome** (padrão RD) — inserir via "Adicionar variável" |

**Regra prática:** onde o token não estiver garantido, **fazer o e-mail funcionar sem ele** (texto que faça sentido sozinho) antes de ativar o fluxo. Um token vazio vira `{{NOME_DA_PEÇA}}` cru no e-mail — pior que remover.

---

## Anexo B — Bloqueios conhecidos (não publicar até resolver)

| # | Bloqueio | Onde | Como resolver | Dono |
|---|----------|------|---------------|------|
| B1 | Placeholder `[PERSONA_VALIDAR]` no e-mail 3.2 | `rosie-03-carrinho-02-provasocial.html`, linha "Se você estava esperando um sinal…" | Aletheia/Emporos valida via Mom Test com clientes reais; fornece texto de substituição | Aletheia |
| B2 | `cf_estoque_disponivel` não sincronizado pelo app Nuvemshop | Todo o parágrafo sobre estoque no e-mail 3.2 | Remover parágrafo OU montar sincronização via webhook Nuvemshop → RD Station | Kolden dev |
| B3 | `cf_peca_comprada` incerto no cross-sell 4.4 | Blocos de sugestão personalizada | Testar se app Nuvemshop expõe esse campo; senão, substituir por texto genérico com 3 categorias | Kolden dev |
| B4 | Cupons `PRIMEIRA` e `SEUFRETE` não criados na Nuvemshop | §0.5 | Criar via UI Nuvemshop antes de ativar Fluxos 1 e 3 | Cliente Rosie |
| B5 | Formulário "Newsletter Rosie" no site pode não existir | Gatilho do Fluxo 1 | Criar formulário RD embedável no site rosie.com.br OU trocar gatilho para "Integração" via API | Cliente Rosie |
| B6 | Autenticação de domínio SPF/DKIM/DMARC | §0.1 | Cliente/DNS admin faz alteração — propagação até 48h | Cliente Rosie + DNS admin |
| B7 | Plano RD Station | — | Confirmar Pro ou Advanced; upgrade se necessário | Cliente Rosie |
| B8 | App Nuvemshop instalado no RD | §0.2 | Admin da conta RD instala | Cliente Rosie |

**Regra:** nenhum fluxo pode ser **ativado em produção** com bloqueios B1 (persona), B4 (cupons), B5 (form), B6 (SPF/DKIM), B7 (plano), B8 (Nuvemshop) em aberto. Os demais (B2, B3) permitem publicar com workaround (remover parágrafo / texto genérico).

---

## Anexo C — Checklist de smoke test por fluxo

Antes de publicar, para cada fluxo:

**Preparação (uma vez):**
- [ ] Criar segmentação de teste "QA — smoke Rosie" com apenas os e-mails do Ronan + operador Kolden
- [ ] Cadastrar 3-5 e-mails de teste com nomes fictícios (para validar tokens {{NOME}})

**Por fluxo, na ordem 1 → 3 → 4 → 5:**

**Fluxo 1 — Boas-vindas:**
- [ ] Substituir gatilho temporariamente por "Entraram na lista de segmentação: QA — smoke Rosie"
- [ ] Ativar fluxo em modo teste
- [ ] Adicionar e-mail de teste à segmentação
- [ ] Esperar 15 min → e-mail 1.1 chega?
- [ ] Confirmar assunto, remetente, preheader, corpo renderizado, links funcionam
- [ ] Aguardar 24h → e-mail 1.2 chega no horário certo?
- [ ] Repetir até 1.5 (5 dias)
- [ ] Confirmar tag `onboarded` aplicada ao fim
- [ ] Testar cupom `PRIMEIRA` no checkout Nuvemshop
- [ ] Desativar fluxo, trocar gatilho para Formulário real, reativar

**Fluxo 3 — Carrinho:**
- [ ] Simular carrinho abandonado real no site Rosie (adicionar produto, preencher email no checkout, sair)
- [ ] Esperar 4-5h → evento chega no RD? (verificar em Contatos → perfil do lead → histórico)
- [ ] Fluxo dispara?
- [ ] E-mail 3.1 renderiza `{NOME_DA_PEÇA}`, `{TAMANHO}`, `{PREÇO}` corretamente
- [ ] Testar `cf_cart_url` — link retorna direto ao carrinho?
- [ ] Aguardar 24h → 3.2 dispara, split funciona
- [ ] Se placeholder `[PERSONA_VALIDAR]` ainda não resolvido → **NÃO ATIVAR EM PRODUÇÃO**
- [ ] Testar cupom `SEUFRETE` na 3.3

**Fluxo 4 — Pós-compra:**
- [ ] Fazer compra teste real com cartão do operador
- [ ] Aguardar 5 min → 4.1 chega com resumo do pedido correto
- [ ] 4.2 após 72h (validar cuidados)
- [ ] 4.3 após 7d (validar reply-to e link Instagram)
- [ ] 4.4 após 21d (validar cross-sell — se `cf_peca_comprada` vazio, confirmar texto genérico)
- [ ] Tag `comprou` aplicada?
- [ ] Se cliente cancelar pedido, sai do fluxo?

**Fluxo 5 — Winback:**
- [ ] Marcar manualmente 1 e-mail de teste com data de "última abertura" = 46 dias atrás
- [ ] Verificar que entra na segmentação "Cold 45d"
- [ ] Fluxo dispara?
- [ ] Após E1, esperar 7d e simular clique no CTA "quero ficar" → tag `winback-reengajada` aplicada, sai do fluxo?
- [ ] Repetir sem clicar para validar E2 e E3

**Validações gerais em cada e-mail:**
- [ ] Preview em desktop (Gmail, Outlook, Yahoo)
- [ ] Preview em mobile (Gmail app iOS/Android)
- [ ] Todos os links clicáveis e apontam para URLs corretas
- [ ] Nenhum token cru (`{{...}}` ou `[link ...]`) visível
- [ ] Assinatura "xo, Rosie" presente
- [ ] Não aparece "não cadastrado no domínio" ou aviso de autenticação (SPF/DKIM/DMARC OK)

---

## Anexo D — Como adicionar Fluxo 2 (Nutrição) quando HTMLs semanas 5-12 estiverem prontos

**Pré-requisitos para desbloquear:**
1. Time Caliope entrega HTMLs semanas 5-12 (paths sugeridos: `./emails-html/rosie-02-nutricao-{05..12}-*.html`)
2. Confirmar cada tema listado no master doc §"Diretrizes para as outras 8 semanas"

**Setup do fluxo (quando pronto):**

- **Nome:** `Rosie · Nutrição semanal · v3`
- **Gatilho:** Entraram na lista de segmentação **"Assinante ativa (30d)"** (criada em §0.4)
- **Cadência:** 1 e-mail por semana, **terça-feira 10h** (usar Espera com "Esperar e agendar data e hora" ou disparar via campanha semanal em vez de fluxo evergreen)
- **Ciclo:** 12 semanas → recomeçar do 2.1

**Estrutura sugerida:**

```
Entrada: segmentação "Assinante ativa (30d)"
├─ Enviar 2.1
├─ Esperar 7 dias
├─ Enviar 2.2
├─ Esperar 7 dias
├─ Enviar 2.3
├─ ...
├─ Enviar 2.12
├─ Fim (loop implícito — reentra pela segmentação mantida)
```

**Alternativa mais robusta** (recomendada): **NÃO usar fluxo evergreen** — usar **campanhas semanais agendadas** (sem RD Automation), cada terça manualmente por 12 semanas. Assim tem-se controle editorial semanal + possibilidade de trocar tema por urgência.

**Adicionar ao Fluxo 5 (Winback):** critério de saída "removeu tag winback-reengajada" para não continuar mandando Nutrição a quem foi suprimido.

---

## Referências

- **Master editorial:** [`./fluxos-email-v3-voz-marca.md`](./fluxos-email-v3-voz-marca.md) — voz, corpo, assinatura
- **HTMLs pareados:** [`./emails-html/_index.md`](./emails-html/_index.md) — deploy Vercel + tokens
- **Dossiê técnico RD Station:** `sobre-a-empresa/Ferramentas/RDStation/*`
  - `ferramentas.md` — identidade, plano, custom fields, notas Kolden
  - `api.md` — endpoints REST, OAuth2, rate limits, integração Nuvemshop
  - `mcp-status.md` — MCP oficial (3 conectores), setup Claude Code
  - `docs-oficiais.md` — todas as URLs de doc RD

**Central de Ajuda RD Station relevante:**
- [Como funciona a Automação de Marketing](https://ajuda.rdstation.com/s/article/Como-funciona-a-Automacao-de-Marketing)
- [Criar fluxo de automação](https://ajuda.rdstation.com/s/article/criar-fluxo-conversao-leads)
- [Condições de entrada em fluxo](https://ajuda.rdstation.com/s/article/Automa%C3%A7%C3%A3o-de-Marketing-condi%C3%A7%C3%B5es-de-entrada-em-fluxo)
- [Tipos de ações em fluxo](https://ajuda.rdstation.com/s/article/tipos-acoes-asequencias-fluxo-Automacao)
- [Configurar subdomínio de Email](https://ajuda.rdstation.com/s/article/Configurar-subdom%C3%ADnio-de-Email)
- [Integrar RDSM Ecommerce com Nuvemshop](https://ajuda.rdstation.com/s/article/Integrar-o-RD-Station-Marketing-para-Ecommerce-com-o-app-Nuvem-Shop)
- [Importar modelo HTML via link](https://ajuda.rdstation.com/s/article/Importar-um-modelo-de-Email-via-link-HTML-no-novo-editor)
- [Usar variáveis em e-mails](https://ajuda.rdstation.com/s/article/Usar-vari%C3%A1veis-em-emails)
- [Como criar fluxos de abandono de carrinho](https://ajuda.rdstation.com/s/article/Como-criar-fluxos-de-abandono-de-carrinho-no-seu-e-commerce)

**Portal de Desenvolvedor:**
- [llms.txt (índice AI)](https://developers.rdstation.com/llms.txt)
- [Autenticação OAuth2](https://developers.rdstation.com/reference/autentica%C3%A7%C3%A3o)
- [Eventos de e-commerce](https://developers.rdstation.com/reference/eventos-de-ecommerce)
- [Inserir leads em fluxo](https://developers.rdstation.com/reference/post_platform-workflows-id-leads-1)
- [Rate limits](https://developers.rdstation.com/reference/limite-de-requisicoes-da-api)
