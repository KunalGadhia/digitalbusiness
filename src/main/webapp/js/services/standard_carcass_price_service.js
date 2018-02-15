/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.standard_carcass_price", []);
angular.module("digitalbusiness.services.standard_carcass_price")
        .factory('StandardCarcassPriceService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/std_carcass_price/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find_all_list',
                    'isArray': true
                },
                'findCarcassWithoutShelf': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find/without_shelf',
                    'isArray': true
                },
                'findCarcassWithShelf': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find/with_shelf',
                    'isArray': true
                },
                'findCarcassByType': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find_by_ct',
                    'params': {
                        'carcassType': '@carcassType'
                    },
                    'isArray': true
                },
                'findCarcassWithoutShelfByCT': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find/without_shelf/ct',
                    'params': {
                        'carcassType': '@carcassType'
                    },
                    'isArray': true
                },
                'findSinkCarcassWithoutShelfByCT': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find/sink/without_shelf/ct',
                    'params': {
                        'carcassType': '@carcassType'
                    },
                    'isArray': true
                },
                'findCarcassWithShelfByCT': {
                    'method': 'GET',
                    'url': restRoot + '/std_carcass_price/find/with_shelf/ct',
                    'params': {
                        'carcassType': '@carcassType'
                    },
                    'isArray': true
                }

//                'findByCarcassCategoryDimensionAttribute': {
//                    'method': 'GET',
//                    'url': restRoot + '/std_carcass_dimension/find/carcass_category/dimension_attribute',
//                    'params': {
//                        'carcassCategory': '@carcassCategory',
//                        'dimensionAttribute': '@dimensionAttribute'
//                    },
//                    'isArray': true
//                }
            });
        });
