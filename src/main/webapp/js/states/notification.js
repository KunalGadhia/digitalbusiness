/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.notification", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_notification', {
                'url': '/notification_master?offset',
                'templateUrl': templateRoot + '/masters/notification/list.html',
                'controller': 'NotificationListController'
            });
            $stateProvider.state('admin.masters_notification.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/notification/form.html',
                'controller': 'NotificationAddController'
            });
            $stateProvider.state('admin.masters_notification.edit', {
                'url': '/:notificationId/edit',
                'templateUrl': templateRoot + '/masters/notification/form.html',
                'controller': 'NotificationEditController'
            });
            $stateProvider.state('admin.masters_notification.delete', {
                'url': '/:notificationId/delete',
                'templateUrl': templateRoot + '/masters/notification/delete.html',
                'controller': 'NotificationDeleteController'
            });
        })

        .controller('NotificationListController', function (NotificationService, $scope, $stateParams, $state, paginationLimit) {
            if (
                    $stateParams.offset === undefined ||
                    isNaN($stateParams.offset) ||
                    new Number($stateParams.offset) < 0)
            {
                $scope.currentOffset = 0;
            } else {
                $scope.currentOffset = new Number($stateParams.offset);
            }

            $scope.nextOffset = $scope.currentOffset + 10;

            $scope.nextNotifications = NotificationService.query({
                'offset': $scope.nextOffset
            });

            $scope.notifications = NotificationService.query({
                'offset': $scope.currentOffset
            }, function (s) {
            });

            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
            };
            $scope.previousPage = function () {
                if ($scope.currentOffset <= 0) {
                    return;
                }
                $scope.currentOffset -= paginationLimit;
                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
            };
        })
        .controller('NotificationAddController', function (NotificationService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableNotification = {};



            $scope.saveNotification = function (notification) {
                console.log("Notification", notification);
                NotificationService.save(notification, function () {
                    $state.go('admin.masters_notification', null, {'reload': true});
                });
            };            
        })
        .controller('NotificationEditController', function (NotificationService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableNotification = NotificationService.get({'id': $stateParams.notificationId});
//            NotificationService.get({
//                'id': $stateParams.notificationId
//            }, function (notificationData) {                
//            });
            $scope.saveNotification = function (notification) {
                notification.$save(function () {
                    $state.go('admin.masters_notification', null, {'reload': true});
                });
            };
        })
        .controller('NotificationDeleteController', function (NotificationService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableNotification = NotificationService.get({'id': $stateParams.notificationId});            
            $scope.deleteNotification = function (notification) {                
                notification.$delete(function () {
                    $state.go('admin.masters_notification', null, {'reload': true});
                });
            };
        });


