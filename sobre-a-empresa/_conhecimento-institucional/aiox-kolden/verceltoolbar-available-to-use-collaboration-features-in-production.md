---
id_fonte: "23819058-44ff-4b5f-94c0-8f124a031a63"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "vercel/toolbar available to use collaboration features in production"
tipo: "unknown"
url_original: "https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production"
keywords: "('Vercel toolbar', 'Collaboration features', 'Production deployments', 'Feedback and comments', 'Visual editing')"
summary: "Vercel has introduced a new **npm package** that allows developers to integrate **collaboration features** directly into their live production sites and local environments. This tool bridges the gap between development and deployment by enabling teams to use **interactive comments**, **visual editing**, and **draft mode** on any platform. By making these features accessible to **all users across every plan**, the company aims to streamline the feedback loop between engineers and stakeholders. This update represents a significant expansion of the **Vercel Toolbar**, transforming it from a preview-only utility into a robust **production-ready resource** for modern web development."
extraido_em: "2026-06-30T16:22:52Z"
extraido_por: "notebooklm-py-0.7.3"
---

# vercel/toolbar available to use collaboration features in production

@vercel/toolbar available to use collaboration features in production - Vercel
Skip to content
\* Products

###### AI Cloud

```
*  v0 Build applications with AI
    *  AI SDK The AI Toolkit for TypeScript
        *  AI Gateway One endpoint, all your models
        *  Vercel Agent An agent that knows your stack
        *  Sandbox AI workflows in live environments
```

###### Core Platform

```
*  CI/CD Helping teams ship 6× faster
    *  Content Delivery Fast, scalable, and reliable
        *  Fluid Compute Servers, in serverless form
        *  Observability Trace every step
```

###### Security

```
*  Bot Management Scalable bot protection
    *  BotID Invisible CAPTCHA
        *  Platform Security DDoS Protection, Firewall
        *  Web Application Firewall Granular, custom protection
*  Resources
```

###### Company

```
*  Customers Trusted by the best teams
    *  Blog The latest posts and changes
        *  Changelog See what shipped
        *  Press Read the latest news
        *  Events Join us at an event
```

###### Learn

```
*  Docs Vercel documentation
    *  Academy Linear courses to level up
        *  Knowledge Base Find help quickly
        *  Community Join the conversation
```

###### Open Source

```
*  Next.js The native Next.js platform
    *  Nuxt The progressive web framework
        *  Svelte The web's efficient UI framework
        *  Turborepo Speed with Enterprise scale
*  Solutions
```

###### Use Cases

```
*  AI Apps Deploy at the speed of AI
    *  Composable Commerce Power storefronts that convert
        *  Marketing Sites Launch campaigns fast
        *  Multi-tenant Platforms Scale apps with one codebase
        *  Web Apps Ship features, not infrastructure
```

###### Tools

```
*  Marketplace Extend and automate workflows
    *  Templates Jumpstart app development
        *  Partner Finder Get help from solution partners
```

###### Users

```
*  Platform Engineers Automate away repetition
    *  Design Engineers Deploy for every idea
*  Enterprise
*  Pricing
```

Ask AI
Ask AI Log In
Sign Up
Sign Up
Blog / Changelog

### @vercel/toolbar available to use collaboration features in production

George Karagkiaouris Software Engineer
Shaquil Hansford Content Developer
1 min read
Copy URL
Copied to clipboard!
Sep 22, 2023
Comments and other collaboration features are available in all Preview Deployments on Vercel. Now, you can enable them in Production Deployments and localhost by injecting the Vercel toolbar on any site with our @vercel/toolbar package.

```
1
import { VercelToolbar } from '@vercel/toolbar/next';
2
import { useIsEmployee } from 'lib/auth'; // Your auth library
3
 
4
export function StaffToolbar() {
5
  const isEmployee = useIsEmployee();
6
  return isEmployee ? <VercelToolbar /> : null;
7
}
```

By using the @vercel/toolbar npm package you and your team can leave feedback with Comments, take advantage of Draft Mode to view unpublished CMS content, or use Visual Editing on your production application.
This package is available to users on all plans and is our first step in bringing the Vercel Toolbar into your production sites.
Check out the documentation to learn more.
**Ready to deploy?** Start building with a free account. Speak to an expert for your *Pro* or Enterprise needs.
Start Deploying
Talk to an Expert
**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.
Explore Enterprise

#### Get Started

```
*  Templates
*  Supported frameworks
*  Marketplace
*  Domains
```

#### Build

```
*  Next.js on Vercel
*  Turborepo
*  v0
```

#### Scale

```
*  Content delivery network
*  Fluid compute
*  CI/CD
*  Observability
*  AI Gateway New
*  Vercel Agent New
```

#### Secure

```
*  Platform security
*  Web Application Firewall
*  Bot management
*  BotID
*  Sandbox New
```

#### Resources

```
*  Pricing
*  Customers
*  Enterprise
*  Articles
*  Startups
*  Solution partners
```

#### Learn

```
*  Docs
*  Blog
*  Changelog
*  Knowledge Base
*  Academy
*  Community
```

#### Frameworks

```
*  Next.js
*  Nuxt
*  Svelte
*  Nitro
*  Turbo
```

#### SDKs

```
*  AI SDK
*  Workflow SDK New
*  Flags SDK
*  Chat SDK
*  Streamdown AI New
```

#### Use Cases

```
*  Composable commerce
*  Multi-tenant platforms
*  Web apps
*  Marketing sites
*  Platform engineers
*  Design engineers
```

#### Company

```
*  About
*  Careers
*  Help
*  Press
*  Legal
*  Privacy Policy
```

#### Community

```
*  Open source program
*  Events
*  Shipped on Vercel
*  GitHub
*  LinkedIn
*  X
*  YouTube
```

All systems normal.
Select a display theme: [x] system system [-] light light [-] dark dark
