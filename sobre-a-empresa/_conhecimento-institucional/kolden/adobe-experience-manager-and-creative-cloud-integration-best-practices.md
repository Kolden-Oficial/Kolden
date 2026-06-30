---
id_fonte: "9745f3ad-2565-4537-a0ee-b06b8032c093"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "Adobe Experience Manager and Creative Cloud integration best practices"
tipo: "unknown"
url_original: "https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/assets/manage/aem-cc-integration-best-practices"
keywords: "('Digital Asset Management', 'Creative Cloud Integration', 'Adobe Asset Link', 'Asset Lifecycle Management', 'Collaborative Workflows')"
summary: "This documentation serves as a comprehensive guide for **integrating Adobe Experience Manager (AEM) Assets with Creative Cloud** to optimize the workflow between designers and marketing teams. The text prioritizes two primary tools: **Adobe Asset Link**, which allows creatives to manage DAM assets directly within Photoshop or InDesign, and the **Experience Manager desktop app**, which provides a local network share for various file types. By defining specific **asset lifecycles**, the source advises users to only store **creative-ready or final assets** in the DAM to maintain system performance and a clean version history. Ultimately, these **best practices** aim to streamline collaboration by reducing manual uploads and ensuring that **work-in-progress tasks** are handled efficiently before being shared with the broader organization."
extraido_em: "2026-06-30T16:10:43Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Adobe Experience Manager and Creative Cloud integration best practices

Best practices to integrate with Adobe Creative Cloud | Adobe Experience Manager
Experience League
\* Learn
\* Featured Products
\* Analytics
\* Campaign
\* Commerce
\* Customer Journey Analytics
\* Data Collection
\* Experience Manager
\* Experience Platform
\* GenStudio for Performance Marketing
\* Journey Optimizer
\* Journey Optimizer B2B Edition
\* Marketo Engage
\* Real-Time CDP
\* Target
\* Workfront
\* Resources
\* Courses Skill-building courses with sharable completion certificates
\* Playlists Expertly curated collections of videos
\* Tutorials Solution-specific videos and how-tos
\* Perspectives Actionable insights from Experience Cloud customers and Adobe experts
\* Certification Proven expertise of Adobe marketing solutions
\* Instructor-led training Live & on-demand courses led by Adobe-certified instructors
\* Browse all content
\* Documentation
\* Events
\* Community
\* Quick Links
\* Community home
\* Community Pulse Blog Announcements, trends, and stories from the community
\* Community resources Guides and tips to get started
\* AMAs Live "Ask me anything" sessions with experts
\* Discussion groups Network online and in person by role, topic, or interest
\* Adobe User Groups Join global peer-led meetups
\* Skill Exchange Events to share best practices and connect with peers
\* Advocate programs Opportunities to lead, advise, and inspire
\* Experience Maker Awards Discover and celebrate innovators transforming digital experiences
\* Adobe Feedback Program Influence Adobe product development
\* Communities By Product
\* Analytics
\* Campaign
\* Experience Manager
\* Experience Platform
\* Journey Optimizer
\* Marketo Engage
\* Target
\* Real-Time CDP
\* Workfront
\* Creative Cloud
\* Document Cloud
\* Support
\* Search
\* Change Region
\* Deutsch
\* English
\* Español
\* Français
\* Italiano
\* Nederlands
\* Português
\* Svenska
\* 中文 (简体)
\* 中文 (繁體)
\* 日本語
\* 한국어
Documentation
\* All
\* Certification
\* Community
\* Courses
\* Documentation
\* Events
\* Perspectives
\* Playlists
\* Troubleshooting
\* Tutorials
Deutsch English Español Français Italiano Nederlands Português Svenska 中文 (简体) 中文 (繁體) 日本語 한국어
Sign in
My learning profile Bookmarked content Sign out
Adobe Experience Cloud Adobe Document Cloud
Documentation AEM as a Cloud Service User Guide
AEM Assets

### Adobe Experience Manager and Creative Cloud integration best practices

Last update: March 8, 2026
Bookmark Sign-in to bookmark Copy link Copy link URL
\* Applies to:
\* Experience Manager as a Cloud Service
\* Topics:
\* Collaboration
\* Adobe Asset Link
\* Desktop App
CREATED FOR:
\* User
\* Developer
\* Admin
| Version | Article link |
| ------ | ------ |
| AEM 6.5 | Click here |
| AEM as a Cloud Service | This article |

Adobe Experience Manager Assets is a digital asset management (DAM) solution that can integrate with Adobe Creative Cloud to help DAM users work together with creative teams, streamlining collaboration in the content creation process.
Adobe Creative Cloud provides creative teams with an ecosystem of solutions and services to help them to create digital assets. It includes desktop and mobile applications, cloud services like storage with desktop sync or web experience, and marketplaces like Adobe Stock.
Read on to know what integrations to pick between desktop and the enterprise-grade DAM based on your use case and what are the associated best practices for the connecting workflows.
NOTE
Experience Manager to Creative Cloud folder sharing is now deprecated and no longer covered below. Adobe recommend newer capabilities like Adobe Asset Link or Experience Manager desktop app to provide creative users with access to the assets managed in Experience Manager.

#### Collaboration need of creatives, marketers, and DAM users

Requirements
Use case
Involved surfaces
Simplify experience for creatives on desktop
Streamline access to asset from a DAM (Assets) for creative professionals, or more broadly, users on desktop working in native asset creation applications. They need an easy and straightforward way to discover, use (open), edit and save changes to Experience Manager, and upload new files.
Win or Mac desktop; Creative Cloud apps
Provide high-quality, ready-to-use assets from Adobe Stock
Marketers help accelerate the content creation process by assisting with asset sourcing and discovery. Creative professionals use the approved assets right from within their creative tools.
Assets; Adobe Stock marketplace; metadata fields
Distribute and share assets by organizations
Internal departments/local branches and external partners, distributors, and agencies use the approved assets shared by the parent organization. The organization wants to securely and seamlessly share the created assets for wider reuse.
Brand Portal, Asset Share Commons
Generate predefined variations of uploaded assets automatically
Automatically process assets using Adobe's unique media handling and transformation technology for predefined actions. Create custom logic to define your own actions using APIs and asset microservices.
Assets user interface

#### Adobe offerings to support the collaboration need

Value proposition for the involved personas
Adobe offering
Involved surfaces
Creative users discover assets from Experience Manager, open and use them, edit and upload changes to Experience Manager, and upload new files into Experience Manager, without leaving their Creative Cloud app.
Adobe Asset Link
Photoshop, Illustrator,and InDesign.
Business users simplify opening and using assets, editing and uploading changes to Experience Manager, and uploading new files into Experience Manager from the desktop environment. They use a generic integration to open any asset type in the native desktop application, including non-Adobe ones.
Experience Manager desktop app
Experience Manager desktop app on Win and Mac desktop
Marketers and business users discover, preview, license and save, and manage the Adobe Stock assets from within Experience Manager. Licensed and saved assets provide select Adobe Stock metadata for better governance.
Experience Manager and Adobe Stock integration
Experience Manager web interface
Improve collaboration between digital product designers and marketers. Let designers use the digital assets in design and wireframe models on Adobe XD canvas.
Adobe Asset Link for Adobe XD
Adobe XD
Marketers can automatically create variations and derivatives based on uploaded assets and predefined actions created using customization. Use this automation to improve content velocity and reduce manual effort.
Content automation
Experience Manager Assets web interface
This article focuses primarily on the first two aspects of the collaboration needs. Distribution and sourcing of assets at scale is briefly mentioned as a use case. For such needs solutions, consider Adobe Brand Portal or Asset Share Commons. Alternate solutions such as Experience Manager Assets Brand Portal, solutions that can be built based on Asset Share Commons components, Link Share, using Experience Manager Assets web UI should be reviewed based on specific requirement.
Deciding on which capability to use

##### Mapping of use cases and Adobe solutions

| Use case | Adobe Asset Link | Experience Manager desktop app | Remarks or alternate methods |
| --- | --- | --- | --- |
| Discover - browse folders | Yes | Experience Manager Web UI + desktop actions | When browsing the network share, turn off the thumbnails to avoid downloading binary files of assets. |
| Discover - access collections | Yes | Experience Manager Web UI + desktop actions |  |
| Discover - search for assets | Yes | Experience Manager Web UI + desktop actions |  |
| Use - open asset | Yes | Yes - for any app | Open from Web interface or from Finder |
| Use - place asset from Experience Manager into a document | Yes - embedding | Yes - linking or embedding | Experience Manager desktop app gives access to assets as files on the local file system. These links in the native apps are represented by local paths. |
| Edit - open for editing | Yes - Check-out action | Yes - Open action (in the network share) | Check-out in AAL saves the asset to user's creative cloud storage account (synchronized by Creative Cloud app) by default. |
| Edit - work in progress outside Experience Manager | Yes - Asset available in user's Creative Cloud storage account synced to desktop. | Yes |  |
| Edit - upload changes | Yes - Check-in action with optional comment | Yes |  |
| Upload - single file | Yes - uploads current active document | Yes | Upload via web interface |
| Upload - multiple files / hierarchical folder structures | No | Yes | Upload via web interface; Custom scripting or tool |
| Misc - user and login | Creative Cloud user logged into Creative Cloud desktop app gets recognized (SSO) | Experience Manager user / login | Users of both solutions count against the Experience Manager user quota. |
| Misc - network and access | Requires access from user's desktop to Experience Manager deployment over network | Requires access from user's desktop to Experience Manager deployment over network | Adobe Asset Link does not share network proxy environment. |

To support asset distribution use cases, consider the following options:
\* Experience Manager Assets Brand Portal for a configurable add-on to Assets to publish assets.
\* Custom solutions are created based on Asset Share Commons code base.
\* Experience Manager link share to share assets on demand using links.
\* Assets web interface with areas for external parties secured by Experience Manager Access Control setup and with necessary IT / network configuration adjustments, giving these external users access to Experience Manager.

#### Key concepts and use cases

##### Glossary of common terms

