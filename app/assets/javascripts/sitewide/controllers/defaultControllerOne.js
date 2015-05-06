mainModule.controller('defaultControllerOne', function($scope, $routeParams, defaultFactory) {

	var getOneUser = function (){
		defaultFactory.getUser($routeParams.id, function(user){
			console.log("Client/javascripts/controllers/defaultControllerOne - defaultFactory.getOneUser($routeParams.id, callback(user)) - user: ", user);
			$scope.user = user;
		});
	}
	getOneUser();

});
