---
id_fonte: "bbc053fa-19e6-40f7-abc3-b374ddeb9399"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Build with fal"
tipo: "unknown"
url_original: "https://fal.ai/docs/documentation"
keywords: "('Model APIs', 'Serverless Deployment', 'GPU Compute', 'AI Model Training', 'Infrastructure Scaling')"
summary: "Fal serves as a comprehensive **generative media platform** designed to help developers build, scale, and manage sophisticated AI applications. The ecosystem is organized into three primary pillars: a **unified API** for accessing over a thousand pre-optimized models, a **serverless infrastructure** for deploying custom code, and **dedicated compute instances** for intensive training tasks. By offering **automatic autoscaling** and real-time observability tools, the platform enables creators to move from initial development to processing **billions of requests** with high reliability. Ultimately, the documentation provides a roadmap for leveraging **high-performance GPU resources** to power diverse media formats, including image, video, and audio generation."
extraido_em: "2026-06-30T16:18:36Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Build with fal

Build with fal
Skip to main content
fal home page
Search...
Ctrl K
\* Status
\* Community
\* Blog
\* Overview
\* Why fal?
\* Quick Start

###### Setting Up

```
*  Accounts and Identity
*  Teams
*  Get Your API Key
*  AI Tools
*  Resources
```

###### Model APIs

```
*  Overview
*  Playground
*  Inference Methods
*  Platform Headers
*  Model Arguments
*  fal CDN
*  Data Retention
*  Errors
*  Concurrency Limits
*  Workflows
*  Sandbox
*  Pricing
*  FAQ
```

###### Serverless

```
*  Introduction
*  Development
*  Deployment
*  Reliability
*  Observability
*  Marketplace
*  Optimizations
*  Pricing
*  FAQ
```

###### Compute

```
*  Introduction
*  Quickstart
*  Pricing
```

###### Organizations

```
*  Overview
*  Managing Teams
*  Model Access Controls
*  Support
*  Contact Sales
*  Login
```

fal home page
Search...
Ctrl K Ask AI
\* Contact Sales
\* Login
\* Login
Search...
Navigation
Documentation
Documentation
Examples
SDK Reference
Platform API
Changelog
Documentation
Examples
SDK Reference
Platform API
Changelog

### Documentation

Copy page
Learn how to build and deploy AI applications with fal
Copy page

### Build with fal

The generative media platform powering the world's top AI apps.
Call **1,000+ optimized models** through a unified API, or deploy your own on the same infrastructure. Image, video, audio, music, speech, 3D, and real-time streaming. Built to scale to billions of requests.
Search or ask…
99.99%+
Uptime
Billions+
Requests/day
1,000+
Endpoints
[

#### Model APIs

**Call 1,000+ models with one API.** Image, video, audio, and multimodal generation. Optimized and production-ready.](<https://fal.ai/docs/documentation/model-apis/overview>)
[

#### Serverless

**Deploy your own models.** Same infrastructure, same autoscaling, same reliability. From zero to thousands of GPUs.](<https://fal.ai/docs/documentation/serverless>)
[

#### Compute

**Dedicated GPU instances.** Full SSH access for training, fine-tuning, and persistent workloads.](<https://fal.ai/docs/documentation/compute>)
[

#### Platform APIs

REST APIs for model metadata, pricing, usage tracking, logs, files, and metrics](<https://fal.ai/docs/api-reference/platform-apis>)

#### Start with a Model API Call

Most users start here. Pick a model from the Marketplace, get an API key, and make a request. Three lines of code, no infrastructure to manage.
Python
JavaScript
cURL

```
import fal_client

result = fal_client.subscribe("fal-ai/nano-banana-2", 
    arguments={"prompt": "a sunset over mountains"}
)
print(result["images"][0]["url"])
```

Every model supports synchronous and async queue calls out of the box. Many also support streaming and real-time WebSocket connections. You can compare models side-by-side in the Sandbox before committing to one.
[

#### Model APIs Quickstart

Browse models, see pricing, and start generating](<https://fal.ai/docs/documentation/model-apis/overview>)

#### Deploy Your Own Models

For teams that need to run custom models, proprietary pipelines, or fine-tuned variants, fal Serverless lets you deploy on the same engine that powers the Marketplace. fal has been running this infrastructure for over 3 years, and every model on the platform goes through the same lifecycle below.
1
Develop
A fal.App is a Python class where your setup() method runs once per runner to load model weights and initialize resources. Your @fal.endpoint methods then serve incoming requests using the initialized state. You declare hardware needs and environment alongside your code, so infrastructure is versioned with your app.

```
import fal

class MyModel(fal.App):
    machine_type = "GPU-H100"
    
    def setup(self):
        self.model = load_my_model()
    
    @fal.endpoint("/")
    def generate(self, prompt: str):
        return self.model(prompt)
```

2
Test
fal run spins up a cloud GPU runner and gives you a temporary URL so you can test on the same hardware you'll use in production. It also generates a playground UI automatically. For CI, AppClient lets you run tests against ephemeral deployments.

```
fal run my_app.py
```

3
Deploy
fal deploy creates a persistent, authenticated endpoint with autoscaling and built-in retries. Every deploy creates a new revision for instant rollbacks. For staging and production separation, fal supports multiple environments per app.

```
fal deploy my_app.py
```

4
Observe
The dashboard gives you real-time logs, request-level analytics, and error tracking out of the box. Trace individual requests, spot latency regressions, and monitor runner utilization. For external stacks, fal supports Prometheus metrics and log drains to Datadog, Splunk, and Elasticsearch.
5
Scale
fal scales runners from zero to thousands of GPUs based on demand, with a multi-layer caching system that reduces cold starts over time. Scaling parameters let you control the tradeoff: min\_concurrency keeps runners warm, max\_concurrency caps spend, and concurrency\_buffer pre-warms ahead of spikes. See optimizing cold starts and machine types for latency-sensitive workloads.

```
class MyModel(fal.App):
    min_concurrency = 2
    max_concurrency = 100
    concurrency_buffer = 3
```

6
Distribute
Endpoints start as private. You can deploy in public mode for open access, or shared mode where callers pay for their own usage. To list on the Marketplace for broader distribution and revenue, see publishing to the marketplace.

```
class MyModel(fal.App):
    app_auth = "shared"
```

[

#### Serverless Quickstart

Deploy your first model in minutes](<https://fal.ai/docs/documentation/development/getting-started/quick-start>)

#### Train Your Own Models

For training runs, fine-tuning, and workloads that need sustained GPU access, fal Compute gives you dedicated instances with full SSH control. No cold starts, no autoscaling, just raw GPU power billed at a fixed hourly rate.

#### H100 SXM

Single-GPU instances for development, fine-tuning, and single-GPU training

#### 8x H100 SXM

Multi-GPU instances connected over InfiniBand for distributed training
| | Compute | Serverless |
| ------ | ------ | ------ |
| **Best for** | Training, fine-tuning, batch jobs | API endpoints, on-demand inference |
| **Billing** | Per-hour, fixed rate | Per-second of execution |
| **Scaling** | Manual | Automatic |
| **Access** | Full SSH | Managed runners |

[

#### Compute Quickstart

Provision your first GPU instance in minutes](<https://fal.ai/docs/documentation/compute/quickstart>)
Was this page helpful?
Yes No
Why fal? Industry-leading inference speed for generative AI, trusted by top AI applications Next
Ctrl+I
discord x github linkedin
On this page
\* Build with fal
\* Start with a Model API Call
\* Deploy Your Own Models
\* Train Your Own Models
x
Assistant
Responses are generated using AI and may contain mistakes.
Contact support
