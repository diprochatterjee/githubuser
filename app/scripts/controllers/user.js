'use strict';

/**
 * @ngdoc function
 * @name githubuserApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubuserApp
 */
angular.module('githubuserApp')
  .controller('UserCtrl', function (GithubInvoker,Repositories,$state) {
    var self = this;
    var successCallback = function(response){
    	Repositories.setRepos(response);
    	$state.go('gitrepos');
    };
    var errorCallback = function(reason){
    	self.error = true;
        if(reason !== null){
    		self.errorMessage = 'Sorry, username : '+self.input+' is '+reason.message;	
    	}
    	else {
    		self.errorMessage = 'Sorry, the Github API is not working!';
    	}
    	self.input = '';
    };
    var callGithubService = function(){
        var promise = GithubInvoker.invokeGithub(self.input);
        promise.then(successCallback, errorCallback);    
    };
    var resetController = function(){
    	self.errorMessage = '';
	    self.error = false;
    };
    var initController = function(){
    	self.input = '';
	    resetController();
	    self.enter = callGithubService;
	    self.reset = resetController;
    };
    initController();
  });
