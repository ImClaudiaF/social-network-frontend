app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    	.state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })
        .state('home.profile', {
        	url: '/profile',
        	templateUrl: 'views/profile.html',
        	controller: 'profileController'
        })
        .state('home.upload', {
        	url: '/upload',
        	templateUrl: 'views/upload.html',
        	controller: 'uploadController'
        })
        .state('home.photos', {
            url: '/photos',
            templateUrl: 'views/photos.html',
            controller: 'photosController'
        })
    $urlRouterProvider.otherwise('home/login');
});