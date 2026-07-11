---
id_fonte: "949aeaef-9008-4f8e-b43e-2baf3488d5cb"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "CLI reference - Claude Code Docs"
tipo: "unknown"
url_original: "https://code.claude.com/docs/en/cli-reference"
keywords: "('CLI reference', 'CLI commands', 'CLI flags', 'System prompt flags', 'Session management')"
summary: "This documentation serves as a comprehensive **technical reference for the Claude Code command-line interface**, detailing the specific syntax required to interact with the AI assistant through a terminal. It outlines a structured ecosystem of **CLI commands and flags** that allow developers to initiate sessions, manage authentication, and resume previous conversations using unique session IDs. Beyond basic interaction, the guide explains advanced features for **environment customization**, such as modifying system prompts, integrating Model Context Protocol (MCP) servers, and controlling **permission levels** for automated tool execution. Ultimately, the text functions as a functional blueprint for users to **programmatically or interactively integrate Claude** into their local development workflows and file systems."
extraido_em: "2026-06-30T16:18:37Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# CLI reference - Claude Code Docs

CLI reference - Claude Code Docs
Skip to main content
Claude Code Docs home page
English
Search...
Ctrl K Ask AI
\* Claude Developer Platform
\* Claude Code on the Web
\* Claude Code on the Web
Search...
Navigation
Reference
CLI reference
Getting started
Build with Claude Code
Deployment
Administration
Configuration
Reference
Resources

###### Reference

```
*  CLI reference
*  Built-in commands
*  Environment variables
*  Tools reference
*  Interactive mode
*  Checkpointing
*  Hooks reference
*  Plugins reference
*  Channels reference
```

On this page
\* CLI commands
\* CLI flags
\* System prompt flags
\* See also
Reference

### CLI reference

Copy page
Complete reference for Claude Code command-line interface, including commands and flags.
Copy page

#### CLI commands

You can start sessions, pipe content, resume conversations, and manage updates with these commands:
| Command | Description | Example |
| ------ | ------ | ------ |
| claude | Start interactive session | claude |
| claude "query" | Start interactive session with initial prompt | claude "explain this project" |
| claude -p "query" | Query via SDK, then exit | claude -p "explain this function" |
| cat file | claude -p "query" | Process piped content | cat logs.txt | claude -p "explain" |
| claude -c | Continue most recent conversation in current directory | claude -c |
| claude -c -p "query" | Continue via SDK | claude -c -p "Check for type errors" |
| claude -r "

#### CLI flags

Customize Claude Code's behavior with these command-line flags. claude --help does not list every flag, so a flag's absence from --help does not mean it is unavailable.
| Flag | Description | Example |
| ------ | ------ | ------ |
| --add-dir | Add additional working directories for Claude to read and edit files. Grants file access; most .claude/ configuration is not discovered from these directories. Validates each path exists as a directory | claude --add-dir ../apps ../lib |
| --agent | Specify an agent for the current session (overrides the agent setting) | claude --agent my-custom-agent |
| --agents | Define custom subagents dynamically via JSON. Uses the same field names as subagent frontmatter, plus a prompt field for the agent's instructions | claude --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}' |
| --allow-dangerously-skip-permissions | Add bypassPermissions to the Shift+Tab mode cycle without starting in it. Lets you begin in a different mode like plan and switch to bypassPermissions later. See permission modes | claude --permission-mode plan --allow-dangerously-skip-permissions |
| --allowedTools | Tools that execute without prompting for permission. See permission rule syntax for pattern matching. To restrict which tools are available, use --tools instead | "Bash(git log \*)" "Bash(git diff \*)" "Read" |
| --append-system-prompt | Append custom text to the end of the default system prompt | claude --append-system-prompt "Always use TypeScript" |
| --append-system-prompt-file | Load additional system prompt text from a file and append to the default prompt | claude --append-system-prompt-file ./extra-rules.txt |
| --bare | Minimal mode: skip auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md so scripted calls start faster. Claude has access to Bash, file read, and file edit tools. Sets CLAUDE\_CODE\_SIMPLE . See bare mode | claude --bare -p "query" |
| --betas | Beta headers to include in API requests (API key users only) | claude --betas interleaved-thinking |
| --channels | (Research preview) MCP servers whose channel notifications Claude should listen for in this session. Space-separated list of plugin:

##### System prompt flags

Claude Code provides four flags for customizing the system prompt. All four work in both interactive and non-interactive modes.
| Flag | Behavior | Example |
| ------ | ------ | ------ |
| --system-prompt | Replaces the entire default prompt | claude --system-prompt "You are a Python expert" |
| --system-prompt-file | Replaces with file contents | claude --system-prompt-file ./prompts/review.txt |
| --append-system-prompt | Appends to the default prompt | claude --append-system-prompt "Always use TypeScript" |
| --append-system-prompt-file | Appends file contents to the default prompt | claude --append-system-prompt-file ./style-rules.txt |

#### See also

```
*  Chrome extension - Browser automation and web testing
*  Interactive mode - Shortcuts, input modes, and interactive features
*  Quickstart guide - Getting started with Claude Code
*  Common workflows - Advanced workflows and patterns
*  Settings - Configuration options
*  Agent SDK documentation - Programmatic usage and integrations
```

Was this page helpful?
Yes No
Built-in commands
Ctrl+I
Claude Code Docs home page
x linkedin
Company
Anthropic Careers Economic Futures Research News Trust center Transparency
Help and security
Availability Status Support center
Learn
Courses MCP connectors Customer stories Engineering blog Events Powered by Claude Service partners Startups program
Terms and policies
Privacy choices Privacy policy Disclosure policy Usage policy Commercial terms Consumer terms
x
Assistant
Responses are generated using AI and may contain mistakes.
