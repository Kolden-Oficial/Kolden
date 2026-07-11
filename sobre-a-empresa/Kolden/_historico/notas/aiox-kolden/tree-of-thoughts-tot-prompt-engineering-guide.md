---
id_fonte: "8e2c9793-7e2c-4bd1-8b43-5611aeb60627"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Tree of Thoughts (ToT) - Prompt Engineering Guide"
tipo: "unknown"
url_original: "https://www.promptingguide.ai/techniques/tot"
keywords: "('Tree of Thoughts', 'Prompt Engineering', 'Large Language Models', 'AI Agents', 'Systematic Problem Solving')"
summary: "The provided text functions as a comprehensive technical guide to the **Tree of Thoughts (ToT) framework**, an advanced prompting architecture designed to enhance the **strategic reasoning capabilities** of large language models. Rather than following a simple linear path, this method organizes cognitive steps into a **hierarchical tree structure**, allowing the AI to generate, self-evaluate, and refine various \"thoughts\" through systematic **search algorithms** like breadth-first or depth-first search. The material details how this approach enables **lookahead and backtracking** to solve multi-stage problems that baffle traditional techniques, using mathematical challenges like the \"Game of 24\" to demonstrate its superior accuracy. Furthermore, the guide distinguishes between **search-based strategies** and reinforcement-learning controllers while situating ToT within a broader ecosystem of **prompt engineering techniques**, educational resources, and emerging AI agent research."
extraido_em: "2026-06-30T16:22:21Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Tree of Thoughts (ToT) - Prompt Engineering Guide

