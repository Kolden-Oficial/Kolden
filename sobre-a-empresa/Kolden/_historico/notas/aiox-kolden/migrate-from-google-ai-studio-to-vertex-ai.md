---
id_fonte: "5ac06444-2270-4547-9b5a-2c377afcd0b6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Migrate from Google AI Studio to Vertex AI"
tipo: "unknown"
url_original: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-google-ai"
keywords: "('Vertex AI Migration', 'Gemini API Differences', 'Prompt Management', 'Enterprise AI Features', 'MLOps Tooling')"
summary: "This technical guide outlines the transition from the experimental Google AI Studio to the more robust **Vertex AI** platform, which is designed for scaling generative AI applications within an **enterprise-grade ecosystem**. The documentation highlights that while AI Studio is ideal for rapid prototyping, Vertex AI offers advanced **MLOps tools**, superior security through **IAM and VPC integration**, and compliance with industry standards like HIPAA. To facilitate this shift, the text details a **three-step migration process** involving the transfer of prompts, the relocation of training data to Cloud Storage, and the decommissioning of legacy API keys. Ultimately, the purpose of the text is to help developers choose the right environment for their needs while providing a clear roadmap for achieving **greater operational reliability** and access to a broader library of third-party models."
extraido_em: "2026-06-30T16:20:59Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Migrate from Google AI Studio to Vertex AI

