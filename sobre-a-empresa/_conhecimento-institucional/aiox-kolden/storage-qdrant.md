---
id_fonte: "8bf35c0a-d7b8-4ad7-8955-2091e96f53ec"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Storage - Qdrant"
tipo: "unknown"
url_original: "https://qdrant.tech/documentation/manage-data/storage/"
keywords: "('Vector storage', 'Payload storage', 'Memmap configuration', 'Data versioning', 'Segment management')"
summary: "This documentation provides a comprehensive technical guide to the **storage architecture of Qdrant**, a specialized database designed for high-performance vector search. The text explains that data is organized into **independent segments**, each containing unique storage and indexing structures that allow for flexible memory management. Users can optimize performance by choosing between **in-memory storage** for maximum speed or **memmap and on-disk options** to handle massive datasets with limited hardware resources. Furthermore, the source outlines critical reliability features such as **write-ahead logging** and versioning, which ensure **data integrity** and consistent recovery during system operations."
extraido_em: "2026-06-30T16:22:05Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Storage - Qdrant

Storage - Qdrant
\* Qdrant
\* Cloud
\* Ecosystem
\* Learn
\* API Reference
Search
Log in Start Free
Search
\* Qdrant
\* Cloud
\* Ecosystem
\* Learn
\* API Reference

##### Getting Started

Overview
\* What is Qdrant?
\* Understanding Vector Search in Qdrant
Qdrant Quickstart

##### User Manual

Manage Data
\* Points
\* Vectors
\* Payload
\* Collections
\* Storage
\* Indexing
\* Quantization
\* Multitenancy
Search
\* Search
\* Filtering
\* Hybrid Queries
\* Explore
\* Text Search
\* Search Relevance
\* Low-Latency Search
Operations
\* Capacity Planning
\* Installation
\* Upgrades
\* Snapshots
\* Usage Statistics
\* Monitoring & Telemetry
\* Security
\* Troubleshooting
\* Configuration
\* Administration
\* Distributed Deployment
\* Running with GPU
\* Optimize Performance
\* Optimizer
Inference
Qdrant Edge
\* Quickstart
\* On-Device Embeddings
\* Data Synchronization Patterns
\* Synchronize with a Server
Qdrant Web UI
API & SDKs

##### Qdrant Tools

FastEmbed
\* Quickstart
\* FastEmbed & Qdrant
\* Optimize Throughput
\* Working with miniCOIL
\* Working with SPLADE
\* Working with ColBERT
\* Reranking with FastEmbed
\* Multi-Vector Postprocessing
Qdrant MCP Server

##### Tutorials

Overview
Basics
\* Semantic Search 101
Search Engineering
\* Hybrid Search with Reranking
\* Multivectors and Late Interaction
\* Relevance Feedback Retrieval in Qdrant
\* Semantic Search Basics
\* Semantic Search for Code
\* Collaborative Filtering
\* Hybrid Search with FastEmbed
\* Multivector Document Retrieval
\* Retrieval Quality Evaluation
\* Static Embeddings
Operations & Scale
\* Snapshots
\* Data Migration
\* Migrate to a New Embedding Model
\* Large-Scale Search
Develop & Implement
\* Bulk Operations
\* Async API

##### Support

FAQ
\* Qdrant Fundamentals
\* Database Optimization
Release Notes

##### Getting Started

Overview
\* What is Qdrant?
\* Understanding Vector Search in Qdrant
Qdrant Quickstart

##### User Manual

Manage Data
\* Points
\* Vectors
\* Payload
\* Collections
\* Storage
\* Indexing
\* Quantization
\* Multitenancy
Search
\* Search
\* Filtering
\* Hybrid Queries
\* Explore
\* Text Search
\* Search Relevance
\* Low-Latency Search
Operations
\* Capacity Planning
\* Installation
\* Upgrades
\* Snapshots
\* Usage Statistics
\* Monitoring & Telemetry
\* Security
\* Troubleshooting
\* Configuration
\* Administration
\* Distributed Deployment
\* Running with GPU
\* Optimize Performance
\* Optimizer
Inference
Qdrant Edge
\* Quickstart
\* On-Device Embeddings
\* Data Synchronization Patterns
\* Synchronize with a Server
Qdrant Web UI
API & SDKs

