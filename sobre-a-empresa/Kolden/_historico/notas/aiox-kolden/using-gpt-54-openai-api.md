---
id_fonte: "50343853-7c4a-47fa-9df7-c5efe43e7ce9"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Using GPT-5.4 | OpenAI API"
tipo: "unknown"
url_original: "https://developers.openai.com/api/docs/guides/latest-model"
keywords: "('GPT-5.4 Model Features', 'API Migration Guidance', 'Agentic Tool Use', 'Reasoning Effort Settings', 'Context Window Expansion')"
summary: "This technical documentation outlines the capabilities and implementation of **GPT-5.4**, a versatile frontier model designed to excel at **complex reasoning, production-grade coding, and autonomous agent workflows**. The text highlights major architectural advancements, such as a **1M token context window**, native **computer-use functionality**, and a sophisticated **Responses API** that optimizes performance by preserving chain-of-thought data between interactions. Developers are provided with a comprehensive framework for **model optimization**, including granular controls for **reasoning effort and output verbosity** to balance latency against task depth. Ultimately, the guide serves as a strategic roadmap for migrating to this new ecosystem, emphasizing **agentic tool integration** and refined prompting techniques to leverage the model’s superior document synthesis and software engineering skills."
extraido_em: "2026-06-30T16:22:30Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Using GPT-5.4 | OpenAI API

Using GPT-5.4 | OpenAI API
Home
API
Docs Guides and concepts for the OpenAI API
API reference Endpoints, parameters, and responses
Codex
Docs Guides, concepts, and product docs for Codex
Use cases Example workflows and tasks teams hand to Codex
ChatGPT
Apps SDK Build apps to extend ChatGPT
Commerce Build commerce flows in ChatGPT
Resources
Showcase Demo apps to get inspired
Blog Learnings and experiences from developers
Cookbook Notebook examples for building with OpenAI models
Learn Docs, videos, and demo apps for building with OpenAI
Community Programs, meetups, and support for builders
Start searching
API Dashboard

#### Search the API docs

Search docs

##### Suggested

response\_format reasoning\_effort streaming tools
Primary navigation
API API Reference Codex ChatGPT Resources
Search docs

##### Suggested

response\_format reasoning\_effort streaming tools

##### Get started

```
*  Overview
*  Quickstart
*  Models
*  Pricing
*  Libraries
*  Latest: GPT-5.4
*  Prompt guidance
```

##### Core concepts

```
*  Text generation
*  Code generation
*  Images and vision
*  Audio and speech
*  Structured output
*  Function calling
*  Responses API
```

##### Agents

```
*  Overview
*  Build agents
    *  Agent Builder
    *  Node reference
    *  Safety in building agents
    *  Agents SDK
*  Deploy in your product
    *  ChatKit
    *  Custom theming
    *  Widgets
    *  Actions
    *  Advanced integration
*  Optimize
    *  Agent evals
    *  Trace grading
*  Voice agents
```

##### Tools

```
*  Using tools
*  Web search
*  MCP and Connectors
*  Skills
*  Shell
*  Computer use
*  File search and retrieval
    *  File search
    *  Retrieval
*  Tool search
*  More tools
    *  Apply Patch
    *  Local shell
    *  Image generation
    *  Code interpreter
```

##### Run and scale

```
*  Conversation state
*  Background mode
*  Streaming
*  WebSocket mode
*  Webhooks
*  File inputs
*  Context management
    *  Compaction
    *  Counting tokens
    *  Prompt caching
*  Prompting
    *  Overview
    *  Prompt engineering
    *  Citation formatting
*  Reasoning
    *  Reasoning models
    *  Reasoning best practices
```

##### Evaluation

```
*  Getting started
*  Working with evals
*  Prompt optimizer
*  External models
*  Best practices
```

##### Realtime API

```
*  Overview
*  Connect
    *  WebRTC
    *  WebSocket
    *  SIP
*  Usage
    *  Using realtime models
    *  Managing conversations
    *  MCP servers
    *  Webhooks and server-side controls
    *  Managing costs
    *  Realtime transcription
    *  Voice agents
```

##### Model optimization

```
*  Optimization cycle
*  Fine-tuning
    *  Supervised fine-tuning
    *  Vision fine-tuning
    *  Direct preference optimization
    *  Reinforcement fine-tuning
    *  RFT use cases
    *  Best practices
*  Graders
```

##### Specialized models

```
*  Image generation
*  Video generation
*  Text to speech
*  Speech to text
*  Deep research
*  Embeddings
*  Moderation
```

