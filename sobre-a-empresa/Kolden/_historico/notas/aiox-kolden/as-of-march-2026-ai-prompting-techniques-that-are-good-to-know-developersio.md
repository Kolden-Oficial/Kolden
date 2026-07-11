---
id_fonte: "e1e8275f-da21-4b59-9d6f-9320b2a668ad"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "As of March 2026, AI prompting techniques that are good to know | DevelopersIO"
tipo: "unknown"
url_original: "https://dev.classmethod.jp/en/articles/talked-about-the-recent-prompting-kr/"
keywords: "('Prompt Engineering Evolution', 'Adaptive Reasoning Structures', 'Context Engineering Focus', 'Reasoning Model Optimization', 'Prompting Inversion Phenomenon')"
summary: "This article serves as a modern guide to the evolving landscape of **AI prompt engineering** as of early 2026, highlighting how rapid model advancements have rendered many traditional strategies obsolete. The text contrasts emerging, high-performance methods like **Adaptive Graph of Thoughts** and **weighted self-consistency** against \"deprecated\" habits, such as emotional manipulation, persona-based roleplay, or redundant step-by-step instructions for native reasoning models. By synthesizing recent research, the author argues for a transition toward **Context Engineering**, where the focus shifts from finding \"magic words\" to designing sophisticated **structural frameworks and dynamic reasoning paths**. Ultimately, the source functions as a strategic update for professionals, emphasizing that as models become more autonomous, effective interaction requires **simpler instructions for high-tier models** and more rigorous data management rather than complex prompt scaffolding."
extraido_em: "2026-06-30T16:18:29Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# As of March 2026, AI prompting techniques that are good to know | DevelopersIO

As of March 2026, AI prompting techniques that are good to know | DevelopersIO
produced by Classmethod
Original English
AWS Bedrock CDK Google Cloud Azure Gen AI Claude MCP Security Modern data stack Seminar Job fair Case study Recruitment
Contents
What is Prompting? Recently Used Prompting Techniques 1. Adaptive Graph of Thoughts 2. Confidence-Informed Self-Consistency 3. Prompt Repetition — Pasting the question twice 4. Adversarial Chain-of-Thought (Adv-CoT) 5. DR-CoT (Dynamic Recursive Chain of Thought) Prompting Techniques No Longer Used 1. Adding "Think step by step" to reasoning models 2. Role Prompting ("You are an expert in X field") 3. Excessive Few-Shot Examples (more than 5) 4. Complex Prompt Scaffolding for High-Performance Models 5. "Magic words" and Emotional Manipulation Phrases Conclusion References For inquiries, contact Classmethod Korea!
Contents
What is Prompting? Recently Used Prompting Techniques 1. Adaptive Graph of Thoughts 2. Confidence-Informed Self-Consistency 3. Prompt Repetition — Pasting the question twice 4. Adversarial Chain-of-Thought (Adv-CoT) 5. DR-CoT (Dynamic Recursive Chain of Thought) Prompting Techniques No Longer Used 1. Adding "Think step by step" to reasoning models 2. Role Prompting ("You are an expert in X field") 3. Excessive Few-Shot Examples (more than 5) 4. Complex Prompt Scaffolding for High-Performance Models 5. "Magic words" and Emotional Manipulation Phrases Conclusion References For inquiries, contact Classmethod Korea!

### As of March 2026, AI prompting techniques that are good to know

This is a text about prompting methods for generative AI.
한국어블로그 AI
Lee Sujae
2026.03.03
This page has been translated by machine translation. View original
Hello, I'm Lee Sujae from Classmethod.
It seems like generative AI has completely permeated our daily lives, as evident by how easily we can use it on our smartphones that we carry everywhere.
While it's fine to ask questions casually in everyday use, there are situations where high accuracy in responses is necessary, such as when using AI for work.
In such cases, many people use various preliminary processes like RAG, fine-tuning, and prompting.
With AI's rapid advancement, numerous prompting techniques are emerging quickly.
In this article, I'll explore meaningful prompting techniques and those that have become less significant as of **March 2026** .
!
I'm still in the learning stage myself and not an AI expert.
While I've written this article referencing highly reliable sources, there could be incorrect interpretations or flaws in the papers themselves.
Feedback on the content is always welcome and appreciated.
Please send it to must01940[at]gmail.com, and I will review and incorporate it.

