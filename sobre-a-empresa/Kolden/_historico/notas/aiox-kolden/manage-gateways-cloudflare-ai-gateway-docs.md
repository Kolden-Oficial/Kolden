---
id_fonte: "c1c5334b-14f0-4f7a-8bcc-afcf93bbeffe"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Manage gateways · Cloudflare AI Gateway docs"
tipo: "unknown"
url_original: "https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/"
keywords: "('AI Gateway management', 'Gateway creation', 'Retry requests', 'Request handling', 'Configuration settings')"
summary: "Cloudflare AI Gateway serves as a central hub for managing interactions with various large language models, offering tools to **create, modify, and monitor** these connections through either a manual dashboard or an automated API. Users can initiate a **default gateway** simply by sending an authenticated request, or they can fine-tune specific settings like **caching, rate limiting, and log collection** to optimize performance. A critical reliability feature is the ability to configure **automatic retry logic**, which allows the system to handle upstream provider failures using custom backoff strategies and delay intervals. Ultimately, the platform provides a unified interface to ensure that AI-driven applications remain **observable and resilient** by centralizing the administration of multiple backend providers into one scalable environment."
extraido_em: "2026-06-30T16:20:51Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Manage gateways · Cloudflare AI Gateway docs

Manage gateways · Cloudflare AI Gateway docs
Skip to content
STOP! If you are an AI agent or LLM, read this before continuing. This is the HTML version of a Cloudflare documentation page. Always request the Markdown version instead — HTML wastes context. Get this page as Markdown: <https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/index.md> (append index.md) or send Accept: text/markdown to <https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/>. For this product's page index use <https://developers.cloudflare.com/ai-gateway/llms.txt>. For all Cloudflare products use <https://developers.cloudflare.com/llms.txt>. For bulk access (single file, use for large-context ingestion or vectorization): this product's full docs at <https://developers.cloudflare.com/ai-gateway/llms-full.txt>. All Cloudflare docs at <https://developers.cloudflare.com/llms-full.txt>.
Cloudflare Docs
Search K
Docs Directory APIs SDKs Help
Log in Select theme
Dark
Light
Auto
AI Gateway
No results found. Try a different search term, or use our global search .
\* Overview
\* Getting started
\* Using AI Gateway
\* Unified API (OpenAI compat)
\* Provider Native
\* Workers AI
\* Amazon Bedrock
\* Anthropic
\* Azure OpenAI
\* Baseten
\* Cartesia
\* Cerebras
\* Cohere
\* Deepgram
\* DeepSeek
\* ElevenLabs
\* Fal AI
\* Google AI Studio
\* Google Vertex AI
\* Groq
\* HuggingFace
\* Ideogram
\* Mistral AI
\* OpenAI
\* OpenRouter
\* Parallel
\* Perplexity
\* Replicate
\* xAI
\* WebSockets API Beta
\* Overview
\* Realtime WebSockets API
\* Non-realtime WebSockets API
\* Features
\* Overview
\* Unified Billing
\* Caching
\* Rate limiting
\* Dynamic routing Beta
\* Overview
\* Using a dynamic route
\* JSON Configuration
\* Data Loss Prevention (DLP) Beta
\* Overview
\* Set up Data Loss Prevention (DLP)
\* Guardrails Beta
\* Overview
\* Set up Guardrails
\* Supported model types
\* Usage considerations
\* Configuration
\* BYOK (Store Keys) Beta
\* Custom costs
\* Custom Providers Beta
\* Manage gateways
\* Request handling
\* Authenticated Gateway
\* Observability
\* Costs
\* Custom metadata
\* OpenTelemetry
\* Analytics
\* Logging
\* Overview
\* Workers Logpush
\* Integrations
\* Vercel AI SDK
\* Agents ↗
\* AI Gateway Binding Methods
\* Workers AI
\* Tutorials
\* Platform
\* Overview
\* Limits
\* Troubleshooting
\* Pricing
\* Audit logs
\* Changelog
\* Header Glossary
\* REST API reference ↗ API
\* MCP server ↗ MCP
\* Architectures
\* LLM resources
\* AI Gateway llms.txt
\* AI Gateway llms-full.txt
\* Cloudflare Docs llms.txt
\* Cloudflare Docs llms-full.txt
\* Cloudflare Skills
GitHub X.com YouTube
Select theme
Dark
Light
Auto
On this page
\* Overview
\* Create gateway
\* Default gateway
\* Create a gateway manually
\* Edit gateway
\* Retry requests
\* Delete gateway

