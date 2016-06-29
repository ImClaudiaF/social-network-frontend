app.controller('profileController', function($http, $scope, $state){
	$scope.profileInfo = function(){
		var params = {
			username: localStorage.getItem('username'),
			token: localStorage.getItem('token')
		}
		$http.get("http://192.168.1.137:10000/info/"+params.username+"/"+params.token)
		.success(function(data){
			console.log(data);
			$scope.name=data.info.user_name;
			$scope.lastname=data.info.user_lastname;
			$scope.username=localStorage.getItem('username');
		});
	};
	$scope.profile = {
		upload: function(){
			$state.transitionTo('home.upload');
		},
		logout: function(){
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			$state.transitionTo('home.login');
		},
		photos: function(){
			$state.transitionTo('home.photos');
		}
	}
});