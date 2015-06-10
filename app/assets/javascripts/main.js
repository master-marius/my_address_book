(function() {
  window.MyAddressBook = {};

  $.extend(true, MyAddressBook, {
    tokens: {
      authenticity: function() {
        return {
          param: $('meta[name="csrf-param"]').attr('content'),
          token: $('meta[name="csrf-token"]').attr('content')
        };
      },
      authenticityParams: function() {
        var authenticity, params;
        authenticity = this.authenticity();
        params = {};
        params[authenticity.param] = authenticity.token;
        return params;
      }
    }
  });

})();