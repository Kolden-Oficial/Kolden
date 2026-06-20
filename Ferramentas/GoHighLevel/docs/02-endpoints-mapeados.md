# Endpoints Mapeados — GHL API REST v2

**Base URL:** `https://services.leadconnectorhq.com`  
**Headers obrigatórios em todas as chamadas:**
```
Authorization: Bearer {GHL_API_KEY}
Version: 2021-07-28
Content-Type: application/json
```

---

## Op. 1 — Criar Custom Field

**POST** `/locations/{locationId}/customFields`

**Scope:** `locations/customFields.write`

**Body:**
```json
{
  "name": "Nome do Campo",
  "dataType": "TEXT",
  "objectKey": "custom_objects.projects",
  "position": 0,
  "placeholder": "Digite aqui...",
  "acceptedFormat": [],
  "isAllowedCustomOption": false,
  "isMultipleFile": false,
  "textBoxListOptions": []
}
```

**dataType aceitos:** `TEXT`, `LARGE_TEXT`, `NUMERICAL`, `PHONE`, `MONETORY`, `CHECKBOX`, `SINGLE_OPTIONS`, `MULTIPLE_OPTIONS`, `DROPDOWN`, `RADIO`, `DATE`, `FILE_UPLOAD`, `SIGNATURE`, `STANDARD_FIELD`

**Resposta 201:**
```json
{
  "customField": {
    "id": "abc123",
    "name": "Nome do Campo",
    "dataType": "TEXT",
    "objectKey": "custom_objects.projects",
    "fieldKey": "custom_objects.projects.nome_do_campo",
    "locationId": "{locationId}",
    "position": 0,
    "dateAdded": "2026-05-25T00:00:00Z"
  }
}
```

**Erros comuns:**
- `400` — body inválido ou dataType não reconhecido
- `401` — token inválido ou scope ausente
- `422` — campo já existe com mesmo nome

---

## Op. 2 — Editar Custom Field

**PUT** `/locations/{locationId}/customFields/{fieldId}`

**Scope:** `locations/customFields.write`

**Body (apenas campos a alterar):**
```json
{
  "name": "Novo Nome",
  "placeholder": "Novo placeholder"
}
```

**Resposta 200:** mesmo schema de resposta da criação.

---

## Op. 3 — Criar Pasta (Folder) — ⚠️ Não confirmado

**Endpoint provável:** `POST /locations/{locationId}/customFields`

**Body tentativo:**
```json
{
  "name": "Nome da Pasta",
  "dataType": "FOLDER",
  "objectKey": "custom_objects.projects"
}
```

> **Nota:** `dataType: "FOLDER"` não está explicitamente documentado. Validar empiricamente. Se não funcionar, a organização por pastas pode precisar ser feita via interface.

---

## Op. 4 — Add/Remove Opções de Dropdown — ⚠️ Parcialmente documentado

**PUT** `/locations/{locationId}/customFields/{fieldId}`

**Scope:** `locations/customFields.write`

**Body para atualizar opções:**
```json
{
  "options": [
    { "key": "opcao_1", "value": "Opção 1" },
    { "key": "opcao_2", "value": "Opção 2" },
    { "key": "opcao_3", "value": "Opção 3" }
  ]
}
```

> **Nota:** Para remover uma opção, envie o array sem ela. A estrutura exata do campo `options` deve ser validada empiricamente — pode variar para `SINGLE_OPTIONS`, `MULTIPLE_OPTIONS` e `DROPDOWN`.

---

## Op. 5 — Listar Custom Fields

**GET** `/locations/{locationId}/customFields`

**Scope:** `locations/customFields.readonly`

**Query params opcionais:**
- `model` — filtra por tipo de objeto (ex: `contact`, `opportunity`, `custom_objects.projects`)

**Exemplo:**
```
GET /locations/1Jo7tMynqRtbpB3GHuOd/customFields?model=custom_objects.projects
```

**Resposta 200:**
```json
{
  "customFields": [
    {
      "id": "abc123",
      "name": "Nome do Campo",
      "fieldKey": "custom_objects.projects.nome_do_campo",
      "dataType": "TEXT",
      "position": 0,
      "objectKey": "custom_objects.projects"
    }
  ]
}
```

---

## Op. 6 — Criar Custom Object

**POST** `/objects/`

**Scope:** `objects/schema.write`

**Body:**
```json
{
  "locationId": "{locationId}",
  "labels": {
    "singular": "Projeto",
    "plural": "Projetos"
  },
  "description": "Objeto para gerenciar projetos comerciais",
  "key": "projects"
}
```

> O GHL adicionará automaticamente o prefixo `custom_objects.` — o key final será `custom_objects.projects`.

**Resposta 201:**
```json
{
  "object": {
    "id": "obj123",
    "key": "custom_objects.projects",
    "labels": { "singular": "Projeto", "plural": "Projetos" },
    "locationId": "{locationId}",
    "dateAdded": "2026-05-25T00:00:00Z"
  }
}
```

**Limitação:** máximo 10 custom objects por sub-account.

---

## Op. 7 — Criar Registro de Project

**POST** `/objects/{schemaKey}/records`

**schemaKey:** descobrir via `GET /objects?locationId={locationId}` — provavelmente `custom_objects.projects`

**Scope:** `objects/record.write`

**Body:**
```json
{
  "locationId": "{locationId}",
  "properties": {
    "name": "Setup Comercial — Cliente XYZ",
    "custom_objects.projects.status": "Em andamento",
    "custom_objects.projects.responsavel": "João Silva",
    "custom_objects.projects.prazo": "2026-06-30T00:00:00Z"
  },
  "owner": ["userId"],
  "followers": []
}
```

> As chaves dentro de `properties` usam o `fieldKey` retornado no `GET /customFields`.

