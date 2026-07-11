---
id_fonte: "de1ff213-26af-4c05-a690-dee6a63c9155"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "DeepSeek Documentation - API Reference & Integration Guides"
tipo: "unknown"
url_original: "https://deepseek.ai/docs"
keywords: "('API Reference', 'DeepSeek Model Overview', 'OpenAI Compatibility', 'Integration Guides', 'Research Papers')"
summary: "This documentation serves as a comprehensive roadmap for developers looking to incorporate **DeepSeek’s artificial intelligence** into their own software projects. The guide emphasizes **seamless integration** by highlighting an API that is **fully compatible with OpenAI’s existing libraries**, allowing users to migrate their systems simply by updating a base URL. Within the text, technical resources are organized into **tutorials, model comparisons, and research papers** to support both practical coding and theoretical understanding. Ultimately, the source functions as a **centralized hub** that provides the essential keys, code samples, and model specifications needed to build advanced chatbots and reasoning applications."
extraido_em: "2026-06-30T16:19:30Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# DeepSeek Documentation - API Reference & Integration Guides

DeepSeek Documentation - API Reference & Integration Guides
Deepseek.ai is an independent website and is not affiliated with, sponsored by, or endorsed by Hangzhou DeepSeek Artificial Intelligence Co., Ltd.
AI Research Updates
DeepSeek AI
Home Products Compare Resources Pricing
1. Home
1. Documentation

### DeepSeek Documentation

Everything you need to integrate DeepSeek AI into your applications. OpenAI-compatible API makes migration simple.
Official API Docs GitHub

#### Documentation Resources

##### Getting Started

Quick start guide for DeepSeek API
Learn how to set up your account, get an API key, and make your first API call in minutes.
Programming
Read Guide

##### API Reference

Complete API documentation
Full API reference including endpoints, parameters, response formats, and error codes.
View Reference

##### Model Overview

Available models and capabilities
Compare DeepSeek-V3, R1, and other models. Learn about context windows, capabilities, and use cases.
DeepSeek-V3 Applications
Explore Models

##### Code Examples

Sample code and integrations
Python, JavaScript, and other language examples for common use cases.
View Examples

##### Tutorials

Step-by-step guides
Build chatbots, RAG systems, and AI applications with DeepSeek.
AI Research Updates
Read Tutorials

##### Research Papers

Technical papers and benchmarks
Read the technical papers behind DeepSeek models and their performance benchmarks.
View Papers
Discover more
AI Tools, Chatbots & Virtual Assistants
Machine Learning & Artificial Intelligence
AI software subscriptions
DeepSeek API Guides
AI programming courses
Open source project support

#### Quick Start Example

##### Python Example

Make your first API call with Python
Programming

```
from openai import OpenAI

# DeepSeek uses OpenAI-compatible API
client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",  # or "deepseek-reasoner"
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)
```

**Note:** DeepSeek's API is fully compatible with OpenAI's client libraries. Just change the base URL and use your DeepSeek API key.

#### Frequently Asked Questions

##### How do I get a DeepSeek API key?

Sign up at platform.deepseek.com, navigate to the API Keys section, and create a new key. The process takes less than a minute.

##### Is the DeepSeek API compatible with OpenAI?

Yes, DeepSeek provides an OpenAI-compatible API. You can use existing OpenAI client libraries (Python, JavaScript, etc.) by simply changing the base URL to api.deepseek.com .

##### What models are available via the API?

The API provides access to DeepSeek-V3 (general-purpose chat) and DeepSeek-R1 (reasoning model). Use deepseek-chat for V3 and deepseek-reasoner for R1.
Programming

#### Ready to Build with DeepSeek?

Get your API key and start building AI-powered applications today.
Get API Key View Pricing
English Español 中文
DeepSeek.ai is not affiliated with, endorsed by, or connected to DeepSeek.com in any way.
Looking for DeepSeek.com?
© 2026 DeepSeek AI. All rights reserved.
