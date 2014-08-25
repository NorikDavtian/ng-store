AngularFireCartAdmin.directive("widget", function() {
    return{
        restrict: "E",
        transclude: true,
        scope: {
            icon: "@",
            title: "@"
        },
        link: function(scope, element, attrs){
            scope.value = attrs.value;
            scope.icon = attrs.icon;            
        },
        templateUrl: "app-admin/views/widget.html"
    };
});