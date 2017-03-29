var app = angular.module('app', ['ngRoute', 'pollServices']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/demo', {
            templateUrl: 'partials/demo.html',
            // controller: function($scope){
            // 	$scope.username = 'dazhuang';
            // }
            controller: WelcomeCtrl
        })
        .when('/view/:id', {
            templateUrl: 'partials/detail.html',
            controller: detail
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
// app.controller('formCtl', ['$scope', function($scope) {
// 	$scope.ctlName = 'controller测试';
// }]);
app.controller('formCtl', function ($scope) {
    $scope.ctlName = 'controller测试';
});