---
id_fonte: "aea4a015-e7dd-4614-ae19-2296b7a21606"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Installing Node.js with nvm to Linux & macOS & WSL - GitHub Gist"
tipo: "unknown"
url_original: "https://gist.github.com/d2s/372b5943bce17b964a79"
keywords: "('Node.js installation', 'nvm version management', 'WSL environment setup', 'Package migration guide', 'Troubleshooting shell configuration')"
summary: "This guide provides a comprehensive walkthrough for setting up a flexible Node.js development environment on **Linux, macOS, and the Windows Subsystem for Linux (WSL)**. By utilizing the **Node Version Manager (nvm)**, developers can seamlessly install and **toggle between multiple versions** of Node.js, ensuring compatibility across various software projects. The text covers essential operations, including executing installation scripts via command-line tools, **managing Long Term Support (LTS) releases**, and migrating global packages between versions. Beyond the technical steps, the source includes a collaborative troubleshooting section where community members discuss **resolving environment-specific errors** and maintaining shell configuration files. Overall, the resource serves as both a practical tutorial and a **collaborative troubleshooting forum** for maintaining a modern JavaScript runtime environment."
extraido_em: "2026-06-30T16:20:21Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Installing Node.js with nvm to Linux & macOS & WSL - GitHub Gist

Installing Node.js to Linux & macOS & WSL with nvm · GitHub
Skip to content
Search Gists
Search Gists
All gists Back to GitHub Sign in Sign up
Sign in Sign up
You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert
Instantly share code, notes, and snippets.

### d2s/ **installing-node-with-nvm.md**

Last active 2 months ago
Show Gist options
\* Download ZIP
\* Star 383 ( 383) You must be signed in to star a gist
\* Fork 98 ( 98) You must be signed in to fork a gist
\* Embed

### Select an option

```
*  Embed Embed this gist in your website.
    *  Share Copy sharable link for this gist.
    *  Clone via HTTPS Clone using the web URL.
```

#### No results found

Learn more about clone URLs Clone this repository at
\* Save d2s/372b5943bce17b964a79 to your computer and use it in GitHub Desktop.
Code Revisions 201 Stars 379 Forks 98
Embed

### Select an option

```
*  Embed Embed this gist in your website.
*  Share Copy sharable link for this gist.
*  Clone via HTTPS Clone using the web URL.
```

#### No results found

Learn more about clone URLs
Clone this repository at
Save d2s/372b5943bce17b964a79 to your computer and use it in GitHub Desktop.
Download ZIP
Installing Node.js to Linux & macOS & WSL with nvm
Raw
installing-node-with-nvm.md

### Installing Node.js with nvm to Linux & macOS & WSL

A quick guide on how to setup Node.js development environment.

#### Install nvm for managing Node.js versions

nvm allows installing several versions of Node.js to the same system. Sometimes applications require a certain versions of Node.js to work. Having the flexibility of using specific versions can help.
1. Open new *Terminal* window.
1. Run nvm installer. (If you already had it, remember to update to more recent versions.)
\* … with *either* curl *or* wget , depending on what your computer has available.
\* curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh> | bash
\* wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh> | bash
\* The script clones the nvm repository to ~/.nvm and adds the source line to your profile ( ~/.bash\_profile , ~/.zshrc, ~/.profile, or ~/.bashrc ). (You can add the source loading line manually, if the automated install tool does not add it for you.)

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

```
*  Another option: when you have consistent directory location between systems, following example Bash/Zsh configuration allows to load nvm when the directory exists. This allows more consistent sharing of your shell configuration between systems, improving reliability of rest of your configuration even when nvm does not exist on a specific system.
```

```
if [ -d "$HOME/.nvm" ]; then
  # export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  export NVM_DIR="$HOME/.nvm"

  # This loads nvm
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  # This loads nvm bash_completion
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi
```

```
1. If everything went well, you should now either open a new Terminal window/tab, or reload the shell configuration by running:
*  source ~/.bashrc
1. Verify installation
*  To check if nvm command got installed, run:
    *  command -v nvm
```

#### Install Node.js with nvm

