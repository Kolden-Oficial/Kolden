---
id_fonte: "65ae78aa-f205-48a5-b92b-281840490631"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "meta-llama/llama3: The official Meta Llama 3 GitHub site"
tipo: "unknown"
url_original: "https://github.com/meta-llama/llama3"
keywords: "('Meta Llama 3', 'Model Download Instructions', 'Repository Deprecation Notice', 'Local Inference Setup', 'Responsible AI Use')"
summary: "The provided text details the **official Meta Llama 3 GitHub repository**, which serves as a foundational resource for accessing and implementing Meta’s third-generation large language models. Although the repository is now **archived and deprecated** in favor of a more comprehensive **Llama Stack**, it remains a technical guide for running **inference** on both pre-trained and instruction-tuned models ranging from 8B to 70B parameters. The documentation emphasizes **responsible innovation**, requiring users to accept a license and use a specific **download script** to retrieve model weights and tokenizers. Furthermore, it outlines necessary **hardware configurations** and formatting protocols to ensure the models function correctly for diverse research and commercial applications."
extraido_em: "2026-06-30T16:22:42Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# meta-llama/llama3: The official Meta Llama 3 GitHub site

GitHub - meta-llama/llama3: The official Meta Llama 3 GitHub site · GitHub
Skip to content

#### Navigation Menu

Toggle navigation
Sign in
Appearance settings
\* Platform
\* AI CODE CREATION
\* GitHub Copilot Write better code with AI
\* GitHub Spark Build and deploy intelligent apps
\* GitHub Models Manage and compare prompts
\* MCP Registry New Integrate external tools
\* DEVELOPER WORKFLOWS
\* Actions Automate any workflow
\* Codespaces Instant dev environments
\* Issues Plan and track work
\* Code Review Manage code changes
\* APPLICATION SECURITY
\* GitHub Advanced Security Find and fix vulnerabilities
\* Code security Secure your code as you build
\* Secret protection Stop leaks before they start
\* EXPLORE
\* Why GitHub
\* Documentation
\* Blog
\* Changelog
\* Marketplace View all features
\* Solutions
\* BY COMPANY SIZE
\* Enterprises
\* Small and medium teams
\* Startups
\* Nonprofits
\* BY USE CASE
\* App Modernization
\* DevSecOps
\* DevOps
\* CI/CD
\* View all use cases
\* BY INDUSTRY
\* Healthcare
\* Financial services
\* Manufacturing
\* Government
\* View all industries View all solutions
\* Resources
\* EXPLORE BY TOPIC
\* AI
\* Software Development
\* DevOps
\* Security
\* View all topics
\* EXPLORE BY TYPE
\* Customer stories
\* Events & webinars
\* Ebooks & reports
\* Business insights
\* GitHub Skills
\* SUPPORT & SERVICES
\* Documentation
\* Customer support
\* Community forum
\* Trust center
\* Partners View all resources
\* Open Source
\* COMMUNITY
\* GitHub Sponsors Fund open source developers
\* PROGRAMS
\* Security Lab
\* Maintainer Community
\* Accelerator
\* GitHub Stars
\* Archive Program
\* REPOSITORIES
\* Topics
\* Trending
\* Collections
\* Enterprise
\* ENTERPRISE SOLUTIONS
\* Enterprise platform AI-powered developer platform
\* AVAILABLE ADD-ONS
\* GitHub Advanced Security Enterprise-grade security features
\* Copilot for Business Enterprise-grade AI features
\* Premium Support Enterprise-grade 24/7 support
\* Pricing
Search or jump to...

### Search code, repositories, users, issues, pull requests...

Search
Clear
Search syntax tips

### Provide feedback

We read every piece of feedback, and take your input very seriously. [-]
Include my email address so I can be contacted
Cancel Submit feedback

### Saved searches

#### Use saved searches to filter your results more quickly

Name
Query
To see all available qualifiers, see our documentation.
Cancel Create saved search
Sign in
Sign up
Appearance settings
Resetting focus
You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert
This repository was archived by the owner on Mar 1, 2026. It is now read-only.
meta-llama / **llama3** Public archive
\* Notifications You must be signed in to change notification settings
\* Fork 3.5k
\* Star 29.3k
\* Code
\* Issues 178
\* Pull requests 39
\* Actions
\* Projects
\* Security and quality 0
\* Insights
Additional navigation options
\* Code
\* Issues
\* Pull requests
\* Actions
\* Projects
\* Security and quality
\* Insights

### meta-llama/llama3

main
19 Branches 0 Tags
Go to file
Code
Open more actions menu

#### Folders and files

