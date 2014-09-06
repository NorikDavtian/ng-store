AngularFireCart.controller("ProductCtrl", [
    "$scope",
    "$firebase",
    "$routeParams",
    "$timeout",
    "productPath",
    "cart",
    function($scope, $firebase, $routeParams, $timeout, productPath, cart) {
        var productURL = new Firebase(productPath + $routeParams.sku);
        var product = $firebase(productURL);
        $scope.product = product.$asObject();
        $scope.added = false;
        $scope.add = function(product){
            if(cart.$add(product, 1)){
                $scope.added = true;
                $timeout(function(){
                    $scope.added = false;
                },2000); // Amount of time to show added to cart success message
            }
            
        };
                
    }
]);