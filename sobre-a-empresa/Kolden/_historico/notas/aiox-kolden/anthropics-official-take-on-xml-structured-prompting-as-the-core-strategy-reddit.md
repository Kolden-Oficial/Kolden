---
id_fonte: "1f4c2e76-59ad-4893-90f3-fcf1957cb1a1"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Anthropic's Official Take on XML-Structured Prompting as the Core Strategy - Reddit"
tipo: "unknown"
url_original: "https://www.reddit.com/r/ClaudeAI/comments/1psxuv7/anthropics_official_take_on_xmlstructured/"
keywords: "('XML Prompting Strategy', 'Claude AI Performance', 'Structured Prompting Benefits', 'Anthropic Official Documentation', 'Information Organization Methods')"
summary: "This Reddit discussion explores the community's reaction to **structured prompting**, particularly the use of **XML tags**, as a core strategy for improving interactions with the Claude AI model. While users debate whether the technique’s effectiveness stems from **Anthropic’s official training** or simply from forcing humans to **organize their thoughts better**, the consensus highlights that clear formatting prevents confusion and reduces the need for back-and-forth clarification. Skeptics argue that such rigid structures may be becoming **obsolete or a waste of tokens** as models improve, yet proponents maintain that \"speaking the AI's language\" remains a **game-changer for complex tasks**. Ultimately, the text serves as a guide for users to transition from conversational prose to **consistent, parseable frameworks** like XML or Markdown to achieve higher-quality, reliable outputs."
extraido_em: "2026-06-30T16:18:19Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Anthropic's Official Take on XML-Structured Prompting as the Core Strategy - Reddit

Anthropic's Official Take on XML-Structured Prompting as the Core Strategy : r/ClaudeAI
Skip to main content Anthropic's Official Take on XML-Structured Prompting as the Core Strategy : r/ClaudeAI
Open menu
Open navigation
Go to Reddit Home
r/ClaudeAI
TRENDING TODAY
Get App
Get the Reddit app
Log In
Log in to Reddit
Expand user menu
Open settings menu
Skip to Navigation Skip to Right Sidebar
Back
Go to ClaudeAI
r/ClaudeAI
•
3mo ago
Riggz23
Locked post
Stickied post
Archived post
\* Report

### Anthropic's Official Take on XML-Structured Prompting as the Core Strategy

News
**I just learned why some people get amazing results from Claude and others think it's just okay**
So I've been using Claude for a while now. Sometimes it was great, sometimes just meh.
Then I learned about something called "structured prompting" and wow. It's like I was driving a race car in first gear this whole time.
Here's the simple trick. Instead of just asking Claude stuff like normal, you put your request in special tags.
Like this:

```
<task>What you want Claude to do</task>
<context>Background information it needs</context>
<constraints>Any limits or rules</constraints>
<output_format>How you want the answer</output_format>
```

That's literally it. And the results are so much better.
I tried it yesterday and Claude understood exactly what I needed. No back and forth, no confusion.
It works because Claude was actually trained to understand this kind of structure. We've just been talking to it the wrong way this whole time.
It's like if you met someone from France and kept speaking English louder instead of just learning a few French words. You'll get better results speaking their language.
This works on all the Claude versions too. Haiku, Sonnet, all of them.
The bigger models can handle more complicated structures. But even the basic one responds way better to tags than regular chat.
Upvote 426 Downvote 113 Go to comments 1 Share
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

