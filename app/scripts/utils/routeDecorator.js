'use strict';

function buildController($injector, viewModel, dataModel, resolve) {
    var deps = resolve ? Object.keys(resolve) : [];
    deps.unshift('$stateParams');
    deps.unshift('$scope');

    var ctrl = function($scope, $stateParams) {
        for (var i = 1; i < deps.length; i++) {
            var dep = deps[i];
            $scope[dep] = arguments[i];
        }
        $scope['params'] = $stateParams;
        $injector.invoke(ObserverCtrl(viewModel, dataModel, $scope['state']), this, {$scope: $scope});
    };

    ctrl.$inject = deps;
    return ctrl;
}

angular.module('route-decorator', ['ui.router'])

    .config(function ($stateProvider, $injector) {
        $stateProvider.decorator('views', function (state, parent) {
            var views = parent(state);
            Object.keys(views).forEach(function (viewName) {
                var view = views[viewName];
                if (!view.controller && !state.controller) {
                    view.controller = buildController($injector, view.viewModel, view.dataModel, view.resolve || state.resolve);
                }
            });

            return views;
        });
    });

