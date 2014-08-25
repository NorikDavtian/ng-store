AngularFireCartAdmin.factory('products', [
    "$firebase",
    "fbURL",
    function($firebase, fbURL) {
        var firebaseURL = new Firebase(fbURL + "/products");
        var products = $firebase(firebaseURL);
        return products;
    }
]);