```
1. List installed Node.js versions with:
*  nvm ls
1.  **Install latest LTS Version of Node.js**  (for production quality applications)
*  nvm install v22.12.0
1. Install latest Node.js Current release (for testing new feature improvements)
*  nvm install v23.4.0
1. If you want to change the default Node version later, you can run a command to adjust it.
*  nvm alias default v22.12.0 changelog (for  *production quality*  applications)
    *  nvm alias default v23.4.0 changelog (if you use Node.js features from the  *Current*  release)
```

You can select Node.js version by running nvm use v20.11.1 (or another version number). Another alternative: create a small Bash shell script to enable the right environment variables for your project.
Read the Node.js Long Term Support (LTS) schedule to have more understanding of their release roadmap. List of all previous releases is also useful for finding details about Node.js release history.
npm package repository has a lot of packages to discover. Have a good time with the freshly installed tools.

#### Migrating packages from a previous Node.js version

If you already have existing Node.js version via nvm , you can migrate older packages from the installed Node.js versions.
\* Open new Terminal window (to make sure you have latest Node.js version active in your command line environment).
\* Before running next commands, remember to switch to the right version of Node with nvm use command. For example:
\* nvm use v22.12.0
\* nvm use v23.4.0
\* Linking global packages from previous version:
\* nvm reinstall-packages v20.11.1
\* nvm reinstall-packages v18.16.1

##### Deleting old Node.js versions

```
*  Check installed Node.js versions with:
    *  nvm ls
*  Delete an older version (if you don't use it in some of your projects):
    *  nvm uninstall v20.11.1
    *  nvm uninstall v18.16.1
```

##### Updating outdated packages

*Warning:* Make sure you have latest nvm version installed, just in case. Update instructions of it in the beginning of this article. nvm v0.39.2 version of fixes potential problems that might cause older node environments to break if accidentally installing npm v9 to those.

###### List of globally installed top level packages

```
npm ls -g --depth=0.
```

###### List outdated global packages

```
npm outdated -g --depth=0.
```

###### Updating all globally installed npm packages

*Warning:* **This might be too risky approach.** Instead, it is better to update packages individually, as that avoids the risk of accidentally updating npm package to incompatible versions. npm v9 installation to older incompatible Node.js environments is known to cause problems (potentially breaking down the development environment), so it's better be safe than sorry.

```
npm update -g
```

###### CLI aliases for Bash & Zsh environments

Example configuration for your Bash & Zsh command line environments.

```
# -----------------------------------------------------------
# npm helpers
# -----------------------------------------------------------

# List what (top level) packages are installed globally
alias list-installed-npm-packages="npm ls -g --depth=0."

# List what globally installed packages are outdated
alias list-outdated-npm-packages="npm outdated -g --depth=0."

# Update outdated globally installed npm packages
alias update-npm-packages="npm update -g"
```

###### Fixing old package versions

If you have older npm packages with compiled native extensions, recompiling native extensions can improve compatibility with the new Node.js version. Go to your project's root directory, and run npm rebuild command.

```
cd PROJECT_NAME
npm rebuild
```

#### Notes about this documentation

@d2s tested older versions of these install instructions with:
\* Debian 11.2
\* Debian 10
\* Ubuntu on WSL2 (Windows Subsystem for Linux)
\* Ubuntu 20.04 LTS
\* Ubuntu 22.04 LTS

#### Contributions

If you have improvement suggestions to make these instructions simpler & better, post a comment under the original Gist by @d2s with your documentation improvement suggestions. If you are reading a forked version of the document, check the original Gist for a more recent instructions.
Load earlier comments...
Copy link
Copy Markdown
Author

##### **d2s** commented on May 2, 2018

Good to see that these are useful to people. 👍
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **Sandhya-Bairi** commented on Jul 5, 2018

Thanks!!
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **0xhmn** commented on Aug 10, 2018

Adding the nvm loading scrip to my .zshrc gives me this error:

```
~ λ source ~/.zshrc
nvm is not compatible with the npm config "prefix" option: currently set to "/local/home/username/.nvm/versions/node/v4.4.5"
Run `nvm use --delete-prefix v4.4.5 --silent` to unset it.
```

Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **jonkeller** commented on Nov 1, 2018 • edited Loading

##### Uh oh!

