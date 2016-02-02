(function() {
  'use strict';

  angular
    .module('app')
    .factory('toursAPI', toursAPI);

    toursAPI.$inject = ['$http'];

    function toursAPI($http) {
      return {
        getAllTours: getAllTours,
		getLocationsOfThisCategory: getLocationsOfThisCategory
		 //getUserTours: getUserTours
      }

      function getAllTours() {
	  
        return $http.get('/api/tour/getAllTours', {
          cache: true
        });
      }

   function getLocationsOfThisCategory(id) {
        return $http.get('/api/tour/getLocations/?tourId=' + id, {
          cache: true
        });
      }
	
    
    }
})();