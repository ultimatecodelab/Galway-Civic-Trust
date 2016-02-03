(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);
  
  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal',  '$http', '$alert','Upload','toursAPI'];

 function MainCtrl($scope, $state, Auth, $modal, $http, $alert,Upload,toursAPI) {

    $scope.user = Auth.getCurrentUser();

	$scope.tour = {};

    $scope.tours = [];
	
	//---------------init---------------
	$scope.tour.title = "Arjun";
	/*$scope.tour.location = "Galway";
	$scope.tour.description = "Description";
	$scope.tour.xCoordinate = "4343";
	$scope.tour.yCoordinate = "4343";
	$scope.tour.imageSource = "No source";*/

    //$scope.busy = true;
    $scope.allData = [];
	$scope.allTours = [];
    var page = 0;
    var step = 3;

    var alertSuccess = $alert({
      title: 'Success! ',
      content: 'New Tour added',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    })

    var alertFail = $alert({
      title: 'Not saved',
      content: 'New Tour failed to save',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
	 
    })

	toursAPI.getAllTours()
      .then(function(data) {
        console.log('TOURS found ');
        console.log(data);
        $scope.tours = data.data;
        $scope.allData = data.data;
		console.log($scope.allData);
		$scope.nextPage();
        $scope.busy = false;
      })
      .catch(function(err) {
        console.log('failed to get tours ' + err);
      });
	
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
	  
    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }
	
	
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
		  /*
		  location: $scope.tour.location,
          description: $scope.tour.description,
		  xCoordinate : $scope.tour.xCoordinate,
		  yCoordinate : $scope.tour.yCoordinate,
		  imageSource: $scope.tour.imageSource,*/
		  
		  
          email: $scope.user.email,
          name: $scope.user.name,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
		alertSuccess.show();
        console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.tour.title = '';
        /*$scope.tour.description = '';
		$scope.tour.xCoordinate = ' ' ;
		$scope.tour.yCoordinate = ' ' ;
		$scope.tour.imageSource = ' ' ;
		$scope.tour.location = ' ' ;*/
        $scope.picFile = '';
        $scope.picPreview = false;
	
       
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