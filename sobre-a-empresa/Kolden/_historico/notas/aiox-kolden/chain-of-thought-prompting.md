---
id_fonte: "44d0e983-d518-4b1c-a159-9f2e37f05e52"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Chain-of-Thought Prompting"
tipo: "unknown"
url_original: "https://learnprompting.org/docs/intermediate/chain_of_thought"
keywords: "('Prompt Engineering', 'Chain-of-Thought Prompting', 'Large Language Models', 'Multi-Step Reasoning', 'Model Parameter Limitations')"
summary: "This educational guide introduces **Chain-of-Thought (CoT) Prompting**, a strategic method used to enhance the logical reasoning of large language models by requiring them to produce **intermediate reasoning steps**. By structuring the text around clear definitions, **comparative examples**, and empirical data, the source demonstrates how this technique transforms complex problem-solving in areas like mathematics and symbolic logic. The author emphasizes that while CoT significantly boosts performance in **large-scale models**, it can paradoxically hinder smaller models that lack the capacity for coherent self-explanation. Ultimately, the resource serves as both a **technical primer and a practical tutorial**, offering readers a roadmap to navigate the diverse landscape of modern prompt engineering."
extraido_em: "2026-06-30T16:18:42Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Chain-of-Thought Prompting

Chain-of-Thought Prompting
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
🧙♂ Intermediate 🟢 Chain-of-Thought Prompting

### Chain-of-Thought Prompting

🟢 This article is rated easy
Reading Time: 4 minutes
Last updated on October 1, 2024
Valeriia Kuka
Takeaways
\* **Chain-of-Thought (CoT) Prompting** : This technique improves LLM performance by encouraging them to articulate their reasoning process, leading to more accurate answers.
\* **Task Effectiveness** : CoT is particularly beneficial for complex tasks and works best with larger models; smaller models may perform worse.

#### What is Chain-of-Thought Prompting?

**Chain-of-Thought (CoT) Prompting** 1 is a technique that enhances the reasoning capabilities of large language models (LLMs) by incorporating logical steps—or a “chain of thought”—within the prompt. Unlike direct-answer prompting, CoT guides the model to work through intermediate reasoning steps, making it more adept at solving complex tasks like math problems, commonsense reasoning, and symbolic manipulation.

#### How Chain-of-Thought Prompting Differs from Existing Techniques

Traditional prompts typically consist of simple input-output examples and lack explicit reasoning steps, making it challenging for models to infer the necessary logic for tasks requiring multi-step reasoning. CoT prompting addresses this by:
\* **Encouraging Multi-Step Reasoning:** Rather than relying solely on model size for complex tasks, CoT embeds reasoning steps within the prompt, unlocking sophisticated reasoning in models that might otherwise struggle with complexity.
\* **Achieving Efficiency without Finetuning:** CoT works across tasks without the need for finetuning, using a standard prompt format that embeds reasoning, thus simplifying adaptation to various complex tasks.
The example below 1 illustrates the difference between few-shot prompting (left) and CoT prompting (right). While the traditional approach goes directly to the solution, CoT guides the model to lay out its reasoning process, often resulting in more accurate and interpretable outcomes.
Regular Prompting vs CoT (Wei et al.)
The key concept of CoT is that by providing a few examples (or exemplars), where the reasoning process is explicitly shown, the LLM learns to include reasoning steps in its responses. This structured approach to thinking often results in more accurate outputs.

#### How Chain-of-Thought Prompting Works

```
1.  **Decompose the Problem:**  CoT prompts guide the model to break down a complex question into manageable steps, akin to how a human might solve the problem.
1.  **Guide with Exemplars:**  CoT uses examples that demonstrate reasoning steps, helping the model grasp the method needed to reach the correct answer.
```

With CoT, the model essentially “talks through” its thought process, leading to more reliable answers.

##### Applications and Benefits:

CoT prompting is especially valuable for tasks where structured reasoning is crucial:
\* **Mathematics and Arithmetic:** CoT helps solve multi-step word problems by guiding calculations through each necessary step.
\* **Commonsense and Symbolic Reasoning:** Useful for tasks requiring general knowledge or symbolic reasoning, where CoT can bridge the gap between facts and logical connections.
\* **Complex Decision-Making:** In fields like robotics, CoT enables models to follow logical steps for decision-making tasks.

#### How to Use Chain-of-Thought Prompting

Copy

###### Chain-of-Thought Prompting Template

Q: John has 10 apples. He gives away 4 and then receives 5 more. How many apples does he have?
A:
1. John starts with 10 apples.
1. He gives away 4, so 10 - 4 = 6.
1. He then receives 5 more apples, so 6 + 5 = 11. Final Answer: 11
Q: [Your Question]

#### Examples

Here are two demos illustrating how CoT prompting improves outcomes. The first demo shows GPT-3 (davinci-003) struggling with a word problem without CoT, while the second shows it succeeding using CoT.

##### Incorrect Solution (Without CoT)

#### Prompt

Which is a faster way to get to work? Option 1: Take a 1000 minute bus, then a half hour train, and finally a 10 minute bike ride. Option 2: Take an 800 minute bus, then an hour train, and finally a 30 minute bike ride.
Generate Output
gpt-3.5-turbo
256
0
0

