var mainApp = angular.module('pollServices', ['ngResource']);
mainApp.factory('Poll', function($resource) {
	return $resource('/course/search', {
		param: 1
	}, {
		defineMethod: { //自定义方法
			method: 'GET',
			params: {
				pollId2: '2'
			},
			isArray: false
		}
	})
});


mainApp.factory('demoFactory', function($http) {
	var service = {
		name: 'demo',
		save: function() {
			$http.post('/demo/save', {
				param: 1
			})
		}
	}
	return service;
});


// var myApp = angular.module('myApp', ['ngResource']);
// myApp.factory('demoFactory', ['$resource', function($resource) {
// 	return $resource('/course/search', {
// 		param: 1
// 	}, {
// 		query: {
// 			method: 'GET'
// 		}
// 	})
// }])