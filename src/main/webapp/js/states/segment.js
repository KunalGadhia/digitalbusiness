/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.segment", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_segment', {
                'url': '/segment_master?offset',
                'templateUrl': templateRoot + '/masters/segment/list.html',
                'controller': 'SegmentListController'
            });
            $stateProvider.state('admin.masters_segment.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/segment/form.html',
                'controller': 'SegmentAddController'
            });
            $stateProvider.state('admin.masters_segment.edit', {
                'url': '/:segmentId/edit',
                'templateUrl': templateRoot + '/masters/segment/form.html',
                'controller': 'SegmentEditController'
            });
            $stateProvider.state('admin.masters_segment.delete', {
                'url': '/:segmentId/delete',
                'templateUrl': templateRoot + '/masters/segment/delete.html',
                'controller': 'SegmentDeleteController'
            });
        })

        .controller('SegmentListController', function (SegmentService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextSegments = SegmentService.query({
                'offset': $scope.nextOffset
            });

            $scope.segments = SegmentService.query({
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
        .controller('SegmentAddController', function (SegmentService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableSegment = {};



            $scope.saveSegment = function (segment) {
                console.log("user", segment);
                SegmentService.save(segment, function () {
                    $state.go('admin.masters_segment', null, {'reload': true});
                });
            };

            $scope.$watch('editableSegment.segment', function (segment) {
                console.log("Name :" + segment);
                SegmentService.findBySegment({'segment': segment}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableSegment.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableSegment.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableSegment.repeatName = false;
                    }
                }).then(function (segment) {
                    if (segment.username !== null) {
                        $scope.editableSegment.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('SegmentEditController', function (SegmentService, $scope, $stateParams, $state, paginationLimit) {
            SegmentService.get({'id': $stateParams.segmentId});
            SegmentService.get({
                'id': $stateParams.segmentId
            }, function (segmentData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableSegment = segmentData;
            });
            
            $scope.saveSegment = function (segment) {
                segment.$save(function () {
                    $state.go('admin.masters_segment', null, {'reload': true});
                });
            };
        })
        .controller('SegmentDeleteController', function (SegmentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableSegment = SegmentService.get({'id': $stateParams.segmentId});
            console.log("are we here?");
            $scope.deleteSegment = function (segment) {
                console.log("Segment :%O", segment);
                segment.$delete(function () {
                    $state.go('admin.masters_segment', null, {'reload': true});
                });
            };
        });