ClaudeAI-mod-bot
MOD
• 3mo ago
• Stickied comment
• Edited 3mo ago
**TL;DR generated automatically after 100 comments.**
The thread is divided, but the general consensus is that **structured prompting is a game-changer, though the** *reason* \*\* why is up for debate.\*\*
The top-voted take is that using XML simply forces *you* to organize your thoughts better, and *that's* what leads to better results. Many users agree, reporting they get the same boost from using Markdown or just well-organized paragraphs.
However, several users shut down the skeptics by linking to **Anthropic's official documentation, which explicitly recommends using XML tags** to help Claude parse complex prompts. A few others noted that different Anthropic docs suggest this is becoming less necessary as models improve, with some calling it a waste of tokens .
The final verdict? While Anthropic does endorse XML, the community largely agrees that **any clear, consistent structure is better than a wall of text.** Whether you use XML, Markdown, or just good formatting, the key is helping Claude (and yourself) break down the request.
Upvote Vote Downvote Reply Award Share
\* Report
\* Award
Share
PrestigiousQuail7024
•
3mo ago
• Edited 3mo ago
honestly i feel like XML/JSON/whatever structured prompting style helps more because it forces you to break your messy concepts into individual units, people just don't naturally do this well. i found xml prompting worked for me, then i tried turning the xml back into prose to form like highly structured prose and it worked just as well, if\* not better because it gave me a little more room to reintroduce some nuance.
so imo its just better to learn to encode your thoughts into a more structured form, whatever format that might come in. chatting to a low level model can be good for this too, in the rubber ducking sense, and also gives you an early flag of what things seem obvious but trip an LLM up
Upvote 197 Downvote Reply 1 Share
\* Report
\* Award
Share
Peach\_Muffin
•
3mo ago
Yeah I use Markdown and it works just as well.
Upvote 30 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
Juleski70
•
3mo ago
This 💯
Structure helps you do your job more than it helps Claude do its job
Upvote 9 Downvote Reply Award Share
\* Report
\* Award
Share
spastical-mackerel
•
3mo ago
Can we not bring back XML?
Upvote 20 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
kongnico
•
3mo ago
thats why it works yes. Not because the llm understands XML better or anything.
Upvote 5 Downvote Reply Award Share
\* Report
\* Award
Share
6 more replies
pandavr
•
3mo ago
Being a chat model I am 100% sure any model saw ways more unstructured context respect to structured one.
So, how could we explain better results?
Upvote 49 Downvote Reply Award Share
\* Report
\* Award
Share
PmMeSmileyFacesO\_O
•
3mo ago
Top 1% Commenter
Being a chat model I am 100% sure
Gotem boys.
Upvote 45 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
deadcoder0904
•
3mo ago
• Edited 3mo ago
So, how could we explain better results?
Because coding agents fail at reading outputs but if you give it structure, it'll give better answers. Even smaller models would give better outputs.
I guess, the scraping that did was done on HTML so it knows XML because they are mostly related someway... ik its not a subset but still.
IndyDevDan actually did a video on it why XML is better a long time ago. Even OpenRouter improved JSON recently & there are some startups that attempt this like BAML (Boundary ML fwiw)
TL;DR XML is easily parseable in coding. U can even reference it easily (again lookup IndyDevDan's video)
Example:

##### XML

```
INPUT:
<q>What's 2+2?<q>
<a>4</a>
<q>What's 3x3?<q>
<a>9</a>
<q>What's 2-1?<q>
<a>1</a>
<q>What's 8+2?</q>

OUTPUT:
<a>10</a>
```

##### TEXT

```
INPUT:
What's 2+2?
4

What's 3x3?
9

What's 2-1?
1

What's 8+2?


OUTPUT:
Here's what 10 means:
10

GROK 4.1 ANSWER:
10

**Explanation**: Addition is the process of combining two numbers. Here, 8 plus 2 means starting with 8 and adding 2 more, which gives a total of 10 (8 + 1 = 9, then 9 + 1 = 10).
```

Look how Here's what 10 means: came up here which is a bit hard to parse (its easy here because of simple example but on hard tasks or via smaller models, it'll fail) but Sonnet 4.5 will answer both perfectly because Claude models are GOAT'd.
Now with XML, there's 0 chances of failure or pretty low chances of failure compared to just markdown. ^
This is what I tested bdw but it was >6 months ago so it might've changed now since smaller models are getting better.
Eventually, I think there won't be any difference just like how humans understand. I had abandoned JSON 6 months ago but I think even JSON is good now (again OpenRouter's JSON failure fix post) goes more into it.
Upvote 6 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
stingraycharles
•
3mo ago
Because they are specifically trained on it. Just look at Anthropic's own system prompts.
Upvote 4 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
2 more replies
kkingsbe
•
3mo ago
A while back this gave better responses but now just wastes tokens. Just use markdown lol
Upvote 18 Downvote Reply Award Share
\* Report
\* Award
Share
papargacl
•
3mo ago
It's my self documentation
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
iemfi
•
3mo ago
Nah, that doc is really outdated and from a time long long ago (last year). The latest models have no problems parsing even poorly written text. You're just wasting precious context for Opus 4.5.
Upvote 12 Downvote Reply Award Share
\* Report
\* Award
Share
AttorneyIcy6723
•
3mo ago
I mean if you're going to follow this line of reasoning you may as well just write code. It's a total anti-pattern and I doubt anything more than a placebo / total waste of tokens.
Upvote 6 Downvote Reply Award Share
\* Report
\* Award
Share
officialtaches
•
3mo ago
I made a video about this a while ago that a lot of people loved: <https://www.youtube.com/watch?v=8_7Sq6Vu0S4>
**Then I went on to build an entire project development system around this concept:** <https://github.com/glittercowboy/get-shit-done>
Fuses the idea of XML formatted meta prompts, context engineering and spec-driven development into a pretty foolproof way to build anything effectively.
P.S. GSD was an improvement on my original 'create-prompt' slash command that converted your desired goal into an XML formatted prompt with verification and definition of done criteria I put up in <https://github.com/glittercowboy/taches-cc-resources>
Upvote 9 Downvote Reply Award Share
\* Report
\* Award
Share
scodgey
•
3mo ago
Just wanted to say that every time I see you post in here, I get such nostalgia. Malindi and some of your other releases from that era were on continuous loop in my uni house for years. Thank you for what you did back then, and thanks for this as well!
Upvote 7 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
3 more replies
BingpotStudio
•
3mo ago
I've been telling people to write agents in xml for ages and someone always pushed back. Just give it a try. So much better at staying on rails.
Upvote 4 Downvote Reply Award Share
\* Report
\* Award
Share
c00pdwg
•
3mo ago
Link to where Anthropic made this official statement?
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
officialtaches
•
3mo ago
Anthropic explicitly say XML is better for Claude specifically: <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags>
Upvote 7 Downvote Reply Award Share
\* Report
\* Award
Share
wea8675309
•
3mo ago
Is there anything specific about XML that is better? Can I use YAML? Can I just structure my prompts with markup headers? I hate typing XML
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
2 more replies
nodeocracy
•
3mo ago
Try non xml structure (ie a common sense prompt layout)
Upvote 9 Downvote Reply Award Share
\* Report
\* Award
Share
officialtaches
•
3mo ago
Or follow Anthropics own best practices:
<https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags>
Upvote 17 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
1 more reply
HopperOxide
•
3mo ago
I'm not saying I agree completely with OP's take, but Anthropic certainly does make strong claims about using XML structured prompts. I've been wondering about why this isn't more commonly known or promoted as well.
When your prompts involve multiple components like context, instructions, and examples, XML tags can be a game-changer. They help Claude parse your prompts more accurately, leading to higher-quality outputs.
<https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags>
Upvote 5 Downvote Reply Award Share
\* Report
\* Award
Share
HopperOxide
•
3mo ago
That said, I've asked the prompt optimizer about this a few times in the context of optimizing long, complicated prompts with examples etc, and it's consistently said that switching to xml tags doesn't matter.
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
Worldly-Pen-8101
•
3mo ago
Someone here said structuring the prompts helps you, the end user, think better. I agree with this. Also, if you think about prompts as artifacts that need to be versioned, you will need structure. Due to these reasons, I think the POML intitiative by Microsoft is interesting ( I am not associated with MS or POML) <https://github.com/microsoft/poml/blob/main/examples/101_explain_character.poml>
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
Environmental\_Gap\_65
•
3mo ago
Is this site just being spammed with bots? I feel like these posts comes up once every second day from an account that is days old, just to tell everyone that the model is good you just need to do xyz
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
ratttertintattertins
•
3mo ago
I mean.. I do this kind of thing sometimes, often with json. However, it's really a case by case thing and I generally get excellent results either way.
I don't think there's anything special about XML. It's just altering your behaviour to write clearer prompts.
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
officialtaches
•
3mo ago
Anthropic explicitly say XML is better for Claude specifically: <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags>
Upvote 3 Downvote Reply Award Share
\* Report
\* Award
Share
More replies
Pandeamonaeon
•
3mo ago
I use a package for Claude named superpowers which make Claude generate plans for any feature I wanna implements with checklist and that works like a charm
Upvote 2 Downvote Reply Award Share
\* Report
\* Award
Share
2 more replies
anirishafrican
•
3mo ago
XML tags are legit. The next level: what do you do when you have 10+ of these structured prompts for different tasks?
The problem I hit: I had great prompts for code review, writing, planning, research - but they lived in random docs. I'd copy-paste into system prompts, forget which version was current, lose track of what worked.
The shift that helped: treating prompts as *data* , not text files.
Each prompt becomes a record with fields:
\* trigger\_context : when should this activate?
\* instructions : the actual prompt
\* output\_format : what you expect back
Update in one place, all your clients benefit. Self-discoverable ("show me all my writing prompts"). Portable - same prompts work in Claude, ChatGPT, Cursor, wherever.
If you're finding XML tags helpful (you will), the next step is figuring out how to manage them at scale.
Built this as a core feature into Xtended - we call them Playbooks, accessible via MCP. Happy to share more if useful.
Upvote 1 Downvote Reply Award Share
\* Report
\* Award
Share
View more comments

