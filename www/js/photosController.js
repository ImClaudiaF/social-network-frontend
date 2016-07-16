var div = document.getElementById('div');
// var id;
var pg, tpg;
var mediaUrl = [];
var flag = false;
app.controller('photosController', function($http, $scope, $state, $sce) {
    $scope.loadP = function() {
            flag = true;
            console.log(flag);
            pg = 0;
            $http.get("http://192.168.1.137:10000/info_publish/" + pg)
                .success(function(data) {
                    console.log(data);
                    tpg = data.response[0].count;
                    console.log(tpg);
                    $scope.pictures = data.response.map(function(el) {
                        el.mediaUrl = "http://192.168.1.137:10000/" + el.publish_url + "/" + el.publish_filename;
                        el.mediaUrl = $sce.trustAsResourceUrl(el.mediaUrl);
                        return el;
                    });
                });
            setTimeout(function() {
                tpg = (parseInt(tpg/5))+1;
                console.log(tpg)
                if(flag===true){
                    document.onscroll = function(ev) {
                        if (pg < tpg) {
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
                                    });
                                pg++;
                                console.log('pg' + pg);
                                window.scrollTo(0, 0);
                            }
                        }
                    }
                }
            }, 3000);
            console.log(pg);
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
                });
        }
});
