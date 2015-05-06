mainModule.controller('defaultController', function($scope, $routeParams, $location, defaultFactory) {

	var getAllUsers = function(){
		console.log("Client/javascripts/controllers/defaultController - getAllUsers()");

		// // Add this controller in the Factory
		// defaultFactory.addControllersToAlert(function(){alert("callback from defaultController")});
		// // Write all code that you want this controller to be update
		// defaultFactory.addControllersToAlert(function(data){alert(data)});


		defaultFactory.getAllUsers(function(users){
			console.log("Client/javascripts/controllers/defaultController - defaultFactory.getAllUsers(callback(users)) - users: ", users);
			$scope.users = users;
		});
	}

	getAllUsers();


	$scope.addUser = function(newUser){
		// Rails Related for CSRF
			// $scope.addEntry = ->
			// $scope.newEntry.authenticity_token = $scope.authenticity_token 
			newUser.authenticity_token = $scope.authenticity_token 
			// entry = Entry.save($scope.newEntry)
			// $scope.entries.push(entry)
			$scope.newEntry = {}
		// END

		console.log("Client/javascripts/controllers/defaultController - addUser(newUser) - newUser: ", newUser);
		defaultFactory.addUser(newUser,function(user){
			if(user.errors)
				$scope.errors = user.errors;
			else
			{
				$scope.errors = {};
				$scope.newUser = {};
				defaultFactory.getAllUsers(function(users){
					console.log("Client/javascripts/controllers/defaultController - defaultFactory.getAllUsers(callback(users)) - users: ", users);
					$scope.users = users;
					$scope.newUser = {};
				});
			}
		});
	}

	$scope.destroyUser = function(user){
		console.log("Client/javascripts/controllers/defaultController - destroyUser(user) - user: ", user);
		defaultFactory.destroyUser(user, function(){
			defaultFactory.getAllUsers(function(users){
				console.log("Client/javascripts/controllers/defaultController - defaultFactory.getAllUsers(callback(users)) - users: ", users);
				$scope.users = users;
			});
		});
	}

	$scope.showUser = function(user){
		console.log("Client/javascripts/controllers/defaultController - showUser(user) - user: ", user);
		$location.path('/oneUser'); //change partials from the controller // Loads new controller (unique controller to pull this user, per factory info get and set user in factory)
		defaultFactory.getUser(user, function(user){
			console.log("Client/javascripts/controllers/defaultController - defaultFactory.getUser(callback(user)) - user: ", user);
			$scope.user = user;
		});
	}

	$scope.updateUser = function(user){
		console.log("Client/javascripts/controllers/defaultController - updateUser(user) - user: ", user);
		defaultFactory.updateUser(user, function(updatedUser){
			console.log("Client/javascripts/controllers/defaultController - defaultFactory.updateUser(callback(updatedUser)) - updatedUser: ", updatedUser);
			defaultFactory.getAllUsers(function(users){
				console.log("Client/javascripts/controllers/defaultController - defaultFactory.getAllUsers(callback(users)) - users: ", users);
				$scope.users = users;
			});
		});
	}

	var sample = function(){
		$scope.myName = prompt("Sample");
	}
	sample();

	// function sample(){
	// 	$scope.myName = prompt("Sample");
	// }
	// smaple();

	// (function(){
	// 	$scope.myName = prompt("Sample");
	// }());

	
});
