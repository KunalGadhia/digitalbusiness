/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.dealer_invoice_details_service", []);
angular.module("digitalbusiness.services.dealer_invoice_details_service")
        .factory('DealerInvoiceDetailsService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/dealer_invoice_details/:id', {'id': '@id'}, {
                
                'findByOrderHeadId': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_invoice_details/find_by/order_head',
                    'params': {
                        'orderHeadId': '@orderHeadId'
                    },
                    'isArray': false
                }
            });
        });
