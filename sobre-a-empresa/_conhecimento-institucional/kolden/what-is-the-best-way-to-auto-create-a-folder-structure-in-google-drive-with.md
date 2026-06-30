---
id_fonte: "cd9b2c41-800e-4786-8f70-f74d5658a488"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n? : r/gsuite - Reddit"
tipo: "unknown"
url_original: "https://www.reddit.com/r/gsuite/comments/1j0fms9/what_is_the_best_way_to_auto_create_a_folder/"
keywords: "('Automated folder creation', 'Google Drive templates', 'Google Apps Script', 'Project management workflow', 'Workspace automation tools')"
summary: "This Reddit discussion explores efficient methods for **automating complex folder hierarchies** and document creation within Google Drive using tools like **n8n, Airtable, and Google Apps Script**. The original poster outlines a need for a system that can generate specific subfolders and **templated files** tailored to different project types, such as copywriting or creative direction, across both professional and personal accounts. Community members suggest several technical solutions, ranging from a \"quick hack\" involving **unzipping pre-structured archives** to more robust, code-based approaches using **domain-wide delegation** or form submissions. Ultimately, the text serves as a collaborative troubleshooting guide for users looking to replace manual file organization with **programmatic workflows** that maintain consistency and save time."
extraido_em: "2026-06-30T16:16:55Z"
extraido_por: "notebooklm-py-0.7.3"
---

# What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n? : r/gsuite - Reddit

What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n? : r/gsuite
Skip to main content What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n? : r/gsuite
Open menu
Open navigation
Go to Reddit Home
r/gsuite
TRENDING TODAY
Get App
Get the Reddit app
Log In
Log in to Reddit
Expand user menu
Open settings menu
Skip to Navigation Skip to Right Sidebar
Back
Go to gsuite
r/gsuite
• 1y ago
TheChristmas
Locked post
Stickied post
Archived post
\* Language and translations
\* View post in other languages
\* Report

### What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n?

What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? It would be great to be able to do this with two google drive accounts depending on the project.
Example 1: I have a new copywriting project called "tagline" for bug that's part of their 2025003 invoice.
\* I \_\_\_\_\_\_\_\_\_\_ and in my work google account's google drive folder structure under “projects>2025>bug>2025003 folder” a folder called "2025 • tagline" with the subfolders "resources" "research" "working" and "final"
\* Inside “research” is a google doc created from a saved template called "2025003 • bug • tagline research + ideas”
\* Inside "working" is a google doc created from a saved template called "2025003 • bug • tagline" and a folder called "x • archive • x"
\* Inside “final” is a folder called “master” and “shared”
Example 2: I have a new creative direction project called “warm goo” for Cher that's part of their 2025017 invoice.
\* I \_\_\_\_\_\_\_\_\_\_ and in my work google account's google drive folder structure under “projects>2025>cher>2025017” folder a folder called "2025 • warm goo” with the subfolders "resources" "research" "working" and "final"
\* Inside “research” is a google doc created from a saved template called "2025017 • cher • warm goo research + ideas”
\* Inside "working" are folders called “preso” “design” and “copy”
\* Inside “working>preso” is a google slides created from a saved template called "2025017 • cher • warm goo preso • v1” and a folder called "x • archive • x"
\* Inside “working>design” is are folders called “comps” “images” and “ai”
\* Inside “working>copy” is a google doc created from a saved template called "2025017 • cher • warm goo copy”
\* Inside “final” is a folder called “master” and “shared”
Example 3: I have a new personal passion project called “black velvet video”
\* I \_\_\_\_\_\_\_\_\_\_ and in my personal google account's google drive folder structure under “passion projects>2025>videos” folder a folder called “black velvet” with the subfolders "resources" "working" and "final"
\* Inside “resources” are folders called “video” “images” “audio” and “script”
\* Inside “story” is a google doc created from a saved template called “black velvet • script”
\* Inside “working” are folders called “premiere” and “after effects” and “audio”
Example 3 is tricky because personal drive accounts can't save templates. So I'd have to make a copy a document that's saved as a template and have it renamed and moved to the appropriate folder, right?
I'm starting to wonder if I'm playing with square holes and round pegs here haha.
Read more
1
· 7

