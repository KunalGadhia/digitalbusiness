/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.hardware", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_hardware', {
                'url': '/hardware_master?offset',
                'templateUrl': templateRoot + '/masters/hardware_price/list.html',
                'controller': 'HardwareListController'
            });
            $stateProvider.state('admin.masters_hardware.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/hardware_price/form.html',
                'controller': 'HardwareAddController'
            });
            $stateProvider.state('admin.masters_hardware.edit', {
                'url': '/:hardwareId/edit',
                'templateUrl': templateRoot + '/masters/hardware_price/form.html',
                'controller': 'HardwareEditController'
            });
            $stateProvider.state('admin.masters_hardware.delete', {
                'url': '/:hardwareId/delete',
                'templateUrl': templateRoot + '/masters/hardware_price/delete.html',
                'controller': 'HardwareDeleteController'
            });
        })

        .controller('HardwareListController', function (HardwarePriceService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextHardwareList = HardwarePriceService.query({
                'offset': $scope.nextOffset
            });

            $scope.hardwareList = HardwarePriceService.query({
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
        .controller('HardwareAddController', function (HardwarePriceService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableHardware = {};

            $scope.saveHardware = function (hardware) {
                HardwarePriceService.save(hardware, function () {
                    $state.go('admin.masters_hardware', null, {'reload': true});
                });
            };

            $scope.$watch('editableHardware.hardwareName', function (name) {
                HardwarePriceService.findByName({'name': name}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableHardware.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableHardware.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableHardware.repeatName = false;
                    }
                }).then(function (employee) {
                    if (employee.username !== null) {
                        $scope.editableHardware.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('HardwareEditController', function (HardwarePriceService, $scope, $stateParams, $state, paginationLimit) {
//            HardwarePriceService.get({'id': $stateParams.hardwareId});
            $scope.editableHardware = {};
            HardwarePriceService.get({
                'id': $stateParams.hardwareId
            }, function (hardwareData) {
                $scope.editableHardware = hardwareData;
            });
            $scope.saveHardware = function (hardware) {
                hardware.$save(function () {
                    $state.go('admin.masters_hardware', null, {'reload': true});
                });
            };
        })
        .controller('HardwareDeleteController', function (HardwarePriceService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableHardware = HardwarePriceService.get({'id': $stateParams.hardwareId});
            $scope.deleteHardware = function (hardware) {
                hardware.$delete(function () {
                    $state.go('admin.masters_hardware', null, {'reload': true});
                });
            };
        });


