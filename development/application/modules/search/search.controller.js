(function() {
  'use strict';
  angular.module('app').controller('SearchController', SearchController);
  SearchController.$inject = ['apiService'];

  function SearchController(apiService) {
    var vm = this;

    vm.pagination = {
      pageIndex: 1,
      pageSize: 1,
      totalItems: 10
    }
    vm.status = {
      showSearchResult: true,
      loadingSearchProduct: false
    }
    vm.searchQuery = ''
    vm.searchList = [
      {
        title: 'Tes 1',
        description: 'lalalala'
      },
      {
        title: 'Tes 1',
        description: 'lalalala'
      },
      {
        title: 'Tes 1',
        description: 'lalalala'
      },
      {
        title: 'Tes 1',
        description: 'lalalala'
      }
    ]
    vm.searchProduct = searchProduct;

    function searchProduct() {
      var endpoint = ''
      var resource = ''
      if (vm.searchQuery) {
        vm.status.loadingSearchProduct = true;
        apiService.get(endpoint, resource, {
          query: vm.searchQuery,
          size: vm.pagination.pageSize,
          from: vm.pagination.pageSize * (vm.pagination.pageIndex - 1)
        }).success(function(response, status) {
          if (response.data.results) {
            vm.searchList = response.data.results;
          } else {
            vm.searchList = []
          }
          vm.pagination.totalItems = response.data.total_hits;
          vm.status.loadingSearchProduct = false;
        }).error(function(response, status) {
          vm.searchList = [];
          vm.status.loadingSearchProduct = false;
          console.error(status, response);
        })
      }
    }

  }
})();
