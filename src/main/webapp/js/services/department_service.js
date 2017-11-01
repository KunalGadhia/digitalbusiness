/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.department", []);
angular.module("digitalbusiness.services.department")
        .factory('DepartmentService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/department/:id', {'id': '@id'}, {
                                
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/department/find_all_list',                    
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/department/find/name',
                    'params': {
                        'name': '@name'
                    },
                    'isArray': false
                },
                'findByNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/department/find/name_like',                    
                    'params': {
                        'name': '@name'
                    },
                    'isArray': true
                }
                
            });
        });




