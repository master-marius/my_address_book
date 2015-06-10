app.config(["$routeProvider", "$locationProvider", "$httpProvider", 
  function($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider.when( "/", 
  {
      label: "Dashboard",
      templateUrl : "assets/angular/views/dashboard/index.html",
      controller : "dashboardController"
  });

  $routeProvider.otherwise({ redirectTo : "/" });

}]);