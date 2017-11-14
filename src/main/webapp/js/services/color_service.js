/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.color", []);
angular.module("digitalbusiness.services.color")
        .factory('ColorService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/color/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/color/find_all_list',
                    'isArray': true
                },
                'findByColor': {
                    'method': 'GET',
                    'url': restRoot + '/color/find/color',
                    'params': {
                        'color': '@color'
                    },
                    'isArray': false
                },
                'findByColorCode': {
                    'method': 'GET',
                    'url': restRoot + '/color/find/color_code',
                    'params': {
                        'colorCode': '@colorCode'
                    },
                    'isArray': false
                },
                'findByColorLike': {
                    'method': 'GET',
                    'url': restRoot + '/color/find/color_like',
                    'params': {
                        'color': '@color'
                    },
                    'isArray': true
                },
                'findByColorCategory': {
                    'method': 'GET',
                    'url': restRoot + '/color/find/color_category',
                    'params': {
                        'colorCategory': '@colorCategory'
                    },
                    'isArray': true
                }
//                'getColorImage': {
//                    'method': 'GET',
//                    'url': restRoot + '/color/:id/attachment',
//                    'params': {
//                        'id': '@id'
//                    },
//                    'isArray': false
//                }
            });
        });
