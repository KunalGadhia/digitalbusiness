/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.masters_rate_contract", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_rate_contract', {
                'url': '/rate_contract_master?offset',
                'templateUrl': templateRoot + '/masters/rate_contract/list.html',
                'controller': 'RateContractListController'
            });
            $stateProvider.state('admin.masters_rate_contract.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/rate_contract/form.html',
                'controller': 'RateContractAddController'
            });
            $stateProvider.state('admin.masters_rate_contract.edit', {
                'url': '/:rateContractId/edit',
                'templateUrl': templateRoot + '/masters/rate_contract/form.html',
                'controller': 'RateContractEditController'
            });
            $stateProvider.state('admin.masters_rate_contract.delete', {
                'url': '/:rateContractId/delete',
                'templateUrl': templateRoot + '/masters/rate_contract/delete.html',
                'controller': 'RateContractDeleteController'
            });
            $stateProvider.state('admin.masters_rate_contract_detail', {
                'url': '/:rateContractId/contract_detail',
                'templateUrl': templateRoot + '/masters/rate_contract/contract_detail.html',
                'controller': 'RateContractDetailController'
            });
            $stateProvider.state('admin.masters_rate_contract_detail.contract_delete', {
                'url': '/:rateContractDetailId/detail/contract_delete',
                'templateUrl': templateRoot + '/masters/rate_contract/contract_delete.html',
                'controller': 'RateContractDetailDeleteController'
            });
        })

        .controller('RateContractListController', function (RateContractService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextRateContracts = RateContractService.query({
                'offset': $scope.nextOffset
            });

            $scope.rateContracts = RateContractService.query({
                'offset': $scope.currentOffset
            }, function (s) {
//                angular.forEach($scope.rateContracts, function (partyObject) {
//                    partyObject.employeeObject = EmployeeService.get({
//                        'id': partyObject.marketingHeadId
//                    });
//                });
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
        .controller('RateContractAddController', function (RateContractService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableRateContract = {};

            $scope.saveRateContract = function (rateContract) {
                console.log("Rate Contract", rateContract);
                RateContractService.save(rateContract, function (rcSavedObj) {
                    $state.go('admin.masters_rate_contract_detail', {
                        'rateContractId': rcSavedObj.id
                    }, {'reload': true});
                });
            };


            $scope.$watch('editableRateContract.contractName', function (contractName) {
                console.log("Name :" + contractName);
                RateContractService.findByContractName({'contractName': contractName}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableRateContract.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableRateContract.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableRateContract.repeatName = false;
                    }
                }).then(function (rateContract) {
                    if (rateContract.contractName !== null) {
                        $scope.editableRateContract.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('RateContractEditController', function (RateContractService, $scope, $stateParams, $state, paginationLimit) {
            RateContractService.get({'id': $stateParams.rateContractId});
            RateContractService.get({
                'id': $stateParams.rateContractId
            }, function (rateContractData) {
//                partyData.empMobileNumber = parseInt(partyData.empMobileNumber);                
                $scope.editableRateContract = rateContractData;
            });
            $scope.saveRateContract = function (rateContract) {
                rateContract.$save(function () {
                    $state.go('admin.masters_rate_contract', null, {'reload': true});
                });
            };
        })
        .controller('RateContractDeleteController', function (RateContractService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableRateContract = RateContractService.get({'id': $stateParams.rateContractId});
            $scope.deleteRateContract = function (rateContract) {
                console.log("RC :%O", rateContract);
                rateContract.$delete(function () {
                    $state.go('admin.masters_rate_contract', null, {'reload': true});
                });
            };
        })
        .controller('RateContractDetailController', function (RateContractDetailService, RawMaterialService, FinishPriceService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableRateContractDetail = {};
            $scope.readonlyMaterial = false;
            $scope.selectMaterial = true;
            $scope.rateContractDetailList = RateContractDetailService.findByRateContractId({
                'rateContractId': $stateParams.rateContractId
            }, function (rateContractDetailList) {
                angular.forEach($scope.rateContractDetailList, function (rateContractDetailObject) {                    
                    if (rateContractDetailObject.finish !== null) {
                        rateContractDetailObject.finishObject = FinishPriceService.findByFinishCode({
                            'finishCode': rateContractDetailObject.finish
                        });
                    }
                });
            });
            $scope.saveRateContractDetail = function (rateContractDetail) {
                rateContractDetail.rateContractId = $stateParams.rateContractId;
                RateContractDetailService.save(rateContractDetail, function (rcdSavedObj) {
                    $scope.editableRateContractDetail = {};
                    $scope.refreshList();
                });
            };
            $scope.finishList = FinishPriceService.findAllList();
            $scope.materialList = RawMaterialService.findAllList();
            $scope.refreshList = function () {
                $scope.rateContractDetailList = RateContractDetailService.findByRateContractId({
                    'rateContractId': $stateParams.rateContractId
                }, function (rateContractDetailList) {
                    angular.forEach($scope.rateContractDetailList, function (rateContractDetailObject) {
                        if (rateContractDetailObject.finish !== null) {
                            rateContractDetailObject.finishObject = FinishPriceService.findByFinishCode({
                                'finishCode': rateContractDetailObject.finish
                            });
                        }
                    });
                });
            };
            $scope.$watch('editableRateContractDetail.finish', function (finishCode) {
                console.log("Detecting CHange??");
                console.log("FInish COde :%O", finishCode);
                if (finishCode === undefined) {
                    $scope.readonlyMaterial = false;
                    $scope.selectMaterial = true;
                } else if (finishCode === '') {
                    $scope.readonlyMaterial = false;
                    $scope.selectMaterial = true;
                } else {
                    $scope.readonlyMaterial = true;
                    $scope.selectMaterial = false;
                    FinishPriceService.findByFinishCode({
                        'finishCode': finishCode
                    }, function (finishObject) {
                        if (finishObject.category === "ALUMINIUM") {
                            $scope.editableRateContractDetail.material = "AL";
                        } else {
                            RawMaterialService.get({
                                'id': finishObject.materialId
                            }, function (materialObject) {
                                $scope.editableRateContractDetail.material = materialObject.materialCode;
                            });
                        }
                    });
                }

            });
//            $scope.materialList = RawMaterialService.findAllList();
//            $scope.editableParty = PartyService.get({'id': $stateParams.partyId});
//            $scope.deleteParty = function (party) {
//                console.log("Employee :%O", party);
//                party.$delete(function () {
//                    $state.go('admin.masters_party', null, {'reload': true});
//                });
//            };
        })
        .controller('RateContractDetailDeleteController', function (RateContractDetailService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableRateContractDetail = RateContractDetailService.get({'id': $stateParams.rateContractDetailId});
            $scope.deleteRateContractDetail = function (rateContractDetail) {
                console.log("RCD :%O", rateContractDetail);
                rateContractDetail.$delete(function () {
//                    $state.go('admin.masters_party', null, {'reload': true});
                    $state.go('admin.masters_rate_contract_detail', {
                        'rateContractId': rateContractDetail.rateContractId
                    }, {'reload': true});
                });
            };
        });


