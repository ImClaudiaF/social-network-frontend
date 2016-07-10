app.controller('uploadController', function($http, $scope){
	var geo;
	// $scope.geolocation = function() {
	// 	var options = {
	// 		enableHighAccuracy: true,
 //     	 	maximumAge: 3600000
 //   		}
	
	// 	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

 //   		function onSuccess(position) {
	//    		geo = position.coords.latitude +', ' + position.coords.longitude;
	//    	};

	//    	function onError(error) {
	//       	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	//    	}
	// },
	$scope.geo = {
		getGeo: function(){
			if($scope.enableGeo){
				var options = {
					enableHighAccuracy: true,
     	 			maximumAge: 3600000
   				}
				var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

		   		function onSuccess(position) {
			   		geo = position.coords.latitude +', ' + position.coords.longitude;
			   		//alert(geo);
			   	};

			   	function onError(error) {
			      	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			   	}
			}					
		}
	},
	$scope.upload = {
		uploadFile: function(){
			var x = document.getElementById('file');
			var fd = new FormData();

			if($scope.tag==undefined)
				$scope.tag = "";
			if(geo==undefined)
				geo = "";
			fd.append('username', localStorage.getItem('username'));
			fd.append('title', $scope.title);	
			fd.append('tag', $scope.tag);
			fd.append('geolocation', geo);
			fd.append('file', x.files[0]);
			//fd.append('type', x.files[0].type);
			$http({
				url: 'http://192.168.1.137:10000/api/passfile',
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
})