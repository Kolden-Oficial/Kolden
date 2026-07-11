---
id_fonte: "253b7ff4-e1db-4e20-bb10-604e5a51874a"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "TypeScript error when using registerRichText with Lexical Editor: \"Excessive stack depth comparing types 'LexicalEditor' and 'LexicalEditor'\" - Stack Overflow"
tipo: "unknown"
url_original: "https://stackoverflow.com/questions/79307888/typescript-error-when-using-registerrichtext-with-lexical-editor-excessive-sta"
keywords: "('TypeScript error', 'Lexical Editor', 'Excessive stack depth', 'Version mismatch', 'Rich text features')"
summary: "This Stack Overflow thread addresses a common **TypeScript transpilation error** that occurs when developers attempt to integrate the Lexical rich text editor. Users reported an **\"Excessive stack depth\"** message, which stems from a **version mismatch** between the core Lexical library and its specific plugin packages. The discussion reveals that the issue is often caused by **inconsistent type declarations** across different software versions, specifically highlighting problems in releases 0.20.0 and 0.22.0. To resolve this, developers must ensure that the **core library and plugins are synchronized** to the same version to allow for a clean, non-recursive type comparison during the build process."
extraido_em: "2026-06-30T16:22:25Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# TypeScript error when using registerRichText with Lexical Editor: "Excessive stack depth comparing types 'LexicalEditor' and 'LexicalEditor'" - Stack Overflow

javascript - TypeScript error when using registerRichText with Lexical Editor: "Excessive stack depth comparing types 'LexicalEditor' and 'LexicalEditor'" - Stack Overflow
By clicking “Sign up”, you agree to our terms of service and acknowledge you have read our privacy policy.
Sign up with Google
Sign up with GitHub

### OR

Email
Password
Sign up
Already have an account? Log in
Skip to main content
1.

```
1. [Home](https://stackoverflow.com/)
2. [Questions](https://stackoverflow.com/questions)
3. [AI Assist](https://stackoverflow.com/ai-assist)
4. [Tags](https://stackoverflow.com/tags)
5.
6. [Challenges](https://stackoverflow.com/beta/challenges)
7. [Chat](https://chat.stackoverflow.com/?tab=explore)
8. [Articles](https://stackoverflow.blog/contributed?utm_medium=referral&utm_source=stackoverflow-community&utm_campaign=so-blog&utm_content=experiment-articles)
9. [Users](https://stackoverflow.com/users)
10.
11. [Companies](https://stackoverflow.com/jobs/companies?so_medium=stackoverflow&so_source=SiteNav)
12. [Collectives](javascript:void(0))
13. Communities for your favorite technologies. [Explore all Collectives](https://stackoverflow.com/collectives-all)
```

```
1. Stack Internal Stack Overflow for Teams is now called  **Stack Internal** . Bring the best of human thought and AI automation together at your work. Try for free Learn more
1. Stack Internal
1. Bring the best of human thought and AI automation together at your work. Learn more
```

###### Collectives™ on Stack Overflow

Find centralized, trusted content and collaborate around the technologies you use most.
Learn more about Collectives
**Stack Internal**
Knowledge at work
Bring the best of human thought and AI automation together at your work.
Explore Stack Internal
1. About
1. Products
1. For Teams
1. Try new site Try BETA
1. Stack Internal Implement a knowledge platform layer to power your enterprise and AI tools.
1. Stack Data Licensing Get access to top-class technical expertise with trusted & attributed content.
1. Stack Ads Connect your brand to the world's most trusted technologist communities.
1. Releases Keep up-to-date on features we add to Stack Overflow and Stack Internal.
1. About the company Visit the blog
Loading…
1.

##### current community

```
*  Stack Overflow help chat
    *  Meta Stack Overflow
```

##### your communities

Sign up or log in to customize your list.

##### more stack exchange communities

company blog 2. 3. Log in 4. Sign up

### Let's set up your homepage Select a few topics you're interested in:

