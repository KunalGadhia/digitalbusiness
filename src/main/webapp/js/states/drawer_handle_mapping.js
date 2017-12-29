/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.drawer_handle_mapping", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_drawer_handle_mapping', {
                'url': '/drawer_handle_mapping_master?offset',
                'templateUrl': templateRoot + '/masters/drawer_handle_mapping/list.html',
                'controller': 'DrawerHandleMappingListController'
            });
            $stateProvider.state('admin.masters_drawer_handle_mapping.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/drawer_handle_mapping/form.html',
                'controller': 'DrawerHandleMappingAddController'
            });
            $stateProvider.state('admin.masters_drawer_handle_mapping.edit', {
                'url': '/:drawerHandleMappingId/edit',
                'templateUrl': templateRoot + '/masters/drawer_handle_mapping/form.html',
                'controller': 'DrawerHandleMappingEditController'
            });
            $stateProvider.state('admin.masters_drawer_handle_mapping.delete', {
                'url': '/:drawerHandleMappingId/delete',
                'templateUrl': templateRoot + '/masters/drawer_handle_mapping/delete.html',
                'controller': 'DrawerHandleMappingDeleteController'
            });
        })
        .controller('DrawerHandleMappingListController', function (DrawerHandleMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextDrawerHandleMappingList = DrawerHandleMappingService.query({
                'offset': $scope.nextOffset
            });
            $scope.drawerHandleMappingList = DrawerHandleMappingService.query({
                'offset': $scope.currentOffset
            }, function (dhmList) {
                console.log("D :%O", dhmList);
                angular.forEach($scope.drawerHandleMappingList, function (dhmObject) {
                    dhmObject.finishObject = FinishPriceService.findByFinishCode({
                       'finishCode':dhmObject.finishCode 
                    });
                    dhmObject.handleObjects = [];
                    angular.forEach(dhmObject.handles, function (handleId) {
                        dhmObject.handleObjects.push(
                                KitchenComponentService.get({
                                    'id': handleId
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
        .controller('DrawerHandleMappingAddController', function (DrawerHandleMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableDrawerHandleMapping = {};
            $scope.handleDisplay = [];
            $scope.editableDrawerHandleMapping.handles = [];

            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'DRAWER'
            }, function (drawerList) {
                console.log("Drawer List :%O", drawerList);
                $scope.drawerList = drawerList;
            });

            $scope.$watch('editableDrawerHandleMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                DrawerHandleMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    }
                }).then(function (dhmObject) {
                    if (dhmObject.finishCode !== null) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });

            $scope.$watch('editableDrawerHandleMapping.drawerCode', function (drawerCode) {
                console.log("Name :" + drawerCode);
                DrawerHandleMappingService.findByDrawerCode({'drawerCode': drawerCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    } else if (response.status === 404) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    } else if (response.status === 400) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    }
                }).then(function (dhmObject) {
                    if (dhmObject.drawerCode !== null) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = true;
                    }
                    ;
                });
            });

//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();

            $scope.saveDrawerHandleMapping = function (drawerHandleMapping) {
                DrawerHandleMappingService.save(drawerHandleMapping, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_drawer_handle_mapping', null, {'reload': true});
                });
            };

            $scope.searchHandles = function (handleString) {
                return KitchenComponentService.findByHandleComponentLike({
                    'component': handleString
                }).$promise;
            };
            $scope.setHandle = function (handle) {
                $scope.handleDisplay.push(handle);
                $scope.handleName = "";
                $scope.editableDrawerHandleMapping.handles.push(handle.id);
            };
            $scope.removeHandles = function (handles) {
                console.log("Getting the thing :%O", handles);
                var index = $scope.handleDisplay.indexOf(handles);
                var index1 = $scope.editableDrawerHandleMapping.handles.indexOf(handles.id);
                $scope.handleDisplay.splice(index, 1);
                $scope.editableDrawerHandleMapping.handles.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.handleDisplay);
                console.log("Updated %O", $scope.editableDrawerHandleMapping.handles);
            };

        })
        .controller('DrawerHandleMappingEditController', function (DrawerHandleMappingService, FinishPriceService, KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();
            $scope.handleDisplay = [];
            $scope.editableDrawerHandleMapping = {};
            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'DRAWER'
            }, function (drawerList) {
                console.log("Drawer List :%O", drawerList);
                $scope.drawerList = drawerList;
            });

            $scope.$watch('editableDrawerHandleMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                DrawerHandleMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = false;
                    }
                }).then(function (dhmObject) {
                    if (dhmObject.finishCode !== null) {
                        $scope.editableDrawerHandleMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });

            $scope.$watch('editableDrawerHandleMapping.drawerCode', function (drawerCode) {
                console.log("Name :" + drawerCode);
                DrawerHandleMappingService.findByDrawerCode({'drawerCode': drawerCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    } else if (response.status === 404) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    } else if (response.status === 400) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = false;
                    }
                }).then(function (dhmObject) {
                    if (dhmObject.drawerCode !== null) {
                        $scope.editableDrawerHandleMapping.repeatDrawerCode = true;
                    }
                    ;
                });
            });

            $scope.saveDrawerHandleMapping = function (dhmObject) {
                dhmObject.$save(function () {
                    $state.go('admin.masters_drawer_handle_mapping', null, {'reload': true});
                });
            };
            DrawerHandleMappingService.get({
                'id': $stateParams.drawerHandleMappingId
            }, function (dhmObject) {
                $scope.editableDrawerHandleMapping = dhmObject;
                angular.forEach(dhmObject.handles, function (handle) {
                    $scope.handleDisplay.push(
                            KitchenComponentService.get({
                                'id': handle
                            })
                            );

                });

            });
            $scope.searchHandles = function (handleString) {
                return KitchenComponentService.findByHandleComponentLike({
                    'component': handleString
                }).$promise;
            };
            $scope.setHandle = function (handle) {
                $scope.handleDisplay.push(handle);
                $scope.handleName = "";
                $scope.editableDrawerHandleMapping.handles.push(handle.id);
            };
            $scope.removeHandles = function (handles) {
                console.log("Getting the thing :%O", handles);
                var index = $scope.handleDisplay.indexOf(handles);
                var index1 = $scope.editableDrawerHandleMapping.handles.indexOf(handles.id);
                $scope.handleDisplay.splice(index, 1);
                $scope.editableDrawerHandleMapping.handles.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.handleDisplay);
                console.log("Updated %O", $scope.editableDrawerHandleMapping.handles);
            };
        })
        .controller('DrawerHandleMappingDeleteController', function (DrawerHandleMappingService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDrawerHandleMapping = DrawerHandleMappingService.get({'id': $stateParams.drawerHandleMappingId});
            $scope.deleteDrawerHandleMapping = function (drawerHandleMapping) {
                drawerHandleMapping.$delete(function () {
                    $state.go('admin.masters_drawer_handle_mapping', null, {'reload': true});
                });
            };
        });
;


