/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.masters_wardrobe_component", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_wardrobe_component', {
                'url': '/wardrobe_component_master?offset',
                'templateUrl': templateRoot + '/masters/wardrobe_component/list.html',
                'controller': 'WardrobeComponentListController'
            });
            $stateProvider.state('admin.masters_wardrobe_component.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/wardrobe_component/form.html',
                'controller': 'WardrobeComponentAddController'
            });
            $stateProvider.state('admin.masters_wardrobe_component.edit', {
                'url': '/:wardrobeComponentId/edit',
                'templateUrl': templateRoot + '/masters/wardrobe_component/form.html',
                'controller': 'WardrobeComponentEditController'
            });
            $stateProvider.state('admin.masters_wardrobe_component.delete', {
                'url': '/:wardrobeComponentId/delete',
                'templateUrl': templateRoot + '/masters/wardrobe_component/delete.html',
                'controller': 'WardrobeComponentDeleteController'
            });
        })
        .controller('WardrobeComponentListController', function (WardrobeComponentService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextWardrobeComponents = WardrobeComponentService.query({
                'offset': $scope.nextOffset
            });
            $scope.mainArray = [];
            $scope.wardrobeComponents = WardrobeComponentService.query({
                'offset': $scope.currentOffset
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
        .controller('WardrobeComponentAddController', function (WardrobeComponentService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableWardrobeComponent = {};

            $scope.saveWardrobeComponent = function (wardrobeComponent) {
                console.log("C :", wardrobeComponent);
                WardrobeComponentService.save(wardrobeComponent, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_wardrobe_component', null, {'reload': true});
                });
            };
        })
        .controller('WardrobeComponentEditController', function (WardrobeComponentService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Inside SP :%O", $stateParams.wardrobeComponentId);
            WardrobeComponentService.get({'id': $stateParams.wardrobeComponentId});
            WardrobeComponentService.get({
                'id': $stateParams.wardrobeComponentId
            }, function (wardrobeComponentData) {
                $scope.editableWardrobeComponent = wardrobeComponentData;
            });
            $scope.saveWardrobeComponent = function (wardrobeComponent) {
                wardrobeComponent.$save(function () {
                    $state.go('admin.masters_wardrobe_component', null, {'reload': true});
                });
            };
        })
        .controller('WardrobeComponentDeleteController', function (WardrobeComponentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableWardrobeComponent = WardrobeComponentService.get({'id': $stateParams.wardrobeComponentId});
            $scope.deleteWardrobeComponent = function (wardrobeComponent) {
                wardrobeComponent.$delete(function () {
                    $state.go('admin.masters_wardrobe_component', null, {'reload': true});
                });
            };
        });