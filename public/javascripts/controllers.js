function ctrlButtons($scope, $http) {
  $scope.loadResource = function () {
    $http.get('/api/users'+'?token='+$scope.token).success(function(data) {
      $scope.resource = data.value;
      $scope.error = data.error;
    }).error(function(data) {
      $scope.resource = data.value;
      $scope.error = data.error;
    });
  }

  $scope.getToken = function () {
    $http.get('/api/token').success(function(data) {
      $scope.token = data.token;
    });
  }

  $scope.resource = "not loaded";
  $scope.token;
}

function ctrlButtonsSimple($scope, $http) {
  $scope.loadResource = function () {
    $http.get('/api/users').success(function(data) {
      $scope.resource = data.value;
      $scope.error = data.error;
    }).error(function(data) {
      $scope.resource = data.value;
      $scope.error = data.error;
    });
  }
}