python javascript c# reactjs java android html flutter c++ node.js typescript css r php angular next.js spring-boot machine-learning sql excel ios azure docker
Or search from our full list:
\* javascript
\* python
\* java
\* c#
\* php
\* android
\* html
\* jquery
\* c++
\* css
\* ios
\* sql
\* mysql
\* r
\* reactjs
\* node.js
\* arrays
\* c
\* asp.net
\* json
\* python-3.x
\* .net
\* ruby-on-rails
\* sql-server
\* swift
\* django
\* angular
\* objective-c
\* excel
\* pandas
\* angularjs
\* regex
\* typescript
\* ruby
\* linux
\* ajax
\* iphone
\* vba
\* xml
\* laravel
\* spring
\* asp.net-mvc
\* database
\* wordpress
\* string
\* flutter
\* postgresql
\* mongodb
\* wpf
\* windows
\* xcode
\* amazon-web-services
\* bash
\* git
\* oracle-database
\* spring-boot
\* dataframe
\* azure
\* firebase
\* list
\* multithreading
\* docker
\* vb.net
\* react-native
\* eclipse
\* algorithm
\* powershell
\* macos
\* visual-studio
\* numpy
\* image
\* forms
\* scala
\* function
\* vue.js
\* performance
\* twitter-bootstrap
\* selenium
\* winforms
\* kotlin
\* loops
\* dart
\* express
\* sqlite
\* hibernate
\* matlab
\* python-2.7
\* shell
\* rest
\* apache
\* entity-framework
\* android-studio
\* csv
\* maven
\* linq
\* qt
\* dictionary
\* unit-testing
\* asp.net-core
\* facebook
\* apache-spark
\* tensorflow
\* file
\* swing
\* class
\* unity-game-engine
\* sorting
\* date
\* authentication
\* go
\* symfony
\* t-sql
\* opencv
\* matplotlib
\* .htaccess
\* google-chrome
\* for-loop
\* datetime
\* codeigniter
\* perl
\* http
\* validation
\* sockets
\* google-maps
\* object
\* uitableview
\* xaml
\* oop
\* visual-studio-code
\* if-statement
\* cordova
\* ubuntu
\* web-services
\* email
\* android-layout
\* github
\* spring-mvc
\* elasticsearch
\* kubernetes
\* selenium-webdriver
\* ms-access
\* ggplot2
\* parsing
\* user-interface
\* pointers
\* google-sheets
\* c++11
\* security
\* machine-learning
\* google-apps-script
\* ruby-on-rails-3
\* templates
\* flask
\* nginx
\* variables
\* exception
\* sql-server-2008
\* gradle
\* debugging
\* tkinter
\* delphi
\* listview
\* jpa
\* asynchronous
\* haskell
\* web-scraping
\* jsp
\* pdf
\* ssl
\* amazon-s3
\* google-cloud-platform
\* xamarin
\* testing
\* jenkins
\* wcf
\* batch-file
\* generics
\* npm
\* ionic-framework
\* network-programming
\* unix
\* recursion
\* google-app-engine
\* mongoose
\* visual-studio-2010
\* .net-core
\* android-fragments
\* assembly
\* animation
\* math
\* rust
\* svg
\* session
\* intellij-idea
\* hadoop
\* join
\* winapi
\* curl
\* django-models
\* laravel-5
\* next.js
\* url
\* heroku
\* http-redirect
\* tomcat
\* inheritance
\* google-cloud-firestore
\* webpack
\* gcc
\* swiftui
\* image-processing
\* keras
\* asp.net-mvc-4
\* logging
\* dom
\* matrix
\* pyspark
\* actionscript-3
\* button
\* post
\* optimization
\* firebase-realtime-database
\* cocoa
\* jquery-ui
\* xpath
\* iis
\* d3.js
\* web
\* javafx
\* firefox
\* xslt
\* internet-explorer
\* caching
\* select
\* asp.net-mvc-3
\* opengl
\* events
\* asp.net-web-api
\* plot
\* dplyr
\* encryption
\* magento
\* stored-procedures
\* search
\* amazon-ec2
\* ruby-on-rails-4
\* memory
\* multidimensional-array
\* canvas
\* audio
\* random
\* jsf
\* vector
\* redux
\* cookies
\* input
\* facebook-graph-api
\* flash
\* indexing
\* xamarin.forms
\* arraylist
\* ipad
\* cocoa-touch
\* data-structures
\* video
\* model-view-controller
\* azure-devops
\* serialization
\* apache-kafka
\* jdbc
\* razor
\* awk
\* woocommerce
\* routes
\* mod-rewrite
\* servlets
\* excel-formula
\* beautifulsoup
\* filter
\* iframe
\* docker-compose
\* design-patterns
\* aws-lambda
\* text
\* visual-c++
\* django-rest-framework
\* cakephp
\* mobile
\* android-intent
\* struct
\* react-hooks
\* methods
\* groovy
\* mvvm
\* lambda
\* ssh
\* time
\* checkbox
\* ecmascript-6
\* grails
\* installation
\* google-chrome-extension
\* cmake
\* sharepoint
\* shiny
\* spring-security
\* jakarta-ee
\* plsql
\* android-recyclerview
\* core-data
\* types
\* sed
\* meteor
\* android-activity
\* bootstrap-4
\* activerecord
\* replace
\* websocket
\* graph
\* group-by
\* scikit-learn
\* vim
\* file-upload
\* boost
\* junit
\* memory-management
\* sass
\* async-await
\* import
\* deep-learning
\* error-handling
\* eloquent
\* dynamic
\* dependency-injection
\* silverlight
\* soap
\* layout
\* apache-spark-sql
\* charts
\* deployment
\* browser
\* gridview
\* svn
\* while-loop
\* google-bigquery
\* vuejs2
\* highcharts
\* dll
\* ffmpeg
\* view
\* foreach
\* makefile
\* plugins
\* redis
\* c#-4.0
\* reporting-services
\* jupyter-notebook
\* unicode
\* merge
\* reflection
\* https
\* server
\* google-maps-api-3
\* twitter
\* oauth-2.0
\* extjs
\* terminal
\* pip
\* axios
\* split
\* cmd
\* encoding
\* pytorch
\* django-views
\* collections
\* database-design
\* hash
\* automation
\* netbeans
\* ember.js
\* data-binding
\* build
\* tcp
\* pdo
\* apache-flex
\* sqlalchemy
\* entity-framework-core
\* concurrency
\* command-line
\* spring-data-jpa
\* printing
\* react-redux
\* java-8
\* lua
\* html-table
\* neo4j
\* ansible
\* service
\* jestjs
\* enums
\* parameters
\* flexbox
\* material-ui
\* module
\* promise
\* visual-studio-2012
\* outlook
\* mysqli
\* web-applications
\* uwp
\* webview
\* firebase-authentication
\* jquery-mobile
\* utf-8
\* python-requests
\* datatable
\* parallel-processing
\* colors
\* drop-down-menu
\* scipy
\* tfs
\* scroll
\* hive
\* count
\* syntax
\* ms-word
\* twitter-bootstrap-3
\* ssis
\* fonts
\* rxjs
\* constructor
\* file-io
\* google-analytics
\* paypal
\* three.js
\* powerbi
\* cassandra
\* graphql
\* discord
\* graphics
\* compiler-errors
\* gwt
\* react-router
\* socket.io
\* backbone.js
\* memory-leaks
\* solr
\* url-rewriting
\* datatables
\* nlp
\* terraform
\* oauth
\* datagridview
\* drupal
\* zend-framework
\* oracle11g
\* knockout.js
\* triggers
\* interface
\* neural-network
\* django-forms
\* casting
\* angular-material
\* jmeter
\* linked-list
\* google-api
\* path
\* timer
\* django-templates
\* arduino
\* orm
\* windows-phone-7
\* directory
\* proxy
\* parse-platform
\* visual-studio-2015
\* cron
\* conditional-statements
\* push-notification
\* functional-programming
\* primefaces
\* pagination
\* model
\* jar
\* xamarin.android
\* hyperlink
\* uiview
\* visual-studio-2013
\* vbscript
\* google-cloud-functions
\* azure-active-directory
\* gitlab
\* jwt
\* download
\* swift3
\* sql-server-2005
\* rspec
\* pygame
\* process
\* configuration
\* properties
\* callback
\* combobox
\* windows-phone-8
\* linux-kernel
\* safari
\* scrapy
\* emacs
\* permissions
\* x86
\* clojure
\* scripting
\* raspberry-pi
\* io
\* scope
\* azure-functions
\* compilation
\* mongodb-query
\* responsive-design
\* nhibernate
\* expo
\* angularjs-directive
\* reference
\* architecture
\* binding
\* bluetooth
\* request
\* dns
\* playframework
\* 3d
\* version-control
\* pyqt
\* discord.js
\* doctrine-orm
\* package
\* f#
\* rubygems
\* get
\* sql-server-2012
\* tree
\* autocomplete
\* datepicker
\* kendo-ui
\* openssl
\* jackson
\* yii
\* controller
\* grep
\* nested
\* xamarin.ios
\* static
\* null
\* transactions
\* statistics
\* datagrid
\* active-directory
\* uiviewcontroller
\* dockerfile
\* webforms
\* sas
\* computer-vision
\* discord.py
\* phpmyadmin
\* notifications
\* duplicates
\* pycharm
\* youtube
\* mocking
\* nullpointerexception
\* yaml
\* menu
\* blazor
\* sum
\* plotly
\* bitmap
\* visual-studio-2008
\* asp.net-mvc-5
\* floating-point
\* yii2
\* css-selectors
\* stl
\* android-listview
\* jsf-2
\* electron
\* time-series
\* cryptography
\* ant
\* hashmap
\* character-encoding
\* msbuild
\* stream
\* asp.net-core-mvc
\* sdk
\* google-drive-api
\* jboss
\* selenium-chromedriver
\* joomla
\* devise
\* cuda
\* navigation
\* cors
\* frontend
\* anaconda
\* background
\* multiprocessing
\* binary
\* pyqt5
\* camera
\* iterator
\* linq-to-sql
\* mariadb
\* onclick
\* ios7
\* android-jetpack-compose
\* microsoft-graph-api
\* android-asynctask
\* rabbitmq
\* tabs
\* amazon-dynamodb
\* environment-variables
\* laravel-4
\* uicollectionview
\* insert
\* linker
\* coldfusion
\* xsd
\* console
\* continuous-integration
\* upload
\* textview
\* ftp
\* opengl-es
\* macros
\* operating-system
\* mockito
\* localization
\* formatting
\* xml-parsing
\* json.net
\* type-conversion
\* data.table
\* vuejs3
\* kivy
\* timestamp
\* integer
\* calendar
\* segmentation-fault
\* android-ndk
\* prolog
\* char
\* drag-and-drop
\* crash
\* jasmine
\* azure-pipelines
\* dependencies
\* automated-tests
\* geometry
\* fortran
\* android-gradle-plugin
\* itext
\* sprite-kit
\* mfc
\* header
\* attributes
\* nosql
\* format
\* firebase-cloud-messaging
\* nuxt.js
\* odoo
\* db2
\* jquery-plugins
\* event-handling
\* julia
\* jenkins-pipeline
\* leaflet
\* annotations
\* flutter-layout
\* keyboard
\* nestjs
\* postman
\* arm
\* textbox
\* stripe-payments
\* visual-studio-2017
\* gulp
\* libgdx
\* uikit
\* timezone
\* synchronization
\* azure-web-app-service
\* dom-events
\* wso2
\* google-sheets-formula
\* xampp
\* crystal-reports
\* aggregation-framework
\* namespaces
\* android-emulator
\* uiscrollview
\* swagger
\* jvm
\* sequelize.js
\* com
\* chart.js
\* snowflake-cloud-data-platform
\* subprocess
\* html5-canvas
\* geolocation
\* webdriver
\* garbage-collection
\* sql-update
\* dialog
\* centos
\* concatenation
\* numbers
\* widget
\* qml
\* tuples
\* set
\* java-stream
\* mapreduce
\* ionic2
\* smtp
\* android-edittext
\* windows-10
\* nuget
\* rotation
\* modal-dialog
\* spring-data
\* radio-button
\* doctrine
\* http-headers
\* grid
\* lucene
\* sonarqube
\* xmlhttprequest
\* listbox
\* initialization
\* switch-statement
\* internationalization
\* boolean
\* components
\* apache-camel
\* google-play
\* gdb
\* ios5
\* serial-port
\* return
\* ldap
\* youtube-api
\* pivot
\* eclipse-plugin
\* latex
\* frameworks
\* tags
\* containers
\* c++17
\* subquery
\* github-actions
\* embedded
\* dataset
\* foreign-keys
\* asp-classic
\* label
\* uinavigationcontroller
\* delegates
\* copy
\* struts2
\* google-cloud-storage
\* migration
\* protractor
\* base64
\* uibutton
\* queue
\* find
\* sql-server-2008-r2
\* arguments
\* composer-php
\* append
\* jaxb
\* stack
\* zip
\* tailwind-css
\* cucumber
\* autolayout
\* ide
\* entity-framework-6
\* iteration
\* popup
\* r-markdown
\* windows-7
\* vb6
\* clang
\* g++
\* airflow
\* hover
\* ssl-certificate
\* jqgrid
\* range
\* gmail
Next You'll be prompted to create an account to view your personalized homepage.

