app.factory("addressBookServices", function($resource ,$http) {
  var address_book = function () {
    this.resource = "address_book";
  };

  address_book.prototype.fetchAll = function () {
    return $http.get("/" + this.resource + ".json");
  };

  address_book.prototype.add = function (param) {
    return $http.post("/" + this.resource + ".json", angular.extend(param, MyAddressBook.tokens.authenticityParams()));
  };

  address_book.prototype.update = function (id, param) {
    return $http.put("/address_book/"+id+".json", angular.extend({contact: param}, MyAddressBook.tokens.authenticityParams()));
  };

  address_book.prototype.delete = function (id) {
    return $http.delete("/address_book/"+id+".json", {params : MyAddressBook.tokens.authenticityParams()})
  };
  return address_book;
});