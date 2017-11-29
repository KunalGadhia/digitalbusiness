/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.panel_material_thickness", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_panel_material_thickness', {
                'url': '/panel_material_thickness_master?offset',
                'templateUrl': templateRoot + '/masters/panel_material_thickness/list.html',
                'controller': 'PanelMaterialThicknessListController'
            });
            $stateProvider.state('admin.masters_panel_material_thickness.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/panel_material_thickness/form.html',
                'controller': 'PanelMaterialThicknessAddController'
            });
            $stateProvider.state('admin.masters_panel_material_thickness.edit', {
                'url': '/:panelMaterialThicknessId/edit',
                'templateUrl': templateRoot + '/masters/panel_material_thickness/form.html',
                'controller': 'PanelMaterialThicknessEditController'
            });
            $stateProvider.state('admin.masters_panel_material_thickness.delete', {
                'url': '/:panelMaterialThicknessId/delete',
                'templateUrl': templateRoot + '/masters/panel_material_thickness/delete.html',
                'controller': 'PanelMaterialThicknessDeleteController'
            });
        })

        .controller('PanelMaterialThicknessListController', function (PanelMaterialThicknessService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextPanelMaterialThicknessList = PanelMaterialThicknessService.query({
                'offset': $scope.nextOffset
            });

            $scope.panelMaterialThicknessList = PanelMaterialThicknessService.query({
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
        .controller('PanelMaterialThicknessAddController', function (RawMaterialService, PanelMaterialThicknessService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editablePanelMaterialThickness = {};

            $scope.savePanelMaterialThickness = function (panelMaterialThickness) {
                console.log("PMT :", panelMaterialThickness);
                PanelMaterialThicknessService.save(panelMaterialThickness, function () {
                    $state.go('admin.masters_panel_material_thickness', null, {'reload': true});
                });
            };

            $scope.materialList = RawMaterialService.query();

//            $scope.$watch('editableReason.reason', function (reason) {
//                console.log("Name :" + reason);
//                PanelMaterialThicknessService.findByReason({'reason': reason}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editablePanelMaterialThickness.repeatName = false;
//                    } else if (response.status === 404) {
//                        $scope.editablePanelMaterialThickness.repeatName = false;
//                    } else if (response.status === 400) {
//                        $scope.editablePanelMaterialThickness.repeatName = false;
//                    }
//                }).then(function (reason) {
//                    if (reason.username !== null) {
//                        $scope.editablePanelMaterialThickness.repeatName = true;
//                    }
//                    ;
//                });
//            });
        })
        .controller('PanelMaterialThicknessEditController', function (PanelMaterialThicknessService,RawMaterialService, $scope, $stateParams, $state, paginationLimit) {
            PanelMaterialThicknessService.get({'id': $stateParams.panelMaterialThicknessId});
            PanelMaterialThicknessService.get({
                'id': $stateParams.panelMaterialThicknessId
            }, function (panelMaterialThicknessData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editablePanelMaterialThickness = panelMaterialThicknessData;
            });
            $scope.materialList = RawMaterialService.query();

            $scope.savePanelMaterialThickness = function (panelMaterialThickness) {
                panelMaterialThickness.$save(function () {
                    $state.go('admin.masters_panel_material_thickness', null, {'reload': true});
                });
            };
        })
        .controller('PanelMaterialThicknessDeleteController', function (PanelMaterialThicknessService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editablePanelMaterialThickness = PanelMaterialThicknessService.get({'id': $stateParams.panelMaterialThicknessId});
            $scope.deletePanelMaterialThickness = function (panelMaterialThickness) {
                panelMaterialThickness.$delete(function () {
                    $state.go('admin.masters_panel_material_thickness', null, {'reload': true});
                });
            };
        });


