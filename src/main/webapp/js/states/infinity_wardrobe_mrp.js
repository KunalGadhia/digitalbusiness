/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.infinity_wardrobe_mrp", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_infinity_wardrobe_mrp', {
                'url': '/infinity_wardrobe_master?offset',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe_mrp/list.html',
                'controller': 'InfinityWardrobeMrpListController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe_mrp.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe_mrp/form.html',
                'controller': 'InfinityWardrobeMrpAddController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe_mrp.edit', {
                'url': '/:infinityWardrobeMrpId/edit',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe_mrp/form.html',
                'controller': 'InfinityWardrobeMrpEditController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe_mrp.delete', {
                'url': '/:infinityWardrobeMrpId/delete',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe_mrp/delete.html',
                'controller': 'InfinityWardrobeMrpDeleteController'
            });
        })

        .controller('InfinityWardrobeMrpListController', function (InfinityWardrobeMrpService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {            
            $scope.currentOffset = 0;
            $scope.mainInfinityWardrobeMrpArray = [];
            $scope.nextInfinityWardrobeMrps = InfinityWardrobeMrpService.query({
                'offset': $scope.nextOffset
            });

            InfinityWardrobeMrpService.query({
                'offset': $scope.currentOffset
            });
            $scope.infinityWardrobeMrpCall = function (offset) {
                console.log("Offset :%O", offset);
                InfinityWardrobeMrpService.query({
                    'offset': $scope.currentOffset
                }, function (infinityWardrobeMrpList) {
                    angular.forEach(infinityWardrobeMrpList, function (infinityWardrobeMrpObject) {
                        
                        $scope.mainInfinityWardrobeMrpArray.push(infinityWardrobeMrpObject);
                    });
                });
            };
            $scope.enterIntoArray = function (infinityWardrobeMrp) {
                $scope.mainInfinityWardrobeMrpArray.push(infinityWardrobeMrp);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.infinityWardrobeMrpCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('InfinityWardrobeMrpAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('InfinityWardrobeMrpEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('InfinityWardrobeMrpDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


