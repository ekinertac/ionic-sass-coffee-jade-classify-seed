class Routes extends Config
    constructor: ($stateProvider, $urlRouterProvider)->
        $stateProvider
        .state "app",
            url: "/app"
            abstract: true
            templateUrl: "templates/menu.html"
            controller: "mainController"

        .state "app.playlists",
            url: "/playlists"
            views:
                menuContent:
                    templateUrl: "templates/playlists.html"
                    controller: 'playlistsController'

        .state "app.search",
            url: "/search"
            views:
                menuContent:
                    templateUrl: "templates/search.html"

        .state "app.browse",
            url: "/browse"
            views:
                menuContent:
                    templateUrl: "templates/browse.html"

        .state "app.single",
            url: "/playlists/:playlistId"
            views:
                menuContent:
                    templateUrl: "templates/playlist.html"
                    controller: "playlistController"

            $urlRouterProvider.otherwise "/app/playlists"


