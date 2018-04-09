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
            $stateProvider.state('admin.masters_order_history', {
                'url': '/order_history',
                'templateUrl': templateRoot + '/masters/order/order_history.html',
                'controller': 'OrderHistoryController'
            });
            $stateProvider.state('admin.masters_order_details', {
                'url': '/:orderHeadId/order_details',
                'templateUrl': templateRoot + '/masters/order/order_details.html',
                'controller': 'OrderDetailsController'
            });
            $stateProvider.state('admin.masters_dealer_order_details', {
                'url': '/:orderHeadId/dealer_order_details',
                'templateUrl': templateRoot + '/masters/order/dealer_order_detail.html',
                'controller': 'DealerOrderDetailsController'
            });
            $stateProvider.state('proforma_invoice_display', {
                'url': '/:orderHeadId/proforma_invoice',
                'templateUrl': templateRoot + '/masters/order/proforma_invoice.html',
                'controller': 'ProformaInvoiceDisplayController'
            });
            $stateProvider.state('admin.masters_order_details.carcass_delete', {
                'url': '/:carcassDetailId/delete',
                'templateUrl': templateRoot + '/masters/order/carcass_detail_delete.html',
                'controller': 'CarcassDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.panel_delete', {
                'url': '/:panelDetailId/panel/delete',
                'templateUrl': templateRoot + '/masters/order/panel_detail_delete.html',
                'controller': 'PanelDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.filler_delete', {
                'url': '/:fillerDetailId/filler/delete',
                'templateUrl': templateRoot + '/masters/order/filler_detail_delete.html',
                'controller': 'FillerDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.pelmet_delete', {
                'url': '/:pelmetDetailId/pelmet/delete',
                'templateUrl': templateRoot + '/masters/order/pelmet_detail_delete.html',
                'controller': 'PelmetDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.cornice_delete', {
                'url': '/:corniceDetailId/cornice/delete',
                'templateUrl': templateRoot + '/masters/order/cornice_detail_delete.html',
                'controller': 'CorniceDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.handle_delete', {
                'url': '/:handleDetailId/handle/delete',
                'templateUrl': templateRoot + '/masters/order/handle_detail_delete.html',
                'controller': 'HandleDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.hardware_delete', {
                'url': '/:hardwareDetailId/hardware/delete',
                'templateUrl': templateRoot + '/masters/order/hardware_detail_delete.html',
                'controller': 'HardwareDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.shutter_delete', {
                'url': '/:shutterDetailId/shutter/delete',
                'templateUrl': templateRoot + '/masters/order/shutter_detail_delete.html',
                'controller': 'ShutterDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_details.drawer_delete', {
                'url': '/:drawerDetailId/drawer/delete',
                'templateUrl': templateRoot + '/masters/order/drawer_detail_delete.html',
                'controller': 'DrawerDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_history.order_approve', {
                'url': '/:orderHeadId/approve_order',
                'templateUrl': templateRoot + '/masters/order/order_approve.html',
                'controller': 'OrderApproveController'
            });
//            $stateProvider.state('admin.masters_sale_type.delete', {
//                'url': '/:saleTypeId/delete',
//                'templateUrl': templateRoot + '/masters/sale_type/delete.html',
//                'controller': 'SaleTypeDeleteController'
//            });
        })

        .controller('OrderHeadController', function (OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, paginationLimit) {
            $scope.editableOrderHead = {};
            $scope.adminPartyTypeAhead = false;
            $scope.dealerPartyDropdown = false;
            $scope.dealerPartyList = [];
            $scope.editableOrderHead.billType = "D";
            $scope.editableOrderHead.orderSubType = "N";
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                console.log("User Object :%O", userObject);
                if (userObject.role === "ROLE_ADMIN") {
                    console.log("Admin Login");
                    $scope.adminPartyTypeAhead = true;
                    $scope.dealerPartyDropdown = false;
                } else {
                    console.log("Dealer Login");
                    $scope.adminPartyTypeAhead = false;
                    $scope.dealerPartyDropdown = true;
                    angular.forEach(userObject.parties, function (partyId) {
                        PartyService.get({
                            'id': partyId
                        }, function (partyObject) {
                            $scope.dealerPartyList.push(partyObject);
                        });
                    });
                }
                $scope.editableOrderHead.orderInitiatedBy = userObject.id;
                $scope.editableOrderHead.user = userObject;
            });
            SegmentService.findAllList(function (segmentList) {
                $scope.segmentList = segmentList;
            });
            SaleTypeService.findAllList(function (saleTypeList) {
                $scope.saleTypeList = saleTypeList;
            });
            $scope.editableOrderHead.poDate = new Date();
            /////////////////New Thing///////////////////
            $scope.$watch('editableOrderHead.billingPartyId', function (billingPartyId) {
                $scope.editableOrderHead.deliveryPartyId = billingPartyId;
                PartyService.get({
                    'id': billingPartyId
                }, function (billingPartyObject) {
                    console.log("Billing Party Object :%O", billingPartyObject);
                    $scope.editableOrderHead.party = billingPartyObject;
                    $scope.editableOrderHead.party1 = billingPartyObject;
                    $scope.editableOrderHead.employee = EmployeeService.get({
                        'id': billingPartyObject.marketingHeadId
                    }, function (employee) {
                        $scope.editableOrderHead.marketingHead = employee.empCode;
                    });
                });
            });
            $scope.$watch('editableOrderHead.deliveryPartyId', function (deliveryPartyId) {
                PartyService.get({
                    'id': deliveryPartyId
                }, function (billingPartyObject) {
                    $scope.editableOrderHead.party1 = billingPartyObject;
                });
            });
            ////////////////////////////////////////////////

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
                OrderHeadService.save(orderHead, function (orderH) {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };
        })
        .controller('OrderDetailsController', function (HardwareOrderDetailsService, HardwarePriceService, RateContractDetailService, RateContractService, DrawerHandleMappingService, FillerFinishPriceService, DrawerOrderDetailsService, ShutterHandleMappingService, ShutterOrderDetailsService, ShutterFinishPriceService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, PanelMaterialThicknessService, RawMaterialService, CarcassSubtypeService, SectionProfileService, FinishPriceService, CarcassOrderDetailsService, ColorService, ColorConstraintService, StandardCarcassPriceService, StandardCarcassDimensionService, OrderDetailsService, OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, KitchenComponentService) {
            $scope.editableCarcassDetail = {};
            //////////////To Detect Category Of Current Logged In User//////////
            $scope.user = $rootScope.currentUser;
            $scope.adminLogin = false;
            $scope.dealerLogin = false;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminLogin = true;
                    $scope.dealerLogin = false;
                } else {
                    $scope.adminLogin = false;
                    $scope.dealerLogin = true;
                }
            });
            ///////////////////////////////////////
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (party) {
                    $scope.party = party;
                });
                SegmentService.findBySegment({
                    'segment': orderHeadObject.segment
                }, function (segment) {
                    $scope.segment = segment;
                });
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
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
            $scope.showHardware = false;
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
                    $scope.showHardware = false;
                } else if (view === "PANEL") {
                    $scope.showCarcass = false;
                    $scope.showPanel = true;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "SHUTTER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = true;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "DRAWER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = true;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "FILLER") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = true;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "PELMET") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = true;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "CORNICE") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = true;
                    $scope.showHandle = false;
                    $scope.showHardware = false;
                } else if (view === "HANDLE") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = true;
                    $scope.showHardware = false;
                } else if (view === "HARDWARE") {
                    $scope.showCarcass = false;
                    $scope.showPanel = false;
                    $scope.showShutter = false;
                    $scope.showDrawer = false;
                    $scope.showFiller = false;
                    $scope.showPelmet = false;
                    $scope.showCornice = false;
                    $scope.showHandle = false;
                    $scope.showHardware = true;
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
            $scope.showShutterHandleSelectionWidget = false;
            $scope.showPanelColorSelectionWidget = false;
            $scope.closeWidget = function () {
                $scope.showDrawerInternalColorSelectionWidget = false;
                $scope.showShutterInternalColorSelectionWidget = false;
                $scope.showCarcassSelectionWidget = false;
                $scope.showPanelSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.showDrawerSelectionWidget = false;
                $scope.showFillerSelectionWidget = false;
                $scope.showPelmetSelectionWidget = false;
                $scope.showCorniceSelectionWidget = false;
                $scope.showHandleSelectionWidget = false;
                $scope.showCarcassColorSelectionWidget = false;
                $scope.showPanelColorSelectionWidget = false;
                $scope.showFillerColorSelectionWidget = false;
                $scope.showShutterColorSelectionWidget = false;
                $scope.showCarcassSidesColorSelectionWidget = false;
                $scope.showPelmetColorSelectionWidget = false;
                $scope.showCorniceColorSelectionWidget = false;
                $scope.showShutterHandleSelectionWidget = false;
                $scope.showDrawerColorSelectionWidget = false;
                $scope.showDrawerHandleSelectionWidget = false;
                $scope.showFillerInternalColorSelectionWidget = false;
            };
            $scope.openCarcass = function () {
                KitchenComponentService.findByCategory({
                    'category': 'CARCASS '
                }, function (carcassList) {
                    console.log("Carcass List :%O", carcassList);
                    $scope.carcaseList1 = carcassList;
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
            KitchenComponentService.findByCategory({
                'category': 'PANEL '
            }, function (panelList) {
                console.log("Panel List :%O", panelList);
                $scope.panelList1 = panelList;
            });
            $scope.openPanel = function () {
                KitchenComponentService.findByCategory({
                    'category': 'PANEL '
                }, function (panelList) {
                    console.log("Panel List :%O", panelList);
                    $scope.panelList1 = panelList;
                });
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
                console.log("Getting Shutter FInish :%O", $scope.editableShutterDetail.finish);
                if ($scope.editableShutterDetail.finish === "XXA") {
                    console.log("Membrane Glossy MDF");
                    $scope.shutterList1 = [];
                    KitchenComponentService.get({
                        'id': 27
                    }, function (shutterObject) {
                        $scope.shutterList1 = [shutterObject];
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = true;
                    $scope.showDrawerSelectionWidget = false;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                } else if ($scope.editableShutterDetail.finish === "XXD") {
                    console.log("Membrane Glossy HDF");
                    $scope.shutterList1 = [];
                    KitchenComponentService.get({
                        'id': 27
                    }, function (shutterObject) {
                        $scope.shutterList1 = [shutterObject];
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = true;
                    $scope.showDrawerSelectionWidget = false;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                } else {
                    $scope.shutterList1 = [];
                    KitchenComponentService.findByCategory({
                        'category': 'SHUTTER '
                    }, function (shutterList) {
                        $scope.shutterList1 = shutterList;
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = true;
                    $scope.showDrawerSelectionWidget = false;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                }

            };
            $scope.openDrawer = function () {
                console.log("Drawer Finish :%O", $scope.editableDrawerDetail.finish);
                if ($scope.editableDrawerDetail.finish === "XXA") {
                    console.log("Membrane Glossy MDF");
                    $scope.drawerList1 = [];
                    KitchenComponentService.get({
                        'id': 57
                    }, function (drawerObject) {
                        $scope.drawerList1 = [drawerObject];
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = false;
                    $scope.showDrawerSelectionWidget = true;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                } else if ($scope.editableDrawerDetail.finish === "XXD") {
                    console.log("Membrane Glossy HDF");
                    $scope.drawerList1 = [];
                    KitchenComponentService.get({
                        'id': 57
                    }, function (drawerObject) {
                        $scope.drawerList1 = [drawerObject];
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = false;
                    $scope.showDrawerSelectionWidget = true;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                } else {
                    $scope.drawerList1 = [];
                    KitchenComponentService.findByCategory({
                        'category': 'DRAWER '
                    }, function (drawerList) {
                        $scope.drawerList1 = drawerList;
                    });
                    $scope.showCarcassSelectionWidget = false;
                    $scope.showPanelSelectionWidget = false;
                    $scope.showShutterSelectionWidget = false;
                    $scope.showDrawerSelectionWidget = true;
                    $scope.showFillerSelectionWidget = false;
                    $scope.showPelmetSelectionWidget = false;
                    $scope.showCorniceSelectionWidget = false;
                    $scope.showHandleSelectionWidget = false;
                }
//                KitchenComponentService.findByCategory({
//                    'category': 'DRAWER '
//                }, function (drawerList) {
//                    $scope.drawerList1 = drawerList;
//                });
//                $scope.showCarcassSelectionWidget = false;
//                $scope.showPanelSelectionWidget = false;
//                $scope.showShutterSelectionWidget = false;
//                $scope.showDrawerSelectionWidget = true;
//                $scope.showFillerSelectionWidget = false;
//                $scope.showPelmetSelectionWidget = false;
//                $scope.showCorniceSelectionWidget = false;
//                $scope.showHandleSelectionWidget = false;
            };
            KitchenComponentService.findByCategory({
                'category': 'FILLER'
            }, function (fillerList) {
                $scope.fillerList1 = fillerList;
            });
            $scope.openFiller = function () {
                KitchenComponentService.findByCategory({
                    'category': 'FILLER'
                }, function (fillerList) {
                    $scope.fillerList1 = fillerList;
                });
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
                KitchenComponentService.findByCategory({
                    'category': 'PELMET'
                }, function (pelmetList) {
                    $scope.pelmetList1 = pelmetList;
                });
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
                KitchenComponentService.findByCategory({
                    'category': 'CORNICE'
                }, function (corniceList) {
                    $scope.corniceList1 = corniceList;
                });
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
                KitchenComponentService.findByCategory({
                    'category': 'HANDLE'
                }, function (handleList) {
                    $scope.handleList1 = handleList;
                });
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
                $scope.rawMaterialsList = rmList;
            });
            $scope.selectCarcase = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.carcassName = kcObject.component;
                    $scope.carcassComponent = kcObject.componentCode;
                });
            };
            ////////////Carcass Ends///////////////
            //////////////Panel//////////////
            $scope.editablePanelDetail = {};
            $scope.selectPanel = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.panelName = kcObject.component;
                    $scope.panelComponent = kcObject.componentCode;
                });
            };
            ////////////Panel Ends///////////////
            //////////////Shutter//////////////
            $scope.editableShutterDetail = {};
            $scope.selectShutter = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.shutterName = kcObject.component;
                    $scope.shutterComponent = kcObject.componentCode;
                });
            };
            ////////////Shutter Ends///////////////
            //////////////Drawer//////////////
            $scope.editableDrawerDetail = {};
            $scope.selectDrawer = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.drawerName = kcObject.component;
                    $scope.drawerComponent = kcObject.componentCode;
                });
            };
            ////////////Drawer Ends///////////////
            //////////////Filler//////////////
            $scope.editableFillerDetail = {};
            $scope.selectFiller = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.fillerName = kcObject.component;
                    $scope.fillerComponent = kcObject.componentCode;
                });
            };
            ////////////Filler Ends///////////////
            //////////////Pelmet//////////////
            $scope.editablePelmetDetail = {};
            $scope.selectPelmet = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.pelmetName = kcObject.component;
                    $scope.pelmetComponent = kcObject.componentCode;
                });
            };
            ////////////Pelmet Ends///////////////
            //////////////Cornice//////////////
            $scope.editableCorniceDetail = {};
            $scope.selectCornice = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.corniceName = kcObject.component;
                    $scope.corniceComponent = kcObject.componentCode;
                });
            };
            ////////////Cornice Ends///////////////
            //////////////Handle//////////////
            $scope.editableHandleDetail = {};
            $scope.selectHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.handleName = kcObject.component;
                    $scope.handleComponent = kcObject.componentCode;
                });
            };
            $scope.selectShutterHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.shutterHandleName = kcObject.component;
                    $scope.shutterHandleComponent = kcObject.componentCode;
                });
            };
            ////////////Handle Ends///////////////
//            $scope.stdLengthList = [];
//            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
//                'dimensionAttribute': 'HEIGHT',
//                'carcassCategory': 'WC'
//            }, function (stdLength) {
//                angular.forEach(stdLength, function (std) {
//                    $scope.stdLengthList.push(std.stdValue);
//                });
//            });
//          //////////////////////////////
            $scope.wcLengthList = [];
            $scope.wcWidthList = [];
            $scope.wcDepthList = [];
            $scope.bcLengthList = [];
            $scope.bcWidthList = [];
            $scope.bcDepthList = [];
            $scope.tuLengthList = [];
            $scope.tuWidthList = [];
            $scope.tuDepthList = [];
            $scope.bbLengthList = [];
            $scope.bbWidthList = [];
            $scope.bbDepthList = [];
            ////////Wall Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcDepthList.push(std.stdValue);
                });
            });
            ////////BASE Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcDepthList.push(std.stdValue);
                });
            });
            ////////Tall Unit Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuDepthList.push(std.stdValue);
                });
            });
            ////////Base Blind Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbDepthList.push(std.stdValue);
                });
            });
            $scope.carcassGrainDirection = false;
            $scope.carcassLeftColor = false;
            $scope.carcassRightColor = false;
            $scope.carcassBackColor = false;
            $scope.carcassTopColor = false;
            $scope.carcassBottomColor = false;
            $scope.showSideMatching = false;
            $scope.OSM = false;
            $scope.OSM = false;
            $scope.BSM = false;
            $scope.TSM = false;
            $scope.ASM = false;
            $scope.FSM = false;
            ////////////////Carcass Form Functionality//////////////////////////////
            $scope.carcassStdList;
