---
id_fonte: "ce225bbd-0c31-4992-aa67-c358e36e3dc3"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing - Reddit"
tipo: "unknown"
url_original: "https://www.reddit.com/r/PromptEngineering/comments/1rexast/i_finally_read_through_the_entire_openai_prompt/"
keywords: "('OpenAI Prompt Guide', 'Delimiter usage', 'Chain of thought', 'Positive framing', 'Modular architecture')"
summary: "This Reddit post distills the official OpenAI Prompt Guide into a simplified strategy centered on **reducing the model’s decision surface** to improve accuracy. The author highlights three pivotal adjustments: using **delimiters** like triple quotes to clarify context boundaries, requiring the AI to **think step-by-step internally** to minimize hallucinations, and employing **positive instructions** rather than negative constraints. Commentary within the thread further suggests a transition from \"theatrical prompt magic\" toward a **modular architecture**, arguing that modern reasoning models perform better with tightly scoped, structured tasks than with outdated, lengthy \"mega prompts.\" Ultimately, the text serves as a practical guide for shifting from trial-and-error messaging to a more **deterministic system design** that emphasizes signal clarity over instruction volume."
extraido_em: "2026-06-30T16:20:11Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing - Reddit

I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing : r/PromptEngineering
Skip to main content I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing : r/PromptEngineering
Open menu
Open navigation
Go to Reddit Home
r/PromptEngineering
TRENDING TODAY
Get App
Get the Reddit app
Log In
Log in to Reddit
Expand user menu
Open settings menu
Skip to Navigation Skip to Right Sidebar
Back
Go to PromptEngineering
r/PromptEngineering
•
1mo ago
Distinct\_Track\_5495
Locked post
Stickied post
Archived post
\* Report

### I finally read through the entire OpenAI Prompt Guide. Here are the top 3 Rules I was missing

Tutorials and Guides
I have been using GPT since day one but I still found myself constantly arguing with it to get exactly what I wanted so I just sat down and went through the official OpenAI prompt engineering guide and it turns out most of my skill issues were just bad structural habits.
The 3 shifts I started making in my prompts
1. Delimiters are not optional. The guide is obsessed with using clear separators like ### or """ to separate instructions from ur context text. It sounds minor but its the difference between the model getting lost in ur data and actually following the rules
1. For anything complex you have to explicitly tell the model: "First think through the problem step by step in a hidden block before giving me the answer". Forcing it to show its work internally kills about 80% of the hallucinations
1. Models are way better at following "Do this" rather than "Don't do that". If you want it to be brief dont say "dont be wordy" rather say "use a 3 sentence paragraph"
**and** since im building a lot of agentic workflows lately I run em thro a prompt refiner before I send them to the api. Tell me is it just my workflow or anyone else feel tht the mega prompts from 2024 are actually starting to perform worse on the new reasoning models?
Upvote 215 Downvote 54 Go to comments Share
Sort by: Best
Open comment sort options
\* Best
\* Top
\* New
\* Controversial
\* Old
\* Q&A
Search Comments Expand comment search
Cancel

### Comments Section

