---
id_fonte: "79fbcdc2-202c-4bc6-b3c2-d438ba515b82"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Quickstart: Track LLM inputs & outputs - Weights & Biases Documentation - Wandb"
tipo: "unknown"
url_original: "https://docs.wandb.ai/weave/quickstart"
keywords: "('W&B Weave', 'LLM tracing', 'Model monitoring', 'Tracking inputs outputs', 'Weave UI evaluation')"
summary: "The provided documentation introduces **W&B Weave**, a developer tool designed to **monitor and debug** Large Language Model (LLM) applications through a streamlined setup process. By integrating a specific **library and decorator**, developers can capture detailed **traces** of their model interactions, including critical data such as inputs, outputs, and token usage. The text serves as a practical guide for **tracking application performance** within a centralized dashboard, allowing users to analyze latency and experiment with prompts. Ultimately, the resource aims to simplify the **evaluation and optimization** of AI-driven projects by providing clear visibility into how code and models interact in real-time."
extraido_em: "2026-06-30T16:21:53Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Quickstart: Track LLM inputs & outputs - Weights & Biases Documentation - Wandb

Quickstart: Track LLM inputs & outputs - Weights & Biases Documentation
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
Get Started
Quickstart: Track LLM inputs & outputs
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

Get Started

### Quickstart: Track LLM inputs & outputs

Install W&B MCP in Cursor
Get started with W&B Weave by adding tracing to your LLM application to debug and monitor model interactions.
Install W&B MCP in Cursor
Try in Colab GitHub source
Learn how to track LLM calls with Weave by adding tracing to your code. This quickstart walks you through tracing a request to OpenAI and viewing the results in the Weave UI.

#### What you'll learn:

This guide shows you how to:
\* Import and configure Weave in your code
\* Use weave.op decorator to track your code
\* View traces in the Weave UI

#### Prerequisites

```
*  A W&B account
*  Python 3.8+ or Node.js 18+
*  Required packages installed:
    *   **Python** : pip install weave openai
    *   **TypeScript** : npm install weave openai
*  An OpenAI API key set as an environment variable
```

#### Log a trace to a new project

To begin tracking your code and logging traces to Weave:
1. Import the weave library into your code.
1. Call weave.init('your\_wb\_team/project\_name') in your code to send tracking information to your W&B team and project. If you do not set a team, the traces are sent to your default team. If the specified project does not exist in your team, Weave creates it.
1. Add the @weave.op() decorator to specific functions you want to track. While Weave automatically tracks calls to supported LLMs, adding the Weave decorator allows you to track the inputs, outputs, and code of specific functions. The decorator uses the following syntax in TypeScript: weave.op(your\_function)
The following example code sends a request to OpenAI (requires OpenAI API key) and Weave records the request's tracing information. The request asks the OpenAI model to extract dinosaur names from the input and identify each dinosaur's diet (herbivore or carnivore). Run the following example code to track your first project with Weave:
\* Python
\* TypeScript

```
# Imports the Weave library
import weave
from openai import OpenAI

client = OpenAI()

# Weave automatically tracks the inputs, outputs and code of this function
@weave.op()
def extract_dinos(sentence: str) -> dict:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": """In JSON format extract a list of `dinosaurs`, with their `name`,
their `common_name`, and whether its `diet` is a herbivore or carnivore"""
            },
            {
                "role": "user",
                "content": sentence
            }
            ],
            response_format={ "type": "json_object" }
        )
    return response.choices[0].message.content

# Initializes Weave, and sets the team and project to log data to
weave.init('your-team/traces-quickstart')

sentence = """I watched as a Tyrannosaurus rex (T. rex) chased after a Triceratops (Trike), \
both carnivore and herbivore locked in an ancient dance. Meanwhile, a gentle giant \
Brachiosaurus (Brachi) calmly munched on treetops, blissfully unaware of the chaos below."""

result = extract_dinos(sentence)
print(result)
```

```
// Imports the Weave library
import * as weave from 'weave';
import OpenAI from 'openai';

const openai = new OpenAI();

// Weave automatically tracks the inputs, outputs and code of this function  
async function extractDinos(input: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `In JSON format extract a list of 'dinosaurs', with their 'name', their 'common_name', and whether its 'diet' is a herbivore or carnivore: ${input}`,
      },
    ],
  });
  return response.choices[0].message.content;
}
const extractDinosOp = weave.op(extractDinos);

async function main() {

  // Initializes Weave, and sets the team and project to log data to
  await weave.init('your-team/traces-quickstart');

  const result = await extractDinosOp(
    'I watched as a Tyrannosaurus rex (T. rex) chased after a Triceratops (Trike), both carnivore and herbivore locked in an ancient dance. Meanwhile, a gentle giant Brachiosaurus (Brachi) calmly munched on treetops, blissfully unaware of the chaos below.'
  );
  console.log(result);
}

main();
```

When you call the extract\_dinos function, Weave outputs links to view your traces in the terminal. The output looks like this:

```
weave:  $ pip install weave --upgrade
weave: Logged in as Weights & Biases user: example-username.
weave: View Weave data at https://wandb.ai/your-team/traces-quickstart/weave
weave: 🍩 https://wandb.ai/your-team/traces-quickstart/r/call/019ae171-7f32-7c96-8b42-931a32f900b7
{
  "dinosaurs": [
    {
      "name": "Tyrannosaurus rex",
      "common_name": "T. rex",
      "diet": "carnivore"
    },
    {
      "name": "Triceratops",
      "common_name": "Trike",
      "diet": "herbivore"
    },
    {
      "name": "Brachiosaurus",
      "common_name": "Brachi",
      "diet": "herbivore"
    }
  ]
}
```

#### See traces of your application in your project

Click the link in your terminal or paste it into your browser to open the Weave UI. In the **Traces** panel of the Weave UI, you can click on the trace to see its data, such as its input, output, latency, and token usage.

#### Learn more about Traces

```
*  Learn how to decorate your functions and retrieve call information.
*  Try the Playground to test different models on logged traces.
*  Explore integrations. Weave automatically tracks calls made to OpenAI, Anthropic and many more LLM libraries. If your LLM library isn't currently one of our integrations you can track calls to other LLMs libraries or frameworks easily by wrapping them with @weave.op() .
```

#### Next Steps

Get started evaluating your app and then see how to evaluate a RAG application.
Was this page helpful?
Yes No
Suggest edits [Raise issue](<https://github.com/wandb/docs/issues/new?title=Issue> on docs&body=Path: /weave/quickstart)
W&B Weave Build an evaluation
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
