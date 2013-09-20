var m1 = angular.module('appNoInt', []);

var m2 = angular.module('appInt', []);

angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('appNoInt'), ['appNoInt']);
    angular.bootstrap(document.getElementById('appInt'), ['appInt']);
});

