# painlessTitle

painlessTitle is an [angular](https://angularjs.org/) module to manipulate titles in angular apps with a simple and easy (painless) way.

[![NPM](https://nodei.co/npm/angular-painless-title.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/angular-painless-title)

## Install

* directly from the git repository: ```git clone https://github.com/Anubisss/angular-painless-title ```
* from the [npm](https://www.npmjs.com/) registry: ```npm install angular-painless-title```
* from the [bower](http://bower.io/) registry: ```bower install angular-painless-title```

## Usage

Include the script and you have to set up the ng-app at the html element, then you bind the title element.
```html
<!doctype html>
<html ng-app="dummyApp">
<head>
  <!-- You should define a title value, so a robot can read this title without JavaScript. -->
  <title ng-bind="page.title">My Site</title>
  <script src="angular.js"></script>
  <script src="angular-route.js"></script>
  <script src="angular-painless-title.js"></script>
  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/home.js"></script>
</head>
<body>
  <!-- The head title. You can get the head title which you set in a router or in a controller. -->
  <h1 ng-bind="page.headTitle"></h1>
  <div ng-view></div>
</body>
</html>
```

Inject the module then config it and bootstrap (instantiate) the painlessTitle factory.
```javascript
var dummyApp = angular.module('dummyApp', ['angularPainlessTitle']);

dummyApp.config(
['painlessTitleProvider', function(painlessTitleProvider) {
  painlessTitleProvider.setSuffix('My Site');
  painlessTitleProvider.setSeparator('|');
  // You should set up a router here.
}])
.run(['painlessTitle', function(painlessTitle) {
  // You can remove this line, just make sure to instantiate painlessTitle.
  painlessTitle.setTitle('');
}]);
```

Now you can set a title (dynamic) from a controller.
```javascript
var dummyAppControllers = angular.module('dummyAppControllers', ['angularPainlessTitle']);

dummyAppControllers.controller('HomeController', ['painlessTitle', function(painlessTitle) {
  painlessTitle.setTitle('Home'); // complete title: Home | My Site
}]);
```

Or you can set a title (static) from a router if you don't need a controller (static view).
```javascript
$routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController' // complete title (specified in the controller): Home | My Site
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    title: 'About' // complete title: About | My Site
  })
  .when('/no_title', {
    templateUrl: 'views/no_title.html' // no controller, no title from the router, so complete title: My Site
  })
;
```

If you don't set a title you will have just the title suffix as a complete title, eg.: My Site

## Demo

* [Preview](http://plnkr.co/z96mQJ), just don't forget to run the demo in fullscreen (separate window) to see title changes.
* [Source](http://plnkr.co/edit/z96mQJ)
* [Fullscreen version](http://run.plnkr.co/plunks/z96mQJ/)

## License

The MIT License (MIT)
