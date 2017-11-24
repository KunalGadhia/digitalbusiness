/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.finish_price", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_finish_price', {
                'url': '/finish_price_master?offset',
                'templateUrl': templateRoot + '/masters/finish_price/list.html',
                'controller': 'FinishPriceListController'
            });
            $stateProvider.state('admin.masters_finish_price.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/finish_price/form.html',
                'controller': 'FinishPriceAddController'
            });
            $stateProvider.state('admin.masters_finish_price.edit', {
                'url': '/:finishPriceId/edit',
                'templateUrl': templateRoot + '/masters/finish_price/form.html',
                'controller': 'FinishPriceEditController'
            });
            $stateProvider.state('admin.masters_finish_price.delete', {
                'url': '/:finishPriceId/delete',
                'templateUrl': templateRoot + '/masters/finish_price/delete.html',
                'controller': 'FinishPriceDeleteController'
            });
        })

        .controller('FinishPriceListController', function (FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextFinishPrices = FinishPriceService.query({
                'offset': $scope.nextOffset
            });

            $scope.finishPrices = FinishPriceService.query({
                'offset': $scope.currentOffset
            }, function () {
                angular.forEach($scope.finishPrices, function (finishPrice) {
                    finishPrice.materialObject = RawMaterialService.get({
                        'id': finishPrice.materialId
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
        .controller('FinishPriceAddController', function (FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableFinishPrice = {};
            $scope.saveFinishPrice = function (finishPrice) {
                console.log("user", finishPrice);
                FinishPriceService.save(finishPrice, function () {
                    $state.go('admin.masters_finish_price', null, {'reload': true});
                });
            };
            $scope.materialList = RawMaterialService.findAllList();


            $scope.$watch('editableFinishPrice.finishName', function (finishName) {
                console.log("Name :" + finishName);
                FinishPriceService.findByName({'finishName': finishName}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableFinishPrice.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableFinishPrice.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableFinishPrice.repeatName = false;
                    }
                }).then(function (finishPrice) {
                    if (finishPrice.finishName !== null) {
                        $scope.editableFinishPrice.repeatName = true;
                    }
                    ;
                });
            });
            $scope.$watch('editableFinishPrice.finishCode', function (finishCode) {
                FinishPriceService.findByFinishCode({
                    'finishCode': finishCode
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableFinishPrice.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableFinishPrice.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableFinishPrice.repeatCode = false;
                    }
                }).then(function (finish) {
                    if (finish.finishCode !== null) {
                        $scope.editableFinishPrice.repeatCode = true;
                    }
                    ;
                });
            });
        })
        .controller('FinishPriceEditController', function (FinishPriceService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
//            FinishPriceService.get({'id': $stateParams.finishPriceId});
            $scope.editableFinishPrice = {};
            $scope.materialList = RawMaterialService.findAllList();
            FinishPriceService.get({
                'id': $stateParams.finishPriceId
            }, function (finishObject) {
                console.log("Finish :%O", finishObject.materialId);
                $scope.editableFinishPrice = finishObject;
                $("#materialList").val(finishObject.materialId);
            });

            $scope.saveFinishPrice = function (finishPrice) {
                console.log("Finish Price Edit Object :%O", finishPrice);
                finishPrice.$save(function () {
                    $state.go('admin.masters_finish_price', null, {'reload': true});
                });
            };
        })
        .controller('FinishPriceDeleteController', function (FinishPriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableFinishPrice = FinishPriceService.get({'id': $stateParams.finishPriceId});
            $scope.deleteFinishPrice = function (finishPrice) {
                console.log("Finish Price :%O", finishPrice);
                finishPrice.$delete(function () {
                    $state.go('admin.masters_finish_price', null, {'reload': true});
                });
            };
        });


