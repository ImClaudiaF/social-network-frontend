app.controller("takePicController", ["$scope", "$http",
    function ($scope, $http) {
        // $scope.myImg = {
        //     src: ""
        // };

        // function onSuccess(imageData) {
        //      $scope.myImg.src = "data:image/jpeg;base64," + imageData;             
        //      $scope.$apply();
        // }

        // function onFail(message) {
        //     alert('Failed because: ' + message);
        // }

        // $scope.takePicture = function () {
        //     navigator.camera.captureImage(onSuccess, onFail, {
        //          quality: 50,
        //          destinationType: Camera.DestinationType.DATA_URL
        //     });
        // }
   //      var options = {
   //    limit: 1
   // };

   // navigator.device.capture.captureImage(onSuccess, onError, options);

   // function onSuccess(mediaFiles) {
   //    var i, path, len;
        
   //    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
   //       path = mediaFiles[i].fullPath;
   //       console.log(mediaFiles);
   //    }
   // }

   // function onError(error) {
   //    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
   // }
    }
]);