---
id: projeto-bvb-financas-operacoes
titulo: "BVB Finanças — Operações e Contas"
resumo: "Central de Senhas, contas ativas, canais de distribuição. O que existe e onde estão os gaps de setup."
categoria: projeto
palavras-chave: [operacoes, contas, credenciais, canais, redes-sociais]
status: rascunho
atualizado-em: 2026-07-06
relacionados: [dossie, conteudo, status]
tipo: projeto
projeto: bvb-financas
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/bvb-financas/dossie|dossie]]"
---

# Operações — BVB Finanças

> Compilado a partir da "Central de Senhas" (Sheet do Luciano, 26/06/2026) + inspeção do que está referenciado nos documentos estratégicos.

## Central de Senhas — estado atual

A "Central de Senhas" no Drive é uma **planilha simples** (Google Sheets convertido em Office xlsx), sem cofre gerenciado. Este é o inventário completo (ordem preservada da planilha):

| Plataforma | Login / Usuário | Senha |
|---|---|---|
| Gmail | `bvbfinancas@gmail.com` | ⚠️ armazenada em texto claro na Central |
| TikTok | `brunofvilasboas` | ⚠️ armazenada em texto claro |
| X (Twitter) | `bvbfinancas@gmail.com` | ⚠️ armazenada em texto claro |
| Instagram | (linha em branco) | (não preenchido) |

**Arquivo original:** `assets/pdfs/Central_de_Senhas_BVB_Financas.xlsx`

### Observações críticas de segurança

- **Nenhum gerenciador de senhas (1Password, Bitwarden) configurado** — todas as senhas em Sheet
- **Nenhum registro de 2FA** — nem em Gmail, TikTok ou X
- **Padrão de senha frágil** — vísivel na Central que a senha segue o padrão `bvbfinancas2026brl` / `bvbfinancas2026BRL#` (variação por caso e caractere especial). Se uma vaza, a probabilidade das outras vazarem é alta
- **Compartilhamento de e-mail em duas contas** — mesmo `bvbfinancas@gmail.com` usado no Gmail e no X, ampliando raio de exposição em caso de comprometimento
- **Instagram existe mas está sem credencial registrada** — significa que ou a conta não foi criada, ou foi criada e a senha não está no cofre coletivo (risco de "bus factor")

**Recomendação de melhoria (não urgente, mas necessária antes de terceirizar produção):**
- Migrar para Bitwarden (grátis para uso individual/família) ou 1Password
- Ativar 2FA em todas as contas (Gmail com Authenticator app, não SMS)
- Criar `bvbfinancas@` como e-mail canônico e desconectar `brunovilasboas61@gmail.com` de fluxos operacionais
- Anotar 2FA backup codes no cofre

## Contas de e-mail em uso

Aparecem nos metadados do Drive:

- **`brunovilasboas61@gmail.com`** — **conta pessoal do Bruno**. É a **owner** dos documentos-chave: Posicionamento (Doc Estratégico 01), Personas (02), Concorrência (03), Tom de Voz, Manual de Identidade Visual v2. Também dono do primeiro roteiro registrado.
- **`camoesluciano@gmail.com`** — **conta do Luciano** (sócio operacional). Owner da Central de Senhas, do documento "Documentos a serem criados de estratégia" e das aulas do Método Raiz da Riqueza.
- **`bvbfinancas@gmail.com`** — **conta da marca** (Gmail centralizado). Usado em TikTok e X, mas não é dono dos documentos estratégicos.

**Risco de propriedade:** documentos estratégicos e IP da marca estão sob o e-mail pessoal do Bruno. Em caso de saída/conflito, a formalização é frágil. Ideal migrar ownership para `bvbfinancas@` antes de contratar terceiros.

## Canais e presença

### Ativos hoje

- **Gmail** `bvbfinancas@gmail.com` — inbox central
- **TikTok** `@brunofvilasboas` — ativo (sem métricas registradas)
- **X (Twitter)** — ativo (sem métricas registradas)

