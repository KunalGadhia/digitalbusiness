/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.order_head_mrp", []);
angular.module("digitalbusiness.services.order_head_mrp")
        .factory('OrderHeadMrpService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/order_head_mrp/:id', {'id': '@id'}, {

                'findOrderGenerationSource': {
                    'method': 'GET',
                    'url': restRoot + '/order_head_mrp/find/initiatedBy',
                    'params': {
                        'userId': '@userId'
                    },
                    'isArray': true
                },                
                'findByOrderNumber': {
                    'method': 'GET',
                    'url': restRoot + '/order_head_mrp/find/orderNum',
                    'params': {
                        'orderNum': '@orderNum'                        
                    },
                    'isArray': true
                }
            });
        });




