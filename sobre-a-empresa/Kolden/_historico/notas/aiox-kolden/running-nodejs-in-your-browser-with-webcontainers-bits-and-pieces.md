---
id_fonte: "756b1ff4-afa4-4a18-bb6f-72fc64941409"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Running Node.js in Your Browser with WebContainers - Bits and Pieces"
tipo: "unknown"
url_original: "https://blog.bitsrc.io/running-node-js-in-your-browser-with-webcontainers-48ada077518e"
keywords: "('WebContainers', 'Node.js', 'StackBlitz IDE', 'WebAssembly', 'Browser security sandbox')"
summary: "This article explores **WebContainers**, a groundbreaking technology from StackBlitz that enables a **fully functional Node.js environment** to run directly within a web browser. By leveraging **WebAssembly**, this system creates a fast and secure development space that operates **entirely client-side**, bypassing the need for remote servers or local software installations. The text details how this architecture improves **security through sandboxing**, allows for **offline functionality**, and facilitates instant project setup via GitHub or pre-configured templates. Ultimately, the author presents WebContainers as a **revolutionary shift in web development** that combines the power of local coding with the accessibility of the cloud."
extraido_em: "2026-06-30T16:21:57Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Running Node.js in Your Browser with WebContainers - Bits and Pieces

Run Node.js in a Browser with WebContainers | Bits and Pieces
Sitemap
Open in app
Sign up
Sign in
Medium Logo
Get app
Write
Search
Sign up
Sign in
[

#### Bits and Pieces

](<https://blog.bitsrc.io/?source=post_page---publication_nav-5c2fdf847f4a-48ada077518e--------------------------------------->)
·
Follow publication
Insightful articles, step-by-step tutorials, and the latest news on full-stack composable software development
Follow publication

### Run Node.js in Your Browser with WebContainers

#### How to Run Node.js in Your Browser

Danusha Navod
Follow
7 min read
·
Feb 8, 2023
108
1
Listen
Share
Press enter or click to view image in full size
WebContainers is a revolutionary product introduced by StackBlitz last year. It allows developers to create, edit, and run a secure Node.js environment in their browser tab in milliseconds. As a result, developers can now build Node.js, Angular, React, and Vue.js projects in their browsers entirely locally.
So, in this article, I will discuss the features of WebContainers, how they differ from other IDEs and how to get started with WebContainers.
Build in AI speed — Compose enterprise-grade applications, features, and components

#### **What is a WebContainer**

A WebContainer is a WebAssembly-based operating system that allows developers to spin up Node.js environments instantly. Thus, the main purpose of WebContainers is to accelerate the global shift to WebAssembly-based computing.
A WebContainer consists of several key components:
\* Virtual File System integrated with lazy-loading
\* Virtual networking
\* Multi-thread/ multi-process application support
\* Inter-Process communication/process signaling
\* POSIX-esque shell with the ability to shell out between processes
StackBlitz's WebContainer-based IDE lets you build full-stack Node.js environments that boot in milliseconds, go online instantly, and can share the application through links with just one click. Furthermore, VS Code's robust editing interface, a complete terminal, npm, and other development tools are preloaded into the environment. Also, it is entirely browser-based and does not depend on external remote services.

#### **Features of WebContainers**

##### **Security**

With StackBlitz's novel compute model, code executions occur in the browser security sandbox. This provides far greater protection while producing a development environment that is quicker and less constrained than localhost.
Many development environments are operated under excessive privileges, allowing third-party dependencies to have total control over the operating system. However, WebContainers provide an extra degree of security and process separation by confining runtime environments within a browser context.

##### **Works offline**

With the help of WebContainers, you can quickly build live Node.js servers on-demand that function even while you're offline. This is possible due to a virtualized TCP network stack mapped to your browser's ServiceWorker API.

##### **Better than localhost**

The server responds faster than localhost and shields your web servers from localhost scraping attempts since it runs behind the browser's security sandbox.

##### **A clean environment on every page load**

The built-in npm client for WebContainer is so quick that it does a fresh install on every page load, guaranteeing you always have a clean environment. Furthermore, you can restore your environment to its original condition by refreshing the page if something goes wrong.

##### **Access to the local file system**

PWAs can request persistent read and write access to certain local file system areas using the File System Access API. Combined with StackBlitz WebContainers, there can be a future where you do not need to install node, npm, git, Visual Studio Code, or any other software on your computer. Instead, all you need is a web browser.

##### **Seamless Node.js debugging with Chrome DevTools**

Debugging JavaScript is relatively easy using browsers. The connection with Chrome DevTools operates right out of the box by running Node.js within the browser. No downloads or plugins are required, only native back-end debugging within the browser.

#### **How does WebContainer-based StackBlitz IDE differ from other online IDEs?**

With traditional IDEs, your complete development environment runs on a distant server, which feeds the results to your browser via the internet. The issue with this approach is that it offers a few security advantages and mostly delivers a worse user experience than using your local computer.
WebContainers are entirely browser-based and do not depend on external remote services. Hence, the browser's security sandbox provides far greater protection than traditional IDEs.
Also, typical online IDEs take a long time to spin up containers. As a result, they are not offline-capable and frequently cause network timeouts. Also, it is very difficult to troubleshoot frozen or broken containers. Clicking the refresh button only reconnects you to the broken container once again.

#### **Setup Your First WebContainer-based StackBlitz Project**

WebContainers and EngineBlock are the two types of environments used by StackBlitz to execute applications. One or the other is connected to each project in StackBlitz.
WebContainers can execute module bundlers like Webpack or Vite since they are focused on providing a native Node.js environment. Therefore, any front-end framework can be used with one of these tools, like working in a local environment. In addition, WebContainers, also support several back-end frameworks.

#### Get Danusha Navod's stories in your inbox

Join Medium for free to get updates from this writer.
Subscribe
Subscribe [x]
Remember me for faster sign in
You can quickly start a new WebContainer-based StackBlitz project by picking their starter project or importing a project from GitHub or your local computer.

##### **1. Picking a Starter Project**

Starter projects are virtual playgrounds often created by the project's core staff and run on StackBlitz. You can find a list of starter projects on the StackBlitz homepage. They have introduced around 60 starter projects with different technologies, such as Angular, React, Next.js, Vue 3, Express, and more.
Press enter or click to view image in full size
You can also start an open-source starter project by simply visiting the dedicated URL with the “.new” domain for that selected project. Check the URL list.

##### **2. Importing a project from the local computer**

Open the StackBlitz project you want, then drag & drop any files or folders you wish to import. It's as simple as that.
Press enter or click to view image in full size

##### **3. Importing a public project from GitHub**

By adding the username and repository name to the URL, as shown below, you can use StackBlitz to execute any public GitHub repository.

```
stackblitz.com/github/{GH_USERNAME}/{REPO_NAME}
```

Press enter or click to view image in full size
Press enter or click to view image in full size
You can specify the branch, tag, or commit when importing the GitHub repository.

```
.../github/{GH_USERNAME}/{REPO_NAME}/tree/{TAG|BRANCH|COMMIT}
```

The related StackBlitz project automatically updates with the most recent changes whenever you post commits to GitHub, ensuring that the code in your GitHub repository continues to be the official source.
In addition, you can set up a launch command for your project while you import the project to StackBlitz. It will allow your project to execute the code once the editor launches automatically.

```
stackblitz.com/fork/github/{gh_username}/{repo_name}?terminal={npm_script_name}
```

#### **WebContainers limitations**

##### **HTTP Networking**

The ability of WebContainers to connect to databases like MongoDB, Redis, and PostgreSQL is currently restricted by the browser's capacity to perform network requests. However, this might soon change since Native Sockets will quickly be shipped by Chromium.
It can support additional HTTP-based protocols like WebSockets but is currently only able to handle HTTP connections. Also, it is necessary to allow CORS or a CORS proxy when making HTTP queries to external services.

##### **NPM postinstall Scripts and Native Binaries**

While many postinstall scripts are safe to use; the majority are used to configure or compile native binaries and are frequently executed in privileged root contexts, providing arbitrary code access to the whole system. The WebContainers will not support this behavior because they are secure by default.

##### **Browser Support**

WebContainers is in its Alpha stage and only supports Firefox and Chromium-based browsers. In most cases, supported browsers work well with WebContainers. But specific browsers have built-in content limitations, such as preventing third-party cookies and Service Workers, which can stop StackBlitz WebContainers from functioning as expected.

#### **Conclusion**

Compared with other online IDEs, StackBlitz's WebContainers-based IDE has far more advanced capabilities. However, with speed, security, usability, and other features like clean environment loading, and offline functioning, WebContainers win the battle.
The fact that WebContainers is free to use for open-source projects but requires a membership if you want to use it for private repositories is a drawback. Nevertheless, WebContainers is still a SaaS product, even though it runs great locally. That's the only significant disadvantage we can notice in WebContainers.
Overall, if you are a full-stack developer, StackBlitz's WebContainer is an excellent fit for your project tests and developments.

#### Build apps with reusable components like Lego

Bit **'s open-source tool** help 250,000+ devs to build apps with components.
Turn any UI, feature, or page into a **reusable component** — and share it across your applications. It's easier to collaborate and build faster.
**→** Learn more
Split apps into components to make app development easier, and enjoy the best experience for the workflows you want:

##### → Micro-Frontends

##### → Design System

##### → Code-Sharing and reuse

##### → Monorepo

[

#### How We Build Micro Frontends

##### Building micro-frontends to speed up and scale our web development process.

blog.bitsrc.io](<https://blog.bitsrc.io/how-we-build-micro-front-ends-d3eeeac0acfc?source=post_page-----48ada077518e--------------------------------------->)
[

#### How we Build a Component Design System

##### Building a design system with components to standardize and scale our UI development process.

blog.bitsrc.io](<https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833?source=post_page-----48ada077518e--------------------------------------->)
[

#### Bit - Component driven development

##### Bit is the leading toolchain for component-driven development. Forget monolithic apps and distribute to…

bit.cloud](<https://bit.cloud/blog/how-to-reuse-react-components-across-your-projects-l3bhezsg?source=post_page-----48ada077518e--------------------------------------->)
[

#### 5 Ways to Build a React Monorepo

##### Build a production-grade React monorepo: From fast builds to code-sharing and dependencies.

blog.bitsrc.io](<https://blog.bitsrc.io/5-ways-to-build-a-react-monorepo-a294b6c5b0ac?source=post_page-----48ada077518e--------------------------------------->)
[

#### How to Create a Composable React App with Bit

##### In this guide, you'll learn how to build and deploy a full-blown composable React application with Bit. Building a…

bit.cloud](<https://bit.cloud/blog/how-to-create-a-composable-react-app-with-bit-l7ejpfhc?source=post_page-----48ada077518e--------------------------------------->)
108
1
Webcontainers
Stackblitz
Nodejs
Web Development
JavaScript
108
108
1
Follow
[

#### Published in Bits and Pieces

](<https://blog.bitsrc.io/?source=post_page---post_publication_info--48ada077518e--------------------------------------->)
42K followers
·
Last published Feb 23, 2026
Insightful articles, step-by-step tutorials, and the latest news on full-stack composable software development
Follow
Follow
[

#### Written by Danusha Navod

](<https://medium.com/@danushanavod?source=post_page---post_author_info--48ada077518e--------------------------------------->)
625 followers
·
141 following
Full Stack Developer
Follow

#### Responses ( 1)

Write a response
What are your thoughts?
Cancel
Respond
Bror
Jun 1, 2024

```
But I don't want to use stackblitz! How do I do this without stackblitz?
```

Reply

#### More from Danusha Navod and Bits and Pieces

In
Bits and Pieces
by
Danusha Navod
[

#### The Concept of Workspaces: Bit, NPM and NX

##### Understanding the concept of workspaces and how it's used in Bit, NPM, and NX.

](<https://blog.bitsrc.io/the-concept-of-workspaces-bit-vs-npm-vs-nx-356f59ceeef9?source=post_page---author_recirc--48ada077518e----0---------------------21c1377b_b743_43fa_b105_fe6b72fabf62-------------->)
Jan 5, 2024
A clap icon 401
In
Bits and Pieces
by
Viduni Wickramarachchi
[

#### The BFF Pattern (Backend for Frontend): An Introduction

##### Get to know the benefits of using BFF pattern in practice

](<https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf?source=post_page---author_recirc--48ada077518e----1---------------------21c1377b_b743_43fa_b105_fe6b72fabf62-------------->)
Feb 23, 2021
A clap icon 3.1K A response icon 21
In
Bits and Pieces
by
Paige Niedringhaus
[

#### How to Utilize Submodules within Git Repos

##### One Solution When the Primary Code Can be Open Source, but Specific Content Needs to be Private

](<https://blog.bitsrc.io/how-to-utilize-submodules-within-git-repos-5dfdd1c62d09?source=post_page---author_recirc--48ada077518e----2---------------------21c1377b_b743_43fa_b105_fe6b72fabf62-------------->)
Mar 18, 2021
A clap icon 398 A response icon 1
In
Bits and Pieces
by
Danusha Navod
[

#### Using Proxy Design Pattern with React in Practice

##### Explore the usage of the Proxy Design Pattern in a React environment

](<https://blog.bitsrc.io/proxy-design-pattern-with-react-c0b465980fbf?source=post_page---author_recirc--48ada077518e----3---------------------21c1377b_b743_43fa_b105_fe6b72fabf62-------------->)
Nov 27, 2023
A clap icon 628 A response icon 4
See all from Danusha Navod
See all from Bits and Pieces

#### Recommended from Medium

Michal Malewicz
[

#### Vibe Coding is OVER.

##### Here's What Comes Next.

](<https://michalmalewicz.medium.com/vibe-coding-is-over-5a84da799e0d?source=post_page---read_next_recirc--48ada077518e----0---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Mar 24
A clap icon 3.2K A response icon 104
Monika Singhal
[

#### Golang vs Elixir: Why I Chose the Road Less Traveled (And Won) ⚗

##### The Comfortable Path vs. The Strange Road 🛣

](<https://medium.com/@monikasinghal713/golang-vs-elixir-why-i-chose-the-road-less-traveled-and-won-%EF%B8%8F-8db542259a8f?source=post_page---read_next_recirc--48ada077518e----1---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Oct 4, 2025
A clap icon 95
In
Women in Technology
by
Alina Kovtun✨
[

#### Stop Memorizing Design Patterns: Use This Decision Tree Instead

##### Choose design patterns based on pain points: apply the right pattern with minimal over-engineering in any OO language.

](<https://medium.com/womenintechnology/stop-memorizing-design-patterns-use-this-decision-tree-instead-e84f22fca9fa?source=post_page---read_next_recirc--48ada077518e----0---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Jan 29
A clap icon 7.2K A response icon 71
In
CodeX
by
MayhemCode
[

#### You Are Probably Buying the Wrong Machine for Local AI — The Mac Mini M4 vs Mini PC Truth Nobody…

##### There is a quiet war happening on the desks of AI enthusiasts right now. On one side, the Mac Mini M4 sits sleek and silent, promising…

](<https://medium.com/codex/you-are-probably-buying-the-wrong-machine-for-local-ai-the-mac-mini-m4-vs-mini-pc-truth-nobody-ed26e63f6a17?source=post_page---read_next_recirc--48ada077518e----1---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Mar 20
A clap icon 1.5K A response icon 30
In
ILLUMINATION
by
Sufyan Maan, M.Eng
[

#### I Woke Up at 4:30 AM Every Day for 30 Days — Here Is What Nobody Tells You

##### Here is what actually happened, from someone who did it & tracked everything.

](<https://medium.com/illumination/i-woke-up-at-4-30-am-every-day-for-30-days-here-is-what-nobody-tells-you-054bf0160903?source=post_page---read_next_recirc--48ada077518e----2---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Mar 7
A clap icon 5.9K A response icon 269
In
Stackademic
by
HabibWahid
[

#### Junior Devs Use try-catch Everywhere. Senior Devs Use These 4 Exception Handling Patterns

##### Try-catch on every method? That's not safe code — that's a ticking time bomb. Here's what senior devs do instead.

](<https://blog.stackademic.com/junior-devs-use-try-catch-everywhere-senior-devs-use-these-4-exception-handling-patterns-dcd869ed6551?source=post_page---read_next_recirc--48ada077518e----3---------------------9a984cfa_52bc_4f20_8c27_4863ee82dab6-------------->)
Feb 1
A clap icon 1.93K A response icon 37
See more recommendations
Help
Status
About
Careers
Press
Blog
Privacy
Rules
Terms
Text to speech
