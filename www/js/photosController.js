
var div = document.getElementById('div');
// var id;
var pg;
var mediaUrl=[];
app.controller('photosController', function($http, $scope, $state, $sce){
	$scope.loadP = function(){
		pg = 0;
		$http.get("http://192.168.1.137:10000/info_publish/"+pg)
		.success(function(data){
			console.log(data);
			$scope.pictures = data.response.map(function (el) {
				el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
				el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
				return el;
			});
		});
		console.log(pg);
		document.onscroll = function(ev) {
			if(pg<4){	
	    		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	        		console.log(pg);
	        		$http.get("http://192.168.1.137:10000/info_publish/"+(pg*5))
					.success(function(data){					
						console.log(data);
						$scope.pictures = data.response.map(function (el) {
							el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
							el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
							return el;
						});
						// console.log('pg'+pg);
					});  	
					pg++;
					console.log('pg'+pg);
	    		}	    				
	    	}
	    } 	
	},
	$scope.likes = {
		like: function (id) {
			var params = {
				id: id,
				token: localStorage.getItem('token')
			};
			// console.log(params);
			$http.post("http://192.168.1.137:10000/likes", params)
			.success(function(data){
				console.log(data);
				$scope.lik = data.quantity;
				var p = document.createElement('p');
				p.innerHTML=data.quantity;

			});	
		},
		// dowwn: 
		// 	window.addEventListener('scroll', function() {
		// 	var scrollHeight = $(document).height();
		// 	var scrollPosition = $(window).height() + $(window).scrollTop();
		// 	var verf = (scrollHeight - scrollPosition) / scrollHeight;
		// 	console.log('sinparse '+verf);
		// 	if(verf<0.01){
		// 	verf = parseInt(verf);
		// 	console.log('parseado '+verf);}
		// 	if (verf == 0) {
		// 		pg++;
		// 		$http.get("http://192.168.0.150:10000/info_publish/"+pg)
		// 		.success(function(data){
		// 			console.log(data);
		// 			$scope.pictures = data.response;
		// 			for(var i = 0; i<data.response.length; i++){
		// 					mediaUrl[i] = "http://192.168.0.150:10000/" + data.response[i].publish_url + "/" + data.response[i].publish_filename;
		//   					$scope.mediaUrl = $sce.trustAsResourceUrl(mediaUrl[i]);
		//   					//console.log($scope.mediaUrl);
		//   					console.log(pg)
		// 			}
		// 		});
		// 	 }
		// 	 $scope.$apply();
		// })
	}	
});
