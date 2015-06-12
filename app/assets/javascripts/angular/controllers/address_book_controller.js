app.controller('addressBookController', function($rootScope, $scope, $document,$window, addressBookServices, contactsServices) {
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
      if ($scope.book.length <= 0){
        $scope.no_data = true;
      }else{
        $scope.no_data = false;
      }
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
      if (data.success){
        $scope.cancelAdd();
        $scope.book.unshift(data);
        console.log($scope.book);
        $('.my-alert').removeClass('hide');
        $('.my-alert').text(data.message);
        $scope.new_data = {};
      }else{
        createError(data.message);
      }
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
        $('.my-alert').removeClass('hide');
        $('.my-alert').text(data.message);
      }else{
        updateError(data.message,index);
      }

    });
  }

  createError = function(message){
    angular.forEach(message, function(msg, key) {
          var el = $('[ng-model="new_data.'+key+'"]');
          elementTooltip(el,msg);
    });
  }

  updateError = function(message,index){
    angular.forEach(message, function(msg, key) {
        
        $scope.edit_data[index].contact.key = msg;
        console.log($scope.edit_data[index].contact);

        for (var property in $scope.edit_data[index].contact) {
          if (property == key ){
            console.log(key+' = '+msg);          
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
  $scope.deleteData = function(id,index){
    var deleteContact = $window.confirm('delete this contact?');

    if (deleteContact){
       addressBookSvc.delete(id).success(function(data){
        console.log(data);
        $scope.book.splice(index,1);
      });
    }
  }


  $scope.hoverOption = function(bol,e,title){
    var el = $(e.target);
    if(bol){
      el.addClass('my-hover');
      hoverToolTip(el,title)

    }else{
      el.removeClass('my-hover');
    }
  }

   hoverToolTip = function(element,msg){
    element.attr('data-toggle','tooltip');
    element.attr('data-placement','top');
    element.attr('data-original-title',msg);
    element.tooltip('show');
  }
});