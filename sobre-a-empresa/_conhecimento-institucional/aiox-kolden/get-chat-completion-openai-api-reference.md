---
id_fonte: "9dfa7fb4-e9d1-440f-9406-2211022f7797"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Get chat completion | OpenAI API Reference"
tipo: "unknown"
url_original: "https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/retrieve"
keywords: "('Chat Completion API', 'Model Optimization', 'Agent Development', 'API Reference', 'Token Usage Statistics')"
summary: "This documentation serves as a technical manual for developers using the OpenAI API to retrieve **stored chat completions** via specific identification codes. It outlines a sophisticated ecosystem of **artificial intelligence capabilities**, including text generation, specialized audio and video modalities, and **advanced reasoning models** like the latest GPT-5.4. By detailing **structured data objects**, the guide explains how to interpret machine responses, including token usage statistics, tool-calling mechanisms, and **probability information** for generated content. Ultimately, the text provides a comprehensive framework for **building and scaling AI agents** while ensuring precision through fine-tuning, safety protocols, and systematic evaluation tools."
extraido_em: "2026-06-30T16:19:56Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Get chat completion | OpenAI API Reference

Get chat completion | OpenAI API Reference
Skip to content
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

responses create response\_format parallel\_tool\_calls reasoning\_effort
Primary navigation
API API Reference Codex ChatGPT Resources
Search docs

##### Suggested

