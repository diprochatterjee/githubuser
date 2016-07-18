'use strict';

describe('Service: GithubInvoker', function () {

  // load the service's module
  beforeEach(module('githubuserApp'));

  // instantiate service
  var GithubInvoker, httpBackend, rootScope;
  beforeEach(inject(function (_GithubInvoker_,$httpBackend,$rootScope) {
    GithubInvoker = _GithubInvoker_;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    //jasmine.getJSONFixtures().fixturesPath='base/test/mock';
    httpBackend.expect('GET','views/user.html').respond('<html></html>');
  }));

  it('should do something', function () {
    expect(!!GithubInvoker).toBe(true);
  });

  it('should call the Github API for a mock username', function () {
    spyOn(GithubInvoker,'invokeGithub').and.callThrough();
    var mockUserName = 'diprochatterjee';
    var url = 'https://api.github.com/users/'+mockUserName+'/repos';
    //var fixture = getJSONFixture('mockGithubRepoResponse.json');
    var mockResponse = [
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
      }
    ];
    httpBackend.when('GET',url).respond(200,mockResponse);
    GithubInvoker.invokeGithub(mockUserName);
    httpBackend.flush();
  });


it('should call the Github API for a mock username and get rejected', function () {
    spyOn(GithubInvoker,'invokeGithub').and.callThrough();
    var mockUserName = 'kebos7';
    var url = 'https://api.github.com/users/'+mockUserName+'/repos';
    //var fixture = getJSONFixture('mockGithubRepoResponse.json');
    var errorResponse = {
      "message" : "not found!"
    };
    httpBackend.when('GET',url).respond(404,errorResponse);
    GithubInvoker.invokeGithub(mockUserName);
    httpBackend.flush();
  });

});
