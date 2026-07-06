---
id_fonte: "731e8f49-bd29-40d8-8159-ffb3d66cc0f8"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "WebContainers - Dev environments. In your web app. | WebContainers"
tipo: "unknown"
url_original: "https://webcontainers.io/"
keywords: "('WebContainer API', 'Browser-based runtime', 'Node.js in browser', 'Interactive dev environments', 'Full-stack web applications')"
summary: "StackBlitz has developed WebContainers, a **browser-based runtime** that allows users to run full-stack Node.js environments directly within a web application. By executing code on the user's **local CPU** instead of a remote server, this technology enables the creation of **instant, interactive coding experiences** such as tutorials, IDEs, and AI-native development tools. The platform emphasizes a **fundamental shift in web capabilities**, supporting major frameworks and package managers with high speed and enhanced security. Ultimately, this tool aims to **eliminate server overhead** and simplify the deployment of complex, disposable dev environments for engineers and educators alike."
extraido_em: "2026-06-30T16:22:38Z"
extraido_por: "notebooklm-py-0.7.3"
---

# WebContainers - Dev environments. In your web app. | WebContainers

WebContainers - Dev environments. In your web app. | WebContainers
Skip to content
Search K
Main Navigation Guides Tutorial API Reference AI Pricing
Appearance
Go to Console

### **Dev environments.** In your **web app.**

From interactive tutorials to full-blown IDEs, build instant, interactive coding experiences backed by WebContainers: the trusted, browser-based runtime from StackBlitz.
Get started Book a demo
index.js ⬤
9
1
2
3
4
5
6
7
import chalk from 'chalk';
console. log( chalk. magenta('Hello from the WebContainer API 👋'));
console. log( chalk. green(Running Node ${ process. version}));
// Run node index.js from the terminal
W
I n c o m p a t i b l e W e b B r o w s e r
W e b C o n t a i n e r s c u r r e n t l y w o r k i n C h r o m i u m- b a s e d
b r o w s e r s, F i r e f o x, a n d S a f a r i 1 6. 4. W e' r e h o p i n g
t o a d d s u p p o r t f o r m o r e b r o w s e r s a s t h e y
i m p l e m e n t t h e n e c e s s a r y W e b P l a t f o r m f e a t u r e s.
R e a d m o r e a b o u t b r o w s e r s u p p o r t:
h t t p s:// w e b c o n t a i n e r s. i o/ g u i d e s/ b r o w s e r- s u p p o r t
Run index.js ❯ node index.js List files ❯ ls -l

##### Battle-tested by cutting-edge teams

On the SvelteKit team, we've fantasized for years about being able to build fully interactive learning material for full stack frameworks.
**With WebContainers it went from 'impossible' to 'easy' almost overnight.**
Rich Harris
Principal Software Engineer, Vercel
**As a team working on educational products, StackBlitz WebContainers has been an invaluable tool for us.** The ability to embed full-stack applications with customisable, interactive coding environment directly into our products has greatly enhanced the learning experience for our users.
Vojta Holik
Designer & Developer, Egghead.io
WebContainers solve the final frontier in JavaScript developer experience - making full-stack Node.js projects run in the browser as lightweight and disposable and secure as frontend REPLs.
**Every PR, every npm library maintainer, every devtool company with a Node.js SDK, can benefit from this!**
swyx
I have worked with Web container API for a couple of weeks at Scrimba to make a pooc of backend support. And I can say it's a solid piece of technology. Things just work, and it's also quite fast. **I'm super excited about the GA since it will unlock so much opportunities for OSS projects and the industry at large.**
Abdellah Alaoui
Fullstack hacker, Scrimba
**The WebContainer API is a landmark on the way we think docs.** Creating interactive docs and snippets just became so much more feasible! With Server-side code running on the browser, setting up a playground to securely learn Node.js SDKs and compilers became feasible and even fun!
Atila Fassina
DX Engineer at Xata
**WebContainers represent a fundamental shift in what is possible in the browser. I'm incredibly excited about the potential this tech unlocks,** from secure, browser-based development environments to highly interactive educational content.
Nate Moore
Senior Software Engineer, The Astro Technology Company
For such a powerful piece of tech I was so impressed by how clear to use the API is. Also running WebContainers inside WebContainers had me 🤯
Ramón Huidobro
Developer Advocate at Suborbital Software Systems
At re:tune, we have been building the missing frontend for GPT-3, on a mission to empower everyone to build AI-first software at the speed of thought. **WebContainers set the stage for our AI-native IDE** - with a copilot that can not only read and write code, but can also understand and operate in the full runtime context across server and client!
DJ
Founder & CEO @ re:tune
Running chess in a terminal, running a terminal in the browser, check mate!
**The best position to be in is a creative one and the StackBlitz WebContainers allow that.**
Manus Nijhoff
Co-founder at Touchy Studios & full-stack developer at 100k

