/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.drawer_component_mapping", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_drawer_component_mapping', {
                'url': '/drawer_component_mapping_master?offset',
                'templateUrl': templateRoot + '/masters/drawer_component_mapping/list.html',
                'controller': 'DrawerComponentMappingListController'
            });
            $stateProvider.state('admin.masters_drawer_component_mapping.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/drawer_component_mapping/form.html',
                'controller': 'DrawerComponentMappingAddController'
            });
            $stateProvider.state('admin.masters_drawer_component_mapping.edit', {
                'url': '/:drawerComponentMappingId/edit',
                'templateUrl': templateRoot + '/masters/drawer_component_mapping/form.html',
                'controller': 'DrawerComponentMappingEditController'
            });
            $stateProvider.state('admin.masters_drawer_component_mapping.delete', {
                'url': '/:drawerComponentMappingId/delete',
                'templateUrl': templateRoot + '/masters/drawer_component_mapping/delete.html',
                'controller': 'DrawerComponentMappingDeleteController'
            });
        })
        .controller('DrawerComponentMappingListController', function (DrawerComponentMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextDrawerComponentMappingList = DrawerComponentMappingService.query({
                'offset': $scope.nextOffset
            });
            $scope.drawerComponentMappingList = DrawerComponentMappingService.query({
                'offset': $scope.currentOffset
            }, function (dcmList) {
                console.log("S :%O", dcmList);
                angular.forEach($scope.drawerComponentMappingList, function (dcmObject) {
                    dcmObject.finishObject = FinishPriceService.findByFinishCode({
                        'finishCode': dcmObject.finishCode
                    });
                    dcmObject.drawerObjects = [];
                    angular.forEach(dcmObject.drawers, function (drawerId) {
                        dcmObject.drawerObjects.push(
                                KitchenComponentService.get({
                                    'id': drawerId
                                })
                                );
                    });
                });
//                $scope.colorConstraints = s;
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
        .controller('DrawerComponentMappingAddController', function (DrawerComponentMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {            
            $scope.editableDrawerComponentMapping = {};
            $scope.drawerDisplay = [];
            $scope.editableDrawerComponentMapping.drawers = [];

            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'DRAWER'
            }, function (drawerList) {
                console.log("Drawer List :%O", drawerList);
                $scope.drawerList = drawerList;
            });

            $scope.$watch('editableDrawerComponentMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                DrawerComponentMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDrawerComponentMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableDrawerComponentMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableDrawerComponentMapping.repeatFinishCode = false;
                    }
                }).then(function (scmObject) {
                    if (scmObject.finishCode !== null) {
                        $scope.editableDrawerComponentMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });

            $scope.saveDrawerComponentMapping = function (drawerComponentMapping) {
                DrawerComponentMappingService.save(drawerComponentMapping, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_drawer_component_mapping', null, {'reload': true});
                });
            };

            $scope.searchDrawers = function (drawerString) {
                return KitchenComponentService.findByDrawerComponentLike({
                    'component': drawerString
                }).$promise;
            };
            $scope.setDrawer = function (drawer) {
                $scope.drawerDisplay.push(drawer);
                $scope.drawerName = "";
                $scope.editableDrawerComponentMapping.drawers.push(drawer.id);
            };
            $scope.removeDrawers = function (drawers) {
                console.log("Getting the thing :%O", drawers);
                var index = $scope.drawerDisplay.indexOf(drawers);
                var index1 = $scope.editableDrawerComponentMapping.drawers.indexOf(drawers.id);
                $scope.drawerDisplay.splice(index, 1);
                $scope.editableDrawerComponentMapping.drawers.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.drawerDisplay);
                console.log("Updated %O", $scope.editableDrawerComponentMapping.drawers);
            };

        })
        .controller('DrawerComponentMappingEditController', function (DrawerComponentMappingService, FinishPriceService, KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.drawerDisplay = [];
            $scope.editableDrawerComponentMapping = {};
            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'DRAWER'
            }, function (drawerList) {
                console.log("Drawer List :%O", drawerList);
                $scope.drawerList = drawerList;
            });

            $scope.saveDrawerComponentMapping = function (dcmObject) {
                dcmObject.$save(function () {
                    $state.go('admin.masters_drawer_component_mapping', null, {'reload': true});
                });
            };
            DrawerComponentMappingService.get({
                'id': $stateParams.drawerComponentMappingId
            }, function (dcmObject) {
                $scope.editableDrawerComponentMapping = dcmObject;
                angular.forEach(dcmObject.drawers, function (drawer) {
                    $scope.drawerDisplay.push(
                            KitchenComponentService.get({
                                'id': drawer
                            })
                            );

                });

            });
            $scope.searchDrawers = function (drawerString) {
                return KitchenComponentService.findByDrawerComponentLike({
                    'component': drawerString
                }).$promise;
            };
            $scope.setDrawer = function (drawer) {
                $scope.drawerDisplay.push(drawer);
                $scope.drawerName = "";
                $scope.editableDrawerComponentMapping.drawers.push(drawer.id);
            };
            $scope.removeDrawers = function (drawers) {
                console.log("Getting the thing :%O", drawers);
                var index = $scope.drawerDisplay.indexOf(drawers);
                var index1 = $scope.editableDrawerComponentMapping.drawers.indexOf(drawers.id);
                $scope.drawerDisplay.splice(index, 1);
                $scope.editableDrawerComponentMapping.drawers.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.drawerDisplay);
                console.log("Updated %O", $scope.editableDrawerComponentMapping.drawers);
            };
        })
        .controller('DrawerComponentMappingDeleteController', function (DrawerComponentMappingService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDrawerComponentMapping = DrawerComponentMappingService.get({'id': $stateParams.drawerComponentMappingId});
            $scope.deleteDrawerComponentMapping = function (drawerComponentMapping) {
                drawerComponentMapping.$delete(function () {
                    $state.go('admin.masters_drawer_component_mapping', null, {'reload': true});
                });
            };
        });
;


