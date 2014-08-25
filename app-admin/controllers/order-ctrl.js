AngularFireCartAdmin.controller("OrderCtrl", [
    "$scope",
    "$firebase",
    "$location",
    "$routeParams",
    "orderPath",
    function($scope, $firebase, $location, $routeParams, orderPath) {
        var orderURL = new Firebase(orderPath + $routeParams.id);
        var orderItemsURL = new Firebase(orderPath + $routeParams.id + "/items");
        var order = $firebase(orderURL);
        var orderItems = $firebase(orderItemsURL);
        $scope.order = order.$asObject();
        $scope.items = orderItems.$asArray();
        $scope.predicate = '-sku';

        // @todo DRY this code
        $scope.statuses = [
            {option: "New"},
            {option: "Shipped"},
            {option: "Delivered"},
            {option: "Retunred"},
            {option: "Cencelled"}
        ];
        $scope.status = $scope.statuses[1];

        $scope.save = function() {
            $scope.order.$save();
        };
        $scope.destroy = function() {
            // Bypassing the Angular Fire bug.. Esentially does the same thing.
            orderURL.remove().then(function(success) {
                $location.path("/orders");
            });
        };
    }
]);