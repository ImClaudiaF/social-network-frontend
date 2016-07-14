var div = document.getElementById('div');
// var id;
var pg;
var mediaUrl = [];
app.controller('photosController', function($http, $scope, $state, $sce) {
    $scope.loadP = function() {
            pg = 0;
            $http.get("http://192.168.1.137:10000/info_publish/" + pg)
                .success(function(data) {
                    console.log(data);
                    $scope.pictures = data.response.map(function(el) {
                        el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
                        el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
                        return el;
                    });
                });
            console.log(pg);
            document.onscroll = function(ev) {
                if (pg < 4) {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        console.log(pg);
                        $http.get("http://192.168.1.137:10000/info_publish/" + (pg * 5))
                            .success(function(data) {
                                console.log(data);
                                $scope.pictures = data.response.map(function(el) {
                                    el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
                                    el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
                                    return el;
                                });
                                // console.log('pg'+pg);
                            });
                        pg++;
                        console.log('pg' + pg);
                    }
                }
            }
        },
        $scope.likes = function(id) {
            var params = {
                id: id,
                token: localStorage.getItem('token')
            };
            $http.post("http://192.168.1.137:10000/likes", params)
                .success(function(data) {
                    console.log(data);
                    $scope.lik = data.quantity;
                    // var p = document.createElement('p');
                    // p.innerHTML = data.quantity;
                });
        }
});
