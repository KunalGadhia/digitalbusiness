/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.order_mrp", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_order_mrp', {
                'url': '/order_mrp',
                'templateUrl': templateRoot + '/masters/mrp/order_mrp_head.html',
                'controller': 'OrderMrpHeadController'
            });
            $stateProvider.state('admin.masters_order_mrp_details', {
                'url': '/:orderHeadId/order_mrp_details',
                'templateUrl': templateRoot + '/masters/mrp/order_mrp_details.html',
                'controller': 'OrderMrpDetailsController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.dealer_sku_delete', {
                'url': '/:dealerSkuId/dealer_sku_delete',
                'templateUrl': templateRoot + '/masters/mrp/dealer_sku_delete.html',
                'controller': 'SkuOrderMrpDetailsDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.max_kitchen_delete', {
                'url': '/:maxKitchenDetailId/max_kitchen/delete',
                'templateUrl': templateRoot + '/masters/order/max_kitchen_detail_delete.html',
                'controller': 'MaxKitchenDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.max_wardrobe_delete', {
                'url': '/:maxWardrobeDetailId/max_wardrobe/delete',
                'templateUrl': templateRoot + '/masters/order/max_wardrobe_detail_delete.html',
                'controller': 'MaxWardrobeDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order__mrp_details.infinity_wardrobe_delete', {
                'url': '/:infinityWardrobeDetailId/infinty_wardrobe/delete',
                'templateUrl': templateRoot + '/masters/order/infinity_wardrobe_detail_delete.html',
                'controller': 'InfinityWardrobeDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.ultima_wardrobe_delete', {
                'url': '/:ultimaWardrobeDetailId/ultima_wardrobe/delete',
                'templateUrl': templateRoot + '/masters/order/ultima_wardrobe_detail_delete.html',
                'controller': 'UltimaWardrobeDetailDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.infinity_wardrobe_mrp_delete', {
                'url': '/:infinityWardrobeDetailId/infinity_wardrobe_mrp_delete',
                'templateUrl': templateRoot + '/masters/mrp/infinity_wardrobe_mrp_delete.html',
                'controller': 'InfinityWardrobeOrderMrpDetailsDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.max_wardrobe_mrp_delete', {
                'url': '/:maxWardrobeDetailId/max_wardrobe_mrp_delete',
                'templateUrl': templateRoot + '/masters/mrp/max_wardrobe_mrp_delete.html',
                'controller': 'MaxWardrobeOrderMrpDetailsDeleteController'
            });
            $stateProvider.state('mrp_proforma_invoice_display', {
                'url': '/:orderHeadId/mrp/proforma_invoice',
                'templateUrl': templateRoot + '/masters/mrp/proforma_invoice_mrp.html',
                'controller': 'MrpProformaInvoiceDisplayController'
            });
            $stateProvider.state('mrp_customer_proforma_invoice_display', {
                'url': '/:orderHeadId/mrp/customer_proforma_invoice',
                'templateUrl': templateRoot + '/masters/mrp/customer_proforma_invoice_mrp.html',
                'controller': 'MrpCustomerProformaInvoiceDisplayController'
            });
        })

        .controller('OrderMrpHeadController', function (OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableOrderHeadMrp = {};
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.editableOrderHeadMrp.orderInitiatedBy = userObject.id;
            });
            $scope.saveOrderHeadMrp = function (orderHeadMrp) {
                console.log("OrderHeadMrp :%O", orderHeadMrp);
                orderHeadMrp.partyMobileNo = orderHeadMrp.partyMobileNo.toString();
                orderHeadMrp.partyTelephoneNo = orderHeadMrp.partyTelephoneNo.toString();
                OrderHeadMrpService.save(orderHeadMrp, function (orderH) {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };

        })
        .controller('OrderMrpDetailsController', function (UltimaWardrobeService, InfinityWardrobeOrderDetailsService, InfinityWardrobeService, MaxWardrobeOrderDetailsService, MaxWardrobeService, UltimaWardrobeOrderDetailsService, ColorService, ColorConstraintService, FinishPriceService, MaxKitchenService, MaxKitchenOrderDetailsService, DealerSkuOrderDetailsService, UserService, $rootScope, ManufacturerCategoryService, ManufacturerService, DealerSkuService, MaxKitchenMrpOrderDetailsService, MaxWardrobeMrpOrderDetailsService, InfinityWardrobeMrpOrderDetailsService, MaxKitchenMrpService, MaxWardrobeMrpService, InfinityWardrobeMrpService, OrderHeadMrpService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            //////////////To Detect Category Of Current Logged In User//////////
            $scope.user = $rootScope.currentUser;
            $scope.adminLogin = false;
            $scope.dealerLogin = false;
            $scope.showMrpFeature = false;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminLogin = true;
                    $scope.dealerLogin = false;
                    $scope.showMrpFeature = true;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.adminLogin = false;
                    $scope.dealerLogin = true;
                    $scope.showMrpFeature = false;
                } else if (userObject.role === "ROLE_DEALER_PRO") {
                    $scope.adminLogin = false;
                    $scope.dealerLogin = true;
                    $scope.showMrpFeature = true;
                } else if (userObject.role === "ROLE_DEALER_STAFF") {
                    $scope.adminLogin = false;
                    $scope.dealerLogin = true;
                    $scope.showMrpFeature = true;
                }
            });
            ///////////////////////////////////////
            OrderHeadMrpService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderMrpHead = orderHeadObject;
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });
            $scope.updateOrderMrpHead = function (editableOrderMrpHead) {
                console.log("Order Head Mrp Update :%O",editableOrderMrpHead);
                OrderHeadMrpService.get({
                    'id': $stateParams.orderHeadId
                }, function (orderHeadMrpObject) {
                    
                    var infinityWardrobeTotal = parseInt($("#infinityWardrobeTotal").val());
                    var ultimaWardrobeTotal = parseInt($("#ultimaWardrobeTotal").val());
                    var maxKitchenTotal = parseInt($("#maxKitchenTotal").val());
                    var maxWardrobeTotal = parseInt($("#maxWardrobeTotal").val());
                    $scope.discountPrice = ((infinityWardrobeTotal + ultimaWardrobeTotal + maxKitchenTotal + maxWardrobeTotal + editableOrderMrpHead.transportationCharges + editableOrderMrpHead.loadingUnloadingCharges + editableOrderMrpHead.installationCharges + editableOrderMrpHead.otherCharges) * (editableOrderMrpHead.discount / 100));
                    $scope.totalOrderPrice = ((infinityWardrobeTotal + ultimaWardrobeTotal + maxKitchenTotal + maxWardrobeTotal + editableOrderMrpHead.transportationCharges + editableOrderMrpHead.loadingUnloadingCharges + editableOrderMrpHead.installationCharges + editableOrderMrpHead.otherCharges) - ($scope.discountPrice));
                    $scope.cgst = (($scope.totalOrderPrice / 100) * 9);
                    $scope.sgst = (($scope.totalOrderPrice / 100) * 9);
                    $scope.netTotalAmount = Math.round(($scope.totalOrderPrice + $scope.cgst + $scope.sgst));
                    orderHeadMrpObject.orderAmount = $scope.totalOrderPrice;
                    orderHeadMrpObject.cgstAmount = Math.round($scope.cgst);
                    orderHeadMrpObject.sgstAmount = Math.round($scope.sgst);
                    orderHeadMrpObject.igstAmount = 0;
                    orderHeadMrpObject.netAmount = $scope.netTotalAmount;
                    orderHeadMrpObject.transportationCharges = editableOrderMrpHead.transportationCharges;
                    orderHeadMrpObject.loadingUnloadingCharges = editableOrderMrpHead.loadingUnloadingCharges;
                    orderHeadMrpObject.installationCharges = editableOrderMrpHead.installationCharges;
                    orderHeadMrpObject.otherCharges = editableOrderMrpHead.otherCharges;
                    orderHeadMrpObject.discount = editableOrderMrpHead.discount;
                    orderHeadMrpObject.mrpRampupPercentage = editableOrderMrpHead.mrpRampupPercentage;
                    orderHeadMrpObject.mrpRampupFactor = (editableOrderMrpHead.mrpRampupPercentage / 100);
                    if ($scope.adminLogin === true) {
                        orderHeadMrpObject.$save(function () {
                            $state.go('admin.masters', null, {'reload': true});
                        });
                    } else if ($scope.dealerLogin === true) {
                        orderHeadMrpObject.$save(function () {
                            $state.go('admin.dealers', null, {'reload': true});
                        });
                    }

                });
            };
            /////////Select Parent View///////            
            $scope.showMaxSeries = false;
            $scope.showUltimaSeries = false;
            $scope.showInfinitySeries = false;
            $scope.selectParentView = function (parentView) {
                if (parentView === "MAX_SERIES") {
                    console.log("Max Series");
                    $scope.showMaxSeries = true;
                    $scope.showUltimaSeries = false;
                    $scope.showInfinitySeries = false;
                } else if (parentView === "ULTIMA_SERIES") {
                    console.log("Ultima Series");
                    $scope.showMaxSeries = false;
                    $scope.showUltimaSeries = true;
                    $scope.showInfinitySeries = false;
                } else if (parentView === "INFINITY_SERIES") {
                    console.log("Infinity Series");
                    $scope.showMaxSeries = false;
                    $scope.showUltimaSeries = false;
                    $scope.showInfinitySeries = true;
                }
            };
            /////////Select View//////////            
            $scope.showMaxKitchen = false;
            $scope.showMaxWardrobe = false;
            $scope.showMaxBeds = false;
            $scope.showUltimaWardrobe = false;
            $scope.showInfinityWardrobe = false;
            $scope.selectView = function (view) {
                console.log("View :" + view);
                if (view === "MAXKITCHEN") {
                    $scope.showMaxKitchen = true;
                    $scope.showMaxWardrobe = false;
                    $scope.showMaxBeds = false;
                    $scope.showUltimaWardrobe = false;
                    $scope.showInfinityWardrobe = false;
                } else if (view === "MAXWARDROBE") {
                    $scope.showMaxKitchen = false;
                    $scope.showMaxWardrobe = true;
                    $scope.showMaxBeds = false;
                    $scope.showUltimaWardrobe = false;
                    $scope.showInfinityWardrobe = false;
                } else if (view === "MAXBEDS") {
                    $scope.showMaxKitchen = false;
                    $scope.showMaxWardrobe = false;
                    $scope.showMaxBeds = true;
                    $scope.showUltimaWardrobe = false;
                    $scope.showInfinityWardrobe = false;
                } else if (view === "ULTIMAWARDROBE") {
                    $scope.showMaxKitchen = false;
                    $scope.showMaxWardrobe = false;
                    $scope.showMaxBeds = false;
                    $scope.showUltimaWardrobe = true;
                    $scope.showInfinityWardrobe = false;
                } else if (view === "INFINITYWARDROBE") {
                    $scope.showMaxKitchen = false;
                    $scope.showMaxWardrobe = false;
                    $scope.showMaxBeds = false;
                    $scope.showUltimaWardrobe = false;
                    $scope.showInfinityWardrobe = true;
                }
            };
            /////////////////Close Widget////////////////////////////////////
            $scope.closeWidget = function () {
                $scope.showInfinityCarcassColorSelectionWidget = false;
                $scope.showInfinityShutterColorSelectionWidget = false;
                $scope.showUltimaCarcassColorSelectionWidget = false;
                $scope.showUltimaShutterColorSelectionWidget = false;
                $scope.showMaxKitchenShutterColorSelectionWidget = false;
                $scope.preInfinityCarcassColor = {};
                $scope.preInfinityShutterColor = {};
                $scope.preUltimaCarcassColor = {};
                $scope.preUltimaShutterColor = {};
                $scope.preMaxKitchenShutterColor = {};
            };
            /////////////////Max Kitchen Form Functionality////////////////////
            $scope.editableMaxKitchenDetail = {};
            $scope.$watch('editableMaxKitchenDetail.category', function (category) {
                console.log("Category :%O", category);
                if (category === "BASE_SHELF_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MA";
                } else if (category === "BASE_GAS_FRAME_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MB";
                } else if (category === "BASE_CORNER_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MC";
                } else if (category === "BASE_SINK_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MD";
                } else if (category === "BASE_PULLOUT_DRAWER") {
                    $scope.editableMaxKitchenDetail.component = "ME";
                } else if (category === "TALL_UNIT_ACCESSORIES") {
                    $scope.editableMaxKitchenDetail.component = "MF";
                } else if (category === "WALL_SHELF_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MG";
                } else if (category === "WALL_AQGD_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MH";
                } else if (category === "WALL_GLASS_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MI";
                } else if (category === "WALL_CORNER_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MJ";
                } else if (category === "WALL_LIFTUP_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MK";
                } else if (category === "WALL_ROLLUP_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "ML";
                } else if (category === "OPEN_SHELF_UNITS") {
                    $scope.editableMaxKitchenDetail.component = "MM";
                } else if (category === "FILLER_END_PANEL") {
                    $scope.editableMaxKitchenDetail.component = "MN";
                } else if (category === "VALANCE") {
                    $scope.editableMaxKitchenDetail.component = "MO";
                } else if (category === "HANDLE") {
                    $scope.editableMaxKitchenDetail.component = "MP";
                } else if (category === "PVC_SKIRTING_ACCESSORIES") {
                    $scope.editableMaxKitchenDetail.component = "MQ";
                }
                MaxKitchenService.findByCategory({
                    'category': category
                }, function (componentList) {
                    $scope.componentList = componentList;
                });
            });
            $scope.$watch('editableMaxKitchenDetail.componentId', function (componentId) {
                MaxKitchenService.get({
                    'id': componentId
                }, function (maxKitchenObject) {
                    console.log("Max Kitchen Object :%O", maxKitchenObject);
                    $scope.maxKitchenObject = maxKitchenObject;
                    $scope.editableMaxKitchenDetail.width = maxKitchenObject.width;
                    $scope.editableMaxKitchenDetail.height = maxKitchenObject.height;
                    $scope.editableMaxKitchenDetail.depth = maxKitchenObject.depth;
                });
            });
            $scope.$watch('editableMaxKitchenDetail.shutterFinish', function (shutterFinish) {
                FinishPriceService.findByFinishCode({
                    'finishCode': shutterFinish
                }, function (finishObject) {
                    $scope.editableMaxKitchenDetail.shutterFinishName = finishObject.finishName;
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': shutterFinish
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.maxKitchenShutterColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.maxKitchenShutterColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.maxKitchenShutterColors1 = [];
                    } else if (response.status === 404) {
                        $scope.maxKitchenShutterColors1 = [];
                    } else if (response.status === 400) {
                        $scope.maxKitchenShutterColors1 = [];
                    }
                });
                if (shutterFinish === "XBE") {
                    $scope.editableMaxKitchenDetail.stdPrice = $scope.maxKitchenObject.hdfMattPrice;
                    $scope.editableMaxKitchenDetail.shutterPrice = $scope.maxKitchenObject.hdfMattPrice;
                } else if (shutterFinish === "XXD") {
                    $scope.editableMaxKitchenDetail.stdPrice = $scope.maxKitchenObject.hdfGlossPrice;
                    $scope.editableMaxKitchenDetail.shutterPrice = $scope.maxKitchenObject.hdfGlossPrice;
                } else if (shutterFinish === "XXX") {
                    $scope.editableMaxKitchenDetail.stdPrice = $scope.maxKitchenObject.glassG50AluPrice;
                    $scope.editableMaxKitchenDetail.shutterPrice = $scope.maxKitchenObject.glassG50AluPrice;
                }
            });
            $scope.openMaxKitchenShutterColorWidget = function () {
                $scope.showMaxKitchenShutterColorSelectionWidget = true;
            };
            $scope.selectMaxKitchenShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableMaxKitchenDetail.shutterColorName = colorName;
                $scope.editableMaxKitchenDetail.shutterColorCode = colorCode;
                $scope.editableMaxKitchenDetail.shutterColorId = colorId;
                $scope.maxKitchenShutterColorName = colorName;
            };
            $scope.selectPreMaxKitchenShutterColor = function (colorId, colorName, colorCode) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preMaxKitchenShutterColor = colorObject;
                });
            };
            $scope.saveMaxKitchenDetails = function (maxKitchenOrderDetails) {
                var h1;
                var w1;
                var d1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    h1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                var depthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    d1 = genNum;
                };
                if (maxKitchenOrderDetails.height < 1000) {
                    if (maxKitchenOrderDetails.height < 100) {
                        lengthLessThan100(maxKitchenOrderDetails.height);
                    } else {
                        h1 = 0 + maxKitchenOrderDetails.height.toString();
                    }
                } else {
                    h1 = maxKitchenOrderDetails.height.toString();
                }
                if (maxKitchenOrderDetails.width < 1000) {
                    if (maxKitchenOrderDetails.width < 100) {
                        widthLessThan100(maxKitchenOrderDetails.width);
                    } else {
                        w1 = 0 + maxKitchenOrderDetails.width.toString();
                    }
                } else {
                    w1 = maxKitchenOrderDetails.width.toString();
                }
                if (maxKitchenOrderDetails.depth < 1000) {
                    if (maxKitchenOrderDetails.depth < 100) {
                        depthLessThan100(maxKitchenOrderDetails.depth);
                    } else {
                        d1 = 0 + maxKitchenOrderDetails.depth.toString();
                    }
                } else {
                    d1 = maxKitchenOrderDetails.depth.toString();
                }
                maxKitchenOrderDetails.orderHeadId = $stateParams.orderHeadId;
                maxKitchenOrderDetails.productCode = maxKitchenOrderDetails.component + "" + maxKitchenOrderDetails.shutterFinish + "XXXXXXXXXX-" + h1 + "" + w1 + "" + d1 + "00";
                maxKitchenOrderDetails.description = $scope.maxKitchenObject.description + " & with Shutter Finish " + maxKitchenOrderDetails.shutterFinishName;
