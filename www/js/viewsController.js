app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    	.state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .state('home.home2', {
            url: '/home2',
            templateUrl: 'views/home2.html',
            controller: 'home2Controller'
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
        .state('home.home2.profile', {
        	url: '/profile',
        	templateUrl: 'views/profile.html',
        	controller: 'profileController'
        })
        .state('home.home2.upload', {
        	url: '/upload',
        	templateUrl: 'views/upload.html',
        	controller: 'uploadController'
        })
        .state('home.home2.photos', {
            url: '/photos',
            templateUrl: 'views/photos.html',
            controller: 'photosController'
        })
        // .state('home.takePic', {
        //     url: '/takePic',
        //     templateUrl: 'views/takePic.html',
        //     controller: 'takePicController'
        // })
    $urlRouterProvider.otherwise('home');
});