---
id_fonte: "a02a493e-a273-4d96-b4be-005e92339052"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "How to install node.js and npm on Ubuntu terminal using WSL2 in windows 10"
tipo: "unknown"
url_original: "https://stackoverflow.com/questions/72096407/how-to-install-node-js-and-npm-on-ubuntu-terminal-using-wsl2-in-windows-10"
keywords: "('Node.js installation', 'Ubuntu on WSL2', 'NVM configuration', 'Terminal troubleshooting', 'Package manager npm')"
summary: "This Stack Overflow forum thread addresses a common technical hurdle where developers encounter errors when trying to set up **Node.js and npm** within the **Windows Subsystem for Linux (WSL2)** environment. The discussion centers on the use of **nvm (Node Version Manager)** as the preferred installation method to prevent conflicts between the Linux terminal and the host Windows system. Expert contributors suggest that the most vital step after running installation scripts is to **restart the terminal** or refresh the configuration file to ensure the new commands are recognized. Ultimately, the source serves as a **troubleshooting guide** for programmers seeking to create a stable, isolated JavaScript development workspace on a Windows machine."
extraido_em: "2026-06-30T16:20:09Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# How to install node.js and npm on Ubuntu terminal using WSL2 in windows 10

How to install node.js and npm on Ubuntu terminal using WSL2 in windows 10 - Stack Overflow
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

### How to install node.js and npm on Ubuntu terminal using WSL2 in windows 10

Ask Question
Asked 3 years, 11 months ago
Modified 2 years, 8 months ago
Viewed 21k times
This question shows research effort; it is useful and clear
11
Save this question.
Show activity on this post.
I have problem with installing node.js and npm on my Ubuntu terminal (WSL2).
I tried to follow this instructions:
<https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl>
<https://github.com/MicrosoftDocs/windows-uwp/blob/docs/hub/dev-environment/javascript/nodejs-on-wsl.md>
Also see some videos on YouTube, but every time I have same error.
First, I run this command: sudo apt-get install curl
after I am trying to install nvm, with this command : curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh> | bash
after that it tells, that nvm is installed, but shows some errors(I will include img) and after that, I can't run this command to verify versions of node.js and npm :

```
Copycommand -v nvm  //or this command 
nvm ls
```

I already installed node.js in my windows, and when I open git bash and run this commands node -v and npm -v it shows me, which versions are installed. But as I use Ubuntu terminal with fish, I wanted to install node.js and npm on it too. Can someone tell me what I am doing wrong?
\* node.js
\* npm
\* terminal
\* windows-10
\* windows-subsystem-for-linux
Share
Share a link to this question <https://stackoverflow.com/q/72096407>
Copy link CC BY-SA 4.0
Improve this question
Follow
Follow this question to receive notifications
asked May 3, 2022 at 8:03
RostoRM
329 2 2 gold badges 3 3 silver badges 11 11 bronze badges
Add a comment |

#### 2 Answers 2

Sorted by: Reset to default
Highest score (default)
Trending (recent votes count more)
Date modified (newest first)
Date created (oldest first)
This answer is useful
22
Save this answer.
Show activity on this post.
It looks like it is installed. All OP needs to do is restart the terminal.
In my case, I've installed nvm with this instead

```
Copycurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Then restarted the terminal, and it is working.
Below will share the full process I've been through to install Node.js in WSL.
First of all, make sure one has WSL installed by following this. In this case OP already did that, so, just in case, would update the system's package

```
Copysudo apt-get update
```

Then, the following will install Node.js on WSL:
1. Install cURL (a tool used for downloading content from the internet in the command-line)

```
Copysudo apt-get install curl
```

```
1. Install nvm (there are alternatives to nvm - see the first note below) ( Source)
```

```
Copycurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Verify the installation with command -v nvm (it should output nvm ) Check Node versions available with nvm ls . 3. Install Node.js. There are various options to do that. Here will only consider installing: a) Current stable version (recommended for PRD):

```
Copynvm install --lts
```

b) Current release:

```
Copynvm install node
```

```
1. Check Node versions available
```

```
Copynvm ls
```

5. Verify Node.js installation node --version (or node -v ). 6. Verify npm installation with npm --version
   **Notes**
   * One might have to restart the terminal after each installation.
   * Additional trouble shooting notes on Linux.
   * There are alternatives to nvm, such as n , fnm ,... ( more about it)
   * Using Git on WSL.
   * Helpful VSCode extensions.
   * One can also use Node.js with Docker containers remote on WSL. Read more about it.
   * For more about it, read Microsoft's official documentation.
     Share
     Share a link to this answer <https://stackoverflow.com/a/75739322>
     Copy link CC BY-SA 4.0
     Improve this answer
     Follow
     Follow this answer to receive notifications
     edited Mar 15, 2023 at 8:12
     answered Mar 14, 2023 at 23:38
     Gonçalo Peres
     13.9k 5 5 gold badges 73 73 silver badges 97 97 bronze badges
     Sign up to request clarification or add additional context in comments.