##### Going live

```
*  Production best practices
*  Latency optimization
    *  Overview
    *  Predicted Outputs
    *  Priority processing
*  Cost optimization
    *  Overview
    *  Batch
    *  Flex processing
*  Accuracy optimization
*  Safety
    *  Safety best practices
    *  Safety checks
    *  Cybersecurity checks
    *  Under 18 API Guidance
```

##### Legacy APIs

```
*  Assistants API
    *  Migration guide
    *  Deep dive
    *  Tools
```

##### Resources

```
*  Terms and policies
*  Changelog
*  Your data
*  Permissions
*  Rate limits
*  Deprecations
*  MCP for deep research
*  Developer mode
*  ChatGPT Actions
    *  Introduction
    *  Getting started
    *  Actions library
    *  Authentication
    *  Production
    *  Data retrieval
    *  Sending files
```

Docs Use cases

##### Getting Started

```
*  Overview
*  Quickstart
*  Explore
*  Pricing
*  Community
*  Concepts
    *  Prompting
    *  Customization
    *  Sandboxing
    *  Subagents
    *  Workflows
    *  Models
    *  Cyber Safety
*  Use cases
```

##### Using Codex

```
*  App
    *  Overview
    *  Features
    *  Settings
    *  Review
    *  Automations
    *  Worktrees
    *  Local Environments
    *  Commands
    *  Windows
    *  Troubleshooting
*  IDE Extension
    *  Overview
    *  Features
    *  Settings
    *  IDE Commands
    *  Slash commands
*  CLI
    *  Overview
    *  Features
    *  Command Line Options
    *  Slash commands
*  Web
    *  Overview
    *  Environments
    *  Internet Access
*  Integrations
    *  GitHub
    *  Slack
    *  Linear
*  Codex Security
    *  Overview
    *  Setup
    *  Improving the threat model
    *  FAQ
```

##### Configuration

```
*  Config File
    *  Config Basics
    *  Advanced Config
    *  Config Reference
    *  Sample Config
*  Speed
*  Rules
*  Hooks
*  AGENTS.md
*  MCP
*  Plugins
    *  Overview
    *  Build plugins
*  Skills
*  Subagents
```

##### Administration

```
*  Authentication
*  Agent approvals & security
*  Enterprise
    *  Admin Setup
    *  Governance
    *  Managed configuration
*  Windows
```

##### Automation

```
*  Non-interactive Mode
*  Codex SDK
*  App Server
*  MCP Server
*  GitHub Action
```

##### Learn

```
*  Best practices
*  Videos
*  Blog
    *  Using skills to accelerate OSS maintenance
    *  Building frontend UIs with Codex and Figma
    *  View all
*  Cookbooks
    *  Codex Prompting Guide
    *  Modernizing your Codebase with Codex
    *  View all
*  Building AI Teams
```

##### Releases

```
*  Changelog
*  Feature Maturity
*  Open Source
*  Home
```

Apps SDK Commerce
\* Home
\* Quickstart

##### Core Concepts

```
*  MCP Apps in ChatGPT
*  MCP Server
*  UX principles
*  UI guidelines
```

##### Plan

```
*  Research use cases
*  Define tools
*  Design components
```

##### Build

```
*  Set up your server
*  Build your ChatGPT UI
*  Authenticate users
*  Manage state
*  Monetize your app
*  Examples
```

##### Deploy

```
*  Deploy your app
*  Connect from ChatGPT
*  Test your integration
*  Submit your app
```

##### Guides

```
*  Optimize Metadata
*  Security & Privacy
*  Troubleshooting
```

##### Resources

```
*  Changelog
*  App submission guidelines
*  Reference
*  Home
```

##### Guides

```
*  Get started
*  Best practices
```

##### File Upload

```
*  Overview
*  Products
```

##### API

```
*  Overview
*  Feeds
*  Products
*  Promotions
```

Showcase Blog Cookbook Learn Community
\* Home
\* All posts

##### Recent

```
*  How Perplexity Brought Voice Search to Millions Using the Realtime API
*  Designing delightful frontends with GPT-5.4
*  From prompts to products: One year of Responses
*  Using skills to accelerate OSS maintenance
*  Building frontend UIs with Codex and Figma
```

##### Topics

```
*  General
*  API
*  Apps SDK
*  Audio
*  Codex
*  Home
```

##### Topics

