AngularFireCart.controller("ProductCtrl", [
    "$scope",
    "$firebase",
    "$routeParams",
    "productPath",
    "cart",
    function($scope, $firebase, $routeParams, productPath, cart) {
        var productURL = new Firebase(productPath + $routeParams.sku);
        var product = $firebase(productURL);
        $scope.product = product.$asObject();
        $scope.add = cart.$add;
    }
]);