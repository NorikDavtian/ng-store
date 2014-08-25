AngularFireCart.controller("CategoryCtrl", [
    "$scope",
    "$routeParams",
    "categories",
    "products",
    function($scope, $routeParams, categories, products) {
        // convert categories and products data from Firebase to array
        $scope.categories = categories.$asArray();
        $scope.products = products.$asArray();

        // find slug from route parameters
        $scope.slug = $routeParams.slug;
    }
]);