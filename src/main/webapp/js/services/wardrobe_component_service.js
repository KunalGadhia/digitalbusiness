/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.wardrobe_component", []);
angular.module("digitalbusiness.services.wardrobe_component")
        .factory('WardrobeComponentService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/wardrobe_component/:id', {'id': '@id'}, {
                'findByCategory': {
                    'method': 'GET',
                    'url': restRoot + '/wardrobe_component/find/category',
                    'params': {
                        'category': '@category'
                    },
                    'isArray': true
                }

            });
        });