```
*   **Work-in-progress or creative work-in-progress (WIP):**  A phase in asset lifecycle where an asset undergoes multiple changes and is typically not yet ready to be shared with broader teams.
*   **Creative-ready assets:**  Assets that are ready to be shared with a broader team, or have been selected / approved by the creative team for sharing with marketing or LOB teams.
*   **Asset approvals:**  The approval process that runs for assets already uploaded to DAM, which typically includes brand approvals, legal approvals, and so on.
*   **Final asset:**  An asset that has gone through all approvals/metadata tagging and is ready to be used by the broader team. Such an asset is stored in DAM and made available to all (or all interested) users. It can be used in marketing channels or by creative teams to create designs.
*   **Minor asset update/change :**  A quick and small change to a digital asset. It is often made in response to a retouching or minor editing request, asset review, or approval (for example, reposition, change text size, adjust saturation/brightness, color, and so on).
*   **Major asset update/change :**  A change to a digital asset that requires considerable work, and sometimes must be done over a longer period of time. It typically includes multiple changes. The asset must be saved multiple times while being updated. Major asset updates typically cause the asset to enter a WIP stage.
*   **DAM:**  Digital asset management. In this document, it is synonymous with Experience Manager Assets, unless specifically mentioned otherwise.
*   **Creative user:**  A creative professional, who creates digital assets using Creative Cloud apps and services. In some cases, a creative user may be a member of a creative team who may use Creative Cloud, but does not create digital assets (like a creative director or creative team manager).
*   **DAM user:**  A typical user of a DAM system. Depending on the organization, a DAM user can be a marketing or a non-marketing user, for example, a Line-of-Business (LOB) user, librarian, sales person, and so on.
```

##### Considerations when using Experience Manager and Creative Cloud integration

This is a brief summary of best practices for Experience Manager and Creative Cloud Integration. Read the rest of this document to get the detailed understanding of these.
\* **For creative users, working in Photoshop, InDesign, or Illustrator:** Adobe Asset Link provides the best user experience, including clean handling of the Work-in-progress on assets checked out from Experience Manager
\* **For simplifying access to assets from desktop for any generic file format or application:** use Experience Manager desktop app
\* **Understand why and when to store assets in DAM:** Updates to be made available to the broader team in your organization
\* **Mind the volume of assets shared:** If your use case is asset distribution, governance and security might be the most important aspects. Consider using tools built for doing that at scale, like Brand Portal.
\* **Understand asset lifecycle:** Know how assets are handled in your organization by different teams
\* **Handle frequent saves to assets with care:** Adobe Asset Link takes care of that for you with PS, AI, ID. For other applications, do not carry out work in progress tasks in mapped/shared folder unless you need all the changes in DAM

##### Access to Adobe Stock assets from Experience Manager Assets

Experience Manager and Adobe Stock integration provides Experience Manager users with the ability to search, preview, license and save, assets from Adobe Stock into Experience Manager. Licensed and saved Adobe Stock assets have selected Stock metadata, which can be used to search for them with extra filters.
A few important points about this integration:
\* When assets from Adobe stock are saved to Experience Manager, they become a regular Experience Manager Assets, with binary saved to the Experience Manager repository. Some metadata related to Adobe Stock are saved for the asset in Experience Manager, otherwise the ingestion process looks the same as for any other file. For example, if Smart Tags are active, the tags are added to these assets upon saving.
\* The asset saved to Experience Manager is a copy, not a link back into Adobe Stock.
**Working with assets saved from Adobe Stock into Experience Manager in Creative Cloud** . This integration is independent of Adobe Asset Link, but Adobe Asset Link recognizes these assets saved from Stock that way, and displays additional metadata and Stock icon on these assets in Adobe Asset Link extension UI in Photoshop, Illustrator, or InDesign. The files are available for browsing, opening, and so on - because they are regular Experience Manager assets when saved to Experience Manager.
Creative users working in Creative Cloud apps with Adobe Asset Link extension present, in addition to having access to already-licensed assets from Adobe Stock into Experience Manager, can also use Creative Cloud Libraries panel to search, preview, and license Adobe Stock assets.
Assets from Adobe Stock licensed and saved into Experience Manager become available to the broader teams accessing Experience Manager Assets deployment, whereas creatives licensing assets from Adobe Stock via Creative Cloud Libraries panel make them available to themselves only by default in their Creative Cloud account.

#### About storing assets in a DAM

To design an efficient workflow between creative and marketing/line-of-business (LOB) teams and choose the best support capabilities, it is important to understand when and why assets are stored in DAM.

##### Why assets are stored in DAM

Storing assets in DAM makes them easily accessible and findable. It ensures that the assets can be used by numerous users across the organization or ecosystem, which includes partners, customers, and so on.
Most organizations choose to only store assets that are relevant to the downstream marketing/LOB processes (publishing to channels like web channel via Experience Manager Sites or other channels served by Adobe Experience Cloud - Marketing Cloud, Advertising Cloud, and measured by Analytics Cloud, providing to users/partners, and so on). In addition, organizations store assets that may be subjected to a review/approval process in DAM. This way, DAM stores mostly assets that have high chances of being used, and avoids storing idle assets.
Storing assets is also subject to technical and resource utilization considerations. DAM provides additional services around stored assets, including extracting metadata, versioning, generating previews/transcoding, managing references, and adding access control information. These services consume additional time and infrastructure resources.
Often, storing all assets and updates is not desirable. For example, if updates to specific assets are of poor quality and consume excessive resources, the assets may not be stored in DAM.

###### When assets are stored in DAM

Creative teams (and organizations) are usually not interested in storing assets at each stage of the asset lifecycle. For example, they avoid storing assets in the following cases:
\* Assets that are yet to be finalized or are subject to experimentation
\* Assets that fail to pass the creative/internal team review cycle
\* Compared to the asset in question, the team has better candidates to represent their work to external teams
Usually, the following classes assets are stored in DAM:
\* Assets that reached a certain maturity and are considered ready to be shared
\* Assets that were pre-selected by the creative team
\* Specific asset formats that are usable or requested by marketing, depending on a specific contract or agreement (for example, JPG files converted from RAW files, TIFFs/images from PSD originals)

###### When updates to assets are stored in DAM

As a rule, only updates to assets that are relevant to the broader set of DAM users should be stored in DAM. It ensures that users (marketing and similar functions) only see relevant versions in the DAM asset timeline.
Typically changes related to major milestones in the asset lifecycle. For example, the initial marketing-ready asset or an official update based on request/review provided by the creative team should be stored and versioned in DAM.
The creative team's update for review by the marketing team after a request for a change in the existing asset in DAM is an example of a relevant update. It should be stored and versioned in DAM for further reference or for reverting to the previous version.
The following are examples of updates that are typically not relevant:
\* Early versions of assets uploaded before it is ready for marketing review
\* Frequent creative changes to the asset in the work-in-progress phase before creative and marketing teams decide that the asset is ready

##### User access to DAM

Experience Manager Assets supports two types of users based on their access to the Experience Manager Assets deployment. Typically, users inside the enterprise network (firewall) have direct access to DAM. Other users outside the enterprise network would not have direct access. The user type determines which integrations can be used from the technical standpoint.

###### Creative users with direct access to DAM

Typically, in-house creative teams or agencies/creative professionals onboarded to the internal network have access to the DAM instance, including Experience Manager login. Experience Manager and network infrastructure can be set up to allow direct access to external parties - usually trusted organizations like agencies working for a client - to have access to Experience Manager over network, for example, via VPN or IP allowed list.
In such cases, Adobe Asset Link or Experience Manager desktop app provides easy access to final/approved assets and lets you save creative-ready assets to DAM.

###### Creative users without access to DAM

External agencies and freelancers without direct access to the DAM instance may require access to approved assets or want to add their new designs to the DAM.
Use the following strategies to provide access to final/approved assets:
\* Use desktop app if Asset Link does not work.
\* Use Experience Manager Assets Brand Portal for distributing assets securely to external partners
\* Use a custom implementation of a distribution and sourcing portal based on Asset Share Commons
\* Use Access Control set up in Experience Manager and necessary network infrastructure (for example, VPN and IP allowed listing) to give external parties access to a dedicated area of content in your DAM. They can use Experience Manager Web UI to get assets and upload new content into your DAM.

###### Work in progress on assets from Experience Manager

As discussed in this document, it is recommended to carry out major updates on assets, sometimes called work in progress, without having all the edits saved to the local file also uploaded to Experience Manager as changes. This speeds up a desktop user's work, limit network bandwidth used, and keep the assets timeline clean and focused on controlled, major updates.
Adobe Asset Link offers a good support for this use case:
\* When users in Photoshop, InDesign, or Illustrator intent to edit a file, they execute a Check-out operation on the given asset
\* The asset is downloaded in background, put into users Creative Cloud account synchronized to disk by Creative Cloud desktop app, and the check-out flag is toggled in Experience Manager on the asset to minimize editing conflicts
\* From there on, the user works in a file that's stored locally in the synced location, and can continue working and saving necessary changes at any frequency required
\* Also, because the asset is in the Creative Cloud account, it is also available on other devices that the user might have (for example, can be opened or edited in a dedicated Creative Cloud mobile app), and can be shared with other Creative Cloud users for collaboration purposes.
\* When the creative user is done with the changes, they can execute a Check-in operation on that file in their Creative Cloud application, with an optional comment. The corresponding asset in Experience Manager are versioned and updated to with the new binary. Experience Manager users like Marketers or LOB users have access to major asset changes, or milestones, via Experience Manager asset timeline UI.
Experience Manager desktop app provides a network share for assets opened in the native app. By default, all the changes done locally are uploaded to Experience Manager automatically after a brief while. With such a configuration, frequent saves during the work-in-progress phase would all be uploaded into Experience Manager and versioned, creating a large amount of network traffic and potential scalability challenges - not to mention unnecessary versions in Experience Manager.
The recommended approach here is to use an option in Experience Manager desktop app to turn off automated updates, and upload changes to assets to Experience Manager manually, using the upload changes action in the app's Asset Status UI.

###### Bulk upload to DAM

