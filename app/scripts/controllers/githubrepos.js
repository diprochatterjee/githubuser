'use strict';

/**
 * @ngdoc function
 * @name githubuserApp.controller:GithubRepoCtrl
 * @description
 * # GithubRepoCtrl controllerAs: gitrepos
 * Controller of the githubuserApp to list the repositories belonging to a Github username requested by the end user.
 * Dependencies : Factory recipe - Repositories. Invokes getter method to get the instance of repositories.
 * 												 Invokes setter method with no argument to garbage collect the instance.
 */
angular.module('githubuserApp')
  .controller('GithubRepoCtrl', function (Repositories,$state,$timeout) {
  	var self = this;

  	var goHome = function(){
  		//garbage collect the object holding the list of repositories belonging to an user 
  		//by calling the setter method with no argument.
  		Repositories.setRepos();
  		// take the user to home page by calling the user state. User can re-enter another username.
  		$state.go('user');
  	};

    var pageChanged = function(){
      var startOfPageIndex = (self.currentPage - 1) * self.reposPerPage;
      var endOfPageIndex = startOfPageIndex + self.reposPerPage;
      self.currentPageRepoList =  self.list.slice(startOfPageIndex,endOfPageIndex);
    };
    var changeReposPerPage = function(reposPerPage){
      self.reposPerPage = reposPerPage;
      self.changePage();
    };
  	self.initController = function(){
  		self.emptyList = false;
      self.currentPage = 1;
      self.reposPerPage = 5;
  		//store repositories list in controllerAs variable by calling the getter method of Factory Recipe Repositories.
  		self.list = Repositories.getRepos();
      self.owner = Repositories.getOwner();
      self.goHome = goHome;
      self.changePage = pageChanged;
      self.changeReposPerPage = changeReposPerPage;
  		if(self.list.length === 0){
  			self.emptyList = true;
  			self.errorMessage = 'Sorry, no repos found for this user. You will be redirected to the home screen. Please enter another user name';
        $timeout(self.goHome, 3000);
  		} else {
        self.changePage();
      }
  	};

    
  	self.initController();
  });
