app.controller('addressBookController', function($rootScope, $scope, $document, addressBookServices, contactsServices) {
  $rootScope.header = "My Contacts";
  $rootScope.pageHeader = "My Contacts";
  $scope.book = [];
  $scope.showAdd = false;
  $scope.no_data = true;
  $scope.edit = [];
  $scope.new_data = {};
  $scope.edit_data = [];
  $scope.current_data = [];
  var addressBookSvc  = new addressBookServices();
  var contactSvc  = new contactsServices();

  addressBookSvc.fetchAll().success(function(data, status, headers, config){
      $scope.book = data.address_book;
  });

  $scope.showAddContact = function(){
    $scope.showAdd = true;
    $scope.no_data = false;
  }

  $scope.cancelAdd = function(){
    $scope.showAdd = false;
    if ($scope.book.length <= 0) {
      $scope.no_data = true;

    }
  }

  $scope.editData = function(index){
     angular.forEach($scope.book, function(data, key) {
        if (index == key){
          var obj = {};
          angular.copy(data,obj);
          $scope.edit_data[index] = obj;
          $scope.edit[index] = true;
          $scope.current_data[index] = true;
          console.log($scope.edit_data[index]);
        } 
      });

  }

  $scope.defaultData = function(id, index){
    $scope.edit[index] = false;
    $scope.current_data[index] = false;
  }

  $scope.addData = function(){
    console.log($scope.new_data);
    var contact = {
      contact : $scope.new_data
    }
    addressBookSvc.add(contact).success(function(data,status,headers,config){
      console.log(data);
    });
  }

  $scope.updateData = function(id,index){
    var params = {};
    angular.copy($scope.edit_data[index],params);

    id = params.contact.id;
    contactSvc.update(id, params.contact).success(function(data){
      if (data.success){
        updateSuccess(data.contact,index);
        $scope.defaultData(1,index);
      }else{
        updateError(data.message,index);
      }

    });
  }

  updateError = function(message,index){
    angular.forEach(message, function(msg, key) {
        
        $scope.edit_data[index].contact.key = msg;
        console.log($scope.edit_data[index].contact);

        for (var property in $scope.edit_data[index].contact) {
          if (property == key ){
            console.log(key+' = '+msg);
            // var myEl = angular.element($document[0].querySelector('#'+property));            
            var el = $('[ng-model="edit_data[$index].contact.'+property+'"]');
            elementTooltip(el,msg);
          }
        }
    });
  }
  $scope.clear = function(e){
    var el = $(e.target);
    el.removeClass('has-error');
    el.attr('data-toggle', '');
    el.attr('data-original-title', '');
    el.tooltip('destroy');
  }

  elementTooltip = function(element,msg){
    element.attr('data-toggle','tooltip');
    element.attr('data-placement','top');
    element.addClass('has-error');
    element.attr('data-original-title',msg);
    element.tooltip('show');
  }

  updateSuccess = function(contact,index){
    angular.forEach($scope.book, function(data, key) {
        if (index == key){
          data.contact = contact;
          console.log(data.contact);
        } 
    });
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