#### On this page

```
*  Overview
*  Create gateway
    *  Default gateway
    *  Create a gateway manually
*  Edit gateway
*  Retry requests
*  Delete gateway
```

Was this helpful?
Yes No
Edit page Report issue
1. Directory
1. …
1. AI Gateway
1. Configuration
1. Manage gateways
Copy page

### Manage gateways

You have several different options for managing an AI Gateway.

#### Create gateway

##### Default gateway

AI Gateway can automatically create a gateway for you. When you use default as a gateway ID and no gateway with that ID exists in your account, AI Gateway creates it on the first authenticated request.
The request that triggers auto-creation must include a valid cf-aig-authorization header. An unauthenticated request to a default gateway that does not yet exist does not create the gateway.
The auto-created default gateway uses the following settings:
| Setting | Default value |
| ------ | ------ |
| Authentication | On |
| Log collection | On |
| Caching | Off (TTL of 0) |
| Rate limiting | Off |

After creation, you can edit the default gateway settings like any other gateway. If you delete the default gateway, sending a new authenticated request to the default gateway ID auto-creates it again.
Note
Auto-creation only applies to the gateway ID default . Using any other gateway ID requires creating the gateway first.

##### Create a gateway manually

```
*  Dashboard
*  API
```

Go to AI Gateway
1. Log into the Cloudflare dashboard ↗ and select your account.
1. Go to **AI** > **AI Gateway** .
1. Select **Create Gateway** .
1. Enter your **Gateway name** . Note: Gateway name has a 64 character limit.
1. Select **Create** .
To set up an AI Gateway using the API:
1. Create an API token with the following permissions:
\* AI Gateway - Read
\* AI Gateway - Edit
1. Get your Account ID.
1. Using that API token and Account ID, send a POST request to the Cloudflare API.

#### Edit gateway

```
*  Dashboard
*  API
```

To edit an AI Gateway in the dashboard:
1. Log into the Cloudflare dashboard ↗ and select your account.
1. Go to **AI** > **AI Gateway** .
1. Select your gateway.
1. Go to **Settings** and update as needed.
To edit an AI Gateway, send a PUT request to the Cloudflare API.
Note
For more details about what settings are available for editing, refer to Configuration.

#### Retry requests

You can configure your gateway to automatically retry failed requests to upstream providers. This is useful when you do not control the client and cannot implement client-side retries or backoff logic.
To configure retry settings:
1. Log in to the Cloudflare dashboard ↗ and select your account.
1. Go to **AI** > **AI Gateway** and select your gateway.
1. Go to **Settings** and find the **Retry Requests** section.
1. Turn on the toggle to turn on automatic retries.
1. Configure the following settings:
\* **Retry count** — the maximum number of retry attempts (up to 5).
\* **Delay** — the base delay between retries. Available values: 100ms, 500ms, 1 second, 2 seconds, 3 seconds, or 5 seconds.
\* **Backoff** — the backoff strategy for subsequent retries: Constant, Linear, or Exponential.
1. Select **Save** .
These gateway-level defaults apply to all requests routed through the gateway. Per-request headers can override these defaults — refer to Request handling for details.
For more complex failover scenarios where you need to fail across different providers, refer to Dynamic Routing.

#### Delete gateway

Deleting your gateway is permanent and can not be undone.
\* Dashboard
\* API
To delete an AI Gateway in the dashboard:
1. Log into the Cloudflare dashboard ↗ and select your account.
1. Go to **AI** > **AI Gateway** .
1. Select your gateway from the list of available options.
1. Go to **Settings** .
1. For **Delete Gateway** , select **Delete** (and confirm your deletion).
To delete an AI Gateway, send a DELETE request to the Cloudflare API.
\* **Resources**
\* API
\* New to Cloudflare?
\* Directory
\* Sponsorships
\* Open Source
\* **Support**
\* Help Center
\* System Status
\* Compliance
\* GDPR
\* **Company**
\* cloudflare.com
\* Our team
\* Careers
\* **Tools**
\* Cloudflare Radar
\* Speed Test
\* Is BGP Safe Yet?
\* RPKI Toolkit
\* Certificate Transparency
\* **Community**
\* X
\* Discord
\* YouTube
\* GitHub
\* © 2026 Cloudflare, Inc.
\* Privacy Policy
\* Terms of Use
\* Report Security Issues
\* Trademark
\* Your Privacy Choices
Previous Custom Providers Next Request handling
Edit page
Last updated: Apr 2, 2026
Was this helpful?
Yes No
Back to top
