mainModule.factory('defaultFactory', function($http, $resource) {
	var factory = {};
	var users = [];
	var controllersToAlert = [];

	factory.addControllersToAlert = function(callback){
		controllersToAlert.push(callback)
		console.log(callback)
	};

	factory.alertAllControllers = function(){
		for(i in controllersToAlert)
		{
			controllersToAlert[i](123);
		}
	}

	factory.getAllUsers = function(callback){
		console.log("Client/javascripts/factories/defaultFactory - getAllUsers()");
		// Node Server
		// $http.get('/user/getAllUsers').success(function(returned_data_from_server){
		// 	console.log("Server responded with: ", returned_data_from_server);
		// 	callback(returned_data_from_server);
		// });
	
		// Rails Server
		$http.get('/users.json').success(function(returned_data_from_server){
			console.log("Server responded with: ", returned_data_from_server);
			callback(returned_data_from_server);
		});
	
	}



	factory.addUser = function(newUser, callback){
		console.log("Client/javascripts/factories/defaultFactory - addUser() - newUser: ", newUser);

		$http.post('/users', newUser).success(function(returned_data_from_server){
			console.log("SUCCESSFUL - BACK TO FACTORY", returned_data_from_server);
			factory.alertAllControllers();
			callback(returned_data_from_server);
		});

	}

	factory.destroyUser = function(user, callback){
		console.log("Client/javascripts/factories/defaultFactory - destroyUser()");

		var temp = {} 
		temp.authenticity_token = user.authenticity_token

		$http.post('/users/'+user.id, temp).success(function(returned_data_from_server){
			console.log("SUCCESSFUL - BACK TO FACTORY FROM DELETING USER", returned_data_from_server);
			callback(returned_data_from_server);
		});
	}


	factory.getUser = function(user, callback){
		console.log("Client/javascripts/factories/defaultFactory - getUser() - user: ", user);
		$http.get('/users/'+user.id).success(function(returned_data_from_server){
			console.log("SUCCESSFUL - BACK TO FACTORY FROM GETTING USER", returned_data_from_server);
			callback(returned_data_from_server);
		});
	}


	factory.updateUser = function(user, callback){
		console.log("Client/javascripts/factories/defaultFactory - updateUser() - user: ", user);
		$http.post('/users/'+user.id+'/update', user).success(function(returned_data_from_server){
			console.log("SUCCESSFUL - BACK TO FACTORY FROM UPDATING USER", returned_data_from_server);
			callback(returned_data_from_server);
		});
	}

	return factory;
});
