/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.max_wardrobe_mrp", []);
angular.module("digitalbusiness.services.max_wardrobe_mrp")
        .factory('MaxWardrobeMrpService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/max_wardrobe_mrp/:id', {'id': '@id'}, {
                
                'findByDescriptionLike': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/description_like',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': true
                },
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findByDescription': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/description',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': false
                }
            });
        });




