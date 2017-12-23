/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.shutter_handle_mapping", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_shutter_handle_mapping', {
                'url': '/shutter_handle_mapping_master?offset',
                'templateUrl': templateRoot + '/masters/shutter_handle_mapping/list.html',
                'controller': 'ShutterHandleMappingListController'
            });
            $stateProvider.state('admin.masters_shutter_handle_mapping.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/shutter_handle_mapping/form.html',
                'controller': 'ShutterHandleMappingAddController'
            });
            $stateProvider.state('admin.masters_shutter_handle_mapping.edit', {
                'url': '/:shutterHandleMappingId/edit',
                'templateUrl': templateRoot + '/masters/shutter_handle_mapping/form.html',
                'controller': 'ShutterHandleMappingEditController'
            });
            $stateProvider.state('admin.masters_shutter_handle_mapping.delete', {
                'url': '/:shutterHandleMappingId/delete',
                'templateUrl': templateRoot + '/masters/shutter_handle_mapping/delete.html',
                'controller': 'ShutterHandleMappingDeleteController'
            });
        })
        .controller('ShutterHandleMappingListController', function (ShutterHandleMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextShutterHandleMappingList = ShutterHandleMappingService.query({
                'offset': $scope.nextOffset
            });
            $scope.shutterHandleMappingList = ShutterHandleMappingService.query({
                'offset': $scope.currentOffset
            }, function (shmList) {
                console.log("S :%O", shmList);
                angular.forEach($scope.shutterHandleMappingList, function (shmObject) {                    
                    shmObject.finishObject = FinishPriceService.findByFinishCode({
                       'finishCode':shmObject.finishCode 
                    });
                    shmObject.handleObjects = [];
                    angular.forEach(shmObject.handles, function (handleId) {
                        shmObject.handleObjects.push(
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
        .controller('ShutterHandleMappingAddController', function (ShutterHandleMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableShutterHandleMapping = {};
            $scope.handleDisplay = [];
            $scope.editableShutterHandleMapping.handles = [];

            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'SHUTTER'
            }, function (shutterList) {
                console.log("SHutter List :%O", shutterList);
                $scope.shutterList = shutterList;
            });

            $scope.$watch('editableShutterHandleMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                ShutterHandleMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    }
                }).then(function (shmObject) {
                    if (shmObject.finishCode !== null) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });

            $scope.$watch('editableShutterHandleMapping.shutterCode', function (shutterCode) {
                console.log("Name :" + shutterCode);
                ShutterHandleMappingService.findByShutterCode({'shutterCode': shutterCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    } else if (response.status === 404) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    } else if (response.status === 400) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    }
                }).then(function (shmObject) {
                    if (shmObject.shutterCode !== null) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = true;
                    }
                    ;
                });
            });

//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();

            $scope.saveShutterHandleMapping = function (shutterHandleMapping) {
                ShutterHandleMappingService.save(shutterHandleMapping, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_shutter_handle_mapping', null, {'reload': true});
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
                $scope.editableShutterHandleMapping.handles.push(handle.id);
            };
            $scope.removeHandles = function (handles) {
                console.log("Getting the thing :%O", handles);
                var index = $scope.handleDisplay.indexOf(handles);
                var index1 = $scope.editableShutterHandleMapping.handles.indexOf(handles.id);
                $scope.handleDisplay.splice(index, 1);
                $scope.editableShutterHandleMapping.handles.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.handleDisplay);
                console.log("Updated %O", $scope.editableShutterHandleMapping.handles);
            };

        })
        .controller('ShutterHandleMappingEditController', function (ShutterHandleMappingService, FinishPriceService, KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();
            $scope.handleDisplay = [];
            $scope.editableShutterHandleMapping = {};
            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'SHUTTER'
            }, function (shutterList) {
                console.log("SHutter List :%O", shutterList);
                $scope.shutterList = shutterList;
            });

            $scope.$watch('editableShutterHandleMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                ShutterHandleMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = false;
                    }
                }).then(function (shmObject) {
                    if (shmObject.finishCode !== null) {
                        $scope.editableShutterHandleMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });

            $scope.$watch('editableShutterHandleMapping.shutterCode', function (shutterCode) {
                console.log("Name :" + shutterCode);
                ShutterHandleMappingService.findByShutterCode({'shutterCode': shutterCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    } else if (response.status === 404) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    } else if (response.status === 400) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = false;
                    }
                }).then(function (shmObject) {
                    if (shmObject.shutterCode !== null) {
                        $scope.editableShutterHandleMapping.repeatShutterCode = true;
                    }
                    ;
                });
            });

            $scope.saveShutterHandleMapping = function (shmObject) {
                shmObject.$save(function () {
                    $state.go('admin.masters_shutter_handle_mapping', null, {'reload': true});
                });
            };
            ShutterHandleMappingService.get({
                'id': $stateParams.shutterHandleMappingId
            }, function (shmObject) {
                $scope.editableShutterHandleMapping = shmObject;
                angular.forEach(shmObject.handles, function (handle) {
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
                $scope.editableShutterHandleMapping.handles.push(handle.id);
            };
            $scope.removeHandles = function (handles) {
                console.log("Getting the thing :%O", handles);
                var index = $scope.handleDisplay.indexOf(handles);
                var index1 = $scope.editableShutterHandleMapping.handles.indexOf(handles.id);
                $scope.handleDisplay.splice(index, 1);
                $scope.editableShutterHandleMapping.handles.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.handleDisplay);
                console.log("Updated %O", $scope.editableShutterHandleMapping.handles);
            };
        })
        .controller('ShutterHandleMappingDeleteController', function (ShutterHandleMappingService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableShutterHandleMapping = ShutterHandleMappingService.get({'id': $stateParams.shutterHandleMappingId});
            $scope.deleteShutterHandleMapping = function (shutterHandleMapping) {
                shutterHandleMapping.$delete(function () {
                    $state.go('admin.masters_shutter_handle_mapping', null, {'reload': true});
                });
            };
        });
;