Migrate from Google AI Studio to Vertex AI | Generative AI on Vertex AI | Google Cloud Documentation
Skip to main content
docs.cloud.google.com uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. Learn more
OK, got it
Technology areas
close
\* AI and ML
\* Application development
\* Application hosting
\* Compute
\* Data analytics and pipelines
\* Databases
\* Distributed, hybrid, and multicloud
\* Industry solutions
\* Migration
\* Networking
\* Observability and monitoring
\* Security
\* Storage
Cross-product tools
close
\* Access and resources management
\* Costs and usage management
\* Infrastructure as code
\* SDK, languages, frameworks, and tools
More /
Console Language
\* English
\* Deutsch
\* Español
\* Español – América Latina
\* Français
\* Indonesia
\* Italiano
\* Português
\* Português – Brasil
\* עברית
\* 中文 – 简体
\* 中文 – 繁體
\* 日本語
\* 한국어
Sign in
\* Vertex AI
\* Generative AI on Vertex AI
Start free
Guides API reference Vertex AI Cookbook Prompt gallery Resources FAQ Pricing More
\* Technology areas
\* More
\* Guides
\* API reference
\* Vertex AI Cookbook
\* Prompt gallery
\* Resources
\* FAQ
\* Pricing
\* Cross-product tools
\* More
\* Console
\* Discover
\* Overview of Generative AI on Vertex AI
\* Generative AI beginner's guide
\* Glossary
\* Get started
\* Quickstart
\* Get an API key
\* Configure application default credentials
\* Vertex AI Studio quickstart
\* Migrate from Google AI Studio to Vertex AI
\* Deploy your Vertex AI Studio prompt as a web application
\* Vertex AI Studio capabilities
\* Get started with Gemini 3
\* Gemini 3 prompting guide
\* Google GenAI libraries
\* Compatibility with OpenAI library
\* Vertex AI in express mode
\* Overview
\* Console tutorial
\* API tutorial
\* Select models
\* Model Garden
\* Overview of Model Garden
\* Use models in Model Garden
\* Test model capabilities
\* Google Models
\* All Google models
\* Gemini
\* Migrate to the latest Gemini models
\* Pro
\* Gemini 3.1 Pro
\* Gemini 3 Pro
\* Gemini 3 Pro Image
\* Gemini 2.5 Pro
\* Flash
\* Gemini 3.1 Flash Image
\* Gemini 3 Flash
\* Gemini 2.5 Flash
\* Gemini 2.5 Flash Image
\* Gemini 2.5 Flash Live API
\* Gemini 2.0 Flash
\* Flash-Lite
\* Gemini 3.1 Flash-Lite
\* Gemini 2.5 Flash-Lite
\* Gemini 2.0 Flash-Lite
\* Embedding
\* Gemini Embedding 2
\* Imagen
\* Imagen 3
\* Imagen 4
\* Virtual Try-On
\* Imagen 4.0 upscale Preview
\* Imagen product recontext preview 06-30
\* Veo
\* Veo 2
\* Veo 3
\* Veo 3.1
\* Lyria
\* Lyria 2
\* Lyria 3
\* Model versions
\* Partner Models
\* Partner models overview
\* Claude
\* Overview
\* Request predictions
\* Batch predictions
\* Prompt caching
\* Count tokens
\* Web search
\* Safety classifiers
\* Model details
\* Claude Sonnet 4.6
\* Claude Opus 4.6
\* Claude Opus 4.5
\* Claude Sonnet 4.5
\* Claude Opus 4.1
\* Claude Haiku 4.5
\* Claude Opus 4
\* Claude Sonnet 4
\* Mistral AI
\* Overview
\* Model details
\* Mistral Medium 3
\* Mistral OCR (25.05)
\* Mistral Small 3.1 (25.03)
\* Codestral 2
\* Deploy partner models from Model Garden
\* Model deprecations (MaaS)
\* Open Models
\* Overview
\* DeepSeek
\* Overview
\* DeepSeek-V3.2
\* DeepSeek-V3.1
\* DeepSeek-R1-0528
\* DeepSeek-OCR
\* Embedding (e5)
\* Multilingual E5 Small
\* Multilingual E5 Large
\* Google Gemma
\* Use Gemma
\* Tutorial: Deploy and inference Gemma (GPU)
\* Tutorial: Deploy and inference Gemma (TPU)
\* Kimi
\* Overview
\* Kimi K2 Thinking
\* Llama
\* Overview
\* Request predictions
\* Model details
\* Llama 4 Maverick
\* Llama 4 Scout
\* Llama 3.3
\* MiniMax
\* Overview
\* MiniMax M2
\* OpenAI
\* Overview
\* OpenAI gpt-oss-120b
\* OpenAI gpt-oss-20b
\* Qwen
\* Overview
\* Qwen 3 Next Instruct 80B
\* Qwen 3 Next Thinking 80B
\* Qwen 3 Coder
\* Qwen 3 235B
\* ZAI.org
\* Overview
\* GLM 5
\* GLM 4.7
\* Managed open models (MaaS)
\* Overview
\* Use open models via Model as a Service (MaaS)
\* Grant access to open models
\* API
\* Call MaaS APIs for open models
\* Function calling
\* Thinking
\* Structured output
\* Batch prediction
\* Self-deployed open models
\* Overview
\* Deploy open models
\* Deploy open models from Model Garden
\* Deploy open models with prebuilt containers
\* Deploy open models with a custom vLLM container
\* Deploy models with custom weights
\* Use Hugging Face Models
\* Tutorials
\* Optimize model performance with advanced features in Model Garden
\* Hex-LLM
\* Comprehensive guide to vLLM for Text and Multimodal LLM Serving (GPU)
\* vLLM TPU
\* xDiT
\* Deploy Llamma 3 models with SpotVM and Reservations
\* Build
\* Agents
\* Vertex AI Agent Builder documentation
\* Prompt design
\* Introduction to prompting
\* Prompting strategies
\* Overview
\* Give clear and specific instructions
\* Use system instructions
\* Include few-shot examples
\* Add contextual information
\* Structure prompts
\* Compare prompts
\* Instruct the model to explain its reasoning
\* Break down complex tasks
\* Experiment with parameter values
\* Prompt iteration strategies
\* Task-specific prompt guidance
\* Design multimodal prompts
\* Design chat prompts
\* Design medical text prompts
\* Capabilities
\* Safety
\* Overview
\* Responsible AI
\* System instructions for safety
\* Configure content filters
\* Gemini for safety filtering and content moderation
\* Abuse monitoring
\* Process blocked responses
\* Content Credentials
\* Text and code generation
\* Text generation
\* System instructions
\* Function calling
\* Structured output
\* Content generation parameters
\* Code execution
\* Medical text
\* Image generation
\* Overview
\* Image generation with Gemini
\* Generate images with Gemini
\* Edit images with Gemini
\* Gemini image generation best practices
\* Gemini image generation limitations
\* Responsible AI and usage for Gemini image generation
\* Image generation with Imagen
\* Generate images with Imagen
\* Edit images with Imagen
\* Overview
\* Insert objects into an image using inpaint
\* Remove objects from an image using inpaint
\* Expand the content of an image using outpaint
\* Replace the background of an image
\* Configure Imagen parameters
\* Configure Responsible AI safety settings
\* Use prompt rewriter
\* Set text prompt language
\* Configure aspect ratio
\* Set output resolution
\* Omit content using a negative prompt
\* Generate deterministic images
\* Generate images for retail and e-commerce
\* Generate Virtual Try-On images
\* Recontextualize product images
\* Customize images
\* Subject customization
\* Style customization
\* Controlled Customization
\* Instruct Customization
\* Upscale images
\* Prompt and image attribute guide
\* Base64 encode and decode files
\* Responsible AI and usage guidelines for Imagen
\* Video generation
\* Introduction to Veo
\* Text to video
\* First frame image to video
\* First and last frames to video
\* Ingredients to videos with image references
\* Extend videos
\* Insert objects
\* Remove objects
\* Veo prompt guide
\* Veo best practices
\* Turn off Veo's prompt rewriter
\* Responsible AI for Veo
\* Music generation
\* Introduction to Lyria
\* Generate music using Lyria
\* Lyria prompt guide
\* Media analysis
\* Image understanding
\* Video understanding
\* Audio understanding
\* Document understanding
\* Bounding box detection
\* Grounding
\* Overview
\* Grounding with Google Search
\* Grounding with Google Maps
\* Grounding with Vertex AI Search
\* Grounding with your search API
\* Grounding responses using RAG
\* Grounding with Elasticsearch
\* Grounding with Parallel Web Search
\* Web Grounding for Enterprise
\* URL context
\* Thinking
\* Overview
\* Thought signatures
\* Computer Use
\* Live API
\* Overview
\* Get started
\* Get started using the Gen AI SDK
\* Get started using WebSockets
\* Get started using ADK
\* Start and manage live sessions
\* Send audio and video streams
\* Configure language and voice
\* Configure Gemini capabilities
\* Best practices with Live API
\* Demo apps and resources
\* Embeddings
\* Overview
\* Text embeddings
\* Get text embeddings
\* Choose an embeddings task type
\* Get multimodal embeddings
\* Get batch embeddings inferences
\* Translation
\* Generate speech from text
\* Transcribe speech
\* Development tools
\* Use AI-powered prompt writing tools
\* Overview
\* Optimize prompts
\* Overview
\* Zero-shot optimizer
\* Few-shot optimizer
\* Data-driven optimizer
\* Use prompt templates
\* RAG Engine
\* RAG overview
\* RAG quickstart
\* RAG Engine billing
\* Understanding RagManagedDb
\* Data ingestion
\* Supported models
\* Generative models
\* Embedding models
\* Document parsing
\* Supported documents
\* Fine-tune RAG transformations
\* Use Document AI layout parser
\* Use the LLM parser
\* Vector database choices in RAG
\* Overview of vector database choices
\* Use RagManagedDb with RAG
\* Use Vertex AI Vector Search 2.0 with RAG
\* Use Vertex AI Vector Search with RAG
\* Use Feature Store with RAG
\* Use Weaviate with RAG
\* Use Pinecone with RAG
\* Use Vertex AI Search with RAG
\* Reranking for RAG
\* Manage your RAG corpus
\* Use CMEK with RAG
\* RAG quotas
\* Use RAG in Gemini Live API
\* Tokenizer
\* List and count tokens
\* Use the Count Tokens API
\* Multimodal datasets
\* Use Vertex AI Search
\* Model tuning
\* Introduction to tuning
\* Tuning Gemini models
\* Supervised fine-tuning
\* About supervised fine-tuning
\* Prepare your data
\* Use supervised fine-tuning
\* Supported modalities
\* Text tuning
\* Document tuning
\* Image tuning
\* Audio tuning
\* Video tuning
\* Tune function calling
\* Preference tuning
\* About preference tuning
\* Prepare your data
\* Use preference tuning
\* Use tuning checkpoints
\* Use continuous tuning
\* Open models
\* Embeddings models
\* Tune text embeddings models
\* Translation models
\* About supervised fine-tuning
\* Prepare your data
\* Use supervised fine-tuning
\* Tuning recommendations with LoRA and QLoRA
\* Migrate
\* Call Vertex AI models using OpenAI libraries
\* Overview
\* Authenticate
\* Examples
\* Migrate from OpenAI SDK
\* Evaluate
\* Overview
\* Tutorial: Perform evaluation using the console
\* Perform evaluation using the GenAI Client in Vertex AI SDK
\* Tutorial: Evaluate models using the GenAI Client in Vertex AI SDK
\* Define your evaluation metrics
\* Define your evaluation metrics
\* Details for managed rubric-based metrics
\* Prepare your evaluation dataset
\* Run an evaluation
\* View and interpret evaluation results
\* Evaluate agents
\* Alternative evaluation methods
\* Evaluate using the evaluation module in Vertex AI SDK
\* Tutorial: Perform evaluation using the evaluation module in Vertex AI SDK
\* Define your evaluation metrics
\* Prepare your evaluation dataset
\* Run an evaluation
\* Interpret evaluation results
\* Templates for model-based metrics
\* Evaluate agents
\* Evaluate a judge model
\* Configure a judge model
\* Run AutoSxS pipeline
\* Run a computation-based evaluation pipeline
\* Deploy
\* Consumption options overview
\* Provisioned Throughput
\* Provisioned Throughput overview
\* Supported models
\* Calculate Provisioned Throughput requirements
\* Provisioned Throughput for Live API
\* Provisioned Throughput for Veo 3 models
\* Single Zone Provisioned Throughput
\* Purchase Provisioned Throughput
\* Use Provisioned Throughput
\* PayGo
\* Standard PayGo
\* Priority PayGo
\* Flex PayGo
\* Batch inference
\* Overview
\* Create batch job from Cloud Storage
\* Create batch job from BigQuery
\* Resume an incomplete batch job
\* Quotas and system limits
\* Cache reused prompt context
\* Overview
\* Create a context cache
\* Use a context cache
\* Get context cache information
\* Update a context cache
\* Delete a context cache
\* Context cache for fine-tuned Gemini models
\* Deploy generative AI models
\* Troubleshooting error code 429
\* Retry strategy
\* Administer
\* Access control
\* Networking
\* Security controls
\* Control access to Model Garden models
\* Enable Data Access audit logs
\* Save and share prompts
\* Monitor models
\* Monitor cost using custom metadata labels
\* Request-response logging
\* Secure a gen AI app by using IAP
\* Overview
\* Set up your project and source repository
\* Create a Cloud Run service
\* Create a load balancer
\* Configure IAP
\* Test your IAP-secured app
\* Clean up your project
\* Go to Vertex AI documentation
\* Vertex AI documentation
\* AI and ML
\* Application development
\* Application hosting
\* Compute
\* Data analytics and pipelines
\* Databases
\* Distributed, hybrid, and multicloud
\* Industry solutions
\* Migration
\* Networking
\* Observability and monitoring
\* Security
\* Storage
\* Access and resources management
\* Costs and usage management
\* Infrastructure as code
\* SDK, languages, frameworks, and tools
\* On this page
\* Differences between using the Gemini API on its own and Vertex AI
\* Migration steps
\* 1. Migrate your prompts to Vertex AI Studio
\* 2. Upload training data to Vertex AI Studio
\* 3. Delete unused API Keys
\* What's next
\* Home
\* Documentation
\* AI and ML
\* Vertex AI
\* Generative AI on Vertex AI
\* Guides
Was this helpful?
Send feedback

