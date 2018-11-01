/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.manufacturer", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_manufacturer', {
                'url': '/:userId/manufacturer_master?offset',
                'templateUrl': templateRoot + '/masters/manufacturer/list.html',
                'controller': 'ManufacturerListController'
            });
            $stateProvider.state('admin.masters_manufacturer.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/manufacturer/form.html',
                'controller': 'ManufacturerAddController'
            });
            $stateProvider.state('admin.masters_manufacturer.edit', {
                'url': '/:manufacturerId/edit',
                'templateUrl': templateRoot + '/masters/manufacturer/form.html',
                'controller': 'ManufacturerEditController'
            });
            $stateProvider.state('admin.masters_manufacturer.delete', {
                'url': '/:manufacturerId/delete',
                'templateUrl': templateRoot + '/masters/manufacturer/delete.html',
                'controller': 'ManufacturerDeleteController'
            });
        })

        .controller('ManufacturerListController', function ($window, ManufacturerService, UserService, $rootScope, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
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
            $scope.mainManufacturerArray = [];
            $scope.nextManufacturers = ManufacturerService.findByCreator({
                'offset': $scope.nextOffset,
                'userId': $stateParams.userId
            });

            ManufacturerService.findByCreator({
                'offset': $scope.currentOffset,
                'userId': $stateParams.userId
            }, function (manufacturerList) {
                angular.forEach(manufacturerList, function (manufacturerObject) {
                    manufacturerObject.userObject = UserService.get({
                        'id': manufacturerObject.createdBy
                    });
                    $scope.mainManufacturerArray.push(manufacturerObject);
                });
            });
            $scope.manufacturerCall = function (offset) {
                console.log("Offset :%O", offset);
                ManufacturerService.findByCreator({
                    'offset': $scope.currentOffset,
                    'userId': $stateParams.userId
                }, function (manufacturerList) {
                    angular.forEach(manufacturerList, function (manufacturerObject) {
                        manufacturerObject.userObject = UserService.get({
                            'id': manufacturerObject.createdBy
                        });
                        $scope.mainManufacturerArray.push(manufacturerObject);
                    });
                });
            };
            $scope.enterIntoArray = function (manufacturer) {
                $scope.mainManufacturerArray.push(manufacturer);
            };
            $scope.nextPage = function () {
                console.log("Pagination Limit :%O", paginationLimit);
                $scope.currentOffset += paginationLimit;
                console.log("Current Offset :%O", $scope.currentOffset);
                $scope.nextOffset = $scope.currentOffset + 10;
                console.log("Next Offset :%O", $scope.nextOffset);
                $scope.manufacturerCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    console.log("Calling Next Page");
                    $scope.nextPage();
                }
                ;
            });

        })
        .controller('ManufacturerAddController', function (UserService, $rootScope, ManufacturerService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
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
            $scope.editableManufacturer = {};

            $scope.$watch('editableManufacturer.manufacturerCode', function (manufacturerCode) {
                ManufacturerService.findByManufacturerCodeByCreator({
                    'manufacturerCode': manufacturerCode,
                    'createdBy': $scope.userObject.id
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableManufacturer.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableManufacturer.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableManufacturer.repeatCode = false;
                    }
                }).then(function (manufacturer) {
                    if (manufacturer.manufacturerName !== null) {
                        $scope.editableManufacturer.repeatCode = true;
                    }
                    ;
                });
            });
            $scope.saveManufacturer = function (editableManufacturer) {
                editableManufacturer.createdBy = $scope.userObject.id;
                ManufacturerService.save(editableManufacturer, function () {
                    $state.go('admin.masters_manufacturer', null, {'reload': true});
                });
            };
        })
        .controller('ManufacturerEditController', function (ManufacturerService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableManufacturer = ManufacturerService.get({
                'id': $stateParams.manufacturerId
            });

            $scope.saveManufacturer = function (editableManufacturer) {
                editableManufacturer.$save(function () {
                    $state.go('admin.masters_manufacturer', null, {'reload': true});
                });
            };
        })
        .controller('ManufacturerDeleteController', function (ManufacturerService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableManufacturer = ManufacturerService.get({'id': $stateParams.manufacturerId});
            $scope.deleteManufacturer = function (manufacturer) {
                console.log("Manufacturer :%O", manufacturer);
                manufacturer.$delete(function () {
                    $state.go('admin.masters_manufacturer', null, {'reload': true});
                });
            };
        });


