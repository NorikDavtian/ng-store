ng-store
===================================================================
Angular Store
-------------------------------------------------------------------
A simple store CRUD application demo with Angular and Firebase.

+ Demo: https://ng-store.firebaseapp.com
+ Developer: Norik D. ([@NorikDavtian])
+ Site: [http://bigemployee.com][BigEmployee]
+ Contact: norik@bigemployee.com

Installation
-------------------------------------------------------------------
In order to get your local copy working follow these few steps.
1. Signup for Firebase, and add a new app from your dashboard: https://www.firebase.com/account/
 1. (Optional) Setup Free hosting provided by Firebase https://ng-demo.firebaseio.com/?page=Hosting and follow the instructions, or use your own hosting. You don't need this if you are running a local server but would be nice to use this as our staging server.
 2. Go to your newly created app url and Import `app-content/ng-store-export.json` file for our demo configurations.
3. change the `.value('fbURL', 'https://ng-store.firebaseio.com/');` in `app/main.js` and `app-admin/main.js` to your newly created firebase app URL.
4. Install Node modules by running `$ npm install`.. (Optional: add `-g` at the end if you want to save these modules globally)
5. Run Grunt tasks `$ grunt`

License
-------------------------------------------------------------------
MIT & GPL3

Credits
-------------------------------------------------------------------
This project was made possible thanks to these awesome projects.

 + AngularJS: https://angularjs.org/
 + Firebase: https://www.firebase.com/
 + Bower: http://bower.io/
 + Grunt: http://gruntjs.com/
 + npm: https://www.npmjs.org/
 + grunt-contrib-watch: https://github.com/gruntjs/grunt-contrib-watch
 + grunt-contrib-sass: https://github.com/gruntjs/grunt-contrib-sass
 + grunt-contrib-uglify: https://github.com/gruntjs/grunt-contrib-uglify
 + grunt-concurrent: https://github.com/sindresorhus/grunt-concurrent
 + Responsive Dashboard: https://github.com/Ehesp/Responsive-Dashboard
 + LiveReload: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en

[BigEmployee]: http://bigemployee.com
[@NorikDavtian]: http://twitter.com/NorikDavtian