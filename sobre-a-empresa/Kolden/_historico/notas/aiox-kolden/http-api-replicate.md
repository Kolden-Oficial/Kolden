---
id_fonte: "47911e7f-9297-48ff-88a1-c56a2d741ac4"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "HTTP API - Replicate"
tipo: "unknown"
url_original: "https://replicate.com/docs/reference/http"
keywords: "('HTTP API Reference', 'Model Predictions', 'Deployment Management', 'Authentication and Security', 'Model Trainings')"
summary: "This documentation serves as a comprehensive technical guide for the **Replicate HTTP API**, a service that enables developers to run, manage, and deploy **machine learning models** in the cloud. It outlines essential procedures for **authentication** using bearer tokens and provides detailed instructions for core operations such as **creating predictions**, fine-tuning models through **trainings**, and managing specialized **deployments** for production scale. The text organizes these features into logical categories—ranging from searching public model collections to configuring **webhooks** for real-time status updates—ensuring that users can efficiently integrate AI capabilities into their own applications. Ultimately, the source acts as a functional manual for interacting with Replicate's infrastructure, defining the specific **endpoints, request parameters, and hardware options** required to execute complex AI workloads."
extraido_em: "2026-06-30T16:20:03Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# HTTP API - Replicate

HTTP API - Replicate
Replicate has joined Cloudflare ctrl+k
Explore Pricing Enterprise Docs Blog Sign in Try for free
Menu
Explore Pricing Enterprise Docs Blog Sign in Try for free
Compare models in the Playground
Docs

### Docs

Get started
Collapse sidebar
Run a model from Node.js
Run a model from Google Colab
Run a model from Python
Fine-tune an image model
Deploy a custom model
Guides
Run models
Build a website with vinext
Build a website with Next.js
Build a Discord bot with Python
Build an app with SwiftUI
Make art with Stable Diffusion
Upscale images with AI models
Build models
Publish using GitHub Actions
Set up a CI/CD pipeline
Push your own model
Push a Transformers model
Push a Diffusers model
Optimize models with Pruna
Get a GPU on Brev
Get a GPU on Lambda Labs
Best practices for Replicate models
Optimize with torch.compile
Go deeper
Cache images with Cloudflare
Get started with ComfyUI
Use realtime speech with OpenAI
Handle webhooks with Val Town
Working with LoRAs
Topics
Models
About models
Run a model
Create a model
Publish a model
Model versions
Model hardware
Official models
Community models
Private and public models
Training destinations
Delete a model
Secrets
Predictions
About predictions
Create a prediction
Input files
Output files
Prediction lifecycle
Share a prediction
Rate limits
Safety checking
Data retention
Secrets
Streaming output
Deployments
About deployments
Create a deployment
View deployments
Monitor a deployment
Delete a deployment
Webhooks
About webhooks
Set up webhooks
Receive webhooks
Verify webhooks
Test your webhook code
Organizations
About organizations
Security
API tokens
Billing
About billing
Prepaid credit
Site policy
About subprocessors
Reference
How does Replicate work?
Client libraries
HTTP API
OpenAPI schema
llms.txt
Error codes
MCP server
Open source
Search documentation Ctrl+/
Get started
Collapse sidebar
Run a model from Node.js
Run a model from Google Colab
Run a model from Python
Fine-tune an image model
Deploy a custom model
Guides
Run models
Build a website with vinext
Build a website with Next.js
Build a Discord bot with Python
Build an app with SwiftUI
Make art with Stable Diffusion
Upscale images with AI models
Build models
Publish using GitHub Actions
Set up a CI/CD pipeline
Push your own model
Push a Transformers model
Push a Diffusers model
Optimize models with Pruna
Get a GPU on Brev
Get a GPU on Lambda Labs
Best practices for Replicate models
Optimize with torch.compile
Go deeper
Cache images with Cloudflare
Get started with ComfyUI
Use realtime speech with OpenAI
Handle webhooks with Val Town
Working with LoRAs
Topics
Models
About models
Run a model
Create a model
Publish a model
Model versions
Model hardware
Official models
Community models
Private and public models
Training destinations
Delete a model
Secrets
Predictions
About predictions
Create a prediction
Input files
Output files
Prediction lifecycle
Share a prediction
Rate limits
Safety checking
Data retention
Secrets
Streaming output
Deployments
About deployments
Create a deployment
View deployments
Monitor a deployment
Delete a deployment
Webhooks
About webhooks
Set up webhooks
Receive webhooks
Verify webhooks
Test your webhook code
Organizations
About organizations
Security
API tokens
Billing
About billing
Prepaid credit
Site policy
About subprocessors
Reference
How does Replicate work?
Client libraries
HTTP API
OpenAPI schema
llms.txt
Error codes
MCP server
Open source
Close
Popular searches on Replicate
\* Run a model from Node.js
\* Deploy a custom model
\* How does Replicate work?
Showing 0 results
Home / Reference

### HTTP API

The API documentation for the API.
Copy page
View as Markdown Open in ChatGPT Open in Claude
Authentication
search - Search models, collections, and docs (beta)
predictions.create - Create a prediction
predictions.get - Get a prediction
predictions.list - List predictions
predictions.cancel - Cancel a prediction
models.create - Create a model
models.get - Get a model
models.list - List public models
models.update - Update metadata for a model
models.search - Search public models
models.delete - Delete a model
models.examples.list - List examples for a model
models.predictions.create - Create a prediction using an official model
models.readme.get - Get a model's README
models.versions.get - Get a model version
models.versions.list - List model versions
models.versions.delete - Delete a model version
collections.get - Get a collection of models
collections.list - List collections of models
deployments.create - Create a deployment
deployments.get - Get a deployment
deployments.list - List deployments
deployments.update - Update a deployment
deployments.delete - Delete a deployment
deployments.predictions.create - Create a prediction using a deployment
trainings.create - Create a training
trainings.get - Get a training
trainings.list - List trainings
trainings.cancel - Cancel a training
hardware.list - List available hardware for models
account.get - Get the authenticated account
webhooks.default.secret.get - Get the signing secret for the default webhook

