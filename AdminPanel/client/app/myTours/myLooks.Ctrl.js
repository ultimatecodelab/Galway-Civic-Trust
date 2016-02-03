(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyLooksCtrl', MyLooksCtrl);

  MyLooksCtrl.$inject = ['$scope', '$modal', '$state', '$alert', 'toursAPI', 'Auth'];

  function MyLooksCtrl($scope, $modal, $state, $alert, toursAPI, Auth) {

    $scope.user = Auth.getCurrentUser();
    var userEmail = $scope.user.email;

    $scope.userLooks = [];
    $scope.editLook = {};
	
	$scope.selectedIndex = 0;
	$scope.selectedTour = $scope.userLooks[0];
	
	$scope.selectTour = function (tour,index){
		$scope.selectedIndex = index;
		$scope.selectedTour = tour;
	}
    var alertSuccess = $alert({
      title: 'Saved ',
      content: 'Look has been edited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not Saved ',
      content: 'Look has failed to edit',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    $scope.noLooks = function() {
      $scope.userLooks.length === 0;
    }

	toursAPI.getAllTours()
      .then(function(data) {
        console.log(data);
        $scope.userLooks = data.data;
      })
      .catch(function(err) {
        console.log('failed to get looks for user ' + err);
      });

    $scope.editLook = function(look) {
      toursAPI.getUpdateLook(look)
        .then(function(data) {
          console.log(data);
          $scope.editLook = data.data;
        })
        .catch(function(err) {
          console.log('failed to edit look ' + err);
        });
    }

    $scope.saveLook = function() {
      var look = $scope.editLook;

      toursAPI.updateLook(look)
        .then(function(data) {
          console.log('Look updated');
          console.log(data);
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          alertSuccess.show();
        })
        .catch(function(err) {
          console.log('failed to update' + err);
          alertFail.show();
        });
    }

    $scope.delete = function(look) {
      var index = $scope.userLooks.indexOf(look);

      toursAPI.deleteLook(look)
        .then(function(data) {
          console.log('success, look deleted');
          $scope.userLooks.splice(index, 1);
        })
        .catch(function(err) {
          console.log('failed to delete look' + err);
        });
    }

  }
})();