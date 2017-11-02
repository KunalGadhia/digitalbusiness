/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.kitchen_component", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_kitchen_component', {
                'url': '/kitchen_component_master?offset',
                'templateUrl': templateRoot + '/masters/kitchen_component/list.html',
                'controller': 'KitchenComponentListController'
            });
            $stateProvider.state('admin.masters_kitchen_component.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/kitchen_component/form.html',
                'controller': 'KitchenComponentAddController'
            });
            $stateProvider.state('admin.masters_kitchen_component.edit', {
                'url': '/:kitchenComponentId/edit',
                'templateUrl': templateRoot + '/masters/kitchen_component/form.html',
                'controller': 'KitchenComponentEditController'
            });
            $stateProvider.state('admin.masters_kitchen_component.delete', {
                'url': '/:kitchenComponentId/delete',
                'templateUrl': templateRoot + '/masters/kitchen_component/delete.html',
                'controller': 'KitchenComponentDeleteController'
            });
        })

        .controller('KitchenComponentListController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextKitchenComponents = KitchenComponentService.query({
                'offset': $scope.nextOffset
            });

            $scope.kitchenComponents = KitchenComponentService.query({
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
        .controller('KitchenComponentAddController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableKitchenComponent = {};

            $scope.saveKitchenComponent = function (kitchenComponent) {
                console.log("KC :", kitchenComponent);
//                KitchenComponentService.save(kitchenComponent, function () {
//                    $state.go('admin.masters_kitchen_component', null, {'reload': true});
//                });
            };

            $scope.$watch('editableKitchenComponent.component', function (component) {
                console.log("Name :" + component);
                KitchenComponentService.findByComponent({'component': component}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableKitchenComponent.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableKitchenComponent.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableKitchenComponent.repeatName = false;
                    }
                }).then(function (kitchenComponent) {
                    if (kitchenComponent.component !== null) {
                        $scope.editableKitchenComponent.repeatName = true;
                    }
                    ;
                });
            });
            $scope.$watch('editableKitchenComponent.componentCode', function (componentCode) {
                console.log("Name :" + componentCode);
                KitchenComponentService.findByComponentCode({'componentCode': componentCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    }
                }).then(function (kitchenComponent) {
                    console.log("Kitchen COmponent :%O", kitchenComponent);
                    if (kitchenComponent.componentCode !== null) {
                        $scope.editableKitchenComponent.repeatCode = true;
                    }
                    ;
                });
            });
        })
        .controller('KitchenComponentEditController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Inside Kitchen COmponent :%O",$stateParams.kitchenComponentId);
            KitchenComponentService.get({'id': $stateParams.kitchenComponentId});
            KitchenComponentService.get({
                'id': $stateParams.kitchenComponentId
            }, function (kitchenComponentData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableKitchenComponent = kitchenComponentData;
            });

            $scope.saveKitchenComponent = function (component) {
                component.$save(function () {
                    $state.go('admin.masters_kitchen_component', null, {'reload': true});
                });
            };
        })
        .controller('KitchenComponentDeleteController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableKitchenComponent = KitchenComponentService.get({'id': $stateParams.kitchenComponentId});
            $scope.deleteKitchenComponent = function (kitchenComponent) {
                kitchenComponent.$delete(function () {
                    $state.go('admin.masters_kitchen_component', null, {'reload': true});
                });
            };
        });