```
*  Agents
*  Evals
*  Multimodal
*  Text
*  Guardrails
*  Optimization
*  ChatGPT
*  Codex
*  gpt-oss
```

##### Contribute

```
*  Cookbook on GitHub
*  Home
*  Docs MCP
```

##### Categories

```
*  Demo apps
*  Videos
```

##### Topics

```
*  Agents
*  Audio & Voice
*  Computer use
*  Codex
*  Evals
*  gpt-oss
*  Fine-tuning
*  Image generation
*  Scaling
*  Tools
*  Video generation
*  Community
```

##### Programs

```
*  Codex Ambassadors
*  Codex for Students
*  Codex for Open Source
```

##### Events

```
*  Meetups
*  Hackathon Support
*  Forum
*  Discord
```

API Dashboard

##### Get started

```
*  Overview
*  Quickstart
*  Models
*  Pricing
*  Libraries
*  Latest: GPT-5.4
*  Prompt guidance
```

##### Core concepts

```
*  Text generation
*  Code generation
*  Images and vision
*  Audio and speech
*  Structured output
*  Function calling
*  Responses API
```

##### Agents

```
*  Overview
*  Build agents
    *  Agent Builder
    *  Node reference
    *  Safety in building agents
    *  Agents SDK
*  Deploy in your product
    *  ChatKit
    *  Custom theming
    *  Widgets
    *  Actions
    *  Advanced integration
*  Optimize
    *  Agent evals
    *  Trace grading
*  Voice agents
```

##### Tools

```
*  Using tools
*  Web search
*  MCP and Connectors
*  Skills
*  Shell
*  Computer use
*  File search and retrieval
    *  File search
    *  Retrieval
*  Tool search
*  More tools
    *  Apply Patch
    *  Local shell
    *  Image generation
    *  Code interpreter
```

##### Run and scale

```
*  Conversation state
*  Background mode
*  Streaming
*  WebSocket mode
*  Webhooks
*  File inputs
*  Context management
    *  Compaction
    *  Counting tokens
    *  Prompt caching
*  Prompting
    *  Overview
    *  Prompt engineering
    *  Citation formatting
*  Reasoning
    *  Reasoning models
    *  Reasoning best practices
```

##### Evaluation

```
*  Getting started
*  Working with evals
*  Prompt optimizer
*  External models
*  Best practices
```

##### Realtime API

```
*  Overview
*  Connect
    *  WebRTC
    *  WebSocket
    *  SIP
*  Usage
    *  Using realtime models
    *  Managing conversations
    *  MCP servers
    *  Webhooks and server-side controls
    *  Managing costs
    *  Realtime transcription
    *  Voice agents
```

##### Model optimization

```
*  Optimization cycle
*  Fine-tuning
    *  Supervised fine-tuning
    *  Vision fine-tuning
    *  Direct preference optimization
    *  Reinforcement fine-tuning
    *  RFT use cases
    *  Best practices
*  Graders
```

##### Specialized models

```
*  Image generation
*  Video generation
*  Text to speech
*  Speech to text
*  Deep research
*  Embeddings
*  Moderation
```

##### Going live

```
*  Production best practices
*  Latency optimization
    *  Overview
    *  Predicted Outputs
    *  Priority processing
*  Cost optimization
    *  Overview
    *  Batch
    *  Flex processing
*  Accuracy optimization
*  Safety
    *  Safety best practices
    *  Safety checks
    *  Cybersecurity checks
    *  Under 18 API Guidance
```

##### Legacy APIs

```
*  Assistants API
    *  Migration guide
    *  Deep dive
    *  Tools
```

##### Resources

```
*  Terms and policies
*  Changelog
*  Your data
*  Permissions
*  Rate limits
*  Deprecations
*  MCP for deep research
*  Developer mode
*  ChatGPT Actions
    *  Introduction
    *  Getting started
    *  Actions library
    *  Authentication
    *  Production
    *  Data retrieval
    *  Sending files
*  Key improvements
*  Meet the models
*  Using tools with GPT-5.4
*  Migration guidance
*  Prompting guidance
*  Further reading
*  FAQ
```

Prompt guidance Prompt patterns and migration tips for GPT-5.4
OpenAI Docs skill Use it to migrate prompts and workflows to GPT-5.4
Copy Page More page actions
Copy Page More page actions

### Using GPT-5.4