### TypeScript error when using registerRichText with Lexical Editor: "Excessive stack depth comparing types 'LexicalEditor' and 'LexicalEditor'"

Ask Question
Asked 1 year, 3 months ago
Modified 1 year, 3 months ago
Viewed 441 times
This question shows research effort; it is useful and clear
2
Save this question.
Show activity on this post.
I'm working on implementing a rich text editor using the Lexical library with vanilla JavaScript and TypeScript. My understanding is that the editor should be attached to a contenteditable div, and the registerRichText function should enable rich text features like bold, italic, and underline.
I'm encapsulating the editor setup in a class. Here's the code:

```
Copyimport { registerRichText } from '@lexical/rich-text';
import { createEditor } from 'lexical';

export class CustomLexicalEditor {
  private config = {
    namespace: 'MyEditor',
    theme: {
      text: {
        bold: 'text-bold',
        italic: 'text-italic',
        underline: 'text-underline',
      },
    },
    onError: console.error,
  };

  initialize(
    editorContainer: HTMLElement,
    toolbarContainer: HTMLElement,
    placeholder?: string,
  ): void {
    const editorPlaceholder = placeholder || 'Start typing...';

    const editor: LexicalEditor = createEditor(this.config);
    editor.setRootElement(editorContainer);

    registerRichText(editor);
  }
}
```