//                if (maxKitchenOrderDetails.shutterFinish === "XBE") {                    
//                    maxKitchenOrderDetails.stdPrice = $scope.maxKitchenObject.hdfMattPrice;
//                    maxKitchenOrderDetails.preliminaryDealerprice = (maxKitchenOrderDetails.quantity * $scope.maxKitchenObject.hdfMattPrice);
//                } else if (maxKitchenOrderDetails.shutterFinish === "XXD") {                    
//                    maxKitchenOrderDetails.stdPrice = $scope.maxKitchenObject.hdfGlossPrice;
//                    maxKitchenOrderDetails.preliminaryDealerprice = (maxKitchenOrderDetails.quantity * $scope.maxKitchenObject.hdfGlossPrice);
//                } else if (maxKitchenOrderDetails.shutterFinish === "XXX") {                    
//                    maxKitchenOrderDetails.stdPrice = $scope.maxKitchenObject.glassG50AluPrice;
//                    maxKitchenOrderDetails.preliminaryDealerprice = (maxKitchenOrderDetails.quantity * $scope.maxKitchenObject.glassG50AluPrice);
//                }
                maxKitchenOrderDetails.preliminaryDealerprice = (maxKitchenOrderDetails.quantity * maxKitchenOrderDetails.shutterPrice);
                console.log("Max Kitchen Order Details :%O", maxKitchenOrderDetails);
