/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.unapproved_order_report", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.unapproved_order_report_form', {
                'url': '/unapprovedOrderReportForm',
                'templateUrl': templateRoot + '/reports/unapproved_order_report/form.html',
                'controller': 'UnapprovedOrderFormController'
            });
            $stateProvider.state('unapproved_order_report_display', {
                'url': '/:startDate/:endDate/generateUnapprovedOrderReport',
                'templateUrl': templateRoot + '/reports/unapproved_order_report/report.html',
                'controller': 'UnapprovedOrderReportController'
            });
        })

        .controller('UnapprovedOrderFormController', function ($scope, $stateParams, $state, paginationLimit) {

        })
        .controller('UnapprovedOrderReportController', function (PartyService, OrderHeadService, $scope, $stateParams, $state, paginationLimit) {
            var date = new Date($stateParams.startDate).getDate();
            var month = new Date($stateParams.startDate).getMonth() + 1;
            var year = new Date($stateParams.startDate).getFullYear();
            $scope.queryDate = (year + "-" + month + "-" + date);
            var date1 = new Date($stateParams.endDate).getDate();
            var month1 = new Date($stateParams.endDate).getMonth() + 1;
            var year1 = new Date($stateParams.endDate).getFullYear();
            $scope.queryDate1 = (year1 + "-" + month1 + "-" + date1);

            $scope.filterDate = new Date($stateParams.startDate);
            $scope.filterDate1 = new Date($stateParams.endDate);
            $scope.orderHeadList = OrderHeadService.findUnApprovedOrderByDuration({
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
            });
        });


