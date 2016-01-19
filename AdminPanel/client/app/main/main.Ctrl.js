(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth','$modal'];

  function MainCtrl($scope, $state, Auth,$modal) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {};
    $scope.looks = [];
	
    $scope.picPreview = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.title = "Arjun";
    $scope.look.link = "fdfd";

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }



  }
})();