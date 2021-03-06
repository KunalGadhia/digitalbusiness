/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.carcass_subtype", []);
angular.module("digitalbusiness.services.carcass_subtype")
        .factory('CarcassSubtypeService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/carcass_subtype/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/carcass_subtype/find_all_list',
                    'isArray': true
                },
                'findByParentType': {
                    'method': 'GET',
                    'url': restRoot + '/carcass_subtype/find/parent_type',
                    'params': {
                        'parentType': '@parentType'
                    },
                    'isArray': true
                },
                'findByParentTypeSubTypeCode': {
                    'method': 'GET',
                    'url': restRoot + '/carcass_subtype/find/parent_type/sub_type_code',
                    'params': {
                        'parentType': '@parentType',
                        'subTypeCode': '@subTypeCode'
                    },
                    'isArray': false
                },
                'findBySubTypeLike': {
                    'method': 'GET',
                    'url': restRoot + '/raw_material/find/subtype_like',
                    'params': {
                        'subtype': 'subtype'
                    },
                    'isArray': true
                }
            });
        });
