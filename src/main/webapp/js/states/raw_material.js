/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.raw_material", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_raw_material', {
                'url': '/raw_material_master?offset',
                'templateUrl': templateRoot + '/masters/raw_material/list.html',
                'controller': 'RawMaterialListController'
            });
            $stateProvider.state('admin.masters_raw_material.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/raw_material/form.html',
                'controller': 'RawMaterialAddController'
            });
            $stateProvider.state('admin.masters_raw_material.edit', {
                'url': '/:rawMaterialId/edit',
                'templateUrl': templateRoot + '/masters/raw_material/form.html',
                'controller': 'RawMaterialEditController'
            });
            $stateProvider.state('admin.masters_raw_material.delete', {
                'url': '/:rawMaterialId/delete',
                'templateUrl': templateRoot + '/masters/raw_material/delete.html',
                'controller': 'RawMaterialDeleteController'
            });            
        })        
        .controller('RawMaterialListController', function (RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextRawMaterials = RawMaterialService.query({
                'offset': $scope.nextOffset
            });            
            $scope.rawMaterials = RawMaterialService.query({
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
        .controller('RawMaterialAddController', function (RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableRawMaterial = {};

            $scope.saveRawMaterial = function (rawMaterial) {                
                RawMaterialService.save(rawMaterial, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_raw_material', null, {'reload': true});
                });
            };

            $scope.$watch('editableRawMaterial.material', function (material) {
                console.log("Name :" + material);
                RawMaterialService.findByMaterial({'material': material}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableRawMaterial.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableRawMaterial.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableRawMaterial.repeatName = false;
                    }
                }).then(function (rawMaterial) {
                    if (rawMaterial.material !== null) {
                        $scope.editableRawMaterial.repeatName = true;
                    }
                    ;
                });
            });
            $scope.$watch('editableRawMaterial.materialCode', function (materialCode) {                
                RawMaterialService.findByMaterialCode({'materialCode': materialCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableRawMaterial.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableRawMaterial.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableRawMaterial.repeatCode = false;
                    }
                }).then(function (rawMaterial) {                   
                    if (rawMaterial.materialCode !== null) {
                        $scope.editableRawMaterial.repeatCode = true;
                    }
                    ;
                });
            });
        })
        .controller('RawMaterialEditController', function (RawMaterialService, $scope, $stateParams, $state, paginationLimit) {            
            RawMaterialService.get({'id': $stateParams.rawMaterialId});
            RawMaterialService.get({
                'id': $stateParams.rawMaterialId
            }, function (rawMaterialData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableRawMaterial = rawMaterialData;
            });

            $scope.saveRawMaterial = function (rawMaterial) {
                rawMaterial.$save(function () {
                    $state.go('admin.masters_raw_material',null, {'reload': true});
                });
//               
            };
        })
        .controller('RawMaterialDeleteController', function (RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableRawMaterial = RawMaterialService.get({'id': $stateParams.rawMaterialId});
            $scope.deleteRawMaterial = function (rawMaterial) {
                rawMaterial.$delete(function () {
                    $state.go('admin.masters_raw_material', null, {'reload': true});
                });
            };
        });


