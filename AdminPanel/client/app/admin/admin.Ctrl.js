(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', 'Auth', '$modal', 'adminAPI', '$alert', 'toursAPI'];

  function AdminCtrl($scope, Auth, $modal, adminAPI, $alert, toursAPI) {
    $scope.users = [];
    $scope.user = {}; 
    $scope.deleteBtn = true;
	/*
		gelAllUsers() and deleteUser() methods are implemented in adminAPI . adminAPI is like a factory that 
		contains the necessary methods for managing users.
	*/
	
	//displays all the users of the system
    adminAPI.getAllUsers()
      .then(function(data) {
        $scope.users = data.data;
      })
      .catch(function(err) {
        console.log('error getting users');
        console.log(err);
      });
	//deleting the user
    $scope.deleteUser = function(user) {
      adminAPI.deleteUser(user)
        .then(function(data) {
          console.log('deleted user');
          var index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1);
        })
        .catch(function(err) {
          console.log('failed to delete user');
          console.log(err);
        });
    }
  }
})();