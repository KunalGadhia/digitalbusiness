/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.manufacturer_category", []);
angular.module("digitalbusiness.services.manufacturer_category")
        .factory('ManufacturerCategoryService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/manufacturer_category/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer_category/find_all_list',
                    'isArray': true
                },
                'findByManufacturerCode': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer_category/find/manufacturer_code',
                    'params': {
                        'manufacturerCode': '@manufacturerCode'
                    },
                    'isArray': true
                },
                'findByCategoryCode': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer_category/find/category_code',
                    'params': {
                        'categoryCode': '@categoryCode'
                    },
                    'isArray': false
                },
                'findByManufacturerCategoryLike': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer_category/find/manufacturer_category_like',
                    'params': {
                        'manufacturerCategory': '@manufacturerCategory'
                    },
                    'isArray': true
                }
            });
        });