##### Qdrant Tools

FastEmbed
\* Quickstart
\* FastEmbed & Qdrant
\* Optimize Throughput
\* Working with miniCOIL
\* Working with SPLADE
\* Working with ColBERT
\* Reranking with FastEmbed
\* Multi-Vector Postprocessing
Qdrant MCP Server

##### Tutorials

Overview
Basics
\* Semantic Search 101
Search Engineering
\* Hybrid Search with Reranking
\* Multivectors and Late Interaction
\* Relevance Feedback Retrieval in Qdrant
\* Semantic Search Basics
\* Semantic Search for Code
\* Collaborative Filtering
\* Hybrid Search with FastEmbed
\* Multivector Document Retrieval
\* Retrieval Quality Evaluation
\* Static Embeddings
Operations & Scale
\* Snapshots
\* Data Migration
\* Migrate to a New Embedding Model
\* Large-Scale Search
Develop & Implement
\* Bulk Operations
\* Async API

##### Support

FAQ
\* Qdrant Fundamentals
\* Database Optimization
Release Notes
\* Documentation
\* Manage data
\* Storage

### Storage

All data within one collection is divided into segments. Each segment has its independent vector and payload storage as well as indexes.
Data stored in segments usually do not overlap. However, storing the same point in different segments will not cause problems since the search contains a deduplication mechanism.
The segments consist of vector and payload storages, vector and payload indexes, and id mapper, which stores the relationship between internal and external ids.
A segment can be appendable or non-appendable depending on the type of storage and index used. You can freely add, delete and query data in the appendable segment. With non-appendable segment can only read and delete data.
The configuration of the segments in the collection can be different and independent of one another, but at least one `appendable' segment must be present in a collection.

#### Vector storage

Depending on the requirements of the application, Qdrant can use one of the data storage options. The choice has to be made between the search speed and the size of the RAM used.
**In-memory storage** - Stores all vectors in RAM, has the highest speed since disk access is required only for persistence.
**Memmap storage** - Creates a virtual address space associated with the file on disk. Wiki. Mmapped files are not directly loaded into RAM. Instead, they use page cache to access the contents of the file. This scheme allows flexible use of available memory. With sufficient RAM, it is almost as fast as in-memory storage.

##### Configuring Memmap storage

There are two ways to configure the usage of memmap(also known as on-disk) storage:
\* Set up on\_disk option for the vectors in the collection create API: *Available as of v1.2.0*
http python typescript rust java csharp go

```
PUT /collections/{collection_name}
{
    "vectors": {
      "size": 768,
      "distance": "Cosine",
      "on_disk": true
    }
}
```

```
from qdrant_client import QdrantClient, models

client = QdrantClient(url="http://localhost:6333")

client.create_collection(
    collection_name="{collection_name}",
    vectors_config=models.VectorParams(
        size=768, distance=models.Distance.COSINE, on_disk=True
    ),
)
```

```
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

client.createCollection("{collection_name}", {
  vectors: {
    size: 768,
    distance: "Cosine",
    on_disk: true,
  },
});
```

```
use qdrant_client::qdrant::{CreateCollectionBuilder, Distance, VectorParamsBuilder};
use qdrant_client::Qdrant;

let client = Qdrant::from_url("http://localhost:6334").build()?;

client
    .create_collection(
        CreateCollectionBuilder::new("{collection_name}")
            .vectors_config(VectorParamsBuilder::new(768, Distance::Cosine).on_disk(true)),
    )
    .await?;
```

```
import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.Distance;
import io.qdrant.client.grpc.Collections.VectorParams;

