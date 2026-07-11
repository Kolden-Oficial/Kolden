---
id_fonte: "c9bcff04-265d-47ca-8f19-b525793eca9e"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Use Pinecone with Vertex AI RAG Engine - Google Cloud Documentation"
tipo: "unknown"
url_original: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/use-pinecone"
keywords: "('Vertex AI', 'RAG Engine', 'Pinecone Integration', 'Vector Search', 'Secret Manager API')"
summary: "This documentation serves as a technical guide for integrating **Pinecone** with the **Vertex AI RAG Engine**, a system designed to improve large language model accuracy through **grounding**. The text details the essential infrastructure requirements, such as establishing a **vector database** to perform **similarity searches** and using an **embedding model** to process semantic data. A significant portion of the guide is dedicated to security and configuration, specifically the mandatory use of **Secret Manager** to protect **API keys** and the provisioning of dedicated **service accounts**. By outlining the lifecycle of a **RAG corpus**, from initial creation to updating index metadata, the source provides developers with a clear roadmap for building robust, retrieval-augmented generation applications on **Google Cloud**."
extraido_em: "2026-06-30T16:22:26Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Use Pinecone with Vertex AI RAG Engine - Google Cloud Documentation

Use Pinecone with Vertex AI RAG Engine | Generative AI on Vertex AI | Google Cloud Documentation
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
\* Consider whether to use Pinecone with Vertex AI RAG Engine
\* Create your Pinecone index
\* Create your Pinecone API key
\* Store your API key in Secret Manager
\* Provision your Vertex AI RAG Engine service account
\* Prepare your RAG corpus
\* Create your RAG corpus
\* Create RAG corpus without an index name or an API key
\* Update your RAG corpus
\* What's next
\* Home
\* Documentation
\* AI and ML
\* Vertex AI
\* Generative AI on Vertex AI
\* Guides
Was this helpful?
Send feedback

### Use Pinecone with Vertex AI RAG Engine Stay organized with collections Save and categorize content based on your preferences. Dismiss Got it

```
*  On this page
*  Consider whether to use Pinecone with Vertex AI RAG Engine
*  Create your Pinecone index
*  Create your Pinecone API key
*  Store your API key in Secret Manager
*  Provision your Vertex AI RAG Engine service account
*  Prepare your RAG corpus
*  Create your RAG corpus
*  Create RAG corpus without an index name or an API key
*  Update your RAG corpus
*  What's next
```

The VPC-SC security controls and CMEK are supported by Vertex AI RAG Engine. Data residency and AXT security controls aren't supported.
To see an example of using RAG Engine with Pinecone, run the "RAG Engine with Pinecone" notebook in one of the following environments:
Open in Colab | Open in Colab Enterprise | Open in Vertex AI Workbench | View on GitHub
This page shows you how to connect your RAG corpus to your Pinecone database.
You can also follow along using this notebook Vertex AI RAG Engine with Pinecone.
You can use your Pinecone database instance with Vertex AI RAG Engine to index, and conduct a vector-based similarity search. A similarity search is a way to find pieces of text that are similar to the text that you're looking for, which requires the use of an embedding model. The embedding model produces vector data for each piece of text being compared. The similarity search is used to retrieve semantic contexts for grounding to return the most accurate content from your LLM.
With Vertex AI RAG Engine, you can continue to use your fully-managed vector database instance, which you're responsible for provisioning. Vertex AI RAG Engine uses your vector database for storage, index management, and search.

#### Consider whether to use Pinecone with Vertex AI RAG Engine

Consider whether using the Pinecone database is the best choice for your RAG application by reviewing the following:
\* You must create, configure, and manage the scaling of your Pinecone database instance.
\* Vertex AI RAG Engine uses the default namespace on your index. Ensure that this namespace isn't modifiable by anything else.
\* You must provide a Pinecone API key, which allows Vertex AI RAG Engine to interact with the Pinecone database. Vertex AI RAG Engine doesn't store and manage your Pinecone API key. Instead, you must do the following:
\* Store your key in the Google Cloud Secret Manager.
\* Grant your project's service account permissions to access your secret.
\* Provide Vertex AI RAG Engine access to your secret's resource name.
\* When you interact with your RAG corpus, Vertex AI RAG Engine accesses your secret resource using your service account.
\* RAG corpus and the Pinecone index have a one-to-one mapping. This association is made as part of the CreateRagCorpus API call or the UpdateRagCorpus API call.

