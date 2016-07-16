app.controller('homeController', function($http, $scope, $state){
	$scope.init = function() {
		if(localStorage.length==0)
			$state.transitionTo('home.login');
		if(localStorage.length==2)
			$state.transitionTo('home.home2.profile');
	}
	$scope.home = function () {
		$state.transitionTo('home.home2.profile');
	}
});