speedtoburn
•
1mo ago
Nice ad bro.
Upvote 88 Downvote Reply Award Share
\* Report
\* Award
Share
1 more reply
AxeSlash
•
1mo ago
The things I found that made the biggest difference:
\* Structure. ANY structured, hierarchical format works better than just random text. XML, JSON, Markdown , whatever. You can even roll your own. Hierarchy with concise rules stated as bullet points > paragraphs of prose.
\* Removal/fixing of contradictory and/or vague rules. Adding exceptions and scope where needed.
\* Asking the model to debug, refactor and optimise the instructions for it's own use.
Upvote 12 Downvote Reply Award Share
\* Report
\* Award
Share
Distinct\_Track\_5495
OP
• 1mo ago
yes!! structure has been a game changer for me
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
ChestChance6126
•
1mo ago
clear structure beats clever wording. i've also noticed giant all in one prompts are getting worse results lately. breaking tasks into smaller, staged prompts usually performs better than one mega instruction blob. tighter inputs, explicit outputs, less fluff.
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
Distinct\_Track\_5495
OP
• 1mo ago
100% agreed
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
Quirky\_Bid9961
•
1mo ago
tbh, a lot of 2024 style mega prompts are starting to underperform on newer reasoning models. That is not placebo. There are structural reasons for it.
Older GPT style models needed heavy scaffolding because they were more completion driven. You had to spell everything out.
Add delimiters.
Add step by step instructions.
Add safety rails. Add examples.
Add role framing.
It worked because the model was mostly predicting next token with limited internal reasoning structure.
Newer reasoning models are different beasts. They already have internal reasoning scaffolding baked in. When you overload them with giant instruction blobs, you are sometimes fighting the architecture.
Let me unpack this with production nuance.
Prompt token interaction matters more than people think.
system role precedence means system instructions outrank user instructions in the model stack. If you put massive behavioral instructions in the user block and the system block says something slightly different, the system wins. Many people do not realize they are creating silent instruction conflicts.
Newbies often do this:
System: You are a concise reasoning assistant.
User: Write a 2000 word detailed analysis and explain every step extensively.
Now you wonder why the output feels weird or conservative. That is role precedence in action.
Long context degrades signal clarity.
Context window compression means the model has to distribute attention across everything in the prompt. If you dump 1500 tokens of rules before the actual task, the actual task may get relatively less attention weight. Attention is not magic. It is math.
In production, we see this clearly. Add 800 extra tokens of prompt boilerplate and reasoning quality sometimes drops. Not because the model got worse. Because signal to noise ratio changed.
Chain of thought forcing is no longer universally optimal.
Back in 2023 and 2024, explicitly saying think step by step boosted performance because it nudged shallow models into deeper reasoning traces.
Newer reasoning models already generate internal reasoning traces. Forcing explicit chain of thought can sometimes create redundancy or even confusion. You are layering external scaffolding on top of internal scaffolding.
There is a difference between eliciting reasoning and micromanaging reasoning.
Mega prompts can cause alignment friction.
Alignment bias means models are tuned to avoid harmful or risky outputs. If your mega prompt includes tons of conditional rules, edge case constraints, and safety modifiers, you increase the chance of hitting internal safety triggers.
Example a newbie might miss:
You write a 1200 token agent prompt with rules like never hallucinate, always verify, always double check uncertainty, never assume missing data.
On reasoning models, that often results in hyper conservative outputs. The model keeps qualifying itself because you literally trained it via instruction to doubt everything.
You accidentally optimized for hesitation.
Agentic workflows change the equation.
If you are building agentic workflows, you should not rely on one mega prompt. You should decompose.
Use planning loop means first call generates plan.
Execution loop means second call executes one step.
Validation layer means third call checks schema or constraints.
This is modular orchestration architecture which means splitting tasks into smaller deterministic steps instead of stuffing all logic into one super prompt.
Newbies often think bigger prompt equals smarter system. In production, it is usually the opposite. Smaller scoped calls with strict validation outperform monolithic prompts.
Trade off between verbosity and reasoning clarity.
Instruction verbosity means how many tokens you spend explaining rules. More is not always better.
Reasoning clarity means how cleanly the model understands the task objective.
If your instructions are so dense that the objective is buried, performance drops. I have seen this repeatedly when upgrading models. The same mega prompt that worked on GPT 4 underperforms on reasoning models because the architecture expects cleaner task signals.
Now to your core question.
Is it just your workflow?
No. This is a real shift. Prompt economics have changed.
We are moving from prompt engineering as instruction hacking to system design as architecture engineering.
The people best positioned to answer this are those who:
Have shipped LLM systems via API not just chat
Have compared behavior across model generations
Have debugged inference instability in live systems
Have built structured output enforcement with schema validation
Have seen performance regress after model upgrades and had to fix it
Because they have seen:
Drift means output behavior shifting over time or across model versions.
Alignment bias means the model defaulting to safer more conservative outputs.
Context saturation means too many tokens reducing effective focus on the task.
If you are feeling mega prompts degrade on reasoning models, you are probably not imagining it.
The modern pattern is:
Clear system role
Tight scoped task
Minimal but explicit constraints
Structured output
External validation
Multi step orchestration
Less theatrical prompt magic and More boring architecture.
That is the real shift happening in 2025.
Upvote 15 Downvote Reply Award Share
\* Report
\* Award
Share
Conscious\_Regret\_140
•
1mo ago
Great slop writeup!
Upvote 16 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
5 more replies
Gold-Satisfaction631
•
1mo ago
The real pattern across all 3 rules isn't formatting — it's constraint reduction.
Delimiters prevent the model from deciding where your context ends and instructions begin. Hidden reasoning removes the decision of whether to show its work. Positive framing removes the decision of how to interpret a negation.
Each rule shrinks the model's decision surface. Less guessing = less error.
Replikationstest: Identify which parts of your prompt require the model to make an implicit decision. That's where your errors are coming from.
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
Distinct\_Track\_5495
OP
• 1mo ago
I couldn't agree I feel the right prompt is an underrated skill, its one of those things where you have to apply it to be able to feel the magnitude of the difference in results
especially when you are trying to build and devleop something thats AI native
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
elephantsonparody
•
1mo ago
I didn't even know open ai had a guide! I'm off to find it now.
Upvote 4 Downvote Reply Award Share
\* Report
\* Award
Share
elephantsonparody
•
1mo ago
Just popping back, from my first looks at the developer section of open ai, to say I cannot believe it has never occurred to me to look for guides on their website. A very brief look and this is super informative! Thanks again for opening up my dumb eyes :)
Upvote 9 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
JingJang
•
1mo ago
Agreed. This is very helpful. Thanks to the OP. I need to check the other models for similar documentation.
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
TenshiS
•
1mo ago
OP couldn't be bothered to link it because it would take attention away from his own ad link
Upvote 5 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
Distinct\_Track\_5495
OP
• 1mo ago
I ve dropped it in the comments as well if that helps!! for this exact reason so noone needs to go waste time finding it
Upvote -4 Downvote Reply Award Share
\* Report
\* Award
Share
WebDevxer
•
1mo ago
Just an ad for your prompt optimizer ? 😂😂
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
33ff00
•
1mo ago
If these are so superior and effective why don't openai publish a guide to use them
Upvote 1 Downvote Reply Award Share
\* Report
\* Award
Share
2 more replies
b1gw
•
1mo ago
Thank you
Upvote 1 Downvote Reply Award Share
\* Report
\* Award
Share
Conscious\_Regret\_140
•
1mo ago
Slop post.
Upvote 0 Downvote Reply Award Share
\* Report
\* Award
Share
[deleted]
•
1mo ago
Comment removed by moderator
2 more replies
[deleted]
•
1mo ago
Comment removed by moderator
2 more replies
No\_Confusion4079
•
1mo ago
Soft selling prompt refiners are we?
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
make\_it\_bright
•
1mo ago
good luck on your business model I hope your vibe coded app makes lots of $$ :D
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
[deleted]
•
1mo ago
Comment removed by moderator
AutoModerator
MOD
• 1mo ago
Hi there! Your post was automatically removed because your account is less than 3 days old. We require users to have an account that is at least 3 days old before they can post to our subreddit.
Please take some time to participate in the community by commenting and engaging with other users. Once your account is older than 3 days, you can try submitting your post again.
If you have any questions or concerns, please feel free to message the moderators for assistance.
*I am a bot, and this action was performed automatically. Please* contact the moderators of this subreddit *if you have any questions or concerns.*
New to Reddit?
Create your account and connect with a world of communities.
Continue with Email
Continue With Phone Number
By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.

