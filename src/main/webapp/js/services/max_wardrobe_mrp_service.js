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
                },
                'findByCategoryDimensions': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions',
                    'params': {
                        'category': '@category',
                        'width': '@width',
                        'depth': '@depth',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsWidth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/width',
                    'params': {
                        'category': '@category',
                        'width': '@width'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsDepth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/depth',
                    'params': {
                        'category': '@category',
                        'depth': '@depth'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsHeight': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/height',
                    'params': {
                        'category': '@category',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsDepthHeight': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/depth/height',
                    'params': {
                        'category': '@category',
                        'depth': '@depth',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsWidthHeight': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/width/height',
                    'params': {
                        'category': '@category',
                        'width': '@width',
                        'height': '@height'
                    },
                    'isArray': true
                },
                'findByCategoryDimensionsWidthDepth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/category/dimensions/width/depth',
                    'params': {
                        'category': '@category',
                        'width': '@width',
                        'depth': '@depth'
                    },
                    'isArray': true
                },
                'findDistinctWidth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/distinct/width',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findDistinctDepth': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/distinct/depth',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                },
                'findDistinctHeight': {
                    'method': 'GET',
                    'url': restRoot + '/max_wardrobe_mrp/find/distinct/height',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                }
            });
        });




