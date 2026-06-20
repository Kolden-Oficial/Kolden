# GoHighLevel — Referência de Uso

CRM e plataforma de automação de marketing. Usado no Kolden para gestão de pipelines,
contatos, workflows e conversas via API v2.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| PIT Key (Personal Integration Token) | `/kolden/prod/GHL_PIT_KEY` |
| Agency API Key | `/kolden/prod/GHL_AGENCY_KEY` |
| Location ID (sub-conta padrão) | `/kolden/prod/GHL_LOCATION_ID` |

---

## Sub-contas ativas

| Nome | Uso |
|------|-----|
| Kolden | Principal |
| Brayan's Finish | Cliente |
| Vilela Construction | Cliente |

---

## API v2 — Endpoints principais

```
Base URL: https://services.leadconnectorhq.com

Contatos:    GET/POST /contacts
Pipelines:   GET      /opportunities/pipelines
Oportunidades: GET/POST /opportunities
Conversas:   GET      /conversations
Workflows:   GET      /workflows
Campos customizados: GET/POST /locations/{locationId}/customFields
```

Autenticação: `Authorization: Bearer <GHL_PIT_KEY>`

---

## Projeto de automação

Localização: `C:\Kolden\Ferramentas\GoHighLevel\GHL Automação\`

Scripts disponíveis (via `npm run` ou `npx tsx src/scripts/<arquivo>.ts`):

| Script | Função |
|--------|--------|
| `list-custom-fields.ts` | Lista campos customizados da sub-conta |
| `create-custom-field.ts` | Cria campo customizado |
| `create-project-with-jobs.ts` | Cria projeto com jobs no pipeline |
| `pilot-job1-whatsapp.ts` | Automação piloto via WhatsApp |

Documentação técnica: `GHL Automação/docs/`

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial (API v2) | https://highlevel.stoplight.io/docs/integrations |
| Central de ajuda | https://help.gohighlevel.com/ |
| Portal de desenvolvedor / Marketplace | https://marketplace.gohighlevel.com/ |
| Fórum / Comunidade (ideias) | https://ideas.gohighlevel.com/ |
| Changelog | https://changelog.leadconnectorhq.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (conector remoto da HighLevel/LeadConnector).
- **Endpoint:** `https://services.leadconnectorhq.com/mcp`
- **Status nesta máquina:** configurado como conector `claude.ai GoHighLevel`, porém
  *Needs authentication* e desabilitado no projeto `C:/Kolden`. Reativar via `/mcp`
  (ver `Ferramentas/mcp-status.md`, seção 2).

---

## Instalação

Ver `C:\Kolden\Ferramentas\GoHighLevel\GHL Automação\` — executar `npm install` e
configurar `.env` com os paths do Infisical (não os valores diretos).
