AngularFireCart.factory("checkout", [
    "$firebase",
    "fbURL",
    function($firebase, fbURL) {
        var checkout = {};
        var firebaseOrdersURL = new Firebase(fbURL + "/orders");
        var firebaseCustomersURL = new Firebase(fbURL + "/customers");
        checkout.orders = $firebase(firebaseOrdersURL);
        checkout.customers = $firebase(firebaseCustomersURL);

        return checkout;
    }
]);