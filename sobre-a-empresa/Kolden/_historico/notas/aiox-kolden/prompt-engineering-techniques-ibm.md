---
id_fonte: "9beb2c40-52a8-4391-858c-e1f13c8719d3"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Prompt Engineering Techniques | IBM"
tipo: "unknown"
url_original: "https://www.ibm.com/think/topics/prompt-engineering-techniques"
keywords: "('Prompt engineering techniques', 'Large language models', 'Prompt optimization methods', 'AI security risks', 'Generative AI applications')"
summary: "This IBM technical guide serves as a comprehensive primer on **prompt engineering techniques**, which are strategic methods used to refine the way humans communicate with **generative AI models**. The text categorizes various instructional styles—ranging from **direct and open-ended commands** to complex reasoning frameworks like **chain of thought and tree of thoughts**—to show how specific inputs can drastically improve the accuracy and relevance of machine outputs. By exploring advanced concepts such as **retrieval augmented generation (RAG)** and **agentic prompting**, the source illustrates how to overcome common obstacles like **AI hallucinations** while maximizing the model's performance. Ultimately, the guide functions as an educational roadmap for users to **optimize AI interactions** across diverse industries, ensuring that large language models are tailored effectively to meet specialized professional needs."
extraido_em: "2026-06-30T16:21:43Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Prompt Engineering Techniques | IBM

Prompt Engineering Techniques | IBM
What's new
Skip to content [](javascript:void 0) [](javascript:void 0)
My IBM Log in
Think
\* Overview
\* Artificial intelligence
\* Cloud
\* Security
\* News
\* Videos
\* Overview
\* AI Academy
\* Think 2025 on demand
\* Webinars
\* Reports
\* Cost of a Data Breach Report 2025
\* The 2025 CEO Study
\* IBM X-Force 2025 Threat Intelligence Index
\* Industries in the AI era
\* Orchestrating agentic AI for intelligent business operations
\* Scaling supply chain resilience: Agentic AI for autonomous operations
\* AI in Action report
\* State of Sustainability Readiness Report
\* View all IBV reports
\* Podcasts
\* Overview
\* AI in Action
\* Mixture of Experts
\* Security Intelligence
\* Smart Talks with IBM
\* Techsplainers
\* The Coherence Times
\* Transformers Podcast
\* Events
\* Think 2026
\* Think on Tour
\* TechXchange
\* View all IBM Events
\* More

#### Topics

```
*  Analytics
    *  Asset management
    *  Business automation
    *  Business operations
    *  Compute and servers
    *  DevOps
    *  IT automation
    *  IT infrastructure
    *  Middleware
    *  Network
    *  Quantum
    *  Security
    *  Storage
    *  Sustainability
```

#### Content types

```
*  Explainers
    *  Insights
    *  News
    *  Newsletters
    *  Reference architectures
    *  Tutorials
```

#### Industries

```
*  Automotive
    *  Banking
    *  Consumer Goods
    *  Energy & Utilities
    *  Government
    *  Healthcare
    *  Manufacturing
    *  Retail
    *  Telecommunications
    *  Travel View all
*  Subscribe
```

### Prompt engineering techniques

```
*  Overview
*  Understanding prompts
*  Key techniques in prompt engineering
*  Challenges with prompt engineering techniques
*  Applications of prompt engineering techniques
*  Future of prompt engineering techniques
*  Summary
```