QdrantClient client =
    new QdrantClient(QdrantGrpcClient.newBuilder("localhost", 6334, false).build());

client
    .createCollectionAsync(
        "{collection_name}",
        VectorParams.newBuilder()
            .setSize(768)
            .setDistance(Distance.Cosine)
            .setOnDisk(true)
            .build())
    .get();
```

```
using Qdrant.Client;
using Qdrant.Client.Grpc;

var client = new QdrantClient("localhost", 6334);

await client.CreateCollectionAsync(
	"{collection_name}",
	new VectorParams
	{
		Size = 768,
		Distance = Distance.Cosine,
		OnDisk = true
	}
);
```

```
import (
	"context"

	"github.com/qdrant/go-client/qdrant"
)

client, err := qdrant.NewClient(&qdrant.Config{
	Host: "localhost",
	Port: 6334,
})

client.CreateCollection(context.Background(), &qdrant.CreateCollection{
	CollectionName: "{collection_name}",
	VectorsConfig: qdrant.NewVectorsConfig(&qdrant.VectorParams{
		Size:     768,
		Distance: qdrant.Distance_Cosine,
		OnDisk:   qdrant.PtrOf(true),
	}),
})
```

This will create a collection with all vectors immediately stored in memmap storage. This is the recommended way, in case your Qdrant instance operates with fast disks and you are working with large collections.
\* Set up memmap\_threshold option. This option will set the threshold after which the segment will be converted to memmap storage. There are two ways to do this:
1. You can set the threshold globally in the configuration file. The parameter is called memmap\_threshold (previously memmap\_threshold\_kb ).
1. You can set the threshold for each collection separately during creation or update.
http python typescript rust java csharp go

```
PUT /collections/{collection_name}
{
    "vectors": {
      "size": 768,
      "distance": "Cosine"
    },
    "optimizers_config": {
        "indexing_threshold": 20000
    }
}
```

```
from qdrant_client import QdrantClient, models

client = QdrantClient(url="http://localhost:6333")

client.create_collection(
    collection_name="{collection_name}",
    vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),
    optimizers_config=models.OptimizersConfigDiff(indexing_threshold=20000),
)
```

```
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

client.createCollection("{collection_name}", {
  vectors: {
    size: 768,
    distance: "Cosine",
  },
  optimizers_config: {
    indexing_threshold: 20000,
  },
});
```

```
use qdrant_client::qdrant::{
    CreateCollectionBuilder, Distance, OptimizersConfigDiffBuilder, VectorParamsBuilder,
};
use qdrant_client::Qdrant;

let client = Qdrant::from_url("http://localhost:6334").build()?;

client
    .create_collection(
        CreateCollectionBuilder::new("{collection_name}")
            .vectors_config(VectorParamsBuilder::new(768, Distance::Cosine))
            .optimizers_config(OptimizersConfigDiffBuilder::default().indexing_threshold(20000)),
    )
    .await?;
```

```
import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.CreateCollection;
import io.qdrant.client.grpc.Collections.Distance;
import io.qdrant.client.grpc.Collections.OptimizersConfigDiff;
import io.qdrant.client.grpc.Collections.VectorParams;
import io.qdrant.client.grpc.Collections.VectorsConfig;

QdrantClient client =
    new QdrantClient(QdrantGrpcClient.newBuilder("localhost", 6334, false).build());

client
    .createCollectionAsync(
        CreateCollection.newBuilder()
            .setCollectionName("{collection_name}")
            .setVectorsConfig(
                VectorsConfig.newBuilder()
                    .setParams(
                        VectorParams.newBuilder()
                            .setSize(768)
                            .setDistance(Distance.Cosine)
                            .build())
                    .build())
            .setOptimizersConfig(
                OptimizersConfigDiff.newBuilder().setIndexingThreshold(20000).build())
            .build())
    .get();
```

```
using Qdrant.Client;
using Qdrant.Client.Grpc;

