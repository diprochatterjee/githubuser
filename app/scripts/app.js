'use strict';

/**
 * @ngdoc overview
 * @name githubuserApp
 * @description
 * # githubuserApp
 *
 * Main module of the application.
 */
angular
  .module('githubuserApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
   //
   $httpProvider.interceptors.push('loadingInterceptor');
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('user', {
      url: '/',
      templateUrl: 'views/user.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })
    .state('gitrepos', {
      url: '/repos',
      templateUrl: 'views/githubrepos.html',
      controller: 'GithubRepoCtrl',
      controllerAs: 'gitrepos'
    });
  });
