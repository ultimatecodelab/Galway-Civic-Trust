(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);
  
  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal',  '$http', '$alert','Upload'];

 //function MainCtrl($scope, $state, Auth, $modal, $http, $alert, looksAPI, Upload) {
   function MainCtrl($scope, $state, Auth, $modal, $http, $alert, Upload) {
    $scope.user = Auth.getCurrentUser();

    
	$scope.tour = {};
    $scope.tour = [];
	
    $scope.picPreview = true;
	
	//--------------------------------
	 $scope.uploadTourTitle = true;
     $scope.uploadTourForm = false;
	//------------------------------
//----------------------TEST-----------------

	

	$scope.tour.title = "Arjun";
	$scope.tour.location = "66, Lower Newcastle Road Galway";
	$scope.tour.description = "This is super awesome";
	$scope.tour.xCoordinate = "53.232";
	$scope.tour.yCoordinate = "-9.205";
	$scope.tour.imageSource = "https://www.siliconrepublic.com/wp-content/uploads/2016/01/Cancer_research-718x523.jpg";
	
	console.log($scope.tour);
	
	
	//---------------------------------------------
    //$scope.busy = true;
    $scope.allData = [];
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

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }
	
	$scope.uploadPic = function(file) {
      Upload.upload({
        url: '/api/tour/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title : $scope.tour.title,
		  location: $scope.tour.location,
          description: $scope.tour.description,
		  
		  xCoordinate : $scope.tour.xCoordinate,
		  yCoordinate : $scope.tour.yCoordinate,
		  
		  imageSource : $scope.tour.imageSource,
		  
          email: $scope.user.email,
          userName: $scope.user.name,
          //linkURL: $scope.look._id,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
        console.log('success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.tours.splice(0, 0, resp.data);
        $scope.tour.title = '';
        $scope.title.description = '';
        $scope.picFile = '';
        $scope.picPreview = false;
        alertSuccess.show();
      }, function(resp) {
	   console.log(resp);
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }

  }
})();