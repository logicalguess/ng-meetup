'use strict';

function ObserverCtrl(base, stream, initialState) {
    return function ($scope) {
        angular.extend($scope, base);
        if (initialState) {
            $scope.state = initialState;
        }
        if (stream) {
            stream.subscribe(function(state) {
                $scope.state = state;
                $scope.$digest();
                console.log('new state', state);
            });
        }
    }
}
var addController = function(app, name, base, stream) {
    app.controller(name, ['$scope', '$injector', 'state', function($scope, $injector, state) {
        $injector.invoke(ObserverCtrl(base, stream, state), this, {$scope: $scope});
    }]);
};
