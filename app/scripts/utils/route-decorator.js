'use strict';

var base = {
    say: function () {
        return ' say';
    }
};

var stream = Rx.Observable.return({
        groups: [
            {id : '34D', name : 'X'},
            {id : 'A5C', name : 'Y'},
            {id : 'K3P', name : 'Z'}
        ],
        name : 'Wilma Fintstone'
}).delay(3000);

function buildController($injector, resolve) {
    var deps = resolve ? Object.keys(resolve) : [];
    deps.unshift('$scope');

    var ctrl = function($scope) {
        for (var i = 1; i < deps.length; i++) {
            var dep = deps[i];
            $scope[dep] = arguments[i];
        }
        $injector.invoke(ObserverCtrl(base, stream, $scope['state']), this, {$scope: $scope});
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
                    view.controller = buildController($injector, view.resolve || state.resolve);
                }
            });

            return views;
        });
    });

