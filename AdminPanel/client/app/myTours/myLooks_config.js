(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
        .state('myTours', {
          url: '/controlpanel',
          templateUrl: 'app/myTours/myTours.html',
          controller: 'MyLooksCtrl',
          authenticate: true
        });
    }

})();