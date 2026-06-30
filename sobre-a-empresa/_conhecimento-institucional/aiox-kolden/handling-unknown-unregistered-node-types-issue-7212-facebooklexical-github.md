---
id_fonte: "a1be99eb-2e8e-4d06-b20c-d612f16e46f7"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Handling unknown / unregistered node types · Issue #7212 · facebook/lexical - GitHub"
tipo: "unknown"
url_original: "https://github.com/facebook/lexical/issues/7212"
keywords: "('Lexical node registration', 'JSON serialization', 'Handling unknown nodes', 'Markdown import', 'Editor state compatibility')"
summary: "This GitHub issue centers on a technical discussion regarding how the **Lexical text editor framework** should manage **unregistered node types** during data import. The author proposes implementing **graceful degradation strategies**, such as skipping unknown content or rendering placeholder nodes, to prevent the application from crashing when it encounters unfamiliar JSON or Markdown data. While the user argues that **deserialization hooks** would improve portability and backward compatibility, maintainers point out that **serialized nodes lack self-description**, making it difficult for the system to guess their intended behavior or structure. Ultimately, the conversation highlights a tension between **flexible data recovery** and the strict requirements of a **schema-driven editor**, suggesting that developers currently handle these scenarios by creating custom node classes to map and translate legacy data."
extraido_em: "2026-06-30T16:20:04Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Handling unknown / unregistered node types · Issue #7212 · facebook/lexical - GitHub

Handling unknown / unregistered node types · Issue #7212 · facebook/lexical
Skip to content

#### Navigation Menu

Toggle navigation
Sign in
Appearance settings
\* Platform
\* AI CODE CREATION
\* GitHub Copilot Write better code with AI
\* GitHub Spark Build and deploy intelligent apps
\* GitHub Models Manage and compare prompts
\* MCP Registry New Integrate external tools
\* DEVELOPER WORKFLOWS
\* Actions Automate any workflow
\* Codespaces Instant dev environments
\* Issues Plan and track work
\* Code Review Manage code changes
\* APPLICATION SECURITY
\* GitHub Advanced Security Find and fix vulnerabilities
\* Code security Secure your code as you build
\* Secret protection Stop leaks before they start
\* EXPLORE
\* Why GitHub
\* Documentation
\* Blog
\* Changelog
\* Marketplace View all features
\* Solutions
\* BY COMPANY SIZE
\* Enterprises
\* Small and medium teams
\* Startups
\* Nonprofits
\* BY USE CASE
\* App Modernization
\* DevSecOps
\* DevOps
\* CI/CD
\* View all use cases
\* BY INDUSTRY
\* Healthcare
\* Financial services
\* Manufacturing
\* Government
\* View all industries View all solutions
\* Resources
\* EXPLORE BY TOPIC
\* AI
\* Software Development
\* DevOps
\* Security
\* View all topics
\* EXPLORE BY TYPE
\* Customer stories
\* Events & webinars
\* Ebooks & reports
\* Business insights
\* GitHub Skills
\* SUPPORT & SERVICES
\* Documentation
\* Customer support
\* Community forum
\* Trust center
\* Partners View all resources
\* Open Source
\* COMMUNITY
\* GitHub Sponsors Fund open source developers
\* PROGRAMS
\* Security Lab
\* Maintainer Community
\* Accelerator
\* GitHub Stars
\* Archive Program
\* REPOSITORIES
\* Topics
\* Trending
\* Collections
\* Enterprise
\* ENTERPRISE SOLUTIONS
\* Enterprise platform AI-powered developer platform
\* AVAILABLE ADD-ONS
\* GitHub Advanced Security Enterprise-grade security features
\* Copilot for Business Enterprise-grade AI features
\* Premium Support Enterprise-grade 24/7 support
\* Pricing
Search or jump to...

### Search code, repositories, users, issues, pull requests...

Search
Clear
Search syntax tips

### Provide feedback

We read every piece of feedback, and take your input very seriously. [-]
Include my email address so I can be contacted
Cancel Submit feedback

### Saved searches

#### Use saved searches to filter your results more quickly

Name
Query
To see all available qualifiers, see our documentation.
Cancel Create saved search
Sign in
Sign up
Appearance settings
Resetting focus
You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert
facebook / **lexical** Public
\* Notifications You must be signed in to change notification settings
\* Fork 2.1k
\* Star 23.2k
\* Code
\* Issues 526
\* Pull requests 17
\* Discussions
\* Actions
\* Projects
\* Models
\* Wiki
\* Security and quality 0
\* Insights
Additional navigation options
\* Code
\* Issues
\* Pull requests
\* Discussions
\* Actions
\* Projects
\* Models
\* Wiki
\* Security and quality
\* Insights

