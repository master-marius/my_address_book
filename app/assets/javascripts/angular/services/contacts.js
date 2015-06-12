app.factory("contactsServices", function($resource ,$http) {
  var contact = function () {
    this.resource = "contacts";
  };

  contact.prototype.fetchAll = function () {
    return $http.get("/" + this.resource + ".json");
  };

  contact.prototype.update = function (id, param) {
    return $http.put("/contacts/"+id+".json", angular.extend({contact: param}, MyAddressBook.tokens.authenticityParams()));
  };

  return contact;
});