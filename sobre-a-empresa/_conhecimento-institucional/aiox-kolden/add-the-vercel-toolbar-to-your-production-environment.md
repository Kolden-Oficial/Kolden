---
id_fonte: "a6e92f31-02d8-4b79-b0b8-8d5d2e9291f0"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Add the Vercel Toolbar to your production environment"
tipo: "unknown"
url_original: "https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production"
keywords: "('Vercel Toolbar', 'Production Environment', 'Browser Extension', 'Package Installation', 'Team Settings')"
summary: "This documentation provides a comprehensive guide on how to integrate the **Vercel Toolbar** into a **production environment** to facilitate team collaboration and site auditing. To maintain a professional user experience, the guide outlines two primary implementation methods: using a **browser extension** for a seamless setup or installing a **dedicated software package** for more granular, conditional control. Beyond technical installation, the text explains how to **manage visibility settings** via the project dashboard and highlights essential features like **commenting integrations** and accessibility tools. Ultimately, the source serves as a practical manual for developers to safely bridge the gap between **development feedback** and live site performance."
extraido_em: "2026-06-30T16:18:05Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Add the Vercel Toolbar to your production environment

Add the Vercel Toolbar to your production environment
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

Search Documentation Search... ⌘ K
Ask AI
Search Documentation Search... ⌘ K
Ask AI
Toolbar
Add to Environments
Add to Production
Next.js (/app)
Choose a framework to optimize documentation to:
\* Next.js (/app)
\* Next.js (/pages)
\* SvelteKit
\* Nuxt
\* Other frameworks
\* Getting Started
\* Fundamental Concepts Expand menu
\* Supported Frameworks Expand menu
\* Incremental Migration
\* Production Checklist
\* Knowledge Base
\* APIs & SDKs Expand menu
\* Access Expand menu
\* AI Expand menu
\* Build & Deploy Expand menu
\* CDN Expand menu
\* CLI Expand menu
\* Collaboration Expand menu
\* Comments Expand menu
\* Draft Mode
\* Edit Mode
\* Toolbar Expand menu
\* Add to Environments Expand menu
\* Add to Localhost
\* Add to Production
\* Managing Toolbar
\* Browser Extensions
\* Accessibility Audit Tool
\* Interaction Timing Tool
\* Layout Shift Tool
\* Compute Expand menu
\* Flags Expand menu
\* Integrations Expand menu
\* Multi-tenant Expand menu
\* Observability Expand menu
\* Platform Expand menu
\* Pricing Expand menu
\* Security Expand menu
\* Storage Expand menu
Toolbar
Add to Environments
Add to Production

### Add the Vercel Toolbar to your production environment

Ask AI about this page
Last updated March 17, 2026
As a team owner or member, you can enable the toolbar in your production environment for sites that your team(s) own, either through the dashboard or by adding the @vercel/toolbar package to your project.

#### Adding the toolbar using the browser extension

For team members that use supported browsers and want the most straightforward experience, we recommend using the Vercel Browser Extension to get access to the toolbar on your team's production sites.
For team members that use browsers for which a Vercel extension is not available, to allow toolbar access for everyone that accesses your site, or if you have more complex rules for when it shows in production, you'll need to add the @vercel/toolbar package to your project.

#### Adding the toolbar using the @vercel/toolbar package

For team members that do not use the browser extension or if you have more complex rules for when the toolbar shows in production, you can add the @vercel/toolbar package to your project:
1.

##### Install the @vercel/toolbar package and link your project

Install the package in your project using the following command: Terminal pnpm bun yarn npm

```
pnpm i @vercel/toolbar
```

```
yarn add @vercel/toolbar
```

```
npm i @vercel/toolbar
```

```
bun add @vercel/toolbar
```

Then link your local project to your Vercel project with the vercel link command using Vercel CLI. terminal

```
vercel link [path-to-directory]
```

2.

##### Add the toolbar to your project

Before using the Vercel Toolbar in a production deployment Vercel recommends conditionally injecting the toolbar. Otherwise, all visitors will be prompted to log in when visiting your site. The following example demonstrates code that will show the Vercel Toolbar to a team member on a production deployment. components/staff-toolbar.tsx Next.js (/app) Next.js (/app) Next.js (/pages) SvelteKit Nuxt Other frameworks TypeScript TypeScript JavaScript Bash

