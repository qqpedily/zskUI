define(function (require, exports, module) {
    var angular = require('angular');
    var angularcookie = require('angular-cookies')
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');

    var app = angular.module('app', ['ui.router', 'ngCookies']);
    app.config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
        }
    ]);
    asyncLoader.configure(app);
    module.exports = app;
});