//            $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
//                'parentType': 'WC'
//            }, function (carcassSubTypeList) {
//                console.log("CSTL :%O", carcassSubTypeList);
//            });
            console.log("Carcass SUb Type List :%O", $scope.carcassSubTypeList);
            $scope.$watch('carcassName', function (carcassName) {
                $scope.typeLike;
                if (carcassName === "Wall Carcass") {
                    console.log("WC");
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'WC'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Wall";
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;
                    $scope.FSM = true;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = true;
//                    $scope.carcassBottomColor = true;
                    SectionProfileService.findByCarassType({
                        'carcassType': "WALL_CARCASS"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        $scope.carcassStdList = stdList;
                    });
                } else if (carcassName === "Base Carcass") {
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'BC'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Base";
//                    $scope.editableCarcassDetail.shelf = 1;
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    SectionProfileService.findByCarassType({
                        'carcassType': "BASE_CARCASS"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    $scope.tempArray = [];
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        angular.forEach(stdList, function (singleObject) {
                            $scope.tempArray.push(singleObject);
                        });
                        StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                            'carcassType': 'Sink'
                        }, function (stdSinkList) {
                            angular.forEach(stdSinkList, function (singleSinkObject) {
                                $scope.tempArray.push(singleSinkObject);
                            });
                        });
                        $scope.carcassStdList = $scope.tempArray;
                    });
                } else if (carcassName === "Tall Carcass") {
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'TU'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Tall";
//                    $scope.editableCarcassDetail.shelf = 5;
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    SectionProfileService.findByCarassType({
                        'carcassType': "TALL_UNIT"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        $scope.carcassStdList = stdList;
                    });
                } else if (carcassName === "Base-Blind Carcass") {
                    $scope.typeLike = "Base B";
                    $scope.showSideMatching = false;
//                    $scope.carcassLeftColor = false;
//                    $scope.carcassRightColor = false;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        $scope.carcassStdList = stdList;
                    });
                } else if (carcassName === "Sink Carcase") {
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                } else if (carcassName === "Microwave Carcase") {
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                }
                $scope.$watch('editableCarcassDetail.sideMatching', function (sideMatching) {
                    console.log("Side Matching :%O", sideMatching);
                    $scope.showOSM = false;
                    $scope.showBSM = false;
                    $scope.showTSM = false;
                    $scope.showOSMTop = false;
                    $scope.showOSMBottom = false;
                    $scope.showASM = false;
                    $scope.showFSM = false;
                    console.log("Carcass Name :%O", $scope.carcassName);
                    if ($scope.carcassName === "Base Carcass" || $scope.carcassName === "Sink Carcass" || $scope.carcassName === "Microwave Carcass") {
                        if (sideMatching === "O") {
                            $scope.showOSM = true;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = true;
                            $scope.showFSM = false;
                        } else if (sideMatching === "F") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = true;
                        } else {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
//                        $scope.showASM = false;
//                        $scope.editableCarcassDetail.leftColorId = "NULL";
//                        $scope.editableCarcassDetail.rightColorId = "NULL";
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        }
                    } else {
                        if (sideMatching === "O") {
                            $scope.showOSM = true;
                            $scope.showOSMTop = true;
                            $scope.showOSMBottom = true;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = true;
                            $scope.showFSM = false;
                        } else if (sideMatching === "F") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = true;
                        } else {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.leftColorId = "NULL";
//                        $scope.editableCarcassDetail.rightColorId = "NULL";
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        }
                    }

                });
                OrderHeadService.get({
                    'id': $stateParams.orderHeadId
                }, function (orderHeadObject) {
                    PartyService.get({
                        'id': orderHeadObject.billingPartyId
                    }, function (partyObject) {
                        $scope.editableCarcassDetail.rateContractId = partyObject.rateContractId;
                    });
                });
                $scope.$watch('editableCarcassDetail.sideSelection', function (selectedSide) {
                    console.log("Selected Side :%O", selectedSide);
                    if (selectedSide === "LSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "RSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "TSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "BSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "LRSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRTSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRBSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "ASM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "FSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = true;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = true;
                    } else {
                        $scope.carcassGrainDirection = false;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    }
                });
                $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                    console.log("Carcass Name :%O", $scope.carcassName);
                    if (shelfValue === true) {
//                        console.log("Type Like Default :%O", $scope.typeLike);
                        StandardCarcassPriceService.findCarcassWithShelfByCT({
                            'carcassType': $scope.typeLike
                        }, function (stdListRefined) {
                            $scope.carcassStdList = stdListRefined;
                        });
//                        $scope.editableCarcassDetail.shelf = '1';
                        if ($scope.carcassName === "Wall Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 1;
                        } else if ($scope.carcassName === "Base Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 1;
                        } else if ($scope.carcassName === "Tall Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 5;
                        }
                    } else if (shelfValue === false) {
                        console.log("Type Like :%O", $scope.typeLike);
                        if ($scope.typeLike === "Base") {
//                            $scope.tempArray = [];
                            StandardCarcassPriceService.findSinkCarcassWithoutShelfByCT({
                                'carcassType': 'Sink'
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });

                            $scope.editableCarcassDetail.shelfCount = 0;
                        } else {
                            StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                'carcassType': $scope.typeLike
                            }, function (stdListRefined) {
                                $scope.carcassStdList = stdListRefined;
                            });
                            $scope.editableCarcassDetail.shelfCount = 0;
                        }
                    }
                });
            });
//            $scope.sectionProfileList = SectionProfileService.query();
            $scope.$watch('editableCarcassDetail.sectionProfileId', function (sectionProfileId) {
                console.log("Section Profile Object :%O", sectionProfileId);
                SectionProfileService.get({
                    'id': sectionProfileId
                }, function (sectionProfileObject) {
                    $scope.editableCarcassDetail.sectionProfilePrice = sectionProfileObject.price;
                    $scope.editableCarcassDetail.sectionDirection = sectionProfileObject.direction;
                });
            });
            $scope.$watch('editableCarcassDetail.stdCarcassPriceId', function (stdCarcassId) {
                console.log("Std Carcass Id :%O", stdCarcassId);
                StandardCarcassPriceService.get({
                    'id': stdCarcassId
                }, function (stdCarcassObject) {
                    $scope.editableCarcassDetail.shelfCount = stdCarcassObject.shelf;
                    $scope.editableCarcassDetail.length = stdCarcassObject.length;
                    $scope.editableCarcassDetail.width = stdCarcassObject.width;
                    $scope.editableCarcassDetail.depth = stdCarcassObject.depth;
                });
            });
            $scope.$watch('editableCarcassDetail.material', function (material) {
                console.log("Material Object :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (rmObject) {
                    $scope.editableCarcassDetail.backPanelPrice = rmObject.backPanelPrice;
                });
//                $scope.editableCarcassDetail.stdMaterialObject = material;
                $scope.intColorName = "";
                $scope.editableCarcassDetail.intColorId = "";
                ColorConstraintService.findByMaterialCode({
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.sortedColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.sortedColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.sortedColorList1 = [];
                    }
                });
            });
            $scope.$watch('editableCarcassDetail.sideMaterial', function (sideMaterial) {
                console.log("Side Material :%O", sideMaterial);
                RawMaterialService.findByMaterialCode({
                    'materialCode': sideMaterial
                }, function (materialObject) {
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        $scope.finishesList = finishList;
                    });
                });
            });
            $scope.$watch('editableCarcassDetail.sideFinish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.completeColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.completeColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.completeColors1 = [];
                    } else if (response.status === 404) {
                        $scope.completeColors1 = [];
                    } else if (response.status === 400) {
                        $scope.completeColors1 = [];
                    }
                });
            });
//            $scope.completeColors1 = ColorService.findAllList();
            $scope.showCarcassColorSelectionWidget = false;
            $scope.showCarcassSidesColorSelectionWidget = false;
            $scope.openInternalCarcassColorWidget = function () {
                $scope.showCarcassColorSelectionWidget = true;
            };
            $scope.openSidesCarcassColorWidget = function (sideName) {
                $scope.sideName = sideName;
                console.log("Side Name :%O", $scope.sideName);
                $scope.showCarcassSidesColorSelectionWidget = true;
            };
            $scope.selectInternalCarcassColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCarcassDetail.intColorCode = colorCode;
                $scope.editableCarcassDetail.intColorId = colorId;
                $scope.intColorName = colorName;
            };
            $scope.selectSideCarcassColor = function (colorId, colorName, colorCode) {
                console.log("Getting Side Name in Select ?? :%O", $scope.sideName);
                var side = $scope.sideName;
                if (side === "Left") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.leftColorCode = colorCode;
                    $scope.editableCarcassDetail.leftColorId = colorId;
                    $scope.leftColorName = colorName;
                } else if (side === "Right") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.rightColorCode = colorCode;
                    $scope.editableCarcassDetail.rightColorId = colorId;
                    $scope.rightColorName = colorName;
                } else if (side === "Back") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.backColorCode = colorCode;
                    $scope.editableCarcassDetail.backColorId = colorId;
                    $scope.backColorName = colorName;
                } else if (side === "Top") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.topColorCode = colorCode;
                    $scope.editableCarcassDetail.topColorId = colorId;
                    $scope.topColorName = colorName;
                } else if (side === "Bottom") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.bottomColorCode = colorCode;
                    $scope.editableCarcassDetail.bottomColorId = colorId;
                    $scope.bottomColorName = colorName;
                }
            };
//            $scope.saveCarcassDetails = function (carcassDetails) {
//                console.log("This are carcass details :%O", carcassDetails);
//            };
            ///////////////////////////////////////////////////////////////////
            ////////////////////////Panel Form Functionality///////////////////
            $scope.showPanelColorSelectionWidget = false;
            $scope.openPanelColorWidget = function () {
                $scope.showPanelColorSelectionWidget = true;
            };
            $scope.selectPanelColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePanelDetail.colorCode = colorCode;
                $scope.editablePanelDetail.colorId = colorId;
                $scope.panelColorName = colorName;
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editablePanelDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editablePanelDetail.material', function (material) {
                console.log("Material :%O", material);
                $scope.panelColorName = "";
                $scope.editablePanelDetail.colorId = "";
                ColorConstraintService.findByMaterialCode({
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.sortedColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.sortedColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.sortedColorList1 = [];
                    }
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (panelThicknessObject) {
                    console.log("Panel Thickness Object :%O", panelThicknessObject);
                    $scope.panelThicknessList = panelThicknessObject;
                });
            });
            $scope.$watch('editablePanelDetail.thickness', function (thickness) {
                console.log("Material :%O", $scope.editablePanelDetail.material);
                console.log("Thickness :%O", thickness);
                var material = $scope.editablePanelDetail.material;
                PanelMaterialThicknessService.findByMaterialAndThickness({
                    'material': material,
                    'thickness': thickness
                }, function (panelThicknessPrice) {
                    $scope.editablePanelDetail.materialPrice = panelThicknessPrice.price;
                    console.log("Price :%O", $scope.editablePanelDetail.materialPrice);
                });
            });
            ///////////////////////////////////////////////////////////////////
            //////////////////////Filler Form Functionality////////////////////
            $scope.showFillerColorSelectionWidget = false;
            $scope.editableFillerDetail.bsm = false;
            $scope.showFillerInternalColorSelectionWidget = false;
            $scope.openFillerColorWidget = function () {
                $scope.showFillerColorSelectionWidget = true;
            };
            $scope.openInternalFillerColorWidget = function () {
                $scope.showFillerInternalColorSelectionWidget = true;
            };
            $scope.selectFillerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableFillerDetail.colorCode = colorCode;
                $scope.editableFillerDetail.colorId = colorId;
                $scope.fillerColorName = colorName;
            };
            $scope.selectInternalFillerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableFillerDetail.intColorCode = colorCode;
                $scope.editableFillerDetail.intColorId = colorId;
                $scope.fillerInternalColorName = colorName;
            };
            $scope.fillerFinishList = [];
//            $scope.shutterFinishList = FinishPriceService.findAllList();
            FillerFinishPriceService.findUniqueFinish(function (finishList) {
                console.log("Finish List :%O", finishList);
                angular.forEach(finishList, function (finishCode) {
                    FinishPriceService.findByFinishCode({
                        'finishCode': finishCode
                    }, function (finishObject) {
                        $scope.fillerFinishList.push(finishObject);
                    });
                });
                console.log("Filler Finish List :%O", $scope.fillerFinishList);
            });
            $scope.$watch('editableFillerDetail.material', function (material) {
                console.log("Side Material :%O", material);
                $scope.fillerInternalColorName = "";
                $scope.editableFillerDetail.intColorId = "";
                ColorConstraintService.findByMaterialCode({
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.fillerInternalColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.fillerInternalColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.fillerInternalColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.fillerInternalColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.fillerInternalColorList1 = [];
                    }
                });
            });
            $scope.showFillerBsm = false;
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableFillerDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableFillerDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                $scope.fillerFinishCode = finishName;
                FillerFinishPriceService.findByFinish({
                    'finish': finishName
                }, function (fillerFinishThicknessList) {
                    $scope.fillerThicknessList = fillerFinishThicknessList;
                });
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableFillerDetail.material = rmObject.materialCode;
                    });
//                    $scope.editableFillerDetail.finishPrice = finishObject.price;
                    if (finishObject.category === "PU" || finishObject.category === "MEMBRANE") {
                        $scope.showFillerBsm = true;
                    } else {
                        $scope.showFillerBsm = false;
                    }
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.fillerColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.fillerColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.fillerColors1 = [];
                    } else if (response.status === 404) {
                        $scope.fillerColors1 = [];
                    } else if (response.status === 400) {
                        $scope.fillerColors1 = [];
                    }
                });
            });
            $scope.$watch('editableFillerDetail.thickness', function (thickness) {
                console.log("Thickness :%O", thickness);
                if (thickness === '8') {
                    $scope.showFillerBsm = false;
                } else {
                    $scope.showFillerBsm = true;
                }
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.fillerFinishCode,
                    'thickness': thickness
                }, function (fillerFinishPrice) {
                    console.log("Filler Finish Price :%O", fillerFinishPrice);
                    $scope.editableFillerDetail.stdOneSidePrice = fillerFinishPrice.oneSidePrice;
                    $scope.editableFillerDetail.stdBothSidePrice = fillerFinishPrice.bothSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            /////////////////Pelmet Form Functionality/////////////////////////
            $scope.showPelmetColorSelectionWidget = false;
            $scope.openPelmetColorWidget = function () {
                $scope.showPelmetColorSelectionWidget = true;
            };
            $scope.selectPelmetColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePelmetDetail.colorCode = colorCode;
                $scope.editablePelmetDetail.colorId = colorId;
                $scope.pelmetColorName = colorName;
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editablePelmetDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editablePelmetDetail.material', function (material) {
                console.log("Side Material :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (materialObject) {
                    console.log("Material Object :%O", materialObject);
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        console.log("FInish List :%O", finishList);
                        $scope.pelmetFinishList = finishList;
                    });
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (pelmetThicknessObject) {
                    console.log("Pelmet Thickness Object :%O", pelmetThicknessObject);
                    $scope.pelmetThicknessList = pelmetThicknessObject;
                });
            });
            $scope.hidePelmetGlossy = false;
            $scope.$watch('pelmetComponent', function (pelmetComponent) {
                if (pelmetComponent === "PEL-PL1X") {
                    $scope.hidePelmetGlossy = true;
                } else {
                    $scope.hidePelmetGlossy = false;
                }
            });
//            $scope.showFillerBsm = false;
            $scope.$watch('editablePelmetDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
//                FinishPriceService.findByFinishCode({
//                    'finishCode': finishName
//                }, function (finishObject) {
//                    console.log("Finish Object :%O", finishObject);
//                    $scope.editablePelmetDetail.finishPrice = finishObject.price;
//                });
                $scope.pelmetFinishCode = finishName;
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.pelmetColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.pelmetColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.pelmetColors1 = [];
                    } else if (response.status === 404) {
                        $scope.pelmetColors1 = [];
                    } else if (response.status === 400) {
                        $scope.pelmetColors1 = [];
                    }
                });
            });
            $scope.$watch('editablePelmetDetail.thickness', function (pelmetThickness) {
                console.log("Pelmet THickness");
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.pelmetFinishCode,
                    'thickness': pelmetThickness
                }, function (sfpObject) {
                    console.log("SHutter Finis Price Object :%O", sfpObject);
                    $scope.editablePelmetDetail.finishPrice = sfpObject.oneSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            ///////////////////Cornice Form Functionality//////////////////////
            $scope.showCorniceColorSelectionWidget = false;
            $scope.openCorniceColorWidget = function () {
                $scope.showCorniceColorSelectionWidget = true;
            };
            $scope.selectCorniceColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCorniceDetail.colorCode = colorCode;
                $scope.editableCorniceDetail.colorId = colorId;
                $scope.corniceColorName = colorName;
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableCorniceDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableCorniceDetail.material', function (material) {
                console.log("Side Material :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (materialObject) {
                    console.log("Material Object :%O", materialObject);
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        console.log("FInish List :%O", finishList);
                        $scope.corniceFinishList = finishList;
                    });
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (corniceThicknessObject) {
                    console.log("Cornice Thickness Object :%O", corniceThicknessObject);
                    $scope.corniceThicknessList = corniceThicknessObject;
                });
            });
