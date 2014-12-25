class Configuration extends Run
    constructor: ($ionicPlatform) ->
        if window.cordova and window.cordova.plugins.Keyboard
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

        StatusBar.styleDefault() if window.StatusBar