Learn best practices, features, and migration guidance for GPT-5.4 and the GPT-5 model family.
GPT-5.4 is our most capable frontier model yet, delivering higher-quality outputs with fewer iterations across ChatGPT, the API, and Codex. It helps people and teams analyze complex information, build production software, and automate multi-step workflows.
In practice, gpt-5.4 is the default model for both broad general-purpose work and most coding tasks. Start there when you want one model that can move between software engineering, reasoning, writing, and tool use in the same workflow.
This guide covers key features of the GPT-5 model family and how to get the most out of GPT-5.4.

#### Key improvements

Compared with the previous GPT-5.2 model, GPT-5.4 shows improvements in:
\* Coding, document understanding, tool use, and instruction following
\* Image perception and multimodal tasks
\* Long-running task execution and multi-step agent workflows
\* Token efficiency and end-to-end performance on tool-heavy workloads
\* Agentic web search and multi-source synthesis, especially for hard-to-locate information
\* Document-heavy and spreadsheet-heavy business workflows in customer service, analytics, and finance
GPT-5.4 brings the coding capabilities of GPT-5.3-Codex to our flagship frontier model. Developers can generate production-quality code, build polished front-end UI, follow repo-specific patterns, and handle multi-file changes with fewer retries. It also has a strong out-of-the-box coding personality, so teams spend less time on prompt tuning.
For agentic workloads, GPT-5.4 reduces end-to-end time across multi-step trajectories and often completes tasks with fewer tokens and tool calls. This makes agents more responsive and lowers the cost of operating complex workflows at scale in the API and Codex.

##### New features in GPT-5.4

Like earlier GPT-5 models, GPT-5.4 supports custom tools, parameters to control verbosity and reasoning, and an allowed tools list. GPT-5.4 also introduces several capabilities that make it easier to build powerful agent systems, operate over larger bodies of information, and run more reliable automated workflows:
\* **tool\_search in the API:** GPT-5.4 improves tool search for larger tool ecosystems by using deferred tool loading. This makes tools searchable, loads only the relevant definitions, reduces token usage, and improves tool selection accuracy in real deployments. Learn more in the tool search guide.
\* **1M token context window:** GPT-5.4 supports up to a 1M token context window, making it easier to analyze entire codebases, long document collections, or extended agent trajectories in a single request. Read more in the 1M context window section.
\* **Built-in computer use:** GPT-5.4 is the first mainline model with built-in computer-use capabilities, enabling agents to interact directly with software to complete, verify, and fix tasks in a build-run-verify-fix loop. Learn more in the computer use guide.
\* **Native compaction support:** GPT-5.4 is the first mainline model trained to support compaction, enabling longer agent trajectories while preserving key context.

#### Meet the models

In general, gpt-5.4 is the default model for your most important work across both general-purpose tasks and coding. It replaces the previous gpt-5.2 model in the API, and gpt-5.3-codex in Codex. The model powering ChatGPT is gpt-5-chat-latest . For more difficult problems, gpt-5.4-pro uses more compute to think longer and provide consistently better answers.
For smaller, faster variants, start with gpt-5.4-mini or gpt-5.4-nano .
To help you pick the model that best fits your use case, consider these tradeoffs:
| Variant | Best for |
| ------ | ------ |
| gpt-5.4 | General-purpose work, including complex reasoning, broad world knowledge, and code-heavy or multi-step agentic tasks |
| gpt-5.4-pro | Tough problems that may take longer to solve and need deeper reasoning |
| gpt-5.4-mini | High-volume coding, computer use, and agent workflows that still need strong reasoning |
| gpt-5.4-nano | Simple high-throughput tasks where speed and cost matter most |

##### Lower reasoning effort

The reasoning.effort parameter controls how many reasoning tokens the model generates before producing a response. Earlier reasoning models like o3 supported only low , medium , and high : low favored speed and fewer tokens, while high favored more thorough reasoning.
Starting with GPT-5.2, the lowest setting is none to provide lower-latency interactions. This is the default setting in GPT-5.2 and newer models. If you need more thinking, slowly increase to medium and experiment with results.
With reasoning effort set to none , prompting is important. To improve the model's reasoning quality, even with the default settings, encourage it to “think” or outline its steps before answering.
Reasoning effort set to none
python

```
1
2
3
4
5
6
7
curl --request POST   --url https://api.openai.com/v1/responses   --header "Authorization: Bearer $OPENAI_API_KEY"   --header 'Content-type: application/json'   --data '{
        "model": "gpt-5.4",
        "input": "How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
        "reasoning": {
                "effort": "none"
        }
}'
```