Tree of Thoughts (ToT) | Prompt Engineering Guide
🚀 Learn to build apps with Claude Code! Use **PROMPTING** for 20% off Enroll now →
Prompt Engineering Guide
🎓 Courses
About About CTRL K
GitHub (opens in a new tab) Discord (opens in a new tab) ✨ Services CTRL K
\* Prompt Engineering
\* Introduction
\* LLM Settings
\* Basics of Prompting
\* Prompt Elements
\* General Tips for Designing Prompts
\* Examples of Prompts
\* Prompting Techniques
\* Zero-shot Prompting
\* Few-shot Prompting
\* Chain-of-Thought Prompting
\* Meta Prompting
\* Self-Consistency
\* Generate Knowledge Prompting
\* Prompt Chaining
\* Tree of Thoughts
\* Retrieval Augmented Generation
\* Automatic Reasoning and Tool-use
\* Automatic Prompt Engineer
\* Active-Prompt
\* Directional Stimulus Prompting
\* Program-Aided Language Models
\* ReAct
\* Reflexion
\* Multimodal CoT
\* Graph Prompting
\* AI Agents
\* Introduction to Agents
\* Agent Components
\* AI Workflows vs AI Agents
\* Context Engineering for AI Agents
\* Context Engineering Deep Dive
\* Function Calling
\* Deep Agents
\* Guides
\* Optimizing Prompts
\* OpenAI Deep Research
\* Reasoning LLMs
\* 4o Image Generation
\* Context Engineering Guide
\* Applications
\* Fine-tuning GPT-4o
\* Function Calling
\* Context Caching with LLMs
\* Generating Data
\* Generating Synthetic Dataset for RAG
\* Tackling Generated Datasets Diversity
\* Generating Code
\* Graduate Job Classification Case Study
\* Prompt Function
\* Prompt Hub
\* Classification
\* Sentiment Classification
\* Few-Shot Sentiment Classification
\* Coding
\* Generate Code Snippet
\* Generate MySQL Query
\* Draw TiKZ Diagram
\* Creativity
\* Rhymes
\* Infinite Primes
\* Interdisciplinary
\* Inventing New Words
\* Evaluation
\* Evaluate Plato's Dialogue
\* Information Extraction
\* Extract Model Names
\* Image Generation
\* Draw a Person Using Alphabet
\* Mathematics
\* Evaluating Composite Functions
\* Adding Odd Numbers
\* Question Answering
\* Closed Domain Question Answering
\* Open Domain Question Answering
\* Science Question Answering
\* Reasoning
\* Indirect Reasoning
\* Physical Reasoning
\* Text Summarization
\* Explain A Concept
\* Truthfulness
\* Hallucination Identification
\* Adversarial Prompting
\* Prompt Injection
\* Prompt Leaking
\* Jailbreaking
\* Models
\* ChatGPT
\* Claude 3
\* Code Llama
\* Flan
\* Gemini
\* Gemini Advanced
\* Gemini 1.5 Pro
\* Gemma
\* GPT-4
\* Grok-1
\* Kimi K2.5
\* LLaMA
\* Llama 3
\* Mistral 7B
\* Mistral Large
\* Mixtral
\* Mixtral 8x22B
\* OLMo
\* Phi-2
\* Sora
\* LLM Collection
\* Risks & Misuses
\* Adversarial Prompting
\* Factuality
\* Biases
\* LLM Research Findings
\* LLM Agents
\* RAG for LLMs
\* LLM Reasoning
\* RAG Faithfulness
\* LLM In-Context Recall
\* RAG Reduces Hallucination
\* Synthetic Data
\* ThoughtSculpt
\* Infini-Attention
\* LM-Guided CoT
\* Trustworthiness in LLMs
\* LLM Tokenization
\* What is Groq?
\* Papers
\* Tools
\* Notebooks
\* Datasets
\* Additional Readings
\* Services
\* Prompt Engineering
\* Introduction
\* LLM Settings
\* Basics of Prompting
\* Prompt Elements
\* General Tips for Designing Prompts
\* Examples of Prompts
\* Prompting Techniques
\* Zero-shot Prompting
\* Few-shot Prompting
\* Chain-of-Thought Prompting
\* Meta Prompting
\* Self-Consistency
\* Generate Knowledge Prompting
\* Prompt Chaining
\* Tree of Thoughts
\* Retrieval Augmented Generation
\* Automatic Reasoning and Tool-use
\* Automatic Prompt Engineer
\* Active-Prompt
\* Directional Stimulus Prompting
\* Program-Aided Language Models
\* ReAct
\* Reflexion
\* Multimodal CoT
\* Graph Prompting
\* AI Agents
\* Introduction to Agents
\* Agent Components
\* AI Workflows vs AI Agents
\* Context Engineering for AI Agents
\* Context Engineering Deep Dive
\* Function Calling
\* Deep Agents
\* Guides
\* Optimizing Prompts
\* OpenAI Deep Research
\* Reasoning LLMs
\* 4o Image Generation
\* Context Engineering Guide
\* Applications
\* Fine-tuning GPT-4o
\* Function Calling
\* Context Caching with LLMs
\* Generating Data
\* Generating Synthetic Dataset for RAG
\* Tackling Generated Datasets Diversity
\* Generating Code
\* Graduate Job Classification Case Study
\* Prompt Function
\* Prompt Hub
\* Classification
\* Sentiment Classification
\* Few-Shot Sentiment Classification
\* Coding
\* Generate Code Snippet
\* Generate MySQL Query
\* Draw TiKZ Diagram
\* Creativity
\* Rhymes
\* Infinite Primes
\* Interdisciplinary
\* Inventing New Words
\* Evaluation
\* Evaluate Plato's Dialogue
\* Information Extraction
\* Extract Model Names
\* Image Generation
\* Draw a Person Using Alphabet
\* Mathematics
\* Evaluating Composite Functions
\* Adding Odd Numbers
\* Question Answering
\* Closed Domain Question Answering
\* Open Domain Question Answering
\* Science Question Answering
\* Reasoning
\* Indirect Reasoning
\* Physical Reasoning
\* Text Summarization
\* Explain A Concept
\* Truthfulness
\* Hallucination Identification
\* Adversarial Prompting
\* Prompt Injection
\* Prompt Leaking
\* Jailbreaking
\* Models
\* ChatGPT
\* Claude 3
\* Code Llama
\* Flan
\* Gemini
\* Gemini Advanced
\* Gemini 1.5 Pro
\* Gemma
\* GPT-4
\* Grok-1
\* Kimi K2.5
\* LLaMA
\* Llama 3
\* Mistral 7B
\* Mistral Large
\* Mixtral
\* Mixtral 8x22B
\* OLMo
\* Phi-2
\* Sora
\* LLM Collection
\* Risks & Misuses
\* Adversarial Prompting
\* Factuality
\* Biases
\* LLM Research Findings
\* LLM Agents
\* RAG for LLMs
\* LLM Reasoning
\* RAG Faithfulness
\* LLM In-Context Recall
\* RAG Reduces Hallucination
\* Synthetic Data
\* ThoughtSculpt
\* Infini-Attention
\* LM-Guided CoT
\* Trustworthiness in LLMs
\* LLM Tokenization
\* What is Groq?
\* Papers
\* Tools
\* Notebooks
\* Datasets
\* Additional Readings
\* 🎓 Courses
\* Intro to Prompt Engineering
\* Advanced Prompt Engineering
\* Intro to AI Agents
\* Building Effective AI Agents with n8n
\* Build RAG Systems
\* Building Advanced AI Agents
\* See all →
\* About
\* Services
English
System
Question? Give us feedback → (opens in a new tab) Edit this page
Prompting Techniques
Tree of Thoughts
Copy page

