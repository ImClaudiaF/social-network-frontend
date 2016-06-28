var app = angular.module('app', ['ui.router']);

/*app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    	.state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })
        .state('home.profile', {
        	url: '/profile',
        	templateUrl: 'views/profile.html',
        	controller: 'profileController'
        })
        .state('home.upload', {
        	url: '/upload',
        	templateUrl: 'views/upload.html',
        	controller: 'uploadController'
        })
    $urlRouterProvider.otherwise('home/login');
});

app.controller('uploadController', function($http, $scope){
	var geo;
	$scope.geolocation = function() {
		navigator.geolocation.getCurrentPosition(function(position){
			geo = position.coords.latitude +', ' + position.coords.longitude;
			return geo;
		});
	},
	$scope.upload = {
		uploadFile: function(){
			var x = document.getElementById('file');
			var fd = new FormData();
			fd.append('username', localStorage.getItem('username'));
			fd.append('title', $scope.title);	
			fd.append('tag', $scope.tag);
			fd.append('geolocation', geo);
			fd.append('file', x.files[0]);
			//fd.append('type', x.files[0].type);
			$http({
				url: 'http://192.168.1.100:10000/api/passfile',
				method: 'POST',
				headers: {
					"content-type": undefined
				},
				data: fd
			})
			.success(function(data){
				console.log(data);
			});
		},
		logout: function(){
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			$state.transitionTo('home.login');
		}
	}
});

app.controller('registerController', function($http,$scope){
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
			$http.post("http://192.168.1.100:10000/register", params)
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

app.controller('profileController', function($http, $scope, $state){
	$scope.profileInfo = function(){
		var params = {
			username: localStorage.getItem('username'),
			token: localStorage.getItem('token')
		}
		$http.get("http://192.168.1.100:10000/info/"+params.username+"/"+params.token)
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
		}
	}
});

app.controller('loginController', function($http, $scope, $state){
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

app.controller('homeController', function($http, $scope, $state){
	$scope.init = function() {
		alert();
		if(localStorage.length==2)
			$state.transitionTo('home.profile');
	}
});*/