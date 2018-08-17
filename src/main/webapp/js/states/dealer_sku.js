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

        .controller('DealerSkuListController', function (PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
//            if (
//                    $stateParams.offset === undefined ||
//                    isNaN($stateParams.offset) ||
//                    new Number($stateParams.offset) < 0)
//            {
//                $scope.currentOffset = 0;
//            } else {
//                $scope.currentOffset = new Number($stateParams.offset);
//            }
//
//            $scope.nextOffset = $scope.currentOffset + 10;
//
//            $scope.nextParty = PartyService.query({
//                'offset': $scope.nextOffset
//            });
//
//            $scope.parties = PartyService.query({
//                'offset': $scope.currentOffset
//            }, function (s) {
//                angular.forEach($scope.parties, function (partyObject) {
//                    partyObject.employeeObject = EmployeeService.get({
//                        'id': partyObject.marketingHeadId
//                    });
//                });
//            });
//
//            $scope.nextPage = function () {
//                $scope.currentOffset += paginationLimit;
//                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
//            };
//            $scope.previousPage = function () {
//                if ($scope.currentOffset <= 0) {
//                    return;
//                }
//                $scope.currentOffset -= paginationLimit;
//                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
//            };
//
//            $scope.searchParty = function (searchTerm) {
//                return PartyService.findByNameLike({
//                    'name': searchTerm
//                }).$promise;
//            };
//
//            $scope.setParty = function (party) {
//                $scope.searchPartyId = party.id;
//            };
//
//            $scope.searchPartyName = function () {
//                $scope.parties = [];
//                PartyService.get({
//                    'id': $scope.searchPartyId
//                }, function (partyObject) {
//                    $scope.parties.push(partyObject);
//                });
//            };
//
//            $scope.clearSearch = function () {
//                $scope.searchPartyId = '';
//                $scope.partyObject = {};
//                $scope.parties = PartyService.query({
//                    'offset': $scope.currentOffset
//                }, function (partyList) {
//                    angular.forEach($scope.parties, function (partyObject) {
//                        partyObject.employeeObject = EmployeeService.get({
//                            'id': partyObject.marketingHeadId
//                        });
//                    });
//                });
//            };

        })
        .controller('DealerSkuAddController', function (RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.editableParty = {};
//
//            $scope.saveParty = function (party) {
//                console.log("user", party);
//                PartyService.save(party, function () {
//                    $state.go('admin.masters_party', null, {'reload': true});
//                });
//            };
//
//            $scope.setEmployee = function (employee) {
//                $scope.editableParty.marketingHeadId = employee.id;
//            };
//            $scope.searchEmployee = function (searchTerm) {
//                return EmployeeService.findByNameLike({
//                    'name': searchTerm
//                }).$promise;
//            };
//
//            $scope.setRateContract = function (rateContract) {
//                $scope.editableParty.rateContractId = rateContract.id;
//            };
//            $scope.searchRateContract = function (searchTerm) {
//                console.log("Rate COntract :%O", searchTerm);
//                return RateContractService.findByContractNameLike({
//                    'contractName': searchTerm
//                }).$promise;
//            };
//
//            $scope.$watch('editableParty.dealerName', function (name) {
//                console.log("Name :" + name);
//                PartyService.findByName({'name': name}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableParty.repeatName = false;
//                    } else if (response.status === 404) {
//                        $scope.editableParty.repeatName = false;
//                    } else if (response.status === 400) {
//                        $scope.editableParty.repeatName = false;
//                    }
//                }).then(function (party) {
//                    if (party.username !== null) {
//                        $scope.editableParty.repeatName = true;
//                    }
//                    ;
//                });
//            });
        })
        .controller('DealerSkuEditController', function (RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
//            PartyService.get({'id': $stateParams.partyId});
//            PartyService.get({
//                'id': $stateParams.partyId
//            }, function (partyData) {
////                partyData.empMobileNumber = parseInt(partyData.empMobileNumber);
//                partyData.employee = EmployeeService.get({
//                    'id': partyData.marketingHeadId
//                });
//                partyData.rateContract = RateContractService.get({
//                    'id': partyData.rateContractId
//                });
//                $scope.editableParty = partyData;
//            });
//            $scope.setEmployee = function (employee) {
//                $scope.editableParty.marketingHeadId = employee.id;
//            };
//            $scope.searchEmployee = function (searchTerm) {
//                return EmployeeService.findByNameLike({
//                    'name': searchTerm
//                }).$promise;
//            };
//            $scope.setRateContract = function (rateContract) {
//                $scope.editableParty.rateContractId = rateContract.id;
//            };
//            $scope.searchRateContract = function (searchTerm) {
//                return RateContractService.findByContractNameLike({
//                    'contractName': searchTerm
//                }).$promise;
//            };
//            $scope.saveParty = function (party) {
//                party.$save(function () {
//                    $state.go('admin.masters_party', null, {'reload': true});
//                });
//            };
        })
        .controller('DealerSkuDeleteController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableParty = PartyService.get({'id': $stateParams.partyId});
//            $scope.deleteParty = function (party) {
//                console.log("Employee :%O", party);
//                party.$delete(function () {
//                    $state.go('admin.masters_party', null, {'reload': true});
//                });
//            };
        });


