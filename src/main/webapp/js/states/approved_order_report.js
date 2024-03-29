/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.approved_order_report", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.approved_order_report_form', {
                'url': '/approvedOrderReportForm',
                'templateUrl': templateRoot + '/reports/approved_order_report/form.html',
                'controller': 'ApprovedOrderFormController'
            });
            $stateProvider.state('approved_order_report_display', {
                'url': '/:startDate/:endDate/generateApprovedOrderReport',
                'templateUrl': templateRoot + '/reports/approved_order_report/report.html',
                'controller': 'ApprovedOrderReportController'
            });
        })

        .controller('ApprovedOrderFormController', function ($scope, $stateParams, $state, paginationLimit) {

        })
        .controller('ApprovedOrderReportController', function (PartyService, OrderHeadService, $scope, $stateParams, $state, paginationLimit) {
//            console.log("State Params : %O", $stateParams);
//            var totalPrice = 0;
//            var carcassTotalPrice = 0;
//            var panelTotalPrice = 0;
//            var shutterTotalPrice = 0;
//            var drawerTotalPrice = 0;
//            var fillerTotalPrice = 0;
//            var pelmetTotalPrice = 0;
//            var corniceTotalPrice = 0;
//            var handleTotalPrice = 0;
//            var hardwareTotalPrice = 0;
//            var maxKitchenTotalPrice = 0;
//            var maxWardrobeTotalPrice = 0;
//            $scope.orderReportList = [];
            var date = new Date($stateParams.startDate).getDate();
            var month = new Date($stateParams.startDate).getMonth() + 1;
            var year = new Date($stateParams.startDate).getFullYear();
            $scope.queryDate = (year + "-" + month + "-" + date);
            var date1 = new Date($stateParams.endDate).getDate();
            var month1 = new Date($stateParams.endDate).getMonth() + 1;
            var year1 = new Date($stateParams.endDate).getFullYear();
            $scope.queryDate1 = (year1 + "-" + month1 + "-" + date1);
//            console.log("Query Date 1 SD:%O"+$scope.queryDate);
//            console.log("Query Date 2 ED:%O"+$scope.queryDate1);

            $scope.filterDate = new Date($stateParams.startDate);
            $scope.filterDate1 = new Date($stateParams.endDate);
            $scope.orderHeadList = OrderHeadService.findApprovalByDuration({
                'startDate': $scope.queryDate,
                'endDate': $scope.queryDate1
            }, function (orderHeadList) {
                angular.forEach($scope.orderHeadList, function (orderHeadObject) {
                    orderHeadObject.billingPartyObject = PartyService.get({
                        'id': orderHeadObject.billingPartyId
                    });
                    orderHeadObject.deliveryPartyObject = PartyService.get({
                        'id': orderHeadObject.deliveryPartyId
                    });
                });
//                angular.forEach($scope.orderHeadList, function (orderHeadObject) {
//                    var totalPrice = 0;
//                    var carcassTotalPrice = 0;
//                    var panelTotalPrice = 0;
//                    var shutterTotalPrice = 0;
//                    var drawerTotalPrice = 0;
//                    var fillerTotalPrice = 0;
//                    var pelmetTotalPrice = 0;
//                    var corniceTotalPrice = 0;
//                    var handleTotalPrice = 0;
//                    var hardwareTotalPrice = 0;
//                    var maxKitchenTotalPrice = 0;
//                    var carcassOrderPrice = 0;
//                    var panelOrderPrice = 0;
//                    var shutterOrderPrice = 0;
//                    var drawerOrderPrice = 0;
//                    var pelmetOrderPrice = 0;
//                    var corniceOrderPrice = 0;
//                    var handleOrderPrice = 0;
//                    var fillerOrderPrice = 0;
//                    var hardwareOrderPrice = 0;
//                    var maxKitchenOrderPrice = 0;
//                    var maxWardrobeOrderPrice = 0;
//
//                    orderHeadObject.billingPartyObject = PartyService.get({
//                        'id': orderHeadObject.billingPartyId
//                    });
//                    orderHeadObject.deliveryPartyObject = PartyService.get({
//                        'id': orderHeadObject.deliveryPartyId
//                    });
//                    /////////////////////Trial Begins//////////////////////////
//                    $scope.carcassDetailsList = CarcassOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (carcassOrderList) {
////                        $scope.carcassTotalPrice = 0;
////                        console.log("Carcass List :%O", carcassOrderList);
////                        console.log("Carcass Order List Length :%O", carcassOrderList.length);
////                        angular.forEach(carcassOrderList, function (carcassDetailObject) {
////                            carcassTotalPrice = carcassTotalPrice + carcassDetailObject.price;
////                        });
////                        $scope.carcassTotalPrice = carcassTotalPrice;
////                        carcassOrderPrice = carcassTotalPrice;
//                        if (carcassOrderList.length !== 0) {
//                            angular.forEach(carcassOrderList, function (carcassDetailObject) {
//                                carcassTotalPrice = carcassTotalPrice + carcassDetailObject.price;
//                            });
//                            $scope.carcassTotalPrice = carcassTotalPrice;
//                            carcassOrderPrice = carcassTotalPrice;
//                        } else {
//                            $scope.carcassTotalPrice = 0;
//                            carcassOrderPrice = 0;
//                        }
////                        $scope.captureTotal($scope.carcassTotalPrice);
//                    });
//                    $scope.panelDetailsList = PanelOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (panelOrderList) {
//                        if (panelOrderList.length !== 0) {
//                            angular.forEach(panelOrderList, function (panelDetailObject) {
////                            totalPrice = totalPrice + panelDetailObject.price;
//                                panelTotalPrice = panelTotalPrice + panelDetailObject.price;
//                            });
//                            $scope.panelTotalPrice = panelTotalPrice;
//                            panelOrderPrice = panelTotalPrice;
//                        } else {
//                            $scope.panelTotalPrice = 0;
//                            panelOrderPrice = 0;
//                        }
////                        angular.forEach(panelOrderList, function (panelDetailObject) {
//////                            totalPrice = totalPrice + panelDetailObject.price;
////                            panelTotalPrice = panelTotalPrice + panelDetailObject.price;
////                        });
////                        $scope.panelTotalPrice = panelTotalPrice;
////                        panelOrderPrice = panelTotalPrice;
////                        $scope.captureTotal($scope.panelTotalPrice);
//                    });
//                    $scope.fillerDetailsList = FillerOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (fillerOrderList) {
//                        if (fillerOrderList.length !== 0) {
//                            angular.forEach(fillerOrderList, function (fillerDetailObject) {
////                            totalPrice = totalPrice + fillerDetailObject.price;
//                                fillerTotalPrice = fillerTotalPrice + fillerDetailObject.price;
//                            });
//                            $scope.fillerTotalPrice = fillerTotalPrice;
//                            fillerOrderPrice = fillerTotalPrice;
//                        } else {
//                            $scope.fillerTotalPrice = 0;
//                            fillerOrderPrice = 0;
//                        }
////                        angular.forEach(fillerOrderList, function (fillerDetailObject) {
//////                            totalPrice = totalPrice + fillerDetailObject.price;
////                            fillerTotalPrice = fillerTotalPrice + fillerDetailObject.price;
////                        });
////                        $scope.fillerTotalPrice = fillerTotalPrice;
////                        fillerOrderPrice = fillerTotalPrice;
////                        $scope.captureTotal($scope.fillerTotalPrice);
//                    });
//                    $scope.pelmetDetailsList = PelmetOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (pelmetOrderList) {
//                        angular.forEach(pelmetOrderList, function (pelmetDetailObject) {
////                            totalPrice = totalPrice + pelmetDetailObject.price;
//                            pelmetTotalPrice = pelmetTotalPrice + pelmetDetailObject.price;
//                        });
//                        $scope.pelmetTotalPrice = pelmetTotalPrice;
//                        pelmetOrderPrice = pelmetTotalPrice;
////                        $scope.captureTotal($scope.pelmetTotalPrice);
//                    });
//                    $scope.corniceDetailsList = CorniceOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (corniceOrderList) {
//                        angular.forEach(corniceOrderList, function (corniceDetailObject) {
////                            totalPrice = totalPrice + corniceDetailObject.price;
//                            corniceTotalPrice = corniceTotalPrice + corniceDetailObject.price;
//                        });
//                        $scope.cornicetotalPrice = corniceTotalPrice;
//                        corniceOrderPrice = corniceTotalPrice;
////                        $scope.captureTotal(corniceTotalPrice);
//                    });
//                    $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (handleOrderList) {
//                        angular.forEach(handleOrderList, function (handleDetailObject) {
////                            totalPrice = totalPrice + handleDetailObject.price;
//                            handleTotalPrice = handleTotalPrice + handleDetailObject.price;
//                        });
//                        $scope.handleTotalPrice = handleTotalPrice;
//                        handleOrderPrice = handleTotalPrice;
////                        $scope.captureTotal($scope.handleTotalPrice);
//                    });
//                    $scope.hardwareDetailsList = HardwareOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (hardwareOrderList) {
//                        angular.forEach(hardwareOrderList, function (hardwareDetailObject) {
////                            totalPrice = totalPrice + hardwareDetailObject.price;
//                            hardwareTotalPrice = hardwareTotalPrice + hardwareDetailObject.price;
//                        });
//                        $scope.hardwareTotalPrice = hardwareTotalPrice;
//                        hardwareOrderPrice = hardwareTotalPrice;
////                        $scope.captureTotal($scope.hardwareTotalPrice);
//                    });
//                    $scope.maxKitchenDetailsList = MaxKitchenOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (maxKitchenOrderList) {
//                        angular.forEach(maxKitchenOrderList, function (maxKitchenDetailObject) {
////                            totalPrice = totalPrice + maxKitchenDetailObject.price;
//                            maxKitchenTotalPrice = maxKitchenTotalPrice + maxKitchenDetailObject.price;
//                        });
//                        $scope.maxKitchenTotalPrice = maxKitchenTotalPrice;
//                        maxKitchenOrderPrice = maxKitchenTotalPrice;
////                        $scope.captureTotal($scope.maxKitchenTotalPrice);
//                    });
//                    $scope.maxWardrobeDetailsList = MaxWardrobeOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (maxWardrobeOrderList) {
//                        angular.forEach(maxWardrobeOrderList, function (maxWardrobeDetailObject) {
////                            totalPrice = totalPrice + maxKitchenDetailObject.price;
//                            maxWardrobeTotalPrice = maxWardrobeTotalPrice + maxWardrobeDetailObject.price;
//                        });
//                        $scope.maxWardrobeTotalPrice = maxKitchenTotalPrice;
//                        maxWardrobeOrderPrice = maxWardrobeTotalPrice;
////                        $scope.captureTotal($scope.maxKitchenTotalPrice);
//                    });
//                    $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (shutterOrderList) {
//                        if (shutterOrderList.length !== 0) {
//                            angular.forEach(shutterOrderList, function (shutterDetailObject) {
////                            totalPrice = totalPrice + shutterDetailObject.price;
//                                shutterTotalPrice = shutterTotalPrice + shutterDetailObject.price;
//                            });
//                            $scope.shutterTotalPrice = shutterTotalPrice;
//                            shutterOrderPrice = shutterTotalPrice;
//                        } else {
//                            $scope.shutterTotalPrice = 0;
//                            shutterOrderPrice = 0;
//                        }
//                        angular.forEach(shutterOrderList, function (shutterDetailObject) {
////                            totalPrice = totalPrice + shutterDetailObject.price;
//                            shutterTotalPrice = shutterTotalPrice + shutterDetailObject.price;
//                        });
//                        $scope.shutterTotalPrice = shutterTotalPrice;
//                        shutterOrderPrice = shutterTotalPrice;
////                        $scope.captureTotal($scope.shutterTotalPrice);
//                    });
//                    $scope.drawerDetailsList = DrawerOrderDetailsService.findByOrderHeadId({
//                        'orderHeadId': orderHeadObject.id
//                    }, function (drawerOrderList) {
//                        angular.forEach(drawerOrderList, function (drawerDetailObject) {
////                            totalPrice = totalPrice + drawerDetailObject.price;
//                            drawerTotalPrice = drawerTotalPrice + drawerDetailObject.price;
//                        });
//                        $scope.drawerTotalPrice = drawerTotalPrice;
//                        drawerOrderPrice = drawerTotalPrice;
////                        $scope.captureTotal($scope.drawerTotalPrice);
//                    });
//                    $scope.carcassDetailsList.$promise.then(function (carcassDetails) {
//                        $scope.panelDetailsList.$promise.then(function (panelDetails) {
//                            $scope.shutterDetailsList.$promise.then(function (shutterDetails) {
//                                $scope.drawerDetailsList.$promise.then(function (drawerDetails) {
//                                    $scope.pelmetDetailsList.$promise.then(function (pelmetDetails) {
//                                        $scope.corniceDetailsList.$promise.then(function (corniceDetails) {
//                                            $scope.handleDetailsList.$promise.then(function (handleDetails) {
//                                                $scope.hardwareDetailsList.$promise.then(function (hardwareDetails) {
//                                                    $scope.maxKitchenDetailsList.$promise.then(function (maxKitchenDetails) {
//                                                        $scope.maxWardrobeDetailsList.$promise.then(function (maxWardrobeDetails) {
//                                                            orderHeadObject.orderAmount = (carcassOrderPrice + panelOrderPrice + shutterOrderPrice + drawerOrderPrice + fillerOrderPrice + pelmetOrderPrice + corniceOrderPrice + handleOrderPrice + hardwareOrderPrice + maxKitchenOrderPrice + maxWardrobeOrderPrice);
//                                                            if (orderHeadObject.billingPartyObject.state === "MS") {
//                                                                orderHeadObject.cgstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 9));
//                                                                orderHeadObject.sgstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 9));
//                                                                orderHeadObject.igstAmount = 0;
//                                                                orderHeadObject.netAmount = (orderHeadObject.orderAmount + orderHeadObject.cgstAmount + orderHeadObject.sgstAmount);
//                                                                console.log("Order Head Object MS:%O", orderHeadObject);
//                                                            } else if (orderHeadObject.billingPartyObject.state === "OMS") {
//                                                                orderHeadObject.cgstAmount = 0;
//                                                                orderHeadObject.sgstAmount = 0;
//                                                                orderHeadObject.igstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 18));
//                                                                orderHeadObject.netAmount = (orderHeadObject.orderAmount + orderHeadObject.igstAmount);
//                                                                console.log("Order Head Object OMS:%O", orderHeadObject);
//                                                            }
//                                                        });
//                                                    });
//                                                });
//                                            });
//                                        });
//                                    });
//                                });
//                            });
//                        });
//                    });
////                    $scope.getTotal = 0;
////                    var totalArr = [];
////                    $scope.captureTotal = function (total) {
////                        totalArr.push(total);
////                        angular.forEach(totalArr, function (price) {
////                        });
////                        $scope.getTotal = $scope.getTotal + total;
////                        $scope.orderTotal = $scope.getTotal;
////                        PartyService.get({
////                            'id': orderHeadObject.billingPartyId
////                        }, function (partyObject) {
////                            if (partyObject.state === "MS") {
////                                $scope.cgst = Math.round((($scope.orderTotal / 100) * 9));
////                                $scope.sgst = Math.round((($scope.orderTotal / 100) * 9));
////                                $scope.netAmount = Math.round(($scope.orderTotal + $scope.cgst + $scope.sgst));
////                                console.log("Net AMount MS:" + $scope.netAmount);
////                                orderHeadObject.orderAmount = $scope.orderTotal;
////                                orderHeadObject.cgstAmount = $scope.cgst;
////                                orderHeadObject.sgstAmount = $scope.sgst;
////                                orderHeadObject.igstAmount = 0;
////                                orderHeadObject.netAmount = $scope.netAmount;
////                                console.log("Final Order Head Object :%O", orderHeadObject);
////                                $scope.orderReportList.push(orderHeadObject);
////                            } else if (partyObject.state === "OMS") {
////                                $scope.igst = Math.round((($scope.orderTotal / 100) * 18));
////                                $scope.netAmount = Math.round(($scope.orderTotal + $scope.igst));
////                                console.log("Net AMount OMS:" + $scope.netAmount);
////                                orderHeadObject.orderAmount = $scope.orderTotal;
////                                orderHeadObject.cgstAmount = 0;
////                                orderHeadObject.sgstAmount = 0;
////                                orderHeadObject.igstAmount = $scope.igst;
////                                orderHeadObject.netAmount = $scope.netAmount;
////                                $scope.orderReportList.push(orderHeadObject);
////                            }
////
////                        });
////                    };
//                    ////////////////////Trial ENds/////////////////////////////
//                });
            });
//            console.log("order Report List :%O", $scope.orderReportList);            
        });


