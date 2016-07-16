app.controller('home2Controller', function($http, $scope, $state){
	$scope.upload = function() {
        $state.transitionTo('home.home2.upload');
    };
    $scope.profile = function() {
        $state.transitionTo('home.home2.profile');
    };
    $scope.photos = function() {
        $state.transitionTo('home.home2.photos');
    };
    $scope.hola = function(){
    	alert();
    }
});