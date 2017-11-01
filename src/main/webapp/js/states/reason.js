/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.reason", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_reason', {
                'url': '/reason_master?offset',
                'templateUrl': templateRoot + '/masters/reason/list.html',
                'controller': 'ReasonListController'
            });
            $stateProvider.state('admin.masters_reason.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/reason/form.html',
                'controller': 'ReasonAddController'
            });
            $stateProvider.state('admin.masters_reason.edit', {
                'url': '/:reasonId/edit',
                'templateUrl': templateRoot + '/masters/reason/form.html',
                'controller': 'ReasonEditController'
            });
            $stateProvider.state('admin.masters_reason.delete', {
                'url': '/:reasonId/delete',
                'templateUrl': templateRoot + '/masters/reason/delete.html',
                'controller': 'ReasonDeleteController'
            });
        })

        .controller('ReasonListController', function (ReasonService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextReasons= ReasonService.query({
                'offset': $scope.nextOffset
            });

            $scope.reasons = ReasonService.query({
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
        .controller('ReasonAddController', function (ReasonService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableReason = {};

            $scope.saveReason = function (reason) {
                console.log("Reason :", reason);
                ReasonService.save(reason, function () {
                    $state.go('admin.masters_reason', null, {'reload': true});
                });
            };

            $scope.$watch('editableReason.reason', function (reason) {
                console.log("Name :" + reason);
                ReasonService.findByReason({'reason': reason}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableReason.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableReason.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableReason.repeatName = false;
                    }
                }).then(function (reason) {
                    if (reason.username !== null) {
                        $scope.editableReason.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('ReasonEditController', function (ReasonService, $scope, $stateParams, $state, paginationLimit) {
            ReasonService.get({'id': $stateParams.reasonId});
            ReasonService.get({
                'id': $stateParams.reasonId
            }, function (reasonData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableReason = reasonData;
            });
            
            $scope.saveReason = function (reason) {
                reason.$save(function () {
                    $state.go('admin.masters_reason', null, {'reload': true});
                });
            };
        })
        .controller('ReasonDeleteController', function (ReasonService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableReason = ReasonService.get({'id': $stateParams.reasonId});           
            $scope.deleteReason = function (reason) {                
                reason.$delete(function () {
                    $state.go('admin.masters_reason', null, {'reload': true});
                });
            };
        });