| Name |  | Name | Last commit message | Last commit date |
| --- | --- | --- | --- | --- |
| ## Latest commit amitsangani Update README.md Open commit details last year a0940f9 · last year ## History 132 Commits Open commit details 132 Commits |  |  |  |  |
| .github/ ISSUE\_TEMPLATE |  | .github/ ISSUE\_TEMPLATE | Create issue template | 2 years ago |
| llama |  | llama | add assertion to build function of Llama | 2 years ago |
| .gitignore |  | .gitignore | . | 2 years ago |
| CODE\_OF\_CONDUCT.md |  | CODE\_OF\_CONDUCT.md | Create CODE\_OF\_CONDUCT.md | 2 years ago |
| CONTRIBUTING.md |  | CONTRIBUTING.md | Update CONTRIBUTING.md | 2 years ago |
| LICENSE |  | LICENSE | Update LICENSE | 2 years ago |
| Llama3\_Repo.jpeg |  | Llama3\_Repo.jpeg | Add files via upload | 2 years ago |
| MODEL\_CARD.md |  | MODEL\_CARD.md | Update MODEL\_CARD.md | 2 years ago |
| README.md |  | README.md | Update README.md | last year |
| USE\_POLICY.md |  | USE\_POLICY.md | Create USE\_POLICY.md | 2 years ago |
| download.sh |  | download.sh | Add note about 3.1 download | 2 years ago |
| eval\_details.md |  | eval\_details.md | Update eval\_details.md | 2 years ago |
| example\_chat\_completion.py |  | example\_chat\_completion.py | rope theta + nits | 2 years ago |
| example\_text\_completion.py |  | example\_text\_completion.py | rope theta + nits | 2 years ago |
| requirements.txt |  | requirements.txt | add blobfile | 2 years ago |
| setup.py |  | setup.py | Update setup.py | 2 years ago |
| View all files |  |  |  |  |

#### Repository files navigation

```
*  README
*  Code of conduct
*  More Repository files items
    *  Contributing
    *  License
```

🤗 Models on Hugging Face | Blog | Website | Get Started

#### **Note of deprecation**

Thank you for developing with Llama models. As part of the Llama 3.1 release, we've consolidated GitHub repos and added some additional repos as we've expanded Llama's functionality into being an e2e Llama Stack. Please use the following repos going forward:
\* llama-models - Central repo for the foundation models including basic utilities, model cards, license and use policies
\* PurpleLlama - Key component of Llama Stack focusing on safety risks and inference time mitigations
\* llama-toolchain - Model development (inference/fine-tuning/safety shields/synthetic data generation) interfaces and canonical implementations
\* llama-agentic-system - E2E standalone Llama Stack system, along with opinionated underlying interface, that enables creation of agentic applications
\* llama-cookbook - Community driven scripts and integrations
If you have any questions, please feel free to file an issue on any of the above repos and we will do our best to respond in a timely manner.
Thank you!

### (Deprecated) Meta Llama 3

We are unlocking the power of large language models. Our latest version of Llama is now accessible to individuals, creators, researchers, and businesses of all sizes so that they can experiment, innovate, and scale their ideas responsibly.
This release includes model weights and starting code for pre-trained and instruction-tuned Llama 3 language models — including sizes of 8B to 70B parameters.
This repository is a minimal example of loading Llama 3 models and running inference. For more detailed examples, see llama-cookbook.

#### Download

To download the model weights and tokenizer, please visit the Meta Llama website and accept our License.
Once your request is approved, you will receive a signed URL over email. Then, run the download.sh script, passing the URL provided when prompted to start the download.
Pre-requisites: Ensure you have wget and md5sum installed. Then run the script: ./download.sh .
Remember that the links expire after 24 hours and a certain amount of downloads. You can always re-request a link if you start seeing errors such as 403: Forbidden .

##### Access to Hugging Face

We also provide downloads on Hugging Face, in both transformers and native llama3 formats. To download the weights from Hugging Face, please follow these steps:
\* Visit one of the repos, for example meta-llama/Meta-Llama-3-8B-Instruct.
\* Read and accept the license. Once your request is approved, you'll be granted access to all the Llama 3 models. Note that requests used to take up to one hour to get processed.
\* To download the original native weights to use with this repo, click on the "Files and versions" tab and download the contents of the original folder. You can also download them from the command line if you pip install huggingface-hub :

```
huggingface-cli download meta-llama/Meta-Llama-3-8B-Instruct --include "original/*" --local-dir meta-llama/Meta-Llama-3-8B-Instruct
```

```
*  To use with transformers, the following pipeline snippet will download and cache the weights:
```

```
import transformers
import torch

model_id = "meta-llama/Meta-Llama-3-8B-Instruct"

pipeline = transformers.pipeline(
  "text-generation",
  model="meta-llama/Meta-Llama-3-8B-Instruct",
  model_kwargs={"torch_dtype": torch.bfloat16},
  device="cuda",
)
```

#### Quick Start

