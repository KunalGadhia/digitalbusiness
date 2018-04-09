/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.hardware_order_details_service", []);
angular.module("digitalbusiness.services.hardware_order_details_service")
        .factory('HardwareOrderDetailsService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/hardware_order_details/:id', {'id': '@id'}, {
                
                'findByOrderHeadId': {
                    'method': 'GET',
                    'url': restRoot + '/hardware_order_details/find_by/order_head',
                    'params': {
                        'orderHeadId': '@orderHeadId'
                    },
                    'isArray': true
                }
            });
        });
