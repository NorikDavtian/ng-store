"use strict"; // I ♥ JS
// Let's Code
/* App Module */

var AngularFireCart = angular.module("AngularFireCart", [
    "ngRoute",
    "ngAnimate",
    "cartModule",
    "firebase"
]).value('fbURL', 'https://ng-store.firebaseio.com/');

/* Routes */
AngularFireCart.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
                .when("/", {
                    templateUrl: "app/views/products.html",
                    controller: "ProductsCtrl"
                })
                .when("/products/:sku", {
                    templateUrl: "app/views/product-details.html",
                    controller: "ProductCtrl"
                })
                .when("/categories/:slug", {
                    templateUrl: "app/views/category-products.html",
                    controller: "CategoryCtrl"
                })
                .when("/sale", {
                    templateUrl: "app/views/on-sale.html",
                    controller: "ProductsCtrl"
                })
                .when("/cart", {
                    templateUrl: "app/views/cart.html",
                    controller: "CartCtrl"
                })
                .when("/checkout", {
                    templateUrl: "app/views/checkout.html",
                    controller: "CheckoutCtrl"
                })
                .when("/thank-you", {
                    templateUrl: "app/views/reciept.html",
                    controller: "CheckoutCtrl"
                })
                .otherwise({
                    template: "404 : OOPS!"
                });
    }
]);