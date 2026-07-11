---
id_fonte: "9ab738b6-d72d-4fbc-9de9-01c7f9192cee"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Aligned Chain-of-Thought (AlignedCoT) - Learn Prompting"
tipo: "unknown"
url_original: "https://learnprompting.org/docs/new_techniques/aligned_cot"
keywords: "('Aligned Chain-of-Thought', 'Prompt Engineering', 'Native Reasoning Styles', 'Large Language Models', 'Complex Reasoning Tasks')"
summary: "This educational guide introduces **Aligned Chain-of-Thought (AlignedCoT)**, a prompting strategy designed to improve the reasoning capabilities of large language models by leveraging their **native style of thought**. Rather than forcing models to follow human-written examples, the text outlines a **three-step process**—probing, refining, and formatting—that allows AI to generate and correct its own logical steps. By using these **native-speaking demonstrations**, the source explains that users can achieve higher accuracy in complex tasks like mathematics and commonsense reasoning. Ultimately, the documentation serves as both a **technical overview and a practical tutorial**, providing benchmark results and ready-made templates to help users optimize model performance through more **natural alignment** with the AI's learned behaviors."
extraido_em: "2026-06-30T16:18:19Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Aligned Chain-of-Thought (AlignedCoT) - Learn Prompting

Aligned Chain-of-Thought (AlignedCoT)
**Free Live Workshop: Vibe Coding with Google AI Studio — April 1**
Register now →
\* Learn AI Courses Master AI and prompt engineering Specializations New Build real apps with AI tools Certifications Get Certified in AI

##### DIFFICULTY LEVEL

Beginner Courses Intermediate Courses Advanced Courses View All Courses

##### RECOMMENDED COURSES

