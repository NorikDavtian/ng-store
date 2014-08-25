AngularFireCart.controller("ProductsCtrl", [
    "$scope",
    "products",
    function($scope, products) {
        // Data from Firebase
        $scope.products = products.$asArray();
    }
]);