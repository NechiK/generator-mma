(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['toastr', '$httpProvider', '$resourceProvider'];
    /* @ngInject */
    function configFunction(toastr, $httpProvider, $resourceProvider) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';

        // $resourceProvider.defaults.actions.post = {
        //     method: 'POST'
        // };
        //
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.interceptors.push(interceptor);
    }

    // interceptor.$inject = ['config'];
    // function interceptor(config) {
    //     return {
    //         request: function(requestConfig) {
    //             if (!isApiRequest(requestConfig.url)) {
    //                 return requestConfig;
    //             }
    //
    //         },
    //         response: function (response) {
    //             if (isApiRequest(response.config.url)) {
    //
    //             }
    //             return response;
    //         },
    //         responseError: function (error, ajaxOptions, thrownError) {
    //
    //         }
    //     };
    //
    //     function isApiRequest(url) {
    //         return url.indexOf(config.domainProtocol + config.domainEndpoint + config.portEndpoint) === 0;
    //     }
    // }

    var config = {
        appErrorPrefix: '[<%= appName %> Error] ',
        appTitle: '<%= appName %>',
        domainProtocol: '',
        domainEndpoint: '',
        portEndpoint: ''
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }

})();
