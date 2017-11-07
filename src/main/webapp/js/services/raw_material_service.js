/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.raw_material", []);
angular.module("digitalbusiness.services.raw_material")
        .factory('RawMaterialService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/raw_material/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/raw_material/find_all_list',
                    'isArray': true
                },
                'findByMaterial': {
                    'method': 'GET',
                    'url': restRoot + '/raw_material/find/material',
                    'params': {
                        'material': '@material'
                    },
                    'isArray': false
                },
                'findByMaterialCode': {
                    'method': 'GET',
                    'url': restRoot + '/raw_material/find/material_code',
                    'params': {
                        'materialCode': '@materialCode'
                    },
                    'isArray': false
                },
                'findByMaterialLike': {
                    'method': 'GET',
                    'url': restRoot + '/raw_material/find/material_like',
                    'params': {
                        'material': 'material'
                    },
                    'isArray': true
                }
            });
        });