//            $scope.showFillerBsm = false;
            $scope.$watch('editableCorniceDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
//                FinishPriceService.findByFinishCode({
//                    'finishCode': finishName
//                }, function (finishObject) {
//                    console.log("Finish Object :%O", finishObject);
//                    $scope.editableCorniceDetail.finishPrice = finishObject.price;
//                });
                $scope.corniceFinishCode = finishName;
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.corniceColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.corniceColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.corniceColors1 = [];
                    } else if (response.status === 404) {
                        $scope.corniceColors1 = [];
                    } else if (response.status === 400) {
                        $scope.corniceColors1 = [];
                    }
                });
            });
            $scope.hideCorniceGlossy = false;
            $scope.$watch('corniceComponent', function (corniceComponent) {
                if (corniceComponent === "COR-CR1X") {
                    $scope.hideCorniceGlossy = true;
                } else if (corniceComponent === "COR-CR4X") {
                    $scope.hideCorniceGlossy = true;
                } else {
                    $scope.hideCorniceGlossy = false;
                }
            });
            $scope.$watch('editableCorniceDetail.thickness', function (corniceThickness) {
                console.log("Pelmet THickness");
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.corniceFinishCode,
                    'thickness': corniceThickness
                }, function (sfpObject) {
                    console.log("SHutter Finis Price Object :%O", sfpObject);
                    $scope.editableCorniceDetail.finishPrice = sfpObject.oneSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            //////////////////////Back Space Not Allowed Functionality/////////            
//            $scope.no_backspaces = function (event) {
//                console.log("Event :%O", event);
//                var backspace = 8;
//                if (event.keyCode === backspace) {
//                    event.preventDefault();
//                }
//            };
//            var getKeyboardEventResult = function (keyEvent, keyEventDesc)
//            {
//                return keyEventDesc + " (keyCode: " + (window.event ? keyEvent.keyCode : keyEvent.which) + ")";
//            };
//
//            // Event handlers
//            $scope.onKeyDown = function ($event) {
//                $scope.onKeyDownResult = getKeyboardEventResult($event, "Key down");
//                console.log("Key Down Result :%O", $scope.onKeyDownResult);
//                $scope.$watch('onKeyDownResult', function (keyDownResult) {
//                    console.log("Key Down Result :%O", keyDownResult);
//                });
//            };
            ///////////////////////////////////////////////////////////////////
            //////////////////Handle Form Functionality////////////////////////

            $scope.$watch('handleName', function (handle) {
                console.log("Handle :%O", handle);
                console.log("Handle Component :%O", $scope.handleComponent);
                $scope.showCD1 = false;
                $scope.showCD2 = false;
                if ($scope.handleComponent === "HAN-EP01") {
                    $scope.showCD2 = true;
                    $scope.showCD1 = false;
                    $scope.handlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.handleComponent
                    }, function (handlePriceList) {
                        console.log("Handle Price List :%O", handlePriceList);
                        angular.forEach(handlePriceList, function (hplObject) {
                            $scope.handlePriceList.push(hplObject);
                        });
                    });
                } else {
                    $scope.showCD2 = false;
                    $scope.showCD1 = true;
                    $scope.handlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.handleComponent
                    }, function (handlePriceList) {
                        console.log("Handle Price List :%O", handlePriceList);
                        angular.forEach(handlePriceList, function (hplObject) {
                            $scope.handlePriceList.push(hplObject);
                        });
                    });
                }
            });
            $scope.$watch('editableHandleDetail.length', function (cd) {
                console.log("CD :%O", cd);
                angular.forEach($scope.handlePriceList, function (handlePriceObject) {
                    console.log("Handle Price Object :%O", handlePriceObject.cd);
                    if (handlePriceObject.cd.toString() === cd.toString()) {
                        $scope.mainHandleObject = handlePriceObject;
                        console.log("Got the Object :%O", $scope.mainHandleObject);
                        $scope.editableHandleDetail.finish = $scope.mainHandleObject.finish;
                        $scope.editableHandleDetail.stdPrice = $scope.mainHandleObject.price;
                    } else {
                        console.log("Not My COncern ");
                    }

//                    if (handlePriceObject.cd.) {
//                        $scope.mainHandleObject = handlePriceObject;

//                    } else {
//                        console.log("Not My Concern");
//                    }
                });
            });
            $scope.$watch('editableHandleDetail.handleType', function (handleType) {
                HandlePriceService.get({
                    'id': handleType
                }, function (handlePriceObject) {
                    $scope.editableHandleDetail.finish = handlePriceObject.finish;
                    $scope.editableHandleDetail.stdPrice = handlePriceObject.price;
                });
            });
            ///////////////////////////////////////////////////////////////////
            ///////////////////////Shutter Form Functionality//////////////////
            $scope.showShutterColorSelectionWidget = false;
            $scope.showShutterHandleSelectionWidget = false;
            $scope.showShutterInternalColorSelectionWidget = false;
            $scope.editableShutterDetail.bsm = false;
            $scope.shutterModelSelection = false;
            $scope.openShutterColorWidget = function () {
                $scope.showShutterColorSelectionWidget = true;
            };
            $scope.openInternalShutterColorWidget = function () {
                $scope.showShutterInternalColorSelectionWidget = true;
            };
            $scope.selectInternalShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableShutterDetail.intColorCode = colorCode;
                $scope.editableShutterDetail.intColorId = colorId;
                console.log("Int COlor :%O", $scope.editableShutterDetail.intColorId);
                $scope.shutterInternalColorName = colorName;
            };
            $scope.shutterHandleList1 = [];
            $scope.openShutterHandle = function () {
                console.log("Finish in Handle Selection :%O", $scope.editableShutterDetail.finish);
                console.log("Shutter COmponent :%O", $scope.shutterComponent);
                if ($scope.shutterComponent !== undefined && $scope.shutterComponent !== '') {
//                if ($scope.editableShutterDetail.shutterComponent !== '' && $scope.editableShutterDetail.shutterComponent !== undefined) {
                    console.log("Component Available");
                    ShutterHandleMappingService.findByShutterCode({
                        'shutterCode': $scope.shutterComponent
                    }, function (mappingList) {
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                $scope.shutterHandleList1.push(kcObject);
                            });
                        });
                    });
                } else {
                    ShutterHandleMappingService.findByFinishCode({
                        'finishCode': $scope.editableShutterDetail.finish
                    }, function (mappingList) {
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                console.log("KC Object :%O", kcObject);
                                $scope.shutterHandleList1.push(kcObject);
                                console.log("Shutter Handloe List :%O", $scope.shutterHandleList1);
                            });
                        });
                    });
                }
//                if ($scope.editableShutterDetail.finish !== undefined) {
//                    ShutterHandleMappingService.findByFinishCode({
//                        'finishCode': $scope.editableShutterDetail.finish
//                    }, function (mappingList) {
//                        console.log("Mapping List :%O", mappingList);
//                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
//                            KitchenComponentService.get({
//                                'id': kitchenComponentId
//                            }, function (kcObject) {
//                                $scope.shutterHandleList1.push(kcObject);
//                            });
//                        });
//                    });
//                }
//                if($scope.editableShutterDetail.)
                $scope.showShutterHandleSelectionWidget = true;
            };
            $scope.selectShutterHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.shutterHandleName = kcObject.component;
                    $scope.shutterHandleComponent = kcObject.componentCode;
                    $scope.editableShutterDetail.handle = kcObject.componentCode;
                });
            };
            $scope.selectShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableShutterDetail.colorCode = colorCode;
                $scope.editableShutterDetail.colorId = colorId;
                $scope.shutterColorName = colorName;
            };
            $scope.shutterFinishList = [];
            $scope.$watch('editableShutterDetail.finishCategory', function (finishCategory) {
                console.log("Finish Category :%O", finishCategory);
                $scope.shutterFinishList = [];
                ShutterFinishPriceService.findUniqueFinishWithCategory({
                    'finishCategory': finishCategory
                }, function (finishList) {
                    console.log("Finish List :%O", finishList);
                    angular.forEach(finishList, function (finishCode) {
                        FinishPriceService.findByFinishCode({
                            'finishCode': finishCode
                        }, function (finishObject) {
                            $scope.shutterFinishList.push(finishObject);
                        });
                    });
                    console.log("Shutter Finish List :%O", $scope.shutterFinishList);
                });
//               ShutterFinishPriceService.findUniqueFinishWithCategory(function(finishList){
//                   console.log("Finish List :%O", finishList);
//                angular.forEach(finishList, function (finishCode) {
//                    FinishPriceService.findByFinishCode({
//                        'finishCode': finishCode
//                    }, function (finishObject) {
//                        $scope.shutterFinishList.push(finishObject);
//                    });
//                });
//                console.log("Shutter Finish List :%O", $scope.shutterFinishList);
//               });
            });
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableShutterDetail.rateContractId = partyObject.rateContractId;
                });
            });
//            $scope.shutterFinishList = FinishPriceService.findAllList();
//            ShutterFinishPriceService.findUniqueFinish(function (finishList) {
//                console.log("Finish List :%O", finishList);
//                angular.forEach(finishList, function (finishCode) {
//                    FinishPriceService.findByFinishCode({
//                        'finishCode': finishCode
//                    }, function (finishObject) {
//                        $scope.shutterFinishList.push(finishObject);
//                    });
//                });
//                console.log("Shutter Finish List :%O", $scope.shutterFinishList);
//            });
            $scope.$watch('editableShutterDetail.material', function (material) {
                console.log("Side Material :%O", material);
                $scope.shutterInternalColorName = "";
                $scope.editableShutterDetail.intColorId = "";
                ColorConstraintService.findByMaterialCode({
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.shutterInternalColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.shutterInternalColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.shutterInternalColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.shutterInternalColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.shutterInternalColorList1 = [];
                    }
                });
            });
            $scope.$watch('editableShutterDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                if (finishName === "XXW") {
                    $scope.alFinish = true;
                } else if (finishName === "XXX") {
                    $scope.alFinish = true;
                } else if (finishName === "XXY") {
                    $scope.alFinish = true;
                } else if (finishName === "XXZ") {
                    $scope.alFinish = true;
                } else if (finishName === "XAA") {
                    $scope.alFinish = true;
                } else {
                    $scope.alFinish = false;
                }
                $scope.shutterHandleList1 = [];
                $scope.shutterHandleName = '';
                $scope.editableShutterDetail.handleLength = '';
                $scope.editableShutterDetail.shutterHandleType = '';
                $scope.editableShutterDetail.handleFinish = '';
                $scope.editableShutterDetail.handleLength = '';
                $scope.editableShutterDetail.handlePrice = '';
                $scope.editableShutterDetail.handle = '';
                $scope.shutterFinishCode = finishName;
                ShutterFinishPriceService.findByFinish({
                    'finish': finishName
                }, function (shutterFinishThicknessList) {
                    $scope.shutterThicknessList = shutterFinishThicknessList;
                });
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (shutterMaterialObject) {
                        console.log("Shutter Material :%O", shutterMaterialObject);
                        $scope.shutterMaterialObject = shutterMaterialObject;
                        $scope.editableShutterDetail.material = shutterMaterialObject.materialCode;
                    });
//                    $scope.editableShutterDetail.finishPrice = finishObject.price;
                    if (finishObject.category === "PU" || finishObject.category === "MEMBRANE") {
                        $scope.showShutterBsm = true;
                    } else {
                        $scope.showShutterBsm = false;
                    }
                    if (finishObject.category === "MEMBRANE") {
                        console.log("Membrane Shutter");
                        if ($scope.editableShutterDetail.material === "MF") {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2350
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                        } else {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2350
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                        }

                        $scope.shutterModelSelection = true;
                    } else {
                        $("#shutterLength").attr({
                            'min': 50,
                            'max': 2350
                        });
                        $("#shutterWidth").attr({
                            'min': 50,
                            'max': 1100
                        });
                        $scope.shutterModelSelection = false;
                        $scope.showGlassStep = false;
                        $scope.editableShutterDetail.component = '';
                        $scope.shutterName = '';
                    }
                });
                $scope.showGlassStep = false;
                $scope.$watch('editableShutterDetail.glass', function (glassType) {
                    if (glassType === "REGULAR_GLASS") {
                        $scope.showGlassStep = true;
                    } else {
                        $scope.showGlassStep = false;
                    }
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.shutterColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.shutterColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.shutterColors1 = [];
                    } else if (response.status === 404) {
                        $scope.shutterColors1 = [];
                    } else if (response.status === 400) {
                        $scope.shutterColors1 = [];
                    }
                });
            });
            $scope.$watch('editableShutterDetail.thickness', function (thickness) {
                ShutterFinishPriceService.findByFinishThickness({
                    'finish': $scope.shutterFinishCode,
                    'thickness': thickness
                }, function (ShutterFinishPrice) {
                    console.log("Shutter Finish Price :%O", ShutterFinishPrice);
                    $scope.editableShutterDetail.stdOneSidePrice = ShutterFinishPrice.oneSidePrice;
                    $scope.editableShutterDetail.stdBothSidePrice = ShutterFinishPrice.bothSidePrice;
                });
            });
            $scope.$watch('shutterHandleName', function (handle) {
                console.log("Handle :%O", handle);
                console.log("Handle Component :%O", $scope.shutterHandleComponent);
                $scope.showShutterCD1 = false;
                $scope.showShutterCD2 = false;
                if ($scope.shutterHandleComponent === "HAN-EP01") {
                    $scope.showShutterCD2 = true;
                    $scope.showShutterCD1 = false;
                    $scope.shutterHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.shutterHandleComponent
                    }, function (shutterHandlePriceList) {
                        console.log("Handle Price List :%O", shutterHandlePriceList);
                        angular.forEach(shutterHandlePriceList, function (hplObject) {
                            $scope.shutterHandlePriceList.push(hplObject);
                        });
                    });
                } else {
                    $scope.showShutterCD2 = false;
                    $scope.showShutterCD1 = true;
                    $scope.shutterHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.shutterHandleComponent
                    }, function (shutterHandlePriceList) {
                        console.log("Handle Price List :%O", shutterHandlePriceList);
                        angular.forEach(shutterHandlePriceList, function (hplObject) {
                            $scope.shutterHandlePriceList.push(hplObject);
                        });
                    });
                }
            });
            $scope.$watch('editableShutterDetail.handleLength', function (cd) {
                console.log("CD :%O", cd);
                angular.forEach($scope.shutterHandlePriceList, function (handlePriceObject) {
                    console.log("Handle Price Object :%O", handlePriceObject.cd);
                    if (handlePriceObject.cd.toString() === cd.toString()) {
                        $scope.mainShutterHandleObject = handlePriceObject;
                        console.log("Got the Object :%O", $scope.mainShutterHandleObject);
                        $scope.editableShutterDetail.handleFinish = $scope.mainShutterHandleObject.finish;
                        $scope.editableShutterDetail.handlePrice = $scope.mainShutterHandleObject.price;
                    } else {
                        console.log("Not My COncern ");
                    }

//                    if (handlePriceObject.cd.) {
//                        $scope.mainHandleObject = handlePriceObject;

//                    } else {
//                        console.log("Not My Concern");
//                    }
                });
            });
            $scope.$watch('editableShutterDetail.shutterHandleType', function (handleType) {
                HandlePriceService.get({
                    'id': handleType
                }, function (handlePriceObject) {
                    $scope.editableShutterDetail.handleFinish = handlePriceObject.finish;
                    $scope.editableShutterDetail.handlePrice = handlePriceObject.price;
                });
            });
            $scope.showStraightener = false;
            $scope.editableShutterDetail.straightener = '0';
            $scope.$watch('editableShutterDetail.length', function (length) {
                console.log("Length CHanged :%O", length);
                if (length >= 1800) {
                    console.log("Length > 1800");
                    $scope.showStraightener = true;
                } else {
                    console.log("Length < 1800");
                    $scope.showStraightener = false;
                }
            });
//            $scope.editableShutterDetail.straightenerPrice = 0;
//            $scope.$watch('editableShutterDetail.straightener', function (straightener) {
//                console.log("No of straightener :%O", straightener);
//                if (straightener === 1) {
//                    $scope.editableShutterDetail.straightenerPrice = 1280;
//                } else if (straightener === 2) {
//                    $scope.editableShutterDetail.straightenerPrice = 2560;
//                }
//            });
            ///////////////////////////////////////////////////////////////////
            ///////////////////////Drawer Form Functionality///////////////////
            $scope.showDrawerColorSelectionWidget = false;
            $scope.showDrawerHandleSelectionWidget = false;
            $scope.showDrawerInternalColorSelectionWidget = false;
            $scope.drawerModelSelection = false;
            $scope.editableDrawerDetail.bsm = false;
            $scope.openInternalDrawerColorWidget = function () {
                $scope.showDrawerInternalColorSelectionWidget = true;
            };
            $scope.selectInternalDrawerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableDrawerDetail.intColorCode = colorCode;
                $scope.editableDrawerDetail.intColorId = colorId;
                console.log("Int COlor :%O", $scope.editableDrawerDetail.intColorId);
                $scope.drawerInternalColorName = colorName;
            };
            $scope.openDrawerColorWidget = function () {
                $scope.showDrawerColorSelectionWidget = true;
            };
            $scope.openDrawerHandle = function () {
                console.log("Drawer COmponent :%O", $scope.drawerComponent);
                if ($scope.drawerComponent !== undefined && $scope.drawerComponent !== '') {
//                if ($scope.editableShutterDetail.shutterComponent !== '' && $scope.editableShutterDetail.shutterComponent !== undefined) {
                    $scope.drawerHandleList1 = [];
                    console.log("Component Available");
                    DrawerHandleMappingService.findByDrawerCode({
                        'drawerCode': $scope.drawerComponent
                    }, function (mappingList) {
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                $scope.drawerHandleList1.push(kcObject);
                            });
                        });
                    });
                } else {
                    ShutterHandleMappingService.findByFinishCode({
                        'finishCode': $scope.editableDrawerDetail.finish
                    }, function (mappingList) {
                        $scope.drawerHandleList1 = [];
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                $scope.drawerHandleList1.push(kcObject);
                            });
                        });
                    });
                }
//                KitchenComponentService.findByCategory({
//                    'category': 'HANDLE'
//                }, function (handleList) {
//                    $scope.drawerHandleList1 = handleList;
//                });
                $scope.showDrawerHandleSelectionWidget = true;
            };
            $scope.selectDrawerHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.drawerHandleName = kcObject.component;
                    $scope.drawerHandleComponent = kcObject.componentCode;
                    $scope.editableDrawerDetail.handle = kcObject.componentCode;
                });
            };
            $scope.selectDrawerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                console.log("Color Name :%O", colorName);
                $scope.closeWidget();
                $scope.editableDrawerDetail.colorCode = colorCode;
                $scope.editableDrawerDetail.colorId = colorId;
                $scope.drawerColorName = colorName;
                console.log("Drawer COlor Name :%O", $scope.drawerColorName);
            };
            $scope.drawerFinishList = [];
            $scope.$watch('editableDrawerDetail.finishCategory', function (finishCategory) {
                console.log("Finish Category :%O", finishCategory);
                $scope.drawerFinishList = [];
                ShutterFinishPriceService.findUniqueFinishWithCategory({
                    'finishCategory': finishCategory
                }, function (finishList) {
                    console.log("Finish List :%O", finishList);
                    angular.forEach(finishList, function (finishCode) {
                        FinishPriceService.findByFinishCode({
                            'finishCode': finishCode
                        }, function (finishObject) {
                            $scope.drawerFinishList.push(finishObject);
                        });
                    });
                    console.log("Drawer Finish List :%O", $scope.drawerFinishList);
                });
            });
