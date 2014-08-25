AngularFireCart.controller("CartCtrl", [
    "$scope",
    "cart",
    function($scope, cart) {
        // Assign Cart Setters to Cart Service Provider
        $scope.add = cart.$add;
        $scope.remove = cart.$remove;
        $scope.emptyCart = cart.$clearAll;
    }
]);