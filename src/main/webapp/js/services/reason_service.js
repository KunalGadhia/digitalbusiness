/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.reason", []);
angular.module("digitalbusiness.services.reason")
        .factory('ReasonService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/reason/:id', {'id': '@id'}, {
                                
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/reason/find_all_list',                    
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/reason/find/reason',
                    'params': {
                        'reason': '@reason'
                    },
                    'isArray': false
                },
                'findByNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/reason/find/reason_like',                    
                    'params': {
                        'reason': '@reason'
                    },
                    'isArray': true
                }
                
            });
        });