```
1
2
3
4
5
6
7
8
9
10
11
12
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.4",
  input: "How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
  reasoning: {
    effort: "none"
  }
});

console.log(response);
```

```
1
2
3
4
5
6
7
8
9
10
11
12
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input="How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
    reasoning={
        "effort": "none"
    }
)

print(response)
```

##### Verbosity

Verbosity determines how many output tokens are generated. Lowering the number of tokens reduces overall latency. While the model's reasoning approach stays mostly the same, the model finds ways to answer more concisely—which can either improve or diminish answer quality, depending on your use case. Here are some scenarios for both ends of the verbosity spectrum:
\* **High verbosity:** Use when you need the model to provide thorough explanations of documents or perform extensive code refactoring.
\* **Low verbosity:** Best for situations where you want concise answers or simple code generation, such as SQL queries.
GPT-5 made this option configurable as one of high , medium , or low . With GPT-5.4, verbosity remains configurable and defaults to medium .
When generating code with GPT-5.4, medium and high verbosity levels yield longer, more structured code with inline explanations, while low verbosity produces shorter, more concise code with minimal commentary.
Control verbosity
python

```
1
2
3
4
5
6
7
curl --request POST   --url https://api.openai.com/v1/responses   --header "Authorization: Bearer $OPENAI_API_KEY"   --header 'Content-type: application/json'   --data '{
  "model": "gpt-5.4",
  "input": "What is the answer to the ultimate question of life, the universe, and everything?",
  "text": {
    "verbosity": "low"
  }
}'
```

```
1
2
3
4
5
6
7
8
9
10
11
12
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.4",
  input: "What is the answer to the ultimate question of life, the universe, and everything?",
  text: {
    verbosity: "low"
  }
});

console.log(response);
```

```
1
2
3
4
5
6
7
8
9
10
11
12
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input="What is the answer to the ultimate question of life, the universe, and everything?",
    text={
        "verbosity": "low"
    }
)

print(response)
```

You can still steer verbosity through prompting after setting it to low in the API. The verbosity parameter defines a general token range at the system prompt level, but the actual output is flexible to both developer and user prompts within that range.

###### 1M context window

1M token context window was introduced with GPT-5.4, making it easier to analyze entire codebases, long document collections, or extended agent trajectories in a single request.
We have separate standard pricing for requests under 272K and over 272K tokens, available in the pricing docs. If you use priority processing, any prompt above 272K tokens is automatically processed at standard rates.
Long context pricing stacks with other pricing modifiers such as data residency and batch.
We have different rate limits for requests under 272K tokens and over 272K tokens; this is available on the GPT-5.4 model page.

#### Using tools with GPT-5.4

GPT-5.4 has been post-trained on specific tools. See the tools docs for more specific guidance.

##### Computer use tool

Computer use lets GPT-5.4 operate software through the user interface by inspecting screenshots and returning structured actions for your harness to execute. It is a good fit for browser or desktop workflows where a person could complete the task through the UI, such as navigating a site, filling out forms, or validating that a change actually worked.
Use it in an isolated browser or VM, and keep a human in the loop for high-impact actions. The full guide covers the built-in Responses API loop, custom harness patterns, and code-execution-based setups.
Computer use guide Learn how to run the built-in computer tool safely and integrate it with your own harness.

##### Tool search tool

Tool search lets GPT-5.4 defer large tool surfaces until runtime so the model loads only the definitions it needs. This is most useful when you have many functions, namespaces, or MCP tools and want to reduce token usage, preserve cache performance, and improve latency without exposing every schema up front.
Use hosted tool search when the candidate tools are already known at request time, or client-executed tool search when your application needs to decide what to load dynamically. The full guide also covers best practices for namespaces, MCP servers, and deferred loading.
Tool search guide Learn how to defer tool definitions and load the right subset at runtime.

##### Custom tools

When the GPT-5 model family launched, we introduced a new capability called custom tools, which lets models send any raw text as tool call input but still constrain outputs if desired. This tool behavior remains true in GPT-5.4.
Function calling guide Learn about custom tools in the function calling guide.

###### Freeform inputs

Define your tool with type: custom to enable models to send plaintext inputs directly to your tools, rather than being limited to structured JSON. The model can send any raw text—code, SQL queries, shell commands, configuration files, or long-form prose—directly to your tool.

```
1
2
3
4
5
{
    "type": "custom",
    "name": "code_exec",
    "description": "Executes arbitrary python code",
}
```

###### Constraining outputs

