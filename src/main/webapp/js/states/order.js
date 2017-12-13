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
            $stateProvider.state('admin.masters_order_details.shutter_delete', {
                'url': '/:shutterDetailId/shutter/delete',
                'templateUrl': templateRoot + '/masters/order/shutter_detail_delete.html',
                'controller': 'ShutterDetailDeleteController'
            });            
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
                OrderHeadService.save(orderHead, function (orderH) {
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };


        })
        .controller('OrderDetailsController', function (ShutterOrderDetailsService, ShutterFinishPriceService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, PanelMaterialThicknessService, RawMaterialService, CarcassSubtypeService, SectionProfileService, FinishPriceService, CarcassOrderDetailsService, ColorService, ColorConstraintService, StandardCarcassPriceService, StandardCarcassDimensionService, OrderDetailsService, OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, KitchenComponentService) {
            $scope.editableCarcassDetail = {};
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
            $scope.showShutterHandleSelectionWidget = false;
            $scope.showPanelColorSelectionWidget = false;

            $scope.closeWidget = function () {
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
            };
            $scope.openDrawer = function () {
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
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        $scope.carcassStdList = stdList;
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
                        StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                            'carcassType': $scope.typeLike
                        }, function (stdListRefined) {
                            $scope.carcassStdList = stdListRefined;
                        });
                        $scope.editableCarcassDetail.shelfCount = 0;
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
            $scope.selectInternalCarcassColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCarcassDetail.intColorId = colorId;
                $scope.intColorName = colorName;
            };
            $scope.selectSideCarcassColor = function (colorId, colorName) {
                console.log("Getting Side Name in Select ?? :%O", $scope.sideName);
                var side = $scope.sideName;
                if (side === "Left") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.leftColorId = colorId;
                    $scope.leftColorName = colorName;
                } else if (side === "Right") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.rightColorId = colorId;
                    $scope.rightColorName = colorName;
                } else if (side === "Back") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.backColorId = colorId;
                    $scope.backColorName = colorName;
                } else if (side === "Top") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.topColorId = colorId;
                    $scope.topColorName = colorName;
                } else if (side === "Bottom") {
                    $scope.closeWidget();
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

            $scope.selectPanelColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePanelDetail.colorId = colorId;
                $scope.panelColorName = colorName;
            };

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
            $scope.openFillerColorWidget = function () {
                $scope.showFillerColorSelectionWidget = true;
            };

            $scope.selectFillerColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableFillerDetail.colorId = colorId;
                $scope.fillerColorName = colorName;
            };

            $scope.$watch('editableFillerDetail.material', function (material) {
                console.log("Side Material :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (materialObject) {
                    console.log("Material Object :%O", materialObject);
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        console.log("FInish List :%O", finishList);
                        $scope.fillerFinishList = finishList;
                    });
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (fillerThicknessObject) {
                    console.log("Filler Thickness Object :%O", fillerThicknessObject);
                    $scope.fillerThicknessList = fillerThicknessObject;
                });
            });
            $scope.showFillerBsm = false;
            $scope.$watch('editableFillerDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    $scope.editableFillerDetail.finishPrice = finishObject.price;
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
            ///////////////////////////////////////////////////////////////////
            /////////////////Pelmet Form Functionality/////////////////////////
            $scope.showPelmetColorSelectionWidget = false;
            $scope.openPelmetColorWidget = function () {
                $scope.showPelmetColorSelectionWidget = true;
            };

            $scope.selectPelmetColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePelmetDetail.colorId = colorId;
                $scope.pelmetColorName = colorName;
            };

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
//            $scope.showFillerBsm = false;
            $scope.$watch('editablePelmetDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    $scope.editablePelmetDetail.finishPrice = finishObject.price;
                });
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
            ///////////////////////////////////////////////////////////////////
            ///////////////////Cornice Form Functionality//////////////////////
            $scope.showCorniceColorSelectionWidget = false;
            $scope.openCorniceColorWidget = function () {
                $scope.showCorniceColorSelectionWidget = true;
            };

            $scope.selectCorniceColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCorniceDetail.colorId = colorId;
                $scope.corniceColorName = colorName;
            };

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
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    $scope.editableCorniceDetail.finishPrice = finishObject.price;
                });
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
            $scope.shutterModelSelection = false;
            $scope.openShutterColorWidget = function () {
                $scope.showShutterColorSelectionWidget = true;
            };

            $scope.openShutterHandle = function () {
                KitchenComponentService.findByCategory({
                    'category': 'HANDLE'
                }, function (handleList) {
                    $scope.shutterHandleList1 = handleList;
                });
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

            $scope.selectShutterColor = function (colorId, colorName) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableShutterDetail.colorId = colorId;
                $scope.shutterColorName = colorName;
            };
            $scope.shutterFinishList = [];
