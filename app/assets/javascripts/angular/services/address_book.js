app.factory("addressBookServices", function($resource ,$http) {
  var address_book = function () {
    this.resource = "address_book";
  };

  address_book.prototype.fetchAll = function () {
    return $http.get("/" + this.resource + ".json");
  };

  // user.prototype.fetch = function (id) {
  //   var param = { id : id};
  //   param = angular.extend(param, Inventory.tokens.authenticityParams());
  //   return $http.get("/" + this.resource + ".json", {params : param});
  // };

  // user.prototype.user_count = function () {
  //   return $http.get("/users/count_users.json");
  // };

  address_book.prototype.add = function (param) {
    return $http.post("/" + this.resource + ".json", angular.extend(param, Inventory.tokens.authenticityParams()));
  };

  // user.prototype.update = function (id, param) {
  //   return $http.put("/users/"+id+".json", angular.extend({user: param}, Inventory.tokens.authenticityParams()));
  // };

  // user.prototype.delete = function (id) {
  //   return $http.delete("/users/"+id+".json", {params : Inventory.tokens.authenticityParams()})
  // };
  return address_book;
});