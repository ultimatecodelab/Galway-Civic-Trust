(function() {
  'use strict';

  angular
    .module('app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope', '$stateParams', 'Auth', '$modal',  '$http', '$alert','Upload','toursAPI'];

  function LocationController($scope, $stateParams,Auth,$modal, $http, $alert,Upload,toursAPI) {

    $scope.user = Auth.getCurrentUser();
    $scope.id = $stateParams.tourId;
	$scope.tourSpot = [];
	$scope.editLocation = {};
	
	$scope.selectedIndex = 0;
	$scope.selectedLocation = $scope.tourSpot[0];
	$scope.selectedIndex = $scope.tourSpot[0];
	$scope.editLocation2 = null;
	$scope.updatedlocation = null;
	
	
	//getting tours from the toursAPI
	$scope.tours = [];
	 toursAPI.getAllTours()
      .then(function(data) {
        console.log('TOURS found ');
        console.log(data);
        $scope.tours = data.data;
      })
      .catch(function(err) {
        console.log('failed to get tours ' + err);
      });
	  
	$scope.selectLocation = function (spot,index){
		$scope.selectedIndex = index;
		$scope.selectedLocation = spot;
		
		$scope.editLocation = function(location) {
		console.log("passed this shit: " + location._id);
		toursAPI.getUpdateLocation(location)
        .then(function(data) {
		//console.log("new Data");
          console.log(data);
          $scope.editLocation = data.data;
		  $scope.updatedlocation = $scope.editLocation;
        })
        .catch(function(err) {
          console.log('failed to edit location ' + err);
        });
		}
	}
	$scope.saveLocation = function() {
	  console.log("here.....................")
      var location = $scope.editLocation;

      toursAPI.updateLocation(location)
        .then(function(data) {
          console.log('Location updated');
          console.log(data);
          /*$scope.editLocation.title = '';
          $scope.editLocation.description = '';*/
          alertSuccess.show();
        })
        .catch(function(err) {
          console.log('failed to update' + err);
          alertFail.show();
        });
		
    }//save location
  
	 var alertSuccess = $alert({
      title: 'Success! ',
      content: 'New Location added',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    })

    var alertFail = $alert({
      title: 'Not saved',
      content: 'New Location failed to save',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
	 
    })
	$scope.nextPage = function() {
        var tourLength = $scope.tours.length;
        if($scope.busy) {
          return;
        }
        $scope.busy = true;
        $scope.tours = $scope.tours.concat($scope.allData.splice(page * step, step));
        page++;
        $scope.busy = false;
        if($scope.tours.length === 0) {
          $scope.noMoreData = true;
        }
      }; //infinite scrolling page
	
	//getting the tour locations based on the tourID 
	console.log("id is: " + $scope.id);
	
	$scope.init = function (){
	toursAPI.getLocationsOfThisCategory($scope.id)
	  .then(function(data) {
		console.log(data);
		$scope.tourSpot = data.data;
	  })
	  .catch(function(err) {
		console.log('failed to get looks for user ' + err);
	  });
	 }
	  
	  //deleting the specific location from the API
	  $scope.deleteLocation = function(location) {
	    var index = $scope.tourSpot.indexOf(location); //updating the array
      toursAPI.deleteLocation(location)
        .then(function(data) {
          console.log('success, location deleted');
         $scope.tourSpot.splice(index, 1);
		 $scope.selectedLocation = $scope.tourSpot[0];
        })
        .catch(function(err) {
          console.log('failed to delete location' + err);
        });
    }
	
	$scope.uploadPic = function(file) {
	console.log($scope.tour);
      Upload.upload({
        url: '/api/tour/uploadLocation',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title: $scope.tourSpot.title,
		  tourId : $stateParams.tourId,
		  location: $scope.tourSpot.location,
          description: $scope.tourSpot.description,
		  xCoordinate : $scope.tourSpot.xCoordinate,
		  yCoordinate : $scope.tourSpot.yCoordinate,
		  imageSource: $scope.tourSpot.imageSource,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
        console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.tourSpot.title = '';
        $scope.tourSpot.description = '';
		$scope.tourSpot.xCoordinate = ' ' ;
		$scope.tourSpot.yCoordinate = ' ' ;
		$scope.tourSpot.imageSource = ' ' ;
		$scope.tourSpot.location = ' ' ;
        $scope.tourSpot = '';
        $scope.picPreview = false;
       
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
     }//uploadtours
	}
})();