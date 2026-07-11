---
id_fonte: "35950876-db4f-4cbb-afbd-59b615250940"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Advanced Prompt Customization for Anthropic - Haystack"
tipo: "unknown"
url_original: "https://haystack.deepset.ai/cookbook/prompt_customization_for_anthropic"
keywords: "('Advanced Prompt Customization', 'RAG Pipeline Development', 'Anthropic Claude Models', 'AI Agent Frameworks', 'Advanced Retrieval Techniques')"
summary: "This technical guide serves as a comprehensive resource for building sophisticated AI applications using the **Haystack framework** in coordination with **Anthropic’s Claude models**. The documentation specifically details how to implement **Retrieval-Augmented Generation (RAG)** by utilizing **XML-tagged prompting techniques** to improve context processing and accuracy. Beyond this specific tutorial, the text outlines a vast ecosystem of **advanced retrieval strategies**, **agentic workflows**, and **integrations** designed to help developers create production-ready AI agents. Ultimately, the source functions as both a **step-by-step instructional manual** for prompt engineering and a **broad directory of tools** for modern LLM orchestration."
extraido_em: "2026-06-30T16:18:08Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Advanced Prompt Customization for Anthropic - Haystack

Advanced Prompt Customization for Anthropic | Haystack
\* Overview
\* What is Haystack?
\* Get Started
\* Demos
\* Documentation
\* Learn
\* 📚 Tutorials & Walkthroughs
\* 🧑🍳 Cookbook
\* 🧪 Experiments
\* ⭐ Release Notes
\* New 💚 DataCamp Course: Building AI Agents
\* 🚀 DeepLearning.AI: Building AI Applications
\* Integrations
\* Blog
\* Haystack Enterprise
\* Sign up Haystack Enterprise Trial
\* Haystack Enterprise Platform
\* Haystack Enterprise Blog
\* Careers
Get Enterprise Support
Get Started
\* Overview
\* What is Haystack?
\* Get Started
\* Demos
\* Documentation
\* New Learn
\* 📚 Tutorials & Walkthroughs
\* 🧑🍳 Cookbook
\* 🧪 Experiments
\* ⭐ Release Notes
\* New 💚 DataCamp Course: Building AI Agents
\* 🚀 DeepLearning.AI: Building AI Applications
\* Integrations
\* Blog
\* Haystack Enterprise
\* Sign up Haystack Enterprise Trial
\* Haystack Enterprise Platform
\* Haystack Enterprise Blog
\* Careers
Get Enterprise Support
Get Started
📣 Haystack 2.27 is here! Better DX for document stores & automatic list joining in pipelines
Advanced Retrieval
\* Agent-Powered Retrieval with Haystack
\* RAG Pipeline Using FastEmbed for Embeddings Generation
\* Sparse Embedding Retrieval with Qdrant and FastEmbed
\* Using Hypothetical Document Embeddings (HyDE) to Improve Retrieval
\* Improving PostgreSQL Keyword Search to Avoid Empty Results
\* Hybrid RAG Pipeline with Breakpoints
\* Advanced RAG: Query Expansion
\* Advanced RAG: Query Decomposition and Reasoning
\* Advanced RAG: Automated Structured Metadata Enrichment
\* Improving Retrieval with Auto-Merging and Hierarchical Document Retrieval
\* Legal Document Analysis with jina-embeddings-v2-base-en
\* Extract Metadata Filters from a Query
\* Hybrid Retrieval with BM42
\* Improve Retrieval by Embedding Meaningful Metadata
Agents
\* Agent-Powered Retrieval with Haystack
\* Agentic RAG with Llama 3.2 3B
\* Build with Llama Stack and Haystack Agent
\* DevOps Support Agent with Human in the Loop
\* Multimodal Agent with fastRAG and Haystack
\* Using Mem0 Memory Store with Haystack Agents
\* Chat With Your SQL Database
\* Domain-Aware UI/UX Reviewer Agent: Custom Tools with Retry and Fallback
\* Build Browser Agents with Gemini + Playwright MCP
\* Breakpoint on Agent in a Pipeline
\* Building an Interactive Feedback Review Agent with Azure AI Search and Haystack
\* Newsletter Sending Agent with Tools
\* Build a GitHub PR Creator Agent
\* Build a GitHub Issue Resolver Agent
\* Create a Swarm of Agents
\* Advanced RAG: Query Decomposition and Reasoning
\* Define & Run Tools
\* Function Calling with OpenAIChatGenerator
\* Web-Enhanced Self-Reflecting Agent
Async
\* Running Haystack Pipelines in Asynchronous Environments
Audio
\* Multilingual RAG on a Podcast
\* Speaker Diarization with AssemblyAI
AzureAISearch
\* Building an Interactive Feedback Review Agent with Azure AI Search and Haystack
Chat
\* Using Mem0 Memory Store with Haystack Agents
\* Chat With Your SQL Database
\* Newsletter Sending Agent with Tools
\* Create a Swarm of Agents
\* Define & Run Tools
\* Function Calling with OpenAIChatGenerator
\* 🧩 Quizzes and Adventures 🏰 with Character Codex and llamafile
Customization
\* Advanced Prompt Customization for Anthropic
\* Setup the Development Environment
\* Download the Dataset
\* Create Embeddings and Index into the DocumentStore
\* Build the Prompt
\* Initialize RAG Pipeline Components
\* Build the RAG Pipeline
\* Test Different Questions
\* Prompt Optimization with DSPy
\* Domain-Aware UI/UX Reviewer Agent: Custom Tools with Retry and Fallback
\* Improving PostgreSQL Keyword Search to Avoid Empty Results
\* Hacker News Summaries with Custom Components
Data Scraping
\* Analyze Your Instagram Comments' Vibe with Apify and Haystack
\* RAG: Web Search and Analysis with Apify and Haystack
Discovery
\* Streaming Model Explorer
Evaluation
\* RAG Evaluation with Prometheus 2
\* Evaluating AI with Haystack
\* RAG Pipeline Evaluation Using DeepEval
\* RAG Pipeline Evaluation Using RAGAS
\* AI Guardrails: Content Moderation and Safety with Open Language Models
\* Trace and Evaluate RAG with Arize Phoenix
Function Calling
\* Build with Llama Stack and Haystack Agent
\* DevOps Support Agent with Human in the Loop
\* 🦍 Information Extraction with Gorilla
\* Function Calling and Multimodal QA with Gemini
\* Newsletter Sending Agent with Tools
\* Build a GitHub PR Creator Agent
\* Build a GitHub Issue Resolver Agent
\* Create a Swarm of Agents
\* Define & Run Tools
\* Function Calling with OpenAIChatGenerator
\* Invoking APIs with OpenAPITool
\* 🐦⬛ Information Extraction with Raven
Guardrails
\* AI Guardrails: Content Moderation and Safety with Open Language Models
Keyword Extraction
\* Simple Keyword Extraction using OpenAIChatGenerator
MCP
\* Build Browser Agents with Gemini + Playwright MCP
Memory
\* Using Mem0 Memory Store with Haystack Agents
Metadata
\* Agent-Powered Retrieval with Haystack
\* Extracting Metadata with an LLM
\* Advanced RAG: Automated Structured Metadata Enrichment
\* Extract Metadata Filters from a Query
\* Improve Retrieval by Embedding Meaningful Metadata
Model Serving
\* Haystack RAG Pipeline with Self-Deployed AI models using NVIDIA NIMs
\* Use the ⚡ vLLM inference engine with Haystack
\* 🧩 Quizzes and Adventures 🏰 with Character Codex and llamafile
\* Getting a Daily Digest From Tech Websites
Multilingual RAG
\* Multilingual RAG on a Podcast
\* Cohere v3 for Multilingual QA
Multimodal
\* Multimodal Agent with fastRAG and Haystack
\* Introduction to Multimodal Text Generation
\* Function Calling and Multimodal QA with Gemini
Observability
\* Trace and Evaluate RAG with Arize Phoenix
Prompting
\* Advanced Prompt Customization for Anthropic
\* Setup the Development Environment
\* Download the Dataset
\* Create Embeddings and Index into the DocumentStore
\* Build the Prompt
\* Initialize RAG Pipeline Components
\* Build the RAG Pipeline
\* Test Different Questions
\* Prompt Optimization with DSPy
\* Analyze Your Instagram Comments' Vibe with Apify and Haystack
RAG
\* Agentic RAG with Llama 3.2 3B
\* RAG Pipeline Using FastEmbed for Embeddings Generation
\* RAG with Llama 3.1
\* Sparse Embedding Retrieval with Qdrant and FastEmbed
\* Using Hypothetical Document Embeddings (HyDE) to Improve Retrieval
\* 🪁 RAG pipelines with Haystack + Zephyr 7B Beta
\* LinkedIn, Company Intelligence & Lead Enrichment with Haystack, MongoDB Atlas, and Bright Data
\* PDF-Based Question Answering with Amazon Bedrock and Haystack
\* Question Answering with Amazon Sagemaker, Chroma and Haystack
\* AstraDB 🤝 Haystack Integration
\* Calculating a Hallucination Score with the OpenAIChatGenerator
\* Hybrid RAG Pipeline with Breakpoints
\* Advanced RAG: Query Expansion
\* Building an Interactive Feedback Review Agent with Azure AI Search and Haystack
\* Chroma Indexing and RAG Examples
\* Crawl Website Content for Question Answering with Apify
\* RAG: Web Search and Analysis with Apify and Haystack
\* AI Guardrails: Content Moderation and Safety with Open Language Models
\* Trace and Evaluate RAG with Arize Phoenix
\* Haystack RAG Pipeline with Self-Deployed AI models using NVIDIA NIMs
\* Advanced RAG: Query Decomposition and Reasoning
\* Advanced RAG: Automated Structured Metadata Enrichment
\* Improving Retrieval with Auto-Merging and Hierarchical Document Retrieval
\* Build with Gemma and Haystack
\* Hacker News Summaries with Custom Components
\* Getting a Daily Digest From Tech Websites
SQL
\* Chat With Your SQL Database
Summarization
\* Legal Document Analysis with jina-embeddings-v2-base-en
Vector Databases
\* Chroma Indexing and RAG Examples
Web-QA
\* Agentic RAG with Llama 3.2 3B
\* LinkedIn, Company Intelligence & Lead Enrichment with Haystack, MongoDB Atlas, and Bright Data
\* Crawl Website Content for Question Answering with Apify
\* RAG: Web Search and Analysis with Apify and Haystack
\* Web QA with Mixtral-8x7B-Instruct-v0.1

