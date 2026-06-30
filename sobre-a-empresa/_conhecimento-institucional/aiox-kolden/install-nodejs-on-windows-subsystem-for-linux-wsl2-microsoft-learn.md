---
id_fonte: "93ae5d80-0b9c-4e86-9bfd-cabf312c6372"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Install Node.js on Windows Subsystem for Linux (WSL2) - Microsoft Learn"
tipo: "unknown"
url_original: "https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl"
keywords: "('Node.js installation', 'WSL 2 setup', 'Node Version Manager', 'Visual Studio Code', 'Windows Terminal')"
summary: "This technical guide provides a comprehensive framework for configuring a **Node.js development environment** specifically within the **Windows Subsystem for Linux (WSL 2)**. The text serves as a roadmap for developers, emphasizing the use of **version managers like nvm** to maintain flexibility across different project requirements and ensuring a consistent workflow between local coding and **Linux-based production servers**. Beyond core installation, the documentation highlights essential tools for an optimized experience, such as the **Windows Terminal** for interface management and **Visual Studio Code** paired with the **Remote-WSL extension**. By following these steps, users can bridge the gap between Windows hardware and Linux software, creating a high-performance workspace that leverages the strengths of both operating systems."
extraido_em: "2026-06-30T16:20:17Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Install Node.js on Windows Subsystem for Linux (WSL2) - Microsoft Learn

Set up Node.js on WSL 2 | Microsoft Learn
Skip to main content Skip to Ask Learn chat experience

#### Microsoft Build 2026

June 2-3, 2026
Go deep on real code and real systems in San Francisco and online
Learn more
Dismiss alert
This browser is no longer supported.
Upgrade to Microsoft Edge to take advantage of the latest features, security updates, and technical support.
Download Microsoft Edge More info about Internet Explorer and Microsoft Edge
Learn
Suggestions will filter as you type
Sign in
\* Profile
\* Settings
Sign out
Learn
\* Documentation
\* All product documentation
\* Azure documentation
\* Dynamics 365 documentation
\* Microsoft Copilot documentation
\* Microsoft 365 documentation
\* Power Platform documentation
\* Code samples
\* Troubleshooting documentation Free to join. Request to attend. Microsoft AI Tour Take your business to the AI frontier.
\* Training & Labs
\* All training
\* Azure training
\* Dynamics 365 training
\* Microsoft Copilot training
\* Microsoft 365 training
\* Microsoft Power Platform training
\* Labs
\* Credentials
\* Career paths Free to join. Request to attend. Microsoft AI Tour Take your business to the AI frontier.
\* Q&A
\* Ask a question
\* Azure questions
\* Windows questions
\* Microsoft 365 questions
\* Microsoft Outlook questions
\* Microsoft Teams questions
\* Popular tags
\* All questions Free to join. Request to attend. Microsoft AI Tour Take your business to the AI frontier.
\* Topics
\* Artificial intelligence Learning hub to build AI skills
\* Compliance Compliance resources you need to get started with your business
\* DevOps DevOps practices, Git version control and Agile methods
\* Learn for Organizations Curated offerings from Microsoft to boost your team's technical skills
\* Platform engineering Tools from Microsoft and others to build personalized developer experiences
\* Security Guidance to help you tackle security challenges
\* Assessments Interactive guidance with custom recommendations
\* Student hub Self-paced and interactive training for students
\* Educator center Resources for educators to bring technical innovation in their classroom Free to join. Request to attend. Microsoft AI Tour Take your business to the AI frontier.
Suggestions will filter as you type
Sign in
\* Profile
\* Settings
Sign out
Windows Developer Tools
\* Windows Terminal
\* WSL
\* Microsoft PowerToys
\* Windows Package Manager
\* Advanced settings
\* Overview
\* Dev Drive
\* File Explorer + version control
\* Sudo for Windows
\* Development paths
\* JavaScript
\* Python
\* Android
\* C and C++
\* C#
\* F#
\* Docker
\* PowerShell
\* Rust
\* More tools & resources
\* .NET documentation
\* Azure developer documentation
\* VS Code documentation
\* Visual Studio documentation
\* Mac to Windows guide
\* More
\* Windows Terminal
\* WSL
\* Microsoft PowerToys
\* Windows Package Manager
\* Advanced settings
\* Overview
\* Dev Drive
\* File Explorer + version control
\* Sudo for Windows
\* Development paths
\* JavaScript
\* Python
\* Android
\* C and C++
\* C#
\* F#
\* Docker
\* PowerShell
\* Rust
\* More tools & resources
\* .NET documentation
\* Azure developer documentation
\* VS Code documentation
\* Visual Studio documentation
\* Mac to Windows guide
Table of contents Exit editor mode
1. Learn
1. Windows
1. Learn
1. Windows
Ask Learn Ask Learn Focus mode
Table of contents Read in English Add to Collections Add to plan Edit

