---
id_fonte: "fd2c6608-484f-46c5-aefa-6a710d8fdd2f"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Homebrew on Linux"
tipo: "unknown"
url_original: "https://docs.brew.sh/Homebrew-on-Linux"
keywords: "('Homebrew on Linux', 'Package manager installation', 'Binary bottles', 'Default prefix requirements', 'Linux system compatibility')"
summary: "The provided documentation outlines how the **Homebrew package manager** functions as a cross-platform solution for Linux and Windows Subsystem for Linux users. Its primary purpose is to allow for the **installation of up-to-date software** that may be missing from older host distributions, utilizing a system that remains independent of most host libraries. A central theme is the importance of using the **default installation path**, which enables the use of **precompiled binary packages** to ensure efficiency and stability. Ultimately, the text serves as a technical guide that balances **installation requirements** with the benefit of maintaining a consistent environment across different operating systems."
extraido_em: "2026-06-30T16:20:03Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Homebrew on Linux

Homebrew on Linux — Homebrew Documentation

### Homebrew Documentation

Search K

### Homebrew on Linux

The Homebrew package manager may be used on Linux and Windows Subsystem for Linux (WSL) 2. Homebrew was formerly referred to as Linuxbrew when running on Linux or WSL. Homebrew does not use any libraries provided by your host system, except *glibc* and *gcc* if they are new enough. Homebrew can install its own current versions of *glibc* and *gcc* for older distributions of Linux.
Features, installation instructions and requirements are described below. Terminology (e.g. the difference between a Cellar, Tap, Cask and so forth) is explained in the documentation.

#### Features

```
*  Install software not packaged by your host distribution
*  Install up-to-date versions of software when your host distribution is old
*  Use the same package manager to manage your macOS, Linux, and Windows systems
```

#### Install

Instructions for the best, supported install of Homebrew on Linux are on the homepage.
The installation script installs Homebrew to /home/linuxbrew/.linuxbrew using *sudo* . Homebrew does not use *sudo* after installation. Using /home/linuxbrew/.linuxbrew allows the use of most binary packages (bottles) which will not work when installing in e.g. your personal home directory.
Technically, you can install Homebrew wherever you want. However, you shouldn't install outside the default, supported, best prefix. Many things will need to be built from source outside the default prefix. Building from source is slow, energy-inefficient, buggy and unsupported. The main reason Homebrew just works is **because** we use bottles (binary packages) and most of these require using the default prefix. If you decide to use another prefix: don't open any issues, even if you think they are unrelated to your prefix choice. They will be closed without response.
The prefix /home/linuxbrew/.linuxbrew was chosen so that users without admin access can ask an admin to create a linuxbrew role account and still benefit from precompiled binaries. If you do not have admin privileges, consider asking your admin staff to create a linuxbrew role account for you with home directory set to /home/linuxbrew .
Follow the *Next steps* instructions to add Homebrew to your PATH and to your bash shell rcfile, either ~/.bashrc for bash or ~/.zshrc for zsh .

```
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bashrc
```

You're done! Try installing a package:

```
brew install hello
```

If you're using an older distribution of Linux, installing your first package will also install a recent version of *glibc* and *gcc* . Use brew doctor to troubleshoot common issues.
[!NOTE] Please note that unlike macOS, Homebrew does not use a sandbox when building on Linux, so formulae may install outside the Homebrew prefix.

#### Requirements

See Support Tiers for the full list of Linux requirements.
To install build tools, paste at a terminal prompt:
\* **Debian or Ubuntu**

```
sudo apt-get install build-essential procps curl file git
```

```
*   **Fedora**
```

```
sudo dnf group install development-tools
sudo dnf install procps-ng curl file
```

```
*   **CentOS Stream or RHEL**
```

```
sudo dnf group install 'Development Tools'
sudo dnf install procps-ng curl file
```

```
*   **Arch Linux**
```

```
sudo pacman -S base-devel procps-ng curl file git
```

##### ARM32 (Tier 3 Support)

Homebrew can run on 32-bit ARM systems (e.g. Raspberry Pi and others), but as they lack bottles (binary packages) they are a Tier 3 supported platform.
You may need to install your own Ruby using your system package manager, a PPA, or rbenv/ruby-build as we don't distribute a Homebrew Portable Ruby for ARM32.

##### 32-bit x86 (Unsupported)

Homebrew does not run at all on 32-bit x86 platforms.

##### Windows Subsystem for Linux 1 (Tier 3 Support)

Due to known issues with WSL 1, you may experience issues running various executables installed by Homebrew. We recommend you switch to WSL 2 instead.

#### Homebrew on Linux Community

```
*  @HomebrewOnLinux on Twitter
*  Homebrew/discussions (forum)
```
