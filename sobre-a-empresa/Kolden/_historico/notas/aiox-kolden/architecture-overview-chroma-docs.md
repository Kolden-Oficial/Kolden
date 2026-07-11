---
id_fonte: "a8453114-e7bc-4f1e-92f9-de7af98a2776"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Architecture Overview - Chroma Docs"
tipo: "unknown"
url_original: "https://docs.trychroma.com/reference/architecture/overview"
keywords: "('Distributed Architecture', 'Deployment Modes', 'Chroma Data Model', 'Vector Collections', 'Scalable Vector Databases')"
summary: "Chroma is a specialized database system designed to handle high-performance information retrieval through a **modular architecture** that scales from simple local prototyping to massive, distributed production environments. By relying on established subsystems for storage, the platform remains focused on a **multi-tiered data model** consisting of isolated tenants, logical databases, and individual collections. Within this framework, a **collection** serves as the primary storage unit, housing unique IDs, vector embeddings, and descriptive metadata to facilitate efficient searching. This structural design ensures that developers can maintain a **consistent API** while transitioning between small-scale experiments and large-scale deployments that require robust data management."
extraido_em: "2026-06-30T16:18:17Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Architecture Overview - Chroma Docs

Architecture Overview - Chroma Docs
Skip to main content
Chroma Docs home page
Search...
Ctrl K Ask AI
\* 26k
\* 11k
\* 25k
\* Dashboard
\* Dashboard
Search...
Navigation
Architecture
Architecture Overview
Docs
Chroma Cloud
Guides
Integrations
Reference
\* Overview

###### Self-Hosted Chroma

```
*  Chroma Configuration
```

###### SDKs

```
*  Python
*  TypeScript
*  Rust
```

###### Beta SDKs

```
*  Kotlin
*  Swift
```

###### APIs

```
*  Chroma Core API
*  Chroma Cloud API
*  Chroma Sync API
*  Chroma Cloud Embeddings API
```

###### Dictionary Syntax

```
*  Search
*  Where Filters
```

###### Architecture

```
*  Architecture Overview
*  Distributed Architecture
```

On this page
\* Deployment Modes
\* Chroma Data Model
\* Collections
\* Databases
\* Tenants
Architecture

### Architecture Overview

Copy page
How Chroma is structured across local, single-node, and distributed deployments.
Copy page
Chroma is designed with a modular architecture that prioritizes performance and ease of use. It scales from local development to large-scale production while exposing a consistent API across deployment modes. Chroma delegates as much as possible to durable, well-understood subsystems such as SQLite and cloud object storage, so the core system can stay focused on data management and information retrieval.

#### Deployment Modes

Chroma supports three deployment modes:
\* **Local** : an embedded library for prototyping and experimentation.
\* **Single-Node** : a single server for small to medium workloads, typically fewer than 10 million records across a handful of collections.
\* **Distributed** : a scalable multi-service deployment for large production workloads and millions of collections.
You can use Chroma Cloud, which is the managed offering of distributed Chroma.
[

#### Distributed Architecture

Learn how Chroma scales out with independent services, object storage, SSD caches, and a shared system database.](<https://docs.trychroma.com/reference/architecture/distributed>)

#### Chroma Data Model

Chroma's data model balances simplicity, flexibility, and scalability. It introduces a few core abstractions: **tenants** , **databases** , and **collections** .

##### Collections

A **collection** is the fundamental unit of storage and querying in Chroma. Each collection contains items with:
\* A unique ID
\* An embedding vector
\* Optional metadata
\* A document
Collections are independently indexed and optimized for vector similarity, full-text search, and metadata filtering.

##### Databases

Collections are grouped into **databases** , which provide a logical namespace for environments or applications. Each database contains multiple collections, and each collection name must be unique within that database.

##### Tenants

At the top level of the model is the **tenant** , which represents a user, team, or account. Tenants provide complete isolation. Access control, quota enforcement, and billing are all scoped to the tenant level.
Was this page helpful?
Yes No
Suggest edits
Where Filters Previous
Distributed Architecture Next
Ctrl+I
Chroma Docs home page
github x discord youtube
Enterprise Pricing Changelog
github x discord youtube
github x discord youtube
Powered by This documentation is built and hosted on Mintlify, a developer documentation platform
x
Assistant
Responses are generated using AI and may contain mistakes.
Contact support
