/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.finish_price_service", []);
angular.module("digitalbusiness.services.finish_price_service")
        .factory('FinishPriceService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/finish_price/:id', {'id': '@id'}, {
                
                'findByNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/finish_price/find/name_like',
                    'params': {
                        'finishName': '@finishName'
                    },
                    'isArray': true
                },
                'findByMaterialId': {
                    'method': 'GET',
                    'url': restRoot + '/finish_price/find/material_id',
                    'params': {
                        'materialId': '@materialId'
                    },
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/finish_price/find/name',
                    'params': {
                        'finishName': '@finishName'
                    },
                    'isArray': false
                },
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/finish_price/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                }
            });
        });




