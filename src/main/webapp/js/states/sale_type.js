/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.sale_type", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_sale_type', {
                'url': '/sale_type_master?offset',
                'templateUrl': templateRoot + '/masters/sale_type/list.html',
                'controller': 'SaleTypeListController'
            });
            $stateProvider.state('admin.masters_sale_type.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/sale_type/form.html',
                'controller': 'SaleTypeAddController'
            });
            $stateProvider.state('admin.masters_sale_type.edit', {
                'url': '/:saleTypeId/edit',
                'templateUrl': templateRoot + '/masters/sale_type/form.html',
                'controller': 'SaleTypeEditController'
            });
            $stateProvider.state('admin.masters_sale_type.delete', {
                'url': '/:saleTypeId/delete',
                'templateUrl': templateRoot + '/masters/sale_type/delete.html',
                'controller': 'SaleTypeDeleteController'
            });
        })

        .controller('SaleTypeListController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextSaleTypes = SaleTypeService.query({
                'offset': $scope.nextOffset
            });

            $scope.saleTypes = SaleTypeService.query({
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
        .controller('SaleTypeAddController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableSaleType = {};



            $scope.saveSaleType = function (saleType) {
                console.log("user", saleType);
                SaleTypeService.save(saleType, function () {
                    $state.go('admin.masters_sale_type', null, {'reload': true});
                });
            };

            $scope.$watch('editableSaleType.saleType', function (saleType) {
                console.log("Name :" + saleType);
                SaleTypeService.findBySaleType({'saleType': saleType}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableSaleType.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableSaleType.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableSaleType.repeatName = false;
                    }
                }).then(function (segment) {
                    if (segment.username !== null) {
                        $scope.editableSaleType.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('SaleTypeEditController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {
            SaleTypeService.get({'id': $stateParams.saleTypeId});
            SaleTypeService.get({
                'id': $stateParams.saleTypeId
            }, function (saleTypeData) {
                $scope.editableSaleType = saleTypeData;
            });

            $scope.saveSaleType = function (saleType) {
                saleType.$save(function () {
                    $state.go('admin.masters_sale_type', null, {'reload': true});
                });
            };
        })
        .controller('SaleTypeDeleteController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableSaleType = SaleTypeService.get({'id': $stateParams.saleTypeId});
            console.log("are we here?");
            $scope.deleteSaleType = function (saleType) {
                console.log("Segment :%O", saleType);
                saleType.$delete(function () {
                    $state.go('admin.masters_sale_type', null, {'reload': true});
                });
            };
        });


