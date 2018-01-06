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
                'controller': 'DealerMasterMenu'
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
        })
        .controller('DealerMasterMenu', function ($scope, UserService, NotificationService) {

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


