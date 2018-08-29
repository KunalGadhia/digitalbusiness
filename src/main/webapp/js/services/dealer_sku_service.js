/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.dealer_sku", []);
angular.module("digitalbusiness.services.dealer_sku")
        .factory('DealerSkuService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/dealer_sku/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find_all_list',
                    'isArray': true
                },
                'findByManufacturerCode': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/manufacturer_code',
                    'params': {
                        'manufacturerCode': '@manufacturerCode'
                    },
                    'isArray': true
                },
                'findByCreator': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/creator',
                    'params': {
                        'offset': '@offset',
                        'userId': '@userId'
                    },
                    'isArray': true
                },
                'findByManufacturerAndManufacturerCategoryByUser': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/manufacturer/manufacturer_category/user',
                    'params': {
                        'manufacturer': '@manufacturer',
                        'manufacturerCategory': '@manufacturerCategory',
                        'createdBy': '@createdBy'
                    },
                    'isArray': true
                },
                'findByCategoryCode': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/category_code',
                    'params': {
                        'categoryCode': '@categoryCode'
                    },
                    'isArray': true
                },
                'findByProductCode': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/product_code',
                    'params': {
                        'productCode': '@productCode'
                    },
                    'isArray': true
                },
                'findByDescriptionLike': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/description/like',
                    'params': {
                        'description': '@description'
                    },
                    'isArray': true
                },
                'findByDescriptionFilter': {
                    'method': 'GET',
                    'url': restRoot + '/dealer_sku/find/description/filter',
                    'params': {
                        'categoryCode': '@categoryCode'
                    },
                    'isArray': true
                }
            });
        });
