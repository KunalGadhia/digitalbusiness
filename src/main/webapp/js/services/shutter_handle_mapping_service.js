/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.shutter_handle_mapping_service", []);
angular.module("digitalbusiness.services.shutter_handle_mapping_service")
        .factory('ShutterHandleMappingService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/shutter_handle_mapping/:id', {'id': '@id'}, {
                                
                'findByShutterCode': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_handle_mapping/find/shutter_code',
                    'params': {
                        'shutterCode': '@shutterCode'
                    },
                    'isArray': false
                },
                'findByFinishCode': {
                    'method': 'GET',
                    'url': restRoot + '/shutter_handle_mapping/find/finish_code',
                    'params': {
                        'finishCode': '@finishCode'
                    },
                    'isArray': false
                }
            });
        });




