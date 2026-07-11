---
id_fonte: "e7d38822-62af-42e6-8d13-2d31a4f1dd3a"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "OpenAI vs Anthropic: divergent philosophies in AI Skills architecture | by Tao An | Medium"
tipo: "unknown"
url_original: "https://tao-hpu.medium.com/openai-vs-anthropic-divergent-philosophies-in-ai-skills-architecture-40a151e0f54e"
keywords: "('AI Skills architecture', 'Developer design philosophies', 'Agentic AI Foundation', 'Deterministic code execution', 'Visual verification loops')"
summary: "This technical analysis explores how OpenAI and Anthropic utilize nearly identical file structures for their AI **Skills systems** while maintaining vastly different operational philosophies. While both companies have converged on a standardized **SKILL.md format** to define agent capabilities, OpenAI prioritizes **\"programmable substrate\"** and visual verification loops to maximize developer speed and task completion. Conversely, Anthropic champions **\"human-in-the-loop\" design** and deterministic code execution, emphasizing safety, explicit permissions, and architectural reliability. Ultimately, the text illustrates an industry moving toward **agentic standardization** through collaborative foundations, even as individual providers diverge between productivity-first and safety-first governance models."
extraido_em: "2026-06-30T16:21:16Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# OpenAI vs Anthropic: divergent philosophies in AI Skills architecture | by Tao An | Medium

SitemapOpen in app
Sign in
Medium LogoWriteSearch
Sign in

### OpenAI vs Anthropic: divergent philosophies in AI Skills architecture

Tao An8 min read · Dec 16, 2025--
Press enter or click to view image in full size OpenAI vs Anthropic: divergent philosophies in AI Skills architecture (Image by Tao An, generated with Nano Banana)
OpenAI and Anthropic have converged on remarkably similar file structures for their Skills systems — both using **SKILL.md files with YAML frontmatter** — yet their underlying design philosophies reveal fundamental differences in how each company envisions AI agents operating in the real world. OpenAI’s approach prioritizes a **“programmable substrate”** optimized for developer velocity, while Anthropic emphasizes **“human-in-the-loop” design** with deterministic safeguards and explicit permission boundaries [1][2]. This analysis draws from official documentation, GitHub repositories, leaked system prompts, and developer discussions to provide a technical comparison of both frameworks.

#### File structures reveal near-identical foundations

Both companies have adopted strikingly similar directory structures, suggesting industry convergence on a de facto standard. OpenAI’s Skills system, quietly deployed in December 2025, closely mirrors Anthropic’s earlier implementation [3].
**OpenAI Skills structure** (ChatGPT Code Interpreter at /home/oai/skills ) [4]:
/home/oai/skills/
├── docs/
│ ├── skill.md
│ └── render\_docsx.py
├── pdfs/
│ └── skill.md
└── spreadsheets/
└── skill.md
**Anthropic Skills structure** (from github.com/anthropics/skills) [5]:
skill-name/
├── SKILL.md # REQUIRED: Entry point
├── scripts/ # Optional: Executable code
│ └── process.py
├── resources/ # Optional: Templates, data files
├── references/ # Optional: Documentation
└── assets/ # Optional: Brand resources
The **YAML frontmatter specification** is nearly identical between platforms. OpenAI allows **100 characters** for name and **500 characters** for description, while Anthropic permits **64 characters** for name and **1024 characters** for description [6][7]. Both systems strip newlines from metadata fields — a deliberate choice to prevent prompt injection attacks.
Both implementations use **progressive disclosure architecture** . At startup, only metadata (name, description, file path) enters the system prompt; full SKILL.md body content loads only when the skill becomes relevant [5]. Anthropic documents this explicitly as a three-level system: metadata → full SKILL.md → referenced auxiliary files.

#### OpenAI emphasizes visual verification loops

OpenAI’s extracted skills reveal a distinctive pattern: the **render-inspect loop** . Every document-processing skill mandates programmatic generation followed by visual verification through the model’s vision capabilities [4].
From OpenAI’s **PDF skill** ( /home/oai/skills/pdfs/skill.md ) [4]:
*“After each meaningful update — content additions, layout adjustments, or style changes — render the PDF to images to check layout fidelity:* *pdftoppm -png $INPUT\_PDF $OUTPUT\_PREFIX* *. Inspect every exported PNG before continuing work. If anything looks off, fix the source and re-run the render → inspect loop until the pages are clean."*
The DOCX skill follows the same pattern [4]:
*“Re-run the DOCX → PDF → PNG loop after your final changes and inspect every page at 100% zoom. Look for subtle issues like inconsistent spacing, widows/orphans, or misaligned bullet levels. Only deliver the DOCX once the latest PNG review confirms the document is visually flawless.”*
OpenAI’s quality standards are explicit and prescriptive [4]:

* “Avoid major rendering issues — no clipped text, overlapping elements, black squares, broken tables”
* “Never use the U+2011 non-breaking hyphen or other unicode dashes as they will not be rendered correctly”
* “Content should be concise, relevant, and free of boilerplate AI phrasing”
  This approach leverages **Code Interpreter’s execution environment** combined with **vision capabilities** for deterministic generation plus visual QA — a hybrid human-like verification process entirely performed by the model.