###### Share via

Facebook x.com LinkedIn Email
Copy Markdown Print
Note
Access to this page requires authorization. You can try signing in or changing directories.
Access to this page requires authorization. You can try changing directories.

### Install Node.js on Windows Subsystem for Linux (WSL2)

Feedback
Summarize this article for me

#### In this article

```
1. Install Windows Subsystem for Linux
1. Windows Terminal
1. Install nvm, node.js, and npm
1. Alternative version managers
1. Install Visual Studio Code
1. Set up Git (optional)
```

Show 2 more
For those who prefer using Node.js in a Linux environment, this guide will help you to install Node.js on the Windows Subsystem for Linux (WSL 2 is the recommended version).
Consider the following when deciding where to install and whether to develop with Node.js in a native Windows versus a Linux (WSL 2) environment:
\* **Skill level** : If you are new to developing with Node.js and want to get up and running quickly so that you can learn, install Node.js on Windows. Installing and using Node.js on Windows will provide a less complex environment for beginners than using WSL.
\* **Command line client tool** : If you prefer PowerShell, use Node.js on Windows. If you prefer Bash, use Node.js on Linux (WSL 2).
\* **Production server** : If you plan to deploy your Node.js app on Windows Server, use Node.js on Windows. If you plan to deploy on a Linux Server, use Node.js on Linux (WSL 2). WSL allows you to install your preferred Linux distribution (with Ubuntu as the default), ensuring consistency between your development environment (where you write code) and your production environment (the server where your code is deployed).
\* **Performance speed and system call compatibility** : There is continuous debate and development on Linux vs Windows performance, but the key when using a Windows machine is to keep your development project files in the same file system where you have installed Node.js. If you install Node.js on the Windows file system, keep your files on a Windows drive (for example, C:/). If you install Node.js on a Linux distribution (like Ubuntu), keep your project files in the Linux file system directory associated with the distribution that you are using. (Enter explorer.exe . from your WSL distribution command line to browse the directory using Windows File Explorer.)
\* **Docker containers** : If you want to use Docker containers to develop your project on Windows, we recommend that you Install Docker Desktop on Windows. To use Docker in a Linux workspace, see set up Docker Desktop for Windows with WSL 2 to avoid having to maintain both Linux and Windows build scripts.

#### Install Windows Subsystem for Linux

See the WSL install documentation if you plan to use a Linux development environment with Node.js. These steps will include choosing a Linux distribution (Ubuntu is the default) and the version of Windows Subsystem for Linux (WSL 2 is the default and recommended version). You can install multiple Linux distributions if you wish.
Once you have installed WSL 2 and a Linux distribution, open the Linux distribution (it can be found in your Windows Terminal list or Windows start menu) and check the version and codename using the command: lsb\_release -dc .
We recommend updating your Linux distribution regularly, including immediately after you install, to ensure you have the most recent packages. Windows doesn't automatically handle this update. To update your distribution, use the command: sudo apt update && sudo apt upgrade .

#### Windows Terminal

Windows Terminal is an improved command line shell that allows you to run multiple tabs so that you can quickly switch between Linux command lines, Windows Command Prompt, PowerShell, Azure CLI, or whatever you prefer to use. You can also create custom key bindings (shortcut keys for opening or closing tabs, copy+paste, etc.), use the search feature, customize your terminal with themes (color schemes, font styles and sizes, background image/blur/transparency), and more. Learn more in the Windows Terminal docs.

#### Install nvm, node.js, and npm

