/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.erp_integration", []);
angular.module("digitalbusiness.services.erp_integration")
        .factory('ErpIntegrationService', function ($resource, contextPath) {
            var erpRestRoot = "http://192.168.100.145:8080/SwRestAndroidApi/rest";
            return $resource({
                
                'InsertOrderHead': {
                    'method': 'POST',
                    'url': erpRestRoot + '/Innopan/OrderHead'
                },
                'InsertOrderDetail': {
                    'method': 'POST',
                    'url': erpRestRoot + '/Innopan/OrderDetail'
                }
            });
        });




