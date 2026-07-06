---
id_fonte: "c3cd204c-38e7-407b-8fab-6ccc4817851f"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Vercel Toolbar"
tipo: "unknown"
url_original: "https://vercel.com/docs/vercel-toolbar"
keywords: "('Vercel Toolbar', 'Development iteration tools', 'Collaboration and comments', 'Accessibility audit tool', 'Deployment sharing management')"
summary: "The **Vercel Toolbar** serves as a comprehensive **development and collaboration interface** designed to streamline the website iteration process directly within the browser. Its primary purpose is to facilitate **real-time feedback and technical auditing**, allowing teams to leave comments, manage feature flags, and preview content through specialized modes. Beyond simple communication, the tool integrates **performance and accessibility diagnostics** to identify layout shifts, measure interaction latency, and ensure compliance with web standards. By offering **customizable shortcuts and cross-environment visibility**, the toolbar transforms a live deployment into an interactive workspace for developers and stakeholders to refine their digital products."
extraido_em: "2026-06-30T16:22:30Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Vercel Toolbar

Vercel Toolbar
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

### Vercel Toolbar

Ask AI about this page
Last updated September 24, 2025
Vercel Toolbar is available on all plans
The Vercel Toolbar is a tool that assists in the iteration and development process. Through the toolbar, you can:
\* Leave feedback on deployments with Comments
\* Navigate through dashboard pages, and share deployments
\* Read and set Feature Flags
\* Use Draft Mode for previewing unpublished content
\* Edit content in real-time using Edit Mode
\* Inspect for Layout Shifts and Interaction Timing
\* Check for accessibility issues with the Accessibility Audit Tool

#### Activating the Toolbar

By default, when the toolbar first shows up on your deployments it is sleeping. This means it will not run any tools in the background or show comments on pages. You can activate it by clicking it or using ctrl . It will start activated if a tool is needed to show you the link you're visiting, like a link to a comment thread or a link with flags overrides.
Users who have installed the browser extension can toggle on Always Activate in Preferences from the Toolbar menu.

#### Enabling or Disabling the toolbar

The Vercel Toolbar is enabled by default for all preview deployments. You can disable the toolbar at the team, project, or session level.
You can also manage its visibility for automation with HTTP headers and through environment variables. To learn more, see Managing the toolbar.
To enable the toolbar for your local or production environments, see Adding the toolbar to your environment.

#### Using the Toolbar Menu

You can access the Toolbar Menu by pressing ctrl on your keyboard.
Alternatively, you can also access the Toolbar Menu through the Vercel Toolbar by clicking the menu icon. If you haven't activated the toolbar yet, log in first to display the menu.
| Feature | Description |
| ------ | ------ |
| Search | Quickly search the toolbar and access dashboard pages. |
| Quick branch access | View the current branch and commit hash. |
| Switch branches | Quickly switch between branches (on preview and production branches - not locally). |
| Layout shifts | Open the Layout Shift Tool to identify elements causing layout shifts. |
| Interaction timing | Inspect in detail each interaction's latency and view your current session's INP. |
| Accessibility audit tool | Automatically check the Web Content Accessibility Guidelines 2.0 level A and AA rules. |
| Open Graph | View open graph properties for the page you are on and see what the link preview will look like. |
| Comments | Access the Comments panel to leave or view feedback. |
| View inbox | View all open comments. |
| Navigate to your team | Navigate to your team's dashboard. |
| Navigate to your project | Navigate to your project's dashboard. |
| Navigate to your deployment | Navigate to your deployment's dashboard. |
| Hide Toolbar | Hide the toolbar. |
| Disable for session | Disable the toolbar for the current session. |
| Set preferences | Set personal preferences for the toolbar. |
| Logout | Logout of the toolbar. |

#### Setting Custom Keyboard Shortcuts

You can set your own keyboard shortcuts to quickly access specific tools. Additionally, you can change the default keyboard shortcuts for the Toolbar Menu ctrl and for showing/hiding the toolbar Ctrl . by following these steps:
1. Select Preferences in the Toolbar Menu
1. Select Configure next to Keyboard Shortcuts
1. Select Record shortcut… (or click the X if you have an existing keyboard shortcut set) next to the tool you'd like to set it for
1. Press the keys you'd like to use as the shortcut for that tool
1. To change the keyboard shortcuts for opening the Toolbar Menu and for showing and hiding the toolbar, you must have the Browser Extension installed.

#### Sharing deployments

You can use the Share button in deployments with the Vercel Toolbar enabled, as well as in all preview deployments, to share your deployment's generated URL. When you use the Share button from the toolbar, the URL will contain any relevant query parameters.
To share a deployment:
1. Go to the deployment you want to share and ensure you're logged into the Vercel Toolbar.
1. Find the Share button in the Toolbar Menu and select it.
1. From the Share dialog, ensure you're allowing the right permissions and click Copy Link to copy the deployment URL to your clipboard. To learn more, see Sharing Deployments.
If you're on an Enterprise team, you will be able to see who shared deployment URLs in your audit logs.

#### Reposition toolbar

You can reposition the toolbar by dragging it to either side of your screen. It will snap into place and appear there across deployments until you move it again. Repositioning only affects where you see the toolbar, it does not change the toolbar position for your collaborators.

#### Toolbar Menu preferences

When logged into the Vercel Toolbar, you'll find a Preferences button in the Toolbar Menu. In this menu, you can update the following settings:
| Setting | Description |
| ------ | ------ |
| Notifications | Set when you will receive notifications for comments in the deployment you're viewing |
| Theme | Select your color theme |
| Layout Shift Detection | Enable or disable the Layout Shift Tool |
| Keyboard Shortcuts | Set custom keyboard shortcuts for tools and change the default keyboard shortcuts |
| Accessibility Audit | Enable or disable the Accessibility Audit Tool |
| Measure Interaction Timing | Enable or disable the Interaction Timing Tool |
| Browser Extension | Add Vercel's extension to your browser to take screenshots, enable the toolbar in production, and access Always Activate and Start Hidden preferences. |
| Always Activate | Sets the toolbar to activate anytime you are authenticated as your Vercel user instead of waiting to be clicked. |
| Start Hidden | Sets the toolbar to start hidden. Read more about hiding and showing the toolbar. |

#### More resources

```
*  Preview deployments
*  Comments
*  Draft Mode
*  Edit Mode
```

Previous Edit Mode
Next Add to Environments
Was this helpful?
supported.
Send
On this page
\* Activating the Toolbar
\* Enabling or Disabling the toolbar
\* Using the Toolbar Menu
\* Setting Custom Keyboard Shortcuts
\* Sharing deployments
\* Reposition toolbar
\* Toolbar Menu preferences
\* More resources
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