responses create response\_format parallel\_tool\_calls reasoning\_effort

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
API API Reference Codex ChatGPT Resources
\* API Reference
\* API Reference
\* Introduction
\* Authentication
\* Debugging requests
\* Backwards compatibility
\* Responses API
\* Overview
\* Responses
\* Create a response
\* Retrieve a response
\* Delete a response
\* List input items
\* Count input tokens
\* Cancel a response
\* Compact a response
\* Conversations
\* Create a conversation
\* Retrieve a conversation
\* Update a conversation
\* Delete a conversation
\* Items
\* Create an item
\* Retrieve an item
\* Delete an item
\* List items
\* Streaming events
\* Webhooks
\* Events
\* Platform APIs
\* Audio
\* Create a transcription
\* Create a translation
\* Create a speech
\* Create a voice
\* Voice Consents
\* Create a voice consent
\* Retrieve a voice consent
\* Update a voice consent
\* Delete a voice consent
\* List voice consents
\* Videos
\* Create a video
\* Create Character
\* Get Character
\* Retrieve a video
\* Delete a video
\* List videos
\* Download Content
\* Edit
\* Extend
\* Remix
\* Images
\* Generate an Image
\* Edit an Image
\* Create Variation
\* Image generation streaming events
\* Image edit streaming events
\* Embeddings
\* Create an embedding
\* Evals
\* Create an eval
\* Retrieve an eval
\* Update an eval
\* Delete an eval
\* List evals
\* Runs
\* Create a run
\* Retrieve a run
\* Delete a run
\* List runs
\* Cancel a run
\* Output Items
\* Retrieve an output item
\* List output items
\* Fine Tuning
\* Jobs
\* Create a job
\* Retrieve a job
\* List jobs
\* List Events
\* Cancel a job
\* Pause
\* Resume
\* Checkpoints
\* List checkpoints
\* Checkpoints
\* Permissions
\* Create a permission
\* Retrieve a permission
\* Delete a permission
\* List permissions
\* Alpha
\* Graders
\* Run
\* Validate
\* Batches
\* Create a batch
\* Retrieve a batch
\* List batches
\* Cancel a batch
\* Files
\* List files
\* Create a file
\* Retrieve a file
\* Delete a file
\* Retrieve file content
\* Uploads
\* Create an upload
\* Cancel an upload
\* Complete
\* Parts
\* Create a part
\* Models
\* Retrieve a model
\* Delete a model
\* List models
\* Moderations
\* Create a moderation
\* Vector Stores
\* Vector Stores
\* Create a vector store
\* Retrieve a vector store
\* Update a vector store
\* Delete a vector store
\* List vector stores
\* Search
\* Files
\* List files
\* Create a file
\* Retrieve a file
\* Update a file
\* Delete a file
\* Retrieve file content
\* File Batches
\* Create a file batch
\* Retrieve a file batch
\* List Files
\* Cancel a file batch
\* ChatKit
\* Sessions
\* Create a session
\* Cancel a session
\* Threads
\* Retrieve a thread
\* Delete a thread
\* List Items
\* List threads
\* Containers
\* Containers
\* Create a container
\* Retrieve a container
\* Delete a container
\* List containers
\* Files
\* List files
\* Create a file
\* Retrieve a file
\* Delete a file
\* Content
\* Retrieve a content
\* Skills
\* Skills
\* Create a skill
\* Retrieve a skill
\* Retrieve skill content
\* Update a skill
\* Delete a skill
\* List skills
\* Versions
\* Create skill version
\* Retrieve skill version
\* Retrieve Skill Version Content
\* Delete skill version
\* List skill versions
\* Realtime
\* Client Secrets
\* Create a client secret
\* Calls
\* Accept
\* Hangup
\* Refer
\* Reject
\* Client events
\* Server events
\* Administration
\* Overview
\* Organization
\* Audit Logs
\* Get Costs
\* List audit logs
\* Admin API Keys
\* Create an admin API key
\* Retrieve an admin API key
\* Delete an admin API key
\* List admin API keys
\* Usage
\* Get Audio Speeches
\* Get Audio Transcriptions
\* Get Code Interpreter Sessions
\* Get Completions
\* Get Embeddings
\* Get Images
\* Get Moderations
\* Get Vector Stores
\* Invites
\* Create an invite
\* Retrieve an invite
\* Delete an invite
\* List invites
\* Users
\* Retrieve an user
\* Update an user
\* Delete an user
\* List users
\* Roles
\* Create a role
\* Delete a role
\* List roles
\* Groups
\* Create a group
\* Update a group
\* Delete a group
\* List groups
\* Users
\* Create an user
\* Delete an user
\* List users
\* Roles
\* Create a role
\* Delete a role
\* List roles
\* Roles
\* Create a role
\* Update a role
\* Delete a role
\* List roles
\* Certificates
\* Create a certificate
\* Retrieve a certificate
\* Update a certificate
\* Delete a certificate
\* List certificates
\* Activate
\* Deactivate
\* Projects
\* Create a project
\* Retrieve a project
\* Update a project
\* List projects
\* Archive
\* Users
\* Create an user
\* Retrieve an user
\* Update an user
\* Delete an user
\* List users
\* Service Accounts
\* Create a service account
\* Retrieve a service account
\* Delete a service account
\* List service accounts
\* API Keys
\* Retrieve an API key
\* Delete an API key
\* List API keys
\* Rate Limits
\* Update Rate Limit
\* List Rate Limits
\* Groups
\* Create a group
\* Delete a group
\* List groups
\* Certificates
\* List certificates
\* Activate
\* Deactivate
\* Projects
\* Roles
\* Create a role
\* Update a role
\* Delete a role
\* List roles
\* Groups
\* Roles
\* Create a role
\* Delete a role
\* List roles
\* Users
\* Roles
\* Create a role
\* Delete a role
\* List roles
\* Chat Completions
\* Chat Completions
\* Overview
\* Create a chat completion
\* List chat completions
\* Streaming events
\* Legacy
\* Realtime Beta
\* Overview
\* Sessions
\* Create a session
\* Transcription Sessions
\* Create a transcription session
\* Assistants
\* Create an assistant
\* Create an assistant
\* Create And Run
\* Create an assistant
\* Create an assistant
\* Retrieve an assistant
\* Retrieve an assistant
\* Retrieve an assistant
\* Retrieve an assistant
\* Retrieve an assistant
\* Update an assistant
\* Update an assistant
\* Update an assistant
\* Update an assistant
\* Delete an assistant
\* Delete an assistant
\* Delete an assistant
\* List assistants
\* List assistants
\* List assistants
\* List assistants
\* Cancel an assistant
\* Submit Tool Outputs
\* Assistants streaming events
\* Completions
\* Create a completion
\* Completions
\* Retrieve a completion
\* Update a completion
\* Delete a completion
\* List messages
API Reference
Chat
Completions
Copy Markdown
Open in **ChatGPT**
**Copy Markdown**
**View as Markdown**

