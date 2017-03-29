define(['jquery', 'Module', 'angular'], function($, M, angular) {
	// angular.module("myapp", ['myapp'])
	// 	.controller("ExampleController", function($scope) {
	// 		$scope.version = "101";
	// 	})
	// 	.controller('ExampleController2', function($scope) {
	// 		$scope.version1 = '102';
	// 	});
	var mainApp = angular.module("myapp", ['myapp']);

	mainApp.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/addStudent', {
				templateUrl: 'addStudent.html',
				controller: 'ExampleController'
			}).
			when('/viewStudents', {
				templateUrl: 'viewStudents.html',
				controller: 'ExampleController2'
			}).
			otherwise({
				redirectTo: '/addStudent'
			});
		}
	]);

	mainApp.controller('ExampleController', function($scope) {
		$scope.version = "This page will be used to display add student form";
	});

	mainApp.controller('ExampleController2', function($scope) {
		$scope.version1 = "This page will be used to display all the students";
	});
});