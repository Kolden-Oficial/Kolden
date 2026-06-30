---
id_fonte: "4107e2de-d7ef-47c7-8ddf-6ac2a5a21f27"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Create chat completion | OpenAI API Reference"
tipo: "unknown"
url_original: "https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create"
keywords: "('Chat completion API', 'Model parameters', 'Tool calling', 'Token usage statistics', 'Multi-modal inputs')"
summary: "This technical documentation outlines the **Chat Completions API**, a primary interface used to generate responses from OpenAI’s various language models through structured data exchanges. Developers provide a **list of messages** featuring specific roles—such as developer, system, user, or assistant—to simulate a conversation and receive a generated response. Beyond simple text, the source details advanced capabilities like **multimodal inputs** for images and audio, as well as **tool calling** and web search integrations that extend the model’s utility. Additionally, the text serves as a comprehensive reference for **fine-tuning parameters**, including constraints for reasoning effort, output formatting via JSON schemas, and token usage management to control costs and performance."
extraido_em: "2026-06-30T16:19:21Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Create chat completion | OpenAI API Reference

Create chat completion | OpenAI API Reference
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

### Create chat completion

POST/chat/completions
**Starting a new project?** We recommend trying Responses to take advantage of the latest OpenAI platform features. Compare Chat Completions with Responses.
Creates a model response for the given chat conversation. Learn more in the text generation, vision, and audio guides.
Parameter support can differ depending on the model used to generate the response, particularly for newer reasoning models. Parameters that are only supported for reasoning models are noted below. For the current state of unsupported parameters in reasoning models, refer to the reasoning guide.
Returns a chat completion object, or a streamed sequence of chat completion chunk objects if the request is streamed.

###### Body Parameters JSON Expand Collapse

