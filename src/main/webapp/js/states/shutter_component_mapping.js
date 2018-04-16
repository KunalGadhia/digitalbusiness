/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.shutter_component_mapping", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_shutter_component_mapping', {
                'url': '/shutter_component_mapping_master?offset',
                'templateUrl': templateRoot + '/masters/shutter_component_mapping/list.html',
                'controller': 'ShutterComponentMappingListController'
            });
            $stateProvider.state('admin.masters_shutter_component_mapping.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/shutter_component_mapping/form.html',
                'controller': 'ShutterComponentMappingAddController'
            });
            $stateProvider.state('admin.masters_shutter_component_mapping.edit', {
                'url': '/:shutterComponentMappingId/edit',
                'templateUrl': templateRoot + '/masters/shutter_component_mapping/form.html',
                'controller': 'ShutterComponentMappingEditController'
            });
            $stateProvider.state('admin.masters_shutter_component_mapping.delete', {
                'url': '/:shutterComponentMappingId/delete',
                'templateUrl': templateRoot + '/masters/shutter_component_mapping/delete.html',
                'controller': 'ShutterComponentMappingDeleteController'
            });
        })
        .controller('ShutterComponentMappingListController', function (ShutterComponentMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextShutterComponentMappingList = ShutterComponentMappingService.query({
                'offset': $scope.nextOffset
            });
            $scope.shutterComponentMappingList = ShutterComponentMappingService.query({
                'offset': $scope.currentOffset
            }, function (scmList) {
                console.log("S :%O", scmList);
                angular.forEach($scope.shutterComponentMappingList, function (scmObject) {
                    scmObject.finishObject = FinishPriceService.findByFinishCode({
                        'finishCode': scmObject.finishCode
                    });
                    scmObject.shutterObjects = [];
                    angular.forEach(scmObject.shutters, function (shutterId) {
                        scmObject.shutterObjects.push(
                                KitchenComponentService.get({
                                    'id': shutterId
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
        .controller('ShutterComponentMappingAddController', function (ShutterComponentMappingService, KitchenComponentService, FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Add COntroller");
            $scope.editableShutterComponentMapping = {};
            $scope.shutterDisplay = [];
            $scope.editableShutterComponentMapping.shutters = [];

            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'SHUTTER'
            }, function (shutterList) {
                console.log("SHutter List :%O", shutterList);
                $scope.shutterList = shutterList;
            });

            $scope.$watch('editableShutterComponentMapping.finishCode', function (finishCode) {
                console.log("Name :" + finishCode);
                ShutterComponentMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
                    } else if (response.status === 404) {
                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
                    } else if (response.status === 400) {
                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
                    }
                }).then(function (scmObject) {
                    if (scmObject.finishCode !== null) {
                        $scope.editableShutterComponentMapping.repeatFinishCode = true;
                    }
                    ;
                });
            });
//
//            $scope.$watch('editableShutterHandleMapping.shutterCode', function (shutterCode) {
//                console.log("Name :" + shutterCode);
//                ShutterComponentMappingService.findByShutterCode({'shutterCode': shutterCode}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    } else if (response.status === 404) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    } else if (response.status === 400) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    }
//                }).then(function (shmObject) {
//                    if (shmObject.shutterCode !== null) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = true;
//                    }
//                    ;
//                });
//            });

//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();

            $scope.saveShutterComponentMapping = function (shutterComponentMapping) {
                ShutterComponentMappingService.save(shutterComponentMapping, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_shutter_component_mapping', null, {'reload': true});
                });
            };

            $scope.searchShutters = function (shutterString) {
                return KitchenComponentService.findByShutterComponentLike({
                    'component': shutterString
                }).$promise;
            };
            $scope.setShutter = function (shutter) {
                $scope.shutterDisplay.push(shutter);
                $scope.shutterName = "";
                $scope.editableShutterComponentMapping.shutters.push(shutter.id);
            };
            $scope.removeShutters = function (shutters) {
                console.log("Getting the thing :%O", shutters);
                var index = $scope.shutterDisplay.indexOf(shutters);
                var index1 = $scope.editableShutterComponentMapping.shutters.indexOf(shutters.id);
                $scope.shutterDisplay.splice(index, 1);
                $scope.editableShutterComponentMapping.shutters.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.shutterDisplay);
                console.log("Updated %O", $scope.editableShutterComponentMapping.shutters);
            };

        })
        .controller('ShutterComponentMappingEditController', function (ShutterComponentMappingService, FinishPriceService, KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.rawMaterialList = RawMaterialService.findAllList();
//            $scope.finishList = FinishPriceService.findAllList();
            $scope.shutterDisplay = [];
            $scope.editableShutterComponentMapping = {};
            $scope.finishList = FinishPriceService.findAllList(function (finishList) {
            });

            KitchenComponentService.findByCategory({
                'category': 'SHUTTER'
            }, function (shutterList) {
                console.log("SHutter List :%O", shutterList);
                $scope.shutterList = shutterList;
            });

//            $scope.$watch('editableShutterComponentMapping.finishCode', function (finishCode) {
//                console.log("Name :" + finishCode);
//                ShutterComponentMappingService.findByFinishCode({'finishCode': finishCode}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
//                    } else if (response.status === 404) {
//                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
//                    } else if (response.status === 400) {
//                        $scope.editableShutterComponentMapping.repeatFinishCode = false;
//                    }
//                }).then(function (shmObject) {
//                    if (shmObject.finishCode !== null) {
//                        $scope.editableShutterComponentMapping.repeatFinishCode = true;
//                    }
//                    ;
//                });
//            });

//            $scope.$watch('editableShutterHandleMapping.shutterCode', function (shutterCode) {
//                console.log("Name :" + shutterCode);
//                ShutterComponentMappingService.findByShutterCode({'shutterCode': shutterCode}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    } else if (response.status === 404) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    } else if (response.status === 400) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = false;
//                    }
//                }).then(function (shmObject) {
//                    if (shmObject.shutterCode !== null) {
//                        $scope.editableShutterComponentMapping.repeatShutterCode = true;
//                    }
//                    ;
//                });
//            });

            $scope.saveShutterComponentMapping = function (scmObject) {
                scmObject.$save(function () {
                    $state.go('admin.masters_shutter_component_mapping', null, {'reload': true});
                });
            };
            ShutterComponentMappingService.get({
                'id': $stateParams.shutterComponentMappingId
            }, function (scmObject) {
                $scope.editableShutterComponentMapping = scmObject;
                angular.forEach(scmObject.shutters, function (shutter) {
                    $scope.shutterDisplay.push(
                            KitchenComponentService.get({
                                'id': shutter
                            })
                            );

                });

            });
            $scope.searchShutters = function (shutterString) {
                return KitchenComponentService.findByShutterComponentLike({
                    'component': shutterString
                }).$promise;
            };
            $scope.setShutter = function (shutter) {
                $scope.shutterDisplay.push(shutter);
                $scope.shutterName = "";
                $scope.editableShutterComponentMapping.shutters.push(shutter.id);
            };
            $scope.removeShutters = function (shutters) {
                console.log("Getting the thing :%O", shutters);
                var index = $scope.shutterDisplay.indexOf(shutters);
                var index1 = $scope.editableShutterComponentMapping.shutters.indexOf(shutters.id);
                $scope.shutterDisplay.splice(index, 1);
                $scope.editableShutterComponentMapping.shutters.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.shutterDisplay);
                console.log("Updated %O", $scope.editableShutterComponentMapping.shutters);
            };
        })
        .controller('ShutterComponentMappingDeleteController', function (ShutterComponentMappingService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableShutterComponentMapping = ShutterComponentMappingService.get({'id': $stateParams.shutterComponentMappingId});
            $scope.deleteShutterComponentMapping = function (shutterComponentMapping) {
                shutterComponentMapping.$delete(function () {
                    $state.go('admin.masters_shutter_component_mapping', null, {'reload': true});
                });
            };
        });
;