#### Create your Pinecone index

To create your Pinecone index, you must follow these steps:
1. See the Pinecone quickstart guide to get the index configurations that must be specified on your index to make the index compatible with RAG corpus.
1. You want to ensure that the location of the Pinecone index is the same as or close to where you use Vertex AI RAG Engine for the following reasons:
\* You want to maintain reduced latencies.
\* You want to meet your data residency requirements that are set by applicable laws.
1. During Pinecone index creation, specify the embedding dimension to use with Vertex AI RAG Engine. This table provides the dimension sizes or location of the dimension sizes:
| Model | Dimension size |
| ------ | ------ |
| First-party Gecko | 768 |
| Fine-tuned first-party Gecko | 768 |
| E5 | See Use OSS embedding models. |

```
1. Choose one of the following supported distance metrics:
*  cosine
    *  dotproduct
    *  euclidean
1. Optional: When you create a pod-based index, you must specify the file_id on the pod.metadata_config.indexed field. For more information, see Selective metadata indexing.
```

#### Create your Pinecone API key

Vertex AI RAG Engine can only connect to your Pinecone index by using your API key for authentication and authorization. You must follow the Pinecone official guide to authentication to configure the API key-based authentication in your Pinecone project.

#### Store your API key in Secret Manager

An API key holds Sensitive Personally Identifiable Information (SPII), which is subject to legal requirements. If the SPII data is compromised or misused, an individual might experience a significant risk or harm. To minimize risks to an individual while using Vertex AI RAG Engine, don't store and manage your API key, and avoid sharing the unencrypted API key.
To protect SPII, you must do the following:
1. Store your API key in Secret Manager.
1. Grant your Vertex AI RAG Engine service account the permissions to your secret(s), and manage the access control at the secret resource level.
1. Navigate to your project's permissions.
1. Enable the option **Include Google-provided role grants** .
1. Find the service account, which has the format: service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com
1. Edit the service account's principals.
1. Add the Secret Manager Secret Accessor role to the service account.
1. During the creation or update of the RAG corpus, pass the secret resource name to Vertex AI RAG Engine, and store the secret resource name.
When making API requests to your Pinecone index(es), Vertex AI RAG Engine uses each service account to read the API key that corresponds to your secret resources in Secret Manager from your project(s).

#### Provision your Vertex AI RAG Engine service account

When you create the first RAG corpus in your project, Vertex AI RAG Engine creates a dedicated service account. You can find your service account from your project's Identity and Access Management page.
The service account follows this fixed format: service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com
For example, [service-123456789@gcp-sa-vertex-rag.iam.gserviceaccount.com](mailto:service-123456789@gcp-sa-vertex-rag.iam.gserviceaccount.com)

#### Prepare your RAG corpus

To use your Pinecone index with Vertex AI RAG Engine, you must associate the index with a RAG corpus during its creation stage. After the association is made, this binding is permanent for the lifetime of the RAG corpus. The association can be done using either the CreateRagCorpus or the UpdateRagCorpus API.
For the association to be considered complete, you must set three key fields on the RAG corpus:
\* **rag\_vector\_db\_config.pinecone** : This field helps you to set the choice of a vector database that you would like to associate with your RAG corpus, and it must be set during the CreateRagCorpus API call. If it isn't set, then the default vector database choice RagManagedDb is assigned to your RAG corpus.
\* **rag\_vector\_db\_config.pinecone.index\_name** : This is the name used to create the Pinecone index that's used with the RAG corpus. You can set the name during the CreateRagCorpus call, or you can specify the name when you call the UpdateRagCorpus API.
\* **rag\_vector\_db\_config.api\_auth.api\_key\_config.api\_key\_secret\_version** : This the full resource name of the secret that is stored in Secret Manager, which contains your Pinecone API key. You can set the name during the CreateRagCorpus call, or you can specify the name when you call the UpdateRagCorpus API. Until you specify this field, you can't import data into the RAG corpus. This field should have the format: projects/{PROJECT\_NUMBER}/secrets/{SECRET\_ID}/versions/{VERSION\_ID}