### Advanced Prompt Customization for Anthropic

Open in Colab Download LastUpdated:March3,2026
*Notebook by Bilge Yucel ( LI & X (Twitter))*
In this example, we'll create a RAG application using prompting techniques in Anthropic's Prompt Engineering Guide. This application will use Anthropic Claude 3 models and Haystack to extract relevant quotes from given documents and generate an answer based on extracted quotes.
**📚 Useful Sources:**
\* Docs: AnthropicChatGenerator
\* Integration: Anthropic

#### Setup the Development Environment

Install antropic-haystack package and other required packages with pip:

```
!pip install anthropic-haystack "datasets>=2.6.1" "sentence-transformers>=3.0.0"
Copy
```

You need an ANTHROPIC\_API\_KEY to work with Claude models. Get your API key here

```
import os
from getpass import getpass

os.environ["ANTHROPIC_API_KEY"] = getpass("Enter the ANTHROPIC_API_KEY: ")
Copy
```

```
Enter the ANTHROPIC_API_KEY: ··········
```

#### Download the Dataset

We'll use the bilgeyucel/seven-wonders dataset on Hugging Face

```
from datasets import load_dataset
from haystack import Document

dataset = load_dataset("bilgeyucel/seven-wonders", split="train")
docs = [Document(content=doc["content"], meta=doc["meta"]) for doc in dataset]
Copy
```

