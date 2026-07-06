---
id_fonte: "21218afb-f4be-4ea3-a600-58aba89b8a1b"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). · Issue #5934 · facebook/lexical - GitHub"
tipo: "unknown"
url_original: "https://github.com/facebook/lexical/issues/5934"
keywords: "('Lexical editor bug', 'Version mismatch issues', 'Webpack configuration problems', 'Synchronous state updates', 'Active editor state')"
summary: "This GitHub issue discussion addresses a recurring bug in the Lexical text editor framework where users encounter an error regarding an **inactive editor state**. The root cause is primarily attributed to **version mismatches** or **bundler misconfigurations** that cause multiple instances of Lexical to load simultaneously, particularly when using older tools like Webpack 4. To resolve this, developers must ensure that all **lexical dependencies** share the exact same version and that they are not mixing different module formats like CommonJS and ESM. Additionally, the text highlights a technical requirement for **synchronous execution**, noting that state helpers must be wrapped within specific callback functions like **editor.update()** or **editorState.read()** to function correctly."
extraido_em: "2026-06-30T16:18:38Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). · Issue #5934 · facebook/lexical - GitHub

Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). · Issue #5934 · facebook/lexical
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

### Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). #5934

New issue
Copy link
New issue
Copy link
Open
Open
Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). #5934
Copy link

#### Description

