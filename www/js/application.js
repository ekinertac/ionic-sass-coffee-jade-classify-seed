var MainApp;

MainApp = (function() {
  function MainApp() {
    return ['ionic'];
  }

  return MainApp;

})();

angular.module('app', new MainApp());

var Configuration;

Configuration = (function() {
  function Configuration($ionicPlatform) {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  }

  return Configuration;

})();

angular.module('app').run(['$ionicPlatform', Configuration]);

var Main, Playlist, Playlists;

Main = (function() {
  function Main($scope, $ionicModal, $timeout) {
    $scope.loginData = {};
    $ionicModal.fromTemplateUrl("templates/login.html", {
      scope: $scope
    }).then(function(modal) {
      return $scope.modal = modal;
    });
    $scope.closeLogin = function() {
      return $scope.modal.hide();
    };
    $scope.login = function() {
      return $scope.modal.show();
    };
    $scope.doLogin = function() {
      console.log("Doing login", $scope.loginData);
      return $timeout(function() {
        return $scope.closeLogin();
      }, 1000);
    };
  }

  return Main;

})();

Playlist = (function() {
  function Playlist($scope, $stateParams) {}

  return Playlist;

})();

Playlists = (function() {
  function Playlists($scope) {
    $scope.playlists = [
      {
        title: "Reggae",
        id: 1
      }, {
        title: "Chill",
        id: 2
      }, {
        title: "Dubstep",
        id: 3
      }, {
        title: "Indie",
        id: 4
      }, {
        title: "Rap",
        id: 5
      }, {
        title: "Cowbell",
        id: 6
      }
    ];
  }

  return Playlists;

})();

angular.module('app').controller('mainController', ['$scope', '$ionicModal', '$timeout', Main]).controller('playlistController', ['$scope', '$stateParams', Playlist]).controller('playlistsController', ['$scope', Playlists]);

var Routes;

Routes = (function() {
  function Routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: "mainController"
    }).state("app.playlists", {
      url: "/playlists",
      views: {
        menuContent: {
          templateUrl: "templates/playlists.html",
          controller: 'playlistsController'
        }
      }
    }).state("app.search", {
      url: "/search",
      views: {
        menuContent: {
          templateUrl: "templates/search.html"
        }
      }
    }).state("app.browse", {
      url: "/browse",
      views: {
        menuContent: {
          templateUrl: "templates/browse.html"
        }
      }
    }).state("app.single", {
      url: "/playlists/:playlistId",
      views: {
        menuContent: {
          templateUrl: "templates/playlist.html",
          controller: "playlistController"
        }
      }
    }, $urlRouterProvider.otherwise("/app/playlists"));
  }

  return Routes;

})();

angular.module('app').config(['$stateProvider', '$urlRouterProvider', Routes]);
