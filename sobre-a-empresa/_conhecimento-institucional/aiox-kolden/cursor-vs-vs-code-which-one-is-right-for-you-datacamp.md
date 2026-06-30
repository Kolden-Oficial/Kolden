---
id_fonte: "1e5afab9-ff5a-40b5-a37a-f321403a92b4"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Cursor vs. VS Code: Which One Is Right for You? | DataCamp"
tipo: "unknown"
url_original: "https://www.datacamp.com/blog/cursor-vs-vs-code"
keywords: "('AI integration', 'Code editor comparison', 'Autonomous agents', 'Software development workflows', 'Pricing and licensing')"
summary: "This article evaluates the modern development landscape by comparing **Visual Studio Code**, the industry-standard editor, with **Cursor**, a specialized fork engineered for deep **artificial intelligence integration**. The text examines how VS Code remains a reliable, **open-source ecosystem** with a massive extension marketplace, while Cursor differentiates itself through **agent-driven workflows** and superior codebase context awareness. By analyzing **pricing tiers, performance metrics, and privacy considerations**, the author provides a framework for developers to choose a tool based on their need for either **mature stability** or cutting-edge **autonomous coding capabilities**. Ultimately, the guide serves as a strategic roadmap for navigating the shift from traditional text editing to **AI-native software development**."
extraido_em: "2026-06-30T16:19:27Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Cursor vs. VS Code: Which One Is Right for You? | DataCamp

