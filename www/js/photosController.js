var div = document.getElementById('div');
app.controller('photosController', function($http, $scope, $state){
	$scope.loadP = function(){
		$http.get("http://192.168.1.137:10000/info_publish/0")
		.success(function(data){
			console.log(data);
			for(var i = 0; i<data.response.length; i++){
				console.log(i);
				if(data.response[i].publish_type=="image/jpeg"){
					var br = document.createElement('br');
					var h4 = document.createElement('h4');
					h4.innerHTML = data.response[i].publish_user;
					//$scope.username=data.response[i].publish_user;
					console.log('imagen '+i);
					var img = document.createElement('img');
					img.src = "http://192.168.1.137:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
					div.appendChild(h4);
					div.appendChild(img);
					div.appendChild(br);
				}
			}
			/*if(data.response[0].publish_type=="image/jpeg"){
				var img1 = document.createElement('img');
				console.log(data.response[0].publish_url);
				console.log(data.response[0].publish_filename);
				img1.src = "http://192.168.1.137:10000/" + data.response[0].publish_url + "/" + data.response[0].publish_filename;
				console.log(img1.src);
				div.appendChild(img1);
				//document.body.appendChild(img1);
				//body.appendChild(img1);
			}*/
		});
	}
});