You may have a requirement to simultaneously upload a larger number of files into DAM in some scenarios, for example:
\* Uploading results of photoshoot or larger projects
\* Uploading assets provided by creative agencies
\* Uploading selected assets from a larger set if the selection is done outside DAM
This description refers to uploading files operationally (for example, every week or with every photoshoot ), as a normal part of desktop user's workflow. Large asset migrations are not covered here.
You can use the following upload capabilities:
\* To upload large/hierarchical folders in bulk, use Experience Manager desktop app that provides folder upload functionality. You can also upload hierarchical folder structures. Assets are uploaded in background and, therefore, it is not tied to a web browser session
\* To upload a few files from a single folder, drag the files directly to the web interface or use the Create option in the Experience Manager Assets web interface.
\* Depending upon your business requirements, you can also use custom uploader.

###### Managing digital assets directly from desktop

If you use Network File Shares to manage digital assets, just using the network share mapped by Experience Manager desktop app could be seen as a convenient substitute. When transitioning from network file shares, Experience Manager web interface provides a rich set of Digital Asset Management capabilities that go well beyond what is possible on a network share (search, collections, metadata, collaboration, previews, and so on), and Experience Manager desktop app provides a handy link to connect the server-side DAM repository with the work on desktop.
Avoid using Experience Manager desktop app to manage assets directly in the network share of Experience Manager Assets. For example, avoid using Experience Manager desktop app to move/copy multiple files. Instead, use the Experience Manager Assets web UI to drag folders from Finder/Explorer to the network share or use the Experience Manager Assets Folder Upload feature.
**See also**
\* Translate Assets
\* Assets HTTP API
\* Assets supported file formats
\* Search assets
\* Connected assets
\* Asset reports
\* Metadata schemas
\* Download assets
\* Manage metadata
\* Search facets
\* Manage collections
\* Bulk metadata import
\* Publish Assets to AEM and Dynamic Media
Table of contents

##### Experience Manager

