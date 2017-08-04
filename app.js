var docViewerApp = angular.module('DocumentViewing', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngMaterial', 'ui.bootstrap'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when("/usage", {
        templateUrl: "./views/usage/usage.html",
        controller: 'UsageCtrl'
    })
    .when("/pdftron", {
        templateUrl: "./views/pdftron/pdftron.html",
        controller: 'PdftronCtrl'
    })
    .when("/", {
        redirectTo: "/pdftron"
    })
    .otherwise({redirectTo: '/pdftron'});
}])

.controller('main', ['$rootScope', '$scope', '$location', '$route', '$templateCache', function ($rootScope, $scope, $location, $route, $templateCache) {
    function init() {
    }

    $scope.toggleHamburger = function(ele, $event) {
        var mobileLinks = document.getElementsByClassName('mobile-links')[0];
        mobileLinks.classList.toggle('expand');
        $event.stopPropagation();
    };

    $scope.gotoView = function(view) {
        $location.url(view);
    };

    init();
}])

.directive('tooltip', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).tooltip({delay: {'show': 1000, 'hide': 100}, placement: attrs.placement});
        }
    };
}]);

