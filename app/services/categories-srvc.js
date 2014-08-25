AngularFireCart.factory("categories", [
    "$firebase",
    "fbURL",
    function($firebase, fbURL) {
        var firebaseURL = new Firebase(fbURL + "/categories");
        var categories = $firebase(firebaseURL);
        return categories;
    }
]);