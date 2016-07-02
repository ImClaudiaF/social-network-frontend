app.controller('loginController', function($http, $scope, $state){
	$scope.init = function() {
		if(localStorage.length==2)
			$state.transitionTo('home.profile');
	};
	$scope.loginUser = {
		loginInfo: function () {
			var token, username;
			var params = {
				username: $scope.username,
				password: $scope.password
			};
			console.log(params);
			$http.post("http://192.168.1.100:10000/login", params)
			.success(function(data){
				console.log(data);
				if(data.status==200){
					console.log(data.info.user_nickn);
					console.log(data.info.user_token);
					localStorage.setItem('username', data.info.user_nickn);
					localStorage.setItem('token', data.info.user_token);
					$state.transitionTo('home.profile');
				}
				else
					$scope.message = "Usuario y/o contrasena incorrecta"
			});	
		}
	}
});