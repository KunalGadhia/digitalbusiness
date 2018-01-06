/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.notification", []);
angular.module("digitalbusiness.services.notification")
        .factory('NotificationService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/notification/:id', {'id': '@id'}, {
                
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/notification/find_all_list',                    
                    'isArray': true
                }
            });
        });