### Migrate from Google AI Studio to Vertex AI Stay organized with collections Save and categorize content based on your preferences. Dismiss Got it

```
*  On this page
*  Differences between using the Gemini API on its own and Vertex AI
*  Migration steps
    *  1. Migrate your prompts to Vertex AI Studio
    *  2. Upload training data to Vertex AI Studio
    *  3. Delete unused API Keys
*  What's next
```

As your Gemini API applications mature, you might find that you need a more expansive platform for building and deploying generative AI applications and solutions end-to-end. Vertex AI provides a comprehensive ecosystem of tools to enable developers to harness the power of generative AI, from the initial stages of app development to app deployment, app hosting, and managing complex data at scale.
With Vertex AI, you get access to a suite of Machine Learning Operations (MLOps) tools to streamline usage, deployment, and monitoring of AI models for efficiency and reliability. Additionally, integrations with databases, Development Operations (DevOps) tools, logging, monitoring, and IAM offer a comprehensive approach to managing the entire generative AI lifecycle.

#### Differences between using the Gemini API on its own and Vertex AI

The following table summarizes the main differences between the Gemini API and Vertex AI to help you decide which option is right for your use case:
| **Feature** | **Gemini API** | **Vertex AI** |
| ------ | ------ | ------ |
| Endpoint names | generativelanguage. googleapis. com | aiplatform. googleapis. com |
| Sign up | Google Account | Google Cloud account (with terms agreement and billing) |
| Authentication | API Key or OAuth (if connected to Google Cloud project) | Google Cloud service account |
| User interface playground | Google AI Studio | Vertex AI Studio |
| API & SDK | Server and mobile/web client SDKs - Server: Python, Node.js, Go, Dart, ABAP - Mobile/Web client (via Firebase AI Logic): Android (Kotlin/Java), Swift, Web, Flutter, and Unity | Server and mobile/web client SDKs - Server: Python, Node.js, Go, Java, ABAP - Mobile/Web client (via Firebase AI Logic): Android (Kotlin/Java), Swift, Web, Flutter, and Unity |
| No-cost usage of API & SDK | Yes, where applicable | $300 Google Cloud credit for new users |
| Quota (requests per minute) | Varies based on model and pricing plan (see detailed information) | Varies based on model and region (see detailed information) |
| Commercial terms | Standard Terms of Service. Doesn't count toward Google Cloud commitments. All customers pay the same price. | Enterprise-ready terms for data processing, security, and privacy. Counts toward Google Cloud commitments. Custom contracts and discounts available for large volume workloads (contact sales). |
| Enterprise support and SLA | No enterprise-level support or Service Level Agreements (SLAs). | 24/7 enterprise-level support and SLAs for service availability. |
| Compliance and governance | No compliance certifications (for example, HIPAA, SOC2). Regulated customers should use Vertex AI instead. | Supports compliance with certifications like HIPAA and SOC2. Provides data residency, customer-managed encryption keys, and Access Transparency. |
| Security | API key authentication. | Authentication using IAM (service accounts, OAuth) for increased security. Enhanced security through Virtual Private Cloud. |
| Infrastructure | Global endpoint. | Global endpoint and regional endpoints. |
| Dedicated capacity | No access to dedicated capacity. | Access to Provisioned Throughput for dedicated capacity. |
| Model access | Access to Google's models. | Access to a broad selection of Google and third-party models in the Model Garden. |
| Google model improvement | - **Free tier** : Your prompts and responses may be used to improve Google products. - **Paid tier** : Your prompts, responses, and data are never used to improve Google products. | Your prompts, responses, and data are never used to improve Google products. |
| Advanced features | Standard feature set. | Full support for features like model tuning and a wider variety of embedding models. |
| MLOps | No | Full MLOps on Vertex AI (examples: model evaluation, Model Monitoring, Model Registry) |

