var mainModule = angular.module('mainModule', ['ngRoute']);

mainModule.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: '/assets/sitewide/partials/defaultPartial.html'
	})
	.when('/secondPartial', {
		templateUrl: '/assets/sitewide/partials/secondaryDefaultPartial.html'
	})
	.when('/oneUser', {
		templateUrl: '/assets/sitewide/partials/oneUser.html'
	})
	.when('/user/show/:id', {
		templateUrl: '/assets/sitewide/partials/oneUser.html',
		controller: "defaultControllerOne"
	})
	.otherwise({
		redirectTo: '/'
	});
});