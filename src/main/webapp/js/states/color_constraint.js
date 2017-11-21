/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.color_constraint", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_color_constraint', {
                'url': '/color_constraint_master?offset',
                'templateUrl': templateRoot + '/masters/color_constraint/list.html',
                'controller': 'ColorConstraintListController'
            });
            $stateProvider.state('admin.masters_color_constraint.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/color_constraint/form.html',
                'controller': 'ColorConstraintAddController'
            });
            $stateProvider.state('admin.masters_color_constraint.edit', {
                'url': '/:colorConstraintId/edit',
                'templateUrl': templateRoot + '/masters/color_constraint/form.html',
                'controller': 'ColorConstraintEditController'
            });
//            $stateProvider.state('admin.masters_raw_material.delete', {
//                'url': '/:rawMaterialId/delete',
//                'templateUrl': templateRoot + '/masters/raw_material/delete.html',
//                'controller': 'RawMaterialDeleteController'
//            });            
        })
        .controller('ColorConstraintListController', function (ColorConstraintService, ColorService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextColorConstraints = ColorConstraintService.query({
                'offset': $scope.nextOffset
            });
            $scope.colorConstraints = ColorConstraintService.query({
                'offset': $scope.currentOffset
            }, function (colorConstraintList) {
                console.log("S :%O", colorConstraintList);
                angular.forEach($scope.colorConstraints, function (colorConstraint) {
                    colorConstraint.colorObjects = [];
                    angular.forEach(colorConstraint.colors, function (colorId) {
                        colorConstraint.colorObjects.push(
                                ColorService.get({
                                    'id': colorId
                                })
                                );
                    });
                });
//                $scope.colorConstraints = s;
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
        .controller('ColorConstraintAddController', function (ColorConstraintService, FinishPriceService, ColorService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableColorConstraint = {};
            $scope.colorDisplay = [];
            $scope.editableColorConstraint.colors = [];

            $scope.rawMaterialList = RawMaterialService.findAllList();
            $scope.finishList = FinishPriceService.findAllList();

            $scope.saveColorConstraint = function (colorConstraint) {
                ColorConstraintService.save(colorConstraint, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_color_constraint', null, {'reload': true});
                });
            };

            $scope.searchColors = function (colorString) {
                return ColorService.findByColorLike({
                    'color': colorString
                }).$promise;
            };
            $scope.setColor = function (color) {
                $scope.colorDisplay.push(color);
                $scope.colorName = "";
                $scope.editableColorConstraint.colors.push(color.id);
            };
            $scope.removeColors = function (colors) {
                console.log("Getting the thing :%O", colors);
                var index = $scope.colorDisplay.indexOf(colors);
                var index1 = $scope.editableColorConstraint.colors.indexOf(colors.id);
                $scope.colorDisplay.splice(index, 1);
                $scope.editableColorConstraint.colors.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.colorDisplay);
                console.log("Updated %O", $scope.editableColorConstraint.colors);
            };

        })
        .controller('ColorConstraintEditController', function (ColorConstraintService, FinishPriceService, ColorService, RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
            $scope.rawMaterialList = RawMaterialService.findAllList();
            $scope.finishList = FinishPriceService.findAllList();
            $scope.colorDisplay = [];
            $scope.editableColorConstraint = {};
            $scope.saveColorConstraint = function (colorConstraint) {
                colorConstraint.$save(function () {
                    $state.go('admin.masters_color_constraint', null, {'reload': true});
                });
            };
            ColorConstraintService.get({
                'id': $stateParams.colorConstraintId
            }, function (colorConstraint) {
                $scope.editableColorConstraint = colorConstraint;
                angular.forEach(colorConstraint.colors, function (color) {
                    $scope.colorDisplay.push(
                            ColorService.get({
                                'id': color
                            })
                            );

                });

            });
            $scope.searchColors = function (colorString) {
                return ColorService.findByColorLike({
                    'color': colorString
                }).$promise;
            };
            $scope.setColor = function (color) {
                $scope.colorDisplay.push(color);
                $scope.colorName = "";
                $scope.editableColorConstraint.colors.push(color.id);
            };
            $scope.removeColors = function (colors) {
                console.log("Getting the thing :%O", colors);
                var index = $scope.colorDisplay.indexOf(colors);
                var index1 = $scope.editableColorConstraint.colors.indexOf(colors.id);
                $scope.colorDisplay.splice(index, 1);
                $scope.editableColorConstraint.colors.splice(index1, 1);
                console.log("Updated Type Display :%O", $scope.colorDisplay);
                console.log("Updated %O", $scope.editableColorConstraint.colors);
            };
        });


