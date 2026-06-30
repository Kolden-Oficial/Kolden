---
id_fonte: "400d13dc-a978-46d2-a07d-8e2a09b8d5f7"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Add RAG to Agora Conversational AI with Pinecone"
tipo: "unknown"
url_original: "https://www.agora.io/en/blog/add-rag-to-agora-conversational-ai-with-pinecone/"
keywords: "('Conversational AI', 'RAG Integration', 'Pinecone Vector Database', 'Real-time Voice Infrastructure', 'Semantic Search Implementation')"
summary: "This technical guide details how to enhance **real-time voice applications** by integrating **Retrieval-Augmented Generation (RAG)** using the **Agora** platform and **Pinecone** vector database. The primary objective is to eliminate **AI hallucinations** and provide agents with access to **domain-specific knowledge** by retrieving relevant data during live conversations. By utilizing a **Node.js proxy server**, developers can intercept user queries, perform **semantic searches** for context, and inject that information into the large language model’s prompt. While the author acknowledges challenges like **network latency** and **multi-turn context retention**, the text serves as a comprehensive roadmap for building **grounded, production-ready AI agents** capable of maintaining fluid and accurate human-like interactions."
extraido_em: "2026-06-30T16:18:07Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Add RAG to Agora Conversational AI with Pinecone