//            $scope.shutterFinishList = FinishPriceService.findAllList();
//            ShutterFinishPriceService.findUniqueFinish(function (finishList) {
//                console.log("Finish List :%O", finishList);
//                angular.forEach(finishList, function (finishCode) {
//                    FinishPriceService.findByFinishCode({
//                        'finishCode': finishCode
//                    }, function (finishObject) {
//                        $scope.drawerFinishList.push(finishObject);
//                    });
//                });
//                console.log("Shutter Finish List :%O", $scope.drawerFinishList);
//            });
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableDrawerDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableDrawerDetail.material', function (material) {
                console.log("Side Material :%O", material);
                $scope.shutterInternalColorName = "";
                $scope.editableDrawerDetail.intColorId = "";
                ColorConstraintService.findByMaterialCode({
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.drawerInternalColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.drawerInternalColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.drawerInternalColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.drawerInternalColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.drawerInternalColorList1 = [];
                    }
                });
            });
            $scope.$watch('editableDrawerDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                $scope.drawerHandleList1 = [];
//                $scope.drawerHandlePriceList = [];
//                $scope.drawerHandleName = '';
//                $scope.editableDrawerDetail.handleLength = 'NULL';
//                $scope.editableDrawerDetail.drawerHandleType = 'NULL';
//                $scope.editableDrawerDetail.handleFinish = 'NULL';
//                $scope.editableDrawerDetail.handleLength = 'NULL';
//                $scope.editableDrawerDetail.handlePrice = 'NULL';
//                $scope.editableDrawerDetail.handle = 'NULL';
                $scope.drawerFinishCode = finishName;
                ShutterFinishPriceService.findByFinish({
                    'finish': finishName
                }, function (shutterFinishThicknessList) {
                    $scope.drawerThicknessList = shutterFinishThicknessList;
                });
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (drawerMaterialObject) {
                        console.log("Shutter Material :%O", drawerMaterialObject);
                        $scope.drawerMaterialObject = drawerMaterialObject;
                        $scope.editableDrawerDetail.material = drawerMaterialObject.materialCode;
                    });
//                    $scope.editableShutterDetail.finishPrice = finishObject.price;
//                    if (finishObject.category === "PU" || finishObject.category === "MEMBRANE") {
//                        $scope.showShutterBsm = true;
//                    } else {
//                        $scope.showShutterBsm = false;
//                    }
                    if (finishObject.category === "MEMBRANE") {
                        $scope.drawerModelSelection = true;
                    } else {
                        $scope.drawerModelSelection = false;
                        $scope.editableDrawerDetail.component = '';
                        $scope.shutterName = '';
                    }
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.drawerColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.drawerColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.drawerColors1 = [];
                    } else if (response.status === 404) {
                        $scope.drawerColors1 = [];
                    } else if (response.status === 400) {
                        $scope.drawerColors1 = [];
                    }
                });
            });
            $scope.$watch('editableDrawerDetail.thickness', function (thickness) {
                ShutterFinishPriceService.findByFinishThickness({
                    'finish': $scope.drawerFinishCode,
                    'thickness': thickness
                }, function (ShutterFinishPrice) {
                    console.log("Shutter Finish Price :%O", ShutterFinishPrice);
                    $scope.editableDrawerDetail.stdOneSidePrice = ShutterFinishPrice.oneSidePrice;
//                    $scope.editableDrawerDetail.stdBothSidePrice = ShutterFinishPrice.bothSidePrice;
                });
            });
            $scope.$watch('drawerHandleName', function (handle) {
                console.log("Handle :%O", handle);
                console.log("Handle Component :%O", $scope.drawerHandleComponent);
                $scope.showDrawerCD1 = false;
                $scope.showDrawerCD2 = false;
                if ($scope.drawerHandleComponent === "HAN-EP01") {
                    $scope.showDrawerCD2 = true;
                    $scope.showDrawerCD1 = false;
                    $scope.drawerHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.drawerHandleComponent
                    }, function (drawerHandlePriceList) {
                        console.log("Handle Price List :%O", drawerHandlePriceList);
                        angular.forEach(drawerHandlePriceList, function (hplObject) {
                            $scope.drawerHandlePriceList.push(hplObject);
                        });
                    });
                } else {
                    $scope.showDrawerCD2 = false;
                    $scope.showDrawerCD1 = true;
                    $scope.drawerHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.drawerHandleComponent
                    }, function (drawerHandlePriceList) {
                        console.log("Handle Price List :%O", drawerHandlePriceList);
                        angular.forEach(drawerHandlePriceList, function (hplObject) {
                            $scope.drawerHandlePriceList.push(hplObject);
                        });
                    });
                }
            });
            $scope.$watch('editableDrawerDetail.handleLength', function (cd) {
                console.log("CD :%O", cd);
                angular.forEach($scope.drawerHandlePriceList, function (handlePriceObject) {
                    console.log("Handle Price Object :%O", handlePriceObject.cd);
                    if (handlePriceObject.cd.toString() === cd.toString()) {
                        $scope.mainDrawerHandleObject = handlePriceObject;
                        console.log("Got the Object :%O", $scope.mainDrawerHandleObject);
                        $scope.editableDrawerDetail.handleFinish = $scope.mainDrawerHandleObject.finish;
                        $scope.editableDrawerDetail.handlePrice = $scope.mainDrawerHandleObject.price;
                    } else {
                        console.log("Not My COncern ");
                    }

//                    if (handlePriceObject.cd.) {
//                        $scope.mainHandleObject = handlePriceObject;

//                    } else {
//                        console.log("Not My Concern");
//                    }
                });
            });
            $scope.$watch('editableDrawerDetail.drawerHandleType', function (handleType) {
                HandlePriceService.get({
                    'id': handleType
                }, function (handlePriceObject) {
                    $scope.editableDrawerDetail.handleFinish = handlePriceObject.finish;
                    $scope.editableDrawerDetail.handlePrice = handlePriceObject.price;
                });
            });
            ///////////////////////////////////////////////////////////////////
            /////////////////////Hardware Form Functionality///////////////////
            $scope.editableHardwareDetail = {};
            $scope.hardwareList = HardwarePriceService.findAllList();
            $scope.$watch('editableHardwareDetail.hardwareId', function (hardwareId) {
                console.log("Hardware Id :%O", hardwareId);
                HardwarePriceService.get({
                    'id': hardwareId
                }, function (hardwareObject) {
                    $scope.editableHardwareDetail.productCode = hardwareObject.productCode;
                    $scope.editableHardwareDetail.hardwareName = hardwareObject.hardwareName;
                    $scope.editableHardwareDetail.stdPrice = hardwareObject.price;
                });
            });
            $scope.saveHardwareDetails = function (hardwareOrderDetails) {
                hardwareOrderDetails.orderHeadId = $stateParams.orderHeadId;
                hardwareOrderDetails.price = (hardwareOrderDetails.quantity * hardwareOrderDetails.stdPrice);
                console.log("Hardware Order Details :%O", hardwareOrderDetails);
                HardwareOrderDetailsService.save(hardwareOrderDetails, function () {
                    console.log("Saved Successfully");
                    $scope.editableHardwareDetail = "";
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };
            /////////////////////Hardware Form Functionality End///////////////

            function closestValue(num, arr) {
                var curr = arr[0];
                var diff = Math.abs(num - curr);
                for (var val = 0; val < arr.length; val++) {
                    var newdiff = Math.abs(num - arr[val]);
                    if (newdiff < diff) {
                        diff = newdiff;
                        curr = arr[val];
                    }
                }
                return curr;
//                }
            }

            ////////////Standard Carcass Validation////////////////
            $scope.validateCarcass = function (orderDetail) {
                console.log("Order Detail :%O", orderDetail);
                orderDetail.component = $scope.carcassComponent;
                var len;
                var wid;
                var dep;
                var l;
                var w;
                var d;
                var nonStandard;
                var lengthGreaterThan100 = function (inputNo) {
                    console.log("Length Greater Than 1000");
                    l = inputNo.toString().slice(0, 3);
                    console.log(" L :%O", l);
                };
                var widthGreaterThan100 = function (inputNo) {
                    w = inputNo.toString().slice(0, 3);
                };
                var depthGreaterThan100 = function (inputNo) {
                    d = inputNo.toString().slice(0, 3);
                };
                if (orderDetail.component === "WC") {
                    console.log("Wall Carcass ");
                    len = closestValue(orderDetail.length, $scope.wcLengthList);
                    wid = closestValue(orderDetail.width, $scope.wcWidthList);
                    dep = closestValue(orderDetail.depth, $scope.wcDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }

                } else if (orderDetail.component === "BC") {
                    console.log("Base Carcass");
                    len = closestValue(orderDetail.length, $scope.bcLengthList);
                    wid = closestValue(orderDetail.width, $scope.bcWidthList);
                    dep = closestValue(orderDetail.depth, $scope.bcDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }

                } else if (orderDetail.component === "TU") {
                    console.log("Tall Unit");
                    len = closestValue(orderDetail.length, $scope.tuLengthList);
                    wid = closestValue(orderDetail.width, $scope.tuWidthList);
                    dep = closestValue(orderDetail.depth, $scope.tuDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }
                } else if (orderDetail.component === "BB") {
                    console.log("Base Blind :%O", orderDetail);
                    len = closestValue(orderDetail.length, $scope.bbLengthList);
                    wid = closestValue(orderDetail.width, $scope.bbWidthList);
                    dep = closestValue(orderDetail.depth, $scope.bbDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }
                }
                ;
                if (orderDetail.length !== len) {
                    nonStandard = true;
                } else if (orderDetail.width !== wid) {
                    nonStandard = true;
                } else if (orderDetail.depth !== dep) {
                    nonStandard = true;
                } else {
                    nonStandard = false;
                }

                console.log("What is LLLLL :%O", l);
                console.log("What is WWWWW :%O", w);
                console.log("What is DDDDD :%O", d);
                console.log("Non STandard :%O", nonStandard);
                orderDetail.l = l;
                orderDetail.w = w;
                orderDetail.d = d;
                orderDetail.nonStandardDimension = nonStandard;
                console.log("Side Selection :%O", orderDetail.sideSelection);
                if (orderDetail.stdCarcassPriceId !== undefined) {
                    $scope.standardCarcassObject = StandardCarcassPriceService.get({
                        'id': orderDetail.stdCarcassPriceId
                    }, function (stdPriceObject) {
                        if (orderDetail.material === "PB") {
                            orderDetail.standardPrice = stdPriceObject.pbPrice;
                        } else if (orderDetail.material === "MF") {
                            orderDetail.standardPrice = stdPriceObject.mdfPrice;
                        } else if (orderDetail.material === "HF") {
                            orderDetail.standardPrice = stdPriceObject.hdfPrice;
                        } else if (orderDetail.material === "BW") {
                            orderDetail.standardPrice = stdPriceObject.plyPrice;
                        }
                    });
                }
//                $scope.standardCarcassObject.$promise.then(function (stdCarcassObject) {
//                console.log("stdCarcassObject :%O", stdCarcassObject);
                console.log("Order Detail :%O", orderDetail);
                if (orderDetail.sideSelection === undefined) {
                    console.log("Regular");
                    $scope.stdMaterialObject1 = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    if (orderDetail.stdCarcassPriceId !== undefined) {
                        $scope.standardCarcassObject.$promise.then(function (stdCarcassObject) {
                            $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                                console.log("Resolved For Regular :%O", resolvedStdData);
                                orderDetail.stdMaterialPrice = resolvedStdData.price;
                                console.log("Final Order Detail :%O", orderDetail);
                                $scope.saveOrderDetail(orderDetail);
                            });
                        });
                    } else {
                        $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                            console.log("Resolved For Regular :%O", resolvedStdData);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                            console.log("Final Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                        });
                    }
//                    $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
//                        console.log("Resolved For Regular :%O", resolvedStdData);
//                        orderDetail.stdMaterialPrice = resolvedStdData.price;
//                        console.log("Final Order Detail :%O", orderDetail);
//                        $scope.saveOrderDetail(orderDetail);
//                    });
                } else if (orderDetail.sideSelection !== undefined) {
                    console.log("Non Regular");
                    $scope.stdMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    $scope.finishObject = FinishPriceService.findByFinishCode({
                        'finishCode': orderDetail.sideFinish
                    });
                    if (orderDetail.stdCarcassPriceId !== undefined) {
                        $scope.standardCarcassObject.$promise.then(function (stdCarcassObject) {
                            $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
                                console.log("resolvedSTdData :%O", resolvedStdData.price);
                                $scope.finishObject.$promise.then(function (resolvedFinishData) {
                                    console.log("resolved FInish Data :%O", resolvedFinishData.price);
                                    orderDetail.stdMaterialPrice = resolvedStdData.price;
                                    orderDetail.finishPrice = resolvedFinishData.price;
                                    console.log("This is Order Detail :%O", orderDetail);
                                    $scope.saveOrderDetail(orderDetail);
                                });
                            });
                        });
                    } else {
                        $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
                            console.log("resolvedSTdData :%O", resolvedStdData.price);
                            $scope.finishObject.$promise.then(function (resolvedFinishData) {
                                console.log("resolved FInish Data :%O", resolvedFinishData.price);
                                orderDetail.stdMaterialPrice = resolvedStdData.price;
                                orderDetail.finishPrice = resolvedFinishData.price;
                                console.log("This is Order Detail :%O", orderDetail);
                                $scope.saveOrderDetail(orderDetail);
                            });
                        });
                    }
                    ////////////////Promises Once Resolved will be sent to save object////////////////
//                    $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
//                        console.log("resolvedSTdData :%O", resolvedStdData.price);
//                        $scope.finishObject.$promise.then(function (resolvedFinishData) {
//                            console.log("resolved FInish Data :%O", resolvedFinishData.price);
//                            orderDetail.stdMaterialPrice = resolvedStdData.price;
//                            orderDetail.finishPrice = resolvedFinishData.price;
//                            console.log("This is Order Detail :%O", orderDetail);
//                            $scope.saveOrderDetail(orderDetail);
//                        });
//                    });
                }
//                });

