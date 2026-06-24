# Rate Limits e Limitações — GHL API REST v2

---

## Rate Limits

| Limite | Valor | Escopo |
|--------|-------|--------|
| Burst | **100 req / 10 segundos** | Por recurso por app por location |
| Diário | **200.000 req / dia** | Por recurso por app por location |
| SaaS Configurator | 10 req / segundo | Apenas endpoints SaaS específicos |

> **Importante:** cada location tem seus próprios contadores. Se o PIT está configurado para um sub-account específico, os limites se aplicam àquela location.

### Headers de Rate Limit nas Respostas

O GHL retorna headers nas respostas para monitorar uso:
```
X-RateLimit-Limit-RequestsPerSecond: 10
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1716666010
```

### Estratégia de Retry

O `ghl-client.ts` implementa backoff exponencial automático para erro `429`:

| Tentativa | Delay antes do retry |
|-----------|---------------------|
| 1ª | 2s |
| 2ª | 4s |
| 3ª | 8s |
| Após 3 falhas | Lança erro |

### Throughput seguro para operações em massa

Para evitar atingir o limite de 100 req/10s, usar no máximo **80 req/10s** (20% de margem):
- Batch de 80 requisições → aguardar 10s → próximo batch
- Para operações mais simples: `setInterval` de 125ms entre chamadas (= 8 req/s)

---

## Limitações por Operação

### Custom Objects
- **Máximo:** 10 custom objects por sub-account (todas as planos desde out/2025)
- Antes: planos básicos tinham limite menor
- Cada objeto pode ter ilimitados campos personalizados
- O `key` do objeto é imutável após criação

### Custom Fields
- Nomes de campos devem ser únicos dentro do mesmo objeto
- O `fieldKey` é gerado automaticamente pelo GHL (não pode ser escolhido)
- Campos do tipo `STANDARD_FIELD` são read-only (campos nativos do GHL)
- Folders: comportamento não confirmado via API; pode exigir interface

### Records (Registros)
- Sem endpoint de criação/atualização em bulk
- Para listar: máximo 100 registros por página
- Filtros avançados por propriedade: não documentados — pode ser necessário filtrar localmente após `GET`

### Contacts
- Tags: adicionadas via endpoint separado (`POST /contacts/:id/tags`)
- Campos personalizados: referenciados pelo `fieldKey` sem o prefixo `contact.`
- Upsert disponível via `POST /contacts/upsert` (cria ou atualiza por email/telefone)

### Companies (Business)
- Scope de leitura (`businesses.readonly`) é Sub-Account
- Scope de escrita (`businesses.write`) é Sub-Account
- Sem relacionamento automático com Contacts — criar vínculo via campo personalizado ou via interface

### API v1 vs v2
- **v1:** descontinuada em 31/12/2025. Existentes continuam funcionando mas sem suporte ou novos recursos
- **v2:** única versão com suporte ativo. Sempre usar `Version: 2021-07-28` no header
- Alguns endpoints de v1 não têm equivalente em v2 (ex: certas operações de Mídia Drive)

### MCP Oficial (https://services.leadconnectorhq.com/mcp/)
- 36 ferramentas disponíveis (previsão de expansão para 250+)
- **Não suporta:** custom objects, custom fields CRUD, Business/Companies, Mídia Drive, subtasks
- Autenticação via PIT + `locationId` no header
- Adequado para: automações de Contacts, Opportunities, Conversations, Calendar

### Operações sem endpoint documentado
| Operação | Status | Alternativa |
|----------|--------|-------------|
| Subtasks em custom objects | ❌ Não existe | Campo LARGE_TEXT como checklist, ou custom object "Task" |
| Bulk create/update | ❌ Não existe | Loop individual com throttle |
| Folders em custom fields | ⚠️ Não confirmado | Validar `dataType: "FOLDER"` empiricamente |
| Upload no Mídia Drive | ⚠️ Pouco doc. | Testar `multipart/form-data` em `POST /medias/` |
| Mover registro entre pipelines | ⚠️ Via Opportunities | Registros de custom objects não têm pipeline nativo |

---

## Checklist de Scopes para o PIT

Antes de executar os scripts, garantir que o PIT gerado em `Settings → Private Integrations` tem os seguintes scopes:

- [x] `locations/customFields.readonly`
- [x] `locations/customFields.write`
- [x] `objects/schema.readonly`
- [x] `objects/schema.write`
- [x] `objects/record.readonly`
- [x] `objects/record.write`
- [x] `contacts.readonly`
- [x] `contacts.write`
- [x] `businesses.readonly`
- [x] `businesses.write`
- [x] `opportunities.readonly`
- [ ] `medias.readonly` *(opcional, para Mídia Drive)*
- [ ] `medias.write` *(opcional, para Mídia Drive)*

---

## Boas Práticas

1. **Nunca hardcode API keys** — sempre via `process.env.GHL_API_KEY`
2. **Idempotência** — sempre checar se o recurso existe antes de criar (evita duplicatas)
3. **Logging** — logar entrada, saída e duração de cada operação
4. **Dry-run padrão** — todos os scripts de escrita devem ter `--dry-run` ligado por padrão
5. **Monitorar headers** de rate limit nas respostas e fazer backoff quando `X-RateLimit-Remaining < 10`
6. **Paginação** — sempre tratar paginação em listagens; não assumir que a primeira página tem tudo