GPT-5.4 supports context-free grammars (CFGs) for custom tools, letting you provide a Lark grammar to constrain outputs to a specific syntax or DSL. Attaching a CFG (e.g., a SQL or DSL grammar) ensures the assistant's text matches your grammar.
This enables precise, constrained tool calls or structured responses and lets you enforce strict syntactic or domain-specific formats directly in GPT-5.4's function calling, improving control and reliability for complex or constrained domains.

###### Best practices for custom tools

```
*   **Write concise, explicit tool descriptions** . The model chooses what to send based on your description; state clearly if you want it to always call the tool.
*   **Validate outputs on the server side** . Freeform strings are powerful but require safeguards against injection or unsafe commands.
```

##### Allowed tools

The allowed\_tools parameter under tool\_choice lets you pass N tool definitions but restrict the model to only M (< N) of them. List your full toolkit in tools , and then use an allowed\_tools block to name the subset and specify a mode—either auto (the model may pick any of those) or required (the model must invoke one).
Function calling guide Learn about the allowed tools option in the function calling guide.
By separating all possible tools from the subset that can be used *now* , you gain greater safety, predictability, and improved prompt caching. You also avoid brittle prompt engineering, such as hard-coded call order. GPT-5.4 dynamically invokes or requires specific functions mid-conversation while reducing the risk of unintended tool usage over long contexts.
| | **Standard Tools** | **Allowed Tools** |
| ------ | ------ | ------ |
| Model's universe | All tools listed under **"tools": […]** | Only the subset under **"tools": […]** in **tool\_choice** |
| Tool invocation | Model may or may not call any tool | Model restricted to (or required to call) chosen tools |
| Purpose | Declare available capabilities | Constrain which capabilities are actually used |

```
1
2
3
4
5
6
7
8
9
"tool_choice": {
    "type": "allowed_tools",
    "mode": "auto",
    "tools": [
      { "type": "function", "name": "get_weather" },
      { "type": "function", "name": "search_docs" }
    ]
  }
}'
```

For a more detailed overview of all of these new features, see the prompt guidance for GPT-5.4.

##### Preambles

Preambles are brief, user-visible explanations that GPT-5.4 generates before invoking any tool or function, outlining its intent or plan (e.g., “why I'm calling this tool”). They appear after the chain-of-thought and before the actual tool call, providing transparency into the model's reasoning and enhancing debuggability, user confidence, and fine-grained steerability.
By letting GPT-5.4 “think out loud” before each tool call, preambles boost tool-calling accuracy (and overall task success) without bloating reasoning overhead. To enable preambles, add a system or developer instruction—for example: “Before you call a tool, explain why you are calling it.” GPT-5.4 prepends a concise rationale to each specified tool call. The model may also output multiple messages between tool calls, which can enhance the interaction experience—particularly for minimal reasoning or latency-sensitive use cases.
For more on using preambles, see the GPT-5 prompting cookbook.

#### Migration guidance

GPT-5.4 is our best model yet, and it works best with the Responses API, which supports passing chain of thought (CoT) between turns to improve performance. Read below to migrate from your current model or API.

##### Migrating from other models to GPT-5.4

Use the OpenAI Docs skill when migrating existing prompts or workflows to GPT-5.4. It's available in our public skills repository and the Codex desktop app.
While the model should be close to a drop-in replacement for GPT-5.2, there are a few key changes to call out. See Prompt guidance for GPT-5.4 for specific updates to make in your prompts.
Using GPT-5 models with the Responses API provides improved intelligence because of the API's design. The Responses API can pass the previous turn's CoT to the model. This leads to fewer generated reasoning tokens, higher cache hit rates, and less latency. To learn more, see an in-depth guide on the benefits of the Responses API.
When migrating to GPT-5.4 from an older OpenAI model, start by experimenting with reasoning levels and prompting strategies. Based on our testing, we recommend using our prompt optimizer—which automatically updates your prompts for GPT-5.4 based on our best practices—and following this model-specific guidance:
\* **gpt-5.2** : gpt-5.4 with default settings is meant to be a drop-in replacement.
\* **o3** : gpt-5.4 with medium or high reasoning. Start with medium reasoning with prompt tuning, then increase to high if you aren't getting the results you want.
\* **gpt-4.1** : gpt-5.4 with none reasoning. Start with none and tune your prompts; increase if you need better performance.
\* **o4-mini or gpt-4.1-mini** : gpt-5.4-mini with prompt tuning is a great replacement.
\* **gpt-4.1-nano** : gpt-5.4-nano with prompt tuning is a great replacement.

##### New phase parameter

For long-running or tool-heavy GPT-5.4 flows in the Responses API, use the assistant message phase field to avoid early stopping and other misbehavior. phase is optional at the API level, but we highly recommend using it. Use phase: "commentary" for intermediate assistant updates (such as preambles before tool calls) and phase: "final\_answer" for the completed answer. Do not add phase to user messages.
If you use previous\_response\_id , that is usually the simplest path because prior assistant state is preserved. If you replay assistant history manually, preserve each original phase value.
Missing or dropped phase can cause preambles to be treated as final answers in those workflows. For additional guidance and examples, see the GPT-5.4 prompting guide.
Round-trip assistant phase values
javascript

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.4",
  input: [
    {
      role: "assistant",
      phase: "commentary",
      content:
        "I’ll inspect the logs and then summarize root cause and remediation.",
    },
    {
      role: "assistant",
      phase: "final_answer",
      content: "Root cause: cache invalidation race.",
    },
    {
      role: "user",
      content: "Great—now give me a rollout-safe fix plan.",
    },
  ],
});

