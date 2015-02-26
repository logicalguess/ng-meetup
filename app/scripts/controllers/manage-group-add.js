'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageGroupAddCtrl', ['$scope', '$state', 'appService',
        function ( $scope, $state, appService ) {
            $scope.data = {
                groupName : ''
            };

            $scope.cancel = function () {
                $scope.$dismiss();
            };

            $scope.ok = function () {
                $scope.publish({eventName: 'addGroup', eventData: $scope.data.groupName}, ['GroupComponent']);
                $scope.$close( true );
                //appService.addGroup( $scope.data.groupName ).then( function () {
                //    $scope.$close( true );
                //} );
            };

            $scope.publish = function (event, components) {
                eventStream.publish({event: event, components: components});
            }
        }]
);