#### Authentication

All API requests must include a valid API token in the Authorization request header. The token must be prefixed by “Bearer”, followed by a space and the token value. Example: Authorization: Bearer r8\_Hw\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* Find your tokens at <https://replicate.com/account/api-tokens>

#### Search models, collections, and docs (beta)

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/search
```

##### Description

Search for public models, collections, and docs using a text query.
For models, the response includes all model data, plus a new metadata object with the following fields:
\* generated\_description : A longer and more detailed AI-generated description of the model
\* tags : An array of tags for the model
\* score : A score for the model's relevance to the search query
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  "https://api.replicate.com/v1/search?query=nano+banana"
```

Note: This search API is currently in beta and may change in future versions.

##### Query Parameters

```
*  query string Required The search query string
*  limit integer Maximum number of model results to return (1-50, defaults to 20)
```

#### Create a prediction

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/predictions
```

##### Description

Create a prediction for the model version and inputs you provide.
Example cURL request:
Copy

```
curl -s -X POST -H 'Prefer: wait' \
  -d '{"version": "replicate/hello-world:5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa", "input": {"text": "Alice"}}' \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  https://api.replicate.com/v1/predictions
```

The request will wait up to 60 seconds for the model to run. If this time is exceeded the prediction will be returned in a "starting" state and need to be retrieved using the predictions.get endpoint.
For a complete overview of the predictions.create API check out our documentation on creating a prediction which covers a variety of use cases.

##### Headers

```
*  Prefer string Leave the request open and wait for the model to finish generating output. Set to wait=n where n is a number of seconds between 1 and 60. See sync mode for more information.
*  Cancel-After string The maximum time the prediction can run before it is automatically canceled. The lifetime is measured from when the prediction is created. The duration can be specified as string with an optional unit suffix:
    *  s for seconds (e.g., 30s , 90s )
    *  m for minutes (e.g., 5m , 15m )
    *  h for hours (e.g., 1h , 2h30m )
    *  defaults to seconds if no unit suffix is provided (e.g. 30 is the same as 30s ) You can combine units for more precision (e.g., 1h30m45s ). The minimum allowed duration is 5 seconds.
```

##### Request Body

```
*  input object Required The model's input as a JSON object. The input schema depends on what model you are running. To see the available inputs, click the "API" tab on the model you are running or get the model version and look at its openapi_schema property. For example, stability-ai/sdxl takes prompt as an input. Files should be passed as HTTP URLs or data URLs. Use an HTTP URL when:
    *  you have a large file > 256kb
    *  you want to be able to use the file multiple times
    *  you want your prediction metadata to be associable with your input files Use a data URL when:
    *  you have a small file <= 256kb
    *  you don't want to upload and host the file somewhere
    *  you don't need to use the file again (Replicate will not store it)
*  version string Required The identifier for the model or model version that you want to run. This can be specified in a few different formats:
    *  {owner_name}/{model_name} - Use this format for official models. For example, black-forest-labs/flux-schnell . For all other models, the specific version is required.
    *  {owner_name}/{model_name}:{version_id} - The owner and model name, plus the full 64-character version ID. For example, replicate/hello-world:9dcd6d78e7c6560c340d916fe32e9f24aabfa331e5cce95fe31f77fb03121426 .
    *  {version_id} - Just the 64-character version ID. For example, 9dcd6d78e7c6560c340d916fe32e9f24aabfa331e5cce95fe31f77fb03121426
*  stream boolean  **This field is deprecated.**  Request a URL to receive streaming output using server-sent events (SSE). This field is no longer needed as the returned prediction will always have a stream entry in its urls property if the model supports streaming.
*  webhook string An HTTPS URL for receiving a webhook when the prediction has new output. The webhook will be a POST request where the request body is the same as the response body of the get prediction operation. If there are network problems, we will retry the webhook a few times, so make sure it can be safely called more than once. Replicate will not follow redirects when sending webhook requests to your service, so be sure to specify a URL that will resolve without redirecting.
*  webhook_events_filter array By default, we will send requests to your webhook URL whenever there are new outputs or the prediction has finished. You can change which events trigger webhook requests by specifying webhook_events_filter in the prediction request:
    *  start : immediately on prediction start
    *  output : each time a prediction generates an output (note that predictions can generate multiple outputs)
    *  logs : each time log output is generated by a prediction
    *  completed : when the prediction reaches a terminal state (succeeded/canceled/failed) For example, if you only wanted requests to be sent at the start and end of the prediction, you would provide:
```

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

Requests for event types output and logs will be sent at most once every 500ms. If you request start and completed webhooks, then they'll always be sent regardless of throttling.

#### Get a prediction

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/predictions/{prediction_id}
```

##### Description

Get the current state of a prediction.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu
```

The response will be the prediction object:
Copy

```
{
  "id": "gm3qorzdhgbfurvjtvhg6dckhu",
  "model": "replicate/hello-world",
  "version": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
  "input": {
    "text": "Alice"
  },
  "logs": "",
  "output": "hello Alice",
  "error": null,
  "status": "succeeded",
  "created_at": "2023-09-08T16:19:34.765994Z",
  "source": "api",
  "data_removed": false,
  "started_at": "2023-09-08T16:19:34.779176Z",
  "completed_at": "2023-09-08T16:19:34.791859Z",
  "metrics": {
    "predict_time": 0.012683
  },
  "urls": {
    "web": "https://replicate.com/p/gm3qorzdhgbfurvjtvhg6dckhu",
    "get": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu",
    "cancel": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu/cancel"
  }
}
```

source will indicate how the prediction was created. Possible values are web or api . status will be one of:
\* starting : the prediction is starting up. If this status lasts longer than a few seconds, then it's typically because a new worker is being started to run the prediction.
\* processing : the predict() method of the model is currently running.
\* succeeded : the prediction completed successfully.
\* failed : the prediction encountered an error during processing.
\* canceled : the prediction was canceled by its creator.
In the case of success, output will be an object containing the output of the model. Any files will be represented as HTTPS URLs. You'll need to pass the Authorization header to request them.
In the case of failure, error will contain the error encountered during the prediction.
Terminated predictions (with a status of succeeded , failed , or canceled ) will include a metrics object with a predict\_time property showing the amount of CPU or GPU time, in seconds, that the prediction used while running. It won't include time waiting for the prediction to start. The metrics object will also include a total\_time property showing the total time, in seconds, that the prediction took to complete.
All input parameters, output values, and logs are automatically removed after an hour, by default, for predictions created through the API.
You must save a copy of any data or files in the output if you'd like to continue using them. The output key will still be present, but it's value will be null after the output has been removed.
Output files are served by replicate.delivery and its subdomains. If you use an allow list of external domains for your assets, add replicate.delivery and \*.replicate.delivery to it.

##### URL Parameters

```
*  prediction_id string Required The ID of the prediction to get.
```

#### List predictions

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/predictions
```

