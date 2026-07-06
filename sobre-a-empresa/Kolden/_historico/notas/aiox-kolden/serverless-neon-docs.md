---
id_fonte: "86af580c-fad2-4dc3-955b-e8427b073767"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Serverless - Neon Docs"
tipo: "unknown"
url_original: "https://neon.com/docs/introduction/serverless"
keywords: "('Serverless Postgres', 'Lakebase architecture', 'Compute autoscaling', 'Usage-based pricing', 'Database branching')"
summary: "Neon provides a modern, **serverless Postgres platform** that reimagines database management by using a **lakebase architecture** to split storage from compute. This technical separation allows the system to offer **instant provisioning** and **autoscaling**, where resources automatically expand during high traffic and shrink to zero when not in use. The documentation emphasizes a **usage-based billing model** and the removal of infrastructure maintenance, allowing developers to focus entirely on their application logic. Furthermore, the text clarifies that while the platform is \"serverless,\" it remains **fully compatible** with the traditional PostgreSQL ecosystem and provides predictable cost controls through user-defined scaling limits."
extraido_em: "2026-06-30T16:21:58Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Serverless - Neon Docs

Serverless - Neon Docs
Team accounts with unlimited members now available to everyone! Invite your teammates and ship faster together, even on the Free Plan.
Neon
Docs
Search... ⌘K
Ask AI
Log in Sign up
\* Get started
\* About
\* Connect
\* Connect to Neon
\* Clients & tools
\* Troubleshooting
\* Develop
\* Frontend & Frameworks
\* Frameworks
\* Languages
\* ORMs
\* Backend
\* Data API
\* Neon Auth
\* Postgres RLS
\* AI
\* AI for Agents
\* AI App Starter Kit
\* Tools & Workflows
\* API, CLI & SDKs
\* Local development
\* Integrations (3rd party)
\* Workflows & CI/CD
\* Templates
\* Examples repo
\* Manage
\* Neon platform
\* Plans and billing
\* Security & compliance
\* Postgres
\* Extensions
\* Postgres guides
\* Compatibility
\* Version support
\* Upgrade
\* PostgreSQL Tutorial
\* Resources
\* Status
\* Support
\* Changelog
\* Roadmap
\* Early access
\* Community
\* Glossary
\* RSS feeds
\* Platform integration
Search... ⌘K
Ask AI
About Neon
\* Architecture
\* Architecture overview
\* Compute lifecycle
\* Serverless
\* Autoscaling
\* Overview
\* Autoscaling architecture
\* Autoscaling algorithm
\* Configure autoscaling
\* Scale to zero
\* Scale to zero
\* Scale to zero guide
\* Branching
\* Get started with branching
\* About branching
\* Branching workflows
\* Branch archiving
\* Branch expiration
\* Schema-only branches
\* Reset from parent
\* Read replicas
\* Overview
\* Create and manage
\* Use cases
\* Read-only access
\* Ad-hoc queries
\* Analytics queries
\* Scale applications
\* With ORMs
\* Prisma
\* Logical replication
\* Getting started
\* Concepts
\* In Neon
\* Commands
\* Schema changes
\* Tips
\* Data recovery
\* Backup & restore
\* Restore window
\* Instant restore
\* Time Travel
\* Time Travel tutorial
\* Schema diff
\* Schema diff tutorial
\* Data protection
\* IP Allow
\* Private Networking
\* Protected branches
\* High availability
\* High availability
/ Serverless

### Serverless

Postgres with instant provisioning, no server management, and pay-per-usage billing
Copy page
Neon takes the world's most loved database — Postgres — and delivers it as a serverless platform, enabling teams to ship reliable and scalable applications faster.
Enabling serverless Postgres begins with Neon's lakebase architecture — a native decoupling of storage and compute. By separating these components, Neon can dynamically scale up during periods of high activity and down to zero when idle. Developers can be hands-off instead of sizing infrastructure manually.
This serverless character also makes Neon databases highly agile and well-suited for use cases that require automatic creation, management, and deletion of a high number of Postgres databases, like database-per-user architectures with thousands of tenants, as well as database branching workflows that accelerate development by enabling the management of dev/testing databases via CI/CD.
Read our lakebase architecture section for more information on how Neon is built.

#### What “serverless” means to us

At Neon, we interpret “serverless” not only as the absence of servers to manage but as a set of principles and features designed to streamline your development process and optimize operational efficiency for your database.
To us, serverless means:
\* **Instant provisioning** : Neon allows you to spin up Postgres databases in seconds, eliminating the long setup times traditionally associated with database provisioning.
\* **No server management** : You don't have to deal with the complexities of provisioning, maintaining, and administering servers. Neon handles it all, so you can focus on your application.
\* **Autoscaling** : Compute resources automatically scale up or down based on real-time demand, ensuring optimal performance without manual intervention. No restarts are required.
\* **Usage-based pricing** : Your costs are directly tied to the resources your workload consumes (both compute and storage). There's no need to over-provision or pay for idle capacity.
\* **Built-in availability and fault tolerance** : We've designed our architecture for high availability and resilience, ensuring your data is safe and your applications are always accessible.
\* **Focus on business logic** : With the heavy lifting of infrastructure management handled by Neon, you can dedicate your time and effort to writing code and delivering value to your users.

#### To us, serverless does not mean…

*That Neon only works with serverless architectures* . Neon is fully compatible with the entire PostgreSQL ecosystem. Whether you're using Django, Rails, or even a bash script in your basement, if it works with Postgres, it works with Neon.
*That you have to pay per query* . Your charges are based on compute and storage usage, not the number of queries. For example, you could run billions of queries for as little as $19 per month if they fit within the resources allotted in the Launch plan. The CPU allowance is ample for running sites 24/7 with low CPU requirements.
*That you'll get unpredictable costs due to traffic spikes* . We provide transparency in your potential costs. You always set a maximum autoscaling limit to avoid unpredictable bills, and you can always check your consumption. We send you notifications if your storage usage grows quickly.

#### Learn more

```
*  Autoscaling
*  Scale to Zero
*  Plans and billing
*  Database-per-tenant use cases
*  Variable workload use cases
*  Postgres for SaaS use cases
```

Was this page helpful?
Yes No
Thank you for your feedback!
Edit on GitHub
Previous Compute lifecycle Next Overview

##### On this page

```
*  What “serverless” means to us
*  To us, serverless does not mean…
*  Learn more
```

Set up Neon with AI
Copy neon init command
Neon Docs
Neon
A Databricks Company
All systems operational
© Neon 2026. All rights reserved. Apache, Apache Spark, Spark, the Spark Logo, Apache Iceberg, Iceberg, and the Apache Iceberg logo are trademarks of the Apache Software Foundation.
Privacy Notice Terms of Use Modern Slavery Statement California Privacy
Company
\* About
\* Blog
\* Careers
\* Contact Sales
\* Security
\* Legal
\* Privacy Policy
\* Terms of Use
\* DPA
\* Subprocessors List
\* Cookie Policy
\* Business Information
Resources
\* Docs
\* Changelog
\* Support
\* Community Guides
\* PostgreSQL Tutorial
\* Startups
Community
\* Discord
\* GitHub
\* X.com
\* LinkedIn
\* YouTube
Compliance
\* CCPA Compliant
\* GDPR Compliant
\* ISO 27001 Certified
\* ISO 27701 Certified
\* SOC 2 Certified
\* HIPAA Compliant
\* Compliance Guide
\* Neon's Sub Contractors
\* Trust Center
