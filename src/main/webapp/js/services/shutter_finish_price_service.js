/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.shutter_finish_price", []);
angular.module("digitalbusiness.services.shutter_finish_price")
        .factory('ShutterFinishPriceService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/shutter_finish_price/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_finish_price/find_all_list',
                    'isArray': true
                },
                'findUniqueFinish': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_finish_price/find_unique_finish',
                    'isArray': true
                },
                'findByFinish': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_finish_price/find_by_finish',
                    'params': {
                        'finish': '@finish'
                    },
                    'isArray': true
                },
                'findByFinishThickness': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_finish_price/find/finish/thickness',
                    'params': {
                        'finish': '@finish',
                        'thickness': '@thickness'
                    },
                    'isArray': false
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
