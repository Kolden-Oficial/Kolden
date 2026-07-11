---
id_fonte: "17d7d2ed-86da-4349-b011-8b0bd5c2d48b"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Getting started · Cloudflare AI Gateway docs"
tipo: "unknown"
url_original: "https://developers.cloudflare.com/ai-gateway/get-started/"
keywords: "('AI Gateway setup', 'Unified API endpoint', 'Provider authentication', 'Request handling', 'Gateway integration options')"
summary: "Cloudflare’s AI Gateway acts as a powerful intermediary designed to help developers manage, scale, and monitor their interactions with various large language models. To begin, users must obtain their **account credentials and API tokens** to facilitate secure communication through either a **unified OpenAI-compatible endpoint** or provider-specific interfaces. The platform offers sophisticated management tools such as **caching, rate limiting, and dynamic routing**, which allow for cost reduction and increased architectural resilience. By supporting a vast array of **upstream AI providers**, the gateway simplifies complex workflows like **unified billing and secure key management**, ultimately providing a centralized hub for modern AI application development."
extraido_em: "2026-06-30T16:19:58Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Getting started · Cloudflare AI Gateway docs

Getting started · Cloudflare AI Gateway docs
Skip to content
STOP! If you are an AI agent or LLM, read this before continuing. This is the HTML version of a Cloudflare documentation page. Always request the Markdown version instead — HTML wastes context. Get this page as Markdown: <https://developers.cloudflare.com/ai-gateway/get-started/index.md> (append index.md) or send Accept: text/markdown to <https://developers.cloudflare.com/ai-gateway/get-started/>. For this product's page index use <https://developers.cloudflare.com/ai-gateway/llms.txt>. For all Cloudflare products use <https://developers.cloudflare.com/llms.txt>. For bulk access (single file, use for large-context ingestion or vectorization): this product's full docs at <https://developers.cloudflare.com/ai-gateway/llms-full.txt>. All Cloudflare docs at <https://developers.cloudflare.com/llms-full.txt>.
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
\* Get your account ID and authentication token
\* Send your first request
\* Provider authentication
\* Integration options
\* Unified API Endpoint
\* Provider-specific endpoints
\* Next steps

#### On this page

```
*  Overview
*  Get your account ID and authentication token
*  Send your first request
*  Provider authentication
*  Integration options
    *  Unified API Endpoint
    *  Provider-specific endpoints
*  Next steps
```

Was this helpful?
Yes No
Edit page Report issue
1. Directory
1. …
1. AI Gateway
1. Getting started
Copy page

### Getting started

**Last reviewed:** almost 2 years ago
In this guide, you will learn how to set up and use your first AI Gateway.

#### Get your account ID and authentication token

Before making requests, you need two things:
1. Your **Account ID** — find it in the Cloudflare dashboard.
1. A **Cloudflare API token** — create an API token with AI Gateway - Read and AI Gateway - Edit permissions. The example below also uses Workers AI, so add Workers AI - Read as well.

#### Send your first request

Run the following command to make your first request through AI Gateway:
Terminal window