Prompt Engineering Guide
\* Welcome
\* Introduction
\* Overview
\* Prompt Engineering Techniques
\* RAG vs. fine-tuning vs. prompt engineering
\* Agentic prompting
\* Prompt chaining
\* Overview
\* Tutorial: Prompt Chaining with Langchain
\* Tree of Thoughts (ToT)
\* Meta prompting
\* Iterative prompting
\* Tutorial - IT incident analysis and resolution assistant
\* ReAct Prompting
\* Example-based prompting
\* Zero Shot Prompting
\* Overview
\* One Shot Prompting
\* Few Shot Prompting
\* Overview
\* Tutorial: Few Shot Prompting with Langchain
\* Prompt hacking and security
\* Prompt injection
\* Overview
\* Prompt Injection Prevention
\* How AI can be hacked with prompt injection
\* AI jailbreak
\* When AI chatbots break bad
\* Prompt Optimization
\* Overview
\* DSPy
\* Overview
\* Prompt Engineering with DSPy
\* Prompt caching
\* Overview
\* Tutorial: Implementation of prompt caching
\* Prompt Reasoning Enhancement
\* Chain of thoughts
\* Directional stimulus prompting
\* Tutorial: Role prompting
\* In-context learning
\* Prompt tuning
\* Overview
\* Tutorial: Prompt tune a Granite model

#### Author(s):

Vrunda Gadesha
AI Advocate | Technical Content Author
Prompt engineering techniques are strategies used to design and structure prompts, input queries or instructions, provided to AI models, particularly large language models (LLMs) such as openAI's GPT-4, Google Gemini or IBM® Granite TM. These techniques aim to guide generative AI (gen AI) systems to produce accurate, relevant and contextually appropriate responses, enabling users to achieve desired outputs effectively.
Large language models, which are built on advanced machine learning algorithms, are capable of understanding and generating human-like text. Prompt engineering leverages this capability by crafting inputs that help the model perform complex tasks, such as summarization, translation, creative writing, or problem-solving, with greater precision. By experimenting with different prompt structures, users can influence the behavior of LLMs to optimize their performance across diverse applications.
As generative AI continues to play a key role in various domains, understanding prompt engineering techniques has become essential for unlocking its full potential and tailoring AI models to meet specific needs efficiently.

#### Understanding prompts

A prompt is the input text or query provided to an AI model, such as a large language model to generate a response. It serves as the primary mechanism for guiding the model's behavior, defining the task and setting the context for the interaction. The design of a prompt significantly impacts the quality and relevance of the output, making it essential to choose the right type of prompt for specific tasks.
To achieve the best results from AI models, it is essential to understand the various ways prompts can be structured to suit different tasks and objectives. There are three primary ways to structure the prompt: direct instructions, open-ended instructions and task-specific instructions.
**Direct instructions** are clear and specific commands that tell the AI exactly what to do. These prompts are ideal for straightforward tasks where the user has a clear expectation of the output. **Direct prompts** rely on the model's ability to parse explicit instructions and generate responses that align closely with the command. The more detailed the instruction, the more likely the output will meet expectations.
Example:

```
Write a poem about nature.
```

Copy to clipboard
In this case, the AI knows the exact format *[a poem]* and topic *[nature]* to generate the text.
**Open-ended instructions** are less restrictive and encourage the AI to explore broader ideas or provide creative and interpretive responses. These prompts are useful for brainstorming, storytelling or exploratory discussions where the user values variety and originality in the output. **Open-ended prompts** tap into the model's generative capabilities without imposing constraints. The model relies on its training data to infer the best approach to the prompt, which can produce diverse or unexpected results.
Example:

```
Tell me about the universe.
```

Copy to clipboard
Here, the AI has the freedom to decide what aspects of the universe to discuss, such as its *origin, structure or scientific theories* .
**Task-specific instructions** are designed for precise, goal-oriented tasks, such as translations, summarization or calculations. These prompts are often crafted with clarity and can include additional context or examples to help ensure accurate responses. **Task-specific prompts** leverage the model's understanding of specialized tasks. They can incorporate advanced prompting techniques like few-shot prompting (providing examples) or zero-shot prompting (providing no examples but relying on the model's pretrained knowledge).
Example:

```
Translate this text into French: ‘Hello.’
```

Copy to clipboard
The model understands both the language translation task and the specific input text, enabling it to produce the desired output: “Bonjour.”
By understanding these types of prompts and the technical nuances behind them, users can craft prompts that guide AI models effectively, optimizing the quality and relevance of the responses.

