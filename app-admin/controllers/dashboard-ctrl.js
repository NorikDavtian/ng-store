AngularFireCartAdmin.controller("DashboardCtrl", [
    "$scope",
    "products",
    function($scope, products) {
        // Data from Firebase
        $scope.products = products.$asArray();
        $scope.predicate = '-sku';

        // @todo categories dynamically from DB
        $scope.categories = [
            {name: "Berries"},
            {name: "Cake Pops"}
        ];
        $scope.sale = [
            {option: "Yes"},
            {option: "No"}
        ];
        $scope.isOnSale = $scope.sale[1];

        // ADD Product method
        $scope.addProduct = function() {
            // @todo add validation for empty checks here
            // @todo add SKU validation
            if ($scope.title) {
                products.$set($scope.sku.toString(), {
                    sku: $scope.sku,
                    title: $scope.title,
                    price: $scope.price,
                    image: $scope.image,
                    description: $scope.description,
                    category: $scope.category.name,
                    isOnSale: $scope.isOnSale.option
                });
                //RESET Form
                $scope.sku = $scope.sku + 1;
                $scope.title = "";
                $scope.price = "";
                $scope.image = "";
                $scope.description = "";
                $scope.category = "";
                $scope.isOnSale = $scope.sale[1];
            }
        };
        $scope.save = function(product) {
            $scope.products.$save(product);
        };
        $scope.remove = function(product) {
            $scope.products.$remove(product);
        };
    }
]);