//            $scope.shutterFinishList = FinishPriceService.findAllList();
            ShutterFinishPriceService.findUniqueFinish(function (finishList) {
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

            $scope.$watch('editableShutterDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
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
                        $scope.shutterModelSelection = true;
                    } else {
                        $scope.shutterModelSelection = false;
                        $scope.editableShutterDetail.component = '';
                        $scope.shutterName = '';
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
            ///////////////////////////////////////////////////////////////////
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
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice));

                            orderDetail.price = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.price);
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
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice));
                            orderDetail.price = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice));
                        orderDetail.price = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.price);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;

                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.price);

                    } else {
                        console.log("Regular");
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        totalArea = basicSqMt;
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXX-" + l1 + "" + w1 + "18" + d1;
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
                        orderDetail.price = ((orderDetail.standardPrice + profilePrice) * orderDetail.quantity);
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
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice));

                            orderDetail.price = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.price);
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
                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice));
                            orderDetail.price = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.price);
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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.price);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;

                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice));
                        orderDetail.price = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.price);

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
                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "XXXX-" + l1 + "" + w1 + "18" + d1;
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
                        var finalPrice = ((profilePrice + basicAreaPrice + backAreaPrice + shelfPrice) * orderDetail.quantity);
                        orderDetail.price = finalPrice;
                        console.log("Total Area Regular :%O", totalArea);
                        console.log("Total Price Regular :%O", orderDetail.price);

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
                console.log("FInal Save :%O", orderDetail);
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

            };
            $scope.savePanelDetails = function (panelOrderDetail) {
//                panelOrderDetail.component = $scope.panelComponent;
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

                var productCode = panelOrderDetail.component + "" + panelOrderDetail.thickness + "" + panelOrderDetail.material + "XXXX-" + l1 + "" + w1 + "" + panelOrderDetail.thickness + "000";
                panelOrderDetail.productCode = productCode;
                panelOrderDetail.orderHeadId = $stateParams.orderHeadId;
                var basicArea = (panelOrderDetail.width * panelOrderDetail.length);
                var basicAreaSqMt = basicArea / 1000000;
                panelOrderDetail.price = (panelOrderDetail.quantity * (basicAreaSqMt * panelOrderDetail.materialPrice));
                console.log("Panel Details :%O", panelOrderDetail);
                PanelOrderDetailsService.save(panelOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editablePanelDetail = "";
                    $scope.panelName = "";
//                    $scope.refreshList();
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };
            $scope.saveShutterDetails = function (shutterOrderDetail) {
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
                    var productCode = shutterOrderDetail.component + "X-" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                } else {
                    var productCode = "SHUTTER-" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "X" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                }
                var shutterArea = (shutterOrderDetail.length * shutterOrderDetail.width);
                var shutterAreaSqMt = (shutterArea / 1000000);
                console.log("Shutter Area Sq Mt :%O", shutterAreaSqMt);
                if (shutterOrderDetail.handle === "HAN-EP01") {
                    var meterLength = (shutterOrderDetail.handleLength / 1000);
                    shutterOrderDetail.handleMainPrice = (meterLength * shutterOrderDetail.handlePrice);
                } else {
                    shutterOrderDetail.handleMainPrice = shutterOrderDetail.handlePrice;
                }

                if (shutterOrderDetail.handle === undefined) {
                    shutterOrderDetail.handleMainPrice = 0;
                }
                console.log("Handle Price :%O", shutterOrderDetail.handleMainPrice);

                if (shutterOrderDetail.bsm === true) {
                    console.log("Both Side");
                    shutterOrderDetail.price = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdBothSidePrice) + shutterOrderDetail.handleMainPrice));
                } else if (shutterOrderDetail.bsm === undefined) {
                    console.log("One Side");
                    shutterOrderDetail.price = (shutterOrderDetail.quantity * ((shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice) + shutterOrderDetail.handleMainPrice));
                }

                shutterOrderDetail.productCode = productCode;
                console.log("Shutter Save Object :%O", shutterOrderDetail);
                ShutterOrderDetailsService.save(shutterOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editableShutterDetail = "";
                    $scope.shutterName = "";
                    $scope.shutterColorName = "";
                    $scope.shutterHandleName = "";
//                    $scope.refreshList();
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
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
                var productCode = drawerOrderDetail.component + "-18" + drawerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                drawerOrderDetail.productCode = productCode;
                OrderDetailsService.save(drawerOrderDetail, function () {
                    $scope.editableDrawerDetail = "";
                    $scope.drawerName = "";
                    $scope.refreshList();
                });
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
                if (fillerOrderDetail.bsm !== undefined) {
                    console.log("Both SIde Colored");
                    fillerOrderDetail.price = (fillerOrderDetail.quantity * (2 * (fillerAreaSqMt * fillerOrderDetail.finishPrice)));
                } else if (fillerOrderDetail.bsm === undefined) {
                    console.log("Regular");
                    fillerOrderDetail.price = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.finishPrice));
                }
                console.log("FInal Price :" + fillerOrderDetail.price);
