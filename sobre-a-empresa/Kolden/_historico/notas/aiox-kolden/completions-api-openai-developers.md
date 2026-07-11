---
id_fonte: "4e24788b-fc4f-4923-a106-4578f69ccca6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Completions API - OpenAI Developers"
tipo: "unknown"
url_original: "https://developers.openai.com/api/docs/guides/completions"
keywords: "('Completions API', 'Chat Completions', 'Legacy Models', 'Text Generation', 'Model Optimization')"
summary: "This documentation outlines the comprehensive ecosystem of OpenAI’s developer tools, specifically contrasting the **legacy Completions API** with the modern **Chat Completions** interface. While the newer chat format uses structured message lists for its most advanced models, the completions endpoint utilizes a **freeform text prompt** and offers specialized features like **text insertion** via suffixes. Beyond these technical specifications, the text serves as a robust guide for **model optimization** and **agent construction**, providing resources for fine-tuning, safety protocols, and real-time integration. Ultimately, this source functions as a **technical roadmap** designed to help builders navigate the transition from older processing methods to the latest high-performance capabilities of **GPT-5.4**."
extraido_em: "2026-06-30T16:19:04Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Completions API - OpenAI Developers

Completions API | OpenAI API
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
*  Chat Completions vs. Completions
```

Copy Page More page actions
Copy Page More page actions

### Completions API

The completions API endpoint received its final update in July 2023 and has a different interface than the new Chat Completions endpoint. Instead of the input being a list of messages, the input is a freeform text string called a prompt .
An example legacy Completions API call looks like the following:
python

```
1
2
3
4
5
6
7
from openai import OpenAI
client = OpenAI()

response = client.completions.create(
model="gpt-3.5-turbo-instruct",
prompt="Write a tagline for an ice cream shop."
)
```

```
1
2
3
4
const completion = await openai.completions.create({
model: 'gpt-3.5-turbo-instruct',
prompt: 'Write a tagline for an ice cream shop.'
});
```

See the full API reference documentation to learn more.

###### Inserting text

The completions endpoint also supports inserting text by providing a suffix in addition to the standard prompt which is treated as a prefix. This need naturally arises when writing long-form text, transitioning between paragraphs, following an outline, or guiding the model towards an ending. This also works on code, and can be used to insert in the middle of a function or file.
Deep dive
Inserting text

##### Completions response format

An example completions API response looks as follows:

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
{
  "choices": [
    {
      "finish_reason": "length",
      "index": 0,
      "logprobs": null,
      "text": "\n\n\"Let Your Sweet Tooth Run Wild at Our Creamy Ice Cream Shack"
    }
  ],
  "created": 1683130927,
  "id": "cmpl-7C9Wxi9Du4j1lQjdjhxBlO22M61LD",
  "model": "gpt-3.5-turbo-instruct",
  "object": "text_completion",
  "usage": {
    "completion_tokens": 16,
    "prompt_tokens": 10,
    "total_tokens": 26
  }
}
```

In Python, the output can be extracted with response['choices'][0]['text'] .
The response format is similar to the response format of the Chat Completions API.

##### Inserting text

The completions endpoint also supports inserting text by providing a suffix in addition to the standard prompt which is treated as a prefix. This need naturally arises when writing long-form text, transitioning between paragraphs, following an outline, or guiding the model towards an ending. This also works on code, and can be used to insert in the middle of a function or file.
Deep dive
Inserting text

#### Chat Completions vs. Completions

The Chat Completions format can be made similar to the completions format by constructing a request using a single user message. For example, one can translate from English to French with the following completions prompt:

```
Translate the following English text to French: "{text}"
```

And an equivalent chat prompt would be:

```
[{"role": "user", "content": 'Translate the following English text to French: "{text}"'}]
```

Likewise, the completions API can be used to simulate a chat between a user and an assistant by formatting the input accordingly.
The difference between these APIs is the underlying models that are available in each. The Chat Completions API is the interface to our most capable model ( gpt-4o ), and our most cost effective model ( gpt-4o-mini ).
