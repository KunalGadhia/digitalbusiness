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
//                'findByComponentLike': {
//                    'method': 'GET',
//                    'url': restRoot + '/color/find/component_like',
//                    'params': {
//                        'component': '@component'
//                    },
//                    'isArray': true
//                },
                'findByColorCategory': {
                    'method': 'GET',
                    'url': restRoot + '/color/find/color_category',
                    'params': {
                        'colorCategory': '@colorCategory'
                    },
                    'isArray': true
                }
            });
        });