You can follow the steps below to get up and running with Llama 3 models quickly. These steps will let you run quick inference locally. For more examples, see the Llama Cookbook repository.
1. Clone and download this repository in a conda env with PyTorch / CUDA.
1. In the top-level directory run:

```
pip install -e .
```

```
1. Visit the Meta Llama website and register to download the model/s.
1. Once registered, you will get an email with a URL to download the models. You will need this URL when you run the download.sh script.
1. Once you get the email, navigate to your downloaded llama repository and run the download.sh script.
*  Make sure to grant execution permissions to the download.sh script
    *  During this process, you will be prompted to enter the URL from the email.
    *  Do not use the “Copy Link” option; copy the link from the email manually.
1. Once the model/s you want have been downloaded, you can run the model locally using the command below:
```

```
torchrun --nproc_per_node 1 example_chat_completion.py \
    --ckpt_dir Meta-Llama-3-8B-Instruct/ \
    --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model \
    --max_seq_len 512 --max_batch_size 6
```

**Note**
\* Replace Meta-Llama-3-8B-Instruct/ with the path to your checkpoint directory and Meta-Llama-3-8B-Instruct/tokenizer.model with the path to your tokenizer model.
\* The –nproc\_per\_node should be set to the MP value for the model you are using.
\* Adjust the max\_seq\_len and max\_batch\_size parameters as needed.
\* This example runs the example\_chat\_completion.py found in this repository, but you can change that to a different .py file.

#### Inference

Different models require different model-parallel (MP) values:
| Model | MP |
| ------ | ------ |
| 8B | 1 |
| 70B | 8 |

All models support sequence length up to 8192 tokens, but we pre-allocate the cache according to max\_seq\_len and max\_batch\_size values. So set those according to your hardware.

##### Pretrained Models

These models are not finetuned for chat or Q&A. They should be prompted so that the expected answer is the natural continuation of the prompt.
See example\_text\_completion.py for some examples. To illustrate, see the command below to run it with the llama-3-8b model ( nproc\_per\_node needs to be set to the MP value):

```
torchrun --nproc_per_node 1 example_text_completion.py \
    --ckpt_dir Meta-Llama-3-8B/ \
    --tokenizer_path Meta-Llama-3-8B/tokenizer.model \
    --max_seq_len 128 --max_batch_size 4
```

##### Instruction-tuned Models

The fine-tuned models were trained for dialogue applications. To get the expected features and performance for them, specific formatting defined in ChatFormat needs to be followed: The prompt begins with a <|begin\_of\_text|> special token, after which one or more messages follow. Each message starts with the <|start\_header\_id|> tag, the role system , user or assistant , and the <|end\_header\_id|> tag. After a double newline \n\n , the message's contents follow. The end of each message is marked by the <|eot\_id|> token.
You can also deploy additional classifiers to filter out inputs and outputs that are deemed unsafe. See the llama-cookbook repo for an example of how to add a safety checker to the inputs and outputs of your inference code.
Examples using llama-3-8b-chat:

```
torchrun --nproc_per_node 1 example_chat_completion.py \
    --ckpt_dir Meta-Llama-3-8B-Instruct/ \
    --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model \
    --max_seq_len 512 --max_batch_size 6
```

Llama 3 is a new technology that carries potential risks with use. Testing conducted to date has not — and could not — cover all scenarios. To help developers address these risks, we have created the Responsible Use Guide.

#### Issues

Please report any software “bug” or other problems with the models through one of the following means:
\* Reporting issues with the model: <https://github.com/meta-llama/llama3/issues>
\* Reporting risky content generated by the model: developers.facebook.com/llama\_output\_feedback
\* Reporting bugs and security concerns: facebook.com/whitehat/info

#### Model Card

See MODEL\_CARD.md.

#### License

Our model and weights are licensed for researchers and commercial entities, upholding the principles of openness. Our mission is to empower individuals and industry through this opportunity while fostering an environment of discovery and ethical AI advancements.
See the LICENSE file, as well as our accompanying Acceptable Use Policy

#### Questions

For common questions, the FAQ can be found here, which will be updated over time as new questions arise.

#### About

The official Meta Llama 3 GitHub site

##### Resources

Readme

##### License

View license

##### Code of conduct

Code of conduct

##### Contributing

Contributing

##### Uh oh!

There was an error while loading. Please reload this page.
Activity
Custom properties

##### Stars

29.3k stars

##### Watchers

251 watching

##### Forks

3.5k forks
Report repository

#### Releases

No releases published

#### Packages 0

No packages published

#### Contributors 27

* 13 contributors

#### Languages

```
*  Python 94.0%
*  Shell 6.0%
```

#### Footer

© 2026 GitHub, Inc.

##### Footer navigation

```
*  Terms
*  Privacy
*  Security
*  Status
*  Community
*  Docs
*  Contact
*  Manage cookies
*  Do not share my personal information
```

You can't perform that action at this time.
