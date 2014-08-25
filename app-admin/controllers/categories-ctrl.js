AngularFireCartAdmin.controller("CategoriesCtrl", [
    "$scope",
    "categories",
    function($scope, categories) {
        // Data from Firebase
        $scope.categories = categories.$asArray();
        $scope.$watch('title', function() {
            var slugify = function(title) {
                title = title || "";
                return title.toString().toLowerCase()
                        .replace(/\s+/g, '-')           // Replace spaces with -
                        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                        .replace(/^-+/, '')             // Trim - from start of text
                        .replace(/-+$/, '');            // Trim - from end of text
            }
            $scope.slug = slugify($scope.title);
        });
        // ADD Category method
        $scope.addCategory = function() {
            // @todo add validation for empty checks here
            // @todo check if slug exist before adding to the list
            if ($scope.title) {
                categories.$set($scope.slug, {
                    title: $scope.title,
                    slug: $scope.slug
                }).then(function(ref) {
//                    console.log(ref.name()); // slug
                });
                //RESET Form
                $scope.title = "";
                $scope.slug = "";
            }
        };
        $scope.save = function(category) {
            $scope.categories.$save(category);
        };
        $scope.remove = function(category) {
            $scope.categories.$remove(category);
        };
    }
]);