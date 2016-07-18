'use strict';

/**
 * @ngdoc service
 * @name githubuserApp.repositories
 * @description
 * # repositories
 * Factory in the githubuserApp.
 */
angular.module('githubuserApp')
  .factory('Repositories', function (lodash) {
    // Service logic

    // instance holder of the object describing list of repositories belonging to an user
    var listofrepos; 
    var owner; 
    var initPrivateVars = function(){
      listofrepos = [];
      owner = {};
    };
    initPrivateVars();
    //constructor function to instantiate the object describing list of repositories belonging to an user
    var Repository = function(repo){
      this.name = repo.name;
      this.url = repo.html_url;
      this.description = repo.description ? repo.description : 'Sorry, this repo has no description';
    };

    var Owner = function(repoOwner){
      this.name = repoOwner.login;
      this.avatarSrc = repoOwner.avatar_url;
      this.url = repoOwner.html_url;
    };

    // Public API here
    return {
      setRepos: function(repositories) {
        if(repositories && repositories.length > 0){
          owner = new Owner(repositories[0].owner);
          lodash.forEach(repositories, function(repo){
            listofrepos.push(new Repository(repo));
          });  
        }
        else {
          initPrivateVars();
        }
      },
      getRepos: function () {
        return listofrepos;
      },
      getOwner : function(){
        return owner;
      }
    };
  });
