---
id_fonte: "77cba7d0-41f2-4358-8594-608000cb6f4a"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "File Naming Conventions - Harvard Biomedical Data Management"
tipo: "unknown"
url_original: "https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions"
keywords: "('File Naming Conventions', 'Research Data Management', 'Metadata Documentation', 'Version Control', 'Data Organization Strategies')"
summary: "This source outlines the importance of establishing a systematic **file naming convention** to ensure that research data remains **discoverable and organized** throughout its lifecycle. By creating a standardized framework for labels, researchers can **maximize access** to their records, prevent data loss, and facilitate smoother collaboration within professional environments. The guide details practical strategies for structuring names, such as using **descriptive metadata**, implementing **ISO-formatted dates** for chronological sorting, and avoiding spaces or special characters that can cause technical errors. Ultimately, the text emphasizes that documenting these rules in a **top-level README file** is essential for maintaining consistency and long-term clarity for all users of the data."
extraido_em: "2026-06-30T16:12:35Z"
extraido_por: "notebooklm-py-0.7.3"
---

# File Naming Conventions - Harvard Biomedical Data Management

File Naming Conventions | Data Management
Skip to main content
Campus Alert

#### Website Survey

Find a broken link? Something missing? Let us know how to improve this website for you! Fill out our feedback survey.
Close

#### Mobile Main Navigation

```
*  About
    *  What is Research Data Management?
    *  Data Management Terminology
    *  Where To Start
        *  RDM Lifecycle Checklist
        *  Data Management Onboarding
        *  Data Management Offboarding
        *  RDM Knowledge Transfer File
    *  News Articles
    *  RDM Newsletter
    *  RDM Projects
        *  Harvard Biomedical Data Management Website Subgroup
        *  Outreach and Training Subgroup
        *  Research Workflows and Metadata Subgroup
        *  Data Management Plans Subgroup
        *  Electronic Lab Notebooks Subgroup
    *  Who We Are
    *  Contact Us
*  Plan & Design
    *  Biomedical Data Lifecycle
    *  Clinical Data Management
    *  Data Policies and Compliance
    *  Data Management and Sharing Plan
        *  DMP Tool
        *  NIH Data Management and Sharing Plan
        *  NSF Data Management and Sharing Plan
    *  Active and Short Term Projects
    *  Roles and Responsibilities
    *  Directory Structure
    *  File Naming Conventions
*  Collect & Analyze
    *  Collaborative Tools & Software
    *  Electronic Lab Notebooks
        *  ELNs at LMA
    *  Documentation & Metadata
        *  README Files
        *  Data Dictionary
    *  Reproducibility
    *  Analysis Ready Datasets
    *  Image Management
    *  Version Control
*  Store & Evaluate
    *  Storage Options
    *  Data Safety
    *  Data Security
    *  Data Retention
    *  Archives and Records Management
    *  Data Destruction
*  Share & Publish
    *  Data Sharing
    *  Open Access
    *  Data Use Agreements
    *  Intellectual Property
    *  Scholarly Products
    *  Preprints & Publishing
    *  Data Repositories
        *  Harvard Dataverse
        *  Dryad
        *  figshare
        *  GigaDB
        *  IEEE DataPort
        *  Mendeley Data
        *  Open Science Framework
        *  Science Data Bank
        *  Synapse
        *  Vivli
        *  Zenodo
        *  NIH and NCBI Repositories
        *  Manuscript Repositories
*  Training & Events
    *  RDMWG Calendar
    *  RDM Seminar Series
    *  Harvard Library Open Access Week
    *  Harvard Library Love Data Week
    *  From Data to Discovery Series
```

#### Mobile Utility Navigation

```
*  Where To Start
*  Calendar
*  News
*  Contact
```

×
Menu

#### Utility Navigation

```
*  Where To Start
*  Calendar
*  News
*  Contact
```

Search

#### Main navigation

```
*  About
    *  What is Research Data Management?
    *  Data Management Terminology
    *  Where To Start
    *  News Articles
    *  RDM Newsletter
    *  RDM Projects
    *  Who We Are
    *  Contact Us
*  Plan & Design
    *  Biomedical Data Lifecycle
    *  Clinical Data Management
    *  Data Policies and Compliance
    *  Data Management and Sharing Plan
    *  Active and Short Term Projects
    *  Roles and Responsibilities
    *  Directory Structure
    *  File Naming Conventions
*  Collect & Analyze
    *  Collaborative Tools & Software
    *  Electronic Lab Notebooks
    *  Documentation & Metadata
    *  Reproducibility
    *  Analysis Ready Datasets
    *  Image Management
    *  Version Control
*  Store & Evaluate
    *  Storage Options
    *  Data Safety
    *  Data Security
    *  Data Retention
    *  Archives and Records Management
    *  Data Destruction
*  Share & Publish
    *  Data Sharing
    *  Open Access
    *  Data Use Agreements
    *  Intellectual Property
    *  Scholarly Products
    *  Preprints & Publishing
    *  Data Repositories
*  Training & Events
    *  RDMWG Calendar
    *  RDM Seminar Series
    *  Harvard Library Open Access Week
    *  Harvard Library Love Data Week
    *  From Data to Discovery Series
```

### File Naming Conventions

```
*  Plan & Design
    *  Biomedical Data Lifecycle
    *  Clinical Data Management
    *  Data Policies and Compliance
    *  Data Management and Sharing Plan
    *  Active and Short Term Projects
    *  Roles and Responsibilities
    *  Directory Structure
    *  File Naming Conventions
```

#### What are file naming conventions?

