---
id_fonte: "c5b775c3-d046-4124-91a4-6b8e4a0f4182"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Managing the visibility of the Vercel Toolbar"
tipo: "unknown"
url_original: "https://vercel.com/docs/vercel-toolbar/managing-toolbar"
keywords: "('Vercel Toolbar Visibility', 'Dashboard Project Settings', 'Environment Variable Configuration', 'Automation Header Usage', 'Content Security Policy')"
summary: "The provided documentation serves as a comprehensive technical guide for **managing the visibility and functionality** of the Vercel Toolbar across different development environments. It outlines a hierarchical control system, allowing administrators to toggle the tool at the **team-wide, project-specific, or individual branch level** through the Vercel dashboard or environment variables. The text further details practical ways to **interact with or hide the interface**, including session-specific disabling, keyboard shortcuts, and a specialized header for **bypassing the toolbar during automated testing**. Finally, the guide addresses advanced integration requirements, such as configuring **Content Security Policies** and enabling support for custom alias domains to ensure the toolbar operates correctly within secure or specialized network architectures."
extraido_em: "2026-06-30T16:20:55Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Managing the visibility of the Vercel Toolbar

Managing the visibility of the Vercel Toolbar
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
Managing Toolbar
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
Managing Toolbar

### Managing the visibility of the Vercel Toolbar

Ask AI about this page
Last updated July 18, 2025
Vercel Toolbar is available on all plans

#### Viewing the toolbar

When the toolbar is enabled, you'll be able to view it on any preview or enabled environment. By default, the toolbar will appear as a circle with a menu icon. Clicking activates it, at which point you will see any comments on the page and notifications for issues detected by tools running in the background. When the toolbar has not been activated it will show a small Vercel icon over the menu icon.
Once a tool is used, the toolbar will show a second icon next to the menu, so you can access your most recently used tool.

#### Enable or disable the toolbar team-wide

To disable the toolbar by default for all projects in your team:
1. Navigate to your Vercel dashboard and make sure that you have selected your team from the team switcher.
1. From your dashboard, open Settings in the sidebar.
1. In the General section, find Vercel Toolbar.
1. Under each environment ( Preview and Production), select either On or Off from the dropdown to determine the visibility of the Vercel Toolbar for that environment.
1. You can optionally choose to allow the setting to be overridden at the project level.
The dashboard setting to enable or disable the toolbar at the team level.

#### Enable or disable the toolbar project-wide

To disable the toolbar project-wide:
1. From your dashboard, select the project you want to enable or disable Vercel Toolbar for.
1. Navigate to General in Settings.
1. Find Vercel Toolbar.
1. Under each environment ( Preview and Production), select either an option from the dropdown to determine the visibility of Vercel Toolbar for that environment. The options are:
\* Default: Respect team-level visibility settings.
\* On: Enable the toolbar for the environment.
\* Off: Disable the toolbar for the environment.
The dashboard setting to enable or disable the toolbar in a project.

#### Disable toolbar for session

To disable the toolbar in the current browser tab:
1. Activate the Vercel Toolbar by clicking on it
1. In the toolbar menu, scroll down the list and select Disable for Session.
To show the toolbar again, open a new browser session.
Alternatively, you can also hide the toolbar in any of the following ways:
\* Select the toolbar icon and drag it to the X that appears at the bottom of the screen.
\* Click the browser extension icon if you have it pinned to your browser bar.
\* Use Ctrl..
To show the toolbar when it is hidden you can use that same key command or click the browser extension.
Users with the browser extension can set the toolbar to start hidden by toggling on Start Hidden in Preferences from the Toolbar menu.

#### Disable toolbar for automation

You can use the x-vercel-skip-toolbar header to prevent interference with automated end-to-end tests:
1. Add the x-vercel-skip-toolbar header to the request sent to the preview deployment URL
1. Optionally, you can assign the value 1 to the header. However, presence of the header itself triggers Vercel to disable the toolbar

#### Enable or disable the toolbar for a specific branch

You can use Vercel's preview environment variables to manage the toolbar for specific branches or environments
To enable the toolbar for an individual branch, add the following to the environment variables for the desired preview branch:
.env

```
VERCEL_PREVIEW_FEEDBACK_ENABLED=1
```

To disable the toolbar for an individual branch, set the above environment variable's value to 0 :
.env

```
VERCEL_PREVIEW_FEEDBACK_ENABLED=0
```

#### Using the toolbar with a custom alias domain

To use the toolbar with preview deployments that have custom alias domains, you must opt into the toolbar explicitly in your project settings on the dashboard.

#### Using a Content Security Policy

If you have a Content Security Policy (CSP) configured, you may need to adjust the CSP to enable access to the Vercel Toolbar or Comments.
You can make the following adjustments to the Content-Security-Policy response header:
\* Add the following to script-src (Most commonly used):

```
  script-src https://vercel.live
```

```
*  Add the following to connect-src :
```

```
  connect-src https://vercel.live wss://ws-us3.pusher.com
```

```
*  Add the following to img-src :
```

```
  img-src https://vercel.live https://vercel.com data: blob:
```

```
*  Add the following to frame-src :
```

```
  frame-src https://vercel.live
```

```
*  Add the following to style-src :
```

```
  style-src https://vercel.live 'unsafe-inline'
```

```
*  Add the following to font-src :
```

```
  font-src https://vercel.live https://assets.vercel.com
```

Previous Add to Environments
Next Browser Extensions
Was this helpful?
supported.
Send
On this page
\* Viewing the toolbar
\* Enable or disable the toolbar team-wide
\* Enable or disable the toolbar project-wide
\* Disable toolbar for session
\* Disable toolbar for automation
\* Enable or disable the toolbar for a specific branch
\* Using the toolbar with a custom alias domain
\* Using a Content Security Policy
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
