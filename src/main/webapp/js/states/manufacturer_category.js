/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.manufacturer_category", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_manufacturer_category', {
                'url': '/:userId/manufacturer_category_master?offset',
                'templateUrl': templateRoot + '/masters/manufacturer_category/list.html',
                'controller': 'ManufacturerCategoryListController'
            });
            $stateProvider.state('admin.masters_manufacturer_category.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/manufacturer_category/form.html',
                'controller': 'ManufacturerCategoryAddController'
            });
            $stateProvider.state('admin.masters_manufacturer_category.edit', {
                'url': '/:manufacturerCategoryId/edit',
                'templateUrl': templateRoot + '/masters/manufacturer_category/form.html',
                'controller': 'ManufacturerCategoryEditController'
            });
            $stateProvider.state('admin.masters_manufacturer_category.delete', {
                'url': '/:manufacturerCategoryId/delete',
                'templateUrl': templateRoot + '/masters/manufacturer_category/delete.html',
                'controller': 'ManufacturerCategoryDeleteController'
            });
        })

        .controller('ManufacturerCategoryListController', function (ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $window, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {

            $scope.currentUser = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
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
            $scope.mainManufacturerCategoryArray = [];
            $scope.nextManufacturerCategories = ManufacturerCategoryService.findByCreator({
                'offset': $scope.nextOffset,
                'userId': $stateParams.userId
            });

            ManufacturerCategoryService.findByCreator({
                'offset': $scope.currentOffset,
                'userId': $stateParams.userId
            }, function (manufacturerCategoryList) {
                angular.forEach(manufacturerCategoryList, function (manufacturerCategoryObject) {
                    manufacturerCategoryObject.userObject = UserService.get({
                        'id': manufacturerCategoryObject.createdBy
                    });
                    manufacturerCategoryObject.manufacturerObjects = [];
                    angular.forEach(manufacturerCategoryObject.manufacturers, function (manufacturerId) {
                        manufacturerCategoryObject.manufacturerObjects.push(
                                ManufacturerService.get({
                                    'id': manufacturerId
                                })
                                );
                    });
//                    manufacturerCategoryObject.manufacturerObject = ManufacturerService.findByManufacturerCode({
//                        'manufacturerCode': manufacturerCategoryObject.manufacturerCode
//                    });
                    $scope.mainManufacturerCategoryArray.push(manufacturerCategoryObject);
                });
            });
            $scope.manufacturerCategoryCall = function (offset) {
                console.log("Offset :%O", offset);
                ManufacturerCategoryService.findByCreator({
                    'offset': $scope.currentOffset,
                    'userId': $stateParams.userId
                }, function (manufacturerCategoryList) {
                    angular.forEach(manufacturerCategoryList, function (manufacturerCategoryObject) {
                        manufacturerCategoryObject.userObject = UserService.get({
                            'id': manufacturerCategoryObject.createdBy
                        });
                        manufacturerCategoryObject.manufacturerObjects = [];
                        angular.forEach(manufacturerCategoryObject.manufacturers, function (manufacturerId) {
                            manufacturerCategoryObject.manufacturerObjects.push(
                                    ManufacturerService.get({
                                        'id': manufacturerId
                                    })
                                    );
                        });
//                        manufacturerCategoryObject.manufacturerObject = ManufacturerService.findByManufacturerCode({
//                            'manufacturerCode': manufacturerCategoryObject.manufacturerCode
//                        });
                        $scope.mainManufacturerCategoryArray.push(manufacturerCategoryObject);
                    });
                });
            };
            $scope.enterIntoArray = function (manufacturerCategory) {
                $scope.mainManufacturerCategoryArray.push(manufacturerCategory);
            };
            $scope.nextPage = function () {
                console.log("Pagination Limit :%O", paginationLimit);
                $scope.currentOffset += paginationLimit;
                console.log("Current Offset :%O", $scope.currentOffset);
                $scope.nextOffset = $scope.currentOffset + 10;
                console.log("Next Offset :%O", $scope.nextOffset);
                $scope.manufacturerCategoryCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    console.log("Calling Next Page");
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('ManufacturerCategoryAddController', function (ManufacturerService, UserService, $rootScope, ManufacturerCategoryService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
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
            $scope.editableManufacturerCategory = {};
            $scope.manufacturerDisplay = [];
            $scope.editableManufacturerCategory.manufacturers = [];
            $scope.$watch('editableManufacturerCategory.categoryCode', function (categoryCode) {
                ManufacturerCategoryService.findByCategoryCode({
                    'categoryCode': categoryCode
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableManufacturerCategory.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableManufacturerCategory.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableManufacturerCategory.repeatCode = false;
                    }
                }).then(function (manufacturerCategory) {
                    if (manufacturerCategory.categoryName !== null) {
                        $scope.editableManufacturerCategory.repeatCode = true;
                    }
                    ;
                });
            });
            $scope.searchManufacturerCode = function (manufacturerString) {
                return ManufacturerService.findByManufacturerNameLike({
                    'manufacturerName': manufacturerString
                }).$promise;
            };

            $scope.setManufacturerCode = function (manufacturer) {
                $scope.manufacturerDisplay.push(manufacturer);
                $scope.manufacturerName = "";
                $scope.editableManufacturerCategory.manufacturers.push(manufacturer.id);
            };

            $scope.removeManufacturers = function (manufacturers) {
                var index = $scope.manufacturerDisplay.indexOf(manufacturers);
                var index1 = $scope.editableManufacturerCategory.manufacturers.indexOf(manufacturers.id);
                $scope.manufacturerDisplay.splice(index, 1);
                $scope.editableManufacturerCategory.manufacturers.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.manufacturerDisplay);
                console.log("Updated %O", $scope.editableManufacturerCategory.manufacturers);
            };

            $scope.saveManufacturerCateogry = function (editableManufacturerCategory) {
                editableManufacturerCategory.createdBy = $scope.userObject.id;
                console.log("Save Object :%O", editableManufacturerCategory);
                ManufacturerCategoryService.save(editableManufacturerCategory, function () {
                    $state.go('admin.masters_manufacturer_category', null, {'reload': true});
                });
            };

        })
        .controller('ManufacturerCategoryEditController', function (ManufacturerService, UserService, $rootScope, ManufacturerCategoryService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.manufacturerDisplay = [];
            $scope.editableManufacturerCategory = {};
            ManufacturerCategoryService.get({
                'id': $stateParams.manufacturerCategoryId
            }, function (manufacturerCategoryObject) {
                console.log("Manufacturer Category :%O", manufacturerCategoryObject);
                $scope.editableManufacturerCategory = manufacturerCategoryObject;
                angular.forEach(manufacturerCategoryObject.manufacturers, function (manufacturer) {
                    $scope.manufacturerDisplay.push(
                            ManufacturerService.get({
                                'id': manufacturer
                            })
                            );
                });
//                manufacturerCategory.manufacturer = ManufacturerService.findByManufacturerCode({
//                    'manufacturerCode': manufacturerCategory.manufacturerCode
//                });
            });
            $scope.searchManufacturerCode = function (manufacturerString) {
                return ManufacturerService.findByManufacturerNameLike({
                    'manufacturerName': manufacturerString
                }).$promise;
            };

            $scope.setManufacturerCode = function (manufacturer) {
                $scope.manufacturerDisplay.push(manufacturer);
                $scope.manufacturerName = "";
                $scope.editableManufacturerCategory.manufacturers.push(manufacturer.id);
            };

            $scope.removeManufacturers = function (manufacturers) {
                var index = $scope.manufacturerDisplay.indexOf(manufacturers);
                var index1 = $scope.editableManufacturerCategory.manufacturers.indexOf(manufacturers.id);
                $scope.manufacturerDisplay.splice(index, 1);
                $scope.editableManufacturerCategory.manufacturers.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.manufacturerDisplay);
                console.log("Updated %O", $scope.editableManufacturerCategory.manufacturers);
            };

//            $scope.setManufacturerCode = function (manufacturer) {
//                $scope.editableManufacturerCategory.manufacturerCode = manufacturer.manufacturerCode;
//            };
//            $scope.searchManufacturerCode = function (searchTerm) {
//                return ManufacturerService.findByManufacturerNameLike({
//                    'manufacturerName': searchTerm
//                }).$promise;
//            };

            $scope.saveManufacturerCateogry = function (editableManufacturerCategory) {
                editableManufacturerCategory.$save(function () {
                    $state.go('admin.masters_manufacturer_category', null, {'reload': true});
                });

            };
        })
        .controller('ManufacturerCategoryDeleteController', function (ManufacturerCategoryService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableManufacturerCategory = ManufacturerCategoryService.get({
                'id': $stateParams.manufacturerCategoryId
            });
            $scope.deleteManufacturerCategory = function (manufacturerCategory) {
                manufacturerCategory.$delete(function () {
                    $state.go('admin.masters_manufacturer_category', null, {'reload': true});
                });
            };
        });