#### Create Embeddings and Index into the DocumentStore

```
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.embedders import SentenceTransformersDocumentEmbedder

document_store = InMemoryDocumentStore()

doc_embedder = SentenceTransformersDocumentEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")

docs_with_embeddings = doc_embedder.run(docs)
document_store.write_documents(docs_with_embeddings["documents"])
Copy
```

#### Build the Prompt

Claude models are familiar with prompts that contain XML tags, as they were exposed to such prompts during training. By wrapping key parts of the prompt (such as instructions, examples, or input data) in XML tags, we can help Claude better understand the context and generate more accurate outputs.
To formulate a prompt that first extracts quotes from relevant documents and then refers to these quotes to generate the answer, follow these steps in your prompt:
1. Place retrieved documents between tags.
1. Render each document between tags, including a document index for Claude to reference later.
1. Instruct Claude to extract quotes within tags, including document index information.
1. Ensure that Claude generates the answer between tags.

```
prompt = """
Here is a document, in <document></document> XML tags:

<documents>
{% for document in documents %}
 <document index="{{loop.index}}">
  {{document.content}}
  </document>
{% endfor %}
</documents>

First, extract, word-for-word, any quotes relevant to the question, enclose the full list of quotes in <quotes></quotes> XML tags with the corresponding document index and use these quotes to an answer to the question.

If there are no quotes in this document that seem relevant to this question, please say "I can't find any relevant quotes".

Then, answer the question in <answer></answer> tags. Do not include or reference quoted content verbatim in the answer. Ensure that your answer is accurate and doesn't contain any information not directly supported by the quotes. Make references to quotes relevant to each section of the answer solely by adding their bracketed numbers at the end of relevant sentences

Here is the question: {{question}}
"""
Copy
```

