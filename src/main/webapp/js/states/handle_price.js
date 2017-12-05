/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.handle_price", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_handle_price', {
                'url': '/handle_price_master?offset',
                'templateUrl': templateRoot + '/masters/handle_price/list.html',
                'controller': 'HandlePriceListController'
            });
            $stateProvider.state('admin.masters_handle_price.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/handle_price/form.html',
                'controller': 'HandlePriceAddController'
            });
            $stateProvider.state('admin.masters_handle_price.edit', {
                'url': '/:handlePriceId/edit',
                'templateUrl': templateRoot + '/masters/handle_price/form.html',
                'controller': 'HandlePriceEditController'
            });
            $stateProvider.state('admin.masters_handle_price.delete', {
                'url': '/:handlePriceId/delete',
                'templateUrl': templateRoot + '/masters/handle_price/delete.html',
                'controller': 'HandlePriceDeleteController'
            });
        })
        .controller('HandlePriceListController', function (HandlePriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextHandlePrices = HandlePriceService.query({
                'offset': $scope.nextOffset
            });
            $scope.handlePrices = HandlePriceService.query({
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
        .controller('HandlePriceAddController', function (KitchenComponentService, HandlePriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableHandlePrice = {};

            KitchenComponentService.findByCategory({
                'category': 'HANDLE'
            }, function (handleCategoryList) {
                console.log("HC L :%O", handleCategoryList);
                $scope.kitchenComponentList = handleCategoryList;
            });
            console.log("Kitchen COmponent List :%O", $scope.kitchenComponentList);

            $scope.saveHandlePrice = function (handlePrice) {
                HandlePriceService.save(handlePrice, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_handle_price', null, {'reload': true});
                });
            };

        })
        .controller('HandlePriceEditController', function (KitchenComponentService, HandlePriceService, $scope, $stateParams, $state, paginationLimit) {
            HandlePriceService.get({'id': $stateParams.handlePriceId});
            KitchenComponentService.findByCategory({
                'category': 'HANDLE'
            }, function (handleCategoryList) {
                console.log("HC L :%O", handleCategoryList);
                $scope.kitchenComponentList = handleCategoryList;
            });
            HandlePriceService.get({
                'id': $stateParams.handlePriceId
            }, function (handlePrice) {
                console.log("Handle Price :%O", handlePrice);
                $scope.editableHandlePrice = handlePrice;
            });

            $scope.saveHandlePrice = function (handlePrice) {
                handlePrice.$save(function () {
                    $state.go('admin.masters_handle_price', null, {'reload': true});
                });
//               
            };
        })
        .controller('HandlePriceDeleteController', function (HandlePriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableHandlePrice = HandlePriceService.get({'id': $stateParams.handlePriceId});
            $scope.deleteHandlePrice = function (handlePrice) {
                handlePrice.$delete(function () {
                    $state.go('admin.masters_handle_price', null, {'reload': true});
                });
            };
        });