Image: xkcd. "Documents." Shared under CC-BY-NC License.
To maximize access to your records, we recommend establishing a naming convention for your files.
A file naming convention is a framework for naming your files in a way that describes what they contain and how they relate to other files.
File naming conventions help you stay organized and quickly identify your files. In a shared or collaborative group file-sharing setting, it will help others more easily navigate your work.
It is *essential* to establish a convention *before* you begin collecting files or data in order to prevent a backlog of unorganized content that will lead to misplaced or lost data!

#### Example File Names

##### No naming convention:

```
*  Test data 2016.xlsx
*  Meeting notes Jan 17.doc
*  Notes Eric.txt
*  Final FINAL last version.docx
```

##### With a naming convention:

```
*  20160104_ProjectA_Ex1Test1_SmithE_v1.xlsx
*  20160104_ProjectA_MeetingNotes_SmithE_v2.docx
*  ExperimentName_InstrumentName_CaptureTime_ImageID.tif
```

#### Tips for File Naming

The following tips were adapted from Briney, K. A. (2020, June 2). File Naming Convention Worksheet. California Institute of Technology. This resource was recently awarded a 2023 DataWorks! Prize Significant Achievement Award.
[

##### Think about your files

What related files are you working with?](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
\* Identify what group of files your naming convention will cover
\* You can use different conventions for different file sets
\* Check for established file naming conventions in your discipline or group
*Example: This convention will apply to all of my microscopy files, from raw image through processed image.*
[

##### Identify metadata (for example, date, sample, experiment)

What information is needed to easily locate a specific file?](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
The computer arranges files by name, character by character. Therefore, put the most important information first. If you anticipate wanting to find a file by date, then put the date first. The file name should be descriptive and provide just enough contextual information.
Consider including a combination of the following information:
\* Experiment conditions
\* Type of data
\* Researcher name/initials
\* Lab name/location
\* Project or experiment name or acronym
\* Date or date range of experiment
\* A good format for date designations is **YYYYMMDD** . This format makes sure all of your files stay in chronological order. To add a timestamp to your filename, use the format YYYYMMDDThhmm.
\* Experiment number or sample ID
\* When using a sequential numbering system, use leading zeros for clarity and ensure files sort in sequential order. For example, use "001, 002, ...010, 011 ... 100, 101 ..." instead of "1, 2, ...10, 11 ... 100, 101 ..."
*Example: For my images, I want to know the date, sample ID, and image number for that sample on that date.*
[

##### Abbreviate or encode metadata

Don't forget to document any codes!](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
\* Decide what shortened information to keep
\* Standardize the categories and/or replace them with 2- or 3-letter codes
\* Be sure to document these codes!
*Example: Sample ID will use a code made up of: a 2-letter project abbreviation (project 1 = P1, project 2 = P2), a 3-letter species abbreviation (mouse = “MUS”, fruit fly = “DRS”), and 3-digit sample ID (assigned in lab notebook).*
[

##### Use versioning

Are you maintaining different versions of the same file?](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
\* Use versioning to indicate the most current version of a file
\* Track versions of a file by adding version information to end of the file name, e.g. filename\_v2.xxx
\* Use a version number (e.g. “v01” or “v02”)
\* Use the version date (use ISO 8601 format: YYYYMMDD or YYYY-MM-DD)
[

##### Think about how you will search for your files

What comes first?](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
\* Think about how you want to sort and search for your files in order to determine the order for the metadata in the file name
\* Decide what metadata should appear at the beginning
\* Use default ordering: alphabetically, numerically, or chronologically
\* Use ISO 8601-formatted dates (YYYYMMDD or YYYY-MM-DD)
[

##### Deliberately separate metadata elements

Avoid spaces or special characters in your file names](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
Determine the characters you will use to separate each piece of metadata in the file. Many computer systems cannot handle spaces in file names, so do not use spaces!
\* Use dashes (-), underscores (\_), or capitalize the first letter of each word
\* Dashes: file-name.xxx
\* Underscores: file\_name.xxx
\* No separation: filename.xxx
\* Camel case (the first letter of each section of text is capitalized): FileName.xxx
\* Avoid special characters, such as: ~ ! @ # $ % ^ & \* ( ) ` ; : < > ? . , [ ] { } ' " |
*Example: I will use underscores to separate metadata and dashes between parts of my sample ID.*
[

##### Write down your naming conventions

Include a top-level README file on how to navigate the structure](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
Naming conventions should be documented so that others in your lab or department can follow this standard. Document naming conventions in a README.txt and keep it with your files!
\* If the file is moved or shared, users will be able to identify the file from its file name.
\* File names should be 40-50 characters and conventions should only use alphanumeric characters, dashes, underscores
\* If you find that you are encoding a large amount of metadata in the file names, you should consider storing this metadata in a master spreadsheet with your data for future reference.
*Example: My file naming convention is [SA-MPL-EID][YYYYMMDD][###]\_[status].[tif]*
[

##### Additional Resources

Get started with naming conventions!](<https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>)
\* File Naming Conventions Checklist by the LMA RDMWG
\* File Naming Convention Worksheet by Kristin Briney, Caltech Library
\* File organization for reproducible research by Data Carpentry
Facebook linkedin instagram youtube
401 Park Drive
Suite 505
Boston, MA 02215
(617) 384-8500

#### Footer

```
*  Privacy Policy
*  Accessibility
*  Digital Accessibility
*  Questions
*  RDM Newsletter
*  Harvard RDM
```

#### User account menu

```
*  Log in
```

© 2026 by the President and Fellows of Harvard College
