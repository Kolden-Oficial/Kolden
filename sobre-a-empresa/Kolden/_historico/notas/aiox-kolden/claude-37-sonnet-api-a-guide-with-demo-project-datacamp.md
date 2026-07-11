---
id_fonte: "75b62942-cf90-4e71-9c38-afedf945dd1c"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Claude 3.7 Sonnet API: A Guide With Demo Project - DataCamp"
tipo: "unknown"
url_original: "https://www.datacamp.com/tutorial/claude-3-7-sonnet-api"
keywords: "('Claude 3.7 Sonnet', 'Thinking Mode', 'Anthropic API', 'Research Paper Analysis', 'Gradio UI Development')"
summary: "This technical guide demonstrates how to leverage **Claude 3.7 Sonnet** to build a sophisticated **Research Paper Analyzer** using Python and the Gradio framework. The tutorial highlights the model's innovative **Thinking Mode**, which enables the AI to perform visible, step-by-step reasoning to improve accuracy and handle complex scientific synthesis. By following a structured workflow—ranging from **API configuration** and text extraction to **streaming response** implementation—developers learn to create a tool that identifies research gaps and generates novel academic ideas. Ultimately, the text serves as both a practical manual for **multimodal AI development** and a strategic overview of optimizing performance and **cost management** within the Anthropic ecosystem."
extraido_em: "2026-06-30T16:18:49Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Claude 3.7 Sonnet API: A Guide With Demo Project - DataCamp

