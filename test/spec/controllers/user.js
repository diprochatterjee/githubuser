'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('githubuserApp'));

  var user, mockResponse, deferred, GithubInvoker, Repositories, state,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _GithubInvoker_, _Repositories_, $httpBackend,  $state) {
    scope = $rootScope.$new();
    user = $controller('UserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    state = $state;
    deferred = $q.defer();
    GithubInvoker = _GithubInvoker_;
    Repositories = _Repositories_;
    $httpBackend.whenGET('views/githubrepos.html').respond('<html></html>');
  }));

  it('should enter a username and invoke the github api, set Repositories and transition state to gitrepos', function () {
    spyOn(user,'enter').and.callThrough();
    spyOn(GithubInvoker, 'invokeGithub').and.returnValue(deferred.promise);
    spyOn(Repositories, 'setRepos').and.callThrough();
    spyOn(state, 'go').and.callThrough();
    mockResponse = [
    {
        "id": 34481646,
        "name": "bootstrap",
        "full_name": "diprochatterjee/bootstrap",
        "owner": {
                "login": "diprochatterjee",
                "avatar_url": "https://avatars.githubusercontent.com/u/11376745?v=3",
                "html_url": "https://github.com/diprochatterjee",
         },
        "html_url": "https://github.com/diprochatterjee/bootstrap",
        "description": "Native AngularJS (Angular) directives for Bootstrap. Small footprint (5kB gzipped), no 3rd party JS dependencies (jQuery, bootstrap JS) required. Please read the README.md file before submitting an issue!"
      },
      {
        "id": 34481647,
        "name": "bootstrap1",
        "full_name": "diprochatterjee/bootstrap1",
        "owner": {
                "login": "diprochatterjee",
                "avatar_url": "https://avatars.githubusercontent.com/u/11376745?v=3",
                "html_url": "https://github.com/diprochatterjee",
         },
        "html_url": "https://github.com/diprochatterjee/bootstrap1",
        "description": ""
      }
      ];   
    deferred.resolve(mockResponse);
    user.input = 'diprochatterjee';
    scope.$digest();
    user.enter();
    scope.$digest();
    expect(Repositories.setRepos).toHaveBeenCalledWith(mockResponse);
    expect(state.go).toHaveBeenCalledWith('gitrepos');
  });


  it('should enter a username and get an error while invoking the github api', function () {
    spyOn(user,'enter').and.callThrough();
    spyOn(GithubInvoker, 'invokeGithub').and.returnValue(deferred.promise);
    mockResponse = {
      "message" : "Not found!"
    };   
    deferred.reject(mockResponse);
    user.input = 'diprochatterjee';
    var expectedErrorMessage = 'Sorry, username : '+user.input+' is '+mockResponse.message;
    scope.$digest();
    user.enter();
    scope.$digest();
    expect(user.error).toBeTruthy();
    expect(user.errorMessage).toBe(expectedErrorMessage);
  });

  it('should enter a username and fail to invoke the github api', function () {
    spyOn(user,'enter').and.callThrough();
    spyOn(GithubInvoker, 'invokeGithub').and.returnValue(deferred.promise);
    deferred.reject(null);
    user.input = 'diprochatterjee';
    var expectedErrorMessage = 'Sorry, the Github API is not working!';
    scope.$digest();
    user.enter();
    scope.$digest();
    expect(user.error).toBeTruthy();
    expect(user.errorMessage).toBe(expectedErrorMessage);
  });

  it('should test the reset method', function () {
    user.reset();
    scope.$digest();
    expect(user.error).toBeFalsy();
    expect(user.errorMessage).toBe('');
  });

});
