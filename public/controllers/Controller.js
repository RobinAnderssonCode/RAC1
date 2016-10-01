var app = angular.module("RESTfulApp", []);

app.controller("AppCtrl", function($scope, $http) {
    function getData() {
        $http.get("/contactlist").success(function(response) {
            $scope.contactlist = response;
            $scope.contact = "";
        });
    }
    getData();

    $scope.addContact = function() {
        $http.post("/contactlist", $scope.contact).success(function(response) {
            getData();
        });
    };

    $scope.editContact = function(id) {
        console.log(id);
        $http.get("/contactlist/" + id).success(function(response) {
            $scope.contact = response;
            $('#add').hide();
            $('#clear').show();
            $('#update').show();
        });
    };

    $scope.update = function() {
        $http.put("/contactlist/" + $scope.contact._id, $scope.contact).success(function(response) {
            $('#add').show();
            $('#clear').hide();
            $('#update').hide();
            getData();
        });
    };

    $scope.clear = function() {
        $scope.contact = "";
        $('#add').show();
        $('#clear').hide();
        $('#update').hide();
    };

    $scope.delContact = function(id) {
        $http.delete("/contactlist/" + id).success(function(response) {
            getData();
        });
    };

});
