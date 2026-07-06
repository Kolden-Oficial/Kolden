---
id_fonte: "410bb98b-72fc-4961-88b1-4547337e78ee"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Deploying Llama-3.1 8B using vLLM - ROCm Documentation - AMD"
tipo: "unknown"
url_original: "https://rocm.docs.amd.com/projects/ai-developer-hub/en/v5.0/notebooks/inference/3_inference_ver3_HF_vllm.html"
keywords: "('Llama-3.1 8B deployment', 'vLLM inference library', 'AMD ROCm software', 'AMD Instinct GPUs', 'Docker environment setup')"
summary: "This technical documentation serves as a comprehensive guide for **deploying the Llama-3.1 8B model** specifically optimized for **AMD Instinct™ GPUs**. It introduces **vLLM** as a high-performance open-source library that enables **high throughput and low latency** for large language model inference through efficient request batching. The tutorial outlines a structured workflow that includes configuring a **ROCm software stack**, setting up a **Dockerized environment**, and utilizing **Hugging Face API tokens** for secure model access. Ultimately, the text provides developers with the necessary steps to launch an **inference server and client**, facilitating the practical application of AI in tasks like code generation and conversational systems."
extraido_em: "2026-06-30T16:19:29Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Deploying Llama-3.1 8B using vLLM - ROCm Documentation - AMD

Deploying Llama-3.1 8B using vLLM — Tutorials for AI developers 5.0
Skip to main content
Back to top [-] [-] Ctrl + K
AI Tutorials v5.0
Version List
\* GitHub
\* Community
\* Blogs
\* ROCm™ Docs
\* ROCm Developer Hub
\* Systems and Infra Docs
\* Infinity Hub
\* Support
AI Developer
Tutorials for AI developers 5.0
Search Ctrl + K
Inference tutorials
\* ChatQnA vLLM deployment and performance evaluation
\* Text-to-video generation with ComfyUI
\* DeepSeek Janus Pro on CPU or GPU
\* DeepSeek-R1 with vLLM V1
\* AI agent with MCPs using vLLM and PydanticAI
\* Hugging Face Transformers
\* Hugging Face TGI
\* Deploying with vLLM
\* From chatbot to rap bot with vLLM
\* RAG with LlamaIndex and Ollama
\* OCR with vision-language models with vLLM
\* Building AI pipelines for voice assistants
\* Speculative decoding with vLLM
\* Llama Stack
\* DeepSeek-R1 with SGLang
Fine-tuning tutorials
\* VLM with PEFT
\* LLM with LoRA
\* LLM with QLoRA
\* Llama-3.1 8B with torchtune
\* Llama-3.1 8B with Llama Factory
\* GRPO with Unsloth
Pretraining tutorials
\* OLMo model with PyTorch FSDP
\* Training configuration with Megatron-LM
\* LLM with Megatron-LM
\* Llama-3.1 8B with torchtitan
\* Custom diffusion model with PyTorch
GPU development and optimization tutorials
\* MLA decoding kernel of AITER library
\* Kernel development and optimization with Triton
\* Profiling Llama-4 inference with vLLM
\* FP8 quantization with AMD Quark for vLLM
About
\* Changelog
\* Licensing and support information
\* Deploying...

### Deploying Llama-3.1 8B using vLLM

#### Contents

```
*  Prerequisites
    *  Operating system
    *  Hardware
    *  Software
    *  Hugging Face API access
*  Prepare the inference environment
    *  1. Launch the Docker container
    *  2. Install and launch Jupyter
    *  3. Provide your Hugging Face token
*  Deploying the LLM using vLLM
    *  Start the vLLM server
    *  Start the client
```

### Deploying Llama-3.1 8B using vLLM#

vLLM is an open-source library designed to deliver high throughput and low latency for large language model (LLM) inference. It optimizes text generation workloads by efficiently batching requests and making full use of GPU resources, empowering developers to manage complex tasks like code generation and large-scale conversational AI.
This tutorial guides you through setting up and running vLLM on AMD Instinct™ GPUs using the ROCm software stack. Learn how to configure your environment, containerize your workflow, and send test queries to the vLLM-supported inference server.

#### Prerequisites#

This tutorial was developed and tested using the following setup.

##### Operating system#

```
*   **Ubuntu 22.04** : Ensure your system is running Ubuntu version 22.04.
```

##### Hardware#

```
*   **AMD Instinct GPUs** : This tutorial was tested on an AMD Instinct MI300X GPU. Ensure you are using an AMD Instinct GPU or compatible hardware with ROCm support and that your system meets the official requirements.
```

##### Software#

```
*   **ROCm 6.2 or 6.3** : Install and verify ROCm by following the ROCm install guide. After installation, confirm your setup using:
```