#### What is Prompting?

Prompting is the process of designing and optimizing the text (prompt) input into generative AI models. The quality of results can vary greatly depending on how users question or instruct AI, and systematically researching and applying this is called **Prompt Engineering** .
AI models generate responses based on learned knowledge and patterns, but even identical questions can yield completely different results depending on how they're expressed.
For example, asking "Find the bugs in this code" will get less useful results than "Analyze this Python code step by step and identify possible errors at each stage with supporting evidence."
Initially viewed as a technique for "finding the right words," recent studies show that the **structure and format** of prompts and **how much context is provided** are key. [1]
One significant framework change as of 2026 is the **clear separation between 'System Instructions' and 'User Prompts'** . Constraints, output formats, and persona settings are fixed in system prompts, while user prompts contain only questions and data. For this reason, the concept of **"Context Engineering"** is gaining attention over "Prompt Engineering."
For more details on Context Engineering, please refer to the article below:
[

### AI의 새로운 핵심 역량은 프롬프트가 아닌 "컨텍스트 엔지니어링" | GeekNews

"프롬프트 엔지니어링"에서 한 단계 발전한 "컨텍스트 엔지니어링"으로 논의가 전환되고 있음컨텍스트란 단순한 프롬프트 문장이 아니라, LLM이 답변을 생성하기 전 볼 수 있는 모든 news.hada.io](<https://news.hada.io/topic?id=21752>)
<https://news.hada.io/topic?id=21752>

#### Recently Used Prompting Techniques

Here are five effective prompting techniques for improving accuracy, based on papers published between January 2025 and March 2026.

##### 1. Adaptive Graph of Thoughts

**Reference Paper:** *"Adaptive Graph of Thoughts: Test-Time Adaptive Reasoning Unifying Chain, Tree, and Graph Structures"* (arXiv:2502.05078, February 2025)
Existing CoT (Chain-of-Thought) and ToT (Tree of Thoughts) approaches had limitations with complex problems due to fixed reasoning structures. AGoT overcomes this by dynamically decomposing problems into sub-problems in the form of a Directed Acyclic Graph (DAG). It works only **at test time** without additional training and selectively expands only necessary sub-problems to reduce unnecessary computation.
(Reference) Performance Improvements
\* With GPT-4o, **+46.2% improvement** on the GPQA Diamond benchmark for difficult scientific reasoning
\* **+400% improvement** on the "Game of 24" math puzzle compared to baseline
**Prompt Example**

```
This is a large-scale migration project from an on-premises environment to AWS for a client targeting a January 2027 opening. Please develop a phased architecture and migration strategy for this project.

Solution approach:

1. Break down the entire migration process into independent subtasks (e.g., DB migration, application containerization, network/security setup, etc.).

2. Specify the dependencies between these subtasks.

3. Sequentially develop solutions for dependent subtasks by referencing the results of preceding tasks.

4. Finally, synthesize a complete migration roadmap.
```

!
Key Point
For complex problems like intricate infrastructure configurations,
explicitly directing the model to follow the structure of
"sub-problem decomposition → dependency specification → sequential resolution"
is key. This naturally guides the model to construct a DAG-based reasoning path.
Additional reference:
[

### [Paper] Adaptive Graph of Thoughts: Test-Time Adaptive Reasoning Unifying Chain, Tree, and Graph Str

AGoT는 대형 언어모델이 복잡한 문제를 재귀적으로 분해해 그래프 구조로 동적 추론을 수행하도록 하여, 학습 없이도 성능을 크게 향상시킨 방법이다. velog.io](<https://velog.io/@liger82/paper-Adaptive-Graph-of-Thoughts-Test-Time-Adaptive-Reasoning-Unifying-Chain-Tree-and-Graph-Structures>)
<https://velog.io/@liger82/paper-Adaptive-Graph-of-Thoughts-Test-Time-Adaptive-Reasoning-Unifying-Chain-Tree-and-Graph-Structures>

##### 2. Confidence-Informed Self-Consistency

**Reference Paper:** *"Confidence Improves Self-Consistency in LLMs"* (arXiv:2502.06233, ACL 2025 Findings)
Traditional Self-Consistency techniques generate multiple reasoning paths and determine the final answer through **majority voting** . CISC introduces weighted voting that incorporates **model confidence scores** for each reasoning path. By giving lower weight to low-confidence answers in voting, it achieves better results with fewer samples.
(Reference) Performance Improvements
\* **Up to 53% reduction in computation costs** compared to standard Self-Consistency while achieving equal or better accuracy
\* Outperforms standard methods in almost all cases across 9 models and 4 datasets
**Prompt Example**

```
Determine whether the following IAM policy adheres to the Least Privilege principle.

Please generate 5 different reasoning paths to answer this question.
For each answer, include a conclusion along with a confidence level between 0 and 100.
Finally, reach a final conclusion by giving more weight to answers with higher confidence levels.
```

!
Key Point
Request multiple reasoning paths, ask for **confidence levels** for each, and instruct weighted voting.
When using APIs, increasing temperature to ensure diversity and then aggregating based on confidence is effective.

##### 3. Prompt Repetition — Pasting the question twice

**Reference Paper:** *"Prompt Repetition Improves Non-Reasoning LLMs"* (arXiv:2512.14982, December 2025, Google Research)
This is the simplest technique to implement. It involves repeating the input prompt exactly twice (

```
What are the optimal solutions for addressing the Cold Start problem in AWS Lambda?
What are the optimal solutions for addressing the Cold Start problem in AWS Lambda?
```

!
Key Point
When the model reaches the second question, it has already fully processed the first question, reducing the possibility of missing details.
!
Caution
Input tokens double, increasing API call costs.
For tasks with already extensive context like RAG (Retrieval-Augmented Generation) or summarizing documents over tens of thousands of tokens, **this could incur significant costs** , so it's recommended to limit this technique to tasks requiring short, clear instructions.
Additional references:
[

### 프롬프트 반복 전략 | Generative AI on Vertex AI | Google Cloud Documentation

docs.cloud.google.com](<https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-iteration?hl=ko>)
<https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-iteration?hl=ko>
[

### 프롬프트 반복으로 LLM 정확도 향상, Google 팀 연구 결과 | GeekNews

Google Research 팀이 발표한 논문(“Prompt Repetition Improves Non-Reasoning LLMs”)에서 발견한 매우 간단하면서도 강력한 기법:같은 news.hada.io](<https://news.hada.io/topic?id=26960>)
<https://news.hada.io/topic?id=26960>

##### 4. Adversarial Chain-of-Thought (Adv-CoT)

!
About Chain of Thought
Methods 4 and 5 introduce the Chain of Thought approach.
Chain of Thought is a method that guides problem-solving by presenting a process.
For more detailed information, I recommend referring to these resources:
What is Chain of Thought (CoT) Prompting? - IBM
Improving Performance on Reasoning Tasks Using Chain-of-Thought Prompts - ncloud forum
**Reference Paper:** *"Chain-of-Thought Prompt Optimization via Adversarial Learning"* (MDPI Information, December 2025)
This technique automatically improves prompts through adversarial interaction between a generator and discriminator. The generator proposes improvements, the discriminator identifies failure cases, and revisions are made iteratively.
(Reference) Performance Improvements
\* With GPT-3.5-turbo, **average +4.44% improvement** across 12 reasoning datasets
\* Task-specific improvements: Sports (+4.5%), GSM8K arithmetic (+3.7%), AQuA (+3.9%)
\* Repeated execution showed low variance, confirming stable performance improvements
**Prompt Example**

```
Please improve the following prompt for better accuracy:
[Current prompt] "Tell me why memory leaks occur in Python code and how to fix them."

Improvement process:

Find three potential failure cases (incomplete aspects) when generating an answer with the above prompt.

Modify the prompt to prevent each failure case.

Generate a response with the modified prompt and explain how it has improved from the original.
```

!
Key Point
Embedding a "prompt → analysis → prompt modification" loop within a single prompt allows the model to improve the prompt itself.

##### 5. DR-CoT (Dynamic Recursive Chain of Thought)

**Reference Paper:** *"DR-CoT: dynamic recursive chain of thought with meta reasoning for parameter efficient models"* (Scientific Reports / Nature, Vol. 15, 2025)
This technique addresses **context dilution** and **high token costs** , which are weaknesses of traditional CoT.
It combines three elements and is designed to perform exceptionally well even on smaller (parameter-efficient) models:
1. Recursive reasoning that breaks problems into sub-problems
1. Dynamic context pruning that maintains only the most important context within a fixed token budget
1. Voting mechanisms that synthesize multiple independent reasoning chains
(Reference) Performance Improvements
\* On the AIME 2024 (math competition) benchmark, **consistently 3-4 percentage points higher** than standard CoT
\* On GPQA Diamond, small BERT-class models **outperformed GPT-4 and LLaMA 2** (on zero-shot basis)
**Prompt Example:**

```
Please solve the problem below, following these rules:

Rules:
- If the problem is complex, break it down into smaller sub-problems.
- When solving each sub-problem, you may reference previous results, but keep only the most essential content and discard unnecessary information (token budget: maximum 150 characters per step).
- Solve the same problem using two different approaches, and if the results match, present that as the final answer.

Problem: A company's annual growth rate was 20% for the first 3 years and -10% for the next 2 years.
If the initial revenue was 10 billion won, what is the revenue after 5 years?
```

!
Key Point
The three mechanisms of DR-CoT - "sub-problem decomposition + maintaining only core content (context pruning) + multiple path verification" - can be directly implemented as prompt instructions. Specifying a token budget helps prevent context dilution that occurs in long reasoning chains.

#### Prompting Techniques No Longer Used

These are prompting techniques that were once effective but have significantly diminished in value or even become counterproductive due to the rapid development of LLMs.

##### 1. Adding "Think step by step" to reasoning models

**Reference Paper:** *"The Decreasing Value of Chain of Thought in Prompting"* (arXiv:2506.07142, Wharton Generative AI Labs, June 2025)
**Reasoning models** like OpenAI o3/o4-mini and Claude Extended Thinking already perform step-by-step reasoning internally. Explicitly instructing CoT to these models is redundant and only increases response time.
(Reference) Metrics
\* Performance improvement when adding CoT instructions to o3-mini: +2.9% (but response time increased by 20-80%)
**Prompt Example**
Inefficient method (unnecessary CoT instructions for reasoning models):

```
Solve this equation: (3x² + 2x - 5) / (x - 1)

Think step by step and explain each solution process. First factor the numerator,
then check if simplification is possible, and derive the final result.
```

Efficient method (clearly stating only the desired result):

```
Solve this equation: (3x² + 2x - 5) / (x - 1)
Show the solution process and final result.
```

!
Caution
This applies specifically to **'Reasoning Models'** . Explicit CoT still has a decisive impact on performance in **general models (Non-Reasoning Models)** like GPT-4o or Claude 3.5 Sonnet, so model characteristics should be distinguished according to purpose.

##### 2. Role Prompting ("You are an expert in X field")

**Reference Paper:** *"Role-Play Paradox in Large Language Models"* (arXiv:2409.13979, updated February 2025)
Role prompting like "You are a cloud architect with 20 years of experience" **does not help expand factual accuracy (knowledge boundaries)** in current models.
Instead, it risks amplifying biases.
**Prompt Example**
Less effective approach:

```
You are a top security expert with 20 years of experience.
Find security vulnerabilities in this AWS IAM policy.

{ "Effect": "Allow", "Action": "*", "Resource": "*" }
```

Improved approach (providing specific context instead of roles):

```
Review the following AWS IAM policy from the perspective of the least privilege principle in the AWS Well-Architected Framework.
Tell me about potential security risks and specific improvement measures.

{ "Effect": "Allow", "Action": "*", "Resource": "*" }
```

!
Key Point
Role prompting for knowledge expansion has become meaningless. However, it remains a useful tool for **enforcing output format, tone, and compliance with constraints** , such as "Review briefly like a grumpy senior engineer" or "Act as an API server that always responds only in JSON format."

##### 3. Excessive Few-Shot Examples (more than 5)

**Reference Paper:** *"The Few-Shot Dilemma: Over-prompting Large Language Models"* (arXiv:2509.13196, September 2025)
The "Few-Shot Collapse" phenomenon has been confirmed, where performance drops sharply when the number of examples exceeds a certain level. Latest models already understand tasks, so excessive examples cause overfitting to specific patterns and reduce performance. **2-3 carefully selected examples** are sufficient.
(Reference) Related Metrics
\* For path optimization tasks with Gemini Flash: 0-shot 33% → **4-shot 64%** → **8-shot dropped back to 33%**
\* NDSS 2025 research on vulnerability classification tasks:
\* Gemma 7B: **77.9% → 39.9%** (dropped to half after applying Few-Shot)
\* LLaMA-2 70B: **68.6% → 21.0%** (dropped to 1/3 after applying Few-Shot)
**Prompt Example:**
Excessive Few-Shot (risk of adverse effects):

```
Classify the sentiment of the following customer reviews (positive/negative/neutral).

Review: "Delivery was fast" → positive
Review: "The packaging was terrible" → negative
Review: "It's just okay" → neutral
Review: "Good quality" → positive
Review: "I want a refund" → negative
Review: "Pretty good for the price" → positive
Review: "I don't think I'll buy it again" → negative
Review: "Not as good as I expected" → negative
Review: "It's average" → neutral
Review: "Highly recommended" → positive

Review: "Not bad at this level" → ?
```

Appropriate Few-Shot (2-3 examples):

```
Classify the sentiment of the following customer reviews (positive/negative/neutral).

Review: "Delivery was fast" → positive
Review: "The packaging was terrible" → negative
Review: "It's just okay" → neutral

Review: "Not bad at this level" → ?
```

!
Key Point
Examples are for showing **format and output patterns** . Three examples are sufficient.
When a model already understands the task, increasing examples can actually reduce performance due to overfitting to specific patterns.

##### 4. Complex Prompt Scaffolding for High-Performance Models

**Reference Paper:** *"You Don't Need Prompt Engineering Anymore: The Prompting Inversion"* (arXiv:2510.22251, October 2025)
Complex prompts filled with step-by-step rules, constraints, and detailed instruction systems cause a **"Prompting Inversion"** phenomenon that has adverse effects on top-tier models (GPT-5, Claude Opus level).
Elaborate constraints force "excessive literal interpretation" on high-performance models, hindering autonomous reasoning.
For newer models, it's better to simply and clearly instruct only 'the desired result'.
(Reference) Related Metrics
\* On the GSM8K (math reasoning) benchmark, "Sculpting (constraint-based)" prompting vs. standard CoT:
\* **GPT-4o** : Sculpting 97% vs. CoT 93% → Complex prompts are more advantageous
\* **GPT-5** : Sculpting **94%** vs. CoT **96.36%** → Complex prompts are actually disadvantageous
\* GPT-5's Zero-Shot performance already exceeds the best performance achieved with GPT-4o using the best prompts
**Prompt Example**
Excessively structured prompt (counter-productive for GPT-5 class models):

```
Follow these instructions in order:
1. First, read the question.
2. Extract keywords related to the question.
3. Define each keyword.
4. Create an outline for your answer based on the definitions.
5. Fill in the outline with complete sentences.
6. Review what you've written and correct any errors.
7. Output the final answer.

Question: What's the difference between REST API and GraphQL?
```

Simple and clear prompt:

```
Compare the key differences between REST API and GraphQL from a technical perspective.
Include advantages and disadvantages of each and in which situations one should be chosen.
```

!
Key Point
For GPT-5, Claude Opus 4 class and above models, **clearly describing the desired result** yields better results than complex procedural instructions.
The more powerful the model, excessive scaffolding hinders autonomous reasoning.

##### 5. "Magic words" and Emotional Manipulation Phrases

**Reference Sources:** Wharton GAIL *"Prompting Science Report 2"* (Meincke, Mollick et al., 2025); Medium *"Magic Phrases Don't Work"* (January 2026)
Phrases popular in 2023-2024 no longer show consistent effects in current frontier models:
\* "Please do this"
\* "I'll give you a $200 tip"
\* "I'll get fired if I can't do this"
\* EmotionPrompt style emotional stimulation phrases ("This is really important for my career")
Initial EmotionPrompt research (Cheng et al., 2023) reported 8-115% improvements in some benchmarks with earlier models, but **reproduction experiments with modern models show inconsistent results or minimal effects** .
The aforementioned prompt template study (arXiv:2411.10541) supports this by showing that format can make up to 40% performance difference.
**Prompt Example**
Using emotional manipulation phrases (ineffective)

```
Please, I'm begging you, help me optimize this SQL query.
I might get fired if I can't fix this at work. This is really important.
Do your absolute best to make it perfect.

SELECT * FROM orders WHERE created_at > '2024-01-01'
```

Structured and clear approach

```
Optimize the performance of the following SQL query.

Current issue: Full scan occurs when date filtering the orders table (about 5 million rows)
DB: PostgreSQL 15
Requirement: Reduce response time from 5 seconds to under 500ms

SELECT * FROM orders WHERE created_at > '2024-01-01'

Explain your improvement suggestions along with the expected effects on the execution plan (EXPLAIN).
```

!
Key Point
Modern LLMs don't respond to phrases like "please" or "I'll give you a tip."
Specifying **data scale, current problem, target metrics, and usage environment** yields much better answers.

#### Conclusion

Writing this article has allowed me to reflect on the prompting methods I've been using.
Looking through various articles, I felt that development is so rapid that if you don't immediately grasp the trends, you might often be using prompts that are not appropriate for the model you're using.
Thank you for reading this long article.

##### References

| # | Title | Source |
| --- | --- | --- |
| 1 | Adaptive Graph of Thoughts (AGoT) | arXiv:2502.05078 |
| 2 | Confidence Improves Self-Consistency in LLMs (CISC) | arXiv:2502.06233 / ACL 2025 |
| 3 | Prompt Repetition Improves Non-Reasoning LLMs | arXiv:2512.14982 |
| 4 | Chain-of-Thought Prompt Optimization via Adversarial Learning | MDPI Information, Dec 2025 |
| 5 | DR-CoT: Dynamic Recursive Chain of Thought | Scientific Reports / Nature, 2025 |
| 6 | The Decreasing Value of Chain of Thought in Prompting | arXiv:2506.07142 |
| 7 | Role-Play Paradox in Large Language Models | arXiv:2409.13979 |
| 8 | The Few-Shot Dilemma: Over-prompting Large Language Models | arXiv:2509.13196 |
| 9 | You Don't Need Prompt Engineering Anymore: The Prompting Inversion | arXiv:2510.22251 |
| 10 | Does Prompt Formatting Have Any Impact on LLM Performance? | arXiv:2411.10541 |
| 11 | Wharton GAIL Chain-of-Thought Technical Report | Wharton GAIL |
| 12 | Daily Arxiv | Daily Arxiv |

##### For inquiries, contact Classmethod Korea!

Classmethod Korea conducts various seminars and events.
Please refer to the page below for ongoing events.
[

### <https://classmethod.kr/board/library>

classmethod.kr](<https://classmethod.kr/board/library>)
<https://classmethod.kr/board/library>
For consultations about AWS and inquiries about Classmethod Members, please contact us at:
[Info@classmethod.kr](mailto:Info@classmethod.kr)
脚注
1. As mentioned in later prompting techniques, format is now more important than specific words ↩
Share this article

#### Related articles

Top 3 Generative AI Trends to Watch in 2025 – What's #1?
Jiraporn (Jiw)
2025.10.16
OpenAI's Prompt Design
NIRUPASHREES
2023.05.23
Create a Prompt for OpenAI's Text Completion API
NIRUPASHREES
2023.05.08
Exploring Devin: Cognition's Breakthrough in Engineering AI
PoojaSunil Jadhav
2024.03.22
Classmethod, Inc.

##### Main Categories

###### AWS Topics

AWS IAM Amazon Cognito Security Hub AWS Organizations Control Tower EC2 S3 S3 Tables AWS CDK QuickSight Redshift Amplify CloudFront Amazon Connect

###### Trending Topics

Generative AI MCP ChatGPT Claude Amazon Bedrock RAG Amazon Q GitHub Copilot Devin Cursor Obsidian Modern Data Stack Python Security Project Management

###### Products & Services

Google Cloud Microsoft Azure Zendesk Auth0 Tableau Snowflake Alteryx Informatica dbt DuckDB Cloudflare Splunk Vision One Notion LINE

###### Features and Series

Google Cloud Next '25 AWS re:Invent 2025 AWS Re-Introduction AWS Trend Check For Beginners AWS Technical Support AWS Certification Manufacturing Joined Classmethod Classmethod IT Team Thai Blog Vietnamese Blog

##### Company

About Classmethod
What is DevelopersIO
Our Services
Contact Us
Download Brochures
Official X (Twitter)
YouTube Channel
Facebook Page
Official LinkedIn
Privacy Policy
© Classmethod, Inc. All rights reserved.
