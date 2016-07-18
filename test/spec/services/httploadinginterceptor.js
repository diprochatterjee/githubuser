'use strict';

describe('Service: loadingInterceptor', function () {

  // load the service's module
  beforeEach(module('githubuserApp'));

  // instantiate service
  var loadingInterceptor, rootScope, httpBackend;
  beforeEach(inject(function (_loadingInterceptor_,$rootScope,$httpBackend) {
    loadingInterceptor = _loadingInterceptor_;
    rootScope = $rootScope;
    httpBackend = $httpBackend;
    spyOn(rootScope,'$broadcast');
  }));

  it('should do something', function () {
    expect(!!loadingInterceptor).toBe(true);
  });

  it('should check for pending request', function () {
    loadingInterceptor.request({headers: {} });
    expect(rootScope.$broadcast).toHaveBeenCalledWith('show_loading_icon');
  });
});
