/**
 * @license painlessTitle
 * Copyright (c) 2015 David Vas <anuka|Anubisss>, http://anuka.me/
 * Licensed under the MIT License (MIT).
 */

(function(window, angular, undefined) {'use strict';

// A simple and easy to use (painless) module to manipulate titles in angular apps.
// The title suffix and the separator can be specified in the app's config.
// The title can be set from a router (when) or from a controller.
var angularPainlessTitleModule = angular.module('angularPainlessTitle', []);

angularPainlessTitleModule.provider('painlessTitle', [function() {

  // Suffix, basically this is the "main" title of the page.
  var titleSuffix = '';

  // Separator, the string between the title and the title suffix.
  var titleSeparator = '';

  // Sets the title suffix.
  this.setSuffix = function(suffix) {
    titleSuffix = suffix;
  };

  // Sets the title separator.
  this.setSeparator = function(separator) {
    titleSeparator = separator;
  };

  this.$get = ['$rootScope', function($rootScope) {

    // Sets the complete (merged) and the head title.
    // You can use this title like this: <title ng-bind="page.title">HTML title</title>
    // and the head eg.: <h3 ng-bind="page.headTitle"></h3>
    $rootScope.page = {
      setTitle: function(headTitle, completeTitle) {
        this.title = completeTitle;
        this.headTitle = headTitle;
      }
    };

    // Called after a route dependencies are resolved.
    // The title from a router is processed here.
    $rootScope.$on('$routeChangeSuccess', function(event, current) {
      titleChanger.setTitle(current.$$route.title);
    });

    var titleChanger = {
      setTitle: function(title) {
        // Merges the complete title then sets it.
        $rootScope.page.setTitle(title ? title : titleSuffix,
                                 title ? // truthy check
                                 title + ' ' + titleSeparator + ' ' + titleSuffix :
                                 titleSuffix);
      }
    };

    return titleChanger;
  }];
}]);

})(window, window.angular);
