/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.drawer_handle_mapping_service", []);
angular.module("digitalbusiness.services.drawer_handle_mapping_service")
        .factory('DrawerHandleMappingService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/drawer_handle_mapping/:id', {'id': '@id'}, {
                                
                'findByDrawerCode': {
                    'method': 'GET',
                    'url': restRoot + '/drawer_handle_mapping/find/drawer_code',
                    'params': {
                        'drawerCode': '@drawerCode'
                    },
                    'isArray': false
                },
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/drawer_handle_mapping/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                }
            });
        });




