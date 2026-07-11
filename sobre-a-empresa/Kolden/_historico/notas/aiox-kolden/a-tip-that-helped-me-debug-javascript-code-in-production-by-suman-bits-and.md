---
id_fonte: "b43807e9-ec09-4877-9903-b6de7e9accb5"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "A Tip That Helped Me Debug JavaScript Code in Production | by Suman - Bits and Pieces"
tipo: "unknown"
url_original: "https://blog.bitsrc.io/production-debugging-in-chrome-minified-js-11e53b7f1821"
keywords: "('JavaScript production debugging', 'Chrome developer tools', 'Pretty-print feature', 'Minified code debugging', 'Source code breakpoints')"
summary: "This article provides a practical guide for developers facing the high-pressure challenge of **debugging JavaScript errors in a production environment** where code is typically compressed. The author highlights the **Pretty-Print** feature within **Chrome DevTools**, which transforms unreadable, minified files into a formatted, human-readable structure. By utilizing this tool, programmers can effectively **set breakpoints** and inspect live variables to identify issues that cannot be replicated in local testing. Ultimately, the text serves as a **step-by-step tutorial** designed to help engineers resolve critical defects quickly and maintain application stability under professional scrutiny."
extraido_em: "2026-06-30T16:17:51Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# A Tip That Helped Me Debug JavaScript Code in Production | by Suman - Bits and Pieces

