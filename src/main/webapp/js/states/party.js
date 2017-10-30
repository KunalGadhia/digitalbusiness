/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.party", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_party', {
                'url': '/party_master?offset',
                'templateUrl': templateRoot + '/masters/party/list.html',
                'controller': 'PartyListController'
            });
            $stateProvider.state('admin.masters_party.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/party/form.html',
                'controller': 'PartyAddController'
            });
            $stateProvider.state('admin.masters_party.edit', {
                'url': '/:partyId/edit',
                'templateUrl': templateRoot + '/masters/party/form.html',
                'controller': 'PartyEditController'
            });
            $stateProvider.state('admin.masters_party.delete', {
                'url': '/:partyId/delete',
                'templateUrl': templateRoot + '/masters/party/delete.html',
                'controller': 'PartyDeleteController'
            });
        })

        .controller('PartyListController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextParty = PartyService.query({
                'offset': $scope.nextOffset
            });

            $scope.parties = PartyService.query({
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
        .controller('PartyAddController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableParty = {};



            $scope.saveParty = function (party) {
                console.log("user", party);
                PartyService.save(party, function () {
                    $state.go('admin.masters_party', null, {'reload': true});
                });
            };

            $scope.$watch('editableParty.dealerName', function (name) {
                console.log("Name :" + name);
                PartyService.findByName({'name': name}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableParty.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableParty.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableParty.repeatName = false;
                    }
                }).then(function (party) {
                    if (party.username !== null) {
                        $scope.editableParty.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('PartyEditController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {
            PartyService.get({'id': $stateParams.partyId});
            PartyService.get({
                'id': $stateParams.partyId
            }, function (partyData) {
//                partyData.empMobileNumber = parseInt(partyData.empMobileNumber);
                $scope.editableParty = partyData;
            });
            $scope.saveParty = function (party) {
                party.$save(function () {
                    $state.go('admin.masters_party', null, {'reload': true});
                });
            };
        })
        .controller('PartyDeleteController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableParty = PartyService.get({'id': $stateParams.partyId});            
            $scope.deleteParty = function (party) {
                console.log("Employee :%O", party);
                party.$delete(function () {
                    $state.go('admin.masters_party', null, {'reload': true});
                });
            };
        });