#### Think beyond the prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox, twice weekly. See the IBM Privacy Statement.

#### Thank you!

You are subscribed.
First name\*
Field required
Last name\*
Field required
Business email\*
Field required. Must be valid email. [example@yourdomain.com](mailto:example@yourdomain.com)
Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. Refer to our IBM Privacy Statement for more information.
Subscribe

#### Key techniques in prompt engineering

To maximize the effectiveness of AI models, prompt engineering employs a variety of techniques tailored to different tasks and objectives. The following are several key techniques, each explained with examples of prompts designed to achieve specific outcomes.
To demonstrate the effectiveness of various prompt engineering techniques, Let's check a single task as the central use case: explaining climate change. The task is framed as follows:

```
Explain the concept of climate change, its causes, and its effects in a way that is accessible to a general audience.
```

Copy to clipboard
Each technique approaches the task differently, offering varying levels of guidance, complexity, and methodology. Below, we explore how these techniques can be applied to this use case, with prompts tailored to highlight their unique capabilities.

###### Zero-shot prompting

Zero-shot prompting involves asking the model to perform a task without providing any prior examples or guidance. It relies entirely on the AI's pretrained knowledge to interpret and respond to the prompt. [1]
Example prompt:

```
Explain the concept of climate change, its causes, and its effects in simple terms.
```

Copy to clipboard
The model is given no prior examples or additional context and must rely solely on its pretrained knowledge to generate the output.

###### Few-shot prompting

Few-shot prompting includes a small number of examples within the prompt to demonstrate the task to the model. This approach helps the model better understand the context and expected output. [2]
Example prompt:

```
Here are some examples of how to explain complex topics:



- Topic: Photosynthesis

- Explanation: Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into energy and oxygen.

- Topic: Gravity

- Explanation: Gravity is the force that pulls objects toward each other, like how the Earth pulls us to its surface.



Now explain: Climate Change.
```

Copy to clipboard Show more
By providing a few examples of how to explain other topics, the model is guided on the tone and level of simplicity expected for the climate change explanation.

###### Chain of thought (CoT) prompting

CoT prompting encourages the model to reason through a problem step by step, breaking it into smaller components to arrive at a logical conclusion. [3]
Example prompt:

```
Step 1: Define what climate change is.

Step 2: Explain the causes of climate change.

Step 3: Describe its effects on the planet.



Now, follow these steps to explain climate change.
```

Copy to clipboard
The model is encouraged to think step by step, breaking down the explanation into smaller, logical parts for clarity.

###### Meta prompting

Meta prompting involves asking the model to generate or refine its own prompts to better perform the task. This technique can improve output quality by leveraging the model's ability to self-direct. [4]
Example prompt:

```
Create a prompt that will help you explain climate change, its causes, and its effects in simple terms
```

Copy to clipboard
The model generates its own prompt before attempting to explain the topic, potentially improving the relevance and quality of the output.

###### Self-consistency

Self-consistency uses multiple independent generations from the model to identify the most coherent or accurate response. It's particularly useful for tasks requiring reasoning or interpretation. [5]
Example prompt:

```
Provide three different explanations of climate change, its causes, and its effects. Then identify the most coherent and clear explanation
```

Copy to clipboard
The model produces multiple independent responses and selects the most consistent or coherent one as the final output.

###### Generate knowledge prompting

This technique involves asking the model to generate background knowledge before addressing the main task, enhancing its ability to produce informed and accurate responses. [6]
Example prompt:

```
Before explaining climate change, first list the key scientific principles related to it. Once done, use these principles to explain the concept, its causes, and its effects.
```

Copy to clipboard
The model generates background knowledge first (for example, greenhouse gases, global warming) to provide a more informed explanation.

###### Prompt chaining

Prompt chaining involves linking multiple prompts together, where the output of one prompt serves as the input for the next. This technique is ideal for multistep processes.
Example prompt:

```
What is climate change? Provide a brief definition.
```

Copy to clipboard
Next prompt based on the previous response:

```
What are the primary causes of climate change?
```

Copy to clipboard
Next prompt based on the previous response:

```
What are the effects of climate change on the environment and human life?
```

Copy to clipboard
The task is divided into a chain of smaller prompts, with the output of each step feeding into the next for a more structured explanation.

###### Tree of thoughts prompting

Tree of thoughts prompting encourages the model to explore multiple branches of reasoning or ideas before arriving at a final output. [7][8]
Example prompt:

```
List three possible ways to explain climate change to a general audience. For each method, describe its advantages and disadvantages. Then choose the best explanation and elaborate on it
```

Copy to clipboard
The model explores multiple approaches to the explanation and selects the most effective one, providing a well-rounded output.

###### Retrieval augmented generation (RAG)

Retrieval augmented generation (RAG) combines external information retrieval with generative AI to produce responses based on up-to-date or domain-specific knowledge. [9]
Example prompt:

```
Using the global temperature datasets from NASA GISS (GISTEMP) dataset on climate science, explain climate change, its causes, and its effects in simple terms.
```

Copy to clipboard
The model combines its generative abilities with external knowledge to produce an informed explanation.

###### Automatic reasoning and tool-use

This technique integrates reasoning capabilities with external tools or application programming interfaces (APIs), allowing the model to use resources like calculators or search engines. [10]
Example prompt:

```
Use the provided climate data to calculate the global temperature rise over the last century, and then explain how this relates to climate change, its causes, and its effects.
```

Copy to clipboard
The model integrates reasoning with external tools (for example, calculators or APIs) to analyze data and provide a data-driven explanation.

###### Automatic prompt engineer

This method involves using the AI itself to generate and optimize prompts for specific tasks, automating the process of crafting effective instructions.
Example prompt:

```
Generate a prompt that will help explain climate change, its causes, and effects. Then use the generated prompt to provide the explanation.
```

Copy to clipboard
The model automates the creation of an optimized prompt to improve the quality of its response.

###### Active-prompt

Active-prompting dynamically adjusts the prompt based on intermediate outputs from the model, refining the input for better results. [11]
Initial prompt

```
Explain climate change, its causes, and its effects in simple terms.
```

Copy to clipboard
Follow-up prompt

```
Add more detail about the causes of climate change, focusing on human activities.
```

Copy to clipboard
The prompt dynamically evolves based on the intermediate output, refining the response over iterations.

###### Directional stimulus prompting

Directional stimulus prompting (DSP) uses directional cues to nudge the model toward a specific type of response or perspective. [12]
Example prompt:

```
Explain the concept of climate change from an environmentalist’s perspective, focusing on the need for immediate action.
```

Copy to clipboard
The model is nudged toward a specific perspective or tone, influencing the framing of its explanation.

###### Program-aided language models (PALM)

PALM integrates programming capabilities to augment the model's reasoning and computational skills. [13]
Example prompt:

```
Write Python code to visualize the increase in global temperatures over time. Then explain how this data relates to climate change, its causes, and its effects.
```

Copy to clipboard
The model combines programming with language generation to provide both a visualization and an explanation.

###### ReAct

ReAct combines reasoning and acting prompts, encouraging the model to think critically and act based on its reasoning. [14]
Example prompt:

```
Analyze the following climate data and identify key trends. Based on your analysis, explain the concept of climate change, its causes, and its effects.
```

Copy to clipboard
This example illustrates how the model can combine analytical reasoning with actionable insights.

###### Reflexion

Reflexion allows the model to evaluate its previous outputs and refine them for improved accuracy or coherence. [15]
Example prompt:

```
Here is my first attempt at explaining climate change: [Insert initial output]. Review this explanation and improve it for clarity and accuracy.
```

Copy to clipboard
The model reflects on its previous output and iteratively improves it.