//                if (orderDetail.sideSelection === undefined) {
//                    console.log("Regular");
//                    $scope.stdMaterialObject1 = RawMaterialService.findByMaterialCode({
//                        'materialCode': orderDetail.material
//                    });
//                    $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
//                        console.log("Resolved For Regular :%O", resolvedStdData);
//                        orderDetail.stdMaterialPrice = resolvedStdData.price;
//                        console.log("Final Order Detail :%O", orderDetail);
//                        $scope.saveOrderDetail(orderDetail);
//                    });
//                } else if (orderDetail.sideSelection !== undefined) {
//                    console.log("Non Regular");
//                    $scope.stdMaterialObject = RawMaterialService.findByMaterialCode({
//                        'materialCode': orderDetail.material
//                    });
//                    $scope.finishObject = FinishPriceService.findByFinishCode({
//                        'finishCode': orderDetail.sideFinish
//                    });
//                    ////////////////Promises Once Resolved will be sent to save object////////////////
//                    $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
//                        console.log("resolvedSTdData :%O", resolvedStdData.price);
//                        $scope.finishObject.$promise.then(function (resolvedFinishData) {
//                            console.log("resolved FInish Data :%O", resolvedFinishData.price);
//                            orderDetail.stdMaterialPrice = resolvedStdData.price;
//                            orderDetail.finishPrice = resolvedFinishData.price;
//                            console.log("This is Order Detail :%O", orderDetail);
//                            $scope.saveOrderDetail(orderDetail);
//                        });
//                    });
//                }

            }
            ;
            //////////////Save Functions for All Components/////////////
            $scope.saveOrderDetail = function (orderDetail) {
                console.log("Save Order Detail :%O", orderDetail);
                orderDetail.component = $scope.carcassComponent;
                var l1;
//                var l;
//                var w;
                var w1;
//                var d;
                var d1;
                orderDetail.orderHeadId = $stateParams.orderHeadId;
//                ////////Process Length////////////

                if (orderDetail.length < 1000) {
                    l1 = 0 + orderDetail.length.toString();
                } else {
                    l1 = orderDetail.length.toString();
                }
                if (orderDetail.width < 1000) {
                    w1 = 0 + orderDetail.width.toString();
                } else {
                    w1 = orderDetail.width.toString();
                }
                if (orderDetail.depth <= 0) {
                    d1 = "000";
                } else {
                    d1 = orderDetail.depth.toString();
                }
//                $scope.generateProductCode = 
//                var productCode = orderDetail.component + "" + orderDetail.w + "" + orderDetail.l + "" + orderDetail.d + "18" + orderDetail.material + "-" + l1 + "" + w1 + "18" + d1;
//                orderDetail.productCode = productCode;
//                console.log("Product Code :%O", productCode);

                var totalArea = 0;
                var basicArea = 0;
                var basicSqMt = 0;
                var extraArea = 0;
                var extraSqMt = 0;
                var shelfArea = 0;
                var shelfSqMt = 0;
                var backArea = 0;
                var backSqMt = 0;
                var profileArea = 0;
//                var basicAreaPrice = 0;
//                var extraAreaPrice = 0;
                if (orderDetail.nonStandardDimension === false) {
                    console.log("Standard Dimesion");
                    if (orderDetail.sideMatching === "O") {
                        console.log("OSM Carcass");
                        if (orderDetail.sideSelection === "LSM" || orderDetail.sideSelection === "RSM") {
                            var p1 = (orderDetail.depth * orderDetail.length);
                            var p2 = (2 * (orderDetail.width * orderDetail.depth));
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p1;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            backSqMt = backArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            if (orderDetail.shelf === true) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== undefined) {
//                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////                            
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Price :%O", backAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.unitPrice);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p2;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            if (orderDetail.shelf === true) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                console.log("Shelf Count :%O", orderDetail.shelfCount);
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf :%O", shelfPrice);
                            console.log("Back Area Price :%O", backAreaPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.unitPrice);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        console.log("Both Matching Carcass");
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1;
                        extraArea = p3;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Hardware Price :%O", hardwarePrice)
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);
                        basicArea = p1;
                        extraArea = p3 + p4;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "A") {
                        console.log("All Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1;
                        extraArea = p2 + p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.backPanelPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
//                        var backAreaPrice = ()
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("Baisc Area Price :%O", basicAreaPrice);
                        console.log("Profile Baisc Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.unitPrice);
                    } else {
                        console.log("Regular");
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        totalArea = basicSqMt;
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXX-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        console.log("Total Area Regular :%O", totalArea);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Standard Price :%O", orderDetail.standardPrice);
                        console.log("Quantity :%O", orderDetail.quantity);
                        orderDetail.unitPrice = ((orderDetail.standardPrice + profilePrice) * orderDetail.quantity);
//                        StandardCarcassPriceService.get({
//                            'id': orderDetail.stdCarcassPriceId
//                        }, function (stdPriceObject) {
//                            console.log("Std Price Object :%O", stdPriceObject);
//                            if (orderDetail.material === "PB") {
//                                console.log("PB Price");
////                                var singleQuantityPrice = totalArea * stdPriceObject.pbPrice;
//                                var singleQuantityPrice = stdPriceObject.pbPrice;
//                                orderDetail.price = orderDetail.quantity * singleQuantityPrice;
//
//                            } else if (orderDetail.material === "MF") {
//                                console.log("MDF Price");
////                                var singleQuantityPrice = totalArea * stdPriceObject.mdfPrice;
//                                var singleQuantityPrice = stdPriceObject.mdfPrice;
//                                orderDetail.price = orderDetail.quantity * singleQuantityPrice;
//
//                            } else if (orderDetail.material === "HF") {
//                                console.log("HDF Price");
////                                var singleQuantityPrice = totalArea * stdPriceObject.hdfPrice;
//                                var singleQuantityPrice = stdPriceObject.hdfPrice;
//                                orderDetail.price = orderDetail.quantity * singleQuantityPrice;
//
//                            } else if (orderDetail.material === "BW") {
//                                console.log("PLY Price");
////                                var singleQuantityPrice = totalArea * stdPriceObject.plyPrice;
//                                var singleQuantityPrice = stdPriceObject.plyPrice;
//                                orderDetail.price = orderDetail.quantity * singleQuantityPrice;
//                            }
//                        });
                    }

                } else if (orderDetail.nonStandardDimension === true) {
                    console.log("Non Standard Dimesion");
                    if (orderDetail.sideMatching === "O") {
                        console.log("OSM Carcass");
                        if (orderDetail.sideSelection === "LSM" || orderDetail.sideSelection === "RSM") {
                            var p1 = (orderDetail.depth * orderDetail.length);
                            var p2 = (2 * (orderDetail.width * orderDetail.depth));
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p1;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            if (orderDetail.shelf === true) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
//                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Panel Price :%O", backAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.unitPrice);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p2;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            if (orderDetail.shelf === true) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
//                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Area Price :%O", backAreaPrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.unitPrice);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        console.log("Both Matching Carcass");
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1;
                        extraArea = p3;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Area Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);
                        basicArea = p1;
                        extraArea = p3 + p4;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Area Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "A") {
                        console.log("All Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1;
                        extraArea = p2 + p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.backPanelPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("Baisc Area Price :%O", basicAreaPrice);
                        console.log("Profile Baisc Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.unitPrice);
                    } else {
                        console.log("Regular");
                        console.log("Order Details :%O", orderDetail);
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2;
                        backArea = p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt;
                        if (orderDetail.shelf === true) {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                        } else {
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXX-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        console.log("Std Material Price :%O", orderDetail.stdMaterialPrice);
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Area Price :%O", basicAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("Back Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        var finalPrice = ((profilePrice + basicAreaPrice + backAreaPrice + shelfPrice + hardwarePrice) * orderDetail.quantity);
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area Regular :%O", totalArea);
                        console.log("Total Price Regular :%O", orderDetail.unitPrice);
                    }
                } else {
                    alert("Some Exception Happening, Please try again.");
                }
                console.log("Main Order Detail :%O", orderDetail);
//                if (orderDetail.sideMatching === "O") {
//                    console.log("OSM");
//                    if (orderDetail.sideSelection === "LSM") {
//                        console.log("Width :%O", orderDetail.width);
//                        console.log("Height :%O", orderDetail.length);
//                        console.log("Depth :%O", orderDetail.depth);
//
//                        var p1 = orderDetail.width * orderDetail.length;
//                        var p2 = orderDetail.depth * orderDetail.length;
//                        var p3 = 2 * (orderDetail.width * orderDetail.depth);
//                        console.log("P1 :" + p1);
//                        console.log("P2 :" + p2);
//                        console.log("P3 :" + p3);
//                        basicArea = p1 + p2 + p3;
//                        basicSqMt = basicArea / 1000000;
//                        extraArea = orderDetail.depth * orderDetail.length;
//                        extraSqMt = extraArea / 1000000;
//                        totalArea = basicSqMt + extraSqMt;
//                        console.log("Basic Sq Mt :%O", basicSqMt);
//                        console.log("Extra Sq Mt :%O", extraSqMt);
//                        console.log("Total Area : :%O", totalArea);
//
//                    } else if (orderDetail.sideSelection === "RSM") {
//                        var p1 = orderDetail.width * orderDetail.length;
//                        var p2 = orderDetail.depth * orderDetail.length;
//                        var p3 = 2 * (orderDetail.width * orderDetail.depth);
//                        console.log("P1 :" + p1);
//                        console.log("P2 :" + p2);
//                        console.log("P3 :" + p3);
//                        basicArea = p1 + p2 + p3;
//                        basicSqMt = basicArea / 1000000;
//                        extraArea = orderDetail.depth * orderDetail.length;
//                        extraSqMt = extraArea / 1000000;
//                        totalArea = basicSqMt + extraSqMt;
//                        console.log("Basic Sq Mt :%O", basicSqMt);
//                        console.log("Extra Sq Mt :%O", extraSqMt);
//                        console.log("Total Area : :%O", totalArea);
//                    } else if (orderDetail.sideSelection === "TSM") {
//                        var p1 = orderDetail.width * orderDetail.length;
//                        var p2 = 2 * (orderDetail.depth * orderDetail.length);
//                        var p3 = orderDetail.width * orderDetail.depth;
//                        console.log("P1 :" + p1);
//                        console.log("P2 :" + p2);
//                        console.log("P3 :" + p3);
//                        basicArea = p1 + p2 + p3;
//                        basicSqMt = basicArea / 1000000;
//                        extraArea = orderDetail.width * orderDetail.depth;
//                        extraSqMt = extraArea / 1000000;
//                        totalArea = basicSqMt + extraSqMt;
//                        console.log("Basic Sq Mt :%O", basicSqMt);
//                        console.log("Extra Sq Mt :%O", extraSqMt);
//                        console.log("Total Area : :%O", totalArea);
//                    } else if (orderDetail.sideSelection === "BSM") {
//                        var p1 = orderDetail.width * orderDetail.length;
//                        var p2 = 2 * (orderDetail.depth * orderDetail.length);
//                        var p3 = orderDetail.width * orderDetail.depth;
//                        console.log("P1 :" + p1);
//                        console.log("P2 :" + p2);
//                        console.log("P3 :" + p3);
//                        basicArea = p1 + p2 + p3;
//                        basicSqMt = basicArea / 1000000;
//                        extraArea = orderDetail.width * orderDetail.depth;
//                        extraSqMt = extraArea / 1000000;
//                        totalArea = basicSqMt + extraSqMt;
//                        console.log("Basic Sq Mt :%O", basicSqMt);
//                        console.log("Extra Sq Mt :%O", extraSqMt);
//                        console.log("Total Area : :%O", totalArea);
//                    }
//                } else if (orderDetail.sideMatching === "B") {
//                    console.log("BSM");
//                    var p1 = orderDetail.width * orderDetail.length;
//                    var p2 = 2 * (orderDetail.depth * orderDetail.width);
//                    basicArea = p1 + p2;
//                    extraArea = 2 * (orderDetail.depth * orderDetail.length);
//                    basicSqMt = basicArea / 1000000;
//                    extraSqMt = extraArea / 1000000;
//                    totalArea = basicSqMt + extraSqMt;
//                    console.log("Area :%O", totalArea);
//                } else if (orderDetail.sideMatching === "T") {
//                    console.log("TSM");
//                }
//                if()
//                OrderDetailsService.save(orderDetail, function () {
//                    $scope.editableCarcassDetail = "";

//                    $scope.refreshList();
//                });                
                $scope.applyCarcassDiscount = function (orderDetail) {
                    RateContractDetailService.findByCarcassMaterialThickness({
                        'material': orderDetail.material,
                        'thickness': 18,
                        'rateContractId': orderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        orderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((orderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        orderDetail.price = (orderDetail.unitPrice - discountPrice);
                        CarcassOrderDetailsService.save(orderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editableCarcassDetail = "";
                            $scope.carcassName = "";
                            $scope.intColorName = "";
                            $scope.leftColorName = "";
                            $scope.rightColorName = "";
                            $scope.backColorName = "";
                            $scope.topColorName = "";
                            $scope.bottomColorName = "";
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                console.log("FInal Save :%O", orderDetail);
                $scope.applyCarcassDiscount(orderDetail);
//                CarcassOrderDetailsService.save(orderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableCarcassDetail = "";
//                    $scope.carcassName = "";
//                    $scope.intColorName = "";
//                    $scope.leftColorName = "";
//                    $scope.rightColorName = "";
//                    $scope.backColorName = "";
//                    $scope.topColorName = "";
//                    $scope.bottomColorName = "";
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
            };
            $scope.savePanelDetails = function (panelOrderDetail) {
//                panelOrderDetail.component = $scope.panelComponent;
                $scope.applyPanelDiscount = function (panelOrderDetail) {
                    RateContractDetailService.findByPanelMaterialThickness({
                        'material': panelOrderDetail.material,
                        'thickness': panelOrderDetail.thickness,
                        'rateContractId': panelOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        panelOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((panelOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        panelOrderDetail.price = (panelOrderDetail.unitPrice - discountPrice);
                        console.log("Panle Order Detail Save Object :%O", panelOrderDetail);
                        PanelOrderDetailsService.save(panelOrderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editablePanelDetail = "";
                            $scope.panelName = "";
//                    $scope.refreshList();
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                panelOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (panelOrderDetail.length < 1000) {
                    if (panelOrderDetail.length < 100) {
                        lengthLessThan100(panelOrderDetail.length);
                    } else {
                        l1 = 0 + panelOrderDetail.length.toString();
                    }
                } else {
                    l1 = panelOrderDetail.length.toString();
                }
                if (panelOrderDetail.width < 1000) {
                    if (panelOrderDetail.width < 100) {
                        widthLessThan100(panelOrderDetail.width);
                    } else {
                        w1 = 0 + panelOrderDetail.width.toString();
                    }
                } else {
                    w1 = panelOrderDetail.width.toString();
                }

                var productCode = panelOrderDetail.component + "" + Math.round(panelOrderDetail.thickness) + "" + panelOrderDetail.material + "XXXX-" + l1 + "" + w1 + "" + Math.round(panelOrderDetail.thickness) + "000";
                panelOrderDetail.productCode = productCode;
                panelOrderDetail.orderHeadId = $stateParams.orderHeadId;
                var basicArea = (panelOrderDetail.width * panelOrderDetail.length);
                var basicAreaSqMt = basicArea / 1000000;
                panelOrderDetail.unitPrice = (panelOrderDetail.quantity * (basicAreaSqMt * panelOrderDetail.materialPrice));
                console.log("Panel Details :%O", panelOrderDetail);
                $scope.applyPanelDiscount(panelOrderDetail);
//                PanelOrderDetailsService.save(panelOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editablePanelDetail = "";
//                    $scope.panelName = "";
////                    $scope.refreshList();
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
            };
            $scope.saveShutterDetails = function (shutterOrderDetail) {
                $scope.applyShutterDiscount = function (shutterOrderDetail, handlePrice, jaliPrice, straightenerPrice) {
                    console.log("Handle Price :%O", handlePrice);
                    console.log("Jali Price :%O", jaliPrice);
                    console.log("Straightener Price :%O", straightenerPrice);

                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': shutterOrderDetail.finish,
                        'material': shutterOrderDetail.material,
                        'thickness': shutterOrderDetail.thickness,
                        'rateContractId': shutterOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        shutterOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((shutterOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        console.log("Discount Price :%O", discountPrice);
                        shutterOrderDetail.price = ((shutterOrderDetail.unitPrice - discountPrice) + handlePrice + jaliPrice + straightenerPrice);
                        ShutterOrderDetailsService.save(shutterOrderDetail, function () {
                            $scope.editableShutterDetail = "";
                            $scope.shutterName = "";
                            $scope.shutterColorName = "";
                            $scope.shutterHandleName = "";
//                    $scope.refreshList();
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                if (shutterOrderDetail.handle === "") {
                    shutterOrderDetail.handle = null;
                    shutterOrderDetail.handleFinish = null;
                    shutterOrderDetail.handleLength = null;
                }
                shutterOrderDetail.orderHeadId = $stateParams.orderHeadId;
                shutterOrderDetail.component = $scope.shutterComponent;
                shutterOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (shutterOrderDetail.length < 1000) {
                    if (shutterOrderDetail.length < 100) {
                        lengthLessThan100(shutterOrderDetail.length);
                    } else {
                        l1 = 0 + shutterOrderDetail.length.toString();
                    }
                } else {
                    l1 = shutterOrderDetail.length.toString();
                }
                if (shutterOrderDetail.width < 1000) {
                    if (shutterOrderDetail.width < 100) {
                        widthLessThan100(shutterOrderDetail.width);
                    } else {
                        w1 = 0 + shutterOrderDetail.width.toString();
                    }
                } else {
                    w1 = shutterOrderDetail.width.toString();
                }
                if (shutterOrderDetail.component !== undefined) {
                    console.log("Shutter Order Detail Glass :%O", shutterOrderDetail.glass);
                    if (shutterOrderDetail.glass !== "NO_GLASS") {
                        if (shutterOrderDetail.glass === undefined) {
                            console.log("Without Glass");
                            if (shutterOrderDetail.bsm === true) {
                                console.log("Without Glass with BSM");
                                var productCode = shutterOrderDetail.component + "BX" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            } else {
                                console.log("Without without BSM");
                                var productCode = shutterOrderDetail.component + "XX" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            }
                        } else {
                            console.log("With Glass");
                            if (shutterOrderDetail.bsm === true) {
                                console.log("Glass with BSM");
                                var productCode = shutterOrderDetail.component + "BG" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            } else {
                                console.log("Glass without BSM");
                                var productCode = shutterOrderDetail.component + "XG" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            }
                        }
                    } else {
                        console.log("Without Glass");
                        if (shutterOrderDetail.bsm === true) {
                            console.log("Without Glass with BSM");
                            var productCode = shutterOrderDetail.component + "BX" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        } else {
                            console.log("Without without BSM");
                            var productCode = shutterOrderDetail.component + "XX" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        }
                    }
                } else if (shutterOrderDetail.material === undefined) {
                    var productCode = "SHUTTERX" + Math.round(shutterOrderDetail.thickness) + "XXX" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                } else {
                    if (shutterOrderDetail.bsm === true) {
                        var productCode = "SHUTTERB" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                    } else {
                        var productCode = "SHUTTERX" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                    }
                }
                var shutterArea = (shutterOrderDetail.length * shutterOrderDetail.width);
                var shutterAreaSqMt = (shutterArea / 1000000);
                var shutterRunningMeter = ((2 * shutterOrderDetail.length) + (2 * shutterOrderDetail.width));
                var shutterMt = (shutterRunningMeter / 1000);
                console.log("Shutter Area Sq Mt :%O", shutterAreaSqMt);
                console.log("Shutter Running Mt :%O", shutterMt);
                if (shutterOrderDetail.grain === "") {
                    shutterOrderDetail.grain = "NO_GRAIN";
                }
                if (shutterOrderDetail.hingePosition === "") {
                    shutterOrderDetail.hingePosition = "NO_HINGE";
                }
                if (shutterOrderDetail.handle === "HAN-EP01") {
                    var meterLength = (shutterOrderDetail.handleLength / 1000);
                    shutterOrderDetail.handleMainPrice = (meterLength * shutterOrderDetail.handlePrice);
                } else {
                    shutterOrderDetail.handleMainPrice = shutterOrderDetail.handlePrice;
                }

                if (shutterOrderDetail.handle === undefined) {
                    shutterOrderDetail.handleMainPrice = 0;
                }
                if (shutterOrderDetail.handle === null) {
                    shutterOrderDetail.handleMainPrice = 0;
                }
                if (shutterOrderDetail.jali === true) {
                    shutterOrderDetail.jaliPrice = 206;
                } else {
                    shutterOrderDetail.jaliPrice = 0;
                }

                if (shutterOrderDetail.straightener === '1') {
                    shutterOrderDetail.straightenerPrice = 945;
                    console.log("1 Straightener");
                } else if (shutterOrderDetail.straightener === '2') {
                    shutterOrderDetail.straightenerPrice = 1890;
                    console.log("2 Straightener");
                } else {
                    console.log("No Straightener");
                    shutterOrderDetail.straightenerPrice = 0;
                }
                console.log("Jali Price :%O", shutterOrderDetail.jaliPrice);
                console.log("Handle Price :%O", shutterOrderDetail.handleMainPrice);
                console.log("Shtraightener Price :%O", shutterOrderDetail.straightenerPrice);
                if (shutterOrderDetail.finish === "XXW") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXX") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXY") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXZ") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XAA") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice) + 168));
                } else {
                    console.log("Else Loop Non Al");
                    if (shutterOrderDetail.bsm === true) {
                        console.log("Both Side");
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdBothSidePrice) + shutterOrderDetail.handleMainPrice + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdBothSidePrice) + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdBothSidePrice));
                    } else if (shutterOrderDetail.bsm === false) {
                        console.log("One Side");
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice) + shutterOrderDetail.handleMainPrice + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice) + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice));
                    } else if (shutterOrderDetail.bsm === undefined) {
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice) + shutterOrderDetail.handleMainPrice + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));                        
//                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice) + shutterOrderDetail.jaliPrice + shutterOrderDetail.straightenerPrice));
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice));
                    }
                }

                shutterOrderDetail.productCode = productCode;
                var handlePrice = (shutterOrderDetail.quantity * shutterOrderDetail.handleMainPrice);
                var jaliPrice = (shutterOrderDetail.quantity * shutterOrderDetail.jaliPrice);
                var straightenerPrice = (shutterOrderDetail.quantity * shutterOrderDetail.straightenerPrice);

                console.log("Shutter Save Object :%O", shutterOrderDetail);
                ///////////////DIsabled for trial///////
                $scope.applyShutterDiscount(shutterOrderDetail, handlePrice, jaliPrice, straightenerPrice);


//                ShutterOrderDetailsService.save(shutterOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableShutterDetail = "";
//                    $scope.shutterName = "";
//                    $scope.shutterColorName = "";
//                    $scope.shutterHandleName = "";
////                    $scope.refreshList();
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//                OrderDetailsService.save(shutterOrderDetail, function () {
//                    $scope.editableShutterDetail = "";
//                    $scope.shutterName = "";
//                    $scope.refreshList();
//                });
            };
            $scope.saveDrawerDetails = function (drawerOrderDetail) {
                drawerOrderDetail.orderHeadId = $stateParams.orderHeadId;
                drawerOrderDetail.component = $scope.drawerComponent;
                drawerOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (drawerOrderDetail.length < 1000) {
                    if (drawerOrderDetail.length < 100) {
                        lengthLessThan100(drawerOrderDetail.length);
                    } else {
                        l1 = 0 + drawerOrderDetail.length.toString();
                    }
                } else {
                    l1 = drawerOrderDetail.length.toString();
                }
                if (drawerOrderDetail.width < 1000) {
                    if (drawerOrderDetail.width < 100) {
                        widthLessThan100(drawerOrderDetail.width);
                    } else {
                        w1 = 0 + drawerOrderDetail.width.toString();
                    }
                } else {
                    w1 = drawerOrderDetail.width.toString();
                }

                if (drawerOrderDetail.component !== undefined) {
                    var productCode = drawerOrderDetail.component + "XX" + Math.round(drawerOrderDetail.thickness) + "" + drawerOrderDetail.material + "X" + drawerOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(drawerOrderDetail.thickness) + "000";
                } else {
                    var productCode = "DRAWERXX" + Math.round(drawerOrderDetail.thickness) + "" + drawerOrderDetail.material + "X" + drawerOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(drawerOrderDetail.thickness) + "000";
                }
                $scope.applyDrawerDiscount = function (drawerOrderDetail, handlePrice) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': drawerOrderDetail.finish,
                        'material': drawerOrderDetail.material,
                        'thickness': drawerOrderDetail.thickness,
                        'rateContractId': drawerOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        drawerOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((drawerOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        drawerOrderDetail.price = ((drawerOrderDetail.unitPrice - discountPrice) + handlePrice);
                        DrawerOrderDetailsService.save(drawerOrderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editableDrawerDetail = "";
                            $scope.drawerName = "";
                            $scope.drawerColorName = "";
                            $scope.drawerHandleName = "";
//                    $scope.refreshList();
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                var shutterArea = (drawerOrderDetail.length * drawerOrderDetail.width);
                var shutterAreaSqMt = (shutterArea / 1000000);
                console.log("Shutter Area Sq Mt :%O", shutterAreaSqMt);
                if (drawerOrderDetail.handle === "HAN-EP01") {
                    var meterLength = (drawerOrderDetail.handleLength / 1000);
                    drawerOrderDetail.handleMainPrice = (meterLength * drawerOrderDetail.handlePrice);
                } else {
                    drawerOrderDetail.handleMainPrice = drawerOrderDetail.handlePrice;
                }

                if (drawerOrderDetail.grain === "") {
                    drawerOrderDetail.grain = "NO_GRAIN";
                }

                if (drawerOrderDetail.handle === undefined) {
                    drawerOrderDetail.handleMainPrice = 0;
                }
                console.log("Handle Price :%O", drawerOrderDetail.handleMainPrice);
//                if (drawerOrderDetail.bsm === true) {
//                    console.log("Both Side");
//                    drawerOrderDetail.price = (drawerOrderDetail.quantity * ((shutterAreaSqMt * drawerOrderDetail.stdBothSidePrice) + shutterOrderDetail.handleMainPrice));
//                } else if (drawerOrderDetail.bsm === undefined) {
//                    console.log("One Side");
//                drawerOrderDetail.unitPrice = (drawerOrderDetail.quantity * ((shutterAreaSqMt * drawerOrderDetail.stdOneSidePrice) + drawerOrderDetail.handleMainPrice));
                drawerOrderDetail.unitPrice = (drawerOrderDetail.quantity * ((shutterAreaSqMt * drawerOrderDetail.stdOneSidePrice)));
//                }

                drawerOrderDetail.productCode = productCode;
                console.log("Drawer Save Object :%O", drawerOrderDetail);
                var handlePrice = (drawerOrderDetail.quantity * drawerOrderDetail.handleMainPrice);
                $scope.applyDrawerDiscount(drawerOrderDetail, handlePrice);
//                DrawerOrderDetailsService.save(drawerOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableDrawerDetail = "";
//                    $scope.drawerName = "";
//                    $scope.drawerColorName = "";
//                    $scope.drawerHandleName = "";
////                    $scope.refreshList();
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//                var productCode = drawerOrderDetail.component + "-18" + drawerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
//                drawerOrderDetail.productCode = productCode;
//                OrderDetailsService.save(drawerOrderDetail, function () {
//                    $scope.editableDrawerDetail = "";
//                    $scope.drawerName = "";
//                    $scope.refreshList();
//                });
            };
            $scope.saveFillerDetails = function (fillerOrderDetail) {
                fillerOrderDetail.orderHeadId = $stateParams.orderHeadId;
//                fillerOrderDetail.component = $scope.fillerComponent;
                fillerOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                $scope.applyFillerDiscount = function (fillerOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': fillerOrderDetail.finish,
                        'material': fillerOrderDetail.material,
                        'thickness': fillerOrderDetail.thickness,
                        'rateContractId': fillerOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        fillerOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((fillerOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        fillerOrderDetail.price = (fillerOrderDetail.unitPrice - discountPrice);
                        FillerOrderDetailsService.save(fillerOrderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editablePanelDetail = "";
                            $scope.fillerColorName = "";
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                if (fillerOrderDetail.length < 1000) {
                    if (fillerOrderDetail.length < 100) {
                        lengthLessThan100(fillerOrderDetail.length);
                    } else {
                        l1 = 0 + fillerOrderDetail.length.toString();
                    }
                } else {
                    l1 = fillerOrderDetail.length.toString();
                }
                if (fillerOrderDetail.width < 1000) {
                    if (fillerOrderDetail.width < 100) {
                        widthLessThan100(fillerOrderDetail.width);
                    } else {
                        w1 = 0 + fillerOrderDetail.width.toString();
                    }
                } else {
                    w1 = fillerOrderDetail.width.toString();
                }

                var fillerArea = (fillerOrderDetail.width * fillerOrderDetail.length);
                var fillerAreaSqMt = fillerArea / 1000000;
                console.log("Filler ARea :%O", fillerAreaSqMt);
                console.log("Fille Order Detail :%O", fillerOrderDetail);
                if (fillerOrderDetail.bsm === true) {
                    console.log("Both SIde Colored");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdBothSidePrice));
                } else if (fillerOrderDetail.bsm === false) {
                    console.log("Single Side");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdOneSidePrice));
                } else {
                    console.log("Regular");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdOneSidePrice));
                }
                console.log("FInal Price :" + fillerOrderDetail.price);
//                fillerOrderDetail.price = finalPrice;

//                var productCode = fillerOrderDetail.component + "-18" + fillerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                if (fillerOrderDetail.bsm === true) {
                    var productCode = fillerOrderDetail.component + "B" + fillerOrderDetail.thickness + "" + fillerOrderDetail.material + "" + fillerOrderDetail.finish + "-" + l1 + "" + w1 + "" + fillerOrderDetail.thickness + "000";
                } else {
                    var productCode = fillerOrderDetail.component + "" + fillerOrderDetail.thickness + "" + fillerOrderDetail.material + "X" + fillerOrderDetail.finish + "-" + l1 + "" + w1 + "" + fillerOrderDetail.thickness + "000";
                }
                fillerOrderDetail.productCode = productCode;
                console.log("Filler Save Object :%O", fillerOrderDetail);
                $scope.applyFillerDiscount(fillerOrderDetail);
//                FillerOrderDetailsService.save(fillerOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editablePanelDetail = "";
//                    $scope.fillerColorName = "";
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//                /////////////////////
//                OrderDetailsService.save(fillerOrderDetail, function () {
//                    $scope.editableFillerDetail = "";
//                    $scope.fillerName = "";
//                    $scope.refreshList();
//                });
            };
            $scope.savePelmetDetails = function (pelmetOrderDetail) {
                pelmetOrderDetail.orderHeadId = $stateParams.orderHeadId;
                pelmetOrderDetail.component = $scope.pelmetComponent;
                pelmetOrderDetail.depth = '0';
                $scope.applyPelmetDiscount = function (pelmetOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': pelmetOrderDetail.finish,
                        'material': pelmetOrderDetail.material,
                        'thickness': pelmetOrderDetail.thickness,
                        'rateContractId': pelmetOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        pelmetOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((pelmetOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        pelmetOrderDetail.price = (pelmetOrderDetail.unitPrice - discountPrice);
                        PelmetOrderDetailsService.save(pelmetOrderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editablePelmetDetail = "";
                            $scope.pelmetColorName = "";
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (pelmetOrderDetail.length < 1000) {
                    if (pelmetOrderDetail.length < 100) {
                        lengthLessThan100(pelmetOrderDetail.length);
                    } else {
                        l1 = 0 + pelmetOrderDetail.length.toString();
                    }
                } else {
                    l1 = pelmetOrderDetail.length.toString();
                }
                if (pelmetOrderDetail.width < 1000) {
                    if (pelmetOrderDetail.width < 100) {
                        widthLessThan100(pelmetOrderDetail.width);
                    } else {
                        w1 = 0 + pelmetOrderDetail.width.toString();
                    }
                } else {
                    w1 = pelmetOrderDetail.width.toString();
                }
                var pelmetArea = (pelmetOrderDetail.width * pelmetOrderDetail.length);
                var pelmetAreaSqMt = pelmetArea / 1000000;
                console.log("Pelmet Area :%O", pelmetAreaSqMt);
                pelmetOrderDetail.unitPrice = (pelmetOrderDetail.quantity * (pelmetAreaSqMt * pelmetOrderDetail.finishPrice));
                console.log("Pelmet Price :%O", pelmetOrderDetail.price);
                var productCode = pelmetOrderDetail.component + "" + pelmetOrderDetail.thickness + "" + pelmetOrderDetail.material + "X" + pelmetOrderDetail.finish + "-" + l1 + "" + w1 + "" + pelmetOrderDetail.thickness + "000";
                pelmetOrderDetail.productCode = productCode;
                console.log("Pelmet Save Object :%O", pelmetOrderDetail);
                $scope.applyPelmetDiscount(pelmetOrderDetail);
//                PelmetOrderDetailsService.save(pelmetOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editablePelmetDetail = "";
//                    $scope.pelmetColorName = "";
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//                OrderDetailsService.save(pelmetOrderDetail, function () {
//                    $scope.editablePelmetDetail = "";
//                    $scope.pelmetName = "";
//                    $scope.refreshList();
//                });
            };
            $scope.saveCorniceDetails = function (corniceOrderDetail) {
                corniceOrderDetail.orderHeadId = $stateParams.orderHeadId;
                corniceOrderDetail.component = $scope.corniceComponent;
                corniceOrderDetail.depth = '0';
                $scope.applyCorniceDiscount = function (corniceOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': corniceOrderDetail.finish,
                        'material': corniceOrderDetail.material,
                        'thickness': corniceOrderDetail.thickness,
                        'rateContractId': corniceOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        corniceOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((corniceOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        corniceOrderDetail.price = (corniceOrderDetail.unitPrice - discountPrice);
                        CorniceOrderDetailsService.save(corniceOrderDetail, function () {
                            console.log("Saved Successfully");
                            $scope.editableCorniceDetail = "";
                            $scope.corniceColorName = "";
                            $state.go('admin.masters_order_details', {
                                'orderHeadId': $stateParams.orderHeadId
                            }, {'reload': true});
                        });
                    });
                };
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (corniceOrderDetail.length < 1000) {
                    if (corniceOrderDetail.length < 100) {
                        lengthLessThan100(corniceOrderDetail.length);
                    } else {
                        l1 = 0 + corniceOrderDetail.length.toString();
                    }
                } else {
                    l1 = corniceOrderDetail.length.toString();
                }
                if (corniceOrderDetail.width < 1000) {
                    if (corniceOrderDetail.width < 100) {
                        widthLessThan100(corniceOrderDetail.width);
                    } else {
                        w1 = 0 + corniceOrderDetail.width.toString();
                    }
                } else {
                    w1 = corniceOrderDetail.width.toString();
                }
                var corniceArea = (corniceOrderDetail.length * corniceOrderDetail.width);
                var corniceAreaSqMt = corniceArea / 1000000;
                console.log("Total ARea :%O", corniceAreaSqMt);
                console.log("Std Price :%O", corniceOrderDetail.finishPrice);
//                pelmetOrderDetail.price = (pelmetOrderDetail.quantity * (pelmetAreaSqMt * pelmetOrderDetail.finishPrice));
                corniceOrderDetail.unitPrice = (corniceOrderDetail.quantity * (corniceAreaSqMt * corniceOrderDetail.finishPrice));
                console.log("Final Price :%O", corniceOrderDetail.price);
//                var productCode = corniceOrderDetail.component + "-18" + corniceOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                var productCode = corniceOrderDetail.component + "" + corniceOrderDetail.thickness + "" + corniceOrderDetail.material + "X" + corniceOrderDetail.finish + "-" + l1 + "" + w1 + "" + corniceOrderDetail.thickness + "000";
                corniceOrderDetail.productCode = productCode;
                console.log("Cornice Final Save :%O", corniceOrderDetail);
                $scope.applyCorniceDiscount(corniceOrderDetail);
//                CorniceOrderDetailsService.save(corniceOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableCorniceDetail = "";
//                    $scope.corniceColorName = "";
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
                ///////////////////////////////
//                OrderDetailsService.save(corniceOrderDetail, function () {
//                    $scope.editableCorniceDetail = "";
//                    $scope.corniceName = "";
//                    $scope.refreshList();
//                });
            };
            $scope.saveHandleDetails = function (handleOrderDetail) {
                handleOrderDetail.orderHeadId = $stateParams.orderHeadId;
                handleOrderDetail.component = $scope.handleComponent;
//                handleOrderDetail.depth = '0';
//                handleOrderDetail.width = '0';
//                handleOrderDetail.material = '';
                var l1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                if (handleOrderDetail.length < 1000) {
                    if (handleOrderDetail.length < 100) {
                        lengthLessThan100(handleOrderDetail.length);
                    } else {
                        l1 = 0 + handleOrderDetail.length.toString();
                    }
                } else {
                    l1 = handleOrderDetail.length.toString();
                }
                var productCode = handleOrderDetail.component + "XXXXXXXX-" + l1 + "MM";
                handleOrderDetail.productCode = productCode;
                if (handleOrderDetail.component === "HAN-EP01") {
                    var meterLength = (handleOrderDetail.length / 1000);
                    handleOrderDetail.price = (handleOrderDetail.quantity * (meterLength * handleOrderDetail.stdPrice));
                } else {
                    handleOrderDetail.price = (handleOrderDetail.quantity * handleOrderDetail.stdPrice);
                }
                console.log("Handle Save Object :%O", handleOrderDetail);
                HandleOrderDetailsService.save(handleOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editableHandleDetail = "";
                    $scope.handleName = "";
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };
            ///////////////////End//////////////////////////////////////
            /////////////////Fetching Order Details/////////////////////
            OrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (orderDetailsList) {
                console.log("Order Details List :%O", orderDetailsList);
                $scope.orderDetailsList = orderDetailsList;
            });
            $scope.refreshList = function () {
                $scope.orderDetailsList = OrderDetailsService.findByOrderHeadId({
                    'orderHeadId': $stateParams.orderHeadId
                });
            };
            $scope.carcassDetailsList = CarcassOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (carcassOrderList) {
                console.log("Carcass Order List :%O", carcassOrderList);
                angular.forEach($scope.carcassDetailsList, function (carcassDetailObject) {
                    carcassDetailObject.subTypeObject = CarcassSubtypeService.findByParentTypeSubTypeCode({
                        'parentType': carcassDetailObject.component,
                        'subTypeCode': carcassDetailObject.carcassSubType
                    });
                    carcassDetailObject.rightColorObject = ColorService.get({
                        'id': carcassDetailObject.rightColorId
                    });
                    carcassDetailObject.leftColorObject = ColorService.get({
                        'id': carcassDetailObject.leftColorId
                    });
                    carcassDetailObject.topColorObject = ColorService.get({
                        'id': carcassDetailObject.topColorId
                    });
                    carcassDetailObject.bottomColorObject = ColorService.get({
                        'id': carcassDetailObject.bottomColorId
                    });
                    carcassDetailObject.internalColorObject = ColorService.get({
                        'id': carcassDetailObject.intColorId
                    });
                    if (carcassDetailObject.sectionProfileId !== 'NULL') {
                        carcassDetailObject.sectionProfileObject = SectionProfileService.get({
                            'id': carcassDetailObject.sectionProfileId
                        });
                    }
                    carcassDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': carcassDetailObject.component
                    });
                    carcassDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': carcassDetailObject.material
                    });
                    if (carcassDetailObject.sideFinish !== '0') {
                        carcassDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                            'finishCode': carcassDetailObject.sideFinish
                        });
                    }
                });
            });
            $scope.panelDetailsList = PanelOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (panelOrderList) {
                angular.forEach($scope.panelDetailsList, function (panelDetailObject) {
                    panelDetailObject.colorObject = ColorService.get({
                        'id': panelDetailObject.colorId
                    });
                    panelDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': panelDetailObject.component
                    });
                    panelDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': panelDetailObject.material
                    });
                });
            });
            $scope.fillerDetailsList = FillerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (fillerOrderList) {
                angular.forEach($scope.fillerDetailsList, function (fillerDetailObject) {
                    fillerDetailObject.colorObject = ColorService.get({
                        'id': fillerDetailObject.colorId
                    });
                    fillerDetailObject.intColorObject = ColorService.get({
                        'id': fillerDetailObject.intColorId
                    });
                    fillerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': fillerDetailObject.component
                    });
                    fillerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': fillerDetailObject.material
                    });
                    fillerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': fillerDetailObject.finish
                    });
                });
            });
            $scope.pelmetDetailsList = PelmetOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (pelmetOrderList) {
                angular.forEach($scope.pelmetDetailsList, function (pelmetDetailObject) {
                    pelmetDetailObject.colorObject = ColorService.get({
                        'id': pelmetDetailObject.colorId
                    });
                    pelmetDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': pelmetDetailObject.component
                    });
                    pelmetDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': pelmetDetailObject.material
                    });
                    pelmetDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': pelmetDetailObject.finish
                    });
                });
            });
            $scope.corniceDetailsList = CorniceOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (corniceOrderList) {
                angular.forEach($scope.corniceDetailsList, function (corniceDetailObject) {
                    corniceDetailObject.colorObject = ColorService.get({
                        'id': corniceDetailObject.colorId
                    });
                    corniceDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': corniceDetailObject.component
                    });
                    corniceDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': corniceDetailObject.material
                    });
                    corniceDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': corniceDetailObject.finish
                    });
                });
            });
            $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (handleOrderList) {
                angular.forEach($scope.handleDetailsList, function (handleDetailObject) {
                    handleDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': handleDetailObject.component
                    });
                });
            });
            $scope.hardwareDetailsList = HardwareOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (hardwareOrderList) {
            });
            $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (shutterOrderList) {
                angular.forEach($scope.shutterDetailsList, function (shutterDetailObject) {
                    shutterDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': shutterDetailObject.component
                    });
                    shutterDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': shutterDetailObject.material
                    });
                    shutterDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': shutterDetailObject.finish
                    });
                    shutterDetailObject.colorObject = ColorService.get({
                        'id': shutterDetailObject.colorId
                    });
                    shutterDetailObject.intColorObject = ColorService.get({
                        'id': shutterDetailObject.intColorId
                    });
                });
            });
            $scope.drawerDetailsList = DrawerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (drawerOrderList) {
                angular.forEach($scope.drawerDetailsList, function (drawerDetailObject) {
                    drawerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': drawerDetailObject.component
                    });
                    drawerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': drawerDetailObject.material
                    });
                    drawerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': drawerDetailObject.finish
                    });
                    drawerDetailObject.colorObject = ColorService.get({
                        'id': drawerDetailObject.colorId
                    });
                    drawerDetailObject.intColorObject = ColorService.get({
                        'id': drawerDetailObject.intColorId
                    });
                });
            });
            ///////////////////End//////////////////////////////////////

        }
        )
        .controller('ProformaInvoiceDisplayController', function (HardwareOrderDetailsService, DrawerOrderDetailsService, ShutterOrderDetailsService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, SectionProfileService, FinishPriceService, RawMaterialService, KitchenComponentService, ColorService, CarcassOrderDetailsService, SegmentService, PartyService, OrderHeadService, OrderDetailsService, $scope, $filter, $stateParams, $state, paginationLimit) {
            $scope.currentDate = new Date();
            var totalPrice = 0;
            var carcassTotalPrice = 0;
            var panelTotalPrice = 0;
            var shutterTotalPrice = 0;
            var drawerTotalPrice = 0;
            var fillerTotalPrice = 0;
            var pelmetTotalPrice = 0;
            var corniceTotalPrice = 0;
            var handleTotalPrice = 0;
            var hardwareTotalPrice = 0;
            $scope.componentTotalList = [];
            $scope.mainInvoiceList = [];
            $scope.showCgst = false;
            $scope.showIgst = false;
            $scope.gstObject = {};
            if ($scope.mainInvoiceList.length === 0) {
                console.log("Initial Length 0");
                $scope.srNo = 0;
            }

            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (party) {
                    $scope.party = party;
                });
                SegmentService.findBySegment({
                    'segment': orderHeadObject.segment
                }, function (segment) {
                    $scope.segment = segment;
                });
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });
            $scope.carcassDetailsList = CarcassOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (carcassOrderList) {
                console.log("Carcass Order List :%O", carcassOrderList);
                $scope.carcassTotalPrice = 0;
                angular.forEach($scope.carcassDetailsList, function (carcassDetailObject) {
                    $scope.srNo = $scope.srNo + 1;
                    carcassDetailObject.srNo = $scope.srNo;
                    carcassDetailObject.rightColorObject = ColorService.get({
                        'id': carcassDetailObject.rightColorId
                    });
                    carcassDetailObject.leftColorObject = ColorService.get({
                        'id': carcassDetailObject.leftColorId
                    });
                    carcassDetailObject.topColorObject = ColorService.get({
                        'id': carcassDetailObject.topColorId
                    });
                    carcassDetailObject.bottomColorObject = ColorService.get({
                        'id': carcassDetailObject.bottomColorId
                    });
                    carcassDetailObject.backColorObject = ColorService.get({
                        'id': carcassDetailObject.backColorId
                    });
                    carcassDetailObject.internalColorObject = ColorService.get({
                        'id': carcassDetailObject.intColorId
                    });
                    if (carcassDetailObject.sectionProfileId !== 'NULL') {
                        carcassDetailObject.sectionProfileObject = SectionProfileService.get({
                            'id': carcassDetailObject.sectionProfileId
                        });
                    }

                    carcassDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': carcassDetailObject.component
                    });
                    carcassDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': carcassDetailObject.material
                    });
                    if (carcassDetailObject.sideFinish !== '0') {
                        carcassDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                            'finishCode': carcassDetailObject.sideFinish
                        });
                    }
