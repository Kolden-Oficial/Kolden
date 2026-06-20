# Ferramentas — <Nome do Agente>

Template do `ferramentas.md`. Catálogo de toda API, MCP, CLI ou integração que o agente
usa. **Constituição, Artigo IV:** toda ferramenta citada no CLAUDE.md PRECISA ter uma
entrada aqui. **Artigo VII:** nenhuma credencial em texto puro — só a referência ao Infisical.
Apague estas instruções no arquivo final. Substitua os blocos entre <>.

---

## Tabela de ferramentas

| Ferramenta | Função | Forma de acesso | Credencial (Infisical) |
|------------|--------|-----------------|------------------------|
| **Infisical** | Ferramenta padrão de segredos — todas as outras credenciais vêm daqui | MCP `infisical` ou API REST | `INFISICAL_TOKEN` (única credencial em env var do sistema) |
| <ex.: GoHighLevel> | <enviar/atualizar contatos no CRM> | <REST API / MCP / CLI> | <`/kolden/prod/GHL_PIT_KEY`> |
| <ex.: Supabase> | <memória vetorial e persistência> | <SDK / MCP> | <`/kolden/prod/SUPABASE_KEY`> |

## Detalhamento por ferramenta

### Infisical — Ferramenta Padrão de Segredos (obrigatória em todo agente)
- **Quando usar:** SEMPRE que precisar de qualquer credencial, API key ou token.
- **Como chamar:** MCP `infisical` → `infisical_get_secret(path="/kolden/prod/NOME_DA_CHAVE")` ou API REST `/api/v3/secrets/raw/<path>`.
- **Autenticação:** `INFISICAL_TOKEN` — única credencial que pode estar em variável de ambiente do sistema (configurada uma vez pelo humano).
- **Se falhar:** não continuar; logar em `registros/erros-infisical.md`; escalar para humano. Nunca usar fallback em texto puro.
- **Limites:** ver rate limit da API do Infisical na documentação oficial.

### <Ferramenta 1>
- **Quando usar:** <gatilho/situação>.
- **Como chamar:** <endpoint, método, parâmetros essenciais ou nome do MCP>.
- **Autenticação:** credencial via Infisical: `/kolden/<ambiente>/<NOME_DA_CHAVE>`.
- **Se falhar:** <comportamento esperado: retry, fallback, escalar para humano>.
- **Limites:** <rate limit, custo por chamada, volume máximo>.

### <Ferramenta 2>
- **Quando usar:** <...>
- **Como chamar:** <...>
- **Autenticação:** <...>
- **Se falhar:** <...>
- **Limites:** <...>

## Stack de referência do Kolden

Ao escolher ferramentas, priorize a stack interna (ver `CLAUDE.md`): OpenRouter e Eden AI
(multi-LLM), DeepSeek e Hugging Face (modelos), Supabase e Neon (dados/memória vetorial),
Firecrawl (extração web), Browserbase (navegador), Infisical (segredos), Sentry
(observabilidade), GitHub (versionamento). Só saia da stack se nenhuma interna resolver — e justifique.
