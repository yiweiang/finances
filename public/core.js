// public/core.js
var app = angular.module('financeApp', ['ngMaterial', 'ngMessages']);


/*
app.controller('LineItemController', [
  '$scope',
  '$stateParams',
  'lineItems',
  'lineItem',
  function($scope, $stateParams, lineItems, lineItem) {
    
    $scope.lineItems = lineItems;

  }]);*/

app.controller('mainController', ['$scope', '$http', function mainController($scope, $http, $location, $window, lIInterface) {
  $scope.formData = {};
  $scope.loading = true;
  $scope.lineItems = lIInterface.lineItems;
  console.log(lIInterface )

  $scope.deleteLineItem = function(id) {
    $http.delete('http://' + window.location.host + '/expenses/delete/' + id)
      .success(function(data) {
        $scope.lineItems = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.myDate = new Date();
  $scope.categories = [{ name: "General Spending", id: "general" }, { name: "Living Expenses", id: "living" }, { name: "Food", id: "food" }, { name: "Health & Wellness", id: "health" },
    { name: "Transportation", id: "transportation" }, { name: "Income", id: "income" }]


  $scope.newSpendingLink = function() {
    console.log("NS selected")
    if ($window.location.href != 'http://' + window.location.host + '/')
      $window.location.href = 'http://' + window.location.host + '/';
  }

  $scope.overviewLink = function() {
    console.log("OV selected")
    if ($window.location.href != 'http://' + window.location.host + '/expenses/list')
      $window.location.href = 'http://' + window.location.host + '/expenses/list';
  }

  $scope.login = function() {
    $window.location.href = 'http://' + window.location.host + '/auth/google';
  }


}]);

app.factory('lIInterface', function() {
  var e = {"lineItems": "x"}
  
  return e;
})