messages: array of ChatCompletionMessageParam
A list of messages comprising the conversation so far. Depending on the model you use, different message types (modalities) are supported, like text, images, and audio.
One of the following:
ChatCompletionDeveloperMessageParam = object { content, role, name }
Developer-provided instructions that the model should follow, regardless of messages sent by the user. With o1 models and newer, developer messages replace the previous system messages.
content: string or array of ChatCompletionContentPartText { text, type }
The contents of the developer message.
One of the following:
TextContent = string
The contents of the developer message.
ArrayOfContentParts = array of ChatCompletionContentPartText { text, type }
An array of content parts with a defined type. For developer messages, only type text is supported.
text: string
The text content.
type: "text"
The type of the content part.
role: "developer"
The role of the messages author, in this case developer .
name: optional string
An optional name for the participant. Provides the model information to differentiate between participants of the same role.
ChatCompletionSystemMessageParam = object { content, role, name }
Developer-provided instructions that the model should follow, regardless of messages sent by the user. With o1 models and newer, use developer messages for this purpose instead.
content: string or array of ChatCompletionContentPartText { text, type }
The contents of the system message.
One of the following:
TextContent = string
The contents of the system message.
ArrayOfContentParts = array of ChatCompletionContentPartText { text, type }
An array of content parts with a defined type. For system messages, only type text is supported.
text: string
The text content.
type: "text"
The type of the content part.
role: "system"
The role of the messages author, in this case system .
name: optional string
An optional name for the participant. Provides the model information to differentiate between participants of the same role.
ChatCompletionUserMessageParam = object { content, role, name }
Messages sent by an end user, containing prompts or additional context information.
content: string or array of ChatCompletionContentPart
The contents of the user message.
One of the following:
TextContent = string
The text contents of the message.
ArrayOfContentParts = array of ChatCompletionContentPart
An array of content parts with a defined type. Supported options differ based on the model being used to generate the response. Can contain text, image, or audio inputs.
One of the following:
ChatCompletionContentPartText = object { text, type }
Learn about text inputs.
text: string
The text content.
type: "text"
The type of the content part.
ChatCompletionContentPartImage = object { image\_url, type }
Learn about image inputs.
image\_url: object { url, detail }
url: string
Either a URL of the image or the base64 encoded image data.
format uri
detail: optional "auto" or "low" or "high"
Specifies the detail level of the image. Learn more in the Vision guide.
One of the following:
"auto"
"low"
"high"
type: "image\_url"
The type of the content part.
ChatCompletionContentPartInputAudio = object { input\_audio, type }
Learn about audio inputs.
input\_audio: object { data, format }
data: string
Base64 encoded audio data.
format: "wav" or "mp3"
The format of the encoded audio data. Currently supports "wav" and "mp3".
One of the following:
"wav"
"mp3"
type: "input\_audio"
The type of the content part. Always input\_audio .
FileContentPart = object { file, type }
Learn about file inputs for text generation.
file: object { file\_data, file\_id, filename }
file\_data: optional string
The base64 encoded file data, used when passing the file to the model as a string.
file\_id: optional string
The ID of an uploaded file to use as input.
filename: optional string
The name of the file, used when passing the file to the model as a string.
type: "file"
The type of the content part. Always file .
role: "user"
The role of the messages author, in this case user .
name: optional string
An optional name for the participant. Provides the model information to differentiate between participants of the same role.
ChatCompletionAssistantMessageParam = object { role, audio, content, 4 more }
Messages sent by the model in response to user messages.
role: "assistant"
The role of the messages author, in this case assistant .
audio: optional object { id }
Data about a previous audio response from the model. Learn more.
id: string
Unique identifier for a previous audio response from the model.
content: optional string or array of ChatCompletionContentPartText { text, type } or ChatCompletionContentPartRefusal { refusal, type }
The contents of the assistant message. Required unless tool\_calls or function\_call is specified.
One of the following:
TextContent = string
The contents of the assistant message.
ArrayOfContentParts = array of ChatCompletionContentPartText { text, type } or ChatCompletionContentPartRefusal { refusal, type }
An array of content parts with a defined type. Can be one or more of type text , or exactly one of type refusal .
One of the following:
ChatCompletionContentPartText = object { text, type }
Learn about text inputs.
text: string
The text content.
type: "text"
The type of the content part.
ChatCompletionContentPartRefusal = object { refusal, type }
refusal: string
The refusal message generated by the model.
type: "refusal"
The type of the content part.
Deprecated function\_call: optional object { arguments, name }
Deprecated and replaced by tool\_calls . The name and arguments of a function that should be called, as generated by the model.
arguments: string
The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.
name: string
The name of the function to call.
name: optional string
An optional name for the participant. Provides the model information to differentiate between participants of the same role.
refusal: optional string
The refusal message by the assistant.
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
ChatCompletionToolMessageParam = object { content, role, tool\_call\_id }
content: string or array of ChatCompletionContentPartText { text, type }
The contents of the tool message.
One of the following:
TextContent = string
The contents of the tool message.
ArrayOfContentParts = array of ChatCompletionContentPartText { text, type }
An array of content parts with a defined type. For tool messages, only type text is supported.
text: string
The text content.
type: "text"
The type of the content part.
role: "tool"
The role of the messages author, in this case tool .
tool\_call\_id: string
Tool call that this message is responding to.
ChatCompletionFunctionMessageParam = object { content, name, role }
content: string
The contents of the function message.
name: string
The name of the function to call.
role: "function"
The role of the messages author, in this case function .
model: string or "gpt-5.4" or "gpt-5.4-mini" or "gpt-5.4-nano" or 75 more
Model ID used to generate the response, like gpt-4o or o3 . OpenAI offers a wide range of models with different capabilities, performance characteristics, and price points. Refer to the model guide to browse and compare available models.
One of the following:
string
"gpt-5.4" or "gpt-5.4-mini" or "gpt-5.4-nano" or 75 more
Model ID used to generate the response, like gpt-4o or o3 . OpenAI offers a wide range of models with different capabilities, performance characteristics, and price points. Refer to the model guide to browse and compare available models.
One of the following:
"gpt-5.4"
"gpt-5.4-mini"
"gpt-5.4-nano"
"gpt-5.4-mini-2026-03-17"
"gpt-5.4-nano-2026-03-17"
"gpt-5.3-chat-latest"
"gpt-5.2"
"gpt-5.2-2025-12-11"
"gpt-5.2-chat-latest"
"gpt-5.2-pro"
"gpt-5.2-pro-2025-12-11"
"gpt-5.1"
"gpt-5.1-2025-11-13"
"gpt-5.1-codex"
"gpt-5.1-mini"
"gpt-5.1-chat-latest"
"gpt-5"
"gpt-5-mini"
"gpt-5-nano"
"gpt-5-2025-08-07"
"gpt-5-mini-2025-08-07"
"gpt-5-nano-2025-08-07"
"gpt-5-chat-latest"
"gpt-4.1"
"gpt-4.1-mini"
"gpt-4.1-nano"
"gpt-4.1-2025-04-14"
"gpt-4.1-mini-2025-04-14"
"gpt-4.1-nano-2025-04-14"
"o4-mini"
"o4-mini-2025-04-16"
"o3"
"o3-2025-04-16"
"o3-mini"
"o3-mini-2025-01-31"
"o1"
"o1-2024-12-17"
"o1-preview"
"o1-preview-2024-09-12"
"o1-mini"
"o1-mini-2024-09-12"
"gpt-4o"
"gpt-4o-2024-11-20"
"gpt-4o-2024-08-06"
"gpt-4o-2024-05-13"
"gpt-4o-audio-preview"
"gpt-4o-audio-preview-2024-10-01"
"gpt-4o-audio-preview-2024-12-17"
"gpt-4o-audio-preview-2025-06-03"
"gpt-4o-mini-audio-preview"
"gpt-4o-mini-audio-preview-2024-12-17"
"gpt-4o-search-preview"
"gpt-4o-mini-search-preview"
"gpt-4o-search-preview-2025-03-11"
"gpt-4o-mini-search-preview-2025-03-11"
"chatgpt-4o-latest"
"codex-mini-latest"
"gpt-4o-mini"
"gpt-4o-mini-2024-07-18"
"gpt-4-turbo"
"gpt-4-turbo-2024-04-09"
"gpt-4-0125-preview"
"gpt-4-turbo-preview"
"gpt-4-1106-preview"
"gpt-4-vision-preview"
"gpt-4"
"gpt-4-0314"
"gpt-4-0613"
"gpt-4-32k"
"gpt-4-32k-0314"
"gpt-4-32k-0613"
"gpt-3.5-turbo"
"gpt-3.5-turbo-16k"
"gpt-3.5-turbo-0301"
"gpt-3.5-turbo-0613"
"gpt-3.5-turbo-1106"
"gpt-3.5-turbo-0125"
"gpt-3.5-turbo-16k-0613"
audio: optional ChatCompletionAudioParam { format, voice }
Parameters for audio output. Required when audio output is requested with modalities: ["audio"] . Learn more.
format: "wav" or "aac" or "mp3" or 3 more
Specifies the output audio format. Must be one of wav , mp3 , flac , opus , or pcm16 .
One of the following:
"wav"
"aac"
"mp3"
"flac"
"opus"
"pcm16"
voice: string or "alloy" or "ash" or "ballad" or 7 more or object { id }
The voice the model uses to respond. Supported built-in voices are alloy , ash , ballad , coral , echo , fable , nova , onyx , sage , shimmer , marin , and cedar . You may also provide a custom voice object with an id , for example { "id": "voice\_1234" } .
One of the following:
string
"alloy" or "ash" or "ballad" or 7 more
One of the following:
"alloy"
"ash"
"ballad"
"coral"
"echo"
"sage"
"shimmer"
"verse"
"marin"
"cedar"
ID = object { id }
Custom voice reference.
id: string
The custom voice ID, e.g. voice\_1234 .
frequency\_penalty: optional number
Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
minimum-2
maximum 2
Deprecated function\_call: optional "none" or "auto" or ChatCompletionFunctionCallOption { name }
Deprecated in favor of tool\_choice .
Controls which (if any) function is called by the model. none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function.
Specifying a particular function via {"name": "my\_function"} forces the model to call that function. none is the default when no functions are present. auto is the default if functions are present.
One of the following:
"none" or "auto" none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function.
One of the following:
"none"
"auto"
ChatCompletionFunctionCallOption = object { name }
Specifying a particular function via {"name": "my\_function"} forces the model to call that function.
name: string
The name of the function to call.
Deprecated functions: optional array of object { name, description, parameters }
Deprecated in favor of tools .
A list of functions the model may generate JSON inputs for.
name: string
The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
description: optional string
A description of what the function does, used by the model to choose when and how to call the function.
parameters: optional FunctionParameters
The parameters the functions accepts, described as a JSON Schema object. See the guide for examples, and the JSON Schema reference for documentation about the format.
Omitting parameters defines a function with an empty parameter list.
logit\_bias: optional map[ number]
Modify the likelihood of specified tokens appearing in the completion.
Accepts a JSON object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
logprobs: optional boolean
Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message .
max\_completion\_tokens: optional number
An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.
Deprecated max\_tokens: optional number
The maximum number of tokens that can be generated in the chat completion. This value can be used to control costs for text generated via API.
This value is now deprecated in favor of max\_completion\_tokens , and is not compatible with o-series models.
metadata: optional Metadata
Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.
Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.
modalities: optional array of "text" or "audio"
Output types that you would like the model to generate. Most models are capable of generating text, which is the default: ["text"]
The gpt-4o-audio-preview model can also be used to generate audio. To request that this model generate both text and audio responses, you can use: ["text", "audio"]
One of the following:
"text"
"audio"
n: optional number
How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.
minimum 1
maximum 128
parallel\_tool\_calls: optional boolean
Whether to enable parallel function calling during tool use.
prediction: optional ChatCompletionPredictionContent { content, type }
Static predicted output content, such as the content of a text file that is being regenerated.
content: string or array of ChatCompletionContentPartText { text, type }
The content that should be matched when generating a model response. If generated tokens would match this content, the entire model response can be returned much more quickly.
One of the following:
TextContent = string
The content used for a Predicted Output. This is often the text of a file you are regenerating with minor changes.
ArrayOfContentParts = array of ChatCompletionContentPartText { text, type }
An array of content parts with a defined type. Supported options differ based on the model being used to generate the response. Can contain text inputs.
text: string
The text content.
type: "text"
The type of the content part.
type: "content"
The type of the predicted content you want to provide. This type is currently always content .
presence\_penalty: optional number
Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
minimum-2
maximum 2
prompt\_cache\_key: optional string
Used by OpenAI to cache responses for similar requests to optimize your cache hit rates. Replaces the user field. Learn more.
prompt\_cache\_retention: optional "in-memory" or "24h"
The retention policy for the prompt cache. Set to 24h to enable extended prompt caching, which keeps cached prefixes active for longer, up to a maximum of 24 hours. Learn more.
One of the following:
"in-memory"
"24h"
reasoning\_effort: optional ReasoningEffort
Constrains effort on reasoning for reasoning models. Currently supported values are none , minimal , low , medium , high , and xhigh . Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.
\* gpt-5.1 defaults to none , which does not perform reasoning. The supported reasoning values for gpt-5.1 are none , low , medium , and high . Tool calls are supported for all reasoning values in gpt-5.1.
\* All models before gpt-5.1 default to medium reasoning effort, and do not support none .
\* The gpt-5-pro model defaults to (and only supports) high reasoning effort.
\* xhigh is supported for all models after gpt-5.1-codex-max .
One of the following:
"none"
"minimal"
"low"
"medium"
"high"
"xhigh"
response\_format: optional ResponseFormatText { type } or ResponseFormatJSONSchema { json\_schema, type } or ResponseFormatJSONObject { type }
An object specifying the format that the model must output.
Setting to { "type": "json\_schema", "json\_schema": {...} } enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the Structured Outputs guide.
Setting to { "type": "json\_object" } enables the older JSON mode, which ensures the message the model generates is valid JSON. Using json\_schema is preferred for models that support it.
One of the following:
ResponseFormatText = object { type }
Default response format. Used to generate text responses.
type: "text"
The type of response format being defined. Always text .
ResponseFormatJSONSchema = object { json\_schema, type }
JSON Schema response format. Used to generate structured JSON responses. Learn more about Structured Outputs.
json\_schema: object { name, description, schema, strict }
Structured Outputs configuration options, including a JSON Schema.
name: string
The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
description: optional string
A description of what the response format is for, used by the model to determine how to respond in the format.
schema: optional map[ unknown]
The schema for the response format, described as a JSON Schema object. Learn how to build JSON schemas here.
strict: optional boolean
Whether to enable strict schema adherence when generating the output. If set to true, the model will always follow the exact schema defined in the schema field. Only a subset of JSON Schema is supported when strict is true . To learn more, read the Structured Outputs guide.
type: "json\_schema"
The type of response format being defined. Always json\_schema .
ResponseFormatJSONObject = object { type }
JSON object response format. An older method of generating JSON responses. Using json\_schema is recommended for models that support it. Note that the model will not generate JSON without a system or user message instructing it to do so.
type: "json\_object"
The type of response format being defined. Always json\_object .
safety\_identifier: optional string
A stable identifier used to help detect users of your application that may be violating OpenAI's usage policies. The IDs should be a string that uniquely identifies each user, with a maximum length of 64 characters. We recommend hashing their username or email address, in order to avoid sending us any identifying information. Learn more.
maxLength 64
Deprecated seed: optional number
This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system\_fingerprint response parameter to monitor changes in the backend.
minimum-9223372036854776000
maximum 9223372036854776000
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
stop: optional string or array of string
Not supported with latest reasoning models o3 and o4-mini .
Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
One of the following:
string
array of string
store: optional boolean
Whether or not to store the output of this chat completion request for use in our model distillation or evals products.
Supports text and image inputs. Note: image inputs over 8MB will be dropped.
stream: optional boolean
If set to true, the model response data will be streamed to the client as it is generated using server-sent events. See the Streaming section below for more information, along with the streaming responses guide for more information on how to handle the streaming events.
stream\_options: optional ChatCompletionStreamOptions { include\_obfuscation, include\_usage }
Options for streaming response. Only set this when you set stream: true .
include\_obfuscation: optional boolean
When true, stream obfuscation will be enabled. Stream obfuscation adds random characters to an obfuscation field on streaming delta events to normalize payload sizes as a mitigation to certain side-channel attacks. These obfuscation fields are included by default, but add a small amount of overhead to the data stream. You can set include\_obfuscation to false to optimize for bandwidth if you trust the network links between your application and the OpenAI API.
include\_usage: optional boolean
If set, an additional chunk will be streamed before the data: [DONE] message. The usage field on this chunk shows the token usage statistics for the entire request, and the choices field will always be an empty array.
All other chunks will also include a usage field, but with a null value. **NOTE:** If the stream is interrupted, you may not receive the final usage chunk which contains the total token usage for the request.
temperature: optional number
What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top\_p but not both.
minimum 0
maximum 2
tool\_choice: optional ChatCompletionToolChoiceOption
Controls which (if any) tool is called by the model. none means the model will not call any tool and instead generates a message. auto means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools. Specifying a particular tool via {"type": "function", "function": {"name": "my\_function"}} forces the model to call that tool. none is the default when no tools are present. auto is the default if tools are present.
One of the following:
ToolChoiceMode = "none" or "auto" or "required" none means the model will not call any tool and instead generates a message. auto means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools.
One of the following:
"none"
"auto"
"required"
ChatCompletionAllowedToolChoice = object { allowed\_tools, type }
Constrains the tools available to the model to a pre-defined set.
allowed\_tools: ChatCompletionAllowedTools { mode, tools }
Constrains the tools available to the model to a pre-defined set.
mode: "auto" or "required"
Constrains the tools available to the model to a pre-defined set. auto allows the model to pick from among the allowed tools and generate a message. required requires the model to call one or more of the allowed tools.
One of the following:
"auto"
"required"
tools: array of map[ unknown]
A list of tool definitions that the model should be allowed to call.
For the Chat Completions API, the list of tool definitions might look like:

