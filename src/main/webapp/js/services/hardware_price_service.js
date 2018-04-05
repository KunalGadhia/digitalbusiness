/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.hardware_price", []);
angular.module("digitalbusiness.services.hardware_price")
        .factory('HardwarePriceService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/hardware_price/:id', {'id': '@id'}, {
                
                'findByNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/hardware_price/find/user_like',
                    'params': {
                        'name': '@name'
                    },
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/hardware_price/find/name',
                    'params': {
                        'name': '@name'
                    },
                    'isArray': false
                }
            });
        });