##### Description

Get a paginated list of all predictions created by the user or organization associated with the provided API token.
This will include predictions created from the API and the website. It will return 100 records per page.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/predictions
```

The response will be a paginated JSON array of prediction objects, sorted with the most recent prediction first:
Copy

```
{
  "next": null,
  "previous": null,
  "results": [
    {
      "completed_at": "2023-09-08T16:19:34.791859Z",
      "created_at": "2023-09-08T16:19:34.907244Z",
      "data_removed": false,
      "error": null,
      "id": "gm3qorzdhgbfurvjtvhg6dckhu",
      "input": {
        "text": "Alice"
      },
      "metrics": {
        "predict_time": 0.012683
      },
      "output": "hello Alice",
      "started_at": "2023-09-08T16:19:34.779176Z",
      "source": "api",
      "status": "succeeded",
      "urls": {
        "web": "https://replicate.com/p/gm3qorzdhgbfurvjtvhg6dckhu",
        "get": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu",
        "cancel": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu/cancel"
      },
      "model": "replicate/hello-world",
      "version": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
    }
  ]
}
```

id will be the unique ID of the prediction. source will indicate how the prediction was created. Possible values are web or api . status will be the status of the prediction. Refer to get a single prediction for possible values. urls will be a convenience object that can be used to construct new API requests for the given prediction. If the requested model version supports streaming, this will have a stream entry with an HTTPS URL that you can use to construct an EventSource . model will be the model identifier string in the format of {model\_owner}/{model\_name} . version will be the unique ID of model version used to create the prediction. data\_removed will be true if the input and output data has been deleted.

##### Query Parameters

```
*  created_after string Include only predictions created at or after this date-time, in ISO 8601 format.
*  created_before string Include only predictions created before this date-time, in ISO 8601 format.
*  source string Filter predictions by how they were created. Currently only web is supported. If no value is set, the API returns predictions from both API and web sources. When filtering by source=web , results are limited to predictions created in the last 14 days.
```

#### Cancel a prediction

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/predictions/{prediction_id}/cancel
```

##### Description

Cancel a prediction that is currently running.
Example cURL request that creates a prediction and then cancels it:
Copy

```
# First, create a prediction
PREDICTION_ID=$(curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "prompt": "a video that may take a while to generate"
    }
  }' \
  https://api.replicate.com/v1/models/minimax/video-01/predictions | jq -r '.id')

# Echo the prediction ID
echo "Created prediction with ID: $PREDICTION_ID"

# Cancel the prediction
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/predictions/$PREDICTION_ID/cancel
```

##### URL Parameters

```
*  prediction_id string Required The ID of the prediction to cancel.
```

#### Create a model

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/models
```

##### Description

Create a model.
Example cURL request:
Copy

```
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"owner": "alice", "name": "hot-dog-detector", "description": "Detect hot dogs in images", "visibility": "public", "hardware": "cpu"}' \
  https://api.replicate.com/v1/models
```

The response will be a model object in the following format:
Copy

```
{
  "url": "https://replicate.com/alice/hot-dog-detector",
  "owner": "alice",
  "name": "hot-dog-detector",
  "description": "Detect hot dogs in images",
  "visibility": "public",
  "github_url": null,
  "paper_url": null,
  "license_url": null,
  "run_count": 0,
  "cover_image_url": null,
  "default_example": null,
  "latest_version": null,
}
```

Note that there is a limit of 1,000 models per account. For most purposes, we recommend using a single model and pushing new versions of the model as you make changes to it.

##### Request Body

```
*  hardware string Required The SKU for the hardware used to run the model. Possible values can be retrieved from the hardware.list endpoint.
*  name string Required The name of the model. This must be unique among all models owned by the user or organization.
*  owner string Required The name of the user or organization that will own the model. This must be the same as the user or organization that is making the API request. In other words, the API token used in the request must belong to this user or organization.
*  visibility string Required Whether the model should be public or private. A public model can be viewed and run by anyone, whereas a private model can be viewed and run only by the user or organization members that own the model.
*  cover_image_url string A URL for the model's cover image. This should be an image file.
*  description string A description of the model.
*  github_url string A URL for the model's source code on GitHub.
*  license_url string A URL for the model's license.
*  paper_url string A URL for the model's paper.
```

#### Get a model

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models/{model_owner}/{model_name}
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world
```

The response will be a model object in the following format:
Copy

```
{
  "url": "https://replicate.com/replicate/hello-world",
  "owner": "replicate",
  "name": "hello-world",
  "description": "A tiny model that says hello",
  "visibility": "public",
  "github_url": "https://github.com/replicate/cog-examples",
  "paper_url": null,
  "license_url": null,
  "run_count": 5681081,
  "cover_image_url": "...",
  "default_example": {...},
  "latest_version": {...},
}
```

The model object includes the input and output schema for the latest version of the model.
Here's an example showing how to fetch the model with cURL and display its input schema with jq:
Copy

