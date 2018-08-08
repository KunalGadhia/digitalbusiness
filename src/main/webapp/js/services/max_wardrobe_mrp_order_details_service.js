/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.max_wardrobe_mrp_order_details_service", []);
angular.module("digitalbusiness.services.max_wardrobe_mrp_order_details_service")
        .factory('MaxWardrobeMrpOrderDetailsService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/max_wardrobe_mrp_order_details/:id', {'id': '@id'}, {
                
                'findByOrderHeadId': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp_order_details/find_by/order_head',
                    'params': {
                        'orderHeadId': '@orderHeadId'
                    },
                    'isArray': true
                },
                'findPriceByOrderHeadId': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp_order_details/find_price_by/order_head',
                    'params': {
                        'orderHeadId': '@orderHeadId'
                    },
                    'isArray': false
                }
            });
        });