#### 4 Comments

Add a comment
Nor.Z
Nor.Z Over a year ago
*All OP needs to do is restart the terminal.* (that worked for me)
2023-09-23T23:17:05.653Z+00:00
3
Reply
\* Copy link
TechWisdom
TechWisdom Over a year ago
You are a life server. I was skeptical, but nvm is the only thing that helped me to use a Typescript Node.js server in WSL2. Without nvm it seems that the normal Windows npm command was taking over, and yielding many strange & uninformative errors.
2025-01-20T21:26:12.58Z+00:00
2
Reply
\* Copy link
Zach M
Zach M Nov 12, 2025 at 23:48
I was stuck getting a specific package to cooperate on Windows, and I couldn't even get WSL to work... until now. Thank you.
2025-11-12T23:48:40.727Z+00:00
1
Reply
\* Copy link
Blesson
Blesson Feb 9 at 7:01
It all went the same as mentioned above till node --version at this command Im getting this error -bash: /root/.nvm/versions/node/v25.6.0/bin/node: cannot execute binary file: Exec format error
2026-02-09T07:01:24.84Z+00:00
0
Reply
\* Copy link
Add a comment
This answer is useful
3
Save this answer.
Show activity on this post.
I believe this may be because you need to restart your terminal, this is one of the troubleshooting tips given from the NVM github page.
There are not any errors when downloading so it is probably just that the .bashrc file was updated but not ran (you should be able to use source ~/.bashrc instead of restarting)
Share
Share a link to this answer <https://stackoverflow.com/a/72096563>
Copy link CC BY-SA 4.0
Improve this answer
Follow
Follow this answer to receive notifications
answered May 3, 2022 at 8:18
KibbeWater
343 3 3 silver badges 10 10 bronze badges

#### 1 Comment

Add a comment
RostoRM
RostoRM Over a year ago
after entering : source ~/.bashrc; it throw error : ~/.bashrc (line 6): 'case' builtin not inside of switch block case $- in ^ from sourcing file ~/.bashrc source: Error while reading file '/home/rostorm/.bashrc' I also restart Terminal ,but same problem . when I enter **command -v nvm** command nothing happens and **nvm ls** throws error Command 'nvm' not found
2022-05-03T09:10:26.307Z+00:00
0
Reply
\* Copy link

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
\* node.js
\* npm
\* terminal
\* windows-10
\* windows-subsystem-for-linux
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
\* Users online activity 7164 users online
\* 20 questions
\* 25 answers
\* 28 comments
\* 158 upvotes
Popular tags
excel javascript html java for-loop python

###### Related

75
Installing Node.js (and npm) on Windows 10
1
Nodejs and npm installation on Windows
4
npm commands not working on Bash on Ubuntu on Windows (WSL)
8
Windows Subsystem for Linux (WSL) using shared Node.js installation with Windows: Node.js npm & npx binaries not working
3
I can't use the npm command on Windows 10 with WSL2 ON (ubuntu terminal)
2
npm not installing packages on WSL
23
In WSL2: Ubuntu 20.04 for Windows 10 nodejs is installed but npm is not working
5
NVM on WSL2: cannot install Node, version not found
5
How to update npm in WSL 2 Ubuntu
2
How to run npm command correctly in WSL

###### Hot Network Questions

```
*  Why does the first exercise in The Study of Counterpoint call the notes E and F a fifth?
*  Subnormal subgroups of mapping class groups of surfaces
*  What are my non-chemical options for controlling the tick population?
*  What should I do when my residuals aren't normally distributed for a mediation analysis?
*  What kind of SIN is the fake SIN?
*  Why do the rules of senate appointment seem so inconsistent?
*  Why are BJTs predominantly used in audio circuits?
*  Near future Power Armor Specialized to survive in a Drone rich battlefield
*  How to get rid of a “Untrusted theme files have been blocked by the system administrator” message on Windows 11?
*  Fillomino: Corner offices
*  Can adding salt to cold water in steel pan damage the pot over time measurably more than if salt was added when water is boiling?
*  Is there a straightforward way to break and align an equation on more than one 'level'?
*  Do most philosophers believe that foreknowledge means that God has to determine everything?
*  Equation numbers with multiple alignments
*  First SIMD program
*  Separated Numbers
*  Jumping Frogs - Hit or Miss (How many will survive?)
*  How to best present an intermittent fault to mechanic
*  Why didn't God lead the Israelites out of Egypt same way Moses came in over the Peninsula
*  Group photograph of Ehrenfest in Göttingen (1901-1903)
*  J-K Flip Flop circuit not working
*  Help with Drum notation
*  Is this group action on cosets necessarily faithful?
*  Is it possible to have custom reload/restart-like commands in systemctl for a daemon?
```

Question feed

### Subscribe to RSS

Question feed
To subscribe to this RSS feed, copy and paste this URL into your RSS reader. <https://stackoverflow.com/feeds/question/72096407>
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
