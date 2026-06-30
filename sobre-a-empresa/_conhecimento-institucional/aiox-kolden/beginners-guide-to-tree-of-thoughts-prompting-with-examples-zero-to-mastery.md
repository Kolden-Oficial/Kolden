---
id_fonte: "2234ae96-1fbc-4e10-b8e3-719d1bb71a9c"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Beginner's Guide To Tree Of Thoughts Prompting (With Examples) | Zero To Mastery"
tipo: "unknown"
url_original: "https://zerotomastery.io/blog/tree-of-thought-prompting/"
keywords: "('Tree of Thoughts', 'Prompt Engineering', 'Large Language Models', 'Iterative Reasoning', 'Problem Solving Framework')"
summary: "The provided guide introduces **Tree of Thoughts (ToT)**, a sophisticated prompting framework designed to overcome the linear limitations of standard AI reasoning by mimicking **human problem-solving**. Rather than producing a single immediate response, ToT creates a **tree-like structure** that allows a model to **generate, evaluate, and prune** multiple potential ideas simultaneously. This systematic approach excels at **complex challenges**—such as the \"Game of 24\"—by utilizing search algorithms to navigate through various reasoning branches and discard unproductive paths. Users can implement this methodology through **custom code**, manual **prompt chaining**, or **zero-shot templates** that simulate a collaborative expert panel. Ultimately, the text serves as an educational resource to help users transition from basic interactions to **structured decision-making** that maximizes the strategic potential of large language models."
extraido_em: "2026-06-30T16:18:31Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Beginner's Guide To Tree Of Thoughts Prompting (With Examples) | Zero To Mastery

Beginner's Guide To Tree Of Thoughts Prompting (With Examples) | Zero To Mastery
🔥 **SPRING FLASH SALE** 🔥
**Use Code: SPRING30 to get 30% OFF an annual membership. Expires soon 👇**
00 DAYS 13 HOURS 47 MINS 58 SECS
Join ZTM

### Beginner's Guide To Tree Of Thoughts Prompting (With Examples)