#### Migration steps

The following sections cover the steps required to migrate your Gemini API code to Vertex AI. These steps assume you have prompt data from Google AI Studio saved in Google Drive.
When migrating to Vertex AI:
\* You can use your existing Google Cloud project (the same one you used to generate your Gemini API key) or you can create a new Google Cloud project.
\* Supported regions might differ between the Gemini API and Vertex AI. See the list of supported regions for generative AI on Google Cloud.
\* Any models you created in Google AI Studio need to be retrained in Vertex AI.

##### 1. Migrate your prompts to Vertex AI Studio

Your Google AI Studio prompt data is saved in a Google Drive folder. This section shows how to migrate your prompts to Vertex AI Studio.
1. Open Google Drive.
1. Navigate to the **AI\_Studio** folder where the prompts are stored.
1. Download your prompts from Google Drive to a local directory. **Note:** Prompts downloaded from Google Drive are in the text ( txt ) format. Before you upload them to Vertex AI Studio, change the file extensions from .txt to .json to convert them to JSON files.
1. Open Vertex AI Studio in the Google Cloud console.
1. In the **Vertex AI** menu, click **Recents > View all** to open the **Prompt management** menu.
1. Click download **Import prompt** .
1. Next to the **Prompt file** field, click **Browse** and select a prompt from your local directory. To upload prompts in bulk, you must manually combine your prompts into a single JSON file.
1. Click **Upload** .