### Tree of Thoughts (ToT)

For complex tasks that require exploration or strategic lookahead, traditional or simple prompting techniques fall short. Yao et el. (2023) (opens in a new tab) and Long (2023) (opens in a new tab) recently proposed Tree of Thoughts (ToT), a framework that generalizes over chain-of-thought prompting and encourages exploration over thoughts that serve as intermediate steps for general problem solving with language models.
ToT maintains a tree of thoughts, where thoughts represent coherent language sequences that serve as intermediate steps toward solving a problem. This approach enables an LM to self-evaluate the progress through intermediate thoughts made towards solving a problem through a deliberate reasoning process. The LM's ability to generate and evaluate thoughts is then combined with search algorithms (e.g., breadth-first search and depth-first search) to enable systematic exploration of thoughts with lookahead and backtracking.
The ToT framework is illustrated below:
Image Source: Yao et el. (2023) (opens in a new tab)
When using ToT, different tasks requires defining the number of candidates and the number of thoughts/steps. For instance, as demonstrated in the paper, Game of 24 is used as a mathematical reasoning task which requires decomposing the thoughts into 3 steps, each involving an intermediate equation. At each step, the best b=5 candidates are kept.
To perform BFS in ToT for the Game of 24 task, the LM is prompted to evaluate each thought candidate as "sure/maybe/impossible" with regard to reaching 24. As stated by the authors, "the aim is to promote correct partial solutions that can be verdicted within few lookahead trials, and eliminate impossible partial solutions based on "too big/small" commonsense, and keep the rest "maybe"". Values are sampled 3 times for each thought. The process is illustrated below:
Image Source: Yao et el. (2023) (opens in a new tab)
From the results reported in the figure below, ToT substantially outperforms the other prompting methods:
Image Source: Yao et el. (2023) (opens in a new tab)
Code available here (opens in a new tab) and here (opens in a new tab)
At a high level, the main ideas of Yao et el. (2023) (opens in a new tab) and Long (2023) (opens in a new tab) are similar. Both enhance LLM's capability for complex problem solving through tree search via a multi-round conversation. One of the main difference is that Yao et el. (2023) (opens in a new tab) leverages DFS/BFS/beam search, while the tree search strategy (i.e. when to backtrack and backtracking by how many levels, etc.) proposed in Long (2023) (opens in a new tab) is driven by a "ToT Controller" trained through reinforcement learning. DFS/BFS/Beam search are generic solution search strategies with no adaptation to specific problems. In comparison, a ToT Controller trained through RL might be able learn from new data set or through self-play (AlphaGo vs brute force search), and hence the RL-based ToT system can continue to evolve and learn new knowledge even with a fixed LLM.
Hulbert (2023) (opens in a new tab) has proposed Tree-of-Thought Prompting, which applies the main concept from ToT frameworks as a simple prompting technique, getting the LLM to evaluate intermediate thoughts in a single prompt. A sample ToT prompt is:

```
Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking,
then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realises they're wrong at any point then they leave.
The question is...
```

Sun (2023) (opens in a new tab) benchmarked the Tree-of-Thought Prompting with large-scale experiments, and introduce PanelGPT --- an idea of prompting with Panel discussions among LLMs.

#### Related Learning

[Course

##### Prompt Engineering for LLMs

Master Tree of Thoughts, chain-of-thought, and advanced reasoning techniques for complex problem solving. Beginner 2 hours](<https://academy.dair.ai/courses/introduction-prompt-engineering>)
[Course

##### Building Effective AI Agents

Learn to build effective AI agents. Covers function calling, tool integration, and debugging agentic systems. Intermediate 5 hours](<https://academy.dair.ai/courses/building-effective-ai-agents>)

##### Explore All Courses

Discover our full catalog of AI and prompt engineering courses. From beginners to advanced practitioners. Use code PROMPTING20 for 20% off!
Browse Academy
Last updated on Sun Feb 01 2026
Sponsored by
Prompt Chaining Retrieval Augmented Generation
English
System
Copyright © 2026 DAIR.AI
