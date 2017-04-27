(function () {
  'use strict';
  angular.module('app').config(config);
  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        controller: 'SearchController',
        templateUrl: 'application/modules/search/search.html',
        controllerAs: 'vm'
      })
    $urlRouterProvider.when('', '/search');
    $urlRouterProvider.otherwise('/404');
  }

})();
