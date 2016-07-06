var div = document.getElementById('div');
var id;
app.controller('photosController', function($http, $scope, $state, $sce){
	$scope.loadP = function(){
		$http.get("http://192.168.1.100:10000/info_publish/0")
		.success(function(data){
			console.log(data);
			$scope.pictures = data.response;
			for(var i = 0; i<data.response.length; i++){
				if(data.response[i].publish_type=='video/mp4' || data.response[i].publish_type=='video/3gpp'){
					var videoUrl = "http://192.168.1.100:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
  					$scope.videoUrl = $sce.trustAsResourceUrl(videoUrl);
  					console.log(videoUrl);
  				}
  				if(data.response[i].publish_type=='audio/mp3'){
					var audioUrl = "http://192.168.1.100:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
  					$scope.audioUrl = $sce.trustAsResourceUrl(audioUrl);
  				}
			}
			/*$http.get("http://192.168.1.100:10000/likes")
			.success(function(data){
				console.log(data);			
			});*/
		});
	},
	$scope.likes = {
		like: function (id) {
			var params = {
				id: id,
				token: localStorage.getItem('token')
			};
			// console.log(params);
			$http.post("http://192.168.1.100:10000/likes", params)
			.success(function(data){
				console.log(data);
				$scope.lik = data.quantity;
				var p = document.createElement('p');
				p.innerHTML=data.quantity;
				
			});	
		}
	}	
});