There was an error while loading. Please reload this page.
Yarn doesn't seem to like the current LTS version:

```
yarn install v1.12.1
$ node build-system/check-package-manager.js
Detected node version v10.13.0 (latest LTS).
Detected gulp version 3.9.1.
Detected yarn version 1.12.1 (stable). Installing packages...
[1/5]   Validating package.json...
error amp-html@0.1.0: The engine "node" is incompatible with this module. Expected version "^8.0.0". Got "10.13.0"
error Found incompatible module
```

Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Nov 16, 2018

@jonkeller,
Yarn doesn't seem to like the current LTS version
Not sure about Yarn, since I haven't been using it in a while.
You might want to install the latest Yarn release from GitHub.
<https://github.com/yarnpkg/yarn/releases>
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **begueradj** commented on Jan 27, 2019

Thank you for sharing.
Nowadays the default alias for the Node.js installed version is automatically created after the Node.js specific version is installed:

```
Downloading and installing node v11.8.0...
Downloading https://nodejs.org/dist/v11.8.0/node-v11.8.0-linux-x64.tar.xz...
######################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v11.8.0 (npm v6.5.0)
Creating default alias: default -> v11.8.0
```

Billal Begueradj
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **hawk8** commented on Jul 15, 2019

#### I tried to install v.10.16.0, and it looks like below:

$ nvm install v10.16.0
Downloading and installing node v10.16.0...
Downloading <https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz>...
##################################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
N/A: version "v10.16.0 -> N/A" is not yet installed.

#### You need to run "nvm install v10.16.0" to install it before using it.

My first question is - why did it not install it in the first place?
If I try to do as they say - run "nvm install v10.16.0" to install it again, then I get error messages such as below:
mv: cannot move '/home/mydomain/.nvm/.cache/bin/node-v10.16.0-linux-x64/files/bin' to '/home/mydomain/.nvm/versions/node/v10.16.0/bin': **Directory not empty**
It was a clean install (nothing there before).
Any advice?
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **najarvg** commented on Aug 10, 2019

This is a fantastic reference, thanks! Worth bookmarking
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Aug 10, 2019

This is a fantastic reference, thanks! Worth bookmarking
Thanks for the feedback. :)
Mainly been documenting the details as a reminder for myself,
and always happy to hear that it has been useful for other people too.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Feb 1, 2020

Rewrote a lot of the instructions to be more inclusive and understandable.

#### Git commit

##### fix: clarify text structure

```
*  Clarify text structure
    *  Reduce unclear words
    *  Reduce duplicate words
*  Remove mentions about "easy" steps
*  Remove Ubuntu version names because those can be seen as offensive
*  Check for potential issues with
    *  vale
    *  alex
```

###### More details:

```
*  Vale. Software documentation.
    *  "Vale is a syntax-aware linter for prose built with speed and extensibility in mind."
*  alex. Software documentation.
    *  "catch insensitive, inconsiderate writing"
*  Stransky, Carolyn. How to remove condescending language from documentation. Blog post. DEV Community. 2019-11-22.
```

Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **Ts686** commented on Dec 20, 2020

run the wget , not find the nvm command , Why ?
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **stunnitysoft** commented on Apr 7, 2021

running nvm install --lts gives me

```
Installing latest LTS version.
Downloading and installing node v14.16.1...
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz...
###################                                                                                                17.3%curl: (56) OpenSSL SSL_read: error:1408F119:SSL routines:ssl3_get_record:decryption failed or bad record mac, errno 0   

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz failed, trying source.
grep: /home/liberi/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1-linux-x64.tar.xz: No such file or directory
Provided file to checksum does not exist.
Binary download failed, trying source.
Detected that you have 4 CPU core(s)
Running with 3 threads to speed up the build
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz...
                                                                                                                    0.1%curl: (56) OpenSSL SSL_read: error:1408F119:SSL routines:ssl3_get_record:decryption failed or bad record mac, errno 0   

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz failed, trying source.
grep: /home/liberi/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: No such file or directory
Provided file to checksum does not exist.
```

means node version 14.16.1 LTS cant be installed
using windows 10 pro , ubuntu wsl
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Apr 7, 2021