//                    $scope.carcassTotalPrice = $scope.carcassTotalPrice + carcassDetailObject.price;
//                    console.log("Carcass Total Price" + $scope.carcassTotalPrice);
                    carcassTotalPrice = carcassTotalPrice + carcassDetailObject.price;
//                    console.log("Total Carcass Price :" + totalPrice);
                    $scope.mainInvoiceList.push(carcassDetailObject);
//                    console.log("KC Obj :%O", carcassDetailObject.kitchenComponentObject);
                });
                $scope.carcassTotalPrice = carcassTotalPrice;
                console.log("Carcass Total Price in function :" + $scope.carcassTotalPrice);
                $scope.captureTotal($scope.carcassTotalPrice);
                $scope.componentTotalList.push($scope.carcassTotalPrice);
            });
            $scope.panelDetailsList = PanelOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (panelOrderList) {
                angular.forEach($scope.panelDetailsList, function (panelDetailObject) {
                    $scope.srNo = $scope.srNo + 1;
                    panelDetailObject.srNo = $scope.srNo;
                    panelDetailObject.colorObject = ColorService.get({
                        'id': panelDetailObject.colorId
                    });
                    panelDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': panelDetailObject.component
                    });
                    panelDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': panelDetailObject.material
                    });
                    totalPrice = totalPrice + panelDetailObject.price;
                    console.log("Panel Added to Total Price " + totalPrice);
                    panelTotalPrice = panelTotalPrice + panelDetailObject.price;
                    $scope.mainInvoiceList.push(panelDetailObject);
                });
                $scope.panelTotalPrice = panelTotalPrice;