Cursor vs. VS Code: Which One Is Right for You? | DataCamp
[

###### **Master the world's most popular programming language.** **All levels welcome.**

Register for Free](<https://events.datacamp.com/ai-powered-python>)
Skip to main content
EN
English Español Português Deutsch Beta Français Beta Italiano Beta Türkçe Beta Bahasa Indonesia Beta Tiếng Việt Beta Nederlands Beta हिन्दी Beta 日本語 Beta 한국어 Beta Polski Beta Română Beta Русский Beta Svenska Beta ไทย Beta 中文(简体) Beta
More Information
Found an Error?
Log in Get Started
blogs
Blogs
Tutorials
docs
Podcasts
Cheat Sheets
code-alongs
Newsletter
Category
Category
About DataCamp
Latest news about our products and team
Certification DataCamp Classrooms DataCamp Donates For Business Learner Stories Life at DataCamp Product News
Category
Industries
Learn about how data is applied by industry leaders
Enterprise Solutions
Category
Roles
How different roles contribute to data.
Data Leader L&D
Category
Technologies
Discover content by tools and technology
AI Agents AI News Airflow Alteryx Artificial Intelligence AWS Azure Business Intelligence ChatGPT Databricks dbt Docker Excel Flink Generative AI Git Google Cloud Platform Hadoop Java Julia Kafka Kubernetes Large Language Models MongoDB MySQL NoSQL OpenAI PostgreSQL Power BI PySpark Python R Scala Sigma Snowflake Spreadsheets SQL SQLite Tableau
Category
Topics
Discover content by data science topics
AI for Business Big Data Career Development Career Services Cloud Data Analysis Data Engineering Data Governance Data Literacy Data Science Data Skills and Training Data Storytelling Data Transformation Data Visualization DataCamp Product DataLab Deep Learning Machine Learning MLOps Thought Leadership
Browse Courses
category
1. Home
1. Blog
1. Artificial Intelligence

### Cursor vs. VS Code: What's the Difference and Should You Switch?

Learn how Cursor and VS Code differ on AI integration, how they hold up across real development scenarios, and which one is worth your time and money.
Contents
Mar 16, 2026
· 15 min read
Contents
\* What Is VS Code and Why Is It So Popular?
\* What Is Cursor AI Editor?
\* Cursor vs. VS Code: Key Differences Explained
\* AI integration: built-in vs. extension-based
\* Codebase context awareness
\* Editing style: manual vs. agent-driven
\* Customization and flexibility
\* Open source and governance
\* Cursor vs. VS Code AI Capabilities Comparison
\* Inline code suggestions
\* Multi-file editing
\* Autonomous agents
\* MCP and tool integration
\* Cursor vs. VS Code for Real Development Workflows
\* Rapid prototyping and startups
\* Large projects and monorepos
\* Enterprise teams
\* Privacy and offline work
\* Cursor vs. VS Code Performance and Resource Usage
\* VS Code Extensions vs. Cursor Built-In Features
\* The marketplace situation
\* Built-in features that replace extensions
\* Cursor's own plugin ecosystem
\* Cursor vs. VS Code Pricing Comparison
\* Is Cursor Better Than VS Code?
\* Conclusion
\* FAQs

#### Training more people?

Get your team access to the full DataCamp for business platform. For Business For a bespoke solution book a demo.
Visual Studio Code has been the most-used code editor for at least four consecutive years, with roughly three out of four developers choosing it as their primary workspace according to the 2025 Stack Overflow Developer Survey. Then, Cursor arrived: a fork of VS Code that rethinks the editor around AI from the ground up, and it reached over a million daily active users by early 2026.
The comparison between the two has shifted significantly. VS Code is no longer a plain text editor that happens to have extensions. Since GitHub Copilot's free tier launched in December 2024 and Agent Mode went generally available in March 2026, VS Code now ships with serious AI built in. Cursor, on the other hand, has grown from an "AI-enhanced editor" into a platform built around AI agents, automations, and its own proprietary coding model.

#### What Is VS Code and Why Is It So Popular?

Visual Studio Code (VS Code) is a free, open-source code editor developed by Microsoft, first released in April 2015. It runs on the Electron framework and works on Windows, macOS, and Linux. The source code (called Code - OSS) is MIT-licensed.
VS Code's popularity comes down to a few things. It is lightweight compared to full IDEs, supports hundreds of programming languages, has built-in Git integration and a terminal, and offers an extension marketplace with tens of thousands of extensions covering everything from linters to container tools to theme packs. That flexibility is why it has held the top spot for years, well ahead of any other editor in the survey.
What has changed recently is the AI story. In December 2024, Microsoft launched a free GitHub Copilot tier directly inside VS Code, offering 2,000 code completions and 50 chat messages per month at no cost. Since then, VS Code has added Agent Mode, background agents, agentic browser tools, session memory, and MCP (Model Context Protocol) support across its January through March 2026 releases. The editor now describes itself as "the home for multi-agent development."
VS Code with Copilot Agent Mode. Video by Author.

#### What Is Cursor AI Editor?

Cursor is a code editor built around AI, developed by Anysphere Inc., founded in 2022. It first launched in 2023 and crossed $2 billion in annualized revenue by early 2026.
It is a fork of VS Code's open-source codebase, so it looks and feels familiar and preserves your shortcuts, themes, and most extensions. The difference is that the AI layer is built directly into the editor core rather than added through an extension.
As of version 2.6 (March 2026), Cursor includes Tab completion, multi-file Composer mode, Agent Mode with terminal access, Background Agents on remote VMs, Automations triggered by external events, Bugbot for PR review, and a Visual Editor for UI work. It supports models from Anthropic, OpenAI, Google, xAI, and DeepSeek, plus its own Composer 1.5, released in February 2026, which adapts its reasoning time to task difficulty and can self-summarize to keep working through longer edits. In March 2026, Cursor also released its Agent Client Protocol (ACP), bringing its agent into JetBrains IDEs like IntelliJ IDEA and PyCharm.
Cursor Agent Mode with multi-file editing. Video by Author.

#### Cursor vs. VS Code: Key Differences Explained

Now that I've covered both editors, let me walk through where they actually differ. The gap is not just about AI anymore; it is about how deeply the AI is integrated.
*Five key differences between both editors. Image by Author.*

##### AI integration: built-in vs. extension-based

VS Code delivers its AI through GitHub Copilot, which is technically an extension. It communicates with the editor through extension APIs, and while recent updates have deepened that integration substantially, the AI and the editor remain distinct layers. You can disable, swap, or replace the AI without touching the underlying editing experience.
Cursor takes the opposite approach. AI is built directly into the core: the text buffer, the terminal, the file explorer. It does not wait for an API call to understand what you are doing. Tab completions feel noticeably faster, a difference I'll cover in the AI capabilities section below.

##### Codebase context awareness

This is one of the biggest practical differences. VS Code with Copilot provides a context window between 64,000 and 128,000 tokens and primarily relies on open files and workspace search to determine what context to feed the model.
Cursor defaults to repository-wide indexing. It creates an embedding-based fingerprint of your project using Merkle trees, stores those embeddings server-side, and supports context windows up to 272,000 tokens. When you ask Cursor's agent to refactor something, it already has a semantic map of your file relationships, import chains, and architectural patterns. This is where the difference between the two approaches is most concrete.

##### Editing style: manual vs. agent-driven

VS Code is built for developers who want to stay in control. Copilot enhances your typing with Next Edit Suggestions and inline completions. Agent Mode, which became generally available on March 11, 2026, adds autonomous multi-file editing, but the workflow remains interactive and developer-directed.
Cursor goes further in that direction. Its Agent Mode creates and updates files, runs terminal commands, launches a built-in browser for testing, and even opens pull requests. The March 2026 Automations feature lets you set up always-on agents triggered by external events like a GitHub webhook or a Slack message.

##### Customization and flexibility

VS Code gives you a high degree of configurability through settings, extensions, themes, and now Agent Plugins and Agent-Scoped Hooks that let you define how agents behave at a granular level.
Cursor inherits most of VS Code's customization through the fork and adds AI-specific layers on top. You can define project rules in .cursor/rules/ using Markdown files, exclude sensitive files with .cursorignore , and set up per-project AI instructions. It also has its own plugin marketplace, which I'll cover in the extensions section.

##### Open source and governance

VS Code's source code is MIT-licensed and backed by Microsoft. Cursor is proprietary and backed by Anysphere, an independent startup with funding from Accel, a16z, Thrive Capital, Nvidia, and Google.

#### Cursor vs. VS Code AI Capabilities Comparison

Both editors go well beyond simple autocomplete. They handle multi-file edits, run agents, and manage your git workflow. The differences show up most clearly in how deeply each one integrates AI into the editing experience.

##### Inline code suggestions

Cursor's Tab completion runs on Supermaven-powered models and generally feels faster in practice. It predicts not just the next line but the next edit location, so you can Tab through a series of related changes without manually navigating.
VS Code's Copilot inline suggestions can vary more depending on the model and request type. It also introduced Next Edit Suggestions in early 2025, which predict both the location and content of the next code change. The free tier, as mentioned earlier, includes 2,000 completions per month; paid plans offer unlimited.

##### Multi-file editing

Cursor's Composer generates coordinated diffs across your entire repository from a natural language prompt. It can update routes, controllers, tests, and documentation in a single coordinated edit. You review the changes as a unified diff. For complex multi-file work, Cursor recommends using Composer 1.5, its in-house thinking model.
VS Code's Copilot Edits takes a more sequential approach. You explicitly select the files you want edited, and the tool processes them one at a time. Agent Mode expands this to autonomous multi-step editing, but the coordination across files is not as tightly integrated as Composer.

##### Autonomous agents

This is where the gap between the two tools is most noticeable. According to Cursor's release notes, Background Agents run on dedicated VMs, can operate in parallel, create separate branches, and open pull requests when done. Cloud Agents clone your repo and produce merge-ready PRs with video and screenshot artifacts documenting what they did. Subagents, introduced in version 2.4, let the main agent delegate parts of a task to sub-processes that run in parallel, with each subagent able to spawn its own subagents for tree-structured work. Automations launch agents automatically in response to external triggers.
One security detail worth noting for teams: Cloud Agents sign every commit they create, so those commits appear as Verified on GitHub and GitLab by default. Repositories that require signed commits can accept Cloud Agent branches without any manual re-signing.
VS Code's counterpart is the GitHub Copilot coding agent, which works within GitHub Actions environments to create PRs and run builds. VS Code's own Agent Mode handles autonomous tasks within the editor itself. Both are capable, but Cursor's agent infrastructure is further along as of March 2026.

##### MCP and tool integration

Both editors now support the Model Context Protocol (MCP), which lets agents connect to external tools and data sources. Cursor has supported MCP since mid-2025 and added MCP Apps in version 2.6, which render interactive UIs like charts and diagrams directly in the chat window. VS Code added MCP support and Agent Plugins across its 1.109 and 1.110 releases. At this point, MCP support is standard for both tools.

#### Cursor vs. VS Code for Real Development Workflows

How a tool performs in specific scenarios matters more than feature lists. Here are the cases I find most useful for thinking through the choice.

##### Rapid prototyping and startups

Cursor has an advantage here. Agent Mode can scaffold entire features from a natural language description, and the speed of Tab completions helps maintain focus during fast iteration. For greenfield projects with minimal legacy code, using agents reduces the amount of code a developer needs to write manually.
VS Code with Copilot is perfectly fine for prototyping too, especially with the free tier removing any cost barrier. But the workflow is more hands-on, with the AI assisting rather than taking over.

##### Large projects and monorepos

VS Code is the safer choice for massive codebases. Microsoft has optimized startup performance and memory management over a decade, and the editor handles millions of lines of code without requiring background indexing. Cursor's repository-wide indexing can become a bottleneck in very large monorepos, consuming significant CPU and RAM during initial indexing. If you do use Cursor on a large project, using .cursorignore to exclude build artifacts, dependencies, and large data files helps.

##### Enterprise teams

Cursor reports that roughly 60% of its revenue now comes from corporate clients, and its Teams plan includes shared chats, SAML/OIDC SSO, and usage analytics. VS Code with Copilot Business offers IP indemnity, audit logs, and deeper integration with the Microsoft/Azure ecosystem. For exact pricing on both plans, see the pricing section below. If your organization already runs on GitHub Enterprise, Copilot is usually the easier fit for compliance teams.

##### Privacy and offline work

VS Code works completely offline. No data leaves your machine unless you opt into cloud features. Cursor's AI features require internet connectivity. Even with Privacy Mode enabled, your code is sent to inference servers for processing, though zero data retention agreements prevent storage or training on that data. For regulated industries or air-gapped environments, VS Code is generally the only workable option.

#### Cursor vs. VS Code Performance and Resource Usage

Performance differences between the two editors are real but narrower than you might expect.
VS Code generally starts a bit faster and uses less memory at idle, especially on large workspaces. Cursor adds some overhead for background indexing and AI context, so it can feel heavier on machines with limited RAM. For small and medium projects, the difference is usually minor. For very large monorepos or long sessions, VS Code tends to stay more stable over time.
Reports on the Cursor Forum describe memory leaks during extended sessions, particularly when stacking third-party AI extensions on top of Cursor's built-in AI. Disabling any AI extensions you are not actively using often brings memory use back down. VS Code, by comparison, introduced context compaction routines and a /compact command to manage long agent sessions without runaway memory growth.

#### VS Code Extensions vs. Cursor Built-In Features

Extensions are where VS Code's decade-long head start shows most clearly.

##### The marketplace situation

VS Code uses Microsoft's proprietary Visual Studio Marketplace, which has tens of thousands of extensions. Cursor cannot legally access that marketplace directly due to Microsoft's terms of service. Instead, Cursor uses the Open VSX Registry (maintained by the Eclipse Foundation) and its own growing marketplace. In practice, roughly 90% of popular VS Code extensions work in Cursor because most are open-source and cross-published to Open VSX.
The extensions that do not work are typically Microsoft-proprietary ones. Pylance (Microsoft's Python language server), C# Dev Kit, Remote SSH, and Live Share are all unavailable in Cursor. If any of these are in your daily stack, that is a real consideration. For Pylance specifically, the workaround is to use BasedPyright or Pyright, which are open-source alternatives with slightly fewer features.

##### Built-in features that replace extensions

Cursor's AI integration covers what several extension categories would otherwise handle. Its native Tab completion, Agent Mode, and Composer reduce the need for GitHub Copilot. Bugbot covers some of what third-party PR review tools do. The agent's ability to read terminal errors and suggest fixes reduces the need for extensions like Error Lens. Whether you see this as an advantage or a limitation depends on whether you prefer integrated systems or modular ones you can swap in and out.

##### Cursor's own plugin ecosystem

As of March 2026, Cursor launched its own plugin marketplace with integrations from Atlassian, Datadog, GitLab, Hugging Face, and others. The ecosystem is still small compared to VS Code's, but it is growing.

#### Cursor vs. VS Code Pricing Comparison

Pricing is one of the clearest differentiators.
The AI layer through GitHub Copilot follows a tiered model. The free tier gives you 2,000 completions and 50 premium requests per month. If you are a verified student, GitHub Copilot also stays free under a separate Copilot Student plan, though it limits which premium models you can pick manually. Copilot Pro costs $10/month for unlimited completions and 300 premium requests. Copilot Business runs $19/user/month with IP indemnity and centralized management. Copilot Enterprise is $39/user/month with custom models and knowledge bases.
Cursor's pricing starts with a free Hobby tier that includes a two-week Pro trial, limited requests, and access to free-tier models only. Cursor Pro is $20/month with unlimited Tab completions, unlimited Auto mode, and a $20/month credit pool. Pro+ is $60/month with 3x usage on all models. Ultra is $200/month with 20x usage. The Teams plan is $40/user/month with shared chats and SSO.
Cursor switched from request-based to credit-based billing in June 2025. Each paid plan includes a credit pool equal to the plan price in dollars. Auto mode, which lets Cursor pick the most cost-efficient model, is unlimited. But if you manually select a premium model like Claude Opus for a large refactoring task, credits deplete faster. The rollout was rough; the CEO acknowledged mishandling the transition and offered refunds. I'd recommend reading through Cursor's credit docs before committing to a paid plan, since usage can add up faster than expected with premium models.
*Pricing comparison as of March 2026. Image by Author.*
At every price point, VS Code with Copilot is cheaper. A solo developer pays $0-10/month for VS Code versus $20/month for Cursor. A team pays $19/user versus $40/user. Whether the cost difference is worth it depends on how much you use the AI features.

#### Is Cursor Better Than VS Code?

There is no single answer here. The right choice depends on how you work, what you work on, and what trade-offs you are willing to accept.
Choose Cursor if you spend most of your time in agent-based workflows, you regularly need multi-file refactoring and automated agents, the extension gaps (Pylance, Remote SSH, Live Share) do not affect your stack, and you are willing to pay for tighter AI integration.
Choose VS Code with Copilot if budget matters (especially the free tier for learning and personal projects), you depend on Microsoft-specific extensions, you need full offline capability, you prefer the stability of the primary VS Code product rather than a fork that lags upstream, or your organization requires IP indemnity.
| Factor | Winner |
| ------ | ------ |
| **AI depth & agent power** | Cursor |
| **Price** | VS Code |
| **Extension ecosystem** | VS Code |
| **Context window size** | Cursor (up to 272K tokens) |
| **Offline support** | VS Code |
| **Large monorepos** | VS Code |

It is also w orth noting that the landscape extends beyond these two. Claude Code has become a popular alternative for deep reasoning and autonomous coding tasks, and it works alongside any editor. Windsurf, which Cognition AI acquired in July 2025, offers a similar approach to Cursor at a lower price point. The comparison between Cursor and VS Code is useful, but it is not the only one worth making.

#### Conclusion

Cursor and VS Code are converging. Cursor keeps adding traditional IDE features, and VS Code keeps adding AI features. The gap is narrowing, especially since Agent Mode went generally available in March 2026. But real differences remain in how deeply the AI is integrated, how much you can delegate, and what you pay for the experience.
If you work mostly with agents and want AI built deeper into the editing experience, Cursor is the more natural fit. If you need the broadest extension ecosystem, full offline support, or cost-effective team deployment, VS Code with Copilot covers that ground well.
The best way to decide is to test both on something you actually work on. VS Code is free, and Cursor offers a free tier with a two-week Pro trial. I find that the difference becomes clearer after a few days on a real project than it ever does from reading comparisons.
If you want to go further with AI coding tools, I recommend these resources:
\* Our Cursor vs. GitHub Copilot article covers how Cursor compares specifically against GitHub Copilot's feature set, which is useful context alongside this comparison.
\* Our How to Use GitHub Copilot: Use Cases and Best Practices guide shows concrete Copilot patterns inside VS Code so you can benchmark it fairly against Cursor.
\* Our Top 15 Vibe Coding Tools to Build Faster in 2026 article gives a broader view of AI-powered editors and agents beyond just Cursor and VS Code.
Author
Khalid Abdelaty
I'm a data engineer and community builder who works across data pipelines, cloud, and AI tooling while writing practical, high-impact tutorials for DataCamp and emerging developers.

#### FAQs

##### Can I run Cursor and VS Code at the same time?

**Yes, they're two separate apps and don't interfere with each other. Many developers keep both installed and switch depending on the task: VS Code for remote work or Microsoft-specific extensions, Cursor for local AI-assisted work. Each has its own settings and extensions, so nothing carries over unless you set it up manually.**

##### How do I check if a specific extension works in Cursor before switching?

**Search for it at open-vsx.org. That's the registry Cursor pulls from, and if an extension is listed there, it'll usually work. It's worth testing your most critical extensions on a small project before fully switching. The ones that don't carry over are mostly Microsoft-owned: Pylance, Remote SSH, C# Dev Kit, and Live Share. For Pylance, BasedPyright is the closest open-source alternative.**

##### Is Cursor safe for proprietary code?

**Cursor's Privacy Mode stops your code from being stored or used for training, but it's still sent to outside servers for processing. VS Code with Copilot Business adds something different: Microsoft takes legal responsibility if code it generates turns out to copy someone else's work. Cursor doesn't offer that kind of legal cover. For teams with strict compliance requirements, that gap is worth checking before you decide.**

##### What about Claude Code or Windsurf?

**Both are worth knowing about. Claude Code works alongside any editor for deep reasoning and autonomous coding tasks, so it doesn't replace VS Code or Cursor. Windsurf is an agentic IDE that Cognition AI acquired in July 2025, and it takes a similar approach to Cursor but at a lower price point. If you haven't settled on a tool yet, spending a day or two with a couple of options on a real project is more useful than reading comparisons.**

##### Is Cursor worth $20/month when VS Code is free?

**It depends on how often you hit the limits. VS Code's free Copilot tier covers 2,000 completions and 50 chat messages a month, which is enough for occasional use. If you find yourself running into those limits regularly, Cursor's paid plan gives you more room. Start with VS Code's free tier and switch only when the limits start feeling like a problem.**
Topics
Artificial Intelligence
Khalid Abdelaty Data Engineering & AI
Topics
Artificial Intelligence
[

##### Cursor vs. GitHub Copilot: Which AI Coding Assistant Is Better?

](<https://www.datacamp.com/blog/cursor-vs-github-copilot>)
[

##### Claude Code vs Cursor: Which AI Coding Tool Is Right for You?

](<https://www.datacamp.com/blog/claude-code-vs-cursor>)
[

##### Cursor vs Windsurf: A Comparison With Examples

](<https://www.datacamp.com/blog/windsurf-vs-cursor>)
[

##### Cline vs. Cursor: A Comparison With Examples

](<https://www.datacamp.com/tutorial/cline-vs-cursor>)
[

##### Cursor Rules: How to Keep AI Aligned With Your Codebase

](<https://www.datacamp.com/tutorial/cursor-rules>)
[

##### Cursor AI: A Guide With 10 Practical Examples

](<https://www.datacamp.com/tutorial/cursor-ai-code-editor>)
Related
[blog

##### Cursor vs. GitHub Copilot: Which AI Coding Assistant Is Better?

](<https://www.datacamp.com/blog/cursor-vs-github-copilot>)
Learn how Cursor and GitHub Copilot work, how they compare on real-world tasks, and which one fits your workflow and budget.
Khalid Abdelaty
15 min
[blog

##### Claude Code vs Cursor: Which AI Coding Tool Is Right for You?

](<https://www.datacamp.com/blog/claude-code-vs-cursor>)
Compare Claude Code vs Cursor side by side. Discover key differences in pricing, agentic features, and workflow fit, and find out which tool is right for you.
Derrick Mwiti
10 min
[blog

##### Cursor vs Windsurf: A Comparison With Examples

](<https://www.datacamp.com/blog/windsurf-vs-cursor>)
Learn the key differences between Cursor and Windsurf to decide which one best fits your needs.
Bex Tuychiev
8 min
[Tutorial

##### Cline vs. Cursor: A Comparison With Examples

](<https://www.datacamp.com/tutorial/cline-vs-cursor>)
Learn about the key differences between Cursor and Cline to decide which tool best suits your project, budget, and preferred workflow.
Bex Tuychiev
[Tutorial

##### Cursor Rules: How to Keep AI Aligned With Your Codebase

](<https://www.datacamp.com/tutorial/cursor-rules>)
Learn how Cursor rules guide AI coding, from defining project-level context and file-matching patterns to maintaining accurate, up-to-date rules over time.
Bex Tuychiev
[Tutorial

##### Cursor AI: A Guide With 10 Practical Examples

](<https://www.datacamp.com/tutorial/cursor-ai-code-editor>)
Learn how to install Cursor AI on Windows, macOS, and Linux, and discover how to use it through 10 different use cases.
François Aubry
See More See More

#### Grow your data skills with DataCamp for Mobile

Make progress on the go with our mobile courses and daily 5-minute coding challenges.
Download on the App Store Get it on Google Play
**Learn**
Learn Python Learn AI Learn Power BI Learn Data Engineering Assessments Career Tracks Skill Tracks Courses Data Science Roadmap
**Data Courses**
Python Courses R Courses SQL Courses Power BI Courses Tableau Courses Alteryx Courses Azure Courses AWS Courses Google Cloud Courses Google Sheets Courses Excel Courses AI Courses Data Analysis Courses Data Visualization Courses Machine Learning Courses Data Engineering Courses Probability & Statistics Courses
**DataLab**
Get Started Pricing Security Documentation
**Certification**
Certifications Data Scientist Data Analyst Data Engineer SQL Associate Power BI Data Analyst Tableau Certified Data Analyst Azure Fundamentals AI Fundamentals
**Resources**
Resource Center Upcoming Events Blog Code-Alongs Tutorials Docs Open Source RDocumentation Book a Demo with DataCamp for Business Data Portfolio
**Plans**
Pricing For Students For Business For Universities Discounts, Promos & Sales Expense DataCamp DataCamp Donates
**For Business**
Business Pricing Teams Plan Data & AI Unlimited Plan Customer Stories Partner Program
**About**
About Us Learner Stories Careers Become an Instructor Press Leadership Contact Us DataCamp Español DataCamp Português DataCamp Deutsch DataCamp Français
**Support**
Help Center Become an Affiliate
Facebook Twitter LinkedIn YouTube Instagram
Privacy Policy Cookie Notice Do Not Sell My Personal Information Accessibility Security Terms of Use
© 2026 DataCamp, Inc. All Rights Reserved.