Claude 3.7 Sonnet API: A Guide With Demo Project | DataCamp
[

###### **Master the world's most popular programming language.** **All levels welcome.**

Register for Free](<https://events.datacamp.com/ai-powered-python>)
Skip to main content
EN
English Español Português Deutsch Beta Français Beta Italiano Beta Türkçe Beta Bahasa Indonesia Beta Tiếng Việt Beta Nederlands Beta हिन्दी Beta 日本語 Beta 한국어 Beta Polski Beta Română Beta Русский Beta Svenska Beta ไทย Beta 中文(简体) Beta
More Information
Found an Error?
Log in Get Started
Tutorials
Blogs
Tutorials
docs
Podcasts
Cheat Sheets
code-alongs
Newsletter
Category
Category
Technologies
Discover content by tools and technology
AI Agents AI News Artificial Intelligence AWS Azure Business Intelligence ChatGPT Databricks dbt Docker Excel Generative AI Git Google Cloud Platform Hugging Face Java Julia Kafka Kubernetes Large Language Models MongoDB MySQL NoSQL OpenAI PostgreSQL Power BI PySpark Python R Scala Snowflake Spreadsheets SQL SQLite Tableau
Category
Topics
Discover content by data science topics
AI for Business Big Data Career Services Cloud Data Analysis Data Engineering Data Literacy Data Science Data Visualization DataLab Deep Learning Machine Learning MLOps Natural Language Processing Vector Databases
Browse Courses
category
1. Home
1. Tutorials
1. Artificial Intelligence

### Claude 3.7 Sonnet API: A Guide With Demo Project

Learn how to use Claude 3.7 Sonnet's API by building a Gradio-based Research Paper Analyzer to extract insights from uploaded PDFs.
Contents
Feb 25, 2025
· 12 min read
Contents
\* Project Overview: Research Paper Analyzer With Claude 3.7 Sonnet
\* Optimizing costs
\* What Is Thinking Mode in Claude 3.7 Sonnet?
\* Step 1: Prerequisites
\* Step 2: Setting Up Claude 3.7 Sonnet API
\* Step 3: Extracting Text from Research Papers
\* Step 4: Running the Research Paper Analysis
\* Step 5: Building the Gradio UI
\* Conclusion

#### Training more people?

Get your team access to the full DataCamp for business platform. For Business For a bespoke solution book a demo.
Claude 3.7 Sonnet is the latest AI model by Anthropic, offering enhanced reasoning capabilities through its new Thinking Mode. It can process 200K tokens of context, making it ideal for complex research analysis.
In this tutorial, I'll explain step-by-step how to build a Research Paper Analyzer using Claude 3.7 Sonnet, capable of:
\* Extracting key insights and findings from research papers.
\* Identifying limitations and drawbacks of each paper.
\* Finding interconnections and shared citations between multiple papers.
\* Generating a novel research idea based on the analyzed papers.
We'll also integrate Claude 3.7 Sonnet's Thinking Mode with Gradio to allow users to upload multiple research papers and receive structured insights.
We'll focus on the hands-on part in this blog—if you're only looking for an overview, I recommend this article on Claude 3.7 Sonnet.
And if you are looking for a clear demo, tune in to our Claude 3.7 Sonnet API video tutorial and build a multimodal research assistant. Our video will walk you through how to access the Anthropic API setup, extract and process PDFs using PyPDF2 document processing, use Claude 3.7's thinking mode, and build a real research assistant using Gradio. You can also check out the latest Claude model, Claude Sonnet 4.5, and the Claude Agent SDK.
Tap to unmute
Your browser can't play this video.
Learn more

### An error occurred.

Try watching this video on [www.youtube.com](http://www.youtube.com), or enable JavaScript if it is disabled in your browser.

#### Project Overview: Research Paper Analyzer With Claude 3.7 Sonnet

We will develop a Gradio-based Research Paper Analyzer that allows users to:
\* Upload multiple research papers in PDF format.
\* Extract key contributions and limitations from each paper.
\* Identify connections, citations, and overlapping research ideas.
\* Generate a novel research idea using insights from multiple papers.

##### Optimizing costs

To optimize costs for the Claude 3.7 Sonnet API we need to align its usage with project needs, as input tokens cost $3/M and output tokens, including Thinking Mode, cost $15/M.
We need to reduce expenses by using prompt caching, batch processing, and streaming mode for long responses. We can even optimize Thinking Mode by setting a lower token budget (starting from 1,024 tokens) and only increasing it when necessary.
You can learn more about optimizing API cost via Anthropic's official documentation.

##### What Is Thinking Mode in Claude 3.7 Sonnet?

Before we start, let's shed a light on what thinking mode is, in case you're not familiar with it. Thinking Mode is a new feature in Claude 3.7 Sonnet that enables step-by-step reasoning before generating the final answer. It allows the model to:
\* Break down complex research problems into structured, logical steps.
\* Provide transparent insights into its internal reasoning.
\* Improve scientific accuracy by avoiding hallucinations in research analysis.
In a nutshell, this is how it works:
\* Thinking blocks generation: Claude first produces intermediate reasoning steps in a structured format, facilitating in-depth analysis and logical decomposition of the problem.
\* Iterative refinement: The model evaluates its own reasoning, integrating relevant insights while filtering out inconsistencies to ensure coherence and scientific validity.
\* Final response synthesis: The structured insights from the thinking phase are synthesized into a well-formulated output, enhancing clarity, accuracy, and contextual relevance.

#### Step 1: Prerequisites

Before starting, we need to set up the Anthropic API key:
1. Start by logging in to the Anthropic console: <https://console.anthropic.com/>
1. Click on Get API Keys.
1. You'll be redirected to the API Keys tab. Click on Create API Key and enter your key name.
1. Copy this key and save it for future reference.
1. Now, add in some credit to your billing account, under the Billing tab. Simply click on buy credits and add about $5 to your account (sufficient for this project).
We now have the API Key in place. Let's now make sure we have the required dependencies installed.

```
pip install anthropic gradio PyPDF2
Powered By 
Was this AI assistant helpful? Yes No
```

Once installed, import the necessary libraries:

```
import anthropic
import PyPDF2
import os
import gradio as gr
Powered By 
Was this AI assistant helpful? Yes No
```

#### Step 2: Setting Up Claude 3.7 Sonnet API

Now that that we have imported all required libraries, we set up the Claude API next.
If you are using Google Colab, you can save the API key in the Secrets tab and then use the get() function to access it. Otherwise, you can pass the API key directly to your code (not recommended).
We then initialize the Claude client using the Anthropic library and pass in the API key.

```
# If using Google Colab Secrets
from google.colab import userdata
API_KEY = userdata.get('claude-3.7-sonnet')
client = anthropic.Anthropic(
    api_key=API_KEY,
)
Powered By 
Was this AI assistant helpful? Yes No
```

This completes our setting up part. Next, we work on the text extraction part.

#### Step 3: Extracting Text from Research Papers

We'll use PyPDF2 to extract text from uploaded PDF files. Claude 3.7 Sonnet accepts only text and images as input. So, we extract text beforehand for efficient processing while maximizing the capabilities of Claude 3.7 Sonnet with Thinking Mode.

```
# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    """Extracts text from a given PDF file."""
    text = ""
    with open(pdf_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text.strip()
Powered By 
Was this AI assistant helpful? Yes No
```

The extract\_text\_from\_pdf() function reads a PDF file, extracts text from each page using PyPDF2.PdfReader() , and returns the combined text as a string.

#### Step 4: Running the Research Paper Analysis

Now that we have the extracted text, we move on with using Claude 3.7 Sonnet's thinking and streaming mode to analyze multiple papers and generate a structured research idea.
Streaming mode ensures efficient handling of large responses by progressively delivering results, reducing waiting times, and preventing API timeouts. Thinking mode enhances complex reasoning by allowing the model to generate structured internal thoughts before formulating a final answer, ensuring well-justified insights.

```
# Function to analyze research papers with streaming
def analyze_papers_streaming(paper_texts, paper_count):
    """Uses Claude 3.7 Sonnet with Thinking Mode in streaming mode to analyze papers, find drawbacks, and generate a research project."""
    formatted_papers = "\n\n".join([f"### Paper {i+1}:\n{paper}" for i, paper in enumerate(paper_texts)])    
    prompt = f"""
        You are an AI research assistant. You have been provided with {paper_count} research papers. 
        Your task is to analyze these papers and perform the following:
        1. **Summarize each paper** with its core contributions and findings.
        2. **Identify key drawbacks** of each paper, focusing on limitations, gaps, or areas needing improvement.
        3. **Find interconnections and citations** between the papers—what ideas, methods, or datasets do they share?
        4. **Propose a novel research idea** that addresses a major limitation across these papers. 
            - Suggest how techniques from different papers can be combined to solve a problem.
            - Ensure the idea is practical and feasible for further research.
            - Justify why this approach is promising.
        Below are the research papers
        {formatted_papers}
    """
    results = {"thinking": "", "research_idea": ""}   
    with client.messages.stream(
        model="claude-3-7-sonnet-20250219",
        max_tokens=25000,
        thinking={
            "type": "enabled",
            "budget_tokens": 16000  # Large budget for deep reasoning
        },
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        current_block_type = None        
        for event in stream:
            if event.type == "content_block_start":
                current_block_type = event.content_block.type
            elif event.type == "content_block_delta":
                if event.delta.type == "thinking_delta":
                    results["thinking"] += event.delta.thinking
                elif event.delta.type == "text_delta":
                    results["research_idea"] += event.delta.text           
            elif event.type == "message_stop":
                break
    return results["thinking"], results["research_idea"]
Powered By
```

The analyze\_papers\_streaming() function performs the following steps:
1. Formats input papers: The function takes in a list of extracted research paper texts along with the number of papers and structures it for the prompt.
1. Constructs a prompt for Claude 3.7 Sonnet: The prompt instructs the model to:
\* Summarize each paper.
\* Identify key drawbacks.
\* Find interconnections between papers.
\* Generate a novel research idea combining techniques from different papers.
1. Initializes streaming API request: Once the prompt is set, next we use client.messages.stream() to send the request to Claude 3.7 Sonnet. This enables thinking mode with budget\_tokens=16000 and max\_tokens=25000 for extended response length.
1. Processes streaming responses: The function iterates through streamed response events and identifies different response blocks. When streaming is enabled, the model sends content progressively. We receive content\_block\_start events to indicate the beginning of a response block. As the model generates output, thinking\_delta events contain intermediate reasoning steps, while text\_delta events provide the final research insights. The process continues until a message\_stop event signals the completion of the response.
1. Returns analysis results: The final outputs are two structured responses containing the model's internal reasoning process and the final research idea combining insights from the provided papers.
You can learn more about refining prompting techniques for extended thinking here.

#### Step 5: Building the Gradio UI

Now that our main logic is built, we continue with integrating it into Gradio, allowing users to upload research papers and receive structured insights.

```
# Gradio UI function
def gradio_interface(pdfs):
    paper_texts = [extract_text_from_pdf(pdf.name) for pdf in pdfs]
    paper_count = len(paper_texts)  # Count number of provided papers
    thinking, research_idea = analyze_papers_streaming(paper_texts, paper_count)
    return thinking, research_idea

# Set up the Gradio app
demo = gr.Interface(
    fn=gradio_interface,
    inputs=gr.File(file_types=[".pdf"], label="Upload Research Papers", file_count="multiple"),
    outputs=[gr.Textbox(label="Thinking Process"), gr.Textbox(label="Research Idea")],
    title="Claude 3.7 Sonnet - Powered Research Paper Analyzer",
    description="Upload multiple research papers to extract insights, identify key limitations, and generate a novel research idea."
)
if __name__ == "__main__":
    demo.launch(debug=True)
Powered By
```

The above code sets up a Gradio UI where users can upload multiple PDFs, which are processed to extract text, analyze key insights, and generate novel research ideas using thinking and streaming mode.

#### Conclusion

In this tutorial, we built an AI-powered Research Paper Analyzer using Claude 3.7 Sonnet, enabling researchers to efficiently extract insights, identify limitations, and generate novel research ideas from multiple papers. By using thinking mode, the model performs deep reasoning, making it an effective tool for literature reviews and research synthesis.

#### Develop AI Applications

Learn to build AI applications using the OpenAI API.
Start Upskilling For Free
Author
Aashi Dutt
I am a Google Developers Expert in ML(Gen AI), a Kaggle 3x Expert, and a Women Techmakers Ambassador with 3+ years of experience in tech. I co-founded a health-tech startup in 2020 and am pursuing a master's in computer science at Georgia Tech, specializing in machine learning.
Topics
Artificial Intelligence
Large Language Models
Aashi Dutt Google Developers Expert in ML | Speaker | Kaggle 3x Expert
Topics
Artificial Intelligence
Large Language Models
[

##### Claude 3.7 Sonnet: Features, Access, Benchmarks & More

](<https://www.datacamp.com/blog/claude-3-7-sonnet>)
[

##### Claude Sonnet 4.5: Tests, Features, Access, Benchmarks, and More

](<https://www.datacamp.com/blog/claude-sonnet-4-5>)
[

##### Claude 4: Tests, Features, Access, Benchmarks, and More

](<https://www.datacamp.com/blog/claude-4>)
[

##### Claude Sonnet 3.5 API Tutorial: Getting Started With Anthropic's API

](<https://www.datacamp.com/tutorial/claude-sonnet-api-anthropic>)
[

##### Claude Sonnet 4: A Hands-On Guide for Developers

](<https://www.datacamp.com/tutorial/claude-sonnet-4>)
[

##### Claude Agent SDK Tutorial: Create Agents Using Claude Sonnet 4.5

](<https://www.datacamp.com/tutorial/how-to-use-claude-agent-sdk>)
Learn AI with these courses!
Track

##### Developing AI Applications

21 hr
Learn to create AI-powered applications with the latest AI developer tools, including the OpenAI API, Hugging Face, and LangChain.
See Details
Start Course
Track

##### Llama Fundamentals

4 hr
Experiment with Llama 3 to run inference on pre-trained models, fine-tune them on custom datasets, and optimize performance.
See Details
Start Course
Course

##### Retrieval Augmented Generation (RAG) with LangChain

3 hr
15.2K
Learn cutting-edge methods for integrating external data with LLMs using Retrieval Augmented Generation (RAG) with LangChain.
See Details
Start Course
See More
Related
[blog

##### Claude 3.7 Sonnet: Features, Access, Benchmarks & More

](<https://www.datacamp.com/blog/claude-3-7-sonnet>)
Learn about Claude 3.7 Sonnet's hybrid approach of combining reasoning mode and generalist mode, key benchmarks, and how to access it via web or API.
Alex Olteanu
8 min
[blog

##### Claude Sonnet 4.5: Tests, Features, Access, Benchmarks, and More

](<https://www.datacamp.com/blog/claude-sonnet-4-5>)
Learn about Claude Sonnet 4.5, the 'best coding model in the world'. Explore new features, use cases, benchmarks, and testing results, plus a look at the Claude Agents SDK and Claude Imagine.
Matt Crabtree
8 min
[blog

##### Claude 4: Tests, Features, Access, Benchmarks, and More

](<https://www.datacamp.com/blog/claude-4>)
Learn about Claude Sonnet 4 and Claude Opus 4, their features, use cases, benchmarks, and testing results.
Alex Olteanu
8 min
[Tutorial

##### Claude Sonnet 3.5 API Tutorial: Getting Started With Anthropic's API

](<https://www.datacamp.com/tutorial/claude-sonnet-api-anthropic>)
To connect through the Claude 3.5 Sonnet API, obtain your API key from Anthropic, install the anthropic Python library, and use it to send requests and receive responses from Claude 3.5 Sonnet.
Ryan Ong
[Tutorial

##### Claude Sonnet 4: A Hands-On Guide for Developers

](<https://www.datacamp.com/tutorial/claude-sonnet-4>)
Explore Claude Sonnet 4's developer features—code execution, files API, and tool use—by building a Python-based math-solving agent.
Bex Tuychiev
[Tutorial

##### Claude Agent SDK Tutorial: Create Agents Using Claude Sonnet 4.5

](<https://www.datacamp.com/tutorial/how-to-use-claude-agent-sdk>)
Learn how the Claude Agent SDK works by building three projects, from one-shot to custom-tool agents.
Abid Ali Awan
See More See More

#### Grow your data skills with DataCamp for Mobile

Make progress on the go with our mobile courses and daily 5-minute coding challenges.
Download on the App Store Get it on Google Play
**Learn**
Learn Python Learn AI Learn Power BI Learn Data Engineering Assessments Career Tracks Skill Tracks Courses Data Science Roadmap
**Data Courses**
Python Courses R Courses SQL Courses Power BI Courses Tableau Courses Alteryx Courses Azure Courses AWS Courses Google Cloud Courses Google Sheets Courses Excel Courses AI Courses Data Analysis Courses Data Visualization Courses Machine Learning Courses Data Engineering Courses Probability & Statistics Courses
**DataLab**
Get Started Pricing Security Documentation
**Certification**
Certifications Data Scientist Data Analyst Data Engineer SQL Associate Power BI Data Analyst Tableau Certified Data Analyst Azure Fundamentals AI Fundamentals
**Resources**
Resource Center Upcoming Events Blog Code-Alongs Tutorials Docs Open Source RDocumentation Book a Demo with DataCamp for Business Data Portfolio
**Plans**
Pricing For Students For Business For Universities Discounts, Promos & Sales Expense DataCamp DataCamp Donates
**For Business**
Business Pricing Teams Plan Data & AI Unlimited Plan Customer Stories Partner Program
**About**
About Us Learner Stories Careers Become an Instructor Press Leadership Contact Us DataCamp Español DataCamp Português DataCamp Deutsch DataCamp Français
**Support**
Help Center Become an Affiliate
Facebook Twitter LinkedIn YouTube Instagram
Privacy Policy Cookie Notice Do Not Sell My Personal Information Accessibility Security Terms of Use
© 2026 DataCamp, Inc. All Rights Reserved.
