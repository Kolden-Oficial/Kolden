---
id_fonte: "f89fc6b0-81f8-472f-bd7e-64f9b5b12a8c"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Tree of Thoughts (ToT): Enhancing Problem-Solving in LLMs"
tipo: "unknown"
url_original: "https://learnprompting.org/docs/advanced/decomposition/tree_of_thoughts"
keywords: "('Tree of Thoughts', 'Prompt Engineering', 'Problem-Solving Frameworks', 'LLM Reasoning Paths', 'Large Language Models')"
summary: "The provided text serves as a comprehensive educational guide to **Tree of Thoughts (ToT) prompting**, a sophisticated framework designed to improve the **problem-solving capabilities** of large language models. By organizing reasoning into a **tree-like structure**, this method allows AI to generate various potential solutions, evaluate their viability, and **backtrack** when a particular path fails to yield results. The source details specific implementation strategies, such as **propose and value prompts**, while showcasing how ToT significantly **outperforms traditional methods** like Chain-of-Thought in complex mathematical and creative tasks. Ultimately, the author balances these benefits against **resource limitations**, suggesting that this intensive approach is best reserved for intellectually demanding challenges that require **deliberate planning and search**."
extraido_em: "2026-06-30T16:22:22Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Tree of Thoughts (ToT): Enhancing Problem-Solving in LLMs

Tree of Thoughts (ToT): Enhancing Problem-Solving in LLMs
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
🧠 Advanced Decomposition 🟦 Tree of Thoughts

### 🟦 Tree of Thoughts (ToT) Prompting

Reading Time: 4 minutes
Last updated on September 27, 2024
Bhuwan Bhatt
Takeaways
\* **Tree of Thoughts (ToT) prompting** enables models to explore and evaluate multiple reasoning paths, enhancing decision-making and solution accuracy.
\* **ToT mimics human problem-solving** by using a tree structure where nodes represent partial solutions, allowing the model to backtrack when necessary.
\* **Two key components** : Propose prompts generate possible solutions, and value prompts evaluate and guide the model toward the best path.
\* **ToT outperforms other methods** in tasks like math reasoning, creative writing, and puzzles, with higher success rates and more coherent results.
\* **Limitations** include increased resource consumption and inefficiency for simpler tasks that don't require extensive reasoning.

#### What is Tree of Thoughts Prompting?

Since their inception, Large Language Models (LLMs) are increasingly becoming popular and getting deployed in a wide range of applications across many different industries. But, a common theme across LLM inference is that they are still confined to token-level, left-to-right decision-making processes. They still fall short in tasks requiring exploration or making assumptions about the future state, given the present state.
Tree of Thoughts (ToT) prompting 1 is a framework for LLM inference that allows LLMs to make an informed decision by considering and self-evaluating multiple different reasoning paths that will likely lead to an optimal solution. ToT also empowers the model to backtrack when a path is unlikely to lead to a valid solution. ToT is similar to the best-first search algorithm in Computer Science.
ToT aims to mimic human's problem-solving approach. Research shows that, given a problem, humans search through a combinatorial problem space - a tree where the nodes represent partial solutions and branches represent operators that modify the nodes. They use heuristics to identify the next branch that guides them closer to the solution. The process continues till the problem concludes.

#### How to Use Tree of Thoughts Prompting?

Let's look at how we can implement ToT using two distinct examples:
\* Game of 24
\* Creative writing

##### Game of 24

Game of 24 is a mathematical problem where the goal is to use given four numbers and four basic operators: +, -, /,*, to obtain 24. At each step, the **propose prompt** generates three possible solutions, and the **value prompt** evaluates each of the generated candidates and decides whether proceeding with the suggested generation is worthwhile. It will be clear once we look at the example below.
**Problem statement:** Using the numbers 4, 9, 10, and 13 and four basic operators +, -, /,*, generate an expression that evaluates to 24.
1. In the first step, prompt the model to get candidate solutions.

#### Prompt

Input: 4, 6, 8, 10 Possible next steps: 4+6 = 10 (left: 10, 8, 10) 8-4 = 4 (left 4, 6, 10) 10+4 = 14 (left: 14, 6, 8) Input: 4 9 10 13 Possible next steps:
Generate Output
gpt-3.5-turbo
256
0.7
1

#### Output

**4+9 = 13 (left: 13, 10, 13) 10-4 = 6 (left: 6, 9, 13) 13-9 = 4 (left: 4, 9, 10)**
learnprompting.org
edit this embed
1. In the second step, prompt the model to evaluate all its generated solution Evaluating 13, 10, 13

#### Prompt

Evaluate if the numbers can reach 24 ( sure/likely/impossible) 10 14: 10+14 = 24 sure 10 7 2: 7\*2+10 = 24 sure 11 11: 11 + 11 = 22 impossible 13, 10, 13:
Generate Output
gpt-3.5-turbo
256
0.7
1

#### Output

**10 + 13 + 13 = 36 impossible**
learnprompting.org
edit this embed
Evaluating 6, 9, 13

#### Prompt

Input: 4, 6, 8, 10 Possible next steps: 4+6 = 10 (left: 10, 8, 10) 8-4 = 4 (left 4, 6, 10) 10+4 = 14 (left: 14, 6, 8) Input: 4 9 10 13 Possible next steps:
Generate Output
gpt-3.5-turbo
256
0.7
1

#### Output

**6 \* (13-9) = 24 sure**
learnprompting.org
edit this embed
For each generated node using the propose prompt, the value prompt evaluates it. Then, for all the nodes that are likely to reach the solution, expand them using the propose prompt. Use Breadth First Search (BFS) to expand all nodes at one level before moving on to the nodes at the next level. The process is continued until only the number 24 is left in a node.