```
rocm-smi
```

This command lists your AMD GPUs with relevant details, similar to the image below.
\* **Docker** : Ensure Docker is installed and configured correctly. Follow the Docker installation guide for your operating system. **Note** : Ensure the Docker permissions are correctly configured. To configure permissions to allow non-root access, run the following commands:

```
sudo usermod -aG docker $USER
newgrp docker
```

Verify Docker is working correctly:

```
docker run hello-world
```

##### Hugging Face API access#

```
*  Obtain an API token from Hugging Face for downloading models.
*  Ensure the Hugging Face API token has the necessary permissions and approval to access Meta's Llama checkpoints.
```

#### Prepare the inference environment#

Follow these steps to get the inference environment ready for use.

##### 1. Launch the Docker container#

Run the following command in your terminal to pull the prebuilt Docker image containing all necessary dependencies and launch the Docker container with the proper configuration:

```
docker run -it --rm \
  --network=host \
  --device=/dev/kfd \
  --device=/dev/dri \
  --group-add=video \
  --ipc=host \
  --cap-add=SYS_PTRACE \
  --security-opt seccomp=unconfined \
  --shm-size 8G \
  --hostname=ROCm-FT \
  --env HUGGINGFACE_HUB_CACHE=/workspace \
  -v $(pwd):/workspace \
  -w /workspace/notebooks \
  --entrypoint /bin/bash \
  rocm/vllm:rocm6.2_mi300_ubuntu20.04_py3.9_vllm_0.6.4
```

**Note** : This command mounts the current directory to the /workspace directory in the container. Ensure the notebook file is either copied to this directory before running the Docker command or uploaded into the Jupyter Notebook environment after it starts. Save the token or URL provided in the terminal output to access the notebook from your web browser. You can download this notebook from the AI Developer Hub GitHub repository.

##### 2. Install and launch Jupyter#

Inside the Docker container, install Jupyter using the following command:

```
pip install jupyter
```

Then start the Jupyter server:

```
jupyter-lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
```

**Note** : Ensure port 8888 is not already in use on your system before running the above command. If it is, you can specify a different port by replacing --port=8888 with another port number, for example, --port=8890 .

##### 3. Provide your Hugging Face token#

You'll require a Hugging Face API token to access meta-llama/Llama-3.1-8B-Instruct. Generate your token at Hugging Face Tokens and request access for meta-llama/Llama-3.1-8B-Instruct. Tokens typically start with “hf\_”.
Run the following interactive block in your Jupyter notebook to set up the token:
**Note** : Uncheck the “Add token as Git credential?” option.

```
from huggingface_hub import notebook_login, HfApi

# Prompt the user to log in
notebook_login()
```

Verify that your token was accepted correctly:

```
# Validate the token
try:
    api = HfApi()
    user_info = api.whoami()
    print(f"Token validated successfully! Logged in as: {user_info['name']}")
except Exception as e:
    print(f"Token validation failed. Error: {e}")
```

#### Deploying the LLM using vLLM#

Start deploying the LLM (meta-llama/Llama-3.1-8B-Instruct) using vLLM in the Jupyter notebook:

##### Start the vLLM server#

Run this command to launch the vLLM server:

```
!HIP_VISIBLE_DEVICES=2 python -m vllm.entrypoints.openai.api_server \
        --model meta-llama/Meta-Llama-3.1-8B-Instruct \
        --gpu-memory-utilization 0.9 \
        --swap-space 16 \
        --disable-log-requests \
        --dtype float16 \
        --max-model-len 131072 \
        --tensor-parallel-size 1 \
        --host 0.0.0.0 \
        --port 3000 \
        --num-scheduler-steps 10 \
        --enable-chunked-prefill False \
        --max-num-seqs 128 \
        --max-num-batched-tokens 131072 \
        --max-model-len 131072 \
        --distributed-executor-backend "mp"
```

After successfully connecting, it displays INFO: Uvicorn running on socket ('0.0.0.0', XX) (Press CTRL+C to quit) .
**Note** : In a multi-GPU environment, the setting HIP\_VISIBLE\_DEVICES=x is recommended to deploy the LLM on your preferred GPU.

##### Start the client#

After successfully running the server, as described above, open a new notebook and send a query to the server as shown below.
**Note** : For this step, a new Python notebook must be opened. After the notebook cell is created, copy the code below and run it in your new notebook. New notebooks can be opened by selecting **File->New->Notebook** .