//                if ($scope.orderHead.orderSubType === "D") {
//                    console.log("Display Order");
//                    var displayDiscountPrice = ((maxKitchenOrderDetails.preliminaryDealerprice / 100) * maxKitchenOrderDetails.displayDiscount);
//                    maxKitchenOrderDetails.price = (maxKitchenOrderDetails.preliminaryDealerprice - displayDiscountPrice);
//                    MaxKitchenOrderDetailsService.save(maxKitchenOrderDetails, function () {
//                        $scope.editableMaxKitchenDetail = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
//                    });
//                } else {
                maxKitchenOrderDetails.price = maxKitchenOrderDetails.preliminaryDealerprice;
                MaxKitchenOrderDetailsService.save(maxKitchenOrderDetails, function () {
                    console.log("Saved Successfully");
                    $scope.editableMaxKitchenDetail = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
//                }
            };
            /////////////////Max Kitchen Form Functionality End////////////////
            /////////////////Max Wardrobe Form Functionality////////////////////
            $scope.editableMaxWardrobeDetail = {};
            $scope.$watch('editableMaxWardrobeDetail.category', function (category) {
                console.log("Category :%O", category);
//                MaxWardrobeService.findByCategory({
//                    'category': category
//                }, function (componentList) {
//                    $scope.maxWardrobeComponentList = componentList;
//                });

                $scope.maxWardrobeWidthList = MaxWardrobeService.findDistinctWidth({
                    'category': category
                });
                $scope.maxWardrobeDepthList = MaxWardrobeService.findDistinctDepth({
                    'category': category
                });
                $scope.maxWardrobeHeightList = MaxWardrobeService.findDistinctHeight({
                    'category': category
                });
            });
            $scope.$watch('editableMaxWardrobeDetail.height', function (height) {
                MaxWardrobeService.findByCategoryDimensions({
                    'category': $scope.editableMaxWardrobeDetail.category,
                    'width': $scope.editableMaxWardrobeDetail.width,
                    'depth': $scope.editableMaxWardrobeDetail.depth,
                    'height': height
                }, function (maxWardrobeComponentList) {
                    console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
                    $scope.maxWardrobeComponentList = maxWardrobeComponentList;
                });
            });
            $scope.$watch('editableMaxWardrobeDetail.componentId', function (componentId) {
                MaxWardrobeService.get({
                    'id': componentId
                }, function (maxWardrobeObject) {
                    console.log("Max Wardrobe Object :%O", maxWardrobeObject);
                    $scope.maxWardrobeObject = maxWardrobeObject;
//                    $scope.editableMaxWardrobeDetail.width = maxWardrobeObject.width;
//                    $scope.editableMaxWardrobeDetail.height = maxWardrobeObject.height;
//                    $scope.editableMaxWardrobeDetail.depth = maxWardrobeObject.depth;
                });
            });
            $scope.saveMaxWardrobeDetails = function (maxWardrobeOrderDetails) {
                console.log("Coming to save function :%O", maxWardrobeOrderDetails);
                maxWardrobeOrderDetails.orderHeadId = $stateParams.orderHeadId;
                maxWardrobeOrderDetails.productCode = $scope.maxWardrobeObject.productCode;
                maxWardrobeOrderDetails.description = $scope.maxWardrobeObject.description;
                if (maxWardrobeOrderDetails.carcass === "PPB") {
                    maxWardrobeOrderDetails.carcassPrice = $scope.maxWardrobeObject.cpPpbPrice;
                } else if (maxWardrobeOrderDetails.carcass === "HD_HMR") {
                    maxWardrobeOrderDetails.carcassPrice = $scope.maxWardrobeObject.cpHdHmrPrice;
                } else if (maxWardrobeOrderDetails.carcass === "HDF") {
                    maxWardrobeOrderDetails.carcassPrice = $scope.maxWardrobeObject.cpHdfPrice;
                } else {
                    maxWardrobeOrderDetails.carcassPrice = 0;
                }

                if (maxWardrobeOrderDetails.shutterFinish === "SP_FOILED_MATT") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spFoiledMattPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_FOILED_GLOSSY") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spFoiledGlossyPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PRELAM_MATT") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPrelamMattPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PCPPB") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPcppbPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "G50_GLASS") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spGlassG50AluPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PVC_STD") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPvcMdfStdPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PVC_DESG") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPvcMdfDesgPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PVC_GLOSSY") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPvcMdfGlossyPrice;
                } else if (maxWardrobeOrderDetails.shutterFinish === "SP_PVC_PREM") {
                    maxWardrobeOrderDetails.shutterPrice = $scope.maxWardrobeObject.spPvcMdfPremPrice;
                } else {
                    maxWardrobeOrderDetails.shutterPrice = 0;
                }
                maxWardrobeOrderDetails.softHingesPrice = $scope.maxWardrobeObject.softHingesPrice;
                maxWardrobeOrderDetails.preliminaryDealerPrice = (maxWardrobeOrderDetails.quantity * (maxWardrobeOrderDetails.carcassPrice + maxWardrobeOrderDetails.shutterPrice + maxWardrobeOrderDetails.softHingesPrice));