### Comments Section

chartupdate
•
1y ago
Believe it or not the quick hack is to create your structure of folders and template files in Drive and then download them in bulk. Drive will create a zip with everything in it.
Then when the time comes, unzip this archive into its new home in Drive (or a Shared Drive,). Voila, one new copy of everything in the structure you desire.
The only downside is that any Google docs in the original get turned into their physical office format selves. But you can always convert back afterwards.
2
fizicks
•
1y ago
Apps scripts for sure
2
techead87
•
1y ago
This sounds like something GAM could do. Test in a Dev environment first. Make sure that GAM has domain wide delegation.
1
TheChristmas
OP
• 1y ago
Diving in!
1
Squiggy\_Pusterdump
•
1y ago
Apps scripts via form submissions.
I enjoy these types of challenges. This is how I would structure the workflow based on my understanding of what you're trying to do. This automates things pretty thoroughly and you may need to be a little more flexible, but here's a preliminary workflow proposal to give you an idea of how it would cascade after the form submission or sheet “database”.
You can then add to this and before you know it you'll be responsible for a “software system” that the company runs on and nobody understands! /s
Just a note, these should be created in a shared drive where possible so no 'one user' owns the contents. It should be owned by the org, with permissions to the relevant users through google group memberships.

```
Google Sheets Sidebar:
  - Select Project Type (Dropdown)
  - Open Corresponding Google Form
  - View Previous Projects (Dynamic List)

      |
      v

User Submits Form (Google Forms)
      |
      v

Form Response Logged (Google Sheets)
      |
      v

Apps Script Trigger (on Form)
- Fetches Project Details
      |
      v

Determine Drive Account Permissions:
- Work: Uses Shared Google Drive with inherited group permissions
      |
      v

Create Project Folder Structure
      |
      v

Create Subfolders Based on Project Type:
- Research
- Working
- Final
      |
      v

Copy Templates to Correct Folders
- Rename Files Dynamically
      |
      v

Apply Google Drive Permissions:
- Work Projects: Add Google Group (Incl. External Users)
- Personal Projects: Notify Owner for Manual Share
      |
      v

Notify Users of Folder Creation via Email
```

1
TheChristmas
OP
• 1y ago
That makes so much sense!! Thank you!!!
2
Continue this thread

### Related Answers Section

Related Answers
Tips for organizing files in Google Drive
Practices for managing Google Workspace users
Enhancing security in Google Workspace
How to automate tasks with Google Apps Script
Integrate Google Workspace with other apps
New to Reddit?
Create your account and connect with a world of communities.
Continue with Email
Continue With Phone Number
By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.

### More posts you may like

```
*  Give me your best Google Drive folder structure and organization tips? My media is a mess! r/Genealogy • 10mo ago [
```

