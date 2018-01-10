/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.rate_contract_detail", []);
angular.module("digitalbusiness.services.rate_contract_detail")
        .factory('RateContractDetailService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/rate_contract_detail/:id', {'id': '@id'}, {
                
                'findByRateContractId': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract_detail/find/rate_contract_id',
                    'params': {
                        'rateContractId': '@rateContractId'
                    },
                    'isArray': true
                },
                'findByShutterFinishMaterialThickness': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract_detail/find/shutter/finish/material/thickness',
                    'params': {
                        'finish': '@finish',
                        'material': '@material',
                        'thickness': '@thickness',
                        'rateContractId': '@rateContractId'
                    },
                    'isArray': false
                },
                'findByPanelMaterialThickness': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract_detail/find/panel/material/thickness',
                    'params': {                        
                        'material': '@material',
                        'thickness': '@thickness',
                        'rateContractId': '@rateContractId'
                    },
                    'isArray': false
                },
                'findByCarcassMaterialThickness': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract_detail/find/carcass/material/thickness',
                    'params': {                        
                        'material': '@material',
                        'thickness': '@thickness',
                        'rateContractId': '@rateContractId'
                    },
                    'isArray': false
                }
            });
        });