[

###### Scott Kerr

](<https://zerotomastery.io/about/instructor/scott-kerr>)
January 6th, 2025
14 min read

#### In This Guide:

#### In This Guide:

```
*  What is Tree of Thoughts Prompting?
*  How does Tree of Thoughts Prompting work?
*  Why use Tree of Thoughts Prompting?
*  Tree of Thoughts Prompting vs. ReAct Prompting
*  How to implement Tree of Thoughts Prompting
    *  Option #1. Implement Tree of Thoughts via Code
    *  Option #2. Implement Tree of Thoughts via Prompt Chaining
    *  Option #3. Implement Tree of Thoughts via Zero Shot ToT
*  Give Tree of Thoughts Prompting a try for yourself!
```

###### Want a career in tech?

Take our career path quiz to find the best fit for you and get a personalized step-by-step roadmap 👇
Take The 3-Minute Quiz Take The 3-Minute Quiz
Have you ever felt like AI models rush to give answers, skipping over the deeper reasoning steps that a human would naturally consider?
Of course you have! It's a common problem for new users to LLM's.
However, imagine if instead of this happening, you could guide an AI to slow down, think more deliberately, and explore multiple possibilities before arriving at the best solution—just like you would when solving a challenging problem.
That's where Tree of Thoughts prompting (ToT) comes in. It's not just another prompting technique — it's a structured framework that helps AI reason step-by-step, evaluate ideas, and make smarter decisions.
In this guide, we'll break down what Tree of Thoughts is, how it works, and why it's such a powerful tool for tackling complex challenges. Whether you're just starting out with prompting or looking to refine your techniques, you're in the right place.
Let's get started.
**Sidenote:** If you want to dive deep into Prompt Engineering, then check out my Prompt Engineering Bootcamp:
I guarantee you that this is the most comprehensive, up-to-date, and best prompt engineering bootcamp course online, and includes everything you need to learn the skills needed to be in the top 10% of those using AI in the real world.
Learn how Large Language Models (LLMs) actually work and how to use them effectively!
**Want to check it out for free?** I've added links to different lessons from the course in this guide that fit specific sections, so be sure to give them a watch.
With that out of the way, let's get into this guide…

#### What is Tree of Thoughts Prompting?

Tree of Thoughts prompting, (often mistakenly referred to without the 's' on thoughts), is a framework designed to replicate human problem-solving processes.
Originating from a 2023 paper by a team of researchers at Princeton and Google DeepMind ( Yao et al., 2023) as well as in in a separate paper from a AI researcher ( Long, 2023), the method stands out as one of the most systematic approaches to guiding LLMs.
Why?
Well, unlike simpler prompting methods that rely on static input-output models, ToT involves iterative exploration and evaluation, mimicking how we solve problems in real life.

##### How does Tree of Thoughts prompting compare to other prompting techniques?

To understand ToT, we need to understand the other prompting methods that came before it.
1. **Input-Output Prompting** : The simplest form. Basically you feed the model input and get output. You can think of this as how a new user might use ChatGPT. They ask a question and get a basic answer back
1. **Chain of Thought (CoT)** : This method introduces intermediate reasoning steps, encouraging the model to think aloud and break down the problem. Often from performing a sequence of prompts. Here the original user might get the answer to a question and then ask a follow up clarifying question
1. **Self-Consistency with CoT** : This method takes it further by generating multiple independent reasoning chains and selecting the most consistent solution through a form of "voting" to provide the best answer it thinks from possible options

#### How does Tree of Thoughts Prompting work?

So how does Tree of thoughts fit into this? Well, Tree of Thoughts takes these concepts to the next level.
Instead of focusing on linear reasoning or independent paths, ToT creates a **tree-like structure** where multiple thoughts branch out at each step.
Promising ideas are explored further, while less viable ones are discarded. It's a dynamic, interconnected process, much like brainstorming and decision-making in real life.
Picture a tree diagram, where each **node** represents a thought as an intermediate step in solving a problem.
These thoughts branch out, creating paths that the model explores, evaluates, and refines.
Here's how it works step-by-step:
1. **Generate Thoughts** : Starting from an initial input, the model generates multiple thoughts or potential solutions
1. **Evaluate Thoughts** : At each step, the model assesses which thoughts are worth pursuing (green nodes) and which should be discarded (red nodes)
1. **Expand Promising Thoughts** : Viable thoughts branch out further, generating new nodes to explore.
1. **Search for the Best Solution** : Using algorithms like **breadth-first search (BFS)** or **depth-first search (DFS)** , the model navigates through the tree, systematically narrowing down to the most promising path
For a relatable analogy, imagine planning a vacation. You start with a broad question of “ *Where should I go on holiday?”*
From that initial idea, your thoughts branch out to potential options. Perhaps a beach, a city, or a ski resort.
However, based on personal preferences (e.g., you dislike the cold), you rule out skiing. And so from there, you narrow down specific cities and finally settle on Paris because you want to see the Eiffel Tower.
This iterative decision-making process mirrors how ToT works. Especially the part where we can help guide those decisions to get the best answer.

#### Why use Tree of Thoughts Prompting?

Tree of Thoughts (ToT) stands out as one of the most effective frameworks for guiding AI reasoning, especially in tasks that require **deep exploration** and **structured decision-making.**
Unlike other prompting techniques, ToT doesn't rely on a single reasoning path—it branches out, explores multiple options, and carefully evaluates each one before proceeding.
Here's why that matters:
\* **Iterative Exploration:** Instead of committing to a single chain of reasoning, ToT allows the model to explore several paths simultaneously. This approach increases the likelihood of finding the best solution, even in complex or ambiguous problems
\* **Error Mitigation:** By discarding weaker ideas early in the process, ToT prevents wasted time and computational resources on unproductive paths. The focus remains on refining promising branches
\* **Adaptability:** ToT isn't confined to a specific domain. Whether it's solving intricate math problems, crafting creative stories, or optimizing logistics plans, the framework adapts to the unique challenges of each scenario
These strengths aren't just theoretical thought, because they've been tested and validated in real-world applications.
**For example**
You can clearly see the difference in ToT's effectiveness, when its tested with the **Game of 24** .
If you don't know what this is, it's a problem solving exercise, where players must combine four numbers using only arithmetic operations (addition, subtraction, division, multiplication) to reach exactly 24.
For example: if I give you the four numbers 8, 3, 3, and 2, how can you use these to equal 24?
Well, you could do: (8 ÷ 2) × (3 + 3) = 24. Yay, you just won the Game of 24!
As you can imagine, it's a task that requires careful reasoning, exploration of multiple possible solutions, and strategic evaluation - making it a perfect test case for AI tools.
However, not every method is great at solving this. In fact, when researchers applied different prompting methods to the problem, the results spoke volumes:
\* **Input-Output Prompting:** 7.3% success rate
\* **Chain of Thought Prompting:** 4% success rate
\* **Self-Consistency with CoT:** 9% success rate
\* **Tree of Thoughts (B=1):** 45% success rate
\* **Tree of Thoughts (B=5):** 74% success rate
The B parameter here represents the **number of thought branches explored at each step:**
\* With **B=1** , the model focused on only the most promising branch at each stage
\* With **B=5** , the AI explored the top five branches simultaneously, dramatically increasing its chances of success
These numbers highlight more than just performance though. They demonstrate the fundamental advantage of ToT in that **it doesn't rely on guesswork or brute force. It systematically explores, evaluates, and refines paths to arrive at the most effective solution** .

##### TL;DR

In short, Tree of Thoughts isn't just about making the AI think. It's about helping it think smarter, with structure, intention, and adaptability.
Tree of Thoughts represents a significant leap in how we think about prompting and problem-solving with LLMs. By embracing iterative exploration, evaluation, and refinement, this method pushes the boundaries of what AI models can achieve.
We'll get into how to use ToT in just a second, but there's one more prompting method we need to look at first.

#### Tree of Thoughts Prompting vs. ReAct Prompting

I'll cover this a lot more in a future post, but it's worth contrasting ToT with another advanced method, **ReAct prompting** .
Here's the mile high overview: ReAct combines reasoning with action, allowing the model to correct itself mid-prompt which is fantastic.
However, while powerful, ReAct still follows a single reasoning chain, making it less robust in exploring multiple possibilities simultaneously. ToT, on the other hand, thrives in environments requiring broad exploration and systematic pruning of ideas.
So as a rule of thumb:
\* Use Tree of Thoughts (ToT) if the problem requires exploring multiple reasoning paths, evaluating intermediate ideas, and systematically narrowing down options to find the best solution
\* Use ReAct if the task involves real-time feedback, taking actions step-by-step, and self-correcting based on immediate results
So now that you know how it works, let's get into how to actually use this.

#### How to implement Tree of Thoughts Prompting

Implementing **Tree of Thoughts (ToT)** can be approached in several ways, but every method follows the same **four core steps** :
1. **Decompose the Problem:** Break the problem into smaller, intermediate steps to make it more manageable
1. **Generate Potential Thoughts:** Propose multiple ideas or solutions at each step.
1. **Evaluate Thoughts:** Assess each idea, discarding weaker ones and focusing on the most promising directions
1. **Search the Tree:** Use strategies like **Breadth-First Search (BFS)** for exploring multiple paths or **Depth-First Search (DFS)** for diving deeper into a specific path
How you implement these steps depends on your tools, technical skills, and goals. Let's break down the three main approaches.

##### Option #1. Implement Tree of Thoughts via Code

If you're comfortable with coding, this method offers the **most precise and flexible way** to implement Tree of Thoughts.
It's also ideal for scenarios where you need **systematic control** over how thoughts are generated, evaluated, and explored. By using code, you can fine-tune every stage of the process and automate decision-making.
In a code-based setup:
\* You can **generate multiple reasoning paths** programmatically for each step of the problem
\* Define **custom scoring rules** to evaluate and prioritize the best ideas
\* Filter out weaker branches automatically to focus on the most promising ones
\* Apply **search algorithms** like **Breadth-First Search (BFS)** for wide exploration or **Depth-First Search (DFS)** for focused, deep reasoning
For example, you might write logic to **score each thought based on relevance or confidence levels** . Paths with low scores can be discarded automatically, allowing the AI to prioritize stronger reasoning directions.
This method is particularly useful if you want to:
\* **Integrate ToT into larger systems or applications**
\* **Experiment with different evaluation metrics and search strategies**
\* **Automate complex reasoning tasks** without constant manual intervention
The research team behind this method has provided an official GitHub repo where you can access the code, run it yourself, and explore example implementations.
If you'd like to learn more and see an example implementation, you can watch this lesson from my Prompt Engineering Bootcamp (Working With LLMs) course for free: Lesson: Tree of Thoughts - Part 3 (ToT via Code)
This is the most accurate and proper method to implement ToT, but there are other, simpler variations of this as well, as discussed below.

##### Option #2. Implement Tree of Thoughts via Prompt Chaining

If you're not diving into code but still want control over the reasoning process, **Prompt Chaining** is an excellent way to implement Tree of Thoughts.
This method uses **a series of iterative prompts** to guide the AI through the thought tree step-by-step. It's a hands-on approach that keeps you in control while leveraging the AI's reasoning capabilities.
Here's how it works:
1. **Start with a Clear Problem Statement:** Frame the initial question to set up focused reasoning. Example: “What are three strategies to optimize warehouse logistics?”
1. **Generate Multiple Ideas:** Ask the AI to propose several possible approaches or solutions. Example: “List three possible strategies for improving warehouse efficiency.”
1. **Evaluate the Ideas:** Use follow-up prompts to assess and refine the suggestions, discarding weaker ones. Example: “Evaluate these strategies and explain which seems most effective.”
1. **Expand on the Best Path:** Guide the AI to focus on the most promising idea and generate follow-up steps. Example: “Based on the best strategy, outline three concrete actions to implement it.”
With Prompt Chaining, you can **pause, evaluate, and redirect the AI** at every stage, allowing for more deliberate control over the reasoning process. It's especially effective for **open-ended problems** or scenarios where you want to adjust direction based on intermediate results.
This approach works seamlessly in tools like **ChatGPT** , where you can interact dynamically without requiring any coding expertise.
If you'd like to learn more and see an example implementation, you can watch this lesson from my course for free: Lesson: Tree of Thoughts - Part 4 (ToT via Chaining)

##### Option #3. Implement Tree of Thoughts via Zero Shot ToT

Zero Shot ToT is the **simplest way to experiment with Tree of Thoughts** using a **single, structured prompt** .
Instead of manually chaining prompts or writing code, you guide the AI to simulate multiple reasoning paths and self-correct—all in one go.
This method, (popularized by **dave1010** ), relies on a carefully crafted prompt. The prompt is as follows (from dave1010's official GitHub repo):

```
Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking, then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realises they're wrong at any point then they leave.
The question is…
```

In this setup:
\* The AI role-plays as **three different experts** working collaboratively
\* Each expert contributes one reasoning step, shares their thought, and evaluates if they should continue
\* If an expert realizes an error, they drop out
\* The process continues step-by-step until the strongest reasoning path emerges as the final answer
This approach works seamlessly in tools like **ChatGPT** and is perfect for quick experimentation without requiring coding or iterative prompt chaining.
If you'd like to learn more and see an example implementation, you can watch this lesson from my course for free: Lesson: Tree of Thoughts - Part 5 (“Zero Shot ToT)

#### Give Tree of Thoughts Prompting a try for yourself!

As you can see, Tree of Thoughts (ToT) is a powerful framework for guiding AI through complex reasoning tasks. By breaking problems into smaller steps, exploring multiple ideas, and systematically evaluating paths, ToT delivers clearer, smarter outcomes across a variety of challenges.
It's such a core skill for developers of any experience to learn.
That being said, the best way to understand the power of ToT is to try it out yourself. Pick a method, set up your problem, and guide your AI towards better, more structured reasoning.

##### P.S.

Remember, if you want to dive into all things Prompt Engineering, then check out my complete course:
Once you take this, you can stop memorizing random prompts, and instead, learn how Large Language Models (LLMs) actually work and how to use them effectively. This course will take you from being a complete beginner to the forefront of the AI world.
Plus, once you join, you'll have the opportunity to ask questions in our private Discord community from me, other students, and working tech professionals and Prompt Engineers!
Tap to unmute
Your browser can't play this video.
Learn more

### An error occurred.

Try watching this video on [www.youtube.com](http://www.youtube.com), or enable JavaScript if it is disabled in your browser.
What do you have to lose?

###### Best articles. Best resources. Only for ZTM subscribers.

If you enjoyed Scott's post and want to get more like it in the future, subscribe below. By joining over 400,000 ZTM email subscribers, you'll receive exclusive ZTM posts, opportunities, and offers.
SUBSCRIBE
No spam ever, unsubscribe anytime

#### You might like these courses

Beginner
Prompt Engineering Bootcamp (Working With AI & LLMs): Zero to Mastery 32 Hours • 290 Lessons Stop memorizing random prompts. Instead, learn how Large Language Models (LLMs) actually work and how to use them effectively. This course will take you from being a complete beginner to the forefront of the AI world.
Scott Kerr
Start Learning Course Details
Beginner
AI for Beginners: Inside Large Language Models 3 Hours • 26 Lessons Learn how Large Language Models (LLMs) actually work so that you can understand both where this breakthrough technology excels and its shortcomings.
Scott Kerr
Start Learning Course Details
Beginner
Introduction to ChatGPT Code Interpreter 2.5 Hours • 17 Lessons Discover the power of ChatGPT's Code Interpreter tool with this byte-sized course, diving into data analysis, machine learning and more, using real-world data.
Diogo Resende
Start Learning Course Details

#### More from Zero To Mastery

How To Use ChatGPT To 10x Your Coding
15 min read
Trying to use ChatGPT to code but keep getting stuck? Learn how to use it properly in this guide with examples, prompt tips, and real coding help!
Alex Hyett
Advance Your Career
Web Development
Beginner's Guide to ChatGPT Code Interpreter (With Code Examples)
22 min read
Discover how to use the ChatGPT Code Interpreter with code examples to automate tasks, analyze data, and simplify coding—even if you're just getting started.
Diogo Resende
Data Analytics
Tutorials
How To Become A 10x Developer: Step-By-Step Guide
21 min read
10x developers make more money, get better jobs, and have more respect. But they aren't some mythical unicorn and it's not about cranking out 10x more code. This guide tells you what a 10x developer is and how anyone can become one.
Andrei Neagoie
Web Development
Career Advice
Advance Your Career
Quick Links Home Pricing Testimonials Blog Cheat Sheets Industry Newsletters Community
The Academy Courses Career Paths Career Path Quiz Web Development Machine Learning & AI Generative AI Data Analytics DevOps & Cloud Design Cyber Security Lifetime Challenge Learning Passport
Company About ZTM Ambassadors Contact Us
Privacy Terms Cookies
Copyright © 2026, Zero To Mastery Inc.
