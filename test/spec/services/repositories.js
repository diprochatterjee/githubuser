'use strict';

describe('Service: Repositories', function () {

  // load the service's module
  beforeEach(module('githubuserApp'));

  // instantiate service
  var Repositories, mockRepo, _;
  beforeEach(inject(function (_Repositories_,lodash) {
    Repositories = _Repositories_;
    _ = lodash;
    mockRepo = [
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
  }));

  it('should do something', function () {
    expect(!!Repositories).toBe(true);
  });

  it('should test the setter method for defined Repositories', function () {
    Repositories.setRepos(mockRepo);
    var repoList = Repositories.getRepos();
    var repoOwner = Repositories.getOwner();
    expect(repoList.length).toBe(mockRepo.length);
    _.forEach(repoList, function(eachRepo,index){
        expect(eachRepo.name).toBe(mockRepo[index].name);
        expect(eachRepo.url).toBe(mockRepo[index].html_url);
        if(mockRepo[index].description !== ''){
          expect(eachRepo.description).toBe(mockRepo[index].description);
        }
        else{
          expect(eachRepo.description).toBe('Sorry, this repo has no description');
        }
        
    });
    expect(repoOwner.name).toBe(mockRepo[0].owner.login);
    expect(repoOwner.avatarSrc).toBe(mockRepo[0].owner.avatar_url);
    expect(repoOwner.url).toBe(mockRepo[0].owner.html_url);
    
  });

  it('should test the setter method for undefined Repositories', function () {
    Repositories.setRepos();
    var emptyRepoList = Repositories.getRepos();
    expect(emptyRepoList.length).toBe(0);
    var repoOwner = Repositories.getOwner();
    expect(repoOwner.name).toBeUndefined();
  });

});
