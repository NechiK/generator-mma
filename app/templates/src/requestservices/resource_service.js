(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ResourceService', ResourceService);

    ResourceService.$inject = ['$resource'];
    /* @ngInject */
    function ResourceService($resource) {

        function resource(settings) {
            var baseDomain = '', //base API domain
                options = {
                    api: '',
                    params: {},
                    data: {}
                };

            angular.extend(options, settings || {});

            return $resource(baseDomain + options.api, {});
        }

        return {
            resource: resource
        };
    }
})();