var client = new QdrantClient("localhost", 6334);

await client.CreateCollectionAsync(
	collectionName: "{collection_name}",
	vectorsConfig: new VectorParams { Size = 768, Distance = Distance.Cosine },
	optimizersConfig: new OptimizersConfigDiff { IndexingThreshold = 20000 }
);
```

```
import (
	"context"

	"github.com/qdrant/go-client/qdrant"
)

client, err := qdrant.NewClient(&qdrant.Config{
	Host: "localhost",
	Port: 6334,
})

client.CreateCollection(context.Background(), &qdrant.CreateCollection{
	CollectionName: "{collection_name}",
	VectorsConfig: qdrant.NewVectorsConfig(&qdrant.VectorParams{
		Size:     768,
		Distance: qdrant.Distance_Cosine,
	}),
	OptimizersConfig: &qdrant.OptimizersConfigDiff{
		IndexingThreshold: qdrant.PtrOf(uint64(20000)),
	},
})
```

The rule of thumb to set the memmap threshold parameter is simple:
\* if you have a balanced use scenario - set memmap threshold the same as indexing\_threshold (default is 10000). In this case the optimizer will not make any extra runs and will optimize all thresholds at once.
\* if you have a high write load and low RAM - set memmap threshold lower than indexing\_threshold to e.g. 5000. In this case the optimizer will convert the segments to memmap storage first and will only apply indexing after that.
In addition, you can use memmap storage not only for vectors, but also for HNSW index. To enable this, you need to set the hnsw\_config.on\_disk parameter to true during collection creation or updating.
http python typescript rust java csharp go

```
PUT /collections/{collection_name}
{
    "vectors": {
      "size": 768,
      "distance": "Cosine",
      "on_disk": true
    },
    "hnsw_config": {
        "on_disk": true
    }
}
```

```
from qdrant_client import QdrantClient, models

client = QdrantClient(url="http://localhost:6333")

client.create_collection(
    collection_name="{collection_name}",
    vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE, on_disk=True),
    hnsw_config=models.HnswConfigDiff(on_disk=True),
)
```

```
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

client.createCollection("{collection_name}", {
  vectors: {
    size: 768,
    distance: "Cosine",
    on_disk: true,
  },
  hnsw_config: {
    on_disk: true,
  },
});
```

```
use qdrant_client::qdrant::{
    CreateCollectionBuilder, Distance, HnswConfigDiffBuilder,
    VectorParamsBuilder,
};
use qdrant_client::Qdrant;

let client = Qdrant::from_url("http://localhost:6334").build()?;

client
    .create_collection(
        CreateCollectionBuilder::new("{collection_name}")
            .vectors_config(VectorParamsBuilder::new(768, Distance::Cosine).on_disk(true))
            .hnsw_config(HnswConfigDiffBuilder::default().on_disk(true)),
    )
    .await?;
```

```
import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.CreateCollection;
import io.qdrant.client.grpc.Collections.Distance;
import io.qdrant.client.grpc.Collections.HnswConfigDiff;
import io.qdrant.client.grpc.Collections.VectorParams;
import io.qdrant.client.grpc.Collections.VectorsConfig;

QdrantClient client =
    new QdrantClient(QdrantGrpcClient.newBuilder("localhost", 6334, false).build());

client
    .createCollectionAsync(
        CreateCollection.newBuilder()
            .setCollectionName("{collection_name}")
            .setVectorsConfig(
                VectorsConfig.newBuilder()
                    .setParams(
                        VectorParams.newBuilder()
                            .setSize(768)
                            .setDistance(Distance.Cosine)
                            .setOnDisk(true)
                            .build())
                    .build())
            .setHnswConfig(HnswConfigDiff.newBuilder().setOnDisk(true).build())
            .build())
    .get();
```

```
using Qdrant.Client;
using Qdrant.Client.Grpc;

var client = new QdrantClient("localhost", 6334);

