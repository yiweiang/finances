// public/core.js
var app = angular.module('financeApp2', ['ngMaterial', 'ngMessages', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : '/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	});
	$urlRouterProvider.otherwise('login');
}]);

app.controller('mainController', ['$scope', 'LineItems', function mainController($scope, LineItems) {
  
  $scope.lineItems = LineItems.lineItems

}]);

app.factory('LineItems', function() {
  var e = {
    lineItems : [{"amount": 20}]
  }
  
  
  return e;
})


