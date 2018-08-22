/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.wardrobe_component_order_details", []);
angular.module("digitalbusiness.services.wardrobe_component_order_details")
        .factory('WardrobeComponentOrderDetailsService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/wardrobe_component_order_details/:id', {'id': '@id'});
        });




