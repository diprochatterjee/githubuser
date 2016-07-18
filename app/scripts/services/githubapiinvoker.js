'use strict';

/**
 * @ngdoc service
 * @name githubuserApp.githubAPIInvoker
 * @description
 * # githubAPIInvoker
 * Service in the githubuserApp.
 */
angular.module('githubuserApp')
  .service('GithubInvoker', function ($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   
    var urlParser = function(username){
    	return 'https://api.github.com/users/'+username+'/repos';
    };
    
    this.invokeGithub = function(username){
    	 var deferred = $q.defer();
    	 var successCallback = function(response){
    		deferred.resolve(response.data);
    	 };	
    	 var errorCallback = function(reason){
    	 	deferred.reject(reason.data);
    	 };
    	var url = urlParser(username);
    	$http({
		  method: 'GET',
		  url: url
		}).then(successCallback,errorCallback);
		return deferred.promise;
    };
  });
