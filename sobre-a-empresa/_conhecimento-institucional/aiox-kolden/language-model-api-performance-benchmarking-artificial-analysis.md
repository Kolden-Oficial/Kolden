---
id_fonte: "8cb3a04c-f7cf-421d-8769-795d5d02bd8a"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Language Model API Performance Benchmarking | Artificial Analysis"
tipo: "unknown"
url_original: "https://artificialanalysis.ai/methodology/performance-benchmarking"
keywords: "('LLM API Benchmarking', 'Performance Measurement Methodology', 'API Output Speed', 'Workload Type Analysis', 'Tokenizer Efficiency Limitations')"
summary: "Artificial Analysis provides a comprehensive **benchmarking methodology** designed to evaluate the speed and reliability of various Large Language Model APIs. By utilizing **diverse test workloads**—ranging from short 1k prompts to massive 100k token inputs—the framework captures a realistic picture of model behavior across different reasoning and generation tasks. The process emphasizes **standardized performance metrics**, specifically defining \"Time to First Token\" and \"Output Speed\" to ensure objective comparisons between competing providers. To maintain accuracy, the organization employs **median measurements (P50)** over rolling windows, accounting for technical nuances like server location and tokenizer efficiency to reflect the actual experience of a typical developer."
extraido_em: "2026-06-30T16:20:44Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Language Model API Performance Benchmarking | Artificial Analysis

Language Model API Performance Benchmarking | Artificial Analysis
Stay connected with us on X, Discord, and LinkedIn to stay up to date with future analysis
Artificial Analysis
Log in
\* Artificial Analysis
\* Models
\* Agents
\* Speech, Image, Video
\* Hardware
\* AI Trends
\* Leaderboards
\* Arenas
\* About
Log in
Search...
⌘K
Benchmarking Methodology
On this page
\* Overview
\* Workload Types
\* Load Scenarios
\* Testing Frequency
\* Prompt Generation
\* Measurement Representation
\* Key Definitions
\* Technical Details
\* Known Limitations
\* Version History

### Artificial Analysis Language Model API Performance Benchmarking Methodology

#### Overview

Measuring LLM performance requires sending the LLM a prompt and measuring the characteristics of its output. We use a variety of test workloads to test and measure LLM performance.

##### Workload Types

| Workload type | Description |
| --- | --- |
| 1k input token | Approximately 1,000 input tokens, at least 1,000 answer tokens |
| 10k input token | Approximately 10,000 input tokens, at least 1,500 answer tokens (default benchmark on our website) |
| 100k input token | Approximately 100,000 input tokens, at least 2,000 answer tokens |
| Vision workload | A single 1 megapixel image and approximately 1,000 input tokens, 1,000 output tokens |

Longer prompts can result in both longer time to first token and slower output tokens per second compared to shorter prompts.

##### Load Scenarios

| Load scenario | Description |
| --- | --- |
| Single prompt | One prompt is sent to the model's API at a time |
| Parallel prompts | 10 prompts are sent to the model's API simultaneously |

##### Testing Frequency

```
*  Our 1k, 10k input token and vision workloads are tested 8 times per day, approximately every 3 hours
*  For our multiple or parallel workload test, we send 10 concurrent requests of our standard 1k input token workload once per day at a random time
*  Our 100k input token workload is tested once per week
```

##### Prompt Generation

Every individual test run uses a unique prompt that we generate at the time of the test and run on all endpoints we cover. Prompts combine a range of long-form input content (e.g., articles) with a range of tasks, including explanation/summarization, question and answer generation, comparative analysis, translation, or visual artifact generation.
The parameters of the generation process are set to fill the target token budget, producing diverse outputs that test a range of reasoning and generation capabilities.
Prompt diversity is important for performance benchmarking because techniques like speculative decoding mean that we see variation in output speeds depending on the type of output.

##### Measurement Representation

Performance measurements are represented as the median (P50) measurement over the past 72 hours to reflect sustained changes in performance that users can expect to experience when using the API. An exception to this is the 100k prompt length workload, which is tested once per week and is represented as the median (P50) measurement over the past 14 days.

#### Key Definitions

