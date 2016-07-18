'use strict';

describe('Directive: loadingicon', function () {

  // load the directive's module
  beforeEach(module('githubuserApp'));

  var element,scope,rootScope,httpBackend;

  beforeEach(inject(function ($rootScope,$compile,$httpBackend) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    httpBackend = $httpBackend;
    httpBackend.expect('GET','views/user.html').respond('<html></html>');
    spyOn(rootScope, '$broadcast').and.callThrough();
    element = angular.element('<div loadingicon></div>');
    element = $compile(element)(scope);
    rootScope.$digest();
    httpBackend.flush();
  }));

  it('should show loading icon', function () {
    spyOn(element,'show').and.callThrough();
    spyOn(element,'hide').and.callThrough();
    rootScope.$broadcast('show_loading_icon');
    rootScope.$digest();
    expect(rootScope.$broadcast).toHaveBeenCalled();
    expect(element.find('img').attr('class')).toBe('ajax-loader');
    expect(element.find('img').attr('src')).toBe('../../images/hourglass.gif');
    //expect(element.show).toHaveBeenCalled();
    expect(element.hide).not.toHaveBeenCalled();
  });

   it('should hide loading icon', function () {
    spyOn(element,'show').and.callThrough();
    spyOn(element,'hide').and.callThrough();
    rootScope.$broadcast('hide_loading_icon');
    rootScope.$digest();
    expect(rootScope.$broadcast).toHaveBeenCalled();
    expect(element.find('img').attr('class')).toBe('ajax-loader');
    expect(element.find('img').attr('src')).toBe('../../images/hourglass.gif');
    //expect(element.hide).toHaveBeenCalled();
    expect(element.show).not.toHaveBeenCalled();
  });

});
