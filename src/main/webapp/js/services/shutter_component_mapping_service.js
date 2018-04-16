/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.shutter_component_mapping_service", []);
angular.module("digitalbusiness.services.shutter_component_mapping_service")
        .factory('ShutterComponentMappingService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/shutter_component_mapping/:id', {'id': '@id'}, {
                                                
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_component_mapping/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                }
            });
        });




