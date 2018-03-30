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
        .controller('ApprovedOrderReportController', function (PartyService, OrderHeadService, $scope, $stateParams, $state, paginationLimit) {            
            var date = new Date($stateParams.approvalDate).getDate();
            var month = new Date($stateParams.approvalDate).getMonth() + 1;
            var year = new Date($stateParams.approvalDate).getFullYear();
            $scope.queryDate = (year + "-" + month + "-" + date);
            $scope.filterDate = new Date($stateParams.approvalDate);
            $scope.orderHeadList = OrderHeadService.findByApprovalDate({
                'approvalDate': $scope.queryDate
            }, function (orderHeadList) {                                 
                angular.forEach(orderHeadList, function (orderHeadObject) {
                        orderHeadObject.billingPartyObject = PartyService.get({
                            'id': orderHeadObject.billingPartyId
                        });
                        orderHeadObject.deliveryPartyObject = PartyService.get({
                            'id': orderHeadObject.deliveryPartyId
                        });
                    });
            });

        });


