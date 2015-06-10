app.config(["$routeProvider", "$locationProvider", "$httpProvider", 
  function($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider.when( "/", 
  {
      label: "My Contacts",
      templateUrl : "assets/angular/views/address_book/index.html",
      controller : "addressBookController"
  });

  $routeProvider.otherwise({ redirectTo : "/" });

}]);