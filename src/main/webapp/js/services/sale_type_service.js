/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.sale_type", []);
angular.module("digitalbusiness.services.sale_type")
        .factory('SaleTypeService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/sale_type/:id', {'id': '@id'}, {
                
                'findBySaleTypeLike': {
                    'method': 'GET',
                    'url': restRoot + '/sale_type/find/sale_type_like',
                    'params': {
                        'saleType': '@saleType'
                    },
                    'isArray': true
                },
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/sale_type/find_sale_type',                    
                    'isArray': true
                },
                'findBySaleType': {
                    'method': 'GET',
                    'url': restRoot + '/sale_type/find/sale_type',
                    'params': {
                        'saleType': '@saleType'
                    },
                    'isArray': false
                }
            });
        });




