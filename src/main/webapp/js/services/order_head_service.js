/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.order_head", []);
angular.module("digitalbusiness.services.order_head")
        .factory('OrderHeadService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/order_head/:id', {'id': '@id'}, {

//                'findByNameLike': {
//                    'method': 'GET',
//                    'url': restRoot + '/employee/find/user_like',
//                    'params': {
//                        'name': '@name'
//                    },
//                    'isArray': true
//                },
                'findOrderGenerationSource': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/initiatedBy',
                    'params': {
                        'userId': '@userId'
                    },
                    'isArray': true
                },
                'findByBillingPartyId': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/by/billingParty',
                    'params': {
                        'partyId': '@partyId'
                    },
                    'isArray': true
                },
                'findByBillingPartyIdOffset': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/by/billingParty/offset',
                    'params': {
                        'partyId': '@partyId',
                        'offset': '@offset'
                    },
                    'isArray': true
                },
                'findByApprovalDate': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/approvalDate',
                    'params': {
                        'approvalDate': '@approvalDate'
                    },
                    'isArray': true
                },
                'findApprovalByDuration': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/approval/duration',
                    'params': {
                        'startDate': '@startDate',
                        'endDate': '@endDate'
                    },
                    'isArray': true
                },
                'findUnApprovedOrderByDuration': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/unapproval/duration',
                    'params': {
                        'startDate': '@startDate',
                        'endDate': '@endDate'
                    },
                    'isArray': true
                },
                'findByOrderNumber': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/orderNum',
                    'params': {
                        'orderNum': '@orderNum'                        
                    },
                    'isArray': true
                },
                'findOrderByPartyAndDuration': {
                    'method': 'GET',
                    'url': restRoot + '/order_head/find/party/duration',
                    'params': {
                        'partyId': '@partyId',
                        'startDate': '@startDate',
                        'endDate': '@endDate'
                    },
                    'isArray': true
                }
            });
        });