###### Multimodal chain of thought (multimodal CoT)

This technique integrates chain of thought reasoning across multiple modalities, such as text, images or audio. [16]
Example prompt:

```
Analyze this infographic on global warming trends, then explain climate change, its causes, and its effects step by step
```

Copy to clipboard
The model integrates reasoning across multiple modalities (text and images) to deliver a comprehensive explanation.

###### Graph prompting

Graph prompting leverages graph-based structures to organize and reason through complex relationships between concepts or data points.
Example prompt:

```
Using the provided graph of CO₂ emissions over time, explain how it relates to climate change, its causes, and its effects.
```

Copy to clipboard
The model uses graph-based reasoning to connect data points and generate an insightful explanation.
Thus, we can see how different prompt engineering techniques can be applied to a single task. By using the same task across methods such as zero-shot, few-shot, chain of thought and tree of thoughts, we can see how each technique structures the task differently and guides the AI to produce unique responses. These examples showcase the flexibility and creativity of prompt engineering in solving a variety of challenges. Readers are encouraged to try these prompt examples with different AI models or applications, such as IBM Granite models, OpenAI's ChatGPT, Google's Bard, Anthropic's Claude, Cohere or AI21 Labs' Jurassic. Doing so allows users to see how outputs vary and find what works best for their needs.
AI Academy

##### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.
Watch the series

#### Challenges with prompt engineering techniques

While prompt engineering techniques are powerful, they come with several challenges. Crafting effective prompts that consistently produce accurate outputs can be difficult, especially for tasks requiring complex reasoning, common sense understanding or nuanced responses. Hallucination is another common issue, where gen AI models generate information that is inaccurate or entirely fabricated. Relying on structured templates or fine-tuning the model can help mitigate some of these issues, but designing prompts that work across diverse scenarios remains a trial-and-error process. Additionally, balancing the general capabilities of artificial intelligence with task-specific objectives can be tricky, particularly for specialized or domain-specific tasks.

#### Applications of prompt engineering techniques

Prompt engineering techniques have a wide range of applications across various fields. In chatbots, they help refine generated responses to enhance user interactions in real-time. For developers, prompts can assist in generating code snippets or creating step-by-step tutorials for programming concepts. In education, they can simplify explanations or solve a math problem with detailed reasoning. Businesses use prompt engineering for decision-making by generating insightful AI outputs tailored to specific scenarios. On a large scale, these techniques are employed in content creation, customer support and automated workflows, making AI systems more efficient and adaptable to diverse tasks.

#### Future of prompt engineering techniques

The future of prompt engineering techniques lies in advancing natural language processing to help ensure more accurate and relevant responses across diverse applications. As AI models evolve, their reasoning ability will improve, enabling them to handle more complex tasks with minimal prompting. We can also expect the development of smarter tools and frameworks to automate and optimize prompt creation, making interactions with AI more intuitive, efficient and personalized for users across various domains.

#### Summary

Prompt engineering techniques are essential for optimizing AI interactions and unlocking the full potential of large language models. By using structured approaches like zero-shot, few-shot, chain of thought and tree of thoughts, these techniques enable AI to tackle a wide range of tasks, from chatbots to decision-making and education. Despite challenges such as hallucinations and designing effective prompts, the applications of prompt engineering continue to expand across domains, providing smarter, more tailored AI outputs. As advancements in natural language processing and reasoning abilities progress, the future of prompt engineering promises even greater efficiency and adaptability. Readers are encouraged to experiment with these techniques across different AI models to explore their capabilities and refine their results.
Ebook Unlock the power of generative AI and ML Learn how to confidently incorporate generative AI and machine learning into your business.
Read the ebook

#### Resources

