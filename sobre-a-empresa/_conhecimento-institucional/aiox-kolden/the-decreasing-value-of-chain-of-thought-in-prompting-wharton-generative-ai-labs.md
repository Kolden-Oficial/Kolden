---
id_fonte: "39675a6f-0b96-4f19-95d7-9a8ff6a372d1"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "The Decreasing Value of Chain of Thought in Prompting - Wharton Generative AI Labs"
tipo: "unknown"
url_original: "https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/"
keywords: "('Chain-of-Thought prompting', 'Model performance variation', 'Reasoning vs non-reasoning', 'Diminishing accuracy returns', 'Increased response time')"
summary: "This technical report from the Wharton Generative AI Labs examines the **diminishing returns of Chain-of-Thought (CoT) prompting**, a technique that asks AI to solve problems step by step. While older models benefitted significantly from this approach, the researchers found that **modern reasoning models gain only marginal improvements** that rarely justify the substantial increases in processing time and token costs. For non-reasoning models, the method can boost average performance but often introduces **unreliable variability**, sometimes causing errors on simpler tasks that a direct answer would have avoided. Ultimately, the study concludes that CoT is **no longer a universal best practice**, urging users to weigh the trade-offs between accuracy, consistency, and speed based on their specific model and goals."
extraido_em: "2026-06-30T16:22:12Z"
extraido_por: "notebooklm-py-0.7.3"
---

# The Decreasing Value of Chain of Thought in Prompting - Wharton Generative AI Labs

Technical Report: The Decreasing Value of Chain of Thought in Prompting - Wharton Generative AI Labs
Skip to content Skip to main menu
\* Faculty
\* Youth Program
\* Undergrad
\* Jacobs MSQF
\* MBA
\* EMBA
\* PhD
\* Exec Ed
\* Wharton Online
Search Wharton Mobile menu toggle
Wharton Generative AI Labs
Menu
\* Research & Insights
\* Prompt Library
\* Primer
\* Pincus AI Lab
\* The Studio
\* About Us
\* Wharton AI & Analytics Initiative
Technical Report

### The Decreasing Value of Chain of Thought in Prompting

June 8, 2025 • Lennart Meincke, Ethan Mollick, Lilach Mollick, Dan Shapiro
Modern AI models show diminishing returns from Chain-of-Thought prompting, with gains rarely worth the time cost.
This report investigates Chain-of-Thought (CoT) prompting, which encourages LLMs to 'think step by step.' We tested this common prompting approach and found that its effectiveness varies significantly by model type and task: non-reasoning models show modest average improvements but increased variability in answers, while reasoning models gain only marginal benefits despite substantial time costs (20-80% increase). These findings challenge the assumption that CoT is universally beneficial.
Download full report
Cite as:
Meincke, Lennart and Mollick, Ethan R. and Mollick, Lilach and Shapiro, Dan, Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting (June 08, 2025). Available at SSRN: <https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5285532>

#### Benchmarking Standards

Perceived performance is critically affected by the benchmarking approach, as different correctness thresholds significantly transform assessment outcomes. For this study, each question was tested 25 times per condition, revealing inconsistencies that traditional one-time testing methods often mask.
The research utilized multiple metrics to provide a comprehensive view of performance:
Complete accuracy
0%
Zero tolerance for errors
High accuracy
0%
Human-level performance
Majority correct
0%
Simple majority wins

#### What is Chain-of-Thought Prompting?

Chain-of-Thought prompting instructs models to “think step by step” before answering. Introduced by Wei et al. (2022), it mirrors human problem-solving by breaking down complex tasks. While often considered a best practice, this research shows its value varies considerably depending on the specific model and use case.

#### Research Methodology

The study used the GPQA Diamond dataset of 198 PhD-level multiple-choice questions across biology, physics, and chemistry. The researchers tested:

###### Models:

```
*   **Non-reasoning:**  Sonnet 3.5, Gemini 2.0 Flash, GPT-4o-mini, GPT-4o, Gemini Pro 1.5
*   **Reasoning:**  o3-mini, o4-mini, Flash 2.5
```

###### Prompt conditions:

