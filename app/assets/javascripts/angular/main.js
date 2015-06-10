app = {};

app = angular.module('MyAddressBook', [ 'ngRoute', 
                          'ngResource',
                          "ui.bootstrap",
                          "ui.bootstrap.tpls",
                          "nprogress-rails",
                  ]);

app.run(["$rootScope", "$location", function($rootScope, $location) {

  $rootScope.$on('$routeChangeStart', function ( event, current, previous ) {
  
  });

  $rootScope.$on('$routeChangeSuccess', function ( $event, current, previous ) {

  });

} ] )