//                if ($scope.orderHead.orderSubType === "D") {
//                    console.log("Display Order");
//                    var displayDiscountPrice = ((maxWardrobeOrderDetails.preliminaryDealerPrice / 100) * maxWardrobeOrderDetails.displayDiscount);
//                    maxWardrobeOrderDetails.price = (maxWardrobeOrderDetails.preliminaryDealerPrice - displayDiscountPrice);
//                    MaxWardrobeOrderDetailsService.save(maxWardrobeOrderDetails, function () {
//                        console.log("Saved Successfully");
//                        $scope.editableMaxWardrobeDetail = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
//                    });
//                } else {
                maxWardrobeOrderDetails.price = maxWardrobeOrderDetails.preliminaryDealerPrice;
                MaxWardrobeOrderDetailsService.save(maxWardrobeOrderDetails, function () {
                    console.log("Saved Successfully");
                    $scope.editableMaxWardrobeDetail = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
//                }

            };
            /////////////////Max Wardrobe Form Functionality End////////////////
            /////////////////Infinity Wardrobe Form Functionality Starts////////
            $scope.editableInfinityWardrobeDetail = {};
            $scope.$watch('editableInfinityWardrobeDetail.category', function (category) {
                console.log("Category :%O", category);
                if (category === "WARDROBE") {
                    $scope.editableInfinityWardrobeDetail.component = "IW";
                } else if (category === "LOFT_UNIT") {
                    $scope.editableInfinityWardrobeDetail.component = "IL";
                } else if (category === "CHEST_OF_DRAWER") {
                    $scope.editableInfinityWardrobeDetail.component = "IC";
                } else if (category === "GALLERY_SHELF") {
                    $scope.editableInfinityWardrobeDetail.component = "IG";
                } else if (category === "TROUSER_RACK") {
                    $scope.editableInfinityWardrobeDetail.component = "IT";
                } else if (category === "FILLER") {
                    $scope.editableInfinityWardrobeDetail.component = "IF";
                } else if (category === "END_PANEL") {
                    $scope.editableInfinityWardrobeDetail.component = "IE";
                }
//                InfinityWardrobeService.findByCategory({
//                    'category': category
//                }, function (componentList) {
//                    $scope.infinityWardrobeComponentList = componentList;
//                });
                $scope.infinityWardrobeWidthList = InfinityWardrobeService.findDistinctWidth({
                    'category': category
                });
                $scope.infinityWardrobeDepthList = InfinityWardrobeService.findDistinctDepth({
                    'category': category
                });
                $scope.infinityWardrobeHeightList = InfinityWardrobeService.findDistinctHeight({
                    'category': category
                });
            });
            $scope.$watch('editableInfinityWardrobeDetail.height', function (height) {
                InfinityWardrobeService.findByCategoryDimensions({
                    'category': $scope.editableInfinityWardrobeDetail.category,
                    'width': $scope.editableInfinityWardrobeDetail.width,
                    'depth': $scope.editableInfinityWardrobeDetail.depth,
                    'height': height
                }, function (infinityWardrobeComponentList) {
                    console.log("Infinity Wardrobe List :%O", infinityWardrobeComponentList);
                    $scope.infinityWardrobeComponentList = infinityWardrobeComponentList;
                });
            });
            $scope.$watch('editableInfinityWardrobeDetail.componentId', function (componentId) {
                console.log("Component ID :%O", componentId);
                InfinityWardrobeService.get({
                    'id': componentId
                }, function (component) {
                    $scope.infinityWardrobeObject = component;
                    $scope.editableInfinityWardrobeDetail.componentDescription = component.description;
//                    $scope.editableInfinityWardrobeDetail.width = component.width;
//                    $scope.editableInfinityWardrobeDetail.depth = component.depth;
//                    $scope.editableInfinityWardrobeDetail.height = component.height;
                });
            });
            $scope.$watch('editableInfinityWardrobeDetail.carcass', function (carcass) {
                console.log("Carcass :" + carcass);
                $scope.editableInfinityWardrobeDetail.carcassMaterial = carcass;
                ColorConstraintService.findByComponentMaterialCode({
                    'component': 'INFINITY_WARDROBE',
                    'materialCode': carcass
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.infinityCarcassColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.infinityCarcassColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.infinityCarcassColors1 = [];
                    } else if (response.status === 404) {
                        $scope.infinityCarcassColors1 = [];
                    } else if (response.status === 400) {
                        $scope.infinityCarcassColors1 = [];
                    }
                });
                if (carcass === "PB") {
                    $scope.editableInfinityWardrobeDetail.carcassPrice = $scope.infinityWardrobeObject.cpPpb;
                } else if (carcass === "MF") {
                    $scope.editableInfinityWardrobeDetail.carcassPrice = $scope.infinityWardrobeObject.cpMf;
                } else if (carcass === "HM") {
                    $scope.editableInfinityWardrobeDetail.carcassPrice = $scope.infinityWardrobeObject.cpHmr;
                } else if (carcass === "HF") {
                    $scope.editableInfinityWardrobeDetail.carcassPrice = $scope.infinityWardrobeObject.cpHf;
                } else {
                    $scope.editableInfinityWardrobeDetail.carcassPrice = 0;
                }
            });
            $scope.$watch('editableInfinityWardrobeDetail.shutterFinish', function (shutterFinish) {
                $scope.editableInfinityWardrobeDetail.shutterFinish = shutterFinish;
                $scope.editableInfinityWardrobeDetail.shutterFinishObject = FinishPriceService.findByFinishCode({
                    'finishCode': shutterFinish
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': shutterFinish
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.infinityShutterColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.infinityShutterColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.infinityShutterColors1 = [];
                    } else if (response.status === 404) {
                        $scope.infinityShutterColors1 = [];
                    } else if (response.status === 400) {
                        $scope.infinityShutterColors1 = [];
                    }
                });

                if (shutterFinish === "XXC") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfSt;
                } else if (shutterFinish === "XXB") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfDes;
                } else if (shutterFinish === "XXA") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfGlReg;
                } else if (shutterFinish === "XAH") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfGlossPrem;
                } else if (shutterFinish === "XXI") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHplMatt;
                } else if (shutterFinish === "XXH") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyHplGloss;
                } else if (shutterFinish === "XXG") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyHplMr;
                } else if (shutterFinish === "XXN") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfPolymer;
                } else if (shutterFinish === "XXL") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyAcrStd;
                } else if (shutterFinish === "XXM") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyAcrPrem;
                } else if (shutterFinish === "XXJ") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHdfAcrStd;
                } else if (shutterFinish === "XXK") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHdfAcrPrem;
                } else if (shutterFinish === "XXS") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfPuSolid;
                } else if (shutterFinish === "XXT") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spMfPuMetallic;
                } else if (shutterFinish === "XXO") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrSolid;
                } else if (shutterFinish === "XXP") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrMetallic;
                } else if (shutterFinish === "XXQ") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyPuSolid;
                } else if (shutterFinish === "XXP") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPlyPuMetallic;
                } else if (shutterFinish === "XAI") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPrePbEdgeb;
                } else if (shutterFinish === "XAJ") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPreMfEdgeb;
                } else if (shutterFinish === "XAK") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spPreHmrEdgeb;
                } else if (shutterFinish === "XXF") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrStd;
                } else if (shutterFinish === "XXE") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrDesg;
                } else if (shutterFinish === "XXD") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrGlossReg;
                } else if (shutterFinish === "XAL") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHmrGlossPremium;
                } else if (shutterFinish === "XAM") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spG55AcidFrosted;
                } else if (shutterFinish === "XAN") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaStd;
                } else if (shutterFinish === "XAO") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaDesg;
                } else if (shutterFinish === "XAP") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaGlossReg;
                } else if (shutterFinish === "XAQ") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaGlossPremium;
                } else if (shutterFinish === "XAR") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaPuMetallic;
                } else if (shutterFinish === "XAS") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spVenettaMfPuSolid;
                } else if (shutterFinish === "XAT") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spVenettaMfPuMetallic;
                } else if (shutterFinish === "XAU") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spHfAcrGlass;
                } else if (shutterFinish === "XAV") {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = $scope.infinityWardrobeObject.spGloriaPuSolid;
                } else {
                    $scope.editableInfinityWardrobeDetail.shutterPrice = 0;
                }
            });
            $scope.$watch('editableInfinityWardrobeDetail.hinge', function (hinge) {
                $scope.editableInfinityWardrobeDetail.hinge = hinge;
                if (hinge === "HS") {
                    $scope.editableInfinityWardrobeDetail.hingePrice = $scope.infinityWardrobeObject.hingeSoftClose;
                } else if (hinge === "HB") {
                    $scope.editableInfinityWardrobeDetail.hingePrice = $scope.infinityWardrobeObject.hingeBlumSoftClose;
                } else if (hinge === "HD") {
                    $scope.editableInfinityWardrobeDetail.hingePrice = $scope.infinityWardrobeObject.hingeDeg155;
                } else {
                    $scope.editableInfinityWardrobeDetail.hingePrice = 0;
                }
            });
            $scope.openInfinityCarcassColorWidget = function () {
                $scope.showInfinityCarcassColorSelectionWidget = true;
            };
            $scope.openInfinityShutterColorWidget = function () {
                $scope.showInfinityShutterColorSelectionWidget = true;
            };
            $scope.selectInfinityCarcassColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableInfinityWardrobeDetail.carcassColorName = colorName;
                $scope.editableInfinityWardrobeDetail.carcassColorCode = colorCode;
                $scope.editableInfinityWardrobeDetail.carcassColorId = colorId;
                $scope.infinityCarcassColorName = colorName;
            };
            $scope.selectInfinityShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableInfinityWardrobeDetail.shutterColorName = colorName;
                $scope.editableInfinityWardrobeDetail.shutterColorCode = colorCode;
                $scope.editableInfinityWardrobeDetail.shutterColorId = colorId;
                $scope.infinityShutterColorName = colorName;
            };
            $scope.selectPreInfinityCarcassColor = function (colorId, colorName, colorCode) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preInfinityCarcassColor = colorObject;
                });
            };
            $scope.selectPreInfinityShutterColor = function (colorId, colorName, colorCode) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preInfinityShutterColor = colorObject;
                });
            };
            $scope.saveInfinityWardrobeDetails = function (infinityWardrobeDetails) {
                var h1;
                var w1;
                var d1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    h1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                var depthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    d1 = genNum;
                };
                if (infinityWardrobeDetails.height < 1000) {
                    if (infinityWardrobeDetails.height < 100) {
                        lengthLessThan100(infinityWardrobeDetails.height);
                    } else {
                        h1 = 0 + infinityWardrobeDetails.height.toString();
                    }
                } else {
                    h1 = infinityWardrobeDetails.height.toString();
                }
                if (infinityWardrobeDetails.width < 1000) {
                    if (infinityWardrobeDetails.width < 100) {
                        widthLessThan100(infinityWardrobeDetails.width);
                    } else {
                        w1 = 0 + infinityWardrobeDetails.width.toString();
                    }
                } else {
                    w1 = infinityWardrobeDetails.width.toString();
                }
                if (infinityWardrobeDetails.depth < 1000) {
                    if (infinityWardrobeDetails.depth < 100) {
                        depthLessThan100(infinityWardrobeDetails.depth);
                    } else {
                        d1 = 0 + infinityWardrobeDetails.depth.toString();
                    }
                } else {
                    d1 = infinityWardrobeDetails.depth.toString();
                }
                infinityWardrobeDetails.orderHeadId = $stateParams.orderHeadId;
                infinityWardrobeDetails.orderFor = "INFINITY_WARDROBE";
                infinityWardrobeDetails.preliminaryDealerPrice = Math.round((infinityWardrobeDetails.carcassPrice + infinityWardrobeDetails.shutterPrice + infinityWardrobeDetails.hingePrice));
                if (infinityWardrobeDetails.hinge === undefined & infinityWardrobeDetails.shutterFinish === undefined) {
                    console.log("Without Hinge ,Without Finish");
                    infinityWardrobeDetails.productCode = infinityWardrobeDetails.component + "" + infinityWardrobeDetails.carcassMaterial + "XXXXXXXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    infinityWardrobeDetails.description = (infinityWardrobeDetails.componentDescription + " And Carcass Material :" + infinityWardrobeDetails.carcass);
                } else if (infinityWardrobeDetails.hinge === undefined & infinityWardrobeDetails.shutterFinish !== undefined) {
                    console.log("Without Hinge ,With Finish");
                    infinityWardrobeDetails.productCode = infinityWardrobeDetails.component + "" + infinityWardrobeDetails.carcassMaterial + "XX" + infinityWardrobeDetails.shutterFinish + "XXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    infinityWardrobeDetails.description = (infinityWardrobeDetails.componentDescription + " And Carcass Material :" + infinityWardrobeDetails.carcass + ", Shutter Finish :" + infinityWardrobeDetails.shutterFinishObject.finishName);
                } else if (infinityWardrobeDetails.hinge !== undefined & infinityWardrobeDetails.shutterFinish === undefined) {
                    console.log("With Hinge ,Without Finish");
                    if (infinityWardrobeDetails.hinge === "HS") {
                        infinityWardrobeDetails.hingeName = "Soft Close Hinge";
                    } else if (infinityWardrobeDetails.hinge === "HB") {
                        infinityWardrobeDetails.hingeName = "Blum Soft Close Hinge";
                    } else if (infinityWardrobeDetails.hinge === "HD") {
                        infinityWardrobeDetails.hingeName = "155 Degree Hinge";
                    }
                    infinityWardrobeDetails.productCode = infinityWardrobeDetails.component + "" + infinityWardrobeDetails.carcassMaterial + "" + infinityWardrobeDetails.hinge + "XXXXXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    infinityWardrobeDetails.description = (infinityWardrobeDetails.componentDescription + " And Carcass Material :" + infinityWardrobeDetails.carcass + " with " + infinityWardrobeDetails.hingeName);
                } else if (infinityWardrobeDetails.hinge !== undefined & infinityWardrobeDetails.shutterFinish !== undefined) {
                    console.log("With Hinge ,With Finish");
                    if (infinityWardrobeDetails.hinge === "HS") {
                        infinityWardrobeDetails.hingeName = "Soft Close Hinge";
                    } else if (infinityWardrobeDetails.hinge === "HB") {
                        infinityWardrobeDetails.hingeName = "Blum Soft Close Hinge";
                    } else if (infinityWardrobeDetails.hinge === "HD") {
                        infinityWardrobeDetails.hingeName = "155 Degree Hinge";
                    }
                    infinityWardrobeDetails.productCode = infinityWardrobeDetails.component + "" + infinityWardrobeDetails.carcassMaterial + "" + infinityWardrobeDetails.hinge + "" + infinityWardrobeDetails.shutterFinish + "XXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    infinityWardrobeDetails.description = (infinityWardrobeDetails.componentDescription + " And Carcass Material :" + infinityWardrobeDetails.carcass + ", Shutter Finish :" + infinityWardrobeDetails.shutterFinishObject.finishName + " with " + infinityWardrobeDetails.hingeName);
                }
                console.log("InfinityWardrobeDetails :%O", infinityWardrobeDetails);