```
curl -s \
    -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
    https://api.replicate.com/v1/models/replicate/hello-world \
    | jq ".latest_version.openapi_schema.components.schemas.Input"
```

This will return the following JSON object:
Copy

```
{
  "type": "object",
  "title": "Input",
  "required": [
    "text"
  ],
  "properties": {
    "text": {
      "type": "string",
      "title": "Text",
      "x-order": 0,
      "description": "Text to prefix with 'hello '"
    }
  }
}
```

The cover\_image\_url string is an HTTPS URL for an image file. This can be:
\* An image uploaded by the model author.
\* The output file of the example prediction, if the model author has not set a cover image.
\* The input file of the example prediction, if the model author has not set a cover image and the example prediction has no output file.
\* A generic fallback image.
The default\_example object is a prediction created with this model.
The latest\_version object is the model's most recently pushed version.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

#### List public models

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models
```

##### Description

Get a paginated list of public models.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models
```

The response will be a pagination object containing a list of model objects.
See the models.get docs for more details about the model object.

#### Sorting

You can sort the results using the sort\_by and sort\_direction query parameters.
For example, to get the most recently created models:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  "https://api.replicate.com/v1/models?sort_by=model_created_at&sort_direction=desc"
```

Available sorting options:
\* model\_created\_at : Sort by when the model was first created
\* latest\_version\_created\_at : Sort by when the model's latest version was created (default)
Sort direction can be asc (ascending) or desc (descending, default).

##### Query Parameters

```
*  sort_by string Field to sort models by. Defaults to latest_version_created_at .
*  sort_direction string Sort direction. Defaults to desc (descending, newest first).
```

#### Update metadata for a model

##### Endpoint

Copy

```
PATCH https://api.replicate.com/v1/models/{model_owner}/{model_name}
```

##### Description

Update select properties of an existing model.
You can update the following properties:
\* description - Model description
\* readme - Model README content
\* github\_url - GitHub repository URL
\* paper\_url - Research paper URL
\* weights\_url - Model weights URL
\* license\_url - License URL
Example cURL request:
Copy

```
curl -X PATCH \
  https://api.replicate.com/v1/models/your-username/your-model-name \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Detect hot dogs in images",
    "readme": "# Hot Dog Detector\n\n🌭 Ketchup, mustard, and onions...",
    "github_url": "https://github.com/alice/hot-dog-detector",
    "paper_url": "https://arxiv.org/abs/2504.17639",
    "weights_url": "https://huggingface.co/alice/hot-dog-detector",
    "license_url": "https://choosealicense.com/licenses/mit/"
  }'
```

The response will be the updated model object with all of its properties.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

##### Request Body

```
*  description string A description of the model.
*  github_url string A URL for the model's source code on GitHub.
*  license_url string A URL for the model's license.
*  paper_url string A URL for the model's paper.
*  readme string The README content of the model.
*  weights_url string A URL for the model's weights.
```

#### Search public models

##### Endpoint

Copy

```
QUERY https://api.replicate.com/v1/models
```

##### Description

Get a list of public models matching a search query.
Example cURL request:
Copy

```
curl -s -X QUERY \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: text/plain" \
  -d "hello" \
  https://api.replicate.com/v1/models
```

The response will be a paginated JSON object containing an array of model objects.
See the models.get docs for more details about the model object.

#### Delete a model

##### Endpoint

Copy

```
DELETE https://api.replicate.com/v1/models/{model_owner}/{model_name}
```

##### Description

Delete a model
Model deletion has some restrictions:
\* You can only delete models you own.
\* You can only delete private models.
\* You can only delete models that have no versions associated with them. Currently you'll need to delete the model's versions before you can delete the model itself.
Example cURL request:
Copy

```
curl -s -X DELETE \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world
```

The response will be an empty 204, indicating the model has been deleted.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

#### List examples for a model

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models/{model_owner}/{model_name}/examples
```

##### Description

List example predictions made using the model. These are predictions that were saved by the model author as illustrative examples of the model's capabilities.
If you want all the examples for a model, use this operation.
If you just want the model's default example, you can use the models.get operation instead, which includes a default\_example object.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world/examples
```

The response will be a pagination object containing a list of example predictions:
Copy

```
{
  "next": "https://api.replicate.com/v1/models/replicate/hello-world/examples?cursor=...",
  "previous": "https://api.replicate.com/v1/models/replicate/hello-world/examples?cursor=...",
  "results": [...]
}
```

Each item in the results list is a prediction object.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

#### Create a prediction using an official model

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/models/{model_owner}/{model_name}/predictions
```

##### Description

Create a prediction using an official model.
If you're *not* running an official model, use the predictions.create operation instead.
Example cURL request:
Copy

```
curl -s -X POST -H 'Prefer: wait' \
  -d '{"input": {"prompt": "Write a short poem about the weather."}}' \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions
```

The request will wait up to 60 seconds for the model to run. If this time is exceeded the prediction will be returned in a "starting" state and need to be retrieved using the predictions.get endpoint.
For a complete overview of the deployments.predictions.create API check out our documentation on creating a prediction which covers a variety of use cases.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

##### Headers

```
*  Prefer string Leave the request open and wait for the model to finish generating output. Set to wait=n where n is a number of seconds between 1 and 60. See sync mode for more information.
*  Cancel-After string The maximum time the prediction can run before it is automatically canceled. The lifetime is measured from when the prediction is created. The duration can be specified as string with an optional unit suffix:
    *  s for seconds (e.g., 30s , 90s )
    *  m for minutes (e.g., 5m , 15m )
    *  h for hours (e.g., 1h , 2h30m )
    *  defaults to seconds if no unit suffix is provided (e.g. 30 is the same as 30s ) You can combine units for more precision (e.g., 1h30m45s ). The minimum allowed duration is 5 seconds.
```

##### Request Body