Besides choosing whether to install on Windows or WSL, there are additional choices to make when installing Node.js. We recommend using a version manager as versions change very quickly. You will likely need to switch between multiple versions of Node.js based on the needs of different projects you're working on. Node Version Manager, more commonly called nvm, is the most popular way to install multiple versions of Node.js. We will walk through the steps to install nvm and then use it to install Node.js and Node Package Manager (npm). There are alternative version managers to consider as well covered in the next section.
Important
It is always recommended to remove any existing installations of Node.js or npm from your operating system before installing a version manager as the different types of installation can lead to strange and confusing conflicts. For example, the version of Node that can be installed with Ubuntu's apt-get command is currently outdated. For help with removing previous installations, see How to remove nodejs from ubuntu.)
For the most current information on installing NVM, see Installing and Updating in the NVM repo on GitHub.
1. Open your Ubuntu command line (or distribution of your choice).
1. Install cURL (a tool used for downloading content from the internet in the command-line) with: sudo apt-get install curl
1. Install nvm, with: curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh> | bash Note Installing a newer version of NVM using cURL will replace the older one, leaving the version of Node you've used NVM to install intact. For more information, see the GitHub project page for the latest release information on NVM.
1. To verify installation, enter: command -v nvm ...this should return 'nvm', if you receive 'command not found' or no response at all, close your current terminal, reopen it, and try again. Learn more in the nvm github repo.
1. List which versions of Node are currently installed (should be none at this point): nvm ls
1. Install both the current and stable LTS versions of Node.js. In a later step, you'll learn how to switch between active versions of Node.js with an nvm command.
\* Install the current stable LTS release of Node.js (recommended for production applications): nvm install --lts
\* Install the current release of Node.js (for testing latest Node.js features and improvements, but more likely to have issues): nvm install node
1. List what versions of Node are installed: nvm ls ...now you should see the two versions that you just installed listed.
1. Verify that Node.js is installed and the currently default version with: node --version . Then verify that you have npm as well, with: npm --version (You can also use which node or which npm to see the path used for the default versions).
1. To change the version of Node.js you would like to use for a project, create a new project directory mkdir NodeTest , and enter the directory cd NodeTest , then enter nvm use node to switch to the Current version, or nvm use --lts to switch to the LTS version. You can also use the specific number for any additional versions you've installed, like nvm use v8.2.1 . (To list all of the versions of Node.js available, use the command: nvm ls-remote ).
If you are using NVM to install Node.js and NPM, you should not need to use the SUDO command to install new packages.

#### Alternative version managers

While nvm is currently the most popular version manager for node, there are a few alternatives to consider:
\* n is a long-standing nvm alternative that accomplishes the same thing with slightly different commands and is installed via npm rather than a bash script.
\* fnm is a newer version manager, claiming to be much faster than nvm . (It also uses Azure Pipelines.)
\* Volta is a new version manager from the LinkedIn team that claims improved speed and cross-platform support.
\* asdf-vm is a single CLI for multiple languages, like ike gvm, nvm, rbenv & pyenv (and more) all in one.
\* nvs (Node Version Switcher) is a cross-platform nvm alternative with the ability to integrate with VS Code.

#### Install Visual Studio Code

We recommend using Visual Studio Code with the Remote-development extension pack for Node.js projects. This splits VS Code into a “client-server” architecture, with the client (the VS Code user interface) running on your Windows operating system and the server (your code, Git, plugins, etc) running "remotely" on your WSL Linux distribution.
Note
This “remote” scenario is a bit different than you may be accustomed to. WSL supports an actual Linux distribution where your project code is running, separately from your Windows operating system, but still on your local machine. The Remote-WSL extension connects with your Linux subsystem as if it were a remote server, though it's not running in the cloud… it's still running on your local machine in the WSL environment that you enabled to run alongside Windows.
\* Linux-based Intellisense and linting is supported.
\* Your project will automatically build in Linux.
\* You can use all your extensions running on Linux ( ES Lint, NPM Intellisense, ES6 snippets, etc.).
Other code editors, like IntelliJ, Sublime Text, Brackets, etc. will also work with a WSL 2 Node.js development environment, but may not have the same sort of remote features that VS Code offers. These code editors may run into trouble accessing the WSL shared network location (\wsl$\Ubuntu\home) and will try to build your Linux files using Windows tools, which likely is not what you want. The Remote-WSL Extension in VS Code handles this compatibility for you, with other IDEs you may need to set up an X server.
Terminal-based text editors (vim, emacs, nano) are also helpful for making quick changes from right inside your console. The article, Emacs, Nano, or Vim: Choose your Terminal-Based Text Editor Wisely does a nice job explaining some differences and a bit about how to use each.
To install VS Code and the Remote-WSL Extension:
1. Download and install VS Code for Windows. VS Code is also available for Linux, but installing it on Windows with the Remote-WSL extension provides the best integrated development experience. Not to worry, you'll still be able to integrate with your Linux command line and tools using the Remote - WSL Extension.
1. Install the Remote - WSL Extension on VS Code. This allows you to use WSL as your integrated development environment and will handle compatibility and pathing for you. Learn more.
Important
If you already have VS Code installed, you need to ensure that you have the 1.35 May release or later in order to install the Remote - WSL Extension. We do not recommend using WSL in VS Code without the Remote-WSL extension as you will lose support for auto-complete, debugging, linting, etc. Fun fact: This WSL extension is installed in $HOME/.vscode-server/extensions.