[NEW

###### ChatGPT for Everyone

Master ChatGPT fundamentals and advanced techniques Start Learning](<https://learnprompting.org/courses/chatgpt-for-everyone>) [NEW

###### Introduction to Prompt Engineering

Learn the fundamentals of crafting effective prompts Start Learning](<https://learnprompting.org/courses/introduction-to-prompt-engineering>) [ON-DEMAND

###### AI Red-Teaming and AI Security Masterclass

Learn AI security from the creator of Learn Prompting and HackAPrompt Start Learning](<https://learnprompting.org/courses/ai-security-masterclass>) [LIVE

###### Live AI Security Courses

Interactive masterclasses with expert instructors Explore Live AI Security Courses](<https://learnprompting.org/courses/ai-security-masterclass-live>)
\* Workshops
\* Docs
\* Blog
\* Resources Community HackAPrompt 7-Day Free Course Prompt Hacking Guide Vocabulary Help Center About
\* Pricing
\* For Business
Search K
Start Learning for Free
Learn Prompting
Prompt Engineering Guide
😃 Basics
🟢 Basics Guide Overview
🟢 What is Generative AI?
🟢 ChatGPT Basics
🟢 Testing Prompts with Interactive Learn Prompting Embeds
🟢 Introduction to Prompt Engineering
🟢 Basic Prompt Structure and Key Parts
🟢 Technique #1: Instructions in Prompts
🟢 Technique #2: Roles in Prompts
🟢 Technique #3: Examples in Prompts: From Zero-Shot to Few-Shot
🟢 Combining Prompting Techniques
🟢 Tips for Writing Better Prompts
🟢 Prompt Priming: Setting Context for AI
🟢 Differences Between Chatbots and LLMs
🟢 LLM Limitations: When Models and Chatbots Make Mistakes
🟢 What Can Generative AI Create Beyond Text?
🟢 How to Solve Problems Using Generative AI: A Simple Method
🟢 Next Steps: Where to Go From Here
💼 Applications
🟢 Introduction
🟢 Text Summarization
🟢 Table Generation
🟢 Multiple Choice Questions
🟢 Short-Form Content
🟢 Writing in Different Styles
🟢 Finding Emojis
🟢 Writing Emails
🟢 Blog Writing
🟢 Legal Documents
🟢 Study Buddy
🟦 Digital Marketing
🟦 Coding Assistance
🟦 Knowledge Base Chatbot
🟦 How to Build a Chatbot Using LLMs
🟦 Zapier for Emails
🧙♂ Intermediate
🟢 Introduction
🟢 Chain-of-Thought Prompting
🟢 Zero-Shot Chain-of-Thought
🟦 Self-Consistency
🟦 Generated Knowledge
🟦 Least-to-Most Prompting
🟦 Dealing With Long Form Content
🟦 Revisiting Roles
🟦 More About Prompt Elements
🟦 Basic LLM Settings
🟦 OpenAI Playground
🧠 Advanced
🟢 Introduction
Zero-Shot
🟢 Introduction
🟢 Emotion Prompting
🟢 Role Prompting
🟢 Re-reading (RE2)
🟢 Rephrase and Respond (RaR)
🟦 SimToM
◆ System 2 Attention (S2A)
Few-Shot
🟢 Introduction
🟢 Self-Ask
🟢 Self Generated In-Context Learning (SG-ICL)
🟢 Chain-of-Dictionary (CoD)
🟢 Cue-CoT
🟦 Chain of Knowledge (CoK)
◆ K-Nearest Neighbor (KNN)
◆◆ Vote-K
◆◆ Prompt Mining
Thought Generation
🟢 Introduction
🟢 Chain of Draft (CoD)
🟦 Contrastive Chain-of-Thought
🟦 Automatic Chain of Thought (Auto-CoT)
🟦 Tabular Chain-of-Thought (Tab-CoT)
🟦 Memory-of-Thought (MoT)
🟦 Active Prompting
🟦 Analogical Prompting
🟦 Complexity-Based Prompting
🟦 Step-Back Prompting
🟦 Thread of Thought (ThoT)
Ensembling
🟢 Introduction
🟢 Universal Self-Consistency
🟦 Mixture of Reasoning Experts (MoRE)
🟦 Max Mutual Information (MMI) Method
🟦 Prompt Paraphrasing
🟦 DiVeRSe (Diverse Verifier on Reasoning Step)
🟦 Universal Self-Adaptive Prompting (USP)
🟦 Consistency-based Self-adaptive Prompting (COSP)
🟦 Multi-Chain Reasoning (MCR)
Self-Criticism
🟢 Introduction
🟢 Self-Calibration
🟢 Chain of Density (CoD)
🟢 Chain-of-Verification (CoVe)
🟦 Self-Refine
🟦 Cumulative Reasoning
🟦 Reversing Chain-of-Thought (RCoT)
◆ Self-Verification
Decomposition
🟢 Introduction
🟢 Chain-of-Logic
🟦 Decomposed Prompting
🟦 Plan-and-Solve Prompting
🟦 Program of Thoughts
🟦 Tree of Thoughts
🟦 Chain of Code (CoC)
🟦 Duty-Distinct Chain-of-Thought (DDCoT)
◆ Faithful Chain-of-Thought
◆ Recursion of Thought
◆ Skeleton-of-Thought
Special Topics
⚖ Reliability
🟢 Introduction
🟢 Prompt Debiasing
🟦 Prompt Ensembling
🟦 LLM Self-Evaluation
🟦 Calibrating LLMs
🟦 Math
🔓 Prompt Hacking
🟢 Introduction
🟢 Prompt Injection
🟢 Prompt Leaking
🟢 Jailbreaking
🟢 Defensive Measures
🟢 Introduction
🟢 Filtering
🟢 Instruction Defense
🟢 Post-Prompting
🟢 Random Sequence Enclosure
🟢 Sandwich Defense
🟢 XML Tagging
🟢 Separate LLM Evaluation
🟢 Other Approaches
🟢 Offensive Measures
🟢 Introduction
🟢 Simple Instruction Attack
🟢 Context Ignoring Attack
🟢 Compound Instruction Attack
🟢 Special Case Attack
🟢 Few-Shot Attack
🟢 Refusal Suppression
🟢 Context Switching Attack
🟢 Obfuscation/Token Smuggling
🟢 Task Deflection Attack
🟢 Payload Splitting
🟢 Defined Dictionary Attack
🟢 Indirect Injection
🟢 Recursive Injection
🟢 Code Injection
🟢 Virtualization
🟢 Pretending
🟢 Alignment Hacking
🟢 Authorized User
🟢 DAN (Do Anything Now)
🟢 Bad Chain
🖼 Image Prompting
🟢 Introduction
🟢 Style Modifiers
🟢 Quality Boosters
🟢 Repetition
🟢 Weighted Terms
🟢 Fix Deformed Generations
🟢 Shot type
🟢 Midjourney
🟢 Resources
🌱 New Techniques
🟢 Introduction
🟢 Aligned Chain-of-Thought (AlignedCoT)
🟦 Self-Harmonized Chain-of-Thought (ECHO)
🟦 Logic-of-Thought (LoT)
🟦 Narrative-of-Thought (NoT)
🟦 Code Prompting
◆ End-to-End DAG-Path (EEDP) Prompting
◆ Instance-adaptive Zero-Shot Chain-of-Thought Prompting (IAP)
🔧 Models
🟢 Introduction
🟢 OpenAI o1
🟢 FLUID
🟢 Stable Diffusion 3.5
🟢 DALL-E 3
🟢 Anthropic Claude
🟦 Apple Intelligence Models
🟢 Google Gemini 1.5
🟢 Gemini 1.5 Flash
🟢 Gemini 1.5 Pro
🟢 Gemma
🟢 Janus
🗂 RAG
🟢 Introduction
🟦 Retrieval-Augmented Generation (RAG)
🟦 Auto-RAG
🟦 Self-RAG
🟦 FLARE / Active RAG
🟦 R^2AG
🟦 GraphRAG
🟦 InFO-RAG
🟦 HybridRAG
🟦 Corrective RAG
🟦 Speculative RAG
🟦 Reliability-Aware RAG (RA-RAG)
🟦 Multi-Fusion Retrieval Augmented Generation (MoRAG)
🤖 Agents
🟢 Introduction
🟦 LLMs Using Tools
🟦 LLMs that Reason and Act
🟦 Code as Reasoning
💪 Prompt Tuning
🟢 Introduction
🟦 Prompt Tuning with Soft Prompts
🟦 Interpretable Soft Prompts
🟦 Prefix-Tuning
🟦 Prompt-Tuning with Perturbation-Based Regularizer
🟦 Low-Rank Prompt Tuning (LoPT)
🟦 Dynamic Prompting
🟦 Gradient-Free Prompt Tuning
🟦 Multitask Prompt Tuning
🔁 Language Model Inversion
🟢 Introduction
🟢 logit2prompt
🟢 output2prompt
🟢 Reverse Prompt Engineering (RPE)
🔨 Tooling
🟢 Introduction
Prompt Engineering Tools
Prompt Engineering IDEs
🟢 Introduction
GPT-3 Playground
Dust
Soaked
Everyprompt
Prompt IDE
PromptTools
PromptSource
PromptChainer
Prompts.ai
Snorkel 🚧
Human Loop
Spellbook 🚧
Kolla Prompt 🚧
Lang Chain
OpenPrompt
OpenAI DALLE IDE
Dream Studio
Patience
Promptmetheus
PromptSandbox.io
The Forge AI
AnySolve
Conclusion
🎲 Miscellaneous
🟢 Introduction
🟢 Detection Trickery
🟢 Music Generation
🟢 Detecting AI Generated Text
Resources
📚 Bibliography
📦 Prompted Products
🛸 Additional Resources
🔥 Hot Topics
✨ Credits
English
🌱 New Techniques 🟢 Aligned Chain-of-Thought (AlignedCoT)

### 🟢 Aligned Chain-of-Thought (AlignedCoT)

🟢 This article is rated easy
Reading Time: 4 minutes
Last updated on October 17, 2024
Valeriia Kuka

#### What is AlignedCoT?

**AlignedCoT (Aligned Chain-of-Thought)** 1 is a technique designed to create demonstrations for Chain-of-Thought (CoT) prompting. The idea behind AlignedCoT is to guide large language models (LLMs) to use their own “native style” of thought, instead of relying on human-crafted prompts that may not fully align with the LLM's learned behaviors.
This method addresses the challenge that LLMs often perform better when following their own learned habits rather than imitating human-written prompts.

#### How Does AlignedCoT Differ from Existing Techniques?

Unlike traditional CoT methods, which rely heavily on human-created few-shot examples or static dataset samples, AlignedCoT allows the model to generate its reasoning steps in its own native language style.

##### How Does AlignedCoT Work?

AlignedCoT is built around a 3-step process that helps LLMs perform complex reasoning tasks in a more structured, error-free manner:
1. **Probing** : Query the LLM with a Zero-Shot Chain-of-Thought prompt (“Let's think step by step”) to let it generate its own reasoning process, free from human-crafted formats.
1. **Refining** : Any errors in the initial CoT generation are corrected by having the model iterate and fix mistakes, making the thought process more logical and consistent.
1. **Formatting** : The final step unifies the presentation and structure of the LLM's reasoning so that each CoT is clear, error-free, and consistently formatted.

#### How to Use AlignedCoT

AlignedCoT can be used to improve reasoning tasks like mathematical problem solving and commonsense reasoning.
You don't need to manually apply these steps yourself. You can simply use the ready-made AlignedCoT demonstrations created by the authors. These demonstrations are designed to optimize the model's performance using native-style reasoning.
Here's a template for using AlignedCoT prompts:
Copy

###### Template for using AlignedCoT

Q1: [Question 1] A1: [Solution from AlignedCoT authors]
Q2: [Question 2] A2: [Solution from AlignedCoT authors]
Q3: [Your question] A3:
Let's think step by step:
You can find a collection of AlignedCoT prompts on the official AlignedCoT GitHub.
Here's an example with AlignedCoT demonstrations:
Copy

###### Prompt

[Question]: Jason had 20 lollipops. He gave Denny some lollipops. Now Jason has 12 lollipops. How many lollipops did Jason give to Denny?
[Solution]:
Let's think step by step.
First, Jason had 20 lollipops. Then he gave some to Denny and now he has 12 lollipops.
So, to find out how many lollipops Jason gave to Denny, we need to subtract the number of lollipops Jason has now from the number he had at the beginning. So, 20 - 12 = 8.
Therefore, Jason gave 8 lollipops to Denny.
Answer: 8.
[Question]: There are 15 trees in the grove. Grove workers will plant trees in the grove today. After they are done, there will be 21 trees. How many trees did the grove workers plant today?
[Solution]:
Let's think step by step.
First, we know that there were originally 15 trees in the grove.
Then, the grove workers planted some trees.
After they finished, there were 21 trees in total.
So, to find out how many trees they planted, we subtract the original number of trees from the final number of trees.
That is, 21 - 15 = 6.
So, the grove workers planted 6 trees today.
Answer: 6.
[Question]: [Your question] [Solution]:
Let's think step by step:

#### Results of AlignedCoT

Experiments show that AlignedCoT improves reasoning accuracy across a range of tasks. Below is a summary of the performance improvements for GPT-3.5-turbo and GPT-4 models using AlignedCoT compared to other prompting methods:
| **Model** | **Prompt** | **GSM8K** | **AQUA** | **SVAMP** | **AddSub** | **SingleEQ** | **Penguins** | **Average** |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| GPT-3.5-turbo | CoT w/o AlignedCoT | 77.1 | 54.7 | 82.8 | 93.1 | 96.0 | 78.1 | 80.3 |
| GPT-3.5-turbo | CoT w/ AlignedCoT | 78.7 | 57.1 | 84.8 | 94.9 | 97.6 | 87.7 | 83.5 |
| GPT-4 | CoT w/o AlignedCoT | 93.1 | 72.8 | 94.1 | 96.6 | N/A | 89.2 | 89.2 |
| GPT-4 | CoT w/ AlignedCoT | 94.4 | 75.6 | 94.8 | 98.6 | N/A | 90.9 | 90.9 |

```
*   **Performance Boost** : AlignedCoT shows consistent performance improvements across multiple reasoning benchmarks, averaging +3.2% on GPT-3.5 and +1.7% on GPT-4.
*   **Error Detection** : It also significantly enhances the LLM's ability to detect logical errors, with GPT-4 achieving a 78.9% accuracy in identifying incorrect problem setups.
*   **Broad Applicability** : AlignedCoT can be combined with other prompting techniques (e.g., self-consistency, Auto-CoT) to further boost performance in reasoning-heavy tasks.
```

#### Footnotes

```
1. Yang, Z., Huang, Y., Xiong, J., Feng, L., Liang, X., Wang, Y., & Tang, J. (2024). AlignedCoT: Prompting Large Language Models via Native-Speaking Demonstrations. https://arxiv.org/abs/2311.13538 ↩
```

##### Valeriia Kuka

Valeriia Kuka, Head of Content at Learn Prompting, is passionate about making AI and ML accessible. Valeriia previously grew a 60K+ follower AI-focused social media account, earning reposts from Stanford NLP, Amazon Research, Hugging Face, and AI researchers. She has also worked with AI/ML newsletters and global communities with 100K+ members and authored clear and concise explainers and historical articles.
Edit this page
Previous 🟢 Introduction
Next 🟦 Self-Harmonized Chain-of-Thought (ECHO)

#### Master Generative AI with Our Courses

##### ChatGPT for Everyone

Discover how to use ChatGPT effectively and explore the exciting world of Generative AI. No prior experience required!
Enroll Now

##### Introduction to Prompt Engineering

Learn the fundamentals of prompt engineering, the practice of crafting effective instructions for AI systems like ChatGPT, Claude, and Perplexity. You'll learn how to write better prompts, understand how large language models (LLMs) interpret inputs, and apply AI to tasks like content creation, problem-solving, and workflow automation.
Enroll Now

##### Advanced Prompt Engineering

Discover advanced techniques in prompt engineering to enhance the accuracy, reliability, and efficiency of AI-generated responses. Learn systematic methods for creating complex prompts for AI models like GPT-4o, Claude, and Gemini. Master key techniques like chain-of-thought prompting and more!
Enroll Now
[Need Business GenAI Training?

##### Contact Sales

](<https://learnprompting.org/contact-sales>)
[Want to keep learning

##### Explore Our Full Course Collection

](<https://learnprompting.org/courses>)
On this page
\* What is AlignedCoT?
\* How Does AlignedCoT Differ from Existing Techniques?
\* How to Use AlignedCoT
\* Results of AlignedCoT

##### Courses

```
*  ChatGPT for Everyone
*  Introduction to Generative AI Agents
*  Introduction to Retrieval-Augmented Generation (RAG)
*  Introduction to Prompt Engineering
*  Advanced Prompt Engineering
*  Runway ML for Everyone
*  AI Safety
*  Introduction to Generative AI in Marketing
*  Introduction to Prompt Hacking
*  Advanced Prompt Hacking
*  Boost Your Day-to-Day Efficiency With Generative AI
*  Introduction to Generative AI
*  Introduction to Large Language Models (LLMs)
```

##### Resources

```
*  Docs
*  Community
*  Blogs
*  HackAPrompt
*  For Business
*  Pricing
```

##### Follow Us

```
*  Twitter
*  Linkedin
*  Discord
*  Youtube
```

© 2026 Learn Prompting. All rights reserved.
Privacy Policy Terms of Service
