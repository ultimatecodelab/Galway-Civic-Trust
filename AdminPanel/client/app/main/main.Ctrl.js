/*
All the functionalities of the landing page is managed from this file... When system admin logs into the website, this js file 
takes over of the events that occurs in the landing page.
*/
(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

 MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal',  '$http', '$alert', 'toursAPI', 'Upload']; //dependency injection
 function MainCtrl($scope, $state, Auth, $modal, $http, $alert, toursAPI, Upload) {
  //function MainCtrl($scope, $state, Auth, $modal) {
    $scope.user = Auth.getCurrentUser(); //currently logged in system user

    $scope.tour = {};
    $scope.tours = [];
	
    $scope.picPreview = true;
   
    $scope.busy = true;
    $scope.allData = [];
    var page = 0;
    var step = 3;

    var alertSuccess = $alert({
      title: 'Success! ',
      content: 'Updated',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 10
    })

    var alertFail = $alert({
      title: 'Couldn not update...',
      content: 'Could not update your tour',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    })

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    toursAPI.getAllTours()
      .then(function(data) {
        console.log('Tours found ');
        console.log(data);
		//change here
        $scope.tours = data.data;
        $scope.allData = data.data;
        $scope.nextPage();
        $scope.busy = false;
      })
      .catch(function(err) {
        console.log('failed to get tours ' + err);
      });
	  
	//deleting the tour
	$scope.deleteTour = function(tour) {
	    var index = $scope.tours.indexOf(tour); //updating the array
		console.log(tour._id);
		toursAPI.deleteTour(tour)
        .then(function(data) {
          console.log('success, location deleted');
         $scope.tours.splice(index, 1);
        })
        .catch(function(err) {
          console.log('failed to delete location' + err);
        });
	}
	//function to retrieve specific tour
	$scope.getSpecificTour = function (tour){
	toursAPI.getSpecificTour(tour)
	  .then(function(data) {
		console.log(data);
		 $scope.editTour = data.data;
		 $scope.tour=data
		 $scope.selectedIndex = $scope.tours.indexOf(tour);
	  })
	  .catch(function(err) {
		console.log('failed to get tour for user ' + err);
	  });
	}
      $scope.nextPage = function() {
        var lookLength = $scope.tours.length;
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
      };
   //function to update the tour
  $scope.updateTour = function(file) {
	console.log($scope.tour);
      Upload.upload({
        url: '/api/tour/updateTour',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
		  tourid : $scope.editTour._id,
          title: $scope.editTour.title,
		  description: $scope.editTour.description,
		  status:$scope.editTour.status,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
	   $scope.tours[$scope.selectedIndex] = resp.data;
        $scope.picPreview = false;
		alertSuccess.show();
       
      }, function(resp) {
		
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
	  
    }//uploadtours
  //function to upload a new tour
  $scope.uploadPic = function(file) {
	console.log($scope.tour);
      Upload.upload({
        url: '/api/tour/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title: $scope.tour.title,
		  description: $scope.tour.description,
		  status:$scope.tour.status,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
        console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       $scope.tours.splice(0, 0, resp.data);
	   $scope.tour.title = '';
        $scope.picFile = '';
        $scope.picPreview = false;
		alertSuccess.show();
       
      }, function(resp) {
		
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
	  
    }//uploadtours
	toursAPI.getAllTours();
  }
})();