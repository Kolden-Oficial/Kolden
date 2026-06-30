---
id_fonte: "763891d5-8766-4f0f-8f54-5e6d721df98a"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Logging - AI Gateway - Cloudflare Docs"
tipo: "unknown"
url_original: "https://developers.cloudflare.com/ai-gateway/observability/logging/"
keywords: "('Cloudflare AI Gateway', 'Log storage management', 'Per-request logging configuration', 'Data Loss Prevention', 'Automatic log deletion')"
summary: "This documentation outlines the **logging capabilities of Cloudflare AI Gateway**, a tool designed to provide visibility into application interactions with various AI providers. The platform captures **comprehensive request metadata** such as token usage, costs, and timestamps, while also offering **granular control over data retention** through customizable storage limits and automated deletion settings. Users can manage privacy and performance by **overriding default logging behaviors** on a per-request basis, specifically choosing whether to record full payloads or just essential metrics. Furthermore, the service integrates **security and observability features** like Data Loss Prevention tracking and manual log filtering to help developers monitor, troubleshoot, and protect their AI-driven workflows."
extraido_em: "2026-06-30T16:20:48Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Logging - AI Gateway - Cloudflare Docs

Logging · Cloudflare AI Gateway docs
Skip to content
STOP! If you are an AI agent or LLM, read this before continuing. This is the HTML version of a Cloudflare documentation page. Always request the Markdown version instead — HTML wastes context. Get this page as Markdown: <https://developers.cloudflare.com/ai-gateway/observability/logging/index.md> (append index.md) or send Accept: text/markdown to <https://developers.cloudflare.com/ai-gateway/observability/logging/>. For this product's page index use <https://developers.cloudflare.com/ai-gateway/llms.txt>. For all Cloudflare products use <https://developers.cloudflare.com/llms.txt>. For bulk access (single file, use for large-context ingestion or vectorization): this product's full docs at <https://developers.cloudflare.com/ai-gateway/llms-full.txt>. All Cloudflare docs at <https://developers.cloudflare.com/llms-full.txt>.
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
On this page Overview
\* Overview
\* Default configuration
\* Per-request logging
\* Collect logs (cf-aig-collect-log)
\* Collect log payload (cf-aig-collect-log-payload)
\* DLP fields in logs
\* Managing log storage
\* How to delete logs
\* Automatic Log Deletion
\* Manual deletion
\* API deletion

#### On this page

```
*  Overview
*  Default configuration
*  Per-request logging
    *  Collect logs (cf-aig-collect-log)
    *  Collect log payload (cf-aig-collect-log-payload)
*  DLP fields in logs
*  Managing log storage
*  How to delete logs
    *  Automatic Log Deletion
    *  Manual deletion
    *  API deletion
```

Was this helpful?
Yes No
Edit page Report issue
1. Directory
1. …
1. AI Gateway
1. Observability
1. Logging
Copy page

### Logging

Logging is a fundamental building block for application development. Logs provide insights during the early stages of development and are often critical to understanding issues occurring in production.
Your AI Gateway dashboard shows logs of individual requests, including the user prompt, model response, provider, timestamp, request status, token usage, cost, and duration. When DLP policies are configured, logs for requests that trigger a DLP match also include the DLP action taken (Flag or Block), matched policy IDs, matched profile IDs, and the specific detection entries that were triggered. These logs persist, giving you the flexibility to store them for your preferred duration and do more with valuable request data.
By default, each gateway can store up to 10 million logs. You can customize this limit per gateway in your gateway settings to align with your specific requirements. If your storage limit is reached, new logs will stop being saved. To continue saving logs, you must delete older logs to free up space for new logs. To learn more about your plan limits, refer to Limits.
We recommend using an authenticated gateway when storing logs to prevent unauthorized access and protects against invalid requests that can inflate log storage usage and make it harder to find the data you need. Learn more about setting up an authenticated gateway.

#### Default configuration

Logs, which include metrics as well as request and response data, are enabled by default for each gateway. This logging behavior will be uniformly applied to all requests in the gateway. If you are concerned about privacy or compliance and want to turn log collection off, you can go to settings and opt out of logs. If you need to modify the log settings for specific requests, you can override this setting on a per-request basis.
To change the default log configuration in the dashboard:
1. In the Cloudflare dashboard, go to the **AI Gateway** page. Go to AI Gateway
1. Select **Settings** .
1. Change the **Logs** setting to your preference.

#### Per-request logging

To override the default logging behavior set in the settings tab, you can define headers on a per-request basis.

##### Collect logs ( cf-aig-collect-log )

