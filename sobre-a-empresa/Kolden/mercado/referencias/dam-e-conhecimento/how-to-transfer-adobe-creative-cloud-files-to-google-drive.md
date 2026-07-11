---
id_fonte: "d3e3010e-c16c-4db1-82b7-2634b976c775"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "How to Transfer Adobe Creative Cloud Files to Google Drive"
tipo: "unknown"
url_original: "https://www.cloudduplicatefinder.com/blog/transfer-adobe-creative-cloud-files-to-google-drive/"
keywords: "('Adobe Creative Cloud', 'Google Drive', 'File Transfer', 'Cloud Duplicate Finder', 'Data Synchronization')"
summary: "This guide outlines practical methods for migrating digital assets from **Adobe Creative Cloud to Google Drive**, a transition often motivated by the latter's superior **sharing capabilities and storage management**. Users can choose between a basic manual download-and-upload approach or a more efficient **synchronized workflow** using the Adobe desktop application to bypass tedious manual transfers. For advanced users on Linux or Mac, the text provides a **technical batch download** strategy using terminal commands to extract shared assets via folder IDs. Finally, the author highlights the utility of **Cloud Duplicate Finder**, a tool designed to clean up redundant files and preserve storage space after the migration is complete."
extraido_em: "2026-06-30T16:12:54Z"
extraido_por: "notebooklm-py-0.7.3"
area: mercado
up: "[[sobre-a-empresa/Kolden/mercado/_MOC-mercado]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/mercado/referencias/dam-e-conhecimento/_indice|_indice]]"
---

# How to Transfer Adobe Creative Cloud Files to Google Drive

How to Transfer Adobe Creative Cloud Files to Google Drive
Menu
\* Home
\* Support
\* Signup
\* FAQs
\* Pricing
\* Privacy Policy
\* Terms
Menu ≡ ╳
\* Home
\* Support
\* Signup
\* FAQs
\* Pricing
\* Privacy Policy
\* Terms
Home/ Cloud/ How to Transfer Adobe Creative Cloud Files to Google Drive

### How to Transfer Adobe Creative Cloud Files to Google Drive

Category : Cloud, Linux, Mac
Posted by : Raza Ali Kazmi / Posted on : September 26, 2019
It would be correct to say that Adobe Creative Cloud is a safe haven for photographers, videographers, and other related professions. With a single subscription, users can get access to the whole range of Adobe software programs including Adobe Spark, Photoshop, Illustrator, Acrobat Reader, etc.
Once you have transferred these files to Google Drive, you will notice your Google Drive free space will shrink a lot. This might be due to duplicates. So why not get rid of them? Sure, but how? Cloud Duplicate Finder holds all the answers you need.
**Delete Google Drive Duplicates with Cloud Duplicate Finder**
**Cloud Duplicate Finder uses the Official API of Google Drive**
**View Cloud Duplicate Finder Terms of Service**

#### **Why Would a Transfer Be Needed?**

Although Adobe Creative Cloud is great to work with, for most people, it might not be the ideal place to store files at the end of the day. Since Google Drive is used more commonly for file storage and sharing, people often want to transfer their files from Creative Cloud to Google Drive. Some people also want to transfer files because of limited storage available in the CC. In this article, we'll discuss a few simple ways to do so.

#### **Download & Re-Upload**

The most straightforward way is to download all the files from your Adobe Creative Cloud's web account and then upload it to Google Drive via the drag and drop functionality. As obvious, it will take a lot of time especially if you're working with media files, which is usually the case.

#### **Adobe CC Desktop App**

The slightly easier method is to pre-install the desktop application of Adobe Creative Cloud. If you have the app downloaded, your files will already be synced. Now, you can simply drag and drop your files to Google Drive and save a lot of time.
The best part is that if you are using Adobe CC's mobile apps, the files you created/ edited on your phone will also be synced to the desktop app. This means that you don't have to separately move any file. Plus, drag and drop won't work for a mobile device anyway. At the same time, attaching a data cable to first move your files from your phone to computer and then to the Google Drive would probably be very time-consuming. In short, the Sync function is ideal in all aspects.

#### **Batch Downloads for Adobe CC's Shared Assets (Linux/Mac)**

To get a link for downloading, you can share the files with yourself by entering your own email. Here's what you need to do:
\* In a new tab of your browser, open the developer tools. If you are using Chrome or Firefox, hitting the F12 key would do the job.
\* Head to the Network tab.
\* In the place of the address bar, enter the URL you received for shared assets.
\* Using adobe cc, filter the requests and then look for a long alphanumeric file name, which will contain the folder ID for sharing.
Now, head to the Terminal.
\* Using cd, navigate to the directory where you want to download the files.
\* Export your folder ID by: export FOLDER\_ID= \*insert ID here
\* Download the files using this command: curl [https://public.adobecc.com/files/${FOLDER\_ID}](https://public.adobecc.com/files/$%7BFOLDER_ID%7D) | jq '.children[] | “[https://public.adobecc.com/files/(env.FOLDER\_ID)/(.name)”](https://public.adobecc.com/files/(env.FOLDER_ID)/(.name)%E2%80%9D)' | xargs wget
Once downloaded, you can upload them to Google Drive!
Raza Ali Kazmi
Raza Ali Kazmi works as an editor and technology content writer at Sorcim Technologies (Pvt) Ltd. He loves to pen down articles on a wide array of technology related topics and has also been diligently testing software solutions on Windows & Mac platforms.

##### Share this post

Copyright © 2019 CloudDuplicateFinder.com. All Right Reserved.