//                fillerOrderDetail.price = finalPrice;

//                var productCode = fillerOrderDetail.component + "-18" + fillerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                var productCode = fillerOrderDetail.component + "" + fillerOrderDetail.thickness + "" + fillerOrderDetail.material + "X" + fillerOrderDetail.finish + "-" + l1 + "" + w1 + "" + fillerOrderDetail.thickness + "000";
                fillerOrderDetail.productCode = productCode;
                console.log("Filler Save Object :%O", fillerOrderDetail);
                FillerOrderDetailsService.save(fillerOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editablePanelDetail = "";
                    $scope.fillerColorName = "";
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
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
                pelmetOrderDetail.price = (pelmetOrderDetail.quantity * (pelmetAreaSqMt * pelmetOrderDetail.finishPrice));
                console.log("Pelmet Price :%O", pelmetOrderDetail.price);
                var productCode = pelmetOrderDetail.component + "" + pelmetOrderDetail.thickness + "" + pelmetOrderDetail.material + "X" + pelmetOrderDetail.finish + "-" + l1 + "" + w1 + "" + pelmetOrderDetail.thickness + "000";
                pelmetOrderDetail.productCode = productCode;
                console.log("Pelmet Save Object :%O", pelmetOrderDetail);
                PelmetOrderDetailsService.save(pelmetOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editablePelmetDetail = "";
                    $scope.pelmetColorName = "";
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
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
                corniceOrderDetail.price = (corniceOrderDetail.quantity * (corniceAreaSqMt * corniceOrderDetail.finishPrice));
                console.log("Final Price :%O", corniceOrderDetail.price);
//                var productCode = corniceOrderDetail.component + "-18" + corniceOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                var productCode = corniceOrderDetail.component + "" + corniceOrderDetail.thickness + "" + corniceOrderDetail.material + "X" + corniceOrderDetail.finish + "-" + l1 + "" + w1 + "" + corniceOrderDetail.thickness + "000";
                corniceOrderDetail.productCode = productCode;
                console.log("Cornice Final Save :%O", corniceOrderDetail);
                CorniceOrderDetailsService.save(corniceOrderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editableCorniceDetail = "";
                    $scope.corniceColorName = "";
                    $state.go('admin.masters_order_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
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
            }, function(sutterOrderList){
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
            ///////////////////End//////////////////////////////////////

        }
        )
        .controller('ProformaInvoiceDisplayController', function (ShutterOrderDetailsService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, SectionProfileService, FinishPriceService, RawMaterialService, KitchenComponentService, ColorService, CarcassOrderDetailsService, SegmentService, PartyService, OrderHeadService, OrderDetailsService, $scope, $filter, $stateParams, $state, paginationLimit) {
            $scope.currentDate = new Date();
            var carcassTotalPrice = 0;
            var panelTotalPrice = 0;
            $scope.mainInvoiceList = [];
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
                    $scope.mainInvoiceList.push(carcassDetailObject);
//                    console.log("KC Obj :%O", carcassDetailObject.kitchenComponentObject);
                });
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
                    $scope.mainInvoiceList.push(panelDetailObject);
                });
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
                    fillerDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': fillerDetailObject.component
                    });
                    fillerDetailObject.rawMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': fillerDetailObject.material
                    });
                    fillerDetailObject.finishPriceObject = FinishPriceService.findByFinishCode({
                        'finishCode': fillerDetailObject.finish
                    });
                    $scope.mainInvoiceList.push(fillerDetailObject);
                });
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
                    $scope.mainInvoiceList.push(pelmetDetailObject);
                });
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
                    $scope.mainInvoiceList.push(corniceDetailObject);
                });
            });
            $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (handleOrderList) {
                angular.forEach($scope.handleDetailsList, function (handleDetailObject) {
                    handleDetailObject.kitchenComponentObject = KitchenComponentService.findByComponentCode({
                        'componentCode': handleDetailObject.component
                    });
                    $scope.mainInvoiceList.push(handleDetailObject);
                });
            });
            $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
               'orderHeadId': $stateParams.orderHeadId 
            }, function(sutterOrderList){
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
                    $scope.mainInvoiceList.push(shutterDetailObject);
                });
            });
//            $scope.carcassTotal = $filter('total')($scope.carcassDetailsList, 'price');
//            console.log("Carcass Total :" + $scope.carcassTotal);

//            $scope.carcassPrice = CarcassOrderDetailsService.findPriceByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
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

            console.log("Main Invoice List :%O", $scope.mainInvoiceList);
//            OrderHeadService.get({
//                'id': $stateParams.orderHeadId
//            }, function (orderHeadObject) {
//                $scope.orderHead = orderHeadObject;
//                PartyService.get({
//                    'id': orderHeadObject.billingPartyId
//                }, function (billingPartyObject) {
//                    $scope.billingParty = billingPartyObject;
//                });
//            });

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