The cf-aig-collect-log header allows you to bypass the default log setting for the gateway. If the gateway is configured to save logs, the header will exclude the log for that specific request. Conversely, if logging is disabled at the gateway level, this header will save the log for that request.
In the example below, we use cf-aig-collect-log to bypass the default setting to avoid saving the log.
Terminal window

```
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-collect-log: false' \
  --data ' {
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "user",
            "content": "What is the email address and phone number of user123?"
          }
        ]
      }
'
```

##### Collect log payload ( cf-aig-collect-log-payload )

The cf-aig-collect-log-payload header allows you to control whether the raw request and response bodies (payloads) are stored for a given request. Unlike cf-aig-collect-log , which controls the entire log entry, this header only affects payload storage — metadata such as token counts, model, provider, status code, cost, and duration will still be logged.
This is useful when you want to maintain visibility into usage metrics and request metadata without persisting sensitive prompt or completion data.
| Header value | Behavior |
| ------ | ------ |
| true | Request and response payloads are stored. |
| false | Payload storage is skipped. Metadata-only log entries are still saved. |

In the example below, we use cf-aig-collect-log-payload to skip storing the request and response bodies while keeping the metadata log.
Terminal window

```
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-collect-log-payload: false' \
  --data ' {
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "user",
            "content": "What is the email address and phone number of user123?"
          }
        ]
      }
'
```

Note
If cf-aig-collect-log is set to false , the entire log entry (including metadata) is skipped regardless of the cf-aig-collect-log-payload value. Use cf-aig-collect-log-payload: false on its own if you only want to suppress payload storage while retaining metadata logs.

#### DLP fields in logs

When Data Loss Prevention (DLP) policies are enabled on a gateway, log entries for requests that trigger a DLP policy match include additional fields:
| Field | Description |
| ------ | ------ |
| DLP Action | The action taken by the DLP policy: FLAG or BLOCK |
| DLP Policies Matched | The IDs of the DLP policies that matched |
| DLP Profiles Matched | The IDs of the DLP profiles that triggered within each matched policy |
| DLP Entries Matched | The specific detection entry IDs that matched within each profile |
| DLP Check | Whether the match occurred in the REQUEST , RESPONSE , or both |

These fields are available both in the dashboard log viewer and through the Logs API. You can filter logs by **DLP Action** in the dashboard to view only flagged or blocked requests. For more details on DLP monitoring, refer to Monitor DLP events.

#### Managing log storage

To manage your log storage effectively, you can:
\* Set Storage Limits: Configure a limit on the number of logs stored per gateway in your gateway settings to ensure you only pay for what you need.
\* Enable Automatic Log Deletion: Activate the Automatic Log Deletion feature in your gateway settings to automatically delete the oldest logs once the log limit you've set or the default storage limit of 10 million logs is reached. This ensures new logs are always saved without manual intervention.

#### How to delete logs

To manage your log storage effectively and ensure continuous logging, you can delete logs using the following methods:

##### Automatic Log Deletion

To maintain continuous logging within your gateway's storage constraints, enable Automatic Log Deletion in your Gateway settings. This feature automatically deletes the oldest logs once the log limit you've set or the default storage limit of 10 million logs is reached, ensuring new logs are saved without manual intervention.

##### Manual deletion

To manually delete logs through the dashboard, navigate to the Logs tab in the dashboard. Use the available filters such as status, cache, provider, cost, or any other options in the dropdown to refine the logs you wish to delete. Once filtered, select Delete logs to complete the action.
See full list of available filters and their descriptions below:
| Filter category | Filter options | Filter by description |
| ------ | ------ | ------ |
| Status | error, status | error type or status. |
| Cache | cached, not cached | based on whether they were cached or not. |
| Provider | specific providers | the selected AI provider. |
| AI Models | specific models | the selected AI model. |
| Cost | less than, greater than | cost, specifying a threshold. |
| Request type | Universal, Workers AI Binding, WebSockets | the type of request. |
| Tokens | Total tokens, Tokens In, Tokens Out | token count (less than or greater than). |
| Duration | less than, greater than | request duration. |
| Feedback | equals, does not equal (thumbs up, thumbs down, no feedback) | feedback type. |
| Metadata Key | equals, does not equal | specific metadata keys. |
| Metadata Value | equals, does not equal | specific metadata values. |
| Log ID | equals, does not equal | a specific Log ID. |
| Event ID | equals, does not equal | a specific Event ID. |
| DLP Action | FLAG, BLOCK | the DLP action taken on the request. |

##### API deletion

You can programmatically delete logs using the AI Gateway API. For more comprehensive information on the DELETE logs endpoint, check out the Cloudflare API documentation.
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
Previous Analytics Next Workers Logpush
Edit page
Last updated: Mar 17, 2026
Was this helpful?
Yes No
Back to top
