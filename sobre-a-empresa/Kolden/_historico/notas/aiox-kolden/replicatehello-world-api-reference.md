---
id_fonte: "6a7d7e8c-39f7-4a04-affd-2ca4db3d90b7"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "replicate/hello-world | API reference"
tipo: "unknown"
url_original: "https://replicate.com/replicate/hello-world/api/api-reference"
keywords: "('API Reference', 'Create Predictions', 'Webhook Configuration', 'Model Versioning', 'Prediction Management')"
summary: "This technical guide details the **API framework** for interacting with a basic demonstration model designed to produce simple greetings. Developers can initiate tasks by providing **structured JSON inputs**, with the flexibility to manage long-running processes through **synchronous waiting** or **automated cancellation** timers. The documentation emphasizes efficient integration by allowing users to monitor progress via **webhooks** or by manually polling the **prediction status**. Ultimately, these instructions provide a blueprint for **programmatic control**, enabling creators to start, list, and terminate model activities within their own software environments."
extraido_em: "2026-06-30T16:22:47Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# replicate/hello-world | API reference

replicate/hello-world | API reference
Replicate has joined Cloudflare ctrl+k
Explore Pricing Enterprise Docs Blog Sign in Try for free
Menu
Explore Pricing Enterprise Docs Blog Sign in Try for free
Compare models in the Playground

##### replicate/hello-world

replicate
/
hello-world
Copy
View as Markdown Open in ChatGPT Open in Claude
A tiny model that says hello
Cold
Public
13.8M runs
CPU
GitHub
Playground API Examples README Versions
Run replicate/hello-world with an API
Table of Contents
Node.js
Python
HTTP
Get started
Learn more
Schema
API reference
Get started
Learn more
Schema
API reference
Create a prediction
predictions.create
Headers
\* Prefer string Leave the request open and wait for the model to finish generating output. Set to wait=n where n is a number of seconds between 1 and 60. See sync mode for more information. Show more
\* Cancel-After string The maximum time the prediction can run before it is automatically canceled. The lifetime is measured from when the prediction is created. The duration can be specified as string with an optional unit suffix:
\* s for seconds (e.g., 30s , 90s )
\* m for minutes (e.g., 5m , 15m )
\* h for hours (e.g., 1h , 2h30m )
\* defaults to seconds if no unit suffix is provided (e.g. 30 is the same as 30s ) You can combine units for more precision (e.g., 1h30m45s ). The minimum allowed duration is 5 seconds. Show more
Request body
\* input object Required The model's input as a JSON object. The input schema depends on what model you are running. To see the available inputs, click the "API" tab on the model you are running or get the model version and look at its openapi\_schema property. For example, stability-ai/sdxl takes prompt as an input. Files should be passed as HTTP URLs or data URLs. Use an HTTP URL when:
\* you have a large file > 256kb
\* you want to be able to use the file multiple times
\* you want your prediction metadata to be associable with your input files Use a data URL when:
\* you have a small file <= 256kb
\* you don't want to upload and host the file somewhere
\* you don't need to use the file again (Replicate will not store it) Show more
\* version string Required The identifier for the model or model version that you want to run. This can be specified in a few different formats:
\* {owner\_name}/{model\_name} - Use this format for official models. For example, black-forest-labs/flux-schnell . For all other models, the specific version is required.
\* {owner\_name}/{model\_name}:{version\_id} - The owner and model name, plus the full 64-character version ID. For example, replicate/hello-world:9dcd6d78e7c6560c340d916fe32e9f24aabfa331e5cce95fe31f77fb03121426 .
\* {version\_id} - Just the 64-character version ID. For example, 9dcd6d78e7c6560c340d916fe32e9f24aabfa331e5cce95fe31f77fb03121426 Show more
\* webhook string An HTTPS URL for receiving a webhook when the prediction has new output. The webhook will be a POST request where the request body is the same as the response body of the get prediction operation. If there are network problems, we will retry the webhook a few times, so make sure it can be safely called more than once. Replicate will not follow redirects when sending webhook requests to your service, so be sure to specify a URL that will resolve without redirecting. Show more
\* webhook\_events\_filter array By default, we will send requests to your webhook URL whenever there are new outputs or the prediction has finished. You can change which events trigger webhook requests by specifying webhook\_events\_filter in the prediction request:
\* start : immediately on prediction start
\* output : each time a prediction generates an output (note that predictions can generate multiple outputs)
\* logs : each time log output is generated by a prediction
\* completed : when the prediction reaches a terminal state (succeeded/canceled/failed) For example, if you only wanted requests to be sent at the start and end of the prediction, you would provide:

```
{
  "version": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
  "input": {
    "text": "Alice"
  },
  "webhook": "https://example.com/my-webhook",
  "webhook_events_filter": ["start", "completed"]
}
```

Requests for event types output and logs will be sent at most once every 500ms. If you request start and completed webhooks, then they'll always be sent regardless of throttling. Show more
Examples
Create
Create a prediction and get the output
Webhooks
Create a new prediction using webhooks
Make a request
post/predictions

```
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    text: "Alice"
};

const output = await replicate.run("replicate/hello-world:9dcd6d78e7c6560c340d916fe32e9f24aabfa331e5cce95fe31f77fb03121426", { input });

console.log(output)
//=> "hello Alice"
```

Copy
Get a prediction
predictions.get
Input parameters
\* prediction\_id string Required The ID of the prediction to get.
Examples
Get
Get the latest version of a prediction by id
Make a request
get/predictions/{prediction\_id}

```
import Replicate from "replicate";
const replicate = new Replicate();

console.log("Getting prediction...")
const prediction = await replicate.predictions.get(predictionId);
//=> {"id": "xyz...", "status": "successful", ... }
```

Copy
Cancel a prediction
predictions.cancel
Input parameters
\* prediction\_id string Required The ID of the prediction to cancel.
Examples
Cancel
Cancel an in progress prediction
Make a request
post/predictions/{prediction\_id}/cancel

```
import Replicate from "replicate";
const replicate = new Replicate();

console.log("Canceling prediction...")
const prediction = await replicate.predictions.cancel(predictionId);
//=> {"id": "xyz...", "status": "canceled", ... }
```

Copy
List predictions
predictions.list
Examples
List
List the first page of your predictions
Paginate
Iterate through all your predictions
Make a request
get/predictions

```
import Replicate from "replicate";
const replicate = new Replicate();

const page = await replicate.predictions.list();
console.log(page.results)
//=> [{ "id": "xyz...", "status": "successful", ... }, { ... }]
```

Copy
All services are online
\* Home
\* About
\* Changelog
\* Join us
\* Terms
\* Privacy
\* Status
\* Support
Copy model identifier (for use with replicate.run)
**This model is not yet booted but ready for API calls.** Your first API call will boot the model and may take longer, but after that subsequent responses will be fast.
This model runs on CPU.
Copy
Copy
Copy
Copy
