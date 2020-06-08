// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "i18n":"i18n",
      "jquery": "jquery",
      "nls":"../nls"
    }
});
requirejs(["app/main","../plugin/animation"]);