Carousel
Workshop Prompt engineering with watsonx.ai Gain a comprehensive understanding of prompt engineering, learn techniques to achieve the best results with LLMs, and apply learnings through completion of a diverse set of prompt engineering exercises.
Start learning - This link opens in a new tab
Publication Locally differentially private document generation using zero shot prompting See how this publication demonstrates that pretrained large language models can effectively contribute to privacy preservation.
Read the publication
Tutorial Adversarial prompting: Testing and strengthening the security and safety of LLMs Explore various techniques involved in adversarial prompting, focusing on how these tactics can be used to test and strengthen the security and safety of large language models.
Start learning
IBM Developer IBM watsonx Developer Hub Get hands-on with prompt engineering on the watsonx Developer Hub.
Explore the Developer Hub
Article Prompt engineering fundamentals Go from zero to hero with prompt templates for different types of prompts.
Read the article
Free course Prompt engineering for everyone Master the language of AI and unleash its full potential with our free prompt engineering course.
Start learning
IBM Developer Get started with generative AI Get started with generative AI using curated tools, frameworks, tutorials, labs and community support.
Explore developer resources
1 / 7 Slide 1 of 7. Showing 1 items.
Related solutions
IBM® watsonx Orchestrate™
Easily design scalable AI assistants and agents, automate repetitive tasks and simplify complex processes with IBM® watsonx Orchestrate™.
Explore watsonx Orchestrate
AI for developers
Move your applications from prototype to production with the help of our AI development solutions.
Explore AI development tools
AI consulting and services
Reinvent critical workflows and operations by adding AI to maximize experiences, real-time decision-making and business value.
Explore AI services
Take the next step
Whether you choose to customize pre-built apps and skills or build and deploy custom agentic services using an AI studio, the IBM watsonx platform has you covered.
1. Explore watsonx Orchestrate
1. Explore AI development tools

###### Footnotes