##### 2. Upload training data to Vertex AI Studio

To migrate your training data to Vertex AI, you need to upload your data to a Cloud Storage bucket. For more information, see Introduction to tuning .

##### 3. Delete unused API Keys

If you no longer need to use your Gemini API key for the Gemini Developer API, then follow security best practices and delete it.
To delete an API key:
1. Open the Google Cloud API Credentials page.
1. Find the API key that you want to delete and click the **Actions** icon.
1. Select **Delete API key** .
1. In the **Delete credential** modal, select **Delete** . Deleting an API key takes a few minutes to propagate. After propagation completes, any traffic using the deleted API key is rejected.
**Important:** If you delete a key that's still used in production and need to recover it, see gcloud beta services api-keys undelete .

#### What's next

```
*  Try a quickstart tutorial using Vertex AI Studio or the Vertex AI API.
```

Was this helpful?
Send feedback
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-04-01 UTC.

##### Products and pricing

```
*  See all products
    *  Google Cloud pricing
    *  Google Cloud Marketplace
    *  Contact sales
```

##### Support

```
*  Community forums
    *  Support
    *  Release Notes
    *  System status
```

##### Resources

```
*  GitHub
    *  Getting Started with Google Cloud
    *  Code samples
    *  Cloud Architecture Center
    *  Training and Certification
```

##### Engage

```
*  Blog
    *  Events
    *  X (Twitter)
    *  Google Cloud on YouTube
    *  Google Cloud Tech on YouTube
*  About Google
*  Privacy
*  Site terms
*  Google Cloud terms
*  Manage cookies
*  Our third decade of climate action: join us
*  Sign up for the Google Cloud newsletter Subscribe
```

Language
\* English
\* Deutsch
\* Español
\* Español – América Latina
\* Français
\* Indonesia
\* Italiano
\* Português
\* Português – Brasil
\* עברית
\* 中文 – 简体
\* 中文 – 繁體
\* 日本語
\* 한국어
