/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.carcass_subtype", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_carcass_subtype', {
                'url': '/carcass_subtype_master?offset',
                'templateUrl': templateRoot + '/masters/carcass_subtype/list.html',
                'controller': 'CarcassSubtypeListController'
            });
            $stateProvider.state('admin.masters_carcass_subtype.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/carcass_subtype/form.html',
                'controller': 'CarcassSubtypeAddController'
            });
            $stateProvider.state('admin.masters_carcass_subtype.edit', {
                'url': '/:carcassSubtypeId/edit',
                'templateUrl': templateRoot + '/masters/carcass_subtype/form.html',
                'controller': 'CarcassSubtypeEditController'
            });
            $stateProvider.state('admin.masters_carcass_subtype.delete', {
                'url': '/:carcassSubtypeId/delete',
                'templateUrl': templateRoot + '/masters/carcass_subtype/delete.html',
                'controller': 'CarcassSubtypeDeleteController'
            });            
        })        
        .controller('CarcassSubtypeListController', function (CarcassSubtypeService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextCarcassSubtypes = CarcassSubtypeService.query({
                'offset': $scope.nextOffset
            });            
            $scope.carcassSubtypes = CarcassSubtypeService.query({
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
        .controller('CarcassSubtypeAddController', function (CarcassSubtypeService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableCarcassSubtype = {};

            $scope.saveCarcassSubtype = function (carcassSubtype) {                
                CarcassSubtypeService.save(carcassSubtype, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_carcass_subtype', null, {'reload': true});
                });
            };

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
        .controller('CarcassSubtypeEditController', function (CarcassSubtypeService, $scope, $stateParams, $state, paginationLimit) {            
            CarcassSubtypeService.get({'id': $stateParams.carcassSubtypeId});
            CarcassSubtypeService.get({
                'id': $stateParams.carcassSubtypeId
            }, function (carcassSubtypeData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableCarcassSubtype = carcassSubtypeData;
            });

            $scope.saveCarcassSubtype = function (carcassSubtype) {
                carcassSubtype.$save(function () {
                    $state.go('admin.masters_carcass_subtype',null, {'reload': true});
                });
//               
            };
        })
        .controller('CarcassSubtypeDeleteController', function (CarcassSubtypeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableCarcassSubtype = CarcassSubtypeService.get({'id': $stateParams.carcassSubtypeId});
            $scope.deleteCarcassSubtype = function (carcassSubtype) {
                carcassSubtype.$delete(function () {
                    $state.go('admin.masters_carcass_subtype', null, {'reload': true});
                });
            };
        });