#### Output

**Option 1 is a faster way to get to work.**
learnprompting.org
edit this embed

##### Correct Solution (Using CoT)

#### Prompt

Which is a faster way to get home? Option 1: Take an 10 minutes bus, then an 40 minute bus, and finally a 10 minute train. Option 2: Take a 90 minutes train, then a 45 minute bike ride, and finally a 10 minute bus. Option 1 will take 10+40+10 = 60 minutes. Option 2 will take 90+45+10=145 minutes. Since Option 1 takes 60 minutes and Option 2 takes 145 minutes, Option 1 is faster. Which is a faster way to get to work? Option 1: Take a 1000 minute bus, then a half hour train, and finally a 10 minute bike ride. Option 2: Take an 800 minute bus, then an hour train, and finally a 30 minute bike ride.
Generate Output
gpt-3.5-turbo
256
0
0

#### Output

**Option 1 will take 1000+30+10 = 1040 minutes. Option 2 will take 800+60+30 = 890 minutes. Since Option 2 takes 890 minutes and Option 1 takes 1040 minutes, Option 2 is faster.**
learnprompting.org
edit this embed

#### Chain-of-Thought Results

Research has shown that CoT prompting can significantly enhance LLM accuracy on tasks like arithmetic, commonsense, and symbolic reasoning 1. For instance, a prompted PaLM 540B model 2 achieved a 57% solve rate accuracy on GSM8K 3, setting a state-of-the-art (SOTA) benchmark at the time.
The table below summarizes the performance improvements on key benchmarks when using CoT prompting:
| Task | Model | Standard Prompting Accuracy | CoT Prompting Accuracy | Improvement |
| ------ | ------ | ------ | ------ | ------ |
| GSM8K (Math) | PaLM 540B | 55% | 74% | +19% |
| SVAMP (Math) | PaLM 540B | 57% | 81% | +24% |
| Commonsense (CSQA) | PaLM 540B | 76% | 80% | +4% |
| Symbolic Reasoning | PaLM 540B | ~60% | ~95% | +35% |

#### Limitations of Chain-of-Thought

Importantly, according to CoT authors 1, **CoT only yields performance gains when used with models of ∼100B parameters** . Smaller models wrote illogical chains of thought, which led to worse accuracy than standard prompting. Models usually get performance boosts from CoT prompting in a manner proportional to the size of the model.

#### Conclusion

Chain-of-Thought Prompting is a powerful method for unlocking reasoning capabilities in large language models. By encouraging step-by-step thinking, CoT prompting allows models to perform complex reasoning tasks effectively without needing additional training data. The benefits are particularly pronounced in large models (e.g., models with over 100 billion parameters), which exhibit improved reasoning capacities as they follow these structured reasoning prompts.

#### FAQ

##### Why is Chain-of-Thought prompting effective?

Chain-of-Thought prompting works by providing the model with examples of logical reasoning. When shown how to approach problems in a step-by-step way, the LLM is more likely to emulate this approach, resulting in responses that are both accurate and reliable.

##### What is a limitation of Chain-of-Thought prompting?

CoT prompting is less effective with smaller models. To achieve meaningful gains, it's best to apply CoT in proportion to the model's size, as smaller models may produce less coherent reasoning with CoT prompting.

#### Footnotes

```
1. Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain of Thought Prompting Elicits Reasoning in Large Language Models. ↩ ↩ 2 ↩ 3 ↩ 4
1. Chowdhery, A., Narang, S., Devlin, J., Bosma, M., Mishra, G., Roberts, A., Barham, P., Chung, H. W., Sutton, C., Gehrmann, S., Schuh, P., Shi, K., Tsvyashchenko, S., Maynez, J., Rao, A., Barnes, P., Tay, Y., Shazeer, N., Prabhakaran, V., … Fiedel, N. (2022). PaLM: Scaling Language Modeling with Pathways. ↩
1. Cobbe, K., Kosaraju, V., Bavarian, M., Chen, M., Jun, H., Kaiser, L., Plappert, M., Tworek, J., Hilton, J., Nakano, R., Hesse, C., & Schulman, J. (2021). Training Verifiers to Solve Math Word Problems. ↩
```

##### Valeriia Kuka

Valeriia Kuka, Head of Content at Learn Prompting, is passionate about making AI and ML accessible. Valeriia previously grew a 60K+ follower AI-focused social media account, earning reposts from Stanford NLP, Amazon Research, Hugging Face, and AI researchers. She has also worked with AI/ML newsletters and global communities with 100K+ members and authored clear and concise explainers and historical articles.
Edit this page
Previous 🟢 Introduction
Next 🟢 Zero-Shot Chain-of-Thought

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
\* What is Chain-of-Thought Prompting?
\* How Chain-of-Thought Prompting Differs from Existing Techniques
\* How Chain-of-Thought Prompting Works
\* How to Use Chain-of-Thought Prompting
\* Examples
\* Chain-of-Thought Results
\* Limitations of Chain-of-Thought
\* Conclusion
\* FAQ

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
