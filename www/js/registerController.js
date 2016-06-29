app.controller('registerController', function($http,$scope, $state){
	$scope.register = {
		registerInfo: function () {
			var params = {
				name: $scope.name,
				lastname: $scope.lastname,
				email: $scope.email,
				username: $scope.username,
				password: $scope.password
			};
			console.log(params);		
			$http.post("http://192.168.1.137:10000/register", params)
			.success(function(data){
				console.log(data);
				if(data.status==200){
					console.log(data.info.token);
					$state.transitionTo('home.profile');
				}
				else
					$scope.message = "Usuario y/o correo ya existe"
				//else si no se registra
				//localStorage.setItem('username','data.info.');
			});	
		}
	}	
});