I can successfully create the editor and set the root element, but when I call registerRichText with the editor instance, I get the following TypeScript error: Excessive stack depth comparing types 'LexicalEditor' and 'LexicalEditor'.ts(2321)
Here's the relevant HTML for the editorContainer:

```
Copy<div class="custom-text-editor__box" contenteditable></div>
```

I've been stuck on this issue for quite some time. Does anyone know why this type mismatch occurs and how to resolve it? Any help would be greatly appreciated!
It seems like the LexicalEditor instance I created doesn't match the type expected by registerRichText. I tried casting the editor to LexicalEditor, but the problem persists.
\* javascript
\* typescript
\* lexicaljs
Share
Share a link to this question <https://stackoverflow.com/q/79307888>
Copy link CC BY-SA 4.0
Improve this question
Follow
Follow this question to receive notifications
asked Dec 25, 2024 at 15:40
Cristian David Rodríguez
31 1 1 silver badge 3 3 bronze badges
2
\* See this question. Your error is happening at *transpilation time* , not runtime, and has to do with the structure of your type graph. Pointy – Pointy 2024-12-25 15:43:17 +00:00 Commented Dec 25, 2024 at 15:43
\* guessing that Lexical already uses the name LexicalEditor , so use something different (and if your file is named LexicalEditor.ts , try changing that too) jdigital – jdigital 2024-12-25 15:51:35 +00:00 Commented Dec 25, 2024 at 15:51
Add a comment |