console.log(response.output_text);
```

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input=[
        {
            "role": "assistant",
            "phase": "commentary",
            "content": "I’ll inspect the logs and then summarize root cause and remediation.",
        },
        {
            "role": "assistant",
            "phase": "final_answer",
            "content": "Root cause: cache invalidation race.",
        },
        {
            "role": "user",
            "content": "Great—now give me a rollout-safe fix plan.",
        },
    ],
)

print(response.output_text)
```

##### GPT-5.4 parameter compatibility

The following parameters are **only supported** when using GPT-5.4 with reasoning effort set to none :
\* temperature
\* top\_p
\* logprobs
Requests to GPT-5.4 or GPT-5.2 with any other reasoning effort setting, or to older GPT-5 models (e.g., gpt-5 , gpt-5-mini , gpt-5-nano ) that include these fields will raise an error.
To achieve similar results with reasoning effort set higher, or with another GPT-5 family model, try these alternative parameters:
\* **Reasoning depth:** reasoning: { effort: "none" | "low" | "medium" | "high" | "xhigh" }
\* **Output verbosity:** text: { verbosity: "low" | "medium" | "high" }
\* **Output length:** max\_output\_tokens

##### Migrating from Chat Completions to Responses API

The biggest difference, and main reason to migrate from Chat Completions to the Responses API for GPT-5.4, is support for passing chain of thought (CoT) between turns. See a full comparison of the APIs.
Passing CoT exists only in the Responses API, and we've seen improved intelligence, fewer generated reasoning tokens, higher cache hit rates, and lower latency as a result of doing so. Most other parameters remain at parity, though the formatting is different. Here's how new parameters are handled differently between Chat Completions and the Responses API:
**Reasoning effort**
Responses API Chat Completions
Responses API
Generate response with reasoning effort set to none

```
1
2
3
4
5
6
7
8
9
10
11
curl --request POST \
    --url https://api.openai.com/v1/responses \
    --header "Authorization: Bearer $OPENAI_API_KEY" \
    --header 'Content-type: application/json' \
    --data '{
      "model": "gpt-5.4",
      "input": "How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
      "reasoning": {
        "effort": "none"
      }
    }'
```

Chat Completions
Generate response with reasoning effort set to none

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
curl --request POST \
    --url https://api.openai.com/v1/chat/completions \
    --header "Authorization: Bearer $OPENAI_API_KEY" \
    --header 'Content-type: application/json' \
    --data '{
      "model": "gpt-5.4",
      "messages": [
        {
          "role": "user",
          "content": "How much gold would it take to coat the Statue of Liberty in a 1mm layer?"
        }
      ],
      "reasoning_effort": "none"
    }'
```

**Verbosity**
Responses API Chat Completions
Responses API
Control verbosity

```
1
2
3
4
5
6
7
8
9
10
11
curl --request POST \
    --url https://api.openai.com/v1/responses \
    --header "Authorization: Bearer $OPENAI_API_KEY" \
    --header 'Content-type: application/json' \
    --data '{
      "model": "gpt-5.4",
      "input": "What is the answer to the ultimate question of life, the universe, and everything?",
      "text": {
        "verbosity": "low"
      }
    }'
