/* Basic AngularJS Shopping Cart Module
 * Author: Norik Davtian <norik@bigemployee.com>
 */
"use strict";
/* Start angularCart */
var angularCart = angular.module("cartModule", ["LocalStorageModule"]);

angularCart.factory("cart", [
    "$rootScope",
    "$filter",
    "localStorageService",
    function($rootScope, $filter, localStorageService) {

        // init
        // Since our cart is available everywhere, we will make it avilable
        // at $rootScope level.
        var that = $rootScope; // or [this] if we want to change the scope later
        that.itemsCount = parseInt(localStorageService.get("itemsCount")) || (localStorageService.set("itemsCount", 0) && 0);
        that.subTotal = parseFloat(localStorageService.get("subTotal")) || (localStorageService.set("subTotal", 0) && 0);
        that.items = localStorageService.get("cart") || (localStorageService.set("cart", []) && []);
        var checkCart = $filter("filter");
        // Cart item object
        function cartItem(sku, title, image, price, quantity) {
            this.sku = sku;
            this.title = title;
            this.image = image;
            this.price = parseFloat(price);
            this.quantity = parseInt(quantity);
        }

        // $add: addItem
        // Adds an item to the cart
        var addItem = function(product, quantity) {
            var newItem = new cartItem(product.sku, product.title, product.image, product.price, quantity);
            var item = checkCart(that.items, {sku: product.sku});
            var isInCart = item.length;
            var added = false;
            if (isInCart) {
                var newQuantity = item[0].quantity + quantity;
                // Avoid going below 1 for item count in the cart
                if (newQuantity) {
                    item[0].quantity = newQuantity;
                    added = updateCart(quantity, product.price);
                }
            } else {
                that.items.push(newItem);
                added = updateCart(quantity, product.price);
            }
            return added;
        };

        var updateCart = function(quantity, price) {
            setItemsCount(that.itemsCount + quantity);
            setSubTotal(that.subTotal + (quantity * price));
            localStorageService.set("cart", that.items);
            // Since our Local Storage setter does not return a promise or
            // anything, let's just fake it till we make it. #optimisticActions
            return true;
        };

        // $items: getItems
        // Retrive items in the cart array
        var getItems = function() {
            var items = localStorageService.get("cart");
            return items;
        };

        // $remove: removeItem
        // Remove an item given its key
        var removeItem = function(item) {
            var index = that.items.indexOf(item);
            that.items.splice(index, 1);
            updateCart(-item.quantity, item.price);
        };

        // $clearAll: clearAll
        // Clear items in the cart
        var clearAll = function() {
            localStorageService.clearAll();
            that.itemsCount = localStorageService.set("itemsCount", 0) && 0;
            that.subTotal = localStorageService.set("subTotal", 0) && 0;
            that.items = localStorageService.set("cart", []) && [];
        };

        // Set items count
        var setItemsCount = function(itemsCount) {
            localStorageService.set("itemsCount", itemsCount);
            that.itemsCount = itemsCount;
        };

        // $itemsCount: getItemsCount
        // Returns total items in the cart
        var getItemsCount = function() {
            var itemsCount = parseInt(localStorageService.get("itemsCount"));
            return itemsCount;
        };

        // Set sub total
        var setSubTotal = function(subTotal) {
            localStorageService.set("subTotal", subTotal);
            that.subTotal = subTotal;
        };

        // $subTotal: getSubTotal
        // Returns total dollar amount of items in the cart
        var getSubTotal = function() {
            return that.subTotal;
        };

        return {
            $add: addItem,
            $items: getItems,
            $remove: removeItem,
            $clearAll: clearAll,
            $itemsCount: getItemsCount,
            $subTotal: getSubTotal
        };
    }
]);


