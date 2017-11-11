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
        .controller('OrderDetailsController', function (RawMaterialService, StandardCarcassDimensionService, OrderDetailsService, OrderHeadService, SaleTypeService, SegmentService, PartyService, UserService, EmployeeService, $scope, $stateParams, $rootScope, $state, KitchenComponentService) {
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
                $scope.saveOrderDetail(orderDetail);
            };

            //////////////Save Functions for All Components/////////////
            $scope.saveOrderDetail = function (orderDetail) {
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
                console.log("Main Order Detail :%O", orderDetail);
                OrderDetailsService.save(orderDetail, function () {
                    $scope.editableCarcassDetail = "";
                    $scope.carcaseName = "";
                    $scope.refreshList();
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
            ///////////////////End//////////////////////////////////////

        })
        .controller('ProformaInvoiceDisplayController', function (PartyService, OrderHeadService, OrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentDate = new Date();
            OrderHeadService.get({
               'id': $stateParams.orderHeadId 
            }, function(orderHeadObject){
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id':orderHeadObject.billingPartyId
                }, function(billingPartyObject){
                    $scope.billingParty = billingPartyObject;
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


