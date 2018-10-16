/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.admin", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin', {
                'url': '/admin',
                'templateUrl': templateRoot + '/admin.html',
                'controller': 'AdminController'
            });
            $stateProvider.state('admin.masters', {
                'url': '/masters',
                'templateUrl': templateRoot + '/masters/menu.html',
                'controller': 'AdminMasterMenu'
            });
            $stateProvider.state('admin.dealers', {
                'url': '/dealers',
                'templateUrl': templateRoot + '/masters/dealer_menu.html',
                'controller': 'DealerMenu'
            });
            $stateProvider.state('admin.dealers_master', {
                'url': '/dealer_masters',
                'templateUrl': templateRoot + '/masters/dealer_master_menu.html',
                'controller': 'DealerMasterMenu'
            });
            $stateProvider.state('admin.dealers_transaction', {
                'url': '/dealer_transaction',
                'templateUrl': templateRoot + '/masters/dealer_transaction_menu.html',
                'controller': 'DealerTransactionMenu'
            });
            $stateProvider.state('admin.dealers_transaction_history', {
                'url': '/dealer_history_mrp',
                'templateUrl': templateRoot + '/masters/dealer_history_menu.html',
                'controller': 'DealerHistoryTransactionMenu'
            });
            $stateProvider.state('admin.logout', {
                'url': '/logout',
                'templateUrl': templateRoot + '/logout.html',
                'controller': 'LogoutController'
            });
        })
        .controller('AdminController', function ($scope, $rootScope, UserService, NotificationService) {
            NotificationService.findAllList(function (notificationList) {
                $scope.notificationList = notificationList;
            });
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.notificationUserObject = userObject;
            });
        })
        .controller('AdminMasterMenu', function ($scope, UserService, NotificationService) {
            console.log("In Admin Master Menu");
        })
        .controller('DealerMenu', function ($scope, $rootScope, UserService, NotificationService) {
            console.log("In Dealer Menu");
            $scope.showMasters = false;
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                console.log("User Object :%O", userObject);
                if (userObject.role === "ROLE_DEALER") {
                    console.log("Regular Dealer");
                    $scope.showMasters = false;
                } else if (userObject.role === "ROLE_DEALER_PRO") {
                    console.log("Pro Dealer");
                    $scope.showMasters = true;
                } else if (userObject.role === "ROLE_DEALER_STAFF") {
                    console.log("Regular Dealer Staff");
                    $scope.showMasters = true;
                }
            });

        })
        .controller('DealerMasterMenu', function ($rootScope, $scope, UserService, NotificationService) {
            console.log("In Dealer Master Menu");
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.userId = userObject.id;
            });
        })
        .controller('DealerTransactionMenu', function ($scope, UserService, NotificationService) {
            console.log("In Dealer Transaction Menu");
        })
        .controller('DealerHistoryTransactionMenu', function ($scope, UserService, NotificationService) {
            console.log("In Dealer History Transaction Menu");
        })
        .controller('LogoutController', function (UserService, $scope, $state) {
            console.log("Coming to logout Controller??");
            $scope.logout = function () {
                UserService.logout({}, function () {
                    $state.go("login", {
                        'message': 'Logged Out Successfully!'
                    });
                });
            };
        });


