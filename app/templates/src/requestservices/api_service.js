(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('APIService', APIService);

    APIService.$inject = ['$resource', 'md5', 'config'];
    /* @ngInject */
    function APIService($resource, md5, config) {

        return {
            InitApiMethod: InitApiMethod,
            InitREST: InitREST
        };

        function Resource(settings) {
            var baseDomain = config.domainProtocol + config.domainEndpoint + config.portEndpoint,
                options = {
                    api: '',
                    params: {},
                    data: {}
                };

            angular.extend(options, settings || {});

            return $resource(baseDomain + options.api, {});
        }

        function InitApiMethod(apiEndpoint, method) {

            function APIMethod() {}

            APIMethod.prototype.apiResource = new Resource({api: apiEndpoint});
            APIMethod.prototype.requestPromiseHashByParams = {};
            APIMethod.prototype.run = returnRequestFunction(APIMethod, method);

            return new APIMethod();
        }

        function InitREST(apiEndpoint) {

            function RESTApi() {}

            RESTApi.prototype.apiResource = new Resource({api: apiEndpoint});
            RESTApi.prototype.requestPromiseHashByParams = {};
            RESTApi.prototype.get = returnRequestFunction(RESTApi, 'get');
            RESTApi.prototype.post = returnRequestFunction(RESTApi, 'post');
            RESTApi.prototype.update = returnRequestFunction(RESTApi, 'update');
            RESTApi.prototype.delete = returnRequestFunction(RESTApi, 'delete');

            return new RESTApi();
        }

        function returnRequestFunction(classInstance, method) {
            return function (params) {
                var stringifiedParams = JSON.stringify(params),
                    hashedParams;
                if (stringifiedParams) {
                    hashedParams = md5.createHash(stringifiedParams);
                }

                if (this.requestPromiseHashByParams.hasOwnProperty(hashedParams)) {
                    return classInstance.requestPromiseHashByParams[hashedParams];
                } else {
                    this.requestPromiseHashByParams[hashedParams] = this.apiResource[method](params || {});
                    removePromiseAfterRequest(this.requestPromiseHashByParams, hashedParams);
                    return this.requestPromiseHashByParams[hashedParams];
                }

                function removePromiseAfterRequest(promise, key) {
                    promise[key].$promise.finally(function () {
                        delete promise[key];
                    });
                }
            };
        }
    }
})();
