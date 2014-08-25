AngularFireCartAdmin.controller("CustomersCtrl", [
    "$scope",
    "checkout",
    function($scope, checkout) {
        // Data from Firebase
        $scope.orders = checkout.orders.$asArray();
        $scope.customers = checkout.customers.$asArray();
        $scope.predicate = '-customerSince';

        $scope.save = function(customer) {
            $scope.customers.$save(customer);
        };
        $scope.remove = function(customer) {
            $scope.customers.$remove(customer);
        };
    }
]);