### Related Answers Section

Related Answers
Top rules from OpenAI Prompt Guide
Best practices for OpenAI prompt engineering
Innovative prompts for creative writing
Best practices for crafting AI prompts
How to optimize prompts for better responses

### More posts you may like

```
*  OpenAI Just Dropped Free Prompt Engineering Tutorial Videos (Beginner to Master) r/PromptEngineering • 1y ago [
```

##### OpenAI Just Dropped Free Prompt Engineering Tutorial Videos (Beginner to Master)

](<https://www.reddit.com/r/PromptEngineering/comments/1jqn62k/openai_just_dropped_free_prompt_engineering/>) 908 upvotes · 36 comments
\* OpenAI dropped a prompting guide for GPT-4.1, here's what's most interesting r/PromptEngineering • 1y ago [

##### OpenAI dropped a prompting guide for GPT-4.1, here's what's most interesting

](<https://www.reddit.com/r/PromptEngineering/comments/1k6yid7/openai_dropped_a_prompting_guide_for_gpt41_heres/>) 853 upvotes · 65 comments
\* OpenAI engineers use a prompt technique internally that most people have never heard of r/PromptEngineering • 4mo ago [

##### OpenAI engineers use a prompt technique internally that most people have never heard of

](<https://www.reddit.com/r/PromptEngineering/comments/1pptev8/openai_engineers_use_a_prompt_technique/>) 1.7K upvotes · 170 comments
\* These 10 AI prompts replaced my entire study routine (and saved me a lot of money) r/PromptEngineering • 5mo ago [

##### These 10 AI prompts replaced my entire study routine (and saved me a lot of money)

](<https://www.reddit.com/r/PromptEngineering/comments/1p0ak1a/these_10_ai_prompts_replaced_my_entire_study/>) 63 upvotes · 9 comments
\* OpenAI releases 300+ official, role-specific prompts for free. r/PromptEngineering • 2mo ago [

##### OpenAI releases 300+ official, role-specific prompts for free.

](<https://www.reddit.com/r/PromptEngineering/comments/1qkd6pz/openai_releases_300_official_rolespecific_prompts/>) 115 upvotes · 15 comments
\* OpenAI just dropped "Prompt Packs" with plug-and-play prompts for EVERY job function r/PromptEngineering • 6mo ago [

##### OpenAI just dropped "Prompt Packs" with plug-and-play prompts for EVERY job function

](<https://www.reddit.com/r/PromptEngineering/comments/1ntlinm/openai_just_dropped_prompt_packs_with_plugandplay/>) 338 upvotes · 42 comments
\* Surprisingly simple prompts to instantly improve AI outputs at least by 70% r/PromptEngineering • 8mo ago [

##### Surprisingly simple prompts to instantly improve AI outputs at least by 70%

](<https://www.reddit.com/r/PromptEngineering/comments/1ms834b/surprisingly_simple_prompts_to_instantly_improve/>) 139 upvotes · 25 comments
\* One prompt that helped me think differently r/PromptEngineering • 2mo ago [

##### One prompt that helped me think differently

](<https://www.reddit.com/r/PromptEngineering/comments/1r2qkqi/one_prompt_that_helped_me_think_differently/>) 26 upvotes · 13 comments
\* I was tired of 'yes-man' AI, so I built a prompt to brutally audit my system designs r/PromptEngineering • 1mo ago [

##### I was tired of 'yes-man' AI, so I built a prompt to brutally audit my system designs

](<https://www.reddit.com/r/PromptEngineering/comments/1rbshfy/i_was_tired_of_yesman_ai_so_i_built_a_prompt_to/>) 130 upvotes · 31 comments
\* The prompts aren't the hard part. The persistent context is. r/PromptEngineering • 23d ago [

##### The prompts aren't the hard part. The persistent context is.

](<https://www.reddit.com/r/PromptEngineering/comments/1rqipri/the_prompts_arent_the_hard_part_the_persistent/>) 8 upvotes · 10 comments
\* Using AI to give prompts for an AI. r/PromptEngineering • 1y ago [

##### Using AI to give prompts for an AI.

](<https://www.reddit.com/r/PromptEngineering/comments/1kem941/using_ai_to_give_prompts_for_an_ai/>) 52 upvotes · 45 comments
\* Looking for your most mind-blowing AI results. What am I missing in my prompting game? r/PromptEngineering • 9d ago [

##### Looking for your most mind-blowing AI results. What am I missing in my prompting game?

](<https://www.reddit.com/r/PromptEngineering/comments/1s36u6a/looking_for_your_most_mindblowing_ai_results_what/>) 11 upvotes · 21 comments
\* I created a PROMPT SYSTEM that builds an entire AI team to solve any problem. r/PromptEngineering • 8mo ago [

##### I created a PROMPT SYSTEM that builds an entire AI team to solve any problem.

](<https://www.reddit.com/r/PromptEngineering/comments/1me06n4/i_created_a_prompt_system_that_builds_an_entire/>) 152 upvotes · 52 comments
\* How did you actually get better at prompt engineering? r/PromptEngineering • 18d ago [

##### How did you actually get better at prompt engineering?

](<https://www.reddit.com/r/PromptEngineering/comments/1ruzwr8/how_did_you_actually_get_better_at_prompt/>) 6 upvotes · 31 comments
\* i found 40+ hours of free AI education and it's embarrassing how good it is r/PromptEngineering • 5d ago [

##### i found 40+ hours of free AI education and it's embarrassing how good it is

](<https://www.reddit.com/r/PromptEngineering/comments/1s74puw/i_found_40_hours_of_free_ai_education_and_its/>) 1.5K upvotes · 92 comments
\* 8 ChatGPT prompt frameworks to help you master AI! r/vibecoders\_ • 1mo ago [

##### 8 ChatGPT prompt frameworks to help you master AI!

](<https://www.reddit.com/r/vibecoders_/comments/1rjoo6b/8_chatgpt_prompt_frameworks_to_help_you_master_ai/>) 245 upvotes · 4 comments
\* Does anyone else feel like "Prompt Engineering" is just a massive waste of time? r/PromptEngineering • 23d ago [

##### Does anyone else feel like "Prompt Engineering" is just a massive waste of time?

](<https://www.reddit.com/r/PromptEngineering/comments/1rr3dd2/does_anyone_else_feel_like_prompt_engineering_is/>) 15 upvotes · 73 comments
\* prompt engineering is a waste of time r/PromptEngineering • 1mo ago [

##### prompt engineering is a waste of time

](<https://www.reddit.com/r/PromptEngineering/comments/1ra3xk9/prompt_engineering_is_a_waste_of_time/>) 34 upvotes · 77 comments
\* How to write the best prompts for AI, such as ChatGPT, Gemini, and other large models r/PromptEngineering • 6mo ago [

##### How to write the best prompts for AI, such as ChatGPT, Gemini, and other large models

](<https://www.reddit.com/r/PromptEngineering/comments/1o708pv/how_to_write_the_best_prompts_for_ai_such_as/>) 12 upvotes · 23 comments
\* 10 AI prompts that actually changed how I learn things r/PromptEngineering • 3mo ago [

##### 10 AI prompts that actually changed how I learn things

](<https://www.reddit.com/r/PromptEngineering/comments/1q5iyw2/10_ai_prompts_that_actually_changed_how_i_learn/>) 48 upvotes · 9 comments
\* A list of AI terminology around prompt engineering r/PromptEngineering • 3mo ago [

##### A list of AI terminology around prompt engineering

](<https://www.reddit.com/r/PromptEngineering/comments/1q1f0vu/a_list_of_ai_terminology_around_prompt_engineering/>) 41 upvotes · 16 comments
\* What's your process for writing good AI prompts? r/PromptEngineering • 2mo ago [

##### What's your process for writing good AI prompts?

](<https://www.reddit.com/r/PromptEngineering/comments/1r743fm/whats_your_process_for_writing_good_ai_prompts/>) 6 upvotes · 11 comments
\* Make AI write good articles that people want to read with this prompt system r/PromptEngineering • 10mo ago [

##### Make AI write good articles that people want to read with this prompt system

](<https://www.reddit.com/r/PromptEngineering/comments/1l1i5oz/make_ai_write_good_articles_that_people_want_to/>) 13 upvotes · 11 comments
\* What's the most useful prompt you use regularly? r/PromptEngineering • 7d ago [

##### What's the most useful prompt you use regularly?

](<https://www.reddit.com/r/PromptEngineering/comments/1s5a731/whats_the_most_useful_prompt_you_use_regularly/>) 120 upvotes · 70 comments

#### View Post in

Português (Brasil)
Français
See more See fewer
Italiano
ไทย
Deutsch

### Community Info Section

r/PromptEngineering
Join
PromptEngineering
Prompt engineering is the application of engineering practices to the development of prompts - i.e., inputs into generative models like GPT or Midjourney.
Show more
Public
Anyone can view, post, and comment to this community
Reddit Rules Privacy Policy User Agreement Your Privacy Choices Accessibility Reddit, Inc. © 2026. All rights reserved.
Expand Navigation
Expand Navigation
Collapse Navigation
Collapse Navigation
0cAFcWeA74YQOGyVrHEBFcn8fVofK7fpF-y0WYU2vRgdWNGqA-\_YmnzWKYVMAFtAojyKC39HbHnLAkaBbbPNAljJQhHPq0sZcM5rBuCvodFSgeRCrgKgyHAXNeditBikaaB4jEP8Dsf6OHSLgCLdbajpuCNt11HujWkoxpo0IFS4PuXg0rrVJHFiy5Sj0eeqmi5pN1jCUlVPRySw5oZlePPz8OHzVE14RzibEfYQssTUNMkA55K\_GA3I9IeovkRSSuEZOfUhC7hyU2tys6qK8T4SteyT\_FpceZcmUtczGh1d6LHyL8dWtoGmeF6g8wAfRh8bCEOvSc6-5q2BkKTpcDce-v2WYBd5MsjdUtQOAMj-ep3SlxS5cMXLLbX3CcUe9yHAVB7k-wmFCIkhqudRrdHsi9tat-UDOHCyTao9uFCaENxMPJUCsQvf8Df8EcXsw2q6PMj0f70XPcQyjhJisX9sSqrbP\_c93pWe1dW3rvLxwH1k1979wBWnCtpJQlFohxVGtgeq8dOFpJ4qsmpNGthskq1zZJRi7j\_C87i8RsnVKG6Uw\_T3Aa3\_HKPD-AQjsH26hIEmKnb2qXqaaVYgc9ZedA5AevYhywN23h2jxuwrlwRdCUtmkH2b-4dsLaO6J6gflFq3fb3iAury07SkiQvoS2Xfknj-sPr50r9XkPZMPDQ3NDzFgpkbKXgSyxDcjikuhR5zpRA34oLmdlVzWPKVQkp-u9X3CecihIhPFpm2zjHopERZ2Srqvf3eq8zWpXYwuVEYPBZ0X0kKwj8sFdTuGtR94rfzY4A4UoqGvc3TKVwcFdt5NNVXVq9IuenKkM37c79qkaOLWv65oyV8PFY3t2-NJZeRCMVBg79-Ts05hH4McSgYlR3U01mUzYg-r17h00qIUntqz5TXF9xGfnbwoO9Isr-T84uIbDwnHcD-j0JdhK33SCLprdOr0CgY5Q4bfGnvai8h1t4SAUroXqlgix4qHKu3vptO7wj1BhTnhFZ9GmBPWjYBvZy-hsd8u4FkzBPm\_MYzc3HNjn0yjWt8TSTGAqPsUVjE0djh7xCjLww9fn733cUwrYtUkVTH4g4SYcTmMAbo9phDZz0ditrlR6kN0GcbAiWRtJkS0Q4zeSMrNxjC3OoWmE09GB53it6b8VGCK9XXn2T565SYrzks2y3IERJsDQR-8jyfA\_fBsQ2Vj4wu2Wnxbi4fa4ASGR7QqzCO60YNtM6v4tEFS1itG-x4U0oVsjlkAz8Z6SALYYaoJU5dXoOKNPRxALGI\_OAxkA\_zj1a\_mTIjrHOEtQ\_ANKz2NZZVx8gQTgkyyqhF29ncbWUmTRWecuXcpSSRGFnR0AjwDhsiPYe-qDKi6ABx-Oi-80U3556S208CAA0qIQ\_2oPqY\_6MsCCh0Q8R2ZcSyQTlrMMcdDUJ2swvgoqMt1zGucABLUpvDQ7ygMuGwm\_O8dWgY8U9rK-E4Ci7KyetC3gV4lpuIROMmV7IVFk1tYmnHQkzqIvICPBDW5lgfmyJnyrSOd\_LQRkxLP13ckJPuG9isiC3lBmii7UcfnHo\_zffFXlb3LIrA9ygIHGsAKZp\_iQ77puh7qgMz5hi\_bht0k-0VV9CdXeCEDb78sA1q2Sj-nKgDFPTmoRIKVvPmeUx4Rmv5ACyp\_BU4KDhdy8oxTD-z8GZWaTkGWzf4UBNwKB014qSA6HM6lX7X97tx8biA2AEDy6yKLlnXX\_hShoL72Wusm4f6pCB8LPJxiz0ip\_UTlCWCcsdwqnBjjkLBBskJ9LD2d0fNtx7a9RYzCuN-uHa7tmQbiE\_Rmd5vdOOVu6vGBYT97HEJaPF3vV0haOi358jdKC0uGTQMAAFy71tIsRoAf9s89Lo2lwtamPXdUjf9sltVmE6t6WWkd6VLsx7Qc7OJj4FaUBGzN1EUPUOlJW9YEYaljf9c-pe2RxdeMHl2iK-8n0dPj\_KPw7XgRJMfbNVQoJGW0j5qpAVJ-H\_6tDiwQ7keFHNvs-blNUVk1VLHMJL9unbNd8Sahgmmu76E46svsFUkUINPEuCnDEhePh1C6U7PbW7W8CuFmin-kH2fksLUXLWl1dJ1CnMmnnqbOu5wZjHep-7TqkOr6cGmBLPmYPvADn1i-PTQnDwD1bcyef\_WslgryAg3y4hqgrRVsvu9S9Tf4
