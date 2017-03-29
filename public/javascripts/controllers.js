function WelcomeCtrl($scope, $routeParams, $http, Poll) {
	//1.jquery的ajax请求
	// $.get('/course/search',function(data){
	//   alert(1);
	// });

	//2.factory工厂方法请求--调用自定义方法
	$scope.polls = Poll.defineMethod({
		pollId1: 1
	});
	$scope.pools = Poll.get({
		d: 2
	});

	//3.$http请求方法
	// $http.get('/course/search', {
	// 	params: {
	// 		poollId: 1,
	// 		method: '$http'
	// 	}
	// }).success(function(data) {
	// 	$scope.polls = data;
	// });

	$scope.username = 'dazhuang';
	$scope.obj = {};
	$scope.obj.isShow = true;
	// $('#sss').click(function(event) {
	// 	 Act on the event 
	// 	$scope.obj.isShow = false;
	// });
	$scope.hideUl = function(event) {
		$scope.obj.isShow = false;
	}
	$scope.showUl = function() {
		$scope.obj.isShow = true;
	}
}

function detail($scope, $routeParams) {
	$scope.name = 'demo+参数' + $routeParams.id;
}