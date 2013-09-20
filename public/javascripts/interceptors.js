
m2.config( function($httpProvider, $provide) {
  $provide.factory('myHttpInterceptor', function($q, $rootScope) {

    return {
      'request': function(config) {
        config.url = config.url + '?token='+$rootScope.token
console.log('config', config);
        return config;
      },

     'responseError': function(rejection) {
console.log('rejection 2', rejection);

        var status = rejection.status;

        if (status == 401) {
          var deferred = $q.defer();
          var req = {
            config: rejection.config,
            deferred: deferred
          }

          $rootScope.requests401.push(req);

          $rootScope.$broadcast('event:tokenRequired');

          return deferred.promise;
        }

        return $q.reject(rejection);
      }

    };
  });

  $httpProvider.interceptors.push('myHttpInterceptor');
})

m2.run(function($rootScope, $http) {
  $rootScope.requests401 = [];
  $rootScope.token;

  function getToken() {
    function retry(req) {
      $http(req.config).then(function(response) {
        req.deferred.resolve(response);
      });
    }

    $http.get('/api/token').success(function(data) {
      $rootScope.token = data.token;

      var i;
      var requests401 = $rootScope.requests401;
      for (var i = 0; i < requests401.length; i++) {
        retry(requests401[i]);
      }
      $rootScope.requests401 = [];
    });
  }

  $rootScope.$on('event:tokenRequired', getToken);

});