#### 2 Answers 2

Sorted by: Reset to default
Highest score (default)
Trending (recent votes count more)
Date modified (newest first)
Date created (oldest first)
This answer is useful
1
Save this answer.
Show activity on this post.
I solved the error. This error seems to happen because the use of plugin I was using for @lexical/rich-text-editor was in version 0.22.0 and lexical was in version 0.21.0. The issue was happening because the declarations for both versions were different.
If someone has the same issue try being sure the versions installed for plugins and core library are the same
Share
Share a link to this answer <https://stackoverflow.com/a/79324940>
Copy link CC BY-SA 4.0
Improve this answer
Follow
Follow this answer to receive notifications
answered Jan 2, 2025 at 20:50
Cristian David Rodríguez
31 1 1 silver badge 3 3 bronze badges
Sign up to request clarification or add additional context in comments.

#### Comments

Add a comment
This answer is useful
0
Save this answer.
Show activity on this post.
I had this same issue. It seems to depend on which version of Lexical you are using. From my own personal experimentation:
The error appears in versions 0.20.0 and 0.20.1 .
The error does not appear in versions 0.19.0 , 0.20.2 , and 0.21.0 .
I didn't test any other versions. If you began your project mid-late November and installed the latest version at that time, you would have installed one of the versions that has the problem in it.
Share
Share a link to this answer <https://stackoverflow.com/a/79320972>
Copy link CC BY-SA 4.0
Improve this answer
Follow
Follow this answer to receive notifications
answered Jan 1, 2025 at 0:33
Dave Andrea
31 4 4 bronze badges

