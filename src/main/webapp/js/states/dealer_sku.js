/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.dealer_sku", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_dealer_sku', {
                'url': '/dealer_sku_master?offset',
                'templateUrl': templateRoot + '/masters/dealer_sku/list.html',
                'controller': 'DealerSkuListController'
            });
            $stateProvider.state('admin.masters_dealer_sku.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/dealer_sku/form.html',
                'controller': 'DealerSkuAddController'
            });
            $stateProvider.state('admin.masters_dealer_sku.edit', {
                'url': '/:dealerSkuId/edit',
                'templateUrl': templateRoot + '/masters/dealer_sku/form.html',
                'controller': 'DealerSkuEditController'
            });
            $stateProvider.state('admin.masters_dealer_sku.delete', {
                'url': '/:dealerSkuId/delete',
                'templateUrl': templateRoot + '/masters/dealer_sku/delete.html',
                'controller': 'DealerSkuDeleteController'
            });
        })

        .controller('DealerSkuListController', function ($window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentUser = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
                $scope.userObject = userObject;
                console.log("THis is User Object :%O", userObject);
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminBackButton = true;
                    $scope.dealerBackButton = false;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                } else if (userObject.role === "ROLE_DEALER_PRO") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                } else if (userObject.role === "ROLE_DEALER_STAFF") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                }
            });
            $scope.currentOffset = 0;
            $scope.mainDealerSkuArray = [];
            $scope.nextDealerSkus = DealerSkuService.query({
                'offset': $scope.nextOffset
//                    'userId': $scope.userObject.id
            });

            DealerSkuService.query({
                'offset': $scope.currentOffset
//                    'userId': $scope.userObject.id
            }, function (dealerSkuList) {
                angular.forEach(dealerSkuList, function (dealerSkuObject) {
                    dealerSkuObject.userObject = UserService.get({
                        'id': dealerSkuObject.createdBy
                    });
                    dealerSkuObject.manufacturerObject = ManufacturerService.findByManufacturerCode({
                        'manufacturerCode': dealerSkuObject.manufacturerCode
                    });
                    dealerSkuObject.manufacturerCategoryObject = ManufacturerCategoryService.findByCategoryCode({
                        'categoryCode': dealerSkuObject.manufacturerCategoryCode
                    });
                    $scope.mainDealerSkuArray.push(dealerSkuObject);
                });
            });
            $scope.dealerSkuCall = function (offset) {
                console.log("Offset :%O", offset);
                DealerSkuService.query({
                    'offset': $scope.currentOffset
//                    'userId': $scope.userObject.id
                }, function (dealerSkuList) {
                    angular.forEach(dealerSkuList, function (dealerSkuObject) {
                        dealerSkuObject.userObject = UserService.get({
                            'id': dealerSkuObject.createdBy
                        });
                        dealerSkuObject.manufacturerObject = ManufacturerService.findByManufacturerCode({
                            'manufacturerCode': dealerSkuObject.manufacturerCode
                        });
                        dealerSkuObject.manufacturerCategoryObject = ManufacturerCategoryService.findByCategoryCode({
                            'categoryCode': dealerSkuObject.manufacturerCategoryCode
                        });
                        $scope.mainDealerSkuArray.push(dealerSkuObject);
                    });
                });
            };
            $scope.enterIntoArray = function (dealerSku) {
                $scope.mainDealerSkuArray.push(dealerSku);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.dealerSkuCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('DealerSkuAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Add SKU");
            $scope.currentUser = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
                $scope.userObject = userObject;
                console.log("THis is User Object :%O", userObject);
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminBackButton = true;
                    $scope.dealerBackButton = false;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                } else if (userObject.role === "ROLE_DEALER_PRO") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                } else if (userObject.role === "ROLE_DEALER_STAFF") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                }
            });
            $scope.editableDealerSku = {};

            $scope.setManufacturerCode = function (manufacturer) {
                $scope.editableDealerSku.manufacturerCode = manufacturer.manufacturerCode;
            };

            $scope.searchManufacturerCode = function (searchTerm) {
                return ManufacturerService.findByManufacturerNameLike({
                    'manufacturerName': searchTerm
                }).$promise;
            };

            $scope.setManufacturerCategoryCode = function (manufacturerCategory) {
                $scope.editableDealerSku.manufacturerCategoryCode = manufacturerCategory.categoryCode;
            };

            $scope.searchManufacturerCategoryCode = function (searchTerm) {
                return ManufacturerCategoryService.findByManufacturerCategoryLike({
                    'manufacturerCategory': searchTerm
                }).$promise;
            };

            $scope.saveDealerSku = function (editableDealerSku) {
                editableDealerSku.createdBy = $scope.userObject.id;
                DealerSkuService.save(editableDealerSku, function () {
                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
                });
            };
        })
        .controller('DealerSkuEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDealerSku = DealerSkuService.get({
                'id': $stateParams.dealerSkuId
            }, function (dealerSkuObject) {
                dealerSkuObject.manufacturer = ManufacturerService.findByManufacturerCode({
                    'manufacturerCode': dealerSkuObject.manufacturerCode
                });
                dealerSkuObject.manufacturerCategory = ManufacturerCategoryService.findByCategoryCode({
                    'categoryCode': dealerSkuObject.manufacturerCategoryCode
                });
            });

            $scope.setManufacturerCode = function (manufacturer) {
                $scope.editableDealerSku.manufacturerCode = manufacturer.manufacturerCode;
            };

            $scope.searchManufacturerCode = function (searchTerm) {
                return ManufacturerService.findByManufacturerNameLike({
                    'manufacturerName': searchTerm
                }).$promise;
            };

            $scope.setManufacturerCategoryCode = function (manufacturerCategory) {
                $scope.editableDealerSku.manufacturerCategoryCode = manufacturerCategory.categoryCode;
            };

            $scope.searchManufacturerCategoryCode = function (searchTerm) {
                return ManufacturerCategoryService.findByManufacturerCategoryLike({
                    'manufacturerCategory': searchTerm
                }).$promise;
            };

            $scope.saveDealerSku = function (editableDealerSku) {
                -editableDealerSku.$save(function () {
                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
                });
            };
        })
        .controller('DealerSkuDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDealerSku = DealerSkuService.get({
                'id': $stateParams.dealerSkuId
            });
            $scope.deleteDealerSku = function (dealerSku) {
                dealerSku.$delete(function () {
                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
                });
            };
        });


