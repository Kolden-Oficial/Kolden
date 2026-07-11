---
id_fonte: "b28b293b-a6e0-4eb3-b304-33882e86d8f6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "LobeChat | Coolify Docs"
tipo: "unknown"
url_original: "https://coolify.io/docs/services/lobe-chat"
keywords: "('LobeChat AI Framework', 'Coolify Cloud Platform', 'Application Deployment', 'Database Management', 'API Reference Guide')"
summary: "This documentation serves as a comprehensive guide for **Coolify**, a powerful self-hosting platform designed to manage and automate the deployment of applications, databases, and services. The text outlines an expansive **infrastructure ecosystem**, highlighting features like **CI/CD integration**, automated backups, and a robust **API reference** for programmatic server management. Within this technical framework, the guide specifically introduces **LobeChat**, a versatile, **open-source AI chat framework** that allows users to integrate multiple AI models and manage knowledge bases on their own hardware. Ultimately, the source functions as both a **technical manual** for system administrators and a specialized directory for deploying **modern, privacy-focused AI applications** through a centralized dashboard."
extraido_em: "2026-06-30T16:20:48Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# LobeChat | Coolify Docs

LobeChat | Coolify Docs
Skip to content
Coolify Docs
Main Navigation Coolify Cloud
Resources
Releases
Support
Sponsor us
Appearance
Menu
On this page
Search K
Sidebar Navigation

#### Get Started

