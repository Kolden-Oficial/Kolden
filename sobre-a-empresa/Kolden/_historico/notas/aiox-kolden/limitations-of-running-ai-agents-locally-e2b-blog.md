---
id_fonte: "0fbae7a9-1f1f-43f6-9cd7-01e0299c9239"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Limitations of Running AI Agents Locally — E2B Blog"
tipo: "unknown"
url_original: "https://e2b.dev/blog/limitations-of-running-ai-agents-locally"
keywords: "('AI Agent Limitations', 'Local Code Execution', 'Security and Isolation', 'Scalability Challenges', 'User Experience Design')"
summary: "This article explores the transition of AI agents from simple chatbots to autonomous tools capable of **executing generated code**, while highlighting the significant dangers of running these processes on a user's local machine. The author identifies **security and isolation** as primary concerns, noting that local environments like Docker often fail to fully protect a system from untrusted code. Furthermore, the text argues that local execution hinders **scalability and user experience**, as non-technical users may struggle with complex installations and the inability to maintain persistent, shareable sessions. Ultimately, the source advocates for a shift toward **cloud-based sandboxing**, positioning remote runtimes as the necessary evolution for building secure, collaborative, and professional AI applications."
extraido_em: "2026-06-30T16:20:43Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Limitations of Running AI Agents Locally — E2B Blog

Limitations of Running AI Agents Locally — E2B Blog
CASE STUDY Perplexity shipped advanced data analysis in 1 week LEARN MORE →
CASE STUDY How Manus Uses E2B to Provide Agents With Virtual Computers LEARN MORE →
Slide 2 of 2.
We raised $21M Series A Learn what's next →

---

Download logo (SVG/PNG)
Product
Pricing
Resources
Case Studies
Startups
Research
Cookbook
Blog
Docs
Case Studies
ENTERPRISE
Cookbook
Blog
Docs
Startups
Research
Careers
BOOK A CALL
CAREERS
Light/DARK
SIGN UP SIGN IN
↩ BLOG
/
Insights

### Limitations of Running AI Agents Locally

Tereza Tizkova
Growth
Feb 9, 2024
4
min
Share
JS/TS
PYTHON
Like many developers, I have been recently building my own coding AI agent.
I was inspired by a lot of popular code interpreters and AI coding frameworks I have seen lately, like Open Interpreter, Autogen, or ChatGPT Code Interpreter plugin.
The coding agents' value for daily usage has increased after they have **evolved from just chatting, to doing the actual work** . Developers are equipping their agents with the ability to **execute LLM-generated code output** .
Imagine you are using an AI agent that can analyze and visualize given data, but instead of just providing you a code that you can copy-paste to do the task, the agent conducts the next step and also runs the code to produce a chart and saves it to your local filesystem.
For example, when I used AutoGen to analyze stock data. The AI agents generated the required code, executed it, and saved the resulting data analysis chart in a PDF format on my computer:
When a human user chooses to execute the code, the output opens in a new window like this:
The code execution is often done locally via containers, e.g., Docker, like in the case of Autogen. Many developers that I talked to started building their own in-house solutions for running AI code.
Running the AI output on the user's computer is an achievable, but risky way. Here are a few obvious and less obvious issues that I had, and noticed other AI developers mentioning:

#### 1. Security + isolation

Allowing AI tools to autonomously run untrusted LLM-generated operations on users' computers can be problematic.
Take for example Docker containers, that (according to their docs) possess a risk of providing incomplete isolation, either independently, or when used in combination with kernel vulnerabilities.
When using containers, ensuring isolation is very difficult even when adding barriers.

#### 2. User-centric approach

The approach to building AI agents has begun as developer-centric, which is understandable for any emerging field or technology.
This can result in end users facing difficulties with all the AI products that were built using Docker or another type of local solution.
The majority of AI assistants with nice user experience I came across were browser apps - people often ask how to filter AI tools based on whether they provide nice UI. It's worth noting that apps don't necessarily have to be used solely on desktop and some provide better functionalities on a mobile version.
Non-technical users may struggle with installing an app locally, let alone controlling it via a terminal.
In such a setting, it's also challenging to allow end users to collaborate, and share their files with their app in a simple way or share outputs within a team.
Within a browser UI, users can share resources and templates so they don't have to build the same thing from scratch.

#### 3. Scalability

Another challenge that is particularly important for agent-building frameworks is deploying AI agent instances so they can scale. An AI platform or service that accommodates thousands of users, each developing its own AI applications, will require thousands of containers, as each agent instance needs to run in its own isolated environment.

#### 4. Session length

A lot of developers want their end users to be able to return to their work after some time or even after closing and re-opening the app. Developers need to ensure long-running sessions for their AI products.
In conclusion, end users apply their UX and security standards from using "traditional" software to AI apps.
Issues like security and data privacy have been discussed even more in relation to AI.
Within the new AI tech stack that is being formed, developers need to think of a solution that would be tailored for building AI products.

###### E2B - Remote execution of AI-generated output

E2B (5.7K+ ⭐) provides the cloud runtime for AI agents and apps.
The E2B Sandbox is a secure way to run your AI app. It is a long-running cloud environment where you can let any LLM (GPTs, Claude, local LLMs, etc) use tools as you would do locally.
Check out the quick start in the docs to start with E2B for free: <https://e2b.dev/docs>.
Give Your Agents
Secure AI Sandbox
Get started today.
SIGN UP
SEE ALSO
↩ VIEW ALL
Sweep Founders Share Learnings from Building an AI Coding Assistant
7
min
·
Sep 1, 2023
Interviews
AI Code Execution with Mistral's Codestral
7
min
·
May 30, 2024
Guides
Build AI data analyst with sandboxed code execution using TS, and GPT-4o
8
min
·
May 29, 2024
Guides
Follow @e2b on X to see live updates.
/
We're hiring! Check open positions on the Careers page.
/
Hundreds of millions of sandboxes launched.
/
We're always Excited 2 Build.
/
Site
Product Pricing Cookbook Docs Blog
Company
Careers Contact Privacy Policy Terms of Service
Social
Github X Discord LinkedIn
Status
Check system status
Build and run AI agents with confidence. Your data is protected with enterprise-grade security.
©2026 ✶ FoundryLabs, Inc.
