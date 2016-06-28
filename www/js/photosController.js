var div = document.getElementById("div");

app.controller('photosController', function($http, $scope, $state){
	$scope.loadP = function(){
		$http.get("http://192.168.1.100:10000/info_publish/0")
		.success(function(data){
			console.log(data.response[0]);
			if(data.response[0].publish_type=="image/jpeg"){
				var img1 = document.createElement('img');
				img1.src = "http://192.168.1.100:10000/" + data.response[0].publish_url + "/" + data.response[0].publish_filename;
				console.log(img1.src);
				//body.appendChild(img1);
			}
		});
	}
});