//                console.log("Panel Total Price :%O", panelTotalPrice);
                $scope.captureTotal($scope.panelTotalPrice);
            });
            $scope.fillerDetailsList = FillerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (fillerOrderList) {
                angular.forEach($scope.fillerDetailsList, function (fillerDetailObject) {
                    $scope.srNo = $scope.srNo + 1;
                    fillerDetailObject.srNo = $scope.srNo;
                    fillerDetailObject.colorObject = ColorService.get({
                        'id': fillerDetailObject.colorId
                    });
                    fillerDetailObject.intColorObject = ColorService.get({
                        'id': fillerDetailObject.intColorId
                    });
                    fillerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': fillerDetailObject.component
                    });
                    fillerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': fillerDetailObject.material
                    });
                    fillerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': fillerDetailObject.finish
                    });
                    totalPrice = totalPrice + fillerDetailObject.price;
                    console.log("Added Filler Price :%O", totalPrice);
                    fillerTotalPrice = fillerTotalPrice + fillerDetailObject.price;
                    $scope.mainInvoiceList.push(fillerDetailObject);
                });
                $scope.fillerTotalPrice = fillerTotalPrice;
//                console.log("Filler Total Price :%O", $scope.fillerTotalPrice);
                $scope.captureTotal($scope.fillerTotalPrice);
            });
            $scope.pelmetDetailsList = PelmetOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (pelmetOrderList) {
                angular.forEach($scope.pelmetDetailsList, function (pelmetDetailObject) {
                    $scope.srNo = $scope.srNo + 1;
                    pelmetDetailObject.srNo = $scope.srNo;
                    pelmetDetailObject.colorObject = ColorService.get({
                        'id': pelmetDetailObject.colorId
                    });
                    pelmetDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': pelmetDetailObject.component
                    });
                    pelmetDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': pelmetDetailObject.material
                    });
                    pelmetDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': pelmetDetailObject.finish
                    });
                    totalPrice = totalPrice + pelmetDetailObject.price;
                    pelmetTotalPrice = pelmetTotalPrice + pelmetDetailObject.price;
//                    console.log("Added Pelmet Price :%O", totalPrice);
                    $scope.mainInvoiceList.push(pelmetDetailObject);
                });
                $scope.pelmetTotalPrice = pelmetTotalPrice;
                console.log("Pelmet totaol Price :%O", $scope.pelmetTotalPrice);
                $scope.captureTotal($scope.pelmetTotalPrice);
            });
            $scope.corniceDetailsList = CorniceOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (corniceOrderList) {
                angular.forEach($scope.corniceDetailsList, function (corniceDetailObject) {
                    $scope.srNo = $scope.srNo + 1;
                    corniceDetailObject.srNo = $scope.srNo;
                    corniceDetailObject.colorObject = ColorService.get({
                        'id': corniceDetailObject.colorId
                    });
                    corniceDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': corniceDetailObject.component
                    });
                    corniceDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': corniceDetailObject.material
                    });
                    corniceDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': corniceDetailObject.finish
                    });
                    totalPrice = totalPrice + corniceDetailObject.price;
                    corniceTotalPrice = corniceTotalPrice + corniceDetailObject.price;
                    console.log("Added Cornice Price :%O", totalPrice);
                    $scope.mainInvoiceList.push(corniceDetailObject);
                });
                $scope.cornicetotalPrice = corniceTotalPrice;
                console.log("Cornice Total Price :%O", corniceTotalPrice);
                $scope.captureTotal(corniceTotalPrice);
            });
            $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (handleOrderList) {
                angular.forEach($scope.handleDetailsList, function (handleDetailObject) {
                    handleDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': handleDetailObject.component
                    });
                    totalPrice = totalPrice + handleDetailObject.price;
//                    console.log("Added Handle Price :%O", totalPrice);
                    handleTotalPrice = handleTotalPrice + handleDetailObject.price;
                    $scope.mainInvoiceList.push(handleDetailObject);
                });
                $scope.handleTotalPrice = handleTotalPrice;
                console.log("Handle Total Price :%O", $scope.handleTotalPrice);
                $scope.captureTotal($scope.handleTotalPrice);
            });
            $scope.hardwareDetailsList = HardwareOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (hardwareOrderList) {
                angular.forEach($scope.hardwareDetailsList, function (hardwareDetailObject) {
                    totalPrice = totalPrice + hardwareDetailObject.price;
                    hardwareTotalPrice = hardwareTotalPrice + hardwareDetailObject.price;
                    $scope.mainInvoiceList.push(hardwareDetailObject);
                });
                $scope.hardwareTotalPrice = hardwareTotalPrice;
                $scope.captureTotal($scope.hardwareTotalPrice);
            });
            $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (shutterOrderList) {
                angular.forEach($scope.shutterDetailsList, function (shutterDetailObject) {
                    shutterDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': shutterDetailObject.component
                    });
                    shutterDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': shutterDetailObject.material
                    });
                    shutterDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': shutterDetailObject.finish
                    });
                    shutterDetailObject.colorObject = ColorService.get({
                        'id': shutterDetailObject.colorId
                    });
                    shutterDetailObject.intColorObject = ColorService.get({
                        'id': shutterDetailObject.intColorId
                    });
                    totalPrice = totalPrice + shutterDetailObject.price;
//                    console.log("Added SHutter Price :%O", totalPrice);
                    shutterTotalPrice = shutterTotalPrice + shutterDetailObject.price;
                    $scope.mainInvoiceList.push(shutterDetailObject);
                });
                $scope.shutterTotalPrice = shutterTotalPrice;
                console.log("Shutter Total Price :%O", $scope.shutterTotalPrice);
                $scope.captureTotal($scope.shutterTotalPrice);
            });
            $scope.drawerDetailsList = DrawerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (drawerOrderList) {
                angular.forEach($scope.drawerDetailsList, function (drawerDetailObject) {
                    drawerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': drawerDetailObject.component
                    });
                    drawerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': drawerDetailObject.material
                    });
                    drawerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': drawerDetailObject.finish
                    });
                    drawerDetailObject.colorObject = ColorService.get({
                        'id': drawerDetailObject.colorId
                    });
                    drawerDetailObject.intColorObject = ColorService.get({
                        'id': drawerDetailObject.intColorId
                    });
                    totalPrice = totalPrice + drawerDetailObject.price;
                    drawerTotalPrice = drawerTotalPrice + drawerDetailObject.price;
//                    console.log("Added Filler Price :%O", totalPrice);
                    $scope.mainInvoiceList.push(drawerDetailObject);
                });
                $scope.drawerTotalPrice = drawerTotalPrice;
                console.log("Drawer total Price :%O" + $scope.drawerTotalPrice);
                $scope.captureTotal($scope.drawerTotalPrice);
            });
