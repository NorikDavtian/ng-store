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
        $scope.add = function(product, $event){
            console.log(cart.$add(product, 1));
            if(cart.$add(product, 1)){
                $scope.added = true;
                console.log($scope.added);
                $timeout(function(){
                    $scope.added = false;
                    console.log($scope.added);
                },2000); // Amount of time to show item added to cart success
            }
            
        };
                
    }
]);