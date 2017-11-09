/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.standard_carcass_dimesnion", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_standard_carcass_dimension', {
                'url': '/standard_carcass_dimension?offset',
                'templateUrl': templateRoot + '/masters/standard_carcass_dimension/list.html',
                'controller': 'StandardCarcassDimensionListController'
            });
            $stateProvider.state('admin.masters_standard_carcass_dimension.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/standard_carcass_dimension/form.html',
                'controller': 'StandardCarcassDimensionAddController'
            });
            $stateProvider.state('admin.masters_standard_carcass_dimension.edit', {
                'url': '/:stdCarcassDimensionId:/edit',
                'templateUrl': templateRoot + '/masters/standard_carcass_dimension/form.html',
                'controller': 'StandardCarcassDimensionEditController'
            });
            $stateProvider.state('admin.masters_standard_carcass_dimension.delete', {
                'url': '/:stdCarcassDimensionId:/delete',
                'templateUrl': templateRoot + '/masters/standard_carcass_dimension/delete.html',
                'controller': 'StandardCarcassDimensionDeleteController'
            });
        })

        .controller('StandardCarcassDimensionListController', function (StandardCarcassDimensionService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextStandardCarcassDimension= StandardCarcassDimensionService.query({
                'offset': $scope.nextOffset
            });

            $scope.standardCarcassDimensions = StandardCarcassDimensionService.query({
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
        .controller('StandardCarcassDimensionAddController', function (StandardCarcassDimensionService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableStdCarcassDimension = {};

            $scope.saveStdDimension = function (stdDimension) {
                console.log("Reason :", stdDimension);
                StandardCarcassDimensionService.save(stdDimension, function () {
                    $state.go('admin.masters_standard_carcass_dimension', null, {'reload': true});
                });
            };
           
        })
        .controller('StandardCarcassDimensionEditController', function (StandardCarcassDimensionService, $scope, $stateParams, $state, paginationLimit) {
            StandardCarcassDimensionService.get({'id': $stateParams.stdCarcassDimensionId});
            StandardCarcassDimensionService.get({
                'id': $stateParams.stdCarcassDimensionId
            }, function (stdDimensionData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableStdCarcassDimension = stdDimensionData;
            });
            
            $scope.saveStdDimension = function (stdCarcassDimension) {
                stdCarcassDimension.$save(function () {
                    $state.go('admin.masters_standard_carcass_dimension', null, {'reload': true});
                });
            };
        })
        .controller('StandardCarcassDimensionDeleteController', function (StandardCarcassDimensionService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableStdCarcassDimension = StandardCarcassDimensionService.get({'id': $stateParams.stdCarcassDimensionId});           
            $scope.deleteReason = function (stdCarcassDimension) {                
                stdCarcassDimension.$delete(function () {
                    $state.go('admin.masters_standard_carcass_dimension', null, {'reload': true});
                });
            };
        });


