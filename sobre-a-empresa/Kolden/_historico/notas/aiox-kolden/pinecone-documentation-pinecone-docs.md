---
id_fonte: "2217f380-3ef0-4855-b1d3-2386a6ca378a"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Pinecone documentation - Pinecone Docs"
tipo: "unknown"
url_original: "https://docs.pinecone.io/guides/get-started/overview"
keywords: "('Vector database', 'Semantic search', 'Data ingestion', 'Index management', 'Integrated embedding')"
summary: "Pinecone serves as a specialized **vector database** designed to facilitate the creation of high-performance **AI applications** through efficient data retrieval. The documentation outlines a comprehensive framework for managing information, offering users the choice between **integrated embedding** workflows, where the platform handles vector generation, or manual ingestion of pre-calculated data. By supporting both **semantic and lexical search**, the system enables developers to achieve high precision through advanced techniques like **metadata filtering and result reranking**. Ultimately, the guide provides a structured roadmap for transitioning from initial **data modeling** to full-scale production, ensuring that large-scale AI models remain both accurate and cost-effective."
extraido_em: "2026-06-30T16:21:34Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Pinecone documentation - Pinecone Docs

Pinecone documentation - Pinecone Docs
Skip to main content
Pinecone Docs home page
Search...
Ctrl K
\* Status
\* Support
\* Log In
\* Sign up free
\* Sign up free
Search...
Navigation
Get started
Pinecone documentation
Guides
Reference
Examples
Models
Integrations
Troubleshooting
Releases
Pinecone Database

###### Get started

```
*  Overview
*  Quickstart
*  IDEs & CLIs
*  Test at scale
*  Concepts
*  Architecture
```

###### Index data

```
*  Overview
*  Create an index
*  Data modeling
*  Data ingestion
*  Implement multitenancy
*  Dedicated Read Nodes
```

###### Search

```
*  Overview
*  Semantic search
*  Lexical search
*  Hybrid search
*  Full-text search
*  Filter by metadata
*  Rerank results
```

###### Optimize

```
*  Increase relevance
*  Increase throughput
*  Decrease latency
```

###### Manage data

```
*  Target an index
*  Manage indexes
*  Manage namespaces
*  Manage backups
*  Update records
*  Delete records
*  Fetch records
*  List record IDs
```

###### Manage cost

```
*  Understanding cost
*  Manage cost
*  Monitor usage and costs
```

###### Move to production

```
*  Overview
*  Bring your own cloud (BYOC)
*  Enforce security
*  Error handling
*  Monitor performance
*  CI/CD
```

###### Admin

```
*  Manage billing
*  Manage organizations
*  Manage projects
```

###### Operations

```
*  Integrate with cloud storage
*  Integrate with AI agents
*  Local development
```

###### Using pods

```
*  Overview
*  Migrate a pod-based index to serverless
*  Choose a pod type
*  Create a pod-based index
*  Manage pod-based indexes
*  Scale pod-based indexes
*  Back up and restore
```

Get started

### Pinecone documentation

Copy page
Pinecone is the leading vector database for building accurate and performant AI applications at scale in production.
Copy page
[

#### Database quickstart

Set up a fully managed vector database for high-performance semantic search](<https://docs.pinecone.io/guides/get-started/quickstart>)
[

#### Assistant quickstart

Create an AI assistant that answers complex questions about your proprietary data](<https://docs.pinecone.io/guides/assistant/quickstart/sdk-quickstart>)

#### Workflows

```
*  Integrated embedding
*  Bring your own vectors
```

Use integrated embedding to upsert and search with text and have Pinecone generate vectors automatically.
1
Create an index
Create an index that is integrated with one of Pinecone's hosted embedding models. Dense indexes and vectors enable semantic search, while sparse indexes and vectors enable lexical search.
2
Prepare data
Prepare your data for efficient ingestion, retrieval, and management in Pinecone.
3
Upsert text
Upsert your source text and have Pinecone convert the text to vectors automatically. Use namespaces to partition data for faster queries and multitenant isolation between customers.
4
Search with text
Search the index with a query text. Again, Pinecone uses the index's integrated model to convert the text to a vector automatically.
5
Improve relevance
Filter by metadata to limit the scope of your search, rerank results to increase search accuracy, or add lexical search to capture both semantic understanding and precise keyword matches.
If you use an external embedding model to generate vectors, you can upsert and search with vectors directly.
1
Generate vectors
Use an external embedding model to convert data into dense or sparse vectors.
2
Create an index
Create an index that matches the characteristics of your embedding model. Dense indexes and vectors enable semantic search, while sparse indexes and vectors enable lexical search.
3
Prepare data
Prepare your data for efficient ingestion, retrieval, and management in Pinecone.
4
Ingest vectors
Load your vectors and metadata into your index using Pinecone's import or upsert feature. Use namespaces to partition data for faster queries and multitenant isolation between customers.
5
Search with a vector
Use an external embedding model to convert a query text to a vector and search the index with the vector.
6
Improve relevance
Filter by metadata to limit the scope of your search, rerank results to increase search accuracy, or add lexical search to capture both semantic understanding and precise keyword matches.

#### Start building

[

#### IDEs & CLIs

Use Pinecone with agentic IDEs and CLIs like Claude Code, Gemini CLI, and Cursor.](<https://docs.pinecone.io/guides/get-started/ai-coding-tools>)
[

#### CLI

Command-line tool for managing Pinecone infrastructure and data.](<https://docs.pinecone.io/reference/cli/quickstart>)
[

#### API Reference

Comprehensive details about the Pinecone APIs, SDKs, utilities, and architecture.](<https://docs.pinecone.io/reference>)
[

#### Integrated Inference

Simplify vector search with integrated embedding and reranking.](<https://docs.pinecone.io/guides/index-data/indexing-overview#integrated-embedding>)
[

#### Examples

Hands-on notebooks and sample apps with common AI patterns and tools.](<https://docs.pinecone.io/examples>)
[

#### Integrations

Pinecone's growing number of third-party integrations.](<https://docs.pinecone.io/integrations/overview>)
[

#### Troubleshooting

Resolve common Pinecone issues with our troubleshooting guide.](<https://docs.pinecone.io/troubleshooting/contact-support>)
[

#### Releases

News about features and changes in Pinecone and related tools.](<https://docs.pinecone.io/release-notes>)
Was this page helpful?
Yes No
Quickstart
Ctrl+I
x linkedin youtube github
x
