/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.shutter_finish_price", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_shutter_finish_price', {
                'url': '/shutter_finish_price_master?offset',
                'templateUrl': templateRoot + '/masters/shutter_finish_price/list.html',
                'controller': 'ShutterFinishPriceListController'
            });
            $stateProvider.state('admin.masters_shutter_finish_price.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/shutter_finish_price/form.html',
                'controller': 'ShutterFinishPriceAddController'
            });
            $stateProvider.state('admin.masters_shutter_finish_price.edit', {
                'url': '/:shutterFinishPriceId/edit',
                'templateUrl': templateRoot + '/masters/shutter_finish_price/form.html',
                'controller': 'ShutterFinishPriceEditController'
            });
            $stateProvider.state('admin.masters_shutter_finish_price.delete', {
                'url': '/:shutterFinishPriceId/delete',
                'templateUrl': templateRoot + '/masters/shutter_finish_price/delete.html',
                'controller': 'ShutterFinishPriceDeleteController'
            });
        })
        .controller('ShutterFinishPriceListController', function (ShutterFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextShutterFinishPrices = ShutterFinishPriceService.query({
                'offset': $scope.nextOffset
            });
            $scope.shutterFinishPrices = ShutterFinishPriceService.query({
                'offset': $scope.currentOffset
            }, function (s) {
                angular.forEach($scope.shutterFinishPrices, function(sfpObject){
                   sfpObject.finishObject = FinishPriceService.findByFinishCode({
                       'finishCode' : sfpObject.finish
                   });
                   sfpObject.materialObject = RawMaterialService.findByMaterialCode({
                      'materialCode' : sfpObject.material
                   });
                });
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
        .controller('ShutterFinishPriceAddController', function (ShutterFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableShutterFinishPrice = {};

            $scope.saveShutterFinishPrice = function (shutterFinishPrice) {
                ShutterFinishPriceService.save(shutterFinishPrice, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_shutter_finish_price', null, {'reload': true});
                });
            };
            $scope.finishList = FinishPriceService.findAllList();
            $scope.$watch('editableShutterFinishPrice.finish', function (finishCode) {
                FinishPriceService.findByFinishCode({
                    'finishCode': finishCode
                }, function (finishObject) {
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableShutterFinishPrice.material = rmObject.materialCode;
                        $scope.materialObject = rmObject;
                    });
                });
            });

//            $scope.$watch('editableCarcassSubtype.subType', function (subType) {
//                console.log("Name :" + subType);
//                CarcassSubtypeService.findByMaterial({'material': subType}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableCarcassSubtype.repeatName = false;
//                    } else if (response.status === 404) {
//                        $scope.editableCarcassSubtype.repeatName = false;
//                    } else if (response.status === 400) {
//                        $scope.editableCarcassSubtype.repeatName = false;
//                    }
//                }).then(function (rawMaterial) {
//                    if (rawMaterial.material !== null) {
//                        $scope.editableCarcassSubtype.repeatName = true;
//                    }
//                    ;
//                });
//            });
//            $scope.$watch('editableRawMaterial.materialCode', function (materialCode) {                
//                CarcassSubtypeService.findByMaterialCode({'materialCode': materialCode}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableCarcassSubtype.repeatCode = false;
//                    } else if (response.status === 404) {
//                        $scope.editableCarcassSubtype.repeatCode = false;
//                    } else if (response.status === 400) {
//                        $scope.editableCarcassSubtype.repeatCode = false;
//                    }
//                }).then(function (rawMaterial) {                   
//                    if (rawMaterial.materialCode !== null) {
//                        $scope.editableCarcassSubtype.repeatCode = true;
//                    }
//                    ;
//                });
//            });
        })
        .controller('ShutterFinishPriceEditController', function (ShutterFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
            ShutterFinishPriceService.get({'id': $stateParams.shutterFinishPriceId});
            ShutterFinishPriceService.get({
                'id': $stateParams.shutterFinishPriceId
            }, function (shutterFinishPriceData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableShutterFinishPrice = shutterFinishPriceData;
                RawMaterialService.findByMaterialCode({
                   'materialCode':shutterFinishPriceData.material 
                }, function(rmObject){
                    $scope.editableShutterFinishPrice.material = rmObject.materialCode;
                    $scope.materialObject = rmObject;
                });
            });
            $scope.finishList = FinishPriceService.findAllList();
            $scope.$watch('editableShutterFinishPrice.finish', function (finishCode) {
                FinishPriceService.findByFinishCode({
                    'finishCode': finishCode
                }, function (finishObject) {
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableShutterFinishPrice.material = rmObject.materialCode;
                        $scope.materialObject = rmObject;
                    });
                });
            });
            $scope.saveShutterFinishPrice = function (shutterFinishPrice) {
                shutterFinishPrice.$save(function () {
                    $state.go('admin.masters_shutter_finish_price', null, {'reload': true});
                });
//               
            };
        })
        .controller('ShutterFinishPriceDeleteController', function (ShutterFinishPriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableShutterFinishPrice = ShutterFinishPriceService.get({'id': $stateParams.shutterFinishPriceId});
            $scope.deleteShutterFinishPrice = function (shutterFinishPrice) {
                shutterFinishPrice.$delete(function () {
                    $state.go('admin.masters_shutter_finish_price', null, {'reload': true});
                });
            };
        });


