---
id_fonte: "9c620bdf-983e-40b5-860f-18920c3b4ec4"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Introducing WebContainers: Run Node.js natively in your browser - StackBlitz Blog"
tipo: "unknown"
url_original: "https://blog.stackblitz.com/posts/introducing-webcontainers/"
keywords: "('WebContainers', 'Node.js runtime', 'Browser-based development', 'Security sandboxing', 'StackBlitz API')"
summary: "StackBlitz introduces **WebContainers**, a groundbreaking technology that allows **Node.js environments to run natively inside a web browser** rather than on remote servers. By leveraging **WebAssembly and browser security sandboxes**, this platform creates a development experience that is **faster, more secure, and accessible offline** compared to traditional local setups. The text details how this innovation enables **instant booting of fullstack projects**, seamless debugging via Chrome DevTools, and direct local filesystem access, effectively **eliminating the need for local installations** of dev tools. Ultimately, the source positions WebContainers as a transformative shift toward a **browser-based future for software engineering** that simplifies collaboration and protects against supply chain vulnerabilities."
extraido_em: "2026-06-30T16:20:22Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Introducing WebContainers: Run Node.js natively in your browser - StackBlitz Blog

Introducing WebContainers: Run Node.js natively in your browser
Blog
\* News
\* Engineering
\* Community Updates
\* All Posts
Sign in Get started
News & Announcements May 20, 2021

### Introducing WebContainers: Run Node.js natively in your browser

Eric Simons CEO
\*
Update: Since the publication of this blog post in May 2021, WebContainers became stable and available on Firefox. Most importantly, **we released the WebContainers API** for you all to enjoy! You can even self-host the API with StackBlitz Enterprise. Get in touch to learn more.
A few years ago we realized that the web was heading towards a key inflection point. The advent of WebAssembly and new capabilities APIs made it seem possible to write a WebAssembly-based operating system powerful enough to run Node.js, entirely inside your browser. We envisioned a superior development environment that was **faster** , **more secure** and **consistent** than local environments, to enable seamless code collaboration without ever having to set up a local environment.
This sounded far-fetched. But if the web now runs full environments for graphic designers, video editors, and rich document editing, we wondered: **is it finally possible for developers to use the web to build the web?**
We decided to give it a shot. We hoped for the best, and expected the worst. Two years later (time flies 😅), the result has shaped up to be unexpectedly phenomenal.

##### Today we're excited to announce **WebContainers** .

WebContainers allow you to create fullstack Node.js environments that boot in milliseconds and are immediately online & link shareable—in just one click. The environment loads with VS Code's powerful editing experience, a full terminal, npm and more. It also runs *entirely inside your browser* , which yields some key benefits:
\* **Faster than your local environment** . Builds complete up to 20% faster and package installs complete >= 5x faster than yarn/npm.
\* **Node.js debugging in-browser** . Seamless integration with Chrome DevTools enables native back-end debugging, no installs or extensions required.
\* **Secure by default** . All code execution happens *inside* the browser's security sandbox, not on remote VMs or local binaries.
“That's right: the Node.js runtime itself is running natively, inside the browser, for the first time ever.”
**Again, these environments are not running on remote servers** . Instead, each environment is completely contained within your web browser. That's right: the Node.js runtime itself is running natively, inside the browser, for the first time ever.
You can try it out for yourself over at StackBlitz.com or by clicking one of the starter projects below.
Boot a Node.js project in your browser in milliseconds (don't blink!):
\* Next.js
\* GraphQL
\* HTTP Server
\* Node.js Starter
As of today's launch, WebContainers are now in **public beta** . Current support includes Next.js, GraphQL, and Vanilla Node.js and we're working with additional open source projects to expand support. (If you want to work with us check out our repo).

#### Why?

Setting up local environments is a huge buzzkill—especially if you want to rapidly prototype a cool idea, try out a new open source library, create a bug reproduction or collaborate with a coworker (“hey, can you check out this branch locally really quick?” 😒). This problem is more common than ever as web development moves towards fullstack SSR and SSG toolchains like Next.js.
Running user-submitted code for bug reproductions is also becoming a major security risk for open source maintainers and Fortune 100 companies alike, and these types of supply chain attacks are on the rise.
StackBlitz solves these problems by leveraging the decades of speed and security innovations built into your browser. All computation in StackBlitz happens instantly within the browser security sandbox and cannot break out to your local machine. This model also unlocks some key development & debugging benefits (more on these in a sec).

###### What about Code Spaces/Sandbox/Repls/…?

Legacy online IDEs run your entire dev environment on a remote server and stream the results back across the internet to your browser. The problem with this approach is that it yields few security benefits and provides a worse experience than your local machine in nearly every way: it takes minutes to spin up containers, is prone to network latency, cannot work offline, often results in network timeouts, debugging frozen/broken containers is nearly impossible, and hitting refresh just reconnects you to the broken container again.
StackBlitz is the first online IDE whose compute model makes sense to me.
Tom Preston-Werner founder of GitHub & investor in StackBlitz

#### Unleashing the power of your browser.

##### Seamless Node.js debugging with Chrome DevTools.

It turns out, browsers are really good at debugging Javascript. Shocking, I know ;) By executing Node.js inside the browser, the integration with Chrome DevTools “just works” out of the box. No installs, no extensions, just **native back-end debugging** right in the browser:
Being able to leverage your browser's built in capabilities to develop and debug Next.js applications is a game changer.
We're excited to partner with the StackBlitz team to make Next.js and Vercel more accessible to developers.
Guillermo Rauch founder of Vercel & creator of Next.js