[-]
Expand all sections
\* Overview
\* Introduction to AEM as a Cloud Service
\* What is New and What is Different
\* Terminology - New for the Cloud
\* An Introduction to the Architecture of AEM as a Cloud Service
\* Supported Client Platforms
\* SEO and URL Management
\* AEM as a Cloud Service on Unified Shell
\* Assessing KPIs
\* Aligning KPIs
\* Choosing the Right Team
\* Release Notes
\* Release Information
\* AEMaaCS Feature Release Notes
\* Current Release Notes
\* 2026
\* Release Notes for 2026.2.0
\* Release Notes for 2026.1.0
\* 2025
\* Release Notes for 2025.12.0
\* Release Notes for 2025.11.0
\* Release Notes for 2025.10.0
\* Release Notes for 2025.9.0
\* Release Notes for 2025.8.0
\* Release Notes for 2025.7.0
\* Release Notes for 2025.6.0
\* Release Notes for 2025.5.0
\* Release Notes for 2025.4.0
\* Release Notes for 2025.3.0
\* Release Notes for 2025.2.0
\* Release Notes for 2025.1.0
\* 2024
\* Release Notes for 2024.11.0
\* Release Notes for 2024.10.0
\* Release Notes for 2024.9.0
\* Release Notes for 2024.8.0
\* Release Notes for 2024.7.0
\* Release Notes for 2024.6.0
\* Release Notes for 2024.5.0
\* Release Notes for 2024.4.0
\* Release Notes for 2024.3.0
\* Release Notes for 2024.1.0
\* 2023
\* Release Notes for 2023.12.0
\* Release Notes for 2023.11.0
\* Release Notes for 2023.10.0
\* Release Notes for 2023.9.0
\* Release Notes for 2023.8.0
\* Release Notes for 2023.7.0
\* Release Notes for 2023.6.0
\* Release Notes for 2023.4.0
\* Release Notes for 2023.2.0
\* Release Notes for 2023.1.0
\* 2022
\* Release Notes for 2022.10.0
\* Release Notes for 2022.8.0
\* Release Notes for 2022.7.0
\* Release Notes for 2022.6.0
\* Release Notes for 2022.5.0
\* Release Notes for 2022.4.0
\* Release Notes for 2022.3.0
\* Release Notes for 2022.1.0
\* 2021
\* Release Notes for 2021.11.0
\* Release Notes for 2021.10.0
\* Release Notes for 2021.9.0
\* Release Notes for 2021.8.0
\* Release Notes for 2021.7.0
\* Release Notes for 2021.6.0
\* Release Notes for 2021.5.0
\* Release Notes for 2021.4.0
\* Release Notes for 2021.3.0
\* Release Notes for 2021.2.0
\* Release Notes for 2021.1.0
\* 2020
\* Release Notes for 2020.12.0
\* Release Notes for 2020.11.0
\* Release Notes for 2020.10.0
\* Release Notes for 2020.9.0
\* Release Notes for 2020.8.0
\* Release Notes for 2020.7.0
\* Release Notes for 2020.6.0
\* Release Notes for 2020.5.0
\* Release Notes for 2020.4.0
\* Release Notes for 2020.3.0
\* Release Notes for 2020.2.0
\* AEMaaCS Maintenance Release Notes
\* Current Maintenance Release Notes
\* 2026
\* Maintenance Release Notes for 2026.3.0
\* Maintenance Release Notes for 2026.2.0
\* Maintenance Release Notes for 2026.1.0
\* 2025
\* Maintenance Release Notes for 2025.12.0
\* Maintenance Release Notes for 2025.11.0
\* Maintenance Release Notes for 2025.10.0
\* Maintenance Release Notes for 2025.9.0
\* Maintenance Release Notes for 2025.8.0
\* Maintenance Release Notes for 2025.7.0
\* Maintenance Release Notes for 2025.6.0
\* Maintenance Release Notes for 2025.5.0
\* Maintenance Release Notes for 2025.4.0
\* Maintenance Release Notes for 2025.3.0
\* Maintenance Release Notes for 2025.2.0
\* Maintenance Release Notes for 2025.1.0
\* 2024
\* Maintenance Release Notes for 2024.11.0
\* Maintenance Release Notes for 2024.10.0
\* Maintenance Release Notes for 2024.9.0
\* Maintenance Release Notes for 2024.8.0
\* Maintenance Release Notes for 2024.7.0
\* Maintenance Release Notes for 2024.6.0
\* Maintenance Release Notes for 2024.5.0
\* Maintenance Release Notes for 2024.4.0
\* Maintenance Release Notes for 2024.3.0
\* 2023
\* Maintenance Release Notes for 2023.12.0
\* Maintenance Release Notes for 2023.11.0
\* Maintenance Release Notes for 2023.10.0
\* Maintenance Release Notes for 2023.9.0
\* Maintenance Release Notes for 2023.8.0
\* Maintenance Release Notes for 2023.7.0
\* Maintenance Release Notes for 2023.6.0
\* Maintenance Release Notes for 2023.4.0
\* Maintenance Release Notes for 2023.2.0
\* Maintenance Release Notes for 2023.1.0
\* Cloud Manager Release Notes
\* Current
\* 2026
\* 2026.2.0
\* 2026.1.0
\* 2025
\* 2025.12.0
\* 2025.11.0
\* 2025.10.0
\* 2025.9.0
\* 2025.8.0
\* 2025.7.0
\* 2025.6.0
\* 2025.5.0
\* 2025.4.0
\* 2025.3.0
\* 2025.2.0
\* 2025.1.0
\* 2024
\* 2024.12.0
\* 2024.11.0
\* 2024.10.0
\* 2024.9.0
\* 2024.8.0
\* 2024.7.0
\* 2024.6.0
\* 2024.5.0
\* 2024.4.0
\* 2024.3.0
\* 2024.2.0
\* 2024.1.0
\* 2023
\* 2023.12.0
\* 2023.11.0
\* 2023.10.0
\* 2023.9.0
\* 2023.8.0
\* 2023.7.0
\* 2023.6.0
\* 2023.5.0
\* 2023.4.0
\* 2023.3.0
\* 2023.2.0
\* 2023.1.0
\* 2022
\* 2022.12.0
\* 2022.11.0
\* 2022.10.0
\* 2022.9.0
\* 2022.8.0
\* 2022.7.0
\* 2022.6.0
\* 2022.5.0
\* 2022.4.0
\* 2022.3.0
\* 2022.2.0
\* 2022.1.0
\* 2021
\* 2021.12.0
\* 2021.11.0
\* 2021.10.0
\* 2021.9.0
\* 2021.8.0
\* 2021.7.0
\* 2021.6.0
\* 2021.5.0
\* 2021.4.0
\* 2021.3.0
\* 2021.2.0
\* 2021.1.0
\* 2020
\* 2020.12.0
\* 2020.11.0
\* 2020.10.0
\* 2020.9.0
\* 2020.8.0
\* 2020.7.0
\* 2020.6.0
\* 2020.5.0
\* 2020.4.0
\* 2020.3.0
\* 2020.2.0
\* Release Notes for Migration Tools
\* Current Release Notes
\* 2024
\* Release Notes for 2024.01.0
\* Release Notes for 2024.05.0
\* Release Notes for 2024.07.0
\* 2023
\* Release Notes for 2023.10.0
\* Release Notes for 2023.9.0
\* Release Notes for 2023.8.0
\* Release Notes for 2023.7.0
\* Release Notes for 2023.6.0
\* Release Notes for 2023.3.0
\* 2022
\* Release Notes for 2022.12.0
\* Release Notes for 2022.9.0
\* Release Notes for 2022.7.0
\* Release Notes for 2022.5.0
\* Release Notes for 2022.4.0
\* Release Notes for 2022.3.0
\* Release Notes for 2022.2.0
\* Release Notes for 2022.1.0
\* 2021
\* Release Notes for 2021.12.0
\* Release Notes for 2021.11.0
\* Release Notes for 2021.10.0
\* Release Notes for Workfront for Experience Manager enhanced connector
\* Current Release Notes for Workfront for Experience Manager enhanced connector
\* Release Notes for Generate Variations
\* Current Release Notes for Generate Variations
\* Release Notes for Universal Editor
\* Current Release Notes for Universal Editor
\* Preview Release Notes for the Universal Editor
\* 2026
\* 2026.03.19 Release Notes
\* 2026.03.12 Release Notes
\* 2026.03.05 Release Notes
\* 2026.02.26 Release Notes
\* 2026.02.19 Release Notes
\* 2026.02.13 Release Notes
\* 2026.02.05 Release Notes
\* 2026.01.29 Release Notes
\* 2026.01.22 Release Notes
\* 2026.01.15 Release Notes
\* 2025
\* 2025.12.12 Release Notes
\* 2025.12.04 Release Notes
\* 2025.11.20 Release Notes
\* 2025.11.13 Release Notes
\* 2025.11.06 Release Notes
\* 2025.10.30 Release Notes
\* 2025.10.24 Release Notes
\* 2025.10.16 Release Notes
\* 2025.10.09 Release Notes
\* 2025.10.02 Release Notes
\* 2025.09.25 Release Notes
\* 2025.09.18 Release Notes
\* 2025.09.11 Release Notes
\* 2025.09.04 Release Notes
\* 2025.08.22 Release Notes
\* 2025.08.14 Release Notes
\* 2025.07.31 Release Notes
\* 2025.07.09 Release Notes
\* 2025.06.19 Release Notes
\* 2025.05.21 Release Notes
\* 2025.04.04 Release Notes
\* 2025.03.10 Release Notes
\* 2025.02.25 Release Notes
\* 2025.02.17 Release Notes
\* 2025.01.16 Release Notes
\* 2024
\* 2024.12.02 Release Notes
\* 2024.11.13 Release Notes
\* 2024.11.05 Release Notes
\* 2024.10.29 Release Notes
\* 2024.09.27 Release Notes
\* 2024.09.26 Release Notes
\* 2024.09.18 Release Notes
\* 2024.09.03 Release Notes
\* 2024.08.13 Release Notes
\* 2024.07.28 Release Notes
\* 2024.06.28 Release Notes
\* What is New?
\* Notable Changes in AEM Cloud Service
\* Deprecated and Removed Features and APIs
\* Prerelease Channel
\* Security
\* Security Overview for AEM as a Cloud Service
\* Configuring Advanced Networking for AEM as a Cloud Service
\* IMS Support for AEM as a Cloud Service
\* Migrating to External Identity and Dynamic Group Membership
\* Same Site Cookie Support for AEM as a Cloud Service
\* OAuth2 Support for the mail Service
\* Traffic Filter Rules including WAF Rules
\* JWT Credentials Deprecation in Adobe Developer Console
\* Open ID Connect Support for AEM as a Cloud Service on Publish Tier
\* Setting Up IMS Integrations for AEM as a Cloud Service
\* Principal View for Permissions Management
\* Best Practices for Sling Service User Mapping and Service User Definition
\* Customer Managed Keys for Adobe as a Cloud Service
\* Experience Hub
\* About Experience Hub
\* Onboarding
\* Start Here
\* Onboarding Journey
\* Onboarding Journey Overview
\* Onboarding Preparation
\* AEM as a Cloud Service Terminology
\* The Admin Console
\* Assigning Cloud Manager Product Profiles
\* Access Cloud Manager
\* Create a Program
\* Create Environments
\* Assigning AEM Product Profiles
\* Developer and Deployment Manager Tasks
\* Managing Principals
\* AEM User Tasks
\* Go-Live Checklist
\* AEM Reference Demos Add-On Journey
\* Overview
\* Installation
\* Create Program
\* Create Demo Site
\* Enable Screens
\* Manage Your Demo Site
\* Other Onboarding Concepts
\* Introduction to Cloud Manager
\* AEM as a Cloud Service Team and Product Profiles
\* Notification Profiles
\* AEM as a Cloud Service Migration Journey
\* Getting Started with moving AEM as a Cloud Service
\* Readiness Phase
\* Implementation Phase
\* Go Live
\* Post Go Live
\* Migration Guide to Experience Manager as a Cloud Service for Partners
\* Cloud Acceleration Manager
\* Introduction to Cloud Acceleration Manager
\* Overview
\* Benefits
\* Using Cloud Acceleration Manager
\* Getting Started with Cloud Acceleration Manager
\* Readiness Phase
\* Implementation Phase
\* Go Live Phase
\* Cloud Transition Tools
\* Best Practices Analyzer
\* Overview
\* Using Best Practices Analyzer
\* Content Transformer
\* Overview
\* Using Content Transformer
\* Content Transfer Tool
\* Overview
\* Prerequisites for Content Transfer Tool
\* Guidelines and Best Practices for Using Content Transfer Tool
\* Getting Started with Content Transfer Tool
\* Validating Content Transfers
\* Handling Large Content Repositories
\* Group Migration
\* Extracting Content from Source
\* Ingesting Content into Cloud Service
\* Indexing after Migrating Content
\* Viewing Logs for a Migration Set
\* Deleting a Migration Set
\* Running the Content Transfer Tool on a Publish Instance
\* Managing Principals After Migration
\* Bulk Upload of Principals to IMS after Migration
\* Troubleshooting Content Transfer Tool
\* Code Refactoring Tools
\* Getting Started with Refactoring Tools
\* Refactoring Tools Overview
\* Unified Experience
\* Repository Modernizer
\* Repository Modernizer (CAM)
\* Index Converter
\* Asset Workflow Migration
\* AEM Dispatcher Converter
\* AEM Modernization Tools
\* Sites
\* Notable Changes to AEM Sites in AEM Cloud Service
\* Sites and Edge Delivery Services
\* Authoring
\* Quick Start Guide to Authoring Pages
\* Basic Handling
\* Authoring and Publishing
\* Authoring Methods
\* Search
\* Configuring your account environment
\* Your Inbox
\* Components Console
\* Path Selection
\* Troubleshooting
\* Sites Console
\* The Sites Console
\* Console Side Panel
\* Creating a New Site
\* Organizing Pages
\* Creating Pages
\* Managing Pages
\* Page Properties
\* Editing Page Properties
\* Previewing Pages
\* Publishing Pages
\* Page Versions
\* Page Diff
\* Using Tags
\* Enabling Progressive Web App Features
\* Keyboard Shortcuts
\* Export to CSV
\* Page Editor
\* The Page Editor
\* Editor Side Panel
\* Editing Pages
\* Publishing Pages from the Page Editor
\* Page Templates
\* Adding Page Annotations
\* The Rich Text Editor
\* Responsive Layout
\* Components
\* Authoring for Mobile Devices
\* Creating Accessible Content (WCAG 2.1 Conformance)
\* Keyboard Shortcuts
\* Style System
\* Undo Redo Limitations
\* Universal Editor
\* Navigation
\* Authoring
\* Publishing Pages from the Universal Editor
\* Inheritance
\* Page Templates
\* Fragments
\* Content Fragments
\* Experience Fragments
\* Projects
\* Working with Projects
\* Managing Projects
\* Working with Tasks
\* Working with Project Workflows
\* Launches for Pages
\* Working with Launches
\* Creating Launches
\* Managing Pages in Launches
\* Editing Launches
\* Previewing Launches with Timewarp
\* Promoting Launches
\* Workflows
\* Working with Workflows
\* Applying Workflows to Pages
\* Participating in Workflows
\* Personalization
\* Personalization Overview
\* Previewing Pages Using ContextHub Data
\* Authoring Targeted Content Using Targeting Mode
\* Working with Targeted Content in Multisites
\* How Multisite Management for Targeted Content is Structured
\* Managing Activities
\* Managing Audiences
\* Creating and Managing Offers (Offers Console)
\* Understanding Segmentation
\* Configuring Segmentation with ContextHub
\* Registration, Login, and User Profile
\* Administering
\* Content Fragments
\* Concepts and Best Practices
\* Headless Delivery with GraphQL
\* Content Fragment Setup
\* Managing Content Fragment Models
\* Defining Content Fragment Models
\* Managing Content Fragments
\* Authoring Fragment Content
\* Markdown
\* Delete Considerations
\* Analyzing Structure
\* Previewing Fragments
\* Launches for Content Fragments
\* Assets in the Content Fragments Console
\* Content Fragments with Adobe Journey Optimizer
\* Content Fragment AJO External References Extension
\* Keyboard Shortcuts
\* Site Creation
\* Creating a New Site
\* Enable Front-End Pipeline
\* Using the Site Rail
\* Site Templates
\* Responsive Layout
\* Site Themes
\* AEM Quick Site Creation Journey
\* Understand AEM Quick Site Creation
\* Understand Cloud Manager
\* Create site from template
\* Set up your pipeline
\* Grant access to the front-end developer
\* Retrieve git repository access information
\* Customize the site theme
\* Deploy your customized theme
\* Reusing Content
\* MSM and Translation
\* Multi Site Manager
\* MSM and Live Copy Overview
\* Configuring Live Copy Synchronization
\* Creating and Synchronizing Live Copies
\* Live Copy Overview Console
\* Rollout Conflicts
\* MSM Best Practices
\* Troubleshooting and FAQ
\* Translation
\* Sites Translation Journey
\* Understand sites translation in AEM
\* Get started with AEM sites translation
\* Learn about sites content and how to translate in AEM
\* Configure translation connector
\* Configure translation rules
\* Translate content
\* Publish translated content
\* Headless Translation Journey
\* Translating Content for Multilingual Sites
\* Preparing Content for Translation
\* Managing Translation Projects
\* Language Copy Wizard
\* Identifying Content to Translate
\* Configuring the Translation Integration Framework
\* Connecting to Microsoft Translator
\* Translation Best Practices
\* Administering Tags
\* Administering Workflows
\* Templates Console
\* Integrating with AEM as a Cloud Service
\* Integrating with Adobe Analytics
\* Integrating with Adobe Analytics Automated Setup
\* Integrating with Adobe Learning Manager
\* Integrating with Adobe Target
\* Exporting Content Fragments to Adobe Target
\* Exporting Experience Fragments to Adobe Target
\* Integrating with Adobe Campaign
\* Using Content Fragments in Adobe Journey Optimizer
\* Operational Telemetry for AEM as a Cloud Service
\* Contextual Experimentation
\* Assets
\* Overview and what's new
\* Notable Changes to Assets as a Cloud Service
\* Assets architecture
\* Supported file formats
\* Overview of asset microservices
\* Accessibility in Assets
\* Assets as a Cloud Service Ultimate
\* Enable Assets as a Cloud Service Ultimate
\* Assets as a Cloud Service Prime
\* Assets Collaborator users
\* Manage digital assets
\* Content Advisor to access AEM content in Adobe applications
\* Share assets
\* Reprocessing assets
\* Malware detection
\* Get started using asset microservices
\* Add and upload assets
\* Search assets
\* Common asset management tasks
\* Manage publication
\* Preview 3D assets
\* Smart tags for images
\* Smart Tags Training
\* Enhance content discovery with AI generated metadata
\* Smart tags for videos
\* How to organize assets
\* Use Adobe Stock assets
\* Manage collections
\* Metadata overview
\* Integrate with Adobe Creative Cloud
\* How to add or edit metadata
\* Review folder assets and collections
\* Use and configure Assets Insights
\* Metadata profiles
\* Metadata schema
\* Manage video assets
\* Reuse assets using MSM
\* Download assets
\* Check-in and check-out assets to edit
\* Create and share private folders
\* Digital Rights Management for assets
\* Watermark assets
\* Process assets using Creative Cloud APIs
\* Color tags for images
\* Manage PDF documents
\* Micro-Frontend Asset Selector
\* Asset Selector overview
\* Asset Selector integrations
\* Asset Selector integrations overview
\* Integrate Asset Selector with an Adobe application
\* Integrate Asset Selector with a non-Adobe application
\* Integrate Asset Selector for Dynamic Media with OpenAPI capabilities
\* Asset Selector properties
\* Asset Selector examples
\* Asset Selector customizations
\* Asset Selector upload
\* Asset Selector collections
\* Micro-Frontend Destination Selector
\* Configure, administer, and extend Assets
\* Detect duplicate assets
\* Developer docs and APIs references
\* Folder metadata schema
\* Work with image and video profiles
\* Configure transcription for audio and video assets
\* Translate assets
\* Search facets
\* Assets HTTP API
\* Content Fragments support in Assets HTTP API
\* Connected Assets
\* Generate For Placement Only renditions
\* Asset reports
\* Cascading metadata
\* XMP metadata
\* MediaLibrary capabilities
\* Import and export asset metadata
\* Configure asset upload restrictions
\* Share and distribute assets
\* Configure Assets with Brand Portal
\* Publish assets to Brand Portal
\* Publish assets from Brand Portal to Assets
\* Content Fragments
\* Working with Content Fragments
\* Headless Delivery with Content Fragments and GraphQL
\* Enable Content Fragment Functionality for your Instance
\* Content Fragment Models
\* Managing Content Fragments
\* Variations - Authoring Fragment Content
\* Content Fragment Associated Content
\* Metadata - Fragment Properties
\* Content Fragments - Delete Considerations
\* Markdown
\* Structure Tree
\* Preview - JSON Representation
\* Reuse Content Fragments using MSM (for Assets)
\* Dynamic Media
\* Dynamic Media Journey: The Basics
\* Part I: What is Dynamic Media - Use cases - How an asset flows through the system
\* Part II: Anatomy of a Dynamic Media URL - Fundamentals of image presets - About Image sets, Spin sets, and Mixed Media sets
\* Dynamic Media best practices
\* Dynamic Media newsletter archive by Experience League
\* Set up Dynamic Media
\* Work with Dynamic Media
\* Configure Dynamic Media
\* Dynamic Media Prime and Ultimate
\* Enable Dynamic Media Prime and Ultimate
\* Optional - Configure Dynamic Media, General Settings
\* Optional - Configure Dynamic Media, Publish Setup
\* Troubleshoot Dynamic Media
\* Configure a Dynamic Media Alias Account
\* Accessibility in Dynamic Media
\* Manage Dynamic Media assets
\* Best practices for optimizing the quality of your images
\* Image Profiles
\* Video Profiles
\* Manage Dynamic Media Image Presets
\* Apply Dynamic Media Image Presets
\* Manage Dynamic Media Viewer Presets
\* Apply Dynamic Media Viewer Presets
\* Batch Set Presets
\* Invalidate the CDN cache by way of Dynamic Media
\* Invalidate the CDN cache by way of Dynamic Media Classic
\* Smart Imaging
\* Smart Imaging with client-side Device Pixel Ratio
\* Deliver Dynamic Media assets
\* Dynamic Media templates
\* Activate hotlink protection in Dynamic Media
\* 3D Support
\* Dynamic Media limitations
\* Image Sets
\* Panoramic Images
\* Mixed Media Sets
\* Spin Sets
\* Video in Dynamic Media
\* New Video Viewer
\* Carousel Banners
\* Interactive Images
\* Interactive Videos
\* 360 VR Video
\* Integrate Dynamic Media Viewers with Adobe Analytics and Adobe Experience Platform Tags
\* Create custom pop-ups using Quickview
\* Deliver optimized images for a responsive site
\* Preview Dynamic Media assets
\* Add Dynamic Media assets to pages
\* Embed the Dynamic Video or Image viewer on a web page
\* Link URLs to your web application
\* Use Rulesets to transform URLs
\* Publish Dynamic Media assets
\* Work with Selective Publish in Dynamic Media
\* Work with Selectors
\* HTTP2 Delivery of Content FAQ
\* Flash Viewers End-of-Life
\* DHTML Viewers End-of-Life
\* Dynamic Media with OpenAPI capabilities
\* Overview
\* Approve assets
\* Integration with downstream applications
\* Search assets API
\* Delivery APIs
\* Restrict assets delivery
\* Integrate remote AEM Assets with AEM Sites
\* Preview assets
\* Frequently asked questions
\* Configure custom domain
\* Optimize images
\* Create vanity URLs
\* Cache Management
\* Working with Assets view
\* Introduction
\* Getting started
\* My Workspace
\* Supported file types and use cases
\* View assets
\* Upload and add assets
\* Bulk import assets
\* Search and discover assets
\* Custom search filters
\* Asset management tasks
\* AI generated metadata
\* Edit images
\* Edit videos
\* View and manage renditions
\* Manage asset metadata
\* Import metadata form from Admin View to Assets View
\* Bulk rename
\* Bulk metadata edit
\* Share assets
\* Manage collections
\* Asset Relations
\* Watch asset, folders, and collections
\* Reprocessing
\* Manage tags
\* Content Credentials
\* Publish Assets to AEM and Dynamic Media
\* AEM Assets View UI Extensibility
\* Cascading Metadata Assets View
\* Content Hub
\* Overview
\* What's new in Content Hub
\* Deploy Content Hub
\* Upload or Import brand-approved assets to Content Hub
\* Configure Content Hub user interface
\* Approve assets for Content Hub
\* Search assets in Content Hub
\* Asset properties
\* Attribute-based access control
\* Share assets in Content Hub
\* Download assets using Content Hub
\* Manage Licensed Assets on Content Hub
\* Manage collections in Content Hub
\* Edit images using Adobe Express in Content Hub
\* Asset Insights in Content Hub
\* Frequently asked questions for Content Hub
\* Best practices
\* Search best practices
\* Metadata management and best practices
\* Integration with Figma
\* Native integration with Figma
\* Integration with Adobe Workfront
\* Integrations with Adobe Workfront
\* Configure asset metadata mapping
\* Install enhanced connector for Workfront
\* Remove external dependencies for existing installations
\* Configure enhanced connector for Workfront
\* Update Workfront for Experience Manager enhanced connector
\* Integration with Adobe Express
\* Native integration with Adobe Express
\* Integration with Creative Cloud
\* Connect AEM Assets to Creative Cloud
\* Integrate AEM Assets with Edge Delivery Services
\* Integrate AEM Assets while authoring content for Edge Delivery Services
\* Forms
\* Overview
\* Introduction
\* Top Adobe Experience Manager Forms innovations
\* Early Access (EA) capabilities
\* Notable changes
\* Architecture
\* Frequently asked questions
\* Known issues
\* Setup and migrate
\* Onboard to Cloud Service environment
\* Setup a local development environment
\* Configure Unified Storage Connector
\* Migrate from AEM 6.5 Forms or earlier to AEM Forms as a Cloud Service
\* Groups and permissions
\* Import, export, and organize Adaptive Forms, PDF forms, and other assets
\* Enable Feature Toggle on Adobe Experience Software Development Kit (AEM SDK)
\* Integrate
\* Services
\* Integrate AEM Forms as a Cloud Service with Adobe Sign
\* Integrate AEM Forms as a Cloud Service with DocuSign
\* Integrate AEM Forms as a Cloud Service with Adobe Analytics
\* Integrate Adaptive Forms to Adobe Analytics
\* Viewing and understanding Adaptive Forms Analytics Report
\* Embed an Adaptive Forms in an AEM Sites page
\* Embed adaptive form based on Core Components to an external web page
\* Embed adaptive form based on Foundation Components to an external web page
\* Form Data Model
\* Connect AEM Forms to database or data source
\* Configure data sources
\* Connect Adaptive Form to Salesforce application using OAuth 2.0 client credential flow
\* Configure Azure storage
\* Configure Microsoft Dynamics 365 cloud services
\* Connect Adaptive Form to Azure SQL Database
\* Configure Salesforce cloud services
\* Create Form Data Model
\* Work with Form Data Model
\* Use Form Data Model
\* Set Submit Action for an Adaptive Form
\* Submit Actions Supported by Adaptive Forms
\* Configure Submit Action for an Adaptive Form based on Foundation Components
\* Configure Submit Action for an Adaptive Form based on Core Components
\* Configure Submit Action for Edge Delivery Services Forms
\* Configure the Send Email submit action for an Adaptive Form
\* Integrate Adaptive Form with Form Data Model
\* Integrate an Adaptive Form with Microsoft Power Automate
\* Connect an Adaptive Form to Microsoft® SharePoint
\* Connect an Adaptive Form to Microsoft® SharePoint
\* Submit to SharePoint Document Library
\* Submit to SharePoint List
\* Configure SharePoint Site with limited access using authorization scope
\* Submit an Adaptive Form to Adobe Workfront Fusion
\* Submit an Adaptive Form to Azure Blob Storage
\* Configure Submit to REST Endpoint submit action for Adaptive Forms
\* Submit an Adaptive Form to Microsoft® OneDrive
\* Integrate AEM Adaptive Form with AEM Workflow
\* AEM Forms Integration with Adobe Experience Platform (AEP)
\* Integrate Adaptive Forms with Adobe Marketo Engage
\* Integrate Adobe Marketo Engage with AEM Forms
\* Configure new form to integrate with Marketo Engage
\* Configure Adobe Marketo Engage data source for existing Adaptive Forms
\* Configure the submit action to Marketo Engage for existing forms
\* Adaptive Forms
\* Create an Adaptive Form fragment
\* Add an Adaptive Form to an AEM Sites page or Experience Fragment
\* Manage Form Assets Versions in Forms Manager
\* Core Components
\* Create an Adaptive Form
\* Create an Adaptive Form
\* Set layout of an Adaptive Form based on Core Components
\* Create an Adaptive Form fragment
\* Create themes for an Adaptive Form - Core Components
\* Customizing Adaptive Form themes using the Theme Editor
\* Embed an Adaptive Forms theme in an AEM Sites theme
\* Create an Adaptive Form template based on Core Components
\* Create an Adaptive Form (Core Components) based on XFA Form templates
\* Generate Submission PDF (formerly Document of Record) for Adaptive Forms
\* Customize auto-generated Document of Record template
\* Supported HTML markup tags in Submission PDF
\* Use machine translation or human translation to translate an Adaptive Form
\* Configuring redirect page or thank you message
\* Create forms with repeatable sections
\* Use Google reCAPTCHA in an Adaptive Form
\* Use hCaptcha in an Adaptive Form Core Components
\* Use Turnstile Captcha in an Adaptive Form Core Components
\* Add custom error handler in an Adaptive Form
\* Add a locale for Adaptive Forms based on Core Components
\* Design JSON Schema for an Adaptive Form (Core Components)
\* Add versionings, comments, and annotations to an Adaptive Form
\* Compare Adaptive Forms
\* Create custom submit action
\* Manage Publication in Experience Manager Forms
\* Introduction to Rule Editor for Adaptive Forms based on Core Components
\* Introduction to Rule Editor for Adaptive Forms based on Core Components
\* Rule Editor user interface for Adaptive Forms based on Core Components
\* Difference between Foundation Rule Editor and Core Component Rule Editor
\* Operator and events types available in rule editor for an Adaptive Form based on Core Components
\* Examples for a Rule Editor for an Adaptive Form Based on Core Components
\* Using asynchronous functions in an Adaptive Form
\* Invoke Service enhancements in the Visual Rule Editor for forms based on Core Components
\* Rule Editor Enhancements
\* API Integration in Rule Editor
\* Introduction to Custom Functions for Adaptive Forms based on Core Components
\* Introduction to Custom Functions for Adaptive Forms based on Core Components
\* Create and use a Custom Function for an Adaptive Form based on Core Components
\* Scope object in custom functions
\* Examples of Custom Functions for an Adaptive Form Based on Core Components
\* Introduction to Forms Portal and its components
\* Introduction to Forms Portal component
\* List forms on the Sites page using the Search & Lister component
\* Save and list forms as drafts on Sites page using the Drafts & Submissions component
\* Add form links to Sites page using the Link component
\* Foundation Components
\* Convert your PDF forms to Adaptive Forms
\* Introduction to Automated Forms Conversion service
\* Convert an existing PDF Form to an Adaptive Form
\* Review and correct converted forms
\* Create an Adaptive Form
\* Introduction to authoring of an Adaptive Forms
\* Create an Adaptive Form
\* Reference themes, templates, and data models
\* Create a template
\* Create a theme
\* Design JSON Schema for an Adaptive Form
\* Improve performance of large forms with lazy loading
\* Add components to an Adaptive Form
\* Use CAPTCHA in an Adaptive Form
\* Use hCaptcha in an Adaptive Form
\* Use Turnstile CAPTCHA in an Adaptive Form
\* Use Core Components
\* Apply Scribble Signature
\* Add a table to an adaptive form
\* Add Footnotes support to an Adaptive Form
\* Configure layout and apply style to an Adaptive Form
\* Set layout of an Adaptive Form
\* Use Layout mode to resize components
\* Create multi-step data capture experience
\* Styling constructs for Adaptive Forms
\* Apply inline CSS styles to individual Adaptive Form components
\* How to use Separator component in Adaptive Forms?
\* Add rules and use expressions in an Adaptive Form
\* Add rules to an Adaptive Form
\* Add custom error handler using Rule Editor's Invoke service
\* Using SOM expressions in Adaptive Forms
\* Use Adobe Sign
\* Use Adobe Sign to e-sign an Adaptive Form
\* Configure Submit Actions and metadata submission
\* Configure redirect page
\* Configure asynchronous submission for an Adaptive Form
\* Create a custom Submit Action
\* Prefill Adaptive Form fields
\* Generate Submission PDF (formerly Document of Record)
\* Add support for new locales to an adaptive form
\* Add or improve metadata
\* Add, remove, or edit metadata of an Adaptive Form
\* Reuse metadata properties of an Adaptive Form
\* Improve accessibility of an Adaptive Form
\* Create an accessible Adaptive Form
\* Create and manage reviews
\* Adaptive forms keywords
\* Previewing a form
\* HTML5 Forms
\* Introduction to HTML5 forms
\* Getting started with HTML5 forms
\* Feature differentiation between HTML5 forms and PDF forms
\* Frequently asked questions (FAQ) for HTML5 forms
\* Designing form templates for HTML5 forms
\* Best practices for HTML5 forms
\* Designing accessible HTML5 forms
\* Generate HTML5 preview of an XDP form
\* Rendering form template for HTML5 forms
\* Enabling attachments for an HTML5 form
\* HTML5 forms service proxy
\* Optimizing HTML5 forms
\* Screen readers for HTML5 forms
\* Creating a custom profile for HTML5 forms
\* Right-to-left languages in HTML5 forms
\* Integrating Form Bridge with custom portal for HTML5 forms
\* Create custom appearances in HTML5 forms
\* Changing default styles of HTML5 forms
\* Picture clause support for HTML5 forms
\* Create accessible complex tables in HTML5 forms
\* Creating CSS styles for HTML5 forms
\* Customizing error messages for HTML5 forms
\* Enable logging for HTML5 forms
\* Debugging HTML5 forms
\* Scripting support for HTML5 forms
\* Interactive Communication
\* Understanding Interactive Communication
\* Introduction
\* Getting Started
\* Create Interactive Communication
\* Create Interactive Communication Template
\* Create Interactive Communication Fragment
\* Component
\* Text Box
\* Image
\* Image Field
\* Text Field
\* Numeric Field
\* Date/Time Field
\* Date Field
\* Check Box
\* Radio Button
\* Subform
\* Rectangle
\* Table
\* Line
\* Barcode
\* How To
\* Configure Data Binding
\* Use the Rule Editor
\* Import and Export the Interactive Communication
\* Add Custom Fonts
\* Generate PDF Preview
\* Enable Template Lock
\* Implement Dynamic Page Numbering
\* Handle Content Overflow
\* Support XDP Editing
\* Start Workflow in Interactive Communication
\* Create Dynamic Table
\* Associate UI
\* Associate UI in Interactive Communication Editor
\* Enable and configure Associate UI for Interactive Communications
\* Integrate Associate UI in Your Application
\* Submission workflow for Associate UI — IC Generate PDF Output
\* Forms Centric Workflows
\* Use Forms-centric steps in a workflow + step reference
\* Use variables in a Forms-centric workflow
\* Use the Out of Office option
\* Communications APIs
\* Introduction to Communications APIs
\* AEM Forms Communications APIs
\* Communications APIs - Synchronous processing
\* Communications APIs - Batch processing
\* Forms Communications APIs - Tutorial
\* Generate AFP Output Using the AEM Forms API
\* OAuth Server-to-Server Authentication
\* JWT(JSON Web Token) Server-to-Server Authentication
\* Install and configure Forms Designer
\* Use Forms Designer to create templates
\* Changing Page Zero content in Designer
\* Using custom fonts in PDF documents
\* List of supported fonts in PDF documents
\* Known issues, best practices, and frequently asked questions
\* Transaction Reports
\* Transaction Reports Billable APIs
\* Record a transaction for a custom implementation
\* Developer API Reference
\* Adaptive Forms API reference
\* AEM Forms Cloud Service Communications API Reference
\* AEM Forms Cloud Service JavaScript API Reference
\* AEM Forms Cloud Service Java API Reference
\* Troubleshooting
\* Installation and configuration
\* Dispatcher and CDN caching
\* Restarting AEM SDK
\* Resolving Forms creation failures
\* 502 Error Page in Custom Submit Action
\* AI in AEM
\* Overview
\* MCP Support
\* Using MCP with AEM as a Cloud Service
\* Chat Applications (Web & Desktop)
\* Setting Up Anthropic Claude with AEM MCP
\* Setting Up OpenAI ChatGPT with AEM MCP
\* Developer Tools (IDE Extensions, Desktop Apps, CLIs)
\* Setting Up Cursor with AEM MCP
\* Enterprise Platforms
\* Setting Up Microsoft Copilot Studio with AEM MCP
\* Setting Up JetBrains with GitHub Copilot and AEM MCP
\* Local Development with AI Tools
\* Agents in AEM
\* Overview
\* Brand Experience Agent
\* Overview
\* Experience Production Agent
\* Overview
\* Content Update Job
\* Communication Creation Job
\* Form Creation Job
\* Experience Modernization Agent
\* Overview
\* Getting Started
\* Getting Started with AEM authoring projects
\* Modernization Console
\* Prompting Guide
\* AOE Delivery
\* Development Agent
\* Content Advisor Agent
\* Overview
\* Content Discovery Agent
\* Content Optimization Agent
\* Brand Governance Agent
\* Overview
\* How to Import a Brand Policy
\* AI Assistant
\* Configure AI Assistant in AEM
\* About AI Assistant in AEM
\* Generate Variations
\* Generate Variations - Integrated in AEM Editors
\* Generate Variations
\* Screens
\* Overview to Screens as a Cloud Service
\* Introduction
\* Understanding Role Definitions
\* Adobe Analytics Integration with Screens Cloud
\* Onboarding to Screens as a Cloud Service
\* First Time Login
\* Adding Screens Program as an Add-On in Cloud Manager
\* Adding Screens Program as an Add-On to a New Program
\* Adding Screens Program as an Add-On to an Existing Program
\* Creating a Branch
\* Creating an Environment
\* Running the Pipeline
\* Configuring Screens as a Cloud Service Project
\* Navigating to Screens Services Provider
\* Using Screens Content Provider
\* Creating Screens Video Renditions
\* Configuring Dispatcher for Screens as a Cloud Service
\* Configuring Timeline Views for Screens as a Cloud Service
\* Creating Content
\* Creating and Managing a Project in Screens Content Provider
\* Creating and Managing a Channel in Screens Content Provider
\* Managing Publication
\* Creating and Managing a Display in Screens Services Provider
\* Assigning Channel to a Display
\* Managing Player and Registration
\* Installing Screens Player
\* Registering the Player
\* Assigning Player to a Display
\* Using Core Product Features
\* Thumbnail Support for Videos
\* Screens Notification Service
\* Developing in Screens as a Cloud Service
\* REST APIs
\* Creating Components
\* Developing a Custom Component for Screens as a Cloud Service
\* Screens as a Cloud Service FAQs
\* Content and Commerce
\* Introduction and overview
\* CIF Storefront
\* CIF Introduction
\* Notable Changes to AEM Content and Commerce as a Cloud Service
\* Commerce Journeys
\* Content Author Journey
\* AEM Content and Commerce Content Author Journey
\* Getting Started with CIF Authoring
\* Manage product catalog pages and template
\* Building Staged Product Catalog Experiences
\* Building Product Experiences
\* Integrations
\* Adobe Commerce
\* Live Search CIF Component
\* Live Search Popover CIF Component
\* Third-Party Commerce Solution
\* Experience Platform
\* AEM Storefront
\* Getting Started
\* Authoring
\* Commerce Experiences
\* Product Cockpit
\* Multi-Template Usage
\* Enrich Product Data with Associated Content
\* Product Recommendations
\* Administering
\* Multi-Store Setup
\* Multiple Commerce Systems Setup
\* Configuring URLs for SEO
\* Caching Options
\* Custom HTTP Headers
\* Shopping Cart and Dispatcher Setup
\* Component & GraphQL Clear Cache
\* Developing
\* Developing with AEM Cloud Service SDK
\* Styling CIF Components
\* Customizing CIF Components
\* Using CIF Catalog Pickers
\* Custom Attributes to CIF Product Carousel
\* JSON-LD Metadata
\* Adobe Commerce PWA Studio
\* Migration
\* FAQ
\* Edge Delivery Services
\* Edge Delivery Services Overview
\* Building Forms
\* Overview
\* WYSIWYG Authoring
\* Universal Editor for Edge Delivery Services for Forms
\* Navigate the Universal Editor Interface for AEM Forms
\* Getting Started with Edge Delivery Services for AEM Forms using Universal Editor
\* Create and Publish Adaptive Forms with Edge Delivery Services
\* Create Responsive Forms with Universal Editor
\* Customize theme and style for an Edge Delivery Services for AEM Forms
\* Rule Editor for Dynamic Forms in Universal Editor
\* How to Create Form Fragments for WYSIWYG-Based Authoring
\* How to Configure a Submit Action for an Adaptive Form?
\* How to Configure a Redirect Page or Thank you message
\* Add Google reCAPTCHA to Forms in Universal Editor
\* How to integrate Form Data Model (FDM) for a form in Universal Editor?
\* How to prefill Adaptive Form fields
\* Publish Adaptive Forms with Edge Delivery Services
\* Create Custom Components for an EDS Form
\* Troubleshooting 403 Forbidden Errors in Edge Delivery Services Form Submission
\* Cascading Drop Down
\* Introduction
\* Create API Integration
\* Create Form
\* Document-based authoring
\* Build Your First Form: Quick Start Guide with Google Sheets and Excel
\* How to Create Forms Using Google Sheets or Excel: Step-by-Step Guide
\* Various components of Adaptive Form Block
\* Connect Your Form to Google Sheets: Data Collection Setup Guide
\* Make Your Form Live: Publishing and Data Collection Guide
\* Design Beautiful Forms: Styling and Customization Guide
\* Create Success Messages: Customize Your Form's Thank You Page
\* Dynamic Form Fields: Loading Options from URLs
\* Add Smart Behavior: Form Rules and Logic Guide
\* Create Dynamic Forms: Adding Repeatable Sections
\* Protect Your Forms: Adding reCAPTCHA Security
\* Form Submission Guide: Using the Forms Submission Service
\* Configure Submission for Edge Delivery Services Forms
\* Adaptive Forms Block Field Properties
\* Headless
\* What is a Headless CMS?
\* Introduction to AEM Headless
\* Developer Portal (Additional Resources)
\* Best Practices - Setup and Use
\* Setup
\* Introduction
\* Configuration
\* Content Fragment Model
\* Assets Folder
\* Content Fragment
\* GraphQL Endpoint
\* Content Fragments
\* Overview
\* Content Fragment Models
\* Managing Content Fragments
\* Authoring
\* Authoring
\* Markdown editor
\* Previewing Fragments
\* Structure Tree
\* Content Fragment Selector
\* Micro-Frontend Content Fragment Selector - Overview
\* Content Fragment Selector - Related Properties
\* Integrate with an Adobe application
\* Integrate with non-Adobe or third party application
\* Integrate Content Fragment Selector using Vanilla JS
\* AEM APIs for Structured Content Delivery and Management
\* GraphQL API
\* GraphQL API for Content Fragments
\* Manage GraphQL endpoints
\* GraphiQL IDE
\* Persisted GraphQL queries
\* Optimizing GraphQL Queries
\* Updating your Content Fragments for optimized GraphQL Filtering
\* Upgrading your Content Fragments for UUID References
\* Sample GraphQL queries
\* Troubleshoot GraphQL queries
\* AEM Content Fragment Delivery with OpenAPI
\* Content Fragments and Models OpenAPIs
\* Content Fragments support in Assets HTTP API
\* Security
\* Permissions
\* Authentication
\* Deployment
\* Architecture
\* Dispatcher - Endpoints
\* Dispatcher - Enable Caching for Persisted Queries
\* CORS Config
\* Referrer Filter
\* Headless Journeys
\* Headless Developer Journey
\* Understand Headless in AEM
\* Learn about CMS Headless Development
\* Getting Started with AEM Headless as a Cloud Service
\* Path to your first experience using AEM Headless
\* How to model your content as AEM Content Models
\* How to access your content via AEM delivery APIs
\* How to update your content via AEM Assets APIs
\* How to put it all together
\* How to go live with your headless application
\* Optional - How to create single page applications with AEM
\* Developer Portal (Additional Resources)
\* Headless Content Architect Journey
\* AEM Headless Content Architect Journey Overview
\* Content Modeling for Headless with AEM - An Introduction
\* Learn the Content Modeling Basics for Headless with AEM
\* Learn about Creating Content Fragment Models in AEM
\* Headless Translation Journey
\* Understand headless translation in AEM
\* Get started with AEM headless translation
\* Learn about headless content and how to translate in AEM
\* Configure translation connector
\* Configure translation rules
\* Translate content
\* Publish translated content
\* Headless Content Author Journey
\* AEM Headless Content Author Journey - Overview
\* Authoring for Headless with AEM - An Introduction
\* Authoring Basics for Headless with AEM
\* Learn about using references in Content Fragments
\* Learn about defining Metadata and Tagging for Content Fragments
\* Implementing
\* Implementing Applications for AEM as a Cloud Service
\* Use Cloud Manager
\* Navigation
\* Programs
\* Programs and Program Types
\* Production Programs
\* Create Production Programs
\* Sandbox Programs
\* Create Sandbox Programs
\* Edit Programs
\* Hibernate Environments
\* Create an AEM Application Project
\* Project Creation Wizard
\* Project Setup
\* Build Environment
\* Manage Environments
\* Specialized Testing Environments
\* Manage your Code
\* Maven Project Version Handling
\* Manage Repositories in Cloud Manager
\* Add an Adobe Repository
\* Add a Private Repository
\* Add an External Repository
\* Manage Access Tokens of External Repositories
\* Access Repositories
\* Git Submodule Support
\* Use Git with Cloud Manager
\* Use Multiple Repositories
\* Enterprise Development Team Setup
\* Pull Request Checks for Private Repositories
\* GitHub Check Annotations
\* Environment Variables
\* Cloud Manager CI-CD Pipelines
\* Introduction to CI-CD Pipelines
\* Configure a Production Pipeline
\* Configure a Non-Production Pipeline
\* Split Stage and Production Only Pipeline
\* Configure an Edge Delivery Pipeline
\* Manage Pipelines
\* Pipeline Variables
\* Deploy Your Code
\* Understand your Test Results
\* Overview
\* Code Quality Testing
\* Custom Code Quality Rules
\* Functional Testing
\* Functional Testing Overview
\* Java Functional Testing
\* UI Testing
\* Access and Manage Logs
\* Custom Permissions
\* Reports
\* SLA
\* Health Assessment
\* Experience Audit
\* New Relic One
\* Dynatrace
\* Notifications
\* Advanced Networking
\* Edge Delivery Sites
\* Introduction to Edge Delivery Services in Cloud Manager
\* Add an Edge Delivery Site to Cloud Manager
\* Create Your First Edge Delivery Site with One Click
\* Configure an Edge Delivery site to use an external Git repository
\* Setup Push Validation for an Edge Delivery site
\* Configure Your Content Source
\* Manage Edge Delivery Sites in Cloud Manager
\* Domain Settings
\* Introduction to Domain Settings
\* Add a Custom Domain Name
\* Check Custom Domain Name Status
\* Check DNS Record Status
\* Manage Custom Domain Names
\* SSL Certificates
\* Introduction to SSL Certificates
\* Add an SSL Certificate
\* Troubleshoot SSL Certificate Errors
\* Manage SSL Certificates
\* Domain Mappings
\* Add a Domain Mapping
\* Manage Domain Mappings
\* IP Allow Lists
\* Introduction to IP Allow Lists
\* Add an IP Allow List
\* Apply and Unapply IP Allow Lists
\* Manage IP Allow Lists
\* License Dashboard
\* Understand Cloud Service Content Requests
\* CDN Performance Dashboard
\* Cloud Manager FAQs
\* Developing for AEM as a Cloud Service
\* AEM Project Structure
\* AEM Project Repository Structure Package
\* AEM as a Cloud Service SDK
\* AEM Rapid Development Environments
\* AEM as a Cloud Service Development Guidelines
\* AEM as a Cloud Service Developer Console (Beta)
\* Logging
\* Log Forwarding
\* Configurations and the Configuration Browser
\* AEM Technical Foundations
\* API Reference Materials
\* OpenAPI-Based APIs
\* Generating Access Tokens for Server Side APIs
\* Quick Site Creation and Front-End Customization
\* Developing Sites with the Front-End Pipeline
\* Customizing Site Templates and Themes
\* Headful and Headless in AEM
\* Disallow the Serialization of ResourceResolvers via Sling Model Exporter
\* Full Stack AEM Development
\* Getting Started Developing AEM Sites - WKND Tutorial
\* Structure of the AEM UI
\* Sling Cheatsheet
\* Using Sling Adapters
\* Using the Sling Resource Merger in AEM as a Cloud Service
\* Overlays in AEM as a Cloud Service
\* Using Client-Side Libraries
\* Page Diff
\* Editor Limitations
\* Naming Conventions
\* Responsive Design
\* Components and Templates
\* Components Overview
\* Templates
\* Core Components
\* Style System
\* JSON Exporter for Content Services
\* Enabling JSON Export for a Component
\* Image Editor
\* Decoration Tags
\* Using Hide Conditions
\* Components Reference Guide
\* AEM Tagging Framework
\* Building Tagging into AEM Applications
\* Search
\* Query Builder API
\* Query Builder Predicate Reference
\* Implementing a Custom Predicate Evaluator
\* Custom Error Pages
\* AEM Node Types
\* Universal Editor
\* Introduction
\* Use Cases
\* The Universal Editor and the Sites Editor
\* Attributes and Item Types
\* Component Definition
\* Model Definitions, Fields, and Component Types
\* Publishing
\* Events
\* Filters
\* Configuring the RTE
\* Configuring Assets Selector
\* Customizing
\* Extending
\* Architecture
\* Authentication
\* Calls
\* Getting Started
\* Developer Overview
\* Local AEM Development
\* SecurBank Sample App
\* Headless Experience Management
\* Hybrid and SPA Development
\* Hybrid and SPA with AEM
\* Enabling JSON Export for a Component
\* SPA Editor Deprecation
\* SPA Introduction and Walkthrough
\* SPA WKND Tutorial
\* Getting Started using React
\* Getting Started using Angular
\* Developing SPAs for AEM
\* SPA Editor Overview
\* SPA Blueprint
\* SPA Page Component
\* Dynamic Model to Component Mapping
\* Model Routing
\* The RemotePage Component
\* Editing an External SPA within AEM
\* Composite Components in SPAs
\* Enabling JSON Export for a Component
\* Launch Integration
\* SPA Reference Documents
\* Developer Tools
\* Developer Mode
\* AEM Developer Tools for Eclipse
\* Content Copy
\* Content Package Maven Plugin
\* AEM Repo Tool
\* Using CRXDE Lite
\* Package Manager
\* The Link Externalizer
\* The Repository Browser
\* Personalization
\* ContextHub
\* Configuring ContextHub
\* Adding ContextHub to Pages
\* Sample Store Candidates
\* Sample Store Modules
\* ContextHub Diagnostics
\* Extending ContextHub
\* ContextHub API
\* Configuring Segmentation with ContextHub
\* Configuring and Extending AEM as a Cloud Service
\* Extending AEM with App Builder
\* Extending AEM using Adobe Developer App Builder
\* Introduction to App Builder
\* Adobe Developer Console
\* SDKs and CLI
\* Create an application
\* Actions
\* Storage libraries
\* Event-driven applications
\* Front-end applications
\* Security
\* Deploy applications
\* Publish applications
\* Extending Experience Fragments
\* Customizing and Extending Content Fragments
\* Content Fragments Configuring Components for Rendering
\* Customizing the Content Fragment Console and Editor
\* Manage Search Forms
\* Configuring Search Forms
\* Configure search filters for Inbox
\* Configure Rich Text Editor
\* Configure the RTE plug-ins
\* Configure RTE to create accessible sites
\* Extending Page Authoring
\* Extending Consoles
\* Extending Page Properties
\* Extending the Bulk Editor
\* Extending MSM
\* Internationalization
\* Internationalizing Components
\* Internationalizing UI Strings
\* Using Translator to Manage Dictionaries
\* Extracting Strings for Translating
\* Extensions and the Extension Manager
\* Deploying to AEM as a Cloud Service
\* Deploying to AEM as a Cloud Service
\* AEM Version Updates
\* Quiet Hours and Update Free Periods
\* Configuring OSGi for AEM as a Cloud Service
\* Resource Mapping
\* Author Tier
\* Accessing the Author Tier
\* Securing the Author Tier
\* Content Delivery Overview
\* Content Delivery Flow
\* Dispatcher in the Cloud
\* Validating and Debugging using Dispatcher Tools
\* Migrating the Dispatcher configuration from AMS to AEM as a Cloud Service
\* CDN in AEM as a Cloud Service
\* Configuring Traffic at the CDN
\* Pipeline-free URL Redirects
\* Edge Side Includes
\* Configuring CDN Credentials and Authentication
\* Configuring CDN error pages
\* Purging the CDN cache
\* Caching in AEM as a Cloud Service
\* Connectors
\* Implementing an AEM Connector
\* Submitting an AEM Connector
\* Maintaining an AEM Connector
\* Operations
\* Operations and Maintenance on AEM as a Cloud Service
\* Actions Center
\* Content Search and indexing
\* Content Replication Service
\* Additional Publish Regions
\* Infrastructure and Service Monitoring in AEM as a Cloud Service
\* Maintenance Tasks
\* Restore Content
\* Restore Previous Code Deployed
\* Asynchronous Jobs
\* Using Config Pipelines
\* Removal of the generic lucene index
\* Query and Indexing Best Practices
\* Link Checker
\* Compliance
\* Compliance in AEM as a Cloud Service
\* Data Privacy and Protection Readiness
\* AEM Readiness for Data Protection and Data Privacy Regulations
\* AEM Foundation Readiness for Data Protection and Data Privacy Regulations
\* AEM Sites Readiness for Data Protection and Data Privacy Regulations
\* Accessibility
\* AEM as a Cloud Service and the Web Accessibility Guidelines
\* A Quick Guide to WCAG 2.1
Bookmark Sign-in to bookmark Copy link Copy link URL

