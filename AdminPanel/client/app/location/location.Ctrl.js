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
	$scope.locations={};
	
	$scope.locModal={}; //modal to bind with the form
	
	$scope.editLocation = {};
	$scope.selectedIndex = 0;
	$scope.selectedLocation = $scope.tourSpot[0];
	$scope.selectedIndex = $scope.tourSpot[0];
	$scope.editLocation2 = null;
	$scope.updatedlocation = null;
	$scope.buttonStatus = "Link";
	
	//unlink Location
	$scope.unlinkLocation = function(locToUnlink) {
		var index = $scope.tourSpot.indexOf(locToUnlink); //index of the location in an array tourSpot
		
		$scope.pair={"locationID":locToUnlink._id, "TourID":$scope.id};
		
		toursAPI.unlinkLocation($scope.pair)
        .then(function(data) {
          console.log('unlinked Successfully');
          console.log(data);
		  $scope.tourSpot.splice(index, 1);
		  $scope.selectedLocation = $scope.tourSpot[0];
        })
        .catch(function(err) {
          console.log('failed to update' + err);
          //alertFail.show();
        });
		
    }//unlinkLocation
	
	$scope.linkExistingLocation = function(locToLink) {
		$scope.pair={"locationID":locToLink._id, "TourID":$scope.id};
		toursAPI.linkExistingLocation($scope.pair)
        .then(function(data) {
          console.log('Linked Successfully');
          console.log(data);
		  
		  $scope.tourSpot.splice(0, 0, data.data);//modal array
		  console.log("The title is: " + data.data._id);
		  //$scope.tourSpot.data=data.data;
		  //$scope.init();
		  
        })
        .catch(function(err) {
          console.log('failed to update' + err);
          alertFail.show();
        });
		
    }//linkExistingLocation
  
	//retriving all the locations. Admin will be able to select the 
	//existing location and map with a new tour...
	$scope.locations=[]; //holds all the locations
	toursAPI.getAllLocations()
      .then(function(data) {
        console.log(data);
        $scope.locations = data.data;
		console.log($scope.locations);
      })
      .catch(function(err) {
        console.log('failed to get locations ' + err);
      });
	  
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
	
	//image update location....
	$scope.updateCurrentLocation = function(file) {
	//console.log($scope.tour);
      Upload.upload({
        url: '/api/tour/updateCurrentLocation',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
		  locationID : $scope.editLocation._id,
          title: $scope.editLocation.title,
		  description: $scope.editLocation.description,
		  location: $scope.editLocation.location,
		  xCoordinate: $scope.editLocation.xCoordinate,
		  yCoordinate: $scope.editLocation.yCoordinate,
		  imageSource: $scope.editLocation.imageSource,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
        //console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      // $scope.tourSpot.splice(0, 0, resp.data);
	   var location = $scope.editLocation;
	   var index = $scope.tourSpot.indexOf($scope.selectedLocation); 
		$scope.tourSpot[index] = resp.data;
	   $scope.editLocation.title = '';
        $scope.picFile = '';
        $scope.picPreview = false;
		alertSuccess.show();
       
      }, function(resp) {
		
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      });
	  
    }//uploadtours
	
	//------------------------------------------
	$scope.saveLocation = function() {
      var location = $scope.editLocation;
	  var index = $scope.tourSpot.indexOf($scope.selectedLocation); 
      toursAPI.updateLocation(location)
        .then(function(data) {
          console.log('Location updated');
          console.log(data);
          alertSuccess.show();
		  $scope.tourSpot[index] = data.data; //details changed
		 
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
		 $scope.locations.splice(index,1); //deleting from the modal
		 $scope.selectedLocation = $scope.tourSpot[0];
        })
        .catch(function(err) {
          console.log('failed to delete location' + err);
        });
    }
	
	$scope.uploadPic = function(file) {
	  //console.log($scope.tour);
      Upload.upload({
        url: '/api/tour/uploadLocation',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title: $scope.locModal.title,
		  tourId : $stateParams.tourId,
		  location: $scope.locModal.location,
          description: $scope.locModal.description,
		  xCoordinate : $scope.locModal.xCoordinate,
		  yCoordinate : $scope.locModal.yCoordinate,
		  imageSource: $scope.locModal.imageSource,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
		$scope.tourSpot.splice(0, 0, resp.data);
        console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.picPreview = false;
       
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }//uploadtours
	console.log("calling init");
	$scope.init();
	console.log("After init");
	 
	}//upload pic
	
})();