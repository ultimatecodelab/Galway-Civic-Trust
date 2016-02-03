(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
        .state('location', {
          url: '/tour/:tourId',
          templateUrl: 'app/location/location_detail_view.html',
          controller: 'LocationController'
        });
    }
})();