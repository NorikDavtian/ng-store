AngularFireCart.directive('uppercase', function() {
   return {
     require: '^ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var uppercase = function(input) {
           if(input == undefined) input = '';
           var uppercased = input.toUpperCase();
           if(uppercased !== input) {
              modelCtrl.$setViewValue(uppercased);
              modelCtrl.$render();
            }         
            return uppercased;
         }
         modelCtrl.$parsers.push(uppercase);
         uppercase(scope[attrs.ngModel]);  // uppercase initial value
     }
   };
});