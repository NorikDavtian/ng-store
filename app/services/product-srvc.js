AngularFireCart.factory("productPath", [
    "fbURL",
    function(fbURL) {
        var firebasePath = fbURL + "/products/";
        return firebasePath;
    }
]);