##### Helpful VS Code Extensions

While VS Code comes with many features for Node.js development out of the box, there are some helpful extensions to consider installing available in the Node.js Extension Pack. Install them all or pick and choose which seem the most useful to you.
To install the Node.js extension pack:
1. Open the **Extensions** window (Ctrl+Shift+X) in VS Code. The Extensions window is now divided into three sections (because you installed the Remote-WSL extension).
\* "Local - Installed": The extensions installed for use with your Windows operating system.
\* "WSL:Ubuntu-18.04-Installed": The extensions installed for use with your Ubuntu operating system (WSL).
\* "Recommended": Extensions recommended by VS Code based on the file types in your current project.
1. In the search box at the top of the Extensions window, enter: **Node Extension Pack** (or the name of whatever extension you are looking for). The extension will be installed for either your Local or WSL instances of VS Code depending on where you have the current project opened. You can tell by selecting the remote link in the bottom-left corner of your VS Code window (in green). It will either give you the option to open or close a remote connection. Install your Node.js extensions in the "WSL:Ubuntu-18.04" environment.
A few additional extensions you may want to consider include:
\* JavaScript Debugger: Once you finish developing on the server side with Node.js, you'll need to develop and test the client side. This extension is a DAP-based JavaScript debugger. It debugs Node.js, Chrome, Edge, WebView2, VS Code extensions, and more.
\* Keymaps from other editors: These extensions can help your environment feel right at home if you're transitioning from another text editor (like Atom, Sublime, Vim, eMacs, Notepad++, etc).
\* Settings Sync: Enables you to synchronize your VS Code settings across different installations using GitHub. If you work on different machines, this helps keep your environment consistent across them. Importantly, this extension is now deprecated. For a comparable sync solution, use Visual Studio Code's built-in **Settings Sync** , which you can find by navigating to **File** > **Preferences** > **Settings Sync is On** , indicated by checkmark.

#### Set up Git (optional)

To set up Git for a Node.js project on WSL, see the article Get started using Git on Windows Subsystem for Linux in the WSL documentation.
Collaborate with us on GitHub
The source for this content can be found on GitHub, where you can also create and review issues and pull requests. For more information, see our contributor guide.
Windows developer feedback
Windows developer is an open source project. Select a link to provide feedback:
Open a documentation issue Provide product feedback

#### Feedback

Was this page helpful?
Yes No No
Need help with this topic?
Want to try using Ask Learn to clarify or guide you through this topic?
Ask Learn Ask Learn
Suggest a fix?

#### Additional resources

Training
Module
Developing in the Windows Subsystem for Linux with Visual Studio Code - Training
In this module, you learn how to use the Windows Subsystem for Linux (WSL) with Visual Studio Code (VS Code). We explore the installation process and the basics of using WSL. Additionally, we install and utilize the Visual Studio Code WSL extension. Finally, we demonstrate how to debug and run Python code in VS Code within our WSL environment.
\* Last updated on 06/11/2025

#### In this article

```
1. Install Windows Subsystem for Linux
1. Windows Terminal
1. Install nvm, node.js, and npm
1. Alternative version managers
1. Install Visual Studio Code
1. Set up Git (optional)
```

Was this page helpful?
Yes No No
Need help with this topic?
Want to try using Ask Learn to clarify or guide you through this topic?
Ask Learn Ask Learn
Suggest a fix?

#### Ask Learn

Preview
Ask Learn is an AI assistant that can answer questions, clarify concepts, and define terms using trusted Microsoft documentation.
Please sign in to use Ask Learn.
Sign in
English (United States)
Your Privacy Choices
Theme
\* Light
\* Dark
\* High contrast
\* AI Disclaimer
\* Previous Versions
\* Blog
\* Contribute
\* Privacy
\* Consumer Health Privacy
\* Terms of Use
\* Trademarks
\* © Microsoft 2026
