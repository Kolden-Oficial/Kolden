---
id_fonte: "0e0b7cf5-58e4-49b5-9939-f930ca71fe81"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Supabase Vector Store | LlamaIndex OSS Documentation"
tipo: "unknown"
url_original: "https://developers.llamaindex.ai/typescript/framework/modules/data/stores/vector_stores/supabase/"
keywords: "('Supabase Vector Store', 'Database Setup', 'pgvector Extension', 'LlamaIndex Framework', 'Similarity Search Queries')"
summary: "This documentation serves as a comprehensive guide for integrating the **Supabase Vector Store** within the **LlamaIndex framework** to manage high-dimensional data. It outlines a structured workflow that begins with **database preparation**, requiring users to activate the **pgvector extension** and establish specialized tables and search functions. The text further explains how to initialize the index and perform **similarity searches**, highlighting the ability to refine results through **metadata filtering**. Ultimately, the resource provides a technical roadmap for developers to build efficient, **vector-based search capabilities** using a combination of Supabase’s infrastructure and LlamaIndex’s orchestration tools."
extraido_em: "2026-06-30T16:22:05Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Supabase Vector Store | LlamaIndex OSS Documentation

Supabase Vector Store | LlamaIndex OSS Documentation
Skip to content
LlamaIndex OSS Documentation
\* LlamaParse
\* LiteParse
\* LlamaAgents
\* LlamaIndex Framework
LlamaParse
LlamaParse
LiteParse
LlamaAgents
LlamaIndex Framework
Search CtrlK
Auto
Light
Dark
API Dashboard
\* Supabase Vector Store
Install MCP Server
MCP Docs
Copy MCP URL Install in Cursor Copy Claude Code command Copy Codex config

### Supabase Vector Store

supabase.com
To use this vector store, you need a Supabase project. You can create one at supabase.com.

#### Installation

Section titled “Installation”

```
npm i llamaindex @llamaindex/supabase
```

#### Database Setup

Section titled “Database Setup”
Before using the vector store, you need to:
1. Enable the pgvector extension
1. Create a table for storing vectors
1. Create a vector similarity search function

```
create table documents (
id uuid primary key,
content text,
metadata jsonb,
embedding vector(1536)
);
```

— Create a function for similarity search with filtering support

```
create function match_documents (
query_embedding vector(1536),
match_count int,
filter jsonb DEFAULT '{}'
) returns table (
id uuid,
content text,
metadata jsonb,
embedding vector(1536),
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
embedding,
1 - (embedding <=> query_embedding) as similarity
from documents
where metadata @> filter
order by embedding <=> query_embedding
limit match_count;
end;
$$;
```

#### Importing the modules

Section titled “Importing the modules”

```
import { Document, VectorStoreIndex } from "llamaindex";
import { SupabaseVectorStore } from "@llamaindex/supabase";
```

#### Setup Supabase

Section titled “Setup Supabase”

```
const vectorStore = new SupabaseVectorStore({
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  table: "documents",
});
```

#### Setup the index

Section titled “Setup the index”

```
const documents = [
  new Document({
    text: "Sample document text",
    metadata: { source: "example" }
  })
];

const storageContext = await storageContextFromDefaults({ vectorStore });
const index = await VectorStoreIndex.fromDocuments(documents, {
  storageContext,
});
```

#### Query the index

Section titled “Query the index”

```
const queryEngine = index.asQueryEngine();

// Basic query without filters
const response = await queryEngine.query({
  query: "What is in the document?",
});

// Output response
console.log(response.toString());
```

#### Query with filters

Section titled “Query with filters”
You can filter documents based on metadata when querying:

```
import { FilterOperator, MetadataFilters } from "llamaindex";

// Create a filter for documents with author = "Jane Smith"
const filters: MetadataFilters = {
  filters: [
    {
      key: "author",
      value: "Jane Smith",
      operator: FilterOperator.EQ,
    },
  ],
};

// Query with filters
const filteredResponse = await vectorStore.query({
  queryEmbedding: embedModel.getQueryEmbedding("What is vector search?"),
  similarityTopK: 5,
  filters,
});
```

#### Full code

Section titled “Full code”

```
import { Document, VectorStoreIndex, storageContextFromDefaults } from "llamaindex";
import { SupabaseVectorStore } from "@llamaindex/supabase";

async function main() {
  // Initialize the vector store
  const vectorStore = new SupabaseVectorStore({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    table: "documents",
  });

  // Create sample documents
  const documents = [
    new Document({
      text: "Vector search enables semantic similarity search",
      metadata: {
        source: "research_paper",
        author: "Jane Smith",
      },
    }),
  ];

  // Create storage context
  const storageContext = await storageContextFromDefaults({ vectorStore });

  // Create and store embeddings
  const index = await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
  });

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: "What is vector search?",
  });

  // Output response
  console.log(response.toString());
}

main().catch(console.error);
```

#### API Reference

Section titled “API Reference”
\* SupabaseVectorStore
Powered by

#### On this page

```
*  Overview
*  Installation
*  Database Setup
*  Importing the modules
*  Setup Supabase
*  Setup the index
*  Query the index
*  Query with filters
*  Full code
*  API Reference
*  LlamaParse
*  LiteParse
*  LlamaAgents
*  LlamaIndex Framework
```

Ask AI
