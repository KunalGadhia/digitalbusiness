/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.color_constraint", []);
angular.module("digitalbusiness.services.color_constraint")
        .factory('ColorConstraintService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/color_constraint/:id', {'id': '@id'}, {

                'findAllColorConstraints': {
                    'method': 'GET',
                    'url': restRoot + '/color_constraint/all',
                    'isArray': true
                },
                'findByMaterialCode': {
                    'method': 'GET',
                    'url': restRoot + '/color_constraint/find/material_code',
                    'params': {
                        'materialCode': '@materialCode'
                    },
                    'isArray': false
                },
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/color_constraint/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                },
                'findByComponent': {
                    'method': 'GET',
                    'url': restRoot + '/color_constraint/find/component',
                    'params': {
                        'component': '@component'
                    },
                    'isArray': false
                },
                'findByComponentMaterialCode': {
                    'method': 'GET',
                    'url': restRoot + '/color_constraint/find/component/material_code',
                    'params': {
                        'component': '@component',
                        'materialCode': '@materialCode'
                    },
                    'isArray': false
                }
            });
        });