##### Run servers. In your browser.

Yes, actually. WebContainers include a virtualized TCP network stack that's mapped to your browser's ServiceWorker API, enabling you to instantly create live Node.js servers on-demand that continue to work even when you go offline. Because it runs entirely within the browser security sandbox, server responses have *less latency than localhost* (!) and protects your web servers from localhost scraping attacks:

##### Zero footprint. Boots in milliseconds.

Browsers are incredibly fast at executing Javascript and WebAssembly. We leverage this to create an instant development OS that uses no server resources, and doesn't create a node\_modules black hole on your computer.

###### A fresh environment on every page load.

Goodbye, rm -rf node\_modules ! WebContainer's built in npm client is so fast that it runs a fresh install on every page load ensuring you get a clean environment every single time. If something *does* goes wrong with your environment, you can get back to a clean state the same way you do any other web app: hit the refresh button.

##### Zero latency. Works offline.

If the work-from-home pivot has taught us anything, it's that network blips happen—often. ISPs go down—a lot. With StackBlitz you can keep working, without an internet connection, regardless of whether you're on a train, in a plane, or backseat uber-ing in the rain:

##### Secure by default.

With StackBlitz's novel compute model, 100% of code execution occurs in the browser security sandbox. This results in a much faster and *less* restrictive development environment than local while at the same time delivering far *more* security, a very rare combination.
In fact, the default security posture is so solid, that our embedded package manager is the first publicly available tool that solves the long unaddressed npm vulnerability Sam Saccone discovered over five years ago.

#### Let's pause for a sec.

#### Because this is where the story gets really mind bending.

At Google I/O, we were excited to show how StackBlitz is using the latest web capabilities to deliver an experience that blurs web apps and desktop apps.
Dion Almaer Director of Engineering on Google Chrome
What's the difference between a 'web' app and a 'native' app? The Chrome team has been shipping new capabilities APIs to close this gap and the delta is rapidly approaching zero.

##### Desktop grade editing. Instant desktop app install.

Thanks to Chrome's PWA functionality, installing StackBlitz is as simple as a single click. Milliseconds later you have a desktop IDE you can launch from your dock. The keybindings you rely on for daily productivity like CMD + W and CMD + T “just work”. Additionally, just like on local, you have the ability to open & debug your dev servers in a completely separate window.

##### Read and write from your local filesystem.

The Chrome team recently shipped the File System Access API. This gives PWA's the ability to request persistent read and write access to portions of your local file system. Paired with StackBlitz WebContainers, this hints at a potential future without the need for node, npm, git, VS Code or anything else installed on your hard drive. You just need a web browser:
*Trick question: which one of these is StackBlitz, and which one is actually VS Code?* 🙃

#### What's next?

We're spending the next quarter or two in beta as we work with open source maintainers to bring full compatibility to their userbases and stabilize the core WebContainer technology. What's coming after that is a fully-featured StackBlitz v2.
Wouldn't it be great if you could:
\* Open environments (editor + live preview!) on every PR. You can browse, play, test, and thus perform a really solid code review, without closing other projects you're working on.
\* Check out multiple branches at the same time to compare them side by side. (Would you ever consider that for a local environment? In StackBlitz it means just opening a new tab).
\* Update your Docusaurus documentation or Gatsby blog right from the browser.
\* Learn literally any JavaScript front-end or back-end framework without installing a single thing!

