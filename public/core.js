// public/core.js
var scotchTodo = angular.module('financeApp', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http.get('http://' + window.location.host + '/expenses/listAll')
    .success(function(data) {
      $scope.lineItems = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.deleteLineItem = function(id) {
    $http.delete('http://' + window.location.host + '/expenses/delete/' + id)
      .success(function(data) {
        console.log(data)
        $scope.lineItems = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}