//            console.log("Final Price After Adding Everything :%O", totalPrice);
//            CarcassOrderDetailsService.findPriceByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
//            }, function (carcassPrice) {
//                console.log("Carcass Price :" + carcassPrice);
//            });
//
//            $scope.carcassPrice.$promise.then(function (cPrice) {
//                console.log("Price After getting Resolved :%O", cPrice);
//            });
//            CarcassOrderDetailsService.findPriceByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
//            }, function (carcassPrice) {
//                PanelOrderDetailsService.findPriceByOrderHeadId({
//                    'orderHeadId': $stateParams.orderHeadId
//                }, function (panelPrice) {
//                    console.log("Carcass Price :"+carcassPrice);
//                    console.log("Panel Price :"+panelPrice);
//                    $scope.totalAmount = carcassPrice + panelPrice;
//                });
//            });
            console.log("Carcass Total Price :%O", $scope.carcassTotalPrice);
            console.log("Main Invoice List :%O", $scope.mainInvoiceList);
            $scope.getTotal = 0;
            var totalArr = [];
            $scope.captureTotal = function (total) {
                totalArr.push(total);
                angular.forEach(totalArr, function (price) {
//                    console.log("Price Inside Loop :%O", price);
                });
                $scope.getTotal = $scope.getTotal + total;
                console.log("THIS IS IT " + $scope.getTotal);
                $scope.orderTotal = $scope.getTotal;
                console.log("$scope.orderHead :%O", $scope.orderHead);
                PartyService.get({
                    'id': $scope.orderHead.billingPartyId
                }, function (partyObject) {
                    console.log("Party Object :%O", partyObject);
                    if (partyObject.state === "MS") {
                        console.log("STate Party Apply SGST & CGST");
                        $scope.cgst = Math.round((($scope.orderTotal / 100) * 9));
                        $scope.sgst = Math.round((($scope.orderTotal / 100) * 9));
                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.cgst + $scope.sgst));
                        $scope.showCgst = true;
                        $scope.showIgst = false;
                        console.log("Net AMount MS:%O" + $scope.netAmount);
                    } else if (partyObject.state === "OMS") {
                        console.log("Other State Party Apply IGST");
                        $scope.igst = Math.round((($scope.orderTotal / 100) * 18));
                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.igst));
                        $scope.showCgst = false;
                        $scope.showIgst = true;
                        console.log("Net AMount OMS:%O" + $scope.netAmount);
                    }

                });
            };
        })
        .controller('CarcassDetailDeleteController', function (CarcassOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params :%O", $stateParams);
            $scope.editableCarcassDetail = CarcassOrderDetailsService.get({'id': $stateParams.carcassDetailId});
            $scope.deleteCarcassDetail = function (carcassOrderDetail) {
                console.log("Carcass Order Detail :%O", carcassOrderDetail);
                carcassOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableCarcassDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('PanelDetailDeleteController', function (PanelOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Panel:%O", $stateParams);
            $scope.editablePanelDetail = PanelOrderDetailsService.get({'id': $stateParams.panelDetailId});
            $scope.deletePanelDetail = function (panelOrderDetail) {
                console.log("Panel Order Detail :%O", panelOrderDetail);
                panelOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editablePanelDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('FillerDetailDeleteController', function (FillerOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Panel:%O", $stateParams);
            $scope.editableFillerDetail = FillerOrderDetailsService.get({'id': $stateParams.fillerDetailId});
            $scope.deleteFillerDetail = function (fillerOrderDetail) {
                console.log("Filler Order Detail :%O", fillerOrderDetail);
                fillerOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableFillerDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('PelmetDetailDeleteController', function (PelmetOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editablePelmetDetail = PelmetOrderDetailsService.get({'id': $stateParams.pelmetDetailId});
            $scope.deletePelmetDetail = function (pelmetOrderDetail) {
                console.log("Filler Order Detail :%O", pelmetOrderDetail);
                pelmetOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editablePelmetDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('OrderApproveController', function (HardwareOrderDetailsService, RateContractDetailService, PartyService, ColorService, HandleOrderDetailsService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, DrawerOrderDetailsService, ShutterOrderDetailsService, PanelOrderDetailsService, CarcassOrderDetailsService, ErpIntegrationService, OrderHeadService, $http, $scope, $stateParams, $state, $rootScope, paginationLimit) {
            $scope.orderObject = OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderObject) {
                $scope.orderObject.billingPartyObject = PartyService.get({
                    'id': orderObject.billingPartyId
                });
                $scope.orderObject.deliveryPartyObject = PartyService.get({
                    'id': orderObject.deliveryPartyId
                });
//
//                $scope.orderObject = orderObject;
                console.log("What is Order Object :%O", $scope.orderObject);
//                $scope.orderObject.rateContractId = $scope.orderObject.billingPartyObject;

            });

//            $scope.currentUser = $rootScope.currentUser;
//            console.log("Current User :%O", $scope.currentUser);
//            UserService.findByUsername({
//               'username':$scope.currentUser.username 
//            }, function(userObject){
//                $scope.rateContract = 
//            });
            $scope.approveOrder = function (orderHead) {
                orderHead.approvalDate = new Date().getTime();
                orderHead.$save(function () {
                });
                delete orderHead.billingPartyObject.$promise;
                delete orderHead.billingPartyObject.$resolved;
                delete orderHead.deliveryPartyObject.$promise;
                delete orderHead.deliveryPartyObject.$resolved;
                console.log("Order Head :%O", orderHead);
                $scope.newOrderHeadObject = {};
                $scope.newOrderHeadObject.id = orderHead.id;
                $scope.newOrderHeadObject.orderNum = orderHead.orderNum;
                $scope.newOrderHeadObject.segment = orderHead.segment;
                $scope.newOrderHeadObject.saleType = orderHead.saleType;
                $scope.newOrderHeadObject.entryType = orderHead.entryType;
                $scope.newOrderHeadObject.orderType = orderHead.orderType;
                $scope.newOrderHeadObject.billingPartyId = orderHead.billingPartyId;
                $scope.newOrderHeadObject.deliveryPartyId = orderHead.deliveryPartyId;
                $scope.newOrderHeadObject.postalCode = orderHead.postalCode;
                $scope.newOrderHeadObject.billType = orderHead.billType;
                $scope.newOrderHeadObject.orderSubType = orderHead.orderSubType;
                $scope.newOrderHeadObject.projectName = orderHead.projectName;
                $scope.newOrderHeadObject.poNum = orderHead.poNum;
                $scope.newOrderHeadObject.orderId = orderHead.orderId;
                $scope.newOrderHeadObject.poDate = orderHead.poDate;
                $scope.newOrderHeadObject.poValue = orderHead.poValue;
                $scope.newOrderHeadObject.marketingHead = orderHead.marketingHead;
                $scope.newOrderHeadObject.orderInitiatedBy = orderHead.orderInitiatedBy;
                $scope.newOrderHeadObject.rateApplicability = orderHead.rateApplicability;
                $scope.newOrderHeadObject.rateContract = orderHead.rateContract;
                $scope.newOrderHeadObject.orcPer = orderHead.orcPer;
                $scope.newOrderHeadObject.approved = orderHead.approved;
                $scope.newOrderHeadObject.billingPartyObject = angular.copy(orderHead.billingPartyObject);
                $scope.newOrderHeadObject.deliveryPartyObject = angular.copy(orderHead.deliveryPartyObject);
                console.log("New Order Head :%O", $scope.newOrderHeadObject);
                $http.post("http://14.192.18.131:9080/Innocal/rest/Innopan/OrderHead", $scope.newOrderHeadObject)
//                $http.post("http://192.168.100.145:8080/SwRestAndroidApi/rest/Innopan/OrderHead", $scope.newOrderHeadObject)
                        .then(function successCallback(response) {
                            console.log("Successfully POST-ed data :%O", response);
//                            var orderDetailList = [];
//                            $scope.finalOrderList = [];
                            $scope.carcassPromise = CarcassOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (carcassOrderList) {
                                angular.forEach(carcassOrderList, function (carcassOrderObject) {
//                                    RateContractDetailService.findByCarcassMaterialThickness({
//                                        'material': carcassOrderObject.material,
//                                        'thickness': 18,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        carcassOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Carcass Order Detail Before Pushing Into ERP :%O", carcassOrderObject);
                                    $scope.erpPush(carcassOrderObject);
                                });
                            });
                            ////////////////////Panel ERP Insertion/////////////////////////////
                            $scope.panelPromise = PanelOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (panelOrderList) {
                                angular.forEach(panelOrderList, function (panelOrderObject) {
//                                    RateContractDetailService.findByPanelMaterialThickness({
//                                        'material': panelOrderObject.material,
//                                        'thickness': panelOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        panelOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
//                                    ColorService.get({
//                                        'id': panelOrderObject.colorId
//                                    }, function (colorObject) {
//                                        delete colorObject.$promise;
//                                        delete colorObject.$resolved;
//                                        panelOrderObject.colorObject = angular.copy(colorObject);
//                                        console.log("Color Object :%O", panelOrderObject.colorObject);
//                                    });
                                    console.log("Final Panel Order Detail Before Pushing Into ERP :%O", panelOrderObject);
//                                    $scope.finalOrderList.push(panelOrderObject);
                                    $scope.erpPush(panelOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Shutter ERP Insertion/////////////////////////////
                            ShutterOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (shutterOrderList) {
                                angular.forEach(shutterOrderList, function (shutterOrderObject) {
//                                    RateContractDetailService.findByShutterFinishMaterialThickness({
//                                        'finish': shutterOrderObject.finish,
//                                        'material': shutterOrderObject.material,
//                                        'thickness': shutterOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        shutterOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Shutter Order Detail Before Pushing Into ERP :%O", shutterOrderObject);
                                    $scope.erpPush(shutterOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Drawer ERP Insertion/////////////////////////////
                            DrawerOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (drawerOrderList) {
                                angular.forEach(drawerOrderList, function (drawerOrderObject) {
//                                    RateContractDetailService.findByShutterFinishMaterialThickness({
//                                        'finish': drawerOrderObject.finish,
//                                        'material': drawerOrderObject.material,
//                                        'thickness': drawerOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        drawerOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Drawer Order Detail Before Pushing Into ERP :%O", drawerOrderObject);
                                    $scope.erpPush(drawerOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Filler ERP Insertion/////////////////////////////
                            FillerOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (fillerOrderList) {
                                angular.forEach(fillerOrderList, function (fillerOrderObject) {
//                                    RateContractDetailService.findByShutterFinishMaterialThickness({
//                                        'finish': fillerOrderObject.finish,
//                                        'material': fillerOrderObject.material,
//                                        'thickness': fillerOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        fillerOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Filler Order Detail Before Pushing Into ERP :%O", fillerOrderObject);
                                    $scope.erpPush(fillerOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Pelmet ERP Insertion/////////////////////////////
                            PelmetOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (pelmetOrderList) {
                                angular.forEach(pelmetOrderList, function (pelmetOrderObject) {
//                                    RateContractDetailService.findByShutterFinishMaterialThickness({
//                                        'finish': pelmetOrderObject.finish,
//                                        'material': pelmetOrderObject.material,
//                                        'thickness': pelmetOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        pelmetOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Pelmet Order Detail Before Pushing Into ERP :%O", pelmetOrderObject);
                                    $scope.erpPush(pelmetOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Cornice ERP Insertion/////////////////////////////
                            CorniceOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (corniceOrderList) {
                                angular.forEach(corniceOrderList, function (corniceOrderObject) {
//                                    RateContractDetailService.findByShutterFinishMaterialThickness({
//                                        'finish': corniceOrderObject.finish,
//                                        'material': corniceOrderObject.material,
//                                        'thickness': corniceOrderObject.thickness,
//                                        'rateContractId': orderHead.billingPartyObject.rateContractId
//                                    }, function (rateContractDetailObject) {
//                                        corniceOrderObject.discountPer = rateContractDetailObject.discountPer;
//                                    });
                                    console.log("Final Cornice Order Detail Before Pushing Into ERP :%O", corniceOrderObject);
                                    $scope.erpPush(corniceOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Handle ERP Insertion/////////////////////////////
                            HandleOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (handleOrderList) {
                                angular.forEach(handleOrderList, function (handleOrderObject) {
                                    console.log("Final Handle Order Detail Before Pushing Into ERP :%O", handleOrderObject);
                                    $scope.erpPush(handleOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////
                            ////////////////////Hardware ERP Insertion/////////////////////////////
                            HardwareOrderDetailsService.findByOrderHeadId({
                                'orderHeadId': $stateParams.orderHeadId
                            }, function (hardwareOrderList) {
                                angular.forEach(hardwareOrderList, function (hardwareOrderObject) {
                                    console.log("Final Hardware Order Detail Before Pushing Into ERP :%O", hardwareOrderObject);
                                    $scope.erpPush(hardwareOrderObject);
                                });
                            });
                            ////////////////////////////////////////////////////////////////////

//                            $scope.carcassPromise.$promise.then(function (carcassList) {
//                                $scope.panelPromise.$promise.then(function (panelList) {
//                                    console.log("Promise Resolved :%O", $scope.finalOrderList);
//                                    angular.forEach($scope.finalOrderList, function (singleOrderObject) {
//                                        $scope.erpPush(singleOrderObject);
//                                    });
//                                });
//                            });
//                            console.log("WHat is Final List NOw :%O", $scope.finalOrderList);
                            $scope.erpPush = function (orderDetails) {
                                console.log("Order Details :%O", orderDetails);
//                                $http.post("http://192.168.100.145:8080/SwRestAndroidApi/rest/Innopan/OrderDetail", orderDetails).then(function successCallback(response) {
                                $http.post("http://14.192.18.131:9080/Innocal/rest/Innopan/OrderDetail", orderDetails).then(function successCallback(response) {
                                    console.log("Carcass Success Response :%O", response);
                                }, function errorCallback(response) {
                                    console.log("Carcass Error Response :%O", response);
                                    alert("Something went wrong in Carcass Order Detail");
                                });
                            };
                            orderHead.approved = 1;
                            orderHead.$save(function () {
                                $state.go('admin.masters_order_history', null, {'reload': true});
                            });
                        }, function errorCallback(response) {
                            console.log("POST-ing of data failed :%O", response);
                        });

//                ErpIntegrationService.InsertOrderHead(orderHead, function (orderHeadCallBack) {
//                    console.log("Order Head Call Back :%O", orderHeadCallBack);
//                });
//                ErpIntegrationService.InsertOrderHead();
//                orderHead.approved = 1;
//                orderHead.$save(function () {
//                    $state.go('admin.masters_order_history', null, {'reload': true});
//                });
            }
            ;
        }
        )
        .controller('CorniceDetailDeleteController', function (CorniceOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableCorniceDetail = CorniceOrderDetailsService.get({'id': $stateParams.corniceDetailId});
            $scope.deleteCorniceDetail = function (corniceOrderDetail) {
                console.log("Filler Order Detail :%O", corniceOrderDetail);
                corniceOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableCorniceDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('HandleDetailDeleteController', function (HandleOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableHandleDetail = HandleOrderDetailsService.get({'id': $stateParams.handleDetailId});
            $scope.deleteHandleDetail = function (handleOrderDetail) {
                console.log("Handle Order Detail :%O", handleOrderDetail);
                handleOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableHandleDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('HardwareDetailDeleteController', function (HardwareOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableHardwareDetail = HardwareOrderDetailsService.get({'id': $stateParams.hardwareDetailId});
            $scope.deleteHardwareDetail = function (hardwareOrderDetail) {
                console.log("Handle Order Detail :%O", hardwareOrderDetail);
                hardwareOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableHardwareDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('ShutterDetailDeleteController', function (ShutterOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableShutterDetail = ShutterOrderDetailsService.get({'id': $stateParams.shutterDetailId});
            $scope.deleteShutterDetail = function (shutterOrderDetail) {
                console.log("Shutter Order Detail :%O", shutterOrderDetail);
                shutterOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableShutterDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('DrawerDetailDeleteController', function (DrawerOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableDrawerDetail = DrawerOrderDetailsService.get({'id': $stateParams.drawerDetailId});
            $scope.deleteDrawerDetail = function (drawerOrderDetail) {
                console.log("Drawer Order Detail :%O", drawerOrderDetail);
                drawerOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $scope.editableDrawerDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('OrderHistoryController', function (PartyService, OrderHeadService, UserService, $scope, $stateParams, $rootScope, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.currentUser = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
                console.log("THis is User Object :%O", userObject);
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminBackButton = true;
                    $scope.dealerBackButton = false;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                }
                $scope.orderHeadList = OrderHeadService.findOrderGenerationSource({
                    'userId': userObject.id
                }, function (orderHeadList) {
                    console.log("Order Head List :%O", orderHeadList);
                    angular.forEach(orderHeadList, function (orderHeadObject) {
                        orderHeadObject.billingPartyObject = PartyService.get({
                            'id': orderHeadObject.billingPartyId
                        });
                        orderHeadObject.deliveryPartyObject = PartyService.get({
                            'id': orderHeadObject.deliveryPartyId
                        });
                    });
                });
                console.log("Order Head List :%O", $scope.orderHeadList);
            });
        })
        .controller('DealerOrderDetailsController', function (DrawerOrderDetailsService, ShutterOrderDetailsService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, SectionProfileService, FinishPriceService, RawMaterialService, KitchenComponentService, ColorService, CarcassOrderDetailsService, SegmentService, PartyService, OrderHeadService, OrderDetailsService, $scope, $filter, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (party) {
                    $scope.party = party;
                });
                SegmentService.findBySegment({
                    'segment': orderHeadObject.segment
                }, function (segment) {
                    $scope.segment = segment;
                });
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });
            $scope.carcassDetailsList = CarcassOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (carcassOrderList) {
                console.log("Carcass Order List :%O", carcassOrderList);
                angular.forEach($scope.carcassDetailsList, function (carcassDetailObject) {
                    carcassDetailObject.rightColorObject = ColorService.get({
                        'id': carcassDetailObject.rightColorId
                    });
                    carcassDetailObject.leftColorObject = ColorService.get({
                        'id': carcassDetailObject.leftColorId
                    });
                    carcassDetailObject.topColorObject = ColorService.get({
                        'id': carcassDetailObject.topColorId
                    });
                    carcassDetailObject.bottomColorObject = ColorService.get({
                        'id': carcassDetailObject.bottomColorId
                    });
                    carcassDetailObject.backColorObject = ColorService.get({
                        'id': carcassDetailObject.backColorId
                    });
                    carcassDetailObject.internalColorObject = ColorService.get({
                        'id': carcassDetailObject.intColorId
                    });
                    if (carcassDetailObject.sectionProfileId !== 'NULL') {
                        carcassDetailObject.sectionProfileObject = SectionProfileService.get({
                            'id': carcassDetailObject.sectionProfileId
                        });
                    }

                    carcassDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': carcassDetailObject.component
                    });
                    carcassDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': carcassDetailObject.material
                    });
                    if (carcassDetailObject.sideFinish !== '0') {
                        carcassDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                            'finishCode': carcassDetailObject.sideFinish
                        });
                    }
                });
            });
            $scope.panelDetailsList = PanelOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (panelOrderList) {
                angular.forEach($scope.panelDetailsList, function (panelDetailObject) {
                    panelDetailObject.colorObject = ColorService.get({
                        'id': panelDetailObject.colorId
                    });
                    panelDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': panelDetailObject.component
                    });
                    panelDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': panelDetailObject.material
                    });
                });
            });
            $scope.fillerDetailsList = FillerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (fillerOrderList) {
                angular.forEach($scope.fillerDetailsList, function (fillerDetailObject) {
                    fillerDetailObject.colorObject = ColorService.get({
                        'id': fillerDetailObject.colorId
                    });
                    fillerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': fillerDetailObject.component
                    });
                    fillerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': fillerDetailObject.material
                    });
                    fillerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': fillerDetailObject.finish
                    });
                });
            });
            $scope.pelmetDetailsList = PelmetOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (pelmetOrderList) {
                angular.forEach($scope.pelmetDetailsList, function (pelmetDetailObject) {
                    pelmetDetailObject.colorObject = ColorService.get({
                        'id': pelmetDetailObject.colorId
                    });
                    pelmetDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': pelmetDetailObject.component
                    });
                    pelmetDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': pelmetDetailObject.material
                    });
                    pelmetDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': pelmetDetailObject.finish
                    });
                });
            });
            $scope.corniceDetailsList = CorniceOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (corniceOrderList) {
                angular.forEach($scope.corniceDetailsList, function (corniceDetailObject) {
                    corniceDetailObject.colorObject = ColorService.get({
                        'id': corniceDetailObject.colorId
                    });
                    corniceDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': corniceDetailObject.component
                    });
                    corniceDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': corniceDetailObject.material
                    });
                    corniceDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': corniceDetailObject.finish
                    });
                });
            });
            $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (handleOrderList) {
                angular.forEach($scope.handleDetailsList, function (handleDetailObject) {
                    handleDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': handleDetailObject.component
                    });
                });
            });
            $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (shutterOrderList) {
                angular.forEach($scope.shutterDetailsList, function (shutterDetailObject) {
                    shutterDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': shutterDetailObject.component
                    });
                    shutterDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': shutterDetailObject.material
                    });
                    shutterDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': shutterDetailObject.finish
                    });
                    shutterDetailObject.colorObject = ColorService.get({
                        'id': shutterDetailObject.colorId
                    });
                });
            });
            $scope.drawerDetailsList = DrawerOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (drawerOrderList) {
                angular.forEach($scope.drawerDetailsList, function (drawerDetailObject) {
                    drawerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': drawerDetailObject.component
                    });
                    drawerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': drawerDetailObject.material
                    });
                    drawerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': drawerDetailObject.finish
                    });
                    drawerDetailObject.colorObject = ColorService.get({
                        'id': drawerDetailObject.colorId
                    });
                });
            });
        });
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


