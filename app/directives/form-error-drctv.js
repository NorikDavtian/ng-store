AngularFireCart.directive("alertDanger", function() {
    return{
        restrict: "C",
        template: "<strong>Yeh before processing that!</strong> {{error}}"
    };
});