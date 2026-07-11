---
id_fonte: "8e78b445-5ae1-4876-99a3-95fee1c29a61"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Neon Postgres & Astro | Docs"
tipo: "unknown"
url_original: "https://docs.astro.build/en/guides/backend/neon/"
keywords: "('Astro web framework', 'Neon Postgres integration', 'Database branching', 'Environment configuration', 'Serverless database queries')"
summary: "This documentation serves as a technical manual for integrating **Neon**, a serverless Postgres database, into applications built with the **Astro web framework**. It provides a step-by-step workflow for developers, covering essential setup tasks such as **environment configuration**, installing the serverless driver, and initializing a database client. Beyond basic connectivity, the guide highlights advanced features like **database branching** for separate development environments and demonstrates how to perform **on-demand data fetching** within components. Ultimately, the text functions as a specific roadmap within the broader Astro ecosystem, helping users build **dynamic, data-driven websites** by leveraging managed cloud infrastructure."
extraido_em: "2026-06-30T16:21:01Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Neon Postgres & Astro | Docs

Neon Postgres & Astro | Docs
Skip to content
Search K
GitHub Discord
Select theme
Dark
Light
Auto
Select language
English
Deutsch
Português do Brasil
Español
简体中文
正體中文
Français
हिन्दी
العربية
日本語
한국어
Polski
Русский
Italiano
\* Tutorial
\* Guide
\* Reference
\* Ecosystem
\* Introduction
\* Unit 1 - Setup
\* Unit 2 - Pages
\* Unit 3 - Components
\* Unit 4 - Layouts
\* Unit 5 - Astro API
\* Unit 6 - Astro Islands
\* Welcome, world!
\* Why Astro?
\* Islands architecture
\* Courses
\* Start a new project
\* Installation
\* Project structure
\* Develop and build
\* Configuration
\* Configuration overview
\* Editor setup
\* TypeScript
\* Environment variables
\* Working with integrations
\* Build with AI
\* Dev toolbar
\* Routing and navigation
\* Pages
\* Routing
\* Endpoints
\* Middleware
\* Internationalization (i18n)
\* Prefetch
\* View transitions
\* Build your UI
\* Components
\* Layouts
\* Styles and CSS
\* Fonts
\* Syntax Highlighting
\* Scripts and event handling
\* Front-end frameworks
\* Add content to your site
\* Markdown
\* Content collections
\* Images
\* Data fetching
\* Astro DB
\* Server rendering
\* On-demand rendering
\* Server islands
\* Actions
\* Sessions
\* Upgrade
\* Upgrade Astro
\* Major upgrade guides
\* v6.0
\* v5.0
\* v4.0
\* v3.0
\* v2.0
\* v1.0
\* Troubleshooting
\* How-to recipes
\* Recipes overview
\* Installing a Vite or Rollup plugin
\* Analyze bundle size
\* Build a custom image component
\* Build HTML forms in Astro pages
\* Build forms with API routes
\* Use Bun with Astro
\* Call endpoints from the server
\* Verify a Captcha
\* Customize file names in the build output
\* Build your Astro site with Docker
\* Dynamically import images
\* Add icons to external links
\* Add i18n features
\* Create a dev toolbar app
\* Add last modified time
\* Add reading time
\* Add an RSS feed
\* Share state between Astro components
\* Share state between islands
\* Using streaming to improve page performance
\* Style rendered Markdown with Tailwind Typography
\* Migrate to Astro
\* Site migration overview
\* Create React App
\* Docusaurus
\* Eleventy
\* Gatsby
\* GitBook
\* Gridsome
\* Hugo
\* Jekyll
\* Next.js
\* NuxtJS
\* Pelican
\* SvelteKit
\* VuePress
\* WordPress
\* Contribute to Astro
\* Astro Template Syntax
\* Template expressions reference
\* Template directives reference
\* Configuration Reference
\* CLI Commands
\* Imports reference
\* Routing Reference
\* Runtime API
\* Render context
\* astro:actions
\* astro/app
\* astro:assets
\* astro:config
\* astro:content
\* astro:env
\* astro:i18n
\* astro:middleware
\* astro:static-paths
\* astro:transitions
\* astro/zod
\* Other development APIs
\* Integration API
\* Adapter API
\* Content Loader API
\* Image Service API
\* Dev Toolbar App API
\* Session Driver API
\* Font Provider API
\* Container API (experimental)
\* Programmatic Astro API (experimental)
\* Experimental features
\* Configuring experimental flags
\* Route caching
\* Client prerendering
\* Intellisense for collections
\* Chrome DevTools workspace
\* SVG optimization
\* Queued rendering
\* Rust compiler
\* Legacy flags
\* Error reference
\* UI frameworks
\* Alpine.js
\* Preact
\* React
\* SolidJS
\* Svelte
\* Vue
\* Adapters
\* Cloudflare
\* Netlify
\* Node
\* Vercel
\* Other official integrations
\* DB
\* Markdoc
\* MDX
\* Partytown
\* Sitemap
\* Deployment guides
\* Deployment overview
\* AWS
\* AWS via Flightcontrol
\* AWS via SST
\* Azion
\* Buddy
\* Cleavr
\* Clever Cloud
\* Cloudflare
\* CloudRay
\* Deno Deploy
\* DeployHQ
\* EdgeOne Pages
\* Firebase
\* Fleek
\* Fly.io
\* GitHub Pages
\* GitLab Pages
\* Google Cloud
\* Heroku
\* Juno
\* Microsoft Azure
\* Netlify
\* Railway
\* Render
\* Seenode
\* Sevalla
\* Stormkit
\* Surge
\* Vercel
\* Zeabur
\* Zephyr Cloud
\* Zerops
\* Content management systems
\* CMS overview
\* ApostropheCMS
\* Builder.io
\* ButterCMS
\* Caisy
\* CloudCannon
\* Contentful
\* Cosmic
\* Craft CMS
\* Craft Cross CMS
\* Crystallize
\* DatoCMS
\* Decap CMS
\* Directus
\* Drupal
\* Flotiq
\* Front Matter CMS
\* Ghost
\* GitCMS
\* Hashnode
\* Hygraph
\* JekyllPad
\* Keystatic
\* KeystoneJS
\* Kontent.ai
\* microCMS
\* Optimizely CMS
\* Payload CMS
\* Prepr CMS
\* Prismic
\* Sanity
\* Sitecore XM
\* Sitepins
\* Spinal
\* Statamic
\* Storyblok
\* Strapi
\* StudioCMS
\* Tina CMS
\* Umbraco
\* Vault CMS
\* Wordpress
\* Backend services
\* Backend services overview
\* Appwrite
\* Firebase
\* Neon
\* Prisma Postgres
\* Sentry
\* Supabase
\* Turso
\* Xata
\* Image and video hosting
\* Media hosting overview
\* Cloudinary
\* Mux
\* E-commerce
\* Authentication
\* Testing

