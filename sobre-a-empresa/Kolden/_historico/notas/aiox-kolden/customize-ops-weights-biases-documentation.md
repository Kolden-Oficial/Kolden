---
id_fonte: "ac3a3a8b-2d8b-477f-bfba-53999b0eeba0"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Customize Ops - Weights & Biases Documentation"
tipo: "unknown"
url_original: "https://docs.wandb.ai/weave/guides/tracking/ops"
keywords: "('Customize Ops', 'Weave Trace Triggers', 'Logged Data Modification', 'Trace Sampling Rates', 'Op Version Management')"
summary: "The Weights & Biases documentation defines a **Weave Op** as a versioned function designed to automatically track and log inputs and outputs during software execution. Users can utilize a specialized **decorator** to modify how these operations appear in the interface, including the ability to assign unique **display names, functional categories, and colors** for better visual organization. The text further explains how to manage data privacy and resource efficiency by **postprocessing logged information** or implementing a **sampling rate** to limit the frequency of traced calls. Ultimately, these customization tools allow developers to maintain **comprehensive observability** over their applications while tailoring the granularity and appearance of the recorded data."
extraido_em: "2026-06-30T16:19:28Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Customize Ops - Weights & Biases Documentation

Customize Ops - Weights & Biases Documentation
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
Advanced Ops
Customize Ops
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
    *  Tracing basics
    *  Advanced Ops
        *  Trace generator functions
        *  Trace nested functions
        *  Trace threads
        *  Customize Ops
        *  Define and log attributes
        *  Log media
        *  View and customize trace display
        *  Disable tracing
    *  Work with Calls
    *  Track custom costs
    *  Create and manage saved views
    *  Use trace plots
    *  Link a W&B run to trace function calls
    *  Use Weave with W&B training runs
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
\* Customize display names
\* Apply kinds and colors
\* Customize logged inputs and outputs
\* Control sampling rate
\* Control call link output
\* Deleting an Op
Guides
Trace your application
Advanced Ops

### Customize Ops

Install W&B MCP in Cursor
Learn how to color your Ops for better visibility, how to modify what's logged, and how to control the sampling rate
Install W&B MCP in Cursor
A Weave Op is a versioned function that automatically logs all Calls.
\* Python
\* TypeScript
To create an Op, decorate a python function with weave.op()

```
import weave

@weave.op()
def track_me(v):
    return v + 5

weave.init('intro-example')
track_me(15)
```

Calling an Op creates a new Op version if the code has changed from the last call, and logs the inputs and outputs of the function. Functions that you decorate with @weave.op() behave normally (without code versioning and tracking) if you do not call weave.init('your-project-name') before calling them. Ops can be served or deployed using the Weave toolbelt.
To create an Op, wrap a typescript function with weave.op

```
import * as weave from 'weave'

function trackMe(v: number) {
    return v + 5
}

const trackMeOp = weave.op(trackMe)
trackMeOp(15)

// You can also do this inline, which may be more convenient
const trackMeInline = weave.op((v: number) => v + 5)
trackMeInline(15)
```

#### Customize display names

```
*  Python
*  TypeScript
```

You can customize the Op's display name by setting the name parameter in the @weave.op decorator:

```
@weave.op(name="custom_name")
def func():
    ...
```

```
This feature is not available in TypeScript yet.
```

#### Apply kinds and colors

To better organize your Ops in the Weave UI, you can apply custom kinds and colors to them by adding the kind and color arguments to the @weave.op decorators in your code. For example, the following code applies an LLM kind and a blue color to the parent function, and a tool kind and a red color to a nested function:
\* Python
\* TypeScript

```
import weave

weave.init("<your-team-name>/<your-project-name>")

@weave.op(kind="LLM", color="blue")
def llm_func():
    @weave.op(kind="tool", color="red")
    def tool_func():
        return "tool result"

    tool_result = tool_func()
    
    return f"llm result with {tool_result}"

llm_func()
```

```
This feature is not available in TypeScript yet.
```

This applies the colors and kinds to your Ops in the Weave UI, like this:
The available kind values are:
\* agent
\* llm
\* tool
\* search
The available color values are:
\* red
\* orange
\* yellow
\* green
\* blue
\* purple

#### Customize logged inputs and outputs

```
*  Python
*  TypeScript
```

If you want to change the data that Weave logs without modifying the original function (for example, to hide sensitive data), you can pass postprocess\_inputs and postprocess\_output to the Op decorator. postprocess\_inputs takes in a dict where the keys are the argument names and the values are the argument values, and returns a dict with the transformed inputs. postprocess\_output takes in any value which would normally be returned by the function and returns the transformed output.

```
from dataclasses import dataclass
from typing import Any
import weave

@dataclass
class CustomObject:
    x: int
    secret_password: str

def postprocess_inputs(inputs: dict[str, Any]) -> dict[str, Any]:
    return {k:v for k,v in inputs.items() if k != "hide_me"}

def postprocess_output(output: CustomObject) -> CustomObject:
    return CustomObject(x=output.x, secret_password="REDACTED")

@weave.op(
    postprocess_inputs=postprocess_inputs,
    postprocess_output=postprocess_output,
)
def func(a: int, hide_me: str) -> CustomObject:
    return CustomObject(x=a, secret_password=hide_me)

weave.init('hide-data-example') # 🐝
func(a=1, hide_me="password123")
```

```
This feature is not available in TypeScript yet.
```

#### Control sampling rate

```
*  Python
*  TypeScript
```

You can control how frequently an Op's calls are traced by setting the tracing\_sample\_rate parameter in the @weave.op decorator. This is useful for high-frequency Ops where you only need to trace a subset of calls. While we recommend collecting all traces during agent development to help you better shape and understand its behavior, we recommend configuring trace sampling in production to help lower rate costs while still maintaining observability into your agent's behavior. Weave applies sampling rates only to outer-most Ops. If a nested Op has a sample rate but a parent Op calls it first, the sampling rate of the nested Op is ignored.

```
@weave.op(tracing_sample_rate=0.1)  # Only trace ~10% of calls
def high_frequency_op(x: int) -> int:
    return x + 1

@weave.op(tracing_sample_rate=1.0)  # Always trace (default)
def always_traced_op(x: int) -> int:
    return x + 1
```

When an Op's call is not sampled:
\* The function executes normally
\* No trace data is sent to Weave
\* Child Ops are also not traced for that call
The sampling rate must be between 0.0 and 1.0 inclusive.

```
This feature is not available in TypeScript yet.
```

#### Control call link output

If you want to suppress the printing of call links during logging, you can set the WEAVE\_PRINT\_CALL\_LINK environment variable to false . This can be useful if you want to reduce output verbosity and reduce clutter in your logs.

```
export WEAVE_PRINT_CALL_LINK=false
```

#### Deleting an Op

```
*  Python
*  TypeScript
```

To delete a version of an Op, call .delete() on the Op ref.

```
weave.init('intro-example')
my_op_ref = weave.ref('track_me:v1')
my_op_ref.delete()
```

Accessing a deleted Op returns an error.

```
This feature is not available in TypeScript yet.
```

Was this page helpful?
Yes No
Suggest edits [Raise issue](<https://github.com/wandb/docs/issues/new?title=Issue> on docs&body=Path: /weave/guides/tracking/ops)
Trace threads Define and log attributes
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