#### Create your RAG corpus

If you have access to your Pinecone index name and the secret resource name with your permissions set, then you can create your RAG corpus, and associate it with your Pinecone index, which is demonstrated in this sample code.
When it's your first time creating a RAG corpus, you won't have the service account information ready. However, the fields are optional and can be associated with the RAG corpus using the UpdateRagCorpus API.
For an example on how to create the RAG corpus without providing the service account information, see Create RAG corpus without an index name or an API key.
Python REST More
Before trying this sample, follow the Python setup instructions in the Vertex AI quickstart using client libraries. For more information, see the Vertex AI Python API reference documentation.
To authenticate to Vertex AI, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.
See more code actions.
Dismiss View
View on GitHub
Light code theme
Dark code theme
Send feedback

```
from vertexai import rag
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# pinecone_index_name = "pinecone-index-name"
# pinecone_api_key_secret_manager_version = "projects/{PROJECT_ID}/secrets/{SECRET_NAME}/versions/latest"
# display_name = "test_corpus"
# description = "Corpus Description"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure embedding model (Optional)
embedding_model_config = rag.RagEmbeddingModelConfig(
    vertex_prediction_endpoint=rag.VertexPredictionEndpoint(
        publisher_model="publishers/google/models/text-embedding-005"
    )
)

# Configure Vector DB
vector_db = rag.Pinecone(
    index_name=pinecone_index_name,
    api_key=pinecone_api_key_secret_manager_version,
)

corpus = rag.create_corpus(
    display_name=display_name,
    description=description,
    backend_config=rag.RagVectorDbConfig(
        rag_embedding_model_config=embedding_model_config,
        vector_db=vector_db,
    ),
)
print(corpus)
# Example response:
# RagCorpus(name='projects/1234567890/locations/us-central1/ragCorpora/1234567890',
# display_name='test_corpus', description='Corpus Description', embedding_model_config=...
# ...
```

```
   # Set your project ID under which you want to create the corpus
   PROJECT_ID = "YOUR_PROJECT_ID"

   # Choose a display name for your corpus
   CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

   # Set your Pinecone index name
   PINECONE_INDEX_NAME=YOUR_INDEX_NAME

   # Set the full resource name of your secret. Follows the format
   # projects/{PROJECT_NUMER}/secrets/{SECRET_ID}/versions/{VERSION_ID}
   SECRET_RESOURCE_NAME=YOUR_SECRET_RESOURCE_NAME

   # Call CreateRagCorpus API with all the Vector DB information.
   # You can also add the embedding model choice or set other RAG corpus parameters on
   # this call per your choice.
   curl -X POST \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
   -H "Content-Type: application/json" \
   https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
         "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
         "rag_vector_db_config" : {
            "pinecone": {"index_name": '\""${PINECONE_INDEX_NAME}"\"'},
            "api_auth": {"api_key_config":
                  {"api_key_secret_version": '\""${SECRET_RESOURCE_NAME}"\"'}
            }
         }
      }'

   # To poll the status of your RAG corpus creation, get the operation_id returned in
   # response of your CreateRagCorpus call.
   OPERATION_ID="YOUR_OPERATION_ID"

   # Poll Operation status until done = true in the response.
   # The response to this call will contain the ID for your created RAG corpus
   curl -X GET \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
   -H "Content-Type: application/json" \
   https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}
```

#### Create RAG corpus without an index name or an API key