#### Comments

Add a comment

#### Your Answer

Thanks for contributing an answer to Stack Overflow!
\* Please be sure to *answer the question* . Provide details and share your research!
But *avoid* …
\* Asking for help, clarification, or responding to other answers.
\* Making statements based on opinion; back them up with references or personal experience.
To learn more, see our tips on writing great answers.
Draft saved
Draft discarded

##### Sign up or log in

Sign up using Google
Sign up using Email and Password
Submit

##### Post as a guest

Name
Email
Required, but never shown

##### Post as a guest

Name
Email
Required, but never shown
Post Your Answer Discard
By clicking “Post Your Answer”, you agree to our terms of service and acknowledge you have read our privacy policy.
Start asking to get answers
Find the answer to your question by asking.
Ask question
Explore related questions
\* javascript
\* typescript
\* lexicaljs
See similar questions with these tags.
\* The Overflow Blog
\* Seizing the means of messenger production
\* How can you test your code when you don't know what's in it?
\* Featured on Meta
\* Retiring the beta site
\* Policy: Generative AI (e.g., ChatGPT) is banned
Report this ad
Community activity
Last 1 hr
\* Users online activity 5100 users online
\* 11 questions
\* 21 answers
\* 48 comments
\* 111 upvotes
Popular tags
python-3.11 python javascript c c++ sorting

###### Linked

2
Typescript 4.5 excessive stack depth comparing types

###### Related

