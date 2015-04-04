angular.module('app', ['ui.router'])
  .controller('AppController', ['$scope', '$http', function($scope, $http) {
    $scope.member = [];
    $scope.loadData = function(){	
    	$http.get('/api/show').
			  success(function(data, status, headers, config) {
			    $scope.member = data;
			  }).
			  error(function(data, status, headers, config) {
			    $scope.error = data;
			  });
    };
    $scope.add = function(){
    	$http.get('/api/add/' + $scope.inputName).
			  success(function(data, status, headers, config) {
			    $scope.loadData();
			  }).
			  error(function(data, status, headers, config) {
			    $scope.error = data;
			  });
    };

    $scope.loadData();
  }]);