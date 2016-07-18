'use strict';

describe('Controller: GithubRepoCtrl', function () {

  // load the controller's module
  beforeEach(module('githubuserApp'));

  var gitrepos, Repositories, mockRepos, mockOwner, state,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Repositories_, $state) {
    scope = $rootScope.$new();
    Repositories = _Repositories_;
    state = $state;
    gitrepos = $controller('GithubRepoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should test initController method and check the initial load', function () {
    mockRepos = [
    {
        "name": "bootstrap",
        "url": "https://github.com/diprochatterjee/bootstrap",
        "description": "Native AngularJS (Angular) directives for Bootstrap. Small footprint (5kB gzipped), no 3rd party JS dependencies (jQuery, bootstrap JS) required. Please read the README.md file before submitting an issue!"
      },
      {
        "name": "bootstrap1",
        "url": "https://github.com/diprochatterjee/bootstrap1",
        "description": ""
      }
    ];   
    mockOwner = {
                "name": "diprochatterjee",
                "avatarSrc": "https://avatars.githubusercontent.com/u/11376745?v=3",
                "url": "https://github.com/diprochatterjee",
    };
    spyOn(gitrepos,'initController').and.callThrough();
    spyOn(Repositories,'getRepos').and.returnValue(mockRepos);
    spyOn(Repositories,'getOwner').and.returnValue(mockOwner);
    gitrepos.initController();
    scope.$digest();
    expect(gitrepos.emptyList).toBeFalsy();
    expect(gitrepos.list.length).toBe(2);
    expect(gitrepos.currentPage).toBe(1);
    expect(gitrepos.reposPerPage).toBe(5);
    expect(angular.isFunction(gitrepos.goHome)).toBeTruthy();
    expect(angular.isFunction(gitrepos.changePage)).toBeTruthy();
    expect(angular.isFunction(gitrepos.changeReposPerPage)).toBeTruthy();
  });

it('should test initController method and check the initial load for an empty list', function () {
    mockRepos = [
    ];   
    mockOwner = {
                "name": "lara",
                "avatarSrc": "https://avatars.githubusercontent.com/u/11376745?v=3",
                "url": "https://github.com/lara",
    };
    spyOn(gitrepos,'initController').and.callThrough();
    spyOn(Repositories,'getRepos').and.returnValue(mockRepos);
    spyOn(Repositories,'getOwner').and.returnValue(mockOwner);
    gitrepos.initController();
    scope.$digest();
    expect(gitrepos.emptyList).toBeTruthy();
    expect(gitrepos.list.length).toBe(0);
    expect(gitrepos.currentPage).toBe(1);
    expect(gitrepos.reposPerPage).toBe(5);
    expect(gitrepos.errorMessage).toBe('Sorry, no repos found for this user. You will be redirected to the home screen. Please enter another user name');
    expect(angular.isFunction(gitrepos.goHome)).toBeTruthy();
    expect(angular.isFunction(gitrepos.changePage)).toBeTruthy();
    expect(angular.isFunction(gitrepos.changeReposPerPage)).toBeTruthy();
  });

  it('should go and check other users by going home', function () {
    spyOn(Repositories,'setRepos');
    spyOn(state,'go');
    gitrepos.goHome();
    expect(Repositories.setRepos).toHaveBeenCalledWith();
    expect(state.go).toHaveBeenCalledWith('user');
  });

  it('should change number of repositories listed per page', function () {
    spyOn(gitrepos,'changePage');
    gitrepos.reposPerPage = 5;
    expect(gitrepos.reposPerPage).toBe(5);
    gitrepos.changeReposPerPage(10);
    expect(gitrepos.reposPerPage).toBe(10);
    expect(gitrepos.changePage).toHaveBeenCalled();
    gitrepos.changeReposPerPage(5);
    expect(gitrepos.reposPerPage).toBe(5);
    expect(gitrepos.changePage).toHaveBeenCalled();
  });

  it('should change the page and show new list of repos', function () {
    gitrepos.list = [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17
    ];
    gitrepos.currentPage = 2;
    gitrepos.reposPerPage = 5;
    gitrepos.changePage();
    expect(gitrepos.currentPageRepoList.length).toBe(gitrepos.reposPerPage);
    expect(gitrepos.currentPageRepoList[0]).toBe(gitrepos.list[5]);
  });

});
