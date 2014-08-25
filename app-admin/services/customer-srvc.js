AngularFireCartAdmin.factory("customerPath", [
    "fbURL",
    function(fbURL) {
        var firebasePath = fbURL + "/customers/";
        return firebasePath;
    }
]);