### Get chat completion

GET/chat/completions/{completion\_id}
Get a stored chat completion. Only Chat Completions that have been created with the store parameter set to true will be returned.

###### Path Parameters Expand Collapse

completion\_id: string

###### Returns Expand Collapse

ChatCompletion = object { id, choices, created, 5 more }
Represents a chat completion response returned by model, based on the provided input.
id: string
A unique identifier for the chat completion.
choices: array of object { finish\_reason, index, logprobs, message }
A list of chat completion choices. Can be more than one if n is greater than 1.
finish\_reason: "stop" or "length" or "tool\_calls" or 2 more
The reason the model stopped generating tokens. This will be stop if the model hit a natural stop point or a provided stop sequence, length if the maximum number of tokens specified in the request was reached, content\_filter if content was omitted due to a flag from our content filters, tool\_calls if the model called a tool, or function\_call (deprecated) if the model called a function.
One of the following:
"stop"
"length"
"tool\_calls"
"content\_filter"
"function\_call"
index: number
The index of the choice in the list of choices.
logprobs: object { content, refusal }
Log probability information for the choice.
content: array of ChatCompletionTokenLogprob { token, bytes, logprob, top\_logprobs }
A list of message content tokens with log probability information.
token: string
The token.
bytes: array of number
A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token.
logprob: number
The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value -9999.0 is used to signify that the token is very unlikely.
top\_logprobs: array of object { token, bytes, logprob }
List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested top\_logprobs returned.
token: string
The token.
bytes: array of number
A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token.
logprob: number
The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value -9999.0 is used to signify that the token is very unlikely.
refusal: array of ChatCompletionTokenLogprob { token, bytes, logprob, top\_logprobs }
A list of message refusal tokens with log probability information.
token: string
The token.
bytes: array of number
A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token.
logprob: number
The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value -9999.0 is used to signify that the token is very unlikely.
top\_logprobs: array of object { token, bytes, logprob }
List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested top\_logprobs returned.
token: string
The token.
bytes: array of number
A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token.
logprob: number
The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value -9999.0 is used to signify that the token is very unlikely.
message: ChatCompletionMessage { content, refusal, role, 4 more }
A chat completion message generated by the model.
content: string
The contents of the message.
refusal: string
The refusal message generated by the model.
role: "assistant"
The role of the author of this message.
annotations: optional array of object { type, url\_citation }
Annotations for the message, when applicable, as when using the web search tool.
type: "url\_citation"
The type of the URL citation. Always url\_citation .
url\_citation: object { end\_index, start\_index, title, url }
A URL citation when using web search.
end\_index: number
The index of the last character of the URL citation in the message.
start\_index: number
The index of the first character of the URL citation in the message.
title: string
The title of the web resource.
url: string
The URL of the web resource.
audio: optional ChatCompletionAudio { id, data, expires\_at, transcript }
If the audio output modality is requested, this object contains data about the audio response from the model. Learn more.
id: string
Unique identifier for this audio response.
data: string
Base64 encoded audio bytes generated by the model, in the format specified in the request.
expires\_at: number
The Unix timestamp (in seconds) for when this audio response will no longer be accessible on the server for use in multi-turn conversations.
transcript: string
Transcript of the audio generated by the model.
Deprecated function\_call: optional object { arguments, name }
Deprecated and replaced by tool\_calls . The name and arguments of a function that should be called, as generated by the model.
arguments: string
The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.
name: string
The name of the function to call.
tool\_calls: optional array of ChatCompletionMessageToolCall
The tool calls generated by the model, such as function calls.
One of the following:
ChatCompletionMessageFunctionToolCall = object { id, function, type }
A call to a function tool created by the model.
id: string
The ID of the tool call.
function: object { arguments, name }
The function that the model called.
arguments: string
The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.
name: string
The name of the function to call.
type: "function"
The type of the tool. Currently, only function is supported.
ChatCompletionMessageCustomToolCall = object { id, custom, type }
A call to a custom tool created by the model.
id: string
The ID of the tool call.
custom: object { input, name }
The custom tool that the model called.
input: string
The input for the custom tool call generated by the model.
name: string
The name of the custom tool to call.
type: "custom"
The type of the tool. Always custom .
created: number
The Unix timestamp (in seconds) of when the chat completion was created.
model: string
The model used for the chat completion.
object: "chat.completion"
The object type, which is always chat.completion .
service\_tier: optional "auto" or "default" or "flex" or 2 more
Specifies the processing type used for serving the request.
\* If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
\* If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
\* If set to ' flex' or ' priority', then the request will be processed with the corresponding service tier.
\* When not set, the default behavior is 'auto'.
When the service\_tier parameter is set, the response body will include the service\_tier value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
One of the following:
"auto"
"default"
"flex"
"scale"
"priority"
Deprecated system\_fingerprint: optional string
This fingerprint represents the backend configuration that the model runs with.
Can be used in conjunction with the seed request parameter to understand when backend changes have been made that might impact determinism.
usage: optional CompletionUsage { completion\_tokens, prompt\_tokens, total\_tokens, 2 more }
Usage statistics for the completion request.
completion\_tokens: number
Number of tokens in the generated completion.
prompt\_tokens: number
Number of tokens in the prompt.
total\_tokens: number
Total number of tokens used in the request (prompt + completion).
completion\_tokens\_details: optional object { accepted\_prediction\_tokens, audio\_tokens, reasoning\_tokens, rejected\_prediction\_tokens }
Breakdown of tokens used in a completion.
accepted\_prediction\_tokens: optional number
When using Predicted Outputs, the number of tokens in the prediction that appeared in the completion.
audio\_tokens: optional number
Audio input tokens generated by the model.
reasoning\_tokens: optional number
Tokens generated by the model for reasoning.
rejected\_prediction\_tokens: optional number
When using Predicted Outputs, the number of tokens in the prediction that did not appear in the completion. However, like reasoning tokens, these tokens are still counted in the total completion tokens for purposes of billing, output, and context window limits.
prompt\_tokens\_details: optional object { audio\_tokens, cached\_tokens }
Breakdown of tokens used in the prompt.
audio\_tokens: optional number
Audio input tokens present in the prompt.
cached\_tokens: optional number
Cached tokens present in the prompt.