```
curl -X POST https://gateway.ai.cloudflare.com/v1/$CLOUDFLARE_ACCOUNT_ID/default/compat/chat/completions \
  --header "cf-aig-authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

Note
AI Gateway automatically creates a gateway for you on the first request. The gateway is created with authentication turned on, so the cf-aig-authorization header is required for all requests. For more details on how the default gateway works, refer to Default gateway.
Create a gateway manually
You can also create gateways manually with a custom name and configuration through the dashboard or API.
\* Dashboard
\* API
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

#### Provider authentication

Authenticate with your upstream AI provider using one of the following options:
\* **Unified Billing:** Use the AI Gateway billing to pay for and authenticate your inference requests. Refer to Unified Billing.
\* **BYOK (Store Keys):** Store your own provider API Keys with Cloudflare, and AI Gateway will include them at runtime. Refer to BYOK.
\* **Request headers:** Include your provider API Key in the request headers as you normally would (for example, Authorization: Bearer <OPENAI\_API\_KEY> ).

#### Integration options

##### Unified API Endpoint

OpenAI Compatible Recommended
The easiest way to get started with AI Gateway is through our OpenAI-compatible /chat/completions endpoint. This allows you to use existing OpenAI SDKs and tools with minimal code changes while gaining access to multiple AI providers. [https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/compat/chat/completions](https://gateway.ai.cloudflare.com/v1/%7Baccount_id%7D/%7Bgateway_id%7D/compat/chat/completions)
**Key benefits:**
\* Drop-in replacement for OpenAI API, works with existing OpenAI SDKs and other OpenAI compliant clients
\* Switch between providers by changing the model parameter
\* Dynamic Routing - Define complex routing scenarios requiring conditional logic, conduct A/B tests, set rate / budget limits, etc

###### Example:

Make a request to
OpenAI
using
OpenAI JS SDK
with
Stored Key (BYOK)

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "openai/gpt-5.2",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-4-5-sonnet",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "google/gemini-2.5-pro",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "grok/grok-4",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "dynamic/customer-support",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{cf_api_token}",
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{openai_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "openai/gpt-5.2",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{anthropic_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-4-5-sonnet",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{google_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "google/gemini-2.5-pro",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{grok_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "grok/grok-4",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{dynamic_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "dynamic/customer-support",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "{workers-ai_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
  model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('openai/gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('anthropic/claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('google/gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('grok/grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('dynamic/customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('openai/gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('anthropic/claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('google/gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('grok/grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('dynamic/customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from 'ai-gateway-provider/providers/openai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const openai = createOpenAI();

const { text } = await generateText({
  model: aigateway(openai.chat('gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const anthropic = createAnthropic();

const { text } = await generateText({
  model: aigateway(anthropic('claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createGoogle } from 'ai-gateway-provider/providers/google';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const google = createGoogle();

const { text } = await generateText({
  model: aigateway(google('gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createXai } from 'ai-gateway-provider/providers/xai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const xai = createXai();

const { text } = await generateText({
  model: aigateway(xai('grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from 'ai-gateway-provider/providers/openai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const openai = createOpenAI({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(openai.chat('gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const anthropic = createAnthropic({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(anthropic('claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createGoogle } from 'ai-gateway-provider/providers/google';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const google = createGoogle({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(google('gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createXai } from 'ai-gateway-provider/providers/xai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const xai = createXai({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(xai('grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "openai/gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-4-5-sonnet",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemini-2.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "grok/grok-4",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/customer-support",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {openai_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "openai/gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {anthropic_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-4-5-sonnet",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {google_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemini-2.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {grok_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "grok/grok-4",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {dynamic_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/customer-support",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {workers-ai_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

Refer to Unified API to learn more about OpenAI compatibility.

##### Provider-specific endpoints

For direct integration with specific AI providers, use dedicated endpoints that maintain the original provider's API schema while adding AI Gateway features.

```
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}
```

**Available providers:**
\* OpenAI - GPT models and embeddings
\* Anthropic - Claude models
\* Google AI Studio - Gemini models
\* Workers AI - Cloudflare's inference platform
\* AWS Bedrock - Amazon's managed AI service
\* Azure OpenAI - Microsoft's OpenAI service
\* and more...

#### Next steps

```
*  Learn more about caching for faster requests and cost savings and rate limiting to control how your application scales.
*  Explore how to specify model or provider fallbacks, ratelimits, A/B tests for resiliency.
*  Learn how to use low-cost, open source models on Workers AI - our AI inference service.
*   **Resources**
*  API
*  New to Cloudflare?
*  Directory
*  Sponsorships
*  Open Source
*   **Support**
*  Help Center
*  System Status
*  Compliance
*  GDPR
*   **Company**
*  cloudflare.com
*  Our team
*  Careers
*   **Tools**
*  Cloudflare Radar
*  Speed Test
*  Is BGP Safe Yet?
*  RPKI Toolkit
*  Certificate Transparency
*   **Community**
*  X
*  Discord
*  YouTube
*  GitHub
*  © 2026 Cloudflare, Inc.
*  Privacy Policy
*  Terms of Use
*  Report Security Issues
*  Trademark
*   Your Privacy Choices
```

Previous Overview Next Unified API (OpenAI compat)
Edit page
Last updated: Mar 3, 2026
Was this helpful?
Yes No
Back to top