muhammadmudasir1
opened on Apr 21, 2024
Issue body actions
i create reactjs app which works fine but after i use react.lazy at multiple location not in editor and create a build it give the error
Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read().
at getActiveEditorState ( <http://localhost:3000/static/js/bundle.js:755073:13>)
at $getRoot ( <http://localhost:3000/static/js/bundle.js:748462:26>)
at $rootTextContent ( <http://localhost:3000/static/js/bundle.js:747214:65>)
at $isRootTextContentEmpty ( <http://localhost:3000/static/js/bundle.js:747236:14>)
at $canShowPlaceholder ( <http://localhost:3000/static/js/bundle.js:747268:8>)
at <http://localhost:3000/static/js/bundle.js:747308:16>
at readEditorState ( <http://localhost:3000/static/js/bundle.js:740294:12>)
at EditorState.read ( <http://localhost:3000/static/js/bundle.js:741394:12>)
at canShowPlaceholderFromCurrentEditorState ( <http://localhost:3000/static/js/bundle.js:723705:61>)
at <http://localhost:3000/static/js/bundle.js:723709:109>
👍 React with 👍 2 nerdyman and cike8899

#### Activity

##### etrepum commented on Apr 21, 2024

etrepum
on Apr 21, 2024
Collaborator
More actions
This can happen if you have imported multiple versions of Lexical, unfortunately the callstack isn't enough information to help you with this issue. Can you reproduce this error and post the reproduction to github, stackblitz, or codesandbox so it can be inspected by someone else?

##### CarinaSka commented on Apr 29, 2024

CarinaSka
on Apr 29, 2024
· edited by CarinaSka
Edits
More actions
Ref this, I suddenly started getting this same error on some occassions... It works fine in storybook ( with the same data). But when using in application it gives this error : **Uncaught Error: Unable to find an active editor. This method can only be used synchronously during the callback of editor.update().**
I´ve made sure that we use only one version of lexical. Any ideas on what to try? How to make sure that editor has value?! Only change we´ve made is converting to Vite. Anything there that should be mentioned to remember?

##### etrepum commented on Apr 29, 2024

etrepum
on Apr 29, 2024
Collaborator
More actions
Make sure you are only using import or only using require. Mixing both could cause problems. Are you using any third party packages that depend on lexical? Can you post a small project that reproduces this error?
Lexical is tested with vite, so as long as there isn't strange configuration that wouldn't cause a problem on its own.

##### marwencherif commented on Jul 2, 2024

marwencherif
on Jul 2, 2024
More actions
I've encoutred the same issue, trying in a monorepo projects with a wbpackk (using Create React App)

##### etrepum commented on Jul 2, 2024

etrepum
on Jul 2, 2024
Collaborator
More actions
This issue is almost exclusively caused by mixing multiple versions of lexical or its dependencies in the same project. All lexical packages must be the exact same version.
👍 React with 👍 3 udiptaweb, vishal-rathod-07 and daviidxu

##### rodrigolungui commented on Jul 4, 2024

rodrigolungui
on Jul 4, 2024
More actions
Hey @etrepum, I hope you are well!
What do you mean "almost"?
I'm also experiencing this issue and still haven't realized what's happening. I'm trying to update lexical libraries from version **0.12.5** (which works fine) to **0.16.0** . I'm not mixing imports/require, I only use imports in my project. I tried some versions between these, and it worked fine until the 0.14.1.
It seems the error comes from either the RichTextPlugin or PlainTextPlugin .
Here's the code:

```
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
...
<RichTextPlugin
    contentEditable={<ContentEditable />}
    placeholder={<div>{placeholder}</div>}
    ErrorBoundary={LexicalErrorBoundary}
/>
...
```

I also checked the lock file, and the only version I can see from Lexical is 0.16.0, so I'm not mixing versions.

##### etrepum commented on Jul 4, 2024

etrepum
on Jul 4, 2024
Collaborator
More actions
next.js and other build tools often have caches that are not implemented correctly, try removing .next and node\_modules and do a fresh install & build so you have a clean environment next time you test it. Other than that, without a more complete picture of what's going on (e.g. a full reproduction of the issue in an environment that I can inspect), I can't provide any more specific suggestions.
👎 React with 👎 1 canibanoglu
Zian502
mentioned this on Jul 31, 2024
\* Bug: Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read(). #6482

##### Arweil commented on Aug 21, 2024

Arweil
on Aug 21, 2024
More actions
The problem is that **Lexical.dev.js** and **Lexical.dev.mjs** are used simultaneously in the Lexical package, causing editor state exceptions.
The use of **Lexical.dev.js** is caused by the **@lexical/react/LexicalComposer** package.
The webpack v4 does not support the use of the **exports** field in package.json.

```
resolve: {
    alias: {
      '@lexical/react/LexicalComposer': '@lexical/react/LexicalComposer.mjs',
    },
},
```

Use the above code to fix the reference problem.
👍 React with 👍 5 nickelaos, pq-vladislav-s, gberman-coursera, raulrene and Sivanesh-S 😕 React with 😕 1 pablojsx

##### nickelaos commented on Aug 21, 2024

nickelaos
on Aug 21, 2024
More actions
Thanks, Arweil.
It helped fix the error for ReachEditor.
But the issue persists when I'm trying to add ToolbarPlugin.
Could you help me with this, please?
I use the code from the official documentation here:
<https://lexical.dev/docs/getting-started/react#adding-ui-to-control-text-formatting>
My Webpack version: 4.43.0

##### prasadpendke commented on Sep 30, 2024

prasadpendke
on Sep 30, 2024
More actions
I am also facing similar issue which @nickelaos is facing.
@Arweil Can you please help to solve the issue ?

##### Rohit1508 commented on Oct 10, 2024

Rohit1508
on Oct 10, 2024
More actions
Hi @nickelaos,
Did you find the fix?

##### Tetiana-V-Kovalenko commented on Nov 1, 2024

Tetiana-V-Kovalenko
on Nov 1, 2024
More actions
Hi, @nickelaos
Have you resolved the issue with Webpack 4 and lexical?

##### FerdinandObermeier commented on Nov 6, 2024

FerdinandObermeier
on Nov 6, 2024
More actions
I'm facing the same issue. Did anyone find a solution yet?

##### Tetiana-V-Kovalenko commented on Nov 14, 2024

Tetiana-V-Kovalenko
on Nov 14, 2024
More actions
I'm facing the same issue. Did anyone find a solution yet?
No, I still couldn't. Currently, Lexical only works with Webpack 5. However, we were able to use Slate.js for our needs.

##### arunselvakumar commented on Dec 20, 2024

arunselvakumar
on Dec 20, 2024
More actions
I faced the same issue, as @etrepum pointed out it was cos of version mismatch.
In my case, my lexical library was in version 0.21.0 where as other libraries such as @lexical/html, @lexical/react were in 0.20.0. Moving everything to the same version fixed the issue.
👍 React with 👍 1 combokitnet

##### combokitnet commented on Jan 6, 2025

combokitnet
on Jan 6, 2025
More actions
I got same issue, so let make all dependencies of **lexical** to same version will fix it.

##### johnnyoshika commented on Jan 23, 2025

johnnyoshika
on Jan 23, 2025
More actions
I ran into this problem as well using lexical with vite. I had to clean everything out (removing node\_modules, build folders, etc) to finally get rid of this error.
❤ React with ❤ 1 cike8899

##### Sivanesh-S commented on Feb 15, 2025

Sivanesh-S
on Feb 15, 2025
More actions
After upgrading to 0.17.1 I faced the same issue. Also, we are still using Webpack 4.
As @Arweil mentioned above, You can see in the error stack that it references both Lexical.dev.mjs and Lexical.dev.js . So, I added the alias for the Lexical package's file itself.

```
resolve: {
  alias: {
    lexical: 'lexical/Lexical.dev.mjs',
  },
},
```

👍 React with 👍 2 hoffmanilya and dineug2

##### nabeel-workspace commented on Apr 24, 2025

nabeel-workspace
on Apr 24, 2025
More actions
Maybe you guys are running into this issue due to something similar. I found that if this error appears on your screen, it likely means you're interacting with the editor in an unsupported way — either directly or through a plugin.
The error message usually says something like:
**"If you want to use the active editor, you must do it synchronously during the callback of editor.update() or editorState.read() ."**
In my case, I was facing this issue when trying to use @lexical/html 's generateHtmlFromNodes with the editor inside an OnChangePlugin . Here's how I originally wrote it:

```
<OnChangePlugin
  ignoreSelectionChange={true}
  onChange={(editorState, editor) => {
    onChange?.(editorState);
    onSerializedChange?.(editorState.toJSON());

    <!-- ❌ Using the editor directly here causes the error -->
    const htmlString = $generateHtmlFromNodes(editor);
    onChangeHtml?.(htmlString);
  }}
/>
```

But that didn't work because I couldn't access the active editor like that. So I fixed it by wrapping the HTML generation inside editorState.read() like this:

```
<OnChangePlugin
  ignoreSelectionChange={true}
  onChange={(editorState, editor) => {
    onChange?.(editorState);
    onSerializedChange?.(editorState.toJSON());

    <!-- ✅ Correct way — safely access editor inside editorState.read() -->
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChangeHtml?.(htmlString);
    });
  }}
/>
```

Hope this helps someone else who's stuck on the same thing!
👍 React with 👍 5 velezjose, return764, sharadindu724, IsenrichO and bh0mbalziyad

##### mrdivyansh commented on Jul 28, 2025

mrdivyansh
on Jul 28, 2025
· edited by mrdivyansh
Edits
Contributor
More actions
Why should it fail with the same error message?

```
    activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
         $getEditor();
      });
    });
```

##### etrepum commented on Jul 28, 2025

etrepum
on Jul 28, 2025
Collaborator
More actions
You will get that error message if you have multiple copies of lexical in your app. The lexical that the activeEditor used is not the same one that the $getEditor function was imported from. This is either because you have multiple versions of lexical in the app or because your bundler is misconfigured to include lexical multiple times.

##### mrdivyansh commented on Jul 28, 2025

mrdivyansh
on Jul 28, 2025
Contributor
More actions
@etrepum , I found a expectation in the codebase which expects editorState.read to throw error when $getEditor is invoked.
Am I missing anything?

##### etrepum commented on Jul 28, 2025

etrepum
on Jul 28, 2025
Collaborator
More actions
Ah yes, for editorState.read you need to provide the editor in an options argument if you need $getEditor to work.

```
editor.getEditorState().read(
  () => $getEditor(),
  {editor},
)
```

##### mrdivyansh commented on Jul 28, 2025

mrdivyansh
on Jul 28, 2025
Contributor
More actions
I documented about the $getEditor gotcha #7731
Sign up for free **to join this conversation on GitHub.** Already have an account? Sign in to comment

#### Metadata

#### Metadata

##### Assignees

No one assigned

##### Labels

No labels
No labels

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

+12

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
