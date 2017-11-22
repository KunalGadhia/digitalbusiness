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
        .controller('OrderDetailsController', function (RawMaterialService, SectionProfileService, FinishPriceService, CarcassOrderDetailsService, ColorService, ColorConstraintService, StandardCarcassPriceService, StandardCarcassDimensionService, OrderDetailsService, OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, KitchenComponentService) {
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
                $scope.showCarcassColorSelectionWidget = false;
                $scope.showCarcassSidesColorSelectionWidget = false;
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
                    $scope.carcaseName = kcObject.component;
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
            ////////////////Carcass Form Functionality//////////////////////////////
            $scope.carcassStdList;
            $scope.$watch('carcaseName', function (carcassName) {
                $scope.typeLike;
                if (carcassName === "Wall Carcase") {
                    $scope.typeLike = "Wall";
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;
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

                } else if (carcassName === "Base Carcase") {
                    $scope.typeLike = "Base C";
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
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
                } else if (carcassName === "Tall Carcase") {
                    $scope.typeLike = "Tall";
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;

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
                } else if (carcassName === "Base-Blind Carcase") {
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
//                    $scope.showASM = false;
                    console.log("Carcass Name :%O", $scope.carcaseName);
                    if ($scope.carcaseName === "Base Carcase" || $scope.carcaseName === "Sink Carcass" || $scope.carcaseName === "Microwave Carcase") {
                        if (sideMatching === "O") {
                            $scope.showOSM = true;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
//                        $scope.showASM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
//                        $scope.showASM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
//                        $scope.showASM = true;
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
//                        $scope.showASM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
//                        $scope.showASM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = true;
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
                    }

                });
                $scope.$watch('editableCarcassDetail.sideSelection', function (selectedSide) {
                    console.log("Selected Side :%O", selectedSide);
                    if (selectedSide === "LSM") {
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "RSM") {
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "TSM") {
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "BSM") {
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "LRSM") {
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRTSM") {
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRBSM") {
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "ASM") {
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = true;
                    } else {
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    }
                });
                $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                    if (shelfValue === true) {
                        StandardCarcassPriceService.findCarcassWithShelfByCT({
                            'carcassType': $scope.typeLike
                        }, function (stdListRefined) {
                            $scope.carcassStdList = stdListRefined;
                        });
                    } else if (shelfValue === false) {
                        StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                            'carcassType': $scope.typeLike
                        }, function (stdListRefined) {
                            $scope.carcassStdList = stdListRefined;
                        });
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
                    FinishPriceService.findByMaterialId({
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
                var productCode = orderDetail.component + "" + orderDetail.w + "" + orderDetail.l + "" + orderDetail.d + "18" + orderDetail.material + "-" + l1 + "" + w1 + "18" + d1;
                orderDetail.productCode = productCode;
                console.log("Product Code :%O", productCode);

                var totalArea = 0;
                var basicArea = 0;
                var basicSqMt = 0;
                var extraArea = 0;
                var extraSqMt = 0;
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
                            basicArea = p1 + p2 + p3;
                            extraArea = p1;
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== null) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            console.log("Profile Price :%O", profilePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));

                            orderDetail.price = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.price);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2 + p3;
                            extraArea = p2;
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== null) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            console.log("Profile Price :%O", profilePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                            orderDetail.price = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.price);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        console.log("Both Matching Carcass");
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1 + p2;
                        extraArea = p3;
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                        orderDetail.price = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.price);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);

                        basicArea = p1 + p2;
                        extraArea = p3 + p4;
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
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
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                        orderDetail.price = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.price);
                    } else {
                        console.log("Regular");
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        totalArea = basicSqMt;
                        console.log("Total Area Regular :%O", totalArea);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        orderDetail.price = ((orderDetail.standardPrice * orderDetail.quantity) + profilePrice);
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
                            basicArea = p1 + p2 + p3;
                            extraArea = p1;
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== null) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            console.log("Profile Price :%O", profilePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));

                            orderDetail.price = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.price);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2 + p3;
                            extraArea = p2;
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== null) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            console.log("Profile Price :%O", profilePrice);
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                            orderDetail.price = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.price);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        console.log("Both Matching Carcass");
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1 + p2;
                        extraArea = p3;
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                        orderDetail.price = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.price);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);

                        basicArea = p1 + p2;
                        extraArea = p3 + p4;
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
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
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice));
                        orderDetail.price = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.price);
                    } else {
                        console.log("Regular");
                        console.log("Order Details :%O", orderDetail);
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        totalArea = basicSqMt;
                        console.log("Std Material Price :%O", orderDetail.stdMaterialPrice);
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        console.log("Area Price :%O", basicAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== null) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        console.log("Profile Price :%O", profilePrice);
                        var finalPrice = ((orderDetail.quantity * basicAreaPrice) + profilePrice);
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
//                    $scope.carcaseName = "";
//                    $scope.refreshList();
//                });
                console.log("FInal Save :%O", orderDetail);
                CarcassOrderDetailsService.save(orderDetail, function () {
                    console.log("Saved Successfully");
                    $scope.editableCarcassDetail = "";
                    $scope.carcaseName = "";
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
                panelOrderDetail.component = $scope.panelComponent;
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

                var productCode = panelOrderDetail.component + "-18" + panelOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                panelOrderDetail.productCode = productCode;
                panelOrderDetail.orderHeadId = $stateParams.orderHeadId;
                OrderDetailsService.save(panelOrderDetail, function () {
                    $scope.editablePanelDetail = "";
                    $scope.panelName = "";
                    $scope.refreshList();
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
                var productCode = shutterOrderDetail.component + "-18" + shutterOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                shutterOrderDetail.productCode = productCode;
                OrderDetailsService.save(shutterOrderDetail, function () {
                    $scope.editableShutterDetail = "";
                    $scope.shutterName = "";
                    $scope.refreshList();
                });
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
                fillerOrderDetail.component = $scope.fillerComponent;
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
                var productCode = fillerOrderDetail.component + "-18" + fillerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                fillerOrderDetail.productCode = productCode;
                OrderDetailsService.save(fillerOrderDetail, function () {
                    $scope.editableFillerDetail = "";
                    $scope.fillerName = "";
                    $scope.refreshList();
                });
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
                var productCode = pelmetOrderDetail.component + "-18" + pelmetOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                pelmetOrderDetail.productCode = productCode;
                OrderDetailsService.save(pelmetOrderDetail, function () {
                    $scope.editablePelmetDetail = "";
                    $scope.pelmetName = "";
                    $scope.refreshList();
                });
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
                var productCode = corniceOrderDetail.component + "-18" + corniceOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                corniceOrderDetail.productCode = productCode;
                OrderDetailsService.save(corniceOrderDetail, function () {
                    $scope.editableCorniceDetail = "";
                    $scope.corniceName = "";
                    $scope.refreshList();
                });
            };
            $scope.saveHandleDetails = function (handleOrderDetail) {
                handleOrderDetail.orderHeadId = $stateParams.orderHeadId;
                handleOrderDetail.component = $scope.handleComponent;
                handleOrderDetail.depth = '0';
                handleOrderDetail.width = '0';
                handleOrderDetail.material = '';
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
                var productCode = handleOrderDetail.component + "" + handleOrderDetail.material + "" + l1 + "MM";
                handleOrderDetail.productCode = productCode;
                OrderDetailsService.save(handleOrderDetail, function () {
                    $scope.editableHandleDetail = "";
                    $scope.handleName = "";
                    $scope.refreshList();
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
                });
            });
            ///////////////////End//////////////////////////////////////

        }
        )
        .controller('ProformaInvoiceDisplayController', function (PartyService, OrderHeadService, OrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentDate = new Date();
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (billingPartyObject) {
                    $scope.billingParty = billingPartyObject;
                });
            });

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