```
*  input object Required The model's input as a JSON object. The input schema depends on what model you are running. To see the available inputs, click the "API" tab on the model you are running or get the model version and look at its openapi_schema property. For example, stability-ai/sdxl takes prompt as an input. Files should be passed as HTTP URLs or data URLs. Use an HTTP URL when:
    *  you have a large file > 256kb
    *  you want to be able to use the file multiple times
    *  you want your prediction metadata to be associable with your input files Use a data URL when:
    *  you have a small file <= 256kb
    *  you don't want to upload and host the file somewhere
    *  you don't need to use the file again (Replicate will not store it)
*  stream boolean  **This field is deprecated.**  Request a URL to receive streaming output using server-sent events (SSE). This field is no longer needed as the returned prediction will always have a stream entry in its urls property if the model supports streaming.
*  webhook string An HTTPS URL for receiving a webhook when the prediction has new output. The webhook will be a POST request where the request body is the same as the response body of the get prediction operation. If there are network problems, we will retry the webhook a few times, so make sure it can be safely called more than once. Replicate will not follow redirects when sending webhook requests to your service, so be sure to specify a URL that will resolve without redirecting.
*  webhook_events_filter array By default, we will send requests to your webhook URL whenever there are new outputs or the prediction has finished. You can change which events trigger webhook requests by specifying webhook_events_filter in the prediction request:
    *  start : immediately on prediction start
    *  output : each time a prediction generates an output (note that predictions can generate multiple outputs)
    *  logs : each time log output is generated by a prediction
    *  completed : when the prediction reaches a terminal state (succeeded/canceled/failed) For example, if you only wanted requests to be sent at the start and end of the prediction, you would provide:
```

```
{
  "input": {
    "text": "Alice"
  },
  "webhook": "https://example.com/my-webhook",
  "webhook_events_filter": ["start", "completed"]
}
```

Requests for event types output and logs will be sent at most once every 500ms. If you request start and completed webhooks, then they'll always be sent regardless of throttling.

#### Get a model's README

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models/{model_owner}/{model_name}/readme
```

##### Description

Get the README content for a model.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world/readme
```

The response will be the README content as plain text in Markdown format:
Copy

```
# Hello World Model

This is an example model that...
```

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

#### Get a model version

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models/{model_owner}/{model_name}/versions/{version_id}
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world/versions/5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa
```

The response will be the version object:
Copy

```
{
  "id": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
  "created_at": "2022-04-26T19:29:04.418669Z",
  "cog_version": "0.3.0",
  "openapi_schema": {...}
}
```

Every model describes its inputs and outputs with OpenAPI Schema Objects in the openapi\_schema property.
The openapi\_schema.components.schemas.Input property for the replicate/hello-world model looks like this:
Copy

```
{
  "type": "object",
  "title": "Input",
  "required": [
    "text"
  ],
  "properties": {
    "text": {
      "x-order": 0,
      "type": "string",
      "title": "Text",
      "description": "Text to prefix with 'hello '"
    }
  }
}
```

The openapi\_schema.components.schemas.Output property for the replicate/hello-world model looks like this:
Copy

```
{
  "type": "string",
  "title": "Output"
}
```

For more details, see the docs on Cog's supported input and output types

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
*  version_id string Required The ID of the version.
```

#### List model versions

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/models/{model_owner}/{model_name}/versions
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world/versions
```

The response will be a JSON array of model version objects, sorted with the most recent version first:
Copy

```
{
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
      "created_at": "2022-04-26T19:29:04.418669Z",
      "cog_version": "0.3.0",
      "openapi_schema": {...}
    }
  ]
}
```

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
```

#### Delete a model version

##### Endpoint

Copy

```
DELETE https://api.replicate.com/v1/models/{model_owner}/{model_name}/versions/{version_id}
```

##### Description

Delete a model version and all associated predictions, including all output files.
Model version deletion has some restrictions:
\* You can only delete versions from models you own.
\* You can only delete versions from private models.
\* You cannot delete a version if someone other than you has run predictions with it.
\* You cannot delete a version if it is being used as the base model for a fine tune/training.
\* You cannot delete a version if it has an associated deployment.
\* You cannot delete a version if another model version is overridden to use it.
Example cURL request:
Copy

```
curl -s -X DELETE \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models/replicate/hello-world/versions/5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa
```

The response will be an empty 202, indicating the deletion request has been accepted. It might take a few minutes to be processed.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
*  version_id string Required The ID of the version.
```

#### Get a collection of models

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/collections/{collection_slug}
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/collections/super-resolution
```

The response will be a collection object with a nested list of the models in that collection:
Copy

```
{
  "name": "Super resolution",
  "slug": "super-resolution",
  "description": "Upscaling models that create high-quality images from low-quality images.",
  "full_description": "## Overview\n\nThese models generate high-quality images from low-quality images. Many of these models are based on **advanced upscaling techniques**.\n\n### Key Features\n\n- Enhance image resolution\n- Restore fine details\n- Improve overall image quality",
  "models": [...]
}
```

##### URL Parameters

```
*  collection_slug string Required The slug of the collection, like super-resolution or image-restoration . See replicate.com/collections.
```

#### List collections of models

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/collections
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/collections
```

The response will be a paginated JSON list of collection objects:
Copy

```
{
  "next": "null",
  "previous": null,
  "results": [
    {
      "name": "Super resolution",
      "slug": "super-resolution",
      "description": "Upscaling models that create high-quality images from low-quality images."
    }
  ]
}
```

#### Create a deployment

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/deployments
```

##### Description

Create a new deployment:
Example cURL request:
Copy

```
curl -s \
  -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "my-app-image-generator",
        "model": "stability-ai/sdxl",
        "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
        "hardware": "gpu-t4",
        "min_instances": 0,
        "max_instances": 3
      }' \
  https://api.replicate.com/v1/deployments
```

The response will be a JSON object describing the deployment:
Copy

