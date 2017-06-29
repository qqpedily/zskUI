require.config({
    //配置总路径
    paths: {
        'angular': './lib/angular/angular',
        'angular-cookies': './lib/angular/angular-cookies.min',
        'angular-ui-router': './lib/angular-ui-router/release/angular-ui-router.min',
        'angular-async-loader': './lib/angular-async-loader/angular-async-loader',
        'angular-route': './lib/angular/angular-route.min',
        'css': './lib/requirejs/css.min',
    },

    shim: {
        // 表明该模块依赖angular
        'angular': { exports: 'angular' },
        'angular-cookies': { exports: 'angular-cookies', deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-route': ['angular'],
        //'angular-sanitize': ['angular']
    },
});

require(["angular", './javascripts/app-routes'], function (angular, routes) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});