### Handling unknown / unregistered node types #7212

New issue
Copy link
New issue
Copy link
Open
Open
Handling unknown / unregistered node types #7212
Copy link
Labels
serialization

#### Description

vadimkantorov
opened on Feb 19, 2025
· edited by vadimkantorov
Edits
Issue body actions
I searched in Google and in Issues but did not find unfortunately any discussion on this.
A usecase:
\* import in a Lexical-based editor some markdown or serialized editor-state in JSON
\* not all node types used are actually registered in the editor, so an error is thrown
Is there a way to configure Lexical to handle gracefully unknown node types?
I could imagine several meaningful strategies for different usecases:
1. ignore/skip nodes with unknown node types
1. render unknown node types as some opaque thing and preserve the original content in subsequent serializations (so that the unknown node can survive deserialization/serialization)
1. import as a node of another type, e.g. import code node as paragraph node
The strategies (1) and (2) can be used in a quite generic way and not require much of additional configuration.
Some of my actual use cases:
\* E.g. in A CLI tool (in examples/ or maybe available in npx?) which takes up an editorState JSON from stdin and renders read-only HTML to stdout #7177, I made a CLI tool to render some node types from a deserialized JSON, and it would be practical to be able to ignore/skip the unknown nodes (e.g. EmojiNode from the default document exported from Playground) or replace them with some special values like <block of unknown node type 'this-that'> .
\* For markdown specifically, I added markdown import in <https://github.com/facebook/lexical/tree/main/examples/react-rich> and trying to import some markdown using triple-backticks. But it throws because I have not registered yet the CodeNode from lexical/code . But it could also be reasonable to import it as bare text/paragraph to display something reasonable and at least show the rest of the document
Thank you!

#### Activity

##### etrepum commented on Feb 19, 2025

etrepum
on Feb 19, 2025
Collaborator
More actions
In general this doesn't really work and it's unlikely that anyone would want to spend time on this because serialized nodes aren't self-describing. Other than the type attribute the rest of the data could literally be anything and have any meaning. You can't really even know whether a node is a TextNode, DecoratorNode, or an ElementNode. There's also essentially no validation in the parsers from JSON right now so unless you also added some sort of schema validation for these guesses things would just crash or behave in unpredictable ways.
In other words, if you're planning to exchange random stuff between editors that are not explicitly designed to work together, then HTML is what you want to be using. Not JSON.

##### vadimkantorov commented on Feb 22, 2025

vadimkantorov
on Feb 22, 2025
Author
More actions
rest of the data could literally be anything and have any meaning.
What I'm proposing is to have a mechanism for handling unknown nodes in a custom way
Of course, one cannot do any editing/meaningful display of unknown nodes - but preserving the original representation for import-export roundtrip or allowing the user to delete these nodes should be possible (similar to how the editor displays "question-mark" icosn when a font does not know some unicode sequence encountered in text)
At least, allowing a hook to ignore/skip unknown nodes during deserialization from JSON / markdown parsing - should be possible. Maybe this type of handling / hooks exists already in Lexical?
if you're planning to exchange random stuff between editors that are not explicitly designed to work together, then HTML is what you want to be using. Not JSON.
JSON as representation has some advantages: it's extremely portable and is easy to manipulate/generate in other languages as a document representation and can have a more direct mapping to node types. So I think that having some deserialization hooks for unknown nodes is quite useful for both JSON and for Markdown.
It can also be useful in compatibility scenarios, when I saved to database a JSON with some node types which were later retired, so it's needed to do some custom transformations of them at deserialization time.
For HTML, is the need for hook/transforms why html: { export: ..., import: ...}, exists in EditorConfig ?
Thank you!

##### etrepum commented on Feb 22, 2025

etrepum
on Feb 22, 2025
Collaborator
More actions
The correct solution in the case when a node is retired or you don't want to implement it for some reason is to create a node class with the same type that can import that data
etrepum
added
serialization
on Feb 26, 2025
Sign up for free **to join this conversation on GitHub.** Already have an account? Sign in to comment

#### Metadata

#### Metadata

##### Assignees

No one assigned

##### Labels

serialization

##### Type

No type

##### Projects

No projects

##### Milestone

No milestone

##### Relationships

None yet

##### Development

Code with agent mode
Select code repository
No branches or pull requests

##### Participants

#### Issue actions

#### Footer

© 2026 GitHub, Inc.

##### Footer navigation

```
*  Terms
*  Privacy
*  Security
*  Status
*  Community
*  Docs
*  Contact
*  Manage cookies
*  Do not share my personal information
```

You can't perform that action at this time.