```
{
  "owner": "acme",
  "name": "my-app-image-generator",
  "current_release": {
    "number": 1,
    "model": "stability-ai/sdxl",
    "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    "created_at": "2024-02-15T16:32:57.018467Z",
    "created_by": {
      "type": "organization",
      "username": "acme",
      "name": "Acme Corp, Inc.",
      "avatar_url": "https://cdn.replicate.com/avatars/acme.png",
      "github_url": "https://github.com/acme"
    },
    "configuration": {
      "hardware": "gpu-t4",
      "min_instances": 1,
      "max_instances": 5
    }
  }
}
```

##### Request Body

```
*  hardware string Required The SKU for the hardware used to run the model. Possible values can be retrieved from the hardware.list endpoint.
*  max_instances integer Required The maximum number of instances for scaling.
*  min_instances integer Required The minimum number of instances for scaling.
*  model string Required The full name of the model that you want to deploy e.g. stability-ai/sdxl.
*  name string Required The name of the deployment.
*  version string Required The 64-character string ID of the model version that you want to deploy.
```

#### Get a deployment

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/deployments/{deployment_owner}/{deployment_name}
```

##### Description

Get information about a deployment by name including the current release.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/deployments/replicate/my-app-image-generator
```

The response will be a JSON object describing the deployment:
Copy

```
{
  "owner": "acme",
  "name": "my-app-image-generator",
  "current_release": {
    "number": 1,
    "model": "stability-ai/sdxl",
    "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    "created_at": "2024-02-15T16:32:57.018467Z",
    "created_by": {
      "type": "organization",
      "username": "acme",
      "name": "Acme Corp, Inc.",
      "avatar_url": "https://cdn.replicate.com/avatars/acme.png",
      "github_url": "https://github.com/acme"
    },
    "configuration": {
      "hardware": "gpu-t4",
      "min_instances": 1,
      "max_instances": 5
    }
  }
}
```

##### URL Parameters

```
*  deployment_owner string Required The name of the user or organization that owns the deployment.
*  deployment_name string Required The name of the deployment.
```

#### List deployments

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/deployments
```

##### Description

Get a list of deployments associated with the current account, including the latest release configuration for each deployment.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/deployments
```

The response will be a paginated JSON array of deployment objects, sorted with the most recent deployment first:
Copy

```
{
  "next": "http://api.replicate.com/v1/deployments?cursor=cD0yMDIzLTA2LTA2KzIzJTNBNDAlM0EwOC45NjMwMDAlMkIwMCUzQTAw",
  "previous": null,
  "results": [
    {
      "owner": "replicate",
      "name": "my-app-image-generator",
      "current_release": {
        "number": 1,
        "model": "stability-ai/sdxl",
        "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
        "created_at": "2024-02-15T16:32:57.018467Z",
        "created_by": {
          "type": "organization",
          "username": "acme",
          "name": "Acme Corp, Inc.",
          "avatar_url": "https://cdn.replicate.com/avatars/acme.png",
          "github_url": "https://github.com/acme"
        },
        "configuration": {
          "hardware": "gpu-t4",
          "min_instances": 1,
          "max_instances": 5
        }
      }
    }
  ]
}
```

#### Update a deployment

##### Endpoint

Copy

```
PATCH https://api.replicate.com/v1/deployments/{deployment_owner}/{deployment_name}
```

##### Description

Update properties of an existing deployment, including hardware, min/max instances, and the deployment's underlying model version.
Example cURL request:
Copy

```
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"min_instances": 3, "max_instances": 10}' \
  https://api.replicate.com/v1/deployments/acme/my-app-image-generator
```

The response will be a JSON object describing the deployment:
Copy

```
{
  "owner": "acme",
  "name": "my-app-image-generator",
  "current_release": {
    "number": 2,
    "model": "stability-ai/sdxl",
    "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    "created_at": "2024-02-15T16:32:57.018467Z",
    "created_by": {
      "type": "organization",
      "username": "acme",
      "name": "Acme Corp, Inc.",
      "avatar_url": "https://cdn.replicate.com/avatars/acme.png",
      "github_url": "https://github.com/acme"
    },
    "configuration": {
      "hardware": "gpu-t4",
      "min_instances": 3,
      "max_instances": 10
    }
  }
}
```

Updating any deployment properties will increment the number field of the current\_release .

##### URL Parameters

```
*  deployment_owner string Required The name of the user or organization that owns the deployment.
*  deployment_name string Required The name of the deployment.
```

##### Request Body

```
*  hardware string The SKU for the hardware used to run the model. Possible values can be retrieved from the hardware.list endpoint.
*  max_instances integer The maximum number of instances for scaling.
*  min_instances integer The minimum number of instances for scaling.
*  version string The ID of the model version that you want to deploy
```

#### Delete a deployment

##### Endpoint

Copy

```
DELETE https://api.replicate.com/v1/deployments/{deployment_owner}/{deployment_name}
```

##### Description

Delete a deployment
Deployment deletion has some restrictions:
\* You can only delete deployments that have been offline and unused for at least 15 minutes.
Example cURL request:
Copy

```
curl -s -X DELETE \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/deployments/acme/my-app-image-generator
```

The response will be an empty 204, indicating the deployment has been deleted.

##### URL Parameters

```
*  deployment_owner string Required The name of the user or organization that owns the deployment.
*  deployment_name string Required The name of the deployment.
```

#### Create a prediction using a deployment

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/deployments/{deployment_owner}/{deployment_name}/predictions
```

##### Description

Create a prediction for the deployment and inputs you provide.
Example cURL request:
Copy

```
curl -s -X POST -H 'Prefer: wait' \
  -d '{"input": {"prompt": "A photo of a bear riding a bicycle over the moon"}}' \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  https://api.replicate.com/v1/deployments/acme/my-app-image-generator/predictions
