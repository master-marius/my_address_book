app.controller('addressBookController', function($rootScope, $scope, addressBookServices) {
  $rootScope.header = "My Contacts";
  $rootScope.pageHeader = "My Contacts";
  $scope.contacts = {};
  $scope.showAdd = false;
  $scope.no_data = true;
  $scope.new_data = {};
  var addressBookSvc  = new addressBookServices();

  addressBookSvc.fetchAll().success(function(data, status, headers, config){
      // $scope.contacts = data.items;
      // var scope = $scope;
      console.log(data);
  });

  $scope.showAddContact = function(){
    $scope.showAdd = true;
    $scope.no_data = false;
  }

  $scope.addData = function(){
    console.log($scope.new_data);
    // addressBookSvc.add($scope.new_data).success(function(data,status,headers,config){

    // });
  }
  // itemSvc.add(new_item).success(function(data,status,headers, config){
  //       if (data.success){
  //         var ctr = 0;
  //         var new_id = 0;
  //         console.log(data);
  //         $scope.items.forEach(function(item){
  //           if (ctr == 0){
  //             new_id = item.id;
  //             ctr++;
  //             return false;
  //           }
  //         });
  //         $scope.registerData(data,new_item);

  //         new_item.id = new_id + 1;
  //         $scope.items.push(new_item);

  //         $scope.items.sort(function(a, b){
  //           return b.id - a.id;
  //         });

  //         $scope.add = false;
  //         $scope.new_item = '';
  //       }
  //     });
});