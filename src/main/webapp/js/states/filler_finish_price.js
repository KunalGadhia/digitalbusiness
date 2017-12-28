/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.filler_finish_price", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_filler_finish_price', {
                'url': '/filler_finish_price_master?offset',
                'templateUrl': templateRoot + '/masters/filler_finish_price/list.html',
                'controller': 'FillerFinishPriceListController'
            });
            $stateProvider.state('admin.masters_filler_finish_price.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/filler_finish_price/form.html',
                'controller': 'FillerFinishPriceAddController'
            });
            $stateProvider.state('admin.masters_filler_finish_price.edit', {
                'url': '/:fillerFinishPriceId/edit',
                'templateUrl': templateRoot + '/masters/filler_finish_price/form.html',
                'controller': 'FillerFinishPriceEditController'
            });
            $stateProvider.state('admin.masters_filler_finish_price.delete', {
                'url': '/:fillerFinishPriceId/delete',
                'templateUrl': templateRoot + '/masters/filler_finish_price/delete.html',
                'controller': 'FillerFinishPriceDeleteController'
            });
        })
        .controller('FillerFinishPriceListController', function (FillerFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextFillerFinishPrices = FillerFinishPriceService.query({
                'offset': $scope.nextOffset
            });
            $scope.fillerFinishPrices = FillerFinishPriceService.query({
                'offset': $scope.currentOffset
            }, function (s) {
                angular.forEach($scope.fillerFinishPrices, function(ffpObject){
                   ffpObject.finishObject = FinishPriceService.findByFinishCode({
                       'finishCode' : ffpObject.finish
                   });
                   ffpObject.materialObject = RawMaterialService.findByMaterialCode({
                      'materialCode' : ffpObject.material
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
        .controller('FillerFinishPriceAddController', function (FillerFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableFillerFinishPrice = {};

            $scope.saveFillerFinishPrice = function (fillerFinishPrice) {
                FillerFinishPriceService.save(fillerFinishPrice, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_filler_finish_price', null, {'reload': true});
                });
            };
            $scope.finishList = FinishPriceService.findAllList();
            $scope.$watch('editableFillerFinishPrice.finish', function (finishCode) {
                FinishPriceService.findByFinishCode({
                    'finishCode': finishCode
                }, function (finishObject) {
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableFillerFinishPrice.material = rmObject.materialCode;
                        $scope.materialObject = rmObject;
                    });
                });
            });
        })
        .controller('FillerFinishPriceEditController', function (FillerFinishPriceService, FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
            FillerFinishPriceService.get({'id': $stateParams.fillerFinishPriceId});
            FillerFinishPriceService.get({
                'id': $stateParams.fillerFinishPriceId
            }, function (FillerFinishPriceData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableFillerFinishPrice = FillerFinishPriceData;
                RawMaterialService.findByMaterialCode({
                   'materialCode':FillerFinishPriceData.material 
                }, function(rmObject){
                    $scope.editableFillerFinishPrice.material = rmObject.materialCode;
                    $scope.materialObject = rmObject;
                });
            });
            $scope.finishList = FinishPriceService.findAllList();
            $scope.$watch('editableFillerFinishPrice.finish', function (finishCode) {
                FinishPriceService.findByFinishCode({
                    'finishCode': finishCode
                }, function (finishObject) {
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableFillerFinishPrice.material = rmObject.materialCode;
                        $scope.materialObject = rmObject;
                    });
                });
            });
            $scope.saveFillerFinishPrice = function (fillerFinishPrice) {
                fillerFinishPrice.$save(function () {
                    $state.go('admin.masters_filler_finish_price', null, {'reload': true});
                });
//               
            };
        })
        .controller('FillerFinishPriceDeleteController', function (FillerFinishPriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableFillerFinishPrice = FillerFinishPriceService.get({'id': $stateParams.fillerFinishPriceId});
            $scope.deleteFillerFinishPrice = function (fillerFinishPrice) {
                fillerFinishPrice.$delete(function () {
                    $state.go('admin.masters_filler_finish_price', null, {'reload': true});
                });
            };
        });


