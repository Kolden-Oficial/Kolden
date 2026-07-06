---
id_fonte: "56115e27-4f98-47dc-abab-a30810461419"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Learn How to Use Chroma DB: A Step-by-Step Guide | DataCamp"
tipo: "unknown"
url_original: "https://www.datacamp.com/tutorial/chromadb-tutorial-step-by-step-guide"
keywords: "('Vector databases', 'Chroma DB', 'Vector embeddings', 'Similarity search', 'RAG applications')"
summary: "This comprehensive guide introduces **Chroma DB**, an **open-source vector database** engineered specifically for the efficient storage and retrieval of **vector embeddings**. The text navigates the technical landscape of modern AI, explaining how these databases function as a critical foundation for **Large Language Models** and **Retrieval-Augmented Generation (RAG)** systems. Through a practical walkthrough, it covers essential operations such as **collection management**, semantic similarity searching, and the integration of diverse **embedding models** from providers like OpenAI and HuggingFace. Ultimately, the tutorial serves as a roadmap for developers to transition from basic text processing to building advanced, context-aware AI applications that leverage **unstructured data**."
extraido_em: "2026-06-30T16:20:40Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Learn How to Use Chroma DB: A Step-by-Step Guide | DataCamp

Learn How to Use Chroma DB: A Step-by-Step Guide | DataCamp
[

###### **Master the world's most popular programming language.** **All levels welcome.**

Register for Free](<https://events.datacamp.com/ai-powered-python>)
Skip to main content
EN
English Español Português Deutsch Beta Français Beta Italiano Beta Türkçe Beta Bahasa Indonesia Beta Tiếng Việt Beta Nederlands Beta हिन्दी Beta 日本語 Beta 한국어 Beta Polski Beta Română Beta Русский Beta Svenska Beta ไทย Beta 中文(简体) Beta
More Information
Found an Error?
Log in Get Started
Tutorials
Blogs
Tutorials
docs
Podcasts
Cheat Sheets
code-alongs
Newsletter
Category
Category
Technologies
Discover content by tools and technology
AI Agents AI News Artificial Intelligence AWS Azure Business Intelligence ChatGPT Databricks dbt Docker Excel Generative AI Git Google Cloud Platform Hugging Face Java Julia Kafka Kubernetes Large Language Models MongoDB MySQL NoSQL OpenAI PostgreSQL Power BI PySpark Python R Scala Snowflake Spreadsheets SQL SQLite Tableau
Category
Topics
Discover content by data science topics
AI for Business Big Data Career Services Cloud Data Analysis Data Engineering Data Literacy Data Science Data Visualization DataLab Deep Learning Machine Learning MLOps Natural Language Processing Vector Databases
Browse Courses
category
1. Home
1. Tutorials
1. Data Science

### Chroma DB Tutorial: A Step-By-Step Guide

With Chroma DB, you can easily manage text documents, convert text to embeddings, and do similarity searches.
Contents
Updated Mar 5, 2026
· 10 min read
Contents
\* TL;DR
\* What Are Vector Stores?
\* What is Chroma DB?
\* Chroma DB features
\* How does Chroma DB work?
\* Prerequisites
\* Getting Started With Chroma DB
\* Choosing a client mode
\* Embeddings
\* Filtering Query Results
\* Updating and Removing Data
\* Collection Management
\* ChromaDB With LangChain: A RAG Example
\* Conclusion
\* FAQs

#### Training more people?

Get your team access to the full DataCamp for business platform. For Business For a bespoke solution book a demo.
With the rise of large language models (LLMs) and their applications, we have seen an increase in the popularity of integration tools, LLMOps frameworks, and vector databases. This is because working with LLMs requires a different approach than working with traditional machine learning models.
One of the core enabling technologies for LLMs is vector embeddings. While computers cannot directly understand text, embeddings represent text numerically. All user-provided text is converted to embeddings, which are used to generate responses.
Converting text into embedding is a time-consuming process. To avoid that, we have vector databases explicitly designed for efficient storage and retrieval of vector embeddings.
In this tutorial, I'll walk through vector stores and Chroma DB, an open-source database for storing and managing embeddings. You'll learn how to add and remove documents, perform similarity searches, and convert text into embeddings.
*Image by author*

#### TL;DR

```
*  ChromaDB is an open-source vector database for storing and retrieving embeddings—install it with pip install chromadb
*  Use chromadb.PersistentClient(path="./chroma_db") for local persistence or chromadb.EphemeralClient() for in-memory testing
*  Create a  **collection**  (analogous to a table), then add() documents with optional metadata and IDs
*  Run semantic similarity search with collection.query(query_texts=["..."], n_results=5)
*  Plug in any embedding model—OpenAI, HuggingFace, Google Gemini, or a custom function
*  ChromaDB is widely used as the vector store in  **RAG (Retrieval-Augmented Generation)**  pipelines
```

#### What Are Vector Stores?

Vector stores are databases explicitly designed for efficiently storing and retrieving vector embeddings. They are needed because traditional databases like SQL are not optimized for storing and querying large vector data.
Embeddings represent data (usually unstructured data like text) in numerical vector formats within a high-dimensional space. Traditional relational databases are not well-suited to storing and searching these vector representations.
Vector stores can index and quickly search for similar vectors using similarity algorithms, which allows applications to find related vectors given a target vector query.
For example, in the case of a personalized chatbot, the user inputs a prompt for the generative AI model. Using a similarity search algorithm, the model searches for similar text within a collection of documents. The resulting information is then used to generate a highly personalized and accurate response. This retrieval of information is made possible through embedding and vector indexing within vector stores.

#### What is Chroma DB?

Chroma DB is an open-source vector store used for storing and retrieving vector embeddings. Its main use is to save embeddings along with metadata to be used later by large language models. Additionally, it can also be used for semantic search engines over text data.

##### **Chroma DB features**

```
*   **Simple and powerful:**
    *  Install with a simple command: pip install chromadb .
    *  Quick start with Python SDK, allowing for seamless integration and fast setup.
*   **Full-featured:**
    *   **Comprehensive retrieval features** : Includes vector search, full-text search, document storage, metadata filtering, and multi-modal retrieval.
    *   **Highly scalable** : Uses SQLite for local persistent storage and supports a client-server mode for multi-client and production deployments.
*   **Multi-language support:**
    *  Offers SDKs for popular programming languages, including  **Python** ,  **JavaScript/TypeScript** ,  **Ruby** ,  **PHP** , and  **Java** .
*   **Integrated:**
    *  Native integration with embedding models from HuggingFace, OpenAI, Google, and more.
    *  Compatible with Langchain and LlamaIndex, with more tool integrations coming soon.
*   **Open source** :
    *  Licensed under  **Apache 2.0** .
*   **Speed and simplicity:**
    *  Focuses on simplicity and speed, designed to make analysis and retrieval efficient while being intuitive to use.
```

Chroma DB offers a self-hosted server option. If you need a managed or cloud-native vector database, explore our guides on Mastering Vector Databases with Pinecone or Weaviate as alternative solutions.
*Image from Chroma*

##### How does Chroma DB work?

```
1. First, you have to create a collection similar to the tables in the relations database. By default, Chroma converts the text into the embeddings using all-MiniLM-L6-v2 , but you can modify the collection to use another embedding model.
1. Add text documents with metadata and a unique ID to the newly created collection. When your collection receives the text, it automatically converts it into embedding.
1. Query the collection by text or embedding to receive similar documents. You can also filter out results based on metadata.
```

#### Prerequisites

To follow this tutorial, you'll need:
\* **Python 3.8+** (Python 3.11 recommended for best ChromaDB compatibility)
\* **pip** package manager
\* An **OpenAI API key** (required only for the Embeddings section; the core ChromaDB sections work without it)
\* SQLite 3.35 or higher (built into Python 3.11; if you're on an older version and hit issues, use pip install pysqlite3-binary )
\* Basic familiarity with Python lists and dictionaries

#### Getting Started With Chroma DB

In this section, I'll create a vector database, add a collection, load text into it, and run a similarity search query.
First, install chromadb and openai . You'll need an OpenAI API key only for the Embeddings section—the core ChromaDB examples below work without one.
**Note:** Chroma requires SQLite version 3.35 or higher. If you experience problems, either upgrade to Python 3.11 or install an older version of chromadb .

```
!pip install chromadb openai 
Powered By 
Was this AI assistant helpful? Yes No
```

##### Choosing a client mode

ChromaDB provides three client modes depending on your use case:
| Client | Use case | Code |
| ------ | ------ | ------ |
| **EphemeralClient** | In-memory testing; data lost on exit | chromadb.EphemeralClient() |
| **PersistentClient** | Local file storage; data persists across restarts | chromadb.PersistentClient(path="./chroma\_db") |
| **HttpClient** | Production; connects to a running ChromaDB server | chromadb.HttpClient(host="localhost", port=8000) |

You can create an in-memory (ephemeral) database for testing using chromadb.EphemeralClient() . This stores data only in memory and resets when the program ends—perfect for quick experiments.
In this example, I'll create a persistent database stored in the ./chroma\_db directory. ChromaDB uses SQLite-backed storage in persistent mode—the DuckDB backend was removed in ChromaDB 0.4.0.

```
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
Powered By
```

After that, we will create a collection object using the client. It is similar to creating a table in a traditional database.

```
collection = client.create_collection(name="Students")
Powered By 
Was this AI assistant helpful? Yes No
```

To add text to our collection, we will generate random text about a student, club, and university. You can generate random text using ChatGPT.

```
student_info = """
Alexandra Thompson, a 19-year-old computer science sophomore with a 3.7 GPA,
is a member of the programming and chess clubs who enjoys pizza, swimming, and hiking
in her free time in hopes of working at a tech company after graduating from the University of Washington.
"""

club_info = """
The university chess club provides an outlet for students to come together and enjoy playing
the classic strategy game of chess. Members of all skill levels are welcome, from beginners learning
the rules to experienced tournament players. The club typically meets a few times per week to play casual games,
participate in tournaments, analyze famous chess matches, and improve members' skills.
"""

university_info = """
The University of Washington, founded in 1861 in Seattle, is a public research university
with over 45,000 students across three campuses in Seattle, Tacoma, and Bothell.
As the flagship institution of the six public universities in Washington state,
UW encompasses over 500 buildings and 20 million square feet of space,
including one of the largest library systems in the world.
"""
Powered By
```

Now, we will use the add() function to add text data with metadata and unique IDs. After that, Chroma will automatically download the all-MiniLM-L6-v2 model to convert the text into embeddings and store it in the "Students" collection.

```
collection.add(
    documents = [student_info, club_info, university_info],
    metadatas = [{"source": "student info"},{"source": "club info"},{'source':'university info'}],
    ids = ["id1", "id2", "id3"]
)
Powered By 
Was this AI assistant helpful? Yes No
```

To run a similarity search, you can use the query() function and ask questions in natural language. It will convert the query into embedding and use similarity algorithms to generate similar results. In our case, it is returning two similar results.

```
results = collection.query(
    query_texts=["What is the student name?"],
    n_results=2
)

results
Powered By 
Was this AI assistant helpful? Yes No
```

#### Embeddings

You can use any high-performing embedding model from the embedding list. You can even create your custom embedding functions. For a deep dive into OpenAI's current generation models, see our guide on text-embedding-3-large.
In this section, I'll use OpenAI's text-embedding-3-small model to convert text into embeddings. This is OpenAI's recommended replacement for the legacy text-embedding-ada-002 —it delivers better benchmark performance at 5× lower cost.
After creating the OpenAI embedding function, you can add the list of text documents to generate embeddings.
Discover how to use the OpenAI API for Text Embeddings and create text classifiers, information retrieval systems, and semantic similarity detectors.

```
from chromadb.utils import embedding_functions

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="YOUR_OPENAI_API_KEY",
    model_name="text-embedding-3-small"
)
students_embeddings = openai_ef([student_info, club_info, university_info])
print(students_embeddings)
Powered By
```

```
[[-0.01015068031847477, 0.0070903063751757145, 0.010579396970570087, -0.04118313640356064, 0.0011583581799641252, 0.026857420802116394,....],]
Powered By 
Was this AI assistant helpful? Yes No
```

Instead of using the default embedding model, I'll load the embeddings already generated directly into a new collection.
1. We will use the get\_or\_create\_collection() function to create a new collection called "Students2". This function is different from create\_collection() . It will get a collection or create if it doesn't exist already.
1. We will now add embedding, text documents, metadata, and IDs to our newly created collection.

```
collection2 = client.get_or_create_collection(name="Students2")

collection2.add(
    embeddings = students_embeddings,
    documents = [student_info, club_info, university_info],
    metadatas = [{"source": "student info"},{"source": "club info"},{'source':'university info'}],
    ids = ["id1", "id2", "id3"]
)
Powered By 
Was this AI assistant helpful? Yes No
```

There is another, more straightforward method, too. You can add an OpenAI embedding function while creating or accessing the collection. Apart from OpenAI, you can use Cohere, Google Gemini, HuggingFace, and Instructor models.
In our case, adding new text documents will run an OpenAI embedding function instead of the default model to convert text into embeddings.

```
collection2 = client.get_or_create_collection(name="Students2",embedding_function=openai_ef)

collection2.add(
    documents = [student_info, club_info, university_info],
    metadatas = [{"source": "student info"},{"source": "club info"},{'source':'university info'}],
    ids = ["id1", "id2", "id3"]
)
Powered By 
Was this AI assistant helpful? Yes No
```

Let's see the difference by running a similar query on the new collection.

```
results = collection2.query(
    query_texts=["What is the student name?"],
    n_results=2
)

results
Powered By 
Was this AI assistant helpful? Yes No
```

Our results have improved. The similarity search now returns information about the university instead of a club. Additionally, the distance between the vectors is lower than the default embedding model, which is a good thing.

#### Filtering Query Results

ChromaDB supports metadata filtering to narrow down similarity search results. Use the where parameter with filter operators inside query() :

```
results = collection.query(
    query_texts=["What is the student name?"],
    n_results=2,
    where={"source": "student info"}  # only return documents with this metadata
)

# Combine multiple filters with $and / $or
results = collection.query(
    query_texts=["university"],
    n_results=5,
    where={
        "$or": [
            {"source": "student info"},
            {"source": "university info"}
        ]
    }
)
Powered By
```

Supported operators: $eq , $ne , $gt , $gte , $lt , $lte , $in , $nin , $and , $or . You can also filter on document content with where\_document={"$contains": "chess"} .

#### Updating and Removing Data

Just like relational databases, you can update or remove the values from the collections. To update the text and metadata, we will provide the specific ID for the record and new text.

```
collection2.update(
    ids=["id1"],
    documents=["Kristiane Carina, a 19-year-old computer science sophomore with a 3.7 GPA"],
    metadatas=[{"source": "student info"}],
)
Powered By 
Was this AI assistant helpful? Yes No
```

Run a simple query to check if the changes have been made successfully.

```
results = collection2.query(
    query_texts=["What is the student name?"],
    n_results=2
)

results
Powered By 
Was this AI assistant helpful? Yes No
```

As we can see, instead of Alexandra, we got Kristiane.
To remove a record from the collection, we will use the delete() function and specify a unique ID.

```
collection2.delete(ids = ['id1'])


results = collection2.query(
    query_texts=["What is the student name?"],
    n_results=2
)

results
Powered By 
Was this AI assistant helpful? Yes No
```

The student information text has been removed; instead of that, we get the next best results.

#### Collection Management

In this section, I'll cover the collection utility functions for counting, listing, renaming, and deleting collections.
We will create a new collection called "vectordb" and add the information about the Chroma DB cheat sheet, documentation, and JS API with metadata.

```
vector_collections = client.create_collection("vectordb")


vector_collections.add(
    documents=["This is Chroma DB CheatSheet",
               "This is Chroma DB Documentation",
               "This document Chroma JS API Docs"],
    metadatas=[{"source": "Chroma Cheatsheet"},
    {"source": "Chroma Doc"},
    {'source':'JS API Doc'}],
    ids=["id1", "id2", "id3"]
)
Powered By 
Was this AI assistant helpful? Yes No
```

We will use the count() function to check how many records the collection has.

```
vector_collections.count()
Powered By 
Was this AI assistant helpful? Yes No
```

```
3
Powered By 
Was this AI assistant helpful? Yes No
```

To view all the records from the collection, use the get() function.

```
vector_collections.get()
Powered By 
Was this AI assistant helpful? Yes No
```

```
{'ids': ['id1', 'id2', 'id3'],
 'embeddings': None,
 'documents': ['This is Chroma DB CheatSheet',
  'This is Chroma DB Documentation',
  'This document Chroma JS API Docs'],
 'metadatas': [{'source': 'Chroma Cheatsheet'},
  {'source': 'Chroma Doc'},
  {'source': 'JS API Doc'}]}
Powered By 
Was this AI assistant helpful? Yes No
```

To change the collection name, use the modify() function. To view all collection names, use list\_collections() .

```
vector_collections.modify(name="chroma_info")

# list all collections
client.list_collections()
Powered By 
Was this AI assistant helpful? Yes No
```

It appears that we have effectively renamed "vectordb" as "chroma\_info".

```
[Collection(name=Students),
 Collection(name=Students2),
 Collection(name=chroma_info)]
Powered By 
Was this AI assistant helpful? Yes No
```

To access any new collection, you can use get\_collection() with the collection's name.

```
vector_collections_new = client.get_collection(name="chroma_info")
Powered By 
Was this AI assistant helpful? Yes No
```

We can delete a collection using the client function delete\_collection() and specify the collection name.

```
client.delete_collection(name="chroma_info")
client.list_collections()
Powered By 
Was this AI assistant helpful? Yes No
```

```
[Collection(name=Students), Collection(name=Students2)]
Powered By 
Was this AI assistant helpful? Yes No
```

We can delete the entire database collection by using client.reset() . However, it is not recommended as there is no way to restore the data after deletion.

```
client.reset()
client.list_collections()
Powered By 
Was this AI assistant helpful? Yes No
```

```
[]
Powered By 
Was this AI assistant helpful? Yes No
```

#### ChromaDB With LangChain: A RAG Example

One of the most common ChromaDB integrations is with LangChain to build RAG applications. Here's a minimal example using ChromaDB as the vector store:

```
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document

# Initialize embedding model and vector store
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = Chroma(
    collection_name="rag_docs",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

# Add documents
docs = [
    Document(page_content="ChromaDB stores vector embeddings", metadata={"source": "doc1"}),
    Document(page_content="LangChain simplifies LLM application development", metadata={"source": "doc2"}),
]
vector_store.add_documents(docs)

# Similarity search
results = vector_store.similarity_search("vector database", k=2)
for doc in results:
    print(doc.page_content)
Powered By
```

For a full production-ready RAG pipeline with FastAPI, see our Building a RAG System with LangChain and FastAPI tutorial. For an example using DeepSeek, see our DeepSeek R1 RAG Chatbot with Chroma tutorial.

#### Conclusion

Vector stores like Chroma DB are becoming essential components of large language model systems. By providing specialized storage and efficient retrieval of vector embeddings, they enable fast access to relevant semantic information to power LLMs.
In this Chroma DB tutorial, we covered the basics of creating a collection, adding documents, converting text to embeddings, querying for semantic similarity, and managing the collections.
The natural next step is building a Retrieval-Augmented Generation (RAG) application with ChromaDB as the vector store. Start with our Building a RAG System with LangChain and FastAPI tutorial for a production-ready pipeline, or explore Agentic RAG for advanced agent-driven retrieval workflows. You can also use LlamaIndex to ingest private data into LLMs, or follow the LangChain LLM tutorial for full application development.

#### FAQs

##### Can Chroma DB handle non-text data, such as images or audio, for embedding storage and retrieval?

Yes, ChromaDB can store embeddings for any data type—not just text. If you generate embeddings from images, audio, or other unstructured data using a multimodal model, you can store and query them exactly as you would text embeddings. Pass your pre-computed embedding vectors directly using the embeddings parameter in collection.add() . The retrieval and filtering logic works identically regardless of the embedding source.

##### Is it possible to update only the metadata of a document without modifying its embeddings in Chroma DB?

Yes. When calling collection.update() , you can pass only the ids and metadatas parameters while omitting documents and embeddings . ChromaDB will update the metadata in place without re-generating embeddings. You can also use collection.upsert() which updates an existing document or inserts it if it does not exist.

##### How does Chroma DB compare with Pinecone for handling large-scale deployments?

ChromaDB is open-source and self-hosted, giving you full control over your data and infrastructure. For large-scale local or cloud deployments, you can run ChromaDB in server mode ( HttpClient ) and scale it independently. Pinecone, by contrast, is a fully managed cloud service with automatic scaling and a serverless tier, which makes it simpler to operate but comes with vendor lock-in and usage-based costs.
If you want control and want to avoid SaaS costs, ChromaDB is a strong choice. If you prioritize zero-ops infrastructure, Pinecone may be preferable. See our Pinecone tutorial and Weaviate tutorial for comparisons.

##### Can I use custom embeddings generated by a different model in Chroma DB?

Absolutely. ChromaDB lets you supply pre-computed embeddings directly using the embeddings parameter in collection.add() . You can also pass a custom embedding function when creating a collection via embedding\_function=your\_function —ChromaDB will call this automatically whenever you add or query documents.
Built-in embedding functions include OpenAI ( text-embedding-3-small , text-embedding-3-large ), HuggingFace Sentence Transformers, Cohere, and Google Gemini, among others.

##### What happens if I delete a collection by mistake? Can I recover it?

Unfortunately, collection deletion in ChromaDB is permanent. The delete\_collection() and reset() functions remove data immediately with no built-in undo. For PersistentClient , the underlying SQLite files are deleted from disk.
Best practice: back up your ChromaDB data directory ( ./chroma\_db/ ) before running destructive operations. You can also export collection data to JSON or a DataFrame before deleting, or test destructive operations against an EphemeralClient() first.

##### What is the difference between ChromaDB's EphemeralClient, PersistentClient, and HttpClient?

ChromaDB provides three client modes: EphemeralClient() stores data only in memory and is ideal for testing—all data is lost when the script ends. PersistentClient(path='./chroma\_db') writes data to disk so it survives restarts and is suitable for local development and small-scale deployments. HttpClient(host='...', port=8000) connects to a separately running ChromaDB server process, enabling multi-client access and production deployments.
The old chromadb.Client(Settings(chroma\_db\_impl='duckdb+parquet')) pattern was removed in ChromaDB 0.4.0 and should not be used.

##### How do I use ChromaDB in a RAG (Retrieval-Augmented Generation) application?

In a RAG pipeline, ChromaDB acts as the vector store that holds your document embeddings. The workflow is: (1) chunk your documents into smaller passages, (2) embed each chunk using a model like text-embedding-3-small , (3) store the embeddings in a ChromaDB collection with metadata, and (4) at query time, embed the user's question and call collection.query() to retrieve the most semantically similar chunks. Those chunks are then passed as context to an LLM to generate a grounded answer.
ChromaDB integrates natively with LangChain ( langchain\_community.vectorstores.Chroma ) and LlamaIndex, making it straightforward to add to existing RAG frameworks. See our Building a RAG System with LangChain and FastAPI tutorial for a complete implementation.

##### What is the difference between ChromaDB's EphemeralClient, PersistentClient, and HttpClient?

ChromaDB provides three client modes: EphemeralClient() stores data only in memory and is ideal for testing—all data is lost when the script ends. PersistentClient(path='./chroma\_db') writes data to disk so it survives restarts and is suitable for local development and small-scale deployments. HttpClient(host='...', port=8000) connects to a separately running ChromaDB server process, enabling multi-client access and production deployments.
The old chromadb.Client(Settings(chroma\_db\_impl='duckdb+parquet')) pattern was removed in ChromaDB 0.4.0 and should not be used.

##### How do I use ChromaDB in a RAG (Retrieval-Augmented Generation) application?

In a RAG pipeline, ChromaDB acts as the vector store that holds your document embeddings. The workflow is: (1) chunk your documents into smaller passages, (2) embed each chunk using a model like text-embedding-3-small , (3) store the embeddings in a ChromaDB collection with metadata, and (4) at query time, embed the user's question and call collection.query() to retrieve the most semantically similar chunks. Those chunks are then passed as context to an LLM to generate a grounded answer.
ChromaDB integrates natively with LangChain ( langchain\_community.vectorstores.Chroma ) and LlamaIndex, making it straightforward to add to existing RAG frameworks. See our Building a RAG System with LangChain and FastAPI tutorial for a complete implementation.
Topics
Data Science
Abid Ali Awan Certified data scientist, passionate about building ML apps, blogging on data science, and editing.
Topics
Data Science
[

##### An Introduction to Vector Databases For Machine Learning: A Hands-On Guide With Examples

](<https://www.datacamp.com/tutorial/introduction-to-vector-databases-for-machine-learning>)
[

##### Databricks DBRX Tutorial: A Step-by-Step Guide

](<https://www.datacamp.com/tutorial/databricks-dbrx-tutorial-a-step-by-step-guide>)
[

##### Mastering Vector Databases with Pinecone Tutorial: A Comprehensive Guide

](<https://www.datacamp.com/tutorial/mastering-vector-databases-with-pinecone-tutorial>)
[

##### AWS DMS Tutorial: Step-by-Step Guide to Migrating Databases

](<https://www.datacamp.com/tutorial/aws-dms>)
[

##### DuckDB Tutorial: Building AI Projects

](<https://www.datacamp.com/tutorial/building-ai-projects-with-duckdb>)
[

##### Getting to Know the Databricks Notebook: A Complete Guide

](<https://www.datacamp.com/tutorial/databricks-notebook>)
Related
[Tutorial

##### An Introduction to Vector Databases For Machine Learning: A Hands-On Guide With Examples

](<https://www.datacamp.com/tutorial/introduction-to-vector-databases-for-machine-learning>)
Explore vector databases in ML with our guide. Learn to implement vector embeddings and practical applications.
Gary Alway
[Tutorial

##### Databricks DBRX Tutorial: A Step-by-Step Guide

](<https://www.datacamp.com/tutorial/databricks-dbrx-tutorial-a-step-by-step-guide>)
Learn how Databricks DBRX—an open-source LLM can handle complex tasks and generate intelligent results.
Laiba Siddiqui
[Tutorial

##### Mastering Vector Databases with Pinecone Tutorial: A Comprehensive Guide

](<https://www.datacamp.com/tutorial/mastering-vector-databases-with-pinecone-tutorial>)
Dive into the world of vector databases with our in-depth tutorial on Pinecone. Discover how to efficiently handle high-dimensional data, understand unstructured data, and harness the power of vector embeddings for AI-driven applications.
Moez Ali
[Tutorial

##### AWS DMS Tutorial: Step-by-Step Guide to Migrating Databases

](<https://www.datacamp.com/tutorial/aws-dms>)
This tutorial walks you through setting up and using AWS DMS to migrate databases to AWS, optimize performance, and troubleshoot issues.
Rahul Sharma
[Tutorial

##### DuckDB Tutorial: Building AI Projects

](<https://www.datacamp.com/tutorial/building-ai-projects-with-duckdb>)
This tutorial guides you through DuckDB's key features and practical applications, including building tables, performing data analysis, building an RAG application, and using an SQL query engine with LLM.
Abid Ali Awan
[Tutorial

##### Getting to Know the Databricks Notebook: A Complete Guide

](<https://www.datacamp.com/tutorial/databricks-notebook>)
Learn how to manage Databricks Notebooks. Leverage multi-language support, scheduling, version control, and magic commands to optimize your workflow.
Allan Ouko
See More See More

#### Grow your data skills with DataCamp for Mobile

Make progress on the go with our mobile courses and daily 5-minute coding challenges.
Download on the App Store Get it on Google Play
**Learn**
Learn Python Learn AI Learn Power BI Learn Data Engineering Assessments Career Tracks Skill Tracks Courses Data Science Roadmap
**Data Courses**
Python Courses R Courses SQL Courses Power BI Courses Tableau Courses Alteryx Courses Azure Courses AWS Courses Google Cloud Courses Google Sheets Courses Excel Courses AI Courses Data Analysis Courses Data Visualization Courses Machine Learning Courses Data Engineering Courses Probability & Statistics Courses
**DataLab**
Get Started Pricing Security Documentation
**Certification**
Certifications Data Scientist Data Analyst Data Engineer SQL Associate Power BI Data Analyst Tableau Certified Data Analyst Azure Fundamentals AI Fundamentals
**Resources**
Resource Center Upcoming Events Blog Code-Alongs Tutorials Docs Open Source RDocumentation Book a Demo with DataCamp for Business Data Portfolio
**Plans**
Pricing For Students For Business For Universities Discounts, Promos & Sales Expense DataCamp DataCamp Donates
**For Business**
Business Pricing Teams Plan Data & AI Unlimited Plan Customer Stories Partner Program
**About**
About Us Learner Stories Careers Become an Instructor Press Leadership Contact Us DataCamp Español DataCamp Português DataCamp Deutsch DataCamp Français
**Support**
Help Center Become an Affiliate
Facebook Twitter LinkedIn YouTube Instagram
Privacy Policy Cookie Notice Do Not Sell My Personal Information Accessibility Security Terms of Use
© 2026 DataCamp, Inc. All Rights Reserved.
