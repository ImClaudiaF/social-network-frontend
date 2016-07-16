var blob;
var fd = new FormData();

app.controller('uploadController', function($http, $scope, $state) {
    var geo;
    $scope.flagO = function() {
        flag = false;
        console.log(flag);
    }
    $scope.getGeo = function() {
        if ($scope.enableGeo) {
            var options = {
                enableHighAccuracy: true,
                maximumAge: 3600000
            }
            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position) {
                geo = position.coords.latitude + ', ' + position.coords.longitude;
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
                $scope.status = data.status;
                setTimeout(function() {
                    $state.transitionTo('home.home2.profile');
                }, 2000);
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

        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: mime
            });
        }

        function onSuccess(imageData) {
            $scope.myImg.src = "data:image/jpeg;base64," + imageData;

            var imageBase64 = "data:image/jpeg;base64," + imageData;
            var blob = dataURLtoBlob(imageBase64);

            fd.delete('username');
            fd.delete('title');
            fd.delete('tag');
            fd.delete('geolocation');
            fd.delete('file');

            if ($scope.tag == undefined)
                $scope.tag = "";
            if (geo == undefined)
                geo = "";
            fd.append('username', localStorage.getItem('username'));
            // fd.append('title', $scope.title);
            fd.append('tag', $scope.tag);
            fd.append('geolocation', geo);
            fd.append('file', blob);

            $scope.$apply();
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
    $scope.publish = function() {
        fd.append('title', $scope.title);
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
                $scope.status = data.status;
                setTimeout(function() {
                    $state.transitionTo('home.home2.profile');
                }, 2000);
            });
        //$scope.$apply();
    }
})
