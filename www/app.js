var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
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
				console.log(data.info.token);
				//localStorage.setItem('username','data.info.');
			});	
		}
	}	
});

app.controller('loginController', function($http,$scope){
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
				console.log(data.info.user_nickn);
				console.log(data.info.user_token);
				username = data.info.user_nickn;
				token = data.info.user_token;
				localStorage.setItem('username', username);
				localStorage.setItem('token', token);
			});	
		}
	}
});

app.controller('homeController', function($http, $scope, $state){
	$scope.init = function() {
		if(localStorage.length==2)
			$state.transitionTo('home.profile');
	}
});

app.controller('profileController', function($http, $scope, $state){
	$scope.profile = {
		profileInfo: function(){
			var params = {
				username: localStorage.getItem('username'),
				token: localStorage.getItem('token')
			}
			console.log(params)
			$http.post("http://192.168.1.100:10000/info", params)
			.success(function(data){
				console.log(data);
				//console.log(data.info.token);
				//localStorage.setItem('username','data.info.');
			});
		},
		upload: function(){
			$state.transitionTo('home.upload');
		}
	}
});

app.controller('uploadController', function($http, $scope){
	$scope.geolocation = function() {
		navigator.geolocation.getCurrentPosition(function(position){
			geo = position.coords.latitude +', ' + position.coords.longitude;
			return geo;
		});
	},
	$scope.upload = {
		uploadFile: function(){
			var x = document.getElementById('file');
			//no json, formdata
			var params = {
				username: localStorage.getItem('username'),
				title: $scope.title,
				description: $scope.description,
				tag: $scope.tag,
				geolocation: geo,
				//file: $scope.file
			}//formdata
			console.log(x.files[0].type);
			console.log(x.value);
			console.log(params);
		}
	}
})