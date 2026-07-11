---
id_fonte: "19d23022-1706-46a2-9609-f771bafb2390"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Setting up Nodejs with nvm on WSL 2 - DEV Community"
tipo: "unknown"
url_original: "https://dev.to/cryptus_neoxys/setting-up-nodejs-with-nvm-on-wsl-2-3828"
keywords: "('Nodejs installation', 'WSL 2', 'nvm version manager', 'Linux environment', 'Version control management')"
summary: "This technical guide provides a streamlined walkthrough for configuring a development environment by **integrating Node.js into the Windows Subsystem for Linux (WSL 2)**. The author advocates for the use of the **Node Version Manager (nvm)**, a versatile utility that simplifies the process of **installing and toggling between multiple software versions** through simple terminal commands. By outlining steps for fetching the latest stable and long-term support releases, the text highlights the **flexibility and efficiency** gained when developers can rapidly adapt their environment to different project requirements. Ultimately, the resource serves as a practical roadmap for programmers seeking to bridge the gap between **Windows-based hardware and Linux-based development workflows**."
extraido_em: "2026-06-30T16:22:02Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Setting up Nodejs with nvm on WSL 2 - DEV Community

Setting up Nodejs with nvm on WSL 2 - DEV Community
Skip to content
Powered by Algolia
Log in Create account

#### DEV Community

38 Add reaction
37 Like 1 Unicorn 0 Exploding Head 0 Raised Hands 0 Fire
0 Jump to Comments 5 Save Boost
Copy link
Copied to Clipboard
Share to X Share to LinkedIn Share to Facebook Share to Mastodon
Report Abuse
Dev Sharma
Posted on Nov 14, 2021
• Originally published at blog.devsharma.live on May 22, 2021
37 1

### Setting up Nodejs with nvm on WSL 2

# linux # windows # node # wsl

#### Installing node.js in WSL 2

( **NOTE** : Although this tutorial demonstrates WSL 2/Ubuntu, this installation is primarily for Linux) In this tutorial, we will use node version manager or *nvm* to install and manage node versions. nvm certainly has its advantages as it allows you to easily install and manage multiple node versions on your system. This also means you can easily switch node and npm versions with a single command and that comes in handy.
If you don't already have it, install curl

```
sudo apt-get install curl


curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

( **Note:** *instead of v0.38.0 Use the latest version of nvm from GitHub* )
Verify your installation using

```
command -v nvm
```

(If you get an error command not found , restart your shell and try again.)
Let's install the LTS and latest stable version of Nodejs, you can also choose one of those if you prefer, but believe me, it's super simple to switch between different node versions using nvm.
Install the LTS version

```
nvm install --lts
```

Install the latest version

```
nvm install node
```

You can check all the installed versions using the following command

```
nvm ls
```

Check the version of node and npm you are running:

```
node --version
npm --version
```

You can install a specific version of node:

```
nvm install 14.17.0
```

To use a specific node version:

```
nvm use 14.17.0
# lts version
nvm use --lts
# latest stable version
nvm use node
```

Feel free to reach out to me on Twitter @cryptus\_neoxys and connect with me on LinkedIn.

#### Refs & Resources

Microsoft Docs
nvm-sh/nvm
The DEV Team
Promoted
\* What's a billboard?
\* Manage preferences
\* Report billboard

#### Join the Notion MCP Challenge: $1,500 in Prizes! 💸

Running through March 29, the Notion MCP Challenge welcomes you to centralize your workflow with AI-powered docs, projects, and notes. Scale side hustles or empires with "human-in-the-loop" systems that run globally without ever hitting snooze!
See more 👀
Read More

#### Top comments (0)

Subscribe
Personal Trusted User
Create template
Templates let you quickly answer FAQs or store snippets for re-use.
Submit Preview Dismiss
Code of Conduct
• Report abuse
Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink. [-] 1
Hide child comments as well
Confirm
For further actions, you may consider blocking this person and/or reporting abuse
Sonar
Promoted
\* What's a billboard?
\* Manage preferences
\* Report billboard

#### State of Code Developer Survey report

Did you know 96% of developers don't fully trust that AI-generated code is functionally correct, yet only 48% always check it before committing? Check out Sonar's new report on the real-world impact of AI on development teams.
Read the results
Dev Sharma
Follow
Student | Developer
\* Location Vadodara, Gujarat, India
\* Education Vellore Institute of Technology, Vellore
\* Joined Aug 2, 2020

##### More from Dev Sharma

Ditching Linux for WSL 2 # linux # windows # ubuntu # tutorial
Nest JS REST API Tutorial # webdev # typescript # beginners # node
Developing with VS Code on WSL 2 # linux # vscode # beginners # programming
MongoDB
Promoted
\* What's a billboard?
\* Manage preferences
\* Report billboard

#### Gen AI apps are built with MongoDB Atlas

MongoDB Atlas is the developer-friendly database for building, scaling, and running gen AI & LLM apps—no separate vector DB needed. Enjoy native vector search, 115+ regions, and flexible document modeling. Build AI faster, all in one place.
Start Free
👋 Kindness is contagious
\* What's a billboard?
\* Manage preferences
\* Report billboard
*If this helped, please leave a ❤ or a friendly comment!*

#### Okay

💎 DEV Diamond Sponsors
Thank you to our Diamond Sponsors for supporting the DEV Community
Google AI is the official AI Model and Platform Partner of DEV
Neon is the official database partner of DEV
Algolia is the official search partner of DEV
DEV Community — A space to discuss and keep up software development and manage your software career
\* Home
\* DEV++
\* Videos
\* DEV Education Tracks
\* DEV Challenges
\* DEV Help
\* Advertise on DEV
\* Organization Accounts
\* DEV Showcase
\* About
\* Contact
\* Free Postgres Database
\* Forem Shop
\* MLH
\* Code of Conduct
\* Privacy Policy
\* Terms of Use
Built on Forem — the open source software that powers DEV and other inclusive communities.
Made with love and Ruby on Rails. DEV Community © 2016 - 2026.
We're a place where coders share, stay up-to-date and grow their careers.
Log in Create account
