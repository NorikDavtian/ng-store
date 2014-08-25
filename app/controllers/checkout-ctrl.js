AngularFireCart.controller("CheckoutCtrl", [
    "$scope",
    "$location",
    "cart",
    "checkout",
    "order",
    function($scope, $location, cart, checkout, order) {

        $scope.orders = checkout.orders.$asArray();
        $scope.customers = checkout.customers.$asArray();
        $scope.error = "";
        $scope.tax = $scope.subTotal * 0.1; // @todo Tax could be read from settings
        $scope.shipping = 0; // @todo Shipping options could be read from settings
        $scope.grandTotal = $scope.subTotal + $scope.shipping + $scope.tax;
        var items = angular.copy($scope.items); // Copy of our cart items object
        $scope.order = order;

        // basic currency formatter
        var format$ = function(input) {
            return parseFloat(parseInt(input * 100) / 100);
        }

        // instead of showing 404 on thank you page just show empty cart here
        // Also if user is not checked out, return them back to the checkout.
        if (!order.confirmationNumber) {
            $location.path("/checkout");
        }

        $scope.placeOrder = function() {
            if ($scope.orderFrom.$valid) {
                // Timestamp before adding the customer
                $scope.customer.customerSince = Firebase.ServerValue.TIMESTAMP;
                // Add
                $scope.customers.$add($scope.customer).then(function(ref) {
                    $scope.orders.$add({
                        customer: ref.name(),
                        items: items,
                        subTotal: format$($scope.subTotal),
                        tax: format$($scope.tax),
                        shipping: format$($scope.shipping),
                        grandTotal: format$($scope.grandTotal),
                        status: "New",
                        orderDate: Firebase.ServerValue.TIMESTAMP
                    }).then(function(ref) {
                        cart.$clearAll();
                        // pass order number as our confirmation Number
                        $scope.order.confirmationNumber = ref.name();
                        $location.path("/thank-you");
                    });
                }, function(ref) {
                    // if Customer was added but order creation failed simply
                    // remove the customer too. Defensive programming measures.
                    $scope.error = "Customer was added but Order failed :( " + ref.name();
                    $scope.customers.$remove(ref.name());
                });

            } else {
                $scope.error = "We need some valid shipping information";
            }
        };

        $scope.prefillValid = function() {
            $scope.customer = {
                name: "Norik Davtian " + Math.floor((Math.random() * 100) + 1),
                email: "norik" + Math.floor((Math.random() * 100) + 1) + "@bigemployee.com",
                address: Math.floor((Math.random() * 150) + 1) + " Main Street",
                unit: "" + Math.floor((Math.random() * 10) + 1),
                city: "Los Angeles",
                state: "CA",
                zip: "90" + Math.floor((Math.random() * 1000) + 1),
                payment: {
                    name: "Norik",
                    last: "Davtian",
                    ccNo: "42" + Math.floor((Math.random() * 100000) + 1) + "42" + Math.floor((Math.random() * 100000) + 1),
                    ccExpMonth: "9",
                    ccExpYear: "2016",
                    ccCCV: "" + Math.floor((Math.random() * 1000) + 1)
                }
            };
        };

        $scope.prefillInvalid = function() {
            $scope.customer = {
                name: "John Doe",
                email: "Invalid email"
            };
        };
    }
]);