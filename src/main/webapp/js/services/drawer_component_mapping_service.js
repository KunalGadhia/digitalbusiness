/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.drawer_component_mapping_service", []);
angular.module("digitalbusiness.services.drawer_component_mapping_service")
        .factory('DrawerComponentMappingService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/drawer_component_mapping/:id', {'id': '@id'}, {
                                                
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/drawer_component_mapping/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                }
            });
        });
