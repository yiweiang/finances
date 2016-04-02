var app1 = angular.module('chartApp', ['nvd3'])
  .controller('barChartController', function($scope, $http) {

    $scope.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d) { return d.category; },
        y: function(d) { return d.amount; },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.2f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }
    
    $http.get('http://' + window.location.host + '/expenses/listAll')
    .success(function(data) {
      
      $scope.data = [
        {
          key: "Cumulative Return",
          values:data
        }]
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


    })