AngularFireCartAdmin.factory("orderPath", [
    "fbURL",
    function(fbURL) {
        var firebasePath = fbURL + "/orders/";
        return firebasePath;
    }
]);