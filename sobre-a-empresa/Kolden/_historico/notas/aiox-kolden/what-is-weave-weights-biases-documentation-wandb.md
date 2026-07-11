---
id_fonte: "70a3bd25-506d-42ca-b63f-ba0e447a8cf1"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "What is Weave? - Weights & Biases Documentation - Wandb"
tipo: "unknown"
url_original: "https://docs.wandb.ai/weave/concepts/what-is-weave"
keywords: "('LLM Application Observability', 'Trace Tracking', 'Systematic Evaluation', 'Version Control', 'Production Monitoring')"
summary: "The documentation introduces W&B Weave as a comprehensive **observability and evaluation platform** designed specifically to handle the unpredictable nature of **LLM application development**. It outlines a framework for achieving **visibility into AI workflows** by tracing every interaction, versioning prompts and models, and systematically benchmarking performance through **rigorous evaluation pipelines**. By integrating human feedback and **production monitoring guardrails**, the tool enables developers to move beyond traditional software testing and refine their models with high confidence. Ultimately, Weave serves as a central hub for **improving application reliability** through detailed data logging and collaborative experimentation across the entire lifecycle of an AI project."
extraido_em: "2026-06-30T16:22:36Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# What is Weave? - Weights & Biases Documentation - Wandb

What is Weave? - Weights & Biases Documentation
Skip to main content
Weights & Biases Documentation home page
English
Search...
Ctrl K Ask AI
\* Log in
\* Sign Up
\* Sign Up
Search...
Navigation
Guides
What is Weave?
Platform
W&B Models
W&B Weave
W&B Inference
W&B Training
Support
\* W&B Weave

###### Get Started

```
*  Quickstart: Track LLM inputs & outputs
*  Build an evaluation
*  Evaluate RAG applications
```

###### Guides

```
*  What is Weave?
*  Trace your application
*  Evaluate your application
*  Experiment with prompts and models
*  Version your work
*  Monitor and collect feedback
*  Integrate with your LLM provider and frameworks
*  Deploy and scale
*  Manage Weave Projects
*  Configure Weave environment variables
```

###### Cookbooks

```
*  Overview
*  Weave fundamentals
*  Evaluations & Datasets
*  Models & Prompts
*  Advanced Topics
*  Production & Monitoring
```

###### Reference

```
*  Overview
*  Python SDK
*  TypeScript SDK
*  Service API
```

###### Details & Support

```
*  Limits and expected behaviors
*  Support: Weave
```

On this page
\* The main threads of Weave
\* Traces
\* Evaluations
\* Version everything
\* Experiment with prompts and models
\* Collect feedback
\* Monitor production
\* Get started using Weave
Guides

### What is Weave?

Install W&B MCP in Cursor
Learn about W&B Weave and how it helps you build, evaluate, and improve LLM applications
Install W&B MCP in Cursor
W&B Weave is an observability and evaluation platform for building reliable LLM applications. Weave helps you understand what your AI application is doing, measure how well it performs, and systematically improve it over time. Building LLM applications is fundamentally different from traditional software development. LLM outputs are non-deterministic, making debugging harder. Quality is subjective and context-dependent. Small prompt changes can cause unexpected behavior changes. Traditional testing approaches fall short.

#### The main threads of Weave

Weave provides the following core functionality:
\* **Visibility** into every LLM call, input, and output in your application.
\* **Systematic evaluation** to measure performance against curated test cases.
\* **Version tracking** for prompts, models, and data so you can understand what changed.
\* **Experimentation** with different prompt and model comparisons.
\* **Feedback collection** to capture human judgments and annotations.
\* **Monitoring** in production using guardrails and scorers for LLM safety and quality.

##### Traces

Track end-to-end how data flows through your LLM application.
\* See inputs and outputs of each application usage.
\* See source documents used to produce the LLM feedback.
\* See cost, token count, and latency of LLM calls.
\* Drill down into specific prompts and how answers are produced.
\* Collect feedback on responses from users.
\* In your code, you can use Weave ops and calls to track what your functions are doing.
Get started with tracing

##### Evaluations

Systematically benchmark your LLM application's performance to gain confidence when deploying to production.
\* Easily track which versions of model/prompt resulted in what performance.
\* Define metrics to evaluate responses using one or more scoring functions.
\* Compare two or more different evaluations over multiple metrics. Contrast specific samples for their performance.
Build an evaluation pipeline

##### Version everything

Weave tracks versions of your prompts, datasets, and model configurations. When something breaks, you can see exactly what changed. When something works, you can reproduce it. Learn about versioning

##### Experiment with prompts and models

Bring your API keys and quickly test prompts and compare responses from various commercial models using the Playground. Experiment in the Weave Playground

##### Collect feedback

Capture human feedback, annotations, and corrections from production use. Use this data to build better test cases and improve your application. Collect feedback

##### Monitor production

Score production traffic with the same scorers you use in evaluation. Set up guardrails to catch issues before they reach users. Set up guardrails and monitors

#### Get started using Weave

Weave provides SDKs for Python and TypeScript. Both SDKs support tracing, evaluation, datasets, and the core Weave features. Some advanced features like class-based Models and Scorers are currently not available for the Weave TypeScript SDK. To get started using Weave:
1. Create a Weights & Biases account at <https://wandb.ai/site> and get your API key from <https://wandb.ai/authorize>
1. Install Weave:
Python
Typescript

```
pip install weave
```

```
1. In your script, import Weave and initialize a project:
```

Python
Typescript

```
import weave
client = weave.init('your-team/your-project-name')
```

You're now ready to use Weave. Weave integrates with popular LLM providers and frameworks. When you use a supported integration, Weave automatically traces LLM calls without additional code changes.
1. Beyond relying on the supported integrations, you can also use Weave to log traces for custom functions by adding one line to your call function.
When you decorate a function with @weave.op() (in Python), or wrap it with weave.op() (in TypeScript), Weave automatically captures its code, inputs, outputs, and execution metadata.
Python
Typescript

```
    @weave.op
    async def my_function(){
      ...  }
```

To try it out with a guided tutorial, see Get started with tracing.
Was this page helpful?
Yes No
Suggest edits [Raise issue](<https://github.com/wandb/docs/issues/new?title=Issue> on docs&body=Path: /weave/concepts/what-is-weave)
Evaluate RAG applications Understand Ops and Calls
Ctrl+I
github discord x youtube linkedin
x
Cookies Settings
Assistant
Responses are generated using AI and may contain mistakes.
By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
Cookies Settings Reject All Accept All

#### Privacy Preference Center

When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
More information
Allow All

##### Manage Consent Preferences

###### Strictly Necessary Cookies

Always Active
These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.

###### Functional Cookies

[x]
Functional Cookies
These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.

###### Targeting Cookies

[x]
Targeting Cookies
These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.

###### Performance Cookies

[x]
Performance Cookies
These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.

##### Cookie List

Clear [-]
checkbox label label
Apply Cancel
Consent Leg.Interest [-]
checkbox label label [-]
checkbox label label [-]
checkbox label label
Reject All Confirm My Choices
