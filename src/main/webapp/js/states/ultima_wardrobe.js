/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.ultima_wardrobe", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_ultima_wardrobe', {
                'url': '/ultima_wardrobe_master?offset',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/list.html',
                'controller': 'UltimaWardrobeListController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/form.html',
                'controller': 'UltimaWardrobeAddController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.edit', {
                'url': '/:ultimaWardrobeId/edit',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/form.html',
                'controller': 'UltimnaWardrobeEditController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.delete', {
                'url': '/:ultimaWardrobeId/delete',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/delete.html',
                'controller': 'UltimaWardrobeDeleteController'
            });
        })

        .controller('UltimaWardrobeListController', function (UltimaWardrobeService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {            
            $scope.currentOffset = 0;
            $scope.mainUltimaWardrobeArray = [];
            $scope.nextUltimaWardrobes = UltimaWardrobeService.query({
                'offset': $scope.nextOffset
            });

            UltimaWardrobeService.query({
                'offset': $scope.currentOffset
            });
            $scope.ultimaWardrobeCall = function (offset) {
                console.log("Offset :%O", offset);
                UltimaWardrobeService.query({
                    'offset': $scope.currentOffset
                }, function (ultimaWardrobeList) {
                    angular.forEach(ultimaWardrobeList, function (ultimaWardrobeObject) {
                        
                        $scope.mainUltimaWardrobeArray.push(ultimaWardrobeObject);
                    });
                });
            };
            $scope.enterIntoArray = function (ultimaWardrobe) {
                $scope.mainUltimaWardrobeArray.push(ultimaWardrobe);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.ultimaWardrobeCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('UltimaWardrobeAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('UltimnaWardrobeEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {            

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('UltimaWardrobeDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


