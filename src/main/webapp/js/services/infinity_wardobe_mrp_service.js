/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.infinity_wardrobe_mrp", []);
angular.module("digitalbusiness.services.infinity_wardrobe_mrp")
        .factory('InfinityWardrobeMrpService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/infinity_wardrobe_mrp/:id', {'id': '@id'}, {

                'findByDescriptionLike': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/description_like',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': true
                },
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findByCategoryDimensions': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/category/dimensions',
                    'params': {
                        'category': '@category',
                        'width': '@width',
                        'depth': '@depth',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findByDescription': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/description',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': false
                },
                'findDistinctWidth': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/distinct/width',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                },
                'findDistinctDepth': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/distinct/depth',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                },
                'findDistinctHeight': {
                    'method': 'GET',
                    'url': restRoot + '/infinity_wardrobe_mrp/find/distinct/height',
                    'params':{
                      'category': '@category'  
                    },
                    'isArray': true
                }
            });
        });




