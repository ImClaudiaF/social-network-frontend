var div = document.getElementById('div');
app.controller('photosController', function($http, $scope, $state){
	$scope.loadP = function(){
		$http.get("http://192.168.1.100:10000/info_publish/0")
		.success(function(data){
			console.log(data);
			for(var i = 0; i<data.response.length; i++){
				console.log(i);
				if(data.response[i].publish_type=="image/jpeg" || data.response[i].publish_type=="image/gif" || data.response[i].publish_type=="image/png"){
					var br = document.createElement('br');
					var h4 = document.createElement('h4');
					h4.innerHTML = data.response[i].publish_user;
					//$scope.username=data.response[i].publish_user;
					console.log('imagen '+i);
					var img = document.createElement('img');
					img.src = "http://192.168.1.100:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
					img.width=400;
					img.height=400;
					//img.controls=true;
					console.log(img);
					div.appendChild(h4);
					div.appendChild(img);
					div.appendChild(br);
				}
				else if(data.response[i].publish_type=="video/mp4"){
					var br = document.createElement('br');
					var h4 = document.createElement('h4');
					h4.innerHTML = data.response[i].publish_user;
					//$scope.username=data.response[i].publish_user;
					console.log('video '+i);
					var video = document.createElement('video');
					video.src = "http://192.168.1.100:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
					//img.width=400;
					//img.height=400;
					video.controls=true;
					console.log(video);
					div.appendChild(h4);
					div.appendChild(video);
					div.appendChild(br);
				}
				else if(data.response[i].publish_type=="audio/mp3"){
					var br = document.createElement('br');
					var h4 = document.createElement('h4');
					h4.innerHTML = data.response[i].publish_user;
					//$scope.username=data.response[i].publish_user;
					console.log('audio '+i);
					var audio = document.createElement('audio');
					audio.src = "http://192.168.1.100:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
					//img.width=400;
					//img.height=400;
					audio.controls=true;
					console.log(audio);
					div.appendChild(h4);
					div.appendChild(audio);
					div.appendChild(br);
				}
			}
		});
	}
});