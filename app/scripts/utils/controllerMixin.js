'use strict';

function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

function ObserverCtrl(viewModel, model, initialState) {
    return function ($scope) {
        angular.extend($scope, viewModel);
        if (initialState) {
            $scope.state = initialState;
        }

        $scope.publish = function (event, components) {
            if (!components) {
                components = [model.name]
            }
            eventStream.publish({event: event, components: components});
        }

        var stream = model ? model.getStateStream() : null;
        if (stream) {
            var subscription = stream.subscribe(function(state) {
                safeApply($scope, function(){
                    $scope.state = state;
                    console.log('new state', state);
                });
            });
            $scope.$on('$destroy', function() {
                subscription.dispose();
            });
        }
    }
}
var addController = function(app, name, pojo, stream) {
    app.controller(name, ['$scope', '$injector', 'state', function($scope, $injector, state) {
        $injector.invoke(ObserverCtrl(pojo, stream, state), this, {$scope: $scope});
    }]);
};