##### Get chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions/chatcmpl-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

```
{
  "object": "chat.completion",
  "id": "chatcmpl-abc123",
  "model": "gpt-4o-2024-08-06",
  "created": 1738960610,
  "request_id": "req_ded8ab984ec4bf840f37566c1011c417",
  "tool_choice": null,
  "usage": {
    "total_tokens": 31,
    "completion_tokens": 18,
    "prompt_tokens": 13
  },
  "seed": 4944116822809979520,
  "top_p": 1.0,
  "temperature": 1.0,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0,
  "system_fingerprint": "fp_50cad350e4",
  "input_user": null,
  "service_tier": "default",
  "tools": null,
  "metadata": {},
  "choices": [
    {
      "index": 0,
      "message": {
        "content": "Mind of circuits hum,  \nLearning patterns in silence—  \nFuture's quiet spark.",
        "role": "assistant",
        "tool_calls": null,
        "function_call": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "response_format": null
}
```

###### Returns Examples

```
{
  "object": "chat.completion",
  "id": "chatcmpl-abc123",
  "model": "gpt-4o-2024-08-06",
  "created": 1738960610,
  "request_id": "req_ded8ab984ec4bf840f37566c1011c417",
  "tool_choice": null,
  "usage": {
    "total_tokens": 31,
    "completion_tokens": 18,
    "prompt_tokens": 13
  },
  "seed": 4944116822809979520,
  "top_p": 1.0,
  "temperature": 1.0,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0,
  "system_fingerprint": "fp_50cad350e4",
  "input_user": null,
  "service_tier": "default",
  "tools": null,
  "metadata": {},
  "choices": [
    {
      "index": 0,
      "message": {
        "content": "Mind of circuits hum,  \nLearning patterns in silence—  \nFuture's quiet spark.",
        "role": "assistant",
        "tool_calls": null,
        "function_call": null
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "response_format": null
}
```