```
import requests

url = "http://localhost:3000/v1/chat/completions"
headers = {"Content-Type": "application/json"}
data = {
    "model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "messages": [
        {
            "role": "system",
            "content": "You are an expert in the field of AI. Make sure to provide an explanation in few sentences."
        },
        {
            "role": "user",
            "content": "Explain the concept of AI."
        }
    ],
    "stream": False,
    "max_tokens": 128
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

**Note** : Remember to match the Docker --port **3000** and the port indicated in the URL, for instance, <http://localhost>: **3000** . If the port is already used by another application, you can modify the number.
If the connection is successful, the output will be:

```
{"id":"chat-xx","object":"chat.completion","created":1736494622,"model":"meta-llama/Meta-Llama-3.1-8B-Instruct","choices":[{"index":0,"message":{"role":"assistant","content":"Artificial Intelligence (AI) is a field of computer science ...}
```

previous Running Hugging Face Text Generation Inference (TGI) with Llama-3.1 8B
next Building your own chatbot and rap bot with vLLM
Contents
\* Prerequisites
\* Operating system
\* Hardware
\* Software
\* Hugging Face API access
\* Prepare the inference environment
\* 1. Launch the Docker container
\* 2. Install and launch Jupyter
\* 3. Provide your Hugging Face token
\* Deploying the LLM using vLLM
\* Start the vLLM server
\* Start the client
\* Terms and Conditions
\* Privacy
\* Trademarks
\* Supply Chain Transparency
\* Fair and Open Competition
\* UK Tax Strategy
\* Cookie Policy
\* Cookie Settings
© 2026 Advanced Micro Devices, Inc
v5.0
Versions
latest
v12.0
v11.0
v10.0
v9.0
v8.0
v7.0
v6.0
v5.1
**v5.0**
v4.0
v3.1
v3.0
v2.0
v1.0
On Read the Docs
Project Home
Builds
Search
Addons documentation ― Hosted by Read the Docs
Filters
[x] subprojects:advanced-micro-devices-demo/v5.0 Include subprojects
No recent searches
\* Enter to select
\* Up / Down to navigate
\* Esc to close
Search powered by

#### Cookie Notice

This site uses cookies from us and our partners to make your browsing experience more efficient, relevant, convenient and personal. In some cases, they are essential to making the site work properly. By accessing this site, you direct us to use and consent to the use of cookies. You can change your settings by clicking on the Cookie Settings link. For more information, refer to AMD's privacy notice and cookie policy.
Cookie Settings Accept Cookies

#### Cookie Settings

When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
More information
Allow All

##### Manage Consent Preferences

###### Performance Cookies

[-]
Performance Cookies
These cookies allow us to recognize and count the number of visitors and to see how visitors move around the Sites when they use them. This helps us to understand what areas of the Sites are of interest to you and to improve the way the Sites work, for example, by helping you find what you are looking for easily. We may use third party web analytics providers to help us analyze the use of the Sites, email, and newsletters. These cookies store data such as online identifiers (including IP address and device identifiers), information about your web browser and operating system, website usage activity information (including the frequency of your visits, your actions on the Sites and, if you arrived at any of the Sites from another website, i.e. the URL of that website), and content-related activity (including the email and newsletter content you view and click on).
Cookies Details

###### Targeting Cookies

[-]
Targeting Cookies
These cookies record online identifiers (including IP address and device identifiers), information about your web browser and operating system, website usage activity information (such as information about your visit to the Sites, the pages you have visited, content you have viewed, and the links you have followed), and content-related activity (including the email and newsletter content you view and click on). The information is used to try to make the Sites, emails, and newsletters, and the advertising displayed on them and other websites more relevant to your interests. For instance, when you visit the Sites, these targeting cookies are used by third party providers for remarketing purposes to allow them to show you advertisements for our products when you visit other websites on the internet. Our third party providers may collect and combine information collected through the Sites, emails, and newsletters with other information about your visits to other websites and apps over time, if those websites and apps also use the same providers.
Cookies Details

###### Functionality Cookies

[-]
Functionality Cookies
These cookies are used to recognize you when you return to the Sites. This enables us to remember your preferences (for example, your choice of language or region) or when you register on areas of the Sites, such as our web programs or extranets. These cookies store data such as online identifiers (including IP address and device identifiers) along with the information used to provide the function.
Cookies Details

###### Strictly Necessary Cookies

Always Active
These are cookies that are technically required for the operation of the Sites. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging into secure areas of the Sites or filling in forms. These cookies store data such as online identifiers (including IP address and device identifiers) along with the information used to operate the Sites. We may estimate your geographic location based on your IP address to help us display the content available in your location and adjust the operation of the Sites.
Cookies Details

##### Cookie List

Clear
[-] checkbox label label
Apply Cancel
Consent Leg.Interest [-]
checkbox label label [-]
checkbox label label [-]
checkbox label label
Confirm My Choices
