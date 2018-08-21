/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.max_kitchen", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_max_kitchen', {
                'url': '/max_kitchen_master?offset',
                'templateUrl': templateRoot + '/masters/max_kitchen/list.html',
                'controller': 'MaxKitchenListController'
            });
            $stateProvider.state('admin.masters_max_kitchen.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/max_kitchen/form.html',
                'controller': 'MaxKitchenAddController'
            });
            $stateProvider.state('admin.masters_max_kitchen.edit', {
                'url': '/:maxKitchenId/edit',
                'templateUrl': templateRoot + '/masters/max_kitchen/form.html',
                'controller': 'MaxKitchenEditController'
            });
            $stateProvider.state('admin.masters_max_kitchen.delete', {
                'url': '/:maxKitchenId/delete',
                'templateUrl': templateRoot + '/masters/max_kitchen/delete.html',
                'controller': 'MaxkitchenDeleteController'
            });
        })

        .controller('MaxKitchenListController', function (MaxKitchenService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {            
            $scope.currentOffset = 0;
            $scope.mainMaxKitchenArray = [];
            $scope.nextMaxKitchens = MaxKitchenService.query({
                'offset': $scope.nextOffset
            });

            MaxKitchenService.query({
                'offset': $scope.currentOffset
            });
            $scope.maxKitchenCall = function (offset) {
                console.log("Offset :%O", offset);
                MaxKitchenService.query({
                    'offset': $scope.currentOffset
                }, function (maxKitchenList) {
                    angular.forEach(maxKitchenList, function (maxKitchenObject) {
                        $scope.mainMaxKitchenArray.push(maxKitchenObject);
                    });
                });
            };
            $scope.enterIntoArray = function (maxKitchenMrp) {
                $scope.mainMaxKitchenArray.push(maxKitchenMrp);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.maxKitchenCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('MaxKitchenAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxKitchenEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxKitchenDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


