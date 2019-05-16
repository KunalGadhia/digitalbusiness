/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.custom_invoice", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('custom_invoice_i3space', {
                'url': '/:dealerInvoiceId/:orderHeadId/i3_space',
                'templateUrl': templateRoot + '/custom_invoice/i3_space.html',
                'controller': 'I3InvoiceController'
            });
        })
        .controller('I3InvoiceController', function (DealerSkuOrderDetailsService, InfinityWardrobeOrderDetailsService, UltimaWardrobeOrderDetailsService, UltimaWardrobeService, InfinityWardrobeService, MaxWardrobeOrderDetailsService, MaxWardrobeService, CarcassSubtypeService, MaxKitchenOrderDetailsService, HardwareOrderDetailsService, DrawerOrderDetailsService, ShutterOrderDetailsService, HandleOrderDetailsService, HandlePriceService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, PanelOrderDetailsService, SectionProfileService, FinishPriceService, RawMaterialService, KitchenComponentService, ColorService, CarcassOrderDetailsService, SegmentService, PartyService, OrderHeadService, OrderDetailsService, DealerInvoiceDetailsService, $scope, $stateParams, $state, paginationLimit) {
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
            var maxKitchenTotalPrice = 0;
            var maxWardrobeTotalPrice = 0;
            var infinityWardrobeTotalPrice = 0;
            var ultimaWardrobeTotalPrice = 0;
            var otherHardwareTotalPrice = 0;
            $scope.componentTotalList = [];
            $scope.mainInvoiceList = [];
            $scope.showCgst = false;
            $scope.showIgst = false;
            $scope.gstObject = {};
            if ($scope.mainInvoiceList.length === 0) {
                console.log("Initial Length 0");
                $scope.srNo = 0;
            }

            DealerInvoiceDetailsService.get({
                'id': $stateParams.dealerInvoiceId
            }, function (dealerInvoiceObject) {
                console.log("Dealer Invoice Object :%O", dealerInvoiceObject);
                $scope.dealerInvoice = dealerInvoiceObject;
            });

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
            $scope.maxKitchenDetailsList = MaxKitchenOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxKitchenOrderList) {
                angular.forEach($scope.maxKitchenDetailsList, function (maxKitchenDetailObject) {
                    totalPrice = totalPrice + maxKitchenDetailObject.price;
                    maxKitchenTotalPrice = maxKitchenTotalPrice + maxKitchenDetailObject.price;
                    $scope.mainInvoiceList.push(maxKitchenDetailObject);
                });
                $scope.maxKitchenTotalPrice = maxKitchenTotalPrice;
                $scope.captureTotal($scope.maxKitchenTotalPrice);
            });
            $scope.maxWardrobeDetailsList = MaxWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxWardrobeOrderList) {
                angular.forEach($scope.maxWardrobeDetailsList, function (maxWardrobeDetailObject) {
                    totalPrice = totalPrice + maxWardrobeDetailObject.price;
                    maxWardrobeTotalPrice = maxWardrobeTotalPrice + maxWardrobeDetailObject.price;
                    $scope.mainInvoiceList.push(maxWardrobeDetailObject);
                });
                $scope.maxWardrobeTotalPrice = maxWardrobeTotalPrice;
                $scope.captureTotal($scope.maxWardrobeTotalPrice);
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
            ///////////////////////New Offerings/////////////////
            $scope.infinityWardrobeOrderDetailList = InfinityWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function () {
                angular.forEach($scope.infinityWardrobeOrderDetailList, function (infinityWardrobeDetailObject) {
                    totalPrice = totalPrice + infinityWardrobeDetailObject.price;
                    infinityWardrobeTotalPrice = infinityWardrobeTotalPrice + infinityWardrobeDetailObject.price;
                    $scope.mainInvoiceList.push(infinityWardrobeDetailObject);
                });
                $scope.infinityWardrobeTotalPrice = infinityWardrobeTotalPrice;
                $scope.captureTotal($scope.infinityWardrobeTotalPrice);
            });

            $scope.ultimaWardrobeOrderDetailList = UltimaWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function () {
                angular.forEach($scope.ultimaWardrobeOrderDetailList, function (ultimaWardrobeDetailObject) {
                    totalPrice = totalPrice + ultimaWardrobeDetailObject.price;
                    ultimaWardrobeTotalPrice = ultimaWardrobeTotalPrice + ultimaWardrobeDetailObject.price;
                    $scope.mainInvoiceList.push(ultimaWardrobeDetailObject);
                });
                $scope.ultimaWardrobeTotalPrice = ultimaWardrobeTotalPrice;
                $scope.captureTotal($scope.ultimaWardrobeTotalPrice);
            });
            $scope.dealerSkuMrpOrders = DealerSkuOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (dealerSkuMrpOrdersList) {
                console.log("Dealer SKU MRP Order List :%O", dealerSkuMrpOrdersList);
                angular.forEach($scope.dealerSkuMrpOrders, function (dealerSkuObject) {
                    totalPrice = totalPrice + dealerSkuObject.price;
                    otherHardwareTotalPrice = otherHardwareTotalPrice + dealerSkuObject.price;
                    $scope.mainInvoiceList.push(dealerSkuObject);
                });
                $scope.otherHardwareTotalPrice = otherHardwareTotalPrice;
                $scope.captureTotal($scope.otherHardwareTotalPrice);
            });
            /////////////////////////////////////////////////////
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
                $scope.discountCharges = Math.round(((($scope.getTotal + $scope.orderHead.transportationCharges + $scope.orderHead.loadingUnloadingCharges + $scope.orderHead.installationCharges + $scope.orderHead.otherCharges) / 100) * $scope.orderHead.discount));
                $scope.orderValueWithoutDiscount = Math.round(($scope.getTotal + $scope.orderHead.transportationCharges + $scope.orderHead.loadingUnloadingCharges + $scope.orderHead.installationCharges + $scope.orderHead.otherCharges));
                $scope.orderTotal = (($scope.getTotal + $scope.orderHead.transportationCharges + $scope.orderHead.loadingUnloadingCharges + $scope.orderHead.installationCharges + $scope.orderHead.otherCharges) - $scope.discountCharges);
                console.log("$scope.orderHead :%O", $scope.orderHead);
                if($scope.dealerInvoice.tax === 'SCGST'){
                    console.log("STate Party Apply SGST & CGST");
                        $scope.cgst = Math.round((($scope.orderTotal / 100) * 9));
                        $scope.sgst = Math.round((($scope.orderTotal / 100) * 9));
                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.cgst + $scope.sgst));
                        $scope.showCgst = true;
                        $scope.showIgst = false;
                        console.log("Net AMount MS:%O" + $scope.netAmount);
                }else if($scope.dealerInvoice.tax === 'IGST'){
                    console.log("Other State Party Apply IGST");
                        $scope.igst = Math.round((($scope.orderTotal / 100) * 18));
                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.igst));
                        $scope.showCgst = false;
                        $scope.showIgst = true;
                        console.log("Net AMount OMS:%O" + $scope.netAmount);
                }
//                PartyService.get({
//                    'id': $scope.orderHead.billingPartyId
//                }, function (partyObject) {
//                    console.log("Party Object :%O", partyObject);
//                    if (partyObject.state === "MS") {
//                        console.log("STate Party Apply SGST & CGST");
//                        $scope.cgst = Math.round((($scope.orderTotal / 100) * 9));
//                        $scope.sgst = Math.round((($scope.orderTotal / 100) * 9));
//                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.cgst + $scope.sgst));
//                        $scope.showCgst = true;
//                        $scope.showIgst = false;
//                        console.log("Net AMount MS:%O" + $scope.netAmount);
//                    } else if (partyObject.state === "OMS") {
//                        console.log("Other State Party Apply IGST");
//                        $scope.igst = Math.round((($scope.orderTotal / 100) * 18));
//                        $scope.netAmount = Math.round(($scope.orderTotal + $scope.igst));
//                        $scope.showCgst = false;
//                        $scope.showIgst = true;
//                        console.log("Net AMount OMS:%O" + $scope.netAmount);
//                    }
//
//                });
            };
        });
        