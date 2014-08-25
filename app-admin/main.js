"use strict"; // I ♥ JS
// Let's Code
(function($, window, document) {
    var adminPanel = $("#admin");
    $("#menu-toggle").on("click", function(e) {
        e.preventDefault();
        adminPanel.toggleClass("toggled");
    });
})(window.jQuery, window, window.document);

var AngularFireCartAdmin = angular.module('AngularFireCartAdmin', [
    'ngRoute',
    "firebase"
]).value('fbURL', 'https://ng-store.firebaseio.com/');

AngularFireCartAdmin.config(function($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: "app-admin/views/index.html",
                controller: "DashboardCtrl"
            })
            .when('/products', {
                templateUrl: "app-admin/views/products.html",
                controller: "ProductsCtrl"
            })
            .when('/categories', {
                templateUrl: "app-admin/views/categories.html",
                controller: "CategoriesCtrl"
            })
            .when('/orders', {
                templateUrl: "app-admin/views/orders.html",
                controller: "OrdersCtrl"
            })
            .when('/orders/:id', {
                templateUrl: "app-admin/views/order.html",
                controller: "OrderCtrl"
            })
            .when('/customers', {
                templateUrl: "app-admin/views/customers.html",
                controller: "CustomersCtrl"
            })
            .when('/customers/:id', {
                templateUrl: "app-admin/views/customer.html",
                controller: "CustomerCtrl"
            })
            .when('/settings', {
                templateUrl: "app-admin/views/settings.html",
                controller: "SettingsCtrl"
            })
            .otherwise({
                template: "404 : OOPS!"
            });
});