Answer directly prompt (“Direct")
"Answer directly without any explanation or thinking. Just provide the answer."
We instruct the LLM to answer without generating additional reasoning tokens.
Think step by step (“Step by step”)
"Think step by step."
In this variation, we provide the LLM with a simple CoT prompt that instructs it to “think” step by step before providing an answer. While this is a simple version of CoT, in our tests, different CoT prompt variants had negligible effects.
No prompt (“Default”)
We provide no specific suffix to the question and also remove the formatting constraint (“Format your response as follows: 'The correct answer is (insert answer here)'”), allowing the model to choose how to best reply to the question. In most cases, this produces a short CoT-like thinking output before answering the question.
Each question underwent 25 trials per condition, with performance measured using multiple metrics including 100% correct (perfect accuracy), 90% correct, 51% correct (majority), and average rating.

#### Findings for Non-Reasoning Models

CoT prompting generally improved average performance across non-reasoning models:
\* **Strongest improvements:** Gemini Flash 2.0 (13.5%) and Sonnet 3.5 (11.7%)
\* **Smallest gain:** GPT-4o-mini (4.4%, not statistically significant)
However, perfect accuracy (100% correct) showed mixed results:
\* Sonnet 3.5 improved by 10.1%
\* GPT-4o showed no significant change
\* Other models declined significantly, particularly Gemini Pro 1.5 (-17.2%)
This indicates that while CoT can improve performance on difficult questions, it can also introduce variability that causes errors on “easy” questions the model would otherwise answer correctly.
CoT requests took 35-600% (5-15 seconds) longer than direct requests, representing a significant increase in token usage and response time.
The researchers also compared CoT prompting against default model behavior (without specific prompting constraints). This revealed that many models perform CoT-like reasoning by default, even without explicit instructions.

#### GPQA Diamond performance across non-reasoning models comparing an unprompted answer with Chain-of-Thought.

Sonnet 3.5 - Default
Sonnet 3.5 - Step by Step
Gemini 2.0 Flash - Default
Gemini 2.0 Flash - Step by Step
GPT-4o-mini - Default
GPT-4o-mini - Step by Step
GPT-4o - Default
GPT-4o - Step by Step
Average rating 25/25 (Perfect = 1.0) 23/25 (> 0.9) 13/25 (> 0.5) 0.0 0.2 0.4 0.6 0.8 1.0 Proportion / Mean rating
The error bars show 95% confidence intervals for individual proportions. For detailed statistical comparisons between conditions, see Table S4.

#### Findings for Reasoning Models

GPQA Diamond performance across reasoning models comparing an immediate answer with Chain-of-Thought.
o3-mini - Direct
o3-mini - Step by Step
o4-mini - Direct
o4-mini - Step by Step
Flash 2.5 - Direct
Flash 2.5 - Step by Step
Average rating 25/25 (Perfect = 1.0) 23/25 (> 0.9) 13/ 25 (> 0.5) 0% 10% 20% 30% 40% 50% 60% 70% 80% 90% 100% Proportion / mean rating
The error bars show 95% confidence intervals for individual proportions. For detailed statistical comparisons between conditions, see Table S5.
For models with built-in reasoning capabilities, CoT prompting produced minimal benefits:
\* Small average improvements for o3-mini (2.9%) and o4-mini (3.1%)
\* Performance decrease for Gemini Flash 2.5 (-3.3%)
Using threshold metrics showed few significant changes. The only notable effects were a small gain for o4-mini at the 51% threshold (5.6%) and performance decreases for Gemini Flash 2.5 at 100% and 90% thresholds (-13.1% and -7.1% respectively).
CoT requests required 20-80% (10-20 seconds) more time—a substantial cost for what are often negligible gains in accuracy.

#### Practical Implications

###### For non-reasoning models:

```
*  CoT can enhance average performance but may introduce inconsistency in answers
*  Consider that many models already perform reasoning by default
*  Requesting direct answers without explanation can harm performance by preventing natural reasoning
*  Weigh potential performance gains against increased token usage and response time
```

###### For reasoning models:

```
*  The marginal accuracy benefits may not justify the extra cost and time
*  Generic CoT prompts provide limited value compared to the models' built-in reasoning
```

The decision tree below provides a practical guide for determining when to use Chain-of-Thought prompting based on your specific use case, model type, and priorities.

#### Conclusion

Chain-of-Thought prompting is not universally optimal. Its effectiveness depends significantly on model type and specific use case. For non-reasoning models, CoT may improve average performance but can introduce inconsistency. For reasoning models, the minimal accuracy gains rarely justify the increased response time.
When deciding whether to use CoT, consider the specific model's characteristics, task requirements, and acceptable tradeoffs between accuracy, consistency, and response time.
Download full report
Expand Menu
Back To Top
Additional Links
Wharton Generative AI Labs
\* Research & Insights
\* Prompt Library
\* Primer
\* Pincus AI Lab
\* The Studio
\* About Us
\* Wharton AI & Analytics Initiative
\* Programs
\* Undergraduate
\* Jacobs MSQF
\* MBA
\* EMBA
\* Doctorate
\* Executive Education
\* Wharton Online
\* Locations
\* Philadelphia
\* San Francisco
\* Beijing
\* The Power of Wharton
\* Global Influence
\* AI & Analytics
\* Entrepreneurship & Innovation
\* Featured
\* Give to Wharton
\* Alumni
\* Knowledge at Wharton
\* Recruiters & Corporations
\* Wharton
\* Faculty
\* About Us
\* Research Centers
\* Departments
\* Resources
\* Contact Us
\* News
\* Faculty & Staff
\* Twitter
\* LinkedIn
\* YouTube
\* Instagram
Support Wharton
© 2026 The Wharton School, The University of Pennsylvania | Wharton Generative AI Labs | Privacy Policy | Report Accessibility Issues and Get Help
