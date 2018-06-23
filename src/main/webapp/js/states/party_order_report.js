/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.party_order_report", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.party_order_report_form', {
                'url': '/partyOrderReportForm',
                'templateUrl': templateRoot + '/reports/party_order_report/form.html',
                'controller': 'PartyOrderFormController'
            });
            $stateProvider.state('party_order_report_display', {
                'url': '/:partyId/:startDate/:endDate/generatePartyOrderReport',
                'templateUrl': templateRoot + '/reports/party_order_report/report.html',
                'controller': 'PartyOrderReportController'
            });
        })

        .controller('PartyOrderFormController', function (PartyService, $scope, $stateParams, $state, paginationLimit) {
            $scope.setParty = function (party) {
                $scope.partyName = party.dealerName;
                $scope.partyId = party.id;
            };
            $scope.searchParty = function (searchTerm) {
                return PartyService.findByNameLike({
                    'name': searchTerm
                }).$promise;
            };
        })
        .controller('PartyOrderReportController', function (PartyService, OrderHeadService, $scope, $stateParams, $state, paginationLimit) {
            PartyService.get({
                'id': $stateParams.partyId
            }, function (partyObject) {
                $scope.partyObject = partyObject;
            });
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
            $scope.orderHeadList = OrderHeadService.findOrderByPartyAndDuration({
                'partyId': $stateParams.partyId,
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