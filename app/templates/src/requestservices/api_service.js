(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('APIService', APIService);

    APIService.$inject = ['ResourceService', 'md5'];
    /* @ngInject */
    function APIService(ResourceService, md5) {

        return {
            InitApiMethod: InitApiMethod,
            InitREST: InitREST
        };

        function InitApiMethod(apiEndpoint, method) {

            function APIMethod() {
                this.requestPromiseHashByParams = {};
            }

            APIMethod.prototype.apiResource = new ResourceService.resource({api: apiEndpoint});
            APIMethod.prototype.run = returnRequestFunction(method);

            return new APIMethod();
        }

        function InitREST(apiEndpoint) {

            function RESTApi() {
                this.requestPromiseHashByParams = {};
            }

            RESTApi.prototype.apiResource = new ResourceService.resource({api: apiEndpoint});
            RESTApi.prototype.get = returnRequestFunction('get');
            RESTApi.prototype.post = returnRequestFunction('post');
            RESTApi.prototype.update = returnRequestFunction('update');
            RESTApi.prototype.delete = returnRequestFunction('delete');

            return new RESTApi();
        }

        function returnRequestFunction(method) {
            return function (params, force) {
                var stringifiedParams = JSON.stringify(params),
                    hashedParams;
                if (stringifiedParams) {
                    hashedParams = md5.createHash(stringifiedParams);
                }
                if (force) {
                    this.requestPromiseHashByParams[hashedParams] = this.apiResource[method](params || {});
                    return this.requestPromiseHashByParams[hashedParams];
                }

                if (this.requestPromiseHashByParams.hasOwnProperty(hashedParams)) {
                    return this.requestPromiseHashByParams[hashedParams];
                } else {
                    this.requestPromiseHashByParams[hashedParams] = this.apiResource[method](params || {});
                    return this.requestPromiseHashByParams[hashedParams];
                }
            };
        }
    }
})();
