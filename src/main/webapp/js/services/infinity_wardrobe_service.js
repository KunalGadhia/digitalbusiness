/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.infinity_wardrobe", []);
angular.module("digitalbusiness.services.infinity_wardrobe")
        .factory('InfinityWardrobeService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/infinity_wardrobe/:id', {'id': '@id'}, {
                
                'findByDescriptionLike': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe/find/description_like',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': true
                },
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findByDescription': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe/find/description',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': false
                }
            });
        });