### Related Answers Section

Related Answers
Effective Claude prompts using XML tags
Claude prompt engineering tips
Powerful Claude prompts list
Best use cases for ClaudeAI in business
How ClaudeAI compares to other AI models
New to Reddit?
Create your account and connect with a world of communities.
Continue with Email
Continue With Phone Number
By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.

### More posts you may like

```
*  Whether Anthropic holds its ground is itself training material. r/ClaudeAI • 1mo ago [
```

##### Whether Anthropic holds its ground is itself training material.

](<https://www.reddit.com/r/ClaudeAI/comments/1rf1dxr/whether_anthropic_holds_its_ground_is_itself/>) 110 upvotes · 22 comments
\* Never been so dissapointed in Anthropic - What are my options? r/ClaudeCode • 9d ago [

##### Never been so dissapointed in Anthropic - What are my options?

](<https://www.reddit.com/r/ClaudeCode/comments/1s3ddw6/never_been_so_dissapointed_in_anthropic_what_are/>) 13 upvotes · 12 comments
\* Anthropic... Is this how you deal with your "high ticket" customers? r/ClaudeCode • 9d ago [

##### Anthropic... Is this how you deal with your "high ticket" customers?

](<https://www.reddit.com/r/ClaudeCode/comments/1s3g3om/anthropic_is_this_how_you_deal_with_your_high/>) 15 upvotes · 14 comments
\* Got tired of switching Claude Code between GLM, Kimi, Minimax and Anthropic endpoints, so I built a CLI that does it for me r/ClaudeCode • 5mo ago [

##### Got tired of switching Claude Code between GLM, Kimi, Minimax and Anthropic endpoints, so I built a CLI that does it for me

](<https://www.reddit.com/r/ClaudeCode/comments/1oiaz8r/got_tired_of_switching_claude_code_between_glm/>) 32 upvotes · 30 comments
\* Watching Anthropic write my code while my family thinks I'm a coding genius. r/ClaudeCode • 4mo ago [

##### Watching Anthropic write my code while my family thinks I'm a coding genius.

](<https://www.reddit.com/r/ClaudeCode/comments/1p2rv87/watching_anthropic_write_my_code_while_my_family/>) 109 upvotes · 11 comments
\* Will Anthropic make Claude Code proprietary too? (No more using GLM/MiniMax etc. in the terminal?) r/ClaudeAI • 3mo ago [

##### Will Anthropic make Claude Code proprietary too? (No more using GLM/MiniMax etc. in the terminal?)

](<https://www.reddit.com/r/ClaudeAI/comments/1q9bcz2/will_anthropic_make_claude_code_proprietary_too/>) 8 upvotes · 24 comments
\* Anyone else notice Claude Code keeps sneaking the Anthropic API into every implementation plan lately? r/ClaudeAI • 10d ago [

##### Anyone else notice Claude Code keeps sneaking the Anthropic API into every implementation plan lately?

](<https://www.reddit.com/r/ClaudeAI/comments/1s2uhrz/anyone_else_notice_claude_code_keeps_sneaking_the/>) 2 upvotes · 10 comments
\* Anthropic AI just dropped the most interesting Vibe Coding resource on internet. r/ClaudeAI • 10mo ago [

##### Anthropic AI just dropped the most interesting Vibe Coding resource on internet.

](<https://www.reddit.com/r/ClaudeAI/comments/1kuy51e/anthropic_ai_just_dropped_the_most_interesting/>) 0:52 208 upvotes · 26 comments
\* I don't code much anymore :-| r/ClaudeCode • 20d ago [

##### I don't code much anymore :-|

](<https://www.reddit.com/r/ClaudeCode/comments/1rtoi9p/i_dont_code_much_anymore/>) 1 upvote · 10 comments
\* Finally Anthropic Product Team Fixed this r/ClaudeCode • 3mo ago [

##### Finally Anthropic Product Team Fixed this

](<https://www.reddit.com/r/ClaudeCode/comments/1px4qu9/finally_anthropic_product_team_fixed_this/>) 29 upvotes · 17 comments
\* built a small CLI to carry your Claude Code session context into Codex / Copilot / Gemini / OpenCode / Droid when you hit rate limits r/ClaudeCode • 1mo ago [

##### built a small CLI to carry your Claude Code session context into Codex / Copilot / Gemini / OpenCode / Droid when you hit rate limits

](<https://www.reddit.com/r/ClaudeCode/comments/1r9fkv3/built_a_small_cli_to_carry_your_claude_code/>) 37 upvotes · 6 comments
\* imagine it's your first day and you open up the codebase to find this r/ClaudeCode • 4mo ago [

##### imagine it's your first day and you open up the codebase to find this

](<https://www.reddit.com/r/ClaudeCode/comments/1p74f9d/imagine_its_your_first_day_and_you_open_up_the/>) 214 upvotes · 113 comments
\* For fellow ADHDers... r/ClaudeAI • 10d ago [

##### For fellow ADHDers...

](<https://www.reddit.com/r/ClaudeAI/comments/1s2opgp/for_fellow_adhders/>) 23 upvotes · 21 comments
\* Testing the new 1M context window be like... r/ClaudeCode • 20d ago [

##### Testing the new 1M context window be like...

](<https://www.reddit.com/r/ClaudeCode/comments/1rtvolz/testing_the_new_1m_context_window_be_like/>) 0:11 11 upvotes · 3 comments
\* This is how I feel Claude Coding right now r/ClaudeCode • 24d ago [

##### This is how I feel Claude Coding right now

](<https://www.reddit.com/r/ClaudeCode/comments/1rptcuf/this_is_how_i_feel_claude_coding_right_now/>) 0:10 1.4K upvotes · 80 comments
\* Upgrade Next.js immediately r/ClaudeCode • 4mo ago [

##### Upgrade Next.js immediately

](<https://www.reddit.com/r/ClaudeCode/comments/1pfqutg/upgrade_nextjs_immediately/>) 77 upvotes · 44 comments
\* an open letter to anthropic: why i can no longer justify my subscription in this shifting landscape r/claudexplorers • 8d ago [

##### an open letter to anthropic: why i can no longer justify my subscription in this shifting landscape

](<https://www.reddit.com/r/claudexplorers/comments/1s4fxfe/an_open_letter_to_anthropic_why_i_can_no_longer/>) 53 upvotes · 25 comments
\* Time to drop Anthropic sadly, but where to go? r/ClaudeCode • 4d ago [

##### Time to drop Anthropic sadly, but where to go?

](<https://www.reddit.com/r/ClaudeCode/comments/1s7k9qa/time_to_drop_anthropic_sadly_but_where_to_go/>) 120 upvotes · 201 comments
\* Do projects still mater at this point? r/ClaudeAI • 14d ago [

##### Do projects still mater at this point?

](<https://www.reddit.com/r/ClaudeAI/comments/1rz86mw/do_projects_still_mater_at_this_point/>) 70 upvotes · 58 comments
\* claude code not really suitable for complex multi-agent workflows? r/ClaudeCode • 5mo ago [

##### claude code not really suitable for complex multi-agent workflows?

](<https://www.reddit.com/r/ClaudeCode/comments/1om75sa/claude_code_not_really_suitable_for_complex/>) 7 upvotes · 27 comments
\* Don't review code changes, review plans r/ClaudeCode • 23d ago [

##### Don't review code changes, review plans

](<https://www.reddit.com/r/ClaudeCode/comments/1rrbfkj/dont_review_code_changes_review_plans/>) 13 comments
\* I think I know what 'Mythos' is - CC Source Analysis r/ClaudeCode • 3d ago [

##### I think I know what 'Mythos' is - CC Source Analysis

](<https://www.reddit.com/r/ClaudeCode/comments/1s8nnql/i_think_i_know_what_mythos_is_cc_source_analysis/>) 39 upvotes · 39 comments
\* Claude code Overloaded? r/ClaudeCode • 3d ago [

##### Claude code Overloaded?

](<https://www.reddit.com/r/ClaudeCode/comments/1s8wqdu/claude_code_overloaded/>) 23 upvotes · 18 comments
\* Experiencing massive dropoff in coding quality and following rules since last week. r/ClaudeCode • 6d ago [

##### Experiencing massive dropoff in coding quality and following rules since last week.

](<https://www.reddit.com/r/ClaudeCode/comments/1s62tz4/experiencing_massive_dropoff_in_coding_quality/>) 48 upvotes · 44 comments

#### View Post in

Tiếng Việt
日本語
Русский
हिन्दी
繁體中文
See more See fewer
Ελληνικά
Deutsch
Español (Latinoamérica)
Čeština
ไทย
Español (España)
Português (Portugal)
Magyar
Srpski
English

### Community Info Section

r/ClaudeAI
Check Claude service status.
Join
ClaudeAI
This is a Claude and Claude Code discussion subreddit to help you make a fully informed decision about using Claude and Claude Code to best effect for your own purposes. ¹⌉ Anthropic does not control or operate this subreddit or endorse views expressed here. ²⌉ If your problem requires Anthropic's help, visit <https://support.anthropic.com/> This subreddit is not the right place to fix your account issues. ³⌉ For more help, check the resources below. ⁴⌉ Please read the rules before posting.
Show more
Public
Anyone can view, post, and comment to this community
Reddit Rules Privacy Policy User Agreement Your Privacy Choices Accessibility Reddit, Inc. © 2026. All rights reserved.
Expand Navigation
Expand Navigation
Collapse Navigation
Collapse Navigation
0cAFcWeA7iMVtMQg9din9IZRd4dtDNZU0ZaCrxiVxHSBKp1O0hNhwSOjz389HRgd3w\_Cngw4x2YZvyfWw8jLXoS8Ef5TNUqr-Ye6OTc6SUHptEl8dQwhlsCpNnFfbXK2lVwQzsABP5k3NecnMJUF3hJqho47p0pIFSiSULqh047tELxFyRolTvO0DG7VhH0PIKOARNBd5c7BVzYYudbrR18-c4typSUuoYZuUlW2bkroWXkIqj7sikJjNY7QNhzTNW5Jbxks9k8znXcE2bvLcHI-3igvMMcftklwiYTaNJagsBR2ZDRcAYokIichwPoWj0NI-Iqo8Nui9Xdcqdm96m1Agcd131MbqUm52bY3iRISpex5wQrqWUi95NgpnE3dBjCgcSr2BzPiOmhYK6YRAPpPui\_C1gXC6I4MZ8hRu7sHpJaL4FHRHBxk8LG4NNuZdOYvMrpjwO1K4iaffiUjiGNhGedHcX2vaFDkmBfqBwZmplIA9gNL6KWKsw533YbAPhKliz36x94uAAr-0CKdUNDxgcG907Kdo2jFhweH56PSkV2r42C0eqNXtYUg8wSK5F\_47nO0UZ-A3cjGVpH0xcBDCvb4bznk7DHUZUv7koynjWOdUbJ4w8-asSthkgQKrci1AFihxzbM4t\_HdaJoMMOU0uOh0d9aOxuSKpEEuIC9fNCAamKJOh-Ltu6u7jGHQ4bHTTqEdKCzyBhKrThV4UcQNg5m9\_DIJ8gSG-KXW697w8Qc1yISYcFE-XA-VTVJIDX7vp7X7jWxdi24zLpq2PJNjjBiKcIlBenYzemsrrbDD\_rwJd5FvQTAsGFqmCZOuqy6obthnHbROZm1FFZ2\_xsZJT7M5hreArvLkVaSV9mGG8cANJLp46ejeNWHkwPF9EyDpeQ\_fJbyvhq8s06WZ4pA3cJrLww77YY8w5swMScGgW8jY-3lvOKsmeiGNTxtdsYefac\_23yoGNj8UWpBe6wXjUL77wKBQ5dvmzVlA2hY5OFbOZMHO8s8gHefWWvNVvTwhMayf3s-PJHQ3\_1qmKsg-6fnog1Dj68y7kb8XexnsYRMS8X9Q4qDgAtOzfF4\_uV2IGhk2EfCOGOzGrVXP0sO5baYWK9v3dVsqs-bP9RX-WY0CEw0dVx38eq5-OzNBHgEzHAKdHg\_HdyxnPLJ1Po0Xb5XP7tLhG7SWt62RZFU7NvZiQFkKWh6B6h1Oeygv8R\_LNoHXoZve22eYBiUtx\_G3XzTd0ivQs6MKGV9nXTQBdkX\_Ja1wo2Pa9cxsazxPnJrbonftO22kuKNE3d9a8E7TRhoC\_Tnw5HmpLIB4x5ITTElSq4bvckG\_Mx50X0aw85mHwJLkGywIdXMysI4d\_M4f841W-NN\_C1DUW7hLx0bPDnGNwaLHWb-cuv3ZnthB4WA6ySpook\_Nlb7SsgZDWv7hSQksGbgkI2TbNM09K8QhiD1GxhbbfeFndMauJHd30o5SBCAQETWTfzNOpfLP7i8s3RytGCrZ2uzyURE1IvH-F1sTpcW5jwWLLmrsHKPwOEyYnRZvf8bkAZE67D-phAsBMDRWBzh1s-7UvEmgy6KpSyP7os50LN3QqN4m2DsoD6PKiipF17wryhK9UiZqkFTdZeL4MhOkJuUvtVx8hsQA49RDc7s3C3co5f0Vl5u\_unc-c8G6jYL9szY3\_iRaUHiCG-9B3JwP4tNi8mDvaIjiv9xvPNkQ0mYin-wXxGlo5cyNwXW15LBYLpFvWejt3\_wHrE\_s2HPB\_hXvjFBoKqAM-0X\_1bmYK6fyDrLHlfOzj8zPVL57KfFMjZEsazS588htQN-pz47ujfvS27y2r9BbEC8bwF2IdZXB3f\_gU6Fnwm5i7hU-8qkOkBgKk4nsqGAp7cRFFAxemQ0UacVmYAGK2jcN1A0GgO1\_H94Md69JAJOHyUwJ5pZ\_RLrjT3e\_SPti6oChZqikj-wC6CXy7SHw7bX7MqRjFRxycadvokHxHlE3YdQ8lyeZ2eMKB864Y092i0upxOIao1Ospk7WqooJsdwiboTjuuZ0hJozww03lt8Hl3lqAONyj1Vbzas\_pV-LnB-7JF5jwB4JUaz4XrubY9sfgOo73xjNdb28NkquIso8vHaPmR33cz2YN5NxAgZKr\_0LmKsksmjlBhh2SdqvkCwkjZBq-rHDw12moF-Kza28OKHNKCyG3