```

The request will wait up to 60 seconds for the model to run. If this time is exceeded the prediction will be returned in a "starting" state and need to be retrieved using the predictions.get endpoint.
For a complete overview of the deployments.predictions.create API check out our documentation on creating a prediction which covers a variety of use cases.

##### URL Parameters

```
*  deployment_owner string Required The name of the user or organization that owns the deployment.
*  deployment_name string Required The name of the deployment.
```

##### Headers

```
*  Prefer string Leave the request open and wait for the model to finish generating output. Set to wait=n where n is a number of seconds between 1 and 60. See sync mode for more information.
*  Cancel-After string The maximum time the prediction can run before it is automatically canceled. The lifetime is measured from when the prediction is created. The duration can be specified as string with an optional unit suffix:
    *  s for seconds (e.g., 30s , 90s )
    *  m for minutes (e.g., 5m , 15m )
    *  h for hours (e.g., 1h , 2h30m )
    *  defaults to seconds if no unit suffix is provided (e.g. 30 is the same as 30s ) You can combine units for more precision (e.g., 1h30m45s ). The minimum allowed duration is 5 seconds.
```

##### Request Body

```
*  input object Required The model's input as a JSON object. The input schema depends on what model you are running. To see the available inputs, click the "API" tab on the model you are running or get the model version and look at its openapi_schema property. For example, stability-ai/sdxl takes prompt as an input. Files should be passed as HTTP URLs or data URLs. Use an HTTP URL when:
    *  you have a large file > 256kb
    *  you want to be able to use the file multiple times
    *  you want your prediction metadata to be associable with your input files Use a data URL when:
    *  you have a small file <= 256kb
    *  you don't want to upload and host the file somewhere
    *  you don't need to use the file again (Replicate will not store it)
*  stream boolean  **This field is deprecated.**  Request a URL to receive streaming output using server-sent events (SSE). This field is no longer needed as the returned prediction will always have a stream entry in its urls property if the model supports streaming.
*  webhook string An HTTPS URL for receiving a webhook when the prediction has new output. The webhook will be a POST request where the request body is the same as the response body of the get prediction operation. If there are network problems, we will retry the webhook a few times, so make sure it can be safely called more than once. Replicate will not follow redirects when sending webhook requests to your service, so be sure to specify a URL that will resolve without redirecting.
*  webhook_events_filter array By default, we will send requests to your webhook URL whenever there are new outputs or the prediction has finished. You can change which events trigger webhook requests by specifying webhook_events_filter in the prediction request:
    *  start : immediately on prediction start
    *  output : each time a prediction generates an output (note that predictions can generate multiple outputs)
    *  logs : each time log output is generated by a prediction
    *  completed : when the prediction reaches a terminal state (succeeded/canceled/failed) For example, if you only wanted requests to be sent at the start and end of the prediction, you would provide:
```

```
{
  "input": {
    "text": "Alice"
  },
  "webhook": "https://example.com/my-webhook",
  "webhook_events_filter": ["start", "completed"]
}
```

Requests for event types output and logs will be sent at most once every 500ms. If you request start and completed webhooks, then they'll always be sent regardless of throttling.

#### Create a training

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/models/{model_owner}/{model_name}/versions/{version_id}/trainings
```

##### Description

Start a new training of the model version you specify.
Example request body:
Copy

```
{
  "destination": "{new_owner}/{new_name}",
  "input": {
    "train_data": "https://example.com/my-input-images.zip",
  },
  "webhook": "https://example.com/my-webhook",
}
```

Example cURL request:
Copy

```
curl -s -X POST \
  -d '{"destination": "{new_owner}/{new_name}", "input": {"input_images": "https://example.com/my-input-images.zip"}}' \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  https://api.replicate.com/v1/models/stability-ai/sdxl/versions/da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf/trainings
```

The response will be the training object:
Copy

```
{
  "id": "zz4ibbonubfz7carwiefibzgga",
  "model": "stability-ai/sdxl",
  "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
  "input": {
    "input_images": "https://example.com/my-input-images.zip"
  },
  "logs": "",
  "error": null,
  "status": "starting",
  "created_at": "2023-09-08T16:32:56.990893084Z",
  "urls": {
    "web": "https://replicate.com/p/zz4ibbonubfz7carwiefibzgga",
     "get": "https://api.replicate.com/v1/predictions/zz4ibbonubfz7carwiefibzgga",
     "cancel": "https://api.replicate.com/v1/predictions/zz4ibbonubfz7carwiefibzgga/cancel"
  }
}
```

As models can take several minutes or more to train, the result will not be available immediately. To get the final result of the training you should either provide a webhook HTTPS URL for us to call when the results are ready, or poll the get a training endpoint until it has finished.
When a training completes, it creates a new version of the model at the specified destination.
To find some models to train on, check out the trainable language models collection.

##### URL Parameters

```
*  model_owner string Required The name of the user or organization that owns the model.
*  model_name string Required The name of the model.
*  version_id string Required The ID of the version.
```

##### Request Body

```
*  destination string Required A string representing the desired model to push to in the format {destination_model_owner}/{destination_model_name} . This should be an existing model owned by the user or organization making the API request. If the destination is invalid, the server will return an appropriate 4XX response.
*  input object Required An object containing inputs to the Cog model's train() function.
*  webhook string An HTTPS URL for receiving a webhook when the training completes. The webhook will be a POST request where the request body is the same as the response body of the get training operation. If there are network problems, we will retry the webhook a few times, so make sure it can be safely called more than once. Replicate will not follow redirects when sending webhook requests to your service, so be sure to specify a URL that will resolve without redirecting.
*  webhook_events_filter array By default, we will send requests to your webhook URL whenever there are new outputs or the training has finished. You can change which events trigger webhook requests by specifying webhook_events_filter in the training request:
    *  start : immediately on training start
    *  output : each time a training generates an output (note that trainings can generate multiple outputs)
    *  logs : each time log output is generated by a training
    *  completed : when the training reaches a terminal state (succeeded/canceled/failed) For example, if you only wanted requests to be sent at the start and end of the training, you would provide:
```