#### Power your web app with the **WebContainer API**

Create unmatched user experiences by integrating Node.js directly into your web app.
Build fully-branded products without connecting to external servers or directing users away to third-party apps.

###### Run native package managers

Run the native versions of npm , pnpm , and yarn , all in the browser, all in your app, up to 10x faster than local.

###### Full browser support

Run WebContainer in all major browsers, from Chromium-based, to Firefox or Safari TP.

###### All major frameworks

Instantly spin up disposable environments running any major modern framework.

###### Run Wasm out of the box

Port your favorite language or framework to Wasm to run it in WebContainers. Yes, really.

##### Set up in only a few steps

```
*  Boot a WebContainer.
*  Populate the container's file system.
*  Programmatically install packages.
*  Run your development server in-browser.
```

Read more about setting up WebContainer in your web app.
hello-world.ts
project-files.ts

```
import { WebContainer, FileSystemTree } from '@webcontainer/api';
import { projectFiles } from './project-files.ts';

async function main() {
  // First we boot a WebContainer
  const webcontainer = await WebContainer.boot();
  
  // After booting the container we copy all of our project files
  // into the container's file system
  await webcontainer.mount(projectFiles);
    
  // Once the files have been mounted, we install the project's
  // dependencies by spawning `npm install`
  const install = await webcontainer.spawn('npm', ['i']);
  
  await install.exit;
    
  // Once all dependencies have been installed, we can spawn `npm`
  // to run the `dev` script from the project's `package.json`
  await webcontainer.spawn('npm', ['run', 'dev']);
}
```

##### Build rich development experiences not possible before

Interactive tutorials
Learn SvelteKit, a full stack framework, within their custom editor, running on WebContainers, all in the browser.
learn.svelte.dev
Low code / no code
A stress-free editor enabling non-technical contributors to make their own PRs with a live, disposable preview to confirm an error-free build.
Web Publisher by StackBlitz
AI applications
re:tune is setting the stage for AI-native IDEs - with a copilot that can understand and operate in the full runtime context across server and client.
retune.so

#### Support for every team

Small startups, open source maintainers, and Fortune 500 enterprises all enjoy access to StackBlitz's committed product support, features and improvements.

#### Slash server costs

WebContainer API only requires the compute power of your local CPU and browser, eliminating the cost and overhead of managing remote servers.

#### Ship faster

No additional teams to build or maintain. Leave the technical support to us and focus on actually shipping your product.

#### Leverage the tech **we use in our own products.**

Years of development by our full-time engineering team, front-line feedback from leading community partners, and funded R&D into future technological possibilities make WebContainer more robust by the day.
Get started!

###### Workspaces

```
*  Popular
*  Frontend
*  Backend
*  Fullstack
*  Vite
*  Docs, Blogs & Slides
*  Vanilla
```

###### Start a new Project

```
*  From a Workspace
*  From a GitHub Repo
*  From your computer
```

###### Product

```
*  Docs
*  Enterprise
*  Pricing
*  Case Studies
```

###### Company

```
*  Blog
*  Careers
*  Community
*  Enterprise Sales
*  Privacy
*  Terms of Service
```

###### Connect

```
*  GitHub
*  Twitter
*  Discord
```

© 2026 StackBlitz, Inc.