await client.CreateCollectionAsync(
	collectionName: "{collection_name}",
	vectorsConfig: new VectorParams { Size = 768, Distance = Distance.Cosine, OnDisk = true },
	hnswConfig: new HnswConfigDiff { OnDisk = true }
);
```

```
import (
	"context"

	"github.com/qdrant/go-client/qdrant"
)

client, err := qdrant.NewClient(&qdrant.Config{
	Host: "localhost",
	Port: 6334,
})

client.CreateCollection(context.Background(), &qdrant.CreateCollection{
	CollectionName: "{collection_name}",
	VectorsConfig: qdrant.NewVectorsConfig(&qdrant.VectorParams{
		Size:     768,
		Distance: qdrant.Distance_Cosine,
		OnDisk:   qdrant.PtrOf(true),
	}),
	HnswConfig: &qdrant.HnswConfigDiff{
		OnDisk: qdrant.PtrOf(true),
	},
})
```

#### Payload storage

Qdrant supports two types of payload storages: InMemory and OnDisk.
InMemory payload storage is organized in the same way as in-memory vectors. The payload data is loaded into RAM at service startup while disk and Gridstore are used for persistence only. This type of storage works quite fast, but it may require a lot of space to keep all the data in RAM, especially if the payload has large values attached - abstracts of text or even images.
In the case of large payload values, it might be better to use OnDisk payload storage. This type of storage will read and write payload directly to RocksDB, so it won't require any significant amount of RAM to store. The downside, however, is the access latency. If you need to query vectors with some payload-based conditions - checking values stored on disk might take too much time. In this scenario, we recommend creating a payload index for each field used in filtering conditions to avoid disk access. Once you create the field index, Qdrant will preserve all values of the indexed field in RAM regardless of the payload storage type.
You can specify the desired type of payload storage with configuration file or with collection parameter on\_disk\_payload during creation of the collection.

#### Versioning

To ensure data integrity, Qdrant performs all data changes in 2 stages. In the first step, the data is written to the Write-ahead-log(WAL), which orders all operations and assigns them a sequential number.
Once a change has been added to the WAL, it will not be lost even if a power loss occurs. Then the changes go into the segments. Each segment stores the last version of the change applied to it as well as the version of each individual point. If the new change has a sequential number less than the current version of the point, the updater will ignore the change. This mechanism allows Qdrant to safely and efficiently restore the storage from the WAL in case of an abnormal shutdown.

###### Was this page useful?

Yes
No
Thank you for your feedback! 🙏
We are sorry to hear that. 😔 You can edit this page on GitHub, or create a GitHub issue.
On this page:
\* Storage
\* Vector storage
\* Configuring Memmap storage
\* Payload storage
\* Versioning
\* View as Markdown
\* Edit on Github
\* Create an issue

###### Ready to get started with Qdrant?

Start Free
© 2025 Qdrant.
Terms Privacy Policy Impressum

#### About cookies on this site

We use cookies to collect and analyze information on site performance and usage, to provide social media features, and to enhance and customize content and advertisements. Learn more
Cookies Settings Accept All Cookies

#### Privacy Preference Center

Cookies used on the site are categorized, and below, you can read about each category and allow or deny some or all of them. When categories that have been previously allowed are disabled, all cookies assigned to that category will be removed from your browser. Additionally, you can see a list of cookies assigned to each category and detailed information in the cookie declaration.
More information
Allow All

##### Manage Consent Preferences

###### Targeting Cookies

[x]
Targeting Cookies
These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.

###### Functional Cookies

[x]
Functional Cookies
These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.

###### Strictly Necessary Cookies

Always Active
These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.

###### Performance Cookies

[x]
Performance Cookies
These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.

##### Cookie List

Clear [-]
checkbox label label
Apply Cancel
Consent Leg.Interest [-]
checkbox label label [-]
checkbox label label [-]
checkbox label label
Reject All Confirm My Choices
×
Powered by
