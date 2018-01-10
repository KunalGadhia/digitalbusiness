/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.rate_contract", []);
angular.module("digitalbusiness.services.rate_contract")
        .factory('RateContractService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/rate_contract/:id', {'id': '@id'}, {
                
                'findByContractNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract/find/contract_name_like',
                    'params': {
                        'contractName': '@contractName'
                    },
                    'isArray': true
                },
                'findByContractName': {
                    'method': 'GET',
                    'url': restRoot + '/rate_contract/find/contract',
                    'params': {
                        'contractName': '@contractName'
                    },
                    'isArray': false
                }
            });
        });