//                if ($scope.orderHead.orderSubType === "D") {
//                    console.log("Display Order");
//                    var displayDiscountPrice = ((infinityWardrobeDetails.preliminaryDealerPrice / 100) * infinityWardrobeDetails.displayDiscount);
//                    infinityWardrobeDetails.price = Math.round((infinityWardrobeDetails.preliminaryDealerPrice - displayDiscountPrice));
//                    InfinityWardrobeOrderDetailsService.save(infinityWardrobeDetails, function () {
//                        $scope.editableInfinityWardrobeDetail = "";
//                        $scope.infinityCarcassColorName = "";
//                        $scope.infinityShutterColorName = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
//                    });
//                } else {
                infinityWardrobeDetails.price = infinityWardrobeDetails.preliminaryDealerPrice;
                InfinityWardrobeOrderDetailsService.save(infinityWardrobeDetails, function () {
                    $scope.editableInfinityWardrobeDetail = "";
                    $scope.infinityCarcassColorName = "";
                    $scope.infinityShutterColorName = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
//                }
            };
            ////////////////Infinity Wardrobe Form Functionality Ends///////////
            ////////////////Ultima Wardrobe Form Functionality Starts///////////
            $scope.editableUltimaWardrobeDetail = {};
            $scope.$watch('editableUltimaWardrobeDetail.category', function (category) {
                console.log("Category :%O", category);
                if (category === "CARCASS") {
                    $scope.editableUltimaWardrobeDetail.component = "UW";
                } else if (category === "GALSHELF") {
                    $scope.editableUltimaWardrobeDetail.component = "UG";
                } else if (category === "HANGROD") {
                    $scope.editableUltimaWardrobeDetail.component = "UH";
                } else if (category === "FILLER") {
                    $scope.editableUltimaWardrobeDetail.component = "UF";
                } else if (category === "END_PANEL") {
                    $scope.editableUltimaWardrobeDetail.component = "UE";
                } else if (category === "END_COVER") {
                    $scope.editableUltimaWardrobeDetail.component = "UC";
                } else if (category === "LOFT_CARCASS") {
                    $scope.editableUltimaWardrobeDetail.component = "UL";
                } else if (category === "SLIDING_CARCASS") {
                    $scope.editableUltimaWardrobeDetail.component = "US";
                } else if (category === "SLIDING_FOLDING_CARCASS") {
                    $scope.editableUltimaWardrobeDetail.component = "UB";
                }
                UltimaWardrobeService.findByCategory({
                    'category': category
                }, function (componentList) {
                    $scope.ultimaWardrobeComponentList = componentList;
                });
            });

            $scope.$watch('editableUltimaWardrobeDetail.componentId', function (componentId) {
                console.log("Component ID :%O", componentId);
                UltimaWardrobeService.get({
                    'id': componentId
                }, function (component) {
                    $scope.ultimaWardrobeObject = component;
                    $scope.editableUltimaWardrobeDetail.componentDescription = component.description;
                    $scope.editableUltimaWardrobeDetail.width = component.width;
                    $scope.editableUltimaWardrobeDetail.depth = component.depth;
                    $scope.editableUltimaWardrobeDetail.height = component.height;
                });
            });
            $scope.$watch('editableUltimaWardrobeDetail.carcass', function (carcass) {
                console.log("Carcass :" + carcass);
                $scope.editableUltimaWardrobeDetail.carcassMaterial = carcass;
                ColorConstraintService.findByComponentMaterialCode({
                    'component': 'ULTIMA_WARDROBE',
                    'materialCode': carcass
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.ultimaCarcassColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.ultimaCarcassColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.ultimaCarcassColors1 = [];
                    } else if (response.status === 404) {
                        $scope.ultimaCarcassColors1 = [];
                    } else if (response.status === 400) {
                        $scope.ultimaCarcassColors1 = [];
                    }
                });
                if (carcass === "PB") {
                    $scope.editableUltimaWardrobeDetail.carcassPrice = $scope.ultimaWardrobeObject.cpPpb;
                } else if (carcass === "MF") {
                    $scope.editableUltimaWardrobeDetail.carcassPrice = $scope.ultimaWardrobeObject.cpMdf;
                } else if (carcass === "HF") {
                    $scope.editableUltimaWardrobeDetail.carcassPrice = $scope.ultimaWardrobeObject.cpHdf;
                } else {
                    $scope.editableUltimaWardrobeDetail.carcassPrice = 0;
                }
            });
            $scope.$watch('editableUltimaWardrobeDetail.shutterFinish', function (shutterFinish) {
                $scope.editableUltimaWardrobeDetail.shutterFinish = shutterFinish;
                $scope.editableUltimaWardrobeDetail.shutterFinishObject = FinishPriceService.findByFinishCode({
                    'finishCode': shutterFinish
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': shutterFinish
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.ultimaShutterColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.ultimaShutterColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.ultimaShutterColors1 = [];
                    } else if (response.status === 404) {
                        $scope.ultimaShutterColors1 = [];
                    } else if (response.status === 400) {
                        $scope.ultimaShutterColors1 = [];
                    }
                });

                if (shutterFinish === "XAW") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcMem;
                } else if (shutterFinish === "XAX") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPc3Melamine;
                } else if (shutterFinish === "XAY") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcMemrouted;
                } else if (shutterFinish === "XAZ") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcHgmem;
                } else if (shutterFinish === "XBA") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spAlG55;
                } else if (shutterFinish === "XBB") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcMatmem;
                } else if (shutterFinish === "XBC") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcMatglass;
                } else if (shutterFinish === "XBD") {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = $scope.ultimaWardrobeObject.spPvcGlossGlass;
                } else {
                    $scope.editableUltimaWardrobeDetail.shutterPrice = 0;
                }
            });
            $scope.$watch('editableUltimaWardrobeDetail.handle', function (handle) {
                $scope.editableUltimaWardrobeDetail.handle = handle;
                if (handle === "H1") {
                    $scope.editableUltimaWardrobeDetail.handlePrice = $scope.ultimaWardrobeObject.hanH100Cd320;
                    $scope.editableUltimaWardrobeDetail.handleName = "H100 CD 320 mm";
                } else if (handle === "H2") {
                    $scope.editableUltimaWardrobeDetail.handlePrice = $scope.ultimaWardrobeObject.hanH268Cd336;
                    $scope.editableUltimaWardrobeDetail.handleName = "H268 CD 336 mm";
                } else if (handle === "H3") {
                    $scope.editableUltimaWardrobeDetail.handlePrice = $scope.ultimaWardrobeObject.hanF6023Cd320;
                    $scope.editableUltimaWardrobeDetail.handleName = "F6023 CD 320 mm";
                } else if (handle === "H4") {
                    $scope.editableUltimaWardrobeDetail.handlePrice = $scope.ultimaWardrobeObject.hanF188Cd224;
                    $scope.editableUltimaWardrobeDetail.handleName = "F188 CD 224 mm";
                } else if (handle === "H5") {
                    $scope.editableUltimaWardrobeDetail.handlePrice = $scope.ultimaWardrobeObject.hanH17Cd320;
                    $scope.editableUltimaWardrobeDetail.handleName = "H17 CD 320 mm";
                } else {
                    $scope.editableUltimaWardrobeDetail.handlePrice = 0;
                }
            });
            $scope.openUltimaCarcassColorWidget = function () {
                $scope.showUltimaCarcassColorSelectionWidget = true;
            };
            $scope.openUltimaShutterColorWidget = function () {
                $scope.showUltimaShutterColorSelectionWidget = true;
            };
            $scope.selectUltimaCarcassColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableUltimaWardrobeDetail.carcassColorName = colorName;
                $scope.editableUltimaWardrobeDetail.carcassColorCode = colorCode;
                $scope.editableUltimaWardrobeDetail.carcassColorId = colorId;
                $scope.ultimaCarcassColorName = colorName;
            };
            $scope.selectUltimaShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableUltimaWardrobeDetail.shutterColorName = colorName;
                $scope.editableUltimaWardrobeDetail.shutterColorCode = colorCode;
                $scope.editableUltimaWardrobeDetail.shutterColorId = colorId;
                $scope.ultimaShutterColorName = colorName;
            };
            $scope.selectPreUltimaCarcassColor = function (colorId, colorName, colorCode) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preUltimaCarcassColor = colorObject;
                });
            };
            $scope.selectPreUltimaShutterColor = function (colorId, colorName, colorCode) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preUltimaShutterColor = colorObject;
                });
            };
            $scope.saveUltimaWardrobeDetails = function (ultimaWardrobeDetails) {
                var h1;
                var w1;
                var d1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    h1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                var depthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    d1 = genNum;
                };
                if (ultimaWardrobeDetails.height < 1000) {
                    if (ultimaWardrobeDetails.height < 100) {
                        lengthLessThan100(ultimaWardrobeDetails.height);
                    } else {
                        h1 = 0 + ultimaWardrobeDetails.height.toString();
                    }
                } else {
                    h1 = ultimaWardrobeDetails.height.toString();
                }
                if (ultimaWardrobeDetails.width < 1000) {
                    if (ultimaWardrobeDetails.width < 100) {
                        widthLessThan100(ultimaWardrobeDetails.width);
                    } else {
                        w1 = 0 + ultimaWardrobeDetails.width.toString();
                    }
                } else {
                    w1 = ultimaWardrobeDetails.width.toString();
                }
                if (ultimaWardrobeDetails.depth < 1000) {
                    if (ultimaWardrobeDetails.depth < 100) {
                        depthLessThan100(ultimaWardrobeDetails.depth);
                    } else {
                        d1 = 0 + ultimaWardrobeDetails.depth.toString();
                    }
                } else {
                    d1 = ultimaWardrobeDetails.depth.toString();
                }
                ultimaWardrobeDetails.orderHeadId = $stateParams.orderHeadId;
                ultimaWardrobeDetails.orderFor = "ULTIMA_WARDROBE";
                ultimaWardrobeDetails.preliminaryDealerPrice = Math.round((ultimaWardrobeDetails.carcassPrice + ultimaWardrobeDetails.shutterPrice + ultimaWardrobeDetails.handlePrice));
                if (ultimaWardrobeDetails.handle === undefined & ultimaWardrobeDetails.shutterFinish === undefined) {
                    console.log("Without Handle ,Without Finish");
                    ultimaWardrobeDetails.productCode = ultimaWardrobeDetails.component + "" + ultimaWardrobeDetails.carcassMaterial + "XXXXXXXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    ultimaWardrobeDetails.description = (ultimaWardrobeDetails.componentDescription + " And Carcass Material :" + ultimaWardrobeDetails.carcass);
                } else if (ultimaWardrobeDetails.handle === undefined & ultimaWardrobeDetails.shutterFinish !== undefined) {
                    console.log("Without Handle ,With Finish");
                    ultimaWardrobeDetails.productCode = ultimaWardrobeDetails.component + "" + ultimaWardrobeDetails.carcassMaterial + "XX" + ultimaWardrobeDetails.shutterFinish + "XXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    ultimaWardrobeDetails.description = (ultimaWardrobeDetails.componentDescription + " And Carcass Material :" + ultimaWardrobeDetails.carcass + ", Shutter Finish :" + ultimaWardrobeDetails.shutterFinishObject.finishName);
                } else if (ultimaWardrobeDetails.handle !== undefined & ultimaWardrobeDetails.shutterFinish === undefined) {
                    console.log("With Handle ,Without Finish");
                    ultimaWardrobeDetails.productCode = ultimaWardrobeDetails.component + "" + ultimaWardrobeDetails.carcassMaterial + "" + ultimaWardrobeDetails.handle + "XXXXXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    ultimaWardrobeDetails.description = (ultimaWardrobeDetails.componentDescription + " And Carcass Material :" + ultimaWardrobeDetails.carcass + " with Handle :" + ultimaWardrobeDetails.handleName);
                } else if (ultimaWardrobeDetails.handle !== undefined & ultimaWardrobeDetails.shutterFinish !== undefined) {
                    console.log("With Handle ,With Finish");
                    ultimaWardrobeDetails.productCode = ultimaWardrobeDetails.component + "" + ultimaWardrobeDetails.carcassMaterial + "" + ultimaWardrobeDetails.handle + "" + ultimaWardrobeDetails.shutterFinish + "XXXXXX" + "-" + h1 + "" + w1 + "" + d1 + "00";
                    ultimaWardrobeDetails.description = (ultimaWardrobeDetails.componentDescription + " And Carcass Material :" + ultimaWardrobeDetails.carcass + ", Shutter Finish :" + ultimaWardrobeDetails.shutterFinishObject.finishName + " with Handle :" + ultimaWardrobeDetails.handleName);
                }
                console.log("UltimaWardrobeDetails :%O", ultimaWardrobeDetails);
