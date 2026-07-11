---
name: Security Constraints
description: Restrições de segurança que devem ser respeitadas em qualquer alteração no projeto. Lista do que NUNCA fazer e padrões obrigatórios para novos endpoints, RLS e tratamento de PII.
type: feature
tipo: projeto
projeto: catalogo
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/architecture-overview|architecture-overview]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/database-schema|database-schema]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/external-integrations|external-integrations]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/technical-debt|technical-debt]]"
---

## Regras absolutas (nunca violar)

### Credenciais e variáveis de ambiente
- **Nunca** commitar `.env` — o arquivo não está no `.gitignore` ainda (bug conhecido); adicionar antes de qualquer commit que toque `.env`
- **Nunca** expor `SUPABASE_SERVICE_ROLE_KEY` no código frontend — é service role, bypassa RLS inteiro
- **Nunca** hardcodar tokens de API, pixels ou chaves no código-fonte — sempre usar `Deno.env.get()` nas Edge Functions
- **Nunca** hardcodar o domínio `catalogoos.lovable.app` em novas Edge Functions — usar env var ou `SUPABASE_URL` para derivar o host

### PII (Dados Pessoais Identificáveis)
- **Nunca** retornar PII raw (email, telefone, nome, CPF, DOB) via API ou response de Edge Function
- **Nunca** armazenar PII raw em `conversions` — essa tabela só aceita hashes SHA-256
- **Sempre** normalizar antes de hashar: email lowercase+trim, phone só dígitos, nome lowercase+trim, DOB → YYYYMMDD
- Hashes têm exatamente 64 caracteres hex — validar com regex `/^[a-f0-9]{64}$/i` antes de usar

### CORS
- **Nunca** usar `"Access-Control-Allow-Origin": "*"` em endpoints que recebem PII — restringir ao domínio da landing page
- `submit-lead` e `track-conversion` são exceções documentadas (precisam de `*` por compatibilidade com redes de afiliados), mas qualquer novo endpoint com PII deve ser restrito

### RLS (Row Level Security)
- **Nunca** criar nova policy com `USING (true)` ou `WITH CHECK (true)` — isso é acesso público total
- Padrão obrigatório para tabelas de usuário: `USING (auth.uid() = user_id)`
- As policies abertas em `links` e `clicks` são problema conhecido e legado — não replicar esse padrão

### Edge Functions
- **Sempre** validar payload com Zod antes de processar qualquer dado de entrada
- **Sempre** retornar erro 400 com detalhes de validação se o schema falhar
- **Sempre** usar `SUPABASE_SERVICE_ROLE_KEY` (não a anon key) em Edge Functions que precisam contornar RLS
- **Nunca** chamar Edge Functions com auth JWT do usuário quando a função usa service role — é desnecessário e expõe o fluxo errado

### Tokens de API de terceiros (Meta, TikTok, GHL)
- Tokens ficam em `integrations.credentials` (jsonb), por `user_id`
- **Nunca** logar tokens em texto plano nos `sync_logs`
- O access_token da Meta vai na query string (padrão da API deles) — comportamento correto, não mudar
- Webhook secret do GHL é validado via HMAC-SHA256 no header `x-signature: sha256=<hex>` — manter essa validação em qualquer novo webhook

## Padrões obrigatórios para novas Edge Functions

```ts
// 1. Sempre CORS correto
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://seudominio.com", // não usar *
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 2. Sempre tratar OPTIONS
if (req.method === "OPTIONS") {
  return new Response(null, { headers: corsHeaders });
}

// 3. Sempre validar com Zod
const schema = z.object({ ... });
const parsed = schema.safeParse(await req.json());
if (!parsed.success) {
  return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400 });
}

// 4. Sempre usar service role (não a anon key)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
```

## Riscos ativos (não corrigidos ainda)

| Risco | Severidade | Status |
|---|---|---|
| `.env` não está no `.gitignore` | CRÍTICO | Pendente — adicionar urgente |
| Anon key exposta no histórico git | CRÍTICO | Rotacionar no painel Supabase |
| RLS pública em `links` e `clicks` | ALTO | Pendente — apertar gradualmente |
| Sem rate limiting em `submit-lead` e `track-conversion` | ALTO | Não implementado |
| CORS wildcard em Edge Functions com PII | MÉDIO | Legado — não replicar |