Introduction
[

##### Installation

](<https://coolify.io/docs/get-started/installation>)
Upgrade
Downgrade
Uninstallation
Cloud
Usage
[

##### Concepts

](<https://coolify.io/docs/get-started/concepts>)
Screenshots
Videos
Team
Support
Sponsors

##### Contribute

Coolify
New Service
Documentation

#### Applications

Overview

##### Frameworks

Django
Jekyll
Laravel
Phoenix
Ruby on Rails
Symfony
Next.js
Vite
Vue
Nuxt
SvelteKit
[

##### Build Packs

](<https://coolify.io/docs/applications/build-packs/overview>)
Static
[

###### Nixpacks

](<https://coolify.io/docs/applications/build-packs/nixpacks>)
Node Versioning
Dockerfile
Docker Compose
[

##### CI/CD

](<https://coolify.io/docs/applications/ci-cd/introduction>)

###### Github

Overview
Actions
Auto Deploy
Preview Deploy
Deploy Public Repository
Setup Deploy Key
Setup Github App
Switch Github Apps
Gitlab
Bitbucket
Gitea
Other Providers

#### Services

Introduction
All One-Click Services
Services Directory

#### Databases

[

##### Overview

](<https://coolify.io/docs/databases/index>)
Database SSL
Backups
MySQL
MariaDB
PostgreSQL
MongoDB
Redis
DragonFly
KeyDB
Clickhouse

#### Integrations

##### Cloudflare

###### Tunnels

Overview
All Resources
Single Resource
Server SSH Access
Full TLS/HTTPS
DDoS Protection

#### Knowledge Base

[

##### Overview

](<https://coolify.io/docs/knowledge-base/overview>)

###### Internal

Scalability
Terminal

###### Self-hosted Instance

Monitoring
Notifications
Coolify Updates
Commands
Delete User
OAuth
Default Root User
Custom Docker Network
Custom Docker Registry
Custom Compose Overrides
Change Localhost Key

###### DNS & Domains

DNS Configuration
Domains

###### Destinations

Overview
Creating Destinations
Managing Destinations

###### Resources

Environment Variables
Persistent Storage
Drain Logs
Rolling Updates
Health Checks
Cron Syntax

###### How-Tos

Migrate Applications
Backup & Restore Coolify
Load-balancing on Hetzner
WordPress Multisite
Raspberry Pi OS Setup
Private NPM Registry
Ollama with GPU
Webstudio with Hetzner

###### Servers

Introduction
Automated Cleanup
Build Server
Firewall
Multiple Servers
Sentinel and Metrics
Non-root User
OpenSSH
Oracle Cloud
Proxies
Server Patching
Terminal Access

###### S3

Introduction
AWS
R2

###### Docker

Compose
Docker Commands
Registry
Swarm

###### Proxy

###### Traefik

Overview
Basic Auth
Custom SSL Certificates
Dashboard
[

###### Custom Middlewares

](<https://coolify.io/docs/knowledge-base/proxy/traefik/custom-middlewares>)
Redirects
Dynamic Configurations
Load Balancing
Wildcard SSL Certificates
Protect Services with Authentik

###### Caddy

Overview
Basic Auth
FAQ

#### API Reference

Authorization

##### Applications

GET List
POST Create (Public)
POST Create (Private - GH App)
POST Create (Private - Deploy Key)
POST Create (Dockerfile without git)
POST Create (Docker Image without git)
POST Create (Docker Compose)
GET Get
DELETE Delete
PATCH Update
GET Get application logs.
GET List Envs
POST Create Env
PATCH Update Env
PATCH Update Envs (Bulk)
DELETE Delete Env
GET Start
GET Stop
GET Restart

##### Cloud Tokens

GET List Cloud Provider Tokens
POST Create Cloud Provider Token
GET Get Cloud Provider Token
DELETE Delete Cloud Provider Token
PATCH Update Cloud Provider Token
POST Validate Cloud Provider Token

##### Databases

GET List
GET Get
POST Create Backup
GET Get
DELETE Delete
PATCH Update
DELETE Delete backup configuration
PATCH Update
POST Create (PostgreSQL)
POST Create (Clickhouse)
POST Create (DragonFly)
POST Create (Redis)
POST Create (KeyDB)
POST Create (MariaDB)
POST Create (MySQL)
POST Create (MongoDB)
DELETE Delete backup execution
GET List backup executions
GET Start
GET Stop
GET Restart

##### Deployments

GET List
GET Get
POST Cancel
GET Deploy
GET List application deployments

##### GitHub Apps

GET List
POST Create GitHub App
GET Load Repositories for a GitHub App
GET Load Branches for a GitHub Repository
DELETE Delete GitHub App
PATCH Update GitHub App

##### Hetzner

GET Get Hetzner Locations
GET Get Hetzner Server Types
GET Get Hetzner Images
GET Get Hetzner SSH Keys
POST Create Hetzner Server

##### Default

GET Version
GET Enable API
GET Disable API
GET Healthcheck

##### Projects

GET List
POST Create
GET Get
DELETE Delete
PATCH Update
GET Environment
GET List Environments
POST Create Environment
DELETE Delete Environment

##### Resources

GET List

##### Private Keys

GET List
POST Create
PATCH Update
GET Get
DELETE Delete

##### Servers

GET List
POST Create
GET Get
DELETE Delete
PATCH Update
GET Resources
GET Domains
GET Validate

##### Services

GET List
POST Create service
GET Get
DELETE Delete
PATCH Update
GET List Envs
POST Create Env
PATCH Update Env
PATCH Update Envs (Bulk)
DELETE Delete Env
GET Start
GET Stop
GET Restart

##### Teams

GET List
GET Get
GET Members
GET Authenticated Team
GET Authenticated Team Members

#### Troubleshoot

Overview

##### Installation

Coolify Installation Failed
Docker Installation Failed

##### Applications

Bad Gateway (502)
No Available Server (503)
Gateway Timeout (504)
Failed To Get Access Token During Deployment

##### Dashboard

Inaccessible
Very Slow
Disable 2FA Manually

##### Docker

Expired GitHub Personal Access Token (PAT)

##### Server

Connection Unstable
Crash During Build
2FA Stopped Working
Raspberry Pi Crashes
Server Validation Issues

##### DNS & Domains

Wildcard SSL not working
Let's Encrypt not working
Cert Resolver doesn't exist
On this page
\* What is LobeChat?
\* Features
\* Links
Are you an LLM? You can read better optimized documentation at /docs/services/lobe-chat.md for this page in Markdown format

### LobeChat

#### What is LobeChat?

LobeChat is an open-source, modern AI chat framework built for everyone. It supports multi AI providers, knowledge base management, and plugin system to provide a comprehensive AI chat experience.

#### Features

```
*   **Multi-Provider Support** : Compatible with OpenAI, Claude, Gemini, and many other AI providers
*   **Knowledge Base** : Built-in knowledge base management for enhanced AI responses
*   **Plugin System** : Extensible plugin architecture for custom functionality
*   **Modern UI** : Beautiful and responsive user interface
*   **Self-Hosted** : Full control over your data and privacy
*   **Multi-Modal** : Support for text, image, and file inputs
```

#### Links

```
*  Official Website
*  Official Documentation
*  GitHub Repository
```

Edit this page on GitHub
Last updated: 10/8/25, 5:04 AM
Pager
Next page Introduction
