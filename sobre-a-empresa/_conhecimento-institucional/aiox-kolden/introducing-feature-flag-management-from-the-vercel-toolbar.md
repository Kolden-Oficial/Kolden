---
id_fonte: "5fe514db-3732-422f-abc1-9739df88d88b"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Introducing feature flag management from the Vercel Toolbar"
tipo: "unknown"
url_original: "https://vercel.com/blog/toolbar-feature-flags"
keywords: "('Feature flag management', 'Vercel Toolbar', 'Workflow optimization', 'Feature flag overrides', 'QA and testing')"
summary: "Vercel has introduced a new capability that allows developers to **manage and override feature flags directly within the Vercel Toolbar**, eliminating the need to toggle between different browser tabs and external provider dashboards. This integration supports major industry providers and custom setups, streamlining the development cycle by enabling **real-time adjustments and testing** within the local or production environment. By utilizing API routes and script tags to communicate flag metadata, teams can create **session-specific overrides** that simplify quality assurance and collaborative feedback. Ultimately, this workflow enhancement aims to **accelerate iteration speed** and ensure that only high-quality, performant features are delivered to the end user."
extraido_em: "2026-06-30T16:20:20Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Introducing feature flag management from the Vercel Toolbar

Introducing feature flag management from the Vercel Toolbar - Vercel
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
Blog / Company News

### Introducing feature flag management from the Vercel Toolbar

Dominik Ferber Software Engineer
2 min read
Copy URL
Copied to clipboard!
Mar 6, 2024
View and override feature flags from Optimizely, LaunchDarkly, Statsig, Split, Hypertune, and more.
Using feature flags to quickly enable and disable product features is more than just a development technique; it's a philosophy that drives innovation and ensures that only the best, most performant features reach your users.
However, when working on a new feature you need to leave your current browser tab, sign into your flag provider, switch the flag to the value you need for development—all while coordinating and communicating this change with teammates. This adds a lot of overhead and disrupts your work.
Today, we're making that workflow easier by adding the ability for team members to override your application's feature flags right from the Vercel Toolbar.
You can manage flags set in any provider including LaunchDarkly, Optimizely, Statsig, Hypertune, or Split—and additionally you can integrate any other provider or even your own custom flag setup. By creating overrides for your flags from the toolbar, you can stay in the flow and improve your iteration speed.

#### Link to heading Uplevel your flags workflow

Since the ability to manage your flags from the toolbar relies on API Routes and script tags only, it's possible to integrate with any framework.
Vercel will be able to read the actual value each flag has by rendering a script tag containing your flag values, and flag metadata and descriptions can be communicated through an API route. From there you can create overrides per session for improved QA and testing.
**Getting started**
You can add the Vercel Toolbar to any deployment you're working on, meaning you can work with your flags in local, preview, or production environments to improve your QA and testing workflow.
Working with the Vercel Toolbar To enable the toolbar on production or local environments, add it to your project using the @vercel/toolbar package, or with an injection script. Learn more
Next, you'll need to tell the toolbar about the values of your feature flags.
For the toolbar to see your feature flags, render a script tag containing your flag values. In React for example, you can use the FlagValues component from @vercel/flags .

```
1
import { FlagValues } from "@vercel/flags/react" 
2

3
<FlagValues values={{ fasterCheckoutPage: true, landingPageRedesign: true }} />
```

Then, you'll work with FlagDefinitions to tell the toolbar about your application's feature flags, complete with rich metadata.

```
1
// .well-known/vercel/flags/route.ts
2
import { getLaunchDarklyData } from '@vercel/flags/providers/launchdarkly';
3
import { NextResponse } from 'next/server';
4

5
export async function GET() {
6
  const launchDarklyData = await getLaunchDarklyData({ 
7
    apiKey: process.env.LAUNCHDARKLY_API_KEY, 
8
    projectKey: process.env.LAUNCHDARKLY_PROJECT_KEY, 
9
    environment: process.env.LAUNCHDARKLY_ENVIRONMENT, 
10
  });
11
  return NextResponse.json(launchDarklyData);
12
}
13
```

After that, you can respect overrides set in the toolbar by reading the vercel-flag-overrides cookie.

```
1
import { cookies } from 'next/headers';
2

3
export default function Page() {
4
  const overrides = cookies().get('vercel-flag-overrides')?.value;
5
  return overrides.showNewDashboard ? <NewDashboard /> : <LegacyDashboard />;
6
}
7
```

From the Vercel Toolbar you can view and create overrides, per session, for shorter feedback loops and improved QA and testing. Additionally, the overrides will be stored in an optionally encrypted cookie so your application can respect them.
Set the override for each flag to true and press Save.

##### Link to heading Ship better features faster on Vercel

Publishing features behind feature flags and allowing QA teams to test them in a production-like environment enhances trust in the release process and allows teams to ship the best features to users.
With Vercel, you eliminate the need for complex coordination between multiple QA teams and automated testing processes, saving valuable time and resources.
Start interacting with your application's feature flags. Unlock the new workflow today: Use the Vercel Toolbar to read and set feature flag overrides for your application. Get started
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