**Resposta 201:**
```json
{
  "record": {
    "id": "rec123",
    "properties": {},
    "owner": [],
    "followers": [],
    "dateAdded": "2026-05-25T00:00:00Z",
    "dateUpdated": "2026-05-25T00:00:00Z"
  }
}
```

---

## Op. 8 — Criar Registro de Job

Mesmo padrão da Op. 7, trocando o `schemaKey` pelo key do objeto Jobs:

**POST** `/objects/{schemaKey_jobs}/records`

**Body exemplo:**
```json
{
  "locationId": "{locationId}",
  "properties": {
    "name": "Job 1 — Onboarding",
    "custom_objects.jobs.projeto_vinculado": "{projectRecordId}",
    "custom_objects.jobs.status": "Pendente",
    "custom_objects.jobs.prioridade": "Alta"
  }
}
```

---

## Op. 9 — Subtasks dentro de Job — ❌ Não encontrado

Não existe endpoint documentado para criar subtasks/tarefas dentro de registros de custom objects.

**Endpoint de Tasks existe apenas para Contacts:**
```
POST /contacts/{contactId}/tasks
```

**Workaround recomendado:** Criar um campo `LARGE_TEXT` chamado "Checklist" no objeto Job e armazenar tarefas como texto formatado, ou criar um custom object separado "Task" vinculado ao Job via campo de relacionamento.

---

## Op. 10 — Vincular Jobs a Contacts/Companies/Projects

**PUT** `/objects/{schemaKey}/records/{recordId}`

**Scope:** `objects/record.write`

**Query:** `locationId={locationId}`

**Body:**
```json
{
  "properties": {
    "custom_objects.jobs.contact_vinculado": "{contactId}",
    "custom_objects.jobs.company_vinculada": "{businessId}",
    "custom_objects.jobs.project_vinculado": "{projectRecordId}"
  }
}
```

> Os campos de relacionamento precisam ser do tipo correto (referência a outro objeto). Confirmar fieldKey via `GET /customFields`.

---

## Op. 11 — Listar Registros com Filtros

**GET** `/objects/{schemaKey}/records`

**Scope:** `objects/record.readonly`

**Query params:**
- `locationId` (obrigatório)
- `page` — paginação
- `limit` — registros por página (padrão: 20, máx: 100)

**Exemplo:**
```
GET /objects/custom_objects.projects/records?locationId=1Jo7tMynqRtbpB3GHuOd&page=1&limit=50
```

---

## Op. 12 — Atualizar em Massa — ⚠️ Sem endpoint bulk

Não existe endpoint de bulk update. Usar loop individual:

**PUT** `/objects/{schemaKey}/records/{recordId}` por registro.

**Estratégia segura:** máximo 80 req/10s (folga de 20% abaixo do limite de 100/10s).

---

## Op. 13 — Criar Contact com Tags

**Passo 1 — Criar contact:**

**POST** `/contacts/`

**Scope:** `contacts.write`

**Body:**
```json
{
  "locationId": "{locationId}",
  "firstName": "Maria",
  "lastName": "Souza",
  "email": "maria@empresa.com",
  "phone": "+5511999999999",
  "source": "API",
  "customField": {
    "contact.empresa": "Empresa XYZ",
    "contact.cargo": "Diretora"
  }
}
```

**Passo 2 — Adicionar tags:**

**POST** `/contacts/{contactId}/tags`

**Body:**
```json
{
  "tags": ["lead-quente", "shopee", "afiliado"]
}
```

---

## Op. 14 — Criar Company (Business)

**POST** `/businesses/`

**Scope:** `businesses.write`

**Body:**
```json
{
  "locationId": "{locationId}",
  "name": "Empresa XYZ Ltda",
  "email": "contato@empresaxyz.com",
  "phone": "+5511999999999",
  "website": "https://empresaxyz.com",
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brazil"
}
```

**Resposta 201:**
```json
{
  "business": {
    "id": "biz123",
    "name": "Empresa XYZ Ltda",
    "locationId": "{locationId}",
    "dateAdded": "2026-05-25T00:00:00Z"
  }
}
```

---

## Op. 15 — Listar Pipelines e Estágios

**GET** `/opportunities/pipelines`

**Scope:** `opportunities.readonly`

**Query:** `locationId={locationId}`

**Resposta 200:**
```json
{
  "pipelines": [
    {
      "id": "pipe123",
      "name": "Pipeline Principal",
      "stages": [
        { "id": "stage1", "name": "Lead", "position": 0 },
        { "id": "stage2", "name": "Proposta", "position": 1 },
        { "id": "stage3", "name": "Fechado", "position": 2 }
      ]
    }
  ]
}
```

---

## Op. 16 — Criar no Mídia Drive — ⚠️ Pouco documentado

**POST** `/medias/`

**Scope:** `medias.write`

**Body (criar pasta):**
```json
{
  "locationId": "{locationId}",
  "name": "Nome da Pasta",
  "parentId": null,
  "type": "folder"
}
```

> Documentação oficial escassa. Upload de arquivos pode exigir `multipart/form-data`. Requer validação empírica.

---

## Endpoint de Apoio — Listar Schemas de Objetos

**GET** `/objects`

**Scope:** `objects/schema.readonly`

**Query:** `locationId={locationId}`

Retorna todos os custom objects criados na conta, incluindo seus `key` (schemaKey) reais. **Executar isso primeiro** para descobrir os schemaKeys de Projects e Jobs.

**Resposta 200:**
```json
{
  "objects": [
    {
      "key": "custom_objects.projects",
      "labels": { "singular": "Project", "plural": "Projects" }
    },
    {
      "key": "custom_objects.jobs",
      "labels": { "singular": "Job", "plural": "Jobs" }
    }
  ]
}
```
