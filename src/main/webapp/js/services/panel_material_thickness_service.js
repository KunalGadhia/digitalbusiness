/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.panel_material_thickness", []);
angular.module("digitalbusiness.services.panel_material_thickness")
        .factory('PanelMaterialThicknessService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/panel_material_thickness/:id', {'id': '@id'}, {
                                
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/reason/find_all_list',                    
                    'isArray': true
                },
                'findByMaterial': {
                    'method': 'GET',
                    'url': restRoot + '/reason/find/material',
                    'params': {
                        'material': '@material'
                    },
                    'isArray': true
                }
//                'findByReasonLike': {
//                    'method': 'GET',
//                    'url': restRoot + '/reason/find/reason_like',                    
//                    'params': {
//                        'reason': '@reason'
//                    },
//                    'isArray': true
//                }
                
            });
        });