```

Chat Completions
Control verbosity

```
1
2
3
4
5
6
7
8
9
10
11
curl --request POST \
    --url https://api.openai.com/v1/chat/completions \
    --header "Authorization: Bearer $OPENAI_API_KEY" \
    --header 'Content-type: application/json' \
    --data '{
      "model": "gpt-5.4",
      "messages": [
        { "role": "user", "content": "What is the answer to the ultimate question of life, the universe, and everything?" }
      ],
      "verbosity": "low"
    }'
```

**Custom tools**
Responses API Chat Completions
Responses API
Custom tool call

```
1
2
3
4
5
6
7
8
9
10
11
curl --request POST     --url https://api.openai.com/v1/responses     --header "Authorization: Bearer $OPENAI_API_KEY"     --header 'Content-type: application/json'     --data '{
      "model": "gpt-5.4",
      "input": "Use the code_exec tool to calculate the area of a circle with radius equal to the number of r letters in blueberry",
      "tools": [
        {
          "type": "custom",
          "name": "code_exec",
          "description": "Executes arbitrary python code"
        }
      ]
    }'
```

Chat Completions
Custom tool call

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
curl --request POST     --url https://api.openai.com/v1/chat/completions     --header "Authorization: Bearer $OPENAI_API_KEY"     --header 'Content-type: application/json'     --data '{
      "model": "gpt-5.4",
      "messages": [
        { "role": "user", "content": "Use the code_exec tool to calculate the area of a circle with radius equal to the number of r letters in blueberry" }
      ],
      "tools": [
        {
          "type": "custom",
          "custom": {
            "name": "code_exec",
            "description": "Executes arbitrary python code"
          }
        }
      ]
    }'
```

#### Prompting guidance

We specifically designed GPT-5.4 to excel at coding and agentic tasks. We also recommend iterating on prompts for GPT-5.4 with the prompt optimizer.
GPT-5.4 prompt optimizer Craft the perfect prompt for GPT-5.4 in the dashboard
GPT-5.4 prompt guidance Learn prompt patterns and migration tips for GPT-5.4
Frontend prompting for GPT-5 See prompt samples specific to frontend development for GPT-5 family of models

##### GPT-5.4 is a reasoning model

Reasoning models like GPT-5.4 break problems down step by step, producing an internal chain of thought that encodes their reasoning. To maximize performance, pass these reasoning items back to the model: this avoids re-reasoning and keeps interactions closer to the model's training distribution. In multi-turn conversations, passing a previous\_response\_id automatically makes earlier reasoning items available. This is especially important when using tools—for example, when a function call requires an extra round trip. In these cases, either include them with previous\_response\_id or add them directly to input .
Learn more about reasoning models and how to get the most out of them in our reasoning guide.

#### Further reading

GPT-5.4 prompting guide
GPT-5.3-Codex prompting guide
GPT-5.4 blog post
GPT-5 frontend guide
GPT-5 model family: new features guide
Cookbook on reasoning models
Comparison of Responses API vs. Chat Completions

#### FAQ

```
1.  **How are these models integrated into ChatGPT?**  In ChatGPT, there are three models: GPT‑5 Instant, GPT‑5 Thinking, and GPT‑5 Pro. Based on the user's question, a routing layer selects the best model to use. Users can also invoke reasoning directly through the ChatGPT UI. All three ChatGPT models (Instant, Thinking, and Pro) have a new knowledge cutoff of August 2025. For users, this means GPT-5.4 starts with a more current understanding of the world, so answers are more accurate and useful, with more relevant examples and context, even before turning to web search.
1.  **Will these models be supported in Codex?**  Yes, gpt-5.4 is the newest model that powers Codex and Codex CLI. You can also use this as a standalone model for building agentic coding applications.
1.  **How does GPT-5.4 compare to GPT-5.3-Codex?**  GPT-5.3-Codex is specifically designed for use in coding environments such as Codex. GPT-5.4 is designed for both general-purpose work and coding, making it the better default when your workflow spans software engineering plus planning, writing, or other business tasks. GPT-5.3-Codex is only available in the Responses API and supports low , medium , high , and xhigh reasoning effort settings along with function calling, structured outputs, streaming, and prompt caching. It doesn't support all GPT-5.4 parameters or API surfaces.
1.  **What is the deprecation plan for previous models?**  Any model deprecations will be posted on our deprecations page. We'll send advanced notice of any model deprecations.
1.  **What are the reasoning efforts supported?**
*  GPT 5 supports minimal, low, medium (default), and high.
    *  GPT 5.2 supports none (default), low, medium, and high.
    *  GPT 5.4 supports none (default), low, medium, high, and xhigh.
```