//                if ($scope.orderHead.orderSubType === "D") {
//                    console.log("Display Order");
//                    var displayDiscountPrice = ((ultimaWardrobeDetails.preliminaryDealerPrice / 100) * ultimaWardrobeDetails.displayDiscount);
//                    ultimaWardrobeDetails.price = Math.round((ultimaWardrobeDetails.preliminaryDealerPrice - displayDiscountPrice));
//                    UltimaWardrobeOrderDetailsService.save(ultimaWardrobeDetails, function () {
//                        $scope.editableUltimaWardrobeDetail = "";
//                        $scope.ultimaCarcassColorName = "";
//                        $scope.ultimaShutterColorName = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
//                    });
//                } else {
                ultimaWardrobeDetails.price = ultimaWardrobeDetails.preliminaryDealerPrice;
                UltimaWardrobeOrderDetailsService.save(ultimaWardrobeDetails, function () {
                    $scope.editableUltimaWardrobeDetail = "";
                    $scope.ultimaCarcassColorName = "";
                    $scope.ultimaShutterColorName = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
//                }
            };
            ////////////////Ultima Wardrobe Form Functionality Ends/////////////
            ////////////////Fetching Entry For List/////////////////////////////
            $scope.maxKitchenOrderDetailsList = MaxKitchenOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxKitchenOrderList) {
                $scope.maxKitchenOrderDetailsList = maxKitchenOrderList;
            });
            $scope.maxWardrobeOrderDetailsList = MaxWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxWardrobeOrderList) {
                $scope.maxWardrobeOrderDetailsList = maxWardrobeOrderList;
            });
            $scope.infinityWardrobeOrderDetailList = InfinityWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            });
            $scope.ultimaWardrobeOrderDetailList = UltimaWardrobeOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            });
            ////////////////////////////////////////////////////////////////////
            /////////////MRP Version Code Below Till End of controller/////////////////////
