(function() {
  'use strict';

  angular
    .module('app')
    .factory('toursAPI', toursAPI);

    toursAPI.$inject = ['$http'];

    function toursAPI($http) {
      return {
        getAllTours: getAllTours
      }

      function getAllTours() {
        return $http.get('/api/tour/getAllTours', {
          cache: true
        });
      }

  

    
    }
})();