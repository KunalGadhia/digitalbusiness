/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.kitchen_component", []);
angular.module("digitalbusiness.services.kitchen_component")
        .factory('KitchenComponentService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/kitchen_component/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/kitchen_component/find_all_list',
                    'isArray': true
                },
                'findByComponent': {
                    'method': 'GET',
                    'url': restRoot + '/kitchen_component/find/component',
                    'params': {
                        'component': '@component'
                    },
                    'isArray': false
                },
                'findByComponentCode': {
                    'method': 'GET',
                    'url': restRoot + '/kitchen_component/find/component_code',
                    'params': {
                        'componentCode': '@componentCode'
                    },
                    'isArray': false
                },
                'findByComponentLike': {
                    'method': 'GET',
                    'url': restRoot + '/kitchen_component/find/component_like',
                    'params': {
                        'component': '@component'
                    },
                    'isArray': true
                },
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/kitchen_component/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                }
            });
        });