A Tip That Helped Me Debug JavaScript Code in Production | by Suman | Bits and Pieces
Sitemap
Open in app
Sign up
Sign in
Medium Logo
Get app
Write
Search
Sign up
Sign in
[

#### Bits and Pieces

](<https://blog.bitsrc.io/?source=post_page---publication_nav-5c2fdf847f4a-11e53b7f1821--------------------------------------->)
·
Follow publication
Insightful articles, step-by-step tutorials, and the latest news on full-stack composable software development
Follow publication

### A Tip That Helped Me Debug JavaScript Code in Production

#### Production Debugging in Chrome | Minified JS | Blocker defects debugging in Production.

Suman
Follow
4 min read
·
Feb 11, 2022
81
2
Listen
Share
Press enter or click to view image in full size
Are you frustrated with production defects? I can understand your pain if something working in your local but got suddenly broken in production or any upper-level environment. You keep trying but are not able to reproduce, your manager is behind you, your clients keep calling you — so many escalations as real users getting impacted. Everyone is waiting for your fixes but you don't know how to debug in production.
I can still remember one weekend I was enjoying myself with my girlfriend, suddenly got a call from my manager saying the application was not working in production, fix this ASAP. There was no one available that day, no one from DB, backend, even my manager wasn't available. Clients are directly calling to me, no one was there to help.
Can you imagine the situation? If you are in the JavaScript world, you are lucky, we can debug the minified JavaScript code directly from Chrome itself.
We can reproduce the same error in a test environment with an un-minified JavaScript version that doesn't work out.
Everything has advanced, even browsers have advanced, understood the developer's problem, and provided an unpaid feature called **Pretty-Print** . If you are smart you can use this feature.
Build in AI speed — Compose enterprise-grade applications, features, and components

##### Have a look at the below steps to debug

```
1. Open your application in the browser.
1. Now press F12 or Ctrl + Shift + I or right-click anywhere inside the web page and select Inspect, mostly the last option.
1. Then click on the source tab in the developer tool and find the minified  **main.js**  file, click on that.
```

Press enter or click to view image in full size
1. After that you will see the {} option on the left corner that is called pretty-print.

#### Get Suman's stories in your inbox

Join Medium for free to get updates from this writer.
Subscribe
Subscribe [x]
Remember me for faster sign in
Check the below image to find it:
Press enter or click to view image in full size
1. Click on that {} sign, you will get a new tab with formatted source code in JS.
Press enter or click to view image in full size
1. Now you can see the line number on the left side, anywhere you can click on the line number to put the debugger where ever you need.
Press enter or click to view image in full size
1. Now refresh the page by clicking the browser refresh button. Please do not press F5 as this will refresh the developer tool and wait for the breakpoint to hit.
1. Once the breakpoint is hit, again click on { }, you will see a new tab with breakpoint maintained at the same place.
1. Now you can see values and you can debug easily.
That's all. I hope this article helps you to reduce your production defects.
Please follow me if you like the article and do check my coding blog <https://coderfact.com/>

#### Build composable frontend and backend

Don't build web monoliths. Use Bit to create and compose decoupled software components — in your favorite frameworks like React or Node. Build scalable and modular applications with a powerful and enjoyable dev experience.
Bring your team to Bit Cloud to host and collaborate on components together, and greatly speed up, scale, and standardize development as a team. Start with composable frontends like a Design System or Micro Frontends, or explore the composable backend. Give it a try →

##### Learn More

[

#### How We Build Micro Frontends

##### Building micro-frontends to speed up and scale our web development process.

blog.bitsrc.io](<https://blog.bitsrc.io/how-we-build-micro-front-ends-d3eeeac0acfc?source=post_page-----11e53b7f1821--------------------------------------->)
[

#### How we Build a Component Design System

##### Building a design system with components to standardize and scale our UI development process.

blog.bitsrc.io](<https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833?source=post_page-----11e53b7f1821--------------------------------------->)
[

#### The Composable Enterprise: A Guide

##### To deliver in 2022, the modern enterprise must become composable.

blog.bitsrc.io](<https://blog.bitsrc.io/the-composable-enterprise-a-guide-609443ae1282?source=post_page-----11e53b7f1821--------------------------------------->)
[

#### 7 Tools for Faster Frontend Development in 2022

##### Tools you should know to build modern Frontend applications faster, and have more fun.

blog.bitsrc.io](<https://blog.bitsrc.io/7-tools-for-faster-frontend-development-in-2022-43b6f663c607?source=post_page-----11e53b7f1821--------------------------------------->)
81
2
JavaScript
Web Development
Software Development
Programming
Chrome
81
81
2
Follow
[

#### Published in Bits and Pieces

](<https://blog.bitsrc.io/?source=post_page---post_publication_info--11e53b7f1821--------------------------------------->)
42K followers
·
Last published Feb 23, 2026
Insightful articles, step-by-step tutorials, and the latest news on full-stack composable software development
Follow
Follow
[

#### Written by Suman

](<https://medium.com/@suman-giri?source=post_page---post_author_info--11e53b7f1821--------------------------------------->)
288 followers
·
263 following
Hi! I am a Senior frontend developer with a passion for the latest solutions and interactive design
Follow

#### Responses ( 2)

Write a response
What are your thoughts?
Cancel
Respond
Shai Almog
Feb 12, 2022

```
This is production client side debugging. Notice that debugging the production backend deployment is MUCH harder. Especially at scale where k8s, fault tolerance, green/blue etc. make things much harder.
There's a rising field of production debugging…more
```

1
1 reply
Reply
Meysam Sarabadani
May 6, 2023

```
https://developer.chrome.com/blog/devtools-modern-web-debugging/
```

Reply

#### More from Suman and Bits and Pieces

In
JavaScript in Plain English
by
Suman
[

#### I Tested Cursor vs Windsurf vs Claude Code for 30 Days—Here's Which AI IDE Actually Won!

##### The AI coding game has completely changed. I spent weeks testing Cursor, Windsurf, and Claude Code on real projects—building apps…

](<https://javascript.plainenglish.io/i-tested-cursor-vs-windsurf-vs-claude-code-for-30-days-heres-which-ai-ide-actually-won-a877a2d82d60?source=post_page---author_recirc--11e53b7f1821----0---------------------a70cf38f_f3f3_40a1_93fb_96682d18d41e-------------->)
Jan 30
A clap icon 7
In
Bits and Pieces
by
Viduni Wickramarachchi
[

#### The BFF Pattern (Backend for Frontend): An Introduction

##### Get to know the benefits of using BFF pattern in practice

](<https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf?source=post_page---author_recirc--11e53b7f1821----1---------------------a70cf38f_f3f3_40a1_93fb_96682d18d41e-------------->)
Feb 23, 2021
A clap icon 3.1K A response icon 21
In
Bits and Pieces
by
Paige Niedringhaus
[

#### How to Utilize Submodules within Git Repos

##### One Solution When the Primary Code Can be Open Source, but Specific Content Needs to be Private

](<https://blog.bitsrc.io/how-to-utilize-submodules-within-git-repos-5dfdd1c62d09?source=post_page---author_recirc--11e53b7f1821----2---------------------a70cf38f_f3f3_40a1_93fb_96682d18d41e-------------->)
Mar 18, 2021
A clap icon 398 A response icon 1
In
JavaScript in Plain English
by
Suman
[

#### Why Google Banned GeeksforGeeks (And What's Next)

##### If you're into tech, you've definitely heard of GeeksforGeeks. They've been the spot for coding tutorials forever — think 25 million…

](<https://javascript.plainenglish.io/why-google-banned-geeksforgeeks-and-whats-next-da58d3c4ac93?source=post_page---author_recirc--11e53b7f1821----3---------------------a70cf38f_f3f3_40a1_93fb_96682d18d41e-------------->)
May 6, 2025
A clap icon 16 A response icon 1
See all from Suman
See all from Bits and Pieces

#### Recommended from Medium

unicodeveloper
[

#### 10 Must-Have Skills for Claude (and Any Coding Agent) in 2026

##### The definitive guide to agent skills that change how Claude Code, Cursor, Gemini CLI, and other AI coding assistants perform in production.

](<https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051?source=post_page---read_next_recirc--11e53b7f1821----0---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Mar 9
A clap icon 1.2K A response icon 15
Michal Malewicz
[

#### Vibe Coding is OVER.

##### Here's What Comes Next.

](<https://michalmalewicz.medium.com/vibe-coding-is-over-5a84da799e0d?source=post_page---read_next_recirc--11e53b7f1821----1---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Mar 24
A clap icon 3.3K A response icon 108
In
Generative AI
by
Adham Khaled
[

#### Stanford Just Killed Prompt Engineering With 8 Words (And I Can't Believe It Worked)

##### ChatGPT keeps giving you the same boring response? This new technique unlocks 2× more creativity from ANY AI model — no training required…

](<https://generativeai.pub/stanford-just-killed-prompt-engineering-with-8-words-and-i-cant-believe-it-worked-8349d6524d2b?source=post_page---read_next_recirc--11e53b7f1821----0---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Oct 19, 2025
A clap icon 25K A response icon 692
In
Level Up Coding
by
Kusireddy
[

#### I Stopped Using ChatGPT for 30 Days. What Happened to My Brain Was Terrifying.

##### 91% of you will abandon 2026 resolutions by January 10th. Here's how to be in the 9% who actually win.

](<https://levelup.gitconnected.com/i-stopped-using-chatgpt-for-30-days-what-happened-to-my-brain-was-terrifying-70d2a62246c0?source=post_page---read_next_recirc--11e53b7f1821----1---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Dec 28, 2025
A clap icon 12.4K A response icon 471
In
Women in Technology
by
Alina Kovtun✨
[

#### Stop Memorizing Design Patterns: Use This Decision Tree Instead

##### Choose design patterns based on pain points: apply the right pattern with minimal over-engineering in any OO language.

](<https://medium.com/womenintechnology/stop-memorizing-design-patterns-use-this-decision-tree-instead-e84f22fca9fa?source=post_page---read_next_recirc--11e53b7f1821----2---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Jan 29
A clap icon 7.2K A response icon 71
In
ILLUMINATION
by
Sufyan Maan, M.Eng
[

#### I Woke Up at 4:30 AM Every Day for 30 Days — Here Is What Nobody Tells You

##### Here is what actually happened, from someone who did it & tracked everything.

](<https://medium.com/illumination/i-woke-up-at-4-30-am-every-day-for-30-days-here-is-what-nobody-tells-you-054bf0160903?source=post_page---read_next_recirc--11e53b7f1821----3---------------------ce9d635f_9b87_44be_b469_5c8fa1622a92-------------->)
Mar 7
A clap icon 5.9K A response icon 272
See more recommendations
Help
Status
About
Careers
Press
Blog
Privacy
Rules
Terms
Text to speech
