(function() {
  'use strict';

  angular
    .module('app')
    .factory('toursAPI', toursAPI);

    toursAPI.$inject = ['$http'];

    function toursAPI($http) {
      return {
        getAllTours: getAllTours,
		getAllLocations: getAllLocations,
		getLocationsOfThisCategory: getLocationsOfThisCategory,
		deleteLocation: deleteLocation,
		getSpecificTour:getSpecificTour,
		deleteTour: deleteTour,
		getUpdateLocation:getUpdateLocation,
		updateLocation:updateLocation,
		linkExistingLocation:linkExistingLocation,
		unlinkLocation:unlinkLocation
      }
	  
	  //unlinking the location
	   function unlinkLocation(locAndTour){
		return $http.put('/api/tour/unlinkLocation/' + locAndTour.locationID,locAndTour);
	  }
	  //linking the location
	  function linkExistingLocation(locAndTour){
		return $http.put('/api/tour/linkLocation/' + locAndTour.locationID,locAndTour);
	  }
	  function updateLocation(location) {
        return $http.put('/api/tour/' + location._id, location);
      }
	//deleting the specific location from the database...
	 function deleteLocation(location) {
        return $http.delete('/api/tour/' + location._id);
      }
	  function deleteTour(tour) {
        return $http.delete('/api/tour/deleteTour/' + tour._id);
      }

      function getAllTours() {
        return $http.get('/api/tour/getAllTours', {
          //cache: true
        });
      }
	  
	  function getAllLocations() {
        return $http.get('/api/tour/getAllLocations', {
         // cache: true
        });
      }
	  //getting the details of the specific location
	  function getUpdateLocation(location) {
	  console.log("Passing " + location._id);
        return $http.get('/api/tour/' + location._id);
      }
	  function getSpecificTour(tour) {
	  console.log("All good up to here... " + tour._id);
        return $http.get('/api/tour/updateTour/' + tour._id);
      }

	function getLocationsOfThisCategory(id) {
        return $http.get('/api/tour/getLocations/?tourId=' + id, {
          //cache: true
        });
      }
    }
})();