### Provavelmente ativos mas não na Central

- **YouTube** — canal existe (o conteúdo de 24 roteiros + 6 vídeos editados aponta para uma estratégia YouTube-first), mas **login não está registrado na Central**. Provavelmente vinculado ao `bvbfinancas@gmail.com` ou ao `brunovilasboas61@gmail.com`. **Verificar antes de qualquer publicação delegada.**

### Não ativos ou incompletos

- **Instagram** — linha na Central sem credencial. Conta pode ou não existir.
- **LinkedIn** — não aparece em nenhum documento (a persona secundária "empresário em transição" está lá; sinal de que essa frente ainda não foi ativada)
- **Podcasts** — não aparece (mesmo comentário)
- **Newsletter / lista de e-mails** — não aparece; o funil declarado no manual v1 previa "Meio: lista de e-mails, comunidade e materiais aprofundados gratuitos", mas nada indica que essa infraestrutura já esteja de pé
- **Anúncios / tráfego pago** — pasta `3. Anúncios` no Drive está **vazia**. Nenhuma conta Meta Business/Google Ads registrada.

## Site / landing page

**Não há registro de domínio próprio nem site no ar.** O Manual v1 sugere Framer (gratuito) ou Carrd (R$ 19/ano) como MVP no Dia 5 do cronograma. Provável pendência: registrar `bvbfinancas.com.br` (ou similar) e configurar landing MVP com a paleta v2.

## Ferramentas de trabalho (inferidas)

- **Google Workspace / Drive** — sim (documentos hoje vivem aqui)
- **Google Sheets** — sim (Planilha do Método, Central de Senhas)
- **Word (docx)** — sim (Guia Pró-Labore, concorrência, alguns roteiros)
- **Excel (xlsx)** — sim (Planilha Método Raiz da Riqueza como base do curso)
- **Figma** — sugerido pelo Manual v1 para prototipagem visual (não confirmado)
- **Canva Pro** — sugerido pelo Manual v1 para templates de redes sociais (não confirmado)
- **Editor de vídeo** — usado por alguém (os vídeos "editados.mov" existem); não sabemos quem edita (Bruno mesmo? Editor terceirizado?)

## Gaps de setup para uma marca "pronta para escalar"

Em ordem de prioridade para a Kolden endereçar:

1. **Migração de senhas** para gerenciador + 2FA em todas as contas
2. **Instagram** — decidir se ativa, criar conta se necessário, sincronizar credenciais no cofre
3. **Domínio próprio + hospedagem** de landing MVP
4. **YouTube: transferir ownership** para conta da marca (não do e-mail pessoal do Bruno) — se ainda não é o caso
5. **Newsletter / ESP** (ConvertKit, Substack, Beehiiv, Mailchimp) — o "meio do funil" precisa existir
6. **Setup de tráfego pago** — Meta Business Manager + Google Ads, quando as personas + criativos estiverem prontos
7. **Automação editorial** — ferramenta de agendamento multi-canal (Postiz, Metricool ou similar) — a Kolden já usa Postiz (Squad Pheme); potencial reuso

## Riscos operacionais consolidados

| # | Risco | Severidade | Ação |
|---|---|---|---|
| 1 | Senhas em texto claro + padrão único + sem 2FA | Alta | Migrar para gerenciador + 2FA |
| 2 | Ownership de IP em e-mail pessoal do Bruno | Média (aumenta se houver 2º sócio ou saída) | Transferir para conta da marca |
| 3 | Instagram vazio ou desconhecido | Média | Descobrir estado + preencher cofre |
| 4 | Nenhuma automação de listas / nurture | Média | Definir ESP e importar contatos existentes (se houver) |
| 5 | Sem tráfego pago rodando | Baixa (ainda) | Só ativar depois de calendário e funil escritos |
