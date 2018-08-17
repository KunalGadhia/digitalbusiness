/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.dealer_sku_order_details", []);
angular.module("digitalbusiness.services.dealer_sku_order_details")
        .factory('DealerSkuOrderDetailsService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/dealer_sku_order_details/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku_order_details/find_all_list',
                    'isArray': true
                },

                'findByProductCode': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku_order_details/find/product_code',
                    'params': {
                        'productCode': '@productCode'
                    },
                    'isArray': true
                }
            });
        });