###### Develop. Preview. Ship. **♾**

We've also barely started scratching the surface of our partnership with Vercel and Next.js. Get ready for a seamless development experience like you've never seen (get early access here).

#### The future of software development is bright.

Much remains to be done, but we can now confidently say that a future free from local instances of node, npm, git, and VS Code is a tangible possibility, and even enable the world's software to run in places it couldn't before.
Imagine a future where you can run WebContainers at the edge on platforms like Cloudflare Workers, or entire development environments natively on an iPad. How about running your favorite VS Code extensions, or running non-web native languages like Python, Java, or R in the browser via WASI? There are many unknowns still to be uncovered and resolved, but we believe the future opportunities for this technology are enormous.
These things might seem a little crazy. And there are many unknown unknowns. But we think this new future deserves a shot. Because, who knows? It could end up being **unexpectedly phenomenal** .
Thanks for reading! Follow us on Twitter to stay in the loop on all the exciting updates. Our core team is doing live Q&A on Twitter Spaces today and tommorrow (5/20 & 5/21).
If you're curious to learn more about WebContainer and how to get involved, check out the core WebContainer WG repo. You can also learn more about the origin story and deeper technical details on this recent podcast episode.
Thank you to our partners at Vercel & Google, our customers, and the millions of developers who use StackBlitz every month.
Like what you see and want to help us progress this vision for the future of web development? Go to stackblitz.com and help us refine the Next.js beta and provide feedback. Partner with us to bring compatibility to your favorite open source library. Get involved in helping convert the world's native binaries to WebAssembly. Come join the StackBlitz team. Or, just tell your friends about the fastest, most secure & consistent web development environment that runs natively in the browser!
Finally, all my thanks and gratitude goes to the amazing team at StackBlitz who are working tirelessly to make this project a reality ❤ Let's go!
Tags:
\* Javascript Ecosystem
\* Next.js
\* StackBlitz
\* WebContainers
Eric Simons
CEO at StackBlitz making web development fast & secure. Viva la Web!

###### More posts by Eric

View all
News News & Announcements
Unbundling the JavaScript ecosystem
We're excited to welcome VoidZero. Their work in Rolldown, Oxc, and Vite will have a profound effect on the Web ecosystem.
News News & Announcements
Get ready for ViteConf 2024
Join us for ViteConf's third edition!
Tools & Services
What is Vite (and why is it so popular)?
At StackBlitz, we're not shy about how much we love Vite. Here's what you need to know about the next-generation Javascript build tool.

###### Related Posts

View all from News
Cloudflare is now backing pkg.pr.new's data infrastructure!
We are thrilled to announce that Cloudflare is backing pkg.pr.new's data infrastructure, enabling us to sustainably scale preview package releases for the open source community and onboard even more projects.
Amir Hossein Sakhravi
Bolt 100K Open Source Fund
We're doubling down on our support to Open Source in 2025 with a 100K fund targeted at web infrastructure and Bolt dependencies.
Matias Capeletto
ViteConf 2024 was a blast
The third edition of ViteConf was another incredible community party. ViteConf 24 showed how much the Vite Ecosystem keeps growing and evolving.
Matias Capeletto
StackBlitz is joining the Open Source Pledge
We're excited to announce that StackBlitz is joining the Open Source Pledge, a commitment to support Open Source projects and the developers who maintain them.
Matias Capeletto

###### Explore more from StackBlitz

Join the Community Get a hand, lend a hand, share your projects and be part of our growing community of developers. Join the Discord
Enterprise Server The power of StackBlitz behind your firewall. Contact Sales
Documentation Learn StackBlitz in-depth, integrate into your workflows, and build your own apps on top of WebContainer. Browse the docs
Work with us! Help make the world's software faster and more secure. Check out open positions

#### Subscribe to StackBlitz Updates

A newsletter from StackBlitz covering engineering achievements, product features, and updates from the community.
Subscribe

#### Using StackBlitz at work?

Create in-browser preview apps for every issue or pull request, share private templates with your org, manage your design system with zero overhead, and more.
Try StackBlitz Teams
Products
\* Codeflow
\* Enterprise Server
\* WebContainer API
\* Web Publisher
Platform
\* Pricing
Support
\* Community
\* Docs
Company
\* Blog
\* Careers
\* Newsletter
© 2025 StackBlitz Inc.
Terms of Service
Privacy Policy
StackBlitz Codeflow and the Infinite Pull Request logo are trademarks of StackBlitz Inc.
