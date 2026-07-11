---
id_fonte: "66aa7df6-1bea-46e6-9c18-d013468fed81"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "SupabaseVectorStore integration - Docs by LangChain"
tipo: "unknown"
url_original: "https://docs.langchain.com/oss/javascript/integrations/vectorstores/supabase"
keywords: "('SupabaseVectorStore integration', 'LangChain JavaScript', 'PostgreSQL pgvector extension', 'Vector store management', 'Retrieval-augmented generation')"
summary: "This documentation details the integration of **Supabase** as a robust **vector store** within the LangChain JavaScript ecosystem, leveraging the **pgvector extension** on a PostgreSQL foundation. It provides developers with a roadmap for **setting up credentials**, managing document storage, and performing **similarity searches** to power intelligent applications. By transforming the database into a **retriever**, the guide illustrates how to effectively implement **retrieval-augmented generation (RAG)** for AI agents and chains. Ultimately, the text serves as a technical blueprint for combining **open-source database management** with advanced language model workflows."
extraido_em: "2026-06-30T16:22:05Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# SupabaseVectorStore integration - Docs by LangChain

SupabaseVectorStore integration - Docs by LangChain
Skip to main content
Join us May 13th & May 14th at Interrupt, the Agent Conference by LangChain. Buy tickets >
Docs by LangChain home page
Open source
Search...
Ctrl K
\* Ask AI
\* GitHub
\* Try LangSmith
\* Try LangSmith
Search...
Navigation
SupabaseVectorStore integration
Deep Agents
LangChain
LangGraph
Integrations
Learn
Reference
Contribute
TypeScript
\* Overview
\* All providers

###### Popular Providers

```
*  OpenAI
*  Anthropic
*  Google
*  AWS
*  Microsoft
```

###### General integrations

```
*  Chat models
*  Tools and Toolkits
*  LLMs
*  Middleware
*  Key-value stores
*  Document transformers
*  Model caches
*  Callbacks
```

###### RAG integrations

```
*  Retrievers
*  Text splitters
*  Embedding models
*  Vector stores
*  Document loaders
*  Key-value stores
```

On this page
\* Overview
\* Integration details
\* Setup
\* Credentials
\* Instantiation
\* Manage vector store
\* Add items to vector store
\* Delete items from vector store
\* Query vector store
\* Query directly
\* Metadata query builder filtering
\* Query by turning into retriever
\* Usage for retrieval-augmented generation
\* API reference

### SupabaseVectorStore integration

Copy page
Integrate with the SupabaseVectorStore using LangChain JavaScript.
Copy page
Supabase is an open-source Firebase alternative. Supabase is built on top of PostgreSQL, which offers strong SQL querying capabilities and enables a simple interface with already-existing tools and frameworks. LangChain.js supports using a Supabase Postgres database as a vector store, using the pgvector extension. Refer to the Supabase blog post for more information. This guide provides a quick overview for getting started with Supabase vector stores. For detailed documentation of all SupabaseVectorStore features and configurations head to the API reference.

#### Overview

##### Integration details

| Class | Package | PY support | Version |
| --- | --- | --- | --- |
| SupabaseVectorStore | @langchain/community | ✅ |  |

#### Setup

To use Supabase vector stores, you'll need to set up a Supabase database and install the @langchain/community integration package. You'll also need to install the official @supabase/supabase-js SDK as a peer dependency. This guide will also use OpenAI embeddings, which require you to install the @langchain/openai integration package. You can also use other supported embeddings models if you wish.
npm
yarn
pnpm

```
npm install @langchain/community @langchain/core @supabase/supabase-js @langchain/openai
```

Once you've created a database, run the following SQL to set up pgvector and create the necessary table and functions:

```
-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

##### Credentials

Once you've done this set the SUPABASE\_PRIVATE\_KEY and SUPABASE\_URL environment variables:

```
process.env.SUPABASE_PRIVATE_KEY = "your-api-key";
process.env.SUPABASE_URL = "your-supabase-db-url";
```

If you are using OpenAI embeddings for this guide, you'll need to set your OpenAI key as well:

```
process.env.OPENAI_API_KEY = "YOUR_API_KEY";
```

If you want to get automated tracing of your model calls you can also set your LangSmith API key by uncommenting below:

```
// process.env.LANGSMITH_TRACING="true"
// process.env.LANGSMITH_API_KEY="your-api-key"
```

#### Instantiation

```
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