0
Having issues with my implementation of Lexical in my React typescript and tailwinds project
504
Defining array with multiple types in TypeScript
549
How to watch and reload ts-node when TypeScript files change
4
Split text node
358
Set types on useState React Hook with TypeScript
1
document.execCommand('bold') not working in react js
12
Restrict paste in contenteditable (HTML / JS)
0
TinyMCE editor how to select with cursor custom HTML element?
2
How do I make a basic WYSIWYG editor?

###### Hot Network Questions

```
*  What kind of SIN is the fake SIN?
*  What form does kinetic energy take in the classical Lagrangian?
*  Delete Indeterminate from a 3D table?
*  How to correctly write \hom_{k\text{-alg}}?
*  What is the Importance of Logic in Buddhist soteriology?
*  What is this pen-like mouse-like device that connects to a probably-computer via a connector I dunno what it is?
*  Evolutionary benefit of seashells with soft inner surface
*  Can a journal correct a misspelling of a name in the acknowledgements?
*  "Onomat-appear" - a straightforward wordsearch?
*  What should I do when my residuals aren't normally distributed for a mediation analysis?
*  How to colorized any line drawed with draw (nor with plot expression)?
*  J-K Flip Flop circuit not working
*  How do system programmers think?
*  Do those who later identify as “ex-Christians” remain saved under the “once saved, always saved” doctrine?
*  Calibrating the Hull-White model to caps
*  Using GenAI for PhD Research: Productivity vs Enjoyment
*  Choosing the null hypothesis for a financial stress indicator
*  How to create a hexagonal (icosphere-style) capsule in Geometry Nodes?
*  Proof of the first law of thermodynamics for high school students
*  What are these things on Chell's legs?
*  Pascal's triangle, without the 1's, with n rows: For which values of n can the triangle be split into two connected regions of equal sums?
*  Can you Magical Hack a Magical Hack?
*  Why does the first exercise in The Study of Counterpoint call the notes E and F a fifth?
*  In English relative clauses, when is preposition stranding allowed and when is it not?
```

Question feed

### Subscribe to RSS

Question feed
To subscribe to this RSS feed, copy and paste this URL into your RSS reader. <https://stackoverflow.com/feeds/question/79307888>
lang-js

### Why are you flagging this comment?

[-] 45
Probable spam.
This comment promotes a product, service or website while failing to disclose the author's affiliation. [-] 20
Unfriendly or contains harassment/bigotry/abuse.
This comment is unkind, insulting or attacks another person or group. Learn more in our Abusive behavior policy. [-] 39
Not needed.
This comment is not relevant to the post.

```

```

Enter at least 6 characters [-] 19
Something else.
A problem not listed above. Try to be as specific as possible.

```

```

Enter at least 6 characters
Flag comment Cancel
You have 0 flags left today

### Hang on, you can't upvote just yet.

You'll need to complete a few actions and gain 15 reputation points before being able to upvote. **Upvoting** indicates when questions and answers are useful. What's reputation and how do I get it?
Instead, you can save this post to reference later.
Save this post for later Not now

###### Stack Overflow

```
*  Questions
*  Help
*  Chat
```

###### Business

```
*  Stack Internal
*  Stack Data Licensing
*  Stack Ads
```

###### Company

```
*  About
*  Press
*  Work Here
*  Legal
*  Privacy Policy
*  Terms of Service
*  Contact Us
*  Your Privacy Choices
*  Cookie Policy
```

###### Stack Exchange Network

```
*  Technology
*  Culture & recreation
*  Life & arts
*  Science
*  Professional
*  Business
*  API
*  Data
*  Blog
*  Facebook
*  Twitter
*  LinkedIn
*  Instagram
```

Site design / logo © 2026 Stack Exchange Inc; user contributions licensed under CC BY-SA . rev 2026.4.2.41748
By continuing to use this website, you agree Stack Exchange can store cookies on your device and disclose information in accordance with our Cookie Policy. By exiting this window, default cookies will be accepted. To reject cookies, select an option from below.
Necessary cookies only
Customize settings
