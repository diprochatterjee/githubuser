'use strict';

/**
 * @ngdoc factory
 * @name githubuserApp.httploadinginterceptor
 * @description
 * # httploadinginterceptor
 * Factory in the githubuserApp.
 */
angular.module('githubuserApp')
  .factory('loadingInterceptor', function ($q, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   var httpRequestCounter = 0;

    return {
        request: function (config) {

            httpRequestCounter++;

            // Show loader
            $rootScope.$broadcast("show_loading_icon");
            return config || $q.when(config);

        },
        response: function (response) {

            if ((--httpRequestCounter) === 0) {
                // Hide loader
                $rootScope.$broadcast("hide_loading_icon");
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--httpRequestCounter)) {
                // Hide loader
                $rootScope.$broadcast("hide_loading_icon");
            }

            return $q.reject(response);
        }
    };

  });
