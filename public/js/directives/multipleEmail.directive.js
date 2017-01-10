  angular.module('emailApp').directive('multipleEmails', function() {
      return {
          require: 'ngModel',
          link: function(scope, element, attrs, ctrl) {
              var regx = /\S+@\S+\.\S+/;
              ctrl.$parsers.unshift(function(viewValue) {
                  var emails = viewValue.split(",");
                  var validityArr = emails.map(function(str) {
                      return regx.test(str.trim());
                  });
                  var oneInvalid = false;

                  angular.forEach(validityArr, function(value) {
                      if (value === false)
                          oneInvalid = true;
                  });


                  if (!oneInvalid) {
                      ctrl.$setValidity('multipleEmails', true);
                      return viewValue;
                  } else {
                      ctrl.$setValidity('multipleEmails', false);
                      return undefined;
                  }



              });
          }
      };
  });