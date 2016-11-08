(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$state', 'logger', '$stateParams',
        '$q'
    ];
    /* @ngInject */
    function MainController(
        $state, logger, $stateParams, $q
    ) {
        var vm = this;

        vm.menu = {

        };

        vm.model = {};

        activate();

        function activate() {

        }
    }
})();
