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
//                'findByName': {
//                    'method': 'GET',
//                    'url': restRoot + '/employee/find/name',
//                    'params': {
//                        'name': '@name'
//                    },
//                    'isArray': false
//                }
            });
        });