[1] Wei, J., Bosma, M., Zhao, V.Y., Guu, K., Yu, A.W., Lester, B., Du, N., Dai, A.M. and Le, Q.V., 2021. Finetuned language models are zero-shot learners. arXiv preprint arXiv:2109.01652.
[2] Touvron, H., Lavril, T., Izacard, G., Martinet, X., Lachaux, M.A., Lacroix, T., Rozière, B., Goyal, N., Hambro, E., Azhar, F. and Rodriguez, A., 2023. Llama: Open and efficient foundation language models. arXiv preprint arXiv:2302.13971.
[3] Wei, J., Wang, X., Schuurmans, D., Bosma, M., Xia, F., Chi, E., Le, Q.V. and Zhou, D., 2022. Chain-of-thought prompting elicits reasoning in large language models. Advances in neural information processing systems, 35, pp.24824-24837.
[4] Zhang, Y., Yuan, Y. and Yao, A.C.C., 2023. Meta prompting for ai systems. arXiv preprint arXiv:2311.11482.
[5] Wang, X., Wei, J., Schuurmans, D., Le, Q., Chi, E., Narang, S., Chowdhery, A. and Zhou, D., 2022. Self-consistency improves chain of thought reasoning in language models. arXiv preprint arXiv:2203.11171.
[6] Liu, J., Liu, A., Lu, X., Welleck, S., West, P., Bras, R.L., Choi, Y. and Hajishirzi, H., 2021. Generated knowledge prompting for commonsense reasoning. arXiv preprint arXiv:2110.08387.
[7] Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T., Cao, Y. and Narasimhan, K., 2023. Tree of thoughts: Deliberate problem solving with large language models. Advances in neural information processing systems, 36, pp.11809-11822.
[8] Long, J., 2023. Large language model guided tree-of-thought. arXiv preprint arXiv:2305.08291.
[9] Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W.T., Rocktäschel, T. and Riedel, S., 2020. Retrieval-augmented generation for knowledge-intensive nlp tasks. Advances in neural information processing systems, 33, pp.9459-9474.
[10] Paranjape, B., Lundberg, S., Singh, S., Hajishirzi, H., Zettlemoyer, L. and Ribeiro, M.T., 2023. Art: Automatic multi-step reasoning and tool-use for large language models. arXiv preprint arXiv:2303.09014.
[11] Diao, S., Wang, P., Lin, Y., Pan, R., Liu, X. and Zhang, T., 2023. Active prompting with chain-of-thought for large language models. arXiv preprint arXiv:2302.12246.
[12] Li, Z., Peng, B., He, P., Galley, M., Gao, J. and Yan, X., 2023. Guiding large language models via directional stimulus prompting. Advances in Neural Information Processing Systems, 36, pp.62630-62656
[13] Gao, L., Madaan, A., Zhou, S., Alon, U., Liu, P., Yang, Y., Callan, J. and Neubig, G., 2022. Pal: program-aided language models. arXiv. arXiv preprint arXiv:2211.10435.
[14] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K. and Cao, Y., 2023, January. React: Synergizing reasoning and acting in language models. In International Conference on Learning Representations (ICLR).
[15] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K. and Yao, S., 2023. Reflexion: Language agents with verbal reinforcement learning. Advances in Neural Information Processing Systems, 36, pp.8634-8652.
[16] Zhang, Z., Zhang, A., Li, M., Zhao, H., Karypis, G. and Smola, A., 2023. Multimodal chain-of-thought reasoning in language models. arXiv preprint arXiv:2302.00923.
[17] Liu, Z., Yu, X., Fang, Y. and Zhang, X., 2023, April. Graphprompt: Unifying pre-training and downstream tasks for graph neural networks. In Proceedings of the ACM web conference 2023 (pp. 417-428).
Discover
Products Consulting services Industries Case studies Financing Research
Follow
LinkedIn X Instagram YouTube Podcasts
Connect
Business partners Documentation Events Newsletters Support TechXchange community
About
Overview Careers Investor relations Leadership Newsroom Security, privacy and trust
United States — English
Contact IBM Privacy Terms of use Accessibility
IBM web domains
ibm.com, ibm.org, ibm-zcouncil.com, insights-on-business.com, jazz.net, mobilebusinessinsights.com, promontory.com, proveit.com, ptech.org, s81c.com, securityintelligence.com, skillsbuild.org, softlayer.com, storagecommunity.org, think-exchange.com, thoughtsoncloud.com, alphaevents.webcasts.com, ibm-cloud.github.io, ibmbigdatahub.com, bluemix.net, mybluemix.net, ibm.net, ibmcloud.com, galasa.dev, blueworkslive.com, swiss-quantum.ch, blueworkslive.com, cloudant.com, ibm.ie, ibm.fr, ibm.com.br, ibm.co, ibm.ca, community.watsonanalytics.com, datapower.com, skills.yourlearning.ibm.com, bluewolf.com, carbondesignsystem.com, openliberty.io
About cookies on this site
Our websites require some cookies to function properly (required). In addition, other cookies may be used with your consent to analyze site usage, improve the user experience and for advertising. For more information, please review your cookie preferences options. By visiting our website, you agree to our processing of information as described in IBM's privacy statement. In addition to the services they provide to IBM, certain IBM authorized partners may also use these cookies for their own purposes. This activity may qualify as a “sale” or "sharing" under the California Consumer Privacy Act “CCPA”. By selecting “Do not sell or share my personal information”, you are requesting IBM to use required cookies only.
To provide a smooth navigation, your cookie preferences will be shared across the IBM web domains listed here.
Accept all Do not sell or share my personal information
Cookie preferences and do not sell or share my personal information
START
END
Your privacy choices
START
END

### Chat window

Return to assistant
AI

###### Powered by IBM watsonx

IBM watsonx is powered by the latest AI models to intelligently process conversations and provide help whenever and wherever you may need it.
Restart conversation
Close the chat window
AI

###### Powered by IBM watsonx

IBM watsonx is powered by the latest AI models to intelligently process conversations and provide help whenever and wherever you may need it.
Restart conversation
Close the chat window
The chat window has been closed
