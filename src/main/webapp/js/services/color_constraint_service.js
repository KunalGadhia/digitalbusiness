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
                }                
            });
        });