#### Anthropic’s “degrees of freedom” framework prioritizes deterministic code

Anthropic’s documentation introduces a conceptual framework absent from OpenAI’s materials: explicit guidance on when to use deterministic scripts versus LLM judgment. Their engineering blog states [5]:
*“Large language models excel at many tasks, but certain operations are better suited for traditional code execution. For example, sorting a list via token generation is far more expensive than simply running a sorting algorithm. Beyond efficiency concerns, many applications require the* *deterministic reliability that only code can provide* *.”*
The framework defines three levels of agent autonomy [7]:
**Low freedom** (specific scripts, few parameters):

## Database migration

Run exactly this script:

```
python scripts/migrate.py --verify --backup
Do not modify the command or add additional flags.
Use when: "Operations are fragile and error-prone, consistency is critical" **Medium freedom** (pseudocode with parameters):
```python
def generate_report(data, format="markdown", include_charts=True):
# Process data
# Generate output in specified format
Use when: “A preferred pattern exists, some variation is acceptable”
**High freedom**  (text-based instructions):
## Code review process
1. Analyze the code structure and organization
2. Check for potential bugs or edge cases
Use when: “Multiple approaches are valid, decisions depend on context”
Anthropic explicitly instructs skill authors to distinguish between script  **execution**  versus  **reading**  [7]: “Make clear in your instructions whether Claude should execute the script (‘Run  analyze_form.py  to extract fields') or read it as reference ('See  analyze_form.py  for the field extraction algorithm')."
#### Description writing reflects different triggering philosophies
Both systems use descriptions as  **primary trigger signals**  for skill selection, but Anthropic provides more prescriptive guidance.
**Anthropic’s third-person mandate**  (verbatim from docs.claude.com) [7]:
*“Always write in third person. The description is injected into the system prompt, and inconsistent point-of-view can cause discovery problems.*
**Good:**  ‘Processes Excel files and generates reports’
**Avoid:**  ‘I can help you process Excel files’
**Avoid:**  ‘You can use this to process Excel files’”
Anthropic also recommends  **gerund-form naming**  ( processing-pdfs ,  analyzing-spreadsheets ) and emphasizes that descriptions must handle  **skill selection from 100+ available skills** —suggesting enterprise-scale deployments where precision matching matters [7].
OpenAI’s Codex documentation is terser [6]:
---
name: your-skill-name # Required, max 100 characters
description: what it does and when to use it # Required, max 500 characters
---
The key instruction: “Description as trigger: The YAML description in SKILL.md is the primary trigger signal; rely on it to decide applicability.” Less guidance exists on writing effective descriptions [6].
#### Concrete skill examples show implementation differences
**OpenAI’s PDF processing**  emphasizes tool orchestration [4]:
## Reading PDFs
- Use `pdftoppm -png $OUTDIR/$BASENAME.pdf $OUTDIR/$BASENAME` to convert PDFs to PNGs.
- Then open the PNGs and read the images.
- pdfplumber is also installed and can be used as a complementary tool but not replacing it.
- Only do python printing as a last resort because you will miss important details with text extraction (e.g. figures, tables, diagrams).
**Anthropic’s PDF skill**  uses a modular reference architecture [5][7]:
pdf/
├── SKILL.md # Main instructions
├── forms.md # Form-filling guide (loaded as needed)
├── reference.md # API reference (loaded as needed)
└── scripts/
├── extract_form_fields.py # Deterministic extraction
├── fill_form.py
└── validate.py
Anthropic’s approach separates concerns more explicitly: SKILL.md provides high-level instructions, auxiliary markdown files offer specialized guidance loaded on-demand, and Python scripts handle operations requiring deterministic reliability.
#### System-level philosophies diverge sharply
Analysis of leaked system prompts and official documentation reveals fundamentally different governance philosophies [8][9].
**OpenAI’s productivity orientation**  (from GPT-5 system prompt analysis) [8]:
*“If the task is complex/hard/heavy… DO NOT ASK A CLARIFYING QUESTION OR ASK FOR CONFIRMATION. Instead make a best effort to respond… Partial completion is MUCH better than clarifications.”*
**Anthropic’s caution orientation**  (Claude 4’s system prompt runs  **120+ pages**  of explicit rules) [8][9]:
*“Claude never starts its response by saying a question or idea or observation was good, great, fascinating, profound, excellent, or any other positive adjective.”*
Safety evaluations from December 2025 found Claude “performed best in instruction hierarchy adherence — ensuring that safety constraints override user prompts,” while OpenAI “delivers more informative answers at the risk of higher hallucination rates” [10].
On tool security, Anthropic’s MCP (Model Context Protocol) provides  **protocol-level permission controls**  [11]: “The host has the ability to permit or deny tool invocations, enforce scopes, and require user consent.” OpenAI’s approach treats guardrails as  **optional developer-implemented checks**  rather than architectural requirements.
#### Enterprise deployment considerations differ
Press enter or click to view image in full size
A WorkOS analysis summarizes [11]: “Anthropic’s MCP shines in scenarios where an AI needs to be deeply embedded in a rich data environment — for example, an enterprise assistant that must seamlessly access a dozen internal systems securely. OpenAI’s Agents SDK excels at giving developers a clear, easy framework to build complex agent behaviors.”
#### Industry convergence signals emerging standards
Despite philosophical differences,  **December 2025 marked unprecedented collaboration**  [12][13]. OpenAI, Anthropic, and Block co-founded the  **Agentic AI Foundation**  under the Linux Foundation to standardize agent development. Anthropic is donating MCP to the foundation; OpenAI is contributing AGENTS.md instruction files.
OpenAI engineer Nick Cooper stated [12]: “We need multiple [protocols] to negotiate, communicate, and work together to deliver value for people, and that sort of openness and communication is why it’s not ever going to be one provider, one host, one company.”
The file-structure convergence — both settling on SKILL.md with YAML frontmatter — suggests the architectural basics are stabilizing [3]. The remaining differences lie in  **governance philosophy** : OpenAI optimizes for developer velocity and partial-completion pragmatism, while Anthropic prioritizes deterministic reliability, explicit permissions, and constitutional safety constraints.
#### Conclusion
Both systems represent sophisticated approaches to agent skills, but serve different visions.  **OpenAI’s Skills system**  favors a unified developer experience with tight integration, visual verification loops, and productivity-first defaults — ideal for teams building consumer applications rapidly.  **Anthropic’s Skills framework**  emphasizes deterministic code for reliable operations, model-agnostic standards for portability, and layered permission architectures — better suited for enterprise deployments where auditability and safety constraints are non-negotiable.
The most significant gap remains  **documentation asymmetry** : Anthropic publishes extensive best practices, conceptual frameworks, and explicit security guidance, while OpenAI’s Skills system launched without formal documentation and was discovered primarily through prompt extraction [3][8]. For developers choosing between platforms, Anthropic offers clearer architectural guidance; OpenAI offers tighter tooling integration.
#### References
[1] MarkTechPost. “Google vs OpenAI vs Anthropic: The Agentic AI Arms Race Breakdown.” October 2025. https://www.marktechpost.com/2025/10/25/google-vs-openai-vs-anthropic-the-agentic-ai-arms-race-breakdown/
[2] Medium. “Winning in the Autonomous AI Agents Race? Anthropic vs OpenAI.” 2025. https://rabot.medium.com/winning-in-the-autonomous-ai-agents-race-a0c03d52acad
[3] WinBuzzer. “OpenAI Adds ‘Skills’ Framework to ChatGPT and Codex CLI, Mirroring Anthropic’s Agent Standard.” December 2025. https://winbuzzer.com/2025/12/13/openai-adds-skills-framework-to-chatgpt-and-codex-cli-mirroring-anthropics-agent-standard-xcxwbn/
[4] GitHub. “oai-skills repository — Extracted OpenAI Skills.” https://github.com/eliasjudin/oai-skills/
[5] Anthropic. “Equipping agents for the real world with Agent Skills.” Engineering Blog. https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
[6] GitHub. “OpenAI Codex CLI — Skills Documentation.” https://github.com/openai/codex/blob/main/docs/skills.md
[7] Claude Docs. “Skill authoring best practices.” https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices
[8] Forte Labs. “A Guide to the Claude 4 and ChatGPT 5 System Prompts.” 2025. https://fortelabs.com/blog/a-guide-to-the-claude-4-and-chatgpt-5-system-prompts/
[9] Fello AI. “GPT vs Claude: The Secret Scripts and Censorship Behind Every AI Reply.” 2025. https://felloai.com/gpt-vs-claude-the-secret-scripts-and-censorship-behind-every-ai-reply/
[10] Technology Magazine. “What Can We Learn from OpenAI & Anthropic’s AI Safety Test?” December 2025. https://technologymagazine.com/news/openai-vs-anthropic-the-results-of-the-ai-safety-test
[11] Simon Willison. “A quote from OpenAI Codex CLI.” December 2025. https://simonwillison.net/2025/Dec/13/openai-codex-cli/
[12] TechCrunch. “OpenAI, Anthropic, and Block join new Linux Foundation effort to standardize the AI agent era.” December 2025. https://techcrunch.com/2025/12/09/openai-anthropic-and-block-join-new-linux-foundation-effort-to-standardize-the-ai-agent-era/
[13] Windows Central. “Major AI rivals just co-founded a foundation for open source agent development.” December 2025. https://www.windowscentral.com/artificial-intelligence/open-source-agent-development-openai-anthropic-block
AI AgentAnthropic ClaudeOpenAIAgentic AiSkills
#### Written by  Tao An
111 followers·41 followingTao An is currently pursuing a Master of Science in Artificial Intelligence at Hawaii Pacific University. https://tao-hpu.github.io/
#### Responses ( 1 )
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
```
