(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'ui.bootstrap',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ngResource', 'angular-md5'
        ]);
})();
