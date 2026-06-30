---
id_fonte: "961ef735-295a-4f87-9116-ae5de8b5299c"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Audio and speech | OpenAI API"
tipo: "unknown"
url_original: "https://developers.openai.com/api/docs/guides/audio"
keywords: "('Audio and speech', 'Realtime API', 'Voice agents', 'Speech to text', 'Model optimization')"
summary: "This documentation provides a comprehensive roadmap for integrating **audio and speech capabilities** into applications using OpenAI’s suite of models. It distinguishes between **general-purpose APIs** like the Realtime and Chat Completions interfaces, which offer native multimodal understanding, and **specialized endpoints** dedicated solely to transcription or speech generation. Developers can choose between **speech-to-speech models** for natural, low-latency interactions and a **chained approach** that combines separate tools for maximum control over the final script. Ultimately, the text serves as a technical guide to help builders select the right tools for creating **voice agents**, processing **streaming audio**, or converting between text and spoken word."
extraido_em: "2026-06-30T16:18:29Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Audio and speech | OpenAI API

Audio and speech | OpenAI API
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
*  Build with audio
*  A tour of audio use cases
*  Choosing the right API
*  Add audio to your existing application
```

Copy Page More page actions
Copy Page More page actions

### Audio and speech

Explore audio and speech features in the OpenAI API.
The OpenAI API provides a range of audio capabilities. If you know what you want to build, find your use case below to get started. If you're not sure where to start, read this page as an overview.

#### Build with audio

Build voice agents Build interactive voice-driven applications.
Transcribe audio Convert speech to text instantly and accurately.
Speak text Turn text into natural-sounding speech in real time.

#### A tour of audio use cases

LLMs can process audio by using sound as input, creating sound as output, or both. OpenAI has several API endpoints that help you build audio applications or voice agents.

##### Voice agents

Voice agents understand audio to handle tasks and respond back in natural language. There are two main ways to approach voice agents: either with speech-to-speech models and the Realtime API, or by chaining together a speech-to-text model, a text language model to process the request, and a text-to-speech model to respond. Speech-to-speech is lower latency and more natural, but chaining together a voice agent is a reliable way to extend a text-based agent into a voice agent. If you are already using the Agents SDK, you can extend your existing agents with voice capabilities using the chained approach.

##### Streaming audio

Process audio in real time to build voice agents and other low-latency applications, including transcription use cases. You can stream audio in and out of a model with the Realtime API. Our advanced speech models provide automatic speech recognition for improved accuracy, low-latency interactions, and multilingual support.

##### Text to speech

For turning text into speech, use the Audio API audio/speech endpoint. Models compatible with this endpoint are gpt-4o-mini-tts , tts-1 , and tts-1-hd . With gpt-4o-mini-tts , you can ask the model to speak a certain way or with a certain tone of voice.

##### Speech to text

For speech to text, use the Audio API audio/transcriptions endpoint. Models compatible with this endpoint are gpt-4o-transcribe , gpt-4o-mini-transcribe , whisper-1 , and gpt-4o-transcribe-diarize . gpt-4o-transcribe-diarize adds speaker labels and timestamps for HTTP requests and is intended for non-latency-sensitive workloads, while the other models focus on transcription only. With streaming, you can continuously pass in audio and get a continuous stream of text back.

#### Choosing the right API

There are multiple APIs for transcribing or generating audio:
| API | Supported modalities | Streaming support |
| ------ | ------ | ------ |
| Realtime API | Audio and text inputs and outputs | Audio streaming in, audio and text streaming out |
| Chat Completions API | Audio and text inputs and outputs | Audio and text streaming out |
| Transcription API | Audio inputs | Text streaming out |
| Speech API | Text inputs and audio outputs | Audio streaming out |

##### General use APIs vs. specialized APIs

The main distinction is general use APIs vs. specialized APIs. With the Realtime and Chat Completions APIs, you can use our latest models' native audio understanding and generation capabilities and combine them with other features like function calling. These APIs can be used for a wide range of use cases, and you can select the model you want to use.
On the other hand, the Transcription, Translation and Speech APIs are specialized to work with specific models and only meant for one purpose.

##### Talking with a model vs. controlling the script

Another way to select the right API is asking yourself how much control you need. To design conversational interactions, where the model thinks and responds in speech, use the Realtime or Chat Completions API, depending if you need low-latency or not.
You won't know exactly what the model will say ahead of time, as it will generate audio responses directly, but the conversation will feel natural.
For more control and predictability, you can use the Speech-to-text / LLM / Text-to-speech pattern, so you know exactly what the model will say and can control the response. Please note that with this method, there will be added latency.
This is what the Audio APIs are for: pair an LLM with the audio/transcriptions and audio/speech endpoints to take spoken user input, process and generate a text response, and then convert that to speech that the user can hear.

##### Recommendations

```
*  If you need real-time interactions or transcription, use the Realtime API.
*  If realtime is not a requirement but you're looking to build a voice agent or an audio-based application that requires features such as function calling, use the Chat Completions API.
*  For use cases with one specific purpose, use the Transcription, Translation, or Speech APIs.
```

#### Add audio to your existing application

Models such as gpt-realtime and gpt-audio are natively multimodal, meaning they can understand and generate multiple modalities as input and output.
If you already have a text-based LLM application with the Chat Completions endpoint, you may want to add audio capabilities. For example, if your chat application supports text input, you can add audio input and output—just include audio in the modalities array and use an audio model, like gpt-audio .
Audio is not yet supported in the Responses API.
Audio output from model Audio input to model
Audio output from model
Create a human-like audio response to a prompt
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
26
27
28
import { writeFileSync } from "node:fs";
import OpenAI from "openai";

const openai = new OpenAI();

// Generate an audio response to the given prompt
const response = await openai.chat.completions.create({
  model: "gpt-audio",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [
    {
      role: "user",
      content: "Is a golden retriever a good family dog?"
    }
  ],
  store: true,
});

// Inspect returned data
console.log(response.choices[0]);

// Write audio data to a file
writeFileSync(
  "dog.wav",
  Buffer.from(response.choices[0].message.audio.data, 'base64'),
  { encoding: "utf-8" }
);
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
import base64
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-audio",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "wav"},
    messages=[
        {
            "role": "user",
            "content": "Is a golden retriever a good family dog?"
        }
    ]
)

print(completion.choices[0])

wav_bytes = base64.b64decode(completion.choices[0].message.audio.data)
with open("dog.wav", "wb") as f:
    f.write(wav_bytes)
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
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-audio",
      "modalities": ["text", "audio"],
      "audio": { "voice": "alloy", "format": "wav" },
      "messages": [
        {
          "role": "user",
          "content": "Is a golden retriever a good family dog?"
        }
      ]
    }'
```

