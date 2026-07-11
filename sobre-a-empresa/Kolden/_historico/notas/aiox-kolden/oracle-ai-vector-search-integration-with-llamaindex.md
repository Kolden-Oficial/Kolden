---
id_fonte: "58853e12-eae6-4fad-b867-314bda8a21b1"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Oracle AI Vector Search Integration with LlamaIndex"
tipo: "unknown"
url_original: "https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/oracle-ai-vector-search-integration-llamaindex.html"
keywords: "('Oracle AI Database', 'LlamaIndex Integration', 'Vector Search', 'Embedding Generation', 'RAG Pipeline')"
summary: "This documentation explains how **Oracle AI Vector Search** connects with **LlamaIndex** to bridge the gap between large language models and proprietary data. By serving as a **vector store**, Oracle allows users to house complex mathematical embeddings alongside traditional business records, enabling **unified queries** that combine structured and unstructured information. The text outlines a comprehensive **RAG pipeline** that handles everything from sophisticated document chunking and embedding generation to high-speed similarity searches using native SQL. Ultimately, this integration empowers developers to build **enterprise-grade AI applications** that benefit from Oracle’s robust security and scalability while utilizing LlamaIndex to facilitate intelligent data retrieval."
extraido_em: "2026-06-30T16:21:30Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Oracle AI Vector Search Integration with LlamaIndex

Oracle AI Vector Search Integration with LlamaIndex
\* Skip to Content
\* Skip to Search
\* Home
\* Cloud Applications
\* Cloud Applications
\* Fusion Applications Suite
\* NetSuite Applications
\* Industry-Specific Applications
\* Cloud Applications Readiness
\* Cloud Infrastructure
\* Cloud Infrastructure
\* Get Started
\* Free Tier
\* Government Cloud
\* Services
\* Developer Resources
\* Security
\* More Resources
\* Launch Infrastructure Console
\* All Cloud Infrastructure
\* On Premises Applications
\* On-Premises Applications
\* Fusion Applications On Premises
\* Enterprise Performance Management
\* eBusiness
\* PeopleSoft
\* Siebel
\* JD Edwards
\* All Applications
\* Middleware
\* Middleware
\* Business Inteligence
\* Data Integrator
\* Enterprise Manager
\* GoldenGate
\* Identity Manager
\* JavaScript Extension Toolkit
\* Platform Security Services
\* SOA Suite
\* WebCenter
\* WebLogic Server
\* All Middleware
\* Database
\* Database
\* Oracle AI Database
\* Autonomous AI Database
\* Oracle APEX
\* Oracle GoldenGate
\* Oracle Essbase
\* Oracle NoSQL
\* Big Data
\* Enterprise Manager
\* All Database Related Products
\* Engineered Systems
\* Engineered Systems
\* Advanced Support Gateway
\* Autonomous Health Checks And Diagnostics
\* Big Data Appliance
\* Database Appliance
\* Enterprise Manager
\* Exadata Database Machine
\* Exalogic Elastic Cloud
\* Exalytics In-Memory Machine
\* MiniCluster
\* Private Cloud Appliance
\* SuperCluster
\* Zero Data Loss Recovery Appliance
\* ZFS Storage Appliance
\* All Engineered Systems
\* Java
\* Java
\* Java EE
\* Java Embedded
\* Java SE
\* All Java
\* systems
\* Systems
\* networking
\* servers
\* storage
\* All Systems
\* Operating Systems
\* Operating Environments
\* Operating Systems
\* Virtualization
\* All Operating Environments
\* Virtualization
\* Virtualization
\* Oracle Linux Virtualization Manager
\* Oracle VM
\* Oracle VM VirtualBox
\* Secure Global Desktop
\* All Virtualization
\* Industry-Specific Applications
\* Industry-Specific Applications
\* Communications
\* Construction And Engineering
\* Digital Government
\* Financial Services
\* Food And Beverage
\* Health
\* Health Sciences
\* Hospitality
\* Insurance
\* Public Sector
\* Retail
\* State And Local
\* Utilities
\* All Industries
\* architecture Center
\* Architecture Center
\* Reference Architectures
\* solution Playbooks
\* built And Deployed
\* All Architecture Center
\* All Tutorials
\* All Services And Products
\* Help Center Home
\* Oracle.com Home
\* Get Started Cloud
Help Center
AI Vector Search User's Guide
Search is scoped to:
AI Vector Search User's Guide
No matching results
Try a different search query.
Search Unavailable
We are making updates to our Search system right now. Please try again later.

###### Oracle Account

```
*  Account
    *  Help
    *  Sign Out
```

###### Oracle Account

Manage your account and access personalized content. Sign up for an Oracle Account Sign in to my Account

###### Sign in to Cloud

Access your cloud dashboard, manage orders, and more. Free Cloud Platform Trial Sign in to Cloud
1. Database/
1. Oracle/
1. Oracle Database/
1. Release 26
Oracle AI Vector Search User's Guide
Table of Contents
Share on LinkedIn Share on X Share on Facebook Share on Email

