/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.section_profile", []);
angular.module("digitalbusiness.services.section_profile")
        .factory('SectionProfileService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/section_profile/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/section_profile/find_all_list',
                    'isArray': true
                },
                'findByName': {
                    'method': 'GET',
                    'url': restRoot + '/section_profile/find/name',
                    'params':{
                      'name':'name'  
                    },
                    'isArray': false
                },
                'findByCarassType': {
                    'method': 'GET',
                    'url': restRoot + '/section_profile/find/carcass_type',
                    'params': {
                        'carcassType': '@carcassType'
                    },
                    'isArray': true
                }
            });
        });
