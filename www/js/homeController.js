app.controller('homeController', function($http, $scope, $state){
	$scope.init = function() {
		if(localStorage.length==2)
			$state.transitionTo('home.profile');
	}
});