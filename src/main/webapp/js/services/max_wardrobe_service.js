/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.max_wardrobe", []);
angular.module("digitalbusiness.services.max_wardrobe")
        .factory('MaxWardrobeService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/max_wardrobe/:id', {'id': '@id'}, {
                
                'findByDescriptionLike': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/description_like',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': true
                },
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findByDescription': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/description',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': false
                },
                'findByCategoryDimensions': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/category/dimensions',
                    'params': {
                        'category': '@category',
                        'width': '@width',
                        'depth': '@depth',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findDistinctWidth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/distinct/width',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                },
                'findDistinctDepth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/distinct/depth',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                },
                'findDistinctHeight': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe/find/distinct/height',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                }
            });
        });




