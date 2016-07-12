var blob;
app.controller('uploadController', function($http, $scope) {
    var geo;
    $scope.getGeo = function() {
        if ($scope.enableGeo) {
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }
            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position) {
                geo = position.coords.latitude + ', ' + position.coords.longitude;
                //alert(geo);
            };

            function onError(error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }
        }
    }
    $scope.uploadFile = function() {
        var x = document.getElementById('file');
        var fd = new FormData();

        if ($scope.tag == undefined)
            $scope.tag = "";
        if (geo == undefined)
            geo = "";
        fd.append('username', localStorage.getItem('username'));
        fd.append('title', $scope.title);
        fd.append('tag', $scope.tag);
        fd.append('geolocation', geo);
        fd.append('file', x.files[0]);
        $http({
                url: 'http://192.168.1.137:10000/api/passfile',
                method: 'POST',
                headers: {
                    "content-type": undefined
                },
                data: fd
            })
            .success(function(data) {
                console.log(data);
            });
    }
    $scope.takePicture = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        $scope.myImg = {
            src: ""
        };


        function onSuccess(imageData) {
            $scope.myImg.src = "data:image/jpeg;base64," + imageData;
            $scope.pp = imageData;

            var imageBase64 = imageData;
            blob = new Blob([imageBase64], {
                type: 'image/jpeg'
            });
            console.log(blob);

            var fd = new FormData();

            if ($scope.tag == undefined)
                $scope.tag = "";
            if (geo == undefined)
                geo = "";
            fd.append('username', localStorage.getItem('username'));
            fd.append('title', $scope.title);
            fd.append('tag', $scope.tag);
            fd.append('geolocation', geo);
            fd.append('file', blob);
            $http({
                    url: 'http://192.168.1.137:10000/api/passfile',
                    method: 'POST',
                    headers: {
                        "content-type": undefined
                    },
                    data: fd
                })
                .success(function(data) {
                    console.log(data);
                });

            // var contentType = 'image/jpeg';
            // var b64Data = imageData;

            // var blob = b64toBlob(b64Data, contentType);
            // var blobUrl = URL.createObjectURL(blob);
            // console.log(blob);
            // console.log(blobUrl);

            // var img = document.createElement('img');
            // img.src = blobUrl;
            // document.body.appendChild(img);


            $scope.$apply();
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
})