##### Creative Writing

The creative writing task helps evaluate the creative thinking and planning abilities of the LLM.
**Problem statement:** Given four random sentences, generate a passage with four paragraphs that end in the input four sentences respectively.
**Step 1:**
First, ask the LLM to generate 5 different plans for the passage.
Plan 1

#### Prompt

Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: 1. It isn't difficult to do a handstand if you just stand on your hands. 2. It caught him off guard that space smelled of seared steak. 3. When she didn't like a guy who was trying to pick her up, she started using sign language. 4. Each person who knows you has a different perception of who you are. Generate a one line plan on how you would write the passage.
Generate Output
gpt-3.5-turbo
256
0.7
1

#### Output

**Paragraph 1: Discuss the simplicity of doing a handstand with confidence. Paragraph 2: Describe an unexpected sensation experienced in space. Paragraph 3: Share a humorous anecdote about using sign language to deter unwanted advances. Paragraph 4: Reflect on the varying perspectives that others have of one's identity.**
learnprompting.org
edit this embed
Plan 2

#### Prompt

Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: 1. It isn't difficult to do a handstand if you just stand on your hands. 2. It caught him off guard that space smelled of seared steak. 3. When she didn't like a guy who was trying to pick her up, she started using sign language. 4. Each person who knows you has a different perception of who you are. Generate a one line plan on how you would write the passage.
Generate Output
gpt-3.5-turbo
256
0.7
1

#### Output

**I would write a passage exploring unique and unexpected experiences, such as doing a handstand, experiencing the scent of space, using sign language to deter unwanted attention, and the varying perceptions others have of our identity. It isn't difficult to do a handstand if you just stand on your hands. As he attempted the acrobatic feat, he found a sense of balance and control he had never experienced before. It caught him off guard that space smelled of seared steak. The astronauts were surprised by the unexpected aroma that filled their spacecraft, a reminder of the richness of Earth's cuisine. When she didn't like a guy who was trying to pick her up, she started using sign language. Her silent communication was a powerful tool in expressing her disinterest and asserting her boundaries. Each person who knows you has a different perception of who you are. Our identities are shaped by the interactions we have with others, each person holding a unique perspective on our true selves.**
learnprompting.org
edit this embed
**Step 2:**
Present all 5 plans to the LLM and ask it to choose the best one. A simple Zero-Shot voting prompt, "analyze choices below, then conclude which is most promising for the instruction," is used.
Repeat this step 5 times and choose the plan (say Plan 1) that gains the maximum votes.
**Step 3**
Use the chosen plan to generate the passage.
The image below illustrates the use of ToT for creative writing tasks.
ToT for creative writing 1

#### What Are Tree of Thoughts Prompting Results?

```
*  In the "Game of 24" task, a mathematical reasoning problem, ToT with b = 1(retaining the best 1 candidate at each step) is comparable to Chain-of-Thought (CoT) Prompting, and ToT with b = 5 beats CoT by a huge margin of 25%.
```

| Method | Success |
| --- | --- |
| IO (best of 100) | 33% |
| CoT (best of 100) | 49% |
| ToT (ours) (b=5) | 74% |

```
*  In creative writing, ToT generates more coherent passages compared to passages generated using Input-Output (IO) prompting and CoT prompting 2.
```

ToT coherency score for creative writing task 1
\* In crossword puzzles, ToT significantly outperforms IO and CoT techniques in word level success rate and also wins 20% of the games compared to the 1% win rate of CoT.
| Method | Success Rate(%) | | |
| ------ | ------ | ------ | ------ |
| | **Letter** | **Word** | **Game** |
| IO | 38.7 | 14 | 0 |
| CoT | 40.6 | 15.6 | 1 |
| ToT | **78** | **60** | **20** |

#### Limitations of Tree of Thoughts Prompting

```
*  Although the ToT framework can help LLMs solve problems that require planning and decision-making, it may not be the most efficient prompting technique for common NLP (Natural Language Processing) tasks as they are too easy for models like GPT-4.
*  ToT is a resource (cost, number of requests, etc.) intensive framework.
```

Cost analysis of the Game of 24 1

#### Conclusion

Tree of Thoughts (ToT) is a practical framework for intellectually demanding tasks that require some planning and look-ahead. However, implementing ToT is demanding in terms of resources consumed and effort required. Consequently, it is wise to use it to solve only those tasks that cannot be solved using techniques like IO prompting and CoT prompting.
Find more on Decomposition Prompting methods.

#### Footnotes

```
1. Shunyu Yao. (2023). Tree of Thoughts: Deliberate Problem Solving with Large Language Models. ↩ ↩ 2 ↩ 3 ↩ 4
1. Jason Wei. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. ↩
```

##### Bhuwan Bhatt

Bhuwan Bhatt, a Machine Learning Engineer with over 5 years of industry experience, is passionate about solving complex challenges at the intersection of machine learning and Python programming. Bhuwan has contributed his expertise to leading companies, driving innovation in AI/ML projects. Beyond his professional endeavors, Bhuwan is deeply committed to sharing his knowledge and experiences with others in the field. He firmly believes in continuous improvement, striving to grow by 1% each day in both his technical skills and personal development.
Edit this page
Previous 🟦 Program of Thoughts
Next 🟦 Chain of Code (CoC)

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
\* What is Tree of Thoughts Prompting?
\* How to Use Tree of Thoughts Prompting?
\* What Are Tree of Thoughts Prompting Results?
\* Limitations of Tree of Thoughts Prompting
\* Conclusion

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
