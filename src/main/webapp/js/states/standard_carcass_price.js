/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.standard_carcass_price", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_standard_carcass_price', {
                'url': '/standard_carcass_price?offset',
                'templateUrl': templateRoot + '/masters/standard_carcass_price/list.html',
                'controller': 'StandardCarcassPriceListController'
            });
            $stateProvider.state('admin.masters_standard_carcass_price.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/standard_carcass_price/form.html',
                'controller': 'StandardCarcassPriceAddController'
            });
            $stateProvider.state('admin.masters_standard_carcass_price.edit', {
                'url': '/:stdCarcassPriceId:/edit',
                'templateUrl': templateRoot + '/masters/standard_carcass_price/form.html',
                'controller': 'StandardCarcassPriceEditController'
            });
            $stateProvider.state('admin.masters_standard_carcass_price.delete', {
                'url': '/:stdCarcassPriceId/delete',
                'templateUrl': templateRoot + '/masters/standard_carcass_price/delete.html',
                'controller': 'StandardCarcassPriceDeleteController'
            });
        })

        .controller('StandardCarcassPriceListController', function (StandardCarcassPriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextStandardCarcassPrice = StandardCarcassPriceService.query({
                'offset': $scope.nextOffset
            });

            $scope.standardCarcassPrices = StandardCarcassPriceService.query({
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
        .controller('StandardCarcassPriceAddController', function (StandardCarcassPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableStdCarcassPrice = {};
            RawMaterialService.findAllList(function (materialList) {
                console.log("Material List :%O", materialList);
                $scope.materialList = materialList;
            });
            $scope.saveStdPrice = function (stdPrice) {
                console.log("STD P :", stdPrice);
                StandardCarcassPriceService.save(stdPrice, function () {
                    $state.go('admin.masters_standard_carcass_price', null, {'reload': true});
                });
            };

        })
        .controller('StandardCarcassPriceEditController', function (StandardCarcassPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
//            StandardCarcassPriceService.get({'id': $stateParams.stdCarcassPriceId});
            StandardCarcassPriceService.get({
                'id': $stateParams.stdCarcassPriceId
            }, function (stdPriceData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                RawMaterialService.findByMaterialCode({
                    'materialCode': stdPriceData.material
                }, function (rawMaterial) {
                    $scope.editableStdCarcassPrice.material = rawMaterial.materialCode;
                });
                $scope.editableStdCarcassPrice = stdPriceData;
            });
            RawMaterialService.findAllList(function (materialList) {
                console.log("Material List :%O", materialList);
                $scope.materialList = materialList;
            });
            $scope.saveStdPrice = function (stdCarcassPrice) {
                stdCarcassPrice.$save(function () {
                    $state.go('admin.masters_standard_carcass_price', null, {'reload': true});
                });
            };
        })
        .controller('StandardCarcassPriceDeleteController', function (StandardCarcassPriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableStdCarcassPrice = StandardCarcassPriceService.get({'id': $stateParams.stdCarcassPriceId});
            $scope.deleteStdValue = function (stdCarcassPrice) {
                stdCarcassPrice.$delete(function () {
                    $state.go('admin.masters_standard_carcass_price', null, {'reload': true});
                });
            };
        });


