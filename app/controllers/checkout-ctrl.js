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
        };

        // instead of showing 404 on thank you page just show empty cart here
        // Also if user is not checked out, return them back to the checkout.
        if (!order.confirmationNumber) {
            $location.path("/checkout");
        }

        $scope.placeOrder = function() {
            if ($scope.orderFrom.$valid) {
                // Timestamp before adding the customer
                $scope.customer.customerSince = Firebase.ServerValue.TIMESTAMP;
                
                // Add customer to our database
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
        
        // Make a random number
        function random(multiplier){            
            return Math.floor((Math.random() * multiplier) + 1);
        }

        // Helper function to generate some prefilled values for testing
        $scope.prefillValid = function() {
            $scope.customer = {
                name: "Norik Davtian " + random(100),
                email: "norik" + random(100) + "@bigemployee.com",
                address: random(150) + " Main Street",
                unit: "" + random(10),
                city: "Los Angeles",
                state: "CA",
                zip: "90" + random(1000),
                payment: {
                    name: "Norik",
                    last: "Davtian",
                    ccNo: "42" + random(100000) + "42" + random(100000),
                    ccExpMonth: "9",
                    ccExpYear: "2016",
                    ccCCV: "" + random(1000)
                }
            };
        };

        // Helper function to generate some invalid form data
        $scope.prefillInvalid = function() {
            $scope.customer = {
                name: "John Doe",
                email: "Invalid email"
            };
        };
    }
]);