@stunnitysoft I think you have outdated version of OpenSSL that is causing the errors.
Anyway, I did update the nvm usage instructions with the latest nvm version v0.38.0 that might have some fixes for Windows WSL environment too.
running nvm install --lts gives me

```
17.3%curl: (56) OpenSSL SSL_read: error:1408F119:SSL routines:ssl3_get_record:decryption failed or bad record mac, errno 0   
0.1%curl: (56) OpenSSL SSL_read: error:1408F119:SSL routines:ssl3_get_record:decryption failed or bad record mac, errno 0
```

It might also be that you have broken curl version, so try checking with apt update if there are Ubuntu package updates available.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **inidaname** commented on May 10, 2021

Thank you this, I tried nvm install --lts
and I got this error

```
Installing latest LTS version.
Downloading and installing node v14.16.1...
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1
Warning: -linux-x64.tar.xz: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1-linux-x64.tar.xz: No such file or directory
Provided file to checksum does not exist.
Binary download failed, trying source.
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: 
Warning: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: No such file or directory
Provided file to checksum does not exist.
```

Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **matik4** commented on May 18, 2021

Thank you this, I tried nvm install --lts
and I got this error

```
Installing latest LTS version.
Downloading and installing node v14.16.1...
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1
Warning: -linux-x64.tar.xz: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1-linux-x64.tar.xz: No such file or directory
Provided file to checksum does not exist.
Binary download failed, trying source.
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: 
Warning: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: No such file or directory
Provided file to checksum does not exist.
```

looks like a permission issue, do you have root privileges when executing the command?
try executing sudo -i first and then try again
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **inidaname** commented on May 20, 2021

Thank you this, I tried nvm install --lts
and I got this error

```
Installing latest LTS version.
Downloading and installing node v14.16.1...
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1
Warning: -linux-x64.tar.xz: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/bin/node-v14.16.1-linux-x64/node-v14.16.1-linux-x64.tar.xz: No such file or directory
Provided file to checksum does not exist.
Binary download failed, trying source.
Downloading https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz...
Warning: Failed to create the file                                             
Warning: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: 
Warning: Permission denied
curl: (23) Failure writing output to destination

Binary download from https://nodejs.org/dist/v14.16.1/node-v14.16.1.tar.xz failed, trying source.
grep: /home/hassansani/.nvm/.cache/src/node-v14.16.1/node-v14.16.1.tar.xz: No such file or directory
Provided file to checksum does not exist.
```

looks like a permission issue, do you have root privileges when executing the command?
try executing sudo -i first and then try again
Found a possible solution, it was a curl issue. Refer to issue here nvm-sh/nvm#2504 for more information
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **tohagan** commented on Aug 20, 2021 • edited Loading

##### Uh oh!

There was an error while loading. Please reload this page.
If you have node / nvm installed in Windows and then run WSL ... you may end up running Node or NVM from Windows.
To fix this ... remove Windows PATH folders from your WSL environment by ...
\* Confirming that you have Windows paths in WSL $ echo $PATH | tr : '\n'

##### For Windows build LOWER than 17713

```
*  Open Regedit at HKCU\Software\Microsoft\Windows\CurrentVersion\Lxss where you'll see a GUI key for each WSL Linux distro
*  Update <distro>/Flags value from 0x07 => 0x05 (WSL1) - check the initial value carefully
*  Update <distro>/Flags value from 0x15 => 0x13 (WSL2) - check the initial value carefully
*  Restart the lxssmanager service
```

##### For Windows build HIGHER than 17713

```
*  Inside WSL ... create a /etc/wsl.conf file containing ...
```

```
[interop]
enabled=false # enable launch of Windows binaries; default is true
appendWindowsPath=false # append Windows path to $PATH variable; default is true
```

```
*  Restart WSL and confirm that your PATH is now free of Windows paths: $ echo $PATH | tr : '\n'
```

Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Oct 6, 2021

Thanks for the tips, @tohagan. 👍
I haven't been using WSL in a long while, so part of the instructions are probably outdated related to that environment.
If you have node / nvm installed in Windows and then run WSL ... you may end up running Node or NVM from Windows.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **infinite-dev22** commented on Mar 28, 2022 • edited Loading

