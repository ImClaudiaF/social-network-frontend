app.controller('registerController', function($http, $scope, $state) {
    $scope.register = function() {
        var params = {
            name: $scope.name,
            lastname: $scope.lastname,
            email: $scope.email,
            username: $scope.username,
            password: $scope.password
        };
        console.log(params);
        $http.post("http://192.168.1.137:10000/register", params)
            .success(function(data) {
                console.log(data);
                $scope.status = data.status;
                if (data.status == 200) {
                    console.log(data.info.token);
                    setTimeout(function () {
                        $state.transitionTo('home.login');
                    }, 1500)
                }
            });
    }
    $scope.login = function() {
        $state.transitionTo('home.login');
    }
});
