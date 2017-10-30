/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.party", []);
angular.module("digitalbusiness.services.party")
        .factory('PartyService', function ($resource, restRoot, contextPath) {            
            return $resource(restRoot + '/party/:id', {'id': '@id'}, {
                
                'findByNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/party/find/user_like',
                    'params': {
                        'name': '@name'
                    },
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/party/find/name',
                    'params': {
                        'name': '@name'
                    },
                    'isArray': false
                }
            });
        });