```
*   **Time to First Token:**  The time in seconds between sending a request to the service or system and receiving the first token of the response. For reasoning models which return reasoning tokens, this will be the first reasoning token. Time to First Token = Time of First Token Arrival − Time Request Sent \text{Time to First Token} = \text{Time of First Token Arrival} - \text{Time Request Sent} Time to First Token= Time of First Token Arrival− Time Request Sent
*   **Time to First Answer Token:**  The time in seconds between sending a request to the service or system and receiving the first answer token of the response. For reasoning models, this is measured after any 'thinking' time. Time to First Answer Token = Input Processing Time + Avg. Reasoning Tokens Reasoning Output Speed \text{Time to First Answer Token} = \text{Input Processing Time} + \frac{\text{Avg. Reasoning Tokens}}{\text{Reasoning Output Speed}} Time to First Answer Token= Input Processing Time+ Reasoning Output Speed Avg. Reasoning Tokens
*   **Output Speed (output tokens per second):**  The average number of tokens received per second, after the first token is received. Output Speed = Total Tokens − First Chunk Tokens Time of Final Token Chunk Received − Time of First Token Chunk Received \text{Output Speed} = \frac{\text{Total Tokens} - \text{First Chunk Tokens}}{\text{Time of Final Token Chunk Received} - \text{Time of First Token Chunk Received}} Output Speed= Time of Final Token Chunk Received− Time of First Token Chunk Received Total Tokens− First Chunk Tokens
*   **Total Response Time for 100 Output Tokens:**  The number of seconds to generate 100 output tokens, calculated synthetically based on TTFT and Output Speed to assure maximum comparison utility. Total Response Time = Time to First Token + 100 Output Speed \text{Total Response Time} = \text{Time to First Token} + \frac{100}{\text{Output Speed}} Total Response Time= Time to First Token+ Output Speed 100
*   **End-to-End Response Time:**  The total time to receive a complete response, including input processing time, model reasoning time, and answer generation time. End-to-End Response Time = Input Processing Time + Avg. Reasoning Tokens Reasoning Output Speed + 500 Answer Output Speed \text{End-to-End Response Time} = \text{Input Processing Time} + \frac{\text{Avg. Reasoning Tokens}}{\text{Reasoning Output Speed}} + \frac{500}{\text{Answer Output Speed}} End-to-End Response Time= Input Processing Time+ Reasoning Output Speed Avg. Reasoning Tokens + Answer Output Speed 500
*   **Average Reasoning Tokens:**  Time reasoning models spend outputting 'reasoning' tokens before providing an answer. This is calculated based on the average number of 'reasoning' tokens across a diverse set of 60 prompts. Where the average number of reasoning tokens is not available or has not yet been calculated, we assume 2k reasoning tokens. These prompts are of varied lengths and include coverage of a range of topics including, personal-related queries, commercial-related queries, coding, math, science and others. Prompts are a combination of being written by Artificial Analysis and others sourced from the following evaluations: MMLU Pro, AIME 2025, and LiveCodeBench. These prompts can be accessed here.
```

#### Technical Details

**Server Location:** Our primary testing server is a virtual machine hosted in Google Cloud's us-central1-a zone.
**Test Accounts:** We conduct tests using a combination of anonymous accounts, accounts with credits, and API keys provided explicitly for benchmarking to undertake testing. Where our primary benchmarking is not undertaken via an anonymous account, we register a separate anonymous account and validate that performance is not being manipulated.
**API Libraries:** For all providers claiming compatibility with OpenAI's API, we use the official OpenAI Python library to ensure consistency across tests. For providers without OpenAI compatibility, we use their recommended client libraries.
**API Parameters:** We use the following API parameters for all tests:
\* temperature: 0
\* top\_p: 1
**Token Measurement:** All measurements of 'tokens' on Artificial Analysis as measured as OpenAI GPT-4 tokens as counted by OpenAI's tiktoken library ( o200k\_base ). This standardizes the number of tokens counted across different models (with different tokenizers) so that the same text is represented as the same number of tokens.
**Output Speed Calculation:** For reasoning models that do not expose all reasoning tokens in the response, we calculate output speed using the last 80% of answer chunks. This ensures measured output speeds are consistent and more closely reflect user experience.

#### Known Limitations

**Tokenizer Efficiency and Pricing:** Different models use different tokenizers, which can lead to differences in the number of tokens required to represent the same text. This means that pricing is not always directly comparable across models. We are working on publishing more details on tokenizer efficiency and its impact on pricing. In the meantime, we have shared some preliminary tokenizer efficiency adjusted pricing analysis on Twitter.
**Quantization:** Some models use quantization techniques to reduce computational requirements and increase speed. However, quantization can also affect model quality. We are moving towards full disclosure of quantization methods used by the models we benchmark.
**Server Location and TTFT:** Time-to-first-token (TTFT) is sensitive to server location as it includes network latency. Our primary testing server is located in Google Cloud's us-central1-a zone, which may advantage or disadvantage certain providers based on their server locations. We are considering adding additional testing locations to mitigate this effect.

#### Version History

**Version 2.2.0**
2 March 2026
\* Updated prompts: We've introduced an upgraded set of prompts including broader and more varied content, which include a wider range of task types. This is important because techniques like speculative decoding mean that we see variation in output speeds depending on the type of output.
\* Default workload change: Default speed on our site now reflects results from 10k input token prompts (previously 1k) and we have deprecated performance measurements for 100 token input workloads. All 1k, 10k and 100k input token workloads are still visible on all pages by selecting the Prompt Options drop-down. The easiest way to compare output speeds for different workload shapes is using the Output Speed by Input Token Count chart.

#### Footer

##### Products & Resources

```
*  Dashboard
*  Articles
*  Methodology
```

##### Artificial Analysis

```
*  FAQ
*  Contact
*  Terms of Use
*  Privacy Policy
*  hello@artificialanalysis.ai
```

##### Subscribe to new insights, delivered monthly

Email address
Subscribe
X LinkedIn Discord