import { createClient } from "@supabase/supabase-js";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PRIVATE_KEY
);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});
```

#### Manage vector store

##### Add items to vector store

```
import type { Document } from "@langchain/core/documents";

const document1: Document = {
  pageContent: "The powerhouse of the cell is the mitochondria",
  metadata: { source: "https://example.com" }
};

const document2: Document = {
  pageContent: "Buildings are made out of brick",
  metadata: { source: "https://example.com" }
};

const document3: Document = {
  pageContent: "Mitochondria are made out of lipids",
  metadata: { source: "https://example.com" }
};

const document4: Document = {
  pageContent: "The 2024 Olympics are in Paris",
  metadata: { source: "https://example.com" }
}

const documents = [document1, document2, document3, document4];

await vectorStore.addDocuments(documents, { ids: ["1", "2", "3", "4"] });
```

```
[ 1, 2, 3, 4 ]
```

##### Delete items from vector store

```
await vectorStore.delete({ ids: ["4"] });
```

#### Query vector store

Once your vector store has been created and the relevant documents have been added you will most likely wish to query it during the running of your chain or agent.

##### Query directly

Performing a simple similarity search can be done as follows:

```
const filter = { source: "https://example.com" };

const similaritySearchResults = await vectorStore.similaritySearch("biology", 2, filter);

for (const doc of similaritySearchResults) {
  console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
}
```

```
* The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* Mitochondria are made out of lipids [{"source":"https://example.com"}]
```

If you want to execute a similarity search and receive the corresponding scores you can run:

```
const similaritySearchWithScoreResults = await vectorStore.similaritySearchWithScore("biology", 2, filter)

for (const [doc, score] of similaritySearchWithScoreResults) {
  console.log(`* [SIM=${score.toFixed(3)}] ${doc.pageContent} [${JSON.stringify(doc.metadata)}]`);
}
```

```
* [SIM=0.165] The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* [SIM=0.148] Mitochondria are made out of lipids [{"source":"https://example.com"}]
```

##### Metadata query builder filtering

You can also use query builder-style filtering similar to how the Supabase JavaScript library works instead of passing an object. Note that since most of the filter properties are in the metadata column, you need to use arrow operators (-> for integer or ->> for text) as defined in Postgrest API documentation and specify the data type of the property (e.g. the column should look something like metadata->some\_int\_prop\_name::int ).

```
import { SupabaseFilterRPCCall } from "@langchain/community/vectorstores/supabase";

const funcFilter: SupabaseFilterRPCCall = (rpc) =>
  rpc.filter("metadata->>source", "eq", "https://example.com");

const funcFilterSearchResults = await vectorStore.similaritySearch("biology", 2, funcFilter);

for (const doc of funcFilterSearchResults) {
  console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
}
```

```
* The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* Mitochondria are made out of lipids [{"source":"https://example.com"}]
```

##### Query by turning into retriever

You can also transform the vector store into a retriever for easier usage in your chains.

```
const retriever = vectorStore.asRetriever({
  // Optional filter
  filter: filter,
  k: 2,
});
await retriever.invoke("biology");
```

```
[
  Document {
    pageContent: 'The powerhouse of the cell is the mitochondria',
    metadata: { source: 'https://example.com' },
    id: undefined
  },
  Document {
    pageContent: 'Mitochondria are made out of lipids',
    metadata: { source: 'https://example.com' },
    id: undefined
  }
]
```

##### Usage for retrieval-augmented generation

For guides on how to use this vector store for retrieval-augmented generation (RAG), see the following sections:
\* Build a RAG app with LangChain.
\* Agentic RAG
\* Retrieval docs

#### API reference

For detailed documentation of all SupabaseVectorStore features and configurations head to the API reference.
Edit this page on GitHub or file an issue.
Connect these docs to Claude, VSCode, and more via MCP for real-time answers.
Was this page helpful?
Yes No
Ctrl+I
Docs by LangChain home page
github x linkedin youtube
Resources
Forum Changelog LangChain Academy Trust Center
Company
Home About Careers Blog
github x linkedin youtube
x

#### Chat LangChain
