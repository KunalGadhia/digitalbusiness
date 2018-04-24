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
                'url': '/:approvalDate/generateApprovedOrderReport',
                'templateUrl': templateRoot + '/reports/approved_order_report/report.html',
                'controller': 'ApprovedOrderReportController'
            });
        })

        .controller('ApprovedOrderFormController', function ($scope, $stateParams, $state, paginationLimit) {

        })
        .controller('ApprovedOrderReportController', function (MaxKitchenOrderDetailsService, HardwareOrderDetailsService, HandleOrderDetailsService, CorniceOrderDetailsService, PelmetOrderDetailsService, FillerOrderDetailsService, DrawerOrderDetailsService, ShutterOrderDetailsService, PanelOrderDetailsService, CarcassOrderDetailsService, PartyService, OrderHeadService, $scope, $stateParams, $state, paginationLimit) {
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
            $scope.orderReportList = [];

            var date = new Date($stateParams.approvalDate).getDate();
            var month = new Date($stateParams.approvalDate).getMonth() + 1;
            var year = new Date($stateParams.approvalDate).getFullYear();
            $scope.queryDate = (year + "-" + month + "-" + date);
            $scope.filterDate = new Date($stateParams.approvalDate);
            $scope.orderHeadList = OrderHeadService.findByApprovalDate({
                'approvalDate': $scope.queryDate
            }, function (orderHeadList) {
                angular.forEach($scope.orderHeadList, function (orderHeadObject) {
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
                    var carcassOrderPrice = 0;
                    var panelOrderPrice = 0;
                    var shutterOrderPrice = 0;
                    var drawerOrderPrice = 0;
                    var pelmetOrderPrice = 0;
                    var corniceOrderPrice = 0;
                    var handleOrderPrice = 0;
                    var fillerOrderPrice = 0;
                    var hardwareOrderPrice = 0;
                    var maxKitchenOrderPrice = 0;

                    orderHeadObject.billingPartyObject = PartyService.get({
                        'id': orderHeadObject.billingPartyId
                    });
                    orderHeadObject.deliveryPartyObject = PartyService.get({
                        'id': orderHeadObject.deliveryPartyId
                    });                    
                    /////////////////////Trial Begins//////////////////////////
                    $scope.carcassDetailsList = CarcassOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (carcassOrderList) {                        
//                        $scope.carcassTotalPrice = 0;
                        angular.forEach(carcassOrderList, function (carcassDetailObject) {
                            carcassTotalPrice = carcassTotalPrice + carcassDetailObject.price;
                        });
                        $scope.carcassTotalPrice = carcassTotalPrice;
                        carcassOrderPrice = carcassTotalPrice;                        
//                        $scope.captureTotal($scope.carcassTotalPrice);
                    });
                    $scope.panelDetailsList = PanelOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (panelOrderList) {                        
                        angular.forEach(panelOrderList, function (panelDetailObject) {
//                            totalPrice = totalPrice + panelDetailObject.price;
                            panelTotalPrice = panelTotalPrice + panelDetailObject.price;
                        });
                        $scope.panelTotalPrice = panelTotalPrice;
                        panelOrderPrice = panelTotalPrice;
//                        $scope.captureTotal($scope.panelTotalPrice);
                    });
                    $scope.fillerDetailsList = FillerOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (fillerOrderList) {
                        angular.forEach(fillerOrderList, function (fillerDetailObject) {
//                            totalPrice = totalPrice + fillerDetailObject.price;
                            fillerTotalPrice = fillerTotalPrice + fillerDetailObject.price;
                        });
                        $scope.fillerTotalPrice = fillerTotalPrice;
                        fillerOrderPrice = fillerTotalPrice;
//                        $scope.captureTotal($scope.fillerTotalPrice);
                    });
                    $scope.pelmetDetailsList = PelmetOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (pelmetOrderList) {
                        angular.forEach(pelmetOrderList, function (pelmetDetailObject) {
//                            totalPrice = totalPrice + pelmetDetailObject.price;
                            pelmetTotalPrice = pelmetTotalPrice + pelmetDetailObject.price;
                        });
                        $scope.pelmetTotalPrice = pelmetTotalPrice;
                        pelmetOrderPrice = pelmetTotalPrice;
//                        $scope.captureTotal($scope.pelmetTotalPrice);
                    });
                    $scope.corniceDetailsList = CorniceOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (corniceOrderList) {
                        angular.forEach(corniceOrderList, function (corniceDetailObject) {
//                            totalPrice = totalPrice + corniceDetailObject.price;
                            corniceTotalPrice = corniceTotalPrice + corniceDetailObject.price;
                        });
                        $scope.cornicetotalPrice = corniceTotalPrice;
                        corniceOrderPrice = corniceTotalPrice;
//                        $scope.captureTotal(corniceTotalPrice);
                    });
                    $scope.handleDetailsList = HandleOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (handleOrderList) {
                        angular.forEach(handleOrderList, function (handleDetailObject) {
//                            totalPrice = totalPrice + handleDetailObject.price;
                            handleTotalPrice = handleTotalPrice + handleDetailObject.price;
                        });
                        $scope.handleTotalPrice = handleTotalPrice;
                        handleOrderPrice = handleTotalPrice;
//                        $scope.captureTotal($scope.handleTotalPrice);
                    });
                    $scope.hardwareDetailsList = HardwareOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (hardwareOrderList) {
                        angular.forEach(hardwareOrderList, function (hardwareDetailObject) {
//                            totalPrice = totalPrice + hardwareDetailObject.price;
                            hardwareTotalPrice = hardwareTotalPrice + hardwareDetailObject.price;
                        });
                        $scope.hardwareTotalPrice = hardwareTotalPrice;
                        hardwareOrderPrice = hardwareTotalPrice;
//                        $scope.captureTotal($scope.hardwareTotalPrice);
                    });
                    $scope.maxKitchenDetailsList = MaxKitchenOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (maxKitchenOrderList) {
                        angular.forEach(maxKitchenOrderList, function (maxKitchenDetailObject) {
//                            totalPrice = totalPrice + maxKitchenDetailObject.price;
                            maxKitchenTotalPrice = maxKitchenTotalPrice + maxKitchenDetailObject.price;
                        });
                        $scope.maxKitchenTotalPrice = maxKitchenTotalPrice;
                        maxKitchenOrderPrice = maxKitchenTotalPrice;
//                        $scope.captureTotal($scope.maxKitchenTotalPrice);
                    });
                    $scope.shutterDetailsList = ShutterOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (shutterOrderList) {
                        angular.forEach(shutterOrderList, function (shutterDetailObject) {
//                            totalPrice = totalPrice + shutterDetailObject.price;
                            shutterTotalPrice = shutterTotalPrice + shutterDetailObject.price;
                        });
                        $scope.shutterTotalPrice = shutterTotalPrice;
                        shutterOrderPrice = shutterTotalPrice;
//                        $scope.captureTotal($scope.shutterTotalPrice);
                    });
                    $scope.drawerDetailsList = DrawerOrderDetailsService.findByOrderHeadId({
                        'orderHeadId': orderHeadObject.id
                    }, function (drawerOrderList) {
                        angular.forEach(drawerOrderList, function (drawerDetailObject) {
//                            totalPrice = totalPrice + drawerDetailObject.price;
                            drawerTotalPrice = drawerTotalPrice + drawerDetailObject.price;
                        });
                        $scope.drawerTotalPrice = drawerTotalPrice;
                        drawerOrderPrice = drawerTotalPrice;
//                        $scope.captureTotal($scope.drawerTotalPrice);
                    });
                    $scope.carcassDetailsList.$promise.then(function (carcassDetails) {
                        $scope.panelDetailsList.$promise.then(function (panelDetails) {
                            $scope.shutterDetailsList.$promise.then(function (shutterDetails) {
                                $scope.drawerDetailsList.$promise.then(function (drawerDetails) {
                                    $scope.pelmetDetailsList.$promise.then(function (pelmetDetails) {
                                        $scope.corniceDetailsList.$promise.then(function (corniceDetails) {
                                            $scope.handleDetailsList.$promise.then(function (handleDetails) {
                                                $scope.hardwareDetailsList.$promise.then(function (hardwareDetails) {
                                                    $scope.maxKitchenDetailsList.$promise.then(function (maxKitchenDetails) {
                                                        orderHeadObject.orderAmount = (carcassOrderPrice + panelOrderPrice + shutterOrderPrice + drawerOrderPrice + fillerOrderPrice + pelmetOrderPrice + corniceOrderPrice + handleOrderPrice + hardwareOrderPrice + maxKitchenOrderPrice);
                                                        if (orderHeadObject.billingPartyObject.state === "MS") {                                                            
                                                            orderHeadObject.cgstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 9));
                                                            orderHeadObject.sgstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 9));
                                                            orderHeadObject.igstAmount = 0;
                                                            orderHeadObject.netAmount = (orderHeadObject.orderAmount + orderHeadObject.cgstAmount + orderHeadObject.sgstAmount);
                                                            console.log("Order Head Object MS:%O",orderHeadObject);
                                                        } else if (orderHeadObject.billingPartyObject.state === "OMS") {
                                                            orderHeadObject.cgstAmount = 0;
                                                            orderHeadObject.sgstAmount = 0;
                                                            orderHeadObject.igstAmount = Math.round(((orderHeadObject.orderAmount / 100) * 18));
                                                            orderHeadObject.netAmount = (orderHeadObject.orderAmount + orderHeadObject.igstAmount);
                                                            console.log("Order Head Object OMS:%O",orderHeadObject);
                                                        }                                                        
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
//                    $scope.getTotal = 0;
//                    var totalArr = [];
//                    $scope.captureTotal = function (total) {
//                        totalArr.push(total);
//                        angular.forEach(totalArr, function (price) {
//                        });
//                        $scope.getTotal = $scope.getTotal + total;
//                        $scope.orderTotal = $scope.getTotal;
//                        PartyService.get({
//                            'id': orderHeadObject.billingPartyId
//                        }, function (partyObject) {
//                            if (partyObject.state === "MS") {
//                                $scope.cgst = Math.round((($scope.orderTotal / 100) * 9));
//                                $scope.sgst = Math.round((($scope.orderTotal / 100) * 9));
//                                $scope.netAmount = Math.round(($scope.orderTotal + $scope.cgst + $scope.sgst));
//                                console.log("Net AMount MS:" + $scope.netAmount);
//                                orderHeadObject.orderAmount = $scope.orderTotal;
//                                orderHeadObject.cgstAmount = $scope.cgst;
//                                orderHeadObject.sgstAmount = $scope.sgst;
//                                orderHeadObject.igstAmount = 0;
//                                orderHeadObject.netAmount = $scope.netAmount;
//                                console.log("Final Order Head Object :%O", orderHeadObject);
//                                $scope.orderReportList.push(orderHeadObject);
//                            } else if (partyObject.state === "OMS") {
//                                $scope.igst = Math.round((($scope.orderTotal / 100) * 18));
//                                $scope.netAmount = Math.round(($scope.orderTotal + $scope.igst));
//                                console.log("Net AMount OMS:" + $scope.netAmount);
//                                orderHeadObject.orderAmount = $scope.orderTotal;
//                                orderHeadObject.cgstAmount = 0;
//                                orderHeadObject.sgstAmount = 0;
//                                orderHeadObject.igstAmount = $scope.igst;
//                                orderHeadObject.netAmount = $scope.netAmount;
//                                $scope.orderReportList.push(orderHeadObject);
//                            }
//
//                        });
//                    };
                    ////////////////////Trial ENds/////////////////////////////
                });
            });
            console.log("order Report List :%O", $scope.orderReportList);
            console.log("orderHead List :%O", $scope.orderHeadList);

        });