```
'use client';
 
import { VercelToolbar } from '@vercel/toolbar/next';
 
function useIsEmployee() {
  // Replace this stub with your auth library hook
  return false;
}
 
export function StaffToolbar() {
  const isEmployee = useIsEmployee();
  return isEmployee ? <VercelToolbar /> : null;
}
```

app/layout.tsx Next.js (/app) Next.js (/app) Next.js (/pages) SvelteKit Nuxt Other frameworks TypeScript TypeScript JavaScript Bash

```
import { Suspense, type ReactNode } from 'react';
import { StaffToolbar } from '../components/staff-toolbar';
 
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Suspense fallback={null}>
          <StaffToolbar />
        </Suspense>
      </body>
    </html>
  );
}
```

3.

##### Managing notifications and integrations for Comments on production

Unlike comments on preview deployments, alerts for new comments won't be sent to a specific user by default. Vercel recommends linking your project to Slack with the integration, or directly mentioning someone when starting a new comment thread in production to ensure new comments are seen.

#### Enabling the Vercel Toolbar

Alternatively to using the package, you can enable access to the Vercel Toolbar for your production environment at the team or project level. Once enabled, team members can access the toolbar using the Vercel Browser Extension or by enabling it in the toolbar menu.
1. Navigate to your Vercel dashboard and make sure that you have selected your team from the team switcher. To manage the toolbar at the project level, ensure that you have selected the project.
1. From your dashboard, open Settings in the sidebar.
1. In the General section, find Vercel Toolbar.
1. Under each environment ( Preview and Production), select either On or Off from the dropdown to determine the visibility of the Vercel Toolbar for that environment.
1. Once set at the team level, you can optionally choose to allow the setting to be overridden at the project level.
The dashboard setting to enable or disable the toolbar at the team level.

##### Disabling the toolbar

If you have noticed that the toolbar is showing up for team members on your production sites, you can disable it at either the team or project level:
1. Navigate to your Vercel dashboard and make sure that you have selected your team from the team switcher. To manage the toolbar at the project level, ensure that you have selected the project.
1. From your dashboard, open Settings in the sidebar.
1. In the General section, find Vercel Toolbar.
1. Under Production select Off from the dropdown.

#### Acessing the toolbar using the Vercel dashboard

You can send team members and users a production deployment with the Vercel Toolbar included from the dashboard. To do so:
1. From your dashboard, go to your project and open Projects in the sidebar. Alternatively, you can also use the deployment overview page.
1. Click the dropdown on the Visit button and select Visit with Toolbar. This will take you to your production deployment with the toolbar showing and active.
This will not show for users who have the browser extension installed, as the extension will already show the toolbar whenever you visit your production deployment unless it is disabled in team or project settings.

#### Accessing the toolbar using the Browser extension

Provided the Vercel toolbar is enabled for your project, any team member can use the Vercel Toolbar in your production environment by installing the Vercel Browser Extension. The extension allows you to access the toolbar on any website hosted on Vercel that your team(s) own:
1. Install the Vercel Browser Extension.
1. Ensure that you are logged in to your Vercel account on vercel.com. You must be signed in for the extension to know which domains you own.
1. Ensure that you have deployed to production. Older deployments do not support injection through the browser extension.
1. Ensure that any team members that need access to the toolbar in production follow these steps to install the domain.

#### Accessing the toolbar using the toolbar menu

Provided the Vercel toolbar is enabled for your project, you can enable the toolbar on production environments from the toolbar menu:
1. Open a preview deployment of your project.
1. Select the menu icon in the toolbar.
1. Scroll down to Enable Vercel Toolbar in Production and select it.
1. Choose the domain you want to enable the toolbar on.
Previous Add to Localhost
Next Managing Toolbar
Was this helpful?
supported.
Send
Next.js (/app)
Choose a framework to optimize documentation to:
\* Next.js (/app)
\* Next.js (/pages)
\* SvelteKit
\* Nuxt
\* Other frameworks
On this page
\* Adding the toolbar using the browser extension
\* Adding the toolbar using the @vercel/toolbar package
\* Install the @vercel/toolbar package and link your project
\* Add the toolbar to your project
\* Managing notifications and integrations for Comments on production
\* Enabling the Vercel Toolbar
\* Disabling the toolbar
\* Acessing the toolbar using the Vercel dashboard
\* Accessing the toolbar using the Browser extension
\* Accessing the toolbar using the toolbar menu
Copy as Markdown Install Vercel Plugin Give feedback Ask AI about this page

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

Loading status…
Select a display theme: [x] system system [-] light light [-] dark dark
