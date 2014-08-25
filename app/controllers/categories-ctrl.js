AngularFireCart.controller("CategoriesCtrl", [
    "$scope",
    "categories",
    function($scope, categories) {
        // Data from Firebase
        $scope.categories = categories.$asArray();
    }
]);