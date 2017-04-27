(function () {
  'use strict';
  angular.module('app').factory('apiService', apiService);

  apiService.$inject = ['$http'];
  function apiService($http) {
    var service = {
      get: get,
      post: post,
      put: put,
      delete: del,
      patch: patch
    };
    return service;

    function get(endpoint, resource, query, headers, cache, timeout) {
      return $http.get(endpoint + '/' + resource, { headers: headers, params: query, cache: cache, timeout: timeout });
    }

    function post(endpoint, resource, request, query, headers) {
      return $http.post(endpoint + '/' + resource, request, { headers: headers, params: query });
    }

    function put(endpoint, resource, request, query, headers) {
      return $http.put(endpoint + '/' + resource, request, { headers: headers, params: query });
    }

    function del(endpoint, resource, query, headers) {
      return $http.delete(endpoint + '/' + resource, { headers: headers, params: query });
    }

    function patch(endpoint, resource, request, query, headers) {
      return $http.patch(endpoint + '/' + resource, request, { headers: headers, params: query });
    }

  }
})();
