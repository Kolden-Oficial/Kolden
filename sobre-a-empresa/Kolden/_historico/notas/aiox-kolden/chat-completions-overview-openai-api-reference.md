---
id_fonte: "00b0cb42-446e-47b2-86c5-222b8cdac6a1"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Chat Completions Overview | OpenAI API Reference"
tipo: "unknown"
url_original: "https://developers.openai.com/api/reference/chat-completions/overview"
keywords: "('Chat Completions API', 'OpenAI API Reference', 'AI Model Optimization', 'Realtime API Usage', 'Agent Development SDK')"
summary: "This comprehensive technical reference outlines the extensive ecosystem of the **OpenAI API**, detailing the tools and endpoints available for developers to build sophisticated artificial intelligence applications. The documentation covers a vast spectrum of capabilities, ranging from **multimodal generation** involving text, audio, and video to advanced **agentic workflows** and real-time communication protocols. Central to the text is the **Chat Completions API**, which facilitates interactive dialogue by generating model responses based on conversation history. Ultimately, the source serves as a structural roadmap for **model optimization**, administrative governance, and the deployment of AI-driven products using the latest **GPT-5.4** framework and specialized developer tools."
extraido_em: "2026-06-30T16:18:43Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Chat Completions Overview | OpenAI API Reference

Chat Completions Overview | OpenAI API Reference
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
Chat Completions
Chat Completions
Overview

### Chat Completions Overview

Reference docs for Chat Completions Overview.
The Chat Completions API endpoint will generate a model response from a list of messages comprising a conversation.
Related guides:
\* Quickstart
\* Text inputs and outputs
\* Image inputs
\* Audio inputs and outputs
\* Structured Outputs
\* Function calling
\* Conversation state
**Starting a new project?** We recommend trying Responses to take advantage of the latest OpenAI platform features. Compare Chat Completions with Responses.