#### Sponsored by

GitHub Discord
Select theme
Dark
Light
Auto
Select language
English
Deutsch
Português do Brasil
Español
简体中文
正體中文
Français
हिन्दी
العربية
日本語
한국어
Polski
Русский
Italiano

#### Sponsored by

On this page
Overview
\* Overview
\* Adding Neon to your Astro project
\* Prerequisites
\* Environment configuration
\* Installing dependencies
\* Creating a Neon client
\* Querying your Neon database
\* Database branching with Neon
\* Resources

#### On this page

```
*  Overview
*  Adding Neon to your Astro project
    *  Prerequisites
    *  Environment configuration
    *  Installing dependencies
    *  Creating a Neon client
*  Querying your Neon database
*  Database branching with Neon
*  Resources
```

#### Learn Astro with **Coding in Public**

150+ video lessons
• Astro v5 ready
Get 20% off

### Neon Postgres & Astro

Neon is a fully managed serverless Postgres database. It separates storage and compute to offer autoscaling, branching, and bottomless storage.

#### Adding Neon to your Astro project

Section titled “Adding Neon to your Astro project”

##### Prerequisites

Section titled “Prerequisites”
\* A Neon account with a created project
\* Neon database connection string
\* An Astro project with on-demand rendering (SSR) enabled

##### Environment configuration

Section titled “Environment configuration”
To use Neon with Astro, you will need to set a Neon environment variable. Create or edit the .env file in your project root, and add the following code, replacing your own project details:
.env

```
NEON_DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```

For better TypeScript support, define environment variables in a src/env.d.ts file:
src/env.d.ts

```
interface ImportMetaEnv {
  readonly NEON_DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

Learn more about environment variables and .env files in Astro.

##### Installing dependencies

Section titled “Installing dependencies”
Install the @neondatabase/serverless package to connect to Neon:
Terminal window

```
npm install @neondatabase/serverless
```

##### Creating a Neon client

Section titled “Creating a Neon client”
Create a new file src/lib/neon.ts with the following code to initialize your Neon client:
src/lib/neon.ts

```
import { neon } from '@neondatabase/serverless';

export const sql = neon(import.meta.env.NEON_DATABASE_URL);
```

#### Querying your Neon database

Section titled “Querying your Neon database”
You can now use the Neon client to query your database from any .astro component. The following example fetches the current time from the Postgres database:
src/pages/index.astro

```
---
import { sql } from '../lib/neon';

const response =  await  sql`SELECT NOW() as current_time`;
const currentTime = response[0].current_time;
---

<h1>Current Time</h1>
<p>The time is: {currentTime}</p>
```

#### Database branching with Neon

Section titled “Database branching with Neon”
Neon's branching feature lets you create copies of your database for development or testing. Use this in your Astro project by creating different environment variables for each branch:
.env.development

```
NEON_DATABASE_URL=your_development_branch_url
```

.env.production

```
NEON_DATABASE_URL=your_production_branch_url
```

#### Resources

Section titled “Resources”
\* Neon documentation
\* Neon serverless driver GitHub
\* Connect an Astro site or application to Neon Postgres

#### More backend service guides

##### Appwrite

##### Firebase

##### Neon

##### Prisma Postgres

##### Sentry

##### Supabase

##### Turso

##### Xata

Recipes

#### Learn Astro with **Coding in Public**

150+ video lessons
• Astro v5 ready
Get 20% off
Edit page Translate this page
Previous Firebase Next Prisma Postgres
Contribute Community Sponsor