##### Give me your best Google Drive folder structure and organization tips? My media is a mess!

](<https://www.reddit.com/r/Genealogy/comments/1kxai7l/give_me_your_best_google_drive_folder_structure/>) 13 upvotes · 19 comments
\* Google Docs quietly removed custom templates from the “File > New” menu r/googledocs • 10mo ago [

##### Google Docs quietly removed custom templates from the “File > New” menu

](<https://www.reddit.com/r/googledocs/comments/1lah1i3/google_docs_quietly_removed_custom_templates_from/>) 15 upvotes · 8 comments
\* Google Docs Folders — I Think This Should Become a Thing! r/googledocs • 6mo ago [

##### Google Docs Folders — I Think This Should Become a Thing!

](<https://www.reddit.com/r/googledocs/comments/1o1up93/google_docs_folders_i_think_this_should_become_a/>) 9 upvotes · 17 comments
\* Must be a better way to organize files into folders in google drive. r/googledocs • 5mo ago [

##### Must be a better way to organize files into folders in google drive.

](<https://www.reddit.com/r/googledocs/comments/1ottde8/must_be_a_better_way_to_organize_files_into/>) 3 upvotes · 8 comments
\* All new version of Google Drive for Desktop? r/macsysadmin • 10mo ago [

##### All new version of Google Drive for Desktop?

](<https://www.reddit.com/r/macsysadmin/comments/1kqr7qz/all_new_version_of_google_drive_for_desktop/>) 2 8 upvotes · 6 comments
\* Why is copying a Google Drive folder still such a nightmare in 2025? Anyone figured out a clean workaround (without paid extensions)? r/gsuite • 1y ago [

##### Why is copying a Google Drive folder still such a nightmare in 2025? Anyone figured out a clean workaround (without paid extensions)?

](<https://www.reddit.com/r/gsuite/comments/1ke0yrd/why_is_copying_a_google_drive_folder_still_such_a/>) 28 upvotes · 29 comments
\* Google Docs lacking table styles is extremely inefficient r/googledocs • 5mo ago [

##### Google Docs lacking table styles is extremely inefficient

](<https://www.reddit.com/r/googledocs/comments/1okpmvq/google_docs_lacking_table_styles_is_extremely/>) 6 upvotes · 6 comments
\* Best Practices for Organizational Folder Structure (Shared Drives) for a Non-profit r/gsuite • 10mo ago [

##### Best Practices for Organizational Folder Structure (Shared Drives) for a Non-profit

](<https://www.reddit.com/r/gsuite/comments/1l2m0sq/best_practices_for_organizational_folder/>) 5 upvotes · 11 comments
\* How to structure a companies Google drive? r/gsuite • 8mo ago [

##### How to structure a companies Google drive?

](<https://www.reddit.com/r/gsuite/comments/1mbckcd/how_to_structure_a_companies_google_drive/>) 9 upvotes · 6 comments
\* La Suite numérique - Google drive, meet and docs (and more...) alternative from France! r/BuyFromEU • 1y ago [

##### La Suite numérique - Google drive, meet and docs (and more...) alternative from France!

](<https://www.reddit.com/r/BuyFromEU/comments/1kn159j/la_suite_num%C3%A9rique_google_drive_meet_and_docs_and/>) 69 upvotes · 6 comments
\* Replace words in multiple docs r/MicrosoftWord • 1mo ago [

##### Replace words in multiple docs

](<https://www.reddit.com/r/MicrosoftWord/comments/1r40ccn/replace_words_in_multiple_docs/>) 6 upvotes · 10 comments
\* Google Drive is Ready!!! r/LoveCymatics • 11d ago [

##### Google Drive is Ready!!!

](<https://www.reddit.com/r/LoveCymatics/comments/1ry26rt/google_drive_is_ready/>) 23 upvotes · 5 comments
\* Google drive integration? r/Bazzite • 1y ago [

##### Google drive integration?

](<https://www.reddit.com/r/Bazzite/comments/1kmm9ro/google_drive_integration/>) 13 upvotes · 17 comments
\* Can I get banned from Google Drive? r/pirataria • 1y ago [

##### Can I get banned from Google Drive?

](<https://www.reddit.com/r/pirataria/comments/1k2f0v8/posso_ser_banido_do_google_drive/>) 53 upvotes · 59 comments
\* Google Docs for tasks and note taking r/googledocs • 7mo ago [

##### Google Docs for tasks and note taking

](<https://www.reddit.com/r/googledocs/comments/1mw0j97/google_docs_for_tasks_and_note_taking/>) 6 upvotes · 5 comments
\* Can't find the way to add document tabs to a Google doc on mobile app r/googledocs • 1y ago [

##### Can't find the way to add document tabs to a Google doc on mobile app

](<https://www.reddit.com/r/googledocs/comments/1k0ka3s/cant_find_the_way_to_add_document_tabs_to_a/>) 17 upvotes · 15 comments
\* Shared files within a folder in a shared drive. How to limit certain access. r/gsuite • 7mo ago [

##### Shared files within a folder in a shared drive. How to limit certain access.

](<https://www.reddit.com/r/gsuite/comments/1mv1czf/shared_files_within_a_folder_in_a_shared_drive/>) 5 upvotes · 7 comments
\* I figured out why new File Explorer is garbage r/ShittySysadmin • 8mo ago [

##### I figured out why new File Explorer is garbage

](<https://www.reddit.com/r/ShittySysadmin/comments/1m6flzq/i_figured_out_why_new_file_explorer_is_garbage/>) 294 upvotes · 78 comments
\* Assets Google Drive (for the team builder community) r/TeamBuilder25 • 5mo ago [

##### Assets Google Drive (for the team builder community)

](<https://www.reddit.com/r/TeamBuilder25/comments/1odit8r/assets_google_drive_for_the_team_builder_community/>) 9 195 upvotes · 36 comments
\* Google Drive's doc scanner is wild 🤯 r/aiecosystem • 7d ago [

##### Google Drive's doc scanner is wild 🤯

](<https://www.reddit.com/r/aiecosystem/comments/1s1n5rq/google_drives_doc_scanner_is_wild/>) 0:20 274 upvotes · 37 comments
\* Alternatives for Google Drive r/ObsidianMD • 3mo ago [

##### Alternatives for Google Drive

](<https://www.reddit.com/r/ObsidianMD/comments/1pt0j4o/alternatives_for_google_drive/>) 21 upvotes · 51 comments
\* Building a tool for myself for Cross device files sharing (iphone to android to PC) r/ProgrammingBondha • 11d ago [

##### Building a tool for myself for Cross device files sharing (iphone to android to PC)

](<https://www.reddit.com/r/ProgrammingBondha/comments/1ryoem5/building_a_tool_for_myself_for_cross_device_files/>) 0:50 54 upvotes · 17 comments
\* Airtable alternative for spreadsheet/database usage for a single user? r/Airtable • 2mo ago [

##### Airtable alternative for spreadsheet/database usage for a single user?

](<https://www.reddit.com/r/Airtable/comments/1qvc7xd/airtable_alternative_for_spreadsheetdatabase/>) 6 upvotes · 38 comments
\* What Are Good Alternatives to Airtable for Personal Projects? r/Airtable • 18d ago [

##### What Are Good Alternatives to Airtable for Personal Projects?

](<https://www.reddit.com/r/Airtable/comments/1rrpqu4/what_are_good_alternatives_to_airtable_for/>) 30 upvotes · 50 comments
\* Google Drive r/badUIbattles • 4mo ago [

##### Google Drive

](<https://www.reddit.com/r/badUIbattles/comments/1pd60zi/google_drive/>) 0:04 228 upvotes · 8 comments

### Community Info Section

r/gsuite
Join
Google Workspace (G Suite)
To discuss mostly Google Workspace (G Suite) administration related topics, but also from the end user perspective.
Show more
Public
Anyone can view, post, and comment to this community

#### Top Posts

```
*  Reddit reReddit: Top posts of February 28, 2025
*  Reddit reReddit: Top posts of February 2025
*  Reddit reReddit: Top posts of 2025
```

Reddit Rules Privacy Policy User Agreement Your Privacy Choices Accessibility Reddit, Inc. © 2026. All rights reserved.
Expand Navigation
Expand Navigation
Collapse Navigation
Collapse Navigation
0cAFcWeA726PzIrnijTCvt2tN9Ziw8ORqgiLf\_BcGHenrXIXgRKYwO4iw3D3uLOIu6z\_aDeM5lLfMYqsM4lfC7bqJtnZrSk-IPTPlCScB1oLwxUmukXZ4\_42lmEtG-fOJjVS3482XJsfMDM1vCBQC0PzRKmMu9pqqwahNDL6fOVixGcq2MjJuuzy6sENIeHDvUKQAt-0FbURE\_4jOkMLHnARieRfF1j4euDesHm5n-7zjtSGbyQtZrqLr7V32\_9LSMe1HEWsRzDa1F-N6CWaKGBE4alEJFumL3tKc9Si8J6ti046TAV57AHAaDaKU-MNHct2OWvGsOgoPNaml9N418khakUo7VilcVDDkbOI\_cL3RcSbgpFUiCLzMag-MRuQha-Zn6ccLd5Gj\_akqFhddmXrV\_KXvri-CZOgnd8\_Qm8ZXTydX2e6GFkSMw35v2ypFao\_\_NvprQ5CSJyqPj6ygywXuWKc-idHlw5vJCgAMGXawoyZHH7CTGkHH10cwZ0vgM7PjV8CbcEyjxl\_fxy9ZZY2OyL7XbmUXaFBQqXe0iZ1dSBAa8kmnW46mIkzJIQVacr2qi8BSXwlKsdF40LyxQa0fc58WgB7AUXPckJBmtR8ebj7guzokQNsF0MEIbXG-\_7eR7EY17OjUE7QKaJEdxbDyyGv9OV7hTx\_0l6NgqLoKl-ZlayRWmZpKG06f6ZovbOh6sv6Za-cJWIVuk395xv5ea6-3hVywYzNAo5fdSaV5XBbzfAYOTvacuZkg5AWAIEu-Onf3jRLd4Z7dGDiAfFWyIg5IkYIWOrhJ3g\_xEcT8B4vO5GdSqxQpHgA4oxSzJ84-wcbjyapQNGTTY\_6iHHeRyVC87XlMGay9mpQDS0Q7lAs2USSwnAB\_skK3sM0cLh2ov0GGtBWq1x-z5kxSM0Z0l8gLxEpkrCpyVCCB3fnUbtrGEJnnRVrdrsdtEezd8Jax6ubMdN9ziJ\_rrvt-cnalSKNXzV7YnltYh0CmXbUbuCM9ceDOmEPLiSU25V0hE6Y-fd8ANE9ckcCd\_81wZf4pFM1Pg1yIwtqbPJV0xz6vrGBoq2LMfkT7kzPhfP1TtqyYt\_rbs40KIIpChKdzauf0f620rsUAyO4H2PgA4tX3gm8Bj7\_YAOv1FCKfVagLeFrx4ch0ZdGB6289oM2t8Xx7GFn7swEFsUhzH2e6ymfR7RTuqP1cZderFQXj3KYN4r1oHDvMsEHDkmV778gFO4iRjmd5b6yCFCi76nc5sbmNR\_4EEy7ka4C4IBjvHAy7yEGZIaUM2wUm-Yp7SLZZyhGCsb\_jX69mZvyxqBRGQc7Cjs9jQTtDXVIn7u3aeqbe-KrmlkA06kkHz6SH4-j1jMXcMs\_Ir6s2YwuV\_P1VcCBqibwVLW0p8tl-Zi02AgGdg\_yH30xyAqoDcFs1kgZOYKERx2QraiTaKjO8PsK-YgPPWEHcnjxAiUIfDvuXtzG\_rektRzDiOlZerL21ETLAzdDt7is76dI9moeCCWc-vnnrH8zmNsP2XvVPZkT-RuO\_MrBWYAvbBeLqlhG2BkRemd-ZXJoaNauPsA7A40tL95VhrrTuSXu2SfEi89FsxTl75a48XxGmkDa-6H3F78oTD-9KvWuy5M8Z1VItYz89FoUCWj75zvdoBSMnXE4Zq18Las-CivBlwUYrMvEsemCoGWnS6LhUfTUpcMvUVhG7PYZm9dVbxGzV70ZB43WCbBOcCpArz7z-6nUff77G4JZgsvYpMXhGbwQi5lEHZ6Ao3bvD9\_I3kzs6c2wHS2mW\_glhfpyZS4Hh3SGIXmKDOpS0VdaFLSwHcK5wxlmeKXOj7bz6nUIXO7TuMFECHmixC5CULj6YQ\_M32E9KWxZP8mpk8JG\_mdBTiA9G1KPF9IzAwIScUpFYGb18j4UnTXUamV13ONo-Y9Xkj3SipwZ8FiTibCQRL3sfXcrGX9xdpP0uWytZo2WG-lzQzwIfk\_VhkhrQvU7oyfWfa27I8DTRIqyMerzo0TrML0yRTUXtWsK-C4si4T0E\_1Rql\_iYcYjJy1eZopxjXxTNdFFGkwnKPMGOt-G8s53ikLi-bpTxS5jG8FGlhFDloTX1UjgGorCXv59qQ2tSxzpmeaB8djMv-ZwmriAD3prgbz0JKP6oQmnICnazOStGWAeT2hINWqCSkvGOD79-r7f6N1Oyfrkxdo0qekYUsGqcIu93gCw
