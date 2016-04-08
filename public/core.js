// public/core.js
var financeApp = angular.module('financeApp', []).controller('mainController', mainController);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.loading = true;

  // when landing on the page, get all todos and show them
  $http.get('http://' + window.location.host + '/expenses/listAll')
    .success(function(data) {
      $scope.lineItems = data;
      $scope.loading = false;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.deleteLineItem = function(id) {
    $http.delete('http://' + window.location.host + '/expenses/delete/' + id)
      .success(function(data) {
        $scope.lineItems = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}