// Pekar till ng-app="myApp" i index.html.
var myApp = angular.module("myApp", []);

//Pekar till ng-controller="AppCtrl" i index.html. $scope är bron 
//mellan View och Controller
myApp.controller("AppCtrl", function($scope, $http){
	
	// /contact list är routen där vi hämtar data från
	// servern (senare mongodb) under function säger vi
	//vad den ska göra när den fått datan (GET)
	function getData() {
	$http.get("/contactlist").success(function(response) {
		//console.log("Controller: Imported db.");
		$scope.contactlist = response;
		$scope.contact = "";
	});
}
	getData();

	// Skickar det som är i $scope.contact tillbaka till db.
	// Bundet till knappen. .success(function(response) får tillbaka svaret
	// från model (server.js)
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post("/contactlist", $scope.contact).success(function(response){
			//console.log(response);
			getData();
		});
	};

	// Raderar en +kontakt via namn.
	$scope.delContact = function(id) {
		$http.delete("/contactlist/" + id).success(function(response){
			getData();

		});
	};
	
});