#### Oracle AI Vector Search Integration with LlamaIndex

LlamaIndex is an open-source data framework designed to simplify the process of building applications that leverage large language models (LLMs) with custom data. Basically, LlamaIndex acts as a bridge between custom data sources and LLMs such as Cohere Command models or OpenAI GPTs models.
Oracle AI Vector Search is integrated with LlamaIndex in several ways to enable powerful semantic search and retrieval capabilities.
Here are the key aspects of this integration:
\* Embedding Generation Oracle AI Vector Search provides embedding capabilities that can be used with LlamaIndex:
\* The OracleEmbeddings class from LlamaIndex can be used to generate embeddings using Oracle's embedding models.
\* Multiple embedding methods are supported, including locally-hosted ONNX models and third-party APIs such as Generative AI and Hugging Face.
\* Embeddings can be generated for documents and queries to enable semantic similarity search. For more information on how to use this integration for generating embeddings, see Oracle AI Vector Search: Use Embedding Generation Capabilities.
\* Vector Storage LlamaIndex can leverage Oracle AI Database as a vector store:
\* Vector embeddings can be stored alongside business data in Oracle AI Database tables using the VECTOR data type.
\* This allows combining semantic search on unstructured data with relational queries on structured data in a single system. For more information on how to use this integration for vector storage, see Oracle AI Vector Search: Use Vector Storage Capabilities.
\* Indexing and Search You can utilize Oracle's vector indexing and search capabilities:
\* Vector indexes can be created on the embeddings to enable fast similarity search.
\* LlamaIndex can use Oracle's native SQL operations for similarity search to retrieve relevant data.
\* Various distance metrics, such as dot product, cosine similarity, Euclidean distance, and more are supported. For more information about how to use this integration for indexing and search, see Oracle AI Vector Search: Use Document Processing Capabilities and Oracle AI Vector Search: End-to-End Pipeline with Document Processing.
\* RAG Pipeline Integration The integration enables building end-to-end Retrieval Augmented Generation (RAG) pipelines. You can embed and store unstructured data in Oracle AI Database. LlamaIndex can query the vector store to retrieve relevant context. The retrieved information can be used to generate prompts for LLMs. LlamaIndex provides several libraries and classes to integrate Oracle AI Vector Search capabilities. Here are the key components available:
\* OracleEmbeddings : Supports multiple embedding methods, including locally hosted ONNX models and third-party APIs such as Generative AI and Hugging Face.
\* OracleReader : Used for loading documents from various sources, including Oracle AI Database.
\* OracleSummary : Provides functionality for summarizing documents within or outside the database.
\* OracleTextSplitter : Offers advanced Oracle capabilities for chunking documents according to different requirements.
\* OraLlamaVS : Used for storing, indexing, and querying vector embeddings. For more information about how to use this integration for building end-to-end RAG pipelines, see Oracle AI Vector Search: End-to-End Pipeline with Document Processing.
Benefits
The Oracle AI Vector Search integration with LlamaIndex provides a powerful foundation for developing sophisticated AI applications that can leverage both structured and unstructured data within the Oracle ecosystem.
By integrating Oracle AI Vector Search with LlamaIndex, developers can:
\* Leverage Oracle AI Database's enterprise features such as scalability, security, and transactions.
\* Combine semantic search with relational queries in one single system.
\* Utilize Oracle's optimized vector operations for efficient similarity search.
\* Build AI-powered applications using familiar SQL and PL/SQL interfaces.
Previous Page
Next Page
Was this page helpful?
Tell us how to improve
\* © Oracle
\* About Oracle
\* Contact Us
\* Products A-Z
\* Terms of Use & Privacy
\* Cookie Preferences
\* Ad Choices
Expand All
\* Title and Copyright Information
\* Preface
\* 1 What's New for Oracle AI Vector Search
\* 2 Overview
\* 3 Get Started
\* 4 Generate Vector Embeddings
\* 5 Store Vector Embeddings
\* 6 Create Vector Indexes and Hybrid Vector Indexes
\* 7 Use SQL Functions for Vector Operations
\* 8 Query Data With Similarity and Hybrid Searches
\* 9 Work with LLM-Powered APIs and Retrieval Augmented Generation
\* Use LLM-Powered APIs to Generate Summary and Text
\* Use Retrieval Augmented Generation to Complement LLMs
\* About Retrieval Augmented Generation
\* SQL RAG Example
\* Oracle AI Vector Search Integration with LangChain
\* Oracle AI Vector Search Integration with LlamaIndex
\* Use Reranking for Better RAG Results
\* Supported Third-Party Provider Operations and Endpoints
\* 10 Supported Clients and Languages
\* 11 Vector Diagnostics
\* 12 Vector Search PL/SQL Packages
\* A Python Classes to Convert Pretrained Models to ONNX Models (Deprecated)
\* Glossary