#### ON THIS PAGE

```
*  Collaboration need of creatives, marketers, and DAM users
*  Adobe offerings to support the collaboration need
*  Key concepts and use cases
*  About storing assets in a DAM
```

##### Adobe AI Forum Zurich

GenStudio for Performance Marketing Events
Join us at Adobe AI Forum to get a firsthand look at how Adobe helps you create AI-driven, end-to-end experiences.
Wednesday, Apr 1, 12:00 AM PDT
Register

##### Deliver Once, Delight Everywhere: Scaling Omnichannel Experiences with Adobe Dynamic Media

Learn from your Peers
Learn how to streamline image and video transformation and optimization at scale with AEM Assets Dynamic Media and how to extend this power across the enterprise with Open APIs from AEM Champion Vengadesh Shanmugavelo.
Thursday, May 7, 8:00 AM PDT
Register

#### Adobe Summit | April 19–22, 2026

#### Registration is live.

Explore the future of marketing, creativity, and AI.
Register now
Experience League

#### Learn

```
*  Courses
*  Playlists
*  Tutorials
*  Instructor-led training
*  Browse all learning content
```

#### Documentation

```
*  Documentation home
*  Experience Cloud release notes
*  Document Cloud release notes
```

#### Certifications

```
*  Certifications home
```

#### Events

```
*  Events home
```

#### Community

```
*  Community home
*  Community code of conduct
*  Community resources
*  Advocate programs
*  Advertising
*  Analytics
*  Audience Manager
*  Campaign
*  Experience Manager
*  Experience Platform
*  Marketo Engage
*  Real-time CDP
*  Target
*  Workfront
```

#### Support

```
*  Experience Cloud Support
*  Document Cloud Support
*  Community forums
```

#### Resources

```
*  Adobe I/O
*  Adobe Status
```

#### Adobe Account

```
*  Profile
*  Bookmarked content
```

#### Adobe

```
*  About
*  Careers
*  Newsroom
*  Corporate responsibility
*  Investor Relations
*  Supply chain
*  Trust Center
*  Events
*  Diversity & Inclusion
*  Integrity
```

Copyright © 2026 Adobe. All Rights Reserved./ Privacy/ Terms of Use/ Cookie preferences/ Do not sell my personal information/ AdChoices
Cookie preferences

##### Was this content helpful?

Content is helpful Content is not helpful
Submit Provide feedback to submit Dismiss
Detailed feedback options
Other feedback options
Report an issue Open GitHub to report Suggest an edit Open GitHub to edit
Learn how to contribute.
