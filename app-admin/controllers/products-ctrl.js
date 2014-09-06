AngularFireCartAdmin.controller("ProductsCtrl", [
    "$scope",
    "products",
    "categories",
    function($scope, products, categories) {
        // Data from Firebase
        $scope.products = products.$asArray();
        $scope.predicate = '-sku';
        
        $scope.categories = categories.$asArray();
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
                    category: $scope.category.title,
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