```
{
  "destination": "my-organization/my-model",
  "input": {
    "text": "Alice"
  },
  "webhook": "https://example.com/my-webhook",
  "webhook_events_filter": ["start", "completed"]
}
```

Requests for event types output and logs will be sent at most once every 500ms. If you request start and completed webhooks, then they'll always be sent regardless of throttling.

#### Get a training

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/trainings/{training_id}
```

##### Description

Get the current state of a training.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/trainings/zz4ibbonubfz7carwiefibzgga
```

The response will be the training object:
Copy

```
{
  "completed_at": "2023-09-08T16:41:19.826523Z",
  "created_at": "2023-09-08T16:32:57.018467Z",
  "error": null,
  "id": "zz4ibbonubfz7carwiefibzgga",
  "input": {
    "input_images": "https://example.com/my-input-images.zip"
  },
  "logs": "...",
  "metrics": {
    "predict_time": 502.713876
  },
  "output": {
    "version": "...",
    "weights": "..."
  },
  "started_at": "2023-09-08T16:32:57.112647Z",
  "status": "succeeded",
  "urls": {
    "web": "https://replicate.com/p/zz4ibbonubfz7carwiefibzgga",
    "get": "https://api.replicate.com/v1/trainings/zz4ibbonubfz7carwiefibzgga",
    "cancel": "https://api.replicate.com/v1/trainings/zz4ibbonubfz7carwiefibzgga/cancel"
  },
  "model": "stability-ai/sdxl",
  "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
}
```

status will be one of:
\* starting : the training is starting up. If this status lasts longer than a few seconds, then it's typically because a new worker is being started to run the training.
\* processing : the train() method of the model is currently running.
\* succeeded : the training completed successfully.
\* failed : the training encountered an error during processing.
\* canceled : the training was canceled by its creator.
In the case of success, output will be an object containing the output of the model. Any files will be represented as HTTPS URLs. You'll need to pass the Authorization header to request them.
In the case of failure, error will contain the error encountered during the training.
Terminated trainings (with a status of succeeded , failed , or canceled ) will include a metrics object with a predict\_time property showing the amount of CPU or GPU time, in seconds, that the training used while running. It won't include time waiting for the training to start. The metrics object will also include a total\_time property showing the total time, in seconds, that the training took to complete.

##### URL Parameters

```
*  training_id string Required The ID of the training to get.
```

#### List trainings

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/trainings
```

##### Description

Get a paginated list of all trainings created by the user or organization associated with the provided API token.
This will include trainings created from the API and the website. It will return 100 records per page.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/trainings
```

The response will be a paginated JSON array of training objects, sorted with the most recent training first:
Copy

```
{
  "next": null,
  "previous": null,
  "results": [
    {
      "completed_at": "2023-09-08T16:41:19.826523Z",
      "created_at": "2023-09-08T16:32:57.018467Z",
      "error": null,
      "id": "zz4ibbonubfz7carwiefibzgga",
      "input": {
        "input_images": "https://example.com/my-input-images.zip"
      },
      "metrics": {
        "predict_time": 502.713876
      },
      "output": {
        "version": "...",
        "weights": "..."
      },
      "started_at": "2023-09-08T16:32:57.112647Z",
      "source": "api",
      "status": "succeeded",
      "urls": {
        "web": "https://replicate.com/p/zz4ibbonubfz7carwiefibzgga",
        "get": "https://api.replicate.com/v1/trainings/zz4ibbonubfz7carwiefibzgga",
        "cancel": "https://api.replicate.com/v1/trainings/zz4ibbonubfz7carwiefibzgga/cancel"
      },
      "model": "stability-ai/sdxl",
      "version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    }
  ]
}
```

id will be the unique ID of the training. source will indicate how the training was created. Possible values are web or api . status will be the status of the training. Refer to get a single training for possible values. urls will be a convenience object that can be used to construct new API requests for the given training. version will be the unique ID of model version used to create the training.

#### Cancel a training

##### Endpoint

Copy

```
POST https://api.replicate.com/v1/trainings/{training_id}/cancel
```

##### URL Parameters

```
*  training_id string Required The ID of the training you want to cancel.
```

#### List available hardware for models

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/hardware
```

##### Description

Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/hardware
```

The response will be a JSON array of hardware objects:
Copy

```
[
    {"name": "CPU", "sku": "cpu"},
    {"name": "Nvidia T4 GPU", "sku": "gpu-t4"},
    {"name": "Nvidia A40 GPU", "sku": "gpu-a40-small"},
    {"name": "Nvidia A40 (Large) GPU", "sku": "gpu-a40-large"},
]
```

#### Get the authenticated account

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/account
```

##### Description

Returns information about the user or organization associated with the provided API token.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/account
```

The response will be a JSON object describing the account:
Copy

```
{
  "type": "organization",
  "username": "acme",
  "name": "Acme Corp, Inc.",
  "github_url": "https://github.com/acme",
}
```

#### Get the signing secret for the default webhook

##### Endpoint

Copy

```
GET https://api.replicate.com/v1/webhooks/default/secret
```

##### Description

Get the signing secret for the default webhook endpoint. This is used to verify that webhook requests are coming from Replicate.
Example cURL request:
Copy

```
curl -s \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/webhooks/default/secret
```

The response will be a JSON object with a key property:
Copy

```
{
  "key": "..."
}
```

#### Rate limits

We limit the number of API requests that can be made to Replicate:
\* You can call create prediction at 600 requests per minute.
\* All other endpoints you can call at 3000 requests per minute.
If you hit a limit, you will receive a response with status 429 with a body like:
Copy

```
{"detail":"Request was throttled. Expected available in 1 second."}
```

If you want higher limits, contact us.

#### OpenAPI schema

Replicate's public HTTP API documentation is available as a machine-readable OpenAPI schema in JSON format.
See OpenAPI schema to learn more and download the schema.
Next: OpenAPI schema
All services are online
\* Home
\* About
\* Changelog
\* Join us
\* Terms
\* Privacy
\* Status
\* Support
System theme
Light theme
Dark theme
