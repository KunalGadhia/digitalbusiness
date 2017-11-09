/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.standard_carcass_dimension", []);
angular.module("digitalbusiness.services.standard_carcass_dimension")
        .factory('StandardCarcassDimensionService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/std_carcass_dimension/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_dimension/find_all_list',
                    'isArray': true
                },
                'findByDimensionAttribute': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_dimension/find/dimension_attribute',
                    'params': {
                        'dimensionAttribute': '@dimensionAttribute'
                    },
                    'isArray': true
                },
                'findByCarcassCategory': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_dimension/find/carcass_category',
                    'params': {
                        'carcassCategory': '@carcassCategory'
                    },
                    'isArray': true
                },
                'findByCarcassCategoryDimensionAttribute': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_dimension/find/carcass_category/dimension_attribute',
                    'params': {
                        'carcassCategory': '@carcassCategory',
                        'dimensionAttribute': '@dimensionAttribute'
                    },
                    'isArray': true
                }
            });
        });