```
[
  { "type": "function", "function": { "name": "get_weather" } },
  { "type": "function", "function": { "name": "get_time" } }
]
```

type: "allowed\_tools"
Allowed tool configuration type. Always allowed\_tools .
ChatCompletionNamedToolChoice = object { function, type }
Specifies a tool the model should use. Use to force the model to call a specific function.
function: object { name }
name: string
The name of the function to call.
type: "function"
For function calling, the type is always function .
ChatCompletionNamedToolChoiceCustom = object { custom, type }
Specifies a tool the model should use. Use to force the model to call a specific custom tool.
custom: object { name }
name: string
The name of the custom tool to call.
type: "custom"
For custom tool calling, the type is always custom .
tools: optional array of ChatCompletionTool
A list of tools the model may call. You can provide either custom tools or function tools.
One of the following:
ChatCompletionFunctionTool = object { function, type }
A function tool that can be used to generate a response.
function: FunctionDefinition { name, description, parameters, strict }
name: string
The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
description: optional string
A description of what the function does, used by the model to choose when and how to call the function.
parameters: optional FunctionParameters
The parameters the functions accepts, described as a JSON Schema object. See the guide for examples, and the JSON Schema reference for documentation about the format.
Omitting parameters defines a function with an empty parameter list.
strict: optional boolean
Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the parameters field. Only a subset of JSON Schema is supported when strict is true . Learn more about Structured Outputs in the function calling guide.
type: "function"
The type of the tool. Currently, only function is supported.
ChatCompletionCustomTool = object { custom, type }
A custom tool that processes input using a specified format.
custom: object { name, description, format }
Properties of the custom tool.
name: string
The name of the custom tool, used to identify it in tool calls.
description: optional string
Optional description of the custom tool, used to provide more context.
format: optional object { type } or object { grammar, type }
The input format for the custom tool. Default is unconstrained text.
One of the following:
TextFormat = object { type }
Unconstrained free-form text.
type: "text"
Unconstrained text format. Always text .
GrammarFormat = object { grammar, type }
A grammar defined by the user.
grammar: object { definition, syntax }
Your chosen grammar.
definition: string
The grammar definition.
syntax: "lark" or "regex"
The syntax of the grammar definition. One of lark or regex .
One of the following:
"lark"
"regex"
type: "grammar"
Grammar format. Always grammar .
type: "custom"
The type of the custom tool. Always custom .
top\_logprobs: optional number
An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.
minimum 0
maximum 20
top\_p: optional number
An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top\_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
We generally recommend altering this or temperature but not both.
minimum 0
maximum 1
Deprecated user: optional string
This field is being replaced by safety\_identifier and prompt\_cache\_key . Use prompt\_cache\_key instead to maintain caching optimizations. A stable identifier for your end-users. Used to boost cache hit rates by better bucketing similar requests and to help OpenAI detect and prevent abuse. Learn more.
verbosity: optional "low" or "medium" or "high"
Constrains the verbosity of the model's response. Lower values will result in more concise responses, while higher values will result in more verbose responses. Currently supported values are low , medium , and high .
One of the following:
"low"
"medium"
"high"
web\_search\_options: optional object { search\_context\_size, user\_location }
This tool searches the web for relevant results to use in a response. Learn more about the web search tool.
search\_context\_size: optional "low" or "medium" or "high"
High level guidance for the amount of context window space to use for the search. One of low , medium , or high . medium is the default.
One of the following:
"low"
"medium"
"high"
user\_location: optional object { approximate, type }
Approximate location parameters for the search.
approximate: object { city, country, region, timezone }
Approximate location parameters for the search.
city: optional string
Free text input for the city of the user, e.g. San Francisco .
country: optional string
The two-letter ISO country code of the user, e.g. US .
region: optional string
Free text input for the region of the user, e.g. California .
timezone: optional string
The IANA timezone of the user, e.g. America/Los\_Angeles .
type: "approximate"
The type of location approximation. Always approximate .

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
Cached tokens present in the prompt. [x] 0
Default [-] 1 Image input [-] 2 Streaming [-] 3 Functions [-] 4 Logprobs

##### Create chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "VAR_chat_model_id",
    "messages": [
      {
        "role": "developer",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```

```
{
  "id": "chatcmpl-B9MBs8CjcvOU2jLn4n570S5qMJKcT",
  "object": "chat.completion",
  "created": 1741569952,
  "model": "gpt-5.4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?",
        "refusal": null,
        "annotations": []
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 10,
    "total_tokens": 29,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default"
}
```

##### Create chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.4",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What is in this image?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  }'
```

```
{
  "id": "chatcmpl-B9MHDbslfkBeAs8l4bebGdFOJ6PeG",
  "object": "chat.completion",
  "created": 1741570283,
  "model": "gpt-5.4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The image shows a wooden boardwalk path running through a lush green field or meadow. The sky is bright blue with some scattered clouds, giving the scene a serene and peaceful atmosphere. Trees and shrubs are visible in the background.",
        "refusal": null,
        "annotations": []
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 1117,
    "completion_tokens": 46,
    "total_tokens": 1163,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default"
}
```

##### Create chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "VAR_chat_model_id",
    "messages": [
      {
        "role": "developer",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ],
    "stream": true
  }'
```

```
{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-4o-mini", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"role":"assistant","content":""},"logprobs":null,"finish_reason":null}]}

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-4o-mini", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"content":"Hello"},"logprobs":null,"finish_reason":null}]}

....

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-4o-mini", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{},"logprobs":null,"finish_reason":"stop"}]}
```

##### Create chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather like in Boston today?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}'
```

```
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1699896916,
  "model": "gpt-4o-mini",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_current_weather",
              "arguments": "{\n\"location\": \"Boston, MA\"\n}"
            }
          }
        ]
      },
      "logprobs": null,
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 82,
    "completion_tokens": 17,
    "total_tokens": 99,
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  }
}
```

##### Create chat completion

HTTP
HTTP
TypeScript
Python
Java
Go
Ruby

```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "VAR_chat_model_id",
    "messages": [
      {
        "role": "user",
        "content": "Hello!"
      }
    ],
    "logprobs": true,
    "top_logprobs": 2
  }'
```

```
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1702685778,
  "model": "gpt-4o-mini",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
      },
      "logprobs": {
        "content": [
          {
            "token": "Hello",
            "logprob": -0.31725305,
            "bytes": [72, 101, 108, 108, 111],
            "top_logprobs": [
              {
                "token": "Hello",
                "logprob": -0.31725305,
                "bytes": [72, 101, 108, 108, 111]
              },
              {
                "token": "Hi",
                "logprob": -1.3190403,
                "bytes": [72, 105]
              }
            ]
          },
          {
            "token": "!",
            "logprob": -0.02380986,
            "bytes": [
              33
            ],
            "top_logprobs": [
              {
                "token": "!",
                "logprob": -0.02380986,
                "bytes": [33]
              },
              {
                "token": " there",
                "logprob": -3.787621,
                "bytes": [32, 116, 104, 101, 114, 101]
              }
            ]
          },
          {
            "token": " How",
            "logprob": -0.000054669687,
            "bytes": [32, 72, 111, 119],
            "top_logprobs": [
              {
                "token": " How",
                "logprob": -0.000054669687,
                "bytes": [32, 72, 111, 119]
              },
              {
                "token": "<|end|>",
                "logprob": -10.953937,
                "bytes": null
              }
            ]
          },
          {
            "token": " can",
            "logprob": -0.015801601,
            "bytes": [32, 99, 97, 110],
            "top_logprobs": [
              {
                "token": " can",
                "logprob": -0.015801601,
                "bytes": [32, 99, 97, 110]
              },
              {
                "token": " may",
                "logprob": -4.161023,
                "bytes": [32, 109, 97, 121]
              }
            ]
          },
          {
            "token": " I",
            "logprob": -3.7697225e-6,
            "bytes": [
              32,
              73
            ],
            "top_logprobs": [
              {
                "token": " I",
                "logprob": -3.7697225e-6,
                "bytes": [32, 73]
              },
              {
                "token": " assist",
                "logprob": -13.596657,
                "bytes": [32, 97, 115, 115, 105, 115, 116]
              }
            ]
          },
          {
            "token": " assist",
            "logprob": -0.04571125,
            "bytes": [32, 97, 115, 115, 105, 115, 116],
            "top_logprobs": [
              {
                "token": " assist",
                "logprob": -0.04571125,
                "bytes": [32, 97, 115, 115, 105, 115, 116]
              },
              {
                "token": " help",
                "logprob": -3.1089056,
                "bytes": [32, 104, 101, 108, 112]
              }
            ]
          },
          {
            "token": " you",
            "logprob": -5.4385737e-6,
            "bytes": [32, 121, 111, 117],
            "top_logprobs": [
              {
                "token": " you",
                "logprob": -5.4385737e-6,
                "bytes": [32, 121, 111, 117]
              },
              {
                "token": " today",
                "logprob": -12.807695,
                "bytes": [32, 116, 111, 100, 97, 121]
              }
            ]
          },
          {
            "token": " today",
            "logprob": -0.0040071653,
            "bytes": [32, 116, 111, 100, 97, 121],
            "top_logprobs": [
              {
                "token": " today",
                "logprob": -0.0040071653,
                "bytes": [32, 116, 111, 100, 97, 121]
              },
              {
                "token": "?",
                "logprob": -5.5247097,
                "bytes": [63]
              }
            ]
          },
          {
            "token": "?",
            "logprob": -0.0008108172,
            "bytes": [63],
            "top_logprobs": [
              {
                "token": "?",
                "logprob": -0.0008108172,
                "bytes": [63]
              },
              {
                "token": "?\n",
                "logprob": -7.184561,
                "bytes": [63, 10]
              }
            ]
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 9,
    "total_tokens": 18,
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "system_fingerprint": null
}
```

###### Returns Examples

```
{
  "id": "chatcmpl-B9MBs8CjcvOU2jLn4n570S5qMJKcT",
  "object": "chat.completion",
  "created": 1741569952,
  "model": "gpt-5.4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?",
        "refusal": null,
        "annotations": []
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 19,
    "completion_tokens": 10,
    "total_tokens": 29,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default"
}
```