The rendered prompt should look like this when it's fed with relevant documents and the question:

```
Here is a document, in <document></document> XML tags:

<documents>
<document index="1">
  (the text content of the first document)
</document>
<document index="2">
  (the text content of the second document)
</document>
<document index="3">
  (the text content of the third document)
</document>
...
</documents>

First, extract, word-for-word, any quotes relevant to the question, enclose the full list of quotes in <quotes></quotes> XML tags with the corresponding document index and use these quotes to an answer to the question.

If there are no quotes in this document that seem relevant to this question, please say "I can't find any relevant quotes".

Then, answer the question in <answer></answer> tags. Do not include or reference quoted content verbatim in the answer. Ensure that your answer is accurate and doesn't contain any information not directly supported by the quotes. Make references to quotes relevant to each section of the answer solely by adding their bracketed numbers at the end of relevant sentences

Here is the question: (user question)
Copy
```

And in return, Claude's response should look like this:

```
<quotes>
<quote index="1">Large numbers of people came to Ephesus in March and in the beginning of May to attend the main Artemis Procession.</quote>
<quote index="2">The Temple of Artemis or Artemision (Greek: Ἀρτεμίσιον; Turkish: Artemis Tapınağı), also known as the Temple of Diana, was a Greek temple dedicated to an ancient, local form of the goddess Artemis (identified with Diana, a Roman goddess).</quote>
</quotes>

<answer>
According to the documents, people visited the Temple of Artemis in Ephesus primarily for religious reasons to attend festivals and processions dedicated to the goddess Artemis (also known as Diana). The temple was dedicated to an ancient local form of the goddess and held a main Artemis Procession in March and early May that drew large crowds. [1] The temple was considered an important religious site for the worship of Artemis in the Greek world. [2] People likely traveled there to make offerings, participate in rituals, and celebrate the goddess during major festivals and ceremonies held at the sacred site.
</answer>
Copy
```

#### Initialize RAG Pipeline Components

Initialize components required for a RAG pipeline:
\* SentenceTransformersTextEmbedder: to create embeddings using for the query using sentence-transformers models
\* InMemoryEmbeddingRetriever: to retrieve relevant documents
\* ChatPromptBuilder: to construct prompts by processing ChatMessage objects
\* AnthropicChatGenerator: to use chat completion API of Anthropic Claude models, we'll use claude-3-sonnet-20240229 for this example

```
from haystack.components.builders import ChatPromptBuilder
from haystack_integrations.components.generators.anthropic import AnthropicChatGenerator
from haystack.dataclasses import ChatMessage
from haystack.components.embedders import SentenceTransformersTextEmbedder
from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever

text_embedder = SentenceTransformersTextEmbedder(model="sentence-transformers/all-MiniLM-L6-v2")
retriever = InMemoryEmbeddingRetriever(document_store)

messages = [
    ChatMessage.from_system("You are an expert who answers questions based on the given documents."),
    ChatMessage.from_user(prompt),
]

prompt_builder = ChatPromptBuilder(template=messages, required_variables="*")
llm = AnthropicChatGenerator(model="claude-3-sonnet-20240229")
Copy
```

```
WARNING:haystack.components.builders.chat_prompt_builder:ChatPromptBuilder has 2 prompt variables, but `required_variables` is not set. By default, all prompt variables are treated as optional, which may lead to unintended behavior in multi-branch pipelines. To avoid unexpected execution, ensure that variables intended to be required are explicitly set in `required_variables`.
```

