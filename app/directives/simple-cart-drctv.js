AngularFireCart.directive("simpleCart", function() {
    return{
        link: function(scope, simpleCart) {
            simpleCart = jQuery(simpleCart);
            var cartContent = simpleCart.find("#cart-content");
            var cartLinks = simpleCart.find("a");
            simpleCart.on("mouseenter", function(e) {
                e.preventDefault();
                cartContent.stop().fadeIn(200);
            }).on("mouseleave", function(e) {
                e.preventDefault();
                cartContent.stop().fadeOut(200);
            });
            cartLinks.on("click", function(e){
                cartContent.stop().fadeOut(200);
            });
        },
        templateUrl: "app/views/simple-cart.html"
    };
});