//            $scope.showInfinityWardrobeMrp = false;
//            $scope.showMaxWardrobeMrp = false;
//            $scope.showMaxKitchenMrp = false;
//            $scope.showDealerComponents = false;
//            $scope.selectParentView = function (view) {
//                if (view === "INFINITY_WARDROBE") {
//                    $scope.showInfinityWardrobeMrp = true;
//                    $scope.showMaxWardrobeMrp = false;
//                    $scope.showMaxKitchenMrp = false;
//                    $scope.showDealerComponents = false;
//                } else if (view === "MAX_WARDROBE") {
//                    $scope.showInfinityWardrobeMrp = false;
//                    $scope.showMaxWardrobeMrp = true;
//                    $scope.showMaxKitchenMrp = false;
//                    $scope.showDealerComponents = false;
//                } else if (view === "MAX_KITCHEN") {
//                    $scope.showInfinityWardrobeMrp = false;
//                    $scope.showMaxWardrobeMrp = false;
//                    $scope.showMaxKitchenMrp = true;
//                    $scope.showDealerComponents = false;
//                } else if (view === "DEALER_COMPONENTS") {
//                    $scope.showInfinityWardrobeMrp = false;
//                    $scope.showMaxWardrobeMrp = false;
//                    $scope.showMaxKitchenMrp = false;
//                    $scope.showDealerComponents = true;
//                }
//            };
//            /////////////////Infinity Wardrobe Funtionality ///////////////////
//            $scope.editableInfinityWardrobeDetailMrp = {};
//            $scope.editableInfinityWardrobeDetailMrp.carcass = "Supertuff HDF";
//            $scope.$watch('editableInfinityWardrobeDetailMrp.category', function (category) {
//
//                $scope.InfinityWardrobeWidthList = InfinityWardrobeMrpService.findDistinctWidth({
//                    'category': category
//                });
//                $scope.InfinityWardrobeDepthList = InfinityWardrobeMrpService.findDistinctDepth({
//                    'category': category
//                });
//                $scope.InfinityWardrobeHeightList = InfinityWardrobeMrpService.findDistinctHeight({
//                    'category': category
//                });
//            });
//            $scope.$watch('editableInfinityWardrobeDetailMrp.height', function (height) {
//                InfinityWardrobeMrpService.findByCategoryDimensions({
//                    'category': $scope.editableInfinityWardrobeDetailMrp.category,
//                    'width': $scope.editableInfinityWardrobeDetailMrp.width,
//                    'depth': $scope.editableInfinityWardrobeDetailMrp.depth,
//                    'height': height
//                }, function (infinityWardrobeComponentList) {
//                    console.log("Infinity Wardrobe List :%O", infinityWardrobeComponentList);
//                    $scope.infinityWardrobeMrpComponentList = infinityWardrobeComponentList;
//                });
//            });
//            $scope.$watch('editableInfinityWardrobeDetailMrp.componentId', function (componentId) {
//                $scope.infinityWardrobeMrpObject = InfinityWardrobeMrpService.get({
//                    'id': componentId
//                }, function (infinityWardrobeMrpObject) {
//                    $scope.editableInfinityWardrobeDetailMrp.carcassPrice = infinityWardrobeMrpObject.carcassPrice;
//                    $scope.editableInfinityWardrobeDetailMrp.productCode = infinityWardrobeMrpObject.productCode;
//                    $scope.editableInfinityWardrobeDetailMrp.description = infinityWardrobeMrpObject.description;
//                });
//            });
//            $scope.$watch('editableInfinityWardrobeDetailMrp.shutterCategory', function (shutterCategory) {
//                if (shutterCategory === "P1") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price1;
//                } else if (shutterCategory === "P2") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price2;
//                } else if (shutterCategory === "P3") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price3;
//                } else if (shutterCategory === "P4") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price4;
//                } else if (shutterCategory === "P5") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price5;
//                } else if (shutterCategory === "P6") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price6;
//                } else if (shutterCategory === "P7") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price7;
//                } else if (shutterCategory === "P8") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price8;
//                } else if (shutterCategory === "P9") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price9;
//                } else if (shutterCategory === "P10") {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price10;
//                } else {
//                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = 0;
//                }
//            });
//            $scope.$watch('editableInfinityWardrobeDetailMrp.handleCategory', function (handleCategory) {
//                if (handleCategory === "H1") {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh1;
//                } else if (handleCategory === "H2") {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh2;
//                } else if (handleCategory === "H3") {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh3;
//                } else if (handleCategory === "H4") {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh4;
//                } else if (handleCategory === "H5") {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh5;
//                } else {
//                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = 0;
//                }
//            });
//            $scope.$watch('editableInfinityWardrobeDetailMrp.hingesCode', function (hingeCode) {
//                if (hingeCode === "HS") {
//                    $scope.editableInfinityWardrobeDetailMrp.hinges = "Soft Close Hinges";
//                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.softCloseHinges;
//                } else if (hingeCode === "HB") {
//                    $scope.editableInfinityWardrobeDetailMrp.hinges = "Blum Soft Close Hinges";
//                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.blumSoftClose;
//                } else if (hingeCode === "HD") {
//                    $scope.editableInfinityWardrobeDetailMrp.hinges = "155 Degree Hinges";
//                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.degree155;
//                } else {
//                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = 0;
//                }
//            });
//            $scope.saveInfinityWardrobeMrpDetails = function (editableInfinityWardrobeDetailMrp) {
//                editableInfinityWardrobeDetailMrp.orderHeadId = $stateParams.orderHeadId;
//                editableInfinityWardrobeDetailMrp.price = (editableInfinityWardrobeDetailMrp.carcassPrice + editableInfinityWardrobeDetailMrp.shutterPrice + editableInfinityWardrobeDetailMrp.hingesPrice + editableInfinityWardrobeDetailMrp.handlePrice);
//                console.log("Infinity MRP Save :%O", editableInfinityWardrobeDetailMrp);
//                InfinityWardrobeMrpOrderDetailsService.save(editableInfinityWardrobeDetailMrp, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableInfinityWardrobeDetailMrp = "";
//                    $state.go('admin.masters_order_mrp_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//            };
//            /////////////////Infinity Wardrobe Funtionality Ends///////////////////
//            /////////////////Max Wardrobe Funtionality ///////////////////
//            $scope.editableMaxWardrobeDetailMrp = {};
//            $scope.showOr = true;
//            $scope.editableMaxWardrobeDetailMrp.carcass = "Supertuff HDF";
//            $scope.$watch('editableMaxWardrobeDetailMrp.category', function (category) {
//                console.log("Cateogry :" + category);
////                MaxWardrobeMrpService.findByCategory({
////                    'category': category
////                }, function (maxWardrobeComponentList) {
////                    $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
////                });
//                $scope.maxWardrobeWidthList = MaxWardrobeMrpService.findDistinctWidth({
//                    'category': category
//                });
//                $scope.maxWardrobeDepthList = MaxWardrobeMrpService.findDistinctDepth({
//                    'category': category
//                });
//                $scope.maxWardrobeHeightList = MaxWardrobeMrpService.findDistinctHeight({
//                    'category': category
//                });
//            });
//            $scope.$watch('editableMaxWardrobeDetailMrp.height', function (height) {
////                MaxWardrobeMrpService.findByCategoryDimensions({
////                    'category': $scope.editableMaxWardrobeDetailMrp.category,
////                    'width': $scope.editableMaxWardrobeDetailMrp.width,
////                    'depth': $scope.editableMaxWardrobeDetailMrp.depth,
////                    'height': height
////                }, function (maxWardrobeComponentList) {
////                    console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
////                    $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
////                });
//            });
//            $scope.$watch('editableMaxWardrobeDetailMrp.componentId', function (componentId) {
//                $scope.maxWardrobeMrpObject = MaxWardrobeMrpService.get({
//                    'id': componentId
//                }, function (maxWardrobeMrpObject) {
////                    $scope.editableMaxWardrobeDetailMrp.width = maxWardrobeMrpObject.width;
////                    $scope.editableMaxWardrobeDetailMrp.depth = maxWardrobeMrpObject.depth;
////                    $scope.editableMaxWardrobeDetailMrp.height = maxWardrobeMrpObject.height;
//                    $scope.editableMaxWardrobeDetailMrp.carcassPrice = maxWardrobeMrpObject.carcassPrice;
//                    $scope.editableMaxWardrobeDetailMrp.carcassColor = "Caspani";
//                    $scope.editableMaxWardrobeDetailMrp.productCode = maxWardrobeMrpObject.productCode;
//                    $scope.editableMaxWardrobeDetailMrp.description = maxWardrobeMrpObject.description;
//                });
//            });
//            $scope.$watch('editableMaxWardrobeDetailMrp.shutterCategory', function (shutterCategory) {
//                if (shutterCategory === "P1") {
//                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price1;
//                    $scope.editableMaxWardrobeDetailMrp.shutterColor = "Natural Wenge";
//                } else if (shutterCategory === "P2") {
//                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price2;
//                    $scope.editableMaxWardrobeDetailMrp.shutterColor = "Natural Wenge";
//                } else if (shutterCategory === "P3") {
//                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price3;
//                    $scope.editableMaxWardrobeDetailMrp.shutterColor = "Natural Wenge";
//                } else if (shutterCategory === "P4") {
//                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price4;
//                    $scope.editableMaxWardrobeDetailMrp.shutterColor = "Natural Wenge";
//                } else {
//                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = 0;
//                }
//            });
//            $scope.$watch('editableMaxWardrobeDetailMrp.handleCategory', function (handleCategory) {
//                if (handleCategory === "H1") {
//                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh1;
//                } else if (handleCategory === "H2") {
//                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh2;
//                } else if (handleCategory === "H3") {
//                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh3;
//                } else if (handleCategory === "H4") {
//                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh4;
//                } else {
//                    $scope.editableMaxWardrobeDetailMrp.handlePrice = 0;
//                }
//            });
//            $scope.$watch('editableMaxWardrobeDetailMrp.hingesCode', function (hingeCode) {
//                if (hingeCode === "HS") {
//                    $scope.editableMaxWardrobeDetailMrp.hinges = "Soft Close Hinges";
//                    $scope.editableMaxWardrobeDetailMrp.hingesPrice = $scope.maxWardrobeMrpObject.softCloseHinges;
//                } else {
//                    $scope.editableMaxWardrobeDetailMrp.hingesPrice = 0;
//                }
//            });
//            $scope.saveMaxWardrobeMrpDetails = function (editableMaxWardrobeDetailMrp) {
//                editableMaxWardrobeDetailMrp.orderHeadId = $stateParams.orderHeadId;
//                editableMaxWardrobeDetailMrp.price = (editableMaxWardrobeDetailMrp.carcassPrice + editableMaxWardrobeDetailMrp.shutterPrice + editableMaxWardrobeDetailMrp.hingesPrice + editableMaxWardrobeDetailMrp.handlePrice);
//                console.log("Max MRP Save :%O", editableMaxWardrobeDetailMrp);
//                MaxWardrobeMrpOrderDetailsService.save(editableMaxWardrobeDetailMrp, function () {
//                    console.log("Saved Successfully");
//                    $scope.editableMaxWardrobeDetailMrp = "";
//                    $state.go('admin.masters_order_mrp_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//            };
//            /////////////////Max Wardrobe Funtionality Ends///////////////////
//            /////////////////Dealer Component Offering Starts/////////////////
//            $scope.editableDealerComponent = {};
//            $scope.currentUser = $rootScope.currentUser;
//            UserService.findByUsername({
//                'username': $scope.currentUser.username
//            }, function (userObject) {
//                $scope.userObject = userObject;
//                if (userObject.role === "ROLE_ADMIN") {
//                    $scope.adminLogin = true;
//                    $scope.dealerLogin = false;
//                } else if (userObject.role === "ROLE_DEALER") {
//                    $scope.adminLogin = false;
//                    $scope.dealerLogin = true;
//                } else if (userObject.role === "ROLE_DEALER_PRO") {
//                    $scope.adminLogin = false;
//                    $scope.dealerLogin = true;
//                } else if (userObject.role === "ROLE_DEALER_STAFF") {
//                    $scope.adminLogin = false;
//                    $scope.dealerLogin = true;
//                }
//            });
////            $scope.manufacturerList = ManufacturerService.findAllList();
//            $scope.manufacturerCategoryList = ManufacturerCategoryService.findAllList();
//
//            $scope.$watch('editableDealerComponent.manufacturer', function (manufacturerCode) {
//                $scope.dealerSkuList = DealerSkuService.findByManufacturerAndManufacturerCategoryByUser({
//                    'manufacturer': manufacturerCode,
//                    'manufacturerCategory': $scope.editableDealerComponent.manufacturerCategory,
//                    'createdBy': $scope.userObject.id
//                });
//            });
//            $scope.manufacturerList = [];
//            $scope.$watch('editableDealerComponent.manufacturerCategory', function (manufacturerCategory) {
//                console.log("Manufacturer Category :%O", manufacturerCategory);
//                ManufacturerCategoryService.findByCategoryCode({
//                    'categoryCode': manufacturerCategory
//                }, function (manufacturerCategoryObject) {
//                    angular.forEach(manufacturerCategoryObject.manufacturers, function (manufacturerId) {
//                        ManufacturerService.get({
//                            'id': manufacturerId
//                        }, function (manufacturerObject) {
//                            $scope.manufacturerList.push(manufacturerObject);
//                        });
//                    });
//                });
////                $scope.dealerSkuList = DealerSkuService.findByManufacturerAndManufacturerCategoryByUser({
////                    'manufacturer': $scope.editableDealerComponent.manufacturerCode,
////                    'manufacturerCategory': manufacturerCategory,
////                    'createdBy': $scope.userObject.id
////                });
//            });
//
//            $scope.$watch('editableDealerComponent.product', function (dealerSkuId) {
//                console.log("Dealer SKU Id :%O", dealerSkuId);
//                DealerSkuService.get({
//                    'id': dealerSkuId
//                }, function (dealerSkuObject) {
//                    $scope.editableDealerComponent.manufacturerCategoryCode = dealerSkuObject.manufacturerCategoryCode;
//                    $scope.editableDealerComponent.moduleCode = dealerSkuObject.productCode;
//                    $scope.editableDealerComponent.description = dealerSkuObject.productDescription + " & Color / Finish : (" + dealerSkuObject.color + ")";
//                    $scope.editableDealerComponent.color = dealerSkuObject.color;
//                    $scope.editableDealerComponent.width = dealerSkuObject.width;
//                    $scope.editableDealerComponent.depth = dealerSkuObject.depth;
//                    $scope.editableDealerComponent.height = dealerSkuObject.height;
//                    $scope.editableDealerComponent.unitPrice = dealerSkuObject.price;
//                    $scope.editableDealerComponent.orderFor = "DEALER_SKU";
//                    $scope.editableDealerComponent.orderHeadId = $stateParams.orderHeadId;
//                });
//            });
//            $scope.saveDealerComponents = function (editableDealerComponent) {
//                editableDealerComponent.price = (editableDealerComponent.unitPrice * editableDealerComponent.quantity);
//                editableDealerComponent.productCode = editableDealerComponent.manufacturer + "" + editableDealerComponent.manufacturerCategory + "" + editableDealerComponent.moduleCode;
//                console.log("Editable Dealer Component :%O", editableDealerComponent);
//                DealerSkuOrderDetailsService.save(editableDealerComponent, function () {
//                    $state.go('admin.masters_order_mrp_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//
//            };
//            /////////////////Dealer Component Offering Endss/////////////////
//            /////////////////Listing/////////////////////////////////////////
//            $scope.infinityWardrobeMrpOrders = InfinityWardrobeMrpOrderDetailsService.findByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
//            });
//            $scope.maxWardrobeMrpOrders = MaxWardrobeMrpOrderDetailsService.findByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
//            });
//            $scope.dealerSkuMrpOrders = DealerSkuOrderDetailsService.findByOrderHeadId({
//                'orderHeadId': $stateParams.orderHeadId
//            }, function (dealerSkuMrpOrdersList) {
//                console.log("Dealer SKU MRP Order List :%O", dealerSkuMrpOrdersList);
//            });
//            //////////////////////Selection Widget Functionality///////////////////////
//            $scope.showMaxWardrobeSelectionWidget = false;
//            $scope.closeWidget = function () {
//                $scope.showMaxWardrobeSelectionWidget = false;
//                $scope.preMaxWardrobe = {};
//            };
//            $scope.openMaxWardrobe = function () {
//                $scope.maxWardrobeList1 = [];
//                console.log("Width :%O", $scope.editableMaxWardrobeDetailMrp.width);
//                if ($scope.editableMaxWardrobeDetailMrp.width === undefined & $scope.editableMaxWardrobeDetailMrp.depth === undefined & $scope.editableMaxWardrobeDetailMrp.height === undefined) {
//                    console.log("Everything Blank");
//                    alert("Select Atleast Any One Dimension Attribute like Width, Depth Or Height");
//                } else if ($scope.editableMaxWardrobeDetailMrp.width !== undefined & $scope.editableMaxWardrobeDetailMrp.depth === undefined & $scope.editableMaxWardrobeDetailMrp.height === undefined) {
//                    console.log("By Width");
//                    MaxWardrobeMrpService.findByCategoryDimensionsWidth({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'width': $scope.editableMaxWardrobeDetailMrp.width
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else if ($scope.editableMaxWardrobeDetailMrp.width === undefined & $scope.editableMaxWardrobeDetailMrp.depth !== undefined & $scope.editableMaxWardrobeDetailMrp.height === undefined) {
//                    console.log("By Depth");
//                    MaxWardrobeMrpService.findByCategoryDimensionsDepth({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'depth': $scope.editableMaxWardrobeDetailMrp.depth
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else if ($scope.editableMaxWardrobeDetailMrp.width === undefined & $scope.editableMaxWardrobeDetailMrp.depth === undefined & $scope.editableMaxWardrobeDetailMrp.height !== undefined) {
//                    console.log("By Height");
//                    MaxWardrobeMrpService.findByCategoryDimensionsHeight({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'height': $scope.editableMaxWardrobeDetailMrp.height
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else if ($scope.editableMaxWardrobeDetailMrp.width === undefined & $scope.editableMaxWardrobeDetailMrp.depth !== undefined & $scope.editableMaxWardrobeDetailMrp.height !== undefined) {
//                    console.log("By Depth Height");
//                    MaxWardrobeMrpService.findByCategoryDimensionsDepthHeight({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'depth': $scope.editableMaxWardrobeDetailMrp.depth,
//                        'height': $scope.editableMaxWardrobeDetailMrp.height
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else if ($scope.editableMaxWardrobeDetailMrp.width !== undefined & $scope.editableMaxWardrobeDetailMrp.depth === undefined & $scope.editableMaxWardrobeDetailMrp.height !== undefined) {
//                    console.log("By Width Height");
//                    MaxWardrobeMrpService.findByCategoryDimensionsWidthHeight({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'width': $scope.editableMaxWardrobeDetailMrp.width,
//                        'height': $scope.editableMaxWardrobeDetailMrp.height
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else if ($scope.editableMaxWardrobeDetailMrp.width !== undefined & $scope.editableMaxWardrobeDetailMrp.depth !== undefined & $scope.editableMaxWardrobeDetailMrp.height === undefined) {
//                    console.log("By Width Depth");
//                    MaxWardrobeMrpService.findByCategoryDimensionsWidthDepth({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'width': $scope.editableMaxWardrobeDetailMrp.width,
//                        'depth': $scope.editableMaxWardrobeDetailMrp.depth
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                } else {
//                    console.log("By Everything");
//                    MaxWardrobeMrpService.findByCategoryDimensions({
//                        'category': $scope.editableMaxWardrobeDetailMrp.category,
//                        'width': $scope.editableMaxWardrobeDetailMrp.width,
//                        'depth': $scope.editableMaxWardrobeDetailMrp.depth,
//                        'height': $scope.editableMaxWardrobeDetailMrp.height
//                    }, function (maxWardrobeComponentList) {
//                        console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
//                        $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                        angular.forEach(maxWardrobeComponentList, function (maxWardrobeComponent) {
//                            $scope.maxWardrobeList1.push(maxWardrobeComponent);
//                        });
//                        $scope.showMaxWardrobeSelectionWidget = true;
//                    });
//                }
//            };
//            $scope.selectMaxWardrobe = function (componentId) {
//                $scope.closeWidget();
//                MaxWardrobeMrpService.get({
//                    'id': componentId
//                }, function (maxWardrobeObject) {
//                    $scope.componentName = maxWardrobeObject.description;
//                    console.log("Width :" + maxWardrobeObject.width);
//                    console.log("Depth :" + maxWardrobeObject.depth);
//                    console.log("Height :" + maxWardrobeObject.height);
//                    $scope.showOr = false;
//                    $scope.editableMaxWardrobeDetailMrp.width = maxWardrobeObject.width.toString();
//                    $scope.editableMaxWardrobeDetailMrp.depth = maxWardrobeObject.depth.toString();
//                    $scope.editableMaxWardrobeDetailMrp.height = maxWardrobeObject.height.toString();
//                    $scope.editableMaxWardrobeDetailMrp.componentId = componentId;
////                    $scope.shutterComponent = maxWardrobeObject.componentCode;
//                });
//            };
//            $scope.selectPreMaxWardrobe = function (componentId) {
//                MaxWardrobeMrpService.get({
//                    'id': componentId
//                }, function (maxWardrobeComponent) {
//                    $scope.preMaxWardrobe = maxWardrobeComponent;
//                });
//            };
            /////////////////////////////////////////////////////////////////
        })
        .controller('MrpProformaInvoiceDisplayController', function (MaxWardrobeMrpOrderDetailsService, MaxWardrobeMrpService, OrderHeadService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentUser = $rootScope.currentUser;
            $scope.showMrpFeature = false;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
                console.log("THis is User Object :%O", userObject);
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.showMrpFeature = true;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.showMrpFeature = false;
                } else if (userObject.role === "ROLE_DEALER_PRO") {
                    console.log("Pro Dealer");
                    $scope.showMrpFeature = true;
                } else if (userObject.role === "ROLE_DEALER_STAFF") {
                    console.log("Regular Dealer Staff");
                    $scope.showMrpFeature = true;
                }
            });
            $scope.currentDate = new Date();
            var totalPrice = 0;
            var maxWardrobeMrpPrice = 0;
            $scope.mainInvoiceList = [];
            $scope.showCgst = false;
            $scope.showIgst = false;
            $scope.gstObject = {};
            if ($scope.mainInvoiceList.length === 0) {
                console.log("Initial Length 0");
                $scope.srNo = 0;
            }

            OrderHeadMrpService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderMrpHead = orderHeadObject;
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });

            $scope.maxWardrobeMrpOrderDetailsList = MaxWardrobeMrpOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxWardrobeMrpOrdersList) {
                console.log("Max Wardrobe MRP Order List :%O", maxWardrobeMrpOrdersList);
                angular.forEach($scope.maxWardrobeMrpOrderDetailsList, function (maxWardrobeMrpObject) {
                    totalPrice = totalPrice + maxWardrobeMrpObject.price;
                    maxWardrobeMrpPrice = maxWardrobeMrpPrice + maxWardrobeMrpObject.price;
                    $scope.mainInvoiceList.push(maxWardrobeMrpObject);
                });
                $scope.otherMaxWardrobeMrpTotalPrice = maxWardrobeMrpPrice;
                $scope.captureTotal($scope.otherMaxWardrobeMrpTotalPrice);
            });

            ///////////////////////////////////////////
            $scope.getTotal = 0;
            var totalArr = [];
            $scope.captureTotal = function (total) {
                console.log("Total :%O", total);
                totalArr.push(total);
                angular.forEach(totalArr, function (price) {
                });
                $scope.getTotal = $scope.getTotal + total;
                console.log("THIS IS IT " + $scope.getTotal);
                $scope.orderTotal = $scope.getTotal;
                console.log("$scope.orderHead :%O", $scope.orderHead);
                $scope.netAmount = Math.round(($scope.orderTotal + ($scope.orderTotal * 0.18)));

            };
        })
        .controller('MrpCustomerProformaInvoiceDisplayController', function (MaxWardrobeMrpOrderDetailsService, MaxWardrobeMrpService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentDate = new Date();
            var totalPrice = 0;
            var maxWardrobeMrpPrice = 0;
            $scope.mainInvoiceList = [];
            $scope.showCgst = false;
            $scope.showIgst = false;
            $scope.gstObject = {};
            if ($scope.mainInvoiceList.length === 0) {
                console.log("Initial Length 0");
                $scope.srNo = 0;
            }

            OrderHeadMrpService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderMrpHead = orderHeadObject;
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });

            $scope.maxWardrobeMrpOrderDetailsList = MaxWardrobeMrpOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (maxWardrobeMrpOrdersList) {
                console.log("Max Wardrobe MRP Order List :%O", maxWardrobeMrpOrdersList);
                angular.forEach($scope.maxWardrobeMrpOrderDetailsList, function (maxWardrobeMrpObject) {
                    totalPrice = totalPrice + maxWardrobeMrpObject.price;
                    maxWardrobeMrpPrice = maxWardrobeMrpPrice + maxWardrobeMrpObject.price;
                    $scope.mainInvoiceList.push(maxWardrobeMrpObject);
                });
                $scope.otherMaxWardrobeMrpTotalPrice = maxWardrobeMrpPrice;
                $scope.captureTotal($scope.otherMaxWardrobeMrpTotalPrice);
            });

            ///////////////////////////////////////////
            $scope.getTotal = 0;
            var totalArr = [];
            $scope.captureTotal = function (total) {
                console.log("Total :%O", total);
                totalArr.push(total);
                angular.forEach(totalArr, function (price) {
                });
                $scope.getTotal = $scope.getTotal + total;
                console.log("THIS IS IT " + $scope.getTotal);
                $scope.orderTotal = $scope.getTotal;
                console.log("$scope.orderHead :%O", $scope.orderHead);
                $scope.netAmount = Math.round(($scope.orderTotal + ($scope.orderTotal * 0.18)));

            };
        })
        .controller('SkuOrderMrpDetailsDeleteController', function (DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDealerComponent = DealerSkuOrderDetailsService.get({
                'id': $stateParams.dealerSkuId
            });
            $scope.deleteDealerSku = function (dealerSku) {
                dealerSku.$delete(function () {
                    $state.go('admin.masters_order_details', {'orderHeadId': dealerSku.orderHeadId}, {'reload': true});
                });
            };
        })
        .controller('InfinityWardrobeOrderMrpDetailsDeleteController', function (InfinityWardrobeOrderDetailsService, MaxWardrobeMrpService, InfinityWardrobeMrpOrderDetailsService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableInfinityWardrobeDetailMrp = InfinityWardrobeOrderDetailsService.get({
                'id': $stateParams.infinityWardrobeDetailId
            });
            $scope.deleteInfinityWardrobeMrp = function (infinityWardrobeMrp) {
                infinityWardrobeMrp.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {'orderHeadId': infinityWardrobeMrp.orderHeadId}, {'reload': true});
                });
            };
        })
        .controller('MaxWardrobeOrderMrpDetailsDeleteController', function (MaxWardrobeMrpOrderDetailsService, InfinityWardrobeMrpService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableMaxWardrobeDetailMrp = MaxWardrobeMrpOrderDetailsService.get({
                'id': $stateParams.maxWardrobeDetailId
            });
            $scope.deleteMaxWardrobeMrp = function (maxWardrobeMrp) {
                maxWardrobeMrp.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {'orderHeadId': maxWardrobeMrp.orderHeadId}, {'reload': true});
                });
            };
        })
        .controller('InfinityWardrobeDetailDeleteController', function (InfinityWardrobeOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableInfinityWardrobeDetail = InfinityWardrobeOrderDetailsService.get({'id': $stateParams.infinityWardrobeDetailId});
            $scope.deleteInfinityWardrobeDetail = function (infinityOrderDetail) {
                console.log("Infinity Wardrobe Order Detail :%O", infinityOrderDetail);
                infinityOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $scope.editableInfinityWardrobeDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('UltimaWardrobeDetailDeleteController', function (UltimaWardrobeOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Pelmet:%O", $stateParams);
            $scope.editableUltimaWardrobeDetail = UltimaWardrobeOrderDetailsService.get({'id': $stateParams.ultimaWardrobeDetailId});
            $scope.deleteUltimaWardrobeDetail = function (ultimaOrderDetail) {
                console.log("Infinity Wardrobe Order Detail :%O", ultimaOrderDetail);
                ultimaOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $scope.editableUltimaWardrobeDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('MaxKitchenDetailDeleteController', function (MaxKitchenOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Kitchen:%O", $stateParams);
            $scope.editableMaxKitchenDetail = MaxKitchenOrderDetailsService.get({'id': $stateParams.maxKitchenDetailId});
            $scope.deleteMaxKitchenDetail = function (maxKitchenOrderDetail) {
                console.log("Max Order Detail :%O", maxKitchenOrderDetail);
                maxKitchenOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $scope.editableMaxKitchenDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        })
        .controller('MaxWardrobeDetailDeleteController', function (MaxWardrobeOrderDetailsService, $scope, $stateParams, $state, paginationLimit) {
            console.log("What are STate Params Kitchen:%O", $stateParams);
            $scope.editableMaxWardrobeDetail = MaxWardrobeOrderDetailsService.get({'id': $stateParams.maxWardrobeDetailId});
            $scope.deleteMaxWardrobeDetail = function (maxWardrobeOrderDetail) {
                console.log("Max Order Detail :%O", maxWardrobeOrderDetail);
                maxWardrobeOrderDetail.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $scope.editableMaxWardrobeDetail.orderHeadId
                    }, {'reload': true});
                });
            };
        });
 