Audio input to model
Use audio inputs for prompting a model
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
26
import OpenAI from "openai";
const openai = new OpenAI();

// Fetch an audio file and convert it to a base64 string
const url = "https://cdn.openai.com/API/docs/audio/alloy.wav";
const audioResponse = await fetch(url);
const buffer = await audioResponse.arrayBuffer();
const base64str = Buffer.from(buffer).toString("base64");

const response = await openai.chat.completions.create({
  model: "gpt-audio",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this recording?" },
        { type: "input_audio", input_audio: { data: base64str, format: "wav" }}
      ]
    }
  ],
  store: true,
});

console.log(response.choices[0]);
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
26
27
28
29
30
31
32
33
34
35
36
37
38
import base64
import requests
from openai import OpenAI

client = OpenAI()

# Fetch the audio file and convert it to a base64 encoded string
url = "https://cdn.openai.com/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content
encoded_string = base64.b64encode(wav_data).decode('utf-8')

completion = client.chat.completions.create(
    model="gpt-audio",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "wav"},
    messages=[
        {
            "role": "user",
            "content": [
                { 
                    "type": "text",
                    "text": "What is in this recording?"
                },
                {
                    "type": "input_audio",
                    "input_audio": {
                        "data": encoded_string,
                        "format": "wav"
                    }
                }
            ]
        },
    ]
)

print(completion.choices[0].message)
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
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-audio",
      "modalities": ["text", "audio"],
      "audio": { "voice": "alloy", "format": "wav" },
      "messages": [
        {
          "role": "user",
          "content": [
            { "type": "text", "text": "What is in this recording?" },
            { 
              "type": "input_audio", 
              "input_audio": { 
                "data": "<base64 bytes here>", 
                "format": "wav" 
              }
            }
          ]
        }
      ]
    }'
```
