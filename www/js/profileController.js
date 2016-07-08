app.controller('profileController', function($http, $scope, $state, $sce){
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
			$scope.pictures = data.pictures.map(function (el) {
				el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
				el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
				return el;
			});
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