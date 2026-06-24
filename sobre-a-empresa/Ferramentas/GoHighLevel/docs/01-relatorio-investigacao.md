# Relatório de Investigação — GHL API REST v2

**Data:** 2026-05-25  
**Versão da API:** v2 (v1 descontinuada em 31/12/2025)  
**Base URL:** `https://services.leadconnectorhq.com`  
**Autenticação:** Bearer Token (Private Integration Token — PIT)

---

## Veredito Executivo

A **API REST v2 do GoHighLevel cobre satisfatoriamente 12 das 16 operações** investigadas, incluindo as mais críticas para automação: criação de registros em custom objects (Projects e Jobs), criação de campos personalizados, vinculação de relacionamentos e criação de Contacts e Companies. A estratégia recomendada é **REST API pura** — o MCP oficial (36 ferramentas) não suporta custom objects, custom fields CRUD nem o objeto Business, cobrindo menos de 30% do escopo necessário.

Há **4 operações com ressalvas**: criação de pastas/folders dentro de objetos (endpoint não documentado explicitamente), subtasks dentro de Jobs via custom objects (não encontrado — Tasks existem apenas para Contacts), atualização em massa (inexiste endpoint bulk, exige loop individual), e Mídia Drive (endpoint existe mas documentação é escassa). Essas operações precisam de validação empírica ou workarounds.

O projeto está em condições de iniciar automação imediata com os scripts de leitura e criação básica. O caminho de escala para criação em massa é viável dentro dos rate limits (100 req/10s), e a idempotência (checar antes de criar) está implementada nos scripts. **Próximo passo crítico: executar `list-custom-fields.ts` para obter os `schemaKey` reais dos custom objects Projects e Jobs configurados na conta.**

---

## Tabela das 16 Operações

| # | Operação | Status | Endpoint v2 | Scope necessário | Via MCP? | Observação |
|---|----------|--------|-------------|-----------------|---------|-----------|
| 1 | Criar custom fields | ✅ Disponível | `POST /locations/:locationId/customFields` | `locations/customFields.write` | ❌ | Suporta TEXT, NUMBER, DATE, DROPDOWN, etc. |
| 2 | Editar custom fields | ✅ Disponível | `PUT /locations/:locationId/customFields/:id` | `locations/customFields.write` | ❌ | Mesmo endpoint, método PUT |
| 3 | Criar pastas (folders) | ⚠️ Não doc. explícita | Provável: `POST /locations/:locationId/customFields` com `dataType: "FOLDER"` | `locations/customFields.write` | ❌ | Requer teste empírico para confirmar |
| 4 | Add/remove opções dropdown | ⚠️ Via update | `PUT /locations/:locationId/customFields/:id` com array de opções | `locations/customFields.write` | ❌ | Estrutura do body não totalmente documentada |
| 5 | Listar custom fields | ✅ Disponível | `GET /locations/:locationId/customFields` | `locations/customFields.readonly` | ✅ parcial | MCP retorna apenas location fields, não object fields |
| 6 | Criar custom objects | ✅ Disponível | `POST /objects/` | `objects/schema.write` | ❌ | Máximo 10 custom objects por sub-account |
| 7 | Criar registros Projects | ✅ Disponível | `POST /objects/{schemaKey}/records` | `objects/record.write` | ❌ | schemaKey = `custom_objects.projects` (confirmar via GET) |
| 8 | Criar registros Jobs | ✅ Disponível | `POST /objects/{schemaKey}/records` | `objects/record.write` | ❌ | schemaKey = `custom_objects.jobs` (confirmar via GET) |
| 9 | Subtasks dentro de Job | ❌ Não encontrado | — | — | ❌ | Tasks existem apenas para Contacts (`/contacts/:id/tasks/`). Para custom objects: não documentado. Workaround: criar campo de texto multilinha para checklist. |
| 10 | Vincular Jobs a Contacts/etc. | ✅ Disponível | `PUT /objects/{schemaKey}/records/:id` com campo de relacionamento | `objects/record.write` | ❌ | Via propriedades de relacionamento no body |
| 11 | Listar registros com filtros | ✅ Disponível | `GET /objects/{schemaKey}/records` | `objects/record.readonly` | ❌ | Suporta query params de filtro |
| 12 | Atualizar em massa | ⚠️ Sem bulk | Loop: `PUT /objects/{schemaKey}/records/:id` por registro | `objects/record.write` | ❌ | Sem endpoint bulk. Rate limit: 100 req/10s. Batch de ~80 req/10s para folga. |
| 13 | Criar Contacts com tags | ✅ Disponível | `POST /contacts/` + `POST /contacts/:id/tags` | `contacts.write` | ✅ | Tags adicionadas em chamada separada |
| 14 | Criar Companies (Business) | ✅ Disponível | `POST /businesses/` | `businesses.write` | ❌ | — |
| 15 | Listar pipelines e estágios | ✅ Disponível | `GET /opportunities/pipelines` | `opportunities.readonly` | ✅ | — |
| 16 | Criar no Mídia Drive | ⚠️ Pouco doc. | `POST /medias/` | `medias.write` | ❌ | Documentação escassa; upload de arquivos requer teste |

---

## Recomendação de Estratégia

**Usar REST API v2 pura com PIT (Private Integration Token).**

O MCP oficial do GHL (`https://services.leadconnectorhq.com/mcp/`) tem apenas 36 ferramentas focadas em Contacts, Conversations, Opportunities, Calendars, pagamentos e social media. **Não suporta**: custom objects, custom fields CRUD, Business/Companies, Mídia Drive. Para o objetivo deste projeto (automação de Projects, Jobs e campos personalizados), o MCP não é adequado.

O PIT já está configurado no `.env` como `GHL_API_KEY` e funciona diretamente como Bearer Token no header `Authorization`.

---

## Bloqueadores

| Bloqueador | Operação | Impacto | Workaround |
|-----------|---------|---------|-----------|
| Subtasks não documentadas para custom objects | Op. 9 | Médio | Usar campo multilinha como checklist; ou criar um custom object "Task" separado vinculado ao Job |
| Folders: dataType não confirmado | Op. 3 | Baixo | Testar `dataType: "FOLDER"` empiricamente |
| schemaKey real dos objetos Projects/Jobs | Ops. 7, 8, 10 | Alto | **Executar `list-custom-fields.ts` primeiro** para descobrir as chaves reais |
| Mídia Drive pouco documentada | Op. 16 | Baixo | Postergar para fase 2; usar upload manual enquanto isso |
| Sem endpoint bulk para updates | Op. 12 | Médio | Loop com throttle (80 req/10s) — funciona, é mais lento |

---

## Próximos Passos

1. **Imediato:** Rodar `npm run list-fields` para descobrir os schemaKeys reais dos custom objects
2. **Curto prazo:** Testar criação de 1 Project + 1 Job com `--execute` para validar o fluxo completo
3. **Médio prazo:** Implementar criação em massa com throttle e idempotência
4. **Investigar:** Subtasks via API — abrir ticket com suporte GHL ou monitorar changelog da API
5. **Scopes:** Garantir que o PIT gerado tem todos os scopes necessários (ver `docs/02-endpoints-mapeados.md`)

---

## Fontes

- [Custom Fields V2 API](https://marketplace.gohighlevel.com/docs/ghl/custom-fields/custom-fields-v-2-api/)
- [Custom Objects API](https://marketplace.gohighlevel.com/docs/ghl/objects/custom-objects-api/index.html)
- [Object Schema API](https://marketplace.gohighlevel.com/docs/ghl/objects/object-schema/index.html)
- [Create Record endpoint](https://marketplace.gohighlevel.com/docs/ghl/objects/create-object-record/index.html)
- [Create Custom Object](https://marketplace.gohighlevel.com/docs/ghl/objects/create-custom-object-schema/index.html)
- [MCP Server docs](https://marketplace.gohighlevel.com/docs/other/mcp/index.html)
- [Scopes reference](https://marketplace.gohighlevel.com/docs/Authorization/Scopes/index.html)
- [GHL API Docs (GitHub community)](https://github.com/keith-wohnv/GHL-API-Docs/blob/master/API/Objects.md)