#### Build the RAG Pipeline

Learn how to build a pipeline in Creating Pipelines.

```
from haystack import Pipeline

rag_with_quotes = Pipeline()
# Add components to your pipeline
rag_with_quotes.add_component("text_embedder", text_embedder)
rag_with_quotes.add_component("retriever", retriever)
rag_with_quotes.add_component("prompt_builder", prompt_builder)
rag_with_quotes.add_component("llm", llm)

# Now, connect the components to each other
rag_with_quotes.connect("text_embedder.embedding", "retriever.query_embedding")
rag_with_quotes.connect("retriever", "prompt_builder.documents")
rag_with_quotes.connect("prompt_builder", "llm")
Copy
```

#### Test Different Questions

```
question = "Why were people visiting the Temple of Artemis?" # @param ["Why were people visiting the Temple of Artemis?", "How did Colossus of Rhodes collapse?", "What is the importance of Colossus of Rhodes?", "Why did people build Great Pyramid of Giza?", "What does Rhodes Statue look like?"]

result = rag_with_quotes.run(
    data={
        "text_embedder" : {"text": question},
        "retriever" : {"top_k": 5},
        "prompt_builder": {"question": question},
    }
)
Copy
```

```
Batches:   0%|          | 0/1 [00:00<?, ?it/s]
```

```
print(result["llm"]["replies"][0].text)
Copy
```

```
<quotes>
<quote index="1">Large numbers of people came to Ephesus in March and in the beginning of May to attend the main Artemis Procession.</quote>
<quote index="3">The fame of the Temple of Artemis was known in the Renaissance, as demonstrated in this imagined portrayal of the temple in a 16th-century hand-colored engraving by Martin Heemskerck.</quote>
</quotes>

<answer>
People visited the Temple of Artemis primarily for religious purposes, to participate in the Artemis Procession held in March and May each year. [1] The Temple of Artemis was a famous and renowned structure, known even in the Renaissance period, attracting visitors from far and wide to witness its splendor and attend worship services and festivals dedicated to the goddess Artemis. [3] Its prominence as one of the Seven Wonders of the Ancient World also likely drew many visitors seeking to experience the architectural marvel.
</answer>
```

##### Extract the Quotes

```
import re

re.findall(r'<quote .*?>([\s\S]*?)<\/quote>', result["llm"]["replies"][0].text)
Copy
```

```
['Large numbers of people came to Ephesus in March and in the beginning of May to attend the main Artemis Procession.',
 'The fame of the Temple of Artemis was known in the Renaissance, as demonstrated in this imagined portrayal of the temple in a 16th-century hand-colored engraving by Martin Heemskerck.']
```

##### Extract the Answer

```
import re

re.findall(r'<answer>([\s\S]*?)<\/answer>', result["llm"]["replies"][0].text)
Copy
```

```
['\nPeople visited the Temple of Artemis primarily for religious purposes, to participate in the Artemis Procession held in March and May each year. [1] The Temple of Artemis was a famous and renowned structure, known even in the Renaissance period, attracting visitors from far and wide to witness its splendor and attend worship services and festivals dedicated to the goddess Artemis. [3] Its prominence as one of the Seven Wonders of the Ancient World also likely drew many visitors seeking to experience the architectural marvel.\n']
```

Stars | 24.7k
Edit on Github Start a Discussion!
Build custom AI agents and RAG applications with smart context engineering, powered by open AI orchestration.
© 2026 deepset GmbH. All rights reserved. Privacy Settings Privacy Imprint
\* Community
\* Events
\* GitHub Discussions
\* Discord
\* Hugging Face
\* Resources
\* Docs
\* Tutorials
\* Cookbook
\* Release Notes
\* Experiments
\* Company
\* About
\* Careers
Privacy Settings Privacy Imprint
© 2026 deepset GmbH. All rights reserved.
Privacy Settings
We use essential cookies to ensure our site functions properly. With your consent, we also use third-party cookies and tracking technologies to enhance your experience, personalize content and advertisements, and analyze site traffic. Click 'Accept All' to allow all cookies or 'Manage Preferences' to customize your choices or revoke your consent at any time.
Privacy Policy Terms and Conditions
Accept All
Manage Preferences
Powered by Usercentrics Consent Management