If this is your first RAG corpus and you don't have access to your service account details, or you haven't completed the provisioning steps for your Pinecone index, you can still create your RAG corpus. You can then associate the RAG corpus with an empty Pinecone configuration, and add the details later.
The following must be taken into consideration:
\* When you don't provide the index name and API key secret name, files can't be imported into the RAG corpus.
\* If you choose Pinecone as your vector database for your RAG corpus, it can't be switched later to a different database.
This code example demonstrates how to create a RAG corpus with Pinecone without providing a Pinecone index name or API secret name. Use the UpdateRagCorpus API to specify later the missing information.
Python REST More
See more code actions.
Dismiss View
Light code theme
Dark code theme

```
import vertexai
from vertexai.preview import rag

# Set Project
PROJECT_ID = "YOUR_PROJECT_ID"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure the Pinecone vector DB information
vector_db = rag.Pinecone()

# Name your corpus
DISPLAY_NAME = "YOUR_CORPUS_NAME"

rag_corpus = rag.create_corpus(display_name=DISPLAY_NAME, vector_db=vector_db)
```

```
# Set your project ID under which you want to create the corpus
PROJECT_ID = "YOUR_PROJECT_ID"

# Choose a display name for your corpus
CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

# Call CreateRagCorpus API with all the Vector DB information.
# You can also add the embedding model choice or set other RAG corpus parameters on
# this call per your choice.
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
      "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
      "rag_vector_db_config" : {
         "pinecone": {}
      }
   }'

# To poll the status of your RAG corpus creation, get the operation_id returned in
# response of your CreateRagCorpus call.
OPERATION_ID="YOUR_OPERATION_ID"

# Poll Operation status until done = true in the response.
# The response to this call will contain the ID for your created RAG corpus
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}
```

#### Update your RAG corpus

The UpdateRagCorpus API lets you update the vector database configuration. If the Pinecone index name and the API key secret version aren't previously set, you can use the Pinecone API to update the fields. The choice of a vector database can't be updated. It's optional to provide the API key secret. However, if you don't specify the API key secret, you can import data into the RAG corpus.
| Field | Mutability | Required or Optional |
| ------ | ------ | ------ |
| rag\_vector\_db\_config. vector\_db | Immutable after you make a choice. | Required |
| rag\_vector\_db\_config. pinecone. index\_name | Immutable after you set the field on the RAG corpus. | Required |
| rag\_vector\_db\_config. api\_auth. api\_key\_config. api\_key\_secret\_version | Mutable. After you set the API key, you can't drop the key. | Optional |

Python REST More
See more code actions.
Dismiss View
Light code theme
Dark code theme

```
import vertexai
from vertexai.preview import rag

# Set Project
PROJECT_ID = "YOUR_PROJECT_ID"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure the Pinecone vector DB information
vector_db = rag.Pinecone(index_name=)

# Name your corpus
DISPLAY_NAME = "YOUR_CORPUS_NAME"

rag_corpus = rag.create_corpus(display_name=DISPLAY_NAME, vector_db=vector_db)
```

```
# Set your project ID for the corpus that you want to create.
PROJECT_ID = "YOUR_PROJECT_ID"

# Set your Pinecone index name
PINECONE_INDEX_NAME=YOUR_INDEX_NAME

# Set the full resource name of your secret. Follows the format
# projects/{PROJECT_NUMER}/secrets/{SECRET_ID}/versions/{VERSION_ID}
SECRET_RESOURCE_NAME=YOUR_SECRET_RESOURCE_NAME

# Call UpdateRagCorpus API with the Vector DB information.
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
      "rag_vector_db_config" : {
         "pinecone": {"index_name": '\""${PINECONE_INDEX_NAME}"\"'},
         "api_auth": {"api_key_config":
               {"api_key_secret_version": '\""${SECRET_RESOURCE_NAME}"\"'}
         }
      }
   }'

# To poll the status of your RAG corpus creation, get the operation_id returned in
# response of your CreateRagCorpus call.
OPERATION_ID="YOUR_OPERATION_ID"

# Poll Operation status until done = true in the response.
# The response to this call will contain the ID for your created RAG corpus
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}
```

#### What's next

```
*  Use Vertex AI Vector Search with Vertex AI RAG Engine
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
