/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.order", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_order', {
                'url': '/order_master',
                'templateUrl': templateRoot + '/masters/order/order_head.html',
                'controller': 'OrderHeadController'
            });
            $stateProvider.state('admin.masters_order_details', {
                'url': '/:orderHeadId/order_details',
                'templateUrl': templateRoot + '/masters/order/order_details.html',
                'controller': 'OrderDetailsController'
            });
//            $stateProvider.state('admin.masters_sale_type.edit', {
//                'url': '/:saleTypeId/edit',
//                'templateUrl': templateRoot + '/masters/sale_type/form.html',
//                'controller': 'SaleTypeEditController'
//            });
//            $stateProvider.state('admin.masters_sale_type.delete', {
//                'url': '/:saleTypeId/delete',
//                'templateUrl': templateRoot + '/masters/sale_type/delete.html',
//                'controller': 'SaleTypeDeleteController'
//            });
        })

        .controller('OrderHeadController', function (OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, paginationLimit) {
            $scope.editableOrderHead = {};

            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.editableOrderHead.orderInitiatedBy = userObject.id;
                $scope.editableOrderHead.user = userObject;
            });

            SegmentService.findAllList(function (segmentList) {
                $scope.segmentList = segmentList;
            });
            SaleTypeService.findAllList(function (saleTypeList) {
                $scope.saleTypeList = saleTypeList;
            });

            $scope.setParty = function (party) {
                $scope.editableOrderHead.party = party;
                $scope.editableOrderHead.billingPartyId = party.id;
                $scope.editableOrderHead.party1 = party;
                $scope.editableOrderHead.deliveryPartyId = party.id;
            };
            $scope.setParty1 = function (party) {
                $scope.editableOrderHead.party1 = party;
                $scope.editableOrderHead.deliveryPartyId = party.id;
            };
            $scope.searchParty = function (searchTerm) {
                return PartyService.findByNameLike({
                    'name': searchTerm
                }).$promise;
            };
            $scope.setEmployee = function (employee) {
                $scope.editableOrderHead.marketingHead = employee.empCode;
            };
            $scope.searchEmployee = function (searchTerm) {
                return EmployeeService.findByNameLike({
                    'name': searchTerm
                }).$promise;
            };

            $scope.saveOrderHead = function (orderHead) {
                console.log("Order Head :%O", orderHead);
                OrderHeadService.save(orderHead, function (orderH) {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };


        })
        .controller('OrderDetailsController', function (RawMaterialService, OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, KitchenComponentService) {
            console.log("Inside Order Details Controller");
            console.log("State Params :%O", $stateParams);
            $scope.editableCarcassDetail = {};
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                console.log("Order Head :%O", orderHeadObject);
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (party) {
                    console.log("Party :%O", party);
                    $scope.party = party;
                });
                SegmentService.findBySegment({
                    'segment': orderHeadObject.segment
                }, function (segment) {
                    $scope.segment = segment;
                });
                var a = new Date(orderHeadObject.poDate);
                console.log("Date :%O", a);
                var factDespDate = moment(a).add(12, 'days');
                console.log("Facto Disp Date :%O", factDespDate);
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });

            /////////Select View//////////
            $scope.showCarcass = false;
            $scope.showPanel = false;
            $scope.showShutter = false;
            $scope.showDrawer = false;
            $scope.showFiller = false;
            $scope.showPelmet = false;
            $scope.showCornice = false;
            $scope.showHandle = false;

            $scope.selectView = function (view) {
                console.log("View :" + view);
                if (view === "CARCASS") {
                    $scope.showCarcass = true;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "PANEL") {
                    $scope.showCarcass = false;
                    $scope.showPanel = true;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "SHUTTER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = true;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "DRAWER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = true;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "FILLER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = true;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "PELMET") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = true;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                } else if (view === "CORNICE") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = true;
                    $scope.showHandle = false;
                } else if (view === "HANDLE") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = true;
                }
            };

            //////////Select Component Selection View///////////////
            $scope.showCarcassSelectionWidget = false;
            $scope.showPanelSelectionWidget = false;
            $scope.showShutterSelectionWidget = false;
            $scope.showDrawerSelectionWidget = false;
            $scope.showFillerSelectionWidget = false;
            $scope.showPelmetSelectionWidget = false;
            $scope.showCorniceSelectionWidget = false;
            $scope.showHandleSelectionWidget = false;
            
            $scope.closeWidget = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            
            $scope.openCarcass = function () {
                KitchenComponentService.findByCategory({
                    'category': 'CARCASE '
                }, function (carcaseList) {
                    console.log("Carcase List :%O", carcaseList);
                    $scope.carcaseList1 = carcaseList;
                });
                $scope.showCarcassSelectionWidget = true;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;

            };
            $scope.openPanel = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = true;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openShutter = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = true;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openDrawer = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = true;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openFiller = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = true;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openPelmet = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = true;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openCornice = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = true;
                $scope.showHandleSelectionWidget = false;
            };
            $scope.openHandle = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = true;
            };

            //////////////Carcass//////////////
            $scope.editableCarcassDetail = {};
            RawMaterialService.findAllList(function (rmList) {
                console.log("RM list :%O", rmList);
                $scope.rawMaterialsList = rmList;
            });
            $scope.selectCarcase = function (componentId) {
                console.log("This is component Id :%O", componentId);
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.editableCarcassDetail.component = kcObject.component;
                    $scope.editableCarcassDetail.kitchenComponent = kcObject;
                });
            };

        });
//        .controller('SaleTypeEditController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {
//            SaleTypeService.get({'id': $stateParams.saleTypeId});
//            SaleTypeService.get({
//                'id': $stateParams.saleTypeId
//            }, function (saleTypeData) {
//                $scope.editableSaleType = saleTypeData;
//            });
//
//            $scope.saveSaleType = function (saleType) {
//                saleType.$save(function () {
//                    $state.go('admin.masters_sale_type', null, {'reload': true});
//                });
//            };
//        })
//        .controller('SaleTypeDeleteController', function (SaleTypeService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableSaleType = SaleTypeService.get({'id': $stateParams.saleTypeId});
//            console.log("are we here?");
//            $scope.deleteSaleType = function (saleType) {
//                console.log("Segment :%O", saleType);
//                saleType.$delete(function () {
//                    $state.go('admin.masters_sale_type', null, {'reload': true});
//                });
//            };
//        });