##### Uh oh!

There was an error while loading. Please reload this page.
Downloading <https://nodejs.org/dist/v16.14.2/node-v16.14.2.tar.xz>... ############################################################################ 100.0% Computing checksum with sha256sum Checksums matched! $>./configure --prefix=/home/mwigojm/.nvm/versions/node/v16.14.2 < Node.js configure: Found Python 3.10.3... Traceback (most recent call last): File "/home/mwigojm/.nvm/.cache/src/node-v16.14.2/files/./configure", line 27, in

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **suvel-the-dev** commented on May 24, 2022

The article was very helpful, thank you.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **JackGowan** commented on Jun 9, 2022

Thank you - these notes were extremely helpful.
Note: I also had an issue with curl
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **ssbarnea** commented on Jun 18, 2022

I am pretty sure that nvm install script does not automatically change shell rc files, you need to add the required lines yourself.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **ComicWriter** commented on Nov 7, 2022

Thank you very much for your notes. I'm on MacOS High Sierra and followed the nvm install steps...and it does show it's been installed:
nvm --version
0.39.2
nvm ls
v18.12.1
but when I test for nvm and npm versions using just node -v and npm -v, I get this error"
dyld: Symbol not found: \_\_\_\_chkstk\_darwin
Referenced from: /Users/user/.nvm/versions/node/v18.12.1/bin/node (which was built for Mac OS X 10.15)
Expected in: /usr/lib/libSystem.B.dylib
I've also updated git, bash...anything I can think of but to no avail.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Nov 8, 2022

@ComicWriter Error is caused by the outdated operating system. You have macOS 10.13 version, but the minimum required version of Node.js is macOS 10.15 (at least for that installation method). Most developers stopped supporting ancient macOS versions after Apple stopped releasing security updates for those old versions.
Looking at the Wikipedia article about macOS High Sierra, it says that the last security update was 23 months ago.
"10.13.6 Security Update 2020-006 (17G14042) (November 12, 2020; 23 months ago)"
If you can update to the latest supported macOS version on your old laptop, it would likely fix the error. At least on my decade old MBP laptop it was running nicely with 10.15.x version previously, but haven't tested recently.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **ComicWriter** commented on Nov 8, 2022

@d2s thanks for the reply....so close. I'm actually on an early 2011 macbook pro that's been upgraded as far as it can go. i saw that there's a patch to run an unsupported catalina but, of course, i've got the gpu installed that won't work with the patch....arghh.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **favna** commented on Nov 9, 2022 • edited Loading

##### Uh oh!

There was an error while loading. Please reload this page.
@ComicWriter I should also note that there is a (faster) alternatives to nvm , called Volta: <https://volta.sh>
Other than that you can also just get Node through brew, or with the NodeJS installer for Mac from <https://nodejs.org/en/download/releases/>. (linking to releases so you can get the last supported version for your OS). You really don't absolutely *need* to use nvm unless you have a specific need for quickly switching Node versions.
That all said, it won't solve the problem of Node itself not supporting your old OS of course.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown
Author

##### **d2s** commented on Nov 9, 2022

@favna @ComicWriter Homebrew doesn't work on that old macOS, because the minimum supported version is macOS Big Sur (11) (or higher) (according to the official documentation: <https://docs.brew.sh/Installation> section).
Better option is to use web-based services like CodeSandbox or other similar services, so you don't have to install anything. It's likely one of the only options (besides of running Node.js on some server etc.).
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **ComicWriter** commented on Nov 9, 2022

@favna @d2s Thanks for the replies. I'm in the middle of taking a course to learn the back end, with installing node.js as a first step. Instead, I'll practice my coding until I can get a computer I can work with. Thanks for the sandbox suggestion: it will definitely help :)
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **rikumo** commented on Apr 9, 2023

Thank you for putting this together. Works for me.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Copy link
Copy Markdown

##### **ArslanYM** commented on Jul 27, 2023

Works for me, You might run into this while installing nvm too. The given solution works.
Sorry, something went wrong.

##### Uh oh!

There was an error while loading. Please reload this page.
Sign up for free **to join this conversation on GitHub** . Already have an account? Sign in to comment

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
