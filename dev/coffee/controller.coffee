class Main extends Controller
    constructor: ($scope, $ionicModal, $timeout) ->
        $scope.loginData = {}
        $ionicModal.fromTemplateUrl "templates/login.html",
            scope: $scope
        .then (modal) ->
            $scope.modal = modal

        $scope.closeLogin = ->
            $scope.modal.hide()

        $scope.login = ->
            $scope.modal.show()

        $scope.doLogin = ->
            console.log "Doing login", $scope.loginData

            $timeout ->
                $scope.closeLogin()
            , 1000


class Playlist extends Controller
    constructor: ($scope, $stateParams)->


class Playlists extends Controller
    constructor: ($scope) ->
        $scope.playlists = [
            {title: "Reggae", id: 1}
            {title: "Chill", id: 2}
            {title: "Dubstep", id: 3}
            {title: "Indie", id: 4}
            {title: "Rap", id: 5}
            {title: "Cowbell", id: 6}
        ]