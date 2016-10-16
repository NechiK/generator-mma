(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('requestService', requestService);

    requestService.$inject = [
        '$http', '$q'
    ];
    /* @ngInject */
    function requestService(
        $http, $q
    ) {
        var baseDomain = '', // API endpoints domain
            /*  Endpoint structure: endpointAssoc: {url: '/path/to/endpoint', method: 'HTTP Method'}
            *   Endpoint example: getUserData: {url: '/api/user/show', method: 'GET'}
            */
            endpoints = {

            },
            errorHandlers = {
                unhandledError: unhandledError,
                error400handler: error400handler,
                error401handler: error401handler,
                error500handler: error500handler
            };

        return {
            run: makeRequest
        };

        function makeRequest(endpoint, data, inputHeaders) {
            var requestInProgress = isRequestInProgress(endpoint);
            // Block set of identical requests
            if (!requestInProgress) {
                var deferred = $q.defer();
                return deferred.promise;
            }
            var url = endpoints[endpoint].url,
                headers = inputHeaders || {},
                formData;

            headers['Content-Type'] = inputHeaders['Content-Type'] || 'application/json';
            parseUrlParams(data, url);

            var sendData = {
                method: endpoints[endpoint].method,
                url: baseDomain + url,
                headers: headers
            };

            if (endpoints[endpoint].method === 'GET') {
                sendData['params'] = data;
            } else {
                if (headers['Content-Type'].match(/application\/x-www-form-urlencoded/)) {
                    var formDataKeys = Object.keys(data);
                    if (formDataKeys.length !== 0) {
                        formData = formDataKeys[0] + '=' + encodeURIComponent(data[formDataKeys[0]]);
                        if (formDataKeys.length > 1) {
                            for (var j = 1; j < formDataKeys.length; j++) {
                                formData += '&' + formDataKeys[j] +
                                    '=' + encodeURIComponent(data[formDataKeys[j]]);
                            }
                        }
                    }
                    sendData['data'] = formData;
                } else {
                    sendData['data'] = data;
                }
            }

            return $http(sendData)
                .then(success)
                .catch(error);

            function success(response) {
                var deferred = $q.defer();

                endpoints[endpoint].inProgress = false;

                deferred.resolve(response);
                return deferred.promise;
            }

            function error(err) {
                var deferred = $q.defer(),
                    errorHandler;

                endpoints[endpoint].inProgress = false;
                deferred.reject(err.data);

                // Error status handling
                errorHandler = errorHandlers['error' + err.status + 'handler'] || errorHandlers['unhandledError'];
                errorHandler(err);
                return deferred.promise;
            }
        }

        //Private methods

        function isRequestInProgress(endpoint) {
            if (endpoints[endpoint].inProgress) {
                return false;
            } else {
                endpoints[endpoint].inProgress = true;
                return true;
            }
        }

        function parseUrlParams(data, endpointUrl) {
            var urlParams = data['url_params'];
            var keysArr = Object.keys(urlParams);

            keysArr.forEach(function(oneKey) {
                endpointUrl = endpointUrl.replace(oneKey, urlParams[oneKey]);
            });
            delete data['url_params'];
        }

        // ----- Error handlers -----
        function error400handler(err) {
            console.log(err);
        }

        function error401handler(err) {
            console.log(err);
        }

        function error500handler(err) {
            console.log(err);
        }

        function unhandledError(err) {
            console.log(err);
        }
    }
})();
