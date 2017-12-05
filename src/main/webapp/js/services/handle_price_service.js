/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.handle_price", []);
angular.module("digitalbusiness.services.handle_price")
        .factory('HandlePriceService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/handle_price/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/handle_price/find_all_list',
                    'isArray': true
                },
                'findByKitchenComponent': {
                    'method': 'GET',
                    'url': restRoot + '/handle_price/find/kitchen_component',
                    'params': {
                        'kitchenComponent': '@kitchenComponent'
                    },
                    'isArray': true
                }
//                'findByMaterialCode': {
//                    'method': 'GET',
//                    'url': restRoot + '/raw_material/find/material_code',
//                    'params': {
//                        'materialCode': '@materialCode'
//                    },
//                    'isArray': false
//                },
//                'findBySubTypeLike': {
//                    'method': 'GET',
//                    'url': restRoot + '/raw_material/find/subtype_like',
//                    'params': {
//                        'subtype': 'subtype'
//                    },
//                    'isArray': true
//                }
            });
        });