Add RAG to Agora Conversational AI with Pinecone
Cookie Policy
This website uses cookies to enhance user experience and to analyze performance and traffic on our website. We also share information about your use of our site with our social media, advertising and analytics partners.
Learn more
Accept Cookies Cookie Preferences Icon Opt out of sale of personal data and Targeted Advertising
Products
Products
CONVERSATIONAL AI
Conversational AI Engine
Convo AI Device Kit
OpenAI Realtime API
CORE PRODUCTS
Video Calling
Voice Calling
Interactive Live Streaming
Interactive Whiteboard
Signaling
IoT
Broadcast Streaming
Chat
EXTENSIONS
3D Spatial Audio
Media Services
Agora Analytics
AI Noise Suppression
Real-Time Speech to Text
Real-Time Translation
Recording
Extensions Marketplace
Open Source
[

#### TEN

☆ 10,391 Open-source framework for real-time, multimodal conversational AI.](<https://www.agora.io/en/open-source/ten-framework/>)
TOOLS
[

#### App Builder

The fastest and easiest way to integrate real-time engagement without code.](<https://www.agora.io/en/tools/app-builder/>)
[

#### Flexible Classroom

Build full-featured virtual classrooms with low code.](<https://www.agora.io/en/tools/flexible-classroom/>)
[

#### Download SDKs

Build your vision with Agora's real-time SDKs.](<https://docs.agora.io/en/sdks?platform=android>)
Solutions
Solutions
Solutions
Conversational AI
Education
Future of Work
Gaming
Live Audio Streaming
Live Shopping
Media and Entertainment
Metaverse
Social
Telehealth
iGaming
Developers
Developers
RESOURCES
Documentation
API Reference
Download SDKs
Developer Blogs
Conversational AI Performance Lab
RESOURCES
Documentation
API Reference
Download SDKs
Developer Blog
Conversational AI Performance Lab
QUICKSTARTs
Voice SDK
Video SDK
App Builder
COMMUNITY
Stack Overflow
Agora Github
Community Github
Community Discord
Agora Ambassador Program
Company
Company
COMPANY
About Us
Events
Compliance & Privacy
Careers
AGORA PARTNERS
Partner Gallery
Become a Partner
RESOURCES
The Agora Advantage
Success Stories
Blog
Convo AI World Podcast
Support
Support
SUPPORT AND RESOURCES
Submit a Ticket
Agora Documentation
FAQ
COMMUNITY FORUMS
Agora Github
Stack Overflow
Community Discord Channel
CONNECT WITH US
[

#### Support Plans and Pricing

Agora SDKs for real time engagement](<https://www.agora.io/en/support-plans/>)
Ready to Select a Support Plan?
Contact Sales
Pricing
Talk to Us
Get Started
From Data to Agent - The Complete Open-Source AI Engine with Dify's Yongle Yang
Back to Blog

### Add RAG to Agora Conversational AI with Pinecone

December 4, 2025
|
TJ Palazzari
|
In
Developer
If you've ever deployed a conversational AI agent, you've hit this wall: your LLM hallucinates product details, can't answer questions about last week's documentation updates, or gives generic responses when users need domain-specific expertise. The model is fluent, but it doesn't know *yourinformation* .
**Retrieval-Augmented Generation (RAG)** solves this by treating your LLM as a reasoning engine rather than a knowledge store. Instead of hoping the model “remembers” information from training, RAG retrieves relevant context from a knowledge base at query time and hands it to the model as part of the prompt. The result: responses grounded in your actual data, with the flexibility to stay current as your information changes.
The architecture is straightforward, embed your documents into vectors, store them in a database like Pinecone, and retrieve the most relevant chunks when a user asks a question. But getting this to work in a *real-time voice conversation* introduces constraints that tutorial blog posts usually skip: optimized retrieval latency, streaming responses, and maintaining conversational context across multiple turns.
**Note on latency** : While Pinecone's vector search is extremely fast (~100ms), the RAG pipeline makes two sequential external API calls (OpenAI embedding: 100–400ms, Pinecone query: ~100ms), resulting in total latency of 200–500ms+ depending on network conditions. This is optimized for real-time voice but not truly “sub-second” in all conditions.
**Agora's Conversational AI Engine** handles the real-time voice infrastructure, audio streaming, speech-to-text, and text-to-speech, with the low latency voice applications demand. By integrating Pinecone-powered RAG into an Agora agent, you get a conversational AI that can:
\* Answer questions from your own knowledge base with low hallucination rates
\* Stay synchronized with your latest documentation, product catalogs, or support content
\* Respond in real time without the lag that kills conversational flow
This guide walks through the integration end-to-end: setting up Pinecone for semantic search, connecting it to Agora's agent framework, and handling the retrieval-augmentation loop within the constraints of a live voice conversation. Whether you're building a technical support bot, a shopping assistant, or a domain-specific advisor, you'll see how to move from proof-of-concept to production-ready RAG.

##### Prerequisites

```
*  An Agora Account — The first 10K minutes each month are free
*  Conversational AI Service activated on your Agoa AppID
*  A Pinecone Account
*  An OpenAI Account
*  Node.js (v18+)
*  Nodemon
*  A basic understanding of Node.js and Express.js
```

##### Project Setup

We'll build this as a Node.js backend that sits between Agora's Conversational AI and OpenAI's API, adding RAG capabilities in the middle. This backend will handle receiving the requests from Agora's Conversational AI, interacting with Pinecone for semantic search, and injecting the retrieved context before sending the request to OpenAI for generation.
This keeps the RAG logic separate from Agora's infrastructure and gives you full control over retrieval strategy.
Let's setup the project:

```
mkdir agora-convo-ai-pinecone
cd agora-convo-ai-pinecone
npm init -y
```

Install the core dependencies:

```
npm install express @pinecone-database/pinecone dotenv axios uuid node-fetch
```

We're using:
\* Express for routing and middleware
\* @pinecone-database/pinecone for vector database operations
\* axios for HTTP requests (OpenAI API calls)
\* uuid for generating unique IDs for vector records
\* node-fetch for HTTP client compatibility with Pinecone SDK
\* dotenv for environment variable management
As we go through this guide, you'll have to create new files in specific directories. So, before we start let's create these new directories. We keep the Pinecone utilities in a libs folder and routes in a dedicated routes folder for maintainability:

```
mkdir -p libs/pinecone routes
touch .env server.js routes/chatCompletionRouter.js routes/pineconeRouter.js libs/pinecone/config.js libs/pinecone/pineconeService.js
```

Your project directory should now have a structure like this:

```
├── node_modules/
├── libs/
│   └── pinecone/
│       ├── config.js
│       └── pineconeService.js
├── routes/
│   ├── chatCompletionRouter.js
│   └── pineconeRouter.js
├── .env
├── package.json
└── server.js
```

Next, Update package.json to add run scripts:

```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

##### Configure Environment Variables

Add these environment variables to your .env file. We'll need API keys for both OpenAI (for embeddings and completions) and Pinecone (for vector storage):

```
# LLM API (OpenAI by default)
LLM_API_KEY=your_llm_api_key

# Pinecone Configuration
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name

# Server Configuration
PORT=3000
```

Important: We're using OpenAI's text-embedding-3-small (1536 dimensions) throughout this guide. When you create your Pinecone index, set the dimension to 1536. If you switch to a different embedding model later—like text-embedding-3-large (3072 dimensions) or an open-source alternative, you'll need to recreate the index with matching dimensions. Mismatched dimensions will throw errors at query time, not during initialization, so try to catch this early.

##### Set Up the Express Server

Now let's build the Express application in server.js . This will serve as the entry point for our RAG-enhanced proxy:

```
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import route modules
const chatCompletionRouter = require("./routes/chatCompletionRouter");
const pineconeRouter = require("./routes/pineconeRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Register API routes
app.use("/chat/completions", chatCompletionRouter); // RAG-augmented completion endpoint (Agora agent hits this)
app.use("/rag/pinecone", pineconeRouter); // Pinecone CRUD endpoints (for managing your knowledge base)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

We've set up two main routes: /chat/completions for the LLM proxy (where the RAG magic happens) and /rag/pinecone for managing our vector database.
The /chat/completions endpoint mimics OpenAI's API interface—Agora's agent will call this exactly like it would call OpenAI directly. Our server will handle the request, run semantic search against Pinecone, and inject the retrieved context before forwarding to the LLM. The /rag/pinecone routes handle knowledge base ingestion: upserting documents, querying vectors, and managing your index.
Start the server:

```
npm run dev
```

##### Build the Pinecone Vector Service

This is where we implement the core RAG functionality. We need three things: a Pinecone client configuration, embedding generation, and CRUD operations for our vector database. Think of this as the “memory” layer for our AI.
The workflow is straightforward: convert text to embeddings using OpenAI, store those embeddings in Pinecone with metadata, and retrieve relevant vectors when needed. Let's build it.

###### libs/pinecone/config.js

```
/**
 * Pinecone Configuration
 * Sets up and exports the Pinecone client as a singleton
 * Client is initialized once at server startup and reused for all requests
 */
const { Pinecone } = require("@pinecone-database/pinecone");

// Check for required environment variables at module load time
if (!process.env.PINECONE_API_KEY) {
  throw new Error("PINECONE_API_KEY environment variable is required");
}

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error("PINECONE_INDEX_NAME environment variable is required");
}

// Singleton instances - initialized once
let pineconeClient = null;
let pineconeIndex = null;

// Initialize Pinecone client and index
const initPinecone = async () => {
  try {
    // Create client only once
    if (!pineconeClient) {
      pineconeClient = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      });
      console.log("Pinecone client initialized successfully");
    }

    // Get index only once
    if (!pineconeIndex) {
      pineconeIndex = pineconeClient.index(process.env.PINECONE_INDEX_NAME);

      // Verify connection to the index
      await pineconeIndex.describeIndexStats();
      console.log(
        `Connected to Pinecone index: ${process.env.PINECONE_INDEX_NAME}`
      );
    }

    return {
      pinecone: pineconeClient,
      index: pineconeIndex,
    };
  } catch (error) {
    console.error("Error initializing Pinecone:", error.message);
    throw error;
  }
};

// Export a function that returns the memoized singleton instances
const getPineconeClient = async () => {
  if (!pineconeIndex) {
    await getPineconeClient();
  }
  return {
    pinecone: pineconeClient,
    index: pineconeIndex,
  };
};

module.exports = {
  getPineconeClient,
  initPinecone, // Also export for server startup
};
```

This singleton pattern ensures the Pinecone client and index are initialized once at server startup and reused for all API requests. This eliminates the overhead of creating new client instances on every request, significantly improving performance.
Important notes:
\* PINECONE\_API\_KEY and PINECONE\_INDEX\_NAME are always required
\* Client initialization happens automatically on first use via getPineconeClient()
\* Pinecone v6 supports serverless indexes (the modern standard)

###### libs/pinecone/pineconeService.js

Now for the service layer. This handles the actual vector operations — generating embeddings and performing CRUD on Pinecone:

```
/**
 * Pinecone Utility
 * Handles storing and retrieving data to and from Pinecone
 */
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { getPineconeClient } = require("./config");

// OpenAI API for embeddings
const EMBEDDING_API = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-3-small";

// Generate embeddings using OpenAI API
const generateEmbedding = async (text) => {
  try {
    const response = await axios.post(
      EMBEDDING_API,
      {
        input: text,
        model: EMBEDDING_MODEL,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error.message);
    throw error;
  }
};

// Store a record in Pinecone
const storeRecord = async (event) => {
  try {
    // Create metadata with text and timestamp
    const timestamp = event.timestamp || Date.now();
    const metadata = {
      text: event.text,
      timestamp: Number(timestamp),
      // Add other fields as needed
    };

    // Generate embedding for the event text
    const embedding = await generateEmbedding(event.text);

    // Initialize Pinecone
    const { index } = await getPineconeClient();

    // Create a unique ID for the event
    const id = event.id || uuidv4();

    // Create the vector record
    const record = {
      id,
      values: embedding,
      metadata,
    };

    // Upsert the event into Pinecone - using array format as per documentation
    await index.upsert([record]);

    console.log(`Record stored with ID: ${id}`);
    return id;
  } catch (error) {
    if (error.response) {
      console.error("Upsert error:", error.response.data);
    }
    throw error;
  }
};

// Query relevant records based on a user query
const queryRecords = async (query, options = {}) => {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Initialize Pinecone
    const { index } = await getPineconeClient();

    // Query Pinecone for similar events
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: options.limit || 5,
      includeMetadata: true,
    });

    // Format and return the results
    return queryResponse.matches.map((match) => ({
      id: match.id,
      text: match.metadata.text,
      timestamp: match.metadata.timestamp,
      similarity: match.score,
    }));
  } catch (error) {
    if (error.response) {
      console.error("Query error:", error.response.data);
    }
    throw error;
  }
};

// Delete a record from Pinecone
const deleteRecord = async (id) => {
  try {
    // Initialize Pinecone
    const { index } = await getPineconeClient();

    // Delete the record using the correct Pinecone SDK v6 API
    await index.deleteOne(id);

    console.log(`Record deleted with ID: ${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting record:", error.message);
    throw error;
  }
};

// Clear all records from Pinecone (useful for testing or resetting)
// Note: deleteAll() is only available for serverless indexes
const clearAllRecords = async () => {
  try {
    // Initialize Pinecone
    const { index } = await getPineconeClient();

    // Delete all vectors - available for serverless indexes
    await index.deleteAll();

    console.log("All records cleared");
    return true;
  } catch (error) {
    console.error("Error clearing records:", error.message);
    throw error;
  }
};

module.exports = {
  storeRecord,
  queryRecords,
  deleteRecord,
  clearAllRecords,
  generateEmbedding,
};
```

###### routes/pineconeRouter.js

The router exposes HTTP endpoints for managing your knowledge base. You'll use these to populate your vector database with domain-specific information.
\*\*Security Warning: These routes directly modify your database. In production, add proper authentication middleware before deploying. Never expose write operations without auth.

```
/**
 * Pinecone Router
 * Routes for interacting with the Pinecone database through pineconeService
 */
const express = require("express");
const {
  storeRecord,
  queryRecords,
  deleteRecord,
  clearAllRecords,
  generateEmbedding,
} = require("../libs/pinecone/pineconeService");

const router = express.Router();

// Store a new record in Pinecone
router.post("/store", async (req, res) => {
  try {
    const record = req.body;

    if (!record || !record.text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = await storeRecord(record);
    res.status(201).json({ success: true, id });
  } catch (error) {
    console.error("Error in store endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Query records from Pinecone based on semantic similarity
router.post("/query", async (req, res) => {
  try {
    const { query, options } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const results = await queryRecords(query, options || {});
    res.json(results);
  } catch (error) {
    console.error("Error in query endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete a record from Pinecone by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteRecord(id);
    res.json({ success: true, message: `Record ${id} deleted successfully` });
  } catch (error) {
    console.error("Error in delete endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Clear all records from Pinecone (dangerous operation)
router.delete("/clear/all", async (req, res) => {
  try {
    await clearAllRecords();
    res.json({ success: true, message: "All records cleared successfully" });
  } catch (error) {
    console.error("Error in clear all endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Generate embeddings for text (utility endpoint)
router.post("/embed", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const embedding = await generateEmbedding(text);
    res.json({ embedding });
  } catch (error) {
    console.error("Error in embed endpoint:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

With these endpoints live, you can now manage your knowledge base programmatically. For example, you might batch-import product documentation, ingest customer support tickets, or sync data from your CMS.

##### Implement the RAG-Enhanced LLM Proxy

Now for the core innovation: a chat completions endpoint that intelligently augments LLM requests with relevant context from Pinecone. This is where retrieval meets generation.
When Agora's Conversational AI Engine calls this endpoint, we'll intercept the request, search our vector database for relevant information, inject that context into the conversation, and then forward it to OpenAI. The user gets an answer grounded in your specific knowledge base.

###### routes/chatCompletionRouter.js

```
/**
 * LLM Proxy Route
 * Acts as a middleware between our application and LLM API
 * Implements RAG (Retrieval-Augmented Generation) using Pinecone
 */
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { queryRecords } = require("../libs/pinecone/pineconeService");

// OpenAI API endpoint
const LLM_API_URL = "https://api.openai.com/v1/chat/completions";
const llmApiKey = process.env.LLM_API_KEY;

/**
 * POST /chat/completions
 * Proxies requests to LLM API
 * Logs the request and forwards it to the API
 */
router.post("/", async (req, res) => {
  try {
    const {
      messages,
      model = "gpt-4o-mini",
      stream = false,
      queryRag = false,
    } = req.body;

    const payload = {
      messages,
      model,
      stream,
    };

    const checks = [
      { value: llmApiKey, error: "LLM API key not configured" },
      { value: messages, error: 'Missing "messages" in request body' },
    ];

    for (const { value, error } of checks) {
      if (!value) {
        return res.status(400).json({ error });
      }
    }

    // Query RAG if enabled
    if (queryRag) {
      const lastMessage = messages[messages.length - 1];
      const userQuery = lastMessage.content;

      try {
        // 1) Retrieve relevant records based on the user's query
        const relevantRecords = await queryRecords(userQuery, { limit: 5 });

        // 2) Decide which context message to insert
        let systemContextMessage;

        if (relevantRecords.length > 0) {
          // --- We have at least one relevant record ---
          // Sort by timestamp (oldest first)
          relevantRecords.sort((a, b) => {
            const aTime =
              typeof a.timestamp === "string"
                ? parseInt(a.timestamp, 10)
                : a.timestamp;
            const bTime =
              typeof b.timestamp === "string"
                ? parseInt(b.timestamp, 10)
                : b.timestamp;
            return aTime - bTime;
          });

          // Build a generic "records" context string
          let contextText =
            "Here are some records from the database that may help answer your query:\n\n";
          relevantRecords.forEach((record) => {
            contextText += `- ${record.text}\n`;
          });

          systemContextMessage = {
            role: "system",
            content:
              contextText +
              "\nUse the above information to answer the user's question. " +
              "If you don't have enough information to answer completely, acknowledge what you know and what you don't know.",
          };
        } else {
          // --- No relevant records found; do NOT fetch recentRecords ---
          systemContextMessage = {
            role: "system",
            content:
              `We were not able to find information in our database concerning this user's query: "${userQuery}". ` +
              "Try to answer if you know the answer; otherwise explain that you don't have that information.",
          };
        }

        // 3) Insert the chosen system message just before the user's last message
        messages.splice(messages.length - 1, 0, systemContextMessage);
        console.log("Added context to messages");
      } catch (error) {
        console.error("Error retrieving records:", error.message);
        // Continue without context if there's an error with Pinecone
        console.log("Proceeding without context due to error");
      }
    }

    if (stream) {
      // Handle streaming response
      const llmResponse = await axios({
        method: "post",
        url: LLM_API_URL,
        data: payload,
        headers: {
          Authorization: `Bearer ${llmApiKey}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      });

      // Set appropriate headers for streaming
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Listen for streaming data
      llmResponse.data.on("data", (chunk) => {
        const chunkString = chunk.toString();
        res.write(chunkString);
      });

      // Handle the end of the stream
      llmResponse.data.on("end", () => {
        res.end();
      });

      // Handle errors in the stream
      llmResponse.data.on("error", (err) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Stream error" });
        }
      });

      // No need to end the response here, as it will be ended by the pipe
    } else {
      // Handle non-streaming response
      const llmResponse = await axios.post(LLM_API_URL, payload, {
        headers: {
          Authorization: `Bearer ${llmApiKey}`,
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json(llmResponse.data);
    }
  } catch (error) {
    console.error("LLM Proxy Error:");

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.error || "Error from LLM API",
      });
    } else if (error.request) {
      return res
        .status(500)
        .json({ error: "No response received from LLM API" });
    } else {
      return res
        .status(500)
        .json({ error: error.message || "Unknown error occurred" });
    }
  }
});

module.exports = router;
```

Important note about this endpoint, it expects the standard OpenAI chat completions format:
\* messages — conversation history (required)
\* model — LLM model to use (defaults to 'gpt-4o-mini')
\* stream — whether to stream responses (defaults to false)
\* queryRag — enable RAG context injection (optional)
The endpoint validates that the LLM API key is configured and that the required messages field is present.

##### How the RAG Pipeline Works

The retrieval augmentation activates when you pass queryRag: true in the properties.llm.params object when starting a conversational AI agent. Let me break down the retrieval flow:

###### **Step 1: Extract the user's query**

We grab the most recent message from the conversation:

```
const lastMessage = messages[messages.length - 1];
const userQuery = lastMessage.content;
```

###### **Step 2: Semantic search**

We convert the query to an embedding and search Pinecone for the 5 most relevant records:

```
const relevantRecords = await queryRecords(userQuery, { limit: 5 });
```

###### **Step 3: Context injection**

Records are already sorted by relevance (semantic similarity) from Pinecone. We inject them as a system message to give the LLM specific information to work with. The code handles both cases — when relevant records are found and when the database has no matching information:

```
let systemContextMessage;

if (relevantRecords.length > 0) {
  // Sort by timestamp (oldest first)
  relevantRecords.sort((a, b) => {
    const aTime =
      typeof a.timestamp === "string" ? parseInt(a.timestamp, 10) : a.timestamp;
    const bTime =
      typeof b.timestamp === "string" ? parseInt(b.timestamp, 10) : b.timestamp;
    return aTime - bTime;
  });

  let contextText =
    "Here are some records from the database that may help answer your query:\n\n";
  relevantRecords.forEach((record) => {
    contextText += `- ${record.text}\n`;
  });

  systemContextMessage = {
    role: "system",
    content:
      contextText +
      "\nUse the above information to answer the user's question. " +
      "If you don't have enough information to answer completely, acknowledge what you know and what you don't know.",
  };
} else {
  // No records found—tell the model to fall back gracefully
  systemContextMessage = {
    role: "system",
    content:
      `We were not able to find information in our database concerning this user's query: "${userQuery}". ` +
      "Try to answer if you know the answer; otherwise explain that you don't have that information.",
  };
}
```

###### Step 4: Message array manipulation

Finally, we insert the system context message immediately before the user's last message:

```
messages.splice(messages.length - 1, 0, systemContextMessage);
```

This uses JavaScript's splice() method to insert the system message at index messages.length - 1 , which pushes the user's question to the end. The final message order becomes: [...previous messages, system context with data, user's question] .
This ordering is intentional: it ensures the LLM reads the retrieved information right before the question it needs to answer. The result? The LLM responds with information grounded in your knowledge base, not hallucinated from its training data. When no relevant records are found, we explicitly tell the model — this reduces confident-but-wrong answers.

##### Important Limitation: Multi-Turn Conversations

The current implementation has a significant limitation in multi-turn conversations:
The Issue: RAG queries only the most recent user message. This fails when context matters across multiple turns.
Example:

```
User: "Tell me about Agora's pricing for the Video SDK."
System: [RAG retrieves pricing docs - works great]

User: "And what about the free tier for that?"
System: [RAG fails - "that" has no context, query doesn't match any docs]
```

Why it fails: The query “And what about the free tier for that?” has no semantic connection to Video SDK pricing without the prior context.
**Solutions for production:**
1. **Query rewriting:** Reconstruct full context before embedding (e.g., “What is Agora's free tier for the Video SDK?”)
1. **Conversation summarization:** Embed conversation summary + current query
1. **Hybrid search:** Add metadata filters based on conversation history
1. **Conversation memory:** Store and embed entire conversation threads in Pinecone
For now, be aware that this simple RAG approach works best for single-turn or contextually independent queries. Advanced multi-turn support requires additional complexity in the retrieval pipeline.

##### What You've Built

You now have a production-ready RAG architecture that bridges Agora's real-time voice capabilities with Pinecone's semantic search. This isn't just a demo — it's a foundation you can build on.
Your system can:
\* Retrieve in real time — semantic search through your knowledge base in milliseconds
\* Ground responses — LLM answers based on your data, not hallucinations
\* Scale effortlessly — Pinecone handles millions of vectors, Agora handles global voice infrastructure
\* Update continuously — add new information without retraining models

##### Taking This Further

The architecture we've built is deliberately extensible. Here's what I'd suggest for you to explore next:
Immediate improvements:
\* Add authentication to your Pinecone routes (JWT, API keys, or OAuth)
\* Implement conversation memory — store chat history in Pinecone for multi-turn context
\* Set up automated data pipelines to keep your knowledge base current
Advanced features:
\* User-specific personalization (store user preferences as vectors)
\* Hybrid search (combine vector similarity with metadata filters)
\* Citation tracking (return source IDs so users can verify information)
\* A/B testing different retrieval strategies (vary topK, similarity thresholds, reranking)
Production deployment:
\* Add monitoring (track retrieval quality, latency, token usage)
\* Implement rate limiting and cost controls
\* Set up CI/CD for seamless updates

##### Deploying to Render

I recommend Render for rapid deployment — it's developer-friendly, has a generous free tier, and handles the infrastructure complexity so you can focus on your application.
Quick deployment steps:
1. Push your code to GitHub, GitLab, or Bitbucket
1. Create a new Web Service in the Render Dashboard
1. Connect your repository — Render auto-detects Node.js and suggests build commands
1. Add your environment variables in the Render dashboard (the same .env variables)
1. Deploy — Render will build and host your service with a public URL
Your service auto-deploys on every push to your main branch. For manual control, install the Render CLI to trigger deploys, view logs, and manage services from your terminal:

```
# View real-time logs
render logs

# Restart your service
render restart

# Run a one-off job
render run node scripts/seed-pinecone.js
```

Once deployed, update your Agora Conversational AI configuration to point at your Render URL. You'll have a production RAG system handling real-time voice interactions backed by semantic search.
**Pro tip:** Enable Render's "Auto-Deploy" for staging branches and set up preview environments for testing new RAG strategies before they hit production.

##### Resources

```
*  Agora Conversational AI Documentation
*  Pinecone Documentation
*  OpenAI Embeddings Guide
```

The future of conversational AI is contextual, grounded, and real-time. Let's built it together!
RTE Telehealth 2023
Join us for RTE Telehealth - a virtual webinar where we'll explore how AI and AR/VR technologies are shaping the future of healthcare delivery.
Categories
Business
Developer
Product

##### Learn more about Agora's video and voice solutions

Ready to chat through your real-time video and voice needs? We're here to help! Current Twilio customers get **up to 2 months FREE** .
Complete the form, and one of our experts will be in touch.
FIRST NAME:\*
LAST NAME:\*
EMAIL ADDRESS:\*
COMPANY:\*
COUNTRY:\*
Select...
United States
Afghanistan
Åland Islands
Albania
Algeria
American Samoa
Andorra
Angola
Anguilla
Antarctica
Antigua and Barbuda
Argentina
Armenia
Aruba
Asia/Pacific Region
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bermuda
Bhutan
Bolivia
Bosnia and Herzegovina
Botswana
Bouvet Island
Brazil
British Indian Ocean Territory
British Virgin Islands
Brunei
Bulgaria
Burkina Faso
Burundi
Cambodia
Cameroon
Canada
Canary Islands
Cape Verde
Caribbean Netherlands
Cayman Islands
Central African Republic
Chad
Chile
China
Christmas Island
Cocos (Keeling) Islands
Colombia
Comoros
Congo
Cook Islands
Costa Rica
Cote d'Ivoire
Croatia
Cuba
Curaçao
Cyprus
Czech Republic
Democratic Republic of the Congo
Denmark
Djibouti
Dominica
Dominican Republic
East Timor
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Ethiopia
Europe
Falkland Islands
Faroe Islands
Fiji
Finland
France
French Guiana
French Polynesia
French Southern and Antarctic Lands
Gabon
Gambia
Georgia
Germany
Ghana
Gibraltar
Greece
Greenland
Grenada
Guadeloupe
Guam
Guatemala
Guernsey
Guinea
Guinea-Bissau
Guyana
Haiti
Heard Island and McDonald Islands
Honduras
Hong Kong
Hungary
Iceland
India
Indonesia
Iran
Iraq
Ireland
Isle of Man
Israel
Italy
Jamaica
Japan
Jersey
Jordan
Kazakhstan
Kenya
Kiribati
Kosovo
Kuwait
Kyrgyzstan
Laos
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Macau
Macedonia (FYROM)
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Martinique
Mauritania
Mauritius
Mayotte
Mexico
Micronesia
Moldova
Monaco
Mongolia
Montenegro
Montserrat
Morocco
Mozambique
Myanmar (Burma)
Namibia
Nauru
Nepal
Netherlands
Netherlands Antilles
New Caledonia
New Zealand
Nicaragua
Niger
Nigeria
Niue
Norfolk Island
North Korea
Northern Mariana Islands
Norway
Oman
Pakistan
Palau
Palestine
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Pitcairn Islands
Poland
Portugal
Puerto Rico
Qatar
Réunion
Romania
Russia
Rwanda
Saint Barthélemy
Saint Helena
Saint Kitts and Nevis
Saint Lucia
Saint Martin
Saint Pierre and Miquelon
Saint Vincent and the Grenadines
Samoa
San Marino
Sao Tome and Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Sint Maarten
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Georgia and the South Sandwich Islands
South Korea
South Sudan
Spain
Sri Lanka
Sudan
Suriname
Svalbard and Jan Mayen
Swaziland
Sweden
Switzerland
Syria
Taiwan
Tajikistan
Tanzania
Thailand
Togo
Tokelau
Tonga
Trinidad and Tobago
Tunisia
Turkmenistan
Turks and Caicos Islands
Tuvalu
U.S. Virgin Islands
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States Minor Outlying Islands
Uruguay
Uzbekistan
Vanuatu
Vatican City
Venezuela
Vietnam
Wallis and Futuna
Western Sahara
Yemen
Zambia
Zimbabwe
Asia Pacific Regions
Bonaire, Saint Eustatius and Saba
Brunei Darussalam
Chinese Taipei
Curacao
Czech
Democratic Republic of Congo
Dominican
Eswatini
Europe Regions
Falkland Islands (Malvinas)
French Southern Territories
Ivory Coast
Lao
Macao
Macedonia
Micronesia, Federated States of
Myanmar
Pitcairn
Republic of Korea
Saint Helena, Ascension and Tristan da Cunha
Saint Martin (French part)
Sint Maarten (Dutch part)
Unknown
Vatican
Viet Nam
Virgin Islands, U.S.
Yugoslavia
中国
Aland Islands
Turkey
UTM Source
UTM Medium
UTM Campaign
UTM Keyword
UTM Content
UTM Device
UTM Term
GCLID
[-] true By checking this box you agree to our Privacy Policy. \*
[-] true Check this box to get updates about Agora. Submit

#### Try Agora for Free

Sign up and start building! You don't pay until you scale.
Try for Free
CONTACT
+1 408 879 5885
Contact Us
2804 Mission College Blvd.
Santa Clara, CA, USA 95054
Why Agora
Agora Advantage Products Solutions Partners Success Stories
Company
About Us Blogs Compliance & Privacy Management Events Careers Newsroom Investor Relations
GET STARTED
Login Pricing Support Plans Get Started Documentation Talk to Us
All systems operational
Privacy Policy Cookie Policy Terms of Service Acceptable Use Policy Sitemap Report Abuse of Our Terms of Service Manage My Cookies
Copyright © 2026 Agora | All rights reserved.
Service Status